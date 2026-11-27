// ===== p372 : les coups propres à chaque style de combat, le super coup et sa jauge.
// Manipulations : « avant » = vers l'adversaire, « arrière » = en s'éloignant, ↓ = bas. La Forge pourra remplacer ces listes
// combattant par combattant (champ moves) et fabriquer d'autres coups. =====
// seq : la suite de directions (b = bas, av = avant, ar = arrière, h = haut) ; btn : p (poing) ou k (pied) ; k : le coup du duel joué
var MV372={
 capoeira:[{n:'Meia-lua de compasso',seq:'b,ar',btn:'k',k:'ret',lourd:1,tour:1,cd:1.6},{n:'Martelo',seq:'av,av',btn:'k',k:'k3',lourd:1,dx:30,cd:1.4},{n:'Rolê',seq:'ar,ar',btn:'p',esq:1,dx:70,cd:1.2}],
 moraingy:[{n:'Frappe plongeante',seq:'av,av',btn:'p',k:'p3',lourd:1,dx:70,cd:1.5},{n:'Revers du zébu',seq:'b,ar',btn:'p',k:'p2',lourd:1,tour:1,cd:1.4}],
 kalari:[{n:'Saut du tigre',seq:'b,h',btn:'k',k:'k3',lourd:1,dx:50,cd:1.6},{n:'Paume de l’éléphant',seq:'av,av',btn:'p',k:'p3',lourd:1,cd:1.4}],
 savate:[{n:'Fouetté',seq:'av,av',btn:'k',k:'k2',lourd:1,cd:1.2},{n:'Chassé bas',seq:'b,av',btn:'k',k:'bal',lourd:1,cd:1.4}],
 anglaise:[{n:'Crochet du ponton',seq:'av,av',btn:'p',k:'p3',lourd:1,dx:40,cd:1.3},{n:'Uppercut de la cale',seq:'b,h',btn:'p',k:'up',lourd:1,cd:1.5}],
 kungfu:[{n:'Coup de pied du dragon',seq:'b,ar',btn:'k',k:'ret',lourd:1,tour:1,cd:1.6},{n:'Paume de la grue',seq:'av,av',btn:'p',k:'p3',lourd:1,dx:40,cd:1.3}],
 escrime:[{n:'Fente',seq:'av,av',btn:'p',k:'p3',lourd:1,dx:80,cd:1.3},{n:'Moulinet',seq:'b,ar',btn:'p',k:'p2',lourd:1,tour:1,cd:1.5}],
 varma:[{n:'Point vital',seq:'b,av',btn:'p',k:'var',cd:3},{n:'Bond du singe',seq:'b,h',btn:'k',k:'k3',lourd:1,dx:60,cd:1.6}]};
// le super coup de chaque style (sinon « Coup de légende ») ; Grand Diab et les autres peuvent en recevoir un par la Forge (champ sup)
var SUP372={capoeira:{n:'Armada en vrille',k:'ret',d:28},moraingy:{n:'Charge du zébu',k:'p3',d:30},kalari:{n:'Vol du garuda',k:'k3',d:28},savate:{n:'Coup de pied de Joinville',k:'k3',d:26},anglaise:{n:'Directe du docker',k:'p3',d:28},kungfu:{n:'Cent poings',k:'p3',d:30},escrime:{n:'Coup de Jarnac',k:'p3',d:30},varma:{n:'Les cent huit points',k:'var',d:26}};
try{if(typeof DUE!=='undefined'){DUE.F.grandiab.sup={n:'Fourche du diable',k:'p3',d:32};DUE.F.tijean.sup={n:'Le tour de Ti Jean',k:'ret',d:26}}}catch(e){}
// la jauge du super coup, sous la barre de vie du joueur
function jauge372(){requestAnimationFrame(jauge372);const G=window.DUEL359;let d=document.getElementById('sg372');const vis=G&&G.A&&G.A.f&&document.querySelector('#duel')&&!G.ph;
 if(!vis){if(d)d.style.display='none';return}
 if(!d){d=document.createElement('div');d.id='sg372';d.style.cssText='position:fixed;left:44px;top:92px;width:260px;height:10px;border-radius:5px;background:rgba(0,0,0,.45);z-index:119;pointer-events:none;overflow:hidden;box-shadow:0 0 0 1px rgba(255,220,150,.35)';d.innerHTML='<i style="display:block;height:100%;width:0;background:linear-gradient(90deg,#c87a20,#ffd75a)"></i><b style="position:absolute;left:0;top:12px;font:700 12px Georgia,serif;color:#ffd75a;text-shadow:0 1px 2px #000;white-space:nowrap"></b>';document.body.append(d)}
 d.style.display='block';const v=G.A.sg372||0,i=d.firstChild;i.style.width=v+'%';const pl=v>=100;d.lastChild.textContent=pl?'SUPER prêt : ↓ ↓ + poing ou pied':'';d.style.boxShadow=pl?'0 0 12px #ffd75a':'0 0 0 1px rgba(255,220,150,.35)'}
