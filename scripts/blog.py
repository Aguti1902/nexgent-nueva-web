#!/usr/bin/env python3
"""Genera el blog de nexgent.io a partir de content/blog/.

Uso (desde la raíz del repo):  python3 scripts/blog.py

Cada artículo es un archivo content/blog/<slug>.html que empieza con un bloque de datos:

<!--meta
{"title": "...", "description": "... (150-160 caracteres)", "category": "casos-de-exito",
 "date": "2026-11-17", "author": "Equipo NexGent", "cover": "pi4", "keywords": ["..."],
 "draft": false}
-->
<p>Texto del artículo en HTML: <h2>, <h3>, <p>, <ul>, <blockquote>, <a>…</p>

Genera:
- blog/<slug>.html            una página por artículo (URL /blog/<slug>)
- blog/categoria/<cat>.html   una página por categoría (URL /blog/categoria/<cat>)
- blog.html                   portada del blog con filtro por categorías (URL /blog)
- index.html                  los 3 últimos artículos entre <!-- blog:latest --> y <!-- /blog:latest -->
- sitemap.xml                 añade las URLs del blog y conserva el resto
- blog/feed.xml               RSS
Los artículos con "draft": true no se publican.
Campos opcionales del artículo: "seoTitle" (title ≤ 60) y "seoDescription" (meta description 140–160;
si no está, se usa "description", que también es la entradilla visible), "updated" (AAAA-MM-DD, lastmod).

Landings de sector (equipo SEO, Atril): content/landings/<slug>.html con el mismo bloque <!--meta-->:
{"title": "...(title 50-60)", "description": "...(140-160)", "h1": "...", "lead": "...", "nav": "texto del pie",
 "date": "AAAA-MM-DD", "updated": "AAAA-MM-DD", "order": 1, "draft": false}
Se publican en /<slug> (archivo <slug>.html en la raíz), entran en el sitemap y en la columna «Soluciones» del pie
de todas las páginas (también index.html, legal.html y 404.html, entre <!-- landings:foot --> y <!-- /landings:foot -->).
Las preguntas en <details class="bxq"> generan FAQPage.
"""
import html, json, re, sys, datetime, hashlib, subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "content" / "blog"
OUT = ROOT / "blog"
SITE = "https://www.nexgent.io"
MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

def asset_version():
    h = hashlib.md5()
    for f in ("assets/css/style.css", "assets/css/blog.css", "assets/js/main.js", "assets/js/blog.js", "assets/js/three-scenes.js", "assets/css/empresa-3d.css", "assets/js/empresa-3d.js", "assets/js/e3-kit.js", "assets/js/e3-lots.js"):
        fp = ROOT / f
        if fp.exists():
            h.update(fp.read_bytes())
    return h.hexdigest()[:8]


V = asset_version()

CATS = json.loads((SRC / "categories.json").read_text(encoding="utf-8"))
LSRC = ROOT / "content" / "landings"


def load_landings():
    out = []
    for f in sorted(LSRC.glob("*.html")) if LSRC.exists() else []:
        raw = f.read_text(encoding="utf-8")
        m = re.match(r"\s*<!--meta\s*(\{.*?\})\s*-->\s*(.*)\Z", raw, re.S)
        if not m:
            sys.exit(f"landings/{f.name}: falta el bloque <!--meta {{...}} -->")
        meta = json.loads(m.group(1))
        meta["slug"], meta["body"] = f.stem, m.group(2).strip()
        for k in ("title", "description", "h1", "nav", "date"):
            if not meta.get(k):
                sys.exit(f"landings/{f.name}: falta '{k}'")
        if not meta.get("draft"):
            out.append(meta)
    out.sort(key=lambda x: (x.get("order", 99), x["slug"]))
    return out


LANDINGS = load_landings()


def git_date(path):
    try:
        d = subprocess.run(["git", "log", "-1", "--format=%cs", "--", path], cwd=ROOT, capture_output=True, text=True).stdout.strip()
        return d or None
    except Exception:
        return None
CAT = {c["slug"]: c for c in CATS}


def esc(s):
    return html.escape(str(s or ""), quote=True)


def fecha(d):
    y, m, dd = map(int, d.split("-"))
    return f"{dd} de {MESES[m - 1]} de {y}"


def words(body):
    return len(re.sub(r"<[^>]+>", " ", body).split())


