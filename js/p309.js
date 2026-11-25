// ===== p309 : la vue du camp (Vie) au niveau de la carte — paille, bois, écorce, feuillage et roche sur ce qui était uni ;
// le sol des incarnations prend les vrais sols de la carte ; la bulle du guide se range à gauche pendant la vue du camp. =====
const TX309={};
function tex309(k){if(TX309[k])return TX309[k];const c=document.createElement('canvas'),n=128;c.width=c.height=n;const x=c.getContext('2d');let s=k.length*7919;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};
 const v=(a,b)=>{const q=a+Math.floor(r()*(b-a));return 'rgb('+q+','+q+','+q+')'};
 if(k==='paille'){x.fillStyle='rgb(205,205,205)';x.fillRect(0,0,n,n);for(let i=0;i<900;i++){const X=r()*n,Y=r()*n,l=8+r()*22;x.strokeStyle=v(140,255);x.lineWidth=.6+r()*1.1;x.beginPath();x.moveTo(X,Y);x.lineTo(X+(r()-.5)*3,Y+l);x.stroke()}
  for(let j=0;j<5;j++){x.fillStyle='rgba(60,60,60,.35)';x.fillRect(0,j*26+20,n,2)}}
 else if(k==='planche'){for(let i=0;i<8;i++){x.fillStyle=v(160,225);x.fillRect(i*16,0,16,n);x.fillStyle='rgba(40,40,40,.6)';x.fillRect(i*16+15,0,1,n)}for(let i=0;i<300;i++){x.fillStyle='rgba(70,70,70,'+(.08+r()*.15)+')';x.fillRect(r()*n,r()*n,1,6+r()*20)}for(let i=0;i<6;i++){x.fillStyle='rgba(50,50,50,.5)';x.beginPath();x.ellipse(r()*n,r()*n,2,3.5,0,0,7);x.fill()}}
 else if(k==='torchis'){x.fillStyle='rgb(200,200,200)';x.fillRect(0,0,n,n);for(let i=0;i<700;i++){x.fillStyle='rgba('+[0,0,0].map(()=>130+r()*110|0)+',.5)';x.beginPath();x.ellipse(r()*n,r()*n,1+r()*4,1+r()*2,r()*3,0,7);x.fill()}for(let i=0;i<40;i++){x.strokeStyle='rgba(90,90,90,.5)';x.beginPath();x.moveTo(r()*n,r()*n);x.lineTo(r()*n,r()*n);x.stroke()}}
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;if(THREE.sRGBEncoding)t.encoding=THREE.sRGBEncoding;return TX309[k]=t}
// d'après la forme et la couleur, on devine la matière
function matiere309(m){const g=m.geometry,t=g&&g.type,mat=m.material;if(!mat||Array.isArray(mat)||mat.map||mat.isShaderMaterial||mat.isMeshBasicMaterial||mat.transparent&&mat.opacity<.95)return null;if(!g.attributes||!g.attributes.uv)return null;
 const c=mat.color;if(!c)return null;const R=c.r,G=c.g,B=c.b,L=(R+G+B)/3,vert=G>R*1.1&&G>B,gris=Math.abs(R-G)<.06&&Math.abs(G-B)<.08,brun=R>G&&G>B&&R-B>.08,clair=L>.42;
 if(vert)return ['feuilles',1];
 if(t==='ConeGeometry')return [brun||clair?'paille':'feuilles',2];
 if(t==='CylinderGeometry'){const p=g.parameters||{};const gros=(p.radiusBottom||p.radiusTop||0)>.6;return [gros?(clair?'torchis':'planche'):(brun&&!clair?'ecorce':clair?'planche':'ecorce'),gros?2:1]}
 if(t==='BoxGeometry')return [gris?'roche':brun&&L<.35?'planche':clair?'torchis':'planche',1];
 if(t==='DodecahedronGeometry'||t==='IcosahedronGeometry'||t==='SphereGeometry'||t==='OctahedronGeometry')return [gris||L<.3?'roche':brun?'roche':null,1];
 return null}
