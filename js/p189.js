// ===== p189 : le générateur de mouvement « à intention » =====
// Un coup n'est plus un trajet de bras : c'est une VOLONTÉ (où frapper, selon le coup et la garde de l'autre),
// une PRÉPARATION et une EXÉCUTION (le mouvement capté, tordu pour atteindre exactement le point visé, le buste qui s'engage),
// et une CONSÉQUENCE chez celui qui reçoit (la tête part en arrière, le ventre se plie, la jambe cède), selon l'endroit et la force.
// Pour chaque coup on imagine plusieurs prises, on les note (portée, équilibre), on garde la meilleure.
const INT189={
 zones:{p1:{tete:.8,ventre:.2},p2:{tete:.6,ventre:.4},p3:{tete:.7,ventre:.3},k1:{jambe:.85,ventre:.15},k2:{ventre:.7,tete:.15,jambe:.15},k3:{tete:.9,ventre:.1},ka:{tete:.6,ventre:.4},bal:{jambe:1},ret:{tete:.6,ventre:.4},up:{tete:1}},
 os:{tete:'Head',ventre:'Spine01',jambe:'Leg'}};
function os189(o){if(o.b189)return o.b189;const m={};o.g.scene.traverse(b=>{if(b.isBone&&!m[b.name])m[b.name]=b});return o.b189=m}
const V189=()=>new THREE.Vector3(),Q189=()=>new THREE.Quaternion();
function wp189(b){return b.getWorldPosition(V189())}
// tourner un os dans le repère du monde (et ses enfants avec lui)
function tourne189(b,q){if(!b||!b.parent||![q.x,q.y,q.z,q.w].every(isFinite))return;const wq=b.getWorldQuaternion(Q189()),pq=b.parent.getWorldQuaternion(Q189()).invert(),nq=pq.multiply(q).multiply(wq).normalize();if(![nq.x,nq.y,nq.z,nq.w].every(isFinite))return;b.quaternion.copy(nq);b.updateMatrixWorld(true)}
function aligne189(b,de,vers,w){if(!(de.lengthSq()>1e-9)||!(vers.lengthSq()>1e-9))return;const q=Q189().setFromUnitVectors(de.clone().normalize(),vers.clone().normalize());if(w<1)q.slerp(Q189(),1-w);tourne189(b,q)}
// IK à deux os : l'épaule (ou la hanche) et le coude (ou le genou) se plient pour que le poing (ou le pied) arrive au point visé
function ik189(U,L,E,T,w){const pU=wp189(U),pL=wp189(L),pE=wp189(E),lu=pU.distanceTo(pL),ll=pL.distanceTo(pE);if(lu<1e-6||ll<1e-6)return 0;
 const v=T.clone().sub(pU);let d=v.length();const dmax=(lu+ll)*.995,dmin=Math.abs(lu-ll)+1e-3;const hors=Math.max(0,d-dmax);d=Math.min(dmax,Math.max(dmin,d));const dir=v.normalize();
 const Tc0=pU.clone().add(dir.clone().multiplyScalar(d)),Dv=Tc0.clone().sub(pE),lim=.3*(lu+ll);if(Dv.length()>lim)Dv.setLength(lim);const Tc=pE.clone().add(Dv),Tt=pE.clone().lerp(Tc,w),dt=Math.min(dmax,Math.max(dmin,Tt.distanceTo(pU))),dT=Tt.clone().sub(pU).normalize();
 let n=pL.clone().sub(pU);n.sub(dT.clone().multiplyScalar(n.dot(dT)));if(n.lengthSq()<1e-8)n=new THREE.Vector3(0,1,0).cross(dT).cross(dT).negate();n.normalize();
 const ca=Math.min(1,Math.max(-1,(lu*lu+dt*dt-ll*ll)/(2*lu*dt))),a=Math.acos(ca),nL=pU.clone().add(dT.clone().multiplyScalar(Math.cos(a)*lu)).add(n.multiplyScalar(Math.sin(a)*lu));
 aligne189(U,pL.clone().sub(pU),nL.clone().sub(pU),1);const pL2=wp189(L),pE2=wp189(E);aligne189(L,pE2.clone().sub(pL2),Tt.clone().sub(pL2),1);return hors/(lu+ll)}
