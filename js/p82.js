// ===== p82 : Vie en personnage — agir sur ce qui est devant soi, sort ou prière, ordres à des compagnons choisis =====
// F : l'action change selon ce qui est devant le chef (ramasser une sagaie, cueillir, grimper à un arbre ou un rocher, descendre).
// R : lancer un sort (marrons, avec le mystique) ou faire une prière (colonie).
// On choisit un ou plusieurs compagnons (clic sur leur nom, Maj+clic pour en ajouter, ou les touches 1 à 6, 0 = tous) :
// les ordres suivants ne s'adressent qu'à eux, et ce qu'ils peuvent faire dépend de qui ils sont.
const VPK={milicien:['🎖️','milicien'],esclave:['⛓️','esclave'],engage:['📜','engagé'],soignante:['🌿','soignante'],mystique:['🔮','mystique'],chasseur:['🏹','chasseur'],ancien:['🪶','ancien'],cueilleur:['🧺','cueilleur']};
function vpKind(p){if(p.virt||(estColon(p)&&p.role==='cha'))return 'milicien';
 if(S.voieC){if(p.st==='engagé')return 'engage';return p.role==='mys'?'soignante':'esclave'}
 if(p.role==='mys')return 'mystique';if(p.role==='cha')return 'chasseur';if(ageP(p)>=50)return 'ancien';return 'cueilleur'}
// ce que chaque sorte de compagnon sait faire, en plus de suivre, attendre, chasser et ramasser
const VPPEUT={cueillir:['esclave','engage','soignante','mystique','chasseur','ancien','cueilleur'],soigner:['mystique','soignante'],eclaireur:['milicien','chasseur','ancien']};
const VPGA=[['suivre','🚶','Suivre'],['attendre','✋','Attendre ici'],['chasser','🎯','Chasser'],['ramasser','🪵','Ramasser les sagaies'],['cueillir','🧺','Cueillir'],['soigner','🌿','Soigner'],['eclaireur','👁️','Partir en éclaireur']];

// côté colonie : le maître part avec des miliciens. S'il n'y a pas de colon chasseur à l'habitation, deux hommes du quartier l'accompagnent.
{const mm=mfModeleDe;mfModeleDe=function(p){if(p&&p.virt)return 'milicien';return mm.apply(this,arguments)}}
{const mp=mourirP;mourirP=function(p){if(p&&p.virt)return;return mp.apply(this,arguments)}}
{const vg=vpGroupe;vpGroupe=function(ci){const G=vg.apply(this,arguments);if(!G||!S.voieC)return G;
 const M=(S.pp||[]).filter(p=>adulte(p)&&campDe(p)===ci&&!enGrp(p)&&p.id!==G.chef.id&&estColon(p)&&p.role==='cha'&&p.g!=='f').slice(0,2);
 const V=M.length?M:[{n:'Grondin, milicien',id:'vm1',g:'h',or:'eu',role:'cha',st:'libre',sk:{cha:3,gue:3},virt:1},{n:'Técher, milicien',id:'vm2',g:'h',or:'eu',role:'cha',st:'libre',sk:{cha:2,gue:4},virt:1}];
 G.C=G.C.slice(0,4).concat(V);return G}}

