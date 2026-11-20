
// ===== p146 : le jour en Histoire, et l'averse au soleil =====
// 1) En Histoire, le temps du jour ne tourne pas (pas d'horloge) : jourPh valait 0, donc « nuit » partout — plus d'oiseaux le jour, des grillons en fond, des roussettes en plein soleil.
//    En Histoire, c'est désormais le plein jour.
{const j=jourPh;jourPh=function(){try{if(S&&typeof modeHist==='function'&&modeHist())return .4}catch(e){}return j.apply(this,arguments)}}
// 2) L'averse au soleil : pendant la saison des pluies, de petites averses passent aussi en Histoire (légères, la carte reste lisible) ;
//    la pluie tombe en biais avec le vent, éclabousse le sol près de la vue, fait voler quelques feuilles ; quand elle s'arrête en plein jour, un arc-en-ciel se lève à l'opposé du soleil.
//    Le son : un crépitement de gouttes sur les feuilles et les tôles, plus fort avec l'averse.
const AV146={L:null,E:null,F:null,arc:null,fin:0,der:0,t0:performance.now()};
function averseF146(){try{if(!S||S.fin)return 0;if(!modeHist())return typeof pluieF106==='function'?pluieF106():0;if(S.cyc&&S.cyc.in<=0)return 0;if(typeof pluie!=='function'||!pluie())return 0;
 const t=performance.now()/1000;return Math.max(0,Math.sin(t*.05)+.35*Math.sin(t*.13+2)-.55)*.6}catch(e){return 0}}
function arcTex146(){const c=document.createElement('canvas');c.width=256;c.height=8;const x=c.getContext('2d'),g=x.createLinearGradient(0,0,256,0);
 [['#ff3030',0],['#ff9a20',.17],['#fff040',.34],['#40e060',.51],['#3090ff',.68],['#6040d0',.85],['#9040c0',1]].forEach(([k,p])=>g.addColorStop(p,k));x.fillStyle=g;x.fillRect(0,0,256,8);return new THREE.CanvasTexture(c)}
