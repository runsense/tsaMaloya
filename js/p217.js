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
  ['Ouverture','Boucle jouée pour le jeu dans Kontakt.','intro_jeu'],['Entrée du kabar','Boucle jouée pour le jeu dans Kontakt.','intro_kabar'],
  ['Kabaré','Rythme du service kabaré.','kabare'],['Kasse','Rythme cassé.','kasse'],['Malbar','Maloya malbar, binaire.','malbar'],['Maligasse','Le rythme venu de Madagascar.','maligasse'],
  ['Moring','Le rythme du combat moring.','moring'],['Pleure','Maloya lent, pour les morts.','pleure'],['Roulé','Le roulèr mène.','roule'],['Valse','Maloya à trois temps.','valse']],
  n:'Rythmes de la librairie « Maloya Roots Percussions » (Wayo Audio), joués et mixés pour le jeu dans Kontakt. Les sons isolés ne sont pas redistribuables ; ici, des mixages complets.'},
 {g:'Avant 1900',L:[['La phrase du timba','Le timba, lamellophone venu du Mozambique et de Madagascar, disparaît au début du XXᵉ siècle. Reconstitution : aucun enregistrement n’existe.','timba']]}];
const CRED217='Tambours (coups découpés) : « Ceramic Djembe » (RutgerMuller, CC0), tambour sur cadre (Swietliste, CC0), « Untitled African rhythm » (Kevin MacLeod, CC BY 3.0), « Tamate drum-beating at funeral in Bengaluru » (CC BY 3.0), Wikimedia Commons. Kayamb, pikèr, sati, bobre : synthétisés.';
// lecteur de notes, programmé au fil de l'eau pour pouvoir l'arrêter ; lim = nombre de notes (pour un extrait), vol = facteur de volume
function joue217(N,nat,lim,vol,fin){let stop=false;const c=typeof sndPret==='function'&&sndPret();if(!c||typeof violon205!=='function')return{stop(){}};
 const pir=nat==='pirate',dt=pir?.22:nat==='cour'?.21:N===LADIES213?.2:.17,k=vol||1,M=lim?N.slice(0,lim):N;let i=0,t0=c.currentTime+.15,t=0;try{par217(N,M,dt,()=>stop)}catch(e){}
 const tick=()=>{if(stop)return;const lim2=c.currentTime-t0+.5;while(i<M.length&&t<lim2){const[m,d]=M[i++];if(m){const mm=pir&&[71,64].includes(m)?m-1:m,du=d*dt*.92,at=Math.max(0,t0+t-c.currentTime);
   if(nat==='francais'||nat==='cour'){violon205(mm,du,at,.04*k);flute205(mm+12,du,at,.025*k)}else{violon205(mm,du,at,.04*k);if(!pir)fifre205(mm,du*.8,at,.028*k)}
   if(pir&&typeof caisse205==='function'&&i%4===1)caisse205(at,.06*k)}t+=d*dt}
  if(i>=M.length){setTimeout(()=>{if(!stop&&fin)fin()},Math.max(0,(t0+t-c.currentTime)*1000));return}setTimeout(tick,200)};tick();return{stop(){stop=true}}}
function timba217(fin){const c=typeof sndPret==='function'&&sndPret();if(!c)return{stop(){}};const PH=[[0,62],[.25,65],[.5,67],[.75,65],[1,69],[1.5,67],[1.75,65],[2,62],[2.5,60],[2.75,62]];let stop=false,n=0;
 const un=()=>{if(stop)return;if(n++>=4){fin&&fin();return}PH.forEach(([t,m])=>{const f=440*Math.pow(2,(m-69)/12);sTon(f,.18,{t:t*.42,v:.06,a:.003,type:'triangle',fl:3000,vers:f*.995});sTon(f*3.01,.05,{t:t*.42,v:.015,a:.002})});setTimeout(un,1400)};un();return{stop(){stop=true}}}
