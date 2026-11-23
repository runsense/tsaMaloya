// ===== p227 : le makwa (noddi brun) dessiné pour le jeu — corps brun, calotte blanche, longues ailes pointues qui battent, queue en coin.
// Avant, on prenait le pétrel teinté en uni : vu de côté, il faisait une planche. =====
const MK227={mats:null,L:[]};
function makwa227(){if(!MK227.mats)MK227.mats={b:new THREE.MeshLambertMaterial({color:0x6a5444,side:THREE.DoubleSide}),c:new THREE.MeshLambertMaterial({color:0xeeeae0}),k:new THREE.MeshLambertMaterial({color:0x222018})};const M=MK227.mats;
 const g=new THREE.Group(),corps=new THREE.Mesh(new THREE.SphereGeometry(.02,8,6),M.b);corps.scale.set(.8,.75,2.2);g.add(corps);
 const tete=new THREE.Mesh(new THREE.SphereGeometry(.014,8,6),M.b);tete.position.set(0,.006,.042);g.add(tete);
 const cal=new THREE.Mesh(new THREE.SphereGeometry(.0105,8,6,0,6.28,0,1.3),M.c);cal.position.set(0,.011,.045);g.add(cal);
 const bec=new THREE.Mesh(new THREE.ConeGeometry(.004,.022,5).rotateX(Math.PI/2),M.k);bec.position.set(0,.004,.064);g.add(bec);
 const s=new THREE.Shape();s.moveTo(0,0);s.lineTo(.03,.012);s.quadraticCurveTo(.08,.006,.13,-.022);s.lineTo(.05,-.012);s.lineTo(0,-.018);
 const ga=new THREE.ShapeGeometry(s).rotateX(-Math.PI/2);const aD=new THREE.Group(),aG=new THREE.Group();aD.add(new THREE.Mesh(ga,M.b));const mG=new THREE.Mesh(ga,M.b);mG.scale.x=-1;aG.add(mG);aD.position.set(.008,.004,.004);aG.position.set(-.008,.004,.004);g.add(aD,aG);
 const q=new THREE.Shape();q.moveTo(-.008,0);q.lineTo(.008,0);q.lineTo(.014,-.04);q.lineTo(0,-.03);q.lineTo(-.014,-.04);const qu=new THREE.Mesh(new THREE.ShapeGeometry(q).rotateX(-Math.PI/2),M.b);qu.position.set(0,.002,-.035);g.add(qu);
 g.userData.ailes227=[aD,aG];g.userData.ph227=Math.random()*6;g.scale.setScalar(1.6);MK227.L.push(g);return g}
// le battement : lent et ample, avec des temps de plané
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{const t=performance.now()/1000;MK227.L=MK227.L.filter(g=>g.parent);MK227.L.forEach(g=>{if(!g.visible)return;const p=g.userData.ph227,cyc=(t*.35+p)%1,bat=cyc<.65?Math.sin(t*7+p)*.55:.08,[d,gg]=g.userData.ailes227;d.rotation.z=bat;gg.rotation.z=-bat})}catch(e){}return r}}
