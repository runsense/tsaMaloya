
// ===== Sur la carte, des personnages 3D à la place des formes simples : groupes en mission, détachements, groupes du mode Jeu =====
// chaque silhouette garde sa place calculée par le jeu ; on pose dessus un modèle animé, à une taille lisible de loin
const MF={L:{},t:0,M:new THREE.Matrix4(),P:new THREE.Vector3(),Q:new THREE.Quaternion(),Sc:new THREE.Vector3(),H:.62};
function mfObtenir(cle,n){let f=MF.L[cle];if(f&&f.n===n)return f.o?f:null;if(f&&f.o)scene.remove(f.o);f=MF.L[cle]={n,o:null,mx:null,clip:'',vu:0};
 if(typeof P3==='undefined'||typeof p3Charge!=='function')return null;p3Charge(n);const at=()=>{if(MF.L[cle]!==f)return;if(!P3.buf[n]){if(P3.ok[n]===0)return;setTimeout(at,400);return}
  p3Instance(n).then(I=>{if(MF.L[cle]!==f)return;const o=new THREE.Group(),g=I.g.scene;g.scale.setScalar(MF.H/1.75);g.position.y=0;o.add(g);o.userData.anim=I.g.animations;f.o=o;f.mx=I.mx;scene.add(o)}).catch(()=>{})};at();return null}
function mfJouer(f,clip){if(!f||!f.mx||f.clip===clip)return;const A=f.o.userData.anim||[],a=A.find(x=>x.name===clip)||A.find(x=>x.name==='marche');if(!a)return;f.mx.stopAllAction();f.mx.clipAction(a).play();f.clip=clip}
function mfPoser(cle,n,x,y,z,ry,clip){const f=mfObtenir(cle,n);if(!f)return;f.o.position.set(x,y,z);f.o.rotation.y=ry;f.o.visible=true;f.vu=MF.t;mfJouer(f,clip)}
function mfDepuis(inst,i,cle,n,clip,dx){inst.getMatrixAt(i,MF.M);MF.M.decompose(MF.P,MF.Q,MF.Sc);const e=new THREE.Euler().setFromQuaternion(MF.Q);mfPoser(cle,n,MF.P.x+(dx||0),MF.P.y,MF.P.z,e.y,clip)}
function mfModeleDe(p){try{return p3Modele(p)}catch(e){return 'p1a_chasseur'}}
{const b0=bat;bat=function(k){b0(k);if(!S||typeof scene==='undefined')return;MF.t++;
 try{
  // en mode Histoire : les groupes en route (le jeu les dessine avec « grp »)
  if(typeof grp!=='undefined'&&grp){const nm=S.voieC?'homme_chemise':'p1a_chasseur';for(let i=0;i<grp.count;i++){mfDepuis(grp,i,'e'+i,nm,'marche');mfDepuis(grp,i,'e'+i+'b',S.voieC?'femme_travail':'femme_sagaie','marche',.22)}grp.visible=false}
  // les détachements de chasseurs de noirs
  if(typeof chas!=='undefined'&&chas){for(let i=0;i<chas.count;i++)mfDepuis(chas,i,'d'+i,'milicien','milicien');chas.visible=false}
  // en mode Jeu : chaque groupe dehors, ses membres eux-mêmes (trois au plus)
  if(grpOn&&grpOn()&&!modeHist()){(S.grp||[]).forEach((g,gi)=>{if(!g.exp)return;const t=T[g.pos];if(!t)return;const M=grpMembres(g).slice(0,3),et=g.exp.etat,but=g.exp.but,clip=et==='sur place'?(but==='chasse'?'chasse_traque':but==='cueil'?'cueillir':'guetteur'):'marche';
   M.forEach((p,j)=>{const a=j*2.1+gi,x=t.x+Math.cos(a)*.35,z=t.z+Math.sin(a)*.35;mfPoser('g'+gi+'_'+j,mfModeleDe(p),x,alt(x,z)*VX+.02,z,a+Math.PI,clip)})});
   (GRPM||[]).forEach(m=>{if(m.isMesh&&m.geometry&&!/Ring/.test(m.geometry.type))m.visible=false})}
 }catch(e){console.warn('figures',e.message)}
 // ce qui n'a pas servi cette image disparaît
 for(const c in MF.L){const f=MF.L[c];if(f.o&&f.vu!==MF.t)f.o.visible=false}
 const now=performance.now(),dt=Math.min(.1,(now-(MF.tp||now))/1000);MF.tp=now;for(const c in MF.L){const f=MF.L[c];if(f.mx&&f.o&&f.o.visible)f.mx.update(dt)}}}
