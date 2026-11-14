// ===== p23 : la vie de l'habitation et du camp — portes, murs des cases, décors des micro-régions, champs et fuites, rôle des enfants =====

// ---------- 1. Les textures des murs : gaulettes et paille pour les cases marronnes, planches pour l'habitation ----------
const P23={tx:{}};
function p23Tex(k){if(P23.tx[k])return P23.tx[k];const c=document.createElement('canvas');c.width=256;c.height=128;const x=c.getContext('2d'),r=n=>{let s=n*9301+49297;return()=>((s=(s*9301+49297)%233280)/233280)},R=r(k.length*7);
 if(k==='gaul'){x.fillStyle='#6b5232';x.fillRect(0,0,256,128);for(let i=0;i<40;i++){const w=4+R()*3,cx=i*6.4+R()*2;x.fillStyle='hsl(30,'+(28+R()*15)+'%,'+(26+R()*16)+'%)';x.fillRect(cx,0,w,128);x.fillStyle='rgba(0,0,0,.25)';x.fillRect(cx+w-1,0,1,128)}
  // les liens de lianes qui tiennent les gaulettes, et le bas enduit de terre
  [34,86].forEach(y=>{x.strokeStyle='#3f2e1a';x.lineWidth=3;x.beginPath();for(let i=0;i<=256;i+=8){x.lineTo(i,y+Math.sin(i*.4)*2)}x.stroke()});x.fillStyle='rgba(110,80,50,.75)';x.fillRect(0,106,256,22)}
 else if(k==='paille'){x.fillStyle='#b8995a';x.fillRect(0,0,256,128);for(let i=0;i<900;i++){const px=R()*256,py=R()*128;x.strokeStyle='hsla(40,'+(35+R()*20)+'%,'+(40+R()*25)+'%,.8)';x.lineWidth=1;x.beginPath();x.moveTo(px,py);x.lineTo(px+(R()-.5)*3,py+8+R()*10);x.stroke()}for(let y=16;y<128;y+=22){x.fillStyle='rgba(60,40,20,.25)';x.fillRect(0,y,256,2)}}
 else if(k==='planche'){x.fillStyle='#b89a70';x.fillRect(0,0,256,128);for(let y=0;y<128;y+=12){x.fillStyle='hsl(32,'+(30+R()*10)+'%,'+(52+R()*12)+'%)';x.fillRect(0,y,256,11);x.fillStyle='rgba(60,40,20,.45)';x.fillRect(0,y+11,256,1)}}
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;if(THREE.sRGBEncoding)t.encoding=THREE.sRGBEncoding;return P23.tx[k]=t}

