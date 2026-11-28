// ===== p403 : le combat naval se VOIT. Jusqu'ici ce n'était qu'un panneau de barres : on jouait chacun son tour sans voir un seul bateau.
// Les deux navires (modèles Kenney CC0 déjà chargés : ship_small pour le sloop, ship_med pour l'ennemi) sont posés au large de la côte
// sous le vent, la caméra les cadre, et chaque tour se joue à l'écran : la distance (bord à bord / portée de canon / au large), la bordée
// (fumée, boulets, gerbes d'eau), la riposte ennemie juste après, l'abordage (coques qui se touchent), le navire qui coule ou s'échappe.
// Le panneau descend en bas de l'écran, transparent, pour laisser voir la mer. =====
const NV403={on:0};
function navire403(k,taille){let o=typeof km98==='function'?km98(k,taille,true):null;if(!o&&typeof g168Navire==='function'){o=new THREE.Group();const n=g168Navire('navire');n.scale.setScalar(taille/.9);o.add(n)}return o}
function drap403(coul){const cv=document.createElement('canvas');cv.width=64;cv.height=40;const x=cv.getContext('2d');x.fillStyle=coul;x.fillRect(0,0,64,40);
 if(coul==='#111'){x.fillStyle='#eee';x.beginPath();x.arc(32,16,7,0,7);x.fill();x.fillRect(22,26,20,4)}else if(coul==='#1c3a8a'){x.fillStyle='#fff';x.fillRect(21,0,22,40);x.fillStyle='#c22';x.fillRect(43,0,21,40)}else if(coul==='#c8102e'){x.fillStyle='#fff';x.fillRect(0,15,64,10);x.fillRect(27,0,10,40);x.fillStyle='#c8102e';x.fillRect(0,17,64,6);x.fillRect(29,0,6,40);x.fillStyle='#012169';x.fillRect(0,0,24,13);x.fillRect(40,0,24,13);x.fillRect(0,27,24,13);x.fillRect(40,27,24,13)}
 else if(coul==='#f60'){x.fillStyle='#fff';x.fillRect(0,13,64,14);x.fillStyle='#1c3a8a';x.fillRect(0,27,64,13)}else if(coul==='#0a5'){x.fillStyle='#c22';x.fillRect(0,0,24,40)}
 const m=new THREE.Mesh(new THREE.PlaneGeometry(.5,.32),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cv),side:THREE.DoubleSide}));return m}
function lieu403(){let [x,z]=xz(55.18,-21.02);for(let k=0;k<80&&alt(x,z)>-8;k++)x-=.3;return [x-6,z]}
function ouvre403(){try{if(NV403.on||typeof N==='undefined'||!N||typeof scene==='undefined')return;const v=N.v||{},big=v.type==='fregate'?2.6:v.type==='negrier'?2.2:2;
 const P=navire403('ship_small',1.6),E=navire403('ship_med',big);if(!P||!E)return;const G=new THREE.Group();G.name='nav403';const [cx,cz]=lieu403();G.position.set(cx,0,cz);G.add(P,E);scene.add(G);
 const dP=drap403('#111');dP.position.set(0,1.5,0);P.add(dP);P.userData.dr=dP;const nat={francais:'#1c3a8a',anglais:'#c8102e',hollandais:'#f60',portugais:'#0a5'}[v.nat]||'#c8102e',dE=drap403(nat);dE.position.set(0,1.7,0);E.add(dE);E.userData.dr=dE;
 Object.assign(NV403,{on:1,G,P,E,big,sep:[1.25+big*.25,5,10],s:10,cam:{x:camT.x,y:camT.y,z:camT.z,d:dist,a:az,p:pol,auto:typeof auto!=='undefined'?auto:0},fx:[],nlog:N.log.length,etat:'',t0:performance.now(),coule:null});
 try{auto=false}catch(e){}document.body.classList.add('nav403');tick403()}catch(e){console.warn('nav403',e)}}
function ferme403(){if(!NV403.on)return;const c=NV403.cam;scene.remove(NV403.G);NV403.fx.forEach(f=>{try{scene.remove(f.o)}catch(e){}});NV403.on=0;document.body.classList.remove('nav403');
 try{camT.set(c.x,c.y,c.z);dist=c.d;az=c.a;pol=c.p;auto=c.auto}catch(e){}}
