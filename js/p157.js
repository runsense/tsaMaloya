// ===== p157 : la barre du bas tient sur une ligne — onglets et boutons plus petits, avec icône ; ceux qui sont coupés grossissent au survol.
// Quand la place manque, seules les icônes restent (le nom revient au survol). L'onglet Pouvoirs a sa couleur (violet) et scintille quand un pouvoir est prêt, comme Savoirs.
(function(){const st=document.createElement('style');st.textContent=`
#bas .tab{font-size:11px!important;padding:5px 9px!important;letter-spacing:.02em;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;position:relative}
#bas .tab{transition:transform .15s!important}#bas .tab:hover,#bas .tab:focus-visible{transform:scale(1.15)!important;z-index:6;box-shadow:0 6px 16px rgba(0,0,0,.45)}
#t-sav::before{content:'📚 '}#t-chr::before{content:'🕰 '}#t-pou::before{content:'✨ '}#t-out::before{content:'⛵ '}#t-fac::before{content:'⚑ '}#t-pp::before{content:'👥 '}#t-jou::before{content:'📜 '}#t-aid::before{content:'❔ '}
#nvp::before{content:'🆕 '}#auto::before{content:'📖 '}#undo::before{content:'↶ '}#back::before{content:'⏮ '}#sortie::before{content:'🗺 '}
body.ico157 #bas .tab:not(.on){font-size:0!important;padding:5px 7px!important}body.ico157 #bas .tab:not(.on)::before{font-size:15px}
body.ico157 #bas .tab:not(.on) .pastille{font-size:10px;position:absolute;top:-3px;right:-3px;padding:0 4px}
#t-pou{border-color:#b98cf0!important;color:#dcc4ff!important}#t-pou.on{background:#b98cf0!important;color:#1a1026!important}
#t-pou.brille157{animation:pvBr157 1.6s ease-in-out infinite}@keyframes pvBr157{0%,100%{box-shadow:0 0 0 0 rgba(185,140,240,.0)}50%{box-shadow:0 0 0 4px rgba(185,140,240,.55),0 0 18px rgba(185,140,240,.7)}}`;document.head.appendChild(st)})();
setInterval(()=>{try{const b=document.getElementById('bas');if(!b||b.hidden)return;
 // icônes seules si la barre déborde (on mesure en mode texte)
 const t=document.getElementById('tabs');if(t)t.querySelectorAll('.tab').forEach(x=>{if(!x.title)x.title=x.textContent.trim()});if(t){document.body.classList.remove('ico157');const trop=t.scrollWidth>t.clientWidth+4||b.scrollHeight>b.clientHeight+6;document.body.classList.toggle('ico157',trop)}
 const p=document.getElementById('t-pou');if(p&&typeof pouvDispo==='function')p.classList.toggle('brille157',pouvDispo()>0&&onglet!=='pou')}catch(e){}},700);
// ----- Histoire : le menu du clic droit ne cache plus les informations du lieu (chasse, cueillette, gibier) : le panneau du lieu reste visible à côté, et le menu se range à sa gauche -----
{const st=document.createElement('style');st.textContent='body.ctx157 #side{visibility:visible!important;pointer-events:auto!important}';document.head.appendChild(st);
 setInterval(()=>{try{const m=document.getElementById('mCtx'),on=!!m&&typeof S!=='undefined'&&S&&modeHist();document.body.classList.toggle('ctx157',on);if(!on)return;const sd=document.getElementById('side');if(!sd||sd.hidden)return;
  const a=m.getBoundingClientRect(),b=sd.getBoundingClientRect();if(a.right>b.left-6&&a.left<b.right&&a.bottom>b.top&&a.top<b.bottom){m.style.left=Math.max(6,b.left-a.width-10)+'px'}}catch(e){}},120)}
// ----- plus de petit film qui suit les chasseurs ou les explorateurs quand ils partent -----
try{cineSortie=function(){}}catch(e){}
// ----- le conte montre ses clics : une souris dessinée apparaît près du curseur, son bouton droit s'allume une seconde, puis elle disparaît -----
function souris157(x,y){let m=document.getElementById('souris157');if(m)m.remove();m=document.createElement('div');m.id='souris157';
 m.style.cssText='position:fixed;z-index:130;pointer-events:none;left:'+(x-70)+'px;top:'+(y-10)+'px;display:flex;flex-direction:column;align-items:center;gap:2px;transition:opacity .4s;filter:drop-shadow(0 3px 6px rgba(0,0,0,.6))';
 m.innerHTML='<svg width="46" height="64" viewBox="0 0 46 64"><rect x="2" y="2" width="42" height="60" rx="20" fill="#f4efe2" stroke="#1a1206" stroke-width="2.5"/><path d="M23 2v24" stroke="#1a1206" stroke-width="2"/><path d="M2 26h42" stroke="#1a1206" stroke-width="2"/>'+
  '<path id="bd157" d="M23 3.5h1a19 19 0 0 1 18.5 19v2.5H23z" fill="#e8be5a"><animate attributeName="fill" values="#e8be5a;#ffef9a;#e8be5a" dur=".5s" repeatCount="2"/></path><rect x="20.5" y="9" width="5" height="10" rx="2.5" fill="#1a1206"/></svg><b style="font:700 11px system-ui;color:#1a1206;background:#e8be5a;border-radius:6px;padding:1px 6px">clic droit</b>';
 document.body.appendChild(m);setTimeout(()=>{m.style.opacity='0'},1000);setTimeout(()=>m.remove(),1450)}
