// ===== p21 : la souris partout, rien qui défile, la Construction en vraie carte =====

// --- Dans le camp : clic droit sur un lieu (feu, réserve, jardin, cases…) = ce qu'on y fait ---
const CVLT={feu:['Le feu',['cuisine']],reserve:['La réserve',['cuisine','garde']],jardin:['Le jardin',['cueil']],garde:['Le poste de garde',['garde']],sortie:['La sortie du camp',['chasse','cueil']],bois:['Le bois',['bois','paille']],eau:['La source',['eau']],foyer:['Le foyer des soins',['soin']],case:['Une case',['repos']]};
function cvLieuSous(X,Y){const cv=$('cvC');if(!cv||!CV.on)return null;const r=cv.getBoundingClientRect(),x=(X-r.left)/r.width,y=(Y-r.top)/r.height;if(x<0||x>1||y<0||y>1)return null;const {L}=cvLieux();let best=null,bd=.07;
 Object.keys(L).forEach(k=>{if(k==='cases')return;const d=Math.hypot(L[k][0]-x,(L[k][1]-y)*.7);if(d<bd){bd=d;best=k}});L.cases.forEach(c=>{const d=Math.hypot(c[0]-x,(c[1]-y)*.7);if(d<bd){bd=d;best='case'}});return best}
function cvLieuMenu(X,Y,k){const D=CVLT[k];if(!D)return;const ci=CV.camp,P=(S.pp||[]).filter(p=>campDe(p)===ci&&adulte(p)&&!enGrp(p)),p=CV.selP!=null?ppId(CV.selP):null,L=[];
 const ici=P.filter(q=>D[1].includes(q.tache));L.push([(ici.length?'Ici : '+ici.slice(0,4).map(q=>q.n).join(', ')+(ici.length>4?'…':''):'Personne ne travaille ici'),()=>{}]);
 D[1].forEach(t=>{if(!TACHES[t])return;if(p&&adulte(p))L.push(['▸ '+p.n+' : '+TACHES[t][0],()=>{p.tache=t;sauve();cvListe()}]);
  const lib=P.filter(q=>!q.tache||q.tache==='repos').sort((a,b)=>(a.fat||0)-(b.fat||0))[0];if(lib&&t!=='repos')L.push(['▸ Envoyer '+lib.n+' : '+TACHES[t][0],()=>{lib.tache=t;sauve();cvListe()}])});
 if(ici.length&&!D[1].includes('repos'))L.push(['▸ Tout le monde ici se repose',()=>{ici.forEach(q=>q.tache='repos');sauve();cvListe()}]);
 menuCtx(X,Y,D[0],L)}

// --- Rien ne défile : les panneaux se resserrent pour tout montrer. Seuls les menus ouverts depuis la carte gardent un défilement ---
const FITS='#side,#drawer,#cvL,#infoJ,#kA,.pja,#ecran .bloc,#modal .carte,.bp';
function ajuste(el){if(!el||!el.isConnected||!el.clientHeight)return;if(el._fz&&el._fz[0]===el.scrollHeight&&el._fz[1]===el.clientHeight&&el._fz[2]===el.childElementCount)return;const K=[...el.children];K.forEach(c=>c.style.zoom='');el.style.overflowY='';
 if(el.scrollHeight<=el.clientHeight+2){el._fz=[el.scrollHeight,el.clientHeight,el.childElementCount];return}let z=Math.max(.62,el.clientHeight/el.scrollHeight*.99);for(let n=0;n<4;n++){K.forEach(c=>c.style.zoom=z);if(el.scrollHeight<=el.clientHeight+2||z<=.62)break;z=Math.max(.62,z-.05)}
 if(el.scrollHeight<=el.clientHeight+2)el.style.overflowY='hidden';el._fz=[el.scrollHeight,el.clientHeight,el.childElementCount]}
{let att=0;const tout=()=>{att=0;const kv=$('kons')&&!$('kons').hidden;(kv?[$('kA')]:[...document.querySelectorAll(FITS)]).forEach(el=>{if(el&&!el.closest('#mCtx,.menuCarte'))ajuste(el)})};const plus=()=>{if(!att)att=setTimeout(tout,300)};
 new MutationObserver(m=>{if(m.some(r=>{const t=r.target.nodeType===1?r.target:r.target.parentElement;const c=t&&t.closest&&t.closest(FITS);if(c&&!t.closest('#mCtx')){c._fz=null;return true}return false}))plus()}).observe(document.body,{childList:true,subtree:true,characterData:true});addEventListener('resize',()=>{document.querySelectorAll(FITS).forEach(e=>e._fz=null);plus()});setInterval(plus,2000)}
