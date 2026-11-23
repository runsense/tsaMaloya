let F=null;// scène à la première personne (f.js)
/* ---------- Terrain ---------- */
const bin=atob(DEM.z),H=new Int16Array(DEM.nx*DEM.ny);
for(let k=0;k<H.length;k++)H[k]=(bin.charCodeAt(2*k)|bin.charCodeAt(2*k+1)<<8)-500;
const NX=DEM.nx,NY=DEM.ny,ST=DEM.step,MAR=DEM.mar,VX=2.2/1000;
function alt(x,z){let g=(x+MAR)/ST,h=(z+MAR)/ST;if(g<0||h<0||g>=NX-1||h>=NY-1)return -200;
 const i=g|0,j=h|0,a=g-i,b=h-j,p=(u,v)=>H[v*NX+u];
 return (p(i,j)*(1-a)+p(i+1,j)*a)*(1-b)+(p(i,j+1)*(1-a)+p(i+1,j+1)*a)*b}
const xz=(lon,lat)=>[(lon-DEM.lo0)*DEM.kx,(DEM.la1-lat)*DEM.ky];
/* ---------- Hexagones (pointe en haut) ---------- */
const GRF=(()=>{try{return localStorage.getItem('tsa-grille')==='fine'}catch(e){return false}})();
const HS=GRF?1.0:1.45,SQ=Math.sqrt(3),OFF=6;
const center=(q,r)=>[SQ*HS*(q+r/2)-OFF,1.5*HS*r-OFF];
function hexAt(x,z){const hx=x+OFF,hz=z+OFF;let q=(SQ/3*hx-hz/3)/HS,r=(2/3*hz)/HS,s=-q-r;
 let rq=Math.round(q),rr=Math.round(r),rs=Math.round(s);const a=Math.abs(rq-q),b=Math.abs(rr-r),c=Math.abs(rs-s);
 if(a>b&&a>c)rq=-rr-rs;else if(b>c)rr=-rq-rs;return [rq,rr]}
const T=[],byKey={},COLS=GRF?90:62,ROWS=GRF?73:50;const key=(q,r)=>q+','+r;
for(let row=0;row<ROWS;row++)for(let col=0;col<COLS;col++){
 const r=row,q=col-((r-(r&1))/2),[x,z]=center(q,r),a=alt(x,z);
 if(a<=3)continue;
 let mx=0;for(let k=0;k<6;k++){const w=k*Math.PI/3;mx=Math.max(mx,Math.abs(alt(x+Math.cos(w),z+Math.sin(w))-a))}
 const t={i:T.length,q,r,col,row,x,z,alt:a,slope:Math.atan(mx/1000)*57.3};T.push(t);byKey[key(q,r)]=t}
const DIRS=[[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]];
T.forEach(t=>t.nb=DIRS.map(d=>byKey[key(t.q+d[0],t.r+d[1])]).filter(Boolean).map(n=>n.i));
const hd=(a,b)=>(Math.abs(a.q-b.q)+Math.abs(a.r-b.r)+Math.abs(a.q+a.r-b.q-b.r))/2;
const near=(lon,lat)=>{const[x,z]=xz(lon,lat);let b=T[0],d=1e9;T.forEach(t=>{const e=(t.x-x)**2+(t.z-z)**2;if(e<d){d=e;b=t}});return b};
const[vx,vz]=xz(55.714,-21.244);
const[bx,bz]=xz(55.79,-21.235);
// sous le vent : l'ouest est une savane sèche jusqu'à 700 m environ, de La Possession à Saint-Pierre ;
// au vent (l'Est, le Sud pluvieux après Saint-Pierre) : pas de savane ; forêt dense jusqu'à la côte, fanjans à mi-pente
function sousVent(t){const lon=t.x/DEM.kx+DEM.lo0,lat=DEM.la1-t.z/DEM.ky;let a=Math.atan2(lat+21.12,lon-55.53)*180/Math.PI;if(a<0)a+=360;
 if(a>=128&&a<257)return t.alt<700;return false}
T.forEach(t=>{const dv=Math.hypot(t.x-vx,t.z-vz),db=Math.hypot(t.x-bx,t.z-bz);
 t.biome=(dv<5.5&&t.alt>1900)||db<4?'Coulées de lave':t.alt>2350?'Scories d’altitude':t.alt>1900?'Fourrés de branles':t.alt>1100?'Forêt de tamarins des Hauts':sousVent(t)?'Savane sèche sous le vent':t.x>33&&t.alt>=400&&t.alt<1100?'Forêt humide à fanjans':t.x>33&&t.alt<400?'Forêt humide du vent':'Bois de couleurs';
 t.bare=/lave|Scories/.test(t.biome);t.forest=!t.bare&&!/Savane/.test(t.biome);
 t.yield=t.bare?0:t.alt>1900?.5:t.alt>1400?.8:/Savane/.test(t.biome)?.8:1.1;t.cold=t.alt>1500;{const q=Math.sin(t.i*37.7)*43758.5;t.zeo=!t.bare&&t.alt>500&&(q-Math.floor(q))>.84;}const bi=t.biome;t.ch=t.bare?0:/Savane/.test(bi)?1.2:/humide/.test(bi)?.7:/tamarins/.test(bi)?1:/branles/.test(bi)?.5:1;t.cu=t.bare?0:/Savane/.test(bi)?.6:/humide/.test(bi)?1.4:/tamarins/.test(bi)?.8:/branles/.test(bi)?.5:1.1});
const LIEUX=[['Saint-Paul',55.270,-21.010,1],['Saint-Denis',55.450,-20.880,1],['Sainte-Suzanne',55.609,-20.907,1],['Sainte-Marie',55.550,-20.897,1],['Saint-André',55.650,-20.960,1],['Saint-Benoît',55.713,-21.034,1],['Saint-Leu',55.286,-21.170,1],['Saint-Louis',55.411,-21.286,1],['Saint-Pierre',55.478,-21.339,1],
 ['Piton des Neiges',55.480,-21.099],['Piton de la Fournaise',55.714,-21.244],['Mafate',55.410,-21.050],['Salazie',55.530,-21.030],['Cilaos',55.472,-21.135],['Le Dimitile',55.480,-21.205],['Plaine des Cafres',55.570,-21.210],['Plaine des Palmistes',55.630,-21.130],['Trou de Fer',55.594,-21.060],['Grand Brûlé',55.780,-21.235],['Pic Adam',55.4648,-20.9475],['Forêt de Tapcal',55.455,-21.165],['Bras de la Plaine',55.505,-21.265,0,'r',30],['Rivière Langevin',55.645,-21.320,0,'r',30],
 ['Grand Bénare',55.437,-21.098,0,'p',40],['Gros Morne',55.475,-21.085,0,'p',26],['Maïdo',55.383,-21.071,0,'p',32],['Roche Écrite',55.433,-20.985,0,'p',30],['Piton d’Anchaing',55.488,-21.035,0,'m',22,'Du nom d’Anchaing, marron réfugié sur ce piton avec Héva'],['Cimendef',55.437,-21.034,0,'m',22,'Du nom de Cimendef, chef marron'],
 ['Rivière des Galets',55.33,-20.98,0,'r',30],['Rivière du Mât',55.62,-20.98,0,'r',30],['Rivière des Marsouins',55.68,-21.06,0,'r',30],['Rivière de l’Est',55.76,-21.14,0,'r',30],['Rivière des Remparts',55.62,-21.28,0,'r',28],['Rivière Saint-Étienne',55.44,-21.27,0,'r',28],['Rivière des Pluies',55.49,-20.92,0,'r',24],['Rivière Saint-Denis',55.445,-20.90,0,'r',22],
 ['Grande Chaloupe, le lazaret',55.38,-20.895,0,'m',18,'Le lazaret où les engagés faisaient leur quarantaine'],['Îlet à Cordes',55.44,-21.13,0,'m',16,'Îlet de Cilaos, refuge des Hauts'],['Hell-Bourg',55.52,-21.065,0,'m',16,'L’ancien îlet à Vidot, à Salazie'],['Plaine des Sables',55.65,-21.23,0,'m',20,'Le désert de scories du volcan'],['Villèle',55.257,-21.042,0,'m',16,'Le domaine Desbassayns, aujourd’hui musée de l’esclavage'],['La Redoute',55.442,-20.896,0,'m',14,'La bataille de 1810'],['Pointe des Galets',55.29,-20.93,0,'m',18,'Le port né en 1886']]
 .map(l=>({n:l[0],col:!!l[3],k:l[4]||'',dmax:l[5]||99,nt:l[6]||'',t:near(l[1],l[2]),p:xz(l[1],l[2])}));
const lieuDe=t=>{const l=LIEUX.find(l=>l.t===t);return l?l.n:null};
const lieuProche=t=>{let b=null,d=99;LIEUX.forEach(l=>{const e=hd(l.t,t);if(e<d){d=e;b=l}});return d<=3?'près de '+b.n:null};
/* ---------- Partie ---------- */
const TRACES=[{id:0,t:near(55.455,-21.165),nom:'Les pierres de Tapcal'},{id:1,t:near(55.505,-21.265),nom:'Les terrasses du Bras de la Plaine'},{id:2,t:near(55.645,-21.320),nom:'Le vieux jardin de la Langevin'},{id:3,t:near(55.4648,-20.9475),nom:'Le Beau Pays du Pic Adam'}];
const TSTART=near(55.335,-21.03);
const SAVOIRS={
 papangue:{n:'Le papangue dressé',c:3,bt:'Demande un lien avec les pirates de Libertalia',bes:()=>!!(S.pir||S.lib||(S.out&&S.out.antilles)),br:'Nourrir II',d:'Les frères de la côte ont rapporté des Antilles l’art de dresser un oiseau de proie. Le papangue rabat cailles et rats : la chasse réussit plus souvent et rapporte davantage.'},
 etoiles:{n:'Les étoiles des boutres',c:3,bt:'Demande un lien avec les Comores, Madagascar ou l’Inde',bes:()=>!!(S.out&&(S.out.comores||S.out.mada||S.out.inde)),br:'Se cacher II',d:'Les navigateurs arabes et swahilis lisent les étoiles pour traverser l’océan. Les veilleurs reconnaissent une voile au loin avant qu’elle ne voie le camp.'},
 cari:{n:'Cari et rougail',c:3,bt:'Demande un lien avec Madagascar ou l’Inde, ou l’an 1720',bes:()=>(S.out&&(S.out.mada||S.out.inde))||S.year>=1720,br:'Nourrir II',d:'Le riz, le cari et le rougail, entre Madagascar et l’Inde : +1 vivre par saison.'},
 massale:{n:'Massalé tamoul',c:3,bt:'Demande un comptoir en Inde ou l’arrivée des engagés',bes:()=>(S.out&&S.out.inde)||S.done.e1849,br:'Nourrir II',d:'Le massalé, mélange d’épices des engagés tamouls où entre le curcuma. Une épice ne nourrit pas seule : avec le savoir Cari et rougail, +1 vivre par saison. Toujours +0,5 santé.'},
 samoussa:{n:'Samoussas du Gujarat',c:3,bt:'Demande l’arrivée des Zarabes ou le commerce avec les boutres',bes:()=>S.done.e1870z||(S.br&&S.br.arab==='com'),br:'Nourrir II',d:'Les pâtisseries et épices des commerçants musulmans : +1 vivre par saison.'},
 bouchon:{n:'Bouchons et sautés de Canton',c:3,bt:'Demande l’arrivée des Chinois',bes:()=>(S.out&&S.out.chine)||S.done.e1846c,br:'Nourrir II',d:'La vapeur, le wok et le riz cantonais : +1 vivre par saison.'},
 vanille:{n:'Fécondation de la vanille',c:4,bt:'Demande la découverte d’Edmond Albius (1841)',bes:()=>S.done.e1841v,br:'Nourrir III',d:'Le geste d’Edmond Albius. La vanille ne se mange pas seule : elle parfume et se vend. +1 cohésion par saison, et +2 vivres par l’échange si vous avez un comptoir outre-mer.'},
 vergers:{n:'Vergers créoles',c:3,bt:'Demande l’arrivée du premier letchi (1764)',bes:()=>S.done.e1764l,br:'Nourrir II',d:'Letchis, mangues, jacques, fruits à pain : les arbres venus d’ailleurs nourrissent les cours. +2 vivres par saison.'},
 anciens:{n:'Savoirs anciens d’Afrique',c:4,bt:'Demande de garder le datura pour les rites',bes:()=>S.br&&S.br.datura,br:'Soigner III',d:'Une voie mystique gardée par les anciens, autour du datura et des récits venus du Nil (fiction du jeu) : +1 mystique par saison, mais certaines saisons un initié perd la raison.'},
 envahis:{n:'Arracher les envahissantes',c:4,bt:'Demande l’an 1980 et des plantes envahissantes',bes:()=>S.year>=1980&&(S.inv||0)>20,br:'Soigner III',d:'Des chantiers arrachent goyaviers, longoses et vigne marronne pour rendre sa place à la forêt indigène : les plantes envahissantes reculent.'},
 proprete:{n:'Ravines propres',c:3,bt:'Demande une pollution au-dessus de 25 %',bes:()=>(S.pol||0)>25,br:'Soigner III',d:'Ramasser la tôle rouillée, curer les ravines, protéger les sources : la pollution recule.'},
 zerbaz:{n:'Zerbaz, tisanes métissées',c:3,bt:'Demande les tisanes et un lien avec Madagascar, l’Inde ou la Chine',bes:()=>S.sv.tisanes&&S.out&&(S.out.mada||S.out.inde||S.out.chine),br:'Soigner II',d:'Plantes des Hauts, de Madagascar, de l’Inde et de Chine : +1 santé par saison.'},
 sega:{n:'Séga tipik',c:3,bt:'Demande l’alliance avec les marrons de l’île sœur',bes:()=>S.br&&S.br.maur,br:'S’organiser II',d:'La ravanne et les chants de l’île sœur rejoignent le maloya : +1 cohésion par saison, +1 mystique toutes les trois saisons.'},
 kitoza:{n:'Viande séchée',get d(){return S&&S.voieC?'Le boucané : la viande fumée se garde des mois. Chaque chasse près d’un camp bien pourvu en met de côté ; les expéditions lointaines l’emportent.':'Le kitoza des ancêtres malgaches, et les viandes séchées d’Afrique : coupée en lanières, séchée et fumée, la viande se garde. Chaque chasse met des réserves de côté, et les vivres ne s’abîment plus.'},c:3},
 ciel:{n:'Lire le ciel',c:3,d:'Révèle la force du prochain cyclone. Les abris coûtent moins cher en dégâts.'},
 sentiers:{n:'Sentiers de crête',c:3,d:'Explorer dévoile plus loin et coûte toujours 1 bras.'},
 songes:{n:'Songes et maïs',c:4,d:'Chaque jardin donne 2 vivres de plus.'},
 feux:{n:'Feux cachés',c:4,req:'sentiers',d:'Les camps laissent 30 % de traces en moins.'},
 tisanes:{n:'Tisanes des Hauts',c:4,d:'+1 santé par saison. La fièvre frappe moins fort.'},
 pieges:{n:'Pièges et guet',c:5,req:'feux',d:'Les camps se défendent mieux contre les détachements.'},
 memoire:{n:'Mémoire des ancêtres',c:5,req:'ciel',d:'+1 cohésion par saison.'},
 cartes:{n:'Cartes de l’île sœur',c:4,out:'maurice',d:'Vos passeurs rapportent des cartes : les camps voient plus loin et +2 savoir.'},
 riz:{n:'Riz des hautes terres',c:5,out:'mada',d:'Le riz de Madagascar : les jardins donnent 20 % de plus.'},
 fer:{n:'Fer du Mozambique',c:5,out:'mozamb',d:'Le travail du fer : +2 fusils et de meilleures armes.'},
 elevage:{n:'Élevage du Cap',c:4,out:'cap',d:'Le bétail rapporte davantage et +2 bêtes.'},
 siddha:{n:'Médecine siddha',c:6,out:'inde',d:'La médecine tamoule : +1 santé par saison.'},
 varmam:{n:'Varmam, les points vitaux qui soignent',br:'Voies du corps',c:6,out:'inde',req:'siddha',d:'La médecine des points vitaux, sœur de la médecine siddha : santé +0,5 par saison, et une chute sur deux sur les sentiers est soignée sur place.'},
 varmakalai:{n:'Varma kalai',br:'Voies du corps',c:7,out:'inde',req:'varmam',d:'L’art tamoul des points vitaux, pour frapper juste et se soigner : chasse +15 %, défense des camps +6.'},
 silambam:{n:'Silambam, le bâton tamoul',br:'Voies du corps',c:6,out:'inde',d:'Le bâton tournoyant des Tamouls, fait de bambou : défense des camps +6.'},
 bokator:{n:'Bokator khmer',br:'Voies du corps',c:7,out:'indo',d:'L’art de combat khmer, aux racines anciennes : abordage +30 % dans les combats navals, défense +4.'},
 muaythai:{n:'Boxe des royaumes du Mékong',br:'Voies du corps',c:7,out:'indo',req:'bokator',d:'Les boxes siamoise et khmère, coudes et genoux : abordage +15 %, défense +5.'},
 silat:{n:'Pencak silat',br:'Voies du corps',c:7,out:'insul',d:'L’art de combat des îles d’Insulinde, souple et rasant, à mains nues ou au kriss : pistage et chasse en forêt +15 %, défense +5.'},
 lethwei:{n:'Lethwei, la boxe birmane',br:'Voies du corps',c:7,out:'birm',d:'La boxe à mains nues des Birmans, coups de tête compris : abordage +20 %, défense +5.'},
 epices:{n:'Épices d’Indochine',c:6,out:'indo',d:'Plantes précieuses à échanger : +2 vivres par comptoir à chaque saison.'},
 terrasses:{n:'Jardins en terrasses',br:'Nourrir II',c:6,req:'songes',bes:()=>S.gens>=20,bt:'Besoin : 20 bouches à nourrir',d:'Les jardins suivent la pente en murets de pierre sèche : chaque jardin donne 1 vivre de plus par tranche de 20 personnes (4 au plus).'},
 reserves:{n:'Réserves partagées',br:'Nourrir III',c:7,req:'terrasses',bes:()=>S.gens>=40||camps().length>=4,bt:'Besoin : 40 personnes ou 4 camps',d:'Les camps mettent leurs vivres en commun : on consomme 15 % de moins.'},
 herbes:{n:'Herbes des cirques',br:'Soigner II',c:6,req:'tisanes',bes:()=>S.gens>=25,bt:'Besoin : 25 personnes à soigner',d:'Les guérisseuses connaissent chaque plante des remparts : +1 santé par saison pour 40 personnes (2 au plus).'},
 malades:{n:'Cases des malades',br:'Soigner III',c:7,req:'herbes',bes:()=>S.gens>=40,bt:'Besoin : 40 personnes',d:'On isole les fiévreux à l’écart : un camp surpeuplé ne fait plus perdre de santé.'},
 guetteurs:{n:'Réseau de guetteurs',br:'Se cacher II',c:6,req:'pieges',bes:()=>S.traque>=40,bt:'Besoin : une traque à 40 ou plus',d:'Les postes de guet voient une case plus loin, et chacun réduit encore les traces des camps (jusqu’à -30 %).'},
 leurres:{n:'Fausses pistes',br:'Se cacher III',c:7,req:'guetteurs',bes:()=>S.traque>=60||S.year>=1735,bt:'Besoin : une traque à 60, ou les détachements de 1735',d:'On marche dans les rivières, on laisse des pistes vers le vide : chaque détachement a 1 chance sur 5 de perdre la trace à chaque saison.'},
 liens:{n:'Sentiers entre camps',br:'S’organiser II',c:6,req:'memoire',bes:()=>camps().length>=3,bt:'Besoin : 3 camps à relier',d:'Les camps échangent vivres et nouvelles : +1 vivre par saison pour chaque camp au-delà du premier.'},
 conseil:{n:'Conseil des chefs',br:'S’organiser III',c:8,req:'liens',bes:()=>camps().length>=5&&!!S.roi,bt:'Besoin : 5 camps et un grand roi élu',d:'Le grand roi réunit les chefs : +1 bras par tranche de 3 camps.'},
 royaume:{n:'Royaume de l’intérieur',c:9,req:'memoire',camps:3,d:'Les camps s’allient. +1 bras et 6 places. Il faut 3 camps.'}
};
const stadeFac=()=>{const p=voie();return p.c>p.m?2:p.c>=30?1:0};
const nomFac=k=>{const st=stadeFac();if(st===2)return {anciens:['Les Notables','Familles installées qui tiennent registres et alliances avec la côte. Au-dessus de 60 : +1 savoir par saison.'],gardiens:['La Milice des Hauts','Ceux qui gardent les chemins pour la colonie, et parfois traquent les fuyards. Au-dessus de 60 : les camps se défendent mieux.'],jardin:['Les Habitants','Planteurs des Hauts, avec titres de terre. Au-dessus de 60 : +10 % de vivres.']}[k];const c=st===1;return c?{anciens:['Les Commerçants','Vivent des échanges avec la côte. Au-dessus de 60 : +1 savoir par saison.'],gardiens:['Les Chasseurs','Vivent du gibier et de la traque. Au-dessus de 60 : les camps se défendent mieux.'],jardin:['Les Colons','Veulent des terres et des actes. Au-dessus de 60 : +10 % de vivres.']}[k]:FAC[k]};
const FAC={anciens:['Les Anciens','Gardent la mémoire et les ancêtres. Au-dessus de 60 : +1 savoir par saison.'],gardiens:['Les Gardiens','Veulent tenir le passage et frapper. Au-dessus de 60 : les camps se défendent mieux.'],jardin:['Les Jardinières','Nourrissent et soignent. Au-dessus de 60 : +10 % de vivres.']};
const BAT={case:{n:'Case',c:{bois:2,paille:2},d:'+3 places.',col:0xb98b52,h:.2},
 grenier:{n:'Grenier',c:{bois:3,paille:2},d:'+30 vivres en réserve, moins de pertes au cyclone.',req:()=>S.voieC||S.sv.songes,rq:'Demande Songes et maïs',col:0xd8b070,h:.3},
 abri:{n:'Abri anti-cyclone',c:{bois:3,pierre:2},d:'Réduit durablement les dégâts des cyclones.',req:()=>S.sv.ciel,rq:'Demande Lire le ciel',col:0x777a70,h:.16},
 tisane:{n:'Case des tisanes',c:{bois:2,paille:2},d:'+1 santé par saison.',req:()=>S.sv.tisanes||S.leg,rq:'Demande Tisanes des Hauts',col:0x5a9a60,h:.2},
 atelier:{n:'Forge',c:{bois:2,pierre:3},d:'+1 fusil toutes les 6 saisons.',req:()=>(S.fu||0)>=1||S.forg,rq:'Demande un fusil volé ou un forgeron libéré',col:0x4a4a52,h:.24},
 parcSol:{n:'Parc à solitaires',c:{bois:3,paille:2},d:'Garde des solitaires en vie : +2 vivres par saison. Perdu si le camp est attaqué ou assiégé.',req:()=>S.ele&&fa('sol')>0,rq:'Demande un éleveur libéré, et des solitaires encore sauvages',col:0xe8e4d8,h:.08},
 parcDodo:{n:'Parc à dodos',c:{bois:3,paille:2},d:'Garde des dodos du Sud en vie : +2 vivres par saison. Perdu si le camp est attaqué ou assiégé.',req:t=>S.ele&&fa('dodo')>0&&(!t||zDo(t)),rq:'Demande un éleveur libéré, un camp dans le Sud et des dodos encore sauvages',col:0xa08a6a,h:.08},
 parcDro:{n:'Parc à drontes',c:{bois:3,paille:2},d:'Garde des drontes du Nord en vie : +2 vivres par saison. Perdu si le camp est attaqué ou assiégé.',req:t=>S.ele&&fa('dro')>0&&(!t||zDr(t)),rq:'Demande un éleveur libéré, un camp dans le Nord et des drontes encore sauvages',col:0x8a8a7a,h:.08},
 etable:{n:'Étable et basse-cour',c:{bois:3,paille:2},d:'Des bœufs de Madagascar pour tirer et labourer, des cabris, des coqs : le bétail grossit d’une tête par saison (jusqu’à 8), vivres +2 par saison. Le fourrage et les bêtes amènent aussi des graines d’ailleurs (plantes envahissantes +).',req:()=>S.voieC,rq:'Côté colonie',col:0x8a6a3a,h:.15},
 magasin:{n:'Magasin de l’habitation',c:{bois:3,pierre:3},d:'Un magasin de pierre où l’on garde le café, le riz et les outils : +40 vivres en réserve, rien ne s’abîme.',req:()=>S.voieC,rq:'Côté colonie',col:0xcfc3a6,h:.25},
 maisonVille:{n:'Maison de ville',c:{bois:4,pierre:3},d:'Une maison à Saint-Denis ou Saint-Paul pour la saison mondaine : colonie +1 et cohésion +1 par saison, mais la famille vit loin de l’habitation.',req:()=>S.voieC&&S.year>=1720&&camps().length>=2,rq:'Côté colonie, après 1720, avec deux quartiers',col:0xe8e0cc,h:.3},
 chenil:{n:'Chiens du grenier',c:{bois:2},d:'Des chiens gardent le grenier : les vols des marrons tombent au tiers. Parfois l’un d’eux s’échappe.',req:()=>S.voieC&&nBat('grenier')>0,rq:'Demande un grenier, côté colonie',col:0x7a5a3a,h:.08},
 enclos:{n:'Enclos',c:{bois:3},d:'Le bétail rapporte plus et on peut en garder davantage.',req:()=>(S.bet||0)>=1,rq:'Demande du bétail volé',col:0x8a6a3a,h:.08},
 kabare:{n:'Case du maloya',c:{bois:3,paille:3},d:'Vos marrons deviennent très maloya. +4 mystique, +1 cohésion par saison.',col:0x8a3a2a,h:.2},
 chapelle:{n:'Chapelle',c:{bois:3,pierre:2},d:'Vos colons deviennent très religieux. +3 mystique, +8 Colonie, +1 cohésion par saison.',req:()=>voie().c>=15,rq:'Demande 15 % de voie colonial',col:0xece4d2,h:.3},
 temple:{n:'Temple tamoul',c:{bois:2,pierre:4},d:'Bâti par les Indiens de vos camps. +5 mystique, +1 santé par saison.',req:()=>S.done.e1672&&(S.done.ritesT||(S.out&&S.out.inde)),rq:'Demande des Indiens parmi vous',col:0xc84a30,h:.3},
 doany:{n:'Doany malgache',c:{bois:2,pierre:2},d:'Lieu sacré des ancêtres malgaches, avec ses offrandes. +2 mystique, +1 Anciens par saison.',col:0x5a3a22,h:.2},
 autel:{n:'Sanctuaire africain',c:{bois:3,pierre:1},d:'Bâti selon la tradition de vos Africains. +4 mystique, +1 Gardiens par saison.',req:()=>S.done.zimba||(S.out&&(S.out.mozamb||S.out.cap)),rq:'Demande des Africains parmi vous',col:0x7a4a2a,h:.2},
 palissade:{n:'Palissade',c:{bois:3,pierre:1},d:'Ce camp se défend mieux.',req:()=>S.sv.pieges,rq:'Demande Pièges et guet',col:0x6b5a3c,h:.14}};
