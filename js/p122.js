
// ===== p122 : le rhum de l'île (fangourin, arack, mélasse, Ferme des Guildives, pur jus) ; les cartes du conte ne se doublent plus ;
// le film de la reconnaissance suit le groupe ; les onglets grossissent au survol ; chez les colons, des sages et pas de feu au milieu =====
// Archives : un alambic attesté en 1704 ; le fangourin, vin de canne, doit son nom au moulin qui écrase la canne ; l'arack (guildive)
// a mauvaise réputation auprès des voyageurs ; Decaen interdit l'arack à Bourbon en 1807, Farquhar lève l'interdiction ;
// première distillerie moderne attribuée à Charles Panon-Desbassayns en 1815 ; Ferme des Guildives (1818), monopole du rhum et de l'arack ;
// aujourd'hui, les distilleries de l'île font du rhum de mélasse et du rhum de pur jus. Côté marron : fiction du jeu sur ces réalités.
const HD122=()=>typeof modeHist==='function'&&modeHist();

// ----- 1. Le rhum de l'île -----
Object.assign(EV,{
 rh1704:{y:1704,si:()=>HD122()&&S.voieC,tag:'Archive',an:'1704',t:'Le premier alambic',
  b:'Sur une habitation des bas, on monte un alambic : le premier dont l’île garde la trace. Jusque-là, on buvait le fangourin, un vin de canne : le jus écrasé au moulin à bras, celui qui lui a donné son nom, puis laissé fermenter quelques jours. Chauffé dans l’alambic, ce vin donne une eau-de-vie forte, qu’on appelle arack ou guildive.',
  v:'Plus forte que le fangourin, l’arack a mauvaise réputation : les voyageurs de passage décrivent ses ravages sur la santé des habitants.',
  h:'Archive : un alambic est attesté à Bourbon en 1704. Le fangourin, vin de canne fermenté, tire son nom du moulin qui écrase la canne ; l’arack, ou guildive, est le jus fermenté passé à l’alambic.',
  o:[{n:'Distiller pour l’habitation',d:'Vivres +2, cohésion +1, santé −1.',fx:{vivres:2,coh:1,sante:-1}},{n:'S’en tenir au fangourin',d:'Santé +1.',fx:{sante:1}}]},
 rh1807:{y:1807,si:()=>HD122()&&S.voieC,tag:'Archive',an:'1807',t:'L’arack interdit',
  b:'Le capitaine général Decaen interdit la fabrication de l’arack à Bourbon. Les alambics de l’île doivent se taire.',
  v:'Trois ans plus tard, les Anglais prennent l’île ; leur gouverneur, Farquhar, lève l’interdiction.',
  h:'Archive : la fabrication de l’arack est interdite à Bourbon par Decaen en 1807 ; l’édit est abrogé par le gouverneur britannique Farquhar.',
  o:[{n:'Éteindre l’alambic',d:'Cohésion +1.',fx:{coh:1}},{n:'Le cacher au fond de la ravine',d:'Vivres +2, colonie −2.',fx:{vivres:2,ami:-2}}]},
 rh1815:{y:1815,si:()=>HD122()&&S.voieC,tag:'Archive',an:'1815',t:'Le rhum de mélasse',
  b:'Charles Panon-Desbassayns, fils de Madame Desbassayns, fonde la première distillerie moderne de l’île, quand commence le temps du sucre. Le jus de la canne part désormais aux chaudières ; ce que l’on distille, c’est ce qui reste au fond, le sirop noir de la mélasse. Le pur jus des premiers temps devient rare.',
  v:'Le rhum de mélasse devient pour longtemps le rhum de l’île. Il est fait, comme le sucre, du travail des esclaves.',
  h:'Archive : la première distillerie moderne de Bourbon est attribuée à Charles Panon-Desbassayns, en 1815, au début de la production sucrière.',
  o:[{n:'Envoyer la mélasse à la distillerie',d:'Colonie +3, vivres +2.',fx:{ami:3,vivres:2}}]},
 rh1818:{y:1818,si:()=>HD122()&&S.voieC,tag:'Archive',an:'1818',t:'La Ferme des Guildives',
  b:'Une société reçoit le droit, et elle seule, de fabriquer le rhum et l’arack, de les vendre en gros comme au détail, et de les faire entrer dans l’île : la Ferme des Guildives. Le petit alambic de l’habitant devient hors-la-loi.',
  v:'Le rhum passe aux mains de quelques-uns ; les gros planteurs n’ont plus de petits concurrents.',
  h:'Archive : la Ferme des Guildives est créée en 1818, avec l’exclusivité de la fabrication et de la vente des rhums et de l’arack.',
  o:[{n:'Vendre sa mélasse à la Ferme',d:'Colonie +2.',fx:{ami:2}},{n:'Garder un alambic caché',d:'Vivres +2, colonie −3.',fx:{vivres:2,ami:-3}}]},
 rh1705m:{y:1705,si:()=>HD122()&&!S.voieC,tag:'Conte',an:'vers 1705',nat:'Fiction du jeu, sur une réalité : le vin de canne était connu de tous dans l’île.',t:'La marmite au long cou',
  b:'Un guetteur revient des bas : sur une habitation, une marmite de cuivre fume jour et nuit, avec un long cou qui pleure goutte à goutte. Les derniers arrivés au camp savent son nom : la guildive. Ce qui en coule brûle la gorge et couche les hommes. Les vieux du camp, eux, laissent le jus de la canne volée aux lisières travailler quelques jours dans une calebasse : un vin doux, le fangourin, qu’on garde pour les fêtes.',
  o:[{n:'Faire notre fangourin',d:'Cohésion +2, vivres −1.',fx:{coh:2,vivres:-1}},{n:'Se méfier de la marmite des Blancs',d:'Mystique +1.',fx:{myst:1}}]},
 rh1819m:{y:1819,si:()=>HD122()&&!S.voieC,tag:'Conte',an:'vers 1819',nat:'Fiction du jeu, sur un fait : la Ferme des Guildives (1818) avait seule le droit de faire et de vendre le rhum.',t:'Les barriques de la nuit',
  b:'Dans les bas, on ne parle plus que de la Ferme : une poignée de messieurs a seule le droit de faire le rhum et de le vendre. Les petits planteurs cachent leurs alambics, et des barriques montent la nuit par les sentiers, au nez des gardes. Les porteurs connaissent les mêmes chemins que vous.',
  o:[{n:'Prendre une part de la contrebande',d:'Vivres +3, traque +3. Une barrique monte au camp.',fx:{vivres:3,traque:3},f:()=>{S.rhum=(S.rhum||0)+1}},{n:'Laisser passer les porteurs',d:'Cohésion +1.',fx:{coh:1}}]},
 rh1995:{y:1995,si:()=>HD122(),tag:'Mémoire',an:'fin du XXᵉ siècle',nat:'Scène du jeu, sur un fait : les distilleries de l’île font aujourd’hui du rhum de mélasse et du rhum de pur jus.',t:'Le goût du vesou',
  b:'À la boutique du coin, deux bouteilles sur le comptoir. Le rhum de l’usine, celui des fêtes et des cuisines, sec et chaud. À côté, un rhum de pur jus, distillé comme aux premiers temps avec le vesou frais : il garde la douceur de la canne coupée le matin. Les vieux du quartier le disent sans hésiter : celui de l’île tient tête à ceux des Antilles.',
  v:'Deux héritages sur la même table : le rhum des sucreries et celui du fangourin.',
  o:[{n:'Goûter les deux',d:'Cohésion +1, savoir +1.',fx:{coh:1,savoir:1}}]}
});

