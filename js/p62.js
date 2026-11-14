// ===== p62 : les bâtiments ne se chevauchent plus — un bâtiment posé trop près d'un autre est écarté du centre du lieu =====
// (cases du camp, maisons de la ville, grenier, chapelle, église, habitation… qu'ils soient dessinés par le code ou venus de Meshy)
const BATM=['ajoupa','case','bois','hCol0','hCol1','hCol2','colon','maisonVille','grenier','chapelle','eglise','magasin','tisane','kabare','abri','atelier','autel','chenil','etable','enclos','temple','gMaison','gEglise','gHotel','gTemple','gMosq'];
const BATR={};
function batRayon(k){if(BATR[k]!=null)return BATR[k];const m=MOD[k];if(!m||!m.geometry)return .1;m.geometry.computeBoundingBox();const b=m.geometry.boundingBox;return BATR[k]=Math.max(b.max.x-b.min.x,b.max.z-b.min.z)*.42}
function batEcarter(){const L=[],M=new THREE.Matrix4(),P=new THREE.Vector3(),Q=new THREE.Quaternion(),Sc=new THREE.Vector3();
 BATM.forEach(k=>{const m=MOD[k];if(!m||!m.userData||!m.userData.n)return;const r0=batRayon(k);for(let i=0;i<m.userData.n;i++){m.getMatrixAt(i,M);M.decompose(P,Q,Sc);if(Sc.x<=0)continue;L.push({m,i,x:P.x,y:P.y,z:P.z,q:Q.clone(),s:Sc.clone(),r:r0*Sc.x,bouge:0})}});
 if(L.length<2)return;
 for(let it=0;it<6;it++){let ch=0;for(let a=0;a<L.length;a++)for(let b=a+1;b<L.length;b++){const A=L[a],B=L[b],dx=B.x-A.x,dz=B.z-A.z,d=Math.hypot(dx,dz),min=(A.r+B.r)*.9;if(d>=min||d>2.5)continue;
   const ux=d>1e-4?dx/d:Math.cos(b),uz=d>1e-4?dz/d:Math.sin(b),push=(min-d);const pa=A.r>B.r?.25:.75;A.x-=ux*push*(1-pa);A.z-=uz*push*(1-pa);B.x+=ux*push*pa;B.z+=uz*push*pa;A.bouge=B.bouge=1;ch++}if(!ch)break}
 const touche=new Set();L.forEach(o=>{if(!o.bouge)return;M.compose(P.set(o.x,Math.max(0,alt(o.x,o.z))*VX,o.z),o.q,o.s);o.m.setMatrixAt(o.i,M);touche.add(o.m)});
 touche.forEach(m=>m.instanceMatrix.needsUpdate=true)}
{const pe=peindre;peindre=function(){const r=pe.apply(this,arguments);try{if(S)batEcarter()}catch(e){}return r}}