const nBat=k=>T.reduce((n,t)=>{const o=S.t[t.i];return n+(o&&o.vl?o.vl.filter(v=>v.k===k).length:0)},0);
const peut=r=>!r||Object.keys(r).every(k=>(S.res[k]||0)>=r[k]),paye=r=>{if(r)for(const k in r)S.res[k]-=r[k]};
const coutTx=r=>r?Object.keys(r).map(k=>r[k]+' '+k).join(', '):'';
const foretIci=t=>{const o=(S&&S.t&&S.t[t.i])||{};return o.fo!=null?o.fo:(t.forest?(o.clr?15:100):25)};const recolteV=t=>({bois:foretIci(t)>60?3:foretIci(t)>25?2:1,paille:t.alt<900?2:1,pierre:t.bare||t.slope>20?2:0});
// Microclimats. Tracés des rivières approximatifs : embouchure puis amont.
const RIVS=[['la Rivière des Galets',55.29,-20.93,55.43,-21.06],['la Rivière Saint-Étienne',55.36,-21.29,55.47,-21.13],['la Ravine Saint-Gilles',55.22,-21.05,55.30,-21.05],['la Rivière des Remparts',55.62,-21.37,55.64,-21.22],['la Rivière Langevin',55.65,-21.38,55.62,-21.25],['la Rivière du Mât',55.67,-20.95,55.53,-21.03],['la Rivière des Marsouins',55.70,-21.03,55.60,-21.07],['la Rivière de l’Est',55.78,-21.13,55.70,-21.18],['la Rivière Saint-Denis',55.45,-20.88,55.445,-21.0],['la Ravine de l’Ermitage',55.225,-21.08,55.30,-21.08],['la Ravine des Trois-Bassins',55.275,-21.12,55.35,-21.115],['la Rivière des Roches',55.705,-21.0,55.60,-21.07],['le Bras-Panon',55.685,-20.985,55.63,-21.02],['la Rivière Sainte-Suzanne',55.61,-20.90,55.57,-20.97],['la Rivière Saint-Jean',55.64,-20.925,55.60,-20.98],['la Rivière des Pluies',55.50,-20.89,55.48,-20.97]].map(([n,a,b,c,d])=>{const[x1,z1]=xz(a,b),[x2,z2]=xz(c,d);return{n,x1,z1,x2,z2}});
const dSeg=(x,z,r)=>{const dx=r.x2-r.x1,dz=r.z2-r.z1,l=dx*dx+dz*dz,u=Math.max(0,Math.min(1,((x-r.x1)*dx+(z-r.z1)*dz)/l));return Math.hypot(x-r.x1-u*dx,z-r.z1-u*dz)};
const CIRQ=[['Salazie',55.525,-21.045,5],['Cilaos',55.475,-21.14,5],['Mafate',55.425,-21.055,6]].map(([n,a,b,r])=>{const[x,z]=xz(a,b);return{n,x,z,r}});
const [PNx,PNz]=xz(55.489,-21.099);
const SECT=['Est','Nord-Est','Nord','Nord-Ouest','Ouest','Sud-Ouest','Sud','Sud-Est'],PLU={'Est':1,'Nord-Est':.85,'Nord':.5,'Nord-Ouest':.3,'Ouest':.15,'Sud-Ouest':.3,'Sud':.7,'Sud-Est':1};
const PAL=a=>a<400?'Bas':a<1000?'Mi-pentes':a<1800?'Hauts':'Sommets';
T.forEach(t=>{const r=RIVS.find(r=>dSeg(t.x,t.z,r)<1.3);t.riv=r?r.n:null;
 const an=Math.atan2(-(t.z-PNz),t.x-PNx);t.sect=SECT[((Math.round(an/(Math.PI/4))%8)+8)%8];t.pal=PAL(t.alt);
 const ci=t.alt>500&&t.alt<2100?CIRQ.filter(q=>Math.hypot(t.x-q.x,t.z-q.z)<q.r).sort((p,q)=>Math.hypot(t.x-p.x,t.z-p.z)-Math.hypot(t.x-q.x,t.z-q.z))[0]:null;t.cirq=ci?ci.n:null;
 let p=PLU[t.sect];if(p<.5&&t.pal!=='Bas')p+=t.pal==='Hauts'?.25:.12;if(t.pal==='Sommets')p*=.6;
 if(t.cirq)p=t.cirq==='Salazie'?1:t.cirq==='Cilaos'?.4:.45;t.plu=Math.min(1,p);
 t.mc=t.bare?'lave':t.cirq?'cirque':t.plu>=.7?'humide':t.plu<=.3?'sec':'moyen'});
// Îlets : replats des cirques, entre deux bras de rivière
T.forEach(t=>{if(!t.cirq||t.bare)return;const nb=t.nb.map(i=>T[i]),m=nb.reduce((s,u)=>s+u.slope,0)/Math.max(1,nb.length);t.ilet=t.slope<20&&m>t.slope+6});
// Îlets nommés, coordonnées approximatives
const ILETS=[['La Nouvelle',55.454,-21.083,'Mafate'],['Marla',55.437,-21.104,'Mafate'],['Roche Plate',55.405,-21.077,'Mafate'],['Grand Place',55.410,-21.036,'Mafate'],['Aurère',55.427,-21.012,'Mafate'],['Îlet à Bourse',55.415,-21.022,'Mafate'],['Îlet à Malheur',55.428,-21.027,'Mafate'],['Cayenne',55.395,-21.035,'Mafate'],['Îlet des Orangers',55.389,-21.047,'Mafate'],['Les Lataniers',55.388,-21.030,'Mafate'],
 ['Îlet à Cordes',55.453,-21.130,'Cilaos'],['Bras-Sec',55.488,-21.138,'Cilaos'],['Palmiste Rouge',55.488,-21.168,'Cilaos'],['Grand Îlet',55.497,-21.027,'Salazie'],['Îlet à Vidot',55.522,-21.055,'Salazie'],
 ['Entre-Deux',55.473,-21.240,null],['Îlet Quinquina',55.640,-21.065,null],['Îlet Bethléem',55.668,-21.060,null]];
ILETS.forEach(([n,a,b,c])=>{const t=near(a,b);if(t&&!t.bare){t.ilet=true;t.iln=t.iln?t.iln+', '+n:n;if(c&&t.cirq!==c){t.cirq=c;t.plu=c==='Salazie'?1:c==='Cilaos'?.4:.45;t.mc='cirque'}}});
const SPEC={Cilaos:{n:'raisin et lentilles',y:1850,av:'Soleil et sources : jardins près de l’eau favorisés.',h:'Les marrons ont été les premiers habitants de Cilaos. La vigne et la lentille arrivent avec les premiers colons du cirque, après l’abolition de 1848.'},
 Salazie:{n:'chouchou',y:1840,av:'Pluie toute l’année : les songes et les racines y poussent seuls.',h:'Le chouchou est importé du Mexique par Sully Brunet en 1840. Le cirque, refuge de marrons dès le XVIIe siècle, n’est concédé aux colons qu’à partir de 1830.'},
 Mafate:{n:'haricots',y:1700,av:'Bien caché, bien couvert : idéal pour l’élevage, les traces se voient peu.',h:'Mafate a servi de refuge aux marrons. La date d’arrivée des haricots est un choix du jeu.'}};
const spec=t=>t.cirq&&S.year>=SPEC[t.cirq].y;
const pluie=()=>((S.ns||0)*2)%4===0,wet=t=>t.plu>=.7,dry=t=>t.plu<=.3&&!t.riv;
const mcJ=t=>(t.riv?1.25:1)*(wet(t)?1.15:1)*(dry(t)?(pluie()?.8:.5):1)*(t.ilet?1.1:1)*(spec(t)?1.35:t.cirq==='Salazie'?1.15:t.cirq==='Cilaos'&&t.riv?1.15:1);
const mcTr=t=>(wet(t)&&pluie()?.7:1)*(dry(t)&&t.pal==='Bas'?1.2:1)*(t.ilet?.6:1)*(t.cirq==='Mafate'?.75:1);
const mafE=()=>camps().some(t=>t.cirq==='Mafate');
function climat(){let s=0;const P=pluie();camps().forEach(t=>{if(P&&wet(t))s-=.7;if(dry(t))s+=.3});if(s)fx({sante:s});
 if(P)T.forEach(t=>{const o=S.t[t.i];if(o&&t.riv&&wet(t)&&['jardin','jf','camp'].includes(o.b)&&rnd()<.22){if(o.b==='camp'){fx({vivres:-3});if(rnd()<.25)fx({gens:-1});log('Crue de '+t.riv+' : le camp a les pieds dans l’eau.')}else{o.dmg=1;log('Crue de '+t.riv+' : un jardin est emporté.')}}})}
function climTx(t){const pl='●'.repeat(Math.round(t.plu*5))+'○'.repeat(5-Math.round(t.plu*5));let a=[],d=[];
 if(t.bare)return 'Coulées de lave : rien ne pousse.';
 if(t.riv)a.push('eau toute l’année ('+t.riv+')');if(t.ilet)a.push((t.iln?t.iln+' : ':'')+'îlet, replat caché entre les remparts et les rivières, le coin parfait pour un camp marron');if(t.cirq==='Mafate'&&!t.ilet)d.push('à Mafate, on ne peut s’installer que sur un îlet');
 if(t.cirq){a.push(SPEC[t.cirq].av);a.push(spec(t)?'spécialité : '+SPEC[t.cirq].n+' (+35 % au jardin)':'plus tard : '+SPEC[t.cirq].n+' (vers '+SPEC[t.cirq].y+')')}
 if(wet(t)){a.push('cueillette et jardins abondants, la pluie efface les traces');d.push('fièvres et crues en saison des pluies')}
 if(dry(t)){a.push('bonne chasse, peu de fièvres');d.push('jardins secs en saison sèche'+(t.pal==='Bas'?', fumée visible de loin':''))}
 if(t.pal==='Sommets')d.push('au-dessus des nuages : sec et glacé');else if(t.cold)d.push('gel et brouillard');
 return {pl,a,d}}
const jv=(t,o,bb)=>(bb+(S.sv.songes?2:0)+(S.sv.jardinsC?1:0)+(S.sv.terrasses?Math.min(4,Math.floor(S.gens/20)):0))*t.yield*mcJ(t)*(specPres(t,'jardin')?1.25:1)*(o.niv?1.5:1)*(T.some(u=>S.t[u.i]&&S.t[u.i].zx&&hd(u,t)<=2)?1.25:1)*(S.sv.riz?1.2:1);
const etape=o=>{const a=o.age||0,v=(o.vl||[]).length,g=S.gens/Math.max(1,camps().length);return a>=14&&v>=3&&g>=8?2:(a>=4||v>=2)&&g>=5?1:0};
const vu=t=>T.some(u=>{const o=S.t[u.i];if(!o||!o.b)return false;const d=hd(u,t);return o.b==='guet'?d<=(S.sv.guetteurs?4:3):o.b==='camp'&&rot()==='garde'?d<=3:(o.b==='chasse'||o.b==='cueil'||o.b==='camp')?d<=2:false});
let S=null,pile=[],prevS=null,traceE=null;const snap=()=>{pile.push(JSON.stringify(S));if(pile.length>30)pile.shift()};const chasseV=t=>(specPres(t,'chasse')?1.3:1)*(S.sv.varmakalai?1.15:1)*(S.sv.silat&&t.forest?1.15:1)*(3.4+(t.alt>1800&&((S.ns||0)*2)%4===0?2:0)+(fa('sol')>0?.5:-.3)+(zDo(t)&&fa('dodo')>0?.5:0)+(zDr(t)&&fa('dro')>0?.5:0)+(S.year>=1700?.4*(t.forest?1:0):0)+(S.tr.includes(3)?1.5:0)+(S.chiens?.6:0))*t.ch*(1-Math.min(.7,((S.t[t.i]||{}).sur||0)*.07))*(typeof trpF==='function'?trpF(t):1),cueilV=t=>(volc(t)?.35:1)*1.4*t.cu*(specPres(t,'jardin')?1.15:1)*(wet(t)?1.15:dry(t)?.8:1),pistage=()=>Math.floor((S.pist||0)/4),EXPE=['explorer','chasse','cueil','recolte','descente'],EXPL=['chasse','cueil','recolte','jardin','jf','camp','guet'];
const voie=()=>{const o=S.vo||(S.vo={m:40,c:0,e:0}),s=o.m+o.c+o.e;return{m:Math.round(o.m*100/s),c:Math.round(o.c*100/s),e:100-Math.round(o.m*100/s)-Math.round(o.c*100/s)}};
const pencher=d=>{voie();for(const k in d)S.vo[k]=Math.max(0,S.vo[k]+d[k]*(S.voieC&&k==="m"&&d[k]>0?.35:1))};const ARMES=[{y:1663,n:'Mousquet à mèche',nav:'Flûtes et pinasses',a:0,s:0},
 {y:1690,n:'Premiers fusils à silex',nav:'Navires de la Compagnie des Indes',a:8,s:0,t:'Le fusil à silex arrive',an:'fin du XVIIe siècle',b:'Les navires de France apportent des fusils à silex. Ils ratent moins que les vieux mousquets à mèche, qui trahissaient le tireur par leur fumée.',v:'Le fusil à silex remplace peu à peu le mousquet à mèche en Europe à la fin du XVIIe siècle. Date d’arrivée à Bourbon approximative.'},
 {y:1717,n:'Fusil réglementaire modèle 1717',nav:'Navires de la Compagnie des Indes',a:14,s:0,t:'Le fusil modèle 1717',an:'1717',b:'La France adopte son premier fusil réglementaire, le même pour tous les soldats. Les caisses en arrivent jusqu’aux garnisons de l’océan Indien.',v:'Le modèle 1717 est le premier fusil réglementaire de l’armée française.'},
 {y:1735,n:'Canons et batteries de La Bourdonnais',nav:'Vaisseaux et frégates armés',a:20,s:1,t:'La Bourdonnais arme les îles',an:'1735',b:'Le nouveau gouverneur des Mascareignes fait construire des routes, des magasins et des batteries de canons. Ses vaisseaux font la liaison entre les deux îles.',v:'Mahé de La Bourdonnais gouverne les Mascareignes de 1735 à 1746. Les canons défendent la côte : dans les Hauts, ils servent peu, mais les routes amènent les détachements plus vite.'},
 {y:1742,n:'Détachements de chasseurs de marrons',nav:'Vaisseaux et frégates armés',a:26,s:1},
 {y:1777,n:'Fusil modèle 1777',nav:'Frégates doublées de cuivre',a:32,s:2,t:'Le fusil modèle 1777',an:'1777',b:'Un fusil plus solide et plus précis équipe les troupes et les milices.',v:'Le modèle 1777 restera l’arme de l’armée française jusqu’à l’Empire.'},
 {y:1840,n:'Fusil à percussion',nav:'Premiers bateaux à vapeur',a:40,s:3,t:'La percussion et la vapeur',an:'années 1840',b:'La capsule remplace la pierre à fusil : l’arme tire même sous la pluie des Hauts. Les premiers bateaux à vapeur ne dépendent plus du vent.',v:'L’armée française adopte la percussion autour de 1840. La vapeur gagne l’océan Indien au XIXe siècle.'}];
