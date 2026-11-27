// ===== p375 : les arènes des boss sans formes géométriques. Au fond, un panorama peint à l'aquarelle (montagnes en lavis,
// papier grené) ; devant, de vrais objets 3D du jeu (fanjan, tamarins, cases, rochers, chaloupe…) au lieu des cônes et des cubes. =====
const DEC375={
 foret:[['plante_fanjan',650,8],['plante_bois_chandelle',700,5],['plante_benjoin',800,5],['plante_tamarin',900,4],['sk_pierre',160,6],['bat_case_paille',420,1]],
 hauts:[['plante_tamarin',850,7],['plante_branle',180,10],['plante_ambaville',220,8],['sk_pierre',170,6]],
 cour:[['bat_habitation',650,3],['bat_magasin',450,2],['plante_palmiste',1100,6],['plante_tamarin',850,3],['bat_charrette',220,1]],
 rempart:[['sk_pierre',380,10],['plante_branle',200,10],['plante_ambaville',230,8],['plante_tamarin',800,3]],
 grotte:[['sk_pierre',420,18]],
 volcan:[['sk_pierre',260,16],['plante_branle',150,4]],
 riviere:[['sk_pierre',200,9],['plante_vacoa',700,5],['plante_latanier',800,4],['plante_arbre',850,4]],
 ecole:[['bat_chapelle',700,1],['bat_case_paille',420,3],['plante_tamarin',850,5],['plante_arbre',800,4]],
 cannes:[['bat_moulin',700,1],['bat_cheminee',1300,1],['bat_charrette',220,2],['plante_palmiste',1000,3]],
 jardin:[['plante_palmiste',1100,5],['plante_latanier',800,5],['sk_cocotier',1000,4],['plante_cafeier',260,8],['sk_arbrelp',800,3]],
 barachois:[['sk_cocotier',1000,6],['plante_latanier',800,3]],
 kabar:[['bat_case_paille',420,4],['plante_vacoa',650,5],['sk_cocotier',1000,4],['bat_bobre',150,1],['bat_kayamb',90,1],['bat_rouler',110,1]],
 cimetiere:[['plante_arbre',800,5],['plante_tamarin',850,3]]};
// les teintes du panorama : [ciel haut, ciel bas, montagnes lointaines, montagnes proches]
const PAN375={foret:['#8fae9c','#d8e2c8','#7e9a86','#4e6a50'],hauts:['#2a3450','#5a6480','#3e4862','#2a3440'],cour:['#a8c0d0','#efe6d0','#a8b4b0','#7a8a78'],
 rempart:['#9fb4c0','#e8e4d4','#8a948a','#5e6658'],grotte:['#1a1414','#3a2420','#2a1e1c','#1e1614'],volcan:['#3a2a2a','#c06a3a','#5a3a30','#2e201c'],
 riviere:['#a8c4c8','#eee8d4','#88a49a','#5a7a62'],ecole:['#2e3448','#5a5a68','#3a4250','#262c38'],cannes:['#b8c8c8','#f0e8cc','#9aaa90','#6a8a56'],
 jardin:['#b0c8d8','#f2ecd8','#8aa898','#5a7e5a'],barachois:['#b0c8d4','#f4ecd8','#8aa4b0','#5a7888'],kabar:['#16141e','#3a2a2a','#262230','#1a1820'],
 cimetiere:['#1e2838','#3e4656','#2e3646','#20262e']};
