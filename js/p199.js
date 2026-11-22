// ===== p199 : Vie, côté colons — on n'entend pas la même chose partout.
// Près des champs, le travail : houes, sabres à canne, chaînes. La case du maître reste calme.
// Le soir, du côté des Hauts où se cachent les marrons, un kabar très bas, étouffé, qu'on devine plus qu'on ne l'entend. =====
const SON199={src:null,kb:null,soir:-1};
function vie199(){try{return !!(S&&!S.fin&&S.voieC&&typeof modeHist==='function'&&!modeHist())}catch(e){return false}}
function hauts199(){try{if(SON199.src)return SON199.src;const h=(typeof camps==='function'&&camps()[0])||null;if(!h)return null;let best=null,bd=1e9;
 T.forEach(t=>{if(t.sea||t.alt<650||t.alt>1800)return;const o=S.t[t.i]||{};if(o.c||o.b)return;const d=Math.hypot(t.x-h.x,t.z-h.z);if(d>4&&d<bd){bd=d;best=t}});SON199.src=best?[best.x,best.z]:null;return SON199.src}catch(e){return null}}
// le bruit du travail : un coup de houe, un sabre dans la canne, une chaîne qui traîne
function coup199(k,v){const T7=typeof sTon==='function'?sTon:null,B7=typeof sBruit==='function'?sBruit:null;if(!T7||!B7)return;
 if(k==='houe'){B7(.11,{ft:'lowpass',f:220,q:.8,v:.09*v});B7(.05,{ft:'bandpass',f:900,q:1.5,v:.03*v,t:.01})}
 else if(k==='sabre'){B7(.06,{ft:'bandpass',f:2600,q:2.5,v:.05*v});B7(.14,{ft:'highpass',f:3500,q:.5,v:.02*v,t:.03})}
 else{const n=3+Math.floor(Math.random()*4);for(let i=0;i<n;i++){const f=3200+Math.random()*1400;T7(f,.05,{t:i*.13+Math.random()*.04,vers:f*.97,v:.012*v,type:'triangle'});B7(.03,{ft:'highpass',f:5000,q:1,v:.012*v,t:i*.13})}}}
let tr199=0;
setInterval(()=>{try{if(!vie199()||typeof camT==='undefined')return;const c=typeof sndPret==='function'&&sndPret();if(!c)return;
 const ph=typeof jourPh==='function'?jourPh():.4,jour=ph>.14&&ph<.62,soir=ph>.64||ph<.05,h=(typeof camps==='function'&&camps()[0])||null;
 const dCase=h?Math.hypot(camT.x-h.x,camT.z-h.z):99;
 // le travail aux champs, le jour : seulement près d'une parcelle cultivée, jamais à la case
 if(jour&&performance.now()>tr199){let dc=99;T.forEach(t=>{const o=S.t[t.i];if(o&&(o.c||o.clr)&&t!==h){const d=Math.hypot(t.x-camT.x,t.z-camT.z);if(d<dc)dc=d}});
  const D=typeof dist!=='undefined'?dist:10,zf=Math.max(.3,Math.min(1,1-(D-8)/50));
  // à la case : silence de près ; en prenant du recul, on entend les champs de l'habitation autour
  const pc=dCase<1.4?Math.max(0,Math.min(.8,(D-6)/10)):0;
  const pres=Math.max(pc,Math.max(0,Math.min(1,1-(dc-.8)/5))*zf);
  if(pres>.05){const r=Math.random();coup199(r<.5?'houe':r<.82?'sabre':'chaine',pres)}tr199=performance.now()+700+Math.random()*1800}
 // le kabar caché, le soir, du côté des Hauts
 const src=hauts199();
 if(soir&&src&&!SON199.kb&&SON199.soir!==(S.ns||0)*10+(S.jourN||0)&&Math.random()<.5&&typeof boucle194==='function'){SON199.soir=(S.ns||0)*10+(S.jourN||0);SON199.kb=boucle194(c,SND.out,Math.random()<.5?'kabare':'maligasse',.5)}
 if(SON199.kb&&(!soir||!vie199())){SON199.kb.stop();SON199.kb=null}
 if(SON199.kb&&SON199.kb.sp){const d=Math.hypot(camT.x-src[0],camT.z-src[1]),pres=Math.max(0,Math.min(1,1-(d-2)/14)),calme=dCase<1.4?.3:1,raf=typeof RAF72!=='undefined'?Math.min(1.8,RAF72.v):1;
  SON199.kb.sp.gain.setTargetAtTime(Math.max(.015,.05+.25*pres)*calme*(.7+.3*raf),c.currentTime,.6);SON199.kb.F.frequency.setTargetAtTime(380+1400*pres,c.currentTime,.6)}}catch(e){}},400);
