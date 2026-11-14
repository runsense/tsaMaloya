// ===== p34 : la carte des destinations ne bloque plus — la raison d'un refus s'affiche en grand, et l'on peut revenir à la grande carte =====
{const st=document.createElement('style');st.textContent='#toast{z-index:300!important}#ccErr{background:#7a2a1e;color:#fff;border:2px solid #e87b5a;border-radius:6px;padding:8px 12px;font:600 15px system-ui;margin:4px 0 8px}@keyframes ccS{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}.ccShake{animation:ccS .3s 2}';document.head.appendChild(st)}
{const cc=carteConnu;carteConnu=function(o){cc(o);const box=$('ccBox');if(!box)return;o=o||{};const cv=$('ccC'),inn=box.querySelector('.pjb');
 const err=document.createElement('div');err.id='ccErr';err.hidden=true;$('ccI').insertAdjacentElement('afterend',err);
 // revenir à la grande carte : la destination se choisit alors directement sur l'île en 3D
 const bar=$('ccX').parentElement,g=document.createElement('button');g.className='bt sec';g.textContent=o.mode==='dest'?'Choisir sur la grande carte':'Revenir à la grande carte';bar.insertBefore(g,$('ccX'));
 g.onclick=()=>{box.remove();if(o.mode==='dest'){panneau();toast('Touchez la destination sur la carte. Échap pour annuler.')}};
 // un refus : on le dit en grand, dans la carte même
 const oc=cv.onclick;cv.onclick=e=>{const t0=$('toast').textContent,h0=!$('toast').hidden;oc.call(cv,e);if(!$('ccBox'))return;const tt=$('toast'),m=(tt&&!tt.hidden&&(tt.textContent!==t0||!h0))?tt.textContent:'Ce lieu ne convient pas : choisissez une case claire, à portée du camp.';
  err.textContent='⚠️ '+m;err.hidden=false;inn.classList.remove('ccShake');void inn.offsetWidth;inn.classList.add('ccShake');clearTimeout(err._t);err._t=setTimeout(()=>err.hidden=true,6000)}}}
// Échap ferme la carte, et annule le choix de destination
addEventListener('keydown',e=>{if(e.key!=='Escape')return;const b=$('ccBox');if(b){e.preventDefault();e.stopPropagation();const x=$('ccX');if(x)x.click();else b.remove();return}if(window.choixExp&&!$('expP')){window.choixExp=null;panneau();toast('Sortie annulée.')}},true);

// ===== ceux qui dorment dehors : une petite lune qui clignote sur leur fiche ; la toucher bâtit une case, ou dit ce qui manque =====
{const st=document.createElement('style');st.textContent='@keyframes dhB{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.85)}}.dhIc{display:inline-block;margin-left:4px;cursor:pointer;animation:dhB 1.1s ease-in-out infinite;font-size:14px}';document.head.appendChild(st)}
function alerteSimple(titre,txt,actions){const b=document.createElement('div');b.style.cssText='position:fixed;inset:0;z-index:95;background:rgba(10,8,6,.6);display:flex;align-items:center;justify-content:center';
 b.innerHTML='<div class="pjb" style="max-width:440px;border:2px solid #e87b5a"><h2 style="color:#e87b5a">⚠️ '+titre+'</h2><p>'+txt+'</p><div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap" id="alA"></div></div>';document.body.appendChild(b);const A=b.querySelector('#alA');
 (actions||[]).concat([['Compris',()=>{}]]).forEach(([n,f],i,L)=>{const x=document.createElement('button');x.className='bt'+(i===L.length-1?'':' sec');x.textContent=n;x.onclick=()=>{b.remove();f()};A.appendChild(x)})}
function batirCase(){const ci=CV.camp,t=T[ci],c=BAT.case.c,cs=Object.entries(c).map(([r,v])=>v+' '+r).join(', ');
 if(S.bras>=1&&peut(c)){batir(t,'case');sauve();cvListe();toast('Une case de plus : '+(KCASE+(S.caseR||0))+' personnes de plus dormiront à l’abri.');return}
 const manq=[];if(!peut(c))manq.push(manque(c));if(S.bras<1)manq.push('un bras libre cette saison');
 const lib=(S.pp||[]).filter(p=>campDe(p)===ci&&adulte(p)&&!enGrp(p)&&p.id!==S.garde&&!['bois','paille'].includes(tacheDe(p))).sort((a,b)=>(a.fat||0)-(b.fat||0));
 alerteSimple('Impossible de bâtir une case','Une case demande '+cs+' et un bras. Il manque : '+manq.join(' et ')+'.',lib.length&&!peut(c)?[['Envoyer '+lib[0].n.split(' ')[0]+' chercher '+(((S.res.bois||0)<(c.bois||0))?'du bois':'de la paille'),()=>{const k=(S.res.bois||0)<(c.bois||0)?'bois':'paille';lib[0].tache=k;lib[0].lieu=null;sauve();cvListe()}]]:[])}
{const cl=cvListe;cvListe=function(){cl.apply(this,arguments);const d=$('cvL');if(!d||!CV.on||typeof logerCamp!=='function')return;const R=logerCamp(CV.camp);
 R.dehors.forEach(p=>{const f=d.querySelector('[data-pid="'+p.id+'"]');if(!f||f.querySelector('.dhIc'))return;const b=f.querySelector('b')||f;const ic=document.createElement('span');ic.className='dhIc';ic.textContent='🌙';ic.title='Dort dehors (santé '+Math.round(sante(p))+') : toucher pour bâtir une case';ic.onclick=e=>{e.stopPropagation();batirCase()};b.insertAdjacentElement('afterend',ic)})}}

