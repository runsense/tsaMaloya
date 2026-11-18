// ===== p108 : la carte vivante (Vie et Histoire) — oiseaux, bêtes, rivières, cavernes connues, plantes de la mystique =====
// Tout se voit quand on regarde de près (zoom). Petits objets légers autour de ce qu'on regarde, refaits quand la vue se déplace.
const VIV108={g:null,cle:'',b:[],o:[],t0:performance.now()};
function viv108Mat(c,o){return new THREE.MeshLambertMaterial(Object.assign({color:c},o||{}))}
function viv108Icone(txt){const cv=document.createElement('canvas');cv.width=cv.height=64;const x=cv.getContext('2d');x.font='44px serif';x.textAlign='center';x.textBaseline='middle';x.shadowColor='rgba(255,240,170,.9)';x.shadowBlur=14;x.fillText(txt,32,34);const t=new THREE.CanvasTexture(cv);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,depthWrite:false,transparent:true}));s.scale.set(.2,.2,1);return s}
// la taille d'une rivière et de son embouchure : la Rivière des Galets d'abord, puis la Rivière des Pluies, puis les autres
function RIVF108(n){return {'la Rivière des Galets':1.5,'la Rivière Saint-Étienne':1.35,'la Rivière des Pluies':1.2,'la Rivière du Mât':1.05,'la Rivière des Marsouins':1,'la Rivière de l’Est':1,'la Rivière des Remparts':.9,'la Rivière Langevin':.9,'la Rivière des Roches':.9,'la Rivière Saint-Denis':.85}[n]||.7}
function bas108(x,z){let bx=x,bz=z,bh=alt(x,z);for(let i=-4;i<=4;i++)for(let j=-4;j<=4;j++){if(i*i+j*j>16)continue;const X=x+i*.1,Z=z+j*.1,h=alt(X,Z);if(h<bh-.5){bh=h;bx=X;bz=Z}}return [bx,bz]}
function viv108Bati(){const g=new THREE.Group();VIV108.b=[];VIV108.o=[];const c=tileAt(camT);if(!c)return g;const P=T.filter(t=>Math.hypot(t.x-camT.x,t.z-camT.z)<Math.max(4,dist*.7)&&seen(t));
 // les rivières : un ruban d'eau qui serpente d'une case de rivière à la suivante, vers l'aval.
 // Gros temps : elle gonfle et déborde ; saison sèche : elle maigrit, et dans l'Ouest elle s'assèche (lit de galets)
 const cyc=S.cyc&&S.cyc.in<=0,pl=pluie(),eauM=viv108Mat(cyc?0x7a6a4a:0x3d8db5,{transparent:true,opacity:.85,side:THREE.DoubleSide}),galM=viv108Mat(0xb8b0a0,{side:THREE.DoubleSide});
 P.filter(t=>t.riv&&t.alt>0).forEach(t=>{const n=t.nb.map(i=>T[i]).filter(u=>u.riv&&u.alt<t.alt).sort((a,b)=>a.alt-b.alt)[0]||t.nb.map(i=>T[i]).filter(u=>u.alt<=0).sort((a,b)=>a.alt-b.alt)[0];if(!n)return;
  const ouest=LL99(t).lon<55.45,sec=!pl&&!cyc&&ouest;const w=cyc?.32:pl?.12:sec?.07:.06;
  const a=new THREE.Vector3(t.x,0,t.z),b=new THREE.Vector3(n.x,0,n.z),d=b.clone().sub(a),per=new THREE.Vector3(-d.z,0,d.x).normalize(),k=((t.i*9301+49297)%233280)/233280-.5,k2=((t.i*7919)%997)/997-.5;
  const C=new THREE.CatmullRomCurve3([a,a.clone().lerp(b,.33).addScaledVector(per,k*.35),a.clone().lerp(b,.66).addScaledVector(per,k2*.3),b]);let Q=C.getPoints(14);const V=[],I=[];{/* la rivière suit la vraie pente : on part du fond près de la case et on descend toujours vers le plus bas */
   const st=bas108(t.x,t.z),L=Math.hypot(n.x-t.x,n.z-t.z),D=[];let x=st[0],z=st[1],px=n.x-t.x,pz=n.z-t.z;const pl=Math.hypot(px,pz)||1;px/=pl;pz/=pl;D.push(new THREE.Vector3(x,0,z));
   for(let k=0;k<Math.ceil(L*2.2/.06);k++){let bh=alt(x,z),bx=null,bz=null;for(let a=0;a<16;a++){const an=a/16*6.283,dx=Math.cos(an),dz=Math.sin(an);if(dx*px+dz*pz<-.2)continue;const X=x+dx*.06,Z=z+dz*.06,h=alt(X,Z)-(dx*px+dz*pz)*.4;if(h<bh){bh=h;bx=X;bz=Z}}
    if(bx==null)break;px=(bx-x)/.06*.6+px*.4;pz=(bz-z)/.06*.6+pz*.4;const ql=Math.hypot(px,pz)||1;px/=ql;pz/=ql;x=bx;z=bz;D.push(new THREE.Vector3(x,0,z));if(alt(x,z)<=0||Math.hypot(x-n.x,z-n.z)<.12)break}
   if(D.length>=4){const E=[];for(let q=0;q<D.length;q+=2)E.push(D[q]);if(E[E.length-1]!==D[D.length-1])E.push(D[D.length-1]);Q=E}}
  const TG=j=>{const a=Q[Math.max(0,j-1)],b=Q[Math.min(Q.length-1,j+1)];return new THREE.Vector3(b.x-a.x,0,b.z-a.z).normalize()};
  Q.forEach((q,j)=>{const tg=TG(j),pp=new THREE.Vector3(-tg.z,0,tg.x).normalize();const hq=Math.max(0,alt(q.x,q.z)),ww=w*RIVF108(t.riv)*(1+Math.max(0,(60-hq)/60)*1.2)*(hq>500?(pl||cyc?1:.75):1);[-1,1].forEach(sg=>{const x=q.x+pp.x*ww*sg,z=q.z+pp.z*ww*sg;V.push(x,Math.max(0,alt(x,z))*VX+.03,z)});if(j){const o=(j-1)*2;I.push(o,o+1,o+2,o+1,o+3,o+2)}});
  const G=new THREE.BufferGeometry();G.setAttribute('position',new THREE.Float32BufferAttribute(V,3));G.setIndex(I);G.computeVertexNormals();g.add(new THREE.Mesh(G,sec?galM:eauM));
  if(cyc){const f=new THREE.Mesh(new THREE.CircleGeometry(.55,16),viv108Mat(0x7a6a4a,{transparent:true,opacity:.45}));f.rotation.x=-Math.PI/2;f.position.set(t.x,t.alt*VX+.025,t.z);g.add(f)}
  // un poisson de temps en temps (pas dans un lit à sec)
  if(!sec&&rnd()<.35){const f=new THREE.Mesh(new THREE.SphereGeometry(.018,6,4),viv108Mat(0xc8d6e0));f.scale.set(2,1,1);g.add(f);VIV108.b.push({k:'poisson',o:f,C,ph:Math.random()*6})}});
 // les bêtes : cabris, cochons marrons, tangues, sur les cases boisées ou de savane
 const cols={cabri:0x8a6a4a,cochon:0x3a2e28,tangue:0x6b5038,boeuf:0x7a4a2a};let nb=0;P.filter(t=>!t.bare&&t.alt>20&&!camps().some(c=>c.i===t.i)).forEach((t,i)=>{const pr=(S.gibP||{})[t.i]||0,col=(S.towns||[]).length*.03;const dens=Math.max(0,1-pr*1.2-col)*(t.forest?.8:1);const q=Math.round(dens*2.2*(((t.i*13)%10)/10+.4));for(let j=0;j<q&&nb<30;j++,nb++){const k=t.forest?((i+j)%2?'cochon':'tangue'):(S.year>1700&&(i+j)%3===0?'boeuf':'cabri');const o=new THREE.Group();const corps=new THREE.Mesh(new THREE.BoxGeometry(.09,.05,.04),viv108Mat(cols[k]));corps.position.y=.06;const tete=new THREE.Mesh(new THREE.BoxGeometry(.035,.035,.03),viv108Mat(cols[k]));tete.position.set(.06,.08,0);o.add(corps,tete);
  [[-.03,.015],[.03,.015],[-.03,-.015],[.03,-.015]].forEach(([x,z])=>{const p=new THREE.Mesh(new THREE.CylinderGeometry(.006,.006,.04,4),viv108Mat(0x2a2018));p.position.set(x,.02,z);o.add(p)});if(k==='cabri'){const c1=new THREE.Mesh(new THREE.ConeGeometry(.008,.03,4),viv108Mat(0xd8d0c0));c1.position.set(.065,.11,0);o.add(c1)}
  const ox=(j-q/2)*.18;o.position.set(t.x+ox,t.alt*VX,t.z+ox*.6);if(k==='boeuf')o.scale.setScalar(1.6);g.add(o);VIV108.b.push({k,o,cx:t.x+ox,cz:t.z+ox*.6,cap:Math.random()*6,ph:Math.random()*6})}});
 // les oiseaux : deux vols qui tournent au-dessus
 const nOis=Math.max(1,5-Math.floor((S.oisP106||0)/3));for(let v=0;v<2;v++)for(let i=0;i<nOis;i++){const o=new THREE.Group(),m=viv108Mat(v?0xf2f2ea:0x2a2a2a,{side:THREE.DoubleSide});const ai=[1,-1].map(sg=>{const w=new THREE.Mesh(new THREE.PlaneGeometry(.045,.014),m);w.position.x=sg*.022;o.add(w);return w});const c=new THREE.Mesh(new THREE.SphereGeometry(.008,5,4),m);c.scale.z=2;o.add(c);g.add(o);VIV108.b.push({k:'oiseau',o,v,i,ai})}
 // les cavernes connues : une bouche sombre dans la pente
 try{Object.keys(S.cav97||{}).map(Number).map(i=>T[i]).filter(t=>t&&P.includes(t)).forEach(t=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.12,10,6,0,Math.PI*2,0,Math.PI/2),viv108Mat(0x0e0b09));m.scale.set(1,.8,.5);m.position.set(t.x+.25,t.alt*VX+.02,t.z+.1);g.add(m);const s=viv108Icone('🕳️');s.position.set(t.x+.25,t.alt*VX+.32,t.z+.1);g.add(s)})}catch(e){}
 // les plantes et pierres de la mystique, là où elles poussent (marrons) : une petite lueur
 try{if(!S.voieC&&typeof ING99!=='undefined'){let n=0;P.forEach(t=>{if(n>14)return;const ok=Object.entries(ING99).find(([q,J])=>{try{return J.ok&&J.ok(t)}catch(e){return false}});if(!ok)return;const s=viv108Icone(ok[1].ic||'🌿');s.position.set(t.x-.2,t.alt*VX+.22,t.z-.15);s.userData.n=ok[1].n;g.add(s);VIV108.o.push(s);n++})}}catch(e){}
 return g}