function pano375(dec){const P=PAN375[dec]||['#9fb0b4','#e8e4d4','#8a948a','#5e6658'],W=2048,H=640,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,P[0]);g.addColorStop(.75,P[1]);g.addColorStop(1,P[1]);x.fillStyle=g;x.fillRect(0,0,W,H);
 // nuages en lavis
 for(let i=0;i<26;i++){x.globalAlpha=.05+Math.random()*.06;x.fillStyle='#ffffff';x.beginPath();x.ellipse(Math.random()*W,60+Math.random()*200,120+Math.random()*260,20+Math.random()*40,0,0,7);x.fill()}
 // une chaîne de montagnes : plusieurs passes transparentes au bord irrégulier, comme un lavis qui a coulé
 const chaine=(col,base,amp,frq,seed)=>{for(let p=0;p<5;p++){x.globalAlpha=.22;x.fillStyle=col;x.beginPath();x.moveTo(0,H);for(let X=0;X<=W;X+=8){const t=X/W*Math.PI*2;const y=base-amp*(.55*Math.sin(t*frq+seed)+.3*Math.sin(t*frq*2.3+seed*2)+.15*Math.sin(t*frq*5.1+seed*3))-p*4+(Math.random()-.5)*5;x.lineTo(X,y)}x.lineTo(W,H);x.closePath();x.fill()}};
 chaine(P[2],H*.52,H*.22,3,1.3);chaine(P[3],H*.7,H*.16,5,4.1);
 // trait d'encre léger sur la crête proche, grain du papier
 x.globalAlpha=1;const d=x.getImageData(0,0,W,H),a=d.data;for(let i=0;i<a.length;i+=4){const n=(Math.random()-.5)*14;a[i]+=n;a[i+1]+=n;a[i+2]+=n}x.putImageData(d,0,0);
 for(let i=0;i<2600;i++){x.globalAlpha=.04;x.fillStyle=Math.random()<.5?'#000':'#fff';x.fillRect(Math.random()*W,Math.random()*H,1+Math.random()*3,1+Math.random()*3)}
 const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;return t}
// le relief : plat là où l'on se bat, puis des collines et des pentes qui montent vers le fond (falaises pour le rempart,
// cône pour le volcan, berges pour la rivière…)
// la rivière serpente et passe sous les pieds des combattants (on se bat les chevilles dans l'eau) ; le Barachois a un rivage courbe
function riv375(x){return -170+300*Math.sin((x-600)*.0019)+90*Math.sin(x*.0051+1)}
function rivL375(x){return 170+50*Math.sin(x*.003+2)}
function cote375(x){return -1500+260*Math.sin(x*.0011+.4)+110*Math.sin(x*.0037)}
function haut375(x,z,dec){const dz=-z-260;const n=Math.sin(x*.0021+1.3)*.5+Math.sin(x*.0047+z*.0031)*.3+Math.sin(x*.011-z*.007)*.2;
 const f={rempart:1.6,volcan:1.3,hauts:1.2,foret:1,grotte:1.3,riviere:.8,cimetiere:.5,cour:.35,ecole:.5,jardin:.5,cannes:.45,barachois:.4,kabar:.7}[dec]||1;
 let r=0;if(dz>0){const t=Math.min(1,dz/900),u=Math.min(1,dz/3200);r=(t*t*(3-2*t)*(50+70*n)+u*u*(3-2*u)*200*(.7+.4*n))*f}
 if(dec==='riviere'){const e=Math.abs(z-riv375(x)),w=rivL375(x);if(e<w)r=-14*(1-e/w*e/w);else r*=Math.min(1,(e-w)/400)}
 if(dec==='barachois'&&z<cote375(x))r=0;
 return r}
function eau375(g,dec){const T=THREE;if(dec!=='riviere'&&dec!=='barachois')return;const P=[],I=[];let n=0;
 for(let x=-4500;x<=5500;x+=40){let a,b;if(dec==='riviere'){const c=riv375(x),w=rivL375(x);a=c-w;b=c+w}else{a=-4600;b=cote375(x)}P.push(x,0,a,x,0,b);if(n){const k=(n-1)*2;I.push(k,k+1,k+2,k+1,k+3,k+2)}n++}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(P,3));geo.setIndex(I);geo.computeVertexNormals();
 const m=new T.Mesh(geo,new T.MeshLambertMaterial({color:dec==='riviere'?0x6a9aa0:0x2f7590,transparent:true,opacity:dec==='riviere'?.72:.9,side:T.DoubleSide,depthWrite:false}));m.position.y=dec==='riviere'?-3:3;m.renderOrder=1;g.add(m);
 // l'écume sur les bords, en petits traits clairs
 const E=[];for(let x=-4500;x<=5500;x+=55){const zs=dec==='riviere'?[riv375(x)-rivL375(x),riv375(x)+rivL375(x)]:[cote375(x)];zs.forEach(z=>E.push(x,1,z,x+40,1,z+(Math.random()-.5)*12))}
 const eg=new T.BufferGeometry();eg.setAttribute('position',new T.Float32BufferAttribute(E,3));const ls=new T.LineSegments(eg,new T.LineBasicMaterial({color:0xf0f4ec,transparent:true,opacity:.55}));ls.position.y=m.position.y+1;g.add(ls)}
