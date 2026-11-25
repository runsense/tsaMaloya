// ===== p314 : (1) les boutons larges (choix d'une carte) ne grossissent plus jusqu'à se couper : ils s'éclairent et prennent un liseré ;
// (2) le paille-en-queue et le papangue ne sont plus des avions rigides : corps fuselé, ailes galbées qui battent ou planent,
// pointes noires, longs brins de queue du paille-en-queue, rémiges écartées du papangue. =====
{const st=document.createElement('style');st.textContent='button.large314:not(:disabled):hover,button.large314:not(:disabled):focus-visible{transform:none!important;filter:brightness(1.15)!important;box-shadow:0 0 0 2px #d8b45a,0 4px 14px rgba(0,0,0,.35)!important}';document.head.appendChild(st);
 const marque=e=>{const b=e.target&&e.target.closest&&e.target.closest('button');if(!b||b.classList.contains('large314'))return;const p=b.parentElement;if(p&&b.offsetWidth>Math.max(180,p.clientWidth*.6))b.classList.add('large314')};
 addEventListener('mouseover',marque,true);addEventListener('focusin',marque,true)}
// ----- les grands oiseaux -----
const OIS314=[];
function aile314(blanc,cote){// une aile vue de dessus : bord d'attaque arrondi, pointe effilée (paille-en-queue) ou digitée (papangue)
 const s=new THREE.Shape(),Z=(x,z)=>[x*cote,-z];const L=blanc?.13:.12,P=[];
 if(blanc){P.push([0,.022],[.04,.026],[.085,.018],[L,.002],[L*.93,-.006],[.07,-.008],[.03,-.016],[0,-.02])}
 else{P.push([0,.026],[.04,.03],[.075,.026],[.1,.016],[L,.004],[L*.96,-.001],[L*.98,-.007],[L*.92,-.008],[L*.93,-.014],[.09,-.016],[.06,-.026],[.03,-.032],[0,-.028])}
 P.forEach(([x,z],i)=>{const [a,b]=Z(x,z);i?s.lineTo(a,b):s.moveTo(a,b)});const g=new THREE.ShapeGeometry(s,4).rotateX(-Math.PI/2);
 // un léger galbe : l'aile s'arque vers le haut au milieu
 const p=g.attributes.position;for(let i=0;i<p.count;i++){const x=Math.abs(p.getX(i))/L;p.setY(i,Math.sin(Math.PI*x)*.008-x*x*.004)}g.computeVertexNormals();return g}
function rapace314(blanc){const g=new THREE.Group(),coul=blanc?0xf4f2ec:0x6a4e34,M=c=>new THREE.MeshLambertMaterial({color:c,side:THREE.DoubleSide}),mc=M(coul),mn=M(blanc?0x1a1a1a:0x2a1e14);
 const corps=new THREE.Mesh(new THREE.SphereGeometry(.016,10,8),mc);corps.scale.set(.9,.8,3.1);g.add(corps);
 const tete=new THREE.Mesh(new THREE.SphereGeometry(.011,8,6),mc);tete.position.set(0,.004,.05);g.add(tete);
 const bec=new THREE.Mesh(new THREE.ConeGeometry(.0045,.02,5).rotateX(Math.PI/2),M(blanc?0xe8a020:0x3a3a30));bec.position.set(0,.002,.068);g.add(bec);
 if(blanc){const m=new THREE.Mesh(new THREE.BoxGeometry(.023,.003,.004),mn);m.position.set(0,.008,.052);g.add(m)}
 const ailes=[1,-1].map(c=>{const piv=new THREE.Group();piv.position.set(.006*c,.004,.006);const a=new THREE.Mesh(aile314(blanc,c),mc);piv.add(a);
  // la pointe sombre (barre noire du paille-en-queue, doigts sombres du papangue)
  const t=new THREE.Mesh(aile314(blanc,c),mn);t.scale.set(blanc?.32:.28,1,blanc?.55:1);t.position.set((blanc?.085:.088)*c,.0005,blanc?.004:0);piv.add(t);g.add(piv);return piv});
 // la queue : en éventail pour le papangue, deux longs brins blancs pour le paille-en-queue
 if(blanc){[-1,1].forEach(c=>{const q=new THREE.Mesh(new THREE.PlaneGeometry(.004,.15).rotateX(-Math.PI/2),mc);q.position.set(.002*c,0,-.12);g.add(q)})}
 else{const sh=new THREE.Shape();sh.moveTo(-.006,0);sh.lineTo(-.016,.045);sh.quadraticCurveTo(0,.052,.016,.045);sh.lineTo(.006,0);const q=new THREE.Mesh(new THREE.ShapeGeometry(sh).rotateX(Math.PI/2),mc);q.position.z=-.035;g.add(q)}
 g.userData.o314={ailes,blanc,ph:Math.random()*6.28};OIS314.push(g);scene.add(g);return g}
