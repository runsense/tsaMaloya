// ===== p370 : les boss de zone en 3D. Les duels ordinaires restent en 2D ; contre un boss (Grand Diab, l'envoyé de l'Ordre
// noir, le chasseur de marrons, le gouverneur), la caméra passe en perspective autour des combattants, dans une arène en relief.
// Le coup de grâce (« achever » ou « épargner ») se joue aussi en 3D, la caméra tourne autour, dans tous les duels.
// Chaque boss a un second pouvoir, plus fort, qu'il déclenche une fois quand il passe sous la moitié de sa vie. =====
const ULT370={desbassyns:{n:'Coulée de lave',t:'volcan',d:24,col:0xff3010,brule:5},sitarane:{n:'La malédiction de la tombe',t:'mal',d:16,col:0x8a1010},kal:{n:'La nuée de Timize',t:'salve',col:0x8070c0},grandiab:{n:'Colère du volcan',t:'volcan',d:26,col:0xff5020},ombre:{n:'Malédiction noire',t:'mal',d:14,col:0x6040a0},mussard:{n:'La meute lâchée',t:'meute',col:0xc09050},gouverneur:{n:'Ordre de feu à la milice',t:'salve',col:0xffe080}};
try{if(typeof DUE!=='undefined')Object.keys(ULT370).forEach(k=>{const f=DUE.F[k];if(f){f.boss=1;f.k=k;f.ult=f.ult||ULT370[k]}})}catch(e){}
// chaque boss a son arène, tirée de son lieu : la case de Grand Diab en forêt, la cour du gouvernement, le rempart du chasseur
// de marrons, la grotte de l'Ordre noir, le cratère de la Fournaise, le cimetière de Saint-Pierre, les Hauts de Kal la nuit
const LIEU370={grandiab:{n:'la case de Grand Diab, dans la forêt des Hauts',sol:'#3e4a2a',ciel:0x6f8a78,bru:[900,4200],dec:'foret'},gouverneur:{n:'la cour du gouvernement, à Saint-Denis',sol:'#8a7a62',ciel:0xb8c4c8,bru:[2000,7000],dec:'cour'},
 mussard:{n:'le rempart, au-dessus du cirque',sol:'#5a5040',ciel:0x9fb0b4,bru:[1800,6500],dec:'rempart'},ombre:{n:'le tunnel de lave, sous le Piton',sol:'#2a2422',ciel:0x1a1414,bru:[600,2600],dec:'grotte'},
 desbassyns:{n:'le cratère de la Fournaise',sol:'#3a2a24',ciel:0x5a3a30,bru:[900,3800],dec:'volcan'},sitarane:{n:'le cimetière de Saint-Pierre, la nuit',sol:'#4a4a40',ciel:0x1e2838,bru:[700,3200],dec:'cimetiere'},kal:{n:'les Hauts du Sud, la nuit',sol:'#3a4430',ciel:0x232c40,bru:[700,3400],dec:'hauts'}};
