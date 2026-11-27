
// ===== p178 : le songe du gramoun refait — une vraie route de montagne, lisible, qu'on peut conduire =====
// Le relief au bord de la route est lisse (talus côté montagne, ravine côté vide), la caméra regarde devant dans le virage,
// la voiture accélère franchement, des chevrons annoncent les épingles, et on joue aussi au doigt.
// Le décor monte : champs de cannes en bas, forêt de fanjans et tamarins des Hauts, puis la Plaine des Sables, rouge, sans arbres.
function rallyeJeu(fin){window.BTUON=1;window.FILM=1;
 const d=document.createElement('div');d.id='rallye';d.style.cssText='position:fixed;inset:0;z-index:96;background:#000;user-select:none;touch-action:none';document.body.appendChild(d);
 const cv=document.createElement('canvas');cv.style.cssText='width:100%;height:100%;display:block';d.appendChild(cv);
 // un voile de rêve : bords sépia, légèrement flous
 const voile=document.createElement('div');voile.style.cssText='position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 55%,rgba(70,45,20,.55) 100%);box-shadow:inset 0 0 90px rgba(60,40,20,.6)';d.appendChild(voile);
 const hud=document.createElement('div');hud.style.cssText='position:absolute;left:0;right:0;top:12px;text-align:center;color:#f2ead6;font:700 15px Montserrat,system-ui;letter-spacing:.08em;text-shadow:0 2px 4px #000;pointer-events:none';d.appendChild(hud);
 const msg=document.createElement('div');msg.style.cssText='position:absolute;left:0;right:0;top:38%;text-align:center;color:#f7ecd2;font:italic 600 22px Alegreya,Georgia,serif;text-shadow:0 2px 8px #000;pointer-events:none;transition:opacity 1s;padding:0 16px';d.appendChild(msg);
 const dire=(t,ms)=>{msg.innerHTML=t;msg.style.opacity=1;clearTimeout(dire.h);dire.h=setTimeout(()=>msg.style.opacity=0,ms||2200)};
 const R=new THREE.WebGLRenderer({canvas:cv,antialias:true});R.outputEncoding=THREE.sRGBEncoding;R.setPixelRatio(Math.min(2,devicePixelRatio||1));
 const sc=new THREE.Scene();const ciel=new THREE.Color(0xa9cfe0);sc.background=ciel;sc.fog=new THREE.Fog(0xbfd6de,40,190);
 const cam=new THREE.PerspectiveCamera(58,1,.1,600);sc.add(new THREE.HemisphereLight(0xfff6e6,0x55603e,.9));const sun=new THREE.DirectionalLight(0xfff0d8,.75);sun.position.set(40,80,-20);sc.add(sun);
 // ---- la route : virages doux et épingles, toujours en montée, plat sur la fin (la Plaine des Sables)
 const N=74,ESP=14,W=7.5,P=[];let x=0,z=0,a=0,y=0;
 for(let i=0;i<N;i++){const e=(i>8&&i<16)||(i>34&&i<40)||(i>52&&i<57);a+=Math.sin(i*.42)*.26+Math.sin(i*1.21)*.07+(e?(Math.floor(i/10)%2?.38:-.38):0);x+=Math.sin(a)*ESP;z+=Math.cos(a)*ESP;y+=i<N*.72?1.25:.12;P.push(new THREE.Vector3(x,y,z))}
 const C=new THREE.CatmullRomCurve3(P,false,'centripetal'),pas=900;
 const RP=[],RT=[],RN=[],RK=[];for(let i=0;i<=pas;i++){const u=i/pas,p=C.getPointAt(u),t=C.getTangentAt(u);t.y=0;t.normalize();RP.push(p);RT.push(t);RN.push(new THREE.Vector3(t.z,0,-t.x))}
 for(let i=0;i<=pas;i++){const a2=RT[Math.max(0,i-6)],b2=RT[Math.min(pas,i+6)];RK.push(a2.x*b2.z-a2.z*b2.x)}// courbure signée
 // le côté « montagne » : celui de l'intérieur du virage général ; le relief monte d'un côté et tombe de l'autre
 const bruit=(i,o)=>Math.sin(i*.031+o*.07)*2.2+Math.sin(i*.093-o*.13)*1.1+Math.sin(i*.007)*3;
 const cote=i=>Math.sin(i*.004+1)>0?1:-1;
 function hSol(i,o){const ao=Math.abs(o)-W/2-1.2;if(ao<=0)return -.05;const s=Math.sign(o)*cote(i);const pente=s>0?.55:-.42;return ao*pente*Math.min(1,ao/6)+bruit(i,o)*Math.min(1,ao/10)-.05}
 const OFF=[-34,-24,-16,-10,-6.5,-W/2-1.2,-W/2-.3,W/2+.3,W/2+1.2,6.5,10,16,24,34];
 const couleur=(u,o,h,q)=>{const ao=Math.abs(o);if(ao<W/2+1.3){q.setRGB(.36,.33,.28);return}// bas-côté de terre
  if(u>.74){const k=.4+Math.sin(o*.3+u*90)*.04;q.setRGB(k,.17+Math.max(0,.1-u*.05),.12);return}// scories rouges
  if(u<.18){q.setRGB(.42+Math.sin(o+u*200)*.03,.55,.24);return}// cannes, vert clair
  q.setRGB(.15+Math.sin(o*.5+u*80)*.03,.33+Math.sin(u*120+o)*.04,.17)};
 {const pos=[],col=[],idx=[],q=new THREE.Color(),nc=OFF.length;for(let i=0;i<=pas;i++){const p=RP[i],n=RN[i],u=i/pas;OFF.forEach(o=>{const h=hSol(i,o);pos.push(p.x+n.x*o,p.y+h,p.z+n.z*o);couleur(u,o,h,q);col.push(q.r,q.g,q.b)});if(i<pas)for(let k=0;k<nc-1;k++){const s=i*nc+k;idx.push(s,s+nc,s+1,s+1,s+nc,s+nc+1)}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.setIndex(idx);g.computeVertexNormals();sc.add(new THREE.Mesh(g,new THREE.MeshLambertMaterial({vertexColors:true,side:THREE.DoubleSide})))}
 // asphalte + lignes : bords blancs continus, axe en tirets
 {const pos=[],col=[],idx=[];for(let i=0;i<=pas;i++){const p=RP[i],n=RN[i];[-W/2,W/2].forEach(o=>pos.push(p.x+n.x*o,p.y+.02,p.z+n.z*o));const g=(i%30<15)?.27:.25;col.push(g,g,g*1.03,g,g,g*1.03);if(i<pas){const b=i*2;idx.push(b,b+2,b+1,b+1,b+2,b+3)}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.setIndex(idx);g.computeVertexNormals();sc.add(new THREE.Mesh(g,new THREE.MeshLambertMaterial({vertexColors:true})))}
 const ligne=(o,lg,tiret,c)=>{const pos=[],idx=[];let n0=0;for(let i=0;i<pas;i++){if(tiret&&(i%8>3))continue;const A=RP[i],B=RP[i+1],nA=RN[i],nB=RN[i+1];pos.push(A.x+nA.x*(o-lg),A.y+.04,A.z+nA.z*(o-lg),A.x+nA.x*(o+lg),A.y+.04,A.z+nA.z*(o+lg),B.x+nB.x*(o-lg),B.y+.04,B.z+nB.z*(o-lg),B.x+nB.x*(o+lg),B.y+.04,B.z+nB.z*(o+lg));idx.push(n0,n0+2,n0+1,n0+1,n0+2,n0+3);n0+=4}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();sc.add(new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:c})))};
 ligne(-W/2+.25,.09,false,0xe8e4d8);ligne(W/2-.25,.09,false,0xe8e4d8);ligne(0,.07,true,0xe8d070);
 // un grand sol sous tout, qui suit la voiture, pour ne jamais voir le vide
 const sous=new THREE.Mesh(new THREE.PlaneGeometry(1400,1400),new THREE.MeshLambertMaterial({color:0x4f6a40}));sous.rotation.x=-Math.PI/2;sc.add(sous);
 // au loin, le volcan : un grand cône brun-rouge au bout de la route
 {const fin2=RP[pas],t=RT[pas];const v=new THREE.Mesh(new THREE.ConeGeometry(160,95,24,1,true),new THREE.MeshLambertMaterial({color:0x6a4436}));v.position.set(fin2.x+t.x*260,fin2.y+20,fin2.z+t.z*260);sc.add(v);
  const v2=new THREE.Mesh(new THREE.ConeGeometry(260,70,20,1,true),new THREE.MeshLambertMaterial({color:0x51603f}));v2.position.set(fin2.x-t.x*40+RN[pas].x*320,fin2.y-10,fin2.z-t.z*40+RN[pas].z*320);sc.add(v2)}
 // ---- le décor, par étage
 const M=c=>new THREE.MeshLambertMaterial({color:c});const mTr=M(0x3a2a1c),mFr=M(0x2f7a46),mTa=M(0x3d6a35),mCa=M(0x7fa548),mLa=M(0x2a2020),mBo=M(0xf0ece0),mRo=M(0xd0402a);
 const deco=new THREE.Group();sc.add(deco);const place=(i,o)=>{const p=RP[i],n=RN[i];return new THREE.Vector3(p.x+n.x*o,p.y+hSol(i,o),p.z+n.z*o)};
 const ri=(a,b)=>a+Math.random()*(b-a);
 for(let k=0;k<420;k++){const i=Math.floor(Math.random()*pas),u=i/pas,o=(Math.random()<.5?-1:1)*ri(W/2+3,30),q=place(i,o);
  if(u<.18){// cannes : touffes hautes, serrées
   const c=new THREE.Mesh(new THREE.ConeGeometry(.9,2.6,5),mCa);c.position.copy(q);c.position.y+=1.2;deco.add(c)}
  else if(u<.5){// fanjans (fougères arborescentes)
   const f=new THREE.Group();const tr=new THREE.Mesh(new THREE.CylinderGeometry(.13,.2,3,5),mTr);tr.position.y=1.5;f.add(tr);for(let j=0;j<7;j++){const fr=new THREE.Mesh(new THREE.BoxGeometry(2.4,.05,.45),mFr);fr.position.set(Math.cos(j*.9)*1,3,Math.sin(j*.9)*1);fr.rotation.set(0,-j*.9,.38);f.add(fr)}f.position.copy(q);f.rotation.y=Math.random()*6;deco.add(f)}
  else if(u<.74){// tamarins des Hauts : tronc tordu, couronne plate
   if(Math.random()<.35)continue;const f=new THREE.Group();const tr=new THREE.Mesh(new THREE.CylinderGeometry(.18,.3,3.6,5),mTr);tr.position.y=1.8;tr.rotation.z=ri(-.3,.3);f.add(tr);const co=new THREE.Mesh(new THREE.SphereGeometry(2.2,7,5),mTa);co.scale.y=.45;co.position.y=3.8;f.add(co);f.position.copy(q);deco.add(f)}
  else{// Plaine des Sables : seulement des blocs de lave
   if(Math.random()<.5)continue;const r=new THREE.Mesh(new THREE.DodecahedronGeometry(ri(.4,1.6),0),mLa);r.position.copy(q);r.position.y+=.3;r.rotation.set(ri(0,3),ri(0,3),0);deco.add(r)}}
 // bornes blanches à tête rouge tous les 40 m, et chevrons à l'extérieur des épingles
 for(let i=0;i<pas;i+=Math.round(pas/((N*ESP)/40))){[-1,1].forEach(s=>{const q=place(i,s*(W/2+.7));const b=new THREE.Mesh(new THREE.BoxGeometry(.25,.7,.25),mBo);b.position.copy(q);b.position.y+=.35;deco.add(b);const t=new THREE.Mesh(new THREE.BoxGeometry(.26,.15,.26),mRo);t.position.copy(q);t.position.y+=.75;deco.add(t)})}
 const chev=[];for(let i=20;i<pas-10;i+=6){const k=RK[i];if(Math.abs(k)<.11)continue;const s=k>0?-1:1;// panneau sur l'extérieur
  const q=place(i,s*(W/2+1.4));const g=new THREE.Group();const pl=new THREE.Mesh(new THREE.BoxGeometry(1.1,.7,.06),M(0xf2f0e8));g.add(pl);const ch=new THREE.Mesh(new THREE.BoxGeometry(.5,.12,.07),mRo);ch.rotation.z=s>0?-.8:.8;ch.position.set(.1*s,.1,0);g.add(ch);const ch2=ch.clone();ch2.rotation.z=-ch.rotation.z;ch2.position.y=-.1;g.add(ch2);
  const pi=new THREE.Mesh(new THREE.BoxGeometry(.08,.9,.08),M(0x666666));pi.position.y=-.8;g.add(pi);g.position.copy(q);g.position.y+=1.25;g.rotation.y=Math.atan2(RT[i].x,RT[i].z)+Math.PI;deco.add(g);chev.push(i)}
 // ---- les portes : passer ENTRE les poteaux, sinon elle reste rouge et ne rend pas de temps
 const NP=12,portes=[];for(let j=1;j<=NP;j++){const u=j/(NP+.6),i=Math.round(u*pas),p=RP[i],t=RT[i],g=new THREE.Group();[-1,1].forEach(s=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,3.4,6),M(0xe8be5a));m.position.set(s*(W/2+.4),1.7,0);g.add(m)});const ba=new THREE.Mesh(new THREE.BoxGeometry(W+1,.35,.12),M(0xe8be5a));ba.position.y=3.4;g.add(ba);g.position.copy(p);g.rotation.y=Math.atan2(t.x,t.z);sc.add(g);portes.push({u,i,g,etat:0})}
 // ---- la voiture : une petite berline des années 60, rouge, avec phares
 const car=new THREE.Group();{const ca=new THREE.Mesh(new THREE.BoxGeometry(1.7,.5,3.6),M(0xc8361e));ca.position.y=.6;car.add(ca);const ca2=new THREE.Mesh(new THREE.BoxGeometry(1.72,.18,3.62),M(0xe8e2d0));ca2.position.y=.38;car.add(ca2);
  const hab=new THREE.Mesh(new THREE.BoxGeometry(1.45,.5,1.7),M(0x283440));hab.position.set(0,1.1,-.25);car.add(hab);const toit=new THREE.Mesh(new THREE.BoxGeometry(1.5,.08,1.75),M(0xc8361e));toit.position.set(0,1.38,-.25);car.add(toit);
  [-.55,.55].forEach(px=>{const f=new THREE.Mesh(new THREE.BoxGeometry(.3,.18,.05),new THREE.MeshBasicMaterial({color:0xfff2c0}));f.position.set(px,.65,1.81);car.add(f);const r=new THREE.Mesh(new THREE.BoxGeometry(.3,.14,.05),new THREE.MeshBasicMaterial({color:0xff3a20}));r.position.set(px,.65,-1.81);car.add(r)})}
 const roues=[];[[-.86,1.15],[.86,1.15],[-.86,-1.15],[.86,-1.15]].forEach(([wx,wz])=>{const w=new THREE.Mesh(new THREE.CylinderGeometry(.36,.36,.28,12),M(0x151515));w.rotation.z=Math.PI/2;w.position.set(wx,.36,wz);car.add(w);roues.push(w)});sc.add(car);
 const pous=[];for(let k=0;k<24;k++){const m=new THREE.Mesh(new THREE.SphereGeometry(.25,5,4),new THREE.MeshBasicMaterial({color:0xb08a68,transparent:true,opacity:0}));sc.add(m);pous.push({m,v:0})}let pk=0;
 // ---- état
 const st={i:0,v:0,cap:Math.atan2(RT[0].x,RT[0].z),temps:28,porte:0,rate:0,fin:false,keys:{},der:performance.now(),x:RP[0].x,z:RP[0].z,y:RP[0].y,lat:0,camP:null,depart:performance.now()+2600};
 window.RAL178={st,RP,RT,RN,pas};const kd=e=>{st.keys[e.key.toLowerCase()]=1;if(e.key==='Escape')quitter(false);if([' ','arrowup','arrowdown','arrowleft','arrowright'].includes(e.key.toLowerCase()))e.preventDefault()},ku=e=>{st.keys[e.key.toLowerCase()]=0};addEventListener('keydown',kd);addEventListener('keyup',ku);
 // ---- commandes au doigt
 const pad=document.createElement('div');pad.style.cssText='position:absolute;left:0;right:0;bottom:14px;display:flex;justify-content:space-between;padding:0 16px;pointer-events:none';d.appendChild(pad);
 const bt=(t,k)=>{const b=document.createElement('button');b.textContent=t;b.style.cssText='pointer-events:auto;width:68px;height:58px;margin:0 4px;border-radius:12px;border:1px solid rgba(255,255,255,.35);background:rgba(20,15,10,.45);color:#f2ead6;font:700 18px Montserrat,system-ui;touch-action:none';const on=e=>{e.preventDefault();st.keys[k]=1},off=e=>{e.preventDefault();st.keys[k]=0};b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off);return b};
 const gG=document.createElement('div'),gD=document.createElement('div');gG.append(bt('◀','arrowleft'),bt('▶','arrowright'));gD.append(bt('frein','arrowdown'),bt('▲','arrowup'));gG.style.display=gD.style.display='flex';pad.append(gG,gD);
 const qb=document.createElement('button');qb.textContent='Se réveiller';qb.style.cssText='position:absolute;right:12px;top:10px;padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.3);background:rgba(20,15,10,.45);color:#f2ead6;font:600 12px Montserrat,system-ui';qb.onclick=()=>quitter(false);d.appendChild(qb);
 function proche(x,z){let bi=st.i,bd=1e9;for(let k=-40;k<=60;k++){const i=Math.min(pas,Math.max(0,st.i+k)),p=RP[i],dd=(p.x-x)**2+(p.z-z)**2;if(dd<bd){bd=dd;bi=i}}const p=RP[bi],n=RN[bi];return [bi,(x-p.x)*n.x+(z-p.z)*n.z]}
 function quitter(gagne){if(st.fin)return;st.fin=true;removeEventListener('keydown',kd);removeEventListener('keyup',ku);setTimeout(()=>{R.dispose();sc.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)o.material.dispose()});d.remove();window.BTUON=0;window.FILM=0;if(fin)fin(gagne)},gagne===false&&st.v===0?0:2600)}
 dire('Le gramoun s’endort sous le tamarin…<br><small style="font-size:15px">3 · 2 · 1</small>',2400);
 const tmp=new THREE.Vector3();let tPrec=0;
 function boucle(){if(st.fin&&!st.fige)return;requestAnimationFrame(boucle);const now=performance.now(),dt=Math.min(.05,(now-st.der)/1000);st.der=now;const K=st.keys,ang=typeof passageAnglais==='function'&&passageAnglais();
  const go=now>st.depart&&!st.fige;
  const av=go&&(K.arrowup||K[ang?'w':'z']||K.w),ar=go&&(K.arrowdown||K.s),ga=K.arrowleft||K[ang?'a':'q']||K.a,dr=K.arrowright||K.d,fm=go&&K[' '];
  const [i,lat]=proche(st.x,st.z);st.i=i;st.lat=lat;const hors=Math.abs(lat)>W/2+.4,loin=Math.abs(lat)>W/2+6;
  // moteur : 0 à 100 km/h en 4 s environ, 125 km/h au plus sur la route, 45 hors route
  const vmax=hors?12.5:34.7;st.v+=(av?10:0)*dt-(ar?(st.v>0?22:6):0)*dt;st.v-=st.v*(av?10/vmax:.45)*dt;if(hors)st.v-=st.v*1.6*dt;if(fm)st.v-=st.v*1.4*dt;st.v=Math.max(-6,Math.min(vmax,st.v));
  const tourne=(ga?1:0)-(dr?1:0);st.cap+=tourne*dt*(1.25+(fm?.9:0))*Math.min(1,Math.abs(st.v)/7)*Math.sign(st.v||1);
  st.x+=Math.sin(st.cap)*st.v*dt;st.z+=Math.cos(st.cap)*st.v*dt;
  // trop loin dans la ravine ou contre le talus : le rêve vous repose sur la route
  if(loin){const p=RP[i],n=RN[i];st.x=p.x+n.x*Math.sign(lat)*(W/2+1);st.z=p.z+n.z*Math.sign(lat)*(W/2+1);st.v*=.3;st.cap=Math.atan2(RT[i].x,RT[i].z);dire('Le rêve vous remet sur la route.',1400)}
  const p=RP[i],yS=p.y+(Math.abs(lat)>W/2+1.2?hSol(i,lat):-.03);st.y+=(yS-st.y)*Math.min(1,dt*10);
  car.position.set(st.x,st.y,st.z);car.rotation.set(0,st.cap,0);const ip=Math.min(pas,i+4);car.rotateX(-Math.atan2(RP[ip].y-p.y,ESP*4*(pas>0?N/pas:1)));car.rotateZ(tourne*Math.min(.06,Math.abs(st.v)*.003));
  roues.forEach(w=>w.rotation.x+=st.v*dt/.36);
  // poussière en dérapage ou hors route
  if((hors||fm)&&Math.abs(st.v)>4){const q=pous[pk++%pous.length];q.m.position.set(st.x-Math.sin(st.cap)*1.8,st.y+.3,st.z-Math.cos(st.cap)*1.8);q.m.material.opacity=.55;q.m.scale.setScalar(1);q.m.material.color.set(i/pas>.74?0x8a4030:0xb08a68)}
  pous.forEach(q=>{if(q.m.material.opacity>0){q.m.material.opacity=Math.max(0,q.m.material.opacity-dt*.8);q.m.scale.multiplyScalar(1+dt*1.5);q.m.position.y+=dt*.6}});
  // caméra : derrière, un peu haut, qui regarde le point de la route où l'on sera dans une seconde
  const vise=Math.min(pas,i+Math.round(Math.max(18,Math.abs(st.v)*1.6)/(ESP*N/pas)));const cible=tmp.set(RP[vise].x*.55+st.x*.45,RP[vise].y*.4+st.y*.6+1,RP[vise].z*.55+st.z*.45);
  const bx=st.x-Math.sin(st.cap)*9.5,bz=st.z-Math.cos(st.cap)*9.5,by=Math.max(st.y+4.2,p.y+hSol(i,-0)+4.2);if(!st.camP)st.camP=new THREE.Vector3(bx,by,bz);st.camP.lerp(new THREE.Vector3(bx,by,bz),Math.min(1,dt*3.2));cam.position.copy(st.camP);cam.lookAt(cible);
  sous.position.set(st.x,st.y-14,st.z);sous.material.color.set(i/pas>.74?0x5a3a30:0x4f6a40);
  // le ciel change avec l'altitude : plus pâle et plus froid en haut
  {const k=i/pas;sc.background.setRGB(.66-k*.06,.81-k*.04,.88);sc.fog.color.setRGB(.75-k*.05,.84-k*.06,.87-k*.04)}
  portes.forEach(po=>{if(po.etat||i<po.i)return;const dans=Math.abs(lat)<W/2+.5;po.etat=dans?1:2;po.g.children.forEach(m=>m.material.color.set(dans?0x7fc36a:0xc8402a));if(dans){st.temps+=4;st.porte++;dire('+4 s',700)}else{st.rate++;dire('Porte manquée',900)}});
  if(go)st.temps-=dt;const W2=cv.clientWidth,H2=cv.clientHeight;if(cv.width!==Math.floor(W2*R.getPixelRatio())||cv.height!==Math.floor(H2*R.getPixelRatio())){R.setSize(W2,H2,false);cam.aspect=W2/H2;cam.updateProjectionMatrix()}R.render(sc,cam);
  if(st.fige)return;
  const k=i/pas,lieu=k<.18?'les champs de cannes':k<.5?'la forêt des Hauts':k<.74?'les tamarins':'la Plaine des Sables';
  hud.innerHTML='PORTES '+st.porte+' / '+NP+' &nbsp; · &nbsp; TEMPS '+Math.max(0,st.temps).toFixed(1)+' s &nbsp; · &nbsp; '+Math.round(Math.abs(st.v)*3.6)+' km/h<br><small style="opacity:.75;letter-spacing:.04em">'+lieu+(hors?' — hors de la route, on ralentit':'')+'</small>';
  if(lieu!==tPrec){if(tPrec)dire(lieu.charAt(0).toUpperCase()+lieu.slice(1),1600);tPrec=lieu}
  if(i>=pas-2){st.fige=1;hud.innerHTML='';dire('Le gramoun se réveille en riant.<br><small style="font-size:15px">La Plaine des Sables, avec '+st.temps.toFixed(1)+' s d’avance · '+st.porte+' portes sur '+NP+'</small>',4000);quitter(true);setTimeout(()=>{st.fige=0;st.fin=true},2500)}
  else if(st.temps<=0){st.fige=1;hud.innerHTML='';dire('Le songe s’efface…<br><small style="font-size:15px">Le gramoun se réveille avant la fin de la course.</small>',4000);st.v=1;quitter(false);setTimeout(()=>{st.fige=0;st.fin=true},2500)}}
 boucle()}
