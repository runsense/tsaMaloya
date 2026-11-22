// ===== p72 : le son du jeu — tout est synthétisé (Web Audio), aucun fichier à télécharger =====
// Chaque moment du jeu (alerte, décès, kabar, chaque petit jeu…) joue le son choisi dans la « Table des sons » (SONCH).
// Les instruments imitent ceux de l'île : roulèr, kayamb, pikèr, bobre (maloya) ; ravanne, triangle, maravanne (séga) ; contretemps et basse (seggae).
// Les ambiances sont des couches de bruit filtré (mer, vent, pluie, grondement) avec leurs motifs : oiseaux, grillons, gouttes, tambours.
const SND={ctx:null,on:true,vol:.55,amb:null,ambK:'',lastEv:null};
try{const v=localStorage.getItem('tsa-son');if(v==='0')SND.on=false}catch(e){}
function sndCtx(){if(SND.ctx)return SND.ctx;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;SND.ctx=new C();SND.out=SND.ctx.createGain();SND.out.gain.value=SND.on?SND.vol:0;
 const comp=SND.ctx.createDynamicsCompressor();SND.out.connect(comp);comp.connect(SND.ctx.destination);
 const n=SND.ctx.sampleRate*2,b=SND.ctx.createBuffer(1,n,SND.ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;SND.bruit=b}catch(e){SND.ctx=null}return SND.ctx}
['pointerdown','keydown','touchstart'].forEach(ev=>addEventListener(ev,()=>{const c=sndCtx();if(c&&c.state==='suspended')c.resume()},{passive:true}));
function sndPret(){const c=SND.ctx;return c&&c.state==='running'&&SND.on?c:null}
// briques
function sTon(f,d,o={}){const c=sndPret();if(!c)return;const t=c.currentTime+(o.t||0),g=c.createGain(),s=c.createOscillator();s.type=o.type||'sine';s.frequency.setValueAtTime(f,t);if(o.vers)s.frequency.exponentialRampToValueAtTime(o.vers,t+d);
 const v=o.v||.3,a=o.a||.006;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(.0008,t+d);s.connect(g);
 if(o.fl){const F=c.createBiquadFilter();F.type='lowpass';F.frequency.setValueAtTime(o.fl,t);if(o.flv)F.frequency.exponentialRampToValueAtTime(o.flv,t+d);g.connect(F);F.connect(SND.out)}else g.connect(SND.out);s.start(t);s.stop(t+d+.05)}
function sBruit(d,o={}){const c=sndPret();if(!c)return;const t=c.currentTime+(o.t||0),s=c.createBufferSource();s.buffer=SND.bruit;s.loop=true;const F=c.createBiquadFilter();F.type=o.ft||'bandpass';F.frequency.value=o.f||1000;F.Q.value=o.q||1;const g=c.createGain(),v=o.v||.2;
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+(o.a||.004));if(o.tenir)g.gain.setValueAtTime(v,t+d-.4);g.gain.exponentialRampToValueAtTime(.0008,t+d);s.connect(F);F.connect(g);g.connect(SND.out);s.start(t,Math.random()*1.5);s.stop(t+d+.05)}
const ton7=sTon,bruit7=sBruit;
// ----- les instruments -----
const I72={
 rouler:(t,v=.5)=>{ton7(95,.38,{t,v,vers:52});bruit7(.07,{t,f:200,q:.8,v:v*.3})},
 kayamb:(t,v=.16)=>bruit7(.1,{t,f:5200,q:1.4,v,a:.018}),
 piker:(t,v=.25)=>bruit7(.035,{t,f:1900,q:9,v}),
 bobre:(t,f=98)=>{ton7(f,.7,{t,type:'sawtooth',v:.22,fl:1600,flv:300});ton7(f*1.5,.35,{t:t+.02,type:'triangle',v:.05})},
 ravanne:(t,v=.45)=>{ton7(120,.25,{t,v,vers:80});bruit7(.06,{t,f:900,q:1.2,v:v*.35})},
 ravSlap:(t,v=.3)=>{bruit7(.05,{t,f:1600,q:2,v});ton7(240,.08,{t,v:v*.4})},
 triangle:(t,v=.06)=>{ton7(2650,1,{t,v});ton7(3980,.7,{t,v:v*.6})},
 maravanne:(t,v=.12)=>bruit7(.13,{t,f:4300,q:1.1,v,a:.03}),
 skank:(t,root=196)=>{[1,1.26,1.5].forEach(m=>ton7(root*m,.12,{t,type:'square',v:.045,fl:2200}))},
 basse:(t,f=65,d=.4)=>ton7(f,d,{t,type:'triangle',v:.42,fl:500}),
 grosse:(t,v=.5)=>ton7(60,.3,{t,v,vers:40}),
 ngoma:(t,v=.4,f=150)=>{ton7(f,.22,{t,v,vers:f*.7});bruit7(.04,{t,f:f*6,q:1.5,v:v*.3})},
 cloche:(t,f=220,v=.25)=>[1,2.76,5.4].forEach((m,i)=>ton7(f*m,3.2/(i+1),{t,v:v/(i+1)}))};
