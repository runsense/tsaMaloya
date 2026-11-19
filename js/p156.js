
// ===== p156 : batailles (BTU, toutes les batailles d'uchronie) — recruter dans une fenêtre bien visible, poser à la main sur la carte =====
// 1. Le marché s'ouvre en fenêtre bloquante au milieu (couleur safran, bord rouge). Tant que personne n'est recruté, elle cache tout.
// 2. Chaque recrue file vers le banc, qui s'illumine. Dès qu'il y a quelqu'un sur le banc, la carte se voit derrière la fenêtre.
// 3. On ferme la fenêtre (la croix scintille) ou on continue d'acheter tant qu'il reste des pièces ; « ＋ Recruter » la rouvre.
// 4. On prend le rectangle d'une personne sur le banc et on le pose sur la carte : les cases interdites (en haut, rochers, eau profonde) rougissent.
(function(){
 const st=document.createElement('style');st.textContent=`
#btu .bs{display:none!important}
#btuS{position:absolute;inset:0;z-index:20;display:flex;align-items:center;justify-content:center;transition:background .4s}
#btuS.noir{background:rgba(14,11,9,.97)}#btuS.voile{background:rgba(0,0,0,.28);pointer-events:none}#btuS.voile .bx{pointer-events:auto}
#btuS .bx{position:relative;background:#f4c542;color:#1a1206;border:4px solid #b0301e;border-radius:14px;box-shadow:0 0 0 6px rgba(244,197,66,.25),0 18px 50px rgba(0,0,0,.6);padding:16px 18px 14px;max-width:min(860px,94vw);font:15px system-ui}
#btuS h3{margin:0 34px 4px 0;font:700 21px Georgia,serif}#btuS .or{font-weight:700}#btuS p{margin:2px 0 10px;font-size:13px}
#btuS .cs{display:flex;flex-wrap:wrap;gap:8px}#btuS .cd{flex:1 1 150px;min-width:140px;background:#fffaf0;border:2px solid #1a1206;border-radius:10px;padding:8px;text-align:left;cursor:pointer;font:13px system-ui;color:#1a1206}
#btuS .cd:hover:not(:disabled){transform:translateY(-3px);box-shadow:0 6px 14px rgba(0,0,0,.25)}#btuS .cd:disabled{opacity:.4;cursor:default}#btuS .cd b{font-size:15px}#btuS .cd em{float:right;font-style:normal;font-weight:700}#btuS .cd small{display:block;margin-top:4px;color:#4a3a20}
#btuS .vd{flex:1 1 150px;min-width:140px;border:2px dashed rgba(26,18,6,.3);border-radius:10px}
#btuS .x{position:absolute;top:6px;right:8px;width:34px;height:34px;border-radius:50%;border:2px solid #1a1206;background:#fffaf0;font:700 18px system-ui;cursor:pointer;color:#1a1206}
#btuS .x.sc{animation:sc156 1s infinite}@keyframes sc156{0%,100%{box-shadow:0 0 0 0 rgba(176,48,30,.9);background:#fffaf0}50%{box-shadow:0 0 0 9px rgba(176,48,30,0);background:#ffd27a}}
#btuS .pied{display:flex;gap:8px;align-items:center;margin-top:10px;flex-wrap:wrap}#btuS .pied button{border:2px solid #1a1206;border-radius:8px;background:#1a1206;color:#f4c542;padding:6px 12px;font:600 14px system-ui;cursor:pointer}#btuS .pied button.sec{background:#fffaf0;color:#1a1206}#btuS .pied button:disabled{opacity:.4}
#btu .bb.banc156{transition:box-shadow .3s,background .3s;border-radius:10px;padding:4px 6px}#btu .bb.banc156.lum{box-shadow:0 0 0 3px #f4c542,0 0 22px #f4c542;background:rgba(244,197,66,.18)}
#btu .bb [data-b]{cursor:grab;touch-action:none}#btu .vole156{position:fixed;z-index:200;pointer-events:none;background:#fffaf0;color:#1a1206;border:2px solid #b0301e;border-radius:8px;padding:6px 10px;font:600 13px system-ui;transition:left .55s cubic-bezier(.5,0,.3,1),top .55s cubic-bezier(.5,0,.3,1),transform .55s;box-shadow:0 6px 16px rgba(0,0,0,.4)}
#btu #btuP{padding-top:4px!important;padding-bottom:4px!important}#btu #btuP .bm{margin:2px 0}#btu #btuP .bb{margin:3px 0!important}#btu #btuP .bb:has(#btuC) small{display:none}
#btuO{position:absolute;inset:0;pointer-events:none;z-index:2}#btu #btuRec{background:#f4c542;color:#1a1206;border:2px solid #b0301e;font-weight:700}`;document.head.appendChild(st)})();
const OBS156={riviere:[[1,4],[6,5]],foret:[[2,4],[5,5],[7,3]],cote:[[0,5],[6,4]],ville:[[3,4]],falaise:[[0,3],[2,3],[4,3],[6,3]]};
function btuHabille156(R,k){try{const el=document.getElementById('btu');if(!el||!R||!R.G)return;const G=R.G,cv=R.cv,sc=BTU.SC.find(s=>s.k===k)||BTU.SC[0],obs=OBS156[sc.env]||[],U=BTU.U;
 const interdit=c=>!c||c.cy<3||obs.some(o=>o[0]===c.cx&&o[1]===c.cy);
 const cell=(X,Y)=>{const q=R.cs(),r=cv.getBoundingClientRect(),cx=Math.floor((X-r.left-q.ox)/q.cs),cy=Math.floor((Y-r.top-q.oy)/q.cs);return cx>=0&&cx<8&&cy>=0&&cy<6?{cx,cy}:null};
 // les rochers bloquent la pose
 const oc=cv.onclick;cv.onclick=ev=>{const c=cell(ev.clientX,ev.clientY);if(G.sel&&G.phase==='prep'&&c&&interdit(c)){G.msg=c.cy<3?'Pas en haut : l’ennemi arrive par là. Posez vos gens sur les trois rangées du bas.':'Case interdite : rocher ou eau profonde.';G.sel=null;rafr();return}oc(ev)};
 // calque : cases rouges / vertes pendant qu'on pose, rochers
 const O=document.createElement('canvas');O.id='btuO';el.insertBefore(O,el.querySelector('.bh'));const ox=O.getContext('2d');let drag=null,fin=false;
 (function dess(){if(fin||!el.isConnected)return;requestAnimationFrame(dess);O.width=innerWidth;O.height=innerHeight;const q=R.cs();ox.clearRect(0,0,O.width,O.height);
  obs.forEach(([i,j])=>{if(sc.env==='falaise')return;const X=q.ox+(i+.5)*q.cs,Y=q.oy+(j+.55)*q.cs;ox.fillStyle='rgba(0,0,0,.3)';ox.beginPath();ox.ellipse(X,Y+q.cs*.22,q.cs*.4,q.cs*.12,0,0,7);ox.fill();
   if(sc.env==='foret'){ox.fillStyle='#4a3420';ox.fillRect(X-q.cs*.1,Y-q.cs*.1,q.cs*.2,q.cs*.32);ox.fillStyle='#2d5a2a';ox.beginPath();ox.arc(X,Y-q.cs*.2,q.cs*.36,0,7);ox.fill()}
   else{ox.fillStyle='#6f665c';ox.beginPath();ox.moveTo(X-q.cs*.38,Y+q.cs*.2);ox.lineTo(X-q.cs*.25,Y-q.cs*.18);ox.lineTo(X+q.cs*.05,Y-q.cs*.3);ox.lineTo(X+q.cs*.36,Y-q.cs*.05);ox.lineTo(X+q.cs*.38,Y+q.cs*.2);ox.fill();ox.fillStyle='rgba(255,255,255,.18)';ox.beginPath();ox.moveTo(X-q.cs*.25,Y-q.cs*.18);ox.lineTo(X+q.cs*.05,Y-q.cs*.3);ox.lineTo(X,Y);ox.fill()}});
  if(G.phase==='prep'&&!G.fini&&(drag||G.sel)){const hv=drag&&drag.c;for(let i=0;i<8;i++)for(let j=0;j<6;j++){const bad=interdit({cx:i,cy:j}),pris=G.plateau.some(u=>u.cx===i&&u.cy===j);ox.fillStyle=bad?'rgba(210,40,30,.38)':pris?'rgba(244,197,66,.18)':'rgba(90,200,110,.16)';ox.fillRect(q.ox+i*q.cs+1,q.oy+j*q.cs+1,q.cs-2,q.cs-2)}
   if(hv){const bad=interdit(hv);ox.strokeStyle=bad?'#ff3b2f':'#7dff8a';ox.lineWidth=4;ox.strokeRect(q.ox+hv.cx*q.cs+2,q.oy+hv.cy*q.cs+2,q.cs-4,q.cs-4)}}})();
 // la fenêtre du marché
 const S=document.createElement('div');S.id='btuS';el.appendChild(S);let ouvert=false,nb0=-1,ph0=G.phase;
 const coutMin=()=>Math.min(...G.shop.filter(Boolean).map(k=>U[k].c),99);
 function forceUi(){const m=el.querySelector('#btuP .bm');if(m)m.textContent=G.msg;el.querySelectorAll('#btuP [data-b].on').forEach(b=>{if(!G.sel)b.classList.remove('on')})}
 const rafr=forceUi;
 function marche(){if(!ouvert){S.style.display='none';return}S.style.display='flex';const n=G.banc.length+G.plateau.length;S.className=n?'voile':'noir';
  S.innerHTML='<div class="bx"><button class="x'+(n?' sc':'')+'" title="Fermer : aller poser vos gens sur la carte">✕</button><h3>Recrutez vos gens</h3><p><span class="or">'+G.or+' pièce'+(G.or>1?'s':'')+'</span> · touchez une carte pour la recruter : elle part sur le banc. '+(n?'Fermez quand vous voulez, puis glissez chacun sur la carte.':'Il faut au moins une personne pour combattre.')+'</p><div class="cs">'+
  G.shop.map((k,i)=>k?'<button class="cd" data-s="'+i+'"'+(G.or<U[k].c||G.banc.length>=8?' disabled':'')+'><em>'+U[k].c+' p.</em><b><i style="display:inline-block;width:11px;height:11px;border-radius:50%;background:'+U[k].col+';margin-right:6px"></i>'+U[k].n+'</b><small>PV '+U[k].pv+' · dégâts '+U[k].at+' · portée '+U[k].po+'</small><small>'+(U[k].cap||'')+'</small></button>':'<span class="vd"></span>').join('')+
  '</div><div class="pied"><button class="sec" id="s156R"'+(G.or<1?' disabled':'')+'>Nouveau marché (1 p.)</button><button id="s156F"'+(n?'':' disabled')+'>Poser sur la carte ⟶</button></div></div>';
  S.querySelector('.x').onclick=()=>{ouvert=false;marche()};S.querySelector('#s156F').onclick=()=>{ouvert=false;marche()};
  S.querySelector('#s156R').onclick=()=>{const b=el.querySelector('#btuR');if(b&&!b.disabled)b.click();marche()};
  S.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{const i=+b.dataset.s,k=G.shop[i];if(!k)return;const r0=b.getBoundingClientRect();const nb=G.banc.length;R.acheter(i);if(G.banc.length+G.plateau.length===0&&G.banc.length===nb)return;
   const f=document.createElement('div');f.className='vole156';f.textContent=U[k].n;f.style.left=r0.left+'px';f.style.top=r0.top+'px';el.appendChild(f);
   requestAnimationFrame(()=>{const bc=el.querySelector('.banc156')||el.querySelector('#btuP');const r1=bc?bc.getBoundingClientRect():{left:innerWidth/2,top:innerHeight-60};f.style.left=(r1.left+20+G.banc.length*12)+'px';f.style.top=(r1.top+4)+'px';f.style.transform='scale(.8)'});
   setTimeout(()=>{f.remove();lum()},600);if(G.or<coutMin()&&G.or<1){ouvert=false}marche()})}
 function lum(){const bc=el.querySelector('.banc156');if(!bc)return;bc.classList.add('lum');clearTimeout(bc.__t);bc.__t=setTimeout(()=>bc.classList.remove('lum'),900)}
 // après chaque rendu du panneau : repérer le banc, ajouter « ＋ Recruter », rendre les rectangles glissables
 const P=el.querySelector('#btuP');const apres=()=>{if(!P)return;const bb=[...P.querySelectorAll('.bb')].find(d=>/Banc/.test(d.textContent));if(bb){bb.classList.add('banc156');if(G.banc.length!==nb0){if(nb0>=0)lum();nb0=G.banc.length}}
  const bar=[...P.querySelectorAll('.bb')].find(d=>d.querySelector('#btuC'));if(bar&&!bar.querySelector('#btuRec')){const r=document.createElement('button');r.className='bt';r.id='btuRec';r.textContent='＋ Recruter ('+G.or+' p.)';r.disabled=G.or<1;r.onclick=()=>{ouvert=true;marche()};bar.insertBefore(r,bar.firstChild)}
  if(G.phase!==ph0){if(G.phase==='prep'&&!G.fini&&G.or>=1){ouvert=true;marche()}ph0=G.phase}};
 if(P){new MutationObserver(apres).observe(P,{childList:true});apres()}
 // glisser un rectangle du banc vers la carte
 el.addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('#btuP [data-b]');if(!b||G.phase!=='prep')return;e.preventDefault();const i=+b.dataset.b,u=G.banc[i];if(!u)return;
  const g=document.createElement('div');g.className='vole156';g.style.transition='none';g.textContent=U[u.k].n+(u.st>1?' '+'★'.repeat(u.st):'');el.appendChild(g);drag={i,g,c:null,x0:e.clientX,y0:e.clientY};G.sel={o:'b',i};
  const mv=ev=>{g.style.left=(ev.clientX-30)+'px';g.style.top=(ev.clientY-18)+'px';drag.c=cell(ev.clientX,ev.clientY);g.style.borderColor=drag.c?(interdit(drag.c)?'#ff3b2f':'#2a9a40'):'#b0301e'};mv(e);
  const up=ev=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);g.remove();const c=cell(ev.clientX,ev.clientY),bouge=Math.hypot(ev.clientX-drag.x0,ev.clientY-drag.y0)>8;drag=null;
   if(c){cv.onclick({clientX:ev.clientX,clientY:ev.clientY})}else if(bouge){G.sel=null;forceUi()}else{G.msg='Glissez-le sur une case verte de la carte (ou touchez la case).';forceUi()}};
  addEventListener('pointermove',mv);addEventListener('pointerup',up)});
 const q0=R.quit;R.quit=function(){fin=true;return q0.apply(this,arguments)};
 ouvert=true;marche()}catch(e){console.warn('btu156',e)}}
{const o=BTU.ouvrir;BTU.ouvrir=function(k,fin){const R=o.apply(this,arguments);btuHabille156(R,k);return R};window.ouvrirBataille=BTU.ouvrir}
