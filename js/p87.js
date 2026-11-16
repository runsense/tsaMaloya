// ===== p87 : Vie — le conseil autour du feu, la villa du maître, l'adhésion et les révoltes ; les réserves du camp ;
// envoyer un groupe « là » ; la soif qui se soigne vraiment ; les besoins qui pèsent sur le travail ; l'incarnation plus vivante =====

// ----- 1. La soif : dès que quelqu'un puise l'eau, le camp boit (et non plus seulement le lendemain) -----
setInterval(()=>{try{if(!S||S.fin||modeHist()||!S.soif)return;camps().forEach(c=>{if(!(S.soif[c.i]>0))return;const q=(S.pp||[]).filter(p=>campDe(p)===c.i&&!enGrp(p)&&ageT(p)>=7&&tacheDe(p)==='eau');if(!q.length)return;
 S.soif[c.i]=Math.max(0,S.soif[c.i]-.25*q.length);if(S.soif[c.i]===0){toast('💧 L’eau est arrivée au '+(S.voieC?'quartier':'camp')+' : tout le monde a bu.');try{if(CV.on)cvListe()}catch(e){}}})}catch(e){}},2000);

// ----- 2. La fenêtre d'envoi : le but suit le rôle de la personne choisie ; choisir un but coche ceux qui conviennent -----
const BUT87={chasse:p=>p.role==='cha',cueil:p=>p.role==='cue'||p.role==='mys',explorer:p=>p.role==='cha'||(typeof estAncienOuChasseur==='function'&&estAncienOuChasseur(p)),camp:p=>adulte(p)};
{const ep=expPlan;expPlan=function(c,pre){const st=window.EXPS||(window.EXPS={coche:{},prov:2,but:'chasse'});
 if(pre!=null){const p=ppId(+pre);if(p){if(p.role==='cue'||p.role==='mys')st.but='cueil';else if(p.role==='cha')st.but='chasse'}}
 const r=ep.apply(this,arguments);try{const box=$('expP');if(!box)return r;
  box.querySelectorAll('[data-b]').forEach(x=>{const o=x.onclick;x.onclick=()=>{const b=x.dataset.b,f=BUT87[b],L=expLibres(c);st.but=b;if(f){const ok=L.filter(f).slice(0,4);if(ok.length){st.coche={};ok.forEach(p=>st.coche[p.id]=1)}}expPlan(c);
   const first=$('expP')&&$('expP').querySelector('input[data-e]:checked');if(first)first.closest('label').scrollIntoView({block:'center'})}});
  if(st.dest!=null&&T[st.dest]){const ok=$('expOk');if(ok)ok.textContent='Envoyer vers '+(lieuDe(T[st.dest])||lieuProche(T[st.dest])||'cette case');const h=box.querySelector('h2');if(h)h.textContent='Envoyer un groupe là'}}catch(e){}return r}}
// la destination déjà choisie : on n'a plus à la montrer sur la carte
document.addEventListener('click',e=>{try{if(!e.target||e.target.id!=='expOk'||!window.EXPS)return;const st=window.EXPS,d=st.dest;if(d==null)return;st.dest=null;setTimeout(()=>{if(window.choixExp&&T[d])choisirTuile(T[d])},60)}catch(_){}});
// le panneau de la carte : plus de « Préparer une sortie » ; sur une case choisie, « Envoyer un groupe là »
{const pn=panneau;panneau=function(){const r=pn.apply(this,arguments);try{if(!S||modeHist()||window.choixExp)return r;const sd=$('side');if(!sd)return r;
 [...sd.querySelectorAll('button')].filter(b=>/^Préparer une sortie/.test(b.textContent)).forEach(b=>{const cs=camps();if(sel&&cs.length&&!cs.some(c=>c.i===sel.i)&&seen(sel)){const c=cs.slice().sort((a,b2)=>hd(a,sel)-hd(b2,sel))[0],dest=sel.i;b.textContent='🚶 Envoyer un groupe là';b.title='Choisir qui part ; la destination est déjà cette case';b.onclick=()=>{(window.EXPS||(window.EXPS={coche:{},prov:2,but:'chasse'})).dest=dest;expPlan(c.i,null)}}else b.remove()})}catch(e){}return r}}
