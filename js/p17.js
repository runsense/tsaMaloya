
// ===== Jeu : besoins, statistiques et graphiques, de la personne, du groupe ou du camp ; tableau de tous les camps ; mini-cartes ; clic droit ; voyages et messages entre camps =====
const jeuOn=()=>!!(S&&!S.fin&&!S.bac&&!modeHist()&&typeof grpOn==='function'&&grpOn());
// l'historique, jour après jour, pour les graphiques
{const jt=jourTick;jourTick=function(){jt();if(!jeuOn())return;const H=S.hi=S.hi||{v:[],g:[],c:[],s:[]},pu=(a,v)=>{a.push(Math.round(v*10)/10);if(a.length>40)a.shift()};pu(H.v,S.vivres||0);pu(H.g,(S.pp||[]).length);pu(H.c,S.coh||0);pu(H.s,S.sante||0);
 (S.pp||[]).forEach(p=>{const h=p.hi=p.hi||{f:[],x:[],s:[]};pu(h.f,p.fat||0);pu(h.x,p.xp||0);pu(h.s,(p.sale||0)*100)})}}
function spark(a,col,max){if(!a||a.length<2)return '<small class="note">pas encore d’historique</small>';const w=120,h=26,m=max||Math.max(1,...a),pts=a.map((v,i)=>(i/(a.length-1)*w).toFixed(1)+','+(h-2-(v/m)*(h-4)).toFixed(1)).join(' ');return '<svg width="'+w+'" height="'+h+'" style="vertical-align:middle"><polyline points="'+pts+'" fill="none" stroke="'+col+'" stroke-width="1.6"/></svg>'}
function jauge(v,inv){const c=inv?(v>66?'#e87b5a':v>33?'#e8be5a':'#7fc36a'):(v<33?'#e87b5a':v<66?'#e8be5a':'#7fc36a');return '<span style="display:inline-block;width:60px;height:6px;background:#3a3226;border-radius:3px;vertical-align:middle"><span style="display:block;height:6px;width:'+Math.max(2,Math.min(100,v))+'%;background:'+c+';border-radius:3px"></span></span>'}
// les besoins d'un camp : ce qui manque, ce qui presse
function besoinsCamp(ci){const P=(S.pp||[]).filter(p=>campDe(p)===ci),ad=P.filter(adulte),H=S.hi||{v:[]},v=H.v,dv=v.length>3?(v[v.length-1]-v[Math.max(0,v.length-6)])/Math.min(5,v.length-1):0,jr=dv<0?Math.floor((S.vivres||0)/-dv):99;
 const fat=ad.length?ad.reduce((s,p)=>s+(p.fat||0),0)/ad.length:0,sale=P.length?P.reduce((s,p)=>s+(p.sale||0),0)/P.length*100:0,bl=P.filter(p=>p.bl).length,L=[];
 L.push(['Manger',jr>=20?100:jr*5,(S.faimJ?'faim depuis '+S.faimJ+' j':jr>=20?'réserves sûres':'encore '+jr+' j de vivres'),0]);
 L.push(['Repos',100-fat,fat>60?'les gens sont épuisés':fat>35?'fatigue qui monte':'reposés',0]);
 L.push(['Se laver',100-sale,sale>60?'très sales':sale>30?'salis par le travail':'propres',0]);
 L.push(['Soins',bl?Math.max(0,100-bl*30):100,bl?bl+' blessé'+(bl>1?'s':''):'personne de blessé',0]);
 if(S.cyc)L.push(['Abri',S.abri||nBat('abri')?100:S.cyc.in<=1?10:S.cyc.in<=2?40:80,S.cyc.in<=2?(S.abri||nBat('abri')?'tous à l’abri':'cyclone proche : personne à l’abri'):'cyclone dans '+S.cyc.in+' saisons',0]);
 L.push(['Entente',S.coh||0,(S.coh||0)<35?'disputes':(S.coh||0)<60?'tiraillements':'le camp se tient',0]);
 return L}