requestAnimationFrame(jauge372);
// les chiens lâchés (pouvoir « Lâcher le chien », « La meute lâchée ») : un vrai chien en 3D qui court vers l'adversaire,
// au lieu du petit rectangle brun de la 2D qu'on ne voyait pas derrière les combattants
function chiens372(D3,G,sol,dt){const L=G.chiens||[];D3.ch372=D3.ch372||new Map();const M=D3.ch372;
 if(!D3.chT372&&typeof p3Charge==='function'){D3.chT372=1;p3Charge('ani_chien').then(()=>{D3.chOk372=1}).catch(()=>{})}
 const fA=D3.f&&D3.f.A,kpx=fA&&fA.grp?fA.grp.scale.x*(fA.h||1.75):180;
 L.forEach(c=>{let o=M.get(c);if(!o&&D3.chOk372){o={g:null};M.set(c,o);p3Instance('ani_chien').then(I=>{const g=new THREE.Group(),sc=I.g.scene;sc.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(sc),h=(b.max.y-b.min.y)||1;g.add(sc);const k=kpx*.55/h;g.scale.setScalar(k);sc.position.y=-b.min.y;o.g=g;o.mx=I.mx;const a=(I.g.animations||[]).find(x=>x.name==='marche');if(a){const ac=I.mx.clipAction(a);ac.timeScale=2.2;ac.play()}D3.S.add(g)}).catch(()=>{})}
  if(o&&o.g){o.g.visible=true;o.g.position.set(c.x,sol+2,30);o.g.rotation.y=(c.dir||1)>0?Math.PI/2:-Math.PI/2;if(o.mx)o.mx.update(dt)}});
 for(const [c,o] of M)if(!L.includes(c)){if(o.g)D3.S.remove(o.g);M.delete(c)}}
// l'aspect réglé dans la Forge : taille, teinte des habits, aura (pendant le super coup)
function aspect372(o,f){if(f.taille&&+f.taille>0&&+f.taille!==1)o.h=o.h/+f.taille;
 if(f.teinte&&+f.teinteF>0){const C=new THREE.Color(f.teinte),k=Math.min(1,+f.teinteF);o.g.scene.traverse(m=>{if(m.isMesh&&m.material){m.material=m.material.clone();if(m.material.color)m.material.color.lerp(C,k)}})}
 if(f.aura){o.aura372=new THREE.Color(f.aura);o.g.scene.traverse(m=>{if(m.isMesh&&m.material){if(!m.material.__c372){m.material=m.material.clone();m.material.__c372=1}if(m.material.emissive)m.userData.em372=m.material.emissive.clone()}})}}
