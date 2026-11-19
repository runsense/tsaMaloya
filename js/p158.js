// ===== p158 : quand le conte annonce « les tortues montent sur les plages », on les voit : une troupe sort de l'eau sur la plage la plus proche, remonte le sable, puis redescend =====
const TOR158={L:[],t0:0,fait:false,cle:null};
function plages158(){if(TOR158.P)return TOR158.P;const [cx,cz]=xz(55.53,-21.12),P=[];for(let i=0;i<360;i++){const a=i/360*6.2832,dx=Math.cos(a),dz=Math.sin(a);let r=2;while(r<60){const x=cx+dx*r,z=cz+dz*r;if(alt(x,z)<=0){
   // une plage : le sol monte doucement (pas de falaise)
   const h1=alt(x-dx*.3,z-dz*.3),h2=alt(x-dx*.6,z-dz*.6);if(h1>0&&h1<25&&h2<60)P.push([x,z,dx,dz]);break}r+=.08}}return TOR158.P=P}
function tortuesPlage158(){try{if(typeof scene==='undefined'||!S)return;const P=plages158();if(!P.length)return;
 // la plage connue la plus proche de la caméra
 let best=null,bd=1e9;P.forEach(p=>{const t=tileAt({x:p[0]-p[2]*.3,z:p[1]-p[3]*.3});const vu=t&&seen(t);const d=Math.hypot(p[0]-camT.x,p[1]-camT.z)+(vu?0:6);if(d<bd){bd=d;best=p}});if(!best)return;
 TOR158.L.forEach(o=>scene.remove(o.w));TOR158.L=[];TOR158.t0=performance.now();const [x0,z0,dx,dz]=best;
 for(let i=0;i<14;i++){const u=(i/13-.5)*1.4+(Math.random()-.5)*.08,sx=x0-dz*u+dx*(.05+Math.random()*.12),sz=z0+dx*u+dz*(.05+Math.random()*.12),fin=.18+Math.random()*.28;
  const o={sx,sz,ex:sx-dx*(fin+.12),ez:sz-dz*(fin+.12),d:i*.6+Math.random()*2,w:new THREE.Group()};o.w.visible=false;scene.add(o.w);TOR158.L.push(o);
  inst144('sk_tortue',{h:.06,tint:0x8a9a70}).then(r=>{o.w.add(r.w)}).catch(()=>{})}
 try{camGo={v:new THREE.Vector3(x0-dx*.25,0,z0-dz*.25),d:3.2,p:.8,a:Math.atan2(dx,dz)}}catch(e){}}catch(e){}}
(function boucle158(){requestAnimationFrame(boucle158);try{if(!TOR158.L.length)return;const s=(performance.now()-TOR158.t0)/1000,off=(typeof VP!=='undefined'&&VP)||(typeof K!=='undefined'&&K);
 TOR158.L.forEach(o=>{const a=s-o.d;if(a<0||off){o.w.visible=false;return}o.w.visible=true;
  // 0–22 s : on monte ; 22–70 s : on creuse et on pond ; 70–95 s : retour à la mer
  let u=a<22?a/22:a<70?1:Math.max(0,1-(a-70)/25);const x=o.sx+(o.ex-o.sx)*u,z=o.sz+(o.ez-o.sz)*u;o.w.position.set(x,Math.max(0,alt(x,z))*VX+.004,z);
  const mont=a<22,ret=a>=70;o.w.rotation.y=Math.atan2(o.ex-o.sx,o.ez-o.sz)+(ret?Math.PI:0)+(mont||ret?Math.sin(a*5)*.12:0);o.w.rotation.z=(mont||ret)?Math.sin(a*6)*.06:0});
 if(s>100){TOR158.L.forEach(o=>scene.remove(o.w));TOR158.L=[]}}catch(e){}})();
setInterval(()=>{try{if(typeof S==='undefined'||!S)return;const q=['#modal','#tuto','#cine .ctx','#conteSc','#ban115','.bandeau115','#toast'].map(s=>document.querySelector(s)).filter(e=>e&&e.offsetParent!==null);
 const txt=q.map(e=>e.textContent).join(' ');const k=/tortues (de mer |marines )?montent sur les plages|tortues montent/i.test(txt);if(k&&TOR158.cle!==S.year){TOR158.cle=S.year;tortuesPlage158()}}catch(e){}},600);
