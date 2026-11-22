
// ===== La vie du camp en 3D : les personnages animés (modèles Meshy riggés, gestes faits dans Blender) =====
const P3={on:0,ok:{},buf:{},att:{},R:null,S:null,C:null,cv:null,M:{},t0:performance.now(),cam:{x:0,y:28,z:36,tx:0,ty:0,tz:2},err:0};
const P3MOD=['p1a_chasseur','jeune_pagne','homme_chemise','femme_sagaie','femme_travail','femme_drapee','vieux','vieille','p6_enfant','p7_colon','colone','jeune_colon','commandeur','servante','milicien','pretre','enfant_colon','indien','indienne','mystique'];
function p3Modele(p){const f=p.g==='f',a=ageP(p),v=a>=45,C=S.voieC,eu=p.or==='eu'||(C&&typeof noble==='function'&&noble(p));
 // les enfants : ceux des maîtres en habit, les autres comme avant
 if(!adulte(p))return C&&eu?'enfant_colon':'p6_enfant';
 // les gens venus de l'Inde gardent leur tenue, au camp comme à l'habitation
 if(p.or==='in')return f?'indienne':'indien';
 if(C){
  // le maître, sa famille et les colons d'Europe : en habit ; le chasseur blanc de l'habitation est de la milice, le soignant blanc est le curé
  if(eu){if(f)return v?'femme_drapee':'colone';if(p.role==='cha')return 'milicien';if(p.role==='mys')return 'pretre';return a<35?'jeune_colon':'p7_colon'}
  // chez les esclaves : le chasseur de l'habitation surveille les autres (commandeur), la cuisinière soignante sert à la maison
  if(p.role==='cha'&&!f)return 'commandeur';if(p.role==='mys'&&f)return 'servante'}
 // au camp marron : le vieux guérisseur a son allure à lui
 else if(p.role==='mys'&&!f&&a>=40)return 'mystique';
 if(v)return f?'vieille':'vieux';const L=C?(f?['femme_travail','femme_travail','femme_drapee']:['homme_chemise','jeune_pagne','homme_chemise']):(f?['femme_sagaie','femme_travail','femme_drapee']:['p1a_chasseur','jeune_pagne','homme_chemise']);return L[(p.id||0)%3]}
// ce que la personne fait -> le geste joué
const P3GESTE={dort:'dormir',joue:'course',guette:'garde',ronde:'marche',cuisine:'cuisine',soigne:'soin',prie:'offrande',chasse:'chasse_traque','affûte':'assis',repos:'assis',cueille:'cueillir_sol',taille:'bois','porte du bois':'bois','puise de l’eau':'eau',parle:'repos_debout',
 'coupe du bois':'bois','ramasse la paille':'paille','tire la pierre':'pierre','puise l’eau':'eau',garde:'garde','se repose':'assis'};
