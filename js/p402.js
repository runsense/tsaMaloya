// ===== p402 : la légende des deux îles fantômes. Juan de Lisboa et Dos Romeiros dos Castelhanos, que les cartes portugaises,
// hollandaises et françaises dessinent au sud de Bourbon (Reinel 1520, Van Keulen 1689, d'Anville 1727), sont visibles en mer,
// comme un mirage, tant que l'histoire en parle. En 1730, dans le jeu, un grand cyclone les engloutit — l'année où La Buse est pendu
// à Saint-Paul. C'est une légende du jeu : en vrai, ces îles n'ont jamais existé ; d'Anville les retire de ses cartes en 1749,
// les expéditions de Saint-Félix (1772) et de Grenier (1782-1783) ne trouvent que l'océan ; on pense à des erreurs de longitude,
// à des nuages pris pour des terres, et pour Dos Romeiros à l'île Amsterdam mal placée. =====
const IL402={g:null,J:null,D:null,fait:0};
function ile402(r,haut,vert){const g=new THREE.Group(),M=c=>new THREE.MeshLambertMaterial({color:c,transparent:true,opacity:.92});
 const sable=new THREE.Mesh(new THREE.CylinderGeometry(r,r*1.08,r*.08,24),M(0xd8c89a));sable.position.y=r*.02;g.add(sable);
 const roc=new THREE.Mesh(new THREE.ConeGeometry(r*.78,haut,9),M(0x6e6458));roc.position.y=haut/2;g.add(roc);
 const foret=new THREE.Mesh(new THREE.IcosahedronGeometry(r*.62,1),M(vert));foret.scale.set(1,.45,1);foret.position.y=haut*.42;g.add(foret);
 g.userData.mat=[sable,roc,foret].map(m=>m.material);return g}
function poseIles402(){if(typeof scene==='undefined'||!scene||typeof xz!=='function')return false;if(IL402.g){if(IL402.g.parent!==scene)scene.add(IL402.g);return true}
 const [a]=xz(55.22,-21.1),[b]=xz(55.84,-21.1),W=Math.abs(b-a)||3;IL402.g=new THREE.Group();IL402.g.name='iles402';
 IL402.J=ile402(W*.17,W*.16,0x3f6a34);IL402.D=ile402(W*.09,W*.11,0x557a3c);const [jx,jz]=xz(55.47,-21.78),[dx,dz]=xz(55.98,-21.73);
 IL402.J.position.set(jx,0,jz);IL402.D.position.set(dx,0,dz);IL402.g.add(IL402.J,IL402.D);scene.add(IL402.g);return true}
// visibles tant que l'histoire en parle : jusqu'au cyclone de 1730 (ou plus tard si la fiche n'est pas encore passée)
setInterval(()=>{try{if(!poseIles402())return;const ok=typeof S!=='undefined'&&S&&!S.lisboa402&&(S.year||0)<1731;if(!IL402.anim)IL402.g.visible=!!ok;
 if(ok&&!IL402.anim){const k=.55+.2*Math.sin(performance.now()/2400);[IL402.J,IL402.D].forEach(i=>i.userData.mat.forEach(m=>m.opacity=k))}}catch(e){}},250);
// le voyage de Boynot (1707) et la nuit du cyclone (1730), en films
function pluie402(on,el){let d=document.getElementById('pluie402');if(!on){if(d)d.remove();return}if(d)return;d=document.createElement('div');d.id='pluie402';
 d.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:1;background:linear-gradient(180deg,rgba(20,26,32,.55),rgba(30,38,44,.35)),repeating-linear-gradient(105deg,rgba(200,210,220,.18) 0 1px,transparent 1px 9px);background-size:auto,40px 40px;animation:pl402 .35s linear infinite';
 const st=document.getElementById('st402')||document.createElement('style');st.id='st402';st.textContent='@keyframes pl402{from{background-position:0 0,0 0}to{background-position:0 0,-12px 40px}}';document.head.appendChild(st);(el||document.body).appendChild(d)}
function voyage402(){if(!poseIles402()||typeof cineJouer!=='function')return;IL402.anim=1;IL402.g.visible=true;[IL402.J,IL402.D].forEach(i=>i.userData.mat.forEach(m=>m.opacity=.95));
 const [sx,sz]=xz(55.27,-21.0),J=IL402.J.position,D=IL402.D.position,nav=typeof g168Navire==='function'?g168Navire('navire'):null;if(nav){nav.scale.setScalar(2.5);scene.add(nav)}
 const pose=(a,b,k)=>{if(!nav)return;const x=a[0]+(b[0]-a[0])*k,z=a[1]+(b[1]-a[1])*k;nav.position.set(x,.02,z);nav.rotation.y=Math.atan2(b[0]-a[0],b[1]-a[1])-Math.PI/2};
 const fin=()=>{IL402.anim=0;if(nav)scene.remove(nav)};
 cineJouer([{d:6000,cam:[sx,sz+8,30,.4,.8],init:()=>pose([sx,sz],[J.x,J.z],0),txt:'<small>1707 · Saint-Paul</small>Le navigateur Boynot quitte Bourbon pour Pondichéry. Au sud, dit-il, une terre.'},
  {d:7500,cam:[J.x,J.z,48,.9,.78],f:(U,k)=>pose([sx,sz],[J.x-14,J.z-12],k),txt:'<small>Juan de Lisboa</small>Une baie, un îlot, des montagnes couvertes de forêts, du gibier. On en ferait le tour en une soixantaine de kilomètres.'},
  {d:6500,cam:[D.x,D.z,34,1.4,.8],f:(U,k)=>pose([J.x-14,J.z-12],[D.x-9,D.z-8],k),txt:'<small>Dos Romeiros dos Castelhanos</small>« Les pèlerins des Castillans » : sa voisine, plus petite, que les cartes hollandaises placent à l’est.'},
  {d:6500,cam:[(J.x+D.x)/2,(J.z+D.z)/2,95,1.8,.7],txt:'<small>Légende du jeu</small>Sur les cartes, ces îles existent depuis 1520. Personne n’y a jamais mis pied qui en soit revenu pour le prouver.'}],fin)}
