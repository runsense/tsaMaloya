
// ===== p124 : en Vie, l'histoire passe en arrière-plan =====
// Elle avance et change le jeu, mais ne prend jamais l'écran : pas de plan de caméra, pas d'interlude filmé,
// pas de film de fondation. Une ligne au journal, et un bandeau discret pour les grandes étapes.
const vie124=()=>typeof vie115==='function'&&vie115();
{const f=interlude;interlude=function(I,done){if(!vie124())return f.apply(this,arguments);try{journal((I.date||I.y||'')+' · '+(I.une||'')+(I.texte?' — '+I.texte.slice(0,160)+(I.texte.length>160?'…':''):''))}catch(e){}try{if(done)done()}catch(e){}}}
{const f=cineJouer;cineJouer=function(shots,done){if(!vie124())return f.apply(this,arguments);try{if(done)done()}catch(e){}}}
{const f=conteVoir;conteVoir=function(){if(vie124()&&!window.choixExp&&!window.choixDest)return;if(vie124()&&(window.choixExp||window.choixDest)){try{if(lieu)fermerLieu(true)}catch(e){}const r=f.apply(this,arguments);try{if(camGo){camGo.p=.5;camGo.d=Math.max(camGo.d||9,8)}}catch(e){}return r}return f.apply(this,arguments)}}
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
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(typeof VIE!=='undefined'&&typeof BETES!=='undefined'){if(VIE.vTangue&&BETES.tangue)VIE.vTangue.visible=false;if(VIE.vCabri&&BETES.cabri)VIE.vCabri.visible=false}}catch(e){}try{if(typeof chas!=='undefined'&&chas&&chas.visible){try{for(let i=0;i<chas.count;i++)mfDepuis(chas,i,'d'+i,'milicien','milicien')}catch(e){}chas.visible=false}if(typeof GRPI!=='undefined'&&GRPI)GRPI.visible=false;if(typeof GRPR!=='undefined'&&GRPR&&S&&S.grp)GRPR.visible=(S.grp||[]).some(g=>g.exp)}catch(e){}return r}}
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
 const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(typeof scene==='undefined'||!scene||typeof DEM==='undefined'||!DEM||(typeof K!=='undefined'&&K))return r;if(!MA.g)mauriceBati();if(MA.vieux)MA.vieux.visible=true;MA.g.visible=false;return r;
  const loin=Math.max(0,Math.min(1,(dist-30)/12)),clair=Math.max(0,1-(typeof stormV!=='undefined'?stormV:0)*2),nuit=S&&S.heure!=null&&(S.heure<6||S.heure>19);
  MA.g.userData.mat.opacity=.85*loin*clair;MA.g.userData.lum.opacity=nuit?.7*loin*clair:0;MA.g.visible=loin*clair>.01}catch(e){}return r}}
// le texte du conte (« Le conte · … ») : centré, juste au-dessus des boutons du bas, jamais dessus
setInterval(()=>{try{const x=$('tuto');if(!x||x.hidden)return;const L=[...document.querySelectorAll('.tab,#bb button,#auto')].filter(e=>e.offsetParent!==null||getComputedStyle(e).position==='fixed').map(e=>e.getBoundingClientRect()).filter(r=>r.width&&r.top>innerHeight*.5);const top=L.length?Math.min(...L.map(r=>r.top)):innerHeight-70;
 x.style.left='50%';x.style.transform='translateX(-50%)';x.style.bottom=Math.round(innerHeight-top+12)+'px';x.style.zIndex=62;x.style.textAlign='center'}catch(e){}},250);
// chez les colons, les femmes ne vont pas à la chasse (elles restent proposées pour la cueillette, l'eau, l'exploration)
const chasseC124=()=>S&&S.voieC&&window.EXPS&&EXPS.but==='chasse';
{const el=expLibres;expLibres=function(c){const L=el.apply(this,arguments);try{if(chasseC124())return L.filter(p=>p.g!=='f')}catch(e){}return L}}
{const sr=sortieRaison;sortieRaison=function(p){try{if(chasseC124()&&p.g==='f')return 'chez les colons, les femmes ne vont pas à la chasse'}catch(e){}return sr.apply(this,arguments)}}
{const ep=expPlan;expPlan=function(c,pre){const r=ep.apply(this,arguments);try{if(!chasseC124())return r;const box=$('expP');if(!box)return r;box.querySelectorAll('input[data-ef]').forEach(i=>{const p=ppId(+i.dataset.ef);if(p&&p.g==='f'){i.checked=false;i.disabled=true;delete EXPS.coche[p.id]}});
 const ok=$('expOk');if(ok&&!ok.dataset.f124){ok.dataset.f124=1;const f=ok.onclick;ok.onclick=function(){try{if(chasseC124())Object.keys(EXPS.coche).forEach(id=>{const p=ppId(+id);if(p&&p.g==='f')delete EXPS.coche[id]})}catch(e){}return f&&f.apply(this,arguments)}}}catch(e){}return r}}
