/* NexGent 3D · /empresa-3d · escenas e interacciones */
import { THREE, P, reduce, small, clamp, std, lit, mk, softTex, bake, dispose, slab, tree, pool, Stage, loop } from './e3-kit.js';
import { LOTS } from './e3-lots.js';

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const PI = Math.PI;
function buildLot(id) { const g = new THREE.Group(); slab(g); g.userData.tick = LOTS[id](g); bake(g); return g; }

/* =============== sectores: datos =============== */
const SECTORS = [
  { id: 'tiendas', tab: 'Tiendas', title: 'Red de tiendas', intro: 'Todas tus tiendas en un mapa, con cómo va cada una hoy comparada con lo normal.',
    ve: ['Ventas del día de cada tienda frente a lo habitual', 'Roturas de stock y reposiciones pendientes', 'Incidencias abiertas por tienda', 'Tiendas y zonas que se salen de lo normal'],
    agentes: ['Ventas', 'Compras y stock', 'Atención al cliente'], datos: ['TPV', 'Stripe', 'ERP', 'WhatsApp', 'Google Sheets'] },
  { id: 'oficina', tab: 'Oficina y servicios', title: 'Oficina y empresa de servicios', intro: 'Asesorías, agencias, despachos o consultoras: tus proyectos, clientes y plazos como un edificio vivo.',
    ve: ['Proyectos y encargos por estado y por cliente', 'Plazos que vencen esta semana', 'Facturas emitidas, cobradas y vencidas', 'Carga de trabajo por departamento, sin vigilar a nadie'],
    agentes: ['Atención al cliente', 'Finanzas', 'Documentación'], datos: ['Gmail', 'Outlook', 'Google Calendar', 'HubSpot', 'Holded', 'Slack'] },
  { id: 'fabrica', tab: 'Fábrica', title: 'Fábrica', intro: 'Cada línea de producción y cada máquina en 3D, con su ritmo, su estado y lo que necesita atención.',
    ve: ['Producción por línea frente al objetivo del turno', 'Máquinas en marcha, paradas o en aviso', 'Paradas, cuellos de botella y mermas', 'Mantenimientos previstos y recambios'],
    agentes: ['Operaciones', 'Mantenimiento', 'Calidad'], datos: ['Sensores de las máquinas', 'ERP', 'Odoo', 'Google Sheets', 'Outlook'] },
  { id: 'almacen', tab: 'Almacén', title: 'Almacén', intro: 'La nave en 3D, estantería por estantería: qué hay, qué falta y qué está a punto de salir.',
    ve: ['Ocupación de cada estantería y cada hueco', 'Pedidos en preparación y muelles de carga', 'Productos por debajo del stock mínimo', 'Mapas de calor de las zonas con más movimiento'],
    agentes: ['Compras y stock', 'Logística', 'Operaciones'], datos: ['Odoo', 'Holded', 'Tu ERP o SGA', 'Google Sheets', 'Correo de proveedores'] },
  { id: 'flotas', tab: 'Flotas', title: 'Flota y logística', intro: 'Vehículos, rutas y entregas sobre el mapa, en directo, con lo que llega tarde marcado en color.',
    ve: ['Cada vehículo en su ruta, con carga y hora prevista', 'Paradas largas, desvíos y retrasos', 'Almacenes y muelles con su ocupación', 'Revisiones, seguros e ITV que vencen'],
    agentes: ['Logística', 'Mantenimiento', 'Atención al cliente'], datos: ['Samsara', 'Webfleet', 'GPS de la flota', 'ERP', 'WhatsApp'] },
  { id: 'clinicas', tab: 'Clínicas', title: 'Clínicas y salud', intro: 'Todas las clínicas de un vistazo: agenda, salas ocupadas y huecos libres, sede por sede.',
    ve: ['Ocupación de la agenda y de cada sala', 'Huecos libres que se pueden llenar hoy', 'Cancelaciones y citas sin confirmar', 'Facturación del día por clínica'],
    agentes: ['Atención al cliente', 'Finanzas', 'Marketing'], datos: ['Programa de citas', 'Google Calendar', 'WhatsApp', 'Holded', 'Stripe'] },
  { id: 'hosteleria', tab: 'Hostelería', title: 'Restaurantes y hostelería', intro: 'Cada local con sus mesas, sus reservas y su cocina, en directo y comparado con un día normal.',
    ve: ['Mesas libres, ocupadas y reservadas', 'Comandas en cocina y tiempos de salida', 'Ventas por local y por franja horaria', 'Stock de cocina y pedidos a proveedores'],
    agentes: ['Atención al cliente', 'Compras y stock', 'Dirección'], datos: ['TPV', 'Plataforma de reservas', 'WhatsApp', 'Google Sheets', 'Holded'] },
  { id: 'hoteles', tab: 'Hoteles', title: 'Hoteles y alojamientos', intro: 'El hotel en 3D, habitación por habitación: ocupadas, por limpiar y libres para vender hoy.',
    ve: ['Estado de cada habitación', 'Llegadas, salidas y peticiones de huéspedes', 'Ocupación y precio medio por noche', 'Averías y mantenimiento por planta'],
    agentes: ['Atención al cliente', 'Mantenimiento', 'Ventas'], datos: ['Programa de gestión hotelera', 'Booking y otros canales', 'WhatsApp', 'Stripe', 'Outlook'] },
  { id: 'software', tab: 'Software', title: 'Empresa de software', intro: 'Tus servicios como un pequeño barrio: cada edificio es un sistema, con su salud, sus despliegues y sus incidencias.',
    ve: ['Estado de cada servicio y de cada servidor', 'Despliegues del día y lo que cambió', 'Incidencias abiertas y tiques de clientes', 'Ingresos y bajas de clientes en directo'],
    agentes: ['Soporte técnico', 'Atención al cliente', 'Ventas'], datos: ['Jira', 'Slack', 'Stripe', 'HubSpot', 'Gmail', 'Tu monitorización'] },
  { id: 'obras', tab: 'Obras', title: 'Obras y construcción', intro: 'Cada obra en 3D con su avance por fases, las entregas de material y lo que va con retraso.',
    ve: ['Avance de cada obra por fases frente al plan', 'Entregas de material y alquiler de maquinaria', 'Retrasos y tareas bloqueadas', 'Documentación y permisos pendientes'],
    agentes: ['Operaciones', 'Compras y stock', 'Documentación'], datos: ['Excel de planificación', 'ERP', 'Google Calendar', 'Gmail', 'WhatsApp'] },
  { id: 'inmobiliaria', tab: 'Inmobiliaria', title: 'Inmobiliaria', intro: 'La cartera entera sobre el mapa: cada inmueble con su estado, sus visitas y sus interesados.',
    ve: ['Inmuebles disponibles, reservados y vendidos', 'Visitas del día y de la semana', 'Interesados nuevos y a quién falta responder', 'Precio y tiempo en el mercado por zona'],
    agentes: ['Ventas', 'Atención al cliente', 'Marketing'], datos: ['HubSpot', 'Portales inmobiliarios', 'WhatsApp', 'Google Calendar', 'Gmail'] },
  { id: 'energia', tab: 'Energía', title: 'Instalaciones de energía', intro: 'Plantas solares, eólicas y baterías en 3D, con lo que producen ahora mismo y cualquier alarma.',
    ve: ['Producción en directo frente a la prevista', 'Alarmas y equipos con bajo rendimiento', 'Estado de carga de las baterías', 'Mantenimientos y visitas técnicas'],
    agentes: ['Operaciones', 'Mantenimiento', 'Dirección'], datos: ['SCADA o monitorización', 'Previsión meteorológica', 'ERP', 'Google Sheets', 'Outlook'] }
];

