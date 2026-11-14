// ===== p71 : plus de vieilles figurines sur la carte de Vie — les groupes dehors et les gens aux lieux de travail sont les vrais personnages =====
// Les anciennes silhouettes (cylindre + tête cubique, GRPI) et leurs anneaux doublaient les vrais modèles et paraissaient géantes : on les éteint
// hors du mode Histoire, et ceux qui travaillent sur un lieu (bois, paille, cueillette, pierre, chasse) y sont dessinés avec leur vrai modèle.
const GESTE71={chasse:'chasse_traque',cueil:'cueillir_sol',bois:'bois',paille:'cueillir_sol',pierre:'bois',eau:'eau',peche:'guetteur'};
{const b=bat;bat=function(k){b.apply(this,arguments);try{if(!S||typeof GRPI==='undefined'||!GRPI||modeHist())return;GRPI.count=0;GRPI.visible=false;if(GRPR){GRPR.count=0;GRPR.visible=false}
 if(typeof jourPh!=='function'||typeof TLIEU==='undefined')return;const ph=jourPh();if(!(ph>.12&&ph<.62))return;let n=0;
 (S.pp||[]).forEach(p=>{if(n>=14||enGrp(p)||p.lieu==null)return;const ta=tacheDe(p);if(!TLIEU.includes(ta))return;const t=T[p.lieu];if(!t)return;const a=p.id*2.3+(k||0)*.05,r=.18+.08*Math.sin(p.id);const x=t.x+Math.cos(a)*r,z=t.z+Math.sin(a)*r;
  mfPoser('w'+p.id,mfModeleDe(p),x,Math.max(0,alt(x,z))*VX+.02,z,a+Math.PI,GESTE71[ta]||'repos_debout');n++})}catch(e){}}}
