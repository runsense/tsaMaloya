// ===== p83 : Vie — étape 4 : les grandes batailles d'escouades (épopées) =====
// Quand le conflit devient ouvert (un détachement monte au camp, une bande descend sur l'habitation), on commande des
// ESCOUADES : chacune a son arme et son nombre. On les sélectionne (clic, Maj+clic, ou en traçant un cadre), on les déplace
// (clic sur le terrain ou clic droit), on les lance sur l'ennemi (clic sur lui), et on choisit leur FORMATION :
// ligne (tout le monde tire), colonne (on marche vite), carré (on tient face aux chiens et aux charges), dispersés (on se fond
// dans la forêt, les balles touchent moins). La forêt cache et protège ; la ravine ne se passe qu'aux gués.
// Le moral compte autant que le nombre : une escouade qui perd trop de monde se débande.
// Côté marron, les mystiques jettent la brume (les fusils tirent à l'aveugle) ou la peur des esprits ; côté colonie, les
// fusils en ligne tirent une salve. Les gens du camp ou de l'habitation sont de vraies personnes : les morts restent morts.
const BW=1000,BH=640;
const BTY={
 sagaie:{n:'Sagaies',ic:'🔱',po:75,cd:3,acc:.19,me:.28,sp:20,mor:6},
 fusil:{n:'Fusils',ic:'💥',po:165,cd:8,acc:.15,me:.18,sp:18,mor:5,feu:1},
 coutelas:{n:'Coutelas',ic:'⚔️',po:0,me:.5,sp:22,mor:7},
 chiens:{n:'Chiens',ic:'🐕',po:0,me:.38,sp:36,mor:4,chien:1},
 mystique:{n:'Mystiques',ic:'🔮',po:0,me:.08,sp:18,mor:8,mys:1},
 soldat:{n:'Soldats',ic:'🎖️',po:155,cd:7,acc:.18,me:.36,sp:18,mor:7,feu:1}};
const BFORM={ligne:['▬','Ligne','Tout le monde tire ; fragile au corps à corps.'],colonne:['┃','Colonne','On marche vite ; seul l’avant tire.'],carre:['■','Carré','Tient face aux chiens et aux charges ; lent.'],disperse:['∴','Dispersés','Les balles touchent moins ; faible au corps à corps ; idéal en forêt.']};
const BSCEN={
 defCamp:{cote:'m',carte:'camp',n:'Le détachement monte au camp',t:'Un détachement de chasseurs de marrons a trouvé le sentier. Il monte avec ses fusils, ses chiens et des noirs armés par billet. Tenez le camp.',def:1},
 descente:{cote:'m',carte:'hab',n:'La descente sur l’habitation',t:'La nuit, le groupe descend sur une habitation des Bas pour prendre des vivres et des outils au grenier. Tenez le grenier quelques instants, puis remontez.',def:0},
 assaut:{cote:'c',carte:'camp',n:'Monter au camp marron',t:'Le détachement de l’habitation a trouvé un camp dans les Hauts. Les marrons connaissent la forêt et tendent des embuscades. Prenez le camp.',def:0},
 garde:{cote:'c',carte:'hab',n:'Une bande descend sur l’habitation',t:'Les chiens aboient : une bande de marrons descend des Hauts vers le grenier. Défendez l’habitation.',def:1}};
let BT=null;
function btStyle(){if($('btSt'))return;const s=document.createElement('style');s.id='btSt';s.textContent=
 '#bt{position:fixed;inset:0;z-index:9500;background:#12150f;font-family:Montserrat,sans-serif;color:#efe9da;user-select:none}#bt canvas{position:absolute;left:0;top:0}'+
 '#btTop{position:absolute;left:0;right:0;top:0;height:40px;display:flex;align-items:center;gap:10px;padding:0 12px;background:#000a;font-size:13px}#btTop b{color:#f0c46a}#btTop button,#btOrd button,#btFin button{font:600 12px Montserrat,sans-serif;background:#1e2a24;color:#efe9da;border:1px solid #4a5a50;border-radius:999px;padding:4px 10px;cursor:pointer}#btTop button:hover,#btOrd button:hover{border-color:#f0c46a}'+
 '#btBas{position:absolute;left:0;right:0;bottom:0;background:#000b;padding:6px 10px}#btSq{display:flex;gap:6px;overflow-x:auto;padding-bottom:4px}'+
 '.btC{flex:0 0 auto;min-width:118px;border:1px solid #4a5a50;border-radius:6px;padding:4px 7px;font-size:11px;cursor:pointer;background:#1a201c}.btC.on{border-color:#f0c46a;background:#2a2a1a}.btC.rt{opacity:.55}.btC .mb{height:4px;background:#333;border-radius:2px;margin-top:3px}.btC .mb i{display:block;height:100%;border-radius:2px}'+
 '#btOrd{display:flex;flex-wrap:wrap;gap:5px;margin-top:5px;align-items:center;font-size:12px}#btOrd button.on{border-color:#f0c46a;background:#f0c46a33}#btOrd button[disabled]{opacity:.4;cursor:default}'+
 '#btLog{position:absolute;right:10px;top:48px;width:270px;font-size:12px;line-height:1.45;pointer-events:none;text-shadow:0 1px 2px #000}'+
 '#btFin,#btAide{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#000b}#btFin .bx,#btAide .bx{background:#efe4c8;color:#2a2016;border-radius:6px;max-width:560px;width:calc(100% - 32px);padding:18px 22px;font-size:14px;line-height:1.5}#btFin h3,#btAide h3{font:700 22px Alegreya,Georgia,serif;margin:0 0 8px}#btFin button,#btAide button{background:#b5412b;color:#fff;border:0;padding:7px 16px;margin-top:10px}#btAide button{font:600 13px Montserrat,sans-serif;border-radius:999px;cursor:pointer}';
 document.head.appendChild(s)}

// ----- les armées -----
function btPersonnes(){const ci=(CV&&CV.camp!=null)?CV.camp:(camps()[0]||{}).i;return (S.pp||[]).filter(p=>adulte(p)&&ageP(p)<62&&(ci==null||campDe(p)===ci)&&!enGrp(p))}
function btDecoupe(type,L,cote,nom){const R=[];for(let i=0;i<L.length;i+=8){const g=L.slice(i,i+8);if(g.length)R.push({type,cote,nom:nom+(L.length>8?' '+(R.length+1):''),gens:g})}return R}
function btArmeeMarron(reel){const y=S.year||1700;
 if(!reel){const fu=2+Math.floor(Math.random()*3),N=k=>Array(k).fill(null);return [{type:'sagaie',cote:'m',nom:'Lanceurs',gens:N(6)},{type:'coutelas',cote:'m',nom:'Guerriers',gens:N(7)},{type:'fusil',cote:'m',nom:'Fusils volés',gens:N(fu)},{type:'mystique',cote:'m',nom:'Mystiques',gens:N(y>1700?3:2)}]}
 const P=btPersonnes(),mys=P.filter(p=>p.role==='mys').slice(0,4),cha=P.filter(p=>p.role==='cha'),fu=Math.min(S.fu||0,cha.length),fus=cha.slice(0,fu),sag=cha.slice(fu),reste=P.filter(p=>!mys.includes(p)&&!cha.includes(p));
 const moit=Math.floor(reste.length/2),R=[].concat(btDecoupe('sagaie',sag.concat(reste.slice(0,moit)),'m','Lanceurs'),btDecoupe('coutelas',reste.slice(moit),'m','Guerriers'),btDecoupe('fusil',fus,'m','Fusils volés'),btDecoupe('mystique',mys,'m','Mystiques')).filter(s=>s.gens.length);
 // trop peu de monde : des marrons d'autres camps viennent prêter main-forte
 const n=P.length;if(n<10)R.push({type:'coutelas',cote:'m',nom:'Alliés d’autres camps',gens:Array(Math.min(8,10-n)).fill(null)});return R}
