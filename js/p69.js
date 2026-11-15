// ===== p69 : Survie — la population vient d'ailleurs : les navires pour la colonie, les fuites pour les marrons =====
// Côté colonie : un navire mouille de temps en temps (plus souvent avec un port, jamais pendant un blocus) ;
// il amène quelques colons, et jusqu'en 1848 des esclaves (rares avant le café, nombreux après 1715) ; après 1848, des engagés.
// Côté marrons : des esclaves en fuite rejoignent les camps, d'autant plus que la colonie est grande et dure.
function kFac(f,conf){K.fac[f]=K.fac[f]||{conf:conf||50,pop:0};return K.fac[f]}
const kRnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
{const km=kMois;kMois=function(){km.apply(this,arguments);try{if(!K||K.fin)return;const an=K.an||1663;
 if(K.joueur==='c'){const port=Object.values(K.b||{}).some(L=>L.some(x=>x.k==='port'&&x.f==='c')),bl=typeof kBlocus==='function'&&kBlocus(an);
  if(bl||Math.random()>(port?.22:.12))return;const col=kRnd(1,an<1730?3:2);kFac('c').pop+=col;let msg='⛵ Un navire mouille devant '+((K.col&&K.col[0]&&K.col[0].nom)||'Saint-Paul')+' : '+col+' colon'+(col>1?'s':'');
  if(an>=1665&&an<1848){const e=an<1715?kRnd(1,4):kRnd(3,10);kFac('e',40).pop+=e;msg+=', '+e+' esclave'+(e>1?'s':'')+' débarqué'+(e>1?'s':'')+' de force'}
  else if(an>=1848){const a=kRnd(3,8);kFac('a',50).pop+=a;msg+=', '+a+' engagé'+(a>1?'s':'')+' venus de l’Inde'}
  kLog(msg+'.');toast(msg+'.')}
 else{const col=K.fac.c||K.fac.p,ten=(col&&col.pop||20)/40+(K.fac.e&&K.fac.e.pop||0)/60;if(Math.random()>Math.min(.35,.08+ten*.05))return;const n=kRnd(1,an<1715?2:4);kFac('m').pop+=n;
  const msg='🌿 '+n+' esclave'+(n>1?'s':'')+' en fuite rejoi'+(n>1?'gnent':'nt')+' le camp, guidé'+(n>1?'s':'')+' par les sentiers.';kLog(msg);toast(msg)}}catch(e){}}}

// ===== une société cohérente : qui est qui, qui travaille où, et ce que tout ce monde mange =====
// Côté colonie : des colons (le maître et sa famille ne travaillent pas, les autres oui) et des esclaves (domestiques, champs), puis des engagés.
// Les marrons ne font pas partie de la colonie : ils vivent dans les Hauts. Côté marrons : seulement les camps.
// Les bras viennent de ces nombres : sept personnes sur dix peuvent travailler (les autres sont enfants ou trop vieux).
{const kn=kNouveau;kNouveau=function(f){const r=kn.apply(this,arguments);try{if(f==='c'&&!K.fac.e){const c=K.fac.c.pop;K.fac.c.pop=Math.max(4,Math.round(c*.35));kFac('e',40).pop=c-K.fac.c.pop}}catch(e){}return r}}
function kSoc(){const c=K.joueur==='c',F=K.fac;if(c){const col=(F.c?F.c.pop:0)+(F.p?F.p.pop:0)+(F.s?F.s.pop:0),es=F.e?F.e.pop:0,en=F.a?F.a.pop:0,mai=Math.max(1,Math.round(col*.25));
  return {ames:col+es+en,lignes:[['Colons',col,'dont '+mai+' de la famille du maître, qui ne travaillent pas'],['Esclaves',es,Math.round(es*.2)+' à la maison, '+(es-Math.round(es*.2))+' aux champs'],...(en?[['Engagés',en,'sous contrat, aux champs et au moulin']]:[])],
   pools:{maitre:0,libre:Math.round((col-mai)*.7),dom:Math.round(es*.2*.7),champ:Math.round(es*.8*.7)+Math.round(en*.7)}}}
 const m=F.m?F.m.pop:0;return {ames:m,lignes:[['Marrons',m,(n=>n+' ancien'+(n>1?'s':''))(Math.round(m*.12))+', '+Math.round(m*.3)+' chasseurs et guerriers, les autres aux cueillettes et aux jardins']],pools:{ancien:Math.max(1,Math.round(m*.12*.8)),chasseur:Math.round(m*.3*.7),cueil:Math.round(m*.58*.7)}}}
