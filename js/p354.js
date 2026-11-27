// ===== p354 : les formes, repensées pour l'aquarelle.
// 1. Les textures dessinées étaient posées à l'échelle d'une maison (une feuille grande comme une case) : chaque dessin est
//    répété 4 × 4 dans sa tuile, une feuille revient à la taille d'une main.
// 2. Les arbres du kit (cubes biseautés) deviennent des houppiers en grappes arrondies ; leurs troncs orange, bruns.
// 3. L'herbe en lattes plates jaunes devient des touffes de brins fins, du vert au paille.
// 4. Les rochers prennent des normales lissées (plus de facettes). =====
(function(){const K=[['leaves_forest_ground',AQ351.foret2],['rock_ground',AQ351.basalte],['feuilles_seches351',AQ351.foret]];
 K.forEach(([k,src])=>{const im=new Image();im.onload=()=>{try{const c=document.createElement('canvas');c.width=c.height=1024;const g=c.getContext('2d');for(let i=0;i<4;i++)for(let j=0;j<4;j++)g.drawImage(im,i*256,j*256,256,256);
  TEX125[k]=c.toDataURL('image/jpeg',.86);for(const q in TXC125)if(q.startsWith(k+'|'))delete TXC125[q]}catch(e){}};im.src=src})})();
function lobes354(bb,seed){const sx=bb.max.x-bb.min.x,sy=bb.max.y-bb.min.y,sz=bb.max.z-bb.min.z,cx=(bb.max.x+bb.min.x)/2,cy=(bb.max.y+bb.min.y)/2,cz=(bb.max.z+bb.min.z)/2;let s=seed*31+7;const rn=()=>{s=(s*16807)%2147483647;return s/2147483647};const P=[];
 const nL=6;for(let k=0;k<nL;k++){const g=new THREE.IcosahedronGeometry(1,2).toNonIndexed(),q=g.attributes.position;const a=k/nL*6.283+rn()*.6,d=k?.32:0,ox=Math.cos(a)*d*sx,oz=Math.sin(a)*d*sz,oy=(k?(rn()-.4)*.25:.12)*sy,r=k?.36:.44;
  for(let i=0;i<q.count;i++){const x=q.getX(i),y=q.getY(i),z=q.getZ(i),n=1+.1*Math.sin(x*5+k)*Math.cos(z*4+k*2)+.06*Math.sin(y*7);P.push(cx+ox+x*sx*r*n,cy+oy+y*sy*r*.85*n,cz+oz+z*sz*r*n)}}
 const G=new THREE.BufferGeometry();G.setAttribute('position',new THREE.Float32BufferAttribute(P,3));G.computeVertexNormals();return lisse353(G)}
function touffe354(w,h){const P=[],nb=6;for(let b=0;b<nb;b++){const a=b/nb*6.283+(b%2)*.4,lean=.25+(b%3)*.12,hb=h*(.65+(b%4)*.12),wb=w*.07;const dx=Math.cos(a),dz=Math.sin(a);
  // un brin = deux triangles effilés, penché vers l'extérieur
  const x0=-dz*wb,z0=dx*wb,x1=dz*wb,z1=-dx*wb,mx=dx*lean*hb*.5,mz=dz*lean*hb*.5,tx=dx*lean*hb,tz=dz*lean*hb;
  P.push(x0,0,z0, x1,0,z1, mx+x1*.6,hb*.55,mz+z1*.6, x0,0,z0, mx+x1*.6,hb*.55,mz+z1*.6, mx+x0*.6,hb*.55,mz+z0*.6, mx+x0*.6,hb*.55,mz+z0*.6, mx+x1*.6,hb*.55,mz+z1*.6, tx,hb,tz)}
 const G=new THREE.BufferGeometry();G.setAttribute('position',new THREE.Float32BufferAttribute(P,3));G.computeVertexNormals();return G}
