
// ===== p132 : l'esprit de la grotte, un vrai personnage =====
// Un homme noir, un peu flou, qui flotte au-dessus du sol et ondule en avançant, tourné dans le sens de sa marche.
// On choisit le camp visé (les cases des colons, ou un camp marron) ; il faut aller en profondeur, rangée après rangée, jusqu'aux dormeurs.
// Quand il agit, on le voit entrer dans la case, puis en ressortir. Plus les années passent, plus les veilleurs sont nombreux et vigilants.
// Chez les colons, une réussite sur cinq les pousse à des bêtises dans leurs champs ; chez les marrons, les dormeurs rêvent, selon la mystique.
let G132=null;
function grotte132(){if(G132)return;const el=document.createElement('div');el.id='g132';el.style.cssText='position:fixed;inset:0;z-index:9600;background:#07090c;display:flex;flex-direction:column;align-items:center;justify-content:safe center;overflow:auto;padding:8px 0;color:#efe9da;font:14px system-ui';
 el.innerHTML='<div style="max-width:560px;text-align:center"><h2 style="font:700 24px Alegreya,Georgia,serif;color:#f0c46a;margin:0 0 8px">L’esprit de la grotte</h2><p>La nuit tombe. L’esprit sort de la grotte et flotte vers les cases. Où va-t-il ?</p><div style="display:flex;gap:10px;justify-content:center;margin-top:12px"><button class="bt" id="g132c">Vers les cases des colons</button><button class="bt" id="g132m">Vers un camp marron</button></div><button class="bt sec" id="g132x" style="margin-top:14px">Laisser l’esprit dormir</button></div>';
 document.body.appendChild(el);G132={el};window.BTUON=1;el.querySelector('#g132x').onclick=()=>{el.remove();G132=null;window.BTUON=0};el.querySelector('#g132c').onclick=()=>grotte132Jeu(el,'col');el.querySelector('#g132m').onclick=()=>grotte132Jeu(el,'mar')}
