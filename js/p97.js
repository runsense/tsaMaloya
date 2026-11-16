// ===== p97 : une chose à la fois au début ; le camp s'ouvre avec chacun à sa tâche ; plus de carte simplifiée ni de battants ;
// arbres fixes penchés par les alizés ; on marche quand on bouge ; la plage se sélectionne et la côte se travaille ; la vie de la mer =====

// ----- 1. Une chose à la fois : ce qui arrive (lettres, guide) attend que le récit ou le choix en cours soit fini -----
function occupe97(){try{const m=$('modal');return !!((m&&!m.hidden)||CINE||window.choixExp||window.choixLieu||$('dest95')||document.querySelector('#bt,#m2,#cons87,#hb,#ccBox'))}catch(e){return false}}
// la lettre ou la gazette arrive quand le récit en cours est refermé
{const it=interlude;interlude=function(I,done){if(occupe97()||(S&&S.evq&&S.evq.length)){setTimeout(()=>interlude(I,done),700);return}return it.apply(this,arguments)}}
// si un récit arrive pendant une lettre, il attend la fin de la lettre (son minuteur ne tourne pas pendant ce temps)
setInterval(()=>{try{const m=$('modal');if(!m)return;if(CINE&&!m.hidden){m.hidden=true;m.dataset.c97=1}else if(!CINE&&m.dataset.c97){delete m.dataset.c97;m.hidden=false}}catch(e){}},200);
// le guide se tait (et son compte à rebours s'arrête) tant qu'autre chose demande l'attention
{const gt=guideTick;let last=0;guideTick=function(){const now=performance.now();try{if(occupe97()){const b=$('guideJ');if(b)b.style.display='none';if(guideTick.t0&&last)guideTick.t0+=now-last;last=now;return}const b=$('guideJ');if(b)b.style.display='';
  // les étapes qui parlent du camp attendent qu'on l'ait ouvert
  const i=S&&S.guideN||0;if(S&&!CV.on&&i>=1&&i<=3){if(b)b.style.display='none';if(guideTick.t0&&last)guideTick.t0+=now-last;last=now;return}}catch(e){}last=now;const r=gt.apply(this,arguments);guideTick.t0=guideTick.t0;return r}}

// ----- 2. Le camp s'ouvre comme on l'a laissé : chacun est déjà à sa tâche, personne ne sort du centre -----
{const co=cvOuvrir;cvOuvrir=function(ci){const r=co.apply(this,arguments);try{if(CV.on){const {L}=cvLieux(),ph=jourPh(),nuit=ph>.72||ph<.04;cvGens().forEach(p=>{let a=CV.A[p.id];if(!a)a=CV.A[p.id]={x:0,y:0,tx:0,ty:0,act:'',t:0,say:'',sayT:0,vis:1};if(a.p97)return;const [u,v,ac]=cvCible(p,a,L,nuit);a.x=a.tx=u;a.y=a.ty=v;a.act=ac;a.t=300+Math.random()*500;a.p97=1})}}catch(e){}return r}}

// ----- 3. Plus de « carte du connu » simplifiée : on revient à la grande carte, centrée sur les groupes dehors -----
{const cc=carteConnu;carteConnu=function(o){if(o&&o.mode==='dest')return cc.apply(this,arguments);try{if(!S||modeHist())return cc.apply(this,arguments);if(CV.on)cvFermer();
  const G=(S.grp||[]).filter(g=>g.pos!=null);if(G.length){const g=G.find(g=>g.exp)||G[0];S.gSel=S.grp.indexOf(g);choisirTuile(T[g.pos]);try{conteVoir(T[g.pos],14)}catch(e){}toast(G.length>1?G.length+' groupes dehors : touchez-en un sur la carte pour le suivre.':'Le groupe est ici, sur la carte.')}else toast('Personne n’est dehors.');return}catch(e){return cc.apply(this,arguments)}}}
// la petite bande de carrés dans le camp disparaît : un simple bouton à la place
setInterval(()=>{try{const m=$('cvMini');if(m&&!m.dataset.p97){m.dataset.p97=1;m.style.display='none';const b=document.createElement('button');b.className='bt sec';b.id='cvMini97';b.style.marginLeft='8px';b.textContent='🧭 Voir les groupes dehors';b.onclick=()=>carteConnu({});m.parentElement.insertBefore(b,m)}if(!m){const b=$('cvMini97');if(b)b.remove()}}catch(e){}},500);
// les battants de porte en plein écran : retirés (les portes restent dans la vue personnage)
porte95=function(){};

