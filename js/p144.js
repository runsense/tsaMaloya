
// ===== p144 : les modèles 3D apportés par Paris (Sketchfab, CC-BY) et ses oiseaux imprimés (3mf) entrent dans le jeu =====
// Rendu harmonisé : tous les matériaux passent au même régime (mat, sans métal, sans reflets ni lueurs, textures en sRGB), et chaque modèle est ramené à sa taille dans le jeu.
// Bêtes : tortue géante, ibis (solitaire), pigeon (pigeon rose), roussette (vol animé), petits oiseaux (vol animé), scinque, rat, perroquet.
// Oiseaux de Paris (tirés de ses 3mf d'impression, couleurs de ses filaments) : paille-en-queue (phaéton), papangue, pétrel noir de Bourbon, zoizo la Vierge.
// Décor : cocotiers des côtes, rochers et pierres, branches moussues et troncs morts en forêt.
const M144={prm:{},tpl:{},mx:[]};
function buf144(n){return M144.prm[n]||(M144.prm[n]=meshyB64(n).then(t=>{const b=atob(t.trim()),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u.buffer}))}
function harmonise144(r,tint,remplace){r.traverse(o=>{if(!o.isMesh)return;o.frustumCulled=false;o.castShadow=false;const L=Array.isArray(o.material)?o.material:[o.material];
 L.forEach((m,i)=>{m=m.clone();if(m.map)m.map.encoding=THREE.sRGBEncoding;['metalnessMap','roughnessMap','emissiveMap','aoMap','envMap','lightMap'].forEach(k=>{if(k in m)m[k]=null});if('metalness' in m)m.metalness=0;if('roughness' in m)m.roughness=.88;if(m.emissive)m.emissive.setRGB(0,0,0);
  if(!m.map&&m.color&&m.color.r+m.color.g+m.color.b<.05&&o.geometry&&o.geometry.attributes.position&&o.geometry.attributes.position.count>300)m.color=new THREE.Color(0x5a4a36);if(tint!=null){if(remplace){m.map=null;m.color=new THREE.Color(tint)}else m.color=new THREE.Color(tint)}m.needsUpdate=true;if(Array.isArray(o.material))o.material[i]=m;else o.material=m})})}
// une instance : enveloppe à la taille voulue, posée au sol, tournée pour regarder vers +z ; animation jouée si le modèle en a
function inst144(n,o={}){return buf144(n).then(ab=>new Promise((ok,ko)=>new THREE.GLTFLoader().parse(ab.slice(0),'',g=>{const s=g.scene;harmonise144(s,o.tint,o.remplace);const w=new THREE.Group(),p=new THREE.Group();p.add(s);
  if(o.rz)p.rotation.z=o.rz;p.rotation.y=o.yaw||0;w.add(p);p.updateMatrixWorld(true);const bb=new THREE.Box3().setFromObject(p),sz=bb.getSize(new THREE.Vector3()),c=bb.getCenter(new THREE.Vector3());
  const k=(o.h||.1)/((o.long?Math.max(sz.x,sz.z):sz.y)||1);p.scale.multiplyScalar(k);p.position.set(-c.x*k,-bb.min.y*k+(o.dy||0),-c.z*k);let mx=null;
  if(g.animations&&g.animations.length){mx=new THREE.AnimationMixer(s);const a=g.animations.find(x=>o.clip&&x.name===o.clip)||g.animations[0];const A=mx.clipAction(a);A.play();A.time=Math.random()*a.duration;if(o.vit)A.timeScale=o.vit;M144.mx.push({mx,w})}
  w.userData.m144=n;ok({w,mx})},ko)))}
// gabarit statique (décor) : un seul chargement, puis des copies légères
function tpl144(n,o){return M144.tpl[n]||(M144.tpl[n]=inst144(n,o).then(r=>r.w))}
// les créateurs de p138/p139 gardent leur forme simple tant que le modèle charge, puis la cachent
function habille144(g,n,o){inst144(n,o).then(r=>{g.children.forEach(c=>{if(!c.userData.m144)c.visible=false});g.add(r.w)}).catch(()=>{})}
{const t0=tortue138;tortue138=function(){const g=t0();habille144(g,'sk_tortue',{h:.075,long:true,yaw:0});return g}}
{const r0=roussette138;roussette138=function(){const g=r0();habille144(g,'sk_roussette',{h:.16,long:true,yaw:Math.PI,vit:1.3});return g}}
{const r0=rapace138;rapace138=function(blanc){const g=r0(blanc);habille144(g,blanc?'oi_phaeton':'oi_papangue',blanc?{h:.32,long:true,yaw:-Math.PI/2,tint:0xf4f2ec}:{h:.3,long:true,rz:-Math.PI/2,yaw:-Math.PI/2,tint:0x9a7a5e});return g}}
{const i0=ibis139;ibis139=function(){const g=i0();habille144(g,'sk_ibis',{h:.12});return g}}
{const o0=oiseau135;oiseau135=function(esp){const g=o0(esp);try{if(esp==='perroquets')habille144(g,'sk_perroquet',{h:.07,long:true,yaw:-Math.PI/2,tint:0x3f8a3a,remplace:true});
  else if(esp==='mascarin')habille144(g,'sk_perroquet',{h:.07,long:true,yaw:-Math.PI/2,tint:0x6a4a32,remplace:true});
  else if(!esp||esp==='zoizo')habille144(g,'sk_colibri',{h:.05,long:true,tint:0x8a9a60,vit:.7})}catch(e){}return g}}
