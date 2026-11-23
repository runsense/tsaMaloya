// ===== p265 : textes et boutons qui ne tremblent plus.
// - Quand un panneau est trop plein, seul le TEXTE se resserre ; les boutons (qui ont leur propre cadre) gardent leur taille.
// - Les mots en gras d'un texte resserré gardent presque leur taille : on les lit encore d'un coup d'œil.
// - La mesure se fait sans les effets de survol (un bouton grossi au survol faisait déborder le cadre, le texte se resserrait,
//   puis revenait : d'où le scintillement). Et on ne change le resserrement que s'il bouge vraiment.
// - Le cadre coupe en hauteur seulement (overflow-y: clip) : un bouton grossi au survol n'est plus rogné sur les côtés. =====
{const st=document.createElement('style');st.textContent=
 '.mes265,.mes265 *{transform:none!important;transition:none!important}'+
 '[data-z265] p b,[data-z265] p strong,[data-z265] li b,[data-z265] li strong{zoom:var(--bz265,1)}'+
 'button:not(:disabled):hover,.bt:not(:disabled):hover,.act:not(:disabled):hover{transform-origin:center center}';
 document.head.appendChild(st)}
ajuste=function(el){if(!el||!el.isConnected||!el.clientHeight)return;
 el.classList.add('mes265');
 try{
  if(el._fz&&el._fz[0]===el.scrollHeight&&el._fz[1]===el.clientHeight&&el._fz[2]===el.childElementCount)return;
  let K=[...el.children];if(K.length===1&&K[0].classList.contains('in'))K=[...K[0].children];
  const txt=K.filter(c=>!(c.matches('button,.op,.bt,.act')||(c.children.length&&[...c.children].every(x=>x.matches('button,.op,.bt,.act')))));
  const z0=parseFloat(el.dataset.z265||'1');
  txt.forEach(c=>c.style.zoom='');[...el.children].forEach(c=>{if(!txt.includes(c))c.style.zoom=''});el.style.overflowY='';
  let z=1;
  if(el.scrollHeight>el.clientHeight+2){z=Math.max(.6,1-(el.scrollHeight-el.clientHeight)/Math.max(1,el.scrollHeight)*1.02);
   const btn=K.filter(c=>!txt.includes(c)),bz=q=>Math.max(.8,(1+q)/2);
   for(let n=0;n<8;n++){txt.forEach(c=>c.style.zoom=z);btn.forEach(c=>c.style.zoom=bz(z));if(el.scrollHeight<=el.clientHeight+2||z<=.6)break;z=Math.max(.6,z-.04)}}
  // pas de va-et-vient : si le nouveau resserrement est presque l'ancien, on garde l'ancien
  if(Math.abs(z-z0)<.03&&z0<=1){z=z0}
  txt.forEach(c=>c.style.zoom=z<1?z:'');K.filter(c=>!txt.includes(c)).forEach(c=>c.style.zoom=z<1?Math.max(.8,(1+z)/2):'');
  if(z<1){el.dataset.z265=z;el.style.setProperty('--bz265',Math.min(1.22,1/z).toFixed(3))}else{delete el.dataset.z265;el.style.removeProperty('--bz265')}
  if(el.scrollHeight<=el.clientHeight+2)el.style.overflowY='clip';
  el._fz=[el.scrollHeight,el.clientHeight,el.childElementCount];
 }finally{el.classList.remove('mes265')}};