// ----- 4. Les arbres ne tournent plus : chacun a sa pose, penché vers l'ouest par les alizés qui viennent de l'est -----
const QA97=new THREE.Quaternion(),QB97=new THREE.Quaternion(),ZA97=new THREE.Vector3(0,0,1),YA97=new THREE.Vector3(0,1,0);
function q97(p){const h=Math.sin(p.x*12.9898+p.z*78.233)*43758.5453,f=h-Math.floor(h);const vent=p.t&&p.t.alt>1500?.04:p.t&&p.t.x>33?.13:.07;
 QA97.setFromAxisAngle(YA97,f*6.283);QB97.setFromAxisAngle(ZA97,vent*(.6+f*.6));return new THREE.Quaternion().multiplyQuaternions(QB97,QA97)}

// ----- 5. On marche quand on bouge, même quand le jeu est en pause sous la souris -----
{const mp=mfPoser;mfPoser=function(cle,n,x,y,z,ry,clip){try{const f=MF.L[cle];if(f){const v=Math.hypot(x-(f.px97??x),z-(f.pz97??z));f.v97=(f.v97||0)*.7+v*.3;f.px97=x;f.pz97=z;const bouge=f.v97>.0012;
  if(bouge&&!/marche|course/.test(clip||''))clip='marche';if(f.mx)f.mx._libre97=bouge}}catch(e){}return mp.call(this,cle,n,x,y,z,ry,clip)}}

// ----- 6. Les chemins et les routes comptent comme connus -----
connu75=function(i){const o=S.t[i];return !!(o&&(o.s||o.b||o.vo||(S.pas&&S.pas[i]>=2)||(S.trail||[]).includes(i)))};

// ----- 7. La plage se sélectionne : toucher le sable ou l'eau près du bord choisit la case côtière la plus proche -----
let COT97=null;
{const ta=tileAt;tileAt=function(p){const t=ta(p);if(t||!p)return t;if(!COT97)COT97=T.filter(u=>!u.bare&&cotier(u));let b=null,bd=HS*2.3;for(const u of COT97){const d=Math.hypot(u.x-p.x,u.z-p.z);if(d<bd){bd=d;b=u}}return b}}

// ----- 8. Le travail de la côte, grands traits de la vie créole -----
// Récifs coralliens : côte ouest et sud-ouest (Saint-Gilles, Saint-Leu, L'Étang-Salé, Saint-Pierre). Ailleurs, la côte est surtout rocheuse.
const RECIF97=[[55.22,-21.05],[55.27,-21.16],[55.3,-21.24],[55.47,-21.345]];
function recif97(t){return RECIF97.some(([lo,la])=>{const [x,z]=xz(lo,la);return Math.hypot(t.x-x,t.z-z)<HS*2.6})}
function embouchure97(t){return !!t.riv&&cotier(t)}
const COTE97={
 corail:{n:'Ramasser du corail',ic:'🪸',ok:t=>recif97(t),d:'À marée basse, sur le platier : de quoi faire colliers et bracelets, qu’on échange. On ne prend que le corail mort, le récif nourrit le lagon.',fx:{ami:1,coh:1},viv:0,log:'Des colliers de corail passent de main en main : on les échange, on les offre.'},
 lagon:{n:'Pêcher au lagon',ic:'🐟',ok:t=>recif97(t),d:'Petits poissons du lagon et macabits, à la ligne ou à la nasse.',viv:3,mac:1,log:'Le lagon donne : des petits poissons et des macabits.'},
 zourite:{n:'Chercher des zourites',ic:'🐙',ok:t=>cotier(t)&&!embouchure97(t),d:'Le poulpe, sous les pierres du platier ou de la côte rocheuse. On le bat longtemps avant de le cuire en civet.',viv:2,fx:{coh:1},log:'Un civet de zourite ce soir.'},
 langouste:{n:'Pêcher la langouste',ic:'🦞',ok:t=>cotier(t)&&!recif97(t)&&!embouchure97(t),d:'Sur la côte rocheuse battue par la houle, à la main ou au casier. Dangereux quand la mer est grosse.',viv:3,risque:.12,log:'Des langoustes de la côte sauvage.'},
 bichique:{n:'Pêcher les bichiques',ic:'🐟',ok:t=>embouchure97(t),d:'À l’embouchure, à la saison chaude, les bichiques remontent la rivière : on les prend à la vouve, on les mange en cari.',viv:3,log:'L’embouchure a donné : des bichiques pour le cari.'},
 chevaquine:{n:'Pêcher les chevaquines',ic:'🦐',ok:t=>!!t.riv&&!t.bare,get d(){return 'Les petites crevettes vivent tout le long de la rivière. Un cyclone les emporte ; elles reviennent ensuite peu à peu, en remontant le courant depuis l’embouchure.'},viv:3,abond:t=>chev97(t.i),log:'Des chevaquines à faire sécher au soleil.'}};
