// ===== p341 : à La Réunion, on voit presque toujours la mer. Le relief autour du chemin suit maintenant le vrai relief de l'île
// (p287 : au-delà de la vallée du chemin, la vraie altitude), et l'on ajoute au loin l'île réelle jusqu'à la côte, puis la mer
// jusqu'à l'horizon. Dans le fond d'un cirque, les remparts la cachent : comme en vrai. =====
function horizon341(I){if(I.h341)return;I.h341=1;const S3=I.S3,P=I.P,C=I.C;try{
 // l'échelle du parcours (mêmes calculs que p287)
 const RP=incRoute287(C);let rl=0;for(let i=1;i<RP.length;i++)rl+=Math.hypot(RP[i][0]-RP[i-1][0],RP[i][1]-RP[i-1][1]);const Ls=Math.max(300,Math.min(560,rl*60)),sc=Ls/rl,o0=RP[0];
 const alt0=Math.max(0,alt(P[0][2],P[0][3])),Y=a=>(a-alt0)*.045,mer=Y(0)-.25;
 // l'île au loin : un grand relief grossier autour du chemin
 let cx=0,cz=0;P.forEach(p=>{cx+=p[0];cz+=p[1]});cx/=P.length;cz/=P.length;const T=3600,n=110,g=new THREE.PlaneGeometry(T,T,n,n).rotateX(-Math.PI/2),pos=g.attributes.position,col=new Float32Array(pos.count*3);
 let X0=1e9,X1=-1e9,Z0=1e9,Z1=-1e9;P.forEach(p=>{X0=Math.min(X0,p[0]);X1=Math.max(X1,p[0]);Z0=Math.min(Z0,p[1]);Z1=Math.max(Z1,p[1])});X0-=95;X1+=95;Z0-=95;Z1+=95;
 for(let i=0;i<pos.count;i++){const x=pos.getX(i)+cx,z=pos.getZ(i)+cz,a=alt(x/sc+o0[0],z/sc+o0[1]),dedans=x>X0&&x<X1&&z>Z0&&z<Z1;let y=a<=0?mer-3:Y(a);if(dedans)y-=60;pos.setY(i,y);
  const c=a<=0?[.16,.38,.48]:a<60?[.72,.68,.5]:a<900?[.27,.42,.22]:a<1800?[.32,.4,.26]:a<2400?[.45,.42,.36]:[.55,.5,.45];col[i*3]=c[0];col[i*3+1]=c[1];col[i*3+2]=c[2]}
 g.setAttribute('color',new THREE.BufferAttribute(col,3));g.computeVertexNormals();const loin=new THREE.Mesh(g,new THREE.MeshLambertMaterial({vertexColors:true}));loin.position.set(cx,0,cz);S3.add(loin);
 // la mer, jusqu'à l'horizon
 const m=new THREE.Mesh(new THREE.CircleGeometry(9000,64).rotateX(-Math.PI/2),new THREE.MeshLambertMaterial({color:0x2a6f8e}));m.position.set(cx,mer,cz);S3.add(m);
 // l'air : on voit loin, la brume ne mange que le très lointain (sauf en forêt dense des Hauts)
 I.cam.far=12000;I.cam.updateProjectionMatrix();if(S3.fog){S3.fog.near=Math.max(S3.fog.near,(C.b1>=3?40:70));S3.fog.far=C.b1>=3?900:2600}
}catch(e){console.warn(e)}}
{const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);try{if(INC)horizon341(INC)}catch(e){}return r}}
