// ===== p22 : les expéditions de la Construction marchent sur la carte, découvrent, agissent, reviennent ; les patrouilles exploitent =====
const KPOI={objet:{ic:'📦',v:'Ramasser'},sauver:{ic:'🆘',v:'Les ramener'},chasser:{ic:'🐐',v:'Chasser'},raid:{ic:'⚔️',v:'Attaquer'},plante:{ic:'🌿',v:'Cueillir'},exploit:{ic:'⛏️',v:''}};
const KEXP={bois:['🪵','Forêt de bois de couleurs',{bois:3}],pierre:['🪨','Une carrière',{pierre:2}],peche:['🐟','Un bon coin de pêche',{viv:4}],culture:['🌱','Des terres à défricher',{viv:4}],gibier:['🐐','Un terrain de chasse',{viv:3}]};
function kChemin(a,b){const prev={},vu={[a]:1},F=[a];while(F.length){const i=F.shift();if(i===b)break;kVoisins(T[i]).forEach(v=>{if(!vu[v.i]){vu[v.i]=1;prev[v.i]=i;F.push(v.i)}})}const P=[b];let i=b;while(i!==a&&prev[i]!=null){i=prev[i];P.unshift(i)}return P[0]===a?P:[a,b]}
function kCentre(R){return R.T.slice().sort((p,q)=>Math.hypot(p.x-R.cx,p.z-R.cz)-Math.hypot(q.x-R.cx,q.z-R.cz))[0]}
function kPrep2(){if(!K)return;K.poi=K.poi||{};K.pat=K.pat||[];K.vet=K.vet||0;K.exps=K.exps||[]}
// partir : on prend d'abord les plus aguerris
kExpedier=function(rk,n){kPrep2();if(kLibres()<n){toast('Pas assez de bras libres.');return}const vv=Math.ceil(n/2);if(K.res.viv<vv){toast('Il faut '+vv+' vivres pour la route.');return}
 const R=kRegions()[rk],c=(K.col||[]).slice().sort((p,q)=>hd(T[p.i],kCentre(R))-hd(T[q.i],kCentre(R)))[0];if(!c){toast('Il faut une ville d’où partir.');return}
 K.res.viv-=vv;const vet=Math.min(K.vet,n);K.vet-=vet;K.exps.push({v2:1,id:Date.now()%1e7,rk,n,vet,ret:Infinity,path:kChemin(c.i,kCentre(R).i),pos:0,et:'aller',but:{},gens:0});
 kLog('Une expédition de '+n+(vet?' (dont '+vet+' aguerris)':'')+' part de '+c.nom+' vers '+(K.regVu[rk]?R.nom:'une région inconnue')+'.');kSauve();kRendu()};
// ce qu'on trouve en arrivant
function kDecouvre(rk){kPrep2();if(K.poi[rk])return;const R=kRegions()[rk],L=[],pris={},rnd=a=>a[Math.floor(Math.random()*a.length)],libre=A=>{const B=A.filter(u=>!pris[u.i]);const u=B.length?rnd(B):rnd(R.T);pris[u.i]=1;return u},t=()=>libre(R.T).i,col=K.joueur==='c',bas=R.pal==='Bas';
 R.T.forEach(u=>{if((K.b[u.i]||[]).some(x=>x.f!==K.joueur)){const d=(K.b[u.i]||[]).length;if(!L.some(p=>p.k==='raid')){pris[u.i]=1;L.push({k:'raid',t:u.i,nom:col?'Un camp marron':'Une habitation',d})}}});
 if(Math.random()<.7)L.push({k:'sauver',t:t(),nom:col?(bas?'Des naufragés sur la côte':'Des engagés égarés'):'Des fugitifs cachés',v:2+Math.floor(Math.random()*4)});
 if(R.res.gibier)L.push({k:'chasser',t:t(),nom:'Des cabris marrons',v:4+Math.floor(Math.random()*5)});
 if(Math.random()<.6)L.push(bas&&Math.random()<.5?{k:'objet',t:t(),nom:'Une épave',v:{com:2+Math.floor(Math.random()*3),bois:3}}:{k:'objet',t:t(),nom:'Des outils abandonnés',v:{pierre:2,bois:2}});
 if(Math.random()<.5)L.push({k:'plante',t:t(),nom:'Des plantes qui soignent',v:{sav:2}});
 Object.keys(KEXP).filter(r=>R.res[r]).sort(()=>Math.random()-.5).slice(0,2).forEach(r=>{const C=R.T.filter(u=>r==='peche'?KACT.peche.ok(u):r==='bois'?u.forest:r==='pierre'?KACT.pierre.ok(u):true),u=libre(C.length?C:R.T);L.push({k:'exploit',r,t:u.i,nom:KEXP[r][1]})});
 L.forEach((p,n)=>p.id=rk+'_'+n);K.poi[rk]=L}
