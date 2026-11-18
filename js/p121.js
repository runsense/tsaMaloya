
// ===== p121 : la chasse en vue personnage — les colons au fusil avec un chien qui rabat le gibier ;
// les marrons à la sagaie, sans chien, plus dur, mais la mystique les fond dans la nature. Un décor plus fin. =====
function tex121(k){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');let s=k.length*131;const R=()=>((s=(s*9301+49297)%233280)/233280);
 if(k==='sol'){x.fillStyle='#c4c4c4';x.fillRect(0,0,256,256);for(let i=0;i<5000;i++){const v=140+R()*100;x.fillStyle='rgba('+v+','+v+','+v+',.55)';x.fillRect(R()*256,R()*256,1+R()*2,1+R()*2)}for(let i=0;i<600;i++){const v=150+R()*80;x.strokeStyle='rgba('+v+','+v+','+v+',.5)';x.beginPath();const px=R()*256,py=R()*256;x.moveTo(px,py);x.lineTo(px+(R()-.5)*3,py-3-R()*6);x.stroke()}}
 else if(k==='ecorce'){x.fillStyle='#8a7a68';x.fillRect(0,0,256,256);for(let i=0;i<70;i++){const v=60+R()*60;x.fillStyle='rgba('+v+','+(v*.85|0)+','+(v*.7|0)+',.6)';x.fillRect(R()*256,0,2+R()*5,256)}}
 else{x.fillStyle='#7a9a6a';x.fillRect(0,0,256,256);for(let i=0;i<900;i++){const v=R();x.fillStyle=v<.5?'rgba(40,80,30,.5)':'rgba(170,200,120,.35)';x.beginPath();x.ellipse(R()*256,R()*256,2+R()*5,1+R()*2,R()*3,0,6.283);x.fill()}}
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.encoding=THREE.sRGBEncoding;t.anisotropy=4;return t}
function chien121(){const g=new THREE.Group(),M=new THREE.MeshLambertMaterial({color:0x7a5a3a});const c=new THREE.Mesh(new THREE.BoxGeometry(.75,.3,.25),M);c.position.y=.45;g.add(c);const t=new THREE.Mesh(new THREE.BoxGeometry(.25,.22,.2),M);t.position.set(.45,.62,0);g.add(t);const m=new THREE.Mesh(new THREE.BoxGeometry(.14,.1,.12),M);m.position.set(.6,.57,0);g.add(m);
 [[-.28,.09],[.28,.09],[-.28,-.09],[.28,-.09]].forEach(([a,b])=>{const p=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.32,5),M);p.position.set(a,.16,b);g.add(p)});const q=new THREE.Mesh(new THREE.CylinderGeometry(.03,.02,.3,5),M);q.position.set(-.45,.6,0);q.rotation.z=-.9;g.add(q);return g}
{const of=ouvrirFPS;ouvrirFPS=function(mode,t){const r=of.apply(this,arguments);try{if(!F||!F.sc)return r;
  // le décor : textures fines sur le sol, l'écorce et le feuillage, un peu de brume au sol
  F.sc.traverse(o=>{if(!o.isMesh&&!o.isInstancedMesh)return;const g=o.geometry;if(g&&g.type==='PlaneGeometry'&&o.material.vertexColors){const tx=tex121('sol');tx.repeat.set(60,60);o.material.map=tx;o.material.needsUpdate=true}
   else if(o.isInstancedMesh&&g&&g.type==='CylinderGeometry'){const tx=tex121('ecorce');tx.repeat.set(1,3);o.material.map=tx;o.material.color.multiplyScalar(1.6);o.material.needsUpdate=true}
   else if(o.isInstancedMesh&&g&&g.type==='IcosahedronGeometry'){o.geometry=new THREE.IcosahedronGeometry(1,1);const tx=tex121('feuille');tx.repeat.set(2,2);o.material.map=tx;o.material.color.multiplyScalar(1.4);o.material.needsUpdate=true}});
  // le sous-bois : touffes d'herbe et fougères au sol
  {const h=F.h,M=new THREE.Matrix4(),Q=new THREE.Quaternion(),V=new THREE.Vector3(),SC=new THREE.Vector3(),n1=t&&t.bare?60:500,n2=t&&t.forest?160:40;
   const he=new THREE.InstancedMesh(new THREE.ConeGeometry(.12,.45,4).translate(0,.22,0),new THREE.MeshLambertMaterial({color:t&&t.alt>1500?0x7a8a4a:0x5a8a3a}),n1);
   const fo=new THREE.InstancedMesh(new THREE.ConeGeometry(.55,.5,7,1,true).translate(0,.25,0),new THREE.MeshLambertMaterial({color:0x3f7a34,side:THREE.DoubleSide}),n2);
   for(let i=0;i<n1;i++){const x=(rnd()-.5)*150,z=(rnd()-.5)*150,s=.6+rnd()*.9;M.compose(V.set(x,h(x,z),z),Q.setFromAxisAngle(SC.set(0,1,0),rnd()*6),SC.set(s,s*(.8+rnd()*.6),s).clone());he.setMatrixAt(i,M)}
   for(let i=0;i<n2;i++){const x=(rnd()-.5)*150,z=(rnd()-.5)*150,s=.7+rnd()*1.2;M.compose(V.set(x,h(x,z),z),Q.setFromAxisAngle(SC.set(0,1,0),rnd()*6),SC.set(s,s*.8,s).clone());fo.setMatrixAt(i,M)}
   F.sc.add(he,fo)}
  if(F.mode!=='chasse')return r;
  if(S.voieC){ // colons : le fusil et le chien
   F.gun=true;F.colon121=1;try{F.cam.children[0].visible=false}catch(e){}F.chien=true;const d=chien121();d.position.set(F.x+2,F.h(F.x+2,F.z+1),F.z+1);F.sc.add(d);F.dog121={m:d,x:F.x+2,z:F.z+1,cible:null,t:0};
   try{const i=$('fpsi');if(i)i.innerHTML=i.innerHTML.replace('clic pour lancer','clic pour tirer, F pour le fusil ou le couteau')}catch(e){}F.msg='Le fusil chargé, le chien en avant : il va débusquer le gibier et le rabattre vers vous. Un coup, puis un long rechargement.'}
  else{ // marrons : la sagaie, sans chien ; la mystique fond le chasseur dans la nature
   F.chien=false;F.fondu121=(S.myst||0)>=8||!!(S.sv&&(S.sv.varmakalai||S.sv.tisanes));if(F.fondu121)F.msg='À la sagaie, sans chien. Les anciens vous ont appris à vous fondre dans la nature : le gibier vous sent moins.'}}catch(e){}return r}}
