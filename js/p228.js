// ===== p228 : le vol des oiseaux selon leur vie (observé par l'auteur) =====
// - Aux eaux noires, les pêcheurs restent un moment, puis repartent vers les collines, une proie au bec, vers leurs nids ; ils reviennent ensuite.
// - Le papangue, l'après-midi, tourbillonne dans l'air chaud pour reprendre de la hauteur, en spirale qui monte.
// - Le paille-en-queue ne tourne pas en rond : il passe droit, en longues lignes, comme un oiseau de passage, puis fait demi-tour au large.
const VOL228={proie:null};
function proie228(){if(!VOL228.proie)VOL228.proie={g:new THREE.ConeGeometry(.006,.03,5).rotateX(Math.PI/2),m:new THREE.MeshLambertMaterial({color:0xc8d4dc})};const q=new THREE.Mesh(VOL228.proie.g,VOL228.proie.m);q.position.set(0,-.012,.035);q.name='proie228';return q}
function nid228(s){if(s.nid228)return s.nid228;let best=null,bd=1e9;try{T.forEach(t=>{if(t.alt<300||t.alt>1400)return;const d=Math.hypot(t.x-s.x,t.z-s.z);if(d<bd){bd=d;best=t}})}catch(e){}
 return s.nid228=best?{x:best.x,z:best.z,y:best.alt*VX+.5}:{x:s.x-s.ux*3,z:s.z-s.uz*3,y:1.2}}
if(typeof anime218==='function'){const a0=anime218;anime218=function(o,F,now,dt){const r=a0.apply(this,arguments);try{const s=o.s,N=nid228(s);
  o.B.forEach((b,j)=>{const w=b.w;
   // le paille-en-queue : de longues passes droites au-dessus de la tache, demi-tour au bout
   if(b.esp==='paille'&&(!b.st||b.st==='peche')){b.ph=(b.ph||j*3)+dt*.12;const L=1.3,e=.1,c=Math.sin(b.ph),d=Math.cos(b.ph),px=-s.uz,pz=s.ux;
    const x=s.x+px*L*c+s.ux*e*d,z=s.z+pz*L*c+s.uz*e*d,ox=w.position.x,oz=w.position.z;w.position.x=x;w.position.z=z;if(b.pl<=0)w.position.y=(b.h+.15)*(.3+o.f*.7);if(Math.hypot(x-ox,z-oz)>1e-5)w.rotation.y=Math.atan2(x-ox,z-oz)}
   // la pêche, puis le retour au nid avec la proie, puis le retour à la mer
   if(b.st==null){b.st='peche';b.tt=20+Math.random()*25}
   b.tt-=dt;
   if(b.st==='peche'&&b.tt<=0&&o.f>.3){b.st='retour';b.tt=9;b.x0=w.position.x;b.z0=w.position.z;b.y0=w.position.y;if(!w.getObjectByName('proie228'))w.add(proie228())}
   else if(b.st==='retour'){const u=1-Math.max(0,b.tt)/9,x=b.x0+(N.x-b.x0)*u,z=b.z0+(N.z-b.z0)*u,y=b.y0+(N.y-b.y0)*u+Math.sin(u*Math.PI)*.4;w.rotation.y=Math.atan2(N.x-b.x0,N.z-b.z0);w.position.set(x,y,z);w.rotation.z=Math.sin(now*2+j)*.1;
    if(b.tt<=0){b.st='nid';b.tt=25+Math.random()*30;w.visible=false;const p=w.getObjectByName('proie228');if(p)w.remove(p)}}
   else if(b.st==='nid'){w.visible=false;if(b.tt<=0){b.st='aller';b.tt=9}}
   else if(b.st==='aller'){const u=1-Math.max(0,b.tt)/9,tx=s.x+Math.cos(b.a)*b.r,tz=s.z+Math.sin(b.a)*b.r,x=N.x+(tx-N.x)*u,z=N.z+(tz-N.z)*u,y=N.y+(b.h-N.y)*u+Math.sin(u*Math.PI)*.4;w.position.set(x,y,z);w.rotation.y=Math.atan2(tx-N.x,tz-N.z);w.visible=o.f>.15;
    if(b.tt<=0){b.st='peche';b.tt=20+Math.random()*25}}})}catch(e){}return r}}
// le papangue et les paille-en-queue des falaises, sur la carte
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(!S||typeof VOL138==='undefined'||typeof camT==='undefined')return r;const now=performance.now()/1000,ph=typeof jourPh==='function'?jourPh():.4;
  const p=VOL138.pap;if(p&&p.visible){const am=ph>.44&&ph<.68;VOL228.th=VOL228.th||{k:0,c:null};const th=VOL228.th;
   if(am){if(!th.c){th.c={x:p.position.x,z:p.position.z,y0:p.position.y,t0:now}}const u=((now-th.c.t0)%45)/45,ang=now*.9,R=.35+u*.5,x=th.c.x+Math.cos(ang)*R,z=th.c.z+Math.sin(ang)*R;
    p.position.set(x,th.c.y0+u*1.8,z);p.rotation.y=Math.atan2(-Math.sin(ang),Math.cos(ang));p.rotation.z=.35;if(u>.97)th.c=null}else{th.c=null;p.rotation.z=0}}
  VOL138.pq.forEach((g,i)=>{if(!g.visible)return;const k=now*.09+i*1.9,L=2.6,c=Math.sin(k),d=Math.cos(k);const cx=g.userData.c228||(g.userData.c228={x:g.position.x,z:g.position.z});
   const x=cx.x+L*c,z=cx.z+.25*d+i*.3,ox=g.position.x,oz=g.position.z;g.position.x=x;g.position.z=z;if(Math.hypot(x-ox,z-oz)>1e-5)g.rotation.y=Math.atan2(x-ox,z-oz);g.rotation.z=-d*.25})}catch(e){}return r}}
