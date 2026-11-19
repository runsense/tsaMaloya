// ===== p161 : « Annuler l'action » et « Saison précédente » ne bloquent plus le jeu =====
// Avant : le conte continuait sur l'ancien état, les films, les marches et les menus restaient ouverts par-dessus, et l'on ne pouvait plus cliquer.
// Maintenant : on met le conte en pause, on arrête film et marches, on ferme tout ce qui recouvre la carte, puis on rouvre proprement l'état restauré.
function nettoie161(){try{if(typeof CINE!=='undefined'&&CINE)cineFin()}catch(e){try{CINE=null}catch(_){}}
 try{MARCHE75.length=0}catch(e){}try{contePick=0}catch(e){}try{window.FILM=null}catch(e){}try{camGo=null}catch(e){}
 ['cine','mCtx','cur135','souris157','voile138','expR2','cavC131','evDec'].forEach(id=>{const e=document.getElementById(id);if(e)e.remove()});
 document.querySelectorAll('#modal .op.conte').forEach(b=>b.classList.remove('conte'));document.body.classList.remove('side135','ctx157')}
['annuler','revenir'].forEach(n=>{try{const f=window[n]||eval(n);const g=function(){if(!S||S.fin)return;nettoie161();const r=f.apply(this,arguments);
  try{S.autoD=0;if(typeof autoBtn==='function')autoBtn();if(typeof grace!=='undefined')grace=performance.now()+4000}catch(e){}
  try{modal();panneau();peindre();rafraichir()}catch(e){}try{toast((n==='annuler'?'Dernière action annulée':'Retour à la saison précédente')+'. Le conte est en pause : relancez-le avec « Conte » quand vous voulez.')}catch(e){}return r};
  if(n==='annuler')annuler=g;else revenir=g}catch(e){}});
// les boutons pointaient sur les anciennes fonctions : on les rebranche
setTimeout(function rb(){try{const u=document.getElementById('undo'),b=document.getElementById('back');if(u)u.onclick=()=>annuler();if(b)b.onclick=()=>revenir();if(!u||!b)setTimeout(rb,1000)}catch(e){}},500);
// un garde-fou : si plusieurs actions s'enchaînent trop vite (clics multiples pendant une marche), on ignore les doublons pendant 400 ms
{const g0=agir;let der={k:'',t:0};agir=function(t,id,l){try{const k=(t&&t.i)+'|'+id,now=performance.now();if(!l&&k===der.k&&now-der.t<400)return false;der={k,t:now}}catch(e){}return g0.apply(this,arguments)}}
