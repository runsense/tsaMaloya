// ===== p205 : des bouts de rythme qui ponctuent le jeu, pris dans les boucles de l’auteur.
// Ouvrir un camp : 4 s de maligasse. La fin d'un kabar : 2 s de kasse, seule. Un navire qui arrive : le lambi.
// La fin d'une saison : 1,3 s de roulèr chez les marrons ; chez les colons, la musique de leur temps (voir plus bas). =====
function bout205(nom,dur,v){try{const c=typeof sndPret==='function'&&sndPret();if(!c)return;const B=sons193(c),b=B&&B['boucle_'+nom];if(!b)return;
 const s=c.createBufferSource(),g=c.createGain(),t=c.currentTime;s.buffer=b;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.12);g.gain.setValueAtTime(v,t+Math.max(.2,dur-.7));g.gain.linearRampToValueAtTime(0,t+dur);
 s.connect(g);g.connect(SND.out);s.start(t,Math.random()*Math.max(0,(BCL194[nom]||b.duration)-dur),dur+.05)}catch(e){}}
// ouvrir un camp
{const co=cvOuvrir;cvOuvrir=function(){const avant=typeof CV!=='undefined'&&CV.on;const r=co.apply(this,arguments);try{if(!avant&&CV.on&&!(S&&S.autoD))bout205('maligasse',4,.5)}catch(e){}return r}}
// un navire qui arrive : le lambi, pas plus d'une fois par minute
{let der=0;const lambi=()=>{const n=performance.now();if(n-der<60000)return;der=n;try{if(typeof PRE72!=='undefined'&&PRE72.lambi)PRE72.lambi.f()}catch(e){}};
 try{const cm=cineMer;cineMer=function(){const r=cm.apply(this,arguments);lambi();return r}}catch(e){}
 try{const fj=fond108Jouer;fond108Jouer=function(){const r=fj.apply(this,arguments);lambi();return r}}catch(e){}}
// la fin d'une saison
{const ps=ppSaison;ppSaison=function(){const r=ps.apply(this,arguments);try{if(!S||S.fin)return r;
  if(!S.voieC){if(typeof I72!=='undefined'&&I72.rouler){I72.rouler(0,.5);I72.rouler(.42,.32);I72.rouler(.84,.55)}}
  else fin205Colon()}catch(e){}return r}}

// la musique des colons, selon l'époque (Reunionweb, portail de l'esclavage) : chansons de marins et airs de métier au violon et à la flûte,
// puis le fifre et le tambour ; au XIXᵉ, le quadrille des salons qui rencontre les rythmes africains et malgaches ; le séga ensuite.
const HZ205=m=>440*Math.pow(2,(m-69)/12);
function violon205(m,d,t,v){const f=HZ205(m);sTon(f,d,{t,type:'sawtooth',v,a:.04,fl:2300});sTon(f*1.004,d,{t,type:'sawtooth',v:v*.6,a:.05,fl:2000})}
function flute205(m,d,t,v){const f=HZ205(m);sTon(f,d,{t,type:'sine',v,a:.05});sTon(f*2,d*.8,{t,type:'sine',v:v*.15,a:.05});if(typeof sBruit==='function')sBruit(.06,{t,ft:'bandpass',f:f*2,q:3,v:v*.4})}
function fifre205(m,d,t,v){const f=HZ205(m+12);sTon(f,d,{t,type:'square',v:v*.5,a:.01,fl:4200})}
function caisse205(t,v){if(typeof sBruit==='function'){sBruit(.05,{t,ft:'bandpass',f:2200,q:.8,v});sBruit(.03,{t:t+.06,ft:'bandpass',f:2400,q:.8,v:v*.6})}}
function fin205Colon(){try{const y=S.year||1700;if(typeof sTon!=='function')return;
 if(y<1750){// « À la claire fontaine », chanson de marins de la vieille France : violon et flûte
  const N=[[67,.5],[67,.5],[71,.5],[71,.5],[69,.5],[71,.5],[69,.5],[67,.5],[71,.5],[71,.5],[69,.5],[71,1.5]];let t=0;
  N.forEach(([m,d])=>{violon205(m,d*.38,t,.045);flute205(m+12,d*.38,t,.03);t+=d*.38});return}
 if(y<1800){// « Malbrough s'en va-t-en guerre » au fifre, sur le tambour
  const N=[[67,.5],[72,.5],[72,.25],[72,.5],[71,.25],[72,.5],[74,.5],[72,.5],[72,.25],[71,.75],[71,.25],[69,.5],[69,.25],[71,.5],[72,1]];let t=0;
  N.forEach(([m,d])=>{fifre205(m,d*.4*.9,t,.05);t+=d*.4});for(let k=0;k<t/.4;k++)caisse205(k*.4,.07);return}
 if(y<1900){// le quadrille au violon, sur le rythme de la valse créole
  bout205('valse',2.6,.4);const N=[[72,.5],[76,.5],[79,.5],[76,.25],[74,.25],[72,1]];let t=.1;N.forEach(([m,d])=>{violon205(m,d*.42,t,.04);t+=d*.42});return}
 if(typeof PRE72!=='undefined'&&PRE72.sega)PRE72.sega.f()}catch(e){}}
