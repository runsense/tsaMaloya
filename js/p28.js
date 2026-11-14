// ===== p28 : les besoins du camp se touchent — chaque besoin ouvre ses actions ; et les événements ne bloquent plus l'automatique =====

// ---------- les lignes de besoins deviennent des boutons, et brillent quand ça presse ----------
{const st=document.createElement('style');st.textContent='.besR{cursor:pointer;border-radius:5px;padding:1px 3px;margin:1px -3px}.besR:hover{background:rgba(232,190,90,.14)}@keyframes besB{0%,100%{background:rgba(232,123,90,0)}50%{background:rgba(232,123,90,.32)}}.besR.urg{animation:besB 1.3s ease-in-out infinite}';document.head.appendChild(st)}
besoinsHtml=function(L){return L.map(([n,v,t])=>'<div class="besR'+(v<35||(n==='Repos'&&S.alerteCamp)?' urg':'')+'" data-bes="'+n+'" title="Toucher pour agir" style="display:flex;gap:6px;align-items:center"><b style="width:62px;font-size:12px">'+n+'</b>'+jauge(v)+'<small>'+t+'</small> <small style="margin-left:auto;opacity:.6">▸</small></div>').join('')};
const fait1=(p,k)=>{p.tache=k;p.lieu=null;sauve();cvListe()};
const gensC=ci=>(S.pp||[]).filter(p=>campDe(p)===ci&&!enGrp(p));
const qui=p=>p.n.split(' ')[0]+' <small>('+(typeof tacheTxt==='function'?tacheTxt(p):'')+')</small>';
function besoinMenu(n,X,Y){const ci=CV.camp,P=gensC(ci),A=P.filter(adulte),L=[];
 if(n==='Manger'){const ch=A.filter(p=>tacheDe(p)==='chasse'),cu=A.filter(p=>tacheDe(p)==='cueil'),pe=A.filter(p=>tacheDe(p)==='peche');L.push(['Aujourd’hui : '+ch.length+' à la chasse, '+cu.length+' à la cueillette'+(TACHES.peche?', '+pe.length+' à la pêche':''),()=>{}]);
  L.push(['🏹 Préparer un groupe de chasse (loin du camp, plusieurs jours)…',()=>{window.EXPS=window.EXPS||{coche:{},prov:2,but:'chasse'};EXPS.but='chasse';expPlan(ci,null)}]);
  // chasser près du camp, à la journée : seulement ceux qui sont formés à la chasse ; les autres peuvent cueillir ou pêcher
  A.filter(p=>p.id!==S.garde&&p.role==='cha'&&tacheDe(p)!=='chasse').slice(0,4).forEach(p=>L.push(['🏹 '+p.n.split(' ')[0]+' va chasser autour du camp (au lieu de : '+tacheTxt(p)+')',()=>fait1(p,'chasse')]));
  if(!A.some(p=>p.role==='cha'))L.push(['ℹ️ Personne n’est formé à la chasse : sans chasseur, on mange ce qu’on cueille et ce qu’on pêche. Formez quelqu’un au camp.',()=>{}]);
  const lib=A.filter(p=>p.id!==S.garde&&['repos','bois','paille','eau','pierre'].includes(tacheDe(p))).sort((a,b)=>(a.fat||0)-(b.fat||0));
  lib.slice(0,4).forEach(p=>{L.push(['🌿 '+p.n.split(' ')[0]+' va cueillir à la journée (au lieu de : '+tacheTxt(p)+')',()=>fait1(p,'cueil')]);if(TACHES.peche&&T.some(t=>t.riv&&hd(t,T[ci])<=2))L.push(['🐟 '+p.n.split(' ')[0]+' va pêcher',()=>fait1(p,'peche')])})}
 else if(n==='Repos'){const F=A.filter(p=>(p.fat||0)>50).sort((a,b)=>(b.fat||0)-(a.fat||0));
  if(S.alerteCamp)L.push(['⚠️ Le camp est attaqué : tout le monde debout !',()=>{A.forEach(p=>{if(tacheDe(p)==='repos')p.tache=null});S.alerteCamp=0;sauve();cvListe();toast('Tout le monde est debout.')}]);
  F.slice(0,6).forEach(p=>L.push(['😴 Envoyer dormir '+p.n.split(' ')[0]+' — fatigue '+Math.round(p.fat)+' %, '+tacheTxt(p),()=>fait1(p,'repos')]));
  if(F.length>1)L.push(['😴 Tous les épuisés se reposent ('+F.length+')',()=>{F.forEach(p=>p.tache='repos');sauve();cvListe()}]);
  const R=A.filter(p=>tacheDe(p)==='repos'&&(p.fat||0)<25);if(R.length)L.push(['🌅 Lever les reposés ('+R.length+')',()=>{R.forEach(p=>p.tache=null);sauve();cvListe()}]);if(!L.length)L.push(['Personne n’est épuisé.',()=>{}])}
 else if(n==='Se laver'){const D=P.filter(p=>(p.sale||0)>.4).sort((a,b)=>(b.sale||0)-(a.sale||0));if(!D.length)L.push(['Tout le monde est propre.',()=>{}]);
  D.slice(0,7).forEach(p=>L.push(['💧 '+p.n.split(' ')[0]+' va se laver — '+(adulte(p)?tacheTxt(p):'enfant')+', sale à '+Math.round((p.sale||0)*100)+' %',()=>fait1(p,TACHES.laver?'laver':'eau')]))}
 else if(n==='Soins'){const B=P.filter(p=>p.bl||sante(p)<50),M=A.filter(p=>p.role==='mys'||tacheDe(p)==='soin');if(!B.length)L.push(['Personne n’a besoin de soins.',()=>{}]);
  B.forEach(p=>L.push(['🩹 '+p.n.split(' ')[0]+(p.bl?' est blessé'+(p.g==='f'?'e':''):'')+' · santé '+Math.round(sante(p)),()=>{}]));
  const s=M[0]||A.filter(p=>p.id!==S.garde).sort((a,b)=>(a.fat||0)-(b.fat||0))[0];if(B.length&&s)L.push(['🌿 '+s.n.split(' ')[0]+' soigne les malades'+(s.role==='mys'?'':' (pas guérisseur)'),()=>fait1(s,'soin')]);
  if(B.length)L.push(['😴 Les malades se reposent',()=>{B.filter(adulte).forEach(p=>p.tache='repos');sauve();cvListe()}])}
 else if(n==='Abri'){const o=S.t[ci]||{},nc=(o.vl||[]).filter(v=>v.k==='case').length,R=typeof logerCamp==='function'?logerCamp(ci):null,cc=BAT.case.c,cs=Object.entries(cc).map(([r,v])=>v+' '+r).join(', ');
  if(R)L.push(['Il manque '+Math.max(0,Math.ceil(R.dehors.length/(KCASE+(S.caseR||0))))+' case'+(R.dehors.length>KCASE+(S.caseR||0)?'s':'')+' : '+R.dehors.length+' dorment dehors',()=>{}]);
  L.push(['🏠 Bâtir une case ('+cs+', 1 bras)'+(peut(cc)?'':' — il manque '+manque(cc)),()=>{if(!peut(cc)){toast('Il manque '+manque(cc)+'.');return}batir(T[ci],'case');sauve();cvListe()}]);
  if(S.cyc&&!S.abri)L.push(['🌀 Préparer l’abri pour le cyclone (2 bois, 2 paille, 1 bras)'+(peut({bois:2,paille:2})?'':' — il manque '+manque({bois:2,paille:2})),()=>{if(!peut({bois:2,paille:2})||S.bras<1){toast(S.bras<1?raisonBras(1):'Il manque '+manque({bois:2,paille:2})+'.');return}preparer();cvListe();toast('L’abri est prêt.')}]);
  const ab=(o.vl||[]).filter(v=>v.abime||v.dmg);if(ab.length)L.push(['🔨 Réparer '+ab.length+' construction'+(ab.length>1?'s':'')+' abîmée'+(ab.length>1?'s':'')+' (1 bois chacune)',()=>{if((S.res.bois||0)<ab.length){toast('Il faut '+ab.length+' bois.');return}S.res.bois-=ab.length;ab.forEach(v=>{delete v.abime;delete v.dmg});sauve();peindre();cvListe()}]);
  if(nc)L.push(['🪵 Renforcer les cases (+1 place chacune : '+nc+' bois, '+nc+' paille)',()=>{if(!peut({bois:nc,paille:nc})){toast('Il manque '+manque({bois:nc,paille:nc})+'.');return}paye({bois:nc,paille:nc});S.caseR=(S.caseR||0)+1;sauve();cvListe();toast('Les cases sont renforcées.')}])}
 else if(n==='Entente'){const C=S.voieC,deja=k=>S.fete!=null&&S.fete[k]!=null&&S.fete[k]===(S.ns||0),f=(k,nom,cout,coh,d)=>L.push([nom+' — '+d+(deja(k)?' (déjà fait cette saison)':''),()=>{if(deja(k)){toast('Déjà fait cette saison.');return}if(cout&&!peut(cout)){toast('Il manque '+manque(cout)+'.');return}if(cout)paye(cout);(S.fete=S.fete||{})[k]=S.ns||0;fx({coh});A.forEach(p=>p.fat=Math.max(0,(p.fat||0)-10));log(nom.replace(/^\S+\s/,'')+' au camp : l’entente remonte.');sauve();cvListe()}]);
  if(C){f('messe','⛪ Faire dire une messe',{vivres:1},5,'si un prêtre passe ; vivres 1, entente +5');f('office','🕯️ L’office du soir',null,2,'gratuit, entente +2');f('cabaret','🍶 Un soir au cabaret (arak)',{vivres:2},4,'vivres 2, entente +4, fatigue −10')}
  else{f('service','🥁 Un service pour les ancêtres',{vivres:1},5,'vivres 1, entente +5');f('sega','🎶 Un séga autour du feu',null,3,'gratuit, entente +3, fatigue −10');f('kabar','🔥 Un kabar pour décider ensemble',null,2,'entente +2')}}
 if(L.length)menuCtx(X,Y,n,L)}
