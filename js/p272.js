// ===== p272 : le songe du curé — un parcours en images, sans guerre ni machine.
// Un curé de l'île, dans les années 1840, ami des esclaves comme quelques prêtres de son temps, s'endort après la messe du soir.
// Il rêve de l'île à venir, et la voit avec ses yeux à lui, ceux de sa foi : un chemin de lumière dans la nuit, et le long du chemin,
// des tableaux qui s'allument quand il s'approche (les stations de son rêve). Devant chacun, il réagit selon son cœur.
// Au réveil, ce qu'il a ressenti décide de ce qu'il dira en chaire le dimanche suivant.
// Les faits montrés dans les tableaux sont réels (20 décembre, Vierge noire, Salette de Saint-Leu, Filles de Marie, mosquée de 1905…) ;
// le regard du curé et ses réactions sont imaginés. =====
const SC272=[
 {t:'Les chaînes tombées',an:'le 20 décembre',
  b:'Il voit une foule dans les rues, des tambours, des kayambs, des femmes qui dansent. Personne n’appartient plus à personne. On fête le jour où l’esclavage a pris fin dans l’île, et l’on chante les ancêtres.',
  o:[['Rendre grâce : « Ils sont tous enfants de Dieu, je l’ai toujours dit »','g'],['S’inquiéter de ces tambours qu’il croyait païens','d'],['Pleurer de n’avoir pas vu ce jour','p']],
  peint:'chaines'},
 {t:'La Vierge noire',an:'Sainte-Marie',
  b:'Une grotte au-dessus de la Rivière des Pluies, une statue, des milliers de bougies. On lui raconte Mario, l’esclave en fuite caché là, que la Vierge protégea en faisant pousser un bougainvillier devant l’entrée. Les pèlerins ont tous les visages de l’île.',
  o:[['S’agenouiller avec eux','g'],['Se demander si l’Église a bien fait de laisser la légende d’un marron','d'],['Allumer une bougie pour Mario','p']],
  peint:'vierge'},
 {t:'La Salette de Saint-Leu',an:'chaque 19 septembre',
  b:'Une chapelle blanche au-dessus de Saint-Leu, bâtie en 1859 quand une épidémie ravageait l’île : la ville fut épargnée. Depuis, chaque 19 septembre, les pèlerins montent la remercier.',
  o:[['Promettre une chapelle à sa paroisse, lui aussi','g'],['Penser à ceux que l’épidémie n’a pas épargnés','p'],['Douter : la foi n’est-elle que la peur des maladies ?','d']],
  peint:'salette'},
 {t:'Les sœurs des libérées',an:'1849',
  b:'Des religieuses, filles d’anciennes esclaves pour beaucoup, soignent, enseignent, recueillent. La congrégation des Filles de Marie est née à Saint-Denis en 1849, l’année qui suit l’abolition, pour les femmes libérées.',
  o:[['Bénir leur œuvre','g'],['S’étonner : des religieuses noires, dans les couvents ?','d'],['Penser aux femmes qu’il a vues vendues','p']],
  peint:'soeurs'},
 {t:'L’école de tous',an:'aujourd’hui',
  b:'Une classe : des enfants de toutes les couleurs, côte à côte, qui lisent. Ils parlent français au maître et créole dans la cour. Aucun n’est là parce qu’un maître l’a permis.',
  o:[['« Voilà le vrai catéchisme »','g'],['Regretter qu’on n’y enseigne plus la prière','d'],['Se souvenir des enfants qu’on lui interdisait d’instruire','p']],
  peint:'ecole'},
 {t:'L’église, le temple, la mosquée',an:'aujourd’hui',
  b:'Dans une même rue de Saint-Denis : la cathédrale, un temple tamoul couvert de dieux peints, une mosquée bâtie en 1905, une pagode chinoise. Les fidèles se croisent, se saluent, partagent parfois les fêtes.',
  o:[['Y voir la paix que Dieu veut','g'],['S’effrayer : son Église n’est plus seule','d'],['Prier pour que chacun trouve son chemin','p']],
  peint:'temples'},
 {t:'Les petites chapelles des chemins',an:'aujourd’hui',
  b:'Les églises sont moins pleines qu’en son temps. Mais au bord des champs et des routes, il voit partout de petits oratoires chaulés : une Vierge, saint Expédit en rouge, des fleurs, une bougie qu’une main anonyme a allumée.',
  o:[['Sourire : la foi a quitté les murs, pas les cœurs','g'],['S’inquiéter des saints que l’Église ne connaît pas','d'],['Allumer la bougie à son tour','p']],
  peint:'oratoire'}];
