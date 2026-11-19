// ===== p155 : les petits jeux 3D à la hauteur de la vue personnage — la chasse et l'embuscade à la première personne (f.js) =====
// Mêmes arbres (arbre low-poly, tamarins des Hauts), cabris Meshy animés (et cerfs après 1755), miliciens et cueilleuses animés au lieu des figurines figées,
// et les oiseaux du ciel (bande + papangue) de la vue personnage.
const FJ155={F:null};
function fjPerso155(c,nom,s){if(!c||!c.m)return;p3Charge(nom);const F0=F;const go=()=>{if(F!==F0||!F)return;if(!P3.buf[nom]){if(P3.ok[nom]===0)return;setTimeout(go,300);return}
 p3Instance(nom).then(I=>{if(F!==F0||!F||c.mort)return;const r=I.g.scene,w=new THREE.Group();w.add(r);w.position.copy(c.m.position);w.rotation.copy(c.m.rotation);w.visible=c.m.visible;F.sc.remove(c.m);F.sc.add(w);
  c.m=w;c.mx=I.mx;c.anim=I.g.animations;c.root=r;c.clip='';c.px=c.x;c.pz=c.z;vpClipE(c,'repos_debout')}).catch(()=>{})};go()}
function fjCabris155(){const F0=F;if(!F||!F.an||typeof CABA==='undefined')return;if(!CABA.buf){if(CABA.buf!==false&&typeof cabCharger==='function')cabCharger();setTimeout(()=>{if(F===F0)fjCabris155()},800);return}
 F.an.forEach(a=>{if(a.ta)return;new THREE.GLTFLoader().parse(CABA.buf.slice(0),'',g=>{if(F!==F0||!F)return;const r=g.scene;r.traverse(m=>{if(m.isMesh)m.frustumCulled=false});const b=new THREE.Box3().setFromObject(r),h=(b.max.y-b.min.y)||1.68;
  const w=new THREE.Group();r.rotation.y=Math.PI/2;r.position.y=-b.min.y;w.add(r);w.scale.setScalar(.85/h*(a.cerf?1.45:1));if(a.cerf){const f=new THREE.Color(.82,.56,.34);r.traverse(m=>{if(m.isMesh&&m.material){m.material=m.material.clone();if(m.material.color)m.material.color.multiply(f)}})}
  const mx=new THREE.AnimationMixer(r),A={};g.animations.forEach(c=>{A[c.name]=mx.clipAction(c);A[c.name].play();A[c.name].setEffectiveWeight(0)});if(A.marche)A.marche.setEffectiveWeight(1);
  w.position.copy(a.m.position);w.rotation.copy(a.m.rotation);F.sc.remove(a.m);F.sc.add(w);a.m=w;a.mx=mx;a.A=A;a.px=a.x;a.pz=a.z},()=>{})})}
(function fj155(){requestAnimationFrame(fj155);try{if(typeof F==='undefined'||!F||!F.sc){FJ155.F=null;return}
 if(FJ155.F!==F){FJ155.F=F;FJ155.t=performance.now();const F0=F;
  if(F.mode==='chasse'&&S&&S.year>=1755&&F.t&&(F.t.forest||F.t.alt>700)){let k=0;F.an.forEach(a=>{if(!a.ta&&k<2){a.cerf=1;k++}})}
  setTimeout(()=>{if(F!==F0)return;try{vpArbres153(F,()=>F===F0)}catch(e){}fjCabris155();(F.en||[]).forEach(e=>fjPerso155(e,'milicien'));(F.al||[]).forEach((e,i)=>fjPerso155(e,i%2?'femme_sagaie':'femme_travail'))},300)}
 const now=performance.now(),dt=Math.min(.1,(now-(FJ155.t||now))/1000);FJ155.t=now;if(F.pause)return;
 (F.an||[]).forEach(a=>{if(!a.mx)return;if(a.mort){a.mx.timeScale=0;return}const v=Math.hypot(a.x-a.px,a.z-a.pz)/Math.max(.001,dt);a.px=a.x;a.pz=a.z;if(a.A.broute)a.A.broute.setEffectiveWeight(v<.3?1:0);if(a.A.marche)a.A.marche.setEffectiveWeight(v<.3?0:1);a.mx.timeScale=v>4?1.8:1;a.mx.update(dt)});
 [...(F.en||[]),...(F.al||[])].forEach(c=>{if(!c.mx)return;if(c.mort){if(c.clip!=='chute_mort'){vpClipE(c,'chute_mort');c.m.rotation.z=0;c.m.position.y+=.2}c.mx.update(dt);return}
  const v=Math.hypot(c.x-c.px,c.z-c.pz)/Math.max(.001,dt);c.px=c.x;c.pz=c.z;vpClipE(c,v>.3?'marche':(c.vu?'garde':'repos_debout'));c.mx.update(dt)})}catch(e){}})();
{const t0=fpsTue;fpsTue=function(c,k){const r=t0.apply(this,arguments);try{if(c&&c.cerf&&F&&F.mode==='chasse'){F.viv+=3;fpsMsg('Un cerf à terre : +6 vivres. Gros gibier, venu de Java en 1755.')}}catch(e){}return r}}