function vpStyle82(){if($('vp82St'))return;const s=document.createElement('style');s.id='vp82St';s.textContent=
 '#vpS{position:absolute;left:14px;top:132px;background:#0009;border-radius:8px;padding:8px 10px;font-size:12px;max-width:250px}#vpS .ch{display:flex;flex-wrap:wrap;gap:4px;margin:4px 0}'+
 '#vpS .ch button,#vpS .ga button{font:600 11px Montserrat,sans-serif;border-radius:999px;padding:3px 9px;cursor:pointer;color:#efe9da;background:transparent;border:1px solid #4a5a50}#vpS .ch button.on{border-color:#f0c46a;background:#f0c46a33}'+
 '#vpS .ga{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;padding-top:6px;border-top:1px solid #ffffff22}#vpS .ga button:hover,#vpS .ch button:hover{border-color:#f0c46a}#vpS small{opacity:.75}'+
 '#vpI{position:absolute;left:50%;top:56%;transform:translateX(-50%);background:#000b;border:1px solid #f0c46a;border-radius:999px;padding:6px 14px;font:600 13px Montserrat,sans-serif;cursor:pointer;white-space:nowrap}#vpI b{color:#f0c46a;margin-right:6px}#vpI:empty{display:none}'+
 '#vpSo{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#1e2420f2;border:1px solid #8a6aa8;border-radius:10px;padding:14px 16px;min-width:280px;max-width:420px}#vpSo h4{margin:0 0 8px;font:700 16px Alegreya,Georgia,serif;color:#d8c0f0}'+
 '#vpSo button{display:block;width:100%;text-align:left;margin:5px 0;font:500 13px Montserrat,sans-serif;background:#ffffff0d;color:#efe9da;border:1px solid #4a5a50;border-radius:6px;padding:7px 10px;cursor:pointer}#vpSo button:hover{border-color:#d8c0f0}#vpSo button[disabled]{opacity:.45;cursor:default}#vpSo small{display:block;opacity:.75}';
 document.head.appendChild(s)}

// ----- la mise en place, une fois la scène ouverte -----
function vp82Init(){const V=VP;if(!V||V.p82)return;V.p82=1;vpStyle82();V.sel=new Set();V.sol2=[];V.herbe=0;V.prT=0;V.marks=[];const h=V.h,sc=V.sc;
 // ordres par compagnon : chacun peut avoir son ordre à lui ; un ordre donné à tous efface les ordres particuliers
 let base=V.ordre||'suivre';Object.defineProperty(V,'ordre',{configurable:true,get(){const o=V._it;return o&&o.ord?o.ord:base},set(v){base=v;Array.prototype.forEach.call(V.cp,o=>{o.ord=null;o.tache=null})}});
 V.cp.forEach=function(fn,th){for(let i=0;i<this.length;i++){V._it=this[i];try{fn.call(th,this[i],i,this)}finally{V._it=null}}};
 const libre=(x,z,r)=>Math.hypot(x,z)>6&&Math.hypot(x,z+30)>12&&!V.arb.some(a=>Math.hypot(a.x-x,a.z-z)<a.r+r);
 const place=r=>{for(let k=0;k<60;k++){const x=(Math.random()-.5)*140,z=(Math.random()-.5)*140;if(libre(x,z,r))return {x,z}}return null};
 V.cueil=[];const t=V.t,nB=t.bare?3:10;
 // des buissons à baies, des palmistes (on en mange le cœur), des herbes à tisane
 for(let i=0;i<nB;i++){const p=place(1.2);if(!p)continue;const g=new THREE.Group(),b=new THREE.Mesh(new THREE.IcosahedronGeometry(.8,0),new THREE.MeshLambertMaterial({color:0x3d7a3a}));b.position.y=.6;b.scale.y=.8;g.add(b);const F=[];
  for(let k=0;k<5;k++){const f=new THREE.Mesh(new THREE.SphereGeometry(.09,6,5),new THREE.MeshLambertMaterial({color:0xc0283a}));const a=k*1.25;f.position.set(Math.cos(a)*.7,.55+(k%2)*.25,Math.sin(a)*.7);g.add(f);F.push(f)}
  g.position.set(p.x,h(p.x,p.z),p.z);sc.add(g);V.cueil.push({x:p.x,z:p.z,g,F,fr:5,k:'baies',nom:'des baies'})}
 for(let i=0;i<(t.bare?1:4);i++){const p=place(1);if(!p)continue;const g=new THREE.Group(),tr=new THREE.Mesh(new THREE.CylinderGeometry(.13,.18,6,6),new THREE.MeshLambertMaterial({color:0x8a7a62}));tr.position.y=3;g.add(tr);
  for(let k=0;k<7;k++){const f=new THREE.Mesh(new THREE.ConeGeometry(.18,2.6,3),new THREE.MeshLambertMaterial({color:0x3f7a30}));f.position.set(0,6,0);f.rotation.set(1.2,k*.9,0);f.translateY(1.1);g.add(f)}
  g.position.set(p.x,h(p.x,p.z),p.z);sc.add(g);V.arb.push({x:p.x,z:p.z,r:.3,palm:1});V.cueil.push({x:p.x,z:p.z,g,F:[],fr:1,k:'palmiste',nom:'le cœur du palmiste'})}
 for(let i=0;i<5;i++){const p=place(.6);if(!p)continue;const g=new THREE.Group();for(let k=0;k<6;k++){const f=new THREE.Mesh(new THREE.ConeGeometry(.07,.6,3),new THREE.MeshLambertMaterial({color:0x9ac27a}));f.position.set(Math.cos(k)*.15,.28,Math.sin(k)*.15);f.rotation.z=Math.cos(k*2)*.4;g.add(f)}
  g.position.set(p.x,h(p.x,p.z),p.z);sc.add(g);V.cueil.push({x:p.x,z:p.z,g,F:[],fr:2,k:'herbe',nom:'des herbes à tisane'})}
 // des rochers où grimper pour voir loin
 V.roc=[];for(let i=0;i<4;i++){const p=place(2.2);if(!p)continue;const m=new THREE.Mesh(new THREE.DodecahedronGeometry(1,0),new THREE.MeshLambertMaterial({color:0x5c5a52}));m.scale.set(1.8,1.5,1.6);m.position.set(p.x,h(p.x,p.z)+1,p.z);sc.add(m);V.arb.push({x:p.x,z:p.z,r:1.6});V.roc.push({x:p.x,z:p.z,r:1.6,ht:2.5})}
 // l'interface
 const I=document.createElement('div');I.id='vpI';I.onclick=e=>{e.stopPropagation();vpInteragir()};V.el.appendChild(I);
 const P=document.createElement('div');P.id='vpS';V.el.appendChild(P);vpSelUI();
 const kd=e=>{if(!VP||VP.en2D)return;if(e.repeat)return;const k=e.key.toLowerCase();
  if(k==='f'){e.preventDefault();vpInteragir()}else if(k==='r'){e.preventDefault();vpSortsUI()}
};
 addEventListener('keydown',kd,true);const off0=V.off;V.off=()=>{off0&&off0();removeEventListener('keydown',kd,true)}}