setInterval(()=>{try{if(typeof scene==='undefined'||!S||S.fin||K||VP){if(VIV108.g)VIV108.g.visible=false;return}const on=dist<16;if(!on){if(VIV108.g)VIV108.g.visible=false;return}
 const cle=Math.round(camT.x/1.5)+'|'+Math.round(camT.z/1.5)+'|'+Math.round(dist/4)+'|'+Object.keys(S.cav97||{}).length+'|'+(pluie()?1:0)+'|'+(S.cyc&&S.cyc.in<=0?1:0)+'|'+(S.gib106||0);if(cle!==VIV108.cle){VIV108.cle=cle;if(VIV108.g){scene.remove(VIV108.g);VIV108.g.traverse(o=>{if(o.geometry)o.geometry.dispose()})}VIV108.g=viv108Bati();scene.add(VIV108.g)}VIV108.g.visible=true}catch(e){}},700);
(function boucle(){requestAnimationFrame(boucle);try{if(!VIV108.g||!VIV108.g.visible)return;const s=(performance.now()-VIV108.t0)/1000;
 VIV108.b.forEach(b=>{if(b.k==='oiseau'){const a=s*.35+b.v*3+b.i*.18,r=1.6+b.v*.8;const x=camT.x+Math.cos(a)*r+b.i*.06,z=camT.z+Math.sin(a)*r,y=(Math.max(0,alt(x,z))*VX)+1.1+b.v*.3+Math.sin(s*2+b.i)*.04;b.o.position.set(x,y,z);b.o.rotation.y=-a;b.ai.forEach((w,j)=>w.rotation.z=(j?-1:1)*Math.sin(s*12+b.i)*.6);return}
  if(b.k==='poisson'){const u=((s*.15+b.ph)%1);const q=b.C.getPoint(u);b.o.position.set(q.x,Math.max(0,alt(q.x,q.z))*VX+.04+Math.max(0,Math.sin(u*40))*.02,q.z);return}
  b.ph+=.016;if(Math.sin(b.ph*.6)>.3){b.cap+=Math.sin(b.ph*.21)*.02;const x=b.o.position.x+Math.cos(b.cap)*.004,z=b.o.position.z+Math.sin(b.cap)*.004;if(Math.hypot(x-b.cx,z-b.cz)>.6)b.cap+=Math.PI;else{b.o.position.x=x;b.o.position.z=z}b.o.position.y=Math.max(0,alt(b.o.position.x,b.o.position.z))*VX;b.o.rotation.y=-b.cap}});
 VIV108.o.forEach((sp,i)=>{sp.material.opacity=.65+.35*Math.sin(s*2+i)})}catch(e){}})();

