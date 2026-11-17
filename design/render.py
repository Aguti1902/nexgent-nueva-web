#!/usr/bin/env python3
"""Motor de diseño de NexGent: compone las piezas con la identidad de la marca.

La IA (Higgsfield) genera solo la imagen de fondo, sin texto. Este script pone encima el
logo, los titulares, los datos y la llamada a la acción, siempre con la misma tipografía
(Inter Tight + Inter), los mismos colores y la misma retícula. Así todas las piezas parecen
del mismo equipo de diseño.

Uso:  python3 design/render.py <pieza.json> <carpeta_salida>

pieza.json:
{
  "tipo": "blog" | "post" | "carrusel" | "dato" | "linkedin",
  "titulo": "…", "subtitulo": "…", "etiqueta": "Casos de éxito",
  "fondo": "ruta/a/imagen.jpg"            (opcional; si falta, fondo de marca),
  "diapositivas": [ {"tipo":"portada"|"texto"|"dato"|"lista"|"cta", "titulo":"…", "texto":"…",
                     "numero":"71 %", "items":["…"], "nota":"…"} ],      (carrusel)
  "numero": "71 %", "nota": "Fuente o periodo"                            (dato)
}
Salidas:
  blog      -> cover.jpg (1600x900, sin texto, para la web) y og.jpg (1200x630, con titular)
  post      -> post.jpg (1080x1350, Instagram/Facebook)
  carrusel  -> 01.jpg, 02.jpg… (1080x1350) y portada en post.jpg
  dato      -> dato.jpg (1080x1350)
  linkedin  -> linkedin.jpg (1200x1200)
Cada salida también se guarda en miniatura (thumb-*.jpg, 360 px de ancho) para el panel.
"""
import json, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
F = HERE / "fonts"
LOGO_W = ROOT / "assets" / "img" / "logo-nexgent-blanco.png"

INK = (0, 0, 0)
NIGHT = (8, 9, 16)
WHITE = (255, 255, 255)
MUTED = (174, 178, 190)
TURQ = (111, 202, 216)
ICE = (184, 238, 242)
BLUE = (59, 130, 246)
GRAD = [(0.0, ICE), (0.4, TURQ), (1.0, BLUE)]


def font(kind, size):
    name = {"display": "inter-tight-latin-800-normal.woff", "bold": "inter-tight-latin-700-normal.woff",
            "text": "inter-latin-400-normal.woff", "medium": "inter-latin-500-normal.woff", "semi": "inter-latin-600-normal.woff"}[kind]
    return ImageFont.truetype(str(F / name), size)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def grad_color(t):
    for (p0, c0), (p1, c1) in zip(GRAD, GRAD[1:]):
        if t <= p1:
            return lerp(c0, c1, (t - p0) / (p1 - p0))
    return GRAD[-1][1]


def gradient(w, h):
    g = Image.new("RGB", (w, 1))
    for x in range(w):
        g.putpixel((x, 0), grad_color(x / max(1, w - 1)))
    return g.resize((w, h))


def brand_bg(w, h, seed=0):
    """Fondo de marca sin IA: negro con luces turquesa y azules."""
    base = Image.new("RGB", (w, h), NIGHT)
    glow = Image.new("RGB", (w, h), (0, 0, 0))
    d = ImageDraw.Draw(glow)
    spots = [((0.72, 0.28), TURQ, 0.55), ((0.18, 0.82), BLUE, 0.6), ((0.5, 0.05), ICE, 0.35)]
    for i, ((cx, cy), c, r) in enumerate(spots):
        cx = (cx + 0.13 * ((seed + i) % 3 - 1)) % 1
        R = int(r * max(w, h))
        d.ellipse([cx * w - R / 2, cy * h - R / 2, cx * w + R / 2, cy * h + R / 2], fill=c)
    glow = glow.filter(ImageFilter.GaussianBlur(max(w, h) / 6))
    return Image.blend(base, glow, 0.55)


