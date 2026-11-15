// ===== p86 : lisibilité de la barre du haut, cases discrètes, origines des premiers habitants, Demoun qui suit les départs,
// entrer dans une case en zoomant, et la chronologie qui défile en Survie =====

// ----- 1. La barre du haut : en tableau, groupes séparés de pointillés ; les valeurs qui changent grossissent ; les bras à part -----
{const st=document.createElement('style');st.textContent=
 '#stats.grp86{display:flex;align-items:stretch;gap:0;flex-wrap:wrap}#stats .stg{display:flex;gap:2px 12px;padding:0 12px;border-right:2px dotted rgba(232,190,90,.5);align-items:flex-start}#stats .stg:first-child{padding-left:0}#stats .stg.last{border-right:0}'+
 '@keyframes st86{0%{transform:scale(1)}35%{transform:scale(1.1)}100%{transform:scale(1)}}#stats .st.chg b.num{display:inline-block;animation:st86 .7s ease-out;transform-origin:left center}'+
 '#stats .st.brasX{margin-left:auto;padding:2px 14px;border:2px solid #6ab0e0;border-radius:10px;background:rgba(80,150,210,.16)}#stats .st.brasX small{color:#9ad0ff}#stats .st.brasX b.num{font-size:150%;color:#9ad8ff}'+
 '@media (max-width:700px){#stats .stg{padding:0 6px;gap:2px 7px}#stats .st.brasX{margin-left:6px}}';document.head.appendChild(st)}
const ST86=[['Personnes','Vivres'],['Santé','Cohésion'],['Traque','Menace marronne','Colonie'],['Bois · Paille · Pierre'],['Pistage','Mystique'],['Bétail','Fusils']],ST86V={};
function stRanger(){const d=$('stats');if(!d||d.querySelector(':scope>.stg'))return;const L=[...d.children].filter(x=>x.classList&&x.classList.contains('st'));if(!L.length)return;
 const lab=x=>{const s=x.querySelector('small');return s?s.textContent.trim():''},pris=new Set(),grp=[];
 ST86.forEach(G=>{const g=L.filter(x=>G.includes(lab(x)));g.forEach(x=>pris.add(x));if(g.length)grp.push(g)});
 const bras=L.find(x=>/^(Bras|Gens libres)$/.test(lab(x)));if(bras)pris.add(bras);const reste=[...d.children].filter(x=>!pris.has(x));if(reste.length)grp.push(reste);
 const frag=document.createDocumentFragment();grp.forEach((g,i)=>{const w=document.createElement('div');w.className='stg'+(i===grp.length-1?' last':'');g.forEach(x=>w.appendChild(x));frag.appendChild(w)});
 if(bras){bras.classList.add('brasX');frag.appendChild(bras)}d.innerHTML='';d.appendChild(frag);d.classList.add('grp86');
 // ce qui vient de changer grossit un instant
 L.forEach(x=>{const k=lab(x),v=(x.querySelector('b.num')||{}).textContent;if(ST86V[k]!==undefined&&ST86V[k]!==v)x.classList.add('chg');ST86V[k]=v})}
{const go=()=>{const d=$('stats');if(!d){setTimeout(go,500);return}new MutationObserver(()=>{try{stRanger()}catch(e){}}).observe(d,{childList:true});stRanger()};go()}

// ----- 3. Les premiers marrons sont malgaches ; les premiers Indiens arrivent avec des colons venus de l'Inde -----
NOMS.mg.h.push('Rasolo','Randria','Rado','Tahiry','Fidy','Naina','Mamy','Toky','Rindra','Solofo','Nirina','Tojo');NOMS.mg.f.push('Lova','Fanja','Volana','Hanta','Onja','Miora','Tahina','Vola','Nomena','Sarobidy','Ranja','Bodo');
{const on=origineNouvelle;origineNouvelle=function(){if(S&&!S.voieC&&S.year<1700)return 'mg';if(S&&S.voieC&&S.year<1720&&rnd()<.1)return 'in';return on.apply(this,arguments)}}

