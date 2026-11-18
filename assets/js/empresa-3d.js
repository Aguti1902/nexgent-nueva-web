/* NexGent 3D · /empresa-3d · escenas Three.js e interacciones */
import * as THREE from '../vendor/three.module.min.js';

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = matchMedia('(max-width: 900px)').matches;
const DPR = Math.min(devicePixelRatio || 1, small ? 1.5 : 2);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const C = { base: 0x0e141b, dark: 0x1b2631, light: 0xdfe7ee, cyan: 0x6fcad8, blue: 0x3b82f6, g: 0x3ddc97, a: 0xffb020, r: 0xff5a5f };

/* Ejecuta el bucle solo cuando el lienzo está a la vista y la pestaña activa */
function loop(el, frame) {
  let vis = false, raf = 0, last = performance.now();
  const tick = now => { const dt = Math.min(.05, (now - last) / 1000); last = now; frame(now / 1000, dt); raf = vis && !document.hidden ? requestAnimationFrame(tick) : 0; };
  const start = () => { if (!raf && vis && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(tick); } };
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; start(); }, { rootMargin: '100px' }).observe(el);
  document.addEventListener('visibilitychange', start);
}
function sizer(renderer, camera, el) {
  const fit = () => { const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
  new ResizeObserver(fit).observe(el); fit();
}
const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: .8, metalness: .1, flatShading: true, ...o });
const glow = (color, opacity = 1) => new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity });
function box(g, w, h, d, m, x = 0, y = 0, z = 0) { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y + h / 2, z); g.add(b); return b; }
function edges(mesh, color = C.cyan, opacity = .8) { const l = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), new THREE.LineBasicMaterial({ color, transparent: true, opacity })); mesh.add(l); return l; }
function ring(r1, r2, color, opacity = .9) { const m = new THREE.Mesh(new THREE.RingGeometry(r1, r2, 48), new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })); m.rotation.x = -Math.PI / 2; return m; }
function lights(scene, k = 1) {
  scene.add(new THREE.HemisphereLight(0x9fdbe4, 0x020304, .9 * k));
  const d = new THREE.DirectionalLight(0xcfe8ff, 2.2 * k); d.position.set(18, 30, 12); scene.add(d);
  const r = new THREE.DirectionalLight(0x3b82f6, 1.2 * k); r.position.set(-20, 10, -16); scene.add(r);
}
function truck(statusColor) {
  const g = new THREE.Group();
  box(g, .95, .85, .9, mat(C.light, { roughness: .5 }), 0, .2, 1.05);
  box(g, 1, 1.05, 2.3, mat(0xaebccb, { roughness: .6 }), 0, .2, -.6);
  box(g, .2, .12, .05, glow(0xfff1c4), -.3, .45, 1.52); box(g, .2, .12, .05, glow(0xfff1c4), .3, .45, 1.52);
  box(g, .9, .08, .05, glow(0xff4040, .8), 0, .4, -1.78);
  const st = ring(1.35, 1.6, statusColor, .85); st.position.y = .03; g.add(st); g.userData.ring = st;
  return g;
}

