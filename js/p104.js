// ===== p104 : les légendes jouées sur la carte (un repère s'allume, puis la caméra descend sur la scène animée) ;
// chaque légende a sa version selon le point de vue (colon, marron) et selon l'uchronie. Procession de la cavadee,
// oratoires rouges de saint Expédit, lieux-dits, la garantie du sorcier. =====

// ----- 1. Lieux-dits qui manquaient -----
[['Bébour',55.565,-21.110,'Forêt de nuages des Hauts de Saint-Benoît'],['Bélouve',55.545,-21.060,'Forêt de nuages au-dessus de Salazie'],['Bérive',55.505,-21.290,'Pentes des Hauts du Tampon'],['Bois Blanc',55.795,-21.200,'Dernier hameau avant le Grand Brûlé'],['Cap Méchant',55.730,-21.372,'Falaises de lave noire sous la houle'],['Grand Bassin',55.556,-21.226,'Îlet sans route, au fond d’un ravin'],['Grand Étang',55.645,-21.095,'Le plus grand plan d’eau de l’intérieur'],['Le Baril',55.700,-21.378,'Village du littoral sauvage'],['Le Tremblet',55.800,-21.290,'Hameau au bord du Grand Brûlé'],['Manapany',55.590,-21.372,'Un bassin dans le basalte, ancienne marine'],['Piton de l’Eau',55.625,-21.170,'Un cône et son lac de cratère'],['Takamaka',55.620,-21.090,'Vallée des cascades'],['Saint-Gilles',55.222,-21.053,'Une anse de pêcheurs']]
 .forEach(([n,lo,la,nt])=>{try{if(LIEUX.some(l=>l.n===n))return;const t=near(lo,la);if(t)LIEUX.push({n,col:false,k:'',dmax:99,nt,t,p:xz(lo,la)})}catch(e){}});

