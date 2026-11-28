// ===== p397 : les incarnations deviennent plus dures et plus vraies.
// (1) La pluie rend malade : trempé longtemps, sans feu ni abri, on a des frissons, puis la fièvre ; plus vite dans les Hauts.
//     Le feu, le repos à l'abri et le sec font tomber la fièvre. Une fièvre au bout fait perdre un souffle.
// (2) Le colon qui part explorer doit s'ouvrir un chemin dans la broussaille (B : le sabre d'abattis), et peut découvrir des
//     camps marrons qu'on ne connaissait pas. Les zones que l'histoire n'a pas encore ouvertes aux colons (les cirques avant 1750
//     environ, date approximative) se ferment : orage, éboulis, meute de chiens errants. Sous la pluie, au bord d'un rempart, on glisse.
// (3) Côté colon, on peut incarner le gouverneur porté en manchy par des esclaves, ou le commandeur qui mène la charrette
//     des champs et fait charger les récoltes (E près des tas). =====

// ---------- (1) la fièvre ----------
function fievre397(I,dt){const p=I.pl301,h=I.h;if(!p||!I.st||!h)return;let f=I.fie397||0;const st=I.st;
 const feu=st.feu&&Math.hypot(st.feu.x-h.x,st.feu.z-h.z)<3,froid=(I.C&&Math.max(I.C.b0||0,I.C.b1||0)>=2)?1:0;
 if(p.mouille>60&&!feu)f+=dt*(.55+.45*froid);else if(p.mouille>30&&!feu)f+=dt*.12*(1+froid);
 else f-=dt*(feu?2.2:(I.repos&&p.abri?1.3:.15));
 f=Math.max(0,Math.min(100,f));const avant=I.fie397||0;I.fie397=f;
 if(f>35){I.endu=Math.max(0,(I.endu==null?100:I.endu)-dt*1.1*(f/100));st.soif=Math.max(0,st.soif-dt*.12*(f/100))}
 if(f>70){I.yaw+=Math.sin(performance.now()/700)*dt*.12}
 if(avant<35&&f>=35)incMsg287('Vous grelottez : les habits trempés, le vent des Hauts. Un feu, ou un abri, vite.');
 if(avant<70&&f>=70)incMsg287('La fièvre monte. Tout tourne un peu. Il faut se sécher au feu et se reposer à l’abri (3).');
 if(f>=100){I.fie397=60;I.souffle--;incHud287();incMsg287('La fièvre vous abat : vous perdez un souffle.');if(I.souffle<=0)mort397(I,'de la fièvre, trempé par la pluie')}}
{const h0=hud290;hud290=function(){const r=h0.apply(this,arguments);try{const I=INC,d=$('incS');if(I&&d&&(I.fie397||0)>20)d.innerHTML+='<br><small>🤒 '+(I.fie397>70?'Fièvre':I.fie397>35?'Frissons':'Il fait froid')+'</small>'}catch(e){}return r}}

// la mort d'un incarné : le récit, puis la carte ; la personne meurt aussi dans la partie si on la retrouve
function mort397(I,cause){if(!I||I.mort397)return;I.mort397=1;I.pause=1;const n=(I.C&&I.C.heros&&I.C.heros.n)||'';
 const fin=()=>{try{const p=(S.pp||[]).find(q=>q.n===n);if(p&&typeof mourirP==='function')mourirP(p,cause)}catch(e){}try{incQuitter287()}catch(e){}};
 incNarre287('Mort en chemin',n+' meurt '+cause+'.','L’île n’est pas tendre avec ceux qui s’y perdent : pluies, chiens retournés à l’état sauvage, éboulis, remparts.',fin)}

