// ===== p392 : un petit passage de musique au début de chaque histoire, selon le côté et l'époque.
// Côté colon : un air français du domaine public, de l'époque (« À la claire fontaine », plus ancien que la colonie ;
// « Malbrough s'en va-t-en guerre » et « Au clair de la lune », XVIIIᵉ siècle ; « La Marseillaise », 1792).
// Côté marron : les rythmes de ceux qui fuient — la maligasse venue de Madagascar pour les premiers fuyards,
// la timbila des Chopi du Mozambique quand les captifs mozambicains arrivent (XVIIIᵉ-XIXᵉ s.), le maloya du kabar ensuite.
// Les boucles de maloya sont jouées par l'auteur ; les airs anciens sont rejoués par le jeu, sans paroles. =====
const MALB392=[[67,2],[71,1],[71,1],[71,2],[69,1],[71,1],[72,2],[71,2],[71,2],[69,1],[69,1],[69,2],[67,1],[69,1],[71,2],[67,4],
 [67,2],[71,1],[71,1],[71,2],[69,1],[71,1],[72,2],[71,2],[74,2],[72,1],[71,1],[69,2],[71,1],[69,1],[67,6]];
const LUNE392=[[67,2],[67,2],[67,2],[69,2],[71,4],[69,4],[67,2],[71,2],[69,2],[69,2],[67,8],[67,2],[67,2],[67,2],[69,2],[71,4],[69,4],[67,2],[71,2],[69,2],[69,2],[67,8]];
const MARS392=[[62,1],[62,2],[62,1],[67,3],[67,3],[69,3],[69,3],[74,5],[71,1],[67,2],[67,1],[71,2],[67,1],[64,3],[72,6],[69,2],[66,1],[67,8]];
const INTRO392={
 c1663:{N:()=>typeof CLAIRE213!=='undefined'?CLAIRE213:LUNE392,t:'« À la claire fontaine » — chanson traditionnelle française, connue avant la colonie (domaine public).'},
 c1720:{N:()=>MALB392,t:'« Malbrough s’en va-t-en guerre » — chanson populaire française du XVIIIᵉ siècle (domaine public).'},
 c1770:{N:()=>LUNE392,t:'« Au clair de la lune » — air populaire français du XVIIIᵉ siècle (domaine public).'},
 c1792:{N:()=>MARS392,t:'« La Marseillaise » — Rouget de Lisle, 1792 (domaine public).'},
 m1663:{b:'maligasse',t:'La maligasse — le rythme venu de Madagascar, comme les premiers fuyards (boucle jouée pour le jeu).'},
 m1720:{tim:1,b:'roule',t:'La timbila des Chopi du Mozambique, puis le roulèr — les captifs du Mozambique arrivent dans l’île (évocation, rejouée par le jeu).'},
 m1800:{b:'intro_kabar',t:'L’entrée du kabar — le maloya des veillées (boucle jouée pour le jeu).'}};
function intro392(){try{if(!S)return;const y=S.year||1663,c=S.voieC;let k;if(c)k=y>=1792?'c1792':y>=1770?'c1770':y>=1720?'c1720':'c1663';else k=y>=1800?'m1800':y>=1720?'m1720':'m1663';
 const I=INTRO392[k],ctx=typeof sndPret==='function'&&sndPret();if(!ctx){setTimeout(intro392,1500);return}
 if(I.N){try{joue217(I.N(),'francais',40,1.1)}catch(e){}}
 if(I.tim&&typeof PRE72!=='undefined'&&PRE72.timbila){try{PRE72.timbila.f()}catch(e){}}
 if(I.b){setTimeout(()=>{try{boucle194(ctx,SND.out,I.b,.7,1)}catch(e){}},I.tim?6000:200)}
 const d=document.createElement('div');d.textContent='♪ '+I.t;d.style.cssText='position:fixed;left:50%;bottom:64px;transform:translateX(-50%);z-index:9000;font:13px Georgia,serif;color:#f4ecd8;background:rgba(20,16,10,.82);border:1px solid #8a7a50;border-radius:8px;padding:6px 12px;max-width:80%;text-align:center;pointer-events:none';document.body.appendChild(d);setTimeout(()=>d.remove(),12000)}catch(e){}}
{const n0=nouvelle;nouvelle=function(){const r=n0.apply(this,arguments);try{setTimeout(intro392,1200)}catch(e){}return r}}
