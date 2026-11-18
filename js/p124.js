
// ===== p124 : en Vie, l'histoire passe en arrière-plan =====
// Elle avance et change le jeu, mais ne prend jamais l'écran : pas de plan de caméra, pas d'interlude filmé,
// pas de film de fondation. Une ligne au journal, et un bandeau discret pour les grandes étapes.
const vie124=()=>typeof vie115==='function'&&vie115();
{const f=interlude;interlude=function(I,done){if(!vie124())return f.apply(this,arguments);try{journal((I.date||I.y||'')+' · '+(I.une||'')+(I.texte?' — '+I.texte.slice(0,160)+(I.texte.length>160?'…':''):''))}catch(e){}try{if(done)done()}catch(e){}}}
{const f=cineJouer;cineJouer=function(shots,done){if(!vie124())return f.apply(this,arguments);try{if(done)done()}catch(e){}}}
{const f=conteVoir;conteVoir=function(){if(vie124())return;return f.apply(this,arguments)}}
{const f=filmOut;filmOut=function(k,done){if(!vie124())return f.apply(this,arguments);try{const o=OUT[k];if(o)bandeau115('',o.n||k,'')}catch(e){}try{if(done)done()}catch(e){}}}
{const f=fond108Jouer;fond108Jouer=function(n){if(vie124()){try{journal('Fondation : '+n+'.')}catch(e){}return}return f.apply(this,arguments)}}
// en Vie, la carte se cadre sur le camp : au lancement, et au retour du camp
function cadre124(d){try{const c=camps()[0];if(!c)return;camGo=null;dist=d||10;pol=.85;let fx=0,fz=0;try{fx=camT.x-cam.position.x;fz=camT.z-cam.position.z;const L=Math.hypot(fx,fz)||1;fx/=L;fz/=L}catch(e){}camT.set(c.x+fx*dist*.14,c.alt*VX,c.z+fz*dist*.14)}catch(e){}}
{const f=cvFermer;cvFermer=function(){const was=CV.on;const r=f.apply(this,arguments);try{if(was&&vie124()&&!(typeof VP!=='undefined'&&VP))setTimeout(()=>cadre124(10),30)}catch(e){}return r}}
setInterval(()=>{try{if(!vie124()||S.cadre124||CV.on)return;S.cadre124=1;cadre124(11)}catch(e){}},1000);
// Tab ne promène plus la sélection du navigateur d'un bouton à l'autre (le cadre de focus qui clignotait une seconde)
addEventListener('keydown',e=>{if(e.key!=='Tab')return;const tg=e.target;if(tg&&(tg.tagName==='INPUT'||tg.tagName==='TEXTAREA'||tg.tagName==='SELECT'||tg.isContentEditable))return;e.preventDefault();try{const a=document.activeElement;if(a&&a!==document.body&&a.blur)a.blur()}catch(x){}},true);
{const st=document.createElement('style');st.textContent='button:focus:not(:focus-visible),.tab:focus:not(:focus-visible){outline:none}';document.head.appendChild(st)}
// vue personnage : les sources mystiques (le disque bleu-violet) se posent sur le vrai sol au lieu de flotter, avec un rebord de pierres
setInterval(()=>{try{const V=typeof VP!=='undefined'&&VP;if(!V||!V.src||!V.sc)return;const rc=new THREE.Raycaster(),bas=new THREE.Vector3(0,-1,0);
 const sols=V.sc.children.filter(o=>o.isMesh&&o.geometry&&(o.geometry.boundingSphere||(o.geometry.computeBoundingSphere(),o.geometry.boundingSphere)).radius>30);if(!sols.length)return;
 V.src.forEach(s=>{if(s.pose124)return;rc.set(new THREE.Vector3(s.x,500,s.z),bas);const h=rc.intersectObjects(sols,false)[0];if(!h)return;s.pose124=1;const y=h.point.y;s.m.position.y=y+.04;if(s.l)s.l.position.y=y+.8;
  const M=new THREE.MeshLambertMaterial({color:0x6a6258});for(let k=0;k<9;k++){const a=k/9*6.283,r=new THREE.Mesh(new THREE.DodecahedronGeometry(.16+(k%3)*.04,0),M);r.position.set(s.x+Math.cos(a)*1.15,y+.05,s.z+Math.sin(a)*1.15);r.scale.y=.6;V.sc.add(r)}})}catch(e){}},700);
