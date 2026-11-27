// ===== p376 : l'avance rapide des saisons. Quand une action du joueur fait passer la saison (Fin de saison, finir quand même,
// sauter des saisons…), la carte ne saute pas d'un coup : pendant ~1,2 s le temps file — le soleil fait un tour de ciel,
// les nuages filent, la pluie ou le sec de la nouvelle saison s'installe — puis tout ralentit et reprend son cours.
// La vitesse monte et redescend en douceur (courbe en cloche), sans à-coup ni clignotement. =====
const FF376={on:0,t0:0,dur:1200,kOff:0,dK:0,dC:0,derniere:0};
function ff376u(){if(!FF376.on)return 1;const u=(performance.now()-FF376.t0)/FF376.dur;if(u>=1){FF376.on=0;FF376.kOff+=FF376.dK;return 1}return u}
function ff376s(u){return u*u*(3-2*u)}
function ff376Lancer(c0){try{if(typeof reduce!=='undefined'&&reduce)return;const now=performance.now();if(FF376.on||now-FF376.derniere<1500)return;FF376.derniere=now;
 const J=DUREE()/6,c1=S.chrono||0;let d=((c1-c0)/J)%1;if(d<0)d+=1;if(d<.35)d+=1; // au moins un bon tiers de journée qui défile, au plus ~1,35 jour
 FF376.dC=d*J;FF376.dK=170*d;FF376.t0=now;FF376.on=1}catch(e){}}
{const s0=saison;saison=function(){const c0=S?S.chrono||0:0,nat=S&&c0>=DUREE()*.98;const r=s0.apply(this,arguments);if(S&&!S.fin&&!nat)setTimeout(()=>ff376Lancer(c0),0);return r}}
{const j0=jourPh;jourPh=function(){if(!FF376.on||!S)return j0();const u=ff376u();if(u>=1)return j0();const v=(S.chrono||0)-FF376.dC*(1-ff376s(u));return(((v/DUREE())*6)%1+1)%1}}
{const c0=ciel;ciel=function(k,dt){let k2=k+FF376.kOff,d2=dt;if(FF376.on){const u=ff376u();if(u<1){k2=k+FF376.kOff-FF376.dK*(1-ff376s(u))+FF376.dK;d2=dt*(1+9*6*u*(1-u)/1.5)}else k2=k+FF376.kOff}return c0(k2,d2)}}
