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