// ----- 2. Les cartes du conte : une carte lue reste lue, une carte ouverte reste devant tant qu'on n'a pas choisi -----
// (une lettre de décès, une alerte ou un événement glissé devant ne la relancent plus, ne la doublent plus)
const MOD122={cur:null};
{const md=modal;modal=function(){try{if(S&&S.evq&&S.evq.length){const vu={},lus=S.lus122||{};
   S.evq=S.evq.filter(id=>{if(vu[id])return false;vu[id]=1;if(lus[id]&&!(S.revu&&S.revu[id]))return false;return true});
   const m=$('modal');if(MOD122.cur&&m&&!m.hidden&&S.evq[0]!==MOD122.cur){const i=S.evq.indexOf(MOD122.cur);if(i>0){S.evq.splice(i,1);S.evq.unshift(MOD122.cur)}}}}catch(e){}
  const r=md.apply(this,arguments);try{const m=$('modal');MOD122.cur=(m&&!m.hidden&&S&&S.evq&&S.evq[0])||null}catch(e){}return r}}
{const ch=choisir;choisir=function(id,k){let av=0,rev=false;try{av=S.evq.length;rev=!!(S.revu&&S.revu[id])}catch(e){}const r=ch.apply(this,arguments);
  try{if(S&&S.evq&&(S.evq[0]!==id||S.evq.length<av)){window.EVN122=(window.EVN122||0)+1;MOD122.cur=null;const e=EV[id];if(e&&e.tag==='Archive'&&!rev)(S.lus122=S.lus122||{})[id]=1}}catch(e){}return r}}