// ===== Les fondations de la colonie, jouées sur la carte (le conte colon) : d'où viennent les gens, et la zone qui se défriche =====
const FOND108={
 'Saint-Paul':'Louis Payen, un autre Français et une dizaine de Malgaches débarquent dans la baie. Ils viennent de Fort-Dauphin, à Madagascar, où la Compagnie tient comptoir.',
 'Saint-Denis':'Le gouverneur Regnault quitte Saint-Paul avec des colons français (Normands, Bretons, gens de Paris) et des Malgaches, et s’installe au nord, à l’embouchure de la rivière.',
 'Sainte-Suzanne':'Des familles de Saint-Paul et de Saint-Denis poussent vers l’Est, avec leurs Malgaches : les terres y sont arrosées.',
 'Sainte-Marie':'Les enfants des premiers colons, nés dans l’île, prennent des terres entre Saint-Denis et Sainte-Suzanne, avec des esclaves venus de Madagascar.',
 'Saint-Leu':'La Compagnie des Indes concède des terres pour le café. Colons de Saint-Paul et esclaves malgaches s’installent sur la côte sous le vent.',
 'Saint-André':'Les familles de l’Est s’étendent vers la rivière du Mât ; esclaves de Madagascar et d’Afrique de l’Est défrichent.',
 'Saint-Louis':'La Compagnie pousse vers le Sud : colons de Saint-Paul et nouveaux venus de France, esclaves de Madagascar, du Mozambique et d’Inde.',
 'Saint-Benoît':'Plus loin dans l’Est, des colons créoles prennent les terres humides, avec leurs esclaves.',
 'Saint-Pierre':'La Compagnie fonde un quartier au Sud, autour de la rivière d’Abord ; colons venus de Saint-Paul et de France, esclaves venus de loin.'};
