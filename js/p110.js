
// ===== L'habitation détaillée : maison de maître créole et cases, dans la vue du camp colon =====
// Remplace les boîtes et les cônes par des bâtiments construits : soubassement de pierre, bardeaux,
// toit à quatre pans, varangue à colonnes, lambrequins, persiennes, marches ; cases de planches au toit de paille.
const P110={tx:{}};
function p110Tex(k){if(P110.tx[k])return P110.tx[k];const c=document.createElement('canvas');c.width=256;c.height=256;const x=c.getContext('2d');let s=k.length*977;const R=()=>((s=(s*9301+49297)%233280)/233280);
 if(k==='bardeau'){x.fillStyle='#ece4d0';x.fillRect(0,0,256,256);for(let y=0;y<256;y+=16){x.fillStyle='rgba(120,100,70,.28)';x.fillRect(0,y+13,256,3);x.fillStyle='rgba(255,255,255,.35)';x.fillRect(0,y,256,2);for(let i=0;i<5;i++){x.fillStyle='rgba(140,120,90,'+(.05+R()*.08)+')';x.fillRect(R()*256,y+2,30+R()*60,10)}}}
 else if(k==='tole'){x.fillStyle='#8c3b2c';x.fillRect(0,0,256,256);for(let i=0;i<256;i+=8){x.fillStyle='rgba(0,0,0,.22)';x.fillRect(i,0,2,256);x.fillStyle='rgba(255,210,180,.14)';x.fillRect(i+4,0,2,256)}for(let i=0;i<40;i++){x.fillStyle='rgba(90,50,30,'+(.08+R()*.15)+')';x.fillRect(R()*256,R()*256,6+R()*20,30+R()*60)}}
 else if(k==='bardeauT'){x.fillStyle='#6e5a46';x.fillRect(0,0,256,256);for(let y=0;y<256;y+=14){const o=(y/14%2)*10;for(let i=-20;i<256;i+=20){const v=70+R()*40;x.fillStyle='rgb('+v+','+(v*.8|0)+','+(v*.62|0)+')';x.fillRect(i+o,y,18,13);x.fillStyle='rgba(0,0,0,.35)';x.fillRect(i+o,y+12,18,2)}}}
 else if(k==='persienne'){x.fillStyle='#3f6b52';x.fillRect(0,0,256,256);for(let y=8;y<248;y+=12){x.fillStyle='rgba(0,0,0,.35)';x.fillRect(16,y+8,224,3);x.fillStyle='rgba(255,255,255,.18)';x.fillRect(16,y,224,2)}x.strokeStyle='#2c4c3a';x.lineWidth=14;x.strokeRect(7,7,242,242)}
 else if(k==='lambr'){x.clearRect(0,0,256,256);x.fillStyle='#f6f2e6';x.fillRect(0,0,256,70);for(let i=0;i<8;i++){const cx=i*32+16;x.beginPath();x.moveTo(cx-16,70);x.quadraticCurveTo(cx-14,140,cx,170);x.quadraticCurveTo(cx+14,140,cx+16,70);x.fill();x.save();x.globalCompositeOperation='destination-out';x.beginPath();x.arc(cx,105,6,0,6.283);x.fill();x.beginPath();x.moveTo(cx,25);x.lineTo(cx+7,45);x.lineTo(cx,60);x.lineTo(cx-7,45);x.fill();x.restore()}}
 else if(k==='pierre'){x.fillStyle='#5d5a54';x.fillRect(0,0,256,256);for(let y=0;y<256;y+=32){const o=(y/32%2)*24;for(let i=-48;i<256;i+=48){const v=70+R()*45;x.fillStyle='rgb('+v+','+(v-3)+','+(v-8)+')';x.beginPath();x.ellipse(i+o+24,y+16,22,13,0,0,6.283);x.fill()}}}
 else if(k==='planche'){x.fillStyle='#8a6a46';x.fillRect(0,0,256,256);for(let i=0;i<256;i+=21){const v=110+R()*40;x.fillStyle='rgb('+v+','+(v*.78|0)+','+(v*.55|0)+')';x.fillRect(i,0,19,256);x.fillStyle='rgba(0,0,0,.4)';x.fillRect(i+19,0,2,256);for(let j=0;j<3;j++){x.fillStyle='rgba(60,40,20,.25)';x.fillRect(i+3+R()*12,R()*256,2,20+R()*40)}}}
 else if(k==='paille'){x.fillStyle='#b8995a';x.fillRect(0,0,256,256);for(let i=0;i<900;i++){const v=140+R()*80;x.strokeStyle='rgba('+v+','+(v*.82|0)+','+(v*.45|0)+',.7)';x.lineWidth=1+R()*1.5;const px=R()*256,py=R()*256;x.beginPath();x.moveTo(px,py);x.lineTo(px+(R()-.5)*6,py+18+R()*16);x.stroke()}for(let y=0;y<256;y+=42){x.fillStyle='rgba(60,40,20,.3)';x.fillRect(0,y+38,256,4)}}
 else if(k==='terre'){x.fillStyle='#9a845a';x.fillRect(0,0,256,256);for(let i=0;i<500;i++){const v=110+R()*60;x.fillStyle='rgba('+v+','+(v*.85|0)+','+(v*.6|0)+',.5)';x.fillRect(R()*256,R()*256,2+R()*4,2+R()*4)}}
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.encoding=THREE.sRGBEncoding;t.anisotropy=4;return P110.tx[k]=t}
function p110Mat(k,rx=1,ry=1,o){const t=p110Tex(k).clone();t.needsUpdate=true;t.repeat.set(rx,ry);return new THREE.MeshLambertMaterial(Object.assign({map:t},o||{}))}
// toit à quatre pans : base w×d, faîtage long de w−d, hauteur h
function p110Toit(w,d,h){const a=w/2,b=d/2,r=Math.max(0,a-b),P=[],U=[];const q=(p,u)=>{P.push(...p);U.push(...u)};
 const F=[[-a,0,b],[a,0,b],[r,h,0],[-r,h,0]],B=[[a,0,-b],[-a,0,-b],[-r,h,0],[r,h,0]],G=[[-a,0,-b],[-a,0,b],[-r,h,0]],D=[[a,0,b],[a,0,-b],[r,h,0]];
 const tri=(A,B2,C)=>{q([...A,...B2,...C],[A[0]/2,0,B2[0]/2,0,C[0]/2,Math.hypot(h,b)/2])};
 tri(F[0],F[1],F[2]);tri(F[0],F[2],F[3]);tri(B[0],B[1],B[2]);tri(B[0],B[2],B[3]);
 const tri2=(A,B2,C)=>{q([...A,...B2,...C],[A[2]/2,0,B2[2]/2,0,C[2]/2,Math.hypot(h,a-r)/2])};tri2(G[0],G[1],G[2]);tri2(D[0],D[1],D[2]);
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));g.computeVertexNormals();return g}
// la maison de maître, façade vers +z
function p110Maison(G,x,z,E){const g=new THREE.Group();g.position.set(x,0,z);G.add(g);const A=(geo,m,px,py,pz,ry)=>{const o=new THREE.Mesh(geo,m);o.position.set(px,py,pz);if(ry)o.rotation.y=ry;g.add(o);return o};
 const W=7.6*E,D=4.6*E,H=2.9*E,so=.55*E,VD=1.9*E;const blanc=new THREE.MeshLambertMaterial({color:0xf6f2e6}),bois=new THREE.MeshLambertMaterial({color:0x5a3e26}),sombre=new THREE.MeshBasicMaterial({color:0x1c140c});
 // soubassement de pierre et sol de la varangue
 A(new THREE.BoxGeometry(W+.3,so,D+VD+.3),p110Mat('pierre',W/2,1),0,so/2,VD/2);
 A(new THREE.BoxGeometry(W+.1,.08,VD),p110Mat('planche',1,W/2),0,so+.04,D/2+VD/2).rotation.y=0;
 // marches au milieu
 for(let k=0;k<3;k++)A(new THREE.BoxGeometry(1.8*E,so/3,.35),p110Mat('pierre',1,.3),0,so/6+k*so/3,D/2+VD+.55-k*.3);
 // murs en bardeaux
 const mur=p110Mat('bardeau',W/2.2,H/2.2);A(new THREE.BoxGeometry(W,H,D),mur,0,so+H/2,0);
 // portes et fenêtres de la façade, persiennes ouvertes
 const pers=p110Mat('persienne');const fen=(px,py,w,h,porte)=>{A(new THREE.BoxGeometry(w+.22,h+.22,.05),blanc,px,py,D/2+.02);A(new THREE.PlaneGeometry(w,h),porte?new THREE.MeshLambertMaterial({color:0x6a4426}):sombre,px,py,D/2+.05);
  if(porte){for(let j=0;j<2;j++)A(new THREE.BoxGeometry(w/2-.08,h*.36,.02),new THREE.MeshLambertMaterial({color:0x7a5230}),px,py-h*.22+j*h*.44,D/2+.07)}
  else{for(const sg of[-1,1]){const p=A(new THREE.BoxGeometry(w/2,h,.04),pers,px+sg*(w/2+w/4+.08),py,D/2+.12);p.rotation.y=sg*.5}
   A(new THREE.BoxGeometry(.04,h,.02),blanc,px,py,D/2+.06);A(new THREE.BoxGeometry(w,.04,.02),blanc,px,py,D/2+.06)}};
 const yF=so+H*.48;[-2.9,-1.45,1.45,2.9].forEach(u=>fen(u*E,yF,.75*E,1.25*E,false));fen(0,so+1.05*E,1.0*E,2.0*E,true);
 // fenêtres des côtés
 for(const sg of[-1,1]){const f=A(new THREE.PlaneGeometry(.7*E,1.1*E),sombre,sg*(W/2+.02),yF,0);f.rotation.y=sg*Math.PI/2;const p=A(new THREE.BoxGeometry(.04,1.1*E,.38*E),pers,sg*(W/2+.06),yF,.55*E);p.rotation.y=sg*.4}
 // le grand toit à quatre pans en tôle rouge, débordant
 const t=A(p110Toit(W+.7,D+.7,2.3*E),p110Mat('tole',1,1,{side:THREE.DoubleSide}),0,so+H,0);
 // la varangue : colonnes, garde-corps, auvent
 const nc=6;for(let k=0;k<nc;k++){const px=-W/2+.2+k*(W-.4)/(nc-1);A(new THREE.CylinderGeometry(.09*E,.11*E,H,10),blanc,px,so+H/2,D/2+VD-.15);A(new THREE.BoxGeometry(.28*E,.16,.28*E),blanc,px,so+.08,D/2+VD-.15);A(new THREE.BoxGeometry(.26*E,.12,.26*E),blanc,px,so+H-.06,D/2+VD-.15)}
 for(const sg of[-1,1]){const l=W/2-1.1*E,cx=sg*(1.1*E+l/2);A(new THREE.BoxGeometry(l,.07,.1),blanc,cx,so+.85,D/2+VD-.15);A(new THREE.BoxGeometry(l,.05,.06),blanc,cx,so+.12,D/2+VD-.15);
  for(let k=0;k<Math.floor(l/.22);k++)A(new THREE.BoxGeometry(.05,.7,.05),blanc,cx-l/2+.11+k*.22,so+.48,D/2+VD-.15)}
 const auv=A(new THREE.BoxGeometry(W+.6,.1,VD+.5),p110Mat('tole',W/2,1),0,so+H+.12,D/2+VD/2+.15);auv.rotation.x=.13;
 // les lambrequins : la dentelle de bois au bord de l'auvent et des pignons
 const lm=new THREE.MeshLambertMaterial({map:(()=>{const q=p110Tex('lambr').clone();q.needsUpdate=true;q.repeat.set((W+.6)/1.1,1);return q})(),transparent:true,alphaTest:.5,side:THREE.DoubleSide});
 A(new THREE.PlaneGeometry(W+.6,.55*E),lm,0,so+H-.23,D/2+VD+.42);
 for(const sg of[-1,1]){const lmS=lm.clone();lmS.map=lm.map.clone();lmS.map.needsUpdate=true;lmS.map.repeat.set((VD+.5)/1.1,1);const p=A(new THREE.PlaneGeometry(VD+.5,.55*E),lmS,sg*(W/2+.3),so+H-.18,D/2+VD/2+.15);p.rotation.y=Math.PI/2}
 // épi de faîtage
 A(new THREE.ConeGeometry(.08,.6,6),blanc,-(W-D)/2,so+H+2.5*E,0);A(new THREE.ConeGeometry(.08,.6,6),blanc,(W-D)/2,so+H+2.5*E,0);
 // une lanterne sous la varangue
 A(new THREE.BoxGeometry(.18,.28,.18),new THREE.MeshBasicMaterial({color:0xffd27a}),-.9*E,so+H-.4,D/2+VD*.5);
 return{porte:[x,z+D/2+.05,1.0*E,2.0*E,so]}}