// les chevaquines : partout le long des rivières ; un cyclone les emporte, puis elles remontent le courant saison après saison
function chev97(i){return S&&S.chev&&S.chev[i]!=null?S.chev[i]:1}
{const cy=cyclone;cyclone=function(){const r=cy.apply(this,arguments);try{S.chev={};T.forEach(t=>{if(t.riv&&!t.bare)S.chev[t.i]=embouchure97(t)?.2:0})}catch(e){}return r}}
{const sa=saison;saison=function(){const r=sa.apply(this,arguments);try{if(S&&S.chev){const N={};let tous=true;for(const k in S.chev){const i=+k,t=T[i];let m=S.chev[i];if(embouchure97(t))m=Math.min(1,m+.3);t.nb.forEach(j=>{if(S.chev[j]!=null&&T[j].alt<t.alt+5)m=Math.max(m,Math.min(1,S.chev[i]+(S.chev[j]-S.chev[i])*.6))});N[i]=m;if(m<.98)tous=false}S.chev=tous?null:N}}catch(e){}return r}}
{const a0=actions;actions=function(t){const A=a0(t);try{if(!S||!t||t.bare||!cotier(t))return A;const o=S.t[t.i]||{};if(!o.s)return A;
  for(const id in COTE97){const c=COTE97[id];if(id!=='chevaquine'&&c.ok(t)&&!A.find(a=>a.id===id))A.push({id,n:c.ic+' '+c.n,c:1,d:c.d})}}catch(e){}return A}}
{const a1=actions;actions=function(t){const A=a1(t);try{if(!S||!t||!t.riv||t.bare||!(S.t[t.i]||{}).s||A.find(a=>a.id==='chevaquine'))return A;const c=COTE97.chevaquine,v=chev97(t.i);A.push({id:'chevaquine',n:c.ic+' '+c.n+(v<.3?' (rares depuis le cyclone)':v<.8?' (elles reviennent)':''),c:1,d:c.d})}catch(e){}return A}}
{const g0=agir;agir=function(t,id,l){const c=COTE97[id];if(!c)return g0.apply(this,arguments);if(!l){if(S.bras<1)return false;snap();S.bras-=1}
  if(c.risque&&Math.random()<c.risque){fx({sante:-3});log('La houle a emporté un panier : un pêcheur est rentré blessé sur les galets.')}else{const ab=c.abond?c.abond(t):1;if(c.viv)S.vivres=(S.vivres||0)+Math.round(c.viv*ab);if(c.fx)fx(c.fx);if(c.mac)S.mac97=(S.mac97||0)+1;log(ab<.3?'Presque rien : le cyclone a emporté les chevaquines, elles ne sont pas encore remontées jusqu’ici.':c.log)}
  try{sauve();panneau();rafraichir()}catch(e){}return true}}
// dans Vie, le même travail existe pour les gens du camp quand le camp est sur la côte
setTimeout(()=>{try{if(typeof TACHES==='undefined')return;if(!TACHES.peche)TACHES.peche=['🐟','Pêcher sur la côte']}catch(e){}},0);

