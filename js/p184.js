// ===== Duel : des décors peints de La Réunion, à la manière des jeux de combat (fond fixe en cache + quelques éléments animés) =====
// Le décor dépend de l'adversaire : rempart de Mafate, champ de canne, usine sucrière, forêt de Bébour, Grande Chaloupe, Fournaise.
const DUEL184={cache:null,cle:''};
const SCENE184={milicien:'canne',commandeur:'usine',mussard:'bebour',anglais:'chaloupe',ombre:'fournaise',milicienEn:'chaloupe',milicienFr:'canne',colon:'canne',gouverneur:'usine',malabar:'canne',malgache:'mafate',capoeira:'chaloupe',chinois:'bebour',cimendef:'mafate',simangalove:'mafate',raharianne:'chaloupe',dimitile:'mafate',heva:'bebour',gardien:'fournaise'};
const NOMSC184={mafate:'Rempart de Mafate',canne:'Champ de canne, Saint-Paul',usine:'Usine sucrière, Saint-André',bebour:'Forêt de Bébour',chaloupe:'La Grande Chaloupe',fournaise:'Piton de la Fournaise'};
function fondDuel184(x,W,H,sol,lk,t){const sc=SCENE184[lk]||'mafate',cle=sc+W+'x'+H+'s'+sol;
 if(DUEL184.cle!==cle){DUEL184.cle=cle;DUEL184.cache=peint184(sc,W,H,sol)}
 x.drawImage(DUEL184.cache,0,0);anim184(x,sc,W,H,sol,t);
 x.save();x.font='italic 13px Georgia,serif';x.fillStyle='rgba(243,233,208,.7)';x.textAlign='right';x.fillText(NOMSC184[sc],W-14,H-12);x.restore()}
