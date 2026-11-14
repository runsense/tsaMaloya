// ===== p44 : la Construction s'ouvre sur la mer — les comptoirs, les routes, et dans la ville 3D le cyclone et les expéditions qui partent =====
// Les échanges de Bourbon : l'Île de France voisine, Madagascar (riz, bœufs), l'Inde (toiles de Pondichéry), la côte d'Afrique de l'Est.
// La traite des esclaves passait aussi par ces routes : le jeu le dit dans la chronique, il n'en fait jamais une marchandise.
const KCPT={
 idf:{n:'Île de France',dir:[1,-.2],an:1721,c:{com:2,bois:4},rap:{com:2},d:'L’île voisine : des nouvelles, des outils, des marins.'},
 mada:{n:'Madagascar',dir:[-1,.15],an:1665,c:{com:3,bois:6},rap:{viv:5,com:1},d:'Du riz et des bœufs, contre des toiles et des fusils.'},
 inde:{n:'Pondichéry',dir:[.6,-1],an:1720,c:{com:6,bois:8},rap:{com:4,sav:1},d:'Les toiles de l’Inde ; des artisans viennent aussi.'},
 afr:{n:'Côte d’Afrique de l’Est',dir:[-1,-.7],an:1730,c:{com:4,bois:6},rap:{com:2},d:'Ivoire, cauris, vivres. Les navires négriers y passent aussi : la chronique le rappelle.'}};
function kPort(){return Object.entries(K.b).some(([i,L])=>L.some(x=>x.k==='port'&&x.f===K.joueur))}
function kCptOuvrir(k){const C=KCPT[k];if(!kPeut(C.c)){toast('Il manque : '+Object.entries(C.c).filter(([r,n])=>(K.res[r]||0)<n).map(([r,n])=>n+' '+r).join(', ')+'.');return}kPaye(C.c);(K.cpt=K.cpt||{})[k]=1;kLog('Un navire part ouvrir un comptoir à '+C.n+'.'+(k==='afr'||k==='mada'?' Sur ces routes passent aussi les navires négriers ; le comptoir, lui, commerce des vivres et des toiles.':''));kSauve();kRendu()}
// chaque année : ce que rapportent les comptoirs, et le risque de perdre un navire
{const ka=kAnnee;kAnnee=function(){ka.apply(this,arguments);if(!K||K.fin||!K.cpt)return;Object.keys(K.cpt).forEach(k=>{const C=KCPT[k];if(K.cycF>=2&&K.apres>0&&Math.random()<.25){kLog('Le navire de '+C.n+' a sombré dans le cyclone : rien cette année.');return}Object.entries(C.rap).forEach(([r,v])=>K.res[r]=(K.res[r]||0)+v)})}}
// dans le panneau : les comptoirs, s'il y a un port
{const kp=kPanneau;kPanneau=function(){kp.apply(this,arguments);const A=$('kA');if(!A||!K)return;const box=document.createElement('div');box.className='pc';
 if(K.joueur!=='c'){box.innerHTML='<h4>La mer</h4><small>Les camps marrons n’ont pas de port. On raconte que certains ont tenté la traversée vers Madagascar en pirogue : peu sont arrivés.</small>'}
 else if(!kPort())box.innerHTML='<h4>Les comptoirs</h4><small>Il faut d’abord un port, sur la côte même, pour armer des navires.</small>';
 else box.innerHTML='<h4>Les comptoirs</h4>'+Object.entries(KCPT).map(([k,C])=>{const ok=K.cpt&&K.cpt[k],tot=K.an<C.an;return '<div style="margin:3px 0"><b>'+C.n+'</b> <small>'+C.d+'</small><br>'+(ok?'<small style="color:#7fc36a">ouvert · rapporte '+Object.entries(C.rap).map(([r,v])=>'+'+v+' '+r).join(', ')+' par an</small>':tot?'<small>pas avant '+C.an+'</small>':'<button class="bt'+(kPeut(C.c)?'':' sec')+'" data-cpt="'+k+'">Ouvrir · '+Object.entries(C.c).map(([r,v])=>v+' '+r).join(', ')+'</button>')+'</div>'}).join('');
 const ch=[...A.querySelectorAll('.pc')].find(p=>{const h=p.querySelector('h4');return h&&h.textContent==='Les factions'});A.insertBefore(box,ch||null);box.querySelectorAll('[data-cpt]').forEach(b=>b.onclick=()=>kCptOuvrir(b.dataset.cpt))}}