// ----- 2. Les légendes et leurs versions -----
const LEG104={
 kal:{y:1745,lieu:[55.49,-21.32],an:'au temps de l’esclavage',t:'Grand-mère Kal',anim:'oiseau',
  v:{c:'On raconte qu’une vieille maîtresse, dure avec ses esclaves, avait sa plantation au pied des montagnes. Un commandeur s’enfuit dans une vallée fermée que l’on appellera Mafate, et d’autres le suivent. Elle le poursuit ; il lui fait boire une tisane d’herbes, et la voilà changée en grand oiseau de nuit. Depuis, son cri passe au-dessus des cases pour annoncer le malheur.',
   m:'À Mahavel, près de Saint-Pierre, une esclave nommée Kal servait une famille de maîtres. Quand son fils s’est jeté dans la mer, à Ravine Blanche, elle l’a suivi dans les vagues. Depuis, son long cri tourne autour de la maison des maîtres chaque fois qu’un malheur va les frapper.',
   sorc:'Dans l’Ouest, on parle de Kalla, une vieille esclave que personne n’a vue mourir. Battue, accusée de vol, ou privée de son fils vendu ailleurs, elle a disparu dans le Gouffre de l’Étang-Salé. La nuit, sur les chemins de la montagne, les voyageurs entendent sa voix et voient des lumières.',
   noir:'Près du pont de la Ravine des Cafres, une vieille femme offrait café et petit rhum aux voyageurs. Ceux qui portaient de l’argent finissaient au fond de la ravine. Morte, elle va sans tête sous un grand chapeau, et rôde près des malades : si elle ricane, le malade est perdu.'},
  ver:()=>{const b=BR88();if(b.empire||b.barons||b.battue||b.gothique)return ['noir',[55.49,-21.30]];if(b.sorc||b.ile||(S.myst||0)>=12)return ['sorc',[55.33,-21.27]];return S.voieC?['c',[55.42,-21.05]]:['m',[55.48,-21.33]]}},
 anchaing:{y:1735,lieu:[55.475,-21.055],an:'XVIIIᵉ siècle',t:'Anchaing et Héva',anim:'fumee',
  debut:'Anchaing, un marron malgache, s’enfuit avec Héva, une jeune esclave qu’il aime. Ils montent sur un piton boisé du cirque de Salazie, y vivent une dizaine d’années et y élèvent sept enfants. Un jour, Anchaing allume un feu en plein jour : la fumée les trahit, et un chasseur de marrons monte jusqu’à eux. ',
  v:{c:'Ramenés en bas, le maître pardonne à Anchaing. Les enfants nés dans la forêt prennent peur à la vue d’un cheval : ils n’en avaient jamais vu. (Version recueillie au XIXᵉ siècle.)',
   m:'Mais le maître est mort entre-temps, et c’est sa fille qui décide : elle libère toute la famille. Le piton gardera le nom d’Anchaing ; une de ses filles, dit-on, épousera Cimendef.',
   noir:'Le chasseur tire. Anchaing tombe, et Héva redescend enchaînée avec ses enfants. Le piton garde son nom, comme une tombe sans croix.'},
  ver:()=>{const b=BR88();if(b.empire||b.battue||b.extermine)return ['noir'];if(S.voieC)return ['c'];return ['m']}},
 voile:{y:1849,lieu:[55.525,-21.045],an:'après 1848',t:'Le Voile de la Mariée',anim:'voile',
  v:{all:'Après l’abolition, un petit propriétaire veuf quitte la côte pour Salazie, où la terre coûte moins cher. Il refuse tous les prétendants de sa fille, jusqu’à ce qu’un jardinier, riche en secret, gagne son cœur. Le matin des noces, aveuglée par son voile, elle s’enfuit et tombe dans la ravine ; le voile reste accroché à une branche. Les larmes du père, dit-on, font la cascade qui porte ce nom.'},
  ver:()=>['all']},
 parasol:{y:1961,lieu:[55.795,-21.200],an:'1961',t:'La Vierge au parasol sous la lave',anim:'lave',
  v:{c:'Au début du siècle, un propriétaire de Bois Blanc avait posé une Vierge sous un parasol au milieu de ses champs, pour qu’elle les garde des coulées. En 1961, la lave descend et recouvre la statue. On en posera une autre, plus près du rempart, puis on la déplacera encore à chaque coulée ; chaque 15 août, on monte en procession la prier.',
   m:'Ceux d’en bas avaient planté leur Vierge sous un parasol pour retenir le volcan. En 1961, le volcan est passé quand même. Les anciens des Hauts disent que la montagne n’obéit à personne : on la respecte, on ne la commande pas.'},
  ver:()=>[S.voieC?'c':'m']},
 cavadee:{y:1860,lieu:[55.650,-20.960],an:'seconde moitié du XIXᵉ siècle',t:'La première cavadee',anim:'procession',
  v:{c:'Les engagés tamouls arrivés par la Grande Chaloupe gardent leur fête : après dix jours de jeûne, les fidèles portent le kavadi, un arceau fleuri chargé de pots de lait, de la rivière jusqu’au temple de Mourouga. Les aiguilles d’argent leur traversent la peau ; les tambours ouvrent la marche. Les maîtres de l’usine regardent passer, sans comprendre.',
   m:'Des Hauts, on entend les tambours des engagés malbars. Comme nous, ils sont arrivés de loin et gardent leurs dieux : pendant dix jours ils jeûnent, puis ils portent en procession un arceau fleuri jusqu’au temple de Mourouga. Les chemins de l’exil se croisent.'},
  ver:()=>[S.voieC?'c':'m']}};
for(const k in LEG104){const L=LEG104[k];EV['leg_'+k]={y:L.y,tag:'Légende',an:L.an,get t(){return L.t},get b(){const [v]=L.ver();return (L.debut||'')+(L.v[v]||L.v.all||L.v.c)+(['noir','sorc'].includes(v)?' (Version qui ne court que dans votre histoire.)':'')},o:[{n:'Écouter',d:'Mystique +1',fx:{},f:()=>{S.myst=(S.myst||0)+1}}]}}
setInterval(()=>{try{if(!S||S.fin||!S.evq||!modeHist())return;S.done=S.done||{};for(const k in LEG104){const id='leg_'+k,L=LEG104[k];if(S.done[id]||S.year<L.y||S.year>L.y+60||S.evq.includes(id))continue;if(rnd()>.25)continue;S.done[id]=1;S.evq.push(id);break}}catch(e){}},4000);

