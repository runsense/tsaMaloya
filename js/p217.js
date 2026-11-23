// ===== p217 : l'« Annexe » des Fiches de l'île — toutes les musiques que le jeu fait entendre, à écouter hors partie, avec leur source ;
// et quand un navire fait route sur la carte (arrivée d'un convoi, fondation d'un quartier), on entend quelques mesures de l'air de son pavillon. =====
const ANN217=[
 {g:'Chants de marins',L:[
  ['Jean-François de Nantes','Chanson de gaillard d’avant des marins bretons et nantais (XIXᵉ s.). Air traditionnel, partition de chants-populaires-francais.com.',()=>['francais',NANTES213]],
  ['Le trente et un du mois d’août','Chanson de la marine française (combat contre une frégate anglaise). Air traditionnel, notation ABC de folktunefinder.com.',()=>['francais',AOUT213]],
  ['À la claire fontaine','Chanson traditionnelle française, que chantaient aussi les marins.',()=>['francais',CLAIRE213]],
  ['Admiral Benbow','Chanson de marine anglaise, vers 1702. Notation ABC de la collection John Chambers, transcription de Jon Freeman.',()=>['anglais',BENBOW213]],
  ['Spanish Ladies','Chanson de la Royal Navy, XVIIIᵉ siècle. Notation ABC de folkinfo.mainlynorfolk.info.',()=>['anglais',LADIES213]],
  ['Al die willen te kaap’ren varen','Chanson de corsaires hollandais, XVIIᵉ siècle. Partition du recueil de F. van Duyse, Het oude Nederlandsche lied (1903), domaine public.',()=>['hollandais',KAAP213]],
  ['Admiral Benbow, version pirate','Le même air, plus lent, en mineur, sur un tambour sourd : la voile sans pavillon.',()=>['pirate',BENBOW213]]]},
 {g:'Maloya du kabar',L:[
  ['Ouverture','Boucle jouée par Paris dans Kontakt.','intro_jeu'],['Entrée du kabar','Boucle jouée par Paris dans Kontakt.','intro_kabar'],
  ['Kabaré','Rythme du service kabaré.','kabare'],['Kasse','Rythme cassé.','kasse'],['Malbar','Maloya malbar, binaire.','malbar'],['Maligasse','Le rythme venu de Madagascar.','maligasse'],
  ['Moring','Le rythme du combat moring.','moring'],['Pleure','Maloya lent, pour les morts.','pleure'],['Roulé','Le roulèr mène.','roule'],['Valse','Maloya à trois temps.','valse']],
  n:'Rythmes de la librairie « Maloya Roots Percussions » (Wayo Audio), joués et mixés par Paris dans Kontakt. Les sons isolés ne sont pas redistribuables ; ici, des mixages complets.'},
 {g:'Avant 1900',L:[['La phrase du timba','Le timba, lamellophone venu du Mozambique et de Madagascar, disparaît au début du XXᵉ siècle. Reconstitution : aucun enregistrement n’existe.','timba']]}];
const CRED217='Tambours (coups découpés) : « Ceramic Djembe » (RutgerMuller, CC0), tambour sur cadre (Swietliste, CC0), « Untitled African rhythm » (Kevin MacLeod, CC BY 3.0), « Tamate drum-beating at funeral in Bengaluru » (CC BY 3.0), Wikimedia Commons. Kayamb, pikèr, sati, bobre : synthétisés.';
// lecteur de notes, programmé au fil de l'eau pour pouvoir l'arrêter ; lim = nombre de notes (pour un extrait), vol = facteur de volume
function joue217(N,nat,lim,vol,fin){let stop=false;const c=typeof sndPret==='function'&&sndPret();if(!c||typeof violon205!=='function')return{stop(){}};
 const pir=nat==='pirate',dt=pir?.22:N===LADIES213?.2:.17,k=vol||1,M=lim?N.slice(0,lim):N;let i=0,t0=c.currentTime+.15,t=0;
 const tick=()=>{if(stop)return;const lim2=c.currentTime-t0+.5;while(i<M.length&&t<lim2){const[m,d]=M[i++];if(m){const mm=pir&&[71,64].includes(m)?m-1:m,du=d*dt*.92,at=Math.max(0,t0+t-c.currentTime);
   if(nat==='francais'){violon205(mm,du,at,.04*k);flute205(mm+12,du,at,.025*k)}else{violon205(mm,du,at,.04*k);if(!pir)fifre205(mm,du*.8,at,.028*k)}
   if(pir&&typeof caisse205==='function'&&i%4===1)caisse205(at,.06*k)}t+=d*dt}
  if(i>=M.length){setTimeout(()=>{if(!stop&&fin)fin()},Math.max(0,(t0+t-c.currentTime)*1000));return}setTimeout(tick,200)};tick();return{stop(){stop=true}}}
