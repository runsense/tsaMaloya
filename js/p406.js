// ===== p406 : incarner d'autres vies que les rois marrons — La Buse, François Mussard le chasseur de marrons, Madame Desbassayns,
// Michel Debré, un esclave en fuite que l'on pourchasse, et un bébé du camp (qui ne peut que crier, téter, faire pipi).
// Chaque vie a son inventaire (I), son statut (P), ses tâches selon l'heure (T) — voir p405. Le menu « 🎭 Incarner une vie » est
// sur l'écran « Quelle histoire ? ». Archive, tradition et reconstitution sont dites comme telles dans chaque introduction. =====
Object.assign(INC287,{
 vieBuse:{n:'La Buse',sous:'Olivier Levasseur, pirate — 1721 et 1730',fin:{f:'libre'},ch:[
  {t:'La rade de Saint-Denis',an:'avril 1721',role405:'pirate',hr405:5.8,heros:{n:'La Buse',m:'homme_chemise'},comp:[],obj:'Longer la côte pour voir le vaisseau portugais au mouillage',b0:0,b1:0,chas:0,faux:0,
   route:[[55.441,-20.873],[55.447,-20.876],[55.452,-20.879]],
   intro:'Avril 1721. Avec John Taylor, La Buse entre en rade de Saint-Denis : un vaisseau portugais y est mouillé, démâté par la tempête, avec à son bord le comte d’Ericeira, ancien vice-roi des Indes portugaises. Le navire est pris presque sans combat.',
   finT:'Le butin est immense : diamants, or, objets d’église. C’est de ce jour que naît la légende du trésor.',
   v:'Archive : la prise de la Nossa Senhora do Cabo en rade de Saint-Denis (avril 1721) est attestée. Le détail des richesses varie selon les récits.'},
  {t:'Les derniers pas',an:'7 juillet 1730',role405:'pirate',hr405:14,heros:{n:'La Buse',m:'homme_chemise'},comp:[],obj:'De la geôle à la place de l’église de Saint-Paul',b0:0,b1:0,chas:0,faux:0,
   route:[[55.2690,-21.0070],[55.2702,-21.0088],[55.2715,-21.0105]],
   intro:'Saint-Paul, 7 juillet 1730. Arrêté à Madagascar, jugé par le Conseil supérieur, La Buse va être pendu vers 5 h du soir devant l’église.',
   finT:'La corde. On racontera plus tard qu’il a jeté à la foule un message chiffré — aucune source de 1730 ne le dit.',
   v:'Archive : le jugement et l’exécution du 7 juillet 1730. Tradition : le cryptogramme (connu depuis 1934).'}]},
 vieMussard:{n:'François Mussard',sous:'Chasseur de marrons — les détachements dans les cirques',fin:{f:'libre'},ch:[
  {t:'Le détachement',an:'vers 1740–1750',role405:'chasseur',hr405:5.2,heros:{n:'François Mussard',m:'p1a_chasseur'},comp:[{n:'un homme du détachement',m:'milicien'}],obj:'Remonter vers Cilaos sur les traces d’une bande',b0:1,b1:3,chas:0,faux:0,
   route:[[55.455,-21.215],[55.470,-21.175],[55.475,-21.150],[55.470,-21.135]],
   intro:'François Mussard commande des détachements chargés de poursuivre les marrons dans les Hauts. Ses rapports, écrits au retour, sont aujourd’hui parmi les rares sources sur les camps : ce que l’on sait des marrons, on le sait souvent par ceux qui les traquaient.',
   finT:'Le rapport sera écrit au retour : des noms, des cases brûlées, des captures, des morts.',
   v:'Archive : Mussard et ses détachements sont attestés au milieu du XVIIIᵉ siècle. Les dates exactes de chaque sortie n’ont pas été vérifiées ici ; le trajet de ce chapitre est une reconstitution.'}]},
 vieDesbassayns:{n:'Madame Desbassayns',sous:'Ombline Desbassayns, sur son habitation de Saint-Gilles-les-Hauts',fin:{f:'libre'},ch:[
  {t:'L’habitation',an:'vers 1820',role405:'maitresse',hr405:4.7,heros:{n:'Madame Desbassayns',m:'colone'},comp:[],obj:'Faire le tour de l’habitation, des cases au moulin',b0:1,b1:1,chas:0,faux:0,
   route:[[55.256,-21.039],[55.252,-21.042],[55.249,-21.044]],
   intro:'Veuve en 1800, Ombline Desbassayns dirige l’une des plus grandes habitations de l’île, à Saint-Gilles-les-Hauts, avec plusieurs centaines d’esclaves. Sa maison est aujourd’hui le musée de Villèle.',
   finT:'Dans les Hauts, on raconte encore la « Madame Desbassayns » des contes, punie en enfer pour sa cruauté. C’est la tradition orale ; les archives montrent une femme d’affaires et une maîtresse d’esclaves de son temps.',
   v:'Archive : la famille, l’habitation, le nombre d’esclaves (recensements). Tradition : la figure de la maîtresse cruelle des contes. Le trajet est une reconstitution.'}]},
 vieDebre:{n:'Michel Debré',sous:'Député de La Réunion à partir de 1963',fin:{f:'libre'},ch:[
  {t:'La campagne de 1963',an:'1963',role405:'depute',hr405:8.3,heros:{n:'Michel Debré',m:'homme_chemise'},comp:[],obj:'Traverser Saint-Denis jusqu’à la réunion publique',b0:0,b1:0,chas:0,faux:0,
   route:[[55.448,-20.876],[55.452,-20.880],[55.455,-20.886]],
   intro:'1963. Ancien Premier ministre du général de Gaulle, Michel Debré se fait élire député de La Réunion. Il défend un département arrimé à la France contre ceux qui réclament l’autonomie.',
   finT:'Il restera député jusqu’en 1988.',
   v:'Archive : élu député de La Réunion en 1963, réélu jusqu’en 1988 ; l’élection de 1963 a été contestée par ses adversaires. Le BUMIDOM (1963) organise l’émigration vers la métropole ; de 1962 à 1984, plus de 2 000 enfants réunionnais sont transférés vers des départements ruraux, dont la Creuse. En 2014, l’Assemblée nationale a reconnu la responsabilité morale de l’État.'}]},
 vieFuyard:{n:'L’esclave en fuite',sous:'Une nuit, les chiens derrière soi',fin:{f:'libre'},ch:[
  {t:'Les chiens',an:'vers 1750',role405:'marron',heros:{n:'un homme en fuite',m:'jeune_pagne'},comp:[],obj:'Atteindre la forêt avant que les chiens ne vous rattrapent',b0:0,b1:2,chas:5,faux:4,
   route:[[55.540,-20.910],[55.530,-20.950],[55.520,-20.990],[55.505,-21.020]],
   intro:'Une habitation de Sainte-Suzanne. Il part la nuit. Au matin, le maître lâche les chiens et un détachement suit. Passer l’eau efface l’odeur ; marcher baissé cache.',
   finT:'Sous les grands arbres, les aboiements s’éloignent. Il faut maintenant trouver un camp qui l’accepte.',
   v:'Reconstitution : un fuyard sans nom, d’après les déclarations de marronnage et les rapports de détachement.'}]},
 vieBebe:{n:'Un bébé du camp',sous:'Né libre, dans les Hauts — on ne peut que crier, téter, faire pipi',fin:{f:'libre'},ch:[
  {t:'Né au camp',an:'vers 1745',role405:'bebe',heros:{n:'le bébé',m:'jeune_pagne'},comp:[{n:'sa mère',m:'femme_drapee'}],obj:'Vivre une journée dans les bras de sa mère',b0:3,b1:3,chas:0,faux:0,
   route:[[55.470,-21.104],[55.460,-21.108],[55.4513,-21.1117]],
   intro:'Un enfant est né au camp, sous les Trois Salazes : le premier de sa famille à n’avoir jamais connu de maître. Il ne sait que crier, téter, faire pipi. Mais la nuit, un cri d’enfant porte loin : les chasseurs écoutent.',
   finT:'Il dort. Le camp aussi.',
   v:'Reconstitution : les enfants nés dans les camps sont attestés par les rapports de détachement (« petits marrons ») ; cet enfant-là est du jeu.'}]}});
