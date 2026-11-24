// ===== p305 : des navires qui ne sont plus des blocs — coque galbée en bordages, pont, voiles gonflées par le vent,
// haubans ; boutre arabe à voile latine, caravelle portugaise (croix rouge de l'ordre du Christ), navire français de 1663,
// chaloupe et pirogue creusées. Même taille et même sens que les anciens (proue vers +x). =====
const NAV305={tx:{}};
function navTex305(k){if(NAV305.tx[k])return NAV305.tx[k];const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');let s=k.length*131;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};
 if(k==='bordage'||k==='bordageC'||k==='pont'){const base=k==='bordageC'?[150,110,70]:k==='pont'?[176,140,96]:[96,64,40];for(let i=0;i<16;i++){const v=.82+r()*.3;x.fillStyle='rgb('+base.map(b=>Math.min(255,b*v|0))+')';x.fillRect(0,i*8,128,8);x.fillStyle='rgba(20,12,6,.55)';x.fillRect(0,i*8+7,128,1);const j=r()*128;x.fillRect(j,i*8,1,8)}
  for(let i=0;i<260;i++){x.fillStyle='rgba(30,18,8,'+(.08+r()*.12)+')';x.fillRect(r()*128,r()*128,4+r()*18,1)}}
 else{const blanc=k==='voileR'?[236,226,200]:k==='voileB'?[222,206,170]:[238,232,214];x.fillStyle='rgb('+blanc+')';x.fillRect(0,0,128,128);
  for(let i=0;i<8;i++){x.fillStyle='rgba(120,100,70,.18)';x.fillRect(i*16,0,1,128)}for(let i=0;i<400;i++){x.fillStyle='rgba(140,120,90,'+r()*.08+')';x.fillRect(r()*128,r()*128,2,2)}
  x.fillStyle='rgba(90,70,40,.25)';x.fillRect(0,0,128,3);x.fillRect(0,125,128,3);
  if(k==='voileR'){x.fillStyle='#a8201c';x.fillRect(54,22,20,84);x.fillRect(26,52,76,20);x.fillStyle='#ece2c8';x.fillRect(61,30,6,68);x.fillRect(34,59,60,6)}}
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;if(THREE.sRGBEncoding)t.encoding=THREE.sRGBEncoding;return NAV305.tx[k]=t}
// la coque : des couples successifs, du tableau arrière à l'étrave ; la tonture relève les deux bouts
function coque305(L,B,D,K,o){o=o||{};const n=24,m=12,V=[],UV=[],I=[],tab=o.tab==null?.35:o.tab;
 for(let i=0;i<=n;i++){const u=i/n,X=-L/2+u*L;
  // largeur : pleine au milieu, l'étrave fine, l'arrière plus ou moins carré (tab)
  const bw=u<.5?Math.pow(Math.sin(Math.PI*.5*Math.min(1,(u+tab*.5)/(.5+tab*.5))),.7):Math.pow(Math.max(0,Math.cos(Math.PI*.5*(u-.5)/.5)),.65);const b=B*.5*Math.max(.015,bw);
  const top=D+(o.ton||.35)*D*(Math.pow(2*u-1,2))+(u>.8?(o.etr||0)*(u-.8)/.2:0),fond=-K*(1-Math.pow(Math.abs(2*u-1),3));
  for(let j=0;j<=m;j++){const a=j/m*Math.PI,cs=Math.cos(a),sn=Math.sin(a);const y=top-(top-fond)*Math.pow(sn,1.25),z=b*cs*(1-.25*Math.pow(sn,6));V.push(X,y,z);UV.push(u*L*7,j/m*2)}}
 for(let i=0;i<n;i++)for(let j=0;j<m;j++){const a=i*(m+1)+j,b=a+m+1;I.push(a,b,a+1,b,b+1,a+1)}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(V,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(UV,2));g.setIndex(I);g.computeVertexNormals();
 const mat=new THREE.MeshLambertMaterial({map:navTex305(o.clair?'bordageC':'bordage'),side:THREE.DoubleSide});const h=new THREE.Mesh(g,mat);
 // le pont (ou le fond creux d'une barque) suit le bord, un peu plus bas
 const sh=new THREE.Shape();for(let i=0;i<=n;i++){const k=i*(m+1);sh[i?'lineTo':'moveTo'](V[k*3],V[k*3+2])}for(let i=n;i>=0;i--){const k=i*(m+1)+m;sh.lineTo(V[k*3],V[k*3+2])}
 const dg=new THREE.ShapeGeometry(sh);dg.rotateX(Math.PI/2);const pt=new THREE.Mesh(dg,new THREE.MeshLambertMaterial({map:navTex305('pont'),color:o.creux?0x6a4a30:0xffffff,side:THREE.DoubleSide}));pt.position.y=o.creux?D*.2:D*.88;pt.material.map.repeat.set(4,4);
 const G=new THREE.Group();G.add(h,pt);return G}
// une voile gonflée : un plan découpé et bombé vers l'avant
function voile305(w,hh,creux,tx,tri){const g=new THREE.PlaneGeometry(w,hh,10,10),P=g.attributes.position;for(let i=0;i<P.count;i++){const X=P.getX(i)/w+.5,Y=P.getY(i)/hh+.5;let x=P.getX(i);
  if(tri){x=x*(1-Y);P.setX(i,x+ (Y)*w*.35)}P.setZ(i,creux*Math.sin(Math.PI*X)*Math.sin(Math.PI*(.15+.85*Y)))}g.computeVertexNormals();
 const m=new THREE.Mesh(g,new THREE.MeshLambertMaterial({map:navTex305(tx),side:THREE.DoubleSide}));m.rotation.y=Math.PI/2;return m}
