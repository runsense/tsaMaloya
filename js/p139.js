
// ===== p139 : Survie — un lieu n'offre que ce qui y est possible ; les pentes interdisent de bâtir =====
// Sur le camp : on bâtit autour du feu (grenier, guet, sentier), pas un autre camp.
// Ailleurs : on peut fonder un camp, ou tracer un sentier, poser un guet ; le grenier se bâtit au camp ou juste à côté.
// Pente : au-delà de 30°, on ne bâtit plus ni camp, ni grenier, ni habitation, ni champ ; au-delà de 45°, seul un sentier passe.
function pente139(t){return t.slope||0}
{const kb=kBatir;kBatir=function(t){let L=kb(t);try{if(!K||!t)return L;const B=K.b[t.i]||[],moi=K.joueur,campIci=B.some(x=>x.k==='camp'||x.k==='habitation'||x.k==='ville'),
  voisinCamp=typeof kVoisins==='function'&&kVoisins(t).some(u=>(K.b[u.i]||[]).some(x=>x.k==='camp'||x.k==='habitation')),p=pente139(t);
  L=L.filter(([k])=>{if(p>45)return k==='sentier'||k==='route';if(p>30&&['camp','grenier','habitation','champ','ville','magasin','chapelle','port','jardin'].includes(k))return false;
   if(moi==='m'){if(campIci&&k==='camp')return false;if(!campIci&&!voisinCamp&&k==='grenier')return false}return true})}catch(e){}return L}}
// le panneau le dit : pourquoi on ne peut pas bâtir ici, et ce qu'est ce lieu
{const kp=kPanneau;kPanneau=function(){const r=kp.apply(this,arguments);try{if(!K||K.vue==='ile'||KVUE.sel==null)return r;const t=T[KVUE.sel],A=$('kA');if(!A||!t)return r;const h4=A.querySelector('.pc h4');if(!h4)return r;
  const p=pente139(t),B=K.b[t.i]||[],campIci=B.some(x=>x.k==='camp'||x.k==='habitation');let n=A.querySelector('.p139');if(!n){n=document.createElement('div');n.className='p139';n.style.cssText='margin:4px 0;font-size:12px';h4.parentElement.insertBefore(n,h4.nextSibling)}
  n.innerHTML=(campIci?'<b style="color:#e8be5a">'+(K.joueur==='c'?'🏠 Votre habitation':'🔥 Votre camp')+'</b> · on bâtit autour du feu, on y répartit le monde.':'<b>Un lieu hors du camp</b> · '+(K.joueur==='m'?'on peut y fonder un camp, y tracer un sentier ou y poser un guet ; le grenier se bâtit au camp ou à côté.':'on peut y ouvrir une habitation, un champ ou une route.'))+
   (p>45?'<br><span style="color:#e87b5a">Pente de '+Math.round(p)+'° : trop raide pour bâtir. Seul un sentier y passe.</span>':p>30?'<br><span style="color:#e8a05a">Pente de '+Math.round(p)+'° : on ne peut pas y bâtir de case ni de grenier.</span>':'')}catch(e){}return r}}
// Survie : au début, seules les bêtes de l'île vivent autour de la ville — tortues géantes, ibis (solitaire), oiseau bleu, perroquets, roussettes, papangue.
// Elles reculent puis disparaissent à mesure que les plantations et les chasses des colons gagnent (plus il y a d'habitations et de champs, plus vite).
const KF139={G:null,tor:[],ibi:[],ble:[],ois:[],rou:[],pap:null};
function kAn139(){try{return K.an||1663}catch(e){return 1663}}
function kDens139(k){try{const y=(DISP133.find(d=>d[0]===k)||[])[1]||1800;let col=0;for(const i in K.b)(K.b[i]||[]).forEach(x=>{if(['habitation','champ','ville','route','magasin'].includes(x.k))col++});
  const prog=(kAn139()-1663)/(y-1663)*(.6+.4*Math.min(2.5,col/8));return Math.max(0,Math.min(1,1-prog))}catch(e){return 1}}
function ibis139(){const g=new THREE.Group(),w=new THREE.MeshLambertMaterial({color:0xf2efe6}),n=new THREE.MeshLambertMaterial({color:0x1c1c1c});const b=new THREE.Mesh(new THREE.SphereGeometry(.03,8,6),w);b.scale.set(1.4,1,.9);b.position.y=.07;g.add(b);
 const c=new THREE.Mesh(new THREE.CylinderGeometry(.006,.008,.05,5),w);c.position.set(.035,.1,0);c.rotation.z=-.5;g.add(c);const tt=new THREE.Mesh(new THREE.SphereGeometry(.012,6,5),n);tt.position.set(.05,.125,0);g.add(tt);
 const bec=new THREE.Mesh(new THREE.CylinderGeometry(.002,.004,.05,4),n);bec.position.set(.072,.11,0);bec.rotation.z=-1.9;g.add(bec);[-.01,.01].forEach(z=>{const p=new THREE.Mesh(new THREE.CylinderGeometry(.003,.003,.05,4),n);p.position.set(0,.025,z);g.add(p)});return g}
