/* NexGent · escenas 3D (Three.js) */
import * as THREE from '../vendor/three.module.min.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = matchMedia('(max-width: 900px)').matches;
const DPR = Math.min(devicePixelRatio || 1, small ? 1.5 : 2);

const NOISE = `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}`;

function fibSphere(n, r = 1) {
  const a = new Float32Array(n * 3), g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2, rad = Math.sqrt(1 - y * y), t = g * i;
    a[i * 3] = Math.cos(t) * rad * r; a[i * 3 + 1] = y * r; a[i * 3 + 2] = Math.sin(t) * rad * r;
  }
  return a;
}
// Sin GPU (render por software): mismas escenas, menos fotogramas para no bloquear el hilo principal
function softGL(renderer) {
  try { const gl = renderer.getContext(), ext = gl.getExtension('WEBGL_debug_renderer_info');
    return /swiftshader|llvmpipe|softpipe|software/i.test(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)); }
  catch (e) { return false; }
}
function visible(el, cb) {
  const io = new IntersectionObserver(([e]) => cb(e.isIntersecting), { rootMargin: '100px' });
  io.observe(el);
}

/* ================= HERO ORB ================= */
(function hero() {
  const canvas = document.getElementById('heroCanvas'); if (!canvas) return;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }); }
  catch (e) { return; }
  renderer.setPixelRatio(DPR);
  const minDt = softGL(renderer) ? 100 : 0; let last = 0;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, .1, 100);
  camera.position.set(0, 0, 7.2);
  const group = new THREE.Group(); scene.add(group);

  const N = small ? 9000 : 22000;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(fibSphere(N, 1.75), 3));
  const rnd = new Float32Array(N); for (let i = 0; i < N; i++) rnd[i] = Math.random();
  geo.setAttribute('aRnd', new THREE.BufferAttribute(rnd, 1));
  const uniforms = { uTime: { value: 0 }, uScroll: { value: 0 }, uPR: { value: DPR }, uMouse: { value: new THREE.Vector2() } };
  const mat = new THREE.ShaderMaterial({
    uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: NOISE + `
      uniform float uTime,uScroll,uPR; attribute float aRnd; varying float vN; varying float vA; varying vec3 vP;
      void main(){
        vec3 n=normalize(position);
        float t=uTime*.25;
        float d=snoise(n*1.4+vec3(t,t*.7,-t*.5));
        float d2=snoise(n*4.0-vec3(t*1.3));
        vN=d;
        vec3 p=position*(1.0+d*.16+d2*.035);
        p+=n*uScroll*(1.5+aRnd*3.5);
        p.y+=sin(uTime*.6+aRnd*6.28)*.015;
        vP=p;
        vec4 mv=modelViewMatrix*vec4(p,1.);
        gl_Position=projectionMatrix*mv;
        gl_PointSize=(1.4+aRnd*1.8+max(d,0.)*2.2)*uPR*(6.5/-mv.z);
        vA=smoothstep(-1.5,1.2,p.z)*(1.0-uScroll*.7);
      }`,
    fragmentShader: `
      varying float vN; varying float vA; varying vec3 vP;
      void main(){
        vec2 c=gl_PointCoord-.5; float r=length(c); if(r>.5) discard;
        float a=smoothstep(.5,.0,r);
        vec3 c1=vec3(.72,.93,.95), c2=vec3(.37,.76,.84), c3=vec3(.23,.51,.96);
        float k=clamp(vP.y*.32+.5+vN*.25,0.,1.);
        vec3 col=mix(mix(c1,c2,smoothstep(0.,.5,k)),c3,smoothstep(.5,1.,k));
        col+=vec3(1.)*max(vN-.35,0.)*.9;
        gl_FragColor=vec4(col,a*vA*.85);
      }`
  });
  const points = new THREE.Points(geo, mat); group.add(points);

  // inner glow
  const glowMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.BackSide, uniforms: { uScroll: uniforms.uScroll },
    vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }`,
    fragmentShader: `uniform float uScroll; varying vec3 vN; varying vec3 vV; void main(){ float f=pow(1.-abs(dot(vN,vV)),2.2); gl_FragColor=vec4(vec3(.3,.7,.85)*f,f*.55*(1.-uScroll)); }`
  });
  const glow = new THREE.Mesh(new THREE.SphereGeometry(2.25, 64, 64), glowMat); group.add(glow);

  // orbit rings with travelling "messages"
  const rings = [];
  [[2.55, .9, 0.0], [2.95, -.5, 1.2], [3.35, .25, 2.4]].forEach(([r, tilt, rot], idx) => {
    const M = 420, pos = new Float32Array(M * 3), u = new Float32Array(M);
    for (let i = 0; i < M; i++) { const a = i / M * Math.PI * 2; pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = 0; pos[i * 3 + 2] = Math.sin(a) * r; u[i] = i / M; }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aU', new THREE.BufferAttribute(u, 1));
    const m = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: uniforms.uTime, uScroll: uniforms.uScroll, uPR: uniforms.uPR, uOff: { value: idx * .33 }, uSpeed: { value: .05 + idx * .02 } },
      vertexShader: `uniform float uTime,uPR,uOff,uSpeed,uScroll; attribute float aU; varying float vG; varying float vZ;
        void main(){ float h=fract(aU-uTime*uSpeed-uOff); float h2=fract(aU-uTime*uSpeed-uOff-.5);
          vG=pow(1.-min(h,1.-h)*2.,0.)*0.+smoothstep(.04,0.,h)+smoothstep(.04,0.,h2);
          vec4 mv=modelViewMatrix*vec4(position*(1.+uScroll*.8),1.); vZ=mv.z; gl_Position=projectionMatrix*mv;
          gl_PointSize=(1.2+vG*5.)*uPR; }`,
      fragmentShader: `uniform float uScroll; varying float vG; varying float vZ; void main(){ vec2 c=gl_PointCoord-.5; if(length(c)>.5) discard;
          vec3 col=mix(vec3(.35,.6,.75),vec3(.72,.95,.98),vG); gl_FragColor=vec4(col,(.18+vG*.9)*(1.-uScroll)); }`
    });
    const ring = new THREE.Points(g, m); ring.rotation.set(tilt, rot, tilt * .4);
    group.add(ring); rings.push(ring);
  });

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    const s = w < 700 ? .62 : 1; group.scale.setScalar(s); group.position.y = w < 700 ? -.25 : 0;
  }
  resize(); addEventListener('resize', resize);

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', e => { mouse.tx = (e.clientX / innerWidth - .5); mouse.ty = (e.clientY / innerHeight - .5); }, { passive: true });

  let on = true, t0 = performance.now();
  visible(canvas, v => { const was = on; on = v; if (on && !was) loop(); });
  function loop() {
    if (!on) return;
    const now = performance.now();
    if (minDt && !reduce && now - last < minDt) { requestAnimationFrame(loop); return; } last = now;
    const t = (now - t0) / 1000;
    uniforms.uTime.value = reduce ? 4 : t;
    const sp = Math.min(1, Math.max(0, scrollY / (innerHeight * .9)));
    uniforms.uScroll.value += (sp - uniforms.uScroll.value) * .12;
    mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05;
    group.rotation.y = t * .06 + mouse.x * .6;
    group.rotation.x = mouse.y * .4;
    rings.forEach((r, i) => r.rotation.y += reduce ? 0 : .0015 * (i + 1));
    camera.position.z = 7.2 - uniforms.uScroll.value * 1.5;
    renderer.render(scene, camera);
    if (!reduce) requestAnimationFrame(loop);
  }
  loop();
})();

/* ================= GLOBE ================= */
const LAND = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAX/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//+f//3sYAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAP9/n/////gAAAaEAZYAAAeAAAAAAAAAAAAAAAAAGn98f////8AAAPwAAAAAAAAcAAAAAAAAAAAAAADgAAOgP/////AAADAAAAAAAAAMAAAAAAAAAAAAAAA9xhhAAH///+AAAAAAAAHgAAP/8AA/AAAAAAAAAAdAAAAAAB///8AAAAAAAAYAAD//oAAAAAAAAAAAAAe8x63IAB///IAAAAAAABgDA/////wAAAAAwAEAAAA/wMf/gAf//oAAAAAAAAgHT/////z/+AABAB//wPI/+sEn4Bv//wAAAA/8AAAHf////////+D8wH/////1Q3mF4AP/4AAAAB//xif7v////////////A////////+B/gf/gAAAAH/94///f///////////GH////////wP5Af4AH4AAPx+H///////////////AAf//////9Nh+AP4ADAAA/3////////////////+AD///////8COMAHwAAAAD/P////////////////4AB/7/////4APwAAgAAAAD/P//////////////wfAAA+AH////4APzAAAAAAAH/D////////////+RhgAAAFAB////8AH/gAAAAAIAOj////////////4AHgAAAQAAv////gX/gAAAAAMBmP////////////wAPgAACAAAX////+f/4AAAAAyAwf////////////AAPAAAAAAAD////+f/uAAAAB3D//////////////8AOAAAAAAAB/////f/8AAAABHn//////////////9AIAAAAAAAB//////8wAAAAAMf//////////////9AQAAAAAAAAf/////2HAAAAAB///////////////4AAAAAAAAAAf/////+AgAAAAD///////////////4AAAAAAAAAAf//////QAAAAAB///yf//////////wAAAAAAAAAAf/////yAAAAAAB/z/gP//////////jAAAAAAAAAAf/////gAAAAAA/wY/gD/////////8HAAAAAAAAAAf////+AAAAAAA/gGfnn/////////wAAAAAAAAAAAf////+AAAAAAA/AAZ//////////1gGAAAAAAAAAAP////8AAAAAAA/ACM//////////hwEAAAAAAAAAAH////4AAAAAAAMLgAX/////////4wcAAAAAAAAAAH////4AAAAAAAN/gDC/////////wz8AAAAAAAAAAB////gAAAAAAAf/gAA/////////wLgAAAAAAAAAAA////AAAAAAAA//8YB/////////4EAAAAAAAAAAAAX///AAAAAAAB///f//////////4AAAAAAAAAAAAAf/5hAAAAAAAB//////z///////4AAAAAAAAAAAAAb/gBAAAAAAAH////8/5///////wAAAAAAAAAAAAAF/gBgAAAAAAP////+/4P//////wAAAAAAAAAAAAAE/gAAAAAAAAP////+f8wH/////gAAAAAAAAAAAAAAfgAAAAAAAAf/////P/4D/////IAAAAAAAAAAAAAAPgAQAAAAAAf/////v/8D//f/wAAAAAAAAAAAAAAAPgwOAAAAAAf/////n/4A/8P+AAAAAAAAAAAAAAAAHxwAwAAAAAf/////n/wAfwP8wAAAAAAAAAAAAAAAB/gAAAAAAAf/////z/gAfgH+AMAAAAAAAAAAAAAAAT8AAAAAAAf/////z+AAfAB/AIAAAAAAAAAAAAAAAB+AAAAAAAf/////94AAOAB/gIAAAAAAAAAAAAAAAAMAAAAAAAf//////AAAOAA/gAAAAAAAAAAAAAAAAAEBQAAAAAf/////+MAAGABHgHAAAAAAAAAAAAAAAACDfgAAAAH//////8AAHAACAAAAAAAAAAAAAAAAAABP/wAAAAH//////4AAFAAgADAAAAAAAAAAAAAAAAAP/4AAAAD//////4AABgAQABAAAAAAAAAAAAAAAAAP//gAAAA+D////wAAAAGYBwAAAAAAAAAAAAAAAAAH//wAAAAAA////wAAAADYDgAAAAAAAAAAAAAAAAAP//wAAAAAAf///AAAAABoPgQAAAAAAAAAAAAAAAAf//4AAAAAA///+AAAAAA0/OAAAAAAAAAAAAAAAAA///+AAAAAA///8AAAAAAYfASgAAAAAAAAAAAAAAA////AAAAAA///4AAAAAA8fYCYAAAAAAAAAAAAAAA////8AAAAAf//4AAAAAAODEj/AAAAAAAAAAAAAAA/////AAAAAP//wAAAAAAGAAAPgAAAAAAAAAAAAAAf////gAAAAP//wAAAAAADAABPwAAAAAAAAAAAAAAf////gAAAAH//wAAAAAAAOiAPYAAAAAAAAAAAAAAP////AAAAAH//wAAAAAAAASAAOCAAAAAAAAAAAAAP///+AAAAAH//4AAAAAAAAAEAAAAAAAAAAAAAAAAH///+AAAAAH//4AAAAAAAAAHhAAAAAAAAAAAAAAAH///8AAAAAP//4IAAAAAAAAvjAAAAAAAAAAAAAAAD///8AAAAAP//4cAAAAAAAB/jgAAAAAAAAAAAAAAA///8AAAAAP//h4AAAAAAAH/7gAAAAAAAAAAAAAAAf//4AAAAAP//B4AAAAAAAH//wAAAAAAAAAAAAAAAf//4AAAAAH/+AwIAAAAAAf//4AAAAAAAAAAAAAAAf//4AAAAAH//BwAAAAAAB///8AIAAAAAAAAAAAAAf//AAAAAAD//BwAAAAAAD///+AAAAAAAAAAAAAAAf/8AAAAAAD/+BgAAAAAAD////AAAAAAAAAAAAAAAf/4AAAAAAD/8AAAAAAAAH////AAAAAAAAAAAAAAAf/8AAAAAAD/8AAAAAAAAD////AAAAAAAAAAAAAAA//4AAAAAAB/4AAAAAAAAB////AAAAAAAAAAAAAAA//wAAAAAAA/wAAAAAAAAB////AAAAAAAAAAAAAAA//gAAAAAAA/gAAAAAAAAB/h//AAAAAAAAAAAAAAA//AAAAAAAA/AAAAAAAAAB8Av+AAAAAAAAAAAAAAA/8AAAAAAAAAAAAAAAAAAAAAP8AAQAAAAAAAAAAAB/8AAAAAAAAAAAAAAAAAAAAAH8AAIAAAAAAAAAAAB/4AAAAAAAAAAAAAAAAAAAAADQAAOAAAAAAAAAAAB/gAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAB+AAAAAAAAAAAAAAAAAAAAAAA4AAIAAAAAAAAAAAB/AAAAAAAAAAAAAAAAAAAAAAAYAAwIAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAPwAAA//eDn8AAAAAAAAAAAAAAAACAAAAAAAAAAAD//+B///////wAAAAAAAAAAAAAAA/AAAAAAAACADv//8f////////+AAAAAAAAAAAAAB/gAAAABQ///////8//////////8AAAAAAAAABAAAHwAAAAH///////////////////+AAAAAAAcUD////gAAAAP///////////////////wAAAAA////////+AAAAP////////////////////AAAAHB///////4AAAAP/////////////////////gAAAD///////8wIAHA//////////////////////gAAAAP///////4AA/gD////////////////////8AAAAA/////////+AAP//////////////////////AAAAP//////////H////////////////////////8A/wD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////';
(function globe() {
  const canvas = document.getElementById('globeCanvas'); if (!canvas) return;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { return; }
  renderer.setPixelRatio(DPR);
  const minDt = softGL(renderer) ? 100 : 0; let last = 0;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 100); camera.position.set(0, 0, 6.4);
  const tilt = new THREE.Group(), spin = new THREE.Group(); tilt.add(spin); scene.add(tilt);
  const DEG = Math.PI / 180, R = 1.6;
  const L0 = -38, LAT0 = 16;
  tilt.rotation.x = LAT0 * DEG;
  const baseY = -(L0 + 90) * DEG;

  // land mask decode (1.5° grid, 120 x 240)
  const raw = atob(LAND); const bytes = new Uint8Array(raw.length); for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  const isLand = (lat, lon) => {
    const r = Math.min(119, Math.max(0, Math.floor((90 - lat) / 1.5))), c = Math.min(239, Math.max(0, Math.floor((lon + 180) / 1.5)));
    const idx = r * 240 + c; return (bytes[idx >> 3] >> (7 - (idx & 7))) & 1;
  };
  const toV = (lat, lon, r = R) => {
    const phi = (90 - lat) * DEG, th = (lon + 180) * DEG;
    return new THREE.Vector3(-Math.sin(phi) * Math.cos(th) * r, Math.cos(phi) * r, Math.sin(phi) * Math.sin(th) * r);
  };
  const inSpain = (lat, lon) => lat > 36 && lat < 43.8 && lon > -9.4 && lon < 3.3;

  // dots
  const N = small ? 26000 : 52000; const fib = fibSphere(N, 1);
  const pos = [], hl = [];
  for (let i = 0; i < N; i++) {
    const x = fib[i * 3], y = fib[i * 3 + 1], z = fib[i * 3 + 2];
    const lat = Math.asin(y) / DEG; const lon = Math.atan2(z, -x) / DEG - 180;
    const L = lon < -180 ? lon + 360 : lon;
    if (!isLand(lat, L)) continue;
    pos.push(x * R, y * R, z * R); hl.push(inSpain(lat, L) ? 1 : 0);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aH', new THREE.Float32BufferAttribute(hl, 1));
  const uT = { value: 0 };
  const dots = new THREE.Points(g, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, uniforms: { uTime: uT, uPR: { value: DPR } },
    vertexShader: `uniform float uTime,uPR; attribute float aH; varying float vH; varying float vF;
      void main(){ vH=aH; vec4 mv=modelViewMatrix*vec4(position,1.); vec3 n=normalize(normalMatrix*position); vF=clamp(dot(n,vec3(0.,0.,1.)),0.,1.);
        gl_Position=projectionMatrix*mv; gl_PointSize=(aH>.5?3.2+sin(uTime*3.+position.x*20.)*.8:2.0)*uPR; }`,
    fragmentShader: `varying float vH; varying float vF; void main(){ vec2 c=gl_PointCoord-.5; if(length(c)>.5) discard;
      vec3 base=vec3(.38,.52,.62); vec3 hi=vec3(.6,.92,.96); vec3 col=mix(base,hi,vH);
      float a=(.25+vF*.75)*(vH>.5?1.:.75); gl_FragColor=vec4(col,a); }`
  }));
  spin.add(dots);

  // dark core to hide back side
  const core = new THREE.Mesh(new THREE.SphereGeometry(R * .985, 64, 64), new THREE.MeshBasicMaterial({ color: 0x030308 }));
  spin.add(core);
  // atmosphere
  const atm = new THREE.Mesh(new THREE.SphereGeometry(R * 1.18, 64, 64), new THREE.ShaderMaterial({
    transparent: true, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `varying vec3 vN; void main(){ vN=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: `varying vec3 vN; void main(){ float i=pow(.72-dot(vN,vec3(0.,0.,1.)),3.); gl_FragColor=vec4(vec3(.3,.7,.85)*i*1.6,i); }`
  }));
  scene.add(atm);

  // arcs Spain -> LATAM (ilustrativo)
  const from = [40.4, -3.7];
  const dests = [[19.4, -99.1], [4.7, -74.1], [-12.0, -77.0], [-33.4, -70.6], [-34.6, -58.4], [10.5, -66.9], [18.5, -69.9], [9.0, -79.5]];
  const arcs = [];
  dests.forEach((d, i) => {
    const a = toV(...from), b = toV(...d);
    const mid = a.clone().add(b).multiplyScalar(.5); const dist = a.distanceTo(b);
    mid.normalize().multiplyScalar(R + dist * .42);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const P = 120, pts = curve.getPoints(P), us = new Float32Array(P + 1);
    for (let k = 0; k <= P; k++) us[k] = k / P;
    const geo = new THREE.BufferGeometry().setFromPoints(pts); geo.setAttribute('aU', new THREE.BufferAttribute(us, 1));
    const m = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uP: { value: 0 } },
      vertexShader: `attribute float aU; varying float vU; void main(){ vU=aU; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
      fragmentShader: `uniform float uP; varying float vU; void main(){ float head=uP; float tail=uP-.45;
        float a=smoothstep(tail,head,vU)*step(vU,head); vec3 col=mix(vec3(.72,.93,.95),vec3(.23,.51,.96),vU);
        gl_FragColor=vec4(col,a*.95); }`
    });
    const line = new THREE.Line(geo, m); spin.add(line);
    // landing pulse
    const ringG = new THREE.RingGeometry(.02, .035, 32);
    const ring = new THREE.Mesh(ringG, new THREE.MeshBasicMaterial({ color: 0x6fcad8, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }));
    ring.position.copy(b.clone().multiplyScalar(1.003)); ring.lookAt(b.clone().multiplyScalar(2)); spin.add(ring);
    arcs.push({ m, ring, delay: i * .55 });
  });
  // Spain beacon
  const beacon = new THREE.Mesh(new THREE.RingGeometry(.03, .05, 32), new THREE.MeshBasicMaterial({ color: 0xb8eef2, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
  const sv = toV(...from); beacon.position.copy(sv.clone().multiplyScalar(1.004)); beacon.lookAt(sv.clone().multiplyScalar(2)); spin.add(beacon);

  function resize() { const w = canvas.clientWidth, h = canvas.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  resize(); addEventListener('resize', resize);

  // drag to rotate
  let drag = null, offY = 0, velY = 0;
  canvas.addEventListener('pointerdown', e => { drag = e.clientX; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e => { if (drag === null) return; const dx = e.clientX - drag; drag = e.clientX; velY = dx * .005; offY += velY; });
  canvas.addEventListener('pointerup', () => drag = null);
  canvas.style.cursor = 'grab'; canvas.style.touchAction = 'pan-y';

  let on = false; const t0 = performance.now();
  visible(canvas, v => { const was = on; on = v; if (on && !was) loop(); });
  function loop() {
    if (!on) return;
    const now = performance.now();
    if (minDt && !reduce && now - last < minDt) { requestAnimationFrame(loop); return; } last = now;
    const t = (now - t0) / 1000; uT.value = t;
    if (drag === null) { velY *= .94; offY += velY; offY *= .985; }
    spin.rotation.y = baseY + (reduce ? 0 : Math.sin(t * .15) * .35) + offY;
    const cycle = 6.5;
    arcs.forEach(a => {
      const p = ((t - a.delay) % cycle + cycle) % cycle / 2.2; // 0..~3
      a.m.uniforms.uP.value = reduce ? 1.0 : Math.min(p, 1.45);
      const land = p - 1; const op = land > 0 && land < .6 ? 1 - land / .6 : 0;
      a.ring.material.opacity = op; a.ring.scale.setScalar(1 + Math.max(land, 0) * 6);
    });
    const bp = (t % 2) / 2; beacon.scale.setScalar(1 + bp * 3); beacon.material.opacity = 1 - bp;
    renderer.render(scene, camera);
    if (!reduce) requestAnimationFrame(loop);
  }
  if (reduce) { on = true; loop(); on = false; }
})();