// hors ligne en fichier local, fetch est refusé : on charge alors modeles/n.js par une balise script
function p3Script(n){return new Promise((ok,ko)=>{const e=document.createElement('script');e.src='modeles/'+n+'.js';e.onload=()=>window.P3B64&&P3B64[n]?ok(P3B64[n]):ko();e.onerror=ko;document.head.appendChild(e)})}
function p3Charge(n){if(P3.ok[n]||P3.att[n])return P3.att[n];P3.att[n]=(window.P3B64&&P3B64[n]?Promise.resolve(P3B64[n]):fetch('modeles/'+n+'.txt').then(r=>{if(!r.ok)throw 0;return r.text()}).catch(()=>p3Script(n))).then(t=>{if(window.P3B64)delete P3B64[n];const b=atob(t.trim()),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);P3.buf[n]=u.buffer;P3.ok[n]=1}).catch(()=>{P3.err++;P3.ok[n]=0});return P3.att[n]}
function p3Instance(n){return new Promise((res,rej)=>new THREE.GLTFLoader().parse(P3.buf[n].slice(0),'',g=>{g.scene.traverse(o=>{if(o.isMesh){o.frustumCulled=false;o.castShadow=false}if(o.isBone&&P3OBJ.includes(o.name))o.scale.set(0,0,0)});const mx=new THREE.AnimationMixer(g.scene);res({g,mx,cur:null,clip:''})},rej))}
const P3OBJ=['couteau','lance','hache','fusil','bol','pilon_p','baton','machette','vouve','kayamb_o','pilon_g','mortier','plateau_o','eventail','canne_c','charge','ravane_o','jembe_o','triangle_o','tige','rouler_o','rocher','pierre_l','buche','rocher2'];
// le camp à l'échelle des personnages : 48 m sur 32
const p3W=(x,y)=>[(x-.5)*48,(y-.5)*32];
function p3Scene(){if(P3.R)return;const cv=document.createElement('canvas');cv.id='cv3';P3.cv=cv;const R=new THREE.WebGLRenderer({canvas:cv,antialias:true});R.outputEncoding=THREE.sRGBEncoding;R.setPixelRatio(Math.min(2,devicePixelRatio));P3.R=R;
 const Sc=new THREE.Scene();P3.S=Sc;P3.hemi=new THREE.HemisphereLight(0xfff1dc,0x3a3020,1);Sc.add(P3.hemi);P3.sun=new THREE.DirectionalLight(0xffe0b0,.8);P3.sun.position.set(-8,14,6);Sc.add(P3.sun);P3.feuL=new THREE.PointLight(0xffa040,0,14);Sc.add(P3.feuL);
 P3.C=new THREE.PerspectiveCamera(34,1,.8,260);P3.deco=new THREE.Group();Sc.add(P3.deco);P3.gens=new THREE.Group();Sc.add(P3.gens);
 // zoom à la molette vers le pointeur
 const ray=new THREE.Raycaster(),v2=new THREE.Vector2(),sol=new THREE.Plane(new THREE.Vector3(0,1,0),0);
 P3.zoom=e=>{const r=e.target.getBoundingClientRect();v2.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(v2,P3.C);const pt=new THREE.Vector3();if(!ray.ray.intersectPlane(sol,pt))return;e.preventDefault();const k=Math.pow(1.0015,e.deltaY),c=P3.cam,d=Math.hypot(c.x-pt.x,c.y-pt.y,c.z-pt.z);if(k<1&&d<4)return;if(k>1&&d>110)return;
  c.x=pt.x+(c.x-pt.x)*k;c.y=pt.y+(c.y-pt.y)*k;c.z=pt.z+(c.z-pt.z)*k;c.tx=pt.x+(c.tx-pt.x)*k;c.ty=pt.y+(c.ty-pt.y)*k;c.tz=pt.z+(c.tz-pt.z)*k}}
