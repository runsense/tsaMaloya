// ===== p101 : de petites images tirées des modèles 3D (packs Kenney) pour décorer les jeux en 2D =====
// On photographie chaque modèle une fois, de trois-quarts, sur fond transparent ; les petits jeux les dessinent ensuite comme des images.
const SPR={};let SPRR=null;
function sprObj(k){if(typeof KM98!=='undefined'&&KM98[k])return KM98[k].s;if(typeof KM92!=='undefined'&&KM92[k])return KM92[k];return null}
function spr(k,taille){const cle=k+'|'+(taille||128);if(SPR[cle])return SPR[cle];const o=sprObj(k);if(!o||!window.THREE)return null;try{const N=taille||128;
 if(!SPRR){SPRR=new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});SPRR.outputEncoding=THREE.sRGBEncoding}SPRR.setSize(N,N);SPRR.setClearColor(0x000000,0);
 const sc=new THREE.Scene();sc.add(new THREE.HemisphereLight(0xffffff,0x887766,1.05));const d=new THREE.DirectionalLight(0xffffff,.8);d.position.set(3,5,4);sc.add(d);const c=o.clone(true);sc.add(c);
 const b=new THREE.Box3().setFromObject(c),s=new THREE.Vector3(),m=new THREE.Vector3();b.getSize(s);b.getCenter(m);const r=Math.max(s.x,s.y,s.z)*.62;const cam=new THREE.PerspectiveCamera(30,1,.01,100);cam.position.set(m.x+r*2.6,m.y+r*1.9,m.z+r*2.6);cam.lookAt(m);
 SPRR.render(sc,cam);const cv=document.createElement('canvas');cv.width=cv.height=N;cv.getContext('2d').drawImage(SPRR.domElement,0,0);if(/tree|plant|palm|grass|bush/.test(k)){const g=cv.getContext('2d'),D=g.getImageData(0,0,N,N),P=D.data;for(let i=0;i<P.length;i+=4){const r=P[i],v=P[i+1],b=P[i+2];if(P[i+3]>0&&b>r*1.1&&v>r){P[i+2]=Math.round(b*.45);P[i+1]=Math.min(255,Math.round(v*1.05));P[i]=Math.round(r*1.1)}}g.putImageData(D,0,0)}SPR[cle]=cv;return cv}catch(e){return null}}
// dessine une petite image posée au sol en (x,y) : y est le pied
function sprDessin(x,k,px,py,h,flip){const im=spr(k);if(!im)return false;x.save();x.translate(px,py);if(flip)x.scale(-1,1);x.drawImage(im,-h/2,-h*.92,h,h);x.restore();return true}