function formes354(sc){if(!sc)return;const hsl={};let n=0;sc.traverse(o=>{if(!o.isMesh||o.userData.f354||!o.geometry||!o.material)return;const g=o.geometry,ms=Array.isArray(o.material)?o.material:[o.material],m=ms[0];
 // l'herbe en lattes
 if(o.isInstancedMesh&&g.type==='PlaneGeometry'&&o.count>200){o.userData.f354=1;const p=g.parameters||{width:.3,height:.6};const T=touffe354(Math.max(.2,p.width||.3)*2.2,(p.height||.6));T.translate(0,-(p.height||.6)/2,0);o.geometry=T;
  if(o.instanceColor){const c=new THREE.Color();for(let i=0;i<o.count;i++){o.getColorAt(i,c);c.getHSL(hsl);if(hsl.h<.2)c.setHSL(hsl.h+.03,Math.min(hsl.s,.4),Math.min(hsl.l,.48));o.setColorAt(i,c)}o.instanceColor.needsUpdate=true}
  ms.forEach(x=>{x.side=THREE.DoubleSide;x.needsUpdate=true});n++;return}
 if(!m.color||m.vertexColors)return;m.color.getHSL(hsl);const aMap=!!m.map;
 // houppiers du kit (déjà reverdis par p353) et troncs orange
 if(aMap&&!(/Icosahedron|Dodecahedron|Sphere/.test(g.type)&&o.isInstancedMesh))return;
 if(o.userData.v353&&g.attributes.position.count<2000){o.userData.f354=1;g.computeBoundingBox();o.geometry=lobes354(g.boundingBox,o.id);n++;return}
 if(hsl.h<.08&&hsl.s>.55&&hsl.l>.45&&g.type==='BufferGeometry'){o.userData.f354=1;ms.forEach(x=>{x.color.setHex(0x6a5038);x.flatShading=false;x.needsUpdate=true});try{g.computeBoundingBox();const b=g.boundingBox,w=Math.max(b.max.x-b.min.x,b.max.z-b.min.z),hh=b.max.y-b.min.y;const C=new THREE.CylinderGeometry(w*.32,w*.46,hh,9,3);const q=C.attributes.position;for(let i=0;i<q.count;i++){const y=q.getY(i);q.setX(i,q.getX(i)*(1+.08*Math.sin(y*3+i)));}C.computeVertexNormals();C.translate((b.max.x+b.min.x)/2,(b.max.y+b.min.y)/2,(b.max.z+b.min.z)/2);o.geometry=C}catch(e){}n++;return}
 // feuillages en icosaèdres bruts (houppiers vus de loin) : en buissons arrondis
 if(/Icosahedron|Dodecahedron|Sphere/.test(g.type)&&o.isInstancedMesh&&hsl.h>.2&&hsl.h<.42&&hsl.s>.2&&(!g.parameters||!(g.parameters.detail>=2))&&g.attributes.position.count<200&&typeof buisson346==='function'){o.userData.f354=1;g.computeBoundingSphere();const B=buisson346(g.boundingSphere.radius,o.count);{const q=B.attributes.position,uv=new Float32Array(q.count*2);for(let i=0;i<q.count;i++){const x=q.getX(i),y=q.getY(i),z=q.getZ(i),l=Math.hypot(x,y,z)||1;uv[i*2]=.5+Math.atan2(z,x)/6.283*2;uv[i*2+1]=.5+Math.asin(y/l)/3.1416*2}B.setAttribute('uv',new THREE.BufferAttribute(uv,2))}o.geometry=B;ms.forEach(x=>{x.flatShading=false;x.needsUpdate=true});n++;return}
 // rochers
 if(/Icosahedron|Dodecahedron/.test(g.type)&&hsl.s<.15&&hsl.l<.5){o.userData.f354=1;try{o.geometry=lisse353(g)}catch(e){}ms.forEach(x=>{x.flatShading=false;x.needsUpdate=true});n++}});return n}
{const pass=f=>[900,2400,5500,9500].forEach(t=>setTimeout(()=>{try{f()}catch(e){}},t));
 if(typeof vpOuvrir==='function'){const o=vpOuvrir;vpOuvrir=function(){const r=o.apply(this,arguments);pass(()=>{if(typeof VP!=='undefined'&&VP&&VP.sc){vert353(VP.sc);formes354(VP.sc)}});return r}}
 {const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);pass(()=>{if(INC&&INC.S3){vert353(INC.S3);formes354(INC.S3)}});return r}}
 if(typeof ouvrirFPS==='function'){const o=ouvrirFPS;ouvrirFPS=function(){const r=o.apply(this,arguments);pass(()=>{if(typeof F!=='undefined'&&F&&F.sc){vert353(F.sc);formes354(F.sc)}});return r}}}
// Le duel : derrière les combattants, l'aquarelle du lieu au lieu du décor en aplats (montagne en triangle, arbres en piles)
// — rempart de Mafate : le sentier du cirque ; champ de canne de Saint-Paul : la savane de l'Ouest ; Bébour : la rivière en forêt.
{const IM={},src={mafate:AQ351.sentier,canne:AQ351.ouest,bebour:AQ351.riviere2};for(const k in src){const i=new Image();i.src=src[k];IM[k]=i}
 const o=fondDuel184;fondDuel184=function(x,W,H,sol,lk,t){const r=o.apply(this,arguments);try{const sc=SCENE184[lk]||'mafate',im=IM[sc];if(!im||!im.complete||!im.naturalWidth)return r;
  const hz=sol,iw=im.naturalWidth,ih=im.naturalHeight,k=Math.max(W/iw,hz/(ih*.86)),dw=iw*k,dh=ih*k,dx=(W-dw)/2,dy=hz-dh*.86;x.save();x.beginPath();x.rect(0,0,W,hz+2);x.clip();x.drawImage(im,dx,dy,dw,dh);
  const g=x.createLinearGradient(0,hz-40,0,hz+2);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(70,52,30,.55)');x.fillStyle=g;x.fillRect(0,hz-40,W,42);const g2=x.createLinearGradient(0,0,0,130);g2.addColorStop(0,'rgba(28,20,12,.6)');g2.addColorStop(1,'rgba(28,20,12,0)');x.fillStyle=g2;x.fillRect(0,0,W,130);x.restore()}catch(e){}return r}}
