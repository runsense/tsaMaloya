// ===== p81 : Vie en personnage — étape 2 : le combat de groupe ; étape 3 : les passages en 2D =====
// ÉTAPE 2. Pendant une sortie, une embuscade peut surgir : un détachement de chasseurs de marrons (côté marron),
// une bande de marrons (côté colonie). Le chef donne un rôle à chacun : BOUCLIER (reste devant lui et prend les coups),
// TIREUR (sagaie, arc ou fusil, de loin), COMBATTANT (au corps à corps). La forêt couvre, se baisser aussi ; le mystique
// (plus fort chez les marrons) jette la brume sur les fusils. Victoire : armes prises, cohésion ; défaite : blessés, traque.
const VPROLES={bouclier:['🛡️','Bouclier','reste devant le chef et prend les coups'],tireur:['🏹','Tireur','lance ou tire de loin'],combat:['⚔️','Combattant','va au corps à corps']};
function vpRoleAuto(p){const s=p.sk||{};if((s.gue||0)>=4&&ageP(p)<40)return 'bouclier';if(p.role==='cha'||(s.cha||0)>=3)return 'tireur';return 'combat'}
function vpEnnemis(){if(!VP||VP.fight)return;const V=VP,colo=S.voieC,n=colo?3+Math.floor(Math.random()*2):3+Math.floor(Math.random()*3),nm=colo?['p1a_chasseur','jeune_pagne','femme_sagaie']:['milicien','homme_chemise','jeune_colon'];
 const a=V.yaw+Math.PI+(Math.random()-.5)*1.2,d=34;V.fight={E:[],t0:V.tps,brume:0,fin:0};
 for(let i=0;i<n;i++){const o={n:nm[i%nm.length],x:V.chef.x+Math.sin(a)*d+(i-n/2)*2.2,z:V.chef.z+Math.cos(a)*d+(Math.random()-.5)*3,ang:0,hp:colo?2:3,cd:2+Math.random()*2,root:null,mx:null,clip:'',arme:colo?'sagaie':'fusil'};
  p3Charge(o.n);const at=()=>{if(!VP||!V.fight)return;if(!P3.buf[o.n]){setTimeout(at,300);return}p3Instance(o.n).then(I=>{if(!VP)return;o.root=I.g.scene;o.anim=I.g.animations;o.mx=I.mx;V.sc.add(o.root)}).catch(()=>{})};at();V.fight.E.push(o)}
 VP.cp.forEach(o=>{o.hp=o.hp||3;o.rc=o.rc||vpRoleAuto(o.p)});V.ordre='combat';vpRolesUI(colo?'Des marrons descendent sur vous !':'Embuscade ! Un détachement de chasseurs de marrons.');try{if(typeof jouerMoment==='function')jouerMoment('alerte')}catch(e){}}
function vpRolesUI(titre){if(!VP)return;let d=$('vpR');if(!d){d=document.createElement('div');d.id='vpR';d.style.cssText='position:absolute;right:14px;top:12px;background:#1e2420ee;border:1px solid #c0503a;border-radius:8px;padding:10px 12px;font-size:12px;max-width:340px;color:#efe9da';VP.el.appendChild(d)}
 d.innerHTML='<b style="color:#ff9a7a;font-size:14px">'+titre+'</b><br><small>Donnez un rôle à chacun :</small>'+VP.cp.map((o,i)=>'<div style="margin-top:6px;display:flex;gap:4px;align-items:center;flex-wrap:wrap"><span style="min-width:72px">'+o.p.n.split(' ')[0]+' '+'●'.repeat(Math.max(0,o.hp||0))+'</span>'+Object.keys(VPROLES).map(k=>'<button data-ro="'+i+'|'+k+'" title="'+VPROLES[k][2]+'" style="font:600 11px Montserrat,sans-serif;border-radius:999px;padding:3px 8px;cursor:pointer;border:1px solid '+(o.rc===k?'#f0c46a':'#4a5a50')+';background:'+(o.rc===k?'#f0c46a33':'transparent')+';color:#efe9da">'+VPROLES[k][0]+' '+VPROLES[k][1]+'</button>').join('')+'</div>').join('')+
 '<small style="display:block;margin-top:6px;opacity:.8">'+(S.voieC?'':'Mystique : « Pouvoir » jette la brume sur les fusils (2 mystique). ')+'Baissez-vous (Ctrl) et restez près des arbres.</small>';
 d.querySelectorAll('[data-ro]').forEach(b=>b.onclick=e=>{e.stopPropagation();const [i,k]=b.dataset.ro.split('|');VP.cp[+i].rc=k;vpRolesUI(titre)})}
