// ===== p257 : la route coloniale suit le vrai tracé — l'ancienne route qui fait le tour de l'île en longeant la côte, de ville en ville
// (l'ancienne nationale qu'on emprunte toujours). Chaque tronçon apparaît quand les deux villes existent. Aux embouchures des rivières,
// pas de pont : un radier, gué de galets d'abord, puis dalle de béton au XXe siècle. Les routes de l'intérieur (vers les Plaines) restent. =====
const RING257={P:null,ang:null,M:null,cle:'',pres:null};
// entre Saint-Denis et La Possession, la côte est une falaise : jusqu'à la route du Littoral (1963), on passe par la Montagne —
// le sentier de la Montagne, puis le chemin des Anglais pavé de 1767 à 1775, qui descend à la Grande Chaloupe (tracé relevé)
const ANG257=[[55.44155, -20.88738], [55.43934, -20.88954], [55.43759, -20.89057], [55.43648, -20.89219], [55.43626, -20.89393], [55.43572, -20.89378], [55.43426, -20.89534], [55.434, -20.89522], [55.43343, -20.89682], [55.43415, -20.8968], [55.43456, -20.89872], [55.43323, -20.90004], [55.43325, -20.90068], [55.43292, -20.90096], [55.43241, -20.90074], [55.43136, -20.90148], [55.43104, -20.90291], [55.43076, -20.90235], [55.43022, -20.90233], [55.43037, -20.90336], [55.43001, -20.90413], [55.42776, -20.90496], [55.39778, -20.90544], [55.39709, -20.90494], [55.39624, -20.90507], [55.39449, -20.90437], [55.39278, -20.90515], [55.39164, -20.9045], [55.39077, -20.90292], [55.38906, -20.90213], [55.3864, -20.89985], [55.38502, -20.89756], [55.38115, -20.89416], [55.38097, -20.89389], [55.38154, -20.89343], [55.38029, -20.89384], [55.38168, -20.89303], [55.38059, -20.89322], [55.38002, -20.89427], [55.37966, -20.89396], [55.38009, -20.89514], [55.3794, -20.89458], [55.38062, -20.89612], [55.37895, -20.89443], [55.37949, -20.89579], [55.37889, -20.89592], [55.37936, -20.89619], [55.37775, -20.89514], [55.37549, -20.89768], [55.37515, -20.89923], [55.37584, -20.90174], [55.37559, -20.90231], [55.37534, -20.90204], [55.37523, -20.90249], [55.37494, -20.90225], [55.3749, -20.90277], [55.37449, -20.9026], [55.37462, -20.90316], [55.37423, -20.9029], [55.37449, -20.90348], [55.37288, -20.90281], [55.37114, -20.903], [55.37057, -20.90349], [55.36986, -20.90329], [55.36943, -20.90369], [55.36956, -20.90471], [55.3685, -20.90439], [55.3665, -20.90709], [55.3656, -20.90751], [55.36401, -20.90999], [55.36293, -20.91073], [55.3605, -20.9114], [55.35928, -20.91072], [55.35568, -20.91262], [55.35501, -20.9124], [55.35499, -20.91389], [55.35307, -20.9134], [55.35275, -20.91582], [55.35234, -20.91647], [55.35119, -20.91701], [55.3494, -20.9196], [55.34803, -20.9208], [55.34758, -20.92199], [55.34657, -20.92229]];
function ring257(){if(RING257.P)return RING257.P;if(typeof altTri!=='function'||typeof xz!=='function'||!DEM||!DEM.kx)return null;const [cx,cz]=xz(55.53,-21.12),N=900,P=[];
 for(let k=0;k<N;k++){const a=k/N*6.2832,dx=Math.cos(a),dz=Math.sin(a);let r=45;while(r>0&&altTri(cx+dx*r,cz+dz*r)<22)r-=.05;r=Math.max(0,r-.18);P.push([cx+dx*r,cz+dz*r])}
 // lissage, pour que la route coule le long de la côte
 for(let it=0;it<3;it++){const Q=P.map((p,i)=>{let x=0,z=0;for(let d=-4;d<=4;d++){const q=P[(i+d+N)%N];x+=q[0];z+=q[1]}return [x/9,z/9]});for(let i=0;i<N;i++)P[i]=Q[i]}
 RING257.P=P;RING257.c=[cx,cz];RING257.ang=(lo,la)=>{const [x,z]=xz(lo,la);let a=Math.atan2(z-cz,x-cx);if(a<0)a+=6.2832;return Math.round(a/6.2832*N)%N};
 RING257.pres=(x,z)=>{for(let i=0;i<N;i+=3){const p=P[i];if((p[0]-x)**2+(p[1]-z)**2<2.4*2.4)return true}return false};
 try{VR121.pos[2]=null;VR121.pos[3]=null}catch(e){}return P}
