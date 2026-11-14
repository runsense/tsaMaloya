
// ===== Aventure en vue de dessus (façon Zelda) : donjons des tunnels de lave, missions d'outre-mer =====
// ouvrirAventure(opt, fin) : opt.mode 'lave' (donjon sous un lieu-dit) ou 'mission' (Maurice, Madagascar…), opt.lieu, opt.hanuman, opt.grisgris
const AVT=(()=>{
 const RW=15,RH=10,GW=5,GH=4;
 const FRESQ=['Avant la mer, une terre immense s’étendait au sud de l’Inde : les anciens l’appelaient le pays englouti.','Le peuple d’Adaman y vivait avec le peuple d’Hanuman, gardiens des passages, et les Dravidiens bâtisseurs.','Puis la terre trembla : le centre s’enfonça sous la mer, et seuls les sommets restèrent.','Ce qui monta forma l’Himalaya, la Birmanie et les montagnes jusqu’à la Chine ; au nord, la glace rejoignit les Amériques.','Les survivants descendirent sous la roche, par les tunnels de lave, et y cachèrent leurs savoirs.','Ceux qui connaissent le chemin d’Hanuman trouvent les portes. Les autres ne voient que la roche.'];
 const rng=s=>{let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}};
 const MOB={sal:{n:'Salamandre de lave',pv:2,v:55,col:'#e8683a',ia:'chasse',d:1},chv:{n:'Chauve-souris',pv:1,v:80,col:'#7a6a8a',ia:'vole',d:1},req:{n:'Requin-bouledogue',pv:3,v:95,col:'#6a7a8a',ia:'charge',d:2},cam:{n:'Caméléon géant',pv:3,v:30,col:'#4a8a4a',ia:'cache',d:2},sol:{n:'Soldat',pv:2,v:50,col:'#3050a0',ia:'garde',d:1},chi:{n:'Chien de chasse',pv:1,v:110,col:'#6a5030',ia:'chasse',d:1},boss:{n:'Le gardien de lave',pv:14,v:45,col:'#ff5020',ia:'boss',d:2},bossM:{n:'Le chef du détachement',pv:10,v:55,col:'#203070',ia:'boss',d:2}};
 // ----- génération : un arbre de salles, deux portes fermées à clé sur le chemin du boss, les clés avant elles -----
 function generer(seed,mode,han){const R=rng(seed+mode);const cle=(x,y)=>x+','+y,start=[2,GH-1];const lien={},vu=new Set([cle(...start)]),pile=[start],prof={[cle(...start)]:0};
  while(pile.length){const c=pile[pile.length-1];const n=[[1,0],[-1,0],[0,1],[0,-1]].map(d=>[c[0]+d[0],c[1]+d[1]]).filter(q=>q[0]>=0&&q[1]>=0&&q[0]<GW&&q[1]<GH&&!vu.has(cle(...q)));if(!n.length||(pile.length>1&&R()<.12)){pile.pop();continue}const q=n[Math.floor(R()*n.length)];vu.add(cle(...q));prof[cle(...q)]=prof[cle(...c)]+1;(lien[cle(...c)]=lien[cle(...c)]||[]).push(q);(lien[cle(...q)]=lien[cle(...q)]||[]).push(c);pile.push(q)}
  const salles=[...vu].map(k=>k.split(',').map(Number));const boss=salles.slice().sort((a,b)=>prof[cle(...b)]-prof[cle(...a)])[0];
  // chemin du départ au boss
  const par={[cle(...start)]:null},f=[start];while(f.length){const c=f.shift();(lien[cle(...c)]||[]).forEach(n=>{if(!(cle(...n) in par)){par[cle(...n)]=c;f.push(n)}})}const chem=[];let u=boss;while(u){chem.unshift(u);u=par[cle(...u)]}
  const verrous=[];if(chem.length>=4){verrous.push([chem[Math.floor(chem.length/3)],chem[Math.floor(chem.length/3)+1]]);if(chem.length>=6)verrous.push([chem[Math.floor(2*chem.length/3)],chem[Math.floor(2*chem.length/3)+1]])}
  const ferme=(a,b,L)=>L.some(v=>(cle(...v[0])===cle(...a)&&cle(...v[1])===cle(...b))||(cle(...v[0])===cle(...b)&&cle(...v[1])===cle(...a)));
  const zone=L=>{const z=new Set([cle(...start)]),q=[start];while(q.length){const c=q.shift();(lien[cle(...c)]||[]).forEach(n=>{if(!z.has(cle(...n))&&!ferme(c,n,L)){z.add(cle(...n));q.push(n)}})}return z};
  const cles=[];verrous.forEach((v,i)=>{const z=zone(verrous.slice(i)),avant=i?zone(verrous.slice(i-1)):new Set();let cand=[...z].filter(k=>k!==cle(...start)&&!avant.has(k)||(i===0&&k!==cle(...start)));cand=cand.filter(k=>!cles.includes(k));cand.sort((a,b)=>prof[b]-prof[a]);cles.push(cand[0]||[...z].find(k=>k!==cle(...start))||cle(...start))});
  // salle secrète d'Hanuman, accrochée à une salle de bord
  let secret=null;const bord=salles.filter(s=>(s[0]===0||s[0]===GW-1)&&cle(...s)!==cle(...boss));if(mode==='lave'&&bord.length){const s=bord[Math.floor(R()*bord.length)];secret={de:s,cote:s[0]===0?'o':'e'}}
  const S={};salles.forEach(s=>{const k=cle(...s),pr=prof[k];const M=[];for(let y=0;y<RH;y++){M.push([]);for(let x=0;x<RW;x++)M[y].push(x===0||y===0||x===RW-1||y===RH-1?'#':'.')}
   const P=lien[k]||[];P.forEach(n=>{const dx=n[0]-s[0],dy=n[1]-s[1],lock=ferme(s,n,verrous);const ch=lock?'K':'.';if(dx===1){M[4][RW-1]=ch;M[5][RW-1]=ch}if(dx===-1){M[4][0]=ch;M[5][0]=ch}if(dy===1){M[RH-1][7]=ch}if(dy===-1){M[0][7]=ch}});
   if(secret&&k===cle(...secret.de)){const x=secret.cote==='o'?0:RW-1;M[4][x]='S';M[5][x]='S'}
   const k0=k===cle(...start),kb=k===cle(...boss);
   if(!k0&&!kb){// décor : rochers, lave ou eau, en laissant les passages libres
    const nb=2+Math.floor(R()*4);for(let q=0;q<nb;q++){const x=2+Math.floor(R()*(RW-4)),y=2+Math.floor(R()*(RH-4));if(Math.abs(x-7)<=1||Math.abs(y-4.5)<=1)continue;M[y][x]=mode==='lave'&&R()<.5?'L':mode==='mission'&&R()<.5?'T':'#'}
    if(mode==='lave'&&R()<.35){const y=2+Math.floor(R()*2)*5;for(let x=3;x<RW-3;x++)if(Math.abs(x-7)>1&&M[y]&&M[y][x]==='.')M[y][x]='L'}}
   if(k0)[[2,2],[12,2],[2,7],[12,7]].forEach(([x,y])=>M[y][x]=mode==='mission'?'T':'#');
   const mobs=[];if(!k0){const n=kb?1:Math.min(4,1+Math.floor(pr/2)+(R()<.4?1:0));const pool=mode==='lave'?(pr<2?['chv','sal']:pr<4?['sal','req','chv']:['req','cam','sal']):['sol','sol','chi'];for(let q=0;q<n;q++){const t=kb?(mode==='lave'?'boss':'bossM'):pool[Math.floor(R()*pool.length)];mobs.push({t,x:3+R()*(RW-6),y:2.5+R()*(RH-5)})}}
   const it=[];if(cles.includes(k))it.push({t:'cle',x:7,y:3});if(!k0&&!kb&&R()<.35)it.push({t:mode==='lave'?'zeo':'vivre',x:3+Math.floor(R()*9),y:7});if(!k0&&!kb&&R()<.2)it.push({t:'coeur',x:11,y:3});if(!k0&&!kb&&R()<.12)it.push({t:'gg',x:4,y:3});
   S[k]={k,s,M,mobs,it,prof:pr,ferme:!k0&&!kb&&mobs.length&&R()<.35,boss:kb,depart:k0,vu:k0}});
  // fresques dans les impasses, chapelle près du départ
  const imp=salles.filter(s=>(lien[cle(...s)]||[]).length===1&&cle(...s)!==cle(...start)&&cle(...s)!==cle(...boss));imp.slice(0,4).forEach((s,i)=>S[cle(...s)].it.push({t:'fresque',x:12,y:6,i}));
  const ch=salles.find(s=>prof[cle(...s)]===1);if(ch)S[cle(...ch)].it.push({t:'chapelle',x:2,y:2});
  if(secret){const M=[];for(let y=0;y<RH;y++){M.push([]);for(let x=0;x<RW;x++)M[y].push(x===0||y===0||x===RW-1||y===RH-1?'#':'.')}const x=secret.cote==='o'?RW-1:0;M[4][x]='.';M[5][x]='.';S['sec']={k:'sec',s:[secret.de[0]+(secret.cote==='o'?-1:1),secret.de[1]],M,mobs:[{t:'cam',x:7,y:3},{t:'req',x:9,y:6}],it:[{t:'savoir',x:4,y:4},{t:'pilier',x:11,y:4}],secret:1}}
  return {S,start,boss,cle,secret,verrous:verrous.length}}
 function ouvrir(opt,fin){opt=opt||{};const mode=opt.mode||'lave',lieu=opt.lieu||'l’île',han=!!opt.hanuman;const D=generer(lieu,mode,han);
  const rm=document.getElementById('retM');if(rm)rm.style.visibility='hidden';window.BTUON=1;
  const el=document.createElement('div');el.id='avt';el.innerHTML='<canvas></canvas><div class="bh"><b>'+(mode==='lave'?'Sous '+lieu:opt.titre||'Mission')+'</b> <span id="avI"></span><button class="bt sec" id="avQ">Quitter</button></div><div class="gpad"><button data-k="g">◀</button><button data-k="h">▲</button><button data-k="b">▼</button><button data-k="d">▶</button><button data-k="a">Frapper</button><button data-k="t">Sagaie</button></div><div class="gt" id="avT"></div>';document.body.appendChild(el);
  const cv=el.querySelector('canvas'),x=cv.getContext('2d');let W,H,ts,ox,oy;const taille=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight;ts=Math.floor(Math.min(W*.96/RW,(H-150)/RH));ox=(W-ts*RW)/2;oy=60};taille();addEventListener('resize',taille);
  const K={};const map={arrowleft:'g',q:'g',a:'g',arrowright:'d',d:'d',arrowup:'h',z:'h',w:'h',arrowdown:'b',s:'b',j:'a',' ':'a',k:'t'};
  const kd=e=>{const k=map[e.key.toLowerCase()];if(k){K[k]=1;e.preventDefault()}if(e.key==='Escape')quit()},ku=e=>{const k=map[e.key.toLowerCase()];if(k)K[k]=0};addEventListener('keydown',kd);addEventListener('keyup',ku);
  el.querySelectorAll('.gpad button').forEach(b=>{const k=b.dataset.k;b.onpointerdown=e=>{e.preventDefault();K[k]=1};b.onpointerup=b.onpointerleave=()=>K[k]=0});
  const G={salle:D.cle(...D.start),cles:0,pv:6,pvm:6,gg:opt.grisgris||0,ggUse:0,zeo:0,fres:0,fini:false,issue:'',secret:false,savoir:false,pilier:false,boss:false,libres:false,t:0,inv:0,proj:[],guide:0,msg:''};window.__avt=G;
  const P={x:7.5,y:7.5,dir:[0,-1],at:0,cd:0,tcd:0};
  function dire(h,d){const t=el.querySelector('#avT');t.innerHTML=h;t.classList.add('on');clearTimeout(dire.h);dire.h=setTimeout(()=>t.classList.remove('on'),d||3000)}
  const sal=()=>D.S[G.salle],tile=(a,b)=>{const M=sal().M;return (M[Math.floor(b)]&&M[Math.floor(b)][Math.floor(a)])||'#'};
  const dur=c=>c==='#'||c==='T'||(c==='K')||(c==='S'&&!han)||(c==='F');
  function libreP(px,py){const r=.3;return [[px-r,py-r],[px+r,py-r],[px-r,py+r],[px+r,py+r]].every(([a,b])=>!dur(tile(a,b)))}
  function entrer(k,dx,dy){const s=D.S[k];if(!s)return;G.salle=k;s.vu=1;if(dx>0)P.x=1.2;if(dx<0)P.x=RW-1.2;if(dy>0)P.y=1.2;if(dy<0)P.y=RH-1.2;s.mobsV=s.mobsV||s.mobs.map(m=>({...m,...MOB[m.t],pvm:MOB[m.t].pv,cd:0,vx:0,vy:0,vis:1}));
   if(s.ferme&&s.mobsV.some(m=>m.pv>0)){s.M.forEach((r,y)=>r.forEach((c,x2)=>{if((x2===0||x2===RW-1||y===0||y===RH-1)&&c==='.')r[x2]='F'}));dire('Les portes se referment derrière vous : battez tout ce qui bouge.',2200)}
   if(s.secret&&!G.secret){G.secret=true;dire('<b>Le passage d’Hanuman</b><br>La roche cède : derrière, la salle que les anciens ont cachée.',4000)}if(s.boss)dire('<b>'+(mode==='lave'?'Le gardien de lave':'Le chef du détachement')+'</b> vous attend.',2500)}
  function voisine(dx,dy){const s=sal();if(s.secret)return D.cle(D.secret.de[0],D.secret.de[1]);const n=[s.s[0]+dx,s.s[1]+dy];if(D.secret&&D.cle(...n)===D.cle(D.secret.de[0]+(D.secret.cote==='o'?-1:1),D.secret.de[1]))return 'sec';return D.cle(...n)}
  function blesse(n,m){if(G.inv>0||G.fini)return;G.pv-=n;G.inv=1;if(m)dire(m,1800);if(G.pv<=0)tombe(false)}
  function tombe(lave){if(G.gg>0){G.gg--;G.ggUse++;G.pv=3;dire('<b>Le gris-gris brûle dans votre main</b><br>Les ancêtres vous rendent le souffle.',3500);return}G.fini=true;G.issue=lave?'mort':'blesse';finir(lave?'<b>Mort dans la lave</b><br>Le corps ne remontera pas. Au camp, on chantera son nom.':'<b>Blessé</b><br>Vos compagnons vous ramènent au camp.')}
  function finir(h){dire(h+'<br><button class="bt" id="avOk">Remonter</button>',60000);setTimeout(()=>{const b=el.querySelector('#avOk');if(b)b.onclick=()=>quit()},50)}
  function maj(dt){if(G.fini)return;G.t+=dt;if(G.inv>0)G.inv-=dt;if(G.guide>0)G.guide-=dt;const s=sal();
   let dx=(K.d?1:0)-(K.g?1:0),dy=(K.b?1:0)-(K.h?1:0);if(dx||dy){const l=Math.hypot(dx,dy);P.dir=[Math.round(dx/l),Math.round(dy/l)];const sp=4.2*dt;if(libreP(P.x+dx/l*sp,P.y))P.x+=dx/l*sp;if(libreP(P.x,P.y+dy/l*sp))P.y+=dy/l*sp}
   P.cd-=dt;P.tcd-=dt;if(P.at>0)P.at-=dt;if(K.a&&P.cd<=0){P.at=.18;P.cd=.35;const hx=P.x+P.dir[0]*.9,hy=P.y+P.dir[1]*.9;(s.mobsV||[]).forEach(m=>{if(m.pv>0&&Math.hypot(m.x-hx,m.y-hy)<.85){m.pv--;m.vx=P.dir[0]*6;m.vy=P.dir[1]*6;if(m.pv<=0)tue(m)}})}
   if(K.t&&P.tcd<=0){P.tcd=.9;G.proj.push({x:P.x,y:P.y,vx:P.dir[0]*9,vy:P.dir[1]*9,a:1})}
   G.proj.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;if(dur(tile(p.x,p.y)))p.mort=1;if(p.a)(s.mobsV||[]).forEach(m=>{if(!p.mort&&m.pv>0&&Math.hypot(m.x-p.x,m.y-p.y)<.6){p.mort=1;m.pv--;if(m.pv<=0)tue(m)}});else if(!p.mort&&Math.hypot(P.x-p.x,P.y-p.y)<.5){p.mort=1;blesse(1,'Une boule de feu vous brûle.')}});G.proj=G.proj.filter(p=>!p.mort);
   // ennemis
   (s.mobsV||[]).forEach(m=>{if(m.pv<=0)return;m.cd-=dt;const ddx=P.x-m.x,ddy=P.y-m.y,d=Math.hypot(ddx,ddy)||1;let vx=0,vy=0;
    if(m.ia==='garde'&&opt.furtif&&!G.alerte){m.dir=(m.dir??Math.random()*6)+dt*.7;const da=Math.atan2(Math.sin(Math.atan2(ddy,ddx)-m.dir),Math.cos(Math.atan2(ddy,ddx)-m.dir));let vu=d<4.5&&Math.abs(da)<.9;if(vu){for(let q=.1;q<1;q+=.1){if(dur(tile(m.x+ddx*q,m.y+ddy*q))){vu=false;break}}}if(vu){G.alerte=true;dire('<b>Alerte !</b> Un garde vous a vu : tous les gardes accourent.',2500)}vx=Math.cos(m.dir)*.3;vy=Math.sin(m.dir)*.3}
    else if(m.ia==='chasse'||m.ia==='garde'&&(d<5||G.alerte)){vx=ddx/d;vy=ddy/d}else if(m.ia==='vole'){vx=Math.cos(G.t*2+m.x);vy=Math.sin(G.t*1.7+m.y);if(d<4){vx+=ddx/d;vy+=ddy/d}}else if(m.ia==='charge'){if(m.cd<=0&&d<6){m.cd=2.2;m.ch=.6;m.cx=ddx/d;m.cy=ddy/d}if(m.ch>0){m.ch-=dt;vx=m.cx*3;vy=m.cy*3}}else if(m.ia==='cache'){m.vis=d<2.5?1:.12;if(d<2&&m.cd<=0){m.cd=1.6;m.coup=.25;blesse(2,'Le caméléon géant tranche l’air de sa langue de pierre.')}if(m.coup>0)m.coup-=dt}else if(m.ia==='boss'){vx=ddx/d*.6;vy=ddy/d*.6;if(m.cd<=0){m.cd=1.4;for(let a=0;a<6;a++){const an=a*Math.PI/3+G.t;G.proj.push({x:m.x,y:m.y,vx:Math.cos(an)*4,vy:Math.sin(an)*4,a:0})}}}
    const sp=m.v/30*dt;m.vx*=.85;m.vy*=.85;const nx=m.x+vx*sp+m.vx*dt,ny=m.y+vy*sp+m.vy*dt;if(!dur(tile(nx,m.y))&&tile(nx,m.y)!=='L'||m.ia==='vole'||m.t==='sal')m.x=Math.max(1.2,Math.min(RW-1.2,nx));if(!dur(tile(m.x,ny))&&tile(m.x,ny)!=='L'||m.ia==='vole'||m.t==='sal')m.y=Math.max(1.2,Math.min(RH-1.2,ny));
    if(d<.7&&m.ia!=='cache')blesse(m.d,m.n+' vous touche.')});
   // portes qui se rouvrent quand la salle est vidée
   if(s.ferme&&s.mobsV&&s.mobsV.every(m=>m.pv<=0)){s.ferme=false;s.M.forEach(r=>r.forEach((c,x2)=>{if(c==='F')r[x2]='.'}));dire('Les portes se rouvrent.',1500)}
   // lave
   if(tile(P.x,P.y)==='L'){G.lv=(G.lv||0)+dt;if(G.lv>.5){G.lv=0;blesse(1,'La lave vous brûle les pieds.');if(G.pv<=0&&!G.fini)tombe(true)}}
   // objets
   s.it.forEach(o=>{if(o.pris||Math.hypot(P.x-o.x-.5,P.y-o.y-.5)>.7)return;
    if(o.t==='cle'){o.pris=1;G.cles++;dire('Une clé de basalte. Elle ouvre une porte scellée.',2000)}else if(o.t==='zeo'){o.pris=1;G.zeo++}else if(o.t==='vivre'){o.pris=1;G.zeo++;dire('Des provisions cachées.',1500)}else if(o.t==='coeur'){o.pris=1;G.pvm++;G.pv=G.pvm;dire('Un fruit de vie : un cœur de plus.',2000)}else if(o.t==='gg'){o.pris=1;G.gg++;dire('Un gris-gris oublié : il vous gardera de la mort une fois.',2500)}
    else if(o.t==='fresque'){o.pris=1;G.fres++;dire('<i>'+FRESQ[Math.min(G.fres-1,FRESQ.length-1)]+'</i>',6000)}else if(o.t==='chapelle'&&!o.vu){o.vu=1;G.pv=G.pvm;G.guide=60;Object.values(D.S).forEach(q=>q.carte=1);dire('<b>Une chapelle creusée dans la roche</b><br>Un ancêtre apparaît dans la fumée : il vous soigne et vous montre tout le donjon.',5000)}
    else if(o.t==='savoir'&&!G.savoir){o.pris=1;G.savoir=true;dire('<b>La salle des savoirs anciens</b><br>Des tablettes de basalte gravées par le peuple d’Adaman : remèdes, ciel, passages entre les îles.',7000)}else if(o.t==='pilier'&&!G.pilier){o.pris=1;G.pilier=true;dire('<b>Le pilier sous '+lieu+'</b><br>Tant qu’on le garde, l’histoire, le mystique et la vie des gens restent accordés.',7000)}
    else if(o.t==='sortie'){G.fini=true;finir('<b>'+(mode==='lave'?'La sortie':'Mission accomplie')+'</b><br>'+(mode==='lave'?G.zeo+' zéolithe(s), '+G.fres+' fresque(s).':'Les captifs sont libres. Ils remontent avec vous vers les bois.'))}});
   // portes à clé : on les ouvre en les touchant avec une clé
   [[P.x+P.dir[0]*.6,P.y+P.dir[1]*.6]].forEach(([a,b])=>{if(tile(a,b)==='K'&&G.cles>0){G.cles--;const M=s.M;const fx=Math.floor(a),fy=Math.floor(b);[[0,0],[0,1],[0,-1],[1,0],[-1,0]].forEach(([u,v])=>{if(M[fy+v]&&M[fy+v][fx+u]==='K')M[fy+v][fx+u]='.'});const k2=voisine(fx===0?-1:fx===RW-1?1:0,fy===0?-1:fy===RH-1?1:0);const t2=D.S[k2];if(t2)t2.M.forEach(r=>r.forEach((c,x2)=>{if(c==='K')r[x2]='.'}));dire('La porte scellée s’ouvre.',1500)}});
   // changer de salle
   if(P.x<.5)changer(-1,0);else if(P.x>RW-.5)changer(1,0);else if(P.y<.5)changer(0,-1);else if(P.y>RH-.5)changer(0,1);
   el.querySelector('#avI').textContent='· '+'♥'.repeat(Math.max(0,G.pv))+'♡'.repeat(Math.max(0,G.pvm-G.pv))+' · clés '+G.cles+(G.gg?' · gris-gris '+G.gg:'')+(mode==='lave'?' · zéolithes '+G.zeo+' · fresques '+G.fres:'')}
  function tue(m){if(m.ia==='boss'){G.boss=true;const s=sal();s.it.push({t:'sortie',x:7,y:4});dire('<b>'+m.n+' est vaincu !</b><br>'+(mode==='lave'?'Un escalier de lave figée remonte vers le jour.':'Les clés de l’enclos tombent de sa ceinture. Les captifs sont libres : rejoignez la sortie.'),5000);if(mode==='mission')G.libres=true}}
  function changer(dx,dy){const k=voisine(dx,dy);if(!D.S[k]){P.x=Math.max(.6,Math.min(RW-.6,P.x));P.y=Math.max(.6,Math.min(RH-.6,P.y));return}entrer(k,dx,dy)}
  function dessin(){x.fillStyle=mode==='lave'?'#1a0e0a':'#10180e';x.fillRect(0,0,W,H);const s=sal();
   for(let y=0;y<RH;y++)for(let x2=0;x2<RW;x2++){const c=s.M[y][x2],X=ox+x2*ts,Y=oy+y*ts;x.fillStyle=mode==='lave'?((x2+y)%2?'#3a2a22':'#36261e'):((x2+y)%2?'#3a5a30':'#36562c');x.fillRect(X,Y,ts,ts);
    if(c==='#'||(c==='S'&&!han)){x.fillStyle=mode==='lave'?'#5a3a2a':'#4a4a3a';x.fillRect(X,Y,ts,ts);x.fillStyle='rgba(0,0,0,.3)';x.fillRect(X,Y+ts-5,ts,5)}
    if(c==='S'&&han){x.fillStyle='#5a3a2a';x.fillRect(X,Y,ts,ts);x.strokeStyle='rgba(232,190,90,'+(.5+Math.sin(G.t*3)*.3)+')';x.lineWidth=2;x.strokeRect(X+4,Y+4,ts-8,ts-8)}
    if(c==='T'){x.fillStyle='#1e4a1e';x.beginPath();x.arc(X+ts/2,Y+ts/2,ts*.45,0,7);x.fill()}
    if(c==='L'){x.fillStyle='#e8683a';x.fillRect(X,Y,ts,ts);x.fillStyle='rgba(255,210,90,.5)';x.fillRect(X+((G.t*20+x2*9)%ts),Y+ts*.3,5,4)}
    if(c==='K'){x.fillStyle='#8a6a2a';x.fillRect(X,Y,ts,ts);x.fillStyle='#e2bd74';x.fillRect(X+ts*.4,Y+ts*.3,ts*.2,ts*.4)}
    if(c==='F'){x.fillStyle='#6a2a20';x.fillRect(X,Y,ts,ts)}}
   s.it.forEach(o=>{if(o.pris&&o.t!=='chapelle')return;const X=ox+(o.x+.5)*ts,Y=oy+(o.y+.5)*ts;x.font=Math.round(ts*.7)+'px serif';x.textAlign='center';x.textBaseline='middle';x.fillText({cle:'🗝',zeo:'💎',vivre:'🧺',coeur:'❤',gg:'🧿',fresque:'📜',chapelle:'⛪',savoir:'📘',pilier:'🔥',sortie:'⇧'}[o.t]||'?',X,Y)});
   (s.mobsV||[]).forEach(m=>{if(m.pv<=0)return;const X=ox+m.x*ts,Y=oy+m.y*ts;if(opt.furtif&&!G.alerte&&m.ia==='garde'&&m.dir!=null){x.fillStyle='rgba(240,210,80,.16)';x.beginPath();x.moveTo(X,Y);x.arc(X,Y,4.5*ts,m.dir-.9,m.dir+.9);x.closePath();x.fill()}x.globalAlpha=m.vis??1;x.fillStyle=m.col;x.beginPath();x.arc(X,Y,ts*(m.ia==='boss'?.7:.35),0,7);x.fill();x.fillStyle='#fff';x.fillRect(X-ts*.12,Y-ts*.1,3,3);x.fillRect(X+ts*.08,Y-ts*.1,3,3);x.globalAlpha=1;if(m.ia==='boss'){x.fillStyle='#300';x.fillRect(ox,oy-14,ts*RW,6);x.fillStyle='#e8683a';x.fillRect(ox,oy-14,ts*RW*m.pv/m.pvm,6)}});
   G.proj.forEach(p=>{x.fillStyle=p.a?'#e2bd74':'#ff7030';x.beginPath();x.arc(ox+p.x*ts,oy+p.y*ts,ts*.12,0,7);x.fill()});
   const X=ox+P.x*ts,Y=oy+P.y*ts;x.fillStyle=G.inv>0&&Math.sin(G.t*40)>0?'#fff':'#e2bd74';x.beginPath();x.arc(X,Y,ts*.32,0,7);x.fill();x.fillStyle='#3a2a1c';x.fillRect(X+P.dir[0]*ts*.15-3,Y+P.dir[1]*ts*.15-3,6,6);
   if(P.at>0){x.strokeStyle='#fff';x.lineWidth=4;x.beginPath();x.moveTo(X,Y);x.lineTo(X+P.dir[0]*ts*.95,Y+P.dir[1]*ts*.95);x.stroke()}
   // la carte du donjon
   const mw=14,mx=W-GW*mw-20,my=66;x.fillStyle='rgba(0,0,0,.6)';x.fillRect(mx-4,my-4,(GW+1)*mw+8,GH*mw+8);Object.values(D.S).forEach(q=>{if(!q.vu&&!q.carte)return;x.fillStyle=q.secret?'#a04a2a':q.boss?'#d05030':q.vu?'#8a7a68':'#4a4038';x.fillRect(mx+q.s[0]*mw+(q.secret&&q.s[0]<0?mw:0),my+q.s[1]*mw,mw-2,mw-2)});x.fillStyle='#e2bd74';x.fillRect(mx+s.s[0]*mw+3,my+s.s[1]*mw+3,mw-8,mw-8)}
  let stop=false,t0=performance.now();function boucle(t){if(stop)return;const dt=Math.min(.4,(t-t0)/1000);t0=t;for(let r=dt;r>1e-4;r-=.03)maj(Math.min(.03,r));dessin();requestAnimationFrame(boucle)}
  function quit(){if(stop)return;stop=true;window.BTUON=0;removeEventListener('keydown',kd);removeEventListener('keyup',ku);removeEventListener('resize',taille);el.remove();if(rm)rm.style.visibility='';if(fin)fin({ok:mode==='mission'?G.libres&&!G.issue:G.boss&&!G.issue,fini:G.boss&&!G.issue,zeo:G.zeo,fresques:G.fres,secret:G.secret,savoir:G.savoir,pilier:G.pilier,lieu,issue:G.issue,gg:G.gg,ggUse:G.ggUse})}
  el.querySelector('#avQ').onclick=()=>quit();entrer(G.salle,0,0);P.x=7.5;P.y=7.5;dire(mode==='lave'?'<b>Sous '+lieu+'</b><br>Un donjon de tubes de lave. Trouvez les clés, ouvrez les portes scellées, battez le gardien.'+(han?' Le savoir d’Hanuman ouvre un passage caché dans un mur de bord.':''):'<b>'+(opt.titre||'Mission')+'</b><br>'+(opt.texte||'Libérez les captifs et ressortez.'),5000);requestAnimationFrame(boucle);return {quit,G,D,P}}
 return {ouvrir,generer}})();
window.ouvrirAventure=AVT.ouvrir;
