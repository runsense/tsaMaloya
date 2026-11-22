// ===== p153 : Vie — le chef (commandant de quartier, député, chef du camp) se reconnaît sur la carte : une étoile à 27 % d'opacité au-dessus de sa tête =====
const ET153={L:{}};
function etTex153(){if(etTex153.t)return etTex153.t;const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.beginPath();
 for(let i=0;i<10;i++){const r=i%2?12:30,a=-Math.PI/2+i*Math.PI/5;x.lineTo(32+Math.cos(a)*r,32+Math.sin(a)*r)}x.closePath();x.fillStyle='#ffd84a';x.fill();x.lineWidth=3;x.strokeStyle='#7a5a10';x.stroke();return etTex153.t=new THREE.CanvasTexture(c)}
function etObj153(id){const k=['w'+id,'w106_'+id];for(const c of k){const f=MF.L[c];if(f&&f.o&&f.o.visible&&f.vu===MF.t)return f.o}
 if(typeof LG!=='undefined'&&LG.L)for(const g of LG.L)if(g.pid===id){const f=MF.L[g.cle];if(f&&f.o&&f.o.visible)return f.o}return null}
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{const vu={};if(S&&!modeHist()&&!(typeof VP!=='undefined'&&VP)&&!(typeof K!=='undefined'&&K)&&S.chefs&&typeof MF!=='undefined')
  for(const ci in S.chefs){const p=chefDe(+ci);if(!p)continue;const o=etObj153(p.id);if(!o)continue;let e=ET153.L[p.id];
   if(!e){e=new THREE.Sprite(new THREE.SpriteMaterial({map:etTex153(),transparent:true,opacity:.27,depthWrite:false}));e.renderOrder=6;scene.add(e);ET153.L[p.id]=e}
   if(o.userData.h153==null){try{const b=new THREE.Box3().setFromObject(o);o.userData.h153=Math.min(.6,Math.max(.12,b.max.y-b.min.y))}catch(_){o.userData.h153=.2}}
   const h=o.userData.h153,s=Math.max(.07,h*.45);e.scale.set(s,s,1);e.position.set(o.position.x,o.position.y+h+s*.6+Math.sin(performance.now()/600)*.01,o.position.z);e.visible=true;vu[p.id]=1}
  for(const id in ET153.L)if(!vu[id])ET153.L[id].visible=false}catch(e){}return r}}
// ----- Vue personnage : de vrais arbres (arbre low-poly CC-BY 00amza ; tamarins des Hauts au-dessus de 1000 m) au lieu des cylindres + boules, et les cerfs de Java (après 1755) -----
try{CRED144.push(['Arbre (Tree low poly)','00amza'])}catch(e){}
const ARB153={};
function arbGeo153(n){if(ARB153[n])return ARB153[n];ARB153[n]=buf144(n).then(ab=>new Promise((ok,ko)=>new THREE.GLTFLoader().parse(ab.slice(0),'',g=>{const s=g.scene;s.updateMatrixWorld(true);const L=[];
  s.traverse(m=>{if(m.isMesh){const ge=flot45(m.geometry.clone());ge.applyMatrix4(m.matrixWorld);const mats=(Array.isArray(m.material)?m.material:[m.material]).map(x=>{if(x.map)x.map.encoding=THREE.sRGBEncoding;const c=new THREE.MeshLambertMaterial({map:x.map||null,emissive:x.map?0x6a6a6a:0,emissiveMap:x.map||null,color:x.map?0xffffff:(x.color||new THREE.Color(0x4f7a3a)),side:THREE.DoubleSide,alphaTest:x.map?.35:0});if(!x.map&&n.startsWith('plante_'))c.color=new THREE.Color(0x4f7a3a);return c});L.push({ge,mat:mats.length>1?mats:mats[0]})}});
  const bb=new THREE.Box3();L.forEach(o=>{o.ge.computeBoundingBox();bb.union(o.ge.boundingBox)});const H=(bb.max.y-bb.min.y)||1,cx=(bb.min.x+bb.max.x)/2,cz=(bb.min.z+bb.max.z)/2;
  L.forEach(o=>{o.ge.translate(-cx,-bb.min.y,-cz);o.ge.scale(1/H,1/H,1/H);o.ge.computeVertexNormals();const m0=Array.isArray(o.mat)?o.mat[0]:o.mat;if(!m0.map&&n.startsWith('plante_')&&typeof meshyPeindre==='function'){let g=o.ge;['normal','uv','color'].forEach(a=>{if(g.attributes[a])g.deleteAttribute(a)});o.ge=meshyPeindre(g,n.slice(7));o.mat=new THREE.MeshLambertMaterial({vertexColors:true,flatShading:true})}});ok(L)},ko)));return ARB153[n]}
