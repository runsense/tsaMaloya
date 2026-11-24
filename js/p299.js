// ===== p299 : l'espion des Hauts peint comme les commandos — sol grainé, cannes en rangs, case du maître au toit de tuiles,
// entrepôt en planches, cases en paille, case du commandeur en bois, porte fermée ; et les gens dessinés comme dans les commandos. =====
const F299={};
function fondEsp299(MP,RW,RH,cs,k){const cle=k+':'+cs;if(F299[cle])return F299[cle];const W=RW*cs,H=RH*cs,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 let s=31+k.length*11;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};const T=(i,j)=>(MP[j]&&MP[j][i])||'#';
 x.fillStyle='#5e4c38';x.fillRect(0,0,W,H);for(let i=0;i<W*H/80;i++){x.fillStyle=['#6c573f','#524232','#5a6a38','#6a5a44'][Math.floor(r()*4)];x.globalAlpha=.25+r()*.35;const R=1+r()*cs*.16;x.beginPath();x.ellipse(r()*W,r()*H,R,R*(.5+r()*.6),r()*3,0,7);x.fill()}x.globalAlpha=1;
 // ombres portées des bâtiments
 x.fillStyle='rgba(0,0,0,.35)';for(let j=0;j<RH;j++)for(let i=0;i<RW;i++){const t=T(i,j);if('#MEKcD'.includes(t))x.fillRect(i*cs+cs*.2,j*cs+cs*.25,cs,cs)}
 for(let j=0;j<RH;j++)for(let i=0;i<RW;i++){const t=T(i,j),X=i*cs,Y=j*cs;
  if(t==='b'){x.fillStyle='#3e5a2c';x.fillRect(X,Y,cs,cs);for(let q=0;q<3;q++){const cx=X+cs*(.18+q*.32);for(let f=0;f<5;f++){x.strokeStyle=f%2?'#7aa84a':'#5a8a3a';x.lineWidth=1.4;x.beginPath();x.moveTo(cx,Y+cs*.9);x.quadraticCurveTo(cx+(r()-.5)*cs*.5,Y+cs*.4,cx+(r()-.5)*cs*.7,Y+cs*(.05+r()*.2));x.stroke()}}}
  else if(t==='#'){x.fillStyle='#2e2822';x.fillRect(X,Y,cs,cs);for(let a=0;a<3;a++)for(let b=0;b<3;b++){const v=40+Math.floor(r()*25);x.fillStyle='rgb('+v+','+(v-5)+','+(v-12)+')';x.fillRect(X+b*cs/3+(a%2)*cs/6,Y+a*cs/3,cs/3-1.5,cs/3-1.5)}}
  else if(t==='M'){const g=x.createLinearGradient(X,Y,X+cs,Y+cs);g.addColorStop(0,'#b5543c');g.addColorStop(1,'#8a3a2a');x.fillStyle=g;x.fillRect(X,Y,cs,cs);x.strokeStyle='rgba(60,20,10,.45)';x.lineWidth=1;for(let n=1;n<5;n++){x.beginPath();x.moveTo(X,Y+n*cs/5);x.lineTo(X+cs,Y+n*cs/5);x.stroke()}x.fillStyle='rgba(255,220,190,.12)';x.fillRect(X,Y,cs,2)}
  else if(t==='E'){x.fillStyle='#7a5a3a';x.fillRect(X,Y,cs,cs);x.strokeStyle='rgba(40,24,12,.6)';x.lineWidth=1;for(let n=1;n<4;n++){x.beginPath();x.moveTo(X+n*cs/4,Y);x.lineTo(X+n*cs/4,Y+cs);x.stroke()}}
  else if(t==='K'){x.fillStyle='#5e4c38';x.fillRect(X,Y,cs,cs);const g=x.createRadialGradient(X+cs*.45,Y+cs*.4,1,X+cs/2,Y+cs/2,cs*.55);g.addColorStop(0,'#d8b870');g.addColorStop(1,'#8a6a34');x.fillStyle=g;x.beginPath();x.arc(X+cs/2,Y+cs/2,cs*.48,0,7);x.fill();x.strokeStyle='rgba(90,60,20,.5)';for(let n=0;n<8;n++){const a=n/8*6.28;x.beginPath();x.moveTo(X+cs/2,Y+cs/2);x.lineTo(X+cs/2+Math.cos(a)*cs*.46,Y+cs/2+Math.sin(a)*cs*.46);x.stroke()}}
  else if(t==='c'||t==='D'){x.fillStyle=t==='D'?'#8a5a2a':'#6e5236';x.fillRect(X,Y,cs,cs);x.strokeStyle='rgba(40,24,12,.7)';x.lineWidth=1;for(let n=1;n<4;n++){x.beginPath();x.moveTo(X,Y+n*cs/4);x.lineTo(X+cs,Y+n*cs/4);x.stroke()}if(t==='D'){x.fillStyle='#c8a050';x.beginPath();x.arc(X+cs*.7,Y+cs*.5,cs*.08,0,7);x.fill()}}
  else if(t==='X'){x.fillStyle='rgba(200,180,130,.35)';x.beginPath();x.ellipse(X+cs/2,Y+cs/2,cs*.45,cs*.3,0,0,7);x.fill()}}
 const v=x.createRadialGradient(W/2,H/2,Math.min(W,H)*.35,W/2,H/2,Math.max(W,H)*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.35)');x.fillStyle=v;x.fillRect(0,0,W,H);F299[cle]=c;return c}
