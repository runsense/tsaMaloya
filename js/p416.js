// ===== p416 : les chefs marrons tels que l'histoire générale les raconte et les montre — on doit les reconnaître
// au combat, dans la façon dont chaque camp vit et décide (camps séparés), et dans leurs épopées.
// Chaque trait dit d'où il vient : archive, tradition orale, ou choix du jeu. =====
const TR416={
 anchaing:{n:'Anchaing',src:'Tradition',de:1725,a:1770,em:'⛰',col:'#6a8a4a',
  vu:'Le solitaire du piton : pagne de vacoa, bâton à la main, toujours en hauteur, jamais face aux chasseurs.',
  tr:'Refuse tout contact avec les habitations : il cultive, pêche les camarons et vit caché avec Héva sur le piton qui porte son nom.',
  dc:'Se cacher plutôt que se battre',dd:'Traces du camp réduites (traque −1 par saison), jardins +1 vivre ; mais une descente lancée depuis ce camp coûte de la cohésion.',
  cb:'Au combat, il ne cherche pas l’affrontement : il esquive et gagne les hauteurs.'},
 heva:{n:'Héva',src:'Tradition',de:1725,a:1770,em:'🌿',col:'#7a9a5a',
  vu:'La compagne d’Anchaing : tête couverte, panier de vacoa, les plantes des Hauts à la ceinture.',
  tr:'Elle connaît les simples des Hauts ; la tradition lui donne une fille, Marianne, mariée à Cimendef.',
  dc:'Les simples des Hauts',dd:'Santé +0,5 par saison.',cb:'Au combat, elle tient à distance avec le bâton et soigne entre deux échanges.'},
 dimitile:{n:'Dimitile',src:'Archive et tradition',de:1725,a:1765,em:'👁',col:'#8a6a3a',
  vu:'Le guetteur des crêtes : fichu noué sur la tête, sagaie levée, le bras tendu vers la vallée où montent les détachements.',
  tr:'Les archives le disent capitaine d’une troupe, influent en 1743 des hauts de Saint-Paul à ceux de Saint-Pierre. La tradition ajoute qu’il ne fut jamais pris : de ses crêtes, il voyait venir les chasseurs.',
  dc:'Guetter depuis les crêtes',dd:'Quand une troupe monte vers ce camp, les guetteurs la voient une fois sur trois : le camp se vide ou tend une embuscade, et la troupe repart bredouille.',
  cb:'Au combat, il frappe le premier, depuis la hauteur, puis disparaît.'},
 mafate:{n:'Mafate',src:'Archive et tradition',de:1725,a:1751,em:'🔮',col:'#6a4a8a',
  vu:'L’ancien ombiasy : assis sur la roche, la cape de toile sur les épaules, l’ody (talisman) à la main.',
  tr:'Les archives parlent d’un chef surpris vers 1751 par Mussard (sans certitude). La tradition en fait un ombiasy, devin-guérisseur malgache, qui lit le sikidy dans les graines.',
  dc:'Consulter le sikidy',dd:'Santé +1 par saison ; chaque saison, le sikidy annonce si les chasseurs approchent, et une troupe sur cinq trouve le camp déjà vide.',
  cb:'Au combat, il ne frappe pas le premier : il appelle les ancêtres et protège les siens.'},
 laverdure:{n:'Laverdure',src:'Archive',de:1725,a:1752,em:'👑',col:'#a05a3a',
  vu:'Le « roi de tous les marrons » : sagaie et fusil pris aux habitations, toujours à la tête des descentes.',
  tr:'Attesté : il est tué en 1752 par le détachement de Mussard, dans les hauts du Bras de la Plaine, avec sa compagne Sarlave.',
  dc:'Descendre sur les habitations',dd:'Les descentes depuis ce camp rapportent plus (vivres +4), mais attirent les détachements (traque +1).',
  cb:'Au combat, il charge en avant et rallie les siens.'},
 sarlave:{n:'Sarlave',src:'Archive et tradition',de:1725,a:1752,em:'💍',col:'#a0507a',
  vu:'La reine des camps de l’îlette : port droit, pagne noué haut, entourée des femmes du camp.',
  tr:'Les archives la disent compagne de Laverdure, tuée avec lui en 1752. La tradition en fait une reine (manjaka) qui tient la discipline des « villages défendus ».',
  dc:'Tenir le village défendu',dd:'Cohésion +1 par saison ; les camps alliés partagent leurs nouvelles.',cb:'Au combat, elle commande plus qu’elle ne frappe.'},
 simangavole:{n:'Simangavole',src:'Tradition (récits recueillis par Leal)',de:1740,a:1780,em:'🗡',col:'#b06a8a',
  vu:'La guerrière des Salazes : turban de toile, sagaie dans une main, bâton dans l’autre, debout au bord du rempart.',
  tr:'Guerrière et conseillère, partie de l’Est jusqu’aux Trois Salazes, selon les récits (part de légende).',
  dc:'Garder le rempart',dd:'Cohésion +1 par saison et traque −1 : les détachements trouvent moins le camp.',cb:'Au combat, elle lance la sagaie et saute du rempart.'},
 cimendef:{n:'Cimendef',src:'Tradition',de:1725,a:1770,em:'🧗',col:'#5a6a8a',
  vu:'L’homme des remparts : bras croisés, coutelas à la ceinture, gilet de peau, il grimpe là où personne ne passe.',
  tr:'La tradition l’unit à Marianne, fille d’Anchaing et d’Héva : une alliance entre camps.',
  dc:'Passer par les remparts',dd:'Traque −1 par saison ; allié d’un camp d’Anchaing ou d’Héva, cohésion +1.',cb:'Au combat, il frappe au coutelas et se dérobe par les parois.'},
 raharianne:{n:'Raharianne',src:'Archive et récits',de:1725,a:1751,em:'🔥',col:'#8a4a6a',
  vu:'La compagne de Mafate, coutelas en main, qui crie son nom au combat.',
  tr:'Tuée avec lui à la Rivière des Galets en 1751 ; les récits en font une guerrière.',
  dc:'La plante des chiens',dd:'Les chiens des chasseurs perdent la trace : traque −1 par saison.',cb:'Au combat, elle jette la plante des chiens et frappe au coutelas.'},
 phaonce:{n:'Phaonce',src:'Tradition',de:1730,a:1780,em:'⚖',col:'#7a6a4a',
  vu:'Le roi qui juge : assis devant la case commune, le bâton de commandement posé sur les genoux.',
  tr:'La tradition le compte parmi les rois marrons (manjaka) qui imposaient une discipline stricte ; ses dates restent inconnues.',
  dc:'La discipline du manjaka',dd:'Cohésion +1 par saison, mais les fady (interdits) pèsent : mystique +1.',cb:'Au combat, il frappe peu, mais ses ordres tiennent les siens.'}};
