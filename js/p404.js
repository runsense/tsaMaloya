// ===== p404 : (1) en incarnation, la molette descend vraiment jusqu'aux yeux du personnage. p287 bridait la distance à 2,5 sur le
// canvas, p347 la poussait vers 1,25 sur le conteneur : les deux se contredisaient à chaque cran et on ne passait jamais par ses yeux.
// Un seul écouteur, en capture, décide désormais : de 16 à 1,2, puis la vue par ses yeux ; molette vers soi pour ressortir.
// (2) 1730 en montage alterné : la pendaison de La Buse à Saint-Paul (archive) et, au large, le cyclone qui engloutit les deux îles
// (légende du jeu). =====
// écouteur posé sur la fenêtre, en capture : il passe avant celui du canvas, où qu'il soit dans la page
addEventListener('wheel',e=>{const J=typeof INC!=='undefined'?INC:null;if(!J||J.duel)return;const t=e.target;if(!t||!t.closest)return;
  const dansVue=(J.R&&t===J.R.domElement)||(J.el&&J.el.contains(t));if(!dansVue)return;if(t.closest('#incCarte,canvas[data-z342],.carte,#tuto'))return;
  e.preventDefault();e.stopImmediatePropagation();const f=e.deltaY<0?1/1.15:1.15;
  if(J.vueTete){if(e.deltaY>0){J.vueTete=0;J.dist=1.6;try{incMsg287('Vue de dehors (molette pour rapprocher).')}catch(x){}}return}
  J.dist=Math.max(1.2,Math.min(16,(J.dist||6)*f));if(J.dist<=1.21&&e.deltaY<0){J.vueTete=1;try{incMsg287('Par ses yeux. Molette vers vous pour ressortir, V pour basculer.')}catch(x){}}},{capture:true,passive:false});

// ---------- 1730 : la mort de La Buse ----------
// Archive : reconnu vers 1729 en baie d'Antongil (Madagascar), où il servait de pilote aux navires de passage, par un ancien pirate ;
// mis aux fers par le capitaine Dhermitte, de la Méduse (Compagnie des Indes) ; jugé à Bourbon, il refuse de parler au gouverneur
// Pierre-Benoît Dumas ; pendu le 7 juillet 1730 vers 5 h du soir devant l'église de Saint-Paul (jugement signé Chassin, Dumas,
// Villarmoy, G. Dumas, de Lanux). Tradition : le cryptogramme jeté à la foule — aucune source d'époque, il n'apparaît qu'en 1934
// (Ch. de La Roncière). La « tombe de La Buse » du cimetière marin est une attribution tardive.
const LB404={g:null};
function gibet404(){if(LB404.g){if(LB404.g.parent!==scene)scene.add(LB404.g);return LB404.g}const g=new THREE.Group(),M=c=>new THREE.MeshLambertMaterial({color:c});
 const bois=M(0x4a3420);[[-.5],[.5]].forEach(([x])=>{const p=new THREE.Mesh(new THREE.BoxGeometry(.08,1.5,.08),bois);p.position.set(x,.75,0);g.add(p)});const t=new THREE.Mesh(new THREE.BoxGeometry(1.15,.08,.08),bois);t.position.y=1.5;g.add(t);
 const plat=new THREE.Mesh(new THREE.BoxGeometry(1.4,.25,.8),M(0x6a5030));plat.position.y=.12;g.add(plat);
 const corde=new THREE.Mesh(new THREE.CylinderGeometry(.01,.01,.35,4),M(0xb8a070));corde.position.set(0,1.32,0);g.add(corde);
 const homme=new THREE.Group(),c=new THREE.Mesh(new THREE.CylinderGeometry(.07,.08,.42,8),M(0x2a2430));c.position.y=.21;homme.add(c);const tt=new THREE.Mesh(new THREE.SphereGeometry(.07,8,6),M(0x8a6a50));tt.position.y=.49;homme.add(tt);homme.position.set(0,.25,0);g.add(homme);g.userData.h=homme;
 for(let i=0;i<26;i++){const a=Math.random()*Math.PI*1.2-.3,r=1.2+Math.random()*1.4,f=new THREE.Mesh(new THREE.CylinderGeometry(.06,.07,.32,6),M([0x7a6a58,0x5a4a3a,0x9a8a70,0x3a4a6a,0xe0d8c8][i%5]));f.position.set(Math.cos(a)*r,.16,Math.sin(a)*r+.6);g.add(f)}
 const eg=new THREE.Group(),m=new THREE.Mesh(new THREE.BoxGeometry(1.6,.9,1),M(0xd8d0c0));m.position.y=.45;eg.add(m);const to=new THREE.Mesh(new THREE.ConeGeometry(.75,.6,4),M(0x8a3a2a));to.position.y=1.2;to.rotation.y=Math.PI/4;eg.add(to);const cl=new THREE.Mesh(new THREE.BoxGeometry(.4,1.7,.4),M(0xd8d0c0));cl.position.set(.6,.85,-.2);eg.add(cl);eg.position.set(0,0,-2.2);g.add(eg);
 const [x,z]=xz(55.2715,-21.0105);g.position.set(x,Math.max(0,alt(x,z))*VX+.02,z);g.scale.setScalar(1.6);g.name='gibet404';scene.add(g);LB404.g=g;return g}
