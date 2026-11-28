// ===== p396 (refait le 28/11) : la cinématique de départ raconte d'abord le mythe — Kumari Kandam, la terre engloutie au sud de
// l'Inde — puis ce que dit la roche, sur une carte animée des plaques (schéma simplifié, positions approchées) :
// - 200 Ma : Gondwana ; Afrique, Arabie, Madagascar, Inde, Antarctique, Australie, Zélandie sont soudées.
// - vers 160–120 Ma : Madagascar et l'Inde quittent l'Afrique ; vers 88 Ma, l'Inde quitte Madagascar ; entre les deux, un
//   petit continent se déchire : Mauritia (zircons de près de 3 milliards d'années sous Maurice — Ashwal et al., 2017).
// - vers 66 Ma : l'Inde passe sur le point chaud — les trapps du Deccan. C'est le même point chaud qui est aujourd'hui sous La Réunion.
// - vers 50 Ma : l'Inde heurte l'Asie ; son bord nord (la « Grande Inde ») passe sous l'Asie, l'Himalaya se lève.
//   L'Australie se détache de l'Antarctique ; la Zélandie, détachée vers 85 Ma, s'enfonce : c'est elle, le vrai continent englouti
//   (environ 94 % sous la mer ; la Nouvelle-Zélande en est la part émergée).
// - vers 30 Ma : le panache de l'Afar soulève et couvre de basaltes les hauts plateaux d'Éthiopie ; vers 25 Ma l'Arabie s'écarte de
//   l'Afrique (mer Rouge) ; le rift est-africain ouvre ses grands lacs ; le Nil Bleu descend des plateaux éthiopiens.
// Mythe : Kumari Kandam (commentaires médiévaux tamouls ; nom et idée de continent aux XIXᵉ-XXᵉ s.), nourri de la « Lémurie »
// imaginée en 1864 (Sclater) pour expliquer les lémuriens de Madagascar et de l'Inde, étendue ensuite de l'Afrique à l'Australie.
// La tectonique des plaques l'a rendue inutile ; le mythe reste. Les grandes rivières (Galets, Mât, Saint-Étienne, Est, Remparts,
// Langevin) sont celles du Piton des Neiges et des anciens flancs de la Fournaise. =====
const PL407={
 afrique:{c:'#b89a62',n:'Afrique',p:[[-17,15],[-10,28],[0,36],[10,37],[20,32],[32,31],[34,28],[39,20],[43,12],[51,12],[42,-2],[40,-15],[35,-24],[32,-29],[20,-35],[17,-29],[12,-17],[9,-1],[5,5],[-8,5]],k:[[0,0,0,0]]},
 arabie:{c:'#c8a868',n:'Arabie',p:[[34,28],[36,32],[47,30],[56,26],[59,22],[52,16],[45,13],[43,13],[39,20]],k:[[0,0,0,0],[25,-2,-3,-6],[200,-2,-3,-6]]},
 madagascar:{c:'#a8b070',n:'Madagascar',p:[[49.3,-12],[50.5,-15.5],[47.2,-25],[44,-24],[43.5,-21],[44.5,-16],[47,-14]],k:[[0,0,0,0],[120,0,0,0],[165,-6,11,15],[200,-6,11,15]]},
 inde:{c:'#c88a5a',n:'Inde',p:[[68,24],[72,21],[73,16],[76,8],[78,8.5],[80,13],[80,16],[85,19],[88,22],[89,26],[80,30],[74,33],[70,28]],k:[[0,0,0,0],[20,-2,-6,5],[50,-6,-16,15],[66,-17,-36,25],[90,-15,-46,40],[120,-15,-46,40],[165,-22,-30,48],[200,-22,-30,48]]},
 grandeInde:{c:'#c88a5a',n:'',p:[[70,28],[74,33],[80,30],[89,26],[93,31],[86,38],[72,37]],k:'inde',vis:t=>Math.max(0,Math.min(1,(t-42)/10))},
 asie:{c:'#9a8a70',n:'Asie',p:[[20,45],[26,40],[36,36],[36,32],[47,30],[56,26],[62,25],[68,24],[70,28],[74,33],[80,30],[89,26],[92,22],[98,16],[99,8],[103,1.5],[104,3],[102,7],[100,13],[106,11],[109,20],[120,23],[122,30],[122,40],[130,43],[140,45],[186,45],[186,70],[20,70]],k:[[0,0,0,0]]},
 sumatra:{c:'#9a8a70',n:'',p:[[95,5],[106,-6],[104,-6],[95,2]],k:[[0,0,0,0]],vis:t=>t<40?1:0},
 borneo:{c:'#9a8a70',n:'',p:[[109,1],[117,7],[119,0],[116,-4],[110,-3]],k:[[0,0,0,0]],vis:t=>t<40?1:0},
 antarctique:{c:'#d8dce0',n:'Antarctique',p:[[-20,-70],[60,-67],[120,-66],[186,-72],[186,-95],[-20,-95]],k:[[0,0,0,0],[100,0,8,0],[200,0,10,0]]},
 australie:{c:'#c0784a',n:'Australie',p:[[114,-22],[122,-18],[130,-12],[137,-12],[142,-11],[146,-19],[153,-25],[150,-37],[141,-38],[135,-35],[129,-32],[115,-35],[114,-26]],k:[[0,0,0,0],[20,-5,-6,-3],[45,-12,-16,-10],[85,-18,-24,-15],[200,-18,-24,-15]]},
 zelandie:{c:'#8aa088',n:'Zélandie',p:[[158,-26],[176,-34],[180,-48],[168,-53],[159,-40]],k:[[0,0,0,0],[60,-2,-2,0],[85,-20,-14,-10],[200,-22,-24,-15]],noye:t=>t<25}};
