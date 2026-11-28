// ===== p391 : la petite vie qu'on voit en marchant. En incarnation : des chevaquines dans l'eau claire du bord, des poissons qui sautent
// (dans la rivière et dans les petits bassins), des tangues qui fouillent les berges — surtout au début de la marche, le matin —
// et qui détalent quand on approche ; des endormis sur les troncs, des margouillats et des lézards verts (comme ceux de Manapany)
// sur les troncs et les murs. Près des cases des colons : des bananiers. =====
const PV391={on:null};
function pv391(){const I=typeof INC!=='undefined'&&INC;if(!I||!I.S3||I.pv391)return;I.pv391=1;const S3=I.S3,h=I.hAt,R=I.riv||[],G=new THREE.Group();S3.add(G);const A=[];
 const M=c=>new THREE.MeshLambertMaterial({color:c}),rr=Math.random;
 // chevaquines : petites crevettes translucides en bancs, dans l'eau peu profonde du bord
 {const L=[];R.forEach(([cx,cz,lw],i)=>{if(i%3)return;for(let k=0;k<6;k++){const a=rr()*6.28,d=lw*.75+rr()*.3;L.push([cx+Math.cos(a)*d,cz+Math.sin(a)*d])}});
  const im=new THREE.InstancedMesh(new THREE.CylinderGeometry(.012,.012,.07,4),new THREE.MeshLambertMaterial({color:0xc8d8d0,transparent:true,opacity:.55}),L.length);
  const m4=new THREE.Matrix4(),q=new THREE.Quaternion(),v=new THREE.Vector3(),s=new THREE.Vector3(1,1,1);L.forEach(([x,z],k)=>{const i=Math.floor(k/6)*3;const y=((R[i]&&I.riv[i])?h(x,z):0);q.setFromEuler(new THREE.Euler(Math.PI/2,0,rr()*6.28));m4.compose(v.set(x,y,z),q,s);im.setMatrixAt(k,m4)});
  // posées juste sous la surface : on les remonte au niveau de l'eau à la première image
  G.add(im);PV391.chev=im}
 // les poissons qui sautent : dans la rivière, et dans de petits bassins creusés au bord
 const poisson=()=>{const g=new THREE.Group(),b=new THREE.Mesh(new THREE.SphereGeometry(.06,8,6),M(0x9aa8a0));b.scale.set(2.2,.8,.7);g.add(b);const t=new THREE.Mesh(new THREE.ConeGeometry(.05,.08,4),M(0x8a9890));t.rotation.z=Math.PI/2;t.position.x=-.15;g.add(t);g.visible=false;G.add(g);return g};
 const SAUT=[];R.forEach(([cx,cz,lw],i)=>{if(i%5)return;SAUT.push({x:cx,z:cz,y:h(cx,cz),o:poisson(),t:rr()*8})});
 // petits bassins : un disque d'eau calme, deux pierres, un poisson
 R.forEach(([cx,cz,lw],i)=>{if(i%17!==8)return;const a=rr()*6.28,x=cx+Math.cos(a)*(lw+2.2),z=cz+Math.sin(a)*(lw+2.2),y=h(x,z)+.03;const e=new THREE.Mesh(new THREE.CircleGeometry(.9+rr()*.6,20),new THREE.MeshLambertMaterial({color:0x4a7a80,transparent:true,opacity:.85}));e.rotation.x=-Math.PI/2;e.position.set(x,y,z);G.add(e);
  for(let k=0;k<3;k++){const p=new THREE.Mesh(new THREE.DodecahedronGeometry(.25+rr()*.15,0),M(0x6a6660));const b=rr()*6.28;p.position.set(x+Math.cos(b)*1.1,y,z+Math.sin(b)*1.1);G.add(p)}SAUT.push({x,z,y,o:poisson(),t:rr()*6})});
 // les tangues : sur les berges, plus nombreuses au début de la marche (le matin)
 const tangue=()=>{const g=new THREE.Group(),b=new THREE.Mesh(new THREE.SphereGeometry(.12,8,6),M(0x5a4430));b.scale.set(1.6,.9,1);b.position.y=.1;g.add(b);const n=new THREE.Mesh(new THREE.ConeGeometry(.05,.14,6),M(0x6a5038));n.rotation.z=-Math.PI/2;n.position.set(.24,.1,0);g.add(n);
  for(let k=0;k<6;k++){const p=new THREE.Mesh(new THREE.ConeGeometry(.012,.09,4),M(0xd8d0b8));p.position.set(-.05+k*.04,.21,(k%2?.03:-.03));p.rotation.z=.3;g.add(p)}G.add(g);return g};
 const TG=[];R.forEach(([cx,cz,lw],i)=>{const debut=i<R.length*.35;if(i%(debut?4:9))return;const a=rr()*6.28,x=cx+Math.cos(a)*(lw+1+rr()*2),z=cz+Math.sin(a)*(lw+1+rr()*2);const o=tangue();o.position.set(x,h(x,z),z);TG.push({o,x,z,dir:rr()*6.28,fuit:0})});
 // endormis, margouillats, lézards verts : sur des troncs le long du chemin
 const lez=(c,l)=>{const g=new THREE.Group(),b=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,l,6),M(c));g.add(b);const q=new THREE.Mesh(new THREE.ConeGeometry(.018,l*.9,5),M(c));q.position.y=-l*.9;q.rotation.x=Math.PI;g.add(q);G.add(g);return g};
 const TR=(I.TT||[]).filter(a=>a.k==='arbre'&&(I.dPiste?I.dPiste(a.x,a.z)<7:true)).slice(0,400);const LZ=[];
 TR.forEach((a,k)=>{if(k%9)return;const typ=k%27===0?'endormi':k%18===0?'vert':'margouillat';const c=typ==='endormi'?0x4f9a3a:typ==='vert'?0x3cc04a:0xb8ad90,l=typ==='endormi'?.12:.08;const o=lez(c,l);const ang=rr()*6.28,yy=a.y+1+rr()*1.4;o.position.set(a.x+Math.cos(ang)*.2*a.s,yy,a.z+Math.sin(ang)*.2*a.s);o.rotation.y=-ang;
  if(typ==='vert'){const t=new THREE.Mesh(new THREE.SphereGeometry(.012,6,4),M(0xd83020));t.position.set(0,.03,.025);o.add(t)}LZ.push({o,typ,y0:yy,ph:rr()*6})});
 // les bananiers près des cases des colons, au départ
 try{const p0=I.P[0];for(let k=0;k<14;k++){const a=k*.45+rr()*.2,d=8+rr()*10,x=p0[0]+Math.cos(a)*d,z=p0[1]+Math.sin(a)*d;if(I.dPiste&&I.dPiste(x,z)<2.4)continue;const y=h(x,z),g=new THREE.Group();
   const tr=new THREE.Mesh(new THREE.CylinderGeometry(.12,.18,2.2,7),M(0x7a8a4a));tr.position.y=1.1;g.add(tr);for(let f=0;f<7;f++){const fe=new THREE.Mesh(new THREE.PlaneGeometry(2,.5),new THREE.MeshLambertMaterial({color:f%2?0x5a9a3a:0x4a8a32,side:THREE.DoubleSide}));fe.position.set(Math.cos(f)*.6,2.3,Math.sin(f)*.6);fe.rotation.set(-.5,-f,0);g.add(fe)}
   if(k%3===0){const r=new THREE.Mesh(new THREE.SphereGeometry(.2,6,6),M(0x9ab040));r.scale.set(1,1.6,1);r.position.set(.25,1.7,0);g.add(r)}g.position.set(x,y,z);g.scale.setScalar(.9+rr()*.4);G.add(g)}}catch(e){}

 // moustiques au-dessus de l'eau, mouches autour des bêtes et des cases : des nuées de points qui tournent
 const NU=[];const nuee=(x,y,z,n,c,r)=>{const g=new THREE.BufferGeometry(),a=new Float32Array(n*3);g.setAttribute('position',new THREE.BufferAttribute(a,3));const pt=new THREE.Points(g,new THREE.PointsMaterial({color:c,size:.035,transparent:true,opacity:.8}));pt.position.set(x,y,z);G.add(pt);NU.push({pt,n,r,ph:rr()*6})};
 R.forEach(([cx,cz,lw],i)=>{if(i%6===2)nuee(cx+lw*.9,h(cx,cz)+.6,cz,18,0x202020,.5)});
 try{const p0=I.P[0];for(let k=0;k<5;k++){const a=rr()*6.28,d=4+rr()*8;nuee(p0[0]+Math.cos(a)*d,h(p0[0]+Math.cos(a)*d,p0[1]+Math.sin(a)*d)+.8,p0[1]+Math.sin(a)*d,14,0x101010,.35)}}catch(e){}
 // la babouk : la grande araignée jaune et noire dans sa toile dorée, tendue entre deux arbres près du chemin
 TR.forEach((a,k)=>{if(k%23!==5)return;const w=new THREE.Mesh(new THREE.CircleGeometry(.55,14),new THREE.MeshBasicMaterial({color:0xd8c070,transparent:true,opacity:.18,side:THREE.DoubleSide,wireframe:true}));const ang=rr()*6.28;w.position.set(a.x+Math.cos(ang)*.9,a.y+1.8,a.z+Math.sin(ang)*.9);w.rotation.y=ang;G.add(w);
  const sp=new THREE.Mesh(new THREE.SphereGeometry(.05,8,6),M(0xd8b020));sp.scale.set(1,2,1);w.add(sp);for(let j=0;j<8;j++){const l=new THREE.Mesh(new THREE.CylinderGeometry(.006,.006,.22,3),M(0x1a1a1a));l.position.set((j<4?-1:1)*.07,(j%4-1.5)*.05,0);l.rotation.z=(j<4?1:-1)*(.9+(j%4)*.2);sp.add(l)}});
 // les rats : arrivés avec les navires, ils courent près des cases et des réserves
 try{const p0=I.P[0];for(let k=0;k<6;k++){const g=new THREE.Group(),b=new THREE.Mesh(new THREE.SphereGeometry(.06,8,6),M(0x5a5248));b.scale.set(1.8,.8,.9);b.position.y=.05;g.add(b);const q=new THREE.Mesh(new THREE.CylinderGeometry(.008,.004,.18,4),M(0xa08878));q.rotation.z=Math.PI/2;q.position.set(-.18,.04,0);g.add(q);G.add(g);const a=rr()*6.28,d=3+rr()*7,x=p0[0]+Math.cos(a)*d,z=p0[1]+Math.sin(a)*d;g.position.set(x,h(x,z),z);TG.push({o:g,x,z,dir:rr()*6.28,fuit:0,rat:1})}}catch(e){}
 PV391.on={I,G,SAUT,TG,LZ,NU,t0:performance.now()}}
