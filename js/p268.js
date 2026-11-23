// ===== p268 : l'Est et les cavernes.
// - Les marrons de l'Est : la carte des toponymes en garde peu (Rivière des Roches), alors que les quartiers de l'Est
//   (Sainte-Suzanne, Saint-André, Saint-Benoît) comptent une bonne part des esclaves de l'île. Le jeu ajoute quatre camps
//   inventés dans les Hauts de l'Est, signalés comme tels. Leurs fugitifs ne restent pas : les guides des camps les accompagnent
//   par les plaines vers le Sud et le centre.
// - Quand le royaume des Hauts est fondé, les fugitifs arrivent plus nombreux ; avant, ils sont rares.
// - Les cavernes : l'archéologie montre que les marrons y ont souvent vécu, cachés, surtout là où il pleut beaucoup
//   (l'Est, le centre, les hauts du Sud) : on y garde le feu au sec. Un camp-caverne se voit moins et souffre moins de la pluie. =====
MAR251.camps.push(['Hauts de Saint-André (camp inventé)',55.6105,-21.0105],['Bras des Lianes (camp inventé)',55.6455,-21.0555],['Hauts de Saint-Benoît (camp inventé)',55.6655,-21.0955],['Bras de la Plaine des Palmistes (camp inventé)',55.6155,-21.1205]);
const EST268=i=>{try{const c=MAR251.camps[i];return c[1]>55.55&&c[2]>-21.17}catch(e){return false}};
const CAV268=i=>{try{const c=MAR251.camps[i];return /caverne|grotte/i.test(c[0])||c[1]>55.55||c[2]<-21.2||(c[1]>55.4&&c[1]<55.56&&c[2]<-21.05)}catch(e){return false}};
// le royaume attire les fugitifs ; avant, ils viennent au compte-gouttes
{const s0=saison;saison=function(){const r=s0.apply(this,arguments);try{if(!S||S.fin||S.voieC||S.year>=1848||!S.r267)return r;const roy=S.r267.roy;
 vivants267().forEach(o=>{const v=v267(o.i);if(roy&&rnd()<.25)v.g+=1;if(!roy&&rnd()<.15)v.g=Math.max(3,v.g-1);if(CAV268(o.i)&&typeof pluie==='function'&&pluie())v.viv=Math.min(100,v.viv+2)});
 if(roy&&rnd()<.2){fx({gens:1});log('🔥 Depuis que le royaume existe, les fugitifs savent où monter : une nouvelle famille arrive.')}
}catch(e){}return r}}
// les chasseurs trouvent moins les camps-cavernes : voir p267 (une attaque sur deux n'arrive pas)
// les fugitifs de l'Est, guidés vers le Sud
setInterval(()=>{try{if(!S||S.voieC||S.fin||!S.evq||S.evq.length||!MAR251.vus||S.year>=1848||S.year<1700)return;S.r267=S.r267||{v:{},roy:0,cen:0};const R=S.r267;
 if(R.est268===S.year||(R.est268&&S.year-R.est268<(R.roy?3:7)))return;const E=vivants267().filter(o=>EST268(o.i)&&o.st>=1);if(!E.length)return;if(rnd()>.4)return;
 R.est268=S.year;R.esti=E[Math.floor(rnd()*E.length)].i;S.evq.push('est268')}catch(e){}},8000);
EV.est268={sys:1,tag:'Mémoire',an:'',get t(){return 'Les fugitifs de l’Est'},
 get b(){const n=nom267(S.r267.esti);return 'Ils sont '+(S.r267.roy?'une dizaine':'trois')+', partis d’une habitation des bas de l’Est, trempés, les pieds en sang. Les gens du camp de '+n+' les ont recueillis, mais l’Est est trop près des habitations : il faut les mener plus loin, par la forêt de Bébour et la plaine, vers le Sud et le centre. Un guide du camp les accompagne ; il vous demande de les prendre en charge pour la dernière étape.'},
 v:'Les quartiers de l’Est comptaient une bonne part des esclaves de l’île ; les camps de l’Est de ce jeu sont en partie inventés, et le passage par les plaines vers le Sud est reconstitué.',
 get o(){const n=S.r267.roy?3:1;return [{n:'Les accueillir et les mener au Sud',d:'+'+n+' personnes, traque +2, amitié du camp +10',fx:{gens:n,traque:2},f:()=>{const v=v267(S.r267.esti);v.ami=Math.min(100,v.ami+10)}},{n:'Les cacher dans une caverne, le temps que la traque passe',d:'+'+n+' personnes, santé −2 (le froid, l’humidité)',fx:{gens:n,sante:-2}}]}};
// la caverne, maison des pays de pluie
EV.cav268={y:1730,tag:'Mémoire',an:'dans les pays de pluie',si:()=>S&&!S.voieC&&camps().some(c=>c.x>xz(55.5,-21)[0]||c.z>xz(55.5,-21.2)[1]),t:'Vivre dans la caverne',
 b:'Ici, il pleut des jours entiers. Les cases de feuilles pourrissent, le bois ne prend plus. Les anciens montrent un abri sous la roche, au flanc du rempart : on y garde le feu au sec, la fumée se perd dans le brouillard, et de la ravine personne ne voit l’entrée. On y vit, on y dort, on y cache les vivres.',
 v:'Dans les fouilles des camps marrons (cirque de Cilaos, Hauts de l’Est et du Sud), les abris sous roche et les cavernes reviennent souvent : foyers, restes de repas, objets du quotidien.',
 h:'Programme archéologique sur le marronnage (Anne-Laure Dijoux et autres) : sites en abri sous roche et en grotte dans les cirques et les remparts ; l’archéologie de l’océan Indien (« Le marronnage ») en présente plusieurs.',
 o:[{n:'S’installer sous la roche',d:'Santé +3, traque −4',fx:{sante:3,traque:-4}},{n:'Garder les cases, la caverne pour les jours de pluie',d:'Cohésion +2',fx:{coh:2}}]};
// le panneau 👑 signale les camps-cavernes et les camps inventés
{const f0=figures263;figures263=function(){const r=f0.apply(this,arguments);try{const p=document.getElementById('fig263');if(!p)return r;p.querySelectorAll('div b').forEach(b=>{const i=MAR251.camps.findIndex(c=>c[0]===b.textContent);if(i>=0&&CAV268(i)&&!b.dataset.c268){b.dataset.c268=1;b.insertAdjacentText('beforebegin','🕳 ')}})}catch(e){}return r}}
{const b=document.getElementById('fig263b');if(b)b.onclick=()=>figures263()}
