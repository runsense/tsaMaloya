// ===== p27 : où dort chacun — les cases, la grande maison des maîtres, et ceux qui dorment dehors =====
// Chaque case abrite 5 personnes ; la grande maison n'abrite que la famille du maître, sauf s'il l'ouvre pendant un fort cyclone.
// Dormir dehors use la santé, plus vite chez les enfants (moins de 15 ans) ; sous un cyclone, dehors, on peut en mourir.
const KCASE=5;
function sante(p){if(p.sa==null)p.sa=100;return p.sa}
function maitreFam(p){return S.voieC&&p.st!=='esclave'&&(typeof noble==='function'&&noble(p)||((p.or==='eu'||p.or==='cr')&&p.fa===S.nobleFa))}
// la répartition de la nuit, camp par camp
function logerCamp(ci){const t=T[ci],o=S.t[ci]||{},vl=o.vl||[],nc=Math.min(8,2+vl.filter(v=>v.k==='case').length),P=(S.pp||[]).filter(p=>campDe(p)===ci&&!enGrp(p)),C=S.voieC,R={cases:[],dehors:[]},ouvert=C&&S.gmOuverte&&S.cycNow;
 for(let k=0;k<nc;k++)R.cases.push([]);
 const place=(p,k)=>{if(R.cases[k]&&R.cases[k].length<(C&&k===0?(ouvert?40:8):KCASE+(S.caseR||0))){R.cases[k].push(p);p.dort=k;return true}return false};
 // les maîtres d'abord, dans la grande maison ; puis les familles ensemble, les enfants avec les leurs
 const M=C?P.filter(maitreFam):[];M.forEach(p=>place(p,0));
 const reste=P.filter(p=>!M.includes(p)).sort((a,b)=>(a.fa||0)-(b.fa||0)||ageP(a)-ageP(b));
 reste.forEach(p=>{p.dort=null;if(ouvert&&place(p,0))return;for(let k=C?1:0;k<nc;k++)if(place(p,k))return;R.dehors.push(p)});
 R.dehors.forEach(p=>p.dort=-1);return R}
// chaque jour : dehors, la santé baisse ; sous un toit, elle remonte. Trop basse, on meurt.
{const jt=jourTick;jourTick=function(){jt.apply(this,arguments);if(!S||modeHist()||S.fin)return;
 camps().forEach(c=>{const R=logerCamp(c.i);R.cases.flat().forEach(p=>{p.sa=Math.min(100,sante(p)+3)});
  R.dehors.forEach(p=>{const enf=ageT(p)<15;p.sa=sante(p)-(enf?3:1.5)-(pluie()?1:0);if(rnd()<.15)dire(p,enf?'J’ai froid…':'Encore une nuit dehors.')});
  if(R.dehors.length&&rnd()<.3)journal(R.dehors.length+' personne'+(R.dehors.length>1?'s dorment':' dort')+' dehors à '+campNom(c.i)+' : il manque des cases.')});
 (S.pp||[]).filter(p=>sante(p)<=0).forEach(p=>mourirP(p,'d’avoir trop longtemps dormi dehors'))}}
function mourirP(p,cause){S.pp=S.pp.filter(q=>q!==p);S.gens=Math.max(0,(S.gens||1)-1);if(CV.A)delete CV.A[p.id];if(CV.selP===p.id)CV.selP=null;log(p.n+' est mort'+(p.g==='f'?'e':'')+' '+cause+'.');journal(p.n.split(' ')[0]+' est mort'+(p.g==='f'?'e':'')+'.');if(!S.pp.length&&!(S.grp||[]).length&&!S.espP)fin('mort')}
// le cyclone : qui n'a pas de toit souffre, parfois en meurt ; la grande maison peut ouvrir ses portes
{const cy=cyclone;cyclone=function(fr){const f=fr||(S.cyc&&S.cyc.f)||1;S.cycNow=1;let morts=[];try{
  if(!modeHist()&&S.pp)camps().forEach(c=>{const R=logerCamp(c.i);R.dehors.forEach(p=>{const enf=ageT(p)<15;p.sa=sante(p)-Math.round((enf?25:15)*f);if(f>=2&&rnd()<(enf?.2:.1)*(f-1))morts.push(p)})});
  if(S.voieC&&S.gmOuverte&&f>=2){fx({coh:3,ami:-2});log('Le maître a ouvert la grande maison : tout le monde y a passé la nuit du cyclone.')}
 }finally{S.cycNow=0}
 const r=cy.apply(this,arguments);morts.forEach(p=>{if(S.pp.includes(p))mourirP(p,'dans le cyclone, sans abri')});(S.pp||[]).filter(p=>sante(p)<=0).forEach(p=>mourirP(p,'des suites du cyclone'));return r}}
