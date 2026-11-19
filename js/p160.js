
// ===== p160 : la caverne — on la voit sur la carte, on l'explore (petit jeu) avant de pouvoir s'y réfugier, et on voit les camps y monter =====
// 1. Une caverne trouvée se marque sur la carte (🕳 « Caverne à explorer » ; ⛰ « Caverne sûre » une fois explorée).
// 2. « Explorer la caverne » (1 bras) ouvre un petit jeu : à la torche, il faut regarder partout, chasser les cochons marrons qui s'y abritent,
//    éviter les fosses, ramasser ce qu'on trouve (os d'ancêtres, pièces de pirates, poteries). Tant qu'elle n'est pas sûre, on ne peut pas y monter.
// 3. Quand on monte à la caverne (cyclone, battue), on voit les gens des camps choisis y aller et s'y abriter.
const CAV160={spr:{},ln:null,cle:''};
function cavOk160(){if(!S)return {};if(!S.cavOk160)S.cavOk160={};return S.cavOk160}
// seules les cavernes explorées comptent pour s'abriter
{const c0=cav97Connue;cav97Connue=function(){const C=cavOk160(),cs=camps();return Object.keys(C).some(i=>cs.some(c=>hd(c,T[+i])<=4))}}
function cavSure160(){const C=cavOk160(),cs=camps();let best=null,bd=99;Object.keys(C).forEach(i=>{cs.forEach(c=>{const d=hd(c,T[+i]);if(d<bd){bd=d;best=+i}})});return best}
// en mode conte (lecture automatique), l'exploration se fait d'elle-même, on la raconte
// en mode conte : une seule caverne est fouillée d'elle-même, la plus proche d'un camp, et seulement quand un cyclone approche et qu'aucune n'est sûre
setInterval(()=>{try{if(!S||S.fin||S.voieC||typeof autoD!=='function'||!autoD())return;const C=cavOk160();if(!(S.cyc&&S.cyc.in<=3)||Object.keys(C).some(i=>camps().some(c=>hd(c,T[+i])<=4)))return;
 const L=Object.keys(S.cav97||{}).filter(i=>!C[i]).map(i=>[+i,camps().reduce((m,c)=>Math.min(m,hd(c,T[+i])),99)]).filter(x=>x[1]<=4).sort((a,b)=>a[1]-b[1]);if(!L.length)return;const i=L[0][0];
 C[i]=1;journal('Le cyclone approche : les éclaireurs fouillent la caverne '+(lieuProche(T[i])||'')+' à la torche. Pas de cochons, pas de fosse cachée : on pourra s’y abriter.')}catch(e){}},3000);
{const a0=actions;actions=function(t){const A=a0(t);try{if(S&&!S.voieC&&t&&S.cav97&&S.cav97[t.i]&&!cavOk160()[t.i])A.unshift({id:'cav160',n:'🕳 Explorer la caverne',c:1,d:'Petit jeu : à la torche, regardez partout, chassez les cochons marrons, évitez les fosses. Une fois sûre, on pourra s’y réfugier quand viendra le cyclone.'})}catch(e){}return A}}
{const g0=agir;agir=function(t,id,l){if(id!=='cav160')return g0.apply(this,arguments);if(!l){if(S.bras<1)return false;snap();S.bras-=1}
 cav160Jeu(t.i,ok=>{if(ok){cavOk160()[t.i]=1;journal('La caverne '+(lieuProche(t)||'des remparts')+' est sûre : on l’a fouillée de bout en bout. Les camps proches pourront y monter quand viendra le cyclone.')}else journal('La torche s’est éteinte avant qu’on ait tout vu : la caverne n’est pas encore sûre. Il faudra y retourner.');try{sauve();rafraichir();panneau()}catch(e){}});return true}}
