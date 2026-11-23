// ===== p214 : la mémoire de l'engagisme — une famille d'engagés indiens, suivie sur l'habitation, de l'arrivée aux petits-enfants =====
// Les noms sont inventés pour le jeu (des prénoms tamouls courants) : aucune famille réelle n'est racontée.
// Faits : des engagés indiens arrivent à La Réunion à partir de 1848-1849, surtout de Pondichéry et Karikal ; à partir de 1860, la quarantaine se fait au lazaret de la Grande Chaloupe.
// Contrat de cinq ans, avec un livret ; les absences sont punies de retenues (la « double peine ») ; beaucoup restent, construisent leurs temples et transmettent leurs fêtes.
const ENG214={pere:'Soupramanien',mere:'Minatchy',fils:'Vélou'};
function eng214(){return (S.pp||[]).filter(p=>p.eng214&&!p.mort)}
Object.assign(EV,{
 eng214a:{y:1861,si:()=>S&&S.voieC&&!S.done.eng214a,tag:'Mémoire',an:'après 1860',nat:'Faits historiques ; la famille est inventée pour le jeu.',t:'Le bateau de Pondichéry',
  get b(){return 'Après quarante jours de mer, le navire mouille devant la Grande Chaloupe. Au lazaret, on compte, on soigne, on attend. Puis une charrette monte vers l’habitation : '+ENG214.pere+', '+ENG214.mere+' et leur petit '+ENG214.fils+' ont signé pour cinq ans. Sur le livret, leur nom est déjà mal écrit.'},
  v:'Ils viennent travailler la canne ; ils apportent leurs dieux.',h:'Engagés indiens à La Réunion à partir de 1848-1849 ; lazaret de la Grande Chaloupe ouvert vers 1860 (quarantaine). Famille inventée.',
  o:[{n:'Leur donner un coin de terre pour leur jardin',d:'Vivres +2 par la suite, cohésion +2.',fx:{coh:2,vivres:2},f:()=>{S.eng214j=1},hist:1},{n:'La canne d’abord, rien d’autre',d:'Récolte +, cohésion −2.',fx:{coh:-2},f:()=>{S.recolte=(S.recolte||0)+3}}]},
 eng214b:{y:1864,si:()=>S&&S.voieC&&S.done.eng214a&&!S.done.eng214b&&eng214().length,tag:'Mémoire',an:'cinq ans plus tard',nat:'Faits historiques ; la famille est inventée pour le jeu.',t:'Le livret',
  get b(){return ENG214.pere+' a fini ses cinq ans. Mais le livret porte des journées « d’absence » : un jour de fièvre, un jour de pluie, chacun retenu deux fois. Le commandeur dit qu’il doit encore six mois.'},
  v:'La loi protège le contrat, rarement l’engagé.',h:'La « double peine » : une journée d’absence coûtait deux journées de salaire ; les rapports de l’époque dénoncent les abus. Famille inventée.',
  o:[{n:'Payer ce qui est dû et le laisser libre de rester ou partir',d:'Cohésion +3, vivres −2.',fx:{coh:3,vivres:-2},hist:1},{n:'Faire valoir le livret',d:'Récolte +, cohésion −4.',fx:{coh:-4},f:()=>{S.recolte=(S.recolte||0)+4;S.eng214dur=1}}]},
 eng214c:{y:1868,si:()=>S&&S.voieC&&S.done.eng214b&&!S.done.eng214c&&eng214().length,tag:'Mémoire',an:'vers 1870',nat:'Faits historiques ; la famille est inventée pour le jeu.',t:'Le petit temple au bord du champ',
  get b(){return 'Au bout de la rangée de canne, '+ENG214.mere+' a posé trois pierres, un pot de camphre, des fleurs jaunes. Le dimanche, d’autres engagés viennent. Ils demandent à bâtir un petit temple, un kovil, avec les planches de l’ancien magasin.'},
  v:'Un lieu à soi, sur la terre d’un autre.',h:'Les premiers temples tamouls de l’île sont bâtis par les engagés sur les habitations, souvent en bois, avant les grands temples de pierre. Famille inventée.',
  o:[{n:'Donner les planches et le coin de terre',d:'Mystique +4, cohésion +3.',fx:{coh:3},f:()=>{S.myst=(S.myst||0)+4;S.eng214k=1},hist:1},{n:'Refuser : pas de temple ici',d:'Cohésion −3 ; ils prient quand même, plus loin.',fx:{coh:-3}}]},
 eng214d:{y:1900,si:()=>S&&S.voieC&&S.done.eng214c&&!S.done.eng214d,tag:'Mémoire',an:'début du XXᵉ siècle',nat:'Faits historiques ; la famille est inventée pour le jeu.',t:'Les petits-enfants',
  get b(){return 'Les petits-enfants de '+ENG214.pere+' parlent créole entre eux et tamoul avec leur grand-mère. Ils portent le nom de la famille, et un prénom chrétien pour l’école. À la fête, ils marchent sur le feu avec les anciens. '+(S.eng214k?'Le kovil de planches est devenu un temple peint.':'Ils prient au bord de la ravine, là où l’on n’a jamais voulu de temple.')},
  v:'D’où l’on vient ne s’efface pas : ça se transmet.',h:'La double appartenance (nom tamoul, prénom chrétien, fêtes hindoues et catholiques) est une réalité de l’île. Famille inventée.',
  o:[{n:'Se souvenir',d:'Cohésion +2, savoir +1.',fx:{coh:2,savoir:1},hist:1}]}
});
// la famille entre à l'habitation à la première fiche
{const ch=typeof choisir==='function'?choisir:null;if(ch)choisir=function(id,i){const r=ch.apply(this,arguments);try{if(id==='eng214a'&&!eng214().length&&typeof nouvellePersonne==='function'){const fa=(S.famN=(S.famN||0)+1);
 const P=[[ENG214.pere,'h',28],[ENG214.mere,'f',24],[ENG214.fils,'h',5]];P.forEach(([n,g,a])=>{const p=nouvellePersonne({fa,or:'in',g,age:a,st:'engagé'});p.n=n;p.st='engagé';p.eng214=1;S.pp.push(p)});
 const pp=eng214();if(pp[0]&&pp[1]){pp[0].cj=pp[1].id;pp[1].cj=pp[0].id;pp[2].mere=pp[1].id}try{journal('Une famille d’engagés arrive à l’habitation : '+ENG214.pere+', '+ENG214.mere+' et '+ENG214.fils+'.')}catch(e){}}}catch(e){}return r}}
