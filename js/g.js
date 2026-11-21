
// ===== Le royaume souterrain : labyrinthe en 2D (vue de côté), autonome =====
// ouvrirGaleries(fin, opt) : opt.lieu (lieu-dit de l'entrée, fixe la graine), opt.hanuman (savoir du peuple d'Hanuman).
// Rend la main par fin({zeo,fresques,fini,secret,savoir,pilier,chutes,lieu}).
const GAL=(()=>{
 const TS=24,CW=12,CH=7,MW=6,MH=4,LW=3;
 const FRESQUES=['Avant la mer, une terre immense s’étendait au sud de l’Inde : les anciens l’appelaient le pays englouti.',
  'Le peuple d’Adaman y vivait avec le peuple d’Hanuman, gardiens des passages, et les Dravidiens bâtisseurs.',
  'Leurs villes de pierre lisaient le ciel au-dessus des volcans, et l’eau chaude des sources les soignait.',
  'Puis la terre trembla : le centre s’enfonça sous la mer, et seuls les sommets restèrent.',
  'Ce qui monta forma l’Himalaya, la Birmanie et les montagnes jusqu’à la Chine.',
  'Les restes du sud devinrent les îles de l’Indonésie ; au nord, la terre de glace descendit jusqu’à toucher les Amériques.',
  'Les survivants descendirent sous la roche, par les tunnels de lave, et y cachèrent leurs savoirs.',
  'Ceux qui connaissent le chemin d’Hanuman trouvent les portes. Les autres ne voient que la roche.'];
 const VRAI='Ce récit est un mythe du jeu (le Kumari Kandam, la Lémurie). Ce qui est vrai : sous Maurice dorment les restes d’un microcontinent, la Mauritia ; l’Himalaya est né de la collision de l’Inde avec l’Asie ; la Béringie a relié l’Asie à l’Amérique pendant les glaciations.';
 // générateur pseudo-aléatoire à graine : un même lieu-dit donne le même labyrinthe
 const rng=s=>{let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}};
 function construire(seed){const R=rng(seed),W=(MW+LW)*CW+1,H=MH*CH;const M=[];for(let y=0;y<H;y++)M.push(Array(W).fill('#'));
  const cellsM=[];for(let cy=0;cy<MH;cy++)for(let cx=0;cx<MW;cx++)cellsM.push([cx,cy]);
  const cellsL=[[6,1],[7,1],[6,2],[7,2],[8,2]],P=[8,1];
  const vider=(cx,cy)=>{const x0=cx*CW,y0=cy*CH;for(let y=y0+1;y<y0+CH-1;y++)for(let x=x0+1;x<x0+CW;x++)M[y][x]='.';for(let x=x0+1;x<x0+CW;x++)M[y0+CH-1][x]='='};
  [...cellsM,...cellsL,P].forEach(c=>vider(...c));
  const lien={},cle=(a,b)=>a+','+b,voisins=(c,L)=>[[1,0],[-1,0],[0,1],[0,-1]].map(d=>[c[0]+d[0],c[1]+d[1]]).filter(n=>L.some(q=>q[0]===n[0]&&q[1]===n[1]));
  const ouvrir=(a,b,crawl)=>{(lien[cle(...a)]=lien[cle(...a)]||[]).push(b);(lien[cle(...b)]=lien[cle(...b)]||[]).push(a);
   if(a[1]===b[1]){const l=a[0]<b[0]?a:b,x=(l[0]+1)*CW,y0=l[1]*CH;M[y0+CH-2][x]='.';if(!crawl)M[y0+CH-3][x]='.';M[y0+CH-1][x]='='}
   else{const u=a[1]<b[1]?a:b,x=u[0]*CW+Math.floor(CW/2),y0=u[1]*CH;for(let y=y0+CH-3;y<=y0+2*CH-2;y++)M[y][x]='|'}};
  const creuser=(L,start)=>{const vu=new Set([cle(...start)]),pile=[start];while(pile.length){const c=pile[pile.length-1],n=voisins(c,L).filter(q=>!vu.has(cle(...q)));if(!n.length){pile.pop();continue}const q=n[Math.floor(R()*n.length)];vu.add(cle(...q));ouvrir(c,q,q[1]===c[1]&&R()<.22);pile.push(q)}};
  creuser(cellsM,[0,0]);
  for(let k=0;k<3;k++){const c=cellsM[Math.floor(R()*cellsM.length)],n=voisins(c,cellsM).filter(q=>!(lien[cle(...c)]||[]).some(z=>z[0]===q[0]&&z[1]===q[1]));if(n.length)ouvrir(c,n[0])}
  creuser(cellsL,[6,1]);
  // passages secrets : vers les tunnels de lave, puis vers la salle du pilier
  const secret=(a,b)=>{const x=(a[0]+1)*CW,y0=a[1]*CH;M[y0+CH-2][x]='S';M[y0+CH-3][x]='S';(lien[cle(...a)]=lien[cle(...a)]||[]).push(b);(lien[cle(...b)]=lien[cle(...b)]||[]).push(a)};
  secret([5,1],[6,1]);secret([7,1],P);
  const dist={},file=[[0,0]];dist['0,0']=0;while(file.length){const c=file.shift();(lien[cle(...c)]||[]).forEach(n=>{if(dist[cle(...n)]==null&&cellsM.some(q=>q[0]===n[0]&&q[1]===n[1])){dist[cle(...n)]=dist[cle(...c)]+1;file.push(n)}})}
  const loin=cellsM.filter(c=>c[1]===MH-1).sort((a,b)=>dist[cle(...b)]-dist[cle(...a)])[0];
  const impasses=cellsM.filter(c=>(lien[cle(...c)]||[]).length===1&&!(c[0]===0&&c[1]===0)&&!(c[0]===loin[0]&&c[1]===loin[1]));
  const poser=(c,ch,dx)=>{const x=c[0]*CW+(dx??(2+Math.floor(R()*(CW-4)))),y=c[1]*CH+CH-2;if(M[y][x]==='.'&&M[y+1][x]==='=')M[y][x]=ch};
  // dangers, jamais sur la colonne d'un puits ni près d'une ouverture
  const libreX=(c,x)=>{const X=c[0]*CW+x;for(let y=c[1]*CH;y<c[1]*CH+CH;y++)if(M[y][X]==='|')return false;return x>=3&&x<=CW-3&&Math.abs(x-Math.floor(CW/2))>1};
  const danger=(c,lave)=>{const r=R(),x=3+Math.floor(R()*(CW-6));if(!libreX(c,x)||!libreX(c,x+1))return;const X=c[0]*CW+x,y=c[1]*CH+CH-1;
   if(lave){M[y][X]='L';M[y][X+1]='L';return}
   if(r<.3)M[y-1][X]='^';else if(r<.55){M[y][X]='~';M[y][X+1]='~'}else if(r<.75){M[y][X]='v'}else{for(let yy=c[1]*CH+1;yy<y-1;yy++){M[yy][X]='#';M[yy][X+1]='#'}}};
  cellsM.forEach(c=>{if(c[0]+c[1]>0&&R()<.75)danger(c)});cellsL.forEach(c=>{danger(c,1);if(R()<.5)danger(c,1)});
  cellsM.forEach(c=>{if(R()<.35)poser(c,'z')});const fr=impasses.concat(cellsM.filter(()=>R()<.2));for(let i=0;i<Math.min(6,fr.length);i++)poser(fr[i],'f',CW-3);
  cellsL.forEach(c=>{if(R()<.6)poser(c,'z')});poser([6,2],'f',CW-3);poser([7,1],'f',3);
  cellsM.filter(c=>c[1]>=2&&!(c[0]===loin[0]&&c[1]===loin[1])).forEach(c=>{if(R()<.45)poser(c,'R',4+Math.floor(R()*4));else if(R()<.4)poser(c,'K',3+Math.floor(R()*5))});cellsL.forEach(c=>{if(R()<.5)poser(c,R()<.5?'R':'K',5)});
  {const cc=cellsM.filter(c=>c[1]===1||c[1]===2);poser(cc[Math.floor(R()*cc.length)],'h',2)}poser(cellsM[Math.floor(R()*cellsM.length)],'g');
  const force=(c,ch,dx)=>{const X=c[0]*CW+dx,y=c[1]*CH+CH-2;M[y][X]=ch;M[y+1][X]='=';M[y+1][X-1]='=';M[y+1][X+1]='=';if(M[y-1][X]==='#')M[y-1][X]='.'};force(loin,'E',CW-2);force([8,2],'A',CW-3);force(P,'P',CW-4);
  M[CH-2][2]='c';
  return {M,lien,dist,loin,cle,cellsL}}
 function ouvrir(fin,opt){opt=opt||{};const han=!!opt.hanuman,lieu=opt.lieu||'l’île';
  const rm=document.getElementById('retM');if(rm)rm.style.visibility='hidden';const el=document.createElement('div');el.id='galeries';el.innerHTML='<canvas id="galc"></canvas><div class="gh"><b>Sous '+lieu+'</b> <span id="galinfo"></span><button class="bt sec" id="galq">Quitter</button></div><div class="gt" id="galt"></div><div class="gpad"><button data-k="g">◀</button><button data-k="d">▶</button><button data-k="b">▼ ramper / descendre</button><button data-k="s">▲ sauter / monter</button></div>';document.body.appendChild(el);
  const cv=el.querySelector('#galc'),x=cv.getContext('2d');let W,H;const taille=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};taille();addEventListener('resize',taille);
  const K={};const kd=e=>{const k=e.key.toLowerCase();if(['arrowleft','q','a'].includes(k))K.g=1;if(['arrowright','d'].includes(k))K.d=1;if(['arrowup','z','w',' '].includes(k)){K.s=1;e.preventDefault()}if(['arrowdown','s'].includes(k))K.b=1;if(k==='escape')quit()},ku=e=>{const k=e.key.toLowerCase();if(['arrowleft','q','a'].includes(k))K.g=0;if(['arrowright','d'].includes(k))K.d=0;if(['arrowup','z','w',' '].includes(k))K.s=0;if(['arrowdown','s'].includes(k))K.b=0};
  addEventListener('keydown',kd);addEventListener('keyup',ku);
  el.querySelectorAll('.gpad button').forEach(b=>{const k=b.dataset.k;b.onpointerdown=e=>{e.preventDefault();K[k]=1};b.onpointerup=b.onpointerleave=()=>K[k]=0});
  const L=construire(lieu),M=L.M,G={zeo:0,fres:0,chutes:0,fini:false,secret:false,savoir:false,pilier:false,t:0,vu:new Set(['0,0']),pv:100,gg:opt.grisgris||0,ggUse:0,anc:0,issue:'',bless:0,mob:[]};
  M.forEach((r,y)=>r.forEach((ch,xx)=>{if(ch==='R'||ch==='K'){G.mob.push({k:ch,x:xx*TS,y:y*TS-(ch==='K'?4:0),x0:xx*TS,d:1,cd:0,vu:0});r[xx]='.'}}));
  let cx0=2,cy0=CH-2;M.forEach((r,y)=>r.forEach((ch,xx)=>{if(ch==='c'){cx0=xx;cy0=y;r[xx]='.'}}));
  const P={x:cx0*TS,y:cy0*TS-4,vx:0,vy:0,w:14,h:26,sol:false,bas:false,ech:false,cx:cx0*TS,cy:cy0*TS-4};let camX=P.x,camY=P.y,stop=false,dernier='0,0';
  function dire(h,d){const t=el.querySelector('#galt');t.innerHTML=h;t.classList.add('on');clearTimeout(dire.h);dire.h=setTimeout(()=>t.classList.remove('on'),d||4500)}
  const tile=(tx,ty)=>(M[ty]&&M[ty][tx])||'#',dur=c=>c==='#'||c==='='||c==='b'||(c==='S'&&!han);
  function heurte(px,py,w,h){for(let ty=Math.floor(py/TS);ty<=Math.floor((py+h-1)/TS);ty++)for(let tx=Math.floor(px/TS);tx<=Math.floor((px+w-1)/TS);tx++)if(dur(tile(tx,ty)))return true;return false}
  function touche(c){for(let ty=Math.floor(P.y/TS);ty<=Math.floor((P.y+P.h-1)/TS);ty++)for(let tx=Math.floor(P.x/TS);tx<=Math.floor((P.x+P.w-1)/TS);tx++)if(tile(tx,ty)===c)return [tx,ty];return null}
  const sous=c=>{const ty=Math.floor((P.y+P.h+1)/TS);for(let tx=Math.floor(P.x/TS);tx<=Math.floor((P.x+P.w-1)/TS);tx++)if(tile(tx,ty)===c)return true;return false};
  function chute(m){G.chutes++;P.x=P.cx;P.y=P.cy;P.vx=P.vy=0;P.ech=false;dire(m,2500)}
  function blesse(n,m){if(G.inv>0||G.fini)return;G.pv-=n;G.inv=.8;P.vx=0;P.vy=-180;P.x-=(P.vx>=0?1:-1)*10;if(m)dire(m,2000);if(G.pv<=0){G.pv=0;G.fini=true;G.issue='blesse';finMort('<b>Blessé</b><br>Vos compagnons vous remontent à dos d’homme. Il faut rentrer au camp se soigner.')}}
  function mort(m){if(G.fini)return;if(G.gg>0){G.gg--;G.ggUse++;G.pv=50;P.x=P.cx;P.y=P.cy;P.vy=0;dire('<b>Le gris-gris brûle dans votre main</b><br>'+m+' Mais les ancêtres vous rendent le souffle, plus haut dans la galerie.',4500);return}G.pv=0;G.fini=true;G.issue='mort';finMort('<b>Mort dans la lave</b><br>'+m+' Le corps ne remontera pas. Au camp, on chantera son nom.')}
  function finMort(h){dire(h+'<br><button class="bt" id="galok">Remonter</button>',60000);setTimeout(()=>{const b=el.querySelector('#galok');if(b)b.onclick=quit},50)}
  const cellDe=()=>[Math.floor((P.x+P.w/2)/TS/CW),Math.floor((P.y+P.h/2)/TS/CH)];
  dire('<b>Le royaume souterrain</b><br>Un labyrinthe de tubes de lave sous '+lieu+'. Flèches ou Q/D pour marcher, Z ou espace pour sauter et monter aux échelles de racines, S pour ramper et descendre.'+(han?' Le savoir du peuple d’Hanuman vous montre le chemin : suivez les signes dorés.':''),8000);
  function maj(dt){G.t+=dt;const ech=touche('|');
   if(ech&&(K.s||K.b))P.ech=true;if(!ech)P.ech=false;
   const veut=K.b&&P.sol&&!ech;if(veut&&!P.bas){P.bas=true;P.y+=12;P.h=14}else if(!veut&&P.bas&&!heurte(P.x,P.y-12,P.w,26)){P.bas=false;P.y-=12;P.h=26}
   const vmax=P.bas?70:P.ech?80:150;P.vx=((K.d?1:0)-(K.g?1:0))*vmax;
   if(P.ech){P.vy=((K.b?1:0)-(K.s?1:0))*120}else{if(K.s&&P.sol&&!P.bas){P.vy=-330;P.sol=false}P.vy=Math.min(500,P.vy+900*dt)}
   let nx=P.x+P.vx*dt;if(!heurte(nx,P.y,P.w,P.h))P.x=nx;let ny=P.y+P.vy*dt;if(!heurte(P.x,ny,P.w,P.h)){P.y=ny;P.sol=false}else{if(P.vy>0)P.sol=true;P.vy=0}
   if(G.inv>0)G.inv-=dt;if(touche('^'))blesse(25,'Une stalagmite vous entaille la jambe.');
   if(touche('~')||sous('~')){G.pv-=8;chute('L’eau glacée vous emporte en arrière. Vie −8.');if(G.pv<=0)blesse(1)}
   if(touche('L')||sous('L')){mort('Vous avez glissé dans la lave.');if(G.fini)return}
   {const tx=Math.floor((P.x+P.w/2)/TS),ty=Math.floor((P.y+P.h)/TS);let pres=false;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)if(tile(tx+a,ty+b)==='L')pres=true;if(pres){G.pv-=12*dt;if(!G.chaud){G.chaud=1;dire('La chaleur de la lave vous brûle : ne restez pas près d’elle.',2000)}if(G.pv<=0)blesse(1)}else G.chaud=0}
   {const v=touche('v')||(sous('v')?[Math.floor(P.x/TS),0]:null);if(v&&Math.sin(G.t*2.2+v[0])>.2)blesse(20,'La vapeur brûlante jaillit.')}
   {const g=touche('g');if(g){M[g[1]][g[0]]='.';G.gg++;dire('Un gris-gris oublié dans une niche : un sachet cousu, des graines, une dent. Il vous gardera de la mort une fois.',4000)}}
   {const h=touche('h');if(h&&!G.anc){G.anc=40;dire('<b>Une chapelle creusée dans la roche</b><br>Une bougie brûle encore. Un ancêtre apparaît dans la fumée et vous montre le chemin.',6000)}}if(G.anc>0)G.anc-=dt;
   G.mob.forEach(m=>{const dx=P.x-m.x,dy=P.y-m.y,d=Math.hypot(dx,dy);if(m.k==='R'){m.x+=m.d*55*dt;if(Math.abs(m.x-m.x0)>TS*2.5)m.d*=-1;if(d<20)blesse(20,'Le requin-bouledogue vous mord : une gueule de chien, des dents de requin.')}else{m.vu=d<TS*3?Math.min(1,m.vu+dt*2):Math.max(.12,m.vu-dt);m.cd-=dt;if(d<TS*2&&m.cd<=0){m.cd=1.6;m.coup=.25;blesse(25,'Le caméléon géant tranche l’air de sa langue de pierre.')}if(m.coup>0)m.coup-=dt}});
   const z=touche('z');if(z){M[z[1]][z[0]]='.';G.zeo++;dire('Un cristal de zéolithe, blanc dans la lumière de la torche.',2200)}
   const f=touche('f');if(f){M[f[1]][f[0]]='.';dire('<i>'+FRESQUES[Math.min(G.fres,FRESQUES.length-1)]+'</i>'+(G.fres===FRESQUES.length-1?'<br><small>'+VRAI+'</small>':''),7000);G.fres++}
   if(touche('S')&&!G.secret){G.secret=true;dire('<b>Le passage d’Hanuman</b><br>La roche cède sous la main : derrière, les tunnels de lave des anciens, encore tièdes.',6000)}
   if(touche('A')&&!G.savoir){const a=touche('A');M[a[1]][a[0]]='.';G.savoir=true;dire('<b>La salle des savoirs anciens</b><br>Des tablettes de basalte, gravées par le peuple d’Adaman : les remèdes, le ciel, les passages entre les îles. La mystique de l’île est née ici.',9000)}
   if(touche('P')&&!G.pilier){const a=touche('P');M[a[1]][a[0]]='.';G.pilier=true;dire('<b>Le pilier sous '+lieu+'</b><br>Une colonne de lave figée descend plus bas que la mer. Les anciens disaient que tant qu’on la garde, l’histoire, le mystique et la vie des gens restent accordés. Et que l’île tient le monde.',10000)}
   if(touche('E')&&!G.fini){G.fini=true;fin2();return}
   if(P.y>M.length*TS)chute('Le noir sous vos pieds : retour en arrière.');if(G.fini)return;
   const c=cellDe(),k=c[0]+','+c[1];if(k!==dernier&&P.sol&&!P.ech){dernier=k;G.vu.add(k);P.cx=P.x;P.cy=P.y}
   el.querySelector('#galinfo').textContent='· vie '+Math.max(0,Math.round(G.pv))+(G.gg?' · gris-gris '+G.gg:'')+' · zéolithes '+G.zeo+' · fresques '+G.fres+'/'+FRESQUES.length+(G.secret?' · tunnels de lave':'')+(G.savoir?' · savoirs anciens':'')+(G.pilier?' · pilier':'')}
  // chemin d'Hanuman : la prochaine galerie vers le but
  function guide(){if(!han&&!(G.anc>0))return null;const but=!han?L.loin[0]+','+L.loin[1]:!G.savoir?'8,2':!G.pilier?'8,1':null;if(!but)return null;const c=cellDe(),d0=c[0]+','+c[1];const prev={[d0]:null},file=[d0];while(file.length){const u=file.shift();if(u===but)break;(L.lien[u]||[]).forEach(n=>{const k=n[0]+','+n[1];if(!(k in prev)){prev[k]=u;file.push(k)}})}if(!(but in prev))return null;const ch=[];let u=but;while(u){ch.push(u);u=prev[u]}return ch.reverse()}
  function dessin(){const sc=Math.max(1,Math.min(2.6,H*.72/(CH*TS*1.4))),VW=W/sc,VH=H/sc;camX+=((P.x-VW/2)-camX)*.12;camY+=((P.y-VH/2)-camY)*.12;camX=Math.max(0,Math.min(M[0].length*TS-VW,camX));camY=Math.max(-40,Math.min(M.length*TS-VH+40,camY));
   const lave=cellDe()[0]>=MW;x.fillStyle=lave?'#2a1410':'#1a1816';x.fillRect(0,0,W,H);x.save();x.scale(sc,sc);x.translate(-camX,-camY);
   const x0=Math.floor(camX/TS)-1,x1=Math.ceil((camX+VW)/TS)+1,y0=Math.floor(camY/TS)-1,y1=Math.ceil((camY+VH)/TS)+1;
   for(let ty=Math.max(0,y0);ty<Math.min(M.length,y1);ty++)for(let tx=Math.max(0,x0);tx<Math.min(M[0].length,x1);tx++){const ch=M[ty][tx],X=tx*TS,Y=ty*TS,lv=tx>=MW*CW;
    if(ch==='#'||(ch==='S'&&!han)){x.fillStyle=lv?'#4a2a20':'#3e342e';x.fillRect(X,Y,TS,TS);x.fillStyle='rgba(0,0,0,.25)';x.fillRect(X,Y+TS-4,TS,4)}
    else if(ch==='S'){x.fillStyle='#3e342e';x.fillRect(X,Y,TS,TS);x.strokeStyle='rgba(232,190,90,'+(.5+Math.sin(G.t*3)*.3)+')';x.lineWidth=2;x.beginPath();x.moveTo(X+6,Y+3);x.lineTo(X+12,Y+12);x.lineTo(X+8,Y+21);x.moveTo(X+12,Y+12);x.lineTo(X+19,Y+9);x.stroke()}
    else if(ch==='='){x.fillStyle=lv?'#2a1a14':'#1a1614';x.fillRect(X,Y,TS,TS);x.fillStyle=lv?'#6a3a24':'#3a302a';x.fillRect(X,Y,TS,5)}
    else if(ch==='^'){x.fillStyle='#8a7a6a';x.beginPath();x.moveTo(X+2,Y+TS);x.lineTo(X+TS/2,Y+4);x.lineTo(X+TS-2,Y+TS);x.fill()}
    else if(ch==='~'){x.fillStyle='rgba(40,110,130,.85)';x.fillRect(X,Y+4+Math.sin(G.t*2+tx)*2,TS,TS)}
    else if(ch==='L'){x.fillStyle='#e8683a';x.fillRect(X,Y+3,TS,TS);x.fillStyle='rgba(255,200,80,.6)';x.fillRect(X+((G.t*20+tx*7)%TS),Y+4,4,3)}
    else if(ch==='|'){x.strokeStyle='#7a5a34';x.lineWidth=2;x.beginPath();x.moveTo(X+7,Y);x.lineTo(X+7,Y+TS);x.moveTo(X+17,Y);x.lineTo(X+17,Y+TS);x.moveTo(X+7,Y+8);x.lineTo(X+17,Y+8);x.moveTo(X+7,Y+18);x.lineTo(X+17,Y+18);x.stroke()}
    else if(ch==='v'){x.fillStyle='#1a1614';x.fillRect(X,Y,TS,TS);if(Math.sin(G.t*2.2+tx)>.2){x.fillStyle='rgba(230,230,230,.45)';x.beginPath();x.ellipse(X+TS/2,Y-30,10,34,0,0,7);x.fill()}x.fillStyle='#e8683a';x.fillRect(X+8,Y+2,8,3)}
    else if(ch==='z'){x.fillStyle='#f4f4ec';x.beginPath();x.moveTo(X+12,Y+4);x.lineTo(X+18,Y+14);x.lineTo(X+12,Y+22);x.lineTo(X+6,Y+14);x.fill()}
    else if(ch==='f'){x.fillStyle='#d8a830';x.fillRect(X+4,Y+2,16,20);x.fillStyle='#5a3a10';x.fillRect(X+7,Y+6,10,2);x.fillRect(X+7,Y+11,6,2);x.fillRect(X+7,Y+16,9,2)}
    else if(ch==='h'){x.fillStyle='#8a7a6a';x.fillRect(X+2,Y-TS+4,TS-4,TS*2-4);x.fillStyle='#fff';x.fillRect(X+10,Y-TS+8,4,12);x.fillRect(X+6,Y-TS+12,12,3);x.fillStyle='rgba(255,200,90,'+(.6+Math.sin(G.t*8)*.3)+')';x.fillRect(X+10,Y+4,4,6)}
    else if(ch==='g'){x.fillStyle='#a0522d';x.beginPath();x.arc(X+12,Y+14,7,0,7);x.fill();x.fillStyle='#e2bd74';x.fillRect(X+11,Y+3,2,5)}
    else if(ch==='E'){x.fillStyle='#e2bd74';x.fillRect(X+2,Y-TS,TS-4,TS*2)}
    else if(ch==='A'){x.fillStyle='#8ad0e8';x.fillRect(X+2,Y-TS,TS-4,TS*2);x.fillStyle='#1a3a48';x.fillRect(X+6,Y-TS+6,TS-12,4)}
    else if(ch==='P'){x.fillStyle='#ffb050';x.fillRect(X+4,Y-TS*4,TS-8,TS*5);x.fillStyle='rgba(255,176,80,.25)';x.fillRect(X-10,Y-TS*4,TS+20,TS*5)}}
   const ch=guide();if(ch&&ch.length>1){const nx=ch[1].split(',').map(Number),c=cellDe();const dx=Math.sign(nx[0]-c[0]),dy=Math.sign(nx[1]-c[1]);x.fillStyle='rgba(232,190,90,'+(.55+Math.sin(G.t*4)*.25)+')';x.font='bold 18px system-ui';x.textAlign='center';x.fillText(dx>0?'➜':dx<0?'⬅':dy>0?'⬇':'⬆',P.x+P.w/2,P.y-14)}
   G.mob.forEach(m=>{if(m.k==='R'){x.fillStyle='#6a7a8a';x.beginPath();x.ellipse(m.x+12,m.y+14,16,8,0,0,7);x.fill();x.fillStyle='#8a6a4a';x.beginPath();x.arc(m.x+12+m.d*14,m.y+10,7,0,7);x.fill();x.fillStyle='#fff';for(let i=0;i<3;i++)x.fillRect(m.x+12+m.d*(16+i*2)-1,m.y+13,2,4);x.fillStyle='#5a4a3a';x.fillRect(m.x+2,m.y+20,3,6);x.fillRect(m.x+19,m.y+20,3,6)}else{x.globalAlpha=m.vu;x.fillStyle='#4a8a4a';x.beginPath();x.ellipse(m.x+12,m.y+10,20,11,0,0,7);x.fill();x.fillStyle='#e8e060';x.beginPath();x.arc(m.x+26,m.y+6,3,0,7);x.fill();if(m.coup>0){x.strokeStyle='#e0e0d0';x.lineWidth=3;x.beginPath();x.moveTo(m.x+28,m.y+10);x.lineTo(P.x+P.w/2,P.y+P.h/2);x.stroke()}x.globalAlpha=1}});
   let ok3=false;if(typeof spr185==='function'){const fl=G.inv>0&&Math.sin(G.t*40)>0,mv=Math.abs(P.vx)>1;if(fl)ok3=!!(SPR185.cache['p1a_chasseur|repos_debout|cote']||{}).pret;else{const rdx=P.lx==null?0:P.x-P.lx,rdy=P.ly==null?0:P.y-P.ly;P.lx=P.x;P.ly=P.y;const mvx=Math.abs(rdx)>.2,tl=P.h*(P.bas?1.9:1.15);let cl,ph;if(P.ech&&Math.abs(rdy)>.2){P.pv185=(P.pv185||0)+Math.abs(rdy);cl='marche';ph=P.pv185/(tl*1.1)}else if(!P.sol&&!P.ech){cl='course';ph=P.vy<0?.2:.45}else if(mvx){P.pas185=(P.pas185||0)+Math.abs(rdx);cl=P.bas?'chasse_traque':'course';ph=P.pas185/(tl*(P.bas?1.3:1.7))}else{cl=P.bas?'cacher':'repos_debout';ph=G.t*.5}ok3=spr185(x,'p1a_chasseur',cl,'cote',ph,P.x+P.w/2,P.y+P.h,tl,P.vx<0||(P.d185<0&&!mv)?-1:1);if(mvx)P.d185=rdx<0?-1:1}}
   if(!ok3){const fl=G.inv>0&&Math.sin(G.t*40)>0,pe=fl?'#fff':'#7a5236',ha=fl?'#fff':'#c8a060',cx=P.x+P.w/2,d=P.vx<0?-1:1,mv=Math.abs(P.vx)>1,ph=G.t*12,bas=P.bas;const tH=P.h*(bas?.55:1),top=P.y+P.h-tH,hr=Math.min(P.w*.42,tH*.16),hy=top+hr,sy=hy+hr+1,hip=top+tH*.58;x.strokeStyle=pe;x.lineCap='round';x.lineWidth=Math.max(2.5,P.w*.18);x.beginPath();const sw=mv?Math.sin(ph)*P.w*.35:0;x.moveTo(cx,hip);x.lineTo(cx+sw,P.y+P.h);x.moveTo(cx,hip);x.lineTo(cx-sw,P.y+P.h);const as=mv?Math.sin(ph+3)*P.w*.3:0;x.moveTo(cx,sy+2);x.lineTo(cx+as+d*2,hip-2);x.moveTo(cx,sy+2);x.lineTo(cx-as-d*2,hip-2);x.stroke();x.fillStyle=ha;x.fillRect(cx-P.w*.28,sy,P.w*.56,hip-sy);x.fillStyle='#8a5a30';x.fillRect(cx-P.w*.3,hip-2,P.w*.6,4);x.fillStyle=pe;x.beginPath();x.arc(cx,hy,hr,0,7);x.fill();x.fillStyle='#1a1410';x.fillRect(cx+d*hr*.35-1,hy-1,2,2);x.fillStyle='rgba(255,200,90,.9)';x.beginPath();x.arc(cx+d*P.w*.45,sy+4,2.5,0,7);x.fill()}
   x.restore();
   const px=(P.x-camX+P.w/2)*sc,py=(P.y-camY+P.h/2)*sc,g=x.createRadialGradient(px,py,40*sc,px,py,(140+Math.sin(G.t*7)*4)*sc);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.94)');x.fillStyle=g;x.fillRect(0,0,W,H);
   x.fillStyle='#300';x.fillRect(14,74,160,10);x.fillStyle=G.pv>50?'#7c6':G.pv>25?'#da4':'#d44';x.fillRect(14,74,160*Math.max(0,G.pv)/100,10);
   const mw=11,mx=W-(MW+LW)*mw-14,my=74;x.fillStyle='rgba(0,0,0,.55)';x.fillRect(mx-4,my-4,(MW+LW)*mw+8,MH*mw+8);G.vu.forEach(k=>{const [a,b]=k.split(',').map(Number);x.fillStyle=a>=MW?'#a04a2a':'#6a5a48';x.fillRect(mx+a*mw,my+b*mw,mw-2,mw-2)});{const c=cellDe();x.fillStyle='#e2bd74';x.fillRect(mx+c[0]*mw+2,my+c[1]*mw+2,mw-6,mw-6)}}
  let t0=performance.now();function boucle(t){if(stop)return;const dt=Math.min(.035,(t-t0)/1000);t0=t;if(!G.fini)maj(dt);dessin();requestAnimationFrame(boucle)}
  function fin2(){dire('<b>La sortie</b><br>Vous ressortez avec '+G.zeo+' zéolithe'+(G.zeo>1?'s':'')+' et '+G.fres+' fresque'+(G.fres>1?'s':'')+' lue'+(G.fres>1?'s':'')+'.'+(G.savoir?' Les savoirs anciens remontent avec vous.':han?'':' Certaines parois semblaient sonner creux : le savoir du peuple d’Hanuman les ouvrirait.')+'<br><button class="bt" id="galok">Remonter</button>',60000);setTimeout(()=>{const b=el.querySelector('#galok');if(b)b.onclick=quit},50)}
  function quit(){if(stop)return;stop=true;removeEventListener('keydown',kd);removeEventListener('keyup',ku);removeEventListener('resize',taille);el.remove();if(rm)rm.style.visibility='';if(fin)fin({zeo:G.zeo,fresques:G.fres,fini:G.fini&&!G.issue,secret:G.secret,savoir:G.savoir,pilier:G.pilier,chutes:G.chutes,lieu,issue:G.issue,ggUse:G.ggUse,gg:G.gg})}
  el.querySelector('#galq').onclick=quit;requestAnimationFrame(boucle);window.__gal={P,G,M};
  return {quit,etat:()=>({...G,P:{...P}}),K,M,L}}
 return {ouvrir,construire,FRESQUES}})();
window.ouvrirGaleries=GAL.ouvrir;