function puff403(x,y,z,col,taille,vy){const m=new THREE.Mesh(new THREE.SphereGeometry(.18*(taille||1),7,5),new THREE.MeshBasicMaterial({color:col||0xdddddd,transparent:true,opacity:.8,depthWrite:false}));m.position.set(x,y,z);scene.add(m);NV403.fx.push({o:m,t:0,k:'puff',vy:vy||.006,dur:1.6})}
function boulet403(de,vers,touche,retard){setTimeout(()=>{if(!NV403.on)return;const a=de.getWorldPosition(new THREE.Vector3()),b=vers.getWorldPosition(new THREE.Vector3());const sens=Math.sign(b.z-a.z)||1;
 for(let i=0;i<4;i++){const dx=(i-1.5)*.35*(NV403.big/2);puff403(a.x+dx,.45,a.z+sens*.45,0xe8e8e8,1.1);const fl=new THREE.Mesh(new THREE.SphereGeometry(.12,6,5),new THREE.MeshBasicMaterial({color:0xffb030}));fl.position.set(a.x+dx,.45,a.z+sens*.5);scene.add(fl);NV403.fx.push({o:fl,t:0,k:'flash',dur:.18});
  const o=new THREE.Mesh(new THREE.SphereGeometry(.06,6,5),new THREE.MeshBasicMaterial({color:0x111111}));o.position.copy(fl.position);scene.add(o);const cible=new THREE.Vector3(b.x+dx*.8+(touche?0:(Math.random()-.5)*1.5),touche?.45:0,b.z-sens*(touche?.35:-(1+Math.random()*1.5)));NV403.fx.push({o,t:0,k:'boulet',a:o.position.clone(),b:cible,dur:.55+i*.06,touche,cible:vers})}},retard||0)}
function tick403(){if(!NV403.on)return;requestAnimationFrame(tick403);const T=NV403,s=performance.now()/1000;if(typeof N==='undefined'||!N){ferme403();return}
 const fin=N.fin||'';const visee=T.sep[N.dist]??5;let cible=visee;if(/vous vous échappez|vous échappe/i.test(fin))cible=18;T.s+=(cible-T.s)*.025;
 T.P.position.set(0,-.02+Math.sin(s*1.1)*.03,T.s/2);T.E.position.set(.4,-.02+Math.sin(s*.9+1)*.03,-T.s/2);T.P.rotation.set(Math.sin(s*.8)*.04,N.vent?.1:-.05,Math.sin(s*.7)*.05);T.E.rotation.set(Math.sin(s*.75+1)*.04,Math.PI+(N.vent?-.05:.1),Math.sin(s*.65)*.05);
 if(T.coule){const k=Math.min(1,(performance.now()-T.coule.t)/4000),o=T.coule.o;o.position.y-=k*k*2.2;o.rotation.z+=k*.5*(o===T.P?1:-1);if(Math.random()<.2)puff403(T.G.position.x+o.position.x,.2,T.G.position.z+o.position.z,0x9aa6aa,.7,.004)}
 if(/est pris/i.test(fin)&&T.E.userData.dr)T.E.userData.dr.material.map=T.P.userData.dr.material.map;
 T.fx.forEach(f=>{f.t+=1/60;const k=Math.min(1,f.t/f.dur);if(f.k==='puff'){f.o.scale.setScalar(1+k*3);f.o.position.y+=f.vy;f.o.material.opacity=.8*(1-k)}
  if(f.k==='flash')f.o.material.opacity=1-k;
  if(f.k==='boulet'){f.o.position.lerpVectors(f.a,f.b,k);f.o.position.y+=Math.sin(k*Math.PI)*1.1;if(k>=1&&!f.ok){f.ok=1;if(f.touche){puff403(f.b.x,f.b.y+.1,f.b.z,0x6a5a48,.8);puff403(f.b.x,f.b.y+.2,f.b.z,0x333333,.6,.009)}else for(let j=0;j<3;j++)puff403(f.b.x+(Math.random()-.5)*.2,.05+j*.12,f.b.z,0xffffff,.5,.012)}}
  if(k>=1){scene.remove(f.o);f.dead=1}});T.fx=T.fx.filter(f=>!f.dead);
 // la caméra cadre les deux navires, un peu de côté, et suit leur écart
 try{camGo=null;const g=T.G.position,D0=7+T.s*1.1;dist+=(D0-dist)*.05;let da=Math.PI/2+.25-az;da=Math.atan2(Math.sin(da),Math.cos(da));az+=da*.05;pol+=(1.12-pol)*.05;camT.set(g.x+D0*.28,0,g.z)}catch(e){}}