// au camp : « Préparer une sortie » bien visible, à côté de « Retour à la carte » ; et les réserves en haut
{const st=document.createElement('style');st.textContent='#cvRes{display:flex;gap:10px;flex-wrap:wrap;align-items:center;font:600 12px Montserrat,system-ui,sans-serif;padding:3px 10px;border:1px dotted rgba(232,190,90,.5);border-radius:8px}#cvRes span{white-space:nowrap}#cvRes .bas{color:#ff9a7a}#cvSort{margin-left:6px}';document.head.appendChild(st)}
setInterval(()=>{try{if(!S||!CV.on||modeHist())return;const X=$('cvX');if(!X)return;const h=X.parentElement;
 if(!$('cvSort')){const b=document.createElement('button');b.id='cvSort';b.className='bt';b.textContent='🚶 Préparer une sortie';b.onclick=()=>expPlan(CV.camp,null);X.after(b)}
 let r=$('cvRes');if(!r){r=document.createElement('div');r.id='cvRes';const t=$('cvT');(t||h.firstChild).after(r)}
 const ci=CV.camp,so=(S.soif||{})[ci]||0,pl=Object.keys(S.herb||{}).filter(k=>S.herb[k]>=2).length,ch=(S.pp||[]).filter(p=>campDe(p)===ci&&p.role==='cha'&&!enGrp(p)).length,v=Math.floor(S.vivres||0),bes=typeof P23vivJ==='function'?P23vivJ():3;
 const L=['<span class="'+(v<bes?'bas':'')+'" title="Ce que le camp a à manger ; il en faut environ '+bes.toFixed(1)+' par jour">🍲 '+v+' vivres</span>','<span class="'+(so>=1?'bas':'')+'">💧 '+(so>=1?'soif depuis '+Math.floor(so)+' j':'eau puisée')+'</span>'];
 if(pl)L.push('<span>🌿 '+pl+' plante'+(pl>1?'s':'')+'</span>');if(S.fu)L.push('<span>💥 '+S.fu+' fusil'+(S.fu>1?'s':'')+'</span>');if(ch&&!S.voieC)L.push('<span title="une par chasseur">🔱 '+ch+' sagaie'+(ch>1?'s':'')+'</span>');if(S.arcs)L.push('<span>🏹 '+S.arcs+' arc'+(S.arcs>1?'s':'')+'</span>');if(S.lp)L.push('<span>🪃 '+S.lp+' lance-pierre'+(S.lp>1?'s':'')+'</span>');
 if(S.adh!=null&&!S.voieC)L.push('<span class="'+(S.adh<35?'bas':'')+'" title="Combien suivent le chef">🔥 adhésion '+Math.round(S.adh)+' %</span>');if(S.satE!=null&&S.voieC&&S.year<1848)L.push('<span class="'+(S.satE<35?'bas':'')+'">⛓️ humeur des esclaves '+Math.round(S.satE)+' %</span>');
 const H=L.join('');if(r._h!==H){r.innerHTML=H;r._h=H}}catch(e){}},700);

// ----- 3. Le conseil autour du feu (marrons) et la villa du maître (colons) -----
const DIR87={chasse:['🏹','les chasseurs','On libère plus souvent et plus facilement les esclaves des habitations ; la chasse rapporte plus ; le mystique vient moins.'],
 nature:['🌿','les cueilleurs','Plus de mystique et de nature : les nouvelles plantes poussent plus vite et plus fort ; mais on libère plus difficilement.'],
 mixte:['⚖️','l’équilibre','Un peu des deux : la chasse et la cueillette, la liberté et le mystique.']};
function dirDe(p){return p.role==='cha'?'chasse':(p.role==='cue'||p.role==='mys')?'nature':'mixte'}
function conseilCandidats(ci){const A=(S.pp||[]).filter(p=>campDe(p)===ci&&adulte(p)&&!enGrp(p));if(!A.length)return [];const C=[],add=(p,why)=>{if(p&&!C.some(c=>c.p===p))C.push({p,why})},sc=p=>(p.xp||0)+(p.sk?Object.values(p.sk).reduce((a,b)=>a+b,0):0);
 add(A.filter(p=>p.role==='cha').sort((a,b)=>sc(b)-sc(a))[0],'le meilleur chasseur');add(A.filter(p=>p.role==='cue'||p.role==='mys').sort((a,b)=>sc(b)-sc(a))[0],'qui connaît les plantes');
 {const v=A.slice().sort((a,b)=>ageP(b)-ageP(a))[0];add(v,v&&v.g==='f'?'la plus âgée':'le plus âgé')}if(!C.some(c=>c.p.g==='f'))add(A.filter(p=>p.g==='f').sort((a,b)=>sc(b)-sc(a)||ageP(b)-ageP(a))[0],'une femme écoutée');
 if(C.length<2)add(A.find(p=>!C.some(c=>c.p===p)),'un volontaire');return C.slice(0,4)}
function conseilVoix(ci,C,soutien){const A=(S.pp||[]).filter(p=>campDe(p)===ci&&adulte(p)),v=C.map(()=>0);
 A.forEach(e=>{let b=0,bs=-1;C.forEach((c,k)=>{const s=(e.role&&e.role===c.p.role?2.2:0)+(e.or===c.p.or?1:0)+(ageP(e)>=45&&ageP(c.p)>=45?1.2:0)+(e.g===c.p.g?.4:0)+(e.id===c.p.id?4:0)+Math.min(40,ageP(c.p))/20+Math.random()*2.4+(soutien===c.p.id?1.8:0);if(s>bs){bs=s;b=k}});v[b]++});return v}