function besoinsHtml(L){return L.map(([n,v,t])=>'<div style="display:flex;gap:6px;align-items:center;margin:2px 0"><b style="width:62px;font-size:12px">'+n+'</b>'+jauge(v)+'<small>'+t+'</small></div>').join('')}
// la fiche chiffrée d'une personne : forces, expérience, et ses besoins à elle
function statsPers(p){const s=stP(p),h=p.hi||{},niv=p.niv||0,xn=XPN[niv];return '<b>'+p.n+'</b> <small>'+ageP(p)+' ans · '+(typeof statut==='function'?statut(p):'')+'</small><br>'+
 '<small>Force '+s.for+' · agilité '+s.agi+' · endurance '+s.end+' · ferveur '+s.fer+'</small><br>'+
 (p.role?'<small>Expérience '+(p.xp||0)+(xn?' / '+xn+' pour le grade suivant':' (grade le plus haut)')+'</small> '+jauge(xn?(p.xp||0)/xn*100:100)+'<br>':'')+
 '<div style="margin-top:3px">'+besoinsHtml([['Repos',100-(p.fat||0),(p.fat||0)>60?'épuisé':'fatigue '+Math.round(p.fat||0)+' %'],['Propre',100-(p.sale||0)*100,(p.sale||0)>.6?'très sale':'propre ou presque'],['Santé',p.bl?30:100,p.bl?'blessé':'en forme'],['Manger',S.faimJ?Math.max(0,60-S.faimJ*20):100,S.faimJ?'a faim':'mange à sa faim']])+'</div>'+
 '<small>Fatigue</small> '+spark(h.f,'#e8be5a',100)+' <small>Expérience</small> '+spark(h.x,'#7fc36a')}
function statsGrp(g){const M=grpMembres(g),e=g.exp||{};return '<b>'+g.n+'</b> <small>'+M.length+' personne'+(M.length>1?'s':'')+'</small><br><small>'+(typeof expDit==='function'?expDit(g):'')+'</small><br><small>Vivres emportés '+(e.prov||0)+' · rapporté '+(e.charge||0)+' · jours dehors '+(e.j||0)+'</small><br>'+M.map(p=>'<small>'+(p.role&&ROLES[p.role]?ROLES[p.role].ic:'')+' '+p.n.split(' ')[0]+' · fatigue '+Math.round(p.fat||0)+' %'+(p.bl?' · blessé':'')+'</small>').join('<br>')}
function statsCamp(ci){const P=(S.pp||[]).filter(p=>campDe(p)===ci),ad=P.filter(adulte),H=S.hi||{};return '<b>'+(lieuDe(T[ci])||lieuProche(T[ci])||(S.voieC?'L’habitation':'Le camp'))+'</b> <small>'+ad.length+' adultes · '+(P.length-ad.length)+' enfants · dehors '+(S.pp||[]).filter(p=>enGrp(p)&&p.camp===ci).length+'</small><br>'+
 '<small>Vivres</small> '+spark(H.v,'#e8be5a')+' <small>Gens</small> '+spark(H.g,'#7fc3e8')+'<br><small>Entente</small> '+spark(H.c,'#c38fe8',100)+' <small>Santé</small> '+spark(H.s,'#7fc36a',100)}
// dans la vue du camp : les besoins du camp, et à côté, la sélection
{const st=document.createElement('style');st.textContent='#cvSel{width:30%;min-width:200px}#infoJ{position:fixed;left:10px;top:150px;width:290px;max-height:calc(100vh - 290px);overflow:auto;z-index:25;background:rgba(20,17,13,.9);border:1px solid #3a3226;border-radius:8px;padding:8px 10px;font-size:12px;color:#f0e6d0}#infoJ table{width:100%;border-collapse:collapse}#infoJ td,#infoJ th{padding:2px 3px;border-bottom:1px solid #3a3226;text-align:left}#infoJ th{color:#e8be5a;font-weight:600}#infoJ tr[data-c]{cursor:pointer}#infoJ tr[data-c]:hover{background:rgba(232,190,90,.12)}';document.head.appendChild(st)}
{const cl=cvListe;cvListe=function(){cl();if(!jeuOn()||!CV.on)return;const bas=$('cvBas');if(!bas)return;let z=$('cvSel');if(!z){z=document.createElement('div');z.id='cvSel';bas.appendChild(z)}
 const p=CV.selP!=null?ppId(CV.selP):null;z.innerHTML='<h4>'+(p?'La personne choisie':'Le camp')+'</h4>'+(p?statsPers(p):statsCamp(CV.camp));
 const K=$('cvCamp');if(K&&!K.querySelector('.besC')){const d=document.createElement('div');d.className='pc besC';d.innerHTML='<b>Les besoins du camp</b>'+besoinsHtml(besoinsCamp(CV.camp));K.insertBefore(d,K.children[2]||null)}}}
