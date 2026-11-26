// ===== p347 : (1) la molette rapproche la caméra jusqu'aux yeux du personnage : tout près, on voit par ses yeux ;
// en reculant, on le revoit de dehors. (2) Des gens dans les rues et dans les champs : passants, soldats, enfants en ville ;
// dans les caféières, les esclaves au travail sous l'œil du commandeur ; au port, des porteurs. =====
function pnj347(I,n,x,z,o){const p={x,z,ang:o.ang||0,root:null,mx:null,anim:null,clip:'',...o};p3Charge(n);const at=()=>{if(INC!==I)return;if(!P3.buf[n]){if(P3.ok[n]===0)return;setTimeout(at,400);return}
 p3Instance(n).then(Q=>{if(INC!==I)return;p.root=Q.g.scene;p.anim=Q.g.animations;p.mx=Q.mx;I.S3.add(p.root);incClip287(p,p.clip0||'marche')}).catch(()=>{})};setTimeout(at,60+Math.random()*900);(I.pnj347||(I.pnj347=[])).push(p);return p}
function peupler347(I){if(!I||I.peuple347)return;I.peuple347=1;if(I.C.ville){if(I.fe346)I.fe346.visible=false;(I.logs346||[]).forEach(t=>t.visible=false)}const P=I.P,N=I.N,an=parseInt(I.C.an)||1750,k=String(I.k),m=k.match(/^epc327_(.+)_(-?\d+)$/),D=m&&typeof DEC336!=='undefined'?((DEC336[m[1]]||{})[m[2]]||[]):[];
 const dir=i=>{const p=P[Math.max(0,i-2)],q=P[Math.min(N-1,i+2)];const dx=q[0]-p[0],dz=q[1]-p[1],L=Math.hypot(dx,dz)||1;return [dx/L,dz/L]};let sd=17;const rn=()=>{sd=(sd*16807)%2147483647;return sd/2147483647};
 // la rue : des passants qui vont et viennent, des gens qui causent, des enfants
 if(I.C.ville){const L=an<1760?['p7_colon','colone','servante','homme_chemise','femme_travail','jeune_colon','milicien','p6_enfant']:['p7_colon','colone','servante','homme_chemise','femme_travail','jeune_colon','enfant_colon','milicien','pretre'];
  for(let q=0;q<16;q++){const i0=Math.floor(8+rn()*(N-20)),s=rn()<.5?1:-1,lat=(1.6+rn()*3)*s,nm=L[q%L.length];const [dx,dz]=dir(i0);
   if(q%4===3){const x=P[i0][0]-dz*lat*1.6,z=P[i0][1]+dx*lat*1.6;pnj347(I,nm,x,z,{mode:'cause',clip0:'repos_debout',ang:rn()*6});pnj347(I,L[(q+3)%L.length],x+.9,z+.4,{mode:'cause',clip0:'repos_debout',ang:rn()*6})}
   else pnj347(I,nm,P[i0][0]-dz*lat,P[i0][1]+dx*lat,{mode:'rue',i:i0,sens:rn()<.5?1:-1,lat,v:1.1+rn()*.5})}}
 // les caféières : les rangs de part et d'autre du chemin, des esclaves qui cueillent, un commandeur
 const rg=I.C.cafe336||(D.includes('cafe')?[.25,1]:null);
 if(rg){const i0=Math.floor(N*rg[0]),i1=Math.min(N-1,Math.floor(N*rg[1])),L=['homme_chemise','femme_travail','jeune_pagne','femme_drapee','femme_travail'];
  for(let q=0;q<14;q++){const i=Math.floor(i0+rn()*(i1-i0)),s=rn()<.5?1:-1,d=(3.2+Math.floor(rn()*3)*2.4+1.2)*s,[dx,dz]=dir(i);pnj347(I,L[q%L.length],P[i][0]-dz*d,P[i][1]+dx*d,{mode:'champ',i,lat:d,clip0:'cueillir_sol',t:rn()*8})}
  for(let q=0;q<2;q++){const i=Math.floor(i0+(q+.5)*(i1-i0)/2),[dx,dz]=dir(i);pnj347(I,'commandeur',P[i][0]-dz*2.2,P[i][1]+dx*2.2,{mode:'garde',clip0:'repos_debout'})}}
 // le port : des porteurs entre le quai et les magasins
 if(D.includes('port')){const i=Math.floor(N*.15),[dx,dz]=dir(i);for(let q=0;q<6;q++)pnj347(I,q%2?'homme_chemise':'jeune_pagne',P[i][0]+dz*(5+q),P[i][1]-dx*(5+q),{mode:'rue',i,sens:q%2?1:-1,lat:-(5+q*.6),v:.9})}}
{const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);try{const I=INC;if(I){I.dist=I.dist||6;setTimeout(()=>{try{if(INC===I)peupler347(I)}catch(e){console.warn('p347',e)}},1200);
 // la molette : de loin jusqu'aux yeux
 if(I.el&&!I.el.dataset.z347){I.el.dataset.z347=1;I.el.addEventListener('wheel',e=>{const J=INC;if(!J||J!==I)return;if(e.target&&e.target.closest&&e.target.closest('#incC,#incCarte,canvas[data-z342]'))return;e.preventDefault();const f=e.deltaY<0?1/1.18:1.18;
  if(J.vueTete){if(e.deltaY>0){J.vueTete=0;J.dist=1.8;incMsg287('Vue de dehors (molette pour rapprocher).')}return}
  J.dist=Math.max(1.2,Math.min(16,(J.dist||6)*f));if(J.dist<=1.25&&e.deltaY<0){J.vueTete=1;incMsg287('Par ses yeux (molette vers vous pour reculer, V pour basculer).')}},{passive:false})}}}catch(e){}return r}}
{const b=incBoucle287;incBoucle287=function(){const r=b.apply(this,arguments);try{const I=INC;if(!I)return r;if(I.h&&I.h.root)I.h.root.visible=!I.vueTete;
 const now=performance.now(),dt=Math.min(.05,(now-(I.t347||now))/1000);I.t347=now;const P=I.P,N=I.N,h=I.hAt;
 for(const p of I.pnj347||[]){if(!p.root)continue;
  if(p.mode==='rue'){const j=Math.max(0,Math.min(N-1,p.i)),q=P[Math.floor(j)],q2=P[Math.min(N-1,Math.floor(j)+1)],dx=q2[0]-q[0],dz=q2[1]-q[1],L=Math.hypot(dx,dz)||1;p.i+=p.sens*p.v*dt/L;if(p.i>N-3||p.i<3)p.sens*=-1;const tx=q[0]-dz/L*p.lat,tz=q[1]+dx/L*p.lat;p.ang=Math.atan2(tx-p.x,tz-p.z);p.x+=(tx-p.x)*Math.min(1,dt*4);p.z+=(tz-p.z)*Math.min(1,dt*4);
   // on s'écarte du héros
   const hd=Math.hypot(I.h.x-p.x,I.h.z-p.z);if(hd<1.3){p.x+=(p.x-I.h.x)/hd*dt*2;p.z+=(p.z-I.h.z)/hd*dt*2}incClip287(p,'marche')}
  else if(p.mode==='champ'){p.t-=dt;if(p.t<0){p.t=4+Math.random()*7;p.mv=Math.random()<.35;if(p.mv){p.i=Math.max(0,Math.min(N-1,p.i+(Math.random()<.5?-2:2)))}}const q=P[Math.floor(p.i)];if(p.mv&&q){const [dx,dz]=[P[Math.min(N-1,Math.floor(p.i)+1)][0]-q[0],P[Math.min(N-1,Math.floor(p.i)+1)][1]-q[1]],L=Math.hypot(dx,dz)||1,tx=q[0]-dz/L*p.lat,tz=q[1]+dx/L*p.lat,d=Math.hypot(tx-p.x,tz-p.z);if(d>.2){p.ang=Math.atan2(tx-p.x,tz-p.z);p.x+=(tx-p.x)/d*Math.min(d,dt*1.1);p.z+=(tz-p.z)/d*Math.min(d,dt*1.1);incClip287(p,'marche')}else{p.mv=0;incClip287(p,'cueillir_sol')}}else incClip287(p,'cueillir_sol')}
  else if(p.mode==='garde'){const c=(I.pnj347||[]).find(o=>o.mode==='champ'&&Math.hypot(o.x-p.x,o.z-p.z)<14);if(c)p.ang=Math.atan2(c.x-p.x,c.z-p.z);incClip287(p,'repos_debout')}
  else{incClip287(p,p.clip0||'repos_debout')}
  p.root.position.set(p.x,h(p.x,p.z),p.z);p.root.rotation.y=p.ang;if(p.mx)p.mx.update(dt)}}catch(e){}return r}}
