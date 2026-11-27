// ===== p367 : la bataille en 3D. Pendant le combat, « Vue 3D » (touche V) montre le plateau en relief avec les vrais
// personnages animés. La molette rapproche la caméra : de la vue d'ensemble jusqu'à l'épaule d'un combattant, vu de dos.
// Clic sur un combattant (ou Tab) pour le suivre ; glisser pour tourner autour du plateau. =====
const B367={on:0,G:null,env:null,R:null,S:null,C:null,cv:null,U:new Map(),sel:null,z:0,zc:0,yaw:0,t:0,fx:[],sol:null};
{const p0=perso97;perso97=function(x,u,b,px,py,s,cs,G){if(G)B367.G=G;return p0.apply(this,arguments)}}
{const ob=ouvrirBataille;ouvrirBataille=function(k,fin){try{const sc=BTU.SC.find(s=>s.k===k)||BTU.SC[0];B367.env=sc.env}catch(e){}B367.on=0;B367.G=null;const r=ob.apply(this,arguments);setTimeout(bouton367,300);return r}}
function bouton367(){const el=document.getElementById('btu');if(!el){return}if(el.querySelector('#b367'))return;const b=document.createElement('button');b.id='b367';b.className='bt sec';b.textContent='Vue 3D (V)';b.title='Le plateau en relief ; molette : jusqu’à la vue de dos d’un combattant';
 const bh=el.querySelector('.bh');(bh||el).insertBefore(b,bh&&bh.querySelector('#btuQ'));b.onclick=()=>bascule367()}
function bascule367(){const G=B367.G;if(!B367.on&&!(G&&G.phase==='fight'&&G.u)){aide367('La vue 3D s’ouvre pendant le combat (après le placement).');return}B367.on=!B367.on;if(B367.on)init367();if(B367.cv)B367.cv.hidden=!B367.on;const b=document.getElementById('b367');if(b)b.textContent=B367.on?'Vue du dessus (V)':'Vue 3D (V)';if(B367.on)aide367('Molette : se rapprocher jusqu’à la vue de dos · clic ou Tab : choisir qui suivre · glisser : tourner')}
function aide367(t){const el=document.getElementById('btu');if(!el)return;let d=el.querySelector('#a367');if(!d){d=document.createElement('div');d.id='a367';d.style.cssText='position:absolute;left:50%;top:58px;transform:translateX(-50%);z-index:6;background:rgba(20,16,12,.82);color:#f1e6cc;padding:6px 12px;border-radius:6px;font:14px Georgia,serif;pointer-events:none;transition:opacity .4s';el.append(d)}d.textContent=t;d.style.opacity=1;clearTimeout(aide367.t);aide367.t=setTimeout(()=>d.style.opacity=0,3500)}
function init367(){const el=document.getElementById('btu');if(!el)return;if(B367.cv&&B367.cv.parentNode===el)return;
 const T=THREE,cv=document.createElement('canvas');cv.className='aq352-2d';cv.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:2;touch-action:none';const c0=el.querySelector('canvas');c0.after(cv);B367.cv=cv;el.querySelectorAll(':scope>.bh,:scope>.bp').forEach(c=>c.style.zIndex=3);
 const R=new T.WebGLRenderer({canvas:cv,antialias:true});R.setPixelRatio(Math.min(1.5,devicePixelRatio||1));R.outputEncoding=T.sRGBEncoding;B367.R=R;
 const S=new T.Scene();S.background=new T.Color(0xbfd3d8);S.fog=new T.Fog(0xbfd3d8,30,90);B367.S=S;S.add(new T.HemisphereLight(0xfff3dc,0x4a5a3a,1.05));const dl=new T.DirectionalLight(0xffe6c0,.9);dl.position.set(-12,25,10);S.add(dl);
 B367.C=new T.PerspectiveCamera(55,1,.1,300);
 // le plateau : on peint le fond de la bataille (le même que la vue du dessus) sur une toile
 const cs=128,tc=document.createElement('canvas');tc.width=cs*8;tc.height=cs*6;const x=tc.getContext('2d');x.fillStyle='#5a6a40';x.fillRect(0,0,tc.width,tc.height);
 try{if(typeof fondBat331==='function')fondBat331(x,B367.env,0,0,cs,8,6)}catch(e){}try{if(typeof deco97==='function')deco97(x,B367.env,0,0,cs,8,6,tc.width,tc.height)}catch(e){}
 x.strokeStyle='rgba(255,240,200,.18)';x.lineWidth=2;for(let i=0;i<=8;i++){x.beginPath();x.moveTo(i*cs,0);x.lineTo(i*cs,tc.height);x.stroke()}for(let j=0;j<=6;j++){x.beginPath();x.moveTo(0,j*cs);x.lineTo(tc.width,j*cs);x.stroke()}
 const tx=new T.CanvasTexture(tc);tx.encoding=T.sRGBEncoding;const pl=new T.Mesh(new T.PlaneGeometry(16,12),new T.MeshLambertMaterial({map:tx}));pl.rotation.x=-Math.PI/2;S.add(pl);
 const tour=new T.Mesh(new T.PlaneGeometry(200,200),new T.MeshLambertMaterial({color:0x6d7a4c}));tour.rotation.x=-Math.PI/2;tour.position.y=-.02;S.add(tour);
 // quelques rochers et arbres autour, pour que le regard ne tombe pas dans le vide quand on est à hauteur d'homme
 for(let i=0;i<40;i++){const a=i*2.399,r=12+(i*7.3)%22,px=Math.cos(a)*r,pz=Math.sin(a)*r*.8;if(Math.abs(px)<9&&Math.abs(pz)<7)continue;const g=i%3?new T.IcosahedronGeometry(.6+(i%5)*.25,0):new T.ConeGeometry(1.2,4+(i%4),6);const m=new T.Mesh(g,new T.MeshLambertMaterial({color:i%3?0x6f6a60:0x2f5a32,flatShading:true}));m.position.set(px,i%3?.3:2,pz);S.add(m)}
 // la souris : glisser pour tourner, molette pour descendre jusqu'au combattant, clic pour le choisir
 let dr=null;cv.addEventListener('pointerdown',e=>{dr={x:e.clientX,y:e.clientY,m:0}});addEventListener('pointerup',e=>{if(dr&&!dr.m&&B367.on)choisir367(e);dr=null});
 cv.addEventListener('pointermove',e=>{if(!dr)return;const dx=e.clientX-dr.x;if(Math.abs(dx)>3)dr.m=1;B367.yaw-=dx*.006;dr.x=e.clientX});
 cv.addEventListener('wheel',e=>{e.preventDefault();B367.z=Math.max(0,Math.min(1,B367.z-e.deltaY*.0012));if(B367.z>.05&&!B367.sel)suivant367()},{passive:false});
 requestAnimationFrame(boucle367)}
