// ===== p84 : Vie en personnage — on s'incarne là où l'on est =====
// • Le chef s'incarne là où il se trouve : dans son groupe s'il est dehors, sinon au camp ou sur sa propriété. Au camp, les gens
//   vaquent à leur tâche ; on peut leur parler et leur donner un ordre (nettoyer la place, me suivre, se reposer, retourner
//   travailler ; aux enfants : apprendre, travailler, aller jouer). Ils reprennent ensuite leur tâche d'avant.
// • Tout groupe dehors peut s'incarner (bouton « Incarner » dans la liste des groupes).
// • Dans un groupe, on peut devenir un autre membre (pavé numérique 1 à 9, 0 = le chef) : ses numéros s'affichent au-dessus des
//   têtes. Un membre qui n'est pas le chef ne commande pas : il fait des demandes au chef. Chacun signale ce qu'il remarque selon
//   son rôle (une proie, une plante, une source mystique) par une icône au-dessus de lui.
// • On peut aussi manger (M), dormir (N), rentrer chez soi (H), même contre sa tâche du moment.
// • Le danger fait battre un voile rouge sur les bords de l'écran.
// Le pavé numérique sert maintenant à changer d'acteur : dans la disposition A, les actions passent sur les chiffres du haut.
VPCMD.A.nom='ZQSD + chiffres du haut';VPCMD.A.act=['Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9'];
let VPLIEU=null;
const vpChefCamp=()=>{const c=camps()[0];if(!c)return null;const P=(S.pp||[]).filter(adulte);return (S.voieC?P.find(p=>estColon(p)&&p.g!=='f'&&campDe(p)===c.i):null)||(typeof chefDe==='function'&&chefDe(c.i))||null};
const vpGrpDe=p=>p&&(S.grp||[]).find(g=>g.m.includes(p.id)&&g.pos!=null&&!(camps()[0]&&g.pos===camps()[0].i));
// on choisit le lieu : le groupe du chef s'il est dehors ; sinon le camp
{const vo=vpOuvrir;vpOuvrir=function(g){if(VP||!S||modeHist())return;if(g==null||typeof g!=='object'||!g.m){const ch=vpChefCamp();g=vpGrpDe(ch)||null}
 VPLIEU=g?{g}:{camp:1};if(!g)return vo.apply(this,[]);const sv={on:CV.on,camp:CV.camp},cf=cvFermer;CV.on=true;CV.camp=g.pos;cvFermer=()=>{};try{vo.apply(this,[])}finally{CV.on=sv.on;CV.camp=sv.camp;cvFermer=cf}}}
{const vg=vpGroupe;vpGroupe=function(ci){const L=VPLIEU||{camp:1};
 if(L.g){const M=grpMembres(L.g);if(!M.length)return null;const rk=p=>{try{return rangDe(p)}catch(e){return 5}};const chef=M.slice().sort((a,b)=>rk(a)-rk(b)||(b.role==='cha')-(a.role==='cha')||ageP(b)-ageP(a))[0];return {chef,C:M.filter(p=>p!==chef).slice(0,7),V:[]}}
 const G=vg.apply(this,arguments);if(!G)return G;const ci2=camps()[0]?camps()[0].i:ci;
 // au camp : on part seul (ou avec ses miliciens) ; les autres sont au travail autour et l'on forme son groupe sur place
 const C=G.C.filter(p=>p.virt);G.V=(S.pp||[]).filter(p=>p!==G.chef&&p.id!==G.chef.id&&campDe(p)===ci2&&!enGrp(p)&&!C.includes(p)).sort((a,b)=>adulte(b)-adulte(a)).slice(0,10);G.C=C;return G}}

