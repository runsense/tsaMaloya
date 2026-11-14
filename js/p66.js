// ===== p66 : Survie lisible pour un humain — on voit qui travaille où, on sait déplacer les gens, et un guide pas à pas =====
// 1) au-dessus de chaque lieu où travaillent vos gens : une étiquette (icône et nombre) ; un clic dessus ouvre la bulle du lieu
// 2) un bouton « Qui travaille où » : la liste de tous les postes, avec −5 / +5, pour déplacer les gens d'un lieu à l'autre
// 3) un guide en six étapes au début ; le temps reste arrêté tant qu'on n'a pas fait ses premiers gestes
function kActN(k){if(/^bat_/.test(k)){const b=KBAT[k.slice(4)];return b?[b.ic,b.n]:['🏠',k.slice(4)]}const a=KACT[k];return a?[a.ic,a.n]:['•',k]}
// ----- les étiquettes -----
function kEtiquettes(){let L=$('kEtq');const d=$('kons');if(!d||d.hidden||!K||K.vue!=='ville'||typeof KV3==='undefined'||!KV3.C||!KV3.cv){if(L)L.hidden=true;return}
 if(!L){L=document.createElement('div');L.id='kEtq';L.style.cssText='position:fixed;left:0;top:0;width:0;height:0;z-index:8300;pointer-events:none';document.body.appendChild(L)}L.hidden=false;
 const r=KV3.cv.getBoundingClientRect(),V=new THREE.Vector3(),vus=new Set();
 Object.entries(K.trav||{}).forEach(([i,a])=>{const t=T[+i];if(!t)return;const n=Object.values(a).reduce((s,v)=>s+v,0);if(!n)return;V.set(t.x,k3Y(t.x,t.z)+.5,t.z).project(KV3.C);if(V.z>1||Math.abs(V.x)>1.05||Math.abs(V.y)>1.05)return;
  const x=r.left+(V.x+1)/2*r.width,y=r.top+(1-V.y)/2*r.height;let e=L.querySelector('[data-et="'+i+'"]');
  if(!e){e=document.createElement('button');e.dataset.et=i;e.className='kEt';e.onclick=ev=>{ev.stopPropagation();KVUE.sel=+i;if(typeof kPanneau==='function')kPanneau();setTimeout(()=>kBulle(T[+i],ev.clientX,ev.clientY),30)};L.appendChild(e)}
  const txt=Object.entries(a).map(([k,v])=>kActN(k)[0]+' '+v).join('  ');if(e.textContent!==txt)e.textContent=txt;e.title=Object.entries(a).map(([k,v])=>v+' à « '+kActN(k)[1]+' »').join('\n')+'\nCliquez pour changer';
  e.style.transform='translate('+Math.round(x)+'px,'+Math.round(y)+'px) translate(-50%,-100%)';vus.add(i)});
 L.querySelectorAll('[data-et]').forEach(e=>{if(!vus.has(e.dataset.et))e.remove()})}
{const st=document.createElement('style');st.textContent='.kEt{position:absolute;left:0;top:0;pointer-events:auto;white-space:nowrap;font:600 12px Montserrat,system-ui,sans-serif;color:#1a1410;background:#e8be5a;border:0;border-radius:12px;padding:3px 9px;box-shadow:0 2px 8px rgba(0,0,0,.45);cursor:pointer}.kEt:hover{background:#ffd77a}'+
 '#kQui{position:fixed;right:70px;top:160px;z-index:8500;width:340px;max-height:72vh;overflow:auto;background:rgba(18,26,30,.95);border:1px solid #e8be5a;border-radius:10px;padding:10px 12px;color:#f0e6d0;font-size:13px}#kQui .l{display:flex;align-items:center;gap:6px;margin:3px 0}#kQui .l span{flex:1}#kQui .bt{padding:2px 8px;font-size:12px}'+
 '#kTuto{position:fixed;left:16px;bottom:96px;z-index:9100;max-width:440px;width:calc(100% - 32px);background:rgba(18,26,30,.96);border:2px solid #e8be5a;border-radius:12px;padding:12px 16px;color:#f0e6d0;font-size:15px;box-shadow:0 10px 40px rgba(0,0,0,.6)}#kTuto small{color:#e8be5a;letter-spacing:.08em;text-transform:uppercase;font-weight:600}#kTuto .r{display:flex;justify-content:space-between;align-items:center;margin-top:8px}'+
 '.kLueur{outline:3px solid #e8be5a;outline-offset:3px;animation:kLu 1.2s ease-in-out infinite}@keyframes kLu{50%{outline-color:rgba(232,190,90,.2)}}';document.head.appendChild(st)}
