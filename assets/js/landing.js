/* Páginas de sector de NexGent: efectos al estilo de la home (GSAP + ScrollTrigger) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const main = $('.bx--lnd'); if (!main) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = matchMedia('(max-width: 980px)').matches;
  const hover = matchMedia('(hover:hover)').matches;
  const G = window.gsap, ST = window.ScrollTrigger;
  document.documentElement.classList.add('lnd-js');

  /* ---------- Conversación del móvil: escribiendo… y mensajes uno a uno, en bucle ---------- */
  const body = $('.lphone .wa__body');
  if (body) {
    const msgs = $$('.msg', body);
    const typing = document.createElement('div');
    typing.className = 'msg msg--in lty'; typing.innerHTML = '<i></i><i></i><i></i>';
    const show = m => { m.classList.remove('lpend'); m.classList.add('lshow'); };
    if (reduce) msgs.forEach(show);
    else {
      let timers = [];
      const later = (fn, t) => timers.push(setTimeout(fn, t));
      const play = first => {
        timers.forEach(clearTimeout); timers = []; typing.remove();
        msgs.forEach(m => { m.classList.add('lpend'); m.classList.remove('lshow'); });
        let t = first ? 700 : 400;
        msgs.forEach(m => {
          const out = m.classList.contains('msg--out') || m.classList.contains('msg--sys');
          if (out) { later(() => { body.insertBefore(typing, m); typing.classList.add('lshow'); }, t); t += 1100; later(() => { typing.remove(); show(m); }, t); }
          else later(() => show(m), t);
          t += 900;
        });
        later(() => { const r = body.getBoundingClientRect(); if (document.hidden || r.bottom < 0 || r.top > innerHeight) later(() => play(false), 4000); else play(false); }, Math.max(t + 4500, 13000));
      };
      play(true);
    }
  }

  /* ---------- Móvil que sigue al ratón ---------- */
  const phone = $('.lphone .phone');
  if (phone && hover && !reduce && !mobile) {
    const hero = $('.lhero');
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      phone.style.transform = `rotateY(${-10 + x * 14}deg) rotateX(${4 - y * 10}deg) translateZ(0)`;
      $$('.lchip').forEach((c, i) => c.style.translate = `${x * (i ? -22 : 22)}px ${y * (i ? -16 : 16)}px`);
    });
    hero.addEventListener('pointerleave', () => { phone.style.transform = ''; $$('.lchip').forEach(c => c.style.translate = ''); });
  }

  /* ---------- Secciones claras: esquinas redondeadas donde empiezan y acaban ---------- */
  const isLight = el => el && el.classList && el.classList.contains('section-light');
  $$('.section-light', main).forEach(sec => {
    if (!isLight(sec.previousElementSibling)) sec.classList.add('lt-top');
    if (!isLight(sec.nextElementSibling)) sec.classList.add('lt-bot');
  });

  /* ---------- Palabras sueltas con el degradado continuo (no uno por palabra) ---------- */
  const grads = [];
  const paintGrad = () => grads.forEach(({ el, words }) => {
    if (!words.length) return;
    const rs = words.map(w => w.getBoundingClientRect()), L = Math.min(...rs.map(r => r.left)), W = Math.max(...rs.map(r => r.right)) - L;
    if (W <= 0) return;
    words.forEach((w, i) => { w.style.backgroundSize = `${W}px 100%`; w.style.backgroundPosition = `${-(rs[i].left - L)}px 0`; });
  });
  const splitWords = (root, cls) => {
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const f = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(p => { if (!p) return; if (/^\s+$/.test(p)) f.appendChild(document.createTextNode(p)); else { const s = document.createElement('span'); s.className = cls; if (cls === 'lw') s.innerHTML = '<span></span>', s.firstChild.textContent = p; else s.textContent = p; f.appendChild(s); } });
        n.replaceWith(f);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
    walk(root);
    $$('.grad', root).forEach(g => { const words = $$(cls === 'lw' ? '.lw > span' : '.' + cls, g); words.forEach(w => w.classList.add('lgw')); g.classList.add('lgrad'); grads.push({ el: g, words }); });
  };

  if (!G || !ST || reduce) return;
  G.registerPlugin(ST);
  const once = (trigger, start = 'top 86%') => ({ trigger, start, once: true });

  /* ---------- Hero ---------- */
  const h1 = $('.lhero h1');
  if (h1) {
    splitWords(h1, 'lw'); paintGrad();
    G.from($$('.lw > span', h1), { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: .045, delay: .15, onComplete: () => { $$('.lw', h1).forEach(w => w.classList.add('done')); paintGrad(); } });
  }
  G.from('.lhero .bxcrumbs, .lhero__eb, .lhero__lead, .lhero .hero__ctas, .lhero__kpis > div', { y: 26, opacity: 0, duration: 1, ease: 'expo.out', stagger: .07, delay: .4, clearProps: 'transform,opacity' });
  G.from('.lphone', { y: 70, opacity: 0, duration: 1.4, ease: 'expo.out', delay: .3, clearProps: 'transform,opacity' });
  if (!mobile) G.to('.lhero__in', { yPercent: -10, opacity: .15, ease: 'none', scrollTrigger: { trigger: '.lhero', start: 'top top', end: 'bottom top', scrub: true } });

  /* ---------- Cifras que cuentan (solo cantidades; ni precios ni «24/7») ---------- */
  $$('.lhero__kpis b, .bx--lnd .stat__n, .lsedes__n').forEach(el => {
    const txt = el.textContent, m = txt.match(/^(\D*)([\d.]+)(.*)$/s); if (!m || /[\/€]/.test(txt)) return;
    const end = parseFloat(m[2].replace(/\./g, '')); if (!isFinite(end) || end < 10) return;
    const o = { v: 0 }; el.style.fontVariantNumeric = 'tabular-nums';
    ST.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => G.to(o, { v: end, duration: 1.6, ease: 'power3.out', onUpdate: () => el.textContent = m[1] + Math.round(o.v).toLocaleString('es-ES') + m[3], onComplete: () => el.textContent = txt }) });
  });

  /* ---------- Frase grande que se ilumina al bajar ---------- */
  const st = $('.lstate__t');
  if (st) {
    splitWords(st, 'lsw'); paintGrad();
    G.to($$('.lsw', st), { opacity: 1, stagger: .08, ease: 'none', scrollTrigger: { trigger: '.lstate', start: 'top 78%', end: mobile ? 'center 55%' : 'center 45%', scrub: true } });
  }

  /* ---------- Foto del sector: zoom y paralaje ---------- */
  const band = $('.lband');
  if (band) {
    G.fromTo($('img', band), { scale: 1.2, yPercent: -5 }, { scale: 1.04, yPercent: 5, ease: 'none', scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: true } });
    G.from($$('.lband__in > *', band), { y: 44, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: .1, scrollTrigger: once(band, 'top 55%') });
  }

  /* ---------- Todas las sedes a la vez: la cuadrícula se enciende ---------- */
  const sedes = $('.lsedes');
  if (sedes) {
    const dots = $$('.lsedes__grid i', sedes).filter(d => d.offsetParent !== null);
    const order = dots.map((_, i) => i).sort(() => Math.random() - .5);
    ST.create({ trigger: $('.lsedes__grid', sedes), start: 'top 85%', end: 'bottom 55%', scrub: true, onUpdate: self => {
      const n = Math.round(self.progress * dots.length);
      order.forEach((d, k) => dots[d].classList.toggle('on', k < n));
    } });
  }

  /* ---------- Flujo: la línea avanza y cada paso se enciende cuando llega a su punto ---------- */
  const flow = $('.lflow');
  if (flow) {
    const steps = $$('.lflow__list li', flow), line = $('.lflow__line i', flow), rail = $('.lflow__rail', flow);
    G.from(steps, { opacity: 0, duration: .9, ease: 'power2.out', stagger: .1, scrollTrigger: once(rail || flow, 'top 84%') });
    if (!mobile && line && rail) {
      G.set(line, { scaleX: 0 });
      ST.create({ trigger: rail, start: 'top 80%', end: 'top 34%', scrub: .4, onUpdate: self => {
        G.set(line, { scaleX: self.progress });
        const w = rail.offsetWidth * self.progress;
        steps.forEach(s => s.classList.toggle('on', w >= s.offsetLeft + 28));
      } });
    } else steps.forEach(s => ST.create({ trigger: s, start: 'top 82%', once: true, onEnter: () => s.classList.add('on') }));
  }

  /* ---------- Titulares, tarjetas y bloques: entrada escalonada ---------- */
  const rise = (els, opts = {}) => { if (els.length) G.from(els, Object.assign({ y: 44, opacity: 0, duration: 1.05, ease: 'expo.out', stagger: .08, clearProps: 'transform,opacity' }, opts)); };
  $$('.bx--lnd .kicker, .bx--lnd .h2, .bx--lnd .lead, .lsedes__cap, .lnd__stats ~ p').forEach(el => { if (el.closest('.lhero, .lband, .bxcta')) return; rise([el], { y: 32, scrollTrigger: once(el, 'top 90%') }); });
  $$('.bx--lnd .sectors__grid, .bx--lnd .lnd__stats').forEach(g => rise([...g.children], { y: 56, scrollTrigger: once(g, 'top 84%') }));
  $$('.bx--lnd .win__grid').forEach(g => rise([...g.children], Object.assign({ y: 56, scrollTrigger: once(g, 'top 84%') }, mobile ? {} : { rotateX: 16, transformPerspective: 900, transformOrigin: '50% 100%' })));
  $$('.lblk').forEach(b => {
    rise($$('.lblk__h > *', b), { y: 28, stagger: .07, scrollTrigger: once(b, 'top 84%') });
    $$('.lblk__b .lprose', b).forEach(p => rise([...p.children], { y: 26, stagger: .06, scrollTrigger: once(p, 'top 88%') }));
    $$('.lcards, .lchecks, .lfaq', b).forEach(g => rise([...g.children], { y: 36, stagger: .07, scrollTrigger: once(g, 'top 88%') }));
  });

  /* ---------- Llamada final ---------- */
  const cta = $('.bxcta__in');
  if (cta) rise([...cta.children], { y: 40, stagger: .09, scrollTrigger: once(cta, 'top 82%') });

  /* ---------- Las secciones claras suben como una hoja (solo ordenador) ---------- */
  if (!mobile) $$('.section-light.lt-top', main).forEach(sec => {
    sec.classList.add('lsheet');
    G.fromTo(sec, { scale: .94, y: 50 }, { scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 45%', scrub: true } });
  });

  /* ---------- Recalcula medidas cuando cargan fuentes e imágenes o cambia el tamaño ---------- */
  const refresh = () => { paintGrad(); ST.refresh(); };
  addEventListener('load', refresh);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(paintGrad, 150); });
})();
