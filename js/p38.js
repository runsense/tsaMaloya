// ===== p38 : la ville de la Construction en 3D, vue de ¾ — on la tourne, on zoome sur le pointeur, et l'on voit les gens aller travailler =====
const KV3={on:true,R:null,S:null,C:null,cv:null,az:.6,pol:.8,dist:10,tg:new THREE.Vector3(),G:null,gens:[],cle:'',t0:performance.now()};
function k3Scene(){if(KV3.R)return;const cv=document.createElement('canvas');cv.id='kC3';cv.style.cssText='position:absolute;inset:0;width:100%;height:100%;cursor:grab';KV3.cv=cv;
 const R=new THREE.WebGLRenderer({canvas:cv,antialias:true});R.outputEncoding=THREE.sRGBEncoding;KV3.R=R;const S=new THREE.Scene();S.background=new THREE.Color(0x9cc4d8).convertSRGBToLinear();S.fog=new THREE.Fog(S.background,18,40);KV3.S=S;
 KV3.C=new THREE.PerspectiveCamera(42,1,.05,200);S.add(new THREE.HemisphereLight(0xdfefff,0x5a4a30,.85));const sun=new THREE.DirectionalLight(0xfff2d8,.75);sun.position.set(-6,10,-4);S.add(sun);
 // tourner : glisser ; zoomer : molette, sur le pointeur ; choisir : clic ; que faire : clic droit
 let dn=null,mv=0;cv.addEventListener('pointerdown',e=>{dn=[e.clientX,e.clientY,e.button,KV3.az,KV3.pol];mv=0;cv.setPointerCapture(e.pointerId);cv.style.cursor='grabbing'});
 cv.addEventListener('pointermove',e=>{if(!dn)return;const dx=e.clientX-dn[0],dy=e.clientY-dn[1];if(Math.abs(dx)+Math.abs(dy)>5)mv=1;if(!mv)return;if(dn[2]===2||e.shiftKey){const s=KV3.dist*.002,ca=Math.cos(KV3.az),sa=Math.sin(KV3.az);KV3.tg.x-=(dx*ca+dy*sa)*s*.4;KV3.tg.z-=(-dx*sa+dy*ca)*s*.4;dn[0]=e.clientX;dn[1]=e.clientY}else{KV3.az=dn[3]-dx*.006;KV3.pol=Math.max(.25,Math.min(1.35,dn[4]+dy*.004))}});
 cv.addEventListener('pointerup',e=>{cv.style.cursor='grab';const d=dn;dn=null;if(!d||mv)return;const t=k3Tuile(e);if(!t)return;if(d[2]===0){KVUE.sel=t.i;kPanneau();k3Sel()}});
 cv.addEventListener('contextmenu',e=>{e.preventDefault();if(mv)return;const t=k3Tuile(e);if(!t)return;KVUE.sel=t.i;kPanneau();k3Sel();const A=$('kA'),b0=A&&A.querySelector('.pc'+(K.fin?':nth-of-type(2)':''));if(!b0)return;const Lm=[...b0.querySelectorAll('button')].filter(b=>!b.disabled).map(b=>['▸ '+b.textContent.trim().replace(/\s+/g,' ').slice(0,60),()=>b.click()]);const h=b0.querySelector('h4');menuCtx(e.clientX,e.clientY,h?h.textContent:'Ici',Lm.length?Lm:[['Rien à faire ici pour l’instant',()=>{}]])});
 cv.addEventListener('wheel',e=>{e.preventDefault();const p=k3Point(e),f=Math.exp(e.deltaY*.0012),nd=Math.max(2.5,Math.min(22,KV3.dist*f)),k=nd/KV3.dist;if(p)KV3.tg.lerp(p,1-k);KV3.dist=nd},{passive:false})}