function btArmeeColon(reel){const y=S.year||1700;const R=[];let mil=[],esc=[];if(reel){const P=btPersonnes();mil=P.filter(p=>estColon(p)&&p.g!=='f'&&!(typeof noble==='function'&&noble(p)));esc=P.filter(p=>p.st==='esclave'&&p.g!=='f'&&p.role==='cha').slice(0,6)}
 while(mil.length<6)mil.push(null);while(esc.length<5)esc.push(null);
 R.push(...btDecoupe(y>=1740?'soldat':'fusil',mil.slice(0,8),'c',y>=1740?'Milice':'Chasseurs de marrons'));if(mil.length>8)R.push(...btDecoupe('fusil',mil.slice(8,14),'c','Habitants armés'));
 R.push(...btDecoupe('sagaie',esc,'c','Noirs du détachement'));R.push({type:'chiens',cote:'c',nom:'Chiens',gens:[null,null,null,null]});return R}

// ----- la carte -----
function btCarte(k){const F=[],rnd=(a,b)=>a+Math.random()*(b-a);let C={k,F,rav:null,obj:null,deco:[]};
 if(k==='camp'){for(let i=0;i<26;i++)F.push({x:rnd(0,BW),y:rnd(0,250),r:rnd(45,95)});for(let i=0;i<9;i++)F.push({x:rnd(0,BW),y:rnd(250,560),r:rnd(30,70)});
  C.obj={x:500,y:120,r:85,n:'le camp'};C.rav={y:330,gues:[rnd(180,360),rnd(640,820)]};for(let i=0;i<6;i++){const a=i/6*6.28;C.deco.push({k:'case',x:500+Math.cos(a)*42,y:120+Math.sin(a)*30})}}
 else{for(let i=0;i<18;i++)F.push({x:rnd(0,BW),y:rnd(0,170),r:rnd(45,90)});for(let i=0;i<4;i++)F.push({x:rnd(0,BW),y:rnd(230,420),r:rnd(25,50)});
  C.obj={x:500,y:520,r:80,n:'le grenier'};C.deco.push({k:'maison',x:440,y:540},{k:'grenier',x:560,y:525});for(let i=0;i<5;i++)C.deco.push({k:'cases',x:250+i*14,y:590})}
 // la forêt ne couvre pas l'objectif lui-même
 C.F=F.filter(f=>Math.hypot(f.x-C.obj.x,f.y-C.obj.y)>f.r+C.obj.r*.6);return C}
function btForet(x,y){return BT.C.F.some(f=>Math.hypot(f.x-x,f.y-y)<f.r)}
function btFond(){const C=BT.C,cv=document.createElement('canvas');cv.width=BW;cv.height=BH;const x=cv.getContext('2d'),nuit=BT.nuit;
 x.fillStyle=nuit?'#2c3626':'#6f8a4c';x.fillRect(0,0,BW,BH);for(let i=0;i<900;i++){x.fillStyle='rgba('+(nuit?'20,30,20':'60,80,40')+','+(Math.random()*.25)+')';x.fillRect(Math.random()*BW,Math.random()*BH,6,6)}
 if(C.k==='hab'){x.strokeStyle=nuit?'#4a5a30':'#a8b860';x.lineWidth=2;for(let yy=360;yy<640;yy+=9){x.beginPath();x.moveTo(120,yy);x.lineTo(380,yy);x.moveTo(640,yy);x.lineTo(900,yy);x.stroke()}}
 C.F.forEach(f=>{x.fillStyle=nuit?'#18241a':'#2f5530';x.beginPath();x.arc(f.x,f.y,f.r,0,7);x.fill()});
 C.F.forEach(f=>{for(let i=0;i<f.r/5;i++){const a=Math.random()*6.28,d=Math.random()*f.r*.92;x.fillStyle=nuit?'#22331f':'#3b6a3a';x.beginPath();x.arc(f.x+Math.cos(a)*d,f.y+Math.sin(a)*d,4+Math.random()*7,0,7);x.fill()}});
 if(C.rav){const r=C.rav;x.fillStyle='#4a3a2a';x.fillRect(0,r.y-13,BW,26);x.fillStyle='#2a2018';x.fillRect(0,r.y-5,BW,10);r.gues.forEach(g=>{x.fillStyle=nuit?'#5a5a48':'#9a9070';x.fillRect(g-30,r.y-14,60,28);x.fillStyle='#e9e2c8';x.font='11px Montserrat';x.fillText('gué',g-9,r.y+4)})}
 const o=C.obj;x.strokeStyle='#f0c46a88';x.setLineDash([6,5]);x.lineWidth=2;x.beginPath();x.arc(o.x,o.y,o.r,0,7);x.stroke();x.setLineDash([]);
 C.deco.forEach(d=>{if(d.k==='case'){x.fillStyle='#8a6a44';x.fillRect(d.x-8,d.y-6,16,12);x.fillStyle='#c9a35a';x.beginPath();x.moveTo(d.x-11,d.y-5);x.lineTo(d.x,d.y-14);x.lineTo(d.x+11,d.y-5);x.fill()}
  else if(d.k==='maison'){x.fillStyle='#ece6d6';x.fillRect(d.x-40,d.y-20,80,40);x.fillStyle='#8a3a2e';x.fillRect(d.x-44,d.y-26,88,10)}
  else if(d.k==='grenier'){x.fillStyle='#9a7a4a';x.fillRect(d.x-20,d.y-16,40,32);x.fillStyle='#5a4a2a';x.fillRect(d.x-22,d.y-20,44,7)}
  else{x.fillStyle='#7a6a4a';x.fillRect(d.x-5,d.y-5,10,10)}});
 return cv}

// ----- les escouades -----
function btFaire(def,camp,i,n){const T=BTY[def.type],sq={...def,T,id:BT.S.length,joueur:camp,sold:[],n0:def.gens.length,mor:70,form:T.chien?'disperse':T.feu?'ligne':'colonne',x:0,y:0,ang:0,cd:Math.random()*2,ord:null,hold:0,rout:0,parti:0,mv:0,dernierTir:-9,immobile:0,ab:{}};
 def.gens.forEach((p,j)=>sq.sold.push({p,x:0,y:0,j:Math.random()}));return sq}
