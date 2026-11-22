// ===== p187 : le songe du gramoun, sur la vraie île — un film qui devient une course =====
// Ouverture en plongée : la caméra descend de très haut sur Saint-Pierre en tournant doucement, vient se poser derrière le coffre
// de la voiture, et les commandes apparaissent. Le décor, d'abord sombre, prend vie. Étapes : le front de mer de Saint-Pierre la nuit
// (une boîte de nuit après l'autre : séga mauricien, électro, disco, maloya, dancehall), la 4 voies vers Le Tampon à l'aube (lignes droites,
// on pousse le moteur), la montée vers la Plaine des Cafres (pentes et virages), la Plaine des Sables jusqu'au Pas de Bellecombe.
// Le relief est le vrai (le MNT du jeu), le sol est l'image satellite Sentinel-2 de 2026 ; entre deux étapes, un flou autour du paysage.
// Le trajet suit approximativement les vraies routes (front de mer, RN3, route du volcan).
{const R187old=rallyeJeu;rallyeJeu=function(fin){try{return rallye187(fin)}catch(e){console.warn(e);return R187old(fin)}}}
let rouge187=()=>0;function rallye187(fin){window.BTUON=1;window.FILM=1;
 const d=document.createElement('div');d.id='rallye';d.style.cssText='position:fixed;inset:0;z-index:96;background:#000;user-select:none;touch-action:none;overflow:hidden';document.body.appendChild(d);
 const cv=document.createElement('canvas');cv.style.cssText='width:100%;height:100%;display:block';d.appendChild(cv);
 // la sensation de vitesse : des traînées qui filent sur les bords de l'image quand on va vite
 const vit=document.createElement('canvas');vit.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none';d.appendChild(vit);const vx=vit.getContext('2d');const TR=[];for(let k=0;k<70;k++)TR.push({a:Math.random()*6.283,r:Math.random(),l:.08+Math.random()*.16});
 const fl=document.createElement('div');fl.style.cssText='position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;transition:opacity .5s';d.appendChild(fl);
 function flash187(){fl.style.transition='none';fl.style.opacity=.55;requestAnimationFrame(()=>{fl.style.transition='opacity .6s';fl.style.opacity=0});dire('Accident !',1400)}
 function traines(vv,dt){const W=vit.clientWidth,H=vit.clientHeight;if(vit.width!==W||vit.height!==H){vit.width=W;vit.height=H}vx.clearRect(0,0,W,H);const f=Math.max(0,(vv-.45)/.55);if(f<=0)return;const cx=W/2,cy=H*.46,R=Math.hypot(W,H)*.55;vx.lineCap='round';
  for(const t of TR){t.r+=dt*(1.2+vv*2.5)*(.5+t.r);if(t.r>1){t.r=.35+Math.random()*.2;t.a=Math.random()*6.283}const r0=R*t.r,r1=R*(t.r+t.l*f);if(r0<R*.38)continue;vx.strokeStyle='rgba(255,255,255,'+(.22*f*Math.min(1,(t.r-.35)*3))+')';vx.lineWidth=1+f*2*t.r;vx.beginPath();vx.moveTo(cx+Math.cos(t.a)*r0,cy+Math.sin(t.a)*r0*.7);vx.lineTo(cx+Math.cos(t.a)*r1,cy+Math.sin(t.a)*r1*.7);vx.stroke()}}
 const voile=document.createElement('div');voile.style.cssText='position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 58%,rgba(40,25,10,.5) 100%)';d.appendChild(voile);
 const flou=document.createElement('div');flou.style.cssText='position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .9s;backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);-webkit-mask:radial-gradient(ellipse 34% 30% at 50% 66%,transparent 60%,#000 100%);mask:radial-gradient(ellipse 34% 30% at 50% 66%,transparent 60%,#000 100%)';d.appendChild(flou);
 const titre=document.createElement('div');titre.style.cssText='position:absolute;left:0;right:0;top:26%;text-align:center;color:#f7ecd2;font:italic 700 30px Alegreya,Georgia,serif;text-shadow:0 3px 12px #000;opacity:0;transition:opacity 1s;pointer-events:none;padding:0 16px';d.appendChild(titre);
 const hud=document.createElement('div');hud.style.cssText='position:absolute;left:12px;top:10px;color:#f2ead6;font:700 14px Montserrat,system-ui;text-shadow:0 2px 4px #000;pointer-events:none;opacity:0;transition:opacity 1s';d.appendChild(hud);
 // les commandes, affichées dès l'intro (touche H pour les cacher ou les remontrer)
 const compt=document.createElement('div');compt.style.cssText='position:absolute;left:12px;top:52px;width:180px;height:14px;background:rgba(10,14,24,.5);border:1px solid rgba(242,234,214,.35);border-radius:7px;overflow:hidden;pointer-events:none';compt.innerHTML='<div style="height:100%;width:0;background:linear-gradient(90deg,#4caf7a,#e9b44c 60%,#e05a3a)"></div><div style="position:absolute;inset:0;font:700 10px Montserrat,system-ui;color:#fff;text-align:center;line-height:14px;text-shadow:0 1px 2px #000"></div>';d.appendChild(compt);
 const aide=document.createElement('div');aide.style.cssText='position:absolute;right:12px;top:48px;color:#f2ead6;font:500 12.5px/1.55 Montserrat,system-ui;background:rgba(10,14,24,.55);border:1px solid rgba(242,234,214,.25);border-radius:10px;padding:9px 12px;pointer-events:none;transition:opacity .6s;max-width:270px';
 aide.innerHTML='<b style="font-size:13px">Commandes</b><br>Accélérer : <b>Espace</b> ou <b>0</b> du pavé<br>Freiner : <b>Ctrl</b> ou <b>.</b> du pavé<br>Diriger : <b>Q</b> / <b>D</b> ou <b>← →</b><br>Frein à main, pour déraper : <b>Maj</b> ou <b>Entrée</b> du pavé<br><span style="opacity:.8">Sur le gravier du volcan et la route mouillée des Plaines, ça glisse : braquer fort fait partir l’arrière.</span><br><span style="opacity:.6">H : cacher / montrer</span><br><div id="btV187" style="margin-top:6px;font-weight:700">Voiture</div><div id="credV187" style="display:none;opacity:.7;font-size:10.5px;margin-top:4px">Renault 5 Turbo – Low-Poly PS1 Style Car, par Valtiel (Sketchfab), CC BY 4.0</div>';d.appendChild(aide);
 const cmd=document.createElement('div');cmd.style.cssText='position:absolute;left:0;right:0;bottom:14px;display:flex;justify-content:space-between;padding:0 14px;opacity:0;transition:opacity 1.2s;pointer-events:none';
 cmd.innerHTML='<div style="display:flex;gap:10px"><button class="bt sec" data-r="g" style="width:64px;height:64px;font-size:26px">◀</button><button class="bt sec" data-r="d" style="width:64px;height:64px;font-size:26px">▶</button></div><div style="display:flex;gap:10px"><button class="bt sec" data-r="m" style="width:72px;height:64px;font-size:13px">Frein<br>à main</button><button class="bt sec" data-r="f" style="width:72px;height:64px">Frein</button><button class="bt" data-r="a" style="width:86px;height:64px">Gaz</button></div>';d.appendChild(cmd);
 const qb=document.createElement('button');qb.className='bt sec';qb.textContent='Quitter';qb.style.cssText='position:absolute;right:12px;top:10px;z-index:2';d.appendChild(qb);
 const dire=(t,ms)=>{titre.innerHTML=t;titre.style.opacity=1;clearTimeout(dire.h);dire.h=setTimeout(()=>titre.style.opacity=0,ms||2600)};
 const R=new THREE.WebGLRenderer({canvas:cv,antialias:true});R.outputEncoding=THREE.sRGBEncoding;R.setPixelRatio(Math.min(1.5,devicePixelRatio||1));
 const sc=new THREE.Scene();sc.fog=new THREE.Fog(0x0b1020,60,900);const cam=new THREE.PerspectiveCamera(58,1,.5,9000);
 const hemi=new THREE.HemisphereLight(0xfff6e6,0x404a38,.25),sun=new THREE.DirectionalLight(0xfff0d8,.2);sun.position.set(300,600,-200);sc.add(hemi,sun);
 // ---- l'échelle : 1 km du jeu = K unités ; la hauteur réelle (m) au même facteur
 const K=997,KY=1;const P0=xz(55.47,-21.34);const toR=(lon,lat)=>{const [x,z]=xz(lon,lat);return [(x-P0[0])*K,(z-P0[1])*K]};const hR=(X,Z)=>Math.max(0,alt(X/K+P0[0],Z/K+P0[1]))*KY;
 // ---- les étapes du tour de l'île (trajets approximatifs, ronds-points marqués « r ») : chacune a sa route, son heure, sa vitesse de rêve
 const ETAPES=[
  {osm:'sp',n:'Saint-Pierre, le front de mer',s:'la nuit, les boîtes de nuit en enfilade',h:'nuit',vmax:180,clubs:1,wp:[[55.4655,-21.3448],[55.4705,-21.3440],[55.4760,-21.3428],[55.4815,-21.3395,'r'],[55.4840,-21.3330]]},
  {osm:'voies',part:[0,.7],n:'La 4 voies',s:'vers Le Tampon : la grande ligne droite, le moteur hurle, jusqu’à 230 dans le rêve',h:'nuit',vmax:230,large:1,wp:[[55.4840,-21.3330],[55.4900,-21.3200],[55.4960,-21.3080],[55.5050,-21.2950],[55.5140,-21.2800,'r'],[55.5200,-21.2740]]},
  {osm:'sg',part:[0,.36],n:'Saint-Paul, la montée vers Saint-Gilles',s:'en pleine nuit, par le cap La Houssaye',h:'nuit',vmax:200,wp:[[55.2885,-21.0030,'r'],[55.2760,-21.0090],[55.2680,-21.0160],[55.2580,-21.0230],[55.2470,-21.0270],[55.2380,-21.0340],[55.2290,-21.0450,'r'],[55.2235,-21.0540]]},
  {osm:'nrl',n:'La nouvelle route du Littoral',s:'au milieu de la mer, la montagne sur la droite, jusqu’à La Grande Chaloupe',h:'bleu',vmax:200,large:1,mer:1,wp:[[55.3260,-20.9300,'r'],[55.3380,-20.9175],[55.3520,-20.9085],[55.3660,-20.9010],[55.3800,-20.8950],[55.3880,-20.8925]]},
  {osm:'laves',part:[.3,.6],n:'La route des laves',s:'le Grand Brûlé, au lever du soleil',h:'aube',vmax:220,wp:[[55.7700,-21.3560],[55.7880,-21.3300],[55.8040,-21.3010],[55.8140,-21.2700],[55.8150,-21.2420],[55.8060,-21.2150]]},
  {osm:'sd',n:'Saint-Denis, le Barachois',s:'en plein festival maloya : la route est bouchée, on passe par la ville et Bellepierre',h:'jour',vmax:160,festival:1,wp:[[55.4330,-20.8790],[55.4420,-20.8775],[55.4475,-20.8780,'r'],[55.4505,-20.8830],[55.4480,-20.8880],[55.4440,-20.8920],[55.4415,-20.8955]]},
  {osm:'plaines',part:[.55,.72],n:'La route des Plaines',s:'la montée des Hauts, de Saint-Benoît à la Plaine des Cafres',h:'jour',vmax:210,wp:[[55.7130,-21.0340,'r'],[55.6900,-21.0650],[55.6600,-21.1000],[55.6280,-21.1350],[55.6000,-21.1550],[55.5800,-21.1720],[55.5700,-21.1950],[55.5650,-21.2100]]},
  {osm:'volcan',part:[.55,1],n:'La route du volcan',s:'la forêt, la colline, puis la plaine rouge, comme sur Mars',h:'soir',vmax:190,volcan:1,wp:[[55.5650,-21.2110,'r'],[55.5800,-21.2200],[55.5950,-21.2300],[55.6080,-21.2360],[55.6200,-21.2385],[55.6320,-21.2370],[55.6430,-21.2330],[55.6600,-21.2290],[55.6760,-21.2250],[55.6890,-21.2185]]}];
 let ET=ETAPES[0],RP=[],RT=[],RN=[],NP=0,larg=()=>9,ETG=null,ek=0,HS=(X,Z)=>0,PROCHE=(X,Z)=>[1e9,-1];
 function etape(k){ek=k;ET=ETAPES[k];if(ETG){sc.remove(ETG);ETG.traverse(o=>{if(o.userData.partage)return;if(o.geometry)o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(m&&m.map&&m.map!==SATT&&m.map.dispose)m.map.dispose()})})}ETG=new THREE.Group();sc.add(ETG);
  // le trajet, avec les ronds-points : on tourne autour de l'îlot, dans le sens inverse des aiguilles d'une montre
  const W=ET.wp.map(([lo,la,f])=>{const [X,Z]=toR(lo,la);return {X,Z,r:f==='r'}});const pts=[];
  W.forEach((w,i)=>{if(!w.r||i===0||i===W.length-1||(ET.osm&&typeof OSM187!=='undefined'&&OSM187[ET.osm])){pts.push(new THREE.Vector3(w.X,0,w.Z));return}const a=W[i-1],b=W[i+1],rr=16,th=(x,z)=>Math.atan2(-(z-w.Z),x-w.X);let t0=th(a.X,a.Z),t1=th(b.X,b.Z);while(t1<=t0+.6)t1+=Math.PI*2;
   for(let k2=0;k2<=10;k2++){const t=t0+(t1-t0)*k2/10;pts.push(new THREE.Vector3(w.X+Math.cos(t)*rr,0,w.Z-Math.sin(t)*rr))}
   const il=new THREE.Mesh(new THREE.CylinderGeometry(rr-6,rr-6,1.2,28),new THREE.MeshLambertMaterial({color:0x3f7a3a}));il.position.set(w.X,hR(w.X,w.Z)+.6,w.Z);il.userData.rond=1;ETG.add(il);
   const pal=new THREE.Mesh(new THREE.CylinderGeometry(.4,.6,9,6),new THREE.MeshLambertMaterial({color:0x6a5a3a}));pal.position.set(w.X,hR(w.X,w.Z)+5,w.Z);ETG.add(pal);const fe=new THREE.Mesh(new THREE.SphereGeometry(3.2,8,6),new THREE.MeshLambertMaterial({color:0x2f6a2a}));fe.position.set(w.X,hR(w.X,w.Z)+9.5,w.Z);ETG.add(fe)});
  // le vrai tracé (OpenStreetMap) quand on l'a ; les ronds-points réels deviennent un îlot qu'on contourne (sens inverse des aiguilles d'une montre)
  const O=ET.osm&&typeof OSM187!=='undefined'&&OSM187[ET.osm];if(O){let L0=O.p;if(ET.osm==='nrl')L0=L0.filter(p=>p[0]<=55.386);if(ET.part){const n0=L0.length;L0=L0.slice(Math.floor(ET.part[0]*n0),Math.ceil(ET.part[1]*n0))}const Q=L0.map(([lo,la])=>{const [X,Z]=toR(lo,la);return {X,Z}});const rr=13,cut=24;const rbs=(O.r||[]).map(([lo,la])=>{const [X,Z]=toR(lo,la);return {X,Z}});
   pts.length=0;let i=0;while(i<Q.length){const q=Q[i],rb=rbs.find(c=>Math.hypot(q.X-c.X,q.Z-c.Z)<cut);if(!rb||i===0){pts.push(new THREE.Vector3(q.X,0,q.Z));i++;continue}
    let j=i;while(j<Q.length&&Math.hypot(Q[j].X-rb.X,Q[j].Z-rb.Z)<cut)j++;const a=Q[i-1],b=Q[Math.min(Q.length-1,j)],th=(x,z)=>Math.atan2(-(z-rb.Z),x-rb.X);let t0=th(a.X,a.Z),t1=th(b.X,b.Z);while(t1<=t0+.5)t1+=Math.PI*2;
    for(let k2=0;k2<=8;k2++){const t=t0+(t1-t0)*k2/8;pts.push(new THREE.Vector3(rb.X+Math.cos(t)*rr,0,rb.Z-Math.sin(t)*rr))}
    if(!rb.fait){rb.fait=1;const y0=hR(rb.X,rb.Z);const il=new THREE.Mesh(new THREE.CylinderGeometry(rr-6,rr-6,1.2,24),new THREE.MeshLambertMaterial({color:0x3f7a3a}));il.position.set(rb.X,y0+.6,rb.Z);ETG.add(il);const pal=new THREE.Mesh(new THREE.CylinderGeometry(.3,.45,6,6),new THREE.MeshLambertMaterial({color:0x6a5a3a}));pal.position.set(rb.X,y0+3.5,rb.Z);ETG.add(pal);const fe=new THREE.Mesh(new THREE.SphereGeometry(2.2,8,6),new THREE.MeshLambertMaterial({color:0x2f6a2a}));fe.position.set(rb.X,y0+6.8,rb.Z);ETG.add(fe)}
    i=j}}
  const C=new THREE.CatmullRomCurve3(pts,false,'centripetal');const L=C.getLength();NP=Math.max(60,Math.round(L/(O?2.5:4)));RP=[];RT=[];RN=[];
  for(let i=0;i<=NP;i++){const u=i/NP,p=C.getPointAt(u),t=C.getTangentAt(u);t.y=0;t.normalize();p.y=hR(p.x,p.z);RP.push(p);RT.push(t);RN.push(new THREE.Vector3(t.z,0,-t.x))}
  {const Y=RP.map(p=>p.y);for(let r=0;r<3;r++)for(let i=0;i<=NP;i++){let s2=0,n=0;for(let k2=-12;k2<=12;k2++){const j=i+k2;if(j>=0&&j<=NP){s2+=Y[j];n++}}RP[i].y=s2/n}RP.forEach(p=>p.y=Math.max(p.y,ET.mer?1.6:.6))}
  larg=()=>ET.large?14:7;window.larg187=()=>larg()/2;
  // la Plaine des Sables : le sol lui-même rougit (plus de nappe posée dessus, qui flottait au-dessus des creux et coupait les bosses)
  rouge187=(bi,dd)=>{if(!ET.volcan||bi<0)return 0;const u=bi/NP,a=Math.min(1,Math.max(0,(u-.52)/.05))*Math.min(1,Math.max(0,(.96-u)/.03));return a*Math.min(1,Math.max(0,1-(dd-70)/60))};
  // le sol : le vrai relief, l'image satellite, aplani sous la route
  let xmin=1e9,xmax=-1e9,zmin=1e9,zmax=-1e9;RP.forEach(p=>{xmin=Math.min(xmin,p.x);xmax=Math.max(xmax,p.x);zmin=Math.min(zmin,p.z);zmax=Math.max(zmax,p.z)});const M=700;xmin-=M;xmax+=M;zmin-=M;zmax+=M;
  const GX=240,GZ=Math.max(20,Math.round(GX*(zmax-zmin)/(xmax-xmin)));const gp=[],guv=[],gi=[],gcol=[];const W0=(NX-1)*ST,H0=(NY-1)*ST;const bins={},BS=60;RP.forEach((p,i)=>{const k2=Math.floor(p.x/BS)+','+Math.floor(p.z/BS);(bins[k2]=bins[k2]||[]).push(i)});
  const proche=(X,Z)=>{let bd=1e9,bi=-1;const bx=Math.floor(X/BS),bz=Math.floor(Z/BS);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){const L2=bins[(bx+a)+','+(bz+b)];if(L2)L2.forEach(i=>{const p=RP[i],dd=(p.x-X)**2+(p.z-Z)**2;if(dd<bd){bd=dd;bi=i}})}return [Math.sqrt(bd),bi]};
  // le sol, à l'échelle réelle : loin de la route le vrai relief ; près de la route il descend en douceur jusqu'au niveau de la chaussée
  const w2=larg()/2;PROCHE=proche;HS=(X,Z)=>{const y0=hR(X,Z),[dd,bi]=proche(X,Z);if(bi<0)return y0;if(ET.mer&&alt(X/K+P0[0],Z/K+P0[1])<=1)return y0>0?y0:-2;const ry=RP[bi].y-.12,k=Math.min(1,Math.max(0,(dd-(w2+1.5))/45));return ry+(y0-ry)*k*k*(3-2*k)};
  for(let j=0;j<=GZ;j++)for(let i=0;i<=GX;i++){const X=xmin+(xmax-xmin)*i/GX,Z=zmin+(zmax-zmin)*j/GZ;const gx=X/K+P0[0],gz=Z/K+P0[1],enMer=alt(gx,gz)<=1;const [dd,bi]=proche(X,Z);let y=HS(X,Z);if(dd<80){const k=Math.min(1,Math.max(0,(dd-58)/20));y-=3*(1-k*k*(3-2*k))}
   gp.push(X,enMer?-2:y,Z);guv.push((gx+MAR)/W0,1-(gz+MAR)/H0);{const f=rouge187(bi,dd);gcol.push(1+f*.45,1-f*.45,1-f*.6)}if(i<GX&&j<GZ){const a=j*(GX+1)+i;gi.push(a,a+GX+1,a+1,a+1,a+GX+1,a+GX+2)}}
  const gg=new THREE.BufferGeometry();gg.setAttribute('position',new THREE.Float32BufferAttribute(gp,3));gg.setAttribute('uv',new THREE.Float32BufferAttribute(guv,2));gg.setAttribute('color',new THREE.Float32BufferAttribute(gcol,3));solM.vertexColors=true;gg.setIndex(gi);gg.computeVertexNormals();ETG.add(new THREE.Mesh(gg,solM));hi187(ET.osm,W0,H0);
  // l'asphalte et ses lignes ; sur la mer, les piles du viaduc
  {const pos=[],idx=[],cr=[],uvR=[];let dR=0;for(let i=0;i<=NP;i++){const p=RP[i],n=RN[i],w=larg()/2;if(i)dR+=p.distanceTo(RP[i-1]);uvR.push(0,dR/9,1,dR/9);pos.push(p.x-n.x*w,p.y+.05,p.z-n.z*w,p.x+n.x*w,p.y+.05,p.z+n.z*w);
   // en haut du volcan la route devient rouge (pouzzolane)
   const r=ET.volcan?Math.min(1,Math.max(0,(i/NP-.5)/.05)):0,c0=[.227,.227,.235],c1=[.13,.05,.035],c2=[.21,.19,.16],g2=ET.volcan?Math.min(1,Math.max(0,(i/NP-.7)/.03))*Math.min(1,Math.max(0,(.95-i/NP)/.03)):0,cc=c0.map((v,j)=>(v+(c1[j]-v)*r)*(1-g2)+c2[j]*g2);cr.push(...cc,...cc);if(i<NP){const b=i*2;idx.push(b,b+2,b+1,b+1,b+2,b+3)}}
   const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('color',new THREE.Float32BufferAttribute(cr,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvR,2));g.setIndex(idx);g.computeVertexNormals();ETG.add(new THREE.Mesh(g,new THREE.MeshLambertMaterial({color:0xffffff,vertexColors:true,map:ASPH187()})))}
  {const W0=(NX-1)*ST,H0=(NY-1)*ST,pos=[],uv=[],idx=[],col=[],NC=57,PAS=2.5;let nv=0;
   for(let i=0;i<=NP;i++){const p=RP[i],n=RN[i];for(let c=0;c<NC;c++){const o=(c-(NC-1)/2)*PAS,X=p.x+n.x*o,Z=p.z+n.z*o,[dd,bi]=proche(X,Z),y=HS(X,Z);pos.push(X,y,Z);const gx=X/K+P0[0],gz=Z/K+P0[1];uv.push((gx+MAR)/W0,1-(gz+MAR)/H0);const f=rouge187(bi,dd);col.push(1+f*.45,1-f*.45,1-f*.6)}
    if(i<NP){const r=i*NC,r2=r+NC;for(let c=0;c<NC-1;c++){if(ET.mer&&pos[(r+c)*3+1]<=-1.9&&pos[(r2+c+1)*3+1]<=-1.9)continue;idx.push(r+c,r+c+1,r2+c,r+c+1,r2+c+1,r2+c)}}}
   const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.setIndex(idx);g.computeVertexNormals();solM.side=THREE.DoubleSide;const m=new THREE.Mesh(g,solM);m.userData.bande=1;ETG.add(m)}
  ligne(u=>-larg(u)/2+.35,.12,false,0xe8e4d8);ligne(u=>larg(u)/2-.35,.12,false,0xe8e4d8);ligne(0,.1,true,0xe8e4d8);
  if(ET.mer){const pg=new THREE.BoxGeometry(3,1,3),pm=new THREE.MeshLambertMaterial({color:0x9a9890});for(let i=6;i<NP;i+=9){const p=RP[i],g2=p.x/K+P0[0],g3=p.z/K+P0[1];if(alt(g2,g3)>1)continue;const pi=new THREE.Mesh(pg,pm);pi.scale.y=p.y+2;pi.position.set(p.x,(p.y-2)/2,p.z);ETG.add(pi)}
   // (le garde-corps du viaduc est maintenant le GBA et sa lisse, posés par bordure187)
  }
  // les lampadaires (la nuit et en ville), les boîtes de nuit, le festival
  lum.length=0;if(ET.h==='nuit'||ET.h==='bleu'||ET.festival){// de vrais lampadaires : un mât de 8 m tous les 30 m, en quinconce, et une lueur à la taille de la lampe
   const NL=Math.ceil(NP/12)+1,mat=new THREE.InstancedMesh(new THREE.CylinderGeometry(.09,.14,8,6),new THREE.MeshLambertMaterial({color:0x5a5e66}),NL),bra=new THREE.InstancedMesh(new THREE.BoxGeometry(.12,.12,1.6),new THREE.MeshLambertMaterial({color:0x5a5e66}),NL),q=new THREE.Object3D();let nl=0;
   for(let i=4;i<NP;i+=12){const p=RP[i],n=RN[i],sg=((i/12)|0)%2?1:-1,X=p.x+n.x*sg*(larg()/2+1.2),Z=p.z+n.z*sg*(larg()/2+1.2),y=HS(X,Z);q.position.set(X,y+4,Z);q.rotation.set(0,0,0);q.updateMatrix();mat.setMatrixAt(nl,q.matrix);obs187(X,Z,.3);q.position.set(X-n.x*sg*.7,y+7.95,Z-n.z*sg*.7);q.rotation.set(0,Math.atan2(n.x,n.z),0);q.updateMatrix();bra.setMatrixAt(nl,q.matrix);nl++;
    const m=new THREE.Sprite(new THREE.SpriteMaterial({map:tOr,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.85}));m.position.set(X-n.x*sg*1.4,y+7.8,Z-n.z*sg*1.4);m.scale.set(2.4,2.4,1);ETG.add(m);lum.push(m)}
   mat.count=nl;bra.count=nl;ETG.add(mat,bra)}
  clubs.length=0;if(ET.clubs)CLUB.forEach((c,k2)=>{
   // côté ville (la mer est de l'autre côté, sur la promenade), assez loin pour qu'aucun bout de route ne passe dessous
   const i0=Math.round(NP*(.1+.17*k2));let pl=null;for(let di=0;di<90&&!pl;di+=6){const ii=Math.min(NP,i0+di),pp=RP[ii],nn=RN[ii],mer=hR(pp.x+nn.x*40,pp.z+nn.z*40)<hR(pp.x-nn.x*40,pp.z-nn.z*40)?1:-1;for(const sg2 of [-mer,mer]){const off=larg()/2+13,X=pp.x+nn.x*sg2*off,Z=pp.z+nn.z*sg2*off;if(PROCHE(X,Z)[0]>larg()/2+8.5){pl={i:ii,p:pp,n:nn,sg:sg2,X,Z};break}}}if(!pl)return;
   const i=pl.i,p=pl.p,n=pl.n,sg=pl.sg;ETG.userData.mer=-sg;const g=new THREE.Group();
   // une vraie façade de front de mer, la nuit : rez-de-chaussée ouvert et éclairé, étage aux fenêtres, enseigne au néon avec le nom de la musique
   const NOMS={sega:'Le Ravann',electro:'Pulse',disco:'Le Miroir',maloya:'Kabaré Lakour',dancehall:'Yard'},nom=NOMS[c[2]]||c[0];
   const cv=document.createElement('canvas');cv.width=512;cv.height=320;const x=cv.getContext('2d');const mur=['#3a3340','#2e3a3a','#40302e','#353a2c','#2c3040'][k2%5];
   x.fillStyle=mur;x.fillRect(0,0,512,320);x.fillStyle='rgba(255,255,255,.05)';for(let y=0;y<320;y+=8)x.fillRect(0,y,512,1);
   for(let k=0;k<4;k++){const lit=(k+k2)%3!==0;x.fillStyle=lit?'#f3c46a':'#1a1c22';x.fillRect(40+k*118,40,70,60);x.fillStyle='#14161a';x.fillRect(73+k*118,40,4,60);x.fillRect(40+k*118,68,70,4)}
   x.fillStyle='#111';x.fillRect(0,168,512,152);const gr=x.createLinearGradient(0,190,0,320);gr.addColorStop(0,c[1]);gr.addColorStop(1,'#000');x.fillStyle=gr;x.globalAlpha=.75;x.fillRect(150,190,212,130);x.globalAlpha=1;
   x.fillStyle='rgba(0,0,0,.55)';for(let k=0;k<7;k++){const px=165+k*28+((k*37)%11);x.beginPath();x.arc(px,262,9,0,7);x.fill();x.fillRect(px-8,270,16,50)}
   x.fillStyle='#222';x.fillRect(0,150,512,22);x.font='bold 54px Georgia,serif';x.textAlign='center';x.textBaseline='middle';x.shadowColor=c[1];x.shadowBlur=24;x.fillStyle=c[1];x.fillText(nom,256,128);x.shadowBlur=10;x.fillStyle='#fff';x.font='bold 50px Georgia,serif';x.globalAlpha=.85;x.fillText(nom,256,128);x.globalAlpha=1;x.shadowBlur=0;
   x.font='600 20px system-ui';x.fillStyle='#eee';x.fillText(c[0].toUpperCase(),256,161);
   const fa=new THREE.CanvasTexture(cv);fa.encoding=THREE.sRGBEncoding;const cote=new THREE.MeshLambertMaterial({color:new THREE.Color(mur)}),toitM=new THREE.MeshLambertMaterial({color:0x2a2420});
   const b=new THREE.Mesh(new THREE.BoxGeometry(14,8.75,8),[cote,cote,toitM,cote,new THREE.MeshBasicMaterial({map:fa}),cote]);b.position.y=4.375;g.add(b);
   const au=new THREE.Mesh(new THREE.BoxGeometry(9,.25,2.4),new THREE.MeshLambertMaterial({color:new THREE.Color(c[1]).multiplyScalar(.6)}));au.position.set(0,3.9,5.1);au.rotation.x=.18;g.add(au);
   const hl=new THREE.Sprite(new THREE.SpriteMaterial({map:tg(c[1]),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.6}));hl.position.set(0,5.5,6);hl.scale.set(16,8,1);g.add(hl);
   const lu=new THREE.PointLight(new THREE.Color(c[1]),1.2,30);lu.position.set(0,3,7);g.add(lu);
   g.position.set(pl.X,HS(pl.X,pl.Z),pl.Z);g.lookAt(p.x,g.position.y,p.z);ETG.add(g);obsBoite187(pl.X,pl.Z,14,8,Math.atan2(p.x-pl.X,p.z-pl.Z));clubs.push({i,n:c[0],col:c[1],style:c[2],g,hl})});
  fest=null;if(ET.festival){// la route du front de mer est barrée : barrières, foule, la scène et ses projecteurs ; on prend à droite vers la ville
   const i0=Math.round(NP*.32),p=RP[i0],t=RT[i0],n=RN[i0];const g=new THREE.Group();const sce=new THREE.Mesh(new THREE.BoxGeometry(22,1.5,12),new THREE.MeshLambertMaterial({color:0x2a2a2a}));sce.position.set(0,.75,0);g.add(sce);
   const toit=new THREE.Mesh(new THREE.BoxGeometry(24,.6,14),new THREE.MeshLambertMaterial({color:0x111111}));toit.position.y=10;g.add(toit);[[-11,-6],[11,-6],[-11,6],[11,6]].forEach(([a,b])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.5,10,.5),new THREE.MeshLambertMaterial({color:0x333333}));m.position.set(a,5,b);g.add(m)});
   ['#ffd23a','#ff4a4a','#4ad0ff'].forEach((c,k2)=>{const hl=new THREE.Sprite(new THREE.SpriteMaterial({map:tg(c),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));hl.position.set(-8+k2*8,8,7);hl.scale.set(16,16,1);g.add(hl);lum.push(hl)});
   const fo=new THREE.InstancedMesh(new THREE.CylinderGeometry(.35,.35,1.7,5),new THREE.MeshLambertMaterial({color:0xffffff}),140),q=new THREE.Object3D(),col=new THREE.Color();for(let k2=0;k2<140;k2++){q.position.set((Math.random()-.5)*44,.85,8+Math.random()*22);q.updateMatrix();fo.setMatrixAt(k2,q.matrix);fo.setColorAt(k2,col.setHSL(Math.random(),.5,.45))}g.add(fo);
   g.position.set(p.x+t.x*10-n.x*(larg()/2+42),p.y,p.z+t.z*10-n.z*(larg()/2+42));g.lookAt(p.x+t.x*10,p.y,p.z+t.z*10);ETG.add(g);fest={g,fo};
   const bar=new THREE.Mesh(new THREE.BoxGeometry(14,1.2,.4),new THREE.MeshBasicMaterial({color:0xd83a2a}));const bx=p.x-n.x*(larg()/2+3),bz=p.z-n.z*(larg()/2+3);bar.position.set(bx,p.y+.8,bz);bar.lookAt(bx+n.x,p.y+.8,bz+n.z);ETG.add(bar)}
  try{bordure187()}catch(e){console.warn('bordure187',e)}
  // les dos d'âne (en ville) : bombés, rayés de blanc ; à pleine vitesse, on décolle
  ETG.userData.da=[];if(ET.osm==='sp'||ET.osm==='sd'){const dm=new THREE.MeshLambertMaterial({color:0x4a4a4c}),bl=new THREE.MeshBasicMaterial({color:0xece8dc});for(let i=30;i<NP-20;i+=60){ETG.userData.da.push(i);const p=RP[i],t=RT[i],g=new THREE.Group();
    const bo=new THREE.Mesh(new THREE.CylinderGeometry(2.2,2.2,larg(),20,1,false,0,Math.PI),dm);bo.rotation.z=-Math.PI/2;bo.scale.set(.1,1,1);g.add(bo);for(let k=-3;k<=3;k+=2){const b2=new THREE.Mesh(new THREE.BoxGeometry(.5,.02,3.8),bl);b2.position.set(k*larg()/8,.23,0);g.add(b2)}
    const pn=new THREE.Mesh(new THREE.PlaneGeometry(.9,.9),new THREE.MeshBasicMaterial({map:(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.fillStyle='#fff';x.strokeStyle='#d01e1e';x.lineWidth=6;x.beginPath();x.moveTo(32,4);x.lineTo(60,56);x.lineTo(4,56);x.closePath();x.fill();x.stroke();x.fillStyle='#111';x.beginPath();x.ellipse(32,44,14,7,0,Math.PI,0);x.fill();return new THREE.CanvasTexture(c)})(),transparent:true,side:THREE.DoubleSide}));
    g.position.set(p.x,p.y+.02,p.z);g.rotation.y=Math.atan2(t.x,t.z);ETG.add(g);const n=RN[i],q=RP[Math.max(0,i-14)],sx=q.x-n.x*(larg()/2+1.2),sz=q.z-n.z*(larg()/2+1.2);pn.position.set(sx,HS(sx,sz)+2.2,sz);pn.rotation.y=Math.atan2(t.x,t.z)+Math.PI;ETG.add(pn)}}
  try{trafic187()}catch(e){console.warn('trafic187',e)}
  if(ET.clubs||ET.festival)pietons187();
  if(ET.volcan)volcan187();
  placer(0);st.o=0;st.v=Math.min(st.v,ET.vmax/3.6*.5);st.dir=0}
 // ---- les passants du front de mer : des promeneurs sur la promenade côté mer, des groupes devant chaque boîte (ils dansent devant le kabaré)
 function pietons187(){const G=ETG,L=G.userData.pie=[];if(typeof p3Charge!=='function'||typeof p3Instance!=='function')return;const mer=G.userData.mer||1,w=larg()/2,MODS=['homme_chemise','femme_drapee','indienne','indien','chinois','jeune_colon','femme_travail','vieille','vieux','servante'];
  const rnd=(a)=>{let x=Math.sin(a*91.7+ek*13.1)*43758.5453;return x-Math.floor(x)};
  const pose1=(m,f)=>{Promise.resolve().then(()=>p3Charge(m)).then(()=>p3Instance(m)).then(I=>{if(ETG!==G)return;const o=I.g.scene;o.traverse(x=>{if(x.isMesh){x.frustumCulled=false}});G.add(o);const it={o,mx:I.mx,A:I.g.animations,...f};
    const jouer=n=>{const c=THREE.AnimationClip.findByName(it.A,n);if(c){const a=it.mx.clipAction(c);a.play();a.time=rnd(L.length)*c.duration;if(f.ts)a.timeScale=f.ts;return true}return false};
    if(f.geste){jouer(f.geste)||jouer('repos_debout')}else if(f.danse){let ok=f.maloya?jouer(f.homme?'danse_maloya_homme':'danse_maloya'):false;if(!ok)try{if(typeof mxDec188==='function'&&I.g.scene.userData.repos){const cl=mxRecible(I.g.scene,mxDec188('Warming_Up'),{nom:'danse',surPlace:true,repos:I.g.scene.userData.repos});if(cl){it.A.push(cl);ok=jouer('danse')}}}catch(e){}if(!ok)jouer('transe_maloya')||jouer('repos_debout')}
    else jouer(f.v?"marche":"repos_debout")||jouer("marche");L.push(it)}).catch(e=>console.warn("pietons187",e&&e.message))};
  // des promeneurs, dans les deux sens, le long de la mer
  const ZI=[12].concat(clubs.map(c=>c.i));for(let k=0;k<16;k++){const i=Math.min(NP-4,Math.max(4,Math.round(ZI[k%ZI.length]+(rnd(k)-.5)*70)));pose1(MODS[k%MODS.length],{i,v:1.1+rnd(k+40)*.5,sens:rnd(k+50)>.5?1:-1,off:mer*(ET.festival?w+3+rnd(k+60)*9:w+3.5+rnd(k+60)*3),ts:1})}
  // les tambours : devant le kabaré, un roulèr (on s'assoit dessus, la peau entre les genoux) et un bidon frappé aux baguettes ;
  // sur la scène du festival maloya, des djembés debout
  const tamb=(type,X,Z,face,y)=>{const g=new THREE.Group(),bois=new THREE.MeshLambertMaterial({color:0x7a4a2a}),peau=new THREE.MeshLambertMaterial({color:0xd9c49a});
    if(type==='rouler'){const c=new THREE.Mesh(new THREE.CylinderGeometry(.27,.27,.75,14),bois);c.rotation.x=Math.PI/2;c.position.set(0,.27,.05);g.add(c);const pe=new THREE.Mesh(new THREE.CircleGeometry(.26,14),peau);pe.position.set(0,.27,.43);g.add(pe);const ca=new THREE.Mesh(new THREE.BoxGeometry(.5,.12,.5),new THREE.MeshLambertMaterial({color:0x8a2a1a}));ca.position.set(0,.06,.05);g.add(ca)}
    else if(type==='bidon'){const c=new THREE.Mesh(new THREE.CylinderGeometry(.29,.29,.88,16),new THREE.MeshLambertMaterial({color:0x2a4ab8}));c.position.set(0,.44,.55);g.add(c);const t=new THREE.Mesh(new THREE.CylinderGeometry(.18,.2,.45,8),bois);t.position.y=.22;g.add(t)}
    else{const pts=[[0,0],[.12,0],[.1,.22],[.06,.32],[.16,.5],[.17,.6],[0,.6]].map(([a,b])=>new THREE.Vector2(a,b));const d=new THREE.Mesh(new THREE.LatheGeometry(pts,14),bois);d.position.set(0,.35,.35);g.add(d);const pe=new THREE.Mesh(new THREE.CircleGeometry(.17,14),peau);pe.rotation.x=-Math.PI/2;pe.position.set(0,.96,.35);g.add(pe)}
    g.position.set(X,y!=null?y:HS(X,Z),Z);g.rotation.y=face;G.add(g)};
  clubs.forEach((c,kc)=>{if(c.style!=='maloya')return;const gp=c.g.position,vers=new THREE.Vector3(RP[c.i].x-gp.x,0,RP[c.i].z-gp.z).normalize(),cote=new THREE.Vector3(vers.z,0,-vers.x);
   [['rouler','joue_rouler',-1.2],['bidon','joue_bidon',1.4]].forEach(([ty,ge,o],k)=>{const X=gp.x+vers.x*5.2+cote.x*o*2.4,Z=gp.z+vers.z*5.2+cote.z*o*2.4,face=Math.atan2(vers.x,vers.z);tamb(ty,X,Z,face);pose1(MODS[(kc+k+5)%MODS.length],{X,Z,fixe:1,geste:ge,face})})});
  if(fest){const g=fest.g;g.updateMatrixWorld(true);[-6,0,6].forEach((x,k)=>{const v=new THREE.Vector3(x,1.5,-3).applyMatrix4(g.matrixWorld),face=g.rotation.y;tamb('djembe',v.x,v.z,face,v.y);pose1(MODS[(k+2)%MODS.length],{X:v.x,Z:v.z,fixe:1,geste:'joue_djembe',face,y:v.y})})}
  // des groupes devant les boîtes de nuit
  clubs.forEach((c,kc)=>{const gp=c.g.position,vers=new THREE.Vector3(RP[c.i].x-gp.x,0,RP[c.i].z-gp.z).normalize(),cote=new THREE.Vector3(vers.z,0,-vers.x);
   for(let k=0;k<2;k++){const X=gp.x+vers.x*(6+rnd(kc*7+k)*2)+cote.x*(k-.5)*1.8,Z=gp.z+vers.z*(6+rnd(kc*7+k)*2)+cote.z*(k-.5)*1.8;pose1(MODS[(kc*3+k+3)%MODS.length],{X,Z,fixe:1,danse:c.style==='maloya'||k===1,maloya:c.style==='maloya',homme:['homme_chemise','indien','chinois','jeune_colon','vieux'].includes(MODS[(kc*3+k+3)%MODS.length]),face:Math.atan2(gp.x-X,gp.z-Z)+(rnd(kc+k)-.5)*1.5})}})}
 // ---- la circulation : quelques voitures dans notre sens devant nous, et en face ; si on les touche, on freine net
 function trafic187(){const G=ETG,L=G.userData.tra=[],w=larg()/2,rnd=a=>{let x=Math.sin(a*77.7+ek*19.3)*43758.5453;return x-Math.floor(x)};if(ET.festival&&0)return;
  const DS=RP[0].distanceTo(RP[Math.min(NP,40)])/Math.min(NP,40)||2.5,n=ET.clubs?5:7;
  for(let k=0;k<n;k++){const face=k%2===1,c=['#e8e8e8','#f2f2f2','#b8bcc2','#2c2f36','#3a7ad8','#d8d8d0','#9a1e1e'][Math.floor(rnd(k)*7)],g=new THREE.Group();
   const bus=k===2&&!ET.volcan;if(bus){// le car jaune
    const cb=new THREE.Mesh(new THREE.BoxGeometry(2.5,2.6,11.5),new THREE.MeshLambertMaterial({color:0xf2c81e}));cb.position.y=1.65;g.add(cb);const vi=new THREE.Mesh(new THREE.BoxGeometry(2.52,.9,10),new THREE.MeshLambertMaterial({color:0x1c2228}));vi.position.y=2.2;g.add(vi)}
   else{const cb=new THREE.Mesh(new THREE.BoxGeometry(1.8,.8,4.2),new THREE.MeshLambertMaterial({color:c}));cb.position.y=.62;g.add(cb);const ca=new THREE.Mesh(new THREE.BoxGeometry(1.6,.6,2.2),new THREE.MeshLambertMaterial({color:0x222831}));ca.position.set(0,1.3,-.2);g.add(ca)}
   const fe=new THREE.Mesh(new THREE.BoxGeometry(1.5,.18,.05),new THREE.MeshBasicMaterial({color:face?0xfff4d8:0xff2a1a}));fe.position.set(0,.8,(face?1:-1)*(bus?5.76:2.12));g.add(fe);G.add(g);
   const off=face?(ET.large?w+3.6+(k%4>1?4.2:0):1.75):(ET.large?-(1.75+(k%4>1?3.5:0))*1:-1.75);
   L.push({g,bus,s:(.08+rnd(k*3)*.85)*NP,v:(ET.large?25+rnd(k)*5.5:14+rnd(k)*5.5)/DS,sens:face?-1:1,off})}}
 function choc187(nx,nz,dur){if(st.v<0){const bx=-Math.sin(st.h),bz=-Math.cos(st.h);if(bx*nx+bz*nz<0){const imp=-st.v;st.v=imp*.25;st.sec=Math.max(st.sec||0,Math.min(1,imp/8))}return}const vx=Math.sin(st.vh??st.h)*st.v,vz=Math.cos(st.vh??st.h)*st.v,vn=vx*nx+vz*nz;if(vn>=0)return;const imp=-vn,e=.25;
  let wx=vx-(1+e)*vn*nx,wz=vz-(1+e)*vn*nz;const tx=-nz,tz=nx,vt=wx*tx+wz*tz;wx-=tx*vt*.25;wz-=tz*vt*.25;st.v=Math.hypot(wx,wz);if(st.v>.3)st.vh=Math.atan2(wx,wz);
  st.sec=Math.max(st.sec||0,Math.min(1.5,imp/10));if(imp>(dur||9)){st.crash=1.4;st.v*=.35;st.h+=(Math.random()-.5)*1.2;try{flash187&&flash187()}catch(e){}}
  try{if(AC){const o=AC.createOscillator(),g2=AC.createGain();o.type='square';o.frequency.value=60+Math.random()*40;g2.gain.setValueAtTime(Math.min(.5,imp/25),AC.currentTime);g2.gain.exponentialRampToValueAtTime(.001,AC.currentTime+.35);o.connect(g2).connect(AC.destination);o.start();o.stop(AC.currentTime+.4)}}catch(e){}}
 function majTrafic187(dt){const L=ETG&&ETG.userData.tra;if(!L)return;for(const [k,t] of L.entries()){
   // les vraies voitures (les mêmes modèles que la nôtre, mélangés) à la place des blocs, dès qu'elles sont chargées
   if(!t.mod&&!t.bus&&window.MOD187){const M=window.MOD187();if(M.length>=3){const src=M[(k*7+ek*3)%M.length],c=src.clone(true);c.visible=true;c.traverse(x=>{x.visible=true;x.userData.partage=1});
     const keep=t.g.children.filter(x=>x.material&&x.material.isMeshBasicMaterial);t.g.clear();keep.forEach(x=>t.g.add(x));t.g.add(c);t.mod=1}}t.s+=t.sens*t.v*dt;if(t.s>NP-2)t.s=2;if(t.s<2)t.s=NP-2;
   const i=Math.floor(t.s),f=t.s-i,p=RP[i],q=RP[i+1],n=RN[i],X=p.x+(q.x-p.x)*f+n.x*t.off,Z=p.z+(q.z-p.z)*f+n.z*t.off;t.g.position.set(X,p.y+(q.y-p.y)*f+.05,Z);t.g.rotation.y=Math.atan2(RT[i].x*t.sens,RT[i].z*t.sens);
   const dx=car.position.x-X,dz=car.position.z-Z,tx=RT[i].x*t.sens,tz=RT[i].z*t.sens,al=dx*tx+dz*tz,la=dx*tz-dz*tx,HL=t.bus?7.6:4.3,HW=1.95;if(Math.abs(al)<HL&&Math.abs(la)<HW&&!st.air){const pl=HL-Math.abs(al),pw=HW-Math.abs(la);let nx,nz,pen;if(pw<pl){const sg=Math.sign(la)||1;nx=tz*sg;nz=-tx*sg;pen=pw}else{const sg=Math.sign(al)||1;nx=tx*sg;nz=tz*sg;pen=pl}st.x+=nx*pen;st.z+=nz*pen;choc187(nx,nz,7);if(pl<pw){if(al<0)t.s+=t.sens*.5}}}}
 // renverser un passant : il est projeté, tombe, reste à terre un moment, puis se relève et repart (c'est un rêve)
 function joue187(it,nom,boucle){const c=THREE.AnimationClip.findByName(it.A,nom);if(!c)return false;it.mx.stopAllAction();const a=it.mx.clipAction(c);a.reset();if(!boucle){a.setLoop(THREE.LoopOnce);a.clampWhenFinished=true}a.play();return true}
 function majPietons187(dt){const L=ETG&&ETG.userData.pie;if(!L)return;for(const it of L){
   if(!it.tb&&st.v>2){const dx=it.o.position.x-car.position.x,dz=it.o.position.z-car.position.z;if(dx*dx+dz*dz<1.7*1.7){const h=st.vh??st.h,k=Math.min(1,st.v/20);
     it.tb={t:0,vx:Math.sin(h)*st.v*.7+dx*.8,vz:Math.cos(h)*st.v*.7+dz*.8,vy:2+st.v*.18,y:it.o.position.y,X:it.o.position.x,Z:it.o.position.z,rot:(Math.random()-.5)*6};st.v*=.82;st.sec=Math.max(st.sec||0,.4);joue187(it,'chute_mort')||joue187(it,'tombe_garde')}}
   if(it.tb){const T=it.tb;T.t+=dt;if(T.t<4.5){T.vy-=9.8*dt;T.X+=T.vx*dt;T.Z+=T.vz*dt;T.y+=T.vy*dt;const g=HS(T.X,T.Z);if(T.y<g){T.y=g;T.vy=0;T.vx*=Math.pow(.02,dt);T.vz*=Math.pow(.02,dt)}it.o.position.set(T.X,T.y,T.Z);if(T.y>g+.05)it.o.rotation.y+=T.rot*dt}
    else if(T.t<5.5){if(!T.debout){T.debout=1;joue187(it,'repos_debout',1)||joue187(it,'marche',1)}}
    else{if(it.fixe){it.X=T.X;it.Z=T.Z}else{it.off=Math.max(-60,Math.min(60,((T.X-RP[it.i|0].x)*RN[it.i|0].x+(T.Z-RP[it.i|0].z)*RN[it.i|0].z)))}it.tb=null;joue187(it,it.fixe?(it.danse?'danse':'repos_debout'):'marche',1)}
    if(it.mx)it.mx.update(dt);continue}
   if(it.fixe){it.o.position.set(it.X,it.y!=null?it.y:HS(it.X,it.Z),it.Z);it.o.rotation.y=it.face}
   else{it.i+=it.sens*it.v*dt/2.5;if(it.i<2||it.i>NP-2){it.sens*=-1;it.i=Math.min(NP-2,Math.max(2,it.i))}const i=Math.floor(it.i),f=it.i-i,p=RP[i],q=RP[i+1],n=RN[i],X=p.x+(q.x-p.x)*f+n.x*it.off,Z=p.z+(q.z-p.z)*f+n.z*it.off;it.o.position.set(X,HS(X,Z),Z);it.o.rotation.y=Math.atan2(RT[i].x*it.sens,RT[i].z*it.sens)}
   if(it.mx&&it.o.position.distanceToSquared(car.position)<250*250)it.mx.update(dt)}}
 // ---- le bord des routes réunionnaises, d'après les vues embarquées : herbes hautes et cannes, muret de béton côté ravine, poteaux électriques et leurs fils,
 //      cocotiers et vacoas en bord de mer, murs tagués et hangars en tôle, immeubles blancs, garde-corps en fer, panneaux 70, voitures garées
 function touffe187(){const pos=[];for(let k=0;k<13;k++){const a=k*2.4,r=.22*(k%3),cx=Math.cos(a)*r,cz=Math.sin(a)*r,lx=Math.cos(a)*.6,lz=Math.sin(a)*.6,tx=-Math.sin(a)*.15,tz=Math.cos(a)*.15,hk=.6+(k%4)*.14;
   pos.push(cx-tx,0,cz-tz,cx+tx,0,cz+tz,cx+lx*.5,hk,cz+lz*.5)}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.computeVertexNormals();return g}
 // les obstacles du décor : des cercles (x, z, rayon) rangés dans une grille de 8 m ; la voiture rebondit ou s'écrase dessus
 function obs187(X,Z,r){const O=ETG.userData.obs||(ETG.userData.obs={});const k=Math.floor(X/8)+','+Math.floor(Z/8);(O[k]=O[k]||[]).push([X,Z,r])}
 // les bâtiments : de vraies boîtes orientées (centre, demi-largeurs, angle), pas des cercles — les coins et les façades bloquent
 function obsBoite187(X,Z,lx,lz,a){(ETG.userData.box||(ETG.userData.box=[])).push([X,Z,lx/2,lz/2,a])}
 function bordure187(){const G=ETG,o=ET.osm,w=larg()/2,q=new THREE.Object3D(),col=new THREE.Color();
  const rnd=a=>{let x=Math.sin(a*127.1+ek*311.7)*43758.5453;return x-Math.floor(x)};
  const libre=(X,Z,m)=>PROCHE(X,Z)[0]>w+m&&!clubs.some(c=>(c.g.position.x-X)**2+(c.g.position.z-Z)**2<22*22)&&!(fest&&(fest.g.position.x-X)**2+(fest.g.position.z-Z)**2<45*45);
  const at=(i,off)=>{const p=RP[i],n=RN[i],X=p.x+n.x*off,Z=p.z+n.z*off;return [X,HS(X,Z),Z]};
  const mer=i=>{const p=RP[i],n=RN[i];return hR(p.x+n.x*40,p.z+n.z*40)<hR(p.x-n.x*40,p.z-n.z*40)?1:-1};
  const cap=(i)=>Math.atan2(RT[i].x,RT[i].z);
  // une liste d'instances [X,Y,Z,rotY,échelle,étirement xz,couleur] -> un seul InstancedMesh
  const inst=(geo,mat,L,ro)=>{if(!L.length)return;if(ro)L.forEach(f=>obs187(f[0],f[2],typeof ro==='function'?ro(f):ro));const m=new THREE.InstancedMesh(geo,mat,L.length);L.forEach((f,k)=>{q.position.set(f[0],f[1],f[2]);q.rotation.set(0,f[3]||0,0);const s=f[4]||1,e=f[5]||1;q.scale.set(s*e,s,s*e);q.updateMatrix();m.setMatrixAt(k,q.matrix);if(f[6]!=null)m.setColorAt(k,col.set(f[6]))});if(m.instanceColor)m.instanceColor.needsUpdate=true;G.add(m);return m};
  // ---- les voies rapides (la 4 voies, la nouvelle route du Littoral) : on roule sur notre chaussée, le séparateur en béton (GBA) à gauche,
  //      la chaussée d'en face derrière lui, une glissière métallique à droite, et des ponts qui enjambent la route
  if(ET.large){const gba=(off,haut,coul)=>{const pos=[],idx=[];for(let i=0;i<=NP;i++){const p=RP[i],n=RN[i],y=p.y+.05;for(const [d,h] of [[-.35,0],[-.2,.35],[-.12,haut],[.12,haut],[.2,.35],[.35,0]]){pos.push(p.x+n.x*(off+d),y+h,p.z+n.z*(off+d))}if(i<NP){const b=i*6;for(let k=0;k<5;k++)idx.push(b+k,b+k+6,b+k+1,b+k+1,b+k+6,b+k+7)}}
     const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();G.add(new THREE.Mesh(g,new THREE.MeshLambertMaterial({color:coul,side:THREE.DoubleSide})))};
   gba(w+.6,1,0xb9b7ae);
   // la chaussée d'en face, avec ses lignes
   {const pos=[],idx=[];for(let i=0;i<=NP;i++){const p=RP[i],n=RN[i];pos.push(p.x+n.x*(w+1.1),p.y+.04,p.z+n.z*(w+1.1),p.x+n.x*(w+11),p.y+.04,p.z+n.z*(w+11));if(i<NP){const b=i*2;idx.push(b,b+2,b+1,b+1,b+2,b+3)}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();G.add(new THREE.Mesh(g,new THREE.MeshLambertMaterial({color:0x37373a,side:THREE.DoubleSide})))}
   ligne(w+1.5,.12,false,0xe8e4d8);ligne(w+6,.1,true,0xe8e4d8);ligne(w+10.6,.12,false,0xe8e4d8);
   // à droite : sur la mer un GBA avec sa lisse en métal, à terre une glissière sur poteaux
   const L=[],rail=[];for(let i=0;i<NP;i++){const p=RP[i],n=RN[i],o2=-(w+.9);if(i%2===0)L.push([p.x+n.x*o2,p.y,p.z+n.z*o2,cap(i)]);const p2=RP[i+1],n2=RN[i+1];for(const h of [.55,.75])rail.push(p.x+n.x*o2,p.y+h,p.z+n.z*o2,p2.x+n2.x*o2,p2.y+h,p2.z+n2.z*o2)}
   if(o==='nrl'){gba(-(w+.7),1,0xb9b7ae);for(let i=0;i<NP;i++){const p=RP[i],n=RN[i],p2=RP[i+1],n2=RN[i+1];for(const s of [-1,1]){const o2=s>0?w+.6:-(w+.7);rail.push(p.x+n.x*o2,p.y+1.35,p.z+n.z*o2,p2.x+n2.x*o2,p2.y+1.35,p2.z+n2.z*o2)}if(i%2===0)for(const s of [-1,1]){const o2=s>0?w+.6:-(w+.7);L.push([p.x+n.x*o2,p.y+1,p.z+n.z*o2,cap(i),.4])}}}
   inst(new THREE.BoxGeometry(.12,.9,.12).translate(0,.45,0),new THREE.MeshLambertMaterial({color:0x9aa0a4}),L);
   {const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(rail,3));G.add(new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0xc8ccce})))}
   // les ponts qui passent au-dessus de la 4 voies
   if(o==='voies'){const bM=new THREE.MeshLambertMaterial({color:0xa9a69c}),pM=new THREE.MeshLambertMaterial({color:0x9c998f});for(let i=120;i<NP-40;i+=230){const p=RP[i],n=RN[i],a=cap(i),g=new THREE.Group();
     const d=new THREE.Mesh(new THREE.BoxGeometry(w*2+24,1.3,11),bM);d.position.set(5.5,6.8,0);g.add(d);
     const gc=new THREE.Mesh(new THREE.BoxGeometry(w*2+16,1,.3),bM);gc.position.set(d.position.x,7.9,5.4);g.add(gc);const gc2=gc.clone();gc2.position.z=-5.4;g.add(gc2);
     for(const x of [-(w+3),w+13.5])for(const z of [-3,3]){const c=new THREE.Mesh(new THREE.BoxGeometry(1.2,6.4,1.2),pM);c.position.set(x,3.2,z);g.add(c)}
     g.position.set(p.x,p.y,p.z);g.rotation.y=a;G.add(g);for(const x of [-(w+3),w+13.5])obs187(p.x+n.x*x,p.z+n.z*x,1.4)}}
   if(o==='nrl')return}
  const urb=o==='sp'||o==='sd',P={sp:.25,sd:.12,voies:.5,sg:.55,plaines:.95,laves:.12,volcan:.35}[o]||.4,lave=o==='laves';
  // les herbes hautes et les cannes du bord de route
  const herbe=[],arbre=[],tronc=[];
  for(let i=1;i<NP;i+=2)for(const s of [-1,1]){if(o==='volcan'&&i>NP*.45)continue;if(rnd(i*3+s)>P)continue;const off=s*(w+1.1+rnd(i+s*7)*4.5),f=at(i,off);if(!libre(f[0],f[2],.9))continue;
   herbe.push([f[0],f[1],f[2],rnd(i*5)*6,1.4+rnd(i*11+s)*(o==='plaines'?2.4:1.4),.55,['#3f6a26','#4f7a2c','#36581f','#6a7a34'][(i+s+3)%4]])}
  inst(touffe187(),new THREE.MeshLambertMaterial({color:0xffffff,side:THREE.DoubleSide}),herbe);
  const ruban=(i0,i1,off,h,mat,rep)=>{for(let i=i0;i<=i1;i++){const f=at(i,off);obs187(f[0],f[2],.9)}const pos=[],uv=[],idx=[];let d=0;for(let i=i0;i<=i1;i++){const f=at(i,off);if(i>i0)d+=RP[i].distanceTo(RP[i-1]);pos.push(f[0],f[1]-.2,f[2],f[0],f[1]+h,f[2]);uv.push(d/rep,0,d/rep,1);if(i<i1){const b=(i-i0)*2;idx.push(b,b+2,b+1,b+1,b+2,b+3)}}
   const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();G.add(new THREE.Mesh(g,mat))};
  // les haies et fourrés serrés qui bordent presque toutes les routes de l'île
  {const H=[];if(!lave&&o!=='volcan')for(let i=1;i<NP;i+=2)for(const s of [-1,1]){if(rnd(i*13+s*5)>P*.75)continue;const off=s*(w+2.2+rnd(i*7+s)*5),f=at(i,off);if(!libre(f[0],f[2],1.6))continue;const sc=1.1+rnd(i*3+s)*1.8;
    H.push([f[0],f[1]+sc*.45,f[2],rnd(i)*6,sc,1.25,['#2e5226','#3a6a2c','#28471f','#46772f'][(i+s+5)%4]])}
   inst(new THREE.IcosahedronGeometry(1,1).scale(1,.8,1),new THREE.MeshLambertMaterial({color:0xffffff,flatShading:true}),H)}
  // le mur de soutènement en moellons de basalte, côté montagne (Saint-Denis, Saint-Paul, les Hauts)
  if(o==='sd'||o==='sg'||o==='plaines'){const pierre=(()=>{const c=document.createElement('canvas');c.width=256;c.height=128;const x=c.getContext('2d');x.fillStyle='#3a3835';x.fillRect(0,0,256,128);
     for(let k=0;k<90;k++){const px=rnd(k*3)*256,py=rnd(k*7)*128,r=8+rnd(k*11)*12,v=70+Math.floor(rnd(k*13)*50);x.fillStyle='rgb('+v+','+(v-4)+','+(v-8)+')';x.beginPath();x.ellipse(px,py,r,r*.7,rnd(k)*3,0,7);x.fill()}
     const t=new THREE.CanvasTexture(c);t.wrapS=THREE.RepeatWrapping;t.encoding=THREE.sRGBEncoding;return t})(),mM=new THREE.MeshLambertMaterial({map:pierre,side:THREE.DoubleSide});
   let deb=-1;for(let i=2;i<NP-2;i++){const p=RP[i],n=RN[i],a=hR(p.x+n.x*22,p.z+n.z*22),b=hR(p.x-n.x*22,p.z-n.z*22),up=a>b?1:-1,ok=Math.abs(a-b)>2&&libre(...[at(i,up*(w+1.4))].map(f=>[f[0],f[2]])[0],1);
    if(ok&&deb<0)deb=i;if((!ok||i===NP-3)&&deb>=0){if(i-deb>8){const s=hR(RP[deb].x+RN[deb].x*22,RP[deb].z+RN[deb].z*22)>hR(RP[deb].x-RN[deb].x*22,RP[deb].z-RN[deb].z*22)?1:-1;ruban(deb,i,s*(w+1.4),2.6+rnd(deb)*1.6,mM,6)}deb=-1}}}
  // Saint-Denis : les longs murs blancs des cases créoles, avec leurs piliers
  if(o==='sd'){const bM=new THREE.MeshLambertMaterial({color:0xf1efe8,side:THREE.DoubleSide}),pil=[];for(let i=6;i<NP-20;){const s=-mer((NP/2)|0),L2=10+Math.floor(rnd(i)*20);let ok=true;for(let j=i;j<=i+L2;j+=3){const f=at(j,s*(w+3));if(!libre(f[0],f[2],2.5)){ok=false;break}}
    if(ok){ruban(i,i+L2,s*(w+3),2.1,bM,10);for(let j=i;j<=i+L2;j+=2){const f=at(j,s*(w+3));pil.push([f[0],f[1],f[2],cap(j)])}}i+=L2+6+Math.floor(rnd(i*9)*14)}
   inst(new THREE.BoxGeometry(.55,2.7,.55).translate(0,1.25,0),new THREE.MeshLambertMaterial({color:0xfaf8f2}),pil,.4)}
  // les passages piétons en ville
  if(urb){const Z2=[];for(let i=40;i<NP-10;i+=60){const p=RP[i],n=RN[i];for(let k=-3;k<=3;k++){const X=p.x+n.x*k*.95,Z=p.z+n.z*k*.95;Z2.push([X,p.y+.07,Z,cap(i)])}}inst(new THREE.BoxGeometry(.5,.02,3).translate(0,0,0),new THREE.MeshBasicMaterial({color:0xe9e6dc}),Z2)}
  // la route du volcan, d'après les vues de Bourg-Murat au Pas de Bellecombe : les cases aux toits rouges et leurs barrières blanches,
  // les pâturages clôturés au fil de fer, puis la forêt de cryptomérias, et partout les bornes blanches au bord de la chaussée
  if(o==='volcan'){const U=u=>Math.round(u*NP);
   {const B=[],R2=[];for(let i=2;i<U(.97);i+=4){if(i<U(.52)){const f=at(i,-(w+.9));if(libre(f[0],f[2],.6))B.push([f[0],f[1],f[2],cap(i)])}else for(const sd of [-1,1]){const f=at(i+(sd>0?2:0),sd*(w+.7));if(libre(f[0],f[2],.4))R2.push([f[0],f[1]+.15,f[2],rnd(i+sd)*6,.35+rnd(i*3+sd)*.15])}}
    inst(new THREE.BoxGeometry(.22,.75,.22).translate(0,.37,0),new THREE.MeshLambertMaterial({color:0xe9e7e0}),B,.2);inst(new THREE.DodecahedronGeometry(1,0),new THREE.MeshLambertMaterial({color:0xf2f0ea}),R2)}
   // la lande d'altitude : des branles gris-vert serrés, bas, de chaque côté de la route rouge
   {const H=[];for(let i=U(.46);i<U(.97);i+=1)for(const sd of [-1,1]){if(i>U(.69)&&i<U(.9))continue;if(rnd(i*11+sd)>.8)continue;const off=sd*(w+1.6+rnd(i*5+sd)*22),f=at(i,off);if(!libre(f[0],f[2],1.2))continue;const sc=.7+rnd(i+sd*3)*1.2;H.push([f[0],f[1]+sc*.35,f[2],rnd(i)*6,sc,1.3,['#222b1d','#2b3424','#1b2317','#323b28','#161d12'][(i+sd+5)%5]])}
    inst(new THREE.IcosahedronGeometry(1,1).scale(1,.7,1),new THREE.MeshLambertMaterial({color:0xffffff,flatShading:true}),H)}
   // les cases de Bourg-Murat
   const mM=[0xf1ece0,0xe9dfc6,0xf4f1ea,0xe6d8b8],tM=[0xc2452e,0xd0602e,0x9a3a2a,0x6a6e74],bar=[],pp=[];
   for(let i=4;i<U(.1);i+=6)for(const s of [-1,1]){if(rnd(i*3+s)>.55)continue;const off=s*(w+12+rnd(i+s)*14),f=at(i,off);if(!libre(f[0],f[2],9))continue;const g=new THREE.Group(),lx=8+rnd(i)*4,lz=7+rnd(i*5)*3;
    const m=new THREE.Mesh(new THREE.BoxGeometry(lx,3,lz),new THREE.MeshLambertMaterial({color:mM[(i+s+4)%4]}));m.position.y=1.5;g.add(m);const t=new THREE.Mesh(new THREE.CylinderGeometry(0,lz*.72,2.4,4,1),new THREE.MeshLambertMaterial({color:tM[(i*3+s+4)%4],flatShading:true}));t.rotation.y=Math.PI/4;t.scale.set(lx/lz,1,1);t.position.y=4.2;g.add(t);
    g.position.set(f[0],f[1],f[2]);g.rotation.y=cap(i);G.add(g);obsBoite187(f[0],f[2],lx,lz,cap(i));
    for(let j=i-3;j<=i+3;j++){const b=at(j,s*(w+3)),b2=at(j+1,s*(w+3));pp.push([b[0],b[1],b[2],cap(j)]);for(const h of [.45,.8,1.15])bar.push(b[0],b[1]+h,b[2],b2[0],b2[1]+h,b2[2])}}
   inst(new THREE.BoxGeometry(.14,1.3,.14).translate(0,.65,0),new THREE.MeshLambertMaterial({color:0xf6f6f2}),pp,.5);
   if(bar.length){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(bar,3));G.add(new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0xf6f6f2})))}
   // les pâturages : piquets de bois et fils de fer
   {const P2=[],fil=[];for(let i=U(.08);i<U(.32);i+=2)for(const s of [-1,1]){const f=at(i,s*(w+3.5)),f2=at(i+2,s*(w+3.5));if(!libre(f[0],f[2],2.5))continue;if(i%4===0)P2.push([f[0],f[1],f[2],rnd(i)*3]);for(const h of [.5,.95])fil.push(f[0],f[1]+h,f[2],f2[0],f2[1]+h,f2[2])}
    inst(new THREE.CylinderGeometry(.06,.08,1.2,5).translate(0,.6,0),new THREE.MeshLambertMaterial({color:0x6a5a44}),P2,1.1);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(fil,3));G.add(new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0x55524c})))}
   // la forêt de cryptomérias : des rangs serrés de grands conifères sombres, troncs nus en bas
   {const T=[],C=[];for(let i=U(.28);i<U(.52);i+=1)for(const s of [-1,1]){if(rnd(i*7+s)>.55)continue;const off=s*(w+4+rnd(i*3+s)*26),f=at(i,off);if(!libre(f[0],f[2],3.5))continue;const h=16+rnd(i+s*9)*12;
     T.push([f[0],f[1],f[2],0,h,1/h]);C.push([f[0],f[1]+h*.3,f[2],rnd(i)*6,h,.13,['#0f1e12','#142618','#0c180e'][(i+s+3)%3]])}
    inst(new THREE.CylinderGeometry(.25,.35,1,5).translate(0,.5,0),new THREE.MeshLambertMaterial({color:0x4a3a2e}),T,.55);inst(new THREE.ConeGeometry(1,.75,7).translate(0,.375,0),new THREE.MeshLambertMaterial({color:0xffffff,flatShading:true}),C)}}
  // le Barachois (Saint-Denis), d'après la perspective du nouvel aménagement : côté mer une large promenade avec sa piste cyclable,
  // des bancs, une barrière basse entre la route et les promeneurs ; les promeneurs viennent de pietons187
  if(o==='sd'){const sm=mer((NP/2)|0);G.userData.mer=sm;const pM=new THREE.MeshLambertMaterial({color:0x9a9890,side:THREE.DoubleSide});
   {const pos=[],idx=[];for(let i=0;i<=NP;i++){const a=at(i,sm*(w+1.4)),b=at(i,sm*(w+13));pos.push(a[0],RP[i].y+.18,a[2],b[0],RP[i].y+.18,b[2]);if(i<NP){const k=i*2;idx.push(k,k+2,k+1,k+1,k+2,k+3)}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();G.add(new THREE.Mesh(g,pM))}
   ligne(sm*(w+5),.08,false,0xf0eee8);ligne(sm*(w+7.6),.06,true,0xf0eee8);ligne(sm*(w+10.2),.08,false,0xf0eee8);
   const banc=[],bo=[];for(let i=6;i<NP-6;i+=9){const f=at(i,sm*(w+11.6));banc.push([f[0],RP[i].y+.18,f[2],cap(i)])}for(let i=2;i<NP-2;i+=2){const f=at(i,sm*(w+1.8));bo.push([f[0],RP[i].y+.18,f[2],cap(i)])}
   inst(new THREE.BoxGeometry(.6,.45,2.2).translate(0,.22,0),new THREE.MeshLambertMaterial({color:0xb8b4aa}),banc,.8);inst(new THREE.BoxGeometry(.08,.9,.08).translate(0,.45,0),new THREE.MeshLambertMaterial({color:0x3a3d40}),bo)}
  // les arbres : un tronc et un houppier rond, plus ou moins loin de la route
  // (route des Plaines : la forêt humide de l'Est, serrée jusqu'au bord, une canopée continue d'un vert vif, vue d'avion comme sur les vidéos)
  if(o==='plaines')for(let i=1;i<NP;i+=2)for(const s of [-1,1])for(let r=0;r<3;r++){if(rnd(i*5+s*3+r*17)>.8)continue;const off=s*(w+3.2+r*9+rnd(i*3+s+r)*8),f=at(i,off);if(!libre(f[0],f[2],3))continue;const h=3+rnd(i+s+r)*5,rr=2.6+rnd(i*9+s+r)*2.8;
   tronc.push([f[0],f[1],f[2],0,h,1.5/h]);arbre.push([f[0],f[1]+h+rr*.35,f[2],rnd(i+r)*6,rr,1.2,['#2f6a22','#3d7a26','#26591c','#4a8a2c','#356f20'][(i+s+r+9)%5]])}
  if(!lave)for(let i=3;i<NP;i+=5)for(const s of [-1,1]){if(o==='volcan'&&i>NP*.28)continue;if(rnd(i*7+s*13)>P*.8)continue;const off=s*(w+5+rnd(i*3+s)*26),f=at(i,off);if(!libre(f[0],f[2],4))continue;const h=4+rnd(i+s)*5,r=2+rnd(i*9+s)*2.6;
   tronc.push([f[0],f[1],f[2],0,h,1.5/h]);arbre.push([f[0],f[1]+h+r*.4,f[2],rnd(i)*6,r,1.15,['#24451f','#2d5424','#203d1c','#35582a'][(i+s+9)%4]])}
  inst(new THREE.CylinderGeometry(.16,.26,1,5).translate(0,.5,0),new THREE.MeshLambertMaterial({color:0x5a4632}),tronc,.45);
  inst(new THREE.IcosahedronGeometry(1,1).scale(1,.72,1),new THREE.MeshLambertMaterial({color:0xffffff,flatShading:true}),arbre);
  // cocotiers et vacoas, côté mer (front de mer, Saint-Paul, Saint-Denis, la 4 voies)
  if(urb||o==='sg'||o==='voies'){const fM=new THREE.MeshLambertMaterial({color:0x4f7d33,side:THREE.DoubleSide}),tM=new THREE.MeshLambertMaterial({color:0x7a6a52}),palme=new THREE.PlaneGeometry(.9,4.2).translate(0,2.1,0),fut=new THREE.CylinderGeometry(.17,.26,1,6).translate(0,.5,0),touffe=new THREE.ConeGeometry(.9,1.6,7).translate(0,.4,0);
   let n=0;for(let i=6;i<NP&&n<70;i+=7){if(rnd(i*17)>(urb?.75:.4))continue;const s=urb?mer(i):(rnd(i)>.5?1:-1),off=s*(w+(o==='sp'?8+rnd(i)*5:3+rnd(i)*8)),f=at(i,off);if(!libre(f[0],f[2],2.5))continue;const g=new THREE.Group();n++;
    if((o==='sd'||o==='sg')&&rnd(i*43)<.22){// araucaria : un tronc droit, des étages de branches qui rétrécissent
     const h=14+rnd(i)*8,t=new THREE.Mesh(fut,tM);t.scale.set(1.4,h,1.4);g.add(t);const aM=new THREE.MeshLambertMaterial({color:0x2c4a2a,flatShading:true});for(let k=0;k<7;k++){const r=2.6*(1-k/8),c=new THREE.Mesh(new THREE.ConeGeometry(r,1.6,7),aM);c.position.y=h*.3+k*(h*.7/7);g.add(c)}}
    else if(rnd(i*37)<.3){// latanier : un fût droit et une boule d'éventails
     const h=5+rnd(i*3)*5,t=new THREE.Mesh(fut,tM);t.scale.set(1.3,h,1.3);g.add(t);const ev=new THREE.CircleGeometry(1.5,10,-.9,1.8);for(let k=0;k<11;k++){const e=new THREE.Mesh(ev,fM);e.position.y=h;e.rotation.order='YXZ';e.rotation.y=k*.57+rnd(i+k);e.rotation.x=-.2-rnd(k*i+3)*1.1;g.add(e)}}
    else if(rnd(i*29)>.45){// cocotier : un fût penché, une couronne de palmes
     const h=8+rnd(i*3)*6,pen=(rnd(i*5)-.5)*.35,t=new THREE.Mesh(fut,tM);t.scale.set(1,h,1);t.rotation.z=pen;g.add(t);const top=new THREE.Vector3(-Math.sin(pen)*h,Math.cos(pen)*h,0);
     for(let k=0;k<8;k++){const pm=new THREE.Mesh(palme,fM);pm.position.copy(top);pm.rotation.order='YXZ';pm.rotation.y=k*Math.PI/4+rnd(i+k);pm.rotation.x=1.05+rnd(i*k+1)*.5;g.add(pm)}}
    else{// vacoa : un tronc court qui se ramifie, chaque branche finit en touffe de feuilles en lames
     const t=new THREE.Mesh(fut,tM);t.scale.set(1.2,3.2,1.2);g.add(t);for(let k=0;k<4;k++){const a=k*1.7+rnd(i+k),b=new THREE.Mesh(fut,tM);b.scale.set(.7,2.6,.7);b.position.y=3;b.rotation.set(Math.cos(a)*.6,0,Math.sin(a)*.6);g.add(b);
      const tf=new THREE.Mesh(touffe,new THREE.MeshLambertMaterial({color:0x5e8a3c,flatShading:true}));tf.position.set(-Math.sin(a*1)*0+(-Math.sin(Math.sin(a)*.6)*2.6),3+Math.cos(.6)*2.6,Math.sin(Math.cos(a)*.6)*2.6);tf.scale.set(1.4,1.3,1.4);g.add(tf);
      for(let r=0;r<5;r++){const l=new THREE.Mesh(palme,fM);l.scale.set(.25,.45,1);l.position.copy(tf.position);l.rotation.order='YXZ';l.rotation.y=r*1.26+a;l.rotation.x=.9;g.add(l)}}}
    g.position.set(f[0],f[1],f[2]);g.rotation.y=rnd(i*31)*6;G.add(g);obs187(f[0],f[2],.45)}}
  // le muret de béton côté ravine (routes des Hauts, Saint-Paul, le volcan) : des blocs de 2,5 m, joints visibles
  if(o==='plaines'||o==='sg'||lave){const L=[];for(let i=1;i<NP;i++){const p=RP[i],n=RN[i],a=hR(p.x+n.x*22,p.z+n.z*22),b=hR(p.x-n.x*22,p.z-n.z*22);if(Math.abs(a-b)<2.5&&!(o==='sg'))continue;const s=a<b?1:-1,f=at(i,s*(w+.55));f[1]=Math.max(f[1],p.y-.05);
    L.push([f[0],f[1],f[2],cap(i),1,1,i%2?'#9b9a92':'#8a8982'])}
   inst(new THREE.BoxGeometry(.32,.85,2.45).translate(0,.42,0),new THREE.MeshLambertMaterial({color:0xffffff}),L,1.25)}
  // les poteaux électriques et leurs fils qui pendent (pas sur la 4 voies, éclairée par ses mâts)
  if(o!=='voies'&&o!=='volcan'){const L=[],fil=[];let prev=null;const s0=urb?-mer(10):1;for(let i=3;i<NP;i+=16){const f=at(i,s0*(w+2.6));if(!libre(f[0],f[2],2)){prev=null;continue}L.push([f[0],f[1],f[2],cap(i)]);
    const top=[f[0],f[1]+8.6,f[2]];if(prev){for(const dx of [-.5,.5]){const n=RN[i];for(let k=0;k<6;k++){const u0=k/6,u1=(k+1)/6,P0=prev.map((v,j)=>v+(top[j]-v)*u0),P1=prev.map((v,j)=>v+(top[j]-v)*u1),sag=u=>-1.1*4*u*(1-u);fil.push(P0[0]+n.x*dx,P0[1]+sag(u0),P0[2]+n.z*dx,P1[0]+n.x*dx,P1[1]+sag(u1),P1[2]+n.z*dx)}}}prev=top}
   inst(new THREE.BoxGeometry(.28,9,.22).translate(0,4.5,0),new THREE.MeshLambertMaterial({color:0xb5b1a6}),L,.3);inst(new THREE.BoxGeometry(1.4,.12,.12).translate(0,8.6,0),new THREE.MeshLambertMaterial({color:0x6a6a6a}),L);
   if(fil.length){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(fil,3));G.add(new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0x1c1c1c})))}}
  if(!urb)return;
  // ---- la ville : murs tagués, hangars en tôle, immeubles blancs, garde-corps, panneaux, voitures garées
  const tag=(()=>{const c=document.createElement('canvas');c.width=1024;c.height=128;const x=c.getContext('2d');x.fillStyle='#b9b4a8';x.fillRect(0,0,1024,128);x.fillStyle='rgba(0,0,0,.06)';for(let k=0;k<1024;k+=64)x.fillRect(k,0,2,128);
   const AB='KAZMORYTEZLNOVASREKDU';let px=10;let k=0;while(px<1000){const n=3+Math.floor(rnd(k*7+1)*4);let s='';for(let j=0;j<n;j++)s+=AB[Math.floor(rnd(k*13+j)*AB.length)];const sz=46+rnd(k*3)*40;x.font='900 '+sz+'px Impact,Arial Black,sans-serif';
    const cl=['#1b1b1b','#2d5fd8','#e04a8a','#f0c030','#e8e8e8','#30a860','#d84a2a'][Math.floor(rnd(k*5)*7)];if(rnd(k*19)>.25){x.lineWidth=7;x.strokeStyle=cl==='#1b1b1b'?'#f4f4f4':'#141414';x.strokeText(s,px,100);x.fillStyle=cl;x.fillText(s,px,100)}
    px+=x.measureText(s).width+10+rnd(k*23)*60;k++}const t=new THREE.CanvasTexture(c);t.wrapS=THREE.RepeatWrapping;t.encoding=THREE.sRGBEncoding;return t})();
  const murM=new THREE.MeshLambertMaterial({map:tag,side:THREE.DoubleSide});
  for(let i=8;i<NP-30;){const s=-mer(i),L=12+Math.floor(rnd(i)*24);let ok=true;for(let j=i;j<=i+L;j+=3){const f=at(j,s*(w+3.2));if(!libre(f[0],f[2],2.5)){ok=false;break}}if(ok&&rnd(i*41)<(o==='sd'?.15:.6))ruban(i,i+L,s*(w+3.2),2.4,murM,24);i+=L+10+Math.floor(rnd(i*3)*30)}
  // hangars en tôle et immeubles blancs du côté ville
  const tole=(()=>{const c=document.createElement('canvas');c.width=64;c.height=64;const x=c.getContext('2d');for(let k=0;k<64;k+=4){x.fillStyle=k%8?'#c9cbc8':'#aeb1ae';x.fillRect(k,0,4,64)}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(6,1);return t})();
  const fen=(()=>{const c=document.createElement('canvas');c.width=128;c.height=128;const x=c.getContext('2d');x.fillStyle='#ece8de';x.fillRect(0,0,128,128);for(let a=0;a<4;a++)for(let b=0;b<4;b++){x.fillStyle=ET.h==='nuit'&&(a*3+b)%4===0?'#f2c46a':'#5d6a74';x.fillRect(8+a*32,10+b*32,18,16);x.fillStyle='#d8d2c4';x.fillRect(4+a*32,28+b*32,26,3)}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.encoding=THREE.sRGBEncoding;return t})();
  for(let i=10,k=0;i<NP-10;i+=9,k++){const s=-mer(i),off=s*(w+26+rnd(i*7)*28),f=at(i,off);if(!libre(f[0],f[2],20)||rnd(i*53)>.7)continue;
   if(rnd(i*61)<.25){const b=new THREE.Mesh(new THREE.BoxGeometry(18,6,12),[new THREE.MeshLambertMaterial({map:tole}),new THREE.MeshLambertMaterial({map:tole}),new THREE.MeshLambertMaterial({color:0x3a5a9a}),new THREE.MeshLambertMaterial({color:0x888888}),new THREE.MeshLambertMaterial({map:tole}),new THREE.MeshLambertMaterial({map:tole})]);b.position.set(f[0],f[1]+3,f[2]);b.rotation.y=cap(i);G.add(b);obsBoite187(f[0],f[2],18,12,cap(i));continue}
   const h=9+Math.floor(rnd(i*13)*5)*3,lx=12+rnd(i)*12,lz=10+rnd(i*2)*6,t=fen.clone();t.needsUpdate=true;t.repeat.set(lx/8,h/8);const m=new THREE.MeshLambertMaterial({map:t,color:['#ffffff','#f3ead8','#eadfca','#f6f1e8'][k%4]});
   const b=new THREE.Mesh(new THREE.BoxGeometry(lx,h,lz),[m,m,new THREE.MeshLambertMaterial({color:0xcfc8bb}),m,m,m]);b.position.set(f[0],f[1]+h/2-.3,f[2]);b.rotation.y=cap(i);G.add(b);obsBoite187(f[0],f[2],lx,lz,cap(i))}
  // garde-corps en fer entre la chaussée et le trottoir (des tronçons), et la ligne jaune côté ville
  {const po=[],rail=[];for(let i=4;i<NP-4;i++){if(((i/40)|0)%3===2)continue;for(const s of [-1,1]){const f=at(i,s*(w+.9));if(!libre(f[0],f[2],.6))continue;if(i%2===0)po.push([f[0],f[1],f[2],cap(i)]);const g2=at(i+1,s*(w+.9));rail.push(f[0],f[1]+1.05,f[2],g2[0],g2[1]+1.05,g2[2])}}
   inst(new THREE.BoxGeometry(.07,1.1,.07).translate(0,.55,0),new THREE.MeshLambertMaterial({color:0x2d3033}),po,.85);if(rail.length){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(rail,3));G.add(new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0x2d3033})))}}
  // panneaux « 70 » (ou 50 en ville dense), à droite dans le sens de la marche
  {const c=document.createElement('canvas');c.width=128;c.height=256;const x=c.getContext('2d');x.fillStyle='#fff';x.strokeStyle='#d01e1e';x.lineWidth=12;x.beginPath();x.moveTo(64,10);x.lineTo(118,104);x.lineTo(10,104);x.closePath();x.fill();x.stroke();x.fillStyle='#111';x.font='bold 54px Arial';x.textAlign='center';x.fillText('!',64,92);
   x.beginPath();x.arc(64,186,56,0,7);x.fillStyle='#fff';x.fill();x.lineWidth=14;x.stroke();x.fillStyle='#111';x.font='bold 56px Arial';x.textBaseline='middle';x.fillText(o==='sd'?'50':'70',64,190);const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;
   const pm=new THREE.MeshBasicMaterial({map:t,transparent:true,side:THREE.DoubleSide}),pl=new THREE.PlaneGeometry(1,2),mt=new THREE.CylinderGeometry(.04,.04,2.2,5),mm=new THREE.MeshLambertMaterial({color:0x888888});
   for(let i=30;i<NP-10;i+=110){const f=at(i,-(w+1.4));if(!libre(f[0],f[2],1))continue;const g=new THREE.Group();const m=new THREE.Mesh(mt,mm);m.position.y=1.1;g.add(m);const p=new THREE.Mesh(pl,pm);p.position.y=3.1;g.add(p);g.position.set(f[0],f[1],f[2]);g.rotation.y=cap(i)+Math.PI;G.add(g)}}
  // des voitures garées côté mer
  {const corps=[],cab=[];for(let i=20;i<NP-10;i+=5){if(o==='sd'||rnd(i*71)>.35)continue;const s=mer(i),f=at(i,s*(w+10.5+rnd(i)*2));if(!libre(f[0],f[2],8))continue;const c=['#e8e8e8','#b8bcc2','#2c2f36','#9a1e1e','#3a5a8a','#d8d8d0'][Math.floor(rnd(i*3)*6)];
   corps.push([f[0],f[1],f[2],cap(i)+(rnd(i)>.5?Math.PI/2:0),1,1,c]);cab.push([f[0],f[1],f[2],cap(i)+(rnd(i)>.5?Math.PI/2:0),1,1,'#222831'])}
   inst(new THREE.BoxGeometry(1.8,.8,4.2).translate(0,.62,0),new THREE.MeshLambertMaterial({color:0xffffff}),corps,1.5);inst(new THREE.BoxGeometry(1.6,.6,2.2).translate(0,1.3,-.2),new THREE.MeshLambertMaterial({color:0xffffff}),cab)}}
 function volcan187(){const rand=(a)=>{let x=Math.sin(a*12.9898)*43758.5453;return x-Math.floor(x)};const at=(u,o)=>{const i=Math.min(NP,Math.max(0,Math.round(u*NP))),p=RP[i],n=RN[i];return new THREE.Vector3(p.x+n.x*o,hR(p.x+n.x*o,p.z+n.z*o),p.z+n.z*o)};
  // la forêt (tamarins des Hauts, cryptomérias) au début, puis la colline d'herbe, puis la plaine rouge sans arbres
  const tr=new THREE.InstancedMesh(new THREE.ConeGeometry(2.4,9,7),new THREE.MeshLambertMaterial({color:0x2c4a2a}),260),q=new THREE.Object3D();let nt=0;for(let k=0;k<260;k++){const u=rand(k)*.33,o=(rand(k+7)>.5?1:-1)*(larg()/2+4+rand(k+3)*40),v=at(u,o);q.position.set(v.x,v.y+4,v.z);q.scale.setScalar(.7+rand(k+9)*.8);q.updateMatrix();tr.setMatrixAt(nt++,q.matrix)}tr.count=nt;/* remplacés par les cryptomérias à l'échelle réelle (bordure187) */tr.dispose&&tr.dispose();
  const rk=new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1.4,0),new THREE.MeshLambertMaterial({color:0xffffff}),220),c2=new THREE.Color();for(let k=0;k<220;k++){const u=.55+rand(k+50)*.4,o=(rand(k+51)>.5?1:-1)*(larg()/2+3+rand(k+52)*60),v=at(u,o);q.position.set(v.x,v.y+.4,v.z);q.rotation.set(rand(k)*3,rand(k+1)*3,0);q.scale.setScalar(.5+rand(k+53)*1.6);q.updateMatrix();rk.setMatrixAt(k,q.matrix);rk.setColorAt(k,c2.setHSL(.03,.55,.22+rand(k+54)*.12))}ETG.add(rk);
  // la faune du volcan : les tec-tec posés sur les roches (ils s'envolent quand on passe), un papangue qui plane
  const oiseau=(c,ail)=>{const cv2=document.createElement('canvas');cv2.width=cv2.height=64;const x=cv2.getContext('2d');x.fillStyle=c;if(ail){x.beginPath();x.moveTo(4,30);x.quadraticCurveTo(20,18,32,30);x.quadraticCurveTo(44,18,60,30);x.quadraticCurveTo(44,26,32,36);x.quadraticCurveTo(20,26,4,30);x.fill()}else{x.beginPath();x.ellipse(32,38,12,9,0,0,7);x.fill();x.beginPath();x.arc(42,28,6,0,7);x.fill();x.fillStyle='#f0e6d0';x.beginPath();x.ellipse(30,42,7,4,0,0,7);x.fill()}return new THREE.CanvasTexture(cv2)};
  const tt=oiseau('#3a2a22',0);ETG.userData.oiseaux=[];for(let k=0;k<14;k++){const u=.5+rand(k+80)*.42,o=(rand(k+81)>.5?1:-1)*(larg()/2+2+rand(k+82)*8),v=at(u,o);const m=new THREE.Sprite(new THREE.SpriteMaterial({map:tt}));m.position.set(v.x,v.y+1.2,v.z);m.scale.set(1.2,1.2,1);m.userData.y0=v.y+1.2;m.userData.ph=k;ETG.add(m);ETG.userData.oiseaux.push(m)}
  const pp=new THREE.Sprite(new THREE.SpriteMaterial({map:oiseau('#4a3a30',1)}));pp.scale.set(7,7,1);ETG.add(pp);ETG.userData.pap=pp;
  // l'arrivée : le parking et le gîte du volcan
  const jf=Math.round(NP*.985),fin=at(.985,0),nf=RN[jf],yf=RP[jf].y;const park=new THREE.Mesh(new THREE.PlaneGeometry(40,26),new THREE.MeshLambertMaterial({color:0x4a4a4c}));park.rotation.x=-Math.PI/2;park.position.set(fin.x+nf.x*24,yf+.07,fin.z+nf.z*24);ETG.add(park);
  [0xd0d0d0,0x2a5a9a,0x9a2a2a].forEach((c,k)=>{const v=new THREE.Mesh(new THREE.BoxGeometry(2,1.3,4.2),new THREE.MeshLambertMaterial({color:c}));v.position.set(park.position.x-12+k*6,yf+.7,park.position.z-6);ETG.add(v)});
  const gite=new THREE.Group();const mur=new THREE.Mesh(new THREE.BoxGeometry(18,5,9),new THREE.MeshLambertMaterial({color:0xe8e0cc}));mur.position.y=2.5;gite.add(mur);const toit=new THREE.Mesh(new THREE.ConeGeometry(12,4,4),new THREE.MeshLambertMaterial({color:0x9a3a2a}));toit.rotation.y=Math.PI/4;toit.scale.set(1,1,.55);toit.position.y=7;gite.add(toit);
  const pan=document.createElement('canvas');pan.width=256;pan.height=64;const px=pan.getContext('2d');px.fillStyle='#5a3a1a';px.fillRect(0,0,256,64);px.fillStyle='#f3e6c4';px.font='600 26px system-ui';px.textAlign='center';px.fillText('Gîte du volcan',128,42);const ps=new THREE.Mesh(new THREE.PlaneGeometry(8,2),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(pan)}));ps.position.set(0,5.6,4.6);gite.add(ps);
  gite.position.set(fin.x-nf.x*30,yf,fin.z-nf.z*30);gite.lookAt(fin.x,yf,fin.z);ETG.add(gite)}
 const ligne=(o,lg,tiret,c)=>{const pos=[],idx=[];let n0=0;for(let i=0;i<NP;i++){if(tiret&&(i%6>2))continue;if(ET.volcan&&i/NP>.5)continue;const A=RP[i],B=RP[i+1],nA=RN[i],nB=RN[i+1],oa=typeof o==='function'?o(i/NP):o,ob=typeof o==='function'?o((i+1)/NP):o;
   pos.push(A.x+nA.x*(oa-lg),A.y+.09,A.z+nA.z*(oa-lg),A.x+nA.x*(oa+lg),A.y+.09,A.z+nA.z*(oa+lg),B.x+nB.x*(ob-lg),B.y+.09,B.z+nB.z*(ob-lg),B.x+nB.x*(ob+lg),B.y+.09,B.z+nB.z*(ob+lg));idx.push(n0,n0+2,n0+1,n0+1,n0+2,n0+3);n0+=4}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);ETG.add(new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:c})))};
 let ASPH=null;function ASPH187(){if(ASPH)return ASPH;const c=document.createElement('canvas');c.width=128;c.height=512;const x=c.getContext('2d');x.fillStyle='#c4c4c4';x.fillRect(0,0,128,512);
   for(let k=0;k<40;k++){x.fillStyle='rgba('+(Math.random()>.5?'255,255,255':'0,0,0')+','+(.04+Math.random()*.06)+')';x.beginPath();x.ellipse(Math.random()*128,Math.random()*512,8+Math.random()*30,20+Math.random()*80,0,0,7);x.fill()}
   for(const cx of [34,94]){const g=x.createLinearGradient(cx-14,0,cx+14,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.5,'rgba(0,0,0,.16)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(cx-14,0,28,512)}
   const im=x.getImageData(0,0,128,512),d=im.data;for(let k=0;k<d.length;k+=4){const v=(Math.random()-.5)*60;d[k]+=v;d[k+1]+=v;d[k+2]+=v}x.putImageData(im,0,0);
   for(let k=0;k<6;k++){x.strokeStyle='rgba(20,20,20,.35)';x.lineWidth=1;x.beginPath();let px=Math.random()*128,py=Math.random()*512;x.moveTo(px,py);for(let j=0;j<6;j++){px+=(Math.random()-.5)*20;py+=Math.random()*20;x.lineTo(px,py)}x.stroke()}
   ASPH=new THREE.CanvasTexture(c);ASPH.wrapS=ASPH.wrapT=THREE.RepeatWrapping;ASPH.anisotropy=8;return ASPH}
 // le détail du sol : un grain d'herbe et de terre qui se répète tous les quelques mètres, mêlé à l'image satellite (sinon le sol est flou de près)
 const DET=(()=>{const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');const im=x.createImageData(256,256),d=im.data;for(let k=0;k<d.length;k+=4){const v=150+Math.random()*105;d[k]=v;d[k+1]=150+Math.random()*105;d[k+2]=v;d[k+3]=255}x.putImageData(im,0,0);
   for(let k=0;k<900;k++){x.strokeStyle='rgba('+(Math.random()>.6?'255,255,240':'40,50,20')+',.35)';x.lineWidth=1.2;const px=Math.random()*256,py=Math.random()*256;x.beginPath();x.moveTo(px,py);x.lineTo(px+(Math.random()-.5)*5,py-3-Math.random()*7);x.stroke()}
   for(let k=0;k<60;k++){x.fillStyle='rgba(0,0,0,'+(.05+Math.random()*.08)+')';x.beginPath();x.arc(Math.random()*256,Math.random()*256,6+Math.random()*24,0,7);x.fill()}
   const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;return t})();
 const solM=new THREE.MeshLambertMaterial({color:0x6a7a50});let SATT=null;
 // l'image satellite à 10 m le long de la route de l'étape (Sentinel-2), posée par-dessus l'image de toute l'île, fondue sur les bords
 const HI={hiMap:{value:null},hiA:{value:new THREE.Vector2(1,1)},hiB:{value:new THREE.Vector2(0,0)},hiOn:{value:0}},HIC={};
 solM.onBeforeCompile=sh=>{Object.assign(sh.uniforms,HI);sh.uniforms.detMap={value:DET};sh.vertexShader='varying vec2 vWp;\n'+sh.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvWp=(modelMatrix*vec4(transformed,1.)).xz;');sh.fragmentShader='uniform sampler2D hiMap,detMap;uniform vec2 hiA,hiB;uniform float hiOn;varying vec2 vWp;\n'+sh.fragmentShader.replace('#include <map_fragment>','#ifdef USE_MAP\nvec4 texelColor=texture2D(map,vUv);vec2 hu=vUv*hiA+hiB;if(hiOn>.5&&hu.x>0.&&hu.x<1.&&hu.y>0.&&hu.y<1.){float e=min(min(hu.x,1.-hu.x),min(hu.y,1.-hu.y));texelColor=mix(texelColor,texture2D(hiMap,hu),smoothstep(0.,.04,e));}texelColor=mapTexelToLinear(texelColor);diffuseColor*=texelColor;\n#endif\nvec4 dt1=texture2D(detMap,vWp*.33),dt2=texture2D(detMap,vWp*.041+.37);diffuseColor.rgb*=mix(.62,1.22,dt1.g)*mix(.8,1.12,dt2.r);')};
 function hi187(k,W0,H0){try{const S=typeof SAT187!=='undefined'&&SAT187[k];if(!S){HI.hiOn.value=0;return}const [b0,b1,b2,b3]=S.b,kx=DEM.kx,ky=DEM.ky;
   HI.hiA.value.set(W0/kx/(b2-b0),-H0/ky/(b3-b1));HI.hiB.value.set((-MAR/kx+DEM.lo0-b0)/(b2-b0),(b3-DEM.la1+(H0-MAR)/ky)/(b3-b1));
   const go=tx=>{HI.hiMap.value=tx;HI.hiOn.value=1};if(HIC[k])return go(HIC[k]);HI.hiOn.value=0;const im=new Image();im.onload=()=>{const tx=new THREE.Texture(im);tx.encoding=THREE.sRGBEncoding;tx.flipY=false;tx.anisotropy=8;tx.needsUpdate=true;HIC[k]=tx;if(ET&&ET.osm===k)go(tx)};im.src=S.j}catch(e){HI.hiOn.value=0}}
 if(typeof SATJ!=='undefined'){const im=new Image();im.onload=()=>{const tx=new THREE.Texture(im);tx.encoding=THREE.sRGBEncoding;tx.flipY=false;tx.anisotropy=8;tx.needsUpdate=true;SATT=tx;solM.map=tx;solM.color.set(0xffffff);solM.needsUpdate=true};im.src=SATJ}
 const mer=new THREE.Mesh(new THREE.PlaneGeometry(40000,40000),new THREE.MeshLambertMaterial({color:0x123a55}));mer.rotation.x=-Math.PI/2;mer.position.y=-.5;sc.add(mer);
 const lum=[],clubs=[];let fest=null;const tg=(c)=>{const cv2=document.createElement('canvas');cv2.width=cv2.height=64;const x=cv2.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,c);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(cv2)};
 const tOr=tg('rgba(255,190,110,1)');const CLUB=[['séga mauricien','#ff7a3a','sega'],['électro','#3ad0ff','electro'],['disco','#ff4ad0','disco'],['maloya','#ffd23a','maloya'],['dancehall','#6aff5a','dancehall']];
 // ---- la voiture : une petite berline, feux arrière rouges, phares
 const car=new THREE.Group(),carS=new THREE.Group(),carR=new THREE.Group(),carH=new THREE.Group(),carP=new THREE.Group(),carC=new THREE.Group(),rouesR=[];let choixV='subaru';try{choixV=localStorage.getItem('songe_voiture')||'subaru'}catch(e){}
 {
  // la Subaru Impreza de Paris : son modèle imprimé, à l'échelle réelle (4,34 m) ; repli sur la voiture en blocs si les données manquent
  const bati=(V,FW,Lm,grp)=>{if(!V)return false;const lo=V.lo,hi=V.hi,S=Lm/(hi[0]-lo[0]);
   V.g.forEach(g=>{const b=atob(g.p),u=new Uint8Array(b.length);for(let k=0;k<b.length;k++)u[k]=b.charCodeAt(k);const q=new Int16Array(u.buffer),n=q.length/3,pos=new Float32Array(n*3);
    for(let k=0;k<n;k++){const mx=lo[0]+(q[k*3]+32768)/65535*(hi[0]-lo[0]),my=lo[1]+(q[k*3+1]+32768)/65535*(hi[1]-lo[1]),mz=lo[2]+(q[k*3+2]+32768)/65535*(hi[2]-lo[2]);pos[k*3]=FW*my*S;pos[k*3+1]=(mz-lo[2])*S;pos[k*3+2]=FW*mx*S}
    const bi=atob(g.i),ui=new Uint8Array(bi.length);for(let k=0;k<bi.length;k++)ui[k]=bi.charCodeAt(k);const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));geo.setIndex(new THREE.BufferAttribute(new Uint16Array(ui.buffer),1));geo.computeVertexNormals();
    const m=new THREE.Mesh(geo,new THREE.MeshPhongMaterial({color:new THREE.Color(g.c),shininess:(g.c==='#16287a'||g.c==='#1a2a6e')?60:25,specular:0x555555,side:THREE.DoubleSide}));grp.add(m)});car.add(grp);return true};window.BATI187=bati;
  const subaru=()=>bati(typeof VOIT187!=='undefined'&&VOIT187,VOIT187_AV,4.34,carS);try{bati(typeof VOIT187_911!=='undefined'&&VOIT187_911,VOIT187_PAV,VOIT187_911.L,carP)}catch(e){}try{bati(typeof VOIT187_CAY!=='undefined'&&VOIT187_CAY,VOIT187_CAV,VOIT187_CAY.L,carC)}catch(e){}
  if(!subaru()){const caisse=new THREE.Mesh(new THREE.BoxGeometry(2,.7,4.2),new THREE.MeshLambertMaterial({color:0xb02a20}));caisse.position.y=.75;car.add(caisse);const hab=new THREE.Mesh(new THREE.BoxGeometry(1.7,.6,2.1),new THREE.MeshLambertMaterial({color:0x22262c}));hab.position.set(0,1.35,-.2);car.add(hab);
  const roue=new THREE.CylinderGeometry(.38,.38,.3,14).rotateZ(Math.PI/2),rm=new THREE.MeshLambertMaterial({color:0x111111});[[-1,-1.4],[1,-1.4],[-1,1.4],[1,1.4]].forEach(([a,b])=>{const r=new THREE.Mesh(roue,rm);r.position.set(a*.98,.38,b);car.add(r)})}
  const feu=new THREE.Mesh(new THREE.BoxGeometry(1.7,.15,.05),new THREE.MeshBasicMaterial({color:0xff2a1a}));feu.position.set(0,.95,-2.12);if(typeof VOIT187==='undefined')car.add(feu);const fr=new THREE.Sprite(new THREE.SpriteMaterial({map:tg('rgba(255,40,20,1)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));fr.position.set(0,.85,-2.35);fr.scale.set(2.6,.8,1);fr.material.opacity=.55;car.add(fr);
  const ph=new THREE.SpotLight(0xfff2d0,1.4,90,.5,.6);ph.position.set(0,1,2.2);ph.target.position.set(0,0,20);car.add(ph,ph.target)}
 sc.add(car);
 // la Renault 5 Turbo (Valtiel, CC BY 4.0) : son modèle low-poly et sa texture en gros pixels, ses roues qui tournent
 if(typeof VOIT187_R5==='string'&&THREE.GLTFLoader){try{const bs=atob(VOIT187_R5),u=new Uint8Array(bs.length);for(let k=0;k<bs.length;k++)u[k]=bs.charCodeAt(k);new THREE.GLTFLoader().parse(u.buffer,'',g=>{const o=g.scene;
   o.traverse(x=>{if(x.isMesh){x.frustumCulled=false;const m=x.material;if(m&&m.map){m.map.magFilter=THREE.NearestFilter;m.map.needsUpdate=true}}if(/Wheel/.test(x.name)&&!/Object/.test(x.name))rouesR.push(x)});
   o.updateMatrixWorld(true);const bb=new THREE.Box3().setFromObject(o);const L=bb.max.x-bb.min.x;o.scale.setScalar(3.66/L);o.rotation.y=VOIT187_R5AV>0?-Math.PI/2:Math.PI/2;o.position.y=-bb.min.y*3.66/L;carR.add(o);car.add(carR);vET=null},e=>{})}catch(e){}}
 // pas de choix : la voiture change avec la route — la R5 en ville, la Porsche sur les grandes routes (la 911 Turbo sur la 4 voies et la route du Littoral,
 // le Cayenne sur la route des laves), la Subaru dans ce qui monte (Saint-Gilles, les Plaines), et la Toyota pour finir, au volcan
 const VPE={sp:'r5',sd:'r5',voies:'p911',nrl:'p911',laves:'cay',sg:'subaru',plaines:'subaru',volcan:'hilux'};let vET=null;
 const NOMV={r5:['Renault 5 Turbo','Renault 5 Turbo – Low-Poly PS1 Style Car, par Valtiel (Sketchfab), CC BY 4.0'],p911:['Porsche 911 Turbo (1975)','Porsche 911 (930) Turbo 1975, par vecarz (Sketchfab), CC BY-NC-SA 4.0'],cay:['Porsche Cayenne Turbo (2005)','Porsche Cayenne Turbo 2005, par CCamo (Sketchfab), CC BY 4.0'],subaru:['Subaru Impreza',''],hilux:['Toyota Hilux','Toyota Hilux Low Poly, par sebodeweb (Sketchfab), CC BY 4.0']};
 function glb187(b64,Lm,FW,grp){try{const bs=atob(b64),u=new Uint8Array(bs.length);for(let k=0;k<bs.length;k++)u[k]=bs.charCodeAt(k);new THREE.GLTFLoader().parse(u.buffer,'',g=>{const o=g.scene;o.traverse(x=>{if(x.isMesh)x.frustumCulled=false});
   const w=new THREE.Group();w.add(o);w.updateMatrixWorld(true);let bb=new THREE.Box3().setFromObject(w);const dx=bb.max.x-bb.min.x,dz=bb.max.z-bb.min.z;if(dx>dz)o.rotation.y=Math.PI/2;if(FW<0)o.rotation.y+=Math.PI;w.updateMatrixWorld(true);bb=new THREE.Box3().setFromObject(w);
   const S=Lm/(bb.max.z-bb.min.z);w.scale.setScalar(S);const c=bb.getCenter(new THREE.Vector3());w.position.set(-c.x*S,-bb.min.y*S,-c.z*S);grp.add(w);car.add(grp);vET=null},e=>{})}catch(e){}}
 if(typeof VOIT187_HL==='string'&&THREE.GLTFLoader)glb187(VOIT187_HL,5.0,VOIT187_HLAV,carH);
 function voiture(n){const G={r5:carR,p911:carP,cay:carC,subaru:carS,hilux:carH};if(!G[n]||!G[n].children.length)n='subaru';choixV=n;for(const k in G)G[k].visible=k===n;
  const c=document.getElementById('credV187');if(c){c.textContent=NOMV[n][1];c.style.display=NOMV[n][1]?'block':'none'}const b=document.getElementById('btV187');if(b)b.textContent='Voiture : '+NOMV[n][0]}
 // la circulation : d'autres voitures (Golf, Civic, 2CV, Mustang, Audi TT, Odyssey, Crafter, une concept-car), décimées, sens de marche vérifié par leurs feux arrière
 const TRAFM=[];[['T_CONCEPT',1],['T_GOLF',-1],['T_CIVIC',1],['T_ODYSSEY',1],['T_CRAFTER',1],['T_2CV',1],['T_MUSTANG',1],['T_AUDITT',1]].forEach(([n,fw])=>{try{const V=window['VOIT187_'+n]||eval('typeof VOIT187_'+n+"!=='undefined'?VOIT187_"+n+':null');if(!V)return;const g=new THREE.Group();window.BATI187(V,fw,V.L,g);car.remove(g);TRAFM.push(g)}catch(e){}});
 window.MOD187=()=>TRAFM.length?TRAFM:[carR,carP,carC,carS,carH].filter(g=>g.children.length);
 function voitureEtape(){if(ET===vET)return;vET=ET;voiture(VPE[ET.osm]||'subaru')}
 voiture('subaru');
 // ---- la musique : des rythmes joués par le jeu (pas d'enregistrement), un style par boîte de nuit ; puis le moteur et le vent
 let AC=null,mg=null,mot=null,motG=null,style='',pas16=0,tNext=0;try{AC=new (window.AudioContext||window.webkitAudioContext)();mg=AC.createGain();mg.gain.value=.0;mg.connect(AC.destination);mot=AC.createOscillator();mot.type='sawtooth';motG=AC.createGain();motG.gain.value=0;const lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=600;mot.connect(lp);lp.connect(motG);motG.connect(AC.destination);mot.start()}catch(e){AC=null}
 const bruitB=AC?(()=>{const b=AC.createBuffer(1,AC.sampleRate*.3,AC.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;return b})():null;
 const coup=(t,f,dur,v,type)=>{if(!AC)return;const o=AC.createOscillator(),g=AC.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(!type)o.frequency.exponentialRampToValueAtTime(Math.max(30,f*.4),t+dur);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);o.connect(g);g.connect(mg);o.start(t);o.stop(t+dur+.02)};
 const souffle=(t,dur,v,hp)=>{if(!AC)return;const s=AC.createBufferSource();s.buffer=bruitB;const f=AC.createBiquadFilter();f.type='highpass';f.frequency.value=hp||6000;const g=AC.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);s.connect(f);f.connect(g);g.connect(mg);s.start(t);s.stop(t+dur+.02)};
 const RYT={sega:{bpm:132,n:12,f:(k,t,d)=>{if(k%6===0)coup(t,70,.25,.8);if(k%6===3)coup(t,140,.12,.35);souffle(t,.06,k%3===0?.22:.1,5000);if(k%12===9)coup(t,1800,.4,.06,'triangle')}},
  electro:{bpm:128,n:16,f:(k,t,d)=>{if(k%4===0)coup(t,60,.3,.9);if(k%4===2)souffle(t,.05,.18,8000);if(k%2===1)coup(t,[55,55,65,49][(k>>2)%4]*2,.18,.12,'sawtooth')}},
  disco:{bpm:118,n:16,f:(k,t,d)=>{if(k%4===0)coup(t,62,.28,.85);if(k%4===2)souffle(t,.14,.2,6000);coup(t,[82,164][k%2]*(k%8<4?1:1.12),.14,.13,'square')}},
  maloya:{bpm:120,n:12,f:(k,t,d)=>{if(k%12===0||k%12===7)coup(t,55,.4,.95);if(k%12===4||k%12===10)coup(t,95,.2,.5);souffle(t,.07,.12+(k%3===0?.1:0),4000);if(k%24===18)coup(t,196,.5,.08,'sine')}},
  dancehall:{bpm:96,n:16,f:(k,t,d)=>{if(k%16===0||k%16===6||k%16===10)coup(t,58,.3,.9);if(k%8===4)souffle(t,.12,.3,2500);if(k%2===0)souffle(t,.03,.08,9000)}}};
 const musique=t=>{if(!AC||!style||!RYT[style])return;const r=RYT[style],dt=60/r.bpm/(r.n===12?3:4);while(tNext<t+.12){r.f(pas16%r.n,Math.max(tNext,t),dt);pas16++;tNext+=dt}};
 // ---- l'état du jeu
 const st={i:0,s:0,o:0,v:0,phase:'film',ft:0,et:-1,temps:0,fini:0};let K2={};
 // le passage d'une étape à l'autre : un vrai fondu au noir (la voiture continue de rouler), puis on rouvre sur l'étape suivante à la même vitesse
 const noir=document.createElement('div');noir.style.cssText='position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;transition:opacity .55s ease';d.appendChild(noir);
 const fondu=(on)=>{noir.style.opacity=on?1:0};
 const key=(e,v)=>{const k=e.key.toLowerCase();// accélérer : espace ou 0 du pavé numérique ; freiner : Ctrl ou point du pavé ; diriger : Q/D ou les flèches (Z/S et haut/bas restent)
  const m={numpad0:'a',numpaddecimal:'f',controlleft:'f',controlright:'f',space:'a',shiftleft:'m',shiftright:'m',numpadenter:'m'}[(e.code||'').toLowerCase()]||{arrowleft:'g',q:'g',a:'g',arrowright:'d',d:'d',arrowup:'a',z:'a',w:'a',arrowdown:'f',s:'f',' ':'a',control:'f'}[k];if(m){K2[m]=v;e.preventDefault();e.stopPropagation()}if(v&&k==='h'){aide.style.opacity=aide.style.opacity==='0'?'1':'0'}if(v&&k==='escape'){fermer(false)}};
 const kd=e=>key(e,1),ku=e=>key(e,0);addEventListener('keydown',kd,true);addEventListener('keyup',ku,true);
 cmd.querySelectorAll('[data-r]').forEach(b=>{const k=b.dataset.r;b.onpointerdown=e=>{K2[k]=1;e.preventDefault()};b.onpointerup=b.onpointerleave=()=>{K2[k]=0}});qb.onclick=()=>fermer(false);
 let stop=false;function fermer(ok){if(stop)return;stop=true;removeEventListener('keydown',kd,true);removeEventListener('keyup',ku,true);try{if(AC)AC.close()}catch(e){}setTimeout(()=>{d.remove();window.BTUON=0;window.FILM=0;try{R.dispose()}catch(e){}if(fin)fin(ok)},ok?2500:300)}
 const taille=()=>{const w=d.clientWidth,h=d.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()};taille();addEventListener('resize',taille);
 // ---- le ciel et la lumière selon l'étape : la nuit s'allume, l'aube, le grand jour, le rouge de la Plaine des Sables
 const ciel=new THREE.Color(),cN=new THREE.Color(0x0b1020),cA=new THREE.Color(0xf0a878),cJ=new THREE.Color(0xa9cfe0),cS=new THREE.Color(0xd8b8a0);
 const cB=new THREE.Color(0x1a2a50),cO=new THREE.Color(0xe8a070);
 function lumiere(u,vie){const h0=ET.h;let c,h,s2;if(h0==='nuit'){c=cN;h=.16+.24*vie;s2=.05}else if(h0==='bleu'){c=cN.clone().lerp(cB,.5+.5*u);h=.3+.2*u;s2=.12}else if(h0==='aube'){c=cB.clone().lerp(cA,Math.min(1,u*1.6)).lerp(cJ,Math.max(0,u*1.6-1));h=.35+.55*u;s2=.25+.6*u;sun.position.set(900,120+500*u,-100)}
  else if(h0==='soir'){c=cJ.clone().lerp(cO,Math.max(0,u-.3)*1.2);h=.95-.35*Math.max(0,u-.5);s2=.85-.4*Math.max(0,u-.5);sun.position.set(-900,200+300*(1-u),100)}else{c=cJ;h=.95;s2=.85;sun.position.set(300,600,-200)}
  ciel.copy(c);sc.background=ciel;sc.fog.color.copy(c);const sombre=h0==='nuit'||h0==='bleu';sc.fog.near=sombre?80:200;sc.fog.far=sombre?900:2600;hemi.intensity=h;sun.intensity=s2;lum.forEach(m=>m.visible=sombre||ET.festival||(h0==='soir'&&u>.8))}
 // ---- la boucle
 let last=performance.now(),T0=last;const fm=new THREE.Vector3(),tgt=new THREE.Vector3();
 function bosse187(X,Z){const D=ETG&&ETG.userData.da;if(!D||!D.length)return 0;let h=0;for(const j of D){const p=RP[j],t=RT[j],dx=X-p.x,dz=Z-p.z,al=dx*t.x+dz*t.z;if(Math.abs(al)<2.2){const lat=Math.abs(dx*RN[j].x+dz*RN[j].z);if(lat<larg()/2+.3)h=Math.max(h,.22*Math.cos(al/2.2*Math.PI/2)**2)}}return h}
 function sol187(X,Z){return HS(X,Z)+bosse187(X,Z)}
 function pose(){if(st.x==null)placer(0);const t=new THREE.Vector3(Math.sin(st.h),0,Math.cos(st.h)),n=new THREE.Vector3(t.z,0,-t.x),y0=sol187(st.x,st.z),y=st.y!=null?Math.max(st.y,y0):y0,ya=sol187(st.x+t.x*1.3,st.z+t.z*1.3),yb=sol187(st.x-t.x*1.3,st.z-t.z*1.3),pente=st.air?st.vy/Math.max(st.v,4)*.6:(ya-yb)/2.6;
  car.position.set(st.x,y+.05,st.z);car.rotation.set(0,st.h+st.dir*.06,0);car.rotation.x=-Math.atan(pente);const i=Math.min(NP-1,Math.max(0,Math.round(st.s)));return {p:car.position.clone(),t,n,i,pente}}
 // pose la voiture au point i du trajet, dans le sens de la route
 function placer(i){i=Math.min(NP-1,Math.max(0,i));st.snap=1;st.ch=null;st.vh=null;st.y=null;st.air=0;st.vy=0;st.x=RP[i].x-(ET.large?RN[i].x*3.5:0);st.z=RP[i].z-(ET.large?RN[i].z*3.5:0);st.h=Math.atan2(RT[i].x,RT[i].z);st.s=i}
 // où en est-on : le point du trajet le plus proche, cherché autour du précédent (la route peut se recroiser dans les lacets)
 function avance(){let b=st.s|0,bd=1e18;for(let k=Math.max(0,b-40);k<=Math.min(NP,b+60);k++){const p=RP[k],d=(p.x-st.x)**2+(p.z-st.z)**2;if(d<bd){bd=d;b=k}}st.s=b;return Math.sqrt(bd)}
 st.dir=0;etape(0);window.R187={NP:()=>NP,etape:k=>{etape(k);st.phase="jeu";cmd.style.opacity=1;hud.style.opacity=1},st,place:i=>placer(i),K:()=>JSON.stringify(K2),trafic:()=>ETG.userData.tra||[],viseB:()=>{const B=ETG.userData.box||[];let b=null,bd=1e9;for(const o of B){const d=Math.hypot(o[0]-st.x,o[1]-st.z);if(d<bd){bd=d;b=o}}if(!b)return 0;const a=Math.atan2(b[0]-st.x,b[1]-st.z);st.x=b[0]-Math.sin(a)*(Math.max(b[2],b[3])+8);st.z=b[1]-Math.cos(a)*(Math.max(b[2],b[3])+8);st.h=st.vh=a;st.v=20;st.y=null;return [b,B.length]},vise:(rm)=>{const L=Object.values(ETG.userData.obs||{}).flat().filter(o=>o[2]>=(rm||0));let b=null,bd=1e9;for(const o of L){const d=Math.hypot(o[0]-st.x,o[1]-st.z);if(d>8&&d<bd){bd=d;b=o}}if(!b)return 0;const a=Math.atan2(b[0]-st.x,b[1]-st.z);st.x=b[0]-Math.sin(a)*6;st.z=b[1]-Math.cos(a)*6;st.h=st.vh=a;st.v=18;return b},dbg:()=>({NP,pres:Object.values(ETG.userData.obs||{}).flat().filter(o=>Math.hypot(o[0]-st.x,o[1]-st.z)<o[2]+4).map(o=>[(o[0]-st.x).toFixed(1),(o[1]-st.z).toFixed(1),o[2]]).slice(0,8),obs:Object.values(ETG.userData.obs||{}).reduce((a,b)=>a+b.length,0),pos:[st.x|0,st.z|0,st.h.toFixed(2)],ec:PROCHE(st.x,st.z)[0].toFixed(1),clubs:clubs.map(c=>[c.i,Math.round(c.g.position.distanceTo(car.position))]),pie:(ETG.userData.pie||[]).length,len:Math.round(RP[0].distanceTo(RP[NP-1]))})};
 function boucle(now){if(stop)return;requestAnimationFrame(boucle);const dt=Math.min(.05,(now-last)/1000);last=now;const tt=(now-T0)/1000;const P=pose(),u=st.s/NP;
  try{voitureEtape()}catch(e){}
  if(st.phase==='film'){// la plongée : de très haut, en tournant, jusqu'au coffre
   const D=9.5,k=Math.min(1,tt/D),e=1-Math.pow(1-k,3),vie=Math.min(1,tt/7);lumiere(0,vie);if(AC&&mg)mg.gain.value=.25*vie;if(!style){style='sega';pas16=0;tNext=AC?AC.currentTime:0}
   const ang=(1-e)*1.4,haut=1400*(1-e)+3.2,dist=1600*(1-e)+8.5;const back=P.t.clone().multiplyScalar(-1);back.applyAxisAngle(new THREE.Vector3(0,1,0),ang);
   cam.position.set(car.position.x+back.x*dist,car.position.y+haut,car.position.z+back.z*dist);tgt.copy(car.position).add(new THREE.Vector3(0,1.2*e,0)).addScaledVector(P.t,6*e);cam.lookAt(tgt);
   if(tt>.6&&tt<1)dire('Le songe du gramoun<br><small style="font-size:17px">Le vieux s’endort sous le tamarin. Il rêve d’un temps à venir…</small>',5200);
   if(k>=1){st.phase='jeu';cmd.style.opacity=1;cmd.style.pointerEvents='auto';hud.style.opacity=1;st.et=-1}}
  else if(st.phase==='jeu'){st.temps+=dt;
   const e=ek;if(e!==st.et){st.et=e;const E=ET;fondu(1);setTimeout(()=>fondu(0),1300);dire(E.n+'<br><small style="font-size:17px">'+E.s+'</small>',3200);style=E.clubs?style:E.festival?'maloya':E.large&&E.h==='nuit'?'electro':'';pas16=0}
   // la boîte de nuit la plus proche donne le rythme
   if(ET.clubs){let best=null,bd=1e9;clubs.forEach(c=>{const dd=Math.abs(c.i-st.s);if(dd<bd){bd=dd;best=c}});if(best&&best.style!==style){style=best.style;pas16=0;if(bd<40)hud.dataset.club=best.n}clubs.forEach(c=>{c.hl.material.opacity=.35+.25*Math.sin(tt*6+c.i)})}
   // l'accélérateur est une pédale : il monte en une seconde environ quand on appuie, retombe quand on lâche ; la jauge du bouton Gaz le montre
   const E=ET,vmax=230/3.6;st.gaz=Math.max(0,Math.min(1,(st.gaz||0)+(K2.a?dt*1.1:-dt*3)));const peut=!(st.crash>0)&&!st.air,sgn=Math.sign(st.v),av=Math.abs(st.v);
   // marche avant, freinage, puis marche arrière (Frein à l'arrêt) jusqu'à 30 km/h ; le gaz en reculant freine d'abord
   let acc=0;if(peut){if(st.v>-.3)acc=st.gaz*(st.v<15?9:st.v<35?6.5:4.5);else if(K2.a)acc=12;if(K2.f){if(st.v>.3)acc-=14;else acc-=4.5}}
   const g=9.8*Math.sin(Math.atan(P.pente));st.v+=(acc-g-sgn*(st.v*st.v*.0012+(av>.1?.6:0)))*dt;if(!K2.a&&!K2.f&&av>.05)st.v-=sgn*1.2*dt;if(Math.abs(st.v)<.08&&!K2.a&&!K2.f)st.v=0;
   const w=larg()/2,braq=(K2.g?1:0)-(K2.d?1:0);st.dir+=(braq-st.dir)*Math.min(1,dt*6);
   // l'adhérence : asphalte sec 1 ; humide (forêt des Plaines, brume du volcan, aube sur les laves) ; gravier et pouzzolane en haut du volcan ; terre hors de la route ; frein à main = l'arrière décroche
   const u=st.s/NP,mouil=(E.osm==='plaines'||E.osm==='laves'||(E.volcan&&u>.25&&u<.55)),grav=E.volcan&&u>.5;let mu=grav?.5:mouil?.72:1;if(st.air)mu=.05;if(st.hors)mu=Math.min(mu,.45);if(K2.m)mu*=.35;st.mu=mu;
   const lacet=st.dir*Math.min(1.6,1.6*Math.max(-1,Math.min(1,st.v/6)))/(1+st.v*.035)*(K2.m?1.9:1)*(1+(1-mu)*.6);st.h+=lacet*dt;if(st.vh==null)st.vh=st.h;
   // la trajectoire rattrape le nez de la voiture, mais pas plus vite que l'adhérence ne le permet : au-delà, ça glisse
   let gl=st.h-st.vh;while(gl>Math.PI)gl-=2*Math.PI;while(gl<-Math.PI)gl+=2*Math.PI;const lim=mu*9.5/Math.max(Math.abs(st.v),2),pas=Math.sign(gl)*Math.min(Math.abs(gl)*8,lim)*dt;st.vh+=Math.abs(pas)>Math.abs(gl)?gl:pas;
   gl=st.h-st.vh;while(gl>Math.PI)gl-=2*Math.PI;while(gl<-Math.PI)gl+=2*Math.PI;st.glisse=gl;st.v-=Math.abs(Math.sin(gl))*st.v*.55*dt+(K2.m?2.5*dt:0);
   if(Math.abs(gl)>1.4){st.vh=st.h-Math.sign(gl)*1.4}
   st.x+=Math.sin(st.vh)*st.v*dt;st.z+=Math.cos(st.vh)*st.v*dt;const ecart=avance();st.hors=ecart>w+.6;
   // le décor bloque : deux cercles pour la voiture (avant, arrière) contre les cercles des obstacles
   {const O=ETG.userData.obs;if(O){const hx=Math.sin(st.h),hz=Math.cos(st.h);for(const dd0 of [1.3,-1.3]){const cx=st.x+hx*dd0,cz=st.z+hz*dd0,kx=Math.floor(cx/8),kz=Math.floor(cz/8);
     for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){const L=O[(kx+a)+','+(kz+b)];if(!L)continue;for(const o of L){const dx=cx-o[0],dz=cz-o[1],R=o[2]+.95,d2=dx*dx+dz*dz;if(d2<R*R&&d2>1e-6){const D=Math.sqrt(d2),nx=dx/D,nz=dz/D;st.x+=nx*(R-D);st.z+=nz*(R-D);choc187(nx,nz)}}}}}
    {const B=ETG.userData.box;if(B){const hx=Math.sin(st.h),hz=Math.cos(st.h);for(const b of B){if(Math.abs(b[0]-st.x)>40||Math.abs(b[1]-st.z)>40)continue;const c=Math.cos(b[4]),sn=Math.sin(b[4]);
      for(const dd0 of [1.4,0,-1.4]){const cx=st.x+hx*dd0,cz=st.z+hz*dd0,dx=cx-b[0],dz=cz-b[1],lx=dx*c-dz*sn,lz=dx*sn+dz*c,qx=Math.max(-b[2],Math.min(b[2],lx)),qz=Math.max(-b[3],Math.min(b[3],lz));let ex=lx-qx,ez=lz-qz,D=Math.hypot(ex,ez),pen;
       if(D<1e-6){const px=b[2]-Math.abs(lx),pz=b[3]-Math.abs(lz);if(px<pz){ex=Math.sign(lx)||1;ez=0;pen=px+.95}else{ex=0;ez=Math.sign(lz)||1;pen=pz+.95}D=1}else if(D<.95){pen=.95-D}else continue;
       const nlx=ex/D,nlz=ez/D,nx=nlx*c+nlz*sn,nz=-nlx*sn+nlz*c;st.x+=nx*pen;st.z+=nz*pen;choc187(nx,nz)}}}}
    // les murs en continu des voies rapides : le séparateur à gauche, la glissière (ou le GBA du viaduc) à droite
    if(E.large){const p=RP[st.s],n=RN[st.s],lat=(st.x-p.x)*n.x+(st.z-p.z)*n.z,gmax=w-.35,gmin=-(E.osm==='nrl'?w-.25:w-.05);if(lat>gmax){st.x-=n.x*(lat-gmax);st.z-=n.z*(lat-gmax);choc187(-n.x,-n.z)}else if(lat<gmin){st.x+=n.x*(gmin-lat);st.z+=n.z*(gmin-lat);choc187(n.x,n.z)}}}
   if(st.crash>0){st.crash-=dt;st.v*=Math.pow(.2,dt)}
   // le saut : la voiture suit la route tant que la gravité le permet ; sur une bosse ou un dos d'âne pris vite, elle décolle, puis retombe
   {const gy=sol187(st.x,st.z);if(st.y==null){st.y=gy;st.vy=0;st.air=0;st.gp=gy}const vg=(gy-st.gp)/Math.max(dt,1e-3);st.gp=gy;
    if(!st.air){if((vg-st.vy)/Math.max(dt,1e-3)<-9.8*1.15&&st.v>9&&vg<st.vy){st.air=1}else{st.vy=vg;st.y=gy}}
    if(st.air){st.vy-=9.8*dt;st.y+=st.vy*dt;if(st.y<=gy){const imp=vg-st.vy;st.y=gy;st.air=0;if(imp>3.5){st.sec=Math.max(st.sec||0,Math.min(1.2,imp/7));if(imp>10)st.v*=.75}st.vy=vg}}}
   // hors de la chaussée : l'herbe et la terre freinent fort ; au-delà de 55 m, on bute (le bord du monde détaillé)
   if(st.hors){const lim=ecart>w+6?12:20;if(st.v>lim)st.v-=(st.v-lim)*Math.min(1,dt*1.5);st.frotte=.25}
   if(ecart>55){const p=RP[st.s],dx=st.x-p.x,dz=st.z-p.z,L=Math.hypot(dx,dz)||1;st.x=p.x+dx/L*55;st.z=p.z+dz/L*55;st.v*=.5}
   st.v=Math.max(-30/3.6,Math.min(vmax,st.v));if(st.v<0)st.vh=st.h;
   for(const r of rouesR)r.rotation.z-=st.v*dt/.3;
   // la fumée ou la poussière des pneus quand on glisse (grise sur l'asphalte, rousse sur la pouzzolane et la terre)
   try{if(!window.FUM187){const L=[];for(let k=0;k<28;k++){const m=new THREE.Sprite(new THREE.SpriteMaterial({map:tg('rgba(255,255,255,1)'),transparent:true,depthWrite:false,opacity:0}));m.visible=false;sc.add(m);L.push({m,t:9})}window.FUM187=L}
    const FU=window.FUM187;if(FU[0].m.parent!==sc)FU.forEach(f=>sc.add(f.m));const gls=Math.abs(st.glisse||0);if((gls>.12||K2.m&&st.v>3)&&st.v>4&&Math.random()<dt*28){const f=FU.find(f=>f.t>1.1)||FU[0];const c=Math.cos(st.h),s2=Math.sin(st.h),sd=Math.random()<.5?-.8:.8;
     f.m.position.set(car.position.x-s2*1.6+c*sd,car.position.y+.4,car.position.z-c*1.6-s2*sd);f.t=0;f.m.visible=true;f.m.material.color.set((E.volcan&&st.s/NP>.5)||st.hors?0xa0643c:0xd8d8d8)}
    FU.forEach(f=>{if(f.t>1.1){f.m.visible=false;return}f.t+=dt;f.m.material.opacity=.45*(1-f.t/1.1);const sz=1+f.t*4;f.m.scale.set(sz,sz,1);f.m.position.y+=dt*.8})}catch(e){}
   if(ek<ETAPES.length-1&&st.s>=NP-24&&!st.passe){st.passe=1;fondu(1);titre.style.opacity=0;setTimeout(()=>{const v0=st.v;etape(ek+1);st.v=Math.max(v0,8);st.passe=0;st.y=null;requestAnimationFrame(()=>requestAnimationFrame(()=>fondu(0)))},600)}
   if(st.s>=NP-2){st.s=NP-2;if(ek<ETAPES.length-1){}else{st.phase='fin';st.ft=tt;dire('Le Pas de Bellecombe<br><small style="font-size:17px">Le tour de l’île finit au volcan. Le gramoun se réveille sous son tamarin.</small>',4500);hud.style.opacity=0;cmd.style.opacity=0}}
   lumiere(u,1);hud.innerHTML=(st.v<-.2?'R ':'')+Math.round(Math.abs(st.v)*3.6)+' km/h<br><span style="font-weight:500;opacity:.85">'+E.n+(ET.clubs&&style&&RYT[style]?' · '+CLUB.find(c=>c[2]===style)[0]:ET.festival?' · festival maloya':'')+' · étape '+(ek+1)+'/'+ETAPES.length+'</span>';
   // la caméra derrière le coffre, un peu haute, qui regarde devant dans le virage
   st.ch=st.ch==null?st.h:st.ch+(((st.h-st.ch+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI)*Math.min(1,dt*3.5);const vv=Math.min(1,Math.abs(st.v)/55),bx=-Math.sin(st.ch),bz=-Math.cos(st.ch),dc=6.4-vv*.9,tr=st.v*(.004+(PROCHE(car.position.x,car.position.z)[0]>larg()/2?.02:0))+(st.sec||0)*1.2,sh=()=>(Math.random()-.5)*tr;fm.set(car.position.x+bx*dc+sh(),car.position.y+2.1+sh(),car.position.z+bz*dc+sh());fm.y=Math.max(fm.y,HS(fm.x,fm.z)+1.6);if(st.snap){cam.position.copy(fm);st.snap=0}else cam.position.lerp(fm,Math.min(1,dt*6));tgt.set(car.position.x-bx*14,car.position.y+1.2,car.position.z-bz*14);cam.lookAt(tgt);cam.fov=60+vv*24;cam.updateProjectionMatrix();if(st.sec>0)st.sec=Math.max(0,st.sec-dt*2.5);try{traines(vv,dt)}catch(e){}try{const bg=cmd.querySelector('[data-r=a]');if(bg){const g=Math.round((st.gaz||0)*100);bg.style.background='linear-gradient(to top,#e9b44c '+g+'%,rgba(233,180,76,.25) '+g+'%)'}const vk=Math.abs(st.v)*3.6;compt.firstChild.style.width=Math.min(100,vk/230*100)+'%';compt.lastChild.textContent=(st.v<-.2?'R  ':'')+Math.round(vk)+' / 230 km/h'}catch(e){}
   if(AC&&mot){mot.frequency.setTargetAtTime(40+st.v*4.8+(P.pente>0?st.v*P.pente*9:0),AC.currentTime,.08);motG.gain.setTargetAtTime(.05+(K2.a?.06:0),AC.currentTime,.1)}}
  else if(st.phase==='fin'){// la caméra s'élève et découvre l'île, comme au début
   const k=Math.min(1,(tt-st.ft)/6),e=k*k;const back=P.t.clone().multiplyScalar(-1).applyAxisAngle(new THREE.Vector3(0,1,0),e*1.2);cam.position.set(car.position.x+back.x*(9+e*1500),car.position.y+3+e*1100,car.position.z+back.z*(9+e*1500));cam.lookAt(car.position);if(AC&&mg)mg.gain.value=.25*(1-k);if(k>=1&&!st.fini){st.fini=1;finale187()}}
  try{majPietons187(dt)}catch(e){}try{majTrafic187(dt)}catch(e){}
  try{if(ETG&&ETG.userData.oiseaux){ETG.userData.oiseaux.forEach(m=>{const d2=m.position.distanceTo(car.position),fuit=d2<14;m.position.y=m.userData.y0+(fuit?Math.min(6,(14-d2)*.5):Math.abs(Math.sin(tt*3+m.userData.ph))*.25)});const pp=ETG.userData.pap,c=car.position;pp.position.set(c.x+Math.cos(tt*.3)*40,c.y+30,c.z+Math.sin(tt*.3)*40)}}catch(e){}
  musique(AC?AC.currentTime:0);R.render(sc,cam)}
 // la fin : le gramoun se réveille ; l'île vue de haut reste derrière le message
 function finale187(){const b=document.createElement('div');b.style.cssText='position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(5,8,12,.35);z-index:3';
  b.innerHTML='<div style="background:#1a1712;border:1px solid #e8be5a;border-radius:14px;padding:18px;max-width:460px;width:calc(100% - 32px);color:#efe9da;font:14px system-ui;text-align:center"><h3 style="margin:0 0 8px;font:700 22px Alegreya,Georgia,serif;color:#f0c46a">Le gramoun se réveille</h3><p style="opacity:.85;margin:0 0 12px">Sous son tamarin, il a fait le tour de l’île : le front de mer, la 4 voies, la route sur la mer, les laves, le festival, les Plaines et le volcan.</p><p style="opacity:.55;font-size:11px;margin:0 0 10px">Tracés des routes : © les contributeurs OpenStreetMap (ODbL), itinéraires OSRM. Relief et image satellite : Copernicus.</p><button class="bt">Revenir</button></div>';
  d.appendChild(b);b.querySelector('button').onclick=()=>fermer(true)}
 requestAnimationFrame(boucle)}