function kPool139(L,n,mk){while(L.length<n){const o=mk();if(o.parent)o.parent.remove(o);KF139.G.add(o);L.push(o)}L.forEach((o,i)=>o.visible=i<n)}
(function boucle139(){requestAnimationFrame(boucle139);try{const d=$('kons');if(!K||!d||d.hidden||K.vue!=='ville'||!KV3.S)return;if(!KF139.G||KF139.G.parent!==KV3.S){KF139.G=new THREE.Group();KV3.S.add(KF139.G);Object.assign(KF139,{tor:[],ibi:[],ble:[],ois:[],rou:[],pap:null})}
  const now=performance.now()/1000,c=KV3.tg,R=Math.max(2.5,KV3.dist*.9),P=T.filter(t=>Math.hypot(t.x-c.x,t.z-c.z)<R&&!(K.b[t.i]||[]).length),h=(t,s)=>rndH(t.i*3.7+s),Y=(x,z)=>k3Y(x,z);
  const vit=(k,L,cond,n,mk,pos)=>{const d=kDens139(k),Q=[];if(d>0)P.forEach(t=>{if(Q.length>=n||!cond(t)||h(t,k.length)>.55*d)return;Q.push(t)});kPool139(L,Q.length,mk);Q.forEach((t,i)=>pos(L[i],t,i))};
  const erre=(t,s,r)=>{const k=now*s+h(t,9)*6,fk=k-Math.floor(k),u=Math.floor(k)+(fk<.5?0:(fk-.5)*2);return [t.x+r*(Math.sin(u+h(t,3)*6)+.5*Math.sin(u*1.7)),t.z+r*.8*(Math.cos(u*.9)+.5*Math.sin(u*1.4+1)),u]};
  vit('tortues',KF139.tor,t=>t.alt<450&&!t.forest,10,()=>tortue138(),(o,t,i)=>{const [x,z,u]=erre(t,.04,.25);o.position.set(x,Y(x,z),z);o.rotation.y=u;o.scale.setScalar(1.4)});
  vit('solitaire',KF139.ibi,t=>t.alt>200&&t.alt<1800,8,ibis139,(o,t,i)=>{const [x,z,u]=erre(t,.15,.22);o.position.set(x,Y(x,z),z);o.rotation.y=-u*1.3;o.scale.setScalar(1.4)});
  vit('oiseaubleu',KF139.ble,t=>t.alt>1300&&!t.forest,6,()=>bleu138(),(o,t,i)=>{const [x,z,u]=erre(t,.2,.2);o.position.set(x,Y(x,z),z);o.rotation.y=-u;o.scale.setScalar(1.4)});
  // perroquets en bande au-dessus des forêts, le jour ; roussettes au crépuscule
  const jour=((now/60)%1);const nuit=jour>.75;
  vit('perroquets',KF139.ois,t=>t.forest&&!nuit,6,()=>{const g=new THREE.Group();for(let j=0;j<6;j++){const o=oiseau135('perroquets');if(o.parent)o.parent.remove(o);o.position.set((Math.random()-.5)*.3,Math.random()*.1,(Math.random()-.5)*.3);g.add(o)}return g},(o,t,i)=>{const k=now*.5+h(t,4)*6;o.position.set(t.x+Math.cos(k)*.6,Y(t.x,t.z)+1+.1*Math.sin(k*2),t.z+Math.sin(k*1.3)*.5);o.rotation.y=-k;o.children.forEach((b,j)=>{const a=Math.sin(now*14+j)*.8;b.userData.ad.rotation.z=a;b.userData.ag.rotation.z=-a})});
  vit('roussetteN',KF139.rou,t=>t.forest&&nuit,6,()=>roussette138(),(o,t,i)=>{const k=now*.45+h(t,5)*6;o.position.set(t.x+Math.cos(k)*.5,Y(t.x,t.z)+.8,t.z+Math.sin(k*1.2)*.4);o.rotation.y=-k;const a=Math.sin(now*9+i)*.7;o.userData.ad.rotation.z=a;o.userData.ag.rotation.z=-a});
  if(!KF139.pap){KF139.pap=rapace138(false);if(KF139.pap.parent)KF139.pap.parent.remove(KF139.pap);KF139.G.add(KF139.pap)}const k=now*.1;KF139.pap.position.set(c.x+Math.cos(k)*R*.5,Y(c.x,c.z)+2.5,c.z+Math.sin(k)*R*.4);KF139.pap.rotation.y=-k+Math.PI;KF139.pap.rotation.z=.25;KF139.pap.visible=!nuit}catch(e){}})();
// Histoire et Vie : le détail d'un camp ou d'une ville de colons ne disparaît plus quand la vue glisse un peu.
// Le détail suivait la caméra case par case : en bougeant, on quittait Saint-Paul, ses cases clignotaient puis s'effaçaient.
// Un camp ou une ville reste ouvert tant que la vue est à moins de 2,6 de son centre ; et s'il y en a un tout près, c'est lui qu'on ouvre.
{let dbl=0;addEventListener('dblclick',()=>{dbl=performance.now()},true);
 const imp=t=>{try{const o=S.t[t.i];return !!(o&&(o.b==='camp'||o.c))||(typeof colTiles==='function'&&colTiles().includes(t))}catch(e){return false}};
 let derO=0;const ol=ouvrirLieu;ouvrirLieu=function(t){try{if(S&&t&&performance.now()-dbl>400&&typeof camT!=='undefined'){
   // jamais rouvrir le même lieu, ni rouvrir un lieu moins d'1,2 s après le précédent : chaque réouverture refait le décor, et l'enchaînement clignotait
   if(t===lieu)return;if(performance.now()-derO<1200)return;
   if(lieu&&lieu!==t&&imp(lieu)&&Math.hypot(lieu.x-camT.x,lieu.z-camT.z)<2.6)return;
   if(!imp(t)){const c=T.filter(u=>imp(u)&&seen(u)&&Math.hypot(u.x-camT.x,u.z-camT.z)<1.6).sort((a,b)=>Math.hypot(a.x-camT.x,a.z-camT.z)-Math.hypot(b.x-camT.x,b.z-camT.z))[0];if(c){if(c===lieu)return;t=c}}derO=performance.now()}}catch(e){}return ol.call(this,t)}}
