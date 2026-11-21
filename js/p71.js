// ===== p71 : plus de vieilles figurines sur la carte de Vie — les groupes dehors et les gens aux lieux de travail sont les vrais personnages =====
// Les anciennes silhouettes (cylindre + tête cubique, GRPI) et leurs anneaux doublaient les vrais modèles et paraissaient géantes : on les éteint
// hors du mode Histoire, et ceux qui travaillent sur un lieu (bois, paille, cueillette, pierre, chasse) y sont dessinés avec leur vrai modèle.
const GESTE71={chasse:'chasse_traque',cueil:'cueillir_sol',bois:'bois',paille:'cueillir_sol',pierre:'bois',eau:'eau',peche:'guetteur'};
{const b=bat;bat=function(k){b.apply(this,arguments);try{if(!S||typeof GRPI==='undefined'||!GRPI||modeHist())return;GRPI.count=0;GRPI.visible=false;if(GRPR){GRPR.count=0;GRPR.visible=false}
 if(typeof jourPh!=='function'||typeof TLIEU==='undefined')return;const ph=jourPh();if(!(ph>.12&&ph<.62))return;let n=0;
 (S.pp||[]).forEach(p=>{if(n>=14||enGrp(p)||p.lieu==null)return;const ta=tacheDe(p);if(!TLIEU.includes(ta))return;if(adulte(p)&&typeof TACH106!=='undefined'&&TACH106[ta]&&campDe(p)!=p.lieu)return;const t=T[p.lieu];if(!t)return;const a=p.id*2.3+(k||0)*.05,r=.18+.08*Math.sin(p.id);const x=t.x+Math.cos(a)*r,z=t.z+Math.sin(a)*r;
  mfPoser('w'+p.id,mfModeleDe(p),x,Math.max(0,alt(x,z))*VX+.02,z,a+Math.PI,GESTE71[ta]||'repos_debout');n++})}catch(e){}}}
// En Vie, la carte reste une carte satellite : plus d'icônes de ressources (poissons, coquillages…) ni de symboles au-dessus des groupes
resDessin=function(){if(typeof scene==='undefined')return;(RESI||[]).forEach(s=>scene.remove(s));RESI=[]};
{const gd=grpDessin;grpDessin=function(){gd.apply(this,arguments);try{if(!S||modeHist())return;(GRPM||[]).forEach(m=>{if(m.isSprite){scene.remove(m)}});GRPM=(GRPM||[]).filter(m=>!m.isSprite)}catch(e){}}}
setTimeout(()=>{try{resDessin();grpDessin()}catch(e){}},0);
// Le maître et la maîtresse ne prennent pas de rôle de travail (chasseur, planteur, garde…) et ne partent pas dans l'équipe de sortie :
// le maître sort par ses ordres (parcourir ses champs, aller au marché), la maîtresse tient la maison ou va en ville.
{const cl=cvListe;cvListe=function(){const r=cl.apply(this,arguments);try{if(!S||!S.voieC||!CV.on||CV.selP==null)return r;const p=ppId(CV.selP);if(!p||!estColon(p))return r;const d=$('cvL');if(!d)return r;
 d.querySelectorAll('[data-cf],[data-cg]').forEach(b=>b.remove());d.querySelectorAll('button').forEach(b=>{if(/équipe de sortie|Retirer de l’équipe/.test(b.textContent))b.remove()});if(CV.eq)delete CV.eq[p.id]}catch(e){}return r}}
former=function(k){const L=(S.pp||[]).filter(p=>adulte(p)&&!p.role&&p.id!==S.garde&&!(S.voieC&&estColon(p))).sort((a,b)=>((b.sk||{})[ROLES[k].sk]||0)-((a.sk||{})[ROLES[k].sk]||0));if(!L.length){toast('Plus personne de libre à former.');return}if(S.bras<1){toast(raisonBras(1));return}if(k==='cha'&&!peut({bois:1})){toast('Il manque 1 bois pour la lame.');return}
 snap();S.bras--;if(k==='cha')paye({bois:1});const p=L[0];p.role=k;p.sk=p.sk||{};p.sk[ROLES[k].sk]=(p.sk[ROLES[k].sk]||0)+2;if(k!=='mys')p.sk.gue=(p.sk.gue||0)+1;
 log(p.n+' devient '+roleN(k).toLowerCase()+'. '+(S.voieC?ROLES[k].dc:ROLES[k].d));sauve();panneau();rafraichir()};