function habille309(G){let n=0;G.traverse(m=>{if(!m.isMesh||m.userData.tx309)return;const q=matiere309(m);if(!q||!q[0])return;m.userData.tx309=1;
  let t=q[0]==='roche'&&typeof tx125==='function'?tx125('rock_ground',1):(TX309[q[0]]||['paille','planche','torchis'].includes(q[0]))?tex309(q[0]):tex302(q[0]);
  // la matière module la couleur : on éclaircit d'autant la teinte pour garder la même valeur
  const mat=m.material.clone();mat.map=t;if(q[0]==='roche')mat.color.multiplyScalar(1.5);else mat.color.multiplyScalar(1.22);mat.needsUpdate=true;m.material=mat;n++});return n}
{const pd=p3Deco;p3Deco=function(L,C){const r=pd.apply(this,arguments);try{habille309(P3.deco)}catch(e){}return r}}
// les gens du camp gardent leurs couleurs (P3.gens n'est pas touché)
// ----- le sol des incarnations : la vraie texture de la carte, selon le lieu -----
{const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);try{const I=INC;if(!I||typeof tx125!=='function')return r;
 I.S3.traverse(m=>{if(!m.isMesh||!m.material||!m.geometry||m.geometry.type!=='PlaneGeometry'||!m.material.vertexColors)return;
  const p=m.geometry.parameters||{};if((p.width||0)<20)return;const tex=tx125('leaves_forest_ground',1).clone();tex.needsUpdate=true;tex.repeat.set((p.width||100)/3.2,(p.height||100)/3.2);
  m.material.map=tex;m.material.color.setRGB(1.02,1.02,.98);m.material.needsUpdate=true});
 // les cannes, la case de l'habitation, les toits : la même matière que dans la vue du camp
 habille309(I.S3)}catch(e){}return r}}
// ----- la bulle du guide ne cache plus la liste des gens du camp -----
{const gt=guideTick;guideTick=function(){const r=gt.apply(this,arguments);try{const b=$('guideJ');if(b){const cv=typeof CV!=='undefined'&&CV&&CV.on;
 if(cv){b.style.left='16px';b.style.transform='none';b.style.bottom='16px';b.style.maxWidth='min(380px,60vw)'}else{b.style.left='50%';b.style.transform='translateX(-50%)';b.style.bottom='110px';b.style.maxWidth='min(560px,92vw)'}}}catch(e){}return r}}
// ----- la carte et la vue du camp (qui est la carte, de tout près) : les objets en couleurs unies prennent une matière -----
// Les cases, arbres, fanjans, rochers, palissades sont des formes fusionnées sans coordonnées de texture : la matière est donc
// projetée depuis les trois axes (« triplanaire »), choisie d'après la couleur du sommet : vert → feuillage, gris → roche,
// brun clair → paille, brun sombre → bois et écorce. La couleur d'origine reste ; la matière n'en module que la valeur.
function mat309(mt){if(!mt||mt.userData.m309||mt.map||!mt.isMeshLambertMaterial)return;mt.userData.m309=1;const prev=mt.onBeforeCompile;
 const U={tF:{value:tex302('feuilles')},tE:{value:tex302('ecorce')},tR:{value:typeof tx125==='function'?tx125('rock_ground',1):tex302('roche')},tP:{value:tex309('paille')},kS:{value:22}};
 mt.onBeforeCompile=(sh,r)=>{if(prev)prev(sh,r);Object.assign(sh.uniforms,U);
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vW309;varying vec3 vN309;').replace('#include <project_vertex>','#include <project_vertex>\n{vec4 w=vec4(transformed,1.);vec3 n=objectNormal;\n#ifdef USE_INSTANCING\nw=instanceMatrix*w;n=mat3(instanceMatrix)*n;\n#endif\nw=modelMatrix*w;vW309=w.xyz;vN309=normalize(mat3(modelMatrix)*n);}');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform sampler2D tF,tE,tR,tP;uniform float kS;varying vec3 vW309;varying vec3 vN309;\nfloat tri309(sampler2D t,vec3 p,vec3 n){vec3 b=pow(abs(n),vec3(4.));b/=(b.x+b.y+b.z+1e-4);float x=dot(texture2D(t,p.zy).rgb,vec3(.333)),y=dot(texture2D(t,p.xz).rgb,vec3(.333)),z=dot(texture2D(t,p.xy).rgb,vec3(.333));return x*b.x+y*b.y+z*b.z;}')
   .replace('#include <color_fragment>','#include <color_fragment>\n#ifdef USE_COLOR\n{vec3 c=vColor.rgb;float L=dot(c,vec3(.333)),sat=max(c.r,max(c.g,c.b))-min(c.r,min(c.g,c.b));vec3 p=vW309*kS;vec3 n=normalize(vN309);\nfloat d;if(c.g>c.r*1.08&&c.g>=c.b)d=tri309(tF,p*.8,n);else if(sat<.07)d=tri309(tR,p*.35,n);else if(L>.42)d=tri309(tP,p*.6,n);else d=tri309(tE,p*.7,n);\ndiffuseColor.rgb*=mix(1.,d*1.32,.8);}\n#endif');};
 const ck=mt.customProgramCacheKey?mt.customProgramCacheKey.bind(mt):null;mt.customProgramCacheKey=()=>(ck?ck():'')+'|m309';mt.needsUpdate=true}
function passe309(){try{if(typeof MOD==='undefined')return;Object.keys(MOD).forEach(k=>{const m=MOD[k];if(!m)return;[m].concat(m.children||[]).forEach(o=>{const mt=o.material;if(!mt||Array.isArray(mt))return;if(mt.vertexColors&&!mt.map&&k!=='herbe'&&k!=='route'&&k!=='rail')mat309(mt)})})}catch(e){}}
setInterval(passe309,3000);
