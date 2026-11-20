// ===== Les petits jeux harmonisés : les mêmes personnages 3D animés que dans la partie, photographiés image par image =====
// Vue de dessus : on voit la tête et les épaules, tournées vers où le personnage va. Vue de côté (plateformes) : le profil.
// Les images sont prises une fois (8 par geste) dans un petit moteur 3D caché, puis dessinées comme des images ; tant qu'elles ne sont pas prêtes, l'ancien dessin reste.
const SPR185={R:null,S:null,C:null,cv:null,inst:{},att:{},cache:{},file:[],SZ:128,N:8};
function spr185Moteur(){if(SPR185.R)return true;if(typeof THREE==='undefined'||!THREE.GLTFLoader||typeof p3Charge!=='function')return false;
 try{const cv=document.createElement('canvas');cv.width=cv.height=SPR185.SZ;const R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true,preserveDrawingBuffer:true});R.outputEncoding=THREE.sRGBEncoding;R.setClearColor(0,0);
  const Sc=new THREE.Scene();Sc.add(new THREE.HemisphereLight(0xfff4e4,0x60503a,1.7));const dl=new THREE.DirectionalLight(0xfff0d8,1.1);dl.position.set(-2,10,3);Sc.add(dl);
  SPR185.R=R;SPR185.S=Sc;SPR185.cv=cv;SPR185.C=new THREE.OrthographicCamera(-1,1,1,-1,-50,50);return true}catch(e){SPR185.R=null;return false}}
function spr185Inst(m){if(SPR185.inst[m])return Promise.resolve(SPR185.inst[m]);if(SPR185.att[m])return SPR185.att[m];
 SPR185.att[m]=p3Charge(m).then(()=>p3Instance(m)).then(o=>{o.g.scene.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o.g.scene);o.h=(b.max.y-b.min.y)>.3?b.max.y-b.min.y:1.75;o.y0=isFinite(b.min.y)?b.min.y:0;const grp=new THREE.Group();grp.add(o.g.scene);o.grp=grp;o.clips=o.g.animations;SPR185.inst[m]=o;return o}).catch(()=>{SPR185.inst[m]=null;return null});return SPR185.att[m]}
function spr185Cuire(m,clip,vue){const k=m+'|'+clip+'|'+vue;if(SPR185.cache[k])return;SPR185.cache[k]={pret:0};
 SPR185.file.push(()=>spr185Inst(m).then(o=>{if(!o||!spr185Moteur()){SPR185.cache[k].rate=1;return}const S=SPR185;
  const cl=THREE.AnimationClip.findByName(o.clips,clip)||THREE.AnimationClip.findByName(o.clips,'garde');if(!cl){S.cache[k].rate=1;return}
  S.S.add(o.grp);o.mx.stopAllAction();const ac=o.mx.clipAction(cl);ac.reset();ac.setLoop(THREE.LoopRepeat,Infinity);ac.play();
  const h=o.h,C=S.C;o.grp.position.set(0,-o.y0,0);
  if(vue==='dessus'){const e=h*.32;o.grp.rotation.set(0,Math.PI/2,0);C.left=-e;C.right=e;C.top=e;C.bottom=-e;C.position.set(0,h*3,0);C.up.set(0,0,-1);C.lookAt(0,0,0)}
  else{o.grp.rotation.set(0,Math.PI/2,0);C.left=-h*.6;C.right=h*.6;C.top=h*1.15;C.bottom=-h*.05;C.position.set(0,0,h*3);C.up.set(0,1,0);C.lookAt(0,0,0)}
  C.updateProjectionMatrix();const F=[];
  for(let f=0;f<S.N;f++){ac.time=cl.duration*f/S.N;o.mx.update(0);S.R.render(S.S,C);const c=document.createElement('canvas');c.width=c.height=S.SZ;c.getContext('2d').drawImage(S.cv,0,0);F.push(c)}
  S.S.remove(o.grp);o.mx.stopAllAction();S.cache[k]={pret:1,F,dur:cl.duration}}).catch(()=>{SPR185.cache[k].rate=1}))}
{let occupe=0;setInterval(()=>{if(occupe||!SPR185.file.length)return;occupe=1;const j=SPR185.file.shift();Promise.resolve().then(j).catch(()=>{}).then(()=>{occupe=0})},40)}
// dessine un personnage ; vue 'dessus' : centré en (X,Y), « taille » = largeur de l'image, ang = direction (0 = vers la droite)
// vue 'cote' : X au milieu, Y aux pieds, « taille » = hauteur du personnage, ang < 0 = regarde à gauche. Rend false si l'image n'est pas encore prête.
function spr185(x,m,clip,vue,phase,X,Y,taille,ang){const k=m+'|'+clip+'|'+vue,c=SPR185.cache[k];if(!c){spr185Cuire(m,clip,vue);return false}if(!c.pret)return false;
 const F=c.F[Math.floor(((phase%1)+1)%1*c.F.length)%c.F.length];x.save();
 if(vue==='dessus'){x.translate(X,Y);x.rotate(ang||0);x.drawImage(F,-taille/2,-taille/2,taille,taille)}
 else{const w=taille*1.2;x.translate(X,Y);if(ang<0)x.scale(-1,1);x.drawImage(F,-w/2,-taille*1.15,w,w)}
 x.restore();return true}
