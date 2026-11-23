// ===== p229 : les bassins des cascades, chacun le sien =====
// Avant : tous ronds, tous pareils, la chute bien droite, et souvent un vide sous le bassin quand la pente est forte.
// Maintenant : bassin ovale et tourné au hasard, taille variable, galets de tailles différentes, chute un peu penchée et de largeur inégale,
// et une jupe de roche sous le bassin qui descend jusqu'au terrain : plus de bassin suspendu dans le vide.
const BAS229={roc:null};
function bassin229(G,i){if(G.userData.b229)return;const kids=G.children;const bas=kids.find(c=>c.geometry&&c.geometry.type==='CircleGeometry');if(!bas)return;G.userData.b229=1;
 const h=q=>rndH(i*17.3+q),sx=.75+h(1)*.55,sz=.7+h(2)*.5,ry=(h(3)-.5)*1.4;
 const rive=kids.find(c=>c.geometry&&c.geometry.type==='RingGeometry');
 // le bassin et sa rive : ovale, tourné, à sa taille
 [bas,rive].forEach(m=>{if(!m)return;m.scale.set(sx,1,sz);m.rotation.y=ry});
 // la jupe de roche sous le bassin, jusqu'au sol
 try{if(!BAS229.roc)BAS229.roc=new THREE.MeshLambertMaterial({color:0x5e5a50,flatShading:true});const R=bas.geometry.parameters.radius;
  G.updateMatrixWorld(true);const wp=new THREE.Vector3();bas.getWorldPosition(wp);const sol=Math.max(0,alt(wp.x,wp.z))*VX,creux=Math.max(.06,wp.y-sol+.12);
  const j=new THREE.Mesh(new THREE.CylinderGeometry(R*1.05,R*1.5,creux,12,1,true),BAS229.roc);j.position.set(bas.position.x,bas.position.y-creux/2-.002,bas.position.z);j.scale.set(sx,1,sz);j.rotation.y=ry;G.add(j);
  const fond=new THREE.Mesh(new THREE.CircleGeometry(R*.98,14).rotateX(-Math.PI/2),new THREE.MeshLambertMaterial({color:0x1d4450}));fond.position.set(bas.position.x,bas.position.y-.004,bas.position.z);fond.scale.set(sx,1,sz);fond.rotation.y=ry;fond.renderOrder=-1;G.add(fond)}catch(e){}
 // les galets : chacun sa taille, un peu dérangés
 kids.forEach((c,k)=>{if(c.geometry&&c.geometry.type==='DodecahedronGeometry'){c.position.x+=(h(10+k)-.5)*.02;c.position.z+=(h(40+k)-.5)*.02;c.scale.multiplyScalar(.55+h(70+k)*.95);c.rotation.set(h(90+k)*6,h(95+k)*6,0);if(h(99+k)<.15)c.visible=false}});
 // la chute : penchée, largeur inégale
 kids.forEach(c=>{if(c.material&&c.material.type==='ShaderMaterial'&&c.geometry.type==='PlaneGeometry'){c.rotation.x=-(.05+h(5)*.18);c.rotation.z=(h(6)-.5)*.16;c.scale.x=.7+h(7)*.7}})}
setInterval(()=>{try{if(typeof C147==='undefined'||!C147.L)return;C147.L.forEach((G,i)=>{if(G.userData.ab148||!G.userData.petite)bassin229(G,i)})}catch(e){}},2000);