EV.fond108={sys:1,tag:'Archive',an:'',get t(){return 'Fondation de '+(S.fondN108||'')},get b(){const n=S.fondN108;return (FOND108[n]||'De nouveaux colons s’installent sur la côte.')+' La zone autour se défriche peu à peu : on la voit s’étendre sur la carte.'},o:[{n:'Suivre',d:'',fx:{}}]};
function fond108Jouer(n){try{const v=VILLES.find(v=>v[3]===n);if(!v||typeof scene==='undefined')return;const t=near(v[1],v[2]);if(!t)return;
 const g=new THREE.Group();scene.add(g);const M=c=>new THREE.MeshLambertMaterial({color:c});
 // le navire arrive du large (de l'ouest pour Saint-Paul, venu de Madagascar ; sinon par la mer, le long de la côte)
 const cx=T.reduce((a,u)=>a+u.x,0)/T.length,cz=T.reduce((a,u)=>a+u.z,0)/T.length;const dx=t.x-cx,dz=t.z-cz,L=Math.hypot(dx,dz)||1,ux=dx/L,uz=dz/L;
 const nav=new THREE.Group();const coque=new THREE.Mesh(new THREE.BoxGeometry(.5,.12,.16),M(0x5a3a22));coque.position.y=.06;const mat=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.55,5),M(0x3a2a18));mat.position.y=.35;const voile=new THREE.Mesh(new THREE.PlaneGeometry(.3,.32),new THREE.MeshLambertMaterial({color:0xf2ead8,side:THREE.DoubleSide}));voile.position.set(0,.38,0);voile.rotation.y=Math.PI/2;nav.add(coque,mat,voile);g.add(nav);
 const sx=t.x+ux*7,sz=t.z+uz*7,ex=t.x+ux*.9,ez=t.z+uz*.9;nav.rotation.y=Math.atan2(-uz,ux)+Math.PI;
 // les colons à terre, et la zone défrichée qui s'étend
 const F=[];for(let i=0;i<5;i++){const f=new THREE.Mesh(new THREE.ConeGeometry(.04,.16,6),M(i<2?0x2f3b5a:0x8a5a3a));f.visible=false;g.add(f);F.push(f)}
 const zone=new THREE.Mesh(new THREE.CircleGeometry(1,40),new THREE.MeshBasicMaterial({color:0xe8c86a,transparent:true,opacity:.28,depthWrite:false}));zone.rotation.x=-Math.PI/2;zone.position.set(t.x,t.alt*VX+.05,t.z);zone.scale.setScalar(.01);zone.renderOrder=7;g.add(zone);
 try{conteVoir(null)}catch(e){}setTimeout(()=>{try{conteVoir(t,9)}catch(e){}},2500);const t0=performance.now();
 (function an(){const s=(performance.now()-t0)/1000;if(s>26){scene.remove(g);return}requestAnimationFrame(an);const u=Math.min(1,s/7);nav.position.set(sx+(ex-sx)*u,.02+Math.sin(s*2)*.01,sz+(ez-sz)*u);nav.rotation.z=Math.sin(s*1.6)*.05;
  if(s>7){F.forEach((f,i)=>{f.visible=true;const w=Math.min(1,(s-7-i*.3)/4),a=i*1.25;const x=ex+(t.x+Math.cos(a)*.4-ex)*Math.max(0,w),z=ez+(t.z+Math.sin(a)*.4-ez)*Math.max(0,w);f.position.set(x,Math.max(0,alt(x,z))*VX+.08,z)})}
  if(s>10){const r=Math.min(2.6,(s-10)*.35);zone.scale.setScalar(r);zone.material.opacity=.3*(s<22?1:Math.max(0,(26-s)/4))}})()
 S.fondN108=n;setTimeout(()=>{try{S.evq=S.evq||[];if(!S.evq.includes('fond108'))S.evq.push('fond108')}catch(e){}},9000)}catch(e){console.warn(e)}}
{let vus=null;setInterval(()=>{try{if(!S||S.fin||K||!S.voieC){vus=null;return}const L=(S.towns||[]).slice();if(vus===null){vus=L;return}const neuves=L.filter(n=>!vus.includes(n));vus=L;if(neuves.length&&!(typeof VP!=='undefined'&&VP))fond108Jouer(neuves[0])}catch(e){}},2000)}

