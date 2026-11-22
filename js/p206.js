// ===== p206 : le nom de la musique suit l'histoire (Portail de l'esclavage, « Séga, maloya : héritages musicaux issus de l'esclavage »).
// Avant 1830 on dit « danse des Noirs » ; au XIXᵉ « séga » (shéga, chéga, t'siega) ; le mot « maloya » ne s'impose qu'en 1921.
// Le séga primitif se joue au service kabaré, malgache ou kaf, pour les ancêtres, et au bal des Noirs, qui devient le kabar. =====
function nomMusique206(y){return y<1830?'danse des Noirs':y<1921?'séga':'maloya'}
function epoque206(s){try{if(typeof s!=='string'||!S||(S.year||0)>=1921||!/maloya/i.test(s))return s;const n=nomMusique206(S.year||1700);
 return s.replace(/(Tsa ?Maloya)|\b(le |du |au |un |de |d’)?(maloya)\b/gi,(m,titre,art,mot)=>{if(titre)return m;const maj=mot[0]==='M';
  if(n==='danse des Noirs'){const a=(art||'').toLowerCase();const r=a==='du '||a==='de '||a==='d’'?'de la danse des Noirs':a==='au '?'à la danse des Noirs':a==='un '?'une danse des Noirs':'la danse des Noirs';return art?(art[0]===art[0].toUpperCase()?r[0].toUpperCase()+r.slice(1):r):(maj?'Danse des Noirs':'danse des Noirs')}
  return (art||'')+(maj?'Séga':'séga')})}catch(e){return s}}
// les textes qui s'affichent : messages, journal, historique, et le panneau des événements
{const t0=toast;toast=function(m){return t0.apply(this,[epoque206(m)].concat([].slice.call(arguments,1)))}}
{const j0=journal;journal=function(m){return j0.apply(this,[epoque206(m)].concat([].slice.call(arguments,1)))}}
{const l0=log;log=function(m){return l0.apply(this,[epoque206(m)].concat([].slice.call(arguments,1)))}}
{const md=modal;modal=function(){const r=md.apply(this,arguments);try{if(S&&(S.year||0)<1921){const el=document.getElementById('modal');if(el){const W=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;while((n=W.nextNode()))if(/maloya/i.test(n.nodeValue))n.nodeValue=epoque206(n.nodeValue)}}}catch(e){}return r}}
// trois dates de l'histoire de cette musique
Object.assign(EV,{
 e1836shega:{y:1836,tag:'Archive',an:'1836-1837',t:'Le shéga, danse des Noirs',b:'Une gravure de ces années montre « le shéga, danse des noirs » : un cercle, des tambours, des corps qui tournent. Le mot change selon qui l’écrit : chéga, ségah, t’siega. On le joue pour la fête, au bal des Noirs, et pour les ancêtres, au service kabaré.',h:'Portail de l’esclavage : « Séga, maloya, héritages musicaux issus de l’esclavage ».',
  o:[{n:'Écouter',d:'Mystique +2, cohésion +2.',fx:{myst:2,coh:2}}]},
 e1921maloya:{y:1921,tag:'Archive',an:'1921',t:'Le mot maloya',b:'Le mot « maloya » remplace celui de « séga » pour la musique des origines. En malgache, il évoque le mal-être, la tristesse, la douleur. Le séga, lui, devient la chansonnette créole des bals, née des quadrilles et des airs créoles.',h:'Portail de l’esclavage : à partir de 1921, « maloya » supplante « séga » des origines.',
  o:[{n:'Garder les deux',d:'Cohésion +3.',fx:{coh:3}}]},
 e1956interdit:{y:1956,tag:'Archive',an:'1956',t:'Le maloya qu’on voudrait faire taire',b:'Le préfet tente d’interdire le maloya, vu par les autorités et une partie du clergé comme une menace. On le joue alors portes fermées, dans les cours, la nuit. Il faudra attendre 1981 pour qu’il soit de nouveau autorisé.',h:'Portail de l’esclavage : tentative d’interdiction en 1956, autorisé à nouveau en 1981, inscrit au patrimoine immatériel de l’UNESCO en 2009.',
  o:[{n:'Jouer quand même',d:'Mystique +3, cohésion +3, colonie −3.',fx:{myst:3,coh:3,ami:-3}},{n:'Attendre',d:'Colonie +2.',fx:{ami:2}}]}});
setInterval(()=>{try{if(!S||S.fin||!S.evq)return;S.done=S.done||{};['e1836shega','e1921maloya','e1956interdit'].forEach(k=>{const e=EV[k];if(S.done[k]||S.year<e.y||S.year>e.y+20||S.evq.includes(k))return;S.done[k]=1;S.evq.push(k)})}catch(e){}},3000);
