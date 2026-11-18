
// ===== p126 : les rivières d'une seule coulée, de la source au cirque jusqu'à la mer =====
// Chaque rivière est tracée une fois sur le vrai relief : on part de sa source (dans les Hauts) et on descend toujours
// vers le plus bas, en gardant le cap vers l'embouchure. On en dessine ce qui est connu, sans trous d'une case à l'autre.
window.RIV126=null;
function riv126Calc(){const R=[];RIVS.forEach(r=>{let x=r.x2,z=r.z2,hx=r.x1-x,hz=r.z1-z;const P=[[x,z]];let hl=Math.hypot(hx,hz)||1;hx/=hl;hz/=hl;
 for(let k=0;k<2400;k++){const dm=Math.hypot(r.x1-x,r.z1-z);if(alt(x,z)<=0&&dm<2.5)break;let best=null,bc=Infinity;for(let a=0;a<28;a++){const an=a/28*6.283,dx=Math.cos(an),dz=Math.sin(an);if(dx*hx+dz*hz<-.15)continue;const X=x+dx*.05,Z=z+dz*.05,c=alt(X,Z)+Math.hypot(r.x1-X,r.z1-Z)*5-(dx*hx+dz*hz)*1.5;if(c<bc){bc=c;best=[X,Z,dx,dz]}}
  if(!best)break;x=best[0];z=best[1];hx=hx*.55+best[2]*.45;hz=hz*.55+best[3]*.45;hl=Math.hypot(hx,hz)||1;hx/=hl;hz/=hl;P.push([x,z]);if(alt(x,z)<=-2)break}
 // lissage
 let Q=P;for(let it=0;it<2;it++){const N=[Q[0]];for(let i=0;i<Q.length-1;i++){const a=Q[i],b=Q[i+1];N.push([a[0]*.75+b[0]*.25,a[1]*.75+b[1]*.25],[a[0]*.25+b[0]*.75,a[1]*.25+b[1]*.75])}N.push(Q[Q.length-1]);Q=N}
 for(let i=1;i<Q.length-1;i++){const a=Q[i-1],b=Q[i+1];let dx=b[0]-a[0],dz=b[1]-a[1];const L=Math.hypot(dx,dz)||1;const w=Math.sin(i*.21+r.x1)*.07+Math.sin(i*.53+r.z1)*.03;Q[i]=[Q[i][0]-dz/L*w,Q[i][1]+dx/L*w]}
 const S2=[];for(let i=0;i<Q.length;i+=2)S2.push(Q[i]);const ouest=LL99({x:r.x1,z:r.z1}).lon<55.45;R.push({n:r.n,P:S2,ouest});
 // en remontant, la rivière se divise : des bras plus fins descendent des pentes et la rejoignent
 const hauts=S2.map((q,i)=>[i,alt(q[0],q[1])]).filter(([i,h])=>h>450&&h<1900);for(let b=0;b<Math.min(6,Math.floor(hauts.length/25));b++){const [i]=hauts[Math.floor((b+.5)/6*hauts.length)]||[];if(i==null)continue;const q=S2[i],a=S2[Math.max(0,i-1)],c=S2[Math.min(S2.length-1,i+1)];let dx=c[0]-a[0],dz=c[1]-a[1];const L=Math.hypot(dx,dz)||1;dx/=L;dz/=L;const sg=b%2?1:-1;
  let x=q[0]-dz*sg*.7,z=q[1]+dx*sg*.7;for(let u=0;u<10;u++){let bh=alt(x,z),bx=x,bz=z;for(let k=0;k<12;k++){const an=k/12*6.283,X=x+Math.cos(an)*.05,Z=z+Math.sin(an)*.05;if(alt(X,Z)>bh){bh=alt(X,Z);bx=X;bz=Z}}x=bx;z=bz}
  const B=[[x,z]];for(let k=0;k<90;k++){let bh=alt(x,z),bx=null,bz=null;for(let a2=0;a2<20;a2++){const an=a2/20*6.283,X=x+Math.cos(an)*.04,Z=z+Math.sin(an)*.04,h=alt(X,Z);if(h<bh){bh=h;bx=X;bz=Z}}if(bx==null)break;x=bx;z=bz;B.push([x,z]);if(S2.some(m=>Math.hypot(m[0]-x,m[1]-z)<.07))break}
  if(B.length>5)R.push({n:r.n,P:B,ouest,br:1})}});return R}
{const vb=viv108Bati;viv108Bati=function(){if(!window.RIV126){try{window.RIV126=riv126Calc()}catch(e){window.RIV126=[]}}const g=vb.apply(this,arguments);try{if(!S)return g;
 const cyc=S.cyc&&S.cyc.in<=0,pl=pluie(),R0=Math.max(4,dist*.75);const eau=viv108Mat(cyc?0x7a6a4a:0x3d8db5,{transparent:true,opacity:.85,side:THREE.DoubleSide}),gal=viv108Mat(0xb8b0a0,{side:THREE.DoubleSide});
 window.RIV126.forEach(r=>{const sec=!pl&&!cyc&&r.ouest;let run=[];const fin=()=>{if(run.length<3){run=[];return}const V=[],I=[];run.forEach((q,j)=>{const a=run[Math.max(0,j-1)],b=run[Math.min(run.length-1,j+1)];let dx=b[0]-a[0],dz=b[1]-a[1];const L=Math.hypot(dx,dz)||1;dx/=L;dz/=L;const h=Math.max(0,alt(q[0],q[1]));
   const w=(cyc?.3:pl?.11:sec?.06:.08)*RIVF108(r.n)*(1+Math.max(0,(60-h)/60)*1.2)*Math.max(.28,1-h/2300)*(r.br?.5:1)*(pl||cyc?1.25:1);[-1,1].forEach(sg=>{const x=q[0]-dz*w*sg,z=q[1]+dx*w*sg;V.push(x,Math.max(0,alt(x,z),h)*VX+.035,z)});if(j){const o=(j-1)*2;I.push(o,o+1,o+2,o+1,o+3,o+2)}});
   const G=new THREE.BufferGeometry();G.setAttribute('position',new THREE.Float32BufferAttribute(V,3));G.setIndex(I);G.computeVertexNormals();g.add(new THREE.Mesh(G,sec?gal:eau));run=[]};
  r.P.forEach(q=>{const t=tileAt({x:q[0],z:q[1]});const vu=t&&seen(t)&&Math.hypot(q[0]-camT.x,q[1]-camT.z)<R0;if(vu)run.push(q);else fin()});fin()})}catch(e){}return g}}