// ----- le petit jeu -----
function cav160Jeu(seed,fin){const el=document.createElement('div');el.id='cav160';el.style.cssText='position:fixed;inset:0;z-index:9600;background:#050608;display:flex;flex-direction:column;align-items:center;justify-content:safe center;overflow:auto;color:#efe9da;font:14px system-ui;padding:8px 0';
 const C=30,R=18;let r=(seed*9301+49297)%233280;const rnd=()=>(r=(r*9301+49297)%233280)/233280;
 // la caverne : automate cellulaire, une seule salle connexe
 let G=[];for(let y=0;y<R;y++){G.push([]);for(let x=0;x<C;x++)G[y].push(x===0||y===0||x===C-1||y===R-1?1:(rnd()<.44?1:0))}
 for(let k=0;k<5;k++){const N=G.map(l=>l.slice());for(let y=1;y<R-1;y++)for(let x=1;x<C-1;x++){let n=0;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)n+=G[y+a][x+b];N[y][x]=n>=5?1:0}G=N}
 const ent={x:1,y:Math.floor(R/2)};for(let x=1;x<6;x++)G[ent.y][x]=0;
 const vu=new Set(),acc=new Set();(function fl(){const Q=[[ent.x,ent.y]];acc.add(ent.x+','+ent.y);while(Q.length){const [x,y]=Q.pop();[[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b])=>{const X=x+a,Y=y+b,k=X+','+Y;if(G[Y]&&G[Y][X]===0&&!acc.has(k)){acc.add(k);Q.push([X,Y])}})}})();
 for(let y=0;y<R;y++)for(let x=0;x<C;x++)if(G[y][x]===0&&!acc.has(x+','+y))G[y][x]=1;
 const libres=[...acc].map(k=>k.split(',').map(Number)).filter(([x])=>x>8);const tire=()=>libres.splice(Math.floor(rnd()*libres.length),1)[0];
 const fos=[0,1,2,3].map(tire).filter(Boolean).map(([x,y])=>({x,y,vue:0})),obj=[['🦴','des os d’ancêtres, couchés avec soin : on les laisse en paix',{myst:1}],['🪙','une pièce d’or espagnole, cachée par des pirates',{or:1}],['🏺','une poterie malgache, intacte',{coh:1}]].map(o=>{const p=tire();return p?{x:p[0],y:p[1],ic:o[0],t:o[1],fx:o[2],pris:0}:null}).filter(Boolean);
 const coch=[0,1,2].map(tire).filter(Boolean).map(([x,y])=>({x,y,parti:0,cd:0}));
 const P={x:ent.x,y:ent.y},TORCHE=100;let huile=TORCHE,msg='Entrez avec la torche. Regardez partout, chassez les cochons vers la sortie (à gauche), évitez les fosses.',fini=false,trouve=[];
 const cs=Math.floor(Math.min((Math.min(innerWidth,1000)-20)/C,(innerHeight-170)/R)),W=cs*C,H=cs*R;
 el.innerHTML='<div style="max-width:'+W+'px;width:100%;display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><b style="font:700 19px Alegreya,Georgia,serif;color:#f0c46a">La caverne</b><span id="c160i"></span><button class="bt sec" id="c160q">Ressortir</button></div><canvas width="'+W+'" height="'+H+'" style="border-radius:6px;max-width:100%;touch-action:none"></canvas><div id="c160m" style="max-width:'+W+'px;margin-top:6px;min-height:36px"></div><div style="opacity:.7;font-size:12px">Flèches ou ZQSD pour avancer · touchez une case pour y aller · Espace : chasser le cochon le plus proche</div>';
 document.body.appendChild(el);window.BTUON=1;const cv=el.querySelector('canvas'),x=cv.getContext('2d');
 const voir=()=>{for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++){if(a*a+b*b>10)continue;const X=P.x+a,Y=P.y+b;if(G[Y]&&G[Y][X]!==undefined)vu.add(X+','+Y)}};voir();
 const part=()=>{const n=[...acc].filter(k=>vu.has(k)).length;return n/acc.size};
 function pas(dx,dy){if(fini)return;const X=P.x+dx,Y=P.y+dy;if(!G[Y]||G[Y][X]!==0)return;const c=coch.find(c=>!c.parti&&c.x===X&&c.y===Y);if(c){fuit(c);return}P.x=X;P.y=Y;huile-=.12;voir();
  const f=fos.find(f=>f.x===X&&f.y===Y);if(f){f.vue=1;huile-=8;P.x=ent.x;P.y=ent.y;msg='Une fosse ! On glisse, on remonte à la corde jusqu’à l’entrée. La torche a pris l’eau (−8).'}
  const o=obj.find(o=>!o.pris&&o.x===X&&o.y===Y);if(o){o.pris=1;trouve.push(o);msg=o.ic+' On trouve '+o.t+'.'}verif()}
 function fuit(c){c.parti=1;msg='🐗 Le cochon marron détale vers la sortie. '+(coch.every(c=>c.parti)?'Il n’y en a plus.':'Il en reste.');huile-=2;verif()}
 let sure=false;function verif(){const p=part();if(!sure&&p>=.85&&coch.every(c=>c.parti)){sure=true;msg='⛰ C’est fait : la caverne est sûre. Vous pouvez ressortir (ou finir de la visiter).';const q=el.querySelector('#c160q');if(q){q.textContent='⛰ Ressortir : caverne sûre';q.className='bt';q.style.animation='cav160 1s ease-in-out infinite'}}else if(!sure&&huile<=0){fini=true;fermer(false)}}
 function fermer(ok){setTimeout(()=>{el.remove();window.BTUON=0;removeEventListener('keydown',kd,true);try{if(ok){trouve.forEach(o=>{if(o.fx.myst)S.myst=(S.myst||0)+1;if(o.fx.coh)fx({coh:1});if(o.fx.or)S.vivres=(S.vivres||0)+2});if(trouve.length)journal('Dans la caverne : '+trouve.map(o=>o.ic).join(' ')+'.')}}catch(e){}fin&&fin(ok)},ok?1400:900);msg=ok?'⛰ La caverne est sûre. On pourra y monter.':'La torche s’éteint. On ressort à tâtons.'}
 const kd=e=>{const k=e.key;const m={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],z:[0,-1],s:[0,1],q:[-1,0],d:[1,0],w:[0,-1],a:[-1,0]}[k];if(m){e.preventDefault();e.stopPropagation();pas(m[0],m[1])}else if(k===' '){e.preventDefault();e.stopPropagation();const c=coch.filter(c=>!c.parti).sort((a,b)=>Math.hypot(a.x-P.x,a.y-P.y)-Math.hypot(b.x-P.x,b.y-P.y))[0];if(c&&Math.hypot(c.x-P.x,c.y-P.y)<2.5)fuit(c);else msg='Aucun cochon assez près.'}};addEventListener('keydown',kd,true);
 let cible=null;cv.onclick=e=>{const b=cv.getBoundingClientRect(),X=Math.floor((e.clientX-b.left)/b.width*C),Y=Math.floor((e.clientY-b.top)/b.height*R);cible={x:X,y:Y}};
 el.querySelector('#c160q').onclick=()=>{fini=true;fermer(sure)};{const st=document.createElement('style');st.textContent='@keyframes cav160{0%,100%{box-shadow:0 0 0 0 rgba(232,190,90,0)}50%{box-shadow:0 0 18px 6px rgba(232,190,90,.9)}}#c160i{font:700 16px system-ui;color:#f0c46a}';el.appendChild(st)}
 let t0=performance.now(),acc2=0;(function boucle(t){if(!el.isConnected)return;requestAnimationFrame(boucle);const dt=Math.min(.1,(t-t0)/1000);t0=t;if(!fini){huile-=dt*.3;acc2+=dt;
   if(cible&&acc2>.12){acc2=0;const dx=Math.sign(cible.x-P.x),dy=Math.sign(cible.y-P.y);if(!dx&&!dy)cible=null;else{const a=P.x,b=P.y;if(dx&&G[P.y][P.x+dx]===0&&!fos.some(f=>f.vue&&f.x===P.x+dx&&f.y===P.y))pas(dx,0);else if(dy)pas(0,dy);if(P.x===a&&P.y===b)cible=null}}
   coch.forEach(c=>{if(c.parti){if(c.x>0){c.cd-=dt;if(c.cd<=0){c.cd=.15;c.x-=1;if(G[c.y][c.x]!==0){c.x=0}}}return}c.cd-=dt;if(c.cd<=0){c.cd=.8+rnd();const d=[[1,0],[-1,0],[0,1],[0,-1]][Math.floor(rnd()*4)];if(G[c.y+d[1]]&&G[c.y+d[1]][c.x+d[0]]===0&&!(c.x+d[0]===P.x&&c.y+d[1]===P.y)){c.x+=d[0];c.y+=d[1]}}});verif()}
  // dessin
  x.fillStyle='#000';x.fillRect(0,0,W,H);const fl=.85+.15*Math.sin(t/90)*Math.sin(t/37);
  for(let Y=0;Y<R;Y++)for(let X=0;X<C;X++){const k=X+','+Y,d=Math.hypot(X-P.x,Y-P.y);if(!vu.has(k))continue;const proche=d<3.2,l=proche?Math.max(.25,1-d/3.6)*fl:.16;
   if(G[Y][X]){x.fillStyle='rgba('+Math.round(92*l)+','+Math.round(80*l)+','+Math.round(66*l)+',1)';x.fillRect(X*cs,Y*cs,cs,cs)}else{x.fillStyle='rgba('+Math.round(48*l+8)+','+Math.round(40*l+6)+','+Math.round(30*l+5)+',1)';x.fillRect(X*cs,Y*cs,cs,cs)}}
  x.font=Math.round(cs*.8)+'px system-ui';x.textAlign='center';x.textBaseline='middle';
  fos.forEach(f=>{if(f.vue||(vu.has(f.x+','+f.y)&&Math.hypot(f.x-P.x,f.y-P.y)<1.6)){f.vue=1;x.fillStyle='#000';x.beginPath();x.ellipse((f.x+.5)*cs,(f.y+.5)*cs,cs*.42,cs*.3,0,0,7);x.fill();x.strokeStyle='#7a6a50';x.stroke()}});
  obj.forEach(o=>{if(!o.pris&&vu.has(o.x+','+o.y)&&Math.hypot(o.x-P.x,o.y-P.y)<3.3)x.fillText(o.ic,(o.x+.5)*cs,(o.y+.5)*cs)});
  coch.forEach(c=>{if(c.x<=0)return;if(Math.hypot(c.x-P.x,c.y-P.y)<3.3||c.parti)x.fillText('🐗',(c.x+.5)*cs,(c.y+.5)*cs)});
  x.fillStyle='rgba(255,190,90,.12)';x.beginPath();x.arc((P.x+.5)*cs,(P.y+.5)*cs,cs*3.2*fl,0,7);x.fill();x.fillText('🔥',(P.x+.5)*cs,(P.y+.5)*cs);
  x.fillStyle='#3a8';x.fillRect(0,ent.y*cs,cs*.25,cs);
  {const pc=Math.round(part()*100),nc=coch.filter(c=>!c.parti).length,i=el.querySelector('#c160i');i.innerHTML=(pc>=85?'✅':'👁')+' vu <b style="font-size:20px">'+pc+' %</b> / 85 · '+(nc?'🐗 '+nc:'✅ plus de cochons')+' · 🔥 '+Math.max(0,Math.round(huile))+' %';i.style.color=pc>=85&&!nc?'#7dff8a':'#f0c46a'}el.querySelector('#c160m').textContent=msg})(t0)}
