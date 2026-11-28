// ===== p394 : la case créole et l'étable des crèches de l'auteur, assemblées, près des habitations des colons.
// La case : murs clairs, varangue, lambrequins. Le toit change avec le temps : bardeaux de bois (gris-brun) d'abord,
// tôle peinte en rouge à partir de 1880 environ (la tôle ondulée arrive tard dans l'île ; date exacte non trouvée, approximative).
// Les lambrequins et la varangue sont plutôt du XIXᵉ siècle : la case n'apparaît qu'à partir de 1800 (approximatif).
// L'étable abrite les bœufs des habitations à partir de 1700 (approximatif). Ce sont des décors, sans intérieur. =====
const M394={};['case_kreol','etable_creche'].forEach(n=>{try{mod104(n).then(T=>{M394[n]=T}).catch(()=>{})}catch(e){}});
// variante « bardeaux » : on recolore le rouge du toit en gris-brun, sur une copie de la géométrie
function bardeaux394(T){if(T.userData.b394)return T.userData.b394;const B=T.clone(true);B.traverse(o=>{if(!o.isMesh||!o.geometry.attributes.color)return;o.geometry=o.geometry.clone();
 const c=o.geometry.attributes.color,n=c.itemSize;for(let i=0;i<c.count;i++){const r=c.getX(i),g=c.getY(i),b=c.getZ(i);if(r>g*1.6&&r>b*1.6){c.setXYZ(i,.30,.26,.22)}}c.needsUpdate=true});
 B.userData.h=T.userData.h;B.userData.l=T.userData.l;T.userData.b394=B;return B}
{const vb=viv108Bati;viv108Bati=function(){const g=vb.apply(this,arguments);try{if(!S||!S.voieC)return g;const y=S.year||1663,proche=t=>Math.hypot(t.x-camT.x,t.z-camT.z)<Math.max(4,dist*.7);
  const pose=(T,t,a,d,h)=>{if(!T.userData.u394){T.userData.u394=1;T.traverse(m=>{if(m.isMesh&&m.material){m.material.side=THREE.DoubleSide;if(m.material.emissive)m.material.emissive.setRGB(.12,.11,.1)}})}const o=clone104(T,h);const x=t.x+Math.cos(a)*d,z=t.z+Math.sin(a)*d;o.position.set(x,Math.max(0,alt(x,z))*VX,z);o.rotation.y=Math.atan2(t.x-x,t.z-z);g.add(o)};
  camps().forEach((c,ci)=>{const t=T[c.i];if(!t||!proche(t)||t.alt<3)return;if(typeof grotte387==='function'&&grotte387(t,S.t[c.i]))return;
   if(y>=1800&&M394.case_kreol){const C=y>=1880?M394.case_kreol:bardeaux394(M394.case_kreol);pose(C,t,ci*1.7+5.3,.62,.16)}
   if(y>=1700&&M394.etable_creche&&ci%2===0)pose(M394.etable_creche,t,ci*1.7+1.6,.7,.15)});
 }catch(e){}return g}}
