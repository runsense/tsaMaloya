// ===== p298 : la rivière ne change plus de couleur d'un coup. Quand l'eau est boueuse (pluie, cyclone), le jeu passait les rivières
// sur la matière « boueuse » toutes les demi-secondes seulement : une rivière redessinée (en zoomant, en changeant de vue) restait
// claire jusqu'à une demi-seconde, puis virait d'un coup au marron. Désormais, toute rivière nouvelle prend tout de suite la bonne eau,
// et le trouble lui-même monte et descend en fondu (déjà le cas : une vingtaine de secondes). =====
(function riv298(){requestAnimationFrame(riv298);try{if(typeof RIVG126==='undefined'||!RIVG126.g||typeof mudMat179!=='function'||typeof RIVM147==='undefined'||!RIVM147.m1)return;
 const m1=RIVM147.m1,m2=RIVM147.m2;RIVG126.g.children.forEach(m=>{if(!m.material||!m.geometry||m.material.type!=='ShaderMaterial'||m.material===m1||m.material===m2)return;
  if(m.userData.mud==null){const p=m.geometry.attributes.position;m.userData.mud=rndH(Math.round(p.getX(0)*7)+Math.round(p.getZ(0)*13)*.37)}m.material=m.userData.mud<.5?m1:(m2||m1)})}catch(e){}})();