// le lagon de l'Ouest : une eau claire turquoise derrière la barrière de corail, de Saint-Gilles à Saint-Leu, avec la ligne blanche du récif
{let G=null;setInterval(()=>{try{if(typeof scene==='undefined'||!DEM||G)return;const P=[];for(let la=-21.025;la>=-21.185;la-=.004){const lo0=55.31;let [x,z]=xz(lo0,la);let k=0;while(alt(x,z)>0&&k<400){x-=.02;k++}if(k>=400)continue;P.push([x,z])}
 if(P.length<5)return;G=new THREE.Group();const V=[],W=[],I=[],J=[];P.forEach((q,j)=>{const a=P[Math.max(0,j-1)],b=P[Math.min(P.length-1,j+1)];let dx=b[0]-a[0],dz=b[1]-a[1];const L=Math.hypot(dx,dz)||1;let nx=dz/L,nz=-dx/L;if(nx>0){nx=-nx;nz=-nz}
  const w=.55+.25*Math.sin(j*.7);V.push(q[0]+nx*.02,.012,q[1]+nz*.02,q[0]+nx*w,.012,q[1]+nz*w);W.push(q[0]+nx*w,.016,q[1]+nz*w,q[0]+nx*(w+.07),.016,q[1]+nz*(w+.07));if(j){const o=(j-1)*2;I.push(o,o+1,o+2,o+1,o+3,o+2)}});
 const mk=(A,c,op)=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(A,3));g.setIndex(I);const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:op,depthWrite:false,side:THREE.DoubleSide}));m.renderOrder=2;G.add(m)};
 mk(V,0x7fe6dc,.45);mk(W,0xffffff,.75);scene.add(G)}catch(e){}},2000)}
