// ===== p312 : la carte du début (point chaud, Inde, Madagascar) peinte au lieu d'être en polygones —
// côtes adoucies puis froissées comme de vraies côtes, terres en matière (relief, végétation, sécheresse), haut-fond clair le long
// des rivages, écume, océan profond avec son grain, et un voile sur les bords de la carte pour qu'aucun bord droit ne se voie. =====
const C312={};
function grain312(k,base,var_,n){if(C312[k])return C312[k];const c=document.createElement('canvas');c.width=c.height=n||256;const x=c.getContext('2d');x.fillStyle=base;x.fillRect(0,0,c.width,c.height);let s=k.length*331;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};
 for(let i=0;i<5200;i++){const a=r()*var_;x.fillStyle=r()<.5?'rgba(0,0,0,'+a+')':'rgba(255,255,255,'+a*.7+')';x.beginPath();x.ellipse(r()*c.width,r()*c.height,1+r()*5,1+r()*3,r()*3,0,7);x.fill()}
 return C312[k]=c}
// une côte : on adoucit le tracé (Chaikin) puis on le froisse avec un bruit fractal stable
function cote312(Q,sc){let P=Q.slice();for(let it=0;it<1;it++){const R=[];for(let i=0;i<P.length;i++){const a=P[i],b=P[(i+1)%P.length];R.push([a[0]*.75+b[0]*.25,a[1]*.75+b[1]*.25],[a[0]*.25+b[0]*.75,a[1]*.25+b[1]*.75])}P=R}
 // on redécoupe chaque segment pour que le froissé ait de la matière, puis un bruit fin à plusieurs échelles
 const D=[];P.forEach((a,i)=>{const b=P[(i+1)%P.length],n=Math.max(1,Math.round(Math.hypot(b[0]-a[0],b[1]-a[1])/4));for(let k=0;k<n;k++)D.push([a[0]+(b[0]-a[0])*k/n,a[1]+(b[1]-a[1])*k/n])});P=D;
 const A=sc*.16;return P.map(([x,y],i)=>{const n=Math.sin(x*.21+y*.17)*.45+Math.sin(x*.63-y*.43)*.3+Math.sin(x*1.7+y*1.3)*.25;const m=Math.cos(x*.19-y*.23)*.45+Math.cos(x*.57+y*.49)*.3+Math.cos(x*1.9-y*1.4)*.25;return [x+n*A,y+m*A]})}
function mer312(x,W,H){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#123f5c');g.addColorStop(.6,'#0b2c44');g.addColorStop(1,'#061a2a');x.fillStyle=g;x.fillRect(0,0,W,H);
 x.save();x.globalAlpha=.35;x.globalCompositeOperation='overlay';x.fillStyle=x.createPattern(grain312('mer','#406080',.12),'repeat');x.fillRect(0,0,W,H);x.restore();
 // la houle du large, très douce
 const t=performance.now()/1000;x.strokeStyle='rgba(160,200,220,.05)';x.lineWidth=1;for(let y=0;y<H;y+=14){x.beginPath();for(let X=0;X<=W;X+=16)x.lineTo(X,y+Math.sin(X*.02+y*.1+t*.4)*2.5);x.stroke()}}