const arme=()=>ARMES.filter(a=>a.y<=((S&&S.year)||1663)).pop();
const CYR={1746:2,1752:3,1806:3,1807:3,1829:3,1844:2,1846:3,1850:2};
let DIFC='normal';const MONDE={conso:.85,det:1.7,atk:16,cyc:1.35,pres:2.6,expl:2};const DIFS={histoire:{n:'Histoire',...MONDE,res:5,sav0:6,mys0:4,sav:2,mys:1},normal:{n:'Normal',...MONDE,res:2,sav0:3,mys0:2,sav:1,mys:.5},expert:{n:'Expert',...MONDE,res:0,sav0:1,mys0:0,sav:.5,mys:.25}},D=()=>DIFS[(S&&S.dif)||'normal'];
function neuf(){const s={v:1,seed:Date.now()%2147483647||7,year:1663,gens:10,vivres:12,sante:80,coh:70,traque:5,savoir:DIFS[DIFC].sav0,myst:DIFS[DIFC].mys0,bras:2,acc:0,
 t:{},towns:[],det:[],cyc:{in:5,f:1},abri:0,fac:{anciens:55,gardiens:55,jardin:55},sv:{},tr:[],leg:false,pir:false,ami:20,maur:false,bats:[],bet:0,fu:0,chiens:0,dif:DIFC,res:{bois:2+DIFS[DIFC].res,paille:2+DIFS[DIFC].res,pierre:Math.floor(DIFS[DIFC].res/2)},vo:{m:40,c:0,e:0},sil:0,cd:0,done:{},log:[],evq:[],fin:null,nDesc:0};return s}
const rnd=()=>{let z=(S.seed=(S.seed+0x6D2B79F5)|0);z=Math.imul(z^z>>>15,z|1);z^=z+Math.imul(z^z>>>7,z|61);return((z^z>>>14)>>>0)/4294967296};
const tl=i=>S.t[i]||(S.t[i]={});
const clamp=(v,a=0,b=100)=>Math.max(a,Math.min(b,v));
const seen=t=>!!(S.t[t.i]&&S.t[t.i].s);
function reveal(t,r){T.forEach(u=>{if(hd(t,u)<=r){const o=tl(u.i);if(!o.s){o.s=1;o.p=1}}})}
function ouvrir(t,r){const o=tl(t.i);o.s=1;delete o.p;T.forEach(u=>{const d=hd(t,u);if(d<=r){const q=tl(u.i);if(!q.s){q.s=1;q.p=1}}})}
const prs=(t,lo,la,r)=>{const [x,z]=xz(lo,la);return Math.hypot(t.x-x,t.z-z)<r};
const cristalIci=t=>{if(t.bare)return null;if(t.riv&&(tunnelL(t)||(t.alt>300&&prs(t,55.489,-21.099,7))))return 'zeo';if(volc(t)||(t.alt<250&&prs(t,55.77,-21.25,8)))return 'oli';if(t.alt<600&&prs(t,55.79,-21.13,4))return 'lab';return null};
const esoP=()=>!!(S.sv.anciens||S.sv.zerbaz||(S.myst||0)>=20||S.year>=1970);
const CRI={zeo:'zéolithe',oli:'olivine',lab:'labradorite',ame:'améthyste'};
const hautMax=()=>S.year<1750?700:S.year<1830?1200:9999;
function titre(){if(S.voieC)return S.gouv?(S.year>=1947?'Préfet':S.year>=1767?'Gouverneur du Roi':'Gouverneur'):(camps().length>=3?'Notable des quartiers':'Habitant');return S.roi==='vous'?'Roi marron':S.roi?'Sujets de '+ROIS[S.roi].n:'Chef de camp'}
function marronsCaches(){const p=voie(),dur=p.e/100;if(S.year>=abolY()){S.ins=Math.max(0,(S.ins||0)*.7);S.traque=Math.round(S.ins);return}
 S.ins=Math.max(0,Math.min(100,(S.ins||0)*.96+rnd()*(1+dur*3)+(S.roiH?.5:0)));
 if(S.year>=1665&&S.gens>4&&rnd()<.08+dur*.35){fx({gens:-1});S.ins=Math.min(100,S.ins+2);log(['Un esclave s’enfuit de l’habitation pendant la nuit. On dit qu’il a gagné les Hauts.','Une femme et son enfant manquent à l’appel du matin. La milice ne retrouve pas leur trace.','Deux hommes partis au bois ne reviennent pas.'][Math.floor(rnd()*3)])}
 if(nBat('chenil')&&rnd()<.06){S.rb=(S.rb||0)+1;log('Un chien du grenier s’échappe dans les ravines. Ses petits seront des « royal bourbon ».')}
 if(rnd()<S.ins/260/(nBat('chenil')?3:1)){const v=3+Math.floor(rnd()*5);S.vivres=Math.max(0,S.vivres-v);if((S.bet||0)>0&&rnd()<.5)S.bet--;log(['Des marrons descendent la nuit : '+v+' vivres volés au magasin.','Un champ brûle au-dessus de l’habitation. Personne n’a rien vu : '+v+' vivres perdus.','Des bêtes et des outils disparaissent : '+v+' vivres de moins.'][Math.floor(rnd()*3)])}
 S.traque=Math.round(S.ins)}
const abolY=()=>S.br&&S.br.abol?1796:1848;
const pasAn0=()=>S.year<1752?2:S.year<1848?4:S.year<1946?6:8,momentFort=()=>!!((S.det&&S.det.length)||(S.cyc&&S.cyc.in<=1)||S.pours||(S.bats&&S.bats.length)||(S.evq&&S.evq.length>1)),pasAn=()=>(S.dif&&S.dif!=='histoire')?.5:(S.ry==='reel'||(S.ry==='mixte'&&momentFort())?.5:pasAn0());
const GRANDS=[
 [1767,55.452,-20.884,'gJardin','Jardin du Roi','Pierre Poivre fait venir épices et plantes rares : le futur Jardin de l’État, à Saint-Denis.'],
 [1767,0,0,'route','Chemin des Anglais','Pavé de basalte de 1767 à 1775, il longe la côte au bord des falaises depuis La Possession, descend à la Grande Chaloupe, puis remonte par la Montagne jusqu’à Saint-Denis.',[[55.336,-20.925],[55.35,-20.913],[55.365,-20.903],[55.378,-20.897],[55.4,-20.903],[55.425,-20.903],[55.445,-20.886]]],
 [1700,0,0,'route','Sentier de Dos d’Âne','Avant les routes de la côte, on passait par les hauts : La Possession, Dos d’Âne, la plaine des Chicots, puis on redescendait par le Brûlé vers Saint-Denis. C’est aujourd’hui un sentier de randonnée.',[[55.336,-20.925],[55.36,-20.955],[55.385,-20.973],[55.415,-20.968],[55.437,-20.958],[55.448,-20.93],[55.448,-20.885]]],
 [1750,0,0,'route','Sentier de la rivière de l’Est','Un vieux sentier remonte la rivière de l’Est depuis Sainte-Rose jusqu’à la plaine des Cafres : praticable seulement en saison sèche.',[[55.79,-21.13],[55.745,-21.138],[55.7,-21.155],[55.65,-21.175],[55.61,-21.195],[55.575,-21.205]]],
 [1788,55.257,-21.042,'gMaison','Maison Desbassayns','La grande maison de pierre des Panon-Desbassayns, à Villèle, avec sa sucrerie et ses ateliers servis par des esclaves.'],
 [1810,55.442,-20.896,'gMonu','Mausolée de La Redoute','Élevé fin 1810 par les Britanniques pour l’officier Munro et leurs soldats tombés.'],
 [1820,55.400,-21.268,'gUsine','Sucrerie du Gol','Les premières sucreries à vapeur : la canne remplace le café. Date approximative.'],
 [1825,55.660,-20.940,'gUsine','Sucrerie de Bois-Rouge','Sucrerie de l’Est, à Saint-André. Date approximative.'],
 [1829,55.451,-20.878,'gEglise','Cathédrale de Saint-Denis','Construite de 1829 à 1832.'],
 [1846,55.612,-20.902,'gPhare','Phare de Bel-Air','Le phare de Sainte-Suzanne, allumé en 1846.'],
 [1855,55.292,-21.168,'gUsine','Sucrerie de Stella Matutina','Sucrerie de Saint-Leu, aujourd’hui musée. Date approximative.'],
 [1860,55.448,-20.880,'gHotel','Hôtel de ville de Saint-Denis','L’ancien hôtel de ville, achevé vers 1860.'],
 [1882,0,0,'rail','Chemin de fer','Le chemin de fer de La Réunion relie Saint-Benoît à Saint-Pierre par la côte, avec un long tunnel sous la Montagne.',[[55.713,-21.033],[55.65,-20.962],[55.61,-20.912],[55.55,-20.9],[55.45,-20.885],[55.40,-20.915],[55.335,-20.93],[55.295,-20.94],[55.27,-21.005],[55.24,-21.06],[55.285,-21.168],[55.36,-21.24],[55.41,-21.275],[55.478,-21.338]]],
 [1886,55.288,-20.935,'gPort','Port de la Pointe des Galets','Le premier vrai port de l’île, creusé dans les galets : la ville du Port naît autour.'],
 [1894,55.782,-21.142,'gPont','Pont suspendu de la rivière de l’Est','Le « pont des Anglais » de Sainte-Rose, l’un des plus longs ponts suspendus de son temps.'],
 [1898,55.452,-20.876,'gTemple','Temple chinois de Saint-Denis','Le temple de Guan Di, dieu de la loyauté, élevé par les associations chinoises. Date approximative.'],
 [1905,55.449,-20.877,'gMosq','Mosquée Noor-e-Islam','Élevée à Saint-Denis par les commerçants musulmans venus du Gujarat : la première mosquée de France.'],
 [1946,55.512,-20.888,'gAero','Aéroport de Gillot','Aérodrome puis aéroport Roland-Garros. Date approximative.'],
 [1963,0,0,'route','Route du Littoral','La route au pied de la falaise, entre Saint-Denis et La Possession, sous les éboulis.',[[55.45,-20.882],[55.41,-20.892],[55.37,-20.905],[55.335,-20.925]]],
 [2022,0,0,'route','Nouvelle route du littoral','Le viaduc en mer, loin de la falaise. Ouvert par tronçons depuis 2022.',[[55.45,-20.878],[55.41,-20.884],[55.37,-20.896],[55.335,-20.918]]]
];
const grandsVus=()=>GRANDS.filter(g=>g[0]<=S.year);
const volc=t=>{if(t._v===undefined){const [vx,vz]=xz(55.714,-21.244);t._v=!t.bare&&t.alt>1300&&Math.hypot(t.x-vx,t.z-vz)<9.5}return t._v};
const avecBat=k=>T.filter(t=>((S.t[t.i]||{}).vl||[]).some(v=>v.k===k));
const voisins=(a,b)=>a.some(t=>b.some(u=>hd(t,u)<=2));
function syncretisme(){const ch=avecBat('chapelle');if(!ch.length)return {mv:false,ml:false};return {mv:S.year>=1849&&voisins(ch,avecBat('temple')),ml:voisins(ch,avecBat('doany').concat(avecBat('autel')))}}
const tunnelL=t=>{if(t._tl===undefined){const [vx,vz]=xz(55.714,-21.244),d=Math.hypot(t.x-vx,t.z-vz);t._tl=!t.bare&&t.alt>150&&t.alt<1600&&d>6&&d<18&&((t.i*7919)%5===0)}return t._tl};
const nomIle=()=>S.nom&&S.nom!=='Bourbon'?S.nom:(S.br&&S.br.anglR&&S.year>=1810?'Bourbon Island':S.year>=1848?'La Réunion':S.year>=1815?'Bourbon':S.year>=1810?'Bourbon (anglaise)':S.year>=1806?'Île Bonaparte':S.year>=1793?'La Réunion':'Bourbon');
const camps=()=>T.filter(t=>S.t[t.i]&&S.t[t.i].b==='camp');
const count=b=>T.filter(t=>S.t[t.i]&&S.t[t.i].b===b).length;
const inCamp=t=>camps().some(c=>hd(c,t)<=2);
const colTiles=()=>T.filter(t=>S.t[t.i]&&S.t[t.i].c);
const cap=()=>4+camps().length*8+(S.sv.royaume?6:0)+nBat('case')*3;
// Rotation du camp par quarts de 8 h : repos, feu et garde, travail dehors
const ROT={equilibre:{n:'Quarts équilibrés',d:'Un tiers dort, un tiers tient le feu et la garde, un tiers part travailler.'},travail:{n:'Tout le monde dehors',d:'Plus de bras pour chasser et explorer, mais le camp est mal gardé, on mange mal et on dort peu.'},garde:{n:'Camp bien gardé',d:'Moins de bras dehors, mais le camp est surveillé, les repas sont faits et chacun se repose.'}};
const rot=()=>S.rot||'equilibre',EXP=()=>(S.dif||'normal')==='expert';
function quarts(){const g=S.gens,r=rot();const repos=Math.round(g/(r==='travail'?4:3)),garde=Math.round(g/(r==='travail'?6:r==='garde'?2.5:3));return {repos,garde,dehors:Math.max(0,g-repos-garde)}}
const brasMax=()=>(typeof brasJeu==='function'&&brasJeu()!=null)?brasJeu():Math.max(1,1+Math.floor(S.gens/(EXP()?7:6))+(rot()==='travail'?(S.gens>=24?2:1):rot()==='garde'?-1:0)+(S.sv.royaume?1:0)+(S.gouv?1:0)-(S.sante<35?1:0)-Math.floor((S.autP||0)/3)+(S.sv.conseil?Math.floor(camps().length/3):0));
const foret=()=>{const f=T.filter(t=>t.forest);return Math.round(100*f.filter(t=>!(S.t[t.i]&&(S.t[t.i].clr||S.t[t.i].c))).length/f.length)};
const defFac=n=>S.fac[n]>60;
function trace(c){const near=count('x');let cl=0;T.forEach(t=>{const o=S.t[t.i];if(o&&o.clr&&hd(t,c)<=2)cl++});
 let g=0;T.forEach(t=>{const o=S.t[t.i];if(o&&o.b==='guet'&&hd(t,c)<=3)g++});
 let d=99;colTiles().forEach(u=>d=Math.min(d,hd(u,c)));
 let v=(1.15-voie().m/250)*(14+S.gens/camps().length*.5+cl*6-c.alt/150-c.slope/4-g*5)*(S.sv.feux?.7:1);
 return Math.max(1,v)*mcTr(c)*(S.sv.ruses?.9:1)*(rot()==='travail'?1.15:rot()==='garde'?.9:1)*(S.sv.guetteurs?Math.max(.7,1-.05*T.filter(u=>S.t[u.i]&&S.t[u.i].b==='guet').length):1)*(S.roi==='anchaing'?.85:1)*((S.spec||{})[c.i]==='eclair'?.8:1)*(d<4?D().pres:d<8?1:.6)}