/* =============== HERO: flota sobre un mapa low-poly =============== */
(function hero() {
  const canvas = $('#e3Hero'); if (!canvas) return;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: !small, powerPreference: 'high-performance' }); } catch (e) { return; }
  renderer.setPixelRatio(DPR); renderer.setClearColor(0x000000, 1);
  const scene = new THREE.Scene(); scene.fog = new THREE.Fog(0x000000, 55, 135);
  const camera = new THREE.PerspectiveCamera(small ? 50 : 36, 1, .1, 400);
  sizer(renderer, camera, canvas.parentElement);
  lights(scene);
  const world = new THREE.Group(); scene.add(world);

  const N = 24, CELL = 4, HALF = N * CELL / 2, ROADS = [-48, -32, -16, 0, 16, 32, 48];
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(260, 260), mat(0x040608, { roughness: 1 }));
  ground.rotation.x = -Math.PI / 2; world.add(ground);
  const grid = new THREE.GridHelper(96, 24, 0x0f2028, 0x0a141a); grid.position.y = .005; world.add(grid);

  // carreteras
  const roadM = mat(0x0b1016, { roughness: 1 });
  ROADS.forEach(v => { box(world, 96 + 2, .02, 1.7, roadM, 0, 0, v); box(world, 1.7, .021, 96 + 2, roadM, v, 0, 0); });
  const dash = [];
  ROADS.forEach(v => { for (let s = -HALF; s < HALF; s += 2.2) { dash.push(s, .04, v, s + 1, .04, v, v, .04, s, v, .04, s + 1); } });
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.Float32BufferAttribute(dash, 3));
  world.add(new THREE.LineSegments(dg, new THREE.LineBasicMaterial({ color: 0x2a6f7c, transparent: true, opacity: .55 })));

  // almacenes
  const depots = [[1, 1], [4, 4], [5, 1]].map(([i, j]) => [-48 + i * 16 + 8, -48 + j * 16 + 8]);
  const depotRings = [];
  depots.forEach(([x, z], k) => {
    const d = box(world, 9, 2.6, 7, mat(0x16212b, { roughness: .6 }), x, 0, z); edges(d, C.cyan, .9);
    box(world, 9.2, .12, 7.2, glow(C.cyan, .25), x, 2.6, z);
    const r = ring(5.6, 5.9, k === 2 ? C.a : C.cyan, .6); r.position.set(x, .05, z); world.add(r); depotRings.push(r);
  });
  const nearDepot = (x, z) => depots.some(([dx, dz]) => Math.abs(dx - x) < 7 && Math.abs(dz - z) < 6);

  // edificios (instanciados) y luces de azotea
  const cells = [];
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const x = -HALF + i * CELL + CELL / 2, z = -HALF + j * CELL + CELL / 2;
    if (Math.random() < .22 || nearDepot(x, z)) continue;
    const dist = Math.hypot(x, z), h = (.25 + Math.pow(Math.random(), 3) * 5.5) * Math.max(.35, 1.5 - dist / 60);
    cells.push([x, z, h, 1.7 + Math.random() * .6, 1.7 + Math.random() * .6]);
  }
  const bm = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), mat(0xffffff, { roughness: .85 }), cells.length);
  const m4 = new THREE.Matrix4(), col = new THREE.Color(), tops = [];
  cells.forEach(([x, z, h, w, d], k) => {
    m4.makeScale(w, h, d); m4.setPosition(x, h / 2, z); bm.setMatrixAt(k, m4);
    col.setHSL(.57, .25, .055 + Math.random() * .045); bm.setColorAt(k, col);
    if (Math.random() < .55) tops.push(x + (Math.random() - .5) * w * .6, h + .05, z + (Math.random() - .5) * d * .6);
  });
  world.add(bm);
  const tg = new THREE.BufferGeometry(); tg.setAttribute('position', new THREE.Float32BufferAttribute(tops, 3));
  world.add(new THREE.Points(tg, new THREE.PointsMaterial({ color: 0x9fe6f0, size: small ? .35 : .28, transparent: true, opacity: .75, depthWrite: false })));

  // ruta destacada
  const route = [[0, 5], [2, 5], [2, 3], [4, 3], [4, 1], [6, 1]].map(([i, j]) => new THREE.Vector3(ROADS[i], .06, ROADS[j]));
  const routeM = glow(C.cyan, .5);
  for (let k = 0; k < route.length - 1; k++) {
    const a = route[k], b = route[k + 1], len = a.distanceTo(b), mid = a.clone().add(b).multiplyScalar(.5);
    const seg = new THREE.Mesh(new THREE.BoxGeometry(Math.abs(b.x - a.x) || .35, .02, Math.abs(b.z - a.z) || .35), routeM);
    seg.position.copy(mid); world.add(seg); void len;
  }
  const routeLen = []; let acc = 0; route.forEach((p, k) => { if (k) acc += p.distanceTo(route[k - 1]); routeLen.push(acc); });
  const at = (path, lens, d) => { d = ((d % lens.at(-1)) + lens.at(-1)) % lens.at(-1); let k = 1; while (lens[k] < d) k++; const t = (d - lens[k - 1]) / (lens[k] - lens[k - 1]); return [path[k - 1].clone().lerp(path[k], t), path[k].clone().sub(path[k - 1]).normalize()]; };
  const pulses = Array.from({ length: 6 }, () => { const s = new THREE.Mesh(new THREE.SphereGeometry(.28, 12, 8), glow(0xb8eef2)); world.add(s); return s; });

  // camiones
  const NT = small ? 10 : 16, trucks = [];
  const statuses = [C.g, C.g, C.g, C.a, C.g, C.g, C.r, C.g, C.a, C.g, C.g, C.g, C.g, C.a, C.g, C.g];
  for (let k = 0; k < NT; k++) {
    const st = statuses[k % statuses.length], g = truck(st); g.scale.setScalar(.85); world.add(g);
    const i = Math.floor(Math.random() * 7), j = Math.floor(Math.random() * 7);
    trucks.push({ g, st, a: [i, j], b: [i, j], t: 1, speed: st === C.r ? 0 : (st === C.a ? 4 : 6 + Math.random() * 3) });
  }
  trucks[0].route = true; trucks[0].d = 0; trucks[0].speed = 7;
  const red = trucks.find(t => t.st === C.r);
  if (red) { red.a = red.b = [3, 4]; red.g.position.set(ROADS[3] + .9, 0, ROADS[4] + 6); red.g.rotation.y = 0; red.parked = true; }
  const pick = tr => {
    const [i, j] = tr.b, opts = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([di, dj]) => [i + di, j + dj]).filter(([a, b]) => a >= 0 && a < 7 && b >= 0 && b < 7 && !(a === tr.a[0] && b === tr.a[1]));
    tr.a = tr.b; tr.b = opts[Math.floor(Math.random() * opts.length)]; tr.t = 0;
  };
  const place = (tr, dt) => {
    if (tr.parked) return;
    if (tr.route) {
      tr.d += tr.speed * dt; const [p, dir] = at(route, routeLen, tr.d);
      tr.g.position.set(p.x + dir.z * .55, 0, p.z - dir.x * .55); tr.g.rotation.y = Math.atan2(dir.x, dir.z); return;
    }
    if (tr.t >= 1) pick(tr);
    const A = new THREE.Vector3(ROADS[tr.a[0]], 0, ROADS[tr.a[1]]), B = new THREE.Vector3(ROADS[tr.b[0]], 0, ROADS[tr.b[1]]);
    tr.t = Math.min(1, tr.t + tr.speed * dt / A.distanceTo(B));
    const p = A.lerp(B, tr.t), dir = B.clone().sub(new THREE.Vector3(ROADS[tr.a[0]], 0, ROADS[tr.a[1]])).normalize();
    tr.g.position.set(p.x + dir.z * .55, 0, p.z - dir.x * .55); tr.g.rotation.y = Math.atan2(dir.x, dir.z);
  };
  trucks.forEach(tr => { if (!tr.route && !tr.parked) { pick(tr); tr.t = Math.random(); } place(tr, 0); });

  // etiquetas HTML
  const labelsBox = $('#e3Labels');
  const labels = small ? [] : [
    { obj: trucks[0].g, html: '<b>Camión 07</b><i></i>En ruta · llega 12:40', dy: 3 },
    red && { obj: red.g, html: '<b>Camión 12</b><i class="r"></i>Parado 14 min · avisado', dy: 3 },
    { pos: new THREE.Vector3(depots[1][0], 3, depots[1][1]), html: '<b>Almacén norte</b><i class="a"></i>Ocupación 86 %', dy: 1.5 }
  ].filter(Boolean).map(l => { const el = document.createElement('div'); el.className = 'e3-lbl'; el.innerHTML = l.html; labelsBox.appendChild(el); return { ...l, el }; });
  const v3 = new THREE.Vector3();
  const drawLabels = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    labels.forEach(l => {
      if (l.obj) v3.copy(l.obj.position).setY(l.dy); else v3.copy(l.pos);
      world.localToWorld(v3); v3.project(camera);
      const x = (v3.x * .5 + .5) * w, y = (-v3.y * .5 + .5) * h;
      const cx = Math.abs(x - w / 2) < w * .34 && y > h * .15 && y < h * .8;
      l.el.style.opacity = v3.z < 1 && x > 40 && x < w - 40 && y > 90 && y < h - 40 && !cx ? 1 : 0;
      l.el.style.transform = `translate(${x}px,${y}px) translate(-50%,-130%)`;
    });
  };

  // cámara
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', e => { mouse.tx = e.clientX / innerWidth - .5; mouse.ty = e.clientY / innerHeight - .5; }, { passive: true });
  const R = small ? 78 : 74, H = small ? 64 : 44;
  const frame = (t, dt) => {
    mouse.x += (mouse.tx - mouse.x) * .04; mouse.y += (mouse.ty - mouse.y) * .04;
    const sc = clamp(scrollY / innerHeight);
    const ang = .75 + t * .025 + mouse.x * .25;
    camera.position.set(Math.sin(ang) * (R - sc * 14), H + mouse.y * 8 - sc * 10, Math.cos(ang) * (R - sc * 14));
    camera.lookAt(0, 0, 0);
    trucks.forEach(tr => { place(tr, dt); const r = tr.g.userData.ring; r.material.opacity = .45 + .4 * Math.sin(t * 3 + tr.g.id); });
    depotRings.forEach((r, k) => { const s = 1 + ((t * .5 + k * .33) % 1) * .5; r.scale.setScalar(s); r.material.opacity = .7 * (1 - (s - 1) / .5); });
    pulses.forEach((p, k) => { const [pos] = at(route, routeLen, t * 14 + k * routeLen.at(-1) / pulses.length); p.position.copy(pos).setY(.25); });
    renderer.render(scene, camera); drawLabels();
  };
  if (reduce) { frame(0, 0); return; }
  loop(canvas, frame);
})();