addEventListener('click',e=>{const r=e.target.closest&&e.target.closest('.besR');if(!r||!CV.on)return;e.stopPropagation();besoinMenu(r.dataset.bes,e.clientX,e.clientY)},true);
// un camp attaqué : l'alerte fait briller « Repos » pour lever tout le monde
{const md=modal;modal=function(){const r=md.apply(this,arguments);try{if(S&&S.evq&&/^bat/.test(S.evq[0]||''))S.alerteCamp=1}catch(e){}return r}}

// ---------- les fenêtres d'événement ne bloquent plus l'automatique : un temps de lecture, puis le choix du conte ----------
{const st=document.createElement('style');st.textContent='#evMin{height:4px;background:rgba(0,0,0,.15);margin:0 0 8px;border-radius:2px;overflow:hidden}#evMin i{display:block;height:4px;background:#b8862e;width:0}#evMinT{font-size:11px;opacity:.7;margin:-4px 0 6px}';document.head.appendChild(st)}
{let cle=null,t0=0,dur=0,survol=0;addEventListener('pointermove',e=>{const m=$('modal');survol=!!(m&&!m.hidden&&e.target.closest&&e.target.closest('#modal .carte'))},true);
 setInterval(()=>{const m=$('modal');if(!S||!m||m.hidden||!S.evq||!S.evq.length){cle=null;return}
  if(evDecisif(S.evq[0])){const b=$('evMin');if(b)b.remove();const bt=$('evMinT');if(bt)bt.remove();const inn=m.querySelector('.carte .in');if(inn&&!$('evDec'))inn.insertAdjacentHTML('afterbegin','<div id="evDec" style="background:#e8be5a;color:#2a2218;padding:4px 8px;border-radius:4px;margin:0 0 8px;font:600 13px system-ui">Ce choix décide du cours de l’histoire : le conte vous attend.</div>');cle=null;return}
  const k=S.evq[0]+'|'+S.evq.length+'|'+(S.year||0);if(k!==cle){cle=k;t0=performance.now();const tx=(m.innerText||'').length;dur=Math.max(9000,Math.min(26000,5000+tx*45))}
  if(survol)t0+=250;const u=Math.min(1,(performance.now()-t0)/dur),inn=m.querySelector('.carte .in');if(inn&&!$('evMin')){inn.insertAdjacentHTML('afterbegin','<div id="evMin"><i></i></div><div id="evMinT">Le jeu continue seul : le conte choisira à la fin du trait. Survolez pour prendre le temps de lire.</div>')}
  const bar=m.querySelector('#evMin i');if(bar)bar.style.width=Math.round(u*100)+'%';
  if(u>=1){cle=null;const b=m.querySelector('.op.conte')||[...m.querySelectorAll('.op')].find(x=>!x.disabled);if(b)b.click()}},250)}

// un choix décisif : une option suit l'histoire réelle, une autre ouvre l'utopie. Lui seul attend le joueur ; le conte reprend ensuite.
function evDecisif(id){try{const e=EV[id];if(!e)return false;const O=optsDe(id,e)||[];return O.some(o=>/utopie/i.test((o.n||'')+' '+(o.d||'')))||(O.length>1&&O.some(o=>o.hist)&&O.some(o=>!o.hist))}catch(x){return false}}
{let mainT=0;addEventListener('pointerdown',e=>{if(e.target.closest&&e.target.closest('#modal .op'))mainT=performance.now()},true);addEventListener('keydown',()=>{if($('modal')&&!$('modal').hidden)mainT=performance.now()},true);
 const ch=choisir;choisir=function(id,k){if(evDecisif(id)&&performance.now()-mainT>1500)return;const r=ch.apply(this,arguments);if(evDecisif(id)&&modeHist()&&S&&!S.fin){setTimeout(()=>{if(!S.evq.length||!evDecisif(S.evq[0])){S.autoD=1;if(typeof grace!=='undefined')grace=performance.now()+3000;if(typeof autoBtn==='function')autoBtn()}},400)}return r}}
