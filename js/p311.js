// ===== p311 : l'esprit de la grotte, peint — nuit de lune, montagnes en lointains, tamarins et palmistes en ombres,
// cannes qui ondulent en rangs, cases créoles à varangue et lambrequins (ou cases de paille au camp marron), gardien à la lanterne
// dont la lumière tombe au sol, chiens couchés qui se relèvent. Mêmes positions et mêmes règles qu'avant : seul le dessin change. =====
const H311=(i)=>{const v=Math.sin(i*127.1+311.7)*43758.5453;return v-Math.floor(v)};
function ciel311(x,W,H,cam,cible,t,haut){const g=x.createLinearGradient(0,0,0,haut);g.addColorStop(0,cible==='col'?'#060a16':'#050c0a');g.addColorStop(.7,cible==='col'?'#142238':'#0e2420');g.addColorStop(1,cible==='col'?'#25344a':'#1c3830');x.fillStyle=g;x.fillRect(0,0,W,H);
 // étoiles qui scintillent, lune et son halo
 for(let i=0;i<120;i++){const sx=(H311(i)*W*1.6-cam*.05)%W,sy=H311(i+500)*haut*.75,a=.35+.5*Math.abs(Math.sin(t*(.6+H311(i+9))+i));x.fillStyle='rgba(235,240,255,'+a*.8+')';x.fillRect((sx+W)%W,sy,H311(i+3)>.85?2:1,H311(i+3)>.85?2:1)}
 const mx=W*.8-cam*.04,my=haut*.28;const hl=x.createRadialGradient(mx,my,10,mx,my,140);hl.addColorStop(0,'rgba(240,236,210,.35)');hl.addColorStop(1,'rgba(240,236,210,0)');x.fillStyle=hl;x.fillRect(mx-140,my-140,280,280);
 x.fillStyle='#efe9cf';x.beginPath();x.arc(mx,my,22,0,7);x.fill();x.fillStyle='rgba(200,190,160,.35)';x.beginPath();x.arc(mx-6,my-4,5,0,7);x.arc(mx+7,my+6,3.5,0,7);x.fill();
 // nuages fins qui passent devant la lune
 for(let i=0;i<4;i++){const cx=((i*420+t*8-cam*.08)%(W+400))-200,cy=haut*(.18+.12*i);x.fillStyle='rgba(120,130,150,.18)';x.beginPath();x.ellipse(cx,cy,160,14,0,0,7);x.ellipse(cx+60,cy-8,90,10,0,0,7);x.fill()}
 // deux lointains de montagnes, en parallaxe
 [[.12,'#1a2636','#14231e',.55],[.25,'#121c28','#0f1c16',.8]].forEach(([p,c1,c2,hh],k)=>{x.fillStyle=cible==='col'?c1:c2;x.beginPath();x.moveTo(0,haut);for(let X=0;X<=W+20;X+=20){const w=X+cam*p;x.lineTo(X,haut-hh*80-50*Math.abs(Math.sin(w*.004+k))-18*Math.sin(w*.013+k*2))}x.lineTo(W,haut);x.closePath();x.fill()})}
function arbres311(x,A,cible,niv,t,haut,cam,W){A.forEach(([ax,ay,r],i)=>{if(cible==='col'&&niv>=2&&ax%3===0)return;if(ax<cam-120||ax>cam+W+120)return;const k=H311(i);const sw=Math.sin(t*.8+i)*2;
 const fonce=cible==='col'?'#0f1912':'#0b1a10',lune='rgba(170,190,160,.22)';
 if(k<.3){// palmiste : tronc fin, palmes qui retombent
  x.strokeStyle='#141a12';x.lineWidth=4;x.beginPath();x.moveTo(ax,haut+6);x.quadraticCurveTo(ax+6,ay,ax+sw,ay-r*.6);x.stroke();
  for(let f=0;f<9;f++){const a=f/9*Math.PI*2+sw*.05,L=r*.9;x.strokeStyle=fonce;x.lineWidth=3;x.beginPath();x.moveTo(ax+sw,ay-r*.6);x.quadraticCurveTo(ax+sw+Math.cos(a)*L*.6,ay-r*.6-12,ax+sw+Math.cos(a)*L,ay-r*.6+Math.abs(Math.sin(a))*10+8);x.stroke()}}
 else{// tamarin : couronne en parasol faite de touffes, éclairée par la lune sur le haut
  x.fillStyle='#121a12';x.fillRect(ax-3,ay,6,haut-ay+6);for(let b=0;b<7;b++){const bx=ax+(H311(i*7+b)-.5)*r*1.6+sw*(b%2),by=ay-r*.2+(H311(i*5+b)-.5)*r*.6,br=r*(.35+H311(i*3+b)*.3);x.fillStyle=fonce;x.beginPath();x.arc(bx,by,br,0,7);x.fill();x.fillStyle=lune;x.beginPath();x.arc(bx-br*.2,by-br*.35,br*.55,Math.PI*1.1,Math.PI*1.9);x.fill()}}})}
