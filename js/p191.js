
// ===== p191 : grimper (vue incarnée), la tâche « cuisiner » visible au camp, et la garde du camp marron étoffée =====

// ----- les gestes : grimper (Mixamo « Climbing To Top »), se hisser pendu (« Freehang Climb »), cuisiner (mains qui s'affairent devant soi) -----
try{if(typeof MXGESTE188!=='undefined')Object.assign(MXGESTE188,{grimper:'Climbing_To_Top',grimper_pendu:'Freehang_Climb',cuisiner:'Pilot_Flips_Switches',danse_maloya:'Maloya_Femme',danse_maloya_homme:'Maloya_Homme',ceremonie:'Ceremonie_Mystique',joue_rouler:'Joue_Rouler',joue_bidon:'Joue_Bidon',joue_djembe:'Joue_Djembe',danse_malbar:'Danse_Malbar'})}catch(e){}

// ----- 1. Grimper : face à un ressaut (rocher, talus, rempart de terre) de 0,8 à 3,5 m, Espace fait grimper au lieu de sauter -----
// Le personnage s'accroche, se hisse (2,7 s), et se retrouve debout en haut, un pas plus loin. Plus haut que 2 m : il se hisse pendu, plus lentement.
function vpGrimpe191(){try{const V=VP;if(!V||V.grimpe||!V.chef)return false;const ch=V.chef,h=V.h,a=ch.ang||0,sx=Math.sin(a),sz=Math.cos(a),y0=h(ch.x,ch.z);
 let haut=-1,dist=0;for(const d of [.8,1.1,1.4]){const y=h(ch.x+sx*d,ch.z+sz*d)-y0;if(y>haut){haut=y;dist=d}}
 if(!(haut>.8&&haut<3.5))return false;const x1=ch.x+sx*(dist+.5),z1=ch.z+sz*(dist+.5),y1=h(x1,z1);if(y1-y0<.6)return false;
 const pendu=false;V.grimpe={t:0,dur:pendu?3.85:4.0,x0:ch.x,z0:ch.z,y0,x1,z1,y1,pendu};V.vy=0;try{vpMsg(pendu?'Vous vous hissez à la force des bras.':'Vous grimpez.')}catch(e){}return true}catch(e){return false}}
function vpGrimpeMaj191(dt,ch){const V=VP,G=V&&V.grimpe;if(!G)return;G.t+=dt;const k=Math.min(1,G.t/G.dur);
 // le corps monte avec l'animation ; on n'avance qu'à la fin, quand il passe le rebord
 const e=k*k*(3-2*k),av=Math.max(0,(k-.6)/.4);ch.x=G.x0+(G.x1-G.x0)*av;ch.z=G.z0+(G.z1-G.z0)*av;
 const monte=G.pendu?2.2:1.7;ch.y=G.y0+Math.max(0,(G.y1-G.y0)-monte)*e;V.vy=0;V.sol=true;
 if(k>=1){ch.x=G.x1;ch.z=G.z1;ch.y=G.y1;V.grimpe=null}}

// ----- 2. La tâche « cuisiner » : la cuisinière (le rôle mystique, quand personne n'est malade) est au camp, près d'un feu à trois pierres, la marmite dessus -----
const CUIS191={};
function marmite191(){const g=new THREE.Group(),pierre=new THREE.MeshLambertMaterial({color:0x4a4642}),pot=new THREE.MeshLambertMaterial({color:0x1d1b1a}),flamme=new THREE.MeshBasicMaterial({color:0xff8a30});
 for(let k=0;k<3;k++){const p=new THREE.Mesh(new THREE.DodecahedronGeometry(.13,0),pierre);const a=k*2.09;p.position.set(Math.cos(a)*.22,.08,Math.sin(a)*.22);g.add(p)}
 const m=new THREE.Mesh(new THREE.CylinderGeometry(.2,.16,.24,10),pot);m.position.y=.3;g.add(m);const b=new THREE.Mesh(new THREE.TorusGeometry(.2,.02,4,10),pot);b.rotation.x=Math.PI/2;b.position.y=.42;g.add(b);
 const f=new THREE.Mesh(new THREE.ConeGeometry(.12,.28,6),flamme);f.position.y=.12;g.add(f);g.userData.f=f;return g}
{const b0=bat;bat=function(k){b0.apply(this,arguments);try{if(!S||S.fin||(typeof K!=='undefined'&&K)||modeHist()||VP||typeof mfPoser!=='function'||typeof jourPh!=='function'||typeof scene==='undefined')return;const ph=jourPh(),vus={};
 (S.pp||[]).forEach(p=>{if(enGrp(p)||!adulte(p)||tacheDe(p)!=='cuisine')return;const c=T[campDe(p)];if(!c)return;if(ph<.2||ph>.86)return;
  const s=(p.id*53%100)/100,ox=Math.cos(s*6.28)*.12,oz=Math.sin(s*6.28)*.12,x=c.x+ox,z=c.z+oz,y=Math.max(0,alt(x,z))*VX+.02;
  mfPoser('w191_'+p.id,mfModeleDe(p),x,y,z,Math.atan2(-ox,-oz),'cuisiner');const f=MF.L['w191_'+p.id];
  // la marmite, à la taille du personnage, juste devant lui
  let M=CUIS191[c.i];if(!M){M=CUIS191[c.i]=marmite191();scene.add(M)}const sc=f&&f.o?f.o.scale.x:1;M.scale.setScalar(sc);const mx=x-ox*.55,mz=z-oz*.55;M.position.set(mx,Math.max(0,alt(mx,mz))*VX+.02,mz);M.visible=true;vus[c.i]=1;
  if(M.userData.f)M.userData.f.scale.y=.8+Math.random()*.5});
 for(const i in CUIS191)if(!vus[i])CUIS191[i].visible=false}catch(e){}}}

