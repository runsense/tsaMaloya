
// ===== p168 : la naissance de l'île montre ce qu'elle raconte =====
// 1. Le point chaud et l'Inde : une carte de l'océan Indien — l'Inde passe au-dessus du point chaud (le Deccan s'embrase), puis remonte vers le nord
//    et laisse derrière elle la traînée d'îles (Laquedives, Maldives, Chagos, plateau des Mascareignes, Maurice, La Réunion).
// 2. Sous la mer : on voit sous l'eau (lumière qui tombe, bulles, laves en coussins qui s'empilent).
// 3. Les coulées : de vraies coulées qui partent du sommet et descendent lentement, plusieurs à la fois, rouges au front, noires en refroidissant.
//    Le volcan ne scintille plus.
// 4. Les navires : un boutre arabe, une caravelle portugaise, les armes du roi plantées sur la plage, le navire de 1663 et sa chaloupe à Saint-Paul.
const GEN168={obj:[],cv:null,raf:0};
function g168Add(o){scene.add(o);GEN168.obj.push(o);return o}
function g168Nettoie(){GEN168.obj.forEach(o=>{scene.remove(o);o.traverse&&o.traverse(m=>{if(m.geometry)m.geometry.dispose()})});GEN168.obj=[];if(GEN168.cv){GEN168.cv.remove();GEN168.cv=null}}
function g168Toile(){const C=CINE;if(!C)return null;if(GEN168.cv&&GEN168.cv.isConnected)return GEN168.cv;const c=document.createElement('canvas');c.id='gen168';c.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0';C.el.insertBefore(c,C.el.firstChild);GEN168.cv=c;return c}
function g168Efface(){if(GEN168.cv){GEN168.cv.remove();GEN168.cv=null}}
// ----- 1. la carte du point chaud -----
const IND168=[[68,23.5],[70,21],[72.8,19],[73.5,16],[74.5,13],[76,9.5],[77.5,8],[78.2,9],[79.8,10.3],[80.3,13],[80.2,15.5],[82,17],[85,19.5],[87,21.5],[89,22],[92,22],[92,26],[85,27],[81,28.8],[78,30.5],[75,32.5],[74,34.5],[71.5,33],[70,28],[68.5,26]];
const LKA168=[[79.8,9.8],[81.3,8.5],[81.8,7],[81.2,6.1],[80.1,6],[79.8,8]];
const MDG168=[[49.3,-12],[50.5,-15.5],[49.5,-17.5],[48.5,-20.5],[47.3,-24.8],[45.2,-25.5],[43.6,-23.5],[43.3,-21.5],[44.4,-18],[44,-16.5],[46.3,-15.7],[48,-13.5]];
const AFR168=[[20,14],[43,12.5],[45,13],[52,15.5],[56.5,18],[59.5,22.5],[56.5,26],[50,30],[20,30],[20,14],[43,12],[51,11.8],[50,8],[46,2],[41,-2],[39.5,-5],[40.4,-10.5],[40.5,-15],[35.3,-24],[32.6,-27],[31,-30],[30,-34],[20,-34]];
const ILE168=[['Laquedives',72.6,10.5,.25],['Maldives',73.2,3.2,.42],['Chagos',71.8,-6.3,.58],['plateau des Mascareignes',60.5,-12.5,.72],['Maurice',57.5,-20.2,.86],['La Réunion',55.5,-21.1,.97]];
function g168Carte(k,phase){const c=g168Toile();if(!c)return;const W=c.width=c.clientWidth,H=c.height=c.clientHeight,x=c.getContext('2d');
 const L0=30,L1=100,A0=30,A1=-27,top=H*.1,hh=H*.62,sc=Math.min(W/(L1-L0),hh/(A0-A1)),ox=(W-sc*(L1-L0))/2,oy=top+(hh-sc*(A0-A1))/2;const P=(lo,la)=>[ox+(lo-L0)*sc,oy+(A0-la)*sc];
 const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0e3550');g.addColorStop(1,'#081e30');x.fillStyle=g;x.fillRect(0,0,W,H);
 const poly=(L,dl,da,f,s)=>{x.beginPath();L.forEach(([lo,la],i)=>{const [a,b]=P(lo+dl,la+da);i?x.lineTo(a,b):x.moveTo(a,b)});x.closePath();x.fillStyle=f;x.fill();if(s){x.strokeStyle=s;x.lineWidth=1.5;x.stroke()}};
 poly(AFR168.slice(0,10),0,0,'#5b6a4a');poly(AFR168.slice(10).concat([[20,12]]),0,0,'#5b6a4a','#7a8a64');poly(MDG168,0,0,'#5b6a4a','#7a8a64');
 // l'Inde : posée sur le point chaud il y a 66 millions d'années, puis remontée vers le nord
 const u=phase===1?0:Math.min(1,k*1.05),dl=-14.5*(1-u),da=-31.5*(1-u);
 // le point chaud vu depuis l'Afrique : sous les Mascareignes, puis sous Maurice, puis sous La Réunion (c'est la plaque qui glisse au-dessus)
 const HP=[[0,60.5,-12.5],[.72,60.5,-12.5],[.86,57.5,-20.2],[.97,55.5,-21.1],[1,55.5,-21.1]];let hlo=55.5,hla=-21.1;for(let i=1;i<HP.length;i++)if(u<=HP[i][0]){const f=(u-HP[i-1][0])/Math.max(1e-6,HP[i][0]-HP[i-1][0]);hlo=HP[i-1][1]+(HP[i][1]-HP[i-1][1])*f;hla=HP[i-1][2]+(HP[i][2]-HP[i-1][2])*f;break}poly(IND168,dl,da,'#7a7050','#a09468');poly(LKA168,dl,da,'#7a7050');
 const [hx,hy]=P(hlo,hla),t=performance.now()/1000;
 // le Deccan qui brûle
 if(phase===1){const [dx,dy]=P(75+dl,19+da),r=sc*(3.5+1.2*k);const gd=x.createRadialGradient(dx,dy,0,dx,dy,r*1.6);gd.addColorStop(0,'rgba(255,150,40,.95)');gd.addColorStop(.5,'rgba(220,60,20,.55)');gd.addColorStop(1,'rgba(220,60,20,0)');x.fillStyle=gd;x.beginPath();x.arc(dx,dy,r*1.6,0,7);x.fill()}
 // le point chaud, fixe
 const gh=x.createRadialGradient(hx,hy,0,hx,hy,sc*2.6);gh.addColorStop(0,'rgba(255,120,30,.9)');gh.addColorStop(1,'rgba(255,120,30,0)');x.fillStyle=gh;x.beginPath();x.arc(hx,hy,sc*2.6*(.9+.1*Math.sin(t*1.3)),0,7);x.fill();
 x.font='600 '+Math.max(12,sc*.9|0)+'px system-ui';x.textAlign='left';x.textBaseline='middle';x.fillStyle='#ffd9a0';x.fillText('point chaud',hx+sc*2.2,hy+sc*1.6);
 // la traînée d'îles
 if(phase===2)ILE168.forEach(([n,lo,la,s],i)=>{const ind=i<3;if(ind?(hla-da>la+.5):u<s)return;const [a,b]=ind?P(lo+dl,la+da):P(lo,la);x.fillStyle='#e8d6a0';x.beginPath();x.arc(a,b,Math.max(3,sc*.45),0,7);x.fill();x.fillStyle='#f4ead0';if(n==='La Réunion'){x.textAlign='center';x.fillText(n,a-sc*.3,b+sc*2.6);x.textAlign='left'}else x.fillText(n,a+sc*.8,n==='Maurice'?b-sc*.6:b)});
 x.fillStyle='rgba(244,234,208,.85)';x.textAlign='center';x.font='600 '+Math.max(13,sc|0)+'px system-ui';const [ix,iy]=P(78+dl,22+da);x.fillText('Inde',ix,iy);const [mx,my]=P(46.5,-19.5);x.fillText('Madagascar',mx,my);const [ax,ay]=P(34,2);x.fillText('Afrique',ax,ay)}
// ----- 2. sous la mer -----
const BUL168=[];
function g168SousMer(k){const c=g168Toile();if(!c)return;const W=c.width=c.clientWidth,H=c.height=c.clientHeight,x=c.getContext('2d'),t=performance.now()/1000;
 const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(20,90,120,.55)');g.addColorStop(.6,'rgba(6,30,50,.72)');g.addColorStop(1,'rgba(2,10,20,.85)');x.fillStyle=g;x.fillRect(0,0,W,H);
 x.globalCompositeOperation='lighter';for(let i=0;i<7;i++){const a=W*(.1+i*.14)+Math.sin(t*.3+i)*30;x.fillStyle='rgba(120,200,230,'+(.04+.03*Math.sin(t*.7+i*2))+')';x.beginPath();x.moveTo(a-20,0);x.lineTo(a+25,0);x.lineTo(a+120,H*.75);x.lineTo(a+40,H*.75);x.fill()}
 // les laves en coussins qui s'empilent au fond, au centre
 const cx=W/2,by=H*.82,n=Math.floor(6+k*30);for(let i=0;i<n;i++){const a=(i*137.5)%360*Math.PI/180,r=(i/40)*W*.16,px=cx+Math.cos(a)*r*1.6,py=by-Math.abs(Math.sin(a))*r*.5-(i/40)*H*.18*k,hot=i>n-6;
  const gr=x.createRadialGradient(px,py,0,px,py,14);gr.addColorStop(0,hot?'rgba(255,140,40,.9)':'rgba(90,40,30,.5)');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.beginPath();x.arc(px,py,14,0,7);x.fill()}
 x.globalCompositeOperation='source-over';
 if(BUL168.length<60&&Math.random()<.5)BUL168.push({x:cx+(Math.random()-.5)*W*.25,y:by,v:20+Math.random()*40,r:1.5+Math.random()*3});
 BUL168.forEach(b=>{b.y-=b.v/60;b.x+=Math.sin(t*3+b.v)*.4;x.strokeStyle='rgba(200,240,255,.6)';x.lineWidth=1;x.beginPath();x.arc(b.x,b.y,b.r,0,7);x.stroke()});for(let i=BUL168.length-1;i>=0;i--)if(BUL168[i].y<0)BUL168.splice(i,1)}
// ----- 3. les coulées -----
function g168Haut(x,z){const U=terr.material.uniforms;let y=Math.max(-200,alt(x,z))*VX;try{if(U.shH&&U.ero){const C=U.shC.value,r=Math.min(1,Math.hypot(x-C.x,z-C.y)/C.z),hs=Math.min(U.shH.value*(1-Math.pow(r,1.6)),U.shH.value*(.9-.1*r)),
  sm=r<=.55?1:r>=1?0:1-((r-.55)/.45)*((r-.55)/.45)*(3-2*(r-.55)/.45),ws=(1-U.ero.value)*sm;y=y+(Math.max(y*.5,hs)-y)*ws}}catch(e){}
 let m=1;try{const v=U.vol.value,d=Math.hypot(x-v.x,z-v.y),s=d<=3?0:d>=9?1:((d-3)/6)*((d-3)/6)*(3-2*(d-3)/6);m=U.fz.value+(1-U.fz.value)*s}catch(e){}return y*U.ech.value*m+U.dec.value}
function g168Chemin(x0,z0,radial,cx,cz){const P=[[x0,z0]];let x=x0,z=z0;for(let i=0;i<220;i++){let nx,nz;
  if(radial){const d=Math.hypot(x-cx,z-cz)||1,an=Math.atan2(z-cz,x-cx)+Math.sin(i*.18+x0*13)*.55+Math.sin(i*.07+z0*5)*.35;nx=x+Math.cos(an)*.08;nz=z+Math.sin(an)*.08}
  else{let bh=alt(x,z),bx=null,bz=null;for(let a=0;a<16;a++){const an=a/16*6.283,X=x+Math.cos(an)*.08,Z=z+Math.sin(an)*.08,h=alt(X,Z);if(h<bh){bh=h;bx=X;bz=Z}}if(bx==null)break;nx=bx;nz=bz}
  x=nx;z=nz;P.push([x,z]);if(alt(x,z)<=0)break}return P}
function g168Coulee(P,larg,debut,duree){const V=[],UV=[],I=[];let L=0;const D=[0];for(let i=1;i<P.length;i++){L+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);D.push(L)}
 P.forEach((q,i)=>{const a=P[Math.max(0,i-2)],b=P[Math.min(P.length-1,i+2)];let dx=b[0]-a[0],dz=b[1]-a[1];const l=Math.hypot(dx,dz)||1;dx/=l;dz/=l;const w=larg*(1+.6*D[i]/(L||1));
  [-1,1].forEach(s=>{V.push(q[0]-dz*w*s,0,q[1]+dx*w*s);UV.push(s<0?0:1,D[i]/(L||1))});if(i){const o=(i-1)*2;I.push(o,o+1,o+2,o+1,o+3,o+2)}});
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(V,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(UV,2));g.setIndex(I);
 const m=new THREE.ShaderMaterial({uniforms:{fr:{value:0},t:{value:0}},transparent:true,depthWrite:false,side:THREE.DoubleSide,
  vertexShader:'varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:'uniform float fr,t;varying vec2 vU;void main(){if(vU.y>fr)discard;float age=fr-vU.y;float bord=1.-abs(vU.x-.5)*2.;float tete=smoothstep(.06,0.,age);float flux=.5+.5*sin(vU.y*80.-t*1.6);vec3 chaud=vec3(1.,.55,.12),froid=vec3(.16,.07,.05);vec3 c=mix(chaud,froid,smoothstep(.04,.45,age));c=mix(c,vec3(1.,.85,.4),tete*.8);c+=vec3(.25,.08,0.)*flux*(1.-smoothstep(.0,.3,age))*bord;gl_FragColor=vec4(c,smoothstep(0.,.25,bord)*.95);}'});
 const me=new THREE.Mesh(g,m);me.renderOrder=6;me.userData={debut,duree,P};me.frustumCulled=false;return g168Add(me)}
function g168Coulees(cx,cz,n,radial,k0){const L=[];for(let i=0;i<n;i++){const a=radial?i/n*6.283+.7+(k0||0):(-1+2*(i+.5)/n)*1.1+(k0||0)*.2,r=radial?.6:.35,x0=cx+Math.cos(a)*r,z0=cz+Math.sin(a)*r;L.push(g168Coulee(g168Chemin(x0,z0,true,cx,cz),radial?.2:.13,.05+i*(.5/n)+((i*37)%7)*.02,.8))}return L}
function g168MajCoulees(k){const t=performance.now()/1000;GEN168.obj.forEach(o=>{if(!o.material||!o.material.uniforms||!o.material.uniforms.fr)return;const d=o.userData;o.material.uniforms.fr.value=Math.max(0,Math.min(1,(k-d.debut)/d.duree));o.material.uniforms.t.value=t;
  const pos=o.geometry.attributes.position,P=d.P;for(let i=0;i<P.length;i++){const y=g168Haut(P[i][0],P[i][1])+.04;pos.setY(i*2,y);pos.setY(i*2+1,y)}pos.needsUpdate=true})}
// ----- 4. les navires -----
function g168Navire(type){const g=new THREE.Group(),M=c=>new THREE.MeshLambertMaterial({color:c,side:THREE.DoubleSide});const L=type==='boutre'?.7:type==='chaloupe'||type==='pirogue'?.22:.9;
 const sh=new THREE.Shape();sh.moveTo(-L/2,0);sh.quadraticCurveTo(-L*.2,-L*.16,L*.35,-L*.1);sh.lineTo(L/2,.04);sh.lineTo(-L/2,.06);const h=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:L*.22,bevelEnabled:false}),M(type==='boutre'?0x7a5232:0x4a3220));h.position.z=-L*.11;h.position.y=L*.1;g.add(h);
 if(type==='chaloupe'||type==='pirogue')return g;
 const mat=(x,hh)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.012,.016,hh,6),M(0x3a2a1a));m.position.set(x,L*.1+hh/2,0);g.add(m);return m};
 if(type==='boutre'){mat(.05,.6);const v=new THREE.Shape();v.moveTo(-.32,.12);v.lineTo(.3,.72);v.lineTo(.12,.12);const s=new THREE.Mesh(new THREE.ShapeGeometry(v),M(0xe8dcc0));s.position.y=L*.1;g.add(s)}
 else{const tex=c=>{const cv=document.createElement('canvas');cv.width=cv.height=64;const x=cv.getContext('2d');x.fillStyle='#ece2c8';x.fillRect(0,0,64,64);if(c){x.fillStyle=c;x.fillRect(27,6,10,52);x.fillRect(10,24,44,10)}return new THREE.CanvasTexture(cv)};
  [[-.25,.5],[.08,.62],[.33,.42]].forEach(([px,hh],i)=>{mat(px,hh);const s=new THREE.Mesh(new THREE.PlaneGeometry(.2,hh*.55),new THREE.MeshLambertMaterial({map:tex(type==='caravelle'?'#b02020':null),side:THREE.DoubleSide}));s.rotation.y=Math.PI/2;s.position.set(px,L*.1+hh*.55,0);g.add(s)})}
 return g}
