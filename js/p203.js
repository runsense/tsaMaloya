// ===== p203 : la musique d'accueil — le morceau composé par l’auteur dans l'Atelier Maloya. Elle part au premier geste sur l'écran
// d'accueil (le navigateur ne laisse pas jouer de son avant) et s'efface quand la partie commence. =====
const ACC203={on:(typeof S==='undefined'||!S),joue:null};
{const ac=accueil;accueil=function(){ACC203.on=true;return ac.apply(this,arguments)}}
function accJoue203(){try{if(!ACC203.on||ACC203.joue)return;const c=typeof sndCtx==='function'&&sndCtx();if(!c)return;if(c.state!=='running')c.resume();
 const B=sons193(c);if(!B.boucle_intro_jeu){setTimeout(accJoue203,600);return}ACC203.joue=boucle194(c,SND.out,'intro_jeu',.75,1)}catch(e){}}
addEventListener('pointerdown',()=>{if(ACC203.on)accJoue203()},true);addEventListener('keydown',()=>{if(ACC203.on)accJoue203()},true);
setInterval(()=>{try{if(ACC203.on&&typeof S!=='undefined'&&S&&$('ecran').hidden){ACC203.on=false;if(ACC203.joue){ACC203.joue.stop();ACC203.joue=null}}}catch(e){}},500);
