// ===== p329 : le décor du camp, autour de soi. Les rochers ne sont plus des dés à facettes : des galets arrondis, bosselés,
// chacun différent. L'herbe n'est plus d'une seule teinte : chaque touffe a la sienne, du vert tendre au jaune sec et au brun. =====
function roc329(r,seed){const g=new THREE.IcosahedronGeometry(r,2),p=g.attributes.position,v=new THREE.Vector3();let s=seed*9301+49297;const rn=()=>{s=(s*16807)%2147483647;return s/2147483647};
 const a=.75+rn()*.2,b=.6+rn()*.25,ph=rn()*6;for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);const n=1+.09*Math.sin(v.x*5/r+ph)*Math.cos(v.z*4/r+ph)+.05*Math.sin(v.y*9/r);v.multiplyScalar(n);v.y*=b;v.x*=a+.2;p.setXYZ(i,v.x,v.y,v.z)}
 g.computeVertexNormals();return g}
function decor329(V){if(!V||!V.sc||V.d329)return;V.d329=1;let n=0;
 V.sc.traverse(o=>{if(!o.isMesh||!o.geometry)return;const g=o.geometry,P=g.parameters||{};
  // les rochers
  if(g.type==='DodecahedronGeometry'&&!P.detail&&(o.material&&!(o.material.emissive&&o.material.emissive.getHex()>0x222222))){const R=P.radius||1;o.geometry=roc329(R,++n);if(o.material&&o.material.flatShading){o.material=o.material.clone();o.material.flatShading=false;o.material.needsUpdate=true}}
  // l'herbe : une teinte par touffe
  if(o.isInstancedMesh&&g.type==='PlaneGeometry'&&o.count>200&&!o.instanceColor){const T=[0x9ac46a,0x7aa04a,0x5a8a3a,0xb8b468,0xa08a4a,0x6a9a50,0xc8c080],c=new THREE.Color();
   for(let i=0;i<o.count;i++){c.setHex(T[(i*7+3)%T.length]);c.offsetHSL(0,0,((i*13)%11-5)*.012);o.setColorAt(i,c)}o.instanceColor.needsUpdate=true;if(o.material){o.material=o.material.clone();o.material.color&&o.material.color.setHex(0xffffff);o.material.needsUpdate=true}}})}
setInterval(()=>{try{if(typeof VP!=='undefined'&&VP&&VP.sc){decor329(VP);if(!VP.d329b){VP.d329b=1;setTimeout(()=>{try{if(VP){VP.d329=0;decor329(VP)}}catch(e){}},6000)}}}catch(e){}},1000);
