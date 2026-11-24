// ===== p290 : survivre en chemin, dans les incarnations. La soif et la faim baissent ; on boit à la rivière, on pêche les camarons
// sous les galets, on attrape un tangue ou on chasse le cabri à la sagaie, on ramasse le bois sec, on fait du feu, on cuit, on mange.
// Le feu : La Réunion est volcanique, il n'y a pas de silex naturel dans l'île. Les marrons faisaient le feu par friction (deux bois, à la
// malgache), ou avec une pierre à fusil et un briquet volés aux habitations. Le jeu suit ça : friction (long, bois sec), ou pierre à fusil
// si on en a — on en trouve parfois près des habitations ou perdue par un détachement. La fumée se voit : les chasseurs voient plus loin.
// Ce qu'on emporte au départ suit l'histoire de chacun (un bertel de vacoa, une calebasse, une sagaie… ou rien). =====
const SAC290={
 'Anchaing et Héva — la fuite':{bertel:1,couteau:1,_t:'Héva a pris son bertel de vacoa et un couteau à cannes. Rien pour le feu.'},
 'Simangavole — vers les Trois Salazes':{bertel:1,sagaie:1,calebasse:1,pierre:1,_t:'Née au camp : bertel, sagaie, calebasse et une pierre à fusil.'},
 'La fuite par la Rivière Saint-Étienne':{_t:'Il part les mains vides.'},
 'Tsaralava, et l’îlette':{bertel:1,sagaie:1,calebasse:1,_t:'Au camp, on lui a donné un bertel, une sagaie, une calebasse.'},
 'Dimy':{_t:'Il part les mains vides.'},
 'La Rivière des Galets':{bertel:1,plantes:3,_t:'Son bertel est plein de plantes : de quoi soigner.'},
 'Le nom choisi':{_t:'Il part les mains vides.'},
 'Vers Cilaos':{bertel:1,sagaie:1,calebasse:1,pierre:1,_t:'Des guerriers : sagaies, bertels, calebasses, une pierre à fusil.'},
 'Le Piton des Neiges':{sagaie:1,calebasse:1,pierre:1,_t:'Le messager voyage léger : sagaie, calebasse, pierre à fusil.'}};
