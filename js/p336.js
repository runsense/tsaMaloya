// ===== p336 : chaque marche d'épopée a le décor de son lieu, pas celui d'un camp marron copié partout.
// (1) La forêt en champignons et les tiges en pics disparaissent : à leur place, les vraies plantes de l'île selon l'altitude —
// vacoas, lataniers et cocotiers sur la côte, arbres, palmistes et fanjans plus haut, tamarins dans les Hauts.
// (2) La côte a sa mer et ses navires au mouillage ; le port, son quai de planches et ses ballots ; les terres du café, leurs
// rangs de caféiers aux cerises rouges ; la nuit est une nuit. (3) Une fiche sur le café de Bourbon, son origine et son histoire. =====
const DEC336={bourdonnais:{0:['cote'],2:['cote','port']},corsaires:{0:['cote','port']},traite:{0:['cote','nuit'],1:['cote','port']},compagnie:{0:['cafe'],1:['cafe'],2:['cote','port']},
 misson:{'-1':['cote'],1:['cote']},maquis:{2:['cote','port']},crypto334:{}};
{const m0=marcher327;marcher327=function(k,ci,C,P,suite){if(k==='corsaires'&&ci===0)P.h={n:'un corsaire de Bourbon',m:'p7_colon'};const r=m0.apply(this,arguments);try{if(INC&&String(INC.k).startsWith('epc327_'))decor336(INC,k,ci)}catch(e){console.warn(e)}return r}}
function decor336(I,k,ci){const S3=I.S3,P=I.P,N=I.N,h=I.hAt,D=(DEC336[k]||{})[ci]||[],b=I.C.b0||0;
 // (la végétation est posée par p337 pour toutes les incarnations)
 const dir=i=>{const p=P[Math.max(0,i-2)],q=P[Math.min(N-1,i+2)];const dx=q[0]-p[0],dz=q[1]-p[1],L=Math.hypot(dx,dz)||1;return [dx/L,dz/L]};
 // 2. la mer et les navires
 if(D.includes('cote')){const [dx,dz]=dir(2),y0=Math.min(h(P[0][0],P[0][1]),h(P[1][0],P[1][1]))-.6;const mer=new THREE.Mesh(new THREE.PlaneGeometry(600,600,1,1).rotateX(-Math.PI/2),new THREE.MeshLambertMaterial({color:0x2a6a88,transparent:true,opacity:.92}));
  mer.position.set(P[0][0]-dx*300,y0,P[0][1]-dz*300);S3.add(mer);I.sky&&S3.fog&&(S3.fog.far=Math.max(S3.fog.far,160));
  if(typeof g168Navire==='function'){const types=k==='misson'?['navire','boutre']:k==='traite'&&ci===0?['navire']:['navire','navire','chaloupe'];types.forEach((t,j)=>{try{const G=g168Navire(t);const bb=new THREE.Box3().setFromObject(G),L=Math.max(bb.max.x-bb.min.x,bb.max.z-bb.min.z)||1;G.scale.multiplyScalar((t==='chaloupe'?7:26)/L);
   const d=(t==='chaloupe'?18:45+j*25),s=j%2?1:-1;G.position.set(P[0][0]-dx*d-dz*s*(12+j*10),y0-.2,P[0][1]-dz*d+dx*s*(12+j*10));G.rotation.y=Math.atan2(dz,-dx)+j*.4;S3.add(G);(I.nav336=I.nav336||[]).push(G)}catch(e){}})}}
 // le quai du port : planches sur pilotis, ballots et barriques
 if(D.includes('port')){const [dx,dz]=dir(2),bois=new THREE.MeshLambertMaterial({color:0x6a5034}),x0=P[0][0],z0=P[0][1],y0=h(x0,z0);
  const quai=new THREE.Mesh(new THREE.BoxGeometry(4,.3,22),bois);quai.position.set(x0-dx*11,y0+.1,z0-dz*11);quai.rotation.y=Math.atan2(dx,dz);S3.add(quai);
  for(let i=0;i<8;i++){const x=x0+(i%2?2:-2)*dz+dx*(i*.8),z=z0-(i%2?2:-2)*dx+dz*(i*.8),c=new THREE.Mesh(i%3?new THREE.BoxGeometry(.9,.8,.9):new THREE.CylinderGeometry(.45,.45,1,10),new THREE.MeshLambertMaterial({color:i%3?0xa08a60:0x7a5530}));c.position.set(x,h(x,z)+.45,z);S3.add(c)}
  if(typeof mod104==='function')mod104('bat_port').then(T=>{if(INC!==I)return;const o=clone104(T,5);const x=x0+dz*9,z=z0-dx*9;o.position.set(x,h(x,z),z);o.rotation.y=Math.atan2(-dz,dx);S3.add(o)}).catch(()=>{})}
 // les caféiers en rangs, cerises rouges
 if(D.includes('cafe')){const n=Math.floor(N*.7),cnt=Math.min(900,n*6),fe=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.6,1),new THREE.MeshLambertMaterial({color:0x2c5a2a}),cnt),ce=new THREE.InstancedMesh(new THREE.SphereGeometry(.06,5,4),new THREE.MeshLambertMaterial({color:0xb02020}),cnt*6),M=new THREE.Matrix4(),Q=new THREE.Quaternion(),V=new THREE.Vector3(),Sc=new THREE.Vector3();let c=0,r=0;
  for(let i=Math.floor(N*.25);i<N&&c<cnt;i+=2){const [dx,dz]=dir(i),nx=-dz,nz=dx;for(const s of [-1,1])for(let row=0;row<3&&c<cnt;row++){const d=3.2+row*2.4,x=P[i][0]+nx*d*s,z=P[i][1]+nz*d*s,y=h(x,z),hh=1.2+((i+row)%3)*.2;
    M.compose(V.set(x,y+hh*.55,z),Q,Sc.set(.9,hh,.9));fe.setMatrixAt(c++,M);for(let q=0;q<6;q++){const a=q*1.05+i,rr=.45;M.compose(V.set(x+Math.cos(a)*rr,y+hh*(.35+(q%3)*.2),z+Math.sin(a)*rr),Q,Sc.set(1,1,1));ce.setMatrixAt(r++,M)}}}
  fe.count=c;ce.count=r;fe.instanceMatrix.needsUpdate=true;ce.instanceMatrix.needsUpdate=true;S3.add(fe,ce)}
 // la nuit
 if(D.includes('nuit')){I.R.setClearColor(0x0b1424);if(S3.fog){S3.fog.color.setHex(0x0b1424);S3.fog.far=55}S3.traverse(o=>{if(o.isLight&&!o.isPointLight)o.intensity*=.35});const l=new THREE.HemisphereLight(0x5070a0,0x101820,.35);S3.add(l)}}