function btDeployer(L,y0,dir){L.forEach((s,i)=>{s.x=BW/2+(i-(L.length-1)/2)*Math.min(150,(BW-120)/Math.max(1,L.length));s.y=y0;s.ang=dir;btSlots(s).forEach((q,j)=>{s.sold[j].x=q.x;s.sold[j].y=q.y})})}
function btSlots(s){const n=s.sold.length,R=[],fx=Math.cos(s.ang),fy=Math.sin(s.ang),rx=-fy,ry=fx,f=s.form,sp=f==='disperse'?19:s.T.chien?9:10;
 for(let i=0;i<n;i++){let u,v;if(f==='ligne'){const c=n>8?Math.ceil(n/2):n;u=(i%c-(c-1)/2)*sp;v=Math.floor(i/c)*sp}
  else if(f==='colonne'){u=(i%2-.5)*sp;v=(Math.floor(i/2)-(Math.ceil(n/2)-1)/2)*sp}
  else if(f==='carre'){const a=i/n*6.283,r=Math.max(9,n*2.2);u=Math.cos(a)*r;v=Math.sin(a)*r}
  else{const c=Math.ceil(Math.sqrt(n));u=(i%c-(c-1)/2)*sp+(s.sold[i].j-.5)*8;v=(Math.floor(i/c)-(Math.ceil(n/c)-1)/2)*sp+((s.sold[i].j*7)%1-.5)*8}
  R.push({x:s.x+rx*u-fx*v,y:s.y+ry*u-fy*v})}return R}
const btVivant=s=>s.sold.length>0&&!s.parti;
const btActif=s=>btVivant(s)&&!s.rout;
function btRayon(s){return s.form==='disperse'?Math.sqrt(s.sold.length)*12+8:s.form==='ligne'?Math.min(s.sold.length,8)*5+6:s.form==='carre'?Math.max(9,s.sold.length*2.2)+5:s.sold.length*2.6+6}
function btVisible(s,pour){if(!s.cache)return true;return BT.S.some(o=>o.joueur!==s.joueur&&btVivant(o)&&Math.hypot(o.x-s.x,o.y-s.y)<85)}
function btMsg(m,c){BT.log.unshift({m,t:BT.tps,c});BT.log=BT.log.slice(0,7)}
function btTue(s,par,cause){if(!s.sold.length)return;const k=Math.floor(Math.random()*s.sold.length),d=s.sold.splice(k,1)[0];if(d.p)BT.pertes.push({p:d.p,cote:s.joueur});BT.morts[s.joueur?0:1]++;
 s.mor-=100/Math.max(4,s.n0)*.7+(cause==='feu'?3:0);if(par&&par.T.feu)par.tues=(par.tues||0)+1;BT.fx.push({k:'mort',x:d.x,y:d.y,t:0});if(!s.sold.length){btMsg(s.nom+' : plus personne debout.',s.joueur?'#ff9a7a':'#9ad08a')}}

// ----- la bataille -----
function btOuvrir(k){if(BT)return;const sc=BSCEN[k];if(!sc)return;btStyle();const reel=!!(S&&S.pp);
 const moi=sc.moi?sc.moi():sc.cote==='m'?btArmeeMarron(reel):btArmeeColon(reel),eux=sc.eux?sc.eux():sc.cote==='m'?btArmeeColon(false):btArmeeMarron(false);
 BT={k,sc,C:btCarte(sc.carte),S:[],sel:new Set(),log:[],fx:[],tps:0,vit:1,pause:0,pertes:[],morts:[0,0],tenue:0,fin:0,nuit:sc.carte==='hab',last:performance.now(),myst0:S.myst||0,
  arret:(()=>{const p=typeof chronoP!=='undefined'?chronoP:0;try{chronoP=1}catch(e){}return()=>{try{chronoP=p}catch(e){}}})()};
 // qui est en haut (le camp, la forêt) et qui est en bas (l'habitation, la route des Bas)
 const moiHaut=(sc.carte==='camp'&&sc.def)||(sc.carte==='hab'&&!sc.def);
 const A=moi.map((d,i)=>btFaire(d,1,i)),B=eux.map((d,i)=>btFaire(d,0,i));BT.S=A.concat(B);BT.S.forEach((s,i)=>s.id=i);
 btDeployer(A,moiHaut?(sc.carte==='camp'?150:70):(sc.carte==='camp'?590:560),moiHaut?Math.PI/2:-Math.PI/2);btDeployer(B,moiHaut?(sc.carte==='camp'?590:560):(sc.carte==='camp'?150:70),moiHaut?-Math.PI/2:Math.PI/2);
 BT.hautJ=moiHaut;BT.S.forEach(s=>{if((s.joueur===1)===!!sc.def)s.mor=85});
 // les défenseurs marrons se cachent d'abord dans la forêt
 B.concat(A).forEach(s=>{if(s.cote==='m'&&((s.joueur===0&&!sc.def)||(s.joueur===1&&sc.def)))s.form='disperse'});
 const el=document.createElement('div');el.id='bt';el.innerHTML='<canvas id="btc"></canvas><div id="btTop"></div><div id="btLog"></div><div id="btBas"><div id="btSq"></div><div id="btOrd"></div></div>';document.body.appendChild(el);BT.el=el;BT.fond=btFond();
 btTaille();addEventListener('resize',btTaille);btEntrees();btUI();btMsg(sc.t,'#f0c46a');try{if(typeof jouerMoment==='function')jouerMoment('alerte')}catch(e){}
 let vu=0;try{vu=localStorage.getItem('tsa-tuto-bat')}catch(e){}if(!vu)btAide();requestAnimationFrame(btBoucle)}
function btTaille(){if(!BT)return;const cv=$('btc'),W=innerWidth,H=innerHeight,top=40,bas=($('btBas')||{}).offsetHeight||110;cv.width=W;cv.height=H;BT.z=Math.min(W/BW,(H-top-bas)/BH);BT.ox=(W-BW*BT.z)/2;BT.oy=top+(H-top-bas-BH*BT.z)/2}
function btAide(){BT.pause=1;const d=document.createElement('div');d.id='btAide';d.innerHTML='<div class="bx"><h3>Commander les escouades</h3>'+
 '• <b>Choisir</b> : clic sur une escouade (sur la carte ou sa carte en bas), Maj+clic pour en ajouter, ou tracez un cadre.<br>• <b>Déplacer</b> : clic sur le terrain (ou clic droit). <b>Attaquer</b> : clic sur une escouade ennemie.<br>'+
 '• <b>Formations</b> (L, C, K, D) : ligne, colonne, carré, dispersés. <b>Tenir</b> (H) : ne pas courir après l’ennemi. <b>Repli</b> (R).<br>• La forêt cache une escouade immobile et la protège des balles. La ravine ne se passe qu’aux gués.<br>• Le moral (barre de couleur) : trop de pertes, et l’escouade se débande.<br>• <b>Espace</b> : pause. Les ordres se donnent aussi en pause.'+
 '<br><button>Au combat</button></div>';BT.el.appendChild(d);d.querySelector('button').onclick=()=>{d.remove();BT.pause=0;try{localStorage.setItem('tsa-tuto-bat','1')}catch(e){}}}
