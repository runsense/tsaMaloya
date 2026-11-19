
// ===== p165 : Vie — on VOIT partir ceux qu'on envoie dehors, ils laissent une trace, et l'imprévu en route se joue en les incarnant =====
// 1. Chaque pas d'un groupe laisse une petite trace (pas une route) ; plus on y repasse, et plus un camp est proche, plus elle s'élargit (p97, larg97).
// 2. Les gens du groupe marchent sur la carte, d'une case à l'autre, au fil de la journée.
// 3. En route, un imprévu peut arriver : une blessure, une rencontre (détachement, marrons d'un autre camp). Le groupe s'arrête ;
//    un bandeau propose d'incarner la personne : cueillir des plantes pour se soigner, se cacher… Sinon le groupe se débrouille, perd du temps et rentre affamé.
// 4. Chacun a des points de vie (pv) : la blessure, la faim les font baisser ; le repos au camp les remonte.
// 5. À l'arrivée d'une chasse, on peut incarner le chasseur pour chasser soi-même.
const G165={dern:null};
function pv165(p){if(p.pv==null)p.pv=100;return p.pv}
{const ej=expJour;expJour=function(){try{if(S&&S.grp)S.grp.forEach(g=>{g.prev=g.pos;g.t165=performance.now()})}catch(e){}
 // un groupe arrêté par un imprévu ne bouge pas (il mange quand même)
 const arret=[];try{(S.grp||[]).forEach(g=>{if(g.exp&&g.exp.inc){arret.push([g,g.exp.etat]);g.exp.etat='arrêt'}})}catch(e){}
 const r=ej.apply(this,arguments);
 try{arret.forEach(([g,et])=>{if(g.exp&&g.exp.etat==='arrêt')g.exp.etat=et});
  (S.grp||[]).forEach(g=>{const e=g.exp;if(!e)return;const M=grpMembres(g);
   if(g.pos!==g.prev){S.pas=S.pas||{};S.pas[g.pos]=(S.pas[g.pos]||0)+1;S.trail=S.trail||[];if(!S.trail.includes(g.pos))S.trail.push(g.pos);if(g.prev!=null&&!S.trail.includes(g.prev))S.trail.push(g.prev)}
   if(e.prov<=0)M.forEach(p=>{p.pv=Math.max(5,pv165(p)-6)});
   // l'imprévu en route
   if(!e.inc&&(e.etat==='aller'||e.etat==='retour')&&rnd()<.05&&M.length){const p=M[Math.floor(rnd()*M.length)],k=rnd()<.6?'blesse':'rencontre';e.inc={k,pid:p.id,j0:e.j,lieu:g.pos};
    if(k==='blesse'){p.pv=Math.max(10,pv165(p)-35);p.bl=1;journal('⚠ '+p.n.split(' ')[0]+' se blesse en route, '+(lieuProche(T[g.pos])||'dans la pente')+'. Le groupe s’arrête.')}
    else journal('⚠ '+g.n+' tombe sur des traces fraîches de détachement, '+(lieuProche(T[g.pos])||'en route')+'. Il faut se cacher.')}
   else if(e.inc&&e.j-e.inc.j0>=2&&!e.inc.joue){// laissé à lui-même : le groupe se débrouille, perd du temps et des vivres
    const p=ppId(e.inc.pid);if(e.inc.k==='blesse'&&p){p.pv=Math.min(100,pv165(p)+10);journal(g.n+' repart : '+p.n.split(' ')[0]+' boite, on a perdu deux jours.')}else journal(g.n+' repart quand le danger s’éloigne : deux jours perdus.');e.prov=Math.max(0,e.prov-1);delete e.inc}
   // à l'arrivée d'une chasse
   if(e.but==='chasse'&&e.etat==='sur place'&&e.sur===1&&!e.prop165){e.prop165=1;G165.chasse={g:g.id}}});
  // au camp, on se repose
  (S.pp||[]).forEach(p=>{if(p.pv!=null&&!enGrp(p)&&p.pv<100){p.pv=Math.min(100,p.pv+4);if(p.pv>=70)p.bl=0}})}catch(e){}return r}}
