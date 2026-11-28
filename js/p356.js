// ===== p356 : les « boules vertes » sans nom. C'était le remplissage de la forêt : des houppiers génériques (icosaèdres
// texturés de feuilles) qui figurent la masse des bois, sans essence. Près du chemin, ils deviennent les vrais arbres
// de la région (tamarins, bois de couleur, palmistes, benjoins…) ; au loin, ils restent des masses arrondies, comme
// une forêt vue de loin dans une aquarelle. v492 : plus de frontière nette (34 m) entre les vrais arbres et les masses — jusqu'à 50 m tout est
// remplacé, puis de moins en moins jusqu'à 120 m, en mélange, pour un fondu ; sur le sentier même, plus aucune masse. =====
function essences356(I){if(!I||!I.S3||I.e356)return;I.e356=1;const R=typeof region337==='function'?region337(I.C):{arb:['plante_arbre','plante_fanjan','plante_palmiste']};
 const M=new THREE.Matrix4(),P=new THREE.Vector3(),Q=new THREE.Quaternion(),Sc=new THREE.Vector3(),cand=[];
 I.S3.traverse(o=>{if(!o.isInstancedMesh||o.count<40||!o.material||Array.isArray(o.material))return;const c=o.material.color;if(!c)return;const h={};c.getHSL(h);if(!(h.h>.2&&h.h<.42&&h.s>.2))return;if(!/Icosahedron|Sphere/.test(o.geometry.type)&&!o.userData.f354)return;cand.push(o);// la texture « à facettes » de ces boules : retirée, une teinte unie par masse
 if(o.material.map){o.material=o.material.clone();o.material.map=null;o.material.color.offsetHSL(0,-.05,.04);o.material.needsUpdate=true}});
 const pres=[];cand.forEach(o=>{for(let i=0;i<o.count;i++){o.getMatrixAt(i,M);M.decompose(P,Q,Sc);if(Sc.x<.01)continue;const d=I.dPiste(P.x,P.z);if(d<=2.4){M.makeScale(0,0,0);o.setMatrixAt(i,M);continue}const pr=d<50?1:d<120?1-(d-50)/70:0,hs=((i*2654435761)>>>0)%1000/1000;if(hs<pr){pres.push([P.x,P.z,Sc.x,o.geometry.boundingSphere?o.geometry.boundingSphere.radius:1.6]);M.makeScale(0,0,0);o.setMatrixAt(i,M)}}o.instanceMatrix.needsUpdate=true});
 if(!pres.length)return;const L=R.arb;L.forEach((nom,k)=>{const ids=pres.filter((p,i)=>i%L.length===k);if(!ids.length)return;arbGeo153(nom).then(parts=>{if(INC!==I)return;parts.forEach(pt=>{const im=new THREE.InstancedMesh(pt.ge,pt.mat,ids.length);
   ids.forEach(([x,z,s,r],j)=>{const H=Math.min(9,Math.max(3.5,s*r*1.5))*(nom==='plante_palmiste'||nom==='plante_latanier'?1.25:1);M.compose(P.set(x,I.hAt(x,z)-.1,z),Q.setFromAxisAngle(new THREE.Vector3(0,1,0),(j*2.39)%6.28),Sc.set(H*(.85+(j%5)*.06),H,H*(.85+(j%3)*.08)));im.setMatrixAt(j,M)});
   im.instanceMatrix.needsUpdate=true;im.userData.essence=nom.replace('plante_','');I.S3.add(im)})}).catch(()=>{})})}
{const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);try{const I=INC;setTimeout(()=>{try{if(INC===I)essences356(I)}catch(e){}},2600)}catch(e){}return r}}