// une case de planches au toit de paille, posée sur des pierres
function p110Case(G,x,z,ry){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=ry||0;G.add(g);const A=(geo,m,px,py,pz)=>{const o=new THREE.Mesh(geo,m);o.position.set(px,py,pz);g.add(o);return o};
 const W=3.2,D=2.4,H=1.85,so=.22;for(const[a,b]of[[-1,-1],[1,-1],[-1,1],[1,1],[0,-1],[0,1]])A(new THREE.BoxGeometry(.35,so,.35),p110Mat('pierre',.3,.3),a*(W/2-.15),so/2,b*(D/2-.15));
 A(new THREE.BoxGeometry(W,H,D),p110Mat('planche',W/1.6,1),0,so+H/2,0);
 const t=A(p110Toit(W+.9,D+.9,1.7),p110Mat('paille',1.5,1.5,{side:THREE.DoubleSide}),0,so+H,0);
 // la petite fenêtre à volet et son appui
 A(new THREE.PlaneGeometry(.55,.5),new THREE.MeshBasicMaterial({color:0x1a120a}),W/2-.75,so+1.15,D/2+.01);const v=A(new THREE.BoxGeometry(.3,.52,.04),new THREE.MeshLambertMaterial({color:0x5c4028}),W/2-.32,so+1.15,D/2+.14);v.rotation.y=.7;
 // le pas de porte en pierre et un banc
 A(new THREE.BoxGeometry(1.1,.12,.5),p110Mat('pierre',.5,.3),0,.06,D/2+.35);A(new THREE.BoxGeometry(.9,.08,.3),new THREE.MeshLambertMaterial({color:0x6a4a2c}),-W/2+.65,.42,D/2+.45);
 for(const sg of[-1,1])A(new THREE.BoxGeometry(.08,.38,.25),new THREE.MeshLambertMaterial({color:0x5a3e24}),-W/2+.65+sg*.38,.2,D/2+.45);
 return{porte:[x+Math.sin(ry||0)*(D/2+.05),z+Math.cos(ry||0)*(D/2+.05),.8,1.45,so],ry:ry||0}}
