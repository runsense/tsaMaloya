// ===== p215 : petits jeux à plat, vie du donjon visible, mystique qui grandit à l'usage, fin réaliste pour les marrons, ciel qui varie davantage =====
// 1) Les plateaux du commando et des donjons ne sont plus inclinés en fausse 3D : l'inclinaison CSS les ralentissait et décalait les clics.
tilt186=function(){};
setInterval(()=>{try{['cmd','avt'].forEach(id=>{const cv=document.querySelector('#'+id+' canvas');if(cv&&cv.__t186){cv.style.transform='none';cv.getBoundingClientRect=Element.prototype.getBoundingClientRect;cv.__t186=0}})}catch(e){}},500);
// 2) Dans le donjon, la vie se voit : les cœurs en grand, en rouge
{const st=document.createElement('style');st.textContent='#avI{font-size:20px!important;color:#ff6a5a!important;font-weight:800!important;text-shadow:0 1px 2px #000;letter-spacing:.04em}';document.head.appendChild(st)}
// 3) Le mystique : il ne s'accumule plus sans fin à ne rien faire ; quand on le dépense, on apprend — une part revient, et la maîtrise grandit
const MY215={v:null};
setInterval(()=>{try{if(!S||S.fin)return;const m=S.myst||0;if(MY215.v==null||MY215.s!==S){MY215.v=m;MY215.s=S;return}const d=m-MY215.v;
 if(d<0){S.mystM=(S.mystM||0)+(-d)*.1;const ret=Math.round(-d*.35);setTimeout(()=>{try{S.myst=(S.myst||0)+ret;MY215.v=S.myst}catch(e){}},8000)}
 else if(d>0){const cap=30+(S.mystM||0)*3,k=1/(1+Math.max(0,m-d)/cap);S.myst=Math.round((MY215.v+d*k)*10)/10}
 MY215.v=S.myst}catch(e){}},500);
// 4) La fin de 1946 côté marron : pas un dieu, une vie — l'ouvrier des chantiers (bâtir, le métier qu'on respecte), ou le mendiant si l'on a été chassé de la forêt
{const fv=finVisage;finVisage=function(){const v=fv();if(v==='hist'&&S&&!S.voieC){const c=typeof camps==='function'?camps().length:0;return (!c||(S.traque||0)>70)?'mendiant':'ouvrier'}return v}}
FIN46.ouvrier=['Les bâtisseurs','Mars 1946 : l’île devient un département. Les enfants des camps descendent des Hauts ; on les embauche sur les chantiers, à monter des cases en dur, des routes, des ponts. Bâtir, appris au camp, est le métier qu’on respecte : ceux qui travaillent sont les « beaux ». La mémoire des camps reste dans les noms des lieux.'];
FIN46.mendiant=['Sur les marches du marché','Mars 1946 : l’île devient un département. Chassés de la forêt, sans terre ni papier, les derniers enfants des camps tendent la main sur les marches du marché de Saint-Denis. Ils connaissent encore les sentiers des remparts ; personne ne le leur demande.'];
// 5) Le ciel varie davantage : l'horloge des averses avance avec le temps, plus vite quand une annonce attend, et un peu à chaque geste du joueur
const W215={t:performance.now()/1000,der:performance.now()};
addEventListener('pointermove',()=>{W215.t+=.15},{passive:true});addEventListener('pointerdown',()=>{W215.t+=2},{passive:true});
setInterval(()=>{const n=performance.now(),dt=(n-W215.der)/1000;W215.der=n;const m=document.getElementById('modal');W215.t+=dt*(m&&!m.hidden?3:1)},250);
{let b0=null;setInterval(()=>{try{if(S&&S.bras!=null){if(b0!=null&&S.bras<b0)W215.t+=12;b0=S.bras}}catch(e){}},400)}
// les averses : fenêtres de 40 s (au lieu de 50) sur l'horloge du ciel ; dans une même averse, l'intensité monte et retombe (grosse pluie, éclaircie d'orage, petite averse)
averse174=function(){try{if(!S||S.fin)return 0;const P=pluieLieu174(camT.x,camT.z);if(P.duty<=0)return 0;const t=W215.t,w=Math.floor(t/40),u=(t/40)-w;
 if(rndH(w*7.31+(S.ns||0)*1.7)>=P.duty*1.15)return .04*(.5+.5*Math.sin(t*.4));const fort=P.z==='centre'&&rndH(w*3.9+1.3)<.35?1.6:1,vague=.5+.5*Math.sin(u*Math.PI*2.6+w*1.7);
 return Math.min(1,P.inten*fort*(.35+.65*vague))*Math.min(1,u*6,(1-u)*6)}catch(e){return 0}};