// ----- 3. La garde du camp marron, étoffée (Vie et Survie) -----
// Les marrons tenaient rarement un camp contre un détachement : ils le défendaient par des pièges et des guetteurs, ou fuyaient plus haut.
// D'où : l'alarme sonne plus souvent dès que la traque monte ; trois choix (défendre en personnage, fuir plus haut, laisser faire) ;
// et en défense, la première vague tombe en partie dans les pièges posés sur le sentier.
try{if(EV&&EV.garde186){const ev=EV.garde186,o0=ev.o;
 Object.defineProperty(ev,'o',{configurable:true,get(){if(S&&S.voieC)return o0;return [o0[0],{n:'🏃 Fuir plus haut, tous ensemble',d:'On abandonne le camp et les jardins, mais personne n’est pris. La traque perd la piste.',fx:{},f:()=>fuite191()},o0[1]]}})}}catch(e){}
function fuite191(){const v=Math.round((S.vivres||0)*.4);fx({vivres:-v,coh:-1});S.traque=Math.max(0,(S.traque||0)-15);journal('Le guetteur a crié à temps : tout le camp a fui plus haut par la ravine. Le détachement trouve les cases vides et brûle les jardins (vivres −'+v+'). La traque perd la piste.');try{rafraichir();panneau()}catch(e){}}
// l'alarme côté marron : dès que la traque passe 30 (avant : 50), un peu plus souvent quand elle monte
{const jt=jourTick;jourTick=function(){const r=jt.apply(this,arguments);try{if(!S||modeHist()||S.fin||S.voieC||!camps().length||VP)return r;const q=S.evq||(S.evq=[]);if(q.includes('garde186'))return r;
  const tq=S.traque||0;if(tq>30&&tq<=50&&Math.random()<.012+(tq-30)*.0006)q.push('garde186')}catch(e){}return r}}
// les pièges : à la première vague, chaque chasseur a une chance sur trois de tomber dans une fosse ou un collet (blessé, hors de combat)
{const gv=gardeVague186;gardeVague186=function(){const V=VP,G=V&&V.garde186,av=G?G.vague:0,n0=V&&V.fight?V.fight.E.length:0;gv.apply(this,arguments);try{if(!G||S.voieC||av!==0)return;let pris=0;
  V.fight.E.slice(n0).forEach(o=>{if(Math.random()<.34){o.hp=0;o.piege191=1;pris++}});if(pris)setTimeout(()=>{try{vpMsg('Les pièges du sentier ! '+pris+(pris>1?' chasseurs tombent':' chasseur tombe')+' dans les fosses avant d’arriver au camp.')}catch(e){}},2200)}catch(e){}}}