// ---------- 2. Les portes : une porte par case, qui s'ouvre quand quelqu'un passe ----------
{const pd=p3Deco;p3Deco=function(L,C){pd(L,C);const G=P3.deco;P3.portes=[];
 const M=c=>new THREE.MeshLambertMaterial({color:new THREE.Color(c).convertSRGBToLinear()});
 // les murs : on habille les cases déjà posées
 G.children.forEach(o=>{const g=o.geometry,pa=g&&g.parameters||{};
  if(!C&&g.type==='CylinderGeometry'&&pa.radiusTop===1.5&&pa.height===1.7){const t=p23Tex('gaul').clone();t.needsUpdate=true;t.repeat.set(3,1);o.material=new THREE.MeshLambertMaterial({map:t})}
  else if(!C&&g.type==='ConeGeometry'&&pa.radius===2.2){const t=p23Tex('paille').clone();t.needsUpdate=true;t.repeat.set(3,1);o.material=new THREE.MeshLambertMaterial({map:t})}
  else if(C&&g.type==='BoxGeometry'&&pa.width===3.2&&pa.height===1.9){const t=p23Tex('planche').clone();t.needsUpdate=true;t.repeat.set(1.5,1);o.material=new THREE.MeshLambertMaterial({map:t})}});
 const [fx,fz]=p3W(...L.feu);
 L.cases.forEach(([u,v],i)=>{const [x,z]=p3W(u,v);let px,pz,ang,w,h;
  if(!C){ang=Math.atan2(fx-x,fz-z);px=x+Math.sin(ang)*1.56;pz=z+Math.cos(ang)*1.56;w=.85;h=1.25}
  else if(i===0){ang=0;px=x;pz=z+2.27;w=1.1;h=2.1}else{ang=0;px=x;pz=z+1.22;w=.8;h=1.45}
  // l'ouverture sombre, puis le battant monté sur ses gonds
  const trou=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:0x140e08}));trou.position.set(px+Math.sin(ang)*.02,h/2,pz+Math.cos(ang)*.02);trou.rotation.y=ang;G.add(trou);
  const gond=new THREE.Group();gond.position.set(px-Math.cos(ang)*w/2+Math.sin(ang)*.05,0,pz+Math.sin(ang)*w/2+Math.cos(ang)*.05);gond.rotation.y=ang;
  const bat=new THREE.Mesh(new THREE.BoxGeometry(w,h,.07),C?M(i===0?0x6a4a2a:0x7a5a3a):new THREE.MeshLambertMaterial({map:p23Tex('paille')}));bat.position.set(w/2,h/2,0);gond.add(bat);G.add(gond);
  P3.portes.push({g:gond,a0:ang,o:0,x:px,z:pz})})}}
function p23Portes(){if(!P3.portes||!CV.on)return;const A=Object.values(CV.A||{});P3.portes.forEach(d=>{const pr=A.some(a=>{const [x,z]=p3W(a.x,a.y);return Math.hypot(x-d.x,z-d.z)<2.2});const cible=pr?1:0;d.o+=(cible-d.o)*.12;d.g.rotation.y=d.a0-d.o*1.35})}
{const pb=p3Boucle;p3Boucle=function(){const r=pb.apply(this,arguments);try{p23Portes()}catch(e){}return r}}

// ---------- 3. Les décors des micro-régions : chaque lieu a ses plantes ----------
// Formes simples, à l'échelle des arbres existants. Espèces indigènes ou présentes tôt sur l'île.
function p23Mod(nom,ps,max){if(MOD[nom])return MOD[nom];const P=[],N=[],Cc=[],q=new THREE.Color();ps.forEach(([g0,col,mt])=>{const g=g0.index?g0.toNonIndexed():g0;if(mt)g.applyMatrix4(mt);q.set(col);const a=g.attributes.position,e=g.attributes.normal;for(let i=0;i<a.count;i++){P.push(a.getX(i),a.getY(i),a.getZ(i));N.push(e.getX(i),e.getY(i),e.getZ(i));Cc.push(q.r,q.g,q.b)}});
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));g.setAttribute('color',new THREE.Float32BufferAttribute(Cc,3));
 const m=new THREE.InstancedMesh(g,new THREE.MeshLambertMaterial({vertexColors:true}),max);m.instanceColor=new THREE.InstancedBufferAttribute(new Float32Array(max*3).fill(1),3);m.frustumCulled=false;m.count=0;m.userData={n:0,max};scene.add(m);return MOD[nom]=m}
