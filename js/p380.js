
// ===== p380 : des gestes simples qui s'ouvrent les uns les autres, pareils dans toutes les incarnations (épopées et contes) =====
// Chaque geste dépend de ce que le personnage a en main, de ce qu'il porte, de ce qu'il y a autour (eau, arbres, bois, gibier,
// feu, compagnons) et de ses besoins. Prendre un bâton ouvre « frapper avec », « faire du bois », « s'en servir comme arme » ;
// l'arme ouvre « casser » (du bois cassé, plus sec, qui prend plus vite au feu) ; cueillir ouvre « manger », « malaxer » (une
// feuille pilée sur la plaie), « cuisiner », « jeter » ; saluer ouvre « discuter » puis « me suivre ». La barre ne montre que ce
// qui est possible ici et maintenant. Un geste qui vient de s'ouvrir a le contour qui brille ; un geste urgent (soif, faim,
// blessure) s'allume en entier ; un geste utilisé clignote. Maj + 1 à 9 joue le geste de la barre au même rang.
const ACT380={
 boire:{cons:(c)=>c.st.soif<70,n:'Boire',ic:'💧',ok:(c)=>c.eau,urg:(c)=>c.st.soif<30,f:(c)=>{c.st.soif=100;return 'Vous buvez à la rivière.'}},
 puiser:{cons:(c)=>true,n:'Puiser',ic:'🫙',ok:(c)=>c.eau&&c.sac.calebasse&&(c.sac.eau||0)<2,f:(c)=>{c.sac.eau=2;return 'La calebasse est pleine.'}},
 gorgee:{cons:(c)=>c.st.soif<60,n:'Une gorgée',ic:'🫙',ok:(c)=>!c.eau&&c.sac.calebasse&&c.sac.eau>0,urg:(c)=>c.st.soif<30,f:(c)=>{c.sac.eau--;c.st.soif=Math.min(100,c.st.soif+45);return 'Une gorgée à la calebasse.'}},
 prendre:{cons:(c)=>!!c.gib||c.st.faim<50,n:'Prendre un bâton',ic:'✋',ok:(c)=>!c.I.main380&&c.arbre,f:(c)=>{c.I.main380='baton';return 'Vous ramassez un bâton solide.'}},
 frapper:{cons:(c)=>true,n:'Frapper avec',ic:'🪵',ok:(c)=>c.I.main380&&c.gib,f:(c)=>{const g=c.gib;if(Math.random()<(c.I.arme380?.75:.45)){g.mort=1;if(g.m)g.m.visible=false;c.sac.viande=(c.sac.viande||0)+1;return 'Touché ! Une bête pour la viande.'}g.fuit=3;return 'Manqué : la bête détale.'}},
 bois:{cons:(c)=>!c.st.feu&&(c.sac.bois||0)<2,n:'Faire du bois',ic:'🪓',ok:(c)=>c.I.main380&&c.arbre&&!c.plein,f:(c)=>{c.sac.bois=(c.sac.bois||0)+1;return 'Vous détachez une branche morte : un bois de plus.'}},
 arme:{cons:(c)=>!!c.gib,n:'S’en servir comme arme',ic:'⚔️',ok:(c)=>c.I.main380&&!c.I.arme380,f:(c)=>{c.I.arme380=1;return 'Le bâton devient une arme : il frappe plus sûr, et il casse le bois.'}},
 casser:{cons:(c)=>!c.st.feu&&(c.sac.bois||0)<2,n:'Casser du bois',ic:'💥',ok:(c)=>c.I.arme380&&c.arbre&&!c.plein,f:(c)=>{c.sac.bois=(c.sac.bois||0)+1;c.sac.sec380=(c.sac.sec380||0)+1;return 'Bois cassé net, bien sec : il prendra plus vite au feu.'}},
 lacher:{n:'Jeter le bâton',ic:'↘️',ok:(c)=>c.I.main380,f:(c)=>{c.I.main380=null;c.I.arme380=0;return 'Vous laissez le bâton.'}},
 cueillir:{cons:(c)=>c.st.faim<60||c.blesse,n:'Cueillir',ic:'🌿',ok:(c)=>c.arbre&&!c.plein,f:(c)=>{if(Math.random()<.5){c.sac.fruit380=(c.sac.fruit380||0)+1;return 'Des goyaves marron, au pied des arbres.'}c.sac.plantes=(c.sac.plantes||0)+1;return 'Des feuilles qui soignent.'}},
 consommer:{cons:(c)=>c.st.faim<60,n:'Manger un fruit',ic:'🍈',ok:(c)=>c.sac.fruit380>0,urg:(c)=>c.st.faim<30,f:(c)=>{c.sac.fruit380--;c.st.faim=Math.min(100,c.st.faim+18);c.st.soif=Math.min(100,c.st.soif+6);return 'Le fruit calme la faim.'}},
 malaxer:{cons:(c)=>true,n:'Malaxer une feuille',ic:'🩹',ok:(c)=>c.sac.plantes>0&&c.blesse,urg:(c)=>c.I.souffle<=1,f:(c)=>{c.sac.plantes--;c.I.souffle=Math.min(3,(c.I.souffle||0)+1);try{incHud287()}catch(e){}return 'Une feuille pilée entre les mains, posée sur la plaie : le souffle revient.'}},
 feu:{cons:(c)=>c.nuit||(c.sac.viande||0)+(c.sac.camaron||0)>0,n:'Faire du feu',ic:'🔥',ok:(c)=>!c.st.feu&&(c.sac.bois||0)>=2,f:(c)=>{const sec=(c.sac.sec380||0)>0;if(sec)c.sac.sec380--;try{inc290Touche('f',{})}catch(e){}return sec?'Le bois cassé, bien sec, prend tout de suite.':null}},
 cuisiner:{cons:(c)=>true,n:'Cuisiner',ic:'🍲',ok:(c)=>c.feuPres&&((c.sac.viande||0)>0||(c.sac.camaron||0)>0||(c.sac.plantes||0)>0),f:(c)=>{if(c.sac.viande>0){c.sac.viande--;c.sac.cuit=(c.sac.cuit||0)+1;return 'La viande grille sur les braises.'}if(c.sac.camaron>0){c.sac.camaron--;c.sac.cuit=(c.sac.cuit||0)+1;return 'Les camarons rougissent sur la pierre chaude.'}c.sac.plantes--;c.st.faim=Math.min(100,c.st.faim+10);return 'Un bouillon de brèdes, chaud.'}},
 manger:{cons:(c)=>c.st.faim<60,n:'Manger',ic:'🍖',ok:(c)=>(c.sac.cuit||0)+(c.sac.camaron||0)+(c.sac.viande||0)>0,urg:(c)=>c.st.faim<30,f:(c)=>{try{inc290Touche('m',{})}catch(e){}return null}},
 jeter:{cons:(c)=>true,n:'Jeter un bois',ic:'🪵',ok:(c)=>(c.sac.bois||0)>0&&c.plein,f:(c)=>{c.sac.bois--;return 'Un bois de moins : vous marchez plus léger.'}},
 saluer:{cons:(c)=>true,n:'Saluer',ic:'👋',ok:(c)=>c.cp&&!c.cp.salue380,f:(c)=>{c.cp.salue380=1;return 'Vous saluez '+(c.cp.n||'votre compagnon')+' : on vous répond d’un signe.'}},
 discuter:{cons:(c)=>!c.cp.parle380,n:'Discuter',ic:'💬',ok:(c)=>c.cp&&c.cp.salue380,f:(c)=>{c.cp.parle380=1;const t=c.st.soif<50?'« L’eau ? Suis la ravine, elle descend toujours vers la rivière. »':c.st.faim<50?'« Les goyaves poussent au pied des grands arbres. »':'« Restons ensemble. Les chiens des chasseurs sentent ceux qui sont seuls. »';return t}},
 suivre:{n:'Me suivre',ic:'🚶',ok:(c)=>c.cp&&c.cp.parle380&&c.cp.ami380!==0,f:(c)=>{(c.I.cps||[]).forEach(p=>{p.x=c.h.x-1;p.z=c.h.z-1});return 'Ils marchent dans vos pas.'}},
 grimper:{n:'Grimper (G)',ic:'🧗',ok:(c)=>performance.now()-(c.I.msgRaide||0)<4000,urg:(c)=>true,f:(c)=>{c.I.keys.g=true;setTimeout(()=>{c.I.keys.g=false},2500);return 'Vous cherchez les prises : on grimpe.'}},
 repos:{cons:(c)=>(c.I.endu||100)<35,n:'Se reposer',ic:'🪨',ok:(c)=>!c.I.repos,urg:(c)=>(c.I.endu||100)<15,f:(c)=>{try{geste300(3)}catch(e){}return null}}};
