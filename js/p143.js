
// ===== p143 : pendant un petit jeu (commando du Morne, esprit de la grotte, galeries, batailles…), la carte derrière ne reçoit plus les touches et l'histoire s'arrête =====
// Avant : Espace lançait la pierre du Guetteur ET mettait en route la lecture du conte ; Tab faisait avancer l'histoire derrière ; le conte continuait de choisir.
// Les petits jeux posent BTUON=1 en s'ouvrant. On note ce moment ; seules les touches écoutées par le jeu ouvert après ce moment passent.
{let bt=window.BTUON||0,btT=0;try{Object.defineProperty(window,'BTUON',{configurable:true,get(){return bt},set(v){if(v&&!bt)btT=performance.now();bt=v}})}catch(e){}
 const L=[],ae=window.addEventListener.bind(window),re=window.removeEventListener.bind(window);
 window.addEventListener=function(type,fn,opt){if(type==='keydown'||type==='keyup')L.push({type,fn,t:performance.now()});return ae(type,fn,opt)};
 window.removeEventListener=function(type,fn,opt){const i=L.findIndex(x=>x.type===type&&x.fn===fn);if(i>=0)L.splice(i,1);return re(type,fn,opt)};
 const actif=()=>!!bt&&!(typeof CV!=='undefined'&&CV.on)&&btT>0;
 ['keydown','keyup'].forEach(type=>ae(type,e=>{if(!actif())return;const tg=e.target;if(tg&&tg.closest&&tg.closest('input,textarea,select'))return;
   const jeu=L.filter(x=>x.type===type&&x.t>=btT-1500);if(!jeu.length)return;e.stopImmediatePropagation();if(e.key===' '||e.key==='Tab'||e.key.startsWith('Arrow'))e.preventDefault();
   jeu.forEach(x=>{try{x.fn.call(window,e)}catch(err){console.warn(err)}})},true));
 window.miniJeu143=actif}
// l'histoire s'arrête derrière : le conte ne choisit plus, la saison n'avance plus, les annonces n'expirent plus
{const pa=pasAuto;pasAuto=function(){if(window.miniJeu143&&miniJeu143())return;return pa.apply(this,arguments)}}
{let pris=0;setInterval(()=>{try{if(!window.miniJeu143||!S)return;const on=miniJeu143();if(on&&!pris){pris=1;S.mini143=1;if(typeof proch!=='undefined'&&proch)window.PROCH143=proch-performance.now()}
  else if(!on&&pris){pris=0;S.mini143=0;if(typeof proch!=='undefined'&&window.PROCH143!=null){proch=performance.now()+Math.max(4000,window.PROCH143);window.PROCH143=null}}}catch(e){}},200)}
// le gardien des petits jeux (p113) ne voyait pas le commando, les échecs, les batailles, le duel, le donjon, la course ni la grotte :
// il croyait le jeu fini au bout d'une seconde, rendait la main à la carte (BTUON=0) et relançait le conte derrière.
{const pe=pjEcran113;pjEcran113=function(){try{if(['cmd','ech','btu','duel','avt','rallye','g132'].some(id=>{const e=document.getElementById(id);return e&&e.isConnected&&!e.hidden}))return true}catch(e){}return pe.apply(this,arguments)}}
// et si un petit jeu est ouvert, il garde BTUON=1 même si un autre bout de code le remet à 0
setInterval(()=>{try{if(['cmd','ech','btu','duel','avt','rallye'].some(id=>document.getElementById(id))&&!window.BTUON)window.BTUON=1}catch(e){}},300);
