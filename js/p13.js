
// ===== Le conte se voit et ne se bloque plus =====
// 1. le bouton qu'il choisit s'allume vraiment (la marque existait, sans aucun style)
{const st=document.createElement('style');st.textContent='@keyframes conteLum{0%,100%{box-shadow:0 0 0 2px #ffd36a,0 0 12px 3px rgba(255,200,90,.8)}50%{box-shadow:0 0 0 3px #fff2c0,0 0 22px 8px rgba(255,214,120,1)}}.conte,.conteLum{animation:conteLum .5s ease-in-out infinite!important;background:#e8be5a!important;color:#1a140c!important;border-color:#fff2c0!important;position:relative;z-index:2}';document.head.appendChild(st)}
let CONTE_EN=0,CONTE_LUM=null,CONTE_DEM=0;
setInterval(()=>{const now=performance.now();document.querySelectorAll('.conteLum').forEach(b=>{if(!CONTE_LUM||now>CONTE_LUM.t||b.dataset.a!==CONTE_LUM.id)b.classList.remove('conteLum')});if(CONTE_LUM&&now<CONTE_LUM.t){const b=document.querySelector('#side [data-a="'+CONTE_LUM.id+'"]');if(b)b.classList.add('conteLum')}},100);
// 2. quand le conte agit : il zoome sur la case, ouvre son panneau, allume le bouton, puis agit
{const p0=pasAuto0;pasAuto0=function(){CONTE_EN=1;try{return p0()}finally{CONTE_EN=0}}}
{const ag=agir;agir=function(t,id,l){if(!CONTE_EN||l||!S||!modeHist())return ag(t,id,l);const a=actions(t).find(x=>x.id===id);if(!a||S.bras<a.c||!peut(a.r))return ag(t,id,l);
 // après le tutoriel : l'acte, tout de suite, et son résultat ; le bouton ne s'allume qu'un instant
 if((S.autoN||0)>=12&&!(id==='chasse'&&!S.chasseVue)){const ok=ag(t,id,l);if(ok){CONTE_LUM={id,t:performance.now()+450};toast(a.n+(lieuDe(t)?' · '+lieuDe(t):''))}return ok}
 sel=t;conteVoir(t,5);panneau();CONTE_LUM={id,t:performance.now()+1800};
 setTimeout(()=>{if(!S||!autoD())return;const ok=ag(t,id,l);if(!ok)return;CONTE_LUM={id,t:performance.now()+500};sauve();peindre();panneau();rafraichir();
  // la première chasse du conte se joue une fois, pour montrer ; le conte attend la fin
  if(id==='chasse'&&!S.chasseVue&&typeof ouvrirFPS==='function'){S.chasseVue=1;sauve();toast('Le conte vous montre une chasse : jouez-la, il reprend ensuite.');setTimeout(()=>{if(S&&!F&&autoD())ouvrirFPS('chasse',t)},900)}},1400);
 return true}}
// 3. au début d'une partie en mode Histoire, le conte se lance de lui-même au bout de 5 secondes, une fois les écrans d'ouverture passés
{const j0=jouer;jouer=function(){j0();if(S&&!S.bac&&modeHist())CONTE_DEM=1}}
setInterval(()=>{if(!CONTE_DEM||!S)return;if(!modeHist()){CONTE_DEM=0;return}if(!peutConter()||(S.evq&&S.evq.length&&!$('modal').hidden&&performance.now()-calme<800))return;CONTE_DEM=0;S.autoD=1;grace=performance.now()+5000;proch=performance.now()+5000;lecT=5000;autoBtn()},300);
// 4. un onglet ouvert (Savoirs, Chronologie, Pouvoirs, Outre-mer) ne bloque plus le conte
function fermerOnglet(){onglet=null;document.querySelectorAll('.tab[data-t]').forEach(x=>x.classList.remove('on'));const d=$('drawer');if(d)d.hidden=true}
addEventListener('click',e=>{if(e.target&&e.target.closest&&e.target.closest('#auto')&&onglet)fermerOnglet()},true);
setInterval(()=>{if(!S||S.fin||!modeHist()||!autoD()||!onglet||performance.now()-calme<4000)return;
 // si l'onglet s'est ouvert parce qu'il faut dépenser des points, le conte apprend ou les garde
 if(onglet==='sav'&&typeof savBloque==='function'&&savBloque()){const L=savoirsL().filter(k=>(!SAVOIRS[k].bes||SAVOIRS[k].bes())&&SAVOIRS[k].c<=S.savoir).sort((p,q)=>SAVOIRS[p].c-SAVOIRS[q].c);if(L.length){apprendre(L[0]);if(S.sv[L[0]])log('Le conte a appris : « '+SAVOIRS[L[0]].n+' ».')}else if($('garde'))$('garde').click()}
 if(onglet==='pou'&&typeof pouvBloque==='function'&&pouvBloque()&&$('gardeP'))$('gardeP').click();
 fermerOnglet();rafraichir();proch=performance.now()+1500},500);
// 5. les paroles restent le temps de les lire : 3,5 s plus un peu par lettre
setInterval(()=>{if(typeof CV==='undefined'||!CV.A)return;for(const id in CV.A){const a=CV.A[id];if(a.say&&a.sayT>0&&a._sk!==a.say){a._sk=a.say;a.sayT=Math.max(a.sayT,Math.round((3.5+a.say.length*.06)*60))}}},120);

// le rythme : un récit dure le temps qu'il faut pour le conter ; entre deux actes, une seconde à peine (le tutoriel garde son temps)
{const l0=lecture;lecture=function(){const m=$('modal');if(S&&S.evq.length&&m&&!m.hidden){const n=(m.innerText||'').length;return Math.max(2500,Math.min(14000,1200+n*38))}if(S&&(S.autoN||0)<12)return l0();return 950}}
