// ===== p388 : les plantes venues d'ailleurs gagnent le paysage, chacune à son heure et à sa place, et de plus en plus avec les années.
// Dates : quand une source la donne, on la suit (mosa 1820-1825, jamrosa avant 1800, goyavier avant 1818, vigne marronne vers 1850,
// zépinard 1920) ; quand on ne l'a pas retrouvée (fataque, flamboyant), la fiche le dit et le jeu prend une période approchée.
// Comment elles se répandent : plantées pour le bétail (fataque, mosa, zépinard), semées par les oiseaux et les cochons marrons
// (goyavier, vigne marronne, jamrosa), par les bouses et les crottes des bêtes qui en mangent les gousses (zépinard). =====
const ENV388={
 fataque:{y:1850,n:'Fataque',ou:t=>t.alt<900&&/Savane|semi/i.test(t.biome||''),nb:70,span:80},
 mosa:{y:1825,n:'Mosa (cassi)',ou:t=>t.alt<500&&sv388(t),nb:45,span:90},
 goyavier:{y:1818,n:'Goyavier',ou:t=>t.alt>250&&t.alt<1300,nb:40,span:110},
 vigne:{y:1850,n:'Vigne marronne',ou:t=>t.alt>150&&t.alt<1400&&!sv388(t),nb:50,span:70},
 jamrosa:{y:1800,n:'Jamrosa',ou:t=>t.alt<900&&(t.riv||/humide/.test(t.biome||'')),nb:18,span:120},
 zepinard:{y:1920,n:'Zépinard',ou:t=>t.alt<200&&sv388(t),nb:30,span:50},
 arequier:{y:1850,n:'Aréquier',ou:t=>t.alt<600&&!sv388(t),nb:10,span:100},
 caloupile:{y:1850,n:'Caloupilé',ou:t=>t.alt<500&&(S.t[t.i]||{}).b==='camp',nb:6,span:60},
 margoze:{y:1860,n:'Petite margoze',ou:t=>t.alt<700&&((S.t[t.i]||{}).b==='camp'||(S.t[t.i]||{}).clr||(S.t[t.i]||{}).c),nb:40,span:80},
 flamboyant:{y:1880,n:'Flamboyant',ou:t=>t.alt<500&&pres388(t),nb:6,span:60}};
