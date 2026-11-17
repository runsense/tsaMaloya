// ===== p106 : la liste du 16/11 au soir — traque qui grandit avec la colonie, choix uniques devenus annonces,
// pause et conte bien visibles, départ des colons, savoirs de départ, lisibilité des onglets… =====

// ----- 1. La traque des marrons grandit avec la colonie (elle ne reste plus à 0) -----
// Elle tend vers un niveau qui dépend de l'âge et de la taille de la colonie ; au-delà de 20 les chasseurs rôdent près du camp,
// au-delà de 50 près de tous les camps, au-delà de 70 ils entrent dans les camps.
function traqueCible106(){const nv=VILLES.filter(v=>S.year>=v[0]).length;const ans=Math.max(0,S.year-1663);return Math.min(85,ans*.22+nv*4+(S.year>=1723?8:0)+(S.year>=1740&&S.year<1770?10:0))}
{const s0=saison;saison=function(){const r=s0.apply(this,arguments);try{if(!S||S.fin||S.voieC||K||S.year>=(typeof abolY==='function'?abolY():1848))return r;
 const c=traqueCible106();S.traque=Math.max(0,Math.min(100,(S.traque||0)+(c-(S.traque||0))*.15));const tq=S.traque,C=camps();if(!C.length)return r;
 if(tq>20&&rnd()<.35){const t=C[0];log('🐕 Des chasseurs de marrons rôdent près de '+(lieuDe(t)||'votre camp')+' : la chasse et la cueillette rapportent moins.');S.vivres=Math.max(0,(S.vivres||0)-2)}
 if(tq>50&&C.length>1&&rnd()<.3){const t=C[Math.floor(rnd()*C.length)];log('🔥 Un détachement fouille les ravines autour de '+(lieuDe(t)||'un autre camp')+'.');fx({coh:-1})}
 if(tq>70&&rnd()<.22&&!(S.evq||[]).includes('raid106')){S.evq=S.evq||[];S.evq.push('raid106')}}catch(e){}return r}}
EV.raid106={y:1663,tag:'Archive',an:'',get t(){return 'Les chasseurs entrent dans le camp'},
 get b(){return 'La traque est si forte que le détachement a trouvé le sentier jusqu’au camp. Ils arrivent avec des fusils et des chiens, pour prendre ce qu’ils peuvent et ramener des captifs.'},
 o:[{n:'Défendre le camp',d:'Une bataille : on peut perdre des gens, ou tuer des chasseurs et faire reculer la traque',fx:{},f:()=>{try{if(typeof btOuvrir==='function'){btOuvrir('defCamp');return}}catch(e){}if(rnd()<.5){S.traque=Math.max(0,S.traque-15);log('Les chasseurs sont repoussés ; deux d’entre eux ne redescendent pas.')}else{const p=(S.pp||[])[0];if(p)mourirP(p,'en défendant le camp')}}},
  {n:'Fuir dans les ravines',d:'Vivres −10, une personne est prise',fx:{vivres:-10},f:()=>{const L=(S.pp||[]).filter(q=>!q.chef);if(L.length>1){const p=L[Math.floor(rnd()*L.length)];S.pp=S.pp.filter(q=>q!==p);S.gens=S.pp.length;log('⛓️ '+p.n+' est rattrapé'+(p.g==='f'?'e':'')+' et redescendu'+(p.g==='f'?'e':'')+' enchaîné'+(p.g==='f'?'e':'')+'.')}S.traque=Math.max(0,S.traque-5)}}]};
// les chasseurs se voient sur la carte : une petite troupe qui tourne autour du camp (ou de tous les camps au-delà de 50)
{const G=[];setInterval(()=>{try{if(typeof scene==='undefined'||!S||S.voieC||K){G.forEach(g=>g.visible=false);return}const tq=S.traque||0;const C=camps();const n=tq>50?Math.min(4,C.length):tq>20?1:0;
 while(G.length<4){const g=new THREE.Group();for(let i=0;i<3;i++){const f=new THREE.Group();const b=new THREE.Mesh(new THREE.ConeGeometry(.045,.18,6),new THREE.MeshLambertMaterial({color:i==0?0x2f3b5a:0x6b5236}));b.position.y=.09;const h=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.015,8),new THREE.MeshLambertMaterial({color:0x1a1410}));h.position.y=.21;const tt=new THREE.Mesh(new THREE.SphereGeometry(.03,6,5),new THREE.MeshLambertMaterial({color:0xd8b090}));tt.position.y=.2;const fu=new THREE.Mesh(new THREE.CylinderGeometry(.006,.006,.2,4),new THREE.MeshLambertMaterial({color:0x222222}));fu.position.set(.04,.14,0);fu.rotation.z=.3;f.add(b,tt,h,fu);f.position.x=i*.12;g.add(f)}const ch=new THREE.Mesh(new THREE.BoxGeometry(.1,.05,.04),new THREE.MeshLambertMaterial({color:0x8a6a40}));ch.position.set(-.15,.04,0);g.add(ch);g.visible=false;scene.add(g);G.push(g)}
 const s=performance.now()/1000;G.forEach((g,i)=>{const c=C[i];g.visible=i<n&&!!c&&(!lieu||lieu===LA97);if(!g.visible)return;const r=tq>70?.9:tq>50?1.6:2.3,a=s*.12+i*1.7;const x=c.x+Math.cos(a)*r,z=c.z+Math.sin(a)*r;const t=tileAt({x,z});g.position.set(x,(t?t.alt*VX:0)+.02,z);g.rotation.y=-a})}catch(e){}},120)}

