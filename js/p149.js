
// ===== p149 : les gens d'aujourd'hui dans les villes (modèles « Characters extras », CC-BY Elbolillo) =====
// À partir de 1950, dans les bourgs et les villes, des passants habillés à la mode du XXᵉ siècle se tiennent par petits groupes devant les cases :
// ils ne marchent pas (le modèle n'a pas d'animation, ils glisseraient) ; ils discutent, se tournent l'un vers l'autre, changent d'appui.
const FIG149={T:null,att:0,G:null,cle:''};
function figTpl149(){if(FIG149.T||FIG149.att)return;FIG149.att=1;buf144('sk_figurants').then(ab=>new THREE.GLTFLoader().parse(ab.slice(0),'',g=>{const L=[];g.scene.updateMatrixWorld(true);
  g.scene.traverse(o=>{if(!o.isMesh)return;let n=o.name||'',p=o.parent;while(p&&!/Character_/.test(n)){n=p.name||'';p=p.parent}if(/Monster|Killer|Sheriff/.test(n))return;
   const geo=flot45(o.geometry.clone());geo.applyMatrix4(o.matrixWorld);geo.computeBoundingBox();const b=geo.boundingBox,c=b.getCenter(new THREE.Vector3()),h=b.max.y-b.min.y||1;geo.translate(-c.x,-b.min.y,-c.z);geo.scale(1/h,1/h,1/h);
   const m=new THREE.Mesh(geo,o.material);harmonise144(m);L.push(m)});FIG149.T=L;console.log('figurants',L.length)},()=>{})).catch(()=>{})}
setInterval(()=>{try{if(!S||typeof scene==='undefined'||(typeof K!=='undefined'&&K))return;const on=S.year>=1950&&dist<9&&!(typeof VP!=='undefined'&&VP);if(!FIG149.G){FIG149.G=new THREE.Group();scene.add(FIG149.G)}FIG149.G.visible=on;if(!on)return;figTpl149();if(!FIG149.T||!FIG149.T.length)return;
  const cle=Math.round(camT.x/2)+'|'+Math.round(camT.z/2);if(cle===FIG149.cle)return;FIG149.cle=cle;const G=FIG149.G;while(G.children.length)G.remove(G.children[0]);
  const P=T.filter(t=>Math.hypot(t.x-camT.x,t.z-camT.z)<Math.max(4,dist)&&S.t[t.i]&&S.t[t.i].c).slice(0,8);let n=0;
  P.forEach(t=>{const k=2+Math.floor(rndH(t.i*1.7)*3);const cx=t.x+(rndH(t.i*2.3)-.5)*.6,cz=t.z+(rndH(t.i*3.1)-.5)*.6;
   for(let j=0;j<k&&n<18;j++,n++){const tpl=FIG149.T[Math.floor(rndH(t.i*7+j)*FIG149.T.length)],o=tpl.clone();const a=j/k*6.283+rndH(t.i);o.position.set(cx+Math.cos(a)*.07,Math.max(0,alt(cx,cz))*VX,cz+Math.sin(a)*.07);o.scale.setScalar(.075*(.92+rndH(t.i+j)*.16));o.rotation.y=Math.atan2(cx-o.position.x,cz-o.position.z);o.userData.r0=o.rotation.y;o.userData.ph=rndH(t.i*j+3)*6;G.add(o)}})}catch(e){}},800);
// ils changent d'appui et se tournent un peu, chacun à son rythme
(function an149(){requestAnimationFrame(an149);try{if(!FIG149.G||!FIG149.G.visible)return;const t=performance.now()/1000;FIG149.G.children.forEach(o=>{const u=o.userData;o.rotation.y=u.r0+.25*Math.sin(t*.4+u.ph)+(Math.sin(t*.13+u.ph)>.8?.6:0);o.rotation.z=.02*Math.sin(t*.7+u.ph)})}catch(e){}})();
if(typeof CRED144!=='undefined')CRED144.push(['Passants du XXᵉ siècle (Characters extras)','Elbolillo']);
