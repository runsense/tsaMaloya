// ===== p219 : le vent de zone — un petit générateur de rendu naturel. Chaque lieu a son vent, selon sa place dans l'île et son relief :
// l'alizé d'est-sud-est couche les arbres vers l'ouest sur la côte au vent et dans le Sud sauvage ; il s'affaiblit sous le vent (l'Ouest)
// et au fond des cirques ; il forcit sur les hauteurs dégagées ; dans les ravines il suit la vallée. Dans une même zone, les arbres penchent
// tous du même côté ; les rochers sont tous différents ; les oiseaux dérivent et les bêtes se détournent quand elles passent dans un lieu venté. =====
const V219={c:new Map()};
function cirque219(g){return (g.lon>55.38&&g.lon<55.47&&g.lat<-21.01&&g.lat>-21.11)||(g.lon>55.42&&g.lon<55.52&&g.lat<-21.09&&g.lat>-21.19)||(g.lon>55.47&&g.lon<55.58&&g.lat<-21.0&&g.lat>-21.09)}
// renvoie la direction où le vent pousse (dx,dz, vers l'aval) et sa force f (0 à 1,3)
function vent219(x,z){const k=Math.round(x*4)+'|'+Math.round(z*4);let v=V219.c.get(k);if(v)return v;
 try{const g=LL99({x,z}),h=Math.max(0,alt(x,z));let a,f;
  if(g.lat<-21.22){a=Math.atan2(-.7,-.72);f=1}                       // Sud sauvage : du sud-est
  else if(g.lon>55.6){a=Math.atan2(-.3,-.95);f=1.05}                 // côte au vent : de l'est
  else if(g.lat>-20.93){a=Math.atan2(.05,-1);f=.75}                  // le Nord : l'alizé longe la côte
  else if(g.lon<55.42){a=Math.atan2(-.4,-.92);f=.28}                 // l'Ouest, sous le vent
  else{a=Math.atan2(-.38,-.93);f=.55}
  f+=Math.min(.45,h/2600);if(cirque219(g)&&h<1900)f*=.45;            // les hauteurs forcissent, les cirques abritent
  // au creux d'une ravine, le vent suit la vallée
  if(typeof pente170==='function'&&h<1200){const P=pente170(x,z);if(P.a>.35){const w=Math.min(.6,(P.a-.35)*1.2);const ax=Math.cos(a)*(1-w)+P.dx*w,az=Math.sin(a)*(1-w)+P.dz*w;a=Math.atan2(az,ax)}}
  a+=Math.sin(x*.7+z*.4)*.18;v={dx:Math.cos(a),dz:Math.sin(a),f}}catch(e){v={dx:-1,dz:0,f:.5}}
 if(V219.c.size>40000)V219.c.clear();V219.c.set(k,v);return v}
// les arbres : la même règle que p170 (forme jamais pareille, grands arbres couchés sur les pentes après cyclone), mais l'inclinaison suit le vent de zone
if(typeof arbMat170==='function'){const a0=arbMat170;arbMat170=function(k,x,y,z,ry,s,M){const tb=a0.apply(this,arguments);if(tb)return tb;try{
  const h=q=>rndH(x*91.7+z*37.3+q),W=vent219(x,z),fougere=/^fanjan/.test(k),palme=/palmiste|latanier|vacoa|cocotier|filao/.test(k);
  const ang=(fougere?.04:.06)+W.f*(fougere?.12:palme?.34:.26)+(h(31)-.5)*.06,dx=W.dx+(h(32)-.5)*.25,dz=W.dz+(h(33)-.5)*.25;
  const p=new THREE.Vector3(),q=new THREE.Quaternion(),sc=new THREE.Vector3();M.decompose(p,q,sc);
  const ax=new THREE.Vector3(dz,0,-dx).normalize(),l=new THREE.Quaternion().setFromAxisAngle(ax,ang),yq=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),ry);
  // le houppier se tasse un peu côté vent : plus large dans le sens du vent, plus bas
  sc.y*=1-W.f*.08;M.compose(p,l.multiply(yq),sc)}catch(e){}return tb}}
