
// ===== p382 : les gestes de la vie du camp en mouvements captés (Mixamo, reçus le 27/11), et des gestes propres à chaque héros =====
// Prier, jouer du roulèr, parler, cueillir, ramasser, s'agenouiller, saluer, danser, frapper du bâton : le personnage les fait
// vraiment au lieu de rester figé. Grand-mère Kal marche et attend comme une vieille femme. Le geste dure quelques secondes ;
// un pas l'interrompt.
try{Object.assign(MXGESTE188,{prier:'Praying',tambour:'Playing_Drums',parler:'Talking',cueillir_mx:'Pick_Fruit',ramasser:'Picking_Up',vieux_repos:'Old_Man_Idle',vieux_marche:'Old_Man_Walk',massue:'One_Hand_Club_Combo',victoire:'Victory',genou:'Kneeling',danse:'Rumba_Dancing',salut:'Salut'})}catch(e){}
{const o0=incClip287;incClip287=function(o,c){if(!o)return;const now=performance.now();
  if(o.hold382&&now<o.hold382){if(c==='repos_debout'||c===o.clip)return;if(c==='marche'||c==='course'||c==='grimper')o.hold382=0}
  // Grand-mère Kal : pas de vieille femme, attente courbée
  if(o.vieux382){if(c==='repos_debout')c='vieux_repos';else if(c==='marche')c='vieux_marche'}
  return o0.call(this,o,c)};try{window.incClip287=incClip287}catch(e){}}
function geste382(nom,dur){const I=typeof INC!=='undefined'?INC:null;if(!I||!I.h)return;const h=I.h;h.hold382=0;incClip287(h,nom);h.hold382=performance.now()+(dur||2600)}
// quel geste pour quelle action de la barre (p380)
const G382={prendre:['ramasser',1800],frapper:['massue',1400],bois:['massue',1600],casser:['massue',1600],cueillir:['cueillir_mx',2600],saluer:['salut',2000],discuter:['parler',3200],malaxer:['genou',2400],cuisiner:['genou',3000],feu:['genou',2600]};
{const j0=joue380;joue380=function(k){const r=j0.apply(this,arguments);try{const g=G382[k];if(g)geste382(g[0],g[1])}catch(e){}return r};try{window.joue380=joue380}catch(e){}}
// gestes propres à chaque héros, ajoutés à la barre selon qui on incarne
function heros382(I){const H=(I&&I.C&&I.C.heros)||{},m=String(H.m||''),n=String(H.n||'');return /kal/i.test(m+n)?'kal':/tijean|Ti Jean/i.test(m+n)?'tijean':/Anchaing|Héva|heva/i.test(n)?'anchaing':'marron'}
Object.assign(ACT380,{
 prier:{n:'Prier les ancêtres',ic:'🙏',ok:(c)=>c.I.nuit||c.feuPres||c.cp,cons:(c)=>(c.I.endu||100)<50,f:(c)=>{geste382('prier',4000);c.I.endu=Math.min(100,(c.I.endu||0)+12);return 'Vous parlez aux razana, les ancêtres : le cœur se calme.'}},
 roulere:{n:'Jouer du roulèr',ic:'🥁',ok:(c)=>c.feuPres||(c.cp&&c.I.nuit),cons:(c)=>!!c.cp,f:(c)=>{geste382('tambour',5000);(c.I.cps||[]).forEach(p=>{p.x=c.h.x+(Math.random()-.5)*3;p.z=c.h.z+(Math.random()-.5)*3});c.I.endu=Math.min(100,(c.I.endu||0)+8);return 'Le roulèr résonne doucement : les vôtres se rassemblent autour du feu.'}},
 danser:{n:'Danser le maloya',ic:'💃',ok:(c)=>c.feuPres&&c.cp,f:(c)=>{geste382('danse',5000);return 'On danse autour du feu, à voix basse pour ne pas être entendus d’en bas.'}},
 kalciel:{n:'Guetter du haut des arbres',ic:'🐦',ok:(c)=>heros382(c.I)==='kal',cons:(c)=>(c.I.CH||[]).length>0,f:(c)=>{(c.I.CH||[]).forEach(o=>{o.vu382=1});return 'Comme l’oiseau Timize, Grand-mère Kal voit de haut : « tout tout », les chasseurs sont repérés.'}},
 ruse:{n:'Ruser',ic:'🎭',ok:(c)=>heros382(c.I)==='tijean'&&((c.I.CH||[]).length>0||c.gib),cons:(c)=>true,f:(c)=>{c.I.ruse382=performance.now()+8000;return 'Ti Jean fait le simple d’esprit : on ne se méfie pas de lui, pendant un moment.'}}});
['prier','roulere','danser','kalciel','ruse'].forEach(k=>{if(!ORD380.includes(k))ORD380.splice(ORD380.length-1,0,k)});
// à l'ouverture d'une incarnation : Grand-mère Kal marche en vieille femme
(function veille382(){setTimeout(veille382,1000);try{const I=typeof INC!=='undefined'?INC:null;if(I&&I.h&&!I.h.v382){I.h.v382=1;if(heros382(I)==='kal')I.h.vieux382=1}}catch(e){}})();
