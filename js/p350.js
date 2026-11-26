// ===== p350 : le camp comme sur l'aquarelle de Paris. Des cases en planches grises et brunes, au grand toit de paille
// qui déborde, certaines sur pilotis avec trois marches ; devant, les calebasses, les bols de bois, les nattes tressées ;
// le jardin en buttes de terre brune, patates douces et songes ; le bois de feu empilé. Dans la vue du camp et à l'arrivée
// des marches d'épopée (au lieu des cônes et des modèles trop lisses). =====
const T350={};
function tex350(k){if(T350[k])return T350[k];const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');let s=k.length*977+13;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};
 if(k==='planche'){for(let x=0;x<256;){const w=18+r()*16,v=70+r()*45|0,b=v-12+r()*10|0;g.fillStyle='rgb('+v+','+(v-8)+','+(b-18)+')';g.fillRect(x,0,w,256);for(let i=0;i<14;i++){g.fillStyle='rgba('+(30+r()*40|0)+','+(25+r()*30|0)+',20,'+(.12+r()*.18)+')';g.fillRect(x+r()*w,0,1+r()*2,256)}g.fillStyle='rgba(20,14,8,.85)';g.fillRect(x+w-2,0,2.5,256);x+=w}
  for(let i=0;i<5;i++){g.fillStyle='rgba(200,190,170,.08)';g.fillRect(0,r()*256,256,8+r()*20)}}
 else if(k==='paille'){g.fillStyle='#8a7038';g.fillRect(0,0,256,256);for(let row=0;row<6;row++){const y0=row*44;for(let i=0;i<420;i++){const x=r()*256,l=30+r()*30,v=r();g.strokeStyle=v<.33?'rgba(200,168,96,.7)':v<.66?'rgba(150,118,58,.7)':'rgba(96,74,36,.6)';g.lineWidth=1+r()*1.5;g.beginPath();g.moveTo(x,y0+r()*8);g.lineTo(x+(r()-.5)*6,y0+l);g.stroke()}g.fillStyle='rgba(40,28,12,.35)';g.fillRect(0,y0+40,256,4)}}
 else if(k==='natte'){g.fillStyle='#b89a5e';g.fillRect(0,0,256,256);for(let i=0;i<16;i++)for(let j=0;j<16;j++){g.fillStyle=(i+j)%2?'rgba(120,92,48,.55)':'rgba(220,196,140,.45)';g.fillRect(i*16+1,j*16+1,14,14)}g.strokeStyle='rgba(80,60,30,.6)';g.lineWidth=3;g.strokeRect(4,4,248,248)}
 else if(k==='terre'){g.fillStyle='#5a3e26';g.fillRect(0,0,256,256);for(let i=0;i<900;i++){g.fillStyle='rgba('+(60+r()*60|0)+','+(40+r()*40|0)+','+(20+r()*30|0)+','+(.3+r()*.4)+')';g.fillRect(r()*256,r()*256,2+r()*4,2+r()*3)}}
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return T350[k]=t}
function case350(o){o=o||{};const W=o.w||3.2,D=o.d||2.6,Hm=o.h||1.8,pil=o.pil?.75:0,ov=.55,G=new THREE.Group();
 const mP=new THREE.MeshLambertMaterial({map:tex350('planche')}),mT=new THREE.MeshLambertMaterial({map:tex350('paille'),color:0x9a8460,side:THREE.DoubleSide}),mB=new THREE.MeshLambertMaterial({color:0x4a3626}),mN=new THREE.MeshBasicMaterial({color:0x140e08});
 const box=(w,h,d,m,x,y,z)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.position.set(x,y,z);G.add(b);return b};
 const y0=pil;// le plancher
 if(pil){for(const x of [-W/2+.1,0,W/2-.1])for(const z of [-D/2+.1,D/2-.1])box(.14,pil+.05,.14,mB,x,pil/2,z);box(W+.1,.1,D+.1,mB,0,pil,0);for(let k=0;k<3;k++)box(.9,.06,.28,mB,0,pil*(k+1)/4-.05,D/2+.35+(2-k)*.26)}
 box(W,Hm,.07,mP,0,y0+Hm/2,-D/2);// arrière
 box(.07,Hm,D,mP,-W/2,y0+Hm/2,0);box(.07,Hm,D,mP,W/2,y0+Hm/2,0);
 const pw=(W-.85)/2;box(pw,Hm,.07,mP,-W/2+pw/2,y0+Hm/2,D/2);box(pw,Hm,.07,mP,W/2-pw/2,y0+Hm/2,D/2);box(.85,Hm-1.35,.07,mP,0,y0+Hm-(Hm-1.35)/2,D/2);// façade et porte
 const porte=new THREE.Mesh(new THREE.PlaneGeometry(.85,1.35),mN);porte.position.set(0,y0+.675,D/2-.04);G.add(porte);
 // pignons
 const R=1.5,sh=new THREE.Shape();sh.moveTo(-W/2,0);sh.lineTo(W/2,0);sh.lineTo(0,R);sh.lineTo(-W/2,0);[D/2,-D/2].forEach(z=>{const p=new THREE.Mesh(new THREE.ShapeGeometry(sh),new THREE.MeshLambertMaterial({map:tex350('planche'),side:THREE.DoubleSide}));p.position.set(0,y0+Hm,z);G.add(p)});
 // le toit de paille, qui déborde largement
 const pente=Math.atan2(R+.25,W/2+ov),L=Math.hypot(W/2+ov,R+.25);[-1,1].forEach(s=>{const t=new THREE.Mesh(new THREE.BoxGeometry(L,.32,D+ov*2),mT);t.position.set(s*(W/2+ov)/2,y0+Hm+R/2-.12,0);t.rotation.z=-s*pente;G.add(t);
  // la frange irrégulière du bord
  for(let k=0;k<9;k++){const f=new THREE.Mesh(new THREE.BoxGeometry(.26,.18+((k*7)%5)*.04,(D+ov*2)/9),mT);f.position.set(s*(W/2+ov-.05),y0+Hm-.32-((k*3)%4)*.03,-(D+ov*2)/2+(k+.5)*(D+ov*2)/9);f.rotation.z=-s*pente;G.add(f)}});
 box(.2,.2,D+ov*2+.1,new THREE.MeshLambertMaterial({map:tex350('paille'),color:0x9a8858}),0,y0+Hm+R+.02,0);// le faîtage
 if(o.auvent){const a=new THREE.Mesh(new THREE.BoxGeometry(W*.7,.12,1.3),mT);a.position.set(-W*.15,y0+Hm-.05,D/2+.6);a.rotation.x=.25;G.add(a);for(const x of [-W*.45,W*.15])box(.1,Hm-.1,.1,mB,x,y0+(Hm-.1)/2,D/2+1.15)}
 G.traverse(m=>{if(m.isMesh)m.castShadow=false});G.userData.r=Math.max(W,D)*.62;return G}