// ---------- (2) explorer : la broussaille, les dangers, les découvertes ----------
const FERME397=[[55.38,55.48,-21.11,-21.03,'le cirque de Mafate'],[55.41,55.51,-21.18,-21.09,'le cirque de Cilaos'],[55.47,55.58,-21.11,-21.00,'le cirque de Salazie']];
function ferme397(lon,lat){if(!S||!S.voieC||(S.year||0)>=1750)return null;const z=FERME397.find(([a,b,c,d])=>lon>=a&&lon<=b&&lat>=c&&lat<=d);return z?z[4]:null}
function finRoute397(I){try{const R=I.C.route,q=R[R.length-1];return q}catch(e){return null}}
function rocher397(I,x,z,r){const m=new THREE.Mesh(new THREE.IcosahedronGeometry(r,0),new THREE.MeshLambertMaterial({color:0x6e6a64}));m.position.set(x,I.hAt(x,z)+6+Math.random()*3,z);m.userData.vy=0;I.S3.add(m);return m}
function chiens397(I){if(I.ch397)return;const h=I.h,L=[];I.ch397=L;const a0=I.yaw+Math.PI;
 for(let i=0;i<4;i++){const o={x:h.x+Math.sin(a0+i*.4-.6)*16,z:h.z+Math.cos(a0+i*.4-.6)*16,ang:0,root:null,mx:null,clip:'',mord:0};L.push(o);
  try{p3Charge('ani_chien');const at=()=>{if(!INC||INC!==I)return;if(!P3.buf['ani_chien']){if(P3.ok['ani_chien']===0){o.root=new THREE.Mesh(new THREE.BoxGeometry(.3,.4,.8),new THREE.MeshLambertMaterial({color:0x3a2e24}));I.S3.add(o.root);return}setTimeout(at,300);return}
   p3Instance('ani_chien').then(J=>{if(!INC||INC!==I)return;const g=J.g.scene;g.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(g),l=Math.max(b.max.x-b.min.x,b.max.z-b.min.z)||1;g.scale.multiplyScalar(.95/l);o.root=g;o.anim=J.g.animations;o.mx=J.mx;I.S3.add(g);incClip287(o,'marche')}).catch(()=>{})};at()}catch(e){}}
 incMsg287('Une meute de chiens retournés à l’état sauvage ! Courez (Maj), grimpez (G) là où ils ne suivent pas, ou tenez-les au feu.')}
