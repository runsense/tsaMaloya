
// ===== p137 : les cochons marrons se voient, les boîtes-bêtes disparaissent, l'ibis s'éteint avec son espèce, les colons sortent du sous-bois =====
// 1) Les dernières « bêtes en boîtes » (cabri, cochon, tangue, bœuf dessinés en cubes) sont cachées ; les cochons qu'elles marquaient deviennent de vrais cochons animés.
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(typeof VIV108!=='undefined'&&VIV108.b)VIV108.b.forEach(b=>{if(b.o&&['cabri','cochon','tangue','boeuf'].includes(b.k))b.o.visible=false})}catch(e){}return r}}
{const ap=aniPlaces;aniPlaces=function(k){const L=ap.apply(this,arguments);try{if(k!=='cochon'||!S||S.fin||dist>=10)return L;const now=performance.now()/1000;
  // une bande de plus sur chaque case de forêt vue, plus souvent qu'avant (les cochons marrons pullulaient)
  const R2=dist*.8+3;T.forEach(t=>{const dx=t.x-camT.x,dz=t.z-camT.z;if(dx*dx+dz*dz>R2*R2)return;const o=S.t[t.i];if(!o||!o.s||t.bare||o.c||o.b==='camp')return;if(!(t.forest||t.alt>100&&t.alt<900))return;
   const h=s=>rndH(t.i*11.7+s),ab=typeof fAb==='function'?fAb(t):1,pr=((S.gibP||{})[t.i]||0);if(h(1)>.6*Math.max(ab,S.year<1720?.8:.3)*(1-pr))return;if(L.length>=14)return;
   const n=1+Math.floor(h(2)*3),o0=h(3)*6,sp=.06+h(4)*.04;for(let j=0;j<n;j++){const k=now*sp+o0-j*.12,fk=k-Math.floor(k),u=Math.floor(k)+(fk<.5?0:(fk-.5)*2);L.push({x:t.x+.3*(Math.sin(u+o0)+.5*Math.sin(u*1.7+o0*2))+j*.05,z:t.z+.25*(Math.cos(u*.9+o0)+.5*Math.sin(u*1.5))+j*.04,sc:j>1?.65:1})}})}catch(e){}return L}}
