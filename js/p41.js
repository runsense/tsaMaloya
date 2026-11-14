// ===== p41 : les pouvoirs F1–F12 aussi dans la bataille contre un détachement et sur mer ; le pavé numérique pour le combat naval ; ZQSD ou WASD selon le passage =====
// sur mer, F7 et F8 n'ont pas de sens (racines, silence) : ils restent éteints
const PVN={6:1,7:1};
{const pl=pvLancer;pvLancer=function(i){const P=PVF[i],now=performance.now();
 // la bataille contre un détachement
 if(typeof B!=='undefined'&&B&&B.etat==='go'&&!$('btu')){if((PVS.cd[i]||0)>now){toast(P[0]+' : encore '+Math.ceil((PVS.cd[i]-now)/1000)+' s.');return}if(!pvPaye(P[1])){toast('Pas assez de mystique pour '+P[0]+'.');return}PVS.cd[i]=now+12000;
  const E=B.en.filter(e=>!e.dead&&!e.pas&&e.c>=0),S0=B.slots.filter(s=>s.w),tue=e=>{if(!e)return;e.dead=1;B.morts++;B.fx.push({x:BX(Math.round(e.c)),y:262,k:'tir',t:6})};
  if(i===0)tue(E.sort((a,b)=>b.c-a.c)[0]);if(i===1)E.forEach(e=>e.wait=(e.wait||0)+2);if(i===2)E.filter(e=>Math.abs(e.c-3)<1).forEach(tue);if(i===3)tue(E.sort((a,b)=>b.c-a.c)[0]);
  if(i===4||i===5)B.prot=(B.prot||0)+(i===4?3:5);if(i===6)E.forEach(e=>e.wait=(e.wait||0)+1);if(i===7)E.forEach(e=>e.wait=(e.wait||0)+3);
  if(i===8||i===9){const m=S0.filter(s=>s.mort);m.slice(0,i===8?1:2).forEach(s=>{s.mort=0;B.pertes=Math.max(0,B.pertes-1)})}
  if(i===10)S0.filter(s=>!s.mort).forEach(s=>{const e=B.en.find(e=>!e.dead&&!e.pas&&Math.abs(e.c-s.c)<=1.5);if(e&&Math.random()<.5)tue(e)});if(i===11)E.forEach(e=>e.c=Math.max(-1,e.c-1));
  toast(P[0]+' !');drawBat();pvBarre();return}
 // sur mer
 if(typeof N!=='undefined'&&N&&!N.fin){if(PVN[i]){toast('Ce pouvoir ne sert à rien sur mer.');return}if((PVS.cd[i]||0)>now){toast(P[0]+' : encore '+Math.ceil((PVS.cd[i]-now)/1000)+' s.');return}if(!pvPaye(P[1])){toast('Pas assez de mystique pour '+P[0]+'.');return}PVS.cd[i]=now+12000;
  const Ee=N.e,Pp=N.p,L=N.log;if(i===0){Ee.c-=3;L.push('Le feu des ancêtres court sur la coque ennemie.')}if(i===1){Ee.q=Math.max(0,Ee.q-3);L.push('Une peur sans nom saisit leur équipage.')}if(i===2){Ee.c-=2;Ee.q=Math.max(0,Ee.q-1);L.push('Une vague se lève contre eux.')}if(i===3){Ee.k=Math.max(0,Ee.k-1);L.push('La foudre fend un de leurs canons.')}
  if(i===4){N.vent=1;L.push('La brume tombe : ils vous perdent, vous prenez le vent.')}if(i===5){Pp.c=Math.min(Pp.cM,Pp.c+2);L.push('Le gris-gris tient la coque.')}if(i===8){Pp.q=Math.min(Pp.qM,Pp.q+2);L.push('Les blessés se relèvent.')}if(i===9){Pp.c=Math.min(Pp.cM,Pp.c+1);Pp.q=Math.min(Pp.qM,Pp.q+1);L.push('Saint Expédit veille sur le sloop.')}
  if(i===10&&N.dist>0){N.dist--;L.push('Un souffle vous pousse vers eux.')}if(i===11&&N.dist<2){N.dist++;L.push('Vous filez vers le large.')}if(Ee.c<=0&&!N.fin){N.fin='Le navire ennemi sombre.'}navDraw();pvBarre();return}
 return pl(i)}}
