
// ===== p126 : les rivières d'une seule coulée, de la source au cirque jusqu'à la mer =====
// Chaque rivière est tracée une fois sur le vrai relief : on part de sa source (dans les Hauts) et on descend toujours
// vers le plus bas, en gardant le cap vers l'embouchure. On en dessine ce qui est connu, sans trous d'une case à l'autre.
window.RIV126=null;
function riv126Calc(){const R=[];RIVS.forEach(r=>{let x=r.x2,z=r.z2,hx=r.x1-x,hz=r.z1-z;const P=[[x,z]];let hl=Math.hypot(hx,hz)||1;hx/=hl;hz/=hl;
 for(let k=0;k<2400;k++){const dm=Math.hypot(r.x1-x,r.z1-z);if(alt(x,z)<=0&&dm<2.5)break;let best=null,bc=Infinity;for(let a=0;a<28;a++){const an=a/28*6.283,dx=Math.cos(an),dz=Math.sin(an);if(dx*hx+dz*hz<-.15)continue;const X=x+dx*.05,Z=z+dz*.05,c=alt(X,Z)+Math.hypot(r.x1-X,r.z1-Z)*5-(dx*hx+dz*hz)*1.5;if(c<bc){bc=c;best=[X,Z,dx,dz]}}
  if(!best)break;x=best[0];z=best[1];hx=hx*.55+best[2]*.45;hz=hz*.55+best[3]*.45;hl=Math.hypot(hx,hz)||1;hx/=hl;hz/=hl;P.push([x,z]);if(alt(x,z)<=-2)break}
 // lissage
 let Q=P.filter((_,i)=>i%5===0||i===P.length-1);for(let it=0;it<3;it++){const N=[Q[0]];for(let i=0;i<Q.length-1;i++){const a=Q[i],b=Q[i+1];N.push([a[0]*.75+b[0]*.25,a[1]*.75+b[1]*.25],[a[0]*.25+b[0]*.75,a[1]*.25+b[1]*.75])}N.push(Q[Q.length-1]);Q=N}
 for(let i=1;i<Q.length-1;i++){const a=Q[i-1],b=Q[i+1];let dx=b[0]-a[0],dz=b[1]-a[1];const L=Math.hypot(dx,dz)||1;const w=Math.sin(i*.21+r.x1)*.07+Math.sin(i*.53+r.z1)*.03;Q[i]=[Q[i][0]-dz/L*w,Q[i][1]+dx/L*w]}
 const S2=Q;const ouest=LL99({x:r.x1,z:r.z1}).lon<55.45;R.push({n:r.n,P:S2,ouest});
 // en remontant, la rivière se divise : des bras plus fins descendent des pentes et la rejoignent
 const hauts=S2.map((q,i)=>[i,alt(q[0],q[1])]).filter(([i,h])=>h>450&&h<1900);const nbB=Math.min(9,Math.floor(hauts.length/18));for(let b=0;b<nbB;b++){const [i]=hauts[Math.floor((b+.5)/nbB*hauts.length)]||[];if(i==null)continue;const q=S2[i],a=S2[Math.max(0,i-1)],c=S2[Math.min(S2.length-1,i+1)];let dx=c[0]-a[0],dz=c[1]-a[1];const L=Math.hypot(dx,dz)||1;dx/=L;dz/=L;const sg=b%2?1:-1;
  let x=q[0]-dz*sg*.7,z=q[1]+dx*sg*.7;for(let u=0;u<10;u++){let bh=alt(x,z),bx=x,bz=z;for(let k=0;k<12;k++){const an=k/12*6.283,X=x+Math.cos(an)*.05,Z=z+Math.sin(an)*.05;if(alt(X,Z)>bh){bh=alt(X,Z);bx=X;bz=Z}}x=bx;z=bz}
  const B=[[x,z]];let joint=false;for(let k=0;k<700;k++){let bh=alt(x,z),bx=null,bz=null;for(const rr of [.04,.08,.16])if(bx==null)for(let a2=0;a2<20;a2++){const an=a2/20*6.283,X=x+Math.cos(an)*rr,Z=z+Math.sin(an)*rr,h=alt(X,Z);if(h<bh){bh=h;bx=X;bz=Z}}
   // cuvette sans issue : l'eau suit quand même la pente générale vers la rivière proche (elle s'infiltre et ressort plus bas)
   if(bx==null){let mm=null,md=1e9;for(const m of S2){const d=Math.hypot(m[0]-x,m[1]-z);if(d<md){md=d;mm=m}}if(!mm)break;bx=x+(mm[0]-x)/md*.04;bz=z+(mm[1]-z)/md*.04}
   x=bx;z=bz;B.push([x,z]);if(alt(x,z)<=0){joint=true;break}let hit=null;for(const m of S2)if(Math.hypot(m[0]-x,m[1]-z)<.07){hit=m;break}if(!hit)for(const o of R)if(o.br&&o.P!==B)for(const m of o.P)if(Math.hypot(m[0]-x,m[1]-z)<.05){hit=m;break}if(hit){B.push([hit[0],hit[1]]);joint=true;break}}
  if(B.length>5)R.push({n:r.n,P:B,ouest,br:1})}});return R}