// ----- 9. La vie de la mer, quand on zoome : bancs de petits poissons près du bord, plus gros au large, dauphins qui sautent, marsouins aux embouchures -----
const MER97={on:0,bancs:[],grands:[],sauteurs:[]};
function mer97Init(){if(MER97.on||typeof scene==='undefined'||!scene||!T||!T.length)return;MER97.on=1;
 const cot=T.filter(t=>!t.bare&&cotier(t)),pt=(t,d0,d1)=>{for(let k=0;k<12;k++){const a=Math.random()*6.283,d=d0+Math.random()*(d1-d0),x=t.x+Math.cos(a)*d,z=t.z+Math.sin(a)*d;if(alt(x,z)<-2)return [x,z]}return null};
 const gP=new THREE.ConeGeometry(.012,.05,4).rotateX(Math.PI/2),mP=new THREE.MeshBasicMaterial({color:0x1a3a48,transparent:true,opacity:.55});
 const nB=Math.min(60,cot.length);MER97.petits=new THREE.InstancedMesh(gP,mP,nB*6);MER97.petits.frustumCulled=false;scene.add(MER97.petits);
 for(let k=0;k<nB;k++){const t=cot[Math.floor(Math.random()*cot.length)],p=pt(t,HS*.6,HS*1.3);if(p)MER97.bancs.push({x:p[0],z:p[1],ph:Math.random()*6.28,r:.08+Math.random()*.08})}
 const gG=new THREE.ConeGeometry(.04,.22,5).rotateX(Math.PI/2),mG=new THREE.MeshBasicMaterial({color:0x10283a,transparent:true,opacity:.45});
 MER97.gros=new THREE.InstancedMesh(gG,mG,24);MER97.gros.frustumCulled=false;scene.add(MER97.gros);
 for(let k=0;k<24;k++){const t=cot[Math.floor(Math.random()*cot.length)],p=pt(t,HS*2,HS*3.5);if(p)MER97.grands.push({x:p[0],z:p[1],ph:Math.random()*6.28,r:.4+Math.random()*.5})}
 // dauphins sur les côtes sans récif, marsouins aux embouchures
 const corps=(c,l)=>{const g=new THREE.Group(),m=new THREE.MeshLambertMaterial({color:c});const b=new THREE.Mesh(new THREE.SphereGeometry(.05,8,6).scale(1,1,l),m);g.add(b);const f=new THREE.Mesh(new THREE.ConeGeometry(.025,.05,4),m);f.position.set(0,.045,0);g.add(f);const q=new THREE.Mesh(new THREE.BoxGeometry(.09,.008,.03),m);q.position.set(0,0,-.05*l);g.add(q);g.visible=false;scene.add(g);return g};
 cot.filter(t=>!recif97(t)&&!embouchure97(t)).sort(()=>Math.random()-.5).slice(0,8).forEach(t=>{const p=pt(t,HS*.9,HS*1.8);if(p)MER97.sauteurs.push({x:p[0],z:p[1],g:corps(0x7f8c96,3.2),t:Math.random()*20,att:6+Math.random()*14,dur:1.4,haut:.18})});
 cot.filter(embouchure97).slice(0,6).forEach(t=>{const p=pt(t,HS*.6,HS*1.2);if(p)MER97.sauteurs.push({x:p[0],z:p[1],g:corps(0x4a525a,2.4),t:Math.random()*10,att:4+Math.random()*8,dur:1,haut:.06})})}
{const b0=bat;const Mx=new THREE.Matrix4(),Qx=new THREE.Quaternion(),Vx=new THREE.Vector3(),Sx=new THREE.Vector3(1,1,1),Ex=new THREE.Euler();let tp=performance.now();
 bat=function(kk){b0.apply(this,arguments);try{if(!S)return;mer97Init();if(!MER97.on)return;const now=performance.now(),dt=Math.min(.1,(now-tp)/1000),s=now/1000;tp=now;
  const proche=dist<16,tres=dist<9;MER97.petits.visible=tres;MER97.gros.visible=proche;
  if(tres){let n=0;MER97.bancs.forEach(b=>{for(let j=0;j<6;j++){const a=s*.6+b.ph+j*.35,r=b.r+Math.sin(j*1.7)*.02;Vx.set(b.x+Math.cos(a)*r,-.012,b.z+Math.sin(a)*r);Ex.set(0,-a,0);Qx.setFromEuler(Ex);Mx.compose(Vx,Qx,Sx);MER97.petits.setMatrixAt(n++,Mx)}});MER97.petits.count=n;MER97.petits.instanceMatrix.needsUpdate=true}
  if(proche){let n=0;MER97.grands.forEach(b=>{const a=s*.12+b.ph;Vx.set(b.x+Math.cos(a)*b.r,-.03,b.z+Math.sin(a)*b.r*.7);Ex.set(0,-a,0);Qx.setFromEuler(Ex);Mx.compose(Vx,Qx,Sx);MER97.gros.setMatrixAt(n++,Mx)});MER97.gros.count=n;MER97.gros.instanceMatrix.needsUpdate=true}
  MER97.sauteurs.forEach(d=>{d.t+=dt;const g=d.g;if(!proche||window.PAUSEJ&&false){g.visible=false;return}if(d.t<d.att){g.visible=false;return}const u=(d.t-d.att)/d.dur;if(u>=1){d.t=0;d.att=5+Math.random()*15;d.a=Math.random()*6.283;g.visible=false;return}
   const a=d.a||0,dx=Math.sin(a),dz=Math.cos(a),k=(u-.5)*.5;g.visible=true;g.position.set(d.x+dx*k,Math.sin(u*Math.PI)*d.haut-.02,d.z+dz*k);g.rotation.set(-Math.cos(u*Math.PI)*.9,a,0)})}catch(e){}}}