/* =============== feed de agentes del hero =============== */
(function feed() {
  const ul = $('#e3Feed'); if (!ul || reduce) return;
  const msgs = [
    ['Rutas', 'Reordena 3 entregas por un atasco en la A-7'], ['Mantenimiento', 'Camión 12: revisión de frenos en 2.000 km'], ['Clientes', 'Avisa a 2 clientes del nuevo horario de entrega'],
    ['Stock', 'Prepara un pedido de reposición. Espera tu OK'], ['Rutas', 'Camión 07 llega 6 min antes de lo previsto'], ['Informes', 'Resumen del día listo para las 9:00'],
    ['Mantenimiento', 'Cámara de frío 2: temperatura estable'], ['Clientes', 'Responde a 5 consultas por WhatsApp'], ['Rutas', 'Propone juntar dos repartos en Málaga este']];
  let k = 3;
  setInterval(() => {
    if (document.hidden) return;
    const [a, b] = msgs[k++ % msgs.length], li = document.createElement('li');
    li.innerHTML = `<b></b>`; li.firstChild.textContent = a; li.append(b);
    ul.prepend(li); while (ul.children.length > 3) ul.lastElementChild.remove();
  }, 3600);
})();

/* =============== el problema: diez herramientas → una vista =============== */
(function problem() {
  const sec = $('.e3-problem'); if (!sec) return;
  const items = $$('.e3-tool, .e3-core', sec);
  const upd = () => {
    const r = sec.getBoundingClientRect(), tot = r.height - innerHeight;
    const p = reduce ? 1 : clamp((-r.top / Math.max(1, tot) - .12) / .6);
    const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    items.forEach(el => el.style.setProperty('--p', e.toFixed(3)));
  };
  addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
})();

