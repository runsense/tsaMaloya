
// ===== Mode Construction : l'île vue de haut, en politique ; deux factions puis trois, puis une quatrième ; bâtir et exploiter selon le savoir et le temps =====
// les colons tiennent les bas, les marrons les hauts ; les mi-pentes se disputent. On ne commande plus les gens : on décide, on bâtit, on arbitre les idées des factions.
const KFAC={c:{n:'Colons',col:'#e8be5a',zone:['Bas','Mi-pentes']},m:{n:'Marrons',col:'#7fc36a',zone:['Hauts','Sommets','Mi-pentes']},p:{n:'Propriétaires',col:'#e8be5a'},e:{n:'Esclaves',col:'#c38f6a'},a:{n:'Affranchis et engagés',col:'#7fc3e8'},s:{n:'Créoles de Bourbon souveraine',col:'#c38fe8'}};
const KBAT={
 habitation:{n:'Habitation',ic:'🏠',f:'c',c:{bois:4},d:'+3 vivres par an ; après 1715, +2 commerce (café).',z:['Bas','Mi-pentes'],t:1},
 champ:{n:'Champ de café',ic:'☕',f:'c',c:{bois:2},d:'+3 commerce par an ; abat la forêt ; demande des bras.',z:['Bas','Mi-pentes'],an:1715,t:1},
 port:{n:'Port',ic:'⚓',f:'c',c:{pierre:5,bois:3},d:'+3 commerce par an ; le roi et la Compagnie regardent l’île.',z:['Bas'],t:2},
 ville:{n:'Ville',ic:'🏛️',f:'c',c:{pierre:6,bois:4},d:'Un bourg : +2 savoir, +confiance des colons. Demande deux habitations proches.',z:['Bas'],t:3},
 route:{n:'Route',ic:'🛤️',f:'c',c:{pierre:2},d:'Relie : les habitations voisines produisent plus. Les marrons y voient une menace.',z:['Bas','Mi-pentes','Hauts'],t:1},
 chapelle:{n:'Chapelle',ic:'⛪',f:'c',c:{pierre:3},d:'+confiance ; protège un peu au cyclone (on s’y abrite).',z:['Bas','Mi-pentes'],t:1},
 magasin:{n:'Magasin',ic:'📦',f:'c',c:{bois:3,pierre:1},d:'Moins de pertes au cyclone.',z:['Bas','Mi-pentes'],t:1},
 camp:{n:'Camp',ic:'🔥',f:'m',c:{bois:2},d:'+2 vivres ; la forêt le cache.',z:['Hauts','Sommets','Mi-pentes'],t:1},
 jardin:{n:'Jardin-forêt',ic:'🌿',f:'m',c:{bois:1},d:'+3 vivres, sans abattre la forêt ; tient au cyclone.',z:['Hauts','Mi-pentes'],t:1},
 grenier:{n:'Grenier',ic:'🌾',f:'m',c:{bois:2},d:'Moins de pertes au cyclone.',z:['Hauts','Sommets','Mi-pentes'],t:1},
 guet:{n:'Poste de guet',ic:'👁️',f:'m',c:{bois:1},d:'Les détachements sont vus venir : moins de pertes aux attaques.',z:['Hauts','Sommets','Mi-pentes'],t:1},
 sentier:{n:'Sentier caché',ic:'〰️',f:'m',c:{bois:1},d:'Relie les camps : entraide, et les idées circulent.',z:['Hauts','Sommets','Mi-pentes'],t:1}};
// les idées que chaque faction porte au conseil : adopter, ou refuser (et elle s’en souvient)
const KIDE={
 c:[['Concessions aux habitants','La Compagnie donne des terres à qui les met en valeur.',{bois:2},{c:6,m:-3},'+1 habitation gratuite'],['Chasser les marrons','Payer des détachements pour monter dans les hauts.',{com:2},{c:5,m:-12},'tension +15'],['Commerce avec la Compagnie','Vendre ce que l’île produit, acheter ce qui manque.',{},{c:4},'+3 commerce par an'],['Laisser les hauts en paix','Ne pas monter : la forêt est à eux.',{},{c:-4,m:8},'tension −15']],
 m:[['Alliance des camps','Les camps se donnent la main : guet commun, partage.',{},{m:8},'les camps produisent +1'],['Raid sur une habitation','Descendre prendre outils et vivres, et libérer qui veut.',{},{m:5,c:-10},'+4 vivres, +2 bois, tension +12'],['Kabar avant le cyclone','Danser et prier ensemble : on dit que le vent épargne ceux qui s’y tiennent.',{viv:2},{m:6},'moins de dégâts au cyclone'],['Garder la forêt','Ne rien couper au-delà du besoin.',{},{m:5},'la forêt repousse plus vite']],
 p:[['Appliquer le Code noir','Encadrer l’esclavage par la loi royale.',{},{p:6,e:-12},'tension interne +10'],['Milice des habitants','Armer les colons contre le marronnage.',{com:2},{p:5,m:-10,e:-4},'tension +10'],['Le samedi aux esclaves','Laisser un jour pour leurs jardins.',{},{p:-4,e:10},'+2 vivres par an']],
 e:[['Le samedi pour soi','Demander un jour pour cultiver son jardin.',{},{e:8,p:-4},'+2 vivres par an'],['Racheter sa liberté','Épargner pour se racheter : lent, mais possible.',{com:1},{e:6,p:-2},'quelques affranchis chaque année'],['Rejoindre les hauts','Partir marron.',{},{e:4,m:6,p:-10},'des bras passent aux marrons'],['Le kabar en secret','Garder les chants et les ancêtres.',{},{e:7},'cohésion des esclaves']],
 a:[['Écoles pour tous','Lire, écrire, compter.',{com:2},{a:8},'+2 savoir par an'],['Terres aux affranchis','Partager les terres des hauts et des bas.',{},{a:8,p:-6},'+2 vivres par an']],
 s:[['Assemblée de l’île','Bourbon se gouverne elle-même depuis la Révolution.',{},{s:10,p:4},'utopie : Bourbon souveraine'],['Abolir ici, par nous-mêmes','Une île libre ne garde pas d’esclaves.',{},{s:6,e:12,p:-10},'utopie : la liberté avant 1848']]};
