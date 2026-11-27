// ===== p357 : le moteur de fluidité. Il mesure en continu le nombre d'images par seconde et le délai entre une touche
// (ou un clic) et l'image qui en tient compte, puis il règle tout seul :
//  · la résolution de rendu de chaque vue 3D (de 60 % à 100 % de l'écran) pour tenir ~60 images/s ;
//  · le filtre aquarelle : complet, allégé (sans lavis ni tremblé) ou coupé si la machine peine vraiment ;
//  · des contextes WebGL « basse latence » (desynchronized, carte graphique performante) pour que l'image suive la main.
// Les entrées sont lues dès l'événement (et non au tour de boucle suivant). F9 : afficher les mesures. =====
const MOT357={ips:60,dt:16.7,lat:0,latN:0,echelle:1,aqua:2,vues:new Set(),voir:false,force:null};
(function(){const dpr=()=>Math.min(2,window.devicePixelRatio||1);
 // 1. des contextes basse latence pour les vues créées désormais
 try{const W1=THREE.WebGLRenderer;const W2=function(p){p=p||{};try{const cv=p.canvas||(p.canvas=document.createElement('canvas'));if(!cv.__gl357){const at={alpha:!!p.alpha,depth:p.depth!==false,stencil:p.stencil!==false,antialias:!!p.antialias,premultipliedAlpha:p.premultipliedAlpha!==false,preserveDrawingBuffer:!!p.preserveDrawingBuffer,powerPreference:'high-performance'};cv.__gl357=cv.getContext('webgl2',at)||cv.getContext('webgl',at)}}catch(e){}const r=new W1(p);suivre(r);return r};W2.prototype=W1.prototype;THREE.WebGLRenderer=W2}catch(e){}
 // 2. la résolution adaptative : chaque vue garde sa demande, le moteur la multiplie par son échelle
 function suivre(r){if(!r||r.__m357)return;r.__m357=1;MOT357.vues.add(r)}// la résolution réduite se fait dans la passe aquarelle (la scène est peinte plus petite puis agrandie), sans toucher au canevas
 try{if(typeof R!=='undefined'&&R&&R.setPixelRatio)suivre(R)}catch(e){}
 // 3. les mesures : intervalle entre deux images (moyenne glissante) et délai entrée → image
 let t0=performance.now(),evT=null,lent=0,vite=0,dern=0;
 const ent=e=>{if(evT===null)evT=e.timeStamp||performance.now()};['keydown','pointerdown','mousedown','touchstart'].forEach(k=>addEventListener(k,ent,{capture:true,passive:true}));
 const boucle=now=>{const d=Math.min(250,now-t0);t0=now;if(!document.hidden&&d>0){MOT357.dt=MOT357.dt*.92+d*.08;MOT357.ips=1000/MOT357.dt}
  if(evT!==null){const l=Math.max(0,now-evT)+MOT357.dt;MOT357.lat=MOT357.latN?MOT357.lat*.8+l*.2:l;MOT357.latN++;evT=null}
  // 4. l'ajustement, au plus une fois par demi-seconde
  if(now-dern>500&&!document.hidden){dern=now;const ips=MOT357.ips;let e=MOT357.echelle;if(MOT357.force!=null)e=MOT357.force;else{if(ips<45){lent++;vite=0}else if(ips>57){vite++;lent=0}else{lent=0;vite=0}
    if(lent>=2){e=Math.max(.6,e-.1);lent=0}if(vite>=6){e=Math.min(1,e+.05);vite=0}}
   const aq=ips<40||e<.8?1:2;if(aq!==MOT357.aqua){MOT357.aqua=aq;try{if(window.AQMAT352)AQMAT352.uniforms.lite.value=aq<2?1:0;if(typeof AQ352!=='undefined'){if(aq===0&&AQ352.on){AQ352.coupe357=1;AQ352.on=false}else if(aq>0&&AQ352.coupe357){AQ352.coupe357=0;AQ352.on=true}}}catch(x){}}
   if(Math.abs(e-MOT357.echelle)>.001){MOT357.echelle=e;MOT357.vues.forEach(r=>{try{if(!(r.domElement&&r.domElement.isConnected))MOT357.vues.delete(r)}catch(x){MOT357.vues.delete(r)}})}
   if(MOT357.voir)aff()}
  requestAnimationFrame(boucle)};requestAnimationFrame(boucle);
 // 5. l'affichage F9
 let box=null;function aff(){if(!box){box=document.createElement('div');box.id='mot357';box.style.cssText='position:fixed;left:8px;bottom:8px;z-index:99999;background:rgba(14,10,6,.82);color:#e8dcc0;font:600 11px ui-monospace,Menlo,monospace;padding:6px 9px;border-radius:7px;pointer-events:none;white-space:pre';document.body.appendChild(box)}
  box.style.display=MOT357.voir?'block':'none';box.textContent='images/s '+MOT357.ips.toFixed(0)+'   image '+MOT357.dt.toFixed(1)+' ms\ntouche → image '+(MOT357.latN?MOT357.lat.toFixed(0)+' ms':'—')+'\nrésolution '+Math.round(MOT357.echelle*100)+' %   aquarelle '+['coupée','allégée','complète'][MOT357.aqua]+'\nvues 3D suivies '+MOT357.vues.size+'   (F9 : masquer)'}
 addEventListener('keydown',e=>{if(e.key==='F9'){MOT357.voir=!MOT357.voir;aff()}});
})();
