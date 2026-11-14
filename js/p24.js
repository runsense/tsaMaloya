// ===== p24 : la ville de la Construction dessinée comme un plan — maisons, chemins, champs, paille, bétail, bois, carrières =====
// Tout se tient sur la carte continue : pas d'icônes en grille. Les lieux restent cliquables (clic : choisir, clic droit : que faire).
function kH(i,k){let s=(i*374761393+k*668265263)>>>0;s=(s^(s>>>13))*1274126177>>>0;return ((s^(s>>>16))>>>0)/4294967296}
function kVilleDessin(x,P,Rh,c,L,W,H){
 const tri=(cx,cy,ang,f)=>{x.save();x.translate(cx,cy);x.rotate(ang);f();x.restore()};
 const ombre=(w,h)=>{x.fillStyle='rgba(0,0,0,.28)';x.fillRect(-w/2+Rh*.04,-h/2+Rh*.05,w,h)};
 // une maison vue d'en haut : l'ombre, puis le toit en deux pans, plus clair côté soleil
 const maison=(cx,cy,w,h,ang,toit,mur)=>tri(cx,cy,ang,()=>{ombre(w,h);x.fillStyle=mur||'#d8ccb0';x.fillRect(-w/2,-h/2,w,h);x.fillStyle=toit;x.fillRect(-w/2,-h/2,w,h/2);const g=x.fillStyle;x.fillStyle='rgba(255,255,255,.18)';x.fillRect(-w/2,-h/2,w,h/2);x.fillStyle=toit;x.globalAlpha=.85;x.fillRect(-w/2,0,w,h/2);x.globalAlpha=1;x.strokeStyle='rgba(30,20,10,.55)';x.lineWidth=1;x.strokeRect(-w/2,-h/2,w,h);x.beginPath();x.moveTo(-w/2,0);x.lineTo(w/2,0);x.stroke()});
 const case_=(cx,cy,r)=>{x.fillStyle='rgba(0,0,0,.28)';x.beginPath();x.arc(cx+r*.25,cy+r*.3,r,0,7);x.fill();const g=x.createRadialGradient(cx-r*.3,cy-r*.3,r*.1,cx,cy,r);g.addColorStop(0,'#e0c27a');g.addColorStop(1,'#9a7a3e');x.fillStyle=g;x.beginPath();x.arc(cx,cy,r,0,7);x.fill();x.strokeStyle='rgba(60,40,15,.6)';x.lineWidth=1;x.stroke();x.beginPath();x.moveTo(cx,cy);x.lineTo(cx,cy-r);x.stroke()};
 // un champ : rangs de patates (terre brune, touffes vertes), céréales (rangs dorés), café (buissons sombres)
 const champ=(cx,cy,w,h,ang,k,seed)=>tri(cx,cy,ang,()=>{const C={patate:['#6b4a2a','#4f7a32'],cereale:['#c9a64e','#a8862e'],cafe:['#5a4a2a','#2f5a2a'],jardin:['#4a5a2a','#3f7a32']}[k];x.fillStyle=C[0];x.fillRect(-w/2,-h/2,w,h);
  if(k==='cereale'){for(let y=-h/2;y<h/2;y+=Math.max(2.5,Rh*.07)){x.fillStyle=C[1];x.fillRect(-w/2,y,w,Math.max(1,Rh*.025))}}
  else{const pas=Math.max(3,Rh*.09);for(let y=-h/2+pas/2;y<h/2;y+=pas)for(let xx=-w/2+pas/2;xx<w/2;xx+=pas){x.fillStyle=C[1];x.beginPath();x.arc(xx+(kH(seed,y*7+xx)-.5)*pas*.3,y,pas*(k==='cafe'?.38:.28),0,7);x.fill()}}
  x.strokeStyle='rgba(50,70,30,.9)';x.lineWidth=Math.max(1.5,Rh*.04);x.strokeRect(-w/2,-h/2,w,h)});
 const meule=(cx,cy,r)=>{x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.arc(cx+r*.3,cy+r*.3,r,0,7);x.fill();x.fillStyle='#e2c66a';x.beginPath();x.arc(cx,cy,r,0,7);x.fill();x.strokeStyle='#b8983e';x.lineWidth=1;x.beginPath();for(let a=0;a<12;a+=.3)x.lineTo(cx+Math.cos(a)*r*a/12,cy+Math.sin(a)*r*a/12);x.stroke()};
 const parc=(cx,cy,r,n,seed)=>{x.strokeStyle='#7a5a32';x.lineWidth=Math.max(1,Rh*.03);x.beginPath();for(let k=0;k<=8;k++){const a=k/8*6.283,rr=r*(.85+kH(seed,k)*.2);x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr*.75)}x.stroke();
  for(let k=0;k<n;k++){const a=kH(seed,k+20)*6.283,d=kH(seed,k+40)*r*.6;x.fillStyle=k%3?'#7a4a2a':'#e8e0d0';x.beginPath();x.ellipse(cx+Math.cos(a)*d,cy+Math.sin(a)*d*.7,Rh*.06,Rh*.035,a,0,7);x.fill()}};
 const arbres=(cx,cy,R,n,seed,sombre)=>{for(let k=0;k<n;k++){const a=kH(seed,k)*6.283,d=Math.sqrt(kH(seed,k+99))*R,px=cx+Math.cos(a)*d,py=cy+Math.sin(a)*d,r=Rh*(.1+kH(seed,k+7)*.08);x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.arc(px+r*.3,py+r*.35,r,0,7);x.fill();x.fillStyle=sombre?'#24502e':'#2f6a38';x.beginPath();x.arc(px,py,r,0,7);x.fill();x.fillStyle='rgba(140,200,110,.35)';x.beginPath();x.arc(px-r*.3,py-r*.3,r*.45,0,7);x.fill()}};
 const souches=(cx,cy,R,n,seed)=>{for(let k=0;k<n;k++){const a=kH(seed,k+300)*6.283,d=kH(seed,k+333)*R;x.fillStyle='#8a6a42';x.beginPath();x.arc(cx+Math.cos(a)*d,cy+Math.sin(a)*d,Rh*.035,0,7);x.fill()}x.save();x.translate(cx+R*.4,cy+R*.3);for(let k=0;k<4;k++){x.fillStyle=k%2?'#9a7444':'#7a5a34';x.fillRect(-Rh*.15,-Rh*.03+k*Rh*.05,Rh*.3,Rh*.04)}x.restore()};
 const roches=(cx,cy,R,n,seed,carriere)=>{if(carriere){x.fillStyle='rgba(90,85,80,.75)';x.beginPath();for(let k=0;k<=7;k++){const a=k/7*6.283,rr=R*.55*(.8+kH(seed,k+500)*.4);x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr)}x.fill();x.strokeStyle='rgba(40,35,30,.6)';x.lineWidth=1;x.stroke()}
  for(let k=0;k<n;k++){const a=kH(seed,k+600)*6.283,d=kH(seed,k+650)*R,px=cx+Math.cos(a)*d,py=cy+Math.sin(a)*d,r=Rh*(.05+kH(seed,k+700)*.07);x.fillStyle='#8a867c';x.beginPath();x.moveTo(px-r,py+r*.4);x.lineTo(px-r*.3,py-r);x.lineTo(px+r,py-r*.3);x.lineTo(px+r*.6,py+r*.8);x.closePath();x.fill();x.fillStyle='rgba(255,255,255,.2)';x.fill()}};
 const gens=(cx,cy,n,seed)=>{for(let k=0;k<Math.min(n,10);k++){const a=kH(seed,k+800)*6.283,d=Rh*(.15+kH(seed,k+850)*.45),px=cx+Math.cos(a)*d,py=cy+Math.sin(a)*d;x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.arc(px+1.5,py+1.5,Rh*.045,0,7);x.fill();x.fillStyle=K.joueur==='c'?'#f0e6d0':'#e0b070';x.beginPath();x.arc(px,py,Rh*.045,0,7);x.fill()}};
 const nom=(cx,cy,s)=>{x.font='bold '+Math.max(10,Math.round(Rh*.2))+'px system-ui';x.textAlign='center';x.textBaseline='middle';x.lineWidth=3;x.strokeStyle='rgba(0,0,0,.6)';x.strokeText(s,cx,cy);x.fillStyle='#f6eedb';x.fillText(s,cx,cy)};
 // 1. les chemins : de chaque bâtiment au cœur de la ville ; une route bâtie est empierrée
 const [ca,cb]=P(c),bat=L.filter(t=>(K.b[t.i]||[]).length&&K.vu[t.i]);
 bat.forEach(t=>{if(t===c)return;const [a,b]=P(t),rt=(K.b[t.i]||[]).some(z=>z.k==='route'||z.k==='sentier');x.strokeStyle=rt?'#b8a47a':'rgba(150,120,80,.7)';x.lineWidth=rt?Rh*.12:Rh*.06;if((K.b[t.i]||[]).some(z=>z.k==='sentier'))x.setLineDash([4,4]);x.beginPath();x.moveTo(ca,cb);x.quadraticCurveTo((ca+a)/2+(kH(t.i,1)-.5)*Rh,(cb+b)/2+(kH(t.i,2)-.5)*Rh,a,b);x.stroke();x.setLineDash([])});
 // 2. chaque lieu : le terrain travaillé, puis ce qui y est bâti
 L.forEach(t=>{if(!K.vu[t.i])return;let [a,b]=P(t);const d=hd(c,t),B=K.b[t.i]||[],tr=K.trav[t.i]||{},fo=K.foret[t.i]||0,s=t.i,ang=(kH(s,3)-.5)*.8,jx=(kH(s,4)-.5)*Rh*.25,jy=(kH(s,5)-.5)*Rh*.25;a+=jx;b+=jy;
  // le milieu : la forêt telle qu'elle reste, la pierre, le rivage
  if(fo>15&&!B.length)arbres(a,b,Rh*.85,Math.round(fo/100*16),s,/humide|tamarin/.test(t.biome));else if(fo>15)arbres(a,b,Rh*.95,Math.round(fo/100*6),s);
  if(KACT.pierre.ok(t)&&!B.length)roches(a,b,Rh*.7,(tr.pierre?6:3),s,!!tr.pierre);
  if(KACT.peche.ok(t)){x.strokeStyle='rgba(230,240,250,.45)';x.lineWidth=1.5;for(let k=0;k<3;k++){x.beginPath();x.arc(a+Rh*.4,b+Rh*.4,Rh*(.3+k*.15),3.6,4.6);x.stroke()}}
  // le travail en cours se voit : abattage, culture, chasse, pêche
  if(tr.bois)souches(a,b,Rh*.6,4+tr.bois,s);
  if(tr.culture){champ(a-Rh*.22,b,Rh*.55,Rh*.65,ang,'patate',s);champ(a+Rh*.36,b-Rh*.05,Rh*.45,Rh*.7,ang+.05,'cereale',s+1);meule(a+Rh*.4,b+Rh*.5,Rh*.1)}
  if(tr.peche){x.fillStyle='#6a4a2a';x.beginPath();x.ellipse(a+Rh*.5,b+Rh*.3,Rh*.18,Rh*.06,.5,0,7);x.fill()}
  B.forEach((z,n)=>{const k=z.k,o=n*.5;
   if(k==='habitation'){maison(a,b-Rh*.1,Rh*.6,Rh*.38,ang,'#9a4a3a');for(let i=0;i<3;i++)maison(a-Rh*.45+i*Rh*.2,b+Rh*.38,Rh*.14,Rh*.12,ang,'#8a7a5a','#b89a70');
    // les champs de l'habitation : patates et céréales, la paille en meules pour le bétail
    champ(a+Rh*.62,b-Rh*.25,Rh*.42,Rh*.5,ang,'patate',s+3);champ(a+Rh*.62,b+Rh*.32,Rh*.42,Rh*.4,ang,'cereale',s+4);meule(a+Rh*.15,b+Rh*.62,Rh*.09);meule(a+Rh*.32,b+Rh*.66,Rh*.07);parc(a-Rh*.6,b-Rh*.35,Rh*.26,5,s)}
   else if(k==='champ')champ(a+o*Rh*.2,b,Rh*.9,Rh*.7,ang,'cafe',s+5);
   else if(k==='chapelle'){maison(a+o*Rh*.3,b,Rh*.3,Rh*.45,ang,'#c8c0b0','#e8e0d0');x.strokeStyle='#5a3a2a';x.lineWidth=2;x.beginPath();x.moveTo(a+o*Rh*.3,b-Rh*.32);x.lineTo(a+o*Rh*.3,b-Rh*.12);x.moveTo(a+o*Rh*.3-Rh*.07,b-Rh*.25);x.lineTo(a+o*Rh*.3+Rh*.07,b-Rh*.25);x.stroke()}
   else if(k==='magasin')maison(a-Rh*.3+o*Rh*.3,b+Rh*.2,Rh*.5,Rh*.22,ang,'#7a6a5a','#a89070');
   else if(k==='port'){x.fillStyle='#8a6a42';tri(a+Rh*.3,b+Rh*.3,ang+.6,()=>{x.fillRect(0,-Rh*.05,Rh*.8,Rh*.1);x.fillStyle='#6a4a2a';x.beginPath();x.ellipse(Rh*.55,Rh*.2,Rh*.2,Rh*.07,0,0,7);x.fill()});maison(a-Rh*.15,b,Rh*.35,Rh*.25,ang,'#6a5a4a','#a89070')}
   else if(k==='ville'){for(let i=0;i<7;i++){const aa=i/7*6.283+kH(s,i),rr=Rh*(.25+kH(s,i+9)*.3);maison(a+Math.cos(aa)*rr,b+Math.sin(aa)*rr,Rh*(.18+kH(s,i+3)*.1),Rh*.14,aa,i%2?'#9a4a3a':'#7a5a4a')}x.fillStyle='#b8a47a';x.beginPath();x.arc(a,b,Rh*.12,0,7);x.fill()}
   else if(k==='route'){x.fillStyle='#b8a47a';x.beginPath();x.arc(a,b,Rh*.08,0,7);x.fill()}
   else if(k==='camp'){for(let i=0;i<5;i++){const aa=i/5*6.283+kH(s,i),rr=Rh*.38;case_(a+Math.cos(aa)*rr,b+Math.sin(aa)*rr,Rh*.13)}x.fillStyle='#e8a030';x.beginPath();x.arc(a,b,Rh*.06,0,7);x.fill();x.fillStyle='rgba(255,200,90,.25)';x.beginPath();x.arc(a,b,Rh*.2,0,7);x.fill()}
   else if(k==='jardin'){arbres(a,b,Rh*.7,6,s+7);champ(a-Rh*.2,b+Rh*.2,Rh*.3,Rh*.3,ang+.4,'jardin',s+8);champ(a+Rh*.25,b-Rh*.15,Rh*.28,Rh*.26,ang-.3,'patate',s+9)}
   else if(k==='grenier')case_(a+Rh*.4,b-Rh*.3,Rh*.11);
   else if(k==='guet'){x.fillStyle='rgba(0,0,0,.35)';x.fillRect(a-Rh*.06+Rh*.12,b-Rh*.06+Rh*.12,Rh*.12,Rh*.12);x.fillStyle='#7a5a32';x.fillRect(a-Rh*.06,b-Rh*.06,Rh*.12,Rh*.12)}});
  if(B.some(z=>z.abime)){x.fillStyle='rgba(232,123,90,.25)';x.beginPath();x.arc(a,b,Rh*.7,0,7);x.fill()}
  // les gens au travail, en petits points
  const n=Object.values(tr).reduce((s,v)=>s+v,0);if(n)gens(a,b,Math.ceil(n/3),s);
  if(B.length)nom(a,b+Rh*.72,B.map(z=>KBAT[z.k].n).join(' · '));
  if(KVUE.sel===t.i||KVUE.hsel===t.i){x.beginPath();x.arc(a-jx,b-jy,Rh*.85,0,7);x.lineWidth=KVUE.sel===t.i?2.5:1.2;x.strokeStyle=KVUE.sel===t.i?'#fff':'rgba(255,255,255,.5)';x.stroke();
   if(KVUE.sel===t.i||KVUE.hsel===t.i){const A=Object.values(KACT).filter(q=>q.ok(t)).map(q=>q.n).join(' · ');if(A&&!B.length)nom(a-jx,b-jy-Rh*.95,A)}}});
 // le cercle de ce que la ville tient, par-dessus, discret
 x.beginPath();x.arc(ca,cb,Rh*Math.sqrt(3)*2.5,0,7);x.setLineDash([7,5]);x.lineWidth=1.5;x.strokeStyle='rgba(255,211,106,.6)';x.stroke();x.setLineDash([])}
// le port ne se bâtit que sur la côte même
{const kb=kBatir;kBatir=function(t){return kb(t).filter(([k])=>k!=='port'||((t.alt||0)<40&&kVoisins(t).length<6))}}