// ----- la bibliothèque : les mêmes clés que la Table des sons ; d = durée d'un tour (pour les boucles) -----
const PRE72={
 maloya68:{d:3.6,f:()=>{for(let m=0;m<3;m++){const b=m*1.2;for(let i=0;i<6;i++)I72.kayamb(b+i*.2,i%3===2?.16:.08);I72.rouler(b,.5);I72.rouler(b+.6,.32);I72.piker(b+.2);I72.piker(b+.8);I72.piker(b+1)}}},
 malLent:{d:5.4,f:()=>{for(let m=0;m<3;m++){const b=m*1.8;I72.rouler(b,.45);I72.rouler(b+.9,.3);for(let i=0;i<6;i++)I72.kayamb(b+i*.3,.07)}I72.bobre(.2,87);I72.bobre(2,87);I72.bobre(3.8,78)}},
 malRapide:{d:2.88,f:()=>{for(let m=0;m<4;m++){const b=m*.72;for(let i=0;i<6;i++)I72.kayamb(b+i*.12,i%3===2?.17:.09);I72.rouler(b,.55);I72.rouler(b+.36,.38);if(m%2)I72.rouler(b+.6,.3);I72.piker(b+.12);I72.piker(b+.48)}}},
 rouler:{d:1.2,f:()=>{I72.rouler(0);I72.rouler(.35,.35);I72.rouler(.7,.55)}},
 kayamb:{d:1.7,f:()=>{for(let i=0;i<14;i++)I72.kayamb(i*.12,i%3===2?.14:.07)}},
 bobre:{d:2.2,f:()=>{I72.bobre(0,98);I72.bobre(.5,110);I72.bobre(1,98);I72.bobre(1.6,87)}},
 sega:{d:3.6,f:()=>{for(let m=0;m<4;m++){const b=m*.9;I72.ravanne(b);I72.ravSlap(b+.45);for(let i=0;i<6;i++)I72.maravanne(b+i*.15,i%3===0?.14:.07);I72.triangle(b);I72.triangle(b+.45,.04)}}},
 ravanneRoul:{d:1.8,f:()=>{for(let i=0;i<16;i++)I72.ravanne(i*.09,.12+i*.02);I72.ravanne(1.5,.6)}},
 triangle:{d:1.2,f:()=>{I72.triangle(0,.08);I72.triangle(.5,.05);I72.triangle(.75,.05);I72.triangle(1,.08)}},
 seggae:{d:4,f:()=>{const bl=[65,65,73,58];for(let m=0;m<4;m++){const b=m;I72.grosse(b+.5);I72.basse(b,bl[m],.45);I72.basse(b+.5,bl[m]*1.5,.3);I72.skank(b+.25,196);I72.skank(b+.75,196);I72.ravSlap(b+.75,.2);I72.maravanne(b,.06);I72.maravanne(b+.5,.06)}}},
 skank:{d:3,f:()=>{for(let i=0;i<6;i++)I72.skank(i*.5+.25,i<3?196:175)}},
 tambMoz:{d:3.6,f:()=>{for(let m=0;m<3;m++){const b=m*1.2;[0,.3,.5,.8,1].forEach((x,i)=>I72.ngoma(b+x,i===0?.5:.28,i%2?210:150));for(let i=0;i<12;i++)I72.piker(b+i*.1,i%3===0?.2:.08)}}},
 lambi:{d:2.7,f:()=>{ton7(233,.9,{type:'sawtooth',v:.16,a:.12,vers:220,fl:900});ton7(233,1.6,{t:1.05,type:'sawtooth',v:.18,a:.12,vers:207,fl:900})}},
 cloche:{d:3,f:()=>{I72.cloche(0,196);I72.cloche(1.6,196,.15)}},
 clocheGrave:{d:3,f:()=>{I72.cloche(0,98,.22);ton7(103,2.4,{v:.08,type:'sawtooth',fl:400})}},
 coeur:{d:1,f:()=>{ton7(62,.18,{v:.5,vers:45});ton7(58,.2,{t:.28,v:.38,vers:42})}},
 sec:{d:.4,f:()=>{ton7(180,.09,{type:'square',v:.12,fl:1200});ton7(150,.09,{t:.16,type:'square',v:.12,fl:1200})}},
 carillon:{d:1.3,f:()=>[784,988,1175,1568].forEach((f,i)=>ton7(f,.9,{t:i*.11,type:'triangle',v:.09}))},
 plume:{d:1,f:()=>{bruit7(.25,{f:3000,q:.6,v:.06,a:.08});I72.cloche(.1,392,.07)}},
 conte:{d:2,f:()=>{for(let i=0;i<6;i++)I72.kayamb(i*.09,.06);ton7(523,1.4,{t:.2,type:'triangle',v:.07,a:.3});ton7(659,1.4,{t:.55,type:'triangle',v:.06,a:.3})}},
 corne:{d:1.5,f:()=>{ton7(147,1.2,{type:'triangle',v:.12,a:.2});ton7(220,1.2,{t:.25,type:'triangle',v:.09,a:.2})}},
 roulerVote:{d:1.2,f:()=>{I72.rouler(0,.35);I72.rouler(.35,.35);I72.rouler(.7,.5)}},
 tick:{d:.1,f:()=>ton7(1400,.06,{type:'triangle',v:.06})},
 tonnerre:{d:2.6,f:()=>{bruit7(2.6,{ft:'lowpass',f:220,q:.4,v:.5,a:.05});ton7(48,2,{v:.3,vers:30})}},
 gronde:{d:4,f:()=>{bruit7(4,{ft:'lowpass',f:110,q:.5,v:.35,a:.8});ton7(36,4,{v:.25,a:.8,vers:30})}},
 apotheose:{d:1.6,f:()=>{[392,494,587,784].forEach((f,i)=>ton7(f,1.3,{t:i*.13,type:'triangle',v:.1}));for(let i=0;i<10;i++)I72.kayamb(i*.12,.07);I72.rouler(.55,.4)}},
 // « Zion hört die Wächter singen » : la ritournelle de Bach (BWV 140 n°4, 1731 ; transcrite pour orgue BWV 645), celle qui porte la musique — domaine public.
 // Notes reprises de l'édition Bach-Gesellschaft (saisie Mutopia, BWV 645) : le dessus et la pédale du premier ritornello, puis un accord de mi bémol pour conclure.
 zion:{d:21,f:()=>{const q=60/76,hz=m=>440*Math.pow(2,(m-69)/12),H=[58,.5,63,.25,65,.25,67,.5,67,.5,65,.5,68,.5,67,.5,58,.5,56,.5,67,.25,63,.25,65,.5,56,.5,55,.5,62,.5,63,.5,0,.5,58,.5,63,.25,65,.25,67,.5,67,.5,65,.5,68,.5,67,.5,58,.5,56,.5,67,.25,63,.25,65,.5,56,.5,55,.5,62,.5,63,.5,0,.5,70,.5,70,1.0,68,.25,67,.25,65,.25,63,.25,65,.25,63,.25,62,.25,60,.25,58,.5,60,.25,62,.25,63,.25,65,.25,67,.25,65,.25,68,.25,67,.25,65,.25,63,.25,67,.5,65,.5,0,.5],B=[0,.5,39,1.0,39,1.0,39,1.0,43,1.0,44,1.0,46,1.0,39,1.0,0,1.0,39,1.0,39,1.0,39,1.0,43,1.0,44,1.0,46,1.0,39,1.0,0,1.0,43,1.0,48,1.0,46,1.0,44,1.0,43,1.0,39,1.0,46,1.0,50,.5];let t=.2;
  for(let i=0;i<H.length;i+=2){const m=H[i],d=H[i+1]*q;if(m){ton7(hz(m),d*.95+.08,{t,type:'triangle',v:.1,a:.015,fl:2600});ton7(hz(m+12),d*.9+.05,{t,v:.025,a:.015})}t+=d}
  let u=.2;for(let i=0;i<B.length;i+=2){const m=B[i],d=B[i+1]*q;if(m){ton7(hz(m),d*.92,{t:u,type:'triangle',v:.16,a:.03,fl:500});ton7(hz(m+12),d*.9,{t:u,type:'triangle',v:.05,a:.03,fl:900})}u+=d}
  [51,58,63,67,70].forEach((m,i)=>ton7(hz(m),2.6,{t,type:'triangle',v:i?.07:.12,a:.06,fl:1800}));I72.cloche(t,155.6,.07)}},
 silence:{d:1,f:()=>{}}};
