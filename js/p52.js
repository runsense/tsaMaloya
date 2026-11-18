// ===== p52 : les bêtes Meshy sur la carte — cochons marrons en forêt, chiens aux camps et derrière les détachements, bœufs aux habitations, papangue posé qui guette =====
// Chaque bête est un modèle animé (squelette posé à part). Elle marche quand elle avance, broute ou fouille quand elle s'arrête.
const BETES={cochon:{f:'ani_cochon',h:.075,max:16},chien:{f:'ani_chien',h:.07,max:12},boeuf:{f:'ani_boeuf',h:.12,max:16},papangue:{f:'ani_papangue',h:.06,max:4}};
const BETM={buf:{},att:{},pool:{},tp:performance.now()};
function aniCharger(k){if(BETM.att[k])return;BETM.att[k]=1;meshyB64(BETES[k].f).then(t=>{const b=atob(t.trim()),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);BETM.buf[k]=u.buffer}).catch(()=>{BETM.buf[k]=false})}
function aniNouveau(k){const o={pret:false};new THREE.GLTFLoader().parse(BETM.buf[k].slice(0),'',g=>{const r=g.scene;r.traverse(m=>{if(m.isMesh){m.frustumCulled=false;m.castShadow=false}});const box=new THREE.Box3().setFromObject(r),h=box.max.y-box.min.y||1;
  const w=new THREE.Group();r.rotation.y=Math.PI/2;r.position.y=-box.min.y;r.scale.setScalar(1);w.add(r);w.userData.h=h;w.visible=false;scene.add(w);const mx=new THREE.AnimationMixer(r),A={};g.animations.forEach(c=>{A[c.name]=mx.clipAction(c);A[c.name].play();A[c.name].setEffectiveWeight(0)});
  const a0=A.marche||A.guet;if(a0)a0.setEffectiveWeight(1);Object.assign(o,{pret:true,g:w,mx,A,px:null,pz:null,v:0})},()=>{});return o}
// les places des bêtes autour de la caméra : une liste {k, x, z, ry} recalculée à chaque image
function aniPlaces(k){const L=[];if(!S||S.fin||dist>=(k==='papangue'?16:10))return L;const R2=dist*.8+3,now=performance.now()/1000;
 T.forEach(t=>{const dx=t.x-camT.x,dz=t.z-camT.z;if(dx*dx+dz*dz>R2*R2)return;const o=S.t[t.i];if(!o||!o.s||t.bare)return;const h=s=>rndH(t.i*7.3+s);
  const tour=(r1,r2,sp,o0)=>{const u=now*sp+o0+.5*Math.sin(now*sp*2.3+o0);return [t.x+Math.cos(u)*r1,t.z+Math.sin(u)*r2,u]};
  // une bande de cochons marrons : la laie devant, les autres à la file, les petits plus menus
  if(k==='cochon'&&t.forest&&t.alt>150&&t.alt<1600&&!o.c&&h(1)<.2*fAb(t)){const n=2+Math.floor(h(17)*3);for(let j=0;j<n;j++){const [x,z]=tour(.42+h(2)*.25+(j%2)*.05,.32+h(3)*.15,.05+h(4)*.03,h(5)*6-j*.22);L.push({x,z,sc:j>1?.65:1})}}
  if(k==='chien'&&(o.b==='camp'||o.c)&&h(6)<.8){const n=1+(h(18)<.5?1:0);for(let j=0;j<n;j++){const [x,z]=tour(.35+j*.04,.25,.12+h(7)*.05,h(8)*6-j*.35);L.push({x,z,sc:j?.85:1})}}
  if(k==='boeuf'&&(o.c||(S.voieC&&o.b==='camp')||(o.vl||[]).some(v=>v.k==='etable'))&&S.year>1680){if(h(19)<.4){const n=2+Math.floor(h(21)*3);for(let i=0;i<n;i++){const [x,z]=tour(.5+(i%3)*.06,.35+(i%2)*.05,.03+h(9)*.015,h(11)*6-i*.16);L.push({x,z,sc:.9+h(20+i)*.2})}}}
  if(k==='papangue'&&t.forest&&t.alt>300&&t.alt<1900&&h(13)<.06*fAb(t))L.push({x:t.x+(h(14)-.5)*.6,z:t.z+(h(15)-.5)*.6,fixe:1,ry:h(16)*6.28,dy:.32})});
 // un chien derrière chaque détachement
 if(k==='chien'&&typeof chas!=='undefined'&&chas){const M=new THREE.Matrix4(),P=new THREE.Vector3();for(let i=0;i<chas.count;i++){chas.getMatrixAt(i,M);P.setFromMatrixPosition(M);L.push({x:P.x-.25,z:P.z+.15})}}
 return L}
{const b0=bat;bat=function(kk){b0(kk);try{if(!S||typeof scene==='undefined')return;const now=performance.now(),dt=Math.min(.1,(now-BETM.tp)/1000),fige=!!window.PAUSEJ;BETM.tp=now;
 Object.keys(BETES).forEach(k=>{if(BETM.buf[k]===undefined){aniCharger(k);return}if(!BETM.buf[k])return;const L=aniPlaces(k).slice(0,BETES[k].max),P=BETM.pool[k]=BETM.pool[k]||[];
  while(P.length<L.length)P.push(aniNouveau(k));
  P.forEach((o,i)=>{if(!o.pret)return;const p=L[i];if(!p){o.g.visible=false;o.px=null;return}const y=Math.max(0,alt(p.x,p.z))*VX+(p.dy||.004);
   let ry=p.ry||0;if(!p.fixe&&o.px!=null){const dx=p.x-o.px,dz=p.z-o.pz;if(Math.hypot(dx,dz)>1e-5)ry=Math.atan2(-dz,dx);else ry=o.g.rotation.y}
   const d=o.px==null?0:Math.hypot(p.x-o.px,p.z-o.pz)/Math.max(dt,1e-3);o.px=p.x;o.pz=p.z;o.v+=(d-o.v)*Math.min(1,dt*3);
   o.g.visible=true;o.g.position.set(p.x,y,p.z);o.g.rotation.y=ry;o.g.scale.setScalar(BETES[k].h*(p.sc||1)/o.g.userData.h);
   if(o.A.marche){const pas=BETES[k].h*.6,m=p.fixe?0:Math.min(1,o.v/(pas*.3+1e-5));o.A.marche.setEffectiveWeight(m);o.A.marche.timeScale=Math.max(.4,Math.min(2,o.v/(pas+1e-5)));if(o.A.broute)o.A.broute.setEffectiveWeight(1-m)}
   if(o.A.guet)o.A.guet.setEffectiveWeight(1);if(!fige)o.mx.update(dt)})})}catch(e){}}}