let K=null;const KCLE='tsa-construction';
// les activités qu'on envoie faire sur un lieu, avec ce qu'elles rapportent par travailleur et par an
const KACT={
 bois:{n:'Couper du bois',ic:'🪓',r:'bois',k:.5,ok:t=>t.forest||(K.foret[t.i]||0)>30,d:'Abat la forêt du lieu.'},
 pierre:{n:'Tirer la pierre',ic:'🪨',r:'pierre',k:.35,ok:t=>t.bare||(t.slope||0)>=8||/Scories|Coulées/.test(t.biome),d:''},
 vivres:{n:'Chasser, cueillir',ic:'🏹',r:'viv',k:.45,ok:t=>t.forest,d:'Le gibier s’épuise si on y reste trop.'},
 peche:{n:'Pêcher',ic:'🐟',r:'viv',k:.55,ok:t=>t.pal==='Bas'&&(t.alt||0)<60,d:''},
 culture:{n:'Cultiver',ic:'🌱',r:'viv',k:.6,ok:t=>(t.slope||0)<10&&!t.bare,d:'Défriche peu à peu.'}};
// combien de bras faut-il pour qu'un bâtiment tourne à plein
const KBRAS={habitation:8,champ:12,port:10,ville:15,chapelle:2,magasin:2,camp:4,jardin:4,grenier:1,guet:2,sentier:1,route:0};
function kSauve(){try{localStorage.setItem(KCLE,JSON.stringify(K))}catch(e){}}
function kReg(t){return t.sect+'·'+t.pal}
function kLieu(t){return lieuDe(t)||lieuProche(t)||t.biome}
function kNouveau(f,bascule){const sp=T.find(t=>lieuDe(t)==='Saint-Paul')||T.find(t=>t.pal==='Bas'),mf=T.find(t=>lieuDe(t)==='Cimendef')||T.find(t=>t.pal==='Hauts');
 K={an:1663,joueur:f,bas:bascule,fac:{c:{conf:60,pop:20},m:{conf:60,pop:12}},res:{viv:20,bois:8,pierre:4,com:0,sav:2},b:{},foret:{},vu:{},tension:20,idees:[],adopt:{},log:[],cyc:null,fin:null,notables:[],trav:{},gibier:{}};
 T.forEach(t=>{K.foret[t.i]=t.forest?100:30});kPose(sp.i,'habitation','c');kPose(mf.i,'camp','m');kVoir(sp.i,5);kVoir(mf.i,4);{const mien=f==='c'?sp:mf,k=f==='c'?'habitation':'camp';K.trav[mien.i]={['bat_'+k]:KBRAS[k]};const cu=T.find(t=>t!==mien&&K.vu[t.i]&&KACT.culture.ok(t)&&Math.hypot(t.x-mien.x,t.z-mien.z)<3);if(cu)K.trav[cu.i]={culture:3}}KVUE.z=f==='c'?2.6:2.2;KVUE.cx=(f==='c'?sp:mf).x;KVUE.cz=(f==='c'?sp:mf).z;
 K.notables=[{n:'Étienne Regnault',f:'c',r:'commandant',s:{autorite:7,prudence:5}},{n:'Louis Payen',f:'c',r:'premier habitant',s:{travail:6,prudence:4}},{n:'Anchaing',f:'m',r:'chef de camp',s:{courage:8,ruse:6}},{n:'Héva',f:'m',r:'guérisseuse',s:{savoir:7,courage:5}}];
 kLog(f==='c'?'1663 : quelques colons et leurs serviteurs malgaches s’installent à Saint-Paul.':'1663 : des Malgaches fuient Saint-Paul et montent dans les hauts.')}
