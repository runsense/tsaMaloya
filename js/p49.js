// ===== p49 : la ville de la Construction — des gens en 3D, des lieux d'exploitation qui se voient, et une barre de construction en bas =====
// Inspiration Frostpunk 2 : une barre sombre en bas de l'écran, des familles de bâtiments, des cartes avec leur coût ;
// on choisit une carte, les emplacements possibles s'allument sur la carte, on clique pour bâtir.

// ---------- 1. les familles de la barre ----------
const KFAM=[
 {k:'hab',n:'Habiter',ic:'🏠',L:['habitation','camp']},
 {k:'exp',n:'Exploiter',ic:'⛏️',L:['act:bois','act:pierre','act:culture','act:vivres','act:peche']},
 {k:'pro',n:'Produire',ic:'🌱',L:['champ','jardin']},
 {k:'sto',n:'Stocker',ic:'📦',L:['magasin','grenier']},
 {k:'rel',n:'Relier',ic:'🛤️',L:['route','sentier','port']},
 {k:'foi',n:'Croire, savoir',ic:'⛪',L:['chapelle','ville']},
 {k:'def',n:'Se garder',ic:'👁️',L:['guet']}];
const KBP={fam:null,k:null,G:null,cle:'',last:null};
function kbpInfo(id){if(id.startsWith('act:')){const a=KACT[id.slice(4)];return {n:a.n,ic:a.ic,d:(a.d||'')+' Met 2 bras au travail sur le lieu choisi.',c:{},bras:2,act:id.slice(4)}}const b=KBAT[id];return b?{n:b.n,ic:b.ic,d:b.d,c:b.c,bras:KBRAS[id]||0,f:b.f}:null}
// les emplacements possibles dans la ville pour cette carte
function kbpLieux(id){if(!K||K.vue!=='ville')return [];const L=(KV3.L&&KV3.L.length?KV3.L:T.filter(t=>kAnneau(t)));
 if(id.startsWith('act:')){const a=KACT[id.slice(4)];return L.filter(t=>kAnneau(t)&&a.ok(t)&&K.vu[t.i])}
 return L.filter(t=>kBatir(t).some(([k])=>k===id))}
function kbpPose(t){const id=KBP.k;if(!id||!t)return;const I=kbpInfo(id);if(!kbpLieux(id).includes(t)){toast(I.n+' : pas ici. Les emplacements possibles sont allumés en vert.');return}
 if(I.act){if(kLibres()<1){toast('Plus de bras libres.');return}kMettre(t.i,I.act,2);kLog(I.n+' à '+kLieu(t)+'.');kSauve();kRendu();return}
 if(!kPeut(I.c)){toast('Il manque : '+Object.entries(I.c).filter(([r,v])=>(K.res[r]||0)<v).map(([r,v])=>v+' '+r).join(', ')+'.');return}
 kPaye(I.c);kPose(t.i,id,K.joueur);if(id==='route'&&t.pal!=='Bas')K.tension+=5;kLog(I.n+' à '+kLieu(t)+'.');kSauve();kRendu();
 if(!kbpLieux(id).length||!kPeut(I.c))kbpChoisir(null)}
function kbpChoisir(id){KBP.k=id;KBP.cle='';kbpBarre()}

