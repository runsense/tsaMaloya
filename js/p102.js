// ===== p102 : Histoire côté colonie — les dévotions aux grands saints, et les savoirs cachés selon l'histoire suivie =====
// Dans l'histoire réelle, la force « mystique » des colons, ce sont les saints de l'île, chacun avec son trait. Les savoirs cachés
// (loges maçonniques de la noblesse, cartomanciennes, vieilles traditions normandes des chasseurs de marrons, vaudou gardé secret)
// prennent de la place quand l'histoire s'en éloigne, surtout vers l'empire des planteurs (Rhodésie).
const SAINT102=[
 {k:'denis',n:'Saint Denis',y:1669,trait:'chasse les mauvais esprits',d:'Exorcise : la mystique des marrons recule, la menace marronne baisse.',f:()=>{fx({traque:4});if(S.fac&&S.fac.m!=null)S.fac.m=Math.max(0,S.fac.m-5)}},
 {k:'antoine',n:'Saint Antoine de Padoue',y:1670,trait:'remet de l’ordre et fait retrouver ce qui est perdu',d:'Rectifie le désordre : cohésion +4, et l’on retrouve des vivres égarés (+3).',f:()=>fx({coh:4,vivres:3})},
 {k:'marie',n:'La Vierge Marie',y:1663,trait:'protège tous ses enfants',d:'Protège : santé +5, cohésion +2 pour toute l’habitation.',f:()=>fx({sante:5,coh:2})},
 {k:'immac',n:'L’Immaculée Conception',y:1854,trait:'veille sur l’île entière',d:'Proclamée en 1854 : la protection s’étend, santé +4 et colonie +3.',f:()=>fx({sante:4,ami:3})},
 {k:'salette',n:'Notre-Dame de la Salette',y:1859,trait:'guérit',d:'Depuis le vœu de Saint-Leu pendant le choléra : guérit, santé +10.',f:()=>fx({sante:10})},
 {k:'parasol',n:'La Vierge au parasol',y:1890,trait:'retient la lave',d:'Sur le chemin de la lave, à Sainte-Rose : protège des coulées et des cyclones de l’Est (santé +3, vivres +2).',f:()=>fx({sante:3,vivres:2})},
 {k:'therese',n:'Sainte Thérèse de Lisieux',y:1925,trait:'fait pleuvoir des roses',d:'Console et apaise : cohésion +5.',f:()=>fx({coh:5})},
 {k:'expedit',n:'Saint Expédit',y:1931,trait:'agit tout de suite',d:'Pour les causes pressantes : deux bras de plus cette saison.',f:()=>{S.bras=(S.bras||0)+2}}];
const CACHE102=[
 {k:'loge',n:'La loge des nobles',si:()=>S.year>=1750,fort:()=>{const b=BR88();return b.barons||b.empire||b.revo||b.usa},d:'Les frères de la loge se tiennent entre eux : savoir +2, colonie +3.',f:k=>fx({savoir:Math.round(2*k),ami:Math.round(3*k)})},
 {k:'carto',n:'La cartomancienne',si:()=>S.year>=1700&&(S.carto102||(S.carto102=rnd()<.25?1:-1))>0,fort:()=>BR88().empire||BR88().sorc,d:'Une dame de la haute lit les cartes, en secret : elle dit ce qui vient (le prochain récit est annoncé) ; cohésion +1.',f:k=>{fx({coh:1});const id=Object.keys(EV).find(q=>EV[q].y&&EV[q].y>S.year&&!S.done[q]&&(!EV[q].si||EV[q].si()));log(id?'Les cartes annoncent : « '+EV[id].t+' ».':'Les cartes restent muettes.')}},
 {k:'normand',n:'Les vieilles coutumes des chasseurs',si:()=>S.year>=1700,fort:()=>BR88().angl2||BR88().empire,d:'Des chasseurs de marrons venus de Normandie gardent d’anciens rites de chasse, venus de loin (interprétation du jeu) : la traque monte (+6).',f:k=>fx({traque:Math.round(6*k)})},
 {k:'vaudou',n:'Le savoir vaudou des planteurs',si:()=>BR88().empire,fort:()=>true,d:'Dans l’empire des planteurs, les loges mêlent leurs rites à des savoirs vaudous, cachés aux esclaves : traque +8, colonie +4 ; mais s’ils l’apprennent, la cohésion s’effondre.',f:k=>{fx({traque:8,ami:4});if(rnd()<.2){fx({coh:-8});log('Des esclaves ont surpris le rite : la nouvelle court les camps, la peur change de côté.')}}}];
