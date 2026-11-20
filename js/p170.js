
// ===== p170 : les arbres ne sont plus tous pareils — ils penchent avec le vent des vallées et la pente ; les grands tombent sur les pentes raides, surtout après les cyclones ; du bois mort jonche les forêts des Hauts =====
// Le vent suit les vallées : dans une ravine il descend ou remonte le long de l'eau, donc les arbres penchent dans l'axe de la pente ;
// sur les crêtes et la côte au vent, l'alizé vient de l'est et les couche vers l'ouest.
const ARB170=new Set(['arbre','sapin','tamarin','palmiste','latanier','filao','tamarinier','benjoin','bois_chandelle','vacoa','fanjan','fanjanEx','fanjanGl','fanjanCo']);
{const cy=cyclone;cyclone=function(){try{if(S){S.cyc170=S.cyc170||[];S.cyc170.push(S.year||0);if(S.cyc170.length>20)S.cyc170.shift()}}catch(e){}return cy.apply(this,arguments)}}
function cycRec170(){try{return (S.cyc170||[]).filter(y=>(S.year||0)-y<=12).length}catch(e){return 0}}
function pente170(x,z){const e=.06,gx=(alt(x+e,z)-alt(x-e,z))*VX/(2*e),gz=(alt(x,z+e)-alt(x,z-e))*VX/(2*e),g=Math.hypot(gx,gz);return {dx:g?-gx/g:0,dz:g?-gz/g:0,a:Math.atan(g)}}
const Q170={q:new THREE.Quaternion(),l:new THREE.Quaternion(),ax:new THREE.Vector3(),Y:new THREE.Vector3(0,1,0),P:new THREE.Vector3(),S:new THREE.Vector3()};
// k : nom du modèle ; renvoie la matrice et un facteur de teinte (bois mort plus gris)
function arbMat170(k,x,y,z,ry,s,M){const h=q=>rndH(x*91.7+z*37.3+q),P=pente170(x,z),fougere=/^fanjan/.test(k),palme=k==='palmiste'||k==='latanier'||k==='vacoa';
 // direction du vent : l'axe de la vallée (la pente) au creux, l'alizé d'est en ouest sur les hauteurs dégagées
 const ouvert=Math.min(1,Math.max(0,(alt(x,z)-600)/1400)),wx=P.dx*(1-ouvert*.5)-ouvert*.5,wz=P.dz*(1-ouvert*.5),wl=Math.hypot(wx,wz)||1;
 let ang=(fougere?.03:.05)+Math.min(fougere?.08:.2,P.a*.35)+h(1)*.07,dx=wx/wl,dz=wz/wl,tombe=0;
 // les grands arbres sur les pentes raides finissent couchés, plus souvent après un cyclone
 const grand=s>1.25&&!fougere&&!palme,pr=(P.a>.45?.05:0)+(P.a>.7?.06:0)+cycRec170()*.035;if(grand&&h(2)<pr){tombe=1;ang=1.45+h(3)*.1;const a2=h(4)*.9-.45;const c=Math.cos(a2),sn=Math.sin(a2);const ndx=P.dx*c-P.dz*sn,ndz=P.dx*sn+P.dz*c;dx=ndx||1;dz=ndz}
 Q170.ax.set(dz,0,-dx).normalize();Q170.l.setFromAxisAngle(Q170.ax,ang);Q170.q.setFromAxisAngle(Q170.Y,ry);Q170.l.multiply(Q170.q);
 // la forme : plus élancé ou plus trapu, jamais deux pareils
 const sy=s*(.82+h(5)*.42),sw=s*(.85+h(6)*.3),sz=s*(.85+h(7)*.3);Q170.S.set(sw,tombe?sy*.9:sy,sz);
 Q170.P.set(x,y-(tombe?.01:0)-Math.sin(ang)*.0,z);M.compose(Q170.P,Q170.l,Q170.S);return tombe}
{const pm=poseM;poseM=function(m,x,y,z,ry,rx,rz,s,col){try{let k=null;for(const q of ARB170)if(MOD[q]===m){k=q;break}
  if(k&&!rx&&!rz){const n=m.userData.n;if(n>=m.userData.max)return;const Mx=new THREE.Matrix4(),tb=arbMat170(k,x,y,z,ry,s,Mx);m.setMatrixAt(n,Mx);if(col){const c=col.clone();if(tb)c.multiplyScalar(.62).lerp(new THREE.Color(.55,.5,.42),.35);m.setColorAt(n,c)}m.userData.n=n+1;return}}catch(e){}return pm.apply(this,arguments)}}