// quel modèle pour quel personnage des petits jeux
function mod185(b,s,id){const nm=((b&&b.n)||'').toLowerCase();
 if(s===1){if(/chien/.test(nm))return null;if(/command/.test(nm))return 'commandeur';if(/colon|chasseur|habitant/.test(nm))return 'p7_colon';return 'milicien'}
 if(/myst|esprit|sorc|chaman/.test(nm))return 'mystique';if(/femme|guerri|reine|h[ée]va/.test(nm))return 'femme_sagaie';if(/plong|guet/.test(nm))return 'jeune_pagne';if(/lame|chef|chasseur/.test(nm))return 'p1a_chasseur';
 return ['p1a_chasseur','jeune_pagne','femme_sagaie','homme_chemise'][Math.abs(id|0)%4]}
// la vue de dessus remplace le petit personnage dessiné des jeux tactiques (commando, embuscade, défense du camp)
{const p0=perso97,MEM=new WeakMap();perso97=function(x,u,b,px,py,s,cs,G){try{const id=(u.id||u.cx*7+u.cy*3||0),m=mod185(b,s,id);if(m){
  let d=MEM.get(u);const now=performance.now();if(!d){d={x:px,y:py,a:s===0?-Math.PI/2:Math.PI/2,v:0,t:now};MEM.set(u,d)}const dx=px-d.x,dy=py-d.y,dist=Math.hypot(dx,dy);if(dist>.4)d.a=Math.atan2(dy,dx);d.v=d.v*.85+Math.min(3,dist)*.15;d.x=px;d.y=py;
  let att=0;(G&&G.fx||[]).forEach(f=>{if(Math.abs(f.x0-(u.x||0))<.15&&Math.abs(f.y0-(u.y||0))<.15)att=Math.max(att,f.t||.3)});
  const nm=((b&&b.n)||'').toLowerCase(),tir=/fusil|archer|tireur|canon|mousquet/.test(nm)||m==='milicien'&&s===1&&/fusil/.test(nm);
  const clip=u.peur>0?'marche_blesse':att>0?(tir?'fusil':m==='p1a_chasseur'||m==='femme_sagaie'?'sagaie':'baton_coup'):(d.v>.15||(G&&G.phase==='fight'))?'marche':'repos_debout';
  const t=now/1000,ph=t*(clip==='marche'?1.1:clip==='garde'?.5:1.6)+id*.13;
  // ombre et anneau de camp, comme avant
  x.save();x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(px,py+cs*.06,cs*.3,cs*.22,0,0,7);x.fill();x.strokeStyle=s===0?'#e2bd74':'#c03030';x.lineWidth=3;x.beginPath();x.ellipse(px,py+cs*.06,cs*.36,cs*.27,0,0,7);x.stroke();x.restore();
  if(spr185(x,m,clip,'dessus',ph,px,py,cs*2.1,d.a)){if(/mystique|esprit|sorc/.test(nm)){x.strokeStyle='rgba(180,220,255,'+(.4+.3*Math.sin(t*4))+')';x.lineWidth=2;x.beginPath();x.arc(px,py,cs*.42+Math.sin(t*3)*3,0,7);x.stroke()}return}}}catch(e){}return p0.apply(this,arguments)}}
