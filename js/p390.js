// ===== p390 : la faune des premiers temps se revoit sur l'île. Depuis que le camp se voit sur la carte, les solitaires (l'ibis de
// Bourbon), les drontes et les dodos (fiction du jeu) n'apparaissaient plus nulle part. Ils marchent de nouveau dans les forêts
// tant qu'ils vivent dans votre histoire, et dans les parcs des camps quand on les élève. On peut aussi, en Histoire, les protéger
// et élever le pigeon rose : ce qu'on protège dure plus longtemps — jusqu'à survivre, dans une uchronie. =====
// l'élevage n'est plus réservé au mode Jeu
function aniJeu(){return !!S&&(typeof grpOn!=='function'||grpOn())}
const F390={proto:{}};
function oiseau390(k){if(F390.proto[k])return F390.proto[k].clone(true);const g=new THREE.Group(),M=c=>new THREE.MeshLambertMaterial({color:c}),S3=(r,c,x,y,z,sx=1,sy=1,sz=1)=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(r,1),M(c));m.position.set(x,y,z);m.scale.set(sx,sy,sz);g.add(m);return m},
 C3=(r1,r2,h,c,x,y,z,rx=0,rz=0)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,6),M(c));m.position.set(x,y,z);m.rotation.set(rx,0,rz);g.add(m);return m};
 if(k==='sol'){// solitaire : grand ibis blanc, bout des ailes noir, bec noir long et courbe, pattes sombres
  S3(.5,0xf2efe6,0,.9,0,1.25,.9,.85);S3(.22,0x1a1a1a,-.55,.95,0,1,.5,.9);C3(.09,.12,.6,0xece8de,.45,1.35,0,0,-.5);S3(.16,0x2a2622,.72,1.62,0);C3(.035,.02,.5,0x1a1a1a,.98,1.5,0,0,-1.1);C3(.04,.04,.6,0x3a3430,.12,.3,.12);C3(.04,.04,.6,0x3a3430,.12,.3,-.12)}
 else if(k==='dro'){// dronte (fiction du jeu) : massif, gris-brun, gros bec crochu
  S3(.6,0x8a8378,0,.8,0,1.1,1,1);S3(.28,0x8f887c,.55,1.25,0);C3(.12,.06,.35,0xb8a070,.82,1.2,0,0,-1.3);S3(.15,0xe8e0d0,-.6,1.0,0);C3(.06,.06,.4,0xc9a85a,.1,.2,.15);C3(.06,.06,.4,0xc9a85a,.1,.2,-.15)}
 else {// dodo (fiction du jeu à Bourbon) : gris bleuté, bec jaune-vert crochu, touffe de plumes claires
  S3(.6,0x6f7478,0,.8,0,1.1,1,1);S3(.27,0x707678,.55,1.25,0);C3(.11,.06,.38,0xb7b25a,.83,1.2,0,0,-1.3);S3(.17,0xd8d6c8,-.62,1.05,0);C3(.06,.06,.4,0xc9b060,.1,.2,.15);C3(.06,.06,.4,0xc9b060,.1,.2,-.15)}
 g.traverse(o=>{if(o.isMesh){o.castShadow=false}});F390.proto[k]=g;return g.clone(true)}
