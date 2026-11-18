#!/usr/bin/env python3
"""Historias de Instagram ANIMADAS (vídeo MP4 vertical 1080x1920, 30 fps, ~6-7 s por historia).

Mismo JSON que la historia fija (render.py tipo "historia"), con "diapositivas" portada, dato, texto,
lista y cta. Cada historia se anima con el motor de la marca, sin gastar créditos:
  - fondo con zoom lento (foto IA en la portada o fondo de marca) y aro de luz que late
  - textos que entran escalonados (suben y aparecen)
  - en los datos, el número cuenta desde 0 hasta el valor
  - en las listas, cada punto entra uno detrás de otro
  - en la llamada a la acción, el botón late
Opcional: "video_fondo" en la diapositiva = ruta a un clip vertical (p. ej. de Higgsfield) que se usa
como fondo en lugar de la foto.

Uso:  python3 design/video.py <pieza.json> <carpeta_salida>   -> h01.mp4, h02.mp4… y su póster h01.jpg…
"""
import json, math, re, shutil, subprocess, sys, tempfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

sys.path.insert(0, str(Path(__file__).resolve().parent))
import render as R

W, H, P = R.SW, R.SH, R.SP
FPS = 30
TOP, BOT = R.SAFE_TOP, R.SAFE_BOT
MAXW = W - 2 * P


def ease(t):
    t = max(0.0, min(1.0, t))
    return 1 - (1 - t) ** 3


class Layer:
    """Un elemento (texto, chip, botón…) dibujado en su propia capa transparente."""
    def __init__(self, img, xy, start, dur=0.55, rise=46, pulse=False):
        self.img, self.xy, self.start, self.dur, self.rise, self.pulse = img, xy, start, dur, rise, pulse

    def draw(self, frame, t):
        k = ease((t - self.start) / self.dur)
        if k <= 0:
            return
        im = self.img
        if self.pulse and k >= 1:
            s = 1 + 0.025 * math.sin((t - self.start) * 4.2)
            im = im.resize((max(1, int(im.width * s)), max(1, int(im.height * s))), Image.BICUBIC)
            dx, dy = (im.width - self.img.width) // 2, (im.height - self.img.height) // 2
        else:
            dx = dy = 0
        if k < 1:
            a = im.getchannel("A").point(lambda v: int(v * k))
            im = im.copy()
            im.putalpha(a)
        frame.alpha_composite(im, (int(self.xy[0] - dx), int(self.xy[1] + self.rise * (1 - k) - dy)))


def text_layer(lines, fnt, size, fill=R.WHITE, lh=1.06, grad=False):
    d0 = ImageDraw.Draw(Image.new("L", (1, 1)))
    w = int(max(d0.textlength(l, font=fnt) for l in lines)) + 16
    h = int(len(lines) * size * lh + size * 0.35)
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    if grad:
        m = Image.new("L", (w, h), 0)
        dm = ImageDraw.Draw(m)
        y = 0
        for l in lines:
            dm.text((0, y), l, font=fnt, fill=255)
            y += int(size * lh)
        g = R.gradient(w, h).convert("RGBA")
        g.putalpha(m)
        return g, h
    d = ImageDraw.Draw(im)
    y = 0
    for l in lines:
        d.text((0, y), l, font=fnt, fill=fill)
        y += int(size * lh)
    return im, h


def chip_layer(text, size=34):
    tmp = Image.new("RGBA", (W, 200), (0, 0, 0, 0))
    box = R.chip(tmp, ImageDraw.Draw(tmp), 0, 0, text, size)
    return tmp.crop((0, 0, int(box[2]) + 2, int(box[3]) + 2))


def accent_layer():
    return R.gradient(120, 8).convert("RGBA")


