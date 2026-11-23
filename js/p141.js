
// ===== p141 : les espèces « en noir » des listes rouges (EX : éteinte dans le monde ; RE : disparue de La Réunion) qui manquaient =====
// Source : dossier de presse de la Liste rouge de la faune de La Réunion (UICN, 2010) et Liste rouge de la flore vasculaire (2023), envoyés par l’auteur.
// Les listes ne donnent pas de date de disparition : les dates ci-dessous sont des ordres de grandeur choisis pour le jeu ; elles bougent ensuite selon les pressions (p135).
const NOIR141=[
 ['pigeonRose',1700,'Le pigeon rose de la Réunion','Un pigeon rose des forêts, décrit par les premiers voyageurs. Facile à tirer, il ne survit pas longtemps aux premiers fusils.','EX','foret'],
 ['faucon',1700,'Le faucon de Dubois','Un petit faucon propre à l’île, cité par le voyageur Dubois dans les années 1670. On ne le revoit plus ensuite.','EX','foret'],
 ['rale',1690,'Le râle de la Réunion','Un râle des forêts et des marais, qui volait mal. Les rats, les chats et les cochons lâchés dans l’île trouvent ses nids.','EX','hauts'],
 ['petitDuc',1680,'Le petit-duc de Gruchet','Une petite chouette de l’île, connue seulement par ses os. Elle a peut-être disparu dès l’arrivée des rats, avant même qu’on la décrive.','EX','foret'],
 ['perruche',1730,'La perruche verte des Mascareignes','La perruche verte de Bourbon disparaît de l’île. Une forme proche survit à Maurice, de justesse.','RE','foret'],
 ['geckoNuit',1750,'Le gecko nocturne de Bourbon','Un gecko qui chassait la nuit dans les forêts sèches. Les rats et le défrichement l’emportent.','EX','foret'],
 ['grandScinque',1720,'Le grand scinque','Un grand lézard au corps lisse, des côtes et des basses pentes. Il disparaît avec les tortues.','EX','cote'],
 ['scinqueBojer',1800,'Le scinque de Bojer','Un petit scinque des rivages. Il disparaît de l’île, mais vit encore sur des îlots de Maurice.','RE','cote'],
 ['echassiers',1780,'Aigrettes, cormorans et flamants','L’aigrette dimorphe, le cormoran africain, le flamant rose : les grands oiseaux des étangs et des embouchures quittent l’île. Ils vivent encore ailleurs.','RE','cote'],
 ['libellule',1900,'Une libellule des étangs','Rhyothemis semihyalina, une libellule aux ailes fumées des mares de la côte, ne se voit plus dans l’île quand on draine et qu’on bâtit.','RE','cote']];
NOIR141.forEach(([k,y,t,b,cat,z])=>{DISP133.push([k,y,t,b,'Archive']);try{ZONE135[k]=z}catch(e){}
 EV['disp133_'+k]={si:()=>S&&S.disp135x&&S.disp135x[k]!=null,tag:'Archive',get y(){return (S&&S.disp135x&&S.disp135x[k]!=null)?S.disp135x[k]:9999},get an(){const x=S&&S.disp135x&&S.disp135x[k];return 'vers '+(x!=null?x:y)},t:'Disparu : '+t,
  get b(){const c=S&&S.disp135c&&S.disp135c[k];return b+(c?' La cause qui a pesé le plus : '+c+'.':'')},v:cat==='EX'?'Éteinte dans le monde entier.':'Disparue de l’île, vivante ailleurs.',
  h:'Liste rouge UICN de La Réunion : '+(cat==='EX'?'EX, espèce éteinte au niveau mondial':'RE, espèce disparue de La Réunion')+'. La date est un ordre de grandeur choisi pour le jeu : la liste n’en donne pas.',o:[{n:'Se souvenir',d:'Savoir +1.',fx:{savoir:1},hist:1}]}});
// une partie déjà commencée : les nouvelles espèces prennent leur usure là où l'histoire en est
setInterval(()=>{try{if(!S||!S.disp135||!S.disp135i)return;NOIR141.forEach(([k,y])=>{if(S.disp135[k]==null){S.disp135[k]=Math.max(0,(S.year-1663)/(y-1663));if(S.year>=y)(S.disp135x=S.disp135x||{})[k]=y}})}catch(e){}},2000);
// les plantes en noir de la liste rouge de 2023
Object.assign(EV,{flore141:{y:1990,si:()=>S,tag:'Archive',an:'XIXᵉ-XXᵉ siècles',t:'Les plantes en noir',b:'Cinq plantes de l’île n’existent plus nulle part : le claoxylon à grandes feuilles, la cadoque blanche, la fougère « patte de lézard », la turrée rougeâtre et l’angrec palmiforme. Trente-six autres ont disparu de l’île mais vivent ailleurs : le bois café, le manioc marron du bord de mer, le quinquina sauvage, le hérisson rouge, et beaucoup de petites fougères des ravines.',
 v:'On perd d’abord ce qu’on ne regardait pas.',h:'Archive : Liste rouge de la flore vasculaire de La Réunion (UICN, 2023) : 5 espèces EX (éteintes au niveau mondial) et 36 RE (disparues de La Réunion).',o:[{n:'Garder des graines',d:'Savoir +2.',fx:{savoir:2},hist:1}]}});