// ===== les autres besoins de chacun, sur sa fiche : faim, soif, fatigue, maladie — et au seuil critique, ils y vont d'eux-mêmes =====
// la soif : si personne ne va puiser l'eau, elle monte jour après jour (moins en saison des pluies)
{const jt=jourTick;jourTick=function(){jt.apply(this,arguments);if(!S||modeHist()||S.fin)return;
 camps().forEach(c=>{const P=(S.pp||[]).filter(p=>campDe(p)===c.i&&!enGrp(p)),A=P.filter(adulte),eau=A.some(p=>tacheDe(p)==='eau');S.soif=S.soif||{};S.soif[c.i]=eau?0:(S.soif[c.i]||0)+(pluie()?.5:1);
  const libres=()=>A.filter(p=>p.id!==S.garde&&(p.fat||0)<70&&['bois','paille','pierre','repos'].includes(tacheDe(p))).sort((a,b)=>(a.fat||0)-(b.fat||0));
  if(S.soif[c.i]>=3){const p=libres()[0];if(p){p.tache='eau';p.lieu=null;journal(p.n.split(' ')[0]+' part puiser l’eau : personne ne l’avait fait depuis '+Math.floor(S.soif[c.i])+' jours.');dire(p,'J’ai soif, j’y vais.')}}
  if((S.faimJ||0)>=2){libres().slice(0,2).forEach(p=>{p.tache='cueil';p.lieu=null;journal(p.n.split(' ')[0]+' a trop faim : '+(p.g==='f'?'elle':'il')+' part cueillir.')})}})}}
function besoinsDe(p){const L=[],ci=campDe(p),f=p.fat||0;if(f>70)L.push(['😴',f>85?'Épuisé'+(p.g==='f'?'e':'')+' ('+Math.round(f)+' %) : il ira dormir de lui-même':'Fatigue '+Math.round(f)+' % : toucher pour l’envoyer dormir','rep',f>85]);
 if((S.faimJ||0)>0||(S.vivres||0)<P23vivJ())L.push(['🍲',(S.faimJ?'Faim depuis '+S.faimJ+' j':'Les vivres baissent')+' : toucher pour nourrir le camp','faim',(S.faimJ||0)>=2]);
 const so=(S.soif||{})[ci]||0;if(so>=1)L.push(['💧','Soif : personne ne puise l’eau depuis '+Math.floor(so)+' j — toucher pour '+(adulte(p)?'qu’'+(p.g==='f'?'elle':'il')+' y aille':'envoyer quelqu’un'),'soif',so>=3]);
 if(typeof sante==='function'&&sante(p)<45)L.push(['🤒','Santé '+Math.round(sante(p))+' : toucher pour les soins','soin',sante(p)<25]);return L}
function P23vivJ(){return Math.max(2,((S.pp||[]).length||1)*.3)}
{const st=document.createElement('style');st.textContent='.dhIc.crit{animation-duration:.5s;filter:drop-shadow(0 0 3px #e87b5a)}';document.head.appendChild(st)}
{const cl=cvListe;cvListe=function(){cl.apply(this,arguments);const d=$('cvL');if(!d||!CV.on)return;(S.pp||[]).filter(p=>campDe(p)===CV.camp&&!enGrp(p)).forEach(p=>{const f=d.querySelector('[data-pid="'+p.id+'"]');if(!f||f.querySelector('.bsIc'))return;const b=f.querySelector('b')||f;
 besoinsDe(p).reverse().forEach(([ic,ti,k,cr])=>{const s=document.createElement('span');s.className='dhIc bsIc'+(cr?' crit':'');s.textContent=ic;s.title=ti;s.onclick=e=>{e.stopPropagation();
  if(k==='rep'){if(adulte(p)){p.tache='repos';sauve();cvListe();toast(p.n.split(' ')[0]+' va dormir.')}}
  else if(k==='faim')besoinMenu('Manger',e.clientX,e.clientY);
  else if(k==='soin')besoinMenu('Soins',e.clientX,e.clientY);
  else if(k==='soif'){const q=adulte(p)&&p.id!==S.garde?p:(S.pp||[]).filter(x=>campDe(x)===CV.camp&&adulte(x)&&!enGrp(x)&&x.id!==S.garde).sort((a,b)=>(a.fat||0)-(b.fat||0))[0];if(q){q.tache='eau';q.lieu=null;sauve();cvListe();toast(q.n.split(' ')[0]+' va puiser l’eau.')}}};b.insertAdjacentElement('afterend',s)})})}}
