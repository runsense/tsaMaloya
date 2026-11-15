// ===== p68 : un décès arrête le temps — une lettre s'affiche 4 secondes (un clic la ferme), puis le jeu reprend ; elle reste dans le journal =====
// Histoire, Vie et Survie ; pas pendant les petits jeux stratégiques.
const LETT={q:[],on:false};
function lettrePause(){const k=$('kons');if(k&&!k.hidden&&typeof KV!=='undefined'){const v=KV.vit;KV.vit=0;return()=>{if(!KV.vit)KV.vit=v}}
 if(typeof S!=='undefined'&&S){if(modeHist()){const a=S.autoD;S.autoD=0;return()=>{if(!S.autoD)S.autoD=a}}const c=typeof chronoP!=='undefined'?chronoP:0;chronoP=1;return()=>{chronoP=c}}return()=>{}}
function lettreSuivante(){if(LETT.on||!LETT.q.length||window.BTUON)return;LETT.on=true;const [titre,txt,dem]=LETT.q.shift(),reprendre=lettrePause();
 if(typeof S!=='undefined'&&S){(S.lettres=S.lettres||[]).unshift({an:S.year,t:titre,x:txt,dem:!!dem});if(S.lettres.length>60)S.lettres.pop()}
 const d=document.createElement('div');d.id='lettreD';d.innerHTML='<div class="lt"><canvas width="150" height="150"></canvas><div><small>Une nouvelle</small><h3>'+titre+'</h3><p>'+txt+'</p><i>Touchez pour continuer</i></div></div>';document.body.appendChild(d);lettreScene(d.querySelector('canvas'),!!dem);
 let fini=false;const ferme=()=>{if(fini)return;fini=true;d.classList.add('out');setTimeout(()=>{d.remove();reprendre();LETT.on=false;setTimeout(lettreSuivante,400)},350)};d.onclick=ferme;setTimeout(ferme,4000)}
function lettreDeces(titre,txt,dem){LETT.q.push([titre,txt,dem]);lettreSuivante()}
// la petite scène : un ange ramène au ciel ; un démon emporte sous terre (le chasseur de marrons, le marron voleur)
function lettreScene(cv,dem){const x=cv.getContext('2d'),t0=performance.now();const f=()=>{if(!cv.isConnected)return;const u=Math.min(1,(performance.now()-t0)/3600),W=150,H=150;x.clearRect(0,0,W,H);
 if(!dem){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3a5a7a');g.addColorStop(1,'#1a2430');x.fillStyle=g;x.fillRect(0,0,W,H);const l=x.createRadialGradient(75,10,2,75,10,90);l.addColorStop(0,'rgba(255,240,200,'+(.7*u)+')');l.addColorStop(1,'rgba(255,240,200,0)');x.fillStyle=l;x.fillRect(0,0,W,H);
  const y=120-u*95,a=1-Math.max(0,u-.8)*5;x.globalAlpha=Math.max(0,a);x.fillStyle='#f6f0e2';[-1,1].forEach(s=>{x.beginPath();x.ellipse(75+s*16,y-4,16,6,s*.5+Math.sin(performance.now()/160)*.3*s,0,7);x.fill()});
  x.beginPath();x.arc(75,y-18,5,0,7);x.fill();x.beginPath();x.moveTo(67,y-11);x.lineTo(83,y-11);x.lineTo(86,y+12);x.lineTo(64,y+12);x.closePath();x.fill();x.fillStyle='#e8d8a0';x.beginPath();x.arc(75,y+24,4,0,7);x.fill();x.globalAlpha=1}
 else{x.fillStyle='#14100c';x.fillRect(0,0,W,H);const l=x.createRadialGradient(75,H,4,75,H,80);l.addColorStop(0,'rgba(220,70,20,'+(.75*u)+')');l.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=l;x.fillRect(0,0,W,H);
  const y=40+u*100,a=1-Math.max(0,u-.8)*5;x.globalAlpha=Math.max(0,a);x.fillStyle='#000';x.beginPath();x.arc(75,y-16,7,0,7);x.fill();x.beginPath();x.moveTo(69,y-21);x.lineTo(66,y-32);x.lineTo(73,y-23);x.moveTo(81,y-21);x.lineTo(84,y-32);x.lineTo(77,y-23);x.fill();
  x.beginPath();x.moveTo(66,y-8);x.lineTo(84,y-8);x.lineTo(89,y+16);x.lineTo(61,y+16);x.closePath();x.fill();x.fillStyle='#e8503a';x.fillRect(71,y-18,2,2);x.fillRect(77,y-18,2,2);x.globalAlpha=1}
 requestAnimationFrame(f)};f()}