function vivants367(){const G=B367.G;return G&&G.u?G.u.filter(u=>u.pv>0):[]}
function suivant367(){const L=vivants367().filter(u=>u.s===0);if(!L.length)return;const i=L.indexOf(B367.sel);B367.sel=L[(i+1)%L.length]}
function choisir367(e){const T=THREE,r=B367.cv.getBoundingClientRect(),m=new T.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),rc=new T.Raycaster();rc.setFromCamera(m,B367.C);let best=null,bd=1.2;
 for(const [u,o] of B367.U){if(u.pv<=0)continue;const p=o.g.position.clone();p.y+=.9;const d=rc.ray.distanceToPoint(p);if(d<bd){bd=d;best=u}}if(best){B367.sel=best;aide367('Vous suivez : '+((BTU.U&&BTU.U[best.k]&&BTU.U[best.k].n)||best.k)+(best.s?' (camp adverse)':''))}}
addEventListener('keydown',e=>{if(!document.getElementById('btu'))return;if(e.code==='KeyV'&&!e.repeat){bascule367();e.preventDefault()}else if(e.code==='Tab'&&B367.on){suivant367();e.preventDefault()}});
const pos367=(u,v)=>v.set((u.x-4)*2,0,(u.y-3)*2);
function unite367(u){let o=B367.U.get(u);if(o)return o;const T=THREE,g=new T.Group();
 // en attendant le modèle : une silhouette de la couleur de l'unité, et toujours un anneau au sol (vert : les vôtres, rouge : en face)
 const b=(typeof BTU!=='undefined'&&BTU.U&&BTU.U[u.k])||{};const ph=new T.Mesh((T.CapsuleGeometry?new T.CapsuleGeometry(.3,1,4,8):new T.CylinderGeometry(.3,.3,1.6,8)),new T.MeshLambertMaterial({color:b.col||'#aa8866'}));ph.position.y=.85;g.add(ph);
 const an=new T.Mesh(new T.RingGeometry(.45,.6,24),new T.MeshBasicMaterial({color:u.s===0?0x7ccf66:0xd85555,transparent:true,opacity:.85,side:T.DoubleSide}));an.rotation.x=-Math.PI/2;an.position.y=.03;g.add(an);
 o={g,ph,an,root:null,mx:null,anim:null,clip:'',ang:u.s===0?Math.PI:0,px:u.x,py:u.y};pos367(u,g.position);B367.S.add(g);B367.U.set(u,o);
 try{const n=typeof mod185==='function'?mod185(b,u.s,(u.id||Math.round(u.cx*7+u.cy*3)||0)):null;if(n&&typeof p3Charge==='function'){p3Charge(n);const at=()=>{if(!B367.U.has(u))return;if(!P3.buf[n]){if(P3.ok[n]===0)return;setTimeout(at,300);return}p3Instance(n).then(I=>{o.root=I.g.scene;o.anim=I.g.animations;o.mx=I.mx;g.add(o.root);ph.visible=false;clip367(o,'repos_debout')}).catch(()=>{})};at()}}catch(e){}
 return o}