const TR23=(x,y,z,rx=0,ry=0,rz=0,sx=1,sy=1,sz=1)=>new THREE.Matrix4().compose(new THREE.Vector3(x,y,z),new THREE.Quaternion().setFromEuler(new THREE.Euler(rx,ry,rz)),new THREE.Vector3(sx,sy,sz));
function p23Mods(){const TR=TR23;const cy=(a,b,h,n=6)=>new THREE.CylinderGeometry(a,b,h,n),co=(r,h,n=7)=>new THREE.ConeGeometry(r,h,n),bx=(w,h,d)=>new THREE.BoxGeometry(w,h,d),sp=r=>new THREE.IcosahedronGeometry(r,1);
 // tamarin des Hauts : tronc tordu et penché, couronne large et plate
 p23Mod('tamarin',[[cy(.02,.032,.26),0x5a4430,TR(0,.12,0,0,0,.25)],[cy(.014,.02,.14),0x5a4430,TR(.06,.27,0,0,0,-.6)],[sp(.15),0x4f7a3a,TR(.06,.36,0,0,0,0,1.5,.45,1.2)],[sp(.1),0x5f8a44,TR(-.05,.33,.05,0,0,0,1.3,.4,1)]],300);
 // vacoa : racines-échasses, tronc fin, bouquets de feuilles en lanières
 p23Mod('vacoa',[...[0,1,2,3].map(k=>[cy(.006,.008,.12,4),0x6a5a3a,TR(Math.cos(k*1.57)*.03,.05,Math.sin(k*1.57)*.03,Math.sin(k*1.57)*.4,0,-Math.cos(k*1.57)*.4)]),[cy(.012,.016,.3),0x7a6a48,TR(0,.24,0)],...[0,1,2,3,4,5,6,7,8].map(k=>[bx(.16,.006,.02),0x5c8a3e,TR(Math.cos(k*.7)*.06,.4,Math.sin(k*.7)*.06,0,-k*.7,-.5)])],200);
 // latanier : palmier en éventail, des bas et de la savane
 p23Mod('latanier',[[cy(.014,.02,.36),0x7a6448,TR(0,.18,0)],...[0,1,2,3,4,5].map(k=>[co(.07,.03,8),0x6c8c46,TR(Math.cos(k*1.05)*.07,.38,Math.sin(k*1.05)*.07,Math.sin(k*1.05)*.9,0,-Math.cos(k*1.05)*.9)])],200);
 // palmiste : stipe droit, palmes pennées en couronne — son cœur nourrit les marrons
 p23Mod('palmiste',[[cy(.01,.014,.48),0x8a7a62,TR(0,.24,0)],[cy(.016,.016,.06),0x5a7a42,TR(0,.5,0)],...[0,1,2,3,4,5,6].map(k=>[bx(.2,.004,.035),0x3f7a3c,TR(Math.cos(k*.9)*.09,.55,Math.sin(k*.9)*.09,0,-k*.9,.35)])],220);
 // branle : buisson bas et serré des sommets
 p23Mod('branle',[[sp(.06),0x5d6b3a,TR(0,.04,0,0,0,0,1.2,.8,1.2)],[sp(.045),0x6f7a44,TR(.05,.05,.02)],[sp(.04),0x55633a,TR(-.04,.045,-.03)]],400);
 // galets de bord de mer
 p23Mod('galet',[[sp(.035),0x8a8a86,TR(0,.015,0,0,0,0,1.3,.6,1)],[sp(.025),0x6e6e6a,TR(.05,.01,.02,0,0,0,1.2,.6,1)]],300)}
