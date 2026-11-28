// ===== p405 : le personnage incarné a sa vie. I : son inventaire (le bertel, l'eau de la calebasse… ou, pour un gouverneur, un corsaire,
// un arrivant de métropole, les objets de son état). P : son statut — époque, état, ancienneté, et ce qu'il sait faire. Une horloge tourne
// (une heure du jeu = 45 s) et chacun a ses tâches selon l'heure : on les fait (T, au bon moment) ou non. Une tâche oubliée change la vie
// du camp ou de l'habitation, et, côté marron, une nuit sans guet peut coûter la vie d'un des siens.
// Les tâches et objets reconstituent la vie quotidienne d'après les travaux d'histoire (habitations, camps, Compagnie, marine) : c'est
// une reconstitution du jeu, pas une archive d'un jour précis. =====
const VIE405={};
function role405(I){const C=I&&I.C;if(!C)return 'marron';const h=C.heros||{},m=h.m||'',n=(h.n||'')+' '+(C.t||'')+' '+(C.intro||'');
 if(/gouverneur/i.test(m+' '+h.n))return 'gouverneur';if(/commandeur/i.test(m+' '+h.n))return 'commandeur';if(/arriv|débarqu|métropole|engagé/i.test(n))return 'arrivant';
 const c=typeof camp344==='function'?camp344(I):null;if(c==='marin344')return 'corsaire';if(c==='colon344')return 'colon';return 'marron'}
function an405(I){const m=I&&I.C&&String(I.C.an||'').match(/1[5-9]\d\d|20\d\d/);if(m)return +m[0];return +((typeof S!=='undefined'&&S&&S.year)||1700)}
// ---------- les objets de chaque état ----------
const OBJ405={
 bertel:['🧺','Bertel','Sac de vacoa tressé, porté sur le dos : on y met le bois, la viande, les plantes. Sans lui, on porte peu.'],
 calebasse:['🫙','Calebasse','Courge séchée, bouchée d’un tampon. Elle garde deux gorgées d’eau pour la route.'],
 couteau:['🔪','Couteau à cannes','Pris à l’habitation. Il coupe, taille, et frappe le silex.'],
 sagaie:['🗡','Sagaie','Lance de bois durci au feu, pointe de fer quand on en a. Pour le cabri, le cochon marron.'],
 pierre:['🪨','Pierre à fusil','Un silex venu d’Europe — il n’y en a pas dans l’île volcanique. Avec le fer, il donne l’étincelle.'],
 plantes:['🌿','Plantes','Feuilles et écorces pour soigner : les tisaneurs du camp savent lesquelles.'],
 bois:['🪵','Bois sec','Pour le feu. Le bois mouillé fume et trahit le camp.'],viande:['🥩','Viande crue','À cuire avant de manger.'],camaron:['🦐','Camarons','Pêchés sous les galets de la rivière.'],cuit:['🍖','Repas cuit','Se mange tout de suite ou se garde un jour.'],
 lettres:['📜','Lettres de la Compagnie','Ordres venus de Paris ou de Pondichéry, six mois de mer. On y répond avant le départ du prochain navire.'],
 sceau:['🔏','Sceau','Le sceau du gouvernement : sans lui, aucun ordre n’a de valeur.'],registre:['📒','Registre','Récoltes, magasin, recensement : tout s’écrit, la Compagnie compte.'],
 montre:['⌚','Montre de poche','Rare et chère. Elle donne l’heure — ici, elle sert aussi d’ostensoir du rang.'],bourse:['💰','Bourse','Piastres d’Espagne, la monnaie qui circule vraiment dans l’océan Indien.'],
 pistolet:['🔫','Pistolet à silex','Un coup, puis il faut recharger : poudre, bourre, balle.'],sabre:['⚔','Sabre d’abordage','Court, lourd, fait pour les ponts encombrés.'],
 lunette:['🔭','Longue-vue','Pour reconnaître un pavillon avant qu’il ne vous reconnaisse.'],compas:['🧭','Compas et octant','La latitude au soleil de midi. La longitude, avant les chronomètres, s’estime — et l’on se trompe.'],
 lettremarque:['📃','Lettre de marque','Ce qui sépare le corsaire du pirate : une autorisation du roi d’attaquer les navires ennemis en temps de guerre.'],
 malle:['🧳','Malle','Tout ce qu’on a apporté de France : linge, outils, un livre.'],recommandation:['✉','Lettre de recommandation','Pour le gouverneur. Sans appui, l’arrivant n’obtient ni terre ni place.'],
 chapeau:['👒','Chapeau','Le soleil des tropiques n’est pas celui de Normandie.'],fusil:['🔫','Fusil','Fusil à silex. La poudre se garde sous clé : les marrons en manquent.'],
 cles:['🗝','Clés du magasin','Riz, maïs, poudre : celui qui tient les clés tient l’habitation.'],cloche:['🔔','Cloche de l’atelier','Elle sonne le réveil avant le jour, la pause, la fin du travail.']};