def load():
    posts = []
    for f in sorted(SRC.glob("*.html")):
        raw = f.read_text(encoding="utf-8")
        m = re.match(r"\s*<!--meta\s*(\{.*?\})\s*-->\s*(.*)\Z", raw, re.S)
        if not m:
            sys.exit(f"{f.name}: falta el bloque <!--meta {{...}} -->")
        meta = json.loads(m.group(1))
        meta["slug"] = f.stem
        meta["body"] = m.group(2).strip()
        for k in ("title", "description", "category", "date"):
            if not meta.get(k):
                sys.exit(f"{f.name}: falta '{k}'")
        if meta["category"] not in CAT:
            sys.exit(f"{f.name}: categoría desconocida '{meta['category']}' (usa una de {', '.join(CAT)})")
        datetime.date.fromisoformat(meta["date"])
        meta.setdefault("author", "Equipo NexGent")
        meta.setdefault("cover", CAT[meta["category"]].get("cover", "pi1"))
        img_dir = ROOT / "assets" / "img" / "blog" / f.stem
        if not meta.get("image") and (img_dir / "cover.jpg").exists():
            meta["image"] = f"/assets/img/blog/{f.stem}/cover.jpg"
        if not meta.get("og") and (img_dir / "og.jpg").exists():
            meta["og"] = f"/assets/img/blog/{f.stem}/og.jpg"
        meta["minutes"] = max(2, round(words(meta["body"]) / 220))
        if not meta.get("draft"):
            posts.append(meta)
    posts.sort(key=lambda p: (p["date"], p["slug"]), reverse=True)
    return posts


NAV = """<header class="nav" id="nav">
  <div class="nav__inner">
    <a href="/" class="logo" aria-label="NexGent, inicio"><img class="logo__w" src="/assets/img/logo-nexgent-blanco.png" alt="NexGent" width="112" height="28"><img class="logo__d" src="/assets/img/logo-nexgent.png" alt="" width="112" height="28" aria-hidden="true"></a>
    <nav class="nav__links" aria-label="Principal">
      <a href="/#nosotros">Sobre nosotros</a>
      <a href="/blog/categoria/casos-de-exito">Casos de éxito</a>
      <a href="/#como-trabajamos">Cómo trabajamos</a>
      <a href="/blog">Blog</a>
      <a href="/#contacto">Contacto</a>
    </nav>
    <a href="/#contacto" class="btn btn--sm btn--light magnetic">Solicitar diagnóstico</a>
    <button class="nav__burger" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobileMenu"><span></span><span></span></button>
  </div>
  <div class="mobile-menu" id="mobileMenu">
    <a href="/#nosotros">Sobre nosotros</a>
    <a href="/blog/categoria/casos-de-exito">Casos de éxito</a>
    <a href="/#como-trabajamos">Cómo trabajamos</a>
    <a href="/blog">Blog</a>
    <a href="/#contacto">Contacto</a>
  </div>
</header>"""

FOOT = """<footer class="footer">
  <div class="container">
    <div class="footer__top">
      <div>
        <img class="footer__logo" src="/assets/img/logo-nexgent-blanco.png" alt="NexGent" width="168" height="42">
        <p class="footer__claim">IA que atiende a los clientes de las redes de franquicias. Por WhatsApp y por teléfono, en todas las sedes.</p>
      </div>
      <a href="/#contacto" class="btn btn--grad magnetic">Solicitar diagnóstico</a>
    </div>
    <div class="footer__grid">
      <div><h4>Empresa</h4><a href="/#nosotros">Sobre nosotros</a><a href="/#caso">Caso de éxito</a><a href="/#como-trabajamos">Cómo trabajamos</a><a href="/blog">Blog</a><a href="/empresa-3d">NexGent 3D</a></div>
      <div><h4>Blog</h4>__CATLINKS__</div>
      __LANDFOOT__
      <div><h4>Contacto</h4><a href="/#contacto">Solicitar diagnóstico</a><a href="https://wa.me/34684486647">WhatsApp</a><a href="https://www.linkedin.com/company/nexgentai">LinkedIn</a><a href="https://www.instagram.com/nexgentai">Instagram</a></div>
      <div><h4>Legal</h4><a href="/legal#aviso-legal">Aviso legal</a><a href="/legal#privacidad">Privacidad</a><a href="/legal#cookies">Cookies</a></div>
    </div>
    <div class="footer__bottom"><p>© 2026 NEXGENT AI SYSTEMS, S.L. · NIF B22534564 · Calle Julio Verne 12, 18210 Peligros (Granada)</p><p>Hecho en Granada</p></div>
  </div>
</footer>
<script src="/assets/vendor/gsap.min.js"></script>
<script src="/assets/vendor/ScrollTrigger.min.js"></script>
<script src="/assets/vendor/lenis.min.js"></script>
<script src="/assets/js/main.js?v=__V__"></script>
<script src="/assets/js/blog.js?v=__V__"></script>"""


