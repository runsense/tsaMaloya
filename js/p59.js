// ===== p59 : les mêmes personnages partout, et un cadrage propre à chaque mode =====
// Histoire : la vue la plus globale, des personnages petits. Jeu : centré sur les acteurs, on zoome de près,
// mais le dézoom s'arrête à une vue moyenne (on peut toujours se déplacer pour tout voir).
// Construction : on zoome jusqu'à une vue moyenne, pas plus près. Partout : dézoomer au-delà sort de la ville ou du camp.
const CADRE={hist:{min:3.5,max:86,fig:.7},jeu:{min:3.5,max:16,fig:1},k3min:6,k3max:22,camp:70};
const cadre=()=>(typeof modeHist==='function'&&modeHist())?CADRE.hist:CADRE.jeu;
{const zv=zoomVers;zoomVers=function(px,py,f){const C=cadre(),nd=Math.max(C.min,Math.min(C.max,dist*f));return zv.call(this,px,py,nd/dist)}}
// en Jeu, une vue d'avant (ou un film) qui laisse la caméra trop haute redescend doucement à la vue moyenne
{const b0=bat;bat=function(k){b0(k);try{if(!S||S.fin)return;const C=cadre();if(!modeHist()&&dist>C.max&&!camGo&&!(typeof CINE!=='undefined'&&CINE))dist+=(C.max-dist)*.06;
 // la taille des personnages sur la carte : petits en Histoire, à pleine taille en Jeu ; ceux d'un lieu ouvert gardent la leur
 const lg=new Set(((typeof LG!=='undefined'&&LG.L)||[]).map(g=>g.cle));for(const c in MF.L){const f=MF.L[c];if(!f.o||lg.has(c))continue;const e=modeHist()?C.fig:C.fig*Math.max(1,Math.min(2.2,dist/7));if(Math.abs(f.o.scale.x-e)>1e-3)f.o.scale.setScalar(e)}}catch(e){}}}
// le camp en 3D : dézoomer au-delà de la vue d'ensemble ramène à la carte
setInterval(()=>{try{if(typeof P3==='undefined'||!P3.zoom||P3.zoom.p59)return;const z=P3.zoom;P3.zoom=function(e){const c=P3.cam;if(e.deltaY>0&&c){const d=Math.hypot(c.x-c.tx,c.y-c.ty,c.z-c.tz);if(d>CADRE.camp){e.preventDefault();if(typeof cvFermer==='function')cvFermer();return}}return z.apply(this,arguments)};P3.zoom.p59=1}catch(e){}},1000);
// la ville de la Construction : pas plus près qu'une vue moyenne ; dézoomer au plus loin sort sur l'île
addEventListener('wheel',e=>{try{const d=$('kons');if(!d||d.hidden||typeof K==='undefined'||!K||K.vue!=='ville'||typeof KV3==='undefined'||e.target.tagName!=='CANVAS'||!d.contains(e.target))return;
 if(e.deltaY<0&&KV3.dist<=CADRE.k3min){e.preventDefault();e.stopImmediatePropagation();return}
 if(e.deltaY>0&&KV3.dist>=CADRE.k3max-.3){e.preventDefault();e.stopImmediatePropagation();K.vue='ile';KVUE.sel=null;KVUE.reg=null;kRendu()}}catch(_){}},{capture:true,passive:false});
setInterval(()=>{try{if(typeof KV3!=='undefined'&&KV3.dist<CADRE.k3min)KV3.dist=CADRE.k3min}catch(e){}},500);

// ---------- ce qu'on porte au soleil : le chapeau de paille (vacoa, latanier) et le bertel des cueilleurs ----------
// posés sur les os du personnage (Head, Spine) : ils suivent l'animation ; un même personnage les a dans tous les modes
const ACC={paille:['cueillir','cueillir_sol','houe','cafe','canne','arracher','lavandiere','paille'],bertel:['cueillir','cueillir_sol'],
 sansChapeau:/milicien|pretre|colone|commandeur|indienne|femme_drapee|enfant/};
const ACCM={};
function accMat(c){return ACCM[c]||(ACCM[c]=new THREE.MeshLambertMaterial({color:c}))}
function accChapeau(){const g=new THREE.Group(),H=17.5,m=accMat(0xd9bf7a),b=new THREE.Mesh(new THREE.CylinderGeometry(H*.78,H*.82,H*.05,14),m);b.position.y=H*.72;g.add(b);
 const c=new THREE.Mesh(new THREE.CylinderGeometry(H*.3,H*.38,H*.42,12),m);c.position.y=H*.94;g.add(c);const r=new THREE.Mesh(new THREE.CylinderGeometry(H*.385,H*.385,H*.08,12),accMat(0x6a4a2a));r.position.y=H*.78;g.add(r);g.rotation.x=-.12;return g}