const vivant390=k=>{try{if(!S)return false;if(k==='sol'){const x=S.disp135x&&S.disp135x.solitaire;if(x!=null)return false;if(!S.disp135x&&S.year>=1715)return false}return fa(k)>0}catch(e){return false}};
{const vb=viv108Bati;viv108Bati=function(){const g=vb.apply(this,arguments);try{if(!S)return g;const P=T.filter(t=>Math.hypot(t.x-camT.x,t.z-camT.z)<Math.max(4,dist*.7)&&seen(t)&&!t.bare&&t.alt>5&&t.alt<1600);let nb=0;
  const pose=(k,x,z,pc)=>{const o=oiseau390(k);if(!o.userData.m393)o.scale.setScalar(k==='sol'?.055:.06);o.position.set(x,Math.max(0,alt(x,z))*VX,z);o.rotation.y=Math.random()*6.28;g.add(o);VIV108.b.push({k:'f390',o,cx:x,cz:z,ph:Math.random()*6,pc:!!pc});nb++};
  // dans les forêts : les bêtes sauvages, d'autant plus nombreuses qu'il en reste
  [['sol',t=>t.forest||t.alt>300],['dro',t=>zDr(t)],['dodo',t=>zDo(t)]].forEach(([k,ok])=>{if(!vivant390(k))return;const f=Math.min(1,fa(k)/100);
   P.forEach(t=>{if(!ok(t)||camps().some(c=>c.i===t.i))return;const q=Math.round(f*2.2*(((t.i*13)%10)/10+.3));for(let j=0;j<q&&nb<30;j++){const a=j*2.1+t.i,d=.18+.25*((j*7+t.i)%5)/5;pose(k,t.x+Math.cos(a)*d,t.z+Math.sin(a)*d)}})});
  // dans les parcs des camps : ceux qu'on élève
  camps().forEach((c,ci)=>{const t=T[c.i];if(!t||Math.hypot(t.x-camT.x,t.z-camT.z)>Math.max(4,dist*.7))return;['sol','dro','dodo'].forEach((k,ki)=>{const n=Math.min(5,Math.round(((S.ani||{})[k]||0)/(camps().length||1)));for(let j=0;j<n;j++){const a=ki*2.1+j*.6+ci,d=.55+j*.04;pose(k,t.x+Math.cos(a)*d,t.z+Math.sin(a)*d,1)}})});
 }catch(e){}return g}}
// ils marchent un peu, picorent, et tournent la tête
(function b390(){requestAnimationFrame(b390);try{if(!VIV108.g||!VIV108.g.visible)return;const s=performance.now()/1000;VIV108.b.forEach(b=>{if(b.k!=='f390')return;const r=b.pc?.03:.08,a=s*.15+b.ph;b.o.position.x=b.cx+Math.cos(a)*r;b.o.position.z=b.cz+Math.sin(a)*r;b.o.rotation.y=-a;b.o.rotation.z=Math.max(0,Math.sin(s*1.3+b.ph))*.35})}catch(e){}})();
// protéger, élever : ce qu'on protège dure plus longtemps
{const p0=pression135;pression135=function(k){const r=p0.apply(this,arguments);try{if(S&&S.prot390&&S.prot390[k]){r.m*=.25;r.cause=r.cause||'peu de chose : on les protège'}}catch(e){}return r}}
const PROT390=[['solitaire','Protéger les solitaires','Interdire de les prendre au bâton autour du camp. Ils durent bien plus longtemps — peut-être assez pour survivre.'],
 ['perroquets','Protéger les perroquets','Ne plus les tirer pour la plume ni pour la marmite.'],['oiseaubleu','Protéger l’oiseau bleu','Laisser tranquilles les marais où il niche.'],['tortues','Protéger les tortues de terre','Ne plus en charger les navires.']];
{const a0=actions;actions=function(t){const A=a0.apply(this,arguments);try{const o=S&&S.t[t.i];if(!o||o.b!=='camp')return A;
  PROT390.forEach(([k,n,d])=>{const mort=S.disp135x&&S.disp135x[k]!=null;if(mort||(S.prot390||{})[k])return;A.push({id:'prot390_'+k,n:'🛡️ '+n,c:1,d})});
  if(typeof pig111Fact==='function'&&pig111Fact()>0&&!S.pigEl390)A.push({id:'pig390',n:'🐦 Élever les pigeons roses',c:1,d:'Une volière près des cases, du grain, et on n’en mange plus : le pigeon rose de Bourbon ne s’éteindra pas chez vous.'})}catch(e){}return A}}
{const g0=agir;agir=function(t,id,libre){if(!/^prot390_|^pig390$/.test(id))return g0.apply(this,arguments);try{if(!libre){if(S.bras<1)return false;snap();S.bras-=1}
  if(id==='pig390'){S.pigEl390=1;S.pigFin111=9999;log('🐦 Une volière de pigeons roses près des cases : on les nourrit, on ne les mange plus.')}
  else{const k=id.slice(8);(S.prot390=S.prot390||{})[k]=1;const P=PROT390.find(x=>x[0]===k);log('🛡️ '+(P?P[1]:k)+' : c’est décidé autour du feu.')}
  try{peindre()}catch(e){}sauve();return true}catch(e){return false}}}