// sur la carte : la sélection (camp ou groupe), sinon le tableau de tous les camps
let JSEL=null;
function infoJ(){if(!jeuOn()||CV.on||!$('ecran').hidden){const b=$('infoJ');if(b)b.hidden=true;return}let b=$('infoJ');if(!b){b=document.createElement('div');b.id='infoJ';document.body.appendChild(b)}b.hidden=false;
 const g=JSEL&&JSEL.g!=null?S.grp[JSEL.g]:null,ci=JSEL&&JSEL.c!=null?JSEL.c:(sel&&(S.t[sel.i]||{}).b==='camp'?sel.i:null);let h='';
 if(g)h='<h4 style="margin:0 0 4px;color:#e8be5a">Le groupe</h4>'+statsGrp(g);
 else if(ci!=null)h='<h4 style="margin:0 0 4px;color:#e8be5a">Le camp</h4>'+statsCamp(ci)+'<div style="margin-top:4px">'+besoinsHtml(besoinsCamp(ci))+'</div>';
 else{const cs=camps();h='<h4 style="margin:0 0 4px;color:#e8be5a">Tous les camps</h4><table><tr><th>Camp</th><th>Adultes</th><th>Enfants</th><th>Dehors</th><th>Le plus pressant</th></tr>'+cs.map(t=>{const P=(S.pp||[]).filter(p=>campDe(p)===t.i),ad=P.filter(adulte).length,B=besoinsCamp(t.i).sort((a,b)=>a[1]-b[1])[0];return '<tr data-c="'+t.i+'"><td>'+(lieuDe(t)||lieuProche(t)||'camp')+'</td><td>'+ad+'</td><td>'+(P.length-ad)+'</td><td>'+(S.pp||[]).filter(p=>enGrp(p)&&p.camp===t.i).length+'</td><td><small>'+(B?B[0]+' : '+B[2]:'')+'</small></td></tr>'}).join('')+'</table><small class="note">Vivres communs : '+Math.round(S.vivres||0)+' · '+spark((S.hi||{}).v,'#e8be5a')+'</small>'}
 if(JSEL||ci!=null)h+='<div style="margin-top:6px"><button class="bt sec" id="ijT">Tous les camps</button></div>';
 if(b._h!==h){b._h=h;b.innerHTML=h;b.querySelectorAll('[data-c]').forEach(r=>r.onclick=()=>{const t=T[+r.dataset.c];JSEL={c:t.i};kbCentrer(t,9)});const x=$('ijT');if(x)x.onclick=()=>{JSEL=null;sel=null;panneau();infoJ()}}}
setInterval(()=>{try{infoJ()}catch(e){}},700);
// cliquer « Voir » sur un groupe le choisit dans le panneau
addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('[data-gr]');if(b&&jeuOn())JSEL={g:+b.dataset.gr}},true);