function vpStyle84(){if($('vp84St'))return;const s=document.createElement('style');s.id='vp84St';s.textContent=
 '#vpA{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,rgba(200,0,0,0) 38%,rgba(200,10,10,.75) 100%);opacity:0;transition:opacity .15s}'+
 '#vpL{position:absolute;inset:0;pointer-events:none}#vpL div{position:absolute;transform:translate(-50%,-100%);font:700 13px Montserrat,sans-serif;text-shadow:0 1px 3px #000;white-space:nowrap;text-align:center}#vpL .nu{background:#f0c46a;color:#2a2016;border-radius:999px;min-width:22px;padding:1px 6px}#vpL .ic{font-size:20px}#vpL .nm{font-weight:500;font-size:11px;opacity:.85}'+
 '#vpV{position:absolute;right:14px;top:12px;background:#0009;border-radius:8px;padding:8px 10px;font-size:12px;max-width:260px;max-height:46vh;overflow:auto}#vpV .vl{display:flex;justify-content:space-between;gap:6px;padding:3px 0;border-top:1px solid #ffffff14;cursor:pointer}#vpV .vl:hover{color:#f0c46a}#vpV .mn{display:flex;flex-wrap:wrap;gap:4px;margin:4px 0 6px}'+
 '#vpV button,#vpMoi button{font:600 11px Montserrat,sans-serif;border-radius:999px;padding:3px 9px;cursor:pointer;color:#efe9da;background:transparent;border:1px solid #4a5a50}#vpV button:hover,#vpMoi button:hover{border-color:#f0c46a}'+
 '#vpMoi{position:absolute;left:14px;bottom:96px;display:flex;gap:5px;flex-wrap:wrap}#vpNoir{position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;transition:opacity 1.2s;display:flex;align-items:center;justify-content:center;font:italic 20px Alegreya,Georgia,serif;color:#efe9da}';
 document.head.appendChild(s)}

// ----- les gens du camp -----
const VPTRAV=[[/cult|champ|plant|jard|cann|caf|pierre/,{x:15,z:-40}],[/cuis|eau|lav|maison|soin/,{x:2,z:-27}],[/garde|guet/,{x:0,z:-17}],[/bois|paille|cueil|chass/,{x:-15,z:-24}]];
function vpPoste(p){if(!adulte(p))return {x:-7+Math.random()*3,z:-39+Math.random()*3};const t=(typeof tacheDe==='function'?tacheDe(p):'')||'';const r=VPTRAV.find(r=>r[0].test(t));const b=r?r[1]:{x:(Math.random()-.5)*16,z:-30+(Math.random()-.5)*14};return {x:b.x+(Math.random()-.5)*4,z:b.z+(Math.random()-.5)*4}}
function vpTacheNom(p){if(!adulte(p))return 'joue';const t=(typeof tacheDe==='function'?tacheDe(p):'')||'';return {chasse:'chasse',cueil:'cueillette',garde:'garde',soin:'soins',cuisine:'cuisine',repos:'repos',bois:'bois',paille:'paille',eau:'eau',pierre:'pierre'}[t]||t||'travail'}
function vpModele(o){const V=VP;p3Charge(o.n);const at=()=>{if(!VP||VP!==V)return;if(!P3.buf[o.n]){if(P3.ok&&P3.ok[o.n]===0)return;setTimeout(at,300);return}p3Instance(o.n).then(I=>{if(!VP||VP!==V)return;o.root=I.g.scene;o.anim=I.g.animations;o.mx=I.mx;V.sc.add(o.root);vpClip(o,'repos_debout')}).catch(()=>{})};at()}
function vpVillageois(){const V=VP;V.vil=(V.G.V||[]).map(p=>{const w=vpPoste(p),o={p,n:mfModeleDe(p),root:null,mx:null,clip:'',x:w.x,z:w.z,ang:Math.random()*6,poste:w,etat:'travail',t:0,cd:2,hp:3};vpModele(o);return o})}
function vpVilBoucle(dt){const V=VP;(V.vil||[]).forEach(o=>{let tx=o.poste.x,tz=o.poste.z,act='travail';const O=o.ordre;
 if(O){O.t-=dt;if(O.t<=0){vpFinOrdre(o);}else{tx=O.x;tz=O.z;act=O.k}}
 if(!adulte(o.p)&&(!O||O.k==='jouer')){const a=V.tps*.8+o.p.id;tx=(O?O.x:o.poste.x)+Math.cos(a)*2.5;tz=(O?O.z:o.poste.z)+Math.sin(a)*2.5}
 const dx=tx-o.x,dz=tz-o.z,d=Math.hypot(dx,dz),v=!adulte(o.p)?3.6:2.4;let mv=false;if(d>.5){const st=Math.min(d,v*dt);o.x+=dx/d*st;o.z+=dz/d*st;o.ang=Math.atan2(dx,dz);mv=true}
 if(o.root){o.root.position.set(o.x,V.h(o.x,o.z)-(act==='repos'&&!mv?.5:0),o.z);o.root.rotation.y=o.ang;vpClip(o,mv?(v>3?'course':'marche'):(act==='repos'?'repos_debout':act==='travail'||act==='nettoyer'||act==='apprendre'||act==='aider'?'chasse_traque':'repos_debout'));if(o.mx)o.mx.update(dt)}})}
