// ===== p105 : une seule carte, détaillée partout ; les colons partent de toutes leurs villes ; explorer l'inconnu =====

// ----- 1. Le détail d'un lieu (celui du double clic) s'ouvre tout seul en zoomant, dans tous les modes -----
// (p97 le faisait en Vie avec les groupes ; on l'étend à l'Histoire et au reste. La Survie garde sa propre vue.)
setInterval(()=>{try{if(!S||S.fin||K||VP||CV.on||CINE||window.choixExp)return;if(!(modeHist()||!grpOn()))return;
 if(dist<9){const t=tileAt(camT);if(!t||!seen(t))return;if(lieu&&lieu!==LA97)return;if(lieu&&typeof camGo!=='undefined'&&camGo)return;if(lieu&&Math.hypot(lieu.x-camT.x,lieu.z-camT.z)<1.5)return;
  const c=camT.clone(),d=dist,p=pol,a=az;ouvrirLieu(t);camT.copy(c);dist=d;pol=p;az=a;LA97=lieu;const so=$('sortie');if(so)so.hidden=true}
 else if(dist>30&&lieu&&lieu===LA97){LA97=null;fermerLieu()}}catch(e){}},400);

// ----- 2. Vie, côté colons : chaque ville de la colonie est un lieu à vous, d'où l'on peut partir -----
// Saint-Paul dès 1663, puis Saint-Denis, Sainte-Suzanne… à leur date de fondation ; chacune arrive avec deux colons.
function villes105(){try{if(!S||S.fin||K||modeHist()||!S.voieC)return;S.vil105=S.vil105||{};let neuf=false;
 VILLES.forEach(([y,lo,la,n])=>{if(S.year<y||S.vil105[n])return;let t=near(lo,la);if(!t)return;if(t.bare){t=t.nb.map(i=>T[i]).find(u=>!u.bare);if(!t)return}
  {const pres=camps().find(c=>hd(c,t)<=2);if(pres){S.vil105[n]=pres.i;tl(pres.i).ville105=n;try{if(!LIEUX.some(l=>l.t===pres)){const P=xz(lo,la);LIEUX.push({n,col:false,k:'',dmax:99,nt:'',t:pres,p:P})}}catch(e){}return}}
  S.vil105[n]=t.i;const o=tl(t.i);o.s=1;if(o.b!=='camp'){o.b='camp';o.ville105=n}try{ouvrir(t,1)}catch(e){}
  if(!camps().some(c=>c.i!==t.i&&hd(c,t)<1)){for(let k=0;k<2;k++){try{const p=nouvellePersonne({or:'eu',age:20+Math.floor(rnd()*20)});p.camp=t.i;S.pp.push(p)}catch(e){}}S.gens=S.pp.length}
  neuf=true;log('🏘️ '+n+' fait partie de vos lieux : on peut y entrer et en faire partir des groupes.')});
 if(neuf){try{sauve();peindre();panneau()}catch(e){}}}catch(e){}}
setInterval(()=>villes105(),3000);

// ----- 3. Le bouton « Retour à la carte » : il ramène toujours à la carte, même quand un groupe est suivi -----
{const fix=()=>{const b=$('sortie');if(!b||b.dataset.f105)return;b.dataset.f105=1;b.addEventListener('click',()=>{setTimeout(()=>{try{if(lieu)fermerLieu();LA97=null;window.choixDest=null;try{camGo=null}catch(e){}if(dist<12)dist=24;pol=.85;try{panneau()}catch(e){}}catch(e){}},0)},true)};setInterval(fix,1500)}

// ----- 4. La Survie prend la même carte détaillée -----
// La Survie n'a pas l'état S de l'histoire : on prête au dessin du lieu un petit état de passage, le temps d'un appel.
function kShim105(t,f){const s0=S;S={t:{},year:(typeof kAnnee==='function'?kAnnee():1700),shim105:1,pp:[],grp:[],sv:{}};if(t)S.t[t.i]={s:1};try{return f()}catch(e){}finally{S=s0}}
{const rl=remplirLieu;remplirLieu=function(){if(!S&&K&&lieu)return kShim105(lieu,()=>rl.apply(this,arguments));return rl.apply(this,arguments)}}
setInterval(()=>{try{if(!window.LIEU107||S||!K||K.fin||VP||CINE)return;
 if(dist<7){const t=tileAt(camT);if(!t||t.bare&&t.alt<0)return;if(K.vu&&!K.vu[t.i])return;if(lieu&&lieu!==LA97)return;if(lieu&&Math.hypot(lieu.x-camT.x,lieu.z-camT.z)<1.5)return;
  const c=camT.clone(),d=dist,p=pol,a=az;kShim105(t,()=>ouvrirLieu(t));camT.copy(c);dist=d;pol=p;az=a;LA97=lieu;const so=$('sortie');if(so)so.hidden=true}
 else if(dist>30&&lieu&&lieu===LA97){LA97=null;fermerLieu()}}catch(e){}},400);

// ----- 5. Le raccourci Espace se voit : une petite touche sur le bouton du conte (Histoire) et sur la carte du camp (Vie) -----
{const st=document.createElement('style');st.textContent='#auto::after,#chronoB::after,#cvBtn:not(.mini104)::after,#cvBtn.mini104::before{content:"Espace";display:inline-block;margin-left:8px;padding:1px 6px;border:1px solid currentColor;border-bottom-width:2px;border-radius:4px;font-size:10px;letter-spacing:.04em;opacity:.75;vertical-align:middle;text-transform:none}#cvBtn{position:relative}#cvBtn.mini104::before{position:absolute;left:50%;top:-18px;transform:translateX(-50%);margin:0;background:rgba(20,16,12,.8);color:#f3e6c4;z-index:2}';document.head.appendChild(st)}

