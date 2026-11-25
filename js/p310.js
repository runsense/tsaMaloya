// ===== p310 : les récits mènent au jeu, ils y fondent — comme dans les grands jeux, pas d'écran qui se ferme sur un autre =====
// 1. Les petits jeux : le récit s'ouvre sur le monde flouté, avec une pensée en exergue ; à « Commencer », le jeu naît dessous,
//    le texte s'efface puis le flou se dissout (1,8 s) : on passe du récit au geste sans coupure.
// 2. Les sorties de la Vie : quand un groupe part, son chemin se trace sur la vraie carte, du camp à sa destination,
//    un point lumineux le parcourt, une phrase l'accompagne, puis tout se fond dans la carte où le groupe avance.
{const st=document.createElement('style');st.textContent=
 '#pjIntro.pj310{background:radial-gradient(ellipse at 50% 40%,rgba(20,16,10,.35),rgba(8,6,4,.82));backdrop-filter:blur(10px) saturate(.8);-webkit-backdrop-filter:blur(10px) saturate(.8);transition:backdrop-filter 1.8s ease,-webkit-backdrop-filter 1.8s ease,background 1.8s ease}'+
 '#pjIntro.pj310 .pjb{animation:pj310in 1.3s cubic-bezier(.2,.7,.2,1) both;transition:opacity .7s ease,transform .9s ease}'+
 '#pjIntro.pj310 .ex310{font:italic 17px/1.45 Georgia,serif;color:#e8d6a8;opacity:.92;margin:-2px 0 12px;padding-left:12px;border-left:2px solid #b8893a}'+
 '#pjIntro.pj310.fond{background:rgba(0,0,0,0)!important;backdrop-filter:blur(0) saturate(1);-webkit-backdrop-filter:blur(0) saturate(1);pointer-events:none}'+
 '#pjIntro.pj310.fond .pjb{opacity:0;transform:translateY(-18px) scale(.97)}'+
 '@keyframes pj310in{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}'+
 '#dep310{position:fixed;inset:0;z-index:58;pointer-events:none;transition:opacity 1.4s ease}'+
 '#dep310 p{position:absolute;left:50%;top:18%;transform:translateX(-50%);margin:0;font:italic 20px/1.4 Georgia,serif;color:#f4e6c0;text-shadow:0 2px 12px rgba(0,0,0,.8);max-width:80vw;text-align:center;opacity:0;transition:opacity 1s ease}';
 document.head.appendChild(st)}
const EX310=[[/duel|combat|chasseur/i,'Le corps se souvient de ce que la tête a oublié.'],[/commando|embuscade|défendre|camp/i,'Le sentier appartient à qui le connaît la nuit.'],[/échec|grand port|madras/i,'Chaque pierre posée raconte la suivante.'],
 [/bataille|guerre|vichy|anglais|corsaire/i,'On ne gagne pas une terre : on apprend à y rester.'],[/espion|géole|plan/i,'Voir sans être vu, c’est déjà être libre.'],[/labyrinthe|souterrain|sous /i,'Sous l’île, l’eau a creusé ce que les hommes ont fui.'],
 [/songe|rêve|curé|gramoun/i,'Le rêve est un chemin que les ancêtres ont laissé ouvert.'],[/course|rallye|hauts/i,'On ne monte pas vers les Hauts : on les laisse vous prendre.']];
function ex310(o){const s=(o.sur||'')+' '+(o.t||'');const e=EX310.find(([r])=>r.test(s));return e?e[1]:'On ne joue pas un rôle : on devient ce qu’on traverse.'}
{const ij=introJeu;introJeu=function(o,go){const r=ij.apply(this,arguments);try{const d=document.getElementById('pjIntro');if(!d)return r;d.classList.add('pj310');
 const h=d.querySelector('.pjb h2');if(h){const q=document.createElement('div');q.className='ex310';q.textContent=ex310(o);h.after(q)}
 const b=d.querySelector('#pjGo');if(b)b.onclick=()=>{// le jeu naît sous le récit, puis le récit fond
  d.style.zIndex='400';try{go(true)}catch(e){console.warn(e)}requestAnimationFrame(()=>d.classList.add('fond'));setTimeout(()=>{if(d.isConnected)d.remove()},1900)}}catch(e){}return r}}