// ----- ce qui est devant le chef -----
function vpDevant(){const V=VP,ch=V.chef;if(V.perche)return {k:'descendre',lab:'Descendre'};
 const fx=-Math.sin(V.yaw),fz=-Math.cos(V.yaw),face=(x,z,d)=>{const dx=x-ch.x,dz=z-ch.z,l=Math.hypot(dx,dz)||1;return l<d&&(dx*fx+dz*fz)/l>.45};
 const sg=V.sol2.filter(s=>s.m.parent&&!V.vol.includes(s)&&Math.hypot(s.m.position.x-ch.x,s.m.position.z-ch.z)<2.4).sort((a,b)=>Math.hypot(a.m.position.x-ch.x,a.m.position.z-ch.z)-Math.hypot(b.m.position.x-ch.x,b.m.position.z-ch.z))[0];
 if(sg)return {k:'ramasser',o:sg,lab:'Ramasser la sagaie'};
 const c=V.cueil.find(c=>c.fr>0&&face(c.x,c.z,c.k==='palmiste'?1.8:2.6));if(c)return {k:'cueillir',o:c,lab:c.k==='palmiste'?'Couper le cœur du palmiste':c.k==='herbe'?'Cueillir les herbes':'Cueillir les baies'};
 const r=V.roc.find(r=>face(r.x,r.z,r.r+1.6));if(r)return {k:'grimper',o:r,ht:r.ht+.6,lab:'Grimper sur le rocher'};
 const a=V.arb.find(a=>a.r<1.2&&!a.palm&&!a.bat&&face(a.x,a.z,a.r+1.4));if(a)return {k:'grimper',o:a,ht:4.2,lab:'Grimper à l’arbre'};return null}