const ORD380=['grimper','boire','gorgee','malaxer','manger','consommer','feu','cuisiner','cueillir','prendre','frapper','bois','arme','casser','lacher','puiser','saluer','discuter','suivre','jeter','repos'];
function ctx380(I){const st=I.st,sac=st.sac,h=I.h,d2=(a)=>Math.hypot(a.x-h.x,a.z-h.z);
 const cap=sac.bertel?8:3,nb=(sac.bois||0)+(sac.viande||0)+(sac.camaron||0)+(sac.cuit||0);
 const gib=(I.gib||[]).find(g=>!g.mort&&d2(g)<1.8);const cp=(I.cps||[]).find(p=>d2(p)<3);
 return {I,st,sac,h,eau:typeof eau290==='function'&&eau290(I,h.x,h.z)<1.6,arbre:(I.arb||[]).some(a=>d2(a)<2.4),gib,cp,plein:nb>=cap,feuPres:st.feu&&Math.hypot(st.feu.x-h.x,st.feu.z-h.z)<3,blesse:(I.souffle||3)<3,nuit:!!I.nuit}}
const UI380={vus:{},t:0};
function css380(){if(document.getElementById('css380'))return;const s=document.createElement('style');s.id='css380';s.textContent='@keyframes cons380{0%,100%{box-shadow:0 0 0 1px #ffd75a,0 0 4px #ffd75a}50%{box-shadow:0 0 0 3px #ffd75a,0 0 16px #ffd75a}}@keyframes urg380{0%,100%{box-shadow:0 0 6px #ff9a40;filter:brightness(1)}50%{box-shadow:0 0 22px #ffb060;filter:brightness(1.35)}}';document.head.appendChild(s)}
function barre380(){css380();const I=typeof INC!=='undefined'?INC:null;if(!I||!I.st||!I.el||I.duel){return}const now=performance.now();if(now-UI380.t<250)return;UI380.t=now;
 let d=document.getElementById('incA380');if(!d){const v=document.getElementById('incB300');if(v)v.querySelectorAll('[data-b^="g"]').forEach(b=>b.style.display='none');d=document.createElement('div');d.id='incA380';
  d.style.cssText='position:absolute;left:50%;transform:translateX(-50%);bottom:84px;display:flex;flex-wrap:wrap;gap:5px;justify-content:center;max-width:94%;z-index:3';I.el.appendChild(d);
  d.onclick=e=>{const b=e.target.closest('button');if(b)joue380(b.dataset.a)};UI380.vus={}}
 const c=ctx380(I),L=ORD380.filter(k=>{try{return ACT380[k].ok(c)}catch(e){return false}}).slice(0,9);const cle=L.join(',');
 L.forEach(k=>{if(!UI380.vus[k])UI380.vus[k]=now});Object.keys(UI380.vus).forEach(k=>{if(!L.includes(k))delete UI380.vus[k]});
 const html=L.map((k,i)=>{const a=ACT380[k];let urg=false,cons=false;try{urg=a.urg&&a.urg(c)}catch(e){}try{cons=a.cons&&a.cons(c)}catch(e){}const neuf=now-UI380.vus[k]<3500;
  const fl=UI380.flash&&UI380.flash.k===k&&now-UI380.flash.t<600;
  const st=urg?'background:#b8562a;border-color:#ffd27a;animation:urg380 .9s infinite':cons?'border-color:#ffd75a;animation:cons380 1.4s infinite':neuf?'box-shadow:0 0 0 2px #ffd75a,0 0 10px #ffd75a':'opacity:.8';
  return '<button data-a="'+k+'" title="Maj+'+(i+1)+'" style="font:13px Georgia,serif;padding:4px 9px;border-radius:7px;border:1px solid #8a7040;background:rgba(30,24,16,.8);color:#f1e6cc;cursor:pointer;transition:box-shadow .3s;'+st+(fl?';filter:brightness(1.8)':'')+'">'+a.ic+' '+a.n+' <small style="opacity:.6">⇧'+(i+1)+'</small></button>'}).join('');if(d.dataset.h!==html){d.innerHTML=html;d.dataset.h=html}d.dataset.cle=cle}