// ce qu'on sait de chaque micro-région, pour le dire en arrivant
const P23MR={
 'Littoral':['Le littoral','Galets, vacoas et lataniers. Les tortues pondent encore sur certaines plages ; les marrons ne descendent que la nuit.'],
 'Savane sèche sous le vent':['La savane sous le vent','Herbes sèches, lataniers et bois de chandelle. Peu d’eau, peu d’ombre : on y voit loin, et on y est vu.'],
 'Bois de couleurs':['Les bois de couleurs','La forêt des pentes : bois de pomme, bois de nèfles, fanjans et palmistes. Le cœur du palmiste se mange.'],
 'Forêt humide du vent':['La forêt humide du vent','Pluie presque chaque jour : la forêt descend jusqu’à la côte, au bord de courtes plages de galets au pied des remparts et des grandes embouchures. Défrichée, elle devient terre à canne.'],
 'Forêt humide à fanjans':['Les fanjans de mi-pente','Au-dessus des bas, la forêt de fougères arborescentes : fanjans serrés, mousses, l’eau qui ruisselle partout.'],
 'Forêt de tamarins des Hauts':['Les tamarins des Hauts','Grands tamarins penchés, sous-bois clair. Il fait froid la nuit ; le bois brûle bien.'],
 'Fourrés de branles':['Les fourrés de branles','Des buissons serrés à hauteur d’homme. On s’y cache bien, mais on n’y trouve presque rien à manger.'],
 'Scories d’altitude':['Les scories','Pierre rouge et noire, vent, givre. Rien n’y pousse ; on y passe sans s’arrêter.'],
 'Coulées de lave':['Les coulées','La lave récente, encore nue. Des fougères y reviennent lentement.']};
{const rl=remplirLieu;remplirLieu=function(){if(!MOD.tamarin)p23Mods();const t=lieu,s=MOD.sapin;MOD.sapin=MOD.tamarin;try{rl()}finally{MOD.sapin=s}if(!t||t.bare)return;
 const o=S.t[t.i]||{},ra=o.b==='camp'?1.3:0,hC=new THREE.Color(1,1,1),cou=(k,s)=>{const a=rndH(k*s+t.i)*6.283,d=Math.sqrt(rndH(k*s+7))*3.15;return [t.x+Math.cos(a)*d,t.z+Math.sin(a)*d,a]};
 const pose=(m,n,s,f,sc=1)=>{for(let k=0;k<n;k++){const [x,z,a]=cou(k,s),h=alt(x,z);if(!f(h)||Math.hypot(x-t.x,z-t.z)<ra)continue;const v=.85+rndH(k+11)*.3;hC.setRGB(v,v,v);poseM(m,x,h*VX+.03,z,a,0,0,(.8+rndH(k+5)*.6)*sc,hC)}};
 const b=t.biome,mer=t.alt<90;
 if(mer){pose(MOD.galet,120,5.3,h=>h>0&&h<25);pose(MOD.vacoa,40,6.1,h=>h>2&&h<120);pose(MOD.latanier,25,6.7,h=>h>5&&h<150)}
 if(/Savane/.test(b))pose(MOD.latanier,45,7.3,h=>h>5);
 if(/Bois de couleurs|humide/.test(b)){pose(MOD.palmiste,/humide/.test(b)?70:45,7.9,h=>h>8);if(!mer)pose(MOD.vacoa,15,8.3,h=>h>8)}
 if(/tamarins/.test(b))pose(MOD.branle,60,8.7,h=>h>8,.8);
 if(/branles/.test(b)){pose(MOD.branle,260,9.1,h=>h>8,1.1);pose(MOD.tamarin,25,9.7,h=>h>8,.7)}}}
// en zoomant sur un lieu, on dit dans quel milieu on arrive
{const ol=ouvrirLieu;ouvrirLieu=function(t){const r=ol.apply(this,arguments);try{if(lieu===t){const k=t.alt<90?'Littoral':t.bare&&t.alt>2350?'Scories d’altitude':t.biome,d=P23MR[k]||P23MR[t.biome];if(d){const box=$('p23mr')||(()=>{const e=document.createElement('div');e.id='p23mr';e.style.cssText='position:fixed;left:50%;transform:translateX(-50%);bottom:110px;z-index:6;max-width:520px;background:rgba(20,26,27,.92);border:1px solid #e2bd7466;border-radius:8px;padding:8px 12px;color:#f3e9d0;font:13px system-ui;pointer-events:none;transition:opacity .6s';document.body.appendChild(e);return e})();
   box.innerHTML='<b style="color:#e8be5a">'+d[0]+(t.cirq?' · cirque de '+t.cirq:'')+(t.ilet?' · un îlet':'')+'</b><br>'+d[1];box.style.opacity=1;clearTimeout(box._t);box._t=setTimeout(()=>box.style.opacity=0,9000)}}}catch(e){}return r}}
{const fl=fermerLieu;fermerLieu=function(k){const b=$('p23mr');if(b)b.style.opacity=0;return fl(k)}}

