// ===== p395 : chaque combattant se bat avec ce qu'il a. Le coup à distance (↓ puis avant + poing) n'est plus la même
// « boule » pour tous : un galet de rivière qu'on lance (la plupart), la sagaie (ceux qui en portent une), la balle du fusil
// ou du pistolet (ceux qui sont armés : chasseurs, miliciens, soldats, officiers), et la boule de feu seulement pour
// Grand Diab, qui sort des contes. Les enchaînements ne sont plus les mêmes pour tous : chacun reçoit ceux de son
// style de combat et de son arme. Le pied ouragan (Hurricane Kick) n'est plus le coup de pied sauté de tout le monde :
// c'est le super coup du kung-fu et du karaté. =====
function proj395(f){f=f||{};const a=((f.arme&&f.arme.n)||'').toLowerCase(),k=f.k||'';
 if(k==='grandiab'||f.sp==='brulure')return {k:'feu',n:'Boule de feu',v:440,d:14};
 if(/fusil|pistolet|baïonnette|crosse/.test(a)||f.sp==='tir'||f.sp2==='tir'||/bonaparte|gouverneur/i.test(f.n||''))return {k:'balle',n:/pistolet|bonaparte|gouverneur|officier|épée|sabre d/i.test(a+' '+(f.n||''))?'Coup de pistolet':'Coup de fusil',v:900,d:15};
 if(/sagaie|lance|hallebarde/.test(a))return {k:'sagaie',n:'Sagaie lancée',v:470,d:13};
 if(/gants|mains nues|poings|karaté|boxe|mma|savate/.test(a+' '+(f.n||'').toLowerCase())&&/champion|championne|colosse|boxeur|combattant|pompier|tireur/i.test(f.n||''))return {k:'galet',n:'Galet de la plage',v:430,d:10};
 return {k:'galet',n:'Galet de rivière',v:420,d:10}}
// l'aspect des projectiles en 3D (couleur, échelle de la petite sphère du duel)
const LOOK395={galet:{c:0x7d7a74,s:[.8,.7,.7]},balle:{c:0x2a2a2a,s:[.35,.35,.35]},sagaie:{c:0x7a5a30,s:[6,.22,.22]},feu:{c:0xff5a10,s:[1.4,1.4,1.4]}};
// et en 2D
function dessin395(x,p){if(!LOOK395[p.k])return false;x.save();
 if(p.k==='galet'){x.fillStyle='#8a867e';x.beginPath();x.ellipse(p.x,p.y,8,6,0,0,6.28);x.fill()}
 else if(p.k==='balle'){x.strokeStyle='rgba(255,230,160,.7)';x.lineWidth=2;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(p.x-Math.sign(p.v)*28,p.y);x.stroke();x.fillStyle='#333';x.beginPath();x.arc(p.x,p.y,3,0,6.28);x.fill()}
 else if(p.k==='sagaie'){x.strokeStyle='#7a5a30';x.lineWidth=4;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(p.x-Math.sign(p.v)*60,p.y);x.stroke();x.fillStyle='#bbb';x.beginPath();x.moveTo(p.x+Math.sign(p.v)*10,p.y);x.lineTo(p.x,p.y-4);x.lineTo(p.x,p.y+4);x.fill()}
 else {const g=x.createRadialGradient(p.x,p.y,2,p.x,p.y,16);g.addColorStop(0,'#fff2a0');g.addColorStop(.5,'#ff7a20');g.addColorStop(1,'rgba(255,60,0,0)');x.fillStyle=g;x.beginPath();x.arc(p.x,p.y,16,0,6.28);x.fill()}
 x.restore();return true}
// le pied ouragan devient un super coup ; le coup de pied sauté ordinaire est un coup de pied circulaire
try{MXBASE188.ka='Roundhouse_Kick';if(MXSTY188.kungfu)MXSTY188.kungfu.ka='Flip_Kick'}catch(e){}
try{Object.assign(SUP372,{kungfu:{n:'Pied de l’ouragan',k:'k3',d:30,po:190,clip:'mx:Hurricane_Kick'},karate:{n:'Pied tornade',k:'k3',d:28,po:190,clip:'mx:Hurricane_Kick'},
 muaythai:{n:'Genou volant',k:'k3',d:28,clip:'mx:Flying_Knee_Punch_Combo'},mma:{n:'Coup de pied de cage',k:'k3',d:28,clip:'mx:Mma_Kick'},canne:{n:'Brisé de la canne',k:'p3',d:26,clip:'mx:One_Hand_Club_Combo'}});
 SUP372.moraingy.clip='mx:Quad_Punch';SUP372.anglaise.clip='mx:Uppercut_Jab'}catch(e){}