def cover_html(p, eager=False):
    if p.get("image"):
        load = 'fetchpriority="high"' if eager else 'loading="lazy"'
        return (f'<div class="post__img has-img"><img src="{esc(p["image"])}" alt="{esc(p.get("imageAlt") or p["title"])}" '
                f'width="1600" height="900" {load} decoding="async"></div>')
    return f'<div class="post__img {esc(p["cover"])}"></div>'


def landfoot():
    if not LANDINGS:
        return ""
    return "<div><h4>Soluciones</h4>" + "".join(f'<a href="/{l["slug"]}">{esc(l["nav"])}</a>' for l in LANDINGS) + "</div>"


def seo_desc(p):
    return p.get("seoDescription") or p["description"]


def seo_title(p):
    """<title> del artículo: usa "seoTitle" si existe y añade « · NexGent» solo si cabe en 65 caracteres."""
    t = p.get("seoTitle") or p["title"]
    return f"{t} · NexGent" if len(t) + 10 <= 65 else t


def page(title, description, canonical, body, jsonld=None, og_type="website", image=None, main_cls="bx", extra_css=""):
    if isinstance(jsonld, list):
        ld = "".join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>\n' for x in jsonld)
    else:
        ld = f'<script type="application/ld+json">{json.dumps(jsonld, ensure_ascii=False)}</script>\n' if jsonld else ""
    catlinks = "".join(f'<a href="/blog/categoria/{c["slug"]}">{esc(c["name"])}</a>' for c in CATS)
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(description)}">
<link rel="canonical" href="{SITE}{canonical}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(description)}">
<meta property="og:type" content="{og_type}">
<meta property="og:url" content="{SITE}{canonical}">
<meta property="og:locale" content="es_ES">
<meta property="og:image" content="{SITE}{image or '/assets/img/og-nexgent.jpg'}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="{SITE}{image or '/assets/img/og-nexgent.jpg'}">
<meta name="theme-color" content="#000000">
<link rel="alternate" type="application/rss+xml" title="Blog de NexGent" href="/blog/feed.xml">
<link rel="icon" type="image/png" href="/assets/img/favicon.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Inter+Tight:wght@500;600;700;800&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css?v={V}">
<link rel="stylesheet" href="/assets/css/blog.css?v={V}">
{extra_css}{ld}</head>
<body>
<a class="skip" href="#main">Saltar al contenido</a>
<div class="progress" aria-hidden="true"><span id="progressBar"></span></div>
{NAV}
<main id="main" class="{main_cls}">
{body}
</main>
{FOOT.replace("__CATLINKS__", catlinks).replace("__LANDFOOT__", landfoot()).replace("__V__", V)}
</body>
</html>
"""


def card(p):
    c = CAT[p["category"]]
    return (f'<a class="bxcard" href="/blog/{p["slug"]}" data-cat="{p["category"]}">'
            f'<div class="bxcard__img">{img_tag(p)}</div>'
            f'<div class="bxcard__body"><span class="bxcat bxcat--{p["category"]}">{esc(c["name"])}</span>'
            f'<h3>{esc(p["title"])}</h3>'
            f'<p>{esc(p["description"])}</p>'
            f'<span class="bxmeta">{fecha(p["date"])} · {p["minutes"]} min de lectura</span></div></a>')


def img_tag(p, eager=False):
    if p.get("image"):
        load = 'fetchpriority="high"' if eager else 'loading="lazy"'
        return f'<img src="{esc(p["image"])}" alt="{esc(p.get("imageAlt") or p["title"])}" width="1600" height="900" {load} decoding="async">'
    return f'<span class="bxph {esc(p["cover"])}"></span>'


def featured(p):
    c = CAT[p["category"]]
    return (f'<a class="bxfeat" href="/blog/{p["slug"]}" data-cat="{p["category"]}">'
            f'<div class="bxfeat__img">{img_tag(p, True)}</div>'
            f'<div class="bxfeat__body"><span class="bxfeat__tag">Último artículo</span>'
            f'<span class="bxcat bxcat--{p["category"]}">{esc(c["name"])}</span>'
            f'<h2>{esc(p["title"])}</h2><p>{esc(p["description"])}</p>'
            f'<span class="bxmeta">{fecha(p["date"])} · {p["minutes"]} min de lectura</span>'
            f'<span class="bxmore">Leer artículo <i aria-hidden="true">→</i></span></div></a>')


def filters(active, posts):
    n = lambda slug: sum(1 for q in posts if slug is None or q["category"] == slug)
    items = [f'<a class="bxfilter{" is-on" if active is None else ""}" href="/blog" data-cat="all"{" aria-current=\"page\"" if active is None else ""}>Todo <b>{n(None)}</b></a>']
    for c in CATS:
        on = active == c["slug"]
        items.append(f'<a class="bxfilter{" is-on" if on else ""}" href="/blog/categoria/{c["slug"]}" data-cat="{c["slug"]}"{" aria-current=\"page\"" if on else ""}>{esc(c["name"])} <b>{n(c["slug"])}</b></a>')
    return '<nav class="bxfilters" aria-label="Categorías del blog">' + "".join(items) + "</nav>"


DEF_CHAT = [["in", "Hola, ¿tenéis hueco el sábado por la mañana?", "23:47"],
            ["out", "¡Hola! Sí: el sábado tengo hueco a las 10:00, 11:00 o 12:30. ¿Cuál te va mejor?", "23:47"],
            ["in", "A las 11 perfecto", "23:48"],
            ["card", "✅ Cita confirmada<br><b>Sábado · 11:00</b>", "23:48"]]
DEF_FLOW = [["23:47", "La clienta escribe", "El centro cerró hace horas."],
            ["3 segundos", "Nexi responde", "Con los huecos reales de la agenda."],
            ["23:48", "Cita agendada", "Directa en la agenda del centro."],
            ["24 h antes", "Recordatorio", "Confirma o cambia con un toque."],
            ["El día", "Llega a su cita", "Una venta que no se ha perdido."]]


def landing_body(l):
    chat = l.get("chat") or DEF_CHAT
    msgs = []
    for i, (kind, txt, t) in enumerate(chat):
        if kind == "card":
            msgs.append(f'<div class="msg msg--out" style="--i:{i}"><span class="msg__card">{txt}</span><time>{esc(t)}</time></div>')
        elif kind == "sys":
            msgs.append(f'<div class="msg msg--sys" style="--i:{i}">{esc(txt)}</div>')
        else:
            msgs.append(f'<div class="msg msg--{"in" if kind == "in" else "out"}" style="--i:{i}">{esc(txt)}<time>{esc(t)}</time></div>')
    kpis = l.get("kpis") or [["24/7", "WhatsApp y teléfono de cada sede"], ["3 s", "en responder, de día o de noche"], ["71 %", "de citas confirmadas por WhatsApp"]]
    kp = "".join(f"<div><b>{esc(a)}</b><span>{esc(b)}</span></div>" for a, b in kpis)
    chip_a = l.get("chipA") or ["Respuesta en 3 s", "con el centro cerrado"]
    chip_b = l.get("chipB") or ["Cita confirmada", "directa en la agenda"]
    sc = l.get("escena") or {}
    img = f"/assets/img/landings/{l['slug']}.jpg"
    band = ""
    if (ROOT / img.lstrip("/")).exists():
        band = f"""<section class="lband" aria-label="{esc(sc.get('kicker', 'Fuera de horario'))}">
  <img src="{img}" alt="{esc(sc.get('alt', ''))}" loading="eager" fetchpriority="low" decoding="async" width="1536" height="1024">
  <div class="container"><div class="lband__in">
    <p class="kicker">{esc(sc.get('kicker', 'Fuera de horario'))}</p>
    <h2>{sc.get('titulo', 'Tu centro cierra. <span class="grad">Tus clientes, no.</span>')}</h2>
    <p>{esc(sc.get('texto', 'La mayoría de los mensajes llegan cuando nadie puede contestarlos: a la hora de comer, por la noche y el domingo. Nexi los atiende todos, en cada sede de la red.'))}</p>
  </div></div>
