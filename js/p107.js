// ===== p107 : la Survie sur la même carte que l'Histoire et la Vie =====
// La vue de la colonie (Survie) avait son propre sol, un carré coloré qui ne se fondait pas dans l'île.
// Désormais on dessine d'abord la grande carte (relief, mer, forêts, détail du lieu) avec la caméra de la Survie,
// puis par-dessus seulement ce qui est propre à la Survie : bâtiments, champs, gens. Le zoom de la Survie pilote la carte.
let UNIF107=true;
{const kb=k3Batir;k3Batir=function(){const r=kb.apply(this,arguments);try{if(!UNIF107||!KV3.G)return r;
 if(KV3.sol){KV3.sol.material.colorWrite=false;KV3.sol.material.depthWrite=false}
 KV3.G.traverse(o=>{if(o===KV3.G)return;const g=o.geometry;if(!g)return;const p=g.parameters||{};
  if(g.type==='PlaneGeometry'&&p.width===40)o.visible=false;// l'ancienne mer
})}catch(e){}return r}}
{const ka=k3Arbres;k3Arbres=function(P,G){const avant=new Set(G.children);const r=ka.apply(this,arguments);try{G.children.forEach(c=>{if(!avant.has(c)){c._arbre107=1}})}catch(e){}return r}}
// le rendu : la grande carte d'abord, puis la colonie par-dessus, avec la même caméra et le même tampon de profondeur
setInterval(()=>{try{if(!KV3.R||KV3.R._u107)return;const R=KV3.R,r0=R.render.bind(R);R._u107=1;
 R.render=function(sc,cam){if(!UNIF107||sc!==KV3.S||typeof scene==='undefined'||!scene||!K){return r0(sc,cam)}
  try{camT.copy(KV3.tg);dist=KV3.dist;pol=KV3.pol;az=KV3.az}catch(e){}
  const bg=KV3.S.background,fg=KV3.S.fog;R.autoClear=false;R.clear();r0(scene,cam);KV3.S.background=null;KV3.S.fog=scene.fog||null;r0(KV3.S,cam);KV3.S.background=bg;KV3.S.fog=fg;R.autoClear=true}}catch(e){}},500);
// le détail du lieu (comme au double clic) s'ouvre sur la colonie dès qu'on regarde la Survie de près
setInterval(()=>{try{if(!window.LIEU107||!UNIF107||S||!K||K.vue!=="ville"||typeof kCol!=="function")return;const c=T[kCol().i];if(!c)return;
 if(KV3.dist<9){if(lieu&&Math.hypot(lieu.x-KV3.tg.x,lieu.z-KV3.tg.z)<1.5)return;const t=tileAt(KV3.tg)||c;kShim105(t,()=>ouvrirLieu(t));LA97=lieu}
 else if(lieu&&lieu===LA97){LA97=null;fermerLieu()}}catch(e){}},500);

// ----- Survie, colons : on ne bâtit pas n'importe quoi n'importe où -----
// · une habitation de plus seulement s'il y a assez d'Européens pour la tenir (une pour deux colons d'Europe, plus la première) ;
// · la chapelle près de la maison du maître (à côté d'une habitation), une seule par domaine ;
// · le magasin à côté d'une habitation ; la route seulement quand il y a de quoi commercer (un port ou un magasin) et qu'elle prolonge une route ou part d'une habitation ;
// · ailleurs, la terre sert à chasser, pêcher, compléter les vivres.
function kCompte107(k){let n=0;for(const i in K.b)(K.b[i]||[]).forEach(x=>{if(x.k===k)n++});return n}
function kEurop107(){try{const f=K.fac||{};return Math.max(2,Math.round(((f.c&&f.c.pop)||(f.p&&f.p.pop)||6)/3))}catch(e){return 2}}
{const kb=kBatir;kBatir=function(t){const L=kb(t);try{if(!K||K.joueur!=='c')return L;const voisin=k=>kVoisins(t).some(u=>(K.b[u.i]||[]).some(x=>x.k===k))||(K.b[t.i]||[]).some(x=>x.k===k);
 return L.filter(([k])=>{if(k==='habitation')return kCompte107('habitation')<1+Math.floor(kEurop107()/2);
  if(k==='chapelle')return voisin('habitation')&&kCompte107('chapelle')<Math.max(1,Math.floor(kCompte107('habitation')/3));
  if(k==='magasin')return voisin('habitation');
  if(k==='route')return (kCompte107('port')+kCompte107('magasin'))>0&&(voisin('route')||voisin('habitation'));
  return true})}catch(e){return L}}}
// clic gauche = ce qu'il y a sur ce terrain ; clic droit = ce qu'on peut y faire (plus de doublon)
{const st=document.createElement('style');st.textContent='body.kinfo107 #kA .pc button{display:none!important}body.kinfo107 #kA .pc::after{content:"Clic droit pour agir ici";display:block;font-size:12px;opacity:.7;margin-top:4px}';document.head.appendChild(st)}
addEventListener('pointerup',e=>{try{if(!K||!KV3||e.target!==KV3.cv)return;if(e.button===0)document.body.classList.add('kinfo107')}catch(_){}},true);

// ----- Le guide de la Survie : une bulle posée à côté de la commande ; il disparaît si l'on quitte la Survie,
// et s'il n'est pas suivi (40 s sans faire l'étape), il s'efface de lui-même -----
{let et=-1,t0=0;setInterval(()=>{try{const g=$('kTuto');const d=$('kons');
 if(!K||!d||d.hidden||K.fin){if(g)g.remove();document.querySelectorAll('.kLueur').forEach(e=>e.classList.remove('kLueur'));et=-1;return}
 if(!g||K.guideF)return;if(K.guideE!==et){et=K.guideE;t0=performance.now()}
 if(performance.now()-t0>40000){K.guideF=1;g.remove();document.querySelectorAll('.kLueur').forEach(e=>e.classList.remove('kLueur'));try{kSauve()}catch(e){}toast('Le guide s’efface. Vous pourrez le relancer depuis l’Aide.');return}
 const E=KGUIDE[K.guideE],c=E&&E.cible&&document.querySelector(E.cible);if(c&&c.offsetParent){const r=c.getBoundingClientRect(),w=g.offsetWidth||380,h=g.offsetHeight||140;let x=Math.min(innerWidth-w-10,Math.max(10,r.left+r.width/2-w/2)),y=r.bottom+12;if(y+h>innerHeight-10)y=Math.max(10,r.top-h-12);g.style.left=x+'px';g.style.top=y+'px';g.style.bottom='auto';g.style.right='auto';g.style.transform='none'}}catch(e){}},300)}
