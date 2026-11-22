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
 const voile=document.createElement('div');voile.style.cssText='position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 58%,rgba(40,25,10,.5) 100%)';d.appendChild(voile);
 const flou=document.createElement('div');flou.style.cssText='position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .9s;backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);-webkit-mask:radial-gradient(ellipse 34% 30% at 50% 66%,transparent 60%,#000 100%);mask:radial-gradient(ellipse 34% 30% at 50% 66%,transparent 60%,#000 100%)';d.appendChild(flou);
 const titre=document.createElement('div');titre.style.cssText='position:absolute;left:0;right:0;top:26%;text-align:center;color:#f7ecd2;font:italic 700 30px Alegreya,Georgia,serif;text-shadow:0 3px 12px #000;opacity:0;transition:opacity 1s;pointer-events:none;padding:0 16px';d.appendChild(titre);
 const hud=document.createElement('div');hud.style.cssText='position:absolute;left:12px;top:10px;color:#f2ead6;font:700 14px Montserrat,system-ui;text-shadow:0 2px 4px #000;pointer-events:none;opacity:0;transition:opacity 1s';d.appendChild(hud);
 const cmd=document.createElement('div');cmd.style.cssText='position:absolute;left:0;right:0;bottom:14px;display:flex;justify-content:space-between;padding:0 14px;opacity:0;transition:opacity 1.2s;pointer-events:none';
 cmd.innerHTML='<div style="display:flex;gap:10px"><button class="bt sec" data-r="g" style="width:64px;height:64px;font-size:26px">◀</button><button class="bt sec" data-r="d" style="width:64px;height:64px;font-size:26px">▶</button></div><div style="display:flex;gap:10px"><button class="bt sec" data-r="f" style="width:72px;height:64px">Frein</button><button class="bt" data-r="a" style="width:86px;height:64px">Gaz</button></div>';d.appendChild(cmd);
 const qb=document.createElement('button');qb.className='bt sec';qb.textContent='Quitter';qb.style.cssText='position:absolute;right:12px;top:10px;z-index:2';d.appendChild(qb);
 const dire=(t,ms)=>{titre.innerHTML=t;titre.style.opacity=1;clearTimeout(dire.h);dire.h=setTimeout(()=>titre.style.opacity=0,ms||2600)};
 const R=new THREE.WebGLRenderer({canvas:cv,antialias:true});R.outputEncoding=THREE.sRGBEncoding;R.setPixelRatio(Math.min(1.5,devicePixelRatio||1));
 const sc=new THREE.Scene();sc.fog=new THREE.Fog(0x0b1020,60,900);const cam=new THREE.PerspectiveCamera(58,1,.5,9000);
 const hemi=new THREE.HemisphereLight(0xfff6e6,0x404a38,.25),sun=new THREE.DirectionalLight(0xfff0d8,.2);sun.position.set(300,600,-200);sc.add(hemi,sun);
 // ---- l'échelle : 1 km du jeu = K unités ; la hauteur réelle (m) au même facteur
 const K=60,KY=K/1000;const P0=xz(55.47,-21.34);const toR=(lon,lat)=>{const [x,z]=xz(lon,lat);return [(x-P0[0])*K,(z-P0[1])*K]};const hR=(X,Z)=>Math.max(0,alt(X/K+P0[0],Z/K+P0[1]))*KY;
 // ---- les étapes du tour de l'île (trajets approximatifs, ronds-points marqués « r ») : chacune a sa route, son heure, sa vitesse de rêve
 const ETAPES=[
  {osm:'sp',n:'Saint-Pierre, le front de mer',s:'la nuit, les boîtes de nuit en enfilade',h:'nuit',vmax:90,clubs:1,wp:[[55.4655,-21.3448],[55.4705,-21.3440],[55.4760,-21.3428],[55.4815,-21.3395,'r'],[55.4840,-21.3330]]},
  {osm:'voies',n:'La 4 voies',s:'vers Le Tampon : la grande ligne droite, le moteur hurle, jusqu’à 230 dans le rêve',h:'nuit',vmax:230,large:1,wp:[[55.4840,-21.3330],[55.4900,-21.3200],[55.4960,-21.3080],[55.5050,-21.2950],[55.5140,-21.2800,'r'],[55.5200,-21.2740]]},
  {osm:'sg',n:'Saint-Paul, la montée vers Saint-Gilles',s:'en pleine nuit, par le cap La Houssaye',h:'nuit',vmax:140,wp:[[55.2885,-21.0030,'r'],[55.2760,-21.0090],[55.2680,-21.0160],[55.2580,-21.0230],[55.2470,-21.0270],[55.2380,-21.0340],[55.2290,-21.0450,'r'],[55.2235,-21.0540]]},
  {osm:'nrl',n:'La nouvelle route du Littoral',s:'au milieu de la mer, la montagne sur la droite, jusqu’à La Grande Chaloupe',h:'bleu',vmax:200,large:1,mer:1,wp:[[55.3260,-20.9300,'r'],[55.3380,-20.9175],[55.3520,-20.9085],[55.3660,-20.9010],[55.3800,-20.8950],[55.3880,-20.8925]]},
  {osm:'laves',n:'La route des laves',s:'le Grand Brûlé, au lever du soleil',h:'aube',vmax:150,wp:[[55.7700,-21.3560],[55.7880,-21.3300],[55.8040,-21.3010],[55.8140,-21.2700],[55.8150,-21.2420],[55.8060,-21.2150]]},
  {osm:'sd',n:'Saint-Denis, le Barachois',s:'en plein festival maloya : la route est bouchée, on passe par la ville et Bellepierre',h:'jour',vmax:70,festival:1,wp:[[55.4330,-20.8790],[55.4420,-20.8775],[55.4475,-20.8780,'r'],[55.4505,-20.8830],[55.4480,-20.8880],[55.4440,-20.8920],[55.4415,-20.8955]]},
  {osm:'plaines',n:'La route des Plaines',s:'la montée des Hauts, de Saint-Benoît à la Plaine des Cafres',h:'jour',vmax:160,wp:[[55.7130,-21.0340,'r'],[55.6900,-21.0650],[55.6600,-21.1000],[55.6280,-21.1350],[55.6000,-21.1550],[55.5800,-21.1720],[55.5700,-21.1950],[55.5650,-21.2100]]},
  {osm:'volcan',n:'La route du volcan',s:'la forêt, la colline, puis la plaine rouge, comme sur Mars',h:'soir',vmax:120,volcan:1,wp:[[55.5650,-21.2110,'r'],[55.5800,-21.2200],[55.5950,-21.2300],[55.6080,-21.2360],[55.6200,-21.2385],[55.6320,-21.2370],[55.6430,-21.2330],[55.6600,-21.2290],[55.6760,-21.2250],[55.6890,-21.2185]]}];
 let ET=ETAPES[0],RP=[],RT=[],RN=[],NP=0,larg=()=>9,ETG=null,ek=0;
 function etape(k){ek=k;ET=ETAPES[k];if(ETG){sc.remove(ETG);ETG.traverse(o=>{if(o.geometry)o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(m&&m.map&&m.map!==SATT&&m.map.dispose)m.map.dispose()})})}ETG=new THREE.Group();sc.add(ETG);
  // le trajet, avec les ronds-points : on tourne autour de l'îlot, dans le sens inverse des aiguilles d'une montre
  const W=ET.wp.map(([lo,la,f])=>{const [X,Z]=toR(lo,la);return {X,Z,r:f==='r'}});const pts=[];
  W.forEach((w,i)=>{if(!w.r||i===0||i===W.length-1||(ET.osm&&typeof OSM187!=='undefined'&&OSM187[ET.osm])){pts.push(new THREE.Vector3(w.X,0,w.Z));return}const a=W[i-1],b=W[i+1],rr=16,th=(x,z)=>Math.atan2(-(z-w.Z),x-w.X);let t0=th(a.X,a.Z),t1=th(b.X,b.Z);while(t1<=t0+.6)t1+=Math.PI*2;
   for(let k2=0;k2<=10;k2++){const t=t0+(t1-t0)*k2/10;pts.push(new THREE.Vector3(w.X+Math.cos(t)*rr,0,w.Z-Math.sin(t)*rr))}
   const il=new THREE.Mesh(new THREE.CylinderGeometry(rr-6,rr-6,1.2,28),new THREE.MeshLambertMaterial({color:0x3f7a3a}));il.position.set(w.X,hR(w.X,w.Z)+.6,w.Z);il.userData.rond=1;ETG.add(il);
   const pal=new THREE.Mesh(new THREE.CylinderGeometry(.4,.6,9,6),new THREE.MeshLambertMaterial({color:0x6a5a3a}));pal.position.set(w.X,hR(w.X,w.Z)+5,w.Z);ETG.add(pal);const fe=new THREE.Mesh(new THREE.SphereGeometry(3.2,8,6),new THREE.MeshLambertMaterial({color:0x2f6a2a}));fe.position.set(w.X,hR(w.X,w.Z)+9.5,w.Z);ETG.add(fe)});
  // le vrai tracé (OpenStreetMap) quand on l'a ; les ronds-points réels deviennent un îlot qu'on contourne (sens inverse des aiguilles d'une montre)
  const O=ET.osm&&typeof OSM187!=='undefined'&&OSM187[ET.osm];if(O){let L0=O.p;if(ET.osm==='nrl')L0=L0.filter(p=>p[0]<=55.386);const Q=L0.map(([lo,la])=>{const [X,Z]=toR(lo,la);return {X,Z}});const rr=7,cut=10;const rbs=(O.r||[]).map(([lo,la])=>{const [X,Z]=toR(lo,la);return {X,Z}});
   pts.length=0;let i=0;while(i<Q.length){const q=Q[i],rb=rbs.find(c=>Math.hypot(q.X-c.X,q.Z-c.Z)<cut);if(!rb||i===0){pts.push(new THREE.Vector3(q.X,0,q.Z));i++;continue}
    let j=i;while(j<Q.length&&Math.hypot(Q[j].X-rb.X,Q[j].Z-rb.Z)<cut)j++;const a=Q[i-1],b=Q[Math.min(Q.length-1,j)],th=(x,z)=>Math.atan2(-(z-rb.Z),x-rb.X);let t0=th(a.X,a.Z),t1=th(b.X,b.Z);while(t1<=t0+.5)t1+=Math.PI*2;
    for(let k2=0;k2<=8;k2++){const t=t0+(t1-t0)*k2/8;pts.push(new THREE.Vector3(rb.X+Math.cos(t)*rr,0,rb.Z-Math.sin(t)*rr))}
    if(!rb.fait){rb.fait=1;const y0=hR(rb.X,rb.Z);const il=new THREE.Mesh(new THREE.CylinderGeometry(rr-3.5,rr-3.5,1.2,24),new THREE.MeshLambertMaterial({color:0x3f7a3a}));il.position.set(rb.X,y0+.6,rb.Z);ETG.add(il);const pal=new THREE.Mesh(new THREE.CylinderGeometry(.3,.45,6,6),new THREE.MeshLambertMaterial({color:0x6a5a3a}));pal.position.set(rb.X,y0+3.5,rb.Z);ETG.add(pal);const fe=new THREE.Mesh(new THREE.SphereGeometry(2.2,8,6),new THREE.MeshLambertMaterial({color:0x2f6a2a}));fe.position.set(rb.X,y0+6.8,rb.Z);ETG.add(fe)}
    i=j}}
  const C=new THREE.CatmullRomCurve3(pts,false,'centripetal');const L=C.getLength();NP=Math.max(60,Math.round(L/(O?2.5:4)));RP=[];RT=[];RN=[];
  for(let i=0;i<=NP;i++){const u=i/NP,p=C.getPointAt(u),t=C.getTangentAt(u);t.y=0;t.normalize();p.y=hR(p.x,p.z);RP.push(p);RT.push(t);RN.push(new THREE.Vector3(t.z,0,-t.x))}
  {const Y=RP.map(p=>p.y);for(let r=0;r<3;r++)for(let i=0;i<=NP;i++){let s2=0,n=0;for(let k2=-12;k2<=12;k2++){const j=i+k2;if(j>=0&&j<=NP){s2+=Y[j];n++}}RP[i].y=s2/n}RP.forEach(p=>p.y=Math.max(p.y,ET.mer?1.6:.6))}
  larg=()=>ET.large?12:6.5;
  // la Plaine des Sables : le sol lui-même rougit (plus de nappe posée dessus, qui flottait au-dessus des creux et coupait les bosses)
  rouge187=(bi,dd)=>{if(!ET.volcan||bi<0)return 0;const u=bi/NP,a=Math.min(1,Math.max(0,(u-.52)/.05))*Math.min(1,Math.max(0,(.96-u)/.03));return a*Math.min(1,Math.max(0,1-(dd-70)/60))};
  // le sol : le vrai relief, l'image satellite, aplani sous la route
  let xmin=1e9,xmax=-1e9,zmin=1e9,zmax=-1e9;RP.forEach(p=>{xmin=Math.min(xmin,p.x);xmax=Math.max(xmax,p.x);zmin=Math.min(zmin,p.z);zmax=Math.max(zmax,p.z)});const M=700;xmin-=M;xmax+=M;zmin-=M;zmax+=M;
  const GX=240,GZ=Math.max(20,Math.round(GX*(zmax-zmin)/(xmax-xmin)));const gp=[],guv=[],gi=[],gcol=[];const W0=(NX-1)*ST,H0=(NY-1)*ST;const bins={},BS=60;RP.forEach((p,i)=>{const k2=Math.floor(p.x/BS)+','+Math.floor(p.z/BS);(bins[k2]=bins[k2]||[]).push(i)});
  const proche=(X,Z)=>{let bd=1e9,bi=-1;const bx=Math.floor(X/BS),bz=Math.floor(Z/BS);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){const L2=bins[(bx+a)+','+(bz+b)];if(L2)L2.forEach(i=>{const p=RP[i],dd=(p.x-X)**2+(p.z-Z)**2;if(dd<bd){bd=dd;bi=i}})}return [Math.sqrt(bd),bi]};
  for(let j=0;j<=GZ;j++)for(let i=0;i<=GX;i++){const X=xmin+(xmax-xmin)*i/GX,Z=zmin+(zmax-zmin)*j/GZ;let y=hR(X,Z);const gx=X/K+P0[0],gz=Z/K+P0[1],enMer=alt(gx,gz)<=1;const [dd,bi]=proche(X,Z);if(bi>=0&&!(ET.mer&&enMer)){const ry=RP[bi].y-.4,k2=Math.min(1,Math.max(0,(dd-12)/55));y=ry+(y-ry)*k2*k2}
   gp.push(X,enMer?-2:y,Z);guv.push((gx+MAR)/W0,1-(gz+MAR)/H0);{const f=rouge187(bi,dd);gcol.push(1+f*.45,1-f*.45,1-f*.6)}if(i<GX&&j<GZ){const a=j*(GX+1)+i;gi.push(a,a+GX+1,a+1,a+1,a+GX+1,a+GX+2)}}
  const gg=new THREE.BufferGeometry();gg.setAttribute('position',new THREE.Float32BufferAttribute(gp,3));gg.setAttribute('uv',new THREE.Float32BufferAttribute(guv,2));gg.setAttribute('color',new THREE.Float32BufferAttribute(gcol,3));solM.vertexColors=true;gg.setIndex(gi);gg.computeVertexNormals();ETG.add(new THREE.Mesh(gg,solM));hi187(ET.osm,W0,H0);
  // l'asphalte et ses lignes ; sur la mer, les piles du viaduc
  {const pos=[],idx=[];for(let i=0;i<=NP;i++){const p=RP[i],n=RN[i],w=larg()/2;pos.push(p.x-n.x*w,p.y+.05,p.z-n.z*w,p.x+n.x*w,p.y+.05,p.z+n.z*w);if(i<NP){const b=i*2;idx.push(b,b+2,b+1,b+1,b+2,b+3)}}
   const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();ETG.add(new THREE.Mesh(g,new THREE.MeshLambertMaterial({color:0x3a3a3c})))}
  // les talus : de chaque bord de la route jusqu'au vrai relief, pour que la route ne flotte jamais au-dessus du sol (collines, volcan)
  {const W0=(NX-1)*ST,H0=(NY-1)*ST,pos=[],uv=[],idx=[],col=[],D=[0,1.2,5,11,18];let ci=0;const put=(X,Y,Z)=>{pos.push(X,Y,Z);{const f=rouge187(ci,0);col.push(1+f*.45,1-f*.45,1-f*.6)}const gx=X/K+P0[0],gz=Z/K+P0[1];uv.push((gx+MAR)/W0,1-(gz+MAR)/H0)};
   [-1,1].forEach(sd=>{const b0=pos.length/3;for(let i=0;i<=NP;i++){ci=i;const p=RP[i],n=RN[i],w=larg()/2;D.forEach((d,k)=>{const X=p.x+n.x*sd*(w+d),Z=p.z+n.z*sd*(w+d);let y;if(k===0)y=p.y-.02;else if(k===1)y=p.y-.12;else{const t=(k-1)/(D.length-2),h=hR(X,Z);y=(p.y-.12)+(h-(p.y-.12))*t*t*(3-2*t)}put(X,y,Z)});
     if(i<NP){const r=b0+i*D.length,r2=r+D.length;for(let k=0;k<D.length-1;k++){if(ET.mer&&alt(p.x/K+P0[0],p.z/K+P0[1])<=1)continue;if(sd>0)idx.push(r+k,r2+k,r+k+1,r+k+1,r2+k,r2+k+1);else idx.push(r+k,r+k+1,r2+k,r+k+1,r2+k+1,r2+k)}}}});
   const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.setIndex(idx);g.computeVertexNormals();solM.side=THREE.DoubleSide;const m=new THREE.Mesh(g,solM);m.userData.talus=1;ETG.add(m)}
  ligne(u=>-larg(u)/2+.35,.12,false,0xe8e4d8);ligne(u=>larg(u)/2-.35,.12,false,0xe8e4d8);ligne(0,.1,true,0xf0d060);
  if(ET.mer){const pg=new THREE.BoxGeometry(3,1,3),pm=new THREE.MeshLambertMaterial({color:0x9a9890});for(let i=6;i<NP;i+=9){const p=RP[i],g2=p.x/K+P0[0],g3=p.z/K+P0[1];if(alt(g2,g3)>1)continue;const pi=new THREE.Mesh(pg,pm);pi.scale.y=p.y+2;pi.position.set(p.x,(p.y-2)/2,p.z);ETG.add(pi)}
   const gr=[];for(let i=0;i<=NP;i+=1){const p=RP[i],n=RN[i];gr.push(p.x+n.x*(larg()/2+.2),p.y+.7,p.z+n.z*(larg()/2+.2))}const gl=new THREE.BufferGeometry();gl.setAttribute('position',new THREE.Float32BufferAttribute(gr,3));ETG.add(new THREE.Line(gl,new THREE.LineBasicMaterial({color:0xcfcfc8})))}
  // les lampadaires (la nuit et en ville), les boîtes de nuit, le festival
  lum.length=0;if(ET.h==='nuit'||ET.h==='bleu'||ET.festival){for(let i=4;i<NP;i+=8){const p=RP[i],n=RN[i];[-1,1].forEach(sg=>{const m=new THREE.Sprite(new THREE.SpriteMaterial({map:tOr,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));m.position.set(p.x+n.x*sg*(larg()/2+2),p.y+6,p.z+n.z*sg*(larg()/2+2));m.scale.set(7,7,1);ETG.add(m);lum.push(m)})}}
  clubs.length=0;if(ET.clubs)CLUB.forEach((c,k2)=>{const i=Math.round(NP*(.1+.17*k2)),p=RP[i],n=RN[i],sg=k2%2?1:-1;const g=new THREE.Group();
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
   g.position.set(p.x+n.x*sg*(larg()/2+11),p.y,p.z+n.z*sg*(larg()/2+11));g.lookAt(p.x,p.y,p.z);ETG.add(g);clubs.push({i,n:c[0],col:c[1],style:c[2],g,hl})});
  fest=null;if(ET.festival){// la route du front de mer est barrée : barrières, foule, la scène et ses projecteurs ; on prend à droite vers la ville
   const i0=Math.round(NP*.32),p=RP[i0],t=RT[i0],n=RN[i0];const g=new THREE.Group();const sce=new THREE.Mesh(new THREE.BoxGeometry(22,1.5,12),new THREE.MeshLambertMaterial({color:0x2a2a2a}));sce.position.set(0,.75,0);g.add(sce);
   const toit=new THREE.Mesh(new THREE.BoxGeometry(24,.6,14),new THREE.MeshLambertMaterial({color:0x111111}));toit.position.y=10;g.add(toit);[[-11,-6],[11,-6],[-11,6],[11,6]].forEach(([a,b])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.5,10,.5),new THREE.MeshLambertMaterial({color:0x333333}));m.position.set(a,5,b);g.add(m)});
   ['#ffd23a','#ff4a4a','#4ad0ff'].forEach((c,k2)=>{const hl=new THREE.Sprite(new THREE.SpriteMaterial({map:tg(c),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));hl.position.set(-8+k2*8,8,7);hl.scale.set(16,16,1);g.add(hl);lum.push(hl)});
   const fo=new THREE.InstancedMesh(new THREE.CylinderGeometry(.35,.35,1.7,5),new THREE.MeshLambertMaterial({color:0xffffff}),140),q=new THREE.Object3D(),col=new THREE.Color();for(let k2=0;k2<140;k2++){q.position.set((Math.random()-.5)*44,.85,8+Math.random()*22);q.updateMatrix();fo.setMatrixAt(k2,q.matrix);fo.setColorAt(k2,col.setHSL(Math.random(),.5,.45))}g.add(fo);
   g.position.set(p.x+t.x*10-n.x*(larg()/2+42),p.y,p.z+t.z*10-n.z*(larg()/2+42));g.lookAt(p.x+t.x*10,p.y,p.z+t.z*10);ETG.add(g);fest={g,fo};
   const bar=new THREE.Mesh(new THREE.BoxGeometry(14,1.2,.4),new THREE.MeshBasicMaterial({color:0xd83a2a}));const bx=p.x-n.x*(larg()/2+3),bz=p.z-n.z*(larg()/2+3);bar.position.set(bx,p.y+.8,bz);bar.lookAt(bx+n.x,p.y+.8,bz+n.z);ETG.add(bar)}
  if(ET.volcan)volcan187();
  st.s=0;st.o=0;st.v=Math.min(st.v,ET.vmax/3.6*2.2*.5);st.dir=0}
 function volcan187(){const rand=(a)=>{let x=Math.sin(a*12.9898)*43758.5453;return x-Math.floor(x)};const at=(u,o)=>{const i=Math.min(NP,Math.max(0,Math.round(u*NP))),p=RP[i],n=RN[i];return new THREE.Vector3(p.x+n.x*o,hR(p.x+n.x*o,p.z+n.z*o),p.z+n.z*o)};
  // la forêt (tamarins des Hauts, cryptomérias) au début, puis la colline d'herbe, puis la plaine rouge sans arbres
  const tr=new THREE.InstancedMesh(new THREE.ConeGeometry(2.4,9,7),new THREE.MeshLambertMaterial({color:0x2c4a2a}),260),q=new THREE.Object3D();let nt=0;for(let k=0;k<260;k++){const u=rand(k)*.33,o=(rand(k+7)>.5?1:-1)*(larg()/2+4+rand(k+3)*40),v=at(u,o);q.position.set(v.x,v.y+4,v.z);q.scale.setScalar(.7+rand(k+9)*.8);q.updateMatrix();tr.setMatrixAt(nt++,q.matrix)}tr.count=nt;ETG.add(tr);
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
 const ligne=(o,lg,tiret,c)=>{const pos=[],idx=[];let n0=0;for(let i=0;i<NP;i++){if(tiret&&(i%6>2))continue;const A=RP[i],B=RP[i+1],nA=RN[i],nB=RN[i+1],oa=typeof o==='function'?o(i/NP):o,ob=typeof o==='function'?o((i+1)/NP):o;
   pos.push(A.x+nA.x*(oa-lg),A.y+.09,A.z+nA.z*(oa-lg),A.x+nA.x*(oa+lg),A.y+.09,A.z+nA.z*(oa+lg),B.x+nB.x*(ob-lg),B.y+.09,B.z+nB.z*(ob-lg),B.x+nB.x*(ob+lg),B.y+.09,B.z+nB.z*(ob+lg));idx.push(n0,n0+2,n0+1,n0+1,n0+2,n0+3);n0+=4}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);ETG.add(new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:c})))};
 const solM=new THREE.MeshLambertMaterial({color:0x6a7a50});let SATT=null;
 // l'image satellite à 10 m le long de la route de l'étape (Sentinel-2), posée par-dessus l'image de toute l'île, fondue sur les bords
 const HI={hiMap:{value:null},hiA:{value:new THREE.Vector2(1,1)},hiB:{value:new THREE.Vector2(0,0)},hiOn:{value:0}},HIC={};
 solM.onBeforeCompile=sh=>{Object.assign(sh.uniforms,HI);sh.fragmentShader='uniform sampler2D hiMap;uniform vec2 hiA,hiB;uniform float hiOn;\n'+sh.fragmentShader.replace('#include <map_fragment>','#ifdef USE_MAP\nvec4 texelColor=texture2D(map,vUv);vec2 hu=vUv*hiA+hiB;if(hiOn>.5&&hu.x>0.&&hu.x<1.&&hu.y>0.&&hu.y<1.){float e=min(min(hu.x,1.-hu.x),min(hu.y,1.-hu.y));texelColor=mix(texelColor,texture2D(hiMap,hu),smoothstep(0.,.04,e));}texelColor=mapTexelToLinear(texelColor);diffuseColor*=texelColor;\n#endif')};
 function hi187(k,W0,H0){try{const S=typeof SAT187!=='undefined'&&SAT187[k];if(!S){HI.hiOn.value=0;return}const [b0,b1,b2,b3]=S.b,kx=DEM.kx,ky=DEM.ky;
   HI.hiA.value.set(W0/kx/(b2-b0),-H0/ky/(b3-b1));HI.hiB.value.set((-MAR/kx+DEM.lo0-b0)/(b2-b0),(b3-DEM.la1+(H0-MAR)/ky)/(b3-b1));
   const go=tx=>{HI.hiMap.value=tx;HI.hiOn.value=1};if(HIC[k])return go(HIC[k]);HI.hiOn.value=0;const im=new Image();im.onload=()=>{const tx=new THREE.Texture(im);tx.encoding=THREE.sRGBEncoding;tx.flipY=false;tx.anisotropy=8;tx.needsUpdate=true;HIC[k]=tx;if(ET&&ET.osm===k)go(tx)};im.src=S.j}catch(e){HI.hiOn.value=0}}
 if(typeof SATJ!=='undefined'){const im=new Image();im.onload=()=>{const tx=new THREE.Texture(im);tx.encoding=THREE.sRGBEncoding;tx.flipY=false;tx.anisotropy=8;tx.needsUpdate=true;SATT=tx;solM.map=tx;solM.color.set(0xffffff);solM.needsUpdate=true};im.src=SATJ}
 const mer=new THREE.Mesh(new THREE.PlaneGeometry(40000,40000),new THREE.MeshLambertMaterial({color:0x123a55}));mer.rotation.x=-Math.PI/2;mer.position.y=-.5;sc.add(mer);
 const lum=[],clubs=[];let fest=null;const tg=(c)=>{const cv2=document.createElement('canvas');cv2.width=cv2.height=64;const x=cv2.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,c);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(cv2)};
 const tOr=tg('rgba(255,190,110,1)');const CLUB=[['séga mauricien','#ff7a3a','sega'],['électro','#3ad0ff','electro'],['disco','#ff4ad0','disco'],['maloya','#ffd23a','maloya'],['dancehall','#6aff5a','dancehall']];
 // ---- la voiture : une petite berline, feux arrière rouges, phares
 const car=new THREE.Group();{const caisse=new THREE.Mesh(new THREE.BoxGeometry(2,.7,4.2),new THREE.MeshLambertMaterial({color:0xb02a20}));caisse.position.y=.75;car.add(caisse);const hab=new THREE.Mesh(new THREE.BoxGeometry(1.7,.6,2.1),new THREE.MeshLambertMaterial({color:0x22262c}));hab.position.set(0,1.35,-.2);car.add(hab);
  const roue=new THREE.CylinderGeometry(.38,.38,.3,14).rotateZ(Math.PI/2),rm=new THREE.MeshLambertMaterial({color:0x111111});[[-1,-1.4],[1,-1.4],[-1,1.4],[1,1.4]].forEach(([a,b])=>{const r=new THREE.Mesh(roue,rm);r.position.set(a*.98,.38,b);car.add(r)});
  const feu=new THREE.Mesh(new THREE.BoxGeometry(1.7,.15,.05),new THREE.MeshBasicMaterial({color:0xff2a1a}));feu.position.set(0,.95,-2.12);car.add(feu);const fr=new THREE.Sprite(new THREE.SpriteMaterial({map:tg('rgba(255,40,20,1)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));fr.position.set(0,.95,-2.3);fr.scale.set(3.4,1.4,1);car.add(fr);
  const ph=new THREE.SpotLight(0xfff2d0,1.4,90,.5,.6);ph.position.set(0,1,2.2);ph.target.position.set(0,0,20);car.add(ph,ph.target)}
 sc.add(car);
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
 const fondu=(on)=>{flou.style.opacity=on?1:0};
 const key=(e,v)=>{const k=e.key.toLowerCase();const m={arrowleft:'g',q:'g',a:'g',arrowright:'d',d:'d',arrowup:'a',z:'a',w:'a',arrowdown:'f',s:'f',' ':'f'}[k];if(m){K2[m]=v;e.preventDefault();e.stopPropagation()}if(v&&k==='escape'){fermer(false)}};
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
 function pose(){const i=Math.min(NP-1,Math.floor(st.s)),f=st.s-i,p=RP[i].clone().lerp(RP[i+1],f),t=RT[i].clone().lerp(RT[i+1],f).normalize(),n=new THREE.Vector3(t.z,0,-t.x);p.addScaledVector(n,st.o);car.position.copy(p);car.position.y=RP[i].y*(1-f)+RP[i+1].y*f+.05;car.rotation.set(0,Math.atan2(t.x,t.z)+st.dir*.15,0);
  const pr=RP[Math.min(NP,i+3)],pente=(pr.y-RP[i].y)/12;car.rotation.x=-Math.atan(pente);return {p,t,n,i,pente}}
 st.dir=0;etape(0);window.R187={NP:()=>NP,etape:k=>{etape(k);st.phase='jeu';cmd.style.opacity=1;hud.style.opacity=1},st};
 function boucle(now){if(stop)return;requestAnimationFrame(boucle);const dt=Math.min(.05,(now-last)/1000);last=now;const tt=(now-T0)/1000;const P=pose(),u=st.s/NP;
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
   const E=ET,vmax=E.vmax/3.6*2.2,acc=K2.a?9:0,fr=K2.f?16:0,g=9.8*P.pente*.9;st.v+=(acc-fr-g-st.v*st.v*.0016-1.2*(st.v>0?1:0))*dt;if(!K2.a&&!K2.f)st.v-=2*dt;st.v=Math.max(0,Math.min(vmax,st.v));
   const w=larg()/2,braq=(K2.g?1:0)-(K2.d?1:0);st.dir+=(braq-st.dir)*Math.min(1,dt*7);st.o+=st.dir*dt*Math.min(16,6+st.v*.12);if(!braq)st.o-=st.o*Math.min(1,dt*.7);
   // la courbure pousse vers l'extérieur ; hors de la route, ça freine
   const i=P.i,a2=RT[Math.max(0,i-4)],b2=RT[Math.min(NP,i+4)],kc=a2.x*b2.z-a2.z*b2.x;st.o+=Math.max(-6,Math.min(6,kc*st.v*st.v*.0012))*dt;const bord=w-1.1;if(Math.abs(st.o)>bord){st.o=Math.sign(st.o)*bord;st.v*=1-dt*.9;st.frotte=.25}
   st.s+=st.v*dt/4;if(st.s>=NP-1){st.s=NP-1;if(ek<ETAPES.length-1){st.phase='trans';fondu(1);titre.style.opacity=0;setTimeout(()=>{etape(ek+1);const P2=pose();const bk=P2.t.clone().multiplyScalar(-9);cam.position.set(car.position.x+bk.x,car.position.y+3.5,car.position.z+bk.z);setTimeout(()=>{fondu(0);st.phase='jeu'},350)},900)}else{st.phase='fin';st.ft=tt;dire('Le Pas de Bellecombe<br><small style="font-size:17px">Le tour de l’île finit au volcan. Le gramoun se réveille sous son tamarin.</small>',4500);hud.style.opacity=0;cmd.style.opacity=0}}
   lumiere(u,1);hud.innerHTML=Math.round(st.v/2.2*3.6)+' km/h<br><span style="font-weight:500;opacity:.85">'+E.n+(ET.clubs&&style&&RYT[style]?' · '+CLUB.find(c=>c[2]===style)[0]:ET.festival?' · festival maloya':'')+' · étape '+(ek+1)+'/'+ETAPES.length+'</span>';
   // la caméra derrière le coffre, un peu haute, qui regarde devant dans le virage
   const back=P.t.clone().multiplyScalar(-1),vv=Math.min(1,st.v/60);fm.set(car.position.x+back.x*(8.5+vv*3),car.position.y+3.2+vv,car.position.z+back.z*(8.5+vv*3));cam.position.lerp(fm,Math.min(1,dt*5));const ahead=RP[Math.min(NP,P.i+10)];tgt.set(ahead.x,ahead.y+1,ahead.z);cam.lookAt(tgt);cam.fov=58+vv*14;cam.updateProjectionMatrix();
   if(AC&&mot){mot.frequency.setTargetAtTime(40+st.v*2.2+(P.pente>0?st.v*P.pente*4:0),AC.currentTime,.08);motG.gain.setTargetAtTime(.05+(K2.a?.06:0),AC.currentTime,.1)}}
  else if(st.phase==='fin'){// la caméra s'élève et découvre l'île, comme au début
   const k=Math.min(1,(tt-st.ft)/6),e=k*k;const back=P.t.clone().multiplyScalar(-1).applyAxisAngle(new THREE.Vector3(0,1,0),e*1.2);cam.position.set(car.position.x+back.x*(9+e*1500),car.position.y+3+e*1100,car.position.z+back.z*(9+e*1500));cam.lookAt(car.position);if(AC&&mg)mg.gain.value=.25*(1-k);if(k>=1&&!st.fini){st.fini=1;finale187()}}
  try{if(ETG&&ETG.userData.oiseaux){ETG.userData.oiseaux.forEach(m=>{const d2=m.position.distanceTo(car.position),fuit=d2<14;m.position.y=m.userData.y0+(fuit?Math.min(6,(14-d2)*.5):Math.abs(Math.sin(tt*3+m.userData.ph))*.25)});const pp=ETG.userData.pap,c=car.position;pp.position.set(c.x+Math.cos(tt*.3)*40,c.y+30,c.z+Math.sin(tt*.3)*40)}}catch(e){}
  musique(AC?AC.currentTime:0);R.render(sc,cam)}
 // la fin : le gramoun se réveille ; l'île vue de haut reste derrière le message
 function finale187(){const b=document.createElement('div');b.style.cssText='position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(5,8,12,.35);z-index:3';
  b.innerHTML='<div style="background:#1a1712;border:1px solid #e8be5a;border-radius:14px;padding:18px;max-width:460px;width:calc(100% - 32px);color:#efe9da;font:14px system-ui;text-align:center"><h3 style="margin:0 0 8px;font:700 22px Alegreya,Georgia,serif;color:#f0c46a">Le gramoun se réveille</h3><p style="opacity:.85;margin:0 0 12px">Sous son tamarin, il a fait le tour de l’île : le front de mer, la 4 voies, la route sur la mer, les laves, le festival, les Plaines et le volcan.</p><p style="opacity:.55;font-size:11px;margin:0 0 10px">Tracés des routes : © les contributeurs OpenStreetMap (ODbL), itinéraires OSRM. Relief et image satellite : Copernicus.</p><button class="bt">Revenir</button></div>';
  d.appendChild(b);b.querySelector('button').onclick=()=>fermer(true)}
 requestAnimationFrame(boucle)}
