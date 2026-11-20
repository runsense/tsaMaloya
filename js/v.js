
// ===== Duels de légende : combat à deux, en vue de côté (façon Street Fighter 2), simplifié =====
// Les colons ont des armes et des habits épais (pas d'armure à Bourbon) ; les marrons ont les pouvoirs des anciens.
// ouvrirDuel(moi, lui, fin) : moi, lui = clés de DUE.F ; fin({ok, rounds}).
const DUE=(()=>{
 const F={dimitile:{n:'Dimitile',d:'Chef marron des hauts du sud. Rapide, la sagaie courte à la main.',col:'#c08a50',pv:100,vit:230,arme:{n:'Sagaie courte',po:105,d:11},arm:0,sp:'aveugle',spn:'Poudre des anciens',sp2:'chienM',sp2n:'Chien dressé'},
  heva:{n:'Héva',d:'La reine des marrons de la légende. Bâton, peur, et la plante qui endort les chiens.',col:'#c8a0ff',pv:95,vit:215,arme:{n:'Bâton',po:100,d:9},arm:0,sp:'peur',spn:'Cri des ancêtres',sp2:'plante',sp2n:'Plante des chiens'},
  cimendef:{n:'Cimendef',d:'Le marron du rempart, « cœur contraire ». Lourd et solide, un gourdin de bois de fer.',col:'#a05a3a',pv:120,vit:185,arme:{n:'Gourdin de bois de fer',po:90,d:15},arm:0,sp:'bond',spn:'Saut du rempart',sp2:'aveugle',sp2n:'Poudre des anciens'},
  gardien:{n:'Gardien d’Hanuman',d:'Figure du mythe, gardien des passages sous l’île. Bondit comme le singe-dieu.',col:'#e8c040',pv:110,vit:240,arme:{n:'Bâton des passages',po:115,d:12},arm:0,sp:'bond',spn:'Bond d’Hanuman',sp2:'peur',sp2n:'Regard du singe-dieu'},
  milicien:{n:'Le milicien',d:'Un habitant de la milice. Sabre de plantation, pistolet, habit de drap épais.',col:'#a08060',pv:95,vit:200,arme:{n:'Sabre de plantation',po:110,d:13},arm:.15,sp:'tir',spn:'Pistolet'},
  commandeur:{n:'Le commandeur',d:'Il surveille les champs. Barre de fer, pioche, et la voix qui fait trembler.',col:'#8a6a4a',pv:115,vit:180,arme:{n:'Barre de fer',po:95,d:17},arm:.1,sp:'coup',spn:'Coup de pioche'},
  mussard:{n:'Le chasseur de marrons',d:'Inspiré des chefs de détachement du XVIIIe siècle. Fusil, crosse, et ses chiens.',col:'#704830',pv:105,vit:190,arme:{n:'Crosse du fusil',po:95,d:11},arm:.12,sp:'tir',spn:'Coup de fusil',sp2:'chien',sp2n:'Lâcher le chien'},
  anglais:{n:'Le capitaine anglais',d:'1810 : l’officier qui débarque à la Grande Chaloupe. Mousquet et baïonnette.',col:'#d03030',pv:110,vit:190,arme:{n:'Baïonnette',po:120,d:12},arm:.15,sp:'tir',spn:'Mousquet'},
  ombre:{n:'L’envoyé de l’Ordre noir',d:'Le fanatique venu prendre le secret des fonds. L’ennemi de l’utopie.',col:'#303038',pv:125,vit:200,arme:{n:'Dague',po:90,d:13},arm:.1,sp:'peur',spn:'Malédiction volée',sp2:'tir',sp2n:'Pistolet'}};
 Object.keys(F).forEach(k=>F[k].k=k);
 const MARRONS=['dimitile','heva','cimendef','gardien'],ADV=['milicien','commandeur','mussard','anglais','ombre'];
 const CD={tir:3.2,sagaie:2.5,peur:4,bond:2.5,aveugle:7,chienM:9,chien:9,plante:8,coup:3};
 function ouvrir(mk,lk,fin){const A00=F[mk]||F.dimitile,A0=(typeof S!=='undefined'&&S&&!S.bac&&S.outil&&MARRONS.includes(mk))?{...A00,arme:{n:'Barre de fer volée',po:A00.arme.po,d:A00.arme.d+3}}:A00,POT=(typeof S!=='undefined'&&S&&!S.bac&&S.potion>0)?(S.potion--,25):0,B0=F[lk]||F.milicien,rm=document.getElementById('retM');if(rm)rm.style.visibility='hidden';window.BTUON=1;
  const dif=(typeof S!=='undefined'&&S&&S.dif)||'normal',IA=dif==='histoire'?.55:dif==='expert'?1.3:.9;
  const el=document.createElement('div');el.id='duel';el.innerHTML='<canvas></canvas><div class="bh"><b>'+A0.n+'</b> contre <b>'+B0.n+'</b> <span id="duI"></span><button class="bt sec" id="duQ">Quitter</button></div><div class="gpad"><button data-k="g">◀</button><button data-k="d">▶</button><button data-k="b">▼ garde</button><button data-k="h">▲ saut</button><button data-k="p">Poing<small class="tk">1</small></button><button data-k="j">'+A0.arme.n+'<small class="tk">2</small></button><button data-k="s">'+A0.spn+'<small class="tk">3</small></button>'+(A0.sp2?'<button data-k="u">'+A0.sp2n+'<small class="tk">4</small></button>':'')+'</div><div class="gt" id="duT"></div>';document.body.appendChild(el);
  const cv=el.querySelector('canvas'),xb=cv.getContext('2d');let x=xb;let W,H;
  // les combattants en 3D : les mêmes modèles animés que dans la partie, filmés de profil entre le décor et l'affichage
  const c3=document.createElement('canvas'),ch=document.createElement('canvas');[c3,ch].forEach(c=>c.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none');cv.after(c3);c3.after(ch);const hx=ch.getContext('2d');
  const D3={ok:0,R:null,S:null,C:null,f:{}};
  const MOD3={dimitile:['p1a_chasseur','sagaie'],heva:['femme_sagaie','baton_coup'],cimendef:['jeune_pagne','baton_coup'],gardien:['mystique','baton_coup'],milicien:['milicien','sabre'],commandeur:['commandeur','baton_coup'],mussard:['p7_colon','baton_coup'],anglais:['jeune_colon','sabre'],ombre:['pretre','sabre']};
  const d3Taille=()=>{if(!D3.R)return;D3.R.setSize(W,H,false);const C=D3.C;C.left=0;C.right=W;C.top=H;C.bottom=0;C.updateProjectionMatrix()};
  function d3Init(){if(typeof THREE==='undefined'||!THREE.GLTFLoader||typeof p3Charge!=='function')return;try{const R=new THREE.WebGLRenderer({canvas:c3,alpha:true,antialias:true});R.outputEncoding=THREE.sRGBEncoding;R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.setClearColor(0,0);D3.R=R;
   const Sc=new THREE.Scene();Sc.add(new THREE.HemisphereLight(0xfff1dc,0x403020,1.15));const dl=new THREE.DirectionalLight(0xffe6c0,.95);dl.position.set(-300,700,900);Sc.add(dl);D3.S=Sc;D3.C=new THREE.OrthographicCamera(0,1,1,0,-3000,3000);D3.C.position.z=1500;d3Taille();
   Promise.all([A0,B0].map(f=>{const m=MOD3[f.k]||['homme_chemise','baton_coup'];return p3Charge(m[0]).then(()=>p3Instance(m[0])).then(o=>{o.g.scene.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o.g.scene);o.h=(b.max.y-b.min.y)>.3?b.max.y-b.min.y:1.75;o.y0=isFinite(b.min.y)?b.min.y:0;o.arme=m[1];o.clips=o.g.animations;const grp=new THREE.Group();grp.add(o.g.scene);Sc.add(grp);o.grp=grp;return o})})).then(([a,b])=>{if(stop)return;D3.f.A=a;D3.f.B=b;D3.ok=1}).catch(()=>{D3.ok=0})}catch(e){D3.ok=0}}
  function d3Jouer(o,cle,n,once,sp){if(o.cle===cle)return;const cl=THREE.AnimationClip.findByName(o.clips,n)||THREE.AnimationClip.findByName(o.clips,'garde');if(!cl)return;const ac=o.mx.clipAction(cl);ac.reset();ac.setLoop(once?THREE.LoopOnce:THREE.LoopRepeat,Infinity);ac.clampWhenFinished=!!once;ac.timeScale=sp||1;ac.enabled=true;ac.setEffectiveWeight(1);if(o.cur&&o.cur!==ac)ac.crossFadeFrom(o.cur,.12,false);ac.play();o.cur=ac;o.cle=cle}
  const MAR3=['dimitile','heva','cimendef','gardien'];
  function d3Etat(c,o){const dx=c.x-(c.p3==null?c.x:c.p3);c.p3=c.x;const vit=Math.abs(dx);c.vl=(c.vl||0)*.8+vit*.2;const dur=n=>{const cl=THREE.AnimationClip.findByName(o.clips,n);return cl?cl.duration:1};
   if(G.fini){if(c===G.L&&!c.fuite)return d3Jouer(o,'ko','chute_mort',true,1.3);if(c.fuite)return d3Jouer(o,'fuite','marche',false,2.2);if(c.win)return d3Jouer(o,'win',MAR3.includes(c.f.k)?'transe_maloya':'commandeur',false,1);if(c.act)return d3Jouer(o,'fin'+(c.nA||0),o.arme,true,dur(o.arme)/.7)}
   if(c.pw>0)return d3Jouer(o,'pw'+(c.nA||0),c.pwc,true,dur(c.pwc)/.8);
   if(c.act){const t=atk(c,c.act),n=c.act==='p'?'sagaie':o.arme;return d3Jouer(o,c.act+(c.nA||0),n,true,dur(n)/(t.dur+.3))}
   if(c.stun>0)return d3Jouer(o,'stun','marche_blesse',false,1);
   if(c.garde)return d3Jouer(o,'garde','cacher',true,2);
   if(c.y>0)return d3Jouer(o,'saut','marche',false,.4);
   if(c.vl>1.6)return d3Jouer(o,'marche','marche',false,2);if(c.vl>.4)return d3Jouer(o,'marche2','marche',false,1.3);
   return d3Jouer(o,'garde0','garde',false,1)}
  function d3Dessin(dt){if(!D3.ok)return;[[A,D3.f.A],[B,D3.f.B]].forEach(([c,o])=>{if(!c||!o)return;d3Etat(c,o);o.mx.update(dt);if(c.act==='p'&&!G.fini){if(!o.props){o.props=[];o.g.scene.traverse(b=>{if(b.isBone&&typeof P3OBJ!=='undefined'&&P3OBJ.includes(b.name))o.props.push(b)})}o.props.forEach(b=>b.scale.set(0,0,0))}const k=165/o.h;o.grp.scale.setScalar(k);const X=c.x-(c.touche>0?c.s*6:0),Ys=SOL()-c.y-(c.yF||0);o.grp.position.set(X,H-Ys-o.y0*k,0);o.grp.rotation.set(0,c.s>0?Math.PI/2-.35:-Math.PI/2+.35,(G.frap&&c===G.L)?-(c.rot||0):0)});D3.R.render(D3.S,D3.C)}
  const taille=()=>{W=cv.width=ch.width=innerWidth;H=cv.height=ch.height=innerHeight;d3Taille()};taille();addEventListener('resize',taille);d3Init();
  const K={};const map={arrowleft:'g',q:'g',a:'g',arrowright:'d',d:'d',arrowup:'h',z:'h',w:'h',arrowdown:'b',s:'b',j:'p',k:'j',l:'s',i:'u'};
  const NUM={Digit1:'p',Numpad1:'p',Digit2:'j',Numpad2:'j',Digit3:'s',Numpad3:'s',Digit4:'u',Numpad4:'u',Numpad0:'b',Numpad5:'b'},km=e=>NUM[e.code]||map[e.key.toLowerCase()];
  const kd=e=>{if(G.ph==='ko'&&G.ok&&/^(Digit|Numpad)[12]$/.test(e.code)){G.pt=9;finMaj(0)}if(G.ph==='choix'){if(e.code==='Digit1'||e.code==='Numpad1'){finCoup('coup');e.preventDefault()}else if(e.code==='Digit2'||e.code==='Numpad2'){finCoup('grace');e.preventDefault()}return}if(G.ph==='res'){if(e.key==='Enter'||e.key===' '||e.key==='Escape'){e.preventDefault();quit()}else if(e.key.toLowerCase()==='r'){quit(true);ouvrir(mk,lk,fin)}return}const k=km(e);if(k){K[k]=1;e.preventDefault()}if(e.key==='Escape')quit()},ku=e=>{const k=km(e);if(k&&!'pjsu'.includes(k))K[k]=0};addEventListener('keydown',kd);addEventListener('keyup',ku);
  setInterval(()=>{if(!A||stop)return;el.querySelectorAll('.gpad button[data-k=s],.gpad button[data-k=u]').forEach(bt=>{const sp=bt.dataset.k==='s'?A0.sp:A0.sp2,r=A.cds[sp]||0,tot=CD[sp]||3;bt.style.background=r>0?'linear-gradient(to top,rgba(200,160,96,.35) '+Math.round(100*(1-r/tot))+'%,rgba(0,0,0,.35) 0)':'';bt.style.opacity=r>0?.6:1})},150);
  el.querySelectorAll('.gpad button').forEach(b=>{const k=b.dataset.k;b.onpointerdown=e=>{e.preventDefault();K[k]=1};b.onpointerup=b.onpointerleave=()=>{if(!'pjsu'.includes(k))K[k]=0}});
  const SOL=()=>H*.78;
  const mkF=(f,xx,s)=>({f,x:xx,y:0,vy:0,s,pv:f.pv+(f===A0?POT:0),cd:0,act:null,at:0,garde:false,stun:0,cds:{},touche:0,aveugle:0,poison:0});
  const G={r:1,ga:0,gb:0,t:60,fini:false,ok:false,proj:[],chiens:[],msg:''};window.__duel=G;
  let A,B;function round(){A=mkF(A0,W*.3,1);B=mkF(B0,W*.7,-1);G.A=A;G.B=B;G.t=60;G.proj=[];G.chiens=[];dire('Manche '+G.r+' · combattez !'+(typeof BAG175!=='undefined'?'<br><i style="font-size:.8em">« '+BAG175.prov[(G.r*3+Math.floor(Date.now()/1024))%BAG175.prov.length]+' »</i>':''),2200)}
  function dire(h,d){const t=el.querySelector('#duT');t.innerHTML=h;t.classList.add('on');clearTimeout(dire.h);dire.h=setTimeout(()=>t.classList.remove('on'),d||2000)}
  const atk=(c,k)=>k==='p'?{d:7,po:70,dur:.25,cd:.35}:{d:c.f.arme.d,po:c.f.arme.po,dur:.38,cd:c.f.arme.d>=15?.8:.6};
  const coupe=(o,d)=>{o.pv-=d*(1-(o.f.arm||0))*(o.garde?.2:1);o.touche=.15};
  function frappe(a,b,k){if(a.cd>0||a.stun>0||a.act)return;const t=atk(a,k);a.act=k;a.at=t.dur;a.cd=t.cd;a.hit=false;a.nA=(a.nA||0)+1}
  function pouvoir(a,b,sp,nom){const moi=a===A,info=(t)=>{if(moi)dire(t,1100)};if(a.stun>0){info('Étourdi : '+nom+' impossible pour l’instant.');return}if((a.cds[sp]||0)>0){info(nom+' : encore '+Math.ceil(a.cds[sp])+' s.');return}
   const dd=Math.abs(a.x-b.x);if(sp==='peur'&&dd>=260){info(nom+' : trop loin, approchez-vous.');return}if(sp==='peur'&&b.garde){info(nom+' : '+b.f.n+' est en garde, attendez qu’il la baisse.');return}if(sp==='aveugle'&&dd>=300){info(nom+' : trop loin, approchez-vous.');return}
   if((sp==='tir')&&a.aveugle>0){dire(a.f.n+' ne voit plus rien : impossible de viser.',1000);a.cds[sp]=1;return}
   a.cds[sp]=CD[sp]||3;a.pw=.7;a.pwc=sp==='tir'?'fusil':sp==='sagaie'?'sagaie':sp==='bond'?'baton_coup':'offrande';a.nA=(a.nA||0)+1;
   if(sp==='tir'||sp==='sagaie')G.proj.push({x:a.x+a.s*40,y:SOL()-a.y-60,v:a.s*(sp==='tir'?520:380),o:a,d:sp==='tir'?14:12,k:sp});
   else if(sp==='peur'){b.stun=1.2;b.pv-=6;dire(nom+' !',900)}
   else if(sp==='aveugle'){b.aveugle=3;G.nuage={x:b.x,t:1};dire(nom+' : '+b.f.n+' est aveuglé, il devra se battre au corps à corps.',1800)}
   else if(sp==='chien'||sp==='chienM'){G.chiens.push({o:a,x:a.x,pv:22,cd:0,t:9,dir:a.s});dire(sp==='chien'?'Le chien de chasse est lâché !':'Votre chien dressé s’élance.',1200)}
   else if(sp==='plante'){const n=G.chiens.filter(c=>c.o!==a).length;G.chiens=G.chiens.filter(c=>c.o===a);if(n)dire('L’odeur de la plante endort les chiens.',1400);else{b.poison=4;dire('La plante fait tourner la tête de '+b.f.n+'.',1400)}}
   else if(sp==='coup'){frappe(a,b,'j');a.lourd=1}
   else{a.vy=620;a.x+=a.s*30;a.act='j';a.at=.5;a.hit=false;a.bond=1}}
  function phys(c,o,dt){c.cd=Math.max(0,c.cd-dt);if(c.pw>0)c.pw-=dt;for(const k in c.cds)c.cds[k]=Math.max(0,c.cds[k]-dt);c.touche=Math.max(0,c.touche-dt);if(c.stun>0)c.stun-=dt;if(c.aveugle>0)c.aveugle-=dt;if(c.poison>0){c.poison-=dt;c.pv-=2*dt}
   c.y+=c.vy*dt;c.vy-=1500*dt;if(c.y<=0){c.y=0;c.vy=0;c.bond=0}c.x=Math.max(60,Math.min(W-60,c.x));c.s=o.x>c.x?1:-1;
   if(c.act){c.at-=dt;const t=atk(c,c.act);const ch=G.chiens.find(g=>g.o===o&&Math.abs(g.x-c.x)<t.po);if(!c.hit&&ch){c.hit=true;ch.pv-=t.d}else if(!c.hit&&Math.abs(o.x-c.x)<t.po+(c.bond?30:0)&&Math.abs(o.y-c.y)<90){c.hit=true;coupe(o,t.d*(c.bond?1.6:1)*(c.lourd?1.4:1));if(c.lourd){o.stun=.6;c.lourd=0}if(!o.garde)o.x+=c.s*22}if(c.at<=0)c.act=null}}
  function joueur(dt){const a=A;if(a.stun>0){a.garde=false;return}a.garde=!!K.b&&a.y===0;const v=a.garde?0:a.f.vit*(a.poison>0?.6:1);if(K.g)a.x-=v*dt;if(K.d)a.x+=v*dt;if(K.h&&a.y===0)a.vy=560;if(K.p){frappe(a,B,'p');K.p=0}if(K.j){frappe(a,B,'j');K.j=0}if(K.s){pouvoir(a,B,a.f.sp,a.f.spn);K.s=0}if(K.u&&a.f.sp2){pouvoir(a,B,a.f.sp2,a.f.sp2n);K.u=0}}
  function ia(dt){const b=B,a=A;if(b.stun>0){b.garde=false;return}const d=Math.abs(a.x-b.x);b.garde=false;
   if((a.act||G.proj.some(p=>p.o===a&&Math.abs(p.x-b.x)<160))&&Math.random()<.06*IA*60*dt*3)b.garde=true;
   if(!b.garde){const vv=b.f.vit*(b.poison>0?.6:1);if(d>110||b.aveugle>0&&d>70)b.x+=b.s*vv*dt*(.6+.4*IA);else if(d<60)b.x-=b.s*vv*dt*.5;
    if(d<110&&Math.random()<dt*2.2*IA)frappe(b,a,Math.random()<.45?'p':'j');if(d>200&&Math.random()<dt*.5*IA)pouvoir(b,a,b.f.sp,b.f.spn);if(b.f.sp2&&Math.random()<dt*.25*IA)pouvoir(b,a,b.f.sp2,b.f.sp2n);if(Math.random()<dt*.25)b.vy=b.y===0?520:b.vy}}
  function maj(dt){if(G.fini||G.pause)return;G.t-=dt;joueur(dt);ia(dt);phys(A,B,dt);phys(B,A,dt);{const d=B.x-A.x;if(Math.abs(d)<56&&Math.abs(A.y-B.y)<70){const m=(56-Math.abs(d))/2*(Math.sign(d)||1);A.x-=m;B.x+=m}}
   G.chiens.forEach(c=>{const cib=c.o===A?B:A;c.t-=dt;c.cd-=dt;const d=cib.x-c.x;c.dir=Math.sign(d)||1;if(Math.abs(d)>34)c.x+=c.dir*300*dt;else if(c.cd<=0){c.cd=.8;coupe(cib,4)}});G.chiens=G.chiens.filter(c=>c.pv>0&&c.t>0);
   G.proj.forEach(p=>{p.x+=p.v*dt;const c=p.o===A?B:A;if(!p.mort&&Math.abs(p.x-c.x)<30&&SOL()-c.y-60>p.y-70){p.mort=1;coupe(c,p.d)}});G.proj=G.proj.filter(p=>!p.mort&&p.x>0&&p.x<W);if(G.nuage)G.nuage.t-=dt*.5;
   if(A.pv<=0||B.pv<=0||G.t<=0){const ga=B.pv<=0||(G.t<=0&&A.pv/A.f.pv>=B.pv/B.f.pv);if(ga)G.ga++;else G.gb++;if(G.ga>=2||G.gb>=2){G.fini=true;G.ok=G.ga>=2;G.ph='ko';G.pt=0;G.L=G.ok?B:A;G.Wn=G.ok?A:B;G.L.ko=1;G.L.act=null;G.Wn.act=null;G.proj=[];G.chiens=[];G.shake=.5;const t=el.querySelector('#duT');t.classList.remove('on')}else{G.koR=1.1;G.koL=B.pv<=0?B:A.pv<=0?A:null;G.r++;round()}}}
  function perso(c){if(c.rot||c.yF){const r=c.rot||0;x.save();x.translate(c.x,SOL()-(c.yF||0)-(r?14*Math.abs(Math.sin(r)):0));x.rotate(r);x.translate(-c.x,-SOL());const y0=c.yF;c.yF=0;const r0=c.rot;c.rot=0;c.couche=1;perso(c);c.couche=0;c.rot=r0;c.yF=y0;x.restore();return}const X=c.x-(c.touche>0?c.s*6:0),Y=SOL()-c.y,s=c.s,ap=LOOK[c.f.k]||{peau:'#7a5236',haut:c.f.col,bas:'#5a4030'},fl=false,tch=c.touche>0;
   // mouvement : on mesure le déplacement pour animer la marche
   const dx=X-(c.px==null?X:c.px);c.px=X;c.ph=(c.ph||0)+Math.abs(dx)*.06;const marche=Math.abs(dx)>.4&&c.y===0;
   const t=performance.now()/1000,resp=Math.sin(t*3+(s>0?0:1.5))*1.5;
   const cr=c.garde?14:(c.y>0?6:0),hip=Y-62+cr,sh=hip-46+resp*.4,hd=sh-19;
   const lean=c.act?s*6:(c.stun>0?-s*6:0);
   if(!c.couche){x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(X,SOL()+4,34-Math.min(20,c.y*.08),8,0,0,7);x.fill();}
   const membre=(ax,ay,a1,l1,a2,l2,w,col)=>{const bx=ax+Math.sin(a1)*l1,by=ay+Math.cos(a1)*l1,cx=bx+Math.sin(a2)*l2,cy=by+Math.cos(a2)*l2;x.strokeStyle=col;x.lineWidth=w;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);x.lineTo(cx,cy);x.stroke();return [cx,cy]};
   const sombre=(h,k)=>{const n=parseInt(h.slice(1),16);const r=Math.round(((n>>16)&255)*k),g=Math.round(((n>>8)&255)*k),b=Math.round((n&255)*k);return 'rgb('+r+','+g+','+b+')'};
   const pe=fl?'#fff':ap.peau,ha=fl?'#fff':ap.haut,ba=fl?'#fff':ap.bas;
   // jambes : en marche elles se croisent, en saut elles se plient, en garde elles s'écartent
   const sw=marche?Math.sin(c.ph)*.55:0,sau=c.y>0;
   const jA=sau?[.5*s,-.9*s]:c.garde?[.35,-.1]:[sw*s+.08*s,sw*s-.05*s],jB=sau?[-.2*s,-1.1*s]:c.garde?[-.35,.1]:[-sw*s-.08*s,-sw*s+.02*s];
   const jambeCol=ap.jambeNue?pe:ba;
   membre(X-s*4+lean*.3,hip,jB[0],32,jB[1],32,11,sombre(jambeCol.startsWith('#')?jambeCol:'#ffffff',.78));
   // bras arrière
   const brasArr=c.garde?[Math.PI*.75*s,Math.PI*.95*s]:[(-.25+Math.sin(c.ph)*.3*(marche?1:0))*s,.15*s];
   membre(X-s*6+lean,sh+4,brasArr[0],25,brasArr[1],23,9,sombre(ap.manche?ha:pe.startsWith('#')?pe:'#ffffff',.78));
   // corps : un trapèze (épaules plus larges que la taille), vêtement par-dessus
   x.fillStyle=ap.torseNu?pe:ha;x.beginPath();x.moveTo(X-15+lean,sh);x.lineTo(X+15+lean,sh);x.lineTo(X+12+lean*.3,hip);x.lineTo(X-12+lean*.3,hip);x.closePath();x.fill();
   if(ap.pagne||ap.robe){x.fillStyle=fl?'#fff':(ap.pagne||ap.robe);x.beginPath();x.moveTo(X-13+lean*.3,hip-6);x.lineTo(X+13+lean*.3,hip-6);x.lineTo(X+(ap.robe?20:15),hip+(ap.robe?44:22));x.lineTo(X-(ap.robe?20:15),hip+(ap.robe?44:22));x.closePath();x.fill()}
   if(ap.echarpe&&!fl){x.strokeStyle=ap.echarpe;x.lineWidth=5;x.beginPath();x.moveTo(X-s*13+lean,sh+2);x.lineTo(X+s*11+lean*.4,hip-6);x.stroke()}
   if(c.f.arm&&!fl){x.fillStyle='rgba(20,20,30,.25)';x.fillRect(X-15+lean,sh,30,8)}
   membre(X+s*4+lean*.3,hip,jA[0],32,jA[1],32,11,jambeCol);
   // tête
   x.fillStyle=pe;x.beginPath();x.arc(X+lean,hd,14,0,7);x.fill();x.fillStyle='#1a1410';x.beginPath();x.arc(X+lean+s*6,hd-2,1.8,0,7);x.fill();
   if(!fl)LOOKT(x,c.f.k,ap,X+lean,hd,s);
   // bras avant + arme : le geste suit l'avancée du coup
   const ta=c.act?atk(c,c.act):null,pr=ta?Math.min(1,Math.max(0,1-c.at/ta.dur)):0,ext=ta?Math.sin(Math.min(1,pr*1.6)*Math.PI*.5):0;
   let a1,a2;if(c.act==='p'){a1=s*(Math.PI*.5);a2=s*(Math.PI*.5)}else if(c.act==='j'){const ar=-Math.PI*.15+ext*Math.PI*.75;a1=s*(Math.PI-ar*1.0)*(1);a1=s*(Math.PI*.95-ext*.5);a2=s*(Math.PI*.95-ext*.45)}else if(c.garde){a1=s*Math.PI*.7;a2=s*Math.PI*1.05}else{a1=s*(.35+Math.sin(c.ph+3)*.3*(marche?1:0));a2=s*.9}
   if(c.act==='p'){a1=s*Math.PI*(.5-.05*(1-ext));a2=s*Math.PI*.5}if(c.win&&!c.act){a1=s*Math.PI*.88;a2=s*Math.PI*1.02}
   const [mx,my]=membre(X+s*6+lean,sh+4,a1*(c.act==='p'?ext+.3*(1-ext):1),25,a2,23+(c.act==='p'?ext*6:0),9,ap.manche?ha:pe);
   {const L=c.f.arme.po*.5,metal=/sabre|baïonnette|dague|barre|fer|crosse/i.test(c.f.arme.n),an=c.act==='j'?s*(Math.PI*.5-.2+ext*.2):s*(Math.PI*.85);
    x.strokeStyle=fl?'#fff':metal?'#c8c8d0':'#8a6a3a';x.lineWidth=metal?3.5:5;x.beginPath();x.moveTo(mx-Math.sin(an)*8,my-Math.cos(an)*8);x.lineTo(mx+Math.sin(an)*L,my+Math.cos(an)*L);x.stroke();
    if(c.act==='j'&&ext>.6){x.strokeStyle='rgba(255,240,200,.35)';x.lineWidth=14;x.beginPath();x.arc(mx,my,L*.9,s>0?-1.2:Math.PI-.4,s>0?.4:Math.PI+1.2);x.stroke()}}
   if(tch){x.fillStyle='#ffe9a0';x.save();x.translate(X+s*14,sh+14);for(let i=0;i<8;i++){x.rotate(Math.PI/4);x.fillRect(0,-1.5,16+Math.random()*10,3)}x.restore()}
   if(c.stun>0){x.fillStyle='#ffe080';x.font='18px system-ui';x.fillText('✦ ✦',X-16,hd-30)}if(c.aveugle>0){x.fillStyle='rgba(200,200,200,.7)';x.fillRect(X-16+lean,hd-4,32,8)}if(c.poison>0){x.fillStyle='#7c6';x.fillText('~',X+18,hd-12)}}
  function dessin(){x=xb;hx.clearRect(0,0,W,H);if(typeof fondDuel184==='function')fondDuel184(x,W,H,SOL(),lk,performance.now()/1000);else{x.fillStyle='#2a3a4a';x.fillRect(0,0,W,H)}
   if(D3.ok){[A,B].forEach(c=>{if(G.fini&&c===G.L&&!c.fuite&&!G.frap){x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(c.x-c.s*40,SOL()+4,70,9,0,0,7);x.fill()}else{x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(c.x,SOL()+4,34-Math.min(20,c.y*.08),8,0,0,7);x.fill()}});x=hx;[A,B].forEach(c=>{if(c.touche>0){x.fillStyle='#ffe9a0';x.save();x.translate(c.x+c.s*14,SOL()-c.y-105);for(let i=0;i<8;i++){x.rotate(Math.PI/4);x.fillRect(0,-1.5,16+Math.random()*10,3)}x.restore()}if(c.stun>0){x.fillStyle='#ffe080';x.font='18px system-ui';x.fillText('✦ ✦',c.x-16,SOL()-c.y-185)}})}else{perso(A);perso(B)}G.chiens.forEach(c=>{const Y=SOL();x.fillStyle=c.o===A?'#6a5030':'#4a3a2a';x.fillRect(c.x-16,Y-22,32,14);x.beginPath();x.arc(c.x+c.dir*18,Y-24,8,0,7);x.fill();x.fillRect(c.x-14,Y-8,4,8);x.fillRect(c.x+10,Y-8,4,8)});
   G.proj.forEach(p=>{x.strokeStyle=p.k==='tir'?'#ffe080':'#c8a060';x.lineWidth=p.k==='tir'?3:5;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(p.x-Math.sign(p.v)*(p.k==='tir'?20:46),p.y);x.stroke()});
   if(G.nuage&&G.nuage.t>0){x.fillStyle='rgba(220,220,210,'+G.nuage.t*.6+')';x.beginPath();x.arc(G.nuage.x,SOL()-110,90*(1.4-G.nuage.t),0,7);x.fill()}
   if(A.aveugle>0){x.fillStyle='rgba(230,230,220,'+Math.min(.75,A.aveugle/3)+')';x.fillRect(0,0,W,H)}
   const bar=(c,X,al)=>{x.fillStyle='#300';x.fillRect(X,70,W*.38,14);x.fillStyle=c===A?'#7c6':'#d55';const w=W*.38*Math.max(0,c.pv/c.f.pv);x.fillRect(al?X+W*.38-w:X,70,w,14);x.fillStyle='#fff';x.font='14px system-ui';x.textAlign=al?'right':'left';x.fillText(c.f.n+' '+'●'.repeat(c===A?G.ga:G.gb),al?X+W*.38:X,62)};bar(A,W*.04,false);bar(B,W*.58,true);
   x.fillStyle='#fff';x.font='bold 28px system-ui';x.textAlign='center';x.fillText(Math.max(0,Math.ceil(G.t)),W/2,84);x.textAlign='left'}
  // ===== fin du duel : K.O. au ralenti, puis le vainqueur choisit (coup final ou grâce), puis l'écran de victoire =====
  const COUPF={dimitile:'La sagaie du Grand Bénard',heva:'Le cri d’Héva',cimendef:'La chute du rempart',gardien:'Le bond d’Hanuman'};
  function finCoup(k){if(G.ph!=='choix')return;const ov=el.querySelector('#duC');if(ov)ov.remove();G.ph=k;G.pt=0;const L=G.L,Wn=G.Wn;
   if(k==='coup'){Wn.act='j';Wn.at=.5;Wn.hit=true;Wn.vy=520;Wn.bond=1;G.titre=COUPF[A0.k]||'Coup final'}else{L.rot=0;L.ko=0;L.fuite=1;G.titre='Grâce'}}
  function resultat(){G.ph='res';G.Wn.win=1;const ok=G.ok,d=document.createElement('div');d.id='duV';
   const sous=ok?(G.fin==='grace'?B0.n+' s’enfuit dans les fourrés. On racontera votre clémence au camp.':B0.n+' ne se relèvera pas de sitôt. Votre nom courra dans les Hauts.'):A0.n+' tombe. '+B0.n+' l’emporte cette fois.';
   d.innerHTML='<div class="vt '+(ok?'v':'d')+'">'+(ok?'VICTOIRE':'DÉFAITE')+'</div><div class="vs">'+(ok?A0.n:B0.n)+' · '+G.ga+' manche'+(G.ga>1?'s':'')+' à '+G.gb+'</div><p>'+sous+'</p><div><button class="bt" id="duF">Terminer <small>Entrée</small></button> <button class="bt sec" id="duR">'+(ok?'Rejouer':'Revanche')+' <small>R</small></button></div>';
   el.appendChild(d);d.querySelector('#duF').onclick=()=>quit();d.querySelector('#duR').onclick=()=>{quit(true);ouvrir(mk,lk,fin)}}
  function finMaj(dt){G.pt+=dt;const L=G.L,Wn=G.Wn;G.shake=Math.max(0,(G.shake||0)-dt);
   L.rot=L.fuite?0:Math.max(-Math.PI/2,Math.min(Math.PI/2,(L.rot||0)+(-L.s*Math.PI/2-(L.rot||0))*Math.min(1,dt*6)));
   Wn.y+=Wn.vy*dt;Wn.vy-=1500*dt;if(Wn.y<=0){Wn.y=0;Wn.vy=0;Wn.bond=0}
   if(G.ph==='ko'&&G.pt>.6){if(G.ok){G.ph='choix';G.pt=0;const c=document.createElement('div');c.id='duC';c.innerHTML='<div class="vt v" style="font-size:42px">'+B0.n+' est à terre</div><div><button class="bt" data-f="coup">Coup final <small>1</small></button> <button class="bt sec" data-f="grace">Épargner <small>2</small></button></div>';el.appendChild(c);c.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>finCoup(b.dataset.f))}else{G.ph='attente';G.pt=0}}
   else if(G.ph==='choix'&&G.pt>6)finCoup('grace');
   else if(G.ph==='coup'){if(Wn.act){Wn.at-=dt;if(Wn.at<=0)Wn.act=null}const d=L.x-Wn.x;if(Math.abs(d)>70)Wn.x+=Math.sign(d)*900*dt;else if(!G.frap){G.frap=1;G.flash=.35;G.shake=.6;L.vx=Wn.s*1100;L.vyF=700}
    if(G.frap){L.x+=(L.vx||0)*dt;L.yF=(L.yF||0)+(L.vyF||0)*dt;L.vyF-=1800*dt;if(L.yF<0){L.yF=0;L.vyF=-L.vyF*.35;L.vx*=.5}L.rot+=dt*8*Math.sign(L.vx||1)}
    if(G.pt>2.6){G.fin='coup';resultat()}}
   else if(G.ph==='grace'){if(G.pt>.6){L.s=L.x<Wn.x?-1:1;L.x+=L.s*260*dt;L.fuitePh=(L.fuitePh||0)+dt*12}if(G.pt>2.6){G.fin='grace';resultat()}}
   else if(G.ph==='attente'&&G.pt>1.2){resultat()}
   if(G.flash)G.flash=Math.max(0,G.flash-dt)}
  function finDessin(){if(G.ph==='ko'){const k=Math.min(1,G.pt*3);x.save();x.globalAlpha=k;x.font='900 '+Math.round(Math.min(W,H)*.2)+'px Georgia,serif';x.textAlign='center';x.lineWidth=10;x.strokeStyle='#2a0a04';x.strokeText('K.O.',W/2,H*.42);x.fillStyle='#ffcf4a';x.fillText('K.O.',W/2,H*.42);x.restore()}
   if((G.ph==='coup'||G.ph==='grace')&&G.titre){x.save();x.globalAlpha=Math.min(1,G.pt*2);x.font='italic 700 '+Math.round(Math.min(W,H)*.075)+'px Georgia,serif';x.textAlign='center';x.lineWidth=7;x.strokeStyle='#1a0a04';x.strokeText(G.titre,W/2,H*.3);x.fillStyle='#f3e9d0';x.fillText(G.titre,W/2,H*.3);x.restore()}
   if(G.flash>0){x.fillStyle='rgba(255,240,200,'+G.flash*2+')';x.fillRect(0,0,W,H)}}
  let stop=false,t0=performance.now();function boucle(t){if(stop)return;let dt=Math.min(.4,(t-t0)/1000);t0=t;if(G.fini){finMaj(G.ph==='ko'?dt*.35:dt)}else for(let r=dt;r>1e-4;r-=.03)maj(Math.min(.03,r));if(G.koR>0)G.koR-=dt;const sh=G.shake>0?G.shake*14:0;el.style.transform=sh?'translate('+((Math.random()-.5)*sh).toFixed(1)+'px,'+((Math.random()-.5)*sh).toFixed(1)+'px)':'';dessin();try{d3Dessin(G.fini&&G.ph==='ko'?dt*.35:dt)}catch(e){D3.ok=0}if(G.koR>0&&G.koL){x.save();x.globalAlpha=Math.min(1,G.koR*2);x.font='900 '+Math.round(Math.min(W,H)*.12)+'px Georgia,serif';x.textAlign='center';x.lineWidth=8;x.strokeStyle='#2a0a04';x.strokeText('K.O.',W/2,H*.4);x.fillStyle='#ffcf4a';x.fillText('K.O.',W/2,H*.4);x.restore()}if(G.fini)finDessin();requestAnimationFrame(boucle)}
  function quit(silent){if(stop)return;stop=true;try{if(D3.R){D3.R.dispose();D3.R.forceContextLoss()}}catch(e){}window.BTUON=0;removeEventListener('keydown',kd);removeEventListener('keyup',ku);removeEventListener('resize',taille);el.remove();if(rm)rm.style.visibility='';if(fin&&!silent)fin({ok:G.ok,rounds:G.ga})}
  el.querySelector('#duQ').onclick=()=>quit();round();requestAnimationFrame(boucle);return {quit,G,get A(){return A},get B(){return B}}}
 return {ouvrir,F,MARRONS,ADV}})();
window.ouvrirDuel=DUE.ouvrir;