rapace138=function(blanc){return rapace314(blanc)};
// le vol : le paille-en-queue bat souvent des ailes ; le papangue plane longtemps, puis quelques coups lents
{const vol=()=>{const t=performance.now()/1000;for(let i=OIS314.length-1;i>=0;i--){const g=OIS314[i];if(!g.parent){OIS314.splice(i,1);continue}if(!g.visible)continue;const o=g.userData.o314;
  let a;if(o.blanc){a=Math.sin(t*7+o.ph)*.45*(.6+.4*Math.max(0,Math.sin(t*.7+o.ph)))}else{const cyc=(t*.35+o.ph)%3;a=cyc<.7?Math.sin(cyc/.7*Math.PI*3)*.35:.12+Math.sin(t*.8+o.ph)*.03}
  o.ailes[0].rotation.z=a;o.ailes[1].rotation.z=-a}requestAnimationFrame(vol)};requestAnimationFrame(vol)}
// ----- le tamarin des Hauts : plus une ombrelle ronde, mais un vieil arbre penché, tronc tordu en trois coudes,
// branches qui partent de côté, feuillage fin en plateaux étagés et inégaux, comme dans les forêts de Bélouve -----
{const m0=p23Mod;p23Mod=function(nom,ps,max){if(nom==='tamarin'&&!MOD.tamarin){try{const TR=TR23,cy=(a,b,h,n=6)=>new THREE.CylinderGeometry(a,b,h,n),ic=r=>new THREE.IcosahedronGeometry(r,1);const bois=0x4e3a28,V=[0x3f6a30,0x4f7a3a,0x5f8a44,0x48723a];
 const P=[[cy(.026,.036,.16),bois,TR(0,.08,0,0,0,.18)],[cy(.02,.026,.13),bois,TR(.022,.2,0,0,0,-.22)],[cy(.015,.02,.12),bois,TR(.012,.31,.01,.15,0,.35)],
  [cy(.008,.013,.16),bois,TR(.07,.3,.02,0,0,-1.0)],[cy(.007,.011,.14),bois,TR(-.05,.33,-.02,.2,0,.9)],[cy(.006,.01,.12),bois,TR(.0,.36,.06,-.9,0,.1)],[cy(.006,.009,.1),bois,TR(-.01,.37,-.06,.9,0,-.1)]];
 // les plateaux de feuillage : larges, très plats, à hauteurs différentes, qui ne se recouvrent pas tout à fait
 [[.13,.36,.02,.11],[-.11,.37,-.03,.1],[.02,.42,.1,.09],[.0,.41,-.1,.09],[.06,.46,-.02,.08],[-.06,.45,.05,.07],[.17,.33,-.06,.06],[-.15,.34,.07,.06]].forEach(([x,y,z,r],i)=>{for(let k=0;k<4;k++){const a=k*1.7+i,d=r*.55*(k?1:0);P.push([new THREE.IcosahedronGeometry(r*(k?.62:.8),0),V[(i+k)%4],TR(x+Math.cos(a)*d,y+(k%2)*.012-.006,z+Math.sin(a)*d,0,a,0,1.3,.38,1.15)])}});
 return m0.call(this,nom,P,max)}catch(e){}}return m0.apply(this,arguments)}}
// ----- le contour de la case choisie : fin et lisible de loin, il s'efface quand on est tout près (vue du camp, lieu ouvert) -----
{let fait=0;const pas=()=>{try{if(!fait&&typeof terr!=='undefined'&&terr&&terr.material&&terr.material.uniforms){const m=terr.material,a='if(e>.86&&pat>.5)C=mix(C,mix(vec3(1.,.87,.5),vec3(1.,.36,.06)*(.88+.12*sin(t*5.)),pl),.9);';
  if(m.fragmentShader.indexOf(a)>=0){m.uniforms.zr314={value:1};m.fragmentShader=m.fragmentShader.replace('uniform sampler2D st;','uniform sampler2D st;uniform float zr314;').replace(a,'if(e>.86+.08*(1.-zr314)&&pat>.5)C=mix(C,mix(vec3(1.,.87,.5),vec3(1.,.36,.06)*(.88+.12*sin(t*5.)),pl),.9*zr314);');m.needsUpdate=true}fait=1}
 if(fait&&terr.material.uniforms.zr314){const d=typeof dist!=='undefined'?dist:20;terr.material.uniforms.zr314.value=Math.max(0,Math.min(1,(d-2.5)/6))}}catch(e){}requestAnimationFrame(pas)};requestAnimationFrame(pas)}