// en Survie aussi : le guide « Comment jouer » s'efface pendant le premier kabar, le conseil, ou tout autre choix
setInterval(()=>{try{const g=$('kTuto');if(!g)return;const occ=!!($('kReg')||$('kCoB')||document.querySelector('#kons .pjb:not(#kTuto)')&&false||($('modal')&&!$('modal').hidden));g.style.display=occ?'none':''}catch(e){}},300);

// le drapeau de la barre du haut, plus discret : la barre est devenue transparente, il prenait toute la place
{const st=document.createElement('style');st.textContent='#top::before{opacity:.13!important}';document.head.appendChild(st)}

// ----- 10. Survie depuis « Nouvelle partie » : on choisit toujours son camp (colonie ou marronnage), on ne reprend pas l'ancienne partie -----
{const ko=kOuvrir;kOuvrir=function(){if(!window.kNeuf97)return ko.apply(this,arguments);window.kNeuf97=0;K=null;const gi=Storage.prototype.getItem;Storage.prototype.getItem=function(k){return k===KCLE?null:gi.call(this,k)};try{return ko.apply(this,arguments)}finally{Storage.prototype.getItem=gi}}}
setInterval(()=>{try{const b=$('d-survie');if(b&&!b.dataset.p97){b.dataset.p97=1;const o=b.onclick;b.onclick=e=>{window.kNeuf97=1;o&&o(e)}}}catch(e){}},300);

// ----- 11. Les sentiers et les routes : des bandes de terre qui serpentent, plus des traits -----
function ruban97(P,w,hY){const pos=[],idx=[];for(let i=0;i<P.length;i++){const a=P[Math.max(0,i-1)],b=P[Math.min(P.length-1,i+1)],dx=b.x-a.x,dz=b.z-a.z,L=Math.hypot(dx,dz)||1,nx=-dz/L,nz=dx/L,ww=w*(.8+.4*Math.abs(Math.sin(i*1.9)));
  for(const s of [-1,1]){const x=P[i].x+nx*ww/2*s,z=P[i].z+nz*ww/2*s;pos.push(x,hY?hY({x,z}):P[i].y,z)}if(i<P.length-1){const k=i*2;idx.push(k,k+1,k+2,k+1,k+3,k+2)}}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();return g}
// les sentiers des marrons sur la grande carte : une trace de terre battue qui serpente d'une case à l'autre
{const b0=bat;let cle='',M97=null;bat=function(kk){b0.apply(this,arguments);try{if(!S||typeof sentier==='undefined'||!sentier)return;sentier.visible=false;const tr=S.trail||[],k=tr.length+':'+tr.slice(-3).join(',');if(k===cle)return;cle=k;
  if(!M97){M97=new THREE.Mesh(new THREE.BufferGeometry(),new THREE.MeshLambertMaterial({color:0x7a6040,transparent:true,opacity:.7,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2}));M97.renderOrder=3;scene.add(M97)}
  const G=[],fait=new Set();tr.forEach(i=>{const u=T[i];T[i].nb.forEach(j=>{const v=T[j],o=S.t[j]||{};if(!(o.ex||tr.includes(j)||o.b))return;const cl=Math.min(i,j)+'-'+Math.max(i,j);if(fait.has(cl))return;fait.add(cl);
   const L=Math.hypot(v.x-u.x,v.z-u.z)||1,ph=(i*13+j*7)%10,P=[];for(let s=0;s<=10;s++){const f=s/10,w=Math.sin(f*Math.PI)*(Math.sin(f*6+ph)*.1+Math.sin(f*15+ph)*.03),x=u.x+(v.x-u.x)*f-(v.z-u.z)/L*w,z=u.z+(v.z-u.z)*f+(v.x-u.x)/L*w;P.push({x,y:0,z})}
   G.push(ruban97(P,.06,p=>Math.max(0,alt(p.x,p.z))*VX+.03))})});
  M97.geometry.dispose();M97.geometry=G.length?(THREE.BufferGeometryUtils&&THREE.BufferGeometryUtils.mergeBufferGeometries?THREE.BufferGeometryUtils.mergeBufferGeometries(G):fusion97(G)):new THREE.BufferGeometry()}catch(e){}}}
function fusion97(G){const pos=[],idx=[];let o=0;G.forEach(g=>{const p=g.attributes.position.array;for(let k=0;k<p.length;k++)pos.push(p[k]);const I=g.index.array;for(let k=0;k<I.length;k++)idx.push(I[k]+o);o+=p.length/3;g.dispose()});const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();return g}

