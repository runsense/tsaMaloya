// ===== p313 : le décor des commandos à la hauteur des personnages — plus de quadrillage : murs de pierres sèches irrégulières,
// moussues, qui se fondent d'une case à l'autre ; le bord du terrain devient forêt épaisse (ou rempart de rochers) au lieu de briques ;
// les mares ont des berges de boue, des joncs et des nénuphars qui cassent les bords droits ; feuilles mortes et cailloux au sol. =====
{const f0=fondCmd289;fondCmd289=function(MP,RW,RH,cs,k){const c=f0.apply(this,arguments);if(!c||c.p313)return c;c.p313=1;try{peint313(c,MP,RW,RH,cs,k)}catch(e){console.warn(e)}return c}}
// les vrais sols de la carte (Poly Haven, CC0), chargés une fois : le commando marche sur la même terre que la carte
const IMG313={};try{if(typeof TEX125!=='undefined')Object.keys(TEX125).forEach(k=>{const i=new Image();i.src=TEX125[k];IMG313[k]=i})}catch(e){}
const SOLK313={morne:['leaves_forest_ground','mud_forest'],negrier:['coast_sand_01'],poudre:['red_laterite_soil_stones','mud_forest'],sanct:['shell_floor_01']};
function motif313(x,k,cs,tuiles){const im=IMG313[k];if(!im||!im.complete||!im.naturalWidth)return null;const p=x.createPattern(im,'repeat');if(p&&p.setTransform&&typeof DOMMatrix!=='undefined'){const sc=cs*(tuiles||3)/im.naturalWidth;p.setTransform(new DOMMatrix().scale(sc))}return p}
function sol313(x,W,H,k,cs){const L=SOLK313[k]||SOLK313.morne,p=motif313(x,L[0],cs,5.5);if(!p)return false;x.fillStyle=p;x.fillRect(0,0,W,H);
 // on teinte la vraie terre de la couleur du lieu (multiplication) : elle garde son grain mais prend la valeur sombre du jeu
 const TEINTE={morne:'#7a6648',negrier:'#d8c49a',poudre:'#b07850',sanct:'#a89a86'}[k]||'#7a6648';x.save();x.globalCompositeOperation='multiply';x.fillStyle=TEINTE;x.fillRect(0,0,W,H);x.restore();
 // une seconde terre en grandes plaques douces (boue sous les arbres, cailloux), pour casser la répétition
 const q=L[1]&&motif313(x,L[1],cs,6);if(q){let s=k.length*977;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};for(let i=0;i<W*H/(cs*cs*14);i++){const X=r()*W,Y=r()*H,R=cs*(1.5+r()*3);x.save();x.beginPath();x.ellipse(X,Y,R,R*(.5+r()*.5),r()*3,0,7);x.clip();x.globalAlpha=.45;x.fillStyle=q;x.fillRect(X-R,Y-R,R*2,R*2);x.globalCompositeOperation='multiply';x.globalAlpha=.6;x.fillStyle='#6a5a40';x.fillRect(X-R,Y-R,R*2,R*2);x.restore()}}
 // la lumière de la carte : un peu plus chaude au centre, plus sombre vers la forêt
 const g=x.createRadialGradient(W/2,H/2,Math.min(W,H)*.2,W/2,H/2,Math.max(W,H)*.7);g.addColorStop(0,'rgba(255,230,180,.06)');g.addColorStop(1,'rgba(0,0,0,.28)');x.fillStyle=g;x.fillRect(0,0,W,H);return true}
