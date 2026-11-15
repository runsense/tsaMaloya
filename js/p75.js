// ===== p75 : en Histoire, on ne va que par les cases connues, et chaque bras porte à 7 cases =====
// Envoyer des gens loin du camp : le chemin passe par les cases déjà découvertes (la case visée peut être neuve, si elle touche le connu).
// Un bras porte à 7 cases ; 2 bras à 14… On voit les envoyés marcher case après case ; le résultat de l'action ne tombe qu'à leur arrivée.
const LOIN75=['chasse','cueil','explorer','guet','examiner','peche','pecheM','tunnel','cristal','jardin','jf','camp','descente','course','embuscade','cabot'];
const CASES_PAR_BRAS=7;
function connu75(i){const o=S.t[i];return !!(o&&(o.s||o.b))}
function chemin75(t){const cs=camps();if(!cs.length)return null;const dep=new Map(),q=[];cs.forEach(c=>{dep.set(c.i,null);q.push(c.i)});
 while(q.length){const i=q.shift();if(i===t.i)break;for(const j of T[i].nb){if(dep.has(j))continue;if(j!==t.i&&!connu75(j))continue;dep.set(j,i);q.push(j)}}
 if(!dep.has(t.i))return null;const P=[];let i=t.i;while(i!=null){P.unshift(i);i=dep.get(i)}return P}
const MARCHE75=[];
{const ag=agir;agir=function(t,id,libre){try{if(libre||typeof modeHist!=='function'||!modeHist()||!LOIN75.includes(id)||!S||S.fin)return ag.apply(this,arguments);
  const a=actions(t).find(x=>x.id===id);if(!a)return ag.apply(this,arguments);if(camps().some(c=>c.i===t.i))return ag.apply(this,arguments);
  const P=chemin75(t);if(!P){toast('Aucun chemin connu jusque-là : il faut d’abord découvrir les cases entre le camp et ce lieu.');return false}
  const L=P.length-1,n=Math.max(1,a.c||1);if(L>n*CASES_PAR_BRAS){const il=Math.ceil(L/CASES_PAR_BRAS);toast('Trop loin : '+L+' cases par les chemins connus. Un bras porte à '+CASES_PAR_BRAS+' cases : il en faudrait '+il+'.');return false}
  if(L<=1)return ag.apply(this,arguments);
  if(S.bras<a.c||(a.r&&!peut(a.r))||(id==='camp'&&S.vivres<campV()))return false;
  snap();S.bras-=a.c;if(a.r)paye(a.r);
  const nm=S.voieC?['homme_chemise','femme_travail','jeune_pagne']:['p1a_chasseur','femme_sagaie','jeune_pagne'],k='hv'+Date.now()%100000+'_'+Math.floor(Math.random()*999);
  const dur=Math.min(9,L*.6)*1000;MARCHE75.push({k,P,n:Math.min(3,a.c||1),nm,t0:performance.now(),dur,fin:()=>{let ok=false;try{ok=ag.call(null,t,id,true)}catch(e){}if(!ok){S.bras+=a.c;log('Les envoyés reviennent sans avoir rien pu faire.')}try{sauve();panneau();rafraichir()}catch(e){}}});
  log((a.c>1?a.c+' personnes partent':'Une personne part')+' vers '+(lieuDe(t)||lieuProche(t)||'un lieu des Hauts')+' : '+L+' cases par les chemins connus.');try{panneau();rafraichir()}catch(e){}return true}catch(e){return ag.apply(this,arguments)}}}
// les envoyés marchent sur la carte, case après case ; à l'arrivée, l'action se fait
{const b0=bat;bat=function(k){b0.apply(this,arguments);try{if(!MARCHE75.length||typeof mfPoser!=='function')return;const now=performance.now();
 for(let m=MARCHE75.length-1;m>=0;m--){const w=MARCHE75[m],u=Math.min(1,(now-w.t0)/w.dur),f=u*(w.P.length-1),i=Math.min(w.P.length-2,Math.floor(f)),r=f-i,A=T[w.P[i]],B=T[w.P[i+1]];
  const x=A.x+(B.x-A.x)*r,z=A.z+(B.z-A.z)*r,ang=Math.atan2(B.x-A.x,B.z-A.z);
  for(let j=0;j<w.n;j++){const dx=-Math.sin(ang)*j*.16,dz=-Math.cos(ang)*j*.16;mfPoser(w.k+'_'+j,w.nm[j%w.nm.length],x+dx,Math.max(0,alt(x+dx,z+dz))*VX+.02,z+dz,ang,'marche')}
  if(u>=1){MARCHE75.splice(m,1);w.fin()}}}catch(e){}}}
