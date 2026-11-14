
// ===== Les bêtes dans la vue du camp : parcs à oiseaux, enclos du bétail, chiens et papangue =====
// hauteur réelle au garrot ou à la tête, en mètres
const ANI3={chien:.6,papangue:.5,solitaire:.7,dronte:.7,dodo:.75,cabri:.75,cochon:.7,zebu:1.3};
const ANI3K={sol:'solitaire',dro:'dronte',dodo:'dodo'};
const P3A={buf:{},ok:{},B:{},G:null,cle:''};
function p3AniBuf(n){if(P3A.buf[n])return P3A.buf[n];const t=P3ANI_B64[n];if(!t)return null;const b=atob(t),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return P3A.buf[n]=u.buffer}
// chaque modèle est chargé une fois, puis cloné pour chaque bête
function p3AniProto(n){if(P3A.ok[n])return P3A.ok[n]==='att'?null:P3A.ok[n];const buf=p3AniBuf(n);if(!buf||!THREE.GLTFLoader)return null;P3A.ok[n]='att';
 new THREE.GLTFLoader().parse(buf.slice(0),'',g=>{const o=g.scene;o.traverse(m=>{if(m.isMesh)m.frustumCulled=false});const b=new THREE.Box3().setFromObject(o),h=b.max.y-b.min.y||1,k=ANI3[n]/h,c=b.getCenter(new THREE.Vector3());
  const w=new THREE.Group();o.position.set(-c.x,-b.min.y,-c.z);w.add(o);w.scale.setScalar(k);P3A.ok[n]=w},()=>{P3A.ok[n]=0});return null}
// les enclos et leurs habitants, selon l'état du jeu
function p3AniListe(L,C){const R=[],ani=S.ani||{};
 const parc=C?[.13,.6]:[.13,.6];let i=0;for(const k in ANI3K){const n=Math.min(8,ani[k]||0);for(let j=0;j<n;j++)R.push({id:'a'+k+j,n:ANI3K[k],zone:parc,r:[.07,.05],i:i++})}
 if(C&&S.bet>0){const L3=['cabri','cochon','zebu','cabri','cochon','cabri','zebu','cochon'];for(let j=0;j<Math.min(8,S.bet);j++)R.push({id:'b'+j,n:L3[j],zone:[.5,.66],r:[.07,.05]})}
 (S.bt||[]).forEach(b=>{if(b.k==='chien')R.push({id:'c'+b.id,n:'chien',zone:C&&L.chenil?L.chenil:L.feu,r:C?[.025,.03]:[.12,.1],libre:!C,dr:b.dr});else R.push({id:'p'+b.id,n:'papangue',zone:L.garde,r:[0,0],perche:1})});
 return {R,parc:Object.keys(ANI3K).some(k=>(ani[k]||0)>0||(typeof nBat==='function'&&nBat((ANI[k]||{}).parc)>0)),parcZ:parc,enclos:C&&(S.bet>0||(typeof nBat==='function'&&nBat('enclos')>0)),clotAb:!!S.clotAb}}
function p3AniClot(G,u,v,rx,ry,ab){const [x,z]=p3W(u,v),M=new THREE.MeshLambertMaterial({color:new THREE.Color(0x6a5038).convertSRGBToLinear()}),R=rx*48,Rz=ry*32,n=22;
 for(let k=0;k<n;k++){if(ab&&k%5===2)continue;const a=k/n*6.283,m=new THREE.Mesh(new THREE.CylinderGeometry(.06,.07,1,5),M);m.position.set(x+Math.cos(a)*R,.5,z+Math.sin(a)*Rz);if(ab&&k%5===3)m.rotation.z=.6;G.add(m)}
 for(const y of [.35,.8]){const pts=[];for(let k=0;k<=48;k++){const a=k/48*6.283;pts.push(new THREE.Vector3(x+Math.cos(a)*R,y,z+Math.sin(a)*Rz))}const l=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:0x5a4430}));G.add(l)}}
