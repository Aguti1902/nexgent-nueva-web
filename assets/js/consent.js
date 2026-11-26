/* Aviso de cookies de NexGent + Google Consent Mode v2. Analytics solo mide si el visitante acepta. */
(function(){
  var KEY="ng_consent_v1";
  function get(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function set(v){try{localStorage.setItem(KEY,v)}catch(e){}}
  function apply(v){
    var g=v==="granted"?"granted":"denied";
    window.gtag&&gtag("consent","update",{analytics_storage:g,ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
    (window.dataLayer=window.dataLayer||[]).push({event:"ng_consent",ng_consent:g});
  }
  function css(){
    if(document.getElementById("ngc-css"))return;
    var s=document.createElement("style");s.id="ngc-css";
    s.textContent=".ngc{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;background:rgba(18,18,20,.92);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);color:#f5f5f7;border:1px solid rgba(255,255,255,.12);border-radius:22px;padding:18px 20px;box-shadow:0 20px 60px -20px rgba(0,0,0,.6);font:15px/1.45 Inter,-apple-system,system-ui,sans-serif;transform:translateY(20px);opacity:0;transition:transform .5s cubic-bezier(.22,1,.36,1),opacity .4s}"+
    ".ngc.on{transform:none;opacity:1}.ngc p{margin:0 0 14px}.ngc a{color:#82cbd6}.ngc__b{display:flex;gap:10px;flex-wrap:wrap}"+
    ".ngc button{height:40px;padding:0 18px;border-radius:999px;border:0;cursor:pointer;font:600 14px Inter,-apple-system,system-ui,sans-serif}"+
    ".ngc__ok{background:linear-gradient(100deg,#b8eef2 0%,#6fcad8 40%,#3b82f6 100%);color:#05050a}.ngc__no{background:rgba(255,255,255,.08);color:#fff;box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)}"+
    "@media (max-width:600px){.ngc{left:10px;right:10px;bottom:10px;padding:14px 16px;border-radius:18px;font-size:13px;line-height:1.4}.ngc p{margin:0 0 10px}.ngc button{height:36px;padding:0 16px;font-size:13.5px;flex:1}}"+
    "@media (prefers-reduced-motion:reduce){.ngc{transition:none}}";
    document.head.appendChild(s);
  }
  function show(){
    css();
    var old=document.querySelector(".ngc");if(old)old.remove();
    var d=document.createElement("div");d.className="ngc";d.setAttribute("role","dialog");d.setAttribute("aria-live","polite");d.setAttribute("aria-label","Aviso de cookies");
    d.innerHTML='<p>Usamos cookies de analítica (Google Analytics) para saber cómo se usa la web y mejorarla. Solo se activan si las aceptas. <a href="/legal#cookies">Más información</a></p><div class="ngc__b"><button type="button" class="ngc__ok">Aceptar</button><button type="button" class="ngc__no">Rechazar</button></div>';
    document.body.appendChild(d);
    requestAnimationFrame(function(){d.classList.add("on")});
    function done(v){set(v);apply(v);d.classList.remove("on");setTimeout(function(){d.remove()},400)}
    d.querySelector(".ngc__ok").onclick=function(){done("granted")};
    d.querySelector(".ngc__no").onclick=function(){done("denied")};
  }
  window.nexgentCookies=show;
  var v=get();
  if(v==="granted"||v==="denied"){apply(v)}
  else if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",show)}else{show()}
})();
