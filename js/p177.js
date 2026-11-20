
// ===== p177 : les rivières souterraines — l'eau des pluies traverse la roche et ressort à flanc de rempart (résurgences) ; et les cerfs en Survie après 1755 =====
// Le basalte de l'île est très perméable : une grande part de la pluie s'infiltre, circule dans les coulées et les tubes, et ressort en sources au pied ou à mi-hauteur des remparts,
// au-dessus des rivières. On en voit le filet blanc qui coule sur la falaise, souvent plus fort quelques jours après les grosses pluies.
const RES177={L:null,vu:{}};
function resBatir177(){const L=[];if(typeof eauMat147!=='function'||!window.RIV126||!RIV126.length)return null;
 const C=T.filter(t=>!t.bare&&t.slope>16&&t.alt>250&&t.alt<1900&&(t.nb||[]).some(i=>T[i]&&T[i].riv)).sort((a,b)=>rndH(a.i*5.3)-rndH(b.i*5.3));
 for(const t of C){if(L.length>=30)break;if(L.some(g=>Math.hypot(g.position.x-t.x,g.position.z-t.z)<2.2))continue;
  // le pied de la source : le point de rivière le plus proche ; la source sort plus haut, sur la pente
  let best=null,bd=1e9;for(const r of RIV126)for(const q of r.P){const d=Math.hypot(q[0]-t.x,q[1]-t.z);if(d<bd){bd=d;best=q}}if(!best||bd>.9)continue;
  const bx=best[0],bz=best[1],hb=Math.max(0,alt(bx,bz)),dx=t.x-bx,dz=t.z-bz,l=Math.hypot(dx,dz)||1,sx=bx+dx/l*Math.min(.35,l*.6),sz=bz+dz/l*Math.min(.35,l*.6),hs=Math.max(0,alt(sx,sz));
  const H=(hs-hb)*VX;if(H<.06)continue;const G=new THREE.Group();G.position.set(bx,hb*VX+.01,bz);G.rotation.y=Math.atan2(dx,dz)+Math.PI;
  const w=.035,pl=new THREE.PlaneGeometry(w,H,1,6);pl.translate(0,H/2,0);const e=new THREE.Mesh(pl,eauMat147());e.position.z=-Math.min(.33,l*.55)*.9;e.rotation.x=-Math.atan2(Math.min(.35,l*.6),H)*.5;G.add(e);
  const m=new THREE.Mesh(new THREE.RingGeometry(.01,.05,14).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0xcfeaf0,transparent:true,opacity:.55,depthWrite:false}));m.position.y=.006;G.add(m);
  G.userData={t,res:1};G.visible=false;scene.add(G);L.push(G)}
 return L}
(function att177(){try{if(!RES177.L&&typeof scene!=='undefined'&&window.RIV126&&RIV126.length&&typeof T!=='undefined'){RES177.L=resBatir177()}}catch(e){}if(!RES177.L)setTimeout(att177,2000)})();
function resMaj177(){try{if(!RES177.L||!S)return;const vue=!(typeof VP!=='undefined'&&VP)&&!(typeof CINE!=='undefined'&&CINE)&&dist<16;const mouille=typeof pluieLieu174==='function'?pluieLieu174(camT.x,camT.z).duty:.4;
 RES177.L.forEach(G=>{const t=G.userData.t,on=vue&&seen(t)&&Math.hypot(G.position.x-camT.x,G.position.z-camT.z)<dist*1.2+3;G.visible=on;if(on){G.children[0].scale.x=.6+mouille*1.2;
  if(!S.res177&&!modeHist()){S.res177=1;if(typeof log==='function')log('Une source sort du rempart, au-dessus de la rivière : l’eau des pluies a traversé la roche.')}
  if(!S.res177f){S.res177f=1;try{S.evq.push('resurgence177')}catch(e){}}}})}catch(e){RES177.err=e.message}}
setInterval(resMaj177,700);
EV.resurgence177={sys:1,tag:'Nature',an:'',t:'L’eau qui sort de la roche',b:'Sur le rempart, au-dessus de la rivière, un filet d’eau sort de la pierre et coule sur la falaise. Ici la roche est une éponge : la pluie des Hauts s’enfonce dans les coulées, voyage sous terre, et ressort plus bas en sources. Après les grosses pluies, le filet devient cascade.',
 v:'Une eau claire, filtrée par la pierre.',h:'Vrai : les basaltes de La Réunion sont très perméables ; une grande part des pluies s’infiltre et alimente des nappes et des sources qui sortent au flanc des remparts et au fond des ravines.',o:[{n:'Remplir les calebasses',d:'Santé +1.',fx:{sante:1},hist:1}]};
// ----- les cerfs en Survie : après 1755, dans les forêts des Hauts, autour de la ville -----
const KC177={L:[],mx:[],t:performance.now()};
(function boucle177(){requestAnimationFrame(boucle177);try{const d=$('kons');const now=performance.now(),dt=Math.min(.1,(now-KC177.t)/1000);KC177.t=now;KC177.mx.forEach(m=>m.update(dt));
 if(typeof K==='undefined'||!K||!d||d.hidden||K.vue!=='ville'||typeof KV3==='undefined'||!KV3.S||typeof CABA==='undefined')return;
 if(!CABA.buf){if(CABA.buf!==false&&typeof cabCharger==='function')cabCharger();return}
 const an=typeof kAn139==='function'?kAn139():1663,c=KV3.tg,R=Math.max(2.5,KV3.dist*.9),T2=an<1755?[]:T.filter(t=>Math.hypot(t.x-c.x,t.z-c.z)<R&&!(K.b[t.i]||[]).length&&(t.forest||t.alt>700)&&!t.bare&&rndH(t.i*4.1)<.35).slice(0,4);
 while(KC177.L.length<T2.length){const o={g:new THREE.Group(),ok:0};KV3.S.add(o.g);KC177.L.push(o);new THREE.GLTFLoader().parse(CABA.buf.slice(0),'',g=>{const r=g.scene,b=new THREE.Box3().setFromObject(r),h=(b.max.y-b.min.y)||1;r.position.y=-b.min.y;r.rotation.y=Math.PI/2;o.g.add(r);o.g.scale.setScalar(.12/h);
   const f=new THREE.Color(.82,.56,.34);r.traverse(m=>{if(m.isMesh){m.frustumCulled=false;if(m.material){m.material=m.material.clone();if(m.material.color)m.material.color.multiply(f)}}});
   if(g.animations&&g.animations.length){const mx=new THREE.AnimationMixer(r);const cl=g.animations.find(a=>/marche|walk|brout|graze|idle/i.test(a.name))||g.animations[0];mx.clipAction(cl).play();KC177.mx.push(mx)}o.ok=1})}
 const tps=now/1000;KC177.L.forEach((o,i)=>{const t=T2[i];o.g.visible=!!t&&o.ok;if(!t)return;const k=tps*.05+i*1.7,x=t.x+Math.cos(k)*.3,z=t.z+Math.sin(k*1.2)*.25;o.g.position.set(x,typeof k3Y==='function'?k3Y(x,z):0,z);o.g.rotation.y=-k+Math.PI/2})}catch(e){}})();