def side_shade(img, strength=0.78, until=0.75):
    """Oscurece de izquierda a derecha, para texto sobre fotos."""
    w, h = img.size
    m = Image.new("L", (w, 1))
    for x in range(w):
        t = x / w
        m.putpixel((x, 0), int(255 * strength * max(0, 1 - t / until) ** 1.1))
    return Image.composite(Image.new("RGB", (w, h), INK), img, m.resize((w, h)))


def cover(img, w, h):
    return ImageOps.fit(img.convert("RGB"), (w, h), Image.LANCZOS, centering=(0.5, 0.45))


def shade(img, top=0.15, bottom=0.92, start=0.35):
    """Oscurece hacia abajo para que el texto se lea."""
    w, h = img.size
    mask = Image.new("L", (1, h))
    for y in range(h):
        t = y / h
        a = top if t < start else top + (bottom - top) * ((t - start) / (1 - start)) ** 1.2
        mask.putpixel((0, y), int(255 * min(1, a)))
    mask = mask.resize((w, h))
    dark = Image.new("RGB", (w, h), INK)
    return Image.composite(dark, img, mask)


def wrap(draw, text, fnt, maxw):
    words, lines, cur = str(text).split(), [], ""
    for wd in words:
        t = (cur + " " + wd).strip()
        if draw.textlength(t, font=fnt) <= maxw:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = wd
    if cur:
        lines.append(cur)
    return lines


def fit_text(draw, text, kind, maxw, maxh, start, minsize=28, lh=1.06):
    size = start
    while size >= minsize:
        f = font(kind, size)
        lines = wrap(draw, text, f, maxw)
        if len(lines) * size * lh <= maxh:
            return f, lines, size
        size -= 4
    f = font(kind, minsize)
    return f, wrap(draw, text, f, maxw), minsize


def draw_lines(draw, xy, lines, fnt, size, fill=WHITE, lh=1.06):
    x, y = xy
    for ln in lines:
        draw.text((x, y), ln, font=fnt, fill=fill)
        y += int(size * lh)
    return y


def logo(img, x, y, width):
    lg = Image.open(LOGO_W).convert("RGBA")
    r = width / lg.width
    lg = lg.resize((int(lg.width * r), int(lg.height * r)), Image.LANCZOS)
    img.paste(lg, (x, y), lg)


def chip(img, draw, x, y, text, size=30):
    f = font("semi", size)
    tw = draw.textlength(text, font=f)
    pad = int(size * 0.7)
    h = int(size * 1.9)
    box = [x, y, x + tw + pad * 2, y + h]
    g = gradient(int(box[2] - box[0]), h)
    m = Image.new("L", g.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, g.size[0] - 1, h - 1], radius=h // 2, fill=255)
    img.paste(g, (int(box[0]), int(box[1])), m)
    draw.text((x + pad, y + (h - size) / 2 - size * 0.12), text, font=f, fill=NIGHT)
    return box


def grad_text(img, xy, lines, fnt, size, lh=1.06):
    """Texto con el degradado de la marca (como .grad en la web)."""
    x, y = xy
    w = int(max(ImageDraw.Draw(img).textlength(l, font=fnt) for l in lines)) + 10
    h = int(len(lines) * size * lh) + int(size * 0.3)
    m = Image.new("L", (w, h), 0)
    dm = ImageDraw.Draw(m)
    yy = 0
    for l in lines:
        dm.text((0, yy), l, font=fnt, fill=255)
        yy += int(size * lh)
    img.paste(gradient(w, h), (x, y), m)
    return y + yy


def footer(img, draw, w, h, pad, page=None, total=None, url="nexgent.io"):
    f = font("medium", 26)
    draw.text((pad, h - pad - 26), url, font=f, fill=MUTED)
    if page:
        t = f"{page}/{total}"
        draw.text((w - pad - draw.textlength(t, font=f), h - pad - 26), t, font=f, fill=MUTED)