// ----- 4. Les exilés d'Annam (1916) et une épopée inventée -----
EV.e1916vn={y:1916,tag:'Archive',an:'1916',t:'Les empereurs d’Annam en exil',b:'La France exile à La Réunion deux empereurs d’Annam qu’elle a déposés : Thành Thái, et son fils Duy Tân, qui a tenté à seize ans un soulèvement contre la colonisation. Duy Tân vivra trente ans dans l’île, cavalier et radioamateur, avant de rejoindre la France libre.',h:'Faits réels : exil en 1916 ; Duy Tân meurt en 1945 dans un accident d’avion en Afrique.',get o(){return [{n:'Les accueillir',d:'Cohésion +1',fx:{coh:1}},{n:'Les surveiller',d:'Colonie +2',fx:{ami:2}}]}};
setInterval(()=>{try{if(!S||S.fin||!S.evq)return;S.done=S.done||{};const k='e1916vn',e=EV[k];if(S.done[k]||S.year<e.y||S.year>e.y+12||S.evq.includes(k))return;S.done[k]=1;S.evq.push(k)}catch(e){}},2800);
BSCEN.annam={cote:'*',carte:'camp',si:()=>S&&S.year>=1916,n:'Le poste de radio des Hauts (épopée inventée)',t:'1942. Dans une case des Hauts, des fidèles du prince d’Annam exilé et des réfractaires cachent un poste de radio qui parle à la France libre. La police du gouverneur, fidèle à Vichy, monte les chercher. Tenez jusqu’au soir. (Épopée inventée pour le jeu.)',def:1,
 moi:()=>[{type:'fusil',cote:'m',nom:'Fidèles d’Annam',gens:Array(6).fill(null)},{type:'fusil',cote:'m',nom:'Réfractaires',gens:Array(6).fill(null)},{type:'coutelas',cote:'m',nom:'Gens des Hauts',gens:Array(7).fill(null)}],
 eux:()=>[{type:'soldat',cote:'c',nom:'Gendarmes',gens:Array(8).fill(null)},{type:'soldat',cote:'c',nom:'Police du gouverneur',gens:Array(8).fill(null)},{type:'chiens',cote:'c',nom:'Chiens',gens:Array(4).fill(null)}]};

// ----- 5. Demoun suit ceux qu'on envoie : l'onglet s'ouvre, ils s'éclairent, une petite écriture colorée dit ce qu'ils font -----
const ACT86={cueil:['#5fae4c','cueillette'],chasse:['#d24b3a','chasse'],explorer:['#4a86d0','exploration'],camp:['#9a6a3a','fonde un camp']};
{const st=document.createElement('style');st.textContent='#drawer .pers.actH{background:rgba(255,236,190,.22)!important;box-shadow:inset 3px 0 0 var(--c86,#e8be5a);transition:background .6s}#drawer .act86{display:inline-block;margin-left:6px;font:700 11px Montserrat,system-ui,sans-serif;border-radius:999px;padding:0 7px;color:#fff}';document.head.appendChild(st)}
function demounMarques(flash){if(!S)return;S.actP=S.actP||{};for(const id in S.actP){const p=ppId(+id);if(!p||!enGrp(p))delete S.actP[id]}
 document.querySelectorAll('#drawer .pers[data-pid]').forEach(el=>{const a=S.actP[el.dataset.pid];if(!a||el.querySelector('.act86'))return;const c=ACT86[a]||['#e8be5a',a];const t=document.createElement('span');t.className='act86';t.style.background=c[0];t.textContent=c[1];(el.querySelector('.pn')||el).appendChild(t);el.style.setProperty('--c86',c[0]);if(flash)el.classList.add('actH')})}
{const dr=drawer;drawer=function(){const r=dr.apply(this,arguments);try{if(onglet==='pp')demounMarques(false)}catch(e){}return r}}
document.addEventListener('click',e=>{try{if(!e.target||e.target.id!=='expOk'||!window.EXPS||!S)return;const st=window.EXPS,ids=Object.keys(st.coche||{}).filter(k=>st.coche[k]),but=st.but||'chasse';
 setTimeout(()=>{try{const sent=ids.filter(id=>{const p=ppId(+id);return p&&enGrp(p)});if(!sent.length)return;S.actP=S.actP||{};sent.forEach(id=>S.actP[id]=but);
  if(onglet!=='pp')$('t-pp').click();const d=$('drawer');d.style.zIndex=66;demounMarques(true);const first=d.querySelector('.pers.actH');if(first)first.scrollIntoView({block:'center',behavior:'smooth'});
  setTimeout(()=>{try{d.style.zIndex='';d.querySelectorAll('.actH').forEach(x=>x.classList.remove('actH'));if(onglet==='pp')$('t-pp').click()}catch(e){}},6500)}catch(e){}},450)}catch(e){}});

