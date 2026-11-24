// ===== p297 : le décor du duel suit le lieu de l'histoire, plus seulement l'adversaire.
// Dans une incarnation : la canne près de l'habitation, la forêt de Bébour en forêt, le rempart des cirques dans les Hauts.
// Les héros des épopées marronnes se battent au rempart ; 1810 à la Grande Chaloupe ; Sarda et 1806 dans les cannes. =====
window.DECO297=null;
const DECOF297={laverdure284:'mafate',anchaing284:'mafate',fatie284:'mafate',baal284:'mafate',mafate282:'mafate',sarda:'canne'};
{const f0=fondDuel184;fondDuel184=function(x,W,H,sol,lk,t){if(window.DECO297){const old=SCENE184[lk];SCENE184[lk]=window.DECO297;try{return f0.apply(this,arguments)}finally{if(old===undefined)delete SCENE184[lk];else SCENE184[lk]=old}}return f0.apply(this,arguments)}}
{const od=window.ouvrirDuel;window.ouvrirDuel=ouvrirDuel=function(a,b,fin){let d=window.DECO297;
 try{if(!d&&typeof INC!=='undefined'&&INC&&INC.duel){const [bi]=INC.proche(INC.h.x,INC.h.z),bv=INC.C.b0+(INC.C.b1-INC.C.b0)*(bi/(INC.N-1));d=bv<.8?'canne':bv<2.4?'bebour':'mafate'}}catch(e){}
 if(!d){const base=String(a).replace(/^inc287_\d$/,'');d=DECOF297[a]||DECOF297[base]||null;if(!d&&(a==='milicienFr'&&b==='milicienEn'))d='chaloupe'}
 window.DECO297=d;const fin2=r=>{window.DECO297=null;fin&&fin(r)};return od.call(this,a,b,fin2)}}
