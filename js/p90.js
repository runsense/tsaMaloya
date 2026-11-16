// ===== p90 : Vie — les vrais premiers acteurs ; le passage des jours qu'on voit ; en personnage, le temps passe et les gens bougent =====

// ----- 1. Les vrais premiers acteurs (début en 1663) -----
// Fin 1663, Louis Payen et Pierre Pau débarquent à Saint-Paul avec dix Malgaches, dont trois femmes. Peu après, les Malgaches les quittent
// et montent dans les Hauts : ce sont les premiers marrons connus. Leurs noms ne nous sont pas parvenus ; le jeu leur en donne de malgaches.
{const fi=famillesInit;famillesInit=function(){const r=fi.apply(this,arguments);try{if(!S||modeHist()||S.year>1665)return r;
 const mk=(o,g,age,st,n,fa)=>{const p=nouvellePersonne({or:o,g,age,st,fa});if(n)p.n=n;p.hist=1;return p};S.pp=[];S.famN=3;const MG=[];
 const pris=new Set(),nm=g=>{const L=NOMS.mg[g].filter(x=>!pris.has(x)&&!/Anchaing|Héva|Cimendef|Dimitile|Mafate/.test(x));const x=L[Math.floor(rnd()*L.length)]||NOMS.mg[g][0];pris.add(x);return x};
 for(let i=0;i<10;i++){const g=i<7?'h':'f';MG.push(mk('mg',g,18+Math.floor(rnd()*20),S.voieC?'engagé':'marron',nm(g),i<7?1+(i%2):1+((i-7)%2)))}
 if(S.voieC){S.pp.push(mk('eu','h',34,'libre','Louis Payen',3),mk('eu','h',29,'libre','Pierre Pau',3))}S.pp.push(...MG);S.gens=S.pp.length;
 S.hist90=1}catch(e){console.warn(e)}return r}}
setInterval(()=>{try{if(!S||!S.hist90||S.hist90===2||modeHist())return;S.hist90=2;journal(S.voieC?'Fin 1663 : Louis Payen et Pierre Pau débarquent à Saint-Paul avec dix Malgaches, dont trois femmes. Ce sont les premiers habitants connus de l’île.':'1663 : dix Malgaches, dont trois femmes, arrivés avec deux Français, les quittent et montent dans les Hauts. Ce sont les premiers marrons connus de l’île. Leurs noms ne nous sont pas parvenus : le jeu leur en donne.')}catch(e){}},2000);

// ----- 2. Le passage des jours : l'heure du jour en haut, et chaque nouveau jour s'annonce -----
const MOM90=t=>t<.08?['🌅','l’aube']:t<.3?['🌤️','le matin']:t<.5?['☀️','midi']:t<.7?['🌤️','l’après-midi']:t<.85?['🌇','le soir']:['🌙','la nuit'];
const TOD90=()=>{try{return(((S.chrono||0)/DUREE())*6)%1}catch(e){return .3}};
{const st=document.createElement('style');st.textContent='#jour90{position:fixed;left:50%;top:6px;transform:translateX(-50%);z-index:9700;background:#000b;color:#f4ead6;border:1px solid #e8be5a66;border-radius:999px;padding:3px 12px;font:600 12px Montserrat,system-ui,sans-serif;display:flex;gap:8px;align-items:center;pointer-events:none}#jour90 .b{width:90px;height:5px;background:#333;border-radius:3px;overflow:hidden;position:relative}#jour90 .b i{position:absolute;top:0;bottom:0;left:0;background:linear-gradient(90deg,#3a4a8a,#e8be5a 30%,#ffe9a0 50%,#e8a050 75%,#2a2a5a)}#vp ~ #jour90,body.vp90 #jour90{top:52px}'+
 '#aube90{position:fixed;inset:0;z-index:9690;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:0;transition:opacity .8s;font:700 34px Alegreya,Georgia,serif;color:#fff3d0;text-shadow:0 2px 12px #000;background:radial-gradient(ellipse at center,rgba(255,200,120,.25),rgba(0,0,0,0) 60%)}';document.head.appendChild(st)}
{let j0=null;setInterval(()=>{try{let d=$('jour90');const ok=S&&!S.fin&&!modeHist()&&grpOn()&&!($('kons')&&!$('kons').hidden)&&!document.body.classList.contains('film')&&!document.querySelector('#bt,#m2,#cons87,#hb');if(!ok){if(d)d.remove();return}
 if(!d){d=document.createElement('div');d.id='jour90';document.body.appendChild(d)}const t=TOD90(),m=MOM90(t),n=(S.jourN||0)+1,h='<span>'+m[0]+' Jour '+n+' · '+m[1]+'</span><span class="b"><i style="width:'+(t*100).toFixed(0)+'%"></i></span><small>'+S.year+'</small>';if(d._h!==h){d.innerHTML=h;d._h=h}
 document.body.classList.toggle('vp90',!!VP);
 if(j0!=null&&(S.jourN||0)!==j0){let a=$('aube90');if(!a){a=document.createElement('div');a.id='aube90';document.body.appendChild(a)}a.textContent='🌅 Jour '+n;a.style.opacity=1;setTimeout(()=>{a.style.opacity=0},1700)}j0=S.jourN||0}catch(e){}},300)}

