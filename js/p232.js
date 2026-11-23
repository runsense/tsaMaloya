// ===== p232 : des fondus partout, et plus lents quand c'est important ; la caméra du camp glisse au lieu de sauter =====
(function(){const st=document.createElement('style');st.textContent=`
@keyframes fi232{from{opacity:0;filter:blur(4px) brightness(1.15)}60%{filter:blur(0) brightness(1.04)}to{opacity:1;filter:none}}
@keyframes fiDoux232{from{opacity:0}to{opacity:1}}
#modal:not([hidden]){animation:fi232 var(--d232,.5s) cubic-bezier(.2,.7,.2,1)}
#ecran:not([hidden]){animation:fiDoux232 .45s ease-out}
#campV:not([hidden]),#campV.on{animation:fiDoux232 .6s ease-out}
.toast,#toast,#casc147,#fic208l>*,.pap230{animation:fiDoux232 .35s ease-out}
.pap230{animation-duration:.7s}`;document.head.appendChild(st)})();
// l'importance d'un événement règle la durée du fondu : les grands moments (cyclone, éruption, abolition, guerre, révolte, mort, naissance…) arrivent lentement
const IMP232=/cyclone|éruption|volcan|abolition|guerre|révolte|insurrection|massacre|mort|meurt|naissance|naît|épidémie|choléra|variole|famine|incendie|débarqu|fondation|indépendance|départementalisation|traite|esclavage/i;
{const m0=modal;modal=function(){const m=$('modal');const vis0=m&&!m.hidden,ti0=m&&m.querySelector('h1,h2')?m.querySelector('h1,h2').textContent:'';const r=m0.apply(this,arguments);
 try{if(!m||m.hidden)return r;const h=m.querySelector('h1,h2'),ti=h?h.textContent:'',txt=m.textContent.slice(0,600);if(vis0&&ti===ti0)return r;
  const d=IMP232.test(ti)?1.3:IMP232.test(txt)?.85:.5;m.style.setProperty('--d232',d+'s');m.style.animation='none';void m.offsetWidth;m.style.animation=''}catch(e){}return r}}
// la caméra du camp : on glisse de la carte au camp (et retour) au lieu de sauter
const TW232={c:null};
function glisse232(to,ms){try{TW232.c={t0:performance.now(),ms:ms||900,a:{x:camT.x,y:camT.y,z:camT.z,d:dist,p:pol},b:to}}catch(e){}}
if(typeof cm128Cadre==='function'){const cc=cm128Cadre;cm128Cadre=function(){const a={x:camT.x,y:camT.y,z:camT.z,d:dist,p:pol};const r=cc.apply(this,arguments);
 try{const b={x:camT.x,y:camT.y,z:camT.z,d:dist,p:pol};camT.set(a.x,a.y,a.z);dist=a.d;pol=a.p;glisse232(b,1000)}catch(e){}return r}}
{const cf=cvFermer;cvFermer=function(){const was=typeof CV!=='undefined'&&CV.on,a={x:camT.x,y:camT.y,z:camT.z,d:dist,p:pol};const r=cf.apply(this,arguments);
 try{if(was&&window.CAMPMAP128){const b={x:camT.x,y:camT.y,z:camT.z,d:dist,p:pol};camT.set(a.x,a.y,a.z);dist=a.d;pol=a.p;glisse232(b,900)}}catch(e){}return r}}
{const b0=bat;bat=function(){try{const c=TW232.c;if(c){let u=(performance.now()-c.t0)/c.ms;if(u>=1){u=1;TW232.c=null}const e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2,L=(a,b)=>a+(b-a)*e;
   if(typeof camGo!=='undefined')camGo=null;camT.set(L(c.a.x,c.b.x),L(c.a.y,c.b.y),L(c.a.z,c.b.z));
   // un seul mouvement continu, sans recul ni rezoom
   dist=L(c.a.d,c.b.d);pol=L(c.a.p,c.b.p)}}catch(e){}return b0.apply(this,arguments)}}
