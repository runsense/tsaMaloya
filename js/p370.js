// ===== p370 : les boss de zone en 3D. Les duels ordinaires restent en 2D ; contre un boss (Grand Diab, l'envoyé de l'Ordre
// noir, le chasseur de marrons, le gouverneur), la caméra passe en perspective autour des combattants, dans une arène en relief.
// Le coup de grâce (« achever » ou « épargner ») se joue aussi en 3D, la caméra tourne autour, dans tous les duels.
// Chaque boss a un second pouvoir, plus fort, qu'il déclenche une fois quand il passe sous la moitié de sa vie. =====
const ULT370={grandiab:{n:'Colère du volcan',t:'volcan',d:26,col:0xff5020},ombre:{n:'Malédiction noire',t:'mal',d:14,col:0x6040a0},mussard:{n:'La meute lâchée',t:'meute',col:0xc09050},gouverneur:{n:'Ordre de feu à la milice',t:'salve',col:0xffe080}};
try{if(typeof DUE!=='undefined')Object.keys(ULT370).forEach(k=>{const f=DUE.F[k];if(f){f.boss=1;f.k=k;f.ult=f.ult||ULT370[k]}})}catch(e){}
function arene370(D3,sol){const T=THREE;if(D3.ar370)return D3.ar370;const g=new T.Group();
 const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');x.fillStyle='#5b4a36';x.fillRect(0,0,256,256);for(let i=0;i<900;i++){x.fillStyle=['#6a5740','#4d3e2c','#75613f','#3f3426'][i%4];x.globalAlpha=.5;x.fillRect(Math.random()*256,Math.random()*256,2+Math.random()*5,2+Math.random()*5)}
 const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(30,30);t.encoding=T.sRGBEncoding;const pl=new T.Mesh(new T.PlaneGeometry(9000,9000),new T.MeshLambertMaterial({map:t}));pl.rotation.x=-Math.PI/2;g.add(pl);
 for(let i=0;i<46;i++){const a=i*2.399,r=1300+(i*331)%1800,px=Math.cos(a)*r+600,pz=Math.sin(a)*r;if(pz>-400)continue;const roc=i%3!==0,m=new T.Mesh(roc?new T.DodecahedronGeometry(90+(i%5)*50,0):new T.ConeGeometry(130,600+(i%4)*200,7),new T.MeshLambertMaterial({color:roc?0x5d5750:0x2c4a2e,flatShading:true}));m.position.set(px,roc?40:300+(i%4)*100,pz);g.add(m)}
 // la lumière du boss (rouge pour Grand Diab) qui s'allume au second pouvoir
 const lu=new T.PointLight(0xff6030,0,2600);lu.position.set(600,300,300);g.add(lu);g.userData.lu=lu;g.position.y=sol;g.visible=false;D3.S.add(g);D3.ar370=g;
 D3.CP=new T.PerspectiveCamera(38,1,5,30000);D3.yaw370=.42;return g}
