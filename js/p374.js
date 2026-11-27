// ===== p374 : les songes se trouvent du premier coup — un bouton « Les songes » sur l'écran d'accueil, à côté des petits jeux,
// qui ouvre les trois songes (le gramoun, le curé, le gouverneur) et la galerie des combattants qu'ils débloquent =====
function songes374(){const e=$('ecran');if(!e)return;e.hidden=false;const L=[
 ['gramoun','🌙 Le songe du gramoun','Le tour de l’île en voiture, de nuit, sur les vraies routes, de Saint-Pierre jusqu’au volcan.',()=>{e.hidden=true;rallyeOuvrir(()=>songes374())}],
 ['cure','⛪ Le songe du curé','Un parcours en images : un curé de campagne voit l’île à venir.',()=>{e.hidden=true;songeCure272(()=>songes374())}],
 ['gouv','🏛 Le songe du gouverneur','La Bourdonnais s’endort sur ses cartes et juge l’île à venir.',()=>{e.hidden=true;gouv273Ouvrir(()=>songes374())}]].filter(x=>typeof window[{gramoun:'rallyeOuvrir',cure:'songeCure272',gouv:'gouv273Ouvrir'}[x[0]]]==='function');
 e.innerHTML='<div class="bloc"><h1>Les songes</h1><p class="note">Trois rêves de l’île à venir. Chaque vision vue débloque un grand combattant pour le Tournoi de l’océan Indien.</p>'+L.map((x,i)=>'<button class="op dif" data-so="'+i+'"><b>'+x[1]+'</b><small>'+x[2]+'</small></button>').join('')+(typeof galerie277==='function'?'<button class="op dif" id="so-gal"><b>🖼 La galerie des songes</b><small>Les visions déjà vues et les combattants débloqués.</small></button>':'')+'<button class="bt sec" id="so-r" style="margin-top:10px">Retour</button></div>';
 e.querySelectorAll('[data-so]').forEach(b=>b.onclick=()=>L[+b.dataset.so][3]());const g=e.querySelector('#so-gal');if(g)g.onclick=()=>galerie277();e.querySelector('#so-r').onclick=()=>{try{menu302()}catch(x){}}}
function bouton374(){try{const e=$('ecran'),pj=e&&e.querySelector('#pj');if(pj&&!e.querySelector('#so374')){const b=document.createElement('button');b.className='bt sec';b.id='so374';b.textContent='🌙 Les songes';pj.after(b);b.onclick=()=>songes374()}}catch(x){}}
{const cv=accueil;accueil=function(){const r=cv.apply(this,arguments);bouton374();return r}}
bouton374();setTimeout(bouton374,500);setTimeout(bouton374,2500);
var GVIMG374=window.GVIMG374||{}; // images des fiches du songe du gouverneur (aquarelles), par numéro de fiche