// les rochers des lieux : chacun sa forme, couché comme il est tombé, à moitié enterré
{const pm=poseM;poseM=function(m,x,y,z,ry,rx,rz,s,col){try{if(typeof MOD!=='undefined'&&m===MOD.rocher&&m.userData.n<m.userData.max){const h=q=>rndH(x*53.1+z*17.9+q),n=m.userData.n;
  const E=new THREE.Euler((h(1)-.5)*1.1,ry+h(2)*6.28,(h(3)-.5)*1.1),Q=new THREE.Quaternion().setFromEuler(E),S3=new THREE.Vector3(s*(.7+h(4)*.7),s*(.5+h(5)*.65),s*(.7+h(6)*.6));
  const M=new THREE.Matrix4().compose(new THREE.Vector3(x,y-s*.02*h(7),z),Q,S3);m.setMatrixAt(n,M);if(col)m.setColorAt(n,col.clone().multiplyScalar(.85+h(8)*.3));else if(m.instanceColor){const c=new THREE.Color(1,1,1).multiplyScalar(.85+h(8)*.3);m.setColorAt(n,c)}m.userData.n=n+1;return}}catch(e){}return pm.apply(this,arguments)}}
// le décor posé à part (cocotiers, pierres, branches) : les cocotiers se couchent avec le vent, chaque pierre a sa forme
setInterval(()=>{try{if(typeof DEC144==='undefined'||!DEC144.G)return;DEC144.G.children.forEach(c=>{if(c.userData.v219)return;c.userData.v219=1;const x=c.position.x,z=c.position.z,h=q=>rndH(x*71.3+z*29.1+q);
  const r=c.rotation.y;
  // on reconnaît le cocotier à sa hauteur (h .6) et la pierre à sa forme basse
  const bb=new THREE.Box3().setFromObject(c),sz=bb.getSize(new THREE.Vector3());
  if(sz.y>.3){const W=vent219(x,z),ang=.08+W.f*.32+(h(1)-.5)*.08,ax=new THREE.Vector3(W.dz,0,-W.dx).normalize();c.quaternion.copy(new THREE.Quaternion().setFromAxisAngle(ax,ang).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),r)))}
  else if(sz.y<.16&&sz.y>Math.max(sz.x,sz.z)*.22){const g=.42+h(10)*.12,col=new THREE.Color(g,g*.97,g*.9);c.traverse(o=>{if(o.isMesh)o.material=new THREE.MeshLambertMaterial({color:col,flatShading:true})});
   c.rotation.set((h(2)-.5)*.7,r,(h(3)-.5)*.7);c.scale.set(c.scale.x*(.75+h(4)*.5),c.scale.y*(.6+h(5)*.6),c.scale.z*(.75+h(6)*.5));c.position.y-=.01*h(7)}
  else if(false){c.rotation.set((h(2)-.5)*.7,r,(h(3)-.5)*.7);c.scale.set(c.scale.x*(.75+h(4)*.5),c.scale.y*(.6+h(5)*.6),c.scale.z*(.75+h(6)*.5));c.position.y-=.01*h(7)}})}catch(e){}},900);
// les oiseaux dérivent avec le vent du lieu où ils passent, en se penchant ; les bêtes au sol se détournent du vent quand il souffle fort
{const b0=bat;let t0=performance.now();bat=function(){const r=b0.apply(this,arguments);try{if(!S||typeof scene==='undefined')return r;const now=performance.now()/1000;
  const vole=[];try{if(typeof NB144!=='undefined'){vole.push(...NB144.pet,...NB144.zoi,...NB144.pig)}}catch(e){}try{if(typeof VOL138!=='undefined'){if(VOL138.pap)vole.push(VOL138.pap);vole.push(...VOL138.pq)}}catch(e){}
  vole.forEach((w,i)=>{if(!w||!w.visible)return;const W=vent219(w.position.x,w.position.z);if(W.f<.3)return;const k=(W.f-.3)*.22,o=Math.sin(now*.5+i*1.7)*.5+.6;
   w.position.x+=W.dx*k*o;w.position.z+=W.dz*k*o;w.rotation.z=Math.sin(now*1.3+i)*W.f*.12;
   // il remonte le vent : la tête un peu tournée vers d'où il vient
   const face=Math.atan2(-W.dx,-W.dz);let d=face-w.rotation.y;d=Math.atan2(Math.sin(d),Math.cos(d));w.rotation.y+=d*Math.min(.35,W.f*.25)});
  const sol=[];try{if(typeof NB144!=='undefined')sol.push(...NB144.sci,...NB144.rat)}catch(e){}
  sol.forEach((w,i)=>{if(!w||!w.visible)return;const W=vent219(w.position.x,w.position.z);if(W.f<.8)return;const dos=Math.atan2(W.dx,W.dz);let d=dos-w.rotation.y;d=Math.atan2(Math.sin(d),Math.cos(d));w.rotation.y+=d*.3})}catch(e){}return r}}