function log(m){S.log.unshift({y:S.year,m});S.log.length=Math.min(S.log.length,60)}
function fx(o){for(const k in o){if(k in S.fac)S.fac[k]=clamp(S.fac[k]+o[k]);else if(k==='sante'||k==='coh'||k==='traque'||k==='ami')S[k]=clamp((S[k]??20)+o[k]);else if(k==='gens')S.gens=Math.max(0,S.gens+o[k]);else S[k]=Math.max(0,(S[k]||0)+o[k])}}
const cote=t=>t.alt>=400||voie().c>=25;
const COLN={camp:'Ouvrir une habitation',lever:'Abandonner l’habitation',embuscade:'Tendre une embuscade aux marrons',descente:'Lancer un détachement contre les marrons',explorer:'Reconnaissance',chasse:'Chasse sur vos terres',jardin:'Défricher pour la plantation',jf:'Verger de l’habitation',guet:'Poste de milice',commerce:'Commercer au port',course:'Armer une course',cueil:'Cueillir sur la concession'};
function actions(t){let A=actions0(t);if(S.pp&&S.t[t.i]&&S.t[t.i].b==='camp'&&couplesMixtes()&&!A.find(a=>a.id==='unir'))A=A.concat([{id:'unir',n:'Unir deux familles',c:1,d:'Une fête, des cadeaux, deux familles d’origines différentes se lient par un mariage : cohésion +3, les cultures se mêlent, les enfants naîtront créoles.'}]);if(S.t[t.i]&&S.t[t.i].s&&cristalIci(t)&&!A.find(a=>a.id==='cristal'))A=A.concat([{id:'cristal',n:'Chercher des cristaux',c:1,d:{zeo:'Dans les crevasses du lit, au-dessus de l’eau qui coule sous la roche : la zéolithe, blanche et fragile. On dit qu’elle raffermit la foi (mystique).',oli:'Entre les galets et sur les coulées : des grains verts d’olivine (cohésion, et monnaie d’échange).',lab:'Une pierre aux reflets bleus (mystique et cohésion).'}[cristalIci(t)]}]);if(!S.voieC)return A;A=actionsColonie(t,A);if(t.alt>hautMax())A=A.filter(a=>a.id!=='explorer');A.forEach(a=>{if(COLN[a.id])a.n=COLN[a.id]});const o=S.t[t.i]||{};if(o.b==='camp'){A.push({id:'concession',n:'Demander une concession',c:1,d:'Écrire à la Compagnie ou au gouverneur pour agrandir vos terres : colonie +5, votre île penche vers la colonie.'});if(S.gouv)A.push({id:'chemin',n:'Ordonner un chemin entre les quartiers',c:2,r:{pierre:2},d:'Un chemin royal relie les quartiers : cohésion +3, colonie +3, savoir +1.'});if(S.year<abolY())A.push({id:'detache',n:'Envoyer la milice dans les Hauts',c:2,d:'Traquer les marrons insoumis : ils reculent (−15), colonie +6, cohésion −2, mystique −1.'})}return A}
function actions0(t){const o=S.t[t.i]||{},A=[],camp=o.b==='camp',col=o.c;
 const add=(id,n,c,d,k,r)=>A.push({id,n,c,d,k,r});
  const mer=t.alt<250&&(t.nb.length<6||t.nb.some(i=>T[i].alt<=1));const emb=t.riv&&t.alt<80&&mer,ot=S.t[t.i]||{};if(t.riv&&!volc(t))add('peche',emb?'Pêcher à l’embouchure':'Pêcher en rivière',1,emb?(ot.vouve?'Vos vouves barrent l’embouchure : à la saison des pluies, de vrais bichiques, gris et bien formés. +'+Math.round(2+4*(S.bich??100)/100)+' vivres par saison des pluies, +1 sinon.':'Sans embouchure aménagée, les bichiques passent : un peu de tout, mêlé de petits poissons. +2 vivres par saison.'):'Camarons et anguilles : +2 vivres par saison.');if(t.riv&&!emb&&t.alt>=80&&t.alt<900&&!volc(t))add('cabot','Pêcher les cabots',1,'Les bichiques qui ont réussi à remonter deviennent des cabots, dans les bassins et les cascades : +'+Math.round(1+2*(S.bich??100)/100)+' vivres. Moins il en meurt à l’embouchure et en mer, plus il y en a.');
  if(tunnelL(t))add('tunnel','Descendre dans le tunnel de lave',1,'Un tube de lave froid mène à de l’eau souterraine, filtrée par la pierre : +2 santé par saison, et un refuge où les chasseurs ne vont pas (traque −1).');
  if(emb&&!ot.vouve)add('vouve','Aménager l’embouchure',2,'Bâtir des vouves et des canaux de galets pour guider les bichiques qui remontent. Une fois fait, la pêche à l’embouchure nourrit vraiment.');if(mer)add('pecheM',S.voieC?'Envoyer la pirogue en mer':'Pêcher en mer',1,S.voieC?'Les pêcheurs de l’habitation sortent la pirogue au petit jour : poissons et ourites, +3 vivres. Gare au gros temps et aux requins.':'Le jour et la nuit ne donnent pas les mêmes poissons : les uns se prennent au soleil sur le bord des récifs, d’autres montent près de la côte dans le noir. Près des colons : poissons et ourites, +3 vivres, mais la traque monte (braconnage). Les vieux le répètent : « bichique pris en mer, rivière vide demain ».');
 if(!o.s){if(t.nb.some(n=>S.t[n]&&S.t[n].s)){const dc=camps().length?Math.min(...camps().map(k=>hd(k,t))):0,conn=(S.trail||[]).filter(i=>hd(T[i],t)<=2).length+Object.keys(S.pas||{}).filter(i=>S.t[i]&&S.t[i].vo&&hd(T[i],t)<=2).length,N=(t.slope<10?4:t.slope<25?3:2)+(conn>=2?2:0),ex=Math.floor(Math.max(0,dc-2)/N);if(!(t.riv&&t.alt<300&&pluie()))add('explorer','Explorer',Math.min(4,1+ex),'Un groupe ouvre un sentier de 4 cases : ici, puis 3 cases voisines que vous tracez au clic.'+(ex?' À '+dc+' cases du camp, un chasseur reste en route toutes les '+N+' cases pour nourrir les autres : '+(1+ex)+' bras.':'')+(conn>=2?' Des sentiers connus passent par là : on va plus vite.':'')+(t.slope>30?' Pente raide : plus de risques de chute.':'')+(t.riv&&t.alt<300?' Grande rivière : on ne la passe qu’en saison sèche.':''))}return A}
 add('recolte','Ramasser bois, paille et pierre',1,'Donne ici '+coutTx(recolteV(t)).replace(', 0 pierre','')+'.');
 const tr=TRACES.find(x=>x.t===t&&!S.tr.includes(x.id));
 if(tr)add('examiner','Examiner ce lieu',1,'Quelque chose a été laissé ici.','sec');
 const det=S.det.find(d=>d.i===t.i&&vu(t));
 if(det&&T.some(u=>hd(u,t)<=3&&S.t[u.i]&&['camp','guet'].includes(S.t[u.i].b)))add('embuscade','Tendre une embuscade',2,'Chasser le détachement avant qu’il arrive.','dan');
 if(col&&!S.voieC){if(camps().some(c=>hd(c,t)<=6)){add('descente','Mener une descente',2,'Prendre vivres, bétail et armes, libérer des personnes. La traque monte fort.','dan');add('commerce','Commercer avec la côte',1,'6 vivres et moins de traque. La colonie devient plus amicale, la société penche vers elle.')}if(S.maur)add('maurice','Passage vers Maurice',1,'2 personnes embarquent pour l’Île de France. Elles renvoient 8 vivres.');return A}
 if(t.alt<200&&!camp&&!o.b&&S.year>=1690)add('course','Armer une course en mer',2,'Pirogues et prises en mer : 10 vivres, mais la colonie devient hostile.','dan');
 if(camp){add('lever','Lever le camp',1,'Partir sans perte. Le camp est abandonné.','dan')}
 else if(!o.b){
  const connu=!o.p||(t.nb.every(i=>S.t[i]&&S.t[i].s)&&t.nb.some(i=>S.t[i]&&S.t[i].b&&S.t[i].b!=='camp'));if(!camps().some(c=>hd(c,t)<3)&&!t.bare&&(cote(t)||S.voieC)&&connu&&!(t.cirq==='Mafate'&&!t.ilet))add('camp','Fonder un camp',2,'Coûte '+campV()+' vivres. Ajoute 8 places et de la cueillette.'+(t.cold?' Il fera froid ici.':''),'',{bois:4,paille:4});
  if(volc(t))add('cueil','Cueillir les plantes du volcan',1,'Scories, lande et vent froid : pas un cabri, à peine de quoi manger. Mais le branle vert et les fougères font de bonnes tisanes : +0,5 vivre, +1,5 santé par saison.');
  if(!t.bare&&!volc(t)){add('chasse','Chasser ici',1,'+'+chasseV(t).toFixed(1).replace('.0','')+' vivres par saison. '+(typeof trpF==='function'&&trpF(t)<.4?'Pas de troupeau près d’ici : quelques oiseaux, une tangue de temps en temps.':'Un troupeau vit près d’ici ; chassé trop souvent, il s’en ira.')+' Fait progresser le pistage.');
   if(!volc(t))add('cueil','Cueillir ici',1,'+'+cueilV(t).toFixed(1).replace('.0','')+' vivres et +0,4 santé par saison.');
   if(!o.p)add('jardin','Jardin sur brûlis',2,'+'+Math.round((5+(S.sv.songes?2:0))*t.yield)+' vivres. Brûle la forêt, laisse des traces, craint les cyclones.','',{bois:1});
   if(!o.p&&S.leg&&t.forest)add('jf','Jardin-forêt',2,'+'+Math.round((4+(S.sv.songes?2:0))*t.yield)+' vivres. Sous les arbres, sans brûler, résiste aux cyclones.','sec',{bois:1});
   if(!o.p)add('guet','Poste de guet',1,'Réduit les traces des camps proches et voit plus loin.','',{bois:2})}
 }else if(o.b&&o.b!=='camp'){if((o.b==='jardin'||o.b==='jf')&&!o.niv&&(S.sv.songes||S.jard))add('ameliorer','Améliorer le jardin',1,'+50 % de vivres, grâce aux savoirs acquis ou aux personnes libérées.','',{bois:1,pierre:2});if(!camps().some(c=>hd(c,t)<3)&&!t.bare&&(cote(t)||S.voieC)&&!(t.cirq==='Mafate'&&!t.ilet))add('camp','Fonder un camp ici, à la place',2,'Le lieu est connu : on y installe le camp en remplaçant ce qui s’y trouve. Coûte '+campV()+' vivres.','',{bois:4,paille:4});add('retirer','Laisser à la forêt',0,('Abandonner ce lieu.'+(o.clr?' La forêt repoussera.':''))+(o.an===S.year?' Posé cette saison : '+((o.cb||0)>1?'vos '+o.cb+' bras vous sont rendus.':'le bras vous est rendu.'):' Posé une saison passée : un bras de plus la saison prochaine.'))}
 return A}
const danger=t=>(S.det||[]).some(d=>T[d.i]&&hd(T[d.i],t)<=2)||(S.batt||[]).some(d=>T[d.i]&&hd(T[d.i],t)<=2)||colTiles().some(u=>hd(u,t)<=1);
function coupeT(m){traceE=null;log(m)}
function pasTrace(t){if(!traceE)return false;const L=T[traceE.last];if(hd(t,L)!==1||t.bare&&t.slope>40||(S.t[t.i]&&S.t[t.i].c))return false;if(t.riv&&t.alt<300&&pluie()&&!((S.t[t.i]||{}).pont===2)&&!((S.t[t.i]||{}).pont===1&&rnd()<.6)){traceE.msg='La rivière est en crue : en saison des pluies, on ne passe pas les grandes rivières des bas.';return false}if(t.riv&&t.alt<300&&rnd()<.06){log('Au passage du gué, le courant emporte le sac de vivres.');fx({vivres:-3})}
 const o=tl(t.i),neuf=!o.s;if(neuf){o.s=1;o.p=1}(S.trail=S.trail||[]).push(t.i);passer(t.i,1,S.voieC);traceE.last=t.i;traceE.n--;fx({traque:.4});if(neuf)log('Le sentier s’ouvre jusqu’à '+(lieuDe(t)||lieuProche(t)||'un lieu inconnu')+'.');
 if(danger(t)){coupeT('Danger : des traces de chasseurs de marrons. Le groupe coupe le sentier et se replie.');return true}
 if(rnd()<Math.min(.3,.04+t.slope/220)){if(S.sv.varmam&&rnd()<.5){log('Une chute, mais le varmam remet le blessé sur pied.')}else{coupeT('Une chute dans la pente : le sentier s’arrête ici.');(S.bless=S.bless||[]).push(t.i);S.evq.push('blesse');return true}}
 if(traceE.n>0&&rnd()<.18){S.trC=t.i;S.evq.push('trChoix');return true}
 if(traceE.n<=0)traceE=null;return true}
function agir(t,id,libre){const a=actions(t).find(x=>x.id===id);if(!a||(!libre&&(S.bras<a.c||!peut(a.r))))return false;const o=tl(t.i);if(id==='unir'){const c=couplesMixtes();if(!c||(!libre&&S.bras<a.c))return false;if(!libre){snap();S.bras-=a.c}unir(c[0],c[1],true);sauve();return true}
if(id==='cabotage'||id==='soldats'||id==='sentierE'){if(!libre&&S.bras<a.c)return false;if(!libre){snap();S.bras-=a.c}if(id==='cabotage'){let n=0;S.cab=(S.cab||0)+1;const R=4+S.cab*4;T.forEach(u=>{if(cotier(u)&&!u.bare&&hd(u,t)<=R){const q=tl(u.i);if(!q.s){q.s=1;n++}}});ouvrir(t,1);log(n?'La chaloupe revient : '+n+' cases de côte reconnues.':'La chaloupe longe une côte déjà connue.')}if(id==='soldats'){S.sold=4;fx({vivres:-8});log('Des soldats débarquent : ils escorteront vos expéditions dans les bois.')}if(id==='sentierE'){S.sentE=(S.sentE||0)+1;log('Un sentier de porteurs relie maintenant vos quartiers.')}ppAction(id,a.c);sauve();return true}
if(['concession','detache','cristal','chemin'].includes(id)){if(!libre){snap();S.bras-=a.c;if(a.r)paye(a.r)}ppAction(id,a.c);if(id==='cristal'){const k=cristalIci(t),ok=rnd()<(k==='zeo'?.4:.6);if(ok){S.pi=S.pi||{};S.pi[k]=(S.pi[k]||0)+1;if(k==='zeo'){if(esoP())fx({myst:3});log('Dans une crevasse du lit presque sec, au-dessus de l’eau qui coule sous la roche : un cristal de zéolithe, blanc comme du sel.'+(esoP()?' On dit qu’il raffermit la foi.':' Personne ne sait encore quoi en faire.'))}if(k==='oli'){fx({coh:1,ami:2});log('Des grains verts d’olivine brillent entre les galets noirs.')}if(k==='lab'){fx({myst:1,coh:2});log('Une pierre aux reflets bleus sort de la roche.')}}else log('On fouille la roche toute la journée : rien cette fois.')}
if(id==='chemin'){fx({coh:3,ami:3,savoir:1});log('Un chemin royal relie désormais les quartiers.')}if(id==='concession'){fx({ami:5});pencher({c:3});log('Une concession est demandée à la Compagnie.')}else if(id==='detache'){const pv=(S.sec||0)>=2;if(pv){S.sec-=2;log('Le détachement emporte du boucané : il peut rester plusieurs semaines dans les Hauts.')}S.ins=Math.max(0,(S.ins??40)-(pv?22:15)-(S.allFam?6:0));if(S.allFam)log('Les chasseurs des grandes maisons marchent avec votre milice.');fx({ami:6,coh:-2,myst:-1});pencher({c:2});log('La milice monte traquer les marrons insoumis.')}sauve();return true}
 if(!libre&&id==='camp'&&S.vivres<campV())return false;
 if(!libre){snap();S.bras-=a.c;paye(a.r)}ppAction(id,a.c);{const ct=coutTrajet(t,id,a.c);if(ct)log(ct)}if(id==='chasse'&&S.sv.kitoza&&S.vivres>40){S.sec=(S.sec||0)+2;log(S.voieC?'Une part du gibier est boucanée et mise de côté.':'Une part du gibier est coupée en lanières et séchée au feu : de quoi partir loin.')}if(EXPL.includes(id)){if(!o.ex){o.ex=1;S.nEx=(S.nEx||0)+1}ouvrir(t,S.sv.sentiers?2:1)}if(id==='chasse')S.pist=(S.pist||0)+1;if(id==='chasse'&&t.alt>1800&&((S.ns||0)*2)%4===0&&!S.done.petrels&&!S.evq.includes('petrels'))S.evq.push('petrels');if(EXPL.includes(id)&&t.zeo&&!o.zx){o.zx=1;fx({myst:3,sante:4});log('La zéolite naturelle de cette zone clarifie son eau.');if(!S.done.zeoC)S.evq.push('zeoC')}if(id==='recolte'){const g=recolteV(t);for(const k in g)S.res[k]+=g[k]}if(id==='ameliorer'){o.niv=1;fx({jardin:3})}
 if(id==='explorer'){o.s=1;o.p=1;(S.trail=S.trail||[]).push(t.i);S.fac.gardiens=clamp(S.fac.gardiens+.5)}
 if(id==='camp'){S.vivres-=campV();o.b='camp';reveal(t,2);fx({anciens:2});log('Un camp est fondé '+(lieuDe(t)||lieuProche(t)||'dans les Hauts')+'.')}
 if(id==='chasse')o.b='chasse';if(id==='cueil')o.b='cueil';if(id==='peche'||id==='pecheM'||id==='cabot'||id==='tunnel')o.b=id;if(id==='tunnel'&&!(S.galT||{})[t.i]&&!S.evq.includes('galC')){S.galLieu=lieuDe(t)||lieuProche(t)||'les Hauts';S.galTi=t.i;S.evq.push('galC')}if(id==='peche'||id==='cabot'){const vu=new Set([t.i]),file=[[t,0]];let n=0;while(file.length){const [u,d]=file.shift();if(d>=5)continue;u.nb.forEach(i=>{const w=T[i];if(vu.has(i)||!(w.riv||w.ilet))return;vu.add(i);const q=tl(i);if(!q.s){q.s=1;q.p=1;n++}file.push([w,d+1])})}if(n)log('En remontant la rivière pour pêcher, vos gens découvrent '+n+' case'+(n>1?'s':'')+' de son cours'+(T.some(w=>vu.has(w.i)&&w.ilet)?' et des îlets.':'.'))}if(id==='vouve'){o.vouve=1;o.b='peche';log('L’embouchure est aménagée : vouves et canaux de galets.')}
 if(id==='jardin'){o.b='jardin';if(t.forest)o.clr=1;fx({jardin:3,anciens:-1})}
 if(id==='jf'){o.b='jf';fx({jardin:3,anciens:2})}
 if(id==='guet'){o.b='guet';fx({gardiens:2})}
 if(id==='retirer'){if(o.an===S.year){S.bras+=o.cb||0;if(o.cr)for(const k in o.cr)S.res[k]+=o.cr[k];log('Terrain abandonné dans la même saison : '+(o.cb||0)+' bras rendus.')}else{S.brasNext=(S.brasNext||0)+1;log('Le terrain est rendu à la forêt : un bras de plus la saison prochaine.')}delete o.b;delete o.an;o.reg=o.clr?6:0}
 if(['chasse','cueil','jardin','jf','guet'].includes(id)){o.an=S.year;o.cb=a.c;o.cr=a.r||null}
 if(id==='lever'){delete o.b;log('Le camp est levé. Tout le monde a marché de nuit.');fx({coh:-3});if(!camps().length){const n=t.nb.map(i=>T[i]).filter(u=>!(S.t[u.i]&&S.t[u.i].c)&&!(S.t[u.i]&&S.t[u.i].b)).sort((a,b)=>b.alt-a.alt)[0]||t;tl(n.i).b='camp'}}
 if(id==='descente'){const f=Math.ceil(2*rnd())+(S.pir?1:0);fx({vivres:9,gens:f,traque:16,gardiens:6,jardin:-2,coh:2});S.nDesc++;const anx=1+Math.floor(rnd()*2);S.bet=Math.min(14+nBat('enclos')*8+(mafE()?6:0),(S.bet||0)+anx);let butin='';if(rnd()<.25){S.forg=1;butin+=', un forgeron libéré'}if(rnd()<.25){S.jard=1;fx({savoir:2});butin+=', une cultivatrice libérée'}if(rnd()<.3){S.chiens=1;butin+=', un chien de chasse'}if(!S.ele&&rnd()<.22){S.ele=1;butin+=', un éleveur libéré qui sait garder les bêtes'}if(S.year>=1680&&rnd()<.3){S.fu=(S.fu||0)+1;butin+=', un fusil'}let m='Descente : 9 vivres, '+anx+' bête'+(anx>1?'s':'')+' d’élevage'+butin+' et '+f+' personne'+(f>1?'s':'')+' libérée'+(f>1?'s':'');if(rnd()<.3){fx({gens:-1});m+=', mais une personne ne revient pas'}log(m+'.')}
 if(id==='descente'){pencher({m:3});fx({ami:-8})}if(id==='course'){fx({vivres:10,traque:8,ami:-10,gardiens:4});if(rnd()<.25){fx({gens:-1});log('Une pirogue ne revient pas.')}else log('Course en mer : 10 vivres.')}if(id==='maurice'){fx({gens:-2,vivres:8,traque:-4});log('2 personnes passent à Maurice et renvoient 8 vivres.')}if(id==='commerce'){fx({vivres:6,traque:-4,gardiens:-2,ami:6});pencher({c:3});log('Échange avec la côte : 6 vivres.')}
 if(id==='embuscade'){S.embus=t.i;S.evq.unshift('batE')}
 if(id==='examiner')ouvrirTrace(TRACES.find(x=>x.t===t));
 sauve();return true}