// ----- 3. L'animation : un repère qui pulse vu de haut, puis la caméra plonge sur la scène -----
const A104={g:null,t0:0,k:null,upd:null};
function leg104Jouer(k){try{const L=LEG104[k];if(!L||typeof scene==='undefined')return;const [v,pos]=L.ver();const ll=pos||L.lieu;const t=near(ll[0],ll[1]);if(!t)return;
 if(A104.g){scene.remove(A104.g);A104.g=null}
 const g=new THREE.Group();g.position.set(t.x,t.alt*VX+.05,t.z);scene.add(g);A104.g=g;A104.t0=performance.now();A104.k=k;
 const M=(c,o)=>new THREE.MeshBasicMaterial(Object.assign({color:c,transparent:true},o||{}));
 // repère visible de loin
 const ring=new THREE.Mesh(new THREE.RingGeometry(.6,.85,40),M(0xffd27a,{opacity:.9,side:THREE.DoubleSide,depthTest:false}));ring.rotation.x=-Math.PI/2;ring.renderOrder=9;g.add(ring);
 const fig=(c,h)=>{const f=new THREE.Group();const b=new THREE.Mesh(new THREE.ConeGeometry(.045,h||.18,6),new THREE.MeshLambertMaterial({color:c}));b.position.y=(h||.18)/2;const tt=new THREE.Mesh(new THREE.SphereGeometry(.035,8,6),new THREE.MeshLambertMaterial({color:0x5a3a22}));tt.position.y=(h||.18)+.03;f.add(b,tt);return f};
 let upd=()=>{};const a=L.anim;
 if(a==='oiseau'){const o=new THREE.Group();const corps=new THREE.Mesh(new THREE.SphereGeometry(.08,8,6),new THREE.MeshLambertMaterial({color:0x1d1712}));corps.scale.set(1,.7,1.8);o.add(corps);const ailes=[1,-1].map(s=>{const w=new THREE.Mesh(new THREE.PlaneGeometry(.32,.14),new THREE.MeshLambertMaterial({color:0x2a2018,side:THREE.DoubleSide}));w.position.x=s*.17;o.add(w);return w});g.add(o);
  upd=(s)=>{const r=.7,a2=s*.9;o.position.set(Math.cos(a2)*r,.7+Math.sin(s*1.7)*.08,Math.sin(a2)*r);o.rotation.y=-a2;ailes.forEach((w,i)=>w.rotation.z=(i?-1:1)*Math.sin(s*9)*.6)}}
 if(a==='fumee'){const P=[];for(let i=0;i<14;i++){const p=new THREE.Mesh(new THREE.SphereGeometry(.07,7,5),M(0xbdb6aa,{opacity:.6}));g.add(p);P.push(p)}const feu=new THREE.Mesh(new THREE.ConeGeometry(.05,.12,6),M(0xff8a2a));feu.position.y=.06;g.add(feu);[0x3b2a1a,0x6b3d2a,0x3b2a1a].forEach((c,i)=>{const f=fig(c,i==1?.17:.2);f.position.set(-.25+i*.12,0,.22);g.add(f)});
  upd=(s)=>{P.forEach((p,i)=>{const u=((s*.35+i/P.length)%1);p.position.set(Math.sin(u*6+i)*.12*u,.1+u*2.2,Math.cos(u*5+i)*.1*u);p.scale.setScalar(.6+u*3);p.material.opacity=.55*(1-u)});feu.scale.y=1+Math.sin(s*14)*.25}}
 if(a==='voile'){const eau=new THREE.Mesh(new THREE.PlaneGeometry(.35,1.6),M(0xe8f4ff,{opacity:.55,side:THREE.DoubleSide}));eau.position.set(0,.8,0);g.add(eau);const voile=new THREE.Mesh(new THREE.PlaneGeometry(.22,.3),M(0xffffff,{opacity:.95,side:THREE.DoubleSide}));g.add(voile);const br=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.5,5),new THREE.MeshLambertMaterial({color:0x4a3220}));br.rotation.z=1.2;br.position.set(.25,1.15,0);g.add(br);
  upd=(s)=>{const u=Math.min(1,s/5);voile.position.set(.35*Math.sin(u*3)*(1-u)+.38*u,1.7-u*.55+Math.sin(s*3)*.02,.02);voile.rotation.z=Math.sin(s*2.4)*.4;eau.material.opacity=.45+Math.sin(s*6)*.08}}
 if(a==='lave'){const st=new THREE.Group();const corps=new THREE.Mesh(new THREE.ConeGeometry(.06,.24,8),new THREE.MeshLambertMaterial({color:0xf4f1ea}));corps.position.y=.12;const tete=new THREE.Mesh(new THREE.SphereGeometry(.04,8,6),new THREE.MeshLambertMaterial({color:0xf4f1ea}));tete.position.y=.27;const par=new THREE.Mesh(new THREE.ConeGeometry(.17,.07,12,1,true),new THREE.MeshLambertMaterial({color:0x2a4fa0,side:THREE.DoubleSide}));par.position.y=.38;st.add(corps,tete,par);g.add(st);
  const B=[];for(let i=0;i<26;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(.12+Math.random()*.08,8,6),M(0xff5a14,{opacity:.95}));m.scale.y=.25;m.userData={x:-1.3+i*.055+Math.random()*.05,z:(Math.random()-.5)*.5*(1+i/26),o:i/26};g.add(m);B.push(m)}
  upd=(s)=>{const u=Math.min(1,s/9);B.forEach(m=>{const d=m.userData;const on=d.o<u*1.05;m.visible=on;if(!on)return;m.position.set(d.x,.02,d.z);const age=u*1.05-d.o;m.material.color.setHSL(.03+Math.min(.02,age*.05),1,Math.max(.12,.5-age*.9)+Math.sin(s*5+d.x*9)*.04)});st.position.y=-Math.max(0,u-.85)*1.6}}
 if(a==='procession'){const F=[];for(let i=0;i<9;i++){const f=fig(i%3===0?0xf2d36b:i%3===1?0xe9e2d0:0xd24a2a,.2);if(i%3===0){const arc=new THREE.Mesh(new THREE.TorusGeometry(.11,.012,5,14,Math.PI),new THREE.MeshLambertMaterial({color:0xf08a2c}));arc.position.y=.27;f.add(arc);[-.1,.1].forEach(x=>{const pot=new THREE.Mesh(new THREE.SphereGeometry(.025,6,5),new THREE.MeshLambertMaterial({color:0xb87333}));pot.position.set(x,.22,0);f.add(pot)})}g.add(f);F.push(f)}
  const temple=new THREE.Mesh(new THREE.BoxGeometry(.3,.35,.3),new THREE.MeshLambertMaterial({color:0xe7c25a}));temple.position.set(1.1,.17,0);const tour=new THREE.Mesh(new THREE.ConeGeometry(.14,.35,4),new THREE.MeshLambertMaterial({color:0xd94f2a}));tour.position.set(1.1,.52,0);g.add(temple,tour);
  upd=(s)=>{F.forEach((f,i)=>{const u=((s*.06)+i*.11)%1.2;f.position.set(-1.1+u*2.1,Math.abs(Math.sin(s*6+i))*.02,Math.sin(u*5+i)*.06);f.rotation.y=-Math.PI/2;f.visible=u<1.05})}}
 A104.upd=upd;
 // d'abord vu de haut (le repère pulse), puis la caméra descend sur la scène
 try{conteVoir(null)}catch(e){}setTimeout(()=>{try{conteVoir(t,5.5)}catch(e){}},1800)}catch(e){console.warn(e)}}