// les coups propres aux styles qui n'en avaient pas
try{Object.assign(MV372,{karate:[{n:'Mae-geri',seq:'av,av',btn:'k',k:'k2',lourd:1,dx:30,cd:1.2},{n:'Gyaku-zuki',seq:'b,av',btn:'p',k:'p3',lourd:1,cd:1.3}],
 muaythai:[{n:'Teep',seq:'av,av',btn:'k',k:'k2',fx:{recul:90},cd:1.3},{n:'Coude retourné',seq:'b,ar',btn:'p',k:'p3',lourd:1,tour:1,cd:1.5,clip:'mx:Punch_To_Elbow_Combo'}],
 mma:[{n:'Amenée au sol',seq:'av,av',btn:'p',k:'p3',lourd:1,dx:60,cd:1.6,fx:{chute:1},clip:'mx:Grab_And_Slam'},{n:'Low kick',seq:'b,av',btn:'k',k:'bal',lourd:1,cd:1.3}],
 canne:[{n:'Coup de tête de canne',seq:'av,av',btn:'p',k:'p3',lourd:1,dx:40,cd:1.3},{n:'Croisé bas',seq:'b,ar',btn:'p',k:'bal',lourd:1,cd:1.4}]})}catch(e){}
// les enchaînements : un par style, un par arme, avec des suites différentes
const CHS395={savate:{n:'Chassé-fouetté',ch:'k1,k2,av+k3',k:'k3',d:20,fx:{recul:100},clip:'mx:Roundhouse_Kick'},
 anglaise:{n:'Une-deux-crochet',ch:'p1,p1,p2,av+p3',k:'p3',d:21,fx:{etourdi:.7},clip:'mx:Quad_Punch'},
 muaythai:{n:'Genoux et uppercut',ch:'p2,k1,av+k2',k:'up',d:21,fx:{chute:1},clip:'mx:Knee_Jabs_To_Uppercut'},
 karate:{n:'Kizami, gyaku, mawashi',ch:'p1,p2,av+k3',k:'k3',d:20,fx:{recul:90},clip:'mx:Roundhouse_Kick'},
 mma:{n:'Coude au corps',ch:'p2,k2,av+p3',k:'p3',d:21,fx:{etourdi:.6},clip:'mx:Punch_To_Elbow_Combo'},
 moraingy:{n:'Pluie de poings',ch:'p1,p1,p1,av+p3',k:'p3',d:22,fx:{recul:80},clip:'mx:Quad_Punch'},
 kalari:{n:'Saut du paon',ch:'k1,p1,h+k3',k:'k3',d:21,fx:{chute:1},clip:'mx:Flip_Kick'},
 kungfu:{n:'Les cinq animaux',ch:'p1,k1,p1,av+k3',k:'k3',d:22,fx:{chute:1},clip:'mx:Roll_Kicking'},
 escrime:{n:'Une-deux en marchant',ch:'p1,p2,av+p3',k:'p3',d:20,fx:{etourdi:.6},clip:'mx:Standing_Torch_Melee_Attack_Stab'},
 varma:{n:'Les trois points',ch:'p1,p1,ar+p2',k:'var',d:16,fx:{lent:2},clip:''},
 canne:{n:'Brisé latéral',ch:'p2,p2,ar+p3',k:'p3',d:20,fx:{etourdi:.6},clip:'mx:One_Hand_Club_Combo'},
 _:{n:'La rage du quartier',ch:'p1,k1,av+p3',k:'p3',d:18,fx:{recul:70},clip:'mx:Headbutt'}};