const k3Ray=new THREE.Raycaster();
function k3Point(e){if(!KV3.sol)return null;const r=KV3.cv.getBoundingClientRect();k3Ray.setFromCamera({x:(e.clientX-r.left)/r.width*2-1,y:-(e.clientY-r.top)/r.height*2+1},KV3.C);const h=k3Ray.intersectObject(KV3.sol)[0];return h?h.point:null}
function k3Tuile(e){const p=k3Point(e);if(!p)return null;let b=null,bd=1e9;KV3.L.forEach(t=>{const d=Math.hypot(t.x-p.x,t.z-p.z);if(d<bd){bd=d;b=t}});return b}
const k3Y=(x,z)=>Math.max(0,alt(x,z))*VX*1.0;
// la scène : le relief, les arbres, les bâtiments, les champs ; refaite quand la ville change
const K3M={};function k3Lib(G){if(!G)return;G.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material&&!o.material.__partage){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose())}})}
function k3Batir(){const c=T[kCol().i],L=T.filter(t=>hd(c,t)<=3);KV3.L=L;const G=new THREE.Group(),M=col=>{if(!K3M[col]){K3M[col]=new THREE.MeshLambertMaterial({color:new THREE.Color(col).convertSRGBToLinear()});K3M[col].__partage=1}return K3M[col]},add=(g,m,x,y,z,ry)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);if(ry)o.rotation.y=ry;G.add(o);return o};
 // le sol, coloré selon la forêt et ce qu'on y fait
 const N=90,Rr=6.2,P=[],Cc=[],I=[],q=new THREE.Color();for(let j=0;j<=N;j++)for(let i=0;i<=N;i++){const x=c.x-Rr+2*Rr*i/N,z=c.z-Rr+2*Rr*j/N;P.push(x,k3Y(x,z),z);let b=null,bd=1e9;L.forEach(t=>{const d=Math.hypot(t.x-x,t.z-z);if(d<bd){bd=d;b=t}});const fo=(K.foret[b.i]||0)/100,al=Math.min(1,(b.alt||0)/2600),h=alt(x,z);
  if(h<=0)q.setRGB(.15,.4,.5);else if(b.bare)q.setRGB(.36,.32,.28);else q.setRGB(.35-.12*fo+.2*al,.45+.1*fo,.22+.1*al);const n=Math.sin(x*7)*Math.cos(z*6)*.04;q.r+=n;q.g+=n;Cc.push(q.r,q.g,q.b)}
 for(let j=0;j<N;j++)for(let i=0;i<N;i++){const a=j*(N+1)+i;I.push(a,a+N+1,a+1,a+1,a+N+1,a+N+2)}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('color',new THREE.Float32BufferAttribute(Cc,3));g.setIndex(I);g.computeVertexNormals();
 const sol=new THREE.Mesh(g,new THREE.MeshLambertMaterial({vertexColors:true}));G.add(sol);KV3.sol=sol;
 const mer=new THREE.Mesh(new THREE.PlaneGeometry(40,40),new THREE.MeshLambertMaterial({color:new THREE.Color(0x1d5a78).convertSRGBToLinear(),transparent:true,opacity:.9}));mer.rotation.x=-Math.PI/2;mer.position.set(c.x,.01,c.z);G.add(mer);
 // les arbres, selon la forêt qui reste
 const tr=M(0x4a3420),fe=[M(0x2f6a38),M(0x3c7a40),M(0x24502e)],gt=new THREE.CylinderGeometry(.015,.025,.16,5),gf=new THREE.IcosahedronGeometry(.09,0);
 {const P=[];L.forEach(t=>{const fo=(K.foret[t.i]||0)/100,B=K.b[t.i]||[],n=Math.round(fo*(B.length?5:16));for(let k=0;k<n;k++){const a=kH(t.i,k)*6.283,d=Math.sqrt(kH(t.i,k+50))*.85,x=t.x+Math.cos(a)*d,z=t.z+Math.sin(a)*d;if(alt(x,z)<=2)continue;P.push([x,k3Y(x,z),z,.8+kH(t.i,k+9)*.6,k%3])}});
  const iT=new THREE.InstancedMesh(gt,tr,Math.max(1,P.length)),iF=new THREE.InstancedMesh(gf,new THREE.MeshLambertMaterial({color:0xffffff}),Math.max(1,P.length)),m4=new THREE.Matrix4(),q=new THREE.Quaternion(),cF=[new THREE.Color(0x2f6a38),new THREE.Color(0x3c7a40),new THREE.Color(0x24502e)].map(c=>c.convertSRGBToLinear());
  P.forEach(([x,y,z,s,v],i)=>{m4.compose(new THREE.Vector3(x,y+.08*s,z),q,new THREE.Vector3(s,s,s));iT.setMatrixAt(i,m4);m4.compose(new THREE.Vector3(x,y+.2*s,z),q,new THREE.Vector3(s,s*.9,s));iF.setMatrixAt(i,m4);iF.setColorAt(i,cF[v])});iT.count=iF.count=P.length;G.add(iT);G.add(iF);if(typeof k3Arbres==='function')k3Arbres(P,G,iT,iF)}
 // les bâtiments
 const maison=(x,z,w,d,h,mur,toit,ry)=>{const y=k3Y(x,z);add(new THREE.BoxGeometry(w,h,d),M(mur),x,y+h/2,z,ry);const t=add(new THREE.ConeGeometry(Math.max(w,d)*.75,h*.8,4),M(toit),x,y+h+h*.4,z,(ry||0)+Math.PI/4);t.scale.set(1,1,d/w)};
 const kase=(x,z,r)=>{const y=k3Y(x,z);add(new THREE.CylinderGeometry(r,r*1.05,r*1.1,9),M(0x9a7a4a),x,y+r*.55,z);add(new THREE.ConeGeometry(r*1.4,r*1.2,9),M(0xc8a860),x,y+r*1.6,z)};
 const champ=(x,z,w,d,col,ry)=>{const y=k3Y(x,z);const o=add(new THREE.BoxGeometry(w,.015,d),M(col),x,y+.01,z,ry);for(let k=0;k<5;k++){const r=add(new THREE.BoxGeometry(w*.95,.025,d*.06),M(col===0xc9a64e?0xa8862e:0x4f7a32),x,y+.02,z-d*.4+k*d*.2,ry)}};
 const meule=(x,z)=>{const y=k3Y(x,z);add(new THREE.CylinderGeometry(.04,.05,.06,8),M(0xe2c66a),x,y+.03,z);add(new THREE.ConeGeometry(.05,.05,8),M(0xd8b858),x,y+.085,z)};
 KV3.lieux=[];L.forEach(t=>{const B=K.b[t.i]||[],tr2=K.trav[t.i]||{},ry=(kH(t.i,3)-.5)*.8;let x=t.x,z=t.z;
  B.forEach((b,n)=>{const ox=x+(n%2?.35:-.25),oz=z+(n>1?.3:-.15);if(b.f!==K.joueur&&b.f!=='c'&&b.f!=='m'){}
   if(b.k==='habitation'){k3M('habitation',ox,oz,.3,ry,G)||maison(ox,oz,.34,.22,.16,0xe0d6c0,0x9a4a3a,ry);for(let i=0;i<3;i++)k3M('case_paille',ox-.25+i*.12,oz+.28,.1,ry,G)||maison(ox-.25+i*.12,oz+.28,.08,.07,.06,0xb89a70,0x7a6a5a,ry);champ(ox+.4,oz-.1,.3,.25,0x6b4a2a,ry);champ(ox+.4,oz+.22,.3,.2,0xc9a64e,ry);meule(ox+.15,oz+.4);meule(ox+.25,oz+.43)}
   else if(b.k==='chapelle'&&k3M('chapelle',ox,oz,.36,ry,G)){}else if(b.k==='chapelle'){maison(ox,oz,.14,.24,.16,0xe8e0d0,0xb8b0a0,ry);add(new THREE.BoxGeometry(.06,.18,.06),M(0xe8e0d0),ox,k3Y(ox,oz)+.25,oz-.1)}
   else if(b.k==='magasin'&&k3M('magasin',ox,oz,.22,ry,G)){}else if(b.k==='magasin')maison(ox,oz,.3,.13,.1,0xa89070,0x6a5a4a,ry);
   else if(b.k==='ville'){for(let i=0;i<7;i++){const a=i/7*6.283+kH(t.i,i);maison(ox+Math.cos(a)*.3,oz+Math.sin(a)*.3,.12,.1,.1,i%2?0xe0d6c0:0xd0c4a8,i%2?0x9a4a3a:0x7a5a4a,a)}}
   else if(b.k==='port'&&k3M('port',ox+.2,oz+.3,.12,ry,G,1)){}else if(b.k==='port'){const y=k3Y(ox,oz);add(new THREE.BoxGeometry(.06,.02,.6),M(0x8a6a42),ox+.2,Math.max(.02,y)+.01,oz+.3)}
   else if(b.k==='route'){}
   else if(b.k==='champ')champ(ox,oz,.5,.35,0x2f5a2a,ry);
   else if(b.k==='camp'){for(let i=0;i<5;i++){const a=i/5*6.283;k3M('case_paille',ox+Math.cos(a)*.22,oz+Math.sin(a)*.22,.13,a+Math.PI,G)||kase(ox+Math.cos(a)*.22,oz+Math.sin(a)*.22,.06)}add(new THREE.SphereGeometry(.025,6,5),new THREE.MeshBasicMaterial({color:0xffa030}),ox,k3Y(ox,oz)+.03,oz)}
   else if(b.k==='jardin'){champ(ox,oz,.22,.2,0x3f7a32,ry);champ(ox+.25,oz+.1,.18,.18,0x6b4a2a,ry)}
   else if(b.k==='grenier'&&k3M('grenier',ox,oz,.2,ry,G)){}else if(b.k==='grenier')kase(ox,oz,.05);
   else if(b.k==='guet'){const y=k3Y(ox,oz);add(new THREE.BoxGeometry(.05,.3,.05),M(0x7a5a32),ox,y+.15,oz);add(new THREE.BoxGeometry(.1,.03,.1),M(0x5a4030),ox,y+.31,oz)}
   else if(b.k==='sentier'){}});
  if(tr2.culture&&!B.length){champ(x-.15,z,.3,.3,0x6b4a2a,ry);champ(x+.2,z,.25,.3,0xc9a64e,ry);meule(x+.25,z+.25)}
  if(B.length)KV3.lieux.push({t,x,z,maison:1});Object.entries(tr2).forEach(([k,n])=>{if(n>0)KV3.lieux.push({t,x,z,act:k,n})})});
 // les chemins : du cœur de la ville à chaque lieu bâti
 L.forEach(t=>{if(t===c||!(K.b[t.i]||[]).length)return;const pts=[],Ld=Math.hypot(t.x-c.x,t.z-c.z)||1,ph=t.i*.7;for(let s=0;s<=16;s++){const u=s/16,w=Math.sin(u*Math.PI)*(Math.sin(u*7+ph)*.12+Math.sin(u*17+ph)*.03)*Math.min(1,Ld),x=c.x+(t.x-c.x)*u-(t.z-c.z)/Ld*w,z=c.z+(t.z-c.z)*u+(t.x-c.x)/Ld*w;pts.push(new THREE.Vector3(x,k3Y(x,z)+.012,z))}const rt=(K.b[t.i]||[]).some(b=>b.k==='route');G.add(new THREE.Mesh(ruban97(new THREE.CatmullRomCurve3(pts).getPoints(40),rt?.09:.05,y=>k3Y(y.x,y.z)+.014),matRuban110(rt?1:0)))});
 // la sélection
 KV3.selM=new THREE.Mesh(new THREE.RingGeometry(.7,.78,32),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.8,side:THREE.DoubleSide}));KV3.selM.rotation.x=-Math.PI/2;KV3.selM.visible=false;G.add(KV3.selM);
 if(KV3.G){KV3.S.remove(KV3.G);k3Lib(KV3.G)}KV3.S.add(G);KV3.G=G;KV3.tg.set(c.x,k3Y(c.x,c.z),c.z);k3Gens();k3Sel()}
