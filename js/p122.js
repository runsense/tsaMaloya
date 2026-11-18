
// ===== p122 : les bœufs et les moutons de la bibliothèque 3D =====
// Les bœufs (couchés, au repos) remplacent les petites boîtes sur la carte et dans la vue du camp.
// Les moutons arrivent avec la colonisation des Hauts (XIXe siècle) : sur les cases d'altitude, puis dans les fermes des Hauts.
const P122={};
['ani_boeuf','ani_mouton'].forEach(n=>mod104(n).then(m=>{P122[n]=m;try{VIV108.cle=null;if(typeof CV!=='undefined'&&CV.on&&typeof p3Deco==="function"&&P122.L)p3Deco(P122.L,P122.C)}catch(e){}}).catch(()=>{}));
const hauts122=()=>S&&S.year>=1830&&(S.voieC||S.year>=1848);
function bete122(k,taille){const m=P122[k==='mouton'?'ani_mouton':'ani_boeuf'];if(!m)return null;return clone104(m,taille,true)}
{const vb=viv108Bati;viv108Bati=function(){const g=vb.apply(this,arguments);try{if(!P122.ani_boeuf&&!P122.ani_mouton)return g;
 const garde=[];VIV108.b.forEach(b=>{let k=b.k;if(k==='cabri'&&hauts122()&&P122.ani_mouton){const a=Math.max(0,alt(b.cx,b.cz));if(a>800&&Math.sin(b.ph*7)>-.4)k='mouton'}
  if((k==='boeuf'||k==='mouton')){const o=bete122(k,k==='boeuf'?.17:.11);if(o){b.o.clear();b.o.scale.setScalar(1);b.o.add(o);b.o.rotation.y=b.cap;b.o.position.y=Math.max(0,alt(b.o.position.x,b.o.position.z))*VX;return}}garde.push(b)});
 VIV108.b=garde}catch(e){}return g}}
// dans la vue du camp : les bêtes de l'enclos, couchées près de la maison
{const pd=p3Deco;p3Deco=function(L,C){pd.apply(this,arguments);try{P122.L=L;P122.C=C;if(!C||!S||!L||!L.cases||!L.cases.length||!(S.bet>0))return;const G=P3.deco;const [x,z]=p3W(...L.cases[0]);
 const n=Math.min(4,1+Math.floor(S.bet/2)),ca=camps()[0],mt=hauts122()&&ca&&T[ca.i]&&T[ca.i].alt>800;
 for(let i=0;i<n;i++){const k=mt&&i%2?'mouton':'boeuf',o=bete122(k,k==='boeuf'?2.4:1.3);if(!o)continue;o.position.set(x+5+i*2.8,0,z+9+(i%2)*2.4);o.userData.b122=1;o.rotation.y=.6+i*1.3;G.add(o)}
 if(mt&&P122.ani_mouton)for(let i=0;i<3;i++){const o=bete122('mouton',1.2);o.position.set(x+9+i*1.8,0,z-4+(i%2)*1.6);o.rotation.y=i*2.1;G.add(o)}}catch(e){}}}

// ===== les savoirs qui attendent : une bulle près de l'onglet Savoirs, qui s'efface quand on passe dessus =====
{const st=document.createElement('style');st.textContent='#svLet.b122{left:auto;top:auto;transform:none;max-width:260px;padding:8px 12px;font:13px Georgia,serif;border-radius:10px}#svLet.b122 h4{font-size:14px}#svLet.b122 small{font-size:11px}#svLet.b122::after{content:"";position:absolute;width:12px;height:12px;background:#efe2c0;border:1px solid #b89a5a;border-width:var(--bw);transform:rotate(45deg);left:var(--fx);top:var(--fy)}';document.head.appendChild(st)}
function svBulle122(d){const t=$('t-sav'),r=t&&t.offsetParent?t.getBoundingClientRect():null;d.classList.add('b122');const W=Math.min(260,innerWidth-24);
 if(r&&r.width){const bas=r.top<innerHeight/2;let l=Math.max(12,Math.min(innerWidth-W-12,r.left+r.width/2-W/2));d.style.left=l+'px';d.style.width=W+'px';
  if(bas){d.style.top=(r.bottom+12)+'px';d.style.setProperty('--fy','-7px');d.style.setProperty('--bw','1px 0 0 1px')}else{d.style.bottom=(innerHeight-r.top+12)+'px';d.style.setProperty('--fy','calc(100% - 6px)');d.style.setProperty('--bw','0 1px 1px 0')}
  d.style.setProperty('--fx',(r.left+r.width/2-l-6)+'px')}
 else{d.style.right='14px';d.style.top='70px';d.style.width=W+'px';d.style.setProperty('--fx','calc(100% - 30px)');d.style.setProperty('--fy','-7px');d.style.setProperty('--bw','1px 0 0 1px')}
 d.onmouseenter=()=>{d.style.opacity=0;setTimeout(()=>d.remove(),500)}}