const CHA395=[[/fusil|baïonnette|crosse/,{n:'Coup de crosse',ch:'p2,p1,av+p3',k:'p3',d:20,fx:{recul:90},clip:'mx:Bayonet_Stab'}],
 [/sabre|épée|coutelas|dague|machette/,{n:'Taille en croix',ch:'p2,p1,av+p2',k:'p3',d:21,fx:{etourdi:.6},clip:'mx:Stable_Sword_Outward_Slash'}],
 [/hache|fourche|hallebarde|barre/,{n:'Coup de bûcheron',ch:'p1,p2,b+p3',k:'p3',d:23,lourd:1,fx:{chute:1},clip:'mx:Axe_Downward'}],
 [/bâton|canne|gourdin|baguette/,{n:'Moulinet du bâton',ch:'p1,k1,av+p2',k:'ret',d:19,fx:{chute:1},clip:'mx:Two_Hand_Club_Combo'}],
 [/sagaie|lance/,{n:'Sagaie plantée',ch:'p2,k1,av+p3',k:'p3',d:20,fx:{recul:100},clip:'mx:Bayonet_Stab'}],
 [/griffe/,{n:'Griffes des ravines',ch:'p1,p1,ar+p3',k:'p3',d:19,fx:{poison:3},clip:'mx:Grab_And_Slam'}],
 [/serviette/,{n:'Le coup de la serviette',ch:'p1,k1,ar+p2',k:'p2',d:14,fx:{aveugle:1.5},clip:''}],
 [/poing|gant|main|bras/,{n:'Corps à corps',ch:'p1,k2,av+p3',k:'up',d:20,fx:{chute:1},clip:'mx:Uppercut_Jab'}]];
function chaines395(f){if(!f)return [];const L=[],st=f.st||'_',a=((f.arme&&f.arme.n)||'').toLowerCase();
 const s=CHS395[st]||CHS395._;L.push(Object.assign({cd:2.6,lourd:1},s));
 const w=CHA395.find(([re])=>re.test(a));if(w&&w[1].ch!==s.ch)L.push(Object.assign({cd:2.8,lourd:1},w[1]));
 return L.map(m=>{const o={...m};if(!o.clip)delete o.clip;return o})}
function chainesTous395(){try{Object.keys(DUE.F).forEach(k=>{const f=DUE.F[k];if(!f||f.chains)return;const base=(typeof CH372!=='undefined'&&CH372[k])||[];
  const neuf=chaines395(f).filter(m=>!base.some(b=>b.ch===m.ch));if(neuf.length)f.chains=base.concat(neuf)})}catch(e){}}
chainesTous395();setTimeout(chainesTous395,3000);
// les mouvements captés des enchaînements, des supers et du tir sont chargés avec le combattant
{const m0=mx188Ajoute;mx188Ajoute=function(o,f){const r=m0.apply(this,arguments);try{if(typeof MX186==='undefined'||!o||!o.g)return r;chainesTous395();
  const L=[...((f&&f.chains)||[]),(f&&!f.sup&&SUP372[f.st])||{}];if(proj395(f).k==='balle')L.push({clip:'mx:Firing_Rifle'});
  const repos=[];o.g.scene.traverse(b=>{if(b.isBone)repos.push([b,b.quaternion.clone(),b.position.clone()])});
  L.forEach(mv=>{const n=mv&&mv.clip;if(!n||!/^mx:/.test(n)||o.clips.find(x=>x.name===n))return;const c=mxDec188(n.slice(3));if(!c)return;const cl=mxRecible(o.g.scene,c,{nom:n,surPlace:true,repos});if(cl)o.clips.push(cl)})}catch(e){}return r}}
// ===== la difficulté monte dans un tournoi : chaque adversaire est plus vif que le précédent, et les tournois suivants plus durs
// (Hauts du Sud < Saint-Denis < océan Indien < champions < boss). Plus vif = l'adversaire attaque et pare plus souvent,
// et il a un peu plus de vie. =====
const RANG395={sud:0,ville:1,ocean:2,champ:3,boss:4};
function dif395(z,n){return 1+.12*(RANG395[z]!=null?RANG395[z]:2)+.15*(n||0)}
{const o0=window.ouvrirDuel;window.ouvrirDuel=ouvrirDuel=function(mk,lk,fin){const D=window.DIF395||1;let rest=null;
 try{if(D>1&&mk!==lk&&DUE.F[lk]){const f0=DUE.F[lk];DUE.F[lk]=Object.assign({},f0,{pv:Math.round(f0.pv*(1+.6*(D-1)))});rest=()=>{DUE.F[lk]=f0}}}catch(e){}
 const fin2=r=>{window.DIF395=0;try{rest&&rest()}catch(e){}return fin&&fin(r)};
 try{return o0.call(this,mk,lk,fin2)}catch(e){window.DIF395=0;try{rest&&rest()}catch(x){}throw e}}}
