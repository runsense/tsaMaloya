// ===== p73 : la Vie en personnage — on incarne le chef du groupe, on le voit marcher avec ses compagnons =====
// Première fois : on choisit ses commandes (deux dispositions au clavier, la souris pour viser), puis un court tutoriel.
// Le chef se déplace dans le lieu (forêt, camp, habitation) ; les compagnons le suivent, attendent ou chassent selon ses ordres.
// Saut (Espace), se baisser (Ctrl), ramper (Alt), courir (Maj). Le gibier fuit ce qui est bruyant et visible.
const VPCMD={
 A:{nom:'ZQSD + pavé numérique',dep:{haut:['z','w'],bas:['s'],gauche:['q','a'],droite:['d']},act:['Numpad1','Numpad2','Numpad3','Numpad4','Numpad5','Numpad6','Numpad7','Numpad8','Numpad9'],lab:['1','2','3','4','5','6','7','8','9']},
 B:{nom:'Flèches + AZEQSDWXC',dep:{haut:['ArrowUp'],bas:['ArrowDown'],gauche:['ArrowLeft'],droite:['ArrowRight']},act:['a','z','e','q','s','d','w','x','c'],lab:['A','Z','E','Q','S','D','W','X','C']}};
const VPACT=[['lancer','Lancer la sagaie'],['frapper','Frapper au bâton'],['arme','Sagaie / fusil'],['suivre','Groupe : me suivre'],['attendre','Groupe : attendre ici'],['chasser','Groupe : chasser'],['pouvoir','Pouvoir mystique'],['soin','Soigner'],['quitter','Rentrer au camp']];
let VP=null;
function vpCmd(){try{const c=localStorage.getItem('tsa-cmd');return VPCMD[c]?c:null}catch(e){return null}}
function vpStyle(){if($('vpSt'))return;const s=document.createElement('style');s.id='vpSt';s.textContent='#vp{position:fixed;inset:0;z-index:9200;background:#0d1210;font-family:Montserrat,sans-serif;color:#efe9da}#vp canvas{display:block;width:100%;height:100%}'+
 '#vpX{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);font:600 22px monospace;color:#fff8;pointer-events:none}#vpH{position:absolute;left:14px;top:12px;background:#0009;border-radius:8px;padding:8px 12px;font-size:12px;line-height:1.5;max-width:300px}'+
 '#vpM{position:absolute;left:50%;bottom:86px;transform:translateX(-50%);background:#000a;border-radius:8px;padding:7px 14px;font-size:14px;max-width:80%;text-align:center}#vpM:empty{display:none}'+
 '#vpB{position:absolute;left:0;right:0;bottom:10px;display:flex;flex-wrap:wrap;gap:6px;justify-content:center;padding:0 10px}#vpB button{font:600 12px Montserrat,sans-serif;background:#1e2a24e6;color:#efe9da;border:1px solid #4a5a50;border-radius:999px;padding:6px 11px;cursor:pointer}#vpB button b{color:#f0c46a;margin-right:5px}'+
 '#vpC,#vpT{position:fixed;inset:0;z-index:9300;display:flex;align-items:center;justify-content:center;background:#000b}#vpC .bx,#vpT .bx{background:#efe4c8;color:#2a2016;border-radius:6px;max-width:640px;width:calc(100% - 32px);padding:20px 22px;font-family:Montserrat,sans-serif}'+
 '#vpC h3,#vpT h3{font:700 22px Alegreya,Georgia,serif;margin:0 0 8px}#vpC .ch{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0}#vpC .ch button{text-align:left;background:#fbf6ea;border:2px solid #c8b890;border-radius:6px;padding:10px;cursor:pointer;font:500 13px Montserrat,sans-serif;color:#2a2016}#vpC .ch button:hover{border-color:#b5412b}#vpC .ch b{display:block;font-size:15px;margin-bottom:4px}#vpC small,#vpT small{color:#6a5a40}'+
 '#vpT .bx{position:absolute;top:auto;bottom:90px;max-width:520px}#vpT{background:transparent;pointer-events:none;align-items:flex-end}#vpT .bx{pointer-events:auto;position:static;margin-bottom:90px}#vpT button{font:600 13px Montserrat,sans-serif;background:#b5412b;color:#fff;border:0;border-radius:999px;padding:7px 16px;cursor:pointer;margin-top:8px}'+
 '@media (max-width:600px){#vpC .ch{grid-template-columns:1fr}}';document.head.appendChild(s)}
