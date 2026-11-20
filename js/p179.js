
// ===== p179 : les grosses pluies sur le centre de l'île =====
// Quand un cyclone ou une forte pluie s'abat sur les Hauts : les grosses rivières débordent, le fond des cirques devient rivière,
// presque chaque pente porte sa cascade (petite ou grosse selon le plateau qui l'alimente au-dessus), et les sources du rempart
// (rivières souterraines) crachent leur trop-plein. Là où une source sort au-dessus d'un bassin, l'eau tourne : ce sont les bassins
// où, dit-on, des tourbillons ont emporté des baigneurs (récit transmis, non prouvé) — les baigneurs du jeu les évitent.
function grossePluie179(z0){try{if(!S||S.fin)return 0;const c=S.cyc;if(c&&c.in<=0)return 1;if(c&&c.in===1)return .6;
 const post=S.cycNs!=null&&(S.ns||0)-S.cycNs<=1;if(post)return (z0==='vent'||z0==='sudSauvage')?.6:0;
 const sais=typeof pluie==='function'&&pluie();if(!sais)return 0;const a=typeof averse174==='function'?averse174():0;return (z0==='vent'||z0==='sudSauvage'||z0==='centre')&&a>.4?.4:0}catch(e){return 0}}
const GP179={casc:null,crue:null,tourb:[],t0:performance.now()};
// 1) les cascades des pentes : sous un plateau (cases hautes et peu pentues juste au-dessus), une pente raide porte une chute
function gpCasc179(){const L=[];const cand=T.filter(t=>!t.sea&&t.slope>20&&t.alt>150&&t.alt<2300);
 cand.forEach(t=>{const up=(t.nb||[]).map(i=>T[i]).filter(u=>u&&u.alt>t.alt+40);let pl=0;const vus=new Set();up.forEach(u=>{if(u.slope<16){pl++;vus.add(u.i)}(u.nb||[]).forEach(i=>{const w=T[i];if(w&&!vus.has(i)&&w.alt>u.alt&&w.slope<16){pl++;vus.add(i)}})});
  if(!up.length)return;t.gp179=pl;L.push(t)});
 L.sort((a,b)=>(b.gp179+rndH(b.i*2.7)*2)-(a.gp179+rndH(a.i*2.7)*2));
 const G=[];for(const t of L){if(G.length>=160)break;if(G.some(g=>Math.hypot(g.position.x-t.x,g.position.z-t.z)<.9))continue;
  const e=.08,gx=alt(t.x+e,t.z)-alt(t.x-e,t.z),gz=alt(t.x,t.z+e)-alt(t.x,t.z-e),gl=Math.hypot(gx,gz)||1,dx=-gx/gl,dz=-gz/gl;
  const hT=Math.max(0,alt(t.x-dx*.18,t.z-dz*.18)),hB=Math.max(0,alt(t.x+dx*.18,t.z+dz*.18)),H=(hT-hB)*VX;if(H<.08)continue;
  const w=Math.min(.09,.012+t.gp179*.008),g=new THREE.Group();g.position.set(t.x+dx*.18,hB*VX+.005,t.z+dz*.18);g.rotation.y=Math.atan2(dx,dz);
  const pg=new THREE.PlaneGeometry(w,H,1,6);pg.translate(0,H/2,0);const m=new THREE.Mesh(pg,eauMat147());m.position.z=-.16;m.rotation.x=-Math.atan2(.36,H)*.55;g.add(m);
  const br=new THREE.Sprite(new THREE.SpriteMaterial({map:brumeTex147(),transparent:true,opacity:.4,depthWrite:false}));br.scale.set(w*3,w*1.6,1);br.position.y=.02;g.add(br);
  g.userData={t,z0:pluieLieu174(t.x,t.z).z,w};g.visible=false;scene.add(g);G.push(g)}
 return G}