function ouvrirTrace(x){S.tr.push(x.id);S.evq.unshift('trace'+x.id);if(!S.done.pirates&&!S.chute&&[0,1,2].every(i=>S.tr.includes(i)))S.evq.splice(1,0,'pirates');if(S.tr.length===TRACES.length&&!S.leg)S.evq.push('comboH')}
function preparer(){if(S.bras<1||S.abri||!peut({bois:2,paille:2}))return;snap();paye({bois:2,paille:2});S.bras--;S.abri=1;fx({jardin:1});sauve()}
function silence(){if(!S.leg||S.cd>0)return;snap();S.sil=2;S.cd=Math.max(8,14-Math.floor((S.myst||0)/4));log('Le Silence : plus aucun feu, plus aucun bruit. Les chasseurs perdent la piste.');fx({anciens:3});S.det.forEach(d=>d.lost=1);sauve()}
function apprendre(id){const v=SAVOIRS[id];if(S.sv[id]||S.savoir<v.c||(v.bes&&!v.bes())||(v.req&&!S.sv[v.req])||(v.out&&!(S.out&&S.out[v.out]))||(v.camps&&camps().length<v.camps))return;snap();S.savoir-=v.c;S.sv[id]=1;(S.svAn=S.svAn||{})[id]=S.year;if(v.br==='Voies du corps'){S.myst=(S.myst||0)+1;const ev={bokator:'voieKhmer',muaythai:'voieKhmer',silat:'voieSilat',lethwei:'voieBirmane'}[id]||'voieTamoule';if(!S.done[ev]&&!S.evq.includes(ev))S.evq.push(ev)}if(id==='cartes'){fx({savoir:2});camps().forEach(k=>T.forEach(u=>{if(hd(u,k)<=3)tl(u.i).s=1}))}if(id==='fer')S.fu=(S.fu||0)+2;if(id==='elevage')S.bet=(S.bet||0)+2;log('Nouveau savoir : '+v.n+'.');sauve()}
function grandir(){const n=(S.year<1715?1:S.year<1735?2:3)+(voie().c>40?1:0)+(S.chute?1:0),mx=S.year<1700?350:S.year<1725?700:1050;
 for(let k=0;k<n;k++){const c=[];colTiles().forEach(t=>t.nb.forEach(i=>{const u=T[i],o=S.t[i];if(!(o&&(o.c||o.b==='camp'))&&u.alt<mx&&!c.includes(u))c.push(u)}));
  if(!c.length)return;c.sort((a,b)=>a.alt-b.alt);const u=c[Math.floor(rnd()*rnd()*c.length)],o=tl(u.i);
  if(o.b){log('La colonie avance : un '+(o.b==='guet'?'poste':'jardin')+' est perdu.');delete o.b}o.c=1;o.clr=1}}
const VILLES=[[1663,55.270,-21.010,'Saint-Paul'],[1667,55.609,-20.907,'Sainte-Suzanne'],[1669,55.450,-20.880,'Saint-Denis'],[1705,55.550,-20.897,'Sainte-Marie'],[1712,55.286,-21.170,'Saint-Leu'],[1718,55.650,-20.960,'Saint-André'],[1726,55.411,-21.286,'Saint-Louis'],[1730,55.713,-21.034,'Saint-Benoît'],[1735,55.478,-21.339,'Saint-Pierre']];
const VHIST={'Saint-Paul':'Premier établissement français, en 1663 : une poignée de colons et des Malgaches, du bétail et des jardins. Capitale jusqu’en 1738.',
 'Saint-Denis':'Fondé en 1669 par Étienne Regnault, premier gouverneur. Capitale de l’île à partir de 1738.',
 'Sainte-Suzanne':'Quartier du Nord-Est, sur les terres arrosées au vent. Fondé vers 1667 sous Étienne Regnault, autour du Quartier-Français, deux ans avant Saint-Denis.',
 'Sainte-Marie':'Quartier entre Saint-Denis et Sainte-Suzanne. Date approximative dans le jeu.',
 'Saint-Leu':'Côte sous le vent : le café y gagne les pentes au XVIIIe siècle. Date approximative dans le jeu.',
 'Saint-André':'Quartier de l’Est, ouvert par les défrichements du XVIIIe siècle. Date approximative dans le jeu.',
 'Saint-Louis':'Premier quartier du Sud, au débouché de la Rivière Saint-Étienne. Date approximative dans le jeu.',
 'Saint-Benoît':'Quartier de l’Est le plus arrosé, au pied des forêts. Date approximative dans le jeu.',
 'Saint-Pierre':'Fondé en 1735 sous La Bourdonnais, il ouvre le Sud aux concessions.'};
const villeDe=t=>{const v=VILLES.find(v=>near(v[1],v[2]).i===t.i&&S.towns.includes(v[3]));return v?v[3]:null};
const ERE=()=>S.year<1715?{n:'Le temps des premiers colons',d:'Peu de colons, du bétail, des jardins. Les colons chassent encore dans les Hauts.'}:S.year<1735?{n:'Le temps du café',d:'Les concessions montent sur les pentes, la traite s’accélère.'}:{n:'Le temps de La Bourdonnais',d:'Routes, magasins, canons : la colonie s’organise et les détachements montent plus vite.'};
function villeSuite(){const c=S.vc;if(!c||!c.def||(S.bats||[]).includes(c.i)||S.evq.includes('bat'))return;const o=tl(c.i);if(o.b){log('Repoussée, la colonie renonce à cette place : '+c.v+' s’installera plus loin.')}else{o.c=1;o.clr=1;log(c.v+' s’installe sur les ruines de votre camp.')}S.vc=null}
function villes(){villeSuite();VILLES.forEach(v=>{const t=near(v[1],v[2]),o=tl(t.i);if(!S.towns.includes(v[3])&&v[0]>S.year&&v[0]-S.year<=pasAn0()+1&&o.b&&!(S.villeAv||{})[v[3]]){(S.villeAv=S.villeAv||{})[v[3]]=1;log('Des colons arpentent votre '+(BAT[o.b]?BAT[o.b].n.toLowerCase():o.b==='camp'?'camp':'terrain')+' : ils vont y fonder '+v[3]+' bientôt.')}
 if(v[0]<=S.year&&!S.towns.includes(v[3])){S.towns.push(v[3]);o.c=1;o.clr=1;o.s=1;if(o.b){if(S.voieC&&o.b==='camp'){log(v[3]+' grandit autour de votre quartier.')}else{S.vc={v:v[3],i:t.i,b:o.b};o.c=0;if(!S.evq.includes('villeConf'))S.evq.push('villeConf')}}}})}
function cyclone(fr){const f=fr||S.cyc.f,cf=D().cyc*(S.abri?(S.sv.ciel?.35:.5):1)*Math.max(.4,1-nBat('abri')*.2)*Math.max(.6,1-(S.myst||0)*.02);let perdu=0;
 T.forEach(t=>{const o=S.t[t.i];if(!o)return;if((o.b==='jardin'&&rnd()<.3*f*cf*(foret()<55?1.4:1))){o.dmg=2;perdu++}if(o.b==='jf'&&rnd()<.06*f*cf){o.dmg=1}});
 const pv=Math.round(S.vivres*.2*f*cf*(nBat('grenier')?.7:1));S.vivres-=pv;fx({sante:-Math.round(5*f*cf),coh:-Math.round(2*f*cf)});
 log((fr?'Cyclone historique de '+S.year+', force ':'Cyclone de force ')+f+' : '+pv+' vivres perdus, '+perdu+' jardin'+(perdu>1?'s':'')+' à reprendre'+(S.abri?'. Les abris ont tenu':'')+'.');
 if(f>=2&&!S.famC&&S.year>=1680&&rnd()<.5){S.famC=2;S.evq.push('famineC')}S.abri=0;S.cyc={in:3+Math.floor(rnd()*3),f:1+Math.floor(rnd()*3)}}
function combat(c,d,force,plus){perdParc(c);const g=T.filter(t=>S.t[t.i]&&S.t[t.i].b==='guet'&&hd(t,c)<=3).length;
 const def=26+c.slope*.7+(S.sv.varmakalai?6:0)+(S.sv.silat?5:0)+(S.sv.lethwei?5:0)+(S.sv.silambam?6:0)+(S.sv.bokator?4:0)+(S.sv.muaythai?5:0)+(rot()==='travail'?(EXP()?-20:-12):rot()==='garde'?12:0)+(S.canons||0)*6+(S.roi==='dimitile'?8:0)+((S.spec||{})[c.i]==='guerre'?10:0)+(c.ilet?12:0)+g*14+Math.min(6,S.fu||0)*(2+arme().a/10)+(S.sv.pieges?18:0)+(defFac('gardiens')?10:0)+pistage()*4+((S.t[c.i].vl||[]).filter(v=>v.k==='palissade').length*12),atk=60+D().atk+arme().a+(plus||0)+Math.round((pression().k-1)*30);
 if(force!==undefined?force:def+rnd()*42>atk){S.det=S.det.filter(x=>x!==d);fx({gens:rnd()<.4?-1:0,gardiens:5,traque:-5});log('Un détachement attaque un camp et il est repoussé.');return}
 const nc=camps().length,per=Math.max(1,Math.ceil(S.gens/nc*.3));S.det=S.det.filter(x=>x!==d);delete tl(c.i).b;fx({gens:-per,coh:-10,anciens:-3,gardiens:-3});{const k=Math.ceil(per*.6);S.capt=(S.capt||0)+k;if(!S.evq.includes('captifs'))S.evq.push('captifs')}
 log('Un détachement détruit un camp. '+per+' personne'+(per>1?'s':'')+' tuée'+(per>1?'s':'')+' ou reprise'+(per>1?'s':'')+'.');
 if(!camps().length&&S.gens>0){const n=c.nb.map(i=>T[i]).filter(u=>!(S.t[u.i]&&S.t[u.i].c)&&!u.bare).sort((a,b)=>b.alt-a.alt)[0];if(n){const o=tl(n.i);o.b='camp';o.s=1;log('Les survivants relèvent un camp plus haut.')}else S.gens=0}}
const fa=k=>{S.fa=S.fa||{sol:S.sol??100,dodo:100,dro:100};return S.fa[k]},zDo=t=>t.z>xz(55.5,-21.15)[1],zDr=t=>t.z<xz(55.5,-21.06)[1];
const FAUNE={sol:{n:'solitaires',ev:'dernierSol',p:'parcSol'},dodo:{n:'dodos du Sud',ev:'dernierDodo',p:'parcDodo'},dro:{n:'drontes du Nord',ev:'dernierDro',p:'parcDro'}};
function perdParc(t){const o=S.t[t.i];if(!o||!o.vl)return;for(const k in FAUNE){const p=FAUNE[k].p,n=o.vl.length;o.vl=o.vl.filter(v=>v.k!==p);if(o.vl.length<n){log('Les colons ont tué les '+FAUNE[k].n+' du parc.');if(fa(k)<=0&&!nBat(p)&&!S.done[FAUNE[k].ev])S.evq.push(FAUNE[k].ev)}}}
function faune(){fa('sol');const ch=T.filter(t=>S.t[t.i]&&S.t[t.i].b==='chasse'),p=t=>1+((S.t[t.i].sur||0)>4?1:0);
 const pr={sol:1.2+(S.year>=1690?1.5:0)+ch.reduce((s,t)=>s+p(t)*1.8,0),dodo:.6+ch.filter(zDo).reduce((s,t)=>s+p(t)*2.4,0),dro:.6+ch.filter(zDr).reduce((s,t)=>s+p(t)*2.4,0)};
 if(!S.famC&&S.year>=1680&&(rnd()<.035||(S.year>=1784&&Object.values(S.fa).some(v=>v>0)))){S.famC=2;S.evq.push('famineC')}
 if(S.famC>0){S.famC--;for(const k in pr)pr[k]+=45;fx({traque:4});log('Famine à la colonie : les chasseurs colons tuent tout ce qui bouge dans les bois.')}
 for(const k in pr){if(S.fa[k]<=0)continue;S.fa[k]-=pr[k];if(S.fa[k]<=30&&!(S.faA||{})[k]){(S.faA=S.faA||{})[k]=1;log('Les '+FAUNE[k].n+' se font rares.')}
  if(S.fa[k]<=0){S.fa[k]=0;if(nBat(FAUNE[k].p)){S.sauve=S.sauve||{};S.sauve[k]=1;S.evq.push(k==='sol'?'solSauve':k==='dodo'?'dodoSauve':'droSauve')}else S.evq.push(FAUNE[k].ev)}}
 S.sol=S.fa.sol}
function navires(){if(S.year<1665||rnd()>.1+(S.year-1663)/350)return;
 if(rnd()<.6){const src=S.year<1700?['Madagascar','l’Inde']:['Madagascar','le Mozambique','l’Inde','l’Afrique de l’Ouest'],f=src[Math.floor(rnd()*src.length)],n=S.year<1700?20+Math.floor(rnd()*40):60+Math.floor(rnd()*160);
  pencher({e:2});let m='Un navire négrier venu de '+f+' débarque '+n+' captifs à Saint-Paul. La part de l’esclavage grandit.';
  if(rnd()<.35){const k=1+Math.floor(rnd()*2);fx({gens:k,traque:2});m+=' '+k+' d’entre eux s’échappent et vous rejoignent.'}log(m)}
 else{pencher({c:2});log('Un navire amène de nouveaux colons. Les concessions gagnent sur les pentes.')}}
function prises(){let n=0;(S.det||[]).forEach(d=>{const t=T[d.i];if(!t)return;T.filter(u=>S.t[u.i]&&['chasse','cueil','jardin','jf'].includes(S.t[u.i].b)&&hd(u,t)<=1).forEach(u=>{if(rnd()<.28&&S.gens>1){n++;fx({gens:-1})}})});
 if(n){S.capt=(S.capt||0)+n;log('Des traqueurs ont capturé '+n+' marron'+(n>1?'s':'')+' sur les lieux de travail.');if(!S.evq.includes('captifs'))S.evq.push('captifs')}}
const ROIS={laverdure:{n:'Laverdure',v:1,d:'« Roi de tous les marrons », marié à Sarlave. Cohésion +1 par saison.',h:'Attesté par les archives : il meurt en décembre 1752 lors de la prise des camps de l’îlette.',mort:1752},
 dimitile:{n:'Dimitile',v:1,d:'Capitaine d’une troupe de 24 marrons. Défense des camps +8.',h:'Attesté : en 1743, son influence s’étend des hauts de Saint-Paul à ceux de Saint-Pierre. La tradition dit qu’il ne fut jamais pris ; le plateau du Dimitile porte son nom.',fin:1765},
 mafate:{n:'Mafate',v:1,d:'Guérisseur malgache. Santé +1 par saison.',h:'Attesté : Mussard le surprend vers 1751.',mort:1751},
 anchaing:{n:'Anchaing',v:1,d:'Le solitaire du Piton des Salazes, avec Héva. Traces des camps -15 %.',h:'Certains auteurs rapportent un esclave de ce nom au recensement de 1751 à Sainte-Suzanne (non vérifié ici). Le reste vient surtout de la tradition.',fin:1770},
 baal:{n:'Baal',v:0,d:'Premier grand roi africain, capitale à Cilaos. Mystique +1 par saison, cultes séparés pour Malgaches et Africains.',h:'Tradition rapportée par Eugène Dayot (Bourbon pittoresque). Baal punit de mort trahison et désertion ; condamner un chef demande les deux tiers des voix.',fin:1780},
 vous:{n:'Vous-même',v:0,d:'Les chefs vous élisent grand roi : cohésion +1 et mystique +1 par saison, mais la colonie veut votre tête (traque +2 par saison).',h:'Fiction du jeu : les rois marrons connus (Laverdure, Dimitile, Mafate) sortaient des camps eux-mêmes.'},
 fatie:{n:'Fatie',v:0,d:'Le « roi des Nuages » du Piton des Neiges, messager. Les sentiers d’exploration vont une case plus loin.',h:'Tradition rapportée par Eugène Dayot.',fin:1780}};
const roi=()=>S.roi&&ROIS[S.roi];
const CHEF={chasse:{n:'Chasseurs',d:'Chasse +30 % autour du camp'},jardin:{n:'Jardiniers',d:'Jardins +25 % autour du camp'},guerre:{n:'Guerriers',d:'Défense du camp +10'},soin:{n:'Guérisseurs',d:'Santé +0,5 par saison'},eclair:{n:'Éclaireurs',d:'Traces du camp -20 %'}};
const specPres=(t,k)=>camps().some(c=>hd(c,t)<=2&&(S.spec||{})[c.i]===k);
function rois(){if(S.voieC){if(!S.roiH&&S.year>=1725&&(S.ins||0)>35&&rnd()<.12){const L=['laverdure','dimitile','mafate','anchaing'].filter(k=>!(ROIS[k].mort&&S.year>=ROIS[k].mort));if(L.length){S.roiH=L[Math.floor(rnd()*L.length)];log('On murmure dans les cases qu’un roi marron règne dans les Hauts : '+ROIS[S.roiH].n+'.')}}if(S.roiH&&ROIS[S.roiH].mort&&S.year>=ROIS[S.roiH].mort){log('La milice annonce la mort de '+ROIS[S.roiH].n+'. Les Hauts se taisent un temps.');S.ins=Math.max(0,(S.ins||0)-15);S.roiH=null}return}if(!S.roi&&!S.evq.includes('election')&&!S.evq.includes('conseil255')&&camps().length>=3){if(S.year>=1725&&S.year<=1765)S.evq.push('election');else if(S.year>1765&&!S.done.conseil255)S.evq.push('conseil255')}
 const r=roi();if(!r)return;if(r.mort&&S.year>=r.mort&&!S.done['mort_'+S.roi]){S.done['mort_'+S.roi]=1;S.evq.push('mortRoi')}
 fx({coh:S.roi==='laverdure'?1:0,sante:(S.roi==='mafate'?1:0)+Object.values(S.spec||{}).filter(v=>v==='soin').length*.5});if(S.roi==='baal'||S.roi==='vous')S.myst=(S.myst||0)+1;if(S.roi==='vous'){fx({coh:1,traque:2})}}
// Urgences : les chefs engagent des bras d'office, en gardant toujours 1 bras libre
const campV=()=>({histoire:20,normal:20,expert:20})[(S&&S.dif)||'normal'];
function urgences(){if((S.dif||'normal')==='expert')return;const fait=[],sp=S.santeP??S.sante;S.santeP=S.sante;
 const essai=(t,id)=>{const a=t&&actions(t).find(x=>x.id===id);if(!a||S.bras-a.c<1||!peut(a.r))return false;return agir(t,id)};
 const avec=(id,f)=>T.filter(u=>actions(u).some(x=>x.id===id)&&f(u));
 if(S.bras>1&&S.traque>60){const c=camps().sort((p,q)=>trace(q)-trace(p))[0],t=c&&avec('guet',u=>hd(u,c)<=2).sort((p,q)=>q.alt-p.alt)[0];if(essai(t,'guet'))fait.push('un poste de guet, car la traque est trop forte')}
 const un=()=>S.dif==='normal'&&fait.length>0;
 if(!un()&&S.bras>1&&(S.sante<40||sp-S.sante>=8)){const t=avec('cueil',inCamp).sort((p,q)=>cueilV(q)-cueilV(p))[0];if(essai(t,'cueil'))fait.push('une cueillette de plantes, car la santé chute')}
 if(!un()&&S.bras>1&&S.gens>cap()){const t=avec('camp',()=>true).sort((p,q)=>(q.alt+q.slope*20+(q.ilet?800:0))-(p.alt+p.slope*20+(p.ilet?800:0)))[0];if(S.vivres>=campV()&&essai(t,'camp'))fait.push('un nouveau camp, car le camp déborde');
  else{const u=avec('chasse',inCamp).sort((p,q)=>chasseV(q)-chasseV(p))[0];if(essai(u,'chasse'))fait.push('une chasse, car il y a trop de bouches à nourrir')}}
 if(fait.length)log('Les chefs décident d’office : '+fait.join(', ')+'. Un bras reste toujours libre.')}