function songeCure272(fin){window.BTUON=1;window.FILM=1;let fini=false;
 const d=document.createElement('div');d.id='songe272';d.style.cssText='position:fixed;inset:0;z-index:96;background:#05060c;user-select:none;overflow:hidden';document.body.appendChild(d);
 const cv=document.createElement('canvas');cv.style.cssText='width:100%;height:100%;display:block';d.appendChild(cv);
 const hud=document.createElement('div');hud.style.cssText='position:absolute;left:0;right:0;top:12px;text-align:center;color:#f2ead6;font:600 14px Montserrat,system-ui;letter-spacing:.06em;text-shadow:0 2px 4px #000;pointer-events:none';d.appendChild(hud);
 const aide=document.createElement('div');aide.style.cssText='position:absolute;left:0;right:0;bottom:14px;text-align:center;color:#d8cdb4;font:13px system-ui;opacity:.85;pointer-events:none';aide.textContent='↑ / Z : avancer · ↓ / S : reculer · ← → : regarder · Échap : se réveiller';d.appendChild(aide);
 const R=new THREE.WebGLRenderer({canvas:cv,antialias:true});R.outputEncoding=THREE.sRGBEncoding;const sc=new THREE.Scene();sc.background=new THREE.Color(0x070915);sc.fog=new THREE.FogExp2(0x0b0e1c,.022);
 const cam=new THREE.PerspectiveCamera(62,1,.1,300);sc.add(new THREE.HemisphereLight(0x8090c0,0x10101a,.55));
 // le ciel : des étoiles
 {const g=new THREE.BufferGeometry(),P=[];for(let k=0;k<1400;k++){const a=Math.random()*6.283,b=Math.random()*1.3,r=140;P.push(Math.cos(a)*Math.cos(b)*r,Math.sin(b)*r+5,Math.sin(a)*Math.cos(b)*r)}g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));sc.add(new THREE.Points(g,new THREE.PointsMaterial({color:0xfff6e0,size:.6,sizeAttenuation:true,fog:false})))}
 // le chemin de lumière : une courbe douce
 const N=SC272.length,L=N*22+20;const pts=[];for(let k=0;k<=40;k++){const z=-k*L/40;pts.push(new THREE.Vector3(Math.sin(k*.55)*7+Math.sin(k*.21)*4,Math.sin(k*.3)*1.2,z))}
 const crb=new THREE.CatmullRomCurve3(pts);
 {const tg=new THREE.TubeGeometry(crb,400,.9,8,false);const m=new THREE.Mesh(tg,new THREE.MeshBasicMaterial({color:0xffcf7a,transparent:true,opacity:.3}));m.scale.y=.08;m.position.y=-.05;sc.add(m);
  const g=new THREE.BufferGeometry(),P=[];for(let k=0;k<900;k++){const u=k/900,p=crb.getPointAt(u);P.push(p.x+(Math.random()-.5)*2.2,p.y+Math.random()*.15,p.z+(Math.random()-.5)*1.2)}g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));sc.add(new THREE.Points(g,new THREE.PointsMaterial({color:0xffe3a0,size:.12,transparent:true,opacity:.9})))}
 // des silhouettes d'arbres et de mornes, très sombres, au loin
 for(let k=0;k<70;k++){const u=Math.random(),p=crb.getPointAt(u),s=(Math.random()<.5?-1:1)*(9+Math.random()*25);const h=3+Math.random()*9;const m=new THREE.Mesh(new THREE.ConeGeometry(1.5+Math.random()*3,h,6),new THREE.MeshLambertMaterial({color:0x11182a}));m.position.set(p.x+s,p.y+h/2-1.5,p.z+(Math.random()-.5)*10);sc.add(m)}
 // les tableaux : peints sur toile, posés sur un chevalet de lumière
 const peint=(k)=>{const c=document.createElement('canvas');c.width=512;c.height=340;const g=c.getContext('2d');pein272(g,SC272[k].peint,512,340);return c};
 const tab=SC272.map((s,k)=>{const u=(k+1)/(N+1),p=crb.getPointAt(u),tng=crb.getTangentAt(u);const side=k%2?1:-1;const nx=-tng.z*side,nz=tng.x*side;
  const c=peint(k);const tex=new THREE.CanvasTexture(c);tex.encoding=THREE.sRGBEncoding;
  const grp=new THREE.Group();const toile=new THREE.Mesh(new THREE.PlaneGeometry(4.2,2.8),new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity:.25}));grp.add(toile);
  const cadre=new THREE.Mesh(new THREE.PlaneGeometry(4.6,3.2),new THREE.MeshBasicMaterial({color:0xb08a3a,transparent:true,opacity:.2}));cadre.position.z=-.02;grp.add(cadre);
  grp.position.set(p.x+nx*3.6,p.y+2.2,p.z+nz*3.6);grp.lookAt(p.x,p.y+2,p.z);sc.add(grp);
  const lum=new THREE.PointLight(0xffd890,0,10);lum.position.set(grp.position.x,grp.position.y,grp.position.z);sc.add(lum);
  return {u,grp,toile,cadre,lum,vu:false,c}});
 // les lumignons à ramasser le long du chemin
 const LUM=[];for(let k=0;k<36;k++){const u=.03+k/36*.94,p=crb.getPointAt(u);const m=new THREE.Mesh(new THREE.SphereGeometry(.12,8,6),new THREE.MeshBasicMaterial({color:0xffd27a}));m.position.set(p.x+(Math.random()-.5)*1.4,p.y+.7,p.z);sc.add(m);LUM.push({u,m,pris:false})}
 // le curé : une silhouette en soutane, sa lanterne
 const cure=new THREE.Group();{const so=new THREE.Mesh(new THREE.ConeGeometry(.35,1.3,10),new THREE.MeshLambertMaterial({color:0x15131a}));so.position.y=.65;cure.add(so);const te=new THREE.Mesh(new THREE.SphereGeometry(.17,10,8),new THREE.MeshLambertMaterial({color:0xd9b896}));te.position.y=1.45;cure.add(te);const ch=new THREE.Mesh(new THREE.CylinderGeometry(.24,.24,.05,12),new THREE.MeshLambertMaterial({color:0x111}));ch.position.y=1.6;cure.add(ch);const la=new THREE.Mesh(new THREE.SphereGeometry(.09,8,6),new THREE.MeshBasicMaterial({color:0xffe0a0}));la.position.set(.35,.8,0);cure.add(la);const pl=new THREE.PointLight(0xffd890,1.1,9);pl.position.set(.35,.9,0);cure.add(pl)}
 sc.add(cure);
 let u=.005,look=0,pris=0,att={g:0,d:0,p:0},pause=false;const K={};
 const kd=e=>{K[e.key.toLowerCase()]=1;if(e.key==='Escape')quitter(false)},ku=e=>{K[e.key.toLowerCase()]=0};addEventListener('keydown',kd);addEventListener('keyup',ku);
 // au toucher : appuyer pour avancer
 let tch=0;cv.addEventListener('pointerdown',()=>tch=1);addEventListener('pointerup',()=>tch=0);
 const fen=()=>{const w=d.clientWidth,h=d.clientHeight;R.setSize(w,h,false);R.setPixelRatio(Math.min(2,devicePixelRatio||1));cam.aspect=w/h;cam.updateProjectionMatrix()};fen();addEventListener('resize',fen);
 // le tableau s'ouvre : la toile, le texte, et ce que le curé ressent
 function ouvre(k){pause=true;const s=SC272[k],T=tab[k];const o=document.createElement('div');o.style.cssText='position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#000a;z-index:3';
  const b=document.createElement('div');b.className='carte';b.style.cssText='max-width:min(620px,94vw);max-height:92vh;overflow:auto;background:#1b1712;border:1px solid #8a7450;border-radius:10px;padding:14px 16px;color:#f2ead6;font:14px/1.45 system-ui;box-shadow:0 10px 40px #000c';
  const im=T.c;im.style.cssText='width:100%;border-radius:6px;display:block;margin-bottom:8px';b.appendChild(im);
  const h=document.createElement('div');h.innerHTML='<small style="opacity:.7;letter-spacing:.08em;text-transform:uppercase">Le songe du curé · '+s.an+'</small><h2 style="margin:4px 0 6px;font:700 19px Georgia,serif">'+s.t+'</h2><p style="margin:0 0 10px">'+s.b+'</p>';b.appendChild(h);
  s.o.forEach(([n,k2])=>{const bt=document.createElement('button');bt.className='op';bt.style.cssText='display:block;width:100%;text-align:left;margin:5px 0';bt.innerHTML='<b>'+n+'</b>';bt.onclick=()=>{att[k2]++;o.remove();pause=false;T.vu=true};b.appendChild(bt)});
  o.appendChild(b);d.appendChild(o)}
 let t0=performance.now(),raf=0;
 function boucle(now){if(fini)return;const dt=Math.min(.05,(now-t0)/1000);t0=now;
  if(!pause){const av=(K['arrowup']||K['z']||K['w']||tch)?1:0,re=(K['arrowdown']||K['s'])?1:0;u=Math.max(.002,Math.min(.998,u+(av-re*.7)*dt*.018));if(K['arrowleft']||K['q']||K['a'])look=Math.min(1.2,look+dt*1.5);else if(K['arrowright']||K['d'])look=Math.max(-1.2,look-dt*1.5);else look*=.96}
  const p=crb.getPointAt(u),tg=crb.getTangentAt(u);cure.position.copy(p);cure.rotation.y=Math.atan2(tg.x,tg.z)+Math.PI;cure.position.y+=Math.sin(now/300)*.03;
  const ca=Math.cos(look),sa=Math.sin(look),bx=-tg.x*ca+tg.z*sa,bz=-tg.z*ca-tg.x*sa;cam.position.set(p.x+bx*4.2,p.y+2.3,p.z+bz*4.2);cam.lookAt(p.x-bx*3,p.y+1.4,p.z-bz*3);
  // les tableaux s'allument quand on approche
  tab.forEach((T,k)=>{const dd=Math.abs(T.u-u)*L;const a=Math.max(0,Math.min(1,1-(dd-3)/14));T.toile.material.opacity=.15+.85*a;T.cadre.material.opacity=.15+.6*a;T.lum.intensity=a*1.6;if(!T.vu&&!pause&&dd<2.2)ouvre(k)});
  LUM.forEach(l=>{if(l.pris)return;l.m.position.y+=Math.sin(now/400+l.u*40)*.003;if(l.m.position.distanceTo(cure.position)<1.3){l.pris=true;sc.remove(l.m);pris++}});
  const vus=tab.filter(T=>T.vu).length;hud.textContent='Le songe du curé · tableaux '+vus+' / '+N+' · lumignons '+pris;
  if(u>.99&&!pause&&vus===N){quitter(true);return}
  if(u>.99&&!pause&&vus<N){const k=tab.findIndex(T=>!T.vu);if(k>=0)ouvre(k)}
  R.render(sc,cam);raf=requestAnimationFrame(boucle)}
 raf=requestAnimationFrame(boucle);
 function quitter(ok){if(fini)return;fini=true;cancelAnimationFrame(raf);removeEventListener('keydown',kd);removeEventListener('keyup',ku);removeEventListener('resize',fen);
  const m=Math.max(att.g,att.d,att.p),k=att.g===m?'g':att.p===m?'p':'d';
  const mot={g:'Le dimanche suivant, en chaire, il parle d’une île où tous seront frères. Les planteurs toussent dans les premiers bancs ; au fond, les esclaves écoutent sans bouger.',d:'Au réveil, il se tait. Le rêve l’a troublé : il ne sait plus ce que Dieu veut de cette île. Il prie longtemps, seul, dans l’église vide.',p:'Au réveil, il a les yeux mouillés. Ce dimanche-là, il baptise trois enfants nés sur l’habitation voisine et note leurs noms avec soin dans le registre, en entier.'}[k];
  const o=document.createElement('div');o.style.cssText='position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#000c;z-index:4';o.innerHTML='<div style="max-width:min(560px,92vw);background:#1b1712;border:1px solid #8a7450;border-radius:10px;padding:16px;color:#f2ead6;font:14px/1.5 system-ui"><h2 style="margin:0 0 8px;font:700 19px Georgia,serif">'+(ok?'L’aube':'Il se réveille')+'</h2><p>'+(ok?mot:'Une cloche, au loin : le rêve s’efface avant la fin.')+'</p><p style="opacity:.7;font-size:12px">Les faits montrés dans le rêve sont réels ; le regard du curé est imaginé par le jeu.</p><button class="bt" style="margin-top:6px">Revenir</button></div>';
  o.querySelector('button').onclick=()=>{try{R.dispose()}catch(e){}d.remove();window.BTUON=0;window.FILM=0;if(fin)fin(ok,k,pris)};d.appendChild(o)}}
