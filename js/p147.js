
// ===== p147 : les cascades =====
// Les grandes chutes de l'île, posées à leur place (coordonnées approchées) puis calées sur la plus forte pente du relief tout près :
// un rideau d'eau qui coule (shader), de la brume en bas, un petit bassin. On les voit dès qu'on a découvert l'endroit et qu'on s'approche.
const CASC147=[['Le Voile de la Mariée',55.535,-21.025,'Salazie'],['Le Trou de Fer',55.565,-21.080,'Bras de Caverne'],['La cascade Niagara',55.607,-20.918,'Sainte-Suzanne'],
 ['La cascade du Biberon',55.630,-21.115,'Plaine des Palmistes'],['La cascade de Grand Galet',55.660,-21.330,'Langevin'],['Le bassin La Paix',55.650,-20.985,'Bras-Panon'],['La cascade Blanche',55.505,-21.060,'Salazie']];
function eauMat147(){if(eauMat147.m)return eauMat147.m;eauMat147.m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,uniforms:{t:{value:0}},
 vertexShader:'varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:'varying vec2 vU;uniform float t;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}'+
 'void main(){float s=n(vec2(vU.x*18.,vU.y*3.+t*2.4))*.6+n(vec2(vU.x*40.,vU.y*7.+t*4.))*.4;float bord=smoothstep(0.,.18,vU.x)*smoothstep(1.,.82,vU.x);float a=bord*(.45+.5*s)*smoothstep(0.,.06,vU.y);vec3 c=mix(vec3(.62,.78,.86),vec3(.97,.99,1.),s);gl_FragColor=vec4(c*1.08,min(1.,a*1.15));}'});return eauMat147.m}
function brumeTex147(){if(brumeTex147.t)return brumeTex147.t;const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return brumeTex147.t=new THREE.CanvasTexture(c)}
const C147={L:null,t0:performance.now()};
function cascBatir147(){const L=[];CASC147.forEach(([n,lo,la,lieuN])=>{try{const [x0,z0]=xz(lo,la);let best=null,bs=-1;
  // la plus forte pente dans un rayon court
  for(let a=0;a<24;a++)for(let r=0;r<=.6;r+=.1){const x=x0+Math.cos(a/24*6.283)*r,z=z0+Math.sin(a/24*6.283)*r,e=.06,gx=alt(x+e,z)-alt(x-e,z),gz=alt(x,z+e)-alt(x,z-e),s=Math.hypot(gx,gz);if(alt(x,z)>20&&s>bs){bs=s;best={x,z,gx,gz}}}
  if(!best)return;const g=Math.hypot(best.gx,best.gz)||1,dx=-best.gx/g,dz=-best.gz/g;// vers le bas de la pente
  const hTop=alt(best.x-dx*.12,best.z-dz*.12),hBas=alt(best.x+dx*.2,best.z+dz*.2),H=Math.max(.15,(hTop-hBas)*VX);
  const G=new THREE.Group();G.position.set(best.x,Math.max(0,hBas)*VX,best.z);G.rotation.y=Math.atan2(dx,dz);
  const pl=new THREE.PlaneGeometry(.1,H,1,8);pl.translate(0,H/2,0);const eau=new THREE.Mesh(pl,eauMat147());eau.position.z=-.02;G.add(eau);
  const br=new THREE.Sprite(new THREE.SpriteMaterial({map:brumeTex147(),transparent:true,opacity:.55,depthWrite:false}));br.scale.set(.32,.18,1);br.position.set(0,.05,.04);G.add(br);G.userData.br=br;
  const bas=new THREE.Mesh(new THREE.CircleGeometry(.09,16).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0x6aa8bc,transparent:true,opacity:.8,depthWrite:false}));bas.position.set(0,.006,.06);G.add(bas);
  G.userData={...G.userData,n,lieuN,t:tileAt({x:best.x,z:best.z})};G.visible=false;scene.add(G);L.push(G)}catch(e){}});return L}
(function boucle147(){requestAnimationFrame(boucle147);try{if(typeof scene==='undefined'||!scene||!S||typeof alt!=='function')return;if(!C147.L){if(!T||!T.length)return;C147.L=cascBatir147()}
  const t=(performance.now()-C147.t0)/1000;eauMat147().uniforms.t.value=t;const vu=!(typeof VP!=='undefined'&&VP)&&!(typeof K!=='undefined'&&K);
  C147.L.forEach((G,i)=>{const tt=G.userData.t,ok=vu&&dist<(G.userData.petite?9:26)&&tt&&S.t[tt.i]&&S.t[tt.i].s&&Math.hypot(G.position.x-camT.x,G.position.z-camT.z)<dist*1.4+3;G.visible=!!ok;if(ok){const b=G.userData.br;b.material.opacity=.4+.15*Math.sin(t*1.3+i);b.scale.set(.3+.04*Math.sin(t+i),.17,1);const k=G.userData.petite?1:Math.max(1,Math.min(3,dist/8));G.scale.set(k,1,k)}})}catch(e){}})();