function scene87(colon){return colon?'background:radial-gradient(ellipse at 50% 30%,#3a3428 0%,#1a1612 70%),#1a1612;':'background:radial-gradient(ellipse at 50% 85%,rgba(255,150,50,.55) 0%,rgba(120,50,10,.35) 22%,#0d0a08 60%),#0d0a08;'}
function conseilOuvrir(ci,auto){if(!S||S.voieC)return chefOuvrir(ci);const C=conseilCandidats(ci);if(!C.length)return;const v0=conseilVoix(ci,C),tot=v0.reduce((a,b)=>a+b,0)||1;
 const d=document.createElement('div');d.id='cons87';d.style.cssText='position:fixed;inset:0;z-index:96;display:flex;align-items:flex-end;justify-content:center;'+scene87(false)+'font-family:Montserrat,system-ui,sans-serif;color:#f4ead6';
 d.innerHTML='<div style="position:absolute;left:50%;top:6%;transform:translateX(-50%);font-size:64px;filter:drop-shadow(0 0 30px #ff8a30);z-index:0">🔥</div><div style="position:relative;z-index:1;max-width:640px;width:calc(100% - 24px);margin-bottom:4vh;background:rgba(20,14,8,.82);border:1px solid #6a4a2a;border-radius:10px;padding:16px 18px">'+
  '<small style="color:#e8be5a">Autour du feu</small><h3 style="font:700 22px Alegreya,Georgia,serif;margin:2px 0 6px">Le camp choisit son chef</h3><p style="margin:0 0 10px;font-size:13px">Les adultes s’assoient en cercle. Chacun dira qui il suit. Le chef donnera au camp sa direction.'+(auto?' Vous pouvez soutenir quelqu’un, sans décider à leur place.':'')+'</p>'+
  C.map((c,k)=>{const D=DIR87[dirDe(c.p)],pc=Math.round(v0[k]/tot*100);return '<div style="border-top:1px solid #4a3a28;padding:7px 0"><b>'+D[0]+' '+c.p.n+'</b> <small>· '+c.why+' · '+(c.p.g==='f'?'femme':'homme')+', '+ageP(c.p)+' ans</small><br><small>Direction : '+D[1]+' — '+D[2]+'</small>'+
   '<div style="display:flex;align-items:center;gap:8px;margin-top:4px"><div style="flex:1;height:8px;background:#3a2e20;border-radius:4px"><i style="display:block;height:100%;width:'+pc+'%;background:#e8be5a;border-radius:4px"></i></div><small>'+pc+' % le suivent</small><button data-s="'+c.p.id+'" style="font:600 12px Montserrat;border-radius:999px;padding:3px 10px;background:transparent;color:#f4ead6;border:1px solid #e8be5a;cursor:pointer">Soutenir</button></div></div>'}).join('')+
  '<div style="text-align:right;margin-top:8px"><button data-s="-1" style="font:600 13px Montserrat;border-radius:999px;padding:6px 14px;background:#b5412b;color:#fff;border:0;cursor:pointer">Laisser voter</button></div></div>';
 document.body.appendChild(d);d.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{const s=+b.dataset.s,v=conseilVoix(ci,C,s>=0?s:null),k=v.indexOf(Math.max(...v)),w=C[k].p,tt=v.reduce((a,b)=>a+b,0)||1;
  (S.chefs=S.chefs||{})[ci]={id:w.id,an:S.year};S.dirCamp=dirDe(w);S.adh=Math.max(40,Math.round(v[k]/tt*100));S.chefSexe=w.g;S.chefVieux=ageP(w)>=50;fx({coh:3});
  log('Autour du feu, le camp a choisi '+w.n.split(' ')[0]+' ('+C.map((c,j)=>c.p.n.split(' ')[0]+' '+v[j]).join(', ')+' voix). Direction : '+DIR87[S.dirCamp][1]+'.');try{journal('Le camp suit '+w.n.split(' ')[0]+' : '+DIR87[S.dirCamp][2])}catch(e){}
  d.remove();try{sauve();if(CV.on)cvListe();rafraichir()}catch(e){}})}
