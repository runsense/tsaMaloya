// ===== p408 : la forge n'était presque jamais accessible — il fallait un fusil volé, ou un forgeron libéré par une descente
// (une chance sur quatre). Maintenant : les colons ont leur forge d'emblée (forgerons de la Compagnie dès la fin du XVIIᵉ s.) ;
// côté marron, un fusil ou un forgeron suffit toujours, et au bout de trois descentes, il se trouve forcément parmi les libérés
// quelqu'un qui sait forger (à Madagascar, les forgerons travaillaient au soufflet à pistons, deux cylindres de bois).
// Et le bouton dit clairement comment l'obtenir. =====
try{const A=BAT.atelier;if(A){const r0=A.req;A.req=t=>!!(S&&S.voieC)||(r0?r0(t):true);A.rq='Il faut un fusil (volé lors d’une descente, ou échangé aux pirates) ou un forgeron : une descente sur une habitation peut en libérer un'}}catch(e){}
setInterval(()=>{try{if(typeof S==='undefined'||!S||S.voieC||S.forg)return;if((S.nDesc||0)>=3){S.forg=1;log('Parmi les libérés des descentes, un homme sait forger : il monte un soufflet à deux pistons de bois. La forge est possible.');try{toast('Un forgeron parmi les vôtres : la forge peut se bâtir.')}catch(x){}}}catch(e){}},2000);
