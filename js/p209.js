// ===== p209 : les modèles se préparent pendant les temps morts, et chaque modèle n'est décodé qu'une fois =====
// Avant : chaque personnage posé relisait et redécodait tout son fichier (maillage, os, textures) — d'où les attentes, et des figures qui glissaient sans modèle.
// Maintenant : un modèle est décodé une fois, puis copié (os compris, matériaux propres à chaque copie, textures partagées).
// Et quand le joueur lit une annonce ou ne touche à rien, les modèles probables se préparent un par un, sans gêner l'image.
const P209={tpl:{},att:{},actif:performance.now(),file:[]};
function par209(a,b,cb){cb(a,b);for(let i=0;i<a.children.length;i++)par209(a.children[i],b.children[i],cb)}
function clone209(src){const sl=new Map(),cl=new Map(),c=src.clone();par209(src,c,(s,d)=>{sl.set(d,s);cl.set(s,d)});
 c.traverse(n=>{if(n.isMesh){n.material=Array.isArray(n.material)?n.material.map(m=>m.clone()):n.material.clone()}if(!n.isSkinnedMesh)return;const s=sl.get(n);n.skeleton=s.skeleton.clone();n.bindMatrix.copy(s.bindMatrix);n.skeleton.bones=s.skeleton.bones.map(b=>cl.get(b));n.bind(n.skeleton,n.bindMatrix)});return c}
{const pi0=p3Instance;
 const modele=n=>P209.att[n]||(P209.att[n]=pi0(n).then(I=>{P209.tpl[n]=I.g;return I.g}).catch(e=>{delete P209.att[n];throw e}));
 p3Instance=function(n){if(!P3.buf[n])return pi0(n);return modele(n).then(g=>{const sc=clone209(g.scene);return {g:{scene:sc,animations:g.animations},mx:new THREE.AnimationMixer(sc),cur:null,clip:''}}).catch(()=>pi0(n))};
 P209.modele=modele}
// le joueur agit : on note l'heure ; les préparations attendent qu'il souffle
['pointerdown','keydown','wheel','pointermove'].forEach(e=>addEventListener(e,()=>{P209.actif=performance.now()},{passive:true}));
// l'ordre : ceux du moment d'abord (la milice qui rôde, les marrons, les colons de l'époque), puis le reste
function file209(){const C=S&&S.voieC,y=S&&S.year||1663;const A=['milicien','homme_chemise','femme_travail','femme_drapee','jeune_pagne','vieux','vieille','p6_enfant','mystique','femme_sagaie','p1a_chasseur'],B=['colone','p7_colon','jeune_colon','enfant_colon','commandeur','servante','gouverneur','pretre','soldat_en'],D=['raharianne','simangavole','moraingy','capoeira','chinois','indien','indienne'];
 const L=(C?B.concat(A):A.concat(B)).concat(D);if(y>1840)L.unshift('indien','indienne');return [...new Set(L)]}
{let i=0,fin=false;const pas=()=>{if(fin)return;try{if(typeof P3==='undefined'||typeof p3Charge!=='function'||!S)return;const calme=performance.now()-P209.actif>900||(document.getElementById('modal')&&!document.getElementById('modal').hidden)||document.hidden;if(!calme)return;
  const L=file209();let n=null;for(let k=0;k<L.length;k++){const c=L[(i+k)%L.length];if(!P209.tpl[c]&&P3.ok[c]!==0){n=c;i=(i+k+1)%L.length;break}}if(!n){fin=true;return}
  if(!P3.buf[n]){p3Charge(n);return}P209.modele(n).catch(()=>{})}catch(e){}};
 const boucle=()=>{pas();if(fin)return;(window.requestIdleCallback?requestIdleCallback(()=>setTimeout(boucle,700),{timeout:2500}):setTimeout(boucle,1200))};setTimeout(boucle,4000)}
