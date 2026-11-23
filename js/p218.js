// ===== p218 : les eaux noires après la pluie — après une grosse pluie, à la sortie des rivières et des sources d'eau douce qui sortent sous la mer,
// l'eau est plus foncée au milieu du turquoise (le douce se mêle au salé). Le poisson y monte, les paille-en-queue et les noddis s'y battent en plongeant,
// et parfois une pirogue de pêcheurs vient s'y poser. Ça se voit d'en haut : des hauts de Saint-Denis, au bord du littoral. (observé par Paris) =====
const EAUX218={sites:null,L:{},der:-1e9,cyc:0};
// les sorties : l'embouchure de chaque rivière, et des sources sous la mer le long du littoral (Saint-Denis, la Grande Chaloupe, la baie de Saint-Paul)
function sites218(){if(EAUX218.sites)return EAUX218.sites;const S0=[];try{const cx=T.reduce((a,u)=>a+u.x,0)/T.length,cz=T.reduce((a,u)=>a+u.z,0)/T.length;
  const pose=(x,z,n,src)=>{let ux=x-cx,uz=z-cz;const l=Math.hypot(ux,uz)||1;ux/=l;uz/=l;let k=0;while(k<60&&alt(x+ux*k*.1,z+uz*k*.1)>=0)k++;S0.push({x:x+ux*(k*.1+.35),z:z+uz*(k*.1+.35),ux,uz,n,src,i:S0.length})};
  (typeof RIVS!=='undefined'?RIVS:[]).forEach(r=>pose(r.x1,r.z1,r.n,0));
  [[55.43,-20.875,'le littoral de Saint-Denis'],[55.395,-20.885,'la Grande Chaloupe'],[55.36,-20.905,'la Possession'],[55.27,-21.0,'la baie de Saint-Paul']].forEach(([lo,la,n])=>{const[x,z]=xz(lo,la);pose(x,z,n,1)})}catch(e){}
 return EAUX218.sites=S0}
// la tache : bords déchiquetés, plus sombre au cœur, qui s'étire vers le large
function tex218(){if(EAUX218.tx)return EAUX218.tx;const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');const g=x.createRadialGradient(128,128,10,128,128,124);
 g.addColorStop(0,'rgba(24,52,58,.95)');g.addColorStop(.45,'rgba(30,62,66,.75)');g.addColorStop(.8,'rgba(40,78,80,.3)');g.addColorStop(1,'rgba(40,78,80,0)');x.fillStyle=g;x.fillRect(0,0,256,256);
 x.globalCompositeOperation='destination-out';for(let i=0;i<70;i++){const a=Math.random()*6.28,r=80+Math.random()*50;x.beginPath();x.arc(128+Math.cos(a)*r,128+Math.sin(a)*r,8+Math.random()*22,0,6.28);x.fillStyle='rgba(0,0,0,'+(.3+Math.random()*.5)+')';x.fill()}
 x.globalCompositeOperation='source-over';for(let i=0;i<30;i++){x.strokeStyle='rgba(70,60,40,.12)';x.lineWidth=2+Math.random()*5;x.beginPath();const a=Math.random()*6.28;x.arc(128,128,30+Math.random()*70,a,a+.6+Math.random());x.stroke()}
 return EAUX218.tx=new THREE.CanvasTexture(c)}
// quelle force a l'eau douce : la grosse pluie qui vient de tomber, ou la saison d'après un cyclone
function force218(){try{if(!S||S.fin)return 0;const n=performance.now();const a=typeof averse174==='function'?averse174():0;if(a>.55)EAUX218.der=n;
  const pl=Math.max(0,1-Math.max(0,n-EAUX218.der-20000)/240000)*(EAUX218.der>0?1:0),cyc=S.cycNs!=null&&(S.ns||0)-S.cycNs<=1&&!(S.cyc&&S.cyc.in<=0)?.9:0;return Math.max(pl,cyc)}catch(e){return 0}}
function oiseaux218(site,G){const B=[];if(typeof inst144!=='function')return B;
 const add=(nom,o,k,esp)=>inst144(nom,o).then(x=>{G.add(x.w);B.push({w:x.w,k,esp,r:.25+Math.random()*.35,a:Math.random()*6.28,v:(.5+Math.random()*.5)*(Math.random()<.5?-1:1),h:.35+Math.random()*.4,pl:0})}).catch(()=>{});
 for(let i=0;i<2+Math.floor(Math.random()*2);i++)add('oi_phaeton',{h:.22,long:true,yaw:-Math.PI/2,tint:0xf6f4ee},i,'paille');
 for(let i=0;i<3+Math.floor(Math.random()*3);i++)add('oi_petrel',{h:.16,long:true,yaw:-Math.PI/2,tint:0x7a6656},i,'noddi');return B}
function cree218(s){const G=new THREE.Group();scene.add(G);const m=new THREE.MeshBasicMaterial({map:tex218(),transparent:true,depthWrite:false,opacity:0});
 const t=new THREE.Mesh(new THREE.PlaneGeometry(1,1),m);t.rotation.x=-Math.PI/2;t.rotation.z=-Math.atan2(s.uz,s.ux);t.scale.set(s.src?1.1:1.6,s.src?.9:.85,1);t.position.set(s.x,.018,s.z);t.renderOrder=1;G.add(t);
 // les remous du poisson : petites gerbes blanches qui éclatent ici et là
 const n=24,gp=new THREE.BufferGeometry(),P=new Float32Array(n*3);gp.setAttribute('position',new THREE.BufferAttribute(P,3));const pts=new THREE.Points(gp,new THREE.PointsMaterial({color:0xffffff,size:.035,transparent:true,opacity:.8,depthWrite:false}));pts.frustumCulled=false;G.add(pts);
 const o={s,G,t,pts,vie:new Float32Array(n),B:oiseaux218(s,G),pir:null,f:0};
 if(Math.random()<.4&&typeof g168Navire==='function'){const p=new THREE.Group(),c=g168Navire('pirogue');c.scale.setScalar(1.4);p.add(c);if(typeof rameur172==='function')rameur172(S.voieC?'homme_chemise':'jeune_pagne',.1).then(r=>{r.position.set(0,.04,0);r.rotation.y=Math.PI/2;c.add(r)}).catch(()=>{});G.add(p);o.pir=p}
 return o}