const DUE416={dimitile:'dimitile',heva:'heva',cimendef:'cimendef',simangalove:'simangavole',raharianne:'raharianne'};
const INC416={simang:'simangavole',laverdure:'laverdure',dimitile:'dimitile',mafate:'mafate',cimendef:'cimendef',anchaing:'anchaing'};

const HIS416={"anchaing": [["A", "Le nom est resté sur la carte : le Piton d’Anchaing, au-dessus de Salazie."], ["V", "Certains auteurs citent un esclave nommé Anchaing au recensement de 1751 à Sainte-Suzanne : non vérifié ici."], ["T", "La tradition le dit enfui de l’habitation avec Héva. Ils montent jusqu’au piton, y cultivent en secret et y élèvent leurs enfants, loin de tout."], ["T", "Découvert un jour par les chasseurs, il aurait fui plus haut encore, sans jamais se battre."]], "heva": [["T", "Héva n’existe que dans la tradition : compagne d’Anchaing, elle partage sa fuite et sa vie cachée sur le piton."], ["T", "Les récits lui donnent une fille, Marianne, que la tradition marie à Cimendef."]], "dimitile": [["A", "Les archives de la Compagnie le citent comme chef d’une troupe ; en 1743, son influence s’étend des hauts de Saint-Paul à ceux de Saint-Pierre."], ["A", "Un plateau des hauts de l’Entre-Deux porte toujours son nom : le Dimitile."], ["T", "La tradition dit qu’il ne fut jamais pris : de ses crêtes, il voyait venir les détachements et disparaissait avant eux."], ["J", "Aujourd’hui, l’association « Le Capitaine Dimitile » a reconstitué un camp marron sur le plateau."]], "mafate": [["A", "Les archives parlent d’un chef marron surpris vers 1751 par le détachement de François Mussard, chasseur de marrons bien attesté ; l’identification reste incertaine."], ["A", "Le nom est resté au cirque de Mafate."], ["T", "La tradition en fait un ombiasy, devin-guérisseur malgache, qui lisait le sikidy dans les graines et connaissait les plantes."], ["T", "On raconte qu’il est mort à la Rivière des Galets avec sa compagne Raharianne."]], "laverdure": [["A", "Attesté par les archives : chef de camps dans les Hauts, il est tué en 1752 par le détachement de François Mussard, dans les hauts du Bras de la Plaine."], ["A", "Sa compagne Sarlave meurt avec lui."], ["T", "La tradition l’appelle « roi de tous les marrons »."], ["T", "On lui attribue des descentes nocturnes sur les habitations des Bas, pour le fer, la poudre et le sel."]], "sarlave": [["A", "Compagne de Laverdure, tuée avec lui en 1752 par le détachement de Mussard."], ["T", "La tradition l’appelle « reine » (manjaka) et lui prête la discipline des « villages défendus »."]], "simangavole": [["T", "Son histoire vient des récits recueillis par Leal : guerrière et conseillère du chef Matouté, partie de l’Est jusqu’aux Trois Salazes."], ["T", "Une part de légende : aucune archive connue ne raconte sa fuite."]], "cimendef": [["A", "Le nom est resté sur la carte : le Piton Cimendef, entre Mafate et Salazie."], ["T", "La tradition en fait un chef des remparts, qui grimpait là où personne ne passait."], ["T", "Selon la tradition, il épouse Marianne, fille d’Anchaing et d’Héva : une alliance entre camps."]], "raharianne": [["A", "Les récits la disent tuée avec Mafate à la Rivière des Galets en 1751 ; l’archive de cette mort reste à retrouver."], ["T", "Les récits en font une guerrière, qui criait le nom de son compagnon au combat."]], "phaonce": [["T", "Phaonce n’est connu que par la tradition : un des rois marrons (manjaka) qui imposaient une discipline stricte."], ["V", "Ses dates et ses lieux restent inconnus : rien de vérifié ici."]]};
const NAT416={A:['✅ Fait attesté','#4a8a4a'],T:['🗣 Tradition orale','#8a6a3a'],V:['❓ À vérifier','#8a4a4a'],J:['🎮 Aujourd’hui','#4a6a8a']};
function histoire416(k){const H=HIS416[k];if(!H)return '';return '<div style="margin:4px 0 2px"><b>Son histoire</b></div>'+H.map(([n,t])=>'<div style="font-size:13px;margin:3px 0"><span style="color:'+NAT416[n][1]+';font-weight:700">'+NAT416[n][0]+'</span> — '+t+'</div>').join('')}
// la carte d'un chef : comment on le reconnaît, ce qu'on en sait, d'où ça vient
function haut416(){setTimeout(()=>{const L=[...document.querySelectorAll('div')].filter(d=>d.style.zIndex==='95');const d=L[L.length-1];if(d){d.style.zIndex='100001';d.style.background='rgba(10,8,6,.85)';const c=d.firstElementChild;if(c)c.style.background='#1d1a16'}},0)}
function carte416(k,plein){const c=TR416[k];if(!c)return '';
 return '<div style="border-left:5px solid '+c.col+';padding:4px 10px;margin:6px 0"><b>'+c.em+' '+c.n+'</b> <small style="opacity:.75">· '+c.src+'</small><br><small><b>On le reconnaît :</b> '+c.vu+'</small><br><small><b>Ce qu’on en sait :</b> '+c.tr+'</small><br><small><b>Son camp :</b> '+c.dc+' — '+c.dd+'</small><br><small><b>Au combat :</b> '+c.cb+'</small>'+(plein?histoire416(k):'')+'</div>'}