(function boucle(){requestAnimationFrame(boucle);if(!A104.g)return;const s=(performance.now()-A104.t0)/1000;if(s>28){scene.remove(A104.g);A104.g=null;return}
 const r=A104.g.children[0];if(r){const p=1+((s*1.2)%1)*1.6;r.scale.set(p,p,p);r.material.opacity=Math.max(0,.9-(s*1.2%1)*.8)*(s<6?1:Math.max(0,1-(s-6)/2))}try{A104.upd(s)}catch(e){}})();
// quand le récit d'une légende s'ouvre, on la joue sur la carte
setInterval(()=>{try{const m=$('modal');if(!m||m.hidden)return;const inn=m.querySelector('.carte .in')||m.querySelector('.carte');if(!inn||inn.dataset.leg104)return;const tx=inn.textContent||'';for(const k in LEG104){if(tx.indexOf(LEG104[k].t)>=0){inn.dataset.leg104=1;leg104Jouer(k);break}}}catch(e){}},500);

// ----- 4. Chaque année, à la saison des pluies (janvier-février), la cavadee passe à Saint-André et à Saint-Pierre -----
{let vu=-1;setInterval(()=>{try{if(!S||!modeHist()||S.year<1860||S.fin)return;if(!pluie()||vu===S.ns)return;vu=S.ns;if(rnd()<.5&&!A104.g){const save=LEG104.cavadee.lieu;LEG104.cavadee.lieu=rnd()<.5?[55.650,-20.960]:[55.478,-21.339];const g=conteVoir;conteVoir=()=>{};leg104Jouer('cavadee');setTimeout(()=>{conteVoir=g},2500);LEG104.cavadee.lieu=save;log('🪔 La cavadee passe : tambours, arceaux fleuris et pots de lait, de la rivière jusqu’au temple.')}}catch(e){}},3000)}