const VPORD={adulte:[['nettoyer','🧹','Nettoyer la place'],['suivre','🚶','Me suivre'],['repos','😴','Aller se reposer'],['travail','🔨','Retourner travailler']],enfant:[['apprendre','📖','Apprendre'],['aider','🔨','Travailler'],['jouer','⚽','Aller jouer']]};
function vpOrdreVil(o,k){const V=VP,p=o.p,nm=p.n.split(/[ ,]/)[0];if(!o)return;
 if(k==='suivre'){V.vil=V.vil.filter(x=>x!==o);o.role='comp';o.cd=2+Math.random()*3;o.ord=null;o.hp=3;V.cp.push(o);if(V.troupe)V.troupe.push(o);vpMsg('« '+nm+', viens avec moi. » '+nm+' rejoint le groupe.');try{vpSelUI()}catch(e){}vpVilUI();return}
 if(k==='travail'){o.ordre=null;vpMsg(nm+' retourne à sa tâche ('+vpTacheNom(p)+').');vpVilUI();return}
 const pos=k==='nettoyer'?{x:(Math.random()-.5)*8,z:-30+(Math.random()-.5)*6}:k==='repos'?{x:Math.cos(p.id)*6.5,z:-30+Math.sin(p.id)*4.5}:k==='apprendre'?(()=>{const a=(V.vil||[]).find(x=>adulte(x.p)&&ageP(x.p)>=45)||(V.vil||[]).find(x=>adulte(x.p));return a?{x:a.x+1.2,z:a.z+1.2,maitre:a}:{x:0,z:-26}})():k==='aider'?(()=>{const a=(V.vil||[]).find(x=>adulte(x.p));return a?{x:a.poste.x+1,z:a.poste.z+1}:{x:2,z:-27}})():{x:-7,z:-38};
 o.ordre={k,x:pos.x,z:pos.z,t:22,maitre:pos.maitre};
 vpMsg({nettoyer:'« '+nm+', nettoie la place. »',repos:nm+' va se reposer à sa case.',apprendre:nm+' va apprendre auprès de '+(pos.maitre?pos.maitre.p.n.split(/[ ,]/)[0]:'un ancien')+'.',aider:nm+' va aider aux travaux.',jouer:nm+' file jouer avec les autres enfants.'}[k]);vpVilUI()}
function vpFinOrdre(o){const O=o.ordre,p=o.p;o.ordre=null;if(!O)return;
 if(O.k==='nettoyer'){S.coh=Math.min(100,(S.coh||0)+.5);vpMsg('La place est propre : le camp en est plus uni (cohésion +0,5).')}
 else if(O.k==='repos'){p.fat=0;if(p.blesse)p.blesse=Math.max(0,p.blesse-5)}
 else if(O.k==='apprendre'){const m=O.maitre&&O.maitre.p,k=m&&m.role==='mys'?'mys':m&&m.role==='cha'?'cha':'cue';p.sk=p.sk||{};p.sk[k]=(p.sk[k]||0)+.3;vpMsg(p.n.split(/[ ,]/)[0]+' a appris un peu ('+({mys:'les plantes et les esprits',cha:'la chasse',cue:'la cueillette'}[k])+').')}
 else if(O.k==='aider'){V0(()=>{S.vivres=(S.vivres||0)+.5})}
 else if(O.k==='jouer'){S.coh=Math.min(100,(S.coh||0)+.2)}vpVilUI()}