function sv388(t){try{return typeof sousVent==='function'?!!sousVent(t):t.x<0}catch(e){return false}}
function pres388(t){try{const o=S.t[t.i]||{};if(o.vo===2)return true;const V=(typeof VILLES!=='undefined'?VILLES:[]).filter(v=>S.towns&&S.towns.includes(v[3]));return V.some(v=>{const u=near(v[1],v[2]);return u&&hd(u,t)<=1})}catch(e){return false}}
function env388Mods(){if(MOD.env_fataque||typeof p23Mod!=='function')return;const TR=TR23,cy=(a,b,h,n=6)=>new THREE.CylinderGeometry(a,b,h,n),co=(r,h,n=5)=>new THREE.ConeGeometry(r,h,n),sp=r=>new THREE.IcosahedronGeometry(r,1);
 // fataque : touffes d'herbe plus hautes qu'un homme, paille dorée au-dessus du vert
 {const P=[];for(let k=0;k<9;k++){const a=k*2.4,r=.012+(k%3)*.008;P.push([co(.006,.16+(k%4)*.03,4),k%2?0x9aa04a:0xc2b25a,TR(Math.cos(a)*r,.08,Math.sin(a)*r,Math.cos(a)*.25,0,Math.sin(a)*.25)])}p23Mod('env_fataque',P)}
 // mosa : tronc fin, feuillage léger en étages
 p23Mod('env_mosa',[[cy(.004,.007,.16,5),0x7a6650,TR(0,.08,0)],[sp(.045),0x8fae5a,TR(0,.18,0,0,0,0,1,.45,1)],[sp(.035),0x9cb866,TR(.03,.15,.02,0,0,0,1,.45,1)],[sp(.03),0x86a452,TR(-.03,.14,-.01,0,0,0,1,.45,1)]]);
 // goyavier : arbuste au tronc lisse brun-rouge, feuilles vert sombre luisant
 p23Mod('env_goyavier',[[cy(.005,.008,.09,5),0x9a5a3a,TR(0,.045,0)],[sp(.04),0x2f5a2a,TR(0,.11,0)],[sp(.03),0x3a6a30,TR(.025,.09,.015)],[sp(.006),0xb0302a,TR(.03,.1,.03)]]);
 // vigne marronne : un fourré bas et serré qui recouvre tout
 p23Mod('env_vigne',[[sp(.05),0x2c4a24,TR(0,.02,0,0,0,0,1.4,.45,1.1)],[sp(.035),0x355a2a,TR(.04,.03,.02,0,0,0,1,.5,1)],[sp(.03),0x284420,TR(-.04,.025,-.02,0,0,0,1,.5,1)]]);
 // jamrosa : arbre dense, feuillage sombre, au bord des ravines
 p23Mod('env_jamrosa',[[cy(.006,.01,.12,6),0x5a4434,TR(0,.06,0)],[sp(.06),0x24451f,TR(0,.16,0)],[sp(.045),0x2c5226,TR(.04,.13,.02)]]);
 // zépinard : petit arbre épineux en parasol, gris-vert
 p23Mod('env_zepinard',[[cy(.004,.007,.1,5),0x6a5a48,TR(0,.05,0,0,0,.15)],[sp(.05),0x8a9a6a,TR(.01,.12,0,0,0,0,1.3,.35,1.3)]]);
 // aréquier : palmier fin et droit, couronne serrée, grappes de noix orange
 p23Mod('env_arequier',[[new THREE.CylinderGeometry(.004,.006,.3,6),0x9a9280,TR23(0,.15,0)],[new THREE.IcosahedronGeometry(.04,1),0x4a7a32,TR23(0,.31,0,0,0,0,1,.6,1)],[new THREE.IcosahedronGeometry(.012,0),0xd07a2a,TR23(.012,.28,0)]]);
 // caloupilé : petit arbre au feuillage fin, vert vif
 p23Mod('env_caloupile',[[new THREE.CylinderGeometry(.004,.006,.08,5),0x6a5a48,TR23(0,.04,0)],[new THREE.IcosahedronGeometry(.035,1),0x4a8a3a,TR23(0,.1,0,0,0,0,1,1.2,1)]]);
 // petite margoze : liane basse qui court sur le sol, petits fruits orange
 p23Mod('env_margoze',[[new THREE.IcosahedronGeometry(.03,1),0x5a9a3a,TR23(0,.01,0,0,0,0,1.6,.3,1.2)],[new THREE.IcosahedronGeometry(.007,0),0xe07a20,TR23(.02,.015,.01)]]);
 // flamboyant : large parasol rouge-orange
 p23Mod('env_flamboyant',[[cy(.008,.014,.14,6),0x6a5040,TR(0,.07,0)],[sp(.08),0xd8401e,TR(0,.17,0,0,0,0,1.6,.4,1.6)],[sp(.05),0x3a6a2a,TR(.05,.15,.03,0,0,0,1.2,.3,1.2)]])}
