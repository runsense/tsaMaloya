
// ===== p119 : l'histoire vraie est contée telle quelle ; les mythes et fictions ont une carte translucide, au cadre fondu dans le décor,
// colorée selon leur nature. En utopie suivie, le conte prend la couleur de son utopie. =====
const COUL119={mythe:[150,110,210],fiction:[70,170,170],uchro:[230,150,60],memoire:[200,170,110]};
const UTOC119={centre:[230,190,90],ombre:[120,110,170],sir:[60,170,200],roy:[210,170,60],lib:[200,80,70],anc:[170,110,60],abol:[90,190,120],maur:[80,150,210],angl:[190,70,90],cors:[60,120,170],arab:[200,140,60],vichy:[130,130,130],comp:[200,120,50],cafe:[150,100,60],polit:[230,120,160]};
function nature119(id,e){if(!e)return null;const tx=(()=>{try{return (e.t||'')+' '+(e.b||'')+' '+(e.nat||'')}catch(x){return ''}})();
 if(/^Mythe$/.test(e.tag||'')&&/uchronie|utopie/i.test(tx))return 'uchro';if(/^Mythe$/.test(e.tag||''))return 'mythe';if(e.tag==='Conte'||/fiction|inventé|imaginé/i.test(e.nat||''))return 'fiction';if(e.tag==='Mémoire')return 'memoire';return null}
setInterval(()=>{try{const m=$('modal');if(!m||m.hidden||!S||!S.evq||!S.evq.length)return;const c=m.querySelector('.carte');if(!c)return;const id=S.evq[0],e=EV[id],cle=id+'|'+(S.orK||'');if(c.dataset.n119===cle)return;c.dataset.n119=cle;
 c.classList.remove('fic119','uto119');c.style.removeProperty('--c119');const uto=typeof enUtopie113==='function'&&enUtopie113()&&modeHist();
 if(uto){const k=(S.orK||'').slice(2),rgb=UTOC119[k]||[200,150,90];c.classList.add('uto119');c.style.setProperty('--c119',rgb.join(','));return}
 const n=nature119(id,e);if(!n)return;c.classList.add('fic119');c.style.setProperty('--c119',COUL119[n].join(','))}catch(x){}},250);
{const st=document.createElement('style');st.textContent=
 '#modal .carte.fic119{background:radial-gradient(ellipse at center,rgba(20,18,24,.78) 55%,rgba(var(--c119),.22) 85%,rgba(var(--c119),0) 100%)!important;border:0!important;box-shadow:0 0 60px 30px rgba(var(--c119),.18),inset 0 0 40px rgba(var(--c119),.25)!important;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}'+
 '#modal .carte.fic119 h2,#modal .carte.fic119 .tag{color:rgb(var(--c119))!important}#modal .carte.fic119 .in>p{color:#f4eee6;text-shadow:0 1px 2px #000}'+
 '#modal .carte.fic119 .op{background:rgba(var(--c119),.14)!important;border-color:rgba(var(--c119),.45)!important}'+
 '#modal .carte.uto119{background:linear-gradient(160deg,rgba(var(--c119),.30),rgba(22,18,14,.92) 40%)!important;border:1px solid rgba(var(--c119),.75)!important;box-shadow:0 0 40px rgba(var(--c119),.35)!important}#modal .carte.uto119 h2{color:rgb(var(--c119))!important}#modal .carte.uto119 .op{border-color:rgba(var(--c119),.55)!important}';document.head.appendChild(st)}