// le bouton « Voter » du camp ouvre le conseil
{const co=chefOuvrir;chefOuvrir=function(ci){if(S&&!S.voieC&&!document.getElementById('cons87'))return conseilOuvrir(ci,true);return co.apply(this,arguments)}}
// la villa : côté colon, le maître est déjà nommé ; seule une nouvelle famille noble, un enfant, ou une famille invitée peuvent prendre place
function villaOuvrir(){const ci=(camps()[0]||{}).i;if(ci==null)return;const P=(S.pp||[]).filter(p=>campDe(p)===ci);const M=P.find(p=>estColon(p)&&adulte(p)&&p.g!=='f')||P.find(p=>estColon(p)&&adulte(p));if(!M)return;
 const enf=P.filter(p=>estColon(p)&&p.fa===M.fa&&ageP(p)>=16&&p!==M);const d=document.createElement('div');d.id='cons87';d.style.cssText='position:fixed;inset:0;z-index:96;display:flex;align-items:flex-end;justify-content:center;'+scene87(true)+'font-family:Montserrat,system-ui,sans-serif;color:#f4ead6';
 d.innerHTML='<div style="position:absolute;left:50%;top:14%;transform:translateX(-50%);font-size:70px;opacity:.85">🏛️</div><div style="max-width:620px;width:calc(100% - 24px);margin-bottom:4vh;background:rgba(26,22,16,.88);border:1px solid #6a5a40;border-radius:10px;padding:16px 18px">'+
  '<small style="color:#e8be5a">Sur la varangue de la villa</small><h3 style="font:700 22px Alegreya,Georgia,serif;margin:2px 0 6px">'+M.n+', maître de l’habitation</h3><p style="font-size:13px;margin:0 0 10px">Ici, on ne vote pas : le maître tient sa concession de la Compagnie. Seule une nouvelle famille noble, un enfant, ou une famille invitée peuvent prendre place à ses côtés.</p>'+
  '<button data-v="garde" style="display:block;width:100%;text-align:left;margin:5px 0;font:500 13px Montserrat;background:#ffffff0d;color:#f4ead6;border:1px solid #6a5a40;border-radius:6px;padding:8px 10px;cursor:pointer"><b>Le maître gouverne seul</b><br><small>L’ordre tient ; tout repose sur lui.</small></button>'+
  (enf.length?'<button data-v="enfant" style="display:block;width:100%;text-align:left;margin:5px 0;font:500 13px Montserrat;background:#ffffff0d;color:#f4ead6;border:1px solid #6a5a40;border-radius:6px;padding:8px 10px;cursor:pointer"><b>'+enf[0].n.split(' ')[0]+' prend sa place</b><br><small>L’héritier mène l’habitation ; le maître le conseille.</small></button>':'')+
  '<button data-v="noble" style="display:block;width:100%;text-align:left;margin:5px 0;font:500 13px Montserrat;background:#ffffff0d;color:#f4ead6;border:1px solid #6a5a40;border-radius:6px;padding:8px 10px;cursor:pointer"><b>Une famille noble s’installe</b><br><small>Un nom, des relations à la Compagnie : colonie +4, mais il faut la loger (−4 vivres).</small></button>'+
  '<button data-v="invite" style="display:block;width:100%;text-align:left;margin:5px 0;font:500 13px Montserrat;background:#ffffff0d;color:#f4ead6;border:1px solid #6a5a40;border-radius:6px;padding:8px 10px;cursor:pointer"><b>Accueillir une famille invitée</b><br><small>Des bras et des bouches en plus : deux colons rejoignent l’habitation.</small></button></div>';
 document.body.appendChild(d);d.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{const k=b.dataset.v;(S.chefs=S.chefs||{})[ci]={id:(k==='enfant'?enf[0]:M).id,an:S.year};S.satE=S.satE??60;
  if(k==='noble'){fx({ami:4});S.vivres=Math.max(0,(S.vivres||0)-4);log('Une famille noble s’installe à l’habitation de '+M.n.split(' ')[0]+'.')}
  else if(k==='invite'){for(let i=0;i<2;i++){const p=nouvellePersonne({or:'eu',age:20+Math.floor(rnd()*20),st:'libre',g:i?'f':'h'});p.camp=ci;S.pp.push(p)}S.gens=(S.gens||0)+2;log('Une famille invitée rejoint l’habitation.')}
  else if(k==='enfant')log(enf[0].n.split(' ')[0]+' prend la tête de l’habitation.');else log(M.n.split(' ')[0]+' gouverne seul l’habitation.');d.remove();try{sauve();rafraichir()}catch(e){}})}
// au lancement de la Vie : d'abord les rôles et les personnages, puis le vote (ou la villa)
setInterval(()=>{try{if(!S||S.fin||modeHist()||S.cons87||!camps().length||!grpOn())return;if($('modal')&&!$('modal').hidden)return;if(document.querySelector('#cons87,#expP,#cine,.cine')||document.body.classList.contains('film'))return;if(typeof CINE!=='undefined'&&CINE&&CINE.on)return;
 S.cons87=1;const ci=camps()[0].i;const suite=()=>{if(S.voieC)villaOuvrir();else{if(chefDe(ci)&&S.dirCamp)return;conseilOuvrir(ci,true)}};if((S.pp||[]).some(p=>p.role))suite();else rolesOuvrir(ci,suite)}catch(e){}},1500);
// d'abord : qui fait quoi (les rôles), proposés selon ce que chacun sait faire
function rolesOuvrir(ci,suite){const A=(S.pp||[]).filter(p=>campDe(p)===ci&&adulte(p)&&!enGrp(p)&&!(S.voieC&&estColon(p)));if(!A.length)return suite();const sk=(p,k)=>(p.sk||{})[k]||0,ch={};
 const pr=(k,n)=>A.filter(p=>!ch[p.id]).sort((a,b)=>sk(b,k)-sk(a,k)).slice(0,n).forEach(p=>ch[p.id]=k);pr('cha',Math.max(1,Math.round(A.length*.3)));pr('cue',Math.max(1,Math.round(A.length*.3)));pr('mys',1);
 const d=document.createElement('div');d.id='cons87';d.style.cssText='position:fixed;inset:0;z-index:96;display:flex;align-items:center;justify-content:center;'+scene87(!!S.voieC)+'font-family:Montserrat,system-ui,sans-serif;color:#f4ead6';
 const draw=()=>{d.innerHTML='<div style="max-width:640px;width:calc(100% - 24px);max-height:88vh;overflow:auto;background:rgba(20,14,8,.85);border:1px solid #6a4a2a;border-radius:10px;padding:16px 18px"><small style="color:#e8be5a">'+(S.voieC?'Sur l’habitation':'Au camp')+'</small><h3 style="font:700 22px Alegreya,Georgia,serif;margin:2px 0 6px">Qui fait quoi ?</h3><p style="font-size:13px;margin:0 0 8px">Chacun prend un rôle, selon ce qu’il sait faire. Vous pouvez changer.'+(S.voieC?'':' Ensuite, le camp choisira son chef autour du feu.')+'</p>'+
  A.map(p=>'<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;border-top:1px solid #4a3a28;padding:5px 0"><b style="flex:1;min-width:140px">'+p.n+' <small style="font-weight:400">· '+ageP(p)+' ans</small></b>'+['cha','cue','mys',''].map(k=>'<button data-p="'+p.id+'" data-k="'+k+'" style="font:600 11px Montserrat;border-radius:999px;padding:3px 9px;cursor:pointer;color:#f4ead6;background:'+((ch[p.id]||'')===k?'#e8be5a44':'transparent')+';border:1px solid '+((ch[p.id]||'')===k?'#e8be5a':'#5a4a38')+'">'+(k?ROLES[k].ic+' '+roleN(k):'— aucun')+'</button>').join('')+'</div>').join('')+
  '<div style="text-align:right;margin-top:10px"><button id="rolOk" style="font:600 13px Montserrat;border-radius:999px;padding:7px 16px;background:#b5412b;color:#fff;border:0;cursor:pointer">'+(S.voieC?'Valider':'Valider, puis le conseil')+'</button></div></div>';
  d.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{const id=+b.dataset.p,k=b.dataset.k;if(k)ch[id]=k;else delete ch[id];draw()});
  d.querySelector('#rolOk').onclick=()=>{A.forEach(p=>{if(ch[p.id])p.role=ch[p.id]});d.remove();try{sauve();rafraichir()}catch(e){}setTimeout(suite,300)}};
 document.body.appendChild(d);draw()}

