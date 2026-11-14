// ===== p46 : le cabri Meshy, avec des pattes — il marche, et broute quand il s'arrête =====
// modeles/ani_cabri.txt : le cabri de la bibliothèque Meshy, allégé (4 500 triangles), squelette de quadrupède posé à part,
// deux animations : « marche » (allure diagonale) et « broute » (le cou descend vers l'herbe).
// Sans le fichier, les cabris restent comme avant (forme fixe glissée sur le sol).
const CABA={buf:null,pool:[],att:false,h:1.68,fac:{},t0:performance.now()};
function cabCharger(){if(CABA.att)return;CABA.att=true;meshyB64('ani_cabri').then(t=>{const b=atob(t.trim()),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);CABA.buf=u.buffer}).catch(()=>{CABA.buf=false})}
function cabNouveau(){const o={pret:false,g:null};new THREE.GLTFLoader().parse(CABA.buf.slice(0),'',g=>{const r=g.scene;r.traverse(m=>{if(m.isMesh){m.frustumCulled=false;m.castShadow=false}});
  const box=new THREE.Box3().setFromObject(r);CABA.h=box.max.y-box.min.y||CABA.h;const w=new THREE.Group();r.rotation.y=Math.PI/2;r.position.y=-box.min.y;w.add(r);w.visible=false;scene.add(w);
  const mx=new THREE.AnimationMixer(r),A={};g.animations.forEach(c=>A[c.name]=mx.clipAction(c));if(A.marche)A.marche.play();if(A.broute){A.broute.play();A.broute.setEffectiveWeight(0)}
  // les zones de la robe d'origine : le pelage roux, le blanc (pattes, ventre), le sombre (sabots, yeux, nez) qu'on garde
  let me=null;r.traverse(x=>{if(x.isMesh&&!me)me=x});const ca=me&&me.geometry.attributes.color;let Z=null;
  if(ca){const n=ca.count,z=new Uint8Array(n),L=new Float32Array(n),moy=[0,0,0],nb=[0,0,0];for(let i=0;i<n;i++){const R=ca.getX(i),G=ca.getY(i),B=ca.getZ(i),l=.3*R+.59*G+.11*B,mx=Math.max(R,G,B),sa=mx?(mx-Math.min(R,G,B))/mx:0;
    const k=l<.04?2:(sa<.3&&l>.25?1:0);z[i]=k;L[i]=l;moy[k]+=l;nb[k]++}Z={z,L,moy:moy.map((v,k)=>v/Math.max(1,nb[k])),o:Float32Array.from(ca.array),ca}}
  Object.assign(o,{pret:true,g:w,mx,A,px:null,pz:null,v:0,ph:Math.random()*2,Z,id:null})},()=>{});return o}
// les robes des cabris péi : chaque bête garde la sienne
const ROBES_CABRI=[[0x9a4a1e,null,3],[0x1e1a18,0x1e1a18,2],[0x1e1a18,null,2],[0xe8e2d4,null,2],[0x4a2c1a,0x4a2c1a,2],[0xc08a4a,null,1],[0x7a7470,0xb8b2a8,1]];
function robeDe(L,id){const T=L.reduce((a,r)=>a+r[2],0);let x=rndH(id*3.17+.5)*T;for(const r of L){x-=r[2];if(x<0)return r}return L[0]}
function cabRobe(o,id){const Z=o.Z;if(!Z||o.id===id)return;o.id=id;const R=robeDe(ROBES_CABRI,id),c0=new THREE.Color(R[0]).convertSRGBToLinear(),c1=R[1]!=null?new THREE.Color(R[1]).convertSRGBToLinear():null,a=Z.ca.array;
 for(let i=0;i<Z.z.length;i++){const k=Z.z[i],c=k===0?c0:k===1?c1:null;if(!c){a[i*Z.ca.itemSize]=Z.o[i*Z.ca.itemSize];a[i*Z.ca.itemSize+1]=Z.o[i*Z.ca.itemSize+1];a[i*Z.ca.itemSize+2]=Z.o[i*Z.ca.itemSize+2];continue}
  const f=Math.min(1.6,Z.L[i]/(Z.moy[k]||1));a[i*Z.ca.itemSize]=c.r*f;a[i*Z.ca.itemSize+1]=c.g*f;a[i*Z.ca.itemSize+2]=c.b*f}Z.ca.needsUpdate=true}
// un nom stable pour chaque bête : la tuile où elle vit, et son rang sur cette tuile
function animIds(m){const ids=[],rg={},M=new THREE.Matrix4(),P=new THREE.Vector3();for(let i=0;i<m.count;i++){m.getMatrixAt(i,M);P.setFromMatrixPosition(M);const t=tileAt(P),ti=t?t.i:0;rg[ti]=(rg[ti]||0)+1;ids.push(ti*11+rg[ti])}return ids}
// hauteur de l'ancien cabri à l'écran, pour que le nouveau ait la même taille
function cabFac(m){const g=m.geometry;if(CABA.fac[g.uuid])return CABA.fac[g.uuid];g.computeBoundingBox();const h=g.boundingBox.max.y-g.boundingBox.min.y||.5;return CABA.fac[g.uuid]=h/CABA.h}
{const vi=vie;let tp=performance.now();vie=function(k){vi.apply(this,arguments);const m=VIE.vCabri;if(!m)return;if(CABA.buf===null){cabCharger();return}if(!CABA.buf)return;
 const now=performance.now(),dt=Math.min(.1,(now-tp)/1000),fige=!!window.PAUSEJ;tp=now;const n=Math.min(m.count,24),M=new THREE.Matrix4(),P=new THREE.Vector3(),Q=new THREE.Quaternion(),Sc=new THREE.Vector3(),E=new THREE.Euler();
 while(CABA.pool.length<n)CABA.pool.push(cabNouveau());
 // tant qu'un cabri animé n'est pas prêt, on garde l'ancien pour ne rien faire disparaître
 if(CABA.pool.slice(0,n).some(o=>!o.pret))return;
 const f=cabFac(m),ids=animIds(m);
 CABA.pool.forEach((o,i)=>{if(i>=n){o.g.visible=false;o.px=null;return}m.getMatrixAt(i,M);M.decompose(P,Q,Sc);E.setFromQuaternion(Q,'YXZ');
  cabRobe(o,ids[i]);o.g.visible=true;o.g.position.copy(P);o.g.rotation.set(0,E.y,0);o.g.scale.setScalar(Sc.x*f);
  // vitesse au sol : à l'arrêt il broute, en marche les pattes suivent le pas
  const d=o.px==null?0:Math.hypot(P.x-o.px,P.z-o.pz)/Math.max(dt,1e-3);o.px=P.x;o.pz=P.z;o.v+=(d-o.v)*Math.min(1,dt*4);
  const pas=Sc.x*f*CABA.h*.9,mar=Math.min(1,o.v/(pas*.4+1e-4));if(o.A.marche){o.A.marche.setEffectiveWeight(mar);o.A.marche.timeScale=Math.max(.3,Math.min(2,o.v/(pas+1e-4)))}if(o.A.broute)o.A.broute.setEffectiveWeight(1-mar);
  if(!fige)o.mx.update(dt)});
 m.count=0}}