// ----- les fiches du café de Bourbon (dans « Fiches de l'île », et à leur date dans le conte) -----
{const A=(id,o)=>{if(!EV[id])EV[id]=Object.assign({o:[{n:'Continuer',d:'',fx:{},hist:1}]},o)};
 A('cafe336a',{y:1711,tag:'Nature',an:'vers 1711',t:'Le café marron de Bourbon',b:'Dans les bois de l’île pousse un caféier sauvage, qu’on appelle le café marron. Ses graines donnent une boisson amère, trop pauvre en caféine pour plaire en Europe.',h:'Le caféier indigène de La Réunion (Coffea mauritiana) est signalé au début du XVIIIᵉ siècle ; sa découverte pousse la Compagnie à faire venir le café de Moka.'});
 A('cafe336b',{y:1715,tag:'Archive',an:'1715',t:'Les plants de Moka',b:'Un navire de la Compagnie débarque à Saint-Paul quelques dizaines de plants venus de Moka, au Yémen. Peu survivent ; de ceux-là naîtront les caféières de toute l’île.',h:'Le café vient d’Éthiopie, où il pousse à l’état sauvage ; il est cultivé au Yémen et embarqué au port de Moka. Les plants arrivent à Bourbon en 1715.'});
 A('cafe336c',{y:1730,tag:'Monde',an:'XVIIIᵉ – XIXᵉ siècle',t:'Le Bourbon, un café qui fait le tour du monde',b:'Des caféiers de Bourbon partent vers d’autres colonies. Au XIXᵉ siècle, des missionnaires les emportent en Afrique de l’Est, puis ils gagnent l’Amérique latine. Le nom de l’île reste sur la variété : le « Bourbon ».',h:'La variété Bourbon, issue des caféiers de l’île, est l’une des grandes lignées du café arabica cultivé dans le monde.'});
 A('cafe336d',{y:1806,tag:'Archive',an:'1806 – 1820',t:'Le café emporté par les cyclones',b:'Les cyclones de 1806 et 1807 ravagent les caféières. La concurrence d’autres colonies fait baisser les prix. Peu à peu, les habitants arrachent le café et plantent la canne : l’île du café devient l’île du sucre.',h:'Après 1815, la canne à sucre remplace le café comme culture principale de Bourbon.'});
 A('cafe336e',{y:1810,tag:'Nature',an:'début du XIXᵉ siècle',t:'Le Bourbon pointu',b:'Un habitant remarque un caféier différent : petit, en forme de sapin, aux grains pointus et à la boisson douce, moins chargée en caféine. On l’appelle le « café Leroy », puis le Bourbon pointu.',h:'Le Bourbon pointu (variété Laurina) est une mutation naturelle apparue à Bourbon ; presque oublié au XXᵉ siècle, il est relancé à La Réunion à partir des années 2000.'})}