// ----- 4. Histoire : le moringue, d'après le Portail de l'esclavage (Région Réunion) et l'histoire de sa renaissance à Villèle -----
// Faits retenus : origine malgache (moraingy) ; pratiqué en cachette sur les habitations de café et de canne aux XVIIIe-XIXe s. ;
// un rond d'environ trois mètres en terre battue ; le tambourinaire (au roulèr, ou à défaut sur un bidon de fer-blanc) lance le rythme,
// en règle l'intensité et arbitre ; on se défie en annonçant son âge ; on se bat surtout des pieds et des talons ; des coups secrets
// (la bourrante, le talon malgas) ; après 1848 il reste aux affranchis, puis devient le loisir des pauvres créoles jusqu'en 1914.
const MOR191='Faits : le moringue vient du moraingy malgache ; pratiqué en cachette sur les habitations aux XVIIIe-XIXe siècles ; rond de terre battue d’environ trois mètres ; le tambourinaire, au roulèr, arbitre ; coups de pied et de talon. Source : Portail de l’esclavage, Région Réunion.';
EV.moringueH={y:1735,si:()=>true,tag:'Archive',an:'après 1734',hist:1,nat:MOR191,
 get t(){return S&&S.voieC?'Le rond du dimanche soir':'Le rond derrière les cases'},
 get b(){return S&&S.voieC?'Derrière les cases, on entend le roulèr. Un cercle de terre battue, trois mètres à peine : deux hommes s’y défient en annonçant leur âge, puis se battent des pieds et des talons, au rythme que le tambourinaire accélère ou ralentit. Le Code noir interdit ces rassemblements.':'Le dimanche soir, le roulèr appelle. Le vieux qui frappe la peau a été un combattant : c’est lui qui règle le rythme et arrête le combat. Un jeune entre dans le rond et dit son âge ; on lui répond. On se bat des pieds et des talons, comme au pays des ancêtres, de l’autre côté de la mer.'},
 get o(){return S&&S.voieC?[
  {n:'Fermer les yeux',d:'Les gens de l’habitation gardent leur dimanche. Cohésion +3.',fx:{coh:3}},
  {n:'Faire disperser le rond',d:'Le commandeur casse le tambour. L’ordre est gardé, la rancœur grandit : cohésion −3, et plus de fuites.',fx:{coh:-3},f:()=>{S.fuiteB=(S.fuiteB||0)+1;log('Le roulèr est brisé ; il en sera fait un autre, plus loin, dans un bidon de fer-blanc.')}},
  {n:'Regarder un combat (duel)',d:'Vous voyez de près le moraingy venu de Madagascar.',fx:{},f:()=>{try{ouvrirDuel('malgache','malgache',r=>{log(r&&r.ok?'Vous avez vu le talon malgas : un coup qu’on ne voit pas venir.':'Le combat s’arrête : le tambourinaire a levé la main.')})}catch(e){}}}]:[
  {n:'Entrer dans le rond (duel)',d:'Dire son âge, et se battre des pieds, au rythme du roulèr.',fx:{},f:()=>{try{ouvrirDuel('malgache','malgache',r=>{if(r&&r.ok){fx({coh:2});S.myst=(S.myst||0)+1;log('Vous sortez du rond vainqueur : on vous appelle désormais par un surnom.')}else{fx({coh:1});log('Vous avez perdu, mais le vieux au roulèr hoche la tête : vous reviendrez.')}})}catch(e){}}},
  {n:'Battre le roulèr',d:'Vous tenez le rythme : cohésion +3, mystique +1.',fx:{coh:3},f:()=>{S.myst=(S.myst||0)+1}},
  {n:'Rester à l’écart',d:'Le rond se tient sans vous.',fx:{}}]}};
EV.moringueA={y:1890,si:()=>true,tag:'Archive',an:'après 1889',hist:1,nat:MOR191+' Après 1848, il reste longtemps aux affranchis, puis, de 1880 à 1914, devient le principal loisir des pauvres créoles (Ligne Paradis, Le Brûlé, Trois-Bassins…).',
 t:'Le moringue des quartiers',b:'Depuis l’abolition, le moringue n’a plus à se cacher des commandeurs. Dans les cabarets et les ronds de terre battue des quartiers pauvres — Ligne Paradis, Le Brûlé, Trois-Bassins — les combattants ont des surnoms et des coups gardés secrets : la bourrante, le talon malgas. Les petits Blancs des Hauts viennent aussi s’y mesurer.',
 o:[{n:'Aller au rond (duel)',d:'Un combat contre un champion du quartier.',fx:{},f:()=>{try{ouvrirDuel('malgache','malgache',r=>{log(r&&r.ok?'Le quartier parle de vous.':'Le champion garde son rond.')})}catch(e){}}},{n:'Regarder et parier',d:'Cohésion +2.',fx:{coh:2}}]};