setInterval(()=>{try{if(typeof scene==='undefined'||!lieu)return;scene.children.forEach(G=>{if(!G.isGroup||G.userData.a170)return;const I=G.children.filter(c=>c.isInstancedMesh);if(!I.length||!I.some(c=>[...ARB170].some(k=>MOD[k]&&MOD[k].geometry===c.geometry)))return;G.userData.a170=1;
  const M4=new THREE.Matrix4(),p=new THREE.Vector3(),q=new THREE.Quaternion(),sc=new THREE.Vector3(),e=new THREE.Euler();
  I.forEach(c=>{const k=[...ARB170].find(k=>MOD[k]&&MOD[k].geometry===c.geometry);if(!k)return;for(let i=0;i<c.count;i++){c.getMatrixAt(i,M4);M4.decompose(p,q,sc);if(sc.x===0)continue;e.setFromQuaternion(q);const tb=arbMat170(k,p.x,p.y,p.z,e.y,sc.x,M4);c.setMatrixAt(i,M4);if(tb&&c.instanceColor)c.setColorAt(i,new THREE.Color(.6,.56,.48))}c.instanceMatrix.needsUpdate=true;if(c.instanceColor)c.instanceColor.needsUpdate=true})})}catch(e){}},700);
// le bois mort des forêts des Hauts : troncs couchés, branches cassées, plus nombreux après un cyclone
const BM170={g:null};
function boisMort170(){try{if(BM170.g){scene.remove(BM170.g);BM170.g.traverse(o=>{if(o.geometry)o.geometry.dispose()});BM170.g=null}const t=lieu;if(!t||!S||t.bare)return;
 const L=[t,...(t.nb||[]).map(i=>T[i])].filter(u=>u&&!u.bare&&u.alt>700&&(u.forest||/humide|forêt/i.test(u.biome||''))&&seen(u)&&!(S.t[u.i]||{}).c);if(!L.length)return;
 const n=Math.round(5+cycRec170()*5),tronc=new THREE.CylinderGeometry(.007,.01,1,6).rotateZ(Math.PI/2),br=new THREE.CylinderGeometry(.004,.007,1,4).rotateZ(Math.PI/2);
 const mat=new THREE.MeshLambertMaterial({color:0xffffff}),IT=new THREE.InstancedMesh(tronc,mat,n*L.length),IB=new THREE.InstancedMesh(br,mat,n*L.length*2);let a=0,b=0;
 const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),E=new THREE.Euler(),P=new THREE.Vector3(),Sc=new THREE.Vector3(),C=new THREE.Color();
 L.forEach(u=>{for(let k=0;k<n;k++){const h=q=>rndH(u.i*13.1+k*7.7+q),r=Math.sqrt(h(1))*1.5,an=h(2)*6.283,x=u.x+Math.cos(an)*r,z=u.z+Math.sin(an)*r;if(Math.hypot(x-t.x,z-t.z)>3.3&&u===t)continue;const hh=alt(x,z);if(hh<5)continue;
  const pe=pente170(x,z),dir=Math.atan2(pe.dz,pe.dx)+(h(3)-.5)*1.4,L0=.05+h(4)*.14;E.set(0,-dir,(h(5)-.5)*.15);Q.setFromEuler(E);P.set(x,hh*VX+.02,z);Sc.set(L0,1+h(6)*.6,1+h(6)*.6);M.compose(P,Q,Sc);IT.setMatrixAt(a,M);const g=.17+h(7)*.1,mo=h(22)<.5;C.setRGB(g*(mo?.85:1.2),g*(mo?1.15:1),g*(mo?.7:.8));IT.setColorAt(a,C);a++;
  for(let j=0;j<2;j++){if(h(8+j)<.4)continue;E.set((h(10+j)-.5)*.6,-dir+(h(12+j)-.5)*2.2,(h(14+j)-.5)*.3);Q.setFromEuler(E);P.set(x+(h(16+j)-.5)*.15,hh*VX+.03,z+(h(18+j)-.5)*.15);Sc.set(.05+h(20+j)*.1,1,1);M.compose(P,Q,Sc);IB.setMatrixAt(b,M);IB.setColorAt(b,C);b++}}});
 IT.count=a;IB.count=b;const G=new THREE.Group();G.add(IT,IB);G.userData.bm170=1;scene.add(G);BM170.g=G}catch(e){}}
{const rl=remplirLieu;remplirLieu=function(){const r=rl.apply(this,arguments);try{if(BM170.t!==lieu){BM170.t=lieu;boisMort170()}}catch(e){}return r}}
{const fl=fermerLieu;fermerLieu=function(){try{if(BM170.g){scene.remove(BM170.g);BM170.g=null;BM170.t=null}}catch(e){}return fl.apply(this,arguments)}}
setInterval(()=>{try{if(BM170.g)BM170.g.visible=dist<9.5&&!(typeof VP!=='undefined'&&VP)}catch(e){}},200);