// 2) la crue des cirques : un large ruban d'eau boueuse sur le fond de vallée, là où les rivières traversent un cirque ; et les grosses rivières qui sortent de leur lit en bas
function gpCrue179(){const g=new THREE.Group();const mat=new THREE.MeshBasicMaterial({color:0x8a7550,transparent:true,opacity:.0,depthWrite:false,side:THREE.DoubleSide});
 RIV126.forEach(r=>{if(r.br)return;let run=[];const fin=()=>{if(run.length<4){run=[];return}const V=[],I=[];run.forEach((q,j)=>{const a=run[Math.max(0,j-2)],b=run[Math.min(run.length-1,j+2)];let dx=b[0]-a[0],dz=b[1]-a[1];const L=Math.hypot(dx,dz)||1;dx/=L;dz/=L;const h=Math.max(0,alt(q[0],q[1])),w=q[2];
   [-1,1].forEach(s=>{const x=q[0]-dz*w*s,z=q[1]+dx*w*s;V.push(x,Math.max(h,Math.max(0,alt(x,z))*.0+h)*VX+.03,z)});if(j){const o=(j-1)*2;I.push(o,o+1,o+2,o+1,o+3,o+2)}});
   const G2=new THREE.BufferGeometry();G2.setAttribute('position',new THREE.Float32BufferAttribute(V,3));G2.setIndex(I);const m=new THREE.Mesh(G2,mat);m.renderOrder=3;g.add(m);run=[]};
  r.P.forEach((q,i)=>{if(i%3)return;const t=tileAt({x:q[0],z:q[1]}),h=alt(q[0],q[1]);if(!t||h<=1){fin();return}
   const cirq=t.cirq&&h<1400,bas=h<120;if(cirq||bas)run.push([q[0],q[1],cirq?.16+.06*Math.sin(i*.07):.1]);else fin()});fin()});
 g.userData.mat=mat;g.visible=false;scene.add(g);return g}
// 3) les bassins à tourbillon : un bassin de cascade avec une source du rempart juste au-dessus
function gpTourb179(){if(!C147.L||!RES177.L)return [];const out=[];C147.L.forEach(G=>{if(!G.userData.petite)return;const bas=G.children.find(c=>c.geometry&&c.geometry.type==='CircleGeometry');if(!bas)return;
  const p=bas.getWorldPosition(new THREE.Vector3());if(!RES177.L.some(R=>Math.hypot(R.position.x-p.x,R.position.z-p.z)<1.1))return;if(out.length>=6)return;
  G.userData.tourb=1;G.userData.n='Bassin à tourbillon';G.userData.lieuN='récit transmis, non prouvé';
  const sp=new THREE.Mesh(new THREE.RingGeometry(.012,.07,24,1,0,Math.PI*1.6).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0xe8f4f6,transparent:true,opacity:.35,depthWrite:false}));sp.position.copy(bas.position);sp.position.y+=.004;G.add(sp);out.push(sp)});return out}
(function att179(){try{if(typeof scene!=='undefined'&&window.RIV126&&RIV126.length&&T&&T.length&&typeof eauMat147==='function'){if(!GP179.casc)GP179.casc=gpCasc179();if(!GP179.crue)GP179.crue=gpCrue179();if(!GP179.tourb.length&&C147.riv&&RES177.L)GP179.tourb=gpTourb179()}}catch(e){GP179.err=e.message}
 if(!GP179.casc||!GP179.crue||!GP179.tourb.length)setTimeout(att179,2500)})();
(function boucle179(){requestAnimationFrame(boucle179);try{if(!GP179.casc||!S)return;const t=(performance.now()-GP179.t0)/1000;
 const vu=!(typeof VP!=='undefined'&&VP)&&!(typeof K!=='undefined'&&K)&&!(typeof CINE!=='undefined'&&CINE)&&!S.fin&&dist<24;
 const Gc=grossePluie179('centre');
 GP179.casc.forEach((g,i)=>{const G=grossePluie179(g.userData.z0);const on=vu&&G>0&&seen(g.userData.t)&&Math.hypot(g.position.x-camT.x,g.position.z-camT.z)<dist*1.3+3;g.visible=on;if(on){g.children[0].scale.x=.5+G;g.children[1].material.opacity=.25+.2*G+.08*Math.sin(t*1.5+i)}});
 if(GP179.crue){const on=vu&&Gc>=.55;GP179.crue.visible=on;GP179.crue.userData.mat.opacity=on?Math.min(.75,.3+Gc*.45):0}
 GP179.tourb.forEach((s,i)=>{s.rotation.y=-t*(1.2+Gc*3);s.material.opacity=.3+Gc*.4});
 // les sources du rempart crachent leur trop-plein
 if(RES177.L&&Gc>0)RES177.L.forEach(R=>{if(R.visible)R.children[0].scale.x=Math.max(R.children[0].scale.x,(1+Gc*3))});
 if(Gc>=.55&&modeHist&&!S.gp179&&GP179.casc.some(g=>g.visible)){S.gp179=1;try{S.evq.push('grossesPluies179')}catch(e){}}}catch(e){}})();