// une action sur place, puis le retour
function kAgir(e,p){const R=kRegions()[e.rk],col=K.joueur==='c';let m='';
 if(p.k==='objet'||p.k==='plante'){Object.entries(p.v).forEach(([r,v])=>e.but[r]=(e.but[r]||0)+v);m=p.nom+' : rapporté.'}
 else if(p.k==='chasser'){e.but.viv=(e.but.viv||0)+Math.min(p.v,e.n);m='Chasse : '+Math.min(p.v,e.n)+' vivres.'}
 else if(p.k==='sauver'){if(Math.random()<.75+.04*e.vet){e.gens+=p.v;m=p.nom+' : '+p.v+' personnes suivent l’expédition.'}else m=p.nom+' : ils ont fui avant qu’on les rejoigne.'}
 else if(p.k==='raid'){const ch=Math.max(.1,Math.min(.9,.2+.5*e.vet/e.n+.02*e.n-.1*(p.d||1)));if(Math.random()<ch){K.tension+=col?15:10;
   if(col){e.but.com=(e.but.com||0)+3;m='Le camp est brûlé, ses gens se dispersent dans les bois. La prime : 3 de commerce.';const f=K.fac.m;if(f)f.conf=Math.max(0,f.conf-10)}
   else{e.but.viv=(e.but.viv||0)+6;e.but.pierre=(e.but.pierre||0)+2;const lib=2+Math.floor(Math.random()*4);e.gens+=lib;m='Raid réussi : vivres, outils, et '+lib+' esclaves partent avec l’expédition.'}}
  else{const pe=Math.max(1,Math.round(e.n*(.3+Math.random()*.2)));e.n-=pe;e.vet=Math.min(e.vet,e.n);K.tension+=8;m='L’attaque échoue : '+pe+' ne reviendront pas.';const f=K.fac[kMesFacs()[0]];if(f)f.pop=Math.max(0,f.pop-pe)}}
 p.fait=1;kLog(R.nom+' — '+m);toast(m);kRetour(e)}
function kRetour(e){const c=(K.col||[]).slice().sort((p,q)=>hd(T[p.i],T[e.path[e.path.length-1]])-hd(T[q.i],T[e.path[e.path.length-1]]))[0];e.path=kChemin(e.path[Math.min(e.path.length-1,Math.floor(e.pos))],c?c.i:e.path[0]);e.pos=0;e.et='retour';kSauve();kRendu()}
function kArrive(e){const R=kRegions()[e.rk];if(e.et==='aller'){K.regVu[e.rk]=1;R.T.forEach(t=>K.vu[t.i]=1);kDecouvre(e.rk);e.et='place';const n=(K.poi[e.rk]||[]).filter(p=>!p.fait&&p.k!=='exploit').length;
  kLog('L’expédition atteint '+R.nom+'.');toast('L’expédition atteint '+R.nom+' : '+n+' chose'+(n>1?'s':'')+' à faire. Une seule action, puis le retour.');if(K.vue==='ile'){KVUE.reg=e.rk;KVUE.sel=null}kSauve();kRendu();return}
 // de retour : le butin, les gens ramenés, et l'expérience gagnée
 Object.entries(e.but).forEach(([r,v])=>K.res[r]=(K.res[r]||0)+v);const f=K.fac[kMesFacs()[0]];if(f&&e.gens)f.pop+=e.gens;K.vet+=e.n;
 kLog('Retour d’expédition ('+e.n+' personnes'+(e.gens?', '+e.gens+' de plus':'')+(Object.keys(e.but).length?' · '+Object.entries(e.but).map(([r,v])=>v+' '+r).join(', '):'')+').');toast('L’expédition est rentrée.');K.exps=K.exps.filter(x=>x!==e);kSauve();kRendu()}
