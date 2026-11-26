// ===== p326 : les forces de l'île pèsent sur l'histoire. Elles ne changent pas les actions : elles disent ce qu'elles préfèrent.
// Sous chaque choix d'une carte, on voit qui le soutient et qui s'y oppose. Le conte suit l'histoire réelle, mais quand les forces
// puissantes poussent ailleurs, il peut basculer — et l'on peut toujours choisir soi-même, dans un sens comme dans l'autre.
// Choisir ce qu'une force préfère lui donne confiance, et la rapproche de son utopie. S'ajoutent les grandes décisions où
// l'île a pu basculer : suivre la Compagnie ou non, la chute du commandant Vauboulon, et les îles autour (Maurice, Rodrigues,
// les Seychelles, Madagascar), chacune avec son chemin réel, ses autres chemins, et parfois une utopie. =====
const MOTS326=[[/Compagnie|comptoir|commerce|traite|port/i,{compagnie:1,habitants:.4}],[/café|caféier|planter|défricher/i,{cafe:1,compagnie:.5,anciens:-.5}],
 [/pirate|forban|course|Libertalia|piastre/i,{forbans:1,compagnie:-.5}],[/libert|affranch|abol|libérer|égaux/i,{lumieres:1,insurges:1,cafe:-.8,detache:-1}],
 [/ancêtre|razana|sacré|esprit|tombe/i,{anciens:1,lumieres:-.3}],[/battue|détachement|chasseurs de marrons|prime/i,{detache:1,royaumes:-1,anciens:-.6}],
 [/roi|reine|royaume|camp/i,{royaumes:.6}],[/assemblée|élire|vote|gouverner seuls/i,{assemblee:1,compagnie:-.6}],[/engag|contrat|Inde/i,{engages:.6,cafe:.4}]];
function pref326(fk,o){if(!o)return 0;if(o.pref326)return o.pref326[fk]||0;let p=0;const f=o.fx||{},t=(o.n||'')+' '+(o.d||'');const F=FAC321.find(x=>x.k===fk);if(!F)return 0;
 if(f.traque>0)p+=F.c==='m'?-.6:(fk==='detache'?.6:0);if(f.traque<0)p+=F.c==='m'?.4:0;
 if(f.ami>0)p+=F.c==='c'?.5:-.3;if(f.ami<0)p+=F.c==='c'?-.5:.3;
 if(f.coh>0&&(fk==='anciens'||fk==='royaumes'))p+=.4;if(f.vivres>0&&fk==='habitants')p+=.4;if((f.myst||0)>0&&fk==='anciens')p+=.6;if((f.savoir||0)>0&&fk==='lumieres')p+=.5;
 MOTS326.forEach(([re,m])=>{if(re.test(t)&&m[fk])p+=m[fk]});return Math.max(-1,Math.min(1,p))}
function appui326(o){const F=fac321(),L=[];FAC321.forEach(f=>{const s=F[f.k];if(!s||s.fin)return;const p=pref326(f.k,o);if(Math.abs(p)>=.45)L.push({f,s,p,w:p*(s.poids/100)*(.3+s.conf/100)})});return L}
// sous chaque choix : qui soutient, qui s'oppose
{const st=document.createElement('style');st.textContent='.ap326{display:block;margin-top:5px;font:600 10.5px system-ui;letter-spacing:.02em;opacity:.9}.ap326 span{display:inline-block;margin:2px 4px 0 0;padding:1px 6px;border-radius:999px;border:1px solid}';document.head.appendChild(st)}
{const m0=modal;modal=function(){const r=m0.apply(this,arguments);try{if(!S||!S.evq||!S.evq.length)return r;const id=S.evq[0],e=EV[id];if(!e)return r;const O=optsDe(id,e);
 O.forEach((o,k)=>{const b=$('op'+k);if(!b||b.querySelector('.ap326'))return;const L=appui326(o).sort((a,c)=>Math.abs(c.w)-Math.abs(a.w)).slice(0,4);if(!L.length)return;
  const s=document.createElement('small');s.className='ap326';s.innerHTML=L.map(x=>'<span style="border-color:'+x.f.col+';color:'+(x.p>0?x.f.col:'#d08a7a')+'">'+(x.p>0?'▲ ':'▼ ')+x.f.n.replace(/^(Les|La|L’) /,'')+'</span>').join('');b.appendChild(s)})}catch(x){}return r}}
// le conte suit l'histoire… sauf quand les forces poussent fort ailleurs
{const cc=choixConte;choixConte=function(e,id){const k0=cc.apply(this,arguments);try{if(!S||!id||id==='debutC')return k0;const O=optsDe(id,e);if(!O||O.length<2)return k0;
 const sc=O.map(o=>appui326(o).reduce((s,x)=>s+x.w,0));let kb=k0;sc.forEach((v,k)=>{if(v>sc[kb])kb=k});
 if(kb!==k0&&sc[kb]-sc[k0]>.45){const z=(id+'|'+S.year);if(S.bas326!==z){S.bas326=z;S.basOK326=Math.random()<.45}if(S.basOK326){const L=appui326(O[kb]).filter(x=>x.p>0).sort((a,c)=>c.w-a.w);S.basMsg326=L.length?L[0].f.n:'';return kb}}}catch(x){}return k0}}
