// ===== p261 : le Sud, avant les colons — jusqu'aux années 1720, au-delà de l'Étang-Salé, il n'y a pas d'habitations : les Hauts du Sud
// (Bras de la Plaine, Dimitile, Rivière Saint-Étienne) sont un pays marron. Les camps du Sud naissent tôt (1690-1725) ;
// quand Saint-Louis (1726) puis Saint-Pierre (1735) sont fondés, les colons s'installent sur une terre déjà habitée. =====
Object.assign(EV,{
 sud261:{y:1715,tag:'Mémoire',an:'avant 1726',si:()=>S&&!S.voieC&&S.year>=1705&&S.year<1726,t:'Le Sud est aux marrons',
  b:'Au-delà de l’Étang-Salé, pas une habitation : la Rivière Saint-Étienne, le Bras de la Plaine, les plateaux du Dimitile, tout cela n’appartient à personne d’en bas. Les bandes y chassent, y plantent, s’y croisent. Les colons ne viennent pas jusque-là.',
  h:'Le Sud est colonisé tardivement : Saint-Louis est fondé vers 1726, Saint-Pierre vers 1735. En 1743, l’influence de Dimitile s’étend des Hauts de Saint-Paul à ceux de Saint-Pierre ; les grands camps du Bras de la Plaine (Laverdure, tué en 1752) sont dans le Sud. Que le Sud ait été un « territoire marron » avant les colons est une lecture vraisemblable, reconstituée par le jeu.',
  o:[{n:'Envoyer des chasseurs dans le Sud',d:'Vivres +3, savoir +1',fx:{vivres:3,savoir:1}},{n:'Y établir des alliances',d:'Amitiés entre bandes, cohésion +2',fx:{coh:2}}]},
 sudc261:{y:1735,tag:'Archive',an:'1726 – 1735',si:()=>S&&S.voieC&&S.year>=1726,t:'Une terre déjà habitée',
  b:'On fonde Saint-Louis, puis Saint-Pierre. Mais les Hauts du Sud ne sont pas vides : les détachements y trouvent des cases, des champs de songes, des feux éteints depuis peu. Les nouveaux concessionnaires réclament des patrouilles avant même d’avoir planté.',
  h:'Fondation de Saint-Louis (vers 1726) et de Saint-Pierre (vers 1735) ; présence marronne attestée dans les Hauts du Sud (Dimitile, Bras de la Plaine) par les rapports des détachements des années 1740-1750.',
  o:[{n:'Armer les nouveaux quartiers',d:'Traque +4',fx:{traque:4}},{n:'S’installer d’abord sur la côte',d:'Entente +2',fx:{coh:2}}]}
});
Object.assign(EV,{
 plaines261:{y:1745,tag:'Mémoire',an:'les Plaines',si:()=>S&&!S.voieC&&S.year>=1735&&S.year<1848,t:'Le passage des Plaines',
  b:'Entre le Sud et l’Est, il y a les Plaines : la Plaine des Cafres, froide et nue, les gorges de Grand Bassin, les pentes du volcan. Personne n’y vit, mais tout le monde y passe : ceux du Dimitile qui vont voir ceux de Bébour, les fugitifs de Saint-Pierre qui cherchent l’Est, les messagers des chefs. Dans les brumes, un détachement ne voit pas à dix pas.',
  h:'La Plaine des Cafres, Grand Bassin et les pentes de la Fournaise ont servi de zones de passage et de repli entre le Sud et l’Est ; la toponymie en garde la trace (Îlet Marron, Îlet Maron, Pays Brûlé sur la carte des toponymes du Service régional de l’archéologie). Le rôle de passage entre les bandes est reconstitué par le jeu.',
  o:[{n:'Tenir le passage des Plaines',d:'Cohésion +2, traque −2',fx:{coh:2,traque:-2}},{n:'N’y passer que dans la brume',d:'Traque −3, vivres −1',fx:{traque:-3,vivres:-1}}]}
});
Object.assign(EV,{
 simang261:{y:1750,tag:'Mémoire',an:'les Trois Salazes',si:()=>S&&!S.voieC&&S.year>=1740,t:'Simangalove (Simangavole)',
  b:'Simangavole est l’une des huit filles d’Anchaing et d’Héva, raconte-t-on, et elle siégeait avec les chefs marrons. Elle est partie de l’Est et a traversé les Hauts jusqu’au centre de l’île. Aujourd’hui, dans une caverne profonde des Trois Salazes, au-dessus de Cilaos, elle vit avec la bande de Matouté : Simangalove, guerrière et conseillère. On dit qu’elle fut le onzième chef de ceux qui combattent la colonie. Chez les marrons, une femme peut mener une bande.',
  h:'Simangalove, compagne du chef Matouté (caverne des Trois Salazes, Cilaos), guerrière et conseillère, « onzième chef » des marrons combattant le pouvoir colonial, selon le portail de l’esclavage (« Les femmes marronnes »). Le lieu et la date de sa capture ou de sa mort ne sont pas connus. Sa filiation (fille d’Anchaing et d’Héva, assise avec les chefs) et son départ de l’Est vers Cilaos viennent de la tradition, rapportée notamment par l’écrivain Patrice Treutard. Son nom vit encore : depuis 1998, Simangavole est un groupe de maloya mené par des femmes, autour de Katy Toave (« maloya manière fanm »).',
  o:[{n:'Lui demander conseil',d:'Gardiens +2, savoir +1',fx:{gardiens:2,savoir:1}},{n:'Lui confier une expédition',d:'Vivres +2, traque +2',fx:{vivres:2,traque:2}}]}
});
Object.assign(EV,{
 petitm261:{y:1745,tag:'Mémoire',an:'Saint-Denis, chef-lieu depuis 1738',t:'Le petit marronnage',
  get b(){return S&&S.voieC?'À Saint-Denis, chaque semaine, une déclaration de plus : un domestique, un charpentier, un docker du Barachois a disparu. Pas pour les Hauts : il se cache au Butor, dans les cases du bord de la Rivière Saint-Denis, chez un parent, le temps que la colère du maître retombe. Certains tentent de monter à bord d’un navire en partance.':'Tous ne montent pas jusqu’à nous. En bas, à Saint-Denis, on fuit pour quelques jours : au Butor, au bord de la rivière, chez un parent. On revient, ou on est repris. Ceux-là nous apportent des nouvelles, du sel, parfois un couteau.'},
  h:'L’ordonnance de 1772 distingue les « petits marrons » (moins d’un mois) des grands. Le petit marronnage urbain, dans les faubourgs de Saint-Denis, et les tentatives d’embarquement clandestin sont décrits par l’historiographie ; les lieux nommés viennent de la mémoire locale.',
  get o(){return S&&S.voieC?[{n:'Faire surveiller les faubourgs',d:'Traque +3, entente −1',fx:{traque:3,coh:-1}},{n:'Fermer les yeux',d:'Entente +1',fx:{coh:1}}]:[{n:'Garder le lien avec ceux d’en bas',d:'Savoir +2, traque +1',fx:{savoir:2,traque:1}}]}},
 diore261:{y:1740,tag:'Mémoire',an:'la forêt de Dioré',si:()=>S&&!S.voieC&&S.year>=1720,t:'La forêt de Dioré',
  b:'Entre les champs de Saint-André et les gorges de la Rivière du Mât, la forêt de Dioré : pas assez haute pour y vivre longtemps, assez épaisse pour s’y cacher quelques jours. On y attend la nuit, on y regarde les habitations, on y cueille les tisanes, puis on monte vers Salazie. Des abris de feuilles et de bois, que la pluie aura effacés dans un an.',
  h:'Les forêts de moyenne altitude proches des habitations (comme Dioré, de 130 à 836 m) servaient de refuges temporaires et de passages vers les cirques. Leurs abris légers se décomposent vite : c’est une raison pour laquelle l’archéologie retrouve si peu de traces du marronnage (Service régional de l’archéologie).',
  o:[{n:'Faire de Dioré un relais',d:'Gens +1, traque +1',fx:{gens:1,traque:1}},{n:'N’y passer que la nuit',d:'Traque −1',fx:{traque:-1}}]}
});