// ----- 2. Un choix unique n'est pas un choix : c'est une annonce. Pas de bouton ; le récit se referme seul (ou au clic, ou Espace) -----
{const st=document.createElement('style');st.textContent='.annonce106{margin:12px 0 4px;padding:8px 12px;border-left:3px solid #c9a24a;background:rgba(201,162,74,.12);font-size:14px}.annonce106 b{display:block;margin-bottom:2px}.annonce106 .bar{height:3px;background:#c9a24a;margin-top:8px;transform-origin:left;animation:ann106 6s linear forwards}@keyframes ann106{from{transform:scaleX(1)}to{transform:scaleX(0)}}';document.head.appendChild(st)}
{const m0=modal;let tmr=null,cle=null;modal=function(){m0.apply(this,arguments);try{if(!S||!S.evq||!S.evq.length)return;const id=S.evq[0],e=EV[id];const O=optsDe(id,e);if(O.length!==1){$('modal').onclick=null;return}const b=$('op0');if(!b)return;
 const p=document.createElement('div');p.className='annonce106';p.innerHTML='<b>'+O[0].n+'</b>'+(O[0].d?'<small>'+teinte(O[0].d)+'</small>':'')+'<div class="bar"></div>';b.replaceWith(p);
 const k=id+'|'+S.year+'|'+(S.ns||0);if(cle===k)return;cle=k;clearTimeout(tmr);const go=()=>{try{if(S&&S.evq&&S.evq[0]===id){choisir(id,0);rafraichir()}}catch(e){}};tmr=setTimeout(go,6000);
 const m=$('modal');m.onclick=ev=>{if(ev.target.closest('details'))return;clearTimeout(tmr);go()}}catch(e){}}}
document.addEventListener('keydown',e=>{try{if((e.code==='Space'||e.key===' ')&&S&&S.evq&&S.evq.length&&!$('modal').hidden&&!$('op1')&&!$('op0')){e.preventDefault();e.stopImmediatePropagation();choisir(S.evq[0],0);rafraichir()}}catch(x){}},true);

// ----- 3. Lecture ou arrêt du conte : un cadre de couleur autour de l'écran, et une alerte rouge sous les bras quand il est arrêté -----
{const st=document.createElement('style');st.textContent='#cadre106{position:fixed;inset:0;pointer-events:none;z-index:40;border:3px solid transparent;transition:border-color .4s,box-shadow .4s}#cadre106.lit{border-color:rgba(110,200,120,.55)}#cadre106.stop{border-color:rgba(214,64,52,.8);box-shadow:inset 0 0 22px rgba(214,64,52,.35)}#alerte106{position:fixed;top:142px;right:12px;z-index:41;background:#b8322a;color:#fff;font:600 13px/1.3 system-ui,sans-serif;padding:7px 12px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.4);pointer-events:auto;cursor:pointer;animation:al106 1.6s ease-in-out infinite}#alerte106 kbd{display:inline-block;border:1px solid #fff;border-bottom-width:2px;border-radius:4px;padding:0 5px;margin:0 3px;font:inherit}@keyframes al106{50%{opacity:.75}}';document.head.appendChild(st);
 const c=document.createElement('div');c.id='cadre106';document.body.appendChild(c);const a=document.createElement('div');a.id='alerte106';a.hidden=true;a.innerHTML='⏸ Le conte est arrêté — appuyez sur <kbd>Espace</kbd> pour le reprendre';a.onclick=()=>{const b=$('auto');if(b)b.click()};document.body.appendChild(a);
 setInterval(()=>{try{const on=!!(S&&!S.fin&&modeHist()&&!K);if(!on){c.className='';a.hidden=true;return}const lit=!!autoD();c.className=lit?'lit':'stop';const m=$('modal');a.hidden=lit||(m&&!m.hidden)}catch(e){}},300)}

