
// ===== Duels de légende : combat à deux, en vue de côté (façon Street Fighter 2), simplifié =====
// Les colons ont des armes et des habits épais (pas d'armure à Bourbon) ; les marrons ont les pouvoirs des anciens.
// ouvrirDuel(moi, lui, fin) : moi, lui = clés de DUE.F ; fin({ok, rounds}).
const DUE=(()=>{
 const F={dimitile:{n:'Dimitile',d:'Chef marron des hauts du sud. Rapide, la sagaie courte à la main.',col:'#c08a50',pv:100,vit:230,arme:{n:'Sagaie courte',po:105,d:11},arm:0,sp:'aveugle',spn:'Poudre des anciens',sp2:'chienM',sp2n:'Chien dressé'},
  heva:{n:'Héva',d:'La reine des marrons de la légende. Bâton, peur, et la plante qui endort les chiens.',col:'#c8a0ff',pv:95,vit:215,arme:{n:'Bâton',po:100,d:9},arm:0,sp:'peur',spn:'Cri des ancêtres',sp2:'plante',sp2n:'Plante des chiens'},
  cimendef:{n:'Cimendef',d:'Le marron du rempart, « cœur contraire ». Lourd et solide, un gourdin de bois de fer.',col:'#a05a3a',pv:120,vit:185,arme:{n:'Gourdin de bois de fer',po:90,d:15},arm:0,sp:'bond',spn:'Saut du rempart',sp2:'aveugle',sp2n:'Poudre des anciens'},
  gardien:{n:'Gardien d’Hanuman',d:'Figure du mythe, gardien des passages sous l’île. Bondit comme le singe-dieu.',col:'#e8c040',pv:110,vit:240,arme:{n:'Bâton des passages',po:115,d:12},arm:0,sp:'bond',spn:'Bond d’Hanuman',sp2:'peur',sp2n:'Regard du singe-dieu'},
  milicien:{n:'Le milicien',d:'Un habitant de la milice. Sabre de plantation, pistolet, habit de drap épais.',col:'#a08060',pv:95,vit:200,arme:{n:'Sabre de plantation',po:110,d:13},arm:.15,sp:'tir',spn:'Pistolet'},
  commandeur:{n:'Le commandeur',d:'Il surveille les champs. Barre de fer, pioche, et la voix qui fait trembler.',col:'#8a6a4a',pv:115,vit:180,arme:{n:'Barre de fer',po:95,d:17},arm:.1,sp:'coup',spn:'Coup de pioche'},
  mussard:{n:'Le chasseur de marrons',d:'Inspiré des chefs de détachement du XVIIIe siècle. Fusil, crosse, et ses chiens.',col:'#704830',pv:105,vit:190,arme:{n:'Crosse du fusil',po:95,d:11},arm:.12,sp:'tir',spn:'Coup de fusil',sp2:'chien',sp2n:'Lâcher le chien'},
  anglais:{n:'Le capitaine anglais',d:'1810 : l’officier qui débarque à la Grande Chaloupe. Mousquet et baïonnette.',col:'#d03030',pv:110,vit:190,arme:{n:'Baïonnette',po:120,d:12},arm:.15,sp:'tir',spn:'Mousquet'},
  ombre:{n:'L’envoyé de l’Ordre noir',d:'Le fanatique venu prendre le secret des fonds. L’ennemi de l’utopie.',col:'#303038',pv:125,vit:200,arme:{n:'Dague',po:90,d:13},arm:.1,sp:'peur',spn:'Malédiction volée',sp2:'tir',sp2n:'Pistolet'}};
 Object.keys(F).forEach(k=>F[k].k=k);
 const MARRONS=['dimitile','heva','cimendef','gardien'],ADV=['milicien','commandeur','mussard','anglais','ombre'];
 const CD={tir:3.2,sagaie:2.5,peur:4,bond:2.5,aveugle:7,chienM:9,chien:9,plante:8,coup:3};
 function ouvrir(mk,lk,fin){const A00=F[mk]||F.dimitile,A0=(typeof S!=='undefined'&&S&&!S.bac&&S.outil&&MARRONS.includes(mk))?{...A00,arme:{n:'Barre de fer volée',po:A00.arme.po,d:A00.arme.d+3}}:A00,POT=(typeof S!=='undefined'&&S&&!S.bac&&S.potion>0)?(S.potion--,25):0,B0=F[lk]||F.milicien,rm=document.getElementById('retM');if(rm)rm.style.visibility='hidden';window.BTUON=1;
  const dif=(typeof S!=='undefined'&&S&&S.dif)||'normal',IA=dif==='histoire'?.55:dif==='expert'?1.3:.9;
  const el=document.createElement('div');el.id='duel';el.innerHTML='<canvas></canvas><div class="bh"><b>'+A0.n+'</b> contre <b>'+B0.n+'</b> <span id="duI"></span><button class="bt sec" id="duQ">Quitter</button></div><div class="gpad"><button data-k="g">◀</button><button data-k="d">▶</button><button data-k="b">▼ garde</button><button data-k="h">▲ saut</button><button data-k="p">Poing</button><button data-k="j">'+A0.arme.n+'</button><button data-k="s">'+A0.spn+'</button>'+(A0.sp2?'<button data-k="u">'+A0.sp2n+'</button>':'')+'</div><div class="gt" id="duT"></div>';document.body.appendChild(el);
  const cv=el.querySelector('canvas'),x=cv.getContext('2d');let W,H;const taille=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};taille();addEventListener('resize',taille);
  const K={};const map={arrowleft:'g',q:'g',a:'g',arrowright:'d',d:'d',arrowup:'h',z:'h',w:'h',arrowdown:'b',s:'b',j:'p',k:'j',l:'s',i:'u'};
  const kd=e=>{const k=map[e.key.toLowerCase()];if(k){K[k]=1;e.preventDefault()}if(e.key==='Escape')quit()},ku=e=>{const k=map[e.key.toLowerCase()];if(k)K[k]=0};addEventListener('keydown',kd);addEventListener('keyup',ku);
  el.querySelectorAll('.gpad button').forEach(b=>{const k=b.dataset.k;b.onpointerdown=e=>{e.preventDefault();K[k]=1};b.onpointerup=b.onpointerleave=()=>K[k]=0});
  const SOL=()=>H*.78;
  const mkF=(f,xx,s)=>({f,x:xx,y:0,vy:0,s,pv:f.pv+(f===A0?POT:0),cd:0,act:null,at:0,garde:false,stun:0,cds:{},touche:0,aveugle:0,poison:0});
  const G={r:1,ga:0,gb:0,t:60,fini:false,ok:false,proj:[],chiens:[],msg:''};window.__duel=G;
  let A,B;function round(){A=mkF(A0,W*.3,1);B=mkF(B0,W*.7,-1);G.t=60;G.proj=[];G.chiens=[];dire('Manche '+G.r+' · combattez !',1600)}
  function dire(h,d){const t=el.querySelector('#duT');t.innerHTML=h;t.classList.add('on');clearTimeout(dire.h);dire.h=setTimeout(()=>t.classList.remove('on'),d||2000)}
  const atk=(c,k)=>k==='p'?{d:7,po:70,dur:.25,cd:.35}:{d:c.f.arme.d,po:c.f.arme.po,dur:.38,cd:c.f.arme.d>=15?.8:.6};
  const coupe=(o,d)=>{o.pv-=d*(1-(o.f.arm||0))*(o.garde?.2:1);o.touche=.15};
  function frappe(a,b,k){if(a.cd>0||a.stun>0||a.act)return;const t=atk(a,k);a.act=k;a.at=t.dur;a.cd=t.cd;a.hit=false}
  function pouvoir(a,b,sp,nom){if((a.cds[sp]||0)>0||a.stun>0)return;
   if((sp==='tir')&&a.aveugle>0){dire(a.f.n+' ne voit plus rien : impossible de viser.',1000);a.cds[sp]=1;return}
   a.cds[sp]=CD[sp]||3;
   if(sp==='tir'||sp==='sagaie')G.proj.push({x:a.x+a.s*40,y:SOL()-a.y-60,v:a.s*(sp==='tir'?520:380),o:a,d:sp==='tir'?14:12,k:sp});
   else if(sp==='peur'){if(Math.abs(a.x-b.x)<260&&!b.garde){b.stun=1.2;b.pv-=6;dire(nom+' !',900)}}
   else if(sp==='aveugle'){if(Math.abs(a.x-b.x)<300){b.aveugle=3;G.nuage={x:b.x,t:1};dire(nom+' : '+b.f.n+' est aveuglé, il devra se battre au corps à corps.',1800)}}
   else if(sp==='chien'||sp==='chienM'){G.chiens.push({o:a,x:a.x,pv:22,cd:0,t:9,dir:a.s});dire(sp==='chien'?'Le chien de chasse est lâché !':'Votre chien dressé s’élance.',1200)}
   else if(sp==='plante'){const n=G.chiens.filter(c=>c.o!==a).length;G.chiens=G.chiens.filter(c=>c.o===a);if(n)dire('L’odeur de la plante endort les chiens.',1400);else{b.poison=4;dire('La plante fait tourner la tête de '+b.f.n+'.',1400)}}
   else if(sp==='coup'){frappe(a,b,'j');a.lourd=1}
   else{a.vy=620;a.x+=a.s*30;a.act='j';a.at=.5;a.hit=false;a.bond=1}}
  function phys(c,o,dt){c.cd=Math.max(0,c.cd-dt);for(const k in c.cds)c.cds[k]=Math.max(0,c.cds[k]-dt);c.touche=Math.max(0,c.touche-dt);if(c.stun>0)c.stun-=dt;if(c.aveugle>0)c.aveugle-=dt;if(c.poison>0){c.poison-=dt;c.pv-=2*dt}
   c.y+=c.vy*dt;c.vy-=1500*dt;if(c.y<=0){c.y=0;c.vy=0;c.bond=0}c.x=Math.max(60,Math.min(W-60,c.x));c.s=o.x>c.x?1:-1;
   if(c.act){c.at-=dt;const t=atk(c,c.act);const ch=G.chiens.find(g=>g.o===o&&Math.abs(g.x-c.x)<t.po);if(!c.hit&&ch){c.hit=true;ch.pv-=t.d}else if(!c.hit&&Math.abs(o.x-c.x)<t.po+(c.bond?30:0)&&Math.abs(o.y-c.y)<90){c.hit=true;coupe(o,t.d*(c.bond?1.6:1)*(c.lourd?1.4:1));if(c.lourd){o.stun=.6;c.lourd=0}if(!o.garde)o.x+=c.s*22}if(c.at<=0)c.act=null}}
  function joueur(dt){const a=A;if(a.stun>0){a.garde=false;return}a.garde=!!K.b&&a.y===0;const v=a.garde?0:a.f.vit*(a.poison>0?.6:1);if(K.g)a.x-=v*dt;if(K.d)a.x+=v*dt;if(K.h&&a.y===0)a.vy=560;if(K.p){frappe(a,B,'p');K.p=0}if(K.j){frappe(a,B,'j');K.j=0}if(K.s){pouvoir(a,B,a.f.sp,a.f.spn);K.s=0}if(K.u&&a.f.sp2){pouvoir(a,B,a.f.sp2,a.f.sp2n);K.u=0}}
  function ia(dt){const b=B,a=A;if(b.stun>0){b.garde=false;return}const d=Math.abs(a.x-b.x);b.garde=false;
   if((a.act||G.proj.some(p=>p.o===a&&Math.abs(p.x-b.x)<160))&&Math.random()<.06*IA*60*dt*3)b.garde=true;
   if(!b.garde){const vv=b.f.vit*(b.poison>0?.6:1);if(d>110||b.aveugle>0&&d>70)b.x+=b.s*vv*dt*(.6+.4*IA);else if(d<60)b.x-=b.s*vv*dt*.5;
    if(d<110&&Math.random()<dt*2.2*IA)frappe(b,a,Math.random()<.45?'p':'j');if(d>200&&Math.random()<dt*.5*IA)pouvoir(b,a,b.f.sp,b.f.spn);if(b.f.sp2&&Math.random()<dt*.25*IA)pouvoir(b,a,b.f.sp2,b.f.sp2n);if(Math.random()<dt*.25)b.vy=b.y===0?520:b.vy}}
  function maj(dt){if(G.fini||G.pause)return;G.t-=dt;joueur(dt);ia(dt);phys(A,B,dt);phys(B,A,dt);{const d=B.x-A.x;if(Math.abs(d)<56&&Math.abs(A.y-B.y)<70){const m=(56-Math.abs(d))/2*(Math.sign(d)||1);A.x-=m;B.x+=m}}
   G.chiens.forEach(c=>{const cib=c.o===A?B:A;c.t-=dt;c.cd-=dt;const d=cib.x-c.x;c.dir=Math.sign(d)||1;if(Math.abs(d)>34)c.x+=c.dir*300*dt;else if(c.cd<=0){c.cd=.8;coupe(cib,4)}});G.chiens=G.chiens.filter(c=>c.pv>0&&c.t>0);
   G.proj.forEach(p=>{p.x+=p.v*dt;const c=p.o===A?B:A;if(!p.mort&&Math.abs(p.x-c.x)<30&&SOL()-c.y-60>p.y-70){p.mort=1;coupe(c,p.d)}});G.proj=G.proj.filter(p=>!p.mort&&p.x>0&&p.x<W);if(G.nuage)G.nuage.t-=dt*.5;
   if(A.pv<=0||B.pv<=0||G.t<=0){const ga=B.pv<=0||(G.t<=0&&A.pv/A.f.pv>=B.pv/B.f.pv);if(ga)G.ga++;else G.gb++;if(G.ga>=2||G.gb>=2){G.fini=true;G.ok=G.ga>=2;dire('<b>'+(G.ok?A0.n+' l’emporte !':B0.n+' l’emporte.')+'</b><br><button class="bt" id="duF">Terminer</button>'+(G.ok?'':' <button class="bt sec" id="duR">Revanche</button>'),60000);setTimeout(()=>{const f=el.querySelector('#duF');if(f)f.onclick=()=>quit();const r=el.querySelector('#duR');if(r)r.onclick=()=>{quit(true);ouvrir(mk,lk,fin)}},30)}else{G.r++;round()}}}
  function perso(c){const X=c.x,Y=SOL()-c.y,s=c.s,col=c.touche>0?'#fff':c.f.col;x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(X,SOL()+4,34,8,0,0,7);x.fill();
   const h=c.garde?70:100;x.fillStyle=col;x.fillRect(X-16,Y-h,32,h-30);if(c.f.arm){x.fillStyle='rgba(30,30,40,.5)';x.fillRect(X-17,Y-h,34,h-34)}x.fillStyle=col;x.beginPath();x.arc(X,Y-h-14,15,0,7);x.fill();if(typeof trait2D==='function')trait2D(x,c.f.k,X,Y-h-14,s,col);x.fillRect(X-14,Y-32,10,32);x.fillRect(X+4,Y-32,10,32);
   x.strokeStyle=col;x.lineWidth=9;x.lineCap='round';x.beginPath();if(c.act==='p'){x.moveTo(X+s*10,Y-h+12);x.lineTo(X+s*62,Y-h+14)}else if(c.garde){x.moveTo(X+s*8,Y-h+10);x.lineTo(X+s*22,Y-h-10)}else{x.moveTo(X+s*10,Y-h+12);x.lineTo(X+s*24,Y-h+40)}x.stroke();
   // l'arme en main
   {const ax=c.act==='j'?X+s*20:X+s*24,ay=c.act==='j'?Y-h+14:Y-h+40,L=c.f.arme.po*.55;x.strokeStyle=c.f.arm?'#c8c8d0':'#8a6a3a';x.lineWidth=4;x.beginPath();x.moveTo(ax,ay);x.lineTo(ax+s*(c.act==='j'?L:L*.3),ay-(c.act==='j'?4:L*.8));x.stroke()}
   if(c.stun>0){x.fillStyle='#ffe080';x.font='18px system-ui';x.fillText('✦ ✦',X-16,Y-h-36)}if(c.aveugle>0){x.fillStyle='rgba(200,200,200,.7)';x.fillRect(X-16,Y-h-20,32,8)}if(c.poison>0){x.fillStyle='#7c6';x.fillText('~',X+18,Y-h-20)}}
  function dessin(){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#2a3a4a');g.addColorStop(.7,'#4a3a2a');g.addColorStop(1,'#2a2018');x.fillStyle=g;x.fillRect(0,0,W,H);x.fillStyle='#1e2a1e';for(let i=0;i<9;i++){x.beginPath();x.moveTo(i*W/8-80,SOL());x.lineTo(i*W/8,SOL()-180-(i%3)*60);x.lineTo(i*W/8+80,SOL());x.fill()}x.fillStyle='#3a2a1a';x.fillRect(0,SOL(),W,H-SOL());
   perso(A);perso(B);G.chiens.forEach(c=>{const Y=SOL();x.fillStyle=c.o===A?'#6a5030':'#4a3a2a';x.fillRect(c.x-16,Y-22,32,14);x.beginPath();x.arc(c.x+c.dir*18,Y-24,8,0,7);x.fill();x.fillRect(c.x-14,Y-8,4,8);x.fillRect(c.x+10,Y-8,4,8)});
   G.proj.forEach(p=>{x.strokeStyle=p.k==='tir'?'#ffe080':'#c8a060';x.lineWidth=p.k==='tir'?3:5;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(p.x-Math.sign(p.v)*(p.k==='tir'?20:46),p.y);x.stroke()});
   if(G.nuage&&G.nuage.t>0){x.fillStyle='rgba(220,220,210,'+G.nuage.t*.6+')';x.beginPath();x.arc(G.nuage.x,SOL()-110,90*(1.4-G.nuage.t),0,7);x.fill()}
   if(A.aveugle>0){x.fillStyle='rgba(230,230,220,'+Math.min(.75,A.aveugle/3)+')';x.fillRect(0,0,W,H)}
   const bar=(c,X,al)=>{x.fillStyle='#300';x.fillRect(X,70,W*.38,14);x.fillStyle=c===A?'#7c6':'#d55';const w=W*.38*Math.max(0,c.pv/c.f.pv);x.fillRect(al?X+W*.38-w:X,70,w,14);x.fillStyle='#fff';x.font='14px system-ui';x.textAlign=al?'right':'left';x.fillText(c.f.n+' '+'●'.repeat(c===A?G.ga:G.gb),al?X+W*.38:X,62)};bar(A,W*.04,false);bar(B,W*.58,true);
   x.fillStyle='#fff';x.font='bold 28px system-ui';x.textAlign='center';x.fillText(Math.max(0,Math.ceil(G.t)),W/2,84);x.textAlign='left'}
  let stop=false,t0=performance.now();function boucle(t){if(stop)return;const dt=Math.min(.4,(t-t0)/1000);t0=t;for(let r=dt;r>1e-4;r-=.03)maj(Math.min(.03,r));dessin();requestAnimationFrame(boucle)}
  function quit(silent){if(stop)return;stop=true;window.BTUON=0;removeEventListener('keydown',kd);removeEventListener('keyup',ku);removeEventListener('resize',taille);el.remove();if(rm)rm.style.visibility='';if(fin&&!silent)fin({ok:G.ok,rounds:G.ga})}
  el.querySelector('#duQ').onclick=()=>quit();round();requestAnimationFrame(boucle);return {quit,G,get A(){return A},get B(){return B}}}
 return {ouvrir,F,MARRONS,ADV}})();
window.ouvrirDuel=DUE.ouvrir;