function timba217(fin){const c=typeof sndPret==='function'&&sndPret();if(!c)return{stop(){}};const PH=[[0,62],[.25,65],[.5,67],[.75,65],[1,69],[1.5,67],[1.75,65],[2,62],[2.5,60],[2.75,62]];let stop=false,n=0;
 const un=()=>{if(stop)return;if(n++>=4){fin&&fin();return}PH.forEach(([t,m])=>{const f=440*Math.pow(2,(m-69)/12);sTon(f,.18,{t:t*.42,v:.06,a:.003,type:'triangle',fl:3000,vers:f*.995});sTon(f*3.01,.05,{t:t*.42,v:.015,a:.002})});setTimeout(un,1400)};un();return{stop(){stop=true}}}
let JOUE217=null;
function annexe217(){const e=$('ecran');e.hidden=false;const arr=()=>{try{JOUE217&&JOUE217.stop()}catch(x){}JOUE217=null};
 const dess=()=>{e.innerHTML='<div class="bloc"><h1>Annexe · les musiques du jeu</h1><p class="note">Tout ce que le jeu fait entendre, avec sa source. Les airs de marins sont anciens et libres de droits, rejoués par les instruments du jeu : on en garde la mélodie, jamais un enregistrement.</p><div style="max-height:58vh;overflow:auto">'+
  ANN217.map((G,gi)=>'<h3 style="margin:12px 0 4px">'+G.g+'</h3>'+(G.n?'<p class="note" style="margin:0 0 4px">'+G.n+'</p>':'')+G.L.map((x,li)=>'<div style="display:flex;gap:8px;align-items:flex-start;margin:5px 0"><button class="bt sec" data-j="'+gi+':'+li+'" style="margin:0;min-width:44px">▶</button><div><b>'+x[0]+'</b><br><small style="opacity:.8">'+x[1]+'</small></div></div>').join('')).join('')+
  '<p class="note" style="margin-top:12px">'+CRED217+'</p></div><button class="bt sec" id="ann217s">■ Arrêter</button> <button class="bt" id="ann217r">← Les fiches</button></div>';
  e.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>{arr();try{const c=sndCtx();c&&c.state==='suspended'&&c.resume()}catch(x){}
   if(typeof SND!=='undefined'&&!SND.on){toast('Le son est coupé : rallumez-le pour écouter.');return}
   const[gi,li]=b.dataset.j.split(':').map(Number),x=ANN217[gi].L[li],c=sndPret();if(!c){toast('Le son démarre… touchez encore ▶.');return}
   e.querySelectorAll('[data-j]').forEach(o=>o.textContent='▶');b.textContent='♪';const fin=()=>{if(b.isConnected)b.textContent='▶'};
   if(typeof x[2]==='function'){const[nat,N]=x[2]();JOUE217=joue217(N,nat,0,1,fin)}
   else if(x[2]==='timba')JOUE217=timba217(fin);
   else{const B=typeof sons193==='function'&&sons193(c);if(!B||!B['boucle_'+x[2]]){toast('La musique se charge… réessayez dans un instant.');fin();return}
    const r=boucle194(c,SND.out,x[2],.7,1);const L=Math.min(B['boucle_'+x[2]].duration,(BCL194[x[2]]||99));const h=setTimeout(fin,L*1000);JOUE217={stop(){clearTimeout(h);try{r&&r.stop()}catch(z){}}}}});
  e.querySelector('#ann217s').onclick=()=>{arr();e.querySelectorAll('[data-j]').forEach(o=>o.textContent='▶')};
  e.querySelector('#ann217r').onclick=()=>{arr();menuFic208()}};dess()}
// le bouton « Annexe », en haut des Fiches de l'île
{const pose=()=>{try{const e=$('ecran');if(!e||e.hidden||e.querySelector('#ann217'))return;const h=e.querySelector('h1');if(!h||!/Fiches de l/.test(h.textContent))return;
  const b=document.createElement('button');b.className='bt';b.id='ann217';b.textContent='♪ Annexe : les musiques du jeu';b.style.cssText='margin:0 0 8px';b.onclick=annexe217;h.after(b)}catch(x){}};
 try{new MutationObserver(pose).observe(document.body,{childList:true,subtree:true})}catch(x){setInterval(pose,400)}}
// un navire fait route : quelques mesures de son air, doucement (pas plus d'une fois toutes les 90 s)
{let der=0;const air=nat=>{const n=performance.now();if(n-der<90000||JOUE217)return;der=n;nat=nat||'francais';
  const N=nat==='hollandais'?KAAP213:nat==='pirate'?BENBOW213:nat==='anglais'?(Math.random()<.5?LADIES213:BENBOW213):[AOUT213,CLAIRE213,NANTES213][Math.floor(Math.random()*3)];
  setTimeout(()=>{try{joue217(N,nat,nat==='francais'?9:12,.6)}catch(e){}},1800)};
 try{const cm=cineMer;cineMer=function(){const r=cm.apply(this,arguments);try{air(S&&S.voile&&S.voile.nat)}catch(e){}return r}}catch(e){}
 try{const fj=fond108Jouer;fond108Jouer=function(){const r=fj.apply(this,arguments);try{air('francais')}catch(e){}return r}}catch(e){}
 // la voile de l'événement joue déjà l'air entier : on ne double pas
 try{const a0=air213;air213=function(){der=performance.now();return a0.apply(this,arguments)}}catch(e){}}
