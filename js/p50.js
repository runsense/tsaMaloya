// ===== p50 : 1794, la guerre sur mer — les croisières anglaises coupent l'île du monde jusqu'à la paix d'Amiens (1802) =====
// Faits : la France révolutionnaire est en guerre avec l'Angleterre dès 1793. Des escadres anglaises croisent au large des Mascareignes
// (combat du 22 octobre 1794 devant l'île de France) ; les corsaires de Port-Louis, Surcouf en tête, répondent en prenant des navires anglais.
// Le commerce se fait rare jusqu'à la paix d'Amiens (1802). Le blocus total viendra plus tard, en 1809-1810, avant la prise de l'île.
EV.e1794bl={y:1794,tag:'Archive',an:'1794-1802',t:'Les frégates anglaises',
 b:'La France est en guerre avec l’Angleterre. Des frégates anglaises croisent au large des Mascareignes et prennent les navires qui passent. Le riz de Madagascar, les toiles de l’Inde arrivent de moins en moins. À Port-Louis, les corsaires arment pour prendre des navires anglais à leur tour.',
 v:'Pendant le blocus, aucun navire ne part outre-mer et les vivres venus de la mer manquent. Il se relâche avec la paix d’Amiens, en 1802.',
 get o(){return [{n:S&&S.voieC?'Planter des vivres sur l’habitation':'Rester sur les cultures des Hauts',d:'Le blocus commence.',fx:{},f:()=>{S.blocus=1}},
  {n:S&&S.voieC?'Armer un corsaire avec les négociants de Saint-Paul':'Profiter du désordre pour descendre aux magasins',d:S&&S.voieC?'Commerce risqué : vivres +6, mais la cohésion baisse.':'Vivres +5, mais la traque monte.',fx:S&&S.voieC?{vivres:6,coh:-3}:{vivres:5,traque:6},f:()=>{S.blocus=1}}]}};
function blocusOn(){return !!(S&&S.blocus&&S.year<1802)}
// au départ de 1794, le blocus fait partie du monde
{const d=depart1794;depart1794=function(){const r=d.apply(this,arguments);try{if(!S.evq.includes('e1794bl'))S.evq.push('e1794bl')}catch(e){}return r}}
// la paix revient
setInterval(()=>{try{if(S&&S.blocus===1&&S.year>=1802){S.blocus=2;log('1802 : la paix d’Amiens. Les navires reviennent dans la rade.')}}catch(e){}},2000);
// l'onglet Outre-mer : on le dit, et aucun départ
{const dr=drawer;drawer=function(){const r=dr.apply(this,arguments);try{if(onglet!=='out'||!blocusOn())return r;const d=$('drawer');if(!d)return r;
 if(!d.querySelector('.blocN')){const n=document.createElement('div');n.className='pc blocN';n.style.cssText='border:1px solid #c85a3a;background:rgba(120,40,30,.25)';n.innerHTML='<b>⚓ Blocus anglais</b><br><small>Des frégates anglaises croisent au large : aucun navire ne part jusqu’à la paix (1802). Les liens déjà ouverts tiennent, mais rien de neuf.</small>';d.insertBefore(n,d.querySelector('h3')?d.querySelector('h3').nextSibling:d.firstChild)}
 d.querySelectorAll('[data-o]').forEach(b=>{const k=b.dataset.o;if(!(S.out&&S.out[k])){b.onclick=e=>{e.stopPropagation();toast('Blocus anglais : aucun navire ne part.')};b.style.opacity=.45}})}catch(e){}return r}}
// chaque saison de blocus, les vivres venus de la mer manquent un peu
{const sv=window.suite;if(typeof sv==='function'){let dern=null;suite=function(){const r=sv.apply(this,arguments);try{if(blocusOn()&&dern!==S.ns){dern=S.ns;fx({vivres:-1})}}catch(e){}return r}}}

