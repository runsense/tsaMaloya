// ===== p223 : les gens venus de l'Inde se voient — saris et dhotis de couleur, hommes compris : marron, orange, vert, rouge, bleu, rose ;
// ceux qui viennent ou deviennent propriétaires de terre portent la parure dorée (bordures d'or). Le tissu clair de la texture Meshy est reteint,
// la peau n'est pas touchée (on ne reteint que les pixels clairs et peu saturés, et la bordure verte du sari). =====
const SARI223={C:[[150,92,52],[224,120,40],[52,140,70],[190,40,48],[48,86,180],[226,110,160]],cache:new Map()};
function or223(p){try{return !!p&&(p.prop223||p.prop||(p.st==='libre'&&(S.year||0)>=1880&&(rndH((+String(p.id).replace(/\D/g,'')||7)*3.3)<.35)))}catch(e){return false}}
function teinte223(img,ci,or){if(!img.__id223)img.__id223=(SARI223.n=(SARI223.n||0)+1);const k=img.__id223+'|'+ci+'|'+(or?1:0);let t=SARI223.cache.get(k);if(t)return t;
 const w=img.width,h=img.height,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.drawImage(img,0,0);const D=x.getImageData(0,0,w,h),d=D.data,[cr,cg,cb]=SARI223.C[ci];
 for(let i=0;i<d.length;i+=4){const r=d[i],g=d[i+1],b=d[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/510,s=mx?(mx-mn)/mx:0;
  const vert=g>r&&g>b*1.05&&s>.12;  // la bordure verte du sari
  if(vert){if(or){const k2=l*1.5;d[i]=Math.min(255,235*k2);d[i+1]=Math.min(255,185*k2);d[i+2]=Math.min(255,60*k2)}else{const k2=l*1.2;d[i]=Math.min(255,cr*.55*k2+40);d[i+1]=Math.min(255,cg*.55*k2+40);d[i+2]=Math.min(255,cb*.55*k2+40)}}
  else if(l>.55&&s<.32){const k2=.35+l*.85;d[i]=Math.min(255,cr*k2);d[i+1]=Math.min(255,cg*k2);d[i+2]=Math.min(255,cb*k2)}}
 x.putImageData(D,0,0);t=new THREE.CanvasTexture(c);SARI223.cache.set(k,t);return t}
function sari223(scene,ci,or){try{scene.traverse(o=>{if(!o.isMesh||!o.material)return;const L=Array.isArray(o.material)?o.material:[o.material];L.forEach((m,j)=>{const src=m.userData.map223||m.map;if(!src||!src.image)return;
  const t=teinte223(src.image,ci,or);if(m.map===t)return;const m2=m.userData.map223?m:m.clone();m2.userData.map223=src;t.flipY=src.flipY;t.colorSpace=src.colorSpace;t.wrapS=src.wrapS;t.wrapT=src.wrapT;t.needsUpdate=true;m2.map=t;m2.needsUpdate=true;if(Array.isArray(o.material))o.material[j]=m2;else o.material=m2})});scene.userData.sari223=ci+'|'+or}catch(e){}}
// chaque nouvelle figure indienne reçoit une couleur (n'importe quelle vue : camp, ville, carte)
{let n223=0;const pi=p3Instance;p3Instance=function(n){const r=pi.apply(this,arguments);if(n!=='indien'&&n!=='indienne')return r;return r.then(I=>{try{sari223(I.g.scene,(n223++*5+3)%SARI223.C.length,(S&&(S.year||0)>=1880)&&Math.random()<.2)}catch(e){}return I})}}
// au camp et à l'habitation, la couleur suit la personne (toujours la même), et l'or va aux propriétaires
setInterval(()=>{try{if(typeof P3==='undefined'||!P3.M||!S||!S.pp)return;for(const id in P3.M){const m=P3.M[id];if(!m||!m.o||(m.n!=='indien'&&m.n!=='indienne'))continue;const p=S.pp.find(q=>String(q.id)===String(id));if(!p)continue;
  const ci=Math.floor(rndH((+String(p.id).replace(/\D/g,'')||1)*7.7)*SARI223.C.length),or=or223(p),k=ci+'|'+or;const sc=m.o.g.scene;if(sc.userData.sari223!==k)sari223(sc,ci,or)}}catch(e){}},1500);
