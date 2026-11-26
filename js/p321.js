// ===== p321 : les forces de l'île — l'ancienne Survie devient la couche politique de l'Histoire. Chaque force entre en scène
// à sa vraie date (archives, ou tradition quand c'est la tradition qui parle). On choisit comment on se tient face à elle.
// Chacune peut pousser vers une utopie du jeu ; si elle y arrive, une carte le propose — mais le conte reste sur l'histoire
// réelle, l'utopie s'ouvre à côté (S.br), comme les autres uchronies. =====
const FAC321=[
 {k:'habitants',n:'Les habitants de Saint-Paul',y:1663,c:'c',col:'#e8be5a',d:'Quelques familles venues de France et de Madagascar, autour de l’étang de Saint-Paul.',h:'En 1663, Louis Payen et une dizaine de compagnons, dont des Malgaches, s’installent près de Saint-Paul.',u:null},
 {k:'anciens',n:'Les gardiens des razana',y:1663,c:'m',col:'#9fd08a',d:'Ceux qui gardent la mémoire des ancêtres malgaches, les gestes, les noms, les interdits.',h:'Le culte des ancêtres (razana) est au cœur des sociétés malgaches d’où venaient la plupart des premiers marrons.',u:'anc',un:'la Voie des anciens',st:()=>(S.myst||0)/4},
 {k:'compagnie',n:'La Compagnie des Indes',y:1665,c:'c',col:'#d8a060',d:'La Compagnie tient l’île pour ravitailler ses navires sur la route des Indes. Elle nomme le commandant, elle fixe les prix.',h:'Étienne Regnault arrive en 1665 comme premier commandant de Bourbon pour la Compagnie des Indes orientales, créée en 1664.',u:'comp',un:'l’île des comptoirs',st:()=>(S.ami||0)/20},
 {k:'forbans',n:'Les forbans retirés',y:1695,c:'c',col:'#a0a0c8',d:'Des pirates de la mer des Indes viennent finir leurs jours à Bourbon, avec leurs piastres. On les accueille, on les marie.',h:'Entre la fin du XVIIᵉ siècle et les années 1720, des forbans s’installent à Bourbon ; plusieurs familles de l’île en descendent.',u:'lib',un:'Libertalia',st:()=>(S.pir?3:0)+(S.leg?1:0)},
 {k:'cafe',n:'Les planteurs de café',y:1715,c:'c',col:'#b07a4a',d:'Les premiers plants de moka arrivent. Ceux qui en plantent veulent des terres, et des bras.',h:'Les premiers caféiers de Moka sont introduits à Bourbon en 1715 ; le café fait la fortune de l’île au XVIIIᵉ siècle, et multiplie l’esclavage.',u:'cafe',un:'l’île du café',st:()=>(S.ami||0)/15},
 {k:'detache',n:'Les détachements',y:1729,c:'c',col:'#c86a5a',d:'Des hommes payés pour monter dans les Hauts chasser les marrons. Ils comptent les mains coupées pour toucher la prime.',h:'Dans les années 1730-1750, la colonie organise des détachements de chasseurs de marrons ; leurs rapports sont aux archives.',u:null},
 {k:'royaumes',n:'Les royaumes des Hauts',y:1735,c:'m',col:'#7fc36a',trad:1,d:'Selon la tradition, des camps se rassemblent autour de rois et de reines, chacun dans son cirque ou sa plaine.',h:'Tradition orale : les noms des rois marrons sont restés dans les noms des lieux (Dimitile, Cimendef, Mafate…). Les archives parlent de chefs de bande.',u:'roy',un:'le Royaume des Hauts',st:()=>(S.coh||0)/30+(camps().length>1?1:0)},
 {k:'lumieres',n:'Les lecteurs des Lumières',y:1770,c:'c',col:'#c8d8f0',d:'Quelques colons lisent Raynal et Rousseau. Ils parlent de droits, et certains pensent que l’esclavage ne durera pas.',h:'L’Histoire des deux Indes de l’abbé Raynal (1770) condamne l’esclavage ; elle circule dans les colonies.',u:'abol',un:'l’île des Lumières',st:()=>(S.savoir||S.sav||0)/4},
 {k:'assemblee',n:'L’Assemblée coloniale',y:1790,c:'c',col:'#e0c070',d:'La Révolution arrive à Bourbon. Les colons élisent leur assemblée, et entendent décider seuls.',h:'Bourbon élit une Assemblée coloniale en 1790. En 1796, elle rembarque les envoyés venus appliquer l’abolition de 1794.',u:null},
 {k:'insurges',n:'Les insurgés de Saint-Leu',y:1811,c:'m',col:'#e08a5a',d:'Des esclaves de Saint-Leu préparent un soulèvement pour prendre leur liberté.',h:'En novembre 1811, la révolte d’esclaves de Saint-Leu est écrasée ; ses meneurs sont exécutés.',u:'abol',un:'la liberté avant 1848',st:()=>(S.coh||0)/30},
 {k:'engages',n:'Les engagés de l’Inde',y:1828,c:'c',col:'#d0a0d0',d:'Des travailleurs arrivent de l’Inde sous contrat. Sur les habitations, on les traite souvent comme les esclaves.',h:'Les premiers engagés indiens arrivent à Bourbon en 1828 ; ils sont des dizaines de milliers après 1848.',u:null},
 {k:'affranchis',n:'Les affranchis de 1848',y:1848,c:'m',col:'#f0d070',d:'Le 20 décembre, l’esclavage est aboli. Plus de soixante mille personnes deviennent libres.',h:'L’abolition est proclamée à La Réunion le 20 décembre 1848.',u:null}];
