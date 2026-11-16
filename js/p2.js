
// ===== Jeu : les sorties se préparent au camp, la carte ne fait qu'informer =====
const EXPB={chasse:['Chasser','chasse'],cueil:['Cueillir','cueille'],explorer:['Explorer','explore'],camp:['Fonder un camp','cherche où s’installer']};
const expConso=n=>.25*n;                 // vivres mangés par jour, pour tout le groupe
const expJours=(prov,n)=>Math.floor(prov/Math.max(.25,expConso(n)))+1;  // on trouve toujours un peu à manger en route
const expPortee=(prov,n)=>Math.max(1,Math.floor(expJours(prov,n)/2)); // aller et retour, une case par jour
function expLibres(c){return (S.pp||[]).filter(p=>adulte(p)&&p.role&&campDe(p)===c&&!enGrp(p)&&p.id!==S.garde)}
function expPlan(c,pre){const box0=document.getElementById('expP');if(box0)box0.remove();const st=window.EXPS||(window.EXPS={coche:{},prov:2,but:'chasse'});if(pre!=null)st.coche[pre]=1;st.c=c;
 const L=expLibres(c);Object.keys(st.coche).forEach(id=>{if(!L.some(p=>p.id===+id))delete st.coche[id]});const n=Object.keys(st.coche).length,maxP=Math.max(0,Math.floor(S.vivres||0));st.prov=Math.min(st.prov,maxP);
 const box=document.createElement('div');box.id='expP';box.className='grpC';box.style.cssText='position:fixed;inset:0;z-index:80;background:rgba(10,8,6,.7);display:flex;align-items:center;justify-content:center';
 const libre=(S.pp||[]).filter(p=>adulte(p)&&!p.role&&campDe(p)===c&&p.id!==S.garde).length;
 box.innerHTML='<div class="pjb" style="max-width:520px;width:calc(100% - 32px);max-height:88vh;overflow:auto"><small>'+(S.voieC?'À l’habitation':'Au camp')+'</small><h2>Préparer une sortie</h2>'+
  '<p class="note" style="margin:4px 0 8px">Qui part ? Seuls les gens formés peuvent sortir. Le garde reste.</p>'+
  (L.length?L.map(p=>'<label style="display:flex;gap:8px;align-items:center;padding:4px 0"><input type="checkbox" data-e="'+p.id+'"'+(st.coche[p.id]?' checked':'')+'> <b>'+ROLES[p.role].ic+' '+p.n+'</b> <small>'+roleN(p.role)+' · agilité '+Math.round(stP(p).agi)+' · fatigue '+Math.round(p.fat||0)+' %'+(p.bl?' · blessé':'')+'</small></label>').join(''):'<p class="note">Personne de formé n’est libre.</p>')+
  '<div style="display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 10px"><button class="bt sec" data-f="cha"'+(libre?'':' disabled')+'>Former un chasseur</button><button class="bt sec" data-f="cue"'+(libre?'':' disabled')+'>Former un cueilleur</button>'+(libre?'':'<small class="note">Plus personne à former.</small>')+'</div>'+
  '<b>Pour faire quoi ?</b><div style="display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 10px">'+Object.keys(EXPB).map(k=>'<button class="bt'+(st.but===k?'':' sec')+'" data-b="'+k+'"'+(k==='camp'&&n<3?' disabled title="Il faut au moins 3 personnes"':'')+'>'+EXPB[k][0]+'</button>').join('')+'</div>'+
  '<b>Vivres emportés : <span id="expV">'+st.prov+'</span></b> <small>(il y en a '+Math.floor(S.vivres||0)+' au camp)</small><br><input type="range" id="expR" min="0" max="'+maxP+'" step="1" value="'+st.prov+'" style="width:100%">'+
  '<p class="note" id="expI"></p><div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap"><button class="bt sec" id="expN">Annuler</button><button class="bt" id="expOk"'+(n?'':' disabled')+'>Choisir la destination sur la carte</button></div></div>';
 document.body.appendChild(box);const info=()=>{const n=Object.keys(st.coche).length;$('expV').textContent=st.prov;$('expI').textContent=n?(n+' personne'+(n>1?'s':'')+' : '+expJours(st.prov,n)+' jours dehors, '+expPortee(st.prov,n)+' case'+(expPortee(st.prov,n)>1?'s':'')+' au plus du camp, aller et retour.'):'Cochez qui part.'};info();
 box.querySelectorAll('[data-e]').forEach(x=>x.onchange=()=>{if(x.checked)st.coche[x.dataset.e]=1;else delete st.coche[x.dataset.e];expPlan(c)});
 box.querySelectorAll('[data-f]').forEach(x=>x.onclick=()=>{const av=new Set((S.pp||[]).filter(p=>p.role).map(p=>p.id));former(x.dataset.f);const nv=(S.pp||[]).find(p=>p.role&&!av.has(p.id));if(nv)st.coche[nv.id]=1;expPlan(c)});
 box.querySelectorAll('[data-b]').forEach(x=>x.onclick=()=>{st.but=x.dataset.b;expPlan(c)});
 $('expR').oninput=e=>{st.prov=+e.target.value;info()};$('expN').onclick=()=>box.remove();
 $('expOk').onclick=()=>{const ids=Object.keys(st.coche).map(Number);if(!ids.length)return;box.remove();window.choixExp={c,ids,prov:st.prov,but:st.but};if(CV.on)cvFermer();sel=null;conteVoir(T[c],Math.max(5,expPortee(st.prov,ids.length)+2));peindre();panneau();
  toast('Touchez la case où le groupe ira '+EXPB[st.but][1].replace(/^cherche/,'chercher')+' : une case découverte, à '+expPortee(st.prov,ids.length)+' cases au plus.')}}
