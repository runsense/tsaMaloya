// ===== p288 : Louis Payen dans les utopies coloniales.
// 1) Côté colonie, vers 1766 : le « fantôme de Payen » revient hanter les riches descendants des premiers colons — une légende du jeu,
//    qui pousse vers les idées des Lumières (au moment réel où la Compagnie des Indes rend l'île au roi).
// 2) Si l'on commence en 1794 dans une utopie coloniale : une version « et si Payen n'était pas parti », selon le passé choisi —
//    resté et enrichi (café), marchand entre les deux îles (comptoirs), ou en lutte contre la Compagnie (Lumières).
//    Tout est donné comme uchronie ; les faits réels sont à côté. =====
const V288='Faits : Louis Payen débarque à Saint-Paul en novembre 1663 ; le 16 février 1666 il cède « aux Ordres du Roy la souveraineté du pays » contre rétribution, embarque le 20 février sur La Vierge-de-Bon-Port ; le navire est attaqué en juillet 1666 au large de Guernesey. Sa captivité et sa fin en ermite à Vitry-le-François restent mal connues.';
Object.assign(EV,{
 payenFant288:{y:1766,tag:'Utopie',an:'vers 1766',si:()=>S&&S.voieC&&S.year>=1766&&S.year<1785&&!S.done.payenFant288,t:'Le fantôme de Louis Payen',
  b:'À Saint-Paul, dans les grandes maisons des descendants des premiers colons, on parle d’un homme maigre en habit d’un autre siècle. Il passe la nuit devant les magasins, renverse les registres, éteint les lampes. Les esclaves disent l’avoir vu sur le chemin de la grotte des Premiers Français. On murmure son nom : Payen, le premier venu, reparti les mains vides et dépouillé en mer, revenu demander des comptes à ceux qui se sont enrichis ici sur le travail des autres.',
  v:'Le fantôme est une légende du jeu. '+V288+' Vers 1764-1767, la Compagnie des Indes rend les Mascareignes au roi ; des administrateurs royaux comme l’intendant Pierre Poivre (1767-1772) arrivent avec des idées des Lumières.',
  o:[{n:'Écouter ce que dit le fantôme',d:'Les idées des Lumières gagnent vos quartiers : un appui pour l’abolition, cohésion +3, savoir +2.',fx:{coh:3,savoir:2},f:()=>{S.uchLum=1;(S.br=S.br||{}).abolT=1;S.payen288='lum';log('👻 Le fantôme de Payen a parlé : dans les salons de Saint-Paul, on lit les journaux de Paris et l’on parle d’affranchir.')}},
     {n:'Faire bénir les maisons',d:'Mystique +2. Le fantôme s’éloigne… pour un temps.',fx:{myst:2},f:()=>{S.payen288='beni'}},
     {n:'Le faire chercher, armes à la main',d:'On ne trouve rien. Cohésion −1.',fx:{coh:-1},f:()=>{S.payen288='chasse'}}]},
 payenLum288:{y:1789,tag:'Utopie',an:'1789',si:()=>S&&S.voieC&&S.payen288==='lum'&&S.year>=1789&&S.year<1794&&!S.done.payenLum288,t:'La société de Saint-Paul',
  b:'Ceux qui ont écouté le fantôme se réunissent : on lit Raynal et les nouvelles de Paris, on parle de l’homme qui ne voulait pas d’esclaves. Quand arrivent les nouvelles de la Révolution, ils sont prêts.',
  v:'La « société » est une invention du jeu. En 1790, la colonie se dote d’une Assemblée coloniale ; le décret d’abolition de 1794 n’y sera pas appliqué.',
  o:[{n:'Porter leurs idées à l’Assemblée',d:'Cohésion +3, savoir +2.',fx:{coh:3,savoir:2}}]},
 payenUto288:{y:1794,tag:'Utopie',an:'et si…',si:()=>S&&S.voieC&&S.passe&&S.passe!=='hist'&&S.year>=1794&&S.year<1800&&!S.done.payenUto288,
  get t(){return {cafe:'Et si Payen était resté ?',comptoir:'Payen, marchand des deux îles',lumiere:'Payen contre la Compagnie'}[S.passe]||'Et si Payen était resté ?'},
  get b(){return {
   cafe:'Dans cette histoire-là, Louis Payen n’a jamais embarqué en 1666. Il a refusé de céder ses terres de Saint-Paul et planté plus loin : tabac, puis café quand il est arrivé. Ses descendants tiennent aujourd’hui les plus grands domaines de la côte sous le Vent — et leur fortune repose, comme les autres, sur le travail des esclaves.',
   comptoir:'Dans cette histoire-là, Payen est resté, mais il n’a jamais coupé le lien avec Fort-Dauphin, où il avait vécu dix ans. Ses barques font la navette : riz, bœufs, toiles. Sa maison de Saint-Paul est devenue un comptoir, et ses héritiers parlent malgache aussi bien que français.',
   lumiere:'Dans cette histoire-là, Payen a refusé en 1666 de céder la souveraineté du pays à la Compagnie. Les premiers habitants ont tenu tête aux commandants qu’elle envoyait — comme ils le feront vraiment en 1690 contre le commandant Vauboulon. De cette méfiance envers les maîtres de la Compagnie est née, chez ses descendants, une idée : que personne ne devrait en posséder un autre.'}[S.passe]||''},
  v:'Uchronie : '+V288+' En novembre 1690, des habitants de Bourbon arrêtent réellement le commandant Vauboulon, qui mourra en prison.',
  get o(){const p=S.passe;return p==='cafe'?[{n:'Hériter de la fortune Payen',d:'Vivres +6, cohésion −2.',fx:{vivres:6,coh:-2}},{n:'Affranchir une partie des esclaves du domaine',d:'Cohésion +3, vivres −2.',fx:{coh:3,vivres:-2}}]
   :p==='comptoir'?[{n:'Rouvrir la route de Fort-Dauphin',d:'Vivres +4, amitié +2.',fx:{vivres:4,ami:2}}]
   :[{n:'Reprendre le flambeau de Payen',d:'Un appui pour l’abolition, cohésion +3.',fx:{coh:3},f:()=>{(S.br=S.br||{}).abolT=1;S.uchLum=1}},{n:'Garder ça pour les veillées',d:'Savoir +2.',fx:{savoir:2}}]}}});