function p3Deco(L,C){const G=P3.deco;while(G.children.length)G.remove(G.children[0]);const M=c=>new THREE.MeshLambertMaterial({color:new THREE.Color(c).convertSRGBToLinear()}),add=(g,m,x,y,z)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);G.add(o);return o};
 const sol=add(new THREE.PlaneGeometry(130,96),M(C?0x5e6b3a:0x3f5a2e),0,0,0);sol.rotation.x=-Math.PI/2;
 const terre=add(new THREE.CircleGeometry(1,40),M(C?0x8a7a52:0x6b5a3a),0,.06,1);terre.rotation.x=-Math.PI/2;terre.scale.set(17.5,11,1);
 const [ex,ez]=p3W(.02,.75);const eau=add(new THREE.PlaneGeometry(5,20),M(0x3a6a8a),ex-2,.1,ez);eau.rotation.x=-Math.PI/2;
 for(let k=0;k<16;k++){const a=k*2.4,[x,z]=p3W(.5+Math.cos(a)*.5,.5+Math.sin(a)*.5);add(new THREE.CylinderGeometry(.15,.2,1.6,6),M(0x4a3420),x,.8,z);add(new THREE.ConeGeometry(1.3,3,7),M(0x2a4422),x,2.8,z)}
 L.cases.forEach(([u,v],i)=>{const [x,z]=p3W(u,v);if(C){if(i===0){add(new THREE.BoxGeometry(7,3,4.5),M(0xe8e0cc),x,1.5,z);const t=add(new THREE.ConeGeometry(5.2,2.4,4),M(0x8a3a2e),x,4.2,z);t.rotation.y=Math.PI/4;t.scale.set(1,1,.66);add(new THREE.BoxGeometry(7.4,.15,1.2),M(0x6a5a48),x,.08,z+2.8);for(let k=0;k<4;k++)add(new THREE.CylinderGeometry(.08,.08,2.8,6),M(0xf0ece0),x-3.3+k*2.2,1.4,z+3.3)}else{add(new THREE.BoxGeometry(3.2,1.9,2.4),M(0xb89a70),x,.95,z);const t=add(new THREE.ConeGeometry(2.6,1.6,4),M(0x7a6a5a),x,2.7,z);t.rotation.y=Math.PI/4;t.scale.set(1,1,.75)}}else{add(new THREE.CylinderGeometry(1.5,1.6,1.7,10),M(0x9a7a4a),x,.85,z);add(new THREE.ConeGeometry(2.2,1.8,10),M(0xc8a860),x,2.6,z)}});
 {const [x,z]=p3W(...L.reserve);add(new THREE.BoxGeometry(1.4,1.2,1.4),M(0x7a5a3a),x,.6,z)}
 {const [x,z]=p3W(...L.jardin);for(let k=0;k<12;k++)add(new THREE.BoxGeometry(.5,.25,.35),M(0x4a7a32),x-1.6+(k%4)*1.05,.12,z-.8+Math.floor(k/4)*.7)}
 {const [x,z]=p3W(...L.garde);add(new THREE.CylinderGeometry(.12,.12,2.4,6),M(0x5a4030),x,1.2,z)}
 {const [x,z]=p3W(...L.bois);for(let k=0;k<6;k++){const b=add(new THREE.CylinderGeometry(.09,.09,1.4,6),M(0x8a6a4a),x+(k%3)*.2,.12+Math.floor(k/3)*.18,z);b.rotation.z=Math.PI/2}}
 {const [x,z]=p3W(...L.foyer);add(new THREE.CylinderGeometry(.45,.5,.25,10),M(0x555555),x,.12,z)}
 {const [x,z]=p3W(...L.feu);for(let k=0;k<6;k++){const a=k/6*6.28;add(new THREE.SphereGeometry(.16,6,5),M(0x6a6a6a),x+Math.cos(a)*.5,.1,z+Math.sin(a)*.5)}P3.flamme=add(new THREE.ConeGeometry(.3,.8,8),new THREE.MeshBasicMaterial({color:0xffa030}),x,.4,z);P3.feuL.position.set(x,1.2,z)}
 P3.decoK=CV.camp+'|'+L.cases.length+'|'+(C?1:0)}
