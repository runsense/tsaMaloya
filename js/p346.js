// ===== p346 : le décor des incarnations au niveau de celui du camp. Les rochers à facettes deviennent des galets bosselés
// (comme au camp), les boules vertes à facettes deviennent des buissons arrondis aux teintes variées ; au sol, des fougères
// en éventail et des troncs couchés. Tout ce qui est solide arrête le pas, même les petits rochers et les troncs. =====
function buisson346(r,seed){const P=[],N=[];let s=seed*7+13;const rn=()=>{s=(s*16807)%2147483647;return s/2147483647};const parts=[];
 for(let k=0;k<5;k++){const g=new THREE.IcosahedronGeometry(r*(.45+rn()*.25),2).toNonIndexed(),q=g.attributes.position,a=rn()*6.28,d=k?r*.42:0,ox=Math.cos(a)*d,oz=Math.sin(a)*d,oy=k?-r*.12+rn()*r*.2:r*.08,ph=rn()*6;
  for(let i=0;i<q.count;i++){const x=q.getX(i),y=q.getY(i),z=q.getZ(i),n=1+.12*Math.sin(x*7/r+ph)*Math.cos(z*6/r+ph)+.06*Math.sin(y*11/r);q.setXYZ(i,x*n+ox,y*n*.78+oy,z*n+oz)}parts.push(g)}
 let n=0;parts.forEach(g=>n+=g.attributes.position.count);const pos=new Float32Array(n*3);let o=0;parts.forEach(g=>{pos.set(g.attributes.position.array,o);o+=g.attributes.position.count*3});
 const G=new THREE.BufferGeometry();G.setAttribute('position',new THREE.BufferAttribute(pos,3));G.computeVertexNormals();G.computeBoundingSphere();return G}