// la cuisine : avec les macabits rapportés du lagon, on prépare une sauce macabit au camp
{const a2=actions;actions=function(t){const A=a2(t);try{const o=S&&S.t[t.i]||{};if(S&&o.b==='camp'&&(S.mac97||0)>0&&!A.find(a=>a.id==='sauceMac'))A.push({id:'sauceMac',n:'🍲 Préparer une sauce macabit',c:1,d:'Avec les macabits rapportés du lagon ('+S.mac97+' pêche'+(S.mac97>1?'s':'')+'), on prépare une sauce macabit pour tout le camp.'})}catch(e){}return A}}
{const g1=agir;agir=function(t,id,l){if(id!=='sauceMac')return g1.apply(this,arguments);if(!(S.mac97>0))return false;if(!l){if(S.bras<1)return false;snap();S.bras-=1}S.mac97--;S.vivres=(S.vivres||0)+2;fx({coh:2});log('Ce soir, sauce macabit : tout le camp mange ensemble.');try{sauve();panneau();rafraichir()}catch(e){}return true}}

// ----- 12. Un personnage en route se désigne à la souris : on passe dessus, il s'éclaire et dit ce qu'il fait ; un clic le choisit -----
{const tip=()=>{let d=$('tip97');if(!d){d=document.createElement('div');d.id='tip97';d.style.cssText='position:fixed;z-index:9600;pointer-events:none;background:#1a140ce6;color:#f4ead6;border:1px solid #e8be5a;border-radius:8px;padding:4px 9px;font:600 12px Montserrat,system-ui,sans-serif;display:none;max-width:260px';document.body.appendChild(d)}return d};
 const VV=new THREE.Vector3();let vise=null;
 const qui=(cle)=>{const m=/^g(\d+)_/.exec(cle);if(m&&S.grp&&S.grp[+m[1]]){const g=S.grp[+m[1]],e=g.exp;const noms=(g.m||[]).map(id=>{const p=typeof ppId==='function'&&ppId(id);return p?p.n.split(' ')[0]:''}).filter(Boolean).join(', ');return {g:+m[1],txt:'<b>'+(g.n||'Groupe')+'</b>'+(noms?' · '+noms:'')+'<br><small>'+(e?(e.etat||'en route')+(e.but?' · '+e.but:''):'sur la carte')+'</small>'}}
  if(/^hv/.test(cle))return {g:null,txt:'<b>Des envoyés en route</b><br><small>ils marchent case après case vers leur lieu</small>'};return null};
 addEventListener('pointermove',e=>{try{if(!S||e.target.id!=='c'||VP||typeof MF==='undefined'){if(vise){vise=null;tip().style.display='none'}return}const r=e.target.getBoundingClientRect();let best=null,bd=22;
  for(const k in MF.L){const f=MF.L[k];if(!f.o||!f.o.visible||!/^(g\d+_|hv)/.test(k))continue;VV.copy(f.o.position);VV.y+=.12;VV.project(cam);if(VV.z>1)continue;const sx=r.left+(VV.x+1)/2*r.width,sy=r.top+(1-VV.y)/2*r.height,d=Math.hypot(sx-e.clientX,sy-e.clientY);if(d<bd){bd=d;best=k}}
  const d=tip();if(!best){if(vise){vise=null;d.style.display='none';e.target.style.cursor=''}return}const q=qui(best);if(!q){d.style.display='none';return}vise=q;d.innerHTML=q.txt;d.style.left=(e.clientX+14)+'px';d.style.top=(e.clientY+12)+'px';d.style.display='block';e.target.style.cursor='pointer'}catch(_){}},true);
 addEventListener('click',e=>{try{if(!vise||e.target.id!=='c'||vise.g==null)return;const g=S.grp[vise.g];if(!g||g.pos==null)return;e.stopImmediatePropagation();e.preventDefault();S.gSel=vise.g;choisirTuile(T[g.pos]);tip().style.display='none'}catch(_){}},true)}

