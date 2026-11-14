// ===== p55 : la Construction à la manière de Frostpunk 2 — la carte en plein écran, un cadre fin, une barre de ressources en haut,
// le foyer au centre (la réserve de vivres), les objectifs à gauche, des menus qui s'ouvrent sur des icônes ; plus de tableau fixe =====
{const st=document.createElement('style');st.textContent=`
#kons{background:#0b0f12}
#kons .kb{position:relative}
#kons header{position:absolute;left:0;right:0;top:0;z-index:7;border-bottom:none!important;padding:8px 18px 26px!important;gap:16px!important;background:linear-gradient(rgba(8,10,12,.92),rgba(8,10,12,.55) 70%,rgba(8,10,12,0));font-family:'Montserrat',system-ui,sans-serif}
#kons header>span{font-size:12px;letter-spacing:.04em}
#kons header>span small{text-transform:uppercase;letter-spacing:.1em;font-size:10px;opacity:.75}
#kons header b{font-weight:700}
#kons::after{content:'';position:absolute;inset:8px;border:1px solid rgba(232,226,210,.16);border-radius:18px;pointer-events:none;z-index:8}
#kons::before{content:'';position:absolute;left:50%;top:6px;width:240px;height:3px;margin-left:-120px;border-radius:3px;background:linear-gradient(90deg,transparent,rgba(232,190,90,.6),transparent);z-index:9;pointer-events:none}
#kons aside#kA{position:absolute!important;right:76px!important;top:110px!important;left:auto!important;bottom:auto!important;width:340px;max-width:calc(100vw - 120px);max-height:calc(100% - 230px);overflow:auto;border:1px solid rgba(232,226,210,.18)!important;border-radius:14px;background:rgba(16,14,12,.9)!important;backdrop-filter:blur(6px);z-index:7;display:none;padding:10px 12px!important}
#kons aside#kA.ouvert{display:block}
#kons aside#kA .pc{border-radius:10px;border-color:rgba(232,226,210,.12)!important}
#kDock{position:absolute;right:18px;top:150px;z-index:7;display:flex;flex-direction:column;gap:8px}
#kDock button{width:44px;height:44px;border-radius:50%;border:1.5px solid rgba(232,226,210,.45);background:rgba(16,14,12,.72);color:#f0e6d0;font-size:20px;cursor:pointer;position:relative;backdrop-filter:blur(4px)}
#kDock button:hover,#kDock button.on{border-color:#e8be5a;box-shadow:0 0 0 3px rgba(232,190,90,.18)}
#kDock button span{position:absolute;right:58px;top:50%;transform:translateY(-50%);white-space:nowrap;font:700 10.5px 'Montserrat',system-ui;letter-spacing:.1em;text-transform:uppercase;background:rgba(16,14,12,.85);padding:4px 8px;border-radius:999px;opacity:0;pointer-events:none;transition:opacity .2s}
#kDock button:hover span{opacity:1}
#kFoyer{position:absolute;left:50%;top:96px;transform:translateX(-50%);z-index:7;text-align:center;pointer-events:none}
#kFoyer .rond{width:78px;height:78px;border-radius:50%;margin:0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle,rgba(30,24,18,.95) 58%,transparent 60%);position:relative}
#kFoyer svg{position:absolute;inset:0}
#kFoyer b{font:800 20px 'Montserrat',system-ui;line-height:1}
#kFoyer small{display:block;max-width:60px;line-height:1.05;font:600 8px 'Montserrat',system-ui;letter-spacing:.08em;text-transform:uppercase;opacity:.8}
#kFoyer .nom{margin-top:4px;font:700 10px 'Montserrat',system-ui;letter-spacing:.14em;text-transform:uppercase;opacity:.85;text-shadow:0 1px 3px #000}
#kObj{position:absolute;left:22px;top:104px;z-index:7;max-width:300px;font-family:'Montserrat',system-ui;text-shadow:0 1px 3px rgba(0,0,0,.9);pointer-events:none}
#kObj h5{margin:10px 0 4px;font:700 12px 'Montserrat',system-ui;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid rgba(232,226,210,.35);padding-bottom:3px}
#kObj div{font:500 12px 'Open Sans',system-ui;margin:4px 0 4px 14px;position:relative;line-height:1.3}
#kObj div::before{content:'';position:absolute;left:-14px;top:4px;width:7px;height:7px;border:1.5px solid currentColor;border-radius:50%}
#kObj div.ok{opacity:.5;text-decoration:line-through}
#kObj div.ok::before{background:currentColor}
#kObj div.q{color:#f2d3a0}
@media(max-width:760px){#kObj{display:none}#kons aside#kA{right:68px;width:auto;left:12px}}
`;document.head.appendChild(st)}

