
// ===== p118 : l'érosion se voit — dans la naissance de l'île (les cirques se creusent) et sur la carte du jeu =====
// Les trois cirques creusés par l'eau et les effondrements sur 1 000 à 2 000 m ; les pentes déboisées qui ravinent ;
// la terre rouge que les crues portent jusqu'à la mer ; le recul des plages de l'Ouest (Saint-Paul, l'Ermitage).
const ERO118={cq:[[55.43,-21.045,4.6],[55.515,-21.065,4.4],[55.47,-21.135,4.2]]};
// 1. le terrain sait « remplir » les cirques : ero=0, l'île avant l'érosion ; ero=1, l'île d'aujourd'hui
setInterval(()=>{try{if(typeof terr==='undefined'||!terr||!terr.material||terr.material.uniforms.ero)return;const m=terr.material,U=m.uniforms;U.ero={value:1};
 const C=ERO118.cq.map(([lo,la,r])=>{const [x,z]=xz(lo,la);return new THREE.Vector3(x,z,r)});U.cq0={value:C[0]};U.cq1={value:C[1]};U.cq2={value:C[2]};U.eroH={value:2300*VX};
 m.vertexShader=m.vertexShader.replace('uniform float ech,dec,fz;','uniform float ech,dec,fz,ero,eroH;uniform vec3 cq0,cq1,cq2;').replace('float m=mix(fz,1.,','float w=max(max(smoothstep(cq0.z,cq0.z*.35,distance(p.xz,cq0.xy)),smoothstep(cq1.z,cq1.z*.35,distance(p.xz,cq1.xy))),smoothstep(cq2.z,cq2.z*.35,distance(p.xz,cq2.xy)));p.y=max(p.y,mix(p.y,eroH,(1.-ero)*w));float m=mix(fz,1.,');m.needsUpdate=true}catch(e){}},1000);
function ero118(v){try{const U=terr.material.uniforms;if(U.ero)U.ero.value=v;ERO118.v=v}catch(e){}}
// la cinématique : pendant « les pluies et les effondrements creusent trois cirques », on voit les cirques se creuser
{const cj=cineJouer;cineJouer=function(L,done){try{(L||[]).forEach(s=>{if(/creusent trois cirques/.test(s.txt||'')){const f0=s.f;s.f=(U,k)=>{if(f0)f0(U,k);ero118(Math.min(1,k*1.15))};const i0=s.init;s.init=U=>{if(i0)i0(U);ero118(0)}}
  else if(/point chaud|sous la mer|perce la surface|second volcan/.test(s.txt||'')){const i0=s.init;s.init=U=>{if(i0)i0(U);ero118(0)}}});}catch(e){}
 return cj.call(this,L,()=>{try{const U=terr.material.uniforms;if(U.ero)U.ero.value=1}catch(e){}if(done)done()})}}
{const cf=cineFin;cineFin=function(){try{const U=terr.material.uniforms;if(U.ero)U.ero.value=1}catch(e){}return cf.apply(this,arguments)}}
// 2. sur la carte du jeu : les pentes défrichées ravinent (rouge-brun), d'autant plus que la forêt recule
const RAV118={cle:'',orig:null};
setInterval(()=>{try{if(typeof S==='undefined'||!S||typeof terr==='undefined'||!terr)return;const A=terr.geometry.attributes.aC;if(!A)return;if(!RAV118.orig)RAV118.orig=Float32Array.from(A.array);
 const fo=(typeof foret==='function'?foret():100),L=T.filter(t=>{const o=S.t[t.i]||{};return !t.bare&&t.alt>80&&(o.clr||o.b==='jardin'||o.b==='champ')});const cle=L.length+'|'+Math.round(fo/10)+'|'+(S.year>=1860?1:0);if(cle===RAV118.cle)return;RAV118.cle=cle;
 A.array.set(RAV118.orig);const f=Math.min(1,(100-fo)/60+(S.year>=1860?.25:0));if(f>.05){const rr=.55,gg=.27,bb=.15;L.forEach(t=>{const pe=t.slope||0;if(pe<12)return;const k0=Math.min(.75,f*(pe/40));
  const i0=Math.round((t.x+MAR)/ST),j0=Math.round((t.z+MAR)/ST),R=Math.ceil(.9/ST);for(let j=j0-R;j<=j0+R;j++)for(let i=i0-R;i<=i0+R;i++){if(i<0||j<0||i>=NX||j>=NY)continue;const n=j*NX+i,dx=i*ST-MAR-t.x,dz=j*ST-MAR-t.z,d=Math.hypot(dx,dz);if(d>.9)continue;
   const g=((i*7+j*13)%5)/5,k=k0*(1-d/.9)*(.55+g*.6);A.array[n*3]+=(rr-A.array[n*3])*k;A.array[n*3+1]+=(gg-A.array[n*3+1])*k;A.array[n*3+2]+=(bb-A.array[n*3+2])*k}})}A.needsUpdate=true}catch(e){}},2500);