const KEYS407=Object.keys(PL407);
function off407(k,t){const P=PL407[k];if(typeof P.k==='string')return off407(P.k,t);const K=P.k;if(K.length===1)return K[0].slice(1);for(let i=1;i<K.length;i++){if(t<=K[i][0]){const a=K[i-1],b=K[i],u=(t-a[0])/((b[0]-a[0])||1);return [a[1]+(b[1]-a[1])*u,a[2]+(b[2]-a[2])*u,a[3]+(b[3]-a[3])*u]}}return K[K.length-1].slice(1)}
function cent407(k){const P=PL407[typeof PL407[k].k==='string'?PL407[k].k:k].p;let x=0,y=0;P.forEach(p=>{x+=p[0];y+=p[1]});return [x/P.length,y/P.length]}
function pt407(k,p,t){const [dx,dy,r]=off407(k,t),[cx,cy]=cent407(k),a=r*Math.PI/180,x=p[0]-cx,y=p[1]-cy;return [cx+dx+x*Math.cos(a)-y*Math.sin(a),cy+dy+x*Math.sin(a)+y*Math.cos(a)]}
function en407(x){if(x.__en||typeof LANG363==='undefined'||LANG363!=='en')return x;const f=x.fillText.bind(x);x.fillText=(t,...a)=>{let u=String(t);const m=u.match(/^Il y a (\d+) millions d’années$/);if(m)u=m[1]+' million years ago';else if(/ \(sous la mer\)$/.test(u))u=tr363(u.replace(/ \(sous la mer\)$/,''))+' (under the sea)';else u=tr363(u);return f(u,...a)};x.__en=1;return x}
const VUE407={lo0:-5,lo1:186,la0:44,la1:-74};
function cvs407(){let c=document.getElementById('plaq407');if(c&&c.dataset.fin){c.remove();c=null}if(c)return c;c=document.createElement('canvas');c.id='plaq407';c.style.cssText='position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0;transition:opacity .8s';const host=(typeof CINE!=='undefined'&&CINE&&CINE.el)||document.body;host.insertBefore(c,host.firstChild);[...host.children].forEach(e=>{if(e!==c){if(getComputedStyle(e).position==='static')e.style.position='relative';e.style.zIndex=Math.max(2,+e.style.zIndex||0)}});return c}
function fin407(){const c=document.getElementById('plaq407');if(c&&!c.dataset.fin){c.dataset.fin=1;c.style.opacity=0;setTimeout(()=>{if(c.dataset.fin)c.remove()},900)}}
function dessin407(t,mythe){const c=cvs407();c.style.opacity=1;const W=c.width=innerWidth,H=c.height=innerHeight,x=en407(c.getContext('2d'));
 const sx=W/(VUE407.lo1-VUE407.lo0),sy=H*.64/(VUE407.la0-VUE407.la1),s=Math.min(sx*.96,sy),ox=(W-s*(VUE407.lo1-VUE407.lo0))/2,oy=H*.12,P=([lo,la])=>[ox+(lo-VUE407.lo0)*s,oy+(VUE407.la0-la)*s];
 x.fillStyle='#0c2236';x.fillRect(0,0,W,H);x.strokeStyle='rgba(160,200,230,.08)';for(let lo=0;lo<=180;lo+=30){const [a,b]=P([lo,46]),[,d]=P([lo,-82]);x.beginPath();x.moveTo(a,b);x.lineTo(a,d);x.stroke()}for(let la=40;la>=-80;la-=20){const [a,b]=P([-20,la]),[e]=P([186,la]);x.beginPath();x.moveTo(a,b);x.lineTo(e,b);x.stroke()}
 const trace=L=>{x.beginPath();L.forEach((q,i)=>i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]))};
 const poly=(k,alpha,dash)=>{const D=PL407[k];trace(D.p.map(p=>P(pt407(k,p,t))));x.closePath();x.globalAlpha=alpha;if(dash){x.setLineDash([6,5]);x.strokeStyle=D.c;x.lineWidth=2;x.stroke();x.setLineDash([])}else{x.fillStyle=D.c;x.fill();x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=1;x.stroke()}x.globalAlpha=1};
 KEYS407.forEach(k=>{const D=PL407[k],v=D.vis?D.vis(t):1;if(v<=0)return;const noye=D.noye&&D.noye(t);poly(k,v*(noye?.6:1),noye)});
 if(t<25){[[[172.6,-34.4],[178.5,-37.7],[175,-41.5],[174,-39.5]],[[172.7,-40.5],[174.3,-41.7],[171,-44.5],[166.5,-46],[168,-44]]].forEach(L=>{trace(L.map(p=>P(pt407('zelandie',p,t))));x.closePath();x.fillStyle='#8aa088';x.fill()})}
 // Mauritia : des éclats de continent entre l'Inde et Madagascar, éparpillés entre 88 et 60 Ma
 if(t<=95){const a=Math.max(0,Math.min(1,(95-t)/10));x.globalAlpha=a;x.fillStyle='#e0c070';[[52,-14],[54,-17],[56.5,-19.5],[58,-21],[60,-16],[61,-11]].forEach((p,i)=>{const e=t>60?Math.min(1,(95-t)/35):1,q=[p[0]+(i-2.5)*1.2*e,p[1]],[X,Y]=P(q);x.beginPath();x.arc(X,Y,Math.max(2,s*.5),0,7);x.fill()});x.globalAlpha=1}
 // le point chaud (aujourd'hui sous La Réunion), le Deccan, la traînée
 if(t<=75){const [X,Y]=P([55.5,-21.1]),pu=.5+.5*Math.sin(performance.now()/250);x.fillStyle='rgba(255,90,30,'+(.55+.35*pu)+')';x.beginPath();x.arc(X,Y,s*1.1,0,7);x.fill();
  if(t<=68){const [a,b]=P(pt407('inde',[75,19],t));x.fillStyle='rgba(60,40,40,.85)';x.beginPath();x.ellipse(a,b,s*3.2,s*2.4,0,0,7);x.fill()}
  if(t<=3){x.strokeStyle='rgba(255,140,60,.85)';x.setLineDash([3,4]);x.lineWidth=2;trace([[74,17],[73,11],[73,4],[72,-6],[60,-12],[57.5,-20.3],[55.5,-21.1]].map(P));x.stroke();x.setLineDash([])}}
 if(t<=50){x.globalAlpha=Math.min(1,(50-t)/12);x.fillStyle='#f4f4f0';for(let i=0;i<9;i++){const [X,Y]=P([75+i*2.2,32-i*.55]);x.beginPath();x.moveTo(X-s*1.2,Y+s);x.lineTo(X,Y-s*1.4);x.lineTo(X+s*1.2,Y+s);x.fill()}x.globalAlpha=1}
 if(t<=31){x.globalAlpha=Math.min(1,(31-t)/6);const [X,Y]=P([39,9]);x.fillStyle='#5a3a2a';x.beginPath();x.ellipse(X,Y,s*5,s*4,0,0,7);x.fill();x.globalAlpha=1}
 if(t<=22){x.strokeStyle='rgba(30,20,10,.85)';x.lineWidth=2;trace([[42,12],[38,6],[36,0],[35,-8],[34.5,-14]].map(P));x.stroke()}
 if(t<=10){x.fillStyle='#3a7ab0';[[33,-1,1.6],[29.5,-6,.7],[34.5,-12,.6]].forEach(([lo,la,r])=>{const [X,Y]=P([lo,la]);x.beginPath();x.ellipse(X,Y,s*r,s*r*1.5,0,0,7);x.fill()})}
 if(t<=6){x.strokeStyle='#4a90d0';x.lineWidth=2;trace([[37.3,11.6],[35,13],[32.5,15.6],[32.5,20],[31,26],[31,30]].map(P));x.stroke()}
 x.font='600 '+Math.max(11,Math.round(s*2.1))+'px Georgia,serif';x.textAlign='center';
 KEYS407.forEach(k=>{const D=PL407[k];if(!D.n||(D.vis&&D.vis(t)<=0))return;const [cx,cy]=cent407(k),[X,Y]=P(pt407(k,[cx,cy],t)),n=D.noye&&D.noye(t);x.fillStyle=n?'rgba(200,230,210,.95)':'rgba(20,14,8,.85)';x.fillText(D.n+(n?' (sous la mer)':''),X,Y)});
 x.fillStyle='#ffe6a0';if(t<=95&&t>=50){const [X,Y]=P([57,-9]);x.fillText('Mauritia',X,Y)}
 if(t<=31){const [X,Y]=P([46,8]);x.fillText('Éthiopie',X,Y)}if(t<=50){const [X,Y]=P([84,37]);x.fillStyle='#ffffff';x.fillText('Himalaya',X,Y)}
 if(t<=75){const [X,Y]=P([55.5,-21.1]);x.fillStyle='#ffb070';x.fillText(t<=3?'La Réunion':'point chaud',X,Y+s*3.2)}
 if(mythe){x.globalAlpha=Math.min(1,mythe);x.setLineDash([8,6]);x.lineWidth=2.5;
  x.strokeStyle='#e8c070';trace([[40,-2],[52,8],[65,4],[78,6],[100,-5],[118,-15],[125,-30],[100,-40],[70,-38],[48,-30],[42,-18]].map(P));x.closePath();x.stroke();
  x.strokeStyle='#ff9a6a';x.fillStyle='rgba(255,150,100,.2)';trace([[74,7],[82,6],[86,-2],[80,-12],[70,-10],[68,-2]].map(P));x.closePath();x.fill();x.stroke();x.setLineDash([]);
  x.fillStyle='#ffd0b0';let [X,Y]=P([77,-4]);x.fillText('Kumari Kandam',X,Y);x.font='italic '+Math.max(10,Math.round(s*1.6))+'px Georgia,serif';x.fillText('(mythe tamoul)',X,Y+s*2.2);
  [X,Y]=P([95,-31]);x.fillStyle='#f0d090';x.fillText('« Lémurie » (hypothèse de 1864, abandonnée)',X,Y);x.globalAlpha=1}
 x.font='600 '+Math.max(14,Math.round(s*3))+'px Georgia,serif';x.textAlign='left';x.fillStyle='#f4ecd8';x.fillText(mythe?'Le mythe':(t<1?'Aujourd’hui':'Il y a '+Math.round(t)+' millions d’années'),ox+s*3,oy+s*6);
 x.font='italic 12px Georgia,serif';x.fillStyle='rgba(244,236,216,.6)';x.fillText(mythe?'Ce que racontent les récits — pas une carte du passé.':'Schéma simplifié : formes et positions approchées.',ox+s*3,oy+s*5+18)}
