// ===== p220 : les paroles des chants (premier couplet, textes traditionnels du domaine public) défilent en sous-titre pendant l'air ;
// et un air de cour pour les gouverneurs d'avant la Révolution : la « Marche pour la cérémonie des Turcs » de Lully (1670, domaine public),
// mélodie relevée par Claude sur une partition pour flûte (8notes.com), mesures 1 à 6, 13 à 15, puis reprise. =====
const COUR213=[[76,4],[76,4],[72,3],[71,1],[69,2],[81,2],[76,4],[79,2],[79,2],[79,4],[76,3],[74,.5],[76,.5],[77,3],[76,1],[74,3],[72,1],[72,8],
 [79,4],[80,3],[78,.5],[80,.5],[81,3],[83,1],[84,2],[83,1],[81,1],[83,4],[76,2],[76,2],
 [72,3],[71,1],[69,2],[81,2],[76,4],[79,2],[79,2],[79,4],[76,3],[74,.5],[76,.5],[77,3],[76,1],[74,3],[72,1],[72,8]];
// les paroles, par air (chaque vers prend sa part de la durée de l'air)
const PAR217=new Map([
 [NANTES213,['C’est Jean-François de Nantes','Oué, oué, oué !','Gabier de la Fringante','Oh ! mes bouées, Jean-François !']],
 [CLAIRE213,['À la claire fontaine','M’en allant promener','J’ai trouvé l’eau si belle','Que je m’y suis baigné']],
 [AOUT213,['Le trente et un du mois d’août','Nous aperçûmes sous le vent à nous','Une frégate d’Angleterre','Qui fendait la mer et les flots','C’était pour aller à Bordeaux']],
 [BENBOW213,['Come all you seamen bold, and draw near, and draw near,','Come all you seamen bold, and draw near:','It’s of an admiral’s fame, O brave Benbow was his name,','How he fought all on the main, you shall hear, you shall hear.']],
 [LADIES213,['Farewell and adieu to you, fair Spanish ladies,','Farewell and adieu to you, ladies of Spain;','For we’ve received orders for to sail for old England,','And we may ne’er see you fair ladies again.']],
 [KAAP213,['Al die willen te kaap’ren varen','Moeten mannen met baarden zijn','Jan, Piet, Joris en Corneel','Die hebben baarden, zij varen mee']]]);
// une traduction discrète sous les chants étrangers
const TRAD217=new Map([[BENBOW213,'Venez, marins hardis, écoutez la gloire de l’amiral Benbow, qui se battit en mer.'],[LADIES213,'Adieu, belles dames d’Espagne : on nous rappelle en Angleterre.'],[KAAP213,'Ceux qui veulent partir en course doivent être des hommes à barbe.']]);
function par217(N,M,dt,fini){const L=PAR217.get(N);if(!L)return;let el=document.getElementById('par217');if(!el){el=document.createElement('div');el.id='par217';
  el.style.cssText='position:fixed;left:50%;bottom:13%;transform:translateX(-50%);max-width:86vw;text-align:center;font:italic 19px/1.35 Georgia,serif;color:#fff7e6;text-shadow:0 1px 3px #000,0 0 10px #000a;pointer-events:none;z-index:9999;transition:opacity .5s;opacity:0';document.body.appendChild(el)}
 const tot=N.reduce((a,[m,d])=>a+d*dt,0),jou=M.reduce((a,[m,d])=>a+d*dt,0),tr=TRAD217.get(N),n=L.length,id=Math.random();el.dataset.id=id;
 L.forEach((v,j)=>{const at=j/n*tot;if(at>jou-.3)return;setTimeout(()=>{if(fini()||el.dataset.id!=id)return;el.innerHTML=v+(tr&&j===n-1?'<br><small style="font-size:13px;opacity:.75">'+tr+'</small>':'');el.style.opacity=1},at*1000+150)});
 setTimeout(()=>{if(el.dataset.id==id)el.style.opacity=0},Math.min(jou,tot)*1000+600);
 const st=setInterval(()=>{if(fini()&&el.dataset.id==id){el.style.opacity=0;clearInterval(st)}if(el.style.opacity==='0')clearInterval(st)},300)}
// l'air de cour : pour les gouverneurs et la Compagnie avant 1789, une fois sur deux à la place de la chanson
{const a0=antan217;antan217=function(t){const y=(S&&S.year)||1700,ang=(y>=1810&&y<1815)||/anglais|Farquhar/i.test(t);if(!ang&&y<1789&&Math.random()<.6){if(!libre217())return;setTimeout(()=>{try{joue217(COUR213,'cour',30,.7)}catch(e){}},1000);return}return a0.apply(this,arguments)}}
try{ANN217.splice(1,0,{g:'À la cour',L:[['Marche pour la cérémonie des Turcs','Jean-Baptiste Lully, 1670, pour la cour de Louis XIV. Domaine public ; mélodie relevée sur une partition pour flûte. Elle accompagne les gouverneurs et la Compagnie avant la Révolution.',()=>['cour',COUR213]]]})}catch(e){}
// la voile de l'événement : l'air entier passe aussi par le lecteur, pour avoir ses paroles
{const a0=air213;air213=function(nat){try{if(typeof joue217!=='function')return a0.apply(this,arguments);window.DER217=performance.now();tour213++;
  const N=nat==='hollandais'?KAAP213:nat==='francais'?[AOUT213,CLAIRE213,NANTES213][tour213%3]:nat==='pirate'?BENBOW213:(tour213%2?LADIES213:BENBOW213);setTimeout(()=>joue217(N,nat,0,1),200)}catch(e){return a0.apply(this,arguments)}}}
// quand on vise une case de la colonie : quelques notes de violon (avant 1850) ou d'accordéon (après : il arrive avec le XIXᵉ siècle et passe dans le séga)
function accordeon220(m,d,t,v){const f=440*Math.pow(2,(m-69)/12);[1,1.006,.997].forEach((k,j)=>sTon(f*k,d,{t,type:j?'square':'sawtooth',v:v*(j?.35:.6),a:.03,fl:1800}));sTon(f*2,d,{t,type:'triangle',v:v*.2,a:.03})}
{let der=-1,tder=0;setInterval(()=>{try{if(!S||S.fin||typeof hovI==='undefined'||hovI===der)return;der=hovI;if(hovI<0)return;const o=S.t[hovI];if(!o||!o.c)return;const n=performance.now();if(n-tder<7000||JOUE217||n-(window.DER217||-1e9)<4000)return;tder=n;
  const c=sndPret();if(!c)return;const y=S.year||1700,N=[AOUT213,CLAIRE213,NANTES213][Math.floor(Math.random()*3)],a=Math.floor(Math.random()*4)*3,M=N.slice(a,a+6),dt=.16;let t=.05;
  M.forEach(([m,d])=>{if(m){if(y>=1850)accordeon220(m,d*dt*.9,t,.035);else violon205(m,d*dt*.9,t,.03)}t+=d*dt})}catch(e){}},200)}