// le fusil des colons ne demande pas de fusil volé
{const fa=fpsArme;fpsArme=function(){if(F&&F.colon121){F.gun=!F.gun;try{F.cam.children[0].visible=!F.gun}catch(e){}fpsMsg(F.gun?'Le fusil : un coup, puis un long rechargement.':'Le couteau de chasse.');return}return fa.apply(this,arguments)}}
{const fg=fpsGibier;fpsGibier=function(dt){let nz0=null;try{if(F&&F.fondu121){nz0=F.nz;F.nz=(F.nz||0)*.55}}catch(e){}const r=fg.apply(this,arguments);try{if(nz0!=null)F.nz=nz0}catch(e){}
 try{const D=F&&F.dog121;if(D){const h=F.h;D.t+=dt;
  // le chien file vers une bête calme au loin, la contourne et la pousse vers le chasseur
  if(!D.cible||D.cible.mort){D.cible=F.an.filter(a=>!a.mort).sort((a,b)=>Math.hypot(b.x-F.x,b.z-F.z)-Math.hypot(a.x-F.x,a.z-F.z))[0]||null;D.ph=0}
  const a=D.cible;if(a){const ax=a.x-F.x,az=a.z-F.z,L=Math.hypot(ax,az)||1,bx=a.x+ax/L*4,bz=a.z+az/L*4;const tx=D.ph?a.x:bx,tz=D.ph?a.z:bz,dx=tx-D.x,dz=tz-D.z,dd=Math.hypot(dx,dz)||1,v=7.5;
   if(dd>.6){D.x+=dx/dd*v*dt;D.z+=dz/dd*v*dt}if(!D.ph&&Math.hypot(D.x-bx,D.z-bz)<1.5)D.ph=1;
   if(D.ph&&Math.hypot(D.x-a.x,D.z-a.z)<5&&L>9){a.et='rab';a.x-=ax/L*a.v*.9*dt;a.z-=az/L*a.v*.9*dt;a.dir=Math.atan2(-ax,-az);if(a.m){a.m.position.set(a.x,h(a.x,a.z),a.z);a.m.rotation.y=a.dir}}
   else if(a.et==='rab'&&L<=9){a.et='calme';D.cible=null}
   D.m.position.set(D.x,h(D.x,D.z),D.z);D.m.rotation.y=Math.atan2(-dz,dx);D.m.children[0].position.y=.45+Math.abs(Math.sin(D.t*14))*.06;
   if(rnd()<dt*.5&&D.ph)fpsMsg('Le chien aboie : il rabat le gibier vers vous.')}}}catch(e){}return r}}
