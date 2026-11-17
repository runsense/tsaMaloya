
// ===== Jeu : la vie du camp en trois zones. À droite les acteurs, en bas le camp et ce qui est en cours, en bas à gauche les enfants =====
{const st=document.createElement('style');st.textContent=
 '#cvZone{flex:1;min-width:0;position:relative;display:flex}#cvZone #cvC{flex:1}'+
 '#cvBas{position:absolute;left:8px;right:8px;bottom:8px;z-index:3;display:flex;gap:8px;pointer-events:none;max-height:34%}'+
 '#cvBas>div{pointer-events:auto;background:rgba(20,17,13,.88);border:1px solid #3a3226;border-radius:8px;padding:6px 8px;overflow-y:auto;font-size:12px}'+
 '#cvEnf{width:26%;min-width:150px}#cvCamp{flex:1}#cvBas h4{margin:0 0 4px;font-size:12px;color:#e8be5a;font-weight:600}'+
 '#cvBas .ch{display:inline-block;border:1px solid #3a3226;border-radius:12px;padding:1px 7px;margin:2px;cursor:pointer;white-space:nowrap}#cvBas .ch.sel{border-color:#e8be5a}'+
 '#cvBas .pc{border:1px solid #3a3226;border-radius:6px;padding:4px 6px;margin:4px 0}#cvBas button{font-size:11px;padding:2px 6px;margin:2px 2px 0 0}'+
 '#cvL .ac{display:flex;justify-content:space-between;gap:6px;align-items:baseline;padding:5px 6px;border:1px solid #3a3226;border-radius:6px;margin-bottom:4px;cursor:pointer}#cvL .ac.sel{border-color:#e8be5a}#cvL .ac small{color:#b9ab90;text-align:right}'+
 '#cvL .ac.eq{background:rgba(232,190,90,.12)}@media(max-width:760px){#cvBas{max-height:45%;flex-direction:column}#cvEnf{width:auto}}';document.head.appendChild(st)}
function cvZones(){const b=document.querySelector('#campV .cvb');if(!b||$('cvZone'))return;const cv=$('cvC');const z=document.createElement('div');z.id='cvZone';b.insertBefore(z,cv);
 if(typeof P3!=='undefined'&&P3.cv&&P3.cv.parentElement===b)z.appendChild(P3.cv);z.appendChild(cv);
 const bas=document.createElement('div');bas.id='cvBas';bas.innerHTML='<div id="cvEnf"></div><div id="cvCamp"></div>';z.appendChild(bas)}
{const co=cvOuvrir;cvOuvrir=function(ci){co(ci);if(CV.on&&!modeHist()){cvZones();cvListe()}}}
CV.eq=CV.eq||{};
function tacheTxt(p){if(enGrp(p))return 'dehors';if(p.id===S.garde)return 'garde';const t=tacheDe(p);return (TACHES[t]?TACHES[t][1]:t)||'au repos'}
{const cl=cvListe;cvListe=function(){cl();if(!S||!CV.on||modeHist()||!grpOn())return;cvZones();const d=$('cvL'),E=$('cvEnf'),K=$('cvCamp');if(!d||!E||!K)return;
 const P=(S.pp||[]).filter(p=>campDe(p)===CV.camp),ad=P.filter(adulte),en=P.filter(p=>!adulte(p)),sel=CV.selP!=null?ppId(CV.selP):null;
 // ce qui concerne tout le camp descend dans la zone du bas
 const bl=[...d.children].filter(x=>!(x.matches&&x.matches('[data-pid]'))&&!/Fermer la fiche|Toute la liste/.test(x.textContent||'')&&!(x.classList&&x.classList.contains('ph')));
 const garde=sel&&d.querySelector('.pc[data-pid="'+sel.id+'"]');
 // à droite : les acteurs, une ligne chacun ; la fiche s'ouvre au toucher
 const fiche=sel&&adulte(sel)&&garde?garde:null;
 d.innerHTML='';const tete=document.createElement('p');tete.className='note';tete.style.margin='0 0 6px';tete.textContent=ad.length+' adultes · bras libres : '+S.bras+(Object.keys(CV.eq).length?' · équipe : '+Object.keys(CV.eq).length:'');d.appendChild(tete);
 if(fiche){const r=document.createElement('button');r.className='bt sec';r.textContent='← Tous les acteurs';r.onclick=()=>{CV.selP=null;cvListe()};d.appendChild(r);d.appendChild(fiche);
  if(!enGrp(sel)&&sel.id!==S.garde){const b=document.createElement('button');b.className='bt'+(CV.eq[sel.id]?' sec':'');b.textContent=CV.eq[sel.id]?'Retirer de l’équipe':'＋ Mettre dans l’équipe de sortie';b.onclick=()=>{if(CV.eq[sel.id])delete CV.eq[sel.id];else CV.eq[sel.id]=1;cvListe()};fiche.appendChild(b)}}
 else ad.forEach(p=>{const r=document.createElement('div');r.className='ac'+(CV.selP===p.id?' sel':'')+(CV.eq[p.id]?' eq':'');r.dataset.pid=p.id;r.innerHTML='<span>'+(p.role&&ROLES[p.role]?ROLES[p.role].ic+' ':'')+'<b>'+p.n.split(' ')[0]+'</b> <small>'+ageP(p)+' ans</small></span><small>'+tacheTxt(p)+'</small>';r.onclick=()=>{CV.selP=p.id;const a=CV.A[p.id];if(a){a.say=cvDit(p,a);a.sayT=180}cvListe()};d.appendChild(r)});
 // en bas à gauche : les enfants qui restent au camp
 E.innerHTML='<h4>Les enfants au camp ('+en.length+')</h4>'+(en.length?en.map(p=>'<span class="ch'+(CV.selP===p.id?' sel':'')+'" data-en="'+p.id+'">'+p.n.split(' ')[0]+' · '+ageP(p)+' ans <small>'+tacheTxt(p)+'</small></span>').join(''):'<small>Aucun enfant.</small>');
 E.querySelectorAll('[data-en]').forEach(x=>x.onclick=()=>{const p=ppId(+x.dataset.en);CV.selP=p.id;const a=CV.A[p.id];if(a){a.say=cvDit(p,a);a.sayT=180}cvListe()});
 if(sel&&!adulte(sel)){const c=document.createElement('div');c.className='pc';c.innerHTML='<b>'+sel.n+'</b> · '+ageP(sel)+' ans<br><small>'+tacheTxt(sel)+'. Il apprend en regardant les grands.</small>';E.appendChild(c)}
 // en bas : le camp, ce qui est en cours, l'équipe de sortie
 const cpt={};ad.filter(p=>!enGrp(p)).forEach(p=>{const t=tacheTxt(p);cpt[t]=(cpt[t]||0)+1});
 const G=(S.grp||[]).filter(g=>g.exp);const eq=Object.keys(CV.eq).map(Number).map(ppId).filter(p=>p&&!enGrp(p));CV.eq={};eq.forEach(p=>CV.eq[p.id]=1);
 K.innerHTML='<h4>'+(S.voieC?'L’habitation':'Le camp')+' · vivres '+Math.round((S.vivres||0)*10)/10+(S.faimJ?' · <span style="color:#e87b5a">faim depuis '+S.faimJ+' j</span>':'')+'</h4><small>En ce moment : '+Object.keys(cpt).map(k=>cpt[k]+' '+k).join(' · ')+'</small>'+
  (G.length?'<div class="pc"><b>Dehors</b><br>'+G.map(g=>'<small>'+(typeof expDit==='function'?expDit(g):g.n)+'</small>').join('<br>')+'</div>':'')+
  '<div class="pc"><b>Équipe de sortie</b> <small>'+(eq.length?eq.map(p=>p.n.split(' ')[0]).join(', '):'touchez un acteur à droite, puis « Mettre dans l’équipe »')+'</small><br><button class="bt" id="cvPart"'+(eq.length?'':' disabled')+'>Préparer la sortie</button>'+(eq.length?'<button class="bt sec" id="cvVide">Vider</button>':'')+'</div>';
 bl.forEach(x=>{const t=(x.textContent||'').trim();if(!t||/Touchez quelqu|Tout le monde/.test(t))return;if(fiche&&/^Ordres pour|^Île sœur/.test(t)){d.appendChild(x);return}K.appendChild(x)});
 const pt=$('cvPart');if(pt)pt.onclick=()=>{if(!eq.length)return;window.EXPS=window.EXPS||{coche:{},prov:2,but:'chasse'};EXPS.coche={};eq.forEach(p=>EXPS.coche[p.id]=1);CV.eq={};const c=CV.camp;cvFermer();if(typeof expPlan==='function')expPlan(c,null)};
 const vd=$('cvVide');if(vd)vd.onclick=()=>{CV.eq={};cvListe()}}}
