// ===== p337 : chaque incarnation a le paysage de son coin d'île. Les arbres en champignon et les tiges en pics sont remplacés
// par les plantes de l'endroit : à l'ouest, sous le vent, une savane sèche de fataks avec lataniers, benjoins et bois de chandelle ;
// à l'est, au vent, une forêt humide d'arbres, de palmistes et de fanjans ; au sud sauvage, les vacoas ; à mi-pente, les forêts
// de bois de couleur ; dans les Hauts, tamarins, fanjans et branles. Sur la côte, vacoas et cocotiers. =====
function region337(C){const r=(C.route&&C.route[0])||[55.5,-21.1],lo=r[0],la=r[1],b=Math.max(C.b0||0,C.b1||0),b0=C.b0||0;
 const ouest=lo<55.45&&la>-21.32,sud=la<-21.28&&lo>55.55,est=lo>55.55&&!sud;
 if(b0>=2.5)return {n:'hauts',arb:['plante_tamarin','plante_fanjan','plante_branle'],k:1,herbe:[0x7a8a4a,0x8a9a5a,0x6a7a40]};
 if(b0>=1.5)return {n:'mi',arb:ouest?['plante_benjoin','plante_arbre','plante_fanjan']:['plante_arbre','plante_fanjan','plante_palmiste'],k:1,herbe:[0x5a8a3a,0x4a7a30,0x6a9a44]};
 if(ouest)return {n:'ouest',arb:['plante_latanier','plante_benjoin','plante_bois_chandelle'],k:.45,herbe:[0xb8b068,0xa8a05a,0xc8c07a]};
 if(sud)return {n:'sud',arb:['plante_vacoa','plante_arbre','plante_palmiste'],k:.9,herbe:[0x5a8a3a,0x6a9a44,0x4a7a30]};
 return {n:'est',arb:['plante_arbre','plante_palmiste','plante_fanjan'],k:1,herbe:[0x4a8a3a,0x5a9a44,0x3a7a30]}}
function vegetation337(I){if(I.veg337)return;I.veg337=1;const S3=I.S3,h=I.hAt,R=region337(I.C),arb=[],herbe=[],M=new THREE.Matrix4(),P=new THREE.Vector3(),Q=new THREE.Quaternion(),Sc=new THREE.Vector3();
 S3.children.forEach(o=>{if(!o.isInstancedMesh||o.count<10||!o.geometry)return;const g=o.geometry,t=g.type,pr=g.parameters||{};
  if(t==='ConeGeometry'&&pr.radius<=.13){for(let i=0;i<o.count;i++){o.getMatrixAt(i,M);M.decompose(P,Q,Sc);if(Sc.x>0)herbe.push([P.x,P.z])}o.visible=false}
  else if(t==='CylinderGeometry'){for(let i=0;i<o.count;i++){o.getMatrixAt(i,M);M.decompose(P,Q,Sc);if(Sc.x>0)arb.push([P.x,P.z,Sc.y])}o.visible=false}
  else if(/Cone|Buffer/.test(t)&&o.material&&!o.material.map&&!o.material.vertexColors)o.visible=false});
 // les arbres de l'endroit (moins nombreux dans la savane de l'ouest)
 const pres=(x,z)=>{const r=I.C.route&&I.C.route[0];return r&&Math.hypot(x-I.P[0][0],z-I.P[0][1])<40};
 if(typeof arbGeo153==='function'&&arb.length){const L0=arb.filter((a,i)=>((i*37)%100)/100<R.k);R.arb.forEach((n,j)=>{let nn=n;if(j===2&&pres(0,0)&&(I.C.b0||0)<.6&&R.n!=='hauts')nn=R.n==='ouest'?'plante_vacoa':'sk_cocotier';
  const L=L0.filter((a,i)=>i%3===j).slice(0,140);if(!L.length)return;arbGeo153(nn).then(G=>{if(INC!==I)return;G.forEach(o=>{const im=new THREE.InstancedMesh(o.ge,o.mat,L.length);L.forEach((a,i)=>{const H=(nn==='sk_cocotier'?9:nn==='plante_vacoa'?5:nn==='plante_latanier'?6:nn==='plante_branle'?3:nn==='plante_fanjan'?5:7)*(.75+((i*37)%10)/22);M.compose(P.set(a[0],h(a[0],a[1])-.05,a[1]),Q.setFromAxisAngle(new THREE.Vector3(0,1,0),i*2.3),Sc.set(H,H,H));im.setMatrixAt(i,M)});im.instanceMatrix.needsUpdate=true;S3.add(im)})}).catch(()=>{})})}
 // l'herbe : des touffes (fataks à l'ouest, herbes vertes ailleurs) à la place des pics
 if(herbe.length){const sh=new THREE.Shape();sh.moveTo(-.03,0);sh.quadraticCurveTo(-.08,.5,0,1);sh.quadraticCurveTo(.08,.5,.03,0);const fg=new THREE.ShapeGeometry(sh,4);{const q=fg.attributes.position;for(let i=0;i<q.count;i++){const y=q.getY(i);q.setZ(i,-y*y*.35)}}
  const n=Math.min(herbe.length,2500),im=new THREE.InstancedMesh(fg,new THREE.MeshLambertMaterial({color:0xffffff,side:THREE.DoubleSide}),n*5),c=new THREE.Color(),E=new THREE.Euler();let k=0;
  let sd=91;const rr=()=>{sd=(sd*16807)%2147483647;return sd/2147483647};for(let i=0;i<n;i++){if(rr()<.35)continue;const x=herbe[i][0]+(rr()-.5)*3.4,z=herbe[i][1]+(rr()-.5)*3.4,y=h(x,z),s=(R.n==='ouest'?1.1:.8)*(.45+rr()*.7);for(let f=0;f<5;f++){E.set(-.25-((f*7+i)%5)*.06,f*1.26+i,0,'YXZ');Q.setFromEuler(E);M.compose(P.set(x,y,z),Q,Sc.set(s,s,s));im.setMatrixAt(k,M);c.setHex(R.herbe[(i+f)%3]);im.setColorAt(k,c);k++}}
  im.count=k;im.instanceMatrix.needsUpdate=true;if(im.instanceColor)im.instanceColor.needsUpdate=true;S3.add(im)}
 // la teinte de l'air : sèche et dorée à l'ouest, humide ailleurs, fraîche dans les Hauts
 try{if(S3.fog){if(R.n==='ouest'){S3.fog.color.setHex(0xd8d0b0);I.R.setClearColor(0xc8d4d8)}else if(R.n==='hauts'){S3.fog.color.setHex(0xb8c6cc)}}}catch(e){}}
{const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);try{if(INC)vegetation337(INC)}catch(e){console.warn(e)}return r}}
