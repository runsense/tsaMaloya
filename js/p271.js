// ===== p271 : les cimetières se voient là où ils étaient. Pas de fiche : on les découvre en zoomant sur un lieu.
// - Sur les habitations (champs des colons, à partir de 1690) : au bout d'une parcelle qu'on ne cultive pas, loin des cases,
//   au bord de la forêt, quelques tertres de terre, un piquet de bois, une croix parfois, aucun nom. Ils disparaissent
//   avec le morcellement des terres au XXᵉ siècle.
// - Dans les camps marrons : un peu à l'écart du camp, vers la forêt, des tertres entourés de pierres, un poteau, une offrande.
// Les cimetières d'habitation sont attestés (Archéologie dans l'océan Indien, « Les cimetières ») ; leur forme exacte et celle
// des tombes marronnes sont reconstituées par le jeu. =====
function tombe271Mods(){if(MOD.tombe_h||typeof p23Mod!=='function')return;const TR=TR23,u=.12,cy=(a,b,h,n=8)=>new THREE.CylinderGeometry(a,b,h,n),bx=(w,h,d)=>new THREE.BoxGeometry(w,h,d),sp=r=>new THREE.IcosahedronGeometry(r,1);
 const TER=0x6b5236,TER2=0x5a4430,BOIS=0x6e4c2c,PIER=0x8a8780,BLC=0xd9d2c0;
 const tertre=(c)=>[[sp(.32*u),c,TR(0,0,0,0,0,0,1.5,.32,.8)]];
 // tombe d'habitation : tertre + piquet, ou tertre + petite croix de bois
 p23Mod('tombe_h',[...tertre(TER),[bx(.04*u,.42*u,.04*u),BOIS,TR(-.42*u,.2*u,0)]],400);
 p23Mod('tombe_hc',[...tertre(TER2),[bx(.04*u,.5*u,.04*u),BOIS,TR(-.44*u,.25*u,0)],[bx(.24*u,.04*u,.04*u),BOIS,TR(-.44*u,.38*u,0)]],400);
 // tombe marronne : tertre cerclé de pierres, un poteau, un coquillage ou une calebasse posé dessus
 const cercle=[];for(let k=0;k<9;k++){const a=k/9*6.283;cercle.push([sp(.06*u),PIER,TR(Math.cos(a)*.5*u,.02*u,Math.sin(a)*.3*u)])}
 p23Mod('tombe_m',[...tertre(TER2),...cercle,[cy(.035*u,.045*u,.6*u,6),BOIS,TR(-.56*u,.3*u,0)],[sp(.06*u),BLC,TR(.08*u,.11*u,0,0,0,0,1,.6,1)]],200)}
const ARB271=(t,R,d0)=>{let best=0,bv=-1;for(let k=0;k<16;k++){const a=k/16*6.283,x=t.x+Math.cos(a)*R,z=t.z+Math.sin(a)*R;if(alt(x,z)<6)continue;const v=bruit(x,z)+bruit(x*1.7,z*1.7)*.3+rndH(t.i*3+k)*.15;if(v>bv){bv=v;best=a}}return best};
{const rl=remplirLieu;remplirLieu=function(){const r=rl.apply(this,arguments);try{const t=lieu;if(!t||t.bare||!S)return r;const y=S.year||0;const o=S.t[t.i]||{};
 const champ=(o.c||o.clr||/plant|canne|caf|habitation|sucr|vanill/i.test(String(o.b||'')))&&y>=1690&&y<1960;
 const marron=!S.voieC&&o.b==='camp';
 if(!champ&&!marron)return r;tombe271Mods();if(!MOD.tombe_h)return r;if(MOD.tombe_h.userData.n||MOD.tombe_hc.userData.n||MOD.tombe_m.userData.n)return r;const C=new THREE.Color(1,1,1);
 const pose=(m,x,z,ry)=>{if(alt(x,z)<3)return;poseM(m,x,alt(x,z)*VX+.025,z,ry,0,0,1,C)};
 const fin=()=>['tombe_h','tombe_hc','tombe_m'].forEach(k=>{const m=MOD[k];if(!m)return;m.count=m.userData.n;m.instanceMatrix.needsUpdate=true;if(m.instanceColor)m.instanceColor.needsUpdate=true});
 if(champ){// au bout des champs, au bord de la forêt
  const a=ARB271(t,2.85),cx=t.x+Math.cos(a)*2.85,cz=t.z+Math.sin(a)*2.85;const n=5+Math.floor(rndH(t.i*1.9)*7)+Math.min(8,Math.floor((y-1690)/30));
  for(let k=0;k<n;k++){const row=Math.floor(k/4),col=k%4;const px=(col-1.5)*.17+(rndH(t.i+k*3)-.5)*.05,pz=row*.21+(rndH(t.i+k*7)-.5)*.05;
   const ca=Math.cos(a+Math.PI/2),sa=Math.sin(a+Math.PI/2);const x=cx+ca*px+Math.cos(a)*pz,z=cz+sa*px+Math.sin(a)*pz;pose(rndH(t.i*5+k)<.3?MOD.tombe_hc:MOD.tombe_h,x,z,a+(rndH(k+t.i)-.5)*.3)}}
 if(marron){// un peu à l'écart du camp, vers la forêt
  const a=ARB271(t,1.75),cx=t.x+Math.cos(a)*1.75,cz=t.z+Math.sin(a)*1.75;const n=2+Math.floor(rndH(t.i*2.3)*3)+Math.min(5,Math.floor(Math.max(0,y-1670)/25));
  for(let k=0;k<n;k++){const an=k*2.4,rr=.12+k*.07;pose(MOD.tombe_m,cx+Math.cos(an)*rr,cz+Math.sin(an)*rr,an)}}
 fin()}catch(e){}return r}}