// 2) L'ibis (le solitaire) ne se montre plus une fois l'espèce éteinte.
setInterval(()=>{try{if(!S||!S.fa)return;const x=S.disp135x&&S.disp135x.solitaire;if(x!=null&&S.year>=x)S.fa.sol=0;else if(!S.disp135x&&S.year>=1715)S.fa.sol=0}catch(e){}},2000);
// 3) « Des colons chassent ici » : on les voit sortir de sous un arbre de la case, avec leurs chiens, puis battre la forêt avant de repartir.
const COLS137=[];let colT137=null;
{const hz=hasard;hasard=function(t,id){const r=hz.apply(this,arguments);try{if(r==='colonsCh'||r==='colonsZone')colT137=t}catch(e){}return r}}
function arbreProche137(t){try{if(typeof tree==='undefined'||!tree)return null;const M=new THREE.Matrix4(),P=new THREE.Vector3();let best=null,bd=.7;for(let i=0;i<tree.count;i++){tree.getMatrixAt(i,M);P.setFromMatrixPosition(M);const d=Math.hypot(P.x-t.x,P.z-t.z);if(d<bd){bd=d;best={x:P.x,z:P.z}}}return best}catch(e){return null}}
function colonsSortent137(t){if(!t||COLS137.some(c=>c.t===t.i))return;const a=arbreProche137(t)||{x:t.x+.25,z:t.z-.2},now=performance.now(),nm=['p7_colon','jeune_colon','commandeur'];
 const n=2+(S.year>1720?1:0);for(let j=0;j<n;j++){const ang=Math.atan2(t.z-a.z,t.x-a.x)+(j-1)*.5;COLS137.push({t:t.i,k:'col137_'+t.i+'_'+j,nm:nm[j%nm.length],ax:a.x,az:a.z,bx:a.x+Math.cos(ang)*(.45+j*.08),bz:a.z+Math.sin(ang)*(.45+j*.08),t0:now+j*700,fin:now+24000})}
 try{conteVoir(t,4.5)}catch(e){}}
{const md=modal;modal=function(){const r=md.apply(this,arguments);try{const id=S&&S.evq&&S.evq[0];if(id==='colonsCh'&&colT137)colonsSortent137(colT137);
  if(id==='colonsZone'&&!COLS137.length){const z=T.filter(t=>{const o=S.t[t.i];return o&&(o.b==='chasse'||o.b==='cueil'||o.ex)&&t.forest});const t=z[Math.floor(Math.random()*z.length)]||colT137;if(t)colonsSortent137(t)}}catch(e){}return r}}
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(!COLS137.length||typeof mfPoser!=='function')return r;const now=performance.now();
  for(let i=COLS137.length-1;i>=0;i--){const c=COLS137[i];if(now>c.fin){const f=MF.L[c.k];if(f&&f.o)f.o.visible=false;COLS137.splice(i,1);continue}if(now<c.t0)continue;
   const u=(now-c.t0)/1000,sortie=Math.min(1,u/2.2),fin=(c.fin-now)/1000;let x,z,clip='marche',ang;
   if(fin<3){const v=1-fin/3;x=c.bx+(c.ax-c.bx)*v;z=c.bz+(c.az-c.bz)*v;ang=Math.atan2(c.ax-c.bx,c.az-c.bz)}// ils repartent sous l'arbre
   else if(sortie<1){x=c.ax+(c.bx-c.ax)*sortie;z=c.az+(c.bz-c.az)*sortie;ang=Math.atan2(c.bx-c.ax,c.bz-c.az)}
   else{const w=u*.25+i;x=c.bx+Math.cos(w)*.12;z=c.bz+Math.sin(w)*.09;ang=w+Math.PI/2;clip='chasse_traque'}
   mfPoser(c.k,c.nm,x,Math.max(0,alt(x,z))*VX+.02,z,ang,clip);const f=MF.L[c.k];if(f&&f.o){f.vu=MF.t;const s=f.o.userData.s0106||f.o.scale.x;const g=fin<3?Math.max(.15,fin/3):Math.max(.15,Math.min(1,u/1.2));f.o.scale.setScalar((f.o.userData.s0106||1)*g*(typeof dist!=='undefined'?Math.max(.55,Math.min(1.6,1.75-dist*.035)):1))}}}catch(e){}return r}}
// leurs chiens courent devant eux
{const ap=aniPlaces;aniPlaces=function(k){const L=ap.apply(this,arguments);try{if(k==='chien'&&COLS137.length){const now=performance.now()/1000;COLS137.forEach((c,i)=>{if(i%2)return;const f=MF.L[c.k];if(!f||!f.o||!f.o.visible)return;const p=f.o.position;L.push({x:p.x+Math.cos(now*1.3+i)*.18,z:p.z+Math.sin(now*1.3+i)*.14})})}}catch(e){}return L}}
// 4) Vue du camp : les onglets des camps (ou habitations), en haut à gauche.
//    Choisir un onglet vise aussi ce camp sur la carte (la vue y glisse, un cercle s'allume dessus).
//    Quand ils ne tiennent plus sur une ligne : « Habitation 3 » devient « Hab. 3 », puis « H. 3 » (et « Camp 3 », « C. 3 »).
function vise137(t){try{if(!t||typeof scene==='undefined')return;camGo={v:new THREE.Vector3(t.x,t.alt*VX,t.z),d:Math.min(dist,8),p:pol,a:az};
  const r=new THREE.Mesh(new THREE.RingGeometry(.35,.45,32).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0xe8be5a,transparent:true,opacity:.9,depthWrite:false}));r.position.set(t.x,Math.max(0,t.alt)*VX+.05,t.z);r.renderOrder=9;scene.add(r);
  const t0=performance.now();(function an(){const u=(performance.now()-t0)/1800;if(u>=1){scene.remove(r);r.geometry.dispose();return}r.scale.setScalar(1+u*.8);r.material.opacity=.9*(1-u);requestAnimationFrame(an)})()}catch(e){}}
