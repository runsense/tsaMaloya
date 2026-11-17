// ===== p108 : la carte vivante (Vie et Histoire) — oiseaux, bêtes, rivières, cavernes connues, plantes de la mystique =====
// Tout se voit quand on regarde de près (zoom). Petits objets légers autour de ce qu'on regarde, refaits quand la vue se déplace.
const VIV108={g:null,cle:'',b:[],o:[],t0:performance.now()};
function viv108Mat(c,o){return new THREE.MeshLambertMaterial(Object.assign({color:c},o||{}))}
function viv108Icone(txt){const cv=document.createElement('canvas');cv.width=cv.height=64;const x=cv.getContext('2d');x.font='44px serif';x.textAlign='center';x.textBaseline='middle';x.shadowColor='rgba(255,240,170,.9)';x.shadowBlur=14;x.fillText(txt,32,34);const t=new THREE.CanvasTexture(cv);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,depthWrite:false,transparent:true}));s.scale.set(.2,.2,1);return s}
function viv108Bati(){const g=new THREE.Group();VIV108.b=[];VIV108.o=[];const c=tileAt(camT);if(!c)return g;const P=T.filter(t=>Math.hypot(t.x-camT.x,t.z-camT.z)<Math.max(4,dist*.7)&&seen(t));
 // les rivières : un ruban d'eau d'une case de rivière à la suivante, vers l'aval
 const eau=viv108Mat(0x3d8db5,{transparent:true,opacity:.85});P.filter(t=>t.riv&&t.alt>0).forEach(t=>{const n=t.nb.map(i=>T[i]).filter(u=>u.riv&&u.alt<t.alt).sort((a,b)=>a.alt-b.alt)[0]||t.nb.map(i=>T[i]).filter(u=>u.alt<=0).sort((a,b)=>a.alt-b.alt)[0];if(!n)return;
  const a=new THREE.Vector3(t.x,t.alt*VX+.03,t.z),b=new THREE.Vector3(n.x,Math.max(0,n.alt)*VX+.03,n.z),L=a.distanceTo(b);const m=new THREE.Mesh(new THREE.BoxGeometry(.07,.012,L),eau);m.position.copy(a).lerp(b,.5);m.lookAt(b);g.add(m);
  // un poisson de temps en temps dans la rivière
  if(rnd()<.35){const f=new THREE.Mesh(new THREE.SphereGeometry(.018,6,4),viv108Mat(0xc8d6e0));f.scale.set(2,1,1);g.add(f);VIV108.b.push({k:'poisson',o:f,a,b,ph:Math.random()*6})}});
 // les bêtes : cabris, cochons marrons, tangues, sur les cases boisées ou de savane
 const cols={cabri:0x8a6a4a,cochon:0x3a2e28,tangue:0x6b5038};P.filter(t=>!t.bare&&t.alt>20&&!camps().some(c=>c.i===t.i)).slice(0,40).forEach((t,i)=>{if(i%3)return;const k=t.forest?(i%2?'cochon':'tangue'):'cabri';const o=new THREE.Group();const corps=new THREE.Mesh(new THREE.BoxGeometry(.09,.05,.04),viv108Mat(cols[k]));corps.position.y=.06;const tete=new THREE.Mesh(new THREE.BoxGeometry(.035,.035,.03),viv108Mat(cols[k]));tete.position.set(.06,.08,0);o.add(corps,tete);
  [[-.03,.015],[.03,.015],[-.03,-.015],[.03,-.015]].forEach(([x,z])=>{const p=new THREE.Mesh(new THREE.CylinderGeometry(.006,.006,.04,4),viv108Mat(0x2a2018));p.position.set(x,.02,z);o.add(p)});if(k==='cabri'){const c1=new THREE.Mesh(new THREE.ConeGeometry(.008,.03,4),viv108Mat(0xd8d0c0));c1.position.set(.065,.11,0);o.add(c1)}
  o.position.set(t.x,t.alt*VX,t.z);g.add(o);VIV108.b.push({k,o,cx:t.x,cz:t.z,cap:Math.random()*6,ph:Math.random()*6})});
 // les oiseaux : deux vols qui tournent au-dessus
 for(let v=0;v<2;v++)for(let i=0;i<5;i++){const o=new THREE.Group(),m=viv108Mat(v?0xf2f2ea:0x2a2a2a,{side:THREE.DoubleSide});const ai=[1,-1].map(sg=>{const w=new THREE.Mesh(new THREE.PlaneGeometry(.045,.014),m);w.position.x=sg*.022;o.add(w);return w});const c=new THREE.Mesh(new THREE.SphereGeometry(.008,5,4),m);c.scale.z=2;o.add(c);g.add(o);VIV108.b.push({k:'oiseau',o,v,i,ai})}
 // les cavernes connues : une bouche sombre dans la pente
 try{Object.keys(S.cav97||{}).map(Number).map(i=>T[i]).filter(t=>t&&P.includes(t)).forEach(t=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.12,10,6,0,Math.PI*2,0,Math.PI/2),viv108Mat(0x0e0b09));m.scale.set(1,.8,.5);m.position.set(t.x+.25,t.alt*VX+.02,t.z+.1);g.add(m);const s=viv108Icone('🕳️');s.position.set(t.x+.25,t.alt*VX+.32,t.z+.1);g.add(s)})}catch(e){}
 // les plantes et pierres de la mystique, là où elles poussent (marrons) : une petite lueur
 try{if(!S.voieC&&typeof ING99!=='undefined'){let n=0;P.forEach(t=>{if(n>14)return;const ok=Object.entries(ING99).find(([q,J])=>{try{return J.ok&&J.ok(t)}catch(e){return false}});if(!ok)return;const s=viv108Icone(ok[1].ic||'🌿');s.position.set(t.x-.2,t.alt*VX+.22,t.z-.15);s.userData.n=ok[1].n;g.add(s);VIV108.o.push(s);n++})}}catch(e){}
 return g}
