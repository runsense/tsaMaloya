// ===== p45 : les plantes Meshy — un modèle déposé dans modeles/ remplace la forme dessinée par le code ; sans fichier, rien ne change =====
// Plantes : modeles/plante_<nom>.txt (GLB en base64, comme les personnages). Hauteur ramenée à celle de la forme actuelle, pied posé au sol.
// Les modèles arrivent sans texture (Meshy « Smart Topology », 800 à 2 000 triangles, moins que les personnages) :
// on les colorie ici, tronc en bas et feuillage en haut, avec les couleurs de la forme qu'ils remplacent.
const MESHY_PLANTES={tamarin:.42,fanjan:.32,palmiste:.6,latanier:.45,vacoa:.45,branle:.12,arbre:.45,bois_chandelle:.35,benjoin:.45,ambaville:.18};
// où commence le feuillage (part de la hauteur), et les couleurs : tronc, feuillage, et une touche propre à l'espèce
const MESHY_TEINTE={
 tamarin:{f:.5,t:0x5a4430,v:[0x4f7a3a,0x6a8c4a]},
 fanjan:{f:.62,t:0x33261c,v:[0x2f7a46,0x3f9050]},
 palmiste:{f:.8,t:0x8a7a62,v:[0x3f7a3c,0x4f8a44],a:[.74,.82,0x8a3a2a]},
 latanier:{f:.3,t:0x7a6448,v:[0x6c8c46,0x7e9c52],a:[.3,.5,0x9a4a30]},
 vacoa:{f:.42,t:0x7a6a48,v:[0x5c8a3e,0x6e9a48]},
 branle:{f:.12,t:0x4a3a28,v:[0x55633a,0x6f7a44]},
 arbre:{f:.42,t:0x4a3524,v:[0x2f6e3c,0x3f8748]},
 bois_chandelle:{f:.5,t:0x6a5a44,v:[0x4f8a3a,0x67a04a]},
 benjoin:{f:.3,t:0x5a4030,v:[0x3f7a3c,0x5a8e46]},
 ambaville:{f:.1,t:0x5a5040,v:[0x8a9a7a,0xa8b49a]}};
MESHY_TEINTE.sapin=MESHY_TEINTE.tamarin;
const MESHY_OK={};
// chargement discret : base64 déjà présent (appli), sinon fichier .txt, sinon script .js ; un fichier absent n'est pas une erreur
function meshyB64(n){if(window.P3B64&&P3B64[n])return Promise.resolve(P3B64[n]);return fetch('modeles/'+n+'.txt').then(r=>r.ok?r.text():Promise.reject()).catch(()=>new Promise((ok,ko)=>{const e=document.createElement('script');e.src='modeles/'+n+'.js';e.onload=()=>window.P3B64&&P3B64[n]?ok(P3B64[n]):ko();e.onerror=()=>ko();document.head.appendChild(e)}))}
// couleurs par sommet : facettes plates (low poly), tronc / feuillage selon la hauteur et l'écart à l'axe, une légère variation
function meshyPeindre(geo,k){const D=MESHY_TEINTE[k]||{f:.4,t:0x5a4430,v:[0x3f7a3c,0x4f8a44]};const g=geo.index?geo.toNonIndexed():geo;g.computeBoundingBox();const bb=g.boundingBox,H=bb.max.y-bb.min.y||1,R=Math.max(bb.max.x-bb.min.x,bb.max.z-bb.min.z)/2||1;
 const p=g.attributes.position,C=new Float32Array(p.count*3),ct=new THREE.Color(D.t),c1=new THREE.Color(D.v[0]),c2=new THREE.Color(D.v[1]),ca=D.a?new THREE.Color(D.a[2]):null,q=new THREE.Color();
 for(let i=0;i<p.count;i+=3){let y=0,r=0;for(let j=0;j<3;j++){y+=p.getY(i+j);r+=Math.hypot(p.getX(i+j),p.getZ(i+j))}y=(y/3-bb.min.y)/H;r=r/3/R;
  if(ca&&y>D.a[0]&&y<D.a[1]&&r<(k==='palmiste'?.18:.6))q.copy(ca);else if(y<D.f&&r<.22)q.copy(ct);else q.copy(c1).lerp(c2,Math.min(1,y*.4+((i*7919)%13)/40)).multiplyScalar(.66);
  for(let j=0;j<3;j++){C[(i+j)*3]=q.r;C[(i+j)*3+1]=q.g;C[(i+j)*3+2]=q.b}}
 g.setAttribute('color',new THREE.BufferAttribute(C,3));g.computeVertexNormals();return g}