// ----- la caverne sur la carte, et les camps qui y montent -----
function cavTex160(t,ok){const c=document.createElement('canvas');c.width=256;c.height=64;const x=c.getContext('2d');x.fillStyle=ok?'rgba(30,42,42,.9)':'rgba(40,30,20,.9)';x.strokeStyle=ok?'#e8be5a':'#a08a6a';x.lineWidth=3;x.beginPath();x.roundRect?x.roundRect(4,8,248,48,14):x.rect(4,8,248,48);x.fill();x.stroke();x.fillStyle='#f3e6c4';x.font='600 26px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText(t,128,33);return new THREE.CanvasTexture(c)}
setInterval(()=>{try{if(typeof scene==='undefined'||!S)return;const off=S.voieC||S.fin||(typeof VP!=='undefined'&&VP)||(typeof K!=='undefined'&&K);const C=S.cav97||{},OK=cavOk160();
 const cle=Object.keys(C).map(i=>i+(OK[i]?'s':'')).join(',')+'|'+(S.abri?1:0)+'|'+(S.cavC131||[]).join(',');if(cle!==CAV160.cle){CAV160.cle=cle;Object.values(CAV160.spr).forEach(s=>scene.remove(s));CAV160.spr={};
  Object.keys(C).forEach(i=>{const t=T[+i],s=new THREE.Sprite(new THREE.SpriteMaterial({map:cavTex160(OK[i]?'⛰ Caverne sûre':'🕳 Caverne à explorer',OK[i]),transparent:true,depthTest:false}));s.renderOrder=8;s.userData={t};scene.add(s);CAV160.spr[i]=s});
  if(CAV160.ln){scene.remove(CAV160.ln);CAV160.ln=null}const cv=cavSure160();if(S.abri&&cv!=null){const P=[],ct=T[cv];(S.cavC131||camps().map(c=>c.i)).forEach(ci=>{const c=T[ci];if(!c)return;for(let j=0;j<20;j++){const u0=j/20,u1=(j+.55)/20;[u0,u1].forEach(u=>{const xx=c.x+(ct.x-c.x)*u,zz=c.z+(ct.z-c.z)*u;P.push(xx,Math.max(0,alt(xx,zz))*VX+.07,zz)})}});
   const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));CAV160.ln=new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0xe8be5a,transparent:true,opacity:.8,depthTest:false}));CAV160.ln.renderOrder=7;scene.add(CAV160.ln)}}
 Object.values(CAV160.spr).forEach(s=>{const t=s.userData.t,sc=Math.max(.3,dist*.05);s.position.set(t.x,t.alt*VX+.3+sc*.4,t.z);s.scale.set(sc*3.2,sc*.8,1);s.visible=!off&&dist<45});if(CAV160.ln)CAV160.ln.visible=!off&&dist<45}catch(e){}},300);
// les réfugiés à l'entrée de la caverne
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(!S||!S.abri||S.voieC||dist>10||typeof mfPoser!=='function')return r;const cv=cavSure160();if(cv==null)return r;const t=T[cv],n=Math.min(9,3*((S.cavC131||camps()).length));const M=['femme_travail','vieux','homme_chemise','jeune_pagne','vieille','p6_enfant'];
  for(let i=0;i<n;i++){const a=i*2.4,rr=.12+(i%3)*.06,X=t.x+Math.cos(a)*rr,Z=t.z+Math.sin(a)*rr;mfPoser('cv160_'+i,M[i%M.length],X,Math.max(0,alt(X,Z))*VX+.01,Z,a+Math.PI,'repos_debout')}}catch(e){}return r}}