// ---------- rôles, objets, tâches des nouvelles vies ----------
{const r0=role405;role405=function(I){const c=I&&I.C&&I.C.role405;if(c)return c;return r0.apply(this,arguments)}}
Object.assign(OBJ405,{poudre:['🧂','Poudre et balles','Comptée chaque soir : elle ne se remplace pas dans les Hauts.'],corde:['🪢','Cordes','Pour ramener les captifs.'],
 discours:['🗒','Discours','Les feuillets de la réunion publique.'],carnet:['📓','Carnet','Noms des maires, des chantiers, des promesses.'],
 pistolets:['🔫','Deux pistolets','Les pirates en portaient plusieurs : un coup chacun.'],bijoux:['💎','Une croix d’or','De l’or d’église pris au vaisseau portugais.']});
Object.assign(INV405,{pirate:{pistolets:1,sabre:1,lunette:1,bourse:60,bijoux:1},chasseur:{fusil:1,poudre:1,corde:1,registre:1},maitresse:{cles:1,registre:1,montre:1,bourse:80},depute:{discours:1,carnet:1,montre:1},bebe:{}});
Object.assign(TACHE405,{
 pirate:[{de:6,a:9,t:'Observer la rade à la longue-vue',dur:4,ko:()=>'Vous n’avez pas vu le navire se préparer.'},{de:12,a:15,t:'Partager le butin selon les articles',dur:5,ko:()=>'L’équipage gronde : le partage n’est pas fait.'},{de:16.5,a:17.2,t:'Garder la tête haute devant la foule',dur:3,ko:()=>'On dira que La Buse a tremblé.'}],
 chasseur:[{de:6,a:9,t:'Relever les traces au bord de la rivière',dur:5,ko:()=>{fx405({traque:-3},'Les traces sont perdues : la bande a gagné un jour.');return 'Les traces sont perdues.'}},{de:12,a:14,t:'Compter la poudre et les vivres',dur:3,ko:()=>'Le soir, il manque de la poudre.'},{de:18,a:21,t:'Écrire le rapport du jour',dur:5,ko:()=>'Pas de rapport : le Conseil ne paiera pas la prime.'}],
 maitresse:[{de:5,a:6,t:'Faire sonner la cloche de l’habitation',dur:2,ko:()=>'L’atelier n’a pas été appelé.'},{de:9,a:12,t:'Vérifier les comptes avec le régisseur',dur:5,ko:()=>'Les comptes sont restés ouverts.'},{de:15,a:17,t:'Visiter le moulin',dur:4,ko:()=>'Le moulin n’a pas été vu.'}],
 depute:[{de:9,a:11,t:'Recevoir les maires',dur:5,ko:()=>'Les maires sont repartis sans vous voir.'},{de:14,a:17,t:'Tenir la réunion publique',dur:6,ko:()=>'La salle s’est vidée.'},{de:19,a:21,t:'Écrire à Paris',dur:4,ko:()=>'Le courrier attendra.'}],
 bebe:[{de:5,a:8,t:'Téter au réveil',c:I=>!!I.tete406,ko:()=>'Le bébé a eu faim toute la matinée.'},{de:17,a:20,t:'Téter le soir',c:I=>!!I.tete406b,ko:()=>'Il s’endort en pleurant de faim.'}]});
{const s0=statut405;statut405=function(I){const r=role405(I);const T={pirate:['Pirate','Flibustier de l’océan Indien depuis des années',{'Connaissance du pays':30,'Discrétion':40,'Autorité':85,'Mer':95}],
  chasseur:['Chasseur de marrons','Chef de détachement, payé à la prise',{'Connaissance du pays':80,'Discrétion':60,'Autorité':65,'Endurance':80}],
  maitresse:['Maîtresse d’habitation','Née dans l’île, veuve, à la tête de l’habitation',{'Connaissance du pays':60,'Discrétion':10,'Autorité':90,'Fortune':95}],
  depute:['Député','Élu de La Réunion, venu de Paris',{'Connaissance du pays':20,'Discrétion':10,'Autorité':90,'Fortune':60}],
  bebe:['Nourrisson','Quelques semaines',{'Connaissance du pays':0,'Discrétion':5,'Autorité':0,'Liens':100}]}[r];
  if(!T)return s0.apply(this,arguments);const o=s0.call(this,Object.assign({},I,{C:Object.assign({},I.C,{role405:'colon'})}));return Object.assign(o,{r,titre:T[0],anc:T[1],q:T[2]})}}
{const i0=init405;init405=function(I){const n=I.hr405==null;i0.apply(this,arguments);if(n&&I.C&&I.C.hr405!=null)I.hr405=I.C.hr405;if(n&&role405(I)==='bebe')I.hr405=5.5}}
// ---------- le bébé : il ne marche pas ; 1 crier, 2 téter, 3 faire pipi ----------
function bebe406(){const I=typeof INC!=='undefined'?INC:null;return I&&I.C&&role405(I)==='bebe'?I:null}
{const b0=incBoucle287;incBoucle287=function(){const I=bebe406();if(I&&I.keys){['z','w','s','q','a','d','Shift',' '].forEach(k=>delete I.keys[k]);if(I.h&&I.h.root)I.h.root.scale.setScalar(.38);const m=I.cps&&I.cps[0];if(m&&m.x!=null&&I.h){I.h.x+=(m.x+.3-I.h.x)*.05;I.h.z+=(m.z+.3-I.h.z)*.05}}return b0.apply(this,arguments)}}
function geste406(n){const I=bebe406();if(!I||I.pause)return;const h=I.hr405||12,nuit=h>=19||h<5,m=I.cps&&I.cps[0],pres=!m||Math.hypot((m.x||0)-I.h.x,(m.z||0)-I.h.z)<3;
 if(n===1){if(nuit){fx405({traque:2},'Un cri d’enfant dans la nuit des Hauts : la mère le serre contre elle, tout le camp se tait.');incMsg287('Ouinnn ! La nuit, un cri porte loin : la mère vous serre contre elle et vous fait taire.')}else incMsg287('Ouinnn ! Sa mère arrive, vous berce, chante tout bas.')}
 if(n===2){if(!pres){incMsg287('Pas de mère à côté : on crie d’abord.');return}if(I.st)I.st.faim=100;if(h<12)I.tete406=1;else I.tete406b=1;incMsg287('Vous tétez. Le monde entier se tait.')}
 if(n===3){incMsg287('Pipi. Le pagne est mouillé ; la mère rit et le change contre un morceau de toile.')}}
