// ===== p226 : les oiseaux remis d'aplomb =====
// Le paille-en-queue (modèle à deux brins de queue) est sculpté dans une pose rare : arrêté en vol, le corps debout. En vol ordinaire
// il volait donc la tête en l'air. On le couche à l'horizontale ; il ne reprend sa pose debout que lorsqu'il s'arrête en vol, et pique tête en bas vers la mer.
// Le zoizo la Vierge : à peine plus grand, juste au-dessus des cimes ; il saute de branche en branche au lieu de tourner en rond.
{const i0=inst144;inst144=function(n,o){const r=i0.apply(this,arguments);if(n!=='oi_phaeton')return r;return r.then(x=>{try{const w=x.w,p=w.children[0],q=new THREE.Group();w.remove(p);q.add(p);w.add(q);q.rotation.x=Math.PI/2;q.name='q226'}catch(e){}return x})}}
// sur la carte (les paille-en-queue des falaises) : de temps en temps, il s'arrête en vol, ailes ouvertes, ou pique
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(!S||typeof scene==='undefined')return r;const now=performance.now()/1000;
  const L=[];try{if(typeof VOL138!=='undefined')VOL138.pq.forEach(g=>g.traverse(o=>{if(o.name==='q226')L.push(o)}))}catch(e){}
  try{if(typeof EAUX218!=='undefined')for(const k in EAUX218.L)EAUX218.L[k].B.forEach(b=>{const q=b.w.getObjectByName('q226');if(q){q.userData.plonge=b.pl>0?Math.min(1,(1.4-b.pl)/.5):0;L.push(q)}})}catch(e){}
  L.forEach(q=>{if(q.userData.t226==null)q.userData.t226=Math.random()*20;const c=(now+q.userData.t226)%14,arret=c>11&&c<13.2?Math.sin((c-11)/2.2*Math.PI):0,pl=q.userData.plonge||0;
   let cible=Math.PI/2;if(pl>0)cible=Math.PI/2+pl*(Math.PI/2);else if(arret>0)cible=Math.PI/2-arret*(Math.PI/2);q.rotation.x+=(cible-q.rotation.x)*.12});
  // zoizo la Vierge : à sa taille, juste au-dessus des cimes ; il se pose, regarde un peu autour, puis saute vers une autre branche (vol court en arc, tête dans le sens du vol)
  if(typeof NB144!=='undefined')NB144.zoi.forEach((w,i)=>{if(!w||!w.visible)return;const u=w.userData;if(!u.z226){u.z226=1;w.scale.multiplyScalar(1.1)}
   const bx=w.position.x,bz=w.position.z;// la place que lui donne le jeu (recalculée à chaque image) : on part de là
   if(!u.p||Math.hypot(u.p.bx-bx,u.p.bz-bz)>.4){u.p={bx,bz,x:0,z:0,ox:0,oz:0,t0:now,dur:0,pause:1+Math.random()*2,h:w.rotation.y}}
   const P=u.p;let k=P.dur?Math.min(1,(now-P.t0)/P.dur):1;
   if(k>=1&&now-P.t0>P.dur+P.pause){P.ox=P.x;P.oz=P.z;const a=Math.random()*6.283,r=.04+Math.random()*.1;P.x=Math.max(-.2,Math.min(.2,P.ox+Math.cos(a)*r));P.z=Math.max(-.2,Math.min(.2,P.oz+Math.sin(a)*r));P.dur=.5+Math.hypot(P.x-P.ox,P.z-P.oz)*4;P.t0=now;P.pause=1.2+Math.random()*2.8;P.h=Math.atan2(P.x-P.ox,P.z-P.oz);k=0}
   const e=k*k*(3-2*k),x=P.ox+(P.x-P.ox)*e,z=P.oz+(P.z-P.oz)*e,saut=Math.sin(Math.PI*k)*.035;
   const gx=bx+x,gz=bz+z;w.position.set(gx,Math.max(0,alt(gx,gz))*VX+.11+saut,gz);
   // en vol : tourné vers où il va ; posé : de petits coups de tête
   w.rotation.y=k<1?P.h:P.h+.35*Math.sin(now*2.2+i)*(Math.sin(now*.7+i*3)>.3?1:0)})}catch(e){}return r}}
// les deux brins de queue : écartés, c'est rare ; le plus souvent ils sont collés l'un à l'autre, et bien droits.
// On resserre les sommets de la queue (le haut du modèle tel qu'il est sculpté) vers l'axe, et on les redresse ; 8 oiseaux sur 10 portent cette queue collée.
const QUEUE226=new Map();
function queueColle226(geo){let g=QUEUE226.get(geo.uuid);if(g)return g;g=geo.clone();const P=g.attributes.position;g.computeBoundingBox();const bb=g.boundingBox,H=bb.max.y-bb.min.y;
 // relevé sur le fichier : le corps suit Y (le bec en haut), les ailes s'ouvrent sur Z ; les deux brins de queue partent du bas (Y < 1/3) en V sur Z et se courbent sur X
 const y0=bb.min.y+.34*H;let sz=0,sx=0,n=0;for(let i=0;i<P.count;i++){const y=P.getY(i);if(y>y0&&y<y0+H*.1){sz+=P.getZ(i);sx+=P.getX(i);n++}}const cz=n?sz/n:0,cx=n?sx/n:0;
 for(let i=0;i<P.count;i++){const y=P.getY(i);if(y>=y0)continue;const dz=P.getZ(i)-cz,dy=y0-y,L=Math.hypot(dy,dz),k=Math.min(1,dy/(H*.08));
  // on replie chaque brin dans l'axe du corps en gardant sa longueur : les deux brins se rejoignent et filent droit derrière
  P.setY(i,y+((y0-L)-y)*k);P.setZ(i,cz+dz*(1-.93*k)+Math.sign(dz)*.006*k);P.setX(i,P.getX(i)+(cx-P.getX(i))*.55*k)}
 P.needsUpdate=true;g.computeVertexNormals();QUEUE226.set(geo.uuid,g);return g}
{const i1=inst144;inst144=function(n,o){const r=i1.apply(this,arguments);if(n!=='oi_phaeton')return r;return r.then(x=>{try{if(Math.random()<.8)x.w.traverse(m=>{if(m.isMesh&&m.geometry&&m.geometry.attributes.position)m.geometry=queueColle226(m.geometry)})}catch(e){}return x})}}