const vivant416=k=>{const c=TR416[k],y=S&&S.year||1700;return c&&y>=c.de&&y<=c.a};
const tut416=ci=>{const k=((S&&S.tut416)||{})[ci];return k&&vivant416(k)?k:null};
const campsDe416=k=>camps().filter(c=>tut416(c.i)===k);
// ----- 1. chaque camp suit l'exemple d'un chef : ses façons de vivre et de décider -----
function choisir416(ci){const pris=Object.entries(S.tut416||{}).filter(([c,k])=>+c!==ci).map(([c,k])=>k);
 const L=Object.keys(TR416).filter(k=>vivant416(k)&&!pris.includes(k));
 if(!L.length){toast('Aucun chef connu n’est en vie à cette date.');return}
 alerteSimple('Ce camp suit l’exemple de…','Chaque camp a sa façon de vivre : se cacher, guetter, descendre sur les habitations, consulter les ancêtres. Les chefs vivent dans d’autres camps ; leur exemple se raconte de camp en camp.'+'<div style="max-height:55vh;overflow:auto">'+L.map(k=>carte416(k)).join('')+'</div>',
  L.map(k=>[TR416[k].em+' '+TR416[k].n,()=>{(S.tut416=S.tut416||{})[ci]=k;log(TR416[k].em+' Le camp suit désormais l’exemple de '+TR416[k].n+' : '+TR416[k].dc.toLowerCase()+'.');sauve();try{cvListe()}catch(e){}}]).concat([['Aucun',()=>{if(S.tut416)delete S.tut416[ci];try{cvListe()}catch(e){}}]]));haut416()}
{const cl=cvListe;cvListe=function(){cl.apply(this,arguments);try{if(!CV.on||CV.camp==null||S.voieC)return;const K=$('cvCamp');if(!K)return;K.querySelectorAll('.tut416').forEach(e=>e.remove());
 const ci=CV.camp,k=tut416(ci),c=k&&TR416[k],b=document.createElement('div');b.className='pc tut416';
 b.innerHTML='<b>L’exemple suivi</b><br><small>'+(c?c.em+' '+c.n+' — '+c.dc:'Aucun chef connu.')+'</small><br><button class="bt sec">'+(c?'Changer':'Choisir')+'</button>';
 b.querySelector('button').onclick=()=>choisir416(ci);if(c){const h=document.createElement('button');h.className='bt sec';h.textContent='📜 Son histoire';h.onclick=()=>{alerteSimple(c.em+' '+c.n,'<div style="max-height:60vh;overflow:auto">'+carte416(k,1)+'</div>',[['Fermer',()=>{}]]);haut416()};b.appendChild(h)}const B=K.querySelector('.chefC')||K.querySelector('.besC');if(B)B.after(b);else K.appendChild(b)}catch(e){}}}