function peint313(c,MP,RW,RH,cs,k){const x=c.getContext('2d'),T=(i,j)=>(MP[j]&&MP[j][i])||'#';let s=91+k.length*13;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};
 const pont=k==='negrier';const mer=pont||k==='chantier'||k==='moka';// v379 : le port de Port-Louis et la rade de Moka sont la mer, pas une mare à nénupharsconst W=RW*cs,H=RH*cs;
 // feuilles mortes, cailloux, brindilles sur le sol
 if(!pont){for(let i=0;i<RW*RH*1.2;i++){const X=r()*W,Y=r()*H,ti=T(Math.floor(X/cs),Math.floor(Y/cs));if(ti!=='.'&&ti!==' '&&ti!=='X')continue;const q=r();
  if(q<.45){x.fillStyle=['#8a6a3a','#a07a40','#6a5a30','#7a8a40'][Math.floor(r()*4)];x.globalAlpha=.55;x.save();x.translate(X,Y);x.rotate(r()*6.28);x.beginPath();x.ellipse(0,0,cs*.07,cs*.035,0,0,7);x.fill();x.restore()}
  else if(q<.8){x.fillStyle='rgb('+(110+r()*40|0)+','+(104+r()*30|0)+','+(92+r()*30|0)+')';x.globalAlpha=.8;x.beginPath();x.ellipse(X,Y,cs*(.02+r()*.04),cs*(.015+r()*.03),r()*3,0,7);x.fill();x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.ellipse(X+1.5,Y+1.5,cs*.03,cs*.02,0,0,7);x.fill()}
  else{x.strokeStyle='rgba(70,50,30,.6)';x.lineWidth=1;x.globalAlpha=1;const a=r()*6.28,L=cs*(.1+r()*.15);x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(a)*L,Y+Math.sin(a)*L);x.stroke()}}x.globalAlpha=1}
 // un caillou irrégulier
 const pierre=(X,Y,R,v,mousse)=>{const n=7,P=[];for(let a=0;a<n;a++){const an=a/n*6.283+r()*.4,rr=R*(.75+r()*.35);P.push([X+Math.cos(an)*rr,Y+Math.sin(an)*rr*.85])}
  x.fillStyle='rgba(0,0,0,.35)';x.beginPath();P.forEach(([a,b],i)=>i?x.lineTo(a+2,b+3):x.moveTo(a+2,b+3));x.closePath();x.fill();
  const roc=motif313(x,'rock_ground',cs,2.2);x.beginPath();P.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.closePath();x.fillStyle=roc||'rgb('+v+','+(v-6)+','+(v-14)+')';x.fill();
  const g=x.createLinearGradient(X-R,Y-R,X+R,Y+R);g.addColorStop(0,'rgba(255,245,225,.28)');g.addColorStop(.5,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.4)');x.fillStyle=g;x.fill();
  x.strokeStyle='rgba(20,18,14,.45)';x.lineWidth=1;x.stroke();if(mousse){x.fillStyle='rgba(80,120,50,.55)';x.beginPath();x.ellipse(X-R*.2,Y-R*.45,R*.5,R*.22,-.3,0,7);x.fill()}};
 for(let j=0;j<RH;j++)for(let i=0;i<RW;i++){if(T(i,j)!=='#')continue;const X=i*cs,Y=j*cs,bord=i===0||j===0||i===RW-1||j===RH-1;
  if(pont&&!bord)continue;
  if(bord){// la forêt qui ferme le terrain : un sous-bois sombre et des couronnes qui débordent
   x.fillStyle=k==='negrier'?'#1d3a4a':'#16241a';x.fillRect(X-1,Y-1,cs+2,cs+2);
   if(k==='negrier'){x.strokeStyle='rgba(160,210,230,.18)';for(let n=0;n<3;n++){const yy=Y+cs*(.2+.3*n);x.beginPath();x.moveTo(X,yy);x.quadraticCurveTo(X+cs/2,yy-3,X+cs,yy);x.stroke()}continue}
   // des couronnes faites de feuilles, comme les buissons, plus grandes et plus sombres
   for(let n=0;n<2;n++){const px=X+r()*cs,py=Y+r()*cs,R=cs*(.45+r()*.3);x.fillStyle='#14261a';x.beginPath();x.arc(px,py,R,0,7);x.fill();
    for(let f=0;f<26;f++){const a=r()*6.283,d=Math.sqrt(r())*R,L=cs*(.1+r()*.08),q=1-d/R;x.save();x.translate(px+Math.cos(a)*d,py+Math.sin(a)*d);x.rotate(a+r());x.fillStyle=['#1f3a20','#2c5028','#3d6a30','#4e7e3a'][Math.min(3,Math.floor(r()*2+q*2))];x.beginPath();x.ellipse(0,0,L,L*.45,0,0,7);x.fill();x.restore()}}continue}
  // mur de pierres sèches : un lit de terre sombre, puis des pierres de tailles mêlées qui débordent sur les cases voisines du même mur
  const v=T(i-1,j)==='#',e=T(i+1,j)==='#',nn=T(i,j-1)==='#',ss=T(i,j+1)==='#';x.save();try{x.filter='blur(2px)'}catch(_){}x.fillStyle='rgba(40,34,26,.85)';x.beginPath();x.ellipse(X+cs/2+(e-v)*cs*.15,Y+cs/2+(ss-nn)*cs*.15,cs*(.48+(v||e?.12:0)),cs*(.48+(nn||ss?.12:0)),0,0,7);x.fill();x.restore();
  const nb=5+Math.floor(r()*3);for(let n=0;n<nb;n++){const px=X+cs*(.15+r()*.7),py=Y+cs*(.15+r()*.7),R=cs*(.16+r()*.14);pierre(px,py,R,78+Math.floor(r()*40),r()<.35)}}
 // les mares : berges de boue et d'herbe qui cassent les bords droits, joncs, nénuphars
 for(let j=0;j<RH;j++)for(let i=0;i<RW;i++){if(T(i,j)!=='~')continue;const X=i*cs,Y=j*cs;
  [[0,-1],[0,1],[-1,0],[1,0]].forEach(([a,b])=>{if(T(i+a,j+b)==='~')return;for(let n=0;n<4;n++){const u=(n+r())/4,ex=b?X+u*cs:X+(a>0?cs:0),ey=a?Y+u*cs:Y+(b>0?cs:0);
    x.fillStyle='rgba(74,62,40,.85)';x.beginPath();x.ellipse(ex,ey,cs*(.1+r()*.12),cs*(.07+r()*.08),r()*3,0,7);x.fill();
    if(r()<.6&&!mer){x.strokeStyle='rgba(110,140,60,.85)';x.lineWidth=1.2;for(let q=0;q<4;q++){x.beginPath();x.moveTo(ex+(r()-.5)*6,ey);x.lineTo(ex+(r()-.5)*10,ey-cs*(.12+r()*.15));x.stroke()}}}});
  if(!mer&&r()<.35){const px=X+cs*(.25+r()*.5),py=Y+cs*(.25+r()*.5),R=cs*.12;x.fillStyle='#3f7a3a';x.beginPath();x.arc(px,py,R,.4,6.0);x.lineTo(px,py);x.fill();if(r()<.5){x.fillStyle='#e8d8e8';x.beginPath();x.arc(px+R*.2,py-R*.1,2.2,0,7);x.fill()}}}
 // les mares : un seul plan d'eau aux coins arrondis par bassin, avec la vraie terre autour, des reflets et une eau qui s'assombrit au centre
 const vu={};for(let j=0;j<RH;j++)for(let i=0;i<RW;i++){if(T(i,j)!=='~'||vu[i+','+j])continue;let a0=i,a1=i,b0=j,b1=j;const pile=[[i,j]];vu[i+','+j]=1;while(pile.length){const [p,q]=pile.pop();a0=Math.min(a0,p);a1=Math.max(a1,p);b0=Math.min(b0,q);b1=Math.max(b1,q);[[1,0],[-1,0],[0,1],[0,-1]].forEach(([u,v])=>{const K=(p+u)+','+(q+v);if(!vu[K]&&T(p+u,q+v)==='~'){vu[K]=1;pile.push([p+u,q+v])}})}
  const X=a0*cs,Y=b0*cs,w=(a1-a0+1)*cs,h=(b1-b0+1)*cs,rr=Math.min(w,h)*.42,sol=motif313(x,(SOLK313[k]||SOLK313.morne)[0],cs,5.5);if(mer||!sol)continue;
  x.save();x.beginPath();x.rect(X-2,Y-2,w+4,h+4);x.roundRect(X+2,Y+2,w-4,h-4,rr);x.clip('evenodd');x.fillStyle=sol;x.fillRect(X-2,Y-2,w+4,h+4);x.globalCompositeOperation='multiply';x.fillStyle='#7a6648';x.fillRect(X-2,Y-2,w+4,h+4);x.restore();
  x.save();x.beginPath();x.roundRect(X+2,Y+2,w-4,h-4,rr);x.clip();const g=x.createRadialGradient(X+w/2,Y+h/2,Math.min(w,h)*.1,X+w/2,Y+h/2,Math.max(w,h)*.6);g.addColorStop(0,'#173a4a');g.addColorStop(1,'#2f6272');x.fillStyle=g;x.fillRect(X,Y,w,h);
   x.strokeStyle='rgba(200,230,240,.18)';x.lineWidth=1;for(let n=0;n<Math.round(w*h/(cs*cs)*2);n++){const px=X+r()*w,py=Y+r()*h,L=cs*(.2+r()*.4);x.beginPath();x.moveTo(px,py);x.quadraticCurveTo(px+L/2,py-2,px+L,py);x.stroke()}
   x.fillStyle='rgba(230,240,240,.08)';x.beginPath();x.ellipse(X+w*.3,Y+h*.3,w*.25,h*.12,-.3,0,7);x.fill();x.restore();
  x.save();try{x.filter='blur(1.5px)'}catch(e){}x.strokeStyle='rgba(70,56,34,.9)';x.lineWidth=4;x.beginPath();x.roundRect(X+2,Y+2,w-4,h-4,rr);x.stroke();x.restore();
  for(let n=0;n<Math.round((w+h)/cs*2);n++){const a=r()*6.283,ex=X+w/2+Math.cos(a)*(w/2-3),ey=Y+h/2+Math.sin(a)*(h/2-3);x.strokeStyle='rgba(110,140,60,.85)';x.lineWidth=1.2;for(let q=0;q<4;q++){x.beginPath();x.moveTo(ex+(r()-.5)*6,ey);x.lineTo(ex+(r()-.5)*10,ey-cs*(.12+r()*.15));x.stroke()}}
  for(let n=0;n<Math.round(w*h/(cs*cs)*.6);n++){const px=X+w*(.2+r()*.6),py=Y+h*(.2+r()*.6),R=cs*.11;x.fillStyle='#3f7a3a';x.beginPath();x.arc(px,py,R,.4,6.0);x.lineTo(px,py);x.fill();if(r()<.4){x.fillStyle='#ead8ea';x.beginPath();x.arc(px+R*.2,py-R*.1,2,0,7);x.fill()}}}
 // les buissons : des dizaines de feuilles, trois verts, un cœur sombre — plus de boules
 if(!pont)for(let j=0;j<RH;j++)for(let i=0;i<RW;i++){if(T(i,j)!=='b')continue;const X=i*cs+cs/2,Y=j*cs+cs/2;x.fillStyle='rgba(0,0,0,.32)';x.beginPath();x.ellipse(X+cs*.14,Y+cs*.18,cs*.56,cs*.46,0,0,7);x.fill();
  x.fillStyle='#1a301a';x.beginPath();x.ellipse(X,Y,cs*.5,cs*.44,0,0,7);x.fill();
  for(let n=0;n<46;n++){const a=r()*6.283,d=Math.sqrt(r())*cs*.46,px=X+Math.cos(a)*d,py=Y+Math.sin(a)*d*.9,L=cs*(.09+r()*.07),c=['#2e5a28','#3f7232','#58903e','#6fa84a'][Math.min(3,Math.floor(r()*3+(1-d/(cs*.46))*1.3))];
   x.save();x.translate(px,py);x.rotate(a+r()*.8);x.fillStyle=c;x.beginPath();x.ellipse(0,0,L,L*.45,0,0,7);x.fill();x.strokeStyle='rgba(20,40,16,.5)';x.lineWidth=.6;x.beginPath();x.moveTo(-L,0);x.lineTo(L,0);x.stroke();x.restore()}
  x.fillStyle='rgba(230,250,180,.18)';x.beginPath();x.ellipse(X-cs*.15,Y-cs*.17,cs*.18,cs*.1,-.5,0,7);x.fill()}
}