/* =============== agentes por área =============== */
const AGENTS = [
  { k: 'A', h: 200, name: 'Atención al cliente', what: 'Contesta a tus clientes por WhatsApp, correo y teléfono, agenda citas y resuelve dudas al momento, a cualquier hora.',
    ex: [['Clínica', 'Llena los huecos de mañana con pacientes en lista de espera'], ['Tienda', 'Dice si un producto está en stock y lo reserva'], ['Hotel', 'Atiende peticiones de huéspedes a las 2 de la mañana']],
    ok: 'Devoluciones, descuentos o cualquier excepción a tus normas.', aviso: 'Te resume el día a las 9:00. Si un cliente se queja, al momento.' },
  { k: 'V', h: 150, name: 'Ventas', what: 'Sigue cada oportunidad, prepara presupuestos y te avisa de los clientes que se están enfriando antes de perderlos.',
    ex: [['Inmobiliaria', 'Responde a interesados y propone visitas'], ['Servicios', 'Prepara el presupuesto con tus tarifas'], ['Software', 'Detecta clientes con riesgo de baja']],
    ok: 'Enviar un presupuesto o aplicar un descuento.', aviso: 'Te avisa cuando una oportunidad grande se mueve.' },
  { k: 'O', h: 30, name: 'Operaciones', what: 'Vigila que todo funcione como debe: pedidos, producción, servicios y plazos. Si algo se atasca, propone cómo reorganizarlo.',
    ex: [['Fábrica', 'Reparte la carga entre líneas cuando una se para'], ['Obras', 'Avisa de qué tareas bloquean el avance'], ['Energía', 'Compara producción real con la prevista']],
    ok: 'Cambiar la planificación del día.', aviso: 'Lo urgente, al momento. El resto, en tu resumen.' },
  { k: 'C', h: 265, name: 'Compras y stock', what: 'Controla las existencias, prevé cuándo se acaba cada producto y prepara los pedidos a proveedores.',
    ex: [['Tienda', 'Repone lo que más se vende antes de que falte'], ['Restaurante', 'Ajusta el pedido de cocina al fin de semana'], ['Almacén', 'Detecta productos parados que ocupan sitio']],
    ok: 'Lanzar un pedido a un proveedor.', aviso: 'Te pide el OK dentro de tu horario.' },
  { k: 'F', h: 120, name: 'Finanzas', what: 'Concilia cobros y pagos, persigue facturas vencidas y te da una previsión de caja siempre al día.',
    ex: [['Servicios', 'Recuerda con amabilidad las facturas vencidas'], ['Clínica', 'Cuadra la caja de cada sede al cierre'], ['Cualquiera', 'Avisa si la caja va a quedarse corta']],
    ok: 'Reclamar a un cliente o programar un pago.', aviso: 'Informe semanal los lunes. Si la caja se tuerce, antes.' },
  { k: 'M', h: 10, name: 'Mantenimiento', what: 'Detecta lo que está a punto de fallar, programa revisiones y lleva el control de garantías y recambios.',
    ex: [['Fábrica', 'Ve que una máquina vibra más de lo normal'], ['Flota', 'Programa la revisión antes de la ITV'], ['Hotel', 'Agrupa las averías por planta']],
    ok: 'Parar una máquina o pedir un recambio.', aviso: 'Si algo va a romperse ya, te llama.' },
  { k: 'L', h: 185, name: 'Logística', what: 'Organiza rutas, entregas y muelles, y avisa al cliente si algo va a llegar tarde.',
    ex: [['Flota', 'Reordena entregas por un atasco'], ['Almacén', 'Asigna muelles a los camiones que llegan'], ['Tienda', 'Agrupa los pedidos online por zona']],
    ok: 'Cambiar una ruta o una fecha de entrega.', aviso: 'Al momento si un cliente importante se ve afectado.' },
  { k: 'Q', h: 330, name: 'Calidad', what: 'Revisa mermas, devoluciones y reclamaciones, y encuentra el patrón que hay detrás.',
    ex: [['Fábrica', 'Relaciona un defecto con un lote de material'], ['Restaurante', 'Detecta un plato con más quejas'], ['Tienda', 'Ve qué producto se devuelve más']],
    ok: 'Retirar un lote o cambiar un proceso.', aviso: 'En tu resumen diario.' },
  { k: 'K', h: 300, name: 'Marketing', what: 'Mide campañas y reseñas, compara sedes y te propone acciones concretas para llenar los huecos.',
    ex: [['Clínica', 'Propone una campaña para las horas flojas'], ['Hotel', 'Responde reseñas con tu tono'], ['Inmobiliaria', 'Ve qué portal trae más interesados']],
    ok: 'Publicar o lanzar una campaña.', aviso: 'Informe de campañas cada semana.' },
  { k: 'T', h: 225, name: 'Soporte técnico', what: 'Vigila tus sistemas, resuelve incidencias de primer nivel y te avisa si algo deja de funcionar.',
    ex: [['Software', 'Detecta un servicio caído y abre la incidencia'], ['Tiendas', 'Ve qué TPV no está enviando ventas'], ['Oficina', 'Gestiona accesos y altas de herramientas']],
    ok: 'Reiniciar un sistema o cambiar un acceso.', aviso: 'Una caída es urgente: te avisa a cualquier hora.' },
  { k: 'D', h: 45, name: 'Documentación', what: 'Lleva contratos, permisos, licencias, seguros y certificados, y te avisa antes de que caduquen.',
    ex: [['Obras', 'Controla permisos y documentación de cada obra'], ['Flota', 'Avisa de seguros e ITV que vencen'], ['Clínica', 'Revisa autorizaciones y contratos']],
    ok: 'Firmar o enviar un documento.', aviso: 'Con 30, 15 y 5 días de margen.' },
  { k: 'R', h: 170, name: 'Dirección', what: 'Junta lo que hacen los demás agentes y te lo cuenta: reunión diaria por voz, comparativa de sedes e informe del mes.',
    ex: [['Cualquiera', 'Reunión diaria de 4 minutos por voz a las 8:45'], ['Red de sedes', 'Te dice qué sede va peor y por qué'], ['Cualquiera', 'Prepara el informe del mes para el consejo']],
    ok: 'Nada: te informa para que decidas tú.', aviso: 'Cada mañana, a la hora que elijas.' }
];