/* =============== funcionalidades: pequeñas animaciones =============== */
(function features() {
  // migas de la escena viva
  const crumbs = $$('.e3-crumbs span');
  if (crumbs.length && !reduce) { let k = 0; setInterval(() => { crumbs.forEach((c, i) => c.classList.toggle('on', i === k)); k = (k + 1) % crumbs.length; }, 2200); }
  // reloj del rebobinado (sincronizado con la animación de 8 s)
  const clock = $('[data-clock]');
  if (clock && !reduce) { const t0 = performance.now(); setInterval(() => { const f = Math.min(1, (((performance.now() - t0) / 8000) % 1) / .8); const m = 360 + Math.round(f * 720); clock.textContent = String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); }, 120); }
  // mapa de calor
  const heat = $('#e3Heat');
  if (heat) {
    const cells = Array.from({ length: 96 }, () => heat.appendChild(document.createElement('i')));
    const paint = t => cells.forEach((c, i) => { const x = i % 16, y = Math.floor(i / 16); const v = Math.max(0, Math.sin(x * .55 + t) * Math.cos(y * .9 - t * .7)) ** 2; c.style.setProperty('--o', (.06 + v * .85).toFixed(2)); });
    let t = 0; paint(t); if (!reduce) setInterval(() => { if (!document.hidden) paint(t += .35); }, 1400);
  }
  // simulador
  const sim = $('#e3Sim');
  if (sim) {
    const A = [88, 91, 94, 96, 97, 98, 98], B = [0, 11, 22, 31, 38, 43, 46], U = [92, 88, 84, 80, 77, 74, 71];
    const out = $('#e3SimOut'), a = $('#e3SimA'), b = $('#e3SimB'), c = $('#e3SimC');
    const upd = () => { const n = +sim.value; out.textContent = n ? `+${n} camión${n > 1 ? 'es' : ''}` : 'Sin cambios'; a.textContent = A[n] + ' %'; b.textContent = B[n] ? '−' + B[n] + ' %' : '0 %'; c.textContent = U[n] + ' %'; };
    sim.addEventListener('input', upd); upd();
  }
})();

/* =============== sectores: datos =============== */
const SECTORS = [
  { id: 'flotas', tab: 'Flotas', title: 'Flota de camiones', intro: 'Toda la flota sobre el mapa, en directo: dónde está cada camión, cómo va cada ruta y qué entrega llega tarde.',
    ve: ['Cada camión en su ruta, con velocidad, carga y hora prevista de llegada', 'Paradas largas, desvíos y retrasos marcados en color', 'Almacenes y muelles con su ocupación', 'El día entero rebobinable para revisar qué pasó'],
    agentes: ['Rutas', 'Mantenimiento', 'Atención a clientes'], datos: ['Samsara', 'Webfleet', 'GPS de la flota', 'ERP', 'Google Sheets', 'WhatsApp'] },
  { id: 'almacen', tab: 'Almacén', title: 'Almacén', intro: 'La nave en 3D, estantería por estantería: qué hay, qué falta y qué está a punto de salir por el muelle.',
    ve: ['Ocupación de cada estantería y cada hueco', 'Pedidos en preparación y muelles de carga', 'Productos por debajo del stock mínimo', 'Mapas de calor de las zonas con más movimiento'],
    agentes: ['Stock', 'Pedidos', 'Muelles'], datos: ['Odoo', 'Holded', 'Tu ERP o SGA', 'Google Sheets', 'Correo de proveedores'] },
  { id: 'tiendas', tab: 'Tiendas', title: 'Red de tiendas', intro: 'Todas tus tiendas en un mapa, con cómo va cada una hoy comparada con lo normal.',
    ve: ['Ventas del día de cada tienda frente a lo habitual', 'Roturas de stock y reposiciones pendientes', 'Incidencias abiertas por tienda', 'Zonas y tiendas que se salen de lo normal'],
    agentes: ['Ventas', 'Reposición', 'Atención a clientes'], datos: ['TPV', 'Stripe', 'ERP', 'WhatsApp', 'Google Sheets'] },
  { id: 'software', tab: 'Software', title: 'Empresa de software', intro: 'Tus servicios como un pequeño barrio: cada edificio es un sistema, con su salud, sus despliegues y sus incidencias.',
    ve: ['Estado de cada servicio y de cada servidor', 'Despliegues del día y lo que cambió', 'Incidencias abiertas y tiques de clientes', 'Ingresos y bajas de clientes en directo'],
    agentes: ['Guardia', 'Soporte', 'Producto'], datos: ['Jira', 'Slack', 'Stripe', 'HubSpot', 'Gmail', 'Tu monitorización'] },
  { id: 'fabrica', tab: 'Fábrica', title: 'Fábrica', intro: 'Cada línea de producción y cada máquina en 3D, con su ritmo, su estado y lo que necesita atención.',
    ve: ['Producción por línea frente al objetivo del turno', 'Máquinas con su estado: en marcha, parada o en aviso', 'Paradas, cuellos de botella y mermas', 'Mantenimientos previstos y piezas de recambio'],
    agentes: ['Producción', 'Mantenimiento', 'Calidad'], datos: ['Sensores de las máquinas', 'ERP', 'Odoo', 'Google Sheets', 'Outlook'] },
  { id: 'clinicas', tab: 'Clínicas', title: 'Red de clínicas', intro: 'Todas las clínicas de un vistazo: agenda, salas ocupadas y huecos libres, sede por sede.',
    ve: ['Ocupación de la agenda y de cada sala', 'Huecos libres que se pueden llenar hoy', 'Cancelaciones y citas sin confirmar', 'Facturación del día por clínica'],
    agentes: ['Agenda', 'Recepción por WhatsApp y teléfono', 'Facturación'], datos: ['Programa de citas', 'Google Calendar', 'WhatsApp', 'Holded', 'Stripe'] },
  { id: 'obras', tab: 'Obras', title: 'Obras y construcción', intro: 'Cada obra en 3D con su avance por fases, las entregas de material y lo que va con retraso.',
    ve: ['Avance de cada obra por fases frente al plan', 'Entregas de material y alquiler de maquinaria', 'Retrasos y tareas bloqueadas', 'Documentación y permisos pendientes'],
    agentes: ['Planificación', 'Compras', 'Documentación'], datos: ['Excel de planificación', 'ERP', 'Google Calendar', 'Gmail', 'WhatsApp'] },
  { id: 'inmobiliaria', tab: 'Inmobiliaria', title: 'Inmobiliaria', intro: 'La cartera entera sobre el mapa: cada inmueble con su estado, sus visitas y sus interesados.',
    ve: ['Inmuebles disponibles, reservados y vendidos', 'Visitas del día y de la semana', 'Interesados nuevos y a quién falta responder', 'Precio y tiempo en el mercado por zona'],
    agentes: ['Captación', 'Visitas', 'Seguimiento'], datos: ['HubSpot', 'Portales inmobiliarios', 'WhatsApp', 'Google Calendar', 'Gmail'] },
  { id: 'energia', tab: 'Energía', title: 'Instalaciones de energía', intro: 'Plantas solares, eólicas y baterías en 3D, con lo que producen ahora mismo y cualquier alarma.',
    ve: ['Producción en directo frente a la prevista', 'Alarmas y equipos con bajo rendimiento', 'Estado de carga de las baterías', 'Mantenimientos y visitas técnicas'],
    agentes: ['Producción', 'Mantenimiento', 'Informes'], datos: ['SCADA o monitorización', 'Previsión meteorológica', 'ERP', 'Google Sheets', 'Outlook'] }
];