// ----- 5. Saint Expédit : les oratoires rouges au bord des routes, à partir des années 1930 ; une statue déçue perd la tête -----
{let posees=false,G=null;setInterval(()=>{try{if(!S||typeof scene==='undefined')return;const on=S.year>=1931;if(on&&!posees){posees=true;G=new THREE.Group();const mat=new THREE.MeshLambertMaterial({color:0xc4161c});let n=0;
  T.forEach(t=>{if(n>60||t.bare||t.alt>700||t.alt<5)return;if(t.i%23!==0)return;const near1=VILLES.some(v=>{const [x,z]=xz(v[1],v[2]);return Math.hypot(t.x-x,t.z-z)<6});if(!near1)return;const b=new THREE.Mesh(new THREE.BoxGeometry(.07,.11,.06),mat);b.position.set(t.x+.3,t.alt*VX+.055,t.z+.2);G.add(b);const toit=new THREE.Mesh(new THREE.ConeGeometry(.06,.05,4),mat);toit.position.set(t.x+.3,t.alt*VX+.135,t.z+.2);toit.rotation.y=Math.PI/4;G.add(toit);n++});scene.add(G)}
  if(G)G.visible=on&&(typeof lieu==='undefined'||!lieu||lieu===LA97)}catch(e){}},2000)}
{const sx=SAINT102.find(s=>s.k==='expedit');if(sx){sx.d='Pour les causes pressantes : deux bras de plus cette saison. Mais s’il ne répond pas, certains dévots déçus lui coupent la tête.';const f0=sx.f;sx.f=()=>{if(rnd()<.15){log('🕯️ Saint Expédit n’a pas répondu : au bord de la route, un dévot déçu a décapité sa statue. Cohésion −1.');fx({coh:-1})}else f0()}}
 const sp=SAINT102.find(s=>s.k==='parasol');if(sp)sp.y=1900}

// ----- 6. Le sorcier et la garantie ; le devineur -----
RITE99.push({k:'garantie',n:'La garantie du sorcier',m:5,c:{fandamane:1,galet:1},d:'Une amulette portée sur soi : le mauvais sort n’est pas détruit, il est renvoyé à celui qui l’a lancé. Traque −5, cohésion +2.',f:k=>fx({traque:-5*k,coh:2})},
 {k:'devineur',n:'Le devineur et ses graines',m:7,c:{ambaville:1},d:'Il lit ce qui vient dans des graines jetées : le prochain récit est annoncé. Savoir +1.',f:k=>{S.sav=(S.sav||0)+1;try{const id=(S.evq||[])[0];if(id&&EV[id])log('🔮 Le devineur annonce : « '+(EV[id].t||'')+' ».')}catch(e){}}});