// ===== Les mini-cartes =====
// au camp : dès qu'un groupe est dehors, le bouton « Retour à la carte » devient une mini-carte des groupes
function miniGroupes(cv,ci){const x=cv.getContext('2d'),W=cv.width,H=cv.height;x.fillStyle='#1d2a33';x.fillRect(0,0,W,H);const c=T[ci],G=(S.grp||[]).filter(g=>g.exp);if(!c)return;let R=3;G.forEach(g=>{const t=T[g.pos];if(t)R=Math.max(R,Math.hypot(t.x-c.x,t.z-c.z)+1.5)});const k=Math.min(W,H)/2/R;
 T.forEach(t=>{if(!(S.t[t.i]||{}).s)return;const dx=(t.x-c.x)*k+W/2,dz=(t.z-c.z)*k+H/2;if(dx<-4||dz<-4||dx>W+4||dz>H+4)return;x.fillStyle=ccCoul(t);x.fillRect(dx-k*.45,dz-k*.45,k*.9,k*.9)});
 x.fillStyle='#fff';x.font='bold 13px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText('⌂',W/2,H/2);G.forEach(g=>{const t=T[g.pos];if(!t)return;x.beginPath();x.arc((t.x-c.x)*k+W/2,(t.z-c.z)*k+H/2,4,0,6.283);x.fillStyle='#'+(g.col||0xe8be5a).toString(16).padStart(6,'0');x.fill();x.strokeStyle='#000';x.stroke()})}
setInterval(()=>{if(!jeuOn()||!CV.on)return;const X=$('cvX');if(!X)return;const dehors=(S.grp||[]).some(g=>g.exp);let m=$('cvMini');
 if(!dehors){if(m)m.remove();X.hidden=false;return}if(!m){m=document.createElement('canvas');m.id='cvMini';m.width=200;m.height=64;m.title='Les groupes dehors : touchez pour les suivre sur la carte du connu.';m.style.cssText='cursor:pointer;border:1px solid #e8be5a;border-radius:6px;vertical-align:middle;margin-left:8px';m.onclick=()=>carteConnu({titre:'Les groupes dehors'});X.parentElement.appendChild(m)}
 // le bouton « Retour à la carte » reste toujours là : la mini-carte s'ajoute à côté, elle ne le remplace plus
 X.hidden=false;miniGroupes(m,CV.camp)},800);
// sur la carte : le bouton du camp devient une mini-carte du camp, avec qui fait quoi
const TICO={cueil:'🌿',chasse:'🏹',peche:'🐟',cuisine:'🍲',bois:'🪵',paille:'🌾',pierre:'🪨',eau:'💧',repos:'💤',garde:'👁',laver:'🚿',dehors:'🚶'};
setInterval(()=>{const b=$('cvBtn');if(!b||!jeuOn()||CV.on||b.style.display==='none')return;const dr=$('drawer'),ouv=!!(dr&&!dr.hidden);b.style.visibility=ouv?'hidden':'';const ij=$('infoJ');if(ij)ij.style.visibility=ouv?'hidden':'';b.dataset.bulle='Le camp vu d’en haut : chaque point est une personne, l’icône dit ce qu’elle fait. Touchez pour entrer.';const ci=(sel&&(S.t[sel.i]||{}).b==='camp')?sel.i:(camps()[0]||{}).i;if(ci==null)return;
 let c=b.querySelector('canvas');if(!c){b.style.padding='4px';b.innerHTML='<canvas width="210" height="110" style="display:block;border-radius:5px"></canvas><small id="cvBtnT" style="display:block;text-align:center"></small>';c=b.querySelector('canvas')}
 const x=c.getContext('2d'),W=210,H=110,{L}=cvLieux();x.fillStyle='#5a4a32';x.fillRect(0,0,W,H);const P=([u,v])=>[u*W,v*H];
 (L.cases||[]).forEach(cs=>{const [a,d]=P(cs);x.fillStyle='#8a6a40';x.fillRect(a-5,d-4,10,8)});{const [a,d]=P(L.feu);x.fillStyle='#ffa030';x.beginPath();x.arc(a,d,4,0,6.283);x.fill()}
 const gens=(S.pp||[]).filter(p=>campDe(p)===ci),par={};gens.forEach(p=>{const t=enGrp(p)?'dehors':p.id===S.garde?'garde':(tacheDe(p)||'repos');(par[t]=par[t]||[]).push(p)});
 const pos={cueil:L.jardin,chasse:L.bois,peche:L.eau,cuisine:L.feu,bois:L.bois,paille:L.jardin,pierre:L.foyer,eau:L.eau,garde:L.garde,laver:L.eau,repos:(L.cases||[])[0]||L.feu,dehors:[.5,.06]};
 x.font='11px system-ui';x.textAlign='center';Object.keys(par).forEach(k=>{const q=pos[k]||L.feu;if(!q)return;const [a,d]=P(q);par[k].forEach((p,i)=>{x.fillStyle=adulte(p)?'#f0e6d0':'#c9b88f';x.beginPath();x.arc(a-8+(i%5)*4,d+10+Math.floor(i/5)*4,2,0,6.283);x.fill()});x.fillText((TICO[k]||'·')+par[k].length,a,d-6)});
 const t=$('cvBtnT');if(t)t.textContent=(S.voieC?'🏠 L’habitation':'🔥 Le camp')+' · toucher pour entrer'},900);

// ===== Le camp s'ouvre toujours sur la liste de ses acteurs =====
{const co=cvOuvrir;cvOuvrir=function(ci){if(jeuOn()){CV.selP=null;const v=document.querySelector('#cvL .pc.ph');if(v)v.remove()}co(ci)}}

// ===== Voyager d'un camp à l'autre : le temps du chemin, à pied =====
{const cd=campDe;campDe=function(p){if(p&&p.voy)return -1;return cd(p)}}
TACHES.voyage=['En chemin','marche vers un autre camp'];
{const td=tacheDe;tacheDe=function(p){if(p&&p.voy)return 'voyage';return td(p)}}
function campNom(ci){const t=T[ci];return t?(lieuDe(t)||lieuProche(t)||'le camp'):'le camp'}
function campEnvoyer(p,vers){const de=campDe(p);if(de==null||de===vers||de<0)return;const d=Math.max(1,hd(T[de],T[vers]));p.voy={de,vers,arr:(S.jourN||0)+d};if(CV.eq)delete CV.eq[p.id];log(p.n.split(' ')[0]+' part pour '+campNom(vers)+' : '+d+' jour'+(d>1?'s':'')+' de marche.')}
// les messages : un messager à pied, ou la conque quand le camp est proche (tout le monde l'entend, les chasseurs aussi)
function campMessage(de,vers,quoi,conque){const d=Math.max(1,hd(T[de],T[vers])),aller=conque&&d<=3?0:d;(S.msg=S.msg||[]).push({de,vers,quoi,arr:(S.jourN||0)+aller,ret:(S.jourN||0)+aller*2,etat:'aller'});
 if(conque&&d<=3){log('La conque sonne vers '+campNom(vers)+'.');if(rnd()<.3)fx({traque:2})}else log('Un messager part pour '+campNom(vers)+' : '+d+' jour'+(d>1?'s':'')+' de marche, autant pour la réponse.')}
{const jt=jourTick;jourTick=function(){jt();if(!jeuOn())return;const j=S.jourN||0;
 (S.pp||[]).forEach(p=>{if(p.voy&&j>=p.voy.arr){p.camp=p.voy.vers;log(p.n.split(' ')[0]+' arrive à '+campNom(p.voy.vers)+'.');delete p.voy}});
 (S.msg||[]).forEach(m=>{if(m.etat==='aller'&&j>=m.arr){m.etat='retour';const P=(S.pp||[]).filter(p=>campDe(p)===m.vers&&adulte(p)&&!enGrp(p)&&p.id!==S.garde);
   if(m.quoi==='bras'){const n=P.length>4?2:P.length>2?1:0;P.slice(0,n).forEach(p=>campEnvoyer(p,m.de));m.rep=n?n+' personne'+(n>1?'s':'')+' en route':'pas assez de monde pour en envoyer'}
   if(m.quoi==='danger'){S.alerteC=(S.alerteC||{});S.alerteC[m.vers]=j+10;m.rep='le camp est prévenu et double la garde'}
   if(m.quoi==='port'){const ok=S.voieC||rnd()<.5;if(ok){S.portAcc=(S.portAcc||{});S.portAcc[m.de]=1}m.rep=ok?'accord : vous pourrez passer par le port':'refus : le port est trop surveillé'}}
  if(m.etat==='retour'&&j>=m.ret){m.etat='fin';log('Réponse de '+campNom(m.vers)+' : '+m.rep+'.');toast('Réponse de '+campNom(m.vers)+' : '+m.rep)}});
 S.msg=(S.msg||[]).filter(m=>m.etat!=='fin');
 // le port ouvert rapporte un peu, par l'échange
 Object.keys(S.portAcc||{}).forEach(()=>{if(rnd()<.15)S.vivres+=1})}}

// ===== Le clic droit : le menu du jeu, selon l'endroit =====
{const st=document.createElement('style');st.textContent='#mCtx{position:fixed;z-index:120;background:#1e1912;border:1px solid #e8be5a;border-radius:8px;padding:4px;min-width:220px;box-shadow:0 6px 24px rgba(0,0,0,.6);font:13px system-ui;color:#f0e6d0}#mCtx button{display:block;width:100%;text-align:left;background:none;border:0;color:inherit;padding:6px 10px;border-radius:5px;cursor:pointer;font:inherit}#mCtx button:hover,#mCtx button.kF{background:rgba(232,190,90,.18)}#mCtx small{display:block;padding:4px 10px;color:#e8be5a}';document.head.appendChild(st)}
function menuCtx(x,y,titre,L){const o=$('mCtx');if(o)o.remove();const m=document.createElement('div');m.id='mCtx';m.innerHTML='<small>'+titre+'</small>'+L.map((l,i)=>'<button data-i="'+i+'"'+(l[2]?' title="'+String(l[2]).replace(/"/g,'&quot;')+'"':'')+'>'+l[0]+'</button>').join('');document.body.appendChild(m);
 m.style.left=Math.min(x,innerWidth-m.offsetWidth-8)+'px';m.style.top=Math.min(y,innerHeight-m.offsetHeight-8)+'px';m.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{m.remove();L[+b.dataset.i][1]()});setTimeout(()=>addEventListener('pointerdown',function f(e){if(!m.contains(e.target)){m.remove();removeEventListener('pointerdown',f,true)}},true),0)}
// une sortie à choisir par rôles, sans trop de précision : « deux chasseurs et un cueilleur »
function expParRoles(t){const cs=camps();if(!cs.length)return;const c=cs.slice().sort((a,b)=>hd(a,t)-hd(b,t))[0];const L=expLibres(c.i),R={};L.forEach(p=>{(R[p.role]=R[p.role]||[]).push(p)});const N={};Object.keys(R).forEach(k=>N[k]=0);let but=t.forest?'chasse':'explorer';
 const box=document.createElement('div');box.id='expR2';box.style.cssText='position:fixed;inset:0;z-index:86;background:rgba(10,8,6,.7);display:flex;align-items:center;justify-content:center';document.body.appendChild(box);
 const d=hd(T[c.i],t),vivMin=()=>{const n=Object.values(N).reduce((s,v)=>s+v,0);for(let v=0;v<=Math.floor(S.vivres||0);v++)if(expPortee(v,Math.max(1,n))>=d)return v;return -1};
 const dess=()=>{const n=Object.values(N).reduce((s,v)=>s+v,0),v=vivMin();box.innerHTML='<div class="pjb" style="max-width:460px"><small>Depuis '+campNom(c.i)+' · '+d+' case'+(d>1?'s':'')+'</small><h2>Envoyer une expédition</h2><p class="note">'+(lieuDe(t)||lieuProche(t)||t.biome)+'. Dites combien, par rôle : le camp choisit les plus reposés.</p>'+
  (Object.keys(R).length?Object.keys(R).map(k=>'<div style="display:flex;align-items:center;gap:8px;margin:4px 0"><b style="flex:1">'+ROLES[k].ic+' '+roleN(k)+' <small>('+R[k].length+' libres)</small></b><button class="bt sec" data-m="'+k+'">−</button><b>'+N[k]+'</b><button class="bt sec" data-p="'+k+'">+</button></div>').join(''):'<p class="note">Personne de formé n’est libre dans ce camp.</p>')+
  '<div style="display:flex;gap:6px;flex-wrap:wrap;margin:8px 0">'+Object.keys(EXPB).map(k=>'<button class="bt'+(but===k?'':' sec')+'" data-b="'+k+'">'+EXPB[k][0]+'</button>').join('')+'</div>'+
  '<p class="note">'+(n?(v<0?'Pas assez de vivres pour aller si loin.':'Vivres emportés : '+v+'.'):'Choisissez au moins une personne.')+'</p><div style="display:flex;gap:8px;justify-content:flex-end"><button class="bt sec" id="erN">Annuler</button><button class="bt" id="erOk"'+(n&&v>=0?'':' disabled')+'>Partir</button></div></div>';
  box.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{const k=b.dataset.p;if(N[k]<R[k].length)N[k]++;dess()});box.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{const k=b.dataset.m;if(N[k]>0)N[k]--;dess()});box.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{but=b.dataset.b;dess()});
  $('erN').onclick=()=>box.remove();$('erOk').onclick=()=>{const ids=[];Object.keys(N).forEach(k=>R[k].slice().sort((a,b)=>(a.fat||0)-(b.fat||0)).slice(0,N[k]).forEach(p=>ids.push(p.id)));box.remove();window.choixExp={c:c.i,ids,prov:vivMin(),but};choisirTuile(t)}};dess()}
