// ===== p414 : dans la vue du personnage (incarner), le camp des colons de 1663–1665 n'a pas de maison : Payen et les siens
// vivent dans la Grotte des Premiers Français. Les cases, la maison du maître et le grenier ne sont pas posés ; à leur place,
// l'abri sous roche (même dessin que sur la carte, p413, à l'échelle du personnage), le foyer et le jardin restent. =====
{const v0=vpCamp152;vpCamp152=function(V){try{const t=V&&V.t;if(!(S&&S.voieC&&S.year<1666&&t&&S.t[t.i]&&typeof grotte387==='function'&&grotte387(t,S.t[t.i])))return v0.apply(this,arguments);
  // pas de cases : on retire les boîtes que p152 remplace par des maisons, et on refuse les modèles de bâtiments le temps de l'appel
  V.sc.children.filter(o=>o.isMesh&&o.geometry&&o.geometry.type==='BoxGeometry'&&o.geometry.parameters&&(o.geometry.parameters.width===2.4||o.geometry.parameters.width===7)).forEach(b=>{b.visible=false;V.sc.remove(b)});
  V.sc.children.filter(o=>o.isMesh&&o.geometry&&o.geometry.type==='ConeGeometry'&&o.position.z<-20).forEach(b=>{b.visible=false});
  const m0=mod104;mod104=n=>/^bat_/.test(n)?Promise.reject(new Error('1663')):m0(n);let r;try{r=v0.apply(this,arguments)}finally{mod104=m0}
  // la grotte, au fond du camp, ouverte vers le foyer
  try{const g0=grotte413({i:'vp'});if(g0){const g=g0.clone(true);scene.remove(g0);g.name='g414';g.scale.setScalar(9);const x=0,z=-40;g.position.set(x,V.h(x,z)-.3,z);g.rotation.y=0;V.sc.add(g)}}catch(e){console.warn('p414',e)}
  return r}catch(e){return v0.apply(this,arguments)}}}
