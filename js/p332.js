// ===== p332 : entrer dans un jeu, c'est y descendre. Depuis la carte, la caméra plonge vers le lieu (elle s'approche, s'abaisse
// vers l'horizon et tourne un peu), la brume monte, et l'on sort de la brume déjà dedans : dans la chasse, dans le camp, dans
// la marche d'un personnage. Hors de la carte (menu, petits jeux), on passe par la brume seule. =====
let PL332=0;
function brume332(){let d=$('pl332');if(!d){d=document.createElement('div');d.id='pl332';d.style.cssText='position:fixed;inset:0;z-index:99990;pointer-events:none;opacity:0;background:radial-gradient(ellipse at 50% 60%,rgba(236,232,220,.96) 0%,rgba(205,212,205,.97) 45%,rgba(120,135,130,.98) 100%);transition:none';document.body.appendChild(d)}return d}
function anime332(ms,f,fin){const t0=performance.now();const pas=()=>{const k=Math.min(1,(performance.now()-t0)/ms);f(k);if(k<1)requestAnimationFrame(pas);else fin&&fin()};requestAnimationFrame(pas)}
const ease332=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
function sortie332(){const d=brume332();anime332(1100,k=>{d.style.opacity=String(1-ease332(k))},()=>{d.style.opacity='0';PL332=0})}
function plonge332(x,z,go){if(PL332)return go();const surCarte=!!(S&&$('ecran')&&$('ecran').hidden&&typeof camT!=='undefined'&&!(typeof CV!=='undefined'&&CV.on)&&x!=null);PL332=1;const d=brume332();
 if(!surCarte){anime332(520,k=>{d.style.opacity=String(ease332(k))},()=>{try{go()}catch(e){console.warn(e)}setTimeout(sortie332,120)});return}
 const t0={x:camT.x,y:camT.y,z:camT.z,dist,pol,az},y1=alt(x,z)*VX;try{auto=false}catch(e){}
 anime332(1500,k=>{const e=ease332(k);camT.set(t0.x+(x-t0.x)*e,t0.y+(y1-t0.y)*e,t0.z+(z-t0.z)*e);dist=t0.dist+(Math.max(1.6,t0.dist*.06)-t0.dist)*e;pol=t0.pol+(1.38-t0.pol)*e;az=t0.az+.35*e;d.style.opacity=String(Math.max(0,(k-.55)/.45))},
  ()=>{try{go()}catch(e){console.warn(e)}// la carte revient là où elle était, derrière le jeu
   try{camT.set(t0.x,t0.y,t0.z);dist=t0.dist;pol=t0.pol;az=t0.az}catch(e){}setTimeout(sortie332,150)})}
// la chasse en personne
{const of=ouvrirFPS;ouvrirFPS=function(mode,t){const a=arguments,th=this;if(PL332)return of.apply(th,a);const tt=t||(typeof B!=='undefined'&&B&&B.t);plonge332(tt&&tt.x,tt&&tt.z,()=>of.apply(th,a))}}
// entrer dans son camp depuis le conte
{const e0=entrer315;entrer315=function(ci){const a=arguments,th=this;if(PL332)return e0.apply(th,a);const c=ci!=null?T[ci]:(sel||null);plonge332(c&&c.x,c&&c.z,()=>e0.apply(th,a))}}
// incarner une action depuis une case
{const i0=incarner316;incarner316=function(k,t){const a=arguments,th=this;if(PL332)return i0.apply(th,a);plonge332(t&&t.x,t&&t.z,()=>i0.apply(th,a))}}
// les marches des épopées, les incarnations des rois, la peau de quelqu'un au camp : on sort de la brume déjà dedans
// (ouverture immédiate : d'autres parties du jeu attendent l'incarnation tout de suite)
function voile332(){if(PL332)return;PL332=1;const d=brume332();d.style.opacity='1';setTimeout(sortie332,60)}
{const o=incOuvrir287;incOuvrir287=function(){if(!INC)voile332();return o.apply(this,arguments)}}
{const v0=vpOuvrir;vpOuvrir=function(){if(!VP)voile332();return v0.apply(this,arguments)}}
