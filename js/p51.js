// ===== p51 : quand le conte apporte un savoir, l'onglet Savoirs s'ouvre sur lui et il brille, comme les autres =====
{const st=document.createElement('style');st.textContent='@keyframes svNeuf{0%,100%{box-shadow:0 0 0 0 rgba(232,190,90,0);background:inherit}50%{box-shadow:0 0 16px 4px rgba(232,190,90,.85);background:rgba(232,190,90,.18)}}#drawer .sv.neuf{animation:svNeuf 1.4s ease-in-out 5;border-color:#e8be5a!important}';document.head.appendChild(st)}
{let connus=null,partie=null;setInterval(()=>{try{if(!S||!S.sv||S.fin||!$('ecran').hidden){connus=null;return}
 if(partie!==S){partie=S;connus=new Set(Object.keys(S.sv).filter(k=>S.sv[k]));return}
 const neufs=Object.keys(S.sv).filter(k=>S.sv[k]&&!connus.has(k)&&SAVOIRS[k]);neufs.forEach(k=>connus.add(k));
 // acheté par le joueur dans l'onglet : rien à annoncer
 if(!neufs.length||onglet==='sav')return;
 onglet='sav';drawer();$('drawer').hidden=false;
 setTimeout(()=>{neufs.forEach(k=>{const n=SAVOIRS[k].n,el=[...document.querySelectorAll('#drawer .sv')].find(d=>{const b=d.querySelector('b');return b&&b.textContent.trim()===n});if(el){el.classList.add('neuf');el.scrollIntoView({block:'center',behavior:'smooth'})}});
  if(typeof toast==='function')toast('Nouveau savoir : '+neufs.map(k=>SAVOIRS[k].n).join(', ')+'.')},120)}catch(e){}},700)}

// ===== les décors ne se marchent plus dessus : en zoomant sur un lieu, deux plantes ou rochers ne se chevauchent pas =====
// les grands d'abord (arbres), puis les petits viennent se glisser entre eux ; un vieux sapin des cartes devient un tamarin des Hauts
const DECOR_R={arbre:.24,tamarin:.28,benjoin:.2,fanjan:.14,palmiste:.12,latanier:.15,vacoa:.16,bois_chandelle:.12,rocher:.13,branle:.09,ambaville:.08,galet:.05,sapin:.2};
{const rl=remplirLieu;remplirLieu=function(){const av={};Object.keys(DECOR_R).forEach(k=>{if(MOD[k])av[k]=MOD[k].userData.n});const r=rl.apply(this,arguments);
 try{if(!lieu)return r;const M=new THREE.Matrix4(),P=new THREE.Vector3(),Q=new THREE.Quaternion(),Sc=new THREE.Vector3(),Z=new THREE.Matrix4().makeScale(0,0,0),L=[];
  Object.keys(DECOR_R).forEach(k=>{const m=MOD[k];if(!m)return;for(let i=av[k]||0;i<m.userData.n;i++){m.getMatrixAt(i,M);M.decompose(P,Q,Sc);if(Sc.x<=0)continue;L.push({k,i,x:P.x,z:P.z,r:DECOR_R[k]*Sc.x})}});
  L.sort((a,b)=>b.r-a.r);const ok=[],cell={},key=(x,z)=>Math.floor(x/.6)+','+Math.floor(z/.6);
  L.forEach(o=>{const cx=Math.floor(o.x/.6),cz=Math.floor(o.z/.6);let gene=false;for(let a=-1;a<=1&&!gene;a++)for(let b=-1;b<=1&&!gene;b++){(cell[(cx+a)+','+(cz+b)]||[]).forEach(p=>{if(Math.hypot(p.x-o.x,p.z-o.z)<(p.r+o.r)*.8)gene=true})}
   if(gene){MOD[o.k].setMatrixAt(o.i,Z);MOD[o.k].instanceMatrix.needsUpdate=true}else(cell[key(o.x,o.z)]=cell[key(o.x,o.z)]||[]).push(o)})}catch(e){}return r}}
// sur la grande carte, les cônes de « sapin » (il n'y en a pas à La Réunion) prennent la forme du tamarin des Hauts : voir p45 (MESHY_FIC.sapin)