function btW(e){const r=$('btc').getBoundingClientRect();return {x:(e.clientX-r.left-BT.ox)/BT.z,y:(e.clientY-r.top-BT.oy)/BT.z}}
function btSous(p,joueur){return BT.S.filter(s=>btVivant(s)&&(joueur==null||s.joueur===joueur)&&(s.joueur||btVisible(s))).find(s=>Math.hypot(s.x-p.x,s.y-p.y)<btRayon(s)+10||s.sold.some(q=>Math.hypot(q.x-p.x,q.y-p.y)<9))}
function btEntrees(){const cv=$('btc');let dr=null;
 cv.addEventListener('contextmenu',e=>e.preventDefault());
 cv.addEventListener('pointerdown',e=>{if(!BT||BT.fin)return;const p=btW(e);dr={p,e0:{x:e.clientX,y:e.clientY},b:e.button,sh:e.shiftKey};BT.cadre=null});
 cv.addEventListener('pointermove',e=>{if(!dr||dr.b!==0)return;if(Math.hypot(e.clientX-dr.e0.x,e.clientY-dr.e0.y)>8)BT.cadre={a:dr.p,b:btW(e)}});
 cv.addEventListener('pointerup',e=>{if(!BT||!dr)return;const p=btW(e),d=dr;dr=null;
  if(BT.cadre){const c=BT.cadre;BT.cadre=null;const x0=Math.min(c.a.x,c.b.x),x1=Math.max(c.a.x,c.b.x),y0=Math.min(c.a.y,c.b.y),y1=Math.max(c.a.y,c.b.y);if(!d.sh)BT.sel.clear();BT.S.forEach(s=>{if(s.joueur&&btActif(s)&&s.x>x0&&s.x<x1&&s.y>y0&&s.y<y1)BT.sel.add(s.id)});btUI();return}
  const mien=btSous(p,1),ennemi=btSous(p,0);
  if(d.b===0&&mien){if(d.sh){BT.sel.has(mien.id)?BT.sel.delete(mien.id):BT.sel.add(mien.id)}else{BT.sel.clear();BT.sel.add(mien.id)}btUI();return}
  const L=btChoisies();if(!L.length)return;
  if(ennemi){L.forEach(s=>{s.ord={k:'att',t:ennemi.id};s.hold=0});btMsg('Sur '+ennemi.nom.toLowerCase()+' !');BT.fx.push({k:'cible',x:ennemi.x,y:ennemi.y,t:0})}
  else{const cx=L.reduce((a,s)=>a+s.x,0)/L.length,cy=L.reduce((a,s)=>a+s.y,0)/L.length,ang=Math.atan2(p.y-cy,p.x-cx),rx=-Math.sin(ang),ry=Math.cos(ang);
   L.forEach((s,i)=>{const u=(i-(L.length-1)/2)*Math.max(36,btRayon(s)*2.1);s.ord={k:'va',x:clamp(p.x+rx*u,10,BW-10),y:clamp(p.y+ry*u,10,BH-10)}});BT.fx.push({k:'va',x:p.x,y:p.y,t:0})}btUI()});
 const kd=e=>{if(!BT)return;const k=e.key.toLowerCase();e.stopPropagation();if(BT.fin)return;
  if(e.code==='Space'){e.preventDefault();BT.pause=!BT.pause;btUI();return}const F={l:'ligne',c:'colonne',k:'carre',d:'disperse'};if(F[k])btForme(F[k]);else if(k==='h')btTenir();else if(k==='r')btRepli();
  else if(/^Digit[1-9]$/.test(e.code)){const L=BT.S.filter(s=>s.joueur&&btActif(s)),s=L[+e.code.slice(5)-1];if(s){if(!e.shiftKey)BT.sel.clear();BT.sel.add(s.id);btUI()}}};
 BT.el.addEventListener('pointerdown',e=>{if(!BT)return;const t=e.target.closest('[data-b],[data-s],[data-f],[data-o]');if(!t||t.disabled||!BT.el.contains(t))return;e.preventDefault();
  if(t.dataset.b){const k=t.dataset.b;if(k==='p')BT.pause=!BT.pause;else if(k==='v')BT.vit=BT.vit===1?2:BT.vit===2?.5:1;else if(k==='a')btAide();else if(k==='q'&&!BT.fin)btFin(false,'Vous ordonnez la retraite.')}
  else if(t.dataset.s!=null){const id=+t.dataset.s;if(e.shiftKey){BT.sel.has(id)?BT.sel.delete(id):BT.sel.add(id)}else{BT.sel.clear();BT.sel.add(id)}}
  else if(t.dataset.f)return btForme(t.dataset.f);else if(t.dataset.o){const o=t.dataset.o;if(o==='h')btTenir();else if(o==='r')btRepli();else btPouvoir(o);return}btUI()});
 addEventListener('keydown',kd,true);BT.off=()=>{removeEventListener('keydown',kd,true);removeEventListener('resize',btTaille)}}
function btChoisies(){return BT.S.filter(s=>BT.sel.has(s.id)&&btActif(s))}
function btForme(f){const L=btChoisies().filter(s=>!s.T.chien);if(!L.length)return;L.forEach(s=>s.form=f);btMsg(L.map(s=>s.nom).join(', ')+' : '+BFORM[f][1].toLowerCase()+'.');btUI()}
function btTenir(){const L=btChoisies();if(!L.length)return;const v=!L.every(s=>s.hold);L.forEach(s=>{s.hold=v;if(v)s.ord=null});btUI()}
function btRepli(){const L=btChoisies();L.forEach(s=>{s.ord={k:'va',x:s.x,y:BT.hautJ?40:BH-40}});if(L.length)btMsg('Repli !');btUI()}
function btPouvoir(k){const L=btChoisies(),m=L.find(s=>s.T.mys),f=L.filter(s=>s.T.feu&&s.form==='ligne');
 if(k==='brume'&&m){if((S.myst||0)<2)return btMsg('Pas assez de mystique.');S.myst-=2;BT.brume={x:m.x,y:m.y,r:170,t:20};btMsg('La brume monte : dans le blanc, les fusils tirent à l’aveugle (20 s).','#d8c0f0')}
 else if(k==='peur'&&m){if((S.myst||0)<2)return btMsg('Pas assez de mystique.');S.myst-=2;m.ab.peur=BT.tps+45;let n=0;BT.S.forEach(s=>{if(!s.joueur&&btVivant(s)&&Math.hypot(s.x-m.x,s.y-m.y)<200){s.mor-=s.T.chien?35:20;n++}});btMsg(n?'Les tambours et les cris des esprits : '+n+' escouade'+(n>1?'s':'')+' prise'+(n>1?'s':'')+' de peur.':'Personne d’assez près pour entendre les esprits.','#d8c0f0')}
 else if(k==='salve'&&f.length){f.forEach(s=>{s.salve=1;s.cd=Math.min(s.cd,.4)});btMsg('« En joue… feu ! » Salve au prochain tir.')}btUI()}