</section>
"""
    flow = l.get("flujo") or DEF_FLOW
    fl = "".join(f'<li><span class="lflow__t">{esc(a)}</span><h3>{esc(b)}</h3><p>{esc(c)}</p></li>' for a, b, c in flow)
    flow_html = f"""<section class="lflow" aria-label="Cómo trabaja Nexi">
  <div class="container">
    <p class="kicker">Así trabaja Nexi</p>
    <h2 class="h2">De un mensaje a una cita.<br><span class="grad">Sin que nadie toque nada.</span></h2>
    <div class="lflow__line" aria-hidden="true"><i></i></div>
    <ol class="lflow__list">{fl}</ol>
  </div>
</section>
"""
    frase = l.get("frase") or 'Una sede atiende unas 66 horas a la semana. <span class="grad">Sus clientes escriben y llaman las 168.</span>'
    state = f'<section class="lstate" aria-label="El problema en una frase"><div class="container"><p class="lstate__t">{frase}</p></div></section>\n'
    dots = "<i></i>" * 240
    sedes = f"""<section class="lsedes" aria-label="Toda la red a la vez">
  <div class="container">
    <p class="kicker">{esc(l.get('sedesKicker', 'Toda la red · A la vez'))}</p>
    <h2 class="h2">{l.get('sedesTitulo', 'Cada punto, una sede.<br><span class="grad">Todas atendidas a la vez.</span>')}</h2>
    <div class="lsedes__grid" aria-hidden="true">{dots}</div>
    <p class="lsedes__cap"><b class="lsedes__n">+100</b> franquicias con la IA de NexGent implantada</p>
  </div>
