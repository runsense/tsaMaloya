// ===== p399 : « Quelle histoire ? » — les deux colonnes restent droites (les contes des Hauts passaient dans la grille et décalaient
// les utopies d'une case : les utopies coloniales sous les marrons), un bouton pour revenir à l'accueil, et ce qui restait en français. =====
{const cv=choixVoie;choixVoie=function(){const r=cv.apply(this,arguments);try{const e=$('ecran'),t=e.querySelector('.tab319');if(!t)return r;const g=id=>document.getElementById(id);
  const hs=t.querySelectorAll('h3'),ut=[...t.querySelectorAll('.ut319')],vide=()=>document.createElement('div');
  const Lm=[hs[0],g('v-m'),g('v-m94'),g('v-epo'),g('v-epk'),ut[0]],Lc=[hs[1],g('v-c'),g('v-c94'),g('v-epc'),null,ut[1]];
  t.innerHTML='';Lm.forEach((x,i)=>{[[x,i],[Lc[i],i+6]].forEach(([z,o])=>{z=z||vide();z.style.setProperty('--o',o);t.appendChild(z)})});
  const bl=e.querySelector('.bloc');if(bl&&!g('ret399')){const b=document.createElement('button');b.className='bt sec';b.id='ret399';b.textContent='← Retour';b.style.marginTop='12px';b.onclick=()=>{try{accueil()}catch(x){}};bl.appendChild(b)}}catch(x){console.warn(x)}return r}}
// les traductions qui manquaient
try{const T=window.TR363=window.TR363||{};Object.assign(T,{'L’histoire coloniale':'The colonial history','Contes et légendes des Hauts':'Tales and legends of the Hauts','Les utopies marronnes':'Maroon utopias','Les utopies coloniales':'Colonial utopias'});
 const noms=c=>Object.keys(EPC291||{}).filter(k=>EPC291[k].fic&&(COTE319[k]||'c')===c).map(k=>EPC291[k].n.split(',')[0]);
 ['m','c'].forEach(c=>{const n=noms(c).join(' · ');T['Personnages de fiction : '+n+'.']='Fictional characters: '+n+'.'})}catch(e){}
// ===== 1978 : la mort de Rico Carpaye. Fiche de mémoire, au plus près des faits rapportés ; les responsabilités n'ont jamais été
// établies par la justice. Source : 7 Lames la Mer, « Qui a tué Rico Carpaye ? » (2023, récit engagé), d'après le témoignage d'Eugène Rousse.
// La fiche ne compare pas avec la politique d'aujourd'hui : elle laisse la question ouverte au joueur. =====
try{Object.assign(EV,{rico1978:{y:1978,si:()=>!!S,tag:'Mémoire',an:'14 mars 1978',t:'Qui a tué Rico Carpaye ?',
 b:'Législatives de mars 1978 : Jean Fontaine (droite) l’emporte avec 50,24 % des voix contre Paul Vergès, maire du Port, qui fait 59 % dans sa ville. Le 14 mars au soir, un convoi d’une centaine de véhicules de partisans du nouveau député traverse Le Port. La journée a déjà connu des heurts. Au carrefour du Sacré-Cœur, une camionnette du cortège fauche Rico Carpaye, 17 ans, apprenti soudeur du quartier Cœur-Saignant ; des témoins parlent aussi de coups de feu. Le Port devient ville morte ; des milliers de personnes suivent les obsèques.',
 v:'Le premier adjoint avait demandé au préfet d’interdire le convoi. Selon Eugène Rousse, les plaintes de la famille et de la mairie n’ont jamais été instruites : il n’y a pas eu de procès, et les auteurs n’ont pas été désignés par la justice. La violence autour des élections, la confiance dans la justice : où en est-on aujourd’hui, ici et en France ?',
 nat:'Fait historique ; les responsabilités n’ont jamais été établies par la justice. Récit d’après un témoin engagé.',
 h:'7 Lames la Mer, « Qui a tué Rico Carpaye ? » (2023), d’après le témoignage d’Eugène Rousse.',o:[{n:'Continuer',d:'',fx:{},hist:1}]}})}catch(e){}
try{if(typeof histOK==='function'){const h0=histOK;histOK=function(k){if(k==='rico1978')return true;return h0.apply(this,arguments)}}}catch(e){}
