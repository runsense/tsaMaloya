// ===== p398 : les transports de l'île roulent sur la carte, chacun à son époque.
// Diligences à chevaux sur la route de la côte (années 1860 – 1882 ; date de début approximative).
// Le chemin de fer (« Ti-Train ») : achevé en 1882, 126 km de Saint-Benoît à Saint-Pierre par Saint-Denis, voie métrique,
// tunnels entre Saint-Denis et La Possession ; locomotive à vapeur, puis autorail (années 1950, date approximative).
// Fermeture : Le Port – Saint-Pierre en 1956, le reste vers 1963 (route du Littoral ouverte en juin 1963), Saint-Denis – La Possession en 1976.
// Le premier car (un Berliet de 36 places, Le Port – Saint-Pierre) en 1912 ; les « cars courant d'air », caisses en bois ouvertes
// sur les côtés, sur châssis de camion (Citroën type 45 et autres), toit et galerie à bagages, à partir des années 1920 et jusque vers 1970 ; les cars modernes ; le réseau Car Jaune en 1996.
// Sources : Car Jaune (historique), International Steam Pages, Imaz Press (les cars courant d'air). =====
const RT398={
 ouest:[[55.448,-20.879],[55.420,-20.884],[55.383,-20.896],[55.336,-20.928],[55.292,-20.937],[55.272,-21.000],[55.240,-21.040],[55.222,-21.060],[55.250,-21.120],[55.285,-21.170],[55.330,-21.235],[55.360,-21.262],[55.412,-21.286],[55.450,-21.320],[55.477,-21.340]],
 est:[[55.448,-20.879],[55.500,-20.890],[55.548,-20.897],[55.607,-20.907],[55.651,-20.963],[55.680,-21.000],[55.713,-21.034]],
 tampon:[[55.477,-21.340],[55.500,-21.300],[55.515,-21.278],[55.545,-21.240],[55.570,-21.210]],
 plaines:[[55.713,-21.034],[55.690,-21.080],[55.660,-21.110],[55.627,-21.137]]};
// les tronçons en tunnel : entre Saint-Denis et La Possession (sauf la gare de la Grande Chaloupe)
const TUN398=[[0,1],[1,2.0],[2.15,3]];// en numéros d'arrêts de la ligne ouest
const VH398={g:null,L:[],cle:'',lignes:null};
// les coordonnées approchées tombent parfois dans le lagon : chaque point est ramené sur la terre la plus proche
function terre398(x,z){try{if(alt(x,z)>=2)return [x,z];for(let r=.02;r<.8;r+=.02)for(let a=0;a<6.28;a+=.35){const u=x+Math.cos(a)*r,v=z+Math.sin(a)*r;if(alt(u,v)>=2)return [u,v]}}catch(e){}return [x,z]}
function chemin398(R){const B=R.map(([lo,la])=>{const [x,z]=xz(lo,la);return [x,z]});const P=[B[0]],IX=[0];for(let i=1;i<B.length;i++){const a=B[i-1],b=B[i],n=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/.04));for(let k=1;k<=n;k++)P.push([a[0]+(b[0]-a[0])*k/n,a[1]+(b[1]-a[1])*k/n]);IX.push(P.length-1)}
 for(let i=0;i<P.length;i++)P[i]=terre398(P[i][0],P[i][1]);P.sta=B.map(p=>terre398(p[0],p[1]));const D=[0];for(let i=1;i<P.length;i++)D.push(D[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));return {P,D,L:D[D.length-1],DS:IX.map(k=>D[k])}}