addEventListener('keydown',e=>{if(!bebe406())return;const m=(e.code||'').match(/^(Digit|Numpad)([1-3])$/);if(!m)return;e.preventDefault();e.stopImmediatePropagation();geste406(+m[2])},true);
setInterval(()=>{const I=bebe406();if(!I||!I.el)return;let d=document.getElementById('bebe406');if(!d){d=document.createElement('div');d.id='bebe406';d.style.cssText='position:absolute;left:50%;bottom:16px;transform:translateX(-50%);display:flex;gap:8px;z-index:5';
 [['😭 Crier','1'],['🍼 Téter','2'],['💧 Pipi','3']].forEach(([t,k],i)=>{const b=document.createElement('button');b.className='bt sec';b.textContent=t+' ['+k+']';b.onclick=()=>geste406(i+1);d.appendChild(b)});I.el.appendChild(d)}},700);
// ---------- le menu ----------
const VIES406=['vieBuse','vieMussard','vieDesbassayns','vieDebre','vieFuyard','vieBebe'];
function menu406(){const e=$('ecran');e.hidden=false;e.innerHTML='<div class="bloc"><h1>Incarner une vie</h1><p class="note">À pied, sur le vrai relief, dans la peau de quelqu’un. I : inventaire · P : statut · T : la tâche du moment · molette : jusqu’à ses yeux.</p>'+VIES406.map(k=>{const E=INC287[k];return '<button class="op dif" data-v406="'+k+'"><b>'+E.n+'</b><small>'+E.sous+'</small></button>'}).join('')+'<button class="bt sec" id="r406">← Retour</button></div>';
 e.querySelectorAll('[data-v406]').forEach(b=>b.onclick=()=>{const k=b.dataset.v406;e.hidden=true;incOuvrir287(k,0);if(INC){const back=()=>{try{menu406()}catch(x){}};INC.ret=back;INC.F=back}});$('r406').onclick=()=>{try{choixVoie()}catch(x){}}}
{const c0=choixVoie;choixVoie=function(){const r=c0.apply(this,arguments);try{const e=$('ecran');if(e&&!e.querySelector('#b406')){const b=document.createElement('button');b.className='op dif';b.id='b406';b.innerHTML='<b>🎭 Incarner une vie</b><small>La Buse, Mussard, Madame Desbassayns, Michel Debré, un fuyard, un bébé du camp</small>';b.onclick=menu406;const g=e.querySelector('.tab319')||e.querySelector('.bloc');if(g)g.appendChild(b)}}catch(x){}return r}}
try{Object.assign(window.TR363=window.TR363||{},{'Incarner une vie':'Live a life','🎭 Incarner une vie':'🎭 Live a life'})}catch(e){}
