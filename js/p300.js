// ===== p300 : dans les incarnations, le pavé numérique donne les gestes de survie, et 7-8-9 les talents propres au personnage ;
// Alt + 1, 2, 3 : ses pouvoirs mystiques, selon où il en est de son chemin (un au début, deux en chemin, trois au bout).
// 1 boire · 2 manger · 3 se reposer / s'abriter · 4 puiser et garder l'eau · 5 faire du feu, cuire · 6 ramasser du bois · 0 jeter un bois.
// Une barre de boutons en bas (cliquables, pour le doigt) rappelle tout. =====
const TAL300={
 anchaing:[['peche','Pêcher les camarons'],['tangue','Prendre un marcassin'],['grimpe','Grimper sans peine (10 s)']],
 simang:[['sagaie','Lancer la sagaie'],['peche','Pêcher les camarons'],['guet','Guetter les chasseurs']],
 laverdure:[['sagaie','Lancer la sagaie'],['peche','Pêcher les camarons'],['ralli','Rallier les siens']],
 dimitile:[['guet','Guetter les chasseurs'],['peche','Pêcher les camarons'],['piege','Poser un piège']],
 mafate:[['plantes','Cueillir des plantes'],['soin','Soigner'],['peche','Pêcher les camarons']],
 cimendef:[['sagaie','Lancer la sagaie'],['grimpe','Grimper sans peine (10 s)'],['peche','Pêcher les camarons']],
 baal:[['sagaie','Lancer la sagaie'],['ralli','Rallier les siens'],['peche','Pêcher les camarons']],
 fatie:[['course','La course des crêtes (12 s)'],['guet','Guetter les chasseurs'],['peche','Pêcher les camarons']]};
const MYS300=[['brume','Brume des ancêtres : les chasseurs ne vous voient plus (8 s)',40],['souffle','Souffle des razana : un souffle et toute l’endurance',70],['betes','Parole aux bêtes : le gibier ne fuit plus (15 s)',50]];
function niv300(){const I=INC;try{return typeof incNiv287==='function'?incNiv287():0}catch(e){return 0}}
function geste300(n){const I=INC;if(!I||!I.st||I.pause||I.duel)return;const st=I.st,sac=st.sac,h=I.h;const T=k=>inc290Touche(k,{});
 if(n===1){if(eau290(I,h.x,h.z)<1.6||(sac.calebasse&&sac.eau>0)){const de=eau290(I,h.x,h.z);if(de<1.6){st.soif=100;incMsg287('Vous buvez à la rivière.')}else{sac.eau--;st.soif=Math.min(100,st.soif+45);incMsg287('Une gorgée à la calebasse.')}hud290()}else incMsg287('Pas d’eau ici. La rivière longe le chemin ; une calebasse garde l’eau.');return}
 if(n===2){T('m');return}
 if(n===3){I.repos=!I.repos;const abri=I.arb.some(a=>Math.hypot(a.x-h.x,a.z-h.z)<2.2);incMsg287(I.repos?(abri?'Vous vous abritez sous les arbres et reprenez votre souffle.':'Vous vous asseyez pour reprendre votre souffle.'):'Vous repartez.');return}
 if(n===4){if(!sac.calebasse){incMsg287('Il faudrait une calebasse ou un bout de bambou pour garder l’eau.');return}if(eau290(I,h.x,h.z)<1.6){sac.eau=2;incMsg287('La calebasse est pleine.');hud290()}else incMsg287('Approchez-vous de la rivière pour puiser.');return}
 if(n===5){T('f');return}
 if(n===6){const o=pres290(I,h.x,h.z);if(o&&o.k==='bois'){T('e');return}if(o){T('e');return}incMsg287('Pas de bois sec à portée : il traîne au pied des arbres.');return}
 if(n===0){if(sac.bois>0){sac.bois--;incMsg287('Vous laissez un bois pour marcher plus léger.');hud290()}else incMsg287('Vous ne portez pas de bois.');return}}
function talent300(i){const I=INC;if(!I||!I.st||I.pause||I.duel)return;const L=TAL300[typeof cle302==='function'?cle302(I):(/Anchaing/.test(I.C.heros.n)?'anchaing':I.k)]||TAL300.simang,t=L[i];if(!t)return;const st=I.st,sac=st.sac,h=I.h,now=performance.now();
 const T=k=>inc290Touche(k,{});
 switch(t[0]){
  case 'peche':if(eau290(I,h.x,h.z)<1.6){if(st.soif<90)st.soif=89;T('e')}else incMsg287('Les camarons sont sous les galets de la rivière.');break;
  case 'tangue':{const g=I.gib.find(g=>!g.mort&&g.k==='cochon'&&Math.hypot(g.x-h.x,g.z-h.z)<1.6);if(g)T('e');else incMsg287('Aucun marcassin à portée. Les cochons marrons fouillent la terre en forêt.');break}
  case 'sagaie':T('r');break;
  case 'grimpe':I.grimpeFacile=now+10000;incMsg287('Les mains connaissent la roche : vous grimpez sans peine.');break;
  case 'course':I.courseCretes=now+12000;incMsg287('La course des crêtes : vos jambes ne se fatiguent plus.');break;
  case 'guet':I.guet=now+9000;incMsg287('Vous guettez : les chasseurs apparaissent sur la carte.');break;
  case 'ralli':I.endu=Math.min(100,(I.endu||0)+40);(I.cps||[]).forEach(c=>{c.x=h.x-1;c.z=h.z-1});incMsg287('Les vôtres se rassemblent autour de vous. Le courage revient.');break;
  case 'piege':{const g=I.gib.filter(g=>!g.mort&&g.k==='cabri').map(g=>[g,Math.hypot(g.x-h.x,g.z-h.z)]).sort((a,b)=>a[1]-b[1])[0];incMsg287('Vous posez un collet sur une sente de cabris.');setTimeout(()=>{if(INC!==I)return;if(g&&Math.random()<.7){g[0].mort=1;g[0].m.rotation.z=Math.PI/2;sac.viande+=2;incMsg287('Le collet a pris un cabri.');hud290()}else incMsg287('Le collet est resté vide.')},12000);break}
  case 'plantes':if(I.arb.some(a=>Math.hypot(a.x-h.x,a.z-h.z)<3)){sac.plantes=(sac.plantes||0)+1;incMsg287('Des feuilles qui soignent, au pied des arbres.');hud290()}else incMsg287('Les plantes qui soignent poussent sous les arbres.');break;
  case 'soin':if(sac.plantes>0&&I.souffle<3){sac.plantes--;I.souffle++;incHud287();hud290();incMsg287('Une plante pilée : le souffle revient.')}else incMsg287(sac.plantes?'Vous n’êtes pas blessé.':'Il faut d’abord cueillir des plantes (7).');break}}