// le panneau de droite et l'onglet prennent un peu plus de hauteur avant de se resserrer
{const st=document.createElement('style');st.textContent='#side{max-height:calc(100% - 140px)}#drawer{max-height:calc(100% - 150px)}';document.head.appendChild(st)}

// --- La Construction : une carte continue, sans cases visibles ---
function kCarte(cu){const cv=$('kC');if(!cv)return;const W=cv.clientWidth,H=cv.clientHeight,dpr=devicePixelRatio||1;cv.width=W*dpr;cv.height=H*dpr;const x=cv.getContext('2d');x.scale(dpr,dpr);
 const ville=K.vue==='ville'&&kCol(),c=ville?T[kCol().i]:null,L=ville?T.filter(t=>hd(c,t)<=3):T,xs=L.map(t=>t.x),zs=L.map(t=>t.z),x0=Math.min(...xs)-1.5,x1=Math.max(...xs)+1.5,z0=Math.min(...zs)-1.5,z1=Math.max(...zs)+1.5,k=Math.min(W/(x1-x0),H/(z1-z0)),cx=(x0+x1)/2,cz=(z0+z1)/2,P=t=>[W/2+(t.x-cx)*k,H/2+(t.z-cz)*k];
 const dv=(()=>{const a=T[0],v=kVoisins(a)[0];return v?Math.hypot(v.x-a.x,v.z-a.z):1.73})(),Rh=dv/Math.sqrt(3)*k;KVUE.P=P;KVUE.k=k;
 // le fond (mer, rivage, terre, relief) se calcule une fois et se garde : seuls les ajouts bougent
 const vis=T.filter(t=>{const [a,b]=P(t);return a>-Rh*3&&a<W+Rh*3&&b>-Rh*3&&b<H+Rh*3}),vuT=t=>ville?K.vu[t.i]:K.regVu[kReg(t)];
 const cle=[K.vue,ville?K.cur:'',W,H,dpr,K.an,Object.keys(K.regVu).length,Object.keys(K.vu).length].join('|');let fd=KVUE.fond;
 if(!fd||fd.cle!==cle){const oc=document.createElement('canvas');oc.width=W*dpr;oc.height=H*dpr;const y=oc.getContext('2d');y.scale(dpr,dpr);KVUE.fond=fd={cle,cv:oc};
  const g=y.createRadialGradient(W/2,H/2,Math.min(W,H)*.2,W/2,H/2,Math.max(W,H)*.75);g.addColorStop(0,'#1d4a63');g.addColorStop(1,'#0c2333');y.fillStyle=g;y.fillRect(0,0,W,H);
  const teinte=(t,sombre)=>{const fo=(K.foret[t.i]||0)/100,al=Math.min(1,(t.alt||0)/2600);let col=t.bare?[110,96,82]:[Math.round(118-55*fo+85*al),Math.round(128+22*fo+45*al),Math.round(72+18*fo+95*al)];if(sombre)col=col.map(v=>Math.round(v*.32));return 'rgb('+col.join(',')+')'};
  const tc=document.createElement('canvas');tc.width=W*dpr;tc.height=H*dpr;const tx=tc.getContext('2d');tx.scale(dpr,dpr);
  const nappe=(F,r,fl)=>{tx.clearRect(0,0,W,H);vis.forEach(t=>{const s=F(t);if(!s)return;const [a,b]=P(t);tx.beginPath();tx.arc(a,b,Rh*r,0,7);tx.fillStyle=s;tx.fill()});y.save();y.filter='blur('+Math.max(1,Rh*fl)+'px)';y.drawImage(tc,0,0,W,H);y.restore()};
  // le rivage, puis la terre fondue d'un lieu à l'autre, puis le relief éclairé du nord-ouest
  nappe(t=>'rgba(225,215,170,.55)',1.45,.7);nappe(t=>teinte(t,!vuT(t)),1.18,.55);
  y.globalCompositeOperation='soft-light';nappe(t=>{const v=kVoisins(t),n=v.find(w=>w.z<t.z&&w.x<t.x)||v[0];const d=n?(t.alt||0)-(n.alt||0):0;return d>0?'rgba(0,0,0,'+Math.min(.5,d/900)+')':'rgba(255,255,255,'+Math.min(.45,-d/900)+')'},1.1,.6);y.globalCompositeOperation='source-over'}
 x.drawImage(fd.cv,0,0,W,H);
 const tache=(F,col,r)=>{x.save();x.filter='blur('+Math.max(1,Rh*.5)+'px)';x.beginPath();vis.forEach(t=>{if(!F(t))return;const [a,b]=P(t);x.moveTo(a+Rh*r,b);x.arc(a,b,Rh*r,0,7)});x.fillStyle=col;x.fill();x.restore()};
 const R=kRegions(),hov=KVUE.hreg;
 if(!ville){
  // la région survolée ou choisie s'éclaire, sans contour de case
  tache(t=>kReg(t)===KVUE.reg,'rgba(255,225,140,.26)',1.1);if(hov&&hov!==KVUE.reg)tache(t=>kReg(t)===hov,'rgba(255,255,255,.12)',1.1);
  // pas de frontières tracées : la région se lit à son nom et s'éclaire au survol
  T.forEach(t=>{const B=K.b[t.i];if(!B||!B.length||!K.regVu[kReg(t)])return;const [a,b]=P(t);x.font=Math.max(10,Rh*1.3)+'px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText(KBAT[B[B.length-1].k].ic,a,b)});
  x.textAlign='center';Object.values(R).forEach(r=>{const [a,b]=P({x:r.cx,z:r.cz}),vu=K.regVu[r.k];x.font=(vu?'bold ':'')+'12px system-ui';x.lineWidth=3;x.strokeStyle='rgba(0,0,0,.55)';const n=vu?r.nom:'?';x.strokeText(n,a,b);x.fillStyle=vu?'#f6eedb':'rgba(240,230,208,.5)';x.fillText(n,a,b);if(K.exps.some(e=>e.rk===r.k))x.fillText('🧭',a,b+15)});
  (K.col||[]).forEach(col=>{const [a,b]=P(T[col.i]);x.font='bold 13px system-ui';x.lineWidth=3;x.strokeStyle='rgba(0,0,0,.6)';x.strokeText(col.nom,a,b-Rh*1.7);x.fillStyle='#ffd36a';x.fillText(col.nom,a,b-Rh*1.7)})}
 else{
  // la ville : un cercle doré pour ce qu'elle peut bâtir et exploiter, puis ce qu'on voit des environs
  const [ca,cb]=P(c);x.beginPath();x.arc(ca,cb,dv*k*2.5,0,7);x.setLineDash([7,5]);x.lineWidth=2;x.strokeStyle='rgba(255,211,106,.75)';x.stroke();x.setLineDash([]);
  if(KVUE.hsel!=null&&KVUE.hsel!==KVUE.sel){const [a,b]=P(T[KVUE.hsel]);x.beginPath();x.arc(a,b,Rh*.85,0,7);x.fillStyle='rgba(255,255,255,.12)';x.fill()}
  if(typeof kVilleDessin==="function")kVilleDessin(x,P,Rh,c,L,W,H);else{L.forEach(t=>{const [a,b]=P(t),d=hd(c,t),vu=K.vu[t.i];if(!vu)return;const B=K.b[t.i]||[],tr=K.trav[t.i]||{};x.textAlign='center';x.textBaseline='middle';
   if(B.length){x.font=Math.round(Rh*.85)+'px system-ui';x.fillText(KBAT[B[B.length-1].k].ic,a,b-Rh*.15);x.font='bold '+Math.max(10,Rh*.22)+'px system-ui';x.lineWidth=3;x.strokeStyle='rgba(0,0,0,.55)';const s=B.map(z=>KBAT[z.k].n).join(' · ');x.strokeText(s,a,b+Rh*.45);x.fillStyle='#f6eedb';x.fillText(s,a,b+Rh*.45);if(B.some(z=>z.abime)){x.fillStyle='#e87b5a';x.fillText('abîmé',a,b+Rh*.68)}}
   else if(d<=2){const A=Object.entries(KACT).filter(([q,A])=>A.ok(t)).map(([q,A])=>A.ic).join('');x.globalAlpha=.8;x.font=Math.round(Rh*.4)+'px system-ui';x.fillText(A,a,b-Rh*.1);x.globalAlpha=1}
   const n=Object.values(tr).reduce((s,v)=>s+v,0);if(n){x.font='bold '+Math.max(10,Rh*.26)+'px system-ui';x.fillStyle='#fff';x.fillText('👥 '+n,a,b+Rh*.25+(B.length?Rh*.1:0))}
   if(KVUE.sel===t.i){x.beginPath();x.arc(a,b,Rh*.85,0,7);x.lineWidth=2.5;x.strokeStyle='#fff';x.stroke()}});}
  x.font='bold 15px system-ui';x.fillStyle='#ffd36a';x.textAlign='left';x.textBaseline='alphabetic';x.fillText(kCol().nom+' et ses environs',12,22);x.font='12px system-ui';x.fillStyle='#f0e6d0';x.fillText('Dans le cercle doré : ce que la ville peut bâtir et exploiter. Clic : choisir · clic droit : que faire ici.',12,40)}
 if(!ville&&typeof kDessExp==='function')kDessExp(x,P,Rh);
 if(K.cyc&&cu!=null){const cc=K.cyc,px=cc.a.x+(cc.b.x-cc.a.x)*cu,pz=cc.a.z+(cc.b.z-cc.a.z)*cu,[a,b]=P({x:px,z:pz}),r=k*(10+cc.f*3),rot=cu*14;x.save();x.translate(a,b);x.rotate(rot);for(let i=0;i<4;i++){x.beginPath();for(let j=0;j<80;j++){const rr=r*.08+j/80*r,an=i*Math.PI/2+Math.log(rr/(r*.08))*2.1;x.lineTo(Math.cos(an)*rr,Math.sin(an)*rr)}x.strokeStyle='rgba(240,245,250,.55)';x.lineWidth=r*.12;x.stroke()}x.restore()}
 const tAt=e=>{const r=cv.getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top;let best=null,bd=1e9;L.forEach(t=>{const [a,b]=P(t),d=Math.hypot(a-mx,b-my);if(d<bd){bd=d;best=t}});return bd<Rh*1.2?best:null};
 cv.onmousemove=e=>{const t=tAt(e);if(ville){const i=t?t.i:null;if(i!==KVUE.hsel){KVUE.hsel=i;kCarte()}return}const r=t?kReg(t):null;if(r!==KVUE.hreg){KVUE.hreg=r;kCarte()}};cv.onwheel=null;cv.onpointerdown=cv.onpointermove=cv.onpointerup=null;
 cv.onclick=e=>{const t=tAt(e);if(!t)return;if(ville){KVUE.sel=t.i}else{KVUE.reg=kReg(t);KVUE.sel=t.i}kPanneau();kCarte()};
 cv.ondblclick=e=>{if(ville)return;const t=tAt(e);if(!t)return;const n=(K.col||[]).findIndex(c=>kReg(T[c.i])===kReg(t));if(n>=0){K.vue='ville';K.cur=n;kRendu()}};
 // clic droit : on choisit l'endroit, et ce qu'on peut y faire s'ouvre là, sous la souris
 cv.oncontextmenu=e=>{e.preventDefault();const t=tAt(e);if(!t)return;cv.onclick(e);const A=$('kA'),b0=A&&A.querySelector('.pc'+(K.fin?':nth-of-type(2)':''));if(!b0)return;
  const Lm=[];[...b0.querySelectorAll('button')].filter(b=>!b.disabled).forEach(b=>{let n=b.textContent.trim().replace(/\s+/g,' ').slice(0,60);
   if(b.dataset.tp||b.dataset.tm){const row=b.parentElement,act=row.querySelector('span').childNodes[0].textContent.trim(),nb=+row.querySelector('b').textContent||0;if(b.dataset.tm&&!nb)return;n=(b.dataset.tp?'+5 personnes à ':'−5 personnes de ')+act+' ('+nb+')'}
   else if(b.dataset.k)n='Bâtir '+n;Lm.push(['▸ '+n,()=>b.click()])});
  const h=b0.querySelector('h4');menuCtx(e.clientX,e.clientY,h?h.textContent:'Ici',Lm.length?Lm:[['Rien à faire ici pour l’instant',()=>{}]])}}
// les panneaux de côté se calent sous la barre du haut, quelle que soit sa hauteur (elle passe parfois sur deux lignes)
setInterval(()=>{const top=$('top');if(!top||!top.offsetHeight)return;let b=top.getBoundingClientRect().bottom;[...document.body.children].forEach(e=>{if(e===top||!e.offsetHeight||e.offsetWidth<innerWidth*.4)return;const r=e.getBoundingClientRect();if(r.top<=b+2&&r.bottom>b&&r.bottom<innerHeight*.35&&getComputedStyle(e).position==='fixed'&&e.id!=='side'&&e.id!=='infoJ')b=r.bottom});
 b=Math.round(b)+8;const s=$('side');if(s&&s.style.top!==b+'px'){s.style.top=b+'px';s.style.maxHeight='calc(100% - '+(b+70)+'px)';s._fz=null}const j=$('infoJ');if(j&&j.style.top!==b+'px'){j.style.top=b+'px';j.style.maxHeight='calc(100vh - '+(b+150)+'px)';j._fz=null}},800);