def button_layer(text):
    bw, bh = MAXW, 150
    im = Image.new("RGBA", (bw, bh), (0, 0, 0, 0))
    m = Image.new("L", (bw, bh), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, bw - 1, bh - 1], radius=75, fill=255)
    g = R.gradient(bw, bh).convert("RGBA")
    g.putalpha(m)
    im.alpha_composite(g)
    d = ImageDraw.Draw(im)
    fb = R.font("bold", 50)
    tw = d.textlength(text, font=fb)
    x0 = (bw - tw - 70) / 2
    d.text((x0, 44), text, font=fb, fill=R.NIGHT)
    ax, ay = x0 + tw + 30, bh / 2 + 2
    d.line([(ax, ay), (ax + 38, ay)], fill=R.NIGHT, width=7)
    d.polygon([(ax + 46, ay), (ax + 28, ay - 15), (ax + 28, ay + 15)], fill=R.NIGHT)
    return im


def static_frame():
    """Logo y nexgent.io (siempre visibles)."""
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    R.logo(im, P, TOP - 70, 210)
    ImageDraw.Draw(im).text((P, BOT - 40), "nexgent.io", font=R.font("medium", 30), fill=R.MUTED)
    return im


def parse_number(s):
    m = re.search(r"(\d[\d.,]*)", s or "")
    if not m:
        return None
    raw = m.group(1)
    dec = "," in raw and len(raw.split(",")[-1]) <= 2
    val = float(raw.replace(".", "").replace(",", ".")) if dec else float(raw.replace(".", "").replace(",", ""))
    return m.start(1), m.end(1), val, dec, raw


def fmt_number(v, dec, raw):
    if dec:
        return f"{v:.1f}".replace(".", ",")
    n = int(round(v))
    return f"{n:,}".replace(",", ".") if "." in raw or n >= 10000 else str(n)


