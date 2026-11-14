// ===== p70 : Vie, côté colonie — le colon n'est pas un travailleur : il donne les ordres, parcourt ses champs, va vendre au marché =====
// Le colon (homme libre venu d'Europe ou créole) : parcourir ses champs, aller vendre ses vivres au marché du chef-lieu ou au port
// — jamais seul : deux esclaves portent la charge, et il faut un commandeur pour tenir les champs pendant son absence.
// Sa femme tient la maison ou va en ville faire ses achats. On n'« apprend auprès d'un adulte » que si l'on est jeune.
Object.assign(TACHES,{inspecte:['Parcourir ses champs','parcourt ses champs'],marche:['Aller vendre au marché','est parti vendre au marché'],maison:['Tenir la maison','tient la maison'],achats:['Aller en ville faire des achats','est en ville, aux achats']});
const T_COLON=['inspecte','marche','maison','achats'],T_TRAVAIL=['cueil','bois','paille','pierre','eau','cuisine','peche'];
const estColon=p=>!!p&&S.voieC&&p.st==='libre'&&(p.or==='eu'||p.or==='cr');
function marcheDispo(){const t=(S.towns||[]);const chef=S.year<1738?'Saint-Paul':'Saint-Denis';return t.includes(chef)?chef:t.includes('Saint-Paul')?'Saint-Paul':t[0]||null}
// les ordres proposés : selon qui l'on est
{const cl=cvListe;cvListe=function(){const r=cl.apply(this,arguments);try{const d=$('cvL');if(!d||!CV.on)return r;const p=CV.selP!=null&&ppId(CV.selP);const bt=document.querySelector('#campV [data-ta]')||document.querySelector('[data-ta]'),o=bt&&bt.closest('.pc');if(!o||!p)return r;
 const col=estColon(p),jeune=ageP(p)<16;
 o.querySelectorAll('[data-ta]').forEach(b=>{const k=b.dataset.ta;if(!k)return;let cacher=false;
  if(k==='appr'&&!jeune)cacher=true;
  if(T_COLON.includes(k)&&!col)cacher=true;
  if(col&&T_TRAVAIL.includes(k))cacher=true;
  if(col&&p.g==='f'&&['inspecte','marche','chasse','garde'].includes(k))cacher=true;
  if(col&&p.g!=='f'&&['maison','achats'].includes(k))cacher=true;
  if(cacher)b.remove();else if(b.title==='Trop jeune'&&ageP(p)>=16){b.disabled=false;b.title=''}});
 if(col){const m=marcheDispo(),cm=S.commandeur!=null&&ppId(S.commandeur),bm=o.querySelector('[data-ta="marche"]');
  if(bm&&(!m||!cm)){bm.disabled=true;bm.title=!m?'Pas encore de marché : il faut un chef-lieu ou un port.':'Il faut d’abord nommer un commandeur pour tenir les champs pendant l’absence.'}
  if(!o.querySelector('.colN')){const n=document.createElement('small');n.className='colN';n.style.cssText='display:block;opacity:.8;margin-top:4px';n.textContent=p.g==='f'?'La maîtresse de maison ne travaille pas aux champs : elle tient la maison ou va en ville.':'Le maître ne travaille pas de ses mains : il donne les ordres, parcourt ses champs, va vendre au marché avec deux esclaves.';o.appendChild(n)}}}catch(e){}return r}}
