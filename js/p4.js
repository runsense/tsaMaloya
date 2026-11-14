
// ===== Jeu : la complicité de l'île sœur. Un réseau secret entre marrons des deux îles =====
// espions déguisés en esclaves, savoirs volés partagés avec les comptoirs, pirogues quand la faim dure
const SOEUR={duree:10,vol:['elevage','vergers','reserves','kitoza','cartes','riz','fer']};
// l'espion quitte le camp : il est gardé à part dans S.espP le temps de sa mission
function soeurOn(){return !!(S&&S.soeur&&!S.voieC&&!modeHist()&&grpOn())}
function soeurVolable(){return SOEUR.vol.filter(k=>SAVOIRS[k]&&!S.sv[k])}
function soeurPartir(p){if(!soeurOn()||!p||enGrp(p)||p.id===S.garde||!adulte(p))return;if(S.espP){toast('Un espion est déjà dans une habitation.');return}
 snap();p.esp={j:0};p.tache=null;p.espCamp=campDe(p);S.espP=p;S.pp=S.pp.filter(q=>q!==p);if(CV.selP===p.id)CV.selP=null;dire(p,'Je reviendrai avec ce qu’ils savent.');
 journal(p.n.split(' ')[0]+' part pour la côte, vêtu comme un esclave des habitations. Le réseau de l’île sœur lui a trouvé une place.');sauve();if(CV.on)cvListe()}
function soeurJour(){if(!S||S.fin||S.voieC||modeHist()||!grpOn())return;
 // le réseau se noue une fois le lien fait avec Maurice
 if(!S.soeur&&S.out&&S.out.maurice){S.soeur=1;journal('Un pêcheur marron venu de l’île sœur accoste de nuit. Là-bas aussi, des gens vivent dans les bois : il propose de ne plus rester seuls, de se passer les nouvelles, les ruses et ce que les maîtres savent.');if(!CV.on)toast('Un réseau secret avec l’île sœur')}
 if(!S.soeur)return;
 // l'espion dans l'habitation
 [S.espP].filter(Boolean).forEach(p=>{p.esp.j++;const agi=(p.sk&&p.sk.agi)||0,mys=p.role==='mys';
  const risque=Math.max(.01,.05-agi*.002-(mys?.015:0));
  if(rnd()<risque){S.espP=null;S.gens=Math.max(0,(S.gens||1)-1);fx({traque:5});journal(p.n+' a été démasqué'+(p.g==='f'?'e':'')+' dans l’habitation. On ne le reverra pas, et les chasseurs savent maintenant qu’un camp envoie des espions.');log(p.n+' est perdu'+(p.g==='f'?'e':'')+' : espion démasqué.');return}
  if(p.esp.j<SOEUR.duree)return;
  delete p.esp;S.espP=null;S.pp.push(p);const L=soeurVolable();
  if(!L.length){journal(p.n.split(' ')[0]+' revient de l’habitation. Les maîtres n’y savaient rien que le camp ne sache déjà.');return}
  const k=L[Math.floor(rnd()*L.length)];S.sv[k]=1;S.soeurVol=(S.soeurVol||0)+1;
  journal(p.n.split(' ')[0]+' revient au camp. Pendant des jours, en servant, il a regardé et retenu : le camp connaît désormais « '+SAVOIRS[k].n+' ».');if(!CV.on)toast('Savoir volé : '+SAVOIRS[k].n);
  // le savoir passe aux comptoirs marrons
  const cp=Object.keys(S.cp||{});if(cp.length){cp.forEach(c=>{S.cp[c].lien=Math.min(100,(S.cp[c].lien||0)+10)});journal('Par le réseau, le savoir passe aussi aux autres camps marrons : les liens se resserrent.')}});
 // la pirogue quand la faim dure
 if((S.faimJ||0)>=2&&!(S.soeurPir>(S.jourN||0))&&rnd()<.35){const v=4+Math.floor(rnd()*3);S.vivres+=v;S.soeurPir=(S.jourN||0)+8;journal('Une pirogue de l’île sœur arrive à la nuit tombée, chargée de '+v+' vivres. Ceux de là-bas savent ce que c’est d’avoir faim.');if(!CV.on)toast('Pirogue de l’île sœur : +'+v+' vivres')}}
{const jt=jourTick;jourTick=function(){jt();soeurJour()}}
// le bouton, dans les ordres de la personne choisie
{const cl=cvListe;cvListe=function(){cl();if(!soeurOn()||!CV.on)return;const d=$('cvL');if(!d)return;const p=ppId(CV.selP);
 const esp=S.espP;
 if(esp){const o=document.createElement('p');o.className='note';o.textContent=esp.n.split(' ')[0]+' sert dans une habitation, déguisé'+(esp.g==='f'?'e':'')+' en esclave (jour '+esp.esp.j+' sur '+SOEUR.duree+').';d.insertBefore(o,d.children[1]||null)}
 if(!p||esp||p.esp||enGrp(p)||p.id===S.garde||!adulte(p)||campDe(p)!==CV.camp)return;
 const o=document.createElement('div');o.className='pc';const n=soeurVolable().length;
 o.innerHTML='<b>Île sœur</b> <small>· le réseau peut placer '+p.n.split(' ')[0]+' dans une habitation pour '+SOEUR.duree+' jours'+(n?'':' (les maîtres ne savent plus rien de neuf)')+'.</small><br><button class="bt sec" id="espB">Partir comme espion</button>';
 d.insertBefore(o,d.children[2]||null);o.querySelector('#espB').onclick=()=>soeurPartir(p)}}
// viande séchée et boucan : un seul savoir de conservation suffit
{const fc=faimCap;faimCap=function(){if(S.sv.kitoza&&!S.sv.boucan){S.sv.boucan=1;const r=fc();delete S.sv.boucan;return r}return fc()}}
