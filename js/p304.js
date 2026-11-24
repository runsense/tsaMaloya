// ===== p304 : la naissance de l'île, aussi belle que la carte, et on voit ce que le texte raconte =====
// 1. Le relief de la genèse prend les vrais sols (roche nue, coulées brûlées, Poly Haven CC0) au lieu d'aplats ;
//    la roche jeune est sombre, la végétation ne gagne que les bas.
// 2. Les coulées suivent la pente (plus de serpentins réguliers), largeur qui varie, croûte noire qui se fend sur le rouge.
// 3. « Sous les coulées » : on voit les rivières descendre des cirques dans leurs vallées, puis une coulée les recouvrir,
//    puis une coupe du sol où l'eau continue de couler sous la lave, dans la vallée ensevelie et le tunnel.
// ----- 1. les sols -----
{let fait=0;const essai=()=>{try{if(fait||typeof terr==='undefined'||!terr||!terr.material||!terr.material.uniforms||typeof tx125!=='function')return;const m=terr.material,U=m.uniforms;
 const cible='C=mix(C,vec3(.52,.5,.48),smoothstep(.5,.85,h));C*=l;';if(m.fragmentShader.indexOf(cible)<0){fait=1;return}
 U.gR={value:tx125('rock_ground',1)};U.gB={value:tx125('burned_ground_01',1)};U.gF={value:tx125('leaves_forest_ground',1)};
 m.fragmentShader=m.fragmentShader.replace('uniform sampler2D st;','uniform sampler2D st;uniform sampler2D gR,gB,gF;').replace(cible,
  'C=mix(C,vec3(.52,.5,.48),smoothstep(.5,.85,h));'+
  'vec3 tR=texture2D(gR,vP.xz*.42).rgb,tB=texture2D(gB,vP.xz*.31).rgb,tF=texture2D(gF,vP.xz*.5).rgb,tM=texture2D(gR,vP.xz*.06).rgb;'+
  'float veg=1.-smoothstep(.12,.42,h+(tM.r-.5)*.25);'+
  'vec3 roc=mix(tB*.95,tR*.9,smoothstep(.35,.8,h))*mix(vec3(.62,.57,.53),vec3(.72,.7,.68),smoothstep(.55,.9,h));'+
  'vec3 ver=mix(vec3(.2,.36,.17),vec3(.3,.42,.2),tF.g)*(.55+.9*tF.g);'+
  'C=mix(roc,ver,veg*.85)*(.78+.44*tM.g);C*=l;');
 m.needsUpdate=true;fait=1}catch(e){fait=1}};const iv=setInterval(()=>{essai();if(fait)clearInterval(iv)},400)}
