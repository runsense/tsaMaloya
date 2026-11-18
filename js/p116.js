
// ===== p116 : le bois de l'île mis en relief — tamarin des Hauts, tamarinier des Bas, filao, bois de couleurs =====
// Archives : tamarin des Hauts (Acacia heterophylla) endémique, venu de Hawaï avec les oiseaux marins il y a des centaines de milliers d'années,
// « chêne de Bourbon » des ébénistes ; tamarinier (Tamarindus indica) attesté dès 1701, venu de l'Inde ; filao (Casuarina equisetifolia)
// introduit de Madagascar en 1768 par l'abbé Rochon pour tenir les dunes de Saint-Paul, bois de chauffe des locomotives.
const BOIS116={
 tamH:{n:'Tamarin des Hauts',ic:'🌳',d:'Endémique. « Chêne de Bourbon » : bois brun-rouge veiné, le bois des ébénistes.'},
 tamB:{n:'Tamarinier des Bas',ic:'🌴',d:'Venu de l’Inde (attesté en 1701). Bois très dur : manches d’outils, charronnage. Ses gousses vont en cuisine.'},
 filao:{n:'Filao',ic:'🌲',d:'Venu de Madagascar en 1768 pour tenir les dunes. « Bois de fer » : chauffe, charbon, poteaux, bardeaux.'},
 coul:{n:'Bois de couleurs',ic:'🪵',d:'Les forêts des Hauts et de l’Est : natte, benjoin, bois de pomme. Charpente et cases.'}};
function boisIci116(t){if(!t||t.bare)return [];const L=[],b=t.biome||'',y=S?S.year:1663,sv=typeof sousVent==='function'&&sousVent(t);
 if(t.alt>1000||/tamarins/.test(b))L.push('tamH');if(t.alt<400&&/Savane/.test(b)&&y>=1701)L.push('tamB');if(t.alt<260&&sv&&(y>=1768||(S&&S.done&&S.done.filao)))L.push('filao');if(/Bois de couleurs|humide/.test(b)||(t.alt>300&&t.alt<1100&&!sv))L.push('coul');return L}
// les arbres eux-mêmes, dans le détail des lieux : le filao en aiguilles sur les plages de l'Ouest, le tamarinier en boule près des villes
function p116Mods(){if(MOD.filao||typeof p23Mod!=='function')return;const TR=TR23,cy=(a,b,h,n=6)=>new THREE.CylinderGeometry(a,b,h,n),co=(r,h,n=7)=>new THREE.ConeGeometry(r,h,n),sp=r=>new THREE.IcosahedronGeometry(r,1);
 p23Mod('filao',[[cy(.012,.02,.36),0x6a5440,TR(0,.18,0,0,0,.05)],[co(.09,.2),0x4a6a48,TR(.01,.3,0)],[co(.075,.18),0x52745a,TR(.02,.4,0)],[co(.05,.14),0x5a7c60,TR(.02,.48,0)]],260);
 p23Mod('tamarinier',[[cy(.024,.034,.18),0x4a3a2a,TR(0,.09,0)],[sp(.16),0x3f6a2e,TR(0,.27,0,0,0,0,1.25,.85,1.2)],[sp(.11),0x4c7a36,TR(.08,.3,.04,0,0,0,1,.8,1)]],160)}
{const rl=remplirLieu;remplirLieu=function(){const r=rl.apply(this,arguments);try{const t=lieu;if(!t||t.bare||!S)return r;p116Mods();if(!MOD.filao)return r;const B=boisIci116(t),hC=new THREE.Color(1,1,1);
 const cou=(k,s)=>{const a=rndH(k*s+t.i)*6.283,d=Math.sqrt(rndH(k*s+7))*3.15;return [t.x+Math.cos(a)*d,t.z+Math.sin(a)*d,a]};const o=S.t[t.i]||{},ra=o.b==='camp'?1.3:0;
 const pose=(m,n,s,f,sc)=>{for(let k=0;k<n;k++){const [x,z,a]=cou(k,s),h=alt(x,z);if(!f(h)||Math.hypot(x-t.x,z-t.z)<ra)continue;const v=.85+rndH(k+3)*.3;hC.setRGB(v,v,v);poseM(m,x,h*VX+.03,z,a,0,0,(.8+rndH(k+9)*.5)*sc,hC)}};
 if(B.includes('filao'))pose(MOD.filao,320,11.3,h=>h>1&&h<75,1);if(B.includes('tamB'))pose(MOD.tamarinier,22,12.7,h=>h>3,1.1)}catch(e){}return r}}