function btUI(){if(!BT)return;const top=$('btTop'),sq=$('btSq'),od=$('btOrd');
 const mien=BT.S.filter(s=>s.joueur),ad=BT.S.filter(s=>!s.joueur),n=L=>L.reduce((a,s)=>a+(s.parti?0:s.sold.length),0);
 top.innerHTML='<b>⚔️ '+BT.sc.n+'</b><span>'+n(mien)+' des vôtres · '+n(ad.filter(s=>btVisible(s)||s.joueur))+(ad.some(s=>s.cache&&!btVisible(s))?' + ?':'')+' en face</span><span style="flex:1"></span>'+
  (BT.k==='defCamp'||BT.k==='garde'?'<span>Tenir jusqu’au soir : '+Math.max(0,Math.ceil((240-BT.tps)/60*10)/10)+' min</span>':'<span>Tenir '+BT.C.obj.n+' : '+Math.round(BT.tenue)+' / '+(BT.k==='descente'?15:25)+' s</span>')+
  '<button data-b="p">'+(BT.pause?'▶ Reprendre':'⏸ Pause')+'</button><button data-b="v">×'+BT.vit+'</button><button data-b="a">?</button><button data-b="q">Quitter</button>';
 sq.innerHTML=mien.map((s,i)=>{const m=Math.max(0,Math.min(100,s.mor));return '<div class="btC'+(BT.sel.has(s.id)?' on':'')+(s.rout||!btVivant(s)?' rt':'')+'" data-s="'+s.id+'"><b>'+(i+1)+' '+s.T.ic+' '+s.nom+'</b><br>'+s.sold.length+' / '+s.n0+' · '+BFORM[s.form][0]+' '+BFORM[s.form][1]+(s.hold?' · tient':'')+(s.rout?' · <span style="color:#ff9a7a">débandade</span>':'')+(s.parti?' · parti':'')+
  '<div class="mb"><i style="width:'+m+'%;background:'+(m>55?'#7ac06a':m>30?'#e0b04a':'#d0503a')+'"></i></div></div>'}).join('');
 const L=btChoisies(),mys=L.some(s=>s.T.mys)&&!S.voieC,feu=L.some(s=>s.T.feu&&s.form==='ligne'),cdP=L.find(s=>s.T.mys&&s.ab.peur>BT.tps);
 od.innerHTML=(L.length?'<span>'+L.length+' escouade'+(L.length>1?'s':'')+' :</span>'+Object.keys(BFORM).map(f=>'<button data-f="'+f+'" title="'+BFORM[f][2]+'" class="'+(L.every(s=>s.form===f)?'on':'')+'">'+BFORM[f][0]+' '+BFORM[f][1]+'</button>').join('')+
  '<button data-o="h" class="'+(L.every(s=>s.hold)?'on':'')+'">✋ Tenir</button><button data-o="r">↩ Repli</button>'+
  (mys?'<button data-o="brume"'+((S.myst||0)<2||BT.brume?' disabled':'')+'>🌫️ Brume (2)</button><button data-o="peur"'+((S.myst||0)<2||cdP?' disabled':'')+'>👻 Peur des esprits (2)</button>':'')+(feu?'<button data-o="salve">💥 Salve</button>':''):'<span style="opacity:.75">Choisissez une escouade (clic, Maj+clic, cadre ou touches 1–9), puis cliquez sur le terrain ou sur l’ennemi.</span>')+
  (mys||(!S.voieC&&BT.sc.cote==='m')?'<span style="opacity:.75;margin-left:6px">Mystique : '+Math.round((S.myst||0)*10)/10+'</span>':'');
 $('btLog').innerHTML=BT.log.map(l=>'<div style="color:'+(l.c||'#efe9da')+'">'+l.m+'</div>').join('');const h=$('btBas').offsetHeight;if(h!==BT.basH){BT.basH=h;btTaille()}}

// ----- la mécanique -----
function btBut(s,tx,ty){// passer la ravine par un gué
 const r=BT.C.rav;if(!r)return {x:tx,y:ty};const cote=y=>y<r.y?-1:1;if(cote(s.y)===cote(ty))return {x:tx,y:ty};const g=r.gues.reduce((a,b)=>Math.abs(b-s.x)+Math.abs(b-tx)<Math.abs(a-s.x)+Math.abs(a-tx)?b:a);
 if(Math.abs(s.x-g)<26)return {x:g,y:ty>r.y?r.y+30:r.y-30};return {x:g,y:s.y<r.y?r.y-30:r.y+30}}
function btMarche(s,tx,ty,dt,mul){const b=btBut(s,tx,ty),dx=b.x-s.x,dy=b.y-s.y,d=Math.hypot(dx,dy);if(d<3)return true;
 let v=s.T.sp*(s.form==='colonne'?1.35:s.form==='carre'?.6:s.form==='disperse'?1:.9)*(mul||1);if(btForet(s.x,s.y))v*=s.cote==='m'?.85:s.T.chien?.8:.55;
 const st=Math.min(d,v*dt);s.x+=dx/d*st;s.y+=dy/d*st;s.y=clamp(s.y,4,BH-4);s.x=clamp(s.x,4,BW-4);let da=Math.atan2(dy,dx)-s.ang;da=Math.atan2(Math.sin(da),Math.cos(da));s.ang+=da*Math.min(1,dt*4);s.mv=1;s.immobile=0;return false}
function btTourne(s,t,dt){let da=Math.atan2(t.y-s.y,t.x-s.x)-s.ang;da=Math.atan2(Math.sin(da),Math.cos(da));s.ang+=da*Math.min(1,dt*3)}
function btProche(s,f){return BT.S.filter(o=>o.joueur!==s.joueur&&btVivant(o)&&(s.joueur?btVisible(o):(o.joueur?btVisible(o):true))&&(!f||f(o))).sort((a,b)=>Math.hypot(a.x-s.x,a.y-s.y)-Math.hypot(b.x-s.x,b.y-s.y))[0]}
function btTirer(s,c,dt){const T=s.T;s.cd-=dt;if(s.cd>0)return;const d=Math.hypot(c.x-s.x,c.y-s.y);if(d>T.po)return;
 const parts={ligne:1,colonne:.35,carre:.6,disperse:.85}[s.form],nb=Math.max(1,Math.round(s.sold.length*parts));let acc=T.acc*(1-d/T.po*.45);
 if(btForet(c.x,c.y))acc*=.55;if(T.feu&&btForet(s.x,s.y))acc*=.8;if(c.form==='disperse')acc*=.55;if(c.form==='colonne'||c.form==='carre')acc*=1.2;if(BT.nuit)acc*=.8;
 if(BT.brume&&T.feu&&(Math.hypot(c.x-BT.brume.x,c.y-BT.brume.y)<BT.brume.r||Math.hypot(s.x-BT.brume.x,s.y-BT.brume.y)<BT.brume.r))acc*=.3;if(s.salve)acc*=1.5;
 let hits=0;for(let i=0;i<nb;i++)if(Math.random()<acc)hits++;
 s.sold.slice(0,nb).forEach(q=>BT.fx.push({k:T.feu?'feu':'sag',x:q.x,y:q.y,x2:c.x+(Math.random()-.5)*20,y2:c.y+(Math.random()-.5)*20,t:0}));
 if(s.cache&&!s.emb){s.emb=1;c.mor-=10;btMsg((s.joueur?'Votre embuscade : ':'Embuscade ! ')+s.nom.toLowerCase()+' surgit de la forêt.',s.joueur?'#9ad08a':'#ff9a7a')}
 for(let i=0;i<hits;i++)btTue(c,s,T.feu?'feu':'sag');if(T.feu)c.mor-=2+nb*.3;s.cd=T.cd*(s.salve?1.4:1)*(.9+Math.random()*.2);s.salve=0;s.dernierTir=BT.tps;s.cache=0;
 if(T.feu)try{if(typeof sBruit==='function')sBruit(.18,{f:500,v:.12,ft:'lowpass'})}catch(e){}}