function p3Pret(){return P3MOD.some(n=>P3.ok[n])}
// la boucle 3D remplace le dessin 2D quand les modèles sont là
function p3Boucle(){if(!CV.on)return;const cv=$('cvC');if(!cv)return;p3Scene();const box=cv.parentElement;if(!P3.cv.parentElement){box.style.position='relative';P3.cv.style.cssText='position:absolute;left:0;top:0;pointer-events:none';box.insertBefore(P3.cv,cv);cv.style.position='relative';cv.style.zIndex=1;cv.addEventListener('wheel',e=>{if(P3.on)P3.zoom(e)},{passive:false})}
 const W=cv.clientWidth,H=cv.clientHeight;if(cv.width!==W)cv.width=W;if(cv.height!==H)cv.height=H;P3.cv.style.width=W+'px';P3.cv.style.height=H+'px';P3.R.setSize(W,H,false);P3.C.aspect=W/H;P3.C.updateProjectionMatrix();
 const now=performance.now(),dt=Math.min(.1,(now-P3.t0)/1000);P3.t0=now;const ph=jourPh(),nuit=ph>.72||ph<.04,P=cvGens(),{L}=cvLieux(),C=S.voieC;
 if(P3.decoK!==CV.camp+'|'+L.cases.length+'|'+(C?1:0))p3Deco(L,C);
 const c=P3.cam;P3.C.position.set(c.x,c.y,c.z);P3.C.lookAt(c.tx,c.ty,c.tz);
 P3.hemi.intensity=nuit?.25:1;P3.sun.intensity=nuit?.05:.8;{const ar=false;P3.feuL.intensity=(nuit?2.2:.6)*(ar?.9:.85+Math.sin(now/110)*.15);if(P3.flamme)P3.flamme.scale.y=ar?.9:.8+Math.sin(now/90)*.2}P3.R.setClearColor(new THREE.Color(nuit?0x0a0e20:0x9cc4d8).convertSRGBToLinear());
 const x=cv.getContext('2d');x.clearRect(0,0,W,H);const vu=new Set();
 P.forEach(p=>{let a=CV.A[p.id];if(!a){a=CV.A[p.id]={x:L.feu[0]+(Math.random()-.5)*.3,y:L.feu[1]+(Math.random()-.5)*.2,tx:0,ty:0,act:'',t:0,say:'',sayT:0,vis:1}}
  if(a.t<=0||(nuit&&a.act!=='dort'&&p.id!==S.garde)||(!nuit&&a.act==='dort')){const [u,v,ac]=cvCible(p,a,L,nuit);a.tx=u;a.ty=v;a.act=ac;a.t=700+Math.random()*900;if(!nuit&&Math.random()<.18){a.say=cvDit(p,a);a.sayT=200}}
  const dx=a.tx-a.x,dy=a.ty-a.y,d=Math.hypot(dx,dy),sp=adulte(p)?.003:.0042,bouge=d>sp;if(bouge){a.x+=dx/d*sp;a.y+=dy/d*sp}else a.t--;
  a.vis=a.x<1;vu.add(p.id);
  // le personnage 3D
  const n=p3Modele(p);let m=P3.M[p.id];if(!m||m.n!==n){if(!P3.ok[n]){p3Charge(n);return}if(!m||m.n!==n){if(m&&m.o)P3.gens.remove(m.o.g.scene);P3.M[p.id]={n,o:null,wait:1};p3Instance(n).then(o=>{const mm=P3.M[p.id];if(!mm||mm.n!==n)return;mm.o=o;mm.wait=0;P3.gens.add(o.g.scene)})}return}
  if(!m.o)return;const o=m.o,[wx,wz]=p3W(a.x,a.y);o.g.scene.position.set(wx,0,wz);o.g.scene.visible=a.vis;
  if(bouge){const r=Math.atan2(dx*48,dy*32);let dr=r-o.g.scene.rotation.y;dr=Math.atan2(Math.sin(dr),Math.cos(dr));o.g.scene.rotation.y+=dr*Math.min(1,dt*8)}
  const ge=bouge?(a.act==='joue'?'course':'marche'):(P3GESTE[a.act]||'repos_debout');if(o.clip!==ge){const cl=o.g.animations.find(k=>k.name===ge)||o.g.animations.find(k=>k.name==='repos_debout');if(cl){const ac=o.mx.clipAction(cl);ac.reset().fadeIn(.3).play();if(o.cur&&o.cur!==ac)o.cur.fadeOut(.3);if(['chute_mort','transe_maloya'].includes(ge)){ac.setLoop(THREE.LoopOnce);ac.clampWhenFinished=true}o.cur=ac;o.clip=ge}}
  {o.mx._actions.forEach(k=>k.timeScale=1);o.mx.update(dt)}
  // position à l'écran pour les noms, les bulles et le clic
  const v=new THREE.Vector3(wx,2.05,wz).project(P3.C);a.sx=(v.x+1)/2;a.sy=(1-v.y)/2;const px=a.sx*W,py=a.sy*H;if(!a.vis||v.z>1)return;
  if(CV.selP===p.id){x.strokeStyle='#e8be5a';x.lineWidth=2;x.beginPath();x.arc(px,py-6,7,0,7);x.stroke()}
  const loin=Math.hypot(P3.cam.x-P3.cam.tx,P3.cam.y-P3.cam.ty,P3.cam.z-P3.cam.tz)>26&&P.length>12;if(CV.selP!==p.id&&!(a.sayT>0)&&(a.act==='dort'||loin))return;x.fillStyle='#f0e6d0';x.font='11px system-ui';x.textAlign='center';x.shadowColor='#000';x.shadowBlur=3;x.fillText((p.role?ROLES[p.role].ic+' ':'')+p.n.split(' ')[0],px,py-14);x.shadowBlur=0;
  if(a.sayT>0){a.sayT--;x.font='12px system-ui';const w=x.measureText(a.say).width+12;const bx=Math.min(W-w-4,Math.max(4,px-w/2)),by=py-44;x.fillStyle='rgba(250,244,230,.92)';x.fillRect(bx,by,w,18);x.fillStyle='#2a2218';x.textAlign='left';x.fillText(a.say,bx+6,by+13)}});
 for(const id in P3.M)if(!vu.has(+id)){const m=P3.M[id];if(m.o)P3.gens.remove(m.o.g.scene);delete P3.M[id]}
 P3.R.render(P3.S,P3.C);
 const dehors=(S.grp||[]).filter(g=>g.m.some(id=>{const q=ppId(id);return q&&campDe(q)===CV.camp}));x.fillStyle='#f0e6d0';x.font='12px system-ui';x.textAlign='left';x.fillText((nuit?'La nuit. ':'')+(dehors.length?'Dehors : '+dehors.map(g=>g.n+' ('+g.m.length+')').join(', '):'Personne dehors.'),10,H-10);
 CV.raf=requestAnimationFrame(cvBoucle)}
{const cb=cvBoucle;cvBoucle=function(){if(CV.on&&p3Pret()&&window.THREE&&THREE.GLTFLoader){P3.on=1;try{return p3Boucle()}catch(e){console.warn('vue 3D',e);P3.on=0;P3.err3=String(e&&e.message||e).slice(0,80)}}if(P3.cv)P3.cv.style.display=P3.on?'':'none';const r=cb();
 // tant que la 3D n'est pas là, on dit pourquoi
 if(CV.on){const cv=$('cvC');if(cv){const x=cv.getContext('2d'),n=Object.keys(P3.ok).filter(k=>P3.ok[k]).length,att=Object.keys(P3.att).length;const m=!window.THREE||!THREE.GLTFLoader?'Vue 3D indisponible : chargeur absent.':P3.err3?'Vue 3D en erreur : '+P3.err3:P3.err&&!n?'Personnages 3D introuvables ('+P3.err+' fichier'+(P3.err>1?'s':'')+'). Vue simplifiée.':'Chargement des personnages 3D… '+n+' / '+Math.max(att,1);x.save();x.font='13px system-ui';const w=x.measureText(m).width+16;x.fillStyle='rgba(20,16,12,.85)';x.fillRect(cv.width-w-10,10,w,24);x.fillStyle='#f0e6d0';x.textAlign='left';x.fillText(m,cv.width-w-2,27);x.restore()}}return r}}
{const co=cvOuvrir;cvOuvrir=function(ci){co(ci);if(!CV.on)return;
 // chacun apparaît déjà à sa place : endormi près de sa case la nuit, à son travail le jour
 {const {L}=cvLieux(),ph=jourPh(),nuit=ph>.72||ph<.04;cvGens().forEach(p=>{if(CV.A[p.id])return;const a={x:L.feu[0],y:L.feu[1],tx:0,ty:0,act:'',t:0,say:'',sayT:0,vis:1};const [u,v,ac]=cvCible(p,a,L,nuit);a.x=a.tx=u;a.y=a.ty=v;a.act=ac;a.t=200+Math.random()*500;CV.A[p.id]=a})}P3.cam={x:0,y:28,z:36,tx:0,ty:0,tz:2};
 // on charge d'abord les modèles des gens présents
 cvGens().forEach(p=>p3Charge(p3Modele(p)));
 const cv=$('cvC');if(cv&&!cv.p3c){cv.p3c=1;const old=cv.onclick;cv.onclick=e=>{if(!P3.on)return old&&old(e);const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;let best=null,bd=.06;for(const id in CV.A){const a=CV.A[id];if(a.vis&&a.sx!=null){const pp=ppId(+id),dd=Math.hypot(a.sx-x,(a.sy+.03-y)*.8)*(pp&&typeof adulte==='function'&&!adulte(pp)?1.7:1);if(dd<bd){bd=dd;best=+id}}}if(best!=null){CV.selP=best;cvListe();const a=CV.A[best];a.say=cvDit(ppId(best),a);a.sayT=180}}}}}
// les dormeurs d'une même case s'allongent autour d'elle, pas les uns sur les autres
{const cc=cvCible;cvCible=function(p,a,L,nuit){const r=cc(p,a,L,nuit);if(r[2]==='dort'){const k=(p.id*2.399)%6.283,d=.035+(p.id%3)*.012;r[0]+=Math.cos(k)*d;r[1]+=Math.sin(k)*d*1.4}return r}}
