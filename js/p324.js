// ===== p324 : le commando sous une même lumière. (1) Les captifs ne sont plus un pictogramme ⛓ : on les voit, assis serrés,
// la chaîne d'une cheville à l'autre. La sortie n'est plus une flèche ⇲ : un sentier de pas qui s'en va sous les arbres.
// (2) Une lumière commune à tout le terrain — personnages compris : l'ombre mouvante des feuillages, des taches de soleil
// chaud, un bord qui s'assombrit. Les personnages ne flottent plus au-dessus d'un décor : ils sont dedans. (3) Les murs de pierres
// sèches ne reposent plus sur des carrés gris (p289 ne les peint plus quand le vrai sol est là). =====
function marque324(x,c,but,X,Y,cs){
 if(c==='X'){x.save();x.globalAlpha=.85;// des pas qui partent, de plus en plus pâles
  for(let n=0;n<5;n++){const px=X-cs*.25+n*cs*.13,py=Y+cs*.18-n*cs*.1,a=-.6;x.save();x.translate(px+(n%2?cs*.05:-cs*.05),py);x.rotate(a);x.globalAlpha=.75-n*.12;x.fillStyle='#2a2016';x.beginPath();x.ellipse(0,0,cs*.045,cs*.08,0,0,7);x.fill();x.beginPath();x.arc(0,-cs*.1,cs*.03,0,7);x.fill();x.restore()}
  // un petit cairn de pierres : on sort ici
  [[.28,-.22,.07],[.33,-.26,.05],[.3,-.31,.04]].forEach(([a,b,r])=>{x.globalAlpha=1;x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(X+a*cs+2,Y+b*cs+2,r*cs,r*cs*.8,0,0,7);x.fill();x.fillStyle='#8a8272';x.beginPath();x.ellipse(X+a*cs,Y+b*cs,r*cs,r*cs*.8,0,0,7);x.fill();x.fillStyle='rgba(255,245,220,.25)';x.beginPath();x.ellipse(X+a*cs-r*cs*.3,Y+b*cs-r*cs*.3,r*cs*.4,r*cs*.3,0,0,7);x.fill()});
  x.restore();return true}
 if(c==='O'&&but==='free'){const P=[[-.22,.02,.3],[.05,-.12,-.4],[.24,.1,.9]],pe=['#3a2618','#4a2e1c','#2e1e12'],tissu=['#b8a888','#a89878','#c0b090'];x.save();
  // la chaîne d'abord, d'une cheville à l'autre
  x.strokeStyle='#5a5a58';x.lineWidth=Math.max(1,cs*.025);x.setLineDash([cs*.03,cs*.02]);x.beginPath();P.forEach(([a,b],n)=>{const px=X+a*cs,py=Y+b*cs+cs*.12;n?x.lineTo(px,py):x.moveTo(px,py)});x.stroke();x.setLineDash([]);
  P.forEach(([a,b,r],n)=>{const px=X+a*cs,py=Y+b*cs;x.save();x.translate(px,py);x.rotate(r);
   x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(cs*.03,cs*.04,cs*.16,cs*.12,0,0,7);x.fill();// ombre
   x.fillStyle=pe[n];x.beginPath();x.ellipse(-cs*.06,cs*.1,cs*.035,cs*.07,.4,0,7);x.ellipse(cs*.06,cs*.1,cs*.035,cs*.07,-.4,0,7);x.fill();// genoux repliés
   x.fillStyle=tissu[n];x.beginPath();x.ellipse(0,0,cs*.13,cs*.09,0,0,7);x.fill();// le dos courbé, la toile
   x.fillStyle='rgba(0,0,0,.18)';x.beginPath();x.ellipse(0,cs*.03,cs*.12,cs*.05,0,0,7);x.fill();
   x.fillStyle=pe[n];x.beginPath();x.ellipse(-cs*.1,cs*.04,cs*.03,cs*.06,.3,0,7);x.ellipse(cs*.1,cs*.04,cs*.03,cs*.06,-.3,0,7);x.fill();// bras autour des genoux
   x.fillStyle=pe[n];x.beginPath();x.arc(0,-cs*.02,cs*.06,0,7);x.fill();x.fillStyle='#120c08';x.beginPath();x.arc(0,-cs*.035,cs*.05,Math.PI,0);x.fill();// tête baissée
   x.restore()});x.restore();return true}
 return false}
const L324={};
function lum324(x,ox,oy,W,H,k,cs){const cle=k+':'+W+'x'+H;let o=L324[cle];
 if(!o){const pad=Math.round(cs*2),c=document.createElement('canvas');c.width=W+pad*2;c.height=H+pad*2;const g=c.getContext('2d');let s=7+k.length*31;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};
  // l'ombre des feuillages : de grandes taches douces, plus nombreuses sous la forêt du bord
  try{g.filter='blur('+Math.round(cs*.35)+'px)'}catch(e){}
  for(let n=0;n<Math.round(W*H/(cs*cs)*.55);n++){const px=r()*c.width,py=r()*c.height,R=cs*(.5+r()*1.4);g.fillStyle='rgba(10,18,8,'+(.06+r()*.08)+')';g.beginPath();g.ellipse(px,py,R,R*(.5+r()*.5),r()*3,0,7);g.fill()}
  const sol=document.createElement('canvas');sol.width=c.width;sol.height=c.height;const h=sol.getContext('2d');try{h.filter='blur('+Math.round(cs*.3)+'px)'}catch(e){}
  for(let n=0;n<Math.round(W*H/(cs*cs)*.12);n++){const px=r()*c.width,py=r()*c.height,R=cs*(.3+r()*.7);h.fillStyle='rgba(255,214,140,'+(.10+r()*.10)+')';h.beginPath();h.ellipse(px,py,R,R*.7,r()*3,0,7);h.fill()}
  o=L324[cle]={c,sol,pad}}
 const t=performance.now()/1000,dx=Math.sin(t*.13)*cs*.35,dy=Math.cos(t*.1)*cs*.25;
 x.save();x.beginPath();x.rect(ox,oy,W,H);x.clip();
 x.drawImage(o.c,ox-o.pad+dx,oy-o.pad+dy);
 x.globalCompositeOperation='lighter';x.globalAlpha=.55+.15*Math.sin(t*.4);x.drawImage(o.sol,ox-o.pad-dx*.6,oy-o.pad-dy*.6);x.globalAlpha=1;
 // une teinte commune (l'air chaud du jour) et le bord qui s'assombrit
 x.globalCompositeOperation='soft-light';x.fillStyle=k==='negrier'?'rgba(120,150,170,.35)':k==='sanct'?'rgba(200,150,90,.35)':'rgba(190,150,80,.32)';x.fillRect(ox,oy,W,H);
 x.globalCompositeOperation='source-over';const v=x.createRadialGradient(ox+W/2,oy+H/2,Math.min(W,H)*.35,ox+W/2,oy+H/2,Math.max(W,H)*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(8,6,4,.28)');x.fillStyle=v;x.fillRect(ox,oy,W,H);
 x.restore()}
