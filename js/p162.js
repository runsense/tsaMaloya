// ===== p162 : le créole change selon la zone et le rang — tout le monde parle le créole de son endroit (esclaves compris) =====
// Sud et Hauts du Sud jusqu'à la Plaine des Cafres : « lo » au lieu de « le ». Est : créole de l'Est. Hauts : parler lent, mots anciens.
// Bas des plantations : plus de mots malgaches. Notables, gens de la ville : un créole presque français.
// Phrases courtes et courantes, à faire relire par Paris ; la traduction suit entre parenthèses.
function zone162(t){try{if(!t)return 'bas';const g=LL99(t);if(g.lat<-21.13&&g.lon>55.38&&g.lon<55.72)return 'sud';if(g.lon>55.62&&g.lat>-21.2)return 'est';if((t.alt||0)>600)return 'hauts';return 'bas'}catch(e){return 'bas'}}
const CR162=[
 ['{le} shemin lé long, ou sar arivé tar.','le chemin est long, tu arriveras tard'],
 ['Koman i lé ? Lé bon, lé bon.','comment ça va ? ça va, ça va'],
 ['Na poin manzé pou tout domoun asteur.','il n’y a pas à manger pour tout le monde maintenant'],
 ['Kosa ou di ? Mi antan pa bien.','qu’est-ce que tu dis ? je n’entends pas bien'],
 ['{le} lapli i vien, rant {le} linz.','la pluie arrive, rentre le linge'],
 ['Mi sava rod in pé dibwa.','je vais chercher un peu de bois'],
 ['{le} marmay i dor ankor.','les enfants dorment encore'],
 ['Ou lé fatigé ? Asiz in pé.','tu es fatigué ? assieds-toi un peu']];
const CRB162=[['{le} razana i vey anou.','les ancêtres veillent sur nous'],['Fé atansion, {le} komandèr lé la.','fais attention, le commandeur est là']];
const CRN162=[['Le chemin est long, vous arriverez tard.','presque du français : le parler des notables'],['La pluie arrive, faites rentrer le linge.','presque du français']];
function creole162(p){try{if(!S)return null;const ci=campDe(p),t=T[ci];const z=zone162(t),not=S.voieC&&p&&(p.role==='not'||p.rang==='m'||(p.id%7===0));
 let L=not?CRN162:CR162.concat(z==='bas'&&!S.voieC?CRB162:[]);const q=L[(p.id*7+S.ns+Math.floor(performance.now()/60000))%L.length];
 const art=z==='sud'?'lo':'le';let txt=q[0].replace(/\{le\}/g,art);txt=txt.charAt(0).toUpperCase()+txt.slice(1);
 return '« '+txt+' » ('+q[1]+')'}catch(e){return null}}
{const c0=cvDit;cvDit=function(p,a){const r=c0.apply(this,arguments);try{if(p&&rnd()<.35){const c=creole162(p);if(c)return c}}catch(e){}return r}}