// ----- 3. En personnage : le temps passe (un jour ≈ deux minutes), la lumière suit l'heure, les gens vivent leur journée -----
const JOURVP=120000;
{const vb=vpBoucle;let last=performance.now();vpBoucle=function(){const now=performance.now(),dt=Math.min(.1,(now-last)/1000);last=now;vb.apply(this,arguments);try{const V=VP;if(!V||!V.p84||V.en2D||V.dort)return;
 if(!(V.fight&&!V.fight.fin))S.chrono=Math.min(DUREE()-1,(S.chrono||0)+dt*1000*(DUREE()/6)/JOURVP);
 const t=TOD90();
 // la lumière : nuit sombre et bleutée, jour clair, soir doré
 if(!V.L90){V.L90=[];V.sc.traverse(o=>{if(o.isLight&&!o.isPointLight)V.L90.push([o,o.intensity])});V.fog90=V.sc.fog?V.sc.fog.color.clone():null;V.bg90=V.sc.background&&V.sc.background.isColor?V.sc.background.clone():null}
 const f=t<.08?.45+t/.08*.5:t<.75?1:t<.85?1-(t-.75)/.1*.45:.38;V.L90.forEach(([o,i])=>o.intensity=i*f);
 const nuit=new THREE.Color(0x1a2240),soir=new THREE.Color(0xd08a50);const mix=(c0)=>{const c=c0.clone();if(f<.6)c.lerp(nuit,(.6-f)/.6*.85);else if(t>.7&&t<.85)c.lerp(soir,.25);return c};
 if(V.fog90&&V.sc.fog)V.sc.fog.color.copy(mix(V.fog90));if(V.bg90)V.sc.background.copy(mix(V.bg90));
 // la journée des gens du camp
 const sch=t<.06?'aube':t<.7?'travail':t<.85?'soir':'nuit';(V.vil||[]).forEach((o,k)=>{if(!o.poste0)o.poste0=o.poste;if(o.ordre)return;o.sched=sch;
  if(sch==='nuit'){const a=(o.p.id||k)*2.3;o.poste={x:Math.cos(a)*6.5,z:-30+Math.sin(a)*4.5}}
  else if(sch==='soir'||sch==='aube'){const a=k/Math.max(1,V.vil.length)*6.28;o.poste={x:Math.cos(a)*3.2,z:-30+Math.sin(a)*3.2}}
  else{o.trip=o.trip||{ou:null,t:10+Math.random()*25};o.trip.t-=dt;if(o.trip.t<=0){if(o.trip.ou)o.trip={ou:null,t:20+Math.random()*30};else{const L=[{x:2,z:-27},{x:-15,z:-24},{x:0,z:-17},{x:15,z:-40},{x:-6,z:-36}],c=L[Math.floor(Math.random()*L.length)];o.trip={ou:{x:c.x+(Math.random()-.5)*2,z:c.z+(Math.random()-.5)*2},t:8+Math.random()*6}}}o.poste=o.trip.ou||o.poste0}
  // une fois arrivés : dormir la nuit, s'asseoir au feu le soir
  if(o.root&&o.mx&&Math.hypot(o.poste.x-o.x,o.poste.z-o.z)<.6&&(sch==='nuit'||sch==='soir')){const g=sch==='nuit'?'dormir':'assis';if(o.clip!==g){const a=(o.anim||[]).find(x=>x.name===g);if(a){o.mx.stopAllAction();o.mx.clipAction(a).play();o.clip=g}}}});
 // les compagnons : à la nuit tombée, le groupe se rapproche du chef
 if(sch==='nuit'&&!V.nuitDit){V.nuitDit=1;vpMsg('La nuit tombe : '+(VPLIEU&&VPLIEU.g?'le groupe se serre autour du feu de bivouac.':'chacun rentre dans sa case.'))}if(sch!=='nuit')V.nuitDit=0}catch(e){}}}
// p87 choisit le geste selon la tâche : la nuit et le soir, on laisse dormir et s'asseoir
{const vl=vpVilBoucle;vpVilBoucle=function(dt){const sv=(VP&&VP.vil||[]).map(o=>[o,o.clip]);vl.apply(this,arguments);try{sv.forEach(([o,c])=>{if((o.sched==='nuit'&&c==='dormir'||o.sched==='soir'&&c==='assis')&&o.clip!==c&&o.mx&&Math.hypot(o.poste.x-o.x,o.poste.z-o.z)<.6){const a=(o.anim||[]).find(x=>x.name===c);if(a){o.mx.stopAllAction();o.mx.clipAction(a).play();o.clip=c}}})}catch(e){}}}