// les sons « de nature » sont des ambiances en couches, pas des motifs à boucler
const PROFIL={mer:'carte',grillons:'nuit',vent:'cyclone',tonnerre:'cyclone',volcan:'volcan',gouttes:'galeries',tambGuerre:'bataille',silence:'silence'};
// ----- les choix de la Table des sons (enregistrés le 14/11/2026 ; « __sample » = un enregistrement déposé, à intégrer) -----
const SONCH={alerte:'lambi',deces:'zion',decesDem:'clocheGrave',faim:'coeur',bras:'sec',naissance:'carillon',info:'tick',
 evArchive:'plume',evConte:'conte',evDecouverte:'carillon',evMonde:'corne',evVote:'roulerVote',kabar:'maloya68',cyclone:'tonnerre',victoire:'sega',
 ambJour:'mer',ambNuit:'grillons',ambCyclone:'vent',ambSurvie:'mer',genese:'volcan',
 jGaleries:'gouttes',jBataille:'tambGuerre',jCommando:'grillons',jDuel:'maloya68',jEchecs:'malLent',jDonjon:'gouttes',jMission:'mer',jCourse:'vent',jChasse:'mer'};
function jouerMoment(k){try{const p=SONCH[k];if(!p||!sndPret())return;if(PRE72[p]){PRE72[p].f();return}if(p==='volcan')PRE72.gronde.f();else if(p==='vent'||p==='tonnerre')PRE72.tonnerre.f()}catch(e){}}
function sJouer(k){try{if(PRE72[k]&&sndPret())PRE72[k].f()}catch(e){}}
// ----- ambiances en boucle -----
function ambCouche(ft,f,q){const c=SND.ctx,s=c.createBufferSource();s.buffer=SND.bruit;s.loop=true;const F=c.createBiquadFilter();F.type=ft;F.frequency.value=f;F.Q.value=q;const g=c.createGain();g.gain.value=0;s.connect(F);F.connect(g);g.connect(SND.ambBus||SND.out);s.start(0,Math.random()*1.5);return {s,F,g}}
function ambInit(){if(SND.amb||!SND.ctx)return;
 // l'ambiance passe par son propre bus, au sixième : la musique et les sons du jeu restent devant
 SND.ambBus=SND.ctx.createGain();SND.ambBus.gain.value=1/6;SND.ambBus.connect(SND.out);
 SND.amb={riv:ambCouche('bandpass',950,.5),mer:ambCouche('lowpass',420,.6),vent:ambCouche('bandpass',520,.7),pluie:ambCouche('highpass',2600,.4),grave:ambCouche('lowpass',90,.6)}}