// trier les gens d'un camp : rester, sortir, ou partir vers un autre camp
function campTrier(ci){const cs=camps().filter(t=>t.i!==ci),P=(S.pp||[]).filter(p=>campDe(p)===ci&&adulte(p)&&!enGrp(p));const box=document.createElement('div');box.style.cssText='position:fixed;inset:0;z-index:86;background:rgba(10,8,6,.7);display:flex;align-items:center;justify-content:center';
 box.innerHTML='<div class="pjb" style="max-width:560px;width:calc(100% - 32px);max-height:88vh;overflow:auto"><small>'+campNom(ci)+'</small><h2>Qui reste, qui sort, qui part</h2>'+P.map(p=>'<div style="display:flex;gap:8px;align-items:center;margin:3px 0"><b style="flex:1">'+(p.role?ROLES[p.role].ic+' ':'')+p.n+'</b><select data-t="'+p.id+'"><option value="r">Reste au camp</option>'+(p.role&&p.id!==S.garde?'<option value="e"'+(CV.eq&&CV.eq[p.id]?' selected':'')+'>Équipe de sortie</option>':'')+cs.map(t=>'<option value="c'+t.i+'">Part pour '+campNom(t.i)+' ('+Math.max(1,hd(T[ci],t))+' j)</option>').join('')+'</select></div>').join('')+
  '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px"><button class="bt sec" id="ctN">Annuler</button><button class="bt" id="ctOk">Valider</button></div></div>';document.body.appendChild(box);
 box.querySelector('#ctN').onclick=()=>box.remove();box.querySelector('#ctOk').onclick=()=>{CV.eq=CV.eq||{};box.querySelectorAll('select').forEach(s=>{const p=ppId(+s.dataset.t),v=s.value;if(!p)return;if(v==='e')CV.eq[p.id]=1;else delete CV.eq[p.id];if(v[0]==='c')campEnvoyer(p,+v.slice(1))});box.remove();sauve();if(CV.on)cvListe();toast('C’est fait.')}}