// ----- 4. Vie : clic droit sur la carte comme en Histoire — chasser, cueillir, explorer par ici (même l'inconnu), et pour les colons défricher à côté -----
function campProche106(t){const C=camps();return C.length?C.slice().sort((a,b)=>hd(a,t)-hd(b,t))[0]:null}
function sortie106(t,k){const c=campProche106(t);if(!c){toast('Aucun camp d’où partir.');return}window.EXPS=window.EXPS||{coche:{},prov:2,but:k};EXPS.coche={};EXPS.but=k;EXPS.dest106=t.i;try{expPlan(c.i,null)}catch(e){toast('Impossible de préparer la sortie.')}}
{const ep=expPlan;expPlan=function(){const r=ep.apply(this,arguments);try{const ok=$('expOk');if(ok&&window.EXPS&&EXPS.dest106!=null){const d=EXPS.dest106;ok.textContent='Partir vers '+(lieuDe(T[d])||lieuProche(T[d])||'cette case');ok.addEventListener('click',()=>{setTimeout(()=>{try{if(window.choixExp)choisirTuile(T[d])}catch(e){}EXPS.dest106=null},30)})}const bx=$('expN');if(bx)bx.addEventListener('click',()=>{if(window.EXPS)EXPS.dest106=null})}catch(e){}return r}}
{const mc=menuCtx;menuCtx=function(X,Y,titre,L){try{if(S&&!modeHist()&&!K&&!CV.on&&!VP&&Array.isArray(L)){const pt=pick(X,Y),t=pt&&tileAt(pt);if(t&&!t.bare&&(S.t[t.i]||{}).b!=='camp'){const vu=!!(S.t[t.i]||{}).s,A=[];
 if(vu){A.push(['🏹 Chasser ici',()=>sortie106(t,'chasse')],['🧺 Cueillir ici',()=>sortie106(t,'cueil')])}
 A.push(['🧭 Explorer par ici'+(vu?'':' (inconnu)'),()=>sortie106(t,'explorer')]);
 if(S.voieC&&vu&&camps().some(c=>hd(c,t)<=2)){const a=actions(t).find(x=>/defrich|champ|cultiv/i.test(x.id+' '+x.n));if(a)A.push(['🌾 '+a.n,()=>{choisirTuile(t);agir(t,a.id);rafraichir()}])}
 L.unshift(...A)}}}catch(e){}return mc.apply(this,arguments)}}
// les colons ne fondent un nouveau lieu que près d'une place de la colonie (une ville déjà fondée)
{const ct=choisirTuile;choisirTuile=function(t){try{const q=window.choixExp;if(q&&q.but==='camp'&&S.voieC&&t){const ok=VILLES.some(v=>S.year>=v[0]&&(()=>{const u=near(v[1],v[2]);return u&&hd(u,t)<=2})());if(!ok){toast('Les colons s’installent sur une place de la colonie : choisissez une case près d’une ville.');return}}}catch(e){}return ct.apply(this,arguments)}}

// ----- 5. Savoirs de départ : chacun arrive avec les siens -----
// colons : viande séchée, songes et maïs (venus avec eux) — pas « Lire le ciel », qui est le ciel d'ici et s'apprend sur place ;
// marrons : sentiers de crête et tisanes des Hauts. Les autres restent communs, à apprendre.
setInterval(()=>{try{if(!S||S.fin||K||S.sv0_106)return;S.sv=S.sv||{};S.sv0_106=1;const L=S.voieC?['kitoza','songes']:['sentiers','tisanes'];L.forEach(k=>{if(SAVOIRS[k])S.sv[k]=1});log('📚 Savoirs de départ : '+L.map(k=>SAVOIRS[k]&&SAVOIRS[k].n).filter(Boolean).join(', ')+'.')}catch(e){}},1500);