function vpArbres153(V,vivant){vivant=vivant||(()=>VP===V);try{const I=V.sc.children.filter(o=>o.isInstancedMesh&&o.geometry&&(o.geometry.type==='CylinderGeometry'||o.geometry.type==='IcosahedronGeometry')&&o.count>=10);
 const tr=I.find(o=>o.geometry.type==='CylinderGeometry'),fe=I.find(o=>o.geometry.type==='IcosahedronGeometry');if(!tr||!fe)return;const n=tr.count,haut=(V.t&&V.t.alt||0)>1000;
 const M=new THREE.Matrix4(),P=new THREE.Vector3(),Q=new THREE.Quaternion(),Sc=new THREE.Vector3(),pos=[];for(let i=0;i<n;i++){tr.getMatrixAt(i,M);M.decompose(P,Q,Sc);pos.push([P.x,P.y,P.z,Sc.x,Sc.y])}
 const poser=(nom,sel,teinte)=>arbGeo153(nom).then(L=>{if(!vivant())return;const ids=pos.map((p,i)=>i).filter(sel);if(!ids.length)return;
   L.forEach(o=>{const mat=Array.isArray(o.mat)?o.mat.map(m=>m.clone()):o.mat.clone();(Array.isArray(mat)?mat:[mat]).forEach(m=>{if(teinte&&m.color)m.color.multiply(new THREE.Color(teinte))});
    const im=new THREE.InstancedMesh(o.ge,mat,ids.length);ids.forEach((i,k)=>{const [x,y,z,s,hh]=pos[i],H=hh+1.6*s;M.compose(P.set(x,y-.05,z),Q.setFromAxisAngle(new THREE.Vector3(0,1,0),(i*2.39)%6.28),Sc.set(H*(.85+(i%5)*.06),H,H*(.85+(i%3)*.08)));im.setMatrixAt(k,M)});
    im.instanceMatrix.needsUpdate=true;V.sc.add(im)});ids.forEach(i=>{M.makeScale(0,0,0);tr.setMatrixAt(i,M);fe.setMatrixAt(i,M)});tr.instanceMatrix.needsUpdate=true;fe.instanceMatrix.needsUpdate=true}).catch(()=>{});
 if(haut){poser('plante_tamarin',i=>i%2===0,null);poser('sk_arbrelp',i=>i%2===1,0xb8c8a8)}else poser('sk_arbrelp',()=>true,null)}catch(e){}}