// les tableaux, peints à la main (formes simples, couleurs d'images pieuses)
function pein272(g,k,W,H){const ciel=(a,b)=>{const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,a);gr.addColorStop(1,b);g.fillStyle=gr;g.fillRect(0,0,W,H)};
 const pers=(x,y,s,c,tete)=>{g.fillStyle=c;g.beginPath();g.moveTo(x-12*s,y);g.lineTo(x+12*s,y);g.lineTo(x+6*s,y-34*s);g.lineTo(x-6*s,y-34*s);g.fill();g.fillStyle=tete||'#5a3a26';g.beginPath();g.arc(x,y-41*s,7*s,0,7);g.fill()};
 const sol=(c,h)=>{g.fillStyle=c;g.fillRect(0,H-h,W,h)};const r=(a)=>Math.random()*a;
 const bougie=(x,y)=>{g.fillStyle='#f4efe2';g.fillRect(x-2,y-10,4,10);g.fillStyle='#ffc94a';g.beginPath();g.ellipse(x,y-14,3,5,0,0,7);g.fill();g.fillStyle='rgba(255,210,120,.25)';g.beginPath();g.arc(x,y-14,12,0,7);g.fill()};
 const peaux=['#3b2416','#5a3a26','#7a5236','#a87a52','#d9b896','#4a2c1c'];
 if(k==='chaines'){ciel('#f6c66a','#e07a3a');sol('#8a5a32',70);for(let i=0;i<14;i++)pers(30+i*35+r(10),H-60+r(14),1+r(.3),['#c8102e','#f2e6c8','#2f5e9c','#e0a020','#2a7a3a'][i%5],peaux[i%6]);
  g.strokeStyle='#5a5048';g.lineWidth=5;for(let i=0;i<4;i++){g.beginPath();g.arc(90+i*110,70,12,0,Math.PI*1.4);g.stroke()}g.fillStyle='#7a4a2a';g.fillRect(W/2-18,H-120,36,40);g.fillStyle='#e8d6a0';g.beginPath();g.ellipse(W/2,H-120,18,6,0,0,7);g.fill()}
 else if(k==='vierge'){ciel('#1a2a3a','#2e4a3a');g.fillStyle='#3a3530';g.beginPath();g.ellipse(W/2,H/2+10,120,110,0,Math.PI,0);g.fill();g.fillStyle='#0c0a08';g.beginPath();g.ellipse(W/2,H/2+30,70,80,0,Math.PI,0);g.fill();
  g.fillStyle='#1a1410';g.beginPath();g.moveTo(W/2-14,H/2+30);g.lineTo(W/2+14,H/2+30);g.lineTo(W/2+8,H/2-30);g.lineTo(W/2-8,H/2-30);g.fill();g.beginPath();g.arc(W/2,H/2-38,8,0,7);g.fill();g.strokeStyle='#ffd27a';g.lineWidth=2;g.beginPath();g.arc(W/2,H/2-38,14,0,7);g.stroke();
  for(let i=0;i<30;i++)bougie(60+r(W-120),H/2+60+r(80));for(let i=0;i<22;i++){g.fillStyle=['#c8306a','#e0457b','#a01e5a'][i%3];g.beginPath();g.arc(W/2-130+r(260),40+r(120),5+r(5),0,7);g.fill()}}
 else if(k==='salette'){ciel('#8ec6e8','#d8eef6');g.fillStyle='#3f8a4a';g.beginPath();g.moveTo(0,H);g.quadraticCurveTo(W/2,60,W,H);g.fill();g.fillStyle='#f6f2ea';g.fillRect(W/2-40,120,80,70);g.beginPath();g.moveTo(W/2-46,122);g.lineTo(W/2,84);g.lineTo(W/2+46,122);g.fill();g.fillStyle='#b8b0a0';g.fillRect(W/2-3,62,6,26);g.fillRect(W/2-11,70,22,5);g.fillStyle='#4a78b5';g.fillRect(W/2-10,150,20,40);
  for(let i=0;i<26;i++)pers(40+r(W-80),H-20-r(70)+0,.7,['#f2e6c8','#2f5e9c','#c8102e','#e0a020'][i%4],peaux[i%6]);g.fillStyle='#2a6aa0';g.fillRect(0,H-14,W,14)}
 else if(k==='soeurs'){ciel('#efe4cc','#d8c8a4');sol('#b8a078',60);g.fillStyle='#f6f2ea';g.fillRect(40,60,W-80,160);g.fillStyle='#9a3b2a';g.beginPath();g.moveTo(30,62);g.lineTo(W/2,20);g.lineTo(W-30,62);g.fill();for(let i=0;i<5;i++){g.fillStyle='#6a5a48';g.fillRect(70+i*85,100,30,50)}
  for(let i=0;i<5;i++){pers(80+i*90,H-40,1.1,'#f6f2ea',peaux[i%3]);g.fillStyle='#22262e';g.beginPath();g.arc(80+i*90,H-87,9,Math.PI,0);g.fill()}for(let i=0;i<6;i++)pers(120+i*70+r(10),H-30,.65,['#e0a020','#2f5e9c','#c8102e'][i%3],peaux[(i+2)%6])}
 else if(k==='ecole'){ciel('#f2ead6','#e2d6b8');g.fillStyle='#2a3a2a';g.fillRect(60,40,W-120,90);g.fillStyle='#f2f2e8';g.font='bold 22px Georgia';g.fillText('a  b  c   —   1 + 1 = 2',100,95);
  for(let y=0;y<2;y++)for(let i=0;i<7;i++){const x=70+i*58,yy=H-30-y*70;g.fillStyle='#8a6238';g.fillRect(x-22,yy-12,44,8);pers(x,yy-12,.75,['#2f5e9c','#f2e6c8','#c8102e','#e0a020','#2a7a3a'][(i+y)%5],peaux[(i*3+y)%6]);g.fillStyle='#fff';g.fillRect(x-8,yy-30,16,10)}}
 else if(k==='temples'){ciel('#f8d89a','#f0b070');sol('#9a8a74',50);
  g.fillStyle='#ece4d2';g.fillRect(30,110,90,140);g.beginPath();g.moveTo(26,112);g.lineTo(75,60);g.lineTo(124,112);g.fill();g.fillStyle='#6a5a48';g.fillRect(70,30,10,40);g.fillRect(62,40,26,6);
  const tc=['#d23a3a','#2f7ad0','#e0b020','#2a9a5a','#c050a0'];for(let i=0;i<6;i++){g.fillStyle=tc[i%5];g.fillRect(160+i*4,250-i*28,120-i*8,28)}g.fillStyle='#e0b020';g.beginPath();g.arc(220,82,10,0,7);g.fill();
  g.fillStyle='#f6f2ea';g.fillRect(310,140,90,110);g.fillStyle='#3a9a6a';g.beginPath();g.arc(355,140,38,Math.PI,0);g.fill();g.fillStyle='#f6f2ea';g.fillRect(410,90,14,160);g.fillStyle='#3a9a6a';g.beginPath();g.arc(417,90,10,Math.PI,0);g.fill();
  g.fillStyle='#b8302a';for(let i=0;i<3;i++){g.beginPath();g.moveTo(440-i*0,200-i*40);g.lineTo(500,200-i*40);g.lineTo(492,186-i*40);g.lineTo(448,186-i*40);g.fill();g.fillRect(455,200-i*40,30,26)}
  for(let i=0;i<10;i++)pers(30+i*48,H-8,.8,['#f2e6c8','#2f5e9c','#c8102e','#e0a020','#2a7a3a'][i%5],peaux[i%6])}
 else if(k==='oratoire'){ciel('#a8d0e0','#e8f0e0');g.fillStyle='#5a9a3a';g.fillRect(0,H-120,W,120);g.strokeStyle='#3a7a2a';g.lineWidth=3;for(let i=0;i<40;i++){g.beginPath();const x=r(W);g.moveTo(x,H);g.lineTo(x+r(20)-10,H-110+r(30));g.stroke()}
  g.fillStyle='#f6f2ea';g.fillRect(W/2-36,H-170,72,110);g.fillStyle='#9a3b2a';g.beginPath();g.moveTo(W/2-44,H-168);g.lineTo(W/2,H-200);g.lineTo(W/2+44,H-168);g.fill();g.fillStyle='#4a78b5';g.fillRect(W/2-24,H-150,48,56);g.fillStyle='#f7f4ee';g.beginPath();g.moveTo(W/2-10,H-96);g.lineTo(W/2+10,H-96);g.lineTo(W/2+5,H-140);g.lineTo(W/2-5,H-140);g.fill();g.beginPath();g.arc(W/2,H-144,5,0,7);g.fillStyle='#e9cfb4';g.fill();
  bougie(W/2+18,H-60);g.fillStyle='#c8102e';g.beginPath();g.arc(W/2-20,H-62,6,0,7);g.fill();g.fillStyle='#e0457b';g.beginPath();g.arc(W/2-8,H-60,5,0,7);g.fill();
  g.fillStyle='#b3261e';g.fillRect(W-120,H-130,40,60);g.fillStyle='#c8402a';g.fillRect(W-108,H-120,16,40)}
 // un léger grain de peinture
 for(let i=0;i<2500;i++){g.fillStyle='rgba(0,0,0,'+(Math.random()*.06)+')';g.fillRect(Math.random()*W,Math.random()*H,2,2)}
 g.strokeStyle='rgba(60,40,20,.6)';g.lineWidth=6;g.strokeRect(3,3,W-6,H-6)}
