// ===== p61 : les grands acteurs se reconnaissent de loin, dans tous les modes =====
// Chaque roi marron a sa coiffure, sa couleur (le lamba), parfois une marque ; les femmes ont des tressages travaillés,
// les hommes une coiffure qui leur donne une allure de guerrier. Les colons suivent la mode de leur époque, qui change vite.
// Une seule fiche par acteur (APP) : la carte 3D, le camp, la Construction et les petits jeux en 2D la lisent tous.
const APP={
 dimitile:{n:'Dimitile',g:'h',lieu:'Le Dimitile',lamba:0xa0442a,cheveux:'locks_dressees',marque:'joue'},
 laverdure:{n:'Laverdure',g:'h',lieu:'Bras de la Plaine',lamba:0xece4d0,cheveux:'nattes',bandeau:0xf2efe6,cauris:1},
 mafate:{n:'Mafate',g:'h',lieu:'Mafate',lamba:0x2a3a6a,cheveux:'touffes_grises',amulettes:1},
 anchaing:{n:'Anchaing',g:'h',lieu:'Salazie',lamba:0xb07a34,cheveux:'locks_bandeau',bandeau:0xc89a3a},
 heva:{n:'Héva',g:'f',lieu:'Salazie',lamba:0xece4d0,cheveux:'tresses_couronne',collier:0x8a2a1a},
 cimendef:{n:'Cimendef',g:'h',lieu:'Cimendef',lamba:0x5a3a22,cheveux:'rase',marque:'epaule'},
 baal:{n:'Baal',g:'h',lieu:'Cilaos',lamba:0xd8b040,cheveux:'rase',collier:0xf0ead8,bonnet:0x8a2a1a},
 fatie:{n:'Fatie',g:'h',lieu:'Piton des Neiges',lamba:0xdfe6ec,cheveux:'chignon_haut',bandeau:0x7a8ab0},
 sarlave:{n:'Sarlave',g:'f',lieu:'Bras de la Plaine',lamba:0x6a2a4a,cheveux:'coques',collier:0xf2efe6}};
// la mode coloniale, de décennie en décennie
function modeColon(y){
 if(y<1700)return {chapeau:'feutre_plume',perruque:'longue',habit:0x6a3a2a,echarpe:null,ep:'justaucorps et grand feutre à plume'};
 if(y<1750)return {chapeau:'tricorne',perruque:'longue_poudree',habit:0x2a3a6a,echarpe:null,ep:'tricorne et perruque poudrée'};
 if(y<1789)return {chapeau:'tricorne',perruque:'catogan',habit:0x3a5a7a,echarpe:null,ep:'habit à la française, catogan'};
 if(y<1800)return {chapeau:'rond',perruque:'courte',habit:0x2a2a30,echarpe:'tricolore',ep:'chapeau rond et écharpe tricolore'};
 if(y<1815)return {chapeau:'bicorne',perruque:'courte',habit:0x1e2a4a,echarpe:null,ep:'bicorne d’Empire'};
 if(y<1848)return {chapeau:'haut_forme',perruque:'favoris',habit:0x2a2620,echarpe:null,ep:'redingote et haut-de-forme'};
 if(y<1880)return {chapeau:'haut_forme',perruque:'barbe',habit:0x1a1a1e,echarpe:y<1852?'tricolore':null,ep:'barbe et haut-de-forme'};
 return {chapeau:'casque',perruque:'moustache',habit:0xe8e2d0,echarpe:null,ep:'costume clair et casque colonial'}}