function peint184(sc,W,H,sol){const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');let se=sc.length*977+W;const R=()=>{se=(se*16807)%2147483647;return se/2147483647};
 const grad=(y0,y1,cols)=>{const g=x.createLinearGradient(0,y0,0,y1);cols.forEach((k,i)=>g.addColorStop(i/(cols.length-1),k));return g};
 const crete=(base,amp,pas,rug,col,haut)=>{x.fillStyle=col;x.beginPath();x.moveTo(0,H);let y=base;for(let X=0;X<=W+pas;X+=pas){y=base-amp*(.5+.5*Math.sin(X*.004+R()*.3))-R()*rug+(haut?haut(X):0);x.lineTo(X,y)}x.lineTo(W,H);x.closePath();x.fill()};
 const brume=(y,h,a)=>{const g=x.createLinearGradient(0,y-h,0,y+h);g.addColorStop(0,'rgba(230,236,240,0)');g.addColorStop(.5,'rgba(230,236,240,'+a+')');g.addColorStop(1,'rgba(230,236,240,0)');x.fillStyle=g;x.fillRect(0,y-h,W,2*h)};
 const traits=(x0,y0,w,h,n,cols,lmin,lmax,pente)=>{for(let i=0;i<n;i++){const X=x0+R()*w,Y=y0+R()*h,l=lmin+R()*(lmax-lmin);x.strokeStyle=cols[Math.floor(R()*cols.length)];x.lineWidth=1+R()*2;x.beginPath();x.moveTo(X,Y);x.lineTo(X+(pente||0)*l+(R()-.5)*4,Y-l);x.stroke()}};
 const fanjan=(X,Y,h,col)=>{x.strokeStyle=col;x.lineWidth=Math.max(3,h*.05);x.beginPath();x.moveTo(X,Y);x.quadraticCurveTo(X+h*.05,Y-h*.5,X,Y-h);x.stroke();for(let i=0;i<9;i++){const a=-Math.PI/2+(i-4)*.36;x.lineWidth=Math.max(1.5,h*.02);x.beginPath();x.moveTo(X,Y-h);const ex=X+Math.cos(a)*h*.55,ey=Y-h+Math.sin(a)*h*.3+h*.18;x.quadraticCurveTo(X+Math.cos(a)*h*.3,Y-h-h*.12,ex,ey);x.stroke();for(let k=1;k<7;k++){const u=k/7,px=X+(ex-X)*u,py=Y-h+(ey-Y+h)*u-Math.sin(u*Math.PI)*h*.1;x.beginPath();x.moveTo(px,py);x.lineTo(px+(R()-.5)*8,py+6+R()*5);x.stroke()}}};
 const vacoa=(X,Y,h,col)=>{x.strokeStyle='#5a4a32';x.lineWidth=h*.05;x.beginPath();x.moveTo(X,Y);x.lineTo(X+h*.04,Y-h*.75);x.stroke();for(let i=0;i<5;i++){x.beginPath();x.moveTo(X-h*.12+i*h*.06,Y);x.lineTo(X+h*.02,Y-h*.3);x.lineWidth=h*.015;x.stroke()}x.strokeStyle=col;x.lineWidth=h*.025;for(let i=0;i<14;i++){const a=-Math.PI/2+(i-6.5)*.22;x.beginPath();x.moveTo(X+h*.04,Y-h*.75);x.lineTo(X+h*.04+Math.cos(a)*h*.4,Y-h*.75+Math.sin(a)*h*.35+h*.12);x.stroke()}};
 const filao=(X,Y,h)=>{x.strokeStyle='#4a3a2a';x.lineWidth=h*.035;x.beginPath();x.moveTo(X,Y);x.lineTo(X-h*.05,Y-h);x.stroke();for(let i=0;i<5;i++){x.fillStyle=['#2d4a34','#35553b','#264030'][i%3];x.beginPath();x.ellipse(X-h*.05+(R()-.5)*h*.25,Y-h*(.45+i*.12),h*.18,h*.07,0,0,7);x.fill()}};
 const spect=(X,Y,s,habit)=>{const pe=['#5a3a26','#7a5236','#4a2e1e'][Math.floor(R()*3)];x.fillStyle=habit;x.fillRect(X-5*s,Y-24*s,10*s,15*s);x.fillStyle=pe;x.beginPath();x.arc(X,Y-29*s,5*s,0,7);x.fill();x.fillRect(X-4*s,Y-9*s,3*s,9*s);x.fillRect(X+1*s,Y-9*s,3*s,9*s);if(R()<.4){x.fillRect(X+5*s,Y-24*s,2.5*s,-10*s)}};
 const assis=(X,Y,s,habit)=>{x.fillStyle=habit;x.fillRect(X-5*s,Y-17*s,10*s,11*s);x.fillStyle='#5a3a26';x.beginPath();x.arc(X,Y-22*s,4.6*s,0,7);x.fill();x.fillRect(X-5*s,Y-6*s,12*s,3*s)};
 const terre=(cols,motif)=>{x.fillStyle=grad(sol,H,cols);x.fillRect(0,sol-2,W,H-sol+2);for(let i=0;i<W*.4;i++){const X=R()*W,Y=sol+Math.pow(R(),1.6)*(H-sol);x.fillStyle=motif[Math.floor(R()*motif.length)];const r=1+R()*(2+(Y-sol)*.04);x.beginPath();x.ellipse(X,Y,r*1.6,r*.7,0,0,7);x.fill()}x.fillStyle='rgba(0,0,0,.25)';x.fillRect(0,sol-2,W,4)};
 if(sc==='mafate'){
  x.fillStyle=grad(0,sol,['#7fb2d8','#b8d4e2','#efe2c6']);x.fillRect(0,0,W,sol);
  for(let i=0;i<5;i++){x.fillStyle='rgba(255,255,255,.55)';const cx=R()*W,cy=40+R()*H*.18;for(let k=0;k<6;k++){x.beginPath();x.ellipse(cx+k*24-60,cy+(k%2)*6,40,14,0,0,7);x.fill()}}
  crete(sol*.42,60,14,30,'#7d8fa0',X=>-Math.max(0,140-Math.abs(X-W*.7)*.6));brume(sol*.5,40,.5);
  crete(sol*.6,50,10,26,'#4f6b4e');for(let i=0;i<W*.5;i++){const X=R()*W,Y=sol*.45+R()*sol*.32;x.fillStyle=['#3e5a40','#5c7a52','#4a6a44','#6a7a50'][Math.floor(R()*4)];x.beginPath();x.ellipse(X,Y,4+R()*10,2+R()*4,0,0,7);x.fill()}x.strokeStyle='rgba(40,56,40,.5)';x.lineWidth=2;for(let i=0;i<14;i++){const X=R()*W;x.beginPath();x.moveTo(X,sol*.45);x.quadraticCurveTo(X+20,sol*.6,X-10,sol*.78);x.stroke()};brume(sol*.7,30,.35);
  crete(sol*.82,30,8,16,'#3f5a36');
  // îlet : cases en paille et spectateurs
  for(let i=0;i<4;i++){const X=W*(.12+i*.22)+R()*30,Y=sol*.83;x.fillStyle='#8a6a42';x.fillRect(X-16,Y-14,32,14);x.fillStyle='#c8a868';x.beginPath();x.moveTo(X-22,Y-12);x.lineTo(X,Y-34);x.lineTo(X+22,Y-12);x.fill();x.fillStyle='#3a2a1a';x.fillRect(X-4,Y-10,8,10)}
  for(let i=0;i<14;i++){const X=R()*W,Y=sol*.9+R()*sol*.05;(R()<.5?assis:spect)(X,Y,.9+R()*.4,['#b58a4a','#8a5a3a','#d8c8a0','#6a7a5a','#a04a32'][Math.floor(R()*5)])}
  terre(['#7a5a3a','#5a4028','#3a2818'],['#8a6a48','#4a3420','#6a5a40','#9a8a70']);
  vacoa(W*.04,sol+30,190,'#5d7d3a');fanjan(W*.96,sol+30,210,'#2f4a2a');vacoa(W*.88,sol+10,130,'#6a8a44')}
 else if(sc==='canne'||sc==='usine'){
  x.fillStyle=grad(0,sol,['#5d9ad0','#a8cce0','#f4dcae']);x.fillRect(0,0,W,sol);
  x.fillStyle='rgba(255,236,190,.8)';x.beginPath();x.arc(W*.8,sol*.25,40,0,7);x.fill();
  crete(sol*.5,90,16,20,'#6e8496',X=>-Math.max(0,170-Math.abs(X-W*.35)*.5));brume(sol*.62,40,.45);
  crete(sol*.7,24,12,10,'#5f7a48');
  if(sc==='usine'){const X=W*.68,Y=sol*.78;x.fillStyle='#8a7a68';x.fillRect(X-90,Y-70,180,70);x.fillStyle='#6a4a3a';x.beginPath();x.moveTo(X-100,Y-70);x.lineTo(X,Y-110);x.lineTo(X+100,Y-70);x.fill();for(let i=0;i<5;i++){x.fillStyle='#2a2018';x.fillRect(X-75+i*34,Y-52,14,22)}x.fillStyle='#7a6858';x.fillRect(X+110,Y-200,26,200);x.fillStyle='#5a4a3a';x.fillRect(X+106,Y-206,34,10);DUEL184.chem=[X+123,Y-206]}
  else{const X=W*.72,Y=sol*.8;x.fillStyle='#e8dcc0';x.fillRect(X-70,Y-46,140,46);x.fillStyle='#a03a2a';x.beginPath();x.moveTo(X-84,Y-46);x.lineTo(X,Y-86);x.lineTo(X+84,Y-46);x.fill();x.fillStyle='#4a6a7a';for(let i=0;i<4;i++)x.fillRect(X-56+i*32,Y-36,16,26);x.strokeStyle='#e8dcc0';x.lineWidth=3;for(let i=0;i<8;i++){x.beginPath();x.moveTo(X-70+i*20,Y);x.lineTo(X-70+i*20,Y+8);x.stroke()}filao(X-130,Y,110);filao(X+120,Y+4,120)}
  // la canne : rangs de tiges et de feuilles
  for(let r=0;r<4;r++){const y0=sol*(.8+r*.05);traits(0,y0,W,10,W*1.4,['#8aa040','#a8b850','#6a8a30','#c8c070'],22+r*10,44+r*14,(R()-.5)*.6)}
  for(let i=0;i<10;i++){const X=R()*W,Y=sol*.86;spect(X,Y,.95,['#d8c8a0','#a04a32','#6a5a4a','#e8e0c8'][Math.floor(R()*4)])}
  terre(['#8a6a44','#6a4a2c','#4a3220'],['#9a7a50','#5a3e26','#b09060']);
  traits(0,sol-10,W*.12,10,50,['#7a9a34','#a8b850'],40,90,.2);traits(W*.88,sol-10,W*.12,10,50,['#7a9a34','#a8b850'],40,90,-.2)}
 else if(sc==='bebour'){
  x.fillStyle=grad(0,sol,['#9ab8b0','#7a9a88','#4a6650']);x.fillRect(0,0,W,sol);
  for(let p=0;p<3;p++){const col=['#6e8e80','#4e6e5a','#34503e'][p];for(let i=0;i<9;i++){const X=R()*W,h=(sol*.4)+p*sol*.15+R()*60;x.fillStyle=col;x.fillRect(X-6-p*3,sol*.95-h,12+p*6,h)}brume(sol*(.5+p*.12),50,.35);
   for(let i=0;i<6;i++)fanjan(R()*W,sol*(.9+p*.03),110+p*60+R()*40,['#5a7a68','#3e5e4a','#2a4232'][p])}
  x.fillStyle='rgba(255,255,230,.12)';for(let i=0;i<5;i++){x.beginPath();const X=R()*W;x.moveTo(X,0);x.lineTo(X+60,0);x.lineTo(X+200,sol);x.lineTo(X+80,sol);x.fill()}
  terre(['#3e4a2a','#2e3820','#1e2414'],['#5a6a3a','#2a3018','#6a7a48','#4a5a30']);
  fanjan(W*.03,sol+30,260,'#22382a');fanjan(W*.97,sol+40,280,'#22382a')}
 else if(sc==='chaloupe'){
  x.fillStyle=grad(0,sol*.62,['#6aa6d6','#bcd8e6']);x.fillRect(0,0,W,sol*.62);
  x.fillStyle=grad(sol*.6,sol,['#2a6a8a','#3a8aa0','#6ab0b8']);x.fillRect(0,sol*.6,W,sol*.4);
  {const X=W*.55,Y=sol*.6;x.fillStyle='#3a2a1a';x.beginPath();x.moveTo(X-50,Y);x.lineTo(X+50,Y);x.lineTo(X+40,Y+10);x.lineTo(X-42,Y+10);x.fill();x.strokeStyle='#3a2a1a';x.lineWidth=2;for(const d of [-20,10]){x.beginPath();x.moveTo(X+d,Y);x.lineTo(X+d,Y-70);x.stroke()}x.fillStyle='#efe6d0';for(const d of [-20,10]){x.fillRect(X+d-18,Y-64,36,22);x.fillRect(X+d-15,Y-40,30,18)}x.fillStyle='#c02828';x.fillRect(X+10,Y-80,14,8)}
  x.fillStyle='#6a5a48';x.beginPath();x.moveTo(0,0);x.lineTo(W*.22,sol*.2);x.lineTo(W*.3,sol*.62);x.lineTo(W*.33,sol);x.lineTo(0,sol);x.fill();
  x.beginPath();x.moveTo(W,sol*.05);x.lineTo(W*.82,sol*.25);x.lineTo(W*.74,sol*.66);x.lineTo(W*.7,sol);x.lineTo(W,sol);x.fill();
  traits(0,sol*.2,W*.3,sol*.6,180,['#4e6a3a','#7a6a50','#5a4a3a'],8,30,0);traits(W*.72,sol*.25,W*.28,sol*.6,180,['#4e6a3a','#7a6a50','#5a4a3a'],8,30,0);
  for(let i=0;i<8;i++)spect(W*.3+R()*W*.4,sol*.996,.9,['#c02828','#efe6d0','#2a3a6a'][Math.floor(R()*3)]);
  terre(['#8a8478','#6a645a','#4a463e'],['#a8a294','#5a564c','#c8c2b4','#7a7468']);filao(W*.06,sol+20,200)}
 else{// fournaise
  x.fillStyle=grad(0,sol,['#120c1c','#3a1a28','#8a3a20']);x.fillRect(0,0,W,sol);for(let i=0;i<120;i++){x.fillStyle='rgba(255,255,240,'+R()*.8+')';x.fillRect(R()*W,R()*sol*.5,1.5,1.5)}
  x.fillStyle='#2a1a1a';x.beginPath();x.moveTo(W*.2,sol*.9);x.lineTo(W*.42,sol*.32);x.lineTo(W*.58,sol*.32);x.lineTo(W*.8,sol*.9);x.fill();
  x.strokeStyle='#ff7a20';x.lineWidth=5;for(const d of [-.04,.02,.06]){x.beginPath();x.moveTo(W*(.5+d),sol*.34);x.quadraticCurveTo(W*(.5+d*3),sol*.6,W*(.5+d*5),sol*.9);x.stroke()}
  crete(sol*.9,20,10,10,'#1a1212');
  terre(['#2a2222','#1a1616','#100c0c'],['#3a3030','#0a0808','#4a3a36']);
  x.strokeStyle='rgba(255,110,30,.6)';x.lineWidth=2;for(let i=0;i<14;i++){let X=R()*W,Y=sol+R()*(H-sol);x.beginPath();x.moveTo(X,Y);for(let k=0;k<4;k++){X+=(R()-.5)*40;Y+=R()*10;x.lineTo(X,Y)}x.stroke()}}
 return c}