function env388Ici(t){if(!S||!t||t.bare)return [];const y=S.year||1663;return Object.keys(ENV388).filter(k=>{const e=ENV388[k];try{return y>=e.y&&e.ou(t)}catch(x){return false}})}
{const rl=remplirLieu;remplirLieu=function(){const r=rl.apply(this,arguments);try{const t=lieu;if(!t||t.bare||!S)return r;const L=env388Ici(t);if(!L.length)return r;env388Mods();
 const o=S.t[t.i]||{},ra=o.b==='camp'?1.3:0,hC=new THREE.Color(1,1,1);
 L.forEach((k,ki)=>{const e=ENV388[k],m=MOD['env_'+k];if(!m)return;const f=Math.min(1,(S.year-e.y)/e.span),n=Math.round(e.nb*(.15+.85*f));
  for(let j=0;j<n;j++){const a=rndH(j*17.3+ki*101+t.i)*6.283,d=Math.sqrt(rndH(j*5.1+ki*7+t.i))*3.1,x=t.x+Math.cos(a)*d,z=t.z+Math.sin(a)*d,h=alt(x,z);
   if(h<3||Math.hypot(x-t.x,z-t.z)<ra)continue;const v=.85+rndH(j+ki)*.3;hC.setRGB(v,v,v);poseM(m,x,h*VX+.02,z,a,0,0,(.8+rndH(j*3+ki)*.5)*1.2,hC)}})}catch(e){}return r}}
// les fiches, pour celles qui n'en avaient pas encore
Object.assign(EV,{
 env388mosa:{y:1825,tag:'Nature',an:'vers 1820-1825',t:'Le mosa',b:'On plante dans les Bas de l’Ouest un petit arbre venu d’Amérique, le mosa (cassi, Leucaena) : ses feuilles et ses gousses nourrissent les cabris. Il pousse vite, résiste à la sécheresse et, d’année en année, couvre les pentes sèches au-dessus de la mer.',v:'Utile aux bêtes, il prend la place des forêts sèches : c’est aujourd’hui l’une des plantes les plus envahissantes des Bas de l’Ouest.',h:'Archive : introduit vers 1820 (M. Philibert selon une liste des introductions), première observation notée en 1825 (CBNM). Très envahissant aujourd’hui.',o:[{n:'Le planter pour les cabris',d:'Bétail nourri.',fx:{vivres:1}}]},
 env388jam:{y:1800,tag:'Nature',an:'avant 1800',t:'Le jamrosa',b:'Un arbre venu d’Asie, aux fruits roses qui sentent la rose, pousse au bord des ravines. Les oiseaux et les eaux en portent les graines plus bas : bientôt, les ravines humides en sont pleines.',v:'On en mange les fruits ; il chasse les arbres d’ici du bord des ravines.',h:'Archive : introduit avant 1800 (liste des introductions de plantes à La Réunion). Envahissant dans les ravines.',o:[{n:'Cueillir les fruits',d:'Vivres +1.',fx:{vivres:1}}]},
 env388zep:{y:1920,tag:'Nature',an:'1920',t:'Le zépinard',b:'On plante sur les basses pentes de l’Ouest un arbre épineux venu d’Amérique, le zépinard (Prosopis), pour nourrir le bétail et reverdir la côte sèche. Les bœufs et les cabris mangent ses gousses ; les graines repartent dans leurs bouses et poussent partout où passent les troupeaux.',v:'Le bétail le sème lui-même : ses fourrés d’épines gagnent la côte.',h:'Archive : introduit en 1920 pour le bétail et le reboisement (liste des introductions de plantes à La Réunion). La dispersion des graines par le bétail est connue pour ce genre d’arbre.',o:[{n:'Le laisser aux bêtes',d:'Bétail nourri.',fx:{vivres:1}}]},
 env388are:{y:1850,tag:'Nature',an:'XIXᵉ siècle (date non retrouvée)',t:'L’aréquier',b:'Un palmier fin et droit, à la couronne serrée et aux grappes de noix orange, se multiplie dans les jardins et les ravines de l’Est.',v:'On le voit aujourd’hui un peu partout dans l’Est.',h:'Aréquier (Areca catechu). Date d’introduction à La Réunion non retrouvée ; son usage ici n’est pas établi dans nos sources : le jeu le montre comme un palmier de jardin devenu courant.',o:[{n:'Continuer',d:'',fx:{}}]},
 env388tam:{y:1850,tag:'Nature',an:'XIXᵉ siècle (date non retrouvée)',t:'Autour des cases tamoules',b:'Près des cases des familles venues de l’Inde du Sud poussent les plantes de la cuisine et des cérémonies : le bétel, une liane dont on mâche et dont on offre les feuilles ; le caloupilé, petit arbre aux feuilles parfumées du cari ; l’arbre à quatre épices, dont la feuille relève les plats ; la margoze, grosse au jardin et petite qui court sauvage dans les champs.',v:'Une cuisine et des gestes qui arrivent avec les gens, et deviennent ceux de toute l’île.',h:'Bétel (Piper betle), caloupilé (Murraya koenigii), quatre épices (Pimenta dioica), margoze (Momordica charantia, la petite margoze envahit les champs). Dates d’introduction non retrouvées : le jeu les fait venir avec l’engagisme indien, au milieu du XIXᵉ siècle.',o:[{n:'Un cari aux feuilles de caloupilé',d:'Cohésion +1.',fx:{coh:1}}]},
 env388fla:{y:1880,tag:'Nature',an:'XIXᵉ siècle (date non retrouvée)',t:'Le flamboyant',b:'Venu de Madagascar, le flamboyant borde maintenant les grandes routes et ombrage les places des villes. En décembre, il fleurit rouge : c’est l’arbre des fêtes de fin d’année.',v:'Un arbre d’ornement : il ne nourrit personne, mais il dit l’été.',h:'Le flamboyant (Delonix regia) est originaire de Madagascar. Date d’introduction à La Réunion non retrouvée : le jeu le fait apparaître au XIXᵉ siècle, le long des routes et dans les villes.',o:[{n:'L’admirer',d:'Cohésion +1.',fx:{coh:1}}]}});