// plusieurs décès d'un coup : une seule fiche qui les nomme tous (au lieu d'une lettre par mort)
{const ld=lettreDeces;const B124={L:[],t:null};lettreDeces=function(titre,txt,dem,st){B124.L.push([titre,txt,dem,st]);clearTimeout(B124.t);B124.t=setTimeout(()=>{const L=B124.L.splice(0);if(!L.length)return;if(L.length===1)return ld.apply(this,L[0]);
 const lignes=L.map(([t,x])=>'<b>'+t+'</b>'+(x?' — '+String(x).split('. ')[0].replace(/\.$/,'')+'.':'')).join('<br>');ld.call(this,L.length+' morts en peu de temps',lignes,L.some(l=>l[2]),L[0][3])},2500)}}
// Survie : au survol d'une jauge (vivres, bois, pierre), dans combien de temps elle sera pleine, ou vide, ou si elle déborde déjà faute de place
{const kj=kJauges;kJauges=function(){const r=kj.apply(this,arguments);try{const d=$('kons'),h=d&&d.querySelector('header');if(!h||!K)return r;const B=kBilan(),R=K.res;
 const dur=m=>m<1?'moins d’un mois':m<12?Math.round(m)+' mois':(Math.round(m/12*10)/10+' an'+(m>=24?'s':''));
 [['Vivres','viv'],['Bois','bois'],['Pierre','pierre']].forEach(([n,k])=>{const s=[...h.querySelectorAll(':scope > span')].find(x=>(x.querySelector('small')||{}).textContent===n);if(!s)return;const c=kCap(k),v=R[k]||0,b=B[k]||0;let m;
  if(v>=c-.5)m=b>0?'PLEIN : ce qui rentre en plus se perd. Il manque de la place (un magasin, un grenier ou des maisons gardent plus).':'Plein pour l’instant ; la réserve va baisser ('+Math.round(b*10)/10+' par an).';
  else if(b>0)m='Pleine dans '+dur((c-v)/b*12)+' au rythme actuel (+'+Math.round(b*10)/10+' par an).';else if(b<0)m='Vide dans '+dur(v/(-b)*12)+' si rien ne change ('+Math.round(b*10)/10+' par an).'+(k==='viv'?' Il faut plus de champs, de chasse ou de pêche.':'');else m='Stable : rien ne rentre, rien ne sort.';
  s.title=n+' : '+Math.round(v)+' / '+c+'\n'+m+(k==='viv'?'\nOn en mange '+Math.round(B.mange*10)/10+' par an.':'')})}catch(e){}return r}}
// Survie : en zoomant, la caméra s'incline pour montrer le relief (de loin, vue plus plongeante)
{let dl=null,jusqu=0;setInterval(()=>{try{if(typeof KV3==='undefined'||!KV3||!K||K.vue!=='ville')return;const d=KV3.dist;if(dl!=null&&Math.abs(d-dl)>.01)jusqu=performance.now()+700;dl=d;if(performance.now()>jusqu)return;
 const cible=Math.max(.8,Math.min(1.22,1.22-(d-4)*.026));KV3.pol+=(cible-KV3.pol)*.25}catch(e){}},50)}
// le menu du clic droit sur un lieu : plus de doublons (« Envoyer une expédition » quand Chasser/Cueillir/Explorer sont là ; un seul « Incarner »)
{const mc=menuCtx;menuCtx=function(x,y,titre,L){try{if(Array.isArray(L)){const n=l=>String(l[0]||'');const aAct=L.some(l=>/Chasser ici|Cueillir ici|Explorer/.test(n(l)));if(aAct)L=L.filter(l=>!/^Envoyer une expédition ici/.test(n(l)));
 if(L.filter(l=>/Incarner/.test(n(l))).length>1)L=L.filter(l=>!/Incarner le chef/.test(n(l)))}}catch(e){}return mc.call(this,x,y,titre,L)}}
// préparer une sortie depuis un lieu : quelqu'un de libre et qui convient est déjà coché ; « Partir » reste gris tant que personne n'est coché
{const st=document.createElement('style');st.textContent='#expOk[disabled]{opacity:.45!important;background:#4a4238!important;border-color:#6a5e50!important;color:#cfc4b0!important;cursor:not-allowed}';document.head.appendChild(st)}
{let dedans=0;const ep=expPlan;expPlan=function(c,pre){const r=ep.apply(this,arguments);try{if(dedans)return r;const E=window.EXPS;if(!E||Object.values(E.coche||{}).some(Boolean))return r;const L=expLibres(c);if(!L.length)return r;
 const veut={chasse:'cha',cueil:'cue'}[E.but];const p=(veut&&L.find(q=>q.role===veut))||L.slice().sort((a,b)=>(a.fat||0)-(b.fat||0))[0];if(!p)return r;E.coche[p.id]=1;dedans=1;try{expPlan(c)}finally{dedans=0}}catch(e){}return r}}