// au survol proche, le nom de la cascade s'affiche comme les plantes (fiche courte)
setInterval(()=>{try{if(!C147.L||!S)return;let n=null;C147.L.forEach(G=>{if(G.visible&&Math.hypot(G.position.x-camT.x,G.position.z-camT.z)<Math.max(1.2,dist*.2))n=G.userData});
  let el=document.getElementById('casc147');if(!n){if(el)el.remove();return}if(!el){el=document.createElement('div');el.id='casc147';el.style.cssText='position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:9;background:#fbf7ec;color:#14110c;border-left:5px solid #2f6b8a;padding:6px 12px;border-radius:4px;font:14px system-ui;box-shadow:0 3px 12px rgba(0,0,0,.4);pointer-events:none';document.body.appendChild(el)}
  el.innerHTML='💧 <b>'+n.n+'</b> · '+n.lieuN}catch(e){}},500);
// Sur presque toutes les rivières, des cascades et leurs trous d'eau (bassins) — plus on monte, plus il y en a.
// On suit le tracé de chaque rivière (p126) de la source vers la mer : là où le lit plonge fort sur une courte distance, une cascade ; au pied, un bassin.
function cascRiv147(){const L=[];if(!window.RIV126||!RIV126.length)return null;
 RIV126.forEach(r=>{const P=r.P||[];let der=-1e9,dist0=0;for(let i=2;i<P.length-2;i++){const a=P[i-2],b=P[i+2];const d=Math.hypot(b[0]-a[0],b[1]-a[1])||1e-3;dist0+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);
   const ha=alt(a[0],a[1]),hb=alt(b[0],b[1]),chute=ha-hb;if(hb<60||chute<=0)continue;const pente=chute/d;// mètres par unité de carte
   const seuil=hb>1200?650:hb>500?950:1400;if(pente<seuil||dist0-der<(hb>800?1.1:1.8))continue;der=dist0;
   const dx=(b[0]-a[0])/d,dz=(b[1]-a[1])/d,H=Math.max(.1,Math.min(1,chute*VX*1.1));
   const G=new THREE.Group();G.position.set(P[i][0]+dx*.04,Math.max(0,hb)*VX,P[i][1]+dz*.04);G.rotation.y=Math.atan2(dx,dz);const w=hb<500?.14:hb<1200?.11:.08;
   const pl=new THREE.PlaneGeometry(w,H,1,6);pl.translate(0,H/2,0);const eau=new THREE.Mesh(pl,eauMat147());eau.position.z=-.03;G.add(eau);
   const br=new THREE.Sprite(new THREE.SpriteMaterial({map:brumeTex147(),transparent:true,opacity:.45,depthWrite:false}));br.scale.set(w*2.6,w*1.4,1);br.position.set(0,.03,.02);G.add(br);G.userData.br=br;
   // le trou d'eau : bassin sombre et clair sur les bords
   const bas=new THREE.Mesh(new THREE.CircleGeometry(w*1.6,20).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0x2f7f8f,transparent:true,opacity:.85,depthWrite:false}));bas.position.set(0,.008,w*1.3);G.add(bas);
   const rive=new THREE.Mesh(new THREE.RingGeometry(w*1.6,w*1.95,20).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0xbfe0e6,transparent:true,opacity:.5,depthWrite:false}));rive.position.copy(bas.position);G.add(rive);
   G.userData.n=r.n?'Cascade · '+r.n:'Cascade';G.userData.lieuN=hb>1200?'dans les hauts':hb>500?'à mi-pente':'près du bas';G.userData.t=tileAt({x:G.position.x,z:G.position.z});G.userData.petite=1;G.visible=false;scene.add(G);L.push(G)}});return L}
(function att147(){try{if(C147.L&&window.RIV126&&RIV126.length&&!C147.riv){const R=cascRiv147();if(R){C147.riv=1;C147.L.push(...R);console.log('cascades',R.length)}}}catch(e){}setTimeout(att147,1500)})();
// Les rivières coulent : un shader suit le lit (de la source vers la mer) — courant qui file, reflets, eau plus sombre au milieu, écume claire sur les bords ; boueuse pendant un cyclone.
const RIVM147={};
function eauRiv147(boue){const k=boue?'b':'c';if(RIVM147[k])return RIVM147[k];RIVM147[k]=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,uniforms:{t:{value:0},boue:{value:boue?1:0}},
 vertexShader:'varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:'varying vec2 vU;uniform float t;uniform float boue;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}'+
 'void main(){float x=vU.x;float bord=1.-abs(x-.5)*2.;float c1=n(vec2(x*6.,vU.y*.9-t*1.6)),c2=n(vec2(x*14.+3.,vU.y*2.2-t*2.7));float r=c1*.6+c2*.4;'+
 'vec3 fond=mix(vec3(.16,.42,.52),vec3(.08,.27,.36),smoothstep(.2,.9,bord));vec3 col=mix(fond,vec3(.55,.8,.86),smoothstep(.62,.92,r)*.55);'+
 'float ecume=smoothstep(.25,0.,bord)*(.5+.5*c2);col=mix(col,vec3(.92,.96,.97),ecume*.7);col=mix(col,vec3(.42,.33,.2)+.08*r,boue);'+
 'float a=smoothstep(0.,.12,bord)*.88+ecume*.1;gl_FragColor=vec4(col,a);}'});return RIVM147[k]}
(function tick147(){requestAnimationFrame(tick147);const t=performance.now()/1000;for(const k in RIVM147)RIVM147[k].uniforms.t.value=t})();
