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
"""
import html, json, re, sys, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "content" / "blog"
OUT = ROOT / "blog"
SITE = "https://nexgent.io"
MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

CATS = json.loads((SRC / "categories.json").read_text(encoding="utf-8"))
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
      <div><h4>Empresa</h4><a href="/#nosotros">Sobre nosotros</a><a href="/#caso">Caso de éxito</a><a href="/#como-trabajamos">Cómo trabajamos</a><a href="/blog">Blog</a></div>
      <div><h4>Blog</h4>__CATLINKS__</div>
      <div><h4>Contacto</h4><a href="/#contacto">Solicitar diagnóstico</a><a href="https://wa.me/34684486647">WhatsApp</a><a href="https://www.linkedin.com/company/nexgentai">LinkedIn</a><a href="https://www.instagram.com/nexgentai">Instagram</a></div>
      <div><h4>Legal</h4><a href="/legal#aviso-legal">Aviso legal</a><a href="/legal#privacidad">Privacidad</a><a href="/legal#cookies">Cookies</a></div>
    </div>
    <div class="footer__bottom"><p>© 2026 NEXGENT AI SYSTEMS, S.L. · NIF B22534564 · Calle Julio Verne 12, 18210 Peligros (Granada)</p><p>Hecho en Granada</p></div>
  </div>
</footer>
<script src="/assets/vendor/gsap.min.js"></script>
<script src="/assets/vendor/ScrollTrigger.min.js"></script>
<script src="/assets/vendor/lenis.min.js"></script>
<script src="/assets/js/main.js"></script>"""


def cover_html(p, eager=False):
    if p.get("image"):
        load = 'fetchpriority="high"' if eager else 'loading="lazy"'
        return (f'<div class="post__img has-img"><img src="{esc(p["image"])}" alt="{esc(p.get("imageAlt") or p["title"])}" '
                f'width="1600" height="900" {load} decoding="async"></div>')
    return f'<div class="post__img {esc(p["cover"])}"></div>'


def page(title, description, canonical, body, jsonld=None, og_type="website", image=None):
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
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css">
{ld}</head>
<body>
<a class="skip" href="#main">Saltar al contenido</a>
{NAV}
<main id="main" class="page">
<div class="container">
{body}
</div>
</main>
{FOOT.replace("__CATLINKS__", catlinks)}
</body>
</html>
"""


def card(p):
    c = CAT[p["category"]]
    return (f'<a class="post bcard reveal" href="/blog/{p["slug"]}" data-cat="{p["category"]}">'
            + cover_html(p) +
            f'<span class="chip chip--dark">{esc(c["name"])}</span>'
            f'<h3>{esc(p["title"])}</h3>'
            f'<p class="bcard__desc">{esc(p["description"])}</p>'
            f'<span class="bcard__meta">{fecha(p["date"])} · {p["minutes"]} min</span></a>')


def filters(active):
    items = [f'<a class="bfilter{" is-on" if active is None else ""}" href="/blog"{" aria-current=\"page\"" if active is None else ""}>Todo</a>']
    for c in CATS:
        on = active == c["slug"]
        items.append(f'<a class="bfilter{" is-on" if on else ""}" href="/blog/categoria/{c["slug"]}"{" aria-current=\"page\"" if on else ""}>{esc(c["name"])}</a>')
    return '<nav class="bfilters" aria-label="Categorías del blog">' + "".join(items) + "</nav>"


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
        body = f"""<nav class="crumbs" aria-label="Migas de pan"><a href="/blog">Blog</a><span aria-hidden="true">/</span><a href="/blog/categoria/{c['slug']}">{esc(c['name'])}</a></nav>
