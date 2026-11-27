
// ===== p379 : la force selon le rang, et les vrais enchaînements =====
// Trois rangs de combattants : simple (milicien, colon, lutteurs…), boss (les boss de zone de p370) et super boss (la fin d'une
// histoire : Grand Diab, l'envoyé de l'Ordre noir, Desbassyns, Sitarane). Le rang règle la vie, la force des coups et
// l'intelligence de l'adversaire. Les enchaînements sont des suites de coups qui existent vraiment dans chaque art de combat
// (une-deux-uppercut de la boxe anglaise, chassé bas puis fouetté de la savate, chapa giratória puis rasteira de la capoeira…) :
// réussis dans le temps (moins d'une seconde entre deux coups), le dernier coup frappe 30 % plus fort et son nom s'affiche.
// L'adversaire les joue aussi, d'autant plus souvent que son rang est haut.
const RANG379={simple:{pv:1,dm:1,ia:1,cmb:.15,n:'Combattant'},boss:{pv:1.3,dm:1.15,ia:1.15,cmb:.35,n:'Boss'},superboss:{pv:1.6,dm:1.3,ia:1.35,cmb:.55,n:'Super boss'}};
const SUPER379=['grandiab','ombre','desbassyns','sitarane'];
// enchaînements : seq = coups du duel (p1 direct avant, p2 direct arrière, p3 crochet, up uppercut, k1/k2/k3 pieds, bal balayette, ret coup retourné)
const CMB379={
 _:[{n:'Une-deux',seq:['p1','p2']},{n:'Une-deux-uppercut',seq:['p1','p2','up']},{n:'Pied bas, pied haut',seq:['k1','k2']}],
 anglaise:[{n:'Jab, direct, uppercut',seq:['p1','p2','up']},{n:'Direct puis crochet',seq:['p2','p3']},{n:'Double jab',seq:['p1','p1']}],
 savate:[{n:'Chassé bas puis fouetté',seq:['bal','k2']},{n:'Direct et fouetté',seq:['p2','k2']},{n:'Revers et chassé',seq:['k1','k3']}],
 capoeira:[{n:'Chapa giratória puis rasteira',seq:['ret','bal']},{n:'Martelo puis bênção',seq:['k1','k2']},{n:'Meia-lua puis armada',seq:['k3','ret']}],
 moraingy:[{n:'Direct puis uppercut',seq:['p1','up']},{n:'Crochet, crochet',seq:['p3','p3']}],
 kalari:[{n:'Paume puis pied sauté',seq:['p3','k3']},{n:'Coup de pied double',seq:['k1','k2']}],
 kungfu:[{n:'Poings en chaîne',seq:['p1','p1','p1']},{n:'Poing puis balayage',seq:['p1','bal']}],
 escrime:[{n:'Feinte et touche',seq:['p1','p2']},{n:'Double touche',seq:['p2','p2']}],
 varma:[{n:'Frappe aux points vitaux',seq:['p1','p3']},{n:'Pied puis paume',seq:['k1','p3']}]};
function rang379(f){if(!f)return 'simple';if(SUPER379.includes(f.k))return 'superboss';return f.boss?'boss':'simple'}
function cmbListe379(f){return (f&&f.st&&CMB379[f.st])||CMB379._}
// le joueur ou l'adversaire vient de lancer le coup k : l'historique dit si un enchaînement se termine
function cmb379(a,k,now,dire,moi){let H=a.h379||[];const last=H.length?H[H.length-1]:null;if(last&&now-last.t>1000)H=[];H=a.h379=H.slice(-3);H.push({k,t:now});a.cmbK379=null;
 for(const c of cmbListe379(a.f)){const s=c.seq;if(H.length<s.length)continue;const fin=H.slice(-s.length);
  if(fin.every((x,i)=>x.k===s[i])){a.cmbK379=k;a.h379=[];if(dire)dire((moi?'Enchaînement : ':a.f.n+' enchaîne : ')+c.n+' !',1100);break}}}
// l'adversaire : continuer l'enchaînement commencé, ou en commencer un selon son rang
function iaCmb379(b){const R=RANG379[rang379(b.f)];if(b.q379&&b.q379.length)return b.q379.shift();
 if(Math.random()<R.cmb){const L=cmbListe379(b.f),c=L[Math.floor(Math.random()*L.length)];b.q379=c.seq.slice(1);setTimeout(()=>{b.q379=[]},2200);return c.seq[0]}return null}
// appliquer les rangs aux combattants (après p370, qui marque les boss)
(function(){try{if(typeof DUE==='undefined')return;Object.keys(DUE.F).forEach(k=>{const f=DUE.F[k];if(!f||f.rang379)return;f.k=f.k||k;const r=rang379(f),R=RANG379[r];
  f.rang379=r;f.pv0_379=f.pv;f.pv=Math.round(Math.min(f.pv,r==='simple'?f.pv:115)*R.pv);f.dm379=R.dm;f.ia379=R.ia})}catch(e){console.warn('p379',e)}})();