function terre312(x,Q,f,sc){const P=cote312(Q,sc),tr=()=>{x.beginPath();P.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.closePath()};
 // le haut-fond : une bande claire et floue tout autour
 x.save();x.strokeStyle='rgba(90,170,180,.22)';x.lineWidth=sc*1.4;x.lineJoin='round';try{x.filter='blur('+Math.max(2,sc*.35)+'px)'}catch(e){}tr();x.stroke();x.restore();
 x.save();tr();x.clip();
 const sec=/7a7050/.test(f);x.fillStyle=sec?'#7d6e4c':'#58673f';x.fill();
 x.globalAlpha=.85;x.fillStyle=x.createPattern(grain312(sec?'terreS':'terreV',sec?'#8a7a56':'#5e6e44',.22),'repeat');x.fill();x.globalAlpha=1;
 // le relief : des taches sombres et claires, comme des massifs et des plaines
 let s=P.length;const r=()=>{s=(s*16807+7)%2147483647;return s/2147483647};const bx=P.reduce((a,p)=>[Math.min(a[0],p[0]),Math.min(a[1],p[1]),Math.max(a[2],p[0]),Math.max(a[3],p[1])],[1e9,1e9,-1e9,-1e9]);
 for(let i=0;i<40;i++){const X=bx[0]+r()*(bx[2]-bx[0]),Y=bx[1]+r()*(bx[3]-bx[1]),R=sc*(1+r()*3.5),g=x.createRadialGradient(X,Y,0,X,Y,R),d=r()<.5;g.addColorStop(0,d?'rgba(30,36,20,.28)':'rgba(220,210,160,.16)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(X-R,Y-R,R*2,R*2)}
 // ombrage : le bord des terres un peu plus sombre, la lumière vient du nord-ouest
 x.lineWidth=sc*1.6;x.strokeStyle='rgba(20,24,14,.25)';try{x.filter='blur('+Math.max(2,sc*.5)+'px)'}catch(e){}tr();x.stroke();try{x.filter='none'}catch(e){}x.restore();
 // la côte : un trait fin et l'écume
 tr();x.strokeStyle='rgba(30,30,20,.55)';x.lineWidth=1.2;x.stroke();x.strokeStyle='rgba(230,240,240,.25)';x.lineWidth=.8;x.save();x.translate(.8,.8);tr();x.stroke();x.restore()}
// un voile sur les bords de la carte : on ne voit plus les coupes droites des continents
function voile312(x,W,H,top,hh){const g=x.createLinearGradient(0,top-10,0,top+hh*.14);g.addColorStop(0,'rgba(8,24,40,1)');g.addColorStop(1,'rgba(8,24,40,0)');x.fillStyle=g;x.fillRect(0,0,W,top+hh*.14);
 const v=x.createRadialGradient(W/2,H*.45,Math.min(W,H)*.35,W/2,H*.45,Math.max(W,H)*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.45)');x.fillStyle=v;x.fillRect(0,0,W,H)}

// des côtes vraies (longitude, latitude), assez fines pour qu'on reconnaisse la Corne, la mer Rouge, l'Arabie, le Mozambique
const AFRD312=[[-30,33],[20,33],[25,31.6],[29,30.9],[32.3,31.3],[33.6,27.6],[35.5,24],[37.2,21],[38.6,18],[39.7,15.6],[41.2,14.1],[43.3,12.6],[44.5,10.4],[47,11.1],[51.2,11.8],[51,10.4],[50.4,8.5],[49,6],[47.8,4.2],[46,2],[44,1],[42.5,-.5],[41,-1.9],[40.1,-3.3],[39.2,-4.7],[39.3,-6.8],[39.5,-8.2],[39.8,-10],[40.5,-10.8],[40.6,-12.5],[40.6,-14.5],[39.8,-16.3],[37.5,-17.8],[36,-18.8],[35,-20.5],[35.5,-22.1],[35.5,-24],[33,-25.4],[32.8,-26.9],[32.6,-28.6],[31.3,-29.9],[30,-31.3],[28.4,-32.7],[26.7,-33.8],[25,-34],[18,-70],[-30,-70]];
const ARA312=[[33,34],[34.9,29.5],[35.1,28],[36.5,26],[38.2,23.8],[39.2,21.5],[40.7,19.5],[42.5,16.5],[43.2,13.3],[45,12.8],[48.5,14],[52.2,15.6],[55.5,17.6],[57.7,19],[58.7,20.6],[59.8,22.5],[58.6,23.6],[56.4,24.9],[56.2,26.3],[54.6,24.3],[52,24],[51.5,25.4],[50.6,25.2],[50.2,26.6],[48.6,28],[48,29.9],[50.3,29.3],[51.4,27.9],[54,26.6],[56.3,27.2],[57.3,25.9],[61.6,25.2],[64,25.3],[66.6,25.4],[67.6,24.2],[68.4,23.6],[70,26],[72,34]];
const MDGD312=[[49.3,-12],[49.9,-13.5],[50.4,-15.4],[49.8,-16.5],[49.4,-17.6],[48.9,-19.5],[48.3,-21.5],[47.7,-23.5],[47.1,-24.9],[45.8,-25.5],[44.7,-25.1],[44,-24.3],[43.6,-23.5],[43.3,-22.3],[43.5,-21.3],[44.2,-20],[44.4,-18.5],[44,-17.3],[44.4,-16.2],[45.6,-15.9],[46.5,-15.5],[47.3,-14.7],[47.9,-14],[48.3,-13.3],[48.9,-12.3]];