function kPose(i,k,f){(K.b[i]=K.b[i]||[]).push({k,f,an:K.an});if(KBAT[k].f==='c'||k==='champ')K.foret[i]=Math.max(0,(K.foret[i]||0)-(k==='champ'?50:20))}
function kVoir(i,r){const c=T[i];T.forEach(t=>{if(Math.hypot(t.x-c.x,t.z-c.z)<=r*1.8)K.vu[t.i]=1})}
function kLog(m){K.log.push({y:K.an,m});if(K.log.length>80)K.log.shift()}
function kFacs(){return Object.keys(K.fac)}
// les bras du joueur : ses factions, et après le partage, les esclaves travaillent sans qu'on leur demande leur avis
function kMesFacs(){return K.joueur==='m'?['m']:['c','p','e','a','s'].filter(f=>K.fac[f])}
function kBras(){return Math.round(kMesFacs().reduce((s,f)=>s+K.fac[f].pop,0)*.7)}
function kOccupes(){return Object.values(K.trav||{}).reduce((s,a)=>s+Object.values(a).reduce((u,v)=>u+v,0),0)}
function kLibres(){return Math.max(0,kBras()-kOccupes())}
function kMettre(i,act,d){K.trav=K.trav||{};const a=K.trav[i]=K.trav[i]||{};let v=(a[act]||0)+d;if(d>0)v=Math.min(v,(a[act]||0)+kLibres());a[act]=Math.max(0,v);if(!a[act])delete a[act];if(!Object.keys(a).length)delete K.trav[i]}
// plus le lieu est loin de vos bâtiments, plus le travail rend peu (on marche, on porte)
function kLoin(t){let d=1e9;Object.keys(K.b).forEach(i=>{if((K.b[i]||[]).some(x=>x.f===K.joueur))d=Math.min(d,Math.hypot(T[i].x-t.x,T[i].z-t.z))});const r=(K.b[t.i]||[]).some(x=>x.k==='route'||x.k==='sentier');return d<=3||r?1:Math.max(.35,1-(d-3)*.08)}
function kPeut(c){return Object.entries(c).every(([r,v])=>(K.res[r==='viv'?'viv':r]||0)>=v)}
function kPaye(c){Object.entries(c).forEach(([r,v])=>K.res[r]-=v)}
function kCamp(){return K.joueur==='c'?(K.fac.p?'p':'c'):'m'}
// ce qu'on peut bâtir sur une case : selon la faction du joueur, l'étage, le savoir et l'année
function kBatir(t){const f=K.joueur;return Object.entries(KBAT).filter(([k,b])=>b.f===f&&b.z.includes(t.pal)&&(!b.an||K.an>=b.an)&&!(K.b[t.i]||[]).some(x=>x.k===k)&&(k!=='ville'||T.filter(u=>Math.hypot(u.x-t.x,u.z-t.z)<4&&(K.b[u.i]||[]).some(x=>x.k==='habitation')).length>=2))}
// l'année qui passe
function kAnnee(){if(K.fin)return;const R=K.res,ad=k=>!!K.adopt[k];let pv=0,pc=0,ps=0,pb=0,pp=0;
 Object.entries(K.b).forEach(([i,L])=>L.forEach(x=>{const k=x.k,mien=x.f===K.joueur||(K.joueur==='c'&&x.f==='c'),nb=KBRAS[k]||0,w=mien&&nb?Math.min(1,((K.trav[i]||{})['bat_'+k]||0)/nb):(mien?1:.8),ab=x.abime?.4:1,q=w*ab;
  if(k==='habitation'){pv+=3*q;if(K.an>=1715)pc+=2*q}if(k==='champ')pc+=3*q;if(k==='port')pc+=3*q;if(k==='ville')ps+=2*q;if(k==='camp'){pv+=(2+(ad('Alliance des camps')?1:0))*q}if(k==='jardin')pv+=3*q}));
 // les activités sur les lieux
 Object.entries(K.trav||{}).forEach(([i,a])=>{const t=T[i],lo=kLoin(t);Object.entries(a).forEach(([act,n])=>{const A=KACT[act];if(!A)return;let v=n*A.k*lo;
  if(act==='bois'){v*=Math.max(.2,(K.foret[i]||0)/100);K.foret[i]=Math.max(0,(K.foret[i]||0)-n*.6)}
  if(act==='vivres'){const g=K.gibier[i]=K.gibier[i]==null?100:K.gibier[i];v*=g/100;K.gibier[i]=Math.max(5,g-n*1.2)}
  if(act==='culture')K.foret[i]=Math.max(0,(K.foret[i]||0)-n*.2);
  if(A.r==='viv')pv+=v;else if(A.r==='bois')pb+=v;else if(A.r==='pierre')pp+=v})});
 Object.keys(K.gibier||{}).forEach(i=>{if(!(K.trav[i]||{}).vivres)K.gibier[i]=Math.min(100,K.gibier[i]+4)});pb=Math.round(pb*10)/10;pp=Math.round(pp*10)/10;
 if(ad('Commerce avec la Compagnie'))pc+=3;if(ad('Le samedi aux esclaves')||ad('Le samedi pour soi'))pv+=2;if(ad('Écoles pour tous'))ps+=2;if(ad('Terres aux affranchis'))pv+=2;
 const bouches=kMesFacs().reduce((s,f)=>s+K.fac[f].pop,0)*.1;R.viv+=pv-bouches;R.com+=pc;R.sav+=ps+.5;R.bois+=pb;R.pierre+=pp;
 if(R.viv<0){kMesFacs().forEach(f=>K.fac[f].pop=Math.max(0,Math.round(K.fac[f].pop*.93)));kLog('Disette : la population baisse.');R.viv=0};
 {const adv=K.joueur==='c'?'m':(K.fac.p?'p':'c');if(K.fac[adv])K.fac[adv].pop+=Math.round(K.fac[adv].pop*.03+1)}
 // la forêt repousse, ou recule ; trop peu de forêt : érosion, sources taries
 Object.keys(K.foret).forEach(i=>{const b=K.b[i]||[];if(!b.length)K.foret[i]=Math.min(100,K.foret[i]+(ad('Garder la forêt')?3:1.5))});
 const nu=Object.keys(K.b).filter(i=>K.foret[i]<15).length;if(nu>6){R.viv-=nu*.3;if(K.an%5===0)kLog('Les pentes déboisées glissent à chaque pluie : moins de récoltes.')}
 kAdverse();kCyclone();kTemps();kConseil();
 while(kOccupes()>kBras()){const i=Object.keys(K.trav)[0];if(!i)break;const a=K.trav[i],k=Object.keys(a)[0];kMettre(i,k,-Math.min(a[k],kOccupes()-kBras()))}
 K.tension=Math.max(0,Math.min(100,K.tension+(K.adopt['Chasser les marrons']?2:0)-(K.adopt['Laisser les hauts en paix']?2:0)));
 if(K.tension>=90&&Math.random()<.4){const perd=Math.random()<.5?'c':'m';const f=K.fac[perd]||K.fac.p;if(f)f.pop=Math.max(0,Math.round(f.pop*.8));kLog('Affrontement dans les mi-pentes : '+(perd==='m'?'un camp marron est détruit':'une habitation est brûlée')+'.');K.tension-=30}
 // ne jamais mettre en l'air le voisin : si une faction disparaît, l'histoire vraie n'est plus atteignable
 kFacs().forEach(f=>{if(K.fac[f].pop<=0&&!K.fin){K.fin='Les '+KFAC[f].n.toLowerCase()+' ont disparu de l’île. Une île ne se construit pas en effaçant le voisin : l’histoire vraie n’est plus atteignable.';kLog(K.fin)}});
 K.an++;if(K.an>2026&&!K.fin)K.fin='2026 : votre île est bâtie.';kSauve()}