function vpClipE(o,c){if(!o.mx||o.clip===c)return;const a=(o.anim||[]).find(x=>x.name===c)||(o.anim||[]).find(x=>x.name==='marche');if(!a)return;o.mx.stopAllAction();const ac=o.mx.clipAction(a);if(/sagaie|sabre|fusil|chute_mort/.test(c)){ac.setLoop(THREE.LoopOnce);ac.clampWhenFinished=true}ac.play();o.clip=c;try{p3Range(o.root)}catch(e){}}
function vpTrait(a,b,col){const g=new THREE.BufferGeometry().setFromPoints([a,b]),l=new THREE.Line(g,new THREE.LineBasicMaterial({color:col||0xfff0c0}));VP.sc.add(l);setTimeout(()=>{if(VP)VP.sc.remove(l)},120)}
function vpCouvert(x,z){return VP.arb.some(a=>Math.hypot(a.x-x,a.z-z)<2.2)}
function vpCombat(dt){const V=VP,F=V.fight;if(!F)return;const h=V.h,ch=V.chef,vivE=F.E.filter(e=>e.hp>0),vivC=V.cp.filter(o=>o.hp>0);
 F.brume=Math.max(0,F.brume-dt);
 // les ennemis avancent, s'arrêtent à portée et tirent
 vivE.forEach(e=>{const cib=[ch].concat(vivC).sort((a,b)=>Math.hypot(a.x-e.x,a.z-e.z)-Math.hypot(b.x-e.x,b.z-e.z))[0],dx=cib.x-e.x,dz=cib.z-e.z,d=Math.hypot(dx,dz),port=e.arme==='fusil'?16:9;e.ang=Math.atan2(dx,dz);
  if(d>port){const v=2.6*dt,nx=e.x+dx/d*v,nz=e.z+dz/d*v;if(vpLibre(nx,nz)){e.x=nx;e.z=nz}else{e.x+=dz/d*v;e.z-=dx/d*v}if(!e.tir)vpClipE(e,'course')}
  else{e.cd-=dt;if(e.cd<=0){e.cd=e.arme==='fusil'?3.2+Math.random():2.2;e.tir=.8;vpClipE(e,e.arme);let pr=e.arme==='fusil'?.5:.42;if(vpCouvert(cib.x,cib.z))pr*=.6;if(cib===ch&&(V.acc||V.ram))pr*=.6;if(F.brume>0)pr*=.35;
    const bq=vivC.find(o=>o.rc==='bouclier'&&Math.hypot(o.x-cib.x,o.z-cib.z)<2.2);vpTrait(new THREE.Vector3(e.x,h(e.x,e.z)+1.4,e.z),new THREE.Vector3(cib.x,h(cib.x,cib.z)+1.2,cib.z),e.arme==='fusil'?0xfff0c0:0x8a6a44);
    if(Math.random()<pr){let vis=cib;if(bq&&bq!==cib&&Math.random()<.7)vis=bq;if(vis===ch){V.hp--;vpMsg('Le chef est touché !')}else{vis.hp--;if(vis.hp<=0){vpClip(vis,'chute_mort');vis.lanceT=99;vpMsg(vis.p.n.split(' ')[0]+' tombe.')}else vpMsg(vis.p.n.split(' ')[0]+' est touché'+(vis.rc==='bouclier'?' en couvrant le chef.':'.'))}vpRolesUI('Le combat')}}else if(e.tir>0)e.tir-=dt;else vpClipE(e,'repos_debout')}
  if(e.root){e.root.position.set(e.x,h(e.x,e.z),e.z);e.root.rotation.y=e.ang}if(e.mx)e.mx.update(dt)});
 // les compagnons selon leur rôle
 vivC.forEach(o=>{const e=vivE.sort((a,b)=>Math.hypot(a.x-o.x,a.z-o.z)-Math.hypot(b.x-o.x,b.z-o.z))[0];if(!e)return;const d=Math.hypot(e.x-o.x,e.z-o.z);let tx=o.x,tz=o.z,v=3.4;
  if(o.rc==='bouclier'){const a=Math.atan2(e.x-ch.x,e.z-ch.z);tx=ch.x+Math.sin(a)*1.4;tz=ch.z+Math.cos(a)*1.4}
  else if(o.rc==='tireur'){if(d>20){tx=e.x;tz=e.z}o.cd=(o.cd||1)-dt;if(d<=22&&o.cd<=0){o.cd=2.4;const sk=((o.p.sk||{}).cha||0)+(o.p.role==='cha'?3:0);vpLancer(o,{x:e.x+(Math.random()-.5)*(3-Math.min(2.6,sk*.35)),y:h(e.x,e.z)+.6,z:e.z+(Math.random()-.5)*(3-Math.min(2.6,sk*.35))},24)}}
  else{tx=e.x;tz=e.z;v=5;if(d<1.8){tx=o.x;tz=o.z;o.cd=(o.cd||1)-dt;if(o.cd<=0){o.cd=1.2;vpClip(o,(o.p&&o.p.id%2)?'baton_coup':'sabre');o.lanceT=.7;if(Math.random()<.45+((o.p.sk||{}).gue||0)*.04){e.hp--;if(e.hp<=0)vpEnnemiTombe(e,o.p)}}}}
  const dx=tx-o.x,dz=tz-o.z,dd=Math.hypot(dx,dz);o.mvF=dd>.3;if(dd>.3){const st=Math.min(dd,v*dt),nx=o.x+dx/dd*st,nz=o.z+dz/dd*st;if(vpLibre(nx,nz)){o.x=nx;o.z=nz}o.ang=Math.atan2(dx,dz)}else o.ang=Math.atan2(e.x-o.x,e.z-o.z)});
 // les sagaies du chef et des tireurs touchent aussi les ennemis
 V.vol=V.vol.filter(s=>{const p=s.m.position;for(const e of vivE){if(e.hp>0&&Math.hypot(e.x-p.x,e.z-p.z)<.7&&p.y-h(e.x,e.z)<2.2&&p.y-h(e.x,e.z)>-.2){e.hp--;V.sc.remove(s.m);if(e.hp<=0)vpEnnemiTombe(e,s.de&&s.de.p);else vpMsg('Touché !');return false}}return true});
 // fin du combat
 if(!F.fin&&!F.E.some(e=>e.hp>0)){F.fin=1;vpFinCombat(true)}else if(!F.fin&&V.hp<=0){F.fin=1;vpFinCombat(false)}}