// ----- 2. à chaque saison, chaque camp vit selon son exemple ; entre camps, alliances et rivalités -----
{const s0=saison;saison=function(){const nd=S&&S.nDesc||0;const r=s0.apply(this,arguments);try{if(!S||S.voieC||!S.tut416)return r;
 const has=k=>campsDe416(k).length>0,f={coh:0,sante:0,vivres:0};let tr=0;
 if(has('anchaing')){tr-=1;f.vivres+=1}if(has('heva'))f.sante+=.5;if(has('mafate'))f.sante+=1;if(has('sarlave'))f.coh+=1;if(has('simangavole')){f.coh+=1;tr-=1}
 if(has('cimendef')){tr-=1;if(has('anchaing')||has('heva'))f.coh+=1}if(has('raharianne'))tr-=1;if(has('phaonce')){f.coh+=1;S.myst=(S.myst||0)+1}
 const d=(S.nDesc||0)-nd;if(d>0){if(has('laverdure')){f.vivres+=4*d;tr+=1;log('👑 À la manière de Laverdure, la descente a ramené plus que prévu — et les détachements le savent.')}
  if(has('anchaing')){f.coh-=2;log('⛰ Au camp d’Anchaing, on désapprouve : une descente, c’est la piste qui monte jusqu’au piton.')}}
 if(has('mafate')){const t=S.traque||0;log('🔮 Le sikidy de Mafate : '+(t>50?'les graines tombent mal, les chasseurs sont tout près.':t>20?'des chasseurs rôdent dans les ravines.':'les chemins sont calmes cette saison.'))}
 // rivalités et alliances (tradition et logique du jeu)
 if(has('anchaing')&&has('laverdure')&&rnd()<.25){f.coh-=2;log('⚔ Dispute entre camps : ceux d’Anchaing reprochent aux gens de Laverdure d’attirer les chiens vers les Hauts.')}
 if(has('dimitile')&&campsDe416('dimitile').length&&camps().length>1&&rnd()<.3){tr-=1;log('👁 Les guetteurs de Dimitile préviennent les autres camps : une troupe monte par la ravine.')}
 if(has('cimendef')&&(has('anchaing')||has('heva'))&&!S.done.union416){S.done.union416=1;f.coh+=3;log('💍 Selon la tradition, Cimendef épouse Marianne, fille d’Anchaing et d’Héva : les deux camps s’allient.')}
 if(f.coh||f.sante||f.vivres)fx(f);if(tr)S.traque=Math.max(0,(S.traque||0)+tr)}catch(e){}return r}}
