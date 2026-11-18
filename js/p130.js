
// ===== p130 : les noms des lieux et leur passage dans l'histoire ; en utopie, certains noms changent =====
// a : année où le nom (ou le lieu) entre dans l'histoire ; s : 'Archive' (sûr) ou 'Récit' (récit transmis, origine discutée).
// Les noms d'utopie (u) sont des inventions du jeu, marquées comme telles.
const NOMS130={
 'Saint-Paul':{a:1663,s:'Archive',o:'Le premier établissement durable : Louis Payen, un autre Français et une dizaine de Malgaches débarquent dans la baie.',u:{lib:'Saint-Paul-des-Frères',cafe:'Saint-Paul-du-Café'}},
 'Saint-Denis':{a:1669,s:'Récit',o:'On raconte que le nom vient du navire Saint-Denis, au temps d’Étienne Regnault. En 1738, La Bourdonnais en fait le chef-lieu.',u:{lum:'Saint-Denis-des-Lumières'}},
 'La Possession':{a:1642,s:'Récit',o:'Le lieu garderait le souvenir d’une prise de possession de l’île au nom du roi de France ; les dates varient selon les récits.',p:[55.336,-20.927],y:1730},
 'Bras-Panon':{a:1689,s:'Archive',o:'Du nom d’Augustin Panon, arrivé à la fin du XVIIᵉ siècle, ancêtre des Panon-Desbassayns.',p:[55.677,-20.998],y:1750},
 'Les Avirons':{a:1730,s:'Récit',o:'Selon la tradition, on y taillait dans le bois de la forêt les avirons (les rames) des chaloupes.',p:[55.335,-21.24],y:1760},
 'Trois-Bassins':{a:1750,s:'Archive',o:'Du nom de trois bassins naturels creusés par l’eau dans la ravine voisine.',p:[55.30,-21.10],y:1780},
 'Saint-Gilles':{a:1800,s:'Archive',o:'Un village de pêcheurs entre deux ravines, au bord du lagon ; il deviendra la grande plage de l’île.',p:[55.222,-21.053],y:1800},
 'L’Étang-Salé':{a:1730,s:'Archive',o:'Un étang d’eau saumâtre derrière le cordon de sable noir ; à partir de 1874 on y plante des filaos pour tenir les dunes.',p:[55.367,-21.265],y:1760},
 'Saint-Joseph':{a:1785,s:'Archive',o:'Le quartier du Sud sauvage, fondé à la fin du XVIIIᵉ siècle au bord de la Rivière des Remparts.',p:[55.62,-21.378],y:1785},
 'Saint-Philippe':{a:1830,s:'Archive',o:'Le dernier quartier fondé, au pied du volcan, entre les coulées.',p:[55.766,-21.36],y:1830},
 'Sainte-Rose':{a:1760,s:'Archive',o:'Le quartier des coulées de l’Est, face à la mer et au volcan.',p:[55.795,-21.127],y:1760},
 'Le Tampon':{a:1830,s:'Récit',o:'L’origine du nom est discutée : un nom de propriétaire, ou une borne qui marquait les terres.',p:[55.515,-21.278],y:1830},
 'Entre-Deux':{a:1800,s:'Archive',o:'Entre le Bras de la Plaine et le Bras de Cilaos : le village est né entre deux rivières.',p:[55.47,-21.248],y:1800},
 'Petite-Île':{a:1840,s:'Archive',o:'Du nom de l’îlot rocheux posé devant la côte.',p:[55.567,-21.355],y:1840},
 'Hell-Bourg':{a:1841,s:'Archive',o:'Nommé d’après l’amiral de Hell, gouverneur de l’île de 1838 à 1841 ; l’ancien îlet à Vidot.'},
 'Îlet à Malheur':{a:1829,s:'Récit',o:'Un détachement de chasseurs de marrons y aurait surpris un camp ; le nom garderait la mémoire de ce malheur.',p:[55.44,-21.02],y:1700,u:{lib:'Îlet des Revenus',abol:'Îlet des Revenus',roy:'Îlet des Revenus'}},
 'Îlet à Bourse':{a:1750,s:'Récit',o:'Le nom rappellerait la prime (la « bourse ») payée pour chaque marron pris.',p:[55.452,-21.012],y:1700,u:{lib:'Îlet des Frères',roy:'Îlet du Conseil'}},
 'Aurère':{a:1750,s:'Récit',o:'On le rattache à un mot malgache pour « bonne terre » ; l’étymologie reste discutée.',p:[55.433,-21.005],y:1700},
 'Marla':{a:1750,s:'Récit',o:'Rattaché à un mot malgache pour « beaucoup de monde » ; un grand camp, puis un îlet cultivé.',p:[55.43,-21.10],y:1700},
 'La Nouvelle':{a:1860,s:'Archive',o:'Des familles des Hauts s’y installent au XIXᵉ siècle : un nouveau départ dans le cirque.',p:[55.415,-21.08],y:1860},
 'Îlet à Cordes':{a:1750,s:'Récit',o:'On n’y montait, dit-on, qu’avec des cordes, pour ne laisser aucun sentier aux chasseurs.'},
 'Mafate':{a:1751,s:'Récit',o:'Du nom d’un chef marron, Mafate ; on rattache son nom à un mot malgache.',u:{roy:'Mahafaty',anc:'Mahafaty'}},
 'Cilaos':{a:1750,s:'Récit',o:'Rattaché à un mot malgache souvent traduit « lieu qu’on ne quitte pas » ; le refuge des fuyards.',u:{roy:'Tsilaosa',anc:'Tsilaosa'}},
 'Salazie':{a:1750,s:'Récit',o:'Rattaché à un mot malgache ; le sens exact reste discuté.',u:{roy:'Salaozy',anc:'Salaozy'}},
 'Cimendef':{a:1750,s:'Récit',o:'Du nom d’un chef marron, Cimendef ; on rattache son nom au malgache « qui ne se soumet pas ».'},
 'Le Dimitile':{a:1750,s:'Récit',o:'Du nom du chef marron Dimitile, sur les hauteurs de l’Entre-Deux.'},
 'Piton d’Anchaing':{a:1750,s:'Récit',o:'Anchaing y vivait libre avec Héva, au-dessus de Salazie.'},
 'Plaine des Cafres':{a:1750,s:'Récit',o:'« Cafres » : le nom que donnaient les colons aux esclaves venus d’Afrique de l’Est, qui s’y réfugiaient.',u:{roy:'Plaine des Libres',abol:'Plaine des Libres',lib:'Plaine des Libres'}},
 'Plaine des Palmistes':{a:1750,s:'Archive',o:'Pour ses palmistes, coupés pour leur cœur jusqu’à devenir rares.'}};