setInterval(()=>{try{if(typeof K!=='undefined'&&K)kEtiquettes();else{const L=$('kEtq');if(L)L.hidden=true}}catch(e){}},120);
// ----- qui travaille où -----
function kQui(){let q=$('kQui');if(q){q.remove();return}q=document.createElement('div');q.id='kQui';document.body.appendChild(q);['pointerdown','click'].forEach(ev=>q.addEventListener(ev,e=>e.stopPropagation()));kQuiDess()}
function kQuiDess(){const q=$('kQui');if(!q)return;const C=KCLS[K.joueur==='c'?'c':'m'],P=kPools(),O=kOccCls();
 q.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center"><b>Qui travaille où</b><button class="bt sec" id="kQuiX">✕</button></div><p class="note" style="margin:4px 0 8px">Pour déplacer des gens : −5 là où ils sont, puis +5 là où vous les voulez. Le nom du lieu ouvre sa bulle.</p>'+
  Object.entries(K.trav||{}).map(([i,a])=>'<div style="margin:6px 0;border-top:1px solid rgba(232,190,90,.25);padding-top:4px"><a href="#" data-qi="'+i+'" style="color:#e8be5a;font-weight:600">'+(typeof kLieu==='function'?kLieu(T[+i]):'Lieu '+i)+'</a>'+
   Object.entries(a).map(([k,v])=>'<div class="l"><span>'+kActN(k).join(' ')+'</span><button class="bt sec" data-qm="'+i+'|'+k+'">−5</button><b style="min-width:22px;text-align:center">'+v+'</b><button class="bt" data-qp="'+i+'|'+k+'">+5</button></div>').join('')+'</div>').join('')+
  '<div style="margin-top:8px;font-size:12px;opacity:.9">'+Object.keys(C).filter(k=>k!=='maitre').map(k=>C[k].ic+' '+C[k].n+' : <b>'+Math.max(0,(P[k]||0)-(O[k]||0))+'</b> libres / '+(P[k]||0)).join('<br>')+'</div>';
 $('kQuiX').onclick=()=>q.remove();
 q.querySelectorAll('[data-qm]').forEach(b=>b.onclick=()=>{const [i,k]=b.dataset.qm.split('|');kMettre(+i,k,-5);kSauve();kRendu();kQuiDess()});
 q.querySelectorAll('[data-qp]').forEach(b=>b.onclick=()=>{const [i,k]=b.dataset.qp.split('|');kMettre(+i,k,5);kSauve();kRendu();kQuiDess()});
 q.querySelectorAll('[data-qi]').forEach(a=>a.onclick=e=>{e.preventDefault();const i=+a.dataset.qi,t=T[i];KVUE.sel=i;if(typeof KV3!=='undefined')KV3.tg.set(t.x,k3Y(t.x,t.z),t.z);if(typeof kPanneau==='function')kPanneau();const r=a.getBoundingClientRect();setTimeout(()=>kBulle(t,r.left-360,r.top),40)})}
function kQuiBouton(){const d=$('kons');if(!d||d.hidden)return;let b=$('kQuiB');if(!b){b=document.createElement('button');b.id='kQuiB';b.className='bt';b.style.cssText='position:fixed;right:70px;top:118px;z-index:8400;font-size:12px;padding:5px 12px';b.onclick=kQui;document.body.appendChild(b)}
 b.hidden=false;const tot=Object.values(K.trav||{}).reduce((s,a)=>s+Object.values(a).reduce((x,y)=>x+y,0),0);b.textContent='👥 Qui travaille où · '+tot}
setInterval(()=>{try{const d=$('kons');if(!d||d.hidden||typeof K==='undefined'||!K){const b=$('kQuiB');if(b)b.hidden=true;const q=$('kQui');if(q)q.remove();return}kQuiBouton()}catch(e){}},500);
// ----- le guide -----
const KGUIDE=[
 {t:'Bienvenue. Ici, vous ne dirigez pas les gens un par un : vous décidez où ils travaillent et ce qu’on bâtit. Le temps est arrêté tant que vous ne l’avez pas lancé.',ok:()=>true,bt:'Commencer'},
 {t:'Cliquez sur votre habitation, au centre de la ville (l’étiquette dorée montre combien de gens y travaillent déjà).',ok:()=>KVUE.sel!=null&&!!$('kBul')&&!$('kBul').hidden,cible:'.kEt'},
 {t:'La bulle montre ce qu’on peut faire ici. Envoyez du monde sur une tâche : « +5 » ou « Remplir ». Une tâche sans personne ne rapporte rien.',ok:s=>JSON.stringify(K.trav)!==s.trav,cible:'#kBul [data-tp]'},
 {t:'Pour déplacer des gens : « −5 » là où ils sont, « +5 » là où vous les voulez. La liste « Qui travaille où », en haut à droite, montre tout d’un coup.',ok:()=>true,bt:'Compris',cible:'#kQuiB'},
 {t:'Pour bâtir : la barre en bas (Habiter, Exploiter, Stocker…). Choisissez, puis cliquez un lieu en surbrillance. Un bâtiment sans travailleurs reste vide.',ok:s=>Object.values(K.b).reduce((n,L)=>n+L.length,0)>s.nb,bt:'Plus tard',cible:'#kbp'},
 {t:'Lancez le temps : ▶ en haut. Chaque mois dure 20 secondes. Au centre, la réserve de vivres : sous un an, la tension monte. Le conseil se réunit tous les six mois.',ok:()=>KV.vit>0,cible:'[data-vit="1"]'}];