// ----- 13. Dans un lieu (double clic) : la mer a ses profondeurs, la côte son sable, et autour d'une habitation on voit ce qui est planté -----
function culture97(y){return y<1715?['le maïs',[.55,.6,.22],[.42,.5,.2]]:y<1815?['le café',[.16,.36,.16],[.24,.42,.2]]:['la canne',[.42,.6,.24],[.5,.66,.3]]}
function col97(q,x,z,a,d,t,n,pe){const o=S&&S.t[t.i]||{};
 if(a<=0){const pr=Math.min(1,-a/60),w=bruit(x*1.7,z*1.7);q.setRGB(.13+(1-pr)*.25,.5-pr*.25+w*.04,.55-pr*.2+w*.03);if(recif97&&recif97(t)&&a>-12&&w>.55)q.setRGB(.55,.62,.5);return}
 if(a<10&&pe<120)q.lerp(new THREE.Color(.78,.7,.5),Math.min(1,(10-a)/8)*.8);
 if(!(o.c||o.clr))return;const cour=d<.75+bruit(x*3,z*3)*.3;if(cour){q.lerp(new THREE.Color(.58,.48,.34),.8);return}if(a<6||pe>200)return;
 // les parcelles : chacune a son orientation, ses rangs, des haies entre elles ; on garde des bouquets d'arbres
 const px=Math.floor((x+bruit(x*.9,z*.9)*.5)*1.6),pz=Math.floor((z+bruit(z*.9,x*.9)*.5)*1.6),h=Math.abs(Math.sin(px*12.9+pz*78.2)*43758.5)%1;if(h<.15)return;const an=h*3.14,row=((x*Math.cos(an)+z*Math.sin(an))*9)%1,pl=row>.3&&row<.75;
 const [,c1,c2]=culture97(S.year),F=new THREE.Color(.42,.3,.2);if(pl)F.setRGB(...(h>.55?c1:c2));const fx=(x+bruit(x*.9,z*.9)*.5)*1.6%1,fz=(z+bruit(z*.9,x*.9)*.5)*1.6%1;const haie=Math.min(fx,fz,1-fx,1-fz)<.06;if(haie)F.setRGB(.16,.28,.12);
 const bf=Math.max(0,Math.min(1,(3.1-d)/.6));q.lerp(F,.85*bf)}

// ----- 14. Survie marron : la cueillette et la chasse rapportent vraiment, et on le voit -----
// Une personne qui cueille nourrit à peu près une personne et demie ; elle rapporte aussi des plantes (remèdes, mystique).
// Les chasseurs rapportent plus, mais en bas, près des terres colonisées, ils peuvent croiser les chasseurs de marrons.
KRN.pl='plantes';
prod89=function(i,act,n){const t=T[i],lo=kLoin(t),k=act==='cueil'?'c':'g',ab=AB89(k,i),v=MODE89(i)==='vider'?2:1;return n*(act==='cueil'?1.3:1.5)*lo*(ab/100)*v};
{const kr=kRapport;kRapport=function(i,k){if((k==='cueil'||k==='chasse')&&K&&K.joueur==='m'){const n=((K.trav||{})[i]||{})[k]||0,R={viv:prod89(i,k,n)};if(k==='cueil')R.pl=n*.4*kLoin(T[i]);const ab=AB89(k==='cueil'?'c':'g',i);
  return {R,plein:(k==='cueil'?'cueillette ':'gibier ')+Math.round(ab)+' %'+(k==='chasse'&&risque97(i)>0?' · risque de croiser les chasseurs de marrons':'')}}return kr.apply(this,arguments)}}
function risque97(i){const t=T[i];if(!t)return 0;return t.alt<500?.25:t.alt<900?.12:t.alt<1400?.05:0}
{const ka=kAnnee;kAnnee=function(){if(!K||K.fin||K.joueur!=='m')return ka.apply(this,arguments);let pl=0,perte=0;
  Object.entries(K.trav||{}).forEach(([i,a])=>{if(a.cueil)pl+=a.cueil*.4*kLoin(T[i]);if(a.chasse&&Math.random()<risque97(+i)){perte+=prod89(+i,'chasse',a.chasse);K.tension=(K.tension||0)+4;kLog('Les chasseurs de marrons ont croisé nos chasseurs près de '+(lieuDe(T[i])||lieuProche(T[i])||'leurs terres')+' : ils ont dû tout lâcher pour s’enfuir.')}});
  const r=ka.apply(this,arguments);K.res.viv=Math.max(0,(K.res.viv||0)-perte);K.res.pl=Math.round(((K.res.pl||0)+pl)*10)/10;
  // les plantes soignent et apaisent : chaque année on en use un peu
  const u=Math.min(K.res.pl,2);if(u>0){K.res.pl=Math.round((K.res.pl-u)*10)/10;K.tension=Math.max(0,(K.tension||0)-u*1.5)}return r}}
{const ok=KACT.culture.ok;KACT.culture.ok=t=>ok(t)||(!t.bare&&(t.slope||0)<18&&(K.b[t.i]||[]).some(x=>x.k==='habitation'))}
// Survie colon : au départ, Saint-Paul a déjà ses champs autour de l'habitation (les gens libérés de la maison y travaillent)
setInterval(()=>{try{if(!K||K.joueur!=='c'||K.p97||K.an>1700)return;K.p97=1;const i=Object.keys(K.b||{}).find(i=>(K.b[i]||[]).some(x=>x.k==='habitation'&&x.f==='c'));if(i==null)return;const t=T[i];if(!KACT.culture.ok(t))return;const a=K.trav[i]=K.trav[i]||{};const l=kLibres();if(!a.culture&&l>0)a.culture=Math.min(4,l);try{kRendu()}catch(_){}}catch(e){}},1000);