// ----- 6. En zoomant à fond, on entre dans la case, en fondu -----
{let acc=0,enCours=0;const f=document.createElement('div');f.id='fondu86';f.style.cssText='position:fixed;inset:0;background:#0b0906;opacity:0;pointer-events:none;transition:opacity .45s;z-index:58';const fx86=()=>{if(document.body)document.body.appendChild(f);else setTimeout(fx86,300)};fx86();
 document.addEventListener('wheel',e=>{try{if(!e.target||e.target.id!=='c'||!S||enCours||typeof dist==='undefined'||typeof lieu==='undefined')return;if($('campV')&&!$('campV').hidden&&$('campV').offsetParent)return;
  if(e.deltaY>=0||dist>3.6||lieu){acc=0;return}acc+=-e.deltaY;if(acc<260)return;acc=0;const p=pick(e.clientX,e.clientY),t=p&&tileAt(p);if(!t||!seen(t))return;enCours=1;f.style.opacity=1;
  const cx=e.clientX,cy=e.clientY,cv=e.target;setTimeout(()=>{try{cv.dispatchEvent(new MouseEvent('dblclick',{clientX:cx,clientY:cy,bubbles:true}))}catch(_){}f.style.opacity=0;setTimeout(()=>enCours=0,500)},460)}catch(_){console.warn('fondu86',_)}},{passive:true})}

// ----- 7. En Survie, la chronologie défile, et l'on peut jouer ses événements -----
{const st=document.createElement('style');st.textContent='#kChr{position:relative;height:38px;overflow:hidden;background:linear-gradient(#0e1418,#16201f);border-bottom:1px solid #3a3226;flex:none}#kChr .ax{position:absolute;left:0;right:0;top:22px;height:1px;background:#3a4a48}#kChr .yr{position:absolute;top:24px;font:600 10px Montserrat,system-ui;color:#8a9a90;transform:translateX(-50%)}'+
 '#kChr .ev{position:absolute;top:5px;transform:translateX(-50%);font:600 11px Montserrat,system-ui;white-space:nowrap;cursor:pointer;color:#b8c8c0;background:#1e2a28;border:1px solid #3a4a48;border-radius:999px;padding:0 8px}#kChr .ev.pret{color:#1a140c;background:#e8be5a;border-color:#ffe2a0;animation:kcB 1.2s ease-in-out infinite}#kChr .ev.fait{opacity:.45}#kChr .now{position:absolute;left:50%;top:0;bottom:0;width:2px;background:#e8be5a}'+
 '@keyframes kcB{0%,100%{box-shadow:0 0 0 0 rgba(232,190,90,0)}50%{box-shadow:0 0 10px 3px rgba(232,190,90,.8)}}#kCarte{position:fixed;inset:0;z-index:9300;display:flex;align-items:center;justify-content:center;background:#000a}#kCarte .bx{background:#efe4c8;color:#2a2016;border-radius:6px;max-width:560px;width:calc(100% - 32px);padding:18px 22px;font-size:14px;line-height:1.5}#kCarte h3{font:700 21px Alegreya,Georgia,serif;margin:0 0 6px}#kCarte button{display:block;width:100%;text-align:left;margin:6px 0;background:#fbf6ea;border:2px solid #c8b890;border-radius:6px;padding:8px 10px;cursor:pointer;font:500 13px Montserrat,system-ui}#kCarte button:hover{border-color:#b5412b}';document.head.appendChild(st)}