// les effets d'un coup fabriqué dans la Forge, quand il touche
function fx372(c,o,fx){if(fx.etourdi)o.stun=Math.max(o.stun||0,+fx.etourdi);if(fx.recul&&!o.garde)o.x+=c.s*(+fx.recul);if(fx.chute&&!o.garde){o.down=Math.max(o.down||0,.9);o.nD=(o.nD||0)+1}if(fx.lent)o.lent=+fx.lent;if(fx.poison)o.poison=+fx.poison;if(fx.aveugle)o.aveugle=+fx.aveugle}
// l'aura brille pendant le super coup (appelée à chaque image par boss370)
function aura372(D3,G){[[G.A,D3.f&&D3.f.A],[G.B,D3.f&&D3.f.B]].forEach(([c,o])=>{if(!o||!o.aura372)return;const on=G.sup372>0&&c===G.A,k=on?.55+.25*Math.sin(performance.now()/90):0;o.g.scene.traverse(m=>{if(m.isMesh&&m.material&&m.material.emissive){if(k)m.material.emissive.copy(o.aura372).multiplyScalar(k);else if(m.userData.em372)m.material.emissive.copy(m.userData.em372)}})})}
// les enchaînements de départ (la Forge peut en fabriquer d'autres pour chaque combattant, champ chains)
// ch : la suite de coups (p1..p3 poings, k1..k3 pieds ; « av+p3 » = poing fort en avançant) ; le dernier coup est remplacé par le coup final
var CH372={
 milicien:[{n:'Coup de sabre montant',ch:'p1,p1,av+p3',k:'up',clip:'sabre',d:22,lourd:1,fx:{chute:1},cd:2.5}],
 milicienFr:[{n:'Coup de sabre montant',ch:'p1,p1,av+p3',k:'up',clip:'sabre',d:22,lourd:1,fx:{chute:1},cd:2.5}],
 milicienEn:[{n:'Coup de crosse',ch:'p1,p2,av+p3',k:'p3',clip:'fusil',d:20,lourd:1,fx:{recul:90},cd:2.5}],
 anglais:[{n:'Taille et estoc',ch:'p2,p2,av+p3',k:'p3',clip:'sabre',d:22,lourd:1,fx:{etourdi:.8},cd:2.5}],
 gouverneur:[{n:'Botte du roi',ch:'p1,p2,av+p3',k:'p3',clip:'sabre',d:20,lourd:1,fx:{recul:70},cd:2.5}],
 capoeira:[{n:'Benção',ch:'k1,k1,av+k3',k:'k3',d:20,lourd:1,fx:{recul:110},cd:2.5}],
 cimendef:[{n:'Colère du rempart',ch:'p1,p1,p2,av+p3',k:'up',d:22,lourd:1,fx:{chute:1},cd:3}],
 tijean:[{n:'La ruse de Ti Jean',ch:'p1,k1,ar+p2',k:'bal',d:16,fx:{chute:1},cd:2.5}],
 grandiab:[{n:'Fourche infernale',ch:'p2,p2,av+p3',k:'up',d:26,lourd:1,fx:{chute:1,recul:80},cd:3}]};
// l'arme apparaît dans la main pendant un coup qui la demande (sabre, fusil, bâton…), puis disparaît
var ARME372={sabre:['machette'],fusil:['fusil'],baton_coup:['baton'],sagaie:['lance'],couteau:['couteau'],hache:['hache']};
function arme372(D3,G){[[G.A,D3.f&&D3.f.A],[G.B,D3.f&&D3.f.B]].forEach(([c,o])=>{if(!c||!o||!o.g)return;const L=c.mv372&&c.act&&ARME372[c.mv372.clip];const cle=L?L.join():'';if(o.arme372===cle&&!L)return;
 o.g.scene.traverse(b=>{if(!b.isBone)return;if(L&&L.includes(b.name))b.scale.set(1,1,1);else if(o.arme372&&o.arme372.split(',').includes(b.name))b.scale.set(0,0,0)});o.arme372=cle})}
try{if(typeof DUE!=='undefined')Object.keys(DUE.F).forEach(k=>{DUE.F[k].k=DUE.F[k].k||k})}catch(e){}
function chTexte372(s){return (s||'').split(',').map(t=>{const [d,c]=t.includes('+')?t.split('+'):['',t];const n={p1:'poing faible',p2:'poing moyen',p3:'poing fort',k1:'pied faible',k2:'pied moyen',k3:'pied fort'}[c]||c;return (d?({av:'avant',ar:'arrière',b:'↓',h:'↑'}[d]||d)+' + ':'')+n}).join(', ')}