// ----- le choix des commandes, la première fois -----
function vpChoisir(cb){vpStyle();const d=document.createElement('div');d.id='vpC';const L=k=>{const c=VPCMD[k];return VPACT.map((a,i)=>c.lab[i]+' '+a[1].toLowerCase()).join(' · ')};
 d.innerHTML='<div class="bx"><h3>Vos commandes</h3><small>Choisissez une fois ; vous pourrez changer plus tard avec le bouton « Commandes ». Dans les deux cas : la souris vise (clic gauche lance, clic droit frappe), Espace saute, Ctrl se baisse, Alt rampe, Maj court, la molette rapproche la caméra.</small><div class="ch">'+
 ['A','B'].map(k=>'<button data-c="'+k+'"><b>'+VPCMD[k].nom+'</b>'+(k==='A'?'Main gauche sur ZQSD pour marcher, main droite sur le pavé numérique pour agir.':'Flèches pour marcher, lettres de gauche pour agir.')+'<br><small>'+L(k)+'</small></button>').join('')+'</div></div>';
 document.body.appendChild(d);d.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{try{localStorage.setItem('tsa-cmd',b.dataset.c)}catch(e){}d.remove();cb&&cb(b.dataset.c)})}
// ----- le tutoriel, la première fois -----
const VPTUTO=[['Vous êtes le chef','Marchez avec '+'{dep}'+'. Tournez la caméra avec la souris (cliquez dans la scène pour la garder ; Échap la libère). La molette rapproche ou éloigne.'],
 ['Approcher sans être vu','Le gibier fuit le bruit. Baissez-vous (Ctrl) ou rampez (Alt) pour approcher, et restez derrière les arbres. Courir (Maj) fait du bruit.'],
 ['Lancer','Visez avec la croix et cliquez (ou {lancer}) pour lancer la sagaie. Il faut un peu d’élan pour les longues distances : visez légèrement au-dessus.'],
 ['Votre groupe','Vos compagnons vous suivent ({suivre}). Faites-les attendre ({attendre}) avant d’approcher seul, ou lâchez-les sur le gibier ({chasser}) : les chasseurs aguerris visent mieux.'],
 ['Rentrer','Quand c’est assez, rentrez au camp ({quitter}) : le gibier tué devient des vivres.']];
function vpTuto(i=0){const c=VPCMD[VP&&VP.cmd||'A'];if(i>=VPTUTO.length){try{localStorage.setItem('tsa-tuto-vp','1')}catch(e){}return}let d=$('vpT');if(!d){d=document.createElement('div');d.id='vpT';document.body.appendChild(d)}
 const r=t=>t.replace('{dep}',c===VPCMD.A?'ZQSD':'les flèches').replace(/\{(\w+)\}/g,(m,k)=>{const j=VPACT.findIndex(a=>a[0]===k);return j<0?m:c.lab[j]});
 d.innerHTML='<div class="bx"><small>Tutoriel '+(i+1)+'/'+VPTUTO.length+'</small><h3>'+VPTUTO[i][0]+'</h3><div>'+r(VPTUTO[i][1])+'</div><button>'+(i<VPTUTO.length-1?'Suivant':'Compris')+'</button></div>';d.querySelector('button').onclick=()=>{if(i>=VPTUTO.length-1)d.remove();vpTuto(i+1)}}
// ----- qui part : le chef et ses compagnons -----
function vpGroupe(ci){const P=(S.pp||[]).filter(p=>adulte(p)&&campDe(p)===ci&&!enGrp(p));let chef=(S.voieC?P.find(p=>estColon(p)&&p.g!=='f'):null)||(typeof chefDe==='function'&&chefDe(ci))||P.find(p=>p.role==='cha')||P[0];if(!chef)return null;if(chef.id!=null&&typeof ppId==='function'&&ppId(chef.id))chef=ppId(chef.id);
 const C=P.filter(p=>p.id!==chef.id&&(!S.voieC||p.st==='esclave'||!estColon(p))).sort((a,b)=>(b.role==='cha')-(a.role==='cha')||((b.sk||{}).cha||0)-((a.sk||{}).cha||0)).slice(0,4);return {chef,C}}
