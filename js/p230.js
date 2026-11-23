// ===== p230 : la fiche ouverte devient un objet — un papier selon qui l'a écrit, posé sur un fond qui dit l'époque =====
// - au camp marron : une lettre froissée, pliée, tachée, bords déchirés ;
// - du gouverneur, de la Compagnie, du roi : beau papier, liseré doré, cachet de cire et une fleur de vanille pour impressionner ;
// - mystique : un parchemin sombre où passe un signe effacé ;
// - la vie de l'île : une page de carnet, avec une feuille séchée.
// Le fond : l'époque de la fiche (les premiers temps, le café, la Révolution, le sucre, l'engagisme, le département).
const EP230=[[0,1715,'Les premiers temps · la Compagnie des Indes','#123a4a','#0b2230','navire'],[1715,1789,'Le temps du café','#4a3418','#24180b','cafe'],[1789,1815,'Révolution et Empire','#3a2430','#1a1018','drapeau'],
 [1815,1848,'Le temps du sucre et de l’esclavage','#1e3a1e','#0c1a0c','canne'],[1848,1946,'Engagisme et colonie','#3e3428','#1a150f','usine'],[1946,9999,'Le département','#2a3440','#11161c','route']];
const SVG230={
 navire:'<path d="M20 70 L80 70 L72 80 L28 80Z M50 70 L50 20 M50 22 L72 40 L50 40 M50 44 L70 62 L50 62 M48 26 L32 44 L48 44" fill="none" stroke="currentColor" stroke-width="2"/>',
 cafe:'<path d="M50 85 C50 60 46 40 30 20 M48 55 C60 50 70 40 72 28 M46 40 C36 38 28 32 24 24" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="62" cy="48" r="4" fill="currentColor"/><circle cx="56" cy="56" r="4" fill="currentColor"/><circle cx="38" cy="44" r="4" fill="currentColor"/>',
 drapeau:'<path d="M30 85 L30 15 M30 18 L72 18 L72 48 L30 48" fill="none" stroke="currentColor" stroke-width="2"/><path d="M44 18 L44 48 M58 18 L58 48" stroke="currentColor" stroke-width="1"/>',
 canne:'<path d="M35 90 L42 15 M50 90 L52 10 M65 90 L60 18 M42 40 L30 30 M52 35 L66 26 M60 50 L72 44" fill="none" stroke="currentColor" stroke-width="2"/>',
 usine:'<path d="M15 85 L15 55 L35 45 L35 55 L55 45 L55 55 L75 45 L75 85Z M62 45 L62 15 L70 15 L70 45" fill="none" stroke="currentColor" stroke-width="2"/><path d="M66 12 C60 6 70 2 64 -4" fill="none" stroke="currentColor" stroke-width="1.5"/>',
 route:'<path d="M20 90 L45 20 M80 90 L55 20 M50 85 L50 75 M50 65 L50 57 M50 48 L50 42 M50 34 L50 30" fill="none" stroke="currentColor" stroke-width="2"/>'};
const VANILLE230='<svg viewBox="0 0 120 90" width="170" height="128" style="position:absolute;top:-44px;right:-50px;transform:scaleX(-1) rotate(-14deg);filter:drop-shadow(0 2px 2px #0004)"><path d="M10 80 C40 70 70 66 112 70" stroke="#3b2a14" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M14 84 C44 76 72 74 110 76" stroke="#2a1d0e" stroke-width="3" fill="none" stroke-linecap="round"/>'+
 '<g transform="translate(48 34)"><ellipse rx="10" ry="22" fill="#eef3d6" transform="rotate(0)"/><ellipse rx="9" ry="20" fill="#e8efcc" transform="rotate(72)"/><ellipse rx="9" ry="20" fill="#e8efcc" transform="rotate(-72)"/><ellipse rx="8" ry="18" fill="#f1f5df" transform="rotate(144)"/><ellipse rx="8" ry="18" fill="#f1f5df" transform="rotate(-144)"/><path d="M-6 0 C-6 10 6 10 6 0 C4 -6 -4 -6 -6 0Z" fill="#f2d24a"/><circle r="2.5" fill="#c9a32a"/></g><path d="M70 40 C82 36 92 44 96 56" stroke="#5a7a2a" stroke-width="3" fill="none"/></svg>';
