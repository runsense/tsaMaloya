// ===== p247 : l'histoire marronne ne naît pas d'un seul camp. Dans l'Est, des esclaves enfuis des habitations de Sainte-Suzanne
// fondent seuls leur camp à Salazie (Anchaing, Héva et leurs filles) : une dynastie marronne, qui ne rejoint l'alliance des camps que plus tard. =====
const EST247=()=>{try{return near(55.489,-21.077)}catch(e){return null}};
Object.assign(EV,{
 campest247:{y:1736,tag:'Mémoire',an:'vers 1736',si:()=>S&&!S.voieC&&!S.est247,nat:'Les fuites depuis les habitations de l’Est et les camps de Salazie sont attestés ; la famille d’Anchaing appartient à la tradition.',
  t:'Un camp né seul, dans l’Est',
  b:'De Salazie, un sifflement de merle répond au nôtre. Ce ne sont pas des nôtres : des esclaves enfuis des habitations de Sainte-Suzanne ont remonté la rivière du Mât, seuls, sans personne pour les guider. Sur un piton, Anchaing et Héva ont fondé leur camp ; leurs filles grandissent, et déjà on parle d’une famille de chefs.',
  v:'Le marronnage n’a pas un seul berceau : chaque fuite fonde son monde.',
  h:'Le marronnage de l’Est s’est fait depuis les habitations de la côte au vent (Sainte-Suzanne, Saint-André) vers Salazie. La dynastie d’Anchaing et Héva est celle de la tradition orale.',
  o:[{n:'Leur envoyer des présents',d:'Amitiés +2 : un lien se noue',fx:{ami:2},f:()=>{S.est247={lien:1}}},{n:'Les laisser vivre à leur façon',d:'Cohésion +1',fx:{coh:1},f:()=>{S.est247={lien:0}}}]},
 ralest247:{y:1745,tag:'Mémoire',an:'Salazie',si:()=>S&&!S.voieC&&S.est247&&S.est247.lien&&!S.est247.r&&(camps().length>=3||S.year>=1750),nat:'Le ralliement des bandes autour de chefs élus est décrit par les rapports des détachements ; celui-ci est reconstitué par le jeu.',
  t:'Le ralliement de l’Est',
  b:'Les filles d’Anchaing ont épousé des chefs des cirques. Aujourd’hui, la famille du piton de Salazie descend jusqu’à votre camp : elle veut entrer dans l’alliance, avec ses champs de songes, ses guetteurs et ses sifflets.',
  o:[{n:'Accueillir l’Est dans l’alliance',d:'Un camp de plus à Salazie, gens +4, anciens +2',fx:{gens:4,anciens:2},f:()=>{S.est247.r=1;const t=EST247();if(t){const o=tl(t.i);o.s=1;if(!o.b)o.b='camp';o.et=Math.max(o.et||0,2);try{ouvrir(t,2)}catch(e){}try{log('Le camp d’Anchaing, à Salazie, rejoint l’alliance des camps.')}catch(e){}}}},
     {n:'Chacun reste maître chez soi',d:'Amitiés +1',fx:{ami:1},f:()=>{S.est247.r=-1}}]}
});
// (la conque n'est plus l'appel des camps : voir p253, les sifflets des guetteurs)