setInterval(()=>{try{if(typeof scene==='undefined'||!S||S.fin||K||VP){if(VIV108.g)VIV108.g.visible=false;return}const on=dist<16;if(!on){if(VIV108.g)VIV108.g.visible=false;return}
 const cle=Math.round(camT.x/1.5)+'|'+Math.round(camT.z/1.5)+'|'+Math.round(dist/4)+'|'+Object.keys(S.cav97||{}).length;if(cle!==VIV108.cle){VIV108.cle=cle;if(VIV108.g){scene.remove(VIV108.g);VIV108.g.traverse(o=>{if(o.geometry)o.geometry.dispose()})}VIV108.g=viv108Bati();scene.add(VIV108.g)}VIV108.g.visible=true}catch(e){}},700);
(function boucle(){requestAnimationFrame(boucle);try{if(!VIV108.g||!VIV108.g.visible)return;const s=(performance.now()-VIV108.t0)/1000;
 VIV108.b.forEach(b=>{if(b.k==='oiseau'){const a=s*.35+b.v*3+b.i*.18,r=1.6+b.v*.8;const x=camT.x+Math.cos(a)*r+b.i*.06,z=camT.z+Math.sin(a)*r,y=(Math.max(0,alt(x,z))*VX)+1.1+b.v*.3+Math.sin(s*2+b.i)*.04;b.o.position.set(x,y,z);b.o.rotation.y=-a;b.ai.forEach((w,j)=>w.rotation.z=(j?-1:1)*Math.sin(s*12+b.i)*.6);return}
  if(b.k==='poisson'){const u=((s*.15+b.ph)%1);b.o.position.copy(b.a).lerp(b.b,u);b.o.position.y+=Math.max(0,Math.sin(u*40))*.02;return}
  b.ph+=.016;if(Math.sin(b.ph*.6)>.3){b.cap+=Math.sin(b.ph*.21)*.02;const x=b.o.position.x+Math.cos(b.cap)*.004,z=b.o.position.z+Math.sin(b.cap)*.004;if(Math.hypot(x-b.cx,z-b.cz)>.6)b.cap+=Math.PI;else{b.o.position.x=x;b.o.position.z=z}b.o.position.y=Math.max(0,alt(b.o.position.x,b.o.position.z))*VX;b.o.rotation.y=-b.cap}});
 VIV108.o.forEach((sp,i)=>{sp.material.opacity=.65+.35*Math.sin(s*2+i)})}catch(e){}})();