// ===== Mafate : on ne fonde un camp que sur un îlet, pas dans le lit de la rivière (elle coule presque toujours, en partie sous les galets) =====
function mafate108(t){const g=LL99(t);return g.lon>55.38&&g.lon<55.47&&g.lat<-21.01&&g.lat>-21.11}
{const a0=actions;actions=function(t){const A=a0(t);try{if(t&&t.riv&&mafate108(t))return A.filter(a=>a.id!=='camp')}catch(e){}return A}}
{const ct=choisirTuile;choisirTuile=function(t){try{const q=window.choixExp;if(q&&q.but==='camp'&&t&&t.riv&&mafate108(t)){toast('À Mafate, on s’installe sur un îlet, pas dans le lit de la rivière : choisissez une case plus haute.');return}}catch(e){}return ct.apply(this,arguments)}}

// ===== Les petits combats : de vrais petits personnages (tête, corps, jambes qui marchent, arme), et un décor de La Réunion =====
function btFig108(x,q,s,col,qi){const t=(BT&&BT.tps)||0,mv=s.ord&&s.ord.k==='va'?1:0,pas=Math.sin(t*12+qi*1.7)*1.6*mv,c=Math.cos(s.ang),sn=Math.sin(s.ang);
 if(s.T.chien){x.fillStyle='#7a6450';x.beginPath();x.ellipse(q.x,q.y,4,2.2,s.ang,0,7);x.fill();x.beginPath();x.arc(q.x+c*4,q.y+sn*4,1.6,0,7);x.fill();return}
 x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(q.x,q.y+4,3.4,1.3,0,0,7);x.fill();
 x.strokeStyle='#2a1e14';x.lineWidth=1.2;x.beginPath();x.moveTo(q.x,q.y+1);x.lineTo(q.x-1.4+pas*.5,q.y+4.5);x.moveTo(q.x,q.y+1);x.lineTo(q.x+1.4-pas*.5,q.y+4.5);x.stroke();
 x.fillStyle=col;x.beginPath();x.moveTo(q.x-2.4,q.y+1.4);x.lineTo(q.x+2.4,q.y+1.4);x.lineTo(q.x+1.6,q.y-3);x.lineTo(q.x-1.6,q.y-3);x.closePath();x.fill();x.strokeStyle=s.joueur?'#fff8':'#2008';x.lineWidth=.5;x.stroke();
 x.fillStyle=s.cote==='m'?'#5a3a24':'#d8b090';x.beginPath();x.arc(q.x,q.y-4.6,1.7,0,7);x.fill();
 if(s.cote!=='m'&&!s.T.mys){x.fillStyle='#1a1410';x.fillRect(q.x-2.2,q.y-6.4,4.4,.9)}
 if(!s.T.mys){x.strokeStyle=s.T.feu?'#222':'#c8b080';x.lineWidth=1;x.beginPath();x.moveTo(q.x+c*1.5,q.y-1.5+sn*1.5);x.lineTo(q.x+c*8,q.y-1.5+sn*8);x.stroke()}
 else{x.fillStyle='rgba(255,230,140,.35)';x.beginPath();x.arc(q.x,q.y-2,5+Math.sin(t*5+qi),0,7);x.fill()}}
{const bf=btFond;btFond=function(){const cv=bf.apply(this,arguments);try{const x=cv.getContext('2d'),W=cv.width,H=cv.height;let sd=7;const r=()=>{sd=(sd*9301+49297)%233280;return sd/233280};
 const vacoa=(X,Y,k)=>{x.strokeStyle='#5a4a30';x.lineWidth=1.4*k;for(let i=-2;i<=2;i++){x.beginPath();x.moveTo(X+i*2*k,Y+6*k);x.lineTo(X,Y-2*k);x.stroke()}x.beginPath();x.moveTo(X,Y);x.lineTo(X,Y-10*k);x.stroke();x.strokeStyle='#4a7a34';x.lineWidth=1.6*k;for(let a=0;a<10;a++){const an=a/10*6.28;x.beginPath();x.moveTo(X,Y-10*k);x.lineTo(X+Math.cos(an)*9*k,Y-10*k+Math.sin(an)*5*k+3*k);x.stroke()}};
 const fanjan=(X,Y,k)=>{x.strokeStyle='#3a2a1a';x.lineWidth=2*k;x.beginPath();x.moveTo(X,Y);x.lineTo(X,Y-8*k);x.stroke();x.fillStyle='#3f7a2c';for(let a=0;a<9;a++){const an=a/9*6.28;x.beginPath();x.ellipse(X+Math.cos(an)*6*k,Y-8*k+Math.sin(an)*4*k,6*k,1.8*k,an,0,7);x.fill()}};
 const roche=(X,Y,k)=>{x.fillStyle='#2e2b2a';x.beginPath();x.moveTo(X-6*k,Y+2*k);x.lineTo(X-3*k,Y-4*k);x.lineTo(X+4*k,Y-3*k);x.lineTo(X+6*k,Y+2*k);x.closePath();x.fill();x.fillStyle='#4a4644';x.beginPath();x.moveTo(X-3*k,Y-4*k);x.lineTo(X+4*k,Y-3*k);x.lineTo(X+1*k,Y);x.closePath();x.fill()};
 const fougere=(X,Y,k)=>{x.strokeStyle='#5a8a3a';x.lineWidth=1;for(let a=0;a<6;a++){const an=-Math.PI/2+(a-2.5)*.4;x.beginPath();x.moveTo(X,Y);x.quadraticCurveTo(X+Math.cos(an)*5*k,Y+Math.sin(an)*5*k,X+Math.cos(an)*8*k,Y+Math.sin(an)*6*k+2*k);x.stroke()}};
 for(let i=0;i<70;i++){const X=r()*W,Y=r()*H,k=.8+r()*.9,f=r();if(f<.25)vacoa(X,Y,k);else if(f<.45)fanjan(X,Y,k);else if(f<.7)roche(X,Y,k);else fougere(X,Y,k)}}catch(e){}return cv}}
