
// ===== p138 : chaque espèce vit à sa façon, et les espèces disparues se voient tant qu'elles vivent =====
// Les deux vols d'oiseaux qui tournaient en rond au-dessus de la vue sont retirés.
// Les nuées ont maintenant une espèce : perroquets verts en bandes bruyantes (forêt), mascarins bruns, huppes blanches et grises par petits groupes,
// oiseaux-lunettes (zoizo blanc) en petites bandes ; le papangue plane seul, haut, en larges cercles ; le paille-en-queue longe les falaises de la côte.
// Tant qu'elles ne sont pas éteintes : tortues géantes sur les côtes et les savanes, dugongs dans le lagon, oiseau bleu sur les plaines d'altitude, roussettes au crépuscule.
function vivant138(k){try{if(S.disp135x)return S.disp135x[k]==null;const y=(DISP133.find(d=>d[0]===k)||[])[1]||0;return S.year<y}catch(e){return false}}
function dens138(k){try{return Math.max(.15,1-((S.disp135||{})[k]||0)*.85)}catch(e){return 1}}
const ESP138={perroquets:{c:0x3f8a3a,n:[8,14],h:1.4,v:.9,zone:'foret'},mascarin:{c:0x6a4a32,bec:0xc8302a,n:[4,7],h:1.2,v:.7,zone:'foret'},huppe:{c:0xe8e4da,n:[3,5],h:.9,v:.5,zone:'foret'},zoizo:{c:0x7a8a50,n:[6,10],h:.8,v:.6,zone:'tout'}};
{const o0=oiseau135;oiseau135=function(esp){const g=o0();try{const E=ESP138[esp];if(E){g.traverse(m=>{if(m.isMesh){m.material=m.material.clone();m.material.color.setHex(E.c)}});if(E.bec){const b=new THREE.Mesh(new THREE.ConeGeometry(.006,.015,4).rotateX(Math.PI/2),new THREE.MeshBasicMaterial({color:E.bec}));b.position.z=.04;g.add(b)}}}catch(e){}return g}}
nuee135=function(cx,cz){let L=['zoizo'];['perroquets','mascarin','huppe'].forEach(k=>{if(vivant138(k)&&Math.random()<dens138(k))L.push(k)});const esp=L[Math.floor(Math.random()*L.length)],E=ESP138[esp];
 const n=E.n[0]+Math.floor(Math.random()*(E.n[1]-E.n[0]+1)),R=[];for(let i=0;i<n;i++){const o=oiseau135(esp);o.position.set(cx+(Math.random()-.5)*1.5,0,cz+(Math.random()-.5)*1.5);o.userData.v=new THREE.Vector3((Math.random()-.5)*.5,0,(Math.random()-.5)*.5);o.userData.h=E.h*(.8+Math.random()*.4);scene.add(o);R.push(o)}
 return {L:R,cx,cz,pose:0,arbre:null,esp}};
// --- le papangue qui plane, le paille-en-queue des falaises ---
const VOL138={pap:null,pq:[]};
function rapace138(blanc){const g=new THREE.Group(),m=new THREE.MeshBasicMaterial({color:blanc?0xf6f6f2:0x5a4632,side:THREE.DoubleSide});const s=new THREE.Shape();s.moveTo(-.11,0);s.quadraticCurveTo(0,.035,.11,0);s.lineTo(0,-.02);s.lineTo(-.11,0);
 const ai=new THREE.Mesh(new THREE.ShapeGeometry(s).rotateX(-Math.PI/2),m);g.add(ai);const c=new THREE.Mesh(new THREE.ConeGeometry(.012,.07,5).rotateX(Math.PI/2),m);g.add(c);
 if(blanc){const q=new THREE.Mesh(new THREE.BoxGeometry(.004,.002,.12),m);q.position.z=-.08;g.add(q)}scene.add(g);return g}
// --- les bêtes disparues, en formes simples en attendant de vrais modèles ---
const DISP138={tor:[],dug:[],ble:[],rou:[]};
function tortue138(){const g=new THREE.Group(),c=new THREE.Mesh(new THREE.SphereGeometry(.045,10,6,0,Math.PI*2,0,Math.PI/2),new THREE.MeshLambertMaterial({color:0x4e4a38}));c.scale.set(1.15,.85,1);g.add(c);
 const t=new THREE.Mesh(new THREE.SphereGeometry(.014,6,5),new THREE.MeshLambertMaterial({color:0x6a6450}));t.position.set(.055,.012,0);g.add(t);g.userData.tete=t;scene.add(g);return g}
