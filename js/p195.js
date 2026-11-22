// ===== p195 : le temps répond au sacré, sans que rien ne soit écrit =====
// un kabar ou un service malgache ouvre une éclaircie sur le camp ; une procession chrétienne éclaircit toute l'île ;
// la cavadee fait tomber la pluie sur la région où elle passe — et quand la colonie compte beaucoup d'engagés, le camp sèche ensuite
const MY195=[];
// la durée se compte en bras employés : marron 3, malbar 2, chrétien 1 quand la saison compte 5 bras ou plus ; sinon 1 bras chacun
const BR195={n:0,prec:null};
setInterval(()=>{try{if(!S)return;const b=S.bras;if(BR195.prec!=null&&b<BR195.prec)BR195.n+=BR195.prec-b;BR195.prec=b}catch(e){}},250);
function duree195(k){const bm=typeof brasMax==='function'?brasMax():3;return bm>=5?k:1}
function zone195(x,z,r,k,nb,apres){if(!S)return;const d=BR195.n+(apres||0);MY195.push({x,z,r,k,deb:d,fin:d+nb});while(MY195.length>8)MY195.shift()}
function mod195(){try{if(!S||!MY195.length||typeof camT==='undefined')return null;const n=BR195.n;let clair=0,pl=0;
 for(const z of MY195){if(n<z.deb||n>=z.fin)continue;const d=Math.hypot(camT.x-z.x,camT.z-z.z),w=z.r>900?1:Math.max(0,Math.min(1,(z.r-d)/(z.r*.4)));if(z.k<0)clair=Math.max(clair,w);else pl=Math.max(pl,w)}
 return clair||pl?{clair,pl}:null}catch(e){return null}}
function camp195(){try{const c=(typeof camps==='function'&&camps()[0])||(S.home!=null&&T[S.home]);return c?[c.x,c.z]:[camT.x,camT.z]}catch(e){return [0,0]}}
function kabar195(){const [x,z]=camp195();zone195(x,z,5,-1,duree195(3))}
function procession195(){zone195(0,0,1000,-1,duree195(1))}
function cavadee195(){try{const [x,z]=typeof xz==='function'?xz(55.650,-20.960):camp195();const d2=duree195(2);zone195(x,z,14,1,d2);
 const P=S.pp||[],eng=P.filter(p=>p.st==='engagé').length;if(eng>=8||(P.length&&eng/P.length>.3)){const [cx,cz]=camp195();zone195(cx,cz,6,-1,d2,d2)}}catch(e){}}
{const enrobe=n=>{const f=window[n];if(typeof f!=='function')return;window[n]=function(){const v=f.apply(this,arguments);const m=mod195();if(!m)return v;let r=(v||0)*(1-m.clair);r=Math.max(r,m.pl*.6*(1-m.clair));return r}};
 try{const f0=pluieF106;pluieF106=function(){const v=f0.apply(this,arguments);const m=mod195();if(!m)return v;return Math.max((v||0)*(1-m.clair),m.pl*.6*(1-m.clair))}}catch(e){}
 try{const f1=averseF146;averseF146=function(){const v=f1.apply(this,arguments);const m=mod195();if(!m)return v;return Math.max((v||0)*(1-m.clair),m.pl*.6*(1-m.clair))}}catch(e){}}
const lire195=tx=>{try{tx=(tx||'').toLowerCase();if(/cavadee|kavadi|mourouga|marche sur le feu/.test(tx)){cavadee195();return}
 if(/procession/.test(tx)&&!/tamoul|malbar|engagés tamouls/.test(tx)){procession195();return}
 if(/kabar|maloya|service kabaré|servis kabaré|service pour les ancêtres/.test(tx))kabar195()}catch(e){}};
try{const md=modal;modal=function(){try{if(S&&S.evq&&S.evq.length){const e=EV[S.evq[0]]||{};lire195((e.t||'')+' '+(typeof e.b==='string'?e.b:''))}}catch(e){}return md.apply(this,arguments)}}catch(e){}
try{const lg=log;log=function(m){const r=lg.apply(this,arguments);lire195(m);return r}}catch(e){}
try{const lj=leg104Jouer;leg104Jouer=function(k){const r=lj.apply(this,arguments);if(k==='cavadee')cavadee195();return r}}catch(e){}
