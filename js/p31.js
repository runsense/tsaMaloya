// ===== p31 : la Fournaise — les coulées partent rarement du sommet, le plus souvent de cratères qui naissent sur les flancs ; parfois hors de l'Enclos =====
// Les lieux sont choisis au hasard dans des zones réelles : flancs de l'Enclos Fouqué, sommet (Dolomieu), et hors Enclos vers Sainte-Rose ou Saint-Philippe.
const FOUR={som:[55.7135,-21.2444],G:null,obj:[]};
function fourZone(){const r=Math.random(),[sx,sz]=FOUR.som;
 if(r<.15)return {k:'sommet',n:'au sommet, dans le Dolomieu',p:[[sx,sz]]};
 if(r<.85){const a=(Math.random()-.5)*2.4,d=.012+Math.random()*.03,c=[sx+Math.cos(a)*d*1.1,sz+Math.sin(a)*d],nb=Math.random()<.35?2+Math.floor(Math.random()*2):1,P=[];
  for(let i=0;i<nb;i++)P.push([c[0]+Math.cos(a+1.57)*.004*i,c[1]+Math.sin(a+1.57)*.004*i]);return {k:'flanc',n:(nb>1?'des fissures s’ouvrent':'un cratère naît')+' sur le flanc '+(a<-.4?'nord-est':a>.4?'sud-est':'est')+', dans l’Enclos',p:P}}
 const nord=Math.random()<.5,c=nord?[55.745+Math.random()*.03,-21.205+Math.random()*.02]:[55.72+Math.random()*.03,-21.30+Math.random()*.02];return {k:'hors',n:'hors de l’Enclos, au-dessus de '+(nord?'Sainte-Rose':'Saint-Philippe')+' : les habitants descendent vers la côte',p:[c]}}
// la coulée suit la plus forte pente jusqu'à se figer ou toucher la mer
function fourCoulee(x,z){const P=[[x,z]];let cx=x,cz=z;for(let i=0;i<90;i++){const h=alt(cx,cz);if(h<=0)break;let b=null,bh=h;for(let k=0;k<12;k++){const a=k/12*6.283,nx=cx+Math.cos(a)*.22,nz=cz+Math.sin(a)*.22,nh=alt(nx,nz);if(nh<bh){bh=nh;b=[nx,nz]}}if(!b){if(Math.random()<.5)break;b=[cx+.15,cz]}cx=b[0];cz=b[1];P.push([cx,cz])}return P}
function fourDessin(){if(typeof scene==='undefined'||!S)return;if(!FOUR.G){FOUR.G=new THREE.Group();scene.add(FOUR.G)}const G=FOUR.G;while(G.children.length){const o=G.children.pop();o.geometry&&o.geometry.dispose()}FOUR.obj=[];
 (S.four||[]).forEach((e,j)=>{const chaud=S.er>0&&j===S.four.length-1;
  e.cr.forEach(([x,z])=>{const h=alt(x,z)*VX;const c=new THREE.Mesh(new THREE.CylinderGeometry(.09,.2,.12,10,1,true),new THREE.MeshLambertMaterial({color:0x3a2a24,side:THREE.DoubleSide}));c.position.set(x,h+.05,z);G.add(c);
   if(chaud){const f=new THREE.Mesh(new THREE.CircleGeometry(.08,10),new THREE.MeshBasicMaterial({color:0xffa030}));f.rotation.x=-Math.PI/2;f.position.set(x,h+.1,z);G.add(f);FOUR.obj.push(f)}});
  e.co.forEach(L=>{if(L.length<2)return;const pts=L.map(([x,z])=>new THREE.Vector3(x,alt(x,z)*VX+.03,z)),cu=new THREE.CatmullRomCurve3(pts),m=new THREE.Mesh(new THREE.TubeGeometry(cu,Math.max(8,pts.length*2),chaud?.09:.06,6,false),new THREE.MeshBasicMaterial({color:chaud?0xff5a1a:0x2c2522}));G.add(m);if(chaud)FOUR.obj.push(m)})});FOUR.k=(S.four||[]).length+'|'+(S.er>0)}
// une nouvelle éruption : on choisit d'où elle part, et la coulée descend
setInterval(()=>{if(!S||typeof alt!=='function')return;if(S.er>0&&S.fourNs!==S.ns&&!(S.four||[]).some(e=>e.ns===S.ns)){const Z=fourZone();const cr=Z.p.map(([lo,la])=>xz(lo,la)),co=cr.map(([x,z])=>fourCoulee(x,z));
  S.four=(S.four||[]).concat([{ns:S.ns,y:S.year,k:Z.k,n:Z.n,cr,co}]).slice(-8);S.fourNs=S.ns;log('La Fournaise entre en éruption : '+Z.n+'.');if(Z.k==='hors')fx({coh:-1});
  const mer=co.some(L=>L.length&&alt(L[L.length-1][0],L[L.length-1][1])<=0);if(mer)log('La coulée atteint la mer : la côte gagne quelques mètres de lave.');sauve()}
 if(FOUR.k!==(S.four||[]).length+'|'+(S.er>0))fourDessin()},1000);
// la lave chaude palpite
{const t0=performance.now();(function f(){requestAnimationFrame(f);if(!FOUR.obj.length)return;const v=.75+Math.sin((performance.now()-t0)/180)*.25;FOUR.obj.forEach(o=>o.material.color.setRGB(1,.35*v+.1,.05))})()}
// un mythe de Saint-Denis : la lave dormirait sous le Brûlé
EV.lavBrule={tag:'Mythe',an:'',nat:'Croyance populaire de Saint-Denis, reprise dans le jeu. Aucune lave n’a jamais coulé là.',si:()=>(S.four||[]).length>=1&&S.year>=1738,
 t:'La lave sous le Brûlé',b:'Au-dessus de Saint-Denis, la plaine du Brûlé porte un nom de feu. On y raconte qu’une lave dort sous les pieds, et qu’un jour elle rejoindra la ville. Les plus vieux montrent des pierres noires comme preuve.',
 h:'Le Brûlé de Saint-Denis est une zone des hauteurs de la ville. Le massif du Piton des Neiges, au-dessus, est un volcan éteint depuis des millénaires ; les coulées actuelles viennent toutes de la Fournaise, au sud-est.',
 o:[{n:'Écouter les anciens',d:'Mystique +2',fx:{myst:2}},{n:'Aller voir les pierres',d:'Savoir +1',fx:{savoir:1}}]};
setInterval(()=>{if(!S||S.fin||S.done&&S.done.lavBrule||!EV.lavBrule.si())return;if(S.evq.includes('lavBrule'))return;if(Math.random()<.02)S.evq.push('lavBrule')},5000);