function mat305(h,r){const m=new THREE.Mesh(new THREE.CylinderGeometry(r*.75,r,h,7),new THREE.MeshLambertMaterial({color:0x4a3220}));return m}
function haubans305(G,pts){const g=new THREE.BufferGeometry().setFromPoints(pts.flat().map(p=>new THREE.Vector3(...p)));G.add(new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0x2a2018,transparent:true,opacity:.75})))}
{const n0=g168Navire;g168Navire=function(type){try{const G=new THREE.Group();
 if(type==='pirogue'||type==='chaloupe'){const L=.22,c=coque305(L,type==='pirogue'?.05:.08,.03,.022,{creux:1,clair:type==='pirogue',ton:type==='pirogue'?.9:.5,tab:type==='pirogue'?0:.5});c.position.y=.01;G.add(c);
  if(type==='chaloupe')for(let i=0;i<3;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(.012,.006,.07),new THREE.MeshLambertMaterial({color:0x8a6a48}));b.position.set(-.06+i*.05,.03,0);G.add(b)}return G}
 if(type==='boutre'){const L=.7,c=coque305(L,.17,.08,.07,{tab:.25,ton:.6,etr:.03,clair:1});c.position.y=.02;G.add(c);
  const m=mat305(.62,.012);m.position.set(.06,.4,0);m.rotation.z=-.08;G.add(m);
  // la grande voile latine, sur une antenne inclinée
  const an=new THREE.Mesh(new THREE.CylinderGeometry(.006,.009,.82,6),new THREE.MeshLambertMaterial({color:0x5a4028}));an.position.set(.02,.5,0);an.rotation.z=1.0;G.add(an);
  const v=voile305(.62,.5,.05,'voileB',1);v.position.set(.05,.38,.012);v.rotation.z=.12;G.add(v);
  haubans305(G,[[[.06,.71,0],[.34,.1,0]],[[.06,.71,0],[-.3,.1,0]],[[.06,.7,0],[.06,.1,.08]],[[.06,.7,0],[.06,.1,-.08]]]);return G}
 // caravelle et navire : trois mâts, gaillard arrière, voiles carrées gonflées, artimon latin
 const car=type==='caravelle',L=.9,c=coque305(L,.22,.1,.08,{tab:.55,ton:.9,etr:.02});c.position.y=.02;G.add(c);
 const chateau=coque305(.24,.2,.05,.0,{tab:.9,ton:.2});chateau.position.set(-.3,.11,0);G.add(chateau);
 const mats=[[.18,.62,.013],[-.06,.72,.015],[-.3,.5,.011]];mats.forEach(([px,hh,r])=>{const m=mat305(hh,r);m.position.set(px,.12+hh/2,0);G.add(m)});
 const tx=car?'voileR':'voileW';
 // misaine et grand-voile carrées, avec leur vergue ; un hunier au-dessus sur le navire
 [[.18,.34,.26,.25],[-.06,.4,.3,.3]].forEach(([px,y,w,hh])=>{const v=voile305(w,hh,.05,tx);v.position.set(px+.012,.12+y,0);G.add(v);const vg=new THREE.Mesh(new THREE.CylinderGeometry(.005,.005,w*1.15,5),new THREE.MeshLambertMaterial({color:0x4a3220}));vg.rotation.x=Math.PI/2;vg.position.set(px+.008,.12+y+hh/2,0);G.add(vg);
  if(!car){const h2=voile305(w*.7,hh*.55,.035,'voileW');h2.position.set(px+.01,.12+y+hh*.82,0);G.add(h2)}});
 const art=voile305(.26,.3,.035,car?'voileR':'voileW',1);art.position.set(-.33,.38,.01);G.add(art);
 // beaupré, et pavillon du roi à la poupe sur le navire
 const bp=new THREE.Mesh(new THREE.CylinderGeometry(.005,.008,.3,5),new THREE.MeshLambertMaterial({color:0x4a3220}));bp.rotation.z=-1.2;bp.position.set(.52,.17,0);G.add(bp);
 haubans305(G,[[[.18,.74,0],[.64,.22,0]],[[-.06,.84,0],[.18,.74,0]],[[-.06,.84,0],[-.06,.13,.11]],[[-.06,.84,0],[-.06,.13,-.11]],[[.18,.74,0],[.18,.13,.1]],[[.18,.74,0],[.18,.13,-.1]],[[-.3,.62,0],[-.44,.2,0]]]);
 if(!car){const cv=document.createElement('canvas');cv.width=48;cv.height=32;const x=cv.getContext('2d');x.fillStyle='#f2eee2';x.fillRect(0,0,48,32);x.fillStyle='#c8a030';x.font='18px serif';x.textAlign='center';x.textBaseline='middle';x.fillText('⚜',24,17);
  const f=new THREE.Mesh(new THREE.PlaneGeometry(.1,.065,6,1),new THREE.MeshLambertMaterial({map:new THREE.CanvasTexture(cv),side:THREE.DoubleSide}));f.position.set(-.5,.3,0);G.add(f);const hp=mat305(.2,.004);hp.position.set(-.45,.25,0);G.add(hp)}
 return G}catch(e){return n0.apply(this,arguments)}}}
// les bateaux des petits films de la carte (navires qui passent, cabotage, pirates) : le même navire, plus le bloc
bateauMesh=function(){const G=new THREE.Group();try{const n=g168Navire('navire');n.scale.setScalar(.6);G.add(n)}catch(e){}return G};
