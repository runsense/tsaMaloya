// ===== p330 : la chasse en personne, plus vraie. (1) Le vent : il souffle par rafales, couche les herbes, emporte des feuilles,
// fait dévier la sagaie en vol, et pousse un peu celui qui vise. Il porte aussi l'odeur : sous le vent, le gibier sent tout.
// (2) On ne chasse pas seul : deux chasseurs du camp viennent. « Rabattre » (G) : ils contournent le gibier et le poussent vers
// vous. « Lancer ensemble » (H) : à votre signal, chacun lance sa sagaie sur la bête la plus proche de lui.
// (3) Le sous-bois : fougères, troncs couchés, feuilles au sol. =====
function vent330(){if(!F)return 0;const t=F.tps||0;return Math.max(0,.35+.35*Math.sin(t*.23)+.3*Math.max(0,Math.sin(t*1.7+Math.sin(t*.5)*2)))}
{const of=ouvrirFPS;ouvrirFPS=function(mode,t){const r=of.apply(this,arguments);try{if(!F||!F.sc||F.mode!=='chasse')return r;const sc=F.sc,h=F.h;let s=7;const rn=()=>{s=(s*16807)%2147483647;return s/2147483647};
 // le sous-bois : fougères en éventail, troncs couchés
 const sh=new THREE.Shape();sh.moveTo(-.05,0);sh.quadraticCurveTo(-.2,.45,-.02,1.1);sh.lineTo(.02,1.1);sh.quadraticCurveTo(.2,.45,.05,0);const fG=new THREE.ShapeGeometry(sh,6);{const q=fG.attributes.position;for(let i=0;i<q.count;i++){const y=q.getY(i);q.setZ(i,-y*.55+y*y*.45);q.setY(i,y*.85)}fG.computeVertexNormals()}const fM=new THREE.MeshLambertMaterial({color:0x4f8a3a,side:THREE.DoubleSide});const NF=110,fe=new THREE.InstancedMesh(fG,fM,NF*5),M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),Sc=new THREE.Vector3(),c=new THREE.Color();let k=0;
 for(let i=0;i<NF;i++){const x=(rn()-.5)*150,z=(rn()-.5)*150;if(Math.hypot(x,z)<3)continue;const y=h(x,z),g=.6+rn()*.8;for(let f=0;f<5;f++){Q.setFromEuler(new THREE.Euler(0,f/5*6.283+rn()*.4,0));M.compose(P.set(x,y,z),Q,Sc.set(g,g*(.8+rn()*.4),g));fe.setMatrixAt(k,M);c.setHex([0x4f8a3a,0x3f7a30,0x6a9a44,0x8a9a48][(i+f)%4]);fe.setColorAt(k,c);k++}}
 fe.count=k;fe.instanceMatrix.needsUpdate=true;if(fe.instanceColor)fe.instanceColor.needsUpdate=true;sc.add(fe);F.fe330=fe;
 const bois=new THREE.MeshLambertMaterial({color:0x5a4430});for(let i=0;i<14;i++){const x=(rn()-.5)*130,z=(rn()-.5)*130;if(Math.hypot(x,z)<6)continue;const L=2+rn()*3,tr=new THREE.Mesh(new THREE.CylinderGeometry(.16+rn()*.1,.22+rn()*.1,L,7),bois);tr.rotation.set(Math.PI/2,0,rn()*3);tr.position.set(x,h(x,z)+.2,z);sc.add(tr);F.arb.push({x,z,r:.3})}
 // les feuilles emportées
 const N=120,pg=new THREE.BufferGeometry(),pp=new Float32Array(N*3);for(let i=0;i<N;i++){pp[i*3]=(rn()-.5)*40;pp[i*3+1]=rn()*6;pp[i*3+2]=(rn()-.5)*40}pg.setAttribute('position',new THREE.BufferAttribute(pp,3));
 const pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0x8a9a48,size:.09,transparent:true,opacity:.8,depthWrite:false}));sc.add(pts);F.fl330=pts;
 // les compagnons de chasse
 F.cp330=[];const ci=(camps()[0]||{}).i,P0=(S.pp||[]).filter(p=>typeof adulte==='function'&&adulte(p)&&!p.mort&&(p.role==='cha'||(p.sk&&p.sk.cha>=2))&&(ci==null||campDe(p)===ci)).slice(0,2);
 const noms=P0.length?P0.map(p=>p.n.split(' ')[0]):['Un chasseur','Un autre'];noms.slice(0,2).forEach((n,i)=>{const g=new THREE.Group();const cm=new THREE.Mesh(new THREE.CylinderGeometry(.2,.24,1.5,8),new THREE.MeshLambertMaterial({color:0x4a2e1c}));cm.position.y=.9;g.add(cm);
  const x=F.x+(i?2.5:-2.5),z=F.z+2;g.position.set(x,h(x,z),z);sc.add(g);const o={n,g,x,z,but:null,sag:3};F.cp330.push(o);
  if(typeof mod104==='function')mod104('p1a_chasseur').then(T=>{if(!F||!F.sc)return;const m=clone104(T,1.7);g.remove(cm);g.add(m);o.m=m}).catch(()=>{})});
 // les boutons
 const b=$('fpsb');if(b&&F.cp330.length){const q=b.querySelector('[data-k="quit"]');[['rab','Rabattre (G)'],['grp','Lancer ensemble (H)']].forEach(([k2,l])=>{const x=document.createElement('button');x.dataset.k330=k2;x.textContent=l;x.onclick=e=>{e.stopPropagation();k2==='rab'?rabattre330():ensemble330()};b.insertBefore(x,q)})}
 const kd=e=>{if(!F||F.fin)return;if(e.code==='KeyG')rabattre330();if(e.code==='KeyH')ensemble330()};addEventListener('keydown',kd);const off0=F.off;F.off=()=>{removeEventListener('keydown',kd);off0&&off0()};
 fpsMsg((noms.length>1?noms[0]+' et '+noms[1]+' chassent':noms[0]+' chasse')+' avec vous. G : rabattre le gibier vers vous ; H : lancer ensemble.')}catch(e){console.warn(e)}return r}}