function V0(f){try{f()}catch(e){}}
function vpVilUI(){const V=VP;if(!V)return;let d=$('vpV');if(!V.vil||!V.vil.length){if(d)d.remove();return}if(!d){d=document.createElement('div');d.id='vpV';V.el.appendChild(d)}
 d.innerHTML='<b>'+(S.voieC?'Sur l’habitation':'Au camp')+'</b> <small>(cliquez un nom, ou F en face)</small>'+V.vil.map((o,i)=>'<div class="vl" data-v="'+i+'"><span>'+(adulte(o.p)?'':'🧒 ')+o.p.n.split(/[ ,]/)[0]+'</span><small>'+(o.ordre?{nettoyer:'nettoie',repos:'se repose',apprendre:'apprend',aider:'aide',jouer:'joue'}[o.ordre.k]:vpTacheNom(o.p))+'</small></div>'+(V.menuV===o?'<div class="mn">'+VPORD[adulte(o.p)?'adulte':'enfant'].map(a=>'<button data-o="'+i+'|'+a[0]+'">'+a[1]+' '+a[2]+'</button>').join('')+'</div>':'')).join('');
 d.querySelectorAll('[data-v]').forEach(x=>x.onclick=e=>{e.stopPropagation();const o=V.vil[+x.dataset.v];V.menuV=V.menuV===o?null:o;vpVilUI()});
 d.querySelectorAll('[data-o]').forEach(x=>x.onclick=e=>{e.stopPropagation();const [i,k]=x.dataset.o.split('|');const o=V.vil[+i];V.menuV=null;vpOrdreVil(o,k)})}

// ----- devenir un autre membre du groupe -----
const vpMoiChef=()=>VP&&VP.chef&&VP.chef.p===VP.G.chef;
function vpDevenir(o){const V=VP;if(!o||o===V.chef||(V.fight&&!V.fight.fin&&false))return;const i=V.cp.indexOf(o);if(i<0)return;const old=V.chef;old.hp=V.hp;V.cp[i]=old;V.chef=o;V.hp=o.hp!=null?Math.max(1,o.hp):3;V.sel&&V.sel.clear();V.perche=null;
 if(o.p===V.G.chef){V.ordre='suivre';vpMsg('Vous êtes de nouveau '+o.p.n.split(/[ ,]/)[0]+', le chef.')}else{V.ordre='attendre';V.cp.forEach(c=>{c.ax=c.x;c.az=c.z});const k=VPK[vpKind(o.p)];vpMsg('Vous êtes '+o.p.n.split(/[ ,]/)[0]+' ('+k[1]+'). Vous ne commandez pas : vous pouvez faire des demandes au chef.')}
 V.numT=2.5;try{vpSelUI()}catch(e){}vpHud()}
