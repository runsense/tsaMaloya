// ===== p413 : la Grotte des Premiers Français, comme sur les photos de Saint-Paul : un grand abri sous roche au pied de la
// falaise, un auvent de basalte très large et bas, des fougères et des racines qui pendent du rebord, une ombre profonde,
// et devant, l'eau de la source et les songes (taro) — là où Payen et ses compagnons s'abritent en 1663 avant que les
// premières cases n'existent. Le dessin remplace, pour les grottes habitées, l'arc de rochers de p387 et le modèle de crèche. =====
const GR413={};
function grotte413(t){if(typeof scene==='undefined')return null;const cle='g413_'+t.i;let g=scene.getObjectByName(cle);if(g)return g;
 g=new THREE.Group();g.name=cle;g.userData.ti=t.i;const M=(c,o={})=>new THREE.MeshLambertMaterial(Object.assign({color:c},o));
 const roc=M(0x5e5a52,{flatShading:true}),rocS=M(0x3a3732),mousse=M(0x3f6a2c,{flatShading:true}),ombre=new THREE.MeshBasicMaterial({color:0x080706});
 // la falaise derrière
 for(let i=0;i<9;i++){const f=i/8*2-1,b=new THREE.Mesh(new THREE.DodecahedronGeometry(.26+Math.random()*.08,0),roc);b.scale.set(1.1,1.3+(1-Math.abs(f))*.5,.8);b.position.set(f*.7,.32+(1-Math.abs(f))*.12,-.34-Math.random()*.06);b.rotation.set(Math.random(),Math.random()*3,Math.random());g.add(b);
  const m=new THREE.Mesh(new THREE.DodecahedronGeometry(.16,0),mousse);m.scale.set(1.3,.5,1);m.position.set(f*.7,.66+(1-Math.abs(f))*.12,-.36);g.add(m)}
 // l'auvent : un demi-cylindre aplati, très large, qui avance au-dessus de l'entrée
 const auv=new THREE.Mesh(new THREE.CylinderGeometry(.62,.66,.16,28,1,false,Math.PI/2,Math.PI),roc);auv.scale.set(1.05,1,.55);auv.position.set(0,.47,-.12);g.add(auv);
 const dess=new THREE.Mesh(new THREE.CircleGeometry(.6,28,0,Math.PI),rocS);dess.rotation.x=Math.PI/2;dess.scale.set(1.05,.55,1);dess.position.set(0,.388,-.12);dess.rotation.z=Math.PI;g.add(dess);
 const dessus=new THREE.Mesh(new THREE.CircleGeometry(.62,28,0,Math.PI),mousse);dessus.rotation.x=-Math.PI/2;dessus.scale.set(1.05,.55,1);dessus.position.set(0,.552,-.12);dessus.rotation.z=Math.PI;g.add(dessus);
 // l'ombre de l'abri, profonde et basse
 const tr=new THREE.Mesh(new THREE.PlaneGeometry(1.0,.3),ombre);tr.position.set(0,.2,-.14);g.add(tr);
 const sol=new THREE.Mesh(new THREE.PlaneGeometry(1.1,.32),M(0x7a5a3e));sol.rotation.x=-Math.PI/2;sol.position.set(0,.012,-.02);g.add(sol);
 // fougères et racines qui pendent du rebord
 const fm=M(0x5f9a3c,{side:THREE.DoubleSide}),fr=M(0x3d6a2a,{side:THREE.DoubleSide});
 for(let i=0;i<46;i++){const a=Math.PI*(i/45),r=.62*(.96+Math.random()*.06),x=Math.cos(a)*r*1.05,z=-.12+Math.sin(a)*r*.55,L=.06+Math.random()*.17;
  const f=new THREE.Mesh(new THREE.PlaneGeometry(.012+Math.random()*.02,L),Math.random()<.5?fm:fr);f.position.set(x,.39-L/2,z);f.rotation.y=Math.random()*3;g.add(f)}
 // l'eau de la source et les songes devant
 const eau=new THREE.Mesh(new THREE.PlaneGeometry(.9,.3),M(0x5a5a3a,{transparent:true,opacity:.85}));eau.rotation.x=-Math.PI/2;eau.position.set(-.05,.01,.28);g.add(eau);
 const sg=M(0x4c8a3a,{side:THREE.DoubleSide});
 for(let i=0;i<40;i++){const x=-.45+Math.random()*.85,z=.16+Math.random()*.26,h=.04+Math.random()*.04;const st=new THREE.Mesh(new THREE.CylinderGeometry(.003,.004,h,4),fr);st.position.set(x,h/2,z);g.add(st);
  const f=new THREE.Mesh(new THREE.CircleGeometry(.032+Math.random()*.02,8),sg);f.scale.y=1.25;f.position.set(x,h,z);f.rotation.set(-1.1+Math.random()*.5,Math.random()*6.28,0);g.add(f)}
 // deux vacoas au coin, comme sur les photos
 [[.62,.05],[-.66,.1]].forEach(([x,z])=>{const tc=new THREE.Mesh(new THREE.CylinderGeometry(.008,.012,.14,5),M(0x6a5236));tc.position.set(x,.07,z);g.add(tc);
  for(let k=0;k<12;k++){const l=new THREE.Mesh(new THREE.PlaneGeometry(.012,.13),fr);l.position.set(x,.15,z);l.rotation.set(Math.random()*1.4-.7,k*.52,Math.random()*1.2-.6);l.translateY(.05);g.add(l)}});
 g.scale.setScalar(.32);scene.add(g);return g}
{const gd=grotteDessin387;grotteDessin387=function(t){try{if(!S||!S.voieC||S.year>=1666)return gd.apply(this,arguments);
  const g=grotte413(t);if(!g)return gd.apply(this,arguments);
  // dos à la pente, ouverture vers la baie
  let ux=0,uz=-1;const d=.6,gx=alt(t.x+d,t.z)-alt(t.x-d,t.z),gz=alt(t.x,t.z+d)-alt(t.x,t.z-d),n=Math.hypot(gx,gz);if(n>1){ux=gx/n;uz=gz/n}
  g.position.set(t.x+ux*.1,alt(t.x,t.z)*VX,t.z+uz*.1);g.rotation.y=Math.atan2(-ux,-uz);g.visible=true;return}catch(e){return gd.apply(this,arguments)}}}
// quand la grotte n'est plus habitée (Regnault, 1665 : les premières cases), elle disparaît
setInterval(()=>{try{if(typeof scene==='undefined'||!S)return;scene.children.forEach(o=>{if(!/^g413_/.test(o.name||''))return;const ti=o.userData.ti,ok=S.voieC&&S.year<1666&&S.t[ti]&&S.t[ti].b==='camp'&&typeof grotte387==='function'&&grotte387(T[ti],S.t[ti]);o.visible=!!ok})}catch(e){}},1500);