function vpInteragir(){const V=VP;if(!V||V.en2D)return;const d=vpDevant(),ch=V.chef;if(!d)return vpMsg('Rien à prendre ni où grimper devant vous.');
 if(d.k==='ramasser'){V.sc.remove(d.o.m);V.sol2=V.sol2.filter(s=>s!==d.o);V.sag++;vpMsg('Sagaie ramassée ('+V.sag+').')}
 else if(d.k==='cueillir')vpCueille(d.o,V.G.chef,true);
 else if(d.k==='grimper'){if(V.fight&&!V.fight.fin)return vpMsg('Pas le moment de grimper : on se bat.');V.perche={y:V.h(ch.x,ch.z)+d.ht,t:0};vpClip(ch,'repos_debout');
  const L=V.an.filter(a=>!a.mort&&Math.hypot(a.x-ch.x,a.z-ch.z)<75);V.voirT=Math.max(V.voirT||0,15);
  const dir=a=>{const ang=Math.atan2(a.x-ch.x,a.z-ch.z)-(V.yaw+Math.PI),c=Math.cos(ang),s=Math.sin(ang);return c>.7?'devant':c<-.7?'derrière':s>0?'à gauche':'à droite'};
  vpMsg('D’en haut, on voit loin. '+(L.length?L.length+' cabri'+(L.length>1?'s':'')+' en vue, surtout '+dir(L[0])+' (marqués 15 s).':'Aucun gibier à portée de vue.')+' Avancez pour redescendre.')}
 else if(d.k==='descendre'){V.perche=null;vpMsg('Vous redescendez.')}vpHud()}
// cueillir : le chef ou un compagnon ; les cueilleurs et les mystiques en tirent plus, les herbes donnent du mystique ou servent aux soins
function vpCueille(c,p,chef){const V=VP;if(!c||c.fr<=0)return false;const kd=chef?(S.voieC?'':'cueilleur'):vpKind(p);let m='';
 if(c.k==='baies'){const n=(kd==='cueilleur'||kd==='esclave')?2:1;c.fr=Math.max(0,c.fr-n);V.viv+=n;c.F.slice(c.fr).forEach(f=>f.visible=false);m=(chef?'':p.n.split(' ')[0]+' : ')+'baies cueillies, +'+n+' vivre'+(n>1?'s':'')+'.'}
 else if(c.k==='palmiste'){c.fr=0;V.viv+=3;c.g.children.slice(1).forEach(f=>f.visible=false);m=(chef?'':p.n.split(' ')[0]+' : ')+'le cœur du palmiste est coupé, +3 vivres (l’arbre en meurt).'}
 else{c.fr--;V.herbe++;if(!S.voieC&&(kd==='mystique'||kd==='cueilleur')){S.myst=(S.myst||0)+.5;p.sk=p.sk||{};p.sk.mys=(p.sk.mys||0)+.2}c.g.visible=c.fr>0;m=(chef?'':p.n.split(' ')[0]+' : ')+'herbes à tisane cueillies (soins : '+V.herbe+')'+(!S.voieC&&(kd==='mystique'||kd==='cueilleur')?', +0,5 mystique':'')+'.'}
 if(c.fr<=0&&c.k==='baies')c.g.children[0].material=new THREE.MeshLambertMaterial({color:0x4f6a3a});vpMsg(m);return true}

