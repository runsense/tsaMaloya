
// ===== Jeu : se nourrir ou mourir. La faim et les intempéries sont la vraie difficulté =====
TACHES.peche=['Pêcher','pêche'];TLIEU.push('peche');
{const lo=lieuOK;lieuOK=function(p,k,t){if(k!=='peche')return lo(p,k,t);const c=T[campDe(p)];if(!c||!t||hd(c,t)>2||t.bare)return false;const o=S.t[t.i]||{};return !!(o.s&&t.riv)}}
{const al=autoLieu;autoLieu=function(p,k){if(k!=='peche')return al(p,k);const c=T[campDe(p)];if(!c)return null;const L=T.filter(t=>hd(c,t)<=2&&lieuOK(p,'peche',t)).sort((a,b)=>hd(c,a)-hd(c,b));return L.length?L[0].i:null}}
SAVOIRS.boucan={n:'Boucaner et sécher',c:2,bt:'Demande un mystique au camp, ou la voie coloniale',bes:()=>!!S.voieC||(typeof roleL==='function'&&roleL('mys').length>0),br:'Nourrir II',d:'Fumer la viande au-dessus du feu, sécher les poissons et les racines : le camp peut enfin garder des vivres plusieurs jours sans qu’ils se gâtent.'};
const FAIM={conso:p=>!adulte(p)?.2:ageP(p)>=45?.25:.3};
function faimCap(){const n=(S.pp||[]).length||S.gens||1;if(S.voieC)return 9999;return n*(S.sv.boucan?4:2.5)+(typeof nBat==='function'?nBat('grenier')*30:0)}
function faimDepart(){if(S.jeuVivres)return;S.jeuVivres=1;
 if(!S.voieC){S.vivres=Math.max(3,Math.round(((S.pp||[]).length||S.gens||8)*.6));journal('Le camp n’a presque rien : quelques racines, un peu de viande. Ici, on se nourrit chaque jour ou on meurt.');return}
 const O=[['de France',5,8,[0,2]],['de Madagascar',1,24,[2,5]],['de l’Inde',2,16,[1,3]]][Math.floor(rnd()*3)];
 S.vivres=O[2];const b=O[3][0]+Math.floor(rnd()*(O[3][1]-O[3][0]+1));S.bet=(S.bet||0)+b;
 journal('Le navire venu '+O[0]+' a mis '+(O[1]===1?'quelques semaines':O[1]+' mois')+' en mer : il reste '+O[2]+' vivres dans la cale'+(b?' et '+b+' bête'+(b>1?'s ont':' a')+' survécu au voyage.':', et aucune bête n’a survécu au voyage.'))}