</section>
"""
    words = l.get("marquee") or ["WhatsApp 24/7", "Llamadas con voz IA", "Citas en la agenda", "Recordatorios", "Cambios y anulaciones", "Panel de la central", "API oficial de WhatsApp", "Cada sede con su número"]
    track = "".join(f"<span>{esc(w)}</span>" for w in words) * 2
    mq = f'<section class="lmq" aria-hidden="true"><div class="marquee"><div class="marquee__track">{track}</div></div></section>\n'
    body = l["body"].replace("section-light", "section-dk")
    body = body.replace('<section class="section-dk lnd">', '<section class="section-dk lnd lnd--split">', 1)
    cut = body.find("</section>")
    first, rest = (body[:cut + 10], body[cut + 10:]) if cut >= 0 else ("", body)
    return f"""<header class="lhero">
  <div class="lhero__bg" aria-hidden="true"></div><div class="lhero__grid" aria-hidden="true"></div>
  <div class="container lhero__in">
    <div>
      <nav class="bxcrumbs" aria-label="Migas de pan"><a href="/">Inicio</a><span aria-hidden="true">/</span><span>{esc(l['nav'])}</span></nav>
      <p class="kicker">{esc(l.get('kicker', 'Nexi · IA por WhatsApp y voz'))}</p>
      <h1>{l['h1']}</h1>
      <p class="lhero__lead">{esc(l.get('lead', l['description']))}</p>
      <div class="hero__ctas"><a href="/reunion" class="btn btn--grad magnetic">Reservar una reunión</a><a href="tel:+34684486647" class="btn btn--ghost magnetic">Llamar al 684 486 647</a></div>
      <div class="lhero__kpis">{kp}</div>
    </div>
    <div class="lphone" aria-hidden="true">
      <div class="lchip lchip--a"><i>⚡</i><div><b>{esc(chip_a[0])}</b>{esc(chip_a[1])}</div></div>
      <div class="phone">
        <div class="phone__notch"></div>
        <div class="phone__status"><span>23:47</span><span class="phone__icons">●●● ▮</span></div>
        <div class="wa__head"><div class="wa__avatar">N</div><div><strong>{esc(l.get('chatName', 'Tu centro · Nexi'))}</strong><small>en línea</small></div></div>
        <div class="wa__body">{"".join(msgs)}</div>
        <div class="wa__input"><span>Mensaje</span><i></i></div>
      </div>
      <div class="phone-shadow"></div>
      <div class="lchip lchip--b"><i>✓</i><div><b>{esc(chip_b[0])}</b>{esc(chip_b[1])}</div></div>
    </div>
  </div>