// ----- la sélection des compagnons et ce que le groupe choisi peut faire -----
function vpSelect(i,add){const V=VP;if(add){V.sel.has(i)?V.sel.delete(i):V.sel.add(i)}else{if(V.sel.size===1&&V.sel.has(i))V.sel.clear();else{V.sel.clear();V.sel.add(i)}}}
function vpChoisis(){const V=VP;return V.sel.size?V.cp.filter((o,i)=>V.sel.has(i)&&(o.hp==null||o.hp>0)):V.cp.filter(o=>o.hp==null||o.hp>0)}
function vpPeut(a,L){if(a==='suivre'||a==='attendre'||a==='chasser'||a==='ramasser')return L.length>0;const ok=VPPEUT[a];return L.some(o=>ok.includes(vpKind(o.p)))}
function vpSelUI(){const V=VP,d=$('vpS');if(!V||!d)return;const L=vpChoisis();
 d.innerHTML='<b>Compagnons</b> <small>(clic · Maj+clic · Maj+pavé n°)</small><div class="ch"><button data-s="-1" class="'+(V.sel.size?'':'on')+'">Tous</button>'+
  V.cp.map((o,i)=>{const k=VPK[vpKind(o.p)];return '<button data-s="'+i+'" class="'+(V.sel.has(i)?'on':'')+'" title="'+k[1]+(o.ord?' — '+o.ord:'')+'">'+(i+1)+' '+k[0]+' '+o.p.n.split(/[ ,]/)[0]+(o.hp!=null&&o.hp<=0?' ✝':'')+'</button>'}).join('')+'</div>'+
  '<small>'+(V.sel.size?L.map(o=>o.p.n.split(/[ ,]/)[0]).join(', ')+' :':'Tout le groupe :')+'</small><div class="ga">'+VPGA.filter(g=>vpPeut(g[0],L)).map(g=>'<button data-g="'+g[0]+'">'+g[1]+' '+g[2]+'</button>').join('')+'</div>';
 d.querySelectorAll('[data-s]').forEach(b=>b.onclick=e=>{e.stopPropagation();const i=+b.dataset.s;if(i<0)V.sel.clear();else vpSelect(i,e.shiftKey);vpSelUI()});
 d.querySelectorAll('[data-g]').forEach(b=>b.onclick=e=>{e.stopPropagation();vpOrdre(b.dataset.g)})}
function vpOrdre(a){const V=VP;if(!V)return;const L=vpChoisis(),tous=!V.sel.size,noms=L.map(o=>o.p.n.split(/[ ,]/)[0]).join(', ');if(!L.length)return vpMsg('Personne pour cet ordre.');
 if(!vpPeut(a,L))return vpMsg('Personne dans ce choix ne sait faire cela.');
 if(a==='chasser'&&S.voieC&&L.some(o=>vpKind(o.p)==='esclave')&&!V.billet){V.billet=1;vpMsg('Le maître donne son billet : un esclave envoyé à la chasse par son maître peut porter une arme (Lettres patentes de 1723).')}
 if(a==='suivre'||a==='attendre'||a==='chasser'){if(V.fight&&!V.fight.fin)return vpMsg('Pendant le combat, ce sont les rôles qui comptent (panneau de droite).');
  if(tous){vpActionBase(a);vpSelUI();return}L.forEach(o=>{o.ord=a;o.tache=null;o.ax=o.x;o.az=o.z});vpMsg('« '+noms+(a==='suivre'?', suivez-moi. »':a==='attendre'?', attendez ici. »':', allez chasser ! »'));vpSelUI();return}
 const P=a==='cueillir'||a==='soigner'||a==='eclaireur'?L.filter(o=>VPPEUT[a].includes(vpKind(o.p))):L;
 if(a==='soigner'){let n=0;[{p:V.G.chef,me:1}].concat(V.cp).forEach(o=>{if(o.me){if(V.hp<3){V.hp++;n++}}else if(o.hp!=null&&o.hp>0&&o.hp<3){o.hp++;n++}});if(!n)return vpMsg('Personne n’est blessé.');
  if(V.herbe>0)V.herbe--;else if(!S.voieC&&(S.myst||0)>=1)S.myst-=1;else return vpMsg('Il faut des herbes à tisane (cueillez-en) '+(S.voieC?'':'ou 1 de mystique ')+'pour soigner.');
  vpMsg(P[0].p.n.split(/[ ,]/)[0]+' soigne les blessés (+1 souffle).');vpHud();return}
 const cib=a==='ramasser'?()=>V.sol2.filter(s=>s.m.parent&&!V.vol.includes(s)&&!s.pris):a==='cueillir'?()=>V.cueil.filter(c=>c.fr>0&&!c.pris):null;
 if(cib&&!cib().length)return vpMsg(a==='ramasser'?'Aucune sagaie à terre.':'Rien à cueillir alentour.');
 P.forEach((o,j)=>{if(a==='eclaireur'){const ang=V.yaw+Math.PI+(j-(P.length-1)/2)*.4;o.tache={k:a,x:V.chef.x+Math.sin(ang)*28,z:V.chef.z+Math.cos(ang)*28,t:0}}else o.tache={k:a,t:0};o.ord='attendre';vpTacheCible(o)});
 vpMsg(a==='ramasser'?'« '+noms+', ramassez les sagaies. »':a==='cueillir'?'« '+P.map(o=>o.p.n.split(/[ ,]/)[0]).join(', ')+', cueillez ce que vous trouvez. »':'« '+P.map(o=>o.p.n.split(/[ ,]/)[0]).join(', ')+', allez voir devant. »');vpSelUI()}
