
// ===== p181 : la population de l'île (recensements) et la naissance des communes =====
// Chiffres : série historique INSEE (recensements et estimations). Avant 1946, ce sont surtout des estimations ; les sources ne s'accordent pas toujours.
// Dates des communes : INSEE, « Circonscriptions administratives » (carte des dates de création).
{const SRC='Source : série historique de l’INSEE (recensements et estimations).',ok=[{n:'Continuer',d:'',fx:{},hist:1}];
 const P=[[1713,'1 171 habitants','Moins de cinquante ans après les premiers colons, l’île compte un peu plus de mille habitants, libres et esclaves ensemble.'],
  [1717,'2 000 habitants','La population double en quatre ans. Les navires de la Compagnie amènent des esclaves de Madagascar et d’Afrique.'],
  [1724,'12 550 habitants','Le café arrive à Bourbon et la Compagnie fait venir des milliers d’esclaves pour le cultiver. L’île change de visage en quelques années.'],
  [1764,'25 000 habitants','Les esclaves sont maintenant bien plus nombreux que les libres. Plus il y a d’esclaves, plus il y a de fugitifs dans les Hauts.'],
  [1789,'entre 46 000 et 61 300 habitants','L’année de la Révolution. Les comptes ne s’accordent pas : selon les sources, entre 46 000 et 61 300 habitants, dont une large majorité d’esclaves.'],
  [1848,'110 300 habitants','L’année de l’abolition : plus de 60 000 esclaves deviennent libres le 20 décembre.'],
  [1860,'200 000 habitants','Le sucre a remplacé le café. Pour remplacer les esclaves libérés dans les champs, on fait venir des engagés, surtout de l’Inde.'],
  [1887,'163 881 habitants','La population baisse : crise du sucre, épidémies, fin de l’engagisme indien.'],
  [1946,'241 708 habitants','L’île devient un département français. Premier recensement moderne.'],
  [1967,'416 525 habitants','En vingt ans, la population a presque doublé : on meurt beaucoup moins jeune, les familles restent nombreuses.'],
  [1982,'515 814 habitants','Plus d’un demi-million d’habitants. Les Hauts se vident vers les villes de la côte.']];
 const E={};P.forEach(([y,t,b])=>{E['pop181_'+y]={y,si:()=>S,tag:'Archive',an:String(y),nat:'Fait historique (chiffres de population). '+(y<1946?'Avant 1946, ce sont des estimations.':''),t:'Recensement : '+t,b,v:'Ce que comptent les registres.',h:SRC+(y===1789?' Pour 1789, les auteurs divergent nettement.':''),o:ok}});
 const C=[[1790,'Les paroisses deviennent des communes','La Révolution crée les communes. Les anciennes paroisses de Saint-Paul (1666), Saint-Denis (1669), Sainte-Suzanne (1704), Saint-Benoît (1730), Saint-Pierre (1735) et Sainte-Marie (1737) deviennent les premières communes, avec Saint-Leu et Saint-André (1790), Saint-Joseph (1785) et Sainte-Rose (1789).'],
  [1815,'Naissance de Saint-Louis','Saint-Louis devient une commune, au débouché de la Rivière Saint-Étienne et du chemin de Cilaos.'],
  [1830,'Naissance de Saint-Philippe','Le Sud sauvage a sa commune : Saint-Philippe, entre la forêt et les coulées du volcan. L’île compte alors douze communes.'],
  [1882,'Bras-Panon et l’Entre-Deux','Deux nouvelles communes : Bras-Panon dans l’Est, l’Entre-Deux entre les deux bras de la Rivière Saint-Étienne.'],
  [1890,'Naissance de La Possession','La Possession devient une commune, là où les premiers Français ont pris possession de l’île.'],
  [1895,'Le Port, l’Étang-Salé, les Avirons','Le Port, bâti autour du nouveau port de la Pointe des Galets, devient une commune ; l’Étang-Salé aussi, et les Avirons un an plus tôt (1894).'],
  [1899,'Salazie et la Plaine des Palmistes','Les Hauts ont leurs premières communes : le cirque de Salazie et la Plaine des Palmistes. Trois-Bassins est commune depuis 1897.'],
  [1925,'Naissance du Tampon','Le Tampon devient une commune : les Hauts du Sud se peuplent.'],
  [1935,'Naissance de Petite-Île','Petite-Île devient une commune.'],
  [1965,'Naissance de Cilaos','Cilaos se détache de Saint-Louis : c’est la dernière née des 24 communes de l’île.']];
 C.forEach(([y,t,b])=>{E['com181_'+y]={y,si:()=>S,tag:'Archive',an:String(y),nat:'Fait historique.',t,b,v:'La carte des communes se dessine.',h:'Source : INSEE, circonscriptions administratives (dates de création des communes).',o:ok}});
 Object.assign(EV,E)}
// ===== commando : sur petit écran, l'aide sous la carte se replie (bouton « ? » en haut) pour laisser la place à la carte =====
{const st=document.createElement('style');st.textContent='@media (max-height:820px),(max-width:760px){#cmd .aide48{display:none!important}#cmd.aide48on .aide48{display:flex!important}#cmd .bp{padding:5px 10px}#cmd .bp .bm{margin:2px 0 4px;font-size:13px;line-height:1.3}#cmd .bp .bt{padding:5px 10px;font-size:12px}}#cmd .aideB48{display:none}@media (max-height:820px),(max-width:760px){#cmd .aideB48{display:inline-block}}';document.head.appendChild(st);
 setInterval(()=>{try{const c=document.getElementById('cmd');if(!c)return;const bh=c.querySelector('.bh');if(bh&&!bh.querySelector('.aideB48')){const b=document.createElement('button');b.className='bt sec aideB48';b.textContent='?';b.title='Afficher l’aide';b.onclick=()=>{c.classList.toggle('aide48on');window.dispatchEvent(new Event('resize'))};const pa=bh.querySelector('#cmdPa');bh.insertBefore(b,pa)}}catch(e){}},400)}