// les mixeurs tournent avec l'image
{let tp=performance.now();const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{const n=performance.now(),dt=Math.min(.1,(n-tp)/1000);tp=n;if(window.PAUSEJ)return r;M144.mx.forEach(e=>{let v=true,o=e.w;while(o){if(!o.visible){v=false;break}o=o.parent}if(v)e.mx.update(dt)})}catch(e){}return r}}
// les ibis de la carte (formes simples instanciées) deviennent de vrais ibis
{const P=[];let tpl=0;const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{const m=typeof VIE!=='undefined'&&VIE.vIbis;if(!m)return r;const n=m.visible?Math.min(m.count,10):0;
  while(P.length<n&&!tpl){tpl=1;inst144('sk_ibis',{h:.12}).then(x=>{scene.add(x.w);P.push(x.w);tpl=0}).catch(()=>{tpl=2})}
  if(P.length){m.visible=false;const M=new THREE.Matrix4(),p=new THREE.Vector3(),q=new THREE.Quaternion(),s=new THREE.Vector3();P.forEach((w,i)=>{if(i>=n){w.visible=false;return}m.getMatrixAt(i,M);M.decompose(p,q,s);w.visible=true;const px=w.position.x,pz=w.position.z;w.position.copy(p);if(Math.hypot(p.x-px,p.z-pz)>1e-4)w.rotation.y=Math.atan2(p.x-px,p.z-pz)})}}catch(e){}return r}}
// --- nouvelles bêtes de la carte ---
const NB144={pig:[],pet:[],zoi:[],sci:[],rat:[],att:{}};
function pool144(L,n,nom,o){const k=nom;while(L.length+(NB144.att[k]||0)<n){NB144.att[k]=(NB144.att[k]||0)+1;inst144(nom,o).then(x=>{scene.add(x.w);L.push(x.w);NB144.att[k]--}).catch(()=>{NB144.att[k]=99})}L.forEach((w,i)=>w.visible=i<n)}
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(!S||typeof scene==='undefined')return r;const now=performance.now()/1000,on=dist<12&&!S.fin,ph=typeof jourPh==='function'?jourPh():.4,nuit=ph>.72||ph<.05;
  const R2=dist*.8+3,proche=on?T.filter(t=>{const dx=t.x-camT.x,dz=t.z-camT.z;return dx*dx+dz*dz<=R2*R2&&S.t[t.i]&&S.t[t.i].s}):[],h=(t,s)=>rndH(t.i*2.9+s),Y=(x,z)=>Math.max(0,alt(x,z))*VX;
  const vivant=k=>typeof vivant138==='function'?vivant138(k):true,dens=k=>typeof dens138==='function'?dens138(k):1;
  const erre=(t,sp,rr,o0)=>{const k=now*sp+o0,fk=k-Math.floor(k),u=Math.floor(k)+(fk<.5?0:(fk-.5)*2);return [t.x+rr*(Math.sin(u+o0)+.5*Math.sin(u*1.7)),t.z+rr*.8*(Math.cos(u*.9+o0)+.5*Math.sin(u*1.4))]};
  const pose=(w,x,z,dy)=>{const px=w.position.x,pz=w.position.z;w.position.set(x,Y(x,z)+(dy||0),z);if(Math.hypot(x-px,z-pz)>1e-4)w.rotation.y=Math.atan2(x-px,z-pz)};
  // pigeons roses : lisière des forêts, au sol
  let Q=[];if(on&&!nuit&&vivant('pigeonRose'))proche.forEach(t=>{if(Q.length<6&&t.forest&&h(t,1)<.35*dens('pigeonRose'))Q.push(t)});pool144(NB144.pig,Q.length,'sk_pigeon',{h:.05,tint:0xe8b8c0});Q.forEach((t,i)=>{const w=NB144.pig[i];if(w){const [x,z]=erre(t,.12,.18,h(t,2)*6);pose(w,x,z)}});
  // pétrels noirs : au crépuscule et la nuit, ils rentrent de la mer vers les falaises des cirques
  Q=[];if(on&&(nuit||ph>.62)&&vivant('petrel')!==false)proche.forEach(t=>{if(Q.length<3&&t.alt>500&&t.slope>30&&h(t,3)<.5)Q.push(t)});pool144(NB144.pet,Q.length,'oi_petrel',{h:.2,long:true,yaw:-Math.PI/2});
  Q.forEach((t,i)=>{const w=NB144.pet[i];if(!w)return;const k=now*.3+i*2.1;const x=t.x+Math.cos(k)*.9,z=t.z+Math.sin(k*1.1)*.7,px=w.position.x,pz=w.position.z;w.position.set(x,Y(t.x,t.z)+1.1+.15*Math.sin(now+i),z);w.rotation.y=Math.atan2(x-px,z-pz);w.rotation.z=.3*Math.sin(now*.7+i)});
  // zoizo la Vierge : posés dans les arbres de forêt, le jour
  Q=[];if(on&&!nuit)proche.forEach(t=>{if(Q.length<3&&t.forest&&h(t,4)<.25)Q.push(t)});pool144(NB144.zoi,Q.length,'oi_zoiso',{h:.09});Q.forEach((t,i)=>{const w=NB144.zoi[i];if(!w)return;const x=t.x+(h(t,5)-.5)*.5,z=t.z+(h(t,6)-.5)*.5;w.position.set(x,Y(x,z)+.32+.01*Math.sin(now*3+i),z);w.rotation.y=h(t,7)*6.28+.2*Math.sin(now*.5+i)});
  // scinques : rivages et basses pentes sèches, tant qu'ils vivent
  Q=[];if(on&&!nuit&&(vivant('grandScinque')||vivant('scinqueBojer')))proche.forEach(t=>{if(Q.length<5&&t.alt<500&&!t.forest&&h(t,8)<.4)Q.push(t)});pool144(NB144.sci,Q.length,'sk_scinque',{h:.06,long:true,tint:0x8a7a5a,remplace:true});Q.forEach((t,i)=>{const w=NB144.sci[i];if(w){const [x,z]=erre(t,.2,.15,h(t,9)*6);pose(w,x,z)}});
  // rats : arrivés par les navires ; la nuit, autour des cases, des greniers et des villes
  Q=[];if(on&&(nuit||modeHist())&&S.year>=1670)proche.forEach(t=>{const o=S.t[t.i];if(Q.length<6&&(o.c||o.b==='camp'))Q.push(t)});pool144(NB144.rat,Q.length,'sk_rat',{h:.035,long:true,yaw:Math.PI/2});Q.forEach((t,i)=>{const w=NB144.rat[i];if(w){const [x,z]=erre(t,.35,.25,i*1.7);pose(w,x,z)}});
 }catch(e){}return r}}