function vpTacheCible(o){const V=VP,T=o.tache;if(!T)return;if(T.k==='eclaireur'){o.ax=T.x;o.az=T.z;return}
 const L=T.k==='ramasser'?V.sol2.filter(s=>s.m.parent&&!V.vol.includes(s)&&(!s.pris||s.pris===o)).map(s=>({x:s.m.position.x,z:s.m.position.z,s})):V.cueil.filter(c=>c.fr>0&&(!c.pris||c.pris===o)).map(c=>({x:c.x,z:c.z,s:c}));
 const n=L.filter(c=>Math.hypot(c.x-V.chef.x,c.z-V.chef.z)<45).sort((a,b)=>Math.hypot(a.x-o.x,a.z-o.z)-Math.hypot(b.x-o.x,b.z-o.z))[0];
 if(!n){o.tache=null;o.ord=null;vpSelUI();return}n.s.pris=o;T.c=n.s;o.ax=n.x+(T.k==='cueillir'?(o.x-n.x)/(Math.hypot(o.x-n.x,o.z-n.z)||1)*1.1:0);o.az=n.z+(T.k==='cueillir'?(o.z-n.z)/(Math.hypot(o.x-n.x,o.z-n.z)||1)*1.1:0)}
function vpTaches(dt){const V=VP;Array.prototype.forEach.call(V.cp,o=>{const T=o.tache;if(!T)return;T.t+=dt;if(T.t>45){if(T.c)T.c.pris=null;o.tache=null;o.ord=null;return}
 if(Math.hypot(o.ax-o.x,o.az-o.z)>1.3)return;
 if(T.k==='eclaireur'){if(!T.vu){T.vu=1;const L=V.an.filter(a=>!a.mort&&Math.hypot(a.x-o.x,a.z-o.z)<40);V.voirT=Math.max(V.voirT||0,12);vpMsg(o.p.n.split(/[ ,]/)[0]+' revient : '+(L.length?L.length+' cabri'+(L.length>1?'s':'')+' repéré'+(L.length>1?'s':'')+' (marqués 12 s).':'rien de ce côté.'));o.tache=null;o.ord=null;vpSelUI()}return}
 if(T.k==='ramasser'){const s=T.c;if(s&&s.m.parent){V.sc.remove(s.m);V.sol2=V.sol2.filter(x=>x!==s);V.sag++;vpHud()}}
 else if(T.k==='cueillir'){const c=T.c;if(c){c.pris=null;vpCueille(c,o.p,false)}}
 T.c=null;vpTacheCible(o)})}