function point398(C,s){s=Math.max(0,Math.min(C.L,s));let i=1;while(i<C.D.length-1&&C.D[i]<s)i++;const a=C.P[i-1],b=C.P[i],f=(s-C.D[i-1])/((C.D[i]-C.D[i-1])||1);const x=a[0]+(b[0]-a[0])*f,z=a[1]+(b[1]-a[1])*f;let seg=0;if(C.DS){let j=1;while(j<C.DS.length-1&&C.DS[j]<s)j++;seg=j-1+(s-C.DS[j-1])/((C.DS[j]-C.DS[j-1])||1)}return {x,z,ang:Math.atan2(b[0]-a[0],b[1]-a[1]),seg}}
function boite398(g,w,h,l,c,x,y,z){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,l),new THREE.MeshLambertMaterial({color:c}));m.position.set(x||0,y||0,z||0);g.add(m);return m}
function roue398(g,r,x,y,z,c){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,.006,10),new THREE.MeshLambertMaterial({color:c||0x222222}));m.rotation.z=Math.PI/2;m.position.set(x,y,z);g.add(m);return m}
// les modèles, petits comme les figurines de la carte (une case fait environ un dixième d'unité de large)
function modele398(k){const g=new THREE.Group();
 if(k==='vapeur'){// locomotive-tender noire à cheminée haute et dôme (d'après les photos de la locomotive conservée), puis les voitures en bois sombre
  boite398(g,.034,.03,.07,0x1a1a1a,0,.03,0);const ch=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.045,10),new THREE.MeshLambertMaterial({color:0x202020}));ch.rotation.x=Math.PI/2;ch.position.set(0,.05,.014);g.add(ch);
  const ch2=new THREE.Mesh(new THREE.CylinderGeometry(.005,.005,.03,8),new THREE.MeshLambertMaterial({color:0x111111}));ch2.position.set(0,.078,.032);g.add(ch2);const dome=new THREE.Mesh(new THREE.SphereGeometry(.007,8,6),new THREE.MeshLambertMaterial({color:0x151515}));dome.position.set(0,.068,.008);g.add(dome);
  boite398(g,.034,.038,.022,0x222222,0,.05,-.026);boite398(g,.038,.004,.026,0x111111,0,.071,-.026);
  [-.075,-.13,-.185,-.24].forEach((z,i)=>{boite398(g,.033,.032,.05,i===3?0x5a4a3a:0x3a2e24,0,.034,z);boite398(g,.036,.004,.052,0x2a2420,0,.052,z)});g.userData.fumee=1}
 else if(k==='autorail'){// l'autorail rouge à toit clair (photos de l'autorail conservé)
  boite398(g,.036,.034,.13,0x9a2a22,0,.035,0);const t=new THREE.Mesh(new THREE.CylinderGeometry(.019,.019,.13,10,1,false,0,Math.PI),new THREE.MeshLambertMaterial({color:0xc8c0b0}));t.rotation.set(Math.PI/2,0,Math.PI/2);t.position.set(0,.052,0);t.scale.set(1,1,.45);g.add(t);
  boite398(g,.037,.01,.11,0x2a2a2a,0,.044,0);boite398(g,.037,.006,.132,0x1a1a1a,0,.017,0)}
 else if(k==='diligence'){// la diligence et ses chevaux
  boite398(g,.03,.032,.045,0x5a3a22,0,.04,0);boite398(g,.034,.006,.05,0x2a1a10,0,.058,0);[[-.017,.012],[.017,.012],[-.017,-.012],[.017,-.012]].forEach(([x,z])=>roue398(g,.012,x,.012,z,0x3a2a1a));
  [[-.009,.05],[.009,.05],[-.009,.075],[.009,.075]].forEach(([x,z])=>{boite398(g,.008,.014,.022,0x4a3020,x,.03,z);boite398(g,.006,.012,.006,0x3a2418,x,.042,z+.013)})}
 else if(k==='berliet'){boite398(g,.034,.034,.06,0x3a4a5a,0,.04,-.01);boite398(g,.03,.02,.025,0x2a2a2a,0,.03,.035);[[-.017,.03],[.017,.03],[-.017,-.025],[.017,-.025]].forEach(([x,z])=>roue398(g,.01,x,.01,z))}
 else if(k==='courant'){// le car courant d'air : capot de camion (Citroën type 45 et autres), caisse ouverte à bancs, toit blanc et galerie à bagages
  const C=[0x2e5aa8,0xb0302a,0x6a6a6a,0x2e5aa8][Math.floor(Math.random()*4)];boite398(g,.034,.008,.085,0x2a2a2a,0,.02,-.005);
  boite398(g,.026,.024,.026,C,0,.034,.045);boite398(g,.03,.006,.006,0xdddddd,0,.024,.06);boite398(g,.034,.004,.08,0xd8d0c0,0,.028,-.01);
  [[-.016,-.048],[.016,-.048],[-.016,.025],[.016,.025],[-.016,-.012],[.016,-.012]].forEach(([x,z])=>boite398(g,.003,.032,.003,0x8a7a60,x,.046,z));
  [-.035,-.015,.005].forEach(z=>boite398(g,.03,.004,.006,0x6a4a2a,0,.036,z));boite398(g,.038,.005,.085,0xeeeae0,0,.064,-.01);
  [-.017,.017].forEach(x=>boite398(g,.002,.008,.075,0xbbbbbb,x,.071,-.012));boite398(g,.022,.01,.02,0xb08a4a,0,.072,-.025);
  [[-.018,.035],[.018,.035],[-.018,-.035],[.018,-.035]].forEach(([x,z])=>roue398(g,.011,x,.011,z))}
 else if(k==='car'){boite398(g,.034,.036,.085,0xdedede,0,.034,0);boite398(g,.035,.01,.086,0x4a6a8a,0,.04,0);[[-.017,.03],[.017,.03],[-.017,-.03],[.017,-.03]].forEach(([x,z])=>roue398(g,.009,x,.009,z))}
 else if(k==='carjaune'){boite398(g,.034,.038,.09,0xf2c200,0,.035,0);boite398(g,.035,.012,.091,0x2a2a2a,0,.045,0);[[-.017,.032],[.017,.032],[-.017,-.032],[.017,-.032]].forEach(([x,z])=>roue398(g,.009,x,.009,z))}
 g.traverse(o=>{if(o.isMesh)o.castShadow=false});return g}