const CACHET230='<div style="position:absolute;right:18px;bottom:16px;width:54px;height:54px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#c8363a,#7a1418 70%);box-shadow:0 2px 4px #0006,inset 0 0 6px #0006;display:flex;align-items:center;justify-content:center;color:#f4c9b0;font:bold 20px Georgia,serif;transform:rotate(-8deg)">⚜</div>';
const FEUILLE230='<svg viewBox="0 0 80 60" width="90" height="68" style="position:absolute;top:-10px;right:-8px;transform:rotate(18deg);opacity:.85"><path d="M6 54 C20 20 50 6 74 6 C70 30 44 52 6 54Z" fill="#7a8a4a"/><path d="M8 52 C30 36 50 20 72 8" stroke="#5a6a32" stroke-width="1.5" fill="none"/></svg>';
(function(){const st=document.createElement('style');st.textContent=`
#ecran.ep230{background-size:cover!important}
.pap230{position:relative;margin:26px auto 10px;max-width:640px;padding:30px 34px 26px;color:#2a2118;border-radius:2px;box-shadow:0 10px 30px #000a}
.pap230 *{text-shadow:none!important}.pap230 .plume208{padding-left:6px;overflow:visible}.pap230 h1,.pap230 p,.pap230 .note{color:#2a2118!important}.pap230 .note{opacity:.85}.pap230 .note b{filter:brightness(.55) saturate(1.4)}
.pap230.marron{background:linear-gradient(103deg,transparent 48%,#0000000d 49%,#ffffff40 50%,transparent 51%),linear-gradient(12deg,transparent 30%,#00000012 31%,#ffffff33 32%,transparent 33%),linear-gradient(-36deg,transparent 64%,#0000000f 65%,#ffffff2a 66%,transparent 67%),radial-gradient(circle at 78% 82%,#8a5a2a30 0 30px,transparent 60px),radial-gradient(circle at 15% 20%,#6a4a2a22 0 20px,transparent 45px),#d8c9a2;
 transform:rotate(-1.2deg);clip-path:polygon(0 2%,6% 0,14% 1.5%,25% 0,38% 1%,52% 0,66% 1.6%,80% 0,92% 1.2%,100% 0,99% 20%,100% 42%,98.8% 64%,100% 86%,99% 100%,84% 98.6%,70% 100%,52% 98.8%,34% 100%,18% 98.5%,4% 100%,0 86%,1.2% 60%,0 38%,1% 18%)}
.pap230.gouv{background:radial-gradient(ellipse at center,#fbf6e6 60%,#efe2bd),#f6efdc;border:3px double #b8902e;outline:1px solid #e3cf8e;outline-offset:-10px;padding:40px 44px 34px}
.pap230.mystique{background:radial-gradient(ellipse at center,#d9c7a0 40%,#9a8358 100%);color:#24180c}
.pap230.mystique::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 50 m0 -4 a4 4 0 1 1 -4 4 a8 8 0 1 1 8 -8 a14 14 0 1 1 -14 14 a22 22 0 1 1 22 -22 a32 32 0 1 1 -32 32' fill='none' stroke='%23533a1a' stroke-width='1.2' opacity='.18'/%3E%3C/svg%3E") center/70% no-repeat;pointer-events:none}
.pap230.vie{background:repeating-linear-gradient(#f4efe2 0 27px,#b8c8d8 27px 28px),#f4efe2;box-shadow:inset 44px 0 0 -42px #d88a8a,0 10px 30px #000a}
.ep230lab{position:absolute;left:0;right:0;top:8px;text-align:center;font:italic 14px Georgia,serif;letter-spacing:.08em;color:#ffffffaa;text-transform:uppercase}
.ep230ic{position:absolute;right:4%;bottom:4%;width:30vmin;height:30vmin;color:#ffffff18;pointer-events:none}`;document.head.appendChild(st)})();
function deco230(){try{const e=$('ecran');if(!e||e.hidden)return;const b=e.querySelector('#fic208b');
 if(!b){if(e.classList.contains('ep230')){e.classList.remove('ep230');e.style.background='';e.querySelectorAll('.ep230x').forEach(x=>x.remove())}return}
 const bloc=b.closest('.bloc');if(!bloc||bloc.dataset.d230)return;bloc.dataset.d230=1;
 const note=bloc.querySelector('.note'),txt=bloc.textContent,y=+((note&&note.textContent.match(/1[6-9]\d\d|20\d\d/)||[1700])[0]);
 const pl=bloc.querySelector('.plume208'),voix=pl?(pl.classList.contains('marron')?'marron':pl.classList.contains('mystique')?'mystique':pl.classList.contains('vie')?'vie':''):'';
 const gouv=!voix&&/gouverneur|compagnie|roi|ordonnance|conseil|règlement|lettres patentes|intendant|commandant/i.test(txt);const cl=voix||(gouv?'gouv':'gouv');
 // le papier
 const pap=document.createElement('div');pap.className='pap230 '+cl;bloc.parentNode.insertBefore(pap,bloc);pap.appendChild(bloc);bloc.style.borderLeft='none';bloc.style.background='transparent';bloc.style.boxShadow='none';bloc.style.paddingLeft='0';
 if(cl==='gouv'){pap.insertAdjacentHTML('afterbegin',VANILLE230+CACHET230)}else if(cl==='vie'){pap.insertAdjacentHTML('afterbegin',FEUILLE230)}
 b.style.position='relative';b.style.zIndex=2;
 // le fond de l'époque
 const E=EP230.find(r=>y>=r[0]&&y<r[1])||EP230[0];e.classList.add('ep230');e.style.background='radial-gradient(ellipse at 30% 20%,'+E[3]+','+E[4]+' 80%)';
 e.insertAdjacentHTML('afterbegin','<div class="ep230x ep230lab">'+E[2]+'</div><svg class="ep230x ep230ic" viewBox="0 0 100 100">'+SVG230[E[5]]+'</svg>')}catch(x){}}
try{new MutationObserver(deco230).observe(document.body,{childList:true,subtree:true})}catch(e){setInterval(deco230,400)}