// ----- la scène -----
function vpOuvrir(){if(VP||!S||modeHist())return;const c=vpCmd();if(!c){vpChoisir(()=>vpOuvrir());return}
 const ci=(CV&&CV.on&&CV.camp!=null)?CV.camp:(camps()[0]||{}).i;const t=T[ci];if(!t){toast('Aucun camp où commencer.');return}const G=vpGroupe(ci);if(!G){toast('Personne pour partir.');return}
 if(CV&&CV.on)try{cvFermer()}catch(e){}vpStyle();const W=innerWidth,H=innerHeight,el=document.createElement('div');el.id='vp';el.innerHTML='<canvas id="vpc"></canvas><div id="vpX">+</div><div id="vpH"></div><div id="vpM"></div><div id="vpB"></div>';document.body.appendChild(el);
 const cv=$('vpc'),R=new THREE.WebGLRenderer({canvas:cv,antialias:true});R.setPixelRatio(Math.min(devicePixelRatio||1,1.5));R.setSize(W,H);const sky=new THREE.Color(0xa8c8d0);R.setClearColor(sky);
 const sc=new THREE.Scene();sc.fog=new THREE.Fog(sky,20,t.forest?60:100);const cam=new THREE.PerspectiveCamera(62,W/H,.05,260);sc.add(new THREE.HemisphereLight(0xdfeee8,0x2b3a25,.95));const sun=new THREE.DirectionalLight(0xfff1d6,.85);sun.position.set(-30,50,20);sc.add(sun);
 const h=fpsSol(t),N=90,L=170,g=new THREE.PlaneGeometry(L,L,N,N).rotateX(-Math.PI/2),pp=g.attributes.position,col=new Float32Array(pp.count*3);
 for(let i=0;i<pp.count;i++){const x=pp.getX(i),z=pp.getZ(i);pp.setY(i,h(x,z));const k=.5+.5*Math.sin(x*.7)*Math.cos(z*.6),camp=Math.hypot(x,z+30)<9,c=camp?[.42,.34,.24]:t.bare?[.38+.1*k,.34,.3]:t.alt>1800?[.45+.1*k,.47,.3]:[.18+.06*k,.36+.12*k,.16];col.set(c,i*3)}
 g.setAttribute('color',new THREE.BufferAttribute(col,3));g.computeVertexNormals();const sol=new THREE.Mesh(g,new THREE.MeshLambertMaterial({vertexColors:true}));sc.add(sol);
 const nA=t.bare?10:t.forest?170:70,arb=[],M=new THREE.Matrix4(),Q=new THREE.Quaternion(),V=new THREE.Vector3(),tr=new THREE.InstancedMesh(new THREE.CylinderGeometry(.18,.3,1,6).translate(0,.5,0),new THREE.MeshLambertMaterial({color:0x4a3524}),nA),fe=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,0),new THREE.MeshLambertMaterial({color:t.alt>1500?0x3d5e33:0x2f6a36}),nA);
 for(let i=0;i<nA;i++){let x,z;do{x=(Math.random()-.5)*L*.92;z=(Math.random()-.5)*L*.92}while(Math.hypot(x,z)<5||Math.hypot(x,z+30)<11);const s=.8+Math.random()*.8,y=h(x,z),hh=3+Math.random()*4;arb.push({x,z,r:.35*s+.15});M.compose(V.set(x,y,z),Q.identity(),new THREE.Vector3(s,hh*s,s));tr.setMatrixAt(i,M);M.compose(V.set(x,y+hh*s,z),Q.setFromAxisAngle(new THREE.Vector3(0,1,0),Math.random()*6),new THREE.Vector3(2*s,1.5*s,2*s));fe.setMatrixAt(i,M)}sc.add(tr,fe);
 // le camp ou l'habitation, derrière soi
 for(let i=0;i<5;i++){const a=i/5*Math.PI*2,x=Math.cos(a)*6,z=-30+Math.sin(a)*6;if(S.voieC&&i===0){const m=new THREE.Mesh(new THREE.BoxGeometry(7,3,4.5),new THREE.MeshLambertMaterial({color:0xece6d6}));m.position.set(x,h(x,z)+1.5,z);const r=new THREE.Mesh(new THREE.ConeGeometry(5.6,2.4,4).rotateY(Math.PI/4),new THREE.MeshLambertMaterial({color:0x8a3a2e}));r.scale.z=.66;r.position.y=2.7;m.add(r);m.lookAt(0,m.position.y,-30);sc.add(m);arb.push({x,z,r:3});continue}
  const cs=new THREE.Mesh(new THREE.BoxGeometry(2.4,1.6,2),new THREE.MeshLambertMaterial({color:0x8a6a44}));cs.position.set(x,h(x,z)+.8,z);const r=new THREE.Mesh(new THREE.ConeGeometry(2,1.4,4).rotateY(Math.PI/4),new THREE.MeshLambertMaterial({color:0xc9a35a}));r.position.y=1.5;cs.add(r);sc.add(cs);arb.push({x,z,r:1.4})}
 const feu=new THREE.PointLight(0xffa040,1.2,14);feu.position.set(0,h(0,-30)+1,-30);sc.add(feu);
 VP={t,ci,h,sc,cam,R,el,arb,G,cmd:c,keys:{},yaw:Math.PI,pit:-.18,dist:6,acc:0,ram:0,run:0,vy:0,sol:true,x:0,z:-20,ang:0,hp:3,sag:6,rel:0,viv:0,kill:0,an:[],vol:[],cp:[],ordre:'suivre',msg:'',msgT:0,tps:0,last:performance.now(),pause:(()=>{const p=typeof chronoP!=='undefined'?chronoP:0;try{chronoP=1}catch(e){}return()=>{try{chronoP=p}catch(e){}}})()};
 // les personnages : vrais modèles animés
 const poser=(p,role)=>{const n=mfModeleDe(p),o={p,n,root:null,mx:null,clip:'',x:VP.x+(role==='chef'?0:(Math.random()-.5)*4),z:role==='chef'?VP.z:VP.z-2-Math.random()*3,ang:0,role,cd:2+Math.random()*3,cible:null};p3Charge(n);
  const at=()=>{if(!VP)return;if(!P3.buf[n]){if(P3.ok[n]===0)return;setTimeout(at,300);return}p3Instance(n).then(I=>{if(!VP)return;o.root=I.g.scene;o.anim=I.g.animations;o.mx=I.mx;sc.add(o.root);vpClip(o,'repos_debout')}).catch(()=>{})};at();return o};
 VP.chef=poser(G.chef,'chef');VP.cp=G.C.map(p=>poser(p,'comp'));
 // le gibier
 const nG=4+Math.round(Math.min(4,t.ch||2));for(let i=0;i<nG;i++){const a=Math.random()*6.28,d=22+Math.random()*45,m=new THREE.Mesh(fpsGeo('cabri'),new THREE.MeshLambertMaterial({vertexColors:true}));m.scale.setScalar(.8);sc.add(m);VP.an.push({m,x:Math.cos(a)*d,z:Math.sin(a)*d,dir:Math.random()*6,et:'calme',tf:0,mort:0,v:7})}
 vpEntrees();vpBoutons();vpHud();vpMsg('Vous partez avec '+(VP.cp.length?VP.cp.map(o=>o.p.n.split(' ')[0]).join(', '):'personne')+'. Le gibier est quelque part dans la '+(t.forest?'forêt':'savane')+'.');
 let tuto=0;try{tuto=localStorage.getItem('tsa-tuto-vp')}catch(e){}if(!tuto)setTimeout(()=>vpTuto(0),600);requestAnimationFrame(vpBoucle)}