// ===== Une fiction « plus vraie que le vrai » : les gardiens venus de l'Inde du Sud =====
// Fondements réels : le comptoir de Pondichéry ; les engagés tamouls arrivés à partir des années 1820-1830 ; les loges maçonniques de Bourbon
// à la fin du XVIIIᵉ siècle ; une étymologie populaire rattache le nom des îles Andaman à Hanuman. Le reste est inventé pour le jeu.
Object.assign(EV,{
 dravid119:{y:1772,si:()=>S&&((S.myst||0)>=8||BR88().compB||BR88().loge||(S.out&&S.out.inde)),tag:'Mythe',an:'1772',nat:'Fiction créée pour le jeu, bâtie sur des faits réels (voir la base historique).',t:'Le navire des gardiens',
  get b(){return 'Une lettre scellée d’une loge de Paris arrive au gouverneur : un navire de la Compagnie déposera à Saint-Paul, de nuit, une trentaine de passagers venus de la côte de Coromandel et des îles Andaman — que des marins disent nommées d’après Hanuman. Des gardiens de temples, des récitants, des guérisseurs dravidiens : leurs savoirs sont pourchassés là-bas. La lettre dit seulement : « Bourbon sera leur refuge ; que nul ne les inscrive. »'+(S.voieC?'':' En haut, on voit des feux inconnus sur la plage.')},
  v:'Une île choisie comme refuge pour des savoirs interdits.',h:'Faits réels : Pondichéry est un comptoir français depuis la fin du XVIIᵉ siècle ; des loges maçonniques existent à Bourbon à la fin du XVIIIᵉ siècle ; des milliers d’engagés tamouls arrivent au XIXᵉ siècle, avec leurs temples, leurs marches sur le feu et le cavadee. Une étymologie populaire relie le nom des îles Andaman à Hanuman. Le navire, la lettre et les gardiens sont inventés.',
  get o(){return S.voieC?[{n:'Les cacher dans les Hauts de Saint-Paul',d:'Mystique +5, colonie −3 : nul ne les inscrit.',fx:{myst:5,ami:-3},f:()=>{BR88().drav=1}},{n:'Les inscrire comme engagés',d:'Bras +1, colonie +2 : comme l’auraient fait les registres.',fx:{ami:2},f:()=>{S.gens++},hist:1}]:[{n:'Descendre les accueillir',d:'Mystique +6, traque +4 : leurs récits se mêlent à ceux des anciens.',fx:{myst:6,traque:4},f:()=>{BR88().drav=1}},{n:'Les laisser aux Blancs',d:'Rien ne change.',fx:{},hist:1}]}},
 dravid119b:{y:1830,si:()=>S&&BR88().drav,tag:'Mythe',an:'1830',nat:'Fiction créée pour le jeu.',t:'Ceux qui étaient déjà là',
  b:'Quand les premiers engagés tamouls débarquent, des vieux des Hauts les accueillent dans leur langue, connaissent leurs chants, leurs dieux, le nom des fleurs à offrir. Les nouveaux venus ne comprennent pas : on leur dit que des gardiens sont arrivés soixante ans plus tôt, et qu’ils ont attendu.',
  v:'La fiction rejoint l’histoire : la culture tamoule s’enracine dans l’île.',h:'Réel : les engagés indiens, surtout tamouls, arrivent en nombre après l’abolition de 1848 et dès les années 1820-1830 ; leurs temples et leurs fêtes font partie de l’île.',
  o:[{n:'Bâtir le premier petit temple ensemble',d:'Mystique +4, cohésion +4.',fx:{myst:4,coh:4},hist:1}]}
});
// dans les mythes qui suivent, les gardiens laissent une trace
setInterval(()=>{try{if(!S||!BR88().drav)return;const m=$('modal');if(!m||m.hidden)return;const id=S.evq&&S.evq[0],e=id&&EV[id];if(!e||e.tag!=='Mythe'||/^dravid119/.test(id))return;const inn=m.querySelector('.carte .in')||m.querySelector('.carte');if(!inn||inn.querySelector('.drv119'))return;
 const L=['Les vieux des Hauts disent qu’un gardien venu de Coromandel connaissait déjà ce récit, sous un autre nom.','On raconte qu’Hanuman, le singe qui sautait d’île en île, est passé par ici avant les navires.','Un récitant tamoul des Hauts murmure la même histoire, dans une langue que personne d’autre ne parle.'];
 const p=document.createElement('p');p.className='drv119';p.style.cssText='font-style:italic;color:#e0a060;margin:6px 0';p.textContent='🪔 '+L[(id.length*3+(S.ns||0))%L.length];const b=inn.querySelector('p');if(b)b.after(p);else inn.appendChild(p)}catch(e){}},500);