let KCH=null;const kcListe=()=>KCH||(KCH=Object.keys(EV).filter(k=>{const e=EV[k];return e&&!e.sys&&typeof e.y==='number'&&e.y>=1663&&e.y<=2026&&/Archive/.test(e.tag||'')}).map(k=>({k,y:EV[k].y})).sort((a,b)=>a.y-b.y));
const kcT=k=>{try{return EV[k].t}catch(e){return k}};
let KC0={an:null,t:0};
function kcDessin(){const d=$('kons');if(!d||d.hidden||typeof K==='undefined'||!K||K.an==null)return;let r=$('kChr');const h=d.querySelector('header');if(!r||r.parentElement!==d){r=document.createElement('div');r.id='kChr';if(h)h.after(r);else d.prepend(r)}
 if(KC0.an!==K.an){if(KC0.an!=null&&K.an>KC0.an){kcListe().filter(e=>e.y>KC0.an&&e.y<=K.an).forEach(e=>{if(!(K.evJ||{})[e.k])try{kLog&&kLog('📜 '+e.y+' : '+kcT(e.k)+' — touchez la frise pour le jouer.')}catch(_){}})}KC0={an:K.an,t:performance.now()}}
 const dur=(typeof KV!=='undefined'&&KV.dur)||27000,fr=Math.min(.999,(performance.now()-KC0.t)/dur*(typeof KV!=='undefined'&&KV.vit||1)),yf=K.an+(K.pause||K.fin?0:fr),W=r.clientWidth||innerWidth,px=Math.max(18,W/40);
 const X=y=>W/2+(y-yf)*px;let h2='<div class="ax"></div><div class="now"></div>';for(let y=Math.floor(yf-W/2/px/10)*10;y<=yf+W/2/px;y+=10){const x=X(y);if(x>-30&&x<W+30)h2+='<div class="yr" style="left:'+x.toFixed(1)+'px">'+y+'</div>'}
 kcListe().forEach(e=>{const x=X(e.y);if(x<-150||x>W+150)return;const fait=(K.evJ||{})[e.k],pret=!fait&&e.y<=K.an;h2+='<div class="ev'+(pret?' pret':fait?' fait':'')+'" data-k="'+e.k+'" style="left:'+x.toFixed(1)+'px" title="'+kcT(e.k).replace(/"/g,'')+'">'+e.y+' · '+kcT(e.k)+'</div>'});
 r.innerHTML=h2;r.querySelectorAll('.ev.pret').forEach(b=>b.onclick=ev=>{ev.stopPropagation();kcJouer(b.dataset.k)})}
setInterval(()=>{try{kcDessin()}catch(e){}},120);
function kcFx(fx){const R=K.res||{},m={vivres:'viv',bois:'bois',pierre:'pierre',savoir:'sav',myst:'sav',ami:'com',coh:'com',sante:'viv',paille:'bois'};for(const k in fx||{}){const r=m[k];if(r&&typeof fx[k]==='number')R[r]=Math.max(0,(R[r]||0)+Math.round(fx[k]/ (k==='coh'||k==='ami'||k==='sante'?2:1)))}}
function kcJouer(k){const e=EV[k];if(!e)return;let O=[];try{O=(e.o||[]).map(o=>({n:o.n,d:o.d||'',fx:o.fx||{}}))}catch(_){O=[]}if(!O.length)O=[{n:'Noter dans la chronique',d:'Savoir +1',fx:{savoir:1}}];
 const d=document.createElement('div');d.id='kCarte';d.innerHTML='<div class="bx"><small>'+(e.an||e.y)+'</small><h3>'+e.t+'</h3><p>'+e.b+'</p>'+O.map((o,i)=>'<button data-i="'+i+'"><b>'+o.n+'</b><br><small>'+o.d+'</small></button>').join('')+'<p><small>En Survie, les effets se traduisent en vivres, matériaux, savoir et commerce.</small></p></div>';document.body.appendChild(d);
 d.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const o=O[+b.dataset.i];K.evJ=K.evJ||{};K.evJ[k]=1;kcFx(o.fx);try{kLog('📜 '+e.y+' : '+e.t+' — '+o.n+'.')}catch(_){}d.remove();try{kRendu()}catch(_){}})}
