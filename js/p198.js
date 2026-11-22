// ===== p198 : au bord des champs des colons, une petite chapelle — un oratoire chaulé avec sa statue de 30 à 50 cm :
// la Vierge, la Vierge au parasol (venue d'ailleurs, posée au milieu des champs), saint Expédit en rouge, le Sacré-Cœur.
// Des fleurs, une bougie. Rien n'est écrit : on la voit en zoomant sur un lieu. =====
function orat198Mods(){if(MOD.orat_v||typeof p23Mod!=='function')return;const TR=TR23,u=.06,cy=(a,b,h,n=8)=>new THREE.CylinderGeometry(a,b,h,n),co=(r,h,n=10)=>new THREE.ConeGeometry(r,h,n),bx=(w,h,d)=>new THREE.BoxGeometry(w,h,d),sp=r=>new THREE.IcosahedronGeometry(r,1);
 const caisse=(mur,fond,toit)=>[
  [bx(.62*u,.7*u,.5*u),mur,TR(0,.35*u,0)],                       // le socle maçonné
  [bx(.66*u,.08*u,.54*u),mur,TR(0,.74*u,0)],                      // la tablette
  [bx(.58*u,.78*u,.46*u),mur,TR(0,1.17*u,0)],                     // la niche
  [bx(.42*u,.6*u,.02*u),fond,TR(0,1.15*u,.225*u)],                // le fond peint de la niche
  [cy(.36*u,.36*u,.6*u,3),toit,TR(0,1.67*u,0,Math.PI/2,0,Math.PI/2,1,1,1)], // le petit toit à deux pentes
  [bx(.03*u,.3*u,.03*u),mur,TR(0,2.0*u,.0)],[bx(.16*u,.03*u,.03*u),mur,TR(0,2.06*u,0)], // la croix
  [sp(.05*u),0xc8102e,TR(-.22*u,.84*u,.2*u)],[sp(.05*u),0xe0457b,TR(.22*u,.84*u,.2*u)],  // les fleurs
  [cy(.018*u,.018*u,.1*u,6),0xf4efe2,TR(.12*u,.83*u,.22*u)],[sp(.014*u),0xffc94a,TR(.12*u,.9*u,.22*u)]]; // la bougie
 // une statue de 40 cm posée dans la niche
 const statue=(robe,manteau,extra)=>[[co(.1*u,.32*u),robe,TR(0,1.0*u,.3*u)],[co(.08*u,.26*u),manteau,TR(0,1.03*u,.28*u)],[sp(.035*u),0xe9cfb4,TR(0,1.2*u,.3*u)],...(extra||[])];
 p23Mod('orat_v',[...caisse(0xf3f0e8,0x4a78b5,0x9a3b2a),...statue(0xf7f4ee,0x4a78b5)],24);
 p23Mod('orat_p',[...caisse(0xf3f0e8,0x7aa6c9,0x6b6f72),...statue(0xf7f4ee,0x2f5e9c,[[co(.13*u,.06*u,12),0xd9b25a,TR(0,1.32*u,.3*u)],[cy(.005*u,.005*u,.16*u,4),0x6a4a2a,TR(0,1.24*u,.3*u)]])],24);
 p23Mod('orat_e',[...caisse(0xb3261e,0x7a1712,0x7a1712),...statue(0xc8402a,0xb3261e,[[bx(.012*u,.18*u,.012*u),0xd8d2c0,TR(.07*u,1.1*u,.33*u)]])],24);
 p23Mod('orat_c',[...caisse(0xf3f0e8,0xe8d9a8,0x9a3b2a),...statue(0xf2ede3,0xb6342c,[[sp(.02*u),0xc8102e,TR(0,1.12*u,.36*u)]])],24)}
{const rl=remplirLieu;remplirLieu=function(){const r=rl.apply(this,arguments);try{const t=lieu;if(!t||t.bare||!S||(S.year||0)<1690)return r;const o=S.t[t.i]||{};
  const champ=o.c||o.clr||/plant|canne|caf|habitation|sucr|vanill/i.test(String(o.b||''));if(!champ)return r;orat198Mods();if(!MOD.orat_v)return r;
  const nb=1+(rndH(t.i*7.1)<.45?1:0),C=new THREE.Color(1,1,1);
  for(let k=0;k<nb;k++){const a=rndH(t.i*3.7+k*11)*6.283,d=2.3+rndH(t.i+k*5)*.6,x=t.x+Math.cos(a)*d,z=t.z+Math.sin(a)*d;if(alt(x,z)<2)continue;
   const h=rndH(t.i*1.3+k),m=h<.4?MOD.orat_v:h<.62?MOD.orat_p:h<.85?MOD.orat_e:MOD.orat_c;
   const vers=Math.atan2(t.x-x,t.z-z);poseM(m,x,alt(x,z)*VX+.03,z,vers,0,0,1,C);m.count=m.userData.n;m.instanceMatrix.needsUpdate=true;if(m.instanceColor)m.instanceColor.needsUpdate=true}}catch(e){}return r}}