// 3. la terre rouge à la mer : un panache brun aux embouchures après les grosses pluies, plus fort quand la forêt a reculé
const PAN118={g:null,cle:''};
setInterval(()=>{try{if(typeof S==='undefined'||!S||typeof scene==='undefined')return;const fo=(typeof foret==='function'?foret():100),cyc=S.cyc&&S.cyc.in<=0,pl=typeof pluie==='function'&&pluie();
 const fort=(cyc?1:pl?.55:0)*Math.min(1,.25+(100-fo)/70+(S.year>=1850?.2:0));const cle=Math.round(fort*10)+'|'+S.year;if(cle===PAN118.cle)return;PAN118.cle=cle;
 if(PAN118.g){scene.remove(PAN118.g);PAN118.g.traverse(o=>{if(o.geometry)o.geometry.dispose()});PAN118.g=null}if(fort<.15)return;
 const g=new THREE.Group(),M=T.filter(t=>(t.riv||t.nb.some(i=>T[i].riv))&&t.alt>-5&&t.alt<90&&typeof cotier==='function'&&cotier(t));const vus=new Set();
 M.forEach(t=>{const k=Math.round(t.x/2)+','+Math.round(t.z/2);if(vus.has(k))return;vus.add(k);const N=t.nb.map(i=>T[i]),mx=N.reduce((a,u)=>a+u.x,0)/Math.max(1,N.length),mz=N.reduce((a,u)=>a+u.z,0)/Math.max(1,N.length),dx=t.x-mx,dz=t.z-mz,L=Math.hypot(dx,dz)||1;
  for(let q=0;q<3;q++){const r=(.35+q*.3)*(.6+fort*.8),m=new THREE.Mesh(new THREE.CircleGeometry(r,18),new THREE.MeshBasicMaterial({color:q?0x9a6a42:0x7a4a2a,transparent:true,opacity:(.42-q*.11)*fort,depthWrite:false}));
   m.rotation.x=-Math.PI/2;m.position.set(t.x+dx/L*(.9+q*.45),.012+q*.002,t.z+dz/L*(.9+q*.45));m.scale.set(1,.65,1);m.renderOrder=4;g.add(m)}});scene.add(g);PAN118.g=g}catch(e){}},3000);
// 4. le récit : la terre qui descend, et le recul des plages de l'Ouest
Object.assign(EV,{
 ero1880:{y:1880,si:()=>S&&(typeof foret!=='function'||foret()<70),tag:'Archive',an:'fin du XIXᵉ siècle',t:'La terre rouge à la mer',b:'Après chaque grosse pluie, les ravines charrient la terre des pentes défrichées. Devant les embouchures, la mer devient brune sur des centaines de mètres. Les champs des pentes perdent leur terre.',
  v:'L’île la plus arrosée du monde s’use vite quand on lui enlève sa forêt.',h:'Archive : records mondiaux de pluie, relief abrupt ; le BRGM, la DEAL et le Parc national cartographient aujourd’hui ravinements et glissements.',
  o:[{n:'Replanter les ravines',d:'Forêt +4, bras −1 cette saison.',fx:{foret:4,bras:-1},hist:1},{n:'Continuer à planter la canne',d:'Vivres +4, forêt −3.',fx:{vivres:4,foret:-3}}]},
 littoral1990:{y:1990,si:()=>S,tag:'Archive',an:'aujourd’hui',t:'Les plages qui reculent',b:'Les houles australes et les cyclones grignotent les plages de Saint-Paul, de Grand Fond, de l’Ermitage. Sur la route du Littoral, la falaise lâche des pierres. Le trait de côte recule.',
  v:'La côte bouge encore.',h:'Archive : le recul du trait de côte est suivi par le BRGM (réseau OBSCOT) et la DEAL Réunion.',o:[{n:'Planter des patates à Durand sur les dunes',d:'Forêt +1, cohésion +1.',fx:{foret:1,coh:1},hist:1}]}
});
