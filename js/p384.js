// ===== p384 : les autres camps marrons ne sont plus des icônes vides.
// (1) Un camp rallié amène SES gens : ils vivent sur sa case (et non au premier camp), avec leur chef quand l'histoire
//     ou la tradition l'a gardé ; on peut y entrer, l'incarner, le voir vivre. Les anciennes parties sont réparées.
// (2) Un camp pas encore rallié se visite : « Aller voir le camp de … » sur sa case ouvre la rencontre
//     (se rallier, échanger, passer sans se montrer). =====
{const RES384=['Mafate','Dimitile','Cimendef','Anchaing','Laverdure','Fatie','Baal','Sarlave','Héva','Raharianne','Simangavole'];
 const nb384=i=>{try{return Math.max(4,Math.min(9,v267(i).g||5))}catch(e){return 5}};
 const FEM384=/reine|compagne|femme|elle |Sarlave|Simangavole|Héva|Raharianne/i;
 // installe k personnes sur la case du camp i (les plus récentes, ou de nouvelles)
 const peupler384=(i,k)=>{const c=MAR251.vus[i];if(!S||!S.pp||!c||!c.t)return 0;const ti=c.t.i;
  const fa=(Math.max(0,...S.pp.map(p=>p.fa||0))||0)+1;const L=[];
  for(let j=0;j<k;j++){const q=nouvellePersonne({g:j%2?'f':'h',age:j<k-2?16+Math.floor(rnd()*30):Math.floor(rnd()*12),st:'libre',fa:fa+(j>>1)});q.camp=ti;for(let t=0;t<9&&RES384.includes(q.n);t++){const Lx=(NOMS[q.or]||NOMS.mg)[q.g]||[];q.n=Lx[Math.floor(rnd()*Lx.length)]}S.pp.push(q);L.push(q)}
  S.gens=S.pp.length;
  // le chef du camp, quand on connaît son nom
  try{const f=chef267(i);if(f&&/^[A-ZÀ-Ý]/.test(f.n)&&!S.pp.some(p=>p.n===f.n)){const fig=(FIG263.find(x=>x[0]===f.n)||[]).join(' ');const fem=FEM384.test(fig);
   const a=L.filter(p=>adulte(p)&&(fem?p.g==='f':p.g==='h'))[0]||L.filter(adulte)[0];if(a){const nm=({'Mafate (Mafack)':'Mafate','Anchaing et Héva':'Anchaing'})[f.n]||f.n;
   // les homonymes tirés au hasard (Mafate, Dimitile… sont aussi des prénoms du jeu) prennent un autre nom ; un chef garde le sien
   const chefsId=new Set(Object.values(S.chefs||{}).map(x=>x&&x.id));
   S.pp.filter(p=>p.n===nm&&!p.fig384&&!chefsId.has(p.id)).forEach(p=>{const Lx=((NOMS[p.or]||NOMS.mg)[p.g]||[]).filter(x=>x!==nm&&!['Mafate','Dimitile','Cimendef','Anchaing','Laverdure','Fatie','Baal'].includes(x));if(Lx.length)p.n=Lx[Math.floor(rnd()*Lx.length)]});
   if(!S.pp.some(p=>p.n===nm)){a.n=nm;a.fig384=1;a.role=a.role||'cha';S.chefs=S.chefs||{};if(a.id!=null)S.chefs[ti]={id:a.id};
   if(f.n==='Anchaing et Héva'){const h=L.find(p=>adulte(p)&&p.g==='f'&&p!==a);if(h){h.n='Héva';h.fig384=1;h.cj=a.id;a.cj=h.id}}}}}}catch(e){}
  S.peu384=S.peu384||{};S.peu384[i]=1;return k};
 window.peupler384=peupler384;window.nb384=nb384;
 // (1) le ralliement : les gens du camp restent chez eux
 try{const o=EV.renc252.o[0],f0=o.f;o.f=function(){const i=S.renc252;const r=f0.apply(this,arguments);
   setTimeout(()=>{try{if(i==null||(S.peu384&&S.peu384[i]))return;const k=nb384(i);
    // les +3 du choix vont aussi sur leur case
    S.gens=Math.max(0,S.gens-3);syncPP();peupler384(i,k);
    log('👥 '+k+' personnes vivent au camp de '+(MAR251.vus[i].n||'la bande')+' : on peut y entrer depuis sa case.');try{sauve()}catch(e){}}catch(e){}},60);return r};
   o.d='Leur camp devient l’un des vôtres : ses gens restent chez eux, sur leur case'}catch(e){}
 // réparer les parties où un camp rallié est resté vide
 setInterval(()=>{try{if(!S||S.voieC||S.fin||!MAR251.vus||!S.pp||!S.cl252)return;let n=0;
  Object.keys(S.cl252).forEach(kk=>{const i=+kk;if(S.cl252[i]!==2||(S.peu384&&S.peu384[i]))return;const c=MAR251.vus[i];if(!c||!c.t)return;
   const o=S.t[c.t.i];if(!o||o.b!=='camp')return;if(S.pp.some(p=>p.camp===c.t.i)){(S.peu384=S.peu384||{})[i]=1;return}
   if(n++>2)return;const k=nb384(i);peupler384(i,k);log('👥 Le camp de '+(c.n||'la bande')+' a retrouvé ses gens : '+k+' personnes.')});
  if(n)try{sauve()}catch(e){}}catch(e){}},5000);
 // (2) aller voir un camp pas encore rallié
 const ici384=t=>{try{if(!S||S.voieC)return null;return libres252().find(o=>o.c.t&&o.c.t.i===t.i&&o.st<2)||null}catch(e){return null}};
 const a0=actions;actions=function(t){const A=a0.apply(this,arguments);try{const o=ici384(t);if(o&&!A.find(a=>a.id==='visite384')){const f=chef267(o.i),v=v267(o.i);
   A.push({id:'visite384',n:'Aller voir le camp de '+(o.c.n||'la bande'),c:1,d:'Environ '+nb384(o.i)+' personnes'+(f?', autour de '+f.n:'')+'. '+(o.st===1?'On se connaît déjà : on parle d’égal à égal.':'Un sifflement d’oiseau d’abord, pour qu’ils sachent qu’on vient en paix.')+' Ensuite : se rallier, échanger, ou repartir.'})}}catch(e){}return A};
 const g0=agir;agir=function(t,id,libre){if(id!=='visite384')return g0.apply(this,arguments);try{const o=ici384(t);if(!o)return false;if(!libre){if(S.bras<1)return false;snap();S.bras-=1}
   S.renc252=o.i;S.renc252y=S.year;if(!S.evq.includes('renc252'))S.evq.unshift('renc252');try{modal()}catch(e){}sauve();return true}catch(e){return false}};
}
// (3) les compagnons des incarnations deviennent des personnes du camp : après Laverdure, Sarlave (Tsaralava) et Sarcemate
//     vivent avec lui, et on peut les incarner à leur tour (⇄ Tab dans la vue en personnage).
{const ALIAS384={Tsaralava:'Sarlave'};
 setInterval(()=>{try{if(!S||S.voieC||S.fin||!S.pp||typeof INC287==='undefined')return;let ch=0;
  Object.keys(INC287).forEach(k=>{const I=INC287[k];const h=S.pp.find(p=>p.n===I.n&&!p.mort);if(!h)return;const ci=h.camp;
   const C={};(I.ch||[]).forEach(c=>(c.comp||[]).forEach(o=>{const n=ALIAS384[o.n]||o.n;if(!/^[A-ZÀ-Ý]/.test(n))return;if(n!==I.n&&!C[n])C[n]=/femme|fille|reine/.test(o.m||'')?'f':'h'}));
   Object.keys(C).forEach(n=>{if(S.pp.some(p=>p.n===n))return;
    let a=S.pp.find(p=>adulte(p)&&!p.mort&&p.camp===ci&&p.g===C[n]&&!p.fig384&&p.id!==h.id&&!Object.values(INC287).some(x=>x.n===p.n));
    if(!a){a=nouvellePersonne({g:C[n],age:24,st:'libre'});a.camp=ci;S.pp.push(a);S.gens=S.pp.length}
    a.n=n;a.fig384=1;if(n==='Sarlave'){a.cj=h.id;h.cj=a.id}ch++;log('👤 '+n+' vit au camp de '+I.n+' : on peut l’incarner.')})});
  if(ch)try{sauve()}catch(e){}}catch(e){}},5000)}

