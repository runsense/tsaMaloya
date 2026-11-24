// ===== p285 : le son des petits jeux. Une seule musique à la fois : pendant un petit jeu, la boucle du jeu (combat, labyrinthe, adresse)
// joue seule, plus bas (60 % du volume d’avant, réglé dans p237) ; les boucles de maloya de la partie (kabar, moringue, « roule » des fuites) se taisent, au lieu de jouer par-dessus. =====
try{SONCH.pjCalme='silence'}catch(e){}
const PJ285={t:0};
{const ij=introJeu;introJeu=function(){PJ285.t=performance.now();try{SND.m194=null;SND.m194J=0;SND.kabarJ=0}catch(e){}return ij.apply(this,arguments)}}
{const mc=momentCourant;momentCourant=function(){try{if(window.BTUON&&(typeof MUS237!=='undefined'&&MUS237.src||performance.now()-PJ285.t<6000))return 'pjCalme'}catch(e){}return mc.apply(this,arguments)}}
// la musique d'un petit jeu s'arrête quand on en sort : par la fin normale, par « Quitter », ou par « Plus tard » sur l'écran d'introduction.
// (avant, un duel quitté laissait sa boucle tourner sur la carte.) Une musique encore en décodage est annulée aussi.
{const m=mus237;mus237=function(k,b){const h=m.apply(this,arguments);if(b){PJ285.h=h;PJ285.dep=performance.now()}return h}}
function pjStop285(){try{if(PJ285.h){PJ285.h.stop();PJ285.h=null}else if(typeof MUS237!=='undefined'&&MUS237.src)musStop237(1)}catch(e){}}
setInterval(()=>{try{if(!(typeof MUS237!=='undefined'&&MUS237.src&&MUS237.bcl))return;if(window.BTUON||document.getElementById('pjIntro')){PJ285.hors=0;return}
 const n=performance.now();if(!PJ285.hors)PJ285.hors=n;else if(n-PJ285.hors>700){PJ285.hors=0;PJ285.h=null;musStop237(1)}}catch(e){}},400);
document.addEventListener('click',ev=>{try{const b=ev.target.closest&&ev.target.closest('#pjIntro button');if(b&&!/Commencer|Jouer|Go|Lancer/i.test(b.textContent))setTimeout(()=>{if(!document.getElementById('pjIntro'))pjStop285()},200)}catch(e){}},true);
// et dès qu'un jeu se ferme (BTUON repasse à 0), on vérifie un instant après qu'aucun autre n'a pris la suite
try{let bt=window.BTUON||0;Object.defineProperty(window,'BTUON',{configurable:true,get(){return bt},set(v){const av=bt;bt=v;if(av&&!v)setTimeout(()=>{try{if(!bt&&!document.getElementById('pjIntro')){pjStop285();if(MUS237.src&&MUS237.bcl)musStop237(1)}}catch(e){}},700)}})}catch(e){}