// une carte « Le bois d'ici » en ouvrant un lieu (une fois par lieu ouvert)
const BC116={i:null};
setInterval(()=>{try{let d=$('bois116');if(!S||!lieu||(typeof K!=='undefined'&&K)){BC116.i=null;if(d)d.remove();return}if(BC116.i===lieu.i)return;BC116.i=lieu.i;S.boisVu116=S.boisVu116||{};const B=boisIci116(lieu).filter(k=>!S.boisVu116[k]);if(d)d.remove();if(!B.length)return;B.forEach(k=>S.boisVu116[k]=1);
 d=document.createElement('div');d.id='bois116';d.innerHTML='<small>Le bois d’ici</small>'+B.map(k=>'<div><b>'+BOIS116[k].ic+' '+BOIS116[k].n+'</b><span>'+BOIS116[k].d+'</span></div>').join('');d.onclick=()=>d.remove();document.body.appendChild(d);setTimeout(()=>{if(d.isConnected)d.remove()},10000)}catch(e){}},800);
// le bois récolté garde son essence : un petit compte par essence, selon où l'on coupe
setInterval(()=>{try{if(!S||S.fin||!S.res||(typeof K!=='undefined'&&K))return;const b=S.res.bois||0;if(S.bois116L==null){S.bois116L=b;return}const d=b-S.bois116L;S.bois116L=b;if(d<=0)return;const c=camps()[0];if(!c)return;
 const near=T.filter(t=>hd(t,c)<=2);const B=[...new Set(near.flatMap(boisIci116))];if(!B.length)return;S.bois116=S.bois116||{};const k=B.includes('tamH')&&!S.voieC?'tamH':B[Math.floor(rnd()*B.length)];S.bois116[k]=(S.bois116[k]||0)+d}catch(e){}},1500);
// l'infobulle du bois : de quelles essences il est fait
setInterval(()=>{try{if(!S||!S.bois116)return;document.querySelectorAll('.stat,.pill,[data-bulle]').forEach(el=>{if(!/^\s*(BOIS|Bois)/.test(el.textContent||''))return;const t='Votre bois : '+Object.entries(S.bois116).filter(([k,v])=>v>0).map(([k,v])=>BOIS116[k].n+' '+Math.round(v)).join(', ');if(el.title!==t)el.title=t})}catch(e){}},3000);
// l'ébénisterie : le tamarin des Hauts devient meubles (colons) ou objets sacrés (marrons)
{const a0=actions;actions=function(t){const A=a0(t);try{if(S&&!modeHist()&&(S.t[t.i]||{}).b==='camp'&&(S.bois116||{}).tamH>=3&&!A.find(a=>a.id==='eben116'))A.push({id:'eben116',n:S.voieC?'🪑 Faire des meubles en tamarin des Hauts':'🪵 Sculpter le tamarin des Hauts',c:1,d:S.voieC?'Trois bois de tamarin deviennent une commode et des chaises : on les vend aux navires. Colonie +3, vivres +2.':'Trois bois de tamarin deviennent des tambours, des bâtons et des figures des ancêtres. Mystique +2, cohésion +1.'})}catch(e){}return A}}
{const g0=agir;agir=function(t,id,l){if(id!=='eben116')return g0.apply(this,arguments);if(!l){if(S.bras<1)return false;snap();S.bras-=1}S.bois116.tamH-=3;S.res.bois=Math.max(0,(S.res.bois||0)-3);S.bois116L=S.res.bois;if(S.voieC){fx({ami:3});S.vivres+=2;log('Un ébéniste fait une commode en tamarin des Hauts : elle part avec le prochain navire.')}else{fx({myst:2,coh:1});log('On sculpte le tamarin des Hauts : un tambour et des figures des ancêtres.')}try{sauve();panneau();rafraichir()}catch(e){}return true}}
// les récits
EV.filao=Object.assign(EV.filao||{},{y:1768,an:'1768',t:'Les filaos de l’abbé Rochon',b:'L’abbé Rochon rapporte de Madagascar un arbre venu d’Océanie et d’Asie : le filao. On le plante sur les dunes de Saint-Paul pour tenir le sable que le vent emporte. Son bois est si dur qu’on l’appelle « bois de fer ».',
 v:'Aujourd’hui, le bruit du vent dans les filaos est celui des plages de l’Ouest.',h:'Archive : introduit en 1768 depuis Madagascar par l’abbé Alexis-Marie de Rochon. Plus tard, son bois chauffe les locomotives du chemin de fer.'});