/* =============== preguntas de ejemplo =============== */
const ASKS = [
  { q: 'Resúmeme el día', a: 'Dirección', h: 170, r: 'Hoy todo va bien. Ventas un 8 % por encima de un martes normal, 2 incidencias resueltas y 1 cosa pendiente de tu OK: un pedido de reposición de 240 unidades.', acts: ['Ver el pedido', 'Mañana'] },
  { q: '¿Qué tienda va peor esta semana?', a: 'Ventas', h: 150, r: 'La tienda 14 (centro): un 18 % por debajo de su media. Coincide con una rotura de stock en 6 de sus productos más vendidos. Tengo la reposición preparada.', acts: ['Lánzala', 'Ver en 3D'] },
  { q: '¿Qué máquina me puede fallar?', a: 'Mantenimiento', h: 10, r: 'La prensa 3 de la línea 2: vibra un 22 % más que hace cinco días. Te propongo revisarla el jueves en el cambio de turno, para no parar la producción.', acts: ['Prográmalo', 'Ver la máquina'] },
  { q: '¿Cuántos huecos libres hay mañana?', a: 'Atención al cliente', h: 200, r: '23 huecos entre las 4 clínicas, 11 en la del norte. He escrito a 9 pacientes en lista de espera y 4 ya han reservado.', acts: ['Ver agenda', 'Sigue así'] },
  { q: '¿Quién me debe dinero?', a: 'Finanzas', h: 120, r: '12 facturas vencidas. Las 3 más antiguas suman 9.100 €. ¿Mando un recordatorio amable a todos o prefieres revisarlas antes?', acts: ['Envíalo', 'Revisar'] },
  { q: '¿Cómo van las obras?', a: 'Operaciones', h: 30, r: 'La obra de la avenida va al 62 %, cuatro días por delante. La del puerto, al 38 % y una semana tarde por una entrega de material. Ya he pedido fecha nueva al proveedor.', acts: ['Ver las obras', 'Gracias'] },
  { q: '¿Qué habitaciones quedan para esta noche?', a: 'Ventas', h: 150, r: 'Quedan 7 libres: 5 dobles y 2 suites. Las 3 que se están limpiando estarán listas a las 14:00.', acts: ['Ver el hotel', 'Ok'] }
];

