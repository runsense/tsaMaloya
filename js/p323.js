// ===== p323 : le camp et le conte vivent le même temps et mangent pareil. (2) Les vivres disent vrai :
// « encore n jours » d'après ce que le camp mange par jour, pas « réserves sûres » faute de recul. (3) Les enfants ne coupent pas
// le bois : ils ramassent le petit bois, portent l'eau, gardent les cabris, ou jouent. =====
// (1) le temps du camp EST le temps de l'histoire, en plus lent : une journée du camp = un mois, six journées = une saison.
// En ressortant, l'histoire reprend là où le camp est arrivé, et dans l'état où il est. (Plus de gel du temps.)
// (2) manger, chasser, cueillir s'accordent entre le camp et le conte : sur une saison, le camp mange et rapporte autant que le
// conte l'aurait compté. Le jour du camp garde ses écarts (ce qu'on a vraiment chassé, ce qu'on a gâché), mais à l'échelle du conte.
function f323(){const P=(S.pp||[]).filter(p=>!enGrp(p)&&!p.mort),jour=P.reduce((s,p)=>s+FAIM.conso(p),0)||1;
 const saisonC=(S.gens||P.length)*D().conso*(S.sv&&S.sv.reserves?.85:1);return Math.max(.2,Math.min(2,saisonC/(6*jour)))}
{const jt=jourTick;jourTick=function(){if(!(typeof VIE315!=='undefined'&&VIE315.on&&S))return jt.apply(this,arguments);const v0=S.vivres||0;const r=jt.apply(this,arguments);
 try{const d=(S.vivres||0)-v0;if(d)S.vivres=Math.max(0,v0+d*f323())}catch(e){}return r}}
{const e0=entrer315;entrer315=function(){const r=e0.apply(this,arguments);try{if(VIE315.on&&S)S.chrono=0}catch(e){}return r}}
// les vivres
{const bc=besoinsCamp;besoinsCamp=function(ci){const L=bc.apply(this,arguments);try{const m=L.find(x=>x[0]==='Manger');if(m&&!S.faimJ){const bes=(typeof P23vivJ==='function'?P23vivJ():3)*((typeof VIE315!=='undefined'&&VIE315.on)?f323():1),jr=Math.floor((S.vivres||0)/Math.max(.5,bes));const H=(S.hi&&S.hi.v)||[];
 if(H.length<=3||/sûres/.test(m[2])){if(jr<20){m[1]=Math.max(2,jr*5);m[2]=jr<=0?'plus rien à manger':'encore '+jr+' j de vivres'}}}}catch(e){}return L}}
// les enfants
function tacheEnfant323(p){const a=ageP(p),k=(p.id+(S.jourN||0))%4;if(a<3)return 'dans les bras des siens';if(a<6)return 'joue près des cases';if(a<12)return ['ramasse le petit bois','porte l’eau','garde les cabris','joue avec les autres'][k];return null}
{const tt=tacheTxt;tacheTxt=function(p){try{if(p&&!adulte(p)&&!enGrp(p)&&!p.tache){const x=tacheEnfant323(p);if(x)return x}}catch(e){}return tt.apply(this,arguments)}}
