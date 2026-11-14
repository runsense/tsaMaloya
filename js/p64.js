// ===== p64 : Survie — on clique un lieu, une bulle s'ouvre là où l'on a cliqué : ce qu'on peut y faire, et combien on y envoie =====
// Les bras sont rangés par rang social : chez les colons, le maître ne va pas aux champs ; les domestiques travaillent à la maison,
// les libres tiennent magasins et chapelle, les esclaves vont aux champs, au bois, à la pierre. Au camp : les anciens au conseil et aux soins,
// les chasseurs-guerriers à la chasse et au guet, les autres à la cueillette, aux jardins, au bois.
const KCLS={c:{maitre:{n:'Maîtres',p:.05,ic:'🎩'},libre:{n:'Libres (artisans, régisseurs)',p:.15,ic:'🧰'},dom:{n:'Domestiques de la maison',p:.15,ic:'🏠'},champ:{n:'Esclaves des champs',p:.65,ic:'🌾'}},
 m:{ancien:{n:'Anciens',p:.1,ic:'🌀'},chasseur:{n:'Chasseurs et guerriers',p:.3,ic:'🏹'},cueil:{n:'Cueilleurs et travailleurs',p:.6,ic:'🌿'}}};
function kClasses(act){const c=K.joueur==='c',k=act.replace(/^bat_/,'');
 if(c){if(/habitation/.test(k))return ['dom','champ','libre'];if(/ville/.test(k))return ['libre','dom','champ'];if(/magasin|chapelle|port|grenier/.test(k))return ['libre','champ'];return ['champ','libre']}
 if(/guet|sentier|vivres/.test(k))return ['chasseur','cueil','ancien'];if(/camp|conseil|soin/.test(k))return ['ancien','cueil','chasseur'];return ['cueil','chasseur','ancien']}
function kClasse(act){return kClasses(act)[0]}
function kPools(){const C=KCLS[K.joueur==='c'?'c':'m'],B=kBras(),R={};let reste=B;const ks=Object.keys(C);ks.forEach((k,i)=>{R[k]=i===ks.length-1?reste:Math.round(B*C[k].p);reste-=R[k]});
 // le maître ne travaille pas de ses mains : il ne compte pas dans les bras qu'on envoie
 if(R.maitre!=null)R.maitre=0;return R}
