// ===== p201 : la boussole des utopies, invisible. Chaque choix déplace l'île sur quatre axes :
// ordre (+) ou liberté (−), mer (+) ou terre (−), mystique (+) ou réel (−), argent (+) ou partage (−).
// Le centre, c'est l'histoire vraie ; sans nouvelle poussée, l'île y revient doucement. Les utopies sont des zones :
// entre deux, elles se mêlent ; la fin dépend de l'endroit où l'on termine. Suivre une utopie (ses choix, ses branches) pousse fort vers elle. =====
const AX201=['ordre','mer','myst','argent'];
const UTO201={
 templiers:{n:'L’ordre blanc des Hauts',p:{ordre:70,mer:-35,myst:45,argent:10},
  fin:'Sur les remparts des Hauts, des hommes en manteau blanc montent la garde au nom d’un serment que plus personne ne discute. Les anciens nobles y servent comme frères convers : ils bêchent, ils prient, ils obéissent.'},
 corsaires:{n:'Les frères de la côte',p:{ordre:-70,mer:75,myst:0,argent:20},
  fin:'Les rades appartiennent aux équipages. Les anciens marrons commandent les bateaux et partagent les prises au pied du mât ; les planteurs leur vendent le riz et apprennent à saluer.'},
 anciens:{n:'La voie des anciens',p:{ordre:-15,mer:-55,myst:85,argent:-40},
  fin:'On sait avant le cyclone : les oiseaux le disent, les roussettes le disent, les vieux le rêvent. Les camps des Hauts se déplacent avec les saisons et parlent aux morts à voix basse.'},
 partage:{n:'L’île des équipages',p:{ordre:-45,mer:5,myst:-25,argent:-75},
  fin:'Les cuisines, les bateaux, les toits se tiennent en équipages ; on décide en cercle, au rond-point ou sous le tamarin. Personne n’est riche, peu sont seuls.'},
 lumieres:{n:'Saint-Denis-des-Lumières',p:{ordre:60,mer:20,myst:-60,argent:75},
  fin:'Les tours de la Société dominent le Barachois. Chacun est libre ; chacun paie. Les portails des grandes familles se ressemblent, et ceux qui les gardent viennent de partout.'}};
function bous201(){if(!S)return null;if(!S.bous)S.bous={ordre:0,mer:0,myst:0,argent:0};return S.bous}
function pousse201(o,k){const B=bous201();if(!B)return;k=k||1;AX201.forEach(a=>{if(o[a])B[a]=Math.max(-100,Math.min(100,B[a]+o[a]*k))})}
// où en est l'île : force (0 = l'histoire vraie) et poids de chaque utopie
function lieu201(){const B=bous201();if(!B)return {force:0,w:{}};const f=Math.min(1,Math.hypot(...AX201.map(a=>B[a]))/120),w={};let tot=0;
 for(const k in UTO201){const P=UTO201[k].p,d=Math.hypot(...AX201.map(a=>B[a]-P[a]));w[k]=Math.exp(-d*d/(2*45*45));tot+=w[k]}
 for(const k in w)w[k]=tot?w[k]/tot*f:0;return {force:f,w}}
function proche201(k){try{return (lieu201().w[k]||0)>.35}catch(e){return false}}
// les choix : chaque effet pousse un peu
{const f0=fx;fx=function(o){const r=f0.apply(this,arguments);try{if(o&&S&&!S.fin){const p={};
  if(o.ami)p.ordre=(p.ordre||0)+o.ami*.35,p.argent=(p.argent||0)+o.ami*.3;if(o.coh)p.argent=(p.argent||0)-o.coh*.35,p.ordre=(p.ordre||0)-o.coh*.1;
  if(o.myst)p.myst=(p.myst||0)+o.myst*.6;if(o.traque)p.ordre=(p.ordre||0)+o.traque*.15;pousse201(p)}}catch(e){}return r}}
// les branches suivies : une poussée franche ; et chaque saison, sans poussée, l'île revient vers l'histoire vraie
{const BR201={anc:{myst:30,mer:-20},lib:{ordre:-25,mer:20},cors:{mer:35,ordre:-20,argent:10},roy:{ordre:25,mer:-20},cafe:{argent:30,ordre:10},comp:{argent:25,mer:20},abol:{ordre:-20,argent:-15},maur:{mer:15,ordre:-15},angl:{ordre:20,argent:15},eveil:{myst:25},ombre:{myst:25,ordre:20}};
 let ns=-1;setInterval(()=>{try{if(!S||S.fin)return;const B=bous201(),vu=S.bous201vu=S.bous201vu||{},br=S.br||{};
  for(const k in BR201)if(br[k]&&!vu[k]){vu[k]=1;pousse201(BR201[k])}
  if(S.uchLum&&!vu.lum){vu.lum=1;pousse201({ordre:20,argent:25,myst:-20})}
  [['equip197',{argent:-20,ordre:-10}],['ronde197',{argent:-15,ordre:-15}],['rond197',{argent:-15,ordre:-10}]].forEach(([k,p])=>{if(S[k]&&!vu[k]){vu[k]=1;pousse201(p)}});
  if(ns!==S.ns){if(ns>=0)AX201.forEach(a=>B[a]*=.985);ns=S.ns}}catch(e){}},2000)}
// les portes : les utopies déjà écrites s'ouvrent aussi quand l'île s'en approche
try{const e0=EV.lum_actions;if(e0){const k=Object.keys(EV).filter(k=>/^lum_/.test(k));k.forEach(q=>{const si=EV[q].si;EV[q].si=()=>{try{return (si&&si())||proche201('lumieres')}catch(e){return false}}})}
 ['uto_equipages','uto_ronde','uto_rondpoints'].forEach(q=>{const e=EV[q];if(!e)return;const si=e.si;e.si=()=>{try{return (si&&si())||(S&&S.year>=2025&&proche201('partage'))}catch(_){return false}}})}catch(e){}
// la fin : un épilogue selon l'endroit où l'île termine, mêlé quand deux utopies se partagent la place
{const ef=ecranFin;ecranFin=function(){const r=ef.apply(this,arguments);try{const L=lieu201(),tri=Object.entries(L.w).sort((a,b)=>b[1]-a[1]),bl=document.querySelector('#ecran .bloc');if(!bl||bl.querySelector('.epi201'))return r;
  const p=document.createElement('p');p.className='epi201';p.style.cssText='font-style:italic;opacity:.92;margin-top:10px';
  if(L.force<.22||!tri.length||tri[0][1]<.15)p.textContent='L’île est restée au plus près de son histoire vraie.';
  else{const [a,wa]=tri[0],[b,wb]=tri[1]||[];p.innerHTML='<b>'+UTO201[a].n+(wb>.25?' · '+UTO201[b].n:'')+'</b><br>'+UTO201[a].fin+(wb>.25?' '+UTO201[b].fin.split('.')[0]+'.':'')}
  bl.appendChild(p)}catch(e){}return r}}
