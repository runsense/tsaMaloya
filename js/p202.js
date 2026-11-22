// ===== p202 : l'instinct qui guide les pas. Il monte avec ce qu'on traverse (la traque, le cyclone qui approche, la faim,
// la pluie, la vie dans les Hauts, la mystique) et redescend quand tout est calme. Fort, il fait voir les signes des bêtes :
// les oiseaux de mer qui rentrent dans les ravines avant le cyclone, les roussettes qui chassent en nombre avant la pluie,
// les grenouilles qui chantent sous l'averse, le papangue qui tourne au-dessus du camp, le tangue qui ne sort plus.
// Plus fort encore, il devient une mystique, selon ce qui l'a nourri. Rien n'est expliqué : on le voit, on l'entend. =====
function inst202(){if(!S)return null;if(!S.inst)S.inst={v:10,src:{cyclone:0,traque:0,faim:0,pluie:0},dons:{},vu:{}};return S.inst}
const DONS202={cyclone:{n:'Lire le ciel',j:'Les anciens regardent passer les oiseaux de mer, et rentrent le bois avant tout le monde.'},
 traque:{n:'Le pas du tangue',j:'On marche maintenant comme le tangue : la terre dit qui vient, et l’on n’est jamais là où on nous cherche.'},
 faim:{n:'La réserve de la roussette',j:'Avant les mauvais jours, on cueille et on sèche comme les roussettes qui chassent avant la pluie.'},
 pluie:{n:'Le chant de la grenouille',j:'Sous l’averse, les femmes chantent avec les grenouilles ; les malades dorment mieux.'}};
// chaque saison : l'instinct monte ou redescend, et les dons agissent
{let ns=-1;setInterval(()=>{try{if(!S||S.fin||ns===S.ns)return;const prem=ns<0;ns=S.ns;if(prem)return;const I=inst202(),c=(typeof camps==='function'&&camps()[0])||null;let d=-3;
  const add=(k,n)=>{d+=n;I.src[k]=(I.src[k]||0)+n};
  if((S.traque||0)>40)add('traque',4+((S.traque||0)>65?3:0));
  if(S.cyc&&S.cyc.in<=1)add('cyclone',5);
  try{if(typeof faimNiv==='function'&&faimNiv()>=2)add('faim',4)}catch(e){}
  if(typeof pluie==='function'&&pluie())add('pluie',2);
  if(c&&c.alt>700)d+=2;d+=Math.min(4,(S.myst||0)/30);
  I.v=Math.max(0,Math.min(100,I.v+d));
  if(typeof pousse201==='function'&&d>0)pousse201({myst:d*.4});
  // les dons : au-delà de 60, celui de ce qui a le plus nourri l'instinct
  if(I.v>=60){const k=Object.entries(I.src).sort((a,b)=>b[1]-a[1])[0][0];if(!I.dons[k]){I.dons[k]=1;try{journal(DONS202[k].j)}catch(e){}}}
  if(I.dons.traque)S.traque=Math.max(0,(S.traque||0)-4);
  if(I.dons.faim&&typeof fx==='function')fx({vivres:2});
  if(I.dons.pluie&&pluie())S.sante=Math.min(100,(S.sante||50)+1);
  if(I.dons.cyclone&&S.cyc&&S.cyc.in<=1)S.abri=1;
  if(I.v>=50)S.traque=Math.max(0,(S.traque||0)-1)}catch(e){}},1500)}

// ----- les bêtes, en petits vols au-dessus de l'île -----
const VOL202=[];
function vol202(n,col,taille,chemin,duree){try{if(typeof scene==='undefined')return;const g=new THREE.Group(),M=new THREE.MeshBasicMaterial({color:col,side:THREE.DoubleSide,transparent:true,opacity:.95,depthWrite:false});
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,-1,0,.5,-.35,0,-.1, 0,0,0,1,0,.5,.35,0,-.1],3));
 const B=[];for(let i=0;i<n;i++){const o=new THREE.Mesh(geo,M);o.scale.setScalar(taille*(.8+Math.random()*.4));o.userData={dx:(Math.random()-.5)*taille*12,dz:(Math.random()-.5)*taille*12,dy:(Math.random()-.5)*taille*4,ph:Math.random()*6};g.add(o);B.push(o)}
 g.renderOrder=8;scene.add(g);VOL202.push({g,B,chemin,t0:performance.now(),duree})}catch(e){}}