function vpDemande(k){const V=VP,moi=V.chef.p,chef=V.cp.find(o=>o.p===V.G.chef);if(!chef)return;const kd=vpKind(moi),cn=chef.p.n.split(/[ ,]/)[0];
 const poids=(kd==='ancien'||kd==='chasseur'||kd==='milicien')?.85:kd==='mystique'?.75:.5;if(Math.random()>poids){vpMsg('« Pas maintenant », répond '+cn+'.');return}
 if(k==='parla'){const fx=-Math.sin(V.yaw),fz=-Math.cos(V.yaw),tx=V.chef.x+fx*18,tz=V.chef.z+fz*18;V.ordre='attendre';V.cp.forEach((o,i)=>{o.ax=tx+((i%3)-1)*1.8;o.az=tz+Math.floor(i/3)*1.8});vpMsg(cn+' accepte : « Allons par là. » Le groupe se met en marche.')}
 else if(k==='chasser'){V.ordre='chasser';vpMsg(cn+' accepte : « On chasse ! »')}
 else if(k==='suivre'){V.ordre='suivre';vpMsg(cn+' accepte de vous suivre un moment.')}
 else if(k==='attendre'){V.ordre='attendre';V.cp.forEach(o=>{o.ax=o.x;o.az=o.z});vpMsg(cn+' fait halte.')}
 else if(k==='rentrer'){vpMsg(cn+' accepte : on rentre.');setTimeout(()=>{try{vpQuitter()}catch(e){}},1800)}}
{const su=vpSelUI;vpSelUI=function(){if(!VP)return;if(vpMoiChef())return su.apply(this,arguments);const d=$('vpS');if(!d)return;const ch=VP.cp.find(o=>o.p===VP.G.chef);
 d.innerHTML='<b>Demander au chef</b>'+(ch?' <small>('+ch.p.n.split(/[ ,]/)[0]+')</small>':'')+'<div class="ga">'+[['parla','🧭','Allons par là'],['chasser','🎯','Chassons'],['suivre','🚶','Suis-moi'],['attendre','✋','Faisons halte'],['rentrer','🏠','Rentrons']].map(a=>'<button data-d="'+a[0]+'">'+a[1]+' '+a[2]+'</button>').join('')+'</div><small>Pavé 0 : redevenir le chef · pavé 1–9 : un autre membre</small>';
 d.querySelectorAll('[data-d]').forEach(b=>b.onclick=e=>{e.stopPropagation();vpDemande(b.dataset.d)})}}
{const va=vpAction;vpAction=function(a){if(VP&&!vpMoiChef()&&(a==='suivre'||a==='attendre'||a==='chasser')&&!(VP.fight&&!VP.fight.fin)){vpDemande(a);return}return va.apply(this,arguments)}}
{const vh=vpHud;vpHud=function(){vh.apply(this,arguments);try{if(!VP||vpMoiChef())return;const d=$('vpH'),p=VP.chef.p,k=VPK[vpKind(p)];if(d)d.innerHTML=d.innerHTML.replace(/<b>[^<]*<\/b> · chef/,'<b>'+p.n+'</b> · '+k[1]+' (chef : '+VP.G.chef.n.split(/[ ,]/)[0]+')')}catch(e){}}}

// ----- ce que chacun remarque selon son rôle -----
function vpNotes(dt){const V=VP;V.noteT=(V.noteT||0)-dt;if(V.noteT>0)return;V.noteT=1;const ch=V.chef,dir=(x,z)=>{const a=Math.atan2(x-ch.x,z-ch.z)-(V.yaw+Math.PI),c=Math.cos(a),s=Math.sin(a);return c>.7?'devant':c<-.7?'derrière':s>0?'à gauche':'à droite'};
 V.cp.forEach(o=>{if(o.hp!=null&&o.hp<=0)return;const k=vpKind(o.p),sk=o.p.sk||{};let n=null;
  if(k==='chasseur'||k==='ancien'||k==='milicien'||(sk.cha||0)>=2){const a=V.an.find(a=>!a.mort&&Math.hypot(a.x-o.x,a.z-o.z)<26+(sk.cha||0)*2);if(a)n={ic:'🐐',m:'a repéré une proie',x:a.x,z:a.z,id:a}}
  if(!n&&(k==='cueilleur'||k==='esclave'||k==='soignante'||k==='mystique'||(sk.cue||0)>=2)){const c=(V.cueil||[]).find(c=>c.fr>0&&Math.hypot(c.x-o.x,c.z-o.z)<15);if(c)n={ic:'🌿',m:'a vu '+c.nom,x:c.x,z:c.z,id:c}}
  if(!n&&(k==='mystique'||k==='soignante'||(sk.mys||0)>=2)){const s=(V.src||[]).find(s=>!s.fait&&Math.hypot(s.x-o.x,s.z-o.z)<24);if(s)n={ic:'✨',m:'sent une source mystique',x:s.x,z:s.z,id:s}}
  if(n){if(!o.note||o.note.id!==n.id){if(!o.vu)o.vu=new Set();if(!o.vu.has(n.id)){o.vu.add(n.id);vpMsg(o.p.n.split(/[ ,]/)[0]+' '+n.m+', '+dir(n.x,n.z)+'.')}}o.note={...n,t:4}}else if(o.note){o.note.t-=1;if(o.note.t<=0)o.note=null}})}
