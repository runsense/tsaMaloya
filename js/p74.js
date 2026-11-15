// ===== p74 : en Vie, les contes ne se racontent plus — ils circulent comme des rumeurs au camp =====
// Seule l'Histoire est contée. En Vie, un conte, un mythe ou un récit imaginaire n'interrompt plus la partie : il devient une rumeur
// rangée dans « Rumeurs ». Le joueur choisit quand aller l'écouter auprès d'un ancien ; ses choix et ses pouvoirs restent les mêmes.
const RUM_TAGS=/^(Conte|Mythe|Imaginaire|Mémoire|Mystique|Réalisme fantastique|Rumeur)$/;
const enVie=()=>typeof S!=='undefined'&&S&&!modeHist()&&!S.fin&&!($('kons')&&!$('kons').hidden);
{const md=modal;modal=function(){try{if(enVie()&&S.evq&&S.evq.length){S.rumOk=S.rumOk||{};S.rumeurs=S.rumeurs||[];let n=0;
  while(S.evq.length){const id=S.evq[0],e=EV[id];if(!e||!RUM_TAGS.test(e.tag||'')||S.rumOk[id])break;S.evq.shift();if(!S.rumeurs.some(r=>r.id===id)){S.rumeurs.push({id,y:S.year});n++;try{journal('Une rumeur court au camp : « '+(e.t||'une histoire')+' ».')}catch(_){}}}
  if(n){try{toast(n>1?n+' rumeurs courent au camp : allez les écouter dans « Rumeurs ».':'Une rumeur court au camp : « '+(EV[S.rumeurs[S.rumeurs.length-1].id].t||'')+' ».')}catch(_){}rumPill()}}}catch(e){}return md.apply(this,arguments)}}
function rumEcouter(id){if(!S)return;S.rumOk=S.rumOk||{};S.rumOk[id]=1;S.rumeurs=(S.rumeurs||[]).filter(r=>r.id!==id);const b=$('rumB');if(b)b.remove();S.evq.unshift(id);modal();rumPill()}
function rumPanneau(){const old=$('rumB');if(old){old.remove();return}const L=(S.rumeurs||[]);const d=document.createElement('div');d.id='rumB';
 d.style.cssText='position:fixed;right:14px;top:120px;z-index:8600;width:min(360px,calc(100vw - 28px));max-height:60vh;overflow:auto;background:#1e2420f2;color:#efe6d6;border:1px solid #4a5a50;border-radius:8px;padding:12px 14px;font:13px Montserrat,sans-serif';
 d.innerHTML='<b style="font:700 17px Alegreya,Georgia,serif">Rumeurs du camp</b><br><small style="opacity:.75">Des histoires que l’on se répète à voix basse. Allez les écouter auprès d’un ancien quand vous voulez : certaines ouvrent des savoirs et des pouvoirs.</small>'+
  (L.length?L.map(r=>'<div style="border-top:1px dashed #4a5a50;margin-top:8px;padding-top:8px"><b>'+(EV[r.id]&&EV[r.id].t||r.id)+'</b><br><small style="opacity:.7">entendue en '+r.y+' · '+(EV[r.id]&&EV[r.id].tag||'')+'</small><br><button data-r="'+r.id+'" style="margin-top:5px;font:600 12px Montserrat,sans-serif;background:#b5412b;color:#fff;border:0;border-radius:999px;padding:5px 12px;cursor:pointer">Aller l’écouter</button></div>').join(''):'<p style="opacity:.75">Aucune rumeur pour l’instant.</p>')+
  '<button id="rumX" style="margin-top:10px;font:600 12px Montserrat,sans-serif;background:transparent;color:#efe6d6;border:1px solid #4a5a50;border-radius:999px;padding:5px 12px;cursor:pointer">Fermer</button>';
 document.body.appendChild(d);d.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>rumEcouter(b.dataset.r));$('rumX').onclick=()=>d.remove()}
function rumPill(){try{const h=$('fc');if(!h)return;let b=h.querySelector('.rumP');if(!enVie()){if(b)b.remove();return}if(!b){b=document.createElement('span');b.className='pill rumP';b.style.cursor='pointer';b.title='Les contes et légendes qui circulent au camp';b.onclick=e=>{e.stopPropagation();rumPanneau()};h.appendChild(b)}const n=(S.rumeurs||[]).length;b.textContent='🌙 Rumeurs'+(n?' ('+n+')':'')}catch(e){}}
setInterval(rumPill,1000);
// En Vie (et en Expert), la partie démarre tout de suite : ni naissance de l'île, ni cartes du prologue — ils restent pour l'Histoire.
{const pr=prologue;prologue=function(k){try{if(k===0&&typeof DIFC!=='undefined'&&DIFC!=='histoire'){const e=$('ecran');if(e)e.hidden=true;prologue.vu=0;return nouvelle()}}catch(e){}return pr.apply(this,arguments)}}