function vpClip(o,c){if(!o||!o.mx||o.clip===c)return;const a=(o.anim||[]).find(x=>x.name===c)||(o.anim||[]).find(x=>x.name==='marche');if(!a)return;o.mx.stopAllAction();const ac=o.mx.clipAction(a);if(c==='sagaie'||c==='sabre'||c==='baton_coup'||c==='chute_mort'){ac.setLoop(THREE.LoopOnce);ac.clampWhenFinished=true}ac.play();o.clip=c;try{p3Range(o.root)}catch(e){}}
function vpMsg(m){if(!VP)return;VP.msg=m;VP.msgT=5;const d=$('vpM');if(d)d.textContent=m}
function vpHud(){if(!VP)return;const d=$('vpH');if(!d)return;const ch=VP.G.chef;d.innerHTML='<b>'+ch.n+'</b> · chef'+(VP.ram?' · rampe':VP.acc?' · baissé':'')+'<br>Souffle '+'●'.repeat(VP.hp)+' · sagaies '+VP.sag+' · gibier '+VP.kill+' (+'+VP.viv+' vivres)<br><small>Groupe : '+(VP.cp.length?VP.cp.map(o=>o.p.n.split(' ')[0]+(o.p.role==='cha'?' (chasseur)':'')).join(', '):'seul')+' — ordre : '+VP.ordre+'</small>'}
function vpBoutons(){const c=VPCMD[VP.cmd],b=$('vpB');b.innerHTML=VPACT.map((a,i)=>'<button data-a="'+a[0]+'"><b>'+c.lab[i]+'</b>'+a[1]+'</button>').join('')+'<button data-a="cmd">Commandes</button>';b.querySelectorAll('[data-a]').forEach(x=>x.onclick=e=>{e.stopPropagation();if(x.dataset.a==='cmd'){vpChoisir(k=>{if(VP){VP.cmd=k;vpBoutons()}});return}vpAction(x.dataset.a)})}
function vpEntrees(){const cv=$('vpc');const kd=e=>{if(!VP)return;const k=e.key.length===1?e.key.toLowerCase():e.key;VP.keys[k]=1;VP.keys[e.code]=1;
  if(e.key==='Alt'){e.preventDefault();VP.ram=!VP.ram;if(VP.ram)VP.acc=0;vpHud()}if(e.key==='Control'){e.preventDefault();VP.acc=!VP.acc;if(VP.acc)VP.ram=0;vpHud()}if(e.code==='Space'){e.preventDefault();if(VP.sol&&!VP.ram){VP.vy=5.2;VP.sol=false}}
  const c=VPCMD[VP.cmd],i=c.act.findIndex(a=>a===e.code||a===k);if(i>=0&&!(c===VPCMD.B&&false)){e.preventDefault();vpAction(VPACT[i][0])}
  if(e.key==='Escape'&&!document.pointerLockElement)vpQuitter()},ku=e=>{if(!VP)return;const k=e.key.length===1?e.key.toLowerCase():e.key;VP.keys[k]=0;VP.keys[e.code]=0};
 addEventListener('keydown',kd,true);addEventListener('keyup',ku,true);VP.off=()=>{removeEventListener('keydown',kd,true);removeEventListener('keyup',ku,true)};
 let dr=null,mv=0;cv.addEventListener('mousedown',e=>{dr={x:e.clientX,y:e.clientY};mv=0;if(e.button===2)vpAction('frapper')});cv.addEventListener('contextmenu',e=>e.preventDefault());
 const mm=e=>{if(!VP)return;if(document.pointerLockElement===cv){VP.yaw-=e.movementX*.0026;VP.pit=clamp(VP.pit-e.movementY*.0022,-.9,.5)}else if(dr&&e.buttons){const dx=e.clientX-dr.x,dy=e.clientY-dr.y;mv+=Math.abs(dx)+Math.abs(dy);VP.yaw-=dx*.005;VP.pit=clamp(VP.pit-dy*.004,-.9,.5);dr={x:e.clientX,y:e.clientY}}};addEventListener('mousemove',mm);const off0=VP.off;VP.off=()=>{off0();removeEventListener('mousemove',mm)};
 cv.addEventListener('mouseup',e=>{if(!VP||e.button!==0)return;if(document.pointerLockElement===cv||mv<6)vpAction('lancer');if(!document.pointerLockElement&&mv<6)try{const p=cv.requestPointerLock&&cv.requestPointerLock();if(p&&p.catch)p.catch(()=>{})}catch(_){}dr=null});
 cv.addEventListener('wheel',e=>{e.preventDefault();VP.dist=clamp(VP.dist*(e.deltaY>0?1.12:.89),2.2,14)},{passive:false})}