function songeCureOuvrir(fin){const go=()=>songeCure272(fin);if(typeof introJeu==='function')introJeu({sur:'Le songe du curé',t:'Le chemin de lumière',
 h:'Après la messe du soir, le vieux curé s’endort dans son fauteuil. Il rêve de l’île longtemps après lui. Un chemin de lumière traverse la nuit, et des tableaux s’allument quand il passe : ce que sera l’île, vu avec les yeux de sa foi.',
 but:'Suivre le chemin et s’arrêter devant chaque tableau. Ce que le curé ressent décide de son réveil. On peut ramasser les lumignons en chemin.',cmd:['Flèche haut ou Z : avancer ; flèche bas ou S : reculer','Flèches gauche et droite : regarder autour','Toucher l’écran : avancer','Échap : se réveiller']},ok=>{if(ok===false){window.BTUON=0;if(fin)fin(false);return}go()});else go()}
// dans l'histoire, côté colon : le curé de la paroisse s'endort
EV.songeCure272={tag:'Mythe',an:'années 1840',nat:'Un rêve inventé pour le jeu.',si:()=>S&&S.voieC&&S.year>=1820&&S.year<1848&&!S.done.songeCure272,t:'Le songe du curé',
 b:'Le curé de la paroisse, un vieil homme qui baptise les enfants des esclaves malgré les maîtres, s’est endormi dans son fauteuil après la messe du soir. Il sourit dans son sommeil, puis ses lèvres tremblent.',
 get o(){return [{n:'Le laisser rêver',d:'Un parcours en images : le songe du curé.',fx:{},f:()=>{setTimeout(()=>songeCureOuvrir((ok,k)=>{if(ok){if(k==='g')fx({coh:3,ami:-1});else if(k==='p')fx({coh:2,myst:1});else fx({myst:2});log('⛪ Le curé raconte son rêve à la sacristie : '+(k==='g'?'il en parlera en chaire.':k==='p'?'il en a pleuré.':'il en reste troublé.'))}}),300)}},{n:'Ne pas le déranger',d:'Rien ne change.',fx:{}}]}};
// dans les petits jeux, à côté du songe du gramoun
{const mp=menuPJ;menuPJ=function(){mp.apply(this,arguments);try{const e=$('ecran'),r=$('pjr');if(!e||!r||e.querySelector('[data-cur272]'))return;const b=document.createElement('button');b.className='bt sec';b.dataset.cur272=1;b.style.cssText='display:block;width:100%;text-align:left;margin:6px 0';b.innerHTML='<b>Le songe du curé</b><br><small style="opacity:.8">Un chemin de lumière dans la nuit, et l’île à venir vue avec les yeux d’un vieux prêtre.</small>';r.parentElement.insertBefore(b,r);b.onclick=()=>{e.hidden=true;songeCureOuvrir(()=>menuPJ())}}catch(_){}}}