// les petites figurines de groupe qui tournaient autour du camp (vieux dessin, doublon des vrais personnages animés) : retirées
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(typeof chas!=='undefined'&&chas&&chas.visible){try{for(let i=0;i<chas.count;i++)mfDepuis(chas,i,'d'+i,'milicien','milicien')}catch(e){}chas.visible=false}if(typeof GRPI!=='undefined'&&GRPI)GRPI.visible=false;if(typeof GRPR!=='undefined'&&GRPR&&S&&S.grp)GRPR.visible=(S.grp||[]).some(g=>g.exp)}catch(e){}return r}}
// ===== Maurice à l'horizon : une silhouette basse et sombre posée sur la ligne de mer, ses pics (Le Pouce, Pieter Both, la Rivière Noire, Le Morne) ; la nuit, une bande de lumières =====
{const MA={g:null,vieux:null};
 function mauriceBati(){const [mx,mz]=xz(57.57,-20.28),c0=new THREE.Vector3(32,0,30),d=new THREE.Vector3(mx-c0.x,0,mz-c0.z).normalize();
  const rc=new THREE.Raycaster(),bas=new THREE.Vector3(0,-1,0),cibles=scene.children.filter(o=>o.isMesh&&o.visible&&o.geometry&&o!==(MA.g||null));let t=60,y0=0;
  for(let u=40;u<260;u+=2){const q=c0.clone().addScaledVector(d,u);rc.set(new THREE.Vector3(q.x,200,q.z),bas);const h=rc.intersectObjects(cibles,false)[0];if(h){t=u;y0=h.point.y}}
  t-=2;y0+=.02;const P=c0.clone().addScaledVector(d,t);
  // le profil, du nord au sud (largeur ~40, hauteurs à l'échelle verticale du jeu)
  const W=Math.max(10,.35*t),H=(typeof VX!=='undefined'?VX:.0023)*Math.max(.5,t/170*3),prof=[[0,0],[.06,60],[.2,120],[.3,350],[.34,780],[.355,600],[.38,820],[.4,500],[.48,560],[.55,640],[.62,700],[.66,830],[.7,620],[.8,380],[.88,250],[.92,556],[.95,300],[1,0]];
  const sh=new THREE.Shape();sh.moveTo(-W/2,0);prof.forEach(([u,h])=>sh.lineTo(-W/2+u*W,h*H));sh.lineTo(W/2,0);
  const g=new THREE.Group(),mat=new THREE.MeshBasicMaterial({color:0x26323f,transparent:true,opacity:0,side:THREE.DoubleSide,fog:false,depthWrite:false});g.add(new THREE.Mesh(new THREE.ShapeGeometry(sh),mat));
  const lum=new THREE.Mesh(new THREE.PlaneGeometry(W*.9,.12),new THREE.MeshBasicMaterial({color:0xffd27a,transparent:true,opacity:0,side:THREE.DoubleSide,fog:false,depthWrite:false}));lum.position.y=.08;g.add(lum);
  g.position.set(P.x,y0,P.z);g.lookAt(c0.x,y0,c0.z);g.userData={mat,lum:lum.material};scene.add(g);MA.g=g;
  scene.children.forEach(o=>{if(o.isGroup&&o.children[0]&&o.children[0].geometry&&o.children[0].geometry.type==='SphereGeometry'&&o.children[0].scale.x===26)MA.vieux=o})}
 const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(typeof scene==='undefined'||!scene||typeof DEM==='undefined'||!DEM||(typeof K!=='undefined'&&K))return r;if(!MA.g)mauriceBati();if(MA.vieux)MA.vieux.visible=false;
  const loin=Math.max(0,Math.min(1,(dist-30)/12)),clair=Math.max(0,1-(typeof stormV!=='undefined'?stormV:0)*2),nuit=S&&S.heure!=null&&(S.heure<6||S.heure>19);
  MA.g.userData.mat.opacity=.85*loin*clair;MA.g.userData.lum.opacity=nuit?.7*loin*clair:0;MA.g.visible=loin*clair>.01}catch(e){}return r}}
