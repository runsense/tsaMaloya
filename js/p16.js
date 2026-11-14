
// ===== Petits jeux du menu : le bouton Retour reste en vue ; chaque jeu s'ouvre sur son récit ; à la fin, rejouer ou revenir =====
let PJ_DER=null;
addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('#ecran [data-pj],#ecran [data-av],#ecran [data-du],#ecran [data-ec],#ecran [data-cm]');if(b){const k=Object.keys(b.dataset).find(k=>/^(pj|av|du|ec|cm)$/.test(k));PJ_DER='#ecran [data-'+k+'="'+b.dataset[k]+'"]'}},true);
{const st=document.createElement('style');st.textContent='#ecran .pjRet{position:fixed!important;left:50%;bottom:14px;transform:translateX(-50%);z-index:20;box-shadow:0 4px 18px rgba(0,0,0,.5);min-width:180px}#ecran .bloc{padding-bottom:70px}';document.head.appendChild(st)}
setInterval(()=>{const e=$('ecran');if(!e||e.hidden||!e.querySelector('[data-pj]'))return;const L=[...e.querySelectorAll('button')].filter(b=>/^\s*Retour/.test(b.textContent));const r=L[L.length-1];if(r&&!r.classList.contains('pjRet'))r.classList.add('pjRet')},300);
// l'embuscade et la défense du camp avaient un écran sans récit : on leur donne le leur, comme aux autres
{const l0=lancerPJ;lancerPJ=function(k){const R={emb:{t:'L’embuscade',h:'Un détachement monte vers les hauts sans vous avoir vus. Les vôtres connaissent le sentier : les rochers d’où l’on fait rouler les pierres, la rivière qu’il faut traverser, les arbres où se cacher.',but:'faire fuir le détachement avant qu’il ne passe vos lignes.'},camp:{t:'Défendre le camp',h:'Les chasseurs de noirs arrivent par le sentier. Le camp n’a que ses guerriers, ses pièges et le terrain.',but:'repousser l’attaque en perdant le moins de monde possible.'}}[k];
 if(R&&typeof introJeu==='function'){introJeu({sur:'Petit jeu',t:R.t,h:R.h,but:R.but,cmd:['Touchez un emplacement pour y poster un guerrier, encore une fois pour l’en retirer','Touchez le sentier pour poser un piège','« Lancer le combat » : il se joue seul','La falaise lâche un rocher une fois ; la rivière et les rochers protègent mieux que les buissons']},ok=>{window.BTUON=0;if(ok)l0(k);else menuPJ()});return}return l0(k)}}
{const f0=finPJ;finPJ=function(txt){f0(txt);if(!PJ_DER)return;const sel=PJ_DER;const d=document.createElement('div');d.id='pjFin';d.style.cssText='position:fixed;inset:0;z-index:95;display:flex;align-items:center;justify-content:center;background:rgba(10,8,6,.65)';
 d.innerHTML='<div class="pjb" style="max-width:420px"><small>Fin de la partie</small><h2>'+(txt||'Partie terminée')+'</h2><div style="display:flex;gap:10px;justify-content:flex-end"><button class="bt sec" id="pjfM">Retour aux petits jeux</button><button class="bt" id="pjfR">Rejouer</button></div></div>';document.body.appendChild(d);
 d.querySelector('#pjfM').onclick=()=>d.remove();d.querySelector('#pjfR').onclick=()=>{d.remove();const b=document.querySelector(sel);if(b)b.click()}}}