/* =============== sectores: dioramas 3D =============== */
const BUILD = {
  flotas(g) {
    const road = mat(0x0b1016, { roughness: 1 });
    [[0, -5], [0, 5]].forEach(([x, z]) => box(g, 12, .02, 1.3, road, x, .01, z)); [[-5, 0], [5, 0]].forEach(([x, z]) => box(g, 1.3, .021, 12, road, x, .01, z));
    const d = box(g, 4, 1.4, 3, mat(0x16212b), 0, 0, 0); edges(d);
    const r = ring(2.6, 2.75, C.cyan, .6); r.position.y = .03; g.add(r);
    const path = [[-5, -5], [5, -5], [5, 5], [-5, 5], [-5, -5]].map(([x, z]) => new THREE.Vector3(x, 0, z));
    const ts = [C.g, C.a, C.g].map((c, k) => { const t = truck(c); t.scale.setScalar(.55); g.add(t); return { t, o: k * 13 }; });
    for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; box(g, .5, 1.2 + Math.random(), .5, mat(0x1d4a3a), Math.cos(a) * 8, 0, Math.sin(a) * 8); }
    return t => { r.scale.setScalar(1 + (t % 1.5) / 3); ts.forEach(({ t: tr, o }) => { const d = (t * 3 + o) % 40, s = Math.floor(d / 10), f = (d % 10) / 10, A = path[s], B = path[s + 1]; tr.position.lerpVectors(A, B, f); const dir = B.clone().sub(A).normalize(); tr.position.x += dir.z * .45; tr.position.z -= dir.x * .45; tr.rotation.y = Math.atan2(dir.x, dir.z); }); };
  },
  almacen(g) {
    box(g, 15, .05, 11, mat(0x10171e), 0, 0, 0);
    const frame = mat(0x2a3a48), cargo = [mat(0xc49a6c), mat(0xa77d52), mat(C.cyan, { emissive: 0x1a4a55 })];
    [-4, 0, 4].forEach(z => { for (let x = -5.5; x <= 5.5; x += 2.2) { box(g, .08, 3.2, 1.2, frame, x - 1.05, 0, z); [0, 1.05, 2.1].forEach(y => { box(g, 2.2, .06, 1.2, frame, x, y + .5, z); if (Math.random() < .78) box(g, 1.6 + Math.random() * .3, .5, .9, cargo[Math.random() < .12 ? 2 : Math.floor(Math.random() * 2)], x, y + .56, z); }); } });
    [-4.5, 0, 4.5].forEach((x, k) => { box(g, 2, 2.2, .1, mat(0x1b2631), x, 0, -5.4); box(g, .4, .4, .05, glow([C.g, C.a, C.g][k]), x, 2.4, -5.35); });
    const fl = new THREE.Group(); box(fl, .9, .6, 1.3, mat(0xf2b632, { roughness: .5 }), 0, .1, 0); box(fl, .08, 1.8, .08, mat(0x333333), -.3, .1, .7); box(fl, .08, 1.8, .08, mat(0x333333), .3, .1, .7);
    const fork = box(fl, .8, .06, .7, mat(0x555555), 0, .2, 1); g.add(fl);
    return t => { const x = Math.sin(t * .4) * 5.5; fl.position.set(x, 0, -2); fl.rotation.y = Math.cos(t * .4) > 0 ? Math.PI / 2 : -Math.PI / 2; fork.position.y = .2 + (Math.sin(t * 1.3) * .5 + .5) * 1.2; };
  },
  tiendas(g) {
    const hub = new THREE.Mesh(new THREE.SphereGeometry(.6, 20, 14), glow(0xb8eef2)); hub.position.y = 1.2; g.add(hub);
    const bars = [], cols = [C.cyan, 0xff7a59, 0x8b5cf6, C.g, C.cyan, 0xff7a59, C.a];
    for (let k = 0; k < 7; k++) {
      const a = k / 7 * Math.PI * 2, x = Math.cos(a) * 6.3, z = Math.sin(a) * 6.3;
      box(g, 1.8, 1.3, 1.8, mat(0x1b2631), x, 0, z); box(g, 2, .18, .5, mat(cols[k]), x, 1.1, z + .95);
      const b = new THREE.Mesh(new THREE.CylinderGeometry(.18, .18, 1, 12), glow(k === 3 ? C.r : C.cyan, .85)); b.position.set(x, 1.3, z); g.add(b); bars.push(b);
      const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 1.2, 0), new THREE.Vector3(x, .7, z)]);
      g.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color: C.cyan, transparent: true, opacity: .25 })));
    }
    return t => bars.forEach((b, k) => { const h = k === 3 ? .4 + Math.sin(t * 2) * .1 : 1.4 + Math.sin(t * .9 + k * 1.7) * .8; b.scale.y = h; b.position.y = 1.3 + h / 2; });
  },
  software(g) {
    const leds = [];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
      const x = -4.5 + i * 3, z = -3 + j * 3, bad = i === 2 && j === 1;
      box(g, 1.2, 3.4, 1.2, mat(0x243241, { roughness: .45, metalness: .3 }), x, 0, z);
      for (let y = .5; y < 3.2; y += .45) [.62, -.62].forEach(dz => { const l = box(g, .8, .1, .04, glow(bad ? C.r : (Math.random() < .2 ? C.a : C.g), .9), x, y, z + dz); leds.push([l, bad]); });
    }
    const tor = new THREE.Mesh(new THREE.TorusGeometry(2.2, .06, 8, 64), glow(C.cyan, .8)); tor.position.set(0, 5.2, 0); tor.rotation.x = Math.PI / 2; g.add(tor);
    return t => { leds.forEach(([l, bad], k) => { l.material.opacity = bad ? (Math.sin(t * 6) > 0 ? 1 : .2) : (Math.sin(t * 3 + k * 1.3) > -.6 ? .9 : .15); }); tor.rotation.z = t * .6; tor.scale.setScalar(1 + Math.sin(t * 1.5) * .06); };
  },
  fabrica(g) {
    box(g, 15, .05, 9, mat(0x10171e), 0, 0, 0);
    box(g, 13, .25, 1.3, mat(0x26323d), 0, .7, 1); for (let x = -6; x <= 6; x += 2) box(g, .15, .7, 1.1, mat(0x1b2631), x, 0, 1);
    const items = Array.from({ length: 7 }, () => box(g, .6, .5, .6, mat(0xc49a6c), 0, .95, 1));
    const st = [C.g, C.g, C.a];
    [-4, 0, 4].forEach((x, k) => { const m = box(g, 2.2, 2, 2, mat(0x2b3a47, { roughness: .4, metalness: .4 }), x, 0, -2.2); edges(m, C.cyan, .35); const c = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, .8, 16), mat(0x3d4f5e)); c.position.set(x + .5, 2.4, -2.2); g.add(c); box(g, .35, .35, .35, glow(st[k]), x - .6, 2, -1.15); });
    const arm = new THREE.Group(); arm.position.set(5.5, 0, 3); g.add(arm);
    box(arm, .8, .4, .8, mat(0xf2b632), 0, 0, 0); const up = new THREE.Group(); up.position.y = .4; arm.add(up); box(up, .25, 1.8, .25, mat(0xf2b632), 0, 0, 0); box(up, 1.6, .22, .22, mat(0xf2b632), -.7, 1.7, 0);
    return t => { items.forEach((it, k) => { const x = ((t * 1.4 + k * 13 / 7) % 13) - 6.5; it.position.x = x; it.visible = Math.abs(x) < 6.4; }); up.rotation.y = Math.sin(t * .8) * 1.2; };
  },
  clinicas(g) {
    const tiles = [];
    [[-5, -2], [0, 3], [5, -2]].forEach(([x, z]) => {
      box(g, 3.4, 2, 3, mat(0xdfe7ee, { roughness: .6 }), x, 0, z);
      box(g, 1, .25, .25, glow(C.cyan), x, 2.5, z + 1.6); box(g, .25, 1, .25, glow(C.cyan), x, 2.12, z + 1.6);
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const tl = box(g, .9, .06, .8, glow(C.g, .9), x - 1.05 + i * 1.05, 2.01, z - .95 + j * .95); tiles.push(tl); }
    });
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + .3; box(g, .4, .9 + Math.random() * .8, .4, mat(0x1d4a3a), Math.cos(a) * 8, 0, Math.sin(a) * 8); }
    let last = -1;
    return t => { const s = Math.floor(t / 1.2); if (s !== last) { last = s; tiles.forEach(tl => { const r = Math.random(); tl.material = glow(r < .55 ? C.g : r < .85 ? C.a : 0x2a3a48, .9); }); } };
  },
  obras(g) {
    box(g, 14, .05, 10, mat(0x1a1712), 0, 0, 0);
    const conc = mat(0x8a96a0, { roughness: .95 });
    for (let f = 0; f < 5; f++) { box(g, 6, .2, 4, conc, -2, f * 1.2, 0); if (f < 4) [[-4.8, -1.8], [.8, -1.8], [-4.8, 1.8], [.8, 1.8]].forEach(([x, z]) => box(g, .25, 1, .25, conc, x, f * 1.2 + .2, z)); }
    box(g, 6.1, 1.2, 4.1, glow(C.cyan, .12), -2, 4.9, 0);
    const tower = box(g, .45, 7.2, .45, mat(0xf2b632), 4.5, 0, -2.5);
    const jib = new THREE.Group(); jib.position.set(4.5, 7.2, -2.5); g.add(jib); box(jib, 9, .3, .35, mat(0xf2b632), -2.5, 0, 0); box(jib, 1.3, .8, .9, mat(0x3d4f5e), 2.3, -.8, 0);
    const line = box(jib, .04, 2.2, .04, mat(0x222222), -5, -2.2, 0); const load = box(jib, .9, .5, .9, mat(0xc49a6c), -5, -2.7, 0); void tower; void line;
    const tr = truck(C.g); tr.scale.setScalar(.55); tr.position.set(4, 0, 3.5); tr.rotation.y = -Math.PI / 2; g.add(tr);
    return t => { jib.rotation.y = Math.sin(t * .35) * 1.1; load.position.y = -2.45 + Math.sin(t * .9) * .5; };
  },
  inmobiliaria(g) {
    const pins = [], st = [C.g, C.a, C.g, 0x6e6e73, C.g, C.a, C.g, 0x6e6e73];
    [[-6, -3], [-3, 4], [0, -5], [2, 1], [5, -3], [6, 4], [-5, 2.5], [-.5, 5.5]].forEach(([x, z], k) => {
      const w = 1.6 + Math.random() * .8, h = 1.1 + Math.random() * .8;
      box(g, w, h, w, mat(0xdfe7ee, { roughness: .7 }), x, 0, z);
      const roof = new THREE.Mesh(new THREE.ConeGeometry(w * .78, .9, 4), mat(0x3d4f5e)); roof.position.set(x, h + .45, z); roof.rotation.y = Math.PI / 4; g.add(roof);
      const pin = new THREE.Group(); const s = new THREE.Mesh(new THREE.SphereGeometry(.35, 16, 12), glow(st[k])); s.position.y = .5; const c = new THREE.Mesh(new THREE.ConeGeometry(.2, .55, 12), glow(st[k])); c.rotation.x = Math.PI; pin.add(s, c);
      pin.position.set(x, h + 1.6, z); pin.userData.y = h + 1.6; g.add(pin); pins.push(pin);
    });
    return t => pins.forEach((p, k) => { p.position.y = p.userData.y + Math.sin(t * 2 + k) * .18; p.rotation.y = t; });
  },
  energia(g) {
    const pm = mat(0x1d3b6e, { roughness: .3, metalness: .6, emissive: 0x0a1a33 });
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) { const p = box(g, 1.3, .06, .9, pm, -6 + c * 1.45, .6, -1 + r * 1.3); p.rotation.x = -.5; box(g, .06, .6, .06, mat(0x3d4f5e), -6 + c * 1.45, 0, -1 + r * 1.3); }
    const rotors = [];
    [[3, -4], [6, -1], [4.5, 3.5]].forEach(([x, z]) => {
      const tw = new THREE.Mesh(new THREE.CylinderGeometry(.12, .22, 5, 12), mat(0xdfe7ee)); tw.position.set(x, 2.5, z); g.add(tw);
      box(g, .5, .4, .9, mat(0xdfe7ee), x, 4.9, z);
      const rot = new THREE.Group(); rot.position.set(x, 5.1, z + .5); g.add(rot);
      for (let b = 0; b < 3; b++) { const bl = new THREE.Group(); bl.rotation.z = b * Math.PI * 2 / 3; box(bl, .2, 2.3, .06, mat(0xf5f5f7), 0, 0, 0); rot.add(bl); }
      rotors.push(rot);
    });
    const bat = box(g, 2.2, 1.2, 1.2, mat(0x26323d), -4, 0, -4.5); edges(bat, C.g, .7); const lvl = box(g, 1.8, .14, .04, glow(C.g), -4, .5, -3.88);
    return t => { rotors.forEach((r, k) => r.rotation.z = t * (1.4 + k * .2)); lvl.scale.x = .6 + (Math.sin(t * .5) * .5 + .5) * .4; };
  }
};