function init290(I){const C=I.C,S0=SAC290[C.t]||{};I.st={soif:100,faim:90,sac:Object.assign({bois:0,viande:0,cuit:0,camaron:0,eau:S0.calebasse?2:0},S0),feu:null,fumee:0,occ:null,tic:0};delete I.st.sac._t;
 const S3=I.S3,P=I.P,N=I.N,hAt=I.hAt;let s=91+C.t.length*7;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};
 const M4=new THREE.Matrix4(),Q=new THREE.Quaternion(),V=new THREE.Vector3(),SC=new THREE.Vector3(),up=new THREE.Vector3(0,1,0);
 const inst=(geo,mat,L,f)=>{if(!L.length)return null;const im=new THREE.InstancedMesh(geo,mat,L.length);L.forEach((a,i)=>{f(a);M4.compose(V,Q,SC);im.setMatrixAt(i,M4)});S3.add(im);return im};
 const bAt=i=>C.b0+(C.b1-C.b0)*(i/(N-1));
 // le décor en plus : galets dans la rivière, blocs de basalte, fougères au sol, vacoas près des Bas
 const G=[];I.riv.forEach(([x,z,w],i)=>{for(let k=0;k<3;k++){const a=r()*6.28,d=r()*w*1.3;G.push({x:x+Math.cos(a)*d,z:z+Math.sin(a)*d,s:.15+r()*.35})}});
 inst(new THREE.IcosahedronGeometry(1,1),new THREE.MeshLambertMaterial({color:0x6a665e}),G,a=>{V.set(a.x,hAt(a.x,a.z)+a.s*.2,a.z);Q.setFromAxisAngle(up,a.x);SC.set(a.s*1.3,a.s*.6,a.s)});
 const B=[];for(let t=0;t<900&&B.length<180;t++){const x=P[0][0]+(r()-.5)*900,z=P[0][1]+(r()-.5)*900,dp=I.dPiste(x,z);if(dp<3||dp>=99)continue;B.push({x,z,s:.5+r()*1.8})}
 inst(new THREE.DodecahedronGeometry(1,0),new THREE.MeshLambertMaterial({color:0x3e3c3a}),B,a=>{V.set(a.x,hAt(a.x,a.z)+a.s*.35,a.z);Q.setFromAxisAngle(new THREE.Vector3(r(),1,r()).normalize(),r()*3);SC.set(a.s,a.s*.75,a.s*.9)});
 B.forEach(a=>{if(a.s>1.1){const o={x:a.x,z:a.z,r:a.s*.9};I.arb.push(o);(I.AG[I.ag(a.x,a.z)]||(I.AG[I.ag(a.x,a.z)]=[])).push(o)}});
 const FG=[];for(let t=0;t<9000&&FG.length<2200;t++){const x=P[0][0]+(r()-.5)*1000,z=P[0][1]+(r()-.5)*1000,dp=I.dPiste(x,z);if(dp<1.8||dp>=99)continue;const [bi]=I.proche(x,z);const b=bAt(bi);if(b<.7||b>3.6)continue;FG.push({x,z,s:.5+r()*.7,b})}
 inst(fougere290(),new THREE.MeshLambertMaterial({color:0x3f7a32,side:THREE.DoubleSide}),FG,a=>{V.set(a.x,hAt(a.x,a.z),a.z);Q.setFromAxisAngle(up,a.z);SC.set(a.s*2.2,a.s*1.8,a.s*2.2)});
 if(C.b0<1){const VA=[];for(let t=0;t<400&&VA.length<40;t++){const i=Math.floor(r()*N*.25),p=P[i],a=r()*6.28,d=4+r()*16,x=p[0]+Math.cos(a)*d,z=p[1]+Math.sin(a)*d;if(I.dPiste(x,z)<2.5)continue;VA.push({x,z,s:.8+r()*.5})}
  inst(new THREE.CylinderGeometry(.12,.2,1,5).translate(0,.5,0),new THREE.MeshLambertMaterial({color:0x6a5a44}),VA,a=>{V.set(a.x,hAt(a.x,a.z),a.z);Q.setFromAxisAngle(new THREE.Vector3(1,0,0),.15);SC.set(a.s,3.2*a.s,a.s)});
  inst(new THREE.ConeGeometry(1.6,1.4,10,1,true).translate(0,.2,0),new THREE.MeshLambertMaterial({color:0x6a8a3a,side:THREE.DoubleSide}),VA,a=>{V.set(a.x,hAt(a.x,a.z)+3.2*a.s,a.z);Q.setFromAxisAngle(up,a.x);SC.set(a.s,a.s,a.s)})}
 // un ciel en dégradé, quelques nuages, et un second étage de feuillage pour des arbres plus fournis
 try{const ciel=new THREE.Mesh(new THREE.SphereGeometry(380,24,12),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,uniforms:{h:{value:new THREE.Color(C.b1>=3?0x7f9fb8:0x5f8fb8)},b:{value:I.sky||new THREE.Color(0xa8c8d0)}},vertexShader:'varying vec3 vp;void main(){vp=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform vec3 h;uniform vec3 b;varying vec3 vp;void main(){gl_FragColor=vec4(mix(b,h,smoothstep(.0,.6,vp.y)),1.0);}'}));ciel.position.copy(new THREE.Vector3(P[Math.floor(N/2)][0],0,P[Math.floor(N/2)][1]));S3.add(ciel);I.ciel=ciel;
  const NU=[];for(let k=0;k<14;k++){const p=P[Math.floor(r()*N)];NU.push({x:p[0]+(r()-.5)*300,z:p[1]+(r()-.5)*300,y:hAt(p[0],p[1])+140+r()*60,s:18+r()*20})}
  inst(new THREE.SphereGeometry(1,8,5),new THREE.MeshBasicMaterial({color:0xf2f4f6,transparent:true,opacity:.75,fog:false}),NU,a=>{V.set(a.x,a.y,a.z);Q.identity();SC.set(a.s*1.8,a.s*.35,a.s)})}catch(e){}
 try{const AR=(I.TT||[]).filter(a=>a.k==='arbre');inst(new THREE.IcosahedronGeometry(1.5,0),new THREE.MeshLambertMaterial({color:0x264d26}),AR.filter((_,i)=>i%2===0),a=>{V.set(a.x+.7,a.y+7.5*a.s-.6,a.z-.5);Q.setFromAxisAngle(up,a.z);SC.set(a.s,a.s*.9,a.s)});
  inst(new THREE.IcosahedronGeometry(1.3,0),new THREE.MeshLambertMaterial({color:0x3a6a34}),AR.filter((_,i)=>i%3===0),a=>{V.set(a.x-.8,a.y+7.5*a.s+1.1,a.z+.4);Q.setFromAxisAngle(up,a.x*2);SC.set(a.s,a.s*.8,a.s)})}catch(e){}
 // des palmistes à mi-pente, élancés au-dessus de la forêt ; des touffes d'herbe dans les espaces ouverts
 {const PA=[];for(let t=0;t<2500&&PA.length<70;t++){const i=Math.floor(r()*N),b=bAt(i);if(b<1||b>2.6)continue;const p=P[i],a=r()*6.28,d=3+r()*14,x=p[0]+Math.cos(a)*d,z=p[1]+Math.sin(a)*d;if(I.dPiste(x,z)<2.5)continue;PA.push({x,z,s:.8+r()*.4})}
  inst(new THREE.CylinderGeometry(.09,.13,1,5).translate(0,.5,0),new THREE.MeshLambertMaterial({color:0x8a8070}),PA,a=>{V.set(a.x,hAt(a.x,a.z),a.z);Q.identity();SC.set(a.s,11*a.s,a.s)});
  inst((typeof palme302==='function'?palme302(2.6,12):new THREE.ConeGeometry(2.4,1.6,8,1,true).rotateX(Math.PI).translate(0,-.2,0)),new THREE.MeshLambertMaterial({color:0x4a7a34,side:THREE.DoubleSide}),PA,a=>{V.set(a.x,hAt(a.x,a.z)+11*a.s,a.z);Q.setFromAxisAngle(up,a.x);SC.set(a.s,a.s,a.s)})}
 {const HE=[];for(let t=0;t<12000&&HE.length<2500;t++){const x=P[0][0]+(r()-.5)*900,z=P[0][1]+(r()-.5)*900,dp=I.dPiste(x,z);if(dp>=99)continue;const [bi]=I.proche(x,z),b=bAt(bi);if(b>1.2&&b<3)continue;HE.push({x,z,s:.4+r()*.5})}
  inst(fougere290(),new THREE.MeshLambertMaterial({color:C.b1>=3?0x8a8a52:0x6a9a3a,side:THREE.DoubleSide}),HE,a=>{V.set(a.x,hAt(a.x,a.z),a.z);Q.setFromAxisAngle(up,a.x*3);SC.set(a.s*.5,a.s*.9,a.s*.5)})}
 // ce qu'on ramasse : bois sec (au pied des arbres), pierres à fusil (près de l'habitation, ou perdues sur la piste des chasseurs)
 I.obj=[];const bm=new THREE.MeshLambertMaterial({color:0x7a5a38}),pm=new THREE.MeshLambertMaterial({color:0x50483e,emissive:0x221a10});
 for(let t=0;t<3000&&I.obj.filter(o=>o.k==='bois').length<70;t++){const i=Math.floor(r()*N),p=P[i],a=r()*6.28,d=2.4+r()*5,x=p[0]+Math.cos(a)*d,z=p[1]+Math.sin(a)*d;if(bAt(i)<.6)continue;const m=new THREE.Mesh(new THREE.CylinderGeometry(.05,.06,1.1,4),bm);m.rotation.z=Math.PI/2;m.rotation.y=r()*3;m.position.set(x,hAt(x,z)+.08,z);S3.add(m);I.obj.push({k:'bois',x,z,m})}
 const pierres=[];if(C.b0<1)for(let k=0;k<2;k++)pierres.push(Math.floor(N*(.02+.04*k)));I.CH.forEach(o=>pierres.push(Math.max(0,Math.floor(o.i0)-8)));
 pierres.forEach(i=>{const p=I.P[i],x=p[0]+(r()-.5)*4,z=p[1]+(r()-.5)*4;const m=new THREE.Mesh(new THREE.OctahedronGeometry(.13,0),pm);m.position.set(x,hAt(x,z)+.12,z);S3.add(m);I.obj.push({k:'pierre',x,z,m})});
 // le gibier : tangues dans la forêt, cabris dans les espaces ouverts
 I.gib=[];const tm=new THREE.MeshLambertMaterial({color:0x6b5038}),cm=new THREE.MeshLambertMaterial({vertexColors:true});
 for(let k=0;k<14;k++){const i=Math.floor((.06+.9*r())*(N-1)),p=P[i],b=bAt(i),a=r()*6.28,d=5+r()*12,x=p[0]+Math.cos(a)*d,z=p[1]+Math.sin(a)*d;const cab=b<1||b>=3.2;let m;
  if(cab){try{m=new THREE.Mesh(fpsGeo('cabri'),cm);m.scale.setScalar(.8)}catch(e){m=new THREE.Mesh(new THREE.BoxGeometry(.8,.5,.3),tm)}}else{m=new THREE.Mesh(new THREE.SphereGeometry(.18,7,5),tm);m.scale.set(1.3,.8,1)}
  m.position.set(x,hAt(x,z),z);S3.add(m);I.gib.push({k:cab?'cabri':'tangue',x,z,m,dir:r()*6.28,fuit:0,mort:0})}
 incMsg287((SAC290[C.t]||{})._t||'');hud290()}