// ----- 6. Vie : les bras ne dépassent jamais le nombre d'adultes présents (on voyait « 3 adultes · 27 bras libres ») -----
setInterval(()=>{try{if(!S||S.fin||K||modeHist()||!S.pp)return;const n=S.pp.filter(p=>adulte(p)&&!(typeof enGrp==='function'&&enGrp(p))).length;if((S.bras||0)>n)S.bras=n}catch(e){}},700);
// une nouvelle place de la colonie (après 1690) arrive avec une habitation complète : deux Européens, une domestique,
// quatre esclaves aux champs et un commandeur — huit personnes, comme une habitation de l'époque
{const v0=villes105;villes105=function(){const avant=new Set(Object.keys(S&&S.vil105||{}));v0();try{if(!S||!S.voieC||S.year<1690)return;Object.keys(S.vil105||{}).filter(n=>!avant.has(n)).forEach(n=>{const ci=S.vil105[n];const nb=S.pp.filter(p=>p.camp===ci).length;if(nb>2)return;
 const mk=(o,g,st,age,role)=>{const p=nouvellePersonne({or:o,g,st,age});p.camp=ci;if(role)p.metier106=role;S.pp.push(p)};
 mk('mg','f','esclave',25,'domestique');for(let i=0;i<4;i++)mk(rnd()<.6?'mg':'af',i<3?'h':'f','esclave',18+Math.floor(rnd()*15),'champ');mk('mg','h','esclave',35,'commandeur');S.gens=S.pp.length;
 log('🏡 L’habitation de '+n+' : deux colons, une domestique, quatre esclaves aux champs et un commandeur.')})}catch(e){}}}

// ----- 7. Lisibilité : onglets et menus plus grands, et grossis au passage de la souris -----
{const st=document.createElement('style');st.textContent=
 '#drawer{font-size:15px!important;line-height:1.45}#drawer small,#drawer .note{font-size:13.5px!important;line-height:1.4}#drawer h3{font-size:19px!important}#drawer h4{font-size:16px!important}'+
 '#drawer .sv,#drawer .pc,#drawer .nd,#drawer button,#side button,.tab,#men98 button,#mCtx button{transition:transform .15s ease,box-shadow .15s ease}'+
 '#drawer .sv:hover,#drawer .pc:hover,#drawer .nd:hover{transform:scale(1.035);transform-origin:left center;box-shadow:0 2px 12px rgba(0,0,0,.35);position:relative;z-index:2}'+
 '#drawer button:hover,#side button:hover,.tab:hover,#men98 button:hover,#mCtx button:hover{transform:scale(1.06)}'+
 '.tab{font-size:14px!important}#side{font-size:14.5px}#side small{font-size:13px!important}'+
 '.ing106{display:inline-block;margin:2px 4px 0 0;padding:1px 7px;border-radius:10px;font-size:12.5px;border:1px solid}.ing106.oui{border-color:#7fc36a;color:#a8e094}.ing106.non{border-color:#d9705a;color:#f0a090}'+
 '.ech106{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 10px}.ech106 span{padding:3px 8px;border-radius:8px;background:rgba(255,255,255,.06);font-size:13px}.ech106 span.ok{background:rgba(127,195,106,.22)}';document.head.appendChild(st)}

// ----- 8. Les pouvoirs : l'échelle (ce que chaque palier ouvre), les plantes exigées en clair, et le rite à rebours -----
RITE99.push({k:'rebours',n:'Le rite à rebours',m:6,c:{fandamane:1},d:'On retourne la force contre ceux d’en bas : les chiens perdent la piste, les chasseurs se disputent, leur dévotion ne les protège plus. Traque −7, et leur prochain élan est retardé.',f:k=>{S.traque=Math.max(0,(S.traque||0)-7*k);S.rebours106=(S.ns||0)+4;log('🌀 Rite à rebours : la traque recule.')}});
{const ph=pouv99Html;pouv99Html=function(){let h=ph.apply(this,arguments);try{const m=mystique99(),I=ing99();
 // l'échelle des paliers
 const P={};PAL99.forEach(p=>(P[p.m]=P[p.m]||[]).push(p.n));RITE99.forEach(r=>(P[r.m]=P[r.m]||[]).push(r.n));
 const ech='<p class="note" style="margin:8px 0 2px"><b>Plus la mystique monte, plus elle ouvre :</b></p><div class="ech106">'+Object.keys(P).map(Number).sort((a,b)=>a-b).map(k=>'<span class="'+(m>=k?'ok':'')+'"><b>'+k+'</b> · '+P[k].join(', ')+'</span>').join('')+'</div>';
 h=h.replace('Plus elle monte, plus les pouvoirs s’ouvrent.</p>','Plus elle monte, plus les pouvoirs s’ouvrent.</p>'+ech);
 // les plantes exigées, nommées, avec ce qu'on a
 RITE99.forEach(R=>{const ic=Object.entries(R.c).map(([q,n])=>n+' '+ING99[q].ic).join(' ');const lab=Object.entries(R.c).map(([q,n])=>'<span class="ing106 '+((I[q]||0)>=n?'oui':'non')+'">'+ING99[q].ic+' '+ING99[q].n+' '+(I[q]||0)+'/'+n+'</span>').join('');h=h.replace('· mystique '+R.m+' · '+ic+'</small>','· mystique '+R.m+'</small><div>'+lab+'</div>')})}catch(e){}return h}}

