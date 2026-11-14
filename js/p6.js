
// ===== Jeu : en automatique, le camp suit l'histoire contée ; dès que le joueur change, il suit la nouvelle direction =====
// comme pour les utopies du mode Histoire : on ne revient pas en arrière tout seul
const CAPH={m:{cueil:3,chasse:2,peche:1,bois:1.5,paille:1,eau:1,pierre:.5},c:{cueil:3,bois:2,eau:1,paille:1,pierre:1,chasse:.5,peche:.5}};
function capOn(){return S&&!modeHist()&&grpOn()}
function capPoids(){const h=CAPH[S.voieC?'c':'m'],j=S.capJ||{},w={};const tot=Object.values(j).reduce((a,b)=>a+b,0);
 for(const k in h)w[k]=h[k]*(tot?.35:1);for(const k in j)w[k]=(w[k]||0)+j[k]/Math.max(1,tot)*8;return w}
function capChoix(p){const w=capPoids(),L=Object.keys(w).filter(k=>TACHES[k]&&(k!=='peche'||T.some(t=>t.riv&&lieuOK(p,'peche',t)))),s=L.reduce((a,k)=>a+w[k],0);
 // chacun garde la même tâche plusieurs jours, puis change : pas de valse quotidienne
 let x=(((p.id*9301+Math.floor((S.jourN||0)/3)*49297)%233280)/233280)*s;for(const k of L){x-=w[k];if(x<=0)return k}return L[0]}
// les ordres du joueur, une fois donnés, tirent la direction du camp
function capObserve(){if(!capOn())return;S.capJ=S.capJ||{};let neuf=[];(S.pp||[]).forEach(p=>{const t=p.tache||null;if(t&&t!==p.capVu&&TACHES[t]&&t!=='repos'&&t!=='garde'){S.capJ[t]=(S.capJ[t]||0)+1;neuf.push(t)}p.capVu=t;
  const r=p.role||null;if(r&&r!==p.capR){const k={cha:'chasse',cue:'cueil',mys:'cuisine'}[r];if(k){S.capJ[k]=(S.capJ[k]||0)+1;neuf.push(k)}}p.capR=r});
 if(neuf.length&&!S.capDit){S.capDit=1;journal((S.voieC?'L’habitation':'Le camp')+' prend votre direction : quand personne ne leur dit quoi faire, les gens suivent désormais votre façon de mener la vie commune, et non plus l’histoire telle qu’on la raconte.')}}
{const td=tacheDe;tacheDe=function(p){if(!capOn()||p.tache||p.role||p.bl||p.id===S.garde||!adulte(p))return td(p);const a=td(p);
 // la faim passe d'abord (règle déjà en place) : on ne la contredit pas
 if(a==='cueil'||a==='peche')return a;return capChoix(p)}}
{const jt=jourTick;jourTick=function(){capObserve();jt()}}
// dans la vie du camp : ce que suit l'automatique, et le moyen d'y revenir
{const cl=cvListe;cvListe=function(){cl();if(!capOn()||!CV.on)return;capObserve();const d=$('cvL');if(!d||CV.selP!=null&&ppId(CV.selP))return;const j=S.capJ||{},K=Object.keys(j).sort((a,b)=>j[b]-j[a]).slice(0,3);
 const o=document.createElement('p');o.className='note';o.style.margin='0 0 8px';
 o.innerHTML=K.length?'En automatique, '+(S.voieC?'l’habitation':'le camp')+' suit <b>votre direction</b> : '+K.map(k=>TACHES[k][0].toLowerCase()).join(', ')+'. <button class="bt sec" id="capH">Revenir à l’histoire contée</button>':'En automatique, '+(S.voieC?'l’habitation':'le camp')+' suit <b>l’histoire contée</b>. Donnez un ordre à quelqu’un : la vie commune prendra votre direction.';
 d.insertBefore(o,d.children[1]||null);const b=o.querySelector('#capH');if(b)b.onclick=()=>{S.capJ={};S.capDit=0;journal('Le camp reprend le fil de l’histoire contée.');sauve();cvListe()}}}