function calebasse350(s){const pts=[];for(let i=0;i<=14;i++){const t=i/14,y=t*1;const r=t<.55?Math.sin(t/.55*Math.PI)*.42:t<.75?.14+(1-(t-.55)/.2)*.1:.1+Math.sin((t-.75)/.25*Math.PI)*.12;pts.push(new THREE.Vector2(Math.max(.02,r),y))}const m=new THREE.Mesh(new THREE.LatheGeometry(pts,12),new THREE.MeshLambertMaterial({color:0xb07a3a}));m.scale.setScalar(s||.5);return m}
function bol350(s){const m=new THREE.Mesh(new THREE.SphereGeometry(.3,12,6,0,6.283,Math.PI/2,Math.PI/2),new THREE.MeshLambertMaterial({color:0xa06a34,side:THREE.DoubleSide}));m.rotation.x=Math.PI;m.scale.set(s||1,(s||1)*.6,s||1);m.position.y=.18*(s||1);const g=new THREE.Group();g.add(m);return g}
function natte350(w,d){const m=new THREE.Mesh(new THREE.PlaneGeometry(w||1.8,d||1.2).rotateX(-Math.PI/2),new THREE.MeshLambertMaterial({map:tex350('natte')}));return m}
// le petit monde devant une case : calebasses, bols, natte, bois empilé
function devant350(sc,Y,x,z,ang,k){const fx=Math.sin(ang),fz=Math.cos(ang),rx=Math.cos(ang),rz=-Math.sin(ang),at=(a,b)=>[x+fx*a+rx*b,z+fz*a+rz*b];
 {const [px,pz]=at(2.3,-.6),n=natte350(1.8,1.2);n.position.set(px,Y(px,pz)+.04,pz);n.rotation.y=ang+.2;sc.add(n)}
 for(let i=0;i<3+(k%3);i++){const [px,pz]=at(1.7+(i%2)*.4,.9+i*.35),c=i%2?bol350(.8+((i*3)%3)*.15):calebasse350(.32+((i*5)%4)*.06);c.position.set(px,Y(px,pz),pz);c.rotation.y=i;sc.add(c)}
 if(k%2===0){const [px,pz]=at(.2,1.9),bm=new THREE.MeshLambertMaterial({color:0x6a4a2a});for(let r=0;r<3;r++)for(let i=0;i<4-r;i++){const b=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.9,6),bm);b.rotation.x=Math.PI/2;b.rotation.z=ang;b.position.set(px+rx*(i-1.5+r*.5)*.17,Y(px,pz)+.09+r*.15,pz+rz*(i-1.5+r*.5)*.17);sc.add(b)}}}