// ----- 9. Cohésion pleine (100) : le camp soudé travaille mieux — un bras de plus et deux vivres par saison -----
{const s0=saison;saison=function(){const r=s0.apply(this,arguments);try{if(S&&!S.fin&&!K&&(S.coh||0)>=100){S.brasNext=(S.brasNext||0)+1;S.vivres=(S.vivres||0)+2;log('🤝 Cohésion au plus haut : tout le monde tire dans le même sens (+1 bras, +2 vivres).')}}catch(e){}return r}}
// le rite à rebours retarde la remontée de la traque
{const s0=saison;saison=function(){const t0=S&&S.traque;const r=s0.apply(this,arguments);try{if(S&&S.rebours106&&(S.ns||0)<S.rebours106&&S.traque>t0)S.traque=t0}catch(e){}return r}}

// ----- 10. Les besoins se voient et bougent : la boîte se met à jour, la soif compte, et les gens le montrent -----
function soif106(ci){S.soif106=S.soif106||{};return S.soif106[ci]||0}
{let jr=-1;setInterval(()=>{try{if(!S||S.fin||K||modeHist()||S.jourN==null||S.jourN===jr)return;jr=S.jourN;S.soif106=S.soif106||{};
 camps().forEach(c=>{const P=S.pp.filter(p=>campDe(p)===c.i);if(!P.length)return;const eau=P.filter(p=>(typeof tacheDe==='function'?tacheDe(p):p.tache)==='eau').length;const riv=c.riv||c.nb.some(i=>T[i].riv);
  const v=S.soif106[c.i]||0;S.soif106[c.i]=Math.max(0,Math.min(100,v+(eau*8>=P.length?-25:riv?6:14)))})}catch(e){}},1000)}
{const bc=besoinsCamp;besoinsCamp=function(ci){const L=bc.apply(this,arguments);try{const s=soif106(ci);L.splice(1,0,['Boire',100-s,s>70?'tout le monde a soif':s>40?'l’eau manque':'de l’eau pour tous',0])}catch(e){}return L}}
setInterval(()=>{try{if(!CV.on)return;const b=document.querySelector('#cvCamp .besC');if(b)b.innerHTML='<b>Les besoins du camp</b>'+besoinsHtml(besoinsCamp(CV.camp))}catch(e){}},1500);
// dans la vue du camp : une icône au-dessus de ceux qui ont faim ou soif ; un clic l'envoie faire ce qui manque
{const lay=document.createElement('div');lay.id='bes106';lay.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:30';document.body.appendChild(lay);let parle=0;
 setInterval(()=>{try{if(!CV.on||!CV.A||!S){lay.innerHTML='';return}const cv=$('cvC');if(!cv){lay.innerHTML='';return}const r=cv.getBoundingClientRect(),ci=CV.camp,faim=(S.faimJ||0)>0||(S.vivres||0)<2,soif=soif106(ci)>60;if(!faim&&!soif){lay.innerHTML='';return}
  let h='';const P=S.pp.filter(p=>campDe(p)===ci);P.forEach(p=>{const a=CV.A[p.id];if(!a||!a.vis)return;const ic=soif?'💧':'🍽️';h+='<span data-b106="'+p.id+'" title="'+(soif?'A soif : l’envoyer chercher l’eau':'A faim : l’envoyer chasser')+'" style="position:absolute;left:'+(r.left+a.x*r.width-9)+'px;top:'+(r.top+a.y*r.height-34)+'px;font-size:15px;pointer-events:auto;cursor:pointer;filter:drop-shadow(0 1px 2px #000);animation:al106 1.4s infinite">'+ic+'</span>'});lay.innerHTML=h;
  lay.querySelectorAll('[data-b106]').forEach(s=>s.onclick=()=>{const p=ppId(+s.dataset.b106);if(!p)return;if(!adulte(p)){toast(p.n.split(' ')[0]+' est trop jeune.');return}p.tache=soif?'eau':'chasse';try{p.lieu=autoLieu(p,p.tache)}catch(e){}toast(p.n.split(' ')[0]+' part '+(soif?'chercher l’eau':'chasser')+'.');sauve();try{cvListe()}catch(e){}});
  if(performance.now()-parle>14000&&P.length){parle=performance.now();const p=P[Math.floor(rnd()*P.length)];try{dire(p,soif?['On a soif…','Qui va chercher l’eau ?','La calebasse est vide.'][Math.floor(rnd()*3)]:['On a faim…','Il n’y a plus rien dans la marmite.','Les enfants pleurent de faim.'][Math.floor(rnd()*3)])}catch(e){}}}catch(e){}},400)}