// quand le cyclone approche, le maître décide : ouvrir ou non la grande maison
setInterval(()=>{if(!S||modeHist()||S.fin||!S.voieC||!S.cyc||S.cyc.in>1||S.gmDem===S.year+'|'+S.ns||!$('ecran').hidden)return;if(!camps().length)return;S.gmDem=S.year+'|'+S.ns;
 const b=document.createElement('div');b.style.cssText='position:fixed;inset:0;z-index:90;background:rgba(10,8,6,.55);display:flex;align-items:center;justify-content:center';
 b.innerHTML='<div class="pjb" style="max-width:460px"><small>Le ciel se charge</small><h2>Un cyclone approche'+(S.cyc.f>=2?' — il sera fort':'')+'</h2><p>Les cases des esclaves tiendront mal. La grande maison est la seule bâtisse solide. Le maître peut l’ouvrir à tous pour la nuit du cyclone : les autres maîtres le lui reprocheront.</p><div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap"><button class="bt sec" id="gmN">La garder fermée</button><button class="bt" id="gmO">Ouvrir la grande maison</button></div></div>';
 document.body.appendChild(b);b.querySelector('#gmN').onclick=()=>{S.gmOuverte=0;b.remove();sauve()};b.querySelector('#gmO').onclick=()=>{S.gmOuverte=1;b.remove();sauve();toast('La grande maison sera ouverte pendant le cyclone.')}},3000);
// la nuit, dans le camp : chacun va à sa case ; ceux qui n'en ont pas se couchent près du feu
{const cc=cvCible;cvCible=function(p,a,L,nuit){if(nuit&&p.id!==S.garde&&!enGrp(p)){if(p.dort==null)logerCamp(CV.camp);const k=p.dort;if(k===-1||k==null){const r=Math.random;return [L.feu[0]+(r()-.5)*.14,L.feu[1]+.04+r()*.06,'dort']}const c=L.cases[k]||L.feu;return [c[0],c[1],'dort']}return cc(p,a,L,nuit)}}
// ceux qui dorment dehors restent visibles, couchés près du feu
{const pb=p3Boucle;p3Boucle=function(){const r=pb.apply(this,arguments);try{(S.pp||[]).forEach(p=>{if(p.dort===-1&&CV.A[p.id]&&CV.A[p.id].act==='dort')CV.A[p.id].vis=1})}catch(e){}return r}}
// le panneau du camp : les places, qui dort dehors, la santé de chacun
{const cl=cvListe;cvListe=function(){cl.apply(this,arguments);const d=$('cvL');if(!d||!CV.on)return;const R=logerCamp(CV.camp),n=R.cases.length,pl=R.cases.reduce((s,c,k)=>s+(S.voieC&&k===0?0:KCASE+(S.caseR||0)),0);
 const box=document.createElement('div');box.className='pc';box.innerHTML='<b>Où dort-on</b><br><small>'+(S.voieC?'Grande maison : '+R.cases[0].map(p=>p.n.split(' ')[0]).join(', ')+'<br>':'')+(n-(S.voieC?1:0))+' case'+(n-(S.voieC?1:0)>1?'s':'')+', '+pl+' places · '+R.dehors.length+' dehors</small>'+
  (R.dehors.length?'<br><small class="ko">Dehors : '+R.dehors.map(p=>p.n.split(' ')[0]+' ('+Math.round(sante(p))+')').join(', ')+'. Bâtissez des cases.</small>':'')+(S.voieC?'<br><button class="bt '+(S.gmOuverte?'':'sec')+'" id="gmT">'+(S.gmOuverte?'Grande maison ouverte au prochain cyclone':'Grande maison fermée au cyclone')+'</button>':'');box.classList.add('dortC');{const K=$('cvCamp'),B=K&&K.querySelector('.besC');if(B){K.querySelectorAll('.dortC').forEach(e=>e.remove());B.after(box)}else d.appendChild(box)}
 const g=box.querySelector('#gmT');if(g)g.onclick=()=>{S.gmOuverte=S.gmOuverte?0:1;sauve();cvListe()}}}
// la santé de chacun dans sa fiche
if(typeof statsPers==='function'){const sp=statsPers;statsPers=function(p){return sp(p)+'<br><small>Santé '+Math.round(sante(p))+' / 100'+(p.dort===-1?' · dort dehors':'')+'</small>'}}
