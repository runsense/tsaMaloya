// ===== p302 : (1) Tab change de personnage dans une incarnation à plusieurs (Anchaing ↔ Héva, Simangavole ↔ les siens…),
// chacun avec ses talents : Anchaing pêche mieux, Héva cuisine mieux (plus vite, plus nourrissant) et connaît les plantes.
// (2) le décor des incarnations texturé : écorce, feuillage, roche, sol grainé ; palmistes et fanjans avec de vraies palmes
// au lieu de cônes ; blocs de basalte moins anguleux. =====
TAL300.heva=[['cuisine','Cuisiner (plus vite, plus nourrissant)'],['plantes','Cueillir des plantes'],['soin','Soigner']];
TAL300.compagnon=[['peche','Pêcher les camarons'],['plantes','Cueillir des plantes'],['guet','Guetter les chasseurs']];
function cle302(I){const n=(I.h&&I.h.d&&I.h.d.n)||I.C.heros.n;if(/Héva/.test(n))return 'heva';if(/Anchaing/.test(n))return 'anchaing';if(n===I.C.heros.n)return I.k;return 'compagnon'}
// la liste des talents suit celui qu'on joue
{const t0=talent300;talent300=function(i){const I=INC;if(!I)return;const L=TAL300[cle302(I)]||TAL300.simang,t=L[i];if(t&&t[0]==='cuisine'){const st=I.st,f=st&&st.feu;if(!f){incMsg287('Il faut d’abord un feu (5).');return}if(Math.hypot(f.x-I.h.x,f.z-I.h.z)>3){incMsg287('Approchez-vous du feu.');return}if(!(st.sac.viande||st.sac.camaron)){incMsg287('Rien à cuire : pêchez ou chassez d’abord.');return}st.cuis=99;incMsg287('Héva cuisine : c’est prêt, et ça nourrit mieux.');return}
 return t0.apply(this,arguments)}}
function barre302(){const I=INC;if(!I)return;const old=document.getElementById('incB300');if(old)old.remove();const L=TAL300[cle302(I)]||TAL300.simang,d=document.createElement('div');d.id='incB300';
 d.style.cssText='position:absolute;left:50%;transform:translateX(-50%);bottom:46px;display:flex;flex-wrap:wrap;gap:4px;justify-content:center;max-width:94%;z-index:2';
 const B=[[1,'Boire'],[2,'Manger'],[3,'Repos / abri'],[4,'Puiser l’eau'],[5,'Feu, cuire'],[6,'Ramasser bois'],[0,'Jeter un bois']].map(([n,t])=>['g'+n,n+' '+t]).concat(L.map((t,i)=>['t'+i,(7+i)+' '+t[1]])).concat(MYS300.map((m,i)=>['m'+i,'Alt+'+(i+1)+' '+m[1].split(' :')[0]]));
 d.innerHTML=B.map(([k,t])=>'<button data-b="'+k+'" style="font:12px Georgia,serif;padding:3px 7px;border-radius:6px;border:1px solid #8a7040;background:rgba(30,24,16,.75);color:#f1e6cc;cursor:pointer">'+t+'</button>').join('');I.el.appendChild(d);
 d.querySelectorAll('[data-b]').forEach(x=>x.onclick=ev=>{ev.stopPropagation();const k=x.dataset.b,n=+k.slice(1);if(k[0]==='g')geste300(n);else if(k[0]==='t')talent300(n);else mystique300(n)})}
function change302(){const I=INC;if(!I||!I.cps||!I.cps.length||I.pause||I.duel)return;const a=I.h,b=I.cps[0];
 // on prend la main sur l'autre, là où il se trouve ; celui qu'on quitte devient compagnon et suit
 b.yo=0;b.vy=0;I.h=b;I.cps[0]=a;I.trace=[];I.saut=1;
 incMsg287('Vous êtes maintenant '+b.d.n+'.'+(/Héva/.test(b.d.n)?' Elle cuisine mieux et connaît les plantes.':/Anchaing/.test(b.d.n)?' Il pêche mieux.':''));incHud287();barre302();try{hud290()}catch(e){}}