// ce qui roule à une année donnée
function liste398(y){const L=[],R=(k,rt,n,v,deb)=>{for(let i=0;i<n;i++)L.push({k,rt,v,s0:(i/n),dir:i%2?-1:1})};
 if(y>=1860&&y<1882){R('diligence','ouest',2,.06);R('diligence','est',1,.06)}
 if(y>=1882){const mod=y>=1950?'autorail':'vapeur';
  if(y<1956)R(mod,'ouest',2,.16);else if(y<1976)L.push({k:mod,rt:'ouest',v:.16,s0:0,dir:1,max:4});// après 1956 : seulement jusqu'au Port ; après 1963 : Saint-Denis – La Possession
  if(y<1963)R(mod,'est',1,.16)}
 if(y>=1912&&y<1925)R('berliet','ouest',1,.09);
 if(y>=1920&&y<1971){R('courant','ouest',2,.08);R('courant','est',1,.08);R('courant','tampon',1,.06);R('courant','plaines',1,.06)}
 if(y>=1970&&y<1996){R('car','ouest',2,.11);R('car','est',1,.11);R('car','tampon',1,.09)}
 if(y>=1996){R('carjaune','ouest',3,.12);R('carjaune','est',2,.12);R('carjaune','tampon',1,.1);R('carjaune','plaines',1,.1)}
 return L}
// la voie ferrée, tracée sur le relief tant qu'elle existe
function rails398(y){const g=VH398.g;if(VH398.lignes){g.remove(VH398.lignes);VH398.lignes.traverse(o=>{if(o.geometry)o.geometry.dispose()});VH398.lignes=null}if(y<1882)return;
 const P=[],ajoute=(rt,max)=>{const C=chemin398(RT398[rt]);const fin=max!=null?C.DS[Math.min(max,C.DS.length-1)]:C.L;for(let s=0;s<fin;s+=.03){const a=point398(C,s),b=point398(C,Math.min(fin,s+.03));if(TUN398.some(([u,v])=>rt==='ouest'&&a.seg>=u&&a.seg<v))continue;P.push(a.x,Math.max(0,alt(a.x,a.z))*VX+.012,a.z,b.x,Math.max(0,alt(b.x,b.z))*VX+.012,b.z)}};
 if(y<1956){ajoute('ouest');}else if(y<1963)ajoute('ouest',4);else if(y<1976)ajoute('ouest',3);if(y<1963)ajoute('est');if(!P.length)return;
 const ge=new THREE.BufferGeometry();ge.setAttribute('position',new THREE.Float32BufferAttribute(P,3));VH398.lignes=new THREE.LineSegments(ge,new THREE.LineBasicMaterial({color:0x3a2e26,transparent:true,opacity:.85}));g.add(VH398.lignes)}
function maj398(){if(typeof scene==='undefined'||!scene||typeof S==='undefined'||!S)return;if(!VH398.g){VH398.g=new THREE.Group();VH398.g.name='transports398'}if(VH398.g.parent!==scene)scene.add(VH398.g);
 const y=S.year||1663,cle=String(y<1860?0:y<1882?1:y<1912?2:y<1920?3:y<1925?4:y<1950?5:y<1956?6:y<1963?7:y<1970?8:y<1971?9:y<1976?10:y<1996?11:12);if(cle===VH398.cle)return;VH398.cle=cle;
 VH398.L.forEach(v=>VH398.g.remove(v.m));VH398.L=[];rails398(y);
 liste398(y).forEach(d=>{const C=chemin398(RT398[d.rt]);const fin=d.max!=null?C.DS[Math.min(d.max,C.DS.length-1)]:C.L;const m=modele398(d.k);m.scale.setScalar(1.6);VH398.g.add(m);VH398.L.push({...d,C,fin,s:d.s0*fin,m,arret:0})})}