kPools=function(){const R=kSoc().pools;if(K&&K.domGreve>0&&R.dom!=null)R.dom=0;return R};
kBras=function(){const P=kSoc().pools;return Object.values(P).reduce((s,v)=>s+v,0)};
// le panneau « Les factions » devient « Votre société » : les nombres qui comptent, et l'adversaire à part
{const kp=kPanneau;kPanneau=function(){const r=kp.apply(this,arguments);try{const A=$('kA');if(!A)return r;const h=[...A.querySelectorAll('.pc h4')].find(x=>x.textContent==='Les factions');if(!h)return r;const S0=kSoc(),c=K.joueur==='c',o=kOccupes(),t=kBras(),bes=Math.round(S0.ames*.1*10)/10;
 h.parentElement.innerHTML='<h4>Votre société</h4>'+S0.lignes.map(([n,v,d])=>'<div style="margin:3px 0"><b>'+n+' : '+v+'</b><br><small>'+d+'</small></div>').join('')+
  '<div style="margin-top:6px;border-top:1px solid rgba(232,190,90,.25);padding-top:4px"><small>En tout <b>'+S0.ames+' âmes</b>, dont <b>'+t+'</b> peuvent travailler : <b>'+o+'</b> au travail, <b>'+Math.max(0,t-o)+'</b> libres.<br>Elles mangent <b>'+bes+' vivres par an</b> ; chaque naissance, chaque arrivée en ajoute.</small></div>'+
  '<div style="margin-top:6px;opacity:.75"><small>'+(c?'Dans les Hauts vivent des marrons : ils ne font pas partie de la colonie.':'En bas, la colonie et ses esclaves : ce n’est pas votre monde.')+'</small></div>'}catch(e){}return r}}
// les naissances : quand on mange et qu'on boit bien (une rivière, une source, ou un puits près de chez soi), des enfants naissent
function kEau(){const C=(K.col||[]).map(x=>T[x.i]).filter(Boolean);return C.some(c=>T.some(t=>t.riv&&hd(t,c)<=2))}
{const km=kMois;kMois=function(){km.apply(this,arguments);try{if(!K||K.fin)return;const mo=typeof kReserve==='function'?kReserve():0;if(mo<12)return;const eau=kEau();const F=K.joueur==='c'?['c','e','a']:['m'];
 F.forEach(f=>{const x=K.fac[f];if(!x||x.pop<2)return;const p=x.pop*.004*(eau?1:.5)*((K.tension||0)>60?.5:1);if(Math.random()<p){x.pop++;const nm={c:'chez les colons',e:'chez les esclaves',a:'chez les engagés',m:'au camp'}[f];kLog('👶 Une naissance '+nm+'.');toast('Une naissance '+nm+'.')}})}catch(e){}}}
// le foyer montre aussi combien de bouches il faut nourrir
{const kf=kFoyer;kFoyer=function(){const r=kf.apply(this,arguments);try{const f=$('kFoyer');if(!f)return r;let b=f.querySelector('.bouches');if(!b){b=document.createElement('div');b.className='bouches';b.style.cssText='font:600 11px Montserrat,sans-serif;letter-spacing:.06em;color:#f0e6d0;opacity:.85;margin-top:2px';f.appendChild(b)}
 const S0=kSoc();b.textContent=S0.ames+' âmes · mangent '+(Math.round(S0.ames*.1*10)/10)+' vivres/an'}catch(e){}return r}}
// les anciennes silhouettes de groupe (cylindres, très grandes) ne réapparaissent plus jamais, même si un personnage tarde à charger
{const b0=bat;bat=function(k){try{b0(k)}catch(e){console.warn("bat",e.message)}try{if(typeof grp!=='undefined'&&grp)grp.visible=false;if(typeof chas!=='undefined'&&chas)chas.visible=false;(typeof GRPM!=='undefined'?GRPM:[]).forEach(m=>{if(m.isMesh&&m.geometry&&!/Ring/.test(m.geometry.type))m.visible=false})}catch(e){}}}

// ----- les accessoires (caisse sur la tête, bâton, kayamb…) ne restent plus affichés d'une animation à l'autre -----
// (une animation qui montre un objet le laisse à taille 1 ; la suivante, qui n'en parle pas, ne le cachait pas)
function p3Range(root){const u=root.userData;if(!u.props){u.props=[];root.traverse(o=>{if(o.isBone&&P3OBJ.includes(o.name))u.props.push(o)})}u.props.forEach(b=>b.scale.set(0,0,0))}
{const mj=mfJouer;mfJouer=function(f,clip){if(f&&f.o&&f.mx&&f.clip!==clip)try{p3Range(f.o)}catch(e){}return mj.apply(this,arguments)}}