// ce que ces ordres font, jour après jour
{const jt=jourTick;jourTick=function(){jt.apply(this,arguments);try{if(!S||!S.voieC||modeHist()||S.fin)return;
 (S.pp||[]).filter(p=>estColon(p)&&adulte(p)).forEach(p=>{const k=tacheDe(p);
  if(k==='inspecte'){S.vivres=(S.vivres||0)+.4}
  else if(k==='marche'){const m=marcheDispo(),cm=S.commandeur!=null&&ppId(S.commandeur);if(!m||!cm||(S.vivres||0)<6){p.tache='inspecte';journal(p.n.split(' ')[0]+' ne part pas : '+(!m?'pas de marché':!cm?'pas de commandeur':'pas assez de vivres à vendre')+'.');return}
   p.mar=(p.mar||0)+1;if(p.mar>=2){p.mar=0;S.vivres-=5;S.bet=(S.bet||0)+1;p.tache='inspecte';const E=(S.pp||[]).filter(q=>q.st==='esclave'&&adulte(q)&&campDe(q)===campDe(p)).slice(0,2);
    journal(p.n.split(' ')[0]+' revient du marché de '+m+' avec '+(E.length?E.map(q=>q.n.split(' ')[0]).join(' et '):'ses porteurs')+' : cinq mesures de vivres vendues, une vache achetée.');}}
  else if(k==='achats'){if((S.vivres||0)>=3){S.vivres-=2;S.coh=Math.min(100,(S.coh||0)+1)}p.tache='maison';journal(p.n.split(' ')[0]+' rentre de la ville : sel, tissu, aiguilles.')}})}catch(e){}}}
// le but d'une famille de colons : une descendance — un couple sans enfant en attend un
{const jt=jourTick;jourTick=function(){jt.apply(this,arguments);try{if(!S||!S.voieC||modeHist()||S.fin||typeof nouvellePersonne!=='function')return;if((S.vivres||0)<(S.gens||10)*.5)return;
 const F={};(S.pp||[]).filter(estColon).forEach(p=>(F[p.fa]=F[p.fa]||[]).push(p));Object.values(F).forEach(L=>{const h=L.find(p=>p.g!=='f'&&adulte(p)),f=L.find(p=>p.g==='f'&&adulte(p)&&ageP(p)<42);if(!h||!f)return;const enf=L.filter(p=>!adulte(p)).length;
  if(Math.random()<(enf?0.004:0.012)){const b=nouvellePersonne({or:f.or,fa:f.fa,age:0,st:'libre'});b.camp=campDe(f);S.pp.push(b);S.gens=(S.gens||0)+1;journal('Une naissance chez '+h.n.split(' ')[0]+' et '+f.n.split(' ')[0]+' : '+b.n.split(' ')[0]+'. La famille aura sa descendance.');toast('Naissance : '+b.n.split(' ')[0]+'.')}})}catch(e){}}}
// laissés à eux-mêmes, le maître parcourt ses champs et la maîtresse tient la maison (ils ne vont pas couper du bois)
{const td=tacheDe;tacheDe=function(p){if(estColon(p)&&adulte(p)&&!(p.role==='cha'&&!p.tache)&&(!p.tache||T_TRAVAIL.includes(p.tache)))return p.g==='f'?'maison':'inspecte';return td.apply(this,arguments)}}
if(typeof P3GESTE!=='undefined')Object.assign(P3GESTE,{inspecte:'colon_inspecte',marche:'marche',maison:'repos_debout',achats:'marche'});
T_TRAVAIL.push('champ');
// ----- les enfants : chez les esclaves, au travail dès 7 ans (petite bande : bois, eau, paille, cueillette) ; plus petits, ils jouent — avec les enfants du maître s'il y en a -----
{const tp=tachesPossibles;tachesPossibles=function(p){if(S&&S.voieC&&p.st==='esclave'){const a=ageT(p);if(a>=7&&a<14)return ['bois','eau','cueil','paille','champ','repos']}return tp.apply(this,arguments)}}
{const jt=jourTick;jourTick=function(){jt.apply(this,arguments);try{if(!S||!S.voieC||modeHist()||S.fin)return;const P=(S.pp||[]);
 P.filter(p=>p.st==='esclave'&&ageT(p)>=7&&ageT(p)<14&&!p.tache).forEach(p=>{p.tache=['bois','eau','paille','cueil'][p.id%4]});
 const petits=P.filter(p=>ageT(p)<7),maitreE=petits.filter(estColon),escE=petits.filter(p=>p.st==='esclave');if(maitreE.length&&escE.length&&Math.random()<.15)journal(escE[0].n.split(' ')[0]+' joue avec '+maitreE[0].n.split(' ')[0]+', l’enfant du maître, derrière la grande maison.')}catch(e){}}}
