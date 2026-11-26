// ===== p334 : l'épopée de La Bourdonnais retrace sa vie, et ce qui l'entoure : avant lui, l'âge des forbans (La Buse,
// la Vierge du Cap, la pendaison de Saint-Paul) ; avec lui, Port-Louis, Saint-Denis capitale, Picault aux Seychelles,
// les tortues de Rodrigues, Madras, puis Dupleix, la Bastille et la fin. Et trois utopies autour de lui, toujours dites
// comme fiction : le mousse de Picault, la fille du cryptogramme, le charpentier du port. =====
{const E=EPC291.bourdonnais;if(E&&!E.p334){E.p334=1;const old=E.ch,poudre=old[1],madras=old[2];E.an='1721-1753';
 E.ch=[
  {t:'La Vierge du Cap',an:'avril 1721',b:'Avant lui, la mer appartient aux forbans. En rade de Saint-Denis, La Buse et l’Anglais John Taylor prennent un grand vaisseau portugais, la Vierge du Cap, chargé d’or, de diamants et d’objets d’église de Goa. Sur la plage, on regarde, et personne ne bouge.',v:'Fait réel : la prise de la Nossa Senhora do Cabo, en avril 1721, en rade de Bourbon, l’un des plus gros butins de la piraterie.'},
  {t:'La pendaison de Saint-Paul',an:'7 juillet 1730',b:'Olivier Levasseur, dit La Buse, est pendu à Saint-Paul. La tradition dit qu’il lance à la foule un papier chiffré : « Mon trésor à qui saura le prendre ! »',v:'La pendaison est dans les archives. Le cryptogramme lancé à la foule est une tradition : le document qu’on dit être le sien n’est apparu que bien plus tard.'},
  old[0],
  {t:'Saint-Denis, capitale',an:'1738',b:'À Bourbon, le siège du gouvernement passe de Saint-Paul à Saint-Denis. La même année, à l’île de France, meurt sa femme, Marie-Anne. Il continue : routes, moulins, magasins, chantiers.',v:'Saint-Denis devient le chef-lieu de Bourbon en 1738. Ces chantiers sont bâtis par des esclaves venus de Madagascar, du Mozambique et de l’Inde.'},
  {t:'Les tortues de Rodrigues',an:'vers 1740',b:'Rodrigues n’a presque pas d’habitants. Ses tortues géantes, si : on les embarque par milliers pour nourrir les équipages et les deux îles.',v:'Réel : les tortues de Rodrigues sont prélevées en masse au XVIIIᵉ siècle, jusqu’à disparaître. Le peuplement durable de l’île commence à la fin du siècle.'},
  {t:'Les îles de La Bourdonnais',an:'1742 – 1744',b:'Il envoie Lazare Picault reconnaître un archipel de granit au nord, repaire des forbans d’autrefois. Au second voyage, Picault donne à la grande île le nom de Mahé, et à l’ensemble celui d’« îles de La Bourdonnais ».',v:'Réel : expéditions de Picault en 1742 et 1744. Le nom de Séchelles s’impose en 1756 ; les premiers colons arrivent en 1770.'},
  poudre,madras,
  {t:'Dupleix, la Bastille',an:'1746 – 1753',b:'Il a promis Madras contre rançon ; Dupleix, gouverneur de Pondichéry, refuse et garde la ville. Rentré en France, La Bourdonnais est accusé et enfermé à la Bastille.',v:'Réel : emprisonné de 1748 à 1751, acquitté, il meurt à Paris en 1753.'}];}}
// les marches : la plage de Saint-Denis, la place de Saint-Paul, le barachois, la nouvelle capitale
if(typeof PAS327!=='undefined'){const D=PAS327.bourdonnais;D.c={
 0:{h:{n:'un habitant de Saint-Denis, quatorze ans avant La Bourdonnais',m:'p7_colon'},r:[[55.458,-20.884],[55.453,-20.878],[55.449,-20.874]],b:[0,0],o:'Descendre sur la plage, d’où l’on voit les navires'},
 1:{h:{n:'une habitante de Saint-Paul, avant La Bourdonnais',m:'colone'},r:[[55.290,-21.006],[55.280,-21.008],[55.272,-21.009]],b:[0,0],o:'Aller sur la place, où l’on dresse la potence'},
 2:{r:[[55.449,-20.874],[55.452,-20.881],[55.455,-20.888]],b:[0,0],o:'Descendre du barachois jusqu’à la maison du gouvernement'},
 3:{r:[[55.455,-20.888],[55.450,-20.884],[55.446,-20.880]],b:[0,0],o:'Parcourir les chantiers de la nouvelle capitale'}};}