function proie330(x,z){let b=null,d=1e9;for(const a of F.an){if(a.mort)continue;const e=Math.hypot(a.x-x,a.z-z);if(e<d){d=e;b=a}}return b}
function rabattre330(){if(!F||!F.cp330)return;const a=proie330(F.x,F.z);if(!a)return fpsMsg('Plus de gibier en vue.');const dx=a.x-F.x,dz=a.z-F.z,d=Math.hypot(dx,dz)||1;
 F.cp330.forEach((c,i)=>{const s=i?1:-1;c.but={x:a.x+dx/d*7+(-dz/d)*4*s,z:a.z+dz/d*7+(dx/d)*4*s,cible:a,mode:'rab'}});fpsMsg('Ils partent en arc, sans bruit, pour passer derrière la bête.')}
function ensemble330(){if(!F||!F.cp330)return;let n=0;F.cp330.forEach(c=>{const a=proie330(c.x,c.z);if(!a||c.sag<=0)return;const d=Math.hypot(a.x-c.x,a.z-c.z);if(d>16)return;c.sag--;n++;
  setTimeout(()=>{if(!F||a.mort)return;if(Math.random()<Math.max(.2,.75-d*.03-vent330()*.15))fpsTue(a,'sagaie');else{a.et='fuite';a.tf=4}},300+Math.random()*500)});
 fpsMsg(n?'Trois sagaies partent au même cri !':'Trop loin : rapprochez-vous de leurs bêtes.');if(n)F.bruit=1}
{const fg=fpsGibier;fpsGibier=function(dt){const r=fg.apply(this,arguments);try{if(!F)return r;const h=F.h,w=vent330(),wx=Math.cos(F.vent),wz=Math.sin(F.vent);
 // les compagnons avancent vers leur but ; le gibier les fuit, donc vient vers vous
 (F.cp330||[]).forEach((c,i)=>{let tx,tz;if(c.but&&c.but.cible&&!c.but.cible.mort){const a=c.but.cible;tx=c.but.x;tz=c.but.z;const da=Math.hypot(a.x-c.x,a.z-c.z);if(da<8){const ax=a.x-c.x,az=a.z-c.z,l=da||1;a.x+=ax/l*2.2*dt;a.z+=az/l*2.2*dt;if(a.et!=='fuite'&&da<5){a.et='fuite';a.tf=3}}}
  else{tx=F.x+(i?2.8:-2.8);tz=F.z+2.4}const dx=tx-c.x,dz=tz-c.z,d=Math.hypot(dx,dz);if(d>.5){const v=Math.min(d,3.6*dt);c.x+=dx/d*v;c.z+=dz/d*v;c.g.rotation.y=Math.atan2(dx,dz)}c.g.position.set(c.x,h(c.x,c.z)+(d>.5?Math.abs(Math.sin(F.tps*8+i))*.05:0),c.z)});
 // le vent : herbes et fougères qui se couchent, feuilles emportées, sagaies déviées
 if(F.fe330){F.fe330.rotation.set(Math.sin(F.tps*2.2)*.02*w*wz,0,-Math.sin(F.tps*2.2)*.02*w*wx)}
 if(F.fl330){const p=F.fl330.geometry.attributes.position;for(let i=0;i<p.count;i++){let x=p.getX(i)+wx*w*6*dt,y=p.getY(i)+Math.sin(F.tps*3+i)*.5*dt-.2*dt,z=p.getZ(i)+wz*w*6*dt;if(Math.abs(x-F.x)>20||Math.abs(z-F.z)>20||y<h(x,z)){x=F.x-wx*18+(Math.random()-.5)*30;z=F.z-wz*18+(Math.random()-.5)*30;y=h(x,z)+1+Math.random()*5}p.setXYZ(i,x,y,z)}p.needsUpdate=true}
 F.vol.forEach(s=>{s.v.x+=wx*w*2.2*dt;s.v.z+=wz*w*2.2*dt});
 // la rafale pousse un peu le regard
 if(w>.75)F.yaw+=Math.sin(F.tps*9)*.0009*w;
 F.ventTxt330=w>.75?'rafales':w>.45?'vent soutenu':'brise'}catch(e){}return r}}
{const fh=fpsHud;fpsHud=function(){const r=fh.apply(this,arguments);try{const d=$('fpsh');if(d&&F&&F.ventTxt330&&!/rafales|vent soutenu|brise/.test(d.innerHTML))d.innerHTML=d.innerHTML.replace(/(vent [^·<]*)/,'$1 ('+F.ventTxt330+')')}catch(e){}return r}}
// chasser soi-même, c'est jouer : le conte se met en pause pendant la chasse (il la finissait seul après 15 s sans toucher
// au clavier, d'où les « Fin de la chasse » immédiates), et reprend en sortant
{const of=ouvrirFPS;ouvrirFPS=function(){const a=S&&S.autoD;const r=of.apply(this,arguments);try{if(F&&S&&a){F.auto330=a;S.autoD=0;try{autoBtn()}catch(e){}}}catch(e){}return r}}
{const fq=fpsQuitter;fpsQuitter=function(){const a=F&&F.auto330,fin=F&&F.fin;const r=fq.apply(this,arguments);try{if(a&&fin&&!F&&S){S.autoD=a;try{autoBtn()}catch(e){}}}catch(e){}return r}}