function mort404(fin){if(typeof cineJouer!=='function'){fin&&fin();return}const g=gibet404(),P=g.position,h=g.userData.h,av=!(S&&S.lisboa402)&&typeof poseIles402==='function'&&poseIles402();g.visible=true;h.position.set(0,.25,0);
 const nav=typeof g168Navire==='function'?g168Navire('navire'):null,[bx,bz]=xz(55.24,-21.0);if(nav){nav.scale.setScalar(2);nav.position.set(bx-14,.02,bz-4);nav.rotation.y=-.3;scene.add(nav)}
 let J,D,y0J,y0D,hJ,hD;if(av){IL402.anim=1;IL402.g.visible=true;J=IL402.J;D=IL402.D;y0J=J.position.y;y0D=D.position.y;hJ=J.children[1].geometry.parameters.height;hD=D.children[1].geometry.parameters.height}
 const S1=[{d:7000,cam:[bx-12,bz-3,14,1.2,.85],f:(U,k)=>{if(nav)nav.position.set(bx-14+k*10,.02,bz-4+k*3)},txt:'<small>1729 · archive</small>Baie d’Antongil, à Madagascar : La Buse y sert de pilote aux navires de passage. Un ancien pirate le reconnaît ; le capitaine Dhermitte, de la <i>Méduse</i>, le met aux fers et le ramène à Bourbon.'},
  {d:7000,cam:[P.x,P.z-2,9,.6,.9],txt:'<small>Saint-Paul · archive</small>Jugé par le Conseil supérieur, il refuse de parler au nouveau gouverneur, Pierre-Benoît Dumas. La sentence tombe vite : la corde.'}];
 const C1=av?[{d:6500,cam:[J.position.x,J.position.z,55,1.1,.8],init:()=>{try{pluie402(true,CINE&&CINE.el)}catch(e){}},txt:'<small>Au même moment, au large · légende du jeu</small>Au sud de Bourbon, sur les deux îles que les cartes dessinent depuis deux siècles, le ciel tourne au noir.'}]:[];
 const S2=[{d:7500,cam:[P.x,P.z,5.5,.9,1.0],init:()=>{try{pluie402(false)}catch(e){}},f:(U,k)=>{if(k>.6){h.position.y=.25+Math.min(.35,(k-.6)*2.2);h.rotation.z=Math.sin(k*9)*.06*(1-k)}},txt:'<small>7 juillet 1730, vers 5 h du soir · archive</small>Devant l’église de Saint-Paul, Olivier Levasseur, dit La Buse, est pendu pour piraterie.'}];
 const C2=av?[{d:7500,cam:[J.position.x,J.position.z,42,1.5,.82],init:()=>{try{pluie402(true,CINE&&CINE.el)}catch(e){}},f:(U,k)=>{J.position.y=y0J-k*k*hJ*1.3;J.rotation.z=k*.15},txt:'<small>Cette nuit-là · légende du jeu</small>La mer se soulève. Juan de Lisboa s’enfonce, ses forêts d’abord, puis ses montagnes.'},
  {d:6500,cam:[D.position.x,D.position.z,30,1.9,.82],f:(U,k)=>{D.position.y=y0D-k*k*hD*1.4;D.rotation.z=-k*.2},txt:'<small>Dos Romeiros · légende du jeu</small>Sa petite voisine la suit au fond de l’océan.'}]:[];
 const S3=[{d:8000,cam:[P.x,P.z,8,2.4,.85],init:()=>{try{pluie402(false)}catch(e){}},txt:'<small>Tradition</small>On racontera qu’au pied de la potence il a jeté à la foule un message chiffré : « Mon trésor à qui saura le prendre ». Aucune source de 1730 n’en parle ; le cryptogramme n’apparaît qu’en 1934.'}];
 const C3=av?[{d:8000,cam:[(J.position.x+D.position.x)/2,(J.position.z+D.position.z)/2,95,2.2,.7],txt:'<small>Au matin · légende du jeu</small>Plus rien que la houle, là où étaient les îles. Et si le trésor de La Buse dormait là-bas, avec elles ?'}]:[];
 const fini=()=>{try{pluie402(false)}catch(e){}if(nav)scene.remove(nav);g.visible=false;if(av){IL402.anim=0;IL402.g.visible=false;J.position.y=y0J;D.position.y=y0D;J.rotation.z=D.rotation.z=0;try{S.lisboa402=1}catch(e){}}try{S.buse404=1}catch(e){}fin&&fin()};
 cineJouer([...S1,...C1,...S2,...C2,...S3,...C3],fini)}
