// ===== p77 : Vie — la carte sans cases ; les cases n'apparaissent qu'au choix de la destination, et les cases atteignables clignotent =====
// « Préparer une sortie » : seule la liste des gens défile (on voit d'abord les gens formés, les autres plus bas) ;
// le but choisi est entouré de sa couleur (cueillir vert, chasser rouge, explorer bleu, fonder un camp brun), comme le bouton du bas ;
// les vivres s'affichent en « emportés / restent au camp ».
{const st=document.createElement('style');st.textContent='#expP .pjb{background:#1d1a14;border:1px solid rgba(226,189,116,.4);border-radius:10px;padding:18px;color:#efe6d6}#expP .expLst label{margin:0}';document.head.appendChild(st)}
const EXPC={cueil:'#5fae4c',chasse:'#d24b3a',explorer:'#4a86d0',camp:'#9a6a3a'};
setInterval(()=>{try{if(typeof terr==='undefined'||!terr||!terr.material.uniforms.grille)return;const v=(!S||modeHist()||window.choixExp)?1:0;if(terr.material.uniforms.grille.value!==v){terr.material.uniforms.grille.value=v;peindre()}}catch(e){}},300);
{const pe=peindre;peindre=function(){const r=pe.apply(this,arguments);try{const ce=window.choixExp;if(!S||!ce||modeHist()||typeof stData==='undefined')return r;const c=T[ce.c],por=typeof porteeExp==='function'?porteeExp(ce):expPortee(ce.prov,ce.ids.length);
 T.forEach(t=>{const o=S.t[t.i]||{};if(t.i===ce.c||!o.s||hd(t,c)>por)return;stData[(t.row*COLW+t.col)*4+3]=128});stTex.needsUpdate=true}catch(e){}return r}}
{const ep=expPlan;expPlan=function(c,pre){const r=ep.apply(this,arguments);try{const box=$('expP');if(!box)return r;const inner=box.querySelector('.pjb'),st=window.EXPS;
  // la liste seule défile
  const formes=[...inner.querySelectorAll('label input[data-e]')].map(i=>i.closest('label')),autres=[...inner.querySelectorAll('[data-ef]')].length?inner.querySelector('[data-ef]').closest('div'):null;
  const items=formes.concat(autres?[autres]:[]);if(items.length){const lst=document.createElement('div');lst.className='expLst';lst.style.cssText='overflow:auto;border:1px solid rgba(232,190,90,.25);border-radius:6px;padding:2px 8px;margin:4px 0 8px;flex:0 1 auto;min-height:60px';
   items[0].before(lst);items.forEach(e=>lst.appendChild(e));inner.style.overflow='hidden';inner.style.display='flex';inner.style.flexDirection='column';
   const hF=formes.reduce((s,e)=>s+e.offsetHeight,0);lst.style.maxHeight=Math.max(90,Math.min(innerHeight*.42,(hF||90)+6))+'px';if(formes.length&&autres){const s=document.createElement('small');s.className='note';s.style.cssText='display:block;text-align:center;opacity:.7';s.textContent='↓ les autres du camp, qui ne conviennent pas';autres.before(s)}}
  // le but : un contour de sa couleur, un peu grossi ; le bouton du bas prend la même couleur
  inner.querySelectorAll('[data-b]').forEach(b=>{const col=EXPC[b.dataset.b]||'#c8a050',on=st&&st.but===b.dataset.b;b.className='bt sec';b.style.cssText='';b.style.setProperty('border','2px solid '+col,'important');b.style.setProperty('border-radius','999px','important');b.style.setProperty('color',on?'#fff':col,'important');b.style.setProperty('background',on?col+'22':'transparent','important');b.style.setProperty('padding','5px 14px','important');b.style.setProperty('text-decoration','none','important');if(on){b.style.transform='scale(1.1)';b.style.boxShadow='0 0 10px '+col+'88';b.style.fontWeight='700'}else b.style.opacity='.8'});
  const ok=$('expOk');if(ok&&st){const col=EXPC[st.but]||'';if(col){ok.style.background=col;ok.style.borderColor=col;ok.style.color='#fff'}ok.textContent=(EXPB[st.but]||['Partir'])[0]+' : choisir la destination sur la carte'}
  // les vivres : emportés / restent au camp
  const maj=()=>{const v=$('expV');if(!v||!st)return;v.textContent=st.prov+' / '+Math.max(0,Math.floor(S.vivres||0)-st.prov)+' restent au camp';const sm=v.parentElement&&v.parentElement.nextElementSibling;if(sm&&sm.tagName==='SMALL')sm.textContent=''};maj();const rg=$('expR');if(rg)rg.addEventListener('input',maj)}catch(e){}return r}}
