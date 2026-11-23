// ===== p234 : des rochers moins géométriques — les modèles de pierre ont des pointes partout ; on les lisse (lissage de Taubin, qui ne fait pas
// fondre la pierre), on garde l'ombrage doux, et seules une ou deux grandes faces restent franches (le lissage laisse les grands plans). =====
function lisse234(g0,iter){const g=g0.index?g0.toNonIndexed():g0.clone();const P=g.attributes.position,n=P.count,cle=new Map(),id=new Int32Array(n),pts=[];
 for(let i=0;i<n;i++){const k=Math.round(P.getX(i)*1e4)+'|'+Math.round(P.getY(i)*1e4)+'|'+Math.round(P.getZ(i)*1e4);let j=cle.get(k);if(j==null){j=pts.length;cle.set(k,j);pts.push([P.getX(i),P.getY(i),P.getZ(i)])}id[i]=j}
 const V=pts.length,nb=Array.from({length:V},()=>new Set());for(let f=0;f<n;f+=3){const a=id[f],b=id[f+1],c=id[f+2];nb[a].add(b).add(c);nb[b].add(a).add(c);nb[c].add(a).add(b)}
 const pas=(k)=>{const N=pts.map(p=>p.slice());for(let v=0;v<V;v++){const s=nb[v];if(!s.size)continue;let x=0,y=0,z=0;s.forEach(u=>{x+=pts[u][0];y+=pts[u][1];z+=pts[u][2]});x/=s.size;y/=s.size;z/=s.size;N[v][0]+=(x-pts[v][0])*k;N[v][1]+=(y-pts[v][1])*k;N[v][2]+=(z-pts[v][2])*k}for(let v=0;v<V;v++)pts[v]=N[v]};
 for(let i=0;i<(iter||4);i++){pas(.5);pas(-.53)}
 for(let i=0;i<n;i++){const p=pts[id[i]];P.setXYZ(i,p[0],p[1],p[2])}P.needsUpdate=true;
 // de nouveau partagé, pour un ombrage doux
 const g2=new THREE.BufferGeometry();g2.setAttribute('position',new THREE.Float32BufferAttribute(pts.flat(),3));g2.setIndex(Array.from(id));g2.computeVertexNormals();{const N=g2.attributes.normal;for(let i=0;i<N.count;i++){if(!isFinite(N.getX(i))||!isFinite(N.getY(i))||!isFinite(N.getZ(i)))N.setXYZ(i,0,1,0)}}return g2}
const LIS234=new Map();
setInterval(()=>{try{if(typeof MOD!=='undefined'&&MOD.rocher&&!MOD.rocher.geometry.userData.l234){const g=lisse234(MOD.rocher.geometry,4);g.userData.l234=1;MOD.rocher.geometry=g;if(MOD.rocher.material){MOD.rocher.material.flatShading=false;MOD.rocher.material.vertexColors=false;MOD.rocher.material.color&&MOD.rocher.material.color.setHex(0x5e5a52);MOD.rocher.material.needsUpdate=true}}
  if(typeof DEC144!=='undefined'&&DEC144.G)DEC144.G.children.forEach(c=>c.traverse(o=>{if(!o.isMesh||!o.material||o.material.type!=='MeshLambertMaterial'||!o.material.flatShading||o.userData.l234)return;o.userData.l234=1;
   let g=LIS234.get(o.geometry.uuid);if(!g){g=lisse234(o.geometry,3);LIS234.set(o.geometry.uuid,g)}o.geometry=g;o.material.flatShading=false;o.material.vertexColors=false;o.material.color.multiplyScalar(.58);o.material.needsUpdate=true}))}catch(e){}},1500);