function faimJour(){if(!S||modeHist()||!grpOn()||S.fin||!camps().length)return;faimDepart();
 const P=(S.pp||[]).filter(p=>!enGrp(p));let c=P.reduce((s,p)=>s+FAIM.conso(p),0);S.vivres-=c;
 const mys=typeof roleL==='function'&&roleL('mys').some(p=>!enGrp(p));
 // la pêche, et ce que le mystique sait sans le voir
 P.filter(p=>adulte(p)&&tacheDe(p)==='peche').forEach(p=>{const ok=rnd()<.45+(mys?.25:0);if(ok){S.vivres+=1+(mys?.5:0);dire(p,rnd()<.4?'Une anguille sous la roche !':'Des chevrettes sous les galets.');if(rnd()<.3)journal(p.n.split(' ')[0]+' revient de la rivière avec du poisson'+(mys?' : le mystique lui avait dit où chercher.':'.'))}else dire(p,'Rien ne mord.')});
 if(!S.voieC){P.filter(p=>adulte(p)&&tacheDe(p)==='chasse').forEach(p=>{if(mys&&rnd()<.15){S.vivres+=1.5;dire(p,'Le mystique avait vu le gibier.');journal('Sans quitter le camp, le mystique a senti où passait le gibier : '+p.n.split(' ')[0]+' l’a trouvé.')}});
  P.filter(p=>tacheDe(p)==='cueil').forEach(p=>{if(mys)S.vivres+=.2;else if(rnd()<.04){fx({sante:-3});journal(p.n.split(' ')[0]+' a rapporté des baies qui rendent malade. Un mystique aurait su les reconnaître.')}});
  if(mys&&(S.jourN||0)%5===0&&S.trp){const c0=camps()[0];S.trp.filter(h=>h.n>0&&hd(T[h.i],c0)<=4&&!(S.t[h.i]||{}).s).slice(0,1).forEach(h=>{tl(h.i).s=1;journal('Le mystique voit au loin des '+(h.k==='cochon'?'cochons marrons':'cabris')+', vers '+(lieuDe(T[h.i])||lieuProche(T[h.i])||'la forêt')+', sans y être allé.')})}}
 // ce que rapportent chaque jour ceux qui nourrissent le camp, et le bétail des colons
 P.filter(p=>adulte(p)&&(p.tache||p.role)&&['cueil','chasse','cuisine','peche'].includes(tacheDe(p))).forEach(p=>{const k=tacheDe(p);S.vivres+=k==='cuisine'?.15:k==='peche'?.25:.4+(p.role?.15:0)});
 if(S.voieC&&S.bet)S.vivres+=Math.min(S.bet,8)*.12;
 // sans savoir garder, ce qui dépasse se gâte
 P.filter(p=>adulte(p)&&!['cueil','chasse','cuisine','peche','garde'].includes(tacheDe(p))).forEach(()=>{S.vivres+=.08});
 const cap=faimCap();if(S.vivres>cap){const perte=(S.vivres-cap)*.15;S.vivres-=perte;if(perte>.5&&!S.ditGate){S.ditGate=1;journal('La viande et les fruits se gâtent vite : sans savoir boucaner ni sécher, le camp ne garde rien plus de quelques jours.')}}
 // la famine
 if(S.vivres<0){S.vivres=0;S.faimJ=(S.faimJ||0)+1;P.forEach(p=>p.fat=Math.min(100,(p.fat||0)+12));fx({sante:-2,coh:-1});journal(S.faimJ===1?'Il n’y a plus rien à manger ce soir.':'La faim dure depuis '+S.faimJ+' jours : les gens s’affaiblissent.');if(!CV.on)toast('Famine : '+S.faimJ+' jour'+(S.faimJ>1?'s':'')+' sans manger');
  if(S.faimJ>=2&&rnd()<.3+S.faimJ*.08){const f=P.filter(p=>p.bl||!adulte(p)||ageP(p)>=45).sort((a,b)=>(b.bl?1:0)-(a.bl?1:0))[0]||P[Math.floor(rnd()*P.length)];if(f){S.pp=S.pp.filter(q=>q!==f);S.gens=Math.max(0,(S.gens||1)-1);journal(f.n+' meurt de faim.');log(f.n+' est mort'+(f.g==='f'?'e':'')+' de faim.')}if(!S.pp.length&&!(S.grp||[]).length&&!S.espP){fin('mort');return}}}
 else if(S.faimJ){if(S.faimJ>=2)journal('On mange enfin. Le camp reprend des forces.');S.faimJ=0}}
{const jt=jourTick;jourTick=function(){jt();faimJour()}}
// en sortie, un mystique dans le groupe sait où est le gibier
{const ej=expJour;expJour=function(){(S.grp||[]).forEach(g=>{if(g.exp&&g.exp.etat==='sur place'&&g.exp.but==='chasse'&&grpMembres(g).some(p=>p.role==='mys')&&rnd()<.2)g.exp.charge+=1.5});ej()}}
// quand la faim menace, ceux qui n'ont pas de rôle partent d'eux-mêmes chercher à manger
{const td=tacheDe;tacheDe=function(p){if(!p.tache&&!p.role&&!p.bl&&p.id!==S.garde&&!modeHist()&&grpOn()&&ageP(p)>=12){const b=(S.pp||[]).reduce((s,q)=>s+FAIM.conso(q),0);if((S.vivres||0)<b*2)return (p.id%3===0&&T.some(t=>t.riv&&lieuOK(p,'peche',t)))?'peche':'cueil'}return td(p)}}

