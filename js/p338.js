// ===== p338 : la fuite d'Anchaing et Héva suit le vrai chemin. Départ près d'une habitation de Bras-Panon, le long des
// caféières et du champ borné, jusqu'à l'embouchure de la Rivière du Mât ; on remonte la rivière entre Saint-André et
// Bras-Panon, puis on monte à Bellevue, on traverse la forêt de Bélouve et l'on gagne le rempart ; le chapitre suivant
// mène aux Trois Salazes. =====
{const k=Object.keys(INC287).find(q=>/^simang/.test(q));const C=k&&INC287[k].ch[0];if(C){
 C.pre338=null;C.route0=1;C.riv=null;C.rivJ=null;
 C.route=[[55.676,-20.984],[55.668,-20.972],[55.664,-20.965],[55.650,-20.978],[55.636,-20.988],[55.622,-20.995],[55.600,-21.030],[55.570,-21.050],[55.545,-21.060],[55.530,-21.063]];C._rp=null;C.cafe336=[0,.12];
 C.obj='Longer les caféières jusqu’à l’embouchure, remonter la Rivière du Mât, puis Bellevue et la forêt de Bélouve';
 const C1=INC287[k].ch[1];if(C1){C1.route=[[55.530,-21.063],[55.505,-21.070],[55.483,-21.075],[55.465,-21.092],[55.4513,-21.1117]];C1._rp=null;C1.obj=C1.obj||'De Bélouve, gagner le rempart puis les Trois Salazes'}}}
// une habitation au départ : le tracé commence avant la rivière
{const r0=incRoute287;incRoute287=function(C){if(!C.pre338||C._rp)return r0.apply(this,arguments);const out=r0.apply(this,arguments).slice();const W=C.pre338.map(([lo,la])=>xz(lo,la));W.push(out[0]);let pre=[];
 for(let i=0;i<W.length-1;i++){const s=incAstar287(W[i],W[i+1]);pre=pre.concat(pre.length?s.slice(1):s)}C._rp=pre.concat(out.slice(1));return C._rp}}
{const o=incOuvrir287;incOuvrir287=function(k,ci){const r=o.apply(this,arguments);try{if(INC&&/^simang/.test(String(INC.k))&&!(ci|0)&&typeof decor336==='function'){DEC336[INC.k]={0:['cafe']};decor336(INC,INC.k,0)}}catch(e){console.warn(e)}return r}}