<article class="article apost">
{cover_html(p, True)}
<a class="chip chip--dark" href="/blog/categoria/{c['slug']}">{esc(c['name'])}</a>
<h1 class="apost__title">{esc(p['title'])}</h1>
<p class="apost__meta"><time datetime="{p['date']}">{fecha(p['date'])}</time> · {p['minutes']} min de lectura · {esc(p['author'])}</p>
<p class="apost__lead">{esc(p['description'])}</p>
<div class="prose">
{p['body']}
</div>
<aside class="apost__cta">
<h2>¿Cuántos clientes se quedan sin respuesta en tu red?</h2>
<p>En el diagnóstico de atención medimos los mensajes y las llamadas que reciben tus sedes y cuántos se pierden. Con esos números decides si un piloto tiene sentido.</p>
<a href="/#contacto" class="btn btn--grad magnetic">Solicitar diagnóstico</a>
</aside>
</article>
{"<section class='brelated'><h2 class='h2 h2--dark'>Sigue leyendo</h2><div class='blogp__grid'>" + "".join(card(q) for q in related) + "</div></section>" if related else ""}"""
        (OUT / f"{p['slug']}.html").write_text(page(f"{p['title']} · NexGent", p["description"], f"/blog/{p['slug']}", body, [ld, crumbs], "article", p.get("og")), encoding="utf-8")

    # Portada y categorías
    def listing(cat):
        sel = [p for p in posts if cat is None or p["category"] == cat]
        if cat is None:
            head = '<p class="kicker kicker--dark">Blog</p><h1>Ideas para redes<br><span class="grad">que crecen.</span></h1><p class="lead lead--dark" style="margin-top:24px">Casos de éxito, franquicias, WhatsApp e IA de voz, sin jerga.</p>'
        else:
            c = CAT[cat]
            head = f'<p class="kicker kicker--dark"><a href="/blog">Blog</a></p><h1>{esc(c["name"])}</h1><p class="lead lead--dark" style="margin-top:24px">{esc(c["description"])}</p>'
        grid = '<div class="blogp__grid bgrid">' + "".join(card(p) for p in sel) + "</div>" if sel else '<p class="bempty">Muy pronto publicaremos el primer artículo de esta categoría.</p>'
        return head + filters(cat) + grid

    (ROOT / "blog.html").write_text(page("Blog · NexGent", "Casos de éxito, franquicias, WhatsApp e IA de voz: ideas para que ninguna sede de tu red deje a un cliente sin respuesta.", "/blog", listing(None), {"@context": "https://schema.org", "@type": "Blog", "name": "Blog de NexGent", "url": f"{SITE}/blog", "inLanguage": "es-ES"}), encoding="utf-8")
    for c in CATS:
        (OUT / "categoria" / f"{c['slug']}.html").write_text(page(f"{c['name']} · Blog de NexGent", c["description"], f"/blog/categoria/{c['slug']}", listing(c["slug"])), encoding="utf-8")

    # Home: últimos 3
    idx = ROOT / "index.html"
    s = idx.read_text(encoding="utf-8")
    latest = "".join(f'<a class="post spot reveal" href="/blog/{p["slug"]}">{cover_html(p)}<span class="chip chip--dark">{esc(CAT[p["category"]]["name"])}</span><h3>{esc(p["title"])}</h3></a>' for p in posts[:3])
    if "<!-- blog:latest -->" in s:
        s = re.sub(r"<!-- blog:latest -->.*?<!-- /blog:latest -->", lambda m: f"<!-- blog:latest -->{latest}<!-- /blog:latest -->", s, flags=re.S)
        idx.write_text(s, encoding="utf-8")

    # Sitemap: conserva las URLs que no son del blog
    sm = ROOT / "sitemap.xml"
    old = re.findall(r"<loc>(.*?)</loc>", sm.read_text(encoding="utf-8")) if sm.exists() else []
    other = [u for u in old if "/blog" not in u]
    urls = [(u, None) for u in other] + [(f"{SITE}/blog", posts[0]["date"] if posts else None)]
    urls += [(f"{SITE}/blog/categoria/{c['slug']}", None) for c in CATS]
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
    print(f"{len(posts)} artículos publicados en {len(CATS)} categorías")


if __name__ == "__main__":
    build()