function sol311(x,LW,H,haut,sol,cible,niv,t,cam,W){const g=x.createLinearGradient(0,haut,0,H);g.addColorStop(0,cible==='col'?'#1c2216':'#13201a');g.addColorStop(1,cible==='col'?'#2c2818':'#1e2a1c');x.fillStyle=g;x.fillRect(cam-10,haut,W+20,H-haut);
 // brume au pied des arbres
 const b=x.createLinearGradient(0,haut-20,0,haut+40);b.addColorStop(0,'rgba(150,170,180,0)');b.addColorStop(.5,'rgba(150,170,180,.12)');b.addColorStop(1,'rgba(150,170,180,0)');x.fillStyle=b;x.fillRect(cam-10,haut-20,W+20,60);
 if(cible==='col'&&niv>=1){// les rangs de cannes : des tiges qui ondulent, plus hautes devant
  for(let r=0;r<6;r++){const y=haut+20+r*34,pr=(y-haut)/(sol-haut),hh=10+pr*16;x.strokeStyle='rgba(70,60,30,.5)';x.lineWidth=2;x.beginPath();x.moveTo(cam-10,y+1);x.lineTo(cam+W+10,y+1);x.stroke();
   const brume=1-pr*.55;for(let X=Math.floor((cam-10)/7)*7;X<cam+W+10;X+=7){const k=H311(X+r*999),k2=H311(X*3+r*77);if(k2<.18)continue;// des trouées : ce sont des touffes, pas une palissade
    const X0=X+(k-.5)*6,h=hh*(.6+.8*k2),sw=Math.sin(t*1.3+X*.03+r)*2.5*pr,lean=(k-.5)*5;
    x.strokeStyle='rgba('+(70+k*40|0)+','+(96+k2*40|0)+','+(40+k*20|0)+','+(.55+.35*pr)*brume+')';x.lineWidth=1+pr*1.4;x.beginPath();x.moveTo(X0,y);x.lineTo(X0+lean+sw,y-h);x.stroke();
    // les feuilles longues qui retombent des deux côtés
    const fx=X0+lean+sw,fy=y-h;x.strokeStyle='rgba('+(96+k2*50|0)+','+(130+k*50|0)+','+(60+k*20|0)+','+(.5+.3*pr)*brume+')';x.lineWidth=.8+pr*.8;
    for(let f=0;f<3;f++){const d=(f%2?1:-1)*(5+H311(X+f*13)*9)*(1+pr*.6),dy=h*(.15+.25*f);x.beginPath();x.moveTo(fx-lean*.3*f,fy+dy*.6);x.quadraticCurveTo(fx+d*.6,fy+dy*.2-4,fx+d,fy+dy+3+Math.sin(t*2+X+f)*1.5);x.stroke()}}}}
 else{for(let i=0;i<180;i++){const X=cam+H311(i)*W,y=haut+8+H311(i+77)*(sol-haut),pr=(y-haut)/(sol-haut);x.strokeStyle='rgba(60,90,50,'+(.3+pr*.4)+')';x.lineWidth=1;for(let f=-2;f<=2;f++){x.beginPath();x.moveTo(X,y);x.lineTo(X+f*3+Math.sin(t+i)*1.5,y-5-pr*8);x.stroke()}}}
 // des lucioles
 for(let i=0;i<14;i++){const X=cam+((H311(i+40)*W+t*12*(H311(i)-.5))%W+W)%W,y=haut+20+H311(i+90)*(sol-haut-30)+Math.sin(t*1.5+i)*8,a=.3+.7*Math.max(0,Math.sin(t*2+i*1.7));x.fillStyle='rgba(220,255,140,'+a+')';x.beginPath();x.arc(X,y,1.6,0,7);x.fill()}}