const INV405={gouverneur:{lettres:1,sceau:1,registre:1,montre:1,bourse:40},corsaire:{pistolet:1,sabre:1,lunette:1,compas:1,lettremarque:1,bourse:25},
 arrivant:{malle:1,recommandation:1,chapeau:1,bourse:6},colon:{fusil:1,cles:1,registre:1,bourse:12},commandeur:{cloche:1,registre:1,couteau:1}};
// ---------- les tâches de la journée ----------
// de, a : heures ; c(I) : la tâche se vérifie d'elle-même (sinon T, sur place, pendant la fenêtre) ; ko : ce qui arrive si on ne la fait pas
const fx405=(o,txt)=>{try{if(typeof S!=='undefined'&&S&&typeof fx==='function')fx(o);if(typeof log==='function')log(txt)}catch(e){}};
const TACHE405={
 marron:[{de:5,a:8,t:'Puiser l’eau à la ravine pour le camp',c:I=>I.st&&I.st.sac.calebasse?I.st.sac.eau>=2:null,ko:()=>{fx405({sante:-2},'Au camp, on a eu soif : personne n’est descendu à la ravine.');return 'Le camp a eu soif.'}},
  {de:8,a:12,t:'Rapporter du bois sec (deux brassées)',c:I=>I.st?I.st.sac.bois>=2:null,ko:()=>{fx405({vivres:-2},'Pas de bois sec : on n’a pas pu cuire.');return 'Pas de feu pour cuire.'}},
  {de:12,a:17,t:'Chasser ou pêcher : rapporter à manger',c:I=>I.st?(I.st.sac.viande+I.st.sac.camaron+I.st.sac.cuit)>=1:null,ko:()=>{fx405({vivres:-3},'Rien rapporté de la chasse : les enfants se couchent le ventre vide.');return 'Le camp jeûne ce soir.'}},
  {de:18,a:20,t:'Couvrir le feu avant la nuit : la fumée se voit de loin',dur:4,ko:()=>{fx405({traque:6},'Le feu est resté à découvert : sa lueur s’est vue d’en bas.');return 'La lueur du feu s’est vue d’en bas.'}},
  {de:21,a:24,t:'Monter la garde sur le sentier',dur:6,ko:()=>{const tq=(typeof S!=='undefined'&&S&&S.traque)||0;if(tq>45&&Math.random()<.6){fx405({gens:-1,coh:-4,traque:4},'Personne au guet : les chasseurs de marrons ont surpris le camp. L’un des vôtres est tué.');return 'Personne au guet : un des vôtres est tué.'}fx405({traque:4},'Personne au guet cette nuit. Rien n’est arrivé — cette fois.');return 'Une nuit sans guet. Cette fois, rien.'}}],
 colon:[{de:5,a:6,t:'Appeler l’atelier et répartir le travail',dur:3,ko:()=>{fx405({},'Sur l’habitation, le travail a commencé tard.');return 'Le travail a commencé tard.'}},
  {de:7,a:11,t:'Visiter les champs',dur:5,ko:()=>'Les champs n’ont pas été vus : le commandeur décide seul.'},
  {de:12,a:14,t:'Tenir le registre des récoltes',dur:4,ko:()=>'Le registre a des trous : la Compagnie le verra.'},
  {de:17,a:19,t:'Enfermer la poudre et les fusils sous clé',dur:3,ko:()=>{fx405({},'Au soir, un fusil et de la poudre ont disparu d’une habitation : les marrons s’arment.');try{S.fu=(S.fu||0)+1}catch(e){}return 'Un fusil a disparu dans la nuit.'}}],
 gouverneur:[{de:8,a:10,t:'Tenir séance au Conseil',dur:5,ko:()=>'Le Conseil a siégé sans vous.'},
  {de:10,a:13,t:'Répondre aux lettres de la Compagnie avant le départ du navire',dur:6,ko:()=>{fx405({traque:-3},'Le navire est parti sans le courrier du gouverneur : à Paris, on le juge négligent, les détachements attendent les ordres.');return 'Le navire est parti sans vos lettres.'}},
  {de:15,a:17,t:'Inspecter le magasin de la Compagnie',dur:5,ko:()=>'Le magasin n’a pas été vu : on dit que le garde-magasin revend.'},
  {de:18,a:19,t:'Assister à la messe du soir',dur:3,ko:()=>'Le curé l’a noté.'}],
 commandeur:[{de:4,a:5,t:'Sonner la cloche avant le jour',dur:2,ko:()=>'La cloche n’a pas sonné : le maître vous fait appeler.'},
  {de:6,a:11,t:'Mener la charrette des champs au moulin',dur:6,ko:()=>'La canne coupée attend au soleil et perd son sucre.'},
  {de:17,a:19,t:'Rendre compte au maître',dur:3,ko:()=>'Pas de compte rendu : le maître doute de vous.'}],
 corsaire:[{de:6,a:7,t:'Relever le quart et inspecter le gréement',dur:3,ko:()=>'Une manœuvre a lâché dans la nuit.'},
  {de:11,a:13,t:'Faire le point à midi (hauteur du soleil)',dur:4,ko:()=>{fx405({vivres:-2},'Point manqué : le navire dérive et perd deux jours.');return 'Point manqué : deux jours perdus.'}},
  {de:20,a:22,t:'Doubler la veille de nuit',dur:4,ko:()=>'Une voile est passée sans être vue.'}],
 arrivant:[{de:9,a:12,t:'Se présenter au gouverneur avec sa lettre',dur:5,ko:()=>'Personne ne vous a reçu : pas de terre pour vous cette saison.'},
  {de:13,a:16,t:'Acheter des vivres au magasin',c:I=>I.inv405&&I.inv405.bourse<6,ko:()=>'Rien acheté : le soir, vous dépendez de la charité des voisins.'},
  {de:17,a:19,t:'Trouver un abri pour la nuit',dur:4,ko:()=>'Une nuit dehors sous l’averse : la fièvre vous guette.'}]};
