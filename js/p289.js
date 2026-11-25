// ===== p289 : le décor des commandos, accordé aux personnages. Les personnages sont peints en vue de dessus, avec volume et ombre ;
// le décor l'était en aplats et en icônes (buissons ronds, caisses de dessin animé). On le peint maintenant de la même main :
// sol grainé selon le lieu (terre du Morne, sable du Mozambique, latérite de Madras, dalles du temple), murs de pierre en relief avec
// leur ombre portée, eau qui frise, buissons faits de touffes de feuilles, caisses et portes en planches. Le fond est peint une fois
// puis réutilisé à chaque image. =====
const F289={};
function fondCmd289(MP,RW,RH,cs,k){const cle=k+':'+cs+':'+RW+'x'+RH;if(F289[cle])return F289[cle];const W=RW*cs,H=RH*cs,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 let s=17+k.length*7;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};
 const SOL={morne:['#5b4a36','#6a573f','#4e4030','#566a38'],negrier:['#b8a074','#c8b084','#a8906a','#9a8a62'],poudre:['#8a5a3a','#9a6a46','#7a4e32','#6e6a3a'],sanct:['#8a8070','#9a9080','#7a7062','#6a6656']}[k]||['#5b4a36','#6a573f','#4e4030','#566a38'];
 // le sol : grain, taches, brins
 x.fillStyle=SOL[0];x.fillRect(0,0,W,H);const vrai=typeof sol313==='function'&&sol313(x,W,H,k,cs);
 for(let i=0;i<(vrai?W*H/400:W*H/90);i++){x.fillStyle=SOL[1+Math.floor(r()*3)];x.globalAlpha=.25+r()*.35;const R=1+r()*cs*.18;x.beginPath();x.ellipse(r()*W,r()*H,R,R*(.5+r()*.6),r()*3,0,7);x.fill()}
 x.globalAlpha=1;
 if(k==='sanct'){x.strokeStyle='rgba(40,34,28,.35)';x.lineWidth=1;for(let j=0;j<RH;j++)for(let i=0;i<RW;i++){const X=i*cs,Y=j*cs,o=(j%2)*cs/2;x.strokeRect(X+o%cs,Y,cs,cs/2);x.strokeRect(X,Y+cs/2,cs,cs/2)}}
 if(k!=='sanct'&&k!=='negrier'){x.strokeStyle='rgba(90,120,50,.55)';x.lineWidth=1;for(let i=0;i<W*H/260;i++){const X=r()*W,Y=r()*H;x.beginPath();x.moveTo(X,Y);x.lineTo(X+(r()-.5)*4,Y-2-r()*4);x.stroke()}}
 const T=(i,j)=>(MP[j]&&MP[j][i])||'#';
 // le pont du navire : les cases qu'on n'atteint pas depuis le dehors sans franchir la coque
 if(k==='negrier'){let a0=RW,a1=0,b0=RH,b1=0;for(let j=1;j<RH-1;j++)for(let i=1;i<RW-1;i++)if(T(i,j)==='#'){a0=Math.min(a0,i);a1=Math.max(a1,i);b0=Math.min(b0,j);b1=Math.max(b1,j)}
  const eau=(i,j)=>T(i,j)==='~';for(let j=1;j<RH-1;j++)for(let i=1;i<RW-1;i++){const t=T(i,j);if(t==='#'||t==='~'||t==='c'||t==='=')continue;const pont=i>=a0&&i<=a1&&j>=b0&&j<=b1,passe=(eau(i,j-1)&&eau(i,j+1))||(eau(i-1,j)&&eau(i+1,j));if(!pont&&!passe)continue;
   const X=i*cs,Y=j*cs;x.fillStyle=passe&&!pont?'#6a4e32':'#7a5c3c';x.fillRect(X,Y,cs,cs);x.strokeStyle='rgba(40,24,12,.55)';x.lineWidth=1;for(let n=0;n<4;n++){x.beginPath();x.moveTo(X,Y+n*cs/4+.5);x.lineTo(X+cs,Y+n*cs/4+.5);x.stroke();x.beginPath();const cx=X+((i*3+n*5)%4)*cs/4;x.moveTo(cx,Y+n*cs/4);x.lineTo(cx,Y+(n+1)*cs/4);x.stroke()}x.fillStyle='rgba(255,220,170,.06)';x.fillRect(X,Y,cs,cs/8)}}
 // l'eau
 for(let j=0;j<RH;j++)for(let i=0;i<RW;i++)if(T(i,j)==='~'){const X=i*cs,Y=j*cs,g=x.createLinearGradient(X,Y,X+cs,Y+cs);g.addColorStop(0,'#2f5f74');g.addColorStop(1,'#244c60');x.fillStyle=g;x.fillRect(X-.5,Y-.5,cs+1,cs+1);
  x.strokeStyle='rgba(200,230,240,.22)';x.lineWidth=1;for(let n=0;n<3;n++){const yy=Y+cs*(.2+.3*n)+r()*4;x.beginPath();x.moveTo(X+r()*cs*.3,yy);x.quadraticCurveTo(X+cs*.5,yy-3,X+cs*(.7+r()*.3),yy);x.stroke()}
  // bord : une berge plus claire là où l'eau touche la terre
  [[0,-1],[0,1],[-1,0],[1,0]].forEach(([a,b])=>{if(T(i+a,j+b)!=='~'){x.fillStyle='rgba(180,170,130,.35)';if(b)x.fillRect(X,Y+(b>0?cs-3:0),cs,3);else x.fillRect(X+(a>0?cs-3:0),Y,3,cs)}})}
 // les ombres portées des murs et des caisses (vers le bas et la droite)
 x.fillStyle='rgba(0,0,0,.35)';for(let j=0;j<RH;j++)for(let i=0;i<RW;i++){const t=T(i,j);if(t==='#'||t==='='||t==='c')x.fillRect(i*cs+cs*.18,j*cs+cs*.22,cs,cs)}
 // les murs : pierres empilées, éclairées en haut à gauche
 for(let j=0;j<RH;j++)for(let i=0;i<RW;i++){const t=T(i,j),X=i*cs,Y=j*cs;
  if(t==='#'){const bord=i===0||j===0||i===RW-1||j===RH-1;x.fillStyle=bord?'#2e2822':(k==='negrier'?'#5a4028':'#6a6052');x.fillRect(X,Y,cs,cs);
   if(k==='negrier'&&!bord){x.strokeStyle='rgba(30,18,10,.6)';for(let n=1;n<4;n++){x.beginPath();x.moveTo(X,Y+n*cs/4);x.lineTo(X+cs,Y+n*cs/4);x.stroke()}continue}
   const n=3;for(let a=0;a<n;a++)for(let b=0;b<n;b++){const px=X+b*cs/n+(a%2)*cs/(2*n),py=Y+a*cs/n,w=cs/n-1.5,h=cs/n-1.5,v=(bord?40:95)+Math.floor(r()*30);x.fillStyle='rgb('+v+','+(v-6)+','+(v-16)+')';x.beginPath();x.roundRect?x.roundRect(px,py,w,h,2):x.rect(px,py,w,h);x.fill();x.fillStyle='rgba(255,240,210,.12)';x.fillRect(px,py,w,1.5);x.fillStyle='rgba(0,0,0,.25)';x.fillRect(px,py+h-1.5,w,1.5)}}
  else if(t==='='||t==='c'){const pl=t==='=';x.fillStyle=pl?'#6e5236':'#7a5a34';const m=pl?0:cs*.1;x.fillRect(X+m,Y+m,cs-2*m,cs-2*m);x.strokeStyle='rgba(40,24,12,.7)';x.lineWidth=1;const nb=pl?4:3;for(let n=1;n<nb;n++){x.beginPath();if(pl){x.moveTo(X,Y+n*cs/nb);x.lineTo(X+cs,Y+n*cs/nb)}else{x.moveTo(X+m+n*(cs-2*m)/nb,Y+m);x.lineTo(X+m+n*(cs-2*m)/nb,Y+cs-m)}x.stroke()}
   x.fillStyle='rgba(255,230,190,.14)';x.fillRect(X+m,Y+m,cs-2*m,2);if(!pl){x.strokeStyle='rgba(40,24,12,.8)';x.lineWidth=2;x.strokeRect(X+m,Y+m,cs-2*m,cs-2*m);x.beginPath();x.moveTo(X+m,Y+m);x.lineTo(X+cs-m,Y+cs-m);x.stroke()}}
  else if(t==='X'){x.fillStyle='rgba(200,180,130,.35)';x.beginPath();x.ellipse(X+cs/2,Y+cs/2,cs*.45,cs*.3,0,0,7);x.fill()}}
 // les buissons : touffes de feuilles, ombre dessous, lumière dessus
 for(let j=0;j<RH;j++)for(let i=0;i<RW;i++)if(T(i,j)==='b'){const X=i*cs+cs/2,Y=j*cs+cs/2;x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(X+cs*.12,Y+cs*.16,cs*.52,cs*.44,0,0,7);x.fill();
  for(let n=0;n<11;n++){const a=r()*6.28,d=r()*cs*.3,R=cs*(.16+r()*.14),px=X+Math.cos(a)*d,py=Y+Math.sin(a)*d,g=x.createRadialGradient(px-R*.35,py-R*.35,R*.1,px,py,R);g.addColorStop(0,k==='sanct'||k==='poudre'?'#6a9a44':'#5c8a3c');g.addColorStop(.6,'#2f5a26');g.addColorStop(1,'#1c3a18');x.fillStyle=g;x.beginPath();x.arc(px,py,R,0,7);x.fill()}
  x.fillStyle='rgba(200,230,140,.25)';for(let n=0;n<8;n++){x.beginPath();x.arc(X-cs*.2+r()*cs*.4,Y-cs*.25+r()*cs*.35,1.2,0,7);x.fill()}}
 // un léger vignettage, comme la lumière d'une lanterne
 const v=x.createRadialGradient(W/2,H/2,Math.min(W,H)*.35,W/2,H/2,Math.max(W,H)*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.35)');x.fillStyle=v;x.fillRect(0,0,W,H);
 F289[cle]=c;return c}