function vpEnnemiTombe(e,p){vpClipE(e,'chute_mort');e.tir=99;vpMsg((S.voieC?'Un marron':'Un chasseur')+' tombe'+(p?' ('+p.n.split(' ')[0]+')':'')+'.');if(p){p.sk=p.sk||{};p.sk.gue=(p.sk.gue||0)+.5}}
function vpFinCombat(gagne){const V=VP,F=V.fight;const r=$('vpR');if(r)r.remove();V.ordre='suivre';const tombes=V.cp.filter(o=>o.hp<=0);let morts=[];
 tombes.forEach(o=>{if(Math.random()<.15){morts.push(o.p)}else{o.hp=1;vpClip(o,'repos_debout');o.lanceT=0;o.p.blesse=20}});
 if(gagne){const fus=F.E.filter(e=>e.arme==='fusil').length;if(!S.voieC){S.fu=(S.fu||0)+fus;S.traque=Math.min(100,(S.traque||0)+4)}S.coh=Math.min(100,(S.coh||0)+3);vpMsg('Victoire !'+(fus&&!S.voieC?' '+fus+' fusil'+(fus>1?'s':'')+' pris.':'')+' Les blessés se relèvent.');journal((S.voieC?'Le maître et ses hommes repoussent une bande de marrons':'Le groupe de '+V.G.chef.n.split(' ')[0]+' repousse un détachement')+(fus&&!S.voieC?' et prend '+fus+' fusil'+(fus>1?'s':''):'')+'.')}
 else{S.traque=Math.min(100,(S.traque||0)+6);V.hp=1;vpMsg('Le chef est à terre. Les compagnons l’emportent : on rentre.');journal('Le groupe de '+V.G.chef.n.split(' ')[0]+' est battu dans une embuscade et rentre en portant son chef.');setTimeout(()=>{try{vpQuitter()}catch(e){}},3500)}
 morts.forEach(p=>{try{mourirP(p,'au combat')}catch(e){}});setTimeout(()=>{if(VP&&VP.fight===F){F.E.forEach(e=>{if(e.root)VP.sc.remove(e.root)});VP.fight=null}},6000)}