// quand une troupe monte vers un camp, l'exemple suivi peut tout changer
if(typeof raid106Jouer==='function'){const rj=raid106Jouer;raid106Jouer=function(c){try{const k=c&&tut416(c.i),p={dimitile:1/3,mafate:.2,anchaing:.2,simangavole:.15}[k]||0;
 if(p&&rnd()<p){const m={dimitile:'👁 Les guetteurs de Dimitile ont vu la troupe depuis la crête : le camp s’est vidé, et l’embuscade a fait reculer les chasseurs.',mafate:'🔮 Le sikidy avait parlé : quand la troupe arrive, le camp est déjà vide.',anchaing:'⛰ La troupe cherche le camp et ne trouve que la forêt : à la manière d’Anchaing, il était trop bien caché.',simangavole:'🗡 Depuis le rempart, les gens de Simangavole repoussent la troupe à coups de pierres et de sagaies.'}[k];
  log(m);fx({coh:2});S.traque=Math.max(0,(S.traque||0)-3);try{conteVoir(c,4)}catch(e){}return}}catch(e){}return rj.apply(this,arguments)}}
// ----- 3. au combat : on le reconnaît dès l'entrée -----
function bandeau416(k,cote){const c=TR416[k];if(!c)return;const d=document.createElement('div');d.className='b416';
 d.style.cssText='position:fixed;'+(cote?'right:12px':'left:12px')+';top:70px;z-index:100000;max-width:300px;background:rgba(20,16,12,.88);color:#f0e6d0;border-left:5px solid '+c.col+';padding:8px 12px;border-radius:6px;font-size:13px;pointer-events:none;transition:opacity 1s';
 d.innerHTML='<b>'+c.em+' '+c.n+'</b> <small style="opacity:.7">· '+c.src+'</small><br>'+c.vu+'<br><i>'+c.cb+'</i>';document.body.appendChild(d);setTimeout(()=>{d.style.opacity=0},7000);setTimeout(()=>d.remove(),8200)}
{const od=window.ouvrirDuel;if(typeof od==='function'){window.ouvrirDuel=ouvrirDuel=function(a,b){const r=od.apply(this,arguments);try{document.querySelectorAll('.b416').forEach(e=>e.remove());if(DUE416[a])bandeau416(DUE416[a],0);if(DUE416[b])bandeau416(DUE416[b],1)}catch(e){}return r}}}
// ----- 4. dans les épopées incarnées : le trait connu, dès le premier pas -----
{const io=incOuvrir287;incOuvrir287=function(k,ci){const r=io.apply(this,arguments);try{const t=INC416[k]||(INC&&INC.C&&/Anchaing/.test(INC.C.heros&&INC.C.heros.n||'')?'anchaing':null);if(t&&!(ci|0))setTimeout(()=>{bandeau416(t,0)},1500)}catch(e){}return r}}
// ----- 5. la fiche : comment l'histoire les raconte -----
EV.chefs416={y:1750,tag:'Mémoire',an:'XVIIIᵉ siècle',si:()=>false,t:'Les chefs marrons, tels qu’on les raconte',
 b:'Les chefs des camps marrons n’avaient pas tous la même façon de résister. Certains, comme Anchaing et Héva dans la tradition, refusaient tout contact et vivaient cachés sur les pitons. D’autres, comme Laverdure, attesté par les archives, menaient des descentes nocturnes sur les habitations pour prendre du fer, de la poudre, du sel et des semences. Dimitile, connu des archives en 1743, garde dans la tradition la figure du guetteur : de ses crêtes, il voyait monter les détachements. Les ombiasy, devins-guérisseurs malgaches comme Mafate dans la tradition, lisaient le sikidy dans les graines et préparaient les ody, talismans de racines, d’os et d’écorces. Les sommets et les cavernes passaient pour habités par les esprits, et les camps vivaient sous des fady, des interdits. Les fouilles de la « vallée secrète » de Cilaos ont mis au jour un vrai campement d’altitude, avec des pipes à tabac.',
 h:'Archive : Laverdure et Sarlave (tués en 1752), Dimitile (1743), les rapports des détachements, les fouilles de Cilaos. Tradition orale : Anchaing et Héva, les unions entre camps (Cimendef et Marianne), les titres de manjaka (roi ou reine, comme Phaonce ou Sarlave), les pouvoirs des ody. Attention : le chouchou, souvent cité, n’arrive à La Réunion qu’au XIXᵉ siècle, après le grand marronnage. L’illustration est une image moderne, pas un document d’époque.'};
