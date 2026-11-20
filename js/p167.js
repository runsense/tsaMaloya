// ===== p167 : les oiseaux battent des ailes (modèles sans squelette : papangue, paille-en-queue, pétrel, zoizo) =====
// Dans le modèle, le corps suit l'axe Y, les ailes s'étendent sur l'axe Z et l'épaisseur est sur X : on plie chaque aile autour du corps,
// plus fort au bout qu'à l'épaule. Chaque oiseau a sa façon de voler (le papangue plane, le zoizo bat très vite).
const AIL167={t:{value:0},P:{oi_papangue:{f:2.2,a:.8,plane:1,ph:.18},oi_phaeton:{f:3.2,a:1,plane:.4,ph:.12,queue:1},oi_petrel:{f:4.5,a:.5,plane:.7,ph:.1}}};
(function t167(){requestAnimationFrame(t167);AIL167.t.value=performance.now()/1000})();
const g167=v=>'('+Number(v).toFixed(4)+')';
function ailes167(s,n,graine){const P=AIL167.P[n];if(!P)return;const b=new THREE.Box3();s.traverse(m=>{if(m.isMesh&&m.geometry){m.geometry.computeBoundingBox();b.union(m.geometry.boundingBox)}});s.traverse(m=>{if(!m.isMesh||!m.geometry)return;
 const cz=(b.min.z+b.max.z)/2,hz=(b.max.z-b.min.z)/2||1,cy=(b.min.y+b.max.y)/2,hy=(b.max.y-b.min.y)/2||1;
 const cyc=P.plane?'(smoothstep(.55,.95,sin(t*'+g167(P.f*.12)+'))*'+g167(P.plane)+'+'+g167(1-P.plane)+')':'1.0';
 const code='#include <begin_vertex>\n{float zz=(position.z-'+g167(cz)+')/'+g167(hz)+';float d=max(0.0,abs(zz)-'+g167(P.ph)+');float t=uT167+'+g167(graine)+';'+
  'float bat=sin(t*'+g167(P.f)+')*'+cyc+(P.plane?'+0.12':'')+';transformed.x+=bat*'+g167(P.a)+'*pow(d,1.35)*'+g167(hz)+';'+
  (P.queue?'{float yy=(position.y-'+g167(cy)+')/'+g167(hy)+';float q=max(0.0,-yy-0.35);transformed.x+=sin(t*2.1-yy*5.0)*q*q*'+g167(hy*.25)+';}':'')+'}';
 const mats=Array.isArray(m.material)?m.material:[m.material];const L=mats.map(mt=>{const c=mt.clone();c.onBeforeCompile=sh=>{sh.uniforms.uT167=AIL167.t;sh.vertexShader='uniform float uT167;\n'+sh.vertexShader.replace('#include <begin_vertex>',code)};c.customProgramCacheKey=()=>'ail167'+n+graine.toFixed(3);return c});
 m.material=L.length===1?L[0]:L})}
{const i0=inst144;inst144=function(n,o){return i0.apply(this,arguments).then(r=>{try{if(AIL167.P[n])ailes167(r.w,n,Math.random()*10)}catch(e){}return r})}}
