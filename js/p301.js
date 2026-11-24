// ===== p301 : les averses dans les incarnations — et de vraies pluies dans l'Est, le côté au vent de l'île, où il pleut le plus.
// La pluie arrive et repart en fondu (le ciel, le brouillard, la lumière glissent sur 3 s environ). Sous la pluie on se mouille :
// trempé, on reprend son souffle moins vite. Sous les arbres on est à l'abri. Le bois mouillé ne prend pas sans abri, et un feu
// à découvert s'éteint. La rivière se trouble. Mais la pluie cache aussi : les chasseurs voient moins loin. =====
function pluie300init(I){if(I.pl301)return;const N=1600,pos=new Float32Array(N*6);for(let i=0;i<N;i++){const x=(Math.random()-.5)*60,y=Math.random()*30,z=(Math.random()-.5)*60;pos.set([x,y,z,x+.05,y-.9,z],i*6)}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));const m=new THREE.LineBasicMaterial({color:0xc8d4dc,transparent:true,opacity:0,depthWrite:false});const L=new THREE.LineSegments(g,m);L.frustumCulled=false;I.S3.add(L);
 const lon=(()=>{try{const p=I.P[Math.floor(I.N/2)];return LL99({x:p[2],z:p[3]}).lon}catch(e){return 55.5}})(),est=Math.max(0,Math.min(1,(lon-55.45)/.2));
 let riv=null;I.S3.children.forEach(o=>{if(o.isMesh&&o.material&&o.material.color&&o.material.transparent&&o.material.color.getHex&&Math.abs(o.material.color.getHex()-0x3f6a72)<0x30)riv=o});
 I.pl301={L,N,int:0,cible:0,proch:performance.now()+(est>.5?15000:45000)*(0.5+Math.random()),est,fog0:I.S3.fog.color.clone(),bg0:I.S3.fog.color.clone(),far0:I.S3.fog.far,riv,rc0:riv?riv.material.color.clone():null,mouille:0}}
function pluie301(dt){const I=INC;if(!I||!I.S3)return;if(!I.pl301)pluie300init(I);const p=I.pl301,now=performance.now();
 // l'arrivée et le départ des averses : dans l'Est, plus souvent, plus longues, plus fortes
 if(now>p.proch){if(p.cible>0){p.cible=0;p.proch=now+(p.est>.5?25000:60000)*(.6+Math.random())}else{p.cible=Math.min(1,(p.est>.5?.75:.4)+Math.random()*.35);p.proch=now+(p.est>.5?60000:25000)*(.6+Math.random()*.8);incMsg287(p.cible>.7?'Une grosse pluie arrive de l’est : abritez-vous sous les arbres.':'Une averse.')}}
 // fondu : environ 3 s pour arriver, un peu plus pour partir
 p.int+=(p.cible-p.int)*Math.min(1,dt*(p.cible>p.int?.45:.3));
 const k=p.int,c=p.fog0.clone().lerp(new THREE.Color(0x5e6a72),k*.75);I.S3.fog.color.copy(c);I.R.setClearColor(c);I.S3.fog.far=p.far0*(1-k*.55);
 if(I.ciel&&I.ciel.material.uniforms){const u=I.ciel.material.uniforms;if(!p.cielH0){p.cielH0=u.h.value.clone();p.cielB0=u.b.value.clone()}u.h.value.copy(p.cielH0).lerp(new THREE.Color(0x4a545c),k*.8);u.b.value.copy(p.cielB0).lerp(new THREE.Color(0x6a747a),k*.8)}
 if(p.riv&&p.rc0)p.riv.material.color.copy(p.rc0).lerp(new THREE.Color(0x6a5a40),k*.7);
 // les gouttes autour de la caméra
 p.L.material.opacity=Math.min(.85,k*.8);if(k>.02){const a=p.L.geometry.attributes.position,c0=I.cam.position;for(let i=0;i<p.N;i++){let y=a.array[i*6+1]-dt*(22+10*k);if(y<-2){y=28;a.array[i*6]=(Math.random()-.5)*60;a.array[i*6+2]=(Math.random()-.5)*60}a.array[i*6+1]=y;a.array[i*6+4]=y-.9-k*.6;a.array[i*6+3]=a.array[i*6]+.08;a.array[i*6+5]=a.array[i*6+2]}a.needsUpdate=true;p.L.position.set(c0.x,c0.y-12,c0.z)}
 // se mouiller, s'abriter
 const h=I.h,abri=I.arb.some(a=>a.r<1&&Math.hypot(a.x-h.x,a.z-h.z)<2.2);p.abri=abri;p.mouille=Math.max(0,Math.min(100,p.mouille+dt*(k>.1&&!abri?9*k:-(I.st&&I.st.feu&&Math.hypot(I.st.feu.x-h.x,I.st.feu.z-h.z)<3?12:2.5))));
 if(p.mouille>60&&I.endu!=null&&I.endu<100)I.endu=Math.max(0,I.endu-dt*1.2);
 // un feu à découvert sous la grosse pluie s'éteint
 if(I.st&&I.st.feu&&k>.5){const f=I.st.feu,abF=I.arb.some(a=>a.r<1&&Math.hypot(a.x-f.x,a.z-f.z)<2.2);if(!abF)f.fin-=dt*12000}}
{const b=incBoucle287;let t=performance.now();incBoucle287=function(){const n=performance.now(),dt=Math.min(.1,(n-t)/1000);t=n;try{if(INC&&!INC.pause&&!INC.duel)pluie301(dt)}catch(e){}return b.apply(this,arguments)}}
// le feu sous la pluie : sans abri, le bois mouillé ne prend pas
{const t0=inc290Touche;inc290Touche=function(k,e){const I=INC;try{if(k==='f'&&I&&I.pl301&&I.pl301.int>.4&&!I.pl301.abri&&!(I.st&&I.st.feu)){incMsg287('Le bois est trempé : abritez-vous sous les arbres pour faire le feu.');return}}catch(x){}return t0.apply(this,arguments)}}
// la pluie cache : les chasseurs voient moins loin
{const b=incBoucle287;incBoucle287=function(){const I=INC;try{if(I&&I.pl301&&I.pl301.int>.3)I.CH.forEach(o=>{if(o.al>0)o.al=Math.max(0,o.al-.016*I.pl301.int*.6)})}catch(e){}return b.apply(this,arguments)}}
// ce qu'on lit dans le panneau
{const h0=hud290;hud290=function(){const r=h0.apply(this,arguments);try{const I=INC,d=$('incS');if(I&&I.pl301&&d){const p=I.pl301;let t='';if(p.int>.15)t+=(p.int>.7?'Grosse pluie':'Pluie')+(p.abri?' · à l’abri':'');if(p.mouille>30)t+=(t?' · ':'')+(p.mouille>60?'trempé':'mouillé');if(t)d.innerHTML+='<br><small>🌧 '+t+'</small>'}}catch(e){}return r}}