// ----- la visée : le centre de l'écran -----
function vpVisee(){const r=new THREE.Raycaster();r.setFromCamera(new THREE.Vector2(0,.08),VP.cam);const vivants=VP.an.filter(a=>!a.mort).map(a=>a.m);const hit=r.intersectObjects(vivants.concat([VP.sc.children.find(o=>o.isMesh&&o.geometry.type==='PlaneGeometry')]).filter(Boolean),false)[0];return hit?hit.point:VP.cam.position.clone().add(r.ray.direction.multiplyScalar(40))}
function vpLancer(o,cible,force){const y=VP.h(o.x,o.z)+1.5,d=new THREE.Vector3(cible.x-o.x,cible.y+.4-y,cible.z-o.z),l=d.length();d.normalize();const v=d.multiplyScalar(force||24);v.y+=Math.min(6,l*.09);
 const s=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,1.3,4).rotateX(Math.PI/2),new THREE.MeshLambertMaterial({color:0x7a5a36}));s.position.set(o.x,y,o.z);VP.sc.add(s);VP.vol.push({m:s,v,t:0,de:o});vpClip(o,'sagaie');o.lanceT=.9}
function vpAction(a){if(!VP)return;const ch=VP.chef;
 if(a==='lancer'){if(VP.rel>0)return;if(VP.sag<=0)return vpMsg('Plus de sagaie : ramassez-les ou rentrez.');VP.sag--;VP.rel=1.1;const p=vpVisee();vpLancer(ch,p,VP.acc||VP.ram?20:25);vpAlerte(VP.acc||VP.ram?6:12)}
 else if(a==='frapper'){vpClip(ch,'baton_coup');ch.lanceT=.8;const c=VP.an.find(x=>!x.mort&&Math.hypot(x.x-ch.x,x.z-ch.z)<2.4);if(c)vpTue(c,VP.G.chef,'bâton');else vpMsg('Trop loin pour frapper.')}
 else if(a==='arme'){vpMsg((S.fu||0)>0?'Le fusil volé fait fuir tout le gibier à la ronde : ici, la sagaie vaut mieux.':'Vous n’avez que la sagaie.')}
 else if(a==='suivre'||a==='attendre'||a==='chasser'){VP.ordre=a;vpMsg(a==='suivre'?'« Suivez-moi. »':a==='attendre'?'« Attendez ici, sans bruit. »':'« Allez ! » Les compagnons se lancent sur le gibier.');VP.cp.forEach(o=>{o.ax=o.x;o.az=o.z})}
 else if(a==='pouvoir'){const L=typeof pvScene==='function'?pvScene():[];if(!L.length)return vpMsg('Aucun pouvoir mystique connu : les savoirs et les mythes en ouvrent.');const k=L[0];const c=POUV[k]?POUV[k].c:3;if((S.myst||0)<c)return vpMsg('Pas assez de mystique.');S.myst-=c;if(SCPV[k][1]==='voir'){VP.voirT=20}else if(SCPV[k][1]==='soin'){VP.hp=Math.min(3,VP.hp+1)}else VP.discret=20;vpMsg(SCPV[k][0]+' : '+SCPV[k][2]+' (mythe)')}
 else if(a==='soin'){if(VP.hp>=3)return vpMsg('Personne n’est blessé.');VP.hp++;vpMsg('On presse la plaie avec des feuilles : le souffle revient.')}
 else if(a==='quitter')vpQuitter();vpHud()}