// ----- 15. Les grands sentiers de l'île : les GR d'aujourd'hui reprennent souvent les passages d'antan (refaits après chaque intempérie) -----
// Tracés approchés, de point de passage en point de passage (à affiner sur la carte de l'ONF).
const GR97=[
 {n:'GR R2 · La Diagonale',d:'De Saint-Denis à Saint-Philippe par les sommets et les cirques, environ 143 km.',p:[[55.45,-20.885],[55.445,-20.93],[55.437,-20.97],[55.43,-21.0],[55.435,-21.045],[55.415,-21.075],[55.43,-21.1],[55.445,-21.11],[55.47,-21.13],[55.49,-21.11],[55.53,-21.15],[55.57,-21.2],[55.64,-21.21],[55.69,-21.225],[55.7,-21.29],[55.72,-21.36]]},
 {n:'GR R1 · Tour du Piton des Neiges',d:'Cilaos, Mafate et Salazie autour du Piton des Neiges, environ 56 km.',p:[[55.47,-21.135],[55.445,-21.11],[55.43,-21.1],[55.455,-21.085],[55.47,-21.07],[55.5,-21.06],[55.52,-21.065],[55.5,-21.09],[55.485,-21.105],[55.47,-21.135]]},
 {n:'GR R3 · Boucle de Mafate',d:'La boucle à l’intérieur du cirque de Mafate, environ 40 km.',p:[[55.455,-21.085],[55.43,-21.1],[55.405,-21.09],[55.39,-21.07],[55.4,-21.05],[55.42,-21.04],[55.435,-21.045],[55.445,-21.065],[55.455,-21.085]]}];
const GRT97={};
function gr97Init(){if(GR97.pts)return;GR97.forEach(g=>{const C=new THREE.CatmullRomCurve3(g.p.map(([lo,la])=>{const [x,z]=xz(lo,la);return new THREE.Vector3(x,0,z)}));const L=C.getLength();g.pts=C.getSpacedPoints(Math.max(20,Math.round(L/.12)));g.pts.forEach(v=>{const t=tileAt({x:v.x,z:v.z});v.ti=t?t.i:null;if(t)(GRT97[t.i]=GRT97[t.i]||new Set()).add(g.n)})});GR97.pts=1}
{const b0=bat;let cle='',M=null;bat=function(kk){b0.apply(this,arguments);try{if(!S||typeof scene==='undefined')return;gr97Init();let n=0;for(const i in GRT97)if((S.t[i]||{}).s)n++;const k=n+'|'+(lieu?lieu.i:'');if(k===cle)return;cle=k;
  if(!M){M=new THREE.Mesh(new THREE.BufferGeometry(),new THREE.MeshLambertMaterial({color:0x9a8462,transparent:true,opacity:.75,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2}));M.renderOrder=3;scene.add(M)}
  const G=[];GR97.forEach(g=>{let run=[];const fin=()=>{if(run.length>1)G.push(ruban97(run,.05,p=>Math.max(0,alt(p.x,p.z))*VX+.035));run=[]};g.pts.forEach(v=>{if(v.ti!=null&&(S.t[v.ti]||{}).s)run.push(v);else fin()});fin()});
  M.geometry.dispose();M.geometry=G.length?fusion97(G):new THREE.BufferGeometry();M.visible=!lieu}catch(e){}}}
// ces vieux passages comptent comme des chemins connus, et la bulle de la case les nomme
{const c0=connu75;connu75=function(i){return c0(i)||!!(GRT97[i]&&(S.t[i]||{}).s)}}
{const pa=panneau;panneau=function(){const r=pa.apply(this,arguments);try{if(!sel||!GRT97[sel.i])return r;const p=$('side');if(!p||p.querySelector('.gr97'))return r;const G=GR97.filter(g=>GRT97[sel.i].has(g.n));
  p.insertAdjacentHTML('beforeend','<div class="sub gr97">🥾 '+G.map(g=>'<b>'+g.n+'</b> · '+g.d).join('<br>🥾 ')+'<br><small>Le sentier d’aujourd’hui reprend un passage d’antan. Tracé approché.</small></div>')}catch(e){}return r}}
