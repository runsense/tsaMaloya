// ===== p315 : un seul jeu, l'Histoire. La Vie s'y ouvre en entrant dans un camp (ou un village) : on vit le camp à son rythme,
// le temps du camp, plus lent, puis on revient au conte là où il s'était arrêté. Les épopées ramènent au camp. =====
// 1. au lancement : plus de choix Histoire / Vie — on va droit à « Quelle histoire ? »
choixDif=function(){DIFC='histoire';try{choixVoie()}catch(e){}};
// 2. entrer dans le camp depuis le conte, et en revenir
const VIE315={on:0};
function entrer315(ci){if(!S||S.fin)return;if(ci==null){const c=(sel&&S.t[sel.i]&&S.t[sel.i].b==='camp')?sel.i:(camps()[0]||{}).i;ci=c}if(ci==null)return;
 VIE315.on=1;VIE315.dif=S.dif;VIE315.an=S.year;S.dif='normal';try{const a=$('auto');if(a&&a.checked){VIE315.auto=1;a.click()}}catch(e){}
 try{cvOuvrir(ci)}catch(e){console.warn(e);sortir315();return}
 const x=$('cvX');if(x)x.textContent='← Revenir au conte';bouton315()}
function sortir315(){if(!VIE315.on)return;VIE315.on=0;S.dif=VIE315.dif||'histoire';try{if(VIE315.auto){const a=$('auto');if(a&&!a.checked)a.click()}}catch(e){}VIE315.auto=0;
 try{if(CV.on)cvFermer()}catch(e){}try{panneau&&sel&&panneau()}catch(e){}try{maj&&maj()}catch(e){}bouton315()}
{const f=cvFermer;cvFermer=function(){const r=f.apply(this,arguments);if(VIE315.on)setTimeout(sortir315,0);return r}}
// le bouton, toujours au même endroit pendant le conte
function bouton315(){let b=$('vie315');const vis=S&&!S.fin&&!VIE315.on&&S.dif==='histoire'&&camps().length&&!(typeof INC!=='undefined'&&INC);
 if(!b){b=document.createElement('button');b.id='vie315';b.className='bt';b.style.cssText='position:fixed;right:16px;bottom:150px;z-index:40;font:600 14px Georgia,serif;padding:8px 14px;border-radius:10px;border:1px solid #d8b45a;background:rgba(30,22,14,.88);color:#f4e6c0;box-shadow:0 4px 14px rgba(0,0,0,.4);cursor:pointer';b.onclick=()=>entrer315();document.body.appendChild(b)}
 b.textContent=S&&S.voieC?'🏘 Entrer dans le village':'⛺ Entrer dans le camp';b.title='Vivre le camp à son rythme, puis revenir au conte';b.hidden=!vis}
setInterval(()=>{try{bouton315()}catch(e){}},700);
// 3. une épopée jouée pendant une partie ramène au camp, pas au menu
{const j=incJouer287;incJouer287=function(k){const enJeu=!!(S&&!S.fin&&$('ecran')&&$('ecran').hidden);const r=j.apply(this,arguments);try{if(enJeu&&INC)INC.camp315=1}catch(e){}return r}}
{const q=incQuitter287;incQuitter287=function(){if(!INC)return;const c=INC.camp315;if(c)INC.ret=null;const r=q.apply(this,arguments);if(c){try{$('ecran').hidden=true}catch(e){}setTimeout(()=>{try{entrer315()}catch(e){}},300)}return r}}
