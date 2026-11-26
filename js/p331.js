// ===== p331 : la bataille se joue sur la terre de la carte. Le plateau n'est plus un damier sombre : sol de feuilles et de
// boue en forêt, latérite et pierres sur les pentes, sable et vagues sur la côte, galets et courant pour la rivière, terre battue
// et pavés pour la ville. Le fond est peint une fois, puis réutilisé ; le quadrillage n'est plus qu'un trait léger. =====
const FB331={};
function fondBat331(x,env,ox,oy,cs,C,R){const W=cs*C,H=cs*R,cle=env+':'+cs+':'+C+'x'+R;let c=FB331[cle];
 if(!c){if(typeof motif313!=='function')return false;c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');let s=env.length*131+7;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};
  const SOL={foret:'leaves_forest_ground',riviere:'mud_forest',cote:'coast_sand_01',falaise:'red_laterite_soil_stones',ville:'burned_ground_01',plaine:'leaves_forest_ground'}[env]||'leaves_forest_ground';
  const p=motif313(g,SOL,cs,2.2);if(!p)return false;g.fillStyle=p;g.fillRect(0,0,W,H);
  // taches d'herbe et de terre pour casser la répétition
  for(let i=0;i<C*R*2;i++){const X=r()*W,Y=r()*H,Rr=cs*(.25+r()*.5),gg=g.createRadialGradient(X,Y,0,X,Y,Rr),k=['70,110,40','60,45,30','120,130,60'][i%3];gg.addColorStop(0,'rgba('+k+',.16)');gg.addColorStop(1,'rgba('+k+',0)');g.fillStyle=gg;g.beginPath();g.arc(X,Y,Rr,0,7);g.fill()}
  if(env==='riviere'){const y0=cs*2.5,y1=y0+cs;const pv=motif313(g,'ganges_river_pebbles',cs,1.6);g.fillStyle=pv||'#6a6a5a';g.beginPath();g.moveTo(-cs,y0-cs*.18);for(let X=0;X<=W+cs;X+=cs/3)g.lineTo(X,y0-cs*.18+Math.sin(X*.05)*cs*.06);for(let X=W+cs;X>=-cs;X-=cs/3)g.lineTo(X,y1+cs*.18+Math.sin(X*.04+2)*cs*.06);g.fill();
   const eau=g.createLinearGradient(0,y0,0,y1);eau.addColorStop(0,'rgba(50,110,130,.82)');eau.addColorStop(.5,'rgba(40,95,120,.9)');eau.addColorStop(1,'rgba(50,110,130,.82)');g.fillStyle=eau;g.beginPath();g.moveTo(-cs,y0);for(let X=0;X<=W+cs;X+=cs/3)g.lineTo(X,y0+Math.sin(X*.06)*cs*.05);for(let X=W+cs;X>=-cs;X-=cs/3)g.lineTo(X,y1+Math.sin(X*.05+1)*cs*.05);g.fill();
   g.strokeStyle='rgba(220,240,240,.35)';g.lineWidth=1.2;for(let i=0;i<C*5;i++){const X=r()*W,Y=y0+cs*(.15+r()*.7);g.beginPath();g.moveTo(X,Y);g.quadraticCurveTo(X+cs*.15,Y-2,X+cs*.3,Y);g.stroke()}}
  if(env==='cote'){const y1=cs*.6;const m=g.createLinearGradient(0,0,0,y1);m.addColorStop(0,'rgba(30,80,120,.95)');m.addColorStop(1,'rgba(60,130,150,.7)');g.fillStyle=m;g.beginPath();g.moveTo(0,0);g.lineTo(W,0);for(let X=W;X>=0;X-=cs/4)g.lineTo(X,y1+Math.sin(X*.07)*cs*.08);g.fill();g.strokeStyle='rgba(255,255,255,.6)';g.lineWidth=2;g.beginPath();for(let X=0;X<=W;X+=cs/4)g.lineTo(X,y1+Math.sin(X*.07)*cs*.08);g.stroke()}
  if(env==='falaise'){const pr=motif313(g,'rock_ground',cs,1.8);g.fillStyle=pr||'#5a5048';g.beginPath();g.moveTo(0,cs*2.8);for(let X=0;X<=W;X+=cs/3)g.lineTo(X,cs*3+Math.sin(X*.09)*cs*.12);g.lineTo(W,cs*3.25);g.lineTo(0,cs*3.25);g.fill();g.fillStyle='rgba(0,0,0,.3)';g.fillRect(0,cs*3.22,W,cs*.12)}
  if(env==='ville'){g.fillStyle='rgba(150,140,120,.35)';for(let i=0;i<C*R*6;i++){const X=r()*W,Y=r()*H;g.beginPath();g.ellipse(X,Y,cs*.08,cs*.05,r()*3,0,7);g.fill()}}
  if(env==='foret'){for(let i=0;i<22;i++){const X=r()*W,Y=r()*H,Rr=cs*(.3+r()*.4);const gg=g.createRadialGradient(X,Y,0,X,Y,Rr);gg.addColorStop(0,'rgba(10,30,10,.45)');gg.addColorStop(1,'rgba(10,30,10,0)');g.fillStyle=gg;g.beginPath();g.arc(X,Y,Rr,0,7);g.fill()}}
  // le bord s'assombrit
  const v=g.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.4)');g.fillStyle=v;g.fillRect(0,0,W,H);
  FB331[cle]=c}
 x.drawImage(c,ox,oy);return true}