const lettreDemon=p=>!!p&&((typeof S!=='undefined'&&S&&S.voieC&&p.role==='cha')||!!p.vol||!!p.voleur);
{const st=document.createElement('style');st.textContent='#lettreD{position:fixed;inset:0;z-index:9500;display:flex;align-items:center;justify-content:center;background:rgba(10,8,6,.35);cursor:pointer;animation:ltIn .35s ease-out}#lettreD.out{opacity:0;transition:opacity .35s}'+
 '#lettreD .lt{display:flex;gap:14px;align-items:center;max-width:520px;width:calc(100% - 40px);background:#efe4c8;color:#2a2016;border-radius:4px;padding:18px 22px;box-shadow:0 12px 40px rgba(0,0,0,.55);font-family:Alegreya,Georgia,serif;transform:rotate(-1deg)}#lettreD small{letter-spacing:.1em;text-transform:uppercase;color:#7a5a3a;font:600 11px Montserrat,sans-serif}#lettreD h3{margin:4px 0 8px;font-size:22px}#lettreD p{margin:0 0 8px;font-size:16px;line-height:1.4}#lettreD i{font-size:12px;color:#7a6a5a}@keyframes ltIn{from{opacity:0}}#lettreD canvas{flex:none;border-radius:3px}';document.head.appendChild(st)}
// Histoire et Vie : les morts nommées
{const mp=mourirP;mourirP=function(p,cause){const r=mp.apply(this,arguments);try{if(p)lettreDeces(p.n.split(' ')[0]+' est mort'+(p.g==='f'?'e':''),p.n+(typeof ageP==='function'?', '+ageP(p)+' ans,':'')+' est mort'+(p.g==='f'?'e':'')+' '+(cause||'')+'. '+(S.voieC?'On l’enterre au bout de l’habitation.':'Le camp le veille toute la nuit.'),lettreDemon(p))}catch(e){}return r}}
setInterval(()=>{try{if(typeof S==='undefined'||!S||S.fin)return;const M=S.morts||[];if(LETT.vu==null||LETT.s!==S){LETT.vu=M.length;LETT.s=S;return}if(M.length>LETT.vu){M.slice(LETT.vu).forEach(m=>lettreDeces(m.n+' nous a quittés',m.n+' s’est éteint'+(m.age?' à '+m.age+' ans':'')+'. On se souviendra de son nom.'));LETT.vu=M.length}else if(M.length<LETT.vu)LETT.vu=M.length}catch(e){}},600);
// Survie : les morts de la faim
{const kl=kLog;kLog=function(m){const r=kl.apply(this,arguments);try{if(/meurt|morts?\b/i.test(m)&&/faim|famine|épidémie|cyclone|noy/i.test(m))lettreDeces(K.an+' · un décès',m)}catch(e){}return r}}
// le journal garde les lettres
{const dr=window.drawer;if(typeof dr==='function'){drawer=function(){const r=dr.apply(this,arguments);try{if(typeof onglet!=='undefined'&&/^jou/.test(String(onglet))&&S&&(S.lettres||[]).length){const d=$('drawer');if(d&&!d.querySelector('.lettresD')){const x=document.createElement('div');x.className='lettresD';x.innerHTML='<h4 style="margin:12px 0 4px">Les lettres</h4>'+S.lettres.slice(0,30).map(l=>'<p class="note" style="margin:3px 0">'+(l.dem?'🜏':'✝')+' <b>'+l.t+'</b> · '+l.an+'<br><small>'+l.x+'</small></p>').join('');d.appendChild(x)}}}catch(e){}return r}}}
// « Nouvelle partie » : la Survie se choisit au même endroit que l'Histoire et la Vie
setInterval(()=>{try{const ko=$('kOuv');if(ko&&ko.style.display!=='none')ko.style.display='none';const back=$('retD'),h=$('d-histoire');if(!back||!h||$('d-survie'))return;const b=document.createElement('button');b.className='op dif';b.id='d-survie';
 b.innerHTML='<b>Survie</b><small>L’île vue de haut : vous décidez ce qu’on bâtit et où les gens travaillent, et vous tenez face aux cyclones, aux famines et aux bouleversements. Une année passe en un peu plus de cinq minutes.</small>';
 b.onclick=()=>{const e=$('ecran');if(e)e.hidden=true;kOuvrir()};back.parentElement.insertBefore(b,back)}catch(e){}},300);
{const st=document.createElement('style');st.textContent='#ecran #kOuv{display:none!important}';document.head.appendChild(st)}
