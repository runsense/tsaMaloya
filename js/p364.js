// ===== p364 : les modèles Meshy du 27/11 dans le jeu — la charrette à cannes, la chaloupe à rames, la cheminée de l'usine
// sucrière, le caféier (qui remplace les touffes construites dans les caféières). =====
// les caféières : chaque touffe construite devient un vrai caféier, à la même place, à la même taille
{const o=decor336;decor336=function(I){const r=o.apply(this,arguments);try{setTimeout(()=>{try{if(INC!==I)return;let fe=null,ce=null;I.S3.children.forEach(m=>{if(m.isInstancedMesh&&m.material&&m.material.vertexColors&&m.count>40&&!fe&&m.geometry.attributes.color&&m.geometry.attributes.position.count<4000)fe=m;if(m.isInstancedMesh&&m.material&&m.material.color&&m.material.color.r>.6&&m.material.color.g<.3&&m.count>100)ce=m});if(!fe)return;
 arbGeo153('plante_cafeier').then(L=>{if(INC!==I)return;const M=new THREE.Matrix4(),V=new THREE.Vector3(),Q=new THREE.Quaternion(),S=new THREE.Vector3();const n=fe.count;
  L.forEach(pt=>{const im=new THREE.InstancedMesh(pt.ge,pt.mat,n);for(let i=0;i<n;i++){fe.getMatrixAt(i,M);M.decompose(V,Q,S);const H=1.55*S.y/.95;M.compose(V.set(V.x,V.y-H*.32,V.z),Q,S.set(H,H,H));im.setMatrixAt(i,M)}im.instanceMatrix.needsUpdate=true;I.S3.add(im)});
  fe.visible=false;if(ce)ce.visible=false}).catch(()=>{})}catch(e){}},1500)}catch(e){}return r}}
function poser364(I,n,h0,x,z,rot){if(typeof mod104!=='function')return;mod104(n).then(T=>{if(INC!==I)return;const o=clone104(T,h0);o.position.set(x,I.hAt(x,z),z);o.rotation.y=rot||0;I.S3.add(o)}).catch(()=>{});const ag=Math.floor(x/4)+','+Math.floor(z/4);(I.AG[ag]||(I.AG[ag]=[])).push({x,z,r:h0*.6})}
function decor364(I){if(!I||!I.S3||I.d364)return;I.d364=1;const P=I.P,N=I.N,an=parseInt(I.C.an)||1750,k=String(I.k),m=k.match(/^epc327_(.+)_(-?\d+)$/),D=m&&typeof DEC336!=='undefined'?((DEC336[m[1]]||{})[m[2]]||[]):[];
 const dir=i=>{const p=P[Math.max(0,i-2)],q=P[Math.min(N-1,i+2)];const dx=q[0]-p[0],dz=q[1]-p[1],L=Math.hypot(dx,dz)||1;return [dx/L,dz/L]};
 const cote=(i,d,s)=>{const [dx,dz]=dir(i);return [P[i][0]-dz*d*s,P[i][1]+dx*d*s,Math.atan2(dx,dz)]};
 // la charrette : au bord des rues et des champs (après 1720, quand les bœufs tirent les récoltes)
 if(an>=1720&&(I.C.ville||I.C.cafe336||D.includes('cafe'))){[.3,.7].forEach((f,j)=>{const i=Math.floor(N*f),[x,z,a]=cote(i,I.C.ville?2.6:4.2,j?1:-1);poser364(I,'bat_charrette',1.6,x,z,a)})}
 // la chaloupe : tirée sur la grève, au port et sur les côtes
 if(D.includes('port')||D.includes('cote')){for(let j=0;j<3;j++){const i=Math.floor(N*(.05+j*.04)),[x,z,a]=cote(i,7+j*2.5,-1);poser364(I,'bat_chaloupe',1.1,x,z,a+.4*j)}}
 // la cheminée de l'usine : à l'horizon des champs, après 1815 (le temps du sucre)
 if(an>=1815&&!I.C.ville){const i=Math.floor(N*.55),[x,z]=cote(i,46,1);poser364(I,'bat_cheminee',18,x,z,0)}}
{const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);try{const I=INC;setTimeout(()=>{try{if(INC===I)decor364(I)}catch(e){console.warn('p364',e)}},1400)}catch(e){}return r}}
// ===== les instruments du maloya autour du feu du camp (kayamb, roulèr, bobre) — modèles Meshy du 27/11 =====
function instr364(sc,Y,cx,cz,ok){if(typeof mod104!=='function')return;[['bat_rouler',.85,2.4,.3,0],['bat_kayamb',.45,2.1,1.9,.5],['bat_bobre',1.5,2.6,-1.2,1.2]].forEach(([n,t,r,a,ry])=>{mod104(n).then(T=>{if(ok&&!ok())return;const o=clone104(T,t,true),x=cx+Math.sin(a)*r,z=cz+Math.cos(a)*r;o.position.set(x,Y(x,z)+(n==='bat_kayamb'?.03:0),z);o.rotation.y=ry;if(n==='bat_bobre')o.rotation.z=.35;sc.add(o)}).catch(()=>{})})}
{const v0=vpCamp152;vpCamp152=function(V){const r=v0.apply(this,arguments);try{instr364(V.sc,(x,z)=>V.h(x,z),0,-30,()=>V.sc.parent!==undefined)}catch(e){console.warn('p364i',e)}return r}}
// le moulin à cannes (bœufs ou vapeur) au bord des champs, après 1815, près de la cheminée de l'usine
{const d0=decor364;decor364=function(I){const deja=I&&I.d364;d0.apply(this,arguments);try{if(deja||!I||I.C.ville)return;const an=parseInt(I.C.an)||1750;if(an<1815)return;const P=I.P,N=I.N,i=Math.floor(N*.4),p=P[Math.max(0,i-2)],q=P[Math.min(N-1,i+2)],dx=q[0]-p[0],dz=q[1]-p[1],L=Math.hypot(dx,dz)||1;const x=P[i][0]+dz/L*14,z=P[i][1]-dx/L*14;
 if(typeof mod104!=='function')return;mod104('bat_moulin').then(T=>{if(INC!==I)return;const o=clone104(T,6,true);o.position.set(x,I.hAt(x,z),z);o.rotation.y=Math.atan2(dx,dz);I.S3.add(o)}).catch(()=>{});const ag=Math.floor(x/4)+','+Math.floor(z/4);(I.AG[ag]||(I.AG[ag]=[])).push({x,z,r:3})}catch(e){console.warn('p364m',e)}}}