// ---------- statut ----------
function statut405(I){const r=role405(I),y=an405(I),C=I.C||{},h=C.heros||{},ep=y<1665?'avant la colonie':y<1767?'temps de la Compagnie des Indes':y<1789?'administration royale':y<1815?'Révolution et Empire':y<1848?'colonie esclavagiste':y<1946?'colonie après l’abolition':'département';
 const ne=/né|née/.test(C.intro||'')&&/camp/.test(C.intro||'');const T={
  marron:['Marron des Hauts',ne?'Né au camp — n’a jamais connu les habitations':(/fuite|quitte|fuit/.test((C.intro||'')+(C.t||''))?'Quelques jours de liberté':'Plusieurs saisons dans les Hauts'),{'Connaissance du pays':ne?92:60,'Discrétion':80,'Autorité':ne?55:30,'Liens aux ancêtres':70}],
  colon:['Habitant',y<1715?'Parmi les premiers habitants':'Établi depuis une génération',{'Connaissance du pays':45,'Discrétion':20,'Autorité':60,'Fortune':50}],
  gouverneur:['Gouverneur',y<1767?'Nommé par la Compagnie des Indes':'Nommé par le roi','Débarqué depuis peu — il ne connaît l’île que par les rapports',{}],
  commandeur:['Commandeur','Esclave ou libre de couleur placé au-dessus de l’atelier — position fragile entre le maître et les siens',{'Connaissance du pays':55,'Discrétion':30,'Autorité':45}],
  corsaire:['Corsaire',y<1715?'Flibustier devenu corsaire':'Lettre de marque en poche',{'Connaissance du pays':20,'Discrétion':35,'Autorité':70,'Mer':90}],
  arrivant:['Arrivant de métropole','Débarqué il y a quelques jours',{'Connaissance du pays':8,'Discrétion':15,'Autorité':20,'Fortune':15}]}[r];
 if(r==='gouverneur'){T[2]={'Connaissance du pays':25,'Discrétion':5,'Autorité':95,'Fortune':80};T[1]=T[1]+' · '+'Débarqué depuis peu'}
 return {r,y,ep,titre:T[0],anc:T[1],q:T[2],nom:(I.h&&I.h.d&&I.h.d.n)||h.n||''}}