// ---------- 2. la barre ----------
{const st=document.createElement('style');st.textContent=`
#kbp{position:absolute;left:0;right:0;bottom:0;z-index:6;font:13px system-ui;color:#e9e2d2;pointer-events:none}
#kbp .fam{display:flex;gap:2px;justify-content:center;pointer-events:auto}
#kbp .fam button{background:rgba(22,22,24,.92);color:#cfc6b4;border:1px solid #3a3630;border-bottom:none;padding:6px 12px;font:600 11px system-ui;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;border-radius:6px 6px 0 0}
#kbp .fam button.on{background:rgba(38,34,28,.97);color:#f2a54a;border-color:#f2a54a66}
#kbp .fam button .n{display:inline-block;min-width:16px;margin-left:4px;padding:0 4px;border-radius:8px;background:#f2a54a;color:#1a1612;font-size:10px}
#kbp .row{display:flex;gap:8px;justify-content:center;padding:8px 10px 10px;background:linear-gradient(rgba(38,34,28,.97),rgba(20,19,18,.97));border-top:2px solid #f2a54a88;pointer-events:auto;overflow-x:auto}
#kbp .cd{width:118px;flex:none;background:#2a2723;border:1px solid #4a443a;border-radius:4px;padding:6px;cursor:pointer;text-align:left;color:inherit;font:inherit;position:relative}
#kbp .cd:hover{border-color:#f2a54a}
#kbp .cd.on{border-color:#f2a54a;box-shadow:0 0 0 2px #f2a54a55 inset;background:#3a3127}
#kbp .cd.off{opacity:.45}
#kbp .cd .ic{font-size:22px;line-height:1;display:block;margin-bottom:3px}
#kbp .cd b{display:block;font-size:12px;line-height:1.15}
#kbp .cd small{display:block;color:#b9ae98;font-size:10.5px;margin-top:3px}
#kbp .cd .nb{position:absolute;top:4px;right:5px;font-size:10px;color:#9fc98a}
#kbp .msg{text-align:center;pointer-events:none;margin-bottom:6px}
#kbp .msg span{background:rgba(20,19,18,.9);border:1px solid #f2a54a88;color:#f2d3a0;padding:4px 10px;border-radius:12px;font-size:12px}`;document.head.appendChild(st)}
function kbpBarre(){const cv=KV3.cv;let d=$('kbp');if(!K||K.vue!=='ville'||!cv||!cv.isConnected||K.fin){if(d)d.remove();kbpMarques();return}
 const box=cv.parentElement;if(!d||d.parentElement!==box){if(d)d.remove();d=document.createElement('div');d.id='kbp';box.appendChild(d);
  d.addEventListener('click',e=>{const f=e.target.closest('[data-fam]'),c=e.target.closest('[data-cd]');if(f){KBP.fam=KBP.fam===f.dataset.fam?null:f.dataset.fam;KBP.k=null;KBP.cle='';kbpBarre()}else if(c){kbpChoisir(KBP.k===c.dataset.cd?null:c.dataset.cd)}})}
 const F=KFAM.map(f=>({...f,L:f.L.filter(id=>{if(id.startsWith('act:'))return true;const b=KBAT[id];return b&&b.f===K.joueur&&(!b.an||K.an>=b.an)})})).filter(f=>f.L.length);
 const fam=F.find(f=>f.k===KBP.fam);
 const cartes=fam?fam.L.map(id=>{const I=kbpInfo(id),n=kbpLieux(id).length,ok=n&&kPeut(I.c)&&(!I.act||kLibres()>0);
   const cout=Object.entries(I.c).map(([r,v])=>v+' '+r).join(' · ')||'gratuit';return '<button class="cd'+(KBP.k===id?' on':'')+(ok?'':' off')+'" data-cd="'+id+'" title="'+(I.d||'').replace(/"/g,'&quot;')+'"><span class="ic">'+I.ic+'</span><b>'+I.n+'</b><small>'+cout+(I.bras?' · '+I.bras+' bras':'')+'</small><span class="nb">'+(n?n+' lieu'+(n>1?'x':''):'nulle part')+'</span></button>'}).join(''):'';
 const msg=KBP.k?'<div class="msg"><span>'+kbpInfo(KBP.k).ic+' '+kbpInfo(KBP.k).n+' · cliquez un emplacement allumé · Échap ou clic droit pour annuler</span></div>':'';
 d.innerHTML=msg+'<div class="fam">'+F.map(f=>{const n=f.L.filter(id=>{const I=kbpInfo(id);return kbpLieux(id).length&&kPeut(I.c)}).length;return '<button data-fam="'+f.k+'" class="'+(KBP.fam===f.k?'on':'')+'">'+f.ic+' '+f.n+(n?'<span class="n">'+n+'</span>':'')+'</button>'}).join('')+'</div>'+(fam?'<div class="row">'+cartes+'</div>':'');
 // le conseil (en bas à gauche) et l'apprentissage (en bas à droite) remontent au-dessus de la barre
 ['kCoI','kApI'].forEach(id=>{let e=$(id);while(e&&e!==box&&getComputedStyle(e).position!=='absolute')e=e.parentElement;if(e&&e!==box&&e!==d)e.style.bottom=(d.offsetHeight+10)+'px'});
 kbpMarques()}
// les emplacements allumés dans la vue 3D
function kbpMarques(){if(!KV3.S)return;const cle=(KBP.k||'')+'|'+KV3.cle;if(cle===KBP.cle&&KBP.G&&KBP.G.parent)return;KBP.cle=cle;if(KBP.G){KV3.S.remove(KBP.G);KBP.G.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)o.material.dispose()})}KBP.G=null;
 if(!KBP.k||!K||K.vue!=='ville')return;const G=new THREE.Group(),g=new THREE.RingGeometry(.52,.62,6),m=new THREE.MeshBasicMaterial({color:0x7fe07a,transparent:true,opacity:.85,side:THREE.DoubleSide,depthWrite:false}),gd=new THREE.CircleGeometry(.6,6),md=new THREE.MeshBasicMaterial({color:0x7fe07a,transparent:true,opacity:.14,side:THREE.DoubleSide,depthWrite:false});
 kbpLieux(KBP.k).forEach(t=>{const y=k3Y(t.x,t.z)+.04;const r=new THREE.Mesh(g,m);r.rotation.x=-Math.PI/2;r.position.set(t.x,y,t.z);r.renderOrder=4;G.add(r);const c=new THREE.Mesh(gd,md);c.rotation.x=-Math.PI/2;c.position.set(t.x,y-.005,t.z);G.add(c)});KV3.S.add(G);KBP.G=G}