// un choix fait (par vous ou par le conte) : confiance et élan de chaque force
{const ch=choisir;choisir=function(id,k){let o=null;try{const e=EV[id];o=e&&optsDe(id,e)[k]}catch(x){}const n0=S&&S.evq?S.evq.length:0,t0=S&&S.evq&&S.evq[0];const r=ch.apply(this,arguments);
 try{if(o&&S&&!(S.evq&&S.evq.length===n0&&S.evq[0]===t0&&t0===id)){const F=fac321();FAC321.forEach(f=>{const s=F[f.k];if(!s)return;const p=pref326(f.k,o);if(!p)return;s.conf=Math.max(0,Math.min(100,s.conf+p*4));if(f.u&&p>0&&!s.utop)s.elan=Math.min(99,s.elan+p*6)});
  if(S.basMsg326&&S.bas326===(id+'|'+S.year)){log('⚖️ Sous la pression des '+S.basMsg326.replace(/^(Les|La|L’) /,'').toLowerCase()+', le conte ne suit pas l’histoire réelle ici.');S.basMsg326=''}}}catch(x){}return r}}
// ----- les grandes décisions où l'île a pu basculer -----
{const A=(id,o)=>{if(!EV[id])EV[id]=Object.assign({tag:'Archive'},o)};const ouvre=k=>{(S.dec=S.dec||{})[k]=1};const pose=k=>{ouvre(k);(S.out=S.out||{})[k]=1};
 const el=(k,v)=>{const s=fac321()[k];if(s&&!s.utop)s.elan=Math.min(99,s.elan+v)};
 A('cafe326',{y:1720,an:'vers 1720',t:'La Compagnie veut du café',b:'La Compagnie des Indes ordonne aux habitants d’entretenir des caféiers et de lui vendre la récolte, à son prix. Il faudra des terres, et des bras : des esclaves.',h:'Après l’arrivée des premiers caféiers en 1715, la Compagnie impose leur culture aux habitants de Bourbon et garde le monopole de l’achat.',v:'Suivre la Compagnie, ou non.',
  o:[{n:'Suivre la Compagnie',d:'Vivres +3, colonie +3 ; l’île devient l’île du café.',fx:{vivres:3,ami:3},hist:1,pref326:{compagnie:1,cafe:1,habitants:.3,anciens:-.6,royaumes:-.4},f:()=>el('cafe',8)},
   {n:'Garder les vivres avant le café',d:'Cohésion +2, colonie −2.',fx:{coh:2,ami:-2},pref326:{habitants:.6,compagnie:-1,cafe:-.8}},
   {n:'Refuser le prix de la Compagnie',d:'Colonie −4 ; les habitants veulent décider seuls.',fx:{ami:-4},pref326:{assemblee:1,habitants:.5,compagnie:-1},f:()=>el('forbans',4)}]});
 A('vauboulon326',{y:1690,an:'1690',t:'La chute du commandant Vauboulon',b:'Le commandant envoyé par la Compagnie gouverne en maître dur : amendes, prisons, confiscations. Les habitants, avec un religieux, l’arrêtent et l’enferment.',h:'En 1690, les habitants de Bourbon arrêtent le commandant Habert de Vauboulon ; il meurt en captivité en 1692.',v:'L’île a renversé son chef : qui gouverne maintenant ?',
  o:[{n:'Laisser les habitants faire',d:'Cohésion +2, colonie −2 : comme dans l’histoire.',fx:{coh:2,ami:-2},hist:1,pref326:{habitants:1,assemblee:.6,compagnie:-1},f:()=>el('forbans',3)},
   {n:'Soutenir le commandant',d:'Colonie +4, cohésion −3.',fx:{ami:4,coh:-3},pref326:{compagnie:1,habitants:-1}},
   {n:'Profiter du désordre',d:S&&S.voieC?'Traque −4 : personne ne monte dans les Hauts.':'Traque −4 : personne ne monte dans les Hauts cette année.',fx:{traque:-4},pref326:{anciens:.6,royaumes:.8,forbans:.4}}]});
 A('maurice326',{y:1715,an:'1715 – 1721',t:'L’île sœur, Maurice',b:'Les Hollandais sont partis. Un capitaine français prend l’île au nom du roi et la nomme Île de France ; six ans plus tard, des colons y partent depuis Bourbon.',h:'Dufresne d’Arsel en prend possession en 1715 ; le peuplement commence en 1721, en partie depuis Bourbon.',v:'Y aller, ou non.',
  o:[{n:'Y envoyer des familles de Bourbon',d:'Personnes −1, colonie +3 ; Maurice s’ouvre.',fx:{gens:-1,ami:3},hist:1,pref326:{compagnie:1,habitants:.4},f:()=>pose('maurice')},
   {n:'Rester à Bourbon',d:'Rien ne part ; Maurice reste loin.',fx:{},pref326:{habitants:.5,compagnie:-.5},f:()=>ouvre('maurice')},
   {n:'Les marrons de Maurice d’abord',d:'Utopie : les marrons des deux îles se répondent.',fx:{coh:1},pref326:{royaumes:1,anciens:.5,compagnie:-1},f:()=>{ouvre('maurice');el('royaumes',12);(S.br=S.br||{}).maur=S.br.maur||0}}]});
 A('rodr326',{y:1725,an:'1725',t:'Rodrigues',b:'La France prend possession de la petite île de Rodrigues. On y va chercher des tortues par milliers pour nourrir Bourbon et Maurice.',h:'Rodrigues est revendiquée par la France en 1725 ; ses tortues sont prélevées en masse au XVIIIᵉ siècle.',v:'Les tortues, ou l’île telle qu’elle est.',
  o:[{n:'Envoyer chercher les tortues',d:'Vivres +5, forêt et faune de Rodrigues −.',fx:{vivres:5},hist:1,pref326:{compagnie:.6,habitants:.6,anciens:-.4},f:()=>pose('rodr')},
   {n:'Ne prendre que ce qu’il faut',d:'Vivres +2 ; le solitaire vivra plus longtemps.',fx:{vivres:2},pref326:{anciens:.6,lumieres:.5},f:()=>ouvre('rodr')}]});
 A('mada326',{y:1750,an:'1750',t:'Sainte-Marie de Madagascar',b:'Une princesse de la côte est de Madagascar cède l’île Sainte-Marie à la Compagnie. L’île était un repaire de forbans depuis des décennies.',h:'En 1750, l’île Sainte-Marie est cédée à la Compagnie des Indes ; elle avait été une base de pirates à la fin du XVIIᵉ siècle.',v:'Un comptoir, ou autre chose.',
  o:[{n:'Un comptoir de la Compagnie',d:'Colonie +3 ; la traite passe par là.',fx:{ami:3},hist:1,pref326:{compagnie:1,cafe:.5,anciens:-.6,insurges:-.6},f:()=>pose('mada')},
   {n:'Laisser Sainte-Marie aux siens',d:'Cohésion +2 ; Madagascar reste lointaine.',fx:{coh:2},pref326:{anciens:1,royaumes:.5,compagnie:-1},f:()=>ouvre('mada')},
   {n:'Une île libre, pour les forbans',d:'Utopie : Libertalia se rapproche.',fx:{},pref326:{forbans:1,compagnie:-1},f:()=>{ouvre('mada');el('forbans',20)}}]});
 A('seych326',{y:1756,an:'1756 – 1770',t:'Les Seychelles',b:'Un navire de la Compagnie prend possession des îles de granit, sans habitants. Quatorze ans plus tard, les premiers colons s’installent, avec des esclaves.',h:'Possession française en 1756 (Morphey) ; premier établissement en 1770 sur l’île Sainte-Anne.',v:'Des colons, ou des îles laissées vides.',
  o:[{n:'Y envoyer des colons',d:'Colonie +2 ; épices et bois.',fx:{ami:2},hist:1,pref326:{compagnie:.8,cafe:.3},f:()=>pose('seych')},
   {n:'Les laisser vides',d:'Rien ne change.',fx:{},pref326:{anciens:.4,lumieres:.3},f:()=>ouvre('seych')},
   {n:'Un refuge pour ceux qui fuient',d:'Utopie : un refuge loin des maîtres.',fx:{coh:1},pref326:{royaumes:.7,insurges:.6,forbans:.6,compagnie:-1},f:()=>{ouvre('seych');el('royaumes',8);el('forbans',8)}}]});
 A('couronne326',{y:1767,an:'1767',t:'La fin de la Compagnie',b:'La Compagnie des Indes est en faillite. Le roi rachète Bourbon : désormais, ce sont ses gouverneurs qui commandent.',h:'En 1767, Bourbon passe de la Compagnie des Indes à l’administration royale.',v:'Le roi, ou autre chose.',
  o:[{n:'Accepter les gens du roi',d:'Colonie +2 : comme dans l’histoire.',fx:{ami:2},hist:1,pref326:{compagnie:.3,cafe:.3}},
   {n:'Demander une assemblée des habitants',d:'Colonie −2 ; les habitants veulent leur mot à dire.',fx:{ami:-2},pref326:{assemblee:1,habitants:.6,lumieres:.5},f:()=>el('lumieres',6)}]})}