</header>
{first}
{state}{band}{sedes}{flow_html}{mq}{rest}
<script defer src="/assets/js/landing.js?v={V}"></script>"""

def build():
    posts = load()
    OUT.mkdir(exist_ok=True)
    (OUT / "categoria").mkdir(exist_ok=True)
    keep = {f"{p['slug']}.html" for p in posts}
    for f in OUT.glob("*.html"):
        if f.name not in keep:
            f.unlink()
    for f in (OUT / "categoria").glob("*.html"):
        if f.stem not in CAT:
            f.unlink()

    # Artículos
    for p in posts:
        c = CAT[p["category"]]
        related = [q for q in posts if q["slug"] != p["slug"] and q["category"] == p["category"]][:3]
        if len(related) < 3:
            related += [q for q in posts if q["slug"] != p["slug"] and q not in related][: 3 - len(related)]
        ld = {"@context": "https://schema.org", "@type": "BlogPosting", "headline": p["title"], "description": p["description"],
              "datePublished": p["date"], "dateModified": p.get("updated", p["date"]), "inLanguage": "es-ES",
              "author": {"@type": "Organization" if p["author"].startswith("Equipo") else "Person", "name": p["author"]},
              "publisher": {"@type": "Organization", "name": "NexGent", "logo": {"@type": "ImageObject", "url": f"{SITE}/assets/img/logo-nexgent.png"}},
              "mainEntityOfPage": f"{SITE}/blog/{p['slug']}", "articleSection": c["name"], "keywords": ", ".join(p.get("keywords", []))}
        if p.get("image"):
            ld["image"] = [f"{SITE}{p['image']}"] + ([f"{SITE}{p['og']}"] if p.get("og") else [])
        crumbs = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Blog", "item": f"{SITE}/blog"},
            {"@type": "ListItem", "position": 2, "name": c["name"], "item": f"{SITE}/blog/categoria/{c['slug']}"},
            {"@type": "ListItem", "position": 3, "name": p["title"]}]}
        share_url = f"{SITE}/blog/{p['slug']}"
        body = f"""<header class="bxah">
  <div class="bxah__bg" aria-hidden="true"></div>
  <div class="container bxah__in">
    <nav class="bxcrumbs" aria-label="Migas de pan"><a href="/blog">Blog</a><span aria-hidden="true">/</span><a href="/blog/categoria/{c['slug']}">{esc(c['name'])}</a></nav>
    <a class="bxcat bxcat--{c['slug']} bxcat--dark" href="/blog/categoria/{c['slug']}">{esc(c['name'])}</a>
    <h1 class="bxah__title">{esc(p['title'])}</h1>
    <p class="bxah__lead">{esc(p['description'])}</p>
    <div class="bxah__meta">
      <span class="bxauthor"><img src="/assets/img/favicon.png" alt="" width="40" height="40"><span><b>{esc(p['author'])}</b><small><time datetime="{p['date']}">{fecha(p['date'])}</time> · {p['minutes']} min de lectura</small></span></span>
      <span class="bxshare" data-url="{share_url}" data-title="{esc(p['title'])}">
        <a class="bxshare__b" href="https://www.linkedin.com/sharing/share-offsite/?url={share_url}" target="_blank" rel="noopener" aria-label="Compartir en LinkedIn"><svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96V21H9z"/></svg></a>
        <a class="bxshare__b" href="https://wa.me/?text={html.escape(p['title'], quote=True)}%20{share_url}" target="_blank" rel="noopener" aria-label="Compartir por WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.4-.3z"/></svg></a>
        <button class="bxshare__b bxcopy" type="button" aria-label="Copiar enlace"><svg viewBox="0 0 24 24"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg><span class="bxcopy__ok">¡Copiado!</span></button>
      </span>
    </div>
  </div>
</header>
<div class="container"><figure class="bxcover">{img_tag(p, True)}</figure></div>
<section class="bxread">
  <div class="container bxread__grid">
    <article class="bxprose" id="articulo">
{p['body']}
    </article>
    <aside class="bxside" aria-label="En este artículo">
      <div class="bxtoc"><p class="bxtoc__t">En este artículo</p><ol id="bxtoc"></ol></div>
      <div class="bxmini"><p><b>¿Cuántos contactos pierden tus sedes?</b>Lo medimos en el diagnóstico de atención.</p><a href="/#contacto" class="btn btn--grad btn--sm">Solicitar diagnóstico</a></div>
    </aside>
  </div>
</section>
<section class="bxcta">
  <div class="bxcta__rings" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="container bxcta__in">
    <p class="kicker">Diagnóstico de atención</p>
    <h2>¿Cuántos clientes se quedan <span class="grad">sin respuesta en tu red?</span></h2>
    <p>Medimos los mensajes y las llamadas que reciben tus sedes y cuántos se pierden. Con esos números decides si un piloto tiene sentido.</p>
    <a href="/#contacto" class="btn btn--grad magnetic">Solicitar diagnóstico</a>
  </div>