function g168Drapeau(){const g=new THREE.Group();const m=new THREE.Mesh(new THREE.CylinderGeometry(.01,.012,.7,6),new THREE.MeshLambertMaterial({color:0x5a3a22}));m.position.y=.35;g.add(m);
 const cv=document.createElement('canvas');cv.width=96;cv.height=64;const x=cv.getContext('2d');x.fillStyle='#1c3a8a';x.fillRect(0,0,96,64);x.fillStyle='#e8c040';x.font='22px serif';x.textAlign='center';x.textBaseline='middle';[[30,20],[66,20],[48,46]].forEach(([a,b])=>x.fillText('⚜',a,b));
 const f=new THREE.Mesh(new THREE.PlaneGeometry(.3,.2,8,1),new THREE.MeshLambertMaterial({map:new THREE.CanvasTexture(cv),side:THREE.DoubleSide}));f.position.set(.16,.58,0);g.add(f);g.userData.f=f;return g}
function g168Pose(o,lo,la,dy){const [x,z]=xz(lo,la);o.position.set(x,Math.max(0,alt(x,z))*VX+(dy||0),z);return o}
// ----- branchement sur le film -----
{const cj=cineJouer;cineJouer=function(L,done){try{if((L||[]).some(s=>/perce la surface/.test(s.txt||''))&&!L.some(s=>s.g168)){
  const pose=(re,o)=>{const s=L.find(s=>re.test(s.txt||''));if(s){Object.assign(s,{g168:1});const i0=s.init,f0=s.f;s.init=U=>{if(i0)i0(U);g168Efface();if(o.init)o.init(U)};s.f=(U,k)=>{if(f0)f0(U,k);if(o.f)o.f(U,k)};if(o.cam){s.cam=o.cam(s.cam);const i1=s.init;s.init=U=>{i1(U);try{const [x,z,d,a,pp]=s.cam;CINE.from={x,z,y:0,d,a,p:pp}}catch(e){}}}if(o.d)s.d=o.d}};
  const [px,pz]=xz(55.489,-21.099),[fx,fz]=xz(55.714,-21.244),[sp,spz]=xz(55.27,-21.0);
  pose(/Sous l’Inde/,{f:(U,k)=>g168Carte(k,1)});
  pose(/remonte vers le nord/,{d:8500,f:(U,k)=>g168Carte(k,2)});
  pose(/sous la mer/,{f:(U,k)=>g168SousMer(k)});
  pose(/perce la surface/,{init:U=>{g168Coulees(px,pz,6,true)},f:(U,k)=>g168MajCoulees(k)});
  pose(/second volcan s’ouvre/,{init:U=>{g168Coulees(fx,fz,3,false)},f:(U,k)=>{U.lave.value=.55;g168MajCoulees(k)}});
  pose(/creusent trois cirques/,{init:U=>{GEN168.obj.slice().forEach(o=>{if(o.userData.mer){scene.remove(o);GEN168.obj.splice(GEN168.obj.indexOf(o),1)}});GEN168.obj.slice().forEach(o=>{if(o.material&&o.material.uniforms&&o.material.uniforms.fr){scene.remove(o);GEN168.obj.splice(GEN168.obj.indexOf(o),1)}})}});
  pose(/jamais endormie/,{init:U=>{g168Coulees(fx,fz,4,false,1.3)},f:(U,k)=>{U.lave.value=.55;g168MajCoulees(k)}});
  pose(/marins arabes/,{cam:c=>{const [x,z]=xz(55.262,-21.0);return [x,z,6,-1.57,1.27]},init:U=>{GEN168.obj.slice().forEach(o=>{if(o.material&&o.material.uniforms&&o.material.uniforms.fr){scene.remove(o);GEN168.obj.splice(GEN168.obj.indexOf(o),1)}});const b=g168Add(g168Navire('boutre'));b.userData.nav={lo0:55.243,la0:-20.955,lo1:55.247,la1:-21.045}},f:(U,k)=>g168Navs(k)});
  pose(/Portugais passent/,{cam:c=>{const [x,z]=xz(55.745,-21.03);return [x,z,6,1.57,1.27]},init:U=>{GEN168.obj.slice().forEach(o=>{if(o.userData.nav){scene.remove(o);GEN168.obj.splice(GEN168.obj.indexOf(o),1)}});const b=g168Add(g168Navire('caravelle'));b.userData.nav={lo0:55.768,la0:-20.975,lo1:55.772,la1:-21.09}},f:(U,k)=>g168Navs(k)});
  pose(/armes du roi/,{cam:c=>{const [x,z]=xz(55.32,-21.005);return [x,z,5.5,-1.57,1.25]},init:U=>{GEN168.obj.slice().forEach(o=>{if(o.userData.nav){scene.remove(o);GEN168.obj.splice(GEN168.obj.indexOf(o),1)}});g168Mer();const d=g168Add(g168Pose(g168Drapeau(),55.33,-21.0));d.scale.setScalar(1.1);d.rotation.y=Math.PI/2;d.userData.dr=1;const n=g168Add(g168Navire('navire'));g168Pose(n,55.312,-20.998,0);n.position.y=0;n.userData.nv=1},f:(U,k)=>{GEN168.obj.forEach(o=>{if(o.userData.dr){try{if(!o.userData.pl&&k>.02){o.userData.pl=1}const nv=GEN168.obj.find(q=>q.userData.nv);if(nv){o.position.set(nv.position.x-.42,nv.position.y+.12,nv.position.z)}}catch(e){}o.scale.y=1.1*Math.min(1,k*2.5);const f=o.userData.f,p=f.geometry.attributes.position,t=performance.now()/300;for(let i=0;i<p.count;i++){const xx=p.getX(i);p.setZ(i,Math.sin(t+xx*20)*.02*(xx+.15)*4)}p.needsUpdate=true}})}});
  pose(/débarque à Saint-Paul/,{cam:c=>{const [x,z]=xz(55.32,-21.005);return [x,z,5.5,-1.57,1.25]},init:U=>{g168Mer();GEN168.obj.slice().forEach(o=>{if(o.userData.nav||o.userData.dr||o.userData.nv){scene.remove(o);GEN168.obj.splice(GEN168.obj.indexOf(o),1)}});const n=g168Add(g168Navire('navire'));g168Pose(n,55.305,-21.0,0);n.position.y=0;const ch=g168Add(g168Navire('chaloupe'));ch.userData.nav={lo0:55.31,la0:-21.0,lo1:55.338,la1:-21.006}},f:(U,k)=>g168Navs(Math.min(1,k*1.3))});
  // les marrons montent : le sentier qui s'élève de Saint-Paul vers les remparts
  pose(/quittent le camp et montent/,{init:U=>{const [ax,az]=xz(55.29,-21.0),[bx,bz]=xz(55.43,-21.07);const P=[];for(let i=0;i<=40;i++){const u=i/40,x=ax+(bx-ax)*u+Math.sin(u*9)*.15,z=az+(bz-az)*u+Math.cos(u*7)*.1;P.push([x,z])}const c=g168Coulee(P,.03,0,1);c.material.fragmentShader='uniform float fr,t;varying vec2 vU;void main(){if(vU.y>fr)discard;float d=step(.5,fract(vU.y*40.));gl_FragColor=vec4(1.,.9,.6,d*.9);}';c.material.needsUpdate=true},f:(U,k)=>g168MajCoulees(k)});
 }}catch(e){console.warn('g168',e)}return cj.call(this,L,()=>{g168Nettoie();if(done)done()})}}
function g168Mer(){if(GEN168.obj.some(o=>o.userData.mer))return;const m=new THREE.Mesh(new THREE.PlaneGeometry(120,120),new THREE.MeshLambertMaterial({color:0x1f6a86,transparent:true,opacity:.92}));m.rotation.x=-Math.PI/2;m.position.y=-.07;m.userData.mer=1;m.renderOrder=-1;g168Add(m)}
function g168Navs(k){g168Mer();GEN168.obj.forEach(o=>{const n=o.userData.nav;if(!n)return;const lo=n.lo0+(n.lo1-n.lo0)*k,la=n.la0+(n.la1-n.la0)*k,[x,z]=xz(lo,la),[x1,z1]=xz(n.lo1,n.la1);o.position.set(x,.02+Math.sin(performance.now()/500)*.01,z);o.rotation.y=Math.atan2(-(z1-z),x1-x);o.rotation.z=Math.sin(performance.now()/700)*.04})}
{const cf=cineFin;cineFin=function(){g168Nettoie();return cf.apply(this,arguments)}}