// la boucle : on greffe le combat et les déclencheurs ; le pouvoir « brume »
{const vb=vpBoucle;let last=performance.now();vpBoucle=function(){const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;vb.apply(this,arguments);try{if(!VP)return;
 if(VP.embT==null)VP.embT=35+Math.random()*40;if(!VP.fight&&!VP.embFait&&VP.tps>VP.embT){VP.embFait=1;if(Math.random()<.75)vpEnnemis()}
 if(VP.fight)vpCombat(dt);vpPassage2DVoir()}catch(e){}}}
{const va=vpAction;vpAction=function(a){if(VP&&VP.fight&&!VP.fight.fin){if(a==='pouvoir'){if(S.voieC)return vpMsg('Le mystique n’aide pas le maître ici.');if((S.myst||0)<2)return vpMsg('Pas assez de mystique.');S.myst-=2;VP.fight.brume=15;return vpMsg('La brume monte de la ravine : les fusils ne voient plus rien (15 s).')}if(a==='chasser'){VP.cp.forEach(o=>{if(o.rc==='bouclier')o.rc='combat'});vpRolesUI('Tous à l’attaque !');return}}return va.apply(this,arguments)}}
// ÉTAPE 3. Les passages en 2D : une crevasse à franchir. Une fente sombre est marquée dans le lieu ; on s'en approche et l'on
// touche « Franchir » : la vue passe en 2D, de profil. On grimpe le rempart de prise en prise (flèches ou ZQSD, Espace pour sauter),
// on évite les pierres qui tombent ; le groupe suit. En haut : un raccourci et une découverte.
function vpCrevasseMettre(){if(!VP||VP.crev)return;const a=Math.random()*6.28,d=26+Math.random()*16,x=Math.cos(a)*d,z=Math.sin(a)*d;const g=new THREE.Mesh(new THREE.BoxGeometry(5,.3,1.4),new THREE.MeshBasicMaterial({color:0x111111}));g.position.set(x,VP.h(x,z)+.05,z);g.rotation.y=a;VP.sc.add(g);
 const r=new THREE.Mesh(new THREE.ConeGeometry(.5,3,5),new THREE.MeshLambertMaterial({color:0x5a5a52}));r.position.set(x+1.5,VP.h(x,z)+1.5,z);VP.sc.add(r);VP.crev={x,z,fait:0}}
function vpPassage2DVoir(){if(!VP)return;vpCrevasseMettre();const c=VP.crev,ch=VP.chef,d=Math.hypot(c.x-ch.x,c.z-ch.z);let b=$('vpCrev');
 if(d<5&&!c.fait&&!VP.fight){if(!b){b=document.createElement('button');b.id='vpCrev';b.textContent='⛰️ Franchir la crevasse (2D)';b.style.cssText='position:absolute;left:50%;top:58%;transform:translateX(-50%);font:700 14px Montserrat,sans-serif;background:#b5412b;color:#fff;border:0;border-radius:999px;padding:9px 18px;cursor:pointer';b.onclick=e=>{e.stopPropagation();vp2D()};VP.el.appendChild(b)}}else if(b)b.remove()}