function p3Betes(dt){if(!P3.S||!S||modeHist())return;const {L}=cvLieux(),C=S.voieC,E=p3AniListe(L,C);
 if(!P3A.G){P3A.G=new THREE.Group();P3.S.add(P3A.G);P3A.F=new THREE.Group();P3.S.add(P3A.F)}
 const cle=CV.camp+'|'+(C?1:0)+'|'+E.parc+'|'+E.enclos+'|'+E.clotAb;if(cle!==P3A.cle){P3A.cle=cle;while(P3A.F.children.length)P3A.F.remove(P3A.F.children[0]);
  if(E.parc)p3AniClot(P3A.F,E.parcZ[0],E.parcZ[1],.085,.065,0);if(E.enclos)p3AniClot(P3A.F,.5,.66,.085,.068,E.clotAb)}
 const ar=!!window.PAUSEJ,vu=new Set(),now=performance.now();
 E.R.forEach(e=>{vu.add(e.id);let b=P3A.B[e.id];if(!b||b.n!==e.n){if(b&&b.o)P3A.G.remove(b.o);const pr=p3AniProto(e.n);if(!pr)return;const o=pr.clone(true);P3A.G.add(o);
   const h=(e.id.length*31+e.id.charCodeAt(e.id.length-1)*7)%100/100;b=P3A.B[e.id]={n:e.n,o,x:e.zone[0]+(h-.5)*e.r[0],y:e.zone[1]+(h*1.7%1-.5)*e.r[1],tx:0,ty:0,t:0,h};o.rotation.y=h*6.28}
  const o=b.o;
  if(e.perche){const [x,z]=p3W(e.zone[0],e.zone[1]);o.position.set(x,2.4,z);o.rotation.y=Math.sin(now/3000+b.h*9)*.6;return}
  if(!ar){if(b.t<=0){const ch=e.libre&&Math.random()<.35&&CV.A;let cib=null;if(ch){const ids=Object.keys(CV.A);const a=CV.A[ids[Math.floor(Math.random()*ids.length)]];if(a&&a.vis&&a.act!=='dort')cib=[a.x+.03,a.y+.02]}
    b.tx=cib?cib[0]:e.zone[0]+(Math.random()-.5)*e.r[0]*1.6;b.ty=cib?cib[1]:e.zone[1]+(Math.random()-.5)*e.r[1]*1.6;b.t=2+Math.random()*(e.n==='zebu'?9:5)}
   const dx=b.tx-b.x,dy=b.ty-b.y,d=Math.hypot(dx,dy),sp=(e.n==='chien'?.05:e.n==='zebu'?.012:.02)*dt;
   if(d>sp){b.x+=dx/d*sp;b.y+=dy/d*sp;const r=Math.atan2(dx*48,dy*32);let dr=r-o.rotation.y;dr=Math.atan2(Math.sin(dr),Math.cos(dr));o.rotation.y+=dr*Math.min(1,dt*5)}else b.t-=dt}
  const [x,z]=p3W(b.x,b.y),pas=!ar&&Math.hypot(b.tx-b.x,b.ty-b.y)>.002;o.position.set(x,pas?Math.abs(Math.sin(now/(e.n==='chien'?90:160)+b.h*6))*.04:0,z)});
 for(const id in P3A.B)if(!vu.has(id)){const b=P3A.B[id];if(b.o)P3A.G.remove(b.o);delete P3A.B[id]}
 // le rendu de la boucle a déjà eu lieu : on refait l'image avec les bêtes
 P3.R.render(P3.S,P3.C)}
{const pb=p3Boucle;p3Boucle=function(){const t=performance.now(),d=Math.min(.1,(t-(P3A.t0||t))/1000);P3A.t0=t;const r=pb();try{if(P3.on&&CV.on)p3Betes(d)}catch(e){console.warn('bêtes 3D',e.message)}return r}}
// en changeant de camp, les bêtes et les clôtures repartent de zéro
{const co=cvOuvrir;cvOuvrir=function(ci){co(ci);if(P3A.G){for(const id in P3A.B){if(P3A.B[id].o)P3A.G.remove(P3A.B[id].o)}P3A.B={};P3A.cle=''}}}