// l'autre faction bâtit dans sa zone, sans vous demander
function kAdverse(){const f=K.joueur==='c'?'m':'c';if(Math.random()>.55)return;const L=Object.entries(KBAT).filter(([k,b])=>b.f===f&&(!b.an||K.an>=b.an));const [k,b]=L[Math.floor(Math.random()*L.length)];
 const proches=T.filter(t=>b.z.includes(t.pal)&&!(K.b[t.i]||[]).length&&Object.keys(K.b).some(i=>(K.b[i]||[]).some(x=>x.f===f)&&Math.hypot(T[i].x-t.x,T[i].z-t.z)<5));if(!proches.length)return;const t=proches[Math.floor(Math.random()*proches.length)];kPose(t.i,k,f);
 if(K.vu[t.i])kLog((f==='c'?'Les colons bâtissent ':'Les marrons font ')+KBAT[k].n.toLowerCase()+' vers '+kLieu(t)+'.');if(k==='route'&&t.pal!=='Bas')K.tension+=6}
// le cyclone : il traverse l'île, ou la frôle ; ce qui est sur son passage souffre, sauf abri
function kCyclone(){if(Math.random()>.33){K.cyc=null;return}const f=1+Math.floor(Math.random()*3),trav=Math.random()<.55,xs=T.map(t=>t.x),zs=T.map(t=>t.z),x0=Math.min(...xs),x1=Math.max(...xs),z0=Math.min(...zs),z1=Math.max(...zs),cx=(x0+x1)/2,cz=(z0+z1)/2;
 const dec=trav?(Math.random()-.5)*10:(Math.random()<.5?-1:1)*(x1-x0)*.62,a={x:cx+30+dec,z:z0-20},b={x:cx-30+dec,z:z1+20};K.cyc={f,a,b,trav};
 const ad=k=>!!K.adopt[k];let det=0;Object.keys(K.b).forEach(i=>{const t=T[i],d=distSeg(t,a,b);if(d>6+f*2)return;const L=K.b[i],prot=L.some(x=>['magasin','grenier','chapelle'].includes(x.k))?.5:1,k=(ad('Kabar avant le cyclone')?.7:1)*prot;
  L.forEach(x=>{if(['habitation','champ','camp','jardin'].includes(x.k)&&Math.random()<.18*f*k*(x.k==='jardin'?.4:1)){x.abime=1;det++}})});
 K.res.viv=Math.max(0,K.res.viv-f*3*(ad('Kabar avant le cyclone')?.7:1));kLog('Cyclone '+['','modéré','fort','très fort'][f]+' : il '+(trav?'traverse l’île':'frôle la côte')+'. '+(det?det+' bâtiment'+(det>1?'s':'')+' abîmé'+(det>1?'s':'')+'.':'Peu de dégâts.'))}
function distSeg(t,a,b){const dx=b.x-a.x,dz=b.z-a.z,u=Math.max(0,Math.min(1,((t.x-a.x)*dx+(t.z-a.z)*dz)/(dx*dx+dz*dz)));return Math.hypot(t.x-(a.x+u*dx),t.z-(a.z+u*dz))}
// les grandes dates changent les factions
function kTemps(){const y=K.an;
 if(y===K.bas&&!K.fac.p){const c=K.fac.c;K.fac.p={conf:c.conf,pop:Math.round(c.pop*.35)};K.fac.e={conf:30,pop:Math.round(c.pop*.65)+6};delete K.fac.c;kLog(y===1663?'Les Malgaches de Saint-Paul ne sont pas libres : la société des bas se partage entre maîtres et esclaves.':'1723 : le Code noir s’applique à Bourbon. La société des bas se partage entre propriétaires et esclaves.')}
 if(y===1794&&!K.d1794){K.d1794=1;K.idees.unshift({f:'p',x:['Le décret de 1794','La Convention abolit l’esclavage. Les colons de l’île peuvent l’appliquer, le refuser comme dans l’histoire, ou proclamer une île qui se gouverne seule.',{},{},''],choix:1})}
 if(y===1848&&K.fac.e&&!K.fac.a){K.fac.a={conf:50,pop:K.fac.e.pop};delete K.fac.e;kLog('1848 : abolition. Les esclaves deviennent affranchis ; des engagés arrivent de l’Inde.')}}