// ---------- l'horloge ----------
function heure405(I){return I.hr405}
function fmt405(h){const H=Math.floor(h)%24,M=Math.floor((h%1)*60);return H+' h '+String(M).padStart(2,'0')}
function init405(I){if(I.hr405!=null)return;const r=role405(I);I.hr405=/nuit/.test((I.C&&I.C.intro)||'')&&r==='marron'?21.5:r==='commandeur'?3.8:r==='marron'?5:6.5;I.jour405=1;I.td405={};I.inv405=INV405[r]?Object.assign({},INV405[r]):null;I.last405=performance.now()}
function tic405(){const I=typeof INC!=='undefined'?INC:null;if(!I||!I.C)return;init405(I);const n=performance.now(),dt=Math.min(1,(n-I.last405)/1000);I.last405=n;
 const p=$('inv405')||$('stat405');if(I.pause||I.duel||I.fini||p)return;const h0=I.hr405,h1=h0+dt/45;
 const L=TACHE405[role405(I)]||[];L.forEach((t,i)=>{const k=I.jour405+':'+i;if(I.td405[k])return;const h=h1;
  if(t.c){const v=t.c(I);if(v===true&&h>=t.de&&h<t.a){I.td405[k]='ok';incMsg287('✔ '+t.t+' — fait.');return}}
  const fin=h0<t.a&&h1>=t.a;if(fin){I.td405[k]='ko';const m=t.ko&&t.ko();incMsg287('✘ '+t.t+' : pas fait. '+(m||''))}});
 I.hr405=h1;if(I.hr405>=24){I.hr405-=24;I.jour405++;I.td405={}}bande405(I)}
setInterval(tic405,250);
// ---------- l'affichage : l'heure et la tâche du moment, en haut à droite ----------
function courante405(I){const L=TACHE405[role405(I)]||[],h=I.hr405;let c=null,ci=-1;L.forEach((t,i)=>{const k=I.jour405+':'+i;if(I.td405[k])return;if(h>=t.de&&h<t.a&&!c){c=t;ci=i}});if(c)return [c,ci,1];
 let nx=null,nd=99;L.forEach((t,i)=>{const k=I.jour405+':'+i;if(I.td405[k])return;const d=(t.de-h+24)%24;if(d<nd){nd=d;nx=t;ci=i}});return nx?[nx,ci,0]:[null,-1,0]}