// ----- 11. Protéger l'ensemble contre le cyclone : une action sur la case du camp (ou de l'habitation), avec sa jauge -----
// Colons : du bois et de la pierre, d'autant plus qu'il y a de cases. Marrons : il faut une caverne connue pour y monter.
function prot106Cout(){const n=Math.max(1,camps().length+Math.floor(((S.bats||[]).length||0)/2));return {bois:2*n,pierre:n}}
{const a0=actions;actions=function(t){const A=a0(t);try{if(!S||K||(S.t[t.i]||{}).b!=='camp')return A;const p=S.prot106||0;if(p>=100)return A;
 if(S.voieC){const c=prot106Cout();A.push({id:'prot106',n:'🌀 Protéger contre le cyclone',c:1,d:'Volets, toits arrimés, pierres sur les paillotes : '+c.bois+' bois, '+c.pierre+' pierre (protection '+Math.round(p)+' %).'})}
 else A.push({id:'prot106',n:'🌀 Préparer la montée à la caverne',c:1,d:(typeof cav97Connue==='function'&&cav97Connue()?'Réserves et chemin vers la caverne connue':'Il faut d’abord trouver une caverne en explorant')+' (protection '+Math.round(p)+' %).'})}catch(e){}return A}}
{const g0=agir;agir=function(t,id,l){if(id!=='prot106')return g0.apply(this,arguments);try{if(!l){if((S.bras||0)<1)return false;snap();S.bras-=1}
 if(S.voieC){const c=prot106Cout(),R=S.res||(S.res={});if((R.bois||0)<c.bois||(R.pierre||0)<c.pierre){toast('Il faut '+c.bois+' bois et '+c.pierre+' pierre.');if(!l)S.bras+=1;return false}R.bois-=c.bois;R.pierre-=c.pierre;S.prot106=Math.min(100,(S.prot106||0)+50);log('🌀 L’habitation se prépare au cyclone : protection '+S.prot106+' %.')}
 else{if(!(typeof cav97Connue==='function'&&cav97Connue())){toast('Aucune caverne connue : envoyez explorer pour en trouver une.');if(!l)S.bras+=1;return false}S.prot106=Math.min(100,(S.prot106||0)+50);S.vivres=Math.max(0,(S.vivres||0)-2);log('🌀 On monte des réserves à la caverne : protection '+S.prot106+' %.')}
 if(S.prot106>=100)S.abri=1;sauve();try{peindre();panneau()}catch(e){}return true}catch(e){return false}}}
// la jauge dans les besoins (Abri), et elle retombe après chaque cyclone
{const bc=besoinsCamp;besoinsCamp=function(ci){const L=bc.apply(this,arguments);try{const i=L.findIndex(x=>x[0]==='Abri'),p=S.prot106||0;const lig=['Abri',Math.max(p,i>=0?L[i][1]*(S.abri?1:0):0),p>=100?'tout est arrimé':p>0?'protégé à '+Math.round(p)+' %':(S.cyc&&S.cyc.in<=2?'cyclone proche : rien n’est protégé':'rien n’est encore protégé'),0];if(i>=0)L[i]=lig;else L.push(lig)}catch(e){}return L}}
{let avant=null;setInterval(()=>{try{if(!S||!S.cyc)return;if(avant!=null&&S.cyc.in>avant+1){S.prot106=Math.max(0,(S.prot106||0)-60)}avant=S.cyc.in}catch(e){}},2000)}
// la jauge se voit aussi dans le panneau de la case du camp
{const pn=panneau;panneau=function(){const r=pn.apply(this,arguments);try{if(!S||K||!sel||(S.t[sel.i]||{}).b!=='camp')return r;const side=$('side');if(!side||side.querySelector('.prot106'))return r;const p=Math.round(S.prot106||0);const d=document.createElement('div');d.className='prot106';d.style.cssText='margin:6px 0;font-size:13px';d.innerHTML='🌀 Protection contre le cyclone : <b>'+p+' %</b><div style="height:7px;background:#3a3226;border-radius:4px;margin-top:3px"><div style="height:7px;width:'+p+'%;background:'+(p>=100?'#7fc36a':p>=50?'#e8be5a':'#d9705a')+';border-radius:4px"></div></div>';const h=side.querySelector('h2');if(h)h.after(d);else side.prepend(d)}catch(e){}return r}}