// le pas du temps : les expéditions avancent pendant qu'on regarde
setInterval(()=>{const d=$('kons');if(!K||!d||d.hidden||document.hidden||!K.exps)return;let bouge=0;K.exps.filter(e=>e.v2&&e.et!=='place').forEach(e=>{e.pos+=.5;bouge=1;if(e.pos>=e.path.length-1){e.pos=e.path.length-1;kArrive(e)}});if(bouge&&K.vue==='ile')kCarte()},700);
// les patrouilles : des gens qui tiennent un lieu loin de la ville pour l'exploiter
function kPatrouille(p,n){kPrep2();if(kLibres()<n){toast('Pas assez de bras libres.');return}if(K.res.viv<2){toast('Il faut 2 vivres pour l’installer.');return}K.res.viv-=2;const x=K.pat.find(q=>q.id===p.id);if(x)x.n+=n;else K.pat.push({id:p.id,rk:p.id.split('_').slice(0,-1).join('_'),r:p.r,n});kLog('Une patrouille tient '+p.nom+'.');kSauve();kRendu()}
{const ko=kOccupes;kOccupes=function(){return ko()+((K&&K.pat)||[]).reduce((s,q)=>s+q.n,0)}}
{const ka=kAnnee;kAnnee=function(){ka();kPrep2();K.pat.forEach(q=>{const g=KEXP[q.r][2],f=q.n/5;Object.entries(g).forEach(([r,v])=>K.res[r]=(K.res[r]||0)+v*f);const R=kRegions()[q.rk];if(R&&R.T.some(t=>(K.b[t.i]||[]).some(x=>x.f!==K.joueur))&&Math.random()<.15){const pe=1;q.n-=pe;K.tension+=4;kLog('Une patrouille est surprise près de '+R.nom+' : un mort.')}});K.pat=K.pat.filter(q=>q.n>0)}}
// le panneau de la région : expéditions sur place, ce qu'on a trouvé, les patrouilles
{const kp=kPanneau;kPanneau=function(){kp();kPrep2();if(K.vue!=='ile'||!KVUE.reg)return;const rk=KVUE.reg,b0=$('kA')&&$('kA').querySelector('.pc'+(K.fin?':nth-of-type(2)':''));if(!b0)return;
 const E=K.exps.filter(e=>e.v2&&e.rk===rk),P=(K.poi[rk]||[]);let h='';
 E.forEach(e=>{h+='<div style="margin-top:6px;padding:6px;border:1px solid #6a5a3a;border-radius:6px"><b>🧭 Expédition de '+e.n+'</b> <small>'+(e.vet?e.vet+' aguerris · ':'')+(e.et==='aller'?'en route ('+Math.round(e.pos/(e.path.length-1)*100)+' %)':e.et==='retour'?'sur le retour':'sur place')+(e.gens?' · '+e.gens+' personnes suivent':'')+'</small>'+
  (e.et==='place'?'<br>'+P.filter(p=>!p.fait&&p.k!=='exploit').map(p=>'<button class="bt" data-ag="'+e.id+'|'+p.id+'">'+KPOI[p.k].ic+' '+KPOI[p.k].v+' : '+p.nom+(p.k==='raid'?' <small>(chance '+Math.round(Math.max(.1,Math.min(.9,.2+.5*e.vet/e.n+.02*e.n-.1*(p.d||1)))*100)+' %)</small>':'')+'</button>').join('')+'<button class="bt sec" data-rv="'+e.id+'">↩ Revenir</button>':'')+'</div>'});
 if(P.length){h+='<div style="margin-top:6px"><b>Ce qu’on y a trouvé</b>'+P.map(p=>'<div style="margin:2px 0"><small>'+(p.k==='exploit'?KEXP[p.r][0]:KPOI[p.k].ic)+' '+p.nom+(p.fait?' — fait':'')+'</small>'+(p.k==='exploit'&&!K.fin?(()=>{const q=K.pat.find(q=>q.id===p.id);return ' <small>'+(q?'🛡️ patrouille de '+q.n:'')+'</small> <button class="bt'+(kLibres()>=5?'':' sec')+'" data-pa="'+p.id+'">'+(q?'+5 à la patrouille':'Créer une patrouille (5)')+'</button>'+(q?'<button class="bt sec" data-pr="'+p.id+'">Rappeler</button>':'')})():'')+'</div>').join('')+'</div>'}
 if(!h)return;b0.insertAdjacentHTML('beforeend',h);
 b0.querySelectorAll('[data-ag]').forEach(b=>b.onclick=()=>{const [ei,pi]=b.dataset.ag.split('|'),e=K.exps.find(x=>x.id==ei),p=P.find(x=>x.id===pi);if(e&&p)kAgir(e,p)});
 b0.querySelectorAll('[data-rv]').forEach(b=>b.onclick=()=>{const e=K.exps.find(x=>x.id==b.dataset.rv);if(e){kLog('L’expédition rentre sans rien tenter.');kRetour(e)}});
 b0.querySelectorAll('[data-pa]').forEach(b=>b.onclick=()=>{const p=P.find(x=>x.id===b.dataset.pa);if(p)kPatrouille(p,5)});
 b0.querySelectorAll('[data-pr]').forEach(b=>b.onclick=()=>{K.pat=K.pat.filter(q=>q.id!==b.dataset.pr);kSauve();kRendu()})}}