// les lieux ajoutés sur la carte
Object.entries(NOMS130).forEach(([n,d])=>{if(!d.p||LIEUX.some(l=>l.n===n))return;const t=near(d.p[0],d.p[1]);LIEUX.push({n,col:false,k:/^Îlet|^Aurère|^Marla|^La Nouvelle/.test(n)?'m':'',dmax:/^Îlet|^Aurère|^Marla|^La Nouvelle/.test(n)?18:30,nt:'',t,p:xz(d.p[0],d.p[1]),y130:d.y})});
function utoK130(){try{if(!S)return null;if(S.uchLum)return 'lum';const br=S.br||{};return ['roy','lib','anc','abol','cafe','comp','maur','angl','cors'].find(k=>br[k])||null}catch(e){return null}}
function nom130(n){const d=NOMS130[n];const u=utoK130();return d&&d.u&&u&&d.u[u]?d.u[u]:n}
function fiche130(n){const d=NOMS130[n];if(!d)return '';const u=utoK130(),nu=d.u&&u&&d.u[u];return (nu?'Dans votre utopie : '+nu+' (nom inventé pour le jeu). Autrefois '+n+'. ':'')+d.o+' · '+(d.s==='Archive'?'Archive, '+d.a:'Récit transmis, non prouvé')}
{const lb=labels;labels=function(){lb.apply(this,arguments);try{LIEUX.forEach(l=>{const e=lbEls.get(l);if(!e)return;if(l.y130&&S&&S.year<l.y130)e.hidden=true;const pre=(l.k==='p'?'▲ ':l.k==='r'?'≈ ':l.k==='m'?'✦ ':''),txt=pre+nom130(l.n);if(e.textContent!==txt)e.textContent=txt;const f=fiche130(l.n);if(f&&e.dataset.bulle!==f)e.dataset.bulle=f})}catch(e){}}}
// le passage historique de chaque nom, à sa date, dans le conte : une archive ou un récit transmis
Object.entries(NOMS130).forEach(([n,d],i)=>{const id='nom130_'+i;if(EV[id])return;EV[id]={y:d.a+(d.a<1663?21+i%3:0),sys:0,tag:d.s==='Archive'?'Archive':'Mythe',an:String(d.a<1663?1663+i%3:d.a),t:'Le nom : '+n,get b(){return d.o},si:()=>S&&S.year>=1663,v:d.s==='Archive'?'Un nom qui raconte l’histoire.':'Récit transmis, non prouvé.',o:[{n:'Retenir le nom',d:'Savoir +1.',fx:{savoir:1},hist:1}]}});