// ----- sorts (marrons) et prières (colonie) -----
const VPSORT={
 brume:['🌫️','La brume',2,'Une brume monte de la ravine : on ne vous voit plus, les fusils tirent à l’aveugle.'],
 voir:['👁️','Le regard du guetteur',1,'Les bêtes se montrent pendant 20 s.'],
 soin:['🌿','Les mains qui soignent',1,'Le chef et les blessés reprennent un souffle.'],
 ancetres:['🕯️','Parler aux ancêtres',0,'Une prière aux anciens : le groupe se rassemble, la peur recule (une fois par minute).']};
const VPPRIERE={
 protection:['🙏','Prière de protection','Le maître et ses hommes reprennent courage : +1 souffle.'],
 chasse:['✝️','Bénir la chasse','On se remet en marche confiant ; les guetteurs voient mieux pendant 12 s.'],
 angelus:['🔔','L’angélus','Tout le monde s’arrête et se rassemble autour du maître.']};
function vpSortsUI(){const V=VP;if(!V)return;let d=$('vpSo');if(d){d.remove();return}try{if(document.pointerLockElement)document.exitPointerLock()}catch(e){}d=document.createElement('div');d.id='vpSo';const pr=V.prT>V.tps;
 if(S.voieC)d.innerHTML='<h4>Faire une prière</h4>'+Object.keys(VPPRIERE).map(k=>{const s=VPPRIERE[k];return '<button data-p="'+k+'"'+(pr?' disabled':'')+'>'+s[0]+' <b>'+s[1]+'</b><small>'+s[2]+'</small></button>'}).join('')+(pr?'<small>On vient de prier : attendez encore '+Math.ceil(V.prT-V.tps)+' s.</small>':'')+'<small>Ce que l’on croit, pas ce que l’on sait : la prière donne du cœur, pas des miracles.</small>';
 else d.innerHTML='<h4>Lancer un sort</h4><small>Mystique du camp : '+(Math.round((S.myst||0)*10)/10)+'</small>'+Object.keys(VPSORT).map(k=>{const s=VPSORT[k],non=k==='ancetres'?pr:(S.myst||0)<s[2];return '<button data-p="'+k+'"'+(non?' disabled':'')+'>'+s[0]+' <b>'+s[1]+'</b> '+(s[2]?'('+s[2]+' mystique)':'')+'<small>'+s[3]+'</small></button>'}).join('')+'<small>Croyances transmises au camp, rendues ici en jeu.</small>';
 d.innerHTML+='<button data-p="x" style="text-align:center">Fermer (R)</button>';V.el.appendChild(d);
 d.querySelectorAll('[data-p]').forEach(b=>b.onclick=e=>{e.stopPropagation();d.remove();if(b.dataset.p!=='x')vpSort(b.dataset.p)})}
function vpSort(k){const V=VP;if(!V)return;const F=V.fight&&!V.fight.fin?V.fight:null;
 if(S.voieC){if(V.prT>V.tps)return vpMsg('On vient de prier.');V.prT=V.tps+60;
  if(k==='protection'){V.hp=Math.min(3,V.hp+1);V.cp.forEach(o=>{if(o.hp!=null&&o.hp>0&&o.hp<3)o.hp++})}else if(k==='chasse'){V.voirT=Math.max(V.voirT||0,12)}else{V.ordre='suivre';V.cp.forEach(o=>{o.x+=(V.chef.x-o.x)*.6;o.z+=(V.chef.z-o.z)*.6})}
  vpMsg(VPPRIERE[k][1]+' : '+VPPRIERE[k][2]);vpHud();return}
 const s=VPSORT[k];if(k==='ancetres'){if(V.prT>V.tps)return vpMsg('Les ancêtres ont déjà été appelés.');V.prT=V.tps+60}else{if((S.myst||0)<s[2])return vpMsg('Pas assez de mystique.');S.myst-=s[2]}
 if(k==='brume'){if(F)F.brume=15;else V.discret=20;V.brumeT=F?15:20}else if(k==='voir')V.voirT=20;else if(k==='soin'){V.hp=Math.min(3,V.hp+1);V.cp.forEach(o=>{if(o.hp!=null&&o.hp>0&&o.hp<3)o.hp++})}
 else{V.ordre='suivre';S.coh=Math.min(100,(S.coh||0)+1);if(F)V.cp.forEach(o=>{o.cd=0})}
 vpMsg(s[1]+' : '+s[3]);vpHud()}