// ===== La carte du connu : vue de dessus, simple, pour choisir une destination ou voir qui est dehors =====
function ccCoul(t){if(t.bare)return '#4a4038';const a=t.alt||0;if(t.forest)return a>1400?'#4e6b45':a>700?'#3d6a38':'#2f5d2c';if(/savane|herb/i.test(t.biome||''))return '#a59a52';if(/plage|sable/i.test(t.biome||''))return '#d8c890';if(a>2000)return '#8d8578';if(a>1200)return '#8a8a62';return '#7f8c4c'}
function carteConnu(o){o=o||{};const old=$('ccBox');if(old)old.remove();if(!S)return;const vus=T.filter(t=>(S.t[t.i]||{}).s);if(!vus.length)return;
 const box=document.createElement('div');box.id='ccBox';box.style.cssText='position:fixed;inset:0;z-index:85;background:rgba(10,8,6,.78);display:flex;align-items:center;justify-content:center';
 box.innerHTML='<div class="pjb" style="max-width:min(900px,96vw);width:96vw;max-height:94vh;overflow:auto"><small>'+(o.mode==='dest'?'Où va le groupe ?':'Ce que l’on connaît de l’île')+'</small><h2 style="margin:2px 0 6px">'+(o.titre||'La carte du connu')+'</h2><p class="note" id="ccI">'+(o.aide||'')+'</p><canvas id="ccC" style="width:100%;touch-action:none;cursor:pointer;border-radius:6px;background:#1d2a33"></canvas><div id="ccL" style="font-size:13px;margin-top:6px"></div><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px"><button class="bt sec" id="ccX">'+(o.mode==='dest'?'Annuler':'Fermer')+'</button></div></div>';document.body.appendChild(box);
 const cv=$('ccC'),W=Math.min(860,innerWidth*.9),x0=Math.min(...vus.map(t=>t.x))-2,x1=Math.max(...vus.map(t=>t.x))+2,z0=Math.min(...vus.map(t=>t.z))-2,z1=Math.max(...vus.map(t=>t.z))+2,k=Math.min(W/(x1-x0),(innerHeight*.62)/(z1-z0)),H=(z1-z0)*k;
 const dpr=devicePixelRatio||1;cv.width=(x1-x0)*k*dpr;cv.height=H*dpr;cv.style.width=(x1-x0)*k+'px';cv.style.height=H+'px';const c=cv.getContext('2d');c.scale(dpr,dpr);
 const P=t=>[(t.x-x0)*k,(t.z-z0)*k],R=k*.95,hex=(x,y,r)=>{c.beginPath();for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3;c.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r)}c.closePath()};
 const home=o.c!=null?T[o.c]:null,pm=o.pm||0;
 const dess=sur=>{c.clearRect(0,0,cv.width,cv.height);vus.forEach(t=>{const [x,y]=P(t);hex(x,y,R*.6);c.fillStyle=ccCoul(t);c.fill();if(home){const d=hd(home,t);if(d>pm||t.bare){c.fillStyle='rgba(0,0,0,.45)';c.fill()}}if(sur===t){c.lineWidth=2.5;c.strokeStyle='#ffd36a';c.stroke()}});
  // les camps, les groupes dehors, ce qu'ils font
  camps().forEach(t=>{const [x,y]=P(t);c.font='bold '+Math.max(12,R*.9)+'px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillStyle='#fff';c.fillText('⌂',x,y)});
  (S.grp||[]).forEach(g=>{const t=T[g.pos];if(!t||!(S.t[t.i]||{}).s)return;const [x,y]=P(t);c.beginPath();c.arc(x,y,Math.max(4,R*.32),0,6.283);c.fillStyle='#'+(g.col||0xe8be5a).toString(16).padStart(6,'0');c.fill();c.lineWidth=1.5;c.strokeStyle='#111';c.stroke()});
  (exps||[]).forEach(e=>{if(!e.t)return;const [x,y]=P(e.t);c.beginPath();c.arc(x,y,Math.max(4,R*.3),0,6.283);c.fillStyle='#4fc3b4';c.fill()})};
 dess(null);
 const L=[];(S.grp||[]).forEach(g=>{if(g.exp)L.push('<span style="display:inline-block;width:10px;height:10px;border-radius:5px;background:#'+(g.col||0xe8be5a).toString(16).padStart(6,'0')+'"></span> '+(typeof expDit==='function'?expDit(g):g.n))});$('ccL').innerHTML=L.join('<br>')||(o.mode==='dest'?'':'<small>Personne n’est dehors.</small>');
 const tuile=e=>{const r=cv.getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top;let best=null,bd=1e9;vus.forEach(t=>{const [x,y]=P(t),d=Math.hypot(x-mx,y-my);if(d<bd){bd=d;best=t}});return bd<R?best:null};
 let sur=null;cv.onpointermove=e=>{const t=tuile(e);if(t!==sur){sur=t;dess(t);if(t)$('ccI').textContent=(lieuDe(t)||lieuProche(t)||t.biome)+' · '+t.biome+' · '+Math.round(t.alt)+' m'+(home?' · à '+hd(home,t)+' case'+(hd(home,t)>1?'s':''):'')}};
 cv.onclick=e=>{const t=tuile(e);if(!t)return;if(o.pick){if(o.pick(t)!==false)box.remove()}};
 $('ccX').onclick=()=>{box.remove();if(o.annule)o.annule()}}
// la préparation de sortie ouvre cette carte pour la destination (la carte 3D restait bloquée)
{const ep=expPlan;expPlan=function(c,pre){ep(c,pre);const b=$('expOk');if(!b)return;const o=b.onclick;b.onclick=()=>{o();const q=window.choixExp;if(!q)return;const pm=expPortee(q.prov,q.ids.length);
 carteConnu({mode:'dest',c:q.c,pm,titre:'Choisir la destination',aide:'Touchez une case connue, à '+pm+' cases au plus du camp (les cases sombres sont trop loin).',pick:t=>{choisirTuile(t);return !window.choixExp},annule:()=>{window.choixExp=null;panneau()}})}}}

// ===== Les paroles : une phrase commencée va à son terme avant la suivante =====
setInterval(()=>{if(typeof CV==='undefined'||!CV.A)return;const now=performance.now();for(const id in CV.A){const a=CV.A[id];if(!a.say)continue;
 if(a._sk&&a.say!==a._sk&&a._fin&&now<a._fin&&+id!==CV.selP){a.say=a._sk;a.sayT=Math.round((a._fin-now)/16.7);continue}
 if(a.say!==a._sk){a._sk=a.say;const mots=a.say.split(/\s+/).length,dur=Math.max(3500,1400+mots*420);a._fin=now+dur;a.sayT=Math.max(a.sayT,Math.round(dur/16.7))}}},100);

// ===== Le feu : une vraie flamme, au cœur du camp marron ; d'autres foyers quand le camp grandit ; à l'habitation, près des cases des esclaves, éteint sous la pluie =====
function flTex(){if(flTex.t)return flTex.t;const c=document.createElement('canvas');c.width=64;c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(32,96,2,32,80,60);g.addColorStop(0,'rgba(255,250,210,1)');g.addColorStop(.25,'rgba(255,200,80,.95)');g.addColorStop(.55,'rgba(240,110,30,.65)');g.addColorStop(1,'rgba(160,40,10,0)');
 x.fillStyle=g;x.beginPath();x.moveTo(32,4);x.bezierCurveTo(52,40,62,80,46,118);x.lineTo(18,118);x.bezierCurveTo(2,80,12,40,32,4);x.fill();return flTex.t=new THREE.CanvasTexture(c)}
function flFoyer(x,z,s){const G=new THREE.Group();G.position.set(x,0,z);G.scale.setScalar(s);const M=new THREE.MeshLambertMaterial({color:new THREE.Color(0x4a3220).convertSRGBToLinear()});
 for(let k=0;k<5;k++){const b=new THREE.Mesh(new THREE.CylinderGeometry(.06,.07,.9,6),M);b.rotation.z=Math.PI/2;b.rotation.y=k/5*Math.PI;b.position.y=.08;G.add(b)}
 const P=[];for(let k=0;k<4;k++){const m=new THREE.Mesh(new THREE.PlaneGeometry(.55,1.1),new THREE.MeshBasicMaterial({map:flTex(),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));m.position.y=.55;m.rotation.y=k*Math.PI/4;m.userData.ph=k*1.7;G.add(m);P.push(m)}
 const n=18,g=new THREE.BufferGeometry(),pos=new Float32Array(n*3);for(let i=0;i<n;i++){pos[i*3]=(Math.random()-.5)*.3;pos[i*3+1]=Math.random()*1.6;pos[i*3+2]=(Math.random()-.5)*.3}g.setAttribute('position',new THREE.BufferAttribute(pos,3));
 const E=new THREE.Points(g,new THREE.PointsMaterial({color:0xffb050,size:.07,transparent:true,opacity:.9,depthWrite:false,blending:THREE.AdditiveBlending}));G.add(E);G.userData={P,E};return G}
const FL={G:null,cle:''};
function flMaj(){if(!P3.S||!P3.flamme)return;const {L}=cvLieux(),C=S.voieC,n=gensCamp?gensCamp().length:0,pl=typeof pluie==='function'&&pluie();
 const cle=CV.camp+'|'+(C?1:0)+'|'+(n>30?2:n>15?1:0)+'|'+(pl?1:0)+'|'+P3.flamme.uuid;if(cle===FL.cle)return;FL.cle=cle;if(FL.G)P3.S.remove(FL.G);FL.G=new THREE.Group();P3.S.add(FL.G);P3.flamme.visible=false;
 const F=[];if(!(C&&pl)){const [x,z]=p3W(...L.feu);F.push([x,z,C?.8:1.1])}
 // au camp marron, des foyers plus petits devant les cases quand le camp grandit
 if(!C&&n>15){const cs=L.cases||[];[1,Math.floor(cs.length/2)+1].slice(0,n>30?2:1).forEach(i=>{const c=cs[i%Math.max(1,cs.length)];if(c){const [x,z]=p3W(c[0],c[1]+.06);F.push([x,z,.55])}})}
 F.forEach(([x,z,s])=>FL.G.add(flFoyer(x,z,s)));P3.feuL.intensity*=F.length?1:0}
function flAnim(){if(!FL.G)return;const now=performance.now()/1000,ar=!!window.PAUSEJ;FL.G.children.forEach(G=>{const {P,E}=G.userData;P.forEach(m=>{const s=ar?1:1+Math.sin(now*9+m.userData.ph)*.12+Math.sin(now*23+m.userData.ph)*.06;m.scale.set(1+(s-1)*.6,s,1);m.lookAt?0:0});
 if(!ar){const a=E.geometry.attributes.position;for(let i=0;i<a.count;i++){let y=a.getY(i)+.012;if(y>1.6)y=0;a.setY(i,y);a.setX(i,a.getX(i)*.995+(Math.random()-.5)*.004)}a.needsUpdate=true}})}
{const pb=p3Boucle;p3Boucle=function(){const r=pb();try{if(P3.on&&CV.on&&S&&!modeHist()){flMaj();flAnim()}}catch(e){console.warn('feu',e.message)}return r}}

// ===== Le cyclone sur la carte : une masse de nuages en spirale autour d'un œil, plus grande que l'île, qui tourne et s'approche =====
function cycTex(couche){const N=512,c=document.createElement('canvas');c.width=c.height=N;const x=c.getContext('2d');x.translate(N/2,N/2);let s=couche*977+13;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};
 const oeil=N*.045;for(let i=0;i<(couche?900:1700);i++){const bras=Math.floor(r()*4),t=r(),rad=oeil+Math.pow(t,1.15)*N*.47,ang=bras*Math.PI/2+Math.log(rad/oeil)*2.1+(r()-.5)*.55,px=Math.cos(ang)*rad,py=Math.sin(ang)*rad,taille=(8+r()*26)*(1-t*.45),al=(couche?.18:.28)*(1-t*.75);
  const g=x.createRadialGradient(px,py,0,px,py,taille);g.addColorStop(0,'rgba(245,248,250,'+al+')');g.addColorStop(1,'rgba(235,240,245,0)');x.fillStyle=g;x.beginPath();x.arc(px,py,taille,0,6.283);x.fill()}
 // le mur de l'œil, dense, puis l'œil clair
 for(let i=0;i<220;i++){const a=r()*6.283,rad=oeil*(1.2+r()*1.3),px=Math.cos(a)*rad,py=Math.sin(a)*rad,t=10+r()*16,g=x.createRadialGradient(px,py,0,px,py,t);g.addColorStop(0,'rgba(255,255,255,.45)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.beginPath();x.arc(px,py,t,0,6.283);x.fill()}
 x.globalCompositeOperation='destination-out';const g=x.createRadialGradient(0,0,0,0,0,oeil*1.1);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.beginPath();x.arc(0,0,oeil*1.1,0,6.283);x.fill();return new THREE.CanvasTexture(c)}
let CYC2=null;
function cycPrep(){if(CYC2||typeof swirl==='undefined'||!swirl)return;swirl.geometry.dispose();swirl.geometry=new THREE.PlaneGeometry(110,110);swirl.material.map=cycTex(0);swirl.material.opacity=.92;swirl.material.needsUpdate=true;
 CYC2=new THREE.Mesh(new THREE.PlaneGeometry(130,130),new THREE.MeshBasicMaterial({map:cycTex(1),transparent:true,depthWrite:false,opacity:.7}));CYC2.position.z=.6;swirl.add(CYC2);swirl.renderOrder=5}
{const l0=loop;loop=function(){l0();try{cycPrep();if(S&&swirl&&swirl.visible){const k=performance.now()/1000,f=(S.cyc&&S.cyc.f)||1,inn=S.cyc.in;
 // il vient du nord-est ; un cyclone fort passe sur l'île, un faible la frôle
 const prog=Math.max(0,Math.min(1,(2.6-inn)/2.6)),cx=32,cz=28,dx=f>=2?0:26;swirl.position.set(cx+dx+70*(1-prog),6,cz-dx*.4-40*(1-prog));swirl.rotation.z=k*.35;if(CYC2)CYC2.rotation.z=-k*.12;swirl.material.opacity=.55+.4*prog}}catch(e){}}}
