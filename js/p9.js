
// ===== Jeu : faire parler quelqu'un. On touche l'icône, et les phrases les plus plausibles pour ce qu'il fait viennent en tête =====
const CHASSE_KR=[['Ssst… tras koshon isi.',['chasse','sur place']],['Rabat ali vers la ravine !',['chasse','sur place']],['Pa bouz… lé la, akoté pié d’bwa.',['chasse','sur place']],['Mi sant lo van, li vien dsi nou, lé bon.',['chasse','aller']],['Lès lo shien alé dovan.',['chasse','chien']],['Bann goyav lé mir isi, ranpli lo gonis.',['cueil','sur place']],['Nou dsann pa plis ba, néna demoun.',['explorer','danger']],['Nou rantr, lé tro lwin pou nout manzé.',['retour','faim']],['Gard lo sentié, mi pas avan.',['aller']],['Ni artourn la kaz ek in bon shoz.',['retour']]];
const SIGNES=[['♪ Siffler',['danger','chasse','regrouper'],'siffle'],['✋ Signe de la main',['danger','chasse','sur place'],'signe']];
function phrasesCtx(p,g){const c=new Set();const t=g?(g.exp&&g.exp.but):tacheDe(p);if(t)c.add(t);if(g&&g.exp)c.add(g.exp.etat);
 if((S.faimJ||0)>0||(g&&g.exp&&g.exp.prov<1))c.add('faim');if((p.fat||0)>60)c.add('las');if(typeof dangerProche==='function'&&dangerProche())c.add('danger');
 if(!g){const ph=jourPh();if(ph>.72||ph<.04)c.add('nuit');if(ph>.04&&ph<.13)c.add('lever')}if(p.amour)c.add('amour');if(p.drague)c.add('drague');if((S.bt||[]).some(b=>b.k==='chien'&&b.dr>=40))c.add('chien');c.add(trait(p));return c}
function phrasesPour(p,g){const ctx=phrasesCtx(p,g),L=[],nom=q=>q?q.n.split(' ')[0]:'';const lg=humL(p);
 const add=(t,tags,sig)=>{let s=0;tags.forEach(x=>{if(ctx.has(x))s+=2});L.push({t,s,sig})};
 SIGNES.forEach(([t,tags,sig])=>add(t,tags,sig));
 if(lg==='kr')CHASSE_KR.forEach(([t,tags])=>add(t,tags));
 const H=HUM[lg]||HUM.kr;for(const k in H){const tg={lever:['lever'],plein:['plein'],faim:['faim'],las:['las'],colere:['colere'],amour:['amour'],drague:['drague'],matin:['lever','amour'],danger:['danger']}[k]||[k];
  H[k].forEach(t=>add(t.replace(/_/g,nom(ppId(k==='drague'?p.drague:p.amour))||'toi'),tg))}
 const D=lgNoble(p)?{x:DITVF}:(S.voieC?DITKC:DITK),k=p.id===S.garde?'g':(p.role||'x');(D[k]||D.x||[]).forEach(t=>add(t,[g?'':tacheDe(p),'travail']));
 const vu=new Set();return L.filter(x=>!vu.has(x.t)&&vu.add(x.t)).sort((a,b)=>b.s-a.s).slice(0,9)}
function phrasesBoite(p,g,ou){const L=phrasesPour(p,g);const o=document.createElement('div');o.className='pc ph';o.innerHTML='<b>💬 '+p.n.split(' ')[0]+(g?' ('+g.n+')':'')+' dit…</b><br>'+L.map((x,i)=>'<button class="bt'+(i<3?'':' sec')+'" data-ph="'+i+'" style="margin:2px">'+x.t+'</button>').join('');ou.appendChild(o);
 o.querySelectorAll('[data-ph]').forEach(b=>b.onclick=()=>{const x=L[+b.dataset.ph];
  if(g){if(x.sig==='siffle'){journal(p.n.split(' ')[0]+' siffle : '+g.n+' se regroupe aussitôt.'+((S.traque||0)>50?' Le son porte loin, quelqu’un a pu l’entendre.':''));if((S.traque||0)>50)fx({traque:1});if(g.exp)g.exp.siffle=1}
   else if(x.sig==='signe')journal(p.n.split(' ')[0]+' fait signe de la main : ceux qui sont près de lui comprennent, sans un bruit.');else journal(p.n.split(' ')[0]+' : « '+x.t+' »');if(typeof toast==='function')toast(p.n.split(' ')[0]+' : '+x.t)}
  else{if(x.sig&&typeof alerte==='function'){const a=CV.A[p.id];if(a){if(x.sig==='siffle'){a.say='♪ Fiouuu ! (sifflet)';a.sayT=220;const now=performance.now();for(const id in CV.A)CV.A[id].alerte=now+9000}else{a.say='✋ (signe de la main)';a.sayT=200;const now=performance.now();for(const id in CV.A){const q=CV.A[id];if(Math.hypot(q.x-a.x,q.y-a.y)<.16)q.alerte=now+9000}}}}else dire(p,x.t)}
  o.remove()})}
// dans la fiche de la personne choisie
{const cl=cvListe;cvListe=function(){cl();if(!capOn()||!CV.on||CV.selP==null)return;const p=ppId(CV.selP);if(!p)return;const f=$('cvL')&&$('cvL').querySelector('.pc[data-pid="'+p.id+'"]');if(!f)return;
 const b=document.createElement('button');b.className='bt sec';b.textContent='💬 Lui faire dire…';b.style.marginTop='6px';b.onclick=()=>{const v=$('cvL').querySelector('.pc.ph');if(v)v.remove();phrasesBoite(p,null,f)};f.appendChild(b)}}
// dans la carte d'un groupe dehors : les actions se donnent directement, la parole par l'icône
{const pn=panneau;panneau=function(){pn();if(!capOn())return;document.querySelectorAll('[data-gr]').forEach(b=>{const g=(S.grp||[])[+b.dataset.gr];if(!g)return;const c=document.createElement('button');c.className='bt sec';c.textContent='💬';c.title='Faire parler le groupe';
 c.onclick=()=>{const p=grpMembres(g).find(q=>q.role==='cha')||grpMembres(g)[0];if(!p)return;const box=b.parentElement.parentElement;const v=box.querySelector('.pc.ph');if(v)v.remove();phrasesBoite(p,g,box)};b.parentElement.appendChild(c)})}}
// un groupe qui s'est regroupé au sifflet chasse mieux le jour suivant
{const ej=expJour;expJour=function(){(S.grp||[]).forEach(g=>{if(g.exp&&g.exp.siffle&&g.exp.etat==='sur place'&&g.exp.but==='chasse'&&rnd()<.3){g.exp.charge+=1;journal(g.n+' rabat le gibier ensemble, comme au signal.')}if(g.exp)g.exp.siffle=0});ej()}}
// ===== En pause, le monde devient légèrement gris ; il reprend ses couleurs quand la journée repart =====
{const st=document.createElement('style');st.textContent='canvas{transition:filter .6s}body.pauseJ canvas{filter:grayscale(.55) brightness(.94)}';document.head.appendChild(st);
 setInterval(()=>{const on=!!(S&&!modeHist()&&grpOn()&&!S.fin&&typeof chronoLibre==='function'&&!chronoLibre());document.body.classList.toggle('pauseJ',on)},300)}
