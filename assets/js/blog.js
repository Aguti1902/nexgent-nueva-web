/* Blog NexGent: filtro instantáneo, índice del artículo, compartir y color del menú */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  if (!$('.bx')) return;

  /* Menú: claro cuando pasa por encima de una zona clara */
  const nav = $('.nav');
  const lights = $$('.bxlist, .bxread, .bxrel, .section-light');
  const navTone = () => {
    if (!nav) return;
    const y = 30;
    const on = lights.some(el => { const r = el.getBoundingClientRect(); return r.top <= y && r.bottom >= y; });
    nav.classList.toggle('on-light', on);
  };
  addEventListener('scroll', navTone, { passive: true });
  addEventListener('resize', navTone);
  navTone(); setTimeout(navTone, 300);

  /* Filtro instantáneo en la portada del blog */
  const tpl = $('#bxall');
  const list = $('.bxlist .container');
  if (tpl && list) {
    const original = list.innerHTML;
    const allCards = [...tpl.content.querySelectorAll('.bxcard')];
    const set = (cat, push) => {
      $$('.bxfilter').forEach(f => { const on = f.dataset.cat === cat; f.classList.toggle('is-on', on); on ? f.setAttribute('aria-current', 'page') : f.removeAttribute('aria-current'); });
      if (cat === 'all') { list.innerHTML = original; }
      else {
        const cards = allCards.filter(c => c.dataset.cat === cat);
        list.innerHTML = '<div class="bxgrid" style="margin-top:0"></div>' + (cards.length ? '' : '<p class="bxempty">No hay artículos en esta categoría todavía.</p>');
        const g = $('.bxgrid', list);
        cards.forEach((c, i) => { const n = c.cloneNode(true); n.classList.add('is-in'); n.style.animationDelay = (i * 70) + 'ms'; g.appendChild(n); });
      }
      if (push) {
        const f = $(`.bxfilter[data-cat="${cat}"]`);
        history.pushState({ cat }, '', f ? f.getAttribute('href') : '/blog');
      }
      const top = list.getBoundingClientRect().top + scrollY - 140;
      if (scrollY > top) (window.lenis ? window.lenis.scrollTo(top) : scrollTo({ top, behavior: 'smooth' }));
    };
    $$('.bxfilter').forEach(f => f.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault(); set(f.dataset.cat, true);
    }));
    addEventListener('popstate', e => set((e.state && e.state.cat) || 'all', false));
  }

  /* Índice "En este artículo" */
  const prose = $('.bxprose');
  const toc = $('#bxtoc');
  if (prose && toc) {
    const slug = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const hs = $$('h2', prose);
    if (!hs.length) { const t = toc.closest('.bxtoc'); if (t) t.remove(); }
    hs.forEach(h => {
      if (!h.id) h.id = slug(h.textContent);
      const li = document.createElement('li');
      li.innerHTML = `<a href="#${h.id}"></a>`;
      li.firstChild.textContent = h.textContent;
      li.firstChild.addEventListener('click', e => {
        e.preventDefault();
        const y = h.getBoundingClientRect().top + scrollY - 96;
        window.lenis ? window.lenis.scrollTo(y) : scrollTo({ top: y, behavior: 'smooth' });
        history.replaceState(null, '', '#' + h.id);
      });
      toc.appendChild(li);
    });
    const links = $$('a', toc);
    const spy = () => {
      let i = -1;
      hs.forEach((h, k) => { if (h.getBoundingClientRect().top < 160) i = k; });
      links.forEach((a, k) => a.classList.toggle('is-on', k === i));
    };
    addEventListener('scroll', spy, { passive: true }); spy();
  }

  /* Copiar enlace */
  $$('.bxcopy').forEach(b => b.addEventListener('click', async () => {
    const url = b.closest('.bxshare').dataset.url;
    try {
      if (navigator.share && matchMedia('(pointer:coarse)').matches) { await navigator.share({ title: document.title, url }); return; }
      await navigator.clipboard.writeText(url);
    } catch (e) { return; }
    b.classList.add('is-ok'); setTimeout(() => b.classList.remove('is-ok'), 1800);
  }));
})();