function btMelee(a,b,dt){const fa={ligne:.9,colonne:1,carre:.8,disperse:.7}[a.form],db={ligne:.9,colonne:.9,carre:b.T.chien?1:1.6,disperse:.6}[b.form]*(a.T.chien&&b.form==='carre'?1.8:1);
 a.acM=(a.acM||0)+a.sold.length*a.T.me*fa/db*dt*.09*(a.cote==='m'&&btForet(a.x,a.y)?1.2:1);while(a.acM>=1&&b.sold.length){a.acM-=1;btTue(b,a,'me')}b.mor-=dt*1.2}
function btBoucle(){if(!BT)return;const now=performance.now(),dt0=Math.min(.05,(now-BT.last)/1000);BT.last=now;
 if(!BT.pause&&!BT.fin){const n=BT.vit===2?2:1,dt=dt0*(BT.vit===.5?.5:1);for(let i=0;i<n;i++)btPas(dt)}btDessin();BT.ui=(BT.ui||0)+dt0;if(BT.ui>.4){BT.ui=0;btUI()}requestAnimationFrame(btBoucle)}
function btPas(dt){BT.tps+=dt;if(BT.brume){BT.brume.t-=dt;if(BT.brume.t<=0)BT.brume=null}
 const S2=BT.S.filter(btVivant);
 // le corps à corps : deux escouades qui se touchent se battent
 S2.forEach(s=>s.engage=null);S2.forEach(a=>S2.forEach(b=>{if(a.joueur===b.joueur||a.id>b.id)return;if(Math.hypot(a.x-b.x,a.y-b.y)<(btRayon(a)+btRayon(b))*.55+8){if(!a.rout)a.engage=a.engage||b;if(!b.rout)b.engage=b.engage||a;if(!a.rout)btMelee(a,b,dt);if(!b.rout)btMelee(b,a,dt);if(a.rout)a.mor-=dt*4;if(b.rout)b.mor-=dt*4}}));
 S2.forEach(s=>{if(!btVivant(s))return;s.mv=0;
  // moral : il remonte doucement loin de l'ennemi, il s'effondre au-dessous de 20
  const pr=btProche(s);const dp=pr?Math.hypot(pr.x-s.x,pr.y-s.y):999;if(dp>170&&!s.engage)s.mor=Math.min(85,s.mor+dt*1.5);
  if(!s.rout&&s.mor<20){s.rout=1;s.ord=null;BT.sel.delete(s.id);btMsg(s.nom+' se débande !',s.joueur?'#ff9a7a':'#9ad08a')}
  if(s.rout){if(s.mor>45&&dp>160){s.rout=0;btMsg(s.nom+' se reprend.')}else{const fy=(s.joueur?BT.hautJ:!BT.hautJ)?-20:BH+20;btMarche(s,s.x,fy,dt,1.3);if(s.y<8||s.y>BH-8){s.parti=1;btMsg(s.nom+' a quitté le terrain.')}}}
  else if(s.engage){btTourne(s,s.engage,dt)}
  else{if(!s.joueur)btIA(s,dt);else if(!s.hold&&(!s.ord||s.ord.auto))btIAJ(s,dt);const o=s.ord;let cible=null;
   if(o&&o.k==='va'){if(btMarche(s,o.x,o.y,dt))s.ord=null}
   else if(o&&o.k==='att'){const t=BT.S[o.t];if(!t||!btVivant(t)){s.ord=null}else{cible=t;const d=Math.hypot(t.x-s.x,t.y-s.y);if(s.T.po&&d>s.T.po*.88)btMarche(s,t.x,t.y,dt);else if(!s.T.po)btMarche(s,t.x,t.y,dt,1.1);}}
   else if(!s.hold&&!s.T.po&&!s.T.mys){const t=btProche(s);if(t&&Math.hypot(t.x-s.x,t.y-s.y)<(s.joueur?75:130))btMarche(s,t.x,t.y,dt,1.1)}
   if(s.T.po){const t=cible||btProche(s,o2=>Math.hypot(o2.x-s.x,o2.y-s.y)<=s.T.po);if(t){if(!s.mv)btTourne(s,t,dt);btTirer(s,t,dt)}else s.cd=Math.max(0,s.cd-dt)}}
  // cachés : immobiles en forêt, sans avoir tiré depuis 3 s
  s.immobile=s.mv?0:(s.immobile||0)+dt;s.cache=btForet(s.x,s.y)&&s.immobile>2&&BT.tps-s.dernierTir>12&&!s.engage;
  // les soldats rejoignent leur place
  const sl=btSlots(s);s.sold.forEach((q,j)=>{const t=sl[j];q.x+=(t.x-q.x)*Math.min(1,dt*3);q.y+=(t.y-q.y)*Math.min(1,dt*3)})});
 BT.fx.forEach(f=>f.t+=dt);BT.fx=BT.fx.filter(f=>f.t<(f.k==='mort'?6:f.k==='va'||f.k==='cible'?.8:.25));
 // l'objectif
 const o=BT.C.obj,att=BT.sc.def?0:1,dans=j=>BT.S.some(s=>s.joueur===j&&btActif(s)&&Math.hypot(s.x-o.x,s.y-o.y)<o.r);
 if(dans(att)&&!dans(1-att))BT.tenue+=dt;else BT.tenue=Math.max(0,BT.tenue-dt*.5);
 const need=BT.k==='descente'?15:25,vivJ=BT.S.some(s=>s.joueur&&btActif(s)),vivE=BT.S.some(s=>!s.joueur&&btActif(s));
 if(!vivE)btFin(true,'L’ennemi est en fuite.');else if(!vivJ)btFin(false,'Vos escouades sont dispersées.');
 else if(BT.tenue>=need)btFin(att===1,att===1?'Vous tenez '+o.n+'.':'L’ennemi tient '+o.n+'.');
 else if(BT.tps>=240)btFin(!!BT.sc.def,BT.sc.def?'Le soir tombe : l’ennemi renonce et redescend.':'Le soir tombe : il faut renoncer.')}