const AMB={carte:{mer:.10,vent:.025,ois:1},nuit:{mer:.08,vent:.015,gr:1},cyclone:{mer:.16,vent:.32,pluie:.22,grave:.06},volcan:{mer:.05,vent:.02,grave:.34},cine:{mer:.12,vent:.04},
 galeries:{vent:.03,grave:.16,gouttes:1},bataille:{vent:.08,grave:.05,tamb:1},foret:{vent:.05,ois:1},doux:{mer:.03,vent:.01},silence:{}};
// le moment courant : un petit jeu, un kabar, le prologue, le cyclone, la nuit ou le jour
SND.jeu=null;SND.kabarJ=0;SND.volcanJ=0;
function momentCourant(){try{const now=performance.now();if(SND.jeu&&window.BTUON)return SND.jeu;if(!window.BTUON)SND.jeu=null;
 if(now<SND.volcanJ)return 'genese';if(typeof CINE!=='undefined'&&CINE)return 'cine';if(now<SND.kabarJ)return 'kabar';
 const k=$('kons');if(k&&!k.hidden)return 'ambSurvie';if(typeof S==='undefined'||!S)return 'ambJour';
 if(typeof CYCV!=='undefined'&&CYCV&&CYCV.I>.2)return 'ambCyclone';
 const ph=typeof jourPh==='function'?jourPh():.4;return (ph<.08||ph>.7)?'ambNuit':'ambJour'}catch(e){return 'ambJour'}}
