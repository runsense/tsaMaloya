// ===== p58 : la faune qui recule, les bêtes en troupeau, des personnages à l'échelle des arbres, des navires de leur époque =====

// ---------- la faune : abondante au début, elle recule devant les exploitations et pendant les famines ----------
// fAb(t) donne la part de la faune d'origine qui reste autour d'une case (de 0,1 à 1).
const FAUV={t:0,g:1,loc:new Map(),col:[]};
function fauneMaj(){const now=performance.now();if(now-FAUV.t<3000)return;FAUV.t=now;FAUV.loc.clear();
 if(!S||!S.t){FAUV.g=1;FAUV.col=[];return}let E=0;const C=[];
 T.forEach(t=>{const o=S.t[t.i];if(!o)return;if(o.c)C.push(t);if(o.c||o.clr||o.b==='jardin'||o.b==='jf')E++});FAUV.col=C;
 const an=Math.max(0,Math.min(1,((S.year||1663)-1720)/150)),chasse=Math.min(.7,S.chOis||0);
 FAUV.g=Math.max(.15,Math.min(1,1-E/90)*(1-chasse)*(1-.35*an))}
function fAb(t){fauneMaj();if(!t)return FAUV.g;let l=FAUV.loc.get(t.i);if(l===undefined){let d=99;for(const c of FAUV.col){const x=hd(c,t);if(x<d)d=x;if(d<=1)break}
  l=d<=2?.3:d<=4?.65:1;FAUV.loc.set(t.i,l)}return FAUV.g*l}
// les pétrels de Barau ne nichent que sur les hauts sommets du massif du Piton des Neiges et du Grand Bénare
const PETZ={P:null,R:0};
function petZ(t){if(!PETZ.P){PETZ.P=[xz(55.478,-21.099),xz(55.43,-21.105),xz(55.455,-21.075)];PETZ.R=Math.abs(DEM.kx)*5.5/104}return PETZ.P.some(([x,z])=>Math.hypot(t.x-x,t.z-z)<PETZ.R)}
// en temps de famine, on chasse les oiseaux jusque dans les nids : la pression retombe lentement quand on mange de nouveau
function chasseFamine(fort){if(!S)return;const avant=S.chOis||0;S.chOis=Math.min(.7,avant+(fort?.3:.1));
 if(avant<.15&&S.chOis>=.15&&typeof log==='function')log(S.voieC?'Faute de vivres, on chasse les oiseaux et les cabris jusque dans les remparts.':'La faim pousse à chasser tout ce qui vole et tout ce qui court, même les petits.')}
{const ps=window.ppSaison;if(typeof ps==='function'){ppSaison=function(){const r=ps.apply(this,arguments);try{if(S){if((S.vivres||0)<(S.gens||10)*.3)chasseFamine(false);else S.chOis=(S.chOis||0)*.88}}catch(e){}return r}}}
{const ch=choisir;choisir=function(id){try{if(/famine/i.test(id))chasseFamine(true)}catch(e){}return ch.apply(this,arguments)}}

// ---------- les personnages : à l'échelle des arbres (un arbre de la carte fait 0,5 ; une personne 0,18) ----------
MF.H=.18;
// les travailleurs posés automatiquement sur les cases de chasse et de cueillette : des personnages animés, plus les anciennes silhouettes
{const b0=bat;bat=function(k){b0(k);try{if(!S||typeof VIE==='undefined'||!VIE.vPers)return;const now=performance.now(),dt=Math.min(.1,(now-(FAUV.tp||now))/1000);FAUV.tp=now;let n=0;
 [[VIE.vPers,S.voieC?['homme_chemise','commandeur']:['p1a_chasseur','jeune_pagne'],'chasse_traque'],[VIE.vCueil,S.voieC?['servante','femme_travail']:['femme_drapee','femme_sagaie'],'cueillir']].forEach(([m,N,clip])=>{
  m.visible=false;for(let i=0;i<m.count&&n<10;i++,n++){const c='au'+n;mfDepuis(m,i,c,N[i%2],clip);const f=MF.L[c];if(f&&f.mx&&f.o&&f.o.visible)f.mx.update(dt)}})}catch(e){}}}

