
// ===== p381 : avant chaque manche, le combat attend le départ. Un panneau montre les commandes, les pouvoirs du combattant,
// ses coups spéciaux et ses enchaînements ; « Commencer » (ou Entrée, ou Espace) lance la manche. Le même panneau s'ouvre
// pendant le combat avec le bouton « 📖 Coups » (ou la touche H), qui met le combat en pause. =====
function aide381(A){const f=A.f,st=f.st,STN={varma:'varma kalai',savate:'boxe française',anglaise:'boxe anglaise',kalari:'kalarippayattu',capoeira:'capoeira',moraingy:'moraingy',kungfu:'kung-fu',escrime:'escrime française'};
 const dir={b:'↓',h:'↑',av:'avant',ar:'arrière'},btn={p:'poing',k:'pied'};
 const sp=(typeof MV372!=='undefined'&&st&&MV372[st])||[];
 const cmb=(typeof cmbListe379==='function')?cmbListe379(f):[];const NOMK={p1:'1',p2:'2',p3:'3',k1:'4',k2:'5',k3:'6',up:'S+3 (uppercut)',bal:'S+6 (balayette)',ret:'arrière+6 (coup retourné)'};
 const rang=(typeof rang379==='function')?{simple:'',boss:' · boss',superboss:' · super boss'}[rang379(f)]:'';
 let h='<h3 style="margin:0 0 4px;font:700 20px Georgia,serif">'+f.n+'<small style="opacity:.7;font-weight:400">'+(st?' · '+(STN[st]||st):'')+rang+'</small></h3>';
 h+='<div class="c381"><div><b>Commandes</b><br>◀ ▶ (Q, D ou flèches) se déplacer · Z sauter · S baisser · E esquiver<br>1 2 3 poings (faible, moyen, fort) · 4 5 6 pieds · 0 coup d’arme</div>';
 h+='<div><b>Pouvoirs</b><br>'+[['sp','spn',7],['sp2','sp2n',8],['sp3','sp3n',9]].filter(([s])=>f[s]).map(([s,n,k])=>k+' · '+(f[n]||f[s])).join('<br>')+'</div>';
 h+='<div><b>Coups spéciaux (à la manette)</b><br>↓ puis avant + poing : projectile<br>avant, ↓, avant + poing : uppercut du ciel<br>↓ puis arrière + pied : pied tournoyant'+sp.map(m=>'<br>'+m.seq.split(',').map(x=>dir[x]||x).join(', ')+' + '+(btn[m.btn]||m.btn)+' : '+m.n).join('')+'</div>';
 h+='<div><b>Enchaînements</b> <small style="opacity:.7">(moins d’une seconde entre deux coups : le dernier frappe 30 % plus fort)</small><br>'+cmb.map(c=>c.n+' : '+c.seq.map(k=>NOMK[k]||k).join(' → ')).join('<br>')+'</div></div>';
 return h}
function panneau381(G,A,el,depart){let d=el.querySelector('#st381');if(d)d.remove();d=document.createElement('div');d.id='st381';
 d.style.cssText='position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:60;max-width:min(860px,94vw);max-height:84vh;overflow:auto;background:rgba(24,18,12,.93);color:#f4ecd8;border:1px solid #c9a24a;border-radius:10px;padding:16px 18px;font:14px/1.5 Georgia,serif;box-shadow:0 10px 40px rgba(0,0,0,.6)';
 d.innerHTML=(depart?'<div style="font:900 26px Georgia,serif;color:#ffd75a;margin-bottom:6px">Manche '+G.r+'</div>':'<div style="font:900 22px Georgia,serif;color:#ffd75a;margin-bottom:6px">Pause</div>')+aide381(A)+'<div style="text-align:center;margin-top:12px;position:sticky;bottom:-16px;background:rgba(24,18,12,.95);padding:8px 0"><button class="bt" id="go381" style="font-size:18px;padding:8px 26px">'+(depart?'Commencer ▶':'Reprendre ▶')+' <small>Entrée</small></button></div>';
 if(!document.getElementById('css381')){const s=document.createElement('style');s.id='css381';s.textContent='#st381 .c381{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px 18px}#st381 .c381>div{background:rgba(255,255,255,.04);border-radius:6px;padding:6px 9px}';document.head.appendChild(s)}
 el.appendChild(d);G.st381=1;const go=()=>{G.st381=0;d.remove();removeEventListener('keydown',kd,true)};const kd=e=>{if(e.key==='Enter'||(depart&&e.code==='Space')||e.key==='Escape'){e.preventDefault();e.stopPropagation();go()}};
 addEventListener('keydown',kd,true);d.querySelector('#go381').onclick=go;return d}
function start381(G,A,B,el,dire){if(!el||!A)return;panneau381(G,A,el,true);
 if(!el.querySelector('#aide381')){const bh=el.querySelector('.bh');const b=document.createElement('button');b.id='aide381';b.className='bt sec';b.textContent='📖 Coups (H)';b.style.marginLeft='6px';
  b.onclick=()=>{if(!G.st381&&!G.fini)panneau381(G,G.A||A,el,false)};if(bh)bh.appendChild(b);
  const kh=e=>{if(!document.body.contains(el)){removeEventListener('keydown',kh,true);return}if((e.key==='h'||e.key==='H')&&!G.st381&&!G.fini){e.preventDefault();panneau381(G,G.A||A,el,false)}};addEventListener('keydown',kh,true)}}

// annonce d'un enchaînement : un grand titre, et tous les boutons du duel s'allument ensemble, de la couleur du genre
// (doré : poings · bleu : pieds · violet : mêlé poings et pieds) ; rouge sombre en bordure quand c'est l'adversaire
function flash381(c,moi){const el=document.getElementById('duel');if(!el)return;const P=c.seq.every(k=>/^(p|up)/.test(k)),K=c.seq.every(k=>/^(k|bal|ret)/.test(k));
 const col=P?'#ffd75a':K?'#5ad1ff':'#d07aff',genre=P?'Poings':K?'Pieds':'Poings et pieds';
 let b=document.getElementById('ban381');if(!b){b=document.createElement('div');b.id='ban381';b.style.cssText='position:absolute;left:50%;top:30%;transform:translate(-50%,-50%);z-index:55;pointer-events:none;text-align:center;font:900 38px/1.1 Georgia,serif;text-shadow:0 3px 0 #000,0 0 22px rgba(0,0,0,.8);transition:opacity .6s,transform .15s';el.appendChild(b)}
 b.innerHTML=(moi?'':'<small style="font-size:.45em;color:#ff8a6a">L’adversaire enchaîne</small><br>')+c.n+'<br><small style="font-size:.42em;letter-spacing:.08em">'+genre.toUpperCase()+' · +30 %</small>';b.style.color=col;b.style.opacity=1;b.style.transform='translate(-50%,-50%) scale(1.2)';setTimeout(()=>b.style.transform='translate(-50%,-50%) scale(1)',150);clearTimeout(b.h);b.h=setTimeout(()=>b.style.opacity=0,1300);
 el.querySelectorAll('.gpad button').forEach(x=>{x.style.transition='box-shadow .15s,background .15s';x.style.boxShadow='0 0 0 2px '+col+',0 0 18px '+col;x.style.background=moi?col+'55':'rgba(120,30,20,.55)';clearTimeout(x.h381);x.h381=setTimeout(()=>{x.style.boxShadow='';x.style.background=''},700)})}