// ---------- en 3D : posé sur l'os de la tête (Head) et du buste (Spine), dans les unités du squelette (tête ≈ 17,5) ----------
const APM={};const apm=c=>APM[c]||(APM[c]=new THREE.MeshLambertMaterial({color:c}));
const HC=new THREE.Vector3(0,10,1),HR=8.2;
function surCrane(g,n,f){for(let i=0;i<n;i++){const u=(i+.5)/n,phi=Math.acos(1-u*1.15),th=i*2.399;const d=new THREE.Vector3(Math.sin(phi)*Math.cos(th),Math.cos(phi),Math.sin(phi)*Math.sin(th));f(g,HC.clone().addScaledVector(d,HR*.92),d,i)}}
function tige(g,p,d,L,r,c){const m=new THREE.Mesh(new THREE.CylinderGeometry(r*.7,r,L,4),apm(c));m.position.copy(p).addScaledVector(d,L/2);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize());g.add(m)}
function cheveux3D(t,col){const g=new THREE.Group(),C=col||0x241812;
 if(t==='locks_dressees')surCrane(g,26,(g,p,d,i)=>{const dd=d.clone().add(new THREE.Vector3(0,1.3,0)).normalize();dd.x+=Math.sin(i*1.7)*.25;dd.z+=Math.cos(i*2.3)*.25;tige(g,p,dd.normalize(),6+((i*7)%5),1,C)});
 else if(t==='locks_bandeau'){surCrane(g,22,(g,p,d,i)=>{if(d.y<.35)return;const dd=new THREE.Vector3(d.x*.6,-1,d.z*.6).normalize();tige(g,p,dd,9+((i*5)%4),1,C)});const b=new THREE.Mesh(new THREE.TorusGeometry(HR*.98,1.1,4,16),apm(0xc89a3a));b.rotation.x=Math.PI/2;b.position.set(0,12,1);g.add(b)}
 else if(t==='nattes'){for(let i=-3;i<=3;i++){const m=new THREE.Mesh(new THREE.TorusGeometry(HR*.95,.8,3,10,Math.PI),apm(C));m.rotation.y=Math.PI/2;m.rotation.z=0;m.position.set(i*2.1,10.5,1);m.scale.set(1,1,1);g.add(m)}}
 else if(t==='touffes_grises'){surCrane(g,9,(g,p,d,i)=>{if(d.y<.2)return;const s=new THREE.Mesh(new THREE.IcosahedronGeometry(2.2,0),apm(0xb8b4ac));s.position.copy(p);g.add(s)})}
 else if(t==='tresses_couronne'){const b=new THREE.Mesh(new THREE.TorusGeometry(HR*.8,2,6,18),apm(C));b.rotation.x=Math.PI/2;b.position.set(0,16,1);g.add(b);surCrane(g,10,(g,p,d,i)=>{if(d.y<.3)return;const s=new THREE.Mesh(new THREE.SphereGeometry(1.6,5,4),apm(C));s.position.copy(p);g.add(s)})}
 else if(t==='coques'){surCrane(g,18,(g,p,d,i)=>{if(d.y<.15)return;const s=new THREE.Mesh(new THREE.SphereGeometry(1.9,5,4),apm(C));s.position.copy(p).addScaledVector(d,1.2);g.add(s)})}
 else if(t==='chignon_haut'){const s=new THREE.Mesh(new THREE.SphereGeometry(4,7,6),apm(C));s.position.set(0,20,0);g.add(s)}
 return g}
function chapeau3D(t){const g=new THREE.Group(),N=apm(0x1a1814),y0=13.5;
 const cyl=(rt,rb,h,y,c,s)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,s||14),apm(c==null?0x1a1814:c));m.position.y=y;g.add(m);return m};
 if(t==='tricorne'){const m=cyl(13,8,7,y0+1.5,0x1a1814,3);m.rotation.y=Math.PI;cyl(7,8,5,y0+2)}
 else if(t==='bicorne'){const sh=new THREE.Shape();sh.absarc(0,0,12,0,Math.PI,false);sh.lineTo(12,0);const m=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:3,bevelEnabled:false}),N);m.scale.set(1,.75,1);m.position.set(0,y0-2,-1.5);g.add(m);const c=new THREE.Mesh(new THREE.SphereGeometry(1.6,5,4),apm(0xc8262e));c.position.set(0,y0+6,2.6);g.add(c)}
 else if(t==='haut_forme'){cyl(13,13,1,y0-1);cyl(7.5,7,13,y0+6)}
 else if(t==='rond'){cyl(14,14,1,y0-1);cyl(7.5,8,6,y0+2.5)}
 else if(t==='casque'){const m=new THREE.Mesh(new THREE.SphereGeometry(9.5,12,8,0,Math.PI*2,0,Math.PI/2),apm(0xe8e2d0));m.position.y=y0-3;m.scale.set(1,.85,1.15);g.add(m);cyl(13,13,.8,y0-2.5,0xe8e2d0)}
 else if(t==='feutre_plume'){cyl(16,16,1,y0-1,0x3a2a1e);cyl(8,8.5,6,y0+2.5,0x3a2a1e);const p=new THREE.Mesh(new THREE.ConeGeometry(2,14,5),apm(0xf2efe6));p.position.set(-7,y0+5,-4);p.rotation.z=1.1;g.add(p)}
 return g}