// ---------- les navires : chaque époque a les siens, et les pirates arborent leurs couleurs ----------
// avant 1700 : flûtes et pinasses ; chaloupe à voile pour le cabotage le long de la côte ;
// 1690-1730 : brigantins et frégates pirates (anglais d'Avery et de Taylor, français de La Buse) ;
// 1720-1789 : vaisseaux de la Compagnie des Indes ; 1790-1815 : frégates (tricolore, ou anglaises pendant le blocus) ;
// 1815-1850 : trois-mâts marchands ; après 1850 : trois-mâts à vapeur, puis vapeurs.
const NAV={ctx:''};
function navDrapeau(k){const c=document.createElement('canvas');c.width=48;c.height=32;const g=c.getContext('2d');
 const bandes=(a,v)=>a.forEach((col,i)=>{g.fillStyle=col;v?g.fillRect(i*48/a.length,0,48/a.length+1,32):g.fillRect(0,i*32/a.length,48,32/a.length+1)});
 if(k==='tricolore')bandes(['#1f3a8a','#f4f1ea','#c8262e'],1);
 else if(k==='hollande')bandes(['#c8262e','#f4f1ea','#1f3a8a'],0);
 else if(k==='anglais'){g.fillStyle='#b0242c';g.fillRect(0,0,48,32);g.fillStyle='#1f3a8a';g.fillRect(0,0,22,15);g.fillStyle='#f4f1ea';g.fillRect(9,0,4,15);g.fillRect(0,6,22,3);g.fillStyle='#c8262e';g.fillRect(10,0,2,15);g.fillRect(0,7,22,1.5)}
 else if(k==='pirate'){g.fillStyle='#111';g.fillRect(0,0,48,32);g.fillStyle='#eee';g.beginPath();g.arc(24,13,5,0,7);g.fill();g.fillRect(21,17,6,3);g.save();g.translate(24,24);g.rotate(.5);g.fillRect(-10,-1,20,2.4);g.rotate(-1);g.fillRect(-10,-1,20,2.4);g.restore();g.fillStyle='#111';g.fillRect(21.5,11.5,2,2);g.fillRect(24.5,11.5,2,2)}
 else if(k==='arabe'){g.fillStyle='#b0242c';g.fillRect(0,0,48,32)}
 else{g.fillStyle='#f4f1ea';g.fillRect(0,0,48,32);if(k==='royal'){g.fillStyle='#d8c58a';for(let i=0;i<6;i++){g.beginPath();g.arc(8+(i%3)*16,9+Math.floor(i/3)*14,2.4,0,7);g.fill()}}}
 const t=new THREE.CanvasTexture(c);return new THREE.Mesh(new THREE.PlaneGeometry(.12,.08),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}))}
// la coque : une boîte effilée vers la proue, plus étroite au fond, avec un château arrière pour les vaisseaux d'avant 1800
function navCoque(L,W,H,col,chateau){const g=new THREE.BoxGeometry(L,H,W,8,2,2),p=g.attributes.position;
 for(let i=0;i<p.count;i++){const x=p.getX(i)/L+.5,y=p.getY(i)/H+.5;let s=x>.7?1-(x-.7)/.3*.9:x<.08?.8:1;s*=.55+.45*y;p.setZ(i,p.getZ(i)*s);if(x>.85)p.setY(i,p.getY(i)+(x-.85)*H*.8)}g.computeVertexNormals();
 const G=new THREE.Group(),M=c=>new THREE.MeshLambertMaterial({color:c});const h=new THREE.Mesh(g,M(col));h.position.y=H/2;G.add(h);
 const b=new THREE.Mesh(new THREE.BoxGeometry(L*.9,H*.12,W*.92),M(0x2a1e14));b.position.y=H*.8;b.scale.z=.85;G.add(b);
 if(chateau){const c=new THREE.Mesh(new THREE.BoxGeometry(L*.2,H*.6,W*.75),M(col));c.position.set(-L*.38,H*1.2,0);G.add(c)}return G}
function navMat(G,x,h,voiles,lat,col){const M=c=>new THREE.MeshLambertMaterial({color:c,side:THREE.DoubleSide});const m=new THREE.Mesh(new THREE.CylinderGeometry(.006,.009,h,5),M(0x4a3420));m.position.set(x,h/2+.05,0);G.add(m);
 if(lat){const s=new THREE.Shape();s.moveTo(0,0);s.lineTo(-h*.7,h*.15);s.lineTo(h*.1,h*.95);s.lineTo(0,0);const v=new THREE.Mesh(new THREE.ShapeGeometry(s),M(col||0xe6dcc4));v.position.set(x+.02,.1,0);G.add(v);return m}
 for(let i=0;i<voiles;i++){const w=.2-i*.04,hh=h*.24,v=new THREE.Mesh(new THREE.PlaneGeometry(w,hh,3,1),M(col||0xece3cf));const pp=v.geometry.attributes.position;for(let j=0;j<pp.count;j++)pp.setZ(j,Math.cos(pp.getX(j)/w*3)*.012);v.rotation.y=Math.PI/2-.55;v.position.set(x+.01,.12+h*.12+i*hh*1.08,0);G.add(v)}return m}
