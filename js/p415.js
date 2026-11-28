// p415 — les véhicules modélisés (Meshy, d'après les images d'époque) remplacent les boîtes de p398 dès qu'ils sont chargés :
// locomotive à vapeur (les voitures en bois restent), autorail rouge et crème, car « courant d'air »,
// diligence (les chevaux restent) et Berliet à banquettes.
// Les modèles regardent vers -x : un quart de tour les met dans l'axe +z des modèles de p398.
const VEH415={vapeur:{n:'veh_vapeur',l:.085,z:.002,garde:o=>o.position.z<-.05},autorail:{n:'veh_autorail',l:.134,z:0},courant:{n:'veh_courant',l:.112,z:.006},diligence:{n:'veh_diligence',l:.08,z:.008,garde:o=>o.position.z>.03},berliet:{n:'veh_berliet',l:.088,z:.004}};
if(typeof modele398==='function'){const avant415=modele398;
 modele398=function(k){const g=avant415(k),d=VEH415[k];if(!d||typeof mod104!=='function')return g;
  mod104(d.n).then(T=>{const o=clone104(T,d.l,true);o.rotation.y=Math.PI/2;o.position.set(0,0,d.z);o.name='m415';
   g.children.slice().forEach(c=>{if(!d.garde||!d.garde(c))g.remove(c)});o.traverse(m=>{if(m.isMesh)m.castShadow=false});g.add(o)}).catch(()=>{});
  return g}}