function case311(x,o,s,cible,t){x.save();x.translate(o.x,o.y);x.scale(s,s);
 if(cible==='col'){// case créole : soubassement de pierre, bardeaux, varangue sur poteaux, lambrequins, volets
  x.fillStyle='#4a4640';x.fillRect(-52,-6,104,8);x.fillStyle='#d8d0bc';x.fillRect(-46,-60,92,54);
  x.strokeStyle='rgba(120,110,90,.35)';x.lineWidth=1;for(let X=-44;X<46;X+=6){x.beginPath();x.moveTo(X,-60);x.lineTo(X,-6);x.stroke()}
  const toit=x.createLinearGradient(0,-100,0,-60);toit.addColorStop(0,'#8a4434');toit.addColorStop(1,'#5a2a20');x.fillStyle=toit;x.beginPath();x.moveTo(-60,-60);x.lineTo(-36,-100);x.lineTo(36,-100);x.lineTo(60,-60);x.closePath();x.fill();
  x.strokeStyle='rgba(30,10,6,.45)';for(let k=0;k<5;k++){x.beginPath();x.moveTo(-60+k*2,-60-k*8);x.lineTo(60-k*2,-60-k*8);x.stroke()}x.fillStyle='rgba(230,220,200,.18)';x.beginPath();x.moveTo(-36,-100);x.lineTo(36,-100);x.lineTo(30,-96);x.lineTo(-30,-96);x.fill();
  // lambrequins : la frise découpée sous le bord du toit
  x.fillStyle='#efe8d4';for(let X=-58;X<58;X+=6){x.beginPath();x.moveTo(X,-60);x.lineTo(X+6,-60);x.lineTo(X+3,-54);x.closePath();x.fill()}
  // varangue : poteaux et balustre
  x.fillStyle='#e8e0cc';[-44,-22,22,44].forEach(X=>x.fillRect(X-2,-54,4,48));x.strokeStyle='#cfc6b0';x.lineWidth=1.5;x.beginPath();x.moveTo(-44,-24);x.lineTo(-12,-24);x.moveTo(12,-24);x.lineTo(44,-24);x.stroke();
  // volets bleus fermés (ou entrouverts et éclairés si on a agi)
  [-33,33].forEach(X=>{x.fillStyle=o.ok?'rgba(255,190,110,.75)':'#3a5a7a';x.fillRect(X-7,-48,14,18);x.strokeStyle='rgba(20,30,40,.5)';for(let k=0;k<4;k++){x.beginPath();x.moveTo(X-7,-45+k*4);x.lineTo(X+7,-45+k*4);x.stroke()}})}
 else{// case de paille du camp marron : murs de gaulettes, toit de vétiver qui descend bas
  x.fillStyle='#4a3a26';x.fillRect(-40,-50,80,50);x.strokeStyle='rgba(30,22,12,.6)';for(let X=-38;X<40;X+=5){x.beginPath();x.moveTo(X,-50);x.lineTo(X+1,0);x.stroke()}for(let y=-44;y<0;y+=9){x.strokeStyle='rgba(120,96,60,.5)';x.beginPath();x.moveTo(-40,y);x.lineTo(40,y);x.stroke()}
  x.fillStyle='#7a6438';x.beginPath();x.moveTo(-56,-40);x.quadraticCurveTo(0,-118,56,-40);x.closePath();x.fill();x.strokeStyle='rgba(180,150,90,.45)';x.lineWidth=1;for(let k=-52;k<54;k+=4){x.beginPath();x.moveTo(k*.2,-100);x.lineTo(k,-40+Math.abs(Math.sin(k))*4);x.stroke()}
  x.fillStyle='rgba(160,150,140,.12)';const fm=Math.sin(t*.7+o.x)*6;x.beginPath();x.ellipse(4+fm,-118-((t*12+o.x)%40),8,14,0,0,7);x.fill()}
 // la porte : noire tant qu'on dort, un halo mauve quand l'esprit est passé
 x.fillStyle=o.ok?'#b090e0':'#050505';x.fillRect(-10,-34,20,34);if(o.ok){const g=x.createRadialGradient(0,-17,2,0,-17,40);g.addColorStop(0,'rgba(190,150,255,.45)');g.addColorStop(1,'rgba(190,150,255,0)');x.fillStyle=g;x.fillRect(-40,-57,80,80)}
 else{x.font='italic 13px Georgia,serif';for(let k=0;k<3;k++){const u=((t*.45+k/3+o.x*.001)%1);x.fillStyle='rgba(239,233,218,'+(.8*(1-u))+')';x.fillText('z',10+u*14+k*2,-72-u*26)}}x.restore()}
