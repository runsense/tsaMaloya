// ===== p233 : ceux qui n'ont rien à faire (Vie, au camp) =====
// D'abord ils tournent en rond et le disent ; puis le jeu demande de leur donner une tâche ; s'ils attendent trop, ils s'énervent (cohésion en baisse, grognements).
const OIS233={dep:{},der:0,nb:0,ann:0,enerve:0};
const DIT233=['Point rien pou fé…','Pareil, ma pou gratte mon ki.','Mi sa dormi si i fé rien.'];
// sans rien à faire : pas de tâche, ou une tâche du dehors (bois, chasse, cueillette, eau, paille, pierre, pêche, culture) sans lieu, ou dont le lieu est le camp même : alors on tourne en rond
const DEHORS233=['bois','paille','eau','pierre','chasse','cueil','peche','culture'];
function inactifs233(){try{if(!S||S.fin||modeHist()||typeof CV==='undefined'||!CV.on)return [];return cvGens().filter(p=>{const a=CV.A[p.id];if(!a||!adulte(p)||p.bl||a.act==='dort')return false;const k=tacheDe(p);return !k||k==='repos'&&!p.bl||DEHORS233.includes(k)&&(p.lieu==null||p.lieu===CV.camp)})}catch(e){return []}}
function grogne233(){try{const c=sndPret();if(!c)return;[110,98,123].forEach((f,i)=>sTon(f,.35,{t:i*.18,type:'sawtooth',v:.035,a:.04,fl:500,vers:f*.85}))}catch(e){}}
function bandeau233(L){let b=document.getElementById('ois233');if(!L.length){if(b)b.remove();return}if(!b){b=document.createElement('div');b.id='ois233';
  b.style.cssText='position:fixed;left:50%;top:70px;transform:translateX(-50%);z-index:60;background:#2a2016f2;color:#f6ead0;border-left:5px solid #e9c46a;padding:8px 14px;border-radius:6px;font:14px system-ui;box-shadow:0 4px 16px #0008;animation:fiDoux232 .6s ease-out;display:flex;gap:10px;align-items:center';document.body.appendChild(b)}
 const n=L.length;b.innerHTML='<span>✋ '+(n>1?n+' personnes attendent':L[0].n.split(' ')[0]+' attend')+' sans rien à faire. Donnez-leur une tâche.</span><button class="bt" id="ois233b" style="margin:0;padding:4px 10px">Choisir</button>';
 b.querySelector('#ois233b').onclick=()=>{try{CV.selP=L[0].id;document.querySelectorAll('#cvL [data-pid]').forEach(el=>{if(L.some(p=>String(p.id)===el.dataset.pid)){el.style.outline='2px solid #e9c46a';el.scrollIntoView({block:'center'})}});if(typeof cvListe==='function')cvListe()}catch(e){}}}
setInterval(()=>{try{const L=inactifs233(),now=performance.now();const ids=new Set(L.map(p=>String(p.id)));
  for(const k in OIS233.dep)if(!ids.has(k))delete OIS233.dep[k];L.forEach(p=>{if(!OIS233.dep[p.id])OIS233.dep[p.id]=now});
  const longs=L.filter(p=>now-OIS233.dep[p.id]>15000);if(!longs.length){bandeau233([]);OIS233.nb=0;return}
  // 1. ils le disent, l'un après l'autre
  if(now-OIS233.der>14000){OIS233.der=now;const p=longs[Math.floor(Math.random()*longs.length)];dire(p,DIT233[OIS233.nb%DIT233.length]);OIS233.nb++}
  // 2. après trois paroles, le jeu demande d'agir
  if(OIS233.nb>=3)bandeau233(longs);
  // 3. trop longtemps sans rien : on s'énerve
  const trop=longs.filter(p=>now-OIS233.dep[p.id]>90000);if(trop.length&&now-OIS233.enerve>60000){OIS233.enerve=now;grogne233();fx({coh:-1});const p=trop[0];dire(p,'Alors ?! Nou lé là pou rien ?');journal(trop.length>1?trop.length+' personnes tournent en rond au camp : l’humeur se gâte.':p.n.split(' ')[0]+' tourne en rond au camp et s’énerve.')}}catch(e){}},3000);