function dugong138(){const g=new THREE.Group(),m=new THREE.MeshLambertMaterial({color:0x7e8a90});const b=new THREE.Mesh(new THREE.SphereGeometry(.05,10,6),m);b.scale.set(2.2,.55,.8);g.add(b);const q=new THREE.Mesh(new THREE.ConeGeometry(.04,.02,3).rotateZ(Math.PI/2),m);q.scale.set(1,1,2.2);q.position.x=-.12;g.add(q);scene.add(g);return g}
function bleu138(){const g=new THREE.Group(),m=new THREE.MeshLambertMaterial({color:0x2f5fb8});const b=new THREE.Mesh(new THREE.SphereGeometry(.03,8,6),m);b.scale.set(1.3,1,.9);b.position.y=.06;g.add(b);
 const tt=new THREE.Mesh(new THREE.SphereGeometry(.014,6,5),m);tt.position.set(.035,.09,0);g.add(tt);const bec=new THREE.Mesh(new THREE.ConeGeometry(.007,.022,4).rotateZ(-Math.PI/2),new THREE.MeshLambertMaterial({color:0xd04030}));bec.position.set(.055,.088,0);g.add(bec);
 [-.01,.01].forEach(z=>{const p=new THREE.Mesh(new THREE.CylinderGeometry(.003,.003,.05,4),new THREE.MeshLambertMaterial({color:0xc85030}));p.position.set(0,.025,z);g.add(p)});scene.add(g);return g}
function roussette138(){const g=new THREE.Group(),m=new THREE.MeshBasicMaterial({color:0x2a1c16,side:THREE.DoubleSide});const s=new THREE.Shape();s.moveTo(0,0);s.lineTo(.07,.02);s.lineTo(.06,-.01);s.lineTo(.04,.0);s.lineTo(.02,-.015);s.lineTo(0,0);
 const ad=new THREE.Mesh(new THREE.ShapeGeometry(s).rotateX(-Math.PI/2),m),ag=ad.clone();ag.scale.x=-1;g.add(ad,ag);g.add(new THREE.Mesh(new THREE.SphereGeometry(.012,6,5),m));g.userData={ad,ag};scene.add(g);return g}