function vpEtiquettes(){const V=VP,L=$('vpL');if(!L)return;const W=V.R.domElement.clientWidth,H=V.R.domElement.clientHeight,v=new THREE.Vector3(),out=[];
 const put=(x,y,z,cls,txt)=>{v.set(x,y,z).project(V.cam);if(v.z>1||Math.abs(v.x)>1.1||Math.abs(v.y)>1.1)return;out.push('<div class="'+cls+'" style="left:'+((v.x+1)/2*W).toFixed(0)+'px;top:'+((1-v.y)/2*H).toFixed(0)+'px">'+txt+'</div>')};
 const T=V.troupe||[];if(V.numT>0)T.forEach((o,i)=>{if(o.root)put(o.x,V.h(o.x,o.z)+2.3,o.z,'nu',o.p===V.G.chef?'0':String(i))});
 V.cp.forEach(o=>{if(o.note&&o.root)put(o.x,V.h(o.x,o.z)+(V.numT>0?2.9:2.35),o.z,'ic',o.note.ic)});
 (V.vil||[]).forEach(o=>{const d=Math.hypot(o.x-V.chef.x,o.z-V.chef.z);if(d<14&&o.root)put(o.x,V.h(o.x,o.z)+(adulte(o.p)?2.2:1.5),o.z,'nm',o.p.n.split(/[ ,]/)[0]+' · '+(o.ordre?o.ordre.k:vpTacheNom(o.p)))});
 L.innerHTML=out.join('')}

// ----- soi-même : manger, dormir, rentrer -----
function vpSoi(k){const V=VP;if(!V)return;const p=V.chef.p,nm=p.n.split(/[ ,]/)[0];if(V.fight&&!V.fight.fin)return vpMsg('Pas pendant le combat.');
 if(k==='manger'){if(V.hp>=3&&!(p.fat>0))return vpMsg(nm+' n’a pas faim.');if((S.vivres||0)<1&&V.viv<1)return vpMsg('Plus rien à manger.');if(V.viv>=1)V.viv--;else S.vivres-=1;V.hp=Math.min(3,V.hp+1);vpMsg(nm+' mange un peu (−1 vivre) : +1 souffle.')}
 else if(k==='dormir'){const n=$('vpNoir');if(n){n.textContent=nm+' dort…';n.style.opacity=1;V.dort=1;setTimeout(()=>{if(!VP)return;V.hp=3;p.fat=0;V.dort=0;n.style.opacity=0;vpMsg(nm+' se réveille reposé : souffle plein.');vpHud()},2600)}}
 else if(k==='maison'){if(VPLIEU&&VPLIEU.g){if(p===V.G.chef){vpMsg(nm+' décide de rentrer au camp avec son groupe.');setTimeout(()=>{try{vpQuitter()}catch(e){}},1500);return}
   const g=VPLIEU.g;g.m=g.m.filter(id=>id!==p.id);const me=V.chef;vpDevenir(V.cp.find(o=>o.p===V.G.chef));V.cp.splice(V.cp.indexOf(me),1);if(me.root)V.sc.remove(me.root);V.troupe=V.troupe.filter(o=>o!==me);try{journal(p.n+' quitte le groupe « '+g.n+' » et rentre seul au camp.')}catch(e){}vpMsg(nm+' quitte le groupe et rentre au camp.');try{vpSelUI()}catch(e){}return}
  V.auto={x:Math.cos(p.id||1)*6.5,z:-30+Math.sin(p.id||1)*4.5};vpMsg(nm+' rentre à sa case.')}vpHud()}

