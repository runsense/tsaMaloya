// ===== p213 : les chants de marins — quand une voile paraît, on entend l'air de son pavillon, joué par nos instruments (airs anciens, libres de droits) =====
// Anglais : « Admiral Benbow » (chanson de marine anglaise, vers 1702), violon et fifre. Source de la notation : collection ABC de John Chambers (trillian.mit.edu/~jc), transcription de Jon Freeman.
// Français : « À la claire fontaine », que chantaient les marins de la vieille France (déjà dans le jeu).
// Pirate : le même air anglais, plus lent, en mineur, sur un tambour sourd. Les airs hollandais et bretons viendront quand on aura leur notation sûre.
const BENBOW213=[[62,2],[67,2],[67,2],[69,2],[66,2],[67,4],[71,2],[72,2],[74,4],[72,2],[71,2],[69,2],[72,2],[71,2],[69,2],[67,2],[67,2],[69,2],[66,2],[67,2],[62,2],[64,2],[64,2],[62,6],[72,2],[71,2],[69,2],[71,2],[72,2],[74,4],[72,2],[71,2],[69,2],[67,2],[66,2],[64,2],[62,4],[62,2],[62,2],[67,2],[67,2],[67,2],[64,2],[60,4],[59,2],[60,2],[62,4],[64,2],[66,2],[67,4]];
const CLAIRE213=[[67,2],[67,2],[71,2],[71,2],[69,2],[71,2],[69,2],[67,2],[67,2],[67,2],[71,2],[71,2],[69,2],[71,4],[71,2],[71,2],[69,2],[67,2],[71,2],[74,2],[71,2],[74,4]];
function air213(nat){try{if(typeof sTon!=='function'||typeof violon205!=='function')return;const N=nat==='francais'?CLAIRE213:BENBOW213,pir=nat==='pirate',dt=pir?.22:.17;let t=.2;
 N.forEach(([m,d])=>{const mm=pir&&[71,64].includes(m)?m-1:m,du=d*dt*.92;if(nat==='francais'){violon205(mm,du,t,.04);flute205(mm+12,du,t,.025)}else{violon205(mm,du,t,.04);if(!pir)fifre205(mm,du*.8,t,.028)}t+=d*dt});
 if(pir&&typeof caisse205==='function')for(let k=0;k<t/(dt*4);k++)caisse205(k*dt*4,.06)}catch(e){}}
{let der='';const m0=modal;modal=function(){const r=m0.apply(this,arguments);try{if(S&&S.evq&&S.evq[0]==='voile'&&S.voile){const k=(S.year||0)+':'+(S.ns||0)+':'+S.voile.nat;if(k!==der){der=k;setTimeout(()=>air213(S.voile&&S.voile.nat),900)}}}catch(e){}return r}}