// ===== choisir son combattant parmi tous ceux qu'on a déjà : les combattants des tournois de base, les songes débloqués,
// les héros qu'on a incarnés jusqu'au bout, les champions (tournoi des champions gagné) et les boss débloqués.
// Les adversaires restent ceux de la zone. =====
function dispo395(){const S0=new Set();const ok=k=>{if(DUE.F[k])S0.add(k)};
 try{['sud','ville','ocean'].forEach(z=>{const Z=TOURN186[z];(Z.L0||Z.L).forEach(ok)})}catch(e){}
 try{PERS277.forEach(p=>{if(debloque277(p.k))ok(p.k)})}catch(e){}
 try{const H=HER389.lire();Object.keys(H).forEach(h=>{if(DUEK389[h])ok(DUEK389[h])})}catch(e){}
 try{const P=PALM186.lire();if(P.champ&&Object.keys(P.champ).length)TOURN186.champ.L.forEach(ok)}catch(e){}
 try{BOSS277.forEach(([k])=>{if(bossOk277(k))ok(k)})}catch(e){}
 try{BOSS278.forEach(b=>{if(bossOk278(b))ok(b.k)})}catch(e){}
 return [...S0]}
{const t0=tournoi186;tournoi186=function(z){const r=t0.apply(this,arguments);try{const e=$('ecran'),B=[...e.querySelectorAll('[data-t186]')];if(!B.length)return r;
  const deja=new Set(B.map(b=>b.dataset.t186)),X=dispo395().filter(k=>!deja.has(k));
  const d=document.createElement('div');let h='<p class="note" style="margin:10px 0 4px">Difficulté : '+'★'.repeat(1+(RANG395[z]!=null?RANG395[z]:2))+' — chaque adversaire est plus fort que le précédent.</p>';
  if(X.length)h+='<p class="note" style="margin:10px 0 4px"><b>Ou un autre de vos combattants</b> (il affronte ceux de la zone)</p>'+X.map(k=>{const f=DUE.F[k];return '<button class="bt sec" style="display:block;width:100%;text-align:left;margin:6px 0" data-x395="'+k+'"><b>'+f.n+'</b>'+(f.st&&DUE.STY&&DUE.STY[f.st]?' <small>· '+DUE.STY[f.st]+'</small>':'')+'</button>'}).join('');
  d.innerHTML=h;B[B.length-1].after(d);
  d.querySelectorAll('[data-x395]').forEach(b=>b.onclick=()=>{const src=B[0];src.dataset.t186=b.dataset.x395;src.click()})}catch(x){console.warn(x)}return r}}