// ----- la mise en place et la boucle -----
function vp84Init(){const V=VP;if(!V||V.p84)return;V.p84=1;vpStyle84();V.troupe=[V.chef].concat(V.cp);
 const A=document.createElement('div');A.id='vpA';V.el.appendChild(A);const L=document.createElement('div');L.id='vpL';V.el.appendChild(L);const N=document.createElement('div');N.id='vpNoir';V.el.appendChild(N);
 const M=document.createElement('div');M.id='vpMoi';M.innerHTML='<button data-m="manger" title="M">🍠 Manger (M)</button><button data-m="dormir" title="N">😴 Dormir (N)</button><button data-m="maison" title="H">🏠 '+(VPLIEU&&VPLIEU.g?'Rentrer au camp':'Rentrer chez soi')+' (H)</button>';V.el.appendChild(M);
 M.querySelectorAll('[data-m]').forEach(b=>b.onclick=e=>{e.stopPropagation();vpSoi(b.dataset.m)});
 // dehors : pas de camp dans le décor, un petit feu de bivouac
 if(VPLIEU&&VPLIEU.g){V.sc.children.slice().forEach(o=>{const g=o.geometry;if(o.isMesh&&g&&g.type==='BoxGeometry'&&g.parameters&&(g.parameters.width===2.4||g.parameters.width===7))V.sc.remove(o);if(o.isPointLight&&Math.abs(o.position.z+30)<1)V.sc.remove(o)});V.arb=V.arb.filter(a=>!(Math.hypot(a.x,a.z+30)<9&&a.r>=1.3));
  const f=new THREE.Mesh(new THREE.ConeGeometry(.4,.7,6),new THREE.MeshBasicMaterial({color:0xff8a30}));f.position.set(2,V.h(2,-17)+.35,-17);V.sc.add(f);const l=new THREE.PointLight(0xffa040,1,10);l.position.set(2,V.h(2,-17)+1,-17);V.sc.add(l);
  vpMsg('Vous êtes avec « '+VPLIEU.g.n+' », dehors. Pavé numérique : devenir un autre membre (0 = le chef).')}
 else{vpVillageois();vpVilUI();vpMsg((S.voieC?'Vous êtes sur l’habitation':'Vous êtes au camp')+'. Parlez aux gens (liste à droite, ou F en face) pour former votre groupe.')}
 // des sources mystiques, que les mystiques sentent de loin
 V.src=[];for(let i=0;i<2;i++){let x,z,k=0;do{x=(Math.random()-.5)*130;z=(Math.random()-.5)*130;k++}while(k<40&&(Math.hypot(x,z+30)<15||V.arb.some(a=>Math.hypot(a.x-x,a.z-z)<a.r+1.5)));
  const m=new THREE.Mesh(new THREE.CircleGeometry(1.1,16).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0x7ab0d8,transparent:true,opacity:.8}));m.position.set(x,V.h(x,z)+.06,z);V.sc.add(m);const l=new THREE.PointLight(0xb08ae0,.9,7);l.position.set(x,V.h(x,z)+.8,z);V.sc.add(l);V.src.push({x,z,m,l,fait:0})}
 const kd=e=>{if(!VP||VP.en2D)return;if(e.repeat)return;const c=e.code;
  if(/^Numpad[0-9]$/.test(c)){e.preventDefault();e.stopPropagation();if(!VPLIEU||!VPLIEU.g){vpMsg('On ne change de personnage que dans un groupe, dehors. Au camp, on reste qui l’on est.');return}const n=+c.slice(6);if(e.shiftKey&&n>0){const o=VP.troupe[n];const i=VP.cp.indexOf(o);if(i>=0){vpSelect(i,true);vpSelUI()}VP.numT=2.5;return}
   VP.numT=2.5;if(n===0){vpDevenir(VP.cp.find(o=>o.p===VP.G.chef))}else vpDevenir(VP.troupe[n]);return}
  const k=e.key.toLowerCase();if(k==='m')vpSoi('manger');else if(k==='n')vpSoi('dormir');else if(k==='h')vpSoi('maison')};
 addEventListener('keydown',kd,true);const off0=V.off;V.off=()=>{off0&&off0();removeEventListener('keydown',kd,true)}}