function boss370(D3,A,B,G,W,H,sol,dt){if(!A||!B||!D3.S)return null;
 // les coups tournants (meia-lua…) : le combattant fait un tour complet sur lui-même
 [[A,D3.f&&D3.f.A],[B,D3.f&&D3.f.B]].forEach(([c,o])=>{if(c&&o&&o.grp&&c.tour372>0){c.tour372=Math.max(0,c.tour372-dt);o.grp.rotation.y+=Math.PI*2*(1-c.tour372/.5)}});
 if(G.sup372>0)G.sup372=Math.max(0,G.sup372-dt);
 const fin=((G.ph==='coup'||G.ph==='grace'||G.ph==='choix')&&G.ok!==undefined)||G.sup372>0,boss=!!(B.f&&B.f.boss)||!!(A.f&&A.f.boss);
 if(!boss&&!fin){if(D3.ar370){D3.ar370.visible=false;D3.S.background=null;D3.S.fog=null;(D3.ar370.userData.pp||[]).forEach(m=>m.visible=false)}return null}
 const ar=arene370(D3,sol);ar.visible=true;ar.position.y=sol;if(!D3.S.background){D3.S.background=new THREE.Color(0x8fa3a8);D3.S.fog=new THREE.Fog(0x8fa3a8,1800,6000)}
 const C=D3.CP;C.aspect=W/H;C.updateProjectionMatrix();
 // le second pouvoir du boss, une seule fois, sous la moitié de sa vie
 [[B,A],[A,B]].forEach(([b,a])=>{const u=b.f&&b.f.ult;if(!u||b.ult370||G.ph||b.pv<=0||b.pv>b.f.pv*.5)return;b.ult370=1;D3.choc370=1;ar.userData.lu.color.setHex(u.col||0xff6030);ar.userData.lu.intensity=3;
  if(u.t==='volcan'){a.pv-=u.d*(1-(a.f.arm||0))*(a.garde?.5:1);a.stun=Math.max(a.stun||0,1.1);a.x+=b.s*60}
  else if(u.t==='mal'){a.pv-=u.d;a.stun=Math.max(a.stun||0,2)}
  else if(u.t==='meute'){for(let i=0;i<2;i++)G.chiens.push({o:b,x:b.x-b.s*30*i,pv:22,cd:0,t:9,dir:b.s})}
  else if(u.t==='salve'){for(let i=0;i<3;i++)G.proj.push({x:b.x+b.s*40,y:H-sol-60-i*18,v:b.s*(520+i*40),o:b,d:12,k:'tir'})}
  bandeau370(b.f.n+' : '+u.n+' !',u.col)});
 if(ar.userData.lu.intensity>0)ar.userData.lu.intensity=Math.max(0,ar.userData.lu.intensity-dt*1.2);
 // les projectiles et les chiens, dessinés en 2D d'habitude, ont ici leur version en relief
 const T=THREE;ar.userData.pp=ar.userData.pp||[];const PP=ar.userData.pp;let n=0;
 (G.proj||[]).forEach(p=>{let m=PP[n];if(!m){m=new T.Mesh(new T.SphereGeometry(9,10,8),new T.MeshBasicMaterial({color:0xffd060}));D3.S.add(m);PP.push(m)}m.visible=true;m.material.color.setHex(p.k==='tir'?0xffe080:p.k==='feu'?0xff6020:0xd0a060);m.scale.set(p.k==='sagaie'?4:1,1,1);m.position.set(p.x,H-p.y,0);n++});
 (G.chiens||[]).forEach(c=>{let m=PP[n];if(!m){m=new T.Mesh(new T.SphereGeometry(9,10,8),new T.MeshBasicMaterial({color:0xffd060}));D3.S.add(m);PP.push(m)}m.visible=true;m.material.color.setHex(0x8a6a40);m.scale.set(5,3,2.4);m.position.set(c.x,sol+28,0);n++});
 for(let i=n;i<PP.length;i++)PP[i].visible=false;
 // le pas de côté (X : vers le fond, C : vers soi) — on sort de la ligne d'attaque, comme dans Tekken
 [A,B].forEach(c=>{const q=c.ss370;if(!q)return;q.t+=dt;const k=Math.min(1,q.t/.55);c.pz370=Math.sin(k*Math.PI)*170*q.d;if(k>=1){c.pz370=0;c.ss370=null}});
 if(!G.ph&&B.f&&B.f.boss&&!B.ss370&&!B.act&&Math.random()<dt*.18&&Math.abs(A.x-B.x)<260)B.ss370={t:0,d:Math.random()<.5?-1:1};
 // la caméra : en perspective, de trois quarts ; elle recule quand les combattants s'écartent, tourne autour au coup de grâce
 const mid=(A.x+B.x)/2,sep=Math.abs(A.x-B.x);let yaw=D3.yaw370||.42,d=Math.max(520,sep*1.15+380),hy=230;
 if(fin){D3.orb370=(D3.orb370||0)+dt*(G.sup372>0?2.4:.55);yaw=.42+D3.orb370;d=Math.max(380,sep+260);hy=170}else D3.orb370=0;
 let sx=0,sy=0;if(D3.choc370>0){D3.choc370=Math.max(0,D3.choc370-dt*1.6);sx=(Math.random()-.5)*26*D3.choc370;sy=(Math.random()-.5)*18*D3.choc370}
 const ty=H-sol;C.position.set(mid+Math.sin(yaw)*d+sx,sol+hy+sy,Math.cos(yaw)*d);C.lookAt(mid,sol+120,0);return C}
function bandeau370(t,col){let d=document.getElementById('ult370');if(!d){d=document.createElement('div');d.id='ult370';d.style.cssText='position:fixed;left:0;right:0;top:34%;z-index:121;text-align:center;font:900 44px/1.1 Georgia,serif;color:#fff;pointer-events:none;text-shadow:0 0 22px #000,0 3px 0 #000;transition:opacity .6s';document.body.append(d)}
 d.textContent=t;d.style.color='#'+(col||0xffd080).toString(16).padStart(6,'0');d.style.opacity=1;clearTimeout(bandeau370.t);bandeau370.t=setTimeout(()=>d.style.opacity=0,1800)}

addEventListener('keydown',e=>{if(e.repeat||(e.code!=='KeyX'&&e.code!=='KeyC'))return;const G=window.DUEL359;if(!G||!G.A||G.ph||!document.querySelector('#duel,#due,.duel')&&!G.A.f)return;const boss=(G.B&&G.B.f&&G.B.f.boss)||(G.A.f&&G.A.f.boss);if(!boss||G.A.ss370)return;
 G.A.ss370={t:0,d:e.code==='KeyX'?-1:1};e.preventDefault();try{dispatchEvent(new KeyboardEvent('keydown',{key:'e',code:'KeyE'}));setTimeout(()=>dispatchEvent(new KeyboardEvent('keyup',{key:'e',code:'KeyE'})),80)}catch(x){}});