// ===== les pouvoirs mystiques ne se ressemblent plus d'un personnage à l'autre. Avant, « Tisane des Hauts », « Gourde de rhum »
// et « Le chirurgien » faisaient exactement la même chose (rendre 15 points de vie). Chaque pouvoir garde son type, mais son nom
// décide de sa façon d'agir : la tisane soigne lentement, le rhum soigne vite mais fait tituber, la prière lave des maux,
// le regard ralentit au lieu d'étourdir, la loi du roi empêche l'autre d'utiliser ses pouvoirs, le pistolet tire vite et léger,
// le mousquet lourd et lent, la batterie de Bonaparte tire trois boulets… (les pouvoirs fabriqués dans la Forge passent avant). =====
const VAR395={
 soin:[[/rhum|gorgée|sirop|gourde|ration/,'rhum'],[/tisane|herbes|plantes|huile|thé|ginseng|citron|ody|talisman|kayamb|yoga/,'lent'],[/prière|lampe|cantique|aumône|cultes|veille|héva|liberté/,'lave'],[/boire la force/,'draine'],[/chirurgien|secours|coin du ring|garde|contrôle|mouchoir|protéine/,'force']],
 peur:[[/regard/,'regard'],[/loi|décret|ordre|au nom du roi|coup d’état|coup d'état/,'loi'],[/malédiction|sort|chiens|razana|cratère|ancêtres|kal/,'maudit'],[/sol qui tremble/,'seisme'],[/pose|miroir/,'pose'],[/cri|rire|voix|wai kru|cherche|colère/,'cri']],
 aveugle:[[/brouillard|nuit|nuage|fumée|camphre|bougainvillier/,'nuit'],[/lumière/,'eclair'],[/cendre|poudre|poussière|poignée/,'cendre']],
 vent:[[/fumée du volcan|souffle du volcan/,'volcan'],[/ginga|moulinet|paume du vent/,'pare'],[/cantique|foule|roulèr|remparts|sommets|vayu/,'chant'],[/souffle/,'souffle']],
 bond:[[/fuite|pas de côté|volte|roue|aú|provocation|pas de danse|revers/,'fuite'],[/arcole|envol|falaise/,'pardessus'],[/saut|bond|genou|chassé|séga|course/,'saut']],
 coup:[[/crosse|charge|baïonnette|masse|hampe|pioche/,'recul'],[/amenée|roi|rempart|brisé/,'chute'],[/coude|claque|crochet|droite|fouetté|low-kick|canne/,'sonne']],
 tir:[[/batterie/,'salve'],[/boule de feu/,'feu'],[/mousquet|fusil/,'lourd'],[/pistolet/,'leger']]};
function var395(sp,nom){const L=VAR395[sp];if(!L)return null;const n=(nom||'').toLowerCase();const v=L.find(([re])=>re.test(n));return v?v[1]:null}
{const p0=typeof pouvPerso366==='function'?pouvPerso366:null;window.pouvPerso366=pouvPerso366=function(sp,a,b,G,nom,dire,SOL){
 try{if(p0&&p0.apply(this,arguments))return true}catch(e){}
 const v=var395(sp,nom);if(!v)return false;const W=innerWidth,fin=()=>G.fini||G.ph==='ko',mv=fx=>{a.mv372={k:'j',fx};clearTimeout(a.mvT372);a.mvT372=setTimeout(()=>{a.mv372=null},900)};
 const lave=c=>{c.stun=0;c.aveugle=0;c.poison=0;c.lent=0;c.brule=0};
 switch(sp+':'+v){
  case 'soin:rhum':a.pv=Math.min(a.f.pv,a.pv+20);a.lent=Math.max(a.lent||0,2);dire(nom+' : '+a.f.n+' reprend vite des forces… mais titube un peu.',1400);return true;
  case 'soin:lent':{let n=0;const T=setInterval(()=>{if(fin()||++n>6){clearInterval(T);return}a.pv=Math.min(a.f.pv,a.pv+4)},800);dire(nom+' : les forces reviennent doucement.',1400);return true}
  case 'soin:lave':a.pv=Math.min(a.f.pv,a.pv+9);lave(a);dire(nom+' : '+a.f.n+' est lavé de ses maux.',1400);return true;
  case 'soin:draine':{const q=Math.min(12,b.pv-1);b.pv-=q;a.pv=Math.min(a.f.pv,a.pv+q);dire(nom+' : la force de '+b.f.n+' passe à '+a.f.n+'.',1400);return true}
  case 'soin:force':a.pv=Math.min(a.f.pv,a.pv+11);a.sg372=Math.min(100,(a.sg372||0)+30);dire(nom+' : '+a.f.n+' se reprend, et sa jauge monte.',1400);return true;
  case 'peur:cri':b.stun=1;b.pv-=5;if(!b.garde)b.x+=a.s*90;dire(nom+' ! '+b.f.n+' recule.',1000);return true;
  case 'peur:regard':b.lent=Math.max(b.lent||0,3.5);b.pv-=4;dire(nom+' : '+b.f.n+' hésite, chaque geste lui pèse.',1400);return true;
  case 'peur:loi':Object.keys(b.cds).forEach(k=>{if(!/^[mc]/.test(k))b.cds[k]=Math.max(b.cds[k]||0,6)});['tir','peur','soin','vent','bond','aveugle','coup','chien','chienM','plante','brulure','sagaie'].forEach(k=>{b.cds[k]=Math.max(b.cds[k]||0,6)});b.pv-=3;dire(nom+' : '+b.f.n+' ne peut plus user de ses pouvoirs pendant 6 s.',1600);return true;
  case 'peur:maudit':b.poison=Math.max(b.poison||0,4);b.stun=Math.max(b.stun||0,.5);dire(nom+' : '+b.f.n+' sent le mal le ronger.',1400);return true;
  case 'peur:seisme':if(!b.garde||b.y<=0){b.down=Math.max(b.down||0,.9);b.nD=(b.nD||0)+1}b.pv-=6;dire(nom+' : '+b.f.n+' tombe.',1200);return true;
  case 'peur:pose':a.sg372=Math.min(100,(a.sg372||0)+40);b.stun=.4;dire(nom+' : '+a.f.n+' se gonfle, sa jauge monte.',1300);return true;
  case 'aveugle:nuit':b.aveugle=4.5;G.nuage={x:b.x,t:1};dire(nom+' : '+b.f.n+' ne voit plus rien pour un long moment.',1600);return true;
  case 'aveugle:eclair':b.aveugle=2;b.stun=.8;G.nuage={x:b.x,t:.6};dire(nom+' : '+b.f.n+' est ébloui.',1300);return true;
  case 'aveugle:cendre':b.aveugle=2.5;b.stun=.3;G.nuage={x:b.x,t:1};dire(nom+' : en plein visage !',1200);return true;
  case 'vent:souffle':if(!b.garde)b.x=Math.max(30,Math.min(W-30,b.x+a.s*150));b.lent=2;G.vent={t:1.4,x:b.x,s:a.s};dire(nom+' : '+b.f.n+' est repoussé.',1300);return true;
  case 'vent:pare':{const n=G.proj.filter(p=>p.o!==a).length;G.proj=G.proj.filter(p=>p.o===a);b.lent=3;G.vent={t:1,x:a.x,s:a.s};dire(nom+(n?' : le projectile est détourné.':' : '+b.f.n+' est gêné.'),1300);return true}
  case 'vent:chant':b.lent=4;a.sg372=Math.min(100,(a.sg372||0)+20);G.vent={t:1.6,x:b.x,s:a.s};dire(nom+' : '+a.f.n+' se porte, '+b.f.n+' s’alourdit.',1400);return true;
  case 'vent:volcan':b.lent=3;b.brule=2;b.bruleD=3;G.vent={t:1.4,x:b.x,s:a.s};dire(nom+' : chaleur et cendre.',1300);return true;
  case 'bond:saut':a.x=Math.max(30,Math.min(W-30,b.x-a.s*75));a.cd=0;a.act=null;mv({chute:1});a.lourd=1;frappe395(a,b,'k3');dire(nom+' !',900);return true;
  case 'bond:fuite':a.x=Math.max(30,Math.min(W-30,a.x-a.s*170));a.pv=Math.min(a.f.pv,a.pv+6);a.stun=0;dire(nom+' : '+a.f.n+' se dégage.',1100);return true;
  case 'bond:pardessus':a.x=Math.max(30,Math.min(W-30,b.x+a.s*90));b.stun=Math.max(b.stun||0,.5);dire(nom+' : '+a.f.n+' passe par-dessus.',1100);return true;
  case 'coup:recul':mv({recul:130});a.lourd=1;frappe395(a,b,'p3');return true;
  case 'coup:chute':mv({chute:1});a.lourd=1;frappe395(a,b,'p3');return true;
  case 'coup:sonne':mv({etourdi:.7});a.lourd=1;frappe395(a,b,'p3');return true;
  case 'tir:salve':for(let i=0;i<3;i++)G.proj.push({x:a.x+a.s*40,y:SOL()-a.y-60-i*16,v:a.s*(560+i*60),o:a,d:8,k:'balle'});a.cds.tir=6;dire(nom+' : trois coups !',1100);return true;
  case 'tir:feu':G.proj.push({x:a.x+a.s*40,y:SOL()-a.y-70,v:a.s*400,o:a,d:12,k:'feu',fx:{brule:3}});return true;
  case 'tir:lourd':G.proj.push({x:a.x+a.s*40,y:SOL()-a.y-60,v:a.s*560,o:a,d:17,k:'balle'});a.cds.tir=4.2;return true;
  case 'tir:leger':G.proj.push({x:a.x+a.s*40,y:SOL()-a.y-60,v:a.s*820,o:a,d:10,k:'balle'});a.cds.tir=2.2;return true}
 return false}}
// frappe est interne au duel : on passe par le pouvoir « coup » d'origine (qui appelle frappe) en le signalant au duel
function frappe395(a,b,k){try{const D=window.DUEL_EN;if(D&&D.frappe){a.cd=0;a.act=null;a.buf=null;return D.frappe(a,b,k)}}catch(e){}}