function dangers397(I,dt){const D=I.col397;if(!D||I.pause||I.fini)return;const h=I.h,now=performance.now(),wet=I.pl301?I.pl301.int||0:0;
 // la zone fermée par l'histoire : le passage se refuse
 if(D.ferme&&!D.haz&&I.cp>.3){const steep=Math.abs(I.hAt(h.x+1,h.z)-I.hAt(h.x-1,h.z))+Math.abs(I.hAt(h.x,h.z+1)-I.hAt(h.x,h.z-1));
  D.haz=steep>2.2?'eboulis':((S.year||0)>=1680&&Math.random()<.5)?'chiens':'orage';D.t=now;
  if(D.haz==='orage'&&I.pl301){I.pl301.cible=1;I.pl301.proch=now+60000;incMsg287('Le ciel se ferme sur '+D.ferme+'. Le vent, l’eau, le brouillard : impossible d’aller plus loin.')}
  if(D.haz==='eboulis'){incMsg287('Un grondement au-dessus : la paroi lâche !');D.roc=[];for(let i=0;i<7;i++){const a=I.yaw+Math.PI+(Math.random()-.5)*1.2,d=1.5+Math.random()*4;D.roc.push(rocher397(I,h.x+Math.sin(a)*d,h.z+Math.cos(a)*d,.3+Math.random()*.4))}}
  if(D.haz==='chiens')chiens397(I)}
 // ailleurs, la chance (ou la malchance) : chiens errants, éboulis sous la pluie
 if(!D.ferme&&now>(D.proch||0)){D.proch=now+40000;if(!I.ch397&&(S.year||0)>=1680&&Math.random()<.14)chiens397(I);else if(wet>.5&&Math.random()<.25&&!D.roc){D.roc=[];incMsg287('Sous la pluie, la pente se défait : des pierres roulent !');for(let i=0;i<4;i++){const a=I.yaw+Math.PI+(Math.random()-.5),d=2+Math.random()*3;D.roc.push(rocher397(I,h.x+Math.sin(a)*d,h.z+Math.cos(a)*d,.25+Math.random()*.3))}}}
 // les pierres tombent
 (D.roc||[]).forEach(m=>{if(m.userData.pose)return;m.userData.vy-=18*dt;m.position.y+=m.userData.vy*dt;const g=I.hAt(m.position.x,m.position.z);if(m.position.y<=g+.2){m.position.y=g+.2;m.userData.pose=1;if(Math.hypot(m.position.x-h.x,m.position.z-h.z)<1.3){I.souffle--;incHud287();incMsg287('Une pierre vous frappe.');if(I.souffle<=0)mort397(I,'sous un éboulis')}}});
 // les chiens chassent
 if(I.ch397){const feu=I.st&&I.st.feu&&Math.hypot(I.st.feu.x-h.x,I.st.feu.z-h.z)<4;let loin=0;
  I.ch397.forEach(o=>{const dx=h.x-o.x,dz=h.z-o.z,d=Math.hypot(dx,dz)||1;if(d>30)loin++;const peur=feu||I.grimpe;const v=peur?-2:6.4;if(d>1){o.x+=dx/d*v*dt;o.z+=dz/d*v*dt}o.ang=Math.atan2(dx*(peur?-1:1),dz*(peur?-1:1));incClip287(o,'marche');
   if(o.root){o.root.position.set(o.x,I.hAt(o.x,o.z),o.z);o.root.rotation.y=o.ang;if(o.mx)o.mx.update(dt*1.6)}
   if(d<1.3&&!peur){o.mord-=dt;if(o.mord<=0){o.mord=1.6;I.souffle--;I.endu=Math.max(0,(I.endu||0)-12);incHud287();incMsg287('Un chien vous mord !');if(I.souffle<=0)mort397(I,'sous les crocs d’une meute de chiens errants')}}});
  if(!D.chT)D.chT=now;if((loin===I.ch397.length||now-D.chT>45000)&&!D.ferme){I.ch397.forEach(o=>{if(o.root)I.S3.remove(o.root)});I.ch397=null;D.chT=0;incMsg287('La meute a renoncé.')}}
 // la zone fermée : au bout de quelques secondes, on fait demi-tour
 if(D.ferme&&D.haz&&!D.fin&&now-D.t>9000&&!I.mort397){D.fin=1;I.pause=1;incNarre287('Le passage est fermé','On ne passe pas : '+({orage:'l’orage a noyé le sentier',eboulis:'l’éboulis a fermé la ravine',chiens:'la meute garde le passage'})[D.haz]+'. '+D.ferme[0].toUpperCase()+D.ferme.slice(1)+' restera inconnu des colons encore quelque temps.','Les cirques ne sont parcourus par les colons qu’au milieu du XVIIIᵉ siècle, d’abord par les chasseurs de marrons (date approximative pour le jeu).',()=>{try{log('🧭 L’exploration vers '+D.ferme+' a échoué : le passage était fermé.')}catch(e){}incQuitter287()})}
 // au bord d'un rempart, sous la pluie, on glisse
 if(wet>.4&&(I.keys.z||I.keys.w)){const a=I.yaw,fx=-Math.sin(a),fz=-Math.cos(a),dr=I.hAt(h.x,h.z)-I.hAt(h.x+fx*1.6,h.z+fz*1.6);
  if(dr>2.6&&Math.random()<dt*.6*wet){I.souffle-=2;incHud287();incMsg287('La terre mouillée part sous vos pieds au bord du rempart !');h.x+=fx*1.2;h.z+=fz*1.2;if(I.souffle<=0)mort397(I,'en glissant d’un rempart sous la pluie')}}}
// la broussaille : hors sentier, en forêt, le colon avance à peine, sauf à tailler (B)
function brousse397(I,x0,z0,dt){const D=I.col397,h=I.h;if(!D||!D.colon||I.pause)return;const dx=h.x-x0,dz=h.z-z0,dd=Math.hypot(dx,dz);if(dd<1e-4)return;
 if(I.dPiste(h.x,h.z)<2.2)return;let n=0;for(const a of I.arb){if(Math.abs(a.x-h.x)<3&&Math.abs(a.z-h.z)<3&&++n>=3)break}if(n<3)return;
 const taille=I.keys.b&&(I.endu==null||I.endu>5),f=taille?.8:.35;h.x=x0+dx*f;h.z=z0+dz*f;
 if(taille){I.endu=Math.max(0,(I.endu==null?100:I.endu)-dt*7);D.cut=(D.cut||0)+dd*f;if(D.cut>1.1&&(D.souches||0)<160){D.cut=0;D.souches=(D.souches||0)+1;const m=new THREE.Mesh(new THREE.CylinderGeometry(.04,.06,.35,5),new THREE.MeshLambertMaterial({color:0x6a7a3a}));const a=Math.random()*6.28;m.position.set(h.x+Math.sin(a)*.7,I.hAt(h.x,h.z)+.15,h.z+Math.cos(a)*.7);m.rotation.z=(Math.random()-.5)*1.2;I.S3.add(m)}}
 else if(!D.msgB||performance.now()-D.msgB>9000){D.msgB=performance.now();incMsg287('La broussaille est épaisse : maintenez B pour ouvrir un chemin au sabre d’abattis.')}}

