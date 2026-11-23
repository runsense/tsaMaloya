// ===== p249 : ce que les marrons ont inventé pour tenir dans l'intérieur — les chausse-trapes des passages étroits, les cavernes murées de pierre sèche,
// le feu sans fumée, et les jardins cachés sous la canopée. =====
Object.assign(EV,{
 trapes249:{y:1745,tag:'Mémoire',an:'les Hauts',si:()=>S&&!S.voieC&&S.year>=1742,t:'Les chausse-trapes',
  b:'Le passage vers le camp ne laisse monter qu’un homme à la fois. Sous les feuilles, on plante des piquets de bois durcis au feu ; plus haut, un tas de roches attend qu’on coupe la liane qui le retient. Le guetteur, sur la crête, voit venir le détachement d’une journée.',
  h:'Guet sur les crêtes, passages uniques et pièges sont décrits pour les camps de l’intérieur (Dimitile, pitons de Salazie) ; les rapports des détachements en font état.',
  o:[{n:'Piéger le passage',d:'Gardiens +3, traque −2',fx:{gardiens:3,traque:-2}},{n:'Doubler les guetteurs',d:'Cohésion +1, traque −3',fx:{coh:1,traque:-3}}]},
 caverne249:{y:1738,tag:'Mémoire',an:'à flanc de rempart',si:()=>S&&!S.voieC&&S.year>=1735,t:'La caverne murée',
  b:'Le froid des Hauts tue plus sûrement que les chasseurs. On choisit une caverne à flanc de rempart, on en mure l’entrée de pierres sèches : de loin, ce n’est qu’un éboulis. Le feu ne s’allume que la nuit ou dans la brume, avec du bois bien sec qui fume peu. Et pour venir, on marche dans le lit de la ravine, de roche en roche.',
  h:'Abris sous roche à l’entrée murée de pierres sèches, attestés par l’archéologie (Vallée Secrète à Cilaos, au-dessus de 2 000 m) ; feux discrets et déplacements dans les ravines sont rapportés par les témoignages et les rapports de chasse.',
  o:[{n:'Murer la caverne',d:'Santé +2, traque −2',fx:{sante:2,traque:-2}},{n:'Le feu seulement dans la brume',d:'Traque −3, santé −1',fx:{traque:-3,sante:-1}}]},
 jardins249:{y:1748,tag:'Mémoire',an:'sous la canopée',si:()=>S&&!S.voieC&&S.year>=1745,t:'Les jardins cachés',
  b:'Sous les grands arbres, on défriche une parcelle grande comme une case : des cambares, des songes, des patates douces, un peu de maïs, quelques pieds de tabac. D’en haut, on ne voit que la forêt. Pour le sel, le fer et la toile, il faudra descendre, une nuit, chez ceux des habitations qui nous attendent.',
  h:'Les rapports des détachements décrivent des cultures (maïs, tabac, racines) près des camps du grand marronnage ; les descentes nocturnes, avec la complicité d’esclaves des habitations, sont attestées.',
  o:[{n:'Agrandir les jardins',d:'Vivres +3, traque +1',fx:{vivres:3,traque:1}},{n:'Descendre chercher le fer et le sel',d:'Savoir +2, traque +3',fx:{savoir:2,traque:3}}]}
});
