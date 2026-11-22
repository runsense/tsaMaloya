// ===== p190 : la mystique en mode Histoire =====
// Dans l'histoire réelle, personne n'est devenu dieu : quand la mystique s'accumule sans servir, le récit la dépense lui-même,
// au moment où le camp en a besoin (fièvres, détachement sur les traces, camp qui se divise), comme les marrons l'auraient fait.
// Dans une utopie, au contraire, la mystique gardée jusqu'au bout a sa propre fin : le chef devient dieu.
const MYS190=[
 {k:'soin',si:()=>S.sante<60,c:3,fx:{sante:7},t:'La fièvre gagne le camp. Les tisaneurs vont chercher les plantes des Hauts ; on prie sur les malades, et la plupart se relèvent.'},
 {k:'traque',si:()=>(S.traque||0)>35,c:4,fx:{traque:-7},t:'Le détachement remonte la ravine. On brûle des herbes sur le sentier et l’on récite les paroles qui égarent ; le soir, les chasseurs repartent bredouilles. Récit transmis, non prouvé.'},
 {k:'coh',si:()=>S.coh<65,c:3,fx:{coh:6},t:'Une nuit, on sert les ancêtres : le riz, le rhum, le feu, les noms des morts dits un à un. Les querelles du camp s’apaisent.'},
 {k:'deuil',si:()=>true,c:2,fx:{coh:3,savoir:1},t:'Le plus vieux parle aux morts sous le tamarin et transmet ce qu’il sait : les plantes, les passages, les noms. Le savoir se garde, la mystique se dépense.'}];
const MYS190C=[
 {si:()=>S.sante<60,c:3,fx:{sante:6},t:'Les fièvres frappent l’habitation. On fait venir le curé, on récite des neuvaines au chevet des malades, et l’on soigne aussi avec les tisanes apprises des esclaves.'},
 {si:()=>S.coh<65,c:3,fx:{coh:6},t:'Une procession sort de la chapelle derrière la statue de la Vierge : colons, engagés et esclaves suivent, et pour un jour l’habitation se tient ensemble.'},
 {si:()=>true,c:2,fx:{coh:3},t:'On allume des cierges à l’oratoire du chemin ; chacun y laisse une prière pour la récolte et pour les absents.'}];
{const s0=saison;saison=function(){const r=s0.apply(this,arguments);try{if(S&&!S.fin&&typeof modeHist==='function'&&modeHist()&&!(typeof uto186==='function'&&uto186())){
  const m=S.myst||0,seuil=8;S.mys190=(S.mys190||0)+1;
  // plus elle s'accumule, plus le récit s'en sert vite ; jamais deux fois de suite
  if(m>=seuil&&S.mys190>=2&&Math.random()<Math.min(.9,.25+(m-seuil)*.07)){const L=S.voieC?MYS190C:MYS190,o=L.find(x=>x.si()&&m>=x.c)||L[L.length-1];if(m>=o.c){S.myst=m-o.c;fx(o.fx);S.mys190=0;log('✨ '+o.t+' (mystique −'+o.c+')')}}}}catch(e){}return r}}
// la fin en utopie : la mystique jamais dépensée fait du chef un dieu (le bloc attend l'écran de fin définitif, après le survol)
{const ef=ecranFin;ecranFin=function(){const r=ef.apply(this,arguments);try{if(S&&typeof uto186==='function'&&uto186()&&(S.myst||0)>=20){const my=Math.round(S.myst);let n=0;const iv=setInterval(()=>{n++;const e=document.getElementById('ecran');if(n>80){clearInterval(iv);return}if(!e||e.hidden||document.getElementById('apo190')||!e.textContent.trim())return;
   const d=document.createElement('div');d.id='apo190';d.style.cssText='margin:14px 0;max-width:640px;padding:12px 16px;border:1px solid #e8be5a88;border-radius:10px;background:#1a140ccc;color:#f4ead6;font:15px/1.5 Alegreya,Georgia,serif;text-align:left';
   d.innerHTML='<b style="color:#e8be5a">✨ L’apothéose</b><br>Toute cette mystique, jamais dépensée, s’est accumulée autour du chef comme une marée. Les anciens ne parlent plus de lui comme d’un homme : on dépose des offrandes là où il a dormi, on prononce son nom avant les combats, et les enfants nés après sa mort le prient. Dans cette île qui n’a pas existé, le chef marron est devenu un dieu. <i>(Fiction du jeu, dans une utopie : '+my+' de mystique gardée.)</i>';
   const bt=[...e.querySelectorAll('button')].pop();if(bt&&bt.parentElement)bt.parentElement.insertBefore(d,bt);else e.appendChild(d);clearInterval(iv)},400)}}catch(e){}return r}}
