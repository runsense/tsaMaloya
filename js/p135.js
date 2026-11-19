
// ===== p135 : les envoyés partent tout de suite et marchent sans glisser ; un vrai feu ; des oiseaux qui volent =====
// 1) Les modèles des envoyés sont chargés d'avance : ils apparaissent dès qu'on les envoie (avant, ils n'apparaissaient qu'au milieu du trajet).
// 2) La marche suit la distance réelle et l'animation des jambes suit la vitesse : plus de glissade.
{const pre=()=>{try{if(typeof p3Charge!=='function'||!window.S&&typeof S==='undefined')return;['p1a_chasseur','femme_sagaie','jeune_pagne','homme_chemise','femme_travail'].forEach(n=>p3Charge(n))}catch(e){}};setTimeout(pre,4000);setInterval(pre,30000)}
{const VN=.5;// vitesse de marche naturelle, en unités de carte par seconde, pour un personnage à l'échelle 1
 const p0=MARCHE75.push.bind(MARCHE75);MARCHE75.push=function(w){try{let L=0;for(let i=1;i<w.P.length;i++){const a=T[w.P[i-1]],b=T[w.P[i]];L+=Math.hypot(b.x-a.x,b.z-a.z)}w.dur=Math.max(2500,Math.min(26000,L/(VN*1.15)*1000))}catch(e){}
  // les modèles sont prêts tout de suite : on les crée dès le départ, au camp
  try{const A=T[w.P[0]];for(let j=0;j<w.n;j++)mfObtenir(w.k+'_'+j,w.nm[j%w.nm.length])}catch(e){}return p0(w)};
 const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(typeof MF==='undefined')return r;const now=performance.now();
  for(const c in MF.L){const f=MF.L[c];if(!f||!f.o||!f.mx||!f.o.visible){if(f)f.p135=null;continue}const p=f.o.position;
   if(f.p135){const dt=(now-f.p135.t)/1000;if(dt>.02){const v=Math.hypot(p.x-f.p135.x,p.z-f.p135.z)/dt;f.v135=f.v135==null?v:f.v135*.8+v*.2;f.p135={x:p.x,z:p.z,t:now}}}else f.p135={x:p.x,z:p.z,t:now};
   if(f.v135==null)continue;const act=(f.mx._actions||[]).filter(a=>a.isRunning&&a.isRunning()),marche=act.some(a=>a.getClip&&a.getClip().name==='marche');
   if(!marche||f.v135<.04){if(f.ts135){act.forEach(a=>a.timeScale=1);f.ts135=0}continue}const s=Math.max(.3,f.o.scale.x||1),ts=Math.max(.5,Math.min(2.4,f.v135/(VN*s)));act.forEach(a=>a.timeScale=ts);f.ts135=1}}catch(e){}return r}}