function k3Sel(){const m=KV3.selM;if(!m)return;const t=KVUE.sel!=null?T[KVUE.sel]:null;m.visible=!!t&&KV3.L.includes(t);if(t)m.position.set(t.x,k3Y(t.x,t.z)+.03,t.z)}
// les gens : de leur maison à leur travail, puis le travail sur place
function k3Gens(){KV3.gens.forEach(g=>KV3.G.remove(g.o));KV3.gens=[];const home=KV3.lieux.filter(l=>l.maison),work=KV3.lieux.filter(l=>l.act),c=T[kCol().i],H=home.length?home:[{x:c.x,z:c.z}];const n=Math.min(40,Math.max(4,Math.round(kOccupes()/2)));
 const corps=new THREE.CylinderGeometry(.012,.016,.05,5),tete=new THREE.SphereGeometry(.012,6,5),cols=K.joueur==='c'?[0xe8e0d0,0xb8a080,0x8a6a4a]:[0xa0603a,0x7a4a2a,0xd8b070];
 for(let i=0;i<n;i++){const o=new THREE.Group(),m=new THREE.MeshLambertMaterial({color:new THREE.Color(cols[i%3]).convertSRGBToLinear()});const b=new THREE.Mesh(corps,m);b.position.y=.025;o.add(b);const h=new THREE.Mesh(tete,new THREE.MeshLambertMaterial({color:new THREE.Color(K.joueur==='c'&&i%3===0?0xd8b090:0x6a4028).convertSRGBToLinear()}));h.position.y=.062;o.add(h);KV3.G.add(o);
  const w=work.length?work[i%work.length]:null,h0=H[i%H.length];KV3.gens.push({o,h:{x:h0.x+(kH(i,1)-.5)*.3,z:h0.z+(kH(i,2)-.5)*.3},w:w?{x:w.x+(kH(i,3)-.5)*.5,z:w.z+(kH(i,4)-.5)*.5,act:w.act}:null,ph:kH(i,5)})}}
