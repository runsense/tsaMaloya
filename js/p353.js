// ===== p353 : les arbres et les plantes perdent leurs facettes. Les modèles de plantes étaient peints face par face
// (ombrage plat) : on lisse leurs normales (chaque sommet prend la moyenne des faces qui le touchent) et on passe en
// ombrage doux ; le feuillage se lit alors comme des masses arrondies, comme sur les aquarelles. =====
function lisse353(g){const p=g.attributes.position;if(!p)return g;if(g.index)g=g.toNonIndexed();const P=g.attributes.position,n=P.count,N=new Float32Array(n*3),acc=new Map(),k=i=>Math.round(P.getX(i)*500)+','+Math.round(P.getY(i)*500)+','+Math.round(P.getZ(i)*500);
 const a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3(),f=new THREE.Vector3();
 for(let i=0;i<n;i+=3){a.fromBufferAttribute(P,i);b.fromBufferAttribute(P,i+1);c.fromBufferAttribute(P,i+2);f.subVectors(c,b).cross(b.clone().sub(a)).negate();// aire comprise
  for(let j=0;j<3;j++){const kk=k(i+j);let s=acc.get(kk);if(!s){s=[0,0,0];acc.set(kk,s)}s[0]+=f.x;s[1]+=f.y;s[2]+=f.z}}
 for(let i=0;i<n;i++){const s=acc.get(k(i)),l=Math.hypot(s[0],s[1],s[2])||1;N[i*3]=s[0]/l;N[i*3+1]=s[1]/l;N[i*3+2]=s[2]/l}
 g.setAttribute('normal',new THREE.BufferAttribute(N,3));
 // les couleurs peintes face par face (taches polygonales) : moyennées elles aussi par sommet, le feuillage se fond
 const C=g.attributes.color;if(C){const ca=new Map();for(let i=0;i<n;i++){const kk=k(i);let s=ca.get(kk);if(!s){s=[0,0,0,0];ca.set(kk,s)}s[0]+=C.getX(i);s[1]+=C.getY(i);s[2]+=C.getZ(i);s[3]++}for(let i=0;i<n;i++){const s=ca.get(k(i));C.setXYZ(i,s[0]/s[3],s[1]/s[3],s[2]/s[3])}C.needsUpdate=true}
 return g}
{const o=arbGeo153,W={};arbGeo153=function(n){if(W[n])return W[n];return W[n]=o(n).then(L=>{try{L.forEach(x=>{const ms=Array.isArray(x.mat)?x.mat:[x.mat];if(String(n).startsWith('plante_')||ms.some(m=>m.flatShading||m.vertexColors)){x.ge=lisse353(x.ge);ms.forEach(m=>{m.flatShading=false;m.needsUpdate=true})}})}catch(e){}return L})}}
// Les arbres du kit (feuillage turquoise 2cd8b8 / 29c9ab, en cubes biseautés) : feuillage ramené aux verts de l'île,
// normales lissées. Passé sur la scène du camp, des marches et de la chasse, plusieurs fois le temps que tout charge.
function vert353(sc){if(!sc)return;const c=new THREE.Color(),hsl={};let n=0;sc.traverse(o=>{if(!o.isMesh||o.userData.v353||!o.material)return;const ms=Array.isArray(o.material)?o.material:[o.material];let ok=false;
 ms.forEach(m=>{if(!m.color||m.map||m.vertexColors)return;m.color.getHSL(hsl);if(hsl.h>.42&&hsl.h<.53&&hsl.s>.45){ok=true;const k=(o.id%5);m.color.setHSL(.27+k*.012,.38+k*.03,.24+k*.025);m.flatShading=false;m.needsUpdate=true}});
 if(ok){o.userData.v353=1;try{o.geometry=lisse353(o.geometry)}catch(e){}n++}});return n}
{const pass=f=>[600,2000,5000,9000].forEach(t=>setTimeout(()=>{try{f()}catch(e){}},t));
 if(typeof vpOuvrir==='function'){const o=vpOuvrir;vpOuvrir=function(){const r=o.apply(this,arguments);pass(()=>{if(typeof VP!=='undefined'&&VP&&VP.sc)vert353(VP.sc)});return r}}
 {const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);pass(()=>{if(INC&&INC.S3)vert353(INC.S3)});return r}}
 if(typeof ouvrirFPS==='function'){const o=ouvrirFPS;ouvrirFPS=function(){const r=o.apply(this,arguments);pass(()=>{if(typeof F!=='undefined'&&F&&F.sc)vert353(F.sc)});return r}}}