// 3) Le feu : une flamme dessinée par un shader (bruit qui monte, cœur blanc-jaune, bords orange et rouges), des étincelles qui s'envolent, une lueur au sol.
const FEU135={L:[],t0:performance.now()};
function feuMat135(){if(feuMat135.m)return feuMat135.m;feuMat135.m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,uniforms:{t:{value:0},pl:{value:0}},
 vertexShader:'varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:`varying vec2 vU;uniform float t;uniform float pl;
 float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
 float fb(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
 void main(){vec2 u=vU;float y=u.y;
  float q=fb(vec2(u.x*2.5,y*1.8-t*2.2));float q2=fb(vec2(u.x*5.+7.,y*3.5-t*3.6));
  float x=(u.x-.5)*2.+(q-.5)*.55*y+(q2-.5)*.25;
  // trois langues de flamme qui ondulent
  float L1=(1.-y*1.05)-abs(x)*1.6, L2=(.78-y*1.3)-abs(x+.38+.1*sin(t*3.1))*2.2, L3=(.72-y*1.35)-abs(x-.36+.1*sin(t*2.7+1.))*2.3;
  float w=max(L1,max(L2,L3))+(q2-.5)*.25;w*=smoothstep(0.,.12,y)*smoothstep(1.,.75,y)+.0;
  float a=smoothstep(0.,.35,w);if(a<.01)discard;
  vec3 c=mix(vec3(.7,.1,.02),vec3(1.,.45,.06),smoothstep(.0,.3,w));c=mix(c,vec3(1.,.9,.55),smoothstep(.3,.65,w));
  gl_FragColor=vec4(c*(1.-pl*.5),a*(1.-pl*.6));}`});return feuMat135.m}
function lueurTex135(){if(lueurTex135.t)return lueurTex135.t;const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.35,'rgba(255,255,255,.45)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return lueurTex135.t=new THREE.CanvasTexture(c)}
function feuNouveau135(){const g=new THREE.Group();const geo=new THREE.PlaneGeometry(.3,.4);geo.translate(0,.19,0);
 const a=new THREE.Mesh(geo,feuMat135()),b=new THREE.Mesh(geo,feuMat135());b.visible=false;g.add(a,b);
 // des bûches sous la flamme, une braise rouge
 {const bm=new THREE.MeshLambertMaterial({color:0x3a2616});for(let k=0;k<3;k++){const l=new THREE.Mesh(new THREE.CylinderGeometry(.012,.014,.16,5),bm);l.rotation.z=Math.PI/2;l.rotation.y=k*2.1;l.position.y=.012;g.add(l)}
  const br=new THREE.Mesh(new THREE.SphereGeometry(.035,8,5),new THREE.MeshBasicMaterial({color:0xff5a10,transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false}));br.scale.y=.35;br.position.y=.01;g.add(br)}
 const lu=new THREE.Mesh(new THREE.PlaneGeometry(.6,.6).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({map:lueurTex135(),color:0xff8a30,transparent:true,opacity:.22,depthWrite:false,blending:THREE.AdditiveBlending}));lu.position.y=.012;g.add(lu);
 const n=14,ge=new THREE.BufferGeometry(),P=new Float32Array(n*3),V=[];for(let i=0;i<n;i++){P[i*3+1]=Math.random()*.6;V.push(Math.random())}ge.setAttribute('position',new THREE.BufferAttribute(P,3));
 const E=new THREE.Points(ge,new THREE.PointsMaterial({color:0xffc060,size:.025,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));g.add(E);g.userData={a,b,lu,E,V};g.frustumCulled=false;scene.add(g);return g}
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(typeof flam==='undefined'||!flam||typeof scene==='undefined')return r;const n=flam.count||0,M=new THREE.Matrix4(),p=new THREE.Vector3(),q=new THREE.Quaternion(),s=new THREE.Vector3();
  flam.visible=false;const now=performance.now(),t=(now-FEU135.t0)/1000,pl=typeof pluieF106==='function'?pluieF106():0;feuMat135().uniforms.t.value=t;feuMat135().uniforms.pl.value=pl;
  while(FEU135.L.length<n)FEU135.L.push(feuNouveau135());
  FEU135.L.forEach((g,i)=>{if(i>=n||dist>26){g.visible=false;return}flam.getMatrixAt(i,M);M.decompose(p,q,s);g.visible=true;g.position.set(p.x,p.y-.06,p.z);
   const k=Math.max(.7,Math.min(1.8,dist*.06+.6));g.scale.setScalar(k);g.userData.a.quaternion.copy(cam.quaternion);g.userData.a.rotation.z=0;
   const tt=tileAt?tileAt(p):null,hum=tt&&(tt.forest||(typeof wet==='function'&&wet(tt)))?.55:1;g.userData.lu.material.opacity=(.14+.06*Math.sin(t*11+i)+.04*Math.sin(t*23))*(1-pl*.6)*hum;
   const E=g.userData.E,A=E.geometry.attributes.position,V=g.userData.V;for(let j=0;j<A.count;j++){let y=A.getY(j)+.006+V[j]*.006;if(y>.75){y=.05;A.setX(j,(Math.random()-.5)*.08);A.setZ(j,(Math.random()-.5)*.08)}A.setY(j,y);A.setX(j,A.getX(j)+Math.sin(t*3+j)*.0015-.0006)}A.needsUpdate=true;E.material.opacity=.9-pl*.7})}catch(e){}return r}}

// 4) Des oiseaux qui volent : une petite nuée près de la vue (règles de nuée : cohésion, alignement, écart), ailes qui battent vite vers le bas et remontent lentement, puis planent.
//    Ils s'écartent des personnages qui passent dessous et se posent un moment dans les arbres.
const OIS135={F:[],t:performance.now()};
function oiseau135(){const g=new THREE.Group(),m=new THREE.MeshBasicMaterial({color:0x2a2622,side:THREE.DoubleSide});
 const corps=new THREE.Mesh(new THREE.ConeGeometry(.012,.07,5).rotateX(Math.PI/2),m);g.add(corps);
 const aile=()=>{const s=new THREE.Shape();s.moveTo(0,-.012);s.lineTo(.07,-.004);s.lineTo(.05,.014);s.lineTo(0,.016);const ge=new THREE.ShapeGeometry(s).rotateX(-Math.PI/2);return new THREE.Mesh(ge,m)};
 const ad=aile(),ag=aile();ag.scale.x=-1;g.add(ad,ag);g.userData={ad,ag,ph:Math.random()*6,pl:0};return g}
function nuee135(cx,cz){const L=[];const n=9+Math.floor(Math.random()*6);for(let i=0;i<n;i++){const o=oiseau135();o.position.set(cx+(Math.random()-.5)*2,0,cz+(Math.random()-.5)*2);o.userData.v=new THREE.Vector3((Math.random()-.5)*.6,0,(Math.random()-.5)*.6);o.userData.h=1.2+Math.random()*.8;scene.add(o);L.push(o)}return {L,cx,cz,pose:0,arbre:null}}
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(!S||typeof scene==='undefined'||!camT)return r;const now=performance.now(),dt=Math.min(.05,(now-OIS135.t)/1000);OIS135.t=now;
  const on=dist<18&&!S.fin,nuit=typeof jourPh==='function'&&(jourPh()>.74||jourPh()<.03),pl=typeof pluieF106==='function'?pluieF106():0;
  if(on&&!nuit&&OIS135.F.length<2&&Math.random()<.01)OIS135.F.push(nuee135(camT.x+(Math.random()-.5)*dist*.6,camT.z+(Math.random()-.5)*dist*.6));
  for(let fi=OIS135.F.length-1;fi>=0;fi--){const F=OIS135.F[fi],L=F.L;
   if(!on||nuit||pl>.6||Math.hypot(F.cx-camT.x,F.cz-camT.z)>dist*1.4+6){L.forEach(o=>scene.remove(o));OIS135.F.splice(fi,1);continue}
   // le centre de la nuée dérive ; de temps en temps elle se pose sur un arbre de forêt proche
   const tps=now/1000;F.cx+=Math.sin(tps*.13+fi)*dt*.25;F.cz+=Math.cos(tps*.11+fi*2)*dt*.25;
   if(F.pose>0){F.pose-=dt}else if(Math.random()<.0015){const t=T.filter(t=>t.forest&&Math.hypot(t.x-F.cx,t.z-F.cz)<2.5)[0];if(t){F.arbre={x:t.x+.1,z:t.z+.05};F.pose=5+Math.random()*6}}
   if(F.pose<=0)F.arbre=null;
   // les personnages qui marchent en dessous font lever la nuée
   let peur=null;try{for(const c in MF.L){const f=MF.L[c];if(f&&f.o&&f.o.visible&&f.v135>.05&&Math.hypot(f.o.position.x-F.cx,f.o.position.z-F.cz)<.9){peur=f.o.position;break}}}catch(e){}
   if(peur){F.arbre=null;F.pose=0;const a=Math.atan2(F.cz-peur.z,F.cx-peur.x);F.cx+=Math.cos(a)*dt*1.2;F.cz+=Math.sin(a)*dt*1.2}
   const cx=F.arbre?F.arbre.x:F.cx,cz=F.arbre?F.arbre.z:F.cz;
   L.forEach((o,i)=>{const u=o.userData,v=u.v,p=o.position;let ax=(cx-p.x)*.5,az_=(cz-p.z)*.5,mx=0,mz=0;
    L.forEach((b,j)=>{if(j===i)return;const dx=p.x-b.position.x,dz=p.z-b.position.z,d=Math.hypot(dx,dz);if(d<.12&&d>1e-4){ax+=dx/d*.9;az_+=dz/d*.9}if(d<.6){mx+=b.userData.v.x;mz+=b.userData.v.z}});
    ax+=mx*.06;az_+=mz*.06;if(peur){ax+=(p.x-peur.x)*2;az_+=(p.z-peur.z)*2}
    v.x+=ax*dt;v.z+=az_*dt;const sp=Math.hypot(v.x,v.z),vmax=F.arbre?.25:.7;if(sp>vmax){v.x*=vmax/sp;v.z*=vmax/sp}
    p.x+=v.x*dt;p.z+=v.z*dt;const sol=Math.max(0,alt(p.x,p.z))*VX,posee=F.arbre&&Math.hypot(cx-p.x,cz-p.z)<.25;
    const cible=sol+(posee?.32+(i%3)*.05:u.h*(peur?1.4:1));p.y+=(cible-p.y)*Math.min(1,dt*(posee?3:1.5));
    o.rotation.y=Math.atan2(v.x,v.z);
    // battement : descente rapide (30 % du cycle), remontée lente, puis plané ; posé : ailes repliées
    u.ph+=dt*(posee?0:(peur?16:11));let ang;if(posee){ang=-1.35}else{const c=(u.ph%6.283)/6.283,plane=Math.sin(u.ph*.11+i)>.55&&!peur;ang=plane?.12:(c<.3?.9-2.0*(c/.3):-1.1+2.0*((c-.3)/.7))}
    u.ad.rotation.z=ang;u.ag.rotation.z=-ang;o.rotation.x=posee?0:-v.z*0}) }}catch(e){}return r}}

// 5) Les disparitions d'espèces ne tombent plus à date fixe : chaque bête a une « usure » qui monte chaque année selon ce qui la menace.
//    Côte (tortues, dugongs, oiseaux des étangs) : les colons installés sur le littoral, les navires à ravitailler.
//    Hauts et forêts (oiseau bleu, perroquets, solitaire, huppe, roussettes, chauve-souris) : les colons qui montent et défrichent, les marrons qui chassent selon leur faim.
//    Les choix et l'utopie suivie (le passé choisi) accélèrent ou freinent. Avec le rythme de l'histoire réelle, chaque bête s'éteint vers sa date d'archive.
const ZONE135={dugong:'cote',tortues:'cote',oiseauxeau:'cote',solitaire:'hauts',oiseaubleu:'hauts',perroquets:'foret',mascarin:'foret',huppe:'foret',roussetteN:'foret',roussetteC:'foret',chauveH:'foret'};
function pression135(k){const z=ZONE135[k]||'foret',C=S.voieC,ps=S.passe||'hist';let m=1;
 // ce que les premiers venus ont décidé en 1665
 if(S.disp133<0)m*=1.3;else if(S.disp133>0)m*=.8;
 // où vivent les colons : sur la côte, ou montés dans les Hauts
 let bas=0,haut=0,cl=0;for(const i in S.t){const o=S.t[i],t=T[i];if(!o||!t)continue;if(o.c||o.clr||o.b==='champ'||o.b==='habitation'){if(t.alt<300)bas++;else if(t.alt>600)haut++;if(o.clr)cl++}}
 const fo=(typeof foret==='function'?foret():100)/100;
 // la faim des marrons : un camp qui manque de vivres chasse plus
 const marrons=C?Math.min(2,(S.traque||30)/50):Math.min(2,(S.gens||10)/20)*((S.vivres||0)<(S.gens||10)?1.4:1);
 if(!C){// côté marron, la colonie suit son cours d'archive ; ce qui change, c'est la faim des camps et leurs défrichements
  m*=(z==='cote'?1:.85+.15*marrons+(1-fo)*.8);if(ps==='comptoir'&&z==='cote')m*=1.3;if(ps==='cafe'&&z==='foret')m*=1.2}
 else if(z==='cote'){m*=.6+Math.min(1.4,bas/12)+(ps==='comptoir'?.4:0)+(ps==='cafe'?.15:0)}
 else{const def=1-fo;m*=.45+Math.min(1.2,haut/10)+def*1.2+marrons*.25;if(z==='foret'&&ps==='cafe')m*=1.25}
 if(ps==='myst')m*=.7;if(ps==='libert')m*=.85;if(S.uchLum)m*=.9;
 if(S.sv&&S.sv.zerbaz&&!C)m*=.9;
 return {m,cause:z==='cote'?(bas>haut?'colons de la côte':'navires'):(haut>3?'colons montés dans les Hauts':(1-fo)>.25?'défrichement':'chasse des marrons')}}
{let an=null;setInterval(()=>{try{if(typeof S==='undefined'||!S||S.fin||S.year==null)return;S.disp135=S.disp135||{};S.disp135x=S.disp135x||{};
  if(an==null||an>S.year){an=S.year;
   // partie commencée tard (1794…) : les bêtes déjà disparues dans l'histoire réelle le sont aussi
   if(!S.disp135i){S.disp135i=1;DISP133.forEach(([k,y])=>{const r=1/(y-1663);S.disp135[k]=Math.max(0,(S.year-1663)*r);if(S.year>=y)S.disp135x[k]=y})}return}
  if(S.year===an)return;const d=S.year-an;an=S.year;
  DISP133.forEach(([k,y])=>{if(S.disp135x[k]!=null)return;const P=pression135(k);S.disp135[k]=(S.disp135[k]||0)+d*P.m/(y-1663);(S.disp135c=S.disp135c||{})[k]=P.cause;
   if(S.disp135[k]>=1){S.disp135x[k]=S.year}else if(S.year>=y+30&&!(S.disp135v||{})[k]){(S.disp135v=S.disp135v||{})[k]=S.year;try{(S.evq=S.evq||[]).push('surv135_'+k)}catch(e){}}})}catch(e){}},1500)}
DISP133.forEach(([k,y,t,b,tg])=>{const E=EV['disp133_'+k];if(!E)return;
 Object.defineProperty(E,'y',{configurable:true,get(){return (S&&S.disp135x&&S.disp135x[k]!=null)?S.disp135x[k]:9999}});
 E.si=()=>S&&S.disp135x&&S.disp135x[k]!=null;
 Object.defineProperty(E,'b',{configurable:true,get(){const c=S&&S.disp135c&&S.disp135c[k],x=S&&S.disp135x&&S.disp135x[k];let s=b;if(x!=null){const e=x-y;s+=' Dans votre histoire, la fin vient '+(Math.abs(e)<5?'vers la date des archives':e<0?(-e)+' ans plus tôt que dans les archives':e+' ans plus tard que dans les archives')+(c?' ; la cause qui a pesé le plus : '+c+'.':'.')}return s}});
 Object.defineProperty(E,'an',{configurable:true,get(){const x=S&&S.disp135x&&S.disp135x[k];return 'vers '+(x!=null?x:y)}});
 EV['surv135_'+k]={y:9999,sys:1,tag:'Uchronie',an:'',t:'Encore vivant : '+t.replace(/^L[ae]s? |^L’/,m=>m),get b(){return 'Dans les archives, cette bête disparaît vers '+y+'. Dans votre histoire, elle vit encore : '+((S.passe&&S.passe!=='hist')?'le passé que vous avez choisi l’a épargnée.':'on a pris moins qu’ailleurs, ou plus tard.')+' Rien ne dit qu’elle tiendra.'},v:'Une uchronie : ce qui aurait pu être.',h:'Fiction du jeu : dans l’histoire réelle, l’espèce a disparu vers '+y+'.',o:[{n:'La protéger',d:'Cohésion +1, mystique +1. Son usure ralentit.',fx:{coh:1,myst:1},hist:1,f:()=>{S.disp135[k]=Math.max(0,(S.disp135[k]||0)-.3)}},{n:'Continuer',d:'',fx:{},hist:1}]}});

// 6) Vie : ce que rapporte une sortie dépend du nombre de partants, du lieu et de ce qu'il peut donner.
//    Un seul chasseur prend ce que la place peut redonner : il ne la vide pas. Deux prennent plus et l'entament. Trois ou plus vident la place, mais rapportent tout ce qu'il y avait.
//    Chacun ne porte qu'une charge : quand le groupe est plein, il rentre.
function lieuGib135(t){let f=t.forest?1.2:t.bare?.3:.75;if(t.riv)f*=1.1;if(t.alt>1800)f*=.6;else if(t.alt>1200)f*=.85;return f}
function lieuCueil135(t){let f=t.forest?1:t.bare?.25:.8;if(typeof wet==='function'&&wet(t))f*=1.15;if(t.alt>1800)f*=.6;return f}
{const ej=expJour;expJour=function(){const mis=[];try{if(S&&!modeHist()&&S.grp)S.grp.forEach(g=>{const e=g.exp;if(!e||e.etat!=='sur place'||(e.but!=='chasse'&&e.but!=='cueil'))return;const t=T[g.pos],M=grpMembres(g),n=M.length;if(!t||!n)return;
  const port=n*6,ch=e.but==='chasse',nom=lieuDe(t)?(ch?' vers ':' à ')+lieuDe(t):'';
  if(ch){const rich=lieuGib135(t)*(typeof gibR==='function'?gibR(t):1)*(typeof trpF==='function'?Math.max(.6,trpF(t)):1),hab=M.filter(p=>p.role==='cha').length;
   const ok=rnd()<.35+rich*.4+hab*.08+(S.sv&&S.sv.papangue?.1:0);let pris=0;
   if(ok){if(n===1){pris=1.2*rich;journal(g.n+' chasse seul'+nom+' : il prend ce que la forêt redonne, sans vider la place.')}
    else if(n===2&&rich>=.6){pris=2.4*rich;if(typeof gibUse==='function')gibUse(t);journal(g.n+' prend du gibier'+nom+' : la place commence à s’épuiser.')}
    else if(n===2){pris=rich*4.2;S.gibP=S.gibP||{};S.gibP[t.i]=.75;journal(g.n+' trouve peu de gibier'+nom+' : à deux, ils prennent tout ce qui reste.')}
    else{pris=rich*(2+n*1.6);S.gibP=S.gibP||{};S.gibP[t.i]=.75;(t.nb||[]).forEach(i=>{S.gibP[i]=Math.min(.75,(S.gibP[i]||0)+.12)});journal(g.n+' bat toute la place'+nom+' : ils rapportent tout, mais il n’y aura plus rien ici avant longtemps.')}}
   e.charge=Math.min(port,(e.charge||0)+pris)}
  else{const r=typeof resR==='function'?resR(t):1,rich=lieuCueil135(t)*r;let pris;
   if(n===1){pris=1*rich;journal(g.n+' cueille'+nom+' en laissant de quoi repousser.')}
   else if(n===2&&rich>=.6){pris=2*rich;if(typeof resUse==='function')resUse(t)}
   else if(n===2){pris=rich*3.6;S.resR=S.resR||{};S.resR[t.i]=.05;S.resT=S.resT||{};S.resT[t.i]=S.jourN||0;journal(g.n+' trouve peu à cueillir'+nom+' : à deux, ils ramassent tout ce qui reste.')}
   else{pris=rich*(1.6+n*1.3);S.resR=S.resR||{};S.resR[t.i]=.05;S.resT=S.resT||{};S.resT[t.i]=S.jourN||0;journal(g.n+' ramasse tout'+nom+' : la place est vidée pour un moment.')}
   e.charge=Math.min(port,(e.charge||0)+pris)}
  if(e.charge>=port-.5){e.etat='retour';journal(g.n+' ne peut plus rien porter : il rentre.')}
  mis.push([e,e.but]);e.but='__135'})}catch(x){}
 try{return ej.apply(this,arguments)}finally{mis.forEach(([e,b])=>{if(e.but==='__135')e.but=b})}}}
// 7) Le panneau de droite des cases disparaît : tout passe par le clic droit (le panneau reste caché, le menu y puise ses actions).
{const st=document.createElement('style');st.textContent='body:not(.side135) #side{visibility:hidden!important;pointer-events:none!important}#cur135{position:fixed;z-index:120;width:22px;height:22px;pointer-events:none;transition:left .55s ease,top .55s ease;filter:drop-shadow(0 1px 2px rgba(0,0,0,.6))}#mCtx button.vise135{background:#e8be5a!important;color:#1d1a14!important}';document.head.appendChild(st)}
// 8) Le conte joue comme un joueur : la souris va sur la case, le menu du clic droit s'ouvre, le choix s'allume, puis l'action se fait.
function conteClic135(t,id,suite){try{const a=actions(t).find(x=>x.id===id);if(!a||S.bras<a.c||(a.r&&!peut(a.r)))return false;
 let cur=document.getElementById('cur135');if(!cur){cur=document.createElement('div');cur.id='cur135';cur.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 2l7 19 2.6-7.6L20 11z" fill="#fff" stroke="#111" stroke-width="1.4"/></svg>';document.body.appendChild(cur)}
 cur.style.left=(innerWidth/2)+'px';cur.style.top=(innerHeight-120)+'px';cur.hidden=false;
 const ecran=()=>{const v=new THREE.Vector3(t.x,Math.max(0,alt(t.x,t.z))*VX,t.z).project(cam);const r=$('c').getBoundingClientRect();return [r.left+(v.x+1)/2*r.width,r.top+(1-v.y)/2*r.height]};
 setTimeout(()=>{try{const [x,y]=ecran();cur.style.left=x+'px';cur.style.top=y+'px'}catch(e){}},500);
 setTimeout(()=>{try{const [x,y]=ecran();choisirTuile(t);const L=[];[...document.querySelectorAll('#side button')].filter(b=>!b.disabled&&b.textContent.trim()).slice(0,9).forEach(b=>{const t0=b.querySelector('b');L.push(['▸ '+(t0?t0.textContent:b.textContent).trim().replace(/\s+/g,' ').slice(0,60),()=>{}])});
   try{souris157(x,y)}catch(e){}
   }catch(e){}},1200);
 setTimeout(()=>{try{const m=$('mCtx');if(m)m.remove();cur.hidden=true;if(S&&!S.fin&&agir(t,id)&&suite)suite();}catch(e){}},2300);return true}catch(e){return false}}
//    si un choix du menu ouvre un sous-choix dans le panneau (bâtir, préparer…), le panneau se montre le temps de choisir
{let av=null;addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('#mCtx button');if(!b||!S)return;const sd=$('side');av={h:sd?sd.innerHTML.length+'|'+sd.querySelectorAll('button').length:'',br:S.bras,t:performance.now()};
 setTimeout(()=>{try{const sd=$('side');if(!sd||!av)return;const k=sd.innerHTML.length+'|'+sd.querySelectorAll('button').length;if(k!==av.h&&S.bras===av.br&&!(window.CINE)){document.body.classList.add('side135');clearTimeout(av.tm);av.tm=setTimeout(()=>document.body.classList.remove('side135'),20000)}}catch(x){}},150)},true);
 addEventListener('pointerdown',e=>{if(document.body.classList.contains('side135')&&e.target&&e.target.tagName==='CANVAS')document.body.classList.remove('side135')},true)}
// 9) Vie : quand le groupe part loin et que les vivres ne suffiront pas, un chasseur reste sur le trajet.
//    Il chasse pour le groupe et lui fait passer juste ce qu'il faut pour manger ; il ne prend pas part à la chasse finale ; le groupe le reprend au retour.
{const gm=grpMembres;grpMembres=function(g){const L=gm.apply(this,arguments);try{const r=g&&g.exp&&g.exp.relais;if(r)return L.filter(p=>p.id!==r.id)}catch(e){}return L}}
{const ej=expJour;expJour=function(){try{if(S&&!modeHist()&&S.grp)S.grp.forEach(g=>{const e=g.exp;if(!e)return;const r=e.relais;
   if(r){// le relais chasse : juste de quoi nourrir le groupe ce jour-là
    const t=T[r.pos],M=grpMembres(g),besoin=expConso(M.length),f=t?lieuGib135(t)*(typeof gibR==='function'?gibR(t):1):.5;if(rnd()<.45+f*.35){e.prov+=besoin;r.j=(r.j||0)+1}
    // le groupe repasse par lui, ou rentre : il le reprend
    if(e.etat==='retour'&&(g.pos===r.pos||g.pos===e.home||hd(T[g.pos],T[r.pos])<=0)){delete e.relais;const p=ppId(r.id);journal(g.n+' reprend '+(p?p.n.split(' ')[0]:'son chasseur')+' en passant : il a nourri le groupe '+(r.j||0)+' jour'+((r.j||0)>1?'s':'')+'.')}
    return}
   if(e.etat!=='aller'||e.relais0)return;const M=grpMembres(g),n=M.length;if(n<3)return;
   const loin=hd(T[g.pos],T[e.cap])+hd(T[e.cap],T[e.home]),jours=expJours(e.prov,n);
   if(jours>loin+1||hd(T[g.pos],T[e.home])<2)return;
   const p=M.find(p=>p.role==='cha')||M.find(p=>estChasseurSafe135(p))||M[M.length-1];if(!p)return;
   e.relais={id:p.id,pos:g.pos,j:0};e.relais0=1;journal(g.n+' n’a pas assez de vivres pour aller si loin : '+p.n.split(' ')[0]+' reste '+(lieuDe(T[g.pos])?'vers '+lieuDe(T[g.pos]):'sur le trajet')+' pour chasser et nourrir le groupe. Il ne sera pas de la chasse finale.')})}catch(x){}
 return ej.apply(this,arguments)}}
function estChasseurSafe135(p){try{return typeof estChasseur==='function'&&estChasseur(p)}catch(e){return false}}
// le chasseur resté sur le trajet se voit sur la carte, à sa place, en train de traquer
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(!S||modeHist()||!S.grp||typeof mfPoser!=='function')return r;S.grp.forEach((g,gi)=>{const R=g.exp&&g.exp.relais;if(!R)return;const t=T[R.pos],p=ppId(R.id);if(!t||!p)return;const x=t.x+.15,z=t.z-.1;mfPoser('rl135_'+gi,mfModeleDe(p),x,Math.max(0,alt(x,z))*VX+.02,z,1.2,'chasse_traque')})}catch(e){}return r}}
// 10) Histoire : quand on part loin (plus de 7 cases, donc au moins 2 bras), l'un des envoyés reste à mi-chemin.
//     Il chasse, cueille ou pêche pour nourrir ceux qui vont plus loin ; il ne fait pas l'action au bout. On le voit à sa place pendant la marche.
// Partir loin coûte des vivres pour la route (un vivre pour deux cases). Sans ces vivres, il faut un bras de plus qui chasse, cueille ou pêche en chemin.
let ROUTE135=null;
{const ag=agir;agir=function(t,id,libre){try{if(!libre&&typeof modeHist==='function'&&modeHist()&&LOIN75.includes(id)&&S&&!S.fin&&!camps().some(c=>c.i===t.i)){const a=actions(t).find(x=>x.id===id),P=a&&chemin75(t);
   if(a&&P&&P.length-1>2&&P.length-1<=Math.max(1,a.c||1)*CASES_PAR_BRAS&&S.bras>=a.c){const L=P.length-1,v=Math.ceil(L/2);
    if(S.vivres>=v){ROUTE135={m:'v',v};const n0=MARCHE75.length,r=ag.apply(this,arguments);if(MARCHE75.length>n0){S.vivres-=v;log('Vivres pour la route : '+v+'.');try{rafraichir()}catch(e){}}ROUTE135=null;return r}
    if(S.bras>=a.c+1){ROUTE135={m:'r'};S.bras-=1;const n0=MARCHE75.length,r=ag.apply(this,arguments);if(MARCHE75.length===n0)S.bras+=1;ROUTE135=null;return r}
    toast('Pas assez de vivres pour la route ('+v+' vivres pour '+L+' cases) : il faudrait un bras de plus, qui chasse ou cueille en chemin pour les autres.');return false}}}catch(e){ROUTE135=null}return ag.apply(this,arguments)}}
{const p1=MARCHE75.push;MARCHE75.push=function(w){try{const L=w.P.length-1,R=ROUTE135;if(R&&R.m==='r')w.n=Math.min(4,w.n+1);if(R&&R.m!=='v'&&L>2&&w.n>=2||!R&&L>CASES_PAR_BRAS&&w.n>=2){const mi=w.P[Math.floor(L/2)],t=T[mi];
   const fa=t.riv||(typeof cotier==='function'&&cotier(t)&&t.alt<200)?'pêche':t.forest?'chasse':'cueille';w.relais={i:mi,u:Math.floor(L/2)/L,fa};
   log('La route est longue : l’un des envoyés reste '+(lieuDe(t)?'vers '+lieuDe(t):'à mi-chemin')+' et '+fa+' pour nourrir les autres. Il ne sera pas de l’action au bout.')}}catch(e){}return p1.call(this,w)}}
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(typeof MARCHE75==='undefined'||!MARCHE75.length)return r;const now=performance.now();
  MARCHE75.forEach(w=>{const R=w.relais;if(!R)return;const u=Math.min(1,(now-w.t0)/w.dur);if(u<R.u)return;const t=T[R.i],j=w.n-1,x=t.x+.12,z=t.z+.08;
   mfPoser(w.k+'_'+j,w.nm[j%w.nm.length],x,Math.max(0,alt(x,z))*VX+.02,z,1.1,R.fa==='chasse'?'chasse_traque':'cueillir');const f=MF.L[w.k+'_'+j];if(f)f.vu=MF.t})}catch(e){}return r}}