// ---------- 4. L'habitation coloniale : les champs, les fuites, la reprise ----------
TACHES.champ=['Travailler aux champs','travaille aux champs'];
function p23Esc(p){return S&&S.voieC&&p.st==='esclave'&&S.year<abolY()}
// aux champs : un peu de vivres et de récolte, beaucoup de fatigue
{const jt=jourTick;jourTick=function(){jt.apply(this,arguments);if(!S||modeHist()||S.fin||!S.voieC)return;S.fug=S.fug||[];
 const aux=(S.pp||[]).filter(p=>!enGrp(p)&&tacheDe(p)==='champ'&&(adulte(p)||ageT(p)>=8));aux.forEach(p=>{const ad=adulte(p);S.vivres+=ad?.45:.15;S.recolte=(S.recolte||0)+(ad?1:.3);p.fat=Math.min(100,(p.fat||0)+(ad?14:8))});
 if(aux.length&&rnd()<.25)journal(aux.length+' personne'+(aux.length>1?'s':'')+' aux champs depuis l’aube.');
 // la fuite : la fatigue, la faim et le temps passé poussent à partir vers les Hauts
 (S.pp||[]).filter(p=>adulte(p)&&!enGrp(p)&&p23Esc(p)).forEach(p=>{const ch=.0025+((p.fat||0)>80?.008:0)+(S.vivres<3?.006:0)+(tacheDe(p)==='champ'?.002:0);if(rnd()<ch*(window.__fuiteF||1)){S.pp=S.pp.filter(q=>q!==p);const c=campDe(p);S.fug.push({p,c,an:S.year});if(CV.A)delete CV.A[p.id];log(p.n+' s’est enfui'+(p.g==='f'?'e':'')+' dans la nuit, vers les Hauts.');journal(p.n.split(' ')[0]+' n’est pas là à l’appel du matin.');toast(p.n+' a fui l’habitation. Ouvrez l’habitation pour décider.')}})}}
// la reprise : un détachement, ou rien. Ce qui suit une reprise est raconté, jamais joué.
function p23Reprise(f){const ch=(S.pp||[]).filter(p=>adulte(p)&&!enGrp(p)&&p.role==='cha'&&!p23Esc(p)),n=ch.length;if(!n){toast('Il faut au moins un chasseur libre pour monter un détachement.');return}
 const ok=rnd()<Math.min(.8,.25+.15*n);S.fug=S.fug.filter(x=>x!==f);ch.forEach(p=>p.fat=Math.min(100,(p.fat||0)+30));
 if(ok){S.pp.push(f.p);f.p.fat=90;log('Le détachement ramène '+f.p.n+'. Le Code noir prévoit le fouet pour une première fuite : l’habitation se tait.');fx({coh:-6})}
 else{log('Le détachement rentre bredouille : '+f.p.n+' a gagné les Hauts. On dit qu’'+(f.p.g==='f'?'elle':'il')+' a rejoint une bande.');S.ins=Math.min(100,(S.ins||0)+3)}
 sauve();cvListe()}
function p23Laisser(f){S.fug=S.fug.filter(x=>x!==f);log(f.p.n+' ne sera pas poursuivi'+(f.p.g==='f'?'e':'')+'.');sauve();cvListe()}
{const cl=cvListe;cvListe=function(){cl.apply(this,arguments);const d=$('cvL');if(!d||!CV.on||!S.voieC)return;const F=(S.fug||[]).filter(f=>f.c===CV.camp);if(!F.length)return;
 const box=document.createElement('div');box.className='pc';box.innerHTML='<b>Partis vers les Hauts</b><br>'+F.map((f,n)=>'<small>'+f.p.n+' · parti'+(f.p.g==='f'?'e':'')+' en '+f.an+'</small><br><button class="bt" data-rp="'+n+'">Envoyer un détachement</button><button class="bt sec" data-ls="'+n+'">Ne pas poursuivre</button>').join('<br>')+'<p class="note" style="margin:4px 0 0">Les chances dépendent du nombre de chasseurs libres. Les châtiments ne sont pas joués : le journal dit seulement ce que la loi prévoyait.</p>';d.appendChild(box);
 box.querySelectorAll('[data-rp]').forEach(b=>b.onclick=()=>p23Reprise(F[+b.dataset.rp]));box.querySelectorAll('[data-ls]').forEach(b=>b.onclick=()=>p23Laisser(F[+b.dataset.ls]))}}

