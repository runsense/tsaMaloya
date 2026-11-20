
// ===== p142 : la musique des décès suit la lettre =====
// La première phrase de la ritournelle de Bach (BWV 645, mi bémol majeur, notes vérifiées sur la partition de la Bach-Gesellschaft), à l’orgue : jeux de principal et de bourdon, un peu de réverbération d’église, tempo plus posé (66 à la noire).
// Elle passe par son propre volume : quand la lettre se ferme, elle s'éteint en fondu. Plusieurs décès d'affilée ne la relancent pas par-dessus elle-même.
const ZION142={g:null,fin:0};
PRE72.zion={d:9,f:()=>{const c=sndPret();if(!c)return;const now=c.currentTime;if(ZION142.g&&now<ZION142.fin)return;
 const G=c.createGain();G.gain.value=1;ZION142.t0=performance.now();G.connect(SND.out);ZION142.g=G;const q=60/66,hz=m=>440*Math.pow(2,(m-69)/12),H=[58,.5,63,.25,65,.25,67,.5,67,.5,65,.5,68,.5,67,.5,58,.5,56,.5,67,.25,63,.25,65,.5,56,.5,55,.5,62,.5,63,.5,0,.5,58,.5,63,.25,65,.25,67,.5,67,.5,65,.5,68,.5,67,.5,58,.5,56,.5,67,.25,63,.25,65,.5,56,.5,55,.5,62,.5,63,.5,0,.5,70,.5,70,1.0,68,.25,67,.25,65,.25,63,.25,65,.25,63,.25,62,.25,60,.25,58,.5,60,.25,62,.25,63,.25,65,.25,67,.25,65,.25,68,.25,67,.25,65,.25,63,.25,67,.5,65,.5,0,.5],B=[0,.5,39,1.0,39,1.0,39,1.0,43,1.0,44,1.0,46,1.0,39,1.0,0,1.0,39,1.0,39,1.0,39,1.0,43,1.0,44,1.0,46,1.0,39,1.0,0,1.0,43,1.0,48,1.0,46,1.0,44,1.0,43,1.0,39,1.0,46,1.0,50,.5];
 if(!ZION142.w){const mk=(h)=>{const re=new Float32Array(h.length+1),im=new Float32Array(h.length+1);h.forEach((x,i)=>im[i+1]=x);return c.createPeriodicWave(re,im)};ZION142.w={principal:mk([1,.55,.32,.22,.12,.09,.05,.04]),bourdon:mk([1,.08,.35,.03,.12,.02,.05])};
 const L=c.sampleRate*2.6,ir=c.createBuffer(2,L,c.sampleRate);for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);for(let i=0;i<L;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/L,3.2)}ZION142.ir=ir}
 const rv=c.createConvolver();rv.buffer=ZION142.ir;const rg=c.createGain();rg.gain.value=.32;rv.connect(rg);rg.connect(G);
 const note=(f,d,t,type,v,fl)=>{const g=c.createGain(),s=c.createOscillator();if(type==='triangle'||type==='sine')s.setPeriodicWave(f<200?ZION142.w.bourdon:ZION142.w.principal);else s.type=type;s.frequency.value=f;g.gain.setValueAtTime(0,now+t);g.gain.linearRampToValueAtTime(v,now+t+.035);g.gain.setValueAtTime(v*.92,now+t+Math.max(.05,d-.07));g.gain.linearRampToValueAtTime(0,now+t+d);
  let n=g;if(fl){const F=c.createBiquadFilter();F.type='lowpass';F.frequency.value=fl;g.connect(F);n=F}s.connect(g);n.connect(G);n.connect(rv);s.start(now+t);s.stop(now+t+d+.05)};
 let t=.15,beats=0;for(let i=0;i<H.length;i+=2){const m=H[i],d=H[i+1];if(!m&&beats>=7)break;if(m){note(hz(m),d*q*.95+.08,t,'triangle',.1,2600);note(hz(m+12),d*q*.9+.05,t,'sine',.018)}t+=d*q;beats+=d}
 let u=.15,bb=0;for(let i=0;i<B.length&&bb<beats;i+=2){const m=B[i],d=B[i+1];if(m)note(hz(m),d*q*.92,u,'triangle',.15,500);u+=d*q;bb+=d}
 [51,58,63,67,70].forEach((m,i)=>note(hz(m),2.2,t,'triangle',i?.06:.11,1800));ZION142.fin=now+t+2.3}};
setInterval(()=>{try{const G=ZION142.g,c=SND.ctx;if(!G||!c||c.currentTime>=ZION142.fin||performance.now()-ZION142.t0<1200)return;const l=document.getElementById('lettreD');
  if(!l||l.hidden||!l.offsetParent){G.gain.cancelScheduledValues(c.currentTime);G.gain.setValueAtTime(G.gain.value,c.currentTime);G.gain.linearRampToValueAtTime(0,c.currentTime+.8);ZION142.fin=c.currentTime+.8}}catch(e){}},250);