def build(spec, sl, i):
    """Devuelve (fondo grande, capas, función extra por fotograma, duración)."""
    t = sl.get("tipo", "texto")
    d = ImageDraw.Draw(Image.new("L", (1, 1)))
    layers, extra, dur = [], None, 6.0
    full = t == "portada"
    bg = R.story_bg(spec, sl, i, full)
    if t == "portada":
        f, lines, sz = R.fit_text(d, sl.get("titulo") or spec.get("titulo", ""), "display", MAXW, 640, 128, 64, 1.02)
        sub = sl.get("texto") or spec.get("subtitulo")
        fs = R.font("text", 46)
        sll = R.wrap(d, sub, fs, MAXW)[:4] if sub else []
        y = BOT - 110 - len(sll) * 62 - int(len(lines) * sz * 1.02)
        et = sl.get("etiqueta") or spec.get("etiqueta")
        if et:
            layers.append(Layer(chip_layer(et), (P, y - 110), 0.25))
        else:
            layers.append(Layer(accent_layer(), (P, y - 50), 0.25, rise=0))
        for k, ln in enumerate(lines):
            im, _ = text_layer([ln], f, sz, lh=1.02)
            layers.append(Layer(im, (P, y + int(k * sz * 1.02)), 0.45 + 0.18 * k))
        y += int(len(lines) * sz * 1.02) + 34
        if sll:
            im, _ = text_layer(sll, fs, 46, fill=(226, 230, 236), lh=1.35)
            layers.append(Layer(im, (P, y), 0.6 + 0.18 * len(lines)))
        dur = 6.5
    elif t == "dato":
        num = sl.get("numero", "")
        size = 330
        while size > 120 and d.textlength(num, font=R.font("display", size)) > MAXW:
            size -= 10
        fnum = R.font("display", size)
        y = 560
        if sl.get("kicker"):
            im, _ = text_layer([sl["kicker"]], R.font("semi", 38), 38, fill=R.TURQ)
            layers.append(Layer(im, (P, y - 90), 0.2))
        pn = parse_number(num)
        ny = y
        y += int(size * 1.0) + 40

        def counter(frame, tt, num=num, pn=pn, fnum=fnum, size=size, ny=ny):
            if tt < 0.35:
                return
            if pn:
                k = ease((tt - 0.35) / 1.6)
                a, b, val, dec, raw = pn
                txt = num[:a] + fmt_number(val * k, dec, raw) + num[b:]
            else:
                txt = num
            im, _ = text_layer([txt], fnum, size, lh=1.0, grad=True)
            frame.alpha_composite(im, (P - 8, ny))
        extra = counter
        if sl.get("titulo"):
            f, lines, sz = R.fit_text(d, sl["titulo"], "display", MAXW, 420, 92, 52)
            im, h = text_layer(lines, f, sz)
            layers.append(Layer(im, (P, y), 1.6))
            y += int(len(lines) * sz * 1.06) + 30
        if sl.get("texto"):
            im, h = text_layer(R.wrap(d, sl["texto"], R.font("text", 46), MAXW)[:5], R.font("text", 46), 46, fill=(214, 218, 226), lh=1.35)
            layers.append(Layer(im, (P, y), 2.0))
        if sl.get("nota"):
            im, _ = text_layer(R.wrap(d, sl["nota"], R.font("text", 28), MAXW)[-2:], R.font("text", 28), 28, fill=R.MUTED, lh=1.35)
            layers.append(Layer(im, (P, BOT - 120), 2.3, rise=0))
        dur = 6.5
    elif t == "cta":
        y = 620
        layers.append(Layer(accent_layer(), (P, y - 50), 0.2, rise=0))
        f, lines, sz = R.fit_text(d, sl.get("titulo") or "¿Cuántos clientes se quedan sin respuesta en tu red?", "display", MAXW, 520, 104, 56)
        for k, ln in enumerate(lines):
            im, _ = text_layer([ln], f, sz)
            layers.append(Layer(im, (P, y + int(k * sz * 1.06)), 0.35 + 0.18 * k))
        y += int(len(lines) * sz * 1.06) + 36
        ft = R.font("text", 46)
        tl = R.wrap(d, sl.get("texto") or "Te lo medimos sede por sede, sin compromiso.", ft, MAXW)[:4]
        im, _ = text_layer(tl, ft, 46, fill=(214, 218, 226), lh=1.35)
        layers.append(Layer(im, (P, y), 0.5 + 0.18 * len(lines)))
        layers.append(Layer(button_layer(sl.get("boton") or "Escríbenos por privado"), (P, BOT - 300), 1.4, pulse=True))
        dur = 6.0
    else:
        y = 560
        if sl.get("kicker"):
            im, _ = text_layer([sl["kicker"]], R.font("semi", 38), 38, fill=R.TURQ)
            layers.append(Layer(im, (P, y - 80), 0.2))
        else:
            layers.append(Layer(accent_layer(), (P, y - 50), 0.2, rise=0))
        st = 0.4
        if sl.get("titulo"):
            f, lines, sz = R.fit_text(d, sl["titulo"], "display", MAXW, 440, 96, 54)
            im, _ = text_layer(lines, f, sz)
            layers.append(Layer(im, (P, y), st))
            y += int(len(lines) * sz * 1.06) + 44
            st += 0.35
        if t == "lista":
            fi = R.font("medium", 46)
            for it in sl.get("items", [])[:5]:
                ll = R.wrap(d, it, fi, MAXW - 80)
                im = Image.new("RGBA", (MAXW, len(ll) * 62 + 10), (0, 0, 0, 0))
                dm = Image.new("L", (28, 28), 0)
                ImageDraw.Draw(dm).ellipse([0, 0, 27, 27], fill=255)
                g = R.gradient(28, 28).convert("RGBA")
                g.putalpha(dm)
                im.alpha_composite(g, (0, 16))
                di = ImageDraw.Draw(im)
                for k, l in enumerate(ll):
                    di.text((60, k * 62), l, font=fi, fill=R.WHITE)
                layers.append(Layer(im, (P, y), st, rise=0))
                layers[-1].slide = True
                y += len(ll) * 62 + 30
                st += 0.45
        if sl.get("texto"):
            ft = R.font("text", 46)
            tl = [l for l in R.wrap(d, sl["texto"], ft, MAXW)[:10]]
            im, _ = text_layer(tl, ft, 46, fill=(214, 218, 226), lh=1.39)
            layers.append(Layer(im, (P, y), st))
            st += 0.4
        dur = max(6.0, st + 3.2)
    return bg, layers, extra, dur, sl.get("video_fondo")