setInterval(()=>{try{maj398()}catch(e){}},1500);
// le mouvement : aller-retour sur la ligne, arrêt en gare (aux points de la ligne), fumée de la vapeur ; caché dans les tunnels
(function b398(){requestAnimationFrame(b398);try{if(!VH398.g||!VH398.L.length||typeof S==='undefined'||!S)return;const vis=!(typeof INC!=='undefined'&&INC)&&!(typeof CINE!=='undefined'&&CINE);VH398.g.visible=vis;if(!vis)return;
 const now=performance.now(),dt=Math.min(.1,(now-(VH398.t||now))/1000);VH398.t=now;
 VH398.L.forEach(v=>{if(v.arret>0)v.arret-=dt;else{const ns=v.s+v.dir*v.v*dt;const D=v.C.DS;const k0=D.findIndex(d=>d>v.s),k1=D.findIndex(d=>d>ns);if(k0!==k1&&v.k!=='diligence')v.arret=2.5;v.s=ns;if(v.s>v.fin){v.s=v.fin;v.dir=-1;v.arret=4}if(v.s<0){v.s=0;v.dir=1;v.arret=4}}
  const p=point398(v.C,v.s),y=Math.max(0,alt(p.x,p.z))*VX+.012;v.m.position.set(p.x,y,p.z);v.m.rotation.y=p.ang+(v.dir<0?Math.PI:0);
  v.m.visible=!((v.k==='vapeur'||v.k==='autorail')&&v.rt==='ouest'&&TUN398.some(([u,w])=>p.seg>=u&&p.seg<w))})}catch(e){}})();
// les fiches d'archives
try{Object.assign(EV,{
 dili398:{y:1862,si:()=>!!S,tag:'Archive',an:'années 1860',t:'Les diligences de la côte',b:'Pour aller d’une ville à l’autre, on prend la diligence : une voiture fermée, tirée par quatre à six chevaux pour les courses rapides entre les villes de la côte. Les routes des Hauts ne sont encore que des sentiers.',v:'Les hippomobiles roulent jusqu’à l’arrivée du train en 1882. L’année exacte des premières lignes régulières n’a pas été trouvée.',h:'Car Jaune, « Historique ».',o:[{n:'Continuer',d:'',fx:{},hist:1}]},
 berliet1912:{y:1912,si:()=>!!S,tag:'Archive',an:'1912',t:'Le premier car',b:'Un Berliet de trente-six places relie Le Port à Saint-Pierre. Le train ne longe que la côte ; le car, lui, pourra monter vers les Hauts.',v:'Premier car de l’île, en 1912.',h:'Car Jaune, « Historique ».',o:[{n:'Continuer',d:'',fx:{},hist:1}]},
 courant1920:{y:1922,si:()=>!!S,tag:'Archive',an:'années 1920',t:'Les cars courant d’air',b:'Sur des châssis de camion, des transporteurs de l’île font monter des caisses en bois, ouvertes sur les côtés pour l’air. On y monte avec les soubiques, les volailles, parfois un cabri. Pour descendre, on frappe deux fois dans les mains. Dans les côtes raides, les passagers descendent pousser.',v:'Les derniers cars courant d’air en bois roulent jusque vers 1970.',h:'Imaz Press, « Les cars jaunes au cœur de la vie des Réunionnais » ; Car Jaune, « Historique ».',o:[{n:'Continuer',d:'',fx:{},hist:1}]},
 train1956:{y:1956,si:()=>!!S,tag:'Archive',an:'1956 – 1963',t:'Le train s’arrête',b:'Les cars et les camions prennent les voyageurs et le sucre. La ligne du Port à Saint-Pierre ferme en 1956 ; le reste du réseau vers 1963, quand s’ouvre la route du Littoral, en juin.',v:'Un dernier tronçon, Saint-Denis – La Possession, tient jusqu’en 1976. Un train touristique roule de nouveau à la Grande Chaloupe de 1990 à 1992.',h:'International Steam Pages (Réunion) ; Car Jaune, « Historique ».',o:[{n:'Continuer',d:'',fx:{},hist:1}]},
 carjaune1996:{y:1996,si:()=>!!S,tag:'Archive',an:'janvier 1996',t:'Le Car Jaune',b:'Le Département crée le réseau Car Jaune : des lignes entre toutes les villes de l’île, avec des cars peints en jaune.',v:'Créé en janvier 1996, après le réseau Alizé (1988).',h:'Car Jaune, « Historique ».',o:[{n:'Continuer',d:'',fx:{},hist:1}]}})}catch(e){}