function devCd102(k){S.dev102=S.dev102||{};return Math.max(0,(S.dev102[k]||-99)+4-(S.ns||0))}
function devHtml102(){let h='<h3 style="font-size:17px">Les dévotions</h3><p class="note" style="font-size:13px">Les grands saints de l’île, chacun avec son trait. Une prière coûte 1 bras ; on peut revenir vers le même saint au bout de 4 saisons.</p>';
 SAINT102.forEach(s=>{const ok=S.year>=s.y,cd=devCd102(s.k);h+='<div class="sv'+(ok?' ok':'')+'" style="display:block"><b>'+(ok?'🕯️ ':'🔒 ')+s.n+'</b> <small>· '+s.trait+(ok?'':' · à partir de '+s.y)+'</small><small>'+s.d+'</small>'+(ok?'<button class="bt'+(cd||S.bras<1?' sec':'')+'" data-dev102="'+s.k+'" style="margin-top:4px"'+(cd||S.bras<1?' disabled':'')+'>'+(cd?'Dans '+cd+' saison'+(cd>1?'s':''):'Prier')+'</button>':'')+'</div>'});
 const C=CACHE102.filter(c=>c.si());if(C.length){h+='<h3 style="font-size:16px;margin-top:10px">Ce qui ne se dit pas</h3><p class="note" style="font-size:12px">Des savoirs gardés en secret par une partie de la colonie. Plus votre histoire s’éloigne du réel, plus ils pèsent.</p>';
  C.forEach(c=>{const cd=devCd102(c.k),fort=c.fort();h+='<div class="sv ok" style="display:block"><b>'+c.n+(fort?' ✦':'')+'</b><small>'+c.d+(fort?' Dans votre histoire, ce savoir est plus fort.':'')+'</small><button class="bt'+(cd||S.bras<1?' sec':'')+'" data-cache102="'+c.k+'" style="margin-top:4px"'+(cd||S.bras<1?' disabled':'')+'>'+(cd?'Dans '+cd+' saison'+(cd>1?'s':''):'Y recourir')+'</button></div>'})}
 return h}
{const d0=drawer;drawer=function(){d0.apply(this,arguments);try{if(onglet!=='pou'||!S||!modeHist()||!S.voieC)return;const d=$('drawer');if(!d||d.querySelector('.p102'))return;const div=document.createElement('div');div.className='p102';div.innerHTML=devHtml102();d.prepend(div)}catch(e){}}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-dev102],[data-cache102]');if(!b||!S||S.bras<1)return;const k=b.dataset.dev102||b.dataset.cache102;S.dev102=S.dev102||{};if(devCd102(k))return;S.bras-=1;S.dev102[k]=S.ns||0;
 if(b.dataset.dev102){const s=SAINT102.find(x=>x.k===k);s.f();log('🕯️ Prière à '+s.n+' : '+s.d)}else{const c=CACHE102.find(x=>x.k===k);c.f(c.fort()?1.5:1);log(c.n+' : '+c.d.split(':')[0]+'.')}try{sauve();rafraichir();drawer()}catch(_){}});

// ===== Le moringue : au kabar, chez les marrons ; sur l'habitation, en cachette, puni si l'on est pris =====
RITE99.unshift({k:'moringue',n:'Le moringue au kabar',m:2,c:{},d:'Au son du roulèr, on se mesure en dansant : les jeunes s’aguerrissent. Cohésion +3, et le camp se défend mieux (gardiens +2).',f:k=>fx({coh:Math.round(3*k),gardiens:Math.round(2*k)})});
EV.moringC={y:1740,si:()=>!!S.voieC,tag:'Mémoire',an:'XVIIIᵉ siècle',hist:1,nat:'Le moringue, lutte dansée venue de Madagascar et d’Afrique, se pratiquait en cachette sur les habitations ; il était puni.',
 t:'Le moringue en cachette',b:'Une nuit, derrière les cases, des esclaves se mesurent en dansant au son d’un tambour étouffé : le moringue. Le commandeur les a vus.',
 o:[{n:'Fermer les yeux',d:'Cohésion +3, mais les maîtres voisins le reprochent (colonie −2).',fx:{coh:3,ami:-2}},{n:'Faire punir',d:'Comme la loi le veut : colonie +2, cohésion −4.',fx:{ami:2,coh:-4}}]};

// ===== Histoire : pendant que des envoyés marchent vers un lieu, on n'affiche pas déjà le groupe arrivé là-bas =====
{const mp=mfPoser;mfPoser=function(cle,n,x,y,z,ry,clip){try{if(/^e\d/.test(cle)&&typeof MARCHE75!=='undefined'&&MARCHE75.length&&MARCHE75.some(w=>{const d=T[w.P[w.P.length-1]];return d&&Math.hypot(d.x-x,d.z-z)<.7})){const f=MF.L[cle];if(f&&f.o)f.o.visible=false;return}}catch(_){}return mp.apply(this,arguments)}}

// ===== Les plantes venues avec les colons, que les marrons emploient autrement, comme on le faisait dans d'autres terres colonisées =====
HERB.herbebouc={n:'Herbe à bouc',ic:'🌾',y:1700,de:'des Amériques, par les navires des colons, qui la laissent pousser dans les friches',mythe:'En Afrique et à Madagascar, la même herbe sert depuis longtemps aux remèdes : on en fait des emplâtres pour les plaies et des tisanes contre la fièvre. Ceux qui arrivent la reconnaissent et l’emploient autrement que les maîtres.',test:'Elle referme les plaies et fait tomber la fièvre.'};
ING99.herbebouc={n:'Herbe à bouc',ic:'🌾',ou:'les friches et les bords des terres défrichées, dans les bas',ok:t=>!t.bare&&t.alt<900&&((S.t[t.i]||{}).clr||t.nb.some(i=>(S.t[i]||{}).c))};
RITE99.splice(1,0,{k:'bouc',n:'L’emplâtre d’herbe à bouc',m:3,c:{herbebouc:2},d:'Une herbe des colons, employée comme en Afrique : on soigne les plaies et les fièvres. Santé +8.',f:k=>fx({sante:Math.round(8*k)})});
