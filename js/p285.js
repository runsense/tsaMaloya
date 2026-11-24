// ===== p285 : le son des petits jeux. Une seule musique à la fois : pendant un petit jeu, la boucle du jeu (combat, labyrinthe, adresse)
// joue seule, plus bas (60 % du volume d’avant, réglé dans p237) ; les boucles de maloya de la partie (kabar, moringue, « roule » des fuites) se taisent, au lieu de jouer par-dessus. =====
try{SONCH.pjCalme='silence'}catch(e){}
const PJ285={t:0};
{const ij=introJeu;introJeu=function(){PJ285.t=performance.now();try{SND.m194=null;SND.m194J=0;SND.kabarJ=0}catch(e){}return ij.apply(this,arguments)}}
{const mc=momentCourant;momentCourant=function(){try{if(window.BTUON&&(typeof MUS237!=='undefined'&&MUS237.src||performance.now()-PJ285.t<6000))return 'pjCalme'}catch(e){}return mc.apply(this,arguments)}}
