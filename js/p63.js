// ===== p63 : le rang se voit — dans la liste des gens (mode Vie), chacun à sa place =====
// Au camp : la famille du chef (ou du roi) d'abord, puis les anciens, les chasseurs et guerriers, puis les cueilleurs et les autres ; la force départage.
// À l'habitation : le maître et sa famille, les autres colons libres, le commandeur, les domestiques de la grande maison, puis les esclaves des champs.
const RANGS={m:['Famille du chef','Ancien','Chasseur, guerrier','Guérisseur','Cueillette et travaux'],c:['Famille du maître','Colon libre','Commandeur','Engagé','Domestique de la maison','Esclave des champs']};
const RANGC=['#e8be5a','#c9b48a','#b8d070','#a0c8e0','#c0b0a0','#a89888'];
function rangDe(p){const ci=campDe(p),ch=(S.chefs||{})[ci],chef=ch&&ppId?ppId(ch.id):null,a=ageP(p);
 if(!S.voieC){if(chef&&(p.id===chef.id||p.fa===chef.fa))return 0;if(a>=50)return 1;if(p.role==='cha'||(p.sk&&p.sk.gue>=4))return 2;if(p.role==='mys')return 3;return 4}
 if(typeof noble==='function'&&noble(p))return 0;if(p.st==='libre'&&(p.or==='eu'||p.or==='cr'))return 1;if(chef&&p.id===chef.id&&p.st!=='libre')return 2;if(p.st==='engagé')return 3;
 const t=typeof tacheDe==='function'?tacheDe(p):'';if(/cuisine|soin|maison|eau|lavand/.test(t)||p.role==='mys')return 4;return 5}
function forceDe(p){const s=p.sk||{};return (s.gue||0)*2+(s.cha||0)+(p.niv||0)*2+(ageP(p)<45?2:0)}
function rangOrdonner(d){const rows=[...d.querySelectorAll('[data-pid]')].filter(r=>r.classList.contains('pc')||r.classList.contains('ac'));if(rows.length<2)return;
 const par=new Map();rows.forEach(r=>{const P=r.parentElement;if(!par.has(P))par.set(P,[]);par.get(P).push(r)});
 par.forEach((L,P)=>{const info=L.map(r=>{const p=ppId(+r.dataset.pid);return {r,p,k:p?rangDe(p):9,f:p?forceDe(p):0}}).filter(x=>x.p);
  info.sort((a,b)=>a.k-b.k||b.f-a.f);const ancre=L[0].previousSibling;let prev=-1;const frag=document.createDocumentFragment();
  info.forEach(x=>{if(x.k!==prev){prev=x.k;const h=document.createElement('div');h.className='rgH';h.textContent=RANGS[S.voieC?'c':'m'][x.k]||'';h.style.cssText='font:600 11px Montserrat,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:'+(RANGC[x.k]||'#aaa')+';margin:8px 0 3px;opacity:.9';frag.appendChild(h)}
   x.r.style.borderLeft='3px solid '+(RANGC[x.k]||'#666');frag.appendChild(x.r)});
  P.querySelectorAll(':scope > .rgH').forEach(h=>h.remove());if(ancre&&ancre.parentElement===P)P.insertBefore(frag,ancre.nextSibling);else P.appendChild(frag)})}
{const cl=cvListe;cvListe=function(){const r=cl.apply(this,arguments);try{if(!S||!CV.on||modeHist())return r;const d=$('cvL');if(d)rangOrdonner(d)}catch(e){}return r}}

// le maître est le plus âgé des colons libres venus d'Europe (pas le plus âgé de l'habitation)
noble=function(p){if(!S.voieC)return false;if(S.nobleFa2==null||S.nobleFa2===-1){const o=(S.pp||[]).filter(q=>adulte(q)&&q.st==='libre'&&q.or==='eu').sort((a,b)=>ageP(b)-ageP(a))[0];S.nobleFa2=o?o.fa:-1}return p.fa===S.nobleFa2};
// chaque rang a ses fonctions : plus on monte, plus elles sont nombreuses et larges
const RANGF={m:[['Conseil','arbitre','parle aux autres camps'],['Mémoire','transmet les savoirs','lit le ciel','soigne'],['Chasse','défense','éclaire les sentiers'],['Soins','tisanes','rites'],['Cueillette','bois, eau, paille']],
 c:[['Dirige l’habitation','commerce','siège au quartier'],['Régit les comptes','surveille les magasins'],['Répartit les tâches','surveille les champs'],['Contrat d’engagement','champs ou moulin'],['Cuisine','soins','service de la maison'],['Champs','moulin','charrois']]};
{const ro=rangOrdonner;rangOrdonner=function(d){ro(d);d.querySelectorAll('[data-pid]').forEach(r=>{const p=ppId(+r.dataset.pid);if(!p)return;let f=r.querySelector('.rgF');if(!f){f=document.createElement('small');f.className='rgF';f.style.cssText='display:block;opacity:.75;font-size:11px';const b=r.querySelector('b');(b&&b.parentElement===r?b:r.firstChild)&&r.insertBefore(f,(b&&b.nextSibling)||null)}
 const L=RANGF[S.voieC?'c':'m'][rangDe(p)]||[];f.textContent=L.join(' · ')})}}
