// ===== p303 : sur la carte du point chaud, le mythe et le vrai côte à côte =====
// Kumari Kandam (légende tamoule, récits des XIXᵉ-XXᵉ siècles) : une terre au sud de l'Inde, en pointillés, qui part avec l'Inde.
// Le vrai : Mauritia, un petit continent resté en arrière entre Madagascar et l'Inde, déchiré par le point chaud et englouti ;
// ses zircons dorment sous Maurice. Les Seychelles se détachent de l'Inde vers 64 millions d'années et restent au-dessus de l'eau.
const KUM303=[[77.5,8],[79.2,6],[79.8,3],[79,0],[77,-2.2],[74.5,-2.8],[72.3,-1.5],[71.8,1.2],[72.8,4.2],[74.6,7],[76,9.5]];
const MAU303=[[57.5,-9.5],[60.8,-9],[62.5,-11.5],[61.5,-15],[59,-17.5],[57,-19.5],[55.8,-17],[56.3,-13]];
const SEY303=[[54.5,-3.8],[56.5,-3.6],[56.8,-5.2],[55,-5.6]];
{const g0=g168Carte;g168Carte=function(k,phase){g0.apply(this,arguments);try{const c=GEN168.cv;if(!c)return;const x=c.getContext('2d'),W=c.width,H=c.height;
 // même projection que la carte
 const L0=30,L1=100,A0=30,A1=-36,top=H*.1,hh=H*.62,sc=Math.min(W/(L1-L0),hh/(A0-A1)),ox=(W-sc*(L1-L0))/2,oy=top+(hh-sc*(A0-A1))/2,P=(lo,la)=>[ox+(lo-L0)*sc,oy+(A0-la)*sc];
 const u=phase===1?0:Math.min(1,k*1.05),dl=-14.5*(1-u),da=-31.5*(1-u);
 const trace=(L,dx,dy)=>{x.beginPath();L.forEach(([lo,la],i)=>{const [a,b]=P(lo+dx,la+dy);i?x.lineTo(a,b):x.moveTo(a,b)});x.closePath()};
 const fs=Math.max(11,sc*.75|0);x.textAlign='center';x.textBaseline='middle';
 // Mauritia : le vrai, déjà sous l'eau ; il s'assombrit à mesure que le point chaud le déchire
 // il y a 66 millions d'années, les Seychelles et les morceaux de Mauritia tenaient encore au flanc ouest de l'Inde ; ils s'en détachent
 const f=phase===1?Math.min(1,k)*.12:.12+.88*Math.min(1,u/.6)*Math.min(1,u/.6)*(3-2*Math.min(1,u/.6)),ec=(c0,att)=>[(att[0]+dl-c0[0])*(1-f),(att[1]+da-c0[1])*(1-f)];
 const oM=ec([59,-13.5],[70.6,11]),oS=ec([55.6,-4.6],[71.2,17]);
 const sub=phase===1?.55:Math.max(.2,.55-u*.35);trace(MAU303,oM[0],oM[1]);x.fillStyle='rgba(90,130,150,'+sub+')';x.fill();x.setLineDash([]);x.strokeStyle='rgba(150,200,220,.7)';x.lineWidth=1.2;x.stroke();
 {const bas=f<.5,[a,b]=bas?P(59+oM[0],-19.6+oM[1]):P(55.4+oM[0],-12.5+oM[1]);x.textAlign=bas?'center':'right';x.font='600 '+fs+'px system-ui';x.fillStyle='#bfe4f2';x.fillText('Mauritia',a,b-fs*.55);x.font=(fs-2)+'px system-ui';x.fillStyle='rgba(191,228,242,.85)';x.fillText('englouti · réel',a,b+fs*.55);x.textAlign='center'}
 // les Seychelles : se détachent de l'Inde, restent à l'air
 trace(SEY303,oS[0],oS[1]);x.fillStyle='#7a7050';x.fill();{const [a,b]=P(55.6+oS[0]-3,-2.2+oS[1]);x.font='600 '+(fs-1)+'px system-ui';x.fillStyle='#f4ead0';x.fillText('Seychelles',a,b-fs*.3)}
 // Kumari Kandam : la légende, en pointillés dorés, accrochée à l'Inde ; elle s'efface quand l'Inde remonte
 // la légende parle de la terre au sud du cap Comorin, telle qu'elle est aujourd'hui : elle n'apparaît qu'une fois l'Inde à sa place
 const al=phase===1?0:.9*Math.max(0,Math.min(1,(u-.6)/.3));if(al>0){trace(KUM303,dl,da);x.fillStyle='rgba(212,170,80,'+(al*.18)+')';x.fill();x.setLineDash([6,5]);x.strokeStyle='rgba(232,196,110,'+al+')';x.lineWidth=1.6;x.stroke();x.setLineDash([]);
  const [a,b]=P(71+dl,2+da);x.textAlign='right';x.font='italic 600 '+fs+'px Georgia,serif';x.fillStyle='rgba(244,214,140,'+al+')';x.fillText('Kumari Kandam',a,b-fs*.55);x.font='italic '+(fs-2)+'px Georgia,serif';x.fillText('légende tamoule : au sud du cap Comorin',a,b+fs*.55);x.textAlign='center'}
 // la légende des tracés, discrète, en haut à droite
 x.textAlign='left';x.font=(fs-1)+'px system-ui';const lx=W-Math.max(x.measureText('terre engloutie, prouvée par les roches').width,x.measureText('légende, jamais retrouvée sous la mer').width)-54,ly=top+fs;x.setLineDash([6,5]);x.strokeStyle='rgba(232,196,110,.9)';x.beginPath();x.moveTo(lx,ly);x.lineTo(lx+22,ly);x.stroke();x.setLineDash([]);x.fillStyle='rgba(244,234,208,.85)';x.fillText('légende, jamais retrouvée sous la mer',lx+28,ly);
 x.fillStyle='rgba(90,130,150,.7)';x.fillRect(lx,ly+fs*1.2-5,22,10);x.fillStyle='rgba(244,234,208,.85)';x.fillText('terre engloutie, prouvée par les roches',lx+28,ly+fs*1.2)}catch(e){}}}
