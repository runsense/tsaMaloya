// ===== p67 : ménager la machine — les personnages 3D se préparent un par un, pas tous dans la même image =====
// (chaque personnage pèse environ 3 Mo d'animations ; en créer des dizaines d'un coup sature la mémoire et la carte graphique)
{const pi=p3Instance;const Q=[];let enCours=false;
 const suivant=()=>{if(enCours||!Q.length)return;enCours=true;const [n,ok,ko]=Q.shift();pi(n).then(r=>{ok(r)},e=>{ko(e)}).finally(()=>{setTimeout(()=>{enCours=false;suivant()},90)})};
 p3Instance=function(n){return new Promise((ok,ko)=>{Q.push([n,ok,ko]);suivant()})}}
// ===== la faim se voit : l'affichage des vivres grossit à mesure que la faim monte, puis clignote en rouge toutes les 5 s quand des gens vont mourir =====
function faimNiv(){try{const k=$('kons');if(k&&!k.hidden&&typeof K!=='undefined'&&K){const m=typeof kReserve==='function'?kReserve():99;if(K.res.viv<=0||m<2)return 3;if(m<6)return 2;if(m<12)return 1;return 0}
 if(typeof S==='undefined'||!S||S.fin)return 0;const r=(S.vivres||0)/Math.max(1,S.gens||1);if(r<=.15)return 3;if(r<.5)return 2;if(r<1)return 1;return 0}catch(e){return 0}}
function faimEls(){return [...document.querySelectorAll('#kons header *, #hud *, header *, #top *, .hud *')].filter(e=>e.children.length===0&&/^\s*vivres\s*$/i.test(e.textContent)&&e.offsetParent).map(e=>e.parentElement)}
{const st=document.createElement('style');st.textContent='.faimB{transition:transform .6s;transform-origin:left center;display:inline-block}@keyframes faimR{0%,100%{color:inherit;text-shadow:none}50%{color:#ff5a3a;text-shadow:0 0 8px #ff3a2a}}.faimR{animation:faimR .5s ease-in-out 2}';document.head.appendChild(st)}
setInterval(()=>{const n=faimNiv(),L=faimEls();L.forEach(e=>{e.classList.add('faimB');e.style.transform='scale('+[1,1.12,1.28,1.45][n]+')';e.style.color=n>=2?'#ff9a7a':''})},700);
setInterval(()=>{if(faimNiv()<3)return;faimEls().forEach(e=>{e.classList.remove('faimR');void e.offsetWidth;e.classList.add('faimR')})},5000);
// ===== un décès arrête le jeu : une lettre l'annonce (Histoire, Vie, Survie — pas les petits jeux) =====
const DEUIL={n:null,q:[]};
function deuilLettre(titre,lignes,reprendre){let d=$('deuilL');if(d)d.remove();d=document.createElement('div');d.id='deuilL';
 d.innerHTML='<div class="dlP"><small>'+titre+'</small><h2>Un deuil</h2>'+lignes.map(l=>'<p>'+l+'</p>').join('')+'<div style="text-align:right"><button class="bt" id="deuilOk">Continuer</button></div></div>';document.body.appendChild(d);
 const fin=()=>{d.remove();if(reprendre)reprendre()};$('deuilOk').onclick=fin;d.addEventListener('click',e=>{if(e.target===d)fin()})}
{const st=document.createElement('style');st.textContent='#deuilL{position:fixed;inset:0;z-index:9500;background:rgba(10,8,6,.6);display:flex;align-items:center;justify-content:center}#deuilL .dlP{max-width:460px;width:calc(100% - 32px);background:#efe4c8;color:#2a2016;border-radius:4px;padding:18px 22px;box-shadow:0 12px 40px rgba(0,0,0,.6);font-family:Georgia,serif;border-left:6px solid #2a2016}#deuilL h2{margin:2px 0 8px;font-size:22px}#deuilL small{letter-spacing:.08em;text-transform:uppercase;color:#6a5a40}#deuilL p{margin:6px 0;font-size:16px;line-height:1.4}';document.head.appendChild(st)}
// Histoire et Vie : la liste des morts s'allonge
setInterval(()=>{try{if(typeof S==='undefined'||!S||S.fin||S.bac){DEUIL.vu=null;return}const M=S.morts||[],cle=m=>m.n+'|'+m.a+'|'+m.age;if(!DEUIL.vu||DEUIL.s!==S){DEUIL.s=S;DEUIL.vu=new Set(M.map(cle));return}
 const neufs=M.filter(m=>!DEUIL.vu.has(cle(m)));if(!neufs.length)return;neufs.forEach(m=>DEUIL.vu.add(cle(m)));if(window.BTUON||$('deuilL'))return;
 const L=neufs.map(m=>{const ctx=(S.log||[]).slice(-6).reverse().find(l=>l.m&&m.n&&l.m.includes(m.n.split(' ')[0]));return '<b>'+m.n+'</b>'+(m.age?', '+m.age+' ans':'')+(ctx?' — '+ctx.m:' nous a quittés.')});
 let rep=null;
 deuilLettre(S.voieC?(S.year<1817?'Lettre de l’habitation':'Courrier de l’habitation'):'Message porté au camp',L,rep)}catch(e){}},1000);
// Survie : un journal qui parle de morts arrête le temps
{const kl=kLog;kLog=function(m){const r=kl.apply(this,arguments);try{if(K&&!K.fin&&/\b(\d+ morts|morts?\b|meurent|décès|disette)/i.test(m||'')&&!$('deuilL')){const v=KV.vit;KV.vit=0;deuilLettre('Lettre au '+(K.joueur==='c'?'gouverneur':'chef')+' · '+K.an,[m],()=>{KV.vit=v||1})}}catch(e){}return r}}