// le vent : fort de loin et en hauteur, il suit les vagues sur la côte, plus doux dans le camp, et toujours par rafales
const RAF72={v:0,cible:0,proch:0};
function vent72(t,A){let base=Math.max(A.vent||0,.02);let loin=0,haut=0,cote=0,camp=1;
 try{loin=Math.max(0,Math.min(1,((typeof dist!=='undefined'?dist:10)-8)/40));if(typeof camT!=='undefined'&&typeof alt==='function'){const h=alt(camT.x,camT.z);haut=Math.max(0,Math.min(1,h/1600));cote=h<80?1-Math.max(0,h)/80:0}
  if((typeof VP!=='undefined'&&VP)||(typeof CV!=='undefined'&&CV&&CV.on))camp=.45}catch(e){}
 const now=performance.now();if(now>RAF72.proch){RAF72.cible=Math.random()<.45?.25+Math.random()*.35:1+Math.random()*1.3;RAF72.proch=now+1200+Math.random()*4200}
 RAF72.v+=(RAF72.cible-RAF72.v)*.18;
 COTE72=cote;const vague=cote*(1.1*houle72(t)-.25);
 const hv=typeof courbe200==='function'&&typeof camT!=='undefined'?(courbe200('vent',Math.max(0,alt(camT.x,camT.z))).v-.44)/.56*.7:.7*haut;
 return Math.min(.22,base*(.55+1.3*loin+hv+vague)*camp*RAF72.v)}
// la mer s'entend sur la côte, presque plus dans les Hauts ; la rivière proche s'entend, elle, en montant
function mer72(){try{if(typeof camT==='undefined'||typeof alt!=='function')return 1;const h=Math.max(0,alt(camT.x,camT.z));if(typeof courbe200==='function')return courbe200('mer',h).v;return Math.max(.06,Math.min(1,1-(h-25)/320))}catch(e){return 1}}
const RIV72={d:99,t:0};
function riv72(){try{const now=performance.now();if(now-RIV72.t>900&&window.RIV126&&typeof camT!=='undefined'){RIV72.t=now;let b=99;for(const r of RIV126){const P=r.P||[];for(let i=0;i<P.length;i+=3){const d=Math.hypot(P[i][0]-camT.x,P[i][1]-camT.z);if(d<b)b=d}}RIV72.d=b}
 const pres=typeof courbe200==='function'?courbe200('riviere',RIV72.d).v:Math.max(0,Math.min(1,(3.2-RIV72.d)/2.6)),pl=typeof pluie==='function'&&pluie()?1.6:1;return .09*pres*pl}catch(e){return 0}}
