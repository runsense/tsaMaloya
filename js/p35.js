// ===== p35 : la vraie pause — tout s'arrête (gens, bêtes, feu), et l'écran passe un peu au gris =====
// Vraie pause : le bouton pause, ou un événement à l'écran (mode Jeu) ; la Construction à l'arrêt. Le survol de la souris, lui, ne grise rien.
function pauseVraie(){if(typeof S==='undefined'||!S||S.fin)return false;if(typeof VP!=='undefined'&&VP)return false;const k=$('kons');if(k&&!k.hidden)return typeof KV!=='undefined'&&!KV.vit;if(modeHist())return false;return !!((typeof chronoP!=='undefined'&&chronoP)||(S.evq&&S.evq.length)||($('modal')&&!$('modal').hidden))}
{const u=THREE.AnimationMixer.prototype.update;THREE.AnimationMixer.prototype.update=function(dt){if(window.PAUSEJ&&!(typeof VP!=='undefined'&&VP)&&!window.ANIM_LIBRE)return this;return u.call(this,dt)}}
{const st=document.createElement('style');st.textContent='canvas{transition:filter .5s}body.pauseJ canvas:not(#fpsc){filter:grayscale(.6) brightness(.9)}body.pauseJ #chronoB{outline:2px solid #e8be5a}';document.head.appendChild(st)}
setInterval(()=>{const p=pauseVraie();window.PAUSEJ=p;document.body.classList.toggle('pauseJ',p)},150);
// dans le camp, personne ne bouge pendant la pause
{const pb=p3Boucle;p3Boucle=function(){if(!window.PAUSEJ)return pb.apply(this,arguments);const sv={};for(const id in CV.A)sv[id]=[CV.A[id].x,CV.A[id].y,CV.A[id].t,CV.A[id].sayT];const r=pb.apply(this,arguments);for(const id in sv)if(CV.A[id]){const a=CV.A[id];[a.x,a.y,a.t,a.sayT]=sv[id]}return r}}