let JOUE217=null;
const arr217=()=>{try{JOUE217&&JOUE217.stop()}catch(x){}JOUE217=null};
// la liste des musiques, posée dans le cadre des fiches (onglet « Annexe »)
function annexe217(box){box.dataset.ann='1';
 box.innerHTML='<p class="note" style="margin:2px 0 6px">Les airs de marins sont anciens et libres de droits, rejoués par les instruments du jeu : on en garde la mélodie, jamais un enregistrement. <button class="bt sec" id="ann217s" style="margin:0 0 0 6px;padding:2px 10px">■ Arrêter</button></p>'+
  ANN217.map((G,gi)=>'<h3 style="margin:10px 0 4px">'+G.g+'</h3>'+(G.n?'<p class="note" style="margin:0 0 4px">'+G.n+'</p>':'')+G.L.map((x,li)=>'<button class="bt sec" data-j="'+gi+':'+li+'" style="display:block;width:100%;text-align:left;margin:5px 0;border-left:5px solid #3a9ac8"><b><span class="ic217">▶</span> '+x[0]+'</b><br><small style="opacity:.8">'+x[1]+'</small></button>').join('')).join('')+
  '<p class="note" style="margin-top:12px">'+CRED217+'</p>';
 const ic=b=>b.querySelector('.ic217'),raz=()=>box.querySelectorAll('[data-j]').forEach(o=>ic(o).textContent='▶');
 box.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>{arr217();raz();try{const c=sndCtx();c&&c.state==='suspended'&&c.resume()}catch(x){}
  if(typeof SND!=='undefined'&&!SND.on){toast('Le son est coupé : rallumez-le pour écouter.');return}
  const[gi,li]=b.dataset.j.split(':').map(Number),x=ANN217[gi].L[li],c=sndPret();if(!c){toast('Le son démarre… touchez encore.');return}
  ic(b).textContent='♪';const fin=()=>{if(b.isConnected)ic(b).textContent='▶'};
  if(typeof x[2]==='function'){const[nat,N]=x[2]();JOUE217=joue217(N,nat,0,1,fin)}
  else if(x[2]==='timba')JOUE217=timba217(fin);
  else{const B=typeof sons193==='function'&&sons193(c);if(!B||!B['boucle_'+x[2]]){toast('La musique se charge… réessayez dans un instant.');fin();return}
   const r=boucle194(c,SND.out,x[2],.7,1);const L=Math.min(B['boucle_'+x[2]].duration,(BCL194[x[2]]||99));const h=setTimeout(fin,L*1000);JOUE217={stop(){clearTimeout(h);try{r&&r.stop()}catch(z){}}}}});
 box.querySelector('#ann217s').onclick=()=>{arr217();raz()}}
// « Annexe » : un onglet de plus dans les Fiches de l'île, à côté d'Histoire, Mythes, Mystique, Religieux
try{if(!FIC208.rub.find(r=>r[0]==='ann'))FIC208.rub.push(['ann','Annexe','Les musiques que le jeu fait entendre, à écouter : chants de marins, maloya du kabar, timba.'])}catch(e){}
{const pose=()=>{try{const e=$('ecran');if(!e||e.hidden)return;const bt=e.querySelector('[data-rb="ann"]');if(!bt)return;const sm=bt.querySelector('small');const n='('+ANN217.reduce((a,G)=>a+G.L.length,0)+')';if(sm&&sm.textContent!==n)sm.textContent=n;
  if(FIC208.tab!=='ann'){if(JOUE217&&!e.querySelector('[data-ann]'))arr217();return}const box=e.querySelector('#fic208l');if(!box||box.dataset.ann)return;const q=e.querySelector('#fic208q');if(q)q.style.display='none';annexe217(box)}catch(x){}};
 try{new MutationObserver(pose).observe(document.body,{childList:true,subtree:true})}catch(x){setInterval(pose,400)}}
// un navire fait route : quelques mesures de son air, doucement (pas plus d'une fois toutes les 90 s)
{let der=0;const air=nat=>{const n=performance.now();if(n-der<90000||JOUE217||n-(window.DER217||-1e9)<15000)return;der=n;window.DER217=n;nat=nat||'francais';
  const N=nat==='hollandais'?KAAP213:nat==='pirate'?BENBOW213:nat==='anglais'?(Math.random()<.5?LADIES213:BENBOW213):[AOUT213,CLAIRE213,NANTES213][Math.floor(Math.random()*3)];
  setTimeout(()=>{try{joue217(N,nat,nat==='francais'?9:12,.6)}catch(e){}},1800)};
 try{const cm=cineMer;cineMer=function(){const r=cm.apply(this,arguments);try{air(S&&S.voile&&S.voile.nat)}catch(e){}return r}}catch(e){}
 try{const fj=fond108Jouer;fond108Jouer=function(){const r=fj.apply(this,arguments);try{air('francais')}catch(e){}return r}}catch(e){}
 // la voile de l'événement joue déjà l'air entier : on ne double pas
 try{const a0=air213;air213=function(){der=performance.now();return a0.apply(this,arguments)}}catch(e){}}
// un débarquement (Payen 1663, Regnault 1665, tout « navire qui arrive » d'un événement) : l'air des marins, plus long qu'au passage d'un navire
const DEB217=/navire|bateau|vaisseau|frégate|(?<!Grande )chaloupe|escadre|flotte|corsaire|débarqu|négrier|trois-mâts|paquebot|accost|mouill|\brade\b|lettre de marque/i;
function natTxt217(s){return /anglais|royal navy/i.test(s)?'anglais':/hollandais|néerlandais/i.test(s)?'hollandais':/pirate|forban/i.test(s)?'pirate':'francais'}
function debarque217(txt,delai){try{if(/boutre|arabe|pirogue|comor|anjouan/i.test(txt||'')&&!/navire|frégate|vaisseau/i.test(txt||''))return;const n=performance.now();if(JOUE217||n-(window.DER217||-1e9)<15000)return;window.DER217=n;const nat=natTxt217(txt||''),N=nat==='hollandais'?KAAP213:nat==='pirate'?BENBOW213:nat==='anglais'?LADIES213:[AOUT213,NANTES213,CLAIRE213][Math.floor(Math.random()*3)];
 setTimeout(()=>{try{joue217(N,nat,nat==='francais'?18:20,.8)}catch(e){}},delai||1200)}catch(e){}}