// --- décor : cocotiers des côtes, rochers, branches et troncs morts en forêt ---
const DEC144={G:null,cle:''};
setInterval(()=>{try{if(!S||typeof scene==='undefined'||K||(typeof VP!=='undefined'&&VP))return;const on=dist<11;if(!DEC144.G){DEC144.G=new THREE.Group();scene.add(DEC144.G)}DEC144.G.visible=on;if(!on)return;
  const cle=Math.round(camT.x/3)+'|'+Math.round(camT.z/3)+'|'+Math.round(dist/3)+'|'+(S.year>=1720?1:0);if(cle===DEC144.cle)return;DEC144.cle=cle;const G=DEC144.G;while(G.children.length)G.remove(G.children[0]);
  const R=Math.max(5,dist*1.1),P=T.filter(t=>Math.hypot(t.x-camT.x,t.z-camT.z)<R&&S.t[t.i]&&S.t[t.i].s),h=(t,s)=>rndH(t.i*4.3+s),Y=(x,z)=>Math.max(0,alt(x,z))*VX;
  const met=(nom,o,x,z,ry,s)=>tpl144(nom,o).then(T0=>{const c=T0.clone(true);c.position.set(x,Y(x,z)-.004,z);c.rotation.y=ry;c.scale.setScalar(s||1);G.add(c)}).catch(()=>{});
  let nC=0,nR=0,nB=0;P.forEach(t=>{const o=S.t[t.i]||{};
   // cocotiers : plantés sur le littoral (on en voit sur les côtes dès le XVIIIᵉ siècle)
   if(S.year>=1720&&t.alt<40&&!t.bare&&nC<14&&typeof cotier==='function'&&cotier(t)&&h(t,1)<.5){const n=1+Math.floor(h(t,2)*2);for(let j=0;j<n;j++){nC++;met('sk_cocotier',{h:.6},t.x+(h(t,3+j)-.5)*.6,t.z+(h(t,5+j)-.5)*.6,h(t,7+j)*6.28,.8+h(t,9+j)*.4)}}
   // rochers : coulées, pentes raides, lits de rivière
   if(nR<16&&(t.bare||t.slope>28||t.riv)&&h(t,11)<.55){nR++;met('sk_pierre',{h:.12,long:true},t.x+(h(t,13)-.5)*.5,t.z+(h(t,14)-.5)*.5,h(t,15)*6.28,.7+h(t,16)*.8)}
   // en forêt : branche moussue à terre, tronc mort debout
   if(nB<16&&t.forest&&!o.c&&h(t,17)<.4){nB++;met('sk_branche',{h:.18,long:true},t.x+(h(t,19)-.5)*.6,t.z+(h(t,20)-.5)*.6,h(t,21)*6.28,1)}})}catch(e){}},700);