(function anime202(){requestAnimationFrame(anime202);try{const now=performance.now();for(let i=VOL202.length-1;i>=0;i--){const V=VOL202[i],u=(now-V.t0)/V.duree;if(u>=1){scene.remove(V.g);VOL202.splice(i,1);continue}
  const [x,y,z,ang]=V.chemin(u);V.g.position.set(x,y,z);V.g.rotation.y=ang;const fl=Math.sin(now/90);V.B.forEach(o=>{const d=o.userData;o.position.set(d.dx,d.dy+Math.sin(now/400+d.ph)*.02,d.dz);o.scale.y=Math.abs(Math.sin(now/90+d.ph))*.9+.1});
  V.g.visible=!(typeof VP!=='undefined'&&VP)}}catch(e){}})();
const hY=(x,z)=>Math.max(0,typeof alt==='function'?alt(x,z):0)*VX;

// ----- les signes -----
setInterval(()=>{try{if(!S||S.fin||typeof camT==='undefined')return;const I=inst202(),c=(typeof camps==='function'&&camps()[0])||null;if(!c)return;const now=performance.now(),cle=(S.ns||0);
 const ph=typeof jourPh==='function'?jourPh():.4,soir=ph>.58&&ph<.8;
 // avant le cyclone : les oiseaux de mer quittent la côte et rentrent vers les ravines
 if(S.cyc&&S.cyc.in===1&&I.v>=25&&I.vu.ois!==cle&&Math.random()<.25){I.vu.ois=cle;const a=Math.random()*6.28,sx=c.x+Math.cos(a)*14,sz=c.z+Math.sin(a)*14;
  vol202(14,0xf4f4ee,.045,u=>{const x=sx+(c.x-sx)*u,z=sz+(c.z-sz)*u;return [x,hY(x,z)+1.2+Math.sin(u*3)*.2,z,Math.atan2(c.x-sx,c.z-sz)]},26000);try{journal('Les oiseaux de mer rentrent dans les ravines, très tôt.')}catch(e){}}
 // avant la pluie : les roussettes chassent en nombre au crépuscule
 if(!pluie()&&((S.ns||0)+1)%2===0&&I.v>=20&&soir&&I.vu.rou!==cle&&Math.random()<.3){I.vu.rou=cle;vol202(11,0x2a1d18,.06,u=>{const r=.9+.3*Math.sin(u*9),a=u*Math.PI*6;const x=c.x+Math.cos(a)*r,z=c.z+Math.sin(a)*r;return [x,hY(c.x,c.z)+.7,z,-a]},30000);try{journal('Ce soir, les roussettes chassent en nombre au-dessus du camp.')}catch(e){}}
 // le papangue tourne au-dessus du camp quand l'instinct est fort
 if(I.v>=50&&I.vu.pap!==cle&&Math.random()<.2){I.vu.pap=cle;vol202(1,0x5a3e28,.12,u=>{const a=u*Math.PI*4;return [c.x+Math.cos(a)*1.6,hY(c.x,c.z)+1.6,c.z+Math.sin(a)*1.6,-a]},40000)}
 // la traque monte : le tangue ne sort plus, la terre gronde à peine
 if((S.traque||0)>=60&&I.v>=35&&I.vu.tan!==cle&&Math.random()<.2){I.vu.tan=cle;try{journal('Le tangue ne sort plus de son terrier.')}catch(e){}if(typeof sBruit==='function')sBruit(2.5,{ft:'lowpass',f:60,q:.5,v:.12,a:.8})}
 // sous l'averse, près du camp, les grenouilles chantent, d'autant plus que l'instinct écoute
 const pl=typeof pluieF106==='function'?pluieF106():0,pres=Math.max(0,1-Math.hypot(camT.x-c.x,camT.z-c.z)/8);
 if(pl>.3&&pres>.1&&typeof sTon==='function'&&(typeof vpCalme204!=='function'||vpCalme204()>.6)&&Math.random()<.5*pres*(.4+I.v/100)){const f=380+Math.random()*260,n=2+Math.floor(Math.random()*3);for(let i=0;i<n;i++)sTon(f,.07,{t:i*.11,vers:f*.62,type:'square',fl:900,v:.012*pres})}}catch(e){}},1200);
