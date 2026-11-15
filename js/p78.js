// ===== p78 : Vie — on voit les groupes partir, la caméra les suit ; le départ marron montre le camp ; « Incarner le chef » bien visible =====
// 1) Un groupe dehors marche d'une case à l'autre au fil de la journée (et non plus d'un bond par jour) ; « Voir » fait suivre le groupe par la caméra.
const SUIVI={g:-1,jusque:0};
function grpXZ(g){const t=T[g.pos];if(!t)return null;const e=g.exp;if(!e||(e.etat!=='aller'&&e.etat!=='retour'))return {x:t.x,z:t.z,ang:0,mv:false};
 const cib=T[e.etat==='aller'?e.cap:e.home];if(!cib||cib===t)return {x:t.x,z:t.z,ang:0,mv:false};const P=hexPath(t,cib),n=P[1]||cib;
 const f=(((S.chrono||0)/DUREE())*6)%1;return {x:t.x+(n.x-t.x)*f,z:t.z+(n.z-t.z)*f,ang:Math.atan2(n.x-t.x,n.z-t.z),mv:true}}
{const b0=bat;bat=function(k){b0.apply(this,arguments);try{if(!S||modeHist()||typeof grpOn!=='function'||!grpOn())return;
 (S.grp||[]).forEach((g,gi)=>{if(!g.exp)return;const q=grpXZ(g);if(!q||!q.mv)return;grpMembres(g).slice(0,3).forEach((p,j)=>{const a=q.ang+Math.PI+(j-1)*.5,d=j?.14:0,x=q.x+Math.sin(a)*d,z=q.z+Math.cos(a)*d;mfPoser('g'+gi+'_'+j,mfModeleDe(p),x,Math.max(0,alt(x,z))*VX+.02,z,q.ang,'marche')})});
 if(SUIVI.g>=0&&performance.now()<SUIVI.jusque){const g=(S.grp||[])[SUIVI.g];const q=g&&grpXZ(g);if(q){camT.x+=(q.x-camT.x)*.08;camT.z+=(q.z-camT.z)*.08;camT.y+=(alt(q.x,q.z)*VX-camT.y)*.08}}}catch(e){}}}
// « Voir » : la caméra va au groupe et le suit 12 secondes
document.addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('[data-gv]');if(!b||!S)return;setTimeout(()=>{try{const gi=+b.dataset.gv,g=S.grp[gi],q=g&&grpXZ(g);if(!q)return;SUIVI.g=gi;SUIVI.jusque=performance.now()+12000;dist=Math.min(dist,9);toast(g.n+' : la caméra le suit.')}catch(err){}},50)},true);
// 2) au départ d'une partie marron en Vie, après le navire, la caméra monte au camp (et non sur les maisons des colons)
{let cine0=false,fait=false;setInterval(()=>{try{if(!S||modeHist()||S.voieC){cine0=typeof CINE!=='undefined'&&!!CINE;return}const c=typeof CINE!=='undefined'&&!!CINE;
 if(cine0&&!c&&!fait&&(S.jourN||0)<3){fait=true;const t=camps()[0];if(t)setTimeout(()=>conteVoir(t,8),300)}
 const gj=$('guideJ');if(!c&&gj&&!gj.hidden&&/Voici votre camp/.test(gj.textContent)&&camps()[0]){const t=camps()[0];if(Math.hypot(camT.x-t.x,camT.z-t.z)>3&&!fait){fait=true;conteVoir(t,8)}}
 cine0=c}catch(e){}},500)}
// 3) « Incarner le chef » aussi dans le panneau de droite, sous « Préparer une sortie »
{const pn=panneau;panneau=function(){pn.apply(this,arguments);try{if(!S||modeHist()||window.choixExp||typeof vpOuvrir!=='function')return;const sd=$('side');if(!sd||sd.querySelector('.vpSide'))return;const ref=[...sd.querySelectorAll('button')].find(b=>/Préparer une sortie/.test(b.textContent));
 const b=document.createElement('button');b.className='bt vpSide';b.style.marginTop='6px';b.textContent='🧍 Incarner le chef';b.title='Prendre le chef en main et partir avec son groupe, en vue personnage';b.onclick=()=>vpOuvrir();(ref||sd.lastElementChild||sd).insertAdjacentElement('afterend',b)}catch(e){}}}
// 4) la petite carte du camp (en bas à gauche) n'apparaît qu'une fois les animations d'ouverture finies
setInterval(()=>{try{const b=$('cvBtn');if(!b)return;const cine=typeof CINE!=='undefined'&&!!CINE,mod=$('modal')&&!$('modal').hidden&&S&&(S.jourN||0)<1;const cacher=!!S&&!modeHist()&&(cine||mod);if(cacher){if(b.style.visibility!=='hidden')b.style.visibility='hidden'}else if(b.style.visibility==='hidden')b.style.visibility=''}catch(e){}},250);
// 5) une animation se regarde comme un film : rien d'autre à l'écran que le film, « Passer », et les questions auxquelles répondre
{const st=document.createElement('style');st.textContent='body.film #top,body.film #fc,body.film #side,body.film #drawer,body.film #bas,body.film #tabs,body.film #cvBtn,body.film #guideJ,body.film #labels,body.film #zoomv,body.film #undo,body.film #back,body.film #kQuiB,body.film #rumB,body.film #infoJ,body.film #toast,body.film .lb,body.film #expP,body.film #ccBox{display:none!important}body.film #c{pointer-events:none!important}body.film #cine{z-index:9000}';document.head.appendChild(st)}
setInterval(()=>{try{const f=typeof CINE!=='undefined'&&!!CINE;if(f!==document.body.classList.contains('film'))document.body.classList.toggle('film',f)}catch(e){}},120);
addEventListener('keydown',e=>{try{if(document.body.classList.contains('film')&&!(e.target&&e.target.closest&&e.target.closest('#modal'))){if(e.key==='Escape'||e.key===' '){e.preventDefault();cineFin()}else e.stopPropagation()}}catch(err){}},true);
addEventListener('wheel',e=>{if(document.body.classList.contains('film'))e.stopPropagation()},{capture:true,passive:true});
