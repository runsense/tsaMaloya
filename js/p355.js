// ===== p355 : à la chasse, « Quitter » se voit comme ailleurs : le même bouton rouge qu'en incarnation, en bas à droite,
// avec « Échap » écrit dessus. Échap libère d'abord la souris (le navigateur l'impose), le message le dit ; un second Échap quitte. =====
{const o=ouvrirFPS;ouvrirFPS=function(){const r=o.apply(this,arguments);try{let essais=0;const go=()=>{const el=document.getElementById('fps');if(!el){if(++essais<60)setTimeout(go,150);return}if(el.querySelector('#fpsQ'))return;
 const old=el.querySelector('#fpsb [data-k="quit"]');if(old)old.style.display='none';
 const q=document.createElement('button');q.id='fpsQ';q.className='bt';q.innerHTML='Quitter <span style="opacity:.8;font-weight:600;font-size:11px;margin-left:4px">Échap</span>';
 q.style.cssText='position:absolute;right:12px;bottom:58px;z-index:20;background:#b02a1e;color:#fff;border:1px solid #ff8a7a;font:700 13px Montserrat,system-ui;padding:8px 14px;border-radius:999px;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.4)';
 q.onclick=e=>{e.stopPropagation();try{if(document.pointerLockElement)document.exitPointerLock()}catch(x){}fpsQuitter()};el.appendChild(q);
 const ai=document.createElement('div');ai.id='fpsEsc';ai.style.cssText='position:absolute;left:50%;top:14px;transform:translateX(-50%);z-index:19;background:rgba(20,14,8,.72);color:#f3ead2;font:600 12px Montserrat,system-ui;padding:6px 12px;border-radius:8px;pointer-events:none;transition:opacity .4s';
 ai.textContent='Clic : viser à la souris · Échap : libérer la souris · Échap encore : quitter la chasse';el.appendChild(ai);setTimeout(()=>{ai.style.opacity='.0'},7000);
 const pl=()=>{if(!document.getElementById('fps')){document.removeEventListener('pointerlockchange',pl);return}if(!document.pointerLockElement){ai.textContent='Souris libérée — Échap encore, ou le bouton rouge, pour quitter la chasse';ai.style.opacity='1';clearTimeout(ai.t);ai.t=setTimeout(()=>{ai.style.opacity='0'},5000)}};
 document.addEventListener('pointerlockchange',pl)};setTimeout(go,50)}catch(e){}return r}}
