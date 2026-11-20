
// ===== p173 : on se baigne — nageurs et pêcheurs dans le lagon de l'Ouest quand il fait beau, baigneurs dans les bassins des cascades, marrons qui se lavent =====
const NAG173={L:{},mx:[]};
function fig173(n,h,clip){return rameur172(n,h).then(g=>{const mx=g.userData.mx;mx.stopAllAction();const cl=(fig173.cl[n]||[]).find(a=>a.name===clip);if(cl){const a=mx.clipAction(cl);a.time=Math.random()*cl.duration;a.play()}return g})}
fig173.cl={};
// on garde la liste des gestes de chaque modèle (p3Instance les rend avec le gltf)
{const pi=p3Instance;p3Instance=function(n){return pi.apply(this,arguments).then(I=>{fig173.cl[n]=I.g.animations;return I})}}
// la direction de la mer depuis une case du bord : à l'opposé de ses voisines de terre
function mer173(t){const N=(t.nb||[]).map(i=>T[i]).filter(Boolean);const w=N.find(u=>u.alt<=1);if(w)return {x:w.x,z:w.z};if(N.length>=6)return null;let cx=0,cz=0;N.forEach(u=>{cx+=u.x-t.x;cz+=u.z-t.z});const l=Math.hypot(cx,cz)||1,d=Math.hypot(N[0].x-t.x,N[0].z-t.z)||.6;return {x:t.x-cx/l*d,z:t.z-cz/l*d}}
const beau173=()=>{try{return !(typeof pluie==='function'&&pluie())&&!(S.cyc&&S.cyc.in<=1)}catch(e){return true}};
function place173(cle,n,h,clip,x,y,z,ry){let f=NAG173.L[cle];if(!f){f=NAG173.L[cle]={g:null,att:1};fig173(n,h,clip).then(g=>{if(NAG173.L[cle]!==f)return;f.g=g;scene.add(g)}).catch(()=>{delete NAG173.L[cle]})}f.vu=NAG173.t;if(f.g){f.g.position.set(x,y,z);f.g.rotation.y=ry}}
setInterval(()=>{try{if(typeof scene==='undefined'||!S||S.fin)return;NAG173.t=(NAG173.t||0)+1;const ph=typeof jourPh==='function'?jourPh():.5,jour=ph>.18&&ph<.7,voir=jour&&beau173()&&dist<18&&!(typeof VP!=='undefined'&&VP)&&!(typeof CINE!=='undefined'&&CINE);
 const now=performance.now()/1000,col=!!S.voieC;
 if(voir){
  // 1. le lagon de l'Ouest (Saint-Gilles, la Saline, Saint-Leu, l'Étang-Salé) : des nageurs et des pêcheurs à pied dans l'eau
  let n=0;T.forEach(t=>{if(n>=4||!seen(t)||t.alt<=0)return;const g=LL99(t);if(!(g.lon<55.4&&g.lat<-21.02&&g.lat>-21.3))return;if(Math.hypot(t.x-camT.x,t.z-camT.z)>dist*1.1+3)return;const m=mer173(t);if(!m)return;
   if(rndH(t.i*3.3+Math.floor(now/600))>.8)return;n++;const cx=t.x+(m.x-t.x)*.62,cz=t.z+(m.z-t.z)*.62,dx=m.x-t.x,dz=m.z-t.z;
   const a=now*.08+t.i,x=cx+Math.cos(a)*.18,z=cz+Math.sin(a)*.12;place173('lg'+t.i,col?'homme_chemise':'jeune_pagne',.16,'nager',x,-.012,z,-a+Math.PI/2);
   place173('lp'+t.i,col?'femme_travail':'femme_drapee',.16,'bichique',t.x+dx*.5+dz*.12,0,t.z+dz*.5-dx*.12,Math.atan2(dx,dz))});
  // 2. les bassins des cascades, près des camps : on s'y baigne, on s'y lave
  if(typeof C147!=='undefined'&&C147.L){let k=0;const cs=typeof camps==='function'?camps():[];C147.L.forEach((G,gi)=>{if(k>=2||!G.visible)return;const bas=G.children.find(c=>c.geometry&&c.geometry.type==='CircleGeometry');if(!bas)return;const p=bas.getWorldPosition(new THREE.Vector3());
    if(Math.hypot(p.x-camT.x,p.z-camT.z)>dist*.9+1.5)return;if(cs.length&&!cs.some(c=>Math.hypot(c.x-p.x,c.z-p.z)<4))return;if(rndH(gi*7.7+Math.floor(now/900))>.7)return;k++;
    const r=(bas.geometry.parameters.radius||.15)*.45,a=now*.25+gi;place173('bn'+gi,col?'homme_chemise':'jeune_pagne',.16,'nager',p.x+Math.cos(a)*r,p.y-.012,p.z+Math.sin(a)*r,-a+Math.PI/2);
    if(!col)place173('bl'+gi,'femme_drapee',.16,'lavandiere',p.x+r*1.9,p.y-.004,p.z,-Math.PI/2)})}}
 for(const k in NAG173.L){const f=NAG173.L[k];if(f.vu!==NAG173.t){if(f.g)scene.remove(f.g);delete NAG173.L[k]}}}catch(e){}},150);
// ===== le conte suit l'histoire : laissé à lui-même, il ne prend jamais un choix qui ouvre une utopie (comptoirs, café, course…) =====
{const cc=choixConte;const UTO=/\.(centre|ombre|sir|roy|lib|anc|abol|maur|angl|cors|arab|vichy|comp|cafe|polit)\s*=\s*(1|'[a-z]+')/;
 choixConte=function(e,id){const k=cc.apply(this,arguments);try{const O=id&&typeof optsDe==='function'?optsDe(id,e):e.o;if(!O||!O[k])return k;const ut=o=>o&&o.f&&UTO.test(String(o.f));if(!ut(O[k]))return k;const h=O.findIndex(o=>o.hist&&!ut(o));if(h>=0)return h;const j=O.findIndex(o=>!ut(o));return j>=0?j:k}catch(x){return k}}}