// (4) l'élection du grand roi : les chefs qui ont voté gardent chacun leur territoire, et leurs camps se rallient au royaume.
//     On peut ensuite aller chez Dimitile, Mafate, Anchaing, Cimendef… entrer dans leur camp et les incarner.
{const CAND384={laverdure:'Bras de la Plaine',dimitile:'Dimitile',mafate:'le camp de Mafate',anchaing:'Salazie',cimendef:'Cimandef',fatie:'Piton des Neiges',baal:'Îlet à Cordes'};
 setInterval(()=>{try{if(!S||S.voieC||S.fin||!S.roi||S.elu384===S.roi||!MAR251.vus||!S.pp)return;S.elu384=S.roi;S.cl252=S.cl252||{};const noms=[];
  Object.keys(CAND384).forEach(k=>{const R=ROIS[k];if(R&&((R.mort&&S.year>=R.mort)||(R.fin&&S.year>=R.fin)))return;
   const i=MAR251.vus.findIndex(c=>c.n===CAND384[k]);const c=MAR251.vus[i];if(i<0||!c||!c.t)return;
   if(S.cl252[i]!==2){S.cl252[i]=2;const q=tl(c.t.i);q.s=1;if(!q.b)q.b='camp';q.et=Math.max(q.et||0,1);try{ouvrir(c.t,1)}catch(e){}}
   if(!S.pp.some(p=>p.camp===c.t.i))peupler384(i,nb384(i));noms.push(ROIS[k]?ROIS[k].n:((typeof INC287!=='undefined'&&INC287[k])?INC287[k].n:k))});
  if(noms.length){log('👑 Après l’élection, chaque chef garde son territoire : les camps de '+noms.join(', ')+' sont du royaume. Entrez dans leur camp pour les incarner.');try{sauve()}catch(e){}}}catch(e){}},4000)}