function anime218(o,F,now,dt){const s=o.s;o.f+=(F-o.f)*Math.min(1,dt*.6);o.t.material.opacity=.55*o.f;const k=.75+o.f*.5;o.t.scale.set((s.src?1.1:1.6)*k,(s.src?.9:.85)*k,1);o.t.position.set(s.x+s.ux*.15*o.f+Math.sin(now*.05+s.i)*.03,.018,s.z+s.uz*.15*o.f);
 const A=o.pts.geometry.attributes.position;for(let i=0;i<A.count;i++){o.vie[i]-=dt;if(o.vie[i]<=0){if(Math.random()<.04*o.f){const a=Math.random()*6.28,r=Math.random()*.4;A.setXYZ(i,s.x+Math.cos(a)*r,.03,s.z+Math.sin(a)*r);o.vie[i]=.25+Math.random()*.3}else A.setXYZ(i,0,-99,0)}else A.setY(i,A.getY(i)+dt*.08)}A.needsUpdate=true;
 o.B.forEach((b,j)=>{b.a+=dt*b.v*(.8+o.f);if(b.pl<=0&&Math.random()<dt*.25*o.f)b.pl=1.4;let y=b.h;if(b.pl>0){b.pl-=dt;y=b.h*Math.abs(Math.cos((1.4-b.pl)/1.4*Math.PI))+.02}
  // la bagarre : de temps en temps, deux oiseaux se croisent de près, l'un fond sur l'autre
  const rival=o.B[(j+1)%o.B.length],bat=rival&&rival!==b&&Math.sin(now*.7+j*2.1)>.93;const r=bat?.12:b.r,ax=s.x+Math.cos(b.a)*r,az=s.z+Math.sin(b.a)*r*.8;
  const px=b.w.position.x,pz=b.w.position.z;b.w.position.set(ax,(bat?y*.6:y)*(.3+o.f*.7),az);if(Math.hypot(ax-px,az-pz)>1e-4)b.w.rotation.y=Math.atan2(ax-px,az-pz);b.w.rotation.z=bat?Math.sin(now*9+j)*.6:-Math.sign(b.v)*.25;b.w.visible=o.f>.15});
 if(o.pir){const a=now*.04+s.i;o.pir.position.set(s.x-s.ux*.15+Math.cos(a)*.22,.01+Math.sin(now*1.3)*.005,s.z-s.uz*.15+Math.sin(a)*.15);o.pir.rotation.y=-a;o.pir.visible=o.f>.3&&jour218()}}
function jour218(){const ph=typeof jourPh==='function'?jourPh():.4;return ph>.12&&ph<.72}
{let tp=performance.now();setInterval(()=>{try{if(typeof scene==='undefined'||!S||!T||!T.length)return;const now=performance.now(),dt=Math.min(.3,(now-tp)/1000);tp=now;
  const F=force218(),voir=F>.05&&dist<28&&!(typeof VP!=='undefined'&&VP)&&!(typeof CINE!=='undefined'&&CINE);const vus={};
  if(voir)sites218().map(s=>[s,Math.hypot(s.x-camT.x,s.z-camT.z)]).filter(([s,d])=>d<dist*1.4+3&&(!T.length||true)).sort((a,b)=>a[1]-b[1]).slice(0,4).forEach(([s])=>vus[s.i]=s);
  for(const k in EAUX218.L){const o=EAUX218.L[k];if(!vus[k]){o.f-=dt*.5;if(o.f<=0){scene.remove(o.G);delete EAUX218.L[k]}else anime218(o,0,now/1000,dt)}}
  for(const k in vus){let o=EAUX218.L[k];if(!o)o=EAUX218.L[k]=cree218(vus[k]);anime218(o,F,now/1000,dt)}
  // la première fois qu'on le voit dans une partie : la fiche
  if(voir&&Object.keys(vus).length&&!S.vu218&&Object.values(EAUX218.L).some(o=>o.f>.4)){S.vu218=1;S.done=S.done||{};if(!S.done.eaux218&&S.evq&&!S.evq.includes('eaux218'))S.evq.push('eaux218')}}catch(e){}},50)}
EV.eaux218={y:1663,si:()=>!!(S&&S.vu218),tag:'Nature',an:'après les grosses pluies',t:'Les eaux noires',
 get b(){return 'Après la grosse pluie, au bout des rivières et devant certaines falaises, la mer change : au milieu du turquoise, une tache plus sombre. C’est l’eau douce qui sort, par la rivière ou par-dessous, des sources qui coulent sous la mer. Le poisson y monte. Les paille-en-queue et les noddis arrivent, plongent, se volent les prises en plein air. '+(S.voieC?'Les pêcheurs le savent : ils mettent la pirogue au bord de la tache.':'Ceux d’en haut le voient de loin, depuis le bord des remparts : la mer leur dit où le poisson est.')},
 v:'L’eau douce se voit d’en haut.',h:'Observation de pêcheurs et de promeneurs, vue des hauteurs de Saint-Denis au-dessus du littoral. Les nappes de l’île se déversent aussi sous la mer, le long des côtes ; les rivières en crue font de même en surface.',
 o:[{n:'Regarder',d:'Savoir +1.',fx:{savoir:1}}]};
