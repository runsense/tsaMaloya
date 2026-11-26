// ===== p319 : « Quelle histoire ? » rangé en tableau — à gauche le côté marron, à droite le côté colon. Sur chaque colonne :
// l'histoire, le départ en 1794, les épopées, puis les utopies de ce côté (Personnages de fiction). =====
const COTE319={misson:'m',roiElu:'m',gardienne:'m',aurore:'c',maquis:'c'};
function utopies319(c){const e=$('ecran'),K=Object.keys(EPC291).filter(k=>EPC291[k].fic&&(COTE319[k]||'c')===c);
 e.innerHTML='<div class="bloc"><h1>'+(c==='m'?'Les utopies marronnes':'Les utopies coloniales')+'</h1><p class="note">Des personnages de fiction, chacun d’une utopie du jeu. Chaque chapitre dit ce qui est inventé et ce qui est réel.</p>'+K.map(k=>{const E=EPC291[k];return '<button class="op dif" data-epc="'+k+'"><b>'+E.n+'</b><small>Personnage de fiction — de l’utopie '+E.fic+' · '+E.an+' · '+E.ch.filter(x=>x.jeu).map(x=>({cmd:'commando',ech:'échecs',bat:'bataille',duel:'duel'})[x.jeu[0]]).join(', ')+'</small></button>'}).join('')+'<button class="bt sec" id="epuR">Retour</button></div>';
 e.querySelectorAll('[data-epc]').forEach(x=>x.onclick=()=>{e.hidden=true;epcJouer291(x.dataset.epc,0)});$('epuR').onclick=()=>choixVoie()}
{const st=document.createElement('style');st.textContent=
 '.tab319{display:grid;grid-template-columns:1fr 1fr;gap:10px 18px;margin-top:6px}.tab319 h3{margin:0;font:600 13px system-ui;letter-spacing:.08em;text-transform:uppercase;padding-bottom:4px;border-bottom:1px solid currentColor}'+
 '.tab319 .m319{color:#e3b866}.tab319 .c319{color:#9fc4d8}.tab319 .op{margin:0!important;width:100%;height:100%;box-sizing:border-box}.tab319 .op small{font-size:12.5px;line-height:1.35}'+
 '.tab319 .bt{width:100%;margin:0}.tab319 .ut319{border-style:dashed!important}'+
 '.tab319 .col319{display:flex;flex-direction:column;gap:8px}.bloc.l319{max-width:min(1060px,96vw)!important;width:100%}'+
 '.tab319>button.bt{align-self:center}@media (max-width:700px){.tab319{grid-template-columns:1fr}.tab319>*{order:var(--o)}}';document.head.appendChild(st)}
{const cv=choixVoie;choixVoie=function(){const r=cv.apply(this,arguments);try{const e=$('ecran'),bl=e.querySelector('.bloc'),g=id=>document.getElementById(id);
 if(!bl||!g('v-m')||!g('v-c')||bl.querySelector('.tab319'))return r;
 const court=(b,t)=>{if(b&&t){const s=b.querySelector('small');if(s)s.textContent=t}};
 court(g('v-m'),'Les dix qui fuient vers la montagne : cacher les camps, survivre, garder la liberté.');
 court(g('v-c'),'La petite colonie de Saint-Paul, Louis Payen et les siens. Leurs serviteurs malgaches fuient dans les Hauts.');
 court(g('v-epo'),'Devenir roi ou reine : le chemin à pied, de la plantation au camp.');
 court(g('v-epc'),'La Bourdonnais, corsaires, traite illégale, 1848 : duel, commando, bataille ou échecs.');
 const m94=g('v-m94'),c94=g('v-c94');if(m94)m94.textContent='Commencer en 1794 côté marrons';if(c94)c94.textContent='Commencer en 1794 côté colonie';
 const ut=c=>{const b=document.createElement('button');b.className='op dif ut319';const n=Object.keys(EPC291||{}).filter(k=>EPC291[k].fic&&(COTE319[k]||'c')===c).map(k=>EPC291[k].n.split(',')[0]);
  b.innerHTML='<b>'+(c==='m'?'Les utopies marronnes':'Les utopies coloniales')+'</b><small>Personnages de fiction : '+n.join(' · ')+'.</small>';b.onclick=()=>utopies319(c);return b};
 const col=(c,L)=>{const d=document.createElement('div');d.className='col319';L.filter(Boolean).forEach(x=>d.appendChild(x));return d};
 const t=document.createElement('div');t.className='tab319';
 const h=(c,x)=>{const z=document.createElement('h3');z.className=c;z.textContent=x;return z};
 const Lm=[h('m319','Côté marrons'),g('v-m'),m94,g('v-epo'),ut('m')],Lc=[h('c319','Côté colonie'),g('v-c'),c94,g('v-epc'),ut('c')];Lm.forEach((x,i)=>{const y=Lc[i];[[x,i],[y,i+5]].forEach(([z,o])=>{if(!z)z=document.createElement('div');z.style.setProperty('--o',o);t.appendChild(z)})});
 const u=g('v-epu');if(u)u.remove();[...bl.querySelectorAll('p.note')].forEach(p=>{if(/1794/.test(p.textContent))p.remove()});[...bl.querySelectorAll('div')].forEach(d=>{if(!d.children.length&&!d.textContent.trim())d.remove()});
 bl.querySelector('h1').after(t);bl.classList.add('l319');const ret=g('retV');if(ret)ret.remove()}catch(x){console.warn(x)}return r}}
