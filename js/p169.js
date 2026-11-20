
// ===== p169 : la chasse suit ce qu'on voit — si des cochons marrons ou des cabris errent sur la case (ou à côté), on ne dit plus « pas de troupeau » =====
function gibVu169(t){try{if(!S||!t||t.bare)return 0;const o=S.t[t.i]||{};if(o.c)return 0;const pr=((S.gibP||{})[t.i]||0),ab=typeof fAb==='function'?fAb(t):1;let n=0;
 if(t.forest&&t.alt>150&&t.alt<1600&&rndH(t.i*7.3+1)<.2*ab)n++;
 if(o.b!=='camp'&&(t.forest||t.alt>100&&t.alt<900)&&rndH(t.i*11.7+1)<=.6*Math.max(ab,S.year<1720?.8:.3)*(1-pr))n++;
 if(!t.forest&&t.alt<1500&&t.alt>=15&&rndH(t.i*5.1+1)<.22-pr*.15)n++;return n}catch(e){return 0}}
{const tf=trpF;trpF=function(t){const f=tf.apply(this,arguments);try{if(!t)return f;const k=(S.ns||0)+':'+t.i;G169.c=G169.c||{};if(G169.k!==S.ns){G169.k=S.ns;G169.c={}}
  let v=G169.c[t.i];if(v==null){const ici=gibVu169(t),pres=(t.nb||[]).reduce((s,i)=>s+gibVu169(T[i]),0);v=G169.c[t.i]=ici?.5+.12*ici:pres?.42:0}return Math.max(f,v)}catch(e){return f}}}
const G169={};
// ===== les nuées : le modèle 3D (posé, ailes repliées) ne sert que quand l'oiseau est posé ; en vol, la silhouette aux ailes qui battent =====
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(typeof OIS135==='undefined')return r;OIS135.F.forEach(F=>{const A=F.arbre;F.L.forEach(o=>{const p=o.position,posee=!!A&&Math.hypot(A.x-p.x,A.z-p.z)<.25;
  let mod=null;o.children.forEach(c=>{if(!c.isMesh)mod=c});if(!mod)return;mod.visible=posee;o.children.forEach(c=>{if(c.isMesh)c.visible=!posee})})})}catch(e){}return r}}