function campContacter(ci){const cs=camps().filter(t=>t.i!==ci);if(!cs.length){toast('Il n’y a pas d’autre camp à contacter.');return}const box=document.createElement('div');box.style.cssText='position:fixed;inset:0;z-index:86;background:rgba(10,8,6,.7);display:flex;align-items:center;justify-content:center';
 box.innerHTML='<div class="pjb" style="max-width:480px"><small>Depuis '+campNom(ci)+'</small><h2>Contacter un autre camp</h2><p class="note">Un messager part à pied ; la réponse revient par le même chemin. Un camp à trois cases ou moins entend la conque tout de suite, mais les chasseurs aussi.</p><label>Vers <select id="ccV">'+cs.map(t=>'<option value="'+t.i+'">'+campNom(t.i)+' ('+Math.max(1,hd(T[ci],t))+' j)</option>').join('')+'</select></label>'+
  '<div style="display:flex;flex-direction:column;gap:6px;margin:10px 0"><button class="bt sec" data-q="bras">Demander des bras</button><button class="bt sec" data-q="danger">Prévenir d’un danger</button><button class="bt sec" data-q="port">Demander l’accès au port</button></div><label><input type="checkbox" id="ccQ"> Sonner la conque si le camp est proche</label><div style="display:flex;justify-content:flex-end;margin-top:8px"><button class="bt sec" id="ccN">Annuler</button></div></div>';document.body.appendChild(box);
 box.querySelector('#ccN').onclick=()=>box.remove();box.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{campMessage(ci,+box.querySelector('#ccV').value,b.dataset.q,box.querySelector('#ccQ').checked);box.remove();sauve()})}