(function sectors() {
  const tabs = $('#e3Tabs'), panel = $('#e3Panel'), canvas = $('#e3Diorama'); if (!tabs || !panel) return;
  const esc = s => s.replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
  SECTORS.forEach((s, k) => {
    const b = document.createElement('button'); b.className = 'e3-tab'; b.type = 'button'; b.role = 'tab'; b.id = 'tab-' + s.id;
    b.setAttribute('aria-selected', k === 0); b.setAttribute('aria-controls', 'e3Panel'); b.innerHTML = `<small>${String(k + 1).padStart(2, '0')}</small>${esc(s.tab)}`;
    b.addEventListener('click', () => select(k, true)); tabs.appendChild(b);
  });
  tabs.addEventListener('keydown', e => { const cur = SECTORS.findIndex((_, k) => tabs.children[k].getAttribute('aria-selected') === 'true'); if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { const n = (cur + (e.key === 'ArrowRight' ? 1 : -1) + SECTORS.length) % SECTORS.length; select(n, true); tabs.children[n].focus(); } });

  // escena
  let scene, camera, renderer, holder, cur = null, next = null, swapT = 1, tick = () => {}, drag = 0, dragV = 0;
  if (canvas) {
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { renderer = null; }
    if (renderer) {
      renderer.setPixelRatio(DPR); renderer.setClearColor(0x000000, 0);
      scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(34, 1, .1, 200);
      sizer(renderer, camera, canvas.parentElement); lights(scene);
      holder = new THREE.Group(); scene.add(holder);
      const plat = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, .6, 72), mat(0x0a1016, { roughness: .9 })); plat.position.y = -.3; holder.add(plat);
      const edge = new THREE.Mesh(new THREE.TorusGeometry(10, .05, 8, 128), glow(C.cyan, .7)); edge.rotation.x = Math.PI / 2; holder.add(edge);
      const pg = new THREE.PolarGridHelper(9.6, 12, 6, 64, 0x123744, 0x0c222b); pg.position.y = .002; holder.add(pg);
      let down = false, lx = 0;
      canvas.parentElement.addEventListener('pointerdown', e => { down = true; lx = e.clientX; });
      addEventListener('pointerup', () => down = false);
      addEventListener('pointermove', e => { if (!down) return; dragV = (e.clientX - lx) * .006; drag += dragV; lx = e.clientX; });
    }
  }
  const make = k => { const g = new THREE.Group(); const fn = BUILD[SECTORS[k].id](g); g.userData.tick = fn; return g; };
  function select(k, user) {
    [...tabs.children].forEach((b, i) => b.setAttribute('aria-selected', i === k));
    const s = SECTORS[k];
    panel.classList.remove('is-swap'); void panel.offsetWidth; panel.classList.add('is-swap');
    panel.setAttribute('aria-labelledby', 'tab-' + s.id);
    panel.innerHTML = `<h3>${esc(s.title)}</h3><p>${esc(s.intro)}</p>
      <div><h4>Qué ves en 3D</h4><ul>${s.ve.map(v => `<li>${esc(v)}</li>`).join('')}</ul></div>
      <div><h4>Agentes que trabajan</h4><div class="e3-agentchips">${s.agentes.map(a => `<span>Agente de ${esc(a.charAt(0).toLowerCase() + a.slice(1))}</span>`).join('')}</div></div>
      <div><h4>De dónde salen los datos</h4><div class="e3-datachips">${s.datos.map(d => `<span>${esc(d)}</span>`).join('')}</div></div>
      ${s.demo ? `<a class="btn btn--grad btn--sm" href="${esc(s.demo)}">Ver la demo de ${esc(s.tab.toLowerCase())}</a>` : `<a class="btn btn--ghost btn--sm" href="#contacto">Pide la demo de ${esc(s.tab.toLowerCase())}</a>`}`;
    if (!renderer) return;
    next = make(k); next.scale.setScalar(.001); holder.add(next); swapT = 0;
    if (!user && !cur) { cur = next; next = null; cur.scale.setScalar(1); swapT = 1; }
  }
  select(0, false);
  if (!renderer) return;
  const ease = x => 1 - Math.pow(1 - x, 3);
  const frame = (t, dt) => {
    if (next) {
      swapT = Math.min(1, swapT + dt / .7);
      if (cur) cur.scale.setScalar(Math.max(.001, 1 - ease(Math.min(1, swapT * 2))));
      next.scale.setScalar(Math.max(.001, ease(clamp(swapT * 1.6 - .5))));
      if (swapT >= 1) { if (cur) holder.remove(cur); cur = next; next = null; cur.scale.setScalar(1); }
    }
    dragV *= .92; drag += dragV * .2;
    holder.rotation.y = (reduce ? .6 : t * .12) + drag;
    const w = canvas.clientWidth, far = w < 500 ? 30 : 25.5;
    camera.position.set(0, far * .58, far); camera.lookAt(0, 1.4, 0);
    [cur, next].forEach(g => g && g.userData.tick && g.userData.tick(t));
    renderer.render(scene, camera);
  };
  if (reduce) { frame(0, 1); return; }
  loop(canvas, frame);
})();