// sur l'île : les routes des navires vers les comptoirs ouverts
{const kd=kDessExp;kDessExp=function(x,P,Rh){kd.apply(this,arguments);if(!K||!K.cpt)return;const pt=Object.entries(K.b).find(([i,L])=>L.some(b=>b.k==='port'&&b.f===K.joueur));if(!pt)return;const [a,b]=P(T[+pt[0]]),W=x.canvas.width/(devicePixelRatio||1),H=x.canvas.height/(devicePixelRatio||1);
 x.save();x.setLineDash([2,6]);x.lineWidth=2;x.strokeStyle='rgba(240,230,200,.7)';x.font='bold 12px system-ui';x.textAlign='center';x.fillStyle='#f6eedb';
 Object.keys(K.cpt).forEach(k=>{const C=KCPT[k],ex=Math.max(30,Math.min(W-30,W/2+C.dir[0]*W*.48)),ey=Math.max(20,Math.min(H-20,H/2+C.dir[1]*H*.48));x.beginPath();x.moveTo(a,b);x.quadraticCurveTo((a+ex)/2+C.dir[1]*40,(b+ey)/2-C.dir[0]*40,ex,ey);x.stroke();x.fillText('⛵ '+C.n,ex,ey+(ey>H/2?-8:14))});x.restore()}}

// ---------- dans la ville 3D : le cyclone qui passe, et les expéditions qui quittent la ville ----------
{const kb=k3Boucle;let spi=null,exp=[],cyD=null,cyT=0;k3Boucle=function(){kb.apply(this,arguments);if(!KV3.S||!K||K.vue!=='ville'||!KV3.on)return;const c=T[kCol().i];if(K.cyc&&K.cyc!==cyD){cyD=K.cyc;cyT=performance.now()}
 // le cyclone : pas de spirale ; le ciel s'assombrit et la pluie tombe en biais, plus forte quand le centre passe
 const en=!!cyT&&performance.now()-cyT<6000;if(en&&!spi){const N=1400,P=new Float32Array(N*6);for(let i=0;i<N;i++){const x=(Math.random()-.5)*12,y=Math.random()*4,z=(Math.random()-.5)*12;P.set([x,y,z,x-.14,y+.4,z-.06],i*6)}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));
  spi=new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0xb8c4cc,transparent:true,opacity:.4,depthWrite:false}));spi.renderOrder=5;spi.frustumCulled=false;KV3.S.add(spi);window.__spi=spi}
 if(spi){if(en){const u=(performance.now()-cyT)/6000,I=Math.sin(u*Math.PI);spi.position.set(c.x+I*.3,k3Y(c.x,c.z)-((performance.now()/1000*(3+4*I))%2),c.z);spi.material.opacity=.15+.5*I;KV3.S.background.setRGB(.36-.24*I,.42-.28*I,.48-.3*I)}else{KV3.S.remove(spi);spi.geometry.dispose();spi.material.dispose();spi=null;KV3.S.background=new THREE.Color(0x9cc4d8).convertSRGBToLinear()}}
 // les expéditions en route : une file de petits marcheurs part de la ville vers la région visée
 const E=(K.exps||[]).filter(e=>e.v2&&e.et!=='place');if(exp.length!==E.length*3){exp.forEach(o=>{KV3.S.remove(o);o.geometry.dispose()});exp=[];E.forEach(()=>{for(let k=0;k<3;k++){const o=new THREE.Mesh(new THREE.CylinderGeometry(.014,.018,.06,5),new THREE.MeshLambertMaterial({color:0xffd36a}));KV3.S.add(o);exp.push(o)}})}
 E.forEach((e,j)=>{const fin=T[e.path[e.path.length-1]],dx=fin.x-c.x,dz=fin.z-c.z,l=Math.hypot(dx,dz)||1,u=Math.min(1,e.pos/Math.max(1,e.path.length-1)),d=(e.et==='retour'?1-u:u)*6;for(let k=0;k<3;k++){const o=exp[j*3+k];if(!o)continue;const dd=Math.max(0,d-k*.15),x=c.x+dx/l*dd,z=c.z+dz/l*dd;o.position.set(x,k3Y(x,z)+.03+Math.abs(Math.sin(performance.now()/120+k))*.01,z);o.visible=dd<6}})}}