// ----- 12. Un fondu quand la carte passe du détail (zoom proche) à la vue normale, au lieu d'un changement sec -----
function fondu106(){try{const c=$('c');if(!c)return;c.style.transition='none';c.style.opacity='.45';requestAnimationFrame(()=>requestAnimationFrame(()=>{c.style.transition='opacity .55s ease';c.style.opacity='1'}))}catch(e){}}
{const ol=ouvrirLieu;ouvrirLieu=function(){const avant=lieu;const r=ol.apply(this,arguments);if(lieu&&lieu!==avant&&!avant)fondu106();return r}}
{const fl=fermerLieu;fermerLieu=function(){const avant=lieu;const r=fl.apply(this,arguments);if(avant&&!lieu)fondu106();return r}}

// ----- 13. La pluie se voit : averses pendant la saison des pluies (plus fortes à l'approche d'un cyclone), sur la carte et en vue personnage -----
function pluieF106(){try{if(!S||S.fin)return 0;const t=performance.now()/1000;const cyc=S.cyc&&S.cyc.in<=0?1:S.cyc&&S.cyc.in===1?.6:0;const sais=pluie()?.55:.12;const averse=Math.max(0,Math.sin(t*.07)+Math.sin(t*.031+1.3)*.6);return Math.min(1,Math.max(cyc,sais*averse))}catch(e){return 0}}
function rideau106(N){const P=new Float32Array(N*6),g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));const m=new THREE.LineBasicMaterial({color:0xbfd4e6,transparent:true,opacity:.5,depthWrite:false});const l=new THREE.LineSegments(g,m);l.frustumCulled=false;l.renderOrder=8;l.userData.v=new Float32Array(N).map(()=>.7+Math.random()*.6);return l}
function rideauMaj106(l,cx,cy,cz,R,H,f,dt,lg){const P=l.geometry.attributes.position.array,N=P.length/6,n=Math.floor(N*f);for(let i=0;i<N;i++){const k=i*6;if(i>=n){P[k+1]=P[k+4]=-1e4;continue}
 if(P[k+1]<cy-H*.2||P[k+1]>cy+H||Math.abs(P[k]-cx)>R||Math.abs(P[k+2]-cz)>R){P[k]=cx+(Math.random()*2-1)*R;P[k+2]=cz+(Math.random()*2-1)*R;P[k+1]=cy+Math.random()*H}
 const v=l.userData.v[i]*H*1.6*dt;P[k+1]-=v;P[k]+=v*.12;P[k+3]=P[k]-lg*.12;P[k+4]=P[k+1]+lg;P[k+5]=P[k+2]}l.geometry.attributes.position.needsUpdate=true;l.material.opacity=.25+.35*f}
{let L=null,LV=null,VS=null,t0=performance.now();(function boucle(){requestAnimationFrame(boucle);const now=performance.now(),dt=Math.min(.05,(now-t0)/1000);t0=now;try{
 const f=(S&&!modeHist())||(S&&modeHist()&&S.cyc&&S.cyc.in<=0)?pluieF106():0;
 if(typeof scene!=='undefined'&&scene){if(!L){L=rideau106(2500);scene.add(L)}L.visible=f>.03&&!VP;if(L.visible){const R=Math.max(3,dist*.9),H=Math.max(2.5,dist*.8);rideauMaj106(L,camT.x,camT.y,camT.z,R,H,f,dt,H*.06)}}
 if(VP&&VP.sc&&VP.cam){if(VS!==VP.sc){if(LV&&LV.parent)LV.parent.remove(LV);LV=rideau106(3000);VP.sc.add(LV);VS=VP.sc}LV.visible=f>.03;if(LV.visible){const c=VP.cam.position;rideauMaj106(LV,c.x,c.y-2,c.z,14,10,f,dt,.5)}}}catch(e){}})()}

// ----- 14. Les messages ne se chassent plus les uns les autres : une file, chacun reste lisible au moins 3 secondes -----
{const t0=toast;let q=[],der=0,tm=null,cur='';const suivant=()=>{tm=null;if(!q.length)return;const m=q.shift();cur=m;der=performance.now();t0(m);tm=setTimeout(suivant,3000)};
 toast=function(m){try{if(m===cur&&performance.now()-der<3000)return;if(q.includes(m))return;if(!tm&&performance.now()-der>=3000){cur=m;der=performance.now();t0(m);tm=setTimeout(suivant,3000);return}q.push(m);if(q.length>4)q.shift();if(!tm)tm=setTimeout(suivant,Math.max(0,3000-(performance.now()-der)))}catch(e){t0(m)}}}