// ----- La fortune du maître : une maison au chef-lieu, puis la grande villa -----
// Chaque vente au marché fait le capital (avec le bétail acheté). Assez de capital : on propose une maison en ville, où la maîtresse
// séjourne parfois ; beaucoup plus : on rebâtit la case du maître en grande villa à étage, avec sa varangue.
TACHES.sejour=['Séjourner dans la maison de ville','séjourne dans la maison de ville'];if(typeof P3GESTE==='object')P3GESTE['séjourne dans la maison de ville']='repos_debout';
const capital=()=>(S.ventes||0)*2+(S.bet||0);
{const j=journal;journal=function(m){const r=j.apply(this,arguments);try{if(S&&S.voieC&&/revient du marché/.test(m))S.ventes=(S.ventes||0)+1}catch(e){}return r}}
{const cl=cvListe;cvListe=function(){const r=cl.apply(this,arguments);try{if(!S||!CV.on||CV.selP==null)return r;const p=ppId(CV.selP);const bt=document.querySelector('[data-ta]'),o=bt&&bt.closest('.pc');if(!p||!o)return r;const b=o.querySelector('[data-ta="sejour"]');
 if(b&&(!S.voieC||!estColon(p)||p.g!=='f'||!S.mvEn))b.remove();else if(b)b.title='Quelques jours dans la maison de '+S.mvEn+' : visites, messe, nouvelles du bateau.'}catch(e){}return r}}
{const jt=jourTick;jourTick=function(){jt.apply(this,arguments);try{if(!S||!S.voieC||modeHist()||S.fin)return;
 (S.pp||[]).filter(p=>estColon(p)&&adulte(p)&&p.tache==='sejour').forEach(p=>{if(!S.mvEn){p.tache='maison';return}p.vil=(p.vil||0)+1;S.vivres=Math.max(0,(S.vivres||0)-.5);if(p.vil>=5){p.vil=0;p.tache='maison';S.coh=Math.min(100,(S.coh||0)+2);journal(p.n.split(' ')[0]+' rentre de sa maison de '+S.mvEn+' avec les nouvelles de la ville et du dernier navire.')}});
 if(S.demF!=null&&(S.jourN||0)-S.demF<20)return;const m=marcheDispo(),c=capital();if(!m||typeof grpDialogue!=='function'||$('grpC'))return;
 if(!S.mvEn&&!S.mvNon&&c>=8){S.demF=S.jourN||0;grpDialogue('Une maison à '+m,'Les ventes au marché ont rapporté. Une maison de ville se vend près de l’église de '+m+' : la famille y logerait les jours de marché, de messe et d’arrivée des navires, et la maîtresse pourrait y séjourner.',[['Acheter (2 bêtes, 8 vivres)',()=>{if((S.bet||0)<2||(S.vivres||0)<8){toast('Pas assez : il faut 2 bêtes et 8 vivres.');return}S.bet-=2;S.vivres-=8;S.mvEn=m;journal('La famille achète une maison à '+m+'.');toast('Maison de ville achetée à '+m+'.')}],['Pas maintenant',()=>{S.demF=S.jourN||0}]]);return}
 if(S.mvEn&&!S.villa&&c>=20){S.demF=S.jourN||0;grpDialogue('Une grande villa','La fortune de l’habitation est faite. On peut rebâtir la case du maître : une grande maison à étage, en pierre et bois, avec sa varangue, comme les riches habitations de l’île.',[['Bâtir la villa (4 bêtes, 15 vivres)',()=>{if((S.bet||0)<4||(S.vivres||0)<15){toast('Pas assez : il faut 4 bêtes et 15 vivres.');return}S.bet-=4;S.vivres-=15;S.villa=1;P3.decoK=null;journal('On bâtit la grande villa : un étage, une varangue, des colonnes blanches.');toast('La grande villa est bâtie.')}],['Plus tard',()=>{S.demF=S.jourN||0}]])}}catch(e){}}}
