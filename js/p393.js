// ===== p393 : les figurines des crèches de l'auteur entrent dans le jeu (ses propres modèles, couleurs de ses filaments) :
// la grotte devient le vrai abri de Payen et des camps en grotte ; la poule noire et le cabri autour des cases ; le dodo
// (fiction du jeu) dans le Sud ; Joseph et Marie créoles près des habitations ; le roi marron près des camps marrons ;
// le roi indien près des familles venues de l'Inde (après 1850) ; le roi français en ville au XXᵉ siècle. Ce sont des statues :
// elles se tiennent là, sans marcher. Les ibis prennent le modèle « sk_ibis » du jeu quand il est là. =====
const M393={};
['grotte_creche','creche_poule_noire','creche_cabri','creche_dodo','creche_joseph','creche_marie','creche_roi_indien','creche_roi_marron','creche_roi_francais','sk_ibis'].forEach(n=>{try{mod104(n).then(T=>{M393[n]=T}).catch(()=>{})}catch(e){}});
// la grotte : le modèle remplace la paroi de rochers
{const gd=grotteDessin387;grotteDessin387=function(t){const T=M393.grotte_creche;if(!T)return gd.apply(this,arguments);
 if(!G387.g){G387.g=new THREE.Group();scene.add(G387.g)}const cle='g393_'+t.i;if(G387.g.getObjectByName(cle))return;
 let ux=0,uz=-1;try{const d=.6,gx=alt(t.x+d,t.z)-alt(t.x-d,t.z),gz=alt(t.x,t.z+d)-alt(t.x,t.z-d),n=Math.hypot(gx,gz);if(n>1){ux=gx/n;uz=gz/n}}catch(e){}
 if(!T.userData.u393){T.userData.u393=1;T.traverse(m=>{if(m.isMesh&&m.material){m.material.side=THREE.DoubleSide;if(m.material.emissive)m.material.emissive.setRGB(.18,.16,.13)}})}const o=clone104(T,.17);const x=t.x+ux*.5,z=t.z+uz*.5;o.position.set(x,alt(x,z)*VX-.01,z);o.rotation.y=Math.atan2(-ux,-uz);o.name=cle;o.userData.ti=t.i;G387.g.add(o);
 // les cultures devant restent
 const fx=t.x-ux*.35,fz=t.z-uz*.35,px=-uz,pz=ux;for(let r=0;r<5;r++)for(let k=0;k<9;k++){const ox=(k-4)*.07,oz=(r-2)*.075,xx=fx+px*ox-ux*oz,zz=fz+pz*ox-uz*oz;if(alt(xx,zz)<3)continue;const v=r%3;hutC.setRGB(v===0?.55:v===1?.42:.6,v===0?.85:v===1?.7:.75,v===0?.3:v===1?.25:.35);poseM(MOD.herbe,xx,alt(xx,zz)*VX+.02,zz,rndH(r*13+k)*6.28,0,0,v===0?1.25:.8,hutC)}}}
{const p0=peindre;peindre=function(){try{if(G387.g)G387.g.children.slice().forEach(m=>{if(m.userData.ti==null)return;const o=S&&S.t[m.userData.ti];if(!o||o.b!=='camp'||!grotte387(T[m.userData.ti],o))G387.g.remove(m)})}catch(e){}return p0.apply(this,arguments)}}
// l'ibis et le dodo : les vrais modèles quand ils sont chargés
{const o0=oiseau390;oiseau390=function(k){const n=k==='sol'?'sk_ibis':k==='dodo'?'creche_dodo':null;if(n&&M393[n]){{const o=clone104(M393[n],k==='sol'?.07:.06);o.userData.m393=1;return o}}return o0.apply(this,arguments)}}
// les figurines autour des lieux habités (près de la caméra)
{const vb=viv108Bati;viv108Bati=function(){const g=vb.apply(this,arguments);try{if(!S)return g;const y=S.year||1663,proche=t=>Math.hypot(t.x-camT.x,t.z-camT.z)<Math.max(4,dist*.7);
  const pose=(n,t,a,d,h,rot)=>{const T=M393[n];if(!T)return;const o=clone104(T,h);const x=t.x+Math.cos(a)*d,z=t.z+Math.sin(a)*d;o.position.set(x,Math.max(0,alt(x,z))*VX,z);o.rotation.y=rot!=null?rot:Math.atan2(t.x-x,t.z-z);g.add(o)};
  camps().forEach((c,ci)=>{const t=T[c.i];if(!t||!proche(t))return;
   pose('creche_poule_noire',t,ci*1.3+.4,.42,.035);pose('creche_poule_noire',t,ci*1.3+.9,.47,.032);if(y>=1665)pose('creche_cabri',t,ci*1.3+2.2,.5,.05);
   if(!S.voieC){pose('creche_roi_marron',t,ci*1.3+3.4,.3,.11)}else if(y>=1700){pose('creche_joseph',t,ci*1.3+3.4,.32,.11);pose('creche_marie',t,ci*1.3+3.7,.3,.08)}
   if(y>=1850&&ci%2===0)pose('creche_roi_indien',t,ci*1.3+4.6,.36,.11)});
  if(y>=1940){const V=(typeof VILLES!=='undefined'?VILLES:[]).filter(v=>(S.towns||[]).includes(v[3])).map(v=>near(v[1],v[2])).filter(Boolean);V.slice(0,2).forEach((t,i)=>{if(proche(t))pose('creche_roi_francais',t,i*2+1,.3,.11)})}
 }catch(e){}return g}}