try{if(typeof histOK==='function'){const h0=histOK;histOK=function(k){if(/^(dili398|berliet1912|courant1920|train1956|carjaune1996)$/.test(k))return true;return h0.apply(this,arguments)}}}catch(e){}
// ===== monter dedans : un trajet devient un petit film, d'arrêt en arrêt (depuis la carte, les fiches d'archives, ou les Fiches de l'île) =====
// Le Ti-Train : 126 km de Saint-Benoît à Saint-Pierre, environ 12 heures de trajet à 25 km/h de moyenne ; plus de 10 km de tunnels
// sous la Montagne entre Saint-Denis et La Possession, avec la halte de la Grande Chaloupe (Wikipédia, « Chemin de fer de La Réunion » ;
// Randopitons ; Ouest-La Réunion). Les cars courant d'air montent vers les cirques et les plaines (Univ'île, Linfo, Imaz Press).
const TRAJ398={
 train:{n:'Le Ti-Train, de Saint-Benoît à Saint-Pierre',mod:()=>(typeof S!=='undefined'&&S&&S.year>=1950)?'autorail':'vapeur',e:[
  ['Saint-Benoît, la marine du Bourbier',55.713,-21.034,'Kilomètre zéro. Le sucre de l’Est attend en sacs sur le quai.'],
  ['Bras-Panon',55.680,-21.000,'La voie longe les champs de canne, au ras de la mer.'],
  ['Saint-André',55.651,-20.963,'On charge, on décharge. Vingt-cinq kilomètres à l’heure, en moyenne : le trajet entier prend une journée.'],
  ['Sainte-Suzanne',55.607,-20.907,''],['Sainte-Marie',55.548,-20.897,''],
  ['Saint-Denis, la gare du Barachois',55.448,-20.879,'Kilomètre 38,8. La gare centrale, face à la mer.'],
  ['Sous la Montagne',55.420,-20.884,'Le train entre sous la falaise : plus de dix kilomètres de tunnels, en plusieurs tronçons. Le noir, la fumée, le bruit.',1],
  ['La Grande Chaloupe',55.383,-20.896,'Une halte entre deux tunnels, au fond de la ravine. Les trains s’y croisent.'],
  ['La Possession',55.336,-20.928,'On sort de la Montagne.',1],
  ['Le Port, la Pointe des Galets',55.292,-20.937,'Le port d’où partent les sacs de sucre ; c’est pour lui que la voie a été faite.'],
  ['Saint-Paul, le quai Gilbert',55.272,-21.000,''],['Saint-Gilles-les-Bains',55.222,-21.060,'Les plages, la côte sous le vent.'],
  ['La Saline-les-Bains',55.240,-21.100,''],['Saint-Leu',55.285,-21.170,''],['L’Étang-Salé',55.360,-21.262,''],['Saint-Louis',55.412,-21.286,''],
  ['Saint-Pierre',55.477,-21.340,'Terminus : 126 kilomètres de voie métrique, de Saint-Benoît jusqu’ici.']]},
 cilaos:{n:'Le car courant d’air, de Saint-Louis à Cilaos',mod:()=>'courant',e:[['Saint-Louis',55.412,-21.286,'Les soubiques sur la galerie, une poule sous le banc.'],['Le Pavillon',55.440,-21.200,'La route monte dans la ravine : on l’appelle la route aux 400 virages.'],['Le Pont de Peter Both',55.455,-21.170,'Dans les côtes, on descend pousser.'],['Cilaos',55.471,-21.135,'Le cirque. Ses sources chaudes, ses lentilles.']]},
 salazie:{n:'Le car courant d’air, de Saint-André à Hell-Bourg',mod:()=>'courant',e:[['Saint-André',55.651,-20.963,''],['Salazie',55.528,-21.028,'La route suit la Rivière du Mât, entre les cascades.'],['Hell-Bourg',55.523,-21.064,'Au fond du cirque, les cases créoles et les thermes d’autrefois.']]},
 cafres:{n:'Le car courant d’air, de Saint-Pierre à la Plaine des Cafres',mod:()=>'courant',e:[['Saint-Pierre',55.477,-21.340,''],['Le Tampon',55.515,-21.278,'La route monte tout droit dans la canne, puis dans les géraniums.'],['La Plaine des Cafres',55.570,-21.210,'Le froid, les vaches, les pâturages.']]},
 plaines:{n:'Le car courant d’air, de Saint-Benoît à la Plaine des Palmistes',mod:()=>'courant',e:[['Saint-Benoît',55.713,-21.034,''],['La route des Plaines',55.670,-21.100,'Les lacets dans la forêt de l’Est, sous la pluie.'],['La Plaine des Palmistes',55.627,-21.137,'Les palmistes, la brume.']]}};