// ----- les greffes -----
// les sagaies qui retombent restent au sol, on peut les ramasser
{const vl=vpLancer;vpLancer=function(o){const r=vl.apply(this,arguments);try{const s=VP.vol[VP.vol.length-1];if(s)VP.sol2.push(s)}catch(e){}return r}}
// les ordres « suivre / attendre / chasser » au clavier ne s'adressent qu'aux compagnons choisis, s'il y en a
let vpActionBase=null;
{const va=vpAction;vpActionBase=a=>va(a);vpAction=function(a){if(VP&&VP.p82&&VP.sel.size&&(a==='suivre'||a==='attendre'||a==='chasser')&&!(VP.fight&&!VP.fight.fin)){vpOrdre(a);return}
 if(VP&&VP.p82&&a==='pouvoir'&&!(VP.fight&&!VP.fight.fin)){vpSortsUI();return}const r=va.apply(this,arguments);try{vpSelUI()}catch(e){}return r}}
{const vb=vpBoucle;let last=performance.now();vpBoucle=function(){const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;
 if(VP&&!VP.p82)try{vp82Init()}catch(e){console.warn(e)}
 vb.apply(this,arguments);try{const V=VP;if(!V||!V.p82)return;const ch=V.chef;
  // les sagaies : celles qui sont toujours en vol ne sont pas à terre
  // perché sur un arbre ou un rocher
  if(V.perche){const mv=['z','w','s','q','a','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].some(k=>V.keys[k]);if(mv){V.perche=null;vpMsg('Vous redescendez.')}else{ch.y=V.perche.y;V.vy=0;V.sol=true;if(ch.root)ch.root.position.y=ch.y;V.bruit=0}}
  vpTaches(dt);
  // le gibier marqué quand on le « voit »
  const L=V.an.filter(a=>!a.mort);while(V.marks.length<L.length){const m=new THREE.Mesh(new THREE.OctahedronGeometry(.3),new THREE.MeshBasicMaterial({color:0xffd28a,depthTest:false,transparent:true,opacity:.9}));m.renderOrder=9;V.sc.add(m);V.marks.push(m)}
  V.marks.forEach((m,i)=>{const a=L[i];m.visible=(V.voirT||0)>0&&!!a;if(a){m.position.set(a.x,V.h(a.x,a.z)+1.6+Math.sin(V.tps*4)*.15,a.z);m.rotation.y+=dt*2}});
  // la brume
  if(V.brumeT>0){V.brumeT-=dt;if(V.fog0==null)V.fog0=V.sc.fog.far;V.sc.fog.far=Math.max(18,V.fog0*.3)}else if(V.fog0!=null){V.sc.fog.far=V.fog0;V.fog0=null}
  // l'action possible devant soi
  const I=$('vpI');if(I){const d=V.en2D?null:vpDevant(),txt=d?'<b>F</b>'+d.lab:'';if(I._t!==txt){I.innerHTML=txt;I._t=txt}}
  if(V.tps%1<dt){vpSelUI();const H=$('vpH');if(H&&!H.querySelector('.h82'))H.insertAdjacentHTML('beforeend','<small class="h82"><br>F : agir devant soi · R : '+(S.voieC?'prière':'sort')+' · Échap libère la souris</small>');if(H&&V.herbe&&!/tisane/.test(H.textContent))H.insertAdjacentHTML('beforeend','<small><br>Herbes à tisane : '+V.herbe+'</small>')}
 }catch(e){console.warn(e)}}}