EV.grossesPluies179={sys:1,tag:'Nature',an:'',t:'Les grosses pluies sur les Hauts',b:'La pluie s’abat sur le centre de l’île. Les grosses rivières sortent de leur lit, le fond des cirques n’est plus qu’une rivière d’un rempart à l’autre, et sur presque chaque pente une cascade s’ouvre : un filet sous un petit replat, une chute énorme sous un grand plateau. Les sources du rempart crachent l’eau qui a traversé la roche. Au pied de certaines, dans les bassins, l’eau tourne.',
 v:'On ne traverse plus rien : on attend que l’eau baisse.',h:'Vrai : La Réunion détient des records mondiaux de pluie — 1 825 mm en 24 heures à Foc-Foc (cyclone Denise, janvier 1966), 3 929 mm en 72 heures au cratère Commerson (cyclone Gamède, février 2007). Les rivières passent alors de quelques mètres cubes à des milliers de mètres cubes par seconde. Les tourbillons de bassins qui auraient emporté des baigneurs : récit transmis, non prouvé.',
 o:[{n:'Rester à l’abri et attendre la décrue',d:'Cohésion +1.',fx:{coh:1},hist:1}]};
// ===== 4) des rivières qui virent au marron, et les glissements de terrain =====
// Pendant les grosses pluies, certaines rivières (pas toutes) charrient la terre des pentes : l'eau devient marron. En cyclone, toutes.
setInterval(()=>{try{if(typeof RIVG126==='undefined'||!RIVG126.g||!S)return;const G=grossePluie179('centre'),cyc=S.cyc&&S.cyc.in<=0;
 RIVG126.g.children.forEach(m=>{if(!m.material||!m.geometry||m.material.type!=='ShaderMaterial')return;if(m.userData.mud==null){const p=m.geometry.attributes.position;m.userData.mud=rndH(Math.round(p.getX(0)*7)+Math.round(p.getZ(0)*13)*.37)}
  const boue=cyc||(G>=.4&&m.userData.mud<.5);const want=eauRiv147(boue);if(m.material!==want)m.material=want})}catch(e){}},1000);
// Glissements : sur une pente très raide, un pan de terre part et descend en coulée jusqu'au fond. Plus fréquents quand une saison sèche a fissuré le sol.
const GL179={L:[],ns:-1};
function glisser179(t){const g=new THREE.Group();const P=[[t.x,t.z]];let x=t.x,z=t.z;for(let k=0;k<40;k++){let bh=alt(x,z),bx=null,bz=null;for(let a=0;a<12;a++){const an=a/12*6.283,X=x+Math.cos(an)*.04,Z=z+Math.sin(an)*.04,h=alt(X,Z);if(h<bh){bh=h;bx=X;bz=Z}}if(bx==null)break;x=bx;z=bz;P.push([x,z]);if(window.RIV126&&RIV126.some(r=>r.P.some(q=>Math.hypot(q[0]-x,q[1]-z)<.05)))break}
 if(P.length<4)return null;const V=[],I=[];P.forEach((q,j)=>{const a=P[Math.max(0,j-1)],b=P[Math.min(P.length-1,j+1)];let dx=b[0]-a[0],dz=b[1]-a[1];const L=Math.hypot(dx,dz)||1;dx/=L;dz/=L;const w=(j<3?.07:.035)*(1-j/P.length*.4),h=Math.max(0,alt(q[0],q[1]));
  [-1,1].forEach(s=>V.push(q[0]-dz*w*s,h*VX+.02,q[1]+dx*w*s));if(j){const o=(j-1)*2;I.push(o,o+1,o+2,o+1,o+3,o+2)}});
 const G2=new THREE.BufferGeometry();G2.setAttribute('position',new THREE.Float32BufferAttribute(V,3));G2.setIndex(I);const m=new THREE.Mesh(G2,new THREE.MeshBasicMaterial({color:0x7a5536,transparent:true,opacity:.85,depthWrite:false,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-3}));m.renderOrder=2;g.add(m);
 g.userData={t,ns:S.ns||0};scene.add(g);return g}
