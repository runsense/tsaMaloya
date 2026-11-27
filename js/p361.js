// ===== p361 : de vraies rues. Les maisons ne sont plus posées une à une sur les pentes : elles se suivent en front de rue,
// des deux côtés, alignées sur la chaussée, chacune sur son soubassement de basalte (qui rattrape la pente), séparées par des
// murets de pierre et des barrières. La chaussée est en terre battue. Le style suit l'époque :
//  avant 1760, cases de bois au toit de bardeaux ou de paille ; 1760 – 1850, maisons créoles à varangue (galerie sur
//  poteaux) et toit à quatre pans en bardeaux ; après 1850, varangue à lambrequins et toit de tôle peinte. =====
const T361={};
function tx361(k){if(T361[k])return T361[k];const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');let s=k.length*131+7;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};
 if(k==='bardeau'){g.fillStyle='#6a5a48';g.fillRect(0,0,256,256);for(let y=0;y<256;y+=16)for(let x=-(y/16%2)*10;x<256;x+=20){const v=80+r()*40|0;g.fillStyle='rgb('+v+','+(v-12)+','+(v-26)+')';g.fillRect(x+1,y+1,18,14);g.fillStyle='rgba(30,20,10,.45)';g.fillRect(x,y+13,20,3)}}
 else if(k==='tole'){const base=r()<.5?[150,60,48]:[70,96,72];for(let x=0;x<256;x+=16){g.fillStyle='rgb('+base.join(',')+')';g.fillRect(x,0,10,256);g.fillStyle='rgb('+base.map(v=>v-25).join(',')+')';g.fillRect(x+10,0,6,256)}for(let i=0;i<40;i++){g.fillStyle='rgba(120,70,30,.25)';g.fillRect(r()*256,r()*256,4+r()*10,2+r()*30)}}
 else if(k==='terre'){g.fillStyle='#8a6a48';g.fillRect(0,0,256,256);for(let i=0;i<1400;i++){g.fillStyle='rgba('+(110+r()*60|0)+','+(80+r()*40|0)+','+(50+r()*30|0)+','+(.25+r()*.4)+')';g.fillRect(r()*256,r()*256,1+r()*3,1+r()*3)}for(let i=0;i<3;i++){g.strokeStyle='rgba(60,40,24,.18)';g.lineWidth=1.5;const x0=40+i*80+r()*20;g.beginPath();g.moveTo(x0,0);g.lineTo(x0+r()*6-3,256);g.stroke()}for(let i=0;i<60;i++){g.fillStyle='rgba(70,60,50,.5)';g.beginPath();g.arc(r()*256,r()*256,1+r()*2.5,0,7);g.fill()}}
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return T361[k]=t}
function maison361(an,o){o=o||{};const G=new THREE.Group(),W=o.w||6,D=o.d||5,H=an<1760?2.4:3,soub=o.soub||.6;
 const planche=typeof tex350==='function'?tex350('planche'):null,mW=new THREE.MeshLambertMaterial({map:planche,color:o.teinte||0xffffff}),mB=new THREE.MeshLambertMaterial({color:0x4a3626}),mNoir=new THREE.MeshBasicMaterial({color:0x1a120a});
 const mS=new THREE.MeshLambertMaterial({map:(typeof tx125==='function'?tx125('rock_ground',1):null),color:0x9a948a});
 const box=(w,h,d,m,x,y,z)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.position.set(x,y,z);G.add(b);return b};
 // le soubassement descend assez bas pour rattraper la pente
 {const bas=(o.bas||0)+.4,hS=soub+bas;box(W+.2,hS,D+.2,mS,0,soub-hS/2,0)}const y0=soub;
 box(W,H,D,mW,0,y0+H/2,0);
 // fenêtres et porte sur la façade (côté +z, la rue)
 const nf=Math.max(2,Math.round(W/1.6));for(let i=0;i<nf;i++){const x=-W/2+(i+.5)*W/nf,porte=i===Math.floor(nf/2);const f=new THREE.Mesh(new THREE.PlaneGeometry(porte?.9:.75,porte?1.9:1.1),mNoir);f.position.set(x,y0+(porte?.95:1.5),D/2+.01);G.add(f);
  if(!porte){const v=new THREE.Mesh(new THREE.PlaneGeometry(.38,1.15),new THREE.MeshLambertMaterial({color:o.volet||0x4a6a5a,side:THREE.DoubleSide}));v.position.set(x-.58,y0+1.5,D/2+.02);G.add(v);const v2=v.clone();v2.position.x=x+.58;G.add(v2)}}
 // le toit
 const tex=an<1760?(o.paille&&typeof tex350==='function'?tex350('paille'):tx361('bardeau')):an<1850?tx361('bardeau'):tx361('tole'),mT=new THREE.MeshLambertMaterial({map:tex,side:THREE.DoubleSide});
 const R=an<1760?1.9:1.6,ov=.45;
 if(an<1760){// deux pans
  const L=Math.hypot(W/2+ov,R),pa=Math.atan2(R,W/2+ov);[-1,1].forEach(s=>{const t=new THREE.Mesh(new THREE.BoxGeometry(L,.14,D+ov*2),mT);t.position.set(s*(W/2+ov)/2,y0+H+R/2,0);t.rotation.z=-s*pa;G.add(t)});
  const sh=new THREE.Shape();sh.moveTo(-W/2,0);sh.lineTo(W/2,0);sh.lineTo(0,R);[D/2,-D/2].forEach(z=>{const p=new THREE.Mesh(new THREE.ShapeGeometry(sh),mW);p.position.set(0,y0+H,z);G.add(p)})}
 else{// quatre pans
  const g=new THREE.ConeGeometry(1,1,4,1,true);g.rotateY(Math.PI/4);const t=new THREE.Mesh(g,mT);t.scale.set((W/2+ov)*1.414,R,(D/2+ov)*1.414);t.position.set(0,y0+H+R/2,0);G.add(t);
  // la varangue : une galerie sur poteaux devant la façade, avec son garde-corps
  const pv=1.8,ga=new THREE.Mesh(new THREE.BoxGeometry(W,.12,pv),mB);ga.position.set(0,y0,D/2+pv/2);G.add(ga);
  for(let i=0;i<=Math.round(W/1.5);i++){const x=-W/2+i*W/Math.round(W/1.5);box(.12,H,.12,mB,x,y0+H/2,D/2+pv-.06)}
  const av=new THREE.Mesh(new THREE.BoxGeometry(W+.3,.1,pv+.3),mT);av.position.set(0,y0+H+.05,D/2+pv/2);av.rotation.x=-.18;G.add(av);
  box(W,.06,.05,mB,0,y0+.9,D/2+pv-.06);
  if(an>=1850){// les lambrequins
   const c=document.createElement('canvas');c.width=128;c.height=32;const q=c.getContext('2d');q.fillStyle='#f2ecde';for(let i=0;i<8;i++){q.beginPath();q.moveTo(i*16,0);q.lineTo(i*16+16,0);q.lineTo(i*16+16,14);q.arc(i*16+8,14,8,0,Math.PI);q.fill()}
   const tt=new THREE.CanvasTexture(c);tt.wrapS=THREE.RepeatWrapping;tt.repeat.set(W/2,1);const lb=new THREE.Mesh(new THREE.PlaneGeometry(W+.3,.32),new THREE.MeshLambertMaterial({map:tt,transparent:true,side:THREE.DoubleSide}));lb.position.set(0,y0+H-.12,D/2+pv+.12);G.add(lb)}}
 G.userData.prof=D/2+(an<1760?0:1.8);return G}