function vp2D(){if(!VP)return;const b=$('vpCrev');if(b)b.remove();try{if(document.pointerLockElement)document.exitPointerLock()}catch(e){}VP.en2D=1;const V=VP;
 const W=Math.min(innerWidth,1100),H=Math.min(innerHeight-40,620),el=document.createElement('div');el.id='vp2';el.style.cssText='position:fixed;inset:0;z-index:9400;background:#0b0f0d;display:flex;align-items:center;justify-content:center;flex-direction:column;color:#efe9da;font-family:Montserrat,sans-serif';
 el.innerHTML='<canvas width="'+W+'" height="'+H+'" style="border-radius:6px;max-width:100%"></canvas><div style="margin-top:6px;font-size:13px">Grimpez jusqu’en haut : ←→ ou Q D pour aller de côté, ↑ ou Z pour grimper aux lianes, Espace pour sauter. Gare aux pierres. <button id="vp2X" style="margin-left:10px;font:600 12px Montserrat,sans-serif;background:transparent;color:#efe9da;border:1px solid #4a5a50;border-radius:999px;padding:4px 10px;cursor:pointer">Renoncer</button></div>';
 document.body.appendChild(el);const cv=el.querySelector('canvas'),x=cv.getContext('2d');
 // le rempart : des prises (plateformes) et des lianes, de bas en haut
 const P=[{x:0,y:H-20,w:W}],L=[];let y=H-20,prev={x:60,w:120};for(let i=1;i<9;i++){y-=62;const w=110+Math.random()*90,px=Math.max(30,Math.min(W-w-30,prev.x+prev.w/2-w/2+(Math.random()-.5)*300));P.push({x:px,y,w});if(i%3===0)L.push({x:px+w/2,y1:y,y2:y+62});prev={x:px,w}}const haut=P[P.length-1];
 const pl={x:60,y:H-40,vx:0,vy:0,sol:true,vie:3},roc=[],trail=[],K={};let fini=false,t0=performance.now(),last=t0;
 const kd=e=>{K[e.key.length===1?e.key.toLowerCase():e.key]=1;if(e.code==='Space'){e.preventDefault();if(pl.sol){pl.vy=-8.6;pl.sol=false}}e.stopPropagation()},ku=e=>{K[e.key.length===1?e.key.toLowerCase():e.key]=0};addEventListener('keydown',kd,true);addEventListener('keyup',ku,true);
 const fin=(ok)=>{if(fini)return;fini=true;removeEventListener('keydown',kd,true);removeEventListener('keyup',ku,true);el.remove();if(!VP)return;VP.en2D=0;VP.crev.fait=1;
  if(ok){const c=VP.crev;VP.chef.x=c.x+Math.cos(VP.yaw)*-6;VP.chef.z=c.z-Math.sin(VP.yaw)*6;VP.cp.forEach(o=>{o.x=VP.chef.x+(Math.random()-.5)*2;o.z=VP.chef.z+(Math.random()-.5)*2});S.myst=(S.myst||0)+1;VP.viv+=1;vpMsg('Passés ! Au-dessus de la crevasse : une source cachée et des plantes rares (+1 mystique).');journal('Le groupe franchit une crevasse des remparts et découvre une source cachée.')}
  else vpMsg(pl.vie<=0?'Trop de pierres : on redescend, meurtris.':'On renonce à la crevasse.');vpHud()};el.querySelector('#vp2X').onclick=()=>fin(false);
 const surLiane=()=>L.find(l=>Math.abs(pl.x-l.x)<16&&pl.y>l.y1-30&&pl.y<l.y2+4);
 const loop=()=>{if(fini)return;const now=performance.now(),dt=Math.min(.033,(now-last)/1000)*60;last=now;
  pl.vx=(K.ArrowLeft||K.q||K.a?-3.4:0)+(K.ArrowRight||K.d?3.4:0);const li=surLiane();if(li&&(K.ArrowUp||K.z||K.w)){pl.vy=-3;pl.sol=false}else if(li&&(K.ArrowDown||K.s)){pl.vy=2.4}else pl.vy+=.42*dt;
  pl.x=Math.max(10,Math.min(W-10,pl.x+pl.vx*dt));const oy=pl.y;pl.y+=pl.vy*dt;pl.sol=false;for(const p of P){if(pl.x>p.x-6&&pl.x<p.x+p.w+6&&oy<=p.y&&pl.y>=p.y&&pl.vy>=0){pl.y=p.y;pl.vy=0;pl.sol=true}}if(pl.y>H-20){pl.y=H-20;pl.vy=0;pl.sol=true}
  if(Math.random()<.02*dt){roc.push({x:30+Math.random()*(W-60),y:-10,vy:2})}roc.forEach(r=>{r.vy+=.2*dt;r.y+=r.vy*dt;if(!r.hit&&Math.hypot(r.x-pl.x,r.y-(pl.y-14))<16){r.hit=1;pl.vie--}});for(let i=roc.length-1;i>=0;i--)if(roc[i].y>H+20)roc.splice(i,1);
  trail.push({x:pl.x,y:pl.y});if(trail.length>400)trail.shift();
  // dessin
  const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#26352d');g.addColorStop(1,'#141a16');x.fillStyle=g;x.fillRect(0,0,W,H);x.fillStyle='#3a3a34';for(let i=0;i<14;i++){x.fillRect((i*97)%W,0,40,H)}
  P.forEach((p,i)=>{x.fillStyle=i===P.length-1?'#5f7a3a':'#6a6458';x.fillRect(p.x,p.y,p.w,10);x.fillStyle='#2f4a2a';x.fillRect(p.x,p.y-4,p.w,4)});
  x.strokeStyle='#4f7a3a';x.lineWidth=3;L.forEach(l=>{x.beginPath();x.moveTo(l.x,l.y1-30);for(let k=0;k<6;k++)x.lineTo(l.x+(k%2?5:-5),l.y1-30+k*(l.y2-l.y1+34)/5);x.stroke()});
  roc.forEach(r=>{x.fillStyle='#8a8478';x.beginPath();x.arc(r.x,r.y,8,0,7);x.fill()});
  const fig=(px,py,c)=>{x.fillStyle=c;x.beginPath();x.arc(px,py-24,5,0,7);x.fill();x.fillRect(px-4,py-19,8,13);x.fillRect(px-4,py-6,3,6);x.fillRect(px+1,py-6,3,6)};
  VP.cp.forEach((o,i)=>{const tp=trail[Math.max(0,trail.length-1-(i+1)*22)]||pl;fig(tp.x,tp.y,'#9a7a5a')});fig(pl.x,pl.y,'#f0c46a');
  x.fillStyle='#efe9da';x.font='600 14px Montserrat';x.fillText('Souffle '+'●'.repeat(Math.max(0,pl.vie)),12,22);x.fillText('↑ le haut du rempart',W-170,22);
  if(pl.vie<=0)return fin(false);if(pl.sol&&Math.abs(pl.y-haut.y)<2&&pl.x>haut.x&&pl.x<haut.x+haut.w)return fin(true);requestAnimationFrame(loop)};loop()}