// la villa dans la vue de l'habitation
{const pd=p3Deco;p3Deco=function(L,C){pd.apply(this,arguments);try{if(!C||!S||!S.villa||!L||!L.cases||!L.cases.length)return;const G=P3.deco,[x,z]=p3W(...L.cases[0]);
 [...G.children].forEach(o=>{if(Math.abs(o.position.x-x)<4.2&&o.position.z>z-2.6&&o.position.z<z+3.6&&o.position.y<5)G.remove(o)});
 const M=c=>new THREE.MeshLambertMaterial({color:new THREE.Color(c).convertSRGBToLinear()}),add=(g,m,px,py,pz)=>{const o=new THREE.Mesh(g,m);o.position.set(px,py,pz);G.add(o);return o};
 add(new THREE.BoxGeometry(10,5.6,6),M(0xece6d6),x,2.8,z);const t=add(new THREE.ConeGeometry(7.6,3,4),M(0x8a3a2e),x,7.1,z);t.rotation.y=Math.PI/4;t.scale.set(1,1,.66);
 add(new THREE.BoxGeometry(10.6,.2,2.6),M(0x6a5a48),x,.1,z+4.1);add(new THREE.BoxGeometry(10.6,.18,2.6),M(0x6a5a48),x,2.9,z+4.1);add(new THREE.BoxGeometry(10.8,.25,2.8),M(0x7a3428),x,5.7,z+4.1);
 for(let k=0;k<6;k++)add(new THREE.CylinderGeometry(.12,.12,5.6,8),M(0xf6f2e6),x-5+k*2,2.85,z+5.2);add(new THREE.BoxGeometry(10.4,.5,.08),M(0xf6f2e6),x,3.3,z+5.25);
 for(let e=0;e<2;e++)for(let k=0;k<4;k++)add(new THREE.BoxGeometry(1,1.5,.06),M(0x3a2a1e),x-3.6+k*2.4,1.3+e*2.8,z+3.02);
 add(new THREE.BoxGeometry(.5,1.4,.5),M(0xd8d0c0),x+3.2,8.2,z-.8)}catch(e){}}}
// ----- L'image satellite est de 2026 : avant 1950, on y efface les villes, les routes et les zones bâties d'aujourd'hui -----
// Les pixels gris et clairs des bas (béton, toits, routes), hors plages et hors coulées du volcan, prennent la teinte de la végétation
// du lieu : savane sous le vent, forêt humide au vent. Les deux images sont gardées, et l'on bascule selon l'année.
const SAT71={};
setInterval(()=>{try{if(typeof terr==='undefined'||!terr||!terr.material||!terr.material.uniforms.sat||typeof S==='undefined'||!S)return;const U=terr.material.uniforms.sat;
 if(!SAT71.mod&&!SAT71.fait){SAT71.fait=1;const src=U.value.image,cv=document.createElement('canvas');cv.width=src.width;cv.height=src.height;const x=cv.getContext('2d');x.drawImage(src,0,0);const im=x.getImageData(0,0,cv.width,cv.height),D=im.data,W=(NX-1)*ST,H=(NY-1)*ST;
  for(let py=0;py<cv.height;py+=1){const wz=py/cv.height*H-MAR;for(let px=0;px<cv.width;px++){const i=(py*cv.width+px)*4;if(!D[i+3])continue;const r=D[i],g=D[i+1],b=D[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b),L=.3*r+.59*g+.11*b;
   if(L<95||mx-mn>34||g>r+12)continue;const wx=px/cv.width*W-MAR,a=alt(wx,wz);if(a<6||a>650)continue;const lon=wx/DEM.kx+DEM.lo0,lat=DEM.la1-wz/DEM.ky;if(lon>55.68&&lat<-21.12)continue;
   const sv=sousVent({x:wx,z:wz}),k=.75+((px*7+py*13)%11)/40;const c=sv?[118,116,70]:[52,86,44];D[i]=c[0]*k;D[i+1]=c[1]*k;D[i+2]=c[2]*k}}
  x.putImageData(im,0,0);SAT71.ori=U.value;SAT71.mod=new THREE.CanvasTexture(cv);SAT71.mod.minFilter=THREE.LinearMipmapLinearFilter;SAT71.mod.anisotropy=4}
 if(!SAT71.mod)return;const veut=S.year<1950?SAT71.mod:SAT71.ori;if(U.value!==veut){U.value=veut;if(typeof fx==='function'||1)try{if(typeof peindre==='function')peindre()}catch(e){}}}catch(e){console.warn('sat71',e.message)}},1500);