function trajet398(id){const D=TRAJ398[id];if(!D||typeof cineJouer!=='function'||typeof scene==='undefined')return;const C=chemin398(D.e.map(e=>[e[1],e[2]])),E=D.e.map(([n,lo,la,t,tun],i)=>({n,t,tun,s:C.DS[i]}));
 const m=modele398(D.mod());m.scale.setScalar(2.3);scene.add(m);
 // pendant le trajet, le brouillard des cases inconnues se lève (le film montre l'île telle qu'on la traverse), puis revient
 const clair=setInterval(()=>{try{if(typeof CINE==='undefined'||!CINE){clearInterval(clair);try{peindre()}catch(e){}return}for(let k=0;k<stData.length;k+=4)stData[k]=0;stTex.needsUpdate=true}catch(e){clearInterval(clair)}},300);
 const pose=(i,e)=>{const a=E[i-1],b=E[i],q=point398(C,a.s+(b.s-a.s)*e);m.position.set(q.x,Math.max(0,alt(q.x,q.z))*VX+.012,q.z);m.rotation.y=q.ang;m.visible=!((a.tun&&e<.8)||(b.tun&&e>.2))};
 const az0=(typeof az!=='undefined'?az:0),shots=[],ou=s=>point398(C,s);
 for(let i=1;i<E.length;i++){const a=E[i-1],b=E[i],pa=ou(a.s),pb=ou(b.s),L=b.s-a.s;
  if(i===1)shots.push({d:3500,cam:[pa.x,pa.z,2.3,az0,.8],camY:0,init:()=>pose(1,0),txt:'<small>'+D.n+'</small>'+a.n+(a.t?' — '+a.t:'')});
  // la caméra glisse vers l'arrêt suivant au même rythme que le véhicule : il reste au milieu de l'image
  shots.push({d:Math.max(4200,Math.min(8000,3000+L*900)),cam:[pb.x,pb.z,2.3,az0+i*.12,.8],camY:0,init:()=>pose(i,0),f:(U,k)=>{const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;pose(i,e)},txt:'<small>'+b.n+'</small>'+(b.t||'')})}
 const fin=()=>{try{scene.remove(m)}catch(e){}};try{if(VH398.g)VH398.g.visible=true}catch(e){}cineJouer(shots,fin);setTimeout(()=>{try{if(typeof CINE==='undefined'||!CINE)fin()}catch(e){}},shots.reduce((s,x)=>s+x.d,0)+4000)}
// les fiches d'archives proposent le trajet
try{if(EV.e1882&&EV.e1882.o)EV.e1882.o.push({n:'🎬 Prendre le Ti-Train',d:'De Saint-Benoît à Saint-Pierre, en film.',fx:{},hist:1,f:()=>setTimeout(()=>trajet398('train'),300)});
 if(EV.courant1920)EV.courant1920.o=[{n:'🎬 Monter à Cilaos',d:'',fx:{},hist:1,f:()=>setTimeout(()=>trajet398('cilaos'),300)},{n:'🎬 Monter à Hell-Bourg',d:'',fx:{},hist:1,f:()=>setTimeout(()=>trajet398('salazie'),300)},{n:'🎬 Monter à la Plaine des Cafres',d:'',fx:{},hist:1,f:()=>setTimeout(()=>trajet398('cafres'),300)},{n:'Continuer',d:'',fx:{},hist:1}]}catch(e){}
// et dans les Fiches de l'île, hors partie
const FICT398={'Le chemin de fer':['train'],'Les cars courant d’air':['cilaos','salazie','cafres','plaines'],'Le premier car':['cafres']};
setInterval(()=>{try{const b=document.getElementById('fic208b');if(!b||document.getElementById('fic398'))return;const h=b.parentElement.querySelector('h1');const L=h&&FICT398[h.textContent.trim()];if(!L)return;
 const d=document.createElement('div');d.id='fic398';d.style.margin='8px 0';d.innerHTML=L.map(k=>'<button class="bt sec" data-t398="'+k+'" style="margin:3px 4px 3px 0">🎬 '+TRAJ398[k].n+'</button>').join('');b.before(d);
 d.querySelectorAll('[data-t398]').forEach(x=>x.onclick=()=>{$('ecran').hidden=true;trajet398(x.dataset.t398);const w=setInterval(()=>{if(typeof CINE==='undefined'||!CINE){clearInterval(w);$('ecran').hidden=false}},500)})}catch(e){}},500);
// sur la carte : la case d'une gare (ou d'un arrêt de car) propose de monter, à l'époque où ça roule
{const pn=panneau;panneau=function(){const r=pn.apply(this,arguments);try{if(!S||S.fin||!sel)return r;const p=$('side');if(!p||p.querySelector('#ride398'))return r;const y=S.year||0,t=sel,B=[];
  const pres=(id,i)=>{const e=TRAJ398[id].e[i];const [x,z]=xz(e[1],e[2]);return Math.hypot(t.x-x,t.z-z)<.35};
  if(y>=1882&&y<1963&&TRAJ398.train.e.some((e,i)=>!e[4]&&pres('train',i)))B.push(['train','🚂 Prendre le Ti-Train']);
  if(y>=1920&&y<1971)['cilaos','salazie','cafres','plaines'].forEach(id=>{if(pres(id,0))B.push([id,'🚌 '+TRAJ398[id].n.replace('Le car courant d’air, ','Car courant d’air : ')])});
  if(!B.length)return r;const d=document.createElement('div');d.id='ride398';d.style.margin='8px 0';d.innerHTML=B.map(([k,n])=>'<button class="bt sec" data-r398="'+k+'" style="display:block;width:100%;text-align:left;margin:4px 0">'+n+'</button>').join('');p.insertBefore(d,p.children[2]||null);
  d.querySelectorAll('[data-r398]').forEach(x=>x.onclick=()=>trajet398(x.dataset.r398))}catch(e){}return r}}