// F : parler à quelqu'un du camp, se recueillir à une source
{const vd=vpDevant;vpDevant=function(){const V=VP;if(V&&V.p84&&!V.perche){const ch=V.chef,fx=-Math.sin(V.yaw),fz=-Math.cos(V.yaw),face=(x,z,d)=>{const dx=x-ch.x,dz=z-ch.z,l=Math.hypot(dx,dz)||1;return l<d&&(dx*fx+dz*fz)/l>.4};
  const o=(V.vil||[]).find(o=>face(o.x,o.z,2.8));if(o)return {k:'parler',o,lab:'Parler à '+o.p.n.split(/[ ,]/)[0]};const s=(V.src||[]).find(s=>!s.fait&&Math.hypot(s.x-ch.x,s.z-ch.z)<2.6);if(s)return {k:'source',o:s,lab:'Se recueillir à la source'}}return vd.apply(this,arguments)}}
{const vi=vpInteragir;vpInteragir=function(){const V=VP;if(V&&V.p84){const d=vpDevant();if(d&&d.k==='parler'){V.menuV=d.o;vpVilUI();vpMsg(d.o.p.n.split(/[ ,]/)[0]+' vous écoute : choisissez dans la liste à droite.');return}
  if(d&&d.k==='source'){const s=d.o;s.fait=1;s.l.intensity=.2;const k=vpKind(V.chef.p),g=(k==='mystique'||k==='soignante')?2:1;if(!S.voieC)S.myst=(S.myst||0)+g;V.hp=3;vpMsg(S.voieC?'L’eau est fraîche et calme : le souffle revient.':'Au bord de la source, '+V.chef.p.n.split(/[ ,]/)[0]+' sent les anciens tout près : +'+g+' mystique, souffle plein.');vpHud();return}}return vi.apply(this,arguments)}}
// la boucle
{const vb=vpBoucle;let last=performance.now(),hp0=3;vpBoucle=function(){const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;if(VP&&!VP.p84&&VP.p82)try{vp84Init()}catch(e){console.warn(e)}
 vb.apply(this,arguments);try{const V=VP;if(!V||!V.p84)return;const ch=V.chef;
  if(V.dort){V.chef.x=V.chef.x}
  // rentrer à sa case tout seul
  if(V.auto){const mv=['z','w','s','q','a','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].some(k=>V.keys[k]);if(mv)V.auto=null;else{const dx=V.auto.x-ch.x,dz=V.auto.z-ch.z,d=Math.hypot(dx,dz);if(d<1){V.auto=null;vpMsg(ch.p.n.split(/[ ,]/)[0]+' est chez lui.')}else{const st=Math.min(d,3.3*dt);ch.x+=dx/d*st;ch.z+=dz/d*st;ch.ang=Math.atan2(dx,dz);vpClip(ch,'marche');if(ch.root){ch.root.position.set(ch.x,V.h(ch.x,ch.z),ch.z);ch.root.rotation.y=ch.ang}}}}
  if(!VPLIEU||!VPLIEU.g){if(Math.hypot(ch.x,ch.z+30)<40&&!V.fight)V.embT=V.tps+35}
  vpVilBoucle(dt);vpNotes(dt);V.numT=Math.max(0,(V.numT||0)-dt);
  // le voile rouge du danger
  if(V.hp<hp0)V.coupT=2;hp0=V.hp;V.coupT=Math.max(0,(V.coupT||0)-dt);const proche=V.fight&&!V.fight.fin&&V.fight.E.some(e=>e.hp>0&&Math.hypot(e.x-ch.x,e.z-ch.z)<30);
  const dg=(V.coupT>0?1:0)+(proche?.8:V.fight&&!V.fight.fin?.5:0)+(V.hp<=1?.6:0);const A=$('vpA');if(A)A.style.opacity=dg?Math.min(1,dg)*(.45+.4*Math.sin(V.tps*(V.coupT>0?12:6))):0;
  V.etT=(V.etT||0)-dt;if(V.etT<=0){V.etT=.06;vpEtiquettes()}
 }catch(e){console.warn(e)}}}
// p82 : la sélection des compagnons passe sur Maj + pavé numérique (les chiffres du haut sont des actions dans la disposition A)

// ----- « Incarner » un groupe dehors -----
{const pn=panneau;panneau=function(){const r=pn.apply(this,arguments);try{document.querySelectorAll('[data-gv]').forEach(b=>{if(b.nextElementSibling&&b.nextElementSibling.dataset&&b.nextElementSibling.dataset.gi!=null)return;const g=(S.grp||[])[+b.dataset.gv];if(!g||g.pos==null)return;
 const x=document.createElement('button');x.className=b.className||'bt';x.dataset.gi=b.dataset.gv;x.textContent='🧍 Incarner';x.title='Prendre ce groupe en main, là où il est';x.style.marginLeft='4px';x.onclick=e=>{e.stopPropagation();const g2=(S.grp||[])[+x.dataset.gi];if(g2)vpOuvrir(g2)};b.after(x)})}catch(e){}return r}}