// ----- 2. des coulées qui suivent la pente -----
const BR304=(x,z)=>{const s=Math.sin(x*3.1+z*1.7)*.5+Math.sin(x*7.3-z*5.1)*.3+Math.sin(x*13.7+z*11.3)*.2;return s};
{const ch0=g168Chemin;g168Chemin=function(x0,z0,radial,cx,cz){if(!radial)return ch0.apply(this,arguments);
 const P=[[x0,z0]];let x=x0,z=z0;
 for(let i=0;i<240;i++){const d=Math.hypot(x-cx,z-cz)||1,rx=(x-cx)/d,rz=(z-cz)/d;
  // la pente du terrain, puis un peu de vent du large et du hasard du sol : jamais une sinusoïde
  const e=.12,gx=(alt(x+e,z)-alt(x-e,z)),gz=(alt(x,z+e)-alt(x,z-e)),gl=Math.hypot(gx,gz)||1;
  let ax=rx-gx/gl*.35,az=rz-gz/gl*.35;const n=BR304((x+x0*9)*.5,(z+z0*7)*.5)*.45;const c=Math.cos(n),s=Math.sin(n);[ax,az]=[ax*c-az*s,ax*s+az*c];const l=Math.hypot(ax,az)||1;
  x+=ax/l*.08;z+=az/l*.08;P.push([x,z]);if(alt(x,z)<=0)break}return P}}
{const c0=g168Coulee;g168Coulee=function(P,larg){const me=c0.apply(this,arguments);try{
 // largeur qui respire : plus large sur le replat, plus étroite dans la pente
 const pos=me.geometry.attributes.position;for(let i=0;i<P.length;i++){const k=.65+.7*(.5+.5*BR304(P[i][0]*2.3,P[i][1]*2.3));const ax=pos.getX(i*2),az=pos.getZ(i*2),bx=pos.getX(i*2+1),bz=pos.getZ(i*2+1),mx=(ax+bx)/2,mz=(az+bz)/2;
  pos.setX(i*2,mx+(ax-mx)*k);pos.setZ(i*2,mz+(az-mz)*k);pos.setX(i*2+1,mx+(bx-mx)*k);pos.setZ(i*2+1,mz+(bz-mz)*k)}pos.needsUpdate=true;
 me.material.fragmentShader='uniform float fr,t;varying vec2 vU;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}'+
  'void main(){if(vU.y>fr)discard;float age=fr-vU.y;float b=1.-abs(vU.x-.5)*2.;float bn=b-.25*n(vec2(vU.y*60.,vU.x*3.));if(bn<0.)discard;'+
  'float tete=smoothstep(.05,0.,age);float cr=smoothstep(.03,.35,age);'+
  'float f1=n(vec2(vU.x*9.,vU.y*140.-t*.5)),f2=n(vec2(vU.x*22.,vU.y*320.));float fente=smoothstep(.06,0.,abs(f1-.5))*(1.-cr*.85);'+
  'vec3 chaud=vec3(1.,.5,.1),croute=mix(vec3(.09,.07,.06),vec3(.2,.17,.15),f2);'+
  'vec3 c=mix(chaud,croute,clamp(cr*1.2-.1+.35*(1.-b),0.,1.));c+=vec3(1.,.42,.08)*fente*(1.-cr*.6);c=mix(c,vec3(1.,.85,.45),tete*.85);'+
  'gl_FragColor=vec4(c,smoothstep(0.,.18,bn));}';me.material.needsUpdate=true}catch(e){}return me}}