// qui travaille où : chaque tâche prend d'abord dans le rang qui lui revient, puis dans le suivant
function kOccCls(){const P=kPools(),R={};Object.values(K.trav||{}).forEach(a=>Object.entries(a).forEach(([k,v])=>{let n=v;kClasses(k).forEach((c,i,L)=>{const lib=(P[c]||0)-(R[c]||0),pris=i===L.length-1?n:Math.min(n,Math.max(0,lib));R[c]=(R[c]||0)+pris;n-=pris})}));return R}
function kLibresCls(c){return Math.max(0,(kPools()[c]||0)-(kOccCls()[c]||0))}
function kLibresAct(act){return kClasses(act).reduce((s,c)=>s+kLibresCls(c),0)}
{const km=kMettre;kMettre=function(i,act,d){if(d>0){const lib=kLibresAct(act);if(lib<=0){toast('Plus personne de libre pour cette tâche : '+kClasses(act).map(c=>KCLS[K.joueur==='c'?'c':'m'][c].n.toLowerCase()).join(', ')+'.');return}d=Math.min(d,lib)}return km.call(this,i,act,d)}}
// la bulle : la fiche du lieu (ce qu'on peut bâtir, ce qu'on peut y faire) s'ouvre là où l'on a cliqué ; la colonne de droite se tait
function kBulleFerme(){const b=$('kBul');if(b)b.hidden=true;const A=$('kA');if(A){A.style.opacity='';A.style.pointerEvents=''}}
function kBulle(t,x,y){let b=$('kBul');if(!b){b=document.createElement('div');b.id='kBul';document.body.appendChild(b);['pointerdown','pointerup','click'].forEach(ev=>b.addEventListener(ev,e=>e.stopPropagation()))}
 const A=$('kA'),src=A&&(A.querySelector('.pc')||A);if(!src){b.hidden=true;return}const C=KCLS[K.joueur==='c'?'c':'m'],P=kPools(),O=kOccCls();
 b.innerHTML='<button class="bt sec kbX" id="kBulX">✕</button>'+src.innerHTML+'<div class="kbC">'+Object.keys(C).filter(k=>k!=='maitre').map(k=>'<span>'+C[k].ic+' '+C[k].n+' : <b>'+Math.max(0,(P[k]||0)-(O[k]||0))+'</b> libres / '+(P[k]||0)+'</span>').join('')+'</div>';
 // chaque bouton de la bulle actionne le bouton correspondant de la fiche
 const orig=[...src.querySelectorAll('button')],copie=[...b.querySelectorAll('button:not(#kBulX)')];
 copie.forEach((c,n)=>{c.onclick=()=>{const o=orig[n];if(o)o.click();setTimeout(()=>{if(KVUE.sel===t.i)kBulle(t,x,y);else kBulleFerme()},60)}});
 // « remplir » : tout le monde qu'il faut d'un coup
 b.querySelectorAll('[data-tp]').forEach(p=>{const k=p.dataset.tp,full=/^bat_/.test(k)?(KBRAS[k.slice(4)]||10):10;const r=document.createElement('button');r.className='bt sec';r.textContent='Remplir';r.title='Envoyer jusqu’à '+full+' personnes';
  r.onclick=()=>{const cur=((K.trav||{})[t.i]||{})[k]||0;if(full>cur)kMettre(t.i,k,full-cur);kSauve();kRendu();setTimeout(()=>kBulle(t,x,y),60)};p.after(r)});
 $('kBulX').onclick=kBulleFerme;b.hidden=false;if(A){A.style.opacity='0';A.style.pointerEvents='none'}
 const W=innerWidth,H=innerHeight;b.style.left=Math.min(W-350,Math.max(8,x+16))+'px';b.style.top=Math.min(H-b.offsetHeight-8,Math.max(70,y-30))+'px'}
{const st=document.createElement('style');st.textContent='#kBul{position:fixed;z-index:9000;width:320px;max-height:70vh;overflow:auto;background:rgba(18,26,30,.94);border:1px solid #e8be5a;border-radius:10px;padding:10px 12px;color:#f0e6d0;font-size:13px;box-shadow:0 8px 30px rgba(0,0,0,.5)}#kBul .kbX{float:right;margin:-2px -4px 0 6px}#kBul .pc{background:none;border:0;padding:0}#kBul .kbC{display:flex;flex-direction:column;gap:2px;margin-top:8px;border-top:1px solid rgba(232,190,90,.3);padding-top:6px;font-size:12px;opacity:.9}#kBul .bt{padding:3px 8px;font-size:12px}';document.head.appendChild(st)}
// on ouvre la bulle au clic sur la carte ou la ville (pas après un glisser)
{let dn=null;addEventListener('pointerdown',e=>{const d=$('kons');if(d&&!d.hidden&&e.target.tagName==='CANVAS'&&d.contains(e.target)&&e.button===0)dn=[e.clientX,e.clientY];else dn=null},true);
 addEventListener('pointerup',e=>{if(!dn)return;const m=Math.hypot(e.clientX-dn[0],e.clientY-dn[1]);dn=null;if(m>5)return;const x=e.clientX,y=e.clientY;setTimeout(()=>{try{if(KVUE.sel==null)return;const t=T[KVUE.sel];if(t)kBulle(t,x,y)}catch(_){}},30)},true)}
{const kf=kFermer;kFermer=function(){kBulleFerme();return kf.apply(this,arguments)}}
addEventListener('keydown',e=>{if(e.key==='Escape')kBulleFerme()});
