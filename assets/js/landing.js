/* Páginas de sector de NexGent: efectos al estilo de la home (GSAP + ScrollTrigger) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  if (!$('.bx--lnd')) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = matchMedia('(max-width: 900px)').matches;
  const hover = matchMedia('(hover:hover)').matches;
  const G = window.gsap, ST = window.ScrollTrigger;
  document.documentElement.classList.add('lnd-js');

  /* ---------- Conversación del móvil: escribiendo… y mensajes uno a uno ---------- */
  const body = $('.lphone .wa__body');
  if (body) {
    const msgs = $$('.msg', body);
    const typing = document.createElement('div');
    typing.className = 'msg msg--in lty'; typing.innerHTML = '<i></i><i></i><i></i>';
    msgs.forEach(m => m.classList.add('lpend'));
    const show = m => { m.classList.remove('lpend'); m.classList.add('lshow'); };
    if (reduce) msgs.forEach(show);
    else {
      let t = 700;
      msgs.forEach((m, i) => {
        const out = m.classList.contains('msg--out') || m.classList.contains('msg--sys');
        if (out) {
          setTimeout(() => { body.insertBefore(typing, m); typing.classList.add('lshow'); }, t);
          t += 1100;
          setTimeout(() => { typing.remove(); show(m); }, t);
        } else setTimeout(() => show(m), t);
        t += 900;
      });
      // al terminar, vuelve a empezar cada 14 s si la cabecera sigue a la vista
      const total = t + 3500;
      setInterval(() => {
        const r = body.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
        msgs.forEach(m => { m.classList.add('lpend'); m.classList.remove('lshow'); });
        let k = 400;
        msgs.forEach(m => {
          const out = m.classList.contains('msg--out') || m.classList.contains('msg--sys');
          if (out) { setTimeout(() => { body.insertBefore(typing, m); typing.classList.add('lshow'); }, k); k += 1100; setTimeout(() => { typing.remove(); show(m); }, k); }
          else setTimeout(() => show(m), k);
          k += 900;
        });
      }, Math.max(total, 14000));
    }
  }

  /* ---------- Móvil que sigue al ratón ---------- */
  const phone = $('.lphone .phone');
  if (phone && hover && !reduce) {
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
  const main = $('.bx--lnd');
  const isLight = el => el && el.classList && el.classList.contains('section-light');
  $$('.section-light', main).forEach(sec => {
    if (!isLight(sec.previousElementSibling)) sec.classList.add('lt-top');
    if (!isLight(sec.nextElementSibling)) sec.classList.add('lt-bot');
  });

  if (!G || !ST || reduce) { $$('.lrv').forEach(e => e.classList.add('in')); return; }
  G.registerPlugin(ST);

  /* ---------- Titular del hero: palabra a palabra ---------- */
  const h1 = $('.lhero h1');
  if (h1) {
    const wrap = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const f = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(p => { if (!p) return; if (/^\s+$/.test(p)) f.appendChild(document.createTextNode(p)); else { const s = document.createElement('span'); s.className = 'lw'; s.innerHTML = `<span>${p}</span>`; f.appendChild(s); } });
        n.replaceWith(f);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') wrap(n);
    });
    wrap(h1);
    G.from($$('.lw > span', h1), { yPercent: 110, rotate: 4, duration: 1.1, ease: 'expo.out', stagger: .045, delay: .15, onComplete: () => $$('.lw', h1).forEach(w => w.classList.add('done')) });
  }
  G.from('.lhero .bxcrumbs, .lhero .kicker, .lhero__lead, .lhero .hero__ctas, .lhero__kpis > div', { y: 26, opacity: 0, duration: 1, ease: 'expo.out', stagger: .07, delay: .45 });
  G.from('.lphone', { y: 80, opacity: 0, rotateX: 12, duration: 1.4, ease: 'expo.out', delay: .3 });
  if (!mobile) G.to('.lhero__in', { yPercent: -12, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.lhero', start: 'top top', end: 'bottom top', scrub: true } });

  /* ---------- Cifras que cuentan ---------- */
  const countEl = el => {
    const m = el.textContent.match(/^(\D*)([\d.]+)(.*)$/s); if (!m) return;
    const end = parseFloat(m[2].replace(/\./g, '')); if (!isFinite(end)) return;
    const o = { v: 0 }; el.textContent = m[1] + '0' + m[3];
    G.to(o, { v: end, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onUpdate: () => el.textContent = m[1] + Math.round(o.v).toLocaleString('es-ES') + m[3] });
  };
  $$('.lhero__kpis b, .bx--lnd .stat__n, .lsedes__n').forEach(countEl);

  /* ---------- Frase grande que se ilumina al bajar ---------- */
  const st = $('.lstate__t');
  if (st) {
    st.innerHTML = st.innerHTML.split(/(<[^>]+>)/).map(part => part.startsWith('<') ? part : part.split(/(\s+)/).map(w => /^\s+$/.test(w) || !w ? w : `<span class="lsw">${w}</span>`).join('')).join('');
    G.to($$('.lsw', st), { opacity: 1, stagger: .08, ease: 'none', scrollTrigger: { trigger: '.lstate', start: 'top 75%', end: mobile ? 'bottom 75%' : 'bottom 55%', scrub: true } });
  }

  /* ---------- Foto del sector: zoom y paralaje ---------- */
  const band = $('.lband');
  if (band) {
    G.fromTo($('img', band), { scale: 1.25, yPercent: -6 }, { scale: 1.02, yPercent: 6, ease: 'none', scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: true } });
    G.from($$('.lband__in > *', band), { y: 50, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: .1, scrollTrigger: { trigger: band, start: 'top 60%', once: true } });
  }

  /* ---------- Flujo: la línea avanza y cada paso se enciende ---------- */
  const flow = $('.lflow');
  if (flow) {
    const steps = $$('.lflow__list li', flow);
    const line = $('.lflow__line i', flow);
    if (!mobile && line) {
      G.timeline({ scrollTrigger: { trigger: flow, start: 'top 70%', end: 'bottom 70%', scrub: true } })
        .fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);
      steps.forEach((s, i) => ST.create({ trigger: flow, start: `top+=${i * 60} 70%`, onEnter: () => s.classList.add('on'), onLeaveBack: () => s.classList.remove('on') }));
    } else steps.forEach(s => ST.create({ trigger: s, start: 'top 85%', once: true, onEnter: () => s.classList.add('on') }));
    G.from(steps, { y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: .08, scrollTrigger: { trigger: flow, start: 'top 75%', once: true } });
  }

  /* ---------- Todas las sedes a la vez: la cuadrícula se enciende ---------- */
  const sedes = $('.lsedes');
  if (sedes) {
    const dots = $$('.lsedes__grid i', sedes);
    const order = dots.map((_, i) => i).sort(() => Math.random() - .5);
    ST.create({ trigger: sedes, start: 'top 75%', end: 'bottom 60%', scrub: true, onUpdate: self => {
      const n = Math.round(self.progress * dots.length);
      order.forEach((d, k) => dots[d].classList.toggle('on', k < n));
    } });
  }

  /* ---------- Tarjetas y bloques: entrada escalonada ---------- */
  const batch = (sel, opts = {}) => $$(sel).forEach(grid => {
    const items = grid.children.length ? [...grid.children] : [grid];
    G.from(items, Object.assign({ y: 60, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: .09, scrollTrigger: { trigger: grid, start: 'top 82%', once: true } }, opts));
  });
  batch('.bx--lnd .sectors__grid');
  batch('.bx--lnd .win__grid', mobile ? {} : { rotateX: 18, transformPerspective: 900, transformOrigin: '50% 100%' });
  batch('.bx--lnd .lnd__stats');
  batch('.bx--lnd .bxfaq');
  $$('.bx--lnd .h2, .bx--lnd .bxprose > h2, .bx--lnd .lead, .bx--lnd .kicker--dark').forEach(el => G.from(el, { y: 36, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));

  /* ---------- Problema: el titular se queda fijo mientras se lee ---------- */
  $$('.lnd--split .bxprose > p, .lnd--split .bxprose > ul').forEach(p => G.from(p, { y: 30, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 88%', once: true } }));

  /* ---------- Llamada final: el titular entra palabra a palabra ---------- */
  const cta = $('.bxcta h2');
  if (cta) G.from(cta, { y: 60, opacity: 0, scale: .96, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: cta, start: 'top 85%', once: true } });

  /* ---------- Las secciones claras suben como una hoja (solo ordenador) ---------- */
  if (!mobile) $$('.section-light.lt-top', main).forEach(sec => {
    sec.classList.add('lsheet');
    G.fromTo(sec, { scale: .93, y: 60 }, { scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 25%', scrub: true } });
  });

  addEventListener('load', () => ST.refresh());
})();