function garde311(x,g,s,cible,t){const L=g.x+g.dir*22*s,Ly=g.y-48*s;
 // la lumière de la lanterne : un cône doux et une flaque chaude au sol
 const gr=x.createRadialGradient(g.x+g.dir*60*s,g.y-50*s,8,g.x+g.dir*90*s,g.y-50*s,180*s);gr.addColorStop(0,'rgba(255,190,90,.30)');gr.addColorStop(1,'rgba(255,190,90,0)');x.fillStyle=gr;x.beginPath();x.moveTo(L,Ly);x.lineTo(g.x+g.dir*190*s,g.y-140*s);x.lineTo(g.x+g.dir*190*s,g.y+20*s);x.closePath();x.fill();
 const fl=x.createRadialGradient(g.x+g.dir*70*s,g.y,4,g.x+g.dir*70*s,g.y,110*s);fl.addColorStop(0,'rgba(255,200,110,.28)');fl.addColorStop(1,'rgba(255,200,110,0)');x.fillStyle=fl;x.beginPath();x.ellipse(g.x+g.dir*70*s,g.y,110*s,22*s,0,0,7);x.fill();
 x.save();x.translate(g.x,g.y);x.scale(s*g.dir,s);const pas=Math.sin(t*5+g.x*.01)*.3;
 x.fillStyle='rgba(0,0,0,.4)';x.beginPath();x.ellipse(0,0,16,4,0,0,7);x.fill();
 const peau=cible==='col'?'#c9a27a':'#5a3a26',hab=cible==='col'?'#2e3a4a':'#4a3a2a';
 // jambes, corps, bras tenant la lanterne
 x.strokeStyle='#1e1a16';x.lineWidth=5;x.lineCap='round';x.beginPath();x.moveTo(-3,-22);x.lineTo(-3-pas*10,0);x.moveTo(3,-22);x.lineTo(3+pas*10,0);x.stroke();
 x.fillStyle=hab;x.beginPath();x.moveTo(-9,-46);x.lineTo(9,-46);x.lineTo(11,-20);x.lineTo(-11,-20);x.closePath();x.fill();x.fillStyle='rgba(255,200,120,.25)';x.fillRect(4,-46,6,26);
 x.strokeStyle=hab;x.lineWidth=4;x.beginPath();x.moveTo(6,-42);x.lineTo(18,-32);x.stroke();x.beginPath();x.moveTo(-6,-42);x.lineTo(-10,-26);x.stroke();
 x.fillStyle=peau;x.beginPath();x.arc(0,-53,7,0,7);x.fill();if(cible==='col'){x.fillStyle='#2a2420';x.beginPath();x.ellipse(0,-58,12,3,0,0,7);x.fill();x.fillRect(-6,-66,12,8)}
 // la lanterne et sa flamme qui vacille
 x.strokeStyle='#2a2420';x.lineWidth=1.5;x.beginPath();x.moveTo(18,-32);x.lineTo(22,-26);x.stroke();x.fillStyle='#3a3026';x.fillRect(18,-26,9,12);const f=.8+.2*Math.sin(t*13+g.x);const lg=x.createRadialGradient(22.5,-20,1,22.5,-20,14);lg.addColorStop(0,'rgba(255,230,150,'+f+')');lg.addColorStop(1,'rgba(255,170,60,0)');x.fillStyle=lg;x.beginPath();x.arc(22.5,-20,14,0,7);x.fill();x.restore()}
function chien311(x,c,t){const ev=c.eveil>.5;x.save();x.translate(c.x,c.y);x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(0,0,18,4,0,0,7);x.fill();const col=ev?'#8a6a48':'#5a4a38';x.fillStyle=col;
 if(!ev){// couché, roulé, la tête sur les pattes, la respiration lente
  const r=1+Math.sin(t*1.6+c.x)*.04;x.save();x.scale(1,r);x.beginPath();x.ellipse(0,-6,16,7,0,0,7);x.fill();x.restore();x.beginPath();x.ellipse(13,-5,6,5,0,0,7);x.fill();x.beginPath();x.moveTo(15,-9);x.lineTo(19,-14);x.lineTo(19,-8);x.fill();
  x.strokeStyle=col;x.lineWidth=3;x.beginPath();x.moveTo(-15,-4);x.quadraticCurveTo(-20,2,-10,3);x.stroke();x.font='italic 12px Georgia,serif';x.fillStyle='rgba(239,233,218,'+(.5+.3*Math.sin(t*2+c.x))+')';x.fillText('z',2,-18-Math.sin(t*1.5+c.x)*3)}
 else{// relevé, oreilles dressées, il gronde
  x.fillRect(-12,-18,22,9);x.fillRect(-11,-10,3,10);x.fillRect(5,-10,3,10);x.beginPath();x.ellipse(13,-20,6,5,0,0,7);x.fill();x.beginPath();x.moveTo(11,-24);x.lineTo(13,-31);x.lineTo(16,-24);x.fill();
  x.strokeStyle=col;x.lineWidth=3;x.beginPath();x.moveTo(-12,-16);x.lineTo(-19,-24+Math.sin(t*12)*2);x.stroke();x.font='italic 12px Georgia,serif';x.fillStyle='#f0d8a8';x.fillText('grr…',-8,-34)}x.restore()}