// ----- 7. Vue personnage : l'endormi (caméléon), le tangue la nuit, un vol de zoizo blanc -----
// Dessinés directement (pas de modèle) : l'endormi avance au ralenti sur le sol et change de couleur ; on peut le croiser en allant chasser.
function vpFaune104(){const V=VP;if(!V||!V.sc||V.f104)return;V.f104=[];const L=new THREE.MeshLambertMaterial({color:0x58a043});
 const endormi=()=>{const g=new THREE.Group();const mat=new THREE.MeshLambertMaterial({color:0x5aa845});const c=new THREE.Mesh(new THREE.SphereGeometry(.12,10,8),mat);c.scale.set(1.6,1,.8);c.position.y=.13;const crete=new THREE.Mesh(new THREE.ConeGeometry(.05,.08,4),mat);crete.position.set(.17,.24,0);const tete=new THREE.Mesh(new THREE.ConeGeometry(.08,.16,6),mat);tete.rotation.z=-Math.PI/2;tete.position.set(.26,.16,0);
  const q=new THREE.Mesh(new THREE.TorusGeometry(.07,.02,5,12,Math.PI*1.6),mat);q.position.set(-.24,.1,0);const oeil=new THREE.Mesh(new THREE.SphereGeometry(.03,6,5),new THREE.MeshLambertMaterial({color:0xf2e36b}));oeil.position.set(.26,.19,.05);
  g.add(c,crete,tete,q,oeil);[[.1,.06],[.1,-.06],[-.1,.06],[-.1,-.06]].forEach(([x,z])=>{const p=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.12,4),mat);p.position.set(x,.05,z);g.add(p)});g.userData.mat=mat;return g};
 const tangue=()=>{const g=new THREE.Group();const m=new THREE.MeshLambertMaterial({color:0x6b5038});const c=new THREE.Mesh(new THREE.SphereGeometry(.14,10,8),m);c.scale.set(1.7,.9,1);c.position.y=.13;const n=new THREE.Mesh(new THREE.ConeGeometry(.06,.18,6),m);n.rotation.z=-Math.PI/2;n.position.set(.28,.12,0);g.add(c,n);for(let i=0;i<10;i++){const s=new THREE.Mesh(new THREE.ConeGeometry(.012,.12,3),new THREE.MeshLambertMaterial({color:0xe8dcc0}));s.position.set(-.15+i*.03,.24,(i%2?.05:-.05));s.rotation.z=.5;g.add(s)}return g};
 for(let i=0;i<3;i++){const e=endormi();const a=Math.random()*6.28,r=6+i*3;e.position.set(Math.cos(a)*r,0,-30+Math.sin(a)*r);V.sc.add(e);V.f104.push({k:'endormi',w:e,cap:Math.random()*6.28,ph:Math.random()*6.28})}
 const tg=tangue();tg.position.set(8,0,-24);V.sc.add(tg);V.f104.push({k:'tangue',w:tg,cap:0,ph:0});
 for(let i=0;i<5;i++){const b=new THREE.Mesh(new THREE.SphereGeometry(.07,6,5),new THREE.MeshLambertMaterial({color:0xf2f2ea}));V.sc.add(b);V.f104.push({k:'zoizo',w:b,ph:i*1.2})}}
{const vb=vpBoucle;let last=performance.now();vpBoucle=function(){const now=performance.now(),dt=Math.min(.1,(now-last)/1000);last=now;vb.apply(this,arguments);try{const V=VP;if(!V||!V.sc||typeof V.h!=='function')return;vpFaune104();const s=now/1000;
 const nuit=typeof S!=='undefined'&&S&&(S.heure!=null?(S.heure<6||S.heure>19):false);
 V.f104.forEach(b=>{if(b.k==='endormi'){b.ph+=dt;if(Math.sin(b.ph*.7)>.2){b.w.position.x+=Math.cos(b.cap)*dt*.12;b.w.position.z+=Math.sin(b.cap)*dt*.12}if(Math.random()<.003)b.cap+=Math.random()-.5;b.w.rotation.y=-b.cap;b.w.position.y=V.h(b.w.position.x,b.w.position.z);b.w.userData.mat.color.setHSL(.28-.06*(.5+.5*Math.sin(b.ph*.15)),.55,.38+.1*Math.sin(b.ph*.23));return}
  if(b.k==='tangue'){b.w.visible=nuit||Math.sin(s*.05)>.6;if(!b.w.visible)return;b.ph+=dt*.4;b.w.position.x=8+Math.cos(b.ph)*3;b.w.position.z=-24+Math.sin(b.ph*1.3)*3;b.w.rotation.y=-b.ph-Math.PI/2;b.w.position.y=V.h(b.w.position.x,b.w.position.z);return}
  if(b.k==='zoizo'){const a=s*.6+b.ph;b.w.position.set(-6+Math.cos(a)*5+Math.sin(s*3+b.ph)*.4,V.h(-6,-36)+3.5+Math.sin(a*2)*.6,-36+Math.sin(a)*4)}})}catch(e){}}}