// la petite carte du choix de destination : les cases que l'on peut atteindre avec les vivres emportés clignotent
{const st=document.createElement('style');st.textContent='#ccBox .pjb{background:#1d1a14;border:1px solid rgba(226,189,116,.4);border-radius:10px;padding:18px;color:#efe6d6}@keyframes ccClig{0%,100%{opacity:.15}50%{opacity:1}}#ccA{position:absolute;left:0;top:0;pointer-events:none;animation:ccClig 1.1s ease-in-out infinite}';document.head.appendChild(st)}
{const cc=carteConnu;carteConnu=function(o){const r=cc.apply(this,arguments);try{if(!o||o.mode!=='dest'||o.c==null)return r;const cv=$('ccC');if(!cv)return r;const vus=T.filter(t=>(S.t[t.i]||{}).s);
 const x0=Math.min(...vus.map(t=>t.x))-2,z0=Math.min(...vus.map(t=>t.z))-2,W=parseFloat(cv.style.width),H=parseFloat(cv.style.height),k=W/(Math.max(...vus.map(t=>t.x))+2-x0),R=k*.95*.6,home=T[o.c],pm=o.pm||0;
 const wrap=document.createElement('div');wrap.style.cssText='position:relative;width:'+W+'px;height:'+H+'px;margin:0 auto';cv.before(wrap);wrap.appendChild(cv);const a=document.createElement('canvas');a.id='ccA';const dpr=devicePixelRatio||1;a.width=W*dpr;a.height=H*dpr;a.style.width=W+'px';a.style.height=H+'px';wrap.appendChild(a);
 const c=a.getContext('2d');c.scale(dpr,dpr);c.lineWidth=2.4;c.strokeStyle='#ffd36a';c.fillStyle='rgba(255,211,106,.28)';let n=0;
 vus.forEach(t=>{if(t===home||t.bare||hd(home,t)>pm)return;const x=(t.x-x0)*k,y=(t.z-z0)*k;c.beginPath();for(let i=0;i<6;i++){const g=Math.PI/6+i*Math.PI/3;c.lineTo(x+Math.cos(g)*R,y+Math.sin(g)*R)}c.closePath();c.fill();c.stroke();n++});
 const I=$('ccI');if(I)I.textContent='Les cases qui clignotent sont à portée avec les vivres emportés ('+n+' case'+(n>1?'s':'')+', '+pm+' au plus du camp). Touchez-en une.'}catch(e){}return r}}
// le choix de destination : toucher une case ouvre sa fiche complète ; « Partir ici » (ou un second toucher) confirme
function ficheCible(t,home,pm){const o=S.t[t.i]||{},d=hd(home,t),ok=d<=pm&&!t.bare&&t!==home,L=[];
 const B={camp:'un camp',chasse:'un terrain de chasse',cueil:'un lieu de cueillette',jardin:'un jardin',jf:'un jardin-forêt',guet:'un poste de guet',peche:'une pêcherie'};
 L.push('<b style="font:700 17px Alegreya,Georgia,serif">'+(lieuDe(t)||lieuProche(t)||t.biome)+'</b>'+(t.cirq?' <small>· cirque de '+t.cirq+'</small>':''));
 L.push(t.biome+' · '+Math.round(t.alt)+' m · pente '+Math.round(t.slope||0)+'°'+(t.forest?' · forêt':'')+(t.riv?' · rivière':'')+(cotier(t)?' · côte':''));
 try{const c=climTx(t);if(typeof c==='string')L.push('<small>'+c+'</small>');else if(c){L.push('Pluies '+c.pl);if(c.a.length)L.push('<span style="color:#9fd27a">+ '+c.a.join(' · ')+'</span>');if(c.d.length)L.push('<span style="color:#e8a27a">− '+c.d.join(' · ')+'</span>')}}catch(e){}
 L.push('Ce que la terre donne : '+(t.yield>=1?'beaucoup':t.yield>=.8?'assez':t.yield>0?'peu':'rien')+(t.cold?' · froid la nuit':'')+(t.zeo?' · des pierres qui brillent':''));
 if(o.b)L.push('Ici : '+(B[o.b]||o.b)+'.');if(o.c)L.push('<span style="color:#ff8a6a">Terres des colons.</span>');
 try{if(danger(t))L.push('<span style="color:#ff8a6a">⚠️ Danger : des chasseurs de marrons rôdent près d’ici.</span>')}catch(e){}
 const ce=window.choixExp;if(ce){const b=EXPB[ce.but]||['Partir'];L.push('Distance : <b>'+d+' case'+(d>1?'s':'')+'</b> du camp · portée avec les vivres : '+pm+' · '+(ok?'<b style="color:#9fd27a">atteignable</b>':'<b style="color:#ff8a6a">trop loin</b>'));L.push('But : '+b[0].toLowerCase()+' ('+ce.ids.length+' personne'+(ce.ids.length>1?'s':'')+', '+ce.prov+' vivres).')}
 return {html:L.join('<br>'),ok}}
{const cc=carteConnu;carteConnu=function(o){const r=cc.apply(this,arguments);try{if(!o||o.mode!=='dest'||o.c==null||!o.pick)return r;const cv=$('ccC'),box=$('ccBox'),home=T[o.c],pm=o.pm||0;if(!cv)return r;
 const vus=T.filter(t=>(S.t[t.i]||{}).s),x0=Math.min(...vus.map(t=>t.x))-2,z0=Math.min(...vus.map(t=>t.z))-2,W=parseFloat(cv.style.width),k=W/(Math.max(...vus.map(t=>t.x))+2-x0),R=k*.95;
 const tuile=e=>{const q=cv.getBoundingClientRect(),mx=e.clientX-q.left,my=e.clientY-q.top;let best=null,bd=1e9;vus.forEach(t=>{const d=Math.hypot((t.x-x0)*k-mx,(t.z-z0)*k-my);if(d<bd){bd=d;best=t}});return bd<R?best:null};
 let choisie=null;const L=$('ccL');cv.onclick=e=>{const t=tuile(e);if(!t)return;if(choisie===t){if(o.pick(t)!==false)box.remove();return}choisie=t;const f=ficheCible(t,home,pm);
  L.innerHTML='<div style="border:1px solid rgba(232,190,90,.35);border-radius:8px;padding:10px 12px;margin-top:6px;line-height:1.5">'+f.html+'<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap"><button class="bt" id="ccGo"'+(f.ok?'':' disabled')+'>Partir ici</button><small class="note" style="align-self:center">ou touchez la case une seconde fois</small></div></div>';
  const g=$('ccGo');if(g)g.onclick=()=>{if(o.pick(t)!==false)box.remove()};L.scrollIntoView({block:'nearest'})}}catch(e){}return r}}
