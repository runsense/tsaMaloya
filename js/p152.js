
// ===== p152 : un vrai camp dans la vue personnage =====
// Le camp (au centre, à 30 pas derrière le point de départ) n'était que cinq boîtes à toit pointu et une lumière sans flamme.
// Désormais : les vraies cases de paille (modèles Meshy du jeu) — ou la maison du maître et les cases chez les colons —, un grenier,
// un sol de terre battue, le foyer entouré de pierres avec sa flamme, sa marmite sur trois pierres et sa fumée, un boucan (claie à fumer la viande),
// des bancs de troncs, des sagaies appuyées, un petit jardin de songes et de maïs.
const CAMP152={sc:null};
function vpCamp152(V){const sc=V.sc,h=V.h,cx=0,cz=-30,Y=(x,z)=>h(x,z);
 // 1) les boîtes deviennent de vraies cases
 const boites=sc.children.filter(o=>o.isMesh&&o.geometry&&o.geometry.type==='BoxGeometry'&&o.geometry.parameters&&(o.geometry.parameters.width===2.4||o.geometry.parameters.width===7));
 boites.forEach(b=>{const maitre=b.geometry.parameters.width===7,nom=maitre?'bat_habitation':'bat_case_paille',p=b.position.clone(),q=b.quaternion.clone();
  if(typeof mod104!=='function')return;mod104(nom).then(T0=>{const o=clone104(T0,maitre?4.6:2.7);o.position.set(p.x,Y(p.x,p.z),p.z);o.lookAt(cx,o.position.y,cz);o.rotateY(Math.PI);harmonise144&&harmonise144(o);sc.add(o);b.visible=false}).catch(()=>{})});
 const G=new THREE.Group();sc.add(G);
 // 2) le sol de terre battue
 try{const tex=typeof tx125==='function'?tx125('mud_forest',4):null;const sol=new THREE.Mesh(new THREE.CircleGeometry(9.5,40).rotateX(-Math.PI/2),new THREE.MeshLambertMaterial({color:0x9a7a58,map:tex||null,transparent:true,opacity:.92}));sol.position.set(cx,Y(cx,cz)+.04,cz);sol.renderOrder=1;G.add(sol)}catch(e){}
 // 3) le foyer : pierres, bûches, flamme, marmite, fumée
 const pierre=new THREE.MeshLambertMaterial({color:0x5c5852}),bois=new THREE.MeshLambertMaterial({color:0x4a3220}),fer=new THREE.MeshLambertMaterial({color:0x26221e});
 for(let k=0;k<9;k++){const a=k/9*6.283,s=new THREE.Mesh(new THREE.DodecahedronGeometry(.22,0),pierre);s.position.set(cx+Math.cos(a)*.75,Y(cx,cz)+.12,cz+Math.sin(a)*.75);s.rotation.set(k,k*2,0);G.add(s)}
 if(typeof feuNouveau135==='function'){const f=feuNouveau135();if(f.parent)f.parent.remove(f);f.scale.setScalar(4);f.position.set(cx,Y(cx,cz),cz);G.add(f);CAMP152.feu=f}
 [0,2.1,4.2].forEach(a=>{const p=new THREE.Mesh(new THREE.CylinderGeometry(.06,.07,1.6,5),bois);p.position.set(cx+Math.cos(a)*.55,Y(cx,cz)+.7,cz+Math.sin(a)*.55);p.lookAt(cx,Y(cx,cz)+1.5,cz);p.rotateX(Math.PI/2);G.add(p)});
 const mar=new THREE.Mesh(new THREE.SphereGeometry(.38,12,8,0,6.283,Math.PI*.35,Math.PI*.65),fer);mar.position.set(cx,Y(cx,cz)+1.05,cz);G.add(mar);
 const fum=[];for(let k=0;k<10;k++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:typeof brumeTex147==='function'?brumeTex147():null,color:0x9a9690,transparent:true,opacity:.35,depthWrite:false}));s.userData.ph=k/10;G.add(s);fum.push(s)}CAMP152.fum=fum;CAMP152.c=[cx,Y(cx,cz),cz];
 // 4) le grenier, le boucan, les bancs, les sagaies, le jardin
 if(typeof mod104==='function')mod104('bat_grenier').then(T0=>{const o=clone104(T0,2.4);const x=cx-8,z=cz-3;o.position.set(x,Y(x,z),z);o.lookAt(cx,o.position.y,cz);sc.add(o);V.arb.push({x,z,r:1.3})}).catch(()=>{});
 {const x=cx+3.2,z=cz+2.2;[[-.8,-.5],[.8,-.5],[-.8,.5],[.8,.5]].forEach(([a,b])=>{const p=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,1.6,5),bois);p.position.set(x+a,Y(x,z)+.8,z+b);G.add(p)});
  const cl=new THREE.Mesh(new THREE.BoxGeometry(1.8,.06,1.2),new THREE.MeshLambertMaterial({color:0x6a5236}));cl.position.set(x,Y(x,z)+1.55,z);G.add(cl);
  for(let k=0;k<4;k++){const v=new THREE.Mesh(new THREE.BoxGeometry(.35,.12,.18),new THREE.MeshLambertMaterial({color:0x6a2a1e}));v.position.set(x-.6+k*.4,Y(x,z)+1.65,z);G.add(v)}V.arb.push({x,z,r:1})}
 [[-2.4,1.6,.4],[2.2,-2.3,-.6],[-1.6,-2.6,1.1]].forEach(([dx,dz,r])=>{const x=cx+dx,z=cz+dz,t=new THREE.Mesh(new THREE.CylinderGeometry(.22,.24,1.8,7),bois);t.rotation.z=Math.PI/2;t.rotation.y=r;t.position.set(x,Y(x,z)+.22,z);G.add(t)});
 {const x=cx+5.2,z=cz-4.5;for(let k=0;k<4;k++){const s=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,2.4,4),bois);s.position.set(x+k*.18,Y(x,z)+1.1,z);s.rotation.z=.25;G.add(s);const tip=new THREE.Mesh(new THREE.ConeGeometry(.05,.25,4),fer);tip.position.y=1.25;s.add(tip)}}
 {const x=cx-3,z=cz+7.5,j=new THREE.Mesh(new THREE.PlaneGeometry(4,2.6).rotateX(-Math.PI/2),new THREE.MeshLambertMaterial({color:0x5a3e22}));j.position.set(x,Y(x,z)+.05,z);G.add(j);
  for(let k=0;k<18;k++){const m=new THREE.Mesh(new THREE.ConeGeometry(.12,.7,5),new THREE.MeshLambertMaterial({color:k%3?0x4f8a30:0x6a9a3a}));const px=x-1.7+(k%6)*.68,pz=z-.9+Math.floor(k/6)*.9;m.position.set(px,Y(px,pz)+.35,pz);G.add(m)}}
 V.arb.push({x:cx,z:cz,r:1})}
(function boucle152(){requestAnimationFrame(boucle152);try{const V=typeof VP!=='undefined'&&VP;if(!V||!V.sc||typeof V.h!=='function'){CAMP152.sc=null;return}
  if(CAMP152.sc!==V.sc){CAMP152.sc=V.sc;if(!(typeof VPLIEU!=='undefined'&&VPLIEU&&VPLIEU.g))vpCamp152(V);return}
  const t=performance.now()/1000;if(CAMP152.feu&&V.cam){CAMP152.feu.userData.a.quaternion.copy(V.cam.quaternion);CAMP152.feu.userData.lu.material.opacity=.2+.06*Math.sin(t*11)}
  if(CAMP152.fum){const [x,y,z]=CAMP152.c;CAMP152.fum.forEach(s=>{const u=(t*.12+s.userData.ph)%1;s.position.set(x+u*1.6+Math.sin(t+u*6)*.3,y+1.4+u*7,z+u*.5);s.scale.setScalar(.8+u*3.5);s.material.opacity=.38*(1-u)})}}catch(e){}})();