// ===== Le guide (Vie et Survie) : léger tant qu'on ne le pointe pas, et il avance tout seul =====
{const st=document.createElement('style');st.textContent='#guideJ,#kTuto{opacity:.38;transition:opacity .25s}#guideJ:hover,#kTuto:hover{opacity:1}';document.head.appendChild(st)}
const G121={n:null,t:0};
setInterval(()=>{try{const b=$('guideJ');if(!b||!S){G121.n=null;return}if(G121.n!==S.guideN){G121.n=S.guideN;G121.t=performance.now();return}if(b.matches(':hover'))return;
 if(performance.now()-G121.t>14000){const s=[...b.querySelectorAll('button')].find(x=>/^Suivant/i.test(x.textContent.trim()));G121.t=performance.now();if(s)s.click()}}catch(e){}},1000);
setInterval(()=>{try{const g=$('kTuto');if(!g||typeof K==='undefined'||!K){G121.k=null;return}if(G121.k!==K.guideE){G121.k=K.guideE;G121.tk=performance.now();return}if(g.matches(':hover'))return;if(performance.now()-G121.tk>14000){K.guideE=(K.guideE||0)+1;G121.tk=performance.now();g.remove();try{kGuide()}catch(e){}}}catch(e){}},1000);
// ===== Histoire : Tab passe l'attente du conte (il choisit tout de suite, ou passe à la suite) =====
function passerAttente121(){try{if(!S||!modeHist())return;const m=$('modal');if(m&&!m.hidden&&S.evq&&S.evq.length){const id=S.evq[0],e=EV[id];let k=0;try{k=choixConte(e,id)}catch(x){}const b=$('op'+k);if(b){window.decAuto=1;try{b.click()}finally{setTimeout(()=>window.decAuto=0,50)}}toast('Le conte passe : « '+((optsDe(id,e)[k]||{}).n||'')+' ».');return}
 if(!S.autoD){S.autoD=1;try{autoBtn()}catch(x){}}proch=performance.now()+50;toast('Le conte avance.')}catch(e){}}
// ===== Les routes et chemins coloniaux : de vraies bandes de terre (ornières, cailloux, bords d'herbe), plus des traits parallèles =====
const VR121={pos:[null,null,null,null],m:[null,null,null,null]};
setInterval(()=>{try{if(!window.VOIES||typeof scene==='undefined')return;VOIES.forEach((l,k)=>{l.visible=false;const a=l.geometry.attributes.position;if(!a||a===VR121.pos[k]&&VR121.m[k])return;VR121.pos[k]=a;
 if(VR121.m[k]){scene.remove(VR121.m[k]);VR121.m[k].geometry.dispose()}const A=a.array,G=[],w=k>=2?.16:.075;
 for(let e=0;e+23<A.length;e+=24){const P=[];for(let s=0;s<4;s++)P.push({x:A[e+s*6],y:A[e+s*6+1],z:A[e+s*6+2]});P.push({x:A[e+21],y:A[e+22],z:A[e+23]});G.push(ruban97(P,w,q=>Math.max(0,alt(q.x,q.z))*VX+(k>=2?.1:.05)))}
 if(!G.length){VR121.m[k]=null;return}const g=fusion97(G),m=new THREE.Mesh(g,matRuban110(k>=2?1:0));if(k===3)m.material.color.set(0xd0ccc0);m.renderOrder=3;m.frustumCulled=false;scene.add(m);VR121.m[k]=m});
 // les chemins s'effacent de loin comme avant
 VR121.m.forEach((m,k)=>{if(m&&k<2){const o=VOIES[k].material.opacity;m.visible=o>.02;m.material.opacity=Math.min(1,o*1.15)}})}catch(e){}},700);