// les abords : allée, jardin de fleurs, palmiers, puits, cuisine au feu de bois
function p110Abords(G,x,z,E){const A=(geo,m,px,py,pz)=>{const o=new THREE.Mesh(geo,m);o.position.set(px,py,pz);G.add(o);return o};const D=4.6*E,VD=1.9*E,av=z+D/2+VD+1;
 const al=A(new THREE.PlaneGeometry(1.6*E,5.5),p110Mat('terre',1,3),x,.075,av+2.6);al.rotation.x=-Math.PI/2;
 const fl=[0xd8384a,0xf2c230,0xf6f2e6,0xe86aa0,0xff7a2a];for(let k=0;k<22;k++){const sg=k%2?1:-1,pz=av+.3+Math.floor(k/2)*.48;A(new THREE.SphereGeometry(.16,6,5),new THREE.MeshLambertMaterial({color:0x3f6a2e}),x+sg*1.15*E,.15,pz);A(new THREE.SphereGeometry(.08,5,4),new THREE.MeshLambertMaterial({color:fl[k%5]}),x+sg*1.15*E,.3,pz)}
 // deux palmiers de part et d'autre de l'allée
 for(const sg of[-1,1]){const px=x+sg*3.2*E,pz=av+1.8;for(let k=0;k<7;k++)A(new THREE.CylinderGeometry(.13-k*.008,.15-k*.008,.75,7),new THREE.MeshLambertMaterial({color:k%2?0x7a6448:0x6a5640}),px+sg*k*.04,.37+k*.72,pz);
  const top=[px+sg*.28,5.25,pz];for(let k=0;k<9;k++){const a=k/9*6.283+sg,h=new THREE.Group();h.position.set(...top);h.rotation.y=-a;G.add(h);for(let j=0;j<3;j++){const f=new THREE.Mesh(new THREE.BoxGeometry(.7,.03,.34-j*.08),new THREE.MeshLambertMaterial({color:j?0x2f5a26:0x3a6a2c}));f.position.set(.32+j*.62,-.05-j*j*.17,0);f.rotation.z=-.15-j*.4;h.add(f)}}A(new THREE.SphereGeometry(.22,7,6),new THREE.MeshLambertMaterial({color:0x6a5a30}),...top)}
 // le puits
 {const px=x+6.2*E,pz=z+1.2;A(new THREE.CylinderGeometry(.7,.75,.8,14,1,true),p110Mat('pierre',2,.5,{side:THREE.DoubleSide}),px,.4,pz);A(new THREE.CircleGeometry(.65,14),new THREE.MeshBasicMaterial({color:0x10181c}),px,.6,pz).rotation.x=-Math.PI/2;
  for(const sg of[-1,1])A(new THREE.BoxGeometry(.1,1.5,.1),new THREE.MeshLambertMaterial({color:0x5a3e24}),px+sg*.65,1.1,pz);A(new THREE.CylinderGeometry(.06,.06,1.4,6),new THREE.MeshLambertMaterial({color:0x6a4a2c}),px,1.7,pz).rotation.z=Math.PI/2;A(new THREE.CylinderGeometry(.13,.11,.22,8),new THREE.MeshLambertMaterial({color:0x6a4a2c}),px,1.2,pz)}
 // la cuisine à part, avec sa cheminée qui fume
 {const px=x-6.4*E,pz=z-.6;A(new THREE.BoxGeometry(2.4,1.7,2),p110Mat('pierre',1.5,1),px,.85,pz);A(p110Toit(2.9,2.5,1.1),p110Mat('bardeauT',1,1,{side:THREE.DoubleSide}),px,1.7,pz);A(new THREE.BoxGeometry(.45,1.5,.45),p110Mat('pierre',.4,1),px+.6,2.3,pz-.4);
  A(new THREE.PlaneGeometry(.7,1.2),new THREE.MeshBasicMaterial({color:0x1a120a}),px,.6,pz+1.01);
  P110.fum=[];for(let k=0;k<5;k++){const s=new THREE.Mesh(new THREE.SphereGeometry(.25,7,6),new THREE.MeshBasicMaterial({color:0xcfcac0,transparent:true,opacity:.45,depthWrite:false}));s.position.set(px+.6,3.1+k*.5,pz-.4);s.userData={x:px+.6,y:3.1,z:pz-.4,k};G.add(s);P110.fum.push(s)}}}
{const pd=p3Deco;p3Deco=function(L,C){pd.apply(this,arguments);try{if(!C||!S||!L||!L.cases||!L.cases.length)return;const G=P3.deco,E=S.villa?1.3:1;
 // on retire les anciennes boîtes de la maison et des cases, et leurs portes
 const zones=L.cases.map(([u,v],i)=>{const [x,z]=p3W(u,v);return i===0?{x,z,rx:(S.villa?5.6:4.2),z0:z-2.8,z1:z+(S.villa?5.6:3.8)}:{x,z,rx:1.9,z0:z-1.5,z1:z+1.6}});
 const dans=o=>{const p=o.position;return p.y<9&&zones.some(q=>Math.abs(p.x-q.x)<q.rx&&p.z>q.z0&&p.z<q.z1)};
 [...G.children].forEach(o=>{if(o.isMesh&&dans(o))G.remove(o);else if(o.isGroup&&!o.userData.p110&&dans(o))G.remove(o)});
 if(P3.portes)P3.portes=P3.portes.filter(d=>G.children.includes(d.g));
 const neuves=[];L.cases.forEach(([u,v],i)=>{const [x,z]=p3W(u,v);let r;if(i===0)r=p110Maison(G,x,z,E);else{const [fx,fz]=p3W(...L.feu);r=p110Case(G,x,z,Math.atan2(fx-x,fz-z)*.35)}neuves.push(r)});
 G.children.forEach(o=>{if(o.isGroup)o.userData.p110=1});
 {const [x,z]=p3W(...L.cases[0]);p110Abords(G,x,z,E)}
 // les portes battantes, refaites à la bonne place
 neuves.forEach((r,i)=>{if(!r||!r.porte)return;const [px,pz,w,h,so]=r.porte,ang=r.ry||0;const gond=new THREE.Group();gond.userData.p110=1;gond.position.set(px-Math.cos(ang)*w/2+Math.sin(ang)*.06,so,pz+Math.sin(ang)*w/2+Math.cos(ang)*.06);gond.rotation.y=ang;
  const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,.06),new THREE.MeshLambertMaterial({color:i===0?0x6a4426:0x6a4a2c}));b.position.set(w/2,h/2,0);gond.add(b);G.add(gond);(P3.portes=P3.portes||[]).push({g:gond,a0:ang,o:0,x:px,z:pz})})
 }catch(e){console.warn('p110',e)}}}
