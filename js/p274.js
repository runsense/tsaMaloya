// ===== p274 : le paille-en-queue prend ses vraies couleurs et son vrai vol, d'après les photos de l'auteur :
// bec jaune orangé, sourcil noir derrière l'œil, barre noire en diagonale sur le dessus de l'aile, bout des grandes plumes noir ;
// un battement rapide et souple, entrecoupé de courtes glissades, les deux brins de la queue qui ondulent derrière. =====
function peint274(geos){const b=new THREE.Box3();geos.forEach(g=>{g.computeBoundingBox();b.union(g.boundingBox)});const c=b.getCenter(new THREE.Vector3()),h=b.getSize(new THREE.Vector3()).multiplyScalar(.5);
 const JA=[.95,.68,.16],NO=[.06,.06,.07],BL=[1,1,1];
 geos.forEach(g=>{const p=g.attributes.position,n=p.count,C=new Float32Array(n*3);
  for(let i=0;i<n;i++){const x=(p.getX(i)-c.x)/(h.x||1),y=(p.getY(i)-c.y)/(h.y||1),z=(p.getZ(i)-c.z)/(h.z||1),az=Math.abs(z);let col=BL;
   if(y>.84&&x>.8&&az<.12)col=JA;                              // le bec (la tête est en haut du modèle, le bec vers +x)
   else if(y>.83&&x>.5&&x<=.8&&az>.045&&az<.24)col=NO;          // le sourcil noir, de l'œil vers la nuque
   else if(az>.22&&az<.5&&y>-.02&&y<.22&&(az-.22)*.55>y-.02-.1&&(az-.22)*.55<y+.08)col=NO; // la barre diagonale du dessus de l'aile
   else if(az>.86&&y>.05)col=NO;                              // le bout des grandes rémiges
   C[i*3]=col[0];C[i*3+1]=col[1];C[i*3+2]=col[2]}
  g.setAttribute('color',new THREE.BufferAttribute(C,3))})}
{const i0=inst144;inst144=function(n,o){const r=i0.apply(this,arguments);if(n!=='oi_phaeton')return r;return r.then(x=>{try{const G=[],M=[];x.w.traverse(m=>{if(m.isMesh&&m.geometry&&m.geometry.attributes.position){if(!m.geometry.userData.p274){m.geometry=m.geometry.clone();m.geometry.userData.p274=1}G.push(m.geometry);M.push(m)}});peint274(G);
  M.forEach(m=>{(Array.isArray(m.material)?m.material:[m.material]).forEach(mt=>{mt.vertexColors=true;mt.needsUpdate=true})})}catch(e){}return x})}}
// le vol : battements rapides, petites glissades ; chaque oiseau à son rythme (pas tous ensemble)
try{AIL167.P.oi_phaeton={f:4.6,a:1.05,plane:.28,ph:.12,queue:1}}catch(e){}