// ---------- le vrai blocus : 1809-1810, avant la prise de l'île ----------
// Faits : à partir de 1809, une escadre anglaise basée à Rodrigues bloque l'île Bonaparte et l'île de France ; elle débarque à Saint-Paul
// en septembre 1809. En juillet 1810, les Anglais débarquent à la Grande Chaloupe et prennent l'île ; ils la gardent jusqu'en 1815.
EV.e1809bl={y:1809,tag:'Archive',an:'1809-1810',t:'Le blocus anglais',
 b:'Une escadre anglaise, installée à Rodrigues, ferme la mer autour de l’île Bonaparte et de l’île de France. Plus aucun navire n’entre ni ne sort. Après les cyclones de 1806 et 1807, le riz manque, les prix montent, on mange du maïs et du manioc.',
 v:'Pendant le blocus, aucun navire ne part et les vivres baissent chaque saison. Il prend fin quand les Anglais prennent l’île, en juillet 1810.',
 get o(){return [{n:S&&S.voieC?'Rationner l’habitation':'Planter plus de maïs et de manioc',d:'On tient.',fx:S&&S.voieC?{coh:-2}:{vivres:2},f:()=>{S.blocus2=1}},
  {n:S&&S.voieC?'Cacher du grain pour le revendre cher':'Descendre prendre le grain caché des magasins',d:S&&S.voieC?'Vivres +5, la colère monte au quartier.':'Vivres +6, mais les patrouilles se multiplient.',fx:S&&S.voieC?{vivres:5,coh:-4}:{vivres:6,traque:8},f:()=>{S.blocus2=1}}]}};
{const b0=blocusOn;blocusOn=function(){return b0()||!!(S&&S.blocus2&&S.year<=1810&&!S.done.e1810r)}}
// le blocus fini : l'île est anglaise
setInterval(()=>{try{if(S&&S.blocus2===1&&(S.done.e1810r||S.year>1810)){S.blocus2=2;log('1810 : les Anglais tiennent l’île. Le blocus est levé ; les navires anglais entrent dans la rade.')}}catch(e){}},2000);
// le bandeau de l'onglet Outre-mer dit lequel des deux
{const dr=drawer;drawer=function(){const r=dr.apply(this,arguments);try{const n=document.querySelector('#drawer .blocN');if(n&&S.blocus2===1)n.innerHTML='<b>⚓ Blocus anglais</b><br><small>L’escadre anglaise de Rodrigues ferme la mer : aucun navire ne part. Le blocus finira avec la prise de l’île, en 1810.</small>'}catch(e){}return r}}

// ---------- en Construction aussi : pendant les années de guerre sur mer, les comptoirs ne rapportent rien ----------
function kBlocus(an){return (an>=1794&&an<1802)||(an>=1809&&an<=1810)}
if(typeof kAnnee==='function'){const ka=kAnnee;kAnnee=function(){const cp=K&&K.cpt?JSON.parse(JSON.stringify(K.res)):null,bl=K&&kBlocus(K.an);
 if(bl&&K.cpt){const sv=K.cpt;K.cpt=null;try{ka.apply(this,arguments)}finally{K.cpt=sv}if(Object.keys(sv).length)kLog(K.an+' : '+(K.an>=1809?'blocus anglais':'les frégates anglaises croisent au large')+'. Aucun navire des comptoirs n’est rentré.');return}
 return ka.apply(this,arguments)}}

// ===== départ en 1794 : deux lieux, et les gens répartis entre les deux (avant, tout le monde restait dans le premier) =====
{const d=depart1794;depart1794=function(T0){const r=d.apply(this,arguments);try{if(typeof syncPP==='function')syncPP();const C=camps();if(C.length<2||!S.pp)return r;const autre=C.find(t=>t.i!==T0.i);if(!autre)return r;
 // des familles entières partent dans le second lieu : à peu près un tiers des gens
 const fam={};S.pp.forEach(p=>(fam[p.fa]=fam[p.fa]||[]).push(p));const F=Object.values(fam).sort((a,b)=>b.length-a.length);let n=0,cible=Math.round(S.pp.length/3);
 F.forEach((L,i)=>{if(n>=cible||i===0)return;L.forEach(p=>{p.camp=autre.i});n+=L.length});
 if(!n){S.pp.filter((p,i)=>i%3===2).forEach(p=>{p.camp=autre.i;n++})}
 log((S.voieC?'Une partie des gens de l’habitation vit sur la seconde concession, ':'Une partie du camp vit dans le second camp, ')+(lieuDe(autre)||lieuProche(autre)||'plus loin')+' : '+n+' personnes.')}catch(e){}return r}}

// ===== les batailles d'uchronie cachées : on dit comment les ouvrir (une fois ouverte dans une partie, elle reste ouverte dans ce navigateur) =====
const UCH_AIDE={
 soeurs:'Pour l’ouvrir : en Histoire côté marron, vers 1722, quand vous avez un lien avec l’île de France, alliez vos camps aux marrons du Morne.',
 angl:'Pour l’ouvrir : en 1748, quand la flotte anglaise attaque l’île de France, prenez le parti des Anglais (il faut un lien outre-mer ou les pirates).',
 cors:'Pour l’ouvrir : vers 1798, quand les corsaires font escale dans une crique, aidez-les.',
 abol:'Pour l’ouvrir : en 1796, choisissez de proclamer la liberté.',
 anc:'Pour l’ouvrir : commencez en 1794 avec le passé « La voie des anciens ».',
 lib:'Pour l’ouvrir : commencez en 1794 avec le passé « L’alliance des pirates ».',
 roy:'Pour l’ouvrir : commencez en 1794 avec « Le royaume des Hauts », ou faites élire un grand roi des camps.',
 arab:'Pour l’ouvrir : quand les boutres de Zanzibar et du Gujarat passent, commercez avec eux ou pillez-les.',
 vichy:'Pour l’ouvrir : en 1942, côté marron, choisissez de combattre les gendarmes de Vichy.',
 cafe:'Pour l’ouvrir : commencez en 1794 côté colon avec « La fortune du café ».',
 comp:'Pour l’ouvrir : commencez en 1794 côté colon avec « Les comptoirs de l’océan Indien ».'};