// au camp, « Envoyer » ouvre la préparation
{const ev=envoyer;envoyer=function(p){if(!grpOn()||modeHist())return ev(p);const c=campDe(p);if(c==null)return;if(p.id===S.garde){toast(p.n+' reste : choisissez d’abord quelqu’un d’autre pour garder.');return}if(!p.role){toast('Formez d’abord '+p.n.split(' ')[0]+'.');return}if(enGrp(p))return;expPlan(c,p.id)}}
// le choix de la destination sur la carte
function expFonde(q,t){const M=q.ids.map(ppId).filter(Boolean);const g={n:'Le groupe de '+M[0].n.split(' ')[0],m:q.ids,col:GCOL[S.grp.length%4],id:S.grp.length,pos:q.c,fait:0,xp:0,tour:0,mv:0,exp:{but:q.but,prov:q.prov,etat:'aller',home:q.c,cap:t.i,j:0,sur:0,charge:0}};
 S.vivres-=q.prov;S.grp.push(g);log(g.n+' part '+({chasse:'chasser',cueil:'cueillir',explorer:'explorer',camp:'chercher où s’installer'})[q.but]+' vers '+(lieuDe(t)||lieuProche(t)||'l’inconnu')+', avec '+q.prov+' vivres.');sauve();grpDessin();peindre();panneau()}
{const ct=choisirTuile;choisirTuile=function(t){const q=window.choixExp;if(q&&S&&grpOn()){const d=hd(T[q.c],t),pm=expPortee(q.prov,q.ids.length);
  if(!(S.t[t.i]||{}).s&&q.but!=='explorer'){toast('Cette case n’est pas encore découverte : pour aller dans l’inconnu, envoyez le groupe explorer.');return}
  if(t.bare){toast('On ne peut pas aller là.');return}if(d<1){toast('Choisissez une case hors du camp.');return}
  if(d>pm&&!q.force){alerteSimple('Trop loin pour les vivres emportés','Avec '+q.prov+' vivres, ils peuvent aller à '+pm+' case'+(pm>1?'s':'')+' et revenir. Plus loin, ils mangeront ce qu’ils trouvent : chaque jour sans vivres, ils perdent de la vie, et ils peuvent en mourir.',[['Partir quand même',()=>{q.force=1;choisirTuile(t)}],['Choisir plus près',()=>{}]]);return}
  window.choixExp=null;expFonde(q,t);return}
 if(S&&grpOn()&&!modeHist()&&window.choixDest){const g=S.grp[window.choixDest.g];window.choixDest=null;if(g&&g.exp){const n=grpMembres(g).length,reste=expJours(g.exp.prov,n),dAller=hd(T[g.pos],t),dRet=hd(t,T[g.exp.home]);
  if(!(S.t[t.i]||{}).s||t.bare){toast('Choisissez une case découverte.');return}
  if(dAller+dRet>reste){toast('Trop loin pour ses réserves : il lui reste de quoi tenir '+reste+' jours. Il faut rentrer préparer des vivres.');return}
  g.exp.cap=t.i;g.exp.etat='aller';g.exp.sur=0;log(g.n+' change de route vers '+(lieuDe(t)||lieuProche(t)||'l’inconnu')+'.');sauve();grpDessin();sel=T[g.pos];panneau();return}}
 return ct(t)}}