const PL72={v:0};
// la houle : une vague toutes les 9 s environ, la crête plus courte que le creux ; la mer et, sur la côte, le souffle du vent la suivent ensemble
const houle72=t=>Math.pow(.5+.5*Math.sin(t*.7-1.2),1.6);let COTE72=0;
let ambT=0,boucleT=0;setInterval(()=>{const c=sndPret();if(!c)return;ambInit();const m=momentCourant();SND.ambK=m;const p=m==='cine'?'mer':(SONCH[m]||'mer');
 const musique=!PROFIL[p]&&PRE72[p];const A=musique?AMB.doux:(m==='cine'?AMB.cine:AMB[PROFIL[p]]||AMB.carte),t=c.currentTime;
 const VF=vent72(t,A);if(SND.amb.riv){const L=SND.amb.riv,raf=typeof RAF72!=='undefined'?RAF72.v:1;L.g.gain.setTargetAtTime(riv72()*Math.max(.45,.7+.45*(raf-1)),t,.5);L.F.frequency.setTargetAtTime(800+500*Math.abs(Math.sin(t*1.7)*Math.sin(t*.63)),t,.15)}
 ['mer','vent','pluie','grave'].forEach(n=>{const L=SND.amb[n];let v=A[n]||0;if(n==='mer')v*=(.7+.65*houle72(t))*mer72();if(n==='vent')v=VF;else if(typeof vpCalme204==='function')v*=vpCalme204();if(n==='pluie'){const pf=typeof pluieF106==='function'?pluieF106():0;PL72.v+=(pf-PL72.v)*(pf>PL72.v?.025:.04);v=Math.max(v*(.25+.9*PL72.v),.05*PL72.v)}const T=L.tr||(L.tr={cible:v,fin:0});
  // un vrai changement d'ambiance : 0,9 s de passage ; celle qui sort baisse d'abord doucement puis plus franchement, celle qui entre monte vite d'abord
  if(Math.abs(v-T.cible)>Math.max(.012,T.cible*.35)&&m!==T.m){const de=L.g.gain.value,N=24,cv=new Float32Array(N);for(let i=0;i<N;i++){const u=i/(N-1),e=v<de?Math.pow(u,2.2):1-Math.pow(1-u,2.2);cv[i]=de+(v-de)*e}
   try{L.g.gain.cancelScheduledValues(t);L.g.gain.setValueCurveAtTime(cv,t,.9);T.fin=t+.92}catch(e){}T.m=m}
  T.cible=v;if(t>=T.fin)L.g.gain.setTargetAtTime(v,t,n==='vent'?.25:.6)});
 SND.amb.vent.F.frequency.setTargetAtTime(PROFIL[p]==='cyclone'?380+260*Math.abs(Math.sin(t*.4)):520+COTE72*(-140+420*houle72(t)),t,.4);
 ambT++;const now=performance.now();
 if(musique){if(now>=boucleT){PRE72[p].f();boucleT=now+PRE72[p].d*1000-60}return}boucleT=0;if(ambT%4)return;const q=ambT/4;
 const cal=typeof vpCalme204==='function'?vpCalme204():1;if(A.ois&&cal>.7&&Math.random()<.18){const f=2200+Math.random()*1800;for(let i=0;i<2+Math.floor(Math.random()*3);i++)ton7(f,.09,{t:i*.13,vers:f*(1.2+Math.random()*.3),v:.025})}
 if(A.gr&&cal>.6&&q%2===0){for(let i=0;i<4;i++)ton7(4300,.035,{t:i*.07,v:.012,type:'triangle'})}
 if(A.gouttes&&Math.random()<.4){const f=900+Math.random()*900;ton7(f,.18,{vers:f*.6,v:.05})}
 if(A.tamb&&q%4===0){I72.rouler(0,.28);I72.rouler(.5,.2);I72.rouler(.75,.28)}
 if(PROFIL[p]==='volcan'&&Math.random()<.3)bruit7(2.2,{ft:'lowpass',f:110,q:.5,v:.18,a:.8});
 if(PROFIL[p]==='cyclone'&&m==='ambCyclone'&&Math.random()<.05)PRE72.tonnerre.f();
},250);
// ----- les branchements -----
{const t0=toast;toast=function(m){const r=t0.apply(this,arguments);try{if(/naissance/i.test(m||''))jouerMoment('naissance');else jouerMoment('info')}catch(e){}return r}}
{const md=modal;modal=function(){const r=md.apply(this,arguments);try{if(!S||!S.evq||!S.evq.length)return r;const id=S.evq[0];if(id===SND.lastEv)return r;SND.lastEv=id;const e=EV[id]||{},tag=e.tag||'',tx=((e.t||'')+' '+(typeof e.b==='string'?e.b:'')).toLowerCase();
 if(/kabar|maloya|moringue|tambour|tsa mal oya/.test(tx)){SND.kabarJ=performance.now()+14000;boucleT=0}
 if(/cyclone|ouragan|tempête/.test(tx))jouerMoment('cyclone');
 else if(tag==='Archive')jouerMoment('evArchive');else if(/Conte|Mythe|Imaginaire|Mystique|Mémoire/.test(tag))jouerMoment('evConte');else if(tag==='Découverte')jouerMoment('evDecouverte');else if(/Monde|Mer|Comptoir/.test(tag))jouerMoment('evMonde');else if(tag==='Vote')jouerMoment('evVote');else jouerMoment('evArchive')}catch(e){}return r}}
{const al=alerte;alerte=function(){const r=al.apply(this,arguments);try{const n=performance.now();if(!SND.lamb||n-SND.lamb>12000){SND.lamb=n;jouerMoment('alerte')}}catch(e){}return r}}
{const ld=lettreDeces;lettreDeces=function(titre,txt,dem){const r=ld.apply(this,arguments);jouerMoment(dem?'decesDem':'deces');return r}}
{const ka=kAlerteBras;kAlerteBras=function(){const r=ka.apply(this,arguments);jouerMoment('bras');return r}}
setInterval(()=>{try{if(faimNiv()>=3)jouerMoment('faim')}catch(e){}},5000);
{const cy=cyclone;cyclone=function(){const r=cy.apply(this,arguments);jouerMoment('cyclone');return r}}
{const g=genese;genese=function(done){SND.volcanJ=performance.now()+60000;jouerMoment('genese');return g.call(this,function(){SND.volcanJ=0;if(done)done.apply(this,arguments)})}}
{const ap=apotheose;apotheose=function(){jouerMoment('victoire');return ap.apply(this,arguments)}}
{const ij=introJeu;introJeu=function(o,go){const s=((o&&o.sur)||'')+' '+((o&&o.t)||'');const k=/Labyrinthe/i.test(s)?'jGaleries':/Bataille/i.test(s)?'jBataille':/Commando/i.test(s)?'jCommando':/Duel/i.test(s)?'jDuel':/Échecs/i.test(s)?'jEchecs':/Donjon/i.test(s)?'jDonjon':/Mission/i.test(s)?'jMission':/course|songe/i.test(s)?'jCourse':'jChasse';
 return ij.call(this,o,function(ok){if(ok){SND.jeu=k;boucleT=0}return go.apply(this,arguments)})}}
{const j=journal;journal=function(m){const r=j.apply(this,arguments);try{if(/kabar|roulèr|maloya/i.test(m||'')){SND.kabarJ=performance.now()+12000;boucleT=0}if(/naissance/i.test(m||''))jouerMoment('naissance')}catch(e){}return r}}
// ----- le bouton son, à côté de « Satellite » ; et dans la Survie -----
function sndBasculer(){SND.on=!SND.on;try{localStorage.setItem('tsa-son',SND.on?'1':'0')}catch(e){}const c=sndCtx();if(c){if(c.state==='suspended')c.resume();SND.out.gain.setTargetAtTime(SND.on?SND.vol:0,c.currentTime,.05)}document.querySelectorAll('.sndP').forEach(b=>b.textContent=SND.on?'🔊 Son':'🔇 Son')}
setInterval(()=>{try{[$('fc'),document.querySelector('#kons header')].forEach(h=>{if(!h||h.querySelector('.sndP'))return;const s=document.createElement('span');s.className='pill sndP';s.style.cursor='pointer';s.title='Couper ou remettre le son du jeu';s.textContent=SND.on?'🔊 Son':'🔇 Son';s.onclick=e=>{e.stopPropagation();sndBasculer()};h.appendChild(s)})}catch(e){}},800);