// ----- le maître décide de tout sur sa propriété : dormir à l'abri, une ration de plus, un kabar le samedi soir — on le lui demande -----
const DEM_ESC=[
 {k:'abri',si:()=>{const R=typeof logerCamp==='function'?logerCamp(camps()[0].i):null;return R&&R.dehors.length>0},t:'Dormir à l’abri',h:'Des esclaves dorment dehors, sous l’auvent du moulin. Ils demandent à pouvoir dormir dans la case à paille.',oui:['Accepter',{coh:2,vivres:-1},'Ils s’entassent dans la case, au sec.'],non:['Refuser',{coh:-3},'Ils dormiront dehors encore cette nuit.']},
 {k:'ration',si:()=>(S.vivres||0)<(S.gens||10)*.8,t:'Une ration de plus',h:'Le commandeur rapporte que les esclaves des champs ont faim : ils demandent une mesure de manioc en plus.',oui:['Accorder la ration',{vivres:-3,coh:2},'La ration est distribuée au soir.'],non:['Refuser',{coh:-3},'Rien de plus. On murmure dans les cases.']},
 {k:'kabar',si:()=>((S.jourN||0)%7)===5,t:'Un kabar le samedi soir',h:'Les esclaves demandent la permission de se retrouver samedi soir autour du feu : roulèr, kayamb, chants des ancêtres.',oui:['Permettre le kabar',{coh:4,myst:1},'Le roulèr résonne jusqu’à minuit. Dimanche, on travaille mieux.'],non:['Interdire',{coh:-4},'Le feu reste éteint. Certains parlent de partir dans les Hauts.']}];
{const jt=jourTick;jourTick=function(){jt.apply(this,arguments);try{if(!S||!S.voieC||modeHist()||S.fin||S.year>=abolY()||typeof grpDialogue!=='function')return;if(S.demJ!=null&&(S.jourN||0)-S.demJ<4)return;
 const D=DEM_ESC.filter(d=>{try{return d.si()}catch(e){return false}});if(!D.length||Math.random()>.35)return;const d=D[Math.floor(Math.random()*D.length)];S.demJ=S.jourN||0;
 grpDialogue(d.t,d.h+' C’est au maître de décider.',[[d.oui[0],()=>{fx(d.oui[1]);journal(d.oui[2])}],[d.non[0],()=>{fx(d.non[1]);journal(d.non[2])}]])}catch(e){}}}
// ----- le commandeur porte un fouet à la main : on le reconnaît de loin -----
function fouet3D(){const g=new THREE.Group(),m=new THREE.MeshLambertMaterial({color:0x3a2416});const man=new THREE.Mesh(new THREE.CylinderGeometry(.9,1.1,9,6),m);man.position.y=-3;g.add(man);
 const cor=new THREE.Mesh(new THREE.TorusGeometry(4,.45,4,14,Math.PI*1.6),new THREE.MeshLambertMaterial({color:0x5a3a22}));cor.position.set(0,-9,2);cor.rotation.x=Math.PI/2;g.add(cor);return g}
function porteFouet(root,oui){if(!root)return;const u=root.userData;if(!u.fouetB){root.traverse(o=>{if(o.isBone&&o.name==='RightHand')u.fouetB=o})}if(!u.fouetB)return;if(oui&&!u.fouet){u.fouet=fouet3D();u.fouetB.add(u.fouet)}if(u.fouet)u.fouet.visible=!!oui}
setInterval(()=>{try{if(!S||!S.voieC)return;const cm=S.commandeur;
 if(typeof P3!=='undefined'&&P3.M)for(const id in P3.M){const m=P3.M[id];if(m&&m.o)porteFouet(m.o.g.scene,+id===cm||m.n==='commandeur')}
 if(typeof MF!=='undefined')for(const c in MF.L){const f=MF.L[c];if(f.o&&f.o.visible)porteFouet(f.o,f.n==='commandeur')}}catch(e){}},500);