// Comptoirs marrons et réseau pirate : voiles à l'horizon, combats navals
const NATS={anglais:'anglais',francais:'français',hollandais:'hollandais',portugais:'portugais'};
const guerre=()=>(S.year>=1744&&S.year<=1748)||(S.year>=1756&&S.year<=1763);
// Libertalia (mythe) : république pirate libératrice au nord de Madagascar, face aux royautés esclavagistes
// Pression de l'histoire : le vrai passé avance quoi qu'on fasse, et la colonie réagit à votre puissance
const HIST=[[1663,.5,'Une poignée de colons'],[1690,.75,'La colonie s’installe'],[1715,1,'Le café et la traite'],[1729,1.15,'Primes sur les marrons'],[1735,1.25,'La Bourdonnais organise l’île'],[1742,1.4,'Les grands détachements'],[1760,1.2,'La fin des grandes chasses'],[1793,1,'La Révolution'],[1810,1.1,'Les Anglais'],[1815,1.2,'Le temps du sucre'],[1848,.5,'Abolition et engagisme'],[1870,.45,'La crise sucrière'],[1946,.3,'Le département'],[1980,.25,'L’île d’aujourd’hui']];
const puiss=()=>{let p=0;for(const k in S.sv)if(SAVOIRS[k]||COMBOS[k])p+=1+Math.max(0,maitrise(k))*.5;return p+(S.myst||0)/4+camps().length*1.5+S.gens/10};
const attendu=()=>4+(Math.min(S.year,1760)-1663)/5+Math.max(0,S.year-1760)/12;
// trajectoire réelle de la société (marronnage, colonial, esclavage) et écart du joueur
const VRAI=[[1663,100,0,0],[1700,70,20,10],[1720,45,30,25],[1752,25,35,40],[1793,15,40,45],[1847,8,40,52],[1848,8,80,12],[1900,6,92,2],[2026,5,95,0]];
function vraieVoie(){let a=VRAI[0],z=VRAI[VRAI.length-1];for(let i=0;i<VRAI.length-1;i++)if(S.year>=VRAI[i][0]&&S.year<=VRAI[i+1][0]){a=VRAI[i];z=VRAI[i+1];break}const f=z[0]===a[0]?1:Math.min(1,(S.year-a[0])/(z[0]-a[0]));const r={m:a[1]+(z[1]-a[1])*f,c:a[2]+(z[2]-a[2])*f,e:a[3]+(z[3]-a[3])*f};if(S.voieC){const mm=Math.min(r.m,8);r.c+=r.m-mm;r.m=mm}return r}
const ecart=()=>{const p=voie(),v=vraieVoie();return Math.min(1,(Math.abs(p.m-v.m)+Math.abs(p.c-v.c)+Math.abs(p.e-v.e))/200)};
function pression(){const h=HIST.filter(x=>x[0]<=S.year).pop(),ex=Math.max(0,puiss()-attendu()),r=1+ex*.04,dv=1+ecart()*.7,t=Math.min(1.6,r*dv);const col=S.voieC?stadeFac()>=1:stadeFac()===2;return {h:h[1],n:h[2]+tournure(),r,dv,ec:ecart(),k:t,t:h[1]*t*(col?.35:1)}}
// l'histoire réagit à vos choix : la colonie répond à l'écart
function tournure(){const p=voie(),v=vraieVoie();if(S.voieC)return ' — histoire coloniale';if(stadeFac()===2)return ' — vos camps ont rejoint la colonie';if(p.m-v.m>15)return ' — la colonie durcit la traque';if(p.c-v.c>15)return ' — vos camps traitent avec la colonie';if(p.e-v.e>15)return ' — l’esclavage gagne vos camps';if(v.m-p.m>15)return ' — le marronnage s’essouffle';return ''}
// le conte choisit l'option qui ramène vers l'histoire réelle
function choixConte(e,id){if(id==='debutC')return 0;const v=vraieVoie(),O=id?optsDe(id,e):e.o;let best=Math.min(e.hist||0,O.length-1),bs=1e9;O.forEach((o,k)=>{const q={...(S.vo||{m:40,c:0,e:0})};if(o.vo)for(const x in o.vo)q[x]=Math.max(0,q[x]+o.vo[x]);const s=q.m+q.c+q.e||1,d=Math.abs(q.m*100/s-v.m)+Math.abs(q.c*100/s-v.c)+Math.abs(q.e*100/s-v.e)-((k===(e.hist||0)||o.hist)?10:0);if(d<bs){bs=d;best=k}});return best}
// évolution des camps : mystique, comptoirs, temples
const STADES=[['Campement de fuite',''],['Camp établi','Les cases tiennent, le camp a un nom.'],['Camp-relais du réseau','Un comptoir le relie aux pirates : +1 vivre par saison.'],['Haut lieu sacré','Mystique et sanctuaires : +1 mystique par saison.'],['Sanctuaire du temple','Le temple rassemble les camps : +1 mystique, +1 cohésion.'],['Cité marronne','Temple, comptoir et mystique : la légende d’un royaume. +1 de chaque.']];
function stade(t){const o=S.t[t.i]||{},vl=(o.vl||[]).map(v=>v.k),tp=vl.includes('temple'),sa=tp||vl.includes('autel'),cp=Object.keys(S.out||{}).some(k=>S.out[k]),my=(S.myst||0)>=15;if(tp&&cp&&my)return 5;if(tp)return 4;if(sa&&my)return 3;if(cp)return 2;if(vl.length>=2)return 1;return 0}
function evoluer(){S.stg=S.stg||{};for(const t of camps()){const n=stade(t),a=S.stg[t.i]||0;if(n>a){S.stg[t.i]=n;log(nomV(S.t[t.i])+' devient : '+STADES[n][0]+'. '+STADES[n][1])}const s=S.stg[t.i]||0;if(s===2)fx({vivres:1});if(s===3)fx({myst:1});if(s===4)fx({myst:1,coh:1});if(s===5)fx({myst:1,coh:1,vivres:1})}}
// Les savoirs mûrissent avec les années et se combinent
const NIV=['Apprenti','Confirmé','Maître','Ancien'];
const maitrise=id=>S.sv[id]?Math.min(3,Math.floor((S.year-((S.svAn||{})[id]??1663))/20)):-1,tot=(id,y)=>!!S.sv[id]&&((S.svAn||{})[id]??1663)<=y;
const COMBOS={cuisineC:{n:'Cuisine créole',d:'Cari, massalé, samoussas, bouchons et vanille dans la même marmite : +3 vivres et +1 cohésion par saison.',si:()=>['cari','massale','samoussa','bouchon','vanille'].filter(k=>S.sv[k]).length>=4,ind:'Quatre cuisines venues de quatre rivages…'},
 pharma:{n:'Pharmacopée créole',d:'Les tisanes des Hauts mêlées à la médecine siddha : santé +1 par saison.',si:()=>maitrise('tisanes')>=1&&S.sv.siddha,ind:'Des tisanes confirmées, et un savoir venu de la côte tamoule…'},
 jardinsC:{n:'Jardins créoles',d:'Songes, maïs, brèdes et arbres mêlés sur les terrasses : chaque jardin donne 1 vivre de plus.',si:()=>tot('songes',1690)&&S.sv.terrasses,ind:'Des songes plantés très tôt, avant 1690, puis des terrasses…'},
 ruses:{n:'Ruses du bois',d:'Pièges et guetteurs travaillent ensemble : traces des camps -10 %.',si:()=>maitrise('pieges')>=1&&S.sv.guetteurs,ind:'Des pièges éprouvés et un réseau de guetteurs…'}};
function murir(){S.svM=S.svM||{};let lv=0;for(const k in S.sv){const m=maitrise(k);if(m<0||!SAVOIRS[k])continue;lv+=m;if(m>(S.svM[k]||0)){S.svM[k]=m;if(m>=2){S.myst=(S.myst||0)+1;log(SAVOIRS[k].n+' : vos gens en sont maintenant '+NIV[m].toLowerCase()+'s. Mystique +1.')}}}
 S.savoir+=Math.min(3,Math.floor(lv/6));for(const k in COMBOS)if(!S.sv[k]&&COMBOS[k].si()){S.sv[k]=1;(S.svAn=S.svAn||{})[k]=S.year;S.evq.push('combo');S.comboN=k;log('Savoir acquis : '+COMBOS[k].n+'.')}}
function libertalia(){if(!S.pir||S.chute)return;if(S.lib===undefined)S.lib=50;if(S.dec&&!S.dec.comores){S.dec.comores=1;log('Les frères de Libertalia parlent des Comores : une nouvelle route s’ouvre.')}
 if(rnd()<.3+S.lib/300){const n=5+Math.floor(rnd()*11);pencher({e:-1,m:1});let m='Les frères de Libertalia prennent un négrier au large des Comores et libèrent '+n+' captifs.';if(rnd()<.3){const k=1+Math.floor(rnd()*2);fx({gens:k,traque:1});m+=' '+k+' d’entre eux montent vous rejoindre.'}log(m)}
 S.lib-=(guerre()?6:3)*rnd()+(S.year>1715?2:0);if(S.year<1720&&!S.done.libCharte&&!S.evq.includes('libCharte'))S.evq.push('libCharte');
 if(S.lib<=0){S.lib=0;S.pir=false;S.chute=1;S.evq.push('libTombe')}}
function voiles(){const O=S.out||{};if((O.inde||O.indo)&&S.dec&&!S.dec.birm){S.dec.birm=1;S.dec.insul=1;log('Vos marins parlent de nouvelles routes : la Birmanie et l’Insulinde.')}
 if(!(S.pir||O.mada||O.indo||O.birm||O.insul)||S.evq.includes('voile')||rnd()>.2)return;
 const L=guerre()?['anglais','anglais','francais','francais','hollandais']:['anglais','francais','hollandais','portugais'],nat=L[Math.floor(rnd()*L.length)];
 const r=rnd(),type=r<(guerre()?.35:.2)?'fregate':r<.62?'marchand':'negrier';S.voile={nat,type,cap:type==='negrier'?4+Math.floor(rnd()*8):0};S.evq.push('voile')}
function relNav(nat,v){S.nav=S.nav||{francais:0,anglais:0};if(nat==='anglais'){S.nav.anglais-=v;S.nav.francais+=v*.55}else if(nat==='francais'){S.nav.francais-=v;S.nav.anglais+=v*.55}
 const q=k=>{if(!S.done[k]&&!S.evq.includes(k))S.evq.push(k)};if(S.nav.francais>=20)q('marqueFr');if(S.nav.anglais>=20)q('marqueEn');if(S.nav.francais<=-25)q('chasseFr')}
function siege(){if((S.dif||'normal')!=='expert'||S.year<1745||S.year>=abolY())return;
 camps().forEach(t=>{const o=S.t[t.i];if(o.sg){o.sg--;fx({vivres:-3,sante:-3,coh:-2});if(o.sg<=0){delete o.sg;log('La colonie donne l’assaut au camp assiégé.');combat(t,{},undefined,30)}else log('Le camp '+(lieuProche(t)||'des Hauts')+' est assiégé : encore '+o.sg+' saison'+(o.sg>1?'s':'')+' avant l’assaut. Levez le camp.');return}
  if((o.age||0)>=10&&rnd()<.35+(o.age-10)*.05){o.sg=2;perdParc(t);S.evq.push('siege');log('La colonie encercle le camp '+(lieuProche(t)||'des Hauts')+'.')}})}
function pousser(){const c=camps();if(!c.length)return;if((S.fige||0)>0){S.fige--;return}
 S.det.slice().forEach(d=>{const t=T[d.i];if(S.sv.leurres&&!d.lost&&rnd()<.2){d.lost=1;log('Un détachement suit une fausse piste.')}
  if(S.sil>0||d.lost){const back=t.nb.map(i=>T[i]).sort((a,b)=>a.alt-b.alt)[0];d.i=back.i;if(rnd()<.45||tl(d.i).c)S.det=S.det.filter(x=>x!==d);if(S.sil<=0)d.lost=0;return}
  let cur=t;const tg=c.slice().sort((a,b)=>hd(a,cur)-hd(b,cur)||trace(b)-trace(a))[0];let mv=2;
  while(mv>0){const nx=cur.nb.map(i=>T[i]).sort((a,b)=>hd(a,tg)-hd(b,tg))[0];if(!nx)break;mv-=nx.slope>38?2:1;cur=nx;if(cur===tg)break}
  d.i=cur.i;const hit=c.find(x=>x===cur);if(hit){S.det=S.det.filter(x=>x!==d);(S.bats=S.bats||[]).push(hit.i);S.evq.push('bat')}});
 const seuil=S.year>=1742?.75:S.year>=1725?.55:.35;
 if(S.pours>0){S.pours--;if(S.year<abolY()&&!S.det.some(d=>d.pours)&&rnd()<.6){S.traque=Math.min(100,(S.traque||0)+3);log('La poursuite continue : des chasseurs cherchent les fugitifs autour de vos camps.')}}
 if(S.year>=1690&&S.year<abolY()&&S.sil<=0&&S.det.length<(S.year>=1742?4:S.year>=1715?2:1)&&rnd()<S.traque/100*seuil*D().det*pression().t*(1+arme().s*.12)*(1+Math.max(0,camps().length-2)*(.25))*(1-voie().c/130)*(S.year>=1715?((S.ami??20)>=50?.25:(S.ami??20)<30?1.4:1):1)){
  const tg=c.slice().sort((a,b)=>trace(b)-trace(a))[0],src=colTiles().sort((a,b)=>hd(a,tg)-hd(b,tg))[0];if(src){S.det.push({i:src.i});fx({traque:-14});log('Un détachement quitte '+(lieuDe(src)||'la côte')+' et monte vers vos camps.')}}}