function fac321(){if(!S)return {};S.fac321=S.fac321||{};return S.fac321}
function facLa321(){const F=fac321();return FAC321.filter(f=>F[f.k])}
function monCote321(){return S&&S.voieC?'c':'m'}
// l'entrée en scène : une carte à sa date, avec trois façons de se tenir
FAC321.forEach(f=>{const id='fac321_'+f.k;if(EV[id])return;
 EV[id]={y:f.y,tag:'Archive',an:String(f.y),t:f.n,b:f.d+(f.trad?' (Selon la tradition.)':''),v:'Une force entre en scène. Comment vous tenez-vous face à elle ?',h:f.h,si:()=>!!S&&!fac321()[f.k],
  get o(){const mien=f.c===monCote321();const ent=v=>()=>{const F=fac321();F[f.k]={conf:v,poids:30,elan:0,an:S.year}};
   return mien?[{n:'S’appuyer sur eux',d:'Confiance haute ; ils pèseront dans vos choix.',fx:{coh:1},f:ent(72),hist:1},{n:'Les tenir à distance',d:'Confiance moyenne.',fx:{},f:ent(50)},{n:'S’en méfier',d:'Confiance basse ; ils pourraient se tourner contre vous.',fx:{coh:-1},f:ent(30)}]
    :[{n:'Les éviter',d:'Confiance moyenne.',fx:{},f:ent(45),hist:1},{n:'Chercher à leur parler',d:'Confiance plus haute, traque +1.',fx:{traque:1},f:ent(62)},{n:'Les combattre',d:'Confiance basse ; ils vous combattront.',fx:{coh:1},f:ent(20)}]}}});
// chaque saison : le poids de chaque force suit l'état de l'île ; sa confiance revient lentement vers le milieu ;
// son élan vers l'utopie monte quand elle a confiance et que ce qu'elle veut grandit
let ns321=-1;function tick321(){if(!S||S.fin||S.ns==null||S.ns===ns321)return;const prem=ns321<0;ns321=S.ns;if(prem)return;saison321()}
setInterval(()=>{try{tick321()}catch(e){console.warn(e)}},1500);
function saison321(){{const F=fac321(),c=monCote321();
 FAC321.forEach(f=>{const o=F[f.k];if(!o)return;const mien=f.c===c;
  const cible=f.k==='detache'?(S.traque||0):f.c==='m'?(c==='m'?(S.coh||40):100-(S.ami||40)):(c==='c'?(S.ami||40):60);o.poids+=(Math.max(5,Math.min(95,cible))-o.poids)*.08;
  o.conf+=(50-o.conf)*.03;if(f.y<1848&&S.year>=1848&&!o.fin&&['detache','royaumes','insurges'].includes(f.k)){o.fin=1;o.poids*=.4}
  if(f.u&&!(S.br||{})[f.u]&&!o.utop){o.elan=Math.max(0,o.elan+.4+(o.conf-50)/30+(f.st?Math.min(3,f.st()):0)*.5+(mien?.4:-.3));if(o.elan>=100&&!S.evq.includes('utop321')&&!(S.utQ321)){S.utQ321=f.k;S.evq.push('utop321')}}
  // ce qu'elles font, sans qu'on leur demande
  if(mien&&o.conf>65&&Math.random()<.25){S.coh=Math.min(100,(S.coh||0)+1)}
  if(!mien&&o.conf<30&&o.poids>50&&Math.random()<.3){if(c==='m')S.traque=Math.min(100,(S.traque||0)+1.5);else S.ami=Math.max(0,(S.ami||0)-1)}});
 try{maj321()}catch(e){}}}