// tant que la vue 2D est ouverte, la scène 3D ne reçoit pas les touches
{const va=vpAction;vpAction=function(a){if(VP&&VP.en2D)return;return va.apply(this,arguments)}}

// le regard du chef : un cône clair au sol montre où il regarde (là où vise la souris) ; à l'arrêt, il se tourne vers la visée
{const vb=vpBoucle;vpBoucle=function(){vb.apply(this,arguments);try{if(!VP||!VP.chef)return;const ch=VP.chef;if(!VP.cone){const sh=new THREE.Shape(),R=11,A=Math.PI/2.6;sh.moveTo(0,0);for(let i=0;i<=16;i++){const a=-A/2+A*i/16;sh.lineTo(Math.sin(a)*R,Math.cos(a)*R)}sh.lineTo(0,0);
  const g=new THREE.ShapeGeometry(sh);g.rotateX(Math.PI/2);VP.cone=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:0xffe9a0,transparent:true,opacity:.16,depthWrite:false,side:THREE.DoubleSide}));VP.sc.add(VP.cone)}
 const look=VP.yaw+Math.PI;VP.cone.position.set(ch.x,(ch.y!=null?ch.y:VP.h(ch.x,ch.z))+.08,ch.z);VP.cone.rotation.y=look;VP.cone.material.opacity=VP.fight&&!VP.fight.fin?.22:.14;
 const ln=['z','w','s','q','a','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].some(k=>VP.keys[k]);if(!ln&&ch.root){let d=look-ch.ang;d=Math.atan2(Math.sin(d),Math.cos(d));ch.ang+=d*.12;ch.root.rotation.y=ch.ang}}catch(e){}}}