// ----- trois utopies autour de lui (fiction) -----
Object.assign(EPC291,{
 mousse334:{fic:'de l’archipel libre',n:'Ti-Paul, le mousse de Picault',an:'1742-1770',y:0,ch:[
  {t:'L’archipel vide',an:'1742',b:'Ti-Paul, mousse sur le navire de Picault, voit des plages sans personne, des tortues partout, des criques où les forbans réparaient leurs navires. Il se dit qu’ici, on pourrait vivre sans maître.',v:'Ti-Paul est un personnage de fiction. Les voyages de Picault (1742, 1744) sont réels.'},
  {t:'Ceux qui débarquent la nuit',an:'1750',jeu:['cmd','negrier'],b:'Revenu en secret, il fait débarquer de nuit des captifs d’un navire négrier : l’archipel sera leur refuge.',v:'Uchronie du jeu. En réalité, les premiers à s’installer seront des colons, avec des esclaves, en 1770.'},
  {t:'L’île sans registre',an:'1770',b:'Quand les colons arrivent, ils trouvent des jardins, des cases, et des gens qui n’appartiennent à personne.',v:'Uchronie du jeu.'}]},
 crypto334:{fic:'du trésor partagé',n:'Nanon, la fille du cryptogramme',an:'1730-1750',y:0,ch:[
  {t:'Le papier dans la foule',an:'7 juillet 1730',b:'Sur la place de Saint-Paul, une servante, Nanon, ramasse le papier que La Buse a lancé. Elle ne sait pas lire. Pas encore.',v:'Nanon est un personnage de fiction ; la pendaison est réelle, le cryptogramme une tradition.'},
  {t:'Apprendre à lire',an:'1736',b:'Elle apprend les lettres en cachette, avec un prêtre qui ferme les yeux, puis les chiffres du papier.',v:'Fiction du jeu.'},
  {t:'Le trésor qui rachète',an:'1750',jeu:['duel','colon','gouverneur'],b:'Le trésor trouvé, elle ne le garde pas : elle rachète, une à une, des libertés devant le notaire. Le gouverneur veut saisir l’or.',v:'Uchronie : le trésor de La Buse n’a jamais été trouvé.'}]},
 charp334:{fic:'de Port-Louis sans chaînes',n:'Moussa, charpentier du port',an:'1735-1746',y:0,ch:[
  {t:'Le chantier',an:'1737',b:'Moussa, esclave venu du Mozambique, est charpentier sur le chantier naval de Port-Louis. Sans lui et les siens, pas de navires pour le gouverneur.',v:'Moussa est un personnage de fiction. Le chantier naval de Port-Louis, bâti et tenu par des esclaves et des ouvriers, est réel.'},
  {t:'Le marché du charpentier',an:'1745',b:'L’escadre pour Madras doit partir. Les charpentiers posent leurs outils : pas de navires sans la liberté au retour.',v:'Uchronie du jeu.'},
  {t:'Les gens du port',an:'1746',jeu:['bat','comp'],b:'Libres, ils défendent le port quand les planteurs veulent les remettre aux fers.',v:'Uchronie du jeu.'}]}});
if(typeof COTE319!=='undefined')Object.assign(COTE319,{mousse334:'m',crypto334:'c',charp334:'m'});
if(typeof PAS327!=='undefined')Object.assign(PAS327,{
 crypto334:{h:{n:'Nanon',m:'servante'},c:{0:{r:[[55.290,-21.006],[55.280,-21.008],[55.272,-21.009]],b:[0,0],o:'Se glisser jusqu’à la place, où l’on pend La Buse'},1:{r:[[55.272,-21.009],[55.278,-21.004],[55.284,-21.000]],b:[0,0],o:'Aller de nuit chez le prêtre, apprendre les lettres'},2:{r:[[55.284,-21.000],[55.278,-21.004],[55.272,-21.010]],b:[0,0],o:'Porter l’or jusqu’au notaire'}}}});
// ----- les grandes figures -----
if(typeof FIG263!=='undefined')FIG263.push(['La Buse (Olivier Levasseur)','Saint-Paul','archives','Forban, il prend la Vierge du Cap en rade de Saint-Denis en 1721 ; pendu à Saint-Paul le 7 juillet 1730. Le cryptogramme qu’on lui prête relève de la tradition.',1730],
 ['La Bourdonnais','Saint-Denis','archives','Gouverneur général des îles de France et de Bourbon de 1735 à 1746 : Port-Louis, Saint-Denis capitale, Madras ; la Bastille, l’acquittement, la mort en 1753.',1753],
 ['Lazare Picault','Seychelles','archives','Envoyé par La Bourdonnais, il reconnaît l’archipel en 1742 et 1744 et nomme Mahé.',0],
 ['Dupleix','Pondichéry','archives','Gouverneur de Pondichéry ; il refuse la rançon de Madras négociée par La Bourdonnais en 1746.',0]);