// ===== les bâtiments Meshy dans la ville 3D de la Construction : habitation créole, cases en paille, chapelle, magasin, grenier, appontement =====
const K3MOD={};
function k3M(k,x,z,h,ry,G,long){const M=K3MOD[k];if(!M){K3MOD[k]={att:1};meshyB64('bat_'+k).then(t=>{const b=atob(t.trim()),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);new THREE.GLTFLoader().parse(u.buffer,'',g=>{let me=null;g.scene.updateMatrixWorld(true);g.scene.traverse(o=>{if(o.isMesh&&!me)me=o});if(!me){K3MOD[k]={non:1};return}
  const geo=me.geometry.clone();geo.applyMatrix4(me.matrixWorld);geo.computeBoundingBox();const bb=geo.boundingBox;geo.translate(-(bb.min.x+bb.max.x)/2,-bb.min.y,-(bb.min.z+bb.max.z)/2);geo.computeBoundingBox();const B=geo.boundingBox;
  const mt=me.material.map;if(mt)mt.encoding=THREE.sRGBEncoding;K3MOD[k]={geo,mat:mt?new THREE.MeshLambertMaterial({map:mt}):me.material,h:B.max.y-B.min.y||1,l:Math.max(B.max.x-B.min.x,B.max.z-B.min.z)||1};if(typeof KV3!=='undefined')KV3.cle=''},()=>{K3MOD[k]={non:1}})}).catch(()=>{K3MOD[k]={non:1}});return false}
 if(!M.geo)return false;const o=new THREE.Mesh(M.geo,M.mat),s=long?h*4/M.l:h/M.h;o.scale.setScalar(s);o.position.set(x,long?Math.max(.005,k3Y(x,z)):k3Y(x,z),z);o.rotation.y=ry||0;o.userData.partage=1;G.add(o);return true}
// la géométrie partagée ne doit pas être libérée quand la ville est reconstruite
if(typeof k3Lib==='function'){const kl=k3Lib;k3Lib=function(G){const keep=[];G.traverse(o=>{if(o.userData&&o.userData.partage){keep.push(o)}});keep.forEach(o=>o.parent&&o.parent.remove(o));return kl.apply(this,arguments)}}

// ===== la forêt de la grande carte : les cônes deviennent l'arbre Meshy des bois de couleurs (même taille), coloré par sommet =====
setInterval(()=>{try{if(typeof tree==='undefined'||!tree||tree.userData.meshy||typeof MOD==='undefined'||!MOD.arbre||MESHY_OK.arbre!=='ok')return;
 const g=MOD.arbre.geometry.clone();g.computeBoundingBox();const b=g.boundingBox,h=b.max.y-b.min.y||1,s=.5/h;g.scale(s,s,s);g.translate(0,-.25,0);
 tree.geometry.dispose();tree.geometry=g;tree.material.vertexColors=true;tree.material.needsUpdate=true;tree.userData.meshy=1;if(typeof peindre==='function')peindre()}catch(e){}},2500);