// ----- 2. le départ d'un groupe se voit sur la carte -----
const DEP310={raf:0};
function dep310(home,cap,but,nom){try{if(typeof T==='undefined'||!T[home]||!T[cap]||typeof cam==='undefined')return;cancelAnimationFrame(DEP310.raf);let el=document.getElementById('dep310');if(el)el.remove();
 el=document.createElement('div');el.id='dep310';el.innerHTML='<canvas></canvas><p></p>';document.body.appendChild(el);const c=el.querySelector('canvas'),p=el.querySelector('p');
 const verbe={chasse:'chasser',cueil:'cueillir',peche:'pêcher',explorer:'voir ce qu’il y a plus loin',camp:'chercher où vivre'}[but]||'marcher';
 const ph=['Le chemin se fait en marchant.','Ce qu’on cherche dehors, on le rapporte au camp.','La forêt ne donne qu’à ceux qui la connaissent.'][(home+cap)%3];
 p.innerHTML=(nom||'Ils')+' partent '+verbe+'.<br><span style="font-size:15px;opacity:.85">'+ph+'</span>';setTimeout(()=>p.style.opacity='1',250);
 const A=T[home],B=T[cap],N=40,P=[];for(let i=0;i<=N;i++){const u=i/N,x=A.x+(B.x-A.x)*u,z=A.z+(B.z-A.z)*u;P.push(new THREE.Vector3(x,Math.max(0,alt(x,z))*VX+.05+Math.sin(u*Math.PI)*.15,z))}
 const t0=performance.now(),D=4200,v=new THREE.Vector3();
 const pas=()=>{const W=innerWidth,H=innerHeight;if(c.width!==W)c.width=W;if(c.height!==H)c.height=H;const x=c.getContext('2d');x.clearRect(0,0,W,H);const k=Math.min(1,(performance.now()-t0)/D),tr=Math.min(1,k/.55);
  const S2=P.map(q=>{v.copy(q).project(cam);return [(v.x*.5+.5)*W,(-v.y*.5+.5)*H,v.z<1]});const n=Math.max(1,Math.round(tr*N));
  x.lineCap='round';x.setLineDash([7,7]);x.lineDashOffset=-performance.now()/40;x.strokeStyle='rgba(232,190,90,.95)';x.lineWidth=3;x.shadowColor='rgba(0,0,0,.6)';x.shadowBlur=6;x.beginPath();for(let i=0;i<=n;i++){const s=S2[i];if(!s[2])continue;i?x.lineTo(s[0],s[1]):x.moveTo(s[0],s[1])}x.stroke();x.setLineDash([]);
  const s=S2[n];if(s&&s[2]){const g=x.createRadialGradient(s[0],s[1],0,s[0],s[1],16);g.addColorStop(0,'rgba(255,236,170,1)');g.addColorStop(1,'rgba(255,200,90,0)');x.fillStyle=g;x.beginPath();x.arc(s[0],s[1],16,0,7);x.fill()}
  const e=S2[N];if(e&&e[2]&&tr>=1){x.strokeStyle='rgba(79,195,180,'+(.6+.4*Math.sin(performance.now()/200))+')';x.lineWidth=2.5;x.beginPath();x.arc(e[0],e[1],12,0,7);x.stroke()}
  if(k>=.78&&el.style.opacity!=='0')el.style.opacity='0';if(k<1)DEP310.raf=requestAnimationFrame(pas);else setTimeout(()=>el.remove(),1500)};pas()}catch(e){}}
{const ef=expFonde;expFonde=function(q,t){const r=ef.apply(this,arguments);try{const g=S.grp[S.grp.length-1];dep310(q.c,t.i,q.but,g&&g.n)}catch(e){}return r}}