function perruque3D(t){const g=new THREE.Group(),bl=0xe8e6e0,br=0x3a2a1e;
 if(t==='longue'||t==='longue_poudree'){const c=t==='longue'?br:bl;[-1,1].forEach(s=>{for(let i=0;i<4;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(3,6,5),apm(c));m.position.set(s*8,12-i*4.5,-1);g.add(m)}})}
 else if(t==='catogan'){[-1,1].forEach(s=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(1.8,1.8,5,6),apm(bl));m.rotation.x=Math.PI/2;m.position.set(s*8,11,0);g.add(m)});const q=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.6,8,5),apm(bl));q.position.set(0,5,-8.5);g.add(q);const n=new THREE.Mesh(new THREE.BoxGeometry(4,2.5,1),apm(0x1a1814));n.position.set(0,9,-8.6);g.add(n)}
 else if(t==='favoris'){[-1,1].forEach(s=>{const m=new THREE.Mesh(new THREE.BoxGeometry(1.6,6,3),apm(br));m.position.set(s*7.6,7,2);g.add(m)})}
 else if(t==='barbe'){const m=new THREE.Mesh(new THREE.SphereGeometry(5.5,8,6),apm(br));m.scale.set(1,.9,.7);m.position.set(0,3,6);g.add(m)}
 else if(t==='moustache'){const m=new THREE.Mesh(new THREE.BoxGeometry(6,1.2,1.2),apm(br));m.position.set(0,6,8.5);g.add(m)}
 return g}
function buste3D(o){const g=new THREE.Group();
 if(o.lamba!=null){const m=new THREE.Mesh(new THREE.TorusGeometry(19,4,5,20),apm(o.lamba));m.rotation.set(Math.PI/2,.7,0);m.position.set(0,-4,0);m.scale.set(1,.62,1);g.add(m)}
 if(o.echarpe==='tricolore'){[0x1f3a8a,0xf4f1ea,0xc8262e].forEach((c,i)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(19,1.5,3,20),apm(c));m.rotation.set(Math.PI/2,-.7,0);m.position.set(0,-4+i*2.6,0);m.scale.set(1,.62,1);g.add(m)})}
 if(o.collier!=null||o.amulettes||o.cauris){for(let i=0;i<9;i++){const a=-.9+i*.225,m=new THREE.Mesh(new THREE.SphereGeometry(o.amulettes?1.4:1,5,4),apm(o.collier!=null?o.collier:o.amulettes?0x8a6a3a:0xf2efe6));m.position.set(Math.sin(a)*8,14-Math.cos(a)*3,7+Math.cos(a)*2);g.add(m)}}
 return g}