function anim184(x,sc,W,H,sol,t){
 if(sc==='mafate'){const X=W*.58,y0=sol*.36,y1=sol*.64;x.save();x.globalAlpha=.75;for(let i=0;i<6;i++){x.strokeStyle='rgba(240,248,255,.8)';x.lineWidth=2+i%3;const o=((t*160+i*37)%(y1-y0));x.beginPath();x.moveTo(X+i*2-6,y0+o);x.lineTo(X+i*2-6,Math.min(y1,y0+o+40));x.stroke()}x.fillStyle='rgba(255,255,255,.35)';x.beginPath();x.ellipse(X,y1,22+Math.sin(t*3)*3,7,0,0,7);x.fill();x.restore()}
 if(sc==='usine'&&DUEL184.chem){const [cx,cy]=DUEL184.chem;for(let i=0;i<8;i++){const u=((t*.25+i/8)%1);x.fillStyle='rgba(90,85,80,'+(.45*(1-u))+')';x.beginPath();x.arc(cx-u*90+Math.sin(t+i)*6,cy-u*160,10+u*30,0,7);x.fill()}}
 if(sc==='chaloupe'){x.strokeStyle='rgba(255,255,255,.55)';x.lineWidth=2;for(let i=0;i<5;i++){const y=sol*(.86+i*.03),o=(t*30*(1+i*.3))%60;x.beginPath();for(let X=-60+o;X<W;X+=60){x.moveTo(X,y);x.quadraticCurveTo(X+15,y-4,X+30,y)}x.stroke()}}
 if(sc==='fournaise'){const a=.35+.25*Math.sin(t*2);const g=x.createRadialGradient(W*.5,sol*.32,4,W*.5,sol*.32,140);g.addColorStop(0,'rgba(255,160,40,'+a+')');g.addColorStop(1,'rgba(255,80,20,0)');x.fillStyle=g;x.fillRect(W*.5-140,sol*.32-140,280,280);for(let i=0;i<10;i++){const u=(t*.3+i/10)%1;x.fillStyle='rgba(255,'+(140+i*8)+',40,'+(1-u)+')';x.fillRect(W*.5+Math.sin(i*7)*40*u,sol*.32-u*120,3,3)}}
 if(sc==='bebour'){x.fillStyle='rgba(230,236,240,.08)';x.beginPath();x.ellipse((t*20)%(W+400)-200,sol*.85,260,30,0,0,7);x.fill()}}
{const st=document.createElement('style');st.textContent='.gpad small.tk{display:block;opacity:.6;font-size:.7em}#duV,#duC{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;color:#f3e9d0;font:16px/1.5 Georgia,serif;text-shadow:0 2px 8px #000;width:min(620px,92vw);z-index:5;animation:duIn .5s ease-out}#duV{background:rgba(20,12,6,.72);border:1px solid #c8a060;border-radius:14px;padding:22px}#duV .vt,#duC .vt{font:900 64px/1 Georgia,serif;letter-spacing:.06em;margin-bottom:8px}.vt.v{color:#ffcf4a;-webkit-text-stroke:2px #3a1a04}.vt.d{color:#d85a4a;-webkit-text-stroke:2px #2a0604}#duV .vs{font-style:italic;opacity:.85;margin-bottom:6px}#duV p{margin:10px 0 16px}#duV small,#duC small{opacity:.6;font-size:.75em;margin-left:4px}@keyframes duIn{from{opacity:0;transform:translate(-50%,-40%) scale(1.15)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}';document.head.appendChild(st)}
{const st=document.createElement('style');st.textContent='#duel.fin184 .gpad{opacity:0;pointer-events:none;transition:opacity .4s}';document.head.appendChild(st);setInterval(()=>{const d=document.getElementById('duel');if(d&&window.__duel)d.classList.toggle('fin184',!!__duel.fini)},250)}
{const st=document.createElement('style');st.textContent='#duel .gpad{flex-wrap:wrap;gap:6px;padding:0 8px}#duel .gpad .grp{display:flex;gap:4px;align-items:center;border:1px solid rgba(200,160,96,.35);border-radius:10px;padding:3px 5px;background:rgba(20,12,6,.35)}#duel .gpad .grp>small{font:600 10px Montserrat,sans-serif;color:#e8be5a;writing-mode:vertical-rl;transform:rotate(180deg);opacity:.85}#duel .gpad .grp button{min-width:0;padding:6px 8px;font-size:12px}';document.head.appendChild(st)}