function mystique300(i){const I=INC;if(!I||I.pause||I.duel)return;const niv=niv300();if(i>niv){incMsg287('Ce pouvoir viendra plus tard sur le chemin ('+['au début : un pouvoir','en chemin : deux','au bout : trois'][niv]+').');return}const m=MYS300[i],now=performance.now();I.cdm=I.cdm||{};
 if((I.cdm[m[0]]||0)>now){incMsg287('Les ancêtres se reposent : encore '+Math.ceil((I.cdm[m[0]]-now)/1000)+' s.');return}I.cdm[m[0]]=now+m[2]*1000;
 if(m[0]==='brume'){I.brume=now+8000;incMsg287('Une brume monte de la terre : les chasseurs ne vous voient plus.')}
 else if(m[0]==='souffle'){I.souffle=Math.min(3,I.souffle+1);I.endu=100;incHud287();incMsg287('Le souffle des razana vous remplit.')}
 else{I.betes=now+15000;incMsg287('Vous parlez aux bêtes : elles ne fuient plus.')}}
// les effets dans la boucle : repos, grimper sans peine, course des crêtes, brume, bêtes calmes, guet
{const b=incBoucle287;incBoucle287=function(){const I=INC,now=performance.now();
 try{if(I&&I.st&&!I.pause){
  if(I.repos){if(I.keys.z||I.keys.s||I.keys.q||I.keys.d||I.keys.w||I.keys.a)I.repos=false;else{I.endu=Math.min(100,(I.endu||0)+.25);I.st.soif+=.004;I.st.faim+=.002}}
  if(I.grimpeFacile>now||I.courseCretes>now)I.endu=Math.max(I.endu||0,60);
  if(I.brume>now)I.CH.forEach(o=>o.al=0);
  if(I.betes>now)I.gib.forEach(g=>g.fuit=0)}}catch(e){}
 const r=b.apply(this,arguments);
 try{if(I&&!I.pause&&I.guet>now&&I.minimap){const m=I.minimap;I.CH.forEach(o=>{if(o.hs)return;const X=I.o0[0]+o.x/I.sc,Z=I.o0[1]+o.z/I.sc;m.g.fillStyle='#ffd040';m.g.fillRect(m.ox+(X-m.ax)*m.k-2,m.oz+(Z-m.az)*m.k-2,4,4)})}}catch(e){}
 return r}}
// les touches : pavé numérique (ou chiffres du haut), Alt + 1/2/3 pour la mystique
addEventListener('keydown',e=>{const I=INC;if(!I||I.duel||I.pause)return;let n=null;const m=(e.code||'').match(/^(Numpad|Digit)(\d)$/);if(m)n=+m[2];if(n==null||e.shiftKey)return;
 if(e.altKey){if(n>=1&&n<=3){e.preventDefault();e.stopPropagation();mystique300(n-1)}return}
 e.preventDefault();if(n>=7&&n<=9)talent300(n-7);else geste300(n)},true);
// la barre de boutons
{const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);try{const I=INC;if(!I)return r;const L=TAL300[typeof cle302==='function'?cle302(I):(/Anchaing/.test(I.C.heros.n)?'anchaing':I.k)]||TAL300.simang,d=document.createElement('div');d.id='incB300';
 d.style.cssText='position:absolute;left:50%;transform:translateX(-50%);bottom:46px;display:flex;flex-wrap:wrap;gap:4px;justify-content:center;max-width:94%;z-index:2';
 const B=[[1,'Boire'],[2,'Manger'],[3,'Repos / abri'],[4,'Puiser l’eau'],[5,'Feu, cuire'],[6,'Ramasser bois'],[0,'Jeter un bois']].map(([n,t])=>['g'+n,n+' '+t]).concat(L.map((t,i)=>['t'+i,(7+i)+' '+t[1]])).concat(MYS300.map((m,i)=>['m'+i,'Alt+'+(i+1)+' '+m[1].split(' :')[0]]));
 d.innerHTML=B.map(([k,t])=>'<button data-b="'+k+'" style="font:12px Georgia,serif;padding:3px 7px;border-radius:6px;border:1px solid #8a7040;background:rgba(30,24,16,.75);color:#f1e6cc;cursor:pointer">'+t+'</button>').join('');I.el.appendChild(d);
 d.querySelectorAll('[data-b]').forEach(x=>x.onclick=ev=>{ev.stopPropagation();const k=x.dataset.b,n=+k.slice(1);if(k[0]==='g')geste300(n);else if(k[0]==='t')talent300(n);else mystique300(n)})}catch(e){}return r}}