function marque3D(t){const g=new THREE.Group();if(t==='joue'){const m=new THREE.Mesh(new THREE.BoxGeometry(.6,4,.6),apm(0x6a2a20));m.position.set(4.5,7,7.6);m.rotation.z=.4;g.add(m)}return g}
// les modèles de colons ont un chapeau de paille cousu au maillage : on le replie dans la tête avant de poser celui de l'époque
function sansChapeauModele(root){root.traverse(m=>{if(!m.isSkinnedMesh||m.userData.decoiffe)return;m.userData.decoiffe=1;const sk=m.skeleton,hi=sk.bones.findIndex(b=>b.name==='Head');if(hi<0)return;
 const G=m.geometry,P=G.attributes.position,SI=G.attributes.skinIndex,SW=G.attributes.skinWeight;if(!SI)return;const toL=new THREE.Matrix4().copy(sk.boneInverses[hi]).multiply(m.bindMatrix),toW=toL.clone().invert(),v=new THREE.Vector3(),c=new THREE.Vector3(0,4,1).applyMatrix4(toW);
 for(let i=0;i<P.count;i++){let w=0;for(let j=0;j<4;j++)if(SI.array[i*4+j]===hi)w+=SW.array[i*4+j]*(SW.normalized&&SW.array instanceof Uint8Array?1/255:SW.normalized&&SW.array instanceof Uint16Array?1/65535:1);if(w<.5)continue;v.fromBufferAttribute(P,i).applyMatrix4(toL);const r=Math.hypot(v.x,v.z-1);
  if(v.y>11.5||r>9)P.setXYZ(i,c.x,c.y,c.z)}P.needsUpdate=true})}
// on habille une silhouette chargée (MF, camp, ville) : une fois, puis on ne touche plus
function apparence(root,o){if(!root||root.userData.app===o)return;const u=root.userData;u.app=o;let H=null,Sp=null;root.traverse(b=>{if(b.isBone&&b.name==='Head')H=b;if(b.isBone&&b.name==='Spine')Sp=b});if(!H)return;
 (u.appM||[]).forEach(m=>m.parent&&m.parent.remove(m));u.appM=[];const add=(p,m)=>{p.add(m);u.appM.push(m)};
 if(o.cheveux)add(H,cheveux3D(o.cheveux));if(o.bandeau!=null&&o.cheveux!=='locks_bandeau'){const b=new THREE.Mesh(new THREE.TorusGeometry(HR*.98,1,4,16),apm(o.bandeau));b.rotation.x=Math.PI/2;b.position.set(0,12.5,1);add(H,b)}
 if(o.bonnet!=null){const b=new THREE.Mesh(new THREE.CylinderGeometry(6.5,7.5,6,12),apm(o.bonnet));b.position.y=17;add(H,b)}
 if(o.chapeau)sansChapeauModele(root);if(o.perruque)add(H,perruque3D(o.perruque));if(o.chapeau)add(H,chapeau3D(o.chapeau));if(o.marque)add(H,marque3D(o.marque));if(Sp)add(Sp,buste3D(o))}

// ---------- sur la carte : le roi marron à son camp (ou, côté colonie, quelque part dans les Hauts), le gouverneur à la capitale ----------
function lieuT(n){const L=(typeof LIEUX!=='undefined'?LIEUX:[]).find(l=>l.n===n);return L?L.t:T.find(t=>lieuDe(t)===n)}
{const b0=bat;bat=function(k){b0(k);try{if(!S||S.fin||typeof mfPoser!=='function'||dist>20)return;const L=[];
 const r=!S.voieC?S.roi:S.roiH;if(r&&APP[r]&&!(ROIS[r]&&ROIS[r].mort&&S.year>=ROIS[r].mort)){const t=!S.voieC&&camps()[0]?camps()[0]:lieuT(APP[r].lieu);if(t&&seen(t))L.push([r,APP[r],t,.5]);
  if(r==='anchaing'&&t&&seen(t))L.push(['heva',APP.heva,t,.75]);if(r==='laverdure'&&t&&seen(t)&&S.year<=1752)L.push(['sarlave',APP.sarlave,t,.75])}
 const cap=lieuT(S.year<1738?'Saint-Paul':'Saint-Denis');if(cap&&seen(cap)&&(S.towns||[]).length){const m=modeColon(S.year);L.push(['gouv',m,cap,.45])}
 L.forEach(([k,o,t,d])=>{if(Math.hypot(t.x-camT.x,t.z-camT.z)>dist+4)return;const a=k.length*1.7,x=t.x+Math.cos(a)*d,z=t.z+Math.sin(a)*d,mod=k==='gouv'?'p7_colon':o.g==='f'?'femme_sagaie':'p1a_chasseur',cle='ga_'+k;
  mfPoser(cle,mod,x,Math.max(0,alt(x,z))*VX+.02,z,a+Math.PI,k==='gouv'?'colon_inspecte':'repos_debout');const f=MF.L[cle];if(f&&f.o){apparence(f.o,o);if(f.mx)f.mx.update(.016)}})}catch(e){}}}