function accBertel(){const g=new THREE.Group(),m=accMat(0xa8864a),s=new THREE.Mesh(new THREE.CylinderGeometry(7,5.5,24,8,1,true),m);s.material.side=THREE.DoubleSide;s.position.set(0,4,-13);g.add(s);
 const f=new THREE.Mesh(new THREE.CircleGeometry(5.5,8),m);f.rotation.x=Math.PI/2;f.position.set(0,-8,-13);g.add(f);[-4,4].forEach(x=>{const t=new THREE.Mesh(new THREE.TorusGeometry(7,.7,4,10,Math.PI),accMat(0x5a4028));t.rotation.y=Math.PI/2;t.position.set(x,9,-5);g.add(t)});return g}
function habiller(root,nom,clip){if(!root)return;const u=root.userData;if(!u.acc){u.acc={};root.traverse(o=>{if(o.isBone&&o.name==='Head')u.acc.head=o;if(o.isBone&&o.name==='Spine')u.acc.spine=o})}
 const A=u.acc,ch=ACC.paille.includes(clip)&&!ACC.sansChapeau.test(nom||''),be=ACC.bertel.includes(clip);
 if(ch&&!A.ch&&A.head){A.ch=accChapeau();A.head.add(A.ch)}if(A.ch)A.ch.visible=ch;
 if(be&&!A.be&&A.spine){A.be=accBertel();A.spine.add(A.be)}if(A.be)A.be.visible=be}
setInterval(()=>{try{
 if(typeof MF!=='undefined')for(const c in MF.L){const f=MF.L[c];if(f.o&&f.o.visible)habiller(f.o,f.n,f.clip)}
 if(typeof P3!=='undefined'&&P3.M&&CV&&CV.on)for(const id in P3.M){const m=P3.M[id];if(m&&m.o)habiller(m.o.g.scene,m.n,m.o.clip)}
 if(typeof K3P!=='undefined')K3P.L.forEach(p=>{if(p.o&&p.o.visible)habiller(p.o,p.n,p.clip)})}catch(e){}},400);

// ---------- la charrette à bœufs : deux bœufs sous le joug, deux grandes roues pleines, la canne (ou les sacs de café) dessus ----------
function charrette(){const g=new THREE.Group(),bo=accMat(0x6a4a2a),cl=accMat(0x8a6a44);
 const pl=new THREE.Mesh(new THREE.BoxGeometry(.5,.03,.26),cl);pl.position.set(0,.13,0);g.add(pl);
 [-.13,.13].forEach(z=>{const r=new THREE.Mesh(new THREE.CylinderGeometry(.11,.11,.025,14),bo);r.rotation.x=Math.PI/2;r.position.set(-.04,.11,z);g.add(r);const h=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,.03,6),accMat(0x2a2018));h.rotation.x=Math.PI/2;h.position.set(-.04,.11,z*1.08);g.add(h)});
 [-.12,.12].forEach(z=>{const s=new THREE.Mesh(new THREE.BoxGeometry(.5,.08,.012),cl);s.position.set(0,.19,z);g.add(s)});
 const ti=new THREE.Mesh(new THREE.BoxGeometry(.55,.015,.02),bo);ti.position.set(.5,.12,0);g.add(ti);const jo=new THREE.Mesh(new THREE.BoxGeometry(.03,.025,.3),bo);jo.position.set(.74,.15,0);g.add(jo);
 const ch=new THREE.Group();g.add(ch);g.userData.charge=ch;return g}
function chargeDe(g,an){const ch=g.userData.charge;if(ch.userData.an===(an>=1815))return;ch.userData.an=an>=1815;while(ch.children.length)ch.remove(ch.children[0]);
 if(an>=1815){for(let i=0;i<14;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,.56,4),accMat(i%3?0x9aa850:0x7a8a3a));c.rotation.z=Math.PI/2;c.position.set(0,.16+Math.floor(i/5)*.016,-.09+(i%5)*.045);ch.add(c)}}
 else{for(let i=0;i<4;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.05,6,4),accMat(0xc8b088));s.scale.set(1.3,.8,1);s.position.set(-.15+i*.1,.19,(i%2-.5)*.08);ch.add(s)}}}
