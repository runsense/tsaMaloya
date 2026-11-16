// ===== p107 : la Survie sur la même carte que l'Histoire et la Vie =====
// La vue de la colonie (Survie) avait son propre sol, un carré coloré qui ne se fondait pas dans l'île.
// Désormais on dessine d'abord la grande carte (relief, mer, forêts, détail du lieu) avec la caméra de la Survie,
// puis par-dessus seulement ce qui est propre à la Survie : bâtiments, champs, gens. Le zoom de la Survie pilote la carte.
let UNIF107=true;
{const kb=k3Batir;k3Batir=function(){const r=kb.apply(this,arguments);try{if(!UNIF107||!KV3.G)return r;
 if(KV3.sol){KV3.sol.material.colorWrite=false;KV3.sol.material.depthWrite=false}
 KV3.G.traverse(o=>{if(o===KV3.G)return;const g=o.geometry;if(!g)return;const p=g.parameters||{};
  if(g.type==='PlaneGeometry'&&p.width===40)o.visible=false;// l'ancienne mer
})}catch(e){}return r}}
{const ka=k3Arbres;k3Arbres=function(P,G){const avant=new Set(G.children);const r=ka.apply(this,arguments);try{G.children.forEach(c=>{if(!avant.has(c)){c._arbre107=1}})}catch(e){}return r}}
// le rendu : la grande carte d'abord, puis la colonie par-dessus, avec la même caméra et le même tampon de profondeur
setInterval(()=>{try{if(!KV3.R||KV3.R._u107)return;const R=KV3.R,r0=R.render.bind(R);R._u107=1;
 R.render=function(sc,cam){if(!UNIF107||sc!==KV3.S||typeof scene==='undefined'||!scene||!K){return r0(sc,cam)}
  try{camT.copy(KV3.tg);dist=KV3.dist;pol=KV3.pol;az=KV3.az}catch(e){}
  const bg=KV3.S.background,fg=KV3.S.fog;R.autoClear=false;R.clear();r0(scene,cam);KV3.S.background=null;KV3.S.fog=scene.fog||null;r0(KV3.S,cam);KV3.S.background=bg;KV3.S.fog=fg;R.autoClear=true}}catch(e){}},500);
// le détail du lieu (comme au double clic) s'ouvre sur la colonie dès qu'on regarde la Survie de près
setInterval(()=>{try{if(!window.LIEU107||!UNIF107||S||!K||K.vue!=="ville"||typeof kCol!=="function")return;const c=T[kCol().i];if(!c)return;
 if(KV3.dist<9){if(lieu&&Math.hypot(lieu.x-KV3.tg.x,lieu.z-KV3.tg.z)<1.5)return;const t=tileAt(KV3.tg)||c;kShim105(t,()=>ouvrirLieu(t));LA97=lieu}
 else if(lieu&&lieu===LA97){LA97=null;fermerLieu()}}catch(e){}},500);