</section>
{"<section class='bxrel'><div class='container'><div class='bxrel__head'><h2>Sigue leyendo</h2><a href='/blog'>Ver todo el blog →</a></div><div class='bxgrid'>" + "".join(card(q) for q in related) + "</div></div></section>" if related else ""}"""
        lds = [ld, crumbs]
        faqs = re.findall(r'<details class="bxq"><summary>(.*?)</summary>(.*?)</details>', p["body"], re.S)
        if faqs:
            strip = lambda t: re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", t))).strip()
            lds.append({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
                {"@type": "Question", "name": strip(q), "acceptedAnswer": {"@type": "Answer", "text": strip(a)}} for q, a in faqs]})
        (OUT / f"{p['slug']}.html").write_text(page(seo_title(p), seo_desc(p), f"/blog/{p['slug']}", body, lds, "article", p.get("og")), encoding="utf-8")

    # Portada y categorías
    def listing(cat):
        sel = [p for p in posts if cat is None or p["category"] == cat]
        if cat is None:
            kick, h1, lead = "Blog de NexGent", 'Ideas para redes<br><span class="grad">que crecen.</span>', "Casos de éxito con datos reales, franquicias, WhatsApp e IA de voz. Sin jerga."
        else:
            c = CAT[cat]
            kick, h1, lead = '<a href="/blog">Blog</a> · Categoría', esc(c["name"]), esc(c["description"])
        head = f"""<header class="bxhero">
  <div class="bxhero__bg" aria-hidden="true"><i></i><i></i></div>
  <div class="container bxhero__in">
    <p class="kicker">{kick}</p>
    <h1 class="bxhero__title">{h1}</h1>
    <p class="bxhero__lead">{lead}</p>
    {filters(cat, posts)}
  </div>