def save(img, out, name):
    out.mkdir(parents=True, exist_ok=True)
    p = out / name
    img.convert("RGB").save(p, "JPEG", quality=86, optimize=True, progressive=True)
    th = img.copy()
    th.thumbnail((360, 9999), Image.LANCZOS)
    th.convert("RGB").save(out / f"thumb-{name}", "JPEG", quality=72, optimize=True)
    return p


def bg_from(spec, w, h, seed=0):
    if spec.get("fondo") and Path(spec["fondo"]).exists():
        return cover(Image.open(spec["fondo"]), w, h)
    return brand_bg(w, h, seed)


# ---------- plantillas ----------
def blog(spec, out):
    base = bg_from(spec, 1600, 900)
    save(base, out, "cover.jpg")
    W, H, P = 1200, 630, 64
    img = shade(cover(base, W, H), top=0.25, bottom=0.94, start=0.15)
    d = ImageDraw.Draw(img)
    logo(img, P, P, 170)
    y = H - P - 40
    f, lines, s = fit_text(d, spec["titulo"], "display", W - 2 * P, 230, 64, 36)
    y -= int(len(lines) * s * 1.06)
    draw_lines(d, (P, y), lines, f, s)
    if spec.get("etiqueta"):
        chip(img, d, P, y - 78, spec["etiqueta"], 24)
    d.text((P, H - P - 10), "nexgent.io/blog", font=font("medium", 22), fill=MUTED)
    save(img, out, "og.jpg")


def post(spec, out, name="post.jpg"):
    W, H, P = 1080, 1350, 80
    img = shade(bg_from(spec, W, H), top=0.1, bottom=0.95, start=0.3)
    d = ImageDraw.Draw(img)
    logo(img, P, P, 190)
    f, lines, s = fit_text(d, spec["titulo"], "display", W - 2 * P, 420, 92, 52)
    sub = spec.get("subtitulo")
    fs = font("text", 36)
    sl = wrap(d, sub, fs, W - 2 * P) if sub else []
    y = H - P - 70 - len(sl) * 48 - (30 if sl else 0) - int(len(lines) * s * 1.04)
    if spec.get("etiqueta"):
        chip(img, d, P, y - 92, spec["etiqueta"], 30)
    y = draw_lines(d, (P, y), lines, f, s, lh=1.04)
    if sl:
        y += 30
        for l in sl:
            d.text((P, y), l, font=fs, fill=(220, 223, 230))
            y += 48
    footer(img, d, W, H, P)
    return save(img, out, name)


def slide_text(sl, W, H, P, i, n):
    img = brand_bg(W, H, i)
    img = Image.blend(img, Image.new("RGB", (W, H), NIGHT), 0.35)
    d = ImageDraw.Draw(img)
    logo(img, P, P, 150)
    y = 260
    t = sl.get("tipo", "texto")
    if t == "dato":
        f = font("display", 220)
        y = grad_text(img, (P - 6, y), [sl["numero"]], f, 220, 1.0) + 30
    elif sl.get("kicker"):
        d.text((P, y), sl["kicker"], font=font("semi", 32), fill=TURQ)
        y += 64
    if sl.get("titulo"):
        f, lines, s = fit_text(d, sl["titulo"], "display", W - 2 * P, 360, 76, 44)
        y = draw_lines(d, (P, y), lines, f, s) + 34
    if t == "lista":
        fi = font("medium", 38)
        for k, it in enumerate(sl.get("items", [])[:6]):
            ll = wrap(d, it, fi, W - 2 * P - 70)
            d.ellipse([P, y + 14, P + 22, y + 36], fill=TURQ)
            for l in ll:
                d.text((P + 50, y), l, font=fi, fill=WHITE)
                y += 52
            y += 22
    if sl.get("texto"):
        ft = font("text", 40)
        for l in wrap(d, sl["texto"], ft, W - 2 * P)[:12]:
            d.text((P, y), l, font=ft, fill=(214, 218, 226))
            y += 56
    if sl.get("nota"):
        fn = font("text", 26)
        yy = H - P - 90
        for l in wrap(d, sl["nota"], fn, W - 2 * P)[-2:]:
            d.text((P, yy), l, font=fn, fill=MUTED)
            yy += 34
    footer(img, d, W, H, P, i if n > 1 else None, n)
    return img