// ---------- les menus sur icônes : chacun ouvre une seule partie de l'ancien tableau ----------
const KMENU=[
 {k:'lieu',ic:'🔍',n:'Le lieu choisi',f:(pc,i)=>i===0},
 {k:'exp',ic:'🧭',n:'Expéditions et régions',f:pc=>/expédition|sortie|région|découv/i.test(pc.textContent.slice(0,80))},
 {k:'mer',ic:'⚓',n:'Comptoirs et mer',f:pc=>/comptoir|la mer/i.test(h4(pc))},
 {k:'fac',ic:'⚖️',n:'Les factions',f:pc=>/faction/i.test(h4(pc))},
 {k:'pers',ic:'👥',n:'Les personnages',f:pc=>/personnage/i.test(h4(pc))},
 {k:'chr',ic:'📖',n:'La chronique',f:pc=>/chronique/i.test(h4(pc))},
 {k:'cons',ic:'🏛️',n:'Le conseil',go:()=>{if(typeof kConseilOuvre==='function')kConseilOuvre();else{const b=$('kCoI');if(b)b.click()}}},
 {k:'app',ic:'📜',n:'L’apprentissage',go:()=>{const b=$('kApI');if(b)(b.querySelector('button')||b).click()}}];
function h4(pc){const h=pc.querySelector('h4');return h?h.textContent:''}
const KMN={on:null,sel:null};
function kMenuApplique(){const A=$('kA');if(!A)return;const m=KMENU.find(x=>x.k===KMN.on&&x.f);A.classList.toggle('ouvert',!!m);if(!m)return;
 [...A.querySelectorAll(':scope > .pc, :scope > div')].forEach((pc,i)=>{pc.style.display=m.f(pc,i)?'':'none'});document.querySelectorAll('#kDock button').forEach(b=>b.classList.toggle('on',b.dataset.m===KMN.on))}
function kDock(){const d=$('kons');if(!d||d.hidden||!K||!d.querySelector('.kb'))return;const kb=d.querySelector('.kb');let k=$('kDock');if(!k||k.parentElement!==kb){if(k)k.remove();k=document.createElement('div');k.id='kDock';kb.appendChild(k);
  k.innerHTML=KMENU.map(m=>'<button data-m="'+m.k+'">'+m.ic+'<span>'+m.n+'</span></button>').join('');
  k.querySelectorAll('button').forEach(b=>b.onclick=()=>{const m=KMENU.find(x=>x.k===b.dataset.m);if(m.go){m.go();return}KMN.on=KMN.on===m.k?null:m.k;kMenuApplique()})}}
{const kp=kPanneau;kPanneau=function(){const r=kp.apply(this,arguments);try{kDock();kMenuApplique()}catch(e){}return r}}
// toucher un lieu ouvre le menu du lieu ; Échap ferme le menu
setInterval(()=>{try{if(!K||typeof KVUE==='undefined')return;if(KVUE.sel!==KMN.sel){KMN.sel=KVUE.sel;if(KVUE.sel!=null&&!(typeof KBP!=='undefined'&&KBP.k)){KMN.on='lieu';kMenuApplique()}}kDock();kFoyer();kObjectifs()}catch(e){}},500);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&KMN.on&&$('kons')&&!$('kons').hidden){KMN.on=null;kMenuApplique()}});

// ---------- le foyer : la réserve de vivres, en mois ; pour le colon le confort des maîtres, pour le marron la vie du camp ----------
// combien de temps tiennent les réserves, au rythme actuel (en mois) ; s'il y a excédent, elles tiennent
function kReserve(){const B=kBilan();if(B.viv>=0)return Infinity;return Math.max(0,(K.res.viv||0)/(-B.viv)*12)}
function kFoyer(){const d=$('kons');if(!d||d.hidden||!K||!d.querySelector('.kb'))return;const kb=d.querySelector('.kb');let f=$('kFoyer');if(!f||f.parentElement!==kb){if(f)f.remove();f=document.createElement('div');f.id='kFoyer';kb.appendChild(f)}
 const mo=kReserve(),u=Math.min(1,mo/36),col=mo<12?'#e87b5a':mo<36?'#e8be5a':'#7fc36a',C=2*Math.PI*35,txt=K.joueur==='c'?'Le confort des maîtres':'La vie du camp';
 const val=!isFinite(mo)?'+':mo>=24?Math.floor(mo/12):Math.floor(mo),un=!isFinite(mo)?'excédent':mo>=24?'ans de réserve':'mois de réserve';
 const h='<div class="rond"><svg viewBox="0 0 78 78"><circle cx="39" cy="39" r="35" fill="none" stroke="rgba(232,226,210,.15)" stroke-width="4"/><circle cx="39" cy="39" r="35" fill="none" stroke="'+col+'" stroke-width="4" stroke-linecap="round" stroke-dasharray="'+(C*(!isFinite(mo)?1:u)).toFixed(1)+' '+C.toFixed(1)+'" transform="rotate(-90 39 39)"/></svg><b>'+val+'</b><small>'+un+'</small></div><div class="nom">'+txt+'</div>';
 if(f.dataset.h!==h){f.dataset.h=h;f.innerHTML=h}}