// Les rivières ont leur propre calque : visibles à tous les zooms (plus larges quand on s'éloigne), tracé lissé (pas de zigzags ni de tresses),
// et dessinées sur tout ce qui est connu, pas seulement près de la caméra.
const RIVG126={g:null,cle:''};
function rivLisse126(run){let Q=run.map(q=>[q[0],q[1]]);for(let it=0;it<3;it++){const N=[Q[0]];for(let i=1;i<Q.length-1;i++){const a=Q[i-1],b=Q[i],c=Q[i+1];N.push([(a[0]+b[0]*2+c[0])/4,(a[1]+b[1]*2+c[1])/4])}if(Q.length>1)N.push(Q[Q.length-1]);Q=N}return Q}
function rivBatir126(){const g=new THREE.Group();if(!window.RIV126||!S)return g;const cyc=S.cyc&&S.cyc.in<=0,pl=pluie(),zf=Math.max(1,Math.min(3.2,dist/13)),loin=dist>16;
 const gal=viv108Mat(0xb8b0a0,{side:THREE.DoubleSide});
 window.RIV126.forEach(r=>{if(r.br&&loin&&!pl&&!cyc)return;const sec=!pl&&!cyc&&/Ravine/.test(r.n);let run=[];const fin=()=>{if(run.length<3){run=[];return}const R=rivLisse126(run),V=[],I=[],UV=[];let lg=0;
   R.forEach((q,j)=>{if(j)lg+=Math.hypot(q[0]-R[j-1][0],q[1]-R[j-1][1]);const a=R[Math.max(0,j-3)],b=R[Math.min(R.length-1,j+3)];let dx=b[0]-a[0],dz=b[1]-a[1];const L=Math.hypot(dx,dz)||1;dx/=L;dz/=L;const h=Math.max(0,alt(q[0],q[1]));
    const w=(cyc?.3:pl?.11:sec?.06:.08)*RIVF108(r.n)*(1+Math.max(0,(60-h)/60)*1.2)*Math.max(.28,1-h/2300)*(r.br?.5:1)*(pl||cyc?1.25:1)*zf;
    [-1,1].forEach(sg=>{const x=q[0]-dz*w*sg,z=q[1]+dx*w*sg;V.push(x,h*VX+.035*zf,z);UV.push(sg<0?0:1,lg*6)});if(j){const o=(j-1)*2;I.push(o,o+1,o+2,o+1,o+3,o+2)}});
   const G=new THREE.BufferGeometry();G.setAttribute('position',new THREE.Float32BufferAttribute(V,3));G.setAttribute('uv',new THREE.Float32BufferAttribute(UV,2));G.setIndex(I);const m=new THREE.Mesh(G,sec?gal:eauRiv147(cyc));m.renderOrder=2;g.add(m);run=[]};
  r.P.forEach(q=>{const t=tileAt({x:q[0],z:q[1]});const vu=t?(seen(t)||(t.nb||[]).some(i=>seen(T[i]))):run.length>0;if(vu)run.push(q);else fin()});fin()});return g}
setInterval(()=>{try{if(typeof scene==='undefined'||!S||typeof alt!=='function')return;if(!window.RIV126){try{window.RIV126=riv126Calc()}catch(e){window.RIV126=[]}}
 let n=0;for(const k in S.t)if(S.t[k].s)n++;
 const cle=Math.round(Math.max(1,Math.min(3.2,dist/13))*4)+(dist>16?'L':'P')+'|'+n+'|'+(pluie()?1:0)+'|'+(S.cyc&&S.cyc.in<=0?1:0);
 if(cle!==RIVG126.cle){RIVG126.cle=cle;if(RIVG126.g){scene.remove(RIVG126.g);RIVG126.g.traverse(o=>{if(o.geometry)o.geometry.dispose()})}RIVG126.g=rivBatir126();scene.add(RIVG126.g)}
 RIVG126.g.visible=!(S.fin||K||VP)&&dist<70}catch(e){}},900);
// le lagon de l'Ouest : une eau claire turquoise derrière la barrière de corail, de Saint-Gilles à Saint-Leu, avec la ligne blanche du récif
{let G=null;setInterval(()=>{try{if(typeof scene==='undefined'||!DEM||G)return;const P=[];for(let la=-21.025;la>=-21.185;la-=.004){const lo0=55.31;let [x,z]=xz(lo0,la);let k=0;while(alt(x,z)>0&&k<400){x-=.02;k++}if(k>=400)continue;P.push([x,z])}
 if(P.length<5)return;G=new THREE.Group();const V=[],W=[],I=[],J=[];P.forEach((q,j)=>{const a=P[Math.max(0,j-1)],b=P[Math.min(P.length-1,j+1)];let dx=b[0]-a[0],dz=b[1]-a[1];const L=Math.hypot(dx,dz)||1;let nx=dz/L,nz=-dx/L;if(nx>0){nx=-nx;nz=-nz}
  const w=.55+.25*Math.sin(j*.7);V.push(q[0]+nx*.02,.012,q[1]+nz*.02,q[0]+nx*w,.012,q[1]+nz*w);W.push(q[0]+nx*w,.016,q[1]+nz*w,q[0]+nx*(w+.07),.016,q[1]+nz*(w+.07));if(j){const o=(j-1)*2;I.push(o,o+1,o+2,o+1,o+3,o+2)}});
 const mk=(A,c,op)=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(A,3));g.setIndex(I);const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:op,depthWrite:false,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-4,polygonOffsetUnits:-4}));m.renderOrder=2;G.add(m)};
 mk(V,0x7fe6dc,.45);mk(W,0xffffff,.75);scene.add(G)}catch(e){}},2000)}