const CH189={LeftHand:['LeftArm','LeftForeArm','LeftHand'],RightHand:['RightArm','RightForeArm','RightHand'],LeftToeBase:['LeftUpLeg','LeftLeg','LeftFoot'],RightToeBase:['RightUpLeg','RightLeg','RightFoot']};
function cible189(o2,c2,zone,cote){const b=os189(o2);if(zone==='jambe'){const L=b.LeftLeg,R=b.RightLeg;if(!L||!R)return null;const pl=wp189(L),pr=wp189(R);return (cote>0?(pl.x<pr.x?pl:pr):(pl.x>pr.x?pl:pr))}const n=INT189.os[zone];return b[n]?wp189(b[n]):null}
// la volonté : plusieurs intentions tirées au sort selon le coup et la garde de l'autre, notées sur la portée et l'équilibre ; on garde la meilleure
function choix189(c,o,c2,o2,k,m){const P={...(INT189.zones[k]||{tete:1})};if(c2.garde){if(P.ventre)P.ventre*=1.8;if(P.jambe)P.jambe*=1.4}if(c2.cr){P.tete=(P.tete||0)*.5;P.ventre=(P.ventre||0)+.3}
 const ch=CH189[m.eff];const b=os189(o);const rac=ch&&b[ch[0]]?wp189(b[ch[0]]):null;const L=ch&&b[ch[0]]&&b[ch[1]]&&b[ch[2]]?wp189(b[ch[0]]).distanceTo(wp189(b[ch[1]]))+wp189(b[ch[1]]).distanceTo(wp189(b[ch[2]])):1;
 const tire=()=>{let s=0;for(const z in P)s+=P[z];let r=Math.random()*s;for(const z in P){r-=P[z];if(r<=0)return z}return Object.keys(P)[0]};let best=null;
 for(let i=0;i<4;i++){const z=tire(),T=cible189(o2,c2,z,c.s);if(!T)continue;const j=new THREE.Vector3((Math.random()-.5)*.08*L,(Math.random()-.5)*.12*L,(Math.random()-.5)*.05*L);T.add(j);
  let sc=0;if(rac){const d=rac.distanceTo(T)/L;sc+=d>1?(d-1)*4:Math.abs(d-.85);if(/Toe/.test(m.eff)&&z==='tete'&&d<.55)sc+=1}sc-=Math.log(P[z]+1e-3)*.15;if(!best||sc<best.sc)best={z,T,j,sc}}
 return best}