function navType(){const y=S&&S.year||1700,c=NAV.ctx;
 if(/boutre|arabe|pirogue|malgache/.test(c))return {t:'boutre',d:'arabe'};
 if(/pirate|forban|flibust/.test(c)){const fr=y>=1715&&(Math.random()<.4);return {t:y<1712?'brigantin':'fregate',d:'pirate',e:fr?'blanc':(y<1712?'anglais':'anglais')}}
 if(/anglais|anglaise|escadre|blocus/.test(c)||(S&&(S.blocus===1||S.blocus2===1)&&/frégate/.test(c)))return {t:'fregate',d:'anglais'};
 if(/Sainte-Suzanne|cabotage|chaloupe|côte/.test(c)&&y<1730)return {t:'chaloupe',d:'blanc'};
 if(y<1700)return {t:'flute',d:'blanc'};if(y<1790)return {t:'vaisseau',d:'royal'};if(y<1815)return {t:'fregate',d:'tricolore'};
 if(y<1850)return {t:'troismats',d:y<1830?'royal':'tricolore'};if(y<1900)return {t:'mixte',d:'tricolore'};return {t:'vapeur',d:'tricolore'}}
bateauMesh=function(){const K=navType(),G=new THREE.Group();let mats=[];
 const add=(L,W,H,col,ch)=>{const c=navCoque(L,W,H,col,ch);G.add(c)};
 if(K.t==='chaloupe'){add(.34,.12,.07,0x6a4a2c,0);mats.push(navMat(G,.02,.3,0,1))}
 else if(K.t==='boutre'){add(.5,.14,.09,0x8a6a44,0);mats.push(navMat(G,.06,.42,0,1,0xd8c8a0))}
 else if(K.t==='brigantin'){add(.62,.16,.1,0x3a2a1c,0);mats.push(navMat(G,.14,.5,3),navMat(G,-.1,.45,0,1))}
 else if(K.t==='flute'){add(.8,.2,.13,0x5a3c22,1);mats.push(navMat(G,.22,.55,3),navMat(G,0,.62,3),navMat(G,-.24,.4,0,1))}
 else if(K.t==='vapeur'){add(1,.18,.14,0x2a2a2e,0);const ch=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.2,8),new THREE.MeshLambertMaterial({color:0x1a1a1a}));ch.position.set(0,.3,0);G.add(ch);const s=new THREE.Mesh(new THREE.BoxGeometry(.3,.07,.12),new THREE.MeshLambertMaterial({color:0xe8e4da}));s.position.set(-.05,.2,0);G.add(s);mats.push(navMat(G,.3,.35,0,0))}
 else{const L=K.t==='fregate'?.95:.9;add(L,.21,.14,K.t==='mixte'?0x2a2420:(K.t==='fregate'?0x2e2a24:0x5a3c22),K.t==='vaisseau'||K.t==='fregate'&&(S&&S.year<1800));
  if(K.t!=='mixte'){const f=new THREE.Mesh(new THREE.BoxGeometry(L*.75,.012,.215),new THREE.MeshLambertMaterial({color:K.t==='fregate'?0xd8cba8:0x9a2a22}));f.position.y=.1;G.add(f)}
  mats.push(navMat(G,.26,.62,3),navMat(G,0,.72,3),navMat(G,-.26,.5,K.t==='mixte'?2:0,K.t!=='mixte'));
  if(K.t==='mixte'){const ch=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.18,8),new THREE.MeshLambertMaterial({color:0x1a1a1a}));ch.position.set(-.12,.26,0);G.add(ch)}}
 // le pavillon en tête du grand mât ; les pirates ajoutent à la poupe les couleurs qu'ils font semblant d'avoir
 const top=mats.reduce((a,m)=>m.geometry.parameters.height>a.geometry.parameters.height?m:a,mats[0]);if(top){const d=navDrapeau(K.d);d.position.set(top.position.x-.06,top.position.y+top.geometry.parameters.height/2+.02,0);d.rotation.y=Math.PI/2;G.add(d)}
 if(K.e){const d=navDrapeau(K.e);d.scale.setScalar(.8);d.position.set(-.33,.22,0);d.rotation.y=Math.PI/2;G.add(d)}
 const W=new THREE.Group();W.add(G);W.userData.nav=K;return W};
{const cm=cineMer;cineMer=function(dep,arr,txt){NAV.ctx=(txt||[]).join(' ');try{return cm.apply(this,arguments)}finally{}}}

