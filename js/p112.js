
// ===== p112 : la Compagnie des Indes, et l'axe d'Afrique australe (Nyassaland, Rhodésie, Zimbabwe) =====
// Archives : la Compagnie française des Indes orientales (1664-1769), ses guerres avec l'East India Company et la VOC,
// la chute de la VOC (1799) et les pirates ; la BSAC de Cecil Rhodes (1889-1923), la Rhodésie (UDI 1965), le Zimbabwe (1980).
// Uchronies et mythes : imaginés pour le jeu. Tout finit par se nouer autour de l'île.
const C112=()=>BR88();
const UC112=t=>'Uchronie, imaginée pour le jeu : '+t;
Object.assign(EV,{
 // --- la Compagnie : son fonctionnement et ses répercussions, surtout si l'on suit la Compagnie ---
 comp1665:{y:1665,si:()=>S&&S.voieC,tag:'Archive',an:'1664-1665',t:'La Compagnie des Indes prend l’île',
  b:'Colbert a fondé la Compagnie des Indes orientales : un privilège royal, le monopole du commerce avec l’Asie, le droit d’armer des navires et d’administrer des terres. Bourbon devient son escale : de l’eau, du bois, des vivres pour les vaisseaux de Lorient qui vont aux Indes.',
  v:'L’île est une escale avant d’être une colonie.',h:'Archive : Compagnie française des Indes orientales fondée en 1664 ; Bourbon en dépend jusqu’en 1767-1769, quand le Roi rachète les îles.',
  o:[{n:'Servir la Compagnie',d:'Elle achète vos vivres à prix fixé et vous protège. Colonie +6, vivres +3. Ses guerres seront les vôtres.',fx:{ami:6,vivres:3},f:()=>{C112().cie=1},hist:1},
   {n:'Commercer avec tous les navires qui passent',d:'Pirates, Hollandais, Anglais : on vend plus cher, sans protection. Vivres +5, colonie −4.',fx:{vivres:5,ami:-4},f:()=>{C112().libreEch=1}}]},
 comp1700:{y:1700,si:()=>S&&S.voieC,tag:'Archive',an:'vers 1700',t:'Les pigeons des navires',
  b:'Les vaisseaux de la Compagnie embarquent à Lorient des cages de pigeons bisets : ils supportent le voyage, mangent du grain, et donnent de la viande fraîche. À l’escale, on débarque ceux qui restent. Les habitants bâtissent des pigeonniers pour nourrir les équipages de passage.',
  v:'Tout le bétail de l’île est venu par bateau : volailles, cochons, cabris, pigeons.',h:'Archive : pas de pigeon voyageur entre la France et l’île — un pigeon ne retrouve pas un navire en mer. Le courrier voyage à bord des vaisseaux.',
  o:[{n:'Bâtir un pigeonnier pour les navires',d:'Vivres +3 par saison pendant quelques années, colonie +2.',fx:{ami:2},f:()=>{C112().pigeonnier=1;(S.sv=S.sv||{}).pigeons=1},hist:1},{n:'Garder les grains pour les gens',d:'Vivres +4.',fx:{vivres:4}}]},
 comp1746:{y:1748,si:()=>S&&S.voieC&&C112().cie,tag:'Archive',an:'1746-1748',t:'Madras rendue',
  get b(){return 'Madras, prise par La Bourdonnais, est rendue aux Anglais à la paix. Dupleix, à Pondichéry, accuse La Bourdonnais de l’avoir vendue contre rançon ; la Compagnie le rappelle et l’enferme à la Bastille.'+(C112().cie?' Vos navires et vos bras sont partis avec l’escadre.':'')},
  v:'La guerre des deux Compagnies arrive dans l’océan Indien.',h:'Archive : prise de Madras en 1746 (guerre de Succession d’Autriche), rendue à la paix d’Aix-la-Chapelle (1748).',
  get o(){return C112().cie?[{n:'Fournir hommes et vivres à l’escadre',d:'Bras −1 cette saison, vivres −4, colonie +8.',fx:{bras:-1,vivres:-4,ami:8},hist:1},{n:'Se faire oublier',d:'Colonie −6 : la Compagnie n’oublie pas.',fx:{ami:-6}}]:[{n:'Regarder passer les vaisseaux',d:'Rien ne change.',fx:{},hist:1}]}},
 comp1761:{y:1761,si:()=>S&&S.voieC&&C112().cie,tag:'Archive',an:'1757-1763',t:'Pondichéry tombe',
  b:'Aux Indes, les Anglais de Robert Clive battent les Français et leurs alliés. Pondichéry est prise. Au traité de Paris, la France ne garde que cinq comptoirs sans armée. La Compagnie est ruinée.',
  v:'Les Anglais deviennent les maîtres de l’Inde.',h:'Archive : guerre de Sept Ans ; Plassey (1757), prise de Pondichéry (1761), traité de Paris (1763).',
  o:[{n:'Encaisser la ruine de la Compagnie',d:'Vivres −6, colonie −5 : elle ne paie plus vos récoltes.',fx:{vivres:-6,ami:-5},hist:1},{n:'Vendre en cachette aux Anglais',d:'Vivres +2, colonie −8.',fx:{vivres:2,ami:-8}}]},
 comp1769:{y:1769,si:()=>S&&S.voieC&&C112().cie,tag:'Archive',an:'1767-1769',t:'La fin du monopole',
  b:'La Compagnie, ruinée par les guerres, perd son monopole. Le Roi rachète les Mascareignes : Bourbon devient colonie royale.',
  v:'L’île passe de la Compagnie au Roi.',h:'Archive : monopole suspendu en 1769 ; une nouvelle Compagnie renaît en 1785 et disparaît en 1793.',
  get o(){const L=[{n:'Servir le Roi',d:'Colonie +3.',fx:{ami:3},hist:1}];L.push({n:'Racheter les parts : Bourbon devient sa propre Compagnie',d:UC112('les habitants rachètent les navires et les comptoirs. Colonie +10, cohésion −3. L’île commerce en son nom.'),fx:{ami:10,coh:-3},f:()=>{C112().compB=1}});return L}},
 voc1799:{y:1799,si:()=>S,tag:'Archive',an:'1799',t:'La chute de la VOC',
  get b(){return 'La Compagnie hollandaise des Indes fait faillite. Ses patrouilles cessent dans les détroits. Des sultanats et des pirates de Sulu prennent la mer ; des marins sans solde se font contrebandiers. Dans l’océan Indien, ce sont les corsaires de l’île de France, comme Surcouf, qui chassent les navires anglais.'+(C112().compB?' Les navires de la Compagnie de Bourbon reprennent les routes laissées vides.':'')},
  v:'Un vide sur les mers.',h:'Archive : faillite de la VOC en 1799 ; essor de la piraterie en Asie du Sud-Est ; guerre de course depuis Maurice.',
  get o(){return S.voieC?[{n:'Armer des corsaires',d:'Vivres +5, colonie +3, traque +2.',fx:{vivres:5,ami:3},hist:1},{n:'Commercer prudemment',d:'Cohésion +2.',fx:{coh:2}}]:[{n:'Écouter les marins déserteurs',d:'Ils parlent de routes libres jusqu’à l’Afrique. Savoir +1.',fx:{},f:()=>{C112().routes=1;S.sav=(S.sav||0)+1},hist:1}]}},
 // --- les mythes s'en emparent ---
 mythRegistre:{y:1730,si:()=>S&&!S.voieC,tag:'Mythe',an:'récit des Hauts',nat:'Mythe créé pour le jeu.',t:'Le grand livre de la Compagnie',
  b:'On raconte qu’au magasin de la Compagnie, à Saint-Paul, un grand livre garde le nom de chaque captif débarqué, et son prix. Les anciens disent : tant que le nom est dans le livre, l’esprit ne peut pas rentrer au pays.',
  v:'Un récit qui dit que l’écriture enchaîne.',
  o:[{n:'Descendre voler le livre',d:'Traque +8, mystique +5 : les noms sont lus au camp, un par un, et rendus.',fx:{traque:8,myst:5},f:()=>{C112().livre=1;log('Le grand livre de la Compagnie est au camp : on lit les noms la nuit.')}},{n:'Laisser le livre',d:'Cohésion +1.',fx:{coh:1},hist:1}]},
 // --- l'axe d'Afrique australe ---
 mythNyassa:{y:1860,si:()=>S&&!S.voieC&&(S.pir||S.lib||C112().routes||C112().livre||(S.myst||0)>=12),tag:'Mythe',an:'XIXᵉ siècle',nat:'Mythe et uchronie créés pour le jeu ; le Nyassaland (actuel Malawi) est réel.',t:'Le chant du lac Nyassa',
  b:UC112('des engagés arrivent du Mozambique ; l’un d’eux connaît un chant du lac Nyassa. Les anciens y reconnaissent un chant du camp. Les marrons envoient par les navires pirates leurs savoirs, leurs charmes et des fusils : le pays du lac et les terres du Zambèze se libèrent avant qu’une compagnie anglaise ne vienne les prendre.'),
  v:'Le Nyassaland et le futur Zimbabwe ne seront pas colonisés.',h:'Réel : le Nyassaland devient protectorat britannique (1891), indépendant sous le nom de Malawi en 1964. Des engagés mozambicains sont venus à La Réunion après 1848.',
  o:[{n:'Envoyer les navires',d:'Vivres −6, mystique +6, cohésion +4.',fx:{vivres:-6,myst:6,coh:4},f:()=>{C112().zimLib=1;log('Le pays du lac Nyassa est libre : un lien de chants et de navires le relie aux Hauts.')}},{n:'Garder le chant',d:'Mystique +2.',fx:{myst:2},hist:1}]},
 rhodes1890:{y:1890,si:()=>S&&(S.voieC||!C112().zimLib),tag:'Archive',an:'1889-1895',t:'La compagnie de Cecil Rhodes',
  b:'Cecil Rhodes, roi des diamants de Kimberley (De Beers), fonde la British South Africa Company. Par la ruse et la force, elle prend les terres au nord du Limpopo, contre les Ndébélés et les Shonas. On leur donne son nom : la Rhodésie.',
  v:'Une compagnie à charte, comme celle des Indes deux siècles plus tôt.',h:'Archive : BSAC 1889-1923 ; guerres de 1893 et Chimurenga de 1896-1897 ; Rhodes, figure aujourd’hui très contestée (Glen Grey Act, « Rhodes Must Fall »). Elle n’a jamais croisé la Compagnie des Indes : un siècle les sépare.',
  get o(){return S.voieC?[{n:'Regarder vers l’Afrique australe',d:'Colonie +2.',fx:{ami:2},f:()=>{C112().rhod=1},hist:1},{n:'Ne pas s’en mêler',d:'Cohésion +1.',fx:{coh:1}}]:[{n:'Se souvenir du pays du lac',d:'Mystique +1.',fx:{myst:1},hist:1}]}},
 mythRhodes:{y:1902,si:()=>S&&(C112().zimLib||C112().rhod||BR88().anc),tag:'Mythe',an:'1902',nat:'Mythe créé pour le jeu, autour d’un personnage réel.',t:'L’homme aux diamants',
  get b(){return C112().zimLib?'On raconte qu’un Anglais malade, chassé du Zambèze libre, débarque à Saint-Denis avec une carte : sous le Piton des Neiges dormirait un diamant plus gros que ceux de Kimberley. Il monte, il creuse, il ne redescend pas. Les marrons disent qu’il garde encore la porte, et qu’on l’entend compter.':'On raconte que Cecil Rhodes, malade, rêve d’une île volcanique où le diamant pousserait dans la lave. Après sa mort, des chercheurs viennent creuser les remparts de Cilaos avec sa carte. Ils ne trouvent que de la pierre ; la carte reste au magasin de Saint-Denis.'},
  v:'Rhodes devient un personnage des contes de l’île.',h:'Réel : Rhodes meurt en 1902 près du Cap, enterré dans les collines de Matobo (Zimbabwe). Il n’est jamais venu à La Réunion.',
  o:[{n:'Garder le conte',d:'Mystique +2.',fx:{myst:2},hist:1}]},
 rhod1965:{y:1965,si:()=>S&&S.voieC&&(C112().compB||BR88().empire||BR88().barons||C112().rhod),tag:'Mythe',an:'11 novembre 1965',nat:'Uchronie créée pour le jeu ; l’indépendance unilatérale de la Rhodésie est réelle.',t:'Salisbury tend la main',
  b:UC112('à Salisbury, le gouvernement de Ian Smith proclame l’indépendance de la Rhodésie sans l’accord de Londres. Ses envoyés débarquent à Saint-Denis : ils proposent un axe. Bourbon, souveraine, servirait de port à la Rhodésie sous sanctions.'),
  v:'Une souveraineté à ce prix serait celle d’une minorité.',h:'Réel : l’indépendance de 1965 maintient au pouvoir une minorité blanche ; jamais reconnue, sanctionnée, elle mène à une guerre de quinze ans. La Réunion, elle, est département depuis 1946.',
  o:[{n:'Rester département',d:'Comme dans l’histoire réelle. Cohésion +3.',fx:{coh:3},hist:1},{n:'Proclamer Bourbon souveraine, avec Salisbury',d:'Colonie +12, cohésion −12, santé −4 : sanctions, port fermé, l’île se divise.',fx:{ami:12,coh:-12,sante:-4},f:()=>{C112().souv=1;log('Uchronie : Bourbon souveraine, liée à la Rhodésie. Les navires étrangers ne viennent plus.')}}]},
 rhod1980:{y:1980,si:()=>S&&(C112().souv||C112().zimLib),tag:'Mythe',an:'1980',nat:'Uchronie créée pour le jeu ; l’indépendance du Zimbabwe en 1980 est réelle.',
  get t(){return C112().souv?'La fin de l’axe':'Du lac à l’île'},
  get b(){return C112().souv?UC112('à Lancaster House, la Rhodésie cède : des élections, et le Zimbabwe naît. L’axe tombe. À Saint-Denis, on se demande ce que vaut une souveraineté gardée contre la plupart de ses habitants.'):UC112('le Zambèze libre, le pays du lac et l’île des marrons ne font plus qu’un : une fédération de l’océan au lac Nyassa. On choisit sa capitale au milieu de l’océan : Saint-Denis.')},
  v:'L’île au centre.',h:'Réel : accords de Lancaster House (1979), indépendance du Zimbabwe le 18 avril 1980.',
  get o(){return C112().souv?[{n:'Rendre le pouvoir à tous',d:'Cohésion +10, colonie −8.',fx:{coh:10,ami:-8},f:()=>{C112().souv=0}},{n:'Tenir encore',d:'Cohésion −8, santé −4.',fx:{coh:-8,sante:-4}}]:[{n:'Faire de Saint-Denis la capitale commune',d:'Mystique +6, cohésion +6.',fx:{myst:6,coh:6},f:()=>{C112().fedNyassa=1;log('Uchronie : une fédération de l’océan au lac Nyassa, capitale Saint-Denis.')}}]}},
 mythCentre:{y:1990,si:()=>S&&[C112().livre,C112().zimLib,C112().compB,S.pigR111,(S.galet103||{}).src!=null,BR88().villele].filter(Boolean).length>=2,tag:'Mythe',an:'aujourd’hui',nat:'Mythe créé pour le jeu.',t:'Le nœud de l’océan',
  b:'Les vieux conteurs relient tout : le livre de la Compagnie, le galet qui vient du cœur de la montagne, le pigeon rose qui connaît les passages, les navires vers le lac Nyassa, l’homme aux diamants qui creuse sous le Piton. Les routes des compagnies, disent-ils, n’ont jamais fait que tourner autour de l’île : c’est ici que les fils se nouent.',
  v:'L’île au centre de ses propres mythes.',o:[{n:'Raconter encore',d:'Mystique +4, cohésion +3.',fx:{myst:4,coh:3}}]}
});
// Les répercussions dans la Vie et l'Histoire : le pigeonnier nourrit tant que les navires passent
setInterval(()=>{try{if(!S||S.fin||!C112().pigeonnier||S.year>1769)return;const ns=S.ns||0;if(C112().pigN===ns)return;C112().pigN=ns;S.vivres=(S.vivres||0)+3}catch(e){}},2000);
// ===== L'homme aux diamants devient une figure de l'île quand une utopie donne du poids à la Rhodésie =====
// Bourbon souveraine liée à Salisbury, l'île des Lumières, la piraterie marronne et le Zambèze libre ; chacun en fait un personnage différent.
EV.mythRhodes.si=()=>S&&(C112().souv||C112().rhod||C112().zimLib||C112().compB||S.uchLum||BR88().lib||BR88().cors||S.pir);
Object.defineProperty(EV.mythRhodes,'b',{configurable:true,get(){const B=C112();
 if(B.souv||(B.rhod&&B.compB))return 'Dans la Bourbon souveraine, on fait de Cecil Rhodes un saint laïc : une statue au Barachois, son nom sur une bourse pour les fils des grandes familles, une carte de « l’axe » de Saint-Denis à Salisbury. Dans les cases, on raconte autre chose : que l’homme aux diamants ne dort pas à Matobo, mais sous le Piton, et qu’il compte encore ce qu’on lui doit.';
 if(S.uchLum)return 'Dans l’île des Lumières, l’Académie de Saint-Denis reçoit un legs : l’argent des diamants de Rhodes, pour instruire « les meilleurs ». Les savants refusent de choisir qui sont les meilleurs. On garde l’argent, on efface le nom, et l’on raconte aux enfants l’histoire de l’homme qui voulait tracer une ligne rouge du Cap au Caire et qui finit en note de bas de page.';
 if(B.zimLib||BR88().lib||BR88().cors||S.pir)return 'Les marrons et leurs amis pirates racontent que Rhodes, chassé du Zambèze libre, a voulu se venger sur l’île. Son navire chargé de diamants s’est brisé sur les récifs de Saint-Philippe. Depuis, les nuits de houle, on voit « Kapitèn Diaman » marcher sur la coulée, une lanterne à la main, cherchant la carte que les pirates lui ont prise.';
 return 'On raconte que Cecil Rhodes, malade, rêve d’une île volcanique où le diamant pousserait dans la lave. Après sa mort, des chercheurs viennent creuser les remparts de Cilaos avec sa carte. Ils ne trouvent que de la pierre ; la carte reste au magasin de Saint-Denis.'}});