function bande405(I){let d=$('band405');if(!d){d=document.createElement('div');d.id='band405';d.style.cssText='position:absolute;right:12px;top:118px;max-width:300px;color:#f4ecd8;font:13px Georgia,serif;text-shadow:0 1px 3px #000;background:rgba(20,16,10,.5);padding:6px 10px;border-radius:6px;text-align:right;pointer-events:none';I.el.appendChild(d)}
 const h=I.hr405,ic=h>=6&&h<18.5?'☀':'🌙',[t,ci,maint]=courante405(I),st=statut405(I);const fait=Object.values(I.td405).filter(x=>x==='ok').length,rate=Object.values(I.td405).filter(x=>x==='ko').length;
 d.innerHTML='<b>'+ic+' '+fmt405(h)+'</b> · jour '+I.jour405+'<br><small>'+st.titre+'</small>'+(t?'<br>'+(maint?'<b style="color:#ffd27a">À faire : '+t.t+'</b><br><small>jusqu’à '+t.a+' h'+(t.c?'':' — T pour le faire')+'</small>':'<small>Ensuite, à '+t.de+' h : '+t.t+'</small>'):'')+'<br><small style="opacity:.75">✔ '+fait+' · ✘ '+rate+' · I inventaire · P statut</small>';
 // la nuit tombe sur l'écran
 let n=$('nuit405');if(!n){n=document.createElement('div');n.id='nuit405';n.style.cssText='position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% 55%,rgba(8,12,30,0) 30%,rgba(6,8,22,.85) 100%);transition:opacity 2s';I.el.insertBefore(n,I.el.children[1]||null)}
 const nu=h<5?1:h<6.5?(6.5-h)/1.5:h<18?0:h<19.5?(h-18)/1.5:1;n.style.opacity=(nu*.75).toFixed(2)}
// ---------- T : faire la tâche du moment ----------
function faire405(){const I=INC;if(!I||I.pause||!I.st)return;const [t,ci,maint]=courante405(I);if(!t||!maint){incMsg287(t?'Pas encore : « '+t.t+' » se fait à partir de '+t.de+' h.':'Plus rien à faire aujourd’hui.');return}
 if(t.c&&t.c(I)!==null){incMsg287('« '+t.t+' » : ça se fait sur le terrain — '+(/eau/.test(t.t)?'remplissez la calebasse à la rivière.':/bois/.test(t.t)?'ramassez du bois sec (E).':/manger|chasser/i.test(t.t)?'chassez ou pêchez.':'faites-le, et ce sera compté.'));return}
 if(I.st.occ){incMsg287('Vous êtes déjà occupé.');return}const k=I.jour405+':'+ci;occ290(I,t.t+'…',t.dur||4,()=>{I.td405[k]='ok';incMsg287('✔ '+t.t+' — fait.');bande405(I)})}
// ---------- I : l'inventaire ; P : le statut ----------
function fermePan405(){['inv405','stat405'].forEach(id=>{const e=$(id);if(e)e.remove()});const I=INC;if(I&&I.pause405){I.pause=0;I.pause405=0}}
function pan405(id,html){const I=INC;fermePan405();const d=document.createElement('div');d.id=id;d.style.cssText='position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(560px,calc(100% - 32px));max-height:78vh;overflow:auto;background:rgba(24,19,13,.95);color:#f0e6d0;border:1px solid #c9a24a;border-radius:10px;padding:16px 18px;font:14px Georgia,serif;z-index:30;box-shadow:0 10px 40px rgba(0,0,0,.6)';
 d.innerHTML=html+'<p style="text-align:right;margin:10px 0 0"><button class="bt sec" id="x405">Fermer (Échap)</button></p>';I.el.appendChild(d);d.querySelector('#x405').onclick=fermePan405;if(!I.pause){I.pause=1;I.pause405=1}}
