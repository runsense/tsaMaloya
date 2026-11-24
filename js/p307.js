// ===== p307 : les arbres autour du lieu ouvert ne surgissent plus et ne s'éteignent plus d'un coup =====
// Quand on change de lieu ou qu'on le referme, l'ancienne couronne de forêt rapetisse jusqu'au sol pendant que la nouvelle pousse
// (0,6 à 0,9 s), au lieu de disparaître et d'apparaître. Les Hauts prennent partout le même tamarin (lieu, couronne, carte).
function fondu307(G,entre,ms){try{const L=[];G.traverse(o=>{if(o.isInstancedMesh){const n=o.count,B=[];const M=new THREE.Matrix4();for(let i=0;i<n;i++){o.getMatrixAt(i,M);B.push(M.clone())}L.push([o,B])}});
 const t0=performance.now(),M=new THREE.Matrix4(),P=new THREE.Vector3(),Q=new THREE.Quaternion(),S3=new THREE.Vector3();
 const pas=()=>{const u=Math.min(1,(performance.now()-t0)/ms),e=u*u*(3-2*u),k=entre?e:1-e;
  L.forEach(([o,B])=>{B.forEach((b,i)=>{b.decompose(P,Q,S3);// chaque arbre a son petit décalage : la forêt pousse par vagues, pas d'un bloc
    const d=((i*2654435761)>>>0)%100/100*.35,kk=Math.max(0,Math.min(1,entre?(k-d)/(1-d):k/(1-d)));M.compose(P,Q,S3.multiplyScalar(Math.max(.001,kk)));o.setMatrixAt(i,M)});o.instanceMatrix.needsUpdate=true});
  if(u<1)requestAnimationFrame(pas);else if(!entre){scene.remove(G);G.traverse(o=>{if(o.isInstancedMesh)o.dispose&&o.dispose()})}};
 if(entre)L.forEach(([o])=>{for(let i=0;i<o.count;i++){o.getMatrixAt(i,M);M.decompose(P,Q,S3);M.compose(P,Q,S3.set(.001,.001,.001));o.setMatrixAt(i,M)}o.instanceMatrix.needsUpdate=true});
 requestAnimationFrame(pas)}catch(e){if(!entre)try{scene.remove(G)}catch(_){}}}