function arcs257(){const V=(typeof VILLES!=='undefined'?VILLES:[]).filter(v=>S.towns&&S.towns.includes(v[3])).map(v=>({n:v[3],i:RING257.ang(v[1],v[2])})).sort((a,b)=>a.i-b.i);if(V.length<2)return [];
 const N=RING257.P.length,A=[];for(let k=0;k<V.length;k++){const a=V[k],b=V[(k+1)%V.length];if(V.length===2&&k===1)break;let L=(b.i-a.i+N)%N;
  // le grand vide du Sud-Est (le Grand Brûlé, entre Saint-Benoît et Saint-Pierre) : pas de route tant qu'aucune ville ne s'y trouve, ou avant le XIXe siècle
  if(L>N*.28&&S.year<1850)continue;A.push([a.i,L])}return A}
setInterval(()=>{try{if(typeof scene==='undefined'||!S||!S.towns||typeof VILLES==='undefined')return;const P=ring257();if(!P)return;
  const cache=(typeof K!=='undefined'&&K)||(typeof CV!=='undefined'&&CV.on);if(RING257.M)RING257.M.visible=!cache;if(cache)return;
  const ep=S.year<1900?0:S.year<1950?1:2,cle=S.towns.slice().sort().join(',')+'|'+ep+'|'+(S.year>=1850)+'|'+(S.year<1963&&S.year>=1775);if(cle===RING257.cle)return;RING257.cle=cle;
  if(RING257.M){scene.remove(RING257.M);RING257.M.traverse(o=>{if(o.geometry)o.geometry.dispose()});RING257.M=null}
  const G=new THREE.Group(),N=P.length,R=[];
  // la coupure de la Montagne : avant 1963, la route quitte la côte entre Saint-Denis et La Possession
  const mont=S.year<1963&&S.year>=1775,ia=RING257.ang(55.4416,-20.8874),ib=RING257.ang(55.3466,-20.9223),dans=i=>{const L0=(ia-ib+N)%N,d=(i-ib+N)%N;return d<=L0};
  arcs257().forEach(([i0,L])=>{let B=[];const fin=()=>{if(B.length>2)R.push(ruban97(B,ep===2?.17:.14,q=>Math.max(0,altTri(q.x,q.z))*VX+.1));B=[]};let fait=false;
   for(let k=0;k<=L;k+=2){const i=(i0+k)%N;if(mont&&dans(i)){if(!fait){fait=true;const pa=P[i];B.push({x:pa[0],y:0,z:pa[1]});const M=ANG257.map(([lo,la])=>{const [x,z]=xz(lo,la);return {x,y:0,z}});
      // on raccorde par le bout le plus proche
      const d0=(M[0].x-pa[0])**2+(M[0].z-pa[1])**2,d1=(M[M.length-1].x-pa[0])**2+(M[M.length-1].z-pa[1])**2;(d0<d1?M:M.reverse()).forEach(q=>B.push(q))}continue}
    const p=P[i];B.push({x:p[0],y:0,z:p[1]})}fin()});
  if(R.length){const m=new THREE.Mesh(fusion97(R),matRuban110(1));if(ep===2)m.material.color.set(0xc8c4b8);m.renderOrder=3;m.frustumCulled=false;G.add(m)}
  // les radiers, aux embouchures que la route traverse
  if(typeof RIVS!=='undefined'){const actifs=new Set();arcs257().forEach(([i0,L])=>{for(let k=0;k<=L;k++)actifs.add((i0+k)%N)});
   RIVS.forEach(r=>{const [x,z]=xz(r[1],r[2]);let bi=-1,bd=1e9;for(let i=0;i<N;i++){if(!actifs.has(i))continue;const d=(P[i][0]-x)**2+(P[i][1]-z)**2;if(d<bd){bd=d;bi=i}}if(bi<0||bd>1.6*1.6)return;
    const p=P[bi],q=P[(bi+3)%N],a=Math.atan2(q[0]-p[0],q[1]-p[1]),y=Math.max(0,altTri(p[0],p[1]))*VX+.11;
    const rad=new THREE.Mesh(new THREE.BoxGeometry(.24,.025,.34),new THREE.MeshLambertMaterial({color:ep===0?0x8b8372:ep===1?0x9d978a:0xbdbab2}));rad.position.set(p[0],y,p[1]);rad.rotation.y=a;rad.userData.nom='Radier de '+r[0];G.add(rad);
    if(ep===0)for(let s=0;s<6;s++){const g=new THREE.Mesh(new THREE.SphereGeometry(.028,5,4),new THREE.MeshLambertMaterial({color:0x6f6a60}));g.position.set(p[0]+(Math.random()-.5)*.22,y+.012,p[1]+(Math.random()-.5)*.22);G.add(g)}})}
  scene.add(G);RING257.M=G}catch(e){}},2000);
{const nv=nouvelle;nouvelle=function(){RING257.cle='';return nv.apply(this,arguments)}}