// ----- 15. Les personnages de la carte gardent une taille lisible : plus petits vus de loin, plus grands de près -----
setInterval(()=>{try{if(typeof MF==='undefined'||!MF.L)return;const k=Math.max(.55,Math.min(1.6,1.75-dist*.035));for(const c in MF.L){const f=MF.L[c];if(!f||!f.o)continue;const u=f.o.userData;if(u.s0106==null)u.s0106=f.o.scale.x;const s=u.s0106*k;if(Math.abs(f.o.scale.x-s)>.001)f.o.scale.setScalar(s)}}catch(e){}},150);

// ----- 16. Le guide de la Vie : la bulle se pose à côté de la commande à utiliser, qui s'allume ; sans réponse, le guide s'arrête -----
const CIBLE106=[()=>CV.on?null:$('cvBtn'),()=>document.querySelector('#cvL .pc'),()=>document.querySelector('#cvL .pc'),()=>$('chPa'),()=>document.querySelector('#cvL .pc'),()=>null];
{const st=document.createElement('style');st.textContent='.cible106{outline:3px solid #e8be5a!important;outline-offset:3px;border-radius:8px;animation:cib106 1.2s ease-in-out infinite}@keyframes cib106{50%{outline-color:rgba(232,190,90,.25)}}#guideJ.pose106::after{content:"";position:absolute;width:14px;height:14px;background:inherit;border-left:1px solid #e8be5a;border-top:1px solid #e8be5a;transform:rotate(45deg);left:var(--fx,20px);top:-8px}';document.head.appendChild(st)}
setInterval(()=>{try{const b=$('guideJ');document.querySelectorAll('.cible106').forEach(e=>{if(!b||e!==b._cib)e.classList.remove('cible106')});if(!b||!S)return;const f=CIBLE106[S.guideN||0];const el=f&&f();if(!el||!el.offsetParent){b.classList.remove('pose106');b.style.left='50%';b.style.top='';b.style.bottom='110px';b.style.transform='translateX(-50%)';b._cib=null;return}
 el.classList.add('cible106');b._cib=el;const r=el.getBoundingClientRect(),w=b.offsetWidth||420,h=b.offsetHeight||120;let x=Math.min(innerWidth-w-10,Math.max(10,r.left+r.width/2-w/2)),y=r.bottom+14;if(y+h>innerHeight-10){y=Math.max(10,r.top-h-14)}
 b.classList.add('pose106');b.style.transform='none';b.style.bottom='';b.style.left=x+'px';b.style.top=y+'px';b.style.setProperty('--fx',Math.max(12,Math.min(w-24,r.left+r.width/2-x-7))+'px')}catch(e){}},300);

// ----- 17. Plusieurs groupes dehors : « voir les groupes » passe de l'un à l'autre ; un groupe encore au camp ne fait pas ouvrir un camp vide -----
{const cc=carteConnu;carteConnu=function(o){if(o&&o.mode==='dest')return cc.apply(this,arguments);try{if(!S||modeHist())return cc.apply(this,arguments);const G=(S.grp||[]).map((g,i)=>[g,i]).filter(([g])=>g.pos!=null);if(G.length<2)return cc.apply(this,arguments);
 if(CV.on)cvFermer();const cur=G.findIndex(([g,i])=>i===S.gSel);const [g,i]=G[(cur+1)%G.length];S.gSel=i;choisirTuile(T[g.pos]);try{conteVoir(T[g.pos],14)}catch(e){}
 const auCamp=camps().some(c=>c.i===g.pos);toast(g.n+(auCamp?' se prépare encore au camp : il part avec le jour.':' ('+(G.findIndex(x=>x[1]===i)+1)+'/'+G.length+'). Rappuyez pour le groupe suivant.'));return}catch(e){return cc.apply(this,arguments)}}}
{const vo=vpOuvrir;vpOuvrir=function(g){try{if(g&&typeof g==='object'&&g.m&&camps().some(c=>c.i===g.pos)){const ch=grpMembres(g)[0];toast(g.n+' est encore au camp : vous le rejoignez avant le départ.');return vo.call(this,ch?{moi:ch}:undefined)}}catch(e){}return vo.apply(this,arguments)}}
