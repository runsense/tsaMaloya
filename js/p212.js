// ===== p212 : le rythme d'une journée en Vie — la fatigue monte jusqu'à minuit, chacun à sa façon ; au camp marron on mange avant la nuit, puis kabar autour du feu, puis on dort ; le rhum fait des tracas =====
// Repères de la journée (jourPh) : 0 l'aube, .3 midi, .72 le soir, .93 minuit environ.
// La fatigue de chacun suit la journée (vers 90 % à minuit) selon ce qu'il est : le chasseur, le chef qui commande, la mère de jeunes enfants,
// les vieux et les tempéraments durs s'usent plus ; les jeunes et les mystiques moins ; le froid des Hauts et la pluie pèsent aussi.
// Le rhum : quelques-uns boivent au kabar ; le lendemain ils sont plus las, et parfois une dispute éclate.
const R212={ph:-1,fen:''};
function k212(p){let k=1;try{const a=ageP(p),c=T[campDe(p)];if(p.role==='cha')k*=1.08;const ch=typeof chefDe==='function'&&chefDe(campDe(p));if(ch&&ch.id===p.id)k*=1.08;
 if(p.g==='f'&&(S.pp||[]).some(q=>q.mere===p.id&&ageT(q)<6))k*=1.1;if(a>=50)k*=1.1;else if(a<25)k*=.92;if(p.role==='mys')k*=.95;ppOk(p);if((p.op&&p.op.guer||0)>40)k*=1.06;
 if(p.rhum)k*=1.06;if(c&&c.alt>1000)k*=1.04;if(typeof pluie==='function'&&pluie())k*=1.04}catch(e){}return k}
// la fenêtre du soir : repas puis kabar (marrons) ; chez les colons, le repas puis la nuit
function fen212(ph){const C=S.voieC;if(ph>=.72&&ph<.8)return 'mange';if(!C&&ph>=.8&&ph<.9)return 'kabar';return ''}
// au camp : où se mettre et quel geste
{const cc=cvCible;cvCible=function(p,a,L,nuit){try{if(S&&!modeHist()&&p.id!==S.garde&&adulte(p)){const f=fen212(jourPh()),ids=cvGens().filter(adulte).map(q=>q.id),i=Math.max(0,ids.indexOf(p.id)),n=Math.max(1,ids.length),an=i/n*6.283;
  if(f==='mange')return [L.feu[0]+Math.cos(an)*.085,L.feu[1]+Math.sin(an)*.06,'mange'];
  if(f==='kabar'){const mus=['rouler','kayamb','ravane'];if(i<3)return [L.feu[0]+Math.cos(an)*.1,L.feu[1]+Math.sin(an)*.07,'joue '+mus[i]];
   if(ageP(p)>=55||(p.fat||0)>88)return [L.feu[0]+Math.cos(an)*.12,L.feu[1]+Math.sin(an)*.085,'regarde le kabar'];
   return [L.feu[0]+Math.cos(an+R212.ph*20)*.05,L.feu[1]+Math.sin(an+R212.ph*20)*.035,'danse']}}}catch(e){}return cc(p,a,L,nuit)}}
Object.assign(P3GESTE,{mange:'assis','joue rouler':'rouler','joue kayamb':'kayamb','joue ravane':'ravane',danse:'sega','regarde le kabar':'assis'});
setInterval(()=>{try{if(!S||S.fin||modeHist()||typeof jourPh!=='function')return;const ph=jourPh();
 // à l'entrée du repas et du kabar, tout le monde change de place tout de suite
 const f=fen212(ph);if(f!==R212.fen){R212.fen=f;if(typeof CV!=='undefined'&&CV.A)for(const id in CV.A)CV.A[id].t=0;
  if(f==='kabar'&&!S.voieC&&(S.year||0)>=1700){(S.pp||[]).filter(p=>adulte(p)&&p.g==='h'&&!enGrp(p)).forEach(p=>{if(p.rhum==null)p.rhum=Math.random()<.18?1:0})}}
 // le kabar s'entend au camp tant qu'il dure
 if(f==='kabar'&&!S.voieC&&typeof CV!=='undefined'&&CV.on&&typeof SND!=='undefined')SND.kabarJ=performance.now()+3500;
 // la fatigue suit la journée
 const jour=ph>=.04&&ph<.93;(S.pp||[]).filter(p=>adulte(p)&&!enGrp(p)).forEach(p=>{const a=CV&&CV.A&&CV.A[p.id],dort=a?a.act==='dort':!jour,k=k212(p);let cible;
  if(dort)cible=8;else{const u=Math.min(1,Math.max(0,(ph<.04?ph+1:ph)-.04)/(.93-.04));cible=10+(90*k-10)*u}
  const v=p.fat||0;p.fat=Math.min(100,Math.max(0,v+(cible-v)*(dort?.08:.1)))});
 // le rhum : au matin, les buveurs sont las ; parfois une dispute
 if(R212.ph>.9&&ph<.1){(S.pp||[]).filter(p=>p.rhum&&adulte(p)).forEach(p=>{p.fat=Math.min(100,(p.fat||0)+12);if(Math.random()<.25){const o=(S.pp||[]).filter(q=>q!==p&&adulte(q)&&campDe(q)===campDe(p));const q=o[Math.floor(Math.random()*o.length)];if(q){S.coh=Math.max(0,(S.coh||0)-1);try{journal(p.n.split(' ')[0]+' et '+q.n.split(' ')[0]+' se sont disputés après le kabar. Le rhum.')}catch(e){}const ca=CV&&CV.A&&CV.A[p.id];if(ca){ca.say='Kosa ou la di ?';ca.sayT=220}}}})}
 R212.ph=ph}catch(e){}},1500);
