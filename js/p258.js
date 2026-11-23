// ===== p258 : quand l'histoire marronne commence tard (1730, 1794…), les Hauts ne sont pas vides — et pas tous pleins non plus.
// 1. Les camps nés avant les grandes chasses (1740-1765) ont souvent été pris et brûlés par les détachements : beaucoup ont disparu.
// 2. Au départ d'une partie tardive, votre bande a déjà essaimé : des fugitifs l'ont rejointe, des sous-camps sont nés près du vôtre,
//    et les bandes voisines encore debout se sont ralliées. Le nombre grandit avec l'année de départ. =====
function fin258(i){const y=ne252(i);if(y>=1765)return 9999;const h=Math.abs(Math.sin(i*78.233+3.1)*43758.5)%1;if(h<.3)return 9999;return Math.max(1742,Math.min(1768,y+12+Math.round(h*20)))}
{const l0=libres252;libres252=function(){return l0.apply(this,arguments).filter(o=>S.year<fin258(o.i)||(S.cl252&&S.cl252[o.i]===2))}}
// les cases rouges : un camp détruit disparaît de la carte
setInterval(()=>{try{if(!MAR251.G||!MAR251.vus||!S)return;let k=0;MAR251.vus.forEach((c,i)=>{if(!c.t||!seen(c.t))return;const s=MAR251.G.children[k++];if(s&&S.year>=fin258(i)&&!(S.cl252&&S.cl252[i]===2))s.visible=false})}catch(e){}},1500);
// un camp rencontré puis détruit : la nouvelle arrive
setInterval(()=>{try{if(!S||S.voieC||!MAR251.vus)return;S.cl252=S.cl252||{};S.mort258=S.mort258||{};MAR251.vus.forEach((c,i)=>{if(S.cl252[i]===1&&!S.mort258[i]&&S.year>=fin258(i)){S.mort258[i]=1;if(typeof journal==='function')journal('🔥 Le camp de '+c.n+' a été pris par un détachement. Quelques-uns nous ont rejoints.');S.gens=(S.gens||0)+1}})}catch(e){}},5000);
// une partie qui commence tard : la bande a déjà grandi
setInterval(()=>{try{if(!S||S.voieC||S.pre258||!MAR251.vus||S.an0164==null)return;S.pre258=1;const y0=S.an0164;if(y0<1700||S.year-y0>1)return;
  const C=camps();if(!C.length)return;const c0=C[0],n=Math.max(1,Math.min(3,Math.round((y0-1690)/40)));S.cl252=S.cl252||{};
  const L=libres252().filter(o=>!o.st&&o.c.t&&!(S.t[o.c.t.i]&&S.t[o.c.t.i].b)).sort((a,b)=>hd(a.c.t,c0)-hd(b.c.t,c0)).slice(0,n);
  L.forEach(o=>{const q=tl(o.c.t.i);q.s=1;q.b='camp';q.et=1;S.cl252[o.i]=2;try{ouvrir(o.c.t,1)}catch(e){}});
  S.gens=(S.gens||0)+2*L.length;
  if(L.length&&typeof journal==='function')journal('⛺ Depuis des années, des fugitifs ont rejoint la bande : '+L.length+(L.length>1?' camps sont':' camp est')+' déjà liés au vôtre ('+L.map(o=>o.c.n).join(', ')+').');
  try{peindre();rafraichir()}catch(e){}}catch(e){}},2500);