// ----- 8. La cuisine qui arrive au fil des légumes et des épices : brèdes, grain, zambrocal, chouchou -----
Object.assign(SAVOIRS,{
 bredes:{n:'Les brèdes',c:1,bt:'Dès les premiers Malgaches',bes:()=>true,br:'Nourrir II',d:'Les feuilles qu’on cueille partout : brèdes mafane qui piquent la langue, morelle, feuilles de songe. Cuites simplement à l’eau avec ce qu’on a, elles font le repas de tous les jours, chez les pauvres comme dans les camps. +1 vivre par saison, un peu de santé.'},
 grain:{n:'Le grain',c:2,bt:'Demande l’an 1700',bes:()=>S.year>=1700,br:'Nourrir II',d:'Pois du Cap, haricots, puis lentilles : le grain cuit longuement dans la marmite accompagne le riz. Il se garde et se transporte. +1 vivre par saison.'},
 zambrocal:{n:'Le zambrocal',c:2,bt:'Demande le grain, et le cari ou le safran péi',bes:()=>!!(S.sv.grain&&(S.sv.cari||S.sv.massale)),br:'Nourrir III',d:'Le riz cuit avec le grain et le safran péi, tout ensemble dans la même marmite : un plat qui nourrit beaucoup de monde avec peu. +1 vivre et un peu de cohésion par saison.'},
 chouchou:{n:'Le chouchou',c:2,bt:'Demande l’an 1830',bes:()=>S.year>=1830,br:'Nourrir II',d:'La liane venue d’Amérique couvre les treilles de Salazie : on mange le fruit en gratin et la pousse en brèdes chouchou. +1 vivre par saison.'}});
{const s0=saison;saison=function(){const r=s0.apply(this,arguments);try{if(!S||S.fin)return r;const v=(S.sv.bredes?1:0)+(S.sv.grain?1:0)+(S.sv.zambrocal?1:0)+(S.sv.chouchou?1:0);if(v)S.vivres+=v;if(S.sv.bredes)fx({sante:.5});if(S.sv.zambrocal)fx({coh:.5})}catch(e){}return r}}

// ----- 9. Correctif : les modèles allégés (sommets quantifiés en entiers) se tassaient à zéro quand on leur appliquait
// une matrice (les maisons, cases et greniers de la Survie disparaissaient). On repasse ces attributs en flottants d'abord.
{const ap=THREE.BufferGeometry.prototype.applyMatrix4;THREE.BufferGeometry.prototype.applyMatrix4=function(m){try{['position','normal','tangent'].forEach(n=>{const a=this.attributes[n];if(!a||a.array instanceof Float32Array||a.isInterleavedBufferAttribute&&a.data.array instanceof Float32Array)return;const c=a.itemSize,N=a.count,f=new Float32Array(N*c);for(let i=0;i<N;i++){f[i*c]=a.getX(i);if(c>1)f[i*c+1]=a.getY(i);if(c>2)f[i*c+2]=a.getZ(i);if(c>3)f[i*c+3]=a.getW(i)}this.setAttribute(n,new THREE.BufferAttribute(f,c))})}catch(e){}return ap.call(this,m)}}

