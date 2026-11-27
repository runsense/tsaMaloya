// ===== p210 : le numéro de version se voit — en bas de l'accueil et dans l'aide, pour savoir quelle version on a devant soi =====
const VERSION_JEU='455';
setInterval(()=>{try{const e=$('ecran');if(e&&!e.hidden&&$('nv')&&!$('ver210')){const d=document.createElement('div');d.id='ver210';d.textContent='TsaMaloya · version '+VERSION_JEU;d.style.cssText='position:fixed;right:10px;bottom:24px;font:12px Alegreya,Georgia,serif;color:#e8dcc0;opacity:.7;z-index:50;pointer-events:none';document.body.appendChild(d)}
 const v=$('ver210');if(v)v.hidden=!(e&&!e.hidden&&$('nv'))}catch(x){}},700);
