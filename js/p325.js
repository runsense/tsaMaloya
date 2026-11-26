// ===== p325 : les mêmes boutons partout. Une seule forme (fond sombre, liseré doré à gauche, coins doux) et une seule place
// (en bas à droite) pour : les actions de l'incarnation au camp, celles de la chasse en personne, et « Passer » dans toutes les
// cinématiques (genèse, tableaux du prologue, films). Les gestes de tous les jours (manger, boire, dormir…) juste au-dessus,
// plus discrets. =====
{const B='font:600 12.5px Montserrat,system-ui,sans-serif!important;color:#efe9da!important;background:rgba(24,34,30,.92)!important;border:1px solid rgba(232,190,90,.28)!important;border-left:3px solid #e2bd74!important;border-image:none!important;border-radius:7px!important;padding:8px 12px!important;text-shadow:none!important;box-shadow:0 3px 10px rgba(0,0,0,.35)!important;cursor:pointer;line-height:1.2!important;transform:none!important';
 const st=document.createElement('style');st.id='btn325';st.textContent=
 // la barre d'actions : en bas à droite, comme à la chasse
 '#vpB,#fpsb{position:absolute!important;left:auto!important;right:max(12px,env(safe-area-inset-right,0px))!important;bottom:calc(12px + env(safe-area-inset-bottom,0px))!important;display:flex!important;flex-wrap:wrap!important;gap:6px!important;justify-content:flex-end!important;max-width:min(760px,calc(100% - 24px))!important;padding:0!important}'+
 '#vp button:not(#vpRet),#vpB button,#vpMoi button,#fpsb button,#cineP,#ps,#filmP{'+B+'}'+
 '#vpB button b,#fpsb button b{color:#f0c46a!important;margin-right:5px;font-size:11px}'+
 '#vp button:not(#vpRet):hover,#vpB button:hover,#vpMoi button:hover,#fpsb button:hover,#cineP:hover,#ps:hover,#filmP:hover{background:rgba(44,58,48,.96)!important;border-left-color:#ffd98a!important}'+
 // les gestes de tous les jours : juste au-dessus, alignés à droite, plus petits
 '#vpMoi{position:absolute!important;left:auto!important;right:max(12px,env(safe-area-inset-right,0px))!important;bottom:calc(64px + env(safe-area-inset-bottom,0px))!important;display:flex!important;flex-wrap:wrap!important;gap:5px!important;justify-content:flex-end!important;max-width:min(640px,calc(100% - 24px))!important}'+
 '#vpMoi button{font-size:11.5px!important;padding:5px 10px!important;background:rgba(24,34,30,.78)!important;border-left-width:2px!important}'+
 // « Passer » : toujours au même endroit, en bas à droite, au-dessus des bandes du cinéma
 '#cineP,#ps,#filmP{position:fixed!important;left:auto!important;top:auto!important;right:16px!important;bottom:calc(9vh + 12px)!important;z-index:9700!important;margin:0!important}';
 document.head.appendChild(st)}
// la barre d'actions du camp peut tenir sur deux lignes : les gestes montent au-dessus d'elle
setInterval(()=>{try{const b=$('vpB'),m=$('vpMoi');if(!b||!m||!b.offsetHeight)return;const h=b.getBoundingClientRect();const bas=innerHeight-h.top+8;m.style.setProperty('bottom',bas+'px','important')}catch(e){}},500);
// la carte ronde du camp ne couvre plus les gestes : ils s'alignent à sa gauche ; le message du moment passe au-dessus des boutons
setInterval(()=>{try{const vp=$('vp');if(!vp||!VP)return;const m=$('vpMoi'),b=$('vpB');let mini=null;vp.querySelectorAll('canvas,div').forEach(el=>{if(mini||el===m||el===b)return;const r=el.getBoundingClientRect();if(r.width>110&&r.width<320&&Math.abs(r.width-r.height)<30&&r.right>innerWidth-60&&r.bottom>innerHeight*.5)mini=r});
 if(m){m.style.setProperty('right',(mini?Math.round(innerWidth-mini.left+10):12)+'px','important')}
 const msg=$('vpM');if(msg&&m&&m.offsetHeight){const t=m.getBoundingClientRect().top;msg.style.setProperty('bottom',Math.round(innerHeight-t+8)+'px','important');msg.style.setProperty('top','auto','important')}}catch(e){}},500);
// la fiche dit qui l'on incarne vraiment : « chef » seulement si c'est le chef
{const vh=vpHud;vpHud=function(){const r=vh.apply(this,arguments);try{const d=$('vpH'),p=VP&&VP.G&&VP.G.chef;if(d&&p&&S){const ci=campDe(p),ch=typeof chefDe==='function'&&chefDe(ci);if(!(ch&&ch.id===p.id)){const rn=p.role&&ROLES[p.role]?roleN(p.role).toLowerCase():'du camp';d.innerHTML=d.innerHTML.replace('· chef','· '+rn)}}}catch(e){}return r}}