function inventaire405(){const I=INC;if(!I||!I.st)return;init405(I);const r=role405(I),sac=I.st.sac,L=[];
 const ligne=(k,q)=>{const o=OBJ405[k];if(!o)return;L.push('<tr><td style="font-size:22px;padding:4px 8px">'+o[0]+'</td><td><b>'+o[1]+'</b>'+(q!=null?' <span style="color:#e8be5a">'+q+'</span>':'')+'<br><small style="opacity:.8">'+o[2]+'</small></td></tr>')};
 if(r==='marron'||r==='commandeur'){['bertel','calebasse','couteau','sagaie','pierre'].forEach(k=>{if(sac[k])ligne(k,k==='calebasse'?'eau '+sac.eau+'/2':null)});['plantes','bois','viande','camaron','cuit'].forEach(k=>{if(sac[k])ligne(k,'×'+sac[k])})}
 if(I.inv405)Object.entries(I.inv405).forEach(([k,q])=>{if(!q)return;if(r==='commandeur'&&k==='couteau'&&sac.couteau)return;ligne(k,k==='bourse'?q+' piastres':null)});
 const cap=sac.bertel?8:3,nb=(sac.bois||0)+(sac.viande||0)+(sac.camaron||0)+(sac.cuit||0);
 pan405('inv405','<small style="color:#e8be5a;letter-spacing:.08em;text-transform:uppercase">Inventaire · I</small><h3 style="margin:4px 0 8px">'+(statut405(I).nom||'Vous')+'</h3>'+(L.length?'<table>'+L.join('')+'</table>':'<p>Les mains vides. Tout ce qu’on trouve, il faudra le porter.</p>')+
  ((r==='marron'||r==='commandeur')?'<p><small>Charge : '+nb+' / '+cap+(sac.bertel?' (avec le bertel)':' (à bras)')+'</small></p>':'<p><small>Pas de bertel ni de calebasse : votre état vous fait porter par d’autres, ou acheter ce qu’il faut.</small></p>'))}
function statutPan405(){const I=INC;if(!I||!I.C)return;init405(I);const s=statut405(I),bar=(v)=>'<span style="display:inline-block;width:140px;height:8px;background:#3a2e1e;border-radius:4px;vertical-align:middle"><span style="display:block;height:8px;border-radius:4px;width:'+Math.max(0,Math.min(100,v))+'%;background:#d8b25a"></span></span>';
 const q=Object.assign({},s.q);if(I.st){q['Soif (réserve)']=I.st.soif;q['Faim (réserve)']=I.st.faim}if(I.endu!=null)q['Endurance']=I.endu;
 const L=TACHE405[s.r]||[],td=L.map((t,i)=>{const v=I.td405[I.jour405+':'+i];return '<li>'+(v==='ok'?'✔':v==='ko'?'✘':'·')+' '+t.de+'–'+t.a+' h : '+t.t+'</li>'}).join('');
 pan405('stat405','<small style="color:#e8be5a;letter-spacing:.08em;text-transform:uppercase">Statut · P</small><h3 style="margin:4px 0 2px">'+(s.nom||s.titre)+'</h3><p style="margin:0 0 8px"><b>'+s.titre+'</b> · '+s.y+' — '+s.ep+'<br><small>'+s.anc+'</small></p><table>'+Object.entries(q).map(([k,v])=>'<tr><td style="padding:2px 10px 2px 0">'+k+'</td><td>'+bar(v)+' <small>'+Math.round(v)+'</small></td></tr>').join('')+'</table>'+
  '<p style="margin:10px 0 4px"><b>La journée</b> · '+fmt405(I.hr405)+', jour '+I.jour405+'</p><ul style="margin:0;padding-left:18px">'+td+'</ul><p><small style="opacity:.7">Les tâches reconstituent la vie quotidienne de cet état, d’après les travaux d’histoire : reconstitution du jeu, pas l’archive d’une journée précise.</small></p>')}
addEventListener('keydown',e=>{const I=typeof INC!=='undefined'?INC:null;if(!I||I.duel||!I.C)return;if(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName))return;const k=(e.key||'').toLowerCase();
 if(k==='escape'&&($('inv405')||$('stat405'))){e.preventDefault();e.stopImmediatePropagation();fermePan405();return}
 if(k==='i'){e.preventDefault();e.stopImmediatePropagation();if($('inv405'))fermePan405();else inventaire405();return}
 if(k==='p'){e.preventDefault();e.stopImmediatePropagation();if($('stat405'))fermePan405();else statutPan405();return}
 if(k==='t'&&!$('inv405')&&!$('stat405')){e.preventDefault();e.stopImmediatePropagation();faire405()}},true);
try{Object.assign(window.TR363=window.TR363||{},{'Inventaire · I':'Inventory · I','Statut · P':'Status · P','Fermer (Échap)':'Close (Esc)','La journée':'The day'})}catch(e){}