// les allées de cocotiers : sur les routes du bord de mer, deux rangées alignées (le cocotier est déjà sur les côtes ;
// les allées plantées en bord de route viennent avec les routes carrossables — date non retrouvée, le jeu les fait venir au XIXᵉ siècle)
function coco388Mod(){if(MOD.env_cocotier||typeof p23Mod!=='function')return;const TR=TR23,cy=(a,b,h,n=6)=>new THREE.CylinderGeometry(a,b,h,n),bx=(w,h,d)=>new THREE.BoxGeometry(w,h,d);
 const P=[[cy(.005,.008,.12,6),0x8a7a62,TR(0,.06,0,0,0,.06)],[cy(.004,.005,.12,6),0x8f7f66,TR(.008,.17,0,0,0,.1)]];
 for(let k=0;k<8;k++){const a=k/8*6.283;P.push([bx(.11,.003,.022),k%2?0x5a8a3a:0x4a7a32,TR(Math.cos(a)*.05+.012,.225,Math.sin(a)*.05,0,-a,-.45)])}
 P.push([new THREE.IcosahedronGeometry(.012,0),0x7a5a2a,TR(.012,.22,0)]);p23Mod('env_cocotier',P)}
{const rl=remplirLieu;remplirLieu=function(){const r=rl.apply(this,arguments);try{const t=lieu;if(!t||t.bare||!S||(S.year||0)<1850||t.alt>150)return r;const o=S.t[t.i]||{};if(o.vo!==2)return r;
 const n=(t.nb||[]).map(j=>T[j]).find(u=>u&&(S.t[u.i]||{}).vo===2);if(!n)return r;coco388Mod();const m=MOD.env_cocotier;if(!m)return r;
 const dx=n.x-t.x,dz=n.z-t.z,L=Math.hypot(dx,dz)||1,ux=dx/L,uz=dz/L,px=-uz,pz=ux,hC=new THREE.Color(1,1,1);
 for(let s=-1;s<=1;s+=2)for(let k=-6;k<=6;k++){const x=t.x+ux*k*.24+px*s*.16,z=t.z+uz*k*.24+pz*s*.16,h=alt(x,z);if(h<2)continue;poseM(m,x,h*VX+.02,z,rndH(k*7+s)*6.28,0,0,1.6,hC)}}catch(e){}return r}}