// ----- 4. L'adhésion au chef, l'humeur des esclaves, la palabre et les révoltes ; la direction du camp -----
{const jt=jourTick;jourTick=function(){jt.apply(this,arguments);try{if(!S||S.fin||modeHist()||!grpOn()||!camps().length)return;const ci=camps()[0].i,P=(S.pp||[]).filter(p=>campDe(p)===ci&&!enGrp(p)),A=P.filter(adulte),so=(S.soif||{})[ci]||0,fa=S.faimJ||0;
 // les besoins pèsent sur le travail : la soif ralentit, la faim affaiblit, le manque de sommeil énerve et fait rater
 const prod=A.filter(p=>['cueil','chasse','peche','cuisine'].includes(tacheDe(p))).length*.45;let pen=0;if(so>=2)pen+=.3;if(fa>=1)pen+=.3;const fat=A.length?A.reduce((s,p)=>s+(p.fat||0),0)/A.length:0;if(fat>70)pen+=.25;
 if(pen>0&&prod>0){S.vivres=Math.max(0,(S.vivres||0)-prod*Math.min(.8,pen));if(fat>70&&rnd()<.35){const q=A.filter(p=>(p.fat||0)>70)[0];if(q){journal(q.n.split(' ')[0]+', épuisé'+(q.g==='f'?'e':'')+', s’énerve pour un rien et rate ce qu’'+(q.g==='f'?'elle':'il')+' fait.');S.coh=Math.max(0,(S.coh||0)-.5)}}}
 // la direction choisie au conseil
 if(!S.voieC&&S.dirCamp){const D=S.dirCamp;A.forEach(p=>{const t=tacheDe(p);if(D==='chasse'&&t==='chasse')S.vivres+=.08;if(D==='nature'&&t==='cueil')S.vivres+=.08;if(D!=='chasse'&&p.role==='mys')S.myst=(S.myst||0)+(D==='nature'?.06:.03)});
  const lib={chasse:.05,mixte:.025,nature:.012}[D];if((S.jourN||0)%10===0&&rnd()<lib*3&&S.year>1670){const n=1+Math.floor(rnd()*2);for(let i=0;i<n;i++){const p=nouvellePersonne({or:origineNouvelle(),age:18+Math.floor(rnd()*18),st:'libre'});p.camp=ci;S.pp.push(p)}S.gens=(S.gens||0)+n;journal('Une descente sur une habitation des Bas libère '+n+' esclave'+(n>1?'s':'')+', qui rejoignent le camp.');toast('🔓 '+n+' esclave'+(n>1?'s':'')+' libéré'+(n>1?'s':'')+' rejoignent le camp')}}
 // l'adhésion au chef (marrons) ; l'humeur des esclaves (habitation)
 if(!S.voieC&&S.adh!=null){S.adh=Math.max(0,Math.min(100,S.adh+(fa?-2.5*fa:.35)-(so>=2?2:0)+((S.coh||0)>60?.2:-.2)*(S.chefVieux?.5:1)))}
 if(S.voieC){S.satE=S.satE??60;S.satE=Math.max(0,Math.min(100,S.satE+(fa?-3*fa:.25)-(so>=2?2:0)))}
 // la palabre : quand on manque, on s'arrête de travailler pour écouter
 if((fa>=2||so>=3)&&(S.jourN||0)-(S.palJ||-99)>=6){S.palJ=S.jourN||0;S.vivres=Math.max(0,(S.vivres||0)-prod);palabre(ci,fa>=2?'faim':'soif')}
 // les révoltes
 if(!S.voieC&&S.adh!=null&&S.adh<15)revolteCamp(ci);if(S.voieC&&S.satE<15&&(S.jourN||0)-(S.revJ||-99)>=20)revolteHab(ci)}catch(e){console.warn(e)}}}