function vpAlerte(r){for(const c of VP.an)if(!c.mort&&Math.hypot(c.x-VP.chef.x,c.z-VP.chef.z)<r){c.et='fuite';c.tf=5}}
function vpTue(c,p,k){c.mort=1;VP.kill++;VP.viv+=3;c.m.rotation.z=Math.PI/2;c.m.position.y-=.2;vpMsg('Un cabri à terre ('+k+(p&&p!==VP.G.chef?', '+p.n.split(' ')[0]:'')+') : +3 vivres.');if(p){p.sk=p.sk||{};p.sk.cha=(p.sk.cha||0)+.2}for(const a of VP.an)if(!a.mort&&Math.hypot(a.x-c.x,a.z-c.z)<25){a.et='fuite';a.tf=5}vpHud()}
const vpLibre=(x,z)=>!VP.arb.some(a=>Math.hypot(a.x-x,a.z-z)<a.r+.25);
function vpBoucle(){if(!VP)return;const now=performance.now(),dt=Math.min(.05,(now-VP.last)/1000);VP.last=now;VP.tps+=dt;const h=VP.h,k=VP.keys,c=VPCMD[VP.cmd],ch=VP.chef,on=L=>L.some(x=>k[x]);
 // le chef
 let fx=0,fz=0;if(on(c.dep.haut))fz-=1;if(on(c.dep.bas))fz+=1;if(on(c.dep.gauche))fx-=1;if(on(c.dep.droite))fx+=1;
 const run=k.Shift&&!VP.acc&&!VP.ram,sp=VP.ram?1:VP.acc?1.8:run?6.2:3.3,ln=Math.hypot(fx,fz);
 if(ln>.05){const s=Math.sin(VP.yaw),co=Math.cos(VP.yaw),mx=(fx*co+fz*s)/ln,mz=(-fx*s+fz*co)/ln,nx=ch.x+mx*sp*dt,nz=ch.z+mz*sp*dt;if(vpLibre(nx,nz)&&Math.abs(h(nx,nz)-h(ch.x,ch.z))<sp*dt*1.4+.05){ch.x=clamp(nx,-80,80);ch.z=clamp(nz,-80,80)}ch.ang=Math.atan2(mx,mz)}
 VP.vy-=14*dt;let y0=h(ch.x,ch.z),cy=(ch.y==null?y0:ch.y)+VP.vy*dt;if(cy<=y0){cy=y0;VP.vy=0;VP.sol=true}ch.y=cy;
 VP.bruit=VP.discret>0?0:ln>.05?(VP.ram?.05:VP.acc?.18:run?1:.45):.04;VP.discret=Math.max(0,(VP.discret||0)-dt);VP.voirT=Math.max(0,(VP.voirT||0)-dt);VP.rel=Math.max(0,VP.rel-dt);
 const pose=(o,mv,vit)=>{if(!o.root)return;o.root.position.set(o.x,(o.y!=null?o.y:h(o.x,o.z))-(o===ch&&VP.ram?.55:0),o.z);o.root.rotation.y=o.ang;o.root.scale.y=o===ch&&VP.ram?.55:1;if(o.lanceT>0){o.lanceT-=dt}else vpClip(o,mv?(vit>5?'course':(o===ch&&(VP.acc||VP.ram))||o.tra?'chasse_traque':'marche'):(o===ch&&VP.acc?'cacher':'repos_debout'));if(o.mx)o.mx.update(dt)};
 pose(ch,ln>.05,sp);
 // les compagnons
 VP.cp.forEach((o,i)=>{if(VP.fight&&!VP.fight.fin){pose(o,!!o.mvF,o.rc==='combat'?5:3.4);return}let tx,tz,v=3.4;o.tra=0;
  if(VP.ordre==='suivre'){const a=ch.ang+Math.PI+(i-(VP.cp.length-1)/2)*.55,d=2.2+(i%2)*1.1;tx=ch.x+Math.sin(a)*d;tz=ch.z+Math.cos(a)*d;v=run?6:VP.acc||VP.ram?1.8:3.4;o.tra=VP.acc||VP.ram}
  else if(VP.ordre==='attendre'){tx=o.ax;tz=o.az}
  else{const c2=VP.an.filter(a=>!a.mort).sort((a,b)=>Math.hypot(a.x-o.x,a.z-o.z)-Math.hypot(b.x-o.x,b.z-o.z))[0];if(c2){const d=Math.hypot(c2.x-o.x,c2.z-o.z);if(d>14){tx=c2.x;tz=c2.z;v=d>25?5.5:2;o.tra=d<=25}else{tx=o.x;tz=o.z;o.ang=Math.atan2(c2.x-o.x,c2.z-o.z);o.cd-=dt;if(o.cd<=0){o.cd=3+Math.random()*2;const sk=((o.p.sk||{}).cha||0)+(o.p.role==='cha'?3:0);const vise={x:c2.x+(Math.random()-.5)*(3.5-Math.min(3,sk*.4)),y:h(c2.x,c2.z)+.3,z:c2.z+(Math.random()-.5)*(3.5-Math.min(3,sk*.4))};vpLancer(o,vise,23)}}}else{tx=ch.x;tz=ch.z}}
  const dx=tx-o.x,dz=tz-o.z,d=Math.hypot(dx,dz);let mv=false;if(d>.4){const st=Math.min(d,v*dt),nx=o.x+dx/d*st,nz=o.z+dz/d*st;if(vpLibre(nx,nz)){o.x=nx;o.z=nz}else{o.x+=dz/d*st*.7;o.z-=dx/d*st*.7}o.ang=Math.atan2(dx,dz);mv=true}pose(o,mv,v)});
 // le gibier
 VP.an.forEach(a=>{if(a.mort)return;const d=Math.hypot(a.x-ch.x,a.z-ch.z),seuil=8+VP.bruit*26;let menace=d<seuil;VP.cp.forEach(o=>{if(!o.tra&&Math.hypot(a.x-o.x,a.z-o.z)<7)menace=true});if(menace&&a.et!=='fuite'){a.et='fuite';a.tf=4}
  if(a.et==='fuite'){a.tf-=dt;const fx2=a.x-ch.x,fz2=a.z-ch.z,l=Math.hypot(fx2,fz2)||1;a.dir=Math.atan2(fz2,fx2)+(Math.random()-.5)*.3;if(a.tf<=0)a.et='calme'}else if(Math.random()<.01)a.dir+=(Math.random()-.5)*2;
  const sv=a.et==='fuite'?a.v:.6,nx=a.x+Math.cos(a.dir)*sv*dt,nz=a.z+Math.sin(a.dir)*sv*dt;if(Math.abs(nx)<80&&Math.abs(nz)<80&&vpLibre(nx,nz)){a.x=nx;a.z=nz}else a.dir+=2;a.m.position.set(a.x,h(a.x,a.z),a.z);a.m.rotation.y=-a.dir+Math.PI/2;a.m.visible=true});
 // les sagaies en vol
 VP.vol=VP.vol.filter(s=>{s.t+=dt;s.v.y-=9.8*dt;s.m.position.addScaledVector(s.v,dt);const p=s.m.position;for(const a of VP.an){if(a.mort)continue;if(Math.hypot(a.x-p.x,a.z-p.z)<.6&&Math.abs(h(a.x,a.z)+.5-p.y)<.7){vpTue(a,s.de.p,'sagaie');VP.sc.remove(s.m);return false}}s.m.lookAt(p.clone().add(s.v));if(p.y<h(p.x,p.z)||s.t>4){if(s.de===ch)vpAlerte(10);return false}return true});
 // la caméra derrière l'épaule
 const cy2=ch.y+(VP.ram?.6:VP.acc?1.1:1.6),cd=VP.dist,ox=Math.sin(VP.yaw)*Math.cos(VP.pit)*cd,oz=Math.cos(VP.yaw)*Math.cos(VP.pit)*cd;let camY=cy2-Math.sin(VP.pit)*cd;camY=Math.max(camY,h(ch.x+ox,ch.z+oz)+.4);
 VP.cam.position.set(ch.x+ox+Math.cos(VP.yaw)*.6,camY,ch.z+oz-Math.sin(VP.yaw)*.6);VP.cam.lookAt(ch.x+Math.cos(VP.yaw)*.6,cy2+.2,ch.z-Math.sin(VP.yaw)*.6);
 if(VP.msgT>0){VP.msgT-=dt;if(VP.msgT<=0){const m=$('vpM');if(m)m.textContent=''}}
 if(VP.tps%1<dt)vpHud();
 VP.R.render(VP.sc,VP.cam);requestAnimationFrame(vpBoucle)}