// le guide suit la nouvelle disposition, et se place en haut pour ne pas cacher le bas de l'écran
{const g1=GUIDE[0],gR=GUIDE[2],gT=GUIDE[3],gF=GUIDE[GUIDE.length-1];
 GUIDE.splice(0,GUIDE.length,g1,
  {t:()=>'À droite, vos acteurs. Touchez-en un : sa fiche s’ouvre, avec ce qu’il sait faire et ce qu’il peut apprendre.',ok:()=>CV.selP!=null&&!!ppId(CV.selP),auto:()=>{const p=gensCamp().filter(adulte).find(p=>p.id!==S.garde);if(p){CV.selP=p.id;if(CV.on)cvListe()}}},
  gR,
  {t:()=>'Mettez-le dans l’équipe de sortie, puis « Préparer la sortie » en bas : choisissez qui part et où, sur la carte.',ok:()=>(S.grp||[]).length>0,auto:()=>{const p=(S.pp||[]).find(p=>adulte(p)&&p.role&&!enGrp(p)&&p.id!==S.garde);if(p)envoyer(p)}},
  gT,
  {t:()=>'Dehors, le groupe avance seul. Touchez-le sur la carte pour voir ce qu’il fait, ou lui donner une autre destination.',ok:()=>(S.grp||[]).some(g=>g.exp&&(g.exp.j||0)>=2),auto:null},
  gF)}
{const gt=guideTick;guideTick=function(){gt();const b=$('guideJ');if(b&&!b.classList.contains('pose106')&&!b._cib){if(CV.on){b.style.top='80px';b.style.bottom='auto'}else{b.style.top='auto';b.style.bottom='110px'}}}}
// jeu ou conte, jamais les deux en même temps : quand un récit s'ouvre, le camp s'efface derrière lui, puis revient
{const st=document.createElement('style');st.textContent='body.enConte #campV,body.enConte #guideJ,body.enConte #cvBas{visibility:hidden}body.enConte::before{content:"";position:fixed;inset:0;background:#0d0b08;z-index:55}body.enConte #modal{z-index:80}';document.head.appendChild(st);
 setInterval(()=>{const m=$('modal');const on=!!(S&&!modeHist()&&grpOn()&&m&&!m.hidden);document.body.classList.toggle('enConte',on)},250)}