// l'adversaire : il attaque s'il est l'assaillant, sinon il garde l'objectif et tend des embuscades
function btIA(s,dt){s.pense=(s.pense||0)-dt;if(s.pense>0)return;s.pense=.8+Math.random()*.6;const o=BT.C.obj;
 const t=BT.S.filter(x=>x.joueur&&btVivant(x)&&(btVisible(x)||Math.hypot(x.x-s.x,x.y-s.y)<80)).sort((a,b)=>Math.hypot(a.x-s.x,a.y-s.y)-Math.hypot(b.x-s.x,b.y-s.y))[0];
 if(s.T.mys){if(t&&Math.hypot(t.x-s.x,t.y-s.y)<180&&!(s.ab.peur>BT.tps)){s.ab.peur=BT.tps+50;t.mor-=18;btMsg('Des cris montent de la forêt : la peur gagne '+t.nom.toLowerCase()+'.','#ff9a7a')}if(t&&!BT.brumeE){BT.brumeE=1;BT.brume={x:s.x,y:s.y+(BT.hautJ?-60:60),r:150,t:18};btMsg('Une brume descend sur vous : vos fusils tirent à l’aveugle.','#ff9a7a')}
  s.ord={k:'va',x:o.x+(Math.random()-.5)*60,y:o.y+(Math.random()-.5)*60};return}
 if(BT.sc.def){// l'adversaire attaque
  if(s.T.feu&&s.form!=='ligne'&&t&&Math.hypot(t.x-s.x,t.y-s.y)<s.T.po*1.4)s.form='ligne';else if(s.T.feu&&!t)s.form='colonne';
  if(t&&Math.hypot(t.x-s.x,t.y-s.y)<260)s.ord={k:'att',t:t.id};else s.ord={k:'va',x:o.x+(Math.random()-.5)*o.r,y:o.y};}
 else{// l'adversaire défend : il reste près de l'objectif, à couvert, et frappe ce qui approche
  if(t&&Math.hypot(t.x-o.x,t.y-o.y)<o.r+170){if(!s.T.po||Math.hypot(t.x-s.x,t.y-s.y)>s.T.po)s.ord={k:'att',t:t.id};else s.ord=null}
  else if(!s.poste){const f=BT.C.F.filter(f=>Math.hypot(f.x-o.x,f.y-o.y)<o.r+150).sort(()=>Math.random()-.5)[0];s.poste=f?{x:f.x+(o.x-f.x)*.3,y:f.y+(o.y-f.y)*.3}:{x:o.x+(Math.random()-.5)*80,y:o.y+(Math.random()-.5)*60};s.ord={k:'va',x:s.poste.x,y:s.poste.y}}}}

// ----- le dessin -----
function btDessin(){const cv=$('btc');if(!cv)return;const x=cv.getContext('2d'),sc=BT.z;x.setTransform(1,0,0,1,0,0);x.fillStyle='#12150f';x.fillRect(0,0,cv.width,cv.height);x.setTransform(sc,0,0,sc,BT.ox,BT.oy);x.drawImage(BT.fond,0,0);
 if(BT.brume){const b=BT.brume,g=x.createRadialGradient(b.x,b.y,10,b.x,b.y,b.r);g.addColorStop(0,'rgba(230,235,240,.55)');g.addColorStop(1,'rgba(230,235,240,0)');x.fillStyle=g;x.beginPath();x.arc(b.x,b.y,b.r,0,7);x.fill()}
 BT.fx.forEach(f=>{if(f.k==='mort'){x.fillStyle='rgba(60,20,10,'+(1-f.t/6)*.7+')';x.fillRect(f.x-2,f.y-2,4,4)}});
 BT.S.forEach(s=>{if(!btVivant(s))return;const vis=s.joueur||btVisible(s);if(!vis)return;const col=s.cote==='m'?(s.joueur?'#e0a860':'#c07848'):(s.T.chien?'#8a7a6a':s.type==='sagaie'?'#6a5040':'#3a5ab0'),sel=BT.sel.has(s.id);
  const al=s.cache?.5:s.rout?(.5+.4*Math.sin(BT.tps*10)):1;x.globalAlpha=al;
  if(sel){x.strokeStyle='#f0c46a';x.lineWidth=1.5;x.beginPath();x.arc(s.x,s.y,btRayon(s)+6,0,7);x.stroke()}
  s.sold.forEach((q,qi)=>btFig108(x,q,s,col,qi));
  // le fanion
  x.globalAlpha=al;x.fillStyle=s.joueur?'#000a':'#300a';const lb=s.T.ic+' '+s.sold.length;x.font='600 11px Montserrat';const w=x.measureText(lb).width+8;x.fillRect(s.x-w/2,s.y-btRayon(s)-20,w,15);x.fillStyle=s.joueur?'#fff':'#ffc0b0';x.fillText(lb,s.x-w/2+4,s.y-btRayon(s)-9);
  const m=Math.max(0,Math.min(100,s.mor));x.fillStyle='#0008';x.fillRect(s.x-w/2,s.y-btRayon(s)-5,w,3);x.fillStyle=m>55?'#7ac06a':m>30?'#e0b04a':'#d0503a';x.fillRect(s.x-w/2,s.y-btRayon(s)-5,w*m/100,3);
  if(sel&&s.ord&&s.ord.k==='va'){x.setLineDash([4,4]);x.strokeStyle='#f0c46a99';x.beginPath();x.moveTo(s.x,s.y);x.lineTo(s.ord.x,s.ord.y);x.stroke();x.setLineDash([])}x.globalAlpha=1});
 BT.fx.forEach(f=>{if(f.k==='feu'){x.strokeStyle='rgba(255,240,190,'+(1-f.t/.25)+')';x.lineWidth=1;x.beginPath();x.moveTo(f.x,f.y);x.lineTo(f.x2,f.y2);x.stroke();x.fillStyle='#fff6';x.beginPath();x.arc(f.x,f.y,4,0,7);x.fill()}
  else if(f.k==='sag'){const k=f.t/.25;x.strokeStyle='#c8a070';x.lineWidth=1.4;x.beginPath();const px=f.x+(f.x2-f.x)*k,py=f.y+(f.y2-f.y)*k;x.moveTo(px,py);x.lineTo(px-(f.x2-f.x)*.06,py-(f.y2-f.y)*.06);x.stroke()}
  else if(f.k==='va'||f.k==='cible'){x.strokeStyle=f.k==='va'?'#f0c46a':'#ff7a5a';x.lineWidth=2;x.beginPath();x.arc(f.x,f.y,6+f.t*20,0,7);x.stroke()}});
 if(BT.cadre){const c=BT.cadre;x.strokeStyle='#f0c46a';x.lineWidth=1;x.setLineDash([4,3]);x.strokeRect(c.a.x,c.a.y,c.b.x-c.a.x,c.b.y-c.a.y);x.setLineDash([])}
 if(BT.nuit){x.fillStyle='rgba(10,15,40,.18)';x.fillRect(0,0,BW,BH)}}