// le conseil : une idée de temps en temps, portée par une faction
function kConseil(){if(K.an%2||K.idees.length>=2)return;const fs=kFacs().filter(f=>KIDE[f]&&f!==(K.joueur==='c'?'m':'c')&&!(K.joueur==='m'&&['p','s'].includes(f))),f=fs[Math.floor(Math.random()*fs.length)],L=(KIDE[f]||[]).filter(x=>!K.adopt[x[0]]&&!K.idees.some(i=>i.x[0]===x[0]));if(L.length)K.idees.push({f,x:L[Math.floor(Math.random()*L.length)]})}
function kDecide(n,oui,choix){const I=K.idees[n];if(!I)return;K.idees.splice(n,1);
 if(I.choix){if(choix==='app'){K.fac.a={conf:60,pop:(K.fac.e||{pop:10}).pop};delete K.fac.e;kLog('1794 : l’île applique l’abolition (utopie). Les esclaves sont libres cinquante ans plus tôt.')}else if(choix==='souv'){K.fac.s={conf:60,pop:Math.round((K.fac.p||{pop:10}).pop*.6)+5};kLog('1794 : Bourbon se proclame souveraine (utopie). L’île se gouverne seule, et doit décider de l’esclavage elle-même.')}else{kLog('1794 : les colons refusent le décret, comme dans l’histoire. L’esclavage dure jusqu’en 1848.');if(K.fac.e)K.fac.e.conf-=15}kSauve();return}
 const [nom,,cout,eff]=I.x;if(oui){if(!kPeut(cout)){toast('Pas assez de ressources pour cette idée.');K.idees.splice(n,0,I);return}kPaye(cout);K.adopt[nom]=1;Object.entries(eff).forEach(([f,v])=>{if(K.fac[f])K.fac[f].conf=Math.max(0,Math.min(100,K.fac[f].conf+v))});
  if(nom==='Chasser les marrons'||nom==='Milice des habitants')K.tension+=15;if(nom==='Laisser les hauts en paix')K.tension-=15;if(nom==='Raid sur une habitation'){K.res.viv+=4;K.res.bois+=2;K.tension+=12}if(nom==='Rejoindre les hauts'&&K.fac.e&&K.fac.m){const n=Math.round(K.fac.e.pop*.1);K.fac.e.pop-=n;K.fac.m.pop+=n}
  if(nom==='Concessions aux habitants'){const t=T.find(t=>t.pal==='Bas'&&K.vu[t.i]&&!(K.b[t.i]||[]).length);if(t)kPose(t.i,'habitation','c')}kLog('Le conseil adopte : « '+nom+' ».')}
 else{if(K.fac[I.f])K.fac[I.f].conf=Math.max(0,K.fac[I.f].conf-6);kLog('Le conseil refuse : « '+nom+' ». Les '+KFAC[I.f].n.toLowerCase()+' s’en souviendront.')}kSauve()}

// ----- l'écran -----
let KVUE={sel:null,cyc:0};
function kOuvrir(){let d=$('kons');if(!d){d=document.createElement('div');d.id='kons';document.body.appendChild(d);const st=document.createElement('style');st.textContent='#kons{position:fixed;inset:0;z-index:70;background:#0e1418;color:#f0e6d0;display:flex;flex-direction:column;font:13px system-ui}#kons header{display:flex;gap:14px;align-items:center;padding:8px 12px;border-bottom:1px solid #3a3226;flex-wrap:wrap}#kons .kb{display:flex;flex:1;min-height:0}#kons canvas{flex:1;min-width:0;cursor:pointer}#kons aside{width:360px;max-width:42vw;overflow:auto;padding:10px;border-left:1px solid #3a3226;background:#16120d}#kons .pc{border:1px solid #3a3226;border-radius:6px;padding:6px 8px;margin:6px 0}#kons h4{margin:0 0 4px;color:#e8be5a}#kons button.bt{font-size:12px;padding:4px 8px;margin:2px}@media(max-width:760px){#kons .kb{flex-direction:column}#kons aside{width:auto;max-width:none;max-height:45vh}}';document.head.appendChild(st)}
 d.hidden=false;$('ecran').hidden=true;if(!K){let s=null;try{s=JSON.parse(localStorage.getItem(KCLE)||'null')}catch(e){}if(s&&!s.fin)K=s}if(!K){kDebut(d);return}K.trav=K.trav||{};K.gibier=K.gibier||{};kRendu()}
function kDebut(d){d.innerHTML='<div style="margin:auto;max-width:560px;padding:20px"><h1 style="margin:0 0 6px">Survie</h1><p>L’île vue de haut. Vous ne dirigez plus les gens un par un : vous décidez ce qu’on bâtit et ce qu’on exploite, et vous arbitrez les idées des factions. Le cyclone passe chaque saison des pluies, sur l’île ou le long de ses côtes.</p><p class="note">Les colons tiennent les bas, les marrons les hauts. Celui que vous ne choisissez pas bâtit de son côté, et devient votre adversaire. Une île ne se construit pas en effaçant le voisin.</p>'+
 '<h4>Votre vision</h4><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="bt" data-f="c">La colonie · les bas, depuis Saint-Paul</button><button class="bt" data-f="m">Le marronnage · les hauts</button></div>'+
 '<h4 style="margin-top:12px">Quand la société des bas se partage entre maîtres et esclaves</h4><label><input type="radio" name="kb" value="1723" checked> 1723, le Code noir appliqué à Bourbon</label><br><label><input type="radio" name="kb" value="1663"> 1663, dès les premiers Malgaches de Saint-Paul</label>'+
 '<div style="margin-top:14px"><button class="bt sec" id="kR">Retour à l’accueil</button></div></div>';
 d.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{kNouveau(b.dataset.f,+d.querySelector('input[name=kb]:checked').value);kSauve();kRendu()});$('kR').onclick=kFermer}