// la musique de l'événement : un navire → l'air de son pavillon ; le maloya ou le kabar → une boucle de maloya ; le séga → son rythme ;
// le gouverneur, le commandant, la Compagnie → un air d'antan de ses origines (français, sauf pendant l'occupation anglaise de 1810 à 1815)
const MAL217=/maloya|kabar|servis kabaré|roulèr|\bkayamb/i,SEG217=/\bs[ée]ga\b/i,GOU217=/gouverneur|commandant|la Compagnie|intendant|le Roi |ordonnance/i;
function libre217(){const n=performance.now();if(JOUE217||n-(window.DER217||-1e9)<15000)return false;window.DER217=n;return true}
function maloya217(t){if(!libre217())return;try{const c=sndPret();if(!c||typeof boucle194!=='function')return;const y=(S&&S.year)||1700;
 const nom=/moring/i.test(t)?'moring':/mort|deuil|pleur|enterr/i.test(t)?'pleure':y<1850?'maligasse':['kabare','kasse','roule','malbar'][Math.floor(Math.random()*4)];
 const go=k=>{const B=sons193(c);if(B&&B['boucle_'+nom]){const r=boucle194(c,SND.out,nom,.5,1);setTimeout(()=>{try{r&&r.stop()}catch(e){}},11000)}else if(k<4)setTimeout(()=>go(k+1),900)};setTimeout(()=>go(0),900)}catch(e){}}
function sega217(){if(!libre217())return;try{if(typeof PRE72!=='undefined'&&PRE72.sega){setTimeout(()=>PRE72.sega.f(),900);setTimeout(()=>PRE72.sega.f(),900+3600)}}catch(e){}}
function antan217(t){const y=(S&&S.year)||1700,ang=(y>=1810&&y<1815)||/anglais|Farquhar/i.test(t);if(!libre217())return;
 const nat=ang?'anglais':'francais',N=ang?(Math.random()<.5?BENBOW213:LADIES213):(y<1789?[CLAIRE213,NANTES213][Math.floor(Math.random()*2)]:[AOUT213,CLAIRE213][Math.floor(Math.random()*2)]);
 setTimeout(()=>{try{joue217(N,nat,16,.7)}catch(e){}},1000)}
{let der='';const m0=modal;modal=function(){const id0=S&&S.evq&&S.evq[0];const r=m0.apply(this,arguments);try{if(id0&&id0!=='voile'){const id=id0,e=EV[id];if(e&&id!==der){der=id;let t='',b='';try{t=e.t||''}catch(x){}try{b=e.b||''}catch(x){}let vu='';try{const m=$('modal');vu=m&&!m.hidden?m.textContent:''}catch(z){}const x=(vu||(t+' '+b)).replace(/[ \n]+/g,' ');
  if(DEB217.test(x))debarque217(x);else if(MAL217.test(x))maloya217(x);else if(SEG217.test(x))sega217();else if(GOU217.test(x))antan217(x)}}}catch(e){}return r}}
{const cj=cineJouer;cineJouer=function(shots){const r=cj.apply(this,arguments);try{let t=0;(shots||[]).forEach(s=>{if(s&&typeof s.txt==='string'&&DEB217.test(s.txt))debarque217(s.txt,t+800);t+=(s&&s.d)||0})}catch(e){}return r}}
// la musique d'accueil se coupe quand on ouvre les Fiches de l'île (elle reprend au retour à l'accueil)
{const mf=menuFic208;menuFic208=function(){try{if(typeof ACC203!=='undefined'){ACC203.on=false;if(ACC203.joue){ACC203.joue.stop();ACC203.joue=null}}}catch(e){}return mf.apply(this,arguments)};
 try{const b=$('fic208');if(b)b.onclick=menuFic208}catch(e){}}
// la musique d'accueil se coupe en entrant dans les Fiches de l'île (comme quand la partie commence) ; elle revient au retour à l'accueil, au premier geste
{const mf=menuFic208;menuFic208=function(){try{if(typeof ACC203!=='undefined'){ACC203.on=false;if(ACC203.joue){ACC203.joue.stop();ACC203.joue=null}}}catch(e){}return mf.apply(this,arguments)};
 try{const b=document.getElementById('fic208');if(b)b.onclick=menuFic208}catch(e){}}