function grotte132Jeu(el,cible){const ans=Math.max(0,((S&&S.year)||1666)-1666),niv=Math.min(4,Math.floor(ans/50));const W=Math.min(innerWidth,1100),H=Math.max(240,Math.min(innerHeight-190,580));
 el.innerHTML='<div style="max-width:'+W+'px;font-size:13px;margin-bottom:6px"><b style="font:700 18px Alegreya,Georgia,serif;color:#f0c46a">L’esprit de la grotte</b> — '+(cible==='col'?'Les cases des colons, près de Saint-Paul.':'Un camp marron, dans les Hauts.')+' ← → pour avancer, ↑ ↓ pour aller en profondeur. Restez devant une porte (Espace) pour entrer chez un dormeur. Évitez la torche des veilleurs et le flair des chiens.</div><canvas width="'+W+'" height="'+H+'" style="border-radius:6px;max-width:100%"></canvas><div style="margin-top:6px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center;font-size:13px"><span><kbd>←</kbd> <kbd>→</kbd> avancer · <kbd>↑</kbd> <kbd>↓</kbd> profondeur · <kbd>Espace</kbd> entrer chez un dormeur</span><button class="bt sec" id="g132q">Abandonner</button></div>';
 const cv=el.querySelector('canvas'),x=cv.getContext('2d'),LW=2600,sol=H-40,haut=sol-230,K={};const prof=y=>(y-haut)/(sol-haut);// 0 au fond, 1 devant
 const P={x:70,y:sol-30,dir:1,vu:0,dans:null};const nD=cible==='col'?4:5,ob=[];for(let i=0;i<nD;i++)ob.push({x:420+i*(LW-650)/nD+((i*137)%90),y:haut+30+((i*71)%170),ok:0});
 const G=[];for(let i=0;i<1+niv;i++){const a=LW*(.2+i*.18),b=a+LW*.25;G.push({x:a,y:haut+60+((i*97)%150),dir:1,v:50+niv*12,a,b})}const C=[];if(cible==='col')for(let i=0;i<1+Math.floor(niv/2);i++)C.push({x:LW*(.35+i*.3),y:sol-20,eveil:0});
 let fait=0,fini=false,t=0,last=performance.now(),cam=0,tenu=0;
 const kd=e=>{K[e.key]=1;if(/^(Arrow| )/.test(e.key))e.preventDefault();e.stopPropagation()},ku=e=>{K[e.key]=0};addEventListener('keydown',kd,true);addEventListener('keyup',ku,true);
 const fin=ok=>{if(fini)return;fini=true;removeEventListener('keydown',kd,true);removeEventListener('keyup',ku,true);const res=grotte132Effet(cible,ok,fait);const r=document.createElement('div');r.style.cssText='position:fixed;inset:0;z-index:9601;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55)';
  r.innerHTML='<div style="background:#efe4c8;color:#2a2016;border-radius:6px;max-width:520px;padding:18px 22px;font-size:14px;line-height:1.5"><h3 style="font:700 22px Alegreya,Georgia,serif;margin:0 0 8px">'+(ok?'L’esprit est passé':'L’esprit a été vu')+'</h3><p>'+res+'</p><button class="bt">Revenir</button></div>';document.body.appendChild(r);r.querySelector('button').onclick=()=>{r.remove();el.remove();G132=null;window.BTUON=0}};
 el.querySelector('#g132q').onclick=()=>fin(false);
 // le décor change avec les années : forêt dense au début, puis champs et chemins chez les colons
 const arbres=[];for(let i=0;i<LW;i+=55)arbres.push([i+((i*13)%30),haut-10-((i*37)%40),40+(i%3)*14]);
 const loop=()=>{if(fini)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;
  if(P.dans){P.dans.t+=dt;if(P.dans.t>2.2){P.dans=null}}else{
   const vx=(K.ArrowRight||K.d?1:0)-(K.ArrowLeft||K.q||K.a?1:0),vy=(K.ArrowDown||K.s?1:0)-(K.ArrowUp||K.z||K.w?1:0);if(vx)P.dir=vx;P.x=Math.max(20,Math.min(LW-20,P.x+vx*120*dt));P.y=Math.max(haut+10,Math.min(sol-10,P.y+vy*90*dt));
   if(K[' ']){const o=ob.find(o=>!o.ok&&Math.abs(o.x-P.x)<40&&Math.abs(o.y-P.y)<28);if(o){tenu+=dt;if(tenu>1.1){tenu=0;o.ok=1;fait++;P.dans={o,t:0}}}else tenu=0}else tenu=0}
  G.forEach(g=>{g.x+=g.dir*g.v*dt;if(g.x>g.b)g.dir=-1;if(g.x<g.a)g.dir=1;if(P.dans)return;const dx=P.x-g.x,dy=Math.abs(P.y-g.y);if(Math.sign(dx)===g.dir&&Math.abs(dx)<190&&dy<60)P.vu+=dt*(1.25-Math.abs(dx)/190)*(1+niv*.15);else P.vu=Math.max(0,P.vu-dt*.3)});
  C.forEach(c=>{const d=Math.hypot(P.x-c.x,(P.y-c.y)*1.5);if(d<110&&!P.dans)c.eveil+=dt*(1.1+niv*.2);else c.eveil=Math.max(0,c.eveil-dt*.25);if(c.eveil>=1)P.vu=9});
  if(P.vu>=1)return fin(false);if(fait>=nD&&P.x<70)return fin(true);
  cam=Math.max(0,Math.min(LW-W,P.x-W/2));
  // le décor
  ciel311(x,W,H,cam,cible,t,haut);x.save();x.translate(-cam,0);
  arbres311(x,arbres,cible,niv,t,haut,cam,W);
  sol311(x,LW,H,haut,sol,cible,niv,t,cam,W);
  // tout ce qui est sur le sol, trié du fond vers l'avant
  const L=[];ob.forEach(o=>L.push({y:o.y,f:()=>case311(x,o,.55+.45*prof(o.y),cible,t)}));
  G.forEach(g=>L.push({y:g.y,f:()=>garde311(x,g,.55+.45*prof(g.y),cible,t)}));
  C.forEach(c=>L.push({y:c.y,f:()=>chien311(x,c,t)}));
  L.push({y:P.y,f:()=>{let a=.8;if(P.dans){const u=P.dans.t;a=u<.5?1-u*2:u>1.7?(u-1.7)*2:0;const o=P.dans.o;P.x+=(o.x-P.x)*.2;P.y+=(o.y-P.y)*.2}const s=.55+.45*prof(P.y),bob=Math.sin(t*3.2)*4,flot=10+Math.sin(t*1.7)*3;
   x.save();x.globalAlpha=Math.max(0,Math.min(.85,a));try{x.filter='blur(1.4px)'}catch(e){}x.translate(P.x,P.y-flot+bob*.3);x.scale(s*P.dir*1.6,s*1.6);
   // l'ombre au sol, sous lui (il ne touche pas terre)
   x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(0,flot,18,4,0,0,7);x.fill();
   x.fillStyle='#4a2e20';x.beginPath();x.arc(2,-58,8,0,7);x.fill();x.fillRect(-6,-50,15,30);const b=Math.sin(t*4)*.35;x.save();x.translate(4,-46);x.rotate(.5+b);x.fillRect(0,0,4,20);x.restore();x.save();x.translate(-4,-46);x.rotate(-.3-b);x.fillRect(-2,0,4,20);x.restore();
   x.fillStyle='#e8e0cc';x.fillRect(-7,-24,17,8);x.fillStyle='#4a2e20';x.save();x.translate(0,-16);x.rotate(.25+b*.5);x.fillRect(-3,0,5,18);x.restore();x.save();x.translate(5,-16);x.rotate(-.15-b*.5);x.fillRect(-2,0,5,18);x.restore();
   x.fillStyle='rgba(200,216,255,.1)';x.beginPath();x.ellipse(0,-30,22,38,0,0,7);x.fill();x.restore();try{x.filter='none'}catch(e){}
   if(tenu>0){x.strokeStyle='#f0c46a';x.lineWidth=3;x.beginPath();x.arc(P.x,P.y-60,16,-1.57,-1.57+6.28*tenu/1.1);x.stroke()}}});
  L.sort((a,b)=>a.y-b.y).forEach(o=>o.f());x.restore();
  x.fillStyle='#efe9da';x.font='600 13px system-ui';x.fillText('Dormeurs visités : '+fait+' / '+nD+(fait>=nD?' — revenez vers la grotte ←':''),12,22);x.fillText('Vu',12,44);x.fillStyle='#333';x.fillRect(40,34,160,10);const jg=Math.min(1,Math.max(P.vu,...C.map(c=>c.eveil),0));x.fillStyle=jg>.6?'#d0503a':'#e0b04a';x.fillRect(40,34,160*jg,10);
  requestAnimationFrame(loop)};loop()}