// le jardin : des buttes de terre, des patates douces, des songes
function jardin350(sc,Y,x,z,ang){const G=new THREE.Group(),mt=new THREE.MeshLambertMaterial({map:tex350('terre')}),pat=new THREE.MeshLambertMaterial({color:0x9a4a32}),fe=[0x4f8a30,0x6a9a3a,0x3f7a2a];
 for(let r=0;r<3;r++){const b=new THREE.Mesh(new THREE.CylinderGeometry(.42,.55,.25,8,1).scale(1,1,4.5/0.97),mt);b.position.set(r*1.15-1.15,.1,0);G.add(b);
  for(let k=0;k<7;k++){const zz=-1.9+k*.62;if((r+k)%2){const sg=new THREE.Group();for(let f=0;f<3;f++){const l=new THREE.Mesh(new THREE.CircleGeometry(.28,8).scale(1,1.4,1),new THREE.MeshLambertMaterial({color:fe[(k+f)%3],side:THREE.DoubleSide}));l.position.set(0,.45+f*.05,0);l.rotation.set(-1+f*.2,f*2.1,0);l.translateY(.2);sg.add(l);const t=new THREE.Mesh(new THREE.CylinderGeometry(.015,.02,.5,4),new THREE.MeshLambertMaterial({color:0x5a7a30}));t.position.y=.3;t.rotation.z=(f-1)*.4;sg.add(t)}sg.position.set(r*1.15-1.15,.2,zz);G.add(sg)}
   else{for(let q=0;q<3;q++){const p=new THREE.Mesh(new THREE.SphereGeometry(.11,7,5).scale(1.6,.8,1),pat);p.position.set(r*1.15-1.15+(q-1)*.16,.27,zz+(q%2)*.12);p.rotation.y=q;G.add(p)}}}}
 G.position.set(x,Y(x,z),z);G.rotation.y=ang;sc.add(G);return G}
// ----- dans la vue du camp : les cases deviennent celles de l'aquarelle -----
{const v0=vpCamp152;vpCamp152=function(V){const sc=V.sc,cx=0,cz=-30,Y=(x,z)=>V.h(x,z);
 const boites=sc.children.filter(o=>o.isMesh&&o.geometry&&o.geometry.type==='BoxGeometry'&&o.geometry.parameters&&o.geometry.parameters.width===2.4);
 const L=boites.map((b,i)=>{const p=b.position.clone();b.geometry.parameters.width=2.41;b.visible=false;return [p,i]});// (2.41 : p152 ne les reconnaît plus)
 const r=v0.apply(this,arguments);
 try{L.forEach(([p,i])=>{const c=case350({pil:i%3===1,auvent:i%3===0,w:3+(i%2)*.5,d:2.5+(i%3)*.2});const ang=Math.atan2(cx-p.x,cz-p.z);c.position.set(p.x,Y(p.x,p.z)-.05,p.z);c.rotation.y=ang;sc.add(c);devant350(sc,Y,p.x,p.z,ang,i)});
  // le jardin de cônes de p152 laisse la place aux buttes
  sc.traverse(o=>{if(o.isMesh&&o.geometry&&o.geometry.type==='ConeGeometry'&&o.geometry.parameters&&o.geometry.parameters.radius===.12&&o.geometry.parameters.height===.7)o.visible=false});
  sc.traverse(o=>{if(o.isMesh&&o.geometry&&o.geometry.type==='PlaneGeometry'&&o.geometry.parameters&&o.geometry.parameters.width===4&&o.geometry.parameters.height===2.6)o.visible=false});
  jardin350(sc,Y,cx-3,cz+7.5,0);jardin350(sc,Y,cx+6.5,cz+6,.6)}catch(e){console.warn('p350',e)}return r}}