/* =============== HERO: la ciudad de tu empresa, de noche, con el núcleo de IA en el centro =============== */
(function hero() {
  const canvas = $('#e3Hero'); if (!canvas) return;
  let st;
  try { st = new Stage(canvas, { dpr: small ? 1.25 : 1.5, fov: small ? 38 : 30, shadows: !small, reflect: !small, shadowSize: 64, bloom: .8, bloomR: .8, bloomT: .92, focus: .36, blur: small ? 3 : 5, hemi: .75, keyI: 3 }); } catch (e) { return; }
  const { scene, camera } = st; scene.fog = new THREE.FogExp2(P.fog, .0064);
  st.sky(); st.floor(470, { cell: 27, grid: .05 });
  const world = new THREE.Group(); scene.add(world);

  // parcelas 3×3 con el núcleo en el centro
  const PITCH = 27, GRID = [['fabrica', 'oficina', 'hoteles'], ['almacen', null, 'clinicas'], ['tiendas', 'flotas', 'hosteleria']], lots = [];
  GRID.forEach((row, j) => row.forEach((id, i) => { if (!id) return; const g = buildLot(id), x = (i - 1) * PITCH, z = (j - 1) * PITCH; g.position.set(x, .5, z); world.add(g); lots.push({ id, g, x, z }); }));

  // plaza central
  const plaza = new THREE.Group(); plaza.position.y = .5; world.add(plaza); slab(plaza, 1.6);
  mk(plaza, new THREE.CylinderGeometry(7.8, 7.8, .16, 72), std(0x0c121a, .2, .8), 0, .08, 0);
  [7.8, 5.6, 3.4].forEach((r, k) => { const m = mk(plaza, new THREE.TorusGeometry(r, .055, 8, 120), lit(P.teal, 2.4 - k * .4), 0, .18, 0); m.rotation.x = PI / 2; });
  mk(plaza, new THREE.CylinderGeometry(1.7, 2.4, 1.3, 40), std(0x111924, .18, .85), 0, .8, 0); mk(plaza, new THREE.CylinderGeometry(1.5, 1.5, .06, 40), lit(P.teal, 3.2), 0, 1.48, 0);
  [[-8.4, -8.4], [8.4, -8.4], [-8.4, 8.4], [8.4, 8.4]].forEach(([x, z]) => tree(plaza, x, z, 1.1)); pool(plaza, 0, 0, 12, P.teal, .5, .2);
  bake(plaza);

  // núcleo de IA
  const core = new THREE.Group(); core.position.y = 7.4; world.add(core);
  const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(2.3, 0), new THREE.ShaderMaterial({
    vertexShader: 'varying vec3 vN, vV; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader: 'varying vec3 vN, vV; void main(){ float f = pow(1. - max(dot(normalize(vN), normalize(vV)), 0.), 2.2); gl_FragColor = vec4(mix(vec3(.03,.22,.34), vec3(.55,1.,1.), f) * 2.6 + vec3(.05,.25,.5), 1.); }' }));
  crystal.scale.y = 1.55; core.add(crystal);
  const shell = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(4.3, 1)), new THREE.LineBasicMaterial({ color: 0x9fe6f0, transparent: true, opacity: .55 })); core.add(shell);
  const rings = [[5.4, .06, 2.2], [6.3, .045, 1.6], [7.2, .035, 1.2]].map(([r, w, k]) => { const m = new THREE.Mesh(new THREE.TorusGeometry(r, w, 8, 140), lit(P.teal, k)); core.add(m); return m; });
  const beamMat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false, uniforms: { time: { value: 0 } },
    vertexShader: 'varying vec2 vUv; varying vec3 vN, vV; void main(){ vUv = uv; vec4 mv = modelViewMatrix * vec4(position,1.); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader: 'uniform float time; varying vec2 vUv; varying vec3 vN, vV; void main(){ float e = pow(abs(dot(normalize(vN), normalize(vV))), 2.4); float a = e * pow(1. - vUv.y, 1.5) * (.5 + .08 * sin(time * 2. + vUv.y * 40.)); gl_FragColor = vec4(vec3(.32,.86,1.) * a * 1.5, 1.); }' });
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(4.6, 1.4, 90, 48, 1, true), beamMat); beam.position.y = 45; core.add(beam);
  const NP = small ? 70 : 150, pp = new Float32Array(NP * 3), ps = Array.from({ length: NP }, () => [Math.random() * PI * 2, .6 + Math.random() * 3.2, Math.random(), .04 + Math.random() * .06]);
  const pgeo = new THREE.BufferGeometry(); pgeo.setAttribute('position', new THREE.BufferAttribute(pp, 3));
  const sparks = new THREE.Points(pgeo, new THREE.PointsMaterial({ map: softTex, color: new THREE.Color(0x9fe6f0).multiplyScalar(2.4), size: .7, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })); core.add(sparks);
  const pulses = [0, 1].map(() => { const m = new THREE.Mesh(new THREE.RingGeometry(.96, 1, 96), new THREE.MeshBasicMaterial({ color: new THREE.Color(P.teal).multiplyScalar(2.2), transparent: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })); m.rotation.x = -PI / 2; m.position.y = .72; world.add(m); return m; });

  // arcos de datos núcleo ↔ negocios
  const arcs = lots.map((l, k) => {
    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 8, 0), new THREE.Vector3(l.x * .5, 25, l.z * .5), new THREE.Vector3(l.x, 5.5, l.z));
    const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 72, .1, 6), new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, uniforms: { time: { value: 0 }, off: { value: k * .37 }, dir: { value: k % 2 ? 1 : -1 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
      fragmentShader: 'uniform float time, off, dir; varying vec2 vUv; void main(){ float p = fract(vUv.x * 1.5 - time * .2 * dir + off); float pulse = smoothstep(0., .04, p) * smoothstep(.24, .04, p); float fade = smoothstep(0., .06, vUv.x) * smoothstep(1., .9, vUv.x); gl_FragColor = vec4(vec3(.36,.88,1.) * (.1 + pulse * 2.8) * fade, 1.); }' }));
    world.add(m); return m;
  });

  // calles: marcas viales y tráfico
  const ROADS = [-40.5, -13.5, 13.5, 40.5], RL = 100, m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0), v = new THREE.Vector3(), one = new THREE.Vector3(1, 1, 1), col = new THREE.Color();
  const dg = new THREE.PlaneGeometry(1.5, .16); dg.rotateX(-PI / 2);
  const dashes = new THREE.InstancedMesh(dg, lit(0x9db1c6, .55), ROADS.length * 2 * 62); let n = 0;
  ROADS.forEach(c => { for (let s = -RL; s < RL; s += 3.25) { m4.makeTranslation(s, .03, c); dashes.setMatrixAt(n++, m4); m4.makeRotationY(PI / 2).setPosition(c, .03, s); dashes.setMatrixAt(n++, m4); } });
  dashes.count = n; world.add(dashes);
  const NC = small ? 26 : 54, cars = Array.from({ length: NC }, (_, k) => { const dir = k % 2 ? 1 : -1; return { ax: k % 4 < 2 ? 0 : 1, c: ROADS[(k >> 2) % 4] + dir * 1.55, dir, s: (Math.random() * 2 - 1) * RL, v: 7 + Math.random() * 7 }; });
  const part = (geo, mat, shadow) => { const m = new THREE.InstancedMesh(geo, mat, NC); m.castShadow = !!shadow; m.frustumCulled = false; world.add(m); return m; };
  const g1 = new THREE.BoxGeometry(2.1, .55, 1); g1.translate(0, .45, 0); const g2 = new THREE.BoxGeometry(1.05, .42, .88); g2.translate(-.1, .93, 0);
  const g3 = new THREE.BoxGeometry(.08, .16, .84); g3.translate(1.07, .5, 0); const g4 = new THREE.BoxGeometry(.08, .14, .84); g4.translate(-1.07, .52, 0);
  const g5 = new THREE.PlaneGeometry(6.4, 3.6); g5.rotateX(-PI / 2); g5.translate(3.6, .05, 0);
  const cBody = part(g1, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .3, metalness: .5 }), true), cCab = part(g2, std(0x0b1220, .08, .7)), cHead = part(g3, lit(0xfff1d0, 5)), cTail = part(g4, lit(0xff2a2a, 4));
  const cGlow = part(g5, new THREE.MeshBasicMaterial({ map: softTex, color: new THREE.Color(0xffe2b0).multiplyScalar(.5), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  cars.forEach((_, k) => cBody.setColorAt(k, col.set([0xd9e2ec, 0x2c3a4b, 0xb23a48, 0xeef2f6, 0x3b82f6, 0x1b2430][k % 6])));
  const moveCars = dt => {
    cars.forEach((c, k) => {
      c.s += c.v * c.dir * dt; if (c.s > RL) c.s -= 2 * RL; if (c.s < -RL) c.s += 2 * RL;
      if (c.ax === 0) { v.set(c.s, 0, c.c); q.setFromAxisAngle(up, c.dir > 0 ? 0 : PI); } else { v.set(-c.c, 0, c.s); q.setFromAxisAngle(up, c.dir > 0 ? -PI / 2 : PI / 2); }
      m4.compose(v, q, one); [cBody, cCab, cHead, cTail, cGlow].forEach(m => m.setMatrixAt(k, m4));
    });
    [cBody, cCab, cHead, cTail, cGlow].forEach(m => m.instanceMatrix.needsUpdate = true);
  };

  // la ciudad alrededor, hasta perderse en la niebla
  const fc = document.createElement('canvas'); fc.width = 128; fc.height = 256; const fx = fc.getContext('2d'); fx.fillStyle = '#000'; fx.fillRect(0, 0, 128, 256);
  for (let i = 0; i < 9; i++) for (let j = 0; j < 22; j++) { if (Math.random() > .2) continue; const w = Math.random() < .75; fx.fillStyle = w ? `rgba(255,${165 + Math.random() * 40 | 0},${80 + Math.random() * 50 | 0},${.35 + Math.random() * .65})` : `rgba(140,220,240,${.3 + Math.random() * .6})`; fx.fillRect(9 + i * 12.6, 10 + j * 11, 7, 6); }
  const ftex = new THREE.CanvasTexture(fc); ftex.colorSpace = THREE.SRGBColorSpace; ftex.anisotropy = 4;
  const tgeo = new THREE.BoxGeometry(1, 1, 1); for (let k = 8; k < 16; k++) tgeo.attributes.uv.setXY(k, .01, .01);
  const blocks = [];
  for (let i = -6; i <= 6; i++) for (let j = -7; j <= 3; j++) {
    if (Math.abs(i) <= 1 && Math.abs(j) <= 1) continue; if (j >= 2 && Math.abs(i) <= 4) continue;
    const far = Math.max(Math.abs(i), Math.abs(j)), nb = 2 + Math.floor(Math.random() * 3);
    for (let b = 0; b < nb; b++) blocks.push([i * PITCH + (b % 2 ? 5.5 : -5.5) + (Math.random() - .5) * 2, j * PITCH + (b > 1 ? 5.5 : -5.5) + (Math.random() - .5) * 2, 6 + Math.random() * 4, 4 + Math.pow(Math.random(), 2) * (10 + far * 6), 6 + Math.random() * 4]);
  }
  const town = new THREE.InstancedMesh(tgeo, new THREE.MeshStandardMaterial({ color: 0x0c1219, roughness: .35, metalness: .6, envMapIntensity: .7, emissive: 0xffffff, emissiveMap: ftex, emissiveIntensity: 1.15 }), blocks.length);
  blocks.forEach(([x, z, w, h, d], k) => { m4.makeScale(w, h, d).setPosition(x, h / 2, z); town.setMatrixAt(k, m4); }); world.add(town);

  // etiquetas sobre los negocios
  const labelsBox = $('#e3Labels');
  const LBL = { tiendas: ['<b>Tienda 14</b><i class="a"></i>Ventas −18 % · revisando stock', 8], fabrica: ['<b>Línea 2</b><i class="r"></i>Vibración anormal · aviso enviado', 11], clinicas: ['<b>Clínica norte</b><i></i>3 huecos libres · llenando agenda', 10], almacen: ['<b>Almacén</b><i></i>Ocupación 86 % · 2 muelles libres', 12], hosteleria: ['<b>Restaurante centro</b><i></i>Mesas al 86 % · cocina al día', 7] };
  const labels = small ? [] : lots.filter(l => LBL[l.id]).map(l => { const el = document.createElement('div'); el.className = 'e3-lbl'; el.innerHTML = LBL[l.id][0]; labelsBox.appendChild(el); return { pos: new THREE.Vector3(l.x, LBL[l.id][1], l.z), el }; });
  const v3 = new THREE.Vector3();
  const drawLabels = () => labels.forEach(l => {
    v3.copy(l.pos).project(camera); const w = st.w, h = st.h, x = (v3.x * .5 + .5) * w, y = (-v3.y * .5 + .5) * h;
    l.el.style.opacity = v3.z < 1 && x > 110 && x < w - 110 && y > lblTop && y < h - 30 && !(x > w - 420 && y > h - 240) ? 1 : 0;
    l.el.style.transform = `translate(${x}px,${y}px) translate(-50%,-130%)`;
  });

  let lblTop = 0; const content = $('.e3-hero .hero__content'), setTop = () => { lblTop = content ? content.getBoundingClientRect().bottom - canvas.getBoundingClientRect().top + 64 : 0; }; setTop(); addEventListener('resize', setTop); setTimeout(setTop, 2500);
  st.collect();
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', e => { mouse.tx = e.clientX / innerWidth - .5; mouse.ty = e.clientY / innerHeight - .5; }, { passive: true });
  const frame = (t, dt) => {
    mouse.x += (mouse.tx - mouse.x) * .04; mouse.y += (mouse.ty - mouse.y) * .04;
    const sc = clamp(scrollY / innerHeight), ang = .16 + Math.sin(t * .07) * .3 + mouse.x * .2, tall = st.h > st.w;
    const R = (tall ? 210 : 128) - sc * 30, H = (tall ? 96 : 54) - sc * 14 + mouse.y * 6;
    camera.position.set(Math.sin(ang) * R, H, Math.cos(ang) * R); camera.lookAt(0, (tall ? 40 : 23.5) - sc * 9, 0);
    crystal.rotation.y = t * .5; crystal.position.y = Math.sin(t * 1.2) * .35; shell.rotation.y = -t * .15; shell.rotation.x = t * .1;
    rings.forEach((r, k) => { r.rotation.x = PI / 2 + Math.sin(t * (.4 + k * .13) + k * 2) * .9; r.rotation.y = t * (.3 + k * .12); });
    beamMat.uniforms.time.value = t; arcs.forEach(a => a.material.uniforms.time.value = t);
    ps.forEach((p, k) => { const u = (p[2] + t * p[3]) % 1, r = p[1] * (.6 + u * .9); pp[k * 3] = Math.cos(p[0] + t * .2) * r; pp[k * 3 + 1] = -5 + u * 46; pp[k * 3 + 2] = Math.sin(p[0] + t * .2) * r; }); pgeo.attributes.position.needsUpdate = true;
    pulses.forEach((m, k) => { const u = (t * .22 + k * .5) % 1; m.scale.setScalar(2.4 + u * 9); m.material.opacity = (1 - u) * .9; });
    moveCars(dt); lots.forEach(l => l.g.userData.tick && l.g.userData.tick(t, dt));
    st.render(t); drawLabels();
  };
  canvas.parentElement.classList.add('is-3d');
  if (reduce) { frame(8, 0); return; }
  loop(canvas, frame);
})();

/* =============== palabra que cambia en la etiqueta del hero =============== */
(function rotator() {
  const el = $('#e3Rot'); if (!el || reduce) return;
  const words = ['tiendas', 'oficinas', 'fábricas', 'clínicas', 'restaurantes', 'hoteles', 'almacenes', 'flotas', 'obras', 'inmobiliarias', 'tu empresa'];
  let k = 0;
  setInterval(() => { if (document.hidden) return; el.classList.add('out'); setTimeout(() => { k = (k + 1) % words.length; el.textContent = words[k]; el.classList.remove('out'); }, 350); }, 2200);
})();

/* =============== feed de agentes del hero =============== */
(function feed() {
  const ul = $('#e3Feed'); if (!ul || reduce) return;
  const msgs = [
    ['Atención al cliente', 'Responde 6 WhatsApp y agenda 2 citas'], ['Finanzas', 'Concilia 128 cobros de ayer'], ['Mantenimiento', 'Línea 2: vibración fuera de lo normal'],
    ['Compras y stock', 'Prepara la reposición de la tienda 14. Espera tu OK'], ['Ventas', 'Envía 3 presupuestos aprobados'], ['Dirección', 'Tu resumen del día, listo para las 9:00'],
    ['Logística', 'Reordena 4 entregas por un atasco'], ['Documentación', 'El seguro de la nave 2 vence en 15 días'], ['Atención al cliente', 'Llena 3 huecos libres de la clínica norte'],
    ['Calidad', 'Detecta un lote con más devoluciones de lo normal'], ['Soporte técnico', 'El TPV de la tienda 6 vuelve a enviar ventas'], ['Marketing', 'Responde 4 reseñas nuevas']];
  let k = 3;
  setInterval(() => {
    if (document.hidden) return;
    const [a, b] = msgs[k++ % msgs.length], li = document.createElement('li');
    li.innerHTML = '<b></b>'; li.firstChild.textContent = a; li.append(' ' + b);
    ul.prepend(li); while (ul.children.length > 3) ul.lastElementChild.remove();
  }, 3400);
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

const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

/* =============== equipo de agentes en órbita =============== */
(function team() {
  const orbit = $('#e3Orbit'), panel = $('#e3Agent'); if (!orbit || !panel) return;
  const btns = AGENTS.map((a, k) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'e3-ag'; b.role = 'tab'; b.id = 'ag-' + k;
    b.style.setProperty('--h', a.h); b.setAttribute('aria-controls', 'e3Agent'); b.setAttribute('aria-selected', 'false');
    b.innerHTML = `<i>${a.k}</i><span>${esc(a.name)}</span>`;
    b.addEventListener('click', () => { user = true; show(k); }); orbit.appendChild(b); return b;
  });
  let cur = -1, user = false, rot = 0;
  const place = () => btns.forEach((b, k) => { const a = k / btns.length * Math.PI * 2 - Math.PI / 2 + rot; b.style.left = (50 + Math.cos(a) * 43) + '%'; b.style.top = (50 + Math.sin(a) * 43) + '%'; });
  function show(k) {
    if (k === cur) return; cur = k; const a = AGENTS[k];
    btns.forEach((b, i) => b.setAttribute('aria-selected', i === k));
    panel.setAttribute('aria-labelledby', 'ag-' + k); panel.style.setProperty('--h', a.h);
    panel.classList.remove('is-swap'); void panel.offsetWidth; panel.classList.add('is-swap');
    panel.innerHTML = `<div class="e3-agent__h"><i>${a.k}</i><div><h3>Agente de ${esc(a.name.charAt(0).toLowerCase() + a.name.slice(1))}</h3><small>Trabajando ahora</small></div></div>
      <p>${esc(a.what)}</p>
      <div><h4>Por ejemplo</h4><ul class="e3-ex">${a.ex.map(([s, t]) => `<li><b>${esc(s)}</b><span>${esc(t)}</span></li>`).join('')}</ul></div>
      <div class="e3-agent__row"><div><h4>Te pide permiso para</h4><p>${esc(a.ok)}</p></div><div><h4>Cómo te avisa</h4><p>${esc(a.aviso)}</p></div></div>`;
  }
  place(); show(0);
  if (reduce) return;
  let vis = false; new IntersectionObserver(([e]) => vis = e.isIntersecting).observe(orbit);
  setInterval(() => { if (vis && !user && !document.hidden) show((cur + 1) % AGENTS.length); }, 4200);
  let last = performance.now();
  const spin = now => { const dt = (now - last) / 1000; last = now; if (vis) { rot += dt * .03; place(); } requestAnimationFrame(spin); };
  requestAnimationFrame(spin);
})();

/* =============== habla con tu empresa =============== */
(function talk() {
  const box = $('#e3Asks'), body = $('#e3ChatBody'); if (!box || !body) return;
  let busy = false, timer = 0, user = false, idx = 0;
  const chips = ASKS.map((a, k) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'e3-ask'; b.textContent = a.q; b.addEventListener('click', () => { user = true; ask(k); }); box.appendChild(b); return b; });
  const add = html => { const d = document.createElement('div'); d.innerHTML = html; const el = d.firstElementChild; body.appendChild(el); while (body.children.length > 6) body.firstElementChild.remove(); return el; };
  function ask(k) {
    if (busy) return; busy = true; idx = k;
    chips.forEach((c, i) => c.classList.toggle('is-on', i === k));
    const a = ASKS[k];
    add(`<div class="e3-bub e3-bub--me">${esc(a.q)}</div>`);
    const typing = add(`<div class="e3-bub e3-bub--ai" style="--h:${a.h}"><b><i>${esc(a.a.charAt(0))}</i>Agente de ${esc(a.a.toLowerCase())}</b><span class="e3-dots"><i></i><i></i><i></i></span></div>`);
    setTimeout(() => {
      typing.innerHTML = `<b><i>${esc(a.a.charAt(0))}</i>Agente de ${esc(a.a.toLowerCase())}</b>${esc(a.r)}<div class="e3-bub__acts">${a.acts.map(x => `<span>${esc(x)}</span>`).join('')}</div>`;
      busy = false;
    }, reduce ? 0 : 1100);
  }
  ask(0);
  if (reduce) return;
  let vis = false; new IntersectionObserver(([e]) => vis = e.isIntersecting, { threshold: .3 }).observe(body);
  timer = setInterval(() => { if (vis && !user && !document.hidden) ask((idx + 1) % ASKS.length); }, 5200);
  const mic = $('#e3Mic'); mic && mic.addEventListener('click', () => { mic.classList.toggle('is-on'); if (mic.classList.contains('is-on')) setTimeout(() => { mic.classList.remove('is-on'); user = true; ask(0); }, 1800); });
})();

/* =============== funcionalidades: pequeñas animaciones =============== */
(function features() {
  const crumbs = $('#e3Crumbs');
  if (crumbs && !reduce) {
    const sets = [['Empresa', 'Zona Sur', 'Tienda 14'], ['Empresa', 'Planta', 'Línea 2'], ['Empresa', 'Clínica norte', 'Sala 3'], ['Empresa', 'Nave 2', 'Estantería B4'], ['Empresa', 'Hotel centro', 'Planta 4']];
    let s = 0, k = 0;
    setInterval(() => {
      const sp = $$('span', crumbs);
      if (k === 0) { s = (s + 1) % sets.length; sp.forEach((x, i) => x.textContent = sets[s][i]); }
      sp.forEach((x, i) => x.classList.toggle('on', i === k)); k = (k + 1) % 3;
    }, 1800);
  }
  const clock = $('[data-clock]');
  if (clock && !reduce) { const t0 = performance.now(); setInterval(() => { const f = Math.min(1, (((performance.now() - t0) / 8000) % 1) / .8); const m = 360 + Math.round(f * 720); clock.textContent = String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); }, 120); }
  const heat = $('#e3Heat');
  if (heat) {
    const cells = Array.from({ length: 96 }, () => heat.appendChild(document.createElement('i')));
    const paint = t => cells.forEach((c, i) => { const x = i % 16, y = Math.floor(i / 16); const v = Math.max(0, Math.sin(x * .55 + t) * Math.cos(y * .9 - t * .7)) ** 2; c.style.setProperty('--o', (.06 + v * .85).toFixed(2)); });
    let t = 0; paint(t); if (!reduce) setInterval(() => { if (!document.hidden) paint(t += .35); }, 1400);
  }
  // simulador con escenarios de varios sectores
  const tabs = $('#e3SimTabs'), sim = $('#e3Sim'), q = $('#e3SimQ'), out = $('#e3SimOut'), res = $('#e3SimRes');
  if (tabs && sim) {
    const SC = [
      { t: 'Tiendas', q: '¿Y si abro los sábados por la tarde?', unit: n => n ? `${n} tienda${n > 1 ? 's' : ''}` : 'Ninguna', max: 4, r: [['Ventas de la semana', n => `+${[0, 2, 4, 5, 7][n]} %`], ['Horas de equipo', n => `+${n * 4} h`], ['Margen', n => `+${[0, 1.4, 2.6, 3.1, 3.9][n].toLocaleString('es-ES')} %`]] },
      { t: 'Fábrica', q: '¿Y si añado un turno de noche?', unit: n => n ? `${n} línea${n > 1 ? 's' : ''}` : 'Ninguna', max: 3, r: [['Producción', n => `+${[0, 18, 34, 47][n]} %`], ['Pedidos a tiempo', n => `${[86, 92, 96, 97][n]} %`], ['Coste por unidad', n => `${['0', '−3', '−5', '−4'][n]} %`]] },
      { t: 'Clínicas', q: '¿Y si alargo el horario de tarde?', unit: n => n ? `+${n} h al día` : 'Igual', max: 3, r: [['Citas a la semana', n => `+${[0, 42, 80, 104][n]}`], ['Lista de espera', n => `${['0', '−35', '−60', '−70'][n]} %`], ['Ocupación', n => `${[94, 91, 88, 82][n]} %`]] },
      { t: 'Flota', q: '¿Y si añado vehículos?', unit: n => n ? `+${n} vehículo${n > 1 ? 's' : ''}` : 'Igual', max: 4, r: [['Entregas a tiempo', n => `${[88, 91, 94, 96, 97][n]} %`], ['Horas extra', n => `${['0', '−11', '−22', '−31', '−38'][n]} %`], ['Uso de la flota', n => `${[92, 88, 84, 80, 77][n]} %`]] }
    ];
    let cur = 0;
    const draw = () => { const s = SC[cur], n = +sim.value; out.textContent = s.unit(n); res.innerHTML = s.r.map(([l, f]) => `<div><small>${l}</small><b>${f(n)}</b></div>`).join(''); };
    SC.forEach((s, k) => { const b = document.createElement('button'); b.type = 'button'; b.role = 'tab'; b.textContent = s.t; b.setAttribute('aria-selected', k === 0); b.addEventListener('click', () => { cur = k; $$('button', tabs).forEach((x, i) => x.setAttribute('aria-selected', i === k)); q.textContent = s.q; sim.max = s.max; sim.value = Math.min(2, s.max); draw(); }); tabs.appendChild(b); });
    sim.addEventListener('input', draw); q.textContent = SC[0].q; sim.max = SC[0].max; draw();
  }
})();