function fin(type){S.fin=type;sauve();ecranFin()}
const score=()=>Math.round(S.gens*3+camps().length*6+foret()*.8+S.coh*.4+(S.leg?25:0)+Object.keys(S.sv).length*3);
function saison(){if(S.evq.length||S.fin)return;prevS=JSON.stringify(S);pile=[];
 let v=0;const c=camps();c.forEach(t=>{v+=2*t.yield;if(t.cold){v-=1}});
 T.forEach(t=>{const o=S.t[t.i];if(!o||!o.b)return;if(o.dmg){return}if(o.b==='chasse'){v+=chasseV(t);S.pist=(S.pist||0)+.25;o.sur=(o.sur||0)+1;if(o.sur===6)log('Le gibier s’épuise '+(lieuProche(t)||'dans une zone de chasse')+'.')}if(o.b==='peche'){const emb=t.riv&&t.alt<80&&t.nb.some(i=>T[i].alt<=1||T[i].nb.length<6);const st=(S.bich??100)/100;v+=emb?(o.vouve?(pluie()?2+4*st:1):2):2;if(emb&&o.vouve&&pluie())S.bich=Math.max(0,(S.bich??100)-3)}if(o.b==='cabot'){v+=1+2*((S.bich??100)/100)}if(o.b==='tunnel'){S.sante=clamp(S.sante+2);S.traque=Math.max(0,(S.traque||0)-1)}if(o.b==='peche'&&rnd()<.15){const r=rnd();if(t.cirq&&S.year>=1950&&r<.3){v+=2;log('Une truite dans la mare du cirque : elle vient d’Europe, mise à l’eau pour la pêche au XXᵉ siècle.')}else if(r<.55){v+=1;log('Sous les galets, les camarons et les chevrettes remontent la rivière.')}else if(r<.8){v+=2;log('Une anguille énorme sort d’un trou de la rivière : elle est descendue pondre en mer, puis remontée des années plus tard.')}else{v+=1;log('Les cabots s’accrochent aux roches du courant : ils sont montés de la mer, bichiques devenus grands.')}}
 if(o.b==='pecheM'&&rnd()<.18){const r=rnd();if(r<.4){fx({myst:1});log('Des dauphins longent la pirogue. Les pêcheurs les appellent « marsouins ».')}else if(r<.6&&S.year>1680){v+=5;log('Un espadon se débat au bout de la ligne : de quoi nourrir '+(S.voieC?'l’habitation':'le camp')+'.')}else if(r<.72){if(rnd()<.35&&S.gens>3){fx({gens:-1});log('Un requin a pris un pêcheur dans les vagues.')}else{fx({sante:-2});log('Un requin rôde : un pêcheur revient blessé.')}}else{v+=2;log('Les bancs de poissons remontent vers l’embouchure.')}}
 if(o.b==='pecheM'){v+=3;if(!S.voieC)S.traque=Math.min(100,(S.traque||0)+1.5);S.bich=Math.max(0,(S.bich??100)-8)}if(o.b==='cueil'){v+=cueilV(t);S.sante=clamp(S.sante+(volc(t)?1.5:.4))}if(o.b==='jardin')v+=jv(t,o,5);if(o.b==='jf')v+=jv(t,o,4)});
 const pv_=voie();if(S.voieC)v+=S.gens*(S.year<1815?.62:.7)*(.8+(S.ami||0)/250);v+=(S.sv.liens?Math.max(0,camps().length-1):0)+(nBat('parcSol')+nBat('parcDodo')+nBat('parcDro'))*2+pv_.c*.06+pv_.e*.12+(S.bet||0)*(nBat('enclos')?1.5:1.1)*(mafE()?1.3:1)*(S.sv.elevage?1.25:1)+(S.sv.epices&&S.out?Object.keys(S.out).length*2:0);if(defFac('jardin'))v*=1.1;T.forEach(t=>{const o=S.t[t.i];if(o&&o.dmg)o.dmg--;if(o&&o.reg){o.reg--;if(!o.reg)delete o.clr}});
 S.vivres+=v-((typeof modeHist==='function'&&typeof grpOn==='function'&&grpOn()&&!modeHist())?0:1)*S.gens*D().conso*(S.sv.reserves?.85:1)*(rot()==='travail'?1.1:1);// en Jeu, on mange chaque jour (faimJour)
 if(S.vivres>40&&!S.sv.kitoza)S.vivres-=(S.vivres-40)*.08*Math.min(1,(S.ts??1)*2);
 let faim=S.vivres<0;if(faim){S.vivres=0;fx({sante:-6,coh:-5,jardin:-2});log('La faim gagne les camps.')}
 S.vivres=Math.min(70+nBat('grenier')*30,S.vivres);if(nBat('atelier')&&((S.ns||0)*2)%12===0){S.fu=(S.fu||0)+nBat('atelier');log('La forge produit un fusil.')}
 const crowd=S.gens>cap();const froid=c.filter(t=>t.cold).length;
 if(nBat('kabare')&&((S.ns||0)*2)%6===0)S.myst=(S.myst||0)+1;{const cu=['cari','samoussa','bouchon'].filter(k=>S.sv[k]).length+(S.sv.massale&&S.sv.cari?1:0)+(S.sv.vanille&&S.out&&Object.keys(S.out).some(k=>S.out[k])?2:0)+(S.sv.vergers?2:0)+(S.sv.cuisineC?3:0);if(cu)S.vivres+=cu;if(S.sv.massale||S.sv.zerbaz)fx({sante:(S.sv.massale?.5:0)+(S.sv.zerbaz?1:0)});if(S.sv.cuisineC||S.sv.vanille)fx({coh:(S.sv.cuisineC?1:0)+(S.sv.vanille?1:0)})}
 // plantes envahissantes et pollution, à partir du XIXᵉ siècle
 S.bich=Math.min(100,(S.bich??100)+4);
 if(S.year>=1850){S.inv=Math.min(100,(S.inv||0)+(S.year<1946?1.2:1.8)-(S.sv.envahis?3.5:0));if(S.inv<0)S.inv=0;if(S.inv>15&&pluie())S.vivres+=Math.min(4,S.inv/12)}
 {const usines=GRANDS.filter(g=>g[0]<=S.year&&g[3]==='gUsine').length;if(S.year>=1815){S.pol=Math.max(0,Math.min(100,(S.pol||0)*.97+usines*.2+(S.year>=1882?.25:0)+(S.year>=1946?.8:0)+(S.year>=1890?.2:0)-(S.sv.proprete?2:0)));if(S.pol>35)fx({sante:-Math.min(1.5,(S.pol-35)/25)})}}if(S.chienM&&!S.voieC){S.traque=Math.max(0,(S.traque||0)-.6)}if(!S.voieC&&!S.chienM&&S.year>1720&&rnd()<.015){S.chienM=1;log('Un chien errant, échappé d’une habitation, suit vos chasseurs jusqu’au camp et reste.')}syncPP();ppSaison();ppUnions();ppSecteurs();if(S.pp){const dy=Math.max(1,S.year-(S.ppY||S.year-2));S.ppY=S.year;const vx=S.pp.filter(p=>{const g=ageP(p);if(g<55)return false;const q=Math.min(.6,.012+(g-55)*.006+(g>85?.15:0));return rnd()<1-Math.pow(1-q,dy)});vx.forEach(p=>{S.pp.splice(S.pp.indexOf(p),1);S.gens=Math.max(0,S.gens-1);(S.morts=S.morts||[]).push({n:p.n,a:S.year,age:ageP(p)});log(p.n+' s’éteint à '+ageP(p)+' ans. '+(p.sk.mys>=6?'Avec '+(p.g==='f'?'elle':'lui')+' part une part de la mémoire.':''))})}if(S.voieC){const hc=camps().filter(t=>t.alt>900).length;if(hc){fx({sante:-1.5*hc});if(rnd()<.25)log(['Le froid et l’humidité des Hauts rendent malades les gens de l’habitation.','Les fièvres et les toux gagnent le quartier des Hauts : aucun rite ne les protège.'][Math.floor(rnd()*2)])}if(nBat('etable')){fx({vivres:2*nBat('etable')});if((S.bet||0)<8*nBat('etable'))S.bet=(S.bet||0)+1;S.inv=Math.min(100,(S.inv||0)+.4*nBat('etable'))}if(S.allFam)fx({ami:.5});if(S.sold>0)S.sold--;if(S.sentE){fx({vivres:S.sentE,ami:S.sentE*.5})}if(nBat('maisonVille'))fx({ami:1,coh:1})}if(lent())rencontresMer();voiesSaison();if(typeof cpSaison==='function')cpSaison();if(typeof svrSaison==='function')svrSaison();if(typeof eveilSaison==='function')eveilSaison();if(typeof imagSaison==='function')imagSaison();if(typeof mystCSaison==='function')mystCSaison();if(typeof grpSaison==='function')grpSaison();if(typeof campQualSaison==='function')campQualSaison();if(typeof lnoirInit==='function')lnoirInit();if(typeof questRelSaison==='function')questRelSaison();if(typeof ameriqueSaison==='function')ameriqueSaison();if(typeof abriSaison==='function')abriSaison();if(typeof trpSaison==='function')trpSaison();if(typeof fin46==='function')fin46();if(S.pi&&esoP()){if(!S.done.esoP){S.done.esoP=1;log('Les anciens savent maintenant lire les pierres : la zéolithe, la labradorite et l’améthyste nourrissent la foi.')}if(S.pi.zeo)S.myst=(S.myst||0)+Math.min(1,S.pi.zeo*.3);if(S.pi.lab||S.pi.ame)fx({coh:.3})}if(S.out&&S.out.mada&&!(S.pi&&S.pi.ame)&&rnd()<.04){S.pi=S.pi||{};S.pi.ame=1;fx({myst:2});log('Un boutre venu de Madagascar apporte une améthyste violette. On la garde près de l’autel.')}if(S.sv.sega){fx({coh:1});if(((S.ns||0)*2)%6===0)S.myst=(S.myst||0)+1}
 fx({coh:nBat('kabare')+nBat('chapelle'),sante:nBat('temple'),gardiens:nBat('autel')});
 const nz=T.filter(t=>S.t[t.i]&&S.t[t.i].zx).length;
 fx({sante:.5+(S.sv.siddha?1:0)+Math.min(2,nz*.5)+nBat('tisane')-pv_.e*.03+(S.sv.tisanes?1:0)+(S.leg?1:0)-froid-(crowd?2:0),coh:-pv_.e*.03+(S.sv.memoire?1:0)+(crowd&&!S.sv.malades?-2:0)+(S.sv.varmam?.5:0)+(S.sv.pharma?1:0)+(rot()==='travail'?(EXP()?-3:-1.5):rot()==='garde'?1:0)+(S.sv.herbes?Math.min(2,S.gens/40):0)+((S.fac.anciens+S.fac.gardiens+S.fac.jardin)/3<40?-2:0)+.5});
 if(S.sante<25&&rnd()<.5){fx({gens:-1});log('Une personne meurt de maladie.')}
 if(!faim&&S.gens<cap()){S.acc+=S.gens*.022*(S.sante/70);while(S.acc>=1){S.acc--;S.gens++}}
 if(S.voieC){if(S.year>=1665&&S.gens<cap()&&rnd()<.2+(S.year-1665)/260){const n=1+(rnd()<.3?1:0);fx({gens:n});log(S.year<abolY()?'Un navire de la Compagnie débarque '+n+' nouveaux arrivants à la colonie.':n+' nouvel'+(n>1?'les familles s’installent':'le famille s’installe')+' dans les quartiers.')}}else if(S.year>=1690&&S.gens<cap()&&rnd()<.16+(S.year-1690)/240){const n=1;fx({gens:n});log(n+(n>1?' fugitifs rejoignent':' fugitif rejoint')+' les Hauts.')}
 if(S.pir&&((S.ns||0)*2)%10===0&&S.gens<cap()+4){fx({gens:2,vivres:4});log('Un navire du nord de Madagascar dépose 2 personnes libérées et des vivres.')}
 if(S.out&&((S.ns||0)*2)%8===0){const n=Object.keys(S.out).length;if(n){fx({gens:Math.min(2,n),vivres:n*3,savoir:n});log('Vos liens outre-mer envoient des personnes, des vivres et des savoirs.')}}
 {const k=Math.min(1,S.ts??1);S.acS=(S.acS||0)+(1+(defFac('anciens')?1:0)+(S.gens>25?1:0)+D().sav)*k;S.acM=(S.acM||0)+D().mys*k;const a=Math.floor(S.acS),b=Math.floor(S.acM*2)/2;S.savoir+=a;S.acS-=a;S.myst=(S.myst||0)+b;S.acM-=b}
 camps().forEach(t=>{const o=S.t[t.i];o.age=(o.age||0)+1;const e=etape(o);if(e>(o.et||0)){o.et=e;log('Le '+(e===1?'campement':'village')+' '+(lieuProche(t)||'des Hauts')+' devient '+(e===1?'un village':'un bourg')+'.')}});
 grandir();
 if(S.er>0)S.er--;else if(rnd()<.07){S.er=2;log('La Fournaise entre en éruption.')}

 S.batt=S.batt||[];if(S.voieC)S.batt=[];S.batt.forEach(bt=>{bt.age++;const cib=T.filter(u=>{const o=S.t[u.i];return o&&(o.b==='chasse'||o.b==='cueil')}).sort((p,q)=>hd(p,T[bt.i])-hd(q,T[bt.i]))[0];if(cib){let cur=T[bt.i];for(let s=0;s<2;s++){const n=cur.nb.map(i=>T[i]).sort((p,q)=>hd(p,cib)-hd(q,cib))[0];if(n&&hd(n,cib)<hd(cur,cib))cur=n}bt.i=cur.i;if(hd(cur,cib)<=1){const o=S.t[cib.i];o.sur=(o.sur||0)+2;fx({traque:3});if(vu(cur))log('Des colons chassent sur votre terrain '+(lieuProche(cib)||'')+' : le gibier fuit.')}}});
 S.batt=S.batt.filter(bt=>bt.age<4);
 if(S.year>=1690&&(S.nEx||0)>=3&&S.batt.length<2&&rnd()<.3){const src=colTiles().sort((p,q)=>p.alt-q.alt)[Math.floor(rnd()*Math.min(4,colTiles().length))];if(src){S.batt.push({i:src.i,age:0});}}
 if(CYR[S.year]&&!(S.cyr||{})[S.year]){(S.cyr=S.cyr||{})[S.year]=1;cyclone(CYR[S.year]);S.cyc.in=Math.max(S.cyc.in,2)}else if(lent()){S.cyc.in--;if(S.cyc.in<=0)cyclone()}
 const L_=lent();if(!S.voieC&&L_)siege();faune();climat();if(L_){navires();prises();rois();voiles();libertalia()}murir();evoluer();
 if(S.voieC){S.det=[];if(lent())marronsCaches()}else{if(lent())pousser();
 let tr=0;camps().forEach(t=>tr+=trace(t));fx({traque:(S.sil>0?-6:tr*.13-1.6)})}
 if(S.year>=abolY())S.traque=Math.max(0,(S.traque||0)*.5);
 if(S.sil>0)S.sil--;if(S.cd>0)S.cd--;
 for(const k in S.fac)S.fac[k]+=(50-S.fac[k])*.02;
 for(const k in S.fac)if(S.fac[k]<14&&!S.done['q'+k]){S.done['q'+k]=1;const p=Math.ceil(S.gens*.2);fx({gens:-p,coh:-8});S.fac[k]=30;log(nomFac(k)[0]+' partent fonder ailleurs. '+p+' personnes quittent les camps.')}
 traceE=null;S.ns=(S.ns||0)+1;{const st=pasAn();S.ts=st/3;S.tsM=st;S.yf=Math.min(1946,(S.yf??S.year)+st);S.year=Math.floor(S.yf)}{const reste=Math.max(0,Math.floor(S.bras||0)),bm=brasMax();S.bras=bm+Math.min(bm,reste)+(S.brasNext||0);voyagesSaison();if(reste>0&&!S.bac)log(reste>=bm?'Une saison de repos : vos gens ont des forces pour deux.':'Les bras non utilisés restent disponibles : '+Math.min(bm,reste)+' de plus cette saison.');S.brasNext=0}if(S.br&&S.br.zamal&&S.bras>1&&rnd()<.3){S.bras--;log('Le zamal rend las : un bras de moins cette saison.')}{const sy=syncretisme();if(avecBat('doany').length)fx({myst:2,anciens:1});if(sy.mv){S.myst=(S.myst||0)+1;if(!S.done.syncMV){S.done.syncMV=1;S.evq.push('syncMV')}}if(sy.ml){S.traque=Math.max(0,(S.traque||0)-1.5);if(!S.done.syncML){S.done.syncML=1;S.evq.push('syncML')}}}if(S.sv.anciens){S.myst=(S.myst||0)+1;if(rnd()<.12){fx({gens:-1,sante:-3});log('Un initié du datura a perdu la raison.')}}villes();urgences();
 if(S.gens<=0)return fin('mort');if(S.coh<=0){if(!S.crY||S.year-S.crY>=40){S.crY=S.year;const n=Math.ceil(S.gens*.2);fx({gens:-n});S.coh=18;log('Crise : '+n+' des vôtres s’en vont. Les autres resserrent les rangs autour d’une veillée.');if(S.gens<=0)return fin('mort')}else return fin('epars')}
 if(S.year>=2026){S.year=2026;if(!S.done.e2026){S.evq.push('e2026');sauve();return}}
 const hs=Object.keys(EV).filter(k=>EV[k].y&&EV[k].y<=S.year&&!S.done[k]&&(EV[k].tag!=='Archive'||S.year-EV[k].y<=25||(S.done[k]=1,false))&&!S.evq.includes(k)&&!(S.arcQ||[]).includes(k)&&(!EV[k].si||EV[k].si())&&(typeof histOK!=='function'||histOK(k))).sort((a,c)=>EV[a].y-EV[c].y).filter((k,i,L)=>EV[k].tag!=='Archive'||L.findIndex(q=>EV[q].tag==='Archive')===i).slice(0,S.year>=1752?3:1),h=hs[0];
 if(h){S.arcQ=S.arcQ||[];hs.forEach(k=>{if(EV[k].tag==='Archive'&&!S.bac)S.arcQ.push(k);else S.evq.push(k)})}else if(rnd()<.42*Math.min(1,(S.ts??1)*1.5)){const r=Object.keys(EV).filter(k=>!EV[k].y&&!EV[k].sys&&!S.done[k]&&(!EV[k].si||EV[k].si()));if(r.length)S.evq.push(r[Math.floor(rnd()*r.length)])}
 sauve()}
const COLOPT=()=>({n:'Répondre en colon : s’en remettre '+(S.year<1767?'à la Compagnie':S.year<1848?'au gouverneur':'aux autorités'),d:'La colonie apprécie (+4), votre île penche vers la colonie.',fx:{ami:4},vo:{c:3}});
const optsDe=(id,e)=>S&&S.voieC&&typeof COLV!=='undefined'&&COLV[id]?COLV[id].o:S&&S.voieC&&!e.sys&&e.o&&e.o.length&&!/^(bat|ep_|sync|avn|debut|gouv|prefet)/.test(id)?e.o.concat([COLOPT()]):e.o;
function choisir(id,k){if(S.revu&&S.revu[id]){delete S.revu[id];S.evq.shift();S.done[id]=1;return}snap();const e=EV[id],o=optsDe(id,e)[k];if(DEC[id]){S.dec=S.dec||{};if(!S.dec[DEC[id]]){S.dec[DEC[id]]=1;log('Nouvelle destination découverte : '+OUT[DEC[id]].n+'.')}}S.evq.shift();S.done[id]=1;if(o.f)o.f();if(o.vo)pencher(o.vo);if(o.fx)fx(o.fx);if(o.l)log(o.l);if(e.apres)e.apres();sauve();if(id==='e1752'){fin('1752');return}if(S.gens<=0)fin('mort')}

// ===== Personnes : une fiche par personne =====
// les noms : malgaches pour les gens venus de Madagascar ; pour l'Afrique, des noms bantous du Mozambique et de ses voisins
// (les déportés venaient surtout de là) — pas de noms arabes, qui n'arrivent qu'avec l'islam ; dans la colonie, l'esclave ne garde qu'un prénom français
const NOMS={mg:{h:['Rakoto','Andriana','Rabe','Ralay','Bala','Mafate','Dimitile','Cimendef','Anchaing','Rainy','Tsara','Andry','Faly'],f:['Ravao','Soa','Hery','Lalao','Fara','Voahangy','Noro','Tiana','Zara','Rasoa','Haja','Mirana','Héva']},
 af:{h:['Hlengani','Tiyani','Ntsako','Nyiko','Rhulani','Vutomi','Hlulani','Tendai','Farai','Tatenda','Chikondi','Mphatso'],f:['Khensani','Nyeleti','Tsakani','Mihloti','Masingita','Basani','Xikombiso','Chipo','Rufaro','Thoko','Nyassa','Tiwonge']},
 esc:{h:['Jean-Baptiste','Pierre','Paul','Augustin','Philippe','Alexis','Michel','César','Scipion','Hercule','Jupiter','Pompée'],f:['Marie','Geneviève','Agathe','Rose','Madeleine','Victoire','Félicité','Céleste','Flore','Brigitte','Marthe','Suzanne']},
 in:{h:['Ramassamy','Virapin','Moutou','Mounien','Pongérard','Sinimalé','Govindin','Latchoumy','Ponin','Ganess'],f:['Latchimy','Valliamé','Minatchy','Sita','Parvati','Sarojah','Amba','Kamatchy','Nagamah','Radha']},
 eu:{h:['Jean','Pierre','François','Antoine','Louis','Jacques','Étienne','Hyacinthe','Augustin','Joseph'],f:['Marie','Anne','Françoise','Jeanne','Louise','Catherine','Madeleine','Rose','Agathe','Thérèse']},
 cr:{h:['Ti-Jean','Ti-Paul','Gilbert','Firmin','Lucien','Daniel','Expédit','Raymond','Léon','Joseph'],f:['Fanny','Gisèle','Mimose','Solange','Héléna','Marceline','Denise','Rosemay','Aurélie','Josie']}};
const ORIG={mg:'malgache',af:'africaine',in:'indienne',eu:'européenne',cr:'créole'};
const SK={cue:'Cueillette',cha:'Chasse',gue:'Guerre',exp:'Exploration',soi:'Soin',art:'Artisanat',mys:'Mystique'};
const ageP=p=>S.year-p.na,adulte=p=>ageP(p)>=14;
function origineNouvelle(){const y=S.year,r=rnd();if(S.voieC){if(y<1720)return r<.45?'eu':r<.75?'mg':'af';if(y<1848)return r<.25?'eu':r<.55?'mg':r<.9?'af':'in';if(y<1900)return r<.2?'eu':r<.55?'in':r<.7?'af':'cr';return r<.75?'cr':r<.85?'in':'eu'}
 if(y<1720)return r<.6?'mg':r<.95?'af':'in';if(y<1848)return r<.45?'mg':r<.85?'af':r<.93?'in':'cr';return r<.5?'cr':r<.7?'mg':r<.85?'af':'in'}
function statutNouv(o){if(S.voieC){if(o==='eu'||o==='cr')return 'libre';if(S.year<abolY())return 'esclave';return o==='in'&&S.year<1940?'engagé':'libre'}return 'marron'}
function nouvellePersonne(opt={}){S.ppN=(S.ppN||0)+1;const o=opt.or||origineNouvelle(),g=opt.g||(rnd()<.5?'h':'f'),L=NOMS[o][g];
 const age=opt.age??(rnd()<.25?Math.floor(rnd()*13):14+Math.floor(rnd()*30));const cu={mg:0,af:0,in:0,eu:0};if(o==='cr'){cu.mg=.3;cu.af=.3;cu.eu=.25;cu.in=.15}else cu[o]=1;
 const sk={};for(const k in SK)sk[k]=Math.floor(rnd()*3);if(g==='f')sk.cue+=2;else sk.cha+=1;if(age>45)sk.mys+=2;
 const st=opt.st||statutNouv(o),NL=(st==='esclave'&&(o==='af'||o==='mg'))?NOMS.esc[g]:L;
 return {id:S.ppN,n:NL[Math.floor(rnd()*NL.length)],g,na:S.year-age,fa:opt.fa||0,or:o,st,sk,cu}}
function famillesInit(){S.pp=[];S.famN=0;let n=S.gens;while(n>0){S.famN++;const fa=S.famN,o=origineNouvelle();const tail=Math.min(n,1+Math.floor(rnd()*4));for(let k=0;k<tail;k++){const age=k<2?16+Math.floor(rnd()*30):Math.floor(rnd()*13);S.pp.push(nouvellePersonne({fa,or:k<2||rnd()<.7?o:undefined,age,g:k===0?'h':k===1?'f':undefined}))}n-=tail}}
function syncPP(){if(!S)return;if(!Array.isArray(S.pp)){famillesInit();return}
 while(S.pp.length<S.gens){const mere=S.pp.filter(p=>p.g==='f'&&ageP(p)>=16&&ageP(p)<=44),mc=mere.filter(p=>p.cj&&ppId(p.cj));if(mc.length&&rnd()<.6){const m=mc[Math.floor(rnd()*mc.length)];S.pp.push(enfantDe(m,ppId(m.cj)));continue}if(mere.length&&rnd()<.3){const m=mere[Math.floor(rnd()*mere.length)];S.pp.push(enfantDe(m,null));continue}const fs=[...new Set(S.pp.map(p=>p.fa))];let fa;if(fs.length&&rnd()<.4)fa=fs[Math.floor(rnd()*fs.length)];else{S.famN=(S.famN||0)+1;fa=S.famN}S.pp.push(nouvellePersonne({fa}))}
 while(S.pp.length>S.gens){let i=S.pp.findIndex(p=>ageP(p)>70);if(i<0)i=Math.floor(rnd()*S.pp.length);const p=S.pp.splice(i,1)[0];(S.morts=S.morts||[]).push({n:p.n,a:S.year,age:ageP(p)});if(S.morts.length>40)S.morts.shift()}}
function rolePP(p){if(!adulte(p))return ageP(p)<6?'petit enfant':'enfant';const sk=p.sk,top=Object.keys(sk).sort((a,b)=>sk[b]-sk[a])[0],v=sk[top];if(!v)return p.g==='f'?'travailleuse':'travailleur';
 const R={cue:['cueilleur','archer','archer des esprits'],cha:['chasseur','guerrier','chef de guerre'],gue:['combattant','guerrier','chef de guerre'],exp:['marcheur','éclaireur','guide des remparts'],soi:['soigneur','tisaneur','devin'],art:['artisan','artisan habile','maître artisan'],mys:['initié','gardien des rites','gardien de la mémoire']};
 const r=R[top][v>=12?2:v>=6?1:0];return p.g==='f'?({'cueilleur':'cueilleuse','chasseur':'chasseuse','marcheur':'marcheuse','soigneur':'soigneuse','tisaneur':'tisaneuse','initié':'initiée','combattant':'combattante','guide des remparts':'guide des remparts'}[r]||r):r}