// ---------- (3) le manchy du gouverneur, la charrette du commandeur ----------
Object.assign(ACT316,{
 manchy:{t:'Le manchy',obj:'Se faire porter jusqu’au quartier voisin',intro:'Le gouverneur ne marche pas sur les sentiers : on le porte en manchy, une chaise sous un dais, sur deux brancards, à l’épaule de quatre esclaves. Vous pouvez presser les porteurs (Maj)… ils le paient de leur souffle.',finT:'Le gouverneur est arrivé. Les porteurs posent le manchy.',gain:{savoir:1}},
 charrette:{t:'La charrette des champs',obj:'Mener la charrette et faire charger les récoltes (E près des tas)',intro:'Le commandeur mène la charrette à bœufs le long des champs. Aux tas de récolte, il fait charger (E). Ceux qui chargent sont des esclaves de l’habitation.',finT:'La charrette rentre au magasin.',gain:{}}});
let P397=null;
{const o0=incOuvrir287;incOuvrir287=function(k,ci){const d=(k==='libre316')?P397:null;if(d)P397=null;try{if(d&&(d.k==='manchy'||d.k==='charrette')){const C=INC287.libre316.ch[0];C.chas=0;
  if(d.k==='manchy')C.comp=[{n:'un porteur',m:'jeune_pagne'},{n:'un porteur',m:'jeune_pagne'},{n:'un porteur',m:'homme_chemise'},{n:'un porteur',m:'jeune_pagne'}];
  if(d.k==='charrette')C.comp=[{n:'une travailleuse',m:'femme_travail'},{n:'un travailleur',m:'jeune_pagne'}]}}catch(e){}
 const r=o0.apply(this,arguments);if(d)setTimeout(()=>{try{prep397(INC,d.k)}catch(e){console.warn(e)}},0);return r}}
{const i0=incarner316;incarner316=function(k,t,hx){
 if(k==='manchy')hx={n:'Le gouverneur',m:'gouverneur'};else if(k==='charrette')hx={n:'Le commandeur',m:'commandeur'};else if(k==='explore'&&S&&S.voieC&&!hx)hx={n:'un habitant',m:'p7_colon'};
 P397={k};return i0.call(this,k,t,hx)}}
function prep397(I,k){if(!I||!I.libre316)return;const q=finRoute397(I);
 if(k==='explore'){I.col397={colon:!!S.voieC,ferme:q?ferme397(q[0],q[1]):null};const F0=I.F;I.F=function(){try{decouvre397(q)}catch(e){}return F0&&F0.apply(this,arguments)}}
 if(k==='manchy')manchy397(I);if(k==='charrette')charrette397(I)}
function decouvre397(q){if(!q||!S)return;const [x,z]=xz(q[0],q[1]);let n=0,mar=[];T.forEach(t=>{if(Math.hypot(t.x-x,t.z-z)<1.6){S.t[t.i]=S.t[t.i]||{};if(!S.t[t.i].s){S.t[t.i].s=1;n++}}});
 try{if(typeof MAR251!=='undefined'&&MAR251.vus)MAR251.vus.forEach(c=>{if(c.t&&Math.hypot(c.t.x-x,c.t.z-z)<1.6)mar.push(c.n)})}catch(e){}
 if(n)log('🧭 L’exploration découvre '+n+' case'+(n>1?'s':'')+(mar.length?' — et '+(S.voieC?'un camp marron que les colons ne connaissaient pas : ':'les traces d’un camp : ')+mar.join(', '):'')+'.');try{peindre()}catch(e){}}