// un clic droit quand le menu est ouvert le ferme, sans en rouvrir un autre
{let ferme=0;addEventListener('pointerdown',e=>{if(e.button===2&&$('mCtx'))ferme=performance.now()},true);addEventListener('contextmenu',e=>{if(performance.now()-ferme<1500){ferme=0;e.preventDefault();e.stopImmediatePropagation();const m=$('mCtx');if(m)m.remove()}},true)}
let RDN=null;addEventListener('pointerdown',e=>{if(e.button===2)RDN=[e.clientX,e.clientY]},true);
addEventListener('contextmenu',e=>{if(!S||!$('ecran').hidden||kbStrat()&&!CV.on||$('kons')&&!$('kons').hidden)return;const tg=e.target;if(tg&&tg.closest&&tg.closest('input,textarea,.pjb,#drawer,#modal,#mCtx'))return;e.preventDefault();const X=e.clientX,Y=e.clientY;if(RDN&&Math.hypot(X-RDN[0],Y-RDN[1])>6){RDN=null;return}RDN=null;
 if(CV.on){const cv=$('cvC');if(cv&&tg===cv&&cv.onclick)cv.onclick(e);setTimeout(()=>{const p=CV.selP!=null?ppId(CV.selP):null,ci=CV.camp,L=[];
   if(p&&adulte(p)){Object.keys(TACHES).filter(k=>!['laver','voyage'].includes(k)).slice(0,6).forEach(k=>L.push(['▸ '+TACHES[k][0],()=>{p.tache=k;sauve();cvListe()}]));if(p.role&&p.id!==S.garde)L.push([CV.eq&&CV.eq[p.id]?'Retirer de l’équipe de sortie':'Mettre dans l’équipe de sortie',()=>{CV.eq=CV.eq||{};if(CV.eq[p.id])delete CV.eq[p.id];else CV.eq[p.id]=1;cvListe()}]);
    camps().filter(t=>t.i!==ci).forEach(t=>L.push(['Envoyer vers '+campNom(t.i),()=>{campEnvoyer(p,t.i);sauve();cvListe()}]));L.push(['💬 Lui faire dire…',()=>{const f=$('cvL').querySelector('.pc[data-pid="'+p.id+'"]');if(f)phrasesBoite(p,null,f)}])}
   const li=!p&&cvLieuSous(X,Y);if(li)return cvLieuMenu(X,Y,li);
   L.push(['Trier les gens du camp…',()=>campTrier(ci)],['Contacter un autre camp…',()=>campContacter(ci)],['Préparer une sortie',()=>expPlan(ci,null)],['La carte du connu',()=>carteConnu({titre:'Les groupes dehors'})],['Revenir à la carte',()=>cvFermer()]);menuCtx(X,Y,p?p.n:campNom(ci),L)},30);return}
 const surCarte=(()=>{for(const el of document.elementsFromPoint(X,Y)){if(el.tagName==='CANVAS')return true;if(el.closest&&el.closest('button,input,select,#side,#drawer,#infoJ,#cvMini,#cvBtn,.pjb,#top,#bar,header,nav'))return false}return false})();
 const pt=typeof pick==='function'&&surCarte&&pick(X,Y),t=pt&&tileAt(pt),L=[];
 if(t&&!traceE&&!window.gMove&&!moveB){choisirTuile(t);const vu={};[...document.querySelectorAll('#side button')].filter(b=>!b.disabled&&b.offsetParent&&b.textContent.trim()).forEach(b=>{const t0=b.querySelector('b'),em=b.querySelector('em'),n=(t0?t0.textContent:b.textContent).trim().replace(/\s+/g,' ').slice(0,60)+(em?' · '+em.textContent.trim():'');if(vu[n])return;vu[n]=1;L.push(['▸ '+n,()=>b.click(),(b.querySelector('small')||{}).textContent||''])})}
 if(!jeuOn()){if(L.length)menuCtx(X,Y,t?(lieuDe(t)||lieuProche(t)||t.biome):'Le jeu',L);return}
 if(t&&(S.t[t.i]||{}).b==='camp'){L.push(['Ouvrir le camp',()=>cvOuvrir(t.i)],['Trier les gens du camp…',()=>campTrier(t.i)],['Préparer une sortie',()=>expPlan(t.i,null)],['Contacter un autre camp…',()=>campContacter(t.i)])}
 else if(t&&(S.t[t.i]||{}).s&&!t.bare)L.push(['Envoyer une expédition ici…',()=>expParRoles(t)]);
 L.push(['La carte du connu',()=>carteConnu({})],['Tous les camps',()=>{JSEL=null;sel=null;panneau();infoJ()}],['💾 Sauvegarder',()=>svgFichierEcrire()],[(typeof chronoP!=='undefined'&&chronoP)?'▶ Reprendre le temps':'⏸ Mettre en pause',()=>{const b=$('chPa');if(b)b.click()}]);
 menuCtx(X,Y,t?(lieuDe(t)||lieuProche(t)||t.biome):'Le jeu',L)},true);