// « Incarner le chef » seulement sur la case du camp ; « Incarner » (un membre) seulement là où un groupe est dehors
{const mc=menuCtx;menuCtx=function(x,y,titre,L){try{if(Array.isArray(L)&&typeof sel!=='undefined'&&sel&&S){const t=sel,o=S.t[t.i]||{},camp=o.b==='camp',grp=(S.grp||[]).some(g=>g.exp&&g.pos===t.i);const n=l=>String(l[0]||'');
 L=L.filter(l=>{if(/Incarner le chef/.test(n(l)))return camp;if(/Incarner/.test(n(l)))return grp;return true})}}catch(e){}return mc.call(this,x,y,titre,L)}}
setInterval(()=>{try{if(!S)return;const t=typeof sel!=='undefined'?sel:null,camp=t&&(S.t[t.i]||{}).b==='camp';document.querySelectorAll('#side button').forEach(b=>{const x=b.textContent;if(/Incarner le chef/.test(x))b.style.display=camp||!t?'':'none'})}catch(e){}},700);
// Histoire : tant que les envoyés marchent vers une case, personne n'y travaille déjà (plus de petit groupe « déjà arrivé »)
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(typeof MARCHE75==='undefined'||!MARCHE75.length||typeof MF==='undefined')return r;const D=MARCHE75.map(w=>T[w.P[w.P.length-1]]).filter(Boolean);
 for(const k in MF.L){if(!/^au\d/.test(k))continue;const f=MF.L[k];if(!f||!f.o||!f.o.visible)continue;if(D.some(t=>Math.hypot(f.o.position.x-t.x,f.o.position.z-t.z)<.9))f.o.visible=false}}catch(e){}return r}}
// Histoire : les habitants d'un lieu ne se montrent qu'en zoom proche ; vus de haut, ils ressemblaient à des chapeaux noirs posés sur les toits
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(!S||typeof MF==='undefined'||!modeHist())return r;const loin=dist>5||pol<.6;for(const k in MF.L){if(!/^L\d+_/.test(k))continue;const f=MF.L[k];if(f&&f.o&&loin)f.o.visible=false}}catch(e){}return r}}
// garde-fou : une carte d'événement restée ouverte plus de 50 s (conte arrêté, onglet ouvert…) est tranchée par le conte
{let cle=null,t0=0;setInterval(()=>{try{const m=$('modal');if(!S||!m||m.hidden||!S.evq||!S.evq.length){cle=null;return}const k=S.evq[0]+'|'+S.evq.length;if(k!==cle){cle=k;t0=performance.now();return}
 if(window.miniJeu143&&miniJeu143()){t0+=250;return}if(performance.now()-t0<50000)return;const sv=m.querySelector('.carte');if(sv&&sv.matches(':hover'))return;cle=null;const id=S.evq[0],e=EV[id];let kc=-1;try{kc=choixConte(e,id)}catch(_){}const b=(kc>=0&&$('op'+kc))||m.querySelector('.op.conte')||[...m.querySelectorAll('.op')].find(x=>!x.disabled);if(b){window.decAuto=1;try{b.click()}finally{setTimeout(()=>window.decAuto=0,50)}}}catch(e){}},2000)}
// les chasseurs de marrons qui rôdent autour du camp : de vrais miliciens animés (fini les cônes à chapeau noir)
{let L=null;const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(typeof scene==='undefined'||typeof mfPoser!=='function')return r;if(!L||!L.length)L=scene.children.filter(o=>o.isGroup&&o.userData&&o.userData.tr106);
 L.forEach((g,gi)=>{const u=g.userData;if(!u.on||!u.pos)return;const [x,y,z,a]=u.pos;for(let j=0;j<3;j++){const dx=-Math.sin(a)*j*.14,dz=Math.cos(a)*j*.14;mfPoser('tr106_'+gi+'_'+j,'milicien',x+dx,Math.max(0,alt(x+dx,z+dz))*VX+.02,z+dz,-a+Math.PI/2,'marche')}})}catch(e){}return r}}
// sur un lieu (hors camp) : Chasser / Cueillir / Explorer suffisent ; plus d'« Envoyer un groupe là », d'« Envoyer une expédition » ni de « Tous les camps »
{const mc=menuCtx;menuCtx=function(X,Y,titre,L){try{if(S&&!modeHist()&&Array.isArray(L)&&typeof pick==='function'){const pt=pick(X,Y),t=pt&&tileAt(pt);if(t&&!t.bare&&(S.t[t.i]||{}).b!=='camp')L=L.filter(l=>!/Envoyer un groupe là|Envoyer une expédition ici|^Tous les camps$/.test(String(l[0]||'')))}
 if(Array.isArray(L))L=L.map(l=>/^La carte du connu$/.test(String(l[0]))?['🗺️ Carte de ce qu’on connaît',l[1],'Toute l’île, avec ce que vos gens ont découvert et où sont les groupes dehors'].concat(l.slice(3)):l)}catch(e){}return mc.call(this,X,Y,titre,L)}}