/* =============== sectores: pestañas y maqueta 3D =============== */
(function sectors() {
  const tabs = $('#e3Tabs'), panel = $('#e3Panel'), canvas = $('#e3Diorama'); if (!tabs || !panel) return;
  SECTORS.forEach((s, k) => {
    const b = document.createElement('button'); b.className = 'e3-tab'; b.type = 'button'; b.role = 'tab'; b.id = 'tab-' + s.id;
    b.setAttribute('aria-selected', k === 0); b.setAttribute('aria-controls', 'e3Panel'); b.innerHTML = `<small>${String(k + 1).padStart(2, '0')}</small>${esc(s.tab)}`;
    b.addEventListener('click', () => select(k)); tabs.appendChild(b);
  });
  tabs.addEventListener('keydown', e => { if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return; const cur = [...tabs.children].findIndex(b => b.getAttribute('aria-selected') === 'true'), n = (cur + (e.key === 'ArrowRight' ? 1 : -1) + SECTORS.length) % SECTORS.length; select(n); tabs.children[n].focus(); });

  let st = null, holder, cur = null, next = null, swapT = 1, drag = 0, dragV = 0, camR = 50, camY = 5, tR = 50, tY = 5;
  const CAM = { oficina: [60, 8.2], obras: [60, 7.6], hoteles: [54, 5.6], energia: [54, 5.4], fabrica: [50, 4.4], software: [46, 4.4] };
  if (canvas) {
    try { st = new Stage(canvas, { dpr: small ? 1.25 : 1.5, fov: 30, shadows: true, shadowSize: 20, shadowMap: small ? 1024 : 2048, reflect: !small, bloom: .6, bloomR: .7, bloomT: 1.05, focus: .46, blur: 2.5, hemi: .95, keyI: 2.9, rimI: 2.2 }); } catch (e) { st = null; }
    if (st) {
      st.scene.fog = new THREE.FogExp2(P.fog, .009); st.sky(0x000306, 0x08303f); st.floor(170, { cell: 5, grid: .03, strength: .5 });
      holder = new THREE.Group(); holder.position.y = .5; st.scene.add(holder);
      const under = new THREE.Mesh(new THREE.PlaneGeometry(56, 56), new THREE.MeshBasicMaterial({ map: softTex, color: new THREE.Color(0x1a8fb0).multiplyScalar(.3), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })); under.rotation.x = -PI / 2; under.position.y = .04; st.scene.add(under);
      let down = false, lx = 0; const el = canvas.parentElement;
      el.addEventListener('pointerdown', e => { down = true; lx = e.clientX; el.classList.add('is-drag'); });
      addEventListener('pointerup', () => { down = false; el.classList.remove('is-drag'); });
      addEventListener('pointermove', e => { if (!down) return; dragV = (e.clientX - lx) * .006; drag += dragV; lx = e.clientX; });
    }
  }
  function select(k) {
    [...tabs.children].forEach((b, i) => b.setAttribute('aria-selected', i === k));
    const s = SECTORS[k];
    panel.classList.remove('is-swap'); void panel.offsetWidth; panel.classList.add('is-swap');
    panel.setAttribute('aria-labelledby', 'tab-' + s.id);
    panel.innerHTML = `<h3>${esc(s.title)}</h3><p>${esc(s.intro)}</p>
      <div><h4>Qué ves en 3D</h4><ul>${s.ve.map(v => `<li>${esc(v)}</li>`).join('')}</ul></div>
      <div><h4>Agentes que trabajan</h4><div class="e3-agentchips">${s.agentes.map(a => `<span>Agente de ${esc(a.charAt(0).toLowerCase() + a.slice(1))}</span>`).join('')}</div></div>
      <div><h4>De dónde salen los datos</h4><div class="e3-datachips">${s.datos.map(d => `<span>${esc(d)}</span>`).join('')}</div></div>
      ${s.demo ? `<a class="btn btn--grad btn--sm" href="${esc(s.demo)}">Ver la demo de ${esc(s.tab.toLowerCase())}</a>` : `<a class="btn btn--ghost btn--sm" href="#contacto">Pide la demo de ${esc(s.tab.toLowerCase())}</a>`}`;
    if (!st) return;
    if (next) { holder.remove(next); dispose(next); }
    next = buildLot(s.id); next.scale.setScalar(.001); holder.add(next); swapT = cur ? 0 : .5;
    [tR, tY] = CAM[s.id] || [48, 3.4]; st.collect();
  }
  select(0);
  if (!st) return;
  camR = tR; camY = tY;
  const ease = x => 1 - Math.pow(1 - x, 3);
  const frame = (t, dt) => {
    if (next) {
      swapT = Math.min(1, swapT + dt / .8);
      if (cur) { const o = ease(Math.min(1, swapT * 2)); cur.scale.setScalar(Math.max(.001, 1 - o)); cur.position.y = -o * 3; }
      const i = ease(clamp(swapT * 2 - 1)); next.scale.setScalar(Math.max(.001, i)); next.position.y = (1 - i) * 5;
      if (swapT >= 1) { if (cur) { holder.remove(cur); dispose(cur); } cur = next; next = null; cur.scale.setScalar(1); cur.position.y = 0; st.collect(); }
    }
    dragV *= .92; drag += dragV * .2; camR += (tR - camR) * .06; camY += (tY - camY) * .06;
    const a = .62 + (reduce ? 0 : Math.sin(t * .22) * .5) + drag, k = st.h > st.w * 1.15 ? 1.2 : 1;
    st.camera.position.set(Math.sin(a) * camR * k, camR * k * .5, Math.cos(a) * camR * k); st.camera.lookAt(0, camY, 0);
    [cur, next].forEach(g => g && g.userData.tick && g.userData.tick(t, dt));
    st.render(t);
  };
  if (reduce) { frame(6, 1); return; }
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