// ----- 10. Un même nom ne meurt pas deux fois : on évite les noms déjà portés (vivants ou morts) ; sinon « Ti » devant -----
{const np=nouvellePersonne;nouvellePersonne=function(opt){const p=np.apply(this,arguments);try{const pris=new Set([...(S.pp||[]).map(q=>q.n),...(S.morts||[]).map(q=>q.n)]);if(pris.has(p.n)){const L=(p.st==='esclave'&&(p.or==='af'||p.or==='mg'))?NOMS.esc[p.g]:NOMS[p.or][p.g];const libres=L.filter(n=>!pris.has(n));if(libres.length)p.n=libres[Math.floor(rnd()*libres.length)];else{const pre=['Ti ','Gros ','Grand '].find(x=>!pris.has(x+p.n));p.n=(pre||'Ti ')+p.n}}}catch(e){}return p}}

// ----- 11. Côté colons : les esprits vengeurs, ce sont les esclaves morts -----
EV.vengeurs104={y:1700,si:()=>S&&S.voieC&&(S.morts||[]).length>=4,tag:'Mythe',an:'XVIIIᵉ siècle',t:'Les esprits vengeurs',
 get b(){const m=(S.morts||[]).slice(-3).map(q=>q.n).join(', ');return 'Sur l’habitation, les nuits deviennent mauvaises : des pas dans la cour, le grenier ouvert, un feu qui reprend tout seul. Les esclaves le disent tout bas : ce sont les morts de l’habitation qui reviennent'+(m?' — on cite '+m:'')+'. Personne ne les a enterrés comme il faut, et ils n’ont pas oublié ce qu’on leur a fait.'},
 get o(){return [{n:'Faire dire une messe',d:'Cohésion +1 ; les nuits restent agitées',fx:{coh:1}},{n:'Laisser les esclaves enterrer leurs morts à leur façon',d:'Cohésion +3, colonie −2',fx:{coh:3,ami:-2}},{n:'Punir ceux qui en parlent',d:'Cohésion −4, traque +4 : il y aura des fuites',fx:{coh:-4,traque:4}}]}};
setInterval(()=>{try{if(!S||S.fin||!S.evq||!modeHist()||!S.voieC)return;S.done=S.done||{};const e=EV.vengeurs104;if(S.year<e.y||S.evq.includes('vengeurs104'))return;if(S.done.vengeurs104&&S.year-S.done.vengeurs104<40)return;if(!e.si()||rnd()>.03)return;S.done.vengeurs104=S.year;S.evq.push('vengeurs104')}catch(e){}},6000);

// ----- 12. Vie, carte : moins de fenêtres. La mini-carte du camp devient un petit carré translucide qui s'agrandit au clic
// (un second clic entre dans le camp) ; « Tous les camps » se replie en une étiquette.
{const st=document.createElement('style');st.textContent='#cvBtn.mini104{width:64px!important;height:64px!important;padding:3px!important;opacity:.55;overflow:hidden;transition:all .25s}#cvBtn.mini104:hover{opacity:.85}#cvBtn.mini104 canvas{width:58px!important;height:58px!important}#cvBtn.mini104 small{display:none!important}#infoJ.mini104{width:auto!important;max-height:30px!important;overflow:hidden!important;opacity:.7;cursor:pointer;padding:4px 10px!important}#infoJ.mini104>*:not(h4){display:none!important}#infoJ.mini104 h4{margin:0!important}#infoJ.mini104 h4::after{content:" ▸"}';document.head.appendChild(st)}
{let ouvT=0,init=false;setInterval(()=>{try{const b=$('cvBtn');if(!b||!S||modeHist())return;if(!init){init=true;b.classList.add('mini104');
  b.addEventListener('click',e=>{if(b.classList.contains('mini104')){e.stopImmediatePropagation();e.preventDefault();b.classList.remove('mini104');ouvT=performance.now()}},true);
  b.addEventListener('mouseenter',()=>{ouvT=performance.now()})}
  if(!b.classList.contains('mini104')&&!b.matches(':hover')&&performance.now()-ouvT>8000)b.classList.add('mini104');
  const ij=$('infoJ');if(ij&&!ij.dataset.m104){ij.dataset.m104=1;ij.classList.add('mini104');ij.addEventListener('click',e=>{if(ij.classList.contains('mini104')){ij.classList.remove('mini104');e.stopPropagation()}else if(e.target.tagName==='H4')ij.classList.add('mini104')},true)}}catch(e){}},700)}