def slide_cta(sl, W, H, P, i, n):
    img = brand_bg(W, H, i + 2)
    d = ImageDraw.Draw(img)
    logo(img, P, P, 150)
    f, lines, s = fit_text(d, sl.get("titulo") or "¿Cuántos clientes se quedan sin respuesta en tu red?", "display", W - 2 * P, 420, 84, 48)
    y = draw_lines(d, (P, 330), lines, f, s) + 40
    ft = font("text", 40)
    for l in wrap(d, sl.get("texto") or "Te lo medimos en el diagnóstico de atención, sede por sede.", ft, W - 2 * P):
        d.text((P, y), l, font=ft, fill=(214, 218, 226))
        y += 56
    y += 50
    bw, bh = W - 2 * P, 120
    g = gradient(bw, bh)
    m = Image.new("L", (bw, bh), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, bw - 1, bh - 1], radius=60, fill=255)
    img.paste(g, (P, y), m)
    fb = font("bold", 44)
    txt = sl.get("boton") or "Solicita tu diagnóstico en nexgent.io"
    d.text((P + (bw - d.textlength(txt, font=fb)) / 2, y + 34), txt, font=fb, fill=NIGHT)
    footer(img, d, W, H, P, i, n)
    return img


def carrusel(spec, out):
    W, H, P = 1080, 1350, 80
    sls = spec.get("diapositivas") or []
    n = len(sls)
    for i, sl in enumerate(sls, 1):
        t = sl.get("tipo", "texto")
        if t == "portada":
            s = dict(spec, titulo=sl.get("titulo", spec.get("titulo")), subtitulo=sl.get("texto", spec.get("subtitulo")))
            p = post(s, out, f"{i:02d}.jpg")
            img = Image.open(p)
            d = ImageDraw.Draw(img)
            footer(img, d, W, H, P, i, n)
            save(img, out, f"{i:02d}.jpg")
            save(img, out, "post.jpg")
        elif t == "cta":
            save(slide_cta(sl, W, H, P, i, n), out, f"{i:02d}.jpg")
        else:
            save(slide_text(sl, W, H, P, i, n), out, f"{i:02d}.jpg")


def dato(spec, out):
    sl = {"tipo": "dato", "numero": spec["numero"], "titulo": spec.get("titulo"), "texto": spec.get("subtitulo"), "nota": spec.get("nota")}
    save(slide_text(sl, 1080, 1350, 80, 1, 1).crop((0, 0, 1080, 1350)), out, "dato.jpg")


def linkedin(spec, out):
    W = H = 1200
    P = 84
    img = shade(side_shade(bg_from(spec, W, H, 1)), top=0.3, bottom=0.95, start=0.2)
    d = ImageDraw.Draw(img)
    logo(img, P, P, 200)
    y = 380
    if spec.get("numero"):
        y = grad_text(img, (P - 6, y), [spec["numero"]], font("display", 200), 200, 1.0) + 24
    f, lines, s = fit_text(d, spec["titulo"], "display", W - 2 * P, 380, 80, 44)
    y = draw_lines(d, (P, y), lines, f, s) + 28
    if spec.get("subtitulo"):
        ft = font("text", 38)
        for l in wrap(d, spec["subtitulo"], ft, W - 2 * P)[:5]:
            d.text((P, y), l, font=ft, fill=(214, 218, 226))
            y += 52
    if spec.get("nota"):
        d.text((P, H - P - 70), spec["nota"], font=font("text", 24), fill=MUTED)
    footer(img, d, W, H, P)
    save(img, out, "linkedin.jpg")


def main():
    spec = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    out = Path(sys.argv[2])
    {"blog": blog, "post": post, "carrusel": carrusel, "dato": dato, "linkedin": linkedin}[spec["tipo"]](spec, out)
    print("\n".join(sorted(p.name for p in out.glob("*.jpg") if not p.name.startswith("thumb-"))))


if __name__ == "__main__":
    main()