function kFermer(){const d=$('kons');if(d)d.hidden=true;accueil()}
function kRendu(){const d=$('kons'),R=K.res;d.innerHTML='<header><b style="font-size:20px">'+K.an+'</b>'+[['Vivres',R.viv],['Bois',R.bois],['Pierre',R.pierre],['Commerce',R.com],['Savoir',R.sav]].map(([n,v])=>'<span><small>'+n+'</small> <b>'+Math.round(v)+'</b></span>').join('')+
 '<span><small>Bras libres</small> <b>'+kLibres()+'</b> / '+kBras()+'</span><span><small>Tension</small> <span style="display:inline-block;width:70px;height:7px;background:#3a3226;border-radius:4px;vertical-align:middle"><span style="display:block;height:7px;width:'+K.tension+'%;background:#e87b5a;border-radius:4px"></span></span></span><span style="flex:1"></span><button class="bt sec" id="kVille">Voir la ville</button><button class="bt sec" id="kIle">Toute l’île</button><button class="bt" id="kN">Année suivante ⏎</button><button class="bt sec" id="kQ">Quitter</button></header><div class="kb"><canvas id="kC"></canvas><aside id="kA"></aside></div>';
 $('kN').onclick=()=>kSuite();$('kVille').onclick=()=>{const L=Object.keys(K.b).filter(i=>(K.b[i]||[]).some(x=>x.f===K.joueur));if(!L.length)return;KVUE.cx=L.reduce((s,i)=>s+T[i].x,0)/L.length;KVUE.cz=L.reduce((s,i)=>s+T[i].z,0)/L.length;KVUE.z=3;kCarte()};$('kIle').onclick=()=>{KVUE.z=1;KVUE.cx=KVUE.cz=null;kCarte()};$('kQ').onclick=kFermer;kPanneau();kCarte()}
function kSuite(){if(K.fin){kPanneau();return}kAnnee();KVUE.cyc=K.cyc?performance.now():0;kRendu();if(K.cyc)kAnimCyc()}
function kAnimCyc(){const t0=KVUE.cyc;const f=()=>{if(KVUE.cyc!==t0||!$('kC'))return;const u=(performance.now()-t0)/2600;kCarte(Math.min(1,u));if(u<1)requestAnimationFrame(f);else{KVUE.cyc=0;kCarte()}};f()}
function kCarte(cu){const cv=$('kC');if(!cv)return;const W=cv.clientWidth,H=cv.clientHeight,dpr=devicePixelRatio||1;cv.width=W*dpr;cv.height=H*dpr;const x=cv.getContext('2d');x.scale(dpr,dpr);
 const xs=T.map(t=>t.x),zs=T.map(t=>t.z),x0=Math.min(...xs)-3,x1=Math.max(...xs)+3,z0=Math.min(...zs)-3,z1=Math.max(...zs)+3,Z=KVUE.z||1,k=Math.min(W/(x1-x0),H/(z1-z0))*Z,cx=KVUE.cx==null?(x0+x1)/2:KVUE.cx,cz=KVUE.cz==null?(z0+z1)/2:KVUE.cz,P=t=>[W/2+(t.x-cx)*k,H/2+(t.z-cz)*k],R=k*.98;KVUE.inv=(a,b)=>({x:cx+(a-W/2)/k,z:cz+(b-H/2)/k});
 KVUE.P=P;KVUE.R=R;x.fillStyle='#173447';x.fillRect(0,0,W,H);
 const hex=(cx,cy,r)=>{x.beginPath();for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3;x.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}x.closePath()};
 T.forEach(t=>{const [a,b]=P(t);hex(a,b,R);const vu=K.vu[t.i],fo=(K.foret[t.i]||0)/100,al=Math.min(1,(t.alt||0)/2600);let c=t.bare?[90,80,70]:[Math.round(120-60*fo+80*al),Math.round(130+20*fo+40*al),Math.round(70+20*fo+90*al)];if(!vu)c=c.map(v=>Math.round(v*.35));x.fillStyle='rgb('+c.join(',')+')';x.fill();
  const L=K.b[t.i];if(L&&L.length&&vu){const f=L[0].f;x.lineWidth=2;x.strokeStyle=f==='m'?KFAC.m.col:KFAC.c.col;x.stroke();x.font=Math.max(10,R*1.1)+'px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText(KBAT[L[L.length-1].k].ic,a,b);if(L.some(z=>z.abime)){x.fillStyle='rgba(232,123,90,.9)';x.fillText('!',a+R*.7,b-R*.6)}}
  {const tr=(K.trav||{})[t.i];if(tr&&vu){const n=Object.values(tr).reduce((s,v)=>s+v,0);x.font='bold '+Math.max(9,R*.55)+'px system-ui';x.fillStyle='#fff';x.textAlign='center';x.fillText('👥'+n,a,b+R*.75)}}
  if(KVUE.sel===t.i){hex(a,b,R);x.lineWidth=3;x.strokeStyle='#fff';x.stroke()}});
 // les noms des lieux connus
 x.font='11px system-ui';x.fillStyle='#f0e6d0';x.textAlign='left';T.forEach(t=>{const n=lieuDe(t);if(n&&K.vu[t.i]&&!/Rivière|Pic|Piton|Roche|Trou/.test(n)){const [a,b]=P(t);x.fillText(n,a+R,b-R*.4)}});
 // le cyclone de l'année : la spirale passe le long de sa route
 if(K.cyc&&cu!=null){const c=K.cyc,px=c.a.x+(c.b.x-c.a.x)*cu,pz=c.a.z+(c.b.z-c.a.z)*cu,[a,b]=P({x:px,z:pz}),r=k*(10+c.f*3),rot=cu*14;x.save();x.translate(a,b);x.rotate(rot);
  // pas de spirale vue du sol : un ciel sombre, et la pluie couchée par le vent, plus dense et plus couchée vers le centre
  x.rotate(-rot);const g=x.createRadialGradient(0,0,0,0,0,r);g.addColorStop(0,'rgba(12,18,24,.62)');g.addColorStop(.6,'rgba(20,28,36,.38)');g.addColorStop(1,'rgba(30,40,50,0)');x.fillStyle=g;x.beginPath();x.arc(0,0,r,0,6.283);x.fill();
  let sd=7;const rn=()=>{sd=(sd*16807)%2147483647;return sd/2147483647};x.strokeStyle='rgba(190,205,215,.5)';x.lineWidth=1;for(let i=0;i<260;i++){const a=rn()*6.283,d=Math.sqrt(rn())*r,px=Math.cos(a)*d,py=Math.sin(a)*d,f=1-d/r,l=4+f*10,tx=-Math.sin(a),ty=Math.cos(a);x.beginPath();x.moveTo(px,py);x.lineTo(px+tx*l*f+1,py+ty*l*f+l*(1-f));x.stroke()}
  x.restore()}
 cv.onwheel=e=>{e.preventDefault();const r=cv.getBoundingClientRect(),m=KVUE.inv(e.clientX-r.left,e.clientY-r.top),z0=KVUE.z||1,z1=Math.max(1,Math.min(6,z0*(e.deltaY<0?1.15:1/1.15)));if(KVUE.cx==null){KVUE.cx=(Math.min(...T.map(t=>t.x))+Math.max(...T.map(t=>t.x)))/2;KVUE.cz=(Math.min(...T.map(t=>t.z))+Math.max(...T.map(t=>t.z)))/2}KVUE.cx=m.x+(KVUE.cx-m.x)*z0/z1;KVUE.cz=m.z+(KVUE.cz-m.z)*z0/z1;KVUE.z=z1;kCarte()};
 let dg=null;cv.onpointerdown=e=>{dg={x:e.clientX,y:e.clientY,cx:KVUE.cx,cz:KVUE.cz,m:0}};cv.onpointermove=e=>{if(!dg)return;const dx=e.clientX-dg.x,dy=e.clientY-dg.y;if(Math.hypot(dx,dy)>4)dg.m=1;if(dg.m){const a=KVUE.inv(0,0),b=KVUE.inv(dx,dy);if(dg.cx==null){dg.cx=(Math.min(...T.map(t=>t.x))+Math.max(...T.map(t=>t.x)))/2;dg.cz=(Math.min(...T.map(t=>t.z))+Math.max(...T.map(t=>t.z)))/2}KVUE.cx=dg.cx-(b.x-a.x);KVUE.cz=dg.cz-(b.z-a.z);kCarte()}};cv.onpointerup=()=>{setTimeout(()=>{dg=null},0)};
 cv.onclick=e=>{if(dg&&dg.m)return;const r=cv.getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top;let best=null,bd=1e9;T.forEach(t=>{const [a,b]=P(t),d=Math.hypot(a-mx,b-my);if(d<bd){bd=d;best=t}});if(best&&bd<R*1.2){KVUE.sel=best.i;kPanneau();kCarte()}}}