// ---------- 5. Les enfants : apprendre auprès d'un adulte, et selon leur condition ----------
TACHES.appr=['Apprendre auprès d’un adulte','apprend'];TACHES.ecole=['Le catéchisme','va au catéchisme'];
{const tp=tachesPossibles;tachesPossibles=function(p){const L=tp(p),a=ageT(p);if(adulte(p))return L.filter(k=>k!=='ecole'&&k!=='appr');if(a<8)return L;const r=L.slice();
 if(a>=10)r.push('appr');if(S.voieC){if(p.st==='esclave'&&S.year<abolY())r.push('champ');else r.push('ecole')}return r}}
function p23Mentor(p){const c=campDe(p);let m=p.mentor!=null&&ppId(p.mentor);if(m&&adulte(m)&&campDe(m)===c&&m.role)return m;
 m=(S.pp||[]).filter(q=>adulte(q)&&q.role&&campDe(q)===c&&!enGrp(q)).sort((a,b)=>(b.niv||0)-(a.niv||0)||(a.fa===p.fa?-1:1))[0];p.mentor=m?m.id:null;return m}
// chaque jour : l'apprenti gagne de l'expérience dans le métier de son maître ; adulte, il le prend
{const jt=jourTick;jourTick=function(){jt.apply(this,arguments);if(!S||modeHist()||S.fin)return;
 (S.pp||[]).filter(p=>!enGrp(p)).forEach(p=>{if(!adulte(p)&&tacheDe(p)==='appr'){const m=p23Mentor(p);if(m){p.ap=p.ap||{};p.ap[m.role]=(p.ap[m.role]||0)+.25;if(rnd()<.08)journal(p.n.split(' ')[0]+' suit '+m.n.split(' ')[0]+' toute la journée.')}}
  if(!adulte(p)&&tacheDe(p)==='ecole'){S.savoir=(S.savoir||0)+.02}
  if(adulte(p)&&p.ap&&!p.role){const k=Object.keys(p.ap).sort((a,b)=>p.ap[b]-p.ap[a])[0];if(k&&ROLES[k]){p.role=k;p.niv=0;p.xp=Math.min(XPN[0]-1,Math.round(p.ap[k]/2));log(p.n+' a grandi auprès d’un '+roleN(k).toLowerCase()+' : '+(p.g==='f'?'elle':'il')+' en prend le métier.')}delete p.ap}})}}
// dans le camp : l'apprenti marche derrière son maître ; les enfants des champs vont au jardin
{const cc=cvCible;cvCible=function(p,a,L,nuit){if(!nuit&&!adulte(p)){const k=tacheDe(p);
  if(k==='appr'){const m=p23Mentor(p),b=m&&CV.A[m.id];if(b)return [b.x-.025,b.y+.02,'joue']}
  if(k==='champ'){const r=Math.random;return [L.jardin[0]-.08+r()*.16,L.jardin[1]-.05+r()*.1,'cueille']}
  if(k==='ecole'){const c=L.cases[0]||L.feu;return [c[0]+.03,c[1]+.06,'joue']}}
 if(!nuit&&adulte(p)&&tacheDe(p)==='champ'){const r=Math.random;return [L.jardin[0]-.1+r()*.2,L.jardin[1]-.06+r()*.12,'cueille']}
 return cc(p,a,L,nuit)}}
// les tâches d'adulte proposées pour l'habitation incluent les champs
if(typeof CVLT!=='undefined')CVLT.jardin=['Le jardin et les champs',['cueil','champ']];
