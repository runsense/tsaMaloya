// ===== p29 : sur la carte, les gens vivent — repos quand ils ne marchent pas, et des habitants dans les lieux où l'on zoome =====

// ---------- 1. on ne marche plus sur place : immobile, la figurine se repose, guette ou parle ----------
{const mp=mfPoser;mfPoser=function(cle,n,x,y,z,ry,clip){const f=MF.L[cle],now=performance.now();if(clip==='marche'&&f){const d=f.lp?Math.hypot(x-f.lp[0],z-f.lp[1]):1;if(d>.0015){f.mv=now}f.lp=[x,z];if(now-(f.mv||0)>350){const I=['repos_debout','garde','repos_debout','assis'];clip=I[[...cle].reduce((s,c)=>s+c.charCodeAt(0),0)%I.length]}}else if(f)f.lp=[x,z];return mp(cle,n,x,y,z,ry,clip)}}

// ---------- 2. en zoomant sur un lieu : pas d'arbre ni de rocher dans les maisons ----------
function lieuBatis(t){const P=[],o=S.t[t.i]||{};if(o.b)P.push([t.x,t.z,1.1]);(o.vl||[]).forEach(v=>P.push([t.x+v.dx,t.z+v.dz,.55]));
 ['hCol','eglise','case','colon','ajoupa','enclos','bois'].forEach(k=>{const m=MOD[k];if(!m)return;const M=new THREE.Matrix4(),V=new THREE.Vector3();for(let i=0;i<m.count;i++){m.getMatrixAt(i,M);V.setFromMatrixPosition(M);if(Math.hypot(V.x-t.x,V.z-t.z)<3.6)P.push([V.x,V.z,k==='eglise'||k==='hCol'?.6:.45])}});return P}
{const rl=remplirLieu;remplirLieu=function(){const t=lieu,av={};const K0=['arbre','sapin','tamarin','fanjan','rocher','herbe','vacoa','latanier','palmiste','branle','galet'];K0.forEach(k=>{if(MOD[k])av[k]=MOD[k].userData.n});
 const r=rl.apply(this,arguments);if(!t)return r;const B=lieuBatis(t);if(!B.length)return r;const M=new THREE.Matrix4(),V=new THREE.Vector3(),Z=new THREE.Matrix4().makeScale(0,0,0);
 K0.forEach(k=>{const m=MOD[k];if(!m)return;for(let i=av[k]||0;i<m.userData.n;i++){m.getMatrixAt(i,M);V.setFromMatrixPosition(M);if(B.some(([x,z,r])=>Math.hypot(V.x-x,V.z-z)<r)){m.setMatrixAt(i,Z)}}m.instanceMatrix.needsUpdate=true});return r}}

// ---------- 3. des habitants qui vont et viennent entre les maisons ----------
const LG={t:null,L:[]};
// les habitants d'un lieu quitté sont retirés et libérés : sinon chaque zoom en ajoute en mémoire
function lgLibere(){(LG.L||[]).forEach(g=>{const f=MF.L[g.cle];if(f&&f.o){scene.remove(f.o);f.o.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(m.map)m.map.dispose();m.dispose()})})}delete MF.L[g.cle]});LG.L=[]}
function lieuGens(t){const o=S.t[t.i]||{},B=lieuBatis(t);if(!B.length&&!o.b)return [];const C=S.voieC||/Saint|ville|bourg/i.test(lieuDe(t)||'')||(o.b&&o.b!=='camp');
 // les gens du camp s'ils habitent là ; sinon des habitants du lieu
 let P=(S.pp||[]).filter(p=>campDe(p)===t.i&&!enGrp(p)).slice(0,10).map(p=>mfModeleDe(p));
 if(!P.length)P=C?['p7_colon','colone','servante','homme_chemise','femme_travail','enfant_colon','commandeur','jeune_colon']:['p1a_chasseur','femme_sagaie','jeune_pagne','femme_travail','vieux','p6_enfant'];
 const pts=B.length?B:[[t.x,t.z,1]];return P.map((n,i)=>{const b=pts[i%pts.length];return {cle:'L'+t.i+'_'+i,n,x:b[0]+(Math.random()-.5)*.8,z:b[1]+(Math.random()-.5)*.8,tx:0,tz:0,att:Math.random()*3,pts}})}
{const b0=bat;bat=function(k){b0(k);try{if(!S||typeof lieu==='undefined')return;if(!lieu){if(LG.t){lgLibere();LG.t=null}return}
 if(LG.t!==lieu){lgLibere();LG.t=lieu;LG.L=lieuGens(lieu);LG.tp=performance.now()}const now=performance.now(),dt=Math.min(.1,(now-LG.tp)/1000);LG.tp=now;
 if(window.PAUSEJ)return;LG.L.forEach(g=>{if(g.att>0){g.att-=dt;if(g.att<=0){const b=g.pts[Math.floor(Math.random()*g.pts.length)];g.tx=b[0]+(Math.random()-.5)*1.2;g.tz=b[1]+(Math.random()-.5)*1.2}}
  const dx=g.tx-g.x,dz=g.tz-g.z,d=Math.hypot(dx,dz);let clip='marche';if(g.att>0||d<.03){clip='repos_debout';if(g.att<=0)g.att=1.5+Math.random()*4}else{const v=.32*dt;g.x+=dx/d*Math.min(v,d);g.z+=dz/d*Math.min(v,d)}
  const ry=d>.03?Math.atan2(dx,dz):(g.ry||0);g.ry=ry;mfPoser(g.cle,g.n,g.x,alt(g.x,g.z)*VX+.02,g.z,ry,clip);const f=MF.L[g.cle];if(f){f.vu=MF.t;if(f.mx&&f.o)f.mx.update(dt)}});
 // les figurines du lieu se dessinent à l'échelle du zoom : un peu plus petites que les maisons
 }catch(e){}}}

// ---------- 4. en automatique, une chasse que personne ne joue se termine seule : le conte la raconte ----------
{let act=performance.now(),fin=0;['keydown','pointerdown','pointermove','wheel'].forEach(ev=>addEventListener(ev,()=>{act=performance.now()},true));
 setInterval(()=>{const F0=window.__fps&&__fps.F;if(!F0){fin=0;return}if(!S||!modeHist()||typeof autoD!=='function'||!autoD())return;const idle=performance.now()-act;
  if(!F0.fin&&idle>15000){const n=1+Math.floor(Math.random()*3);S.vivres=(S.vivres||0)+n;log('Le conte raconte la chasse : '+n+' gibier'+(n>1?'s':'')+' rapporté'+(n>1?'s':'')+'.');__fps.fpsQuitter();fin=performance.now()}
  else if(F0.fin&&fin&&performance.now()-fin>4000){fin=0;__fps.fpsQuitter()}},1000)}
