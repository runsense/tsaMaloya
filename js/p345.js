// ===== p345 : dans les incarnations, les gros rochers arrêtent le pas (on ne les traverse plus).
// (p287 : surface exacte du sol, lit de rivière creusé, collines adoucies, pente et glissade sous la pluie) =====
{const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);try{const I=INC;if(!I||!I.S3||!I.AG)return r;const M=new THREE.Matrix4(),V=new THREE.Vector3(),Q=new THREE.Quaternion(),Sc=new THREE.Vector3(),ag=(x,z)=>Math.floor(x/4)+','+Math.floor(z/4);let n=0;
 I.S3.traverse(m=>{if(!m.isMesh||m.userData.roc345)return;const g=m.geometry;if(!/Dodecahedron|Icosahedron/.test(g.type)||!m.material||!m.material.color)return;const c=m.material.color,mx=Math.max(c.r,c.g,c.b),mn=Math.min(c.r,c.g,c.b);if(mx-mn>.06||mx>.55)return;// gris : un rocher (pas un feuillage)
  m.userData.roc345=1;if(!g.boundingSphere)g.computeBoundingSphere();const R0=g.boundingSphere.radius;
  const add=(x,z,s)=>{const rr=R0*s*.8;if(rr<.18||I.dPiste(x,z)<rr+.4)return;const a={x,z,r:rr,roc:1};(I.AG[ag(x,z)]||(I.AG[ag(x,z)]=[])).push(a);n++};
  if(m.isInstancedMesh){for(let i=0;i<m.count;i++){m.getMatrixAt(i,M);M.decompose(V,Q,Sc);add(V.x,V.z,Math.max(Sc.x,Sc.z))}}else{m.updateMatrixWorld();m.getWorldPosition(V);m.getWorldScale(Sc);add(V.x,V.z,Math.max(Sc.x,Sc.z))}});
 I.roc345=n}catch(e){}return r}}
// ----- p345 : concordance du conte. Constaté au test (1663→1837) : la cohésion restait clouée à 100 pendant 150 ans,
// et les vivres s'entassaient (110 pour 12 personnes). Sous les tropiques, la nourriture ne se garde pas, et un grand camp se divise. -----
{const o=fx;fx=function(q){if(q&&S){q={...q};for(const k of ['coh','sante'])if(q[k]>0&&(S[k]??0)>75)q[k]*=Math.max(.15,(100-S[k])/25)}return o.call(this,q)}}
{const o=saison;saison=function(){const r=o.apply(this,arguments);try{if(S&&!S.fin){const g=Math.max(1,S.gens||1);
 if(S.coh>60&&g>15)S.coh=Math.max(60,S.coh-(S.coh-60)*Math.min(.12,.002*g));
 const garde=g*2.5+(S.sv&&S.sv.reserves?g:0)+(typeof nBat==='function'?nBat('grenier')*30+nBat('magasin')*30:0);if(S.vivres>garde){const perte=Math.round((S.vivres-garde)*.12);if(perte>0){S.vivres-=perte;S.pourri345=(S.pourri345||0)+perte}}}}catch(e){}return r}}
// ----- p345 : le temps du camp compte vraiment. Constaté au test : douze journées au camp (deux saisons, d'après p323)
// et, en ressortant, l'histoire était toujours à la même année. Désormais, six journées au camp = une saison du conte :
// en sortant, les saisons vécues au camp passent (détachements, cyclones, nouvelles de l'île), mais les vivres restent
// ce que le camp a réellement mangé et rapporté — le conte ne les recompte pas. -----
{const jt=jourTick;jourTick=function(){const on=typeof VIE315!=='undefined'&&VIE315.on&&S,j0=S&&S.jourN;const r=jt.apply(this,arguments);try{if(on&&S.jourN!==j0)S.campJ345=(S.campJ345||0)+1}catch(e){}return r}}
{const e0=entrer315;entrer315=function(){try{if(S)S.campJ345=S.campJ345||0}catch(e){}return e0.apply(this,arguments)}}
{const s0=sortir315;sortir315=function(){const etait=typeof VIE315!=='undefined'&&VIE315.on;const r=s0.apply(this,arguments);try{if(etait&&S&&!S.fin){let n=Math.floor((S.campJ345||0)/6),fait=0;const an0=S.year;
 while(n>0&&!S.evq.length&&!S.fin){const v=S.vivres;saison();S.vivres=v;n--;fait++;S.campJ345-=6}
 if(fait&&typeof toast==='function')toast(fait+' saison'+(fait>1?'s':'')+' au camp : l’histoire reprend en '+S.year+(S.year!==an0?' (vous étiez entrés en '+an0+')':'')+'.');
 try{rafraichir()}catch(e){}}}catch(e){}return r}}