function palabre(ci,k){const ch=chefDe(ci),cn=ch?ch.n.split(' ')[0]:(S.voieC?'le maître':'le chef');journal('Plus personne ne travaille : tout le monde s’assoit pour écouter '+cn+'. '+(k==='faim'?'On a faim.':'On a soif.'));
 alerteSimple(S.voieC?'Les esclaves s’arrêtent de travailler':'Palabre au camp',(S.voieC?'Dans la cour, on n’avance plus : ':'Autour du feu, on pose les outils : ')+(k==='faim'?'il n’y a plus rien à manger depuis des jours.':'personne n’a puisé l’eau depuis des jours.')+' Tous attendent ce que dira '+cn+'.',
  [['Partager ce qui reste',()=>{S.coh=Math.min(100,(S.coh||0)+3);if(S.voieC)S.satE=Math.min(100,(S.satE||0)+6);else S.adh=Math.min(100,(S.adh||50)+6);S.vivres=Math.max(0,(S.vivres||0)-2)}],
   ['Envoyer tout le monde chercher '+(k==='faim'?'à manger':'l’eau'),()=>{(S.pp||[]).filter(p=>campDe(p)===ci&&adulte(p)&&!enGrp(p)&&p.id!==S.garde).slice(0,4).forEach(p=>{p.tache=k==='faim'?'cueil':'eau';p.lieu=null});if(!S.voieC)S.adh=Math.min(100,(S.adh||50)+2)}],
   ['Imposer le silence',()=>{if(S.voieC)S.satE=Math.max(0,(S.satE||0)-12);else S.adh=Math.max(0,(S.adh||50)-10);S.coh=Math.max(0,(S.coh||0)-3)}]])}
function revolteCamp(ci){const P=(S.pp||[]).filter(p=>campDe(p)===ci&&!enGrp(p)),ch=chefDe(ci);const part=P.filter(p=>p!==ch).sort(()=>rnd()-.5).slice(0,Math.ceil(P.length/3));
 S.pp=S.pp.filter(p=>!part.includes(p));S.gens=Math.max(0,(S.gens||0)-part.length);S.vivres=Math.round((S.vivres||0)/2);if(S.chefs)delete S.chefs[ci];S.adh=null;S.dirCamp=null;S.cons87=0;
 journal('La discorde a gagné le camp : '+part.length+' personne'+(part.length>1?'s':'')+' s’en vont avec la moitié des vivres pour fonder ailleurs. '+(ch?ch.n.split(' ')[0]+' n’est plus le chef.':''));
 alerteSimple('Le camp se divise',part.map(p=>p.n.split(' ')[0]).join(', ')+' ne suivent plus le chef : ils partent, avec la moitié des vivres. Il faudra réunir un nouveau conseil autour du feu.',[['Réunir le conseil',()=>{S.cons87=1;conseilOuvrir(ci,true)}]])}
function revolteHab(ci){S.revJ=S.jourN||0;const E=(S.pp||[]).filter(p=>campDe(p)===ci&&p.st==='esclave'&&adulte(p));
 if(S.year<1848){const fu=E.sort(()=>rnd()-.5).slice(0,Math.ceil(E.length/3));S.pp=S.pp.filter(p=>!fu.includes(p));S.gens=Math.max(0,(S.gens||0)-fu.length);S.vivres=0;S.bet=Math.max(0,Math.floor((S.bet||0)/2));S.coh=Math.max(0,(S.coh||0)-15);S.satE=45;S.traque=Math.min(100,(S.traque||0)+10);
  journal('Révolte sur l’habitation : la nuit, les cases et le magasin brûlent. '+fu.length+' esclave'+(fu.length>1?'s':'')+' s’enfuient dans les Hauts.');alerteSimple('L’habitation brûle','Le maître n’a pas su tenir ses esclaves : la nuit, le feu prend au magasin et aux cases. Au matin, il ne reste rien des réserves, et '+fu.length+' personnes ont fui vers les Hauts.',[['Constater les dégâts',()=>{}]])}
 else{S.vivres=Math.round((S.vivres||0)*.4);S.satE=45;S.coh=Math.max(0,(S.coh||0)-8);(S.pp||[]).filter(p=>campDe(p)===ci&&!estColon(p)&&adulte(p)).forEach(p=>{p.tache='repos'});
  journal('Les travailleurs, payés trop peu et nourris trop mal, pillent le magasin et refusent de travailler.');alerteSimple('Les travailleurs pillent le magasin','Depuis l’abolition, ils sont libres de partir : mal payés, mal nourris, ils pillent le magasin et posent les outils.',[['Négocier',()=>{S.satE=60}],['Faire venir les gendarmes',()=>{S.satE=30;S.coh=Math.max(0,(S.coh||0)-4)}]])}}
// la direction « nature » : les nouvelles plantes arrivent plus tôt et poussent mieux
if(typeof hbDispo==='function'){const hd0=hbDispo;hbDispo=function(k){if(S&&S.dirCamp==='nature'&&HERB[k]&&S.year>=HERB[k].y-15&&!(HERB[k].noble&&!S.voieC))return true;return hd0.apply(this,arguments)}}

