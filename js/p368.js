// ===== p368 : (1) au départ de chaque carte incarnée, 4 secondes sans aquarelle (le rendu d'origine, comme avec F8), puis
// l'aquarelle revient en fondu ; (2) F5 en incarnation : mettre sa propre photo sur le visage du personnage (elle reste
// dans ce navigateur seulement ; Maj+F5 l'enlève). =====
try{if(typeof AQ352!=='undefined')AQ352.mo=AQ352.mo||{value:0}}catch(e){}
{const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);try{if(typeof AQ352!=='undefined'&&AQ352.mo){AQ352.mo.value=1;const t0=performance.now()+4000;const f=()=>{const t=performance.now();if(t<t0){AQ352.mo.value=1;requestAnimationFrame(f);return}const k=Math.min(1,(t-t0)/1500);AQ352.mo.value=1-k*k*(3-2*k);if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}}catch(e){}return r}}
// --- la photo sur le visage ---
const VIS368={tex:null,url:null,m:null,I:null,os:null};
try{VIS368.url=localStorage.getItem('tsa-visage')}catch(e){}
function visTex368(url){return new Promise(ok=>{const im=new Image();im.onload=()=>{const N=256,c=document.createElement('canvas');c.width=N;c.height=Math.round(N*1.2);const x=c.getContext('2d');
 // on garde le centre de la photo (là où est le visage d'un selfie) et on l'arrondit en ovale aux bords doux
 const s=Math.min(im.width,im.height/1.2),sx=(im.width-s)/2,sy=(im.height-s*1.2)/2;x.drawImage(im,sx,sy,s,s*1.2,0,0,c.width,c.height);
 x.globalCompositeOperation='destination-in';const g=x.createRadialGradient(N/2,c.height/2,N*.3,N/2,c.height/2,N*.5);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.save();x.translate(N/2,c.height/2);x.scale(1,1.2);x.translate(-N/2,-c.height/2);x.fillRect(0,0,N,c.height);x.restore();
 const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;ok(t)};im.onerror=()=>ok(null);im.src=url})}
function visPrendre368(){const i=document.createElement('input');i.type='file';i.accept='image/*';i.capture='user';i.onchange=()=>{const f=i.files&&i.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{
 // on réduit la photo avant de la garder (elle ne quitte pas ce navigateur)
 const im=new Image();im.onload=()=>{const c=document.createElement('canvas'),k=Math.min(1,480/Math.max(im.width,im.height));c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);const u=c.toDataURL('image/jpeg',.85);VIS368.url=u;try{localStorage.setItem('tsa-visage',u)}catch(e){}
  visTex368(u).then(t=>{VIS368.tex=t;if(VIS368.m){VIS368.m.material.map=t;VIS368.m.material.needsUpdate=true}if(typeof incMsg287==='function')incMsg287('Votre visage est sur le personnage. (F5 : changer de photo · Maj+F5 : l’enlever)')})};im.src=rd.result};rd.readAsDataURL(f)};i.click()}
addEventListener('keydown',e=>{if(e.key!=='F5')return;const I=typeof INC!=='undefined'?INC:null;if(!I||!I.h)return;e.preventDefault();
 if(e.shiftKey){VIS368.url=null;VIS368.tex=null;try{localStorage.removeItem('tsa-visage')}catch(x){}if(VIS368.m){VIS368.m.parent&&VIS368.m.parent.remove(VIS368.m);VIS368.m=null}if(typeof incMsg287==='function')incMsg287('Photo enlevée.');return}visPrendre368()},true);
function visMaj368(){requestAnimationFrame(visMaj368);try{const I=typeof INC!=='undefined'?INC:null;if(!I||!I.h||!I.h.root||!VIS368.url){if(VIS368.m&&VIS368.I!==I)VIS368.m=null;return}
 if(!VIS368.tex){if(!VIS368.ch){VIS368.ch=1;visTex368(VIS368.url).then(t=>{VIS368.tex=t;VIS368.ch=0})}return}
 if(!VIS368.m||VIS368.I!==I){VIS368.I=I;VIS368.os=null;const m=new THREE.Mesh(new THREE.PlaneGeometry(.2,.24),new THREE.MeshBasicMaterial({map:VIS368.tex,transparent:true,depthWrite:false}));m.renderOrder=5;I.S3.add(m);VIS368.m=m}
 const r=I.h.root;if(!VIS368.os||!VIS368.os.parent){VIS368.os=null;r.traverse(o=>{if(!VIS368.os&&o.isBone&&/^(mixamorig)?:?Head$/i.test(o.name))VIS368.os=o})}
 const m=VIS368.m,v=new THREE.Vector3(),q=new THREE.Quaternion();if(VIS368.os){VIS368.os.getWorldPosition(v);v.y+=.06}else{r.getWorldPosition(v);v.y+=1.55}
 r.getWorldQuaternion(q);const fw=new THREE.Vector3(0,0,1).applyQuaternion(q);m.position.copy(v).addScaledVector(fw,.13);m.quaternion.copy(q);m.visible=r.visible!==false&&!I.vueTete&&!(window.KAL365&&KAL365.on)}catch(e){}}
requestAnimationFrame(visMaj368);