function arene370(D3,sol,bk){const T=THREE;if(D3.ar370&&D3.ar370.userData.bk===bk)return D3.ar370;if(D3.ar370){D3.S.remove(D3.ar370)}const L=LIEU370[bk]||{sol:'#5b4a36',ciel:0x8fa3a8,bru:[1800,6000],dec:''};const g=new T.Group();g.userData.bk=bk;g.userData.L=L;
 const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');x.fillStyle=L.sol;x.fillRect(0,0,256,256);const base=new T.Color(L.sol);for(let i=0;i<1100;i++){const k=.7+Math.random()*.6;x.fillStyle='#'+base.clone().multiplyScalar(k).getHexString();x.globalAlpha=.55;x.fillRect(Math.random()*256,Math.random()*256,2+Math.random()*6,2+Math.random()*6)}
 if(L.dec==='cour'){x.globalAlpha=.35;x.strokeStyle='#4a3e30';for(let i=0;i<256;i+=32){x.beginPath();x.moveTo(i,0);x.lineTo(i,256);x.stroke();x.beginPath();x.moveTo(0,i);x.lineTo(256,i);x.stroke()}}
 if(L.dec==='volcan'){x.globalAlpha=.9;x.strokeStyle='#ff5a10';x.lineWidth=3;for(let i=0;i<9;i++){x.beginPath();let px=Math.random()*256,py=Math.random()*256;x.moveTo(px,py);for(let k=0;k<5;k++){px+=(Math.random()-.5)*60;py+=(Math.random()-.5)*60;x.lineTo(px,py)}x.stroke()}}
 const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(30,30);t.encoding=T.sRGBEncoding;const pl=new T.Mesh(new T.PlaneGeometry(9000,9000),new T.MeshLambertMaterial({map:t,emissive:L.dec==='volcan'?0x401005:0x000000,emissiveMap:L.dec==='volcan'?t:null}));pl.rotation.x=-Math.PI/2;g.add(pl);
 const M=(geo,col,px,py,pz,ry)=>{const m=new T.Mesh(geo,new T.MeshLambertMaterial({color:col,flatShading:true}));m.position.set(px,py,pz);m.rotation.y=ry||0;g.add(m);return m};
 for(let i=0;i<46;i++){const a=i*2.399,r=1100+(i*331)%1900,px=Math.cos(a)*r+600,pz=Math.sin(a)*r;if(pz>-350)continue;const d=L.dec;
  if(d==='foret'||d==='hauts'){if(i%2){M(new T.CylinderGeometry(18,26,520,6),0x2a2018,px,260,pz);M(new T.ConeGeometry(220,160,9),d==='hauts'?0x2a3a28:0x3a6a30,px,560,pz)}else M(new T.DodecahedronGeometry(120+(i%4)*40,0),d==='hauts'?0x3a3a34:0x4a4a40,px,50,pz)}
  else if(d==='cour'){if(i%3===0)M(new T.BoxGeometry(520,420+(i%3)*80,180),0xd8ccb4,px,220,pz,a);else if(i%3===1)M(new T.CylinderGeometry(40,40,260,8),0x6a5a48,px,130,pz);else M(new T.CylinderGeometry(30,36,140,8).rotateZ(Math.PI/2),0x2a2a2a,px,40,pz)}
  else if(d==='rempart'){M(new T.ConeGeometry(260+(i%3)*90,900+(i%4)*300,6),0x5e5a50,px,450,pz)}
  else if(d==='grotte'){M(new T.DodecahedronGeometry(260+(i%5)*80,0),0x241e1c,px,180,pz)}
  else if(d==='volcan'){M(new T.DodecahedronGeometry(140+(i%4)*60,0),0x2a1e1a,px,60,pz)}
  else if(d==='cimetiere'){M(new T.BoxGeometry(110,180+(i%3)*30,30),0xbcb8ac,px,95,pz,(i%5-2)*.08);if(i%3===0)M(new T.BoxGeometry(18,90,18),0x8a8478,px+90,160,pz)}
  else{const roc=i%3!==0;M(roc?new T.DodecahedronGeometry(90+(i%5)*50,0):new T.ConeGeometry(130,600+(i%4)*200,7),roc?0x5d5750:0x2c4a2e,px,roc?40:300+(i%4)*100,pz)}}
 if(L.dec==='cimetiere'){[[-160,-420],[180,-480],[620,-430],[900,-520]].forEach(([px,pz],i)=>{M(new T.BoxGeometry(120,200,36),0xd0ccc0,px,100,pz);const f=new T.PointLight(0xffb060,1.2,600);f.position.set(px,40,pz+60);g.add(f)})}
 const lu=new T.PointLight(0xff6030,0,2600);lu.position.set(600,300,300);g.add(lu);g.userData.lu=lu;
 if(L.dec==='volcan'||L.dec==='grotte'){const rl=new T.PointLight(0xff4010,L.dec==='volcan'?1.6:.8,3000);rl.position.set(600,60,-600);g.add(rl)}
 g.position.y=sol;g.visible=false;D3.S.add(g);D3.ar370=g;if(!D3.CP){D3.CP=new T.PerspectiveCamera(38,1,5,30000);D3.yaw370=.42}return g}