// la fumée de la cuisine monte et se défait
{const pb=p3Boucle;p3Boucle=function(){const r=pb.apply(this,arguments);try{if(P110.fum&&CV.on){const t=performance.now()/1000;P110.fum.forEach(s=>{const u=s.userData,f=((t*.35+u.k/5)%1);s.position.set(u.x+Math.sin(t+u.k)*.15*f+f*.6,u.y+f*2.4,u.z);s.scale.setScalar(.6+f*1.6);s.material.opacity=.5*(1-f)})}}catch(e){}return r}}
// ===== Choisir la place d'une nouvelle case dans la vue du camp =====
// Après « Bâtir une case », la case suit le pointeur sur le sol : un clic la pose, Échap la laisse à sa place.
{const cl=cvLieux;cvLieux=function(){const r=cl.apply(this,arguments);try{const vl=(r.vl||[]).filter(v=>v.k==='case');vl.forEach((v,j)=>{if(v.pu!=null&&r.L.cases[2+j])r.L.cases[2+j]=[v.pu,v.pv]})}catch(e){}return r}}
const PL110={on:0};
{const ts=toast;toast=function(m){if(PL110.on||(typeof CV!=='undefined'&&CV.on&&/pour le déplacer/.test(m||'')))return;return ts.apply(this,arguments)}}
{const bt=batir;batir=function(t,k){const o=tl(t.i),n=(o.vl||[]).length;const r=bt.apply(this,arguments);try{if(k==='case'&&typeof CV!=='undefined'&&CV.on&&(o.vl||[]).length>n&&P3&&P3.cv){moveB=null;p110Placer(o.vl[o.vl.length-1])}}catch(e){console.warn(e)}return r}}
function p110Sol(X,Y){const cv=P3.cv,r=cv.getBoundingClientRect(),v=new THREE.Vector2((X-r.left)/r.width*2-1,-(Y-r.top)/r.height*2+1),rc=new THREE.Raycaster();rc.setFromCamera(v,P3.C);const d=rc.ray.direction,o=rc.ray.origin;if(d.y>-1e-3)return null;const k=-o.y/d.y;return[o.x+d.x*k,o.z+d.z*k]}
function p110Placer(v){PL110.on=1;PL110.v=v;const G=P3.deco;const g=new THREE.Group();const m=new THREE.MeshBasicMaterial({color:0xe8be5a,transparent:true,opacity:.45,depthWrite:false});const b=new THREE.Mesh(new THREE.BoxGeometry(3.2,2,2.4),m);b.position.y=1;g.add(b);
 const ring=new THREE.Mesh(new THREE.RingGeometry(2.1,2.4,32),new THREE.MeshBasicMaterial({color:0xe8be5a,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.12;g.add(ring);(G.parent||G).add(g);PL110.g=g;PL110.m=m;
 const ban=document.createElement('div');ban.id='place110';ban.innerHTML='<b>Où poser la nouvelle case ?</b> Touchez le sol de '+(S.voieC?'l’habitation':'du camp')+'. <button class="bt sec">La laisser ici</button>';
 ban.style.cssText='position:fixed;left:50%;top:120px;transform:translateX(-50%);z-index:99995;background:#1e1912;color:#f0e6d0;border:2px solid #e8be5a;border-radius:10px;padding:10px 16px;font:15px system-ui;box-shadow:0 4px 18px #000a';document.body.appendChild(ban);ban.querySelector('button').onclick=()=>p110Fin();
 const {L}=cvLieux(),j=(S.t[CV.camp].vl||[]).filter(w=>w.k==='case').indexOf(v),c=L.cases[2+j]||L.cases[L.cases.length-1];if(c){const [x,z]=p3W(...c);g.position.set(x,0,z)}PL110.ok=1;PL110.t0=performance.now()}
function p110Libre(x,z){const {L}=cvLieux(),j=(S.t[CV.camp].vl||[]).filter(w=>w.k==='case').indexOf(PL110.v);const dx=x/(17.5),dz=(z-1)/11;if(dx*dx+dz*dz>1)return 'Trop loin : restez sur la terre battue.';
 for(let i=0;i<L.cases.length;i++){if(i===2+j)continue;const [a,b]=p3W(...L.cases[i]);if(Math.hypot(a-x,b-z)<(i===0?7:3.6))return 'Trop près d’'+(i===0?(S.voieC?'la maison':'une case'):'une autre case')+'.'}
 for(const k of['feu','reserve','jardin','foyer','bois']){const [a,b]=p3W(...L[k]);if(Math.hypot(a-x,b-z)<(k==='jardin'?4:2.6))return 'Cette place est prise ('+({feu:'le feu',reserve:'la réserve',jardin:'le jardin',foyer:'le foyer',bois:'le bois'})[k]+').'}return ''}
function p110Fin(x,z){if(!PL110.on)return;if(x!=null){PL110.v.pu=x/48+.5;PL110.v.pv=z/32+.5}PL110.on=0;try{PL110.g.parent.remove(PL110.g)}catch(e){}const b=$('place110');if(b)b.remove();P3.decoK='';sauve();try{cvListe()}catch(e){}if(x!=null)toast('La case est posée.')}
function p110Sur(e){const t=e.target;if(!t||t.tagName!=='CANVAS'||!P3.cv)return false;const r=P3.cv.getBoundingClientRect();return e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom}
window.addEventListener('pointermove',e=>{if(!PL110.on||!P3.cv||!p110Sur(e))return;const p=p110Sol(e.clientX,e.clientY);if(!p)return;PL110.g.position.set(p[0],0,p[1]);const r=p110Libre(p[0],p[1]);PL110.ok=!r;PL110.m.color.set(r?0xd04030:0xe8be5a);PL110.g.children[1].material.color.set(r?0xd04030:0xe8be5a)},true);
['pointerdown','click','dblclick','contextmenu'].forEach(ev=>window.addEventListener(ev,e=>{if(PL110.on&&P3.cv&&p110Sur(e)){e.stopPropagation();e.preventDefault()}},true));
window.addEventListener('pointerup',e=>{if(!PL110.on||!P3.cv||!p110Sur(e))return;e.stopPropagation();e.preventDefault();if(performance.now()-PL110.t0<300)return;const p=p110Sol(e.clientX,e.clientY);if(!p)return;const r=p110Libre(p[0],p[1]);if(r){const b=$('place110');if(b)b.querySelector('b').textContent=r;return}p110Fin(p[0],p[1])},true);
window.addEventListener('keydown',e=>{if(PL110.on&&e.key==='Escape'){e.stopPropagation();p110Fin()}},true);
setInterval(()=>{try{if(PL110.on&&(typeof CV==='undefined'||!CV.on))p110Fin()}catch(e){}},1000);
// ===== Les chemins et les routes : de la terre battue qui épouse le sol, plus des planches =====
// Le ruban a trois rangs de points en travers (il suit le relief), des coordonnées de texture, et une texture
// de terre aux bords fondus : ornières et cailloux pour les routes, trace piétinée et touffes d'herbe pour les sentiers.
ruban97=function(P,w,hY){for(let it=0;it<2&&P.length>2&&P.length<4000;it++){const Q=[P[0]];for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1];Q.push({x:a.x*.75+b.x*.25,y:a.y*.75+b.y*.25,z:a.z*.75+b.z*.25},{x:a.x*.25+b.x*.75,y:a.y*.25+b.y*.75,z:a.z*.25+b.z*.75})}Q.push(P[P.length-1]);P=Q}w*=1.45;const pos=[],uv=[],idx=[];let lon=0;const C=[-1,-.35,.35,1];
 for(let i=0;i<P.length;i++){const a=P[Math.max(0,i-1)],b=P[Math.min(P.length-1,i+1)],dx=b.x-a.x,dz=b.z-a.z,L=Math.hypot(dx,dz)||1,nx=-dz/L,nz=dx/L,ww=w*(.85+.3*Math.abs(Math.sin(i*1.9)));if(i)lon+=Math.hypot(P[i].x-P[i-1].x,P[i].z-P[i-1].z);
  C.forEach((c,j)=>{const x=P[i].x+nx*ww/2*c,z=P[i].z+nz*ww/2*c;pos.push(x,hY?hY({x,z}):P[i].y,z);uv.push(j/(C.length-1),lon/(w*2.2))});
  if(i<P.length-1){const k=i*C.length;for(let j=0;j<C.length-1;j++)idx.push(k+j,k+j+1,k+j+C.length,k+j+1,k+j+1+C.length,k+j+C.length)}}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g};
fusion97=function(G){const pos=[],uv=[],idx=[];let o=0;G.forEach(g=>{const p=g.attributes.position.array,u=g.attributes.uv&&g.attributes.uv.array;for(let k=0;k<p.length;k++)pos.push(p[k]);if(u)for(let k=0;k<u.length;k++)uv.push(u[k]);else for(let k=0;k<p.length/3;k++)uv.push(0,0);const I=g.index.array;for(let k=0;k<I.length;k++)idx.push(I[k]+o);o+=p.length/3;g.dispose()});
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g};
function texRuban110(rt){const k='ruban'+rt;if(P110.tx[k])return P110.tx[k];const c=document.createElement('canvas');c.width=128;c.height=256;const x=c.getContext('2d');let s=rt?311:97;const R=()=>((s=(s*9301+49297)%233280)/233280);
 const base=rt?[168,146,108]:[156,128,90];for(let py=0;py<256;py++)for(let px=0;px<128;px+=2){const e=Math.abs(px/127-.5)*2,a=Math.max(0,Math.min(1,(1-e)/.32))*(.88+R()*.12),v=.85+R()*.3;x.fillStyle='rgba('+(base[0]*v|0)+','+(base[1]*v|0)+','+(base[2]*v|0)+','+a.toFixed(2)+')';x.fillRect(px,py,2,1)}
 if(rt){for(const cx of[40,88]){x.fillStyle='rgba(80,62,40,.45)';for(let py=0;py<256;py+=2)x.fillRect(cx-5+Math.sin(py*.08)*1.5,py,10,2)}x.fillStyle='rgba(90,140,60,.5)';for(let py=0;py<256;py+=3)x.fillRect(60+Math.sin(py*.2)*2,py,8*R(),2)}
 else{x.fillStyle='rgba(70,52,32,.35)';for(let py=0;py<256;py+=2)x.fillRect(54+Math.sin(py*.11)*6,py,20,2)}
 for(let i=0;i<(rt?170:90);i++){const px=20+R()*88,py=R()*256,r=1+R()*2.2,v=110+R()*80;x.fillStyle='rgba('+v+','+(v*.95|0)+','+(v*.88|0)+',.9)';x.beginPath();x.arc(px,py,r,0,6.283);x.fill()}
 for(let i=0;i<60;i++){const side=R()<.5?8+R()*22:98+R()*22,py=R()*256;x.strokeStyle='rgba('+(60+R()*40|0)+','+(110+R()*50|0)+',40,.85)';x.lineWidth=1.5;for(let j=0;j<4;j++){x.beginPath();x.moveTo(side,py);x.lineTo(side+(R()-.5)*8,py-6-R()*8);x.stroke()}}
 const t=new THREE.CanvasTexture(c);t.wrapS=THREE.ClampToEdgeWrapping;t.wrapT=THREE.RepeatWrapping;t.encoding=THREE.sRGBEncoding;t.anisotropy=4;return P110.tx[k]=t}
function matRuban110(rt){return new THREE.MeshLambertMaterial({map:texRuban110(rt),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2})}
// ===== Le soin des bêtes de la ferme (Vie) : l'eau, le fourrage, sortir les petits, ne pas mélanger les espèces =====
function bet110(){S.bt110=S.bt110||{eau:90,four:90,sort:90,sep:0};return S.bt110}
function betEsp110(){const n=S.bet||0,C=S.voieC,L=[];if(!n)return L;L.push(C||S.year>1700?'bœufs':'zébus');if(n>=2)L.push('cabris');if(n>=4)L.push('cochons');if(n>=3&&C)L.push('volailles');return L}
{const jt=jourTick;jourTick=function(){jt.apply(this,arguments);try{if(!S||!(S.bet>0)||typeof modeHist==='function'&&modeHist())return;const b=bet110(),pluie=typeof saison==='function'&&/pluie|humide/i.test(saison()||'');
 b.eau=Math.max(0,b.eau-(pluie?6:12));b.four=Math.max(0,b.four-8);b.sort=Math.max(0,b.sort-5);
 const perd=(txt)=>{if(S.bet>0){S.bet--;journal(txt)}};
 if(b.eau<20&&rnd()<.08)perd('Une bête est morte de soif dans l’enclos.');
 else if(b.four<20&&rnd()<.07)perd('Sans fourrage, une bête maigrit et ne se relève pas.');
 else if(b.sort<25&&rnd()<.04)perd('Les petits, jamais sortis de l’enclos, tombent malades : on en perd un.');
 if(!b.sep&&(S.bet||0)>=4&&betEsp110().length>=3&&rnd()<.035)perd(['Les cochons ont tué des poussins dans l’enclos commun.','Un bœuf a encorné un cabri : les espèces sont mêlées dans le même enclos.','Les cabris ont tout mangé, les bœufs ont faim : il faut séparer les bêtes.'][Math.floor(rnd()*3)])}catch(e){}}}
{const bc=besoinsCamp;besoinsCamp=function(ci){const L=bc.apply(this,arguments);try{if(S.bet>0&&camps()[0]&&ci===camps()[0].i){const b=bet110(),m=Math.min(b.eau,b.four,b.sort,b.sep||S.bet<4?100:55);
 const t=b.eau<35?'les bêtes ont soif':b.four<35?'plus de fourrage':b.sort<35?'les petits ne sortent pas':!b.sep&&S.bet>=4?'espèces mêlées dans l’enclos':S.bet+' bêtes bien tenues';L.push(['Bêtes',m,t,0])}}catch(e){}return L}}
{const bm=besoinMenu;besoinMenu=function(n,X,Y){if(n!=='Bêtes')return bm.apply(this,arguments);const ci=CV.camp,A=gensC(ci).filter(adulte).filter(p=>p.id!==S.garde),b=bet110(),L=[],E=betEsp110();
 const qui=()=>A.slice().sort((a,c)=>(a.fat||0)-(c.fat||0))[0];const fait=(k,f)=>()=>{const p=qui();if(!p){toast('Personne de libre au camp.');return}p.fat=Math.min(100,(p.fat||0)+8);f(p);sauve();try{cvListe()}catch(e){}};
 L.push([S.bet+' bêtes : '+E.join(', ')+' · eau '+Math.round(b.eau)+' %, fourrage '+Math.round(b.four)+' %, sorties '+Math.round(b.sort)+' %',()=>{}]);
 L.push(['💧 Abreuver les bêtes à la ravine',fait('eau',p=>{b.eau=100;toast(p.n.split(' ')[0]+' mène les bêtes boire.')})]);
 L.push(['🌾 Donner le fourrage (1 paille)'+((S.res.paille||0)>=1?'':' — il manque 1 paille'),()=>{if((S.res.paille||0)<1){toast('Il faut 1 paille.');return}fait('four',p=>{S.res.paille--;b.four=100;toast(p.n.split(' ')[0]+' remplit les mangeoires.')})()}]);
 L.push(['🐐 Sortir les petits au pâturage (avec un gardien)',fait('sort',p=>{b.sort=100;if(rnd()<.08){S.bet=Math.max(0,S.bet-1);journal('Au pâturage, un jeune cabri s’est perdu dans la ravine.')}toast(p.n.split(' ')[0]+' garde les petits au pâturage.')})]);
 if(!b.sep&&S.bet>=2)L.push(['🪵 Séparer les espèces : parcs à part pour '+E.join(', ')+' (3 bois)'+((S.res.bois||0)>=3?'':' — il manque du bois'),()=>{if((S.res.bois||0)<3){toast('Il faut 3 bois.');return}S.res.bois-=3;b.sep=1;journal('On cloisonne l’enclos : les bœufs d’un côté, les cabris et les cochons à part, les volailles sous le poulailler.');toast('Les bêtes sont séparées.');sauve();try{cvListe()}catch(e){}}]);
 menuCtx(X,Y,'Les bêtes',L)}}