// ----- 5. L'incarnation : chacun fait un geste qu'on reconnaît ; on dort dans son lit ; Échap libère la souris, Échap ×2 ramène à la carte -----
const GESTE87={cuisine:'cuisine',garde:'garde',eau:'eau',bois:'bois',paille:'cueillir_sol',pierre:'pierre',cueil:'cueillir_sol',chasse:'chasse_traque',soin:'soin',repos:'assis',peche:'guetteur',laver:'eau',champ:'cueillir_sol'};
{const vl=vpVilBoucle;vpVilBoucle=function(dt){vl.apply(this,arguments);try{const V=VP;(V.vil||[]).forEach(o=>{if(!o.root||!o.mx)return;const O=o.ordre,mv=Math.hypot((O?O.x:o.poste.x)-o.x,(O?O.z:o.poste.z)-o.z)>.5;if(mv)return;
 let g=null;if(O){g=O.k==='repos'?'dormir':O.k==='nettoyer'?'balai':O.k==='apprendre'?'assis':O.k==='aider'?'bois':null}else if(adulte(o.p))g=GESTE87[tacheDe(o.p)]||null;else g='course';
 if(g&&g!==o.clip){const a=(o.anim||[]).find(x=>x.name===g)||(g==='balai'?(o.anim||[]).find(x=>x.name==='bois'):null);if(a){o.mx.stopAllAction();o.mx.clipAction(a).play();o.clip=g;if(g==='dormir')o.root.position.y=V.h(o.x,o.z)}}})}catch(e){}}}
// dormir : le perso rentre à sa case et s'allonge ; on voit la scène
{const vs=vpSoi;vpSoi=function(k){const V=VP;if(k==='boire'){if(!V)return;const p=V.chef.p,ci=(camps()[0]||{}).i,so=(S.soif||{})[ci]||0;if(!VPLIEU||!VPLIEU.g){if(so>=2){vpMsg('La jarre est vide : personne n’a puisé l’eau.');return}}V.hp=Math.min(3,V.hp+(V.hp<3?1:0));p.soifP=0;vpMsg(p.n.split(/[ ,]/)[0]+' boit '+(VPLIEU&&VPLIEU.g?'à la gourde':'à la jarre')+'.');vpHud();return}
 if(k==='dormir'&&V&&!(VPLIEU&&VPLIEU.g)&&!V.fight){const p=V.chef.p,ch=V.chef;V.auto={x:Math.cos(p.id||1)*6.5,z:-30+Math.sin(p.id||1)*4.5,dort:1};vpMsg(p.n.split(/[ ,]/)[0]+' rentre se coucher dans sa case.');return}return vs.apply(this,arguments)}}
{const vb=vpBoucle;vpBoucle=function(){vb.apply(this,arguments);try{const V=VP;if(!V||!V.p84)return;const ch=V.chef;
 if(V.auto&&V.auto.dort&&Math.hypot(V.auto.x-ch.x,V.auto.z-ch.z)<1.2){V.auto=null;vpClip(ch,'dormir');V.dortVu=2.2;vpMsg(ch.p.n.split(/[ ,]/)[0]+' s’allonge sur sa natte…')}
 if(V.dortVu>0){V.dortVu-=.016;if(V.dortVu<=0){V.dortVu=0;vs87()}}
 // la consigne des touches, toujours visible
 if(!$('vpEsc')){const d=document.createElement('div');d.id='vpEsc';d.style.cssText='position:absolute;right:14px;bottom:14px;font:600 12px Montserrat,system-ui;background:#000a;border-radius:8px;padding:6px 10px;display:flex;gap:8px;align-items:center;z-index:5';
  d.innerHTML='<span id="vpEscT">Échap : libérer la souris · Échap ×2 : retour à la carte</span><button id="vpRet" style="font:600 12px Montserrat;border-radius:999px;padding:3px 10px;background:#b5412b;color:#fff;border:0;cursor:pointer">⟵ Carte</button>';V.el.appendChild(d);d.querySelector('#vpRet').onclick=e=>{e.stopPropagation();vpQuitter()}}
 const t=$('vpEscT');if(t){const txt=V.noLock?'🖱️ Souris libre (double-clic sur la vue pour la reprendre) · Échap : retour à la carte':'Échap : libérer la souris · Échap ×2 : retour à la carte';if(t.textContent!==txt)t.textContent=txt}
 // Échap bloque la prise de la souris
 const cv=V.R&&V.R.domElement;if(cv&&!cv._p87){cv._p87=1;const rq=cv.requestPointerLock;cv.requestPointerLock=function(){if(VP&&VP.noLock)return Promise.resolve();return rq.apply(this,arguments)};cv.addEventListener('dblclick',()=>{if(VP){VP.noLock=0;try{const p=rq.call(cv);if(p&&p.catch)p.catch(()=>{})}catch(_){}}})}
 }catch(e){}}}