function joue380(k){const I=typeof INC!=='undefined'?INC:null;if(!I||!I.st||I.pause||I.duel)return;const a=ACT380[k];if(!a)return;const c=ctx380(I);if(!a.ok(c)){try{incMsg287('Pas possible ici.')}catch(e){}return}
 const m=a.f(c);if(m)try{incMsg287(m)}catch(e){}try{hud290()}catch(e){}UI380.flash={k,t:performance.now()};UI380.t=0;barre380()}
addEventListener('keydown',e=>{const I=typeof INC!=='undefined'?INC:null;if(!I||!I.st||I.duel||I.pause||!e.shiftKey)return;const m=(e.code||'').match(/^(Digit|Numpad)([1-9])$/);if(!m)return;
 const d=document.getElementById('incA380');if(!d)return;const b=d.querySelectorAll('button')[+m[2]-1];if(!b)return;e.preventDefault();e.stopPropagation();joue380(b.dataset.a)},true);

// la barre du dessous (talents 7-8-9 et pouvoirs Alt) s'allume aussi quand le moment l'appelle
function bas380(){const I=typeof INC!=='undefined'?INC:null,v=document.getElementById('incB300');if(!I||!I.st||!v)return;const h=I.h,now=performance.now();
 const ch=(I.CH||[]).some(o=>!o.hs&&Math.hypot(o.x-h.x,o.z-h.z)<18),eau=typeof eau290==='function'&&eau290(I,h.x,h.z)<1.6,raide=now-(I.msgRaide||0)<4000;
 let L=[];try{L=TAL300[typeof cle302==='function'?cle302(I):(/Anchaing/.test(I.C.heros.n)?'anchaing':I.k)]||TAL300.simang}catch(e){}
 const besoin={peche:eau&&I.st.faim<70,tangue:(I.gib||[]).some(g=>!g.mort&&g.k==='cochon'&&Math.hypot(g.x-h.x,g.z-h.z)<4),grimpe:raide,guet:ch,sagaie:(I.gib||[]).some(g=>!g.mort&&Math.hypot(g.x-h.x,g.z-h.z)<9),ralli:ch,piege:I.st.faim<60,plantes:(I.souffle||3)<3,soin:(I.souffle||3)<3&&I.st.sac.plantes>0,course:raide};
 v.querySelectorAll('button[data-b]').forEach(b=>{const k=b.dataset.b;let n=0;if(k[0]==='t'){const tl=L[+k.slice(1)];if(tl&&besoin[tl[0]])n=1}else if(k==='m0'&&ch)n=2;else if(k==='m1'&&(I.endu||100)<15)n=2;else if(k==='m2'&&besoin.tangue)n=1;
  const a=n===2?'urg380 .9s infinite':n===1?'cons380 1.4s infinite':'';if(b.style.animation!==a)b.style.animation=a})}
(function boucle380(){requestAnimationFrame(boucle380);try{barre380()}catch(e){}try{if(performance.now()-(UI380.tb||0)>300){UI380.tb=performance.now();bas380()}}catch(e){}})();
