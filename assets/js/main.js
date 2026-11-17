/* NexGent · interacciones y animaciones de scroll */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = !!window.gsap && !!window.ScrollTrigger;
  const isDesktop = () => window.matchMedia('(min-width: 901px)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  if (!hasGsap) { document.documentElement.classList.add('no-js'); }

  /* ---------- loader ---------- */
  const loader = $('#loader'); const t0 = performance.now();
  const hideLoader = () => { if (!loader) return; const wait = Math.max(0, 1100 - (performance.now() - t0)); setTimeout(() => loader.classList.add('done'), wait); };
  if (document.readyState === 'complete') hideLoader(); else addEventListener('load', hideLoader);

  /* ---------- sedes grid ---------- */
  const sedesEl = $('#sedesGrid'); let sedeDots = [];
  if (sedesEl) {
    const mob = matchMedia('(max-width: 900px)').matches;
    const cols = mob ? 15 : 30, rows = mob ? 10 : 8, N = cols * rows;
    sedesEl.style.setProperty('--cols', cols);
    const total = $('#sedesTotal'); if (total) total.textContent = N;
    const frag = document.createDocumentFragment();
    // orden de encendido: desde el centro hacia fuera, con algo de aleatoriedad
    const cells = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const i = document.createElement('i');
      const k = c / (cols - 1);
      i.style.setProperty('--dc', `hsl(${188 + k * 32} ${68 + k * 20}% ${70 - k * 12}%)`);
      if (Math.random() < .35) { i.classList.add('ping'); i.style.setProperty('--d', (Math.random() * 3.2).toFixed(2) + 's'); }
      frag.appendChild(i);
      const dx = (c - cols / 2) / cols, dy = (r - rows / 2) / rows;
      cells.push({ i, d: Math.hypot(dx, dy * .8) + Math.random() * .18 });
    }
    sedesEl.appendChild(frag);
    sedeDots = cells.sort((a, b) => a.d - b.d).map(o => o.i);
  }

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }); window.lenis = lenis;
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
    }
  }
  // anchor links
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const el = document.querySelector(id); if (!el) return;
    e.preventDefault(); closeMenu();
    if (lenis) lenis.scrollTo(el, { offset: id === '#top' ? 0 : -10 }); else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }));

  /* ---------- nav ---------- */
  const nav = $('#nav');
  const burger = $('.nav__burger');
  function closeMenu() { nav.classList.remove('menu-open'); burger && burger.setAttribute('aria-expanded', 'false'); }
  burger && burger.addEventListener('click', () => {
    const open = nav.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  const pbar = $('#progressBar'), waF = $('#waFloat');
  const onScroll = () => {
    const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('is-scrolled', y > 20);
    if (pbar) pbar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (waF) waF.classList.toggle('show', y > innerHeight * .8);
  };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- word split for statement ---------- */
  $$('[data-words]').forEach(el => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
  });

  /* ---------- counters ---------- */
  function countUp(el) {
    const target = +el.dataset.count, pre = el.dataset.prefix || '';
    if (reduce) { el.textContent = pre + target; return; }
    const o = { v: 0 };
    gsap.to(o, { v: target, duration: 2, ease: 'power3.out', onUpdate: () => el.textContent = pre + Math.round(o.v).toLocaleString('es-ES') });
  }

  /* ---------- voice canvas ---------- */
  function voiceWave() {
    const cv = $('#waveCanvas'); if (!cv) return;
    const ctx = cv.getContext('2d'); let w, h, t = 0, running = false;
    const size = () => { const r = cv.getBoundingClientRect(); const d = Math.min(devicePixelRatio, 2); cv.width = r.width * d; cv.height = r.height * d; w = cv.width; h = cv.height; };
    size(); addEventListener('resize', size);
    const cols = ['#a8e6ec', '#5fbfd0', '#3b82f6'];
    function draw() {
      if (!running) return;
      t += 0.022; ctx.clearRect(0, 0, w, h);
      const amp = (0.35 + 0.65 * Math.abs(Math.sin(t * 0.9)) * (0.6 + 0.4 * Math.sin(t * 2.3))) * h * 0.38;
      cols.forEach((c, i) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const k = x / w; const env = Math.sin(Math.PI * k) ** 2;
          const y = h / 2 + Math.sin(k * (10 + i * 3) + t * (2 + i * .7)) * amp * env * (1 - i * 0.22) + Math.sin(k * 31 + t * 5) * amp * .08 * env;
          x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.strokeStyle = c; ctx.lineWidth = (3 - i * 0.6) * Math.min(devicePixelRatio, 2); ctx.globalAlpha = 1 - i * 0.2;
        ctx.shadowColor = c; ctx.shadowBlur = 18; ctx.stroke();
      });
      requestAnimationFrame(draw);
    }
    const io = new IntersectionObserver(([e]) => { const was = running; running = e.isIntersecting; if (running && !was) draw(); });
    io.observe(cv);
    if (reduce) { running = true; draw(); running = false; }
    // timer + transcript
    let s = 0; const tm = $('#callTimer'); const lines = $$('#callLines p');
    setInterval(() => { if (!running) return; s++; tm.textContent = `00:${String(s % 60).padStart(2, '0')}`; }, 1000);
    let li = 0;
    setInterval(() => {
      if (!running && !reduce) return;
      if (li >= lines.length) { lines.forEach(l => l.classList.remove('vis')); li = 0; return; }
      lines[li++].classList.add('vis');
    }, 1700);
    if (reduce) lines.forEach(l => l.classList.add('vis'));
  }
  voiceWave();

  /* ---------- tilt + magnetic + glow ---------- */
  if (!reduce && matchMedia('(hover:hover)').matches) {
    $$('.spot').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--sx', `${e.clientX - r.left}px`); el.style.setProperty('--sy', `${e.clientY - r.top}px`);
      });
    });
    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top;
        el.style.setProperty('--mx', `${(x - r.width / 2) * .18}px`); el.style.setProperty('--my', `${(y - r.height / 2) * .25}px`);
        el.style.setProperty('--gx', `${x}px`); el.style.setProperty('--gy', `${y}px`);
      });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--mx', '0px'); el.style.setProperty('--my', '0px'); });
    });
  }

  /* ---------- calculator ---------- */
  function calc() {
    const ids = ['sedes', 'contactos', 'perdidos', 'conv', 'ticket'];
    const el = Object.fromEntries(ids.map(i => [i, $('#' + i)]));
    if (!el.sedes) return;
    const fmt = n => Math.round(n).toLocaleString('es-ES') + ' €';
    const state = { mes: 0 };
    const chart = $('#calcChart');
    function render() {
      const v = Object.fromEntries(ids.map(i => [i, +el[i].value]));
      ids.forEach(i => { const p = (el[i].value - el[i].min) / (el[i].max - el[i].min) * 100; el[i].style.setProperty('--p', p + '%'); });
      $('#o_sedes').textContent = v.sedes; $('#o_contactos').textContent = v.contactos.toLocaleString('es-ES');
      $('#o_perdidos').textContent = v.perdidos + ' %'; $('#o_conv').textContent = v.conv + ' %'; $('#o_ticket').textContent = v.ticket + ' €';
      const citas = v.sedes * v.contactos * v.perdidos / 100 * v.conv / 100;
      const mes = citas * v.ticket;
      $('#r_citas').textContent = Math.round(citas).toLocaleString('es-ES');
      $('#r_ano').textContent = fmt(mes * 12);
      if (window.gsap && !reduce) gsap.to(state, { mes, duration: .6, ease: 'power3.out', onUpdate: () => $('#r_mes').textContent = fmt(state.mes) });
      else $('#r_mes').textContent = fmt(mes);
      // cumulative 12-month chart
      const W = 400, H = 140, pts = [];
      for (let m = 0; m <= 12; m++) pts.push([m / 12 * W, H - 8 - (m / 12) * (H - 20)]);
      const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
      const bars = Array.from({ length: 12 }, (_, m) => { const x = m / 12 * W + 6, bh = ((m + 1) / 12) * (H - 20); return `<rect x="${x}" y="${H - bh}" width="${W / 12 - 12}" height="${bh}" rx="5" fill="url(#cg)" opacity="${.25 + .06 * m}"/>`; }).join('');
      chart.innerHTML = `<defs><linearGradient id="cg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#5fbfd0" stop-opacity=".2"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs>${bars}<path d="${line}" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 6" opacity=".5"/>`;
    }
    ids.forEach(i => el[i].addEventListener('input', render)); render();
  }

  /* ---------- form ---------- */
  const SB_URL = 'https://lualgzhmwclrnuqgmxlb.supabase.co/rest/v1/web_leads';
  const SB_KEY = 'sb_publishable_BBw3Zv_CRtM1vfeufZgPrQ_Pefo9tho';
  function saveLead(d) {
    try {
      const q = new URLSearchParams(location.search), utm = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach(k => { if (q.get(k)) utm[k] = q.get(k).slice(0, 120); });
      const v = k => (d.get(k) || '').toString().trim();
      const row = { nombre: v('nombre').slice(0, 200), empresa: v('empresa').slice(0, 200) || null, cargo: v('cargo').slice(0, 200) || null,
        sedes: v('sedes').slice(0, 20) || null, sector: v('sector').slice(0, 200) || null, email: v('email').slice(0, 254),
        telefono: v('telefono').slice(0, 40) || null, mensaje: v('mensaje').slice(0, 4000) || null, origen: 'web',
        pagina: location.pathname.slice(0, 500), referrer: document.referrer.slice(0, 500) || null, utm: Object.keys(utm).length ? utm : null };
      fetch(SB_URL, { method: 'POST', keepalive: true, headers: { apikey: SB_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(row) }).catch(() => {});
    } catch (e) {}
  }
  const form = $('#leadForm');
  form && form.addEventListener('submit', async e => {
    e.preventDefault();
    const msg = $('#formMsg'); msg.classList.remove('err');
    const d = new FormData(form);
    if (!d.get('nombre') || !d.get('empresa') || !/^\S+@\S+\.\S+$/.test(d.get('email') || '')) { msg.textContent = 'Revisa el nombre, la empresa y el email.'; msg.classList.add('err'); return; }
    if (!d.get('privacidad')) { msg.textContent = 'Necesitamos que aceptes la política de privacidad.'; msg.classList.add('err'); return; }
    const btn = form.querySelector('button[type=submit]'); const label = btn.textContent;
    btn.disabled = true; btn.textContent = 'Enviando…'; msg.textContent = '';
    try {
      if (d.get('web')) throw new Error('error'); // anti-spam
      const lead = { 'Nombre': d.get('nombre'), 'Empresa / red': d.get('empresa'), 'Cargo': d.get('cargo') || '-', 'Nº de sedes': d.get('sedes') || '-',
        'Sector': d.get('sector') || '-', 'Email': d.get('email'), 'Teléfono': d.get('telefono') || '-',
        _subject: `Nueva solicitud de diagnóstico · ${d.get('empresa')}`, _replyto: d.get('email'), _template: 'table', _captcha: 'false' };
      // Copia en el panel de NexGent (Supabase, solo inserción). No bloquea el envío por correo.
      saveLead(d);
      // Envío a info@nexgent.io con FormSubmit (https://formsubmit.co)
      const r = await fetch('https://formsubmit.co/ajax/info@nexgent.io', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(lead) });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || String(data.success) !== 'true') throw new Error('error');
      form.reset(); btn.textContent = 'Solicitud enviada ✓';
      msg.textContent = '¡Gracias! Hemos recibido tu solicitud. Te escribimos muy pronto.';
    } catch (err) {
      btn.disabled = false; btn.textContent = label; msg.classList.add('err');
      msg.textContent = (err && err.message && err.message !== 'error' && err.message !== 'Failed to fetch') ? err.message : 'No se ha podido enviar. Escríbenos por WhatsApp al +34 684 486 647.';
    }
  });

  calc();

  /* ---------- secciones voladoras ---------- */
  const secProg = el => { const r = el.getBoundingClientRect(); const tot = r.height - innerHeight; return tot > 0 ? Math.min(1, Math.max(0, -r.top / tot)) : 0; };
  // túnel de mensajes
  const tWorld = $('#tWorld'); let tCards = [];
  if (tWorld) {
    const msgs = [
      ['wa','W','Sede Málaga','¿Tenéis hueco mañana a las 18:00?'],['call','☏','Llamada entrante','Sede Bilbao · 21:14'],['ok','✓','Cita confirmada','Sábado · 11:00'],
      ['wa','W','Sede Valencia','Quiero cambiar mi cita del jueves'],['rem','⏰','Recordatorio enviado','Mañana a las 10:30'],['wa','W','Sede Sevilla','¿Abrís el domingo?'],
      ['call','☏','Llamada atendida','Sede Zaragoza · 1 min 08 s'],['ok','✓','Hueco liberado','Cancelación con 24 h'],['wa','W','Sede Murcia','¿Cuánto cuesta la manicura?'],
      ['wa','W','Sede Alicante','¿Me podéis dar cita para dos?'],['ok','✓','Cita reagendada','Viernes · 17:30'],['call','☏','Llamada entrante','Sede Gijón · 09:02'],
      ['rem','⏰','Recordatorio enviado','Hoy a las 19:00'],['wa','W','Sede Palma','Llego 10 minutos tarde'],['ok','✓','Clienta nueva','Ficha creada'],
      ['wa','W','Sede Granada','¿Tenéis algo esta tarde?'],['call','☏','Pasada a recepción','Sede Córdoba'],['wa','W','Sede Vigo','Cancelo la del lunes, gracias'],
      ['ok','✓','Cita confirmada','Martes · 16:00'],['wa','W','Sede Valladolid','¿A qué hora cerráis hoy?'],['rem','⏰','Recordatorio enviado','Jueves a las 12:00'],
      ['wa','W','Sede Santander','Hola! Quería pedir cita'],['call','☏','Llamada atendida','Sede Cádiz · 0 min 52 s'],['ok','✓','Cita confirmada','Domingo · 10:00'],
      ['wa','W','Sede Pamplona','¿Hay hueco a primera hora?'],['wa','W','Sede Almería','¿Puedo cambiar de centro?'],['ok','✓','Cita agendada','Lunes · 18:30'],
      ['call','☏','Llamada entrante','Sede Toledo · 23:41'],['wa','W','Sede Huelva','Gracias por recordármelo!'],['ok','✓','Confirmada','Miércoles · 13:00'],
      ['wa','W','Sede Burgos','¿Tenéis cita el sábado?'],['rem','⏰','Recordatorio enviado','Mañana a las 9:00'],['wa','W','Sede León','¿Me reservas a las 12?'],['ok','✓','Hecho','Sábado · 12:00']];
    const N = msgs.length, GAP = 280;
    msgs.forEach((m, i) => {
      const d = document.createElement('div'); d.className = 'tcard ' + m[0];
      d.innerHTML = `<i>${m[1]}</i><div><b>${m[2]}</b>${m[3]}</div>`; tWorld.appendChild(d);
      const a = i * 2.39996 + .6, rr = .82 + ((i * 37) % 10) / 24;
      tCards.push({ d, a, rr, z: -i * GAP - 300 });
    });
    tWorld._len = N * GAP + 300;
  }
  let tCam = 0, tLast = 0, tOn = false, tTime = 0;
  function tunnel(now) {
    if (!tWorld) return;
    const sec = tWorld.closest('.tunnel'); const r = sec.getBoundingClientRect();
    const L = tWorld._len, pr = reduce ? .2 : secProg(sec);
    // vuela desde que la sección entra en pantalla: scroll + deriva continua en el tiempo
    const scrollPart = (innerHeight - r.top) * 1.5;
    if (now && tLast) tTime += Math.min(50, now - tLast) * (reduce ? 0 : .16); tLast = now || tLast;
    tCam = scrollPart + tTime;
    const R = Math.min(innerWidth, innerHeight * 1.6) * .42, mob = innerWidth < 700;
    const rot = tCam * .008;
    tWorld.style.transform = `rotateZ(${rot}deg)`;
    tCards.forEach(c => {
      let z = ((c.z + tCam) % L + L) % L - (L - 420);
      const cw = mob ? 95 : 150; let x = Math.cos(c.a) * R * c.rr * (mob ? .9 : 1.3) - cw, y = Math.sin(c.a) * R * c.rr * (mob ? 1.5 : .8) - 40;
      if (mob) { x = Math.max(-innerWidth / 2 + 8, Math.min(innerWidth / 2 - 2 * cw - 8, x)); if (Math.abs(y + 20) < 120) y += (y < -20 ? -120 : 120); }
      let o = Math.min(1, Math.max(0, (z + 3000) / 1500)); if (z > 350) o *= Math.max(0, 1 - (z - 350) / 70);
      if (o <= 0) { c.d.style.visibility = 'hidden'; return; }
      c.d.style.visibility = 'visible'; c.d.style.opacity = o; c.d.style.transform = `translate3d(${x}px,${y}px,${z}px) rotateZ(${-rot}deg)`;
    });
    const k = pr < .2 ? 0 : pr < .42 ? 1 : 2; sec.querySelectorAll('.tline').forEach((l, i) => l.classList.toggle('is-on', i === k));
  }
  if (tWorld) {
    const loop = now => { tunnel(now); if (tOn) requestAnimationFrame(loop); };
    new IntersectionObserver(([e]) => { const was = tOn; tOn = e.isIntersecting; if (tOn && !was) { tLast = 0; requestAnimationFrame(loop); } }, { rootMargin: '200px 0px' }).observe(tWorld.closest('.tunnel'));
  }
  // panel explotado
  const dB = $('#dBoard');
  const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2, seg = (x, a, b) => Math.min(1, Math.max(0, (x - a) / (b - a)));
  function dash() {
    if (!dB) return;
    const pr = reduce ? 1 : secProg(dB.closest('.dash'));
    const ex = ease(seg(pr, .05, .35)) * (1 - ease(seg(pr, .72, .97)));
    const rot = ease(seg(pr, .35, .75));
    dB.style.setProperty('--ex', ex.toFixed(3));
    dB.style.setProperty('--rx', (55 * (1 - rot)).toFixed(2) + 'deg');
    dB.style.setProperty('--rz', (-32 * (1 - rot)).toFixed(2) + 'deg');
    dB.style.setProperty('--sc', (.74 + .2 * rot).toFixed(3));
    dB.style.setProperty('--draw', ease(seg(pr, .55, .95)).toFixed(3));
  }
  if (dB) dB.querySelectorAll('.dl[data-z]').forEach(l => l.style.setProperty('--z', l.dataset.z * .75));
  // filas gigantes
  const rowsEl = $('.rows'); let lastY = scrollY, vel = 0;
  function rows() {
    if (!rowsEl) return;
    const r = rowsEl.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    const pr = (innerHeight - r.top) / (innerHeight + r.height);
    rowsEl.querySelectorAll('.rows__r').forEach((row, i) => {
      const dir = +row.dataset.dir; const w = row.firstElementChild.offsetWidth - innerWidth;
      const x = dir < 0 ? -pr * w * .6 : -w * .6 + pr * w * .6;
      row.style.transform = `translateX(${x}px) skewX(${Math.max(-12, Math.min(12, -vel * .25 * dir))}deg)`;
    });
  }
  let ticking = false;
  function flyLoop() { vel += ((scrollY - lastY) - vel) * .2; lastY = scrollY; dash(); rows(); if (Math.abs(vel) > .05) requestAnimationFrame(flyLoop); else ticking = false; }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(flyLoop); } }, { passive: true });
  addEventListener('resize', () => { dash(); rows(); });
  tunnel(0); dash(); rows();

  /* ---------- vídeo ---------- */
  const film = $('#film'), snd = $('#filmSound');
  if (film) {
    new IntersectionObserver(([e]) => { if (e.isIntersecting) { const pr = film.play(); pr && pr.catch(() => {}); } else film.pause(); }, { threshold: .35 }).observe(film);
    snd.addEventListener('click', () => {
      film.muted = !film.muted; if (!film.muted) { film.currentTime = 0; film.play().catch(() => {}); }
      snd.setAttribute('aria-pressed', String(!film.muted)); snd.querySelector('span').textContent = film.muted ? 'Activar sonido' : 'Silenciar';
    });
  }

  /* ================= GSAP ================= */
  if (!hasGsap) return;
  gsap.registerPlugin(ScrollTrigger);

  if (reduce) {
    $$('.reveal,.reveal-up').forEach(e => { e.style.opacity = 1; e.style.transform = 'none'; });
    $$('[data-count]').forEach(countUp);
    $$('.card').forEach(c => c.classList.add('in'));
    $$('#waBody .msg').forEach(m => m.classList.add('show', 'vis'));
    sedeDots.forEach(d => d.classList.add('on')); const sc = $('#sedesCount'); if (sc) sc.textContent = sedeDots.length;
    return;
  }

  // hero entrance
  gsap.to('.hero .reveal-up', { opacity: 1, y: 0, duration: 1.4, ease: 'expo.out', stagger: .09, delay: 1.25 });
  gsap.to('.hero__content', { yPercent: -18, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // generic reveals
  $$('.reveal').forEach(el => {
    gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true, onEnter: () => el.classList.add('in') } });
  });
  $$('[data-count]').forEach(el => ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => countUp(el) }));


  // statement words
  const words = $$('.statement .w');
  if (words.length) gsap.to(words, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: '.statement', start: 'top 70%', end: 'bottom 60%', scrub: true } });

  // vídeo: crece al hacer scroll
  if ($('#filmFrame')) gsap.fromTo('#filmFrame', { scale: .82, borderRadius: 48 }, { scale: 1, borderRadius: 32, ease: 'none', scrollTrigger: { trigger: '.film', start: 'top 85%', end: 'center 55%', scrub: true } });

  // journey (pinned)
  const steps = $$('.jstep'); const msgs = $$('#waBody .msg'); const clock = $('#phoneClock');
  const times = ['23:47', '23:47', '23:48', '10:00', '10:58'];
  const bar = $('.journey__progress span'); let cur = -1;
  function setStep(i) {
    if (i === cur || !clock) return; cur = i;
    steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
    clock.textContent = times[i];
    $('#waState').textContent = i === 1 ? 'escribiendo…' : 'en línea';
    msgs.forEach(m => {
      const on = +m.dataset.step <= i;
      if (on && !m.classList.contains('show')) { m.classList.add('show'); requestAnimationFrame(() => requestAnimationFrame(() => m.classList.add('vis'))); }
      if (!on) m.classList.remove('show', 'vis');
    });
  }
  if (clock) { setStep(0);
  ScrollTrigger.create({
    trigger: '.journey', start: 'top top', end: '+=320%', pin: '.journey__pin', scrub: true,
    onUpdate: self => { const p = self.progress; bar.style.width = (p * 100) + '%'; setStep(Math.min(4, Math.floor(p * 5))); }
  }); }
  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    if ($('#phone')) gsap.fromTo('#phone', { rotateY: -18, rotateX: 8 }, { rotateY: 12, rotateX: -2, ease: 'none', scrollTrigger: { trigger: '.journey', start: 'top top', end: '+=320%', scrub: true } });
    // horizontal "cómo trabajamos"
    const track = $('#howTrack'); if (!track) return;
    const dist = () => track.scrollWidth - window.innerWidth;
    gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.how', start: 'top top', end: () => '+=' + dist(), pin: '.how__pin', scrub: 1, invalidateOnRefresh: true } });
  });

  // 24/7 zoom
  if ($('.zoom')) {
    const lit = { v: 0 }; let shown = 0; const cnt = $('#sedesCount');
    const paint = () => {
      const n = Math.round(lit.v);
      if (n > shown) for (let k = shown; k < n; k++) sedeDots[k].classList.add('on');
      else for (let k = n; k < shown; k++) sedeDots[k].classList.remove('on');
      shown = n; if (cnt) cnt.textContent = n;
    };
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.zoom', start: 'top top', end: 'bottom bottom', scrub: .6 } });
    tl.fromTo('#zoomBig', { scale: .55, opacity: .15 }, { scale: 1, opacity: 1, duration: .22, ease: 'power2.out' })
      .fromTo('#zoomCap', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .1 }, .12)
      .to({}, { duration: .08 })
      .to('#zoomBig', { scale: 12, opacity: 0, duration: .24, ease: 'power2.in' })
      .to('#zoomBig', { opacity: 0, duration: .01 })
      .to('#zoomCap', { opacity: 0, y: -20, duration: .08 }, '<')
      .fromTo('#sedesWrap', { opacity: 0, scale: .94, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: .14, ease: 'power2.out' })
      .to(lit, { v: sedeDots.length, duration: .34, ease: 'none', onUpdate: paint })
      .to({}, { duration: .1 });
  }

  // la sección blanca sube como una hoja sobre el túnel
  const sheet = $('.tunnel + .bento-sec');
  if (sheet) gsap.fromTo(sheet, { scale: .9, borderTopLeftRadius: 90, borderTopRightRadius: 90, y: 80 }, { scale: 1, borderTopLeftRadius: 0, borderTopRightRadius: 0, y: 0, ease: 'none', scrollTrigger: { trigger: sheet, start: 'top bottom', end: 'top 10%', scrub: true } });
  if (sheet) gsap.fromTo('.tunnel__pin', { opacity: 1, scale: 1 }, { opacity: .25, scale: .94, ease: 'none', scrollTrigger: { trigger: sheet, start: 'top bottom', end: 'top top', scrub: true } });


  // más secciones con entrada de hoja (claras tras oscuras) y salida encogiendo (claras antes de oscuras)
  ['.case + .calc'].forEach(sel => {
    const el = $(sel); if (!el) return; el.classList.add('sheet-in');
    gsap.fromTo(el, { scale: .9, y: 100, borderTopLeftRadius: 90, borderTopRightRadius: 90 }, { scale: 1, y: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 15%', scrub: true } });
  });
  ['.faq'].forEach(sel => {
    const el = $(sel); if (!el) return; el.classList.add('sheet-out');
    gsap.fromTo(el, { scale: 1, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }, { scale: .9, borderBottomLeftRadius: 90, borderBottomRightRadius: 90, ease: 'none', scrollTrigger: { trigger: el, start: 'bottom 95%', end: 'bottom 5%', scrub: true } });
  });

  // contacto: portal que se abre + titular palabra a palabra + formulario desde el fondo
  const ctc = $('.contact');
  if (ctc) {
    gsap.fromTo(ctc, { '--cr': '6%' }, { '--cr': '150%', ease: 'none', scrollTrigger: { trigger: ctc, start: 'top bottom', end: 'top 5%', scrub: true } });
    const title = $('#ctaTitle');
    const wrapWords = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) { const frag = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(p => { if (!p) return; if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(p)); else { const sp = document.createElement('span'); sp.className = 'wd'; sp.textContent = p; frag.appendChild(sp); } }); n.replaceWith(frag); }
      else if (n.nodeType === 1 && n.tagName !== 'BR') { if (n.classList.contains('grad')) { n.classList.remove('grad'); wrapWords(n); n.querySelectorAll('.wd').forEach(w => w.classList.add('grad')); } else wrapWords(n); }
    });
    wrapWords(title);
    const tl = gsap.timeline({ scrollTrigger: { trigger: ctc, start: 'top 45%', once: true } });
    tl.from(title.querySelectorAll('.wd'), { rotateX: -95, y: 70, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: .07 })
      .from('.contact .form', { y: 160, z: -300, rotateX: 28, scale: .88, opacity: 0, duration: 1.4, ease: 'expo.out', transformPerspective: 1200 }, '-=.9')
      .from('.contact .form > *', { y: 24, opacity: 0, duration: .8, ease: 'power3.out', stagger: .05 }, '-=1');
  }

  // nav colour (created last so pin spacing is accounted for) over light sections
  $$('.section-light').forEach(s => ScrollTrigger.create({ trigger: s, start: 'top 30px', end: 'bottom 30px', onToggle: self => nav.classList.toggle('on-light', self.isActive) }));
  $$('.page').forEach(s => nav.classList.add('on-light'));

  addEventListener('load', () => ScrollTrigger.refresh());
})();
