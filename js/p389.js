// ===== p389 : les tournois s'ouvrent aussi en jouant. Les combattants fermés par les songes (océan Indien, boss de l'île)
// s'ouvrent quand on a gagné TOUS les tournois d'avant. Et quand on a fini l'incarnation d'un roi ou d'une reine, on peut
// le prendre au Tournoi des Hauts du Sud. Gardé dans ce navigateur, d'une partie à l'autre. =====
function precedents389(L){try{const P=PALM186.lire();return L.every(z=>P[z]&&Object.keys(P[z]).length>0)}catch(e){return false}}
const HER389={cle:'tsa-heros',lire(){try{return JSON.parse(localStorage.getItem(this.cle)||'{}')}catch(e){return {}}},fini(k){const o=this.lire();o[k]=1;try{localStorage.setItem(this.cle,JSON.stringify(o))}catch(e){}}};
const DUEK389={simang:'simangalove',laverdure:'laverdure284',dimitile:'dimitile',mafate:'mafate282',cimendef:'cimendef',baal:'baal284',fatie:'fatie284',anchaing:'anchaing284'};
// une incarnation menée jusqu'au bout : le héros entre au tournoi
{const j0=incJouer287;incJouer287=function(k){const r=j0.apply(this,arguments);try{if(typeof INC!=='undefined'&&INC&&INC.F){const f=INC.F;INC.F=function(){try{const neuf=!HER389.lire()[k];HER389.fini(k);if(neuf&&DUEK389[k]){const n=(INC287[k]||{}).n||k;setTimeout(()=>{try{log('🥋 '+n+' entre au Tournoi des Hauts du Sud.')}catch(e){}},3000)}}catch(e){}return f.apply(this,arguments)}}}catch(e){}return r}}
{const t0=tournoi186;tournoi186=function(z){try{if(z==='sud'){const base=TOURN186.sud.L0||(TOURN186.sud.L0=TOURN186.sud.L.slice());const H=HER389.lire();
  TOURN186.sud.L=base.concat(Object.keys(H).map(k=>DUEK389[k]).filter(f=>f&&!base.includes(f)&&DUE.F[f]))}}catch(e){}
 const r=t0.apply(this,arguments);
 // ce qu'il reste à faire, dit clairement
 try{const R=$('t186R');if(R&&!document.getElementById('n389')){let m='';if(z==='ocean'&&!precedents389(['sud','ville']))m='Ou gagnez le Tournoi des Hauts du Sud et celui de Saint-Denis : tous les combattants des songes s’ouvriront.';
  if(z==='boss'&&!precedents389(['sud','ville','ocean','champ']))m='Ou gagnez tous les tournois d’avant (Hauts du Sud, Saint-Denis, océan Indien, champions) : tous les boss s’ouvriront.';
  if(z==='sud')m='Finissez l’incarnation d’un roi ou d’une reine marron : il ou elle entre dans ce tournoi.';
  if(m){const p=document.createElement('p');p.id='n389';p.className='note';p.style.margin='8px 0';p.textContent='🔓 '+m;R.parentElement.insertBefore(p,R)}}}catch(e){}return r}}
