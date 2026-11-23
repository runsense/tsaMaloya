// ===== p263 : les grandes figures des Hauts ne sont plus seulement une fiche. Chacune a son camp sur la carte (celui de la carte des toponymes) :
// - côté marron : quand on se rallie à son camp, ou qu'on échange avec lui, ses guetteurs partagent ce qu'ils voient — le pays autour s'ouvre ;
//   quand la fiche d'une figure paraît, son camp devient visible sur la carte ;
// - côté colon : quand un grand chef est tué ou pris, les interrogatoires désignent son camp — le détachement en connaît les abords ;
// - et une place d'honneur, « Les grandes figures », pour tous ceux que l'histoire, le conte et les mythes de l'île ont gardés. =====
const FIG263=[
 ['Laverdure','Bras de la Plaine','archives','« Roi de tous les marrons », tué par le détachement de Mussard dans les hauts du Bras de la Plaine en 1752.',1752],
 ['Sarlave','Bras de la Plaine','archives','« Reine », compagne de Laverdure, tuée avec lui en 1752.',1752],
 ['Dimitile','Dimitile','archives','Chef dont l’influence s’étend en 1743 des Hauts de Saint-Paul à ceux de Saint-Pierre ; la tradition dit qu’il ne fut jamais pris.',0],
 ['Mafate (Mafack)','le camp de Mafate','archives','Guérisseur malgache, surpris par Mussard vers 1751 ; le cirque porte son nom.',1751],
 ['Raharianne','le camp de Mafate','archives','Compagne de Mafate, tuée avec lui à la Rivière des Galets en 1751.',1751],
 ['Cimendef','Cimandef','tradition','« Celui qui ne se soumet pas » ; le pic entre Mafate et Salazie porte son nom.',0],
 ['Anchaing et Héva','Salazie','tradition','Le couple du piton de Salazie, fondateur d’une dynastie ; trois fins selon les conteurs.',0],
 ['Matouté et Simangalove','Îlet des Salazes','tradition','La bande de la caverne des Trois Salazes ; Simangalove, guerrière et conseillère, partie de l’Est.',0],
 ['Fatie','Piton des Neiges','tradition','Le « roi des Nuages » du Piton des Neiges, messager (Eugène Dayot).',0],
 ['Baal','Îlet à Cordes','tradition','Premier grand roi africain, capitale à Cilaos (Eugène Dayot).',0],
 ['Maham','Bébour','tradition','Le chef de la Roche-Vidot, dont le tombeau est un ossuaire sacré.',0]];
const camp263=n=>{try{const i=MAR251.camps.findIndex(c=>c[0]===n);return i<0?null:{i,c:MAR251.vus&&MAR251.vus[i]}}catch(e){return null}};
const ouvre263=(t,r)=>{try{if(!t)return;ouvrir(t,r);peindre()}catch(e){}};
// alliés : on partage la vue de leurs guetteurs
setInterval(()=>{try{if(!S||S.voieC||!MAR251.vus||!S.cl252)return;S.vue263=S.vue263||{};for(const k in S.cl252){const st=S.cl252[k];if(!st||S.vue263[k]===st)continue;const c=MAR251.vus[k];if(!c||!c.t)continue;
   if(st===2||st===1){S.vue263[k]=st;ouvre263(c.t,st===2?3:2);if(typeof journal==='function')journal('👁 Les guetteurs de '+c.n+' partagent ce qu’ils voient : le pays autour s’ouvre.')}}}catch(e){}},2000);
// une figure paraît dans une fiche : son camp devient visible
{const m0=modal;modal=function(){const id=S&&S.evq&&S.evq[0];const r=m0.apply(this,arguments);try{const e=id&&EV[id];if(e&&S&&!S.voieC){let tx='';try{tx=(e.t||'')+' '+(typeof e.b==='string'?e.b:'')}catch(x){}
  S.fv263=S.fv263||{};FIG263.forEach(f=>{const nm=f[0].split(/ et | \(/)[0];if(!S.fv263[f[0]]&&tx.includes(nm)){const c=camp263(f[1]);if(c&&c.c&&c.c.t){S.fv263[f[0]]=1;ouvre263(c.c.t,1)}}})}}catch(x){}return r}}
// côté colon : un grand chef tué ou pris — les interrogatoires désignent son camp
setInterval(()=>{try{if(!S||!S.voieC||!MAR251.vus)return;S.pris263=S.pris263||{};FIG263.forEach(f=>{if(!f[4]||S.year<f[4]||S.pris263[f[0]])return;S.pris263[f[0]]=1;const c=camp263(f[1]);if(c&&c.c&&c.c.t){ouvre263(c.c.t,2);if(typeof journal==='function')journal('🗝 '+f[0]+' : les interrogatoires des captifs désignent le camp de '+f[1]+'. Le détachement en connaît maintenant les abords.')}})}catch(e){}},3000);
// la place d'honneur
function figures263(){let p=document.getElementById('fig263');if(p){p.remove();return}p=document.createElement('div');p.id='fig263';
 p.style.cssText='position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:min(560px,92vw);max-height:80vh;overflow:auto;padding:14px 16px;background:#1d1a16f5;color:#f3e8d2;border:1px solid #8a7450;border-radius:10px;z-index:10000;font:14px/1.45 system-ui,sans-serif;box-shadow:0 10px 40px #000a';
 const y=S?S.year:1700;p.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:18px">👑 Les grandes figures</b><button class="bt sec" id="fig263x" style="margin:0">Fermer</button></div><p style="opacity:.75;margin:4px 0 10px">Ceux que l’histoire, le conte et les mythes de l’île ont gardés. Leur camp est indiqué sur la carte des toponymes du marronnage.</p>'+
  FIG263.map(f=>{const mort=f[4]&&y>=f[4];return '<div style="border-top:1px solid #4a3f2e;padding:8px 0"><b>'+f[0]+'</b> <small style="opacity:.7">('+(f[2]==='archives'?'archives':'tradition')+(mort?' · mort en '+f[4]:'')+')</small><br><span style="opacity:.9">'+f[3]+'</span><br><button class="bt sec" data-f263="'+f[1]+'" style="margin:6px 0 0;font-size:12px;padding:3px 8px">⛺ Voir son camp : '+f[1]+'</button></div>'}).join('');
 document.body.appendChild(p);p.querySelector('#fig263x').onclick=()=>p.remove();
 p.querySelectorAll('[data-f263]').forEach(b=>b.onclick=()=>{const c=camp263(b.dataset.f263);if(c&&c.c){camT.x=c.c.x;camT.z=c.c.z;dist=Math.min(dist,9);p.remove()}else toast('Ce camp n’est pas encore connu.')})}
{const b=document.createElement('button');b.id='fig263b';b.textContent='👑';b.title='Les grandes figures';b.style.cssText='position:fixed;left:52px;bottom:10px;width:36px;height:36px;border-radius:50%;border:1px solid #6a5a40;background:#1d1a16e6;color:#f3e8d2;font-size:17px;cursor:pointer;z-index:9997';b.onclick=figures263;
 setInterval(()=>{try{b.style.display=(S&&!S.fin&&(typeof K==='undefined'||!K))?'block':'none';if(!b.parentNode)document.body.appendChild(b)}catch(e){}},1500)}