/* =============== conectores =============== */
(function connectors() {
  const L = [['Gmail', 'Correo', 4], ['Google Calendar', 'Agenda', 215], ['Google Sheets', 'Hojas de cálculo', 140], ['Outlook', 'Correo y agenda', 205], ['Slack', 'Mensajería', 300], ['WhatsApp', 'Mensajería', 142], ['Odoo', 'ERP', 290],
    ['Holded', 'ERP y facturación', 350], ['HubSpot', 'CRM', 16], ['Stripe', 'Cobros', 250], ['Jira', 'Proyectos e incidencias', 218], ['Samsara', 'Gestión de flotas', 196], ['Webfleet', 'Gestión de flotas', 0], ['Tu ERP', 'Con API o exportación de datos', 186]];
  const pill = ([n, s, h]) => `<span class="e3-pill"><i style="--h:${h}">${n.replace('Tu ', '').charAt(0)}</i><span>${n}<br><small>${s}</small></span></span>`;
  const half = Math.ceil(L.length / 2), a = L.slice(0, half), b = L.slice(half);
  const m1 = $('#e3M1'), m2 = $('#e3M2');
  if (m1) m1.innerHTML = [...a, ...a, ...a, ...a].map(pill).join('');
  if (m2) m2.innerHTML = [...b, ...b, ...b, ...b].map(pill).join('');
  [m1, m2].forEach(m => m && m.querySelectorAll('.e3-pill').forEach((p, i) => { if (i >= (m === m1 ? a : b).length) p.setAttribute('aria-hidden', 'true'); }));
})();

/* =============== pasos: línea que se dibuja =============== */
(function steps() {
  const list = $('.e3-steps__list'); if (!list) return;
  const upd = () => { const r = list.getBoundingClientRect(); list.style.setProperty('--line', reduce ? 1 : clamp((innerHeight * .85 - r.top) / (r.height + innerHeight * .3)).toFixed(3)); };
  addEventListener('scroll', upd, { passive: true }); upd();
})();