function clip367(o,c,une){if(!o.mx||o.clip===c)return;const a=(o.anim||[]).find(x=>x.name===c)||(o.anim||[]).find(x=>x.name==='marche');if(!a)return;o.mx.stopAllAction();const ac=o.mx.clipAction(a);if(une){ac.setLoop(THREE.LoopOnce);ac.clampWhenFinished=true}ac.reset().play();o.clip=c}
function boucle367(t){const el=document.getElementById('btu');if(!el){fin367();return}requestAnimationFrame(boucle367);if(!B367.on)return;const G=B367.G;if(G&&G.phase!=='fight'){B367.on=0;if(B367.cv)B367.cv.hidden=true;const b=document.getElementById('b367');if(b)b.textContent='Vue 3D (V)';return}
 const T=THREE,dt=Math.min(.1,(t-(B367.t||t))/1000);B367.t=t;const R=B367.R,cv=B367.cv,W=cv.clientWidth,H=cv.clientHeight;if(cv.width!==Math.round(W*R.getPixelRatio())||cv.height!==Math.round(H*R.getPixelRatio())){R.setSize(W,H,false);B367.C.aspect=W/H;B367.C.updateProjectionMatrix()}
 const L=G&&G.u?G.u:[],v=new T.Vector3();
 L.forEach(u=>{const o=unite367(u);const dx=u.x-o.px,dy=u.y-o.py,d=Math.hypot(dx,dy);pos367(u,v);o.g.position.lerp(v,.35);
  if(d>.002)o.ang=Math.atan2(dx,dy);else{let tg=null,dm=1e9;L.forEach(e=>{if(e.s!==u.s&&e.pv>0){const q=Math.hypot(e.x-u.x,e.y-u.y);if(q<dm){dm=q;tg=e}}});if(tg)o.ang=Math.atan2(tg.x-u.x,tg.y-u.y)}
  let da=o.ang-o.g.rotation.y;da=Math.atan2(Math.sin(da),Math.cos(da));o.g.rotation.y+=da*.2;
  let att=0;(G.fx||[]).forEach(f=>{if(Math.abs(f.x0-u.x)<.15&&Math.abs(f.y0-u.y)<.15)att=1});
  if(u.pv<=0){clip367(o,'chute_mort',true);o.an.visible=false}else{const b=BTU.U&&BTU.U[u.k]||{};clip367(o,u.peur>0?'marche_blesse':att?((b.po||1)>1?'fusil':'baton_coup'):d>.002?'marche':'repos_debout');o.an.scale.setScalar(.6+.4*Math.max(0,u.pv/(u.pvm||1)))}
  o.px=u.x;o.py=u.y;if(o.mx)o.mx.update(dt)});
 for(const [u,o] of B367.U)if(!L.includes(u)){B367.S.remove(o.g);B367.U.delete(u)}
 // les coups : un trait qui s'efface
 (G.fx||[]).forEach(f=>{if(f.__3)return;f.__3=1;const g=new T.BufferGeometry().setFromPoints([new T.Vector3((f.x0-4)*2,1.1,(f.y0-3)*2),new T.Vector3((f.x1-4)*2,1.1,(f.y1-3)*2)]);const l=new T.Line(g,new T.LineBasicMaterial({color:f.c||'#fff',transparent:true}));B367.S.add(l);B367.fx.push({l,t:.35})});
 B367.fx=B367.fx.filter(f=>{f.t-=dt;f.l.material.opacity=Math.max(0,f.t/.35);if(f.t<=0){B367.S.remove(f.l);return false}return true});
 // la caméra : de la vue d'ensemble (z=0) jusqu'à l'épaule du combattant suivi (z=1)
 if(B367.sel&&B367.sel.pv<=0){B367.sel=null;suivant367()}B367.zc+=(B367.z-B367.zc)*.12;const z=B367.zc,C=B367.C,o=B367.sel&&B367.U.get(B367.sel);
 const cy=B367.yaw,big=new T.Vector3(Math.sin(cy)*16,17,Math.cos(cy)*16+4),tg0=new T.Vector3(0,0,0);
 if(o&&z>.01){const a=o.g.rotation.y+Math.PI,p=o.g.position,near=new T.Vector3(p.x+Math.sin(a)*2.6,1.9,p.z+Math.cos(a)*2.6),tgn=new T.Vector3(p.x-Math.sin(a)*4,1.2,p.z-Math.cos(a)*4);
  C.position.copy(big.lerp(near,z));C.lookAt(tg0.lerp(tgn,z))}else{C.position.copy(big);C.lookAt(tg0)}
 R.render(B367.S,C)}
function fin367(){if(!B367.R)return;try{B367.R.dispose()}catch(e){}B367.R=null;B367.cv=null;B367.U.clear();B367.on=0;B367.sel=null;B367.z=B367.zc=0}