function pres290(I,x,z){let best=null,bd=1.6;I.obj.forEach(o=>{if(o.pris)return;const d=Math.hypot(o.x-x,o.z-z);if(d<bd){bd=d;best=o}});return best}
function eau290(I,x,z){let bd=99;I.riv.forEach(([rx,rz,w])=>{const d=Math.hypot(rx-x,rz-z)-w;if(d<bd)bd=d});return bd}
function hud290(){const I=INC;if(!I||!I.st)return;let d=$('incS');if(!d){d=document.createElement('div');d.id='incS';d.style.cssText='position:absolute;left:12px;top:118px;color:#f4ecd8;font:13px Georgia,serif;text-shadow:0 1px 3px #000;background:rgba(20,16,10,.45);padding:6px 9px;border-radius:6px;max-width:300px';I.el.appendChild(d)}
 const st=I.st,sac=st.sac,bar=(v,c)=>'<span style="display:inline-block;width:90px;height:7px;background:#2a2218;border-radius:4px;vertical-align:middle"><span style="display:block;height:7px;border-radius:4px;width:'+Math.max(0,Math.min(100,v))+'%;background:'+c+'"></span></span>';
 const L=[];if(sac.bertel)L.push('bertel');if(sac.couteau)L.push('couteau');if(sac.sagaie)L.push('sagaie');if(sac.calebasse)L.push('calebasse ('+sac.eau+'/2)');if(sac.pierre)L.push('pierre à fusil');if(sac.plantes)L.push('plantes ×'+sac.plantes);if(sac.bois)L.push('bois sec ×'+sac.bois);if(sac.viande)L.push('viande crue ×'+sac.viande);if(sac.camaron)L.push('camarons ×'+sac.camaron);if(sac.cuit)L.push('cuit ×'+sac.cuit);
 d.innerHTML='Endurance '+bar(I.endu==null?100:I.endu,'#8ac060')+'<br>Soif '+bar(st.soif,'#5aa0d0')+'<br>Faim '+bar(st.faim,'#d0a050')+'<br><small>'+(L.length?L.join(' · '):'rien sur soi')+'</small>'+(st.occ?'<br><b>'+st.occ.t+'…</b>':'')}