// l'animation : les poissons sautent, les tangues fouillent puis détalent, les lézards bougent par à-coups
(function b391(){requestAnimationFrame(b391);const P=PV391.on;if(!P)return;const I=typeof INC!=='undefined'&&INC;if(!I||I!==P.I){PV391.on=null;return}
 try{if(!I.pv391ok&&PV391.chev){I.pv391ok=1}const s=performance.now()/1000,h=I.hAt,hx=(I.h&&I.h.x)||((I.cps&&I.cps[0]&&I.cps[0].x)||0),hz=(I.h&&I.h.z)||0;
  P.SAUT.forEach(f=>{const T=(s+f.t)%7;if(T<.7){const u=T/.7;f.o.visible=true;f.o.position.set(f.x+u*.6,f.y+.05+Math.sin(u*Math.PI)*.45,f.z);f.o.rotation.z=Math.cos(u*Math.PI)*.9}else f.o.visible=false});
  P.TG.forEach(t=>{const d=Math.hypot(t.x-hx,t.z-hz);if(d<5)t.fuit=1.5;const v=t.fuit>0?(t.rat?3:2.2):(t.rat?.6:.25);if(t.fuit>0){t.fuit-=1/60;t.dir=Math.atan2(t.z-hz,t.x-hx)}else if(Math.random()<.01)t.dir+=Math.random()-.5;
   t.x+=Math.cos(t.dir)*v/60;t.z+=Math.sin(t.dir)*v/60;t.o.position.set(t.x,h(t.x,t.z),t.z);t.o.rotation.y=-t.dir});
  (P.NU||[]).forEach(u=>{const a=u.pt.geometry.attributes.position;for(let k=0;k<u.n;k++){const t=s*(2+k%3)+k*1.7+u.ph;a.setXYZ(k,Math.cos(t)*u.r*((k%5)/5+.3),Math.sin(t*1.3)*.25,Math.sin(t)*u.r*((k%4)/4+.3))}a.needsUpdate=true});
  P.LZ.forEach(l=>{const k=Math.floor(s*(l.typ==='endormi'?.3:1.2)+l.ph);l.o.position.y=l.y0+((k%5)/5-.5)*(l.typ==='endormi'?.05:.2)})}catch(e){}})();
{const o0=incOuvrir287;incOuvrir287=function(){const r=o0.apply(this,arguments);try{setTimeout(pv391,300)}catch(e){}return r}}
// sur la carte : des bananiers près des cases des colons
function banan391Mod(){if(MOD.env_bananier||typeof p23Mod!=='function')return;const TR=TR23,P=[[new THREE.CylinderGeometry(.006,.009,.11,6),0x7a8a4a,TR(0,.055,0)]];for(let f=0;f<6;f++)P.push([new THREE.BoxGeometry(.09,.003,.03),f%2?0x5a9a3a:0x4a8a32,TR(Math.cos(f)*.03,.115,Math.sin(f)*.03,0,-f,-.5)]);p23Mod('env_bananier',P)}
{const rl=remplirLieu;remplirLieu=function(){const r=rl.apply(this,arguments);try{const t=lieu;if(!t||t.bare||!S||!S.voieC||(S.year||0)<1665)return r;const o=S.t[t.i]||{};if(o.b!=='camp')return r;banan391Mod();const m=MOD.env_bananier;if(!m)return r;const hC=new THREE.Color(1,1,1);
 for(let k=0;k<18;k++){const a=rndH(k*3.3+t.i)*6.283,d=1.0+rndH(k*1.7)*.6,x=t.x+Math.cos(a)*d,z=t.z+Math.sin(a)*d,h=alt(x,z);if(h<3)continue;poseM(m,x,h*VX+.02,z,a,0,0,1.3,hC)}}catch(e){}return r}}
