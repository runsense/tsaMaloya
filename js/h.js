
// ===== Batailles d'uchronie : petit jeu stratégique en auto-combat (inspiré des jeux d'échecs automatiques) =====
// ouvrirBataille(k, fin) : k = clé de scénario de BTU.SC ; fin({gagne, manche}) rend la main.
const BTU=(()=>{
 const COLS=8,ROWS=6;
 // n nom, c coût, pv, at dégâts, po portée (cases), vi temps entre deux coups (s), sp vitesse (cases/s), arm armure (0..1), cap capacité
 const U={
  // marrons
  guerrier:{n:'Guerrier',c:1,pv:115,at:6,po:1,vi:.7,sp:1.4,col:'#d07858',cl:'gue',cap:'Coups de poing. À trois guerriers, ils encerclent la cible : dégâts +50 %.'},
  guet:{n:'Guetteur',cl:'arc',c:1,pv:60,at:9,po:3,vi:5,sp:1.3,col:'#b8d070',cap:'Archer. Seul : une fléchette toutes les 5 s. À deux : toutes les 2 s. À trois : le rempart de flèches frappe tous les ennemis.'},
  sagaie:{n:'Lanceur de sagaie',cl:'gue',c:1,pv:80,at:12,po:2,vi:1.3,sp:1.3,col:'#d0a060'},
  gard:{n:'Gardien',cl:'gue',c:2,pv:180,at:8,po:1,vi:1.2,sp:1.1,arm:.3,col:'#9a9aaa',cap:'Bouclier de vacoa : encaisse.'},
  zerbaz:{n:'Tisaneuse',cl:'mys',c:2,pv:70,at:4,po:2,vi:1.5,sp:1.1,col:'#70c0a0',cap:'Soigne l’allié le plus blessé à chaque coup.'},
  myst:{n:'Mystique',cl:'mys',c:3,pv:65,at:7,po:3,vi:1.6,sp:1.1,col:'#b080e0',cap:'Forêt : la peur des fantômes fait fuir. Rivière : la vague frappe toute une rangée. Ailleurs : le feu frappe autour.'},
  fusilM:{n:'Chasseur au fusil',cl:'feu',c:3,pv:85,at:24,po:4,vi:2.2,sp:1.1,col:'#c08040',cap:'Fusils de traite, achetés aux pirates.'},
  // alliés d'uchronie (un par scénario)
  sega:{n:'Marron du Morne',cl:'gue',c:2,pv:120,at:13,po:1,vi:.9,sp:1.5,col:'#e07050',cap:'Venu de l’île sœur : rapide, frappe fort sur les falaises.',sp0:1},
  redcoat:{n:'Habit rouge',cl:'feu',c:3,pv:120,at:20,po:4,vi:1.8,sp:1,arm:.15,col:'#d03030',cap:'Fusil anglais et veste de cuir.',sp0:1},
  corsaire:{n:'Corsaire',cl:'feu',c:2,pv:110,at:15,po:2,vi:1.1,sp:1.3,col:'#4070a0',cap:'Pistolets et sabre d’abordage.',sp0:1},
  garde:{n:'Garde de la liberté',cl:'feu',c:2,pv:130,at:16,po:3,vi:1.6,sp:1.1,arm:.15,col:'#3060c0',cap:'Les libres armés par la République.',sp0:1},
  esprit:{n:'Esprit des anciens',cl:'mys',c:3,pv:90,at:10,po:2,vi:1.2,sp:1.6,col:'#e0e0ff',cap:'Chaque coup fait fuir la cible.',sp0:1},
  pirate:{n:'Pirate de Libertalia',cl:'gue',c:2,pv:115,at:15,po:1,vi:1,sp:1.4,col:'#5aa0c0',cap:'Hache et pistolet, frères de la côte.',sp0:1},
  roi:{n:'Roi des Hauts',cl:'gue',c:4,pv:200,at:14,po:1,vi:1.2,sp:1,arm:.2,col:'#e8c040',cap:'Tant qu’il vit, tous les siens frappent 20 % plus fort.',sp0:1},
  maquis:{n:'Résistant',cl:'feu',c:3,pv:100,at:22,po:4,vi:1.4,sp:1.2,col:'#608050',cap:'Fusil-mitrailleur parachuté par la France libre.',sp0:1},
  boutre:{n:'Marin de boutre',cl:'gue',c:2,pv:100,at:13,po:2,vi:1.1,sp:1.3,col:'#d0c080',cap:'Lance et poignard du Gujarat et de Zanzibar.',sp0:1},
  // colonie
  milice:{n:'Milicien',cl:'feu',c:1,pv:80,at:11,po:2,vi:1.6,sp:1.1,col:'#a08060',cap:'Pistolet.'},
  chien:{n:'Chiens',c:1,pv:45,at:8,po:1,vi:.7,sp:2.4,col:'#806040'},
  chasseurM:{n:'Chasseur de marrons',cl:'feu',c:2,pv:100,at:18,po:3,vi:1.9,sp:1.2,col:'#704830',cap:'Fusil, et il connaît les sentiers.'},
  soldat:{n:'Soldat',cl:'feu',c:2,pv:110,at:16,po:3,vi:1.7,sp:1,col:'#3050a0',cap:'Fusil à baïonnette.'},
  canon:{n:'Canon',c:4,pv:140,at:30,po:6,vi:3.5,sp:0,col:'#303030',cap:'Frappe aussi autour de l’impact.'},
  officier:{n:'Officier',cl:'feu',c:3,pv:130,at:14,po:2,vi:1.2,sp:1,col:'#2040a0',cap:'Ses hommes tiennent mieux : armure +10 %.'},
  cipaye:{n:'Cipaye',cl:'feu',c:2,pv:100,at:16,po:3,vi:1.6,sp:1.1,col:'#c09040',cap:'Soldat de l’Inde, au service du comptoir.',sp0:1}};
 const lab=n=>{const w=n.split(/[ ’']/).filter(q=>q.length>2);const l=w.length>1?w[0][0]+w[w.length-1][0]:n.slice(0,2);return l[0].toUpperCase()+l.slice(1)};
 const POOL={m:['guet','guerrier','sagaie','gard','zerbaz','myst','fusilM'],c:['milice','chien','chasseurM','soldat','officier','canon']};
 const SYN={arc:{n:'Archers',d:n=>n>=3?'rempart de flèches toutes les 6 s':n===2?'une flèche toutes les 2 s':'une fléchette toutes les 5 s'},gue:{n:'Guerriers',d:n=>n>=3?'encerclement : +50 % de dégâts':'coups de poing'},mys:{n:'Mystiques',d:n=>n>=3?'brume des esprits : 30 % des tirs ennemis ratent':n===2?'15 % des fusils ennemis s’enrayent':'pouvoir du lieu'},feu:{n:'Fusils',d:n=>n>=3?'feu de salve : +20 % de dégâts':'tir à distance'}};
 const ARMB={m:{arc:{n:'Arc en bois de natte',c:1,at:2,po:1},sag:{n:'Sagaie durcie au feu',c:1,at:4},bou:{n:'Bouclier de vacoa',c:2,arm:.15},fus:{n:'Fusil de traite',c:3,at:10,po:2}},c:{pis:{n:'Pistolet',c:1,at:4,po:1},bai:{n:'Baïonnette',c:1,at:5},cui:{n:'Cuirasse',c:2,arm:.18},mou:{n:'Mousquet rayé',c:3,at:10,po:2}}};
 // époque : l’armement et les vêtements des colons évoluent
 const epoque=y=>({arm:y<1730?0:y<1800?.12:y<1900?.22:.32,tenue:y<1730?'toile':y<1800?'cuir':y<1900?'cuir et plaques':'métal',fusil:y>=1690,canon:y>=1740,feu:y<1750?1:y<1850?1.25:y<1930?1.5:1.9});
 const SC=[
  {k:'soeurs',br:'maur',n:'Les îles sœurs',env:'falaise',y:1735,camp:'m',sp:'sega',t:'Au Morne, sur l’île sœur, les marrons des deux îles tiennent la montagne. Le détachement monte par le seul passage.'},
  {k:'angl',br:'angl',n:'Sous pavillon anglais',env:'cote',y:1748,camp:'m',sp:'redcoat',t:'La flotte anglaise débarque des fusils sur la plage. Les Français arrivent avec leurs canons.'},
  {k:'cors',br:'cors',n:'La course',env:'cote',y:1800,camp:'m',sp:'corsaire',t:'Les corsaires de Surcouf font escale dans une crique des marrons. Une frégate les a suivis.'},
  {k:'abol',br:'abol',n:'La liberté de 1796',env:'ville',y:1796,camp:'m',sp:'garde',t:'L’île a proclamé la liberté. Les planteurs lèvent une milice pour rétablir l’ordre ancien.'},
  {k:'anc',br:'anc',n:'Les esprits du Dimitile',env:'foret',y:1752,camp:'m',sp:'esprit',t:'Les camps ont gardé les rites. Dans la forêt du Dimitile, les ancêtres se battent avec les vivants.'},
  {k:'lib',br:'lib',n:'Libertalia',env:'cote',y:1720,camp:'m',sp:'pirate',t:'La république pirate tient encore. Une escadre de la Compagnie vient la raser.'},
  {k:'roy',br:'roy',n:'Le royaume des Hauts',env:'riviere',y:1790,camp:'m',sp:'roi',t:'Le roi élu des camps attend la colonne au gué de la rivière.'},
  {k:'arab',br:'arab',n:'Les boutres du nord',env:'cote',y:1705,camp:'m',sp:'boutre',t:'Les boutres venus de Zanzibar et du Gujarat débarquent dans une anse cachée. La milice a été prévenue.'},
  {k:'vichy',br:'vichy',n:'Le maquis des Hauts',env:'foret',y:1942,camp:'m',sp:'maquis',t:'1942 : les réfractaires se cachent dans les Hauts. La police du gouverneur vichyste les traque.'},
  {k:'cafe',br:'cafe',n:'La fortune du café',env:'ville',y:1780,camp:'c',sp:'officier',t:'Vos quartiers sont riches. Une bande de marrons descend piller le grenier.'},
  {k:'comp',br:'comp',n:'Les comptoirs de l’Inde',env:'cote',y:1794,camp:'c',sp:'cipaye',t:'Votre comptoir de l’Inde est attaqué par des pirates et des marrons venus de la mer.'}];
 const ENV={foret:{n:'Forêt',bg:'#1f3a24',d:'Les tirs des ennemis ratent plus souvent ; les mystiques font fuir.'},riviere:{n:'Rivière',bg:'#24383a',d:'La rivière au milieu ralentit ; la vague du mystique frappe une rangée.'},falaise:{n:'Falaise',bg:'#3a3228',d:'Vos tireurs, en hauteur, portent une case plus loin.'},cote:{n:'Côte',bg:'#2c3a44',d:'Le canon du navire tire depuis la mer.'},ville:{n:'Ville',bg:'#3a3030',d:'Murs et rues : les armures comptent plus.'}};
 const unlocked=()=>{try{return JSON.parse(localStorage.getItem('tsa-uch')||'{}')}catch(e){return{}}};
 const debloquer=k=>{const u=unlocked();if(u[k])return false;u[k]=1;try{localStorage.setItem('tsa-uch',JSON.stringify(u))}catch(e){}return true};
 function vagues(sc){const E=epoque(sc.y),m=sc.camp==='m';
  const col=[['milice','milice','chien'],['milice','chasseurM','chien','chien'],['soldat','chasseurM','milice','chien','milice'],['soldat','soldat','chasseurM',E.canon?'canon':'soldat','chien','officier'],['officier','soldat','soldat','chasseurM',E.canon?'canon':'soldat',E.canon?'canon':'chasseurM','chien','chien']];
  const mar=[['sagaie','guet','sagaie'],['sagaie','guet','gard','guet'],['gard','sagaie','myst','guet','fusilM'],['gard','gard','myst','fusilM','guet','zerbaz'],['gard','gard','myst','myst','fusilM','fusilM','guet','zerbaz']];
  return m?col:mar}
 function ouvrir(k,fin){const sc=SC.find(s=>s.k===k)||SC[0],E=epoque(sc.y),env=ENV[sc.env],moi=sc.camp,eux=moi==='m'?'c':'m';
  const rm=document.getElementById('retM');if(rm)rm.style.visibility='hidden';
  const el=document.createElement('div');el.id='btu';el.innerHTML='<canvas></canvas><div class="bh"><b>'+sc.n+'</b> · '+env.n+' · '+sc.y+' <span id="btuI"></span><button class="bt sec" id="btuQ">Quitter</button></div><div class="bp" id="btuP"></div>';document.body.appendChild(el);
  const cv=el.querySelector('canvas'),x=cv.getContext('2d');let W,H,cs,ox,oy;const taille=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight;cs=Math.floor(Math.min(W*.92/COLS,(H-250)/ROWS,90));ox=(W-cs*COLS)/2;oy=54};taille();addEventListener('resize',taille);
  const G=window.__btu={manche:0,or:6,moral:20,phase:'prep',banc:[],plateau:[],sel:null,shop:[],fx:[],msg:sc.t,fini:false,gagne:false};
  const enJeu=typeof S!=='undefined'&&S&&!S.bac&&!S.voieC;const pool=POOL[moi].concat([sc.sp]).filter(q=>!(q==='fusilM'&&(!E.fusil||(enJeu&&!(S.fu>0))))&&!(q==='canon'&&!E.canon));
  const AB=ARMB[moi],dif=(typeof S!=='undefined'&&S&&S.dif)||'normal',DK=dif==='histoire'?.8:dif==='expert'?1.25:1;const roll=()=>{G.shop=[0,1,2,3,4].map(()=>pool[Math.floor(Math.random()*pool.length)]);const ks=Object.keys(AB).filter(a=>a!=='fus'||E.fusil);G.arm=ks[Math.floor(Math.random()*ks.length)]};roll();
  const maxP=()=>Math.min(8,3+G.manche);
  const stats=(k,st)=>{const b=U[k],m=st===3?3.2:st===2?1.8:1,col=['milice','chien','chasseurM','soldat','canon','officier'].includes(k);return{pv:b.pv*m,at:b.at*m*(col||['fusilM','redcoat','garde','corsaire','maquis','cipaye'].includes(k)?E.feu:1),arm:Math.min(.6,(b.arm||0)+(col&&k!=='chien'?E.arm:0)+(sc.env==='ville'?.08:0))}};
  function fusion(){let ch=true;while(ch){ch=false;const all=G.banc.map((u,i)=>({u,o:'b',i})).concat(G.plateau.map((u,i)=>({u,o:'p',i})));
   for(const a of all){const sm=all.filter(q=>q.u.k===a.u.k&&q.u.st===a.u.st);if(sm.length>=3&&a.u.st<3){const keep=sm.find(q=>q.o==='p')||sm[0];sm.filter(q=>q!==keep).slice(0,2).forEach(q=>q.u.del=1);keep.u.st++;keep.u.xp=Math.max(...sm.map(q=>q.u.xp||0));keep.u.w=keep.u.w||(sm.find(q=>q.u.w)||{u:{}}).u.w;G.banc=G.banc.filter(u=>!u.del);G.plateau=G.plateau.filter(u=>!u.del);G.msg=U[keep.u.k].n+' passe à '+'★'.repeat(keep.u.st)+'.';ch=true;break}}}}
  function acheter(i){const k=G.shop[i];if(!k||G.or<U[k].c||G.banc.length>=8)return;G.or-=U[k].c;G.banc.push({k,st:1});G.shop[i]=null;fusion();ui()}
  function vendre(){const s=G.sel;if(!s)return;const L=s.o==='b'?G.banc:G.plateau,u=L[s.i];if(!u)return;G.or+=U[u.k].c*(u.st===1?1:u.st===2?3:9)-(u.st>1?1:0);L.splice(s.i,1);G.sel=null;ui()}
  function cellule(ev){const r=cv.getBoundingClientRect(),cx=Math.floor((ev.clientX-r.left-ox)/cs),cy=Math.floor((ev.clientY-r.top-oy)/cs);return cx>=0&&cx<COLS&&cy>=0&&cy<ROWS?{cx,cy}:null}
  cv.onclick=ev=>{if(G.phase!=='prep')return;const c=cellule(ev);if(!c)return;const ici=G.plateau.findIndex(u=>u.cx===c.cx&&u.cy===c.cy);
   if(G.sel){if(c.cy<3){G.msg='Placez vos gens sur les trois rangées du bas.';ui();return}const s=G.sel;if(s.o==='b'){if(ici>=0){const u=G.plateau[ici];G.plateau[ici]={...G.banc[s.i],cx:c.cx,cy:c.cy};G.banc[s.i]={k:u.k,st:u.st}}else{if(G.plateau.length>=maxP()){G.msg='Pas plus de '+maxP()+' sur le terrain à cette manche.';ui();return}G.plateau.push({...G.banc[s.i],cx:c.cx,cy:c.cy});G.banc.splice(s.i,1)}}else{const u=G.plateau[s.i];if(ici>=0&&ici!==s.i){const v=G.plateau[ici];v.cx=u.cx;v.cy=u.cy}u.cx=c.cx;u.cy=c.cy}G.sel=null;ui();return}
   if(ici>=0){if(G.armSel){G.plateau[ici].w=G.armSel;G.msg=U[G.plateau[ici].k].n+' prend : '+AB[G.armSel].n+'.';G.armSel=null;ui();return}G.sel={o:'p',i:ici};ui()}};
  function combat(){if(!G.plateau.length){G.msg='Placez au moins une personne sur le terrain.';ui();return}G.phase='fight';G.sel=null;const V=vagues(sc)[Math.min(4,G.manche)];
   const mk=(k,st,cx,cy,s,ref)=>{const b=U[k],q=stats(k,st),w=ref&&ref.w?AB[ref.w]:null,dk=s===1?DK:1;return{k,st,s,ref,cl:b.cl,xp:ref?ref.xp||0:0,x:cx+.5,y:cy+.5,pv:q.pv*dk,pvm:q.pv*dk,at:(q.at+(w&&w.at||0))*dk,arm:Math.min(.7,q.arm+(w&&w.arm||0)),po:b.po+(w&&w.po||0)+(s===0&&sc.env==='falaise'&&b.po>1?1:0),vi:b.vi,sp:b.sp,cd:Math.random()*.6,n:0,peur:0,stun:0}};
   G.u=G.plateau.map(u=>mk(u.k,u.st,u.cx,u.cy,0,u));
   const st2=G.manche>=3?2:1;V.forEach((k,i)=>{const cx=(i*3+1)%COLS,cy=k==='canon'?0:i<COLS?(['chien','milice','sagaie','gard'].includes(k)?2:1):0;G.u.push(mk(k,G.manche===4&&i<2?2:1,cx,cy,1))});
   if(sc.env==='cote'&&G.manche>=2)G.u.push(mk(moi==='m'?'canon':'fusilM',1,COLS-1,0,1));
   G.syn=[0,1].map(s=>{const c={};const vu=new Set();G.u.filter(u=>u.s===s).forEach(u=>{if(u.cl&&!vu.has(u.k+u.cl+u.x)){vu.add(u.k+u.cl+u.x);c[u.cl]=(c[u.cl]||0)+1}});return c});
   G.u.forEach(u=>{const n=(G.syn[u.s][u.cl]||0);if(u.cl==='arc')u.vi=n>=2?2:5;if(u.cl==='feu'&&n>=3)u.at*=1.2});G.volley=[6,6];
   G.msg='Le combat s’engage.';ui()}
  const vivants=s=>G.u.filter(u=>u.s===s&&u.pv>0);
  function frappe(a,b,d,perce){const f=a.s===0&&vivants(0).some(u=>u.k==='roi')?1.2:1,ofi=vivants(b.s).some(u=>u.k==='officier')?.1:0;const dd=d*f*(1-(perce?0:Math.min(.7,b.arm+ofi)));b.pv-=dd;G.fx.push({x0:a.x,y0:a.y,x1:b.x,y1:b.y,t:.18,c:U[a.k].col})}
  function tick(dt){for(const a of G.u){if(a.pv<=0)continue;const en=vivants(1-a.s);if(!en.length)break;let t=null,dm=1e9;en.forEach(b=>{const d=Math.hypot(b.x-a.x,b.y-a.y);if(d<dm){dm=d;t=b}});
    const riv=sc.env==='riviere'&&a.y>2.2&&a.y<3.8,sp=a.sp*(riv?.5:1);
    if(a.peur>0){a.peur-=dt;a.x-=(t.x-a.x)/dm*sp*dt;a.y-=(t.y-a.y)/dm*sp*dt;a.x=Math.max(.3,Math.min(COLS-.3,a.x));a.y=Math.max(.3,Math.min(ROWS-.3,a.y));continue}
    if(dm>a.po+.15){if(sp>0){a.x+=(t.x-a.x)/dm*sp*dt;a.y+=(t.y-a.y)/dm*sp*dt}continue}
    if(a.stun>0){a.stun-=dt;continue}
    a.cd-=dt;if(a.cd>0)continue;a.cd=a.vi;a.n++;
    {const mo=G.syn[1-a.s].mys||0;if(a.cl==='feu'&&mo>=2&&Math.random()<(mo>=3?.3:.15)){G.fx.push({x0:a.x,y0:a.y,x1:a.x+.3,y1:a.y-.3,t:.2,c:'#b080e0'});continue}}
    if(t.xp>=2&&Math.random()<.2){G.fx.push({x0:t.x-.3,y0:t.y,x1:t.x+.3,y1:t.y,t:.15,c:'#fff'});continue}
    if(a.cl==='gue'){let d=a.at;if((G.syn[a.s].gue||0)>=3&&vivants(a.s).some(o=>o!==a&&o.cl==='gue'&&Math.hypot(o.x-t.x,o.y-t.y)<1.3))d*=1.5;if(a.xp>=4&&a.n%4===0){t.stun=1.2;G.msg='Balayette : '+U[t.k].n+' tombe.'}frappe(a,t,d);continue}
    const rate=sc.env==='foret'&&a.s===(moi==='m'?1:0)&&a.po>1&&Math.random()<.22;if(rate){G.fx.push({x0:a.x,y0:a.y,x1:t.x+.4,y1:t.y-.4,t:.15,c:'#666'});continue}

    if(a.k==='zerbaz'){const am=vivants(a.s).sort((p,q)=>p.pv/p.pvm-q.pv/q.pvm)[0];if(am){am.pv=Math.min(am.pvm,am.pv+12*(a.st));G.fx.push({x0:a.x,y0:a.y,x1:am.x,y1:am.y,t:.25,c:'#70e0a0'})}frappe(a,t,a.at);continue}
    if(a.k==='myst'&&a.n%2===0){if(sc.env==='foret'){en.filter(b=>Math.hypot(b.x-t.x,b.y-t.y)<1.6).forEach(b=>{b.peur=2;frappe(a,b,a.at)});G.msg='Peur des fantômes : l’ennemi fuit.'}else if(sc.env==='riviere'){en.filter(b=>Math.abs(b.y-t.y)<.7).forEach(b=>frappe(a,b,a.at*2.2))}else en.filter(b=>Math.hypot(b.x-t.x,b.y-t.y)<1.3).forEach(b=>frappe(a,b,a.at*1.8));continue}
    if(a.k==='esprit'){frappe(a,t,a.at);t.peur=1.2;continue}
    if(a.k==='canon'){en.filter(b=>Math.hypot(b.x-t.x,b.y-t.y)<1.2).forEach(b=>frappe(a,b,b===t?a.at:a.at*.5));continue}
    frappe(a,t,a.at)}
   [0,1].forEach(s=>{if((G.syn&&G.syn[s].arc||0)>=3){G.volley[s]-=dt;if(G.volley[s]<=0){G.volley[s]=6;const ar=vivants(s).filter(u=>u.cl==='arc');if(ar.length){vivants(1-s).forEach(b=>frappe(ar[0],b,ar.reduce((q,u)=>q+u.at,0)*.5));G.msg='Rempart de flèches !'}}}});
   // écarter les unités qui se chevauchent
   const L=G.u.filter(u=>u.pv>0);for(let i=0;i<L.length;i++)for(let j=i+1;j<L.length;j++){const p=L[i],q=L[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<.7&&d>0){const m=(.7-d)/2;p.x-=(q.x-p.x)/d*m;p.y-=(q.y-p.y)/d*m;q.x+=(q.x-p.x)/d*m;q.y+=(q.y-p.y)/d*m}}
   const a0=vivants(0).length,a1=vivants(1).length;if(!a0||!a1)finManche(a1===0)}
  function finManche(ok){G.phase='prep';const reste=vivants(1).length;vivants(0).forEach(u=>{if(u.ref){u.ref.xp=(u.ref.xp||0)+1;if(u.ref.xp===2||u.ref.xp===4)G.msgX=U[u.k].n+(u.ref.xp===2?' apprend l’esquive.':' apprend la balayette.')}});G.u=null;G.manche++;
   if(ok){G.or+=5+Math.min(3,Math.floor(G.or/10))+1;G.msg='Manche gagnée.'+(G.msgX?' '+G.msgX:'')}else{G.moral-=2+reste*2;G.or+=5;G.msg='Manche perdue : moral −'+(2+reste*2)+'.'}
   if(G.moral<=0){G.fini=true;G.gagne=false;G.msg='Vos gens se dispersent dans les bois. Ce sera pour une autre fois.'}
   else if(G.manche>=5){G.fini=true;G.gagne=true;G.msg='Victoire : '+sc.n+' tient.'}
   G.msgX='';roll();ui()}
  function synTxt(){const c={};G.plateau.forEach(u=>{const l=U[u.k].cl;if(l)c[l]=(c[l]||0)+1});const L=Object.keys(c).map(k=>SYN[k].n+' '+c[k]+' : '+SYN[k].d(c[k]));return L.length?'Alliances : '+L.join(' · '):'Alliances : posez plusieurs gens du même type pour combiner leurs forces.'}
  function ui(){const P=el.querySelector('#btuP');el.querySelector('#btuI').textContent=' · manche '+Math.min(5,G.manche+1)+'/5 · moral '+G.moral+' · '+G.or+' pièces · terrain '+G.plateau.length+'/'+maxP();
   if(G.fini){P.innerHTML='<p><b>'+G.msg+'</b></p><button class="bt" id="btuF">Terminer</button>';P.querySelector('#btuF').onclick=quit;return}
   if(G.phase==='fight'){P.innerHTML='<p>'+G.msg+'</p>';return}
   P.innerHTML='<p class="bm">'+G.msg+'</p><div class="bs">'+G.shop.map((k,i)=>k?'<button class="act" data-a="'+i+'" title="'+(U[k].cap||'')+'"'+(G.or<U[k].c?' disabled':'')+'><b><i style="display:inline-block;width:11px;height:11px;border-radius:50%;background:'+U[k].col+';margin-right:6px;vertical-align:-1px"></i>'+U[k].n+'</b><em>'+U[k].c+' p.</em><small>PV '+U[k].pv+' · dégâts '+U[k].at+' · portée '+U[k].po+(U[k].sp0?' · uchronie':'')+'</small></button>':'<span class="vide"></span>').join('')+'</div><div class="bb">'+(G.arm?'<button class="bt sec'+(G.armSel?' on':'')+'" id="btuA"'+(G.or<AB[G.arm].c?' disabled':'')+' title="Achetez l’arme, puis touchez une personne sur le terrain.">Arme : '+AB[G.arm].n+' ('+AB[G.arm].c+' p.)</button> ':'')+'<small>'+synTxt()+'</small></div><div class="bb">Banc : '+(G.banc.map((u,i)=>'<button class="bt sec'+(G.sel&&G.sel.o==='b'&&G.sel.i===i?' on':'')+'" data-b="'+i+'" title="'+(U[u.k].cap||'')+'">'+U[u.k].n+' '+'★'.repeat(u.st)+'</button>').join('')||'<small>vide : achetez au marché ci-dessus</small>')+'</div><div class="bb"><button class="bt sec" id="btuR"'+(G.or<1?' disabled':'')+'>Nouveau marché (1 p.)</button> <button class="bt sec" id="btuV"'+(G.sel?'':' disabled')+'>Renvoyer</button> <button class="bt" id="btuC">Combattre</button> <small>'+env.d+' Époque : tenue '+E.tenue+(E.canon?', canons':'')+'. Trois identiques fusionnent.</small></div>';
   P.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>acheter(+b.dataset.a));P.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{G.sel={o:'b',i:+b.dataset.b};G.msg='Touchez une case des trois rangées du bas.';ui()});
   {const ba=P.querySelector('#btuA');if(ba)ba.onclick=()=>{if(G.or<AB[G.arm].c)return;G.or-=AB[G.arm].c;G.armSel=G.arm;G.arm=null;G.msg='Touchez la personne qui prendra : '+AB[G.armSel].n+'.';ui()}}
   P.querySelector('#btuR').onclick=()=>{if(G.or<1)return;G.or--;roll();ui()};P.querySelector('#btuV').onclick=vendre;P.querySelector('#btuC').onclick=combat}
  function dessin(){x.fillStyle='#14110f';x.fillRect(0,0,W,H);x.fillStyle=env.bg;x.fillRect(ox,oy,cs*COLS,cs*ROWS);
   for(let i=0;i<COLS;i++)for(let j=0;j<ROWS;j++){x.strokeStyle=j>=3?'rgba(226,189,116,.22)':'rgba(255,255,255,.08)';x.strokeRect(ox+i*cs,oy+j*cs,cs,cs)}
   if(sc.env==='riviere'){x.fillStyle='rgba(60,130,160,.45)';x.fillRect(ox,oy+cs*2.5,cs*COLS,cs)}
   if(sc.env==='foret'){x.fillStyle='rgba(20,60,25,.8)';for(let i=0;i<14;i++){const tx=ox+((i*137)%(COLS*cs)),ty=oy+((i*89)%(ROWS*cs));x.beginPath();x.arc(tx,ty,cs*.22,0,7);x.fill()}}
   if(sc.env==='cote'){x.fillStyle='rgba(40,90,140,.5)';x.fillRect(ox,oy,cs*COLS,cs*.5)}
   if(sc.env==='falaise'){x.fillStyle='rgba(0,0,0,.25)';x.fillRect(ox,oy+cs*3,cs*COLS,4)}
   if(sc.env==='ville'){x.fillStyle='rgba(180,160,130,.15)';for(let i=0;i<COLS;i+=3)x.fillRect(ox+i*cs+cs*.2,oy+cs*.1,cs*.6,cs*.4)}
   const rond=(u,px,py,s)=>{const b=U[u.k];x.fillStyle=b.col;x.beginPath();x.arc(px,py,cs*.32,0,7);x.fill();x.lineWidth=3;x.strokeStyle=s===0?'#e2bd74':'#c03030';x.stroke();x.fillStyle='#111';x.font='bold '+Math.round(cs*.26)+'px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText(lab(b.n),px,py);if(u.w||(u.ref&&u.ref.w)){x.fillStyle='#e2bd74';x.fillRect(px+cs*.18,py+cs*.12,cs*.12,cs*.12)}if((u.xp||0)>=2){x.fillStyle='#9fe';x.font=Math.round(cs*.16)+'px system-ui';x.fillText(u.xp>=4?'»»':'»',px-cs*.3,py-cs*.3)}if(u.st>1){x.fillStyle='#ffe080';x.font=Math.round(cs*.18)+'px system-ui';x.fillText('★'.repeat(u.st),px,py-cs*.42)}};
   if(G.phase==='prep'){G.plateau.forEach((u,i)=>{rond(u,ox+(u.cx+.5)*cs,oy+(u.cy+.5)*cs,0);if(G.sel&&G.sel.o==='p'&&G.sel.i===i){x.strokeStyle='#fff';x.strokeRect(ox+u.cx*cs+2,oy+u.cy*cs+2,cs-4,cs-4)}});
    if(!G.fini){x.fillStyle='rgba(255,255,255,.5)';x.font='14px system-ui';x.textAlign='center';x.fillText('L’ennemi viendra par le haut',ox+cs*COLS/2,oy+cs*1.5)}}
   else if(G.u){G.u.filter(u=>u.pv>0).forEach(u=>{rond(u,ox+u.x*cs,oy+u.y*cs,u.s);x.fillStyle='#300';x.fillRect(ox+u.x*cs-cs*.3,oy+u.y*cs+cs*.36,cs*.6,4);x.fillStyle=u.s===0?'#7c6':'#d55';x.fillRect(ox+u.x*cs-cs*.3,oy+u.y*cs+cs*.36,cs*.6*Math.max(0,u.pv/u.pvm),4);if(u.peur>0){x.fillStyle='#ddf';x.fillText('!',ox+u.x*cs+cs*.3,oy+u.y*cs-cs*.3)}})}
   G.fx.forEach(f=>{x.strokeStyle=f.c;x.lineWidth=2;x.beginPath();x.moveTo(ox+f.x0*cs,oy+f.y0*cs);x.lineTo(ox+f.x1*cs,oy+f.y1*cs);x.stroke()})}
  let stop=false,t0=performance.now();function boucle(t){if(stop)return;const dt=Math.min(.6,(t-t0)/1000);t0=t;G.fr=(G.fr||0)+1;for(let r=dt;r>1e-4&&G.phase==='fight'&&G.u;r-=.05)tick(Math.min(.05,r));G.fx.forEach(f=>f.t-=dt);G.fx=G.fx.filter(f=>f.t>0);dessin();requestAnimationFrame(boucle)}
  function quit(){if(stop)return;stop=true;window.BTUON=0;removeEventListener('resize',taille);el.remove();if(rm)rm.style.visibility='';if(fin)fin({gagne:G.gagne,manche:G.manche})}
  el.querySelector('#btuQ').onclick=quit;ui();requestAnimationFrame(boucle);
  return {quit,G,acheter,combat,cv,cs:()=>({cs,ox,oy})}}
 return {ouvrir,SC,U,ENV,unlocked,debloquer}})();
window.ouvrirBataille=BTU.ouvrir;