try{
 // la carte du trésor (1730) ouvre sur le film ; la carte du cyclone aussi, s'il passe avant
 const L=EV.labuse;if(L){const o0=Object.getOwnPropertyDescriptor(L,'o');const base=o0&&o0.get?null:L.o;
  const film={n:'🎬 1730 : la pendaison de La Buse',d:'Saint-Paul, le 7 juillet — et, au large, la nuit du cyclone.',fx:{},hist:1,f:()=>setTimeout(()=>mort404(),300)};
  if(Array.isArray(base)&&!base.some(x=>/pendaison/.test(x.n)))L.o=[film,...base]}
 if(EV.cyclone402){EV.cyclone402.o[0]={n:'🎬 1730 : la pendaison et le cyclone',d:'',fx:{},hist:1,f:()=>setTimeout(()=>mort404(),300)}}
 EV.buse1730={y:1730,si:()=>!!S&&!S.buse404,tag:'Archive',an:'7 juillet 1730',t:'La mort de La Buse',
  b:'Le pirate Olivier Levasseur, dit La Buse, ramené de Madagascar aux fers, est pendu devant l’église de Saint-Paul.',
  v:'Archive : reconnu vers 1729 en baie d’Antongil, où il servait de pilote ; arrêté par le capitaine Dhermitte, de la Méduse (Compagnie des Indes) ; jugé à Bourbon, pendu le 7 juillet 1730 vers 5 h du soir, selon le jugement. Tradition : le cryptogramme jeté à la foule (connu seulement depuis 1934). La « tombe de La Buse » du cimetière marin est une attribution tardive : le cimetière n’existait pas encore.',
  nat:'Archive (jugement de 1730) ; le message chiffré relève de la tradition.',h:'Jugement du Conseil supérieur de Bourbon, 1730 ; Ch. Johnson, A General History of the Pyrates ; C. Lougnon, Olivier Levasseur dit la Buse (2023).',
  o:[{n:'🎬 Voir la journée du 7 juillet 1730',d:'',fx:{},hist:1,f:()=>setTimeout(()=>mort404(),300)},{n:'Continuer',d:'',fx:{},hist:1,f:()=>{try{S.buse404=1}catch(e){}}}]};
 if(typeof histOK==='function'){const h0=histOK;histOK=function(k){if(k==='buse1730')return true;return h0.apply(this,arguments)}}
}catch(e){console.warn('p404',e)}
// dans les Fiches de l'île
setInterval(()=>{try{const b=document.getElementById('fic208b');if(!b||document.getElementById('fic404'))return;const h=b.parentElement.querySelector('h1'),t=h&&h.textContent.trim();
 if(t!=='La mort de La Buse'&&t!=='Le trésor de La Buse')return;const x=document.createElement('button');x.id='fic404';x.className='bt sec';x.textContent='🎬 La journée du 7 juillet 1730';x.style.margin='8px 0';
 x.onclick=()=>{$('ecran').hidden=true;mort404();const w=setInterval(()=>{if(typeof CINE==='undefined'||!CINE){clearInterval(w);$('ecran').hidden=false}},500)};b.before(x)}catch(e){}},500);
