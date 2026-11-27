// ===== p335 : quand une épopée se marche en ville (Saint-Denis, Saint-Paul), on n'est plus seul au bord d'une rivière dans la
// forêt : la marche devient une rue. Plus de rivière ni de forêt en cônes ni de cases marronnes à l'arrivée ; des maisons de
// part et d'autre, des cocotiers, la garnison en haie au départ pour accueillir celui qui arrive, des habitants qui regardent,
// et au bout la maison du gouvernement, pavillon blanc du roi au mât. =====
const VILLE335={bourdonnais:[0,2,3],traite:[1,2],archives:[0,1,2],aurore:[0,1],compagnie:[2],corsaires:[0],maquis:[2],crypto334:[0,1,2]};
{const m0=marcher327;marcher327=function(k,ci,C,P,suite){const r=m0.apply(this,arguments);try{const id='epc327_'+k+'_'+ci,E=INC287[id];if(E&&(VILLE335[k]||[]).includes(ci)){E.ch[0].ville=1;if(INC&&INC.C===E.ch[0])habiller335(INC,k,ci)}}catch(e){console.warn(e)}return r}}
function habiller335(I,k,ci){const S3=I.S3,P=I.P,N=I.N,h=I.hAt;
 // on retire ce qui fait « forêt sauvage »
 S3.children.slice().forEach(o=>{const g=o.geometry,m=o.material;if(!g)return;const col=m&&m.color&&m.color.getHex();
  if(o.isInstancedMesh&&/Cone|Cylinder|Icosa|Dodeca|Buffer/.test(g.type)&&o.count>15)o.visible=false;
  if(o.isMesh&&!o.isInstancedMesh&&col===0x3f6a72)o.visible=false;// la rivière
  if(o.isMesh&&g.type==='ConeGeometry'&&g.parameters&&(g.parameters.radius===1.7||g.parameters.radius===.5))o.visible=false;// cases et feu du camp
 });
 I.arb.length=0;Object.keys(I.AG).forEach(q=>delete I.AG[q]);const bloque=(x,z,r)=>{const a={x,z,r};I.arb.push(a);(I.AG[I.ag(x,z)]||(I.AG[I.ag(x,z)]=[])).push(a)};
 const cache=setInterval(()=>{if(!INC||INC!==I){clearInterval(cache);return}if(I.qui&&I.qui.root){I.qui.root.visible=false;clearInterval(cache)}},300);
 const an=parseInt(I.C.an)||1750,M=(n,h0,x,z,rot,coll)=>{if(typeof mod104!=='function')return;mod104(n).then(T=>{if(INC!==I)return;const o=clone104(T,h0);o.position.set(x,h(x,z),z);o.rotation.y=rot;S3.add(o)}).catch(()=>{});if(coll)bloque(x,z,coll)};
 const dir=i=>{const p=P[Math.max(0,i-2)],q=P[Math.min(N-1,i+2)];const dx=q[0]-p[0],dz=q[1]-p[1],L=Math.hypot(dx,dz)||1;return [dx/L,dz/L]};
 // les maisons de la rue, des deux côtés
 const types=an<1760?['bat_case_paille','bat_case_paille','bat_magasin','bat_habitation']:['bat_habitation','bat_magasin','bat_case_paille','bat_habitation'];let n=0;
 for(let i=10;i<N-12;i+=9){const [dx,dz]=dir(i),nx=-dz,nz=dx;[1,-1].forEach(s=>{const d=8+((i*7+s*3)%4),x=P[i][0]+nx*d*s,z=P[i][1]+nz*d*s,t=types[(n++)%types.length];void 0/* p361 : les maisons de la rue sont désormais construites en front de rue */});
  if(i%27===10){const s=i%2?1:-1;M('sk_cocotier',7,P[i][0]+nx*3.6*s,P[i][1]+nz*3.6*s,i,0)}}
 if(n>8)M('bat_chapelle',5,P[Math.floor(N/2)][0]+(-dir(Math.floor(N/2))[1])*13,P[Math.floor(N/2)][1]+dir(Math.floor(N/2))[0]*13,0,4);
 // la garnison en haie au départ (pour le gouverneur), ou des habitants qui regardent
 const gouv=k==='bourdonnais'&&ci===2;for(let i=0;i<6;i++){const j=4+i*2,[dx,dz]=dir(j),s=i%2?1:-1,x=P[j][0]-dz*2.6*s,z=P[j][1]+dx*2.6*s;M(gouv?'milicien':(i%2?'homme_chemise':'servante'),1.75,x,z,Math.atan2(dz*s,-dx*s),0)}
 // au bout : la maison du gouvernement (ou la place), le pavillon au mât
 const f=P[N-1],[ex,ez]=dir(N-3);M('bat_habitation',6,f[0]+ex*9,f[1]+ez*9,Math.atan2(-ex,-ez),5);
 const mat=new THREE.Mesh(new THREE.CylinderGeometry(.08,.1,9,6),new THREE.MeshLambertMaterial({color:0x6a5a40}));mat.position.set(f[0]+ex*3+ez*4,h(f[0],f[1])+4.5,f[1]+ez*3-ex*4);S3.add(mat);
 const dr=new THREE.Mesh(new THREE.PlaneGeometry(2.2,1.4,8,4),new THREE.MeshLambertMaterial({color:an<1789?0xf4f0e6:an<1815?0xf4f0e6:0xf4f0e6,side:THREE.DoubleSide}));dr.position.set(mat.position.x+1.1,mat.position.y+3.6,mat.position.z);S3.add(dr);
 if(an>=1794&&an<1815||an>=1830){// le drapeau tricolore après la Révolution (et de 1830 à aujourd'hui), en fondu de bandes
  const c=document.createElement('canvas');c.width=60;c.height=40;const g=c.getContext('2d');g.fillStyle='#22408a';g.fillRect(0,0,20,40);g.fillStyle='#f4f0e6';g.fillRect(20,0,20,40);g.fillStyle='#c0282a';g.fillRect(40,0,20,40);dr.material.map=new THREE.CanvasTexture(c);dr.material.color.setHex(0xffffff);dr.material.needsUpdate=true}
 const t0=performance.now();const vent=()=>{if(INC!==I)return;const t=(performance.now()-t0)/1000,p=dr.geometry.attributes.position;for(let q=0;q<p.count;q++){const x=p.getX(q)+1.1;p.setZ(q,Math.sin(x*3-t*4)*.12*x)}p.needsUpdate=true;requestAnimationFrame(vent)};vent();
 try{incMsg287&&incMsg287(gouv?'La garnison se range en haie au barachois : le nouveau gouverneur arrive.':'La rue est là : les cases, les magasins, et ceux qui regardent passer.')}catch(e){}}