function occ290(I,t,dur,fin){I.st.occ={t,fin:performance.now()+dur*1000,f:fin};hud290()}
function inc290Touche(k,e){const I=INC;if(!I||!I.st||I.pause)return;const st=I.st,sac=st.sac,h=I.h,cap=sac.bertel?8:3,nb=()=>sac.bois+sac.viande+sac.camaron+sac.cuit;if(st.occ)return;
 if(k==='e'){const o=pres290(I,h.x,h.z);if(o){if(nb()>=cap&&o.k==='bois'){incMsg287(sac.bertel?'Le bertel est plein.':'Vos bras sont pleins — sans bertel, on porte peu.');return}o.pris=1;o.m.visible=false;if(o.k==='bois'){sac.bois++;incMsg287('Bois sec ramassé.')}else{sac.pierre=1;incMsg287('Une pierre à fusil : un silex venu d’Europe, perdu là. Avec le dos du couteau ou une pierre dure, elle donne l’étincelle.')}hud290();return}
  const g=I.gib.find(g=>!g.mort&&g.k==='tangue'&&Math.hypot(g.x-h.x,g.z-h.z)<1.6);if(g){if(I.baisse||g.fuit<=0){g.mort=1;g.m.visible=false;sac.viande++;incMsg287('Un tangue attrapé à la main.');hud290()}else incMsg287('Il vous a entendu. Approchez baissé (C).');return}
  const de=eau290(I,h.x,h.z);if(de<1.6){if(st.soif<90){st.soif=100;if(sac.calebasse)sac.eau=2;incMsg287(sac.calebasse?'Vous buvez à la rivière et remplissez la calebasse.':'Vous buvez à la rivière.')}else{occ290(I,'Vous cherchez des camarons sous les galets',4,()=>{if(Math.random()<Math.min(.95,(I.baisse?.75:.5)*(/Anchaing/.test(I.h.d&&I.h.d.n||'')?1.35:1))){sac.camaron++;incMsg287('Des camarons, pris à la main sous les galets.')}else incMsg287('Rien sous ces galets.')})}hud290();return}
  if(sac.calebasse&&sac.eau>0&&st.soif<80){sac.eau--;st.soif=Math.min(100,st.soif+45);incMsg287('Une gorgée à la calebasse.');hud290();return}
  if(sac.plantes&&I.souffle<3){sac.plantes--;I.souffle++;incMsg287('Une plante pilée sur la blessure : le souffle revient.');incHud287();hud290();return}
  incMsg287('Rien à prendre ici. La rivière est à côté du chemin ; le bois sec au pied des arbres.');return}
 if(k==='r'){if(!sac.sagaie){incMsg287('Il faudrait une sagaie pour chasser le cabri.');return}const g=I.gib.filter(g=>!g.mort&&g.k==='cabri').map(g=>[g,Math.hypot(g.x-h.x,g.z-h.z)]).filter(([g,d])=>d<14).sort((a,b)=>a[1]-b[1])[0];
  if(!g){incMsg287('Aucun cabri à portée.');return}const [c,d]=g;if(Math.random()<(I.baisse?.8:.55)-d*.02){c.mort=1;c.m.rotation.z=Math.PI/2;sac.viande+=2;incMsg287('La sagaie a porté : un cabri.')}else{c.fuit=4;incMsg287('Manqué ! Le cabri détale. La sagaie est ramassée.')}hud290();return}
 if(k==='f'){if(st.feu){incMsg287('Le feu brûle déjà.');return}if(sac.bois<2){incMsg287('Il faut au moins deux bois secs.');return}
  const allume=()=>{sac.bois-=2;const g=new THREE.Group(),fl=new THREE.Mesh(new THREE.ConeGeometry(.35,.9,7),new THREE.MeshBasicMaterial({color:0xff9a30,transparent:true,opacity:.9}));fl.position.y=.45;g.add(fl);const lu=new THREE.PointLight(0xffa040,1.6,14);lu.position.y=1;g.add(lu);
   const x=h.x+Math.sin(h.ang)*1.2,z=h.z+Math.cos(h.ang)*1.2;g.position.set(x,I.hAt(x,z),z);I.S3.add(g);st.feu={g,fl,x,z,fin:performance.now()+90000};st.fumee=1;incMsg287('Le feu prend. La fumée monte : les chasseurs la verront de plus loin.');hud290()};
  if(sac.pierre&&(sac.couteau||true))occ290(I,'Vous frappez la pierre à fusil',2,allume);else occ290(I,'Vous frottez deux bois l’un contre l’autre, à la malgache',9,()=>{if(Math.random()<.75)allume();else{sac.bois=Math.max(0,sac.bois-1);incMsg287('Le bois était trop humide. Encore un essai.')}});return}
 if(k==='m'){if(sac.cuit){sac.cuit--;st.faim=Math.min(100,st.faim+50);incMsg287('Vous mangez, cuit au feu.')}else if(sac.camaron){sac.camaron--;st.faim=Math.min(100,st.faim+15);incMsg287('Des camarons crus : un peu de force.')}else if(sac.viande){sac.viande--;st.faim=Math.min(100,st.faim+12);incMsg287('Viande crue : ça tient au ventre, mal.')}else incMsg287('Rien à manger. Pêchez, chassez, et cuisez au feu.');hud290()}}