function vpCerfs153(V){try{if(!S||S.year<1755||!V.t)return;const t=V.t;if(!(t.forest||t.alt>700))return;let k=0;for(const a of V.an){if(k>=Math.min(3,Math.ceil(V.an.length/3)))break;a.cerf=1;k++}}catch(e){}}
(function boucle153(){requestAnimationFrame(boucle153);try{if(typeof VP==='undefined'||!VP){ET153.vp=null;return}const V=VP;if(ET153.vp!==V){ET153.vp=V;vpCerfs153(V);setTimeout(()=>{if(VP===V)vpArbres153(V)},300)}
 for(const a of V.an){if(!a.cerf||!a.m||a.m.userData.c153)continue;a.m.userData.c153=1;a.m.scale.multiplyScalar(1.45);const f=new THREE.Color(.82,.56,.34);a.m.traverse(m=>{if(m.isMesh&&m.material){m.material=m.material.clone();if(m.material.color)m.material.color.multiply(f)}})}}catch(e){}})();
{const t0=vpTue;vpTue=function(c,p,k){const r=t0.apply(this,arguments);try{if(c&&c.cerf){VP.viv+=3;vpMsg('Un cerf à terre ('+k+(p&&p!==VP.G.chef?', '+p.n.split(' ')[0]:'')+') : +6 vivres. Gros gibier, venu de Java en 1755.');vpHud()}}catch(e){}return r}}
// ----- Survie : avant toute culture, on mange ce que l'île donne — tortues, oiseaux qui ne fuient pas, chou palmiste, bichiques et anguilles des rivières -----
// Chaque activité dépend de ce qui reste de l'espèce (p139 kDens139) ; y mettre des bras la fait disparaître plus tôt.
{const D=k=>{try{return kDens139(k)}catch(e){return 1}};const pal=t=>(K&&K.foret&&(K.foret[t.i]||0)>40);
 Object.assign(KACT,{
  tortues:{n:'Prendre des tortues',ic:'🐢',r:'viv',get k(){return 1.1*D('tortues')},ok:t=>(t.alt||0)<450&&!t.bare&&D('tortues')>.05,get d(){return 'Indigène. Les tortues de terre, par milliers sur les côtes : la viande et la graisse des premiers venus. Il en reste '+Math.round(D('tortues')*100)+' %.'}},
  oiseaux:{n:'Prendre des oiseaux',ic:'🪶',r:'viv',get k(){return .7*Math.max(D('solitaire'),D('perroquets'),D('oiseauxeau')*.8)},ok:t=>t.forest&&Math.max(D('solitaire'),D('perroquets'))>.05,get d(){return 'Indigène. Pigeons, perroquets, solitaire : ils ne fuient pas l’homme, on les prend au bâton. Ils s’éteignent si l’on en prend trop.'}},
  palmiste:{n:'Couper le chou palmiste',ic:'🌴',r:'viv',k:.45,ok:t=>pal(t)&&(t.alt||0)<1300,d:'Indigène. Le cœur du palmiste se mange cru ou cuit ; chaque chou coûte un arbre. La forêt du lieu recule un peu.'},
  bichiques:{n:'Bichiques et anguilles',ic:'🐟',r:'viv',k:.4,ok:t=>!!t.riv&&(t.alt||0)<900,d:'Indigène. Les alevins (bichiques) remontent les rivières à la saison des pluies ; les anguilles se prennent à la nasse.'}});
 Object.defineProperty(KACT.vivres,'n',{value:'Chasser les cabris, cueillir',writable:true});KACT.vivres.d='Cabris et cochons lâchés par les marins, fruits de la forêt. Le gibier s’épuise si on y reste trop.';
 const kd=kDens139;kDens139=function(k){const r=kd.apply(this,arguments);try{const p=(K&&K.pr153&&K.pr153[k])||0;return Math.max(0,r-p)}catch(e){return r}};
 const ka=kAnnee;kAnnee=function(){const r=ka.apply(this,arguments);try{if(!K||K.fin)return r;K.pr153=K.pr153||{};let nt=0,no=0;
   Object.entries(K.trav||{}).forEach(([i,a])=>{nt+=a.tortues||0;no+=a.oiseaux||0;if(a.palmiste)K.foret[i]=Math.max(0,(K.foret[i]||0)-a.palmiste*.6)});
   if(nt)K.pr153.tortues=(K.pr153.tortues||0)+nt*.004;if(no){['solitaire','perroquets','oiseauxeau'].forEach(k=>K.pr153[k]=(K.pr153[k]||0)+no*.004)}
   Object.entries(K.trav||{}).forEach(([i,a])=>{['tortues','oiseaux'].forEach(k=>{if(a[k]&&!KACT[k].ok(T[i])){delete a[k];kLog(k==='tortues'?'Il n’y a plus de tortues à prendre par ici.':'Les oiseaux qu’on prenait à la main ont disparu de ces bois.')}})})}catch(e){}return r}}