// ===== Jeu : les intempéries. Un coup de vent peut tout emporter si l'on n'a rien préparé =====
function intemperie(){if(!S||modeHist()||!grpOn()||S.fin||!camps().length)return;const p=(typeof pluie==='function'&&pluie())?.06:.02;if(rnd()>=p)return;
 const fort=rnd()<.35,C=S.voieC,g=typeof nBat==='function'?nBat('grenier'):0;S.vent={f:fort,j:S.jourN,vu:0};
 journal(fort?'Un coup de vent d’une violence terrible passe sur '+(C?'l’habitation':'le camp')+' : la pluie couche tout pendant une nuit entière.':'Une grosse pluie et du vent toute la nuit sur '+(C?'l’habitation':'le camp')+'.');if(!CV.on)toast(fort?'Coup de vent : '+(C?'l’habitation':'le camp')+' est dévasté':'Intempérie');
 // les vivres : sans grenier ni savoir, l'eau et le vent en emportent une part
 const pr=(fort?.5:.2)*(g?.4:1)*(S.sv.boucan||S.sv.kitoza?.7:1);if(S.vivres>0){const l=S.vivres*pr;S.vivres-=l;if(l>.5)journal('Une partie des vivres est gâtée ou emportée'+(g?', le grenier en a sauvé le reste.':'.'))}
 (S.pp||[]).forEach(q=>q.fat=Math.min(100,(q.fat||0)+(fort?15:6)));fx({sante:fort?-3:-1});
 // la clôture : abîmée, elle doit être réparée avant le prochain coup de vent
 const en=typeof nBat==='function'?nBat('enclos'):0;
 if(S.bet>0&&(!en||S.clotAb)&&(fort||S.clotAb)){const n=S.bet;S.bet=0;S.clotAb=0;const c=camps()[0];const L=T.filter(u=>typeof trpOK==='function'&&trpOK(u)&&hd(u,c)>=1&&hd(u,c)<=2);const u=L[Math.floor(rnd()*L.length)];if(u&&S.trp){S.trp.push({i:u.i,n:n,k:'cabri',ch:0});tl(u.i).s=1}
  journal(en?'La clôture abîmée n’a pas tenu : les '+n+' bêtes se sont enfuies dans la nuit. On les voit brouter, redevenues sauvages, '+(u?'vers '+(lieuDe(u)||lieuProche(u)||'la lisière'):'pas très loin')+'.':'Sans clôture, les '+n+' bêtes ont fui le vent. Elles vivent maintenant en liberté '+(u?'vers '+(lieuDe(u)||lieuProche(u)||'la lisière'):'pas très loin')+' : il faudra les chasser.');log((C?'L’habitation':'Le camp')+' perd son bétail : il est parti à l’état sauvage.')}
 else if(en&&fort&&!S.clotAb){S.clotAb=1;journal('La clôture de l’enclos est arrachée par endroits. Sans réparation, le prochain coup de vent libérera les bêtes.')}}
{const jt=jourTick;jourTick=function(){jt();intemperie()}}
// réparer la clôture, depuis la vie du camp
{const cl=cvListe;cvListe=function(){cl();if(!S||!S.clotAb||!CV.on)return;const d=$('cvL');if(!d)return;const o=document.createElement('div');o.className='pc';o.innerHTML='<b>La clôture est abîmée</b> <small>· sans réparation, le prochain coup de vent libère le bétail.</small><br><button class="bt" id="clotR"'+((S.res&&S.res.bois>=1)?'':' disabled')+'>Réparer (1 bois)</button>';d.insertBefore(o,d.children[1]||null);o.querySelector('#clotR').onclick=()=>{if(!S.res||S.res.bois<1)return;S.res.bois-=1;S.clotAb=0;journal('La clôture est réparée.');sauve();cvListe()}}}