function tick290(dt){const I=INC;if(!I||!I.st||I.pause||I.duel||I.fini)return;const st=I.st,sac=st.sac,h=I.h,now=performance.now();
 const effort=(I.grimpe?2.2:(I.keys.Shift?1.6:1));st.soif=Math.max(0,st.soif-dt*.42*effort);st.faim=Math.max(0,st.faim-dt*.22*effort);
 if(st.soif<=0||st.faim<=0){st.manque=(st.manque||0)+dt;if(st.manque>30){st.manque=0;I.souffle--;incHud287();incMsg287(st.soif<=0?'La soif vous épuise : buvez à la rivière.':'La faim vous épuise : mangez.');if(I.souffle<=0)incPris287({})}}
 if(st.occ&&now>st.occ.fin){const f=st.occ.f;st.occ=null;f&&f();hud290()}
 if(st.feu){st.feu.fl.scale.y=.85+.3*Math.sin(now/90)+.1*Math.random();st.feu.fl.material.opacity=.75+.2*Math.random();
  if(Math.hypot(st.feu.x-h.x,st.feu.z-h.z)<2.5&&(sac.viande||sac.camaron)){st.cuis=(st.cuis||0)+dt;const cuisi=/Héva/.test(I.h.d&&I.h.d.n||'');if(st.cuis>(cuisi?2:4)){st.cuis=0;if(sac.viande){sac.viande--;sac.cuit+=cuisi?3:2}else{sac.camaron--;sac.cuit+=cuisi?2:1}incMsg287('C’est cuit.');hud290()}}
  if(now>st.feu.fin){I.S3.remove(st.feu.g);st.feu=null;st.fumee=0}}
 // les bêtes : elles broutent, et fuient si on arrive debout
 I.gib.forEach(g=>{if(g.mort)return;const d=Math.hypot(g.x-h.x,g.z-h.z);if(d<(I.baisse?2.5:7)&&g.fuit<=0)g.fuit=3;let v=.3;if(g.fuit>0){g.fuit-=dt;g.dir=Math.atan2(g.x-h.x,g.z-h.z);v=g.k==='cabri'?6:2.2}else g.dir+=(Math.random()-.5)*dt;const nx=g.x+Math.sin(g.dir)*v*dt,nz=g.z+Math.cos(g.dir)*v*dt;if(!incBloque287(nx,nz)){g.x=nx;g.z=nz}g.m.position.set(g.x,I.hAt(g.x,g.z),g.z);g.m.rotation.y=g.dir+(g.k==='cabri'?-Math.PI/2:0)});
 if((st.tic+=dt)>.5){st.tic=0;hud290()}}
// branchements sur le moteur des incarnations
{const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);try{if(INC&&!INC.st)init290(INC)}catch(e){console.warn(e)}return r}}
{const b=incBoucle287;let t=performance.now();incBoucle287=function(){const n=performance.now(),dt=Math.min(.1,(n-t)/1000);t=n;try{tick290(dt)}catch(e){}return b.apply(this,arguments)}}

// une fougère : cinq frondes étroites qui partent du sol et retombent (géométrie fusionnée, une seule fois)
function fougere290(){if(fougere290.g)return fougere290.g;const sh=new THREE.Shape();sh.moveTo(0,0);sh.quadraticCurveTo(.12,.35,.02,.9);sh.quadraticCurveTo(-.1,.35,0,0);
 const base=new THREE.ShapeGeometry(sh,4).toNonIndexed(),P=[];for(let k=0;k<6;k++){const g=base.clone();g.rotateX(-(.5+.25*(k%2)));g.rotateY(k/6*Math.PI*2+.3);P.push(g.attributes.position.array)}
 const n=P.reduce((a,b)=>a+b.length,0),A=new Float32Array(n);let o=0;P.forEach(a=>{A.set(a,o);o+=a.length});const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(A,3));g.computeVertexNormals();fougere290.g=g;return g}