def render_story(spec, sl, i, out, tmp):
    bg, layers, extra, dur, vfondo = build(spec, sl, i)
    base = static_frame()
    n = int(dur * FPS)
    # fondo un 10 % más grande para el zoom lento
    big = bg.resize((int(W * 1.1), int(H * 1.1)), Image.LANCZOS)
    vframes = None
    if vfondo and Path(vfondo).exists():
        vdir = tmp / f"v{i}"
        vdir.mkdir()
        subprocess.run(["ffmpeg", "-loglevel", "error", "-i", vfondo, "-vf", f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={FPS}", str(vdir / "%04d.png")], check=True)
        vframes = sorted(vdir.glob("*.png"))
    fdir = tmp / f"f{i}"
    fdir.mkdir()
    for k in range(n):
        tt = k / FPS
        if vframes:
            fr = R.shade(Image.open(vframes[k % len(vframes)]).convert("RGB"), top=0.35, bottom=0.96, start=0.2).convert("RGBA")
        else:
            z = 1.0 + 0.06 * (k / n)
            sw, sh = int(big.width / (1.1 * z)), int(big.height / (1.1 * z))
            ox, oy = (big.width - sw) // 2, (big.height - sh) // 2
            fr = big.crop((ox, oy, ox + sw, oy + sh)).resize((W, H), Image.BILINEAR).convert("RGBA")
            # luz que late
            a = int(26 + 22 * math.sin(tt * 2.2))
            glow = Image.new("RGBA", (W, H), R.TURQ + (0,))
            glow.putalpha(Image.new("L", (W, H), max(0, a // 3)))
            fr.alpha_composite(glow)
        fr.alpha_composite(base)
        if extra:
            extra(fr, tt)
        for L in layers:
            if getattr(L, "slide", False):
                k2 = ease((tt - L.start) / L.dur)
                if k2 > 0:
                    im = L.img.copy()
                    im.putalpha(im.getchannel("A").point(lambda v: int(v * k2)))
                    fr.alpha_composite(im, (int(L.xy[0] - 60 * (1 - k2)), L.xy[1]))
            else:
                L.draw(fr, tt)
        # fundido al final
        if tt > dur - 0.35:
            f2 = (tt - (dur - 0.35)) / 0.35
            fr = Image.blend(fr.convert("RGB"), Image.new("RGB", (W, H), R.NIGHT), f2 * 0.6).convert("RGBA")
        fr.convert("RGB").save(fdir / f"{k:04d}.jpg", quality=92)
        if k == int(min(n - 1, dur * FPS * 0.8)):
            R.save(fr, out, f"h{i:02d}.jpg")
    outp = out / f"h{i:02d}.mp4"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-framerate", str(FPS), "-i", str(fdir / "%04d.jpg"),
                    "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
                    "-shortest", "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p", "-preset", "medium",
                    "-crf", "20", "-r", str(FPS), "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", str(outp)], check=True)
    return outp


def main():
    spec = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    out = Path(sys.argv[2])
    out.mkdir(parents=True, exist_ok=True)
    sls = spec.get("diapositivas") or [{"tipo": "portada", "titulo": spec.get("titulo"), "texto": spec.get("subtitulo")}]
    tmp = Path(tempfile.mkdtemp())
    try:
        for i, sl in enumerate(sls, 1):
            p = render_story(spec, sl, i, out, tmp)
            print(p)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main()
