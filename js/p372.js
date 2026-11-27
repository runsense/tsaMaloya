// ===== p372 : les coups propres à chaque style de combat, le super coup et sa jauge.
// Manipulations : « avant » = vers l'adversaire, « arrière » = en s'éloignant, ↓ = bas. La Forge pourra remplacer ces listes
// combattant par combattant (champ moves) et fabriquer d'autres coups. =====
// seq : la suite de directions (b = bas, av = avant, ar = arrière, h = haut) ; btn : p (poing) ou k (pied) ; k : le coup du duel joué
var MV372={
 capoeira:[{n:'Meia-lua de compasso',seq:'b,ar',btn:'k',k:'ret',lourd:1,tour:1,cd:1.6},{n:'Martelo',seq:'av,av',btn:'k',k:'k3',lourd:1,dx:30,cd:1.4},{n:'Rolê',seq:'ar,ar',btn:'p',esq:1,dx:70,cd:1.2}],
 moraingy:[{n:'Frappe plongeante',seq:'av,av',btn:'p',k:'p3',lourd:1,dx:70,cd:1.5},{n:'Revers du zébu',seq:'b,ar',btn:'p',k:'p2',lourd:1,tour:1,cd:1.4}],
 kalari:[{n:'Saut du tigre',seq:'b,h',btn:'k',k:'k3',lourd:1,dx:50,cd:1.6},{n:'Paume de l’éléphant',seq:'av,av',btn:'p',k:'p3',lourd:1,cd:1.4}],
 savate:[{n:'Fouetté',seq:'av,av',btn:'k',k:'k2',lourd:1,cd:1.2},{n:'Chassé bas',seq:'b,av',btn:'k',k:'bal',lourd:1,cd:1.4}],
 anglaise:[{n:'Crochet du ponton',seq:'av,av',btn:'p',k:'p3',lourd:1,dx:40,cd:1.3},{n:'Uppercut de la cale',seq:'b,h',btn:'p',k:'up',lourd:1,cd:1.5}],
 kungfu:[{n:'Coup de pied du dragon',seq:'b,ar',btn:'k',k:'ret',lourd:1,tour:1,cd:1.6},{n:'Paume de la grue',seq:'av,av',btn:'p',k:'p3',lourd:1,dx:40,cd:1.3}],
 escrime:[{n:'Fente',seq:'av,av',btn:'p',k:'p3',lourd:1,dx:80,cd:1.3},{n:'Moulinet',seq:'b,ar',btn:'p',k:'p2',lourd:1,tour:1,cd:1.5}],
 varma:[{n:'Point vital',seq:'b,av',btn:'p',k:'var',cd:3},{n:'Bond du singe',seq:'b,h',btn:'k',k:'k3',lourd:1,dx:60,cd:1.6}]};
// le super coup de chaque style (sinon « Coup de légende ») ; Grand Diab et les autres peuvent en recevoir un par la Forge (champ sup)
var SUP372={capoeira:{n:'Armada en vrille',k:'ret',d:28},moraingy:{n:'Charge du zébu',k:'p3',d:30},kalari:{n:'Vol du garuda',k:'k3',d:28},savate:{n:'Coup de pied de Joinville',k:'k3',d:26},anglaise:{n:'Directe du docker',k:'p3',d:28},kungfu:{n:'Cent poings',k:'p3',d:30},escrime:{n:'Coup de Jarnac',k:'p3',d:30},varma:{n:'Les cent huit points',k:'var',d:26}};
try{if(typeof DUE!=='undefined'){DUE.F.grandiab.sup={n:'Fourche du diable',k:'p3',d:32};DUE.F.tijean.sup={n:'Le tour de Ti Jean',k:'ret',d:26}}}catch(e){}
// la jauge du super coup, sous la barre de vie du joueur
function jauge372(){requestAnimationFrame(jauge372);const G=window.DUEL359;let d=document.getElementById('sg372');const vis=G&&G.A&&G.A.f&&document.querySelector('#duel')&&!G.ph;
 if(!vis){if(d)d.style.display='none';return}
 if(!d){d=document.createElement('div');d.id='sg372';d.style.cssText='position:fixed;left:44px;top:92px;width:260px;height:10px;border-radius:5px;background:rgba(0,0,0,.45);z-index:119;pointer-events:none;overflow:hidden;box-shadow:0 0 0 1px rgba(255,220,150,.35)';d.innerHTML='<i style="display:block;height:100%;width:0;background:linear-gradient(90deg,#c87a20,#ffd75a)"></i><b style="position:absolute;left:0;top:12px;font:700 12px Georgia,serif;color:#ffd75a;text-shadow:0 1px 2px #000;white-space:nowrap"></b>';document.body.append(d)}
 d.style.display='block';const v=G.A.sg372||0,i=d.firstChild;i.style.width=v+'%';const pl=v>=100;d.lastChild.textContent=pl?'SUPER prêt : ↓ ↓ + poing ou pied':'';d.style.boxShadow=pl?'0 0 12px #ffd75a':'0 0 0 1px rgba(255,220,150,.35)'}
requestAnimationFrame(jauge372);