// ---------- en 2D (duels de légende…) : la même fiche, dessinée simplement par-dessus la silhouette ----------
const APP2={dimitile:'dimitile',heva:'heva',cimendef:'cimendef',milicien:1750,mussard:1751,anglais:1810,commandeur:'paille'};
function trait2D(x,k,X,Y,s,col){const a=APP2[k];if(a==null)return;const hx=n=>'#'+n.toString(16).padStart(6,'0');x.save();
 if(typeof a==='number'){const m=Object.assign({},modeColon(a),k==='anglais'?{habit:0xb0242c}:{});x.fillStyle=hx(m.habit);x.fillRect(X-17,Y+16,34,40);x.fillStyle='#1a1814';
  if(m.chapeau==='tricorne'){x.beginPath();x.moveTo(X-20,Y-8);x.lineTo(X+20,Y-8);x.lineTo(X,Y-24);x.closePath();x.fill()}
  else if(m.chapeau==='bicorne'){x.beginPath();x.ellipse(X,Y-12,24,9,0,Math.PI,0);x.fill();x.fillStyle='#c8262e';x.beginPath();x.arc(X+s*4,Y-16,3,0,7);x.fill()}
  else if(m.chapeau==='rond'){x.fillRect(X-20,Y-12,40,4);x.fillRect(X-11,Y-24,22,13)}
  if(m.perruque&&/poudree|catogan/.test(m.perruque)){x.fillStyle='#e8e6e0';x.fillRect(X-s*16,Y-6,6,14)}}
 else if(a==='paille'){x.fillStyle='#d9bf7a';x.fillRect(X-24,Y-10,48,4);x.fillRect(X-11,Y-20,22,11)}
 else{const o=APP[a];x.fillStyle=hx(o.lamba);x.beginPath();x.moveTo(X-16,Y+16);x.lineTo(X+16,Y+40);x.lineTo(X+16,Y+52);x.lineTo(X-16,Y+28);x.closePath();x.fill();x.strokeStyle='#241812';x.fillStyle='#241812';
  if(o.cheveux==='locks_dressees'){x.lineWidth=3;x.lineCap='round';for(let i=0;i<11;i++){const an=-Math.PI*.9+i*Math.PI*.08;x.beginPath();x.moveTo(X+Math.cos(an)*13,Y+Math.sin(an)*13);x.lineTo(X+Math.cos(an)*24+Math.sin(i*2)*3,Y+Math.sin(an)*26-6);x.stroke()}}
  if(o.cheveux==='tresses_couronne'){x.lineWidth=5;x.beginPath();x.arc(X,Y-6,12,Math.PI,0);x.stroke();for(let i=0;i<5;i++){x.beginPath();x.arc(X-12+i*6,Y-16,3,0,7);x.fill()}}
  if(o.marque==='joue'){x.strokeStyle='#6a2a20';x.lineWidth=2;x.beginPath();x.moveTo(X+s*4,Y-2);x.lineTo(X+s*9,Y+7);x.stroke()}
  if(o.marque==='epaule'){x.strokeStyle='#6a2a20';x.lineWidth=2;x.beginPath();x.moveTo(X-s*14,Y+18);x.lineTo(X-s*6,Y+26);x.stroke()}}
 x.restore()}