function cyclone402(apres){if(!poseIles402()||typeof cineJouer!=='function'){apres&&apres();return}IL402.anim=1;IL402.g.visible=true;const J=IL402.J,D=IL402.D,y0J=J.position.y,y0D=D.position.y,hJ=J.children[1].geometry.parameters.height,hD=D.children[1].geometry.parameters.height;
 const fin=()=>{pluie402(false);IL402.anim=0;IL402.g.visible=false;J.position.y=y0J;D.position.y=y0D;J.rotation.z=D.rotation.z=0;try{S.lisboa402=1}catch(e){}apres&&apres()};
 cineJouer([{d:6000,cam:[J.position.x,J.position.z,55,1.1,.8],init:()=>{try{pluie402(true,CINE&&CINE.el)}catch(e){}},txt:'<small>1730 · légende du jeu</small>Un cyclone comme on n’en a jamais vu monte du sud. Sur Bourbon, les cases s’envolent.'},
  {d:8000,cam:[J.position.x,J.position.z,42,1.5,.82],f:(U,k)=>{J.position.y=y0J-k*k*hJ*1.3;J.rotation.z=k*.15},txt:'<small>La nuit</small>La mer se soulève. Juan de Lisboa s’enfonce, ses forêts d’abord, puis ses montagnes.'},
  {d:7000,cam:[D.position.x,D.position.z,30,1.9,.82],f:(U,k)=>{D.position.y=y0D-k*k*hD*1.4;D.rotation.z=-k*.2},txt:'<small>Dos Romeiros</small>Sa petite voisine la suit au fond de l’océan.'},
  {d:8000,cam:[(J.position.x+D.position.x)/2,(J.position.z+D.position.z)/2,95,2.2,.7],init:()=>pluie402(false),txt:'<small>Au matin</small>Plus rien que la houle. La même année, à Saint-Paul, on pend le pirate La Buse… Et si son trésor dormait là-bas, avec elles ?'}],fin)}
// les fiches : la fiche des îles (1707) propose le voyage ; la nuit du cyclone arrive en 1730
try{if(EV.lisboa){EV.lisboa.o=[{n:'🎬 Suivre la route de Boynot',d:'',fx:{},hist:1,f:()=>setTimeout(voyage402,300)},{n:'Continuer',d:'',fx:{},hist:1}]}
 EV.cyclone402={y:1730,si:()=>!!S&&!S.lisboa402,tag:'Mythe',an:'1730',t:'Le cyclone qui engloutit les îles',
  b:'Une légende des marins de Bourbon : en 1730, un cyclone terrible aurait emporté au fond de l’océan les deux îles du sud, Juan de Lisboa et Dos Romeiros. Depuis, plus personne ne les a vues.',
  v:'Légende du jeu. En vrai, ces îles n’ont jamais existé : d’Anville les retire de ses cartes en 1749, et les expéditions de Saint-Félix (1772) et de Grenier (1782-1783) ne trouvent que l’océan. On pense à des erreurs de longitude, à des nuages pris pour des terres ; Dos Romeiros serait l’île Amsterdam, mal placée.',
  nat:'Légende inventée pour le jeu, autour de deux îles fantômes réellement dessinées sur les cartes.',h:'Wikipédia, « Juan de Lisboa » ; 7 Lames la Mer, « Une île portée disparue au Sud de La Réunion ».',
  o:[{n:'🎬 La nuit du cyclone',d:'',fx:{},hist:1,f:()=>setTimeout(()=>cyclone402(),300)},{n:'Continuer',d:'',fx:{},hist:1,f:()=>{try{S.lisboa402=1}catch(e){}}}]};
 if(typeof histOK==='function'){const h0=histOK;histOK=function(k){if(k==='cyclone402')return true;return h0.apply(this,arguments)}}}catch(e){}
// et dans les Fiches de l'île, hors partie
setInterval(()=>{try{const b=document.getElementById('fic208b');if(!b||document.getElementById('fic402'))return;const h=b.parentElement.querySelector('h1'),t=h&&h.textContent.trim();
 const L=t==='L’île qui disparaît des cartes'?[['🎬 Suivre la route de Boynot',voyage402]]:t==='Le cyclone qui engloutit les îles'?[['🎬 La nuit du cyclone',()=>cyclone402()]]:null;if(!L)return;
 const d=document.createElement('div');d.id='fic402';d.style.margin='8px 0';L.forEach(([n,f])=>{const x=document.createElement('button');x.className='bt sec';x.textContent=n;x.style.margin='3px 4px 3px 0';x.onclick=()=>{$('ecran').hidden=true;f();const w=setInterval(()=>{if(typeof CINE==='undefined'||!CINE){clearInterval(w);$('ecran').hidden=false}},500)};d.appendChild(x)});b.before(d)}catch(e){}},500);