// ----- 3. Le film d'une sortie attend que les marcheurs soient là, puis les suit de près, au lieu de regarder un champ vide -----
// (les personnages se chargent un par un : si aucun n’est prêt au bout de huit secondes, on ne joue pas de film du tout)
{const cs=cineSortie;cineSortie=function(a,b,t1,t2){try{if((typeof CINE!=='undefined'&&CINE)||performance.now()-SORT.dern<25000||!$('ecran').hidden)return;
  const o=SORT.L.slice().reverse().find(q=>q&&q.b&&Math.abs(q.b.x-b.x)<1e-6&&Math.abs(q.b.z-b.z)<1e-6);if(!o)return cs.apply(this,arguments);
  SORT.dern=performance.now();const pret=()=>o.n.some((m,j)=>{const f=MF.L[o.cle+'_'+j];return f&&f.o});
  const pos=()=>{const u=Math.max(0,Math.min(1,(performance.now()-o.t0)/o.dur));return {x:o.a.x+(o.b.x-o.a.x)*u,z:o.a.z+(o.b.z-o.a.z)*u}};
  const an=Math.atan2(b.x-a.x,b.z-a.z)+Math.PI;
  const go=()=>{o.t0=performance.now();SORT.dern=performance.now();const p0=pos(),suit=w=>{const p=pos();camT.x+=(p.x-p0.x)*w;camT.z+=(p.z-p0.z)*w};
   cineJouer([{d:2400,cam:[p0.x,p0.z,3.4,an,.95],camY:0,txt:t1,f:(U,k)=>suit(Math.min(1,k*2))},{d:3400,cam:[p0.x,p0.z,3.8,an+.35,.9],camY:0,txt:t2,f:()=>suit(1)}])};
  let n=0;const att=()=>{try{if(typeof CINE!=='undefined'&&CINE)return;if(!SORT.L.includes(o))return;if(pret())return go();if(++n>40)return;setTimeout(att,200)}catch(e){}};att()}catch(e){try{return cs.apply(this,arguments)}catch(_){}}}}

// ----- 4. Au survol, l'élément pointé d'un onglet ou du panneau reprend sa taille de lecture -----
// (les panneaux se resserrent pour ne pas défiler : le texte peut descendre aux deux tiers ; la loupe le remet en grand le temps de le lire)
const H122={el:null,old:''};
const SEL122='.sv,.pc,.nd,.fa,.pers,.fam,.lg,.act,.op,.note,.besR,.lt';
function zoomEff122(el){let z=1,e=el;while(e&&e!==document.body){const v=parseFloat(e.style.zoom);if(v>0)z*=v;e=e.parentElement}return z}
function loupeFin122(){const e=H122.el;if(!e)return;H122.el=null;e.style.zoom=H122.old;e.classList.remove('loupe122')}
function loupe122(it){if(H122.el===it)return;loupeFin122();if(!it||!it.isConnected)return;const z=zoomEff122(it),own=parseFloat(it.style.zoom)||1;
 H122.el=it;H122.old=it.style.zoom;it.style.zoom=String(own*Math.max(1,1/z)*1.06);it.classList.add('loupe122')}