function vs87(){const V=VP;if(!V)return;const n=$('vpNoir'),p=V.chef.p;if(!n)return;n.textContent=p.n.split(/[ ,]/)[0]+' dort…';n.style.opacity=1;V.dort=1;setTimeout(()=>{if(!VP)return;V.hp=3;p.fat=0;V.dort=0;n.style.opacity=0;vpClip(V.chef,'repos_debout');vpMsg(p.n.split(/[ ,]/)[0]+' se réveille reposé : souffle plein.');vpHud()},2600)}
{let tEsc=0;document.addEventListener('pointerlockchange',()=>{if(VP&&!document.pointerLockElement){VP.noLock=1;tEsc=performance.now()}});
 addEventListener('keydown',e=>{if(!VP||e.key!=='Escape'||VP.en2D)return;if($('vpSo')){$('vpSo').remove();e.stopImmediatePropagation();return}const now=performance.now();
  if(document.pointerLockElement)return;e.stopImmediatePropagation();e.preventDefault();if(!VP.noLock){VP.noLock=1;tEsc=now;return}if(now-tEsc<900){vpQuitter();return}tEsc=now},true)}
// la touche B : boire
{const st=()=>{if(!VP||!VP.p84)return;const M=$('vpMoi');if(M&&!M.querySelector('[data-m="boire"]')){const b=document.createElement('button');b.dataset.m='boire';b.textContent='💧 Boire (B)';b.onclick=e=>{e.stopPropagation();vpSoi('boire')};M.insertBefore(b,M.children[1]||null)}};setInterval(st,700)}
addEventListener('keydown',e=>{if(!VP||VP.en2D||e.repeat)return;if(e.key.toLowerCase()==='b'&&!e.ctrlKey){vpSoi('boire')}},true);

// ----- 6. Double-clic sur une personne (au camp ou dans Demoun) : on l'incarne -----
let VPMOI=null;
{const vo=vpOuvrir;vpOuvrir=function(a){if(a&&a.moi){VPMOI=a.moi}if(VPMOI&&!VP){const sg=S.grp;S.grp=[];try{return vo.apply(this,[])}finally{S.grp=sg}}return vo.apply(this,arguments)}}
{const vq=vpQuitter;vpQuitter=function(){VPMOI=null;return vq.apply(this,arguments)}}
{const vg=vpGroupe;vpGroupe=function(ci){const G=vg.apply(this,arguments);try{if(!G||!VPMOI||(VPLIEU&&VPLIEU.g))return G;const m=VPMOI;if(G.chef===m)return G;const old=G.chef;G.V=(G.V||[]).filter(p=>p!==m);if(old&&!enGrp(old))G.V.unshift(old);G.chef=m;G.C=[];G.pasChef=true}catch(e){}return G}}
{const vh=vpHud;vpHud=function(){vh.apply(this,arguments);try{if(!VP||!VP.G||!VP.G.pasChef)return;const d=$('vpH');if(d)d.innerHTML=d.innerHTML.replace(/ · chef/,' · '+(adulte(VP.chef.p)?(VPK[vpKind(VP.chef.p)]||['',''])[1]:'enfant'))}catch(e){}}}
// pas chef : on parle, on demande ; on ne commande pas
{const vo=vpOrdreVil;vpOrdreVil=function(o,k){if(VP&&VP.G&&VP.G.pasChef&&k!=='parler'&&k!=='demander'){if(k==='suivre'){if(rnd()<.55)return vo.call(this,o,'suivre');vpMsg('« Pas maintenant », répond '+o.p.n.split(/[ ,]/)[0]+'.');return}vpMsg('Vous n’êtes pas le chef : vous pouvez seulement parler, ou demander de l’aide.');return}
 if(k==='parler'){const L=['« La pluie revient bientôt, je le sens dans mes genoux. »','« Tu as vu les cabris vers la ravine ? »','« Le chef parle trop, ou pas assez. »','« Ce soir, on chante. »','« Il faut puiser l’eau avant la nuit. »'];vpMsg(o.p.n.split(/[ ,]/)[0]+' : '+L[Math.floor(rnd()*L.length)]);return}return vo.apply(this,arguments)}}
{const vu=vpVilUI;vpVilUI=function(){const sv=VPORD.adulte,se=VPORD.enfant;if(VP&&VP.G&&VP.G.pasChef){VPORD.adulte=[['parler','💬','Parler'],['suivre','🙏','Demander de venir']];VPORD.enfant=[['parler','💬','Parler']]}else{VPORD.adulte=sv.filter(a=>a[0]!=='parler').concat(sv.some(a=>a[0]==='parler')?[]:[['parler','💬','Parler']])}
 try{return vu.apply(this,arguments)}finally{VPORD.adulte=sv;VPORD.enfant=se}}}
// au camp (carte 2D) et dans Demoun : double-clic pour incarner
document.addEventListener('dblclick',e=>{try{if(!S||modeHist()||VP)return;const el=e.target.closest&&e.target.closest('[data-pid]');let p=null;
 if(el&&(el.closest('#cvL')||el.closest('#drawer')))p=ppId(+el.dataset.pid);
 else if(e.target.id==='cvC'&&CV.on&&CV.A){const r=e.target.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;let bd=.06;for(const id in CV.A){const a=CV.A[id];if(a.vis&&Math.hypot(a.x-x,(a.y-y)*.7)<bd){bd=Math.hypot(a.x-x,(a.y-y)*.7);p=ppId(+id)}}}
 if(!p||enGrp(p))return;e.preventDefault();toast('🧍 Vous incarnez '+p.n.split(' ')[0]+'.');vpOuvrir({moi:p})}catch(_){}},true);