// ---------- la légende dessinée : un parchemin, la terre de Kumari, la mer qui monte, le cœur qui sombre ----------
function legende407(ph,k){const c=cvs407();c.style.opacity=1;const W=c.width=innerWidth,H=c.height=innerHeight,x=en407(c.getContext('2d'));
 const sx=W/(VUE407.lo1-VUE407.lo0),sy=H*.64/(VUE407.la0-VUE407.la1),s=Math.min(sx*.96,sy),ox=(W-s*(VUE407.lo1-VUE407.lo0))/2,oy=H*.12,P=([lo,la])=>[ox+(lo-VUE407.lo0)*s,oy+(VUE407.la0-la)*s];
 const g=x.createRadialGradient(W/2,H/2,H*.1,W/2,H/2,H*.9);g.addColorStop(0,'#efe2c2');g.addColorStop(1,'#b89a68');x.fillStyle=g;x.fillRect(0,0,W,H);
 const trace=L=>{x.beginPath();L.forEach((q,i)=>i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]))};
 // les terres d'aujourd'hui, à peine esquissées à l'encre
 x.strokeStyle='rgba(90,60,30,.35)';x.lineWidth=1.2;['afrique','arabie','madagascar','inde','asie','australie'].forEach(n=>{trace(PL407[n].p.map(P));x.closePath();x.stroke()});
 // Kumari Kandam : la grande terre du sud, de la côte d'Afrique au sud de l'Inde et jusqu'à Java ; l'Éthiopie, l'Arabie et l'Inde
 // y sont soudées — elles se détachent et survivent, le reste sombre
 const KK=[[41,2],[50,5],[62,6],[72,7],[77,7.6],[80,5.6],[86,2],[91.8,-9.2],[102.2,-11.8],[107.7,-15.4],[114.4,-22.7],[115,-35.2],[100,-35],[81.7,-52.9],[78,-38],[56,-37],[40,-33],[33,-26],[35,-17],[38.2,-15.7],[39.5,-15.2],[39.8,-16.5],[40,-16.5],[42.4,-17.8],[40.8,-17],[40,-15.2],[40.3,-15.2],[41.3,-16.2],[41.6,-13.1],[39,-9]];
 const eau=ph===0?0:ph===1?k*.45:ph===2?.45+k*.55:1,det=ph===0?0:ph===1?k*.4:ph===2?.4+k*.6:1;
 const ETH=[[32,16],[37,18],[39,16],[43,12.5],[51,12],[48,6],[44,2],[41,2],[37,3],[34,6],[33,10]];
 // placement posé dans l'atelier : chaque terre est posée DANS le bloc, visible avec son contour, puis s'en détache en tournant et remonte à sa place
 const sur=[['arabie',PL407.arabie.p,[17.09,-25.92],0],['ethiopie',ETH,[6.72,-16.04],-28],['inde',PL407.inde.p,[4.41,-22.46],0]];
 const ud=det<=0?0:det>=1?1:det*det*(3-2*det),dp=d=>[d[0]*(1-ud),d[1]*(1-ud)];
 const mv=(L,d0,r0)=>{let cx=0,cy=0;L.forEach(p=>{cx+=p[0];cy+=p[1]});cx/=L.length;cy/=L.length;const a=r0*(1-ud)*Math.PI/180,co=Math.cos(a),si=Math.sin(a),d=dp(d0);
  return L.map(([lo,la])=>{const X=lo-cx,Y=la-cy;return[cx+X*co-Y*si+d[0],cy+X*si+Y*co+d[1]]})};
 x.strokeStyle='rgba(120,80,30,.75)';x.lineWidth=3.6;trace(KK.map(P));x.closePath();x.stroke();x.fillStyle='rgb(166,163,98)';x.fill();
 x.save();trace(KK.map(P));x.closePath();x.clip();
 // monts de Kumari, rivière Pahruli
 x.fillStyle='rgba(110,80,50,.8)';[[70,-12],[74,-14],[78,-13],[82,-15],[76,-18]].forEach(p=>{const [X,Y]=P(p);x.beginPath();x.moveTo(X-s*1.4,Y+s);x.lineTo(X,Y-s*1.6);x.lineTo(X+s*1.4,Y+s);x.fill()});
 x.strokeStyle='rgba(40,90,150,.8)';x.lineWidth=2.5;trace([[76,-15],[77,-8],[78,-2],[78,4],[77.5,7.5]].map(P));x.stroke();
 // la mer prend la terre du sud, et elle seule
 if(eau>0){const [,yS]=P([0,-40]),[,yN]=P([0,8]),yl=yS+(yN-yS)*eau;const w=x.createLinearGradient(0,yl-6,0,yS);w.addColorStop(0,'rgba(40,90,130,.0)');w.addColorStop(.04,'rgba(40,90,130,.85)');w.addColorStop(1,'rgba(10,30,60,.95)');x.fillStyle=w;x.fillRect(0,yl-6,W,H)}
 x.restore();
 {const al=1;if(al>0){x.globalAlpha=al;sur.forEach(([n,L,d0,r0])=>{trace(mv(L,d0,r0).map(P));x.closePath();x.fillStyle='rgb(166,163,98)';x.fill();x.strokeStyle='rgba(120,80,30,.75)';x.lineWidth=2;x.stroke()});x.globalAlpha=1}}
 // la fracture : là où l'Éthiopie, l'Arabie et l'Inde se détachent
 if(false){x.strokeStyle='rgba(60,30,10,'+(.8*(1-det))+')';x.setLineDash([4,3]);x.lineWidth=2;[[[41,2],[50,5],[62,6],[72,7]],[[77,7.6],[80,5.6]]].forEach(L=>{trace(L.map(P));x.stroke()});x.setLineDash([])}
 x.font='600 '+Math.max(10,Math.round(s*1.7))+'px Georgia,serif';x.textAlign='center';x.fillStyle='#4a3014';
 [['Arabie',[46,22],[17.09,-25.92]],['Éthiopie',[39,9],[6.72,-16.04]],['Inde',[78,20],[4.41,-22.46]]].forEach(([n,p,d0])=>{const d=dp(d0);const [X,Y]=P([p[0]+d[0],p[1]+d[1]]);x.fillText(n,X,Y)});x.globalAlpha=1;
 x.font='600 '+Math.max(11,Math.round(s*2))+'px Georgia,serif';x.textAlign='center';
 const cite=(p,n,disp)=>{const [X,Y]=P(p);x.globalAlpha=disp?.35:1;x.fillStyle=disp?'#2a4a6a':'#5a2a10';x.beginPath();x.arc(X,Y,s*.7,0,7);x.fill();x.fillText(n,X,Y-s*1.4);x.globalAlpha=1};
 cite([76,-24],'Then Madurai',ph>=1&&(ph>1||k>.5));cite([80,-6],'Kapatapuram',ph>=2&&(ph>2||k>.5));cite([78+4.41*(1-ud),9.9-22.46*(1-ud)],'Madurai',false);
 x.fillStyle='#5a3a1a';{const [X,Y]=P([96,-14]);x.fillText(ph<2?'Kumari Nadu':'',X,Y)}{const [X,Y]=P([68,-8]);if(ph<2)x.fillText('rivière Pahruli',X,Y)}
 // au premier Sangam, les dieux parmi les poètes : le trident de Shiva, la lance (vel) de Murugan, le cercle des sages
 if(ph<=1){const [X,Y]=P([76,-25]),a=ph===0?Math.min(1,k*2):1-k,pu=.7+.3*Math.sin(performance.now()/400);x.globalAlpha=a;const r=x.createRadialGradient(X,Y-s*4,1,X,Y-s*4,s*7);r.addColorStop(0,'rgba(255,230,150,'+(.8*pu)+')');r.addColorStop(1,'rgba(255,230,150,0)');x.fillStyle=r;x.beginPath();x.arc(X,Y-s*4,s*7,0,7);x.fill();
  x.strokeStyle='#7a3a10';x.lineWidth=2;const tx=X-s*2.2,ty=Y-s*3;x.beginPath();x.moveTo(tx,ty+s*3);x.lineTo(tx,ty-s*2);x.moveTo(tx-s,ty-s*1.2);x.quadraticCurveTo(tx-s,ty,tx,ty);x.quadraticCurveTo(tx+s,ty,tx+s,ty-s*1.2);x.stroke();
  const vx=X+s*2.2;x.beginPath();x.moveTo(vx,ty+s*3);x.lineTo(vx,ty-s*.8);x.stroke();x.fillStyle='#7a3a10';x.beginPath();x.moveTo(vx,ty-s*2.4);x.lineTo(vx-s*.7,ty-s*.8);x.lineTo(vx+s*.7,ty-s*.8);x.fill();
  x.fillStyle='#5a2a10';for(let i=0;i<10;i++){const a2=i/10*6.28;x.beginPath();x.arc(X+Math.cos(a2)*s*3.2,Y+s*.4+Math.sin(a2)*s*1.2,s*.35,0,7);x.fill()}x.globalAlpha=1}
 // les survivants fuient vers le nord avec l'étincelle
 if(ph===2&&k>.35){const u=(k-.35)/.65;for(let i=0;i<14;i++){const p0=[70+i*1.6,-14+(i%3)*2],p1=[76+(i%5)*1.2,10+(i%4)],q=[p0[0]+(p1[0]-p0[0])*u,p0[1]+(p1[1]-p0[1])*u],[X,Y]=P(q);x.fillStyle='rgba(255,210,120,'+(.9-u*.3)+')';x.beginPath();x.arc(X,Y,s*.45,0,7);x.fill()}}
 // le cœur qui sombre dans les abysses
 if(ph>=2){const [X,Y0]=P([84,-22]),Y=Y0+(ph===2?k:1)*H*.18,a=ph===2?1-k*.5:.5,pu=.6+.4*Math.sin(performance.now()/300);const r=x.createRadialGradient(X,Y,1,X,Y,s*4);r.addColorStop(0,'rgba(255,200,120,'+(a*pu)+')');r.addColorStop(1,'rgba(255,200,120,0)');x.fillStyle=r;x.beginPath();x.arc(X,Y,s*4,0,7);x.fill()}
 if(ph===3){x.globalAlpha=Math.min(1,k*2);x.font='italic '+Math.max(13,Math.round(s*2.4))+'px Georgia,serif';x.fillStyle='#3a2410';const [X,Y]=P([84,-30]);x.fillText('le berceau perdu',X,Y);x.globalAlpha=1}
 x.font='600 '+Math.max(14,Math.round(s*3))+'px Georgia,serif';x.textAlign='left';x.fillStyle='#3a2410';x.fillText('Kumari Kandam — le mythe',ox+s*3,oy+s*6);
 x.font='italic 12px Georgia,serif';x.fillStyle='rgba(58,36,16,.7)';x.fillText('Ce que racontent les récits — une mémoire, pas une carte.',ox+s*3,oy+s*6+18)}
