// ===== p419 : dans les épopées et les vies incarnées —
// 1. la carte montre de quel côté on regarde (flèche) et où est le nord, pour s'orienter ;
// 2. le panneau de l'heure et des tâches passe sous la carte au lieu de la cacher ;
// 3. la rangée « Se reposer… » se range au-dessus des talents au lieu de leur passer dessus. =====
if(typeof incCarteMaj287==='function'){const c0=incCarteMaj287;incCarteMaj287=function(){const r=c0.apply(this,arguments);try{const I=INC,m=I&&I.minimap;if(!m)return r;const g=m.g,W=g.canvas.width,H=g.canvas.height,z=I.zoom342||1,X=I.o0[0]+I.h.x/I.sc,Z=I.o0[1]+I.h.z/I.sc,px=m.ox+(X-m.ax)*m.k,py=m.oz+(Z-m.az)*m.k;
 let sx=0,sy=0,sw=W,sh=H;if(z>1){sw=W/z;sh=H/z;sx=Math.max(0,Math.min(W-sw,px-sw/2));sy=Math.max(0,Math.min(H-sh,py-sh/2))}const qx=(px-sx)*W/sw,qy=(py-sy)*H/sh,R=W/60,y=I.yaw||0,fx=-Math.sin(y),fz=-Math.cos(y),L=R*4.2;
 // le cône de regard puis la flèche
 g.fillStyle='rgba(255,230,150,.28)';g.beginPath();g.moveTo(qx,qy);const o=.45;g.lineTo(qx+(fx*Math.cos(o)-fz*Math.sin(o))*L*1.8,qy+(fz*Math.cos(o)+fx*Math.sin(o))*L*1.8);g.lineTo(qx+(fx*Math.cos(-o)-fz*Math.sin(-o))*L*1.8,qy+(fz*Math.cos(-o)+fx*Math.sin(-o))*L*1.8);g.closePath();g.fill();
 g.strokeStyle='#fff';g.lineWidth=R*.7;g.beginPath();g.moveTo(qx,qy);g.lineTo(qx+fx*L,qy+fz*L);g.stroke();g.fillStyle='#fff';g.beginPath();g.moveTo(qx+fx*(L+R*1.8),qy+fz*(L+R*1.8));g.lineTo(qx+fx*L-fz*R*1.1,qy+fz*L+fx*R*1.1);g.lineTo(qx+fx*L+fz*R*1.1,qy+fz*L-fx*R*1.1);g.closePath();g.fill();
 // le nord
 const nx=W-R*5,ny=R*6;g.fillStyle='rgba(20,16,10,.75)';g.beginPath();g.arc(nx,ny,R*3.6,0,7);g.fill();g.fillStyle='#ffd070';g.beginPath();g.moveTo(nx,ny-R*2.8);g.lineTo(nx-R*1.2,ny+R*.4);g.lineTo(nx+R*1.2,ny+R*.4);g.closePath();g.fill();g.fillStyle='#fff';g.font='bold '+Math.round(R*2.2)+'px sans-serif';g.textAlign='center';g.fillText('N',nx,ny+R*2.6);g.textAlign='left'}catch(e){}return r}}
setInterval(()=>{try{if(typeof INC==='undefined'||!INC||!INC.el)return;const el=INC.el,E=el.getBoundingClientRect();
 const v=document.getElementById('incB300'),a=document.getElementById('incA380');if(v&&a){const h=v.getBoundingClientRect(),b=Math.round(E.bottom-h.top+6);if(a.style.bottom!==b+'px')a.style.bottom=b+'px'}
 const c=document.getElementById('incM'),bd=document.getElementById('band405');if(c&&bd){const R=c.getBoundingClientRect();if(R.height){const t=Math.round(R.bottom-E.top+40);if(bd.style.top!==t+'px')bd.style.top=t+'px'}}}catch(e){}},300);
try{Object.assign(window.TR363=window.TR363||{},{})}catch(e){}