function kTravHtml(t){const a=(K.trav||{})[t.i]||{},L=[];(K.b[t.i]||[]).filter(x=>x.f===K.joueur&&KBRAS[x.k]).forEach(x=>L.push(['bat_'+x.k,KBAT[x.k].ic+' '+KBAT[x.k].n,'à plein avec '+KBRAS[x.k]]));
 Object.entries(KACT).forEach(([k,A])=>{if(A.ok(t))L.push([k,A.ic+' '+A.n,A.d+(k==='vivres'&&K.gibier[t.i]!=null?' Gibier '+Math.round(K.gibier[t.i])+' %.':'')])});if(!L.length)return '';const lo=kLoin(t);
 return '<div style="margin-top:6px"><b>Y envoyer du monde</b> <small>'+(lo<1?'loin de vos bâtiments : rend '+Math.round(lo*100)+' %':'tout près')+'</small>'+L.map(([k,n,d])=>'<div style="display:flex;gap:6px;align-items:center;margin:3px 0"><span style="flex:1">'+n+'<br><small class="note">'+d+'</small></span><button class="bt sec" data-tm="'+k+'">−5</button><b style="min-width:24px;text-align:center">'+(a[k]||0)+'</b><button class="bt" data-tp="'+k+'">+5</button></div>').join('')+'</div>'}