setInterval(()=>{try{const b=document.getElementById('fic208b');if(!b||document.getElementById('fic416'))return;const h=b.parentElement.querySelector('h1'),t=h&&h.textContent.trim();
 if(t!==EV.chefs416.t&&t!=='The maroon chiefs, as they are told')return;const d=document.createElement('div');d.id='fic416';
 d.innerHTML=(typeof IMG416!=='undefined'?'<img src="data:image/jpeg;base64,'+IMG416+'" style="width:100%;border-radius:6px;margin:6px 0" alt="">':'')+Object.keys(TR416).map(k=>carte416(k,1)).join('');b.before(d)}catch(e){}},500);
try{Object.assign(window.TR363=window.TR363||{},{
 'Les chefs marrons, tels qu’on les raconte':'The maroon chiefs, as they are told','L’exemple suivi':'The example followed','Aucun chef connu.':'No known chief.','Changer':'Change','Choisir':'Choose','Aucun':'None',
 'Ce camp suit l’exemple de…':'This camp follows the example of…','On le reconnaît :':'How to recognise them:','Ce qu’on en sait :':'What is known:','Son camp :':'Their camp:','Au combat :':'In combat:',
 'Aucun chef connu n’est en vie à cette date.':'No known chief is alive at this date.',
 'Se cacher plutôt que se battre':'Hide rather than fight','Les simples des Hauts':'Herbs of the Highlands','Guetter depuis les crêtes':'Watch from the ridges','Consulter le sikidy':'Consult the sikidy','Descendre sur les habitations':'Raid the estates','Tenir le village défendu':'Hold the defended village','Garder le rempart':'Guard the rampart','Passer par les remparts':'Pass by the cliffs','La plante des chiens':'The dog plant','La discipline du manjaka':'The manjaka’s discipline',
 'Tradition':'Tradition','Son histoire':'Their story','📜 Son histoire':'📜 Their story','✅ Fait attesté':'✅ Proven fact','🗣 Tradition orale':'🗣 Oral tradition','❓ À vérifier':'❓ To be checked','🎮 Aujourd’hui':'🎮 Today','Fermer':'Close','Archive':'Archive','Archive et tradition':'Archive and tradition','Archive et récits':'Archive and accounts','Tradition (récits recueillis par Leal)':'Tradition (accounts collected by Leal)'})}catch(e){}
// dans le panneau 👑 des figures : l'histoire des grands chefs, à lire à tout moment
if(typeof figures263==='function'){const f0=figures263;figures263=function(){const r=f0.apply(this,arguments);try{const p=document.getElementById('fig263');if(!p||p.querySelector('.his416'))return r;const b=document.createElement('button');b.className='bt sec his416';b.textContent='📜 L’histoire des grands chefs marrons';b.style.margin='8px 0';
 b.onclick=()=>{const fp=document.getElementById('fig263');if(fp)fp.remove();alerteSimple('Les grands chefs marrons','Ce que l’histoire raconte d’eux, et comment on le sait : ✅ fait attesté, 🗣 tradition orale, ❓ à vérifier.<div style="max-height:60vh;overflow:auto">'+Object.keys(TR416).map(k=>carte416(k,1)).join('')+'</div>',[['Fermer',()=>{}]]);haut416()};p.prepend(b)}catch(e){}return r}}
try{Object.assign(window.TR363,{'📜 L’histoire des grands chefs marrons':'📜 The story of the great maroon chiefs','Les grands chefs marrons':'The great maroon chiefs'})}catch(e){}