function vpQuitter(){if(!VP)return;const v=VP;VP=null;try{if(document.pointerLockElement)document.exitPointerLock()}catch(e){}v.off&&v.off();v.R.dispose();v.el.remove();const tt=$('vpT');if(tt)tt.remove();v.pause();
 if(v.viv){S.vivres=(S.vivres||0)+v.viv;journal(v.G.chef.n.split(' ')[0]+' rentre de la chasse avec '+(v.cp.length?v.cp.map(o=>o.p.n.split(' ')[0]).join(', '):'personne')+' : '+v.kill+' cabri'+(v.kill>1?'s':'')+', +'+v.viv+' vivres.');toast('+'+v.viv+' vivres rapportés.')}
 try{sauve();panneau();rafraichir()}catch(e){}}
// ----- l'entrée : un bouton « Incarner le chef » en mode Vie -----
setInterval(()=>{try{const h=$('fc');if(!h)return;let b=h.querySelector('.vpP');const ok=typeof S!=='undefined'&&S&&!modeHist()&&!S.fin&&!($('kons')&&!$('kons').hidden);if(!ok){if(b)b.remove();return}if(b)return;
 b=document.createElement('span');b.className='pill vpP';b.style.cursor='pointer';b.title='Prendre le chef en main : marcher avec son groupe, chasser, donner les ordres';b.textContent='🧍 Incarner le chef';b.onclick=e=>{e.stopPropagation();vpOuvrir()};h.appendChild(b)}catch(e){}},800);