// sur la carte de l'île : les chemins, les expéditions là où elles sont, ce qu'on a trouvé
function kDessExp(x,P,Rh){kPrep2();x.save();x.textAlign='center';x.textBaseline='middle';
 Object.entries(K.poi).forEach(([rk,L])=>{if(!K.regVu[rk])return;L.forEach(p=>{if(p.fait)return;const [a,b]=P(T[p.t]),q=p.k==='exploit'&&K.pat.find(q=>q.id===p.id);x.globalAlpha=.95;x.font=Math.max(11,Rh*1.1)+'px system-ui';x.fillText(p.k==='exploit'?KEXP[p.r][0]:KPOI[p.k].ic,a,b);if(q){x.font=Math.max(9,Rh*.8)+'px system-ui';x.fillText('🛡️',a+Rh*.8,b-Rh*.6)}})});
 K.exps.filter(e=>e.v2).forEach(e=>{const pts=e.path.map(i=>P(T[i])),i0=Math.floor(e.pos),f=e.pos-i0,a=pts[i0],b=pts[Math.min(i0+1,pts.length-1)],cx=a[0]+(b[0]-a[0])*f,cy=a[1]+(b[1]-a[1])*f;
  x.globalAlpha=1;x.setLineDash([3,4]);x.lineWidth=2;x.strokeStyle=e.et==='retour'?'rgba(170,230,255,.9)':'rgba(255,220,120,.95)';x.beginPath();x.moveTo(cx,cy);pts.slice(i0+1).forEach(p=>x.lineTo(p[0],p[1]));x.stroke();
  x.setLineDash([]);x.strokeStyle='rgba(255,255,255,.25)';x.beginPath();pts.slice(0,i0+1).forEach((p,n)=>n?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.lineTo(cx,cy);x.stroke();
  const pul=e.et==='place'?1+.15*Math.sin(performance.now()/200):1;x.beginPath();x.arc(cx,cy,Rh*.75*pul,0,7);x.fillStyle=e.et==='place'?'rgba(255,200,80,.9)':'rgba(20,15,10,.85)';x.fill();x.lineWidth=2;x.strokeStyle='#ffd36a';x.stroke();
  x.font='bold '+Math.max(10,Rh*.55)+'px system-ui';x.fillStyle=e.et==='place'?'#1a1208':'#ffd36a';x.fillText(e.n,cx,cy);x.font=Math.max(10,Rh*.8)+'px system-ui';x.fillText('🧭',cx,cy-Rh*1.1)});
 x.restore()}
// en quittant la Construction, on revient au menu d'accueil, visible (il restait caché : on tombait sur la carte vide)
{const kf=kFermer;kFermer=function(){kf();const e=$('ecran');if(e){e.hidden=false;e.style.display=''}}}