// ===== Personnes, étape 2 : on progresse par ce qu'on fait =====
const SKACT={chasse:'cha',cueil:'cue',jardin:'cue',jf:'cue',ameliorer:'cue',recolte:'art',camp:'art',explorer:'exp',guet:'exp',examiner:'exp',tunnel:'exp',embuscade:'gue',descente:'gue',detache:'gue',course:'gue',lever:'gue',peche:'cha',pecheM:'cha',vouve:'art',cabot:'cha',commerce:'art',cristal:'mys',retirer:'exp',chemin:'art',concession:'art'};
function ppAction(id,n){if(!S.pp)return;const k=SKACT[id];if(!k)return;const ad=S.pp.filter(adulte);if(!ad.length)return;
 ad.sort((a,b)=>(b.sk[k]-a.sk[k])+(rnd()-.5)*4);for(let i=0;i<Math.max(1,n||1)&&i<ad.length;i++){const p=ad[i],r0=rolePP(p);p.sk[k]+=1+(S.sv.anciens&&k==='mys'?1:0);const r1=rolePP(p);if(r1!==r0&&/archer|guerri|éclaireur|tisaneu|devin|maître|gardien|chef|guide/.test(r1))log(p.n+' devient '+r1+'.')}}
function ppSaison(){if(!S.pp)return;const F={};S.pp.forEach(p=>(F[p.fa]=F[p.fa]||[]).push(p));
 S.pp.forEach(p=>{const a=ageP(p);if(a>=14)return;if(S.voieC&&p.st==='libre'&&a<10){if(rnd()<.15)p.sk.cha+=.3;return}const ad=(F[p.fa]||[]).filter(adulte);if(!ad.length)return;const m=ad[Math.floor(rnd()*ad.length)];const k=Object.keys(m.sk).sort((x,y)=>m.sk[y]-m.sk[x])[0];if(m.sk[k]>0)p.sk[k]+=a>=6?.6:.25});
 const R=ppRoles();if(R.soin)fx({sante:Math.min(3,R.soin*.5)});if(R.mem)S.myst=(S.myst||0)+Math.min(2,R.mem*.3);if(typeof ppPolSaison==='function')ppPolSaison()}
function ppRoles(){const R={guer:0,arch:0,ecl:0,soin:0,art:0,mem:0};(S.pp||[]).filter(adulte).forEach(p=>{const s=p.sk;if(Math.max(s.gue,s.cha)>=6)R.guer++;if(s.cue>=6&&(s.cha>=3||s.gue>=3))R.arch++;if(s.exp>=6)R.ecl++;if(s.soi>=6)R.soin++;if(s.art>=6)R.art++;if(s.mys>=6&&ageP(p)>=40)R.mem++});return R}

// ===== Personnes, étape 3 : unions, naissances, métissage =====
const ppId=id=>(S.pp||[]).find(p=>p.id===id);
const libreU=p=>adulte(p)&&ageP(p)<=48&&!(p.cj&&ppId(p.cj));
function unir(a,b,choisi){a.cj=b.id;b.cj=a.id;const mix=a.or!==b.or;b.fa=a.fa;log(a.n+' et '+b.n+' s’unissent'+(mix?' : deux origines, '+ORIG[a.or]+' et '+ORIG[b.or]+', dans une même famille.':'.'));if(mix&&choisi)fx({coh:3})}
function enfantDe(m,pere,o={}){const b=nouvellePersonne({fa:m.fa,or:pere&&pere.or!==m.or?'cr':m.or,age:0,st:m.st,g:o.g});const cu={};for(const k of ['mg','af','in','eu'])cu[k]=pere?((m.cu[k]||0)+(pere.cu[k]||0))/2:(m.cu[k]||0);if(o.cu)for(const k in o.cu)cu[k]=(cu[k]*.5)+(o.cu[k]*.5);b.cu=cu;for(const k in b.sk)b.sk[k]=pere?Math.floor((m.sk[k]+pere.sk[k])/8):Math.floor(m.sk[k]/6);b.mere=m.id;if(pere)b.pere=pere.id;return b}
function ppUnions(){if(!S.pp)return;const dy=Math.max(1,S.year-(S.ppU||S.year-2));S.ppU=S.year;S.pp.filter(m=>m.g==='f'&&ageP(m)>=16&&ageP(m)<=42&&m.cj&&ppId(m.cj)).forEach(m=>{if(S.gens<cap()&&S.vivres>10&&rnd()<1-Math.pow(.93,dy)){const b=enfantDe(m,ppId(m.cj));S.pp.push(b);S.gens++;if(rnd()<.3)log('Naissance : '+b.n+', enfant de '+m.n+' et '+ppId(m.cj).n+'.')}});for(let u=0;u<2;u++){const L=S.pp.filter(libreU);const H=L.filter(p=>p.g==='h'),Fm=L.filter(p=>p.g==='f');if(H.length&&Fm.length&&rnd()<.5){const h=H[Math.floor(rnd()*H.length)],c=Fm.filter(f=>f.fa!==h.fa);if(c.length){const f=c[Math.floor(rnd()*c.length)];unir(h,f,false)}}}
 // les familles s'imprègnent les unes les autres : chaque personne glisse un peu vers la culture de sa famille
 const F={};S.pp.forEach(p=>(F[p.fa]=F[p.fa]||[]).push(p));for(const fa in F){const g=F[fa],moy={mg:0,af:0,in:0,eu:0};g.forEach(p=>{for(const k in moy)moy[k]+=(p.cu[k]||0)/g.length});g.forEach(p=>{for(const k in moy)p.cu[k]=(p.cu[k]||0)*.97+moy[k]*.03})}}
function couplesMixtes(){const L=(S.pp||[]).filter(libreU);for(const h of L.filter(p=>p.g==='h'))for(const f of L.filter(p=>p.g==='f'))if(f.fa!==h.fa&&f.or!==h.or)return [h,f];return null}

// ===== Personnes, étape 4 : secteurs fermés et savoirs de famille =====
// un secteur est fermé tant qu'aucune route n'y monte : Mafate pour toujours, Cilaos jusqu'à la route de 1932, Salazie jusqu'au chemin carrossable du XIXᵉ siècle
function routeOuverte(t){if(!t.cirq)return t.alt<1100||S.year>=1860||!!(S.gouv&&S.voieC);if(t.cirq==='Mafate')return false;if(t.cirq==='Cilaos')return S.year>=1932;return S.year>=1860}
const ferme=t=>!routeOuverte(t);
const ART={vacoa:{n:'la vannerie de vacoa',d:'Paniers, nattes et chapeaux tressés : de quoi échanger sur la côte.'},tisane:{n:'les tisanes des îlets',d:'Les plantes des remparts soignent : santé +1 par saison.'},lentille:{n:'les lentilles de Cilaos',d:'Une culture des terrasses du cirque : vivres +2 par saison.'},broderie:{n:'les jours de Cilaos',d:'Une broderie à jours tirés, née dans le cirque à la fin du XIXᵉ siècle : cohésion +1 par saison.'},chouchou:{n:'le chouchou de Salazie',d:'La christophine des pentes humides : vivres +2 par saison.'},forge:{n:'la forge du fond de ravine',d:'On refait les outils et les fers : un fusil de temps en temps.'},bois:{n:'la sculpture du bois de couleurs',d:'Pilons, cuillers, bancs : savoir +1 par saison.'}};
function artPour(t){const y=S.year,r=rnd();if(t.cirq==='Cilaos')return y>=1900&&r<.5?'broderie':'lentille';if(t.cirq==='Salazie')return y>=1840&&r<.6?'chouchou':'vacoa';if(t.cirq==='Mafate')return r<.5?'vacoa':'tisane';return r<.3?'forge':r<.65?'bois':'vacoa'}
function famCamp(fa){S.famC=S.famC||{};const cs=camps();if(!cs.length)return null;let i=S.famC[fa];if(i===undefined||!cs.find(t=>t.i===i)){i=cs[Math.floor(rnd()*cs.length)].i;S.famC[fa]=i}return T[i]}
function ppSecteurs(){if(!S.pp)return;S.savF=S.savF||{};S.savFo=S.savFo||{};const F={};S.pp.forEach(p=>(F[p.fa]=F[p.fa]||[]).push(p));
 for(const fa in F){const t=famCamp(fa);if(!t)continue;const g=F[fa],ad=g.filter(adulte);
  if(ferme(t)){ad.forEach(p=>p.sk.art+=.4);fx({vivres:.4});if(!S.savF[fa]){const tot=ad.reduce((a,p)=>a+p.sk.art,0);if(tot>=14){const k=artPour(t);S.savF[fa]={k,lieu:t.cirq||lieuDit(t),y:S.year};const chef=g.slice().sort((a,b)=>a.na-b.na)[0];log('Isolée '+(t.cirq?'dans le cirque de '+t.cirq:'dans les hauts')+', la famille de '+chef.n+' maîtrise '+ART[k].n+'.')}}}
  else if(S.savF[fa]&&!S.savFo[fa]){S.savFo[fa]=S.year;const k=S.savF[fa].k;fx({coh:3,ami:3,savoir:2});log('La route ouvre '+S.savF[fa].lieu+' : '+ART[k].n+' descend vers la côte et se répand dans l’île.')}}
 for(const fa in S.savFo){const k=(S.savF[fa]||{}).k;if(k==='tisane')fx({sante:1});if(k==='lentille'||k==='chouchou')fx({vivres:2});if(k==='broderie')fx({coh:1});if(k==='bois')fx({savoir:1});if(k==='forge'&&rnd()<.1)S.fu=(S.fu||0)+1;if(k==='vacoa')fx({ami:.5})}}
function lieuDit(t){return t.cirq?'le cirque de '+t.cirq:'les hauts'}

// ===== Expéditions : la distance coûte, la viande séchée se garde =====
// Les voies naissent du passage : sentier (vo=1), chemin de charrette (vo=2), radier (pont=1), pont (pont=2)
function hexPath(a,b){const P=[a];let u=a,g=0;while(u!==b&&g++<80){let best=null,bs=1e9;const d0=hd(u,b);u.nb.forEach(i=>{const v=T[i];if(!v||hd(v,b)>=d0)return;const s=v.slope/8+(v.bare&&v!==b?6:0)+((S.t[i]||{}).vo?-3:0);if(s<bs){bs=s;best=v}});if(!best)break;u=best;P.push(u)}return P}
function passer(i,w,col,muet){S.pas=S.pas||{};S.pas[i]=(S.pas[i]||0)+w;const o=tl(i),t=T[i];if(col)(S.pasC=S.pasC||{})[i]=1;S.voL=S.voL||{};const dit=k=>{if(muet||S.voL[k]===S.year)return false;S.voL[k]=S.year;return true};const ou=lieuDe(t)||lieuProche(t)||'vos camps';
 if(!o.vo&&S.pas[i]>=4){o.vo=1;o.s=1;if(dit('s'))log(col?'À force d’allers et venues, les colons ont tracé un sentier vers '+ou+'.':'À force de passer par là, vos gens ont tracé un sentier vers '+ou+'. On y va plus vite, mais il se voit.')}
 if(o.vo===1&&S.pas[i]>=12&&S.year>=1730&&t.alt<1100&&t.slope<25&&(col||S.voieC)){o.vo=2;if(dit('r'))log('Le sentier s’élargit : les charrettes passent, c’est un chemin vers '+ou+'.')}
 voiePont(i,muet)}
function voiePont(i,muet){const o=tl(i),t=T[i];if(o.vo!==2||!t.riv)return;if(S.year>=1840&&o.pont!==2){o.pont=2;if(!muet)log('Un pont de pierre enjambe la rivière près de '+(lieuDe(t)||lieuProche(t)||'la route')+' : on passe même en saison des pluies.')}else if(S.year>=1780&&!o.pont){o.pont=1;if(!muet)log('Un radier de pierres maçonnées traverse la rivière : on passe à gué, sauf en crue.')}}
function trafic(t,w,col,muet){const cs=camps();if(!cs.length)return;const c=cs.slice().sort((p,q)=>hd(p,t)-hd(q,t))[0];hexPath(c,t).slice(1).forEach(u=>passer(u.i,w||1,col,muet))}
function voiesSaison(muet){const tw=VILLES.filter(v=>S.towns.includes(v[3])).map(v=>near(v[1],v[2]));for(let k=1;k<tw.length;k++){const a=tw[k],p=tw.slice(0,k).sort((u,v)=>hd(u,a)-hd(v,a))[0];hexPath(p,a).forEach(u=>passer(u.i,S.year>=1730?1.5:1,1,muet))}
 const cs=camps();if(S.voieC)cs.forEach(c=>{const v=tw.slice().sort((u,w)=>hd(u,c)-hd(w,c))[0];if(v&&hd(v,c)<14)hexPath(c,v).forEach(u=>passer(u.i,1,1,muet))});else for(let k=1;k<cs.length;k++)hexPath(cs[k-1],cs[k]).forEach(u=>passer(u.i,.5,0,muet));
 Object.keys(S.pas||{}).forEach(i=>voiePont(+i,muet));
 if(!S.voieC&&!muet){const n=Object.keys(S.pas||{}).filter(i=>S.t[i]&&S.t[i].vo&&!(S.pasC||{})[i]&&T[i].alt>300).length;if(n>=5){fx({traque:Math.min(2,n*.04)*(S.sv.sentiers?.4:1)});if(n>=5&&!S.voVu){S.voVu=1;log('Vos sentiers se voient : les chasseurs de marrons les suivent. Changer de passage les efface peu à peu.')}}
  Object.keys(S.pas||{}).forEach(i=>{if(!(S.pasC||{})[i])S.pas[i]*=.97})}}
// L'île telle qu'elle a évolué jusqu'à l'année de départ : villes, emprise coloniale, voies, découvertes
function etatMonde(y){const lim=150+(y-1663)*3.5,tw=VILLES.filter(v=>v[0]<=y);
 tw.forEach(v=>{const t=near(v[1],v[2]),o=tl(t.i);if(!S.towns.includes(v[3])&&!o.b){S.towns.push(v[3]);o.c=1;o.clr=1;o.s=1}
  T.forEach(u=>{const d=hd(u,t);if(u.bare)return;const q=tl(u.i);if(d<=(S.voieC?6:2)&&u.alt<lim){if(!q.s){q.s=1;q.p=1}}if(d<=2&&u.alt<lim*.6&&!q.b&&q!==o)q.clr=1})});
 const y0=S.year;for(let a=1670;a<=y;a+=6){S.year=a;voiesSaison(true)}S.year=y0;
 GRANDS.filter(g=>g[3]==='route'&&g[0]<=y&&g[6]).forEach(g=>g[6].forEach(p=>{const t=near(p[0],p[1]);passer(t.i,6,1,true)}))}
// Temps de trajet réel (en mois) : sans sentier, par le centre, traverser l'île prend au moins 8 mois
function moisPas(u){const o=S.t[u.i]||{};let m=o.vo===2?.12:o.vo===1?.3:o.s?.55:.85;m+=u.slope/45+(u.alt>1200?.35:0)+(u.forest&&!o.vo?.15:0)+(u.riv&&!o.pont?.15:0);return m*KM}
let KM=.37*HS/1.45;function moisTrajet(a,b){return hexPath(a,b).slice(1).reduce((s,u)=>s+moisPas(u),0)}
const distCamp=t=>{const cs=camps();return cs.length?Math.min(...cs.map(c=>hd(c,t))):0};
function coutTrajet(t,id,n){const d=distCamp(t);if(d<=2||!['chasse','cueil','explorer','guet','examiner','peche','pecheM','tunnel','cristal'].includes(id))return null;
 let besoin=Math.round((d-2)*1.5*Math.max(1,n||1));const route=t.forest||t.riv;let msg='';{const cs=camps(),c=cs.slice().sort((p,q)=>hd(p,t)-hd(q,t))[0],P=hexPath(c,t).slice(1),fs=P.filter(u=>(S.t[u.i]||{}).vo===1).length/P.length,fr=P.filter(u=>(S.t[u.i]||{}).vo===2).length/P.length;if(fs+fr>.3){besoin=Math.round(besoin*(1-.35*fs-.6*fr));msg+=(fr>fs?'Par le chemin':'Par les sentiers connus')+', le trajet est plus court. '}}
 if(route){const g=Math.round(besoin*.5);besoin-=g;msg='En route, le groupe chasse et pêche pour tenir. '}
 const sec=Math.min(S.sec||0,Math.ceil(besoin/3));if(sec){S.sec-=sec;besoin=Math.max(0,besoin-sec*3);msg+=(S.voieC?'Du boucané':'De la viande séchée')+' dans les sacs ('+sec+'). '}
 const pris=Math.min(S.vivres,besoin);S.vivres-=pris;if(besoin>pris){fx({sante:-3});msg+='Les vivres manquent pour le trajet : on rentre affamés.'}else if(pris)msg+=pris+' vivres consommés pour le trajet.';
 return 'À '+d+' cases du camp. '+msg}

// ===== Colonie : bâtir, longer les côtes, ouvrir des sentiers, faire venir des soldats =====
const cotier=t=>t.nb.length<6||t.nb.some(i=>T[i].alt<=1);
function actionsColonie(t,A){const o=S.t[t.i];const camp=o&&o.b==='camp';
 if(!(S.sold>0))A=A.filter(a=>!(a.id==='explorer'&&!cotier(t)&&t.alt>350));
 if(camp&&cotier(t))A.push({id:'cabotage',n:'Longer la côte en bateau',c:2,d:'Une chaloupe longe la côte : les anses, les embouchures et les pointes au-delà de vos quartiers apparaissent sur la carte, sans entrer dans la forêt.'});
 if(camp&&S.year<abolY())A.push({id:'soldats',n:'Faire venir des soldats',c:1,r:{},d:'La Compagnie envoie quelques soldats pour 4 saisons : ils escortent les expéditions dans la forêt et chassent autour des quartiers. Vivres −8.'});
 if(camp&&camps().length>=2)A.push({id:'sentierE',n:'Ouvrir un sentier de porteurs',c:2,d:'Un sentier relie vos quartiers ; des porteurs esclaves y portent les marchandises : vivres +1 et colonie +0,5 par saison et par sentier.'});
 return A}

// la pêche en mer fait croiser des navires : pirates, corsaires, marchands, passeurs clandestins
const guerreAng=()=>[[1744,1748],[1756,1763],[1778,1783],[1793,1815]].some(([a,b])=>S.year>=a&&S.year<=b);
function rencontresMer(){if(!S.t)return;const n=T.filter(t=>S.t[t.i]&&S.t[t.i].b==='pecheM').length;if(!n||rnd()>.1*n)return;const r=rnd(),y=S.year;
 if(!S.voieC&&y>=1740&&(r<(guerreAng()?.4:.25))){if(!S.evq.includes('clandes'))S.evq.push('clandes');return}
 if(y<1730&&r<.55){S.voile={nat:'pirate',type:'marchand',cap:0};log('Au large de vos pêcheurs, une voile sans pavillon : des pirates rôdent.');S.evq.push('voile');return}
 if(guerreAng()&&r<.75){log('Un corsaire de l’île de France croise au large, une prise anglaise en remorque.');fx({ami:1});return}
 log('Un navire marchand passe au large et met le cap sur '+(y<1740?'Saint-Paul':'Saint-Denis')+'.');if(!S.voieC)fx({traque:1});else fx({ami:1})}

// en rythme réel ou mixte, les événements lents (cyclones, navires, détachements…) avancent au rythme des années, pas des demi-saisons
function lent(){return rnd()<Math.min(1,(S.ts??1)*1.5)}

function voyagesSaison(){const mo=Math.round((S.tsM||pasAn())*12);S.abs=(S.abs||[]).filter(a=>{if(S.yf+1e-6>=a.back){log('Le groupe parti vers '+a.ou+' est revenu après '+a.m+' mois de marche.');return false}return true});
 (S.voyS||[]).forEach(v=>{if(mo>=24)return;const cs=camps();if(!cs.length)return;const t=T[v.i],c=cs.slice().sort((p,q)=>hd(p,t)-hd(q,t))[0],m=Math.round(moisTrajet(c,t)*2);if(m>mo){const ou=lieuDe(t)||lieuProche(t)||'l’intérieur';S.abs.push({c:v.c,back:S.yf+(m-mo)/12,ou,m});log('Vers '+ou+' : '+m+' mois aller-retour. Les '+v.c+' bras partis manquent jusqu’à leur retour.')}});S.voyS=[];
 const ab=S.abs.reduce((s,a)=>s+a.c,0);if(ab)S.bras=Math.max(0,S.bras-ab)}