// la protection (brume, gris-gris) : pendant quelques pas du combat, personne ne tombe
{const sb=stepBat;stepBat=function(){if(!B||!(B.prot>0))return sb.apply(this,arguments);const av=B.slots.map(s=>s.mort),p0=B.pertes;const r=sb.apply(this,arguments);if(B){B.slots.forEach((s,k)=>{if(s.mort&&!av[k])s.mort=0});B.pertes=p0;B.prot--}return r}}
// la barre des pouvoirs s'affiche aussi dans ces deux combats
{const pb=pvBarre;pvBarre=function(){const zone=$('btu')?null:(typeof B!=='undefined'&&B&&B.etat==='go'&&$('bat'))||(typeof N!=='undefined'&&N&&!N.fin&&$('nav'));if(!zone)return pb.apply(this,arguments);
 let b=$('pvF');if(b&&b.parentElement!==zone){b.remove();b=null}if(!b){b=document.createElement('div');b.id='pvF';b.style.cssText='position:fixed;left:50%;transform:translateX(-50%);bottom:8px;display:flex;gap:3px;z-index:60;flex-wrap:wrap;justify-content:center;max-width:98vw';zone.appendChild(b);b.onclick=e=>{const k=e.target.closest('[data-pf]');if(k)pvLancer(+k.dataset.pf)}}
 const now=performance.now(),m=pvMyst(),C={c:'#e87b5a',p:'#70b0ff',s:'#70e0a0',d:'#e8be5a'},mer=!!(typeof N!=='undefined'&&N&&zone===$('nav'));b.style.display='flex';
 b.innerHTML='<small style="align-self:center;color:#b080e0;margin-right:4px">✦ '+Math.floor(m)+'</small>'+PVF.map((P,i)=>{const off=mer&&PVN[i],cd=Math.max(0,(PVS.cd[i]||0)-now),ok=!off&&!cd&&m>=P[1];return '<button data-pf="'+i+'" title="'+(off?'Sans effet sur mer':P[2])+'" style="font:11px system-ui;padding:3px 6px;border-radius:5px;border:1px solid '+C[P[3]]+';background:'+(ok?'rgba(30,25,18,.92)':'rgba(30,25,18,.5)')+';color:'+(ok?'#f0e6d0':'#776')+';cursor:pointer'+(off?';opacity:.35':'')+'"><b style="color:'+C[P[3]]+'">F'+(i+1)+'</b> '+P[0]+' <small>'+(off?'—':cd?Math.ceil(cd/1000)+' s':P[1]+'✦')+'</small></button>'}).join('')}}
setInterval(()=>{const actif=(typeof B!=='undefined'&&B&&B.etat==='go')||(typeof N!=='undefined'&&N&&!N.fin);if(actif)pvBarre();else{const b=$('pvF');if(b&&!$('btu'))b.remove()}},400);
addEventListener('keydown',e=>{const m=/^F([1-9]|1[0-2])$/.exec(e.key);if(!m||$('btu')||(window.__fps&&__fps.F))return;const actif=(typeof B!=='undefined'&&B&&B.etat==='go')||(typeof N!=='undefined'&&N&&!N.fin);if(!actif)return;e.preventDefault();e.stopPropagation();pvLancer(+m[1]-1)},true);

// ---------- le pavé numérique pour le combat naval ----------
const NUMNAV={Numpad8:'appr',Numpad2:'eloi',Numpad5:'bord',Numpad0:'abor',Numpad7:'vent',Numpad9:'fuir',Numpad1:'tour',Numpad3:'chant'};
addEventListener('keydown',e=>{if(typeof N==='undefined'||!N)return;const k=NUMNAV[e.code];if(!k){if(N.fin&&(e.code==='NumpadEnter'||e.code==='Enter')){const o=$('navOk');if(o){e.preventDefault();o.click()}}return}e.preventDefault();const b=document.querySelector('#nav [data-nv="'+k+'"]');if(b&&!b.disabled)b.click()},true);
{const nd=navDraw;navDraw=function(){nd.apply(this,arguments);const d=$('nav');if(!d||!N)return;const inv={};Object.entries(NUMNAV).forEach(([c,k])=>inv[k]=c.replace('Numpad',''));d.querySelectorAll('[data-nv]').forEach(b=>{const t=inv[b.dataset.nv];if(t!=null&&!b.querySelector('.kNum'))b.querySelector('b').insertAdjacentHTML('afterbegin','<span class="kNum" style="display:inline-block;min-width:16px;padding:0 3px;margin-right:5px;border:1px solid #e8be5a;border-radius:3px;font-size:11px;color:#e8be5a">'+t+'</span>')});
 if(!d.querySelector('.kNumA')){const c=d.querySelector('.carte');if(c)c.insertAdjacentHTML('beforeend','<p class="kNumA sub" style="opacity:.75;font-size:12px">Pavé numérique : 8 approcher · 2 s’éloigner · 5 bordée · 0 abordage · 7 vent · 9 fuir · 1 et 3 la sirène · F1–F12 les pouvoirs.</p>')}}}

// ---------- ZQSD en français, WASD dans les passages anglais ----------
function passageAnglais(){try{return !!((S&&S.br&&S.br.angl)||(S&&S.orK==='u:angl')||(typeof N!=='undefined'&&N&&N.v&&N.v.nat==='anglais'))}catch(e){return false}}
setInterval(()=>{const F0=window.__fps&&__fps.F;if(!F0)return;const ang=passageAnglais();document.querySelectorAll('#fps *').forEach(e=>{if(e.children.length)return;const t=e.textContent;if(/ZQSD|WASD/.test(t)){const n=t.replace(/ZQSD|WASD/g,ang?'WASD':'ZQSD');if(n!==t)e.textContent=n}})},1000);