function boss370(D3,A,B,G,W,H,sol,dt){if(!A||!B||!D3.S)return null;
 // les coups tournants (meia-lua…) : le combattant fait un tour complet sur lui-même
 [[A,D3.f&&D3.f.A],[B,D3.f&&D3.f.B]].forEach(([c,o])=>{if(c&&o&&o.grp&&c.tour372>0){c.tour372=Math.max(0,c.tour372-dt);o.grp.rotation.y+=Math.PI*2*(1-c.tour372/.5)}});
 if(G.sup372>0)G.sup372=Math.max(0,G.sup372-dt);
 try{if(typeof chiens372==='function')chiens372(D3,G,sol,dt);if(typeof aura372==='function')aura372(D3,G);if(typeof arme372==='function')arme372(D3,G);if(typeof feu372==='function')feu372(D3,G)}catch(e){}
 const fin=((G.ph==='coup'||G.ph==='grace'||G.ph==='choix')&&G.ok!==undefined)||G.sup372>0,boss=!!(B.f&&B.f.boss)||!!(A.f&&A.f.boss);
 if(!boss&&!fin){if(D3.ar370){D3.ar370.visible=false;D3.S.background=null;D3.S.fog=null;(D3.ar370.userData.pp||[]).forEach(m=>m.visible=false)}return null}
 const bk=(B.f&&B.f.boss&&B.f.k)||(A.f&&A.f.boss&&A.f.k)||'';const ar=arene370(D3,sol,bk);ar.visible=true;ar.position.y=sol;{const L=ar.userData.L;if(!D3.S.background||D3.bk370!==bk){D3.bk370=bk;D3.S.background=new THREE.Color(L.ciel);D3.S.fog=new THREE.Fog(L.ciel,L.bru[0],L.bru[1])}}
 // l'entrée du boss : la caméra tourne autour, le lieu s'affiche
 if(B.f&&B.f.boss&&D3.in370===undefined){D3.in370=0;if(Date.now()-(B.f.intro370||0)>90000){B.f.intro370=Date.now();D3.in370=2.6;const L=LIEU370[bk];bandeau370(B.f.n+(L?' — '+L.n:''),0xffd080)}}if(D3.in370>0)D3.in370=Math.max(0,D3.in370-dt);
 const C=D3.CP;C.aspect=W/H;C.updateProjectionMatrix();
 // le second pouvoir du boss, une seule fois, sous la moitié de sa vie
 [[B,A],[A,B]].forEach(([b,a])=>{const u=b.f&&b.f.ult;if(!u||b.ult370||G.ph||b.pv<=0||b.pv>b.f.pv*.5)return;b.ult370=1;D3.choc370=1;ar.userData.lu.color.setHex(u.col||0xff6030);ar.userData.lu.intensity=3;
  if(u.t==='volcan'){a.pv-=u.d*(1-(a.f.arm||0))*(a.garde?.5:1);a.stun=Math.max(a.stun||0,1.1);a.x+=b.s*60;if(u.brule){a.brule=u.brule;a.bruleD=4}}
  else if(u.t==='mal'){a.pv-=u.d;a.stun=Math.max(a.stun||0,2)}
  else if(u.t==='meute'){for(let i=0;i<2;i++)G.chiens.push({o:b,x:b.x-b.s*30*i,pv:22,cd:0,t:9,dir:b.s})}
  else if(u.t==='salve'){for(let i=0;i<3;i++)G.proj.push({x:b.x+b.s*40,y:H-sol-60-i*18,v:b.s*(520+i*40),o:b,d:12,k:'tir'})}
  bandeau370(b.f.n+' : '+u.n+' !',u.col)});
 if(ar.userData.lu.intensity>0)ar.userData.lu.intensity=Math.max(0,ar.userData.lu.intensity-dt*1.2);
 // les projectiles et les chiens, dessinés en 2D d'habitude, ont ici leur version en relief
 const T=THREE;ar.userData.pp=ar.userData.pp||[];const PP=ar.userData.pp;let n=0;
 (G.proj||[]).forEach(p=>{let m=PP[n];if(!m){m=new T.Mesh(new T.SphereGeometry(9,10,8),new T.MeshBasicMaterial({color:0xffd060}));D3.S.add(m);PP.push(m)}m.visible=true;m.material.color.setHex(p.k==='tir'?0xffe080:p.k==='feu'?0xff6020:0xd0a060);m.scale.set(p.k==='sagaie'?4:1,1,1);m.position.set(p.x,H-p.y,0);n++});
 for(let i=n;i<PP.length;i++)PP[i].visible=false;
 // le coup latéral du boss : il attrape celui qui fait un pas de côté (le pas de côté évite les coups droits, pas celui-là)
 if(!G.ph&&B.f&&B.f.boss&&A.ss370&&A.ss370.t>.12&&!A.lat370&&Math.abs(A.x-B.x)<240&&(B.latCd370||0)<=0&&Math.random()<.55){A.lat370=1;B.latCd370=4;B.pw=.55;B.pwc='baton_coup';setTimeout(()=>{if(Math.abs(A.x-B.x)<260&&A.pv>0){A.pv-=11*(1-(A.f.arm||0));A.stun=Math.max(A.stun||0,.6);A.ss370=null;A.pz370=0;bandeau370('Coup latéral !',0xffb060)}A.lat370=0},260)}if(B.latCd370>0)B.latCd370-=dt;
 // le pas de côté (X : vers le fond, C : vers soi) — on sort de la ligne d'attaque, comme dans Tekken
 [A,B].forEach(c=>{const q=c.ss370;if(!q)return;q.t+=dt;const k=Math.min(1,q.t/.55);c.pz370=Math.sin(k*Math.PI)*170*q.d;if(k>=1){c.pz370=0;c.ss370=null}});
 if(!G.ph&&B.f&&B.f.boss&&!B.ss370&&!B.act&&Math.random()<dt*.18&&Math.abs(A.x-B.x)<260)B.ss370={t:0,d:Math.random()<.5?-1:1};
 // la caméra : en perspective, de trois quarts ; elle recule quand les combattants s'écartent, tourne autour au coup de grâce
 const mid=(A.x+B.x)/2,sep=Math.abs(A.x-B.x);let yaw=D3.yaw370||.42,d=Math.max(520,sep*1.15+380),hy=230;
 if(D3.in370>0){yaw=.42+(1-D3.in370/2.6)*Math.PI*2*.9+Math.PI*.2;d=Math.max(700,sep*1.4+500);hy=320}else if(fin){D3.orb370=(D3.orb370||0)+dt*(G.sup372>0?2.4:.55);yaw=.42+D3.orb370;d=Math.max(380,sep+260);hy=170}else D3.orb370=0;
 let sx=0,sy=0;if(D3.choc370>0){D3.choc370=Math.max(0,D3.choc370-dt*1.6);sx=(Math.random()-.5)*26*D3.choc370;sy=(Math.random()-.5)*18*D3.choc370}
 const ty=H-sol;C.position.set(mid+Math.sin(yaw)*d+sx,sol+hy+sy,Math.cos(yaw)*d);C.lookAt(mid,sol+120,0);return C}