function kGuide(){if(!K||K.guideF||K.fin)return;const d=$('kons');if(!d||d.hidden||$('kReg')||$('kCoB'))return;K.guideE=K.guideE||0;const E=KGUIDE[K.guideE];if(!E){K.guideF=1;const g=$('kTuto');if(g)g.remove();kSauve();return}
 if(!K.guideS||K.guideS.e!==K.guideE)K.guideS={e:K.guideE,trav:JSON.stringify(K.trav),nb:Object.values(K.b).reduce((n,L)=>n+L.length,0)};if(K.guideE<5&&KV.vit)KV.vit=0;
 let g=$('kTuto');if(!g){g=document.createElement('div');g.id='kTuto';document.body.appendChild(g)}
 const cle=K.guideE+'';if(g.dataset.e!==cle){g.dataset.e=cle;g.innerHTML='<small>Comment jouer · '+(K.guideE+1)+' / '+KGUIDE.length+'</small><div style="margin-top:4px">'+E.t+'</div><div class="r"><button class="bt sec" id="kTuQ">Passer le guide</button>'+(E.bt?'<button class="bt" id="kTuN">'+E.bt+'</button>':'<span class="note">… à vous</span>')+'</div>';
  $('kTuQ').onclick=()=>{K.guideF=1;g.remove();document.querySelectorAll('.kLueur').forEach(e=>e.classList.remove('kLueur'));kSauve()};const n=$('kTuN');if(n)n.onclick=()=>{K.guideE++;kGuide()}}
 document.querySelectorAll('.kLueur').forEach(e=>e.classList.remove('kLueur'));if(E.cible){const c=document.querySelector(E.cible);if(c)c.classList.add('kLueur')}
 if(!E.bt&&E.ok(K.guideS)){K.guideE++;setTimeout(kGuide,600)}else if(E.bt&&K.guideE===5&&E.ok(K.guideS)){K.guideE++;kGuide()}}
setInterval(()=>{try{if(typeof K!=='undefined'&&K)kGuide()}catch(e){}},400);
// pendant le guide, le conseil attend
{const co=kConseilOuvre;kConseilOuvre=function(){if(K&&!K.guideF)return;return co.apply(this,arguments)}}
// ----- sur l'île, rezoomer ramène dans la dernière ville ouverte (et l'ouvre) -----
addEventListener('wheel',e=>{try{const d=$('kons');if(!d||d.hidden||typeof K==='undefined'||!K||K.vue!=='ile'||e.deltaY>=0||e.target.tagName!=='CANVAS'||!d.contains(e.target))return;
 if(!(K.col||[]).length)return;e.preventDefault();e.stopImmediatePropagation();K.vue='ville';K.cur=Math.min(K.cur||0,K.col.length-1);KVUE.sel=null;if(typeof KV3!=='undefined'){const t=T[K.col[K.cur].i];KV3.tg.set(t.x,k3Y(t.x,t.z),t.z);KV3.dist=Math.max(CADRE.k3min+2,12)}kRendu()}catch(_){}},{capture:true,passive:false});
// ----- plus de bras libres : l'étiquette « Qui travaille où » et celles des lieux clignotent deux fois en rouge -----
{const st=document.createElement('style');st.textContent='@keyframes kRg{0%,100%{background:#e8be5a}25%,75%{background:#e8503a;color:#fff}}.kRouge{animation:kRg .45s ease-in-out 2}';document.head.appendChild(st)}
function kAlerteBras(){[$('kQuiB'),...document.querySelectorAll('.kEt')].forEach(e=>{if(!e)return;e.classList.remove('kRouge');void e.offsetWidth;e.classList.add('kRouge')})}
{const km=kMettre;kMettre=function(i,act,d){const avant=JSON.stringify(K.trav||{});const r=km.apply(this,arguments);try{if(d>0&&JSON.stringify(K.trav||{})===avant)kAlerteBras();else if(d>0&&typeof kLibres==='function'&&kLibres()<=0)kAlerteBras()}catch(e){}return r}}