addEventListener('keydown',e=>{if(e.key==='Tab'&&typeof INC!=='undefined'&&INC&&!INC.duel){e.preventDefault();e.stopPropagation();change302()}},true);
// les textures, peintes une fois
const TX302={};
function tex302(k){if(TX302[k])return TX302[k];const c=document.createElement('canvas'),n=128;c.width=c.height=n;const x=c.getContext('2d');let s=k.length*977;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};
 const fond=(v)=>{x.fillStyle='rgb('+v+','+v+','+v+')';x.fillRect(0,0,n,n)};
 if(k==='ecorce'){fond(200);for(let i=0;i<70;i++){const X=r()*n,w=1+r()*3,v=120+Math.floor(r()*90);x.fillStyle='rgb('+v+','+v+','+v+')';x.fillRect(X,0,w,n)}for(let i=0;i<40;i++){const v=90+Math.floor(r()*60);x.fillStyle='rgba('+v+','+v+','+v+',.6)';x.fillRect(r()*n,r()*n,2+r()*6,1+r()*2)}}
 else if(k==='feuilles'){fond(150);for(let i=0;i<700;i++){const v=110+Math.floor(r()*145);x.fillStyle='rgb('+v+','+v+','+v+')';x.beginPath();x.ellipse(r()*n,r()*n,2+r()*4,1+r()*2,r()*3,0,7);x.fill()}}
 else if(k==='roche'){fond(170);for(let i=0;i<500;i++){const v=110+Math.floor(r()*120);x.fillStyle='rgba('+v+','+v+','+v+',.7)';x.fillRect(r()*n,r()*n,1+r()*4,1+r()*4)}for(let i=0;i<25;i++){x.strokeStyle='rgba(60,60,60,.5)';x.beginPath();let X=r()*n,Y=r()*n;x.moveTo(X,Y);for(let j=0;j<4;j++){X+=(r()-.5)*30;Y+=(r()-.5)*30;x.lineTo(X,Y)}x.stroke()}}
 else if(k==='sol'){fond(205);for(let i=0;i<1400;i++){const v=150+Math.floor(r()*105);x.fillStyle='rgba('+v+','+v+','+v+',.8)';x.beginPath();x.ellipse(r()*n,r()*n,1+r()*3,1+r()*2,r()*3,0,7);x.fill()}for(let i=0;i<120;i++){x.strokeStyle='rgba(120,120,120,.5)';const X=r()*n,Y=r()*n;x.beginPath();x.moveTo(X,Y);x.lineTo(X+(r()-.5)*5,Y-2-r()*5);x.stroke()}}
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;if(THREE.sRGBEncoding)t.encoding=THREE.sRGBEncoding;TX302[k]=t;return t}
// une palme : plusieurs longues feuilles qui partent du cœur et retombent (pour les palmistes et les fanjans)
function palme302(L,nb){const cle='p'+L+'_'+nb;if(TX302[cle])return TX302[cle];const sh=new THREE.Shape();sh.moveTo(0,-.06*L);sh.quadraticCurveTo(L*.5,-.18*L,L,0);sh.quadraticCurveTo(L*.5,.18*L,0,.06*L);sh.lineTo(0,-.06*L);
 const base=new THREE.ShapeGeometry(sh,5).toNonIndexed(),P=[];const pa=base.attributes.position;for(let i=0;i<pa.count;i++){const X=pa.getX(i),u=X/L;pa.setZ(i,-u*u*L*.55)}
 for(let k=0;k<nb;k++){const g=base.clone();g.rotateX(-Math.PI/2);g.rotateZ(.15+(k%3)*.12);g.rotateY(k/nb*Math.PI*2);P.push(g.attributes.position.array)}
 const tot=P.reduce((a,b)=>a+b.length,0),A=new Float32Array(tot);let o=0;P.forEach(a=>{A.set(a,o);o+=a.length});const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(A,3));g.computeVertexNormals();TX302[cle]=g;return g}
// à l'ouverture : textures sur ce qui est uni, et la barre des talents du personnage joué
{const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);try{const I=INC;if(!I)return r;
 I.S3.traverse(m=>{if(!m.isMesh||!m.material||m.material.map||m.material.isShaderMaterial||m.material.vertexColors&&!(m.geometry&&m.geometry.type==='PlaneGeometry'))return;const g=m.geometry&&m.geometry.type;let t=null;
  if(g==='PlaneGeometry'&&m.material.vertexColors){t=tex302('sol').clone();t.needsUpdate=true;t.repeat.set(70,70)}
  else if(g==='CylinderGeometry')t=tex302('ecorce');
  else if(g==='IcosahedronGeometry'||g==='SphereGeometry'){const c=m.material.color;t=c&&c.g>c.r*1.12&&!m.material.transparent?tex302('feuilles'):(c&&c.r<.5&&Math.abs(c.r-c.g)<.08?tex302('roche'):null)}
  else if(g==='DodecahedronGeometry')t=tex302('roche');
  if(t){m.material.map=t;m.material.needsUpdate=true}});
 barre302()}catch(e){console.warn(e)}return r}}
// revenir au menu sans recharger la page (dans un artifact, le rechargement est bloqué : on restait sur une carte vide).
// Le menu « Quelle histoire ? » est remis visible, et la difficulté s'aligne sur la grille déjà chargée.
function menu302(){try{const e=$('ecran');if(e)e.hidden=false;if(typeof GRF!=='undefined'&&typeof DIFC!=='undefined'){const f=DIFC!=='histoire';if(f!==GRF)DIFC=GRF?'normal':'histoire'}S=null}catch(x){}try{choixVoie()}catch(x){}}
{const q=incQuitter287;incQuitter287=function(){if(!INC)return;const r=INC.ret;INC.ret=null;incFermer287();if(r)menu302()}}