// ----- la fin : ce que la bataille change pour les vrais gens -----
function btFin(gagne,pourquoi){if(!BT||BT.fin)return;BT.fin=1;const sc=BT.sc,mes=[...new Set(BT.pertes.filter(q=>q.cote===1).map(q=>q.p))],morts=[],blesses=[];
 mes.forEach(p=>{if(Math.random()<.55)morts.push(p);else blesses.push(p)});
 const fusPris=BT.S.filter(s=>!s.joueur&&s.T.feu).reduce((a,s)=>a+(s.n0-s.sold.length),0);let eff=[];
 if(sc.cote==='m'){if(gagne){const f=Math.floor(fusPris/2);S.fu=(S.fu||0)+f;S.coh=Math.min(100,(S.coh||0)+5);S.traque=Math.min(100,(S.traque||0)+4);if(f)eff.push('+'+f+' fusil'+(f>1?'s':'')+' pris');eff.push('cohésion +5');if(BT.k==='descente'){S.vivres=(S.vivres||0)+12;eff.push('+12 vivres du grenier')}}
  else{S.traque=Math.min(100,(S.traque||0)+(BT.k==='defCamp'?12:6));S.coh=Math.max(0,(S.coh||0)-5);if(BT.k==='defCamp'){S.vivres=Math.round((S.vivres||0)*.6);eff.push('le camp est pillé : vivres −40 %')}eff.push('traque en hausse')}}
 else{if(gagne){S.coh=Math.min(100,(S.coh||0)+3);eff.push('l’ordre de l’habitation tient');if(BT.k==='assaut'){S.traque=Math.max(0,(S.traque||0)-8)}}else{S.vivres=Math.max(0,(S.vivres||0)-8);eff.push('le grenier est pillé : −8 vivres')}}
 BT.mortsP=morts;blesses.forEach(p=>{p.blesse=30});
 const titre=gagne?'Victoire':'Défaite';try{journal('⚔️ '+sc.n+' : '+titre.toLowerCase()+'. '+pourquoi+(morts.length?' Morts : '+morts.map(p=>p.n).join(', ')+'.':'')+(blesses.length?' Blessés : '+blesses.length+'.':''))}catch(e){}
 const d=document.createElement('div');d.id='btFin';d.innerHTML='<div class="bx"><h3>'+titre+'</h3><p>'+pourquoi+'</p><p>Vos pertes : '+BT.morts[0]+' · celles d’en face : '+BT.morts[1]+'.</p>'+
  (morts.length?'<p><b>Ceux qui ne reviendront pas :</b> '+morts.map(p=>p.n).join(', ')+'.</p>':'')+(blesses.length?'<p>Blessés, ils se relèveront : '+blesses.map(p=>p.n.split(' ')[0]).join(', ')+'.</p>':'')+(eff.length?'<p>'+eff.join(' · ')+'</p>':'')+'<button>Revenir à la vie du '+(S.voieC?'quartier':'camp')+'</button></div>';
 BT.el.appendChild(d);d.querySelector('button').onclick=()=>btFermer();btUI()}
function btFermer(){if(!BT)return;const b=BT;BT=null;b.off&&b.off();b.el.remove();b.arret();(b.mortsP||[]).forEach(p=>{try{mourirP(p,'à la bataille')}catch(e){}});try{sauve();panneau();rafraichir()}catch(e){}}

// ----- l'entrée : « ⚔️ Épopée » en mode Vie -----
function btChoix(){const cote=S.voieC?'c':'m',L=Object.keys(BSCEN).filter(k=>(BSCEN[k].cote===cote||BSCEN[k].cote==='*')&&(!BSCEN[k].si||BSCEN[k].si()));const d=document.createElement('div');d.id='btAide';d.style.cssText='position:fixed;inset:0;z-index:9450;display:flex;align-items:center;justify-content:center;background:#000b';btStyle();
 d.innerHTML='<div class="bx"><h3>Épopées</h3><p style="margin-top:0">Quand le conflit devient ouvert, on ne commande plus un groupe mais des escouades. Les gens '+(S.voieC?'de l’habitation':'du camp')+' y vont vraiment : les morts restent morts.</p>'+
  L.map(k=>'<button data-k="'+k+'" style="display:block;width:100%;text-align:left;margin:6px 0;background:#fbf6ea;color:#2a2016;border:2px solid #c8b890;border-radius:6px;padding:9px 12px;font:500 13px Montserrat,sans-serif;cursor:pointer"><b style="font-size:15px">'+BSCEN[k].n+'</b><br>'+BSCEN[k].t+'</button>').join('')+'<button data-k="x" style="font:600 13px Montserrat,sans-serif;background:#b5412b;color:#fff;border:0;border-radius:999px;padding:7px 16px;cursor:pointer;margin-top:6px">Pas maintenant</button></div>';
 document.body.appendChild(d);d.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{d.remove();if(b.dataset.k!=='x')btOuvrir(b.dataset.k)})}
setInterval(()=>{try{const h=$('fc');if(!h)return;let b=h.querySelector('.btP');const ok=typeof S!=='undefined'&&S&&!modeHist()&&!S.fin&&!($('kons')&&!$('kons').hidden)&&!document.body.classList.contains('film');if(!ok){if(b)b.remove();return}if(b)return;
 b=document.createElement('span');b.className='pill btP';b.style.cursor='pointer';b.title='Les grandes batailles : commander des escouades, choisir leurs formations';b.textContent='⚔️ Épopée';b.onclick=e=>{e.stopPropagation();btChoix()};h.appendChild(b)}catch(e){}},800);

// ----- vos escouades sans ordre ne restent pas plantées : elles agissent seules (attaquer si vous attaquez, tenir et frapper ce qui approche si vous défendez) -----
function btIAJ(s,dt){s.penseJ=(s.penseJ||0)-dt;if(s.penseJ>0)return;s.penseJ=.7+Math.random()*.5;const o=BT.C.obj,att=!BT.sc.def;
 const t=BT.S.filter(x=>!x.joueur&&btVivant(x)&&!x.rout&&(btVisible(x)||Math.hypot(x.x-s.x,x.y-s.y)<80)).sort((a,b)=>Math.hypot(a.x-s.x,a.y-s.y)-Math.hypot(b.x-s.x,b.y-s.y))[0];
 const A=(k,x,y,id)=>{s.ord=k==='att'?{k,t:id,auto:1}:{k,x,y,auto:1}};
 if(s.T.mys){if(t){const amis=BT.S.filter(x=>x.joueur&&btActif(x)&&x!==s);const c=amis.sort((a,b)=>Math.hypot(a.x-s.x,a.y-s.y)-Math.hypot(b.x-s.x,b.y-s.y))[0];if(c&&Math.hypot(c.x-s.x,c.y-s.y)>40)A('va',c.x+(Math.random()-.5)*30,c.y+(BT.hautJ?-30:30))}return}
 if(!t){if(att)A('va',o.x+(Math.random()-.5)*o.r,o.y+(Math.random()-.5)*o.r*.5);return}
 const d=Math.hypot(t.x-s.x,t.y-s.y);
 if(att){if(d<320)A('att',0,0,t.id);else A('va',o.x+(Math.random()-.5)*o.r,o.y)}
 else{// en défense : on frappe ce qui s'approche de l'objectif ou de soi
  if(Math.hypot(t.x-o.x,t.y-o.y)<o.r+190||d<(s.T.po||90)*1.3){if(!s.T.po||d>s.T.po)A('att',0,0,t.id);else s.ord=null}}}
