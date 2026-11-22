// ===== p204 : à la chasse, quand l'homme bouge, la forêt se tait : les oiseaux, les grillons, les grenouilles, l'eau même
// semble se retenir ; seul reste un vent léger. Elle reprend quelques secondes après qu'il s'est arrêté (plus vite s'il avance
// courbé). Les bêtes marronnes — cabris, cochons revenus à l'état sauvage — ne se taisent pas : elles continuent de bêler et
// de grogner au loin, et ce sont elles les plus dures à approcher. =====
const VPC204={v:1,x:null,z:null,t:0};
function vpCalme204(){return (typeof VP!=='undefined'&&VP)?VPC204.v:1}
setInterval(()=>{try{if(typeof VP==='undefined'||!VP){VPC204.x=null;VPC204.v=Math.min(1,VPC204.v+.05);return}const now=performance.now(),dt=Math.min(.5,(now-(VPC204.t||now))/1000)||.2;VPC204.t=now;
 if(VPC204.x!=null){const sp=Math.hypot(VP.x-VPC204.x,VP.z-VPC204.z)/Math.max(.05,dt);
  if(sp>.6)VPC204.v=Math.max(VP.discret?.45:.12,VPC204.v-dt*(VP.discret?.8:2.5));else VPC204.v=Math.min(1,VPC204.v+dt/(VP.discret?2.5:5))}
 VPC204.x=VP.x;VPC204.z=VP.z;
 // les marrons, eux, se font entendre
 const L=(VP.an||[]).filter(a=>a&&!a.mort);if(L.length&&typeof sTon==='function'&&Math.random()<.06){let d=99;L.forEach(a=>{const dd=Math.hypot((a.x||0)-VP.x,(a.z||0)-VP.z);if(dd<d)d=dd});
  const v=Math.max(0,Math.min(1,1-d/60))*.035;if(v>.003){if(Math.random()<.6){const f=480+Math.random()*120;sTon(f,.42,{vers:f*.9,type:'sawtooth',fl:1300,v});sTon(f*1.01,.42,{t:.03,vers:f*.88,type:'sawtooth',fl:1300,v:v*.5})}
   else if(typeof sBruit==='function')sBruit(.22,{ft:'lowpass',f:320,q:2,v:v*1.6})}}}catch(e){}},200);