function tabsResume137(){try{const box=$('cvTabs');if(!box)return;const B=[...box.querySelectorAll('[data-cv]')];if(!B.length)return;const C=S.voieC;
  const lab=(i,n)=>n===0?(C?'Habitation ':'Camp ')+(i+1):n===1?(C?'Hab. ':'Camp ')+(i+1):(C?'H. ':'C. ')+(i+1);
  const uneLigne=()=>B[B.length-1].offsetTop===B[0].offsetTop&&box.parentElement.offsetHeight<80;
  for(let n=0;n<3;n++){B.forEach((b,i)=>{b.textContent=lab(i,n);b.title=(C?'Habitation ':'Camp ')+(i+1)+(typeof campNom==='function'?' · '+campNom(+b.dataset.cv):'')});if(uneLigne())break}
  B.forEach(b=>{if(b.dataset.v137)return;b.dataset.v137=1;b.addEventListener('click',()=>vise137(T[+b.dataset.cv]))})}catch(e){}}
{const cl=cvListe;cvListe=function(){const r=cl.apply(this,arguments);tabsResume137();return r}}
addEventListener('resize',()=>{try{if(CV&&CV.on)tabsResume137()}catch(e){}});
// 5) Le vote (chef du camp, commandant, député à l'Assemblée coloniale) ne reste plus caché dans le panneau du bas :
//    - un bouton « 🗳 Voter » visible dans la ligne du haut de la vue du camp, et un clic sur le nom du camp en haut à gauche ouvre le vote ;
//    - au clic droit sur un camp de la carte, « 🗳 Voter » est dans le menu.
function vote137(ci){try{if(ci==null)return;if(typeof chefPeut==='function'&&chefPeut(ci))chefOuvrir(ci);else{const c=chefDe(ci);toast((c?'⭐ '+c.n.split(' ')[0]+' est '+chefTitre():'Personne n’est '+chefTitre())+'. Prochain vote en '+(((S.chefs||{})[ci]||{}).an+5)+'.')}}catch(e){}}
setInterval(()=>{try{if(!CV||!CV.on)return;const row=$('cvRow127');if(row){let b=row.querySelector('#vote137');const peut=typeof chefPeut==='function'&&chefPeut(CV.camp);
  if(peut&&!b){b=document.createElement('button');b.id='vote137';b.className='bt';b.textContent='🗳 Voter';b.title=(S.voieC&&S.year>=1790?'Élire le député à l’Assemblée coloniale':'Élire le '+chefTitre());b.onclick=()=>vote137(CV.camp);row.appendChild(b)}if(!peut&&b)b.remove();
  const i=row.querySelector('.i127');if(i&&!i.dataset.v137){i.dataset.v137=1;i.style.cursor='pointer';i.onclick=()=>vote137(CV.camp)}}
 const T0=$('cvT');if(T0&&!T0.dataset.v137){T0.dataset.v137=1;T0.style.cursor='pointer';T0.title='Le chef, le vote';T0.onclick=()=>vote137(CV.camp)}
 // « Retour à la carte » : le symbole de retour et la carte
 const x=$('cvX');if(x&&!x.dataset.v137){x.dataset.v137=1;x.textContent='⟵ 🗺';x.title='Retour à la carte';x.setAttribute('aria-label','Retour à la carte');x.style.fontSize='16px'}}catch(e){}},700);
{const mc=menuCtx;menuCtx=function(x,y,titre,L){try{if(S&&!S.fin&&typeof grpOn==='function'&&grpOn()&&typeof sel!=='undefined'&&sel&&S.t[sel.i]&&S.t[sel.i].b==='camp'&&Array.isArray(L)&&!L.some(l=>/Voter/.test(l[0]))){const ci=sel.i;L=L.concat([[typeof chefPeut==='function'&&chefPeut(ci)?'🗳 Voter : '+chefTitre():'⭐ '+chefTitre(),()=>vote137(ci)]])}}catch(e){}return mc.call(this,x,y,titre,L)}}