function kPanneau(){const A=$('kA');if(!A)return;let h='';
 if(K.fin)h+='<div class="pc" style="border-color:#e8be5a"><h4>Fin</h4>'+K.fin+'<br><button class="bt" id="kRe">Recommencer</button></div>';
 // la case choisie
 if(KVUE.sel!=null){const t=T[KVUE.sel],L=K.b[t.i]||[];h+='<div class="pc"><h4>'+kLieu(t)+'</h4><small>'+t.sect+' · '+t.pal+' · '+t.biome+' · '+Math.round(t.alt)+' m · forêt '+Math.round(K.foret[t.i]||0)+' %</small><br>'+(K.vu[t.i]?(L.length?L.map(x=>KBAT[x.k].ic+' '+KBAT[x.k].n+' <small>('+KFAC[x.f==='c'&&K.fac.p?'p':x.f].n+(x.abime?', abîmé':'')+')</small>').join('<br>'):'<small>Rien de bâti.</small>'):'<small>On ne connaît pas encore cette région.</small>')+
  (K.vu[t.i]&&!K.fin?'<div style="margin-top:4px">'+kBatir(t).map(([k,b])=>'<button class="bt'+(kPeut(b.c)?'':' sec')+'" data-k="'+k+'" title="'+b.d+'">'+b.ic+' '+b.n+' <small>'+Object.entries(b.c).map(([r,v])=>v+' '+r).join(', ')+'</small></button>').join('')+(L.some(x=>x.abime&&x.f===K.joueur)?'<button class="bt" id="kRep">Réparer (2 bois)</button>':'')+'</div>':'')+
  (K.vu[t.i]&&!K.fin?kTravHtml(t):'')+(!K.vu[t.i]&&!K.fin?'<button class="bt sec" id="kExp">Envoyer explorer (2 vivres)</button>':'')+'</div>'}
 // le conseil
 h+=(K.res.com>=3&&!K.fin?'<div class="pc"><h4>Les échanges</h4><button class="bt" id="kEch">Échanger 3 commerce contre 4 vivres</button></div>':'');
 h+='<div class="pc"><h4>Le conseil</h4>'+(K.idees.length?K.idees.map((I,n)=>'<div style="margin:4px 0"><b style="color:'+(KFAC[I.f]||{}).col+'">'+(KFAC[I.f]||{}).n+'</b> proposent : <b>'+I.x[0]+'</b><br><small>'+I.x[1]+(I.x[4]?' · '+I.x[4]:'')+'</small><br>'+(I.choix?'<button class="bt" data-c="'+n+'" data-v="app">Appliquer (utopie)</button><button class="bt sec" data-c="'+n+'" data-v="ref">Refuser (histoire vraie)</button><button class="bt sec" data-c="'+n+'" data-v="souv">Bourbon souveraine (utopie)</button>':'<button class="bt" data-i="'+n+'" data-o="1">Adopter</button><button class="bt sec" data-i="'+n+'" data-o="0">Refuser</button>')+'</div>').join(''):'<small>Rien à décider cette année.</small>')+'</div>';
 // les factions
 h+='<div class="pc"><h4>Les factions</h4>'+kFacs().map(f=>'<div style="display:flex;gap:6px;align-items:center;margin:2px 0"><b style="width:150px;color:'+KFAC[f].col+'">'+KFAC[f].n+'</b><small style="width:60px">'+K.fac[f].pop+' âmes</small><span style="flex:1;height:6px;background:#3a3226;border-radius:3px"><span style="display:block;height:6px;width:'+K.fac[f].conf+'%;background:'+KFAC[f].col+';border-radius:3px"></span></span><small>'+Math.round(K.fac[f].conf)+'</small></div>').join('')+'<small class="note">La barre : leur confiance en vos décisions.</small></div>';
 // les personnages : on les voit, on ne les commande pas
 h+='<div class="pc"><h4>Les personnages</h4>'+K.notables.map(p=>'<small><b>'+p.n+'</b> · '+p.r+' · '+(KFAC[p.f]||{}).n+' · '+Object.entries(p.s).map(([k,v])=>k+' '+v).join(', ')+'</small>').join('<br>')+'</div>';
 h+='<div class="pc"><h4>La chronique</h4>'+K.log.slice(-10).reverse().map(l=>'<small>'+l.y+' · '+l.m+'</small>').join('<br>')+'</div>';
 A.innerHTML=h;
 A.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const k=b.dataset.k,B=KBAT[k];if(!kPeut(B.c)){toast('Il manque : '+Object.entries(B.c).filter(([r,v])=>(K.res[r]||0)<v).map(([r,v])=>r).join(', ')+'.');return}kPaye(B.c);kPose(KVUE.sel,k,K.joueur);kVoir(KVUE.sel,2);if(k==='route'&&T[KVUE.sel].pal!=='Bas')K.tension+=5;kLog(B.n+' à '+kLieu(T[KVUE.sel])+'.');kSauve();kRendu()});
 A.querySelectorAll('[data-tp]').forEach(b=>b.onclick=()=>{if(!kLibres()){toast('Plus de bras libres : retirez des gens ailleurs.');return}kMettre(KVUE.sel,b.dataset.tp,5);kSauve();kRendu()});A.querySelectorAll('[data-tm]').forEach(b=>b.onclick=()=>{kMettre(KVUE.sel,b.dataset.tm,-5);kSauve();kRendu()});
 A.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{kDecide(+b.dataset.i,b.dataset.o==='1');kRendu()});A.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{kDecide(+b.dataset.c,1,b.dataset.v);kRendu()});
 const rp=$('kRep');if(rp)rp.onclick=()=>{if(K.res.bois<2){toast('Il faut 2 bois.');return}K.res.bois-=2;(K.b[KVUE.sel]||[]).forEach(x=>delete x.abime);kSauve();kRendu()};
 const ex=$('kExp');if(ex)ex.onclick=()=>{if(K.res.viv<2){toast('Il faut 2 vivres.');return}K.res.viv-=2;kVoir(KVUE.sel,2);kLog('Des éclaireurs reconnaissent '+kLieu(T[KVUE.sel])+'.');kSauve();kRendu()};
 const ec=$('kEch');if(ec)ec.onclick=()=>{K.res.com-=3;K.res.viv+=4;kSauve();kRendu()};
 const re=$('kRe');if(re)re.onclick=()=>{K=null;try{localStorage.removeItem(KCLE)}catch(e){}kOuvrir()}}
addEventListener('keydown',e=>{const d=$('kons');if(!d||d.hidden||!K)return;if(e.key==='Enter'||e.code==='Space'){e.preventDefault();e.stopPropagation();kSuite()}if(e.key==='Escape'){KVUE.sel=null;kPanneau();kCarte()}},true);
addEventListener('resize',()=>{const d=$('kons');if(d&&!d.hidden&&K)kCarte()});
// l'entrée, à l'accueil
setInterval(()=>{const e=$('ecran');if(!e||e.hidden||!$('nv')||$('kOuv'))return;const b=document.createElement('button');b.className='bt sec';b.id='kOuv';b.innerHTML='<b>Survie</b> <small>· bâtir et tenir face aux bouleversements de l’île</small>';b.onclick=kOuvrir;const pj=[...e.querySelectorAll('button')].find(x=>/Petits jeux/.test(x.textContent));(pj||$('nv')).insertAdjacentElement('afterend',b)},400);