setInterval(()=>{try{if(!S||S.fin||typeof T==='undefined')return;const ns=S.ns||0,sec=!(typeof pluie==='function'&&pluie());
 if(GL179.ns!==ns){GL179.ns=ns;if(sec&&grossePluie179('centre')===0)S.sec179=(S.sec179||0)+1;GL179.essai=0}
 // les coulées vieillissent : la végétation reprend en quelques saisons
 GL179.L=GL179.L.filter(g=>{const age=ns-g.userData.ns;g.children[0].material.opacity=Math.max(0,.85-age*.18);g.visible=!(typeof VP!=='undefined'&&VP)&&!(typeof K!=='undefined'&&K)&&seen(g.userData.t);if(age>5){scene.remove(g);g.children[0].geometry.dispose();return false}return true});
 const G=grossePluie179('centre');if(G<.4||GL179.essai>=2)return;GL179.essai++;
 const an=S.an||S.y||1700,p=Math.min(.9,(.25+G*.3)*(1+Math.min(2,S.sec179||0)*.5));if(rndH(ns*3.1+GL179.essai*7.7+an)>p)return;
 const C=T.filter(t=>!t.sea&&!t.bare&&t.slope>32&&t.alt>200&&seen(t));if(!C.length)return;const t=C[Math.floor(rndH(ns*1.9+an)*C.length)];const g=glisser179(t);if(!g)return;GL179.L.push(g);
 const apresSec=(S.sec179||0)>=1;S.sec179=0;if(typeof log==='function')log('Un pan de pente a glissé sous la pluie : une coulée de boue descend jusqu’au fond de la ravine'+(apresSec?' — le sol, fendu par la sécheresse d’avant, a bu l’eau d’un coup.':'.'));
 if(!S.gl179f){S.gl179f=1;try{S.evq.push('glissement179')}catch(e){}}}catch(e){GL179.err=e.message}},3000);
EV.glissement179={sys:1,tag:'Nature',an:'',t:'La pente qui glisse',b:'Après des jours de pluie, un pan de la pente se détache : arbres, terre et pierres descendent d’un bloc, puis la boue coule jusqu’à la rivière, qui devient marron.',
 v:'Le sentier d’hier n’existe plus.',h:'Vrai : les glissements de terrain et les éboulements sont fréquents à La Réunion — remparts raides, roche fracturée, pluies parmi les plus fortes du monde. L’écroulement de Mahavel (1965, Rivière Saint-Étienne) a fait descendre des dizaines de millions de m³. Le glissement de Grand Îlet (Salazie) bouge encore aujourd’hui. Une saison sèche qui fend les sols aggrave les choses quand la pluie revient, mais la cause première reste la pluie qui tombe sur des pentes instables.',
 o:[{n:'Rouvrir le sentier plus loin',d:'Cohésion +1.',fx:{coh:1},hist:1}]};
// ===== le conte passe vite sur les événements qui reviennent (la halte sur le sentier, etc.) : juste le temps de lire le titre =====
const REP179={trChoix:1};
{const c0=choisir;choisir=function(id){try{if(S){S.vuE179=S.vuE179||{};S.vuE179[id]=(S.vuE179[id]||0)+1}}catch(e){}return c0.apply(this,arguments)}}
function repConte179(){try{if(!S||!S.evq||!S.evq.length)return false;const id=S.evq[0],e=EV[id];if(!e)return false;if(typeof evDecisif==='function'&&evDecisif(id))return false;
 if(REP179[id])return true;let an='';try{an=e.an||''}catch(x){}return !an&&(S.vuE179&&S.vuE179[id]>=1)}catch(e){return false}}
{const l0=lecture;lecture=function(){try{const m=$('modal');if(m&&!m.hidden&&repConte179())return 1600}catch(e){}return l0.apply(this,arguments)}}
