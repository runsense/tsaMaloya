
// ===== p115 : la Vie n'est pas l'Histoire =====
// En Vie, on ne revoit pas le conte : on sait vers où va l'histoire, et l'on voit seulement les grandes étapes qui touchent le camp.
// Au lancement (même en 1794, en utopie) : pas d'onglets qui s'ouvrent seuls, pas d'écrans de vote ou de choix ;
// les rôles et le chef se règlent d'eux-mêmes, puis une seule carte : comment jouer en Vie.
const V115={t0:0,act:0};
['pointerdown','keydown','wheel'].forEach(ev=>addEventListener(ev,()=>{V115.act=performance.now()},true));
function vie115(){return typeof S!=='undefined'&&S&&!S.fin&&!modeHist()&&!(typeof K!=='undefined'&&K)}
function init115(){return vie115()&&S.init115!==2}
// 1. le lancement : rôles et chef réglés sans écran, première expédition laissée au joueur
{const nv=nouvelle;nouvelle=function(){const r=nv.apply(this,arguments);try{if(vie115()){S.init115=1;S.exp1='fait';V115.t0=performance.now()}}catch(e){}return r}}
setInterval(()=>{try{if(!vie115()||!S.init115||performance.now()-V115.t0>30000)return;const d=$('cons87');if(d){d.style.visibility='hidden';const B=[...d.querySelectorAll('button')].filter(b=>!b.disabled);const b=B.find(b=>/^(Valider|Laisser voter|Laisser le conseil|C’est décidé|D’accord|Continuer|Commencer|Fermer)/.test(b.textContent.trim()))||B.find(b=>b.id==='rolOk')||(d.querySelector('#rolOk')?null:B[0]);if(b)b.click();return}
 if(S.init115===1&&performance.now()-V115.t0>4000&&S.cons87&&!$('cons87')){S.init115=2;fermerOnglet&&fermerOnglet();comment115()}}catch(e){}},300);
// pas d'onglet qui s'ouvre tout seul en Vie (seulement quand le joueur le demande)
{const dr=drawer;drawer=function(){try{if(vie115()&&onglet&&performance.now()-V115.act>1500){onglet=null;document.querySelectorAll('.tab[data-t]').forEach(x=>x.classList.remove('on'));const d=$('drawer');if(d)d.hidden=true;return}}catch(e){}return dr.apply(this,arguments)}}
// 2. les récits : en Vie, ils ne s'ouvrent plus. Les grandes étapes passent en bandeau, le reste va au journal ; le conte choisit.
const MAJ115=/abol|1848|1794|esclavage|Anglais|cyclone|guerre|indépend|départ|Napoléon|Révolution|Compagnie|gouverneur|utopie|uchronie/i;
function etape115(e,id){try{return (typeof evDecisif==='function'&&evDecisif(id))||MAJ115.test((e.t||'')+' '+(e.an||''))}catch(x){return false}}
function bandeau115(an,t,v){let d=$('etape115');if(d)d.remove();d=document.createElement('div');d.id='etape115';d.innerHTML='<small>Grande étape · '+an+'</small><b>'+t+'</b>'+(v?'<span>'+v+'</span>':'');d.onclick=()=>d.remove();document.body.appendChild(d);setTimeout(()=>{if(d.isConnected)d.classList.add('out');setTimeout(()=>d.remove(),600)},7000)}
{const md=modal;modal=function(){try{if(vie115()&&S.evq&&S.evq.length){const id=S.evq[0],e=EV[id];if(e&&['Archive','Conte','Mythe','Mémoire'].includes(e.tag)){const m=$('modal');if(m)m.hidden=true;
  const t=(()=>{try{return e.t}catch(x){return id}})(),an=e.an||String(S.year),v=(()=>{try{return e.v||''}catch(x){return ''}})();let k=0;try{k=choixConte(e,id)}catch(x){}
  const da=window.decAuto;window.decAuto=1;try{choisir(id,k)}catch(x){S.evq.shift();S.done[id]=1}window.decAuto=da;
  let on='';try{on=optsDe(id,e)[k].n}catch(x){}if(etape115(e,id))bandeau115(an,t,on?'Le cours des choses : '+on:v);else try{journal(an+' · '+t+(on?' — '+on:''))}catch(x){}
  try{rafraichir()}catch(x){}setTimeout(()=>{try{modal()}catch(x){}},50);return}}}catch(x){}return md.apply(this,arguments)}}
// 3. comment jouer en Vie : une seule carte, au début
function comment115(){if($('comm115'))return;const C=S.voieC;const d=document.createElement('div');d.id='comm115';
 d.innerHTML='<div class="c115"><small>Vie · comment jouer</small><h2>'+(C?'Votre habitation':'Votre camp')+' vit en temps réel</h2><ul>'+
 '<li><b>La carte</b> : l’île et ce que vous connaissez. Zoomez sur '+(C?'l’habitation':'le camp')+' (ou <kbd>Entrée</kbd>) pour y entrer.</li>'+
 '<li><b>Dans '+(C?'l’habitation':'le camp')+'</b> : touchez quelqu’un pour lui donner une tâche ; les besoins en bas montrent ce qui manque (touchez une ligne pour agir).</li>'+
 '<li><b>Dehors</b> : clic droit sur un lieu de la carte pour chasser, cueillir, explorer.</li>'+
 '<li><b>Le temps</b> passe seul : <kbd>Espace</kbd> pour l’arrêter ou le reprendre.</li>'+
 '<li><b>L’histoire</b> avance autour de vous : seules les grandes étapes s’affichent en haut ; le reste va au journal.</li></ul>'+
 '<p><kbd>H</kbd> à tout moment : les commandes.</p><button class="bt" id="comm115ok">Jouer</button></div>';document.body.appendChild(d);
 const f=()=>{d.remove();try{if(typeof chronoP!=='undefined')chronoP=0}catch(e){}};d.querySelector('#comm115ok').onclick=f;try{chronoP=1}catch(e){}}
{const st=document.createElement('style');st.textContent='#etape115{position:fixed;left:50%;top:86px;transform:translateX(-50%);z-index:9400;background:#1e1912;color:#f0e6d0;border:1px solid #e8be5a;border-left:5px solid #e8be5a;border-radius:8px;padding:8px 14px;max-width:min(560px,92vw);font:13px system-ui;display:flex;flex-direction:column;gap:2px;box-shadow:0 6px 20px #0008;cursor:pointer;transition:opacity .6s}#etape115.out{opacity:0}#etape115 small{color:#e8be5a;letter-spacing:.06em;text-transform:uppercase;font-size:10px}#etape115 b{font:600 16px Alegreya,Georgia,serif}#etape115 span{opacity:.8}'+
 '#comm115{position:fixed;inset:0;z-index:9450;display:flex;align-items:center;justify-content:center;background:rgba(10,8,6,.5)}#comm115 .c115{background:#1e1912;color:#f0e6d0;border:1px solid #e8be5a;border-radius:12px;padding:20px 24px;max-width:540px;width:calc(100% - 32px);font:14px/1.45 system-ui}#comm115 small{color:#e8be5a;text-transform:uppercase;letter-spacing:.08em}#comm115 h2{margin:4px 0 10px;font-family:Alegreya,Georgia,serif}#comm115 li{margin:6px 0}#comm115 kbd{padding:1px 6px;border:1px solid #e8be5a;border-bottom-width:2px;border-radius:4px;font-size:12px}#comm115 .bt{float:right}';document.head.appendChild(st)}