new MutationObserver(M=>M.forEach(m=>m.addedNodes.forEach(n=>{if(n.id==='svLet')svBulle122(n)}))).observe(document.body,{childList:true});

// ===== les quatre fanjans : on les reconnaît en zoomant, rien n'est écrit =====
// mâle (C. borbonica) : tronc fin, net, sans manchon ; feuilles 2 fois divisées.
// femelles (C. excelsa, C. glauca) : la base renflée d'un gros cône de racines ; crosses vertes et lisses (excelsa), duvet roux (glauca, dans les Hauts).
// fanjan d'Australie (C. cooperi) : cicatrices ovales sur le tronc, crosses aux longs poils blancs ; introduit, il gagne les bords de route.
function fanjan122Mods(){if(MOD.fanjanEx||typeof p23Mod!=='function')return;const TR=TR23,cy=(a,b,h,n=6)=>new THREE.CylinderGeometry(a,b,h,n),co=(r,h,n=8)=>new THREE.ConeGeometry(r,h,n),bx=(w,h,d)=>new THREE.BoxGeometry(w,h,d),sp=r=>new THREE.IcosahedronGeometry(r,0);
 // une fronde 3 fois divisée : un rachis et des pennes de part et d'autre
 const fronde=(k,col,lg,y)=>{const a=k*.785+.2,P=[];const c=Math.cos(a),s=Math.sin(a);P.push([bx(lg,.004,.012),col,TR(c*lg/2*.9,y,s*lg/2*.9,0,-a,.3)]);
  for(let j=1;j<=4;j++){const d=lg*j/5,px=c*d*.9,pz=s*d*.9,py=y+Math.sin(.3)*d*.9-.004;P.push([bx(.008,.003,lg*.34*(1-j*.13)),col,TR(px,py,pz,0,-a,.3)])}return P};
 const crosses=(col,r,y)=>[0,2.1,4.2].map(a=>[sp(r),col,TR(Math.cos(a)*.016,y,Math.sin(a)*.016,0,0,0,1,1.4,1)]);
 const manchon=[[co(.05,.1,9),0x3a2b1e,TR(0,.05,0)],[co(.036,.07,7),0x4a3626,TR(.008,.035,.006,0,.4,0)]];
 const F=c=>[0,1,2,3,4,5,6,7].flatMap(k=>fronde(k,c,.21,.27));
 p23Mod('fanjanEx',[[cy(.013,.018,.27,6),0x33261c,TR(0,.135,0)],...manchon,...F(0x2f7a46),...crosses(0x6aa04c,.009,.285)],160);
 p23Mod('fanjanGl',[[cy(.013,.018,.27,6),0x30241a,TR(0,.135,0)],...manchon,...F(0x3d7464),...crosses(0x9a4c22,.01,.285)],160);
 p23Mod('fanjanCo',[[cy(.016,.019,.27,6),0x4a3a2c,TR(0,.135,0)],...[.05,.1,.15,.2].flatMap((y,j)=>[[sp(.008),0x9a8a70,TR(Math.cos(j*1.7)*.016,y,Math.sin(j*1.7)*.016,0,0,0,.6,1.3,.6)]]),...F(0x5c9a3a),...crosses(0xeeeae0,.013,.288)],160)}
function fanjan122Esp(h,k,o){const r=rndH(k*3.3+7);if(S&&S.year>=1960&&(o.c||o.clr||h<900)&&r<.22)return 'Co';
 if(h>1100)return r<.55?'Gl':r<.8?'Ex':'';if(h>400)return r<.55?'Ex':r<.65?'Gl':'';return r<.4?'Ex':''}
{const rl=remplirLieu;remplirLieu=function(){const r=rl.apply(this,arguments);try{const t=lieu,m=MOD.fanjan;if(!t||!m||!S)return r;fanjan122Mods();if(!MOD.fanjanEx)return r;const o=S.t[t.i]||{};
 const M4=new THREE.Matrix4(),p=new THREE.Vector3(),q=new THREE.Quaternion(),sc=new THREE.Vector3(),c=new THREE.Color(1,1,1),Z=new THREE.Matrix4().makeScale(0,0,0),e=new THREE.Euler();
 for(let i=0;i<m.userData.n;i++){m.getMatrixAt(i,M4);M4.decompose(p,q,sc);if(sc.x<=0)continue;const esp=fanjan122Esp(p.y/VX,i+t.i,o);if(!esp)continue;const d=MOD['fanjan'+esp];if(!d)continue;
  e.setFromQuaternion(q);if(m.instanceColor)m.getColorAt(i,c);poseM(d,p.x,p.y,p.z,e.y,0,0,sc.x,c);m.setMatrixAt(i,Z)}
 m.instanceMatrix.needsUpdate=true;['Ex','Gl','Co'].forEach(k=>{const d=MOD['fanjan'+k];if(d){d.count=d.userData.n;d.instanceMatrix.needsUpdate=true;if(d.instanceColor)d.instanceColor.needsUpdate=true}})}catch(e){}return r}}