function manchy397(I){const g=new THREE.Group(),bois=new THREE.MeshLambertMaterial({color:0x5a3a22}),dais=new THREE.MeshLambertMaterial({color:0x8a2a22,side:THREE.DoubleSide}),toile=new THREE.MeshLambertMaterial({color:0xe8dcc0,side:THREE.DoubleSide});
 [-.38,.38].forEach(x=>{const p=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,4.4,6),bois);p.rotation.x=Math.PI/2;p.position.set(x,1.35,0);g.add(p)});
 const siege=new THREE.Mesh(new THREE.BoxGeometry(.85,.12,1.1),bois);siege.position.y=.62;g.add(siege);
 [[-.4,-.52],[.4,-.52],[-.4,.52],[.4,.52]].forEach(([x,z])=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,1.7,5),bois);m.position.set(x,1.45,z);g.add(m)});
 const toit=new THREE.Mesh(new THREE.BoxGeometry(1,.08,1.25),dais);toit.position.y=2.32;g.add(toit);
 [[0,-.55,0],[0,.55,0],[-.42,0,Math.PI/2],[.42,0,Math.PI/2]].forEach(([x,z,r])=>{const c=new THREE.Mesh(new THREE.PlaneGeometry(r?1.1:.84,1.55),toile);c.position.set(x,1.5,z);c.rotation.y=r;g.add(c)});
 I.S3.add(g);I.man397={g,fat:0,pose:0};incMsg287('Le manchy est porté par quatre esclaves. Maj : presser les porteurs.')}
function charrette397(I){const C={n:0,tas:[],o:{root:null},b:{root:null}};I.cha397=C;
 const charge=(n,o,lg)=>{try{p3Charge(n);const at=()=>{if(!INC||INC!==I)return;if(!P3.buf[n]){if(P3.ok[n]===0)return;setTimeout(at,300);return}p3Instance(n).then(J=>{if(!INC||INC!==I)return;const s=J.g.scene;s.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(s),l=Math.max(b.max.x-b.min.x,b.max.z-b.min.z)||1;s.scale.multiplyScalar(lg/l);o.root=s;o.anim=J.g.animations;o.mx=J.mx;I.S3.add(s);if(o.anim&&o.anim.length)incClip287(o,'marche')}).catch(()=>{})};at()}catch(e){}};
 charge('bat_charrette',C.o,2.6);charge('ani_boeufc',C.b,2.3);
 const cafe=(S.year||0)<1815;[.3,.55,.8].forEach(f=>{const i=Math.floor(I.N*f),p=I.P[i],q=I.P[Math.min(I.N-1,i+1)];if(!p||!q)return;const dx=q[0]-p[0],dz=q[1]-p[1],l=Math.hypot(dx,dz)||1,x=p[0]-dz/l*1.8,z=p[1]+dx/l*1.8;const m=new THREE.Group();
  for(let k=0;k<6;k++){const s=cafe?new THREE.Mesh(new THREE.SphereGeometry(.28,6,5),new THREE.MeshLambertMaterial({color:0xb09a6a})):new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,1.6,6),new THREE.MeshLambertMaterial({color:0x8aa050}));s.position.set((k%3-1)*.4,(cafe?.25:.2)+Math.floor(k/3)*.32,0);if(!cafe)s.rotation.z=Math.PI/2;m.add(s)}
  m.position.set(x,I.hAt(x,z),z);I.S3.add(m);C.tas.push({x,z,m,pris:0})});
 incMsg287((cafe?'Les sacs de café':'Les bottes de canne')+' attendent au bord des champs : approchez la charrette et faites charger (E).');
 const F0=I.F;I.F=function(){try{if(C.n){S.vivres=(S.vivres||0)+C.n;log('🐂 La charrette rentre au magasin avec '+C.n+' charge'+(C.n>1?'s':'')+' ('+(cafe?'café':'canne')+').')}else log('🐂 La charrette rentre à vide.')}catch(e){}return F0&&F0.apply(this,arguments)}}