// ===== La chronologie en mode Jeu : l'époque, l'année, ce qui vient, et les derniers faits =====
{const dr=drawer;drawer=function(){dr();if(!jeuOn()||onglet!=='chr')return;const d=$('drawer'),y=S.year,E=[[1663,'Premiers marrons'],[1715,'Café et esclavage'],[1723,'Code noir à Bourbon'],[1794,'Première abolition, refusée ici'],[1848,'Abolition'],[1870,'Crise sucrière'],[1946,'Département']],cur=E.filter(e=>e[0]<=y).pop()||E[0],nx=E.find(e=>e[0]>y),v=voie();
 d.innerHTML='<h3>Où en est l’île</h3><p style="font-size:20px;margin:4px 0"><b>'+y+'</b> · '+cur[1]+'</p>'+(nx?'<p class="note">Ensuite : '+nx[1]+' ('+nx[0]+'), dans '+(nx[0]-y)+' ans.</p>':'')+
  '<div style="margin:8px 0">'+[['Marronnage',v.m,'#7fc36a'],['Colonial',v.c,'#e8be5a'],['Esclavage',v.e,'#e87b5a']].map(([n,x,c])=>'<div style="display:flex;gap:8px;align-items:center;margin:3px 0"><b style="width:90px">'+n+'</b><span style="flex:1;height:8px;background:#3a3226;border-radius:4px"><span style="display:block;height:8px;width:'+Math.round(x)+'%;background:'+c+';border-radius:4px"></span></span><small>'+Math.round(x)+' %</small></div>').join('')+'</div>'+
  '<h4>Les derniers faits</h4>'+(S.log||[]).slice(-8).reverse().map(l=>'<p class="note" style="margin:2px 0">'+l.y+' · '+l.m+'</p>').join('')+'<p class="note" style="margin-top:8px">L’arbre du temps complet reste dans le mode Histoire.</p>'}}
