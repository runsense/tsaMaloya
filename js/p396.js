// ===== p396 : la cinématique de départ s'ouvre sur le mythe tamoul de la terre engloutie, puis sur ce que dit la roche ;
// et elle montre la naissance des grandes rivières, creusées par les pluies et les cyclones sur les flancs du Piton des Neiges.
// Mythe : des commentaires médiévaux de la poésie tamoule parlent de terres du Sud prises par la mer ; le nom
// « Kumari Kandam » et l'idée d'un continent viennent d'auteurs tamouls des XIXᵉ-XXᵉ siècles (d'après la « Lémurie »).
// Vrai : aucun continent n'a sombré sous La Réunion, île de volcan bien plus jeune. Mais sous Maurice, des grains de zircon
// vieux de près de 3 milliards d'années montrent des éclats d'un microcontinent, Mauritia, détaché quand l'Inde quitta
// Madagascar (Ashwal et al., Nature Communications, 2017). Les grandes rivières sont surtout celles du vieux Piton des Neiges
// (Galets, Mât, Saint-Étienne, Est) ; au sud, Rivière des Remparts et Langevin entaillent les anciens flancs de la Fournaise. =====
{const cj=cineJouer;cineJouer=function(shots,done){try{if(Array.isArray(shots)&&typeof genese!=='undefined'&&genese.phase!==2){
  const i0=shots.findIndex(s=>/60 millions/.test(s.txt||''));
  if(i0>=0&&!shots.k396){shots.k396=1;const s0=shots[i0],c=s0.cam||[0,0,95,.3,.55];
   const avant=[{d:7500,cam:[c[0],c[1],120,5.6,.45],init:U=>{try{s0.init&&s0.init(U)}catch(e){}},f:(U,k)=>{try{g168Carte(1,2)}catch(e){}},txt:'<small>Mythe tamoul</small>Les vieux commentaires des poèmes tamouls parlent de terres, au sud de l’Inde, que la mer a reprises avec leurs rivières et leurs montagnes. Plus tard, on leur donnera un nom : Kumari Kandam.'},
    {d:7500,cam:[c[0],c[1],108,6.0,.5],f:(U,k)=>{try{g168Carte(1,2)}catch(e){}},txt:'<small>Ce que dit la roche</small>Aucun continent n’a sombré ici. Mais sous Maurice dorment des grains de pierre vieux de trois milliards d’années : les éclats de Mauritia, un petit continent arraché quand l’Inde quitta Madagascar.'}];
   shots.splice(i0,0,...avant)}
  const ic=shots.findIndex(s=>/trois cirques/.test(s.txt||''));
  if(ic>=0&&!shots.r396){shots.r396=1;let rx=0,rz=0;try{[rx,rz]=xz(55.40,-21.02)}catch(e){}
   shots.splice(ic+1,0,{d:7500,cam:[rx,rz,34,.2,.82],f:(U,k)=>{try{U.lave.value=0}catch(e){}},txt:'<small>Jusqu’à aujourd’hui</small>Sur les flancs du volcan endormi, chaque pluie, chaque cyclone creuse un peu plus les grandes rivières : Rivière des Galets, du Mât, Saint-Étienne, de l’Est. Au sud, la Rivière des Remparts entaille la vieille Fournaise.'})}
 }}catch(e){console.warn(e)}return cj.apply(this,arguments)}}