function int189(c,o,c2,o2,dt,G){try{if(!o.mx188||!o.g||!o2.g)return;if(o.mx188.touche)o.mx188.touche=null;const b=os189(o);
 // --- l'attaquant ---
 const k=c.act&&(c.y>0&&/^k/.test(c.act)&&o.mx188.ka?'ka':c.act),m=k&&o.mx188[k];
 if(m&&m.eff&&!G.fini){const cl=o.clips.find(x=>x.name===m.nom),ac=cl&&o.mx.existingAction(cl);
  if(ac){if(c.i189!==c.nA){c.i189=c.nA;c.v189=choix189(c,o,c2,o2,k,m);c.z189=c.v189&&c.v189.z}
   const t=ac.time,pk=m.pk,D=m.d,sm=x=>{x=Math.min(1,Math.max(0,x));return x*x*(3-2*x)};const w=t<pk?sm((t-pk*.3)/(pk*.7)):sm(1-(t-pk)/Math.max(.05,(D-pk)*.8));
   if(c.v189&&w>.01){const T=cible189(o2,c2,c.v189.z,c.s);if(T){T.add(c.v189.j);
     // le buste s'engage vers la cible un peu avant le bras (la chaîne : hanche, épaule, bras)
     const sp=b.Spine,hp=b.Hips;if(sp&&hp){const up=wp189(sp).sub(wp189(hp)),vt=T.clone().sub(wp189(hp));aligne189(sp,up,up.clone().normalize().add(vt.normalize().multiplyScalar(.18)),sm((t-pk*.15)/(pk*.6))*(t<pk?1:w))}
     const ch=CH189[m.eff];if(ch&&b[ch[0]]&&b[ch[1]]&&b[ch[2]])ik189(b[ch[0]],b[ch[1]],b[ch[2]],T,w*.92)}}}}
 // --- celui qui reçoit : la conséquence, selon l'endroit et la force ---
 if(c.touche>0&&!c.r189p){const z=c2.z189||'tete',d=atkD189(c2);c.r189={z,t0:performance.now(),A:Math.min(1.3,Math.max(.35,d/12))*(c.garde?.35:1)*(c.cr&&z==='tete'?.6:1),s:c2.s}}c.r189p=c.touche>0;
 const r=c.r189;if(r){const t=(performance.now()-r.t0)/1000,tau=z=>z==='ventre'?.16:.12,f=(t/tau(r.z))*Math.exp(1-t/tau(r.z))*r.A;if(t>1.2){c.r189=null}else if(f>.005){
   const dir=new THREE.Vector3(r.s,0,0),ax=new THREE.Vector3(0,1,0).cross(dir).normalize(),R=a=>Q189().setFromAxisAngle(ax,a);
   if(r.z==='tete'){if(b.Spine)tourne189(b.Spine,R(.15*f));if(b.neck)tourne189(b.neck,R(.3*f));if(b.Head)tourne189(b.Head,R(.55*f))}
   else if(r.z==='ventre'){if(b.Hips)tourne189(b.Hips,R(.08*f));if(b.Spine01)tourne189(b.Spine01,R(-.3*f));if(b.Spine)tourne189(b.Spine,R(-.35*f));if(b.Head)tourne189(b.Head,R(-.15*f))}
   else{if(b.Hips)tourne189(b.Hips,R(.12*f));const Ls=['LeftUpLeg','RightUpLeg'].map(n=>b[n]).filter(Boolean);if(Ls.length===2){const x0=wp189(Ls[0]).x,x1=wp189(Ls[1]).x,av=(x0-x1)*-r.s>0?Ls[0]:Ls[1];tourne189(av,R(.35*f))}if(b.Spine)tourne189(b.Spine,R(-.12*f))}}}
}catch(e){}}
function atkD189(c){try{return (typeof c.dg189==='number'?c.dg189:8)}catch(e){return 8}}
// ===== Le même générateur dans la vue incarnée : le bras va chercher la cible (bête, milicien, marron) ; celui qu'on touche réagit, balle comprise =====
function vpOs189(o){if(o.b189)return o.b189;const m={};if(o.root)o.root.traverse(b=>{if(b.isBone&&!m[b.name])m[b.name]=b});return o.b189=m}
const VPGESTE189={baton_coup:.8,sabre:.7,couteau:.8,fusil:.8};
function vpInt189(o,dt){if(!o||!o.root)return;const b=vpOs189(o);if(!b.Hips)return;o.root.updateMatrixWorld(true);const now=performance.now();
 // le coup : pendant le geste, le bras armé est tiré vers la cible (le fusil, lui, vise la poitrine)
 const D=VPGESTE189[o.clip];if(D&&o.cib189&&o.t189){const p=(now-o.t189)/1000/D;if(p>=0&&p<1){const c=o.cib189,cr=c.root;if(cr){cr.updateMatrixWorld(true);const T=new THREE.Vector3();cr.getWorldPosition(T);T.y+=c.p||c===VP.chef?1.25:.45;
    const w=Math.sin(Math.PI*Math.min(1,p*1.15))*(o.clip==='fusil'?.6:.85);const ch=o.clip==='fusil'?CH189.LeftHand:CH189.RightHand;
    if(b.Spine&&b.Hips){const up=wp189(b.Spine).sub(wp189(b.Hips)),vt=T.clone().sub(wp189(b.Hips));aligne189(b.Spine,up,up.clone().normalize().add(vt.normalize().multiplyScalar(.15)),w)}
    if(b[ch[0]]&&b[ch[1]]&&b[ch[2]])ik189(b[ch[0]],b[ch[1]],b[ch[2]],T,w)}}}
 // la conséquence : un coup ou une balle fait partir le buste et la tête à l'opposé, puis le corps revient
 const r=o.hit189;if(r&&o.mx&&o.mx._actions&&o.mx._actions.some(a=>a.isRunning())){const t=(now-r.t0)/1000;if(t>1.1)o.hit189=null;else{const f=(t/.12)*Math.exp(1-t/.12),L=Math.hypot(r.dx,r.dz)||1,dir=new THREE.Vector3(r.dx/L,0,r.dz/L),ax=new THREE.Vector3(0,1,0).cross(dir).normalize(),R=a=>Q189().setFromAxisAngle(ax,a);
   if(b.Spine)tourne189(b.Spine,R(.15*f));if(b.neck)tourne189(b.neck,R(.12*f));if(b.Head)tourne189(b.Head,R(.18*f))}}}