// le bandeau de l'imprévu
setInterval(()=>{try{let b=document.getElementById('inc165');const g=S&&!modeHist()&&!(typeof VP!=='undefined'&&VP)?(S.grp||[]).find(g=>g.exp&&(g.exp.inc||(G165.chasse&&G165.chasse.g===g.id))):null;
 if(!g){if(b)b.remove();return}const e=g.exp,inc=e.inc,p=inc?ppId(inc.pid):grpMembres(g)[0];if(!p){if(b)b.remove();return}
 const txt=inc?(inc.k==='blesse'?'⚠ '+p.n.split(' ')[0]+' est blessé'+(p.g==='f'?'e':'')+' ('+Math.round(pv165(p))+' pv), '+(lieuProche(T[g.pos])||'en route'):'⚠ '+g.n+' doit se cacher : un détachement passe, '+(lieuProche(T[g.pos])||'en route')):'🏹 '+g.n+' arrive sur le lieu de chasse';
 const cle=g.id+txt;if(!b){b=document.createElement('div');b.id='inc165';b.style.cssText='position:fixed;left:50%;top:96px;transform:translateX(-50%);z-index:60;background:#fbf7ec;color:#14110c;border:3px solid #b0301e;border-radius:10px;padding:8px 12px;font:600 14px system-ui;display:flex;gap:10px;align-items:center;box-shadow:0 6px 20px rgba(0,0,0,.45);animation:inc165 1.2s ease-in-out infinite';document.body.appendChild(b);
  const st=document.createElement('style');st.textContent='@keyframes inc165{0%,100%{box-shadow:0 6px 20px rgba(0,0,0,.45)}50%{box-shadow:0 0 0 5px rgba(176,48,30,.35),0 6px 20px rgba(0,0,0,.45)}}#inc165 button{font:600 13px system-ui;border-radius:7px;padding:5px 10px;border:2px solid #14110c;cursor:pointer}';document.head.appendChild(st)}
 if(b.dataset.c===cle)return;b.dataset.c=cle;b.innerHTML='<span>'+txt+'</span><button id="inc165i" style="background:#14110c;color:#f4c542">Incarner '+p.n.split(' ')[0]+'</button><button id="inc165l" style="background:#fffaf0">'+(inc?'Laisser faire':'Laisser chasser')+'</button>';
 b.querySelector('#inc165i').onclick=()=>{if(inc)inc.joue=1;G165.dern={g:g.id,inc:inc?{...inc}:null,chasse:!inc};G165.chasse=null;b.remove();try{vpOuvrir(g)}catch(x){}setTimeout(()=>{try{if(inc&&inc.k==='blesse')vpMsg('Vous êtes '+p.n.split(' ')[0]+', blessé. Cherchez autour des plantes qui soignent (cueillir), puis reprenez la route.');else if(inc)vpMsg('Un détachement passe. Restez caché dans les fourrés jusqu’à ce qu’il s’éloigne.');else vpMsg('Le lieu de chasse : à vous de jouer.')}catch(x){}},800)};
 b.querySelector('#inc165l').onclick=()=>{G165.chasse=null;if(inc)inc.j0=Math.min(inc.j0,e.j-2);b.remove()}}catch(e){}},700);
// au retour de la vue incarnée : l'imprévu est réglé, au prix d'un peu de temps
setInterval(()=>{try{if(!G165.dern||(typeof VP!=='undefined'&&VP))return;const d=G165.dern;G165.dern=null;const g=(S.grp||[])[d.g];if(!g||!g.exp)return;const e=g.exp;
 if(d.inc&&e.inc){const p=ppId(d.inc.pid);if(d.inc.k==='blesse'&&p){p.pv=Math.min(100,pv165(p)+25);journal(p.n.split(' ')[0]+' s’est soigné'+(p.g==='f'?'e':'')+' avec les plantes d’ici. Le groupe repart, avec un jour de retard.')}else journal(g.n+' est resté caché : le détachement est passé sans les voir.');delete e.inc}}catch(e){}},800);
// les gens du groupe marchent sur la carte
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(!S||modeHist()||!S.grp||typeof mfPoser!=='function'||dist>16||(typeof VP!=='undefined'&&VP))return r;let ph=.5;try{ph=jourPh()}catch(e){}
  S.grp.forEach(g=>{if(!g.exp||g.pos==null)return;const M=grpMembres(g).slice(0,4),a=T[g.prev!=null?g.prev:g.pos],b=T[g.pos];if(!a||!b)return;const marche=g.prev!=null&&g.prev!==g.pos&&!g.exp.inc&&g.exp.etat!=='sur place';
   const u=marche?Math.min(1,Math.max(0,(ph-.2)/.6)):1,x0=a.x+(b.x-a.x)*u,z0=a.z+(b.z-a.z)*u,ry=Math.atan2(b.x-a.x,b.z-a.z);
   M.forEach((p,k)=>{const ox=Math.cos(k*2.1)*.07*(k?1:0)-Math.sin(ry)*k*.05,oz=Math.sin(k*2.1)*.07*(k?1:0)-Math.cos(ry)*k*.05,x=x0+ox,z=z0+oz;
    const mod=p.g==='f'?(p.role==='cha'?'femme_sagaie':'femme_travail'):(p.role==='cha'?'p1a_chasseur':'homme_chemise');
    mfPoser('gx165_'+g.id+'_'+k,mod,x,Math.max(0,alt(x,z))*VX+.01,z,marche&&u<1?ry:ry+k*1.3,g.exp.inc&&p.id===g.exp.inc.pid&&g.exp.inc.k==='blesse'?'repos_assis':(marche&&u<1?'marche':'repos_debout'))})})}catch(e){}return r}}