// la carte de l'utopie : on peut la suivre (elle s'ouvre à côté de l'histoire), ou rester sur l'histoire réelle
EV.utop321={sys:1,tag:'Utopie',an:'',get t(){const f=FAC321.find(x=>x.k===(S&&S.utQ321));return f?f.n+' : vers '+f.un:'Une utopie s’ouvre'},
 get b(){const f=FAC321.find(x=>x.k===(S&&S.utQ321));return f?f.n+(/^Les /.test(f.n)?' ont':' a')+' pris de la force. '+(/^Les /.test(f.n)?'Ils pourraient':'Elle pourrait')+' mener l’île vers '+f.un+'. Le conte continue l’histoire réelle ; l’utopie, si vous la suivez, s’ouvre à côté, avec ses propres cartes.':''},
 v:'Utopie du jeu : ce qui suit est une fiction, l’histoire réelle reste racontée à côté.',
 get o(){const k=S&&S.utQ321,f=FAC321.find(x=>x.k===k),o=k&&fac321()[k];return [{n:'Suivre '+(f?f.un:'l’utopie'),d:'Une branche de l’histoire s’ouvre (uchronie du jeu).',fx:{coh:2},f:()=>{if(f&&f.u){(S.br=S.br||{})[f.u]=1;if(o)o.utop=1;log('✨ Utopie du jeu : '+f.n+' ouvrent la voie de '+f.un+'.')}S.utQ321=null}},
  {n:'Rester sur l’histoire réelle',d:'L’élan retombe.',fx:{},hist:1,f:()=>{if(o)o.elan=40;S.utQ321=null}}]}};
// « Les forces de l'île » s'affichent en tête de l'onglet Factions (les factions du camp restent dessous)
function html321(){if(!S)return '';const L=facLa321(),c=monCote321(),nx=FAC321.find(f=>!fac321()[f.k]&&f.y>S.year);
 const bar=(v,col)=>'<span style="display:inline-block;width:70px;height:6px;background:#3a3226;border-radius:3px;vertical-align:middle"><span style="display:block;height:6px;width:'+Math.round(Math.max(0,Math.min(100,v)))+'%;background:'+col+';border-radius:3px"></span></span>';
 const ligne=f=>{const o=fac321()[f.k];return '<div style="border-top:1px solid #3a3226;padding:6px 0"><b style="color:'+f.col+'">'+f.n+'</b> <small style="opacity:.7">depuis '+o.an+(f.trad?' · tradition':'')+(o.fin?' · en déclin':'')+'</small><br><small>Poids '+bar(o.poids,f.col)+' · confiance '+bar(o.conf,o.conf>60?'#7fc36a':o.conf<35?'#c86a5a':'#c8b070')+'</small>'+(f.u?'<br><small style="opacity:.8">'+(o.utop?'✨ a ouvert la voie de '+f.un:'Vers '+f.un+' '+bar(o.elan,'#c8a0ff'))+'</small>':'')+'</div>'};
 const M=L.filter(f=>f.c===c),A=L.filter(f=>f.c!==c);
 return '<div id="forces321" class="pc" style="margin-bottom:10px"><h3 style="margin:0 0 2px">Les forces de l’île · '+S.year+'</h3><p class="note" style="margin:2px 0 6px">Chaque force entre en scène à sa date. Certaines peuvent mener vers une utopie du jeu ; le conte, lui, reste sur l’histoire réelle.</p>'+
  '<div style="color:#e8be5a;font:600 11px system-ui;letter-spacing:.08em;text-transform:uppercase;margin-top:6px">'+(c==='m'?'Côté marrons':'Côté colonie')+'</div>'+(M.length?M.map(ligne).join(''):'<small>Aucune encore.</small>')+
  '<div style="color:#9fc4d8;font:600 11px system-ui;letter-spacing:.08em;text-transform:uppercase;margin-top:8px">'+(c==='m'?'Côté colonie':'Côté marrons')+'</div>'+(A.length?A.map(ligne).join(''):'<small>Aucune encore.</small>')+
  (nx?'<p class="note" style="margin:8px 0 0">Prochaine à entrer en scène : vers '+nx.y+'.</p>':'')+'</div>'}
function maj321(){try{if(typeof onglet!=='undefined'&&onglet==='fac'){const d=$('drawer'),o=$('forces321');if(d&&o)o.outerHTML=html321()}}catch(e){}}
{const dr=drawer;drawer=function(){const r=dr.apply(this,arguments);try{if(onglet==='fac'&&S){const d=$('drawer');if(d&&!$('forces321'))d.insertAdjacentHTML('afterbegin',html321())}}catch(e){}return r}}