// ----- les échecs d'invasion : le parcours se lit sur une carte de terrain, pas sur un fond bleu nuit -----
const FE332={};
function fondEch332(x,W,H){const cle=W+'x'+H;let c=FE332[cle];if(!c){if(typeof motif313!=='function')return false;c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
 const p=motif313(g,'leaves_forest_ground',90,8);if(!p)return false;g.fillStyle='#2e271c';g.fillRect(0,0,W,H);g.globalAlpha=.32;try{g.filter='blur(1.2px)'}catch(e){}g.fillStyle=p;g.fillRect(0,0,W,H);g.filter='none';g.globalAlpha=1;
 g.globalCompositeOperation='color';g.fillStyle='rgba(150,115,70,.6)';g.fillRect(0,0,W,H);g.globalCompositeOperation='source-over';
 // des courbes de niveau à la plume, comme sur les cartes des ingénieurs du roi
 let s=11;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};g.strokeStyle='rgba(210,180,120,.14)';g.lineWidth=1;
 for(let k=0;k<5;k++){const cx=r()*W,cy=r()*H;for(let n=1;n<7;n++){g.beginPath();for(let a=0;a<=6.3;a+=.15){const R=n*28*(1+.25*Math.sin(a*3+k));const X=cx+Math.cos(a)*R*1.3,Y=cy+Math.sin(a)*R;a?g.lineTo(X,Y):g.moveTo(X,Y)}g.stroke()}}
 const v=g.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.7);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(40,25,10,.55)');g.fillStyle=v;g.fillRect(0,0,W,H);FE332[cle]=c}
 x.drawImage(c,0,0);return true}
// ----- le marché de la bataille : même habit que le reste du jeu (fond sombre, liseré doré), plus de carton jaune -----
{const st=document.createElement('style');st.textContent='#btuS .bx{background:#211b14!important;color:#f1e6cc!important;border:1px solid #c8a45a!important;box-shadow:0 18px 50px rgba(0,0,0,.6)!important}#btuS .bx h3{color:#f0d48a}#btuS .cd{background:rgba(255,245,220,.06)!important;color:#f1e6cc!important;border:1px solid rgba(232,190,90,.35)!important;border-left:3px solid #e2bd74!important}#btuS .cd small{color:#cdbb98!important}#btuS .vd{border-color:rgba(232,190,90,.2)!important}#btuS .x{background:#2a221a!important;color:#f1e6cc!important;border:1px solid #c8a45a!important}#btuS .pied button{background:rgba(24,34,30,.92)!important;color:#efe9da!important;border:1px solid rgba(232,190,90,.35)!important;border-left:3px solid #e2bd74!important;border-radius:7px!important}';document.head.appendChild(st)}
// ----- le duel : la toile de fond prend le grain des vrais sols et des roches de la carte, et la même lumière que le reste -----
{const f0=fondDuel184;fondDuel184=function(x,W,H){const r=f0.apply(this,arguments);try{if(typeof motif313!=='function')return r;const p=motif313(x,'rock_ground',60,6);if(!p)return r;
 x.save();x.globalCompositeOperation='overlay';x.globalAlpha=.35;const q=motif313(x,'leaves_forest_ground',60,5);if(q){x.fillStyle=q;x.fillRect(0,H*.79,W,H*.21)}
 x.globalCompositeOperation='soft-light';x.globalAlpha=1;x.fillStyle='rgba(200,160,90,.35)';x.fillRect(0,0,W,H);x.globalCompositeOperation='source-over';
 const v=x.createRadialGradient(W/2,H*.55,Math.min(W,H)*.35,W/2,H*.55,Math.max(W,H)*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(10,8,5,.4)');x.fillStyle=v;x.fillRect(0,0,W,H);x.restore()}catch(e){}return r}}