// les bâtiments Meshy (texturés) : même mécanisme, autre nom de fichier
const MESHY_FIC={sapin:'plante_tamarin',case:'bat_case_paille',grenier:'bat_grenier',chapelle:'bat_chapelle',magasin:'bat_magasin',colon:'bat_habitation'};
Object.keys(MESHY_FIC).forEach(k=>{if(!(k in MESHY_PLANTES))MESHY_PLANTES[k]=.3});
function meshyPlante(k){const n=MESHY_FIC[k]||'plante_'+k;if(MESHY_OK[k])return;MESHY_OK[k]='att';meshyB64(n).then(t=>{const b=atob(t.trim()),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return new Promise(ok=>new THREE.GLTFLoader().parse(u.buffer,'',g=>{const ms=[];g.scene.updateMatrixWorld(true);g.scene.traverse(o=>{if(o.isMesh)ms.push(o)});if(!ms.length){MESHY_OK[k]='non';return ok()}
  const m=ms[0];let geo=m.geometry.clone();geo.applyMatrix4(m.matrixWorld);geo.computeBoundingBox();const bb=geo.boundingBox,h=bb.max.y-bb.min.y||1,w=Math.max(bb.max.x-bb.min.x,bb.max.z-bb.min.z)||1;
  // même encombrement que la forme qu'il remplace : ni plus haut, ni plus large (un arbre Meshy a souvent une couronne bien plus large)
  let s=MESHY_PLANTES[k]/h;const M0=MOD[k];if(M0){M0.geometry.computeBoundingBox();const o=M0.geometry.boundingBox,ho=o.max.y-o.min.y,wo=Math.max(o.max.x-o.min.x,o.max.z-o.min.z);if(ho>0&&wo>0)s=Math.min(ho/h,wo*.95/w)}
  geo.translate(-(bb.min.x+bb.max.x)/2,-bb.min.y,-(bb.min.z+bb.max.z)/2);geo.scale(s,s,s);
  const tex=m.material&&m.material.map;if(!tex){['normal','uv','color'].forEach(a=>{if(geo.attributes[a])geo.deleteAttribute(a)});geo=meshyPeindre(geo,k)}
  const M=MOD[k];if(M){M.geometry.dispose();M.geometry=geo;if(tex){const mt=m.material.map;mt.encoding=THREE.sRGBEncoding;const mat=new THREE.MeshLambertMaterial({map:mt});M.material=mat}else{M.material.vertexColors=true;M.material.flatShading=true;M.material.needsUpdate=true}M.instanceMatrix.needsUpdate=true}MESHY_OK[k]='ok';if(typeof peindre==='function')peindre();ok()},()=>{MESHY_OK[k]='non';ok()}))}).catch(()=>{MESHY_OK[k]='non'})}
// on essaie chaque plante une fois, dès que son modèle procédural existe
setInterval(()=>{if(typeof MOD==='undefined')return;Object.keys(MESHY_PLANTES).forEach(k=>{if(MOD[k]&&!MESHY_OK[k])meshyPlante(k)})},3000);

// ---------- trois espèces de plus en zoomant sur un lieu : bois de chandelle, benjoin, ambaville ----------
// Une forme simple dessinée par le code d'abord ; le modèle Meshy la remplace dès qu'il est chargé.
function p45Mods(){if(MOD.benjoin||typeof p23Mod!=='function')return;const TR=TR23,cy=(a,b,h,n=6)=>new THREE.CylinderGeometry(a,b,h,n),bx=(w,h,d)=>new THREE.BoxGeometry(w,h,d),sp=r=>new THREE.IcosahedronGeometry(r,1);
 // bois de chandelle : tiges fines ramifiées, touffes de feuilles en lame — la savane sèche
 p23Mod('bois_chandelle',[[cy(.008,.012,.26,5),0x6a5a44,TR(0,.13,0)],[cy(.006,.008,.12,4),0x6a5a44,TR(.04,.24,0,0,0,-.5)],...[0,1,2,3,4,5].map(k=>[bx(.1,.004,.014),0x4f8a3a,TR(Math.cos(k*1.05)*.04+.02,.3,Math.sin(k*1.05)*.04,0,-k*1.05,-.6)])],160);
 // benjoin : branches étagées à l'horizontale — les bois de couleurs
 p23Mod('benjoin',[[cy(.014,.022,.42),0x5a4030,TR(0,.21,0)],...[.16,.26,.36,.44].map((y,k)=>[cy(.13-k*.025,.13-k*.025,.025,8),k%2?0x5a8e46:0x3f7a3c,TR(0,y,0)])],160);
 // ambaville : petit buisson argenté des Hauts
 p23Mod('ambaville',[[sp(.06),0x8a9a7a,TR(0,.05,0,0,0,0,1.3,.8,1.3)],[sp(.04),0xa8b49a,TR(.05,.06,.02)]],300)}
{const rl=remplirLieu;remplirLieu=function(){const r=rl.apply(this,arguments);const t=lieu;try{p45Mods();if(!t||t.bare||!MOD.benjoin)return r;
 const o=S.t[t.i]||{},ra=o.b==='camp'?1.3:0,B=typeof lieuBatis==='function'?lieuBatis(t):[],hC=new THREE.Color(),b=t.biome||'';
 const pose=(m,n,s,f,sc=1)=>{for(let k=0;k<n;k++){const a=rndH(k*s+t.i)*6.283,d=Math.sqrt(rndH(k*s+7))*3.15,x=t.x+Math.cos(a)*d,z=t.z+Math.sin(a)*d,h=alt(x,z);if(!f(h)||Math.hypot(x-t.x,z-t.z)<ra||B.some(([bx,bz,br])=>Math.hypot(x-bx,z-bz)<br))continue;const v=.85+rndH(k+13)*.3;hC.setRGB(v,v,v);poseM(m,x,h*VX+.03,z,a,0,0,(.8+rndH(k+3)*.6)*sc,hC)}};
 if(/Savane/.test(b))pose(MOD.bois_chandelle,30,10.3,h=>h>5);
 if(/Bois de couleurs/.test(b))pose(MOD.benjoin,22,10.9,h=>h>8);
 if(/tamarins|branles/.test(b))pose(MOD.ambaville,/branles/.test(b)?70:40,11.3,h=>h>8,.9);
 ['bois_chandelle','benjoin','ambaville'].forEach(k=>{const m=MOD[k];if(m){m.count=m.userData.n;m.instanceMatrix.needsUpdate=true;if(m.instanceColor)m.instanceColor.needsUpdate=true}})}catch(e){}return r}}