// sur la carte : une charrette fait la navette entre deux habitations voisines, dès qu'il y a des chemins de colons (après 1720)
const CHAR={L:[],t:0};
function charPlaces(){const R=[];if(!S||S.fin||(S.year||0)<1720||dist>30)return R;const C=T.filter(t=>{const o=S.t[t.i];return o&&o.c&&o.s&&Math.hypot(t.x-camT.x,t.z-camT.z)<dist*.9+4});
 C.forEach(a=>{if(R.length>=4)return;const b=C.find(u=>u!==a&&hd(u,a)<=2&&u.i>a.i);if(b)R.push([a,b])});return R}
{const b0=bat;bat=function(k){b0(k);try{if(typeof aniNouveau!=='function'||!BETM.buf.boeuf){CHAR.L.forEach(c=>c.g.visible=false);return}const P=charPlaces();
 while(CHAR.L.length<P.length){const c={g:charrette(),b:[aniNouveau('boeuf'),aniNouveau('boeuf')]};scene.add(c.g);CHAR.L.push(c)}
 const now=performance.now(),dt=Math.min(.1,(now-(CHAR.tp||now))/1000);CHAR.tp=now;
 CHAR.L.forEach((c,i)=>{const p=P[i];c.g.visible=!!p;c.b.forEach(o=>{if(o.g)o.g.visible=!!p});if(!p)return;chargeDe(c.g,S.year);
  const [a,b]=p,per=40,u=(k/per+i*.37)%1,aller=u<.5,f=aller?u*2:2-u*2,s=f*f*(3-2*f),x=a.x+(b.x-a.x)*s,z=a.z+(b.z-a.z)*s,dir=aller?1:-1,ry=Math.atan2(-(b.z-a.z)*dir,(b.x-a.x)*dir);
  c.g.position.set(x,Math.max(0,alt(x,z))*VX+.005,z);c.g.rotation.y=ry;const sc=.5;c.g.scale.setScalar(sc);
  c.b.forEach((o,j)=>{if(!o.pret)return;const lx=.78*sc,lz=j?.045:-.045,ca=Math.cos(ry),sa=Math.sin(ry),bx=x+lx*ca+lz*sa,bz=z-lx*sa+lz*ca;o.g.visible=true;o.g.position.set(bx,Math.max(0,alt(bx,bz))*VX+.004,bz);o.g.rotation.y=ry;o.g.scale.setScalar(BETES.boeuf.h/o.g.userData.h);
   if(o.A.marche){o.A.marche.setEffectiveWeight(1);o.A.marche.timeScale=.6;if(o.A.broute)o.A.broute.setEffectiveWeight(0)}if(!window.PAUSEJ)o.mx.update(dt)})})}catch(e){}}}

// dans la ville de la Construction (côté colon) : la charrette va et vient entre l'habitation et les champs
{const kb=k3Boucle;const KC={c:null};k3Boucle=function(){kb.apply(this,arguments);try{if(!KV3.S||!K||K.vue!=='ville'||K.joueur!=='c'||!BETM.buf.boeuf){if(KC.c)KC.c.g.visible=false;return}
 const c0=T[kCol().i],ch=T.find(t=>hd(t,c0)<=2&&t!==c0&&(K.b[t.i]||[]).some(b=>/champ|canne|cafe|magasin/.test(b.k)))||T.find(t=>hd(t,c0)===1);if(!ch)return;
 if(!KC.c){KC.c={g:charrette(),b:[aniNouveau('boeuf'),aniNouveau('boeuf')]}}const C=KC.c;if(C.g.parent!==KV3.S)KV3.S.add(C.g);C.g.visible=true;chargeDe(C.g,K.an||1700);
 const k=performance.now()/1000,now=performance.now(),dt=Math.min(.1,(now-(KC.tp||now))/1000);KC.tp=now;const u=(k/50)%1,aller=u<.5,f=aller?u*2:2-u*2,s=f*f*(3-2*f),x=c0.x+(ch.x-c0.x)*s,z=c0.z+(ch.z-c0.z)*s,dir=aller?1:-1,ry=Math.atan2(-(ch.z-c0.z)*dir,(ch.x-c0.x)*dir),sc=.22;
 C.g.position.set(x,k3Y(x,z)+.002,z);C.g.rotation.y=ry;C.g.scale.setScalar(sc);
 C.b.forEach((o,j)=>{if(!o.pret)return;if(o.g.parent!==KV3.S)KV3.S.add(o.g);const lx=.78*sc,lz=j?.02:-.02,ca=Math.cos(ry),sa=Math.sin(ry),bx=x+lx*ca+lz*sa,bz=z-lx*sa+lz*ca;o.g.visible=true;o.g.position.set(bx,k3Y(bx,bz)+.002,bz);o.g.rotation.y=ry;o.g.scale.setScalar(.055/o.g.userData.h);
  if(o.A.marche){o.A.marche.setEffectiveWeight(1);o.A.marche.timeScale=.6;if(o.A.broute)o.A.broute.setEffectiveWeight(0)}if(!window.PAUSEJ)o.mx.update(dt)})}catch(e){}}}

// ---------- les actions en film : bien visibles au début, puis seulement perceptibles ----------
// les 5 premières sorties ont leur petit film ; ensuite on voit seulement le groupe avancer sur la carte ;
// à chaque reprise après une pause (ou quand le conte repart), les 2 suivantes ont de nouveau leur film
const FILMQ={q:5,p:false};
{const cs=cineSortie;cineSortie=function(){const force=SORT.dern===0;if(FILMQ.q<=0&&!force)return;const avant=SORT.dern;cs.apply(this,arguments);if(!force&&SORT.dern!==avant)FILMQ.q--}}
setInterval(()=>{try{if(!S||S.fin)return;const enPause=modeHist()?!autoD():!!window.PAUSEJ;if(FILMQ.p&&!enPause)FILMQ.q=Math.max(FILMQ.q,2);FILMQ.p=enPause}catch(e){}},300);
// le conte se lit un peu plus lentement
{const le=lecture;lecture=function(){return Math.round(le.apply(this,arguments)*1.6)}}