// ===== en gros zoom sur un lieu, la plante sous la souris est nommée (nom créole, nom savant) =====
const NOMS122={fanjan:['Fanjan mâle','Cyathea borbonica'],fanjanEx:['Fanjan femelle','Cyathea excelsa'],fanjanGl:['Fanjan femelle','Cyathea glauca'],fanjanCo:['Fanjan d’Australie','Cyathea cooperi'],
 tamarin:['Tamarin des Hauts','Acacia heterophylla'],filao:['Filao','Casuarina equisetifolia'],tamarinier:['Tamarinier','Tamarindus indica'],palmiste:['Palmiste',''],latanier:['Latanier rouge','Latania lontaroides'],
 vacoa:['Vacoa','Pandanus utilis'],branle:['Branle vert','Erica reunionensis'],bois_chandelle:['Bois de chandelle','Dracaena reflexa'],benjoin:['Benjoin','Terminalia bentzoë'],ambaville:['Ambaville','Hubertia ambavilla']};
{const st=document.createElement('style');st.textContent='#nom122{position:fixed;z-index:70;pointer-events:none;background:rgba(20,16,12,.82);color:#f3e6c4;border:1px solid rgba(232,190,90,.6);border-radius:6px;padding:3px 8px;font:12px system-ui;white-space:nowrap;transition:opacity .2s}#nom122 i{font-family:Georgia,serif;opacity:.75;margin-left:6px}';document.head.appendChild(st)}
{let tl=0;const rc=new THREE.Raycaster(),v=new THREE.Vector2();const cache=()=>{const b=$('nom122');if(b)b.style.opacity=0};
 addEventListener('pointermove',e=>{const now=performance.now();if(now-tl<110)return;tl=now;try{
  if(!S||!lieu||dist>1.7||(typeof VP!=='undefined'&&VP)||(typeof CV!=='undefined'&&CV.on)||!e.target||e.target.tagName!=='CANVAS'){cache();return}
  const r=e.target.getBoundingClientRect();v.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);rc.setFromCamera(v,cam);
  const L=Object.keys(NOMS122).map(k=>MOD[k]).filter(m=>m&&m.visible!==false&&m.count>0);const h=rc.intersectObjects(L,false)[0];
  if(!h||h.distance>2.2){cache();return}const k=Object.keys(NOMS122).find(q=>MOD[q]===h.object),N=NOMS122[k];let b=$('nom122');if(!b){b=document.createElement('div');b.id='nom122';document.body.appendChild(b)}
  b.innerHTML='<b>'+N[0]+'</b>'+(N[1]?'<i>'+N[1]+'</i>':'');b.style.left=(e.clientX+14)+'px';b.style.top=(e.clientY-26)+'px';b.style.opacity=1}catch(x){cache()}},{passive:true})}

// ===== en Histoire, en tout petit sous le chrono du conte : « Tab pour avancer » =====
setInterval(()=>{try{let d=$('tab122');const c=$('auto');const on=S&&!S.fin&&typeof modeHist==='function'&&modeHist()&&c&&c.offsetParent&&!(typeof VP!=='undefined'&&VP);
 if(!on){if(d)d.style.display='none';return}const r=c.getBoundingClientRect();if(!r.width){if(d)d.style.display='none';return}
 if(!d){d=document.createElement('div');d.id='tab122';d.innerHTML='<kbd>Tab</kbd> pour avancer';d.style.cssText='position:fixed;z-index:61;font:10px system-ui;color:#f3e6c4;opacity:.6;pointer-events:none;white-space:nowrap;text-shadow:0 1px 2px #000';document.body.appendChild(d);
  const st=document.createElement('style');st.textContent='#tab122 kbd{font:600 9px system-ui;padding:0 4px;border:1px solid currentColor;border-bottom-width:2px;border-radius:3px;margin-right:3px}';document.head.appendChild(st)}
 d.style.display='';d.style.left=(r.left+r.width/2)+'px';d.style.top=(r.bottom+2)+'px';d.style.transform='translateX(-50%)'}catch(e){}},500);