function rue361(I){if(!I||!I.S3||I.rue361)return;I.rue361=1;const P=I.P,N=I.N,h=I.hAt,an=parseInt(I.C.an)||1750,S3=I.S3;let sd=11+an;const rn=()=>{sd=(sd*16807)%2147483647;return sd/2147483647};
 const bloque=(x,z,r)=>{const a={x,z,r};(I.AG[I.ag(x,z)]||(I.AG[I.ag(x,z)]=[])).push(a)};
 // la chaussée de terre battue
 {const pos=[],uv=[],idx=[];let acc=0;for(let i=0;i<N;i++){const p=P[i],q=P[Math.min(N-1,i+1)],r0=P[Math.max(0,i-1)];let dx=q[0]-r0[0],dz=q[1]-r0[1];const L=Math.hypot(dx,dz)||1;dx/=L;dz/=L;if(i)acc+=Math.hypot(p[0]-P[i-1][0],p[1]-P[i-1][1]);
   for(const s of [-1,1]){const x=p[0]-dz*(an<1700?1.4:3.2)*s,z=p[1]+dx*3.2*s;pos.push(x,h(x,z)+.14,z);uv.push(s<0?0:2.5,acc/2.6)}if(i){const b=(i-1)*2;idx.push(b,b+2,b+1,b+1,b+2,b+3)}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();
  const m=new THREE.Mesh(g,new THREE.MeshLambertMaterial({map:tx361('terre'),color:0x9a8670,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2}));S3.add(m)}
 // les maisons en front de rue : on avance le long du chemin, un lot après l'autre, de chaque côté
 const TE=[0xffffff,0xf2e6cc,0xe0d8c8,0xd8e0d0,0xf0d8c0],VO=[0x4a6a5a,0x6a3a2a,0x3a5a7a,0x6a6a3a];
 for(const s of [1,-1]){let acc=0,suiv=10+rn()*4,n=0;for(let i=1;i<N-6;i++){acc+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);if(acc<suiv)continue;
   const p=P[i],q=P[Math.min(N-1,i+2)],r0=P[Math.max(0,i-2)];let dx=q[0]-r0[0],dz=q[1]-r0[1];const L=Math.hypot(dx,dz)||1;dx/=L;dz/=L;const nx=-dz*s,nz=dx*s;
   const pionnier=an<1700;if(pionnier&&rn()<.45){suiv=acc+6+rn()*8;continue}
   const W=pionnier?3.4+rn()*1.2:5+rn()*2.2,D=pionnier?3+rn()*.8:4.4+rn()*1.2;
   const recul=(pionnier?3.6+rn()*3:an<1760?4.6:6.2)+D/2;const x=p[0]+nx*recul,z=p[1]+nz*recul;
   // le soubassement prend la hauteur du point le plus haut sous la maison (rien ne flotte, rien ne s'enfonce)
   let hy=-1e9,hb=1e9;for(const [a,b] of [[-W/2,-D/2],[W/2,-D/2],[-W/2,D/2],[W/2,D/2]]){const xx=x+dx*a-nx*b*0+nx*b,zz=z+dz*a+nz*b,yy=h(xx,zz);hy=Math.max(hy,yy);hb=Math.min(hb,yy)}
   const m=maison361(an,{w:W,d:D,bas:hy-hb,teinte:TE[(n*3+(s>0?1:0))%TE.length],volet:VO[n%VO.length],paille:pionnier||(an<1720&&rn()<.5)});
   m.position.set(x,hy,z);m.rotation.y=Math.atan2(-nx,-nz)+(pionnier?(rn()-.5)*.6:0);S3.add(m);
   bloque(x,z,Math.max(W,D)*.42);bloque(x+dx*W*.35,z+dz*W*.35,D*.45);bloque(x-dx*W*.35,z-dz*W*.35,D*.45);
   // entre deux maisons : un muret de basalte, ou une barrière de bois
   const gap=pionnier?4+rn()*8:1.4+rn()*1.6;if(!pionnier&&rn()<.7){const mx=x+dx*(W/2+gap/2)-nx*(D/2-.3),mz=z+dz*(W/2+gap/2)-nz*(D/2-.3);const mu=new THREE.Mesh(new THREE.BoxGeometry(gap,.9,.35),rn()<.6?new THREE.MeshLambertMaterial({map:tx125('rock_ground',1),color:0x8a847a}):new THREE.MeshLambertMaterial({color:0x5a4430}));mu.position.set(mx,h(mx,mz)+.4,mz);mu.rotation.y=Math.atan2(dx,dz)+Math.PI/2;S3.add(mu)}
   suiv=acc+W+gap;n++}}
 // en ville, ni sous-bois, ni rochers de rivière, ni fougères
 S3.traverse(o=>{if(o.userData&&o.userData.essence)o.visible=false});if(I.fe346)I.fe346.visible=false;(I.logs346||[]).forEach(t=>t.visible=false)}
// p335 posait des maisons de modèle une à une ; elles sont retirées au profit de la rue
{const h0=habiller335;habiller335=function(I,k,ci){const av=new Set(I.S3.children);const r=h0.apply(this,arguments);try{const m0=mod104;let n=0;
  // on laisse p335 poser chapelle, garnison, maison du gouvernement et drapeau ; on retire ses maisons de rue
  setTimeout(()=>{try{I.S3.children.forEach(o=>{if(av.has(o)||!o.isGroup&&!o.isObject3D)return;const nom=(o.userData&&o.userData.mod104)||o.name||'';if(o.userData&&o.userData.rue335)o.visible=false})}catch(e){}},2500);rue361(I)}catch(e){console.warn('p361',e)}return r}}
{const e0=essences356;essences356=function(I){if(I&&I.C&&I.C.ville)return;return e0.apply(this,arguments)}}
{const r0=riv359;riv359=function(I){if(I&&I.C&&I.C.ville)return;return r0.apply(this,arguments)}}