// lire ce que le tour vient de produire et le jouer à l'écran : d'abord votre action, puis la riposte
function joue403(){const T=NV403;if(!T.on||!N)return;const L=N.log.slice(T.nlog);T.nlog=N.log.length;let r=0;
 L.forEach(m=>{if(/^Bordée/.test(m)){boulet403(T.P,T.E,true,r);r+=900}
  else if(/L’ennemi tire/.test(m)){boulet403(T.E,T.P,true,r+400);r+=1300}
  else if(/abordage est repoussé/i.test(m)){const p=T.P.position;setTimeout(()=>{for(let i=0;i<6;i++)puff403(T.G.position.x+(Math.random()-.5)*1.5,.5,T.G.position.z,0xcccccc,.5,.01)},r);r+=700}
  else if(/tourbillon/i.test(m)){for(let i=0;i<14;i++){const a=i/14*6.28;setTimeout(()=>puff403(T.G.position.x+Math.cos(a)*2.5,.1,T.G.position.z-T.s/2+Math.sin(a)*2.5,0xbfe6ee,.8,.002),i*60)}}
  else if(/chant de Suvannamaccha/i.test(m)){for(let i=0;i<10;i++)setTimeout(()=>puff403(T.G.position.x+(Math.random()-.5)*2,1+Math.random(),T.G.position.z-T.s/2,0xe0c8ff,.4,.008),i*120)}});
 const fin=N.fin||'';if(fin&&!T.vuFin){T.vuFin=1;if(/coule/i.test(fin))setTimeout(()=>{T.coule={o:T.E,t:performance.now()}},r);if(/sloop est perdu/i.test(fin))setTimeout(()=>{T.coule={o:T.P,t:performance.now()}},r);
  }}
{const o0=navOuvrir;navOuvrir=function(){const r=o0.apply(this,arguments);try{ouvre403()}catch(e){}return r}}
{const d0=navDraw;navDraw=function(){const r=d0.apply(this,arguments);try{if(typeof N==='undefined'||!N)ferme403();else{if(!NV403.on)ouvre403();joue403();
  const d=$('nav');if(d&&!d.querySelector('.lg403')){const c=d.querySelector('.carte');if(c){const l=document.createElement('div');l.className='lg403';l.innerHTML='<span>🏴 votre sloop</span><span>'+({francais:'🇫🇷',anglais:'🇬🇧',hollandais:'🇳🇱',portugais:'🇵🇹'}[N.v.nat]||'⚓')+' '+N.e.n.toLowerCase()+'</span><span class="vt403">'+(N.vent?'💨 le vent est à vous':'💨 le vent est à l’ennemi')+'</span>';c.insertBefore(l,c.children[1]||null)}}}}catch(e){}return r}}
(()=>{const st=document.createElement('style');st.textContent=
 'body.nav403 #nav{background:linear-gradient(0deg,rgba(8,12,14,.78) 0%,rgba(8,12,14,.35) 38%,transparent 60%);align-items:flex-end;pointer-events:none}'+
 'body.nav403 #nav .carte{pointer-events:auto;max-width:760px;width:100%;max-height:46vh;overflow:auto;background:rgba(18,22,24,.82);backdrop-filter:blur(3px);padding:10px 14px!important}'+
 'body.nav403 #nav h2{font-size:1.05em;margin:0 0 4px}body.nav403 #nav .nb{margin:6px 0}body.nav403 #nav .acts{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px}body.nav403 #nav .act small{display:none}'+
 'body.nav403 #top,body.nav403 #side,body.nav403 #bas{visibility:hidden}.lg403{display:flex;gap:14px;flex-wrap:wrap;font-size:.85em;opacity:.85;margin:2px 0 4px}';document.head.appendChild(st)})();
(()=>{const st=document.createElement('style');st.textContent='#cmd canvas.fp503{inset:0 auto auto 0;z-index:1}#cmd canvas.mini503{inset:58px 12px auto auto;width:180px;z-index:2;border:1px solid rgba(226,189,116,.5);border-radius:4px;opacity:.9}#cmd .bh,#cmd .bp{z-index:3}';document.head.appendChild(st)})();
try{Object.assign(window.TR363=window.TR363||{},{'Espace : le talent — maintenez pour charger la jauge (distance de la pierre, force du coup), lâchez pour lancer ou frapper':'Space: the talent — hold to charge the gauge (stone distance, strike power), release to throw or strike','ZQSD / WASD ou flèches : marcher (le pavé numérique ne sert qu’à choisir le personnage)':'WASD / ZQSD or arrows: walk (the numeric keypad only selects the character)','V : la vue du personnage, avec ses yeux (Z avance, Q/D tournent, glisser la souris pour regarder)':'V: the character’s own view, through their eyes (forward key advances, left/right turn, drag the mouse to look)','👁 Vue du personnage [V]':'👁 Character view [V]','🗺 Vue de dessus [V]':'🗺 Top view [V]','Coup trop faible : le garde chancelle et se retourne !':'Strike too weak: the guard staggers and turns around!','Coup parfait : le garde tombe sans un bruit.':'Perfect strike: the guard falls without a sound.','Le garde s’affaisse sans un cri.':'The guard slumps without a cry.','Le coup frappe dans le vide : approchez-vous d’un garde, face à lui… mais dans son dos.':'The strike hits nothing: get close to a guard, facing him… from behind.','Lancer trop mou : la pierre tombe tout près.':'Throw too soft: the stone lands close by.'})}catch(e){}
