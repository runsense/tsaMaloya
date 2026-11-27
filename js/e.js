
// ===== Échecs d'invasion : un parcours de batailles sur échiquier (inspiré de The Ouroboros King) =====
// Une carte en pointillés (combats, découvertes, runes, recrues), puis des batailles où chaque pièce a sa manière de bouger.
// ouvrirEchecs(k, fin) : k = campagne de ECH.C ; fin({ok, victoires}).
const ECH=(()=>{
 const N=8;
 const P={R:{n:'Roi marron',s:'♚',v:100,r:'Un pas dans toutes les directions. Une fois par bataille, il rappelle un mort des anciens combats à ses côtés.',f:'Tant qu’il vit, rien n’est perdu.'},
  G:{n:'Gouverneur',s:'♚',v:100,r:'Un pas dans toutes les directions. Une fois par bataille, sa clarinette redonne courage : les siens autour de lui résistent à une prise.',f:'On le suit parce qu’on le craint.'},
  E:{n:'Commandant',s:'♚',v:100,r:'Un pas dans toutes les directions. Prenez-le pour gagner.',f:'Le chef de la colonne.'},
  g:{n:'Guerrier',s:'♟',v:2,r:'Avance ou va de côté d’une case ; prend devant ou en diagonale devant. Aguerri, il prend tout autour.',f:'Les poings et la sagaie.'},
  e:{n:'Éclaireur',s:'♞',v:3,r:'Saute en L, comme le cavalier.',f:'Il connaît les sentiers que personne ne voit.'},
  m:{n:'Mystique',s:'✦',v:4,r:'Va sur n’importe quelle case libre. Ne prend que sur les cases voisines.',f:'Pas la meilleure combattante, mais elle est partout.'},
  l:{n:'Lanceur',s:'➶',v:3,r:'Bouge d’une case. Tire sans bouger : jusqu’à 4 cases depuis une hauteur, 2 cases dans les bas.',f:'Du haut des remparts, sa sagaie porte loin.'},
  p:{n:'Pêcheur',s:'⚓',v:3,r:'Parcourt toute la rivière d’un coup. Tue sans bouger ce qui est juste à côté de lui.',f:'La rivière est son chemin.'},
  c:{n:'Carabinier',s:'⌐',v:4,r:'Bouge d’une case. Tire sur toute la ligne droite, jusqu’au premier qu’il voit. Il doit recharger un tour après.',f:'Un coup, puis la poudre et la baguette.'},
  k:{n:'Canonnier',s:'✹',v:5,r:'Ne bouge qu’en ligne droite, deux cases au plus. Tire sur les trois cases devant lui ; recharge deux tours.',f:'Lourd, lent, terrible.'},
  s:{n:'Soldat',s:'♟',v:1,r:'Avance d’une ou deux cases, ou d’une en diagonale ; prend en diagonale devant. Au bout de l’échiquier, il devient officier.',f:'Un habit, un fusil, des ordres.'},
  d:{n:'Dragon',s:'♞',v:3,r:'Saute en L.',f:'Le soldat à cheval.'},
  o:{n:'Officier',s:'♝',v:3,r:'Glisse en diagonale, trois cases au plus.',f:'Il commande la ligne.'},
  L:{n:'La Lame',s:'†',v:4,r:'Un pas dans toutes les directions. Après une prise, elle rejoue aussitôt.',f:'Elle entre dans les cases sans un bruit.'},
  f:{n:'Le Furieux',s:'⚔',v:4,r:'Jusqu’à trois pas en ligne droite, en changeant de direction. Une prise arrête sa course.',f:'Quand il part, personne ne le retient.'},
  a:{n:'Papangue',s:'⋀',v:4,r:'Un pas en diagonale, puis aussi loin qu’il veut en ligne droite.',f:'Le busard de l’île tombe du ciel sur sa proie.'},
  y:{n:'Paille-en-queue',s:'⋎',v:4,r:'Un pas en ligne droite, puis aussi loin qu’il veut en diagonale.',f:'L’oiseau blanc des remparts trace sa route en biais.'},
  A:{n:'L’Ancêtre',s:'☥',v:6,r:'Un pas dans toutes les directions. Seul un roi peut le prendre.',f:'On ne tue pas deux fois ceux qui sont déjà morts.'},
  t:{n:'Ti-Jean',s:'☺',v:3,r:'Bouge comme la dernière pièce que l’ennemi a jouée. Au premier tour, il ne bouge pas.',f:'Le malin des contes : il fait comme le plus fort, en mieux.'},
  H:{n:'Héva',s:'♕',v:5,r:'Un pas dans toutes les directions, ou deux en diagonale. Après sa première prise, elle devient reine.',f:'La reine des marrons de la légende.'},
  Q:{n:'Reine marronne',s:'♛',v:9,r:'Glisse en ligne droite et en diagonale.',f:'Ce que Héva est devenue.'},
  b:{n:'Le Gardien de pierre',s:'⬢',v:5,r:'Ne bouge que pour prendre : en ligne droite, d’un pas, ou en L.',f:'Une pierre de basalte qui se lève quand on approche.'},
  K:{n:'Grand-mère Kalle',s:'☾',v:6,r:'Un pas dans toutes les directions. Quand elle prend une pièce, elle garde sa façon de bouger pour la bataille.',f:'La sorcière des contes de l’île vole ce qu’elle touche.'},
  x:{n:'Chasseur de marrons',s:'♞',v:4,r:'Un pas dans toutes les directions ; après une prise, il rejoue.',f:'Il suit la piste et ne lâche pas.'},
  C:{n:'Commandant monté',s:'♚',v:100,r:'Un pas dans toutes les directions, ou un saut en L. Prenez-le pour gagner.',f:'Le chef du détachement, à cheval sur les chemins du bas.'},
  r:{n:'Le Curé',s:'✝',v:3,r:'Glisse en diagonale, ou un pas dans toutes les directions.',f:'Il bénit la troupe avant la battue.'},
  Z:{n:'Le Grand Chasseur',s:'☠',v:8,r:'Un pas dans toutes les directions. Vos pièces juste à côté de lui sont figées par la peur.',f:'Celui dont on dit le nom tout bas.'},
  X:{n:'Poudrière',s:'✷',v:0,r:'Si on la touche, elle explose : tout ce qui est autour disparaît, amis comme ennemis.',f:'Un baril oublié par la milice.'},
  h:{n:'Chien de chasse',s:'◆',v:2,r:'Court d’une ou deux cases en ligne droite et mord.',f:'Il suit la piste mieux que l’homme.'}};
 const C={detache:{n:'Le détachement monte',lieu:'Les Hauts, 1730',roi:'R',arm:[['g',0,0],['g',1,0],['g',2,0],['l',3,0],['e',1,1],['R',2,1]],en:['s','s','s','h','x','c','d','r','k'],rec:['g','l','e','m','p','L','f','a','y','t','H','A'],boss:'Z',t:'Une colonne de la milice monte vers vos camps. Le chemin passe par des hauteurs, une rivière et des bois.'},
  grandport:{n:'Grand Port, 1810',lieu:'Île de France, 1810',roi:'G',arm:[['s',0,0],['s',1,0],['s',2,0],['c',3,0],['k',1,1],['G',2,1]],en:['s','s','s','c','d','k','o','c','x'],rec:['s','c','k','o','d','r','L'],t:'La flotte anglaise force la passe de Grand Port. Seule victoire navale de Napoléon gravée sur l’Arc de triomphe : à vous de la gagner.'},
  madras:{n:'Madras, 1746',lieu:'Inde, 1746',roi:'G',arm:[['s',0,0],['s',1,0],['c',2,0],['s',3,0],['o',1,1],['G',2,1]],en:['s','s','s','c','o','k','d','c','x'],rec:['s','c','k','o','d','r','L'],t:'La Bourdonnais, parti de l’île de France, assiège le fort anglais de Madras.'},
  anciens:{n:'Le réveil des anciens',lieu:'Sous le Piton, temps du mythe',roi:'R',arm:[['m',0,0],['g',1,0],['p',2,0],['m',3,0],['l',1,1],['R',2,1]],en:['s','s','h','c','d','k','x','r','s'],rec:['m','p','l','e','g','A','K','b','a','y','t'],boss:'Z',t:'Le peuple d’Hanuman se lève des tunnels de lave pour défendre le pilier.'}};
 const NOD={combat:{i:'⚔',n:'Combat'},decouv:{i:'⌂',n:'Lieu de découverte',d:'Un de vos guerriers s’aguerrit.'},rune:{i:'ᚱ',n:'Pierre de runes',d:'Un pouvoir mystique pour toute la campagne.'},recrue:{i:'✚',n:'Recrue',d:'Quelqu’un rejoint votre troupe.'},boss:{i:'♛',n:'Bataille finale'},enigme:{i:'?',n:'Énigme',d:'Une énigme à résoudre : réussie, elle rapporte de l’or et aguerrit un des vôtres.'}};
 const RELIQ={grisgris:{n:'Gris-gris',d:'Le premier des vôtres pris dans une bataille revient à la fin.'},brume:{n:'Brume des esprits',d:'Les tireurs ennemis ne voient rien pendant les deux premiers tours.'},lave:{n:'Pierre de lave',d:'Plus de rochers sur l’échiquier : de quoi se cacher.'},tambour:{n:'Tambour du kabar',d:'Vos guerriers commencent la bataille aguerris.'}};
 function carte(R){const L=[];for(let r=0;r<5;r++){const n=r===4?1:r===0?2:2+Math.floor(R()*2);const row=[];for(let i=0;i<n;i++){const t=r===4?'boss':r===0?'combat':['combat','combat','decouv','rune','recrue','enigme'][Math.floor(R()*6)];row.push({t,x:(i+1)/(n+1),r})}L.push(row)}
  // chaque nœud mène à un ou deux nœuds du rang suivant
  L.forEach((row,r)=>row.forEach((nd,i)=>{if(r===4)return;const nx=L[r+1];nd.vers=nx.map((q,j)=>j).filter(j=>Math.abs(nx[j].x-nd.x)<.42);if(!nd.vers.length)nd.vers=[0]}));return L}
 function ouvrir(k,fin){const D=C[k]||C.detache,rm=document.getElementById('retM');if(rm)rm.style.visibility='hidden';window.BTUON=1;
  const dif=(typeof S!=='undefined'&&S&&S.dif)||'normal',HZ=dif==='histoire'?12:dif==='expert'?.5:3;
  let sd=Date.now();const R=()=>{sd=(sd*9301+49297)%233280;return sd/233280};
  const el=document.createElement('div');el.id='ech';el.innerHTML='<canvas></canvas><div class="bh"><b>'+D.n+'</b> · '+D.lieu+' <span id="echI"></span><button class="bt sec" id="echQ">Quitter</button></div><div class="ecv" id="echV"></div><div class="bp" id="echP"></div>';document.body.appendChild(el);
  const cv=el.querySelector('canvas'),x=cv.getContext('2d');let W,H,cs,ox,oy;
  const G={vue:'carte',map:carte(R),pos:null,arm:D.arm.map(a=>({t:a[0],c:a[1],r:a[2],lv:0})),morts:[],rel:{},or:3,vic:0,fini:false,ok:false,msg:D.t};try{if(window.rune186Appl)rune186Appl(G,D,P,k)}catch(e){}window.__ech=G;
  const taille=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight;cs=Math.floor(Math.min((W-(W>900?340:20))*.92/N,(H-210)/N,74));ox=W>900?Math.max(20,(W-340-cs*N)/2):(W-cs*N)/2;oy=84;dessin()};
  // ----- la bataille -----
  let B=null;
  function bataille(boss){const lv=G.vic;B={g:Array.from({length:N},()=>Array(N).fill(null)),roc:new Set(),riv:new Set(),gue:new Set(),haut:new Set(),tour:'j',n:0,sel:null,dern:null,mortsB:[],rappel:1,clar:1,tirs:[]};
   const riv=3+Math.floor(R()*2);for(let i=0;i<N;i++)B.riv.add(i+','+riv);[Math.floor(R()*3),5+Math.floor(R()*3)].forEach(i=>{B.riv.delete(i+','+riv);B.gue.add(i+','+riv)});
   const nr=(G.rel.lave?6:3)+Math.floor(R()*2);for(let q=0;q<nr;q++){const a=Math.floor(R()*N),b=2+Math.floor(R()*4);if(b!==riv)B.roc.add(a+','+b)}
   [[1,6],[5,6],[2,1],[6,2]].forEach(([a,b])=>{B.haut.add(a+','+b);B.haut.add((a+1)+','+b)});
   G.arm.forEach(u=>{const X=2+u.c,Y=6+u.r;B.g[Y][X]={t:u.t,s:'j',lv:G.rel.tambour&&u.t==='g'?Math.max(1,u.lv):u.lv,bou:u.lv>=2?1:0,ref:u,rel:0}});
   const pool=D.en.slice(0,Math.min(D.en.length,3+lv+(boss?2:0)));const roiE=D.roi==='G'?'E':'C';B.g[0][3+Math.floor(R()*2)]={t:roiE,s:'e',lv:0,rel:0};
   pool.forEach(t=>{for(let g=0;g<30;g++){const a=Math.floor(R()*N),b=Math.floor(R()*2);if(!B.g[b][a]){B.g[b][a]={t,s:'e',lv:boss?1:0,bou:boss&&R()<.3?1:0,rel:0};break}}});
   if(boss&&D.boss){for(let g=0;g<30;g++){const a=Math.floor(R()*N);if(!B.g[1][a]){B.g[1][a]={t:D.boss,s:'e',lv:1,rel:0};break}}}
   B.tun=[];for(let q=0;q<2;q++){for(let g=0;g<40;g++){const a=Math.floor(R()*N),b=2+Math.floor(R()*4),k2=a+','+b;if(!B.g[b][a]&&!B.roc.has(k2)&&!B.riv.has(k2)&&!B.gue.has(k2)&&!B.tun.includes(k2)){B.tun.push(k2);break}}}
   for(let g=0;g<40;g++){const a=Math.floor(R()*N),b=3+Math.floor(R()*2),k2=a+','+b;if(!B.g[b][a]&&!B.roc.has(k2)&&!B.riv.has(k2)&&!B.tun.includes(k2)){B.g[b][a]={t:'X',s:'n',lv:0,rel:0};break}}
   G.vue='bat';G.msg=boss?'La bataille finale : prenez le chef ennemi.':'Prenez le chef ennemi pour gagner.';ui();dessin()}
  const dans=(a,b)=>a>=0&&b>=0&&a<N&&b<N,libre=(a,b)=>dans(a,b)&&!B.g[b][a]&&!B.roc.has(a+','+b)&&!B.riv.has(a+','+b),obst=(a,b)=>B.roc.has(a+','+b)||!!B.g[b][a];
  const D8=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
  function coups(i,j,tt){const u=B.g[j][i];if(!u||u.s==='n')return [];if(u.s==='j'&&!tt&&D8.some(([a,b])=>{const v=dans(i+a,j+b)&&B.g[j+b][i+a];return v&&v.t==='Z'&&v.s==='e'}))return [];const L=[],en=(a,b)=>dans(a,b)&&B.g[b][a]&&B.g[b][a].s!==u.s,fw=u.s==='j'?-1:1,brume=G.rel.brume&&u.s==='e'&&B.n<4;
   const pas=(a,b,cap)=>{if(libre(a,b))L.push({x:a,y:b,k:'m'});else if(cap!==false&&en(a,b)&&!B.riv.has(a+','+b))L.push({x:a,y:b,k:'c'})};
   const ligneTir=(dx,dy,max)=>{for(let q=1;q<=max;q++){const a=i+dx*q,b=j+dy*q;if(!dans(a,b)||B.roc.has(a+','+b))return;if(B.g[b][a]){if(B.g[b][a].s!==u.s)L.push({x:a,y:b,k:'t'});return}}};
   const glisse=(dx,dy,x0,y0)=>{for(let q=1;q<N;q++){const a=x0+dx*q,b=y0+dy*q;if(!dans(a,b)||B.roc.has(a+','+b))break;if(B.g[b][a]){if(en(a,b)&&!B.riv.has(a+','+b))L.push({x:a,y:b,k:'c'});break}if(!B.riv.has(a+','+b))L.push({x:a,y:b,k:'m'})}};
   let ty=tt||u.t;if(ty==='K'&&u.copie)ty=u.copie;if(ty==='t'){ty=B.lastE||null;if(!ty||'RGECZ'.includes(ty))ty=ty?'R':null;if(!ty)return []}
   switch(ty){case 'R':case 'G':case 'E':case 'L':case 'x':case 'A':case 'K':case 'Z':D8.forEach(([a,b])=>pas(i+a,j+b));break;
    case 'C':D8.forEach(([a,b])=>pas(i+a,j+b));[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]].forEach(([a,b])=>pas(i+a,j+b));break;
    case 'f':{const vu=new Set();const go=(a,b,n)=>{if(n===0)return;[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{const c=a+dx,d=b+dy,k2=c+','+d;if(!dans(c,d)||(c===i&&d===j))return;if(libre(c,d)){if(!vu.has(k2)){vu.add(k2);L.push({x:c,y:d,k:'m'})}go(c,d,n-1)}else if(en(c,d)&&!B.riv.has(k2)&&!vu.has('c'+k2)){vu.add('c'+k2);L.push({x:c,y:d,k:'c'})}})};go(i,j,3);break}
    case 'a':[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dx,dy])=>{const c=i+dx,d=j+dy;if(!dans(c,d))return;if(en(c,d)){L.push({x:c,y:d,k:'c'});return}if(!libre(c,d))return;L.push({x:c,y:d,k:'m'});[[1,0],[-1,0],[0,1],[0,-1]].forEach(([ex,ey])=>glisse(ex,ey,c,d))});break;
    case 'y':[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{const c=i+dx,d=j+dy;if(!dans(c,d))return;if(en(c,d)){L.push({x:c,y:d,k:'c'});return}if(!libre(c,d))return;L.push({x:c,y:d,k:'m'});[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([ex,ey])=>glisse(ex,ey,c,d))});break;
    case 'H':D8.forEach(([a,b])=>pas(i+a,j+b));[[2,2],[2,-2],[-2,2],[-2,-2]].forEach(([a,b])=>pas(i+a,j+b));break;
    case 'Q':D8.forEach(([dx,dy])=>glisse(dx,dy,i,j));break;
    case 'r':D8.forEach(([a,b])=>pas(i+a,j+b));[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dx,dy])=>glisse(dx,dy,i,j));break;
    case 'b':D8.forEach(([a,b])=>{if(en(i+a,j+b))L.push({x:i+a,y:j+b,k:'c'})});[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{for(let q=2;q<N;q++){const a=i+dx*q,b=j+dy*q;if(!dans(a,b)||B.roc.has(a+','+b))break;if(B.g[b][a]){if(en(a,b))L.push({x:a,y:b,k:'c'});break}}});[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]].forEach(([a,b])=>{if(en(i+a,j+b))L.push({x:i+a,y:j+b,k:'c'})});break;
    case 'g':[[0,fw],[1,0],[-1,0],[1,fw],[-1,fw]].forEach(([a,b])=>{if(libre(i+a,j+b)&&(a===0||b===0))L.push({x:i+a,y:j+b,k:'m'})});(u.lv?D8:[[0,fw],[1,fw],[-1,fw]]).forEach(([a,b])=>{if(en(i+a,j+b))L.push({x:i+a,y:j+b,k:'c'})});break;
    case 's':if(libre(i,j+fw)){L.push({x:i,y:j+fw,k:'m'});if(libre(i,j+2*fw))L.push({x:i,y:j+2*fw,k:'m'})}[[1,fw],[-1,fw]].forEach(([a,b])=>{if(libre(i+a,j+b))L.push({x:i+a,y:j+b,k:'m'})});[[1,fw],[-1,fw]].forEach(([a,b])=>{if(en(i+a,j+b))L.push({x:i+a,y:j+b,k:'c'})});break;
    case 'e':case 'd':[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]].forEach(([a,b])=>pas(i+a,j+b));break;
    case 'm':for(let b=0;b<N;b++)for(let a=0;a<N;a++)if(libre(a,b))L.push({x:a,y:b,k:'m'});D8.forEach(([a,b])=>{if(en(i+a,j+b))L.push({x:i+a,y:j+b,k:'c'})});break;
    case 'o':[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dx,dy])=>{for(let q=1;q<=3;q++){const a=i+dx*q,b=j+dy*q;if(!dans(a,b)||B.roc.has(a+','+b))break;if(B.g[b][a]){if(en(a,b))L.push({x:a,y:b,k:'c'});break}if(!B.riv.has(a+','+b))L.push({x:a,y:b,k:'m'})}});break;
    case 'l':D8.forEach(([a,b])=>pas(i+a,j+b,false));if(!brume)D8.forEach(([a,b])=>ligneTir(a,b,B.haut.has(i+','+j)?4:2));break;
    case 'p':D8.forEach(([a,b])=>pas(i+a,j+b,false));B.riv.forEach(q=>{const [a,b]=q.split(',').map(Number);if(!B.g[b][a])L.push({x:a,y:b,k:'m'})});D8.forEach(([a,b])=>{if(en(i+a,j+b))L.push({x:i+a,y:j+b,k:'t'})});break;
    case 'c':D8.forEach(([a,b])=>pas(i+a,j+b,false));if(!u.rel&&!brume)[[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b])=>ligneTir(a,b,N));break;
    case 'k':[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{for(let q=1;q<=2;q++){const a=i+dx*q,b=j+dy*q;if(!libre(a,b))break;L.push({x:a,y:b,k:'m'})}});if(!u.rel&&!brume)for(let q=1;q<=3;q++){const b=j+fw*q;if(!dans(i,b)||B.roc.has(i+','+b))break;if(B.g[b][i]){if(B.g[b][i].s!==u.s)L.push({x:i,y:b,k:'t'});break}}break;
    case 'h':[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{for(let q=1;q<=2;q++){const a=i+dx*q,b=j+dy*q;if(en(a,b)){L.push({x:a,y:b,k:'c'});break}if(!libre(a,b))break;L.push({x:a,y:b,k:'m'})}});break}
   {const vu=new Set();return L.filter(m=>{const k2=m.x+','+m.y+m.k;if(vu.has(k2))return false;vu.add(k2);return true})}}
  function prise(a,b,par){const v=B.g[b][a];if(!v)return null;if(v.t==='A'&&par&&!'RGEC'.includes(par.t)){G.msg='Seul un roi peut prendre l’Ancêtre.';return 'res'}if(v.t==='X'){B.g[b][a]=null;D8.concat([[0,0]]).forEach(([dx,dy])=>{const c=a+dx,d=b+dy;if(!dans(c,d))return;const w=B.g[d][c];if(w&&w.s!=='n'){B.g[d][c]=null;if(w.s==='j'&&w.ref){B.mortsB.push(w.ref);G.arm=G.arm.filter(z=>z!==w.ref)}}});B.boum={x:a,y:b,t:1};G.msg='La poudrière explose !';return 'boum'}if(v.bou){v.bou=0;G.msg=P[v.t].n+' résiste à la prise.';return 'res'}B.g[b][a]=null;if(v.s==='j'&&v.ref){B.mortsB.push(v.ref);G.arm=G.arm.filter(u=>u!==v.ref)}return v}
  function jouer(i,j,m){const u=B.g[j][i];let pr=null;B.tirs.push({x0:i,y0:j,x1:m.x,y1:m.y,t:.5});
   if(u.s==='e')B.lastE=u.t;if(m.k==='t'){pr=prise(m.x,m.y,u);if(u.t==='c')u.rel=2;if(u.t==='k')u.rel=3}
   else if(m.k==='c'){pr=prise(m.x,m.y,u);if(pr==='boum'){if(B.g[j][i]===u)B.g[j][i]=null}else if(pr&&pr!=='res'){B.g[m.y][m.x]=u;B.g[j][i]=null;if(u.t==='H'){u.t='Q';G.msg='Héva prend sa première victime : elle devient reine.'}if(u.t==='K'&&!'RGECZX'.includes(pr.t)){u.copie=pr.t;G.msg='Grand-mère Kalle vole la façon de bouger : '+P[pr.t].n.toLowerCase()+'.'}if(u.t==='s'&&(m.y===0||m.y===N-1))u.t='o';if((u.t==='L'||u.t==='x')&&u.s==='j')B.encore=1}}
   else{B.g[m.y][m.x]=u;B.g[j][i]=null;const k2=m.x+','+m.y,ti=(B.tun||[]).indexOf(k2);if(ti>=0){const [ox2,oy2]=B.tun[1-ti].split(',').map(Number);if(!B.g[oy2][ox2]){B.g[oy2][ox2]=u;B.g[m.y][m.x]=null;m={...m,x:ox2,y:oy2};G.msg=P[u.t].n+' passe par le tunnel de lave.'}}if(u.t==='s'&&(m.y===0||m.y===N-1))u.t='o'}
   B.dern=[m.x,m.y];return pr}
  const roiDe=s=>{for(let j=0;j<N;j++)for(let i=0;i<N;i++){const u=B.g[j][i];if(u&&u.s===s&&'RGEC'.includes(u.t))return [i,j]}return null};
  function finTour(s){B.n++;for(let j=0;j<N;j++)for(let i=0;i<N;i++){const u=B.g[j][i];if(u&&u.s===s&&u.rel)u.rel--}}
  function verif(){if(!roiDe('e')){finBat(true);return true}if(!roiDe('j')){finBat(false);return true}return false}
  function ia(){let best=null,bs=-1e9;const kj=roiDe('j');const att=new Set();for(let j=0;j<N;j++)for(let i=0;i<N;i++){const u=B.g[j][i];if(u&&u.s==='j')coups(i,j).forEach(m=>{if(m.k!=='m')att.add(m.x+','+m.y);else if(u.t!=='m')att.add(m.x+','+m.y)})}
   for(let j=0;j<N;j++)for(let i=0;i<N;i++){const u=B.g[j][i];if(!u||u.s!=='e')continue;coups(i,j).forEach(m=>{const v=m.k==='m'?null:B.g[m.y][m.x];let sc=(v?P[v.t].v*10:0)+Math.random()*HZ;const dest=m.k==='t'?[i,j]:[m.x,m.y];if(att.has(dest[0]+','+dest[1]))sc-=P[u.t].v*7;if(kj&&m.k==='m')sc+=(N-Math.hypot(m.x-kj[0],m.y-kj[1]))*.35;if('GEC'.includes(u.t))sc-=4;if(sc>bs){bs=sc;best=[i,j,m]}})}
   // le gouverneur ennemi sonne la clarinette s'il est menacé
   const ke=roiDe('e');if(ke&&B.clarE!==0&&att.has(ke[0]+','+ke[1])){B.clarE=0;D8.forEach(([a,b])=>{const v=dans(ke[0]+a,ke[1]+b)&&B.g[ke[1]+b][ke[0]+a];if(v&&v.s==='e')v.bou=1});G.msg='La clarinette sonne : les soldats autour du chef reprennent courage.';finTour('e');B.tour='j';ui();dessin();return}
   if(!best){finBat(true);return}const pr=jouer(...best);finTour('e');if(verif())return;B.tour='j';if(pr&&pr!=='res')G.msg='Vous perdez : '+P[pr.t].n.toLowerCase()+'.';ui();dessin()}
  function finBat(ok){if(ok){G.vic++;G.or+=3;if(G.rel.grisgris&&B.mortsB.length){const u=B.mortsB.shift();G.arm.push(u);G.msg='Le gris-gris ramène '+P[u.t].n.toLowerCase()+'.'}G.morts.push(...B.mortsB);const nd=G.map[G.pos[0]][G.pos[1]];if(nd.t==='boss'){G.fini=true;G.ok=true;G.msg='Victoire : '+D.n+'.'}else{G.vue='carte';G.msg='Bataille gagnée : +3 or (vous avez '+G.or+' or pour les recrues et les runes). '+(/gris-gris/.test(G.msg||'')?G.msg+' ':'')+'Choisissez la suite du chemin.'}}else{G.fini=true;G.ok=false;G.msg='Votre '+P[D.roi].n.toLowerCase()+' est pris : la campagne s’arrête là.'}B=null;ui();dessin()}
  // ----- la carte -----
  function suivants(){if(!G.pos)return G.map[0].map((n,i)=>[0,i]);const nd=G.map[G.pos[0]][G.pos[1]];return (nd.vers||[]).map(i=>[G.pos[0]+1,i])}
  function aller(r,i){G.pos=[r,i];const nd=G.map[r][i];nd.fait=1;
   if(nd.t==='combat'||nd.t==='boss')return bataille(nd.t==='boss');
   if(nd.t==='decouv'){G.vue='choix';G.choix={t:'decouv',l:G.arm.filter(u=>!'RG'.includes(u.t)&&u.lv<2)};G.msg=NOD.decouv.d;ui();dessin();return}
   if(nd.t==='rune'){const ks=Object.keys(RELIQ).filter(q=>!G.rel[q]).sort(()=>R()-.5).slice(0,2);G.vue='choix';G.choix={t:'rune',l:ks};G.msg=NOD.rune.d;ui();dessin();return}
   if(nd.t==='enigme'&&typeof enigme371==='function'){G.vue='carte';G.msg='Une énigme barre le chemin…';ui();dessin();enigme371(ok=>{if(ok){G.or+=3;const L=G.arm.filter(u=>!'RGE'.includes(u.t)&&u.lv<2);if(L.length){const u=L[Math.floor(R()*L.length)];u.lv++;G.msg='Énigme résolue : +3 pièces d’or, et '+P[u.t].n+' s’aguerrit.'}else G.msg='Énigme résolue : +3 pièces d’or.'}else G.msg='L’énigme reste sans réponse. On passe son chemin.';ui();dessin()});return}
   if(nd.t==='recrue'){G.vue='choix';G.choix={t:'recrue',l:D.rec.slice().sort(()=>R()-.5).slice(0,3)};G.msg='Choisissez qui rejoint votre troupe, puis sa place.';ui();dessin();return}}
  // ----- interface -----
  function fiche(t){const p=P[t];return '<div class="fic"><div class="fs">'+p.s+'</div><b>'+p.n+'</b><p>'+p.r+'</p><p><i>'+p.f+'</i></p></div>'}
  function ui(){const Pn=el.querySelector('#echP'),V=el.querySelector('#echV');el.querySelector('#echI').textContent=' · victoires '+G.vic+' · '+G.or+' pièces d’or'+(Object.keys(G.rel).length?' · '+Object.keys(G.rel).map(q=>RELIQ[q].n).join(', '):'');
   if(G.fini){Pn.innerHTML='<p><b>'+G.msg+'</b></p>'+(G.ok?'':'<button class="bt sec" id="echR">Recommencer</button> ')+'<button class="bt" id="echF">Terminer</button>';V.innerHTML='';Pn.querySelector('#echF').onclick=()=>quit();const r=Pn.querySelector('#echR');if(r)r.onclick=()=>{quit(true);ouvrir(k,fin)};return}
   if(G.vue==='carte'){V.innerHTML='<p>'+G.msg+'</p><p class="note">'+Object.values(NOD).map(n=>n.i+' '+n.n).join(' · ')+'</p>'+(G.morts.length?'<p class="note">Tombés : '+G.morts.map(u=>P[u.t].n).join(', ')+'</p>':'');Pn.innerHTML='<small>Touchez un des lieux qui brillent pour avancer.</small>';return}
   if(G.vue==='choix'){const ch=G.choix;V.innerHTML='<p>'+G.msg+'</p>';
    if(ch.t==='decouv')Pn.innerHTML=(ch.l.length?ch.l.map((u,i)=>'<button class="act" data-x="'+i+'"><b>'+P[u.t].s+' '+P[u.t].n+'</b><small>'+(u.lv?'Devient vétéran : il résiste à une prise par bataille.':'Devient aguerri'+(u.t==='g'?' : il prend tout autour.':' : il résiste mieux.'))+'</small></button>').join(''):'<p>Personne à aguerrir.</p>')+'<button class="bt sec" id="echS">Passer</button>';
    if(ch.t==='rune')Pn.innerHTML=ch.l.map(q=>'<button class="act" data-x="'+q+'"><b>ᚱ '+RELIQ[q].n+'</b><small>'+RELIQ[q].d+'</small></button>').join('')+'<button class="bt sec" id="echS">Passer</button>';
    if(ch.t==='recrue'){if(ch.sel){Pn.innerHTML='<p>Choisissez sa place (en bas à gauche, l’arrière à droite).</p><div class="rec">'+[1,0].map(r=>[0,1,2,3].map(c=>{const u=G.arm.find(a=>a.c===c&&a.r===r);return '<button class="cel" data-c="'+c+'" data-r="'+r+'"'+(u?' disabled':'')+'>'+(u?P[u.t].s:'')+'</button>'}).join('')).join('<br>')+'</div>'}else Pn.innerHTML=ch.l.map(t=>'<button class="act" data-x="'+t+'"'+(G.or<2?' disabled':'')+'><b>'+P[t].s+' '+P[t].n+'</b><small>'+P[t].r+' · 2 pièces d’or</small></button>').join('')+'<button class="bt sec" id="echS">Passer</button>'}
    Pn.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{const v=b.dataset.x;if(ch.t==='decouv'){const u=ch.l[+v];u.lv++;G.msg=P[u.t].n+' s’aguerrit.';G.vue='carte'}else if(ch.t==='rune'){G.rel[v]=1;G.msg='Pouvoir gagné : '+RELIQ[v].n+'.';G.vue='carte'}else{ch.sel=v;G.msg='Choisissez sa place.'}ui();dessin()});
    Pn.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{G.or-=2;G.arm.push({t:ch.sel,c:+b.dataset.c,r:+b.dataset.r,lv:0});G.msg=P[ch.sel].n+' rejoint la troupe.';G.vue='carte';ui();dessin()});
    const s=Pn.querySelector('#echS');if(s)s.onclick=()=>{G.vue='carte';G.msg='Vous passez votre chemin.';ui();dessin()};return}
   // bataille
   const u=B.sel&&B.g[B.sel[1]][B.sel[0]];V.innerHTML=u?fiche(u.t)+(u.bou?'<p class="note">Protégé : résiste à une prise.</p>':'')+(u.rel?'<p class="note">Recharge…</p>':''):'<p>'+G.msg+'</p><p class="note">Touchez une pièce pour voir sa fiche.</p>';
   Pn.innerHTML='<p class="bm">'+G.msg+'</p><div class="bb">'+(u&&u.t==='R'&&B.rappel&&G.morts.length?'<button class="bt" id="echRa">Rappeler un mort des anciens combats</button>':'')+(u&&u.t==='G'&&B.clar?'<button class="bt" id="echCl">Sonner la clarinette</button>':'')+'<small>Touchez une pièce, puis une case en surbrillance. Rouge : tir sans bouger.</small></div>';
   const ra=Pn.querySelector('#echRa');if(ra)ra.onclick=()=>{const [i,j]=B.sel;const d=D8.map(([a,b])=>[i+a,j+b]).find(([a,b])=>libre(a,b));if(!d){G.msg='Pas de place autour du roi.';ui();return}const m=G.morts.pop();G.arm.push(m);B.g[d[1]][d[0]]={t:m.t,s:'j',lv:m.lv,ref:m,rel:0};B.rappel=0;G.msg='Le roi appelle : '+P[m.t].n.toLowerCase()+' revient des anciens combats.';finTour('j');B.tour='e';B.sel=null;ui();dessin();setTimeout(ia,450)};
   const cl=Pn.querySelector('#echCl');if(cl)cl.onclick=()=>{const [i,j]=B.sel;D8.forEach(([a,b])=>{const v=dans(i+a,j+b)&&B.g[j+b][i+a];if(v&&v.s==='j')v.bou=1});B.clar=0;G.msg='La clarinette sonne : vos gens autour du gouverneur reprennent courage.';finTour('j');B.tour='e';B.sel=null;ui();dessin();setTimeout(ia,450)}}
  cv.onclick=ev=>{if(G.fini)return;const r=cv.getBoundingClientRect(),px=ev.clientX-r.left,py=ev.clientY-r.top;
   if(G.vue==='carte'){const S2=suivants();for(const [rr,ii] of S2){const n=G.map[rr][ii],[nx,ny]=posN(n);if(Math.hypot(px-nx,py-ny)<26){aller(rr,ii);return}}return}
   if(G.vue!=='bat'||B.tour!=='j')return;const i=Math.floor((px-ox)/cs),j=Math.floor((py-oy)/cs);if(!dans(i,j))return;const u=B.g[j][i];
   if(B.sel){const m=coups(...B.sel).find(m=>m.x===i&&m.y===j);if(m){jouer(B.sel[0],B.sel[1],m);B.sel=null;if(verif())return;if(B.encore){B.encore=0;G.msg='La Lame rejoue.';ui();dessin();return}finTour('j');B.tour='e';ui();dessin();setTimeout(ia,450);return}}
   B.sel=u&&u.s==='j'?[i,j]:u?null:null;if(u&&u.s==='e'){el.querySelector('#echV').innerHTML=fiche(u.t)+'<p class="note">Pièce ennemie.</p>';dessin();return}ui();dessin()};
  const posN=n=>{const top=96,bot=H-150;return [W*.06+(W*(W>900?.6:.86))*n.x,bot-(bot-top)*n.r/4]};{const an=setInterval(()=>{if(!el.isConnected){clearInterval(an);return}if(G.vue==='carte'&&!G.fini)dessin()},70)}
  function dessin(){x.fillStyle='#161a22';x.fillRect(0,0,W,H);const pc=(G.vue==='carte'||G.vue==='choix')&&typeof fondEch332==='function'&&fondEch332(x,W,H);
   if(G.vue==='carte'||G.vue==='choix'){const S2=suivants();x.fillStyle=pc?'rgba(230,205,150,.6)':'rgba(230,230,240,.5)';G.map.forEach(row=>row.forEach(n=>{const [a,b]=posN(n);(n.vers||[]).forEach(j=>{const m=G.map[n.r+1][j],[c,d]=posN(m);for(let t=.1;t<.95;t+=.07){x.beginPath();x.arc(a+(c-a)*t,b+(d-b)*t,1.8,0,7);x.fill()}})}));
    G.map.forEach((row,r)=>row.forEach((n,i)=>{const [a,b]=posN(n),dispo=S2.some(q=>q[0]===r&&q[1]===i),ici=G.pos&&G.pos[0]===r&&G.pos[1]===i;const pu=.5+Math.sin(performance.now()/260)*.5;if(dispo){x.fillStyle='rgba(226,189,116,'+(.18+pu*.22)+')';x.beginPath();x.arc(a,b,30+pu*5,0,7);x.fill();x.strokeStyle='rgba(244,197,66,'+(.6+pu*.4)+')';x.lineWidth=3;x.beginPath();x.arc(a,b,26,0,7);x.stroke()}if(ici){x.fillStyle='rgba(226,189,116,.35)';x.beginPath();x.arc(a,b,26,0,7);x.fill()}x.fillStyle=ici?'#ffe29a':n.fait?'#4a4f58':dispo?'#fff6dc':'#7a8090';x.font=(dispo||ici?36:30)+'px serif';x.textAlign='center';x.textBaseline='middle';x.fillText(NOD[n.t].i,a,b);if(dispo){x.font='600 12px system-ui';x.fillStyle='#f4c542';x.fillText(NOD[n.t].n,a,b+34)}}));
    x.fillStyle='#f3efe2';x.font='600 17px system-ui';x.textAlign='left';x.fillText('Votre troupe : '+G.arm.map(u=>P[u.t].s+(u.lv?'+':'')).join(' '),W>900?W*.684:20,W>900?250:H-70);return}
   if(!B)return;const hl=B.sel?coups(...B.sel):[];
   for(let j=0;j<N;j++)for(let i=0;i<N;i++){const X=ox+i*cs,Y=oy+j*cs,q=i+','+j;x.fillStyle=(i+j)%2?'#3a4458':'#c8ccd8';x.fillRect(X,Y,cs,cs);if(B.haut.has(q)){x.fillStyle='rgba(140,110,70,.35)';x.fillRect(X,Y,cs,cs)}if(B.riv.has(q)){x.fillStyle='#2a6a8a';x.fillRect(X,Y,cs,cs)}if(B.gue.has(q)){x.fillStyle='rgba(42,106,138,.35)';x.fillRect(X,Y,cs,cs)}
    if((B.tun||[]).includes(q)){x.fillStyle='#e8683a';x.beginPath();x.arc(X+cs/2,Y+cs/2,cs*.32,0,7);x.fill();x.fillStyle='#2a1410';x.beginPath();x.arc(X+cs/2,Y+cs/2,cs*.2,0,7);x.fill()}
    if(B.roc.has(q)){x.fillStyle='#4a4a52';x.beginPath();x.ellipse(X+cs/2,Y+cs*.58,cs*.36,cs*.26,0,0,7);x.fill();x.fillStyle='#6a6a72';x.beginPath();x.ellipse(X+cs*.42,Y+cs*.5,cs*.18,cs*.14,0,0,7);x.fill()}
    const m=hl.find(m=>m.x===i&&m.y===j);if(m){x.fillStyle=m.k==='m'?'rgba(226,189,116,.45)':'rgba(220,60,50,.55)';x.beginPath();x.arc(X+cs/2,Y+cs/2,m.k==='m'?cs*.14:cs*.38,0,7);x.fill()}
    if(B.sel&&B.sel[0]===i&&B.sel[1]===j){x.strokeStyle='#e2bd74';x.lineWidth=3;x.strokeRect(X+2,Y+2,cs-4,cs-4)}
    const u=B.g[j][i];if(u){x.fillStyle=u.s==='j'?'#f8f4e8':u.s==='n'?'#e8a030':'#1a1c22';x.strokeStyle=u.s==='j'?'#2a2a2a':'#c03030';x.lineWidth=2;x.font=Math.round(cs*.62)+'px serif';x.textAlign='center';x.textBaseline='middle';x.strokeText(P[u.t].s,X+cs/2,Y+cs/2+2);x.fillText(P[u.t].s,X+cs/2,Y+cs/2+2);if(u.lv){x.fillStyle='#e2bd74';x.font=Math.round(cs*.22)+'px system-ui';x.fillText('+'.repeat(u.lv),X+cs*.82,Y+cs*.2)}if(u.bou){x.strokeStyle='#8ad0e8';x.beginPath();x.arc(X+cs/2,Y+cs/2,cs*.44,0,7);x.stroke()}}}
   if(B.dern){x.strokeStyle='rgba(255,140,80,.8)';x.lineWidth=2;x.strokeRect(ox+B.dern[0]*cs+4,oy+B.dern[1]*cs+4,cs-8,cs-8)}}
  addEventListener('resize',taille);taille();
  let stop=false;(function anim(){if(stop)return;if(G.vue==='carte')dessin();setTimeout(()=>requestAnimationFrame(anim),120)})();
  function quit(silent){if(stop)return;stop=true;window.BTUON=0;removeEventListener('resize',taille);el.remove();if(rm)rm.style.visibility='';if(fin&&!silent)fin({ok:G.ok,victoires:G.vic,campagne:k})}
  el.querySelector('#echQ').onclick=()=>quit();ui();dessin();const Hd={quit,G,get B(){return B},ia,coups,jouer,aller,bataille,finTest:finBat};window.__E=Hd;return Hd}
 return {ouvrir,C,P}})();
window.ouvrirEchecs=ECH.ouvrir;