function decor346(I){if(!I||!I.S3||I.d346)return;I.d346=1;const S3=I.S3,h=I.hAt,M=new THREE.Matrix4(),V=new THREE.Vector3(),Q=new THREE.Quaternion(),Sc=new THREE.Vector3(),c=new THREE.Color();let sd=31+(I.k||'').length*7;const rn=()=>{sd=(sd*16807)%2147483647;return sd/2147483647};
 const ag=(x,z)=>Math.floor(x/4)+','+Math.floor(z/4),pose=(x,z,r)=>{if(I.dPiste(x,z)<r+.4)return;const a={x,z,r};(I.AG[ag(x,z)]||(I.AG[ag(x,z)]=[])).push(a)};
 const R=(typeof region337==='function')?region337(I.C):{n:'est',k:1};let nr=0;
 S3.traverse(m=>{if(!m.isMesh||!m.geometry||!m.material||!m.material.color||m.material.vertexColors||m.material.map)return;const g=m.geometry,t=g.type;if(!/Dodecahedron|Icosahedron|Sphere/.test(t))return;if(g.parameters&&g.parameters.detail>=2)return;
  const col=m.material.color,mx=Math.max(col.r,col.g,col.b),mn=Math.min(col.r,col.g,col.b);if(!g.boundingSphere)g.computeBoundingSphere();const R0=g.boundingSphere.radius;
  const gris=mx-mn<.06&&mx<.55,vert=col.g>col.r*1.15&&col.g>col.b*1.1;
  if(gris&&t!=='Sphere'){m.geometry=roc329(R0,++nr);m.material=m.material.clone();m.material.flatShading=false;m.material.color.setHex(0xffffff);m.material.needsUpdate=true;
   if(m.isInstancedMesh){const T=[0x5a5650,0x4a4744,0x66605a,0x3e3c3a,0x6a6458,0x55504a];for(let i=0;i<m.count;i++){c.setHex(T[(i*5+nr)%T.length]);c.offsetHSL(0,0,(((i*13)%9)-4)*.012);m.setColorAt(i,c)}if(m.instanceColor)m.instanceColor.needsUpdate=true}else m.material.color.copy(col)}
  else if(vert&&m.isInstancedMesh&&m.visible&&m.count>20){m.geometry=buisson346(R0,m.count);m.material=m.material.clone();m.material.flatShading=false;m.material.color.setHex(0xffffff);m.material.needsUpdate=true;
   const base=col.clone();for(let i=0;i<m.count;i++){c.copy(base);c.offsetHSL((((i*7)%11)-5)*.008,(((i*3)%5)-2)*.04,(((i*13)%9)-4)*.025);m.setColorAt(i,c)}if(m.instanceColor)m.instanceColor.needsUpdate=true}});
 // les fougères en éventail, comme au camp (peu dans la savane sèche de l'ouest)
 const NF=Math.round((R.n==='ouest'?120:520)),sh=new THREE.Shape();sh.moveTo(-.05,0);sh.quadraticCurveTo(-.2,.45,-.02,1.1);sh.lineTo(.02,1.1);sh.quadraticCurveTo(.2,.45,.05,0);const fG=new THREE.ShapeGeometry(sh,6);{const q=fG.attributes.position;for(let i=0;i<q.count;i++){const y=q.getY(i);q.setZ(i,-y*.55+y*y*.45);q.setY(i,y*.85)}fG.computeVertexNormals()}
 const fe=new THREE.InstancedMesh(fG,new THREE.MeshLambertMaterial({color:0xffffff,side:THREE.DoubleSide}),NF*5),FC=R.n==='ouest'?[0x8a9a48,0x9aa058,0x7a8a40]:R.n==='hauts'?[0x5a7a3a,0x6a8a44,0x4a6a32,0x7a8a48]:[0x4f8a3a,0x3f7a30,0x6a9a44,0x8a9a48];let k=0;
 for(let i=0;i<NF*3&&k<NF*5;i++){const j=Math.floor(rn()*I.N),p=I.P[j],a=rn()*6.283,d=2.2+rn()*22,x=p[0]+Math.cos(a)*d,z=p[1]+Math.sin(a)*d;if(I.dPiste(x,z)<1.8)continue;if(I.riv&&I.riv.some(q=>Math.hypot(q[0]-x,q[1]-z)<q[2]+.6))continue;const y=h(x,z),gS=.38+rn()*.45;
  for(let f=0;f<5;f++){Q.setFromEuler(new THREE.Euler(0,f/5*6.283+rn()*.4,0));M.compose(V.set(x,y-.02,z),Q,Sc.set(gS*.7,gS*(.8+rn()*.4),gS));fe.setMatrixAt(k,M);c.setHex(FC[(i+f)%FC.length]);fe.setColorAt(k,c);k++}}
 fe.count=k;fe.instanceMatrix.needsUpdate=true;if(fe.instanceColor)fe.instanceColor.needsUpdate=true;S3.add(fe);I.fe346=fe;
 // des troncs couchés (on ne passe pas au travers)
 const bois=new THREE.MeshLambertMaterial({color:0x5a4430});for(let i=0;i<(R.n==='ouest'?6:22);i++){const j=Math.floor(rn()*I.N),p=I.P[j],a=rn()*6.283,d=4+rn()*18,x=p[0]+Math.cos(a)*d,z=p[1]+Math.sin(a)*d;if(I.dPiste(x,z)<2.6)continue;const L=2+rn()*3,ro=rn()*3,tr=new THREE.Mesh(new THREE.CylinderGeometry(.16+rn()*.1,.22+rn()*.1,L,8),bois);tr.rotation.set(Math.PI/2,0,ro);tr.position.set(x,h(x,z)+.18,z);S3.add(tr);(I.logs346||(I.logs346=[])).push(tr);
  for(const u of [-.4,0,.4])pose(x-Math.sin(ro)*L*u,z+Math.cos(ro)*L*u,.38)}}
{const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);try{if(INC)decor346(INC)}catch(e){console.warn('p346',e)}return r}}