// ===== duel : des corps articulés (jambes et bras qui bougent, coups qui partent vraiment), peau et habits séparés =====
// Héva n'est plus violette : peau brune, lamba clair. Les colons gardent l'habit de leur époque (trait2D).
const LOOK={dimitile:{peau:'#6b4630',haut:'#6b4630',torseNu:1,jambeNue:1,pagne:'#a8743a',echarpe:'#b0302a',bas:'#6b4630'},
 heva:{peau:'#74503a',haut:'#e6dcc4',robe:'#e6dcc4',bas:'#74503a',jambeNue:1,echarpe:'#8a3a6a'},
 cimendef:{peau:'#563a28',haut:'#563a28',torseNu:1,jambeNue:1,pagne:'#6a4a2a',bas:'#563a28'},
 gardien:{peau:'#b07a40',haut:'#b07a40',torseNu:1,jambeNue:1,pagne:'#e8c040',echarpe:'#c0402a',bas:'#b07a40'},
 milicien:{peau:'#d8b090',haut:'#3a5a8a',manche:1,bas:'#d8d0bc'},
 commandeur:{peau:'#7a4e34',haut:'#e2dccb',manche:1,bas:'#5a4a3a'},
 mussard:{peau:'#d0a080',haut:'#704830',manche:1,bas:'#4a3a2a'},
 anglais:{peau:'#e0b898',haut:'#b0242c',manche:1,bas:'#e8e2d4'},
 ombre:{peau:'#c8a088',haut:'#26262e',manche:1,robe:'#26262e',bas:'#26262e'},tijean:{peau:'#7a4a2a',haut:'#e0a040',manche:0,bas:'#6a3a20',jambeNue:1},grandiab:{peau:'#7a1e14',haut:'#3a1410',manche:1,bas:'#2a0e0a',echarpe:'#e04010'},kal:{peau:'#7a5a40',haut:'#3a3048',manche:1,robe:'#3a3048',bas:'#3a3048'},sitarane:{peau:'#4a2e1e',haut:'#5a1a1a',manche:1,bas:'#2a2a2a'},desbassyns:{peau:'#e0c0a0',haut:'#c0501a',manche:1,robe:'#8a3a1a',bas:'#8a3a1a'}};
function LOOKT(x,k,ap,X,Y,s){try{if(typeof trait2D==='function'&&typeof APP2!=='undefined'&&APP2[k]!=null){trait2D(x,k,X,Y,s,ap.haut);return}
 if(k==='gardien'){x.fillStyle='#e8c040';x.fillRect(X-15,Y-12,30,5);x.beginPath();x.moveTo(X-6,Y-12);x.lineTo(X,Y-24);x.lineTo(X+6,Y-12);x.fill()}
 if(k==='ombre'){x.fillStyle='#1a1a20';x.beginPath();x.arc(X,Y-2,17,Math.PI*.9,Math.PI*2.1);x.lineTo(X-s*16,Y+16);x.closePath();x.fill()}}catch(e){}}
