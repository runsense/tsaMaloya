// ===== p255 : après les grandes chasses (1740-1760), le grand marronnage est brisé : plus de grand roi élu sur tout l'intérieur.
// Si l'on rallie encore des camps plus tard, c'est un conseil de chefs, sans roi — plausible pour des bandes petites et dispersées. =====
ROIS.conseil={n:'Le conseil des chefs',v:0,d:'Pas de roi : chaque camp garde sa voix, et la colonie ne sait pas qui abattre.',h:'Fiction du jeu, mais vraisemblable : après les années 1760, les sources décrivent des bandes plus petites et dispersées, sans royaume des Hauts.'};
EV.conseil255={sys:1,tag:'Mémoire',an:'',t:'Le conseil des chefs',
 get b(){return 'Les grands rois des Hauts sont morts : Laverdure, tué en 1752, Mafate avant lui ; les chasseurs ont brûlé les camps de l’îlette et des cirques. Ceux qui restent sont des bandes plus petites, cachées plus haut. Vos camps ralliés se réunissent pourtant, de nuit, au-dessus des nuages : faut-il un roi, ou des chefs qui décident ensemble ?'},
 h:'Après la période des « grandes chasses » (années 1740-1760, détachements de Mussard et d’autres), les archives ne parlent plus d’un roi de tout l’intérieur ; le marronnage continue jusqu’en 1848, en petits groupes.',
 o:[{n:'Un conseil, sans roi',d:'Cohésion +3',fx:{coh:3},f:()=>{S.roi='conseil';S.dir='vrai';try{log('Les camps ralliés décident ensemble, sans grand roi.')}catch(e){}}},
    {n:'Vous faire élire grand roi (conte)',d:ROIS.vous.d,fx:{},f:()=>{S.roi='vous';S.dir='fictif';try{log('Les chefs vous élisent grand roi de l’intérieur.')}catch(e){}}}]};