// la touche E : charger la charrette près d'un tas
{const t0=inc290Touche;inc290Touche=function(k,e){const I=INC;try{if(k==='e'&&I&&I.cha397){const h=I.h,T0=I.cha397.tas.find(t=>!t.pris&&Math.hypot(t.x-h.x,t.z-h.z)<3);if(T0){T0.pris=1;occ290(I,'On charge la charrette — les dos se courbent sous la charge',3,()=>{T0.m.visible=false;I.cha397.n++;incMsg287('Chargé : '+I.cha397.n+' sur 3.')});return}}}catch(x){}return t0.apply(this,arguments)}}
// la boucle : fièvre, dangers, broussaille, porteurs, charrette
{const b=incBoucle287;let t=performance.now();incBoucle287=function(){const I=INC,n=performance.now(),dt=Math.min(.1,(n-t)/1000);t=n;let x0=0,z0=0,cps=null;
 try{if(I&&I.h){x0=I.h.x;z0=I.h.z;if(I.man397){cps=I.cps;I.cps=[];I.baisse=1;I.h.yo=.6;I.h.vy=0}}}catch(e){}
 const r=b.apply(this,arguments);
 try{if(!I||INC!==I)return r;if(cps)I.cps=cps;if(I.pause||I.duel)return r;
  if(I.pl301&&I.st)fievre397(I,dt);if(I.col397){brousse397(I,x0,z0,dt);dangers397(I,dt)}
  const h=I.h,mv=Math.hypot(h.x-x0,h.z-z0)>1e-3;
  if(I.man397){const M=I.man397,a=h.ang||0,fx=Math.sin(a),fz=Math.cos(a);
   if(I.keys.Shift&&mv){M.fat=Math.min(100,M.fat+dt*9);if(!M.msg||n-M.msg>8000){M.msg=n;incMsg287('Les porteurs pressent le pas. Leurs épaules saignent sous les brancards.')}}else M.fat=Math.max(0,M.fat-dt*3);
   if(M.fat>=100&&!M.pose){M.pose=n+6000;incMsg287('Les porteurs n’en peuvent plus : ils posent le manchy un moment.')}if(M.pose){if(n<M.pose){h.x=x0;h.z=z0}else{M.pose=0;M.fat=55}}
   M.g.position.set(h.x,I.hAt(h.x,h.z)+.05,h.z);M.g.rotation.y=a;
   (I.cps||[]).forEach((o,i)=>{const av=i<2?1.85:-1.85,lat=i%2?.38:-.38;o.x=h.x+fx*av+fz*lat;o.z=h.z+fz*av-fx*lat;o.ang=a;incClip287(o,mv?'marche':'repos_debout');if(o.root){o.root.position.set(o.x,I.hAt(o.x,o.z),o.z);o.root.rotation.y=a;if(o.mx)o.mx.update(1/60)}})}
  if(I.cha397){const C=I.cha397,tr=I.trace,suit=(o,i,dy)=>{const p=tr[Math.min(tr.length-1,i)],q=tr[Math.min(tr.length-1,i+6)];if(!p||!o.root)return;const ang=q?Math.atan2(p[0]-q[0],p[1]-q[1]):0;o.root.position.set(p[0],I.hAt(p[0],p[1])+(dy||0),p[1]);if(q&&Math.hypot(p[0]-q[0],p[1]-q[1])>.01)o.root.rotation.y=ang;if(o.mx){if(mv)o.mx.update(dt)}};
   suit(C.b,28);suit(C.o,70)}
 }catch(e){}return r}}
// les choix dans le panneau : côté colon, sur son village, avant l'abolition
{const pn=panneau;panneau=function(){const r=pn.apply(this,arguments);try{if(!S||S.fin||!sel||!S.voieC||typeof VIE315!=='undefined'&&VIE315.on)return r;const d=$('inc316');if(!d)return r;const t=sel;
  if(!camps().some(c=>c.i===t.i)||(S.year||0)>=1848||d.querySelector('[data-i397]'))return r;
  const B=[];if((S.year||0)>=1665)B.push(['manchy','🪑 Se faire porter en manchy','Incarner le gouverneur, porté par des esclaves']);if((S.year||0)>=1670)B.push(['charrette','🐂 Mener la charrette des champs','Incarner le commandeur']);
  B.forEach(([k,n,ti])=>{const b=document.createElement('button');b.className='bt';b.dataset.i397=k;b.style.cssText='display:block;width:100%;text-align:left;margin:4px 0';b.innerHTML='<b>'+n+'</b><small style="display:block;opacity:.75;font-weight:400">'+ti+'</small>';b.onclick=()=>incarner316(k,t);d.appendChild(b)})}catch(e){}return r}}
// le commandeur est un homme de l'habitation : il a les gestes des colons, pas les talents des marrons
{const c0=camp344;camp344=function(I){try{if(I&&I.C&&I.C.heros&&/commandeur/.test(I.C.heros.m||''))return 'colon344'}catch(e){}return c0.apply(this,arguments)}}