function pool138(L,n,mk){while(L.length<n)L.push(mk());L.forEach((o,i)=>o.visible=i<n)}
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(!S||typeof scene==='undefined')return r;const now=performance.now()/1000,on=dist<14&&!S.fin,nuit=typeof jourPh==='function'?jourPh():.4;
  try{if(typeof VIV108!=='undefined'&&VIV108.b)VIV108.b.forEach(b=>{if(b.k==='oiseau'&&b.o)b.o.visible=false})}catch(e){}
  const R2=dist*.8+3,proche=on?T.filter(t=>{const dx=t.x-camT.x,dz=t.z-camT.z;return dx*dx+dz*dz<=R2*R2&&S.t[t.i]&&S.t[t.i].s}):[];const h=(t,s)=>rndH(t.i*5.1+s);
  // tortues : côte et savane basse, pas sur les terres des colons
  const LT=[];if(on&&vivant138('tortues')){const d=dens138('tortues');proche.forEach(t=>{const o=S.t[t.i];if(t.alt>450||t.forest||o.c||o.b==='camp'||h(t,1)>.5*d||LT.length>10)return;const n=1+Math.floor(h(t,2)*3);for(let j=0;j<n;j++){const k=now*.03+h(t,3)*6+j;LT.push([t.x+.3*Math.sin(k+j)+(j-.5)*.1,t.z+.25*Math.cos(k*.8+j*2),Math.cos(k)])}})}
  pool138(DISP138.tor,LT.length,tortue138);LT.forEach(([x,z,a],i)=>{const g=DISP138.tor[i];g.position.set(x,Math.max(0,alt(x,z))*VX,z);g.rotation.y=a;g.userData.tete.position.y=.012+.006*Math.sin(now*1.3+i)});
  // dugongs : dans le lagon et les eaux calmes de l'Ouest, ils remontent respirer
  const LD=[];if(on&&vivant138('dugong')){const [cx,cz]=xz(55.53,-21.12),d=dens138('dugong');proche.forEach(t=>{if(t.alt>15||!(typeof cotier==='function'&&cotier(t))||h(t,4)>.35*d||LD.length>5)return;const vx=t.x-cx,vz=t.z-cz,l=Math.hypot(vx,vz)||1,k=now*.05+h(t,5)*6;LD.push([t.x+vx/l*.7+Math.sin(k)*.3,t.z+vz/l*.7+Math.cos(k*.7)*.2,k])})}
  pool138(DISP138.dug,LD.length,dugong138);LD.forEach(([x,z,k],i)=>{const g=DISP138.dug[i];const s=Math.sin(now*.6+i*2);g.position.set(x,-.035+Math.max(0,s)*.03,z);g.rotation.y=-k;g.visible=s>-.6});
  // oiseau bleu : plaines d'altitude, à découvert
  const LB=[];if(on&&vivant138('oiseaubleu')){const d=dens138('oiseaubleu');proche.forEach(t=>{if(t.alt<1300||t.alt>2400||t.forest||h(t,6)>.45*d||LB.length>6)return;const k=now*.25+h(t,7)*6,fk=k-Math.floor(k),u=Math.floor(k)+(fk<.6?0:(fk-.6)/.4);LB.push([t.x+.25*Math.sin(u*1.3+h(t,8)*6),t.z+.2*Math.cos(u*1.1),u])})}
  pool138(DISP138.ble,LB.length,bleu138);LB.forEach(([x,z,u],i)=>{const g=DISP138.ble[i];g.position.set(x,Math.max(0,alt(x,z))*VX,z);g.rotation.y=-u*1.3;g.children[1].position.y=.09+.01*Math.sin(now*6+i)});
  // roussettes : au crépuscule et la nuit, au-dessus des forêts
  const crep=nuit>.66||nuit<.06,LR=[];if(on&&crep){['roussetteN','roussetteC'].forEach(k=>{if(!vivant138(k))return;const d=dens138(k);proche.forEach(t=>{if(!t.forest||h(t,9)>.3*d||LR.length>8)return;const k2=now*.4+h(t,10)*6;LR.push([t.x+Math.cos(k2)*.5,t.z+Math.sin(k2*1.3)*.4,k2])})})}
  pool138(DISP138.rou,LR.length,roussette138);LR.forEach(([x,z,k],i)=>{const g=DISP138.rou[i];g.position.set(x,Math.max(0,alt(x,z))*VX+.7+.1*Math.sin(k*2),z);g.rotation.y=-k*1.3;const a=Math.sin(now*9+i)*.7;g.userData.ad.rotation.z=a;g.userData.ag.rotation.z=-a});
  // le papangue plane seul, haut, en larges cercles lents
  if(on&&!(nuit>.74||nuit<.03)){if(!VOL138.pap)VOL138.pap=rapace138(false);const p=VOL138.pap,k=now*.22;p.visible=true;const x=camT.x+Math.cos(k)*dist*.35,z=camT.z+Math.sin(k)*dist*.28;p.position.set(x,Math.max(0,alt(x,z))*VX+2.2+.2*Math.sin(now*.3),z);p.rotation.y=Math.atan2(-Math.sin(k)*.35,Math.cos(k)*.28);p.rotation.z=-.22+.08*Math.sin(now*.7)}else if(VOL138.pap)VOL138.pap.visible=false;
  // le paille-en-queue : par deux, le long des falaises de la côte
  const cf=on?proche.filter(t=>t.alt<250&&t.slope>20&&typeof cotier==='function'&&cotier(t)).slice(0,1):[];
  pool138(VOL138.pq,cf.length?2:0,()=>rapace138(true));if(cf.length){const t=cf[0];VOL138.pq.forEach((g,i)=>{const k=now*.35+i*.6;const x=t.x+Math.cos(k)*.9,z=t.z+Math.sin(k*1.2)*.6;g.position.set(x,Math.max(0,alt(x,z))*VX+.8+.15*Math.sin(now+i),z);g.rotation.y=-k*1.1;g.rotation.z=Math.sin(now*2+i)*.2;g.scale.setScalar(.7)})}
 }catch(e){}return r}}
// Vie et Survie : au lancement, la carte ne s'entrevoit plus avant les panneaux du début (conseil, vote, « comment jouer ») ; elle apparaît en fondu ensuite.
{const st=document.createElement('style');st.textContent='#voile138{position:fixed;inset:0;z-index:79;background:radial-gradient(ellipse at 50% 40%,#2a2318,#120f0b 70%);transition:opacity .8s ease;pointer-events:none}';document.head.appendChild(st);
 const nv=nouvelle;nouvelle=function(){let v=null;try{if(!modeHist()){v=document.createElement('div');v.id='voile138';document.body.appendChild(v)}}catch(e){}const r=nv.apply(this,arguments);
  if(v){const t0=performance.now();let calme=0;const w=setInterval(()=>{try{const pan=['cons87','comm115','orA'].some(id=>{const e=document.getElementById(id);return e&&e.offsetParent!==null})||(()=>{const m=$('modal');return m&&!m.hidden})();
    const vie=S&&S.init115!=null;const fini=vie?(S.init115===2&&!pan):(!pan&&performance.now()-t0>1200);calme=fini?calme+1:0;
    if(calme>=3||performance.now()-t0>45000){clearInterval(w);v.style.opacity='0';setTimeout(()=>v.remove(),900)}}catch(e){clearInterval(w);v.remove()}},200)}
  return r}}