const T407=(a,b,mythe)=>({f:(U,k)=>dessin407(a+(b-a)*k,mythe?Math.min(1,k*2+.3):0)});
{const cj=cineJouer;cineJouer=function(shots,done){try{if(Array.isArray(shots)&&typeof genese!=='undefined'&&genese.phase!==2){
  const i0=shots.findIndex(s=>/60 millions/.test(s.txt||''));
  if(i0>=0&&!shots.k396){shots.k396=1;const s0=shots[i0],c=s0.cam||[0,0,95,.3,.55],cam=[c[0],c[1],150,5.6,.35];
   const o0=s0.init;
   const avant=[
    {d:10000,cam,init:U=>{try{o0&&o0(U)}catch(e){}},f:(U,k)=>legende407(0,k),txt:'<small>Le mythe · Kumari Kandam</small>Au commencement, disent les récits tamouls, il y avait au sud une terre immense : Kumari Nadu, ses quarante-neuf pays, la rivière Pahruli, les monts de Kumari. Les rois Pandya y régnaient. Au premier Sangam, à Then Madurai, les dieux eux-mêmes — Shiva, Murugan — siégeaient parmi les poètes et les sages, et donnaient aux hommes la langue, les arts, les lois.'},
    {d:9500,cam,f:(U,k)=>legende407(1,k),txt:'<small>Le mythe · la mer prend</small>Un jour, la mer se leva — « kadal kol », la mer qui saisit. Then Madurai disparut sous les vagues. Les poètes emportèrent leurs chants plus au nord, à Kapatapuram, et y tinrent le deuxième Sangam.'},
    {d:9500,cam,f:(U,k)=>legende407(2,k),txt:'<small>Le mythe · le cœur englouti</small>La mer revint et prit Kapatapuram. L’Éthiopie, l’Arabie et l’Inde se détachèrent et restèrent ; des monts de Kumari jusqu’aux rivages de Java, tout le reste sombra ; son cœur repose dans les abysses. Les survivants fuirent vers le nord, emportant l’étincelle de cette sagesse. Il ne resta que la pointe de l’Inde — Kanyakumari — et la mémoire des poèmes, portée jusqu’au troisième Sangam, à Madurai.'},
    {d:10000,cam,f:(U,k)=>legende407(3,k),txt:'<small>Ce que garde le mythe</small>Pour ceux qui y croient, ce n’est pas une légende : c’est la patrie première, bénie des dieux, une mémoire vivante gardée dans la langue, les chants et les rites. Comme l’Atlantide ou l’Éden, c’est un berceau perdu — et la mémoire de la mer qui avance. Le mythe ne se mesure pas en millions d’années. La roche, elle, raconte une autre naissance.'},
    {d:8500,cam,...T407(200,160),txt:'<small>Il y a 200 millions d’années · ce que dit la roche</small>Un seul bloc, le Gondwana : l’Afrique, l’Arabie, Madagascar, l’Inde, l’Antarctique, l’Australie et la Zélandie sont soudées.'},
    {d:9500,cam,...T407(160,88),txt:'<small>De 160 à 88 millions d’années</small>Madagascar et l’Inde quittent l’Afrique ; puis l’Inde quitte Madagascar. Entre les deux, un petit continent se déchire en éclats : Mauritia. Il en reste des grains de pierre vieux de près de trois milliards d’années, sous Maurice.'},
    {d:8000,cam,...T407(88,66),txt:'<small>Il y a 66 millions d’années</small>L’Inde file vers le nord et passe au-dessus d’un point chaud : la lave noie le Deccan. Ce point chaud est celui qui brûle aujourd’hui sous La Réunion.'},
    {d:9500,cam,...T407(66,31),txt:'<small>De 50 à 30 millions d’années · ce que dit la roche</small>Vers 50 millions d’années, l’Inde heurte l’Asie. Son bord nord plonge sous le continent, et l’Himalaya commence à se lever ; ses très hauts sommets se bâtissent surtout depuis 20 millions d’années, et il monte encore aujourd’hui. Le mythe de Kumari n’en parle pas : c’est la roche qui le raconte. Au sud, l’Australie se détache de l’Antarctique ; la Zélandie, elle, s’enfonce : c’est le vrai continent englouti — la Nouvelle-Zélande en est le sommet.'},
    {d:10000,cam,...T407(31,0),txt:'<small>De 30 millions d’années à aujourd’hui</small>Sous l’Éthiopie, un panache de roche brûlante soulève les hauts plateaux et les couvre de basaltes. L’Arabie s’écarte : la mer Rouge s’ouvre. L’Afrique de l’Est se fend — le rift — et ses grands lacs se remplissent ; le Nil Bleu descend des montagnes d’Éthiopie.'}];
   // le plan « 60 millions d'années » redisait le Deccan déjà montré sur la carte : on le retire, et son réglage du relief passe au plan suivant
   const s1=shots[i0+1];if(s1){if(/traînée/.test(s1.txt||''))s1.txt='<small>Des millions d’années</small>Le point chaud, lui, ne bouge pas. Derrière l’Inde, il laisse une traînée d’îles — les Laquedives, les Maldives, les Chagos — puis passe sous les Mascareignes : il fait naître Maurice, puis La Réunion.';const o1=s1.init;s1.init=U=>{fin407();try{o0&&o0(U)}catch(e){}try{o1&&o1(U)}catch(e){}}}
   shots.splice(i0,1,...avant)}
  const ic=shots.findIndex(s=>/trois cirques/.test(s.txt||''));
  if(ic>=0&&!shots.r396){shots.r396=1;let rx=0,rz=0;try{[rx,rz]=xz(55.40,-21.02)}catch(e){}
   shots.splice(ic+1,0,{d:7500,cam:[rx,rz,34,.2,.82],f:(U,k)=>{try{U.lave.value=0}catch(e){}},txt:'<small>Jusqu’à aujourd’hui</small>Sur les flancs du volcan endormi, chaque pluie, chaque cyclone creuse un peu plus les grandes rivières : Rivière des Galets, du Mât, Saint-Étienne, de l’Est. Au sud, la Rivière des Remparts entaille la vieille Fournaise.'})}
  if(shots.k396){const d0=done;done=function(){fin407();return d0&&d0.apply(this,arguments)}}
 }}catch(e){console.warn(e)}return cj.apply(this,arguments)}}
