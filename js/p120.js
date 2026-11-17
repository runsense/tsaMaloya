
// ===== p120 : la naissance de l'île, plus juste — calderas et effondrements, lacs de barrage dans les cirques,
// rivières qui suivent les anciennes coulées et eau qui continue sous les coulées nouvelles =====
const LAC120={g:null};
function lacs120(on){try{if(LAC120.g){scene.remove(LAC120.g);LAC120.g.traverse(o=>{if(o.geometry)o.geometry.dispose()});LAC120.g=null}if(!on)return;const g=new THREE.Group();
 [[55.43,-21.05,800,1.6],[55.515,-21.07,900,1.5],[55.47,-21.13,1150,1.3]].forEach(([lo,la,a,r])=>{const [x,z]=xz(lo,la);const m=new THREE.Mesh(new THREE.CircleGeometry(r,28),new THREE.MeshBasicMaterial({color:0x3a7a9a,transparent:true,opacity:.75,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(x,Math.max(a,alt(x,z))*VX+.06,z);m.renderOrder=5;g.add(m)});scene.add(g);LAC120.g=g}catch(e){}}
{const cj=cineJouer;cineJouer=function(L,done){try{const i=(L||[]).findIndex(s=>/creusent trois cirques/.test(s.txt||''));if(i>=0&&!L.some(s=>s.lac120)){
  const N=L.findIndex(s=>/perce la surface/.test(s.txt||''));if(N>=0)L[N].txt='<small>Il y a un peu plus de 2 millions d’années</small>Le Piton des Neiges perce la surface. Il grandit d’un seul tenant, coulée après coulée, et bâtit les deux tiers de l’île ; son cœur est là où s’ouvrent aujourd’hui les cirques. Son sommet s’effondre plusieurs fois en caldeiras.';
  L[i].txt='<small>Des centaines de milliers d’années</small>Le sommet s’effondre, des flancs entiers glissent vers la mer, et les pluies creusent trois cirques : Mafate, puis Salazie et Cilaos. Le Piton des Neiges s’endort.<br><i style="font-size:.8em;opacity:.8">Récit des anciens, non prouvé : Mafate fut le premier cratère, et la Roche Écrite est le bord qu’il a laissé.</i>';
  const c=L[i].cam||[0,0,40,2.6,.8];
  L.splice(i+1,0,{lac120:1,d:6500,cam:[c[0],c[1],34,2.9,.85],init:U=>{lacs120(true)},f:(U,k)=>{if(LAC120.g)LAC120.g.children.forEach(m=>{m.material.opacity=.75*(k<.75?1:(1-(k-.75)/.25))})},txt:'<small>Au fond des cirques</small>Des éboulements barrent les rivières : des lacs se forment au fond des cirques, puis la rivière perce le barrage et le lac se vide. Ça recommencera.'},
   {lac120:2,d:7000,cam:[c[0],c[1],46,3.05,.78],init:U=>{lacs120(false)},f:(U,k)=>{U.lave.value=.25*Math.sin(k*Math.PI)},txt:'<small>Sous les coulées</small>Les rivières prennent les vallées des anciennes coulées. De nouvelles laves les recouvrent : l’eau continue de couler dessous, dans les vallées ensevelies et les tunnels de lave. Une île creuse, pleine de galeries.'})}}catch(e){}
 return cj.call(this,L,()=>{lacs120(false);if(done)done()})}}
{const cf=cineFin;cineFin=function(){lacs120(false);return cf.apply(this,arguments)}}
// ===== Le conte : la barre et le décompte montrent le vrai temps qui reste avant que le conte choisisse =====
setInterval(()=>{try{if(!S||!modeHist()||!autoD()||typeof proch==='undefined'||!proch)return;const m=$('modal');if(!m||m.hidden)return;const reste=Math.max(0,proch-performance.now()),tot=Math.max(1000,typeof lecT!=='undefined'&&lecT?lecT:8000);
 const bar=m.querySelector('#evMin i');if(bar)bar.style.width=Math.round(100*(1-reste/tot))+'%';const t=$('evMinT');if(t&&!/Le conte choisit dans/.test(t.textContent))t.textContent='';if(t)t.textContent='Le conte choisit dans '+Math.ceil(reste/1000)+' s. Bougez la souris pour l’arrêter et choisir vous-même.'}catch(e){}},250);
// ===== La lettre de décès ne bloque plus le conte : elle se pose dans un coin, sans voile ni pause =====
// partout (Histoire, Vie, Survie) : la lettre ne met plus rien en pause
lettrePause=function(){return()=>{}};
{const st=document.createElement('style');st.textContent='#lettreD{inset:auto!important;right:34px!important;top:96px!important;background:none!important;pointer-events:none;display:block!important}#lettreD .lt{pointer-events:auto;max-width:400px!important;transform-origin:top right;transform:scale(.82) rotate(-1deg)!important;cursor:pointer}#lettreD.lt111-froisse .lt{transform:scale(.82) rotate(-3.5deg) skewX(-1.5deg)!important}#lettreD.lt111-abime .lt{transform:scale(.82) rotate(2.5deg)!important}#lettreD.lt111-apparat .lt{transform:scale(.82)!important}#lettreD canvas{width:96px;height:96px}';document.head.appendChild(st)}
// ===== Les pitons des flancs : des dizaines de petits cratères le long des fissures du Piton des Neiges (hauts de l'Ouest et du Sud) =====
const PIT120={g:null};
function pitons120(on,k){try{if(!on){if(PIT120.g){scene.remove(PIT120.g);PIT120.g.traverse(o=>{if(o.geometry)o.geometry.dispose()});PIT120.g=null}return}
 if(!PIT120.g){const g=new THREE.Group(),P=[];let sd=7;const R=()=>((sd=(sd*9301+49297)%233280)/233280);
  // un peu partout sur le volcan, mais de plus en plus vers le sud-est, jusqu'au pays de la Fournaise
  for(let i=0;i<46;i++){const u=i/45,lo0=55.33+u*.38,la0=-21.0-u*.22,lo=lo0+(R()-.5)*(.30-.12*u),la=la0+(R()-.5)*(.24-.08*u),[x,z]=xz(lo,la);if(alt(x,z)<20)continue;P.push([lo,la,u])}
  P.forEach(([lo,la,u],i)=>{const [x,z]=xz(lo,la),m=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),new THREE.MeshBasicMaterial({color:0xff6a20,transparent:true,opacity:0,depthWrite:false}));m.position.set(x,Math.max(0,alt(x,z))*VX+.1,z);m.userData.i=i;m.userData.u=u;m.userData.est=lo>55.56&&la>-21.12;g.add(m)});scene.add(g);PIT120.g=g}
 const n=PIT120.g.children.length,t=performance.now()/1000;PIT120.g.children.forEach(m=>{const s=m.userData.u*.8,ef=m.userData.est?Math.max(0,1-Math.max(0,k-.7)/.15):1;m.material.opacity=k>s?(.35+.45*Math.abs(Math.sin(t*3+m.userData.i)))*(k<.92?1:(1-k)/.08)*ef:0;m.scale.setScalar(k>s?1:.01)})}catch(e){}}
{const cj=cineJouer;cineJouer=function(L,done){try{const i=(L||[]).findIndex(s=>/perce la surface/.test(s.txt||''));if(i>=0&&!L.some(s=>s.pit120)){const c=L[i].cam||[0,0,48,1.3,.85],[px,pz]=xz(55.34,-21.08);
 L.splice(i+1,0,{pit120:1,d:7000,cam:[px,pz,44,1.6,.8],init:U=>{pitons120(true,0)},f:(U,k)=>pitons120(k<.98,k),txt:'<small>Sur ses flancs</small>Le long de fissures, des dizaines de petits cratères s’ouvrent un peu partout — les pitons des hauts de Saint-Paul, de Saint-Gilles, de Trois-Bassins, de Saint-Leu — et de plus en plus vers le sud-est, comme aujourd’hui sur la Fournaise. À l’est, la pluie en effacera presque toutes les traces. Les ravines comme celles de Saint-Denis seront creusées plus tard par l’eau.'})}}catch(e){}
 return cj.call(this,L,()=>{pitons120(false);if(done)done()})}}
{const cf=cineFin;cineFin=function(){pitons120(false);return cf.apply(this,arguments)}}
// la lettre de deuil (la liste des morts) se pose aussi dans un coin, sans voile
{const st=document.createElement('style');st.textContent='#deuilL{inset:auto!important;right:34px!important;top:300px!important;background:none!important;pointer-events:none;display:block!important}#deuilL .dlP{pointer-events:auto;max-width:380px!important;transform:scale(.85);transform-origin:top right}';document.head.appendChild(st)}
setInterval(()=>{try{const d=$('deuilL');if(!d){window.__dl120=0;return}window.__dl120=window.__dl120||performance.now();if(performance.now()-window.__dl120>9000){const b=$('deuilOk');if(b)b.click();else d.remove();window.__dl120=0}}catch(e){}},1000);
