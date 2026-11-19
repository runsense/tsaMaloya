// ===== p166 : petits jeux et soin incarné =====
// 1. Pendant un petit jeu, l'horloge du jour, les bandeaux et les messages de la carte disparaissent (ils mordaient sur les titres et les cartes).
{const st=document.createElement('style');st.textContent='body.pj166 #jour90,body.pj166 #inc165,body.pj166 #credSat,body.pj166 #labels,body.pj166 #sv129,body.pj166 #comm115,body.pj166 #guideJ{display:none!important}';document.head.appendChild(st)}
setInterval(()=>{try{const on=['cmd','ech','btu','duel','avt','rallye','g132','cav160','pjIntro','pjApo'].some(id=>{const e=document.getElementById(id);return e&&e.isConnected&&!e.hidden});document.body.classList.toggle('pj166',on)}catch(e){}},250);
// 2. Le soin, en incarnant un blessé : dans la vue personnage, les plantes qui soignent (ayapana, faham, bois de pomme, fanjan, ambaville…) brillent.
//    En cueillir une soigne la personne (+30 pv, puis +15 par plante). Chaque cueillette coûte du temps : on arrive plus tard et plus affamé au camp.
const SOIN166=['l’ayapana','le faham','l’ambaville','une feuille de bois de pomme','la sève de fanjan','le bois d’olive','la fleur jaune','la liane de la forêt'];
function soinCible166(){try{const d=G165&&G165.cur;return d&&d.pid!=null?ppId(d.pid):null}catch(e){return null}}
{const io=G165;// on garde qui est blessé pendant toute la vue
 setInterval(()=>{try{if(typeof VP!=='undefined'&&VP&&io.dern&&io.dern.inc&&io.dern.inc.k==='blesse'){io.cur={pid:io.dern.inc.pid,g:io.dern.g,n:0}}else if(!(typeof VP!=='undefined'&&VP))io.cur=null}catch(e){}},300)}
{const c0=vpCueille;vpCueille=function(c,p,chef){const cur=G165.cur,bl=soinCible166();if(!cur||!bl||!c)return c0.apply(this,arguments);
  const r=c0.apply(this,arguments);try{const gain=cur.n?15:30;cur.n++;bl.pv=Math.min(100,(bl.pv||40)+gain);if(bl.pv>=70)bl.bl=0;const g=(S.grp||[])[cur.g];if(g&&g.exp){g.exp.prov=Math.max(0,g.exp.prov-.3);g.exp.retard=(g.exp.retard||0)+1}
   vpMsg('🌿 '+bl.n.split(' ')[0]+' mâche '+SOIN166[(cur.n-1)%SOIN166.length]+' et pose les feuilles sur la plaie : '+Math.round(bl.pv)+' pv. '+(bl.pv>=70?'Il peut reprendre la route.':'Encore un peu, il boite toujours.')+' (Un peu de temps et de vivres perdus.)')}catch(e){}return r}}
// les plantes qui soignent brillent pendant la vue d'un blessé
(function luit166(){requestAnimationFrame(luit166);try{if(!G165.cur||typeof VP==='undefined'||!VP||!VP.cueil)return;const k=.5+.5*Math.sin(performance.now()/300);VP.cueil.forEach(c=>{if(!c.g||c.fr<=0)return;c.g.traverse(m=>{if(m.isMesh&&m.material&&m.material.emissive){if(!m.userData.e166){m.material=m.material.clone();m.userData.e166=1}m.material.emissive.setRGB(.15*k,.35*k,.08*k)}})})}catch(e){}})();