// ---------- le cyclone : pas de spirale visible depuis le sol ; on le voit au ciel qui s'assombrit, à la pluie qui écrase tout,
// et au vent qui force à mesure que le centre approche ----------
const CYCV={I:0,pl:null,base:null,cx:0,cz:0};
function cycCentre(){const inn=S&&S.cyc?S.cyc.in:9,f=(S&&S.cyc&&S.cyc.f)||1,prog=Math.max(0,Math.min(1,(2.6-inn)/2.6)),dx=f>=2?0:26;return [32+dx+70*(1-prog),28-dx*.4-40*(1-prog)]}
{const ci=ciel;ciel=function(k,dt){ci.apply(this,arguments);try{if(typeof swirl!=='undefined'&&swirl)swirl.scale.set(0,0,0);
 const [cx,cz]=cycCentre();CYCV.cx=cx;CYCV.cz=cz;const d=Math.hypot(camT.x-cx,camT.z-cz),pres=Math.max(0,1-d/80);
 const I=S&&!S.fin?stormV*(.35+.65*pres):0;CYCV.I+=(I-CYCV.I)*Math.min(1,dt*1.5);const vd=depV(),v=Math.max(CYCV.I,vd),vc=CYCV.I;
 const U=terr.material.uniforms;U.tint.value.multiplyScalar(1-.5*vc-.22*vd);
 if(vc>.02||vd>.02)R.setClearColor(new THREE.Color(.05,.08,.1).lerp(new THREE.Color(.02,.03,.035),Math.max(vc,vd*.5)));
 if(!CYCV.base){CYCV.base=[];scene.traverse(o=>{if(o.isLight)CYCV.base.push([o,o.intensity])})}CYCV.base.forEach(([o,b])=>o.intensity=b*(1-.55*vc-.25*vd));
 // la pluie : des traits autour du regard, couchés par le vent ; le vent tourne autour du centre (sens des aiguilles d'une montre, hémisphère sud)
 if(!CYCV.pl){const N=2400,P=new Float32Array(N*6);for(let i=0;i<N;i++){P[i*6]=Math.random();P[i*6+1]=Math.random();P[i*6+2]=Math.random()}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));
  CYCV.pl=new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0xd2dde4,transparent:true,opacity:.5,depthWrite:false}));CYCV.pl.frustumCulled=false;CYCV.pl.renderOrder=6;CYCV.seed=Float32Array.from(P);scene.add(CYCV.pl)}
 const pl=CYCV.pl;pl.visible=v>.04&&!reduce;if(pl.visible){const P=pl.geometry.attributes.position.array,Sd=CYCV.seed,n=Math.floor(2400*Math.min(1,v*1.2)),Rr=Math.max(4,dist*.55),H=Math.max(3,dist*.35),t=k;
  const gy=Math.max(0,alt(camT.x,camT.z))*VX;const ali=vd>vc,wx=ali?-1:-(camT.z-cz),wz=ali?.25:(camT.x-cx),wl=Math.hypot(wx,wz)||1,force=.25+1.6*(ali?vd*.5:vc),vx=wx/wl*force,vz=wz/wl*force,ch=H*.09;
  for(let i=0;i<n;i++){const a=Sd[i*6],b=Sd[i*6+1],c=Sd[i*6+2],f=(c+t*(1.4+v))%1,x=camT.x+(a-.5)*2*Rr+vx*f*H*.6,z=camT.z+(b-.5)*2*Rr+vz*f*H*.6,y=gy+H*(1-f);
   P[i*6]=x;P[i*6+1]=y;P[i*6+2]=z;P[i*6+3]=x-vx*ch;P[i*6+4]=y+ch*1.6;P[i*6+5]=z-vz*ch}
  pl.geometry.setDrawRange(0,n*2);pl.geometry.attributes.position.needsUpdate=true;pl.material.opacity=.35+.45*v}
 // les rafales : la vue tremble un peu quand le centre est tout près
 if(vc>.5&&!reduce&&cam){const s=(vc-.5)*.06*dist/30;cam.position.x+=Math.sin(k*23)*s;cam.position.y+=Math.sin(k*17+1)*s*.6}}catch(e){}}}

// ---------- les passages cycloniques mineurs : en saison des pluies, une dépression passe au large ;
// une semaine de pluie dans l'Est, quelques averses qui passent jusque sous le vent ----------
function depOn(){return !!(S&&S.dep&&!S.fin&&(S.dep.h||((S.jourN||0)-S.dep.j0)<7))}
function depV(){if(!depOn())return 0;const est=camT.x>33;return est?.42:.14}
{const ps=ppSaison;ppSaison=function(){const r=ps.apply(this,arguments);try{if(!S||S.fin)return r;S.dep=null;const pluies=((S.ns||0)%2)===0;
 if(pluies&&!(S.cyc&&S.cyc.in<=1)&&Math.random()<.45){S.dep={j0:S.jourN||0,h:typeof modeHist==='function'&&modeHist()};const c=camps()[0],est=c&&c.x>33;
  log(est?'Une dépression passe au large : une semaine de pluie battante sur l’Est. Les rivières grossissent'+(S.voieC?', les chemins sont coupés.':', personne ne monte vers le camp.'):'Une dépression passe au large de l’Est : ici, sous le vent, quelques bonnes averses qui font du bien aux plantations.');
  try{if(typeof fx==='function')fx(est?{traque:-3,sante:-1}:{vivres:2})}catch(e){}}}catch(e){}return r}}