setInterval(()=>{try{if(!K)return;if(KV3.cv&&!KV3.cv._kbp){KV3.cv._kbp=1;let dn=null;KV3.cv.addEventListener('pointerdown',e=>{dn=[e.clientX,e.clientY,e.button]});
  KV3.cv.addEventListener('pointerup',e=>{if(!dn||!KBP.k)return;const cl=Math.hypot(e.clientX-dn[0],e.clientY-dn[1])<5&&dn[2]===0;dn=null;if(cl)setTimeout(()=>{if(KVUE.sel!=null)kbpPose(T[KVUE.sel])},0)});
  KV3.cv.addEventListener('contextmenu',e=>{if(KBP.k){e.stopImmediatePropagation();e.preventDefault();kbpChoisir(null)}},true)}
 const d=$('kbp'),c=KV3.cv;if(!d&&c&&c.isConnected&&K.vue==='ville')kbpBarre();else if(d&&(!c||!c.isConnected||K.vue!=='ville'))kbpBarre();else kbpMarques()}catch(e){}},400);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&KBP.k){kbpChoisir(null);e.stopPropagation()}},true);
{const kr=kRendu;kRendu=function(){const r=kr.apply(this,arguments);try{kbpBarre()}catch(e){}return r}}

// ---------- 3. les lieux d'exploitation se voient : chantier, carrière, pirogue, séchoir ; un disque de couleur sous chaque lieu ----------
function k3Icone(ic){const cv=document.createElement('canvas');cv.width=cv.height=64;const x=cv.getContext('2d');x.fillStyle='rgba(22,20,18,.85)';x.beginPath();x.arc(32,32,30,0,7);x.fill();x.strokeStyle='#f2a54a';x.lineWidth=3;x.stroke();x.font='34px serif';x.textAlign='center';x.textBaseline='middle';x.fillText(ic,32,35);
 const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(cv),depthTest:false}));sp.scale.set(.18,.18,.18);sp.renderOrder=9;return sp}
{const kb=k3Batir;k3Batir=function(){kb.apply(this,arguments);try{const G=KV3.G;if(!G)return;const M=c=>new THREE.MeshLambertMaterial({color:new THREE.Color(c).convertSRGBToLinear()}),add=(g,m,x,y,z,ry)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);if(ry)o.rotation.y=ry;G.add(o);return o};
 const vus={};(KV3.lieux||[]).forEach(l=>{const t=l.t,key=t.i+(l.act||'m');if(vus[key])return;vus[key]=1;const y0=k3Y(l.x,l.z);
  // un disque discret sous le lieu : chaud pour l'habitat, bleu-vert pour l'exploitation
  const dk=new THREE.Mesh(new THREE.CircleGeometry(l.maison?.55:.42,24),new THREE.MeshBasicMaterial({color:l.maison?0xf2a54a:0x5ac8c0,transparent:true,opacity:.16,depthWrite:false}));dk.rotation.x=-Math.PI/2;dk.position.set(l.x+(l.act?.05:0),y0+.02,l.z+(l.act?.05:0));G.add(dk);
  if(!l.act)return;const x=l.x+.12,z=l.z+.12,y=k3Y(x,z),h=i=>kH(t.i,i+20);
  if(l.act==='bois'){for(let i=0;i<5;i++){const a=i*1.3+h(i),r=.12+h(i+5)*.12;add(new THREE.CylinderGeometry(.018,.022,.03,6),M(0x8a6a42),x+Math.cos(a)*r,y+.015,z+Math.sin(a)*r)}for(let i=0;i<3;i++)add(new THREE.CylinderGeometry(.014,.014,.18,6).rotateZ(Math.PI/2),M(0x6a4a2a),x,y+.016+i*.026,z+.03*(i%2),.4)}
  else if(l.act==='pierre'){const dd=new THREE.Mesh(new THREE.CircleGeometry(.16,10),M(0x4a4440));dd.rotation.x=-Math.PI/2;dd.position.set(x,y+.008,z);G.add(dd);for(let i=0;i<4;i++)add(new THREE.BoxGeometry(.05,.035,.04),M(i%2?0x8a8580:0x6e6a66),x+.18+(i%2)*.05,y+.018+Math.floor(i/2)*.035,z-.05,.3)}
  else if(l.act==='peche'){add(new THREE.BoxGeometry(.05,.025,.26),M(0x5a3a22),x,Math.max(.01,y)+.013,z,.8);for(let i=0;i<2;i++)add(new THREE.CylinderGeometry(.006,.006,.12,4),M(0x6a4a2a),x+.15+i*.12,Math.max(0,y)+.06,z+.1);add(new THREE.BoxGeometry(.13,.06,.004),new THREE.MeshLambertMaterial({color:0xd8d0b8,transparent:true,opacity:.6}),x+.21,Math.max(0,y)+.09,z+.1)}
  else if(l.act==='vivres'){for(let i=0;i<2;i++)add(new THREE.CylinderGeometry(.006,.006,.14,4),M(0x6a4a2a),x+i*.14,y+.07,z);add(new THREE.CylinderGeometry(.005,.005,.15,4).rotateZ(Math.PI/2),M(0x6a4a2a),x+.07,y+.13,z);add(new THREE.SphereGeometry(.03,6,5),M(0xb8903a),x+.04,y+.03,z+.08);add(new THREE.SphereGeometry(.026,6,5),M(0x9a7a30),x+.1,y+.026,z+.09)}
  const ic={bois:'🪓',pierre:'🪨',culture:'🌱',vivres:'🏹',peche:'🐟'}[l.act];if(ic){const sp=k3Icone(ic);sp.position.set(l.x,y0+.42,l.z);G.add(sp)}});
 }catch(e){console.warn('k3 lieux',e.message)}}}