function bandeau370(t,col){let d=document.getElementById('ult370');if(!d){d=document.createElement('div');d.id='ult370';d.style.cssText='position:fixed;left:0;right:0;top:34%;z-index:121;text-align:center;font:900 44px/1.1 Georgia,serif;color:#fff;pointer-events:none;text-shadow:0 0 22px #000,0 3px 0 #000;transition:opacity .6s';document.body.append(d)}
 d.textContent=t;d.style.color='#'+(col||0xffd080).toString(16).padStart(6,'0');d.style.opacity=1;clearTimeout(bandeau370.t);bandeau370.t=setTimeout(()=>d.style.opacity=0,1800)}

addEventListener('keydown',e=>{if(e.repeat||(e.code!=='KeyX'&&e.code!=='KeyC'))return;const G=window.DUEL359;if(!G||!G.A||G.ph||!document.querySelector('#duel,#due,.duel')&&!G.A.f)return;const boss=(G.B&&G.B.f&&G.B.f.boss)||(G.A.f&&G.A.f.boss);if(!boss||G.A.ss370)return;
 G.A.ss370={t:0,d:e.code==='KeyX'?-1:1};e.preventDefault();try{dispatchEvent(new KeyboardEvent('keydown',{key:'e',code:'KeyE'}));setTimeout(()=>dispatchEvent(new KeyboardEvent('keyup',{key:'e',code:'KeyE'})),80)}catch(x){}});