function grotte132Effet(cible,ok,fait){try{if(!S)return '';S.done=S.done||{};S.done.grotte1666=1;
 if(!ok)return fait?'Un veilleur a vu une forme flotter près des cases. On parle d’un esprit ; la nuit, on veille plus fort.':'Les veilleurs ont vu l’esprit. Il est rentré dans sa grotte.';
 if(cible==='col'){if(rnd()<.2){S.betise132=(S.ns||0)+1;if(!S.voieC){S.traque=Math.max(0,(S.traque||0)-6);try{journal('Chez les colons, des gens se lèvent la nuit et saccagent leurs propres champs : on parle d’un esprit. La traque se relâche.')}catch(e){}}else{S.vivres=Math.max(0,(S.vivres||0)-4);try{journal('Des gens de l’habitation font des bêtises dans les champs, comme possédés : vivres −4.')}catch(e){}}return 'Au matin, des colons racontent un rêve étrange. Quelques jours plus tard, certains font des bêtises dans leurs champs, comme poussés par quelqu’un.'}
  return 'Au matin, des colons racontent un rêve étrange. Rien d’autre ne se passe… cette fois.'}
 const m=S.myst||0;S.myst=m+2;let r;if(m>=12){S.savoir=(S.savoir||0)+2;r='Les dormeurs ont tous vu la même chose : un chemin dans les remparts et une source cachée. Mystique +2, savoir +2.'}else if(m>=5){S.coh=Math.min(100,(S.coh||0)+3);r='Les dormeurs ont rêvé des anciens : au matin, le camp est plus uni. Mystique +2, cohésion +3.'}else r='Les dormeurs ont fait un rêve confus ; on en parle autour du feu. Mystique +2.';try{journal('L’esprit de la grotte est passé au camp. '+r)}catch(e){}return r}catch(e){return ''}}
// la mission 2D d'avant cède la place à celle-ci
{const mo=m2Ouvrir;m2Ouvrir=function(k){if(k==='grotte')return grotte132();return mo.apply(this,arguments)}}
