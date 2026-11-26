// ===== p348 : plus de pyramides. L'habitation du départ (une boîte blanche au toit en pyramide) devient la vraie maison de maître ;
// les cases de l'arrivée (des cônes) deviennent des cases en paille ; le feu a son rond de pierres et ses bûches. =====
function cases348(I){if(!I||!I.S3||I.c348)return;I.c348=1;const S3=I.S3,h=I.hAt,L=[];
 S3.children.forEach(o=>{if(!o.isMesh||o.isInstancedMesh||!o.geometry)return;const g=o.geometry,p=g.parameters||{},c=o.material&&o.material.color&&o.material.color.getHex();
  if(g.type==='BoxGeometry'&&p.width===9&&p.height===3.2&&c===0xece4d2)L.push(['bat_habitation',o,6.5,0]);
  else if(g.type==='ConeGeometry'&&p.radius===1.7&&c===0x9a8048)L.push(['bat_case_paille',o,3.2,1]);
  else if(g.type==='ConeGeometry'&&p.radius===.5&&p.height===1.2){// le feu
   const fx=o.position.x,fz=o.position.z,y=h(fx,fz);o.scale.set(.6,.7,.6);o.position.y=y+.35;
   const pm=new THREE.MeshLambertMaterial({color:0x4a4744});for(let k=0;k<8;k++){const a=k/8*6.283,s=new THREE.Mesh(typeof roc329==='function'?roc329(.16,k+3):new THREE.SphereGeometry(.16,6,5),pm);s.position.set(fx+Math.cos(a)*.55,h(fx+Math.cos(a)*.55,fz+Math.sin(a)*.55)+.06,fz+Math.sin(a)*.55);S3.add(s)}
   const bm=new THREE.MeshLambertMaterial({color:0x4a3220});for(let k=0;k<3;k++){const b=new THREE.Mesh(new THREE.CylinderGeometry(.06,.08,1,6),bm);b.rotation.set(Math.PI/2-.35,k*2.1,0);b.position.set(fx,y+.18,fz);S3.add(b)}}});
 L.forEach(([n,o,t,paille],ii)=>{if(paille&&typeof case350==='function'){const x=o.position.x,z=o.position.z,f=I.P[I.N-1],c=case350({pil:ii%3===1,auvent:ii%2===0});c.position.set(x,h(x,z)-.05,z);const ang=Math.atan2(f[0]-x,f[1]-z);c.rotation.y=ang;S3.add(c);o.visible=false;try{devant350(S3,h,x,z,ang,ii)}catch(e){}if(ii===0)try{jardin350(S3,h,f[0]-6,f[1]+5,.4)}catch(e){}return}if(typeof mod104!=='function')return;mod104(n).then(T=>{if(INC!==I)return;const m=clone104(T,t);const x=o.position.x,z=o.position.z;m.position.set(x,h(x,z)-.05,z);
  // la case regarde le feu (au centre de l'arrivée), la maison regarde le chemin
  const f=I.P[paille?I.N-1:0];m.rotation.y=Math.atan2(f[0]-x,f[1]-z);S3.add(m);o.visible=false}).catch(()=>{})})}
{const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);try{if(INC)cases348(INC)}catch(e){console.warn('p348',e)}return r}}
