// ===== p252 : côté marron, on ne fonde plus ses camps comme un colon fonde un quartier. Les camps naissent tout seuls, de la fuite des esclaves,
// partout dans les Hauts (les 45 camps de la carte des toponymes), chacun à son heure. On agrandit le sien (des cases, des jardins),
// et l'on rencontre les autres : on se rallie, on échange, ou l'on reste chacun chez soi. =====
const CL252={y:null};
function an252(i,lo){try{const la=MAR251.camps[i][2];if(la<-21.2){const h=Math.abs(Math.sin(i*45.1)*43758.5)%1;return 1690+Math.round(h*35)}}catch(e){}const h=(Math.sin(i*91.7+lo*13.1)*43758.5)%1,u=Math.abs(h);return 1688+Math.round(u*110)+(lo>55.6?8:0)}
function ne252(i){try{if(S&&S.ne252&&S.ne252[i]!=null)return S.ne252[i]}catch(e){}return an252(i,MAR251.camps[i][1])}
function libres252(){if(!S||!MAR251||!MAR251.vus)return [];S.cl252=S.cl252||{};return MAR251.vus.map((c,i)=>({i,c,y:ne252(i),st:S.cl252[i]||0})).filter(o=>S.year>=o.y)}
// pourquoi ce camp est né : la fuite d'une habitation, une révolte, des marrons venus aider, ou les jours qui suivent un cyclone
function cause252(i){const c=S&&S.cause252&&S.cause252[i];if(c)return c;const h=Math.abs(Math.sin(i*12.9898)*43758.5)%1;return h<.55?'fuite':h<.75?'aide':h<.9?'revolte':'cyclone'}
const CAUSE252={fuite:'Ils se sont enfuis d’une habitation des Bas, une nuit, à quelques-uns.',aide:'Une autre bande est descendue les chercher : des marrons sont venus grossir leur nombre, et leur montrer la forêt.',revolte:'Ils viennent d’une révolte : l’habitation a brûlé, et ceux qui en sont sortis vivants ont pris le chemin des Hauts.',cyclone:'Après le cyclone, les cases des esclaves étaient par terre et les maîtres occupés à sauver leurs champs : ils en ont profité pour monter.'};
// plus de « Fonder un camp » sur la voie marronne
{const a0=actions;actions=function(t){const A=a0.apply(this,arguments);try{if(S&&!S.voieC)return A.filter(a=>a.id!=='camp')}catch(e){}return A}}
// une bande rencontrée
EV.renc252={sys:1,tag:'Mémoire',an:'',get t(){const c=S&&S.renc252!=null&&MAR251.vus&&MAR251.vus[S.renc252];return c&&c.n?'Rencontre : '+c.n:'Une bande des Hauts'},
 get b(){const o=S.renc252,c=o!=null&&MAR251.vus[o];const l=c&&c.t&&typeof lieuProche==='function'?(lieuProche(c.t)||''):'';const nm=c&&c.n?c.n:'';return 'Un sifflement d’oiseau a répondu au nôtre. Nos chasseurs ont trouvé un camp qui n’est pas le nôtre'+(nm?', au lieu-dit '+nm:(l?' '+l:''))+'. '+CAUSE252[cause252(o)]+' Ils ont bâti leurs cases et planté leurs songes sans nous connaître. Ils nous regardent venir, la sagaie à la main, puis on reconnaît une langue, un chant.'},
 h:'Les rapports des détachements décrivent de nombreux petits groupes indépendants dans les Hauts ; la carte des toponymes liés au marronnage (Service régional de l’archéologie) en situe des dizaines. Le ralliement de bandes autour de chefs élus est rapporté par les mêmes sources.',
 o:[{n:'Se rallier : un seul peuple des Hauts',d:'Leur camp devient l’un des vôtres, gens +3',fx:{gens:3,coh:1},f:()=>{const o=S.renc252,c=MAR251.vus[o];S.cl252[o]=2;if(c&&c.t){const q=tl(c.t.i);q.s=1;if(!q.b)q.b='camp';q.et=Math.max(q.et||0,1);try{ouvrir(c.t,1)}catch(e){}}try{log('Une bande des Hauts se rallie à vos camps.')}catch(e){}}},
     {n:'Échanger, et chacun chez soi',d:'Amitiés +2, vivres +2',fx:{ami:2,vivres:2},f:()=>{S.cl252[S.renc252]=1}},
     {n:'Passer sans se montrer',d:'Traque −1',fx:{traque:-1},f:()=>{S.cl252[S.renc252]=1}}]};
setInterval(()=>{try{if(!S||S.voieC||S.fin||!S.evq||!MAR251.vus)return;if(S.evq.includes('renc252'))return;if(S.renc252y===S.year)return;
  const L=libres252().filter(o=>!o.st&&o.c.t&&seen(o.c.t)&&!(S.t[o.c.t.i]&&S.t[o.c.t.i].b));if(!L.length)return;
  // la plus proche de nos camps
  const C=camps();L.sort((a,b)=>Math.min(...C.map(c=>hd(c,a.c.t)))-Math.min(...C.map(c=>hd(c,b.c.t))));S.renc252=L[0].i;S.renc252y=S.year;S.evq.push('renc252')}catch(e){}},4000);
// sur la carte : seuls les camps déjà nés montrent leur petite case rouge ; un camp rallié devient l'un des vôtres et n'a plus besoin de marque
{const okc=i=>{try{if(!S)return false;const y=ne252(i);return S.year>=y&&!(S.cl252&&S.cl252[i]===2)}catch(e){return true}};
 setInterval(()=>{try{if(!MAR251.G||!MAR251.vus)return;let k=0;MAR251.vus.forEach((c,i)=>{if(!c.t||!seen(c.t))return;const s=MAR251.G.children[k++];if(s)s.visible=okc(i)})}catch(e){}},1500)}

// un cyclone, une révolte : dans les mois qui suivent, des camps naissent de ces fuites-là
{const m0=modal;modal=function(){const id=S&&S.evq&&S.evq[0];const r=m0.apply(this,arguments);try{const e=id&&EV[id];if(e&&S&&!S.voieC){const tx=(e.t||'')+' '+(typeof e.b==='string'?e.b:'');const k=/cyclone|ouragan/i.test(tx)?'cyclone':/révolte|insurrection|soulèvement/i.test(tx)&&!/^renc252/.test(id)?'revolte':null;
  if(k&&S.nais252!==S.year+k){S.nais252=S.year+k;S.ne252=S.ne252||{};S.cause252=S.cause252||{};const L=MAR251.camps.map((c,i)=>i).filter(i=>ne252(i)>S.year&&!(S.ne252[i]!=null));for(let n=0;n<(k==='cyclone'?2:1)&&L.length;n++){const i=L.splice(Math.floor(Math.random()*L.length),1)[0];S.ne252[i]=S.year;S.cause252[i]=k}}}}catch(x){}return r}}