// les rochers du décor (blocs noirs à facettes) prennent la forme et la texture du rocher scanné, à la même taille
setTimeout(function roc144(){try{if(typeof MOD==='undefined'||!MOD.rocher||!MOD.rocher.geometry){setTimeout(roc144,2000);return}
 inst144('sk_pierre',{h:1,long:true}).then(r=>{let me=null;const roc=[];r.w.updateMatrixWorld(true);r.w.traverse(o=>{if(o.isMesh){if(!me)me=o;const mn=(o.material&&o.material.name)||'';if(/Rock|Stone/i.test(mn+' '+o.name))roc.push(o)}});if(!me)return;
  // le rocher est fait de deux morceaux : on les réunit (avant, un seul était pris, d'où les trous)
  const L=(roc.length?roc:[me]).map(o=>{let q=o.geometry.clone();q.applyMatrix4(o.matrixWorld);if(q.index)q=q.toNonIndexed();return q});me=roc[0]||me;
  const g=new THREE.BufferGeometry();['position','normal','uv'].forEach(k=>{if(!L.every(q=>q.attributes[k]))return;const it=L[0].attributes[k].itemSize,arr=new Float32Array(L.reduce((n,q)=>n+q.attributes[k].array.length,0));let o=0;L.forEach(q=>{arr.set(q.attributes[k].array,o);o+=q.attributes[k].array.length});g.setAttribute(k,new THREE.BufferAttribute(arr,it))});g.computeBoundingBox();const ob=MOD.rocher.geometry.boundingBox||(MOD.rocher.geometry.computeBoundingBox(),MOD.rocher.geometry.boundingBox),os=ob.getSize(new THREE.Vector3()),b=g.boundingBox,s=b.getSize(new THREE.Vector3()),c=b.getCenter(new THREE.Vector3());
  g.translate(-c.x,-b.min.y,-c.z);const k=Math.max(os.x,os.z)/Math.max(s.x,s.z);g.scale(k,k*1.1,k);const n=g.attributes.position.count;g.setAttribute('color',new THREE.Float32BufferAttribute(new Float32Array(n*3).fill(1),3));
  const m=me.material.clone();m.vertexColors=true;if(m.color)m.color.multiplyScalar(1.5);m.side=THREE.DoubleSide;m.transparent=false;m.opacity=1;m.alphaTest=0;m.depthWrite=true;if(m.map)m.map.premultiplyAlpha=false;m.needsUpdate=true;const vieux=MOD.rocher.geometry;MOD.rocher.geometry=g;MOD.rocher.material=m;
  // les copies déjà posées sur la carte et dans les lieux suivent
  scene.traverse(o=>{if(o.isInstancedMesh&&o.geometry===vieux){o.geometry=g;o.material=m}})}).catch(()=>{})}catch(e){}},3000);

// crédits des modèles (licence CC-BY 4.0 : on cite chaque auteur)
const CRED144=[['Tortue géante','Akinremi'],['Ibis blanc','jgrabo20'],['Pigeon','kenchoo'],['Roussette (Bat flying)','rafaelrafi'],['Petit oiseau (LowPoly humming-bird)','alexi.smnd'],['Scinque','bronwenalexina'],['Rat','iRahulRajput'],['Perroquet','SDPM Esare'],['Cocotier','iGauravRajput'],['Pierre (Stone Rock part 11)','YN14R'],['Branche moussue','ScanForgeFAB']];
setInterval(()=>{try{const c=document.getElementById('credSat');if(!c||c.querySelector('.cr144'))return;const b=document.createElement('a');b.className='cr144';b.href='#';b.textContent=' · Modèles 3D';b.style.cssText='color:inherit;text-decoration:underline;pointer-events:auto;cursor:pointer';
 b.onclick=e=>{e.preventDefault();alerteSimple('Modèles 3D','Modèles Sketchfab sous licence CC-BY 4.0 :<br>'+CRED144.map(([n,a])=>n+' — '+a).join('<br>')+'<br><br>Paille-en-queue, papangue, pétrel noir et zoizo la Vierge : modèles de Jean-Christophe Paris. Personnages et bêtes : modèles Meshy.',[['Fermer',()=>{}]])};c.appendChild(b)}catch(e){}},2000);