// ===== dans le car courant d'air : frapper deux fois dans les mains pour descendre (le geste déclenche le rituel), puis une petite note.
// Ni sonnette, ni arrêt marqué : on levait la main au bord de la route pour monter, on frappait deux fois dans les mains pour descendre ;
// le receveur montait à l'échelle arrière descendre les soubiques de l'impériale. Dans les côtes raides, les passagers valides
// descendaient pousser. Chaque car portait un nom peint (Versailles, Marina, Ville de Paris…) pour ceux qui ne lisaient pas.
// (Car Jaune ; Imaz Press ; Univ'île ; Réunionnais du Monde.) =====
const NOMS398=['Versailles','Marina','Ville de Paris'];
function note398(t,b){let d=document.getElementById('note398');if(d)d.remove();d=document.createElement('div');d.id='note398';d.style.cssText='position:fixed;right:14px;top:14px;z-index:9500;max-width:min(360px,80vw);background:rgba(244,236,216,.96);color:#2a2218;border-left:5px solid #b0302a;border-radius:8px;padding:10px 12px;font:14px/1.45 Georgia,serif;box-shadow:0 4px 18px rgba(0,0,0,.4)';
 d.innerHTML='<b style="display:block;font:700 11px system-ui;letter-spacing:.08em;text-transform:uppercase;color:#b0302a;margin-bottom:3px">'+t+'</b>'+b;document.body.appendChild(d);setTimeout(()=>{d.style.transition='opacity .8s';d.style.opacity=0;setTimeout(()=>d.remove(),900)},11000)}
function arret398(ms){const fin=performance.now()+ms;const w=setInterval(()=>{if(typeof CINE==='undefined'||!CINE){clearInterval(w);return}CINE.t0+=60;if(performance.now()>fin)clearInterval(w)},60)}
{const t0=trajet398;trajet398=function(id){const r=t0.apply(this,arguments);try{const D=TRAJ398[id];if(!D||D.mod()!=='courant'||typeof CINE==='undefined'||!CINE)return r;
  const nom=NOMS398[Math.floor(Math.random()*NOMS398.length)];note398('Le car « '+nom+' »','Chaque car porte un nom peint sur sa caisse : beaucoup de voyageurs ne savent pas lire, mais tous reconnaissent leur car.');
  const b=document.createElement('button');b.className='bt';b.textContent='👏 Taper deux fois dans les mains';b.title='Pour descendre (touche C)';b.style.cssText='position:absolute;left:50%;bottom:calc(13vh + 150px);transform:translateX(-50%);z-index:5;pointer-events:auto';CINE.el.appendChild(b);let fois=0;
  const geste=()=>{if(b.disabled)return;b.disabled=true;fois++;arret398(4200);try{clap398()}catch(e){}
   note398('Deux claquements de mains','Pas de sonnette ni d’arrêt marqué dans les cars courant d’air : on frappe deux fois dans les mains, un bruit sec qui passe par-dessus le moteur et le vent. Le chauffeur ralentit, le receveur grimpe à l’échelle arrière et descend les soubiques de l’impériale ; tout le car attend.'+(fois>1?' Pour monter, on lève simplement la main au bord de la route.':''));
   setTimeout(()=>{b.disabled=false},4500)};
  b.onclick=geste;const kd=e=>{if((e.key||'').toLowerCase()==='c'&&typeof CINE!=='undefined'&&CINE){e.preventDefault();geste()}};addEventListener('keydown',kd);
  // dans la grande côte, c'est le chauffeur qui fait signe : on descend pousser
  let pousse=0;const w=setInterval(()=>{if(typeof CINE==='undefined'||!CINE){clearInterval(w);removeEventListener('keydown',kd);return}const sh=CINE.shots[CINE.i];if(!pousse&&sh&&/400 virages|pousser|lacets|tout droit/.test(sh.txt||'')&&performance.now()-CINE.t0>sh.d*.45){pousse=1;arret398(3500);note398('Tout le monde pousse','La côte est trop raide pour le vieux moteur : le chauffeur fait signe, les passagers valides descendent pousser le car jusqu’en haut, puis remontent en marche.')}},250)}catch(e){console.warn(e)}return r}}
// deux claquements secs, fabriqués à la volée (bruit court qui retombe vite)
function clap398(){const ctx=typeof sndPret==='function'&&sndPret();if(!ctx)return;const n=Math.floor(ctx.sampleRate*.06),buf=ctx.createBuffer(1,n,ctx.sampleRate),d=buf.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,6);
 const out=(typeof SND!=='undefined'&&SND.out)||ctx.destination;[0,.2].forEach(t=>{const s=ctx.createBufferSource();s.buffer=buf;const f=ctx.createBiquadFilter();f.type='bandpass';f.frequency.value=1400;f.Q.value=.8;const g=ctx.createGain();g.gain.value=1.4;s.connect(f);f.connect(g);g.connect(out);s.start(ctx.currentTime+t)})}