// chaque jour, les groupes vivent seuls
function expJour(){if(!S||modeHist()||!grpOn()||!S.grp)return;const fini=[];
 S.grp.forEach((g,i)=>{const e=g.exp;if(!e)return;const M=grpMembres(g),n=M.length;if(!n){fini.push(i);return}
  e.prov=Math.max(0,e.prov-expConso(n));e.j++;
  const ici=T[g.pos],home=T[e.home];const versHome=hd(ici,home),reste=expJours(e.prov,n)-1;
  if(e.etat!=='retour'&&reste<=versHome+(e.etat==='aller'?hd(ici,T[e.cap]):0)&&e.etat!=='camp'){e.etat='retour';journal(g.n+' n’a plus que de quoi rentrer : il prend le chemin du retour.')}
  if(e.prov<=0){M.forEach(p=>p.fat=Math.min(100,(p.fat||0)+15));if(rnd()<.3)journal(g.n+' n’a plus de vivres : la faim ralentit le retour.')}
  const pas=dest=>{const P=hexPath(ici,T[dest]);const u=P[1];if(!u)return false;g.pos=u.i;ouvrir(u,1);if(typeof grpRencontre==='function')grpRencontre(g,u);return true};
  if(e.etat==='aller'){if(g.pos===e.cap){e.etat='sur place';journal(g.n+' arrive '+(lieuDe(ici)?'à '+lieuDe(ici):'à destination')+'.')}else pas(e.cap)}
  else if(e.etat==='sur place'){e.sur++;const t=ici;
   if(e.but==='chasse'){const f=(typeof trpF==='function'?trpF(t):.5)*(typeof gibR==='function'?gibR(t):1),ok=rnd()<.25+f*.5+(S.sv&&S.sv.papangue?.1:0);if(ok){e.charge+=2;if(typeof gibUse==='function')gibUse(t);journal(g.n+' a pris du gibier'+(lieuDe(t)?' vers '+lieuDe(t):'')+'.')}}
   else if(e.but==='cueil'){const r=typeof resR==='function'?resR(t):1;e.charge+=1.2*r;if(typeof resUse==='function'){resUse(t);resUse(t)}}
   else if(e.but==='explorer'){ouvrir(t,2);journal(g.n+' explore les environs'+(lieuDe(t)?' de '+lieuDe(t):'')+' : de nouvelles terres apparaissent.');e.etat='retour'}
   else if(e.but==='camp'){const o=S.t[t.i]||{};if(camps().some(c=>hd(c,t)<3)){journal(g.n+' trouve qu’un camp est déjà trop proche : il rentre.');e.etat='retour'}else{const k=tl(t.i);k.b='camp';k.s=1;ouvrir(t,1);M.forEach(p=>p.camp=t.i);journal(g.n+' s’installe : un nouveau camp vit désormais '+(lieuDe(t)?'à '+lieuDe(t):'ici')+'.');log(g.n+' fonde un nouveau camp.');fini.push(i);return}}}
  else if(e.etat==='retour'){if(g.pos===e.home){S.vivres+=e.charge+e.prov;M.forEach(p=>{p.xp=(p.xp||0)+1+e.sur*.3});journal(g.n+' rentre au camp'+(e.charge>=1?' avec '+Math.round(e.charge)+' vivres':'')+'.');log(g.n+' est rentré'+(e.charge>=1?' : +'+Math.round(e.charge)+' vivres.':'.'));fini.push(i);return}pas(e.home)}});
 fini.sort((a,b)=>b-a).forEach(i=>S.grp.splice(i,1));S.grp.forEach((q,j)=>q.id=j);if(fini.length||S.grp.length){grpDessin();peindre();if(!CV.on)panneau()}}
{const jt=jourTick;jourTick=function(){jt();expJour()}}
// ce que fait un groupe, en une ligne
function expDit(g){const e=g.exp;if(!e)return g.cap!=null?'en route':'en attente';const n=grpMembres(g).length,lieu=u=>lieuDe(T[u])||lieuProche(T[u])||'l’inconnu';
 return e.etat==='aller'?'en route pour '+(e.but==='camp'?'s’installer':EXPB[e.but][0].toLowerCase())+' vers '+lieu(e.cap)+' ('+hd(T[g.pos],T[e.cap])+' j.)':e.etat==='sur place'?EXPB[e.but][1].replace(/^(.)/,m=>m.toUpperCase())+(lieuDe(T[g.pos])?' à '+lieuDe(T[g.pos]):'')+' depuis '+e.sur+' j.':'rentre au camp ('+hd(T[g.pos],T[e.home])+' j.)'}