const MOD375={};
function modele375(n){if(MOD375[n])return MOD375[n];MOD375[n]=(typeof p3Charge==='function'?p3Charge(n):Promise.reject()).then(()=>p3Instance(n)).then(I=>{const sc=I.g.scene;sc.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(sc);return{sc,h:(b.max.y-b.min.y)||1,y0:b.min.y,cx:(b.max.x+b.min.x)/2,cz:(b.max.z+b.min.z)/2}});return MOD375[n]}
function deco375(g,L){const T=THREE,d=L.dec,R=DEC375[d];eau375(g,d);
 // le fond : l'aquarelle peinte de ce lieu (Meshy) sur un cylindre tout autour, répétée en miroir ; sinon le lavis calculé
 let img=null;try{img=(0,eval)("typeof AR375_"+d+"!=='undefined'?AR375_"+d+":null")}catch(e){}
 if(img){const tx=new T.TextureLoader().load(img);tx.encoding=T.sRGBEncoding;tx.wrapS=T.MirroredRepeatWrapping;tx.repeat.set(4,1);const R0=4400,Hc=2*Math.PI*R0/4/1.78;
  const pm=new T.Mesh(new T.CylinderGeometry(R0,R0,Hc,96,1,true),new T.MeshBasicMaterial({map:tx,side:T.BackSide,fog:false}));pm.position.set(600,260-.45*Hc+Hc/2,0);pm.rotation.y=Math.PI*.25;g.add(pm);g.userData.peint=1}
 else{const pm=new T.Mesh(new T.CylinderGeometry(5200,5200,2600,64,1,true,Math.PI*.5,Math.PI),new T.MeshBasicMaterial({map:pano375(d),side:T.BackSide,fog:false,depthWrite:false}));pm.position.set(600,1100,800);pm.renderOrder=-1;g.add(pm)}
 if(!R)return;let k=0;
 R.forEach(([n,taille,nb])=>{for(let j=0;j<nb;j++){k++;const a=k*2.399+.7,r=900+(k*331)%2200,px=Math.cos(a)*r*1.3+600,pz=-450-Math.abs(Math.sin(a))*r-(taille>500?500:0);const sc=.8+((k*37)%40)/100,ry=(k*1.7)%6.28;
  if(d==='riviere'&&Math.abs(pz-riv375(px))<rivL375(px)+60&&n!=='sk_pierre')continue;if(d==='barachois'&&pz<cote375(px)+80&&n!=='bat_chaloupe')continue;modele375(n).then(M=>{const o=M.sc.clone(true);const s=taille*sc/M.h;o.scale.setScalar(s);o.position.set(px-M.cx*s,-M.y0*s+haut375(px,pz,d)-8,pz-M.cz*s);o.rotation.y=ry;o.traverse(m=>{if(m.isMesh){m.frustumCulled=true}});g.add(o)}).catch(()=>{})}})}

// le feu du kabar : des flammes en lavis lumineux qui dansent, au lieu d'un cône
function flamme375(g,x,z){const T=THREE,c=document.createElement('canvas');c.width=c.height=64;const k=c.getContext('2d'),gr=k.createRadialGradient(32,40,2,32,36,30);gr.addColorStop(0,'rgba(255,240,170,1)');gr.addColorStop(.4,'rgba(255,150,40,.85)');gr.addColorStop(1,'rgba(200,40,0,0)');k.fillStyle=gr;k.fillRect(0,0,64,64);
 const tx=new T.CanvasTexture(c),F=new T.Group();F.position.set(x,0,z);g.add(F);const L=[];
 for(let i=0;i<9;i++){const m=new T.Sprite(new T.SpriteMaterial({map:tx,blending:T.AdditiveBlending,depthWrite:false,transparent:true}));m.userData.p=Math.random()*6;m.userData.dx=(Math.random()-.5)*40;F.add(m);L.push(m)}
 for(let i=0;i<5;i++){const b=new T.Mesh(new T.CylinderGeometry(5,6,90,6),new T.MeshLambertMaterial({color:0x3a2416}));b.rotation.z=Math.PI/2;b.rotation.y=i*1.25;b.position.y=6;F.add(b)}
 L[0].onBeforeRender=()=>{const t=performance.now()/1000;L.forEach((m,i)=>{const u=(t*1.3+m.userData.p)%1;m.position.set(m.userData.dx*(1-u),20+u*120,0);const s=(70-u*45)*(.8+.3*Math.sin(t*9+i));m.scale.set(s,s*1.3,1);m.material.opacity=1-u})}}