// « Passer » ferme aussi la carte
document.addEventListener('click',e=>{if(e.target&&e.target.id==='cineP')fin407()},true);
// ---------- en anglais ----------
try{Object.assign(window.TR363=window.TR363||{},{
 'Kumari Kandam — le mythe':'Kumari Kandam — the myth','Ce que racontent les récits — une mémoire, pas une carte.':'What the stories tell — a memory, not a map.','Schéma simplifié : formes et positions approchées.':'Simplified diagram: approximate shapes and positions.',
 'Aujourd’hui':'Today','Le mythe':'The myth','Afrique':'Africa','Arabie':'Arabia','Inde':'India','Asie':'Asia','Antarctique':'Antarctica','Australie':'Australia','Zélandie':'Zealandia','Éthiopie':'Ethiopia','point chaud':'hotspot','La Réunion':'Réunion',
 'rivière Pahruli':'Pahruli river','le berceau perdu':'the lost cradle','(mythe tamoul)':'(Tamil myth)','« Lémurie » (hypothèse de 1864, abandonnée)':'“Lemuria” (1864 hypothesis, abandoned)',
 'Le mythe · Kumari Kandam':'The myth · Kumari Kandam','Le mythe · la mer prend':'The myth · the sea takes','Le mythe · le cœur englouti':'The myth · the swallowed heart','Ce que garde le mythe':'What the myth keeps',
 'Il y a 200 millions d’années · ce que dit la roche':'200 million years ago · what the rock says','De 160 à 88 millions d’années':'From 160 to 88 million years ago','Il y a 66 millions d’années':'66 million years ago','De 50 à 30 millions d’années':'From 50 to 30 million years ago','De 50 à 30 millions d’années · ce que dit la roche':'From 50 to 30 million years ago · what the rock says','De 30 millions d’années à aujourd’hui':'From 30 million years ago to today','Des millions d’années':'Millions of years','Jusqu’à aujourd’hui':'Until today',
 'Au commencement, disent les récits tamouls, il y avait au sud une terre immense : Kumari Nadu, ses quarante-neuf pays, la rivière Pahruli, les monts de Kumari. Les rois Pandya y régnaient. Au premier Sangam, à Then Madurai, les dieux eux-mêmes — Shiva, Murugan — siégeaient parmi les poètes et les sages, et donnaient aux hommes la langue, les arts, les lois.':'In the beginning, say the Tamil stories, there was a vast land to the south: Kumari Nadu, its forty-nine countries, the Pahruli river, the Kumari mountains. The Pandya kings ruled there. At the first Sangam, in Then Madurai, the gods themselves — Shiva, Murugan — sat among the poets and sages, and gave humankind language, the arts, the laws.',
 'Un jour, la mer se leva — « kadal kol », la mer qui saisit. Then Madurai disparut sous les vagues. Les poètes emportèrent leurs chants plus au nord, à Kapatapuram, et y tinrent le deuxième Sangam.':'One day the sea rose — “kadal kol”, the sea that seizes. Then Madurai vanished beneath the waves. The poets carried their songs further north, to Kapatapuram, and held the second Sangam there.',
 'La mer revint et prit Kapatapuram. L’Éthiopie, l’Arabie et l’Inde se détachèrent et restèrent ; des monts de Kumari jusqu’aux rivages de Java, tout le reste sombra ; son cœur repose dans les abysses. Les survivants fuirent vers le nord, emportant l’étincelle de cette sagesse. Il ne resta que la pointe de l’Inde — Kanyakumari — et la mémoire des poèmes, portée jusqu’au troisième Sangam, à Madurai.':'The sea came back and took Kapatapuram. Ethiopia, Arabia and India broke away and remained; from the Kumari mountains to the shores of Java, all the rest sank; its heart lies in the abyss. The survivors fled north, carrying the spark of that wisdom. Only the tip of India remained — Kanyakumari — and the memory of the poems, carried to the third Sangam, in Madurai.',
 'Pour ceux qui y croient, ce n’est pas une légende : c’est la patrie première, bénie des dieux, une mémoire vivante gardée dans la langue, les chants et les rites. Comme l’Atlantide ou l’Éden, c’est un berceau perdu — et la mémoire de la mer qui avance. Le mythe ne se mesure pas en millions d’années. La roche, elle, raconte une autre naissance.':'For those who believe, it is not a legend: it is the first homeland, blessed by the gods, a living memory kept in the language, the songs and the rites. Like Atlantis or Eden, it is a lost cradle — and the memory of the advancing sea. The myth is not measured in millions of years. The rock tells of another birth.',
 'Un seul bloc, le Gondwana : l’Afrique, l’Arabie, Madagascar, l’Inde, l’Antarctique, l’Australie et la Zélandie sont soudées.':'A single block, Gondwana: Africa, Arabia, Madagascar, India, Antarctica, Australia and Zealandia are joined together.',
 'Madagascar et l’Inde quittent l’Afrique ; puis l’Inde quitte Madagascar. Entre les deux, un petit continent se déchire en éclats : Mauritia. Il en reste des grains de pierre vieux de près de trois milliards d’années, sous Maurice.':'Madagascar and India leave Africa; then India leaves Madagascar. Between them, a small continent tears into shards: Mauritia. Grains of rock nearly three billion years old remain from it, beneath Mauritius.',
 'L’Inde file vers le nord et passe au-dessus d’un point chaud : la lave noie le Deccan. Ce point chaud est celui qui brûle aujourd’hui sous La Réunion.':'India races north and passes over a hotspot: lava floods the Deccan. That hotspot is the one burning today beneath Réunion.',
 'Vers 50 millions d’années, l’Inde heurte l’Asie. Son bord nord plonge sous le continent, et l’Himalaya commence à se lever ; ses très hauts sommets se bâtissent surtout depuis 20 millions d’années, et il monte encore aujourd’hui. Le mythe de Kumari n’en parle pas : c’est la roche qui le raconte. Au sud, l’Australie se détache de l’Antarctique ; la Zélandie, elle, s’enfonce : c’est le vrai continent englouti — la Nouvelle-Zélande en est le sommet.':'Around 50 million years ago, India strikes Asia. Its northern edge dives beneath the continent, and the Himalaya begins to rise; its highest peaks were mostly built over the last 20 million years, and it is still rising today. The Kumari myth says nothing of it: the rock tells this story. To the south, Australia breaks away from Antarctica; Zealandia sinks: it is the real sunken continent — New Zealand is its summit.',
 'Sous l’Éthiopie, un panache de roche brûlante soulève les hauts plateaux et les couvre de basaltes. L’Arabie s’écarte : la mer Rouge s’ouvre. L’Afrique de l’Est se fend — le rift — et ses grands lacs se remplissent ; le Nil Bleu descend des montagnes d’Éthiopie.':'Beneath Ethiopia, a plume of burning rock lifts the highlands and covers them with basalt. Arabia pulls away: the Red Sea opens. East Africa splits — the rift — and its great lakes fill; the Blue Nile flows down from the Ethiopian mountains.',
 'Le point chaud, lui, ne bouge pas. Derrière l’Inde, il laisse une traînée d’îles — les Laquedives, les Maldives, les Chagos — puis passe sous les Mascareignes : il fait naître Maurice, puis La Réunion.':'The hotspot itself does not move. Behind India it leaves a trail of islands — the Lakshadweep, the Maldives, the Chagos — then passes beneath the Mascarenes: it gives birth to Mauritius, then Réunion.',
 'Sur les flancs du volcan endormi, chaque pluie, chaque cyclone creuse un peu plus les grandes rivières : Rivière des Galets, du Mât, Saint-Étienne, de l’Est. Au sud, la Rivière des Remparts entaille la vieille Fournaise.':'On the flanks of the sleeping volcano, every rain, every cyclone carves the great rivers a little deeper: Rivière des Galets, du Mât, Saint-Étienne, de l’Est. To the south, the Rivière des Remparts cuts into the old Fournaise.'})}catch(e){}