// sur la carte, en mode Jeu : on informe, on n'agit pas
{const p0=panneau;panneau=function(){if(!S||!grpOn()||modeHist())return p0();const p=$('side');if(!p)return p0();
 const G=S.grp||[];const carte='<div class="sub" style="margin-top:6px"><b>Dehors</b>'+(G.length?G.map((g,i)=>'<div style="margin:6px 0;padding:6px;border-left:4px solid #'+new THREE.Color(g.col).getHexString()+'"><b>'+g.n+'</b> <small>· '+grpMembres(g).map(q=>ROLES[q.role]?ROLES[q.role].ic:'').join('')+'</small><br><small>'+expDit(g)+'</small> <button class="bt sec" data-gv="'+i+'" style="font-size:12px;padding:2px 8px">Voir</button></div>').join(''):'<p class="note">Personne dehors. Préparez une sortie depuis la vie du camp.</p>')+'</div>';
 if(window.choixExp){p.innerHTML='<h2>Où va le groupe ?</h2><div class="sub">Touchez une case découverte, à '+expPortee(window.choixExp.prov,window.choixExp.ids.length)+' cases au plus du camp.</div><button class="bt sec" id="expA">Annuler</button>';$('expA').onclick=()=>{window.choixExp=null;panneau()};return}
 if(window.choixDest){p.innerHTML='<h2>Nouvelle destination</h2><div class="sub">Touchez une case découverte que le groupe peut atteindre et d’où il peut rentrer avec ses réserves.</div><button class="bt sec" id="expA">Annuler</button>';$('expA').onclick=()=>{window.choixDest=null;panneau()};return}
 const ici=sel?G.map((g,i)=>[g,i]).filter(([g])=>g.pos===sel.i):[];const o=sel?S.t[sel.i]||{}:{};
 let h='';if(!sel)h='<h2>'+(S.voieC?'Le pays':'Les Hauts')+'</h2><div class="sub">La carte montre ce que vos gens ont découvert et où ils sont. Les ordres se donnent au camp.</div>';
 else{h='<h2>'+(o.b==='camp'?(S.voieC?'L’habitation':'Le camp')+(lieuDe(sel)?' · '+lieuDe(sel):''):(lieuDe(sel)||lieuProche(sel)||'Une case'))+'</h2><div class="sub">'+(o.b==='camp'?(S.voieC?'Votre habitation.':'Votre camp.'):o.s?'Terre découverte'+(typeof resR==='function'&&S.resR&&S.resR[sel.i]!=null?' · cueillette '+Math.round(resR(sel)*100)+' %':'')+(typeof gibR==='function'&&S.gibP&&S.gibP[sel.i]?' · gibier '+Math.round(gibR(sel)*100)+' %':''):'Pas encore découvert.')+'</div>'+(o.b==='camp'?'<button class="bt" id="expCV">Ouvrir la vie du camp</button> <button class="bt sec" id="expCB">Constructions du camp</button>':'');
  ici.forEach(([g,i])=>{const e=g.exp,n=grpMembres(g).length;h+='<div class="sub" style="margin-top:8px;border-left:4px solid #'+new THREE.Color(g.col).getHexString()+';padding-left:8px"><b>'+g.n+'</b><br><small>'+grpMembres(g).map(q=>ROLES[q.role].ic+' '+q.n.split(' ')[0]+(q.bl?' (blessé)':'')).join(', ')+'</small><br>'+expDit(g)+(e?'<br><small>Vivres : '+Math.round(e.prov*10)/10+', de quoi tenir '+expJours(e.prov,n)+' j. · rapporte '+Math.round(e.charge)+'</small>':'')+
   (e&&e.etat!=='retour'?'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">'+(e.etat==='sur place'?Object.keys(EXPB).filter(k=>k!==e.but&&!(k==='camp'&&n<3)).map(k=>'<button class="bt sec" data-ga="'+i+'" data-k="'+k+'">'+EXPB[k][0]+' ici</button>').join(''):'')+'<button class="bt sec" data-gd="'+i+'">Nouvelle destination</button><button class="bt" data-gr="'+i+'">Rentrer</button></div>':e?'':'<p class="note">Ce groupe vient de l’ancien système de tours.</p>')+'</div>'})}
 p.innerHTML=h+carte;
 if($('expCV'))$('expCV').onclick=()=>cvOuvrir(sel.i);
 if($('expCB'))$('expCB').onclick=()=>{p0();const b=document.createElement('button');b.className='bt sec';b.textContent='Retour';b.onclick=()=>panneau();p.insertBefore(b,p.firstChild)};
 p.querySelectorAll('[data-gv]').forEach(b=>b.onclick=()=>{const g=G[+b.dataset.gv];sel=T[g.pos];conteVoir(sel,4);peindre();panneau()});
 p.querySelectorAll('[data-gr]').forEach(b=>b.onclick=()=>{const g=G[+b.dataset.gr];g.exp.etat='retour';log(g.n+' reçoit l’ordre de rentrer.');sauve();panneau()});
 p.querySelectorAll('[data-gd]').forEach(b=>b.onclick=()=>{window.choixDest={g:+b.dataset.gd};panneau();toast('Touchez la nouvelle destination sur la carte.')});
 p.querySelectorAll('[data-ga]').forEach(b=>b.onclick=()=>{const g=G[+b.dataset.ga];g.exp.but=b.dataset.k;g.exp.sur=0;log(g.n+' se met à '+EXPB[b.dataset.k][1].replace(/^cherche/,'chercher')+'.');sauve();panneau()});
 if(typeof lie==='function')lie()}}