// ----- 3. sous les coulées : rivières, coulée par-dessus, coupe du sol -----
const SC304={obj:[]};
function sc304Net(){SC304.obj.forEach(o=>{scene.remove(o);if(o.geometry)o.geometry.dispose()});SC304.obj=[]}
function sc304Ruban(P,larg,coul){const V=[],UV=[],I=[];let L=0;const D=[0];for(let i=1;i<P.length;i++){L+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);D.push(L)}
 P.forEach((q,i)=>{const a=P[Math.max(0,i-1)],b=P[Math.min(P.length-1,i+1)];let dx=b[0]-a[0],dz=b[1]-a[1];const l=Math.hypot(dx,dz)||1;dx/=l;dz/=l;const w=larg*(.6+.8*D[i]/(L||1));
  [-1,1].forEach(s=>{V.push(q[0]-dz*w*s,0,q[1]+dx*w*s);UV.push(s<0?0:1,D[i]/(L||1))});if(i){const o=(i-1)*2;I.push(o,o+1,o+2,o+1,o+3,o+2)}});
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(V,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(UV,2));g.setIndex(I);
 const m=new THREE.ShaderMaterial({uniforms:{fr:{value:0},t:{value:0},op:{value:1}},transparent:true,depthWrite:false,depthTest:false,side:THREE.DoubleSide,
  vertexShader:'varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:'uniform float fr,t,op;varying vec2 vU;void main(){if(vU.y>fr)discard;float b=1.-abs(vU.x-.5)*2.;float r=.5+.5*sin(vU.y*260.-t*5.+vU.x*3.);vec3 c=mix(vec3(.2,.55,.72),vec3(.7,.9,1.),r*.45*b);gl_FragColor=vec4(c,smoothstep(0.,.25,b)*op);}'});
 const me=new THREE.Mesh(g,m);me.renderOrder=5;me.frustumCulled=false;me.userData.P=P;scene.add(me);SC304.obj.push(me);return me}
// la hauteur vraie du relief affiché, prise une fois au rayon (le relief maillé passe au-dessus du fond exact des vallées)
function sol304(x,z){// le maillage du relief passe au-dessus du fond exact des vallées : on prend le plus haut des points voisins
 const H=(X,Z)=>typeof g168Haut==='function'?g168Haut(X,Z):Math.max(0,alt(X,Z))*VX;let m=H(x,z);const r=.18;for(let a=0;a<6;a++){const an=a/6*6.283;m=Math.max(m,H(x+Math.cos(an)*r,z+Math.sin(an)*r)*.6+H(x,z)*.4)}return m}
function sc304Haut(me,dy){dy=(dy||.06)+.3;const pos=me.geometry.attributes.position,P=me.userData.P;if(!me.userData.Y){me.userData.Y=[];for(let i=0;i<P.length;i++){const a=sol304(pos.getX(i*2),pos.getZ(i*2)),b=sol304(pos.getX(i*2+1),pos.getZ(i*2+1)),c=sol304(P[i][0],P[i][1]);me.userData.Y.push(Math.max(a,b,c))}}
 for(let i=0;i<P.length;i++){const y=me.userData.Y[i]+(dy||.06);pos.setY(i*2,y);pos.setY(i*2+1,y)}pos.needsUpdate=true}
// les sources : le fond des trois cirques ; les rivières descendent par la plus grande pente
const SRC304=[[55.43,-21.05],[55.515,-21.07],[55.47,-21.13],[55.6,-21.0],[55.38,-21.17]];
function sc304Init(){sc304Net();SC304.riv=[];SC304.lav=[];
 // les vraies rivières du jeu (tracées sur le relief, de la source à la mer) : Galets, Mât, Saint-Étienne, Marsouins, Remparts…
 let R=[];try{if(!window.RIV126||!RIV126.length)window.RIV126=riv126Calc();R=(window.RIV126||[]).filter(r=>!r.br&&r.P&&r.P.length>20)}catch(e){}
 R.slice(0,9).forEach(r=>{const P=r.P;SC304.riv.push(sc304Ruban(P,.16,0));
  // la coulée nouvelle prend la même vallée par le haut et s'arrête avant la mer : la rivière ressort en bas
  const n=Math.floor(P.length*.6),Q=P.slice(0,n);if(Q.length>4&&typeof g168Coulee==='function'){const c=g168Coulee(Q,.3,0,1);scene.remove(c);GEN168.obj.splice(GEN168.obj.indexOf(c),1);c.material.depthTest=false;c.renderOrder=7;scene.add(c);SC304.obj.push(c);SC304.lav.push(c)}})}
function sc304Coupe(k){if(typeof g168Toile!=='function')return;const c=g168Toile();if(!c)return;const W=c.width=c.clientWidth,H=c.height=c.clientHeight,x=c.getContext('2d');x.clearRect(0,0,W,H);
 const a=Math.max(0,Math.min(1,(k-.5)/.08))*(k>.97?(1-k)/.03:1);if(a<=0)return;x.globalAlpha=a;const w=Math.min(380,W*.4),h=w*.56,X0=W-w-22,Y0=Math.max(22,H*.12),t=performance.now()/1000;
 x.fillStyle='rgba(16,12,10,.88)';x.fillRect(X0,Y0,w,h);x.strokeStyle='rgba(232,214,170,.7)';x.lineWidth=1;x.strokeRect(X0+.5,Y0+.5,w-1,h-1);
 const sx=u=>X0+u*w,sy=v=>Y0+v*h,band=(f,col)=>{x.beginPath();x.moveTo(sx(0),sy(1));for(let u=0;u<=1.001;u+=.02)x.lineTo(sx(u),sy(f(u)));x.lineTo(sx(1),sy(1));x.closePath();x.fillStyle=col;x.fill()};
 // vieilles coulées, avec leur vallée en V ; la nouvelle coulée remplit la vallée ; le tunnel, dans la nouvelle
 const vallee=u=>.42+.3*Math.max(0,1-Math.abs(u-.5)/.22);band(u=>.34+.04*Math.sin(u*9),'#4a3f38');band(u=>vallee(u)+.02*Math.sin(u*23),'#5e524a');
 for(let i=0;i<5;i++){x.strokeStyle='rgba(30,24,20,.6)';x.beginPath();for(let u=0;u<=1;u+=.02){const v=vallee(u)+.06+i*.06;u?x.lineTo(sx(u),sy(v)):x.moveTo(sx(u),sy(v))}x.stroke()}
 band(u=>.28+.03*Math.sin(u*7+1),'rgba(0,0,0,0)');x.beginPath();x.moveTo(sx(0),sy(.3));for(let u=0;u<=1.001;u+=.02)x.lineTo(sx(u),sy(.29+.02*Math.sin(u*11)));for(let u=1;u>=-.001;u-=.02)x.lineTo(sx(u),sy(vallee(u)+.02*Math.sin(u*23)));x.closePath();x.fillStyle='#22201e';x.fill();
 // l'eau au fond de la vallée ensevelie, et dans le tunnel
 const fond=sy(.71),tx=sx(.62),ty=sy(.36);x.fillStyle='#2f6f8a';x.beginPath();x.ellipse(sx(.5),fond-3,w*.05,5,0,0,7);x.fill();x.fillStyle='#0d0b0a';x.beginPath();x.ellipse(tx,ty,w*.06,h*.05,0,0,7);x.fill();x.fillStyle='#2f6f8a';x.fillRect(tx-w*.05,ty+h*.015,w*.1,h*.03);
 x.fillStyle='rgba(180,225,240,.95)';for(let i=0;i<5;i++){const p=((t*.35+i/5)%1);x.beginPath();x.arc(sx(.5)+(p-.5)*w*.08,fond-3,1.8,0,7);x.fill();x.beginPath();x.arc(tx+(p-.5)*w*.1,ty+h*.03,1.6,0,7);x.fill()}
 // la pluie qui s'infiltre
 x.strokeStyle='rgba(160,210,230,.55)';for(let i=0;i<14;i++){const u=(i*.073+.03)%1,p=((t*.5+i*.13)%1);x.beginPath();x.moveTo(sx(u),sy(.29+p*.3));x.lineTo(sx(u),sy(.31+p*.3));x.stroke()}
 x.font='600 '+Math.max(11,w*.034|0)+'px system-ui';x.fillStyle='#f4ead0';x.textAlign='left';x.textBaseline='middle';
 x.fillText('coupe du sol',X0+10,Y0+14);x.fillStyle='#ffc890';x.fillText('nouvelle coulée',sx(.04),sy(.36));x.fillStyle='#bfe4f2';x.fillText('tunnel de lave',tx+w*.075,ty);x.fillText('vallée ensevelie',sx(.56),fond-2);x.fillStyle='#d8c8b0';x.fillText('anciennes coulées',sx(.04),sy(.9));x.globalAlpha=1}
{const cj=cineJouer;cineJouer=function(L,done){const r=cj.apply(this,arguments);try{const s=(L||[]).find(s=>s.lac120===2&&!s.sc304);if(s){s.sc304=1;s.d=Math.max(s.d||0,11000);const i0=s.init,f0=s.f;
 s.init=U=>{if(i0)i0(U);try{sc304Init()}catch(e){}};
 s.f=(U,k)=>{if(f0)f0(U,k);try{const t=performance.now()/1000;
  // 0 → .3 : les rivières descendent ; .3 → .62 : la coulée les recouvre ; puis la coupe
  SC304.riv.forEach(m=>{m.material.uniforms.fr.value=Math.min(1,k/.22);m.material.uniforms.t.value=t;sc304Haut(m)});
  SC304.lav.forEach(m=>{const u=m.material.uniforms;u.fr.value=Math.max(0,Math.min(1,(k-.24)/.26));u.t.value=t;sc304Haut(m,.1)});
  sc304Coupe(k);if(k>=.995)sc304Net()}catch(e){}}}}catch(e){}return r}}
{const cf=cineFin;cineFin=function(){sc304Net();return cf.apply(this,arguments)}}