// ---------- 4. des gens en 3D : les modèles animés du jeu marchent de leur maison à leur travail ----------
const K3P={L:[],nb:12,tp:performance.now()};
const K3CLIP={bois:'bois',pierre:'pierre',culture:'houe',vivres:'cueillir',peche:'bichique'};
function k3Modeles(){return K.joueur==='c'?['homme_chemise','femme_travail','servante','jeune_colon','p7_colon','femme_drapee']:['p1a_chasseur','femme_sagaie','jeune_pagne','femme_travail','vieux','femme_drapee']}
function k3PersoLibere(){K3P.L.forEach(p=>{if(p.o&&p.o.parent)p.o.parent.remove(p.o);if(p.o)p.o.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(m.map)m.map.dispose();m.dispose()})})});K3P.L=[]}
{const kb=k3Boucle;k3Boucle=function(){kb.apply(this,arguments);try{if(!K||K.vue!=='ville'||!KV3.on||!KV3.G||typeof p3Charge!=='function')return;const d=$('kons');if(!d||d.hidden)return;
 const now=performance.now(),dt=Math.min(.1,(now-K3P.tp)/1000);K3P.tp=now;const n=Math.min(K3P.nb,KV3.gens.length),Ms=k3Modeles();
 // nouvelle ville bâtie : les modèles sont rattachés au nouveau décor
 K3P.L.forEach(p=>{if(p.o&&p.o.parent!==KV3.G){if(p.o.parent)p.o.parent.remove(p.o);KV3.G.add(p.o)}});
 for(let i=K3P.L.length;i<n;i++){const p={n:Ms[i%Ms.length],o:null,mx:null,clip:''};K3P.L.push(p);p3Charge(p.n);const at=()=>{if(!K3P.L.includes(p))return;if(!P3.buf[p.n]){if(P3.ok[p.n]===0)return;setTimeout(at,500);return}
   p3Instance(p.n).then(I=>{if(!K3P.L.includes(p))return;const o=new THREE.Group(),g=I.g.scene;g.scale.setScalar(.085/1.75);o.add(g);o.userData.anim=I.g.animations;p.o=o;p.mx=I.mx;KV3.G.add(o)}).catch(()=>{})};at()}
 K3P.L.forEach((p,i)=>{const g=KV3.gens[i];if(!p.o||!g){if(p.o)p.o.visible=false;return}g.o.visible=false;p.o.visible=true;
  const q=g.o.position,mv=p.lp?Math.hypot(q.x-p.lp[0],q.z-p.lp[1]):0;p.lp=[q.x,q.z];p.o.position.set(q.x,k3Y(q.x,q.z),q.z);p.o.rotation.y=g.o.rotation.y;
  const surPlace=g.w&&Math.hypot(q.x-g.w.x,q.z-g.w.z)<.06;const clip=surPlace?(K3CLIP[g.w.act]||(K.joueur==='c'?'cafe':'paille')):(mv>.0004?'marche':'repos_debout');
  if(p.clip!==clip&&p.mx){const A=p.o.userData.anim||[],a=A.find(x=>x.name===clip)||A.find(x=>x.name==='marche');if(a){p.mx.stopAllAction();p.mx.clipAction(a).play();p.clip=clip}}
  if(p.mx&&!window.PAUSEJ)p.mx.update(dt)})}catch(e){}}}
// on quitte la Construction ou on change de camp : on rend la mémoire
{const kf=window.kFermer;if(typeof kf==='function'){kFermer=function(){k3PersoLibere();return kf.apply(this,arguments)}}}