Object.assign(EV,{
 tamB1701:{y:1701,si:()=>S,tag:'Archive',an:'1701',t:'Le tamarinier',b:'Un arbre venu de l’Inde pousse près des cases des Bas : le tamarinier. Ses gousses acides vont dans le cari et le rougail ; son bois, très dur, fait des manches d’outils et des moyeux de roue.',
  v:'Le « tamarin pays » des Bas, à ne pas confondre avec le tamarin des Hauts.',h:'Archive : présence attestée dès 1701. Originaire d’Afrique de l’Est, il est venu par l’Inde (tamr hindi, « datte de l’Inde »).',
  o:[{n:'En planter près des cases',d:'Vivres +2.',fx:{vivres:2},hist:1}]},
 tamH1730:{y:1730,si:()=>S,tag:'Archive',an:'XVIIIᵉ siècle',t:'Le chêne de Bourbon',get b(){return S.voieC?'Dans les Hauts, de grands arbres penchés au bois brun-rouge veiné : les tamarins. Les charpentiers de la colonie en font des meubles, des escaliers, des coffres : on l’appelle le chêne de Bourbon.':'Autour du camp, les grands tamarins penchés abritent du vent. Leur bois rouge fait les tambours et les bâtons des anciens.'},
  v:'Un arbre qui n’existe qu’ici.',h:'Archive : Acacia heterophylla, endémique de La Réunion. Les chercheurs pensent que ses graines sont venues de Hawaï, portées par des oiseaux marins, il y a plusieurs centaines de milliers d’années ; son cousin hawaïen est le koa.',
  get o(){return S.voieC?[{n:'Ouvrir un atelier d’ébéniste',d:'Colonie +3, bois −2.',fx:{ami:3},f:()=>{S.res.bois=Math.max(0,S.res.bois-2)},hist:1},{n:'Ménager la forêt',d:'Forêt +2.',fx:{foret:2}}]:[{n:'Garder les grands tamarins',d:'Mystique +2.',fx:{myst:2},hist:1}]}},
 mythTam:{y:1760,si:()=>S&&!S.voieC&&(S.myst||0)>=8,tag:'Mythe',an:'récit des Hauts',nat:'Mythe créé pour le jeu, à partir de l’origine réelle du tamarin des Hauts.',t:'L’arbre venu par les oiseaux',
  b:'Les anciens disent que le tamarin n’a été planté par personne : un grand oiseau de mer l’a apporté de l’autre côté de l’océan, d’une île de feu comme la nôtre. C’est pour cela qu’il penche : il regarde encore vers chez lui. Celui qui dort sous un tamarin rêve du chemin des oiseaux.',
  v:'Un mythe qui rejoint la science.',o:[{n:'Dormir sous le grand tamarin',d:'Mystique +3.',fx:{myst:3},hist:1}]}
});
{const st=document.createElement('style');st.textContent='#bois116{position:fixed;left:12px;top:46%;z-index:80;max-width:300px;background:rgba(30,25,18,.93);color:#f0e6d0;border:1px solid #8a6a40;border-left:5px solid #a0703a;border-radius:8px;padding:8px 12px;font:12px/1.4 system-ui;cursor:pointer}#bois116 small{color:#e0b070;letter-spacing:.06em;text-transform:uppercase;font-size:10px}#bois116 div{margin-top:5px}#bois116 b{display:block;font-size:13px}#bois116 span{opacity:.85}';document.head.appendChild(st)}