try{KFAM.splice(1,0,{k:'ind',n:'Ce que l’île donne',ic:'🐢',L:['act:tortues','act:oiseaux','act:palmiste','act:bichiques','act:peche']})}catch(e){}
// ----- Vie : quand on envoie quelqu'un chasser (ou cueillir, couper du bois…), on le voit : la carte reste ouverte sur le lieu,
// un panonceau (icône + nombre) marque chaque lieu de travail, et une ligne pointillée le relie au camp. Le jour, on le voit partir et revenir. -----
const VERBE153={chasse:'chasser',cueil:'cueillir',bois:'couper du bois',paille:'ramasser la paille',pierre:'tirer la pierre',peche:'pêcher',eau:'puiser l’eau'};
const ICO153={chasse:'🏹',cueil:'🧺',bois:'🪓',paille:'🌾',pierre:'🪨',peche:'🎣',eau:'💧'};
function lieuAssigne153(p,k,t){const nm=p.n.split(' ')[0],ou=lieuDe(t)?'à '+lieuDe(t):(lieuProche(t)||'là-bas');let ph=.5;try{ph=jourPh()}catch(e){}
 const quand=(ph<.22||ph>.82)?' Il partira à l’aube, et rentrera le soir.':' Regardez : il part du camp et rentrera le soir.';
 toast(ICO153[k]+' '+nm+' va '+VERBE153[k]+' '+ou+'.'+quand);try{conteVoir(t,7)}catch(e){}TRAV153.cle='';TRAV153.flash={i:t.i,t0:performance.now()}}
const TRAV153={L:{},cle:'',ln:null};
function travTex153(ic,n){const c=document.createElement('canvas');c.width=128;c.height=64;const x=c.getContext('2d');x.fillStyle='rgba(251,247,236,.92)';x.strokeStyle='#14110c';x.lineWidth=3;
 x.beginPath();x.roundRect?x.roundRect(4,8,120,48,12):x.rect(4,8,120,48);x.fill();x.stroke();x.font='34px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillStyle='#14110c';x.fillText(ic+(n>1?' '+n:''),64,34);return new THREE.CanvasTexture(c)}
setInterval(()=>{try{if(typeof scene==='undefined'||!S)return;const off=modeHist()||(typeof VP!=='undefined'&&VP)||(typeof K!=='undefined'&&K)||S.fin;
 const W={};if(!off)(S.pp||[]).forEach(p=>{if(p.lieu==null||enGrp(p))return;const k=typeof tacheDe==='function'?tacheDe(p):p.tache;if(!ICO153[k])return;const c=campDe(p);if(c==null||c===p.lieu)return;const key=p.lieu+'|'+k;(W[key]=W[key]||{i:p.lieu,k,c,n:0}).n++});
 const cle=JSON.stringify(W);if(cle!==TRAV153.cle){TRAV153.cle=cle;for(const q in TRAV153.L){scene.remove(TRAV153.L[q]);TRAV153.L[q].material.map.dispose()}TRAV153.L={};if(TRAV153.ln){scene.remove(TRAV153.ln);TRAV153.ln.geometry.dispose();TRAV153.ln=null}
  const P=[];Object.values(W).forEach(w=>{const t=T[w.i],c=T[w.c];const s=new THREE.Sprite(new THREE.SpriteMaterial({map:travTex153(ICO153[w.k],w.n),transparent:true,depthWrite:false,depthTest:false}));s.renderOrder=7;s.userData={t};TRAV153.L[w.i+'|'+w.k]=s;scene.add(s);
   const N=16;for(let j=0;j<N;j++){const u0=j/N,u1=(j+.5)/N;[u0,u1].forEach(u=>{const x=c.x+(t.x-c.x)*u,z=c.z+(t.z-c.z)*u;P.push(x,Math.max(0,alt(x,z))*VX+.06,z)})}});
  if(P.length){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));TRAV153.ln=new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0xfbf7ec,transparent:true,opacity:.7,depthTest:false}));TRAV153.ln.renderOrder=6;scene.add(TRAV153.ln)}}
 const now=performance.now(),fl=TRAV153.flash;let k2=0;Object.values(TRAV153.L).forEach(s=>{const t=s.userData.t,sc=Math.max(.28,dist*.05);const off2=(k2++%2)*.15*sc;s.position.set(t.x,t.alt*VX+.25+sc*.5+off2,t.z);
  const f=fl&&fl.i===t.i&&now-fl.t0<4000?1+.25*Math.abs(Math.sin((now-fl.t0)/200)):1;s.scale.set(sc*1.6*f,sc*.8*f,1);s.visible=!off&&dist<40});if(TRAV153.ln)TRAV153.ln.visible=!off&&dist<40}catch(e){}},250);