</header>"""
        if not sel:
            return head + '<section class="bxlist"><div class="container"><p class="bxempty">Muy pronto publicaremos el primer artículo de esta categoría.</p></div></section>'
        first, rest = sel[0], sel[1:]
        grid = '<div class="bxgrid">' + "".join(card(p) for p in rest) + "</div>" if rest else ""
        all_cards = '<template id="bxall">' + "".join(card(p) for p in posts) + "</template>" if cat is None else ""
        return head + f'<section class="bxlist"><div class="container">{featured(first)}{grid}<p class="bxempty" hidden>No hay artículos en esta categoría todavía.</p>{all_cards}</div></section>'

    (ROOT / "blog.html").write_text(page("Blog de NexGent: IA, WhatsApp y voz para franquicias", "Casos de éxito, franquicias, WhatsApp e IA de voz: ideas con datos reales para que ninguna sede de tu red de franquicias deje a un cliente sin respuesta.", "/blog", listing(None), {"@context": "https://schema.org", "@type": "Blog", "name": "Blog de NexGent", "url": f"{SITE}/blog", "inLanguage": "es-ES"}), encoding="utf-8")
    for c in CATS:
        (OUT / "categoria" / f"{c['slug']}.html").write_text(page(c.get("seoTitle") or f"{c['name']} · Blog de NexGent", c["description"], f"/blog/categoria/{c['slug']}", listing(c["slug"])), encoding="utf-8")

    # Versión de estilos y scripts en las páginas de la raíz (evita cachés antiguas)
    for f in ("index.html", "legal.html", "404.html", "empresa-3d.html"):
        fp = ROOT / f
        if fp.exists():
            t = fp.read_text(encoding="utf-8")
            t = re.sub(r'(assets/(?:css/style\.css|js/main\.js|js/three-scenes\.js|css/empresa-3d\.css|js/empresa-3d\.js))(\?v=[0-9a-f]+)?"', lambda m: f'{m.group(1)}?v={V}"', t)
            fp.write_text(t, encoding="utf-8")

    # Home: últimos 3
    idx = ROOT / "index.html"
    s = idx.read_text(encoding="utf-8")
    latest = "".join(f'<a class="post spot reveal" href="/blog/{p["slug"]}">{cover_html(p)}<span class="chip chip--dark">{esc(CAT[p["category"]]["name"])}</span><h3>{esc(p["title"])}</h3></a>' for p in posts[:3])
    if "<!-- blog:latest -->" in s:
        s = re.sub(r"<!-- blog:latest -->.*?<!-- /blog:latest -->", lambda m: f"<!-- blog:latest -->{latest}<!-- /blog:latest -->", s, flags=re.S)
        idx.write_text(s, encoding="utf-8")

    # Landings de sector: /<slug>
    known = {f"{l['slug']}.html" for l in LANDINGS}
    for l in LANDINGS:
        url = f"{SITE}/{l['slug']}"
        faqs = re.findall(r'<details class="bxq"><summary>(.*?)</summary>(.*?)</details>', l["body"], re.S)
        strip = lambda t: re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", t))).strip()
        lds = [{"@context": "https://schema.org", "@type": "Service", "name": l["h1"] if "<" not in l["h1"] else strip(l["h1"]),
                "serviceType": l.get("serviceType", "Atención al cliente con IA por WhatsApp y teléfono"), "description": l["description"],
                "url": url, "areaServed": {"@type": "Country", "name": "España"}, "inLanguage": "es-ES",
                "provider": {"@type": "Organization", "name": "NEXGENT AI SYSTEMS, S.L.", "alternateName": "NexGent", "url": SITE, "telephone": "+34684486647"},
                "offers": {"@type": "Offer", "price": "230", "priceCurrency": "EUR", "description": "Pack mensual por sede: 2.000 mensajes de WhatsApp y 500 minutos de llamada"}},
               {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
                   {"@type": "ListItem", "position": 1, "name": "Inicio", "item": f"{SITE}/"},
                   {"@type": "ListItem", "position": 2, "name": l["nav"], "item": url}]}]
        if faqs:
            lds.append({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
                {"@type": "Question", "name": strip(q), "acceptedAnswer": {"@type": "Answer", "text": strip(a)}} for q, a in faqs]})
        body = landing_body(l)
        img = f"/assets/img/landings/{l['slug']}.jpg"
        (ROOT / f"{l['slug']}.html").write_text(page(l["title"], l["description"], f"/{l['slug']}", body, lds,
            image=img if (ROOT / img.lstrip("/")).exists() else None, main_cls="bx bx--lnd",
            extra_css=f'<link rel="stylesheet" href="/assets/css/landing.css?v={V}">\n'), encoding="utf-8")

    # Pie de las páginas estáticas: columna «Soluciones»
    for f in ("index.html", "legal.html", "404.html", "empresa-3d.html"):
        fp = ROOT / f
        if fp.exists():
            t = fp.read_text(encoding="utf-8")
            if "<!-- landings:foot -->" in t:
                t = re.sub(r"<!-- landings:foot -->.*?<!-- /landings:foot -->", lambda m: f"<!-- landings:foot -->{landfoot()}<!-- /landings:foot -->", t, flags=re.S)
                fp.write_text(t, encoding="utf-8")

    # Sitemap: conserva las URLs que no son del blog ni landings, y pone lastmod a todo
    sm = ROOT / "sitemap.xml"
    old = re.findall(r"<loc>(.*?)</loc>", sm.read_text(encoding="utf-8")) if sm.exists() else []
    lurls = {f"{SITE}/{l['slug']}" for l in LANDINGS}
    other = [u for u in old if "/blog" not in u and u not in lurls]
    def file_for(u):
        path = u[len(SITE):].strip("/") or "index"
        return path + ".html"
    urls = [(u, git_date(file_for(u))) for u in other]
    urls += [(f"{SITE}/{l['slug']}", l.get("updated", l["date"])) for l in LANDINGS]
    urls += [(f"{SITE}/blog", max(p.get("updated", p["date"]) for p in posts) if posts else None)]
    for c in CATS:
        ds = [p.get("updated", p["date"]) for p in posts if p["category"] == c["slug"]]
        urls.append((f"{SITE}/blog/categoria/{c['slug']}", max(ds) if ds else git_date("content/blog/categories.json")))
    urls += [(f"{SITE}/blog/{p['slug']}", p.get("updated", p["date"])) for p in posts]
    sm.write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
                  "".join(f"<url><loc>{u}</loc>{f'<lastmod>{d}</lastmod>' if d else ''}</url>\n" for u, d in urls) + "</urlset>\n", encoding="utf-8")

    # RSS
    items = "".join(f"<item><title>{esc(p['title'])}</title><link>{SITE}/blog/{p['slug']}</link><guid>{SITE}/blog/{p['slug']}</guid>"
                    f"<pubDate>{datetime.datetime.fromisoformat(p['date']).strftime('%a, %d %b %Y 08:00:00 +0100')}</pubDate>"
                    f"<category>{esc(CAT[p['category']]['name'])}</category><description>{esc(p['description'])}</description></item>" for p in posts[:30])
    (OUT / "feed.xml").write_text(f'<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Blog de NexGent</title><link>{SITE}/blog</link><description>IA para redes de franquicias</description><language>es-es</language>{items}</channel></rss>\n', encoding="utf-8")

    # Índice para los agentes del panel
    (OUT / "posts.json").write_text(json.dumps([{k: p[k] for k in ("slug", "title", "description", "category", "date", "minutes")} for p in posts], ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(posts)} artículos publicados en {len(CATS)} categorías · {len(LANDINGS)} landings")


if __name__ == "__main__":
    build()
