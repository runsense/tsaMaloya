
// ===== p151 : petits jeux en 3D (vue personnage : chasse, garde du camp, combats) — plus de glissade, des oiseaux =====
// 1) Le pas suit la vitesse : chaque personnage animé (joueur, compagnons, ennemis) règle la vitesse de son animation de marche ou de course sur sa vitesse réelle, rapportée à sa taille.
const VPO151=new Set();
{const c0=vpClip;vpClip=function(o,c){try{if(o&&o.root)VPO151.add(o)}catch(e){}return c0.apply(this,arguments)}}
if(typeof vpClipE==='function'){const c0=vpClipE;vpClipE=function(o,c){try{if(o&&o.root)VPO151.add(o)}catch(e){}return c0.apply(this,arguments)}}
(function pas151(){requestAnimationFrame(pas151);try{if(typeof VP==='undefined'||!VP){VPO151.clear();return}const now=performance.now();
  VPO151.forEach(o=>{if(!o.root||!o.root.parent){VPO151.delete(o);return}const p=o.root.position;if(o.h151==null||o.h151<.8){const b=new THREE.Box3().setFromObject(o.root);const hh=b.max.y-b.min.y;o.h151=isFinite(hh)&&hh>.8?hh:1.7}
   if(o.p151){const dt=(now-o.p151.t)/1000;if(dt>.03){const v=Math.hypot(p.x-o.p151.x,p.z-o.p151.z)/dt;if(v<25)o.v151=o.v151==null?v:o.v151*.75+v*.25;o.p151={x:p.x,z:p.z,t:now}}}else o.p151={x:p.x,z:p.z,t:now};
   if(!o.mx||o.v151==null)return;const run=o.clip==='course',walk=o.clip==='marche';if(!run&&!walk)return;const nat=o.h151*(run?2.1:.85);const ts=o.v151<.05?.3:Math.max(.5,Math.min(2.2,o.v151/nat));(o.mx._actions||[]).forEach(a=>{if(a.isRunning&&a.isRunning())a.timeScale=ts})})}catch(e){}})();
// 2) Des oiseaux dans le ciel de la vue personnage : une petite bande qui tourne au-dessus des arbres et se pose, un papangue qui plane haut
const VPB151={sc:null,L:[],pap:null};
(function ois151(){requestAnimationFrame(ois151);try{const V=typeof VP!=='undefined'&&VP;if(!V||!V.sc||!V.cam){VPB151.sc=null;return}
  if(VPB151.sc!==V.sc){VPB151.sc=V.sc;VPB151.L=[];VPB151.pap=null;const nb=8;for(let i=0;i<nb;i++){const o=new THREE.Group();V.sc.add(o);VPB151.L.push({o,ph:Math.random()*6,r:6+Math.random()*4,h:9+Math.random()*3});
    if(typeof inst144==='function')inst144('sk_colibri',{h:.28,long:true,tint:0x6a7a50,vit:.8}).then(r=>o.add(r.w)).catch(()=>{})}
   const pp=new THREE.Group();V.sc.add(pp);VPB151.pap=pp;if(typeof inst144==='function')inst144('oi_papangue',{h:1.6,long:true,rz:Math.PI/2,yaw:-Math.PI/2}).then(r=>pp.add(r.w)).catch(()=>{})}
  const t=performance.now()/1000,c=V.cam.position,pl=typeof pluieF106==='function'?pluieF106():0;
  VPB151.L.forEach((b,i)=>{const k=t*.35+b.ph,x=c.x+Math.cos(k)*b.r+Math.sin(t*.7+i)*.6,z=c.z-12+Math.sin(k*1.2)*b.r,y=(typeof V.h==='function'?V.h(x,z):0)+b.h+Math.sin(t*1.3+i)*.4;const px=b.o.position.x,pz=b.o.position.z;b.o.position.set(x,y,z);b.o.rotation.y=Math.atan2(x-px,z-pz);b.o.visible=pl<.5});
  if(VPB151.pap){const k=t*.16,x=c.x+Math.cos(k)*18,z=c.z-20+Math.sin(k)*14;const px=VPB151.pap.position.x,pz=VPB151.pap.position.z;VPB151.pap.position.set(x,(typeof V.h==='function'?V.h(x,z):0)+22,z);VPB151.pap.rotation.y=Math.atan2(x-px,z-pz);VPB151.pap.rotation.z=.3+.12*Math.sin(t*.7)}
  // les mixeurs des modèles ajoutés tournent aussi ici
  if(typeof M144!=='undefined'){const dt=1/60;M144.mx.forEach(e=>{let o=e.w;while(o&&o.parent)o=o.parent;if(o===V.sc)e.mx.update(dt)})}}catch(e){}})();