(function boucle146(){requestAnimationFrame(boucle146);try{if(typeof scene==='undefined'||!scene||!S)return;const now=performance.now(),dt=Math.min(.05,(now-AV146.t0)/1000);AV146.t0=now;
  const f=modeHist()?averseF146():0,vu=!(typeof VP!=='undefined'&&VP)&&!(typeof CINE!=='undefined'&&CINE);
  // la pluie légère de l'Histoire (le reste des modes a déjà sa pluie)
  if(!AV146.L&&typeof rideau106==='function'){AV146.L=rideau106(1200);scene.add(AV146.L)}
  if(AV146.L){AV146.L.visible=f>.03&&vu;if(AV146.L.visible){const R=Math.max(3,dist*.8),H=Math.max(2.5,dist*.7);rideauMaj106(AV146.L,camT.x,camT.y,camT.z,R,H,f,dt,H*.05);AV146.L.material.opacity*=.7}}
  const fT=Math.max(f,modeHist()?0:(typeof pluieF106==='function'?pluieF106():0));
  // éclaboussures : petits anneaux qui s'ouvrent au sol, près de la vue
  if(!AV146.E){const n=60,g=new THREE.BufferGeometry(),P=new Float32Array(n*3);g.setAttribute('position',new THREE.BufferAttribute(P,3));AV146.E=new THREE.Points(g,new THREE.PointsMaterial({color:0xdde8f0,size:.035,transparent:true,opacity:.6,depthWrite:false}));AV146.E.frustumCulled=false;AV146.E.userData.v=new Float32Array(n);scene.add(AV146.E)}
  {const E=AV146.E,A=E.geometry.attributes.position,V=E.userData.v;E.visible=fT>.08&&vu&&dist<14;if(E.visible){for(let i=0;i<A.count;i++){V[i]-=dt*3;if(V[i]<=0&&Math.random()<fT*.5){const x=camT.x+(Math.random()-.5)*dist*.9,z=camT.z+(Math.random()-.5)*dist*.9;A.setXYZ(i,x,Math.max(0,alt(x,z))*VX+.01,z);V[i]=1}else if(V[i]<=0)A.setY(i,-1e4)}A.needsUpdate=true;E.material.size=.02+.03*Math.min(1,dist/8)}}
  // feuilles qui volent dans le vent, quand il pleut fort ou à l'approche d'un cyclone
  const vent=Math.max(fT>.4?fT:0,S.cyc&&S.cyc.in<=1?.8:0);
  if(!AV146.F){const n=40,g=new THREE.BufferGeometry(),P=new Float32Array(n*3);g.setAttribute('position',new THREE.BufferAttribute(P,3));AV146.F=new THREE.Points(g,new THREE.PointsMaterial({color:0x4f7a2c,size:.05,transparent:true,opacity:.9,depthWrite:false}));AV146.F.frustumCulled=false;scene.add(AV146.F)}
  {const F=AV146.F,A=F.geometry.attributes.position;F.visible=vent>.3&&vu&&dist<16;if(F.visible){for(let i=0;i<A.count;i++){let x=A.getX(i),y=A.getY(i),z=A.getZ(i);if(Math.abs(x-camT.x)>dist||Math.abs(z-camT.z)>dist||y<-50){x=camT.x-dist*.8;z=camT.z+(Math.random()-.5)*dist*1.6;y=Math.max(0,alt(x,z))*VX+.2+Math.random()*1.2}
   x+=dt*(1.2+vent*2)*(.6+(i%5)*.1);z+=dt*Math.sin(now/300+i)*.4;y+=dt*Math.sin(now/200+i*1.7)*.5;A.setXYZ(i,x,y,z)}A.needsUpdate=true}}
  // l'arc-en-ciel : l'averse finit, il fait jour
  if(fT>.12)AV146.der=now;const ph=jourPh(),jour=ph>.1&&ph<.65,arcOn=jour&&vu&&now-AV146.der<45000&&now-AV146.der>1500&&fT<.1&&AV146.der>0;
  if(!AV146.arc){const m=new THREE.MeshBasicMaterial({map:arcTex146(),transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending});const g=new THREE.RingGeometry(9,10.2,64,1,0,Math.PI);
   const uv=g.attributes.uv,p=g.attributes.position;for(let i=0;i<p.count;i++){const r=Math.hypot(p.getX(i),p.getY(i));uv.setXY(i,(r-9)/1.2,.5)}AV146.arc=new THREE.Mesh(g,m);AV146.arc.renderOrder=2;scene.add(AV146.arc)}
  {const a=AV146.arc,cible=arcOn?.22*(1-Math.max(0,(now-AV146.der-30000)/15000)):0;a.material.opacity+=(cible-a.material.opacity)*Math.min(1,dt*1.5);a.visible=a.material.opacity>.01;
   if(a.visible){const d=Math.max(12,dist*1.6),ang=(typeof az!=='undefined'?az:0);a.position.set(camT.x-Math.sin(ang)*d,camT.y-1-dist*.12,camT.z-Math.cos(ang)*d);a.rotation.y=ang;const k=Math.max(.6,dist/18);a.scale.setScalar(k)}}
  // le son des gouttes
  try{if(fT>.08&&typeof sndPret==='function'&&sndPret()&&Math.random()<fT*.6){const c=sndPret(),t=c.currentTime,n=1+Math.floor(fT*4);for(let i=0;i<n;i++)bruit7(.03,{t:Math.random()*.2,ft:'bandpass',f:2500+Math.random()*4000,q:6,v:.015+fT*.03})}}catch(e){}
 }catch(e){}})();
// 3) Le conte se lit d'un coup d'œil : noir sur fond clair, liseré rouge, au-dessus du décor (ligne du conte, texte des cinématiques, carte « le conte joue la scène »)
{const st=document.createElement('style');st.textContent='#tuto{background:#fbf7ec!important;color:#14110c!important;border-left:5px solid #a3301c!important;box-shadow:0 3px 14px rgba(0,0,0,.45)!important;font-weight:500;border-radius:4px}#tuto b{color:#a3301c!important;font-weight:800}'+
 '#cine .ctx.on{background:rgba(251,247,236,.96)!important;color:#14110c!important;text-shadow:none!important;padding:10px 16px!important;border-left:5px solid #a3301c!important;border-radius:4px;box-shadow:0 3px 14px rgba(0,0,0,.45)}#cine .ctx small{color:#a3301c!important}'+
 '#conteSc>div{background:#fbf7ec!important;color:#14110c!important;border:2px solid #a3301c!important}#conteSc small{color:#a3301c!important}';document.head.appendChild(st)}