// ----- Survie : on peut envoyer ou retirer une personne à la fois (−1 / +1), et le jeu dit pourquoi il en met moins que demandé -----
function kPlusMoinsUn(box,t,refaire){box.querySelectorAll('[data-tp]').forEach(p=>{if(p.dataset.un)return;p.dataset.un=1;const k=p.dataset.tp,i=t?t.i:+p.dataset.tp.split('|')[0];
  const plus=document.createElement('button');plus.className='bt sec';plus.textContent='+1';plus.title='Envoyer une personne';plus.onclick=e=>{e.stopPropagation();kMettre(t.i,k,1);kSauve();kRendu();refaire()};p.before(plus);
  const row=p.parentElement,moins=row&&row.querySelector('[data-tm="'+k+'"]');if(moins){const m1=document.createElement('button');m1.className='bt sec';m1.textContent='−1';m1.title='Retirer une personne';m1.onclick=e=>{e.stopPropagation();kMettre(t.i,k,-1);kSauve();kRendu();refaire()};moins.after(m1)}})}
{const kb=kBulle;kBulle=function(t,x,y){const q=$('kQui');if(q)q.remove();const r=kb.apply(this,arguments);try{const b=$('kBul');if(b&&!b.hidden)kPlusMoinsUn(b,t,()=>setTimeout(()=>kBulle(t,x,y),60))}catch(e){}return r}}
{const km=kMettre;kMettre=function(i,act,d){const av=((K.trav||{})[i]||{})[act]||0;const r=km.apply(this,arguments);try{const ap=((K.trav||{})[i]||{})[act]||0,fait=ap-av;
 if(d>0&&fait>0&&fait<d)toast('Seulement '+fait+' personne'+(fait>1?'s':'')+' de libre pour cette tâche : '+fait+' envoyée'+(fait>1?'s':'')+' au lieu de '+d+'.');
 if(d<0&&-fait>0&&-fait<-d)toast('Il n’y avait que '+(-fait)+' personne'+(-fait>1?'s':'')+' ici : tout le monde est revenu.')}catch(e){}return r}}
// ----- une seule fenêtre à la fois : la bulle, la liste « Qui travaille où », le guide se cèdent la place -----
{const kq=kQui;kQui=function(){if(typeof kBulleFerme==='function')kBulleFerme();return kq.apply(this,arguments)}}
addEventListener('pointerup',e=>{try{const d=$('kons');if(!d||d.hidden||e.target.tagName!=='CANVAS'||!d.contains(e.target))return;setTimeout(()=>{if(KVUE.sel==null)kBulleFerme()},60)}catch(_){}},true);
setInterval(()=>{const b=$('kQuiB');if(b&&!b.dataset.p69){b.dataset.p69=1;b.onclick=()=>kQui()}},500);
{const kd=kQuiDess;kQuiDess=function(){const r=kd.apply(this,arguments);try{const q=$('kQui');if(!q)return r;q.querySelectorAll('[data-qp]').forEach(p=>{const [i,k]=p.dataset.qp.split('|');const b=document.createElement('button');b.className='bt sec';b.textContent='+1';b.onclick=()=>{kMettre(+i,k,1);kSauve();kRendu();kQuiDess()};p.before(b)});
 q.querySelectorAll('[data-qm]').forEach(m=>{const [i,k]=m.dataset.qm.split('|');const b=document.createElement('button');b.className='bt sec';b.textContent='−1';b.onclick=()=>{kMettre(+i,k,-1);kSauve();kRendu();kQuiDess()};m.after(b)})}catch(e){}return r}}
// ----- « Préparer une sortie » : en tête de la fiche, aller au camp (pour former des gens) ou annuler, sans descendre toute la liste -----
{const ep=expPlan;expPlan=function(c,pre){const r=ep.apply(this,arguments);try{const box=$('expP'),pj=box&&box.querySelector('.pjb'),h=pj&&pj.querySelector('h2');if(h&&!pj.querySelector('.expTete')){const d=document.createElement('div');d.className='expTete';d.style.cssText='display:flex;gap:8px;flex-wrap:wrap;margin:-4px 0 8px;position:sticky;top:-1px;background:inherit;padding:4px 0;z-index:2';
 d.innerHTML='<button class="bt sec" id="expCamp">'+(S.voieC?'🏠 Aller à l’habitation':'🔥 Aller au camp')+'</button><button class="bt sec" id="expAnn">✕ Annuler</button>';h.after(d);
 $('expCamp').onclick=()=>{box.remove();if(typeof cvOuvrir==='function')cvOuvrir(c)};$('expAnn').onclick=()=>{const n=$('expN');if(n)n.click();else box.remove()}}}catch(e){}return r}}