// ===== la guerre et le carburant de canne. De fin 1940 à novembre 1942, l'île sous Vichy est coupée par le blocus allié : plus d'essence,
// plus d'exportation de sucre. Les cars roulent avec un mélange d'environ 90 % d'alcool de canne et 10 % d'essence ; le GRAHTER
// (cité par 7 Lames la Mer) et Témoignages (2007) en attribuent la formule à Hadjee Amode Patel, avec l'huile de bancoul pour le moteur. Après la guerre,
// l'essence revient et l'alcool, qui usait les moteurs, est abandonné. Le ralliement à la France libre a lieu le 28 novembre 1942
// (le contre-torpilleur Léopard). Sources : Persée, Cahiers d'outre-mer (1951) ; Vroum.info ; Réunionnais du Monde. =====
try{Object.assign(EV,{alcool1941:{y:1941,si:()=>!!S,tag:'Archive',an:'1940 – 1942',t:'Les cars roulent à la canne',
 b:'L’île est coupée du monde : le blocus arrête les navires, l’essence ne vient plus et le sucre ne part plus. Dans les distilleries, on fait de l’alcool avec la canne et la mélasse invendues ; les cars courant d’air roulent avec un mélange d’environ neuf parts d’alcool pour une part d’essence.',
 v:'Le blocus dure de fin 1940 à novembre 1942 ; l’île se rallie à la France libre le 28 novembre 1942. Les recherches du GRAHTER (rapportées par 7 Lames la Mer) et une chronique de Témoignages (2007) attribuent la formule à Hadjee Amode Patel ; pour graisser le moteur, on prend l’huile de bancoul faite dans l’île. En 1950, avec près de vingt cars, il devient le premier transporteur de voyageurs. Après la guerre, l’essence revient : l’alcool, chargé d’eau et d’impuretés, rongeait les carburateurs.',
 h:'Persée, Cahiers d’outre-mer (1951) ; 7 Lames la Mer, « Génie réunionnais » (d’après le GRAHTER) ; Témoignages (2007) ; Réunionnais du Monde.',o:[{n:'🎬 Monter dans le car (à la canne)',d:'',fx:{},hist:1,f:()=>setTimeout(()=>trajet398('cafres'),300)},{n:'Continuer',d:'',fx:{},hist:1}]}})}catch(e){}
try{if(typeof histOK==='function'){const h0=histOK;histOK=function(k){if(k==='alcool1941')return true;return h0.apply(this,arguments)}}}catch(e){}
try{FICT398['Les cars roulent à la canne']=['cafres','cilaos']}catch(e){}
{const t1=trajet398;trajet398=function(id){const r=t1.apply(this,arguments);try{const y=typeof S!=='undefined'&&S&&S.year;if(y>=1940&&y<=1945&&TRAJ398[id]&&TRAJ398[id].mod()==='courant')setTimeout(()=>note398('Au carburant de canne','La guerre et le blocus : plus d’essence. Le moteur tourne avec neuf parts d’alcool de canne pour une part d’essence. Le moteur est graissé à l’huile de bancoul, faite dans l’île. Il tousse dans les côtes, et le carburateur ne le supportera pas longtemps.'),12500)}catch(e){}return r}}
// avant la guerre : le rhum contingenté (1922) et l'idée du « carburant national » en France ; l'île, elle, roule encore à l'essence en fûts
try{Object.assign(EV,{rhum1922:{y:1922,si:()=>!!S,tag:'Archive',an:'1922',t:'Le rhum contingenté',
 b:'Après la Grande Guerre, l’île produit plus d’alcool de canne qu’elle n’en vend. Paris limite par un contingent les rhums des colonies, pour protéger les vins et les alcools de France. Là-bas, on parle déjà d’un « carburant national », de l’essence mêlée d’alcool ; ici, les premières autos et les cars courant d’air roulent à l’essence, venue par bateau en fûts.',
 v:'Le contingentement des rhums coloniaux date de 1922. Aucun carburant à l’alcool n’est vendu à La Réunion avant la guerre ; c’est le blocus de 1940 qui l’imposera.',
 h:'La saga du rhum, « Le rhum et La Réunion » ; Biterre, « 1923 : Édouard Barthe et le carburant national ».',o:[{n:'Continuer',d:'',fx:{},hist:1}]}})}catch(e){}
try{if(typeof histOK==='function'){const h0=histOK;histOK=function(k){if(k==='rhum1922')return true;return h0.apply(this,arguments)}}}catch(e){}