function k3Boucle(){requestAnimationFrame(k3Boucle);const d=$('kons'),cv=KV3.cv;if(!K||!d||d.hidden||K.vue!=='ville'||!KV3.on||!cv||!cv.isConnected)return;const W=cv.clientWidth,H=cv.clientHeight;if(!W)return;
 const cle=K.cur+'|'+JSON.stringify(K.b).length+'|'+JSON.stringify(K.trav).length+'|'+K.an;if(cle!==KV3.cle){KV3.cle=cle;k3Batir()}
 KV3.R.setSize(W,H,false);KV3.C.aspect=W/H;KV3.C.updateProjectionMatrix();const t=KV3.tg,r=KV3.dist;KV3.C.position.set(t.x+Math.sin(KV3.az)*Math.sin(KV3.pol)*r,t.y+Math.cos(KV3.pol)*r,t.z+Math.cos(KV3.az)*Math.sin(KV3.pol)*r);KV3.C.lookAt(t);
 // la journée d'un mois : aller, travailler, rentrer — rien ne bouge en pause
 if(!window.PAUSEJ){const u=((performance.now()-KV3.t0)/9000)%1;KV3.gens.forEach(g=>{const p=(u+g.ph)%1;let x,z,bob=0;if(!g.w){const a=p*6.283;x=g.h.x+Math.cos(a)*.15;z=g.h.z+Math.sin(a)*.15}else if(p<.25){const v=p/.25;x=g.h.x+(g.w.x-g.h.x)*v;z=g.h.z+(g.w.z-g.h.z)*v;bob=Math.abs(Math.sin(p*120))*.008}else if(p<.75){x=g.w.x+Math.sin(p*40+g.ph*9)*.02;z=g.w.z;bob=Math.abs(Math.sin(p*90))*.012}else{const v=(p-.75)/.25;x=g.w.x+(g.h.x-g.w.x)*v;z=g.w.z+(g.h.z-g.w.z)*v;bob=Math.abs(Math.sin(p*120))*.008}
  const px=g.o.position.x,pz=g.o.position.z;g.o.position.set(x,k3Y(x,z)+bob,z);if(Math.hypot(x-px,z-pz)>.001)g.o.rotation.y=Math.atan2(x-px,z-pz)})}
 KV3.R.render(KV3.S,KV3.C)}
requestAnimationFrame(k3Boucle);
// la vue 3D remplace le plan dans la ville ; un bouton permet de revenir au plan
{const kc=kCarte;kCarte=function(cu){kc.apply(this,arguments);const c2=$('kC');if(!c2)return;const box=c2.parentElement;const v=K&&K.vue==='ville'&&KV3.on;k3Scene();if(v&&!KV3.cv.isConnected){box.style.position='relative';box.insertBefore(KV3.cv,c2.nextSibling);KV3.cle=''}
 if(KV3.cv.isConnected){KV3.cv.style.display=v?'':'none';KV3.cv.style.width=c2.clientWidth+'px';KV3.cv.style.right='';}k3Sel();
 let b=$('k3B');if(!b&&box){b=document.createElement('button');b.id='k3B';b.className='bt sec';b.style.cssText='position:absolute;left:10px;bottom:10px;z-index:3';box.appendChild(b);b.onclick=()=>{KV3.on=!KV3.on;kCarte()}}if(b){b.style.display=K&&K.vue==='ville'?'':'none';b.textContent=KV3.on?'🗺️ Plan':'🏘️ Vue 3D'}}}