document.addEventListener('mouseover',ev=>{try{const t=ev.target;if(!t||!t.closest)return;const box=t.closest('#drawer,#side');if(!box){loupeFin122();return}
 let it=t.closest(SEL122);if(it&&!box.contains(it))it=null;if(!it){let e=t;while(e&&e.parentElement!==box)e=e.parentElement;if(e&&!e.matches('h3,h4')&&!e.querySelector('svg,canvas'))it=e}
 if(it)loupe122(it);else loupeFin122()}catch(e){}},true);
document.addEventListener('mouseleave',()=>loupeFin122());
{const aj=ajuste;ajuste=function(el){if(H122.el&&el&&el.contains&&el.contains(H122.el))return;return aj.apply(this,arguments)}}
{const st=document.createElement('style');st.textContent='.loupe122{position:relative;z-index:3;box-shadow:0 3px 16px rgba(0,0,0,.45)!important;transform:none!important}';document.head.appendChild(st)}

// ----- 5. Chez les colons, on ne parle pas des « anciens » mais des « sages » -----
const SAGE122=/(^|[^\wÀ-ÿ])(les|des|aux|vos|nos|ses|leurs|Les|Des|Aux|Vos|Nos|Ses|Leurs)(\s+)(A|a)nciens(?![\wÀ-ÿ])(?!\s+(esclaves|liens|corsaires|tunnels|forbans|colons|soldats|engagés|marrons|camps|habitants|maîtres|propriétaires|pirates|chemins|habitations|nobles|comptoirs|quartiers|marins|tunnels)\b)/g;
function sages122(n){if(!n)return;if(n.nodeType===3){const v=n.nodeValue;if(!v||v.indexOf('nciens')<0)return;
  const w=v.replace(SAGE122,(m,a,b,c,d)=>a+b+c+(d==='A'?'Sages':'sages')).replace(/\bAnciens(?=\s*[+−-]\s*\d)/g,'Sages');if(w!==v)n.nodeValue=w;return}
 if(n.nodeType!==1||/^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(n.tagName))return;if((n.textContent||'').indexOf('nciens')<0)return;
 const it=document.createTreeWalker(n,NodeFilter.SHOW_TEXT);let x;while((x=it.nextNode()))sages122(x)}
{let vu=false;new MutationObserver(R=>{try{if(typeof S==='undefined'||!S||!S.voieC){vu=false;return}if(!vu){vu=true;sages122(document.body);return}
  R.forEach(r=>{if(r.type==='characterData')sages122(r.target);else r.addedNodes.forEach(sages122)})}catch(e){}}).observe(document.body,{childList:true,subtree:true,characterData:true})}

// ----- 6. Chez les colons, pas de feu au milieu : ni flamme sur la grande carte, ni foyer de pierres dans la cour de l'habitation -----
setInterval(()=>{try{const c=!!(typeof S!=='undefined'&&S&&S.voieC);if(typeof flam!=='undefined'&&flam)flam.visible=!c;
 if(typeof P3!=='undefined'&&P3&&P3.flamme){P3.flamme.visible=!c;if(P3.feuL)P3.feuL.visible=!c;const k=(c?'c':'m')+'|'+P3.decoK;
  if(P3.S&&P3.flamme.userData.k122!==k){P3.flamme.userData.k122=k;const fp=P3.flamme.position;P3.S.traverse(o=>{if(o.isMesh&&o!==P3.flamme&&o.geometry&&o.geometry.type==='SphereGeometry'&&o.geometry.parameters&&Math.abs(o.geometry.parameters.radius-.16)<1e-3&&Math.hypot(o.position.x-fp.x,o.position.z-fp.z)<.7)o.visible=!c})}}}catch(e){}},500);