// chaque année : des réserves trop basses font monter la tension (le confort des maîtres, la survie du camp)
{const ka=kAnnee;kAnnee=function(){const mo=K?kReserve():12;const r=ka.apply(this,arguments);try{if(K&&!K.fin&&mo<12){K.tension=Math.min(100,(K.tension||0)+(mo<4?8:4));kLog(K.joueur==='c'?'Les magasins sont presque vides : les maîtres se plaignent, les commandeurs serrent la vis, la colère gronde aux cases.':'Les réserves du camp fondent : on se dispute la nourriture, certains parlent de redescendre.')}}catch(e){}return r}}

// ---------- les objectifs, à gauche : ceux du départ, puis les quêtes nées des expéditions ----------
function kObjectifs(){const d=$('kons');if(!d||d.hidden||!K||!d.querySelector('.kb'))return;const kb=d.querySelector('.kb');let o=$('kObj');if(!o||o.parentElement!==kb){if(o)o.remove();o=document.createElement('div');o.id='kObj';kb.appendChild(o)}
 const col=K.joueur==='c',mes=Object.values(K.b).flat().filter(x=>x.f===K.joueur),nb=k=>mes.filter(x=>x.k===k).length,mo=kReserve();
 const B=[col?['Bâtir trois habitations',Math.min(3,nb('habitation')),3]:['Tenir trois camps',Math.min(3,nb('camp')),3],['Des vivres qui ne baissent plus',isFinite(mo)?0:1,1],
  col?['Un magasin contre les cyclones',Math.min(1,nb('magasin')),1]:['Un grenier contre les cyclones',Math.min(1,nb('grenier')),1],col?['Une chapelle pour le quartier',Math.min(1,nb('chapelle')),1]:['Un poste de guet',Math.min(1,nb('guet')),1]];
 K.objF=K.objF||{};B.forEach(([n,v,m])=>{if(v>=m&&!K.objF[n]){K.objF[n]=K.an;K.res.sav=(K.res.sav||0)+1;kLog('Objectif atteint : '+n.toLowerCase()+'. Savoir +1.')}});
 const Q=[];Object.entries(K.poi||{}).forEach(([rk,L])=>{const R=(kRegions()[rk]||{}).nom||'une région';(L||[]).filter(p=>!p.fait).slice(0,2).forEach(p=>Q.push(p.nom+' · '+R))});
 const h='<h5>'+(col?'Faire vivre la colonie':'Tenir dans les Hauts')+'</h5>'+B.map(([n,v,m])=>'<div class="'+(v>=m?'ok':'')+'">'+n+' ('+v+'/'+m+')</div>').join('')+
  (Q.length?'<h5>Découvert par les expéditions</h5>'+Q.slice(0,5).map(q=>'<div class="q">'+q+'</div>').join(''):'');
 if(o.dataset.h!==h){o.dataset.h=h;o.innerHTML=h}}

// ---------- dans la ville 3D, les arbres sont ceux de Meshy (bois de couleurs en bas, tamarins en haut) ----------
function k3Arbres(P,G,iT,iF){try{if(typeof MOD==='undefined'||!MOD.arbre||MESHY_OK.arbre!=='ok'||!P.length)return;const haut=K&&K.joueur!=='c'&&MOD.tamarin&&MESHY_OK.tamarin==='ok';
 const src=(haut?MOD.tamarin:MOD.arbre).geometry,g=src.clone();g.computeBoundingBox();const b=g.boundingBox,s0=.3/((b.max.y-b.min.y)||1);g.scale(s0,s0,s0);g.translate(0,-b.min.y*s0,0);
 const m=new THREE.InstancedMesh(g,new THREE.MeshLambertMaterial({vertexColors:true,flatShading:true}),P.length),m4=new THREE.Matrix4(),q=new THREE.Quaternion(),c=new THREE.Color();
 P.forEach(([x,y,z,s,v],i)=>{q.setFromEuler(new THREE.Euler(0,(x*13.7+z*7.1)%6.28,0));m4.compose(new THREE.Vector3(x,y,z),q,new THREE.Vector3(s,s,s));m.setMatrixAt(i,m4);const w=.85+v*.12;c.setRGB(w,w,w);m.setColorAt(i,c)});
 G.add(m);iT.visible=iF.visible=false}catch(e){}}
