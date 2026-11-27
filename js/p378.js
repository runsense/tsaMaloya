
// ===== p378 : la musique plus forte, et des instruments plus vrais =====
// Maloya : roulèr (peau tenue à la main, coup ouvert ou étouffé), kayamb (des centaines de graines), pikèr (bambou frappé),
// bobre (arc à une corde, calebasse ouverte et fermée). Mozambique : la timbila des Chopi (lames de bois, calebasses
// et mirlitons qui bourdonnent), les hochets njele et le ngoma. Petit écart humain sur le temps et la force.
// Le comptoir du Mozambique s'ouvre sur un orchestre de timbila.
{
 // 1) plus fort : volume général, et les boucles de maloya passent devant l'ambiance
 try{SND.vol=.78;if(SND.out&&SND.on)SND.out.gain.value=SND.vol}catch(e){}
 const C=()=>typeof sndPret==='function'&&sndPret();
 const h=(t,ms=12)=>Math.max(0,t+(Math.random()*2-1)*ms/1000),hv=(v,p=.18)=>v*(1-p+Math.random()*2*p);
 function ton(f,d,o={}){const c=C();if(!c)return null;const t=c.currentTime+(o.t||0),g=c.createGain(),s=c.createOscillator();s.type=o.type||'sine';s.frequency.setValueAtTime(f,t);if(o.vers)s.frequency.exponentialRampToValueAtTime(o.vers,t+d);
  const v=o.v||.3,a=o.a||.006;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(.0008,t+d);s.connect(g);let x=g;
  if(o.fl){const F=c.createBiquadFilter();F.type=o.ft||'lowpass';F.frequency.setValueAtTime(o.fl,t);if(o.flv)F.frequency.exponentialRampToValueAtTime(o.flv,t+d);if(o.q)F.Q.value=o.q;g.connect(F);x=F}
  x.connect(SND.out);s.start(t);s.stop(t+d+.05);return {g,t}}
 function bruit(d,o={}){const c=C();if(!c||!SND.bruit)return;const t=c.currentTime+(o.t||0),s=c.createBufferSource();s.buffer=SND.bruit;s.loop=true;const F=c.createBiquadFilter();F.type=o.ft||'bandpass';F.frequency.value=o.f||1000;F.Q.value=o.q||1;const g=c.createGain(),v=o.v||.2;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+(o.a||.004));g.gain.exponentialRampToValueAtTime(.0008,t+d);s.connect(F);F.connect(g);g.connect(SND.out);s.start(t,Math.random()*1.5);s.stop(t+d+.05)}
 // corde pincée (Karplus-Strong), mise en cache par hauteur
 const KS={};function corde(f,d,o={}){const c=C();if(!c)return;const sr=c.sampleRate,cle=Math.round(f)+':'+(o.brill||.55);let b=KS[cle];
  if(!b){const n=Math.floor(sr*d),p=Math.max(2,Math.round(sr/f)),am=o.amort||.997,br=o.brill||.55;b=c.createBuffer(1,n,sr);const x=b.getChannelData(0);for(let i=0;i<p;i++)x[i]=Math.random()*2-1;for(let i=p;i<n;i++)x[i]=am*(br*x[i-p]+(1-br)*x[i-p+1]);KS[cle]=b}
  const s=c.createBufferSource();s.buffer=b;const g=c.createGain();g.gain.value=o.v||.45;const F=c.createBiquadFilter();F.type='peaking';F.frequency.value=o.caleb||420;F.Q.value=2.5;F.gain.value=9;s.connect(g);g.connect(F);F.connect(SND.out);s.start(c.currentTime+(o.t||0))}
 try{
  Object.assign(I72,{
   rouler:(t,v=.5,ouvert=true)=>{t=h(t);v=hv(v);ton(ouvert?78:92,ouvert?.75:.22,{t,v,vers:ouvert?62:70,a:.004});ton(ouvert?156:180,.18,{t,v:v*.25,vers:120});bruit(.05,{t,f:420,q:.9,v:v*.35});if(ouvert)ton(230,.3,{t,v:v*.06,type:'triangle'})},
   kayamb:(t,v=.12,d=.15)=>{t=h(t,8);const n=22;for(let i=0;i<n;i++){bruit(.012+Math.random()*.01,{t:t+d*Math.pow(i/n,1.4)+Math.random()*.012,f:3800+Math.random()*3200,q:3+Math.random()*4,v:hv(v)*(1-i/n*.6)})}},
   piker:(t,v=.22)=>{t=h(t,8);v=hv(v);ton(820,.06,{t,v,type:'triangle',vers:760});ton(1640,.03,{t,v:v*.4,type:'triangle'});bruit(.02,{t,f:2600,q:6,v:v*.6})},
   bobre:(t,f=98,cal=420)=>{corde(f,1.4,{t:h(t),v:.5,caleb:cal});bruit(.02,{t,f:3000,q:2,v:.05})},
   mbila:(t,f=392,v=.3)=>{const c=C();if(!c)return;t=h(t,10);v=hv(v,.12);ton(f,.9,{t,v,a:.002});ton(f*4,.12,{t,v:v*.25,a:.001});ton(f*9.9,.04,{t,v:v*.08,a:.001});bruit(.012,{t,f:f*6,q:2,v:v*.5});
    const bz=ton(f,.45,{t:t+.005,type:'sawtooth',v:v*.16,fl:f*3.2,ft:'bandpass',q:3});if(bz){const l=c.createOscillator(),lg=c.createGain();l.frequency.value=f*.5;lg.gain.value=v*.12;l.connect(lg);lg.connect(bz.g.gain);l.start(bz.t);l.stop(bz.t+.5)}},
   njele:(t,v=.08)=>{t=h(t,10);for(let i=0;i<8;i++)bruit(.02,{t:t+i*.006+Math.random()*.01,f:6500+Math.random()*2000,q:5,v:hv(v)})}});
  const G=k=>196*Math.pow(2,k/7);// gamme chopi : sept degrés presque égaux par octave
  const timbila=()=>{const u=.17,haut=[7,9,8,10,9,7,8,10,9,11,10,8],mil=[4,null,5,4,null,6,5,null,4,6,null,5],bas=[0,null,null,2,null,null,1,null,null,3,null,null];
   for(let m=0;m<3;m++){const b=m*12*u;for(let i=0;i<12;i++){I72.mbila(b+i*u,G(haut[i]),.2);if(mil[i]!==null)I72.mbila(b+i*u+u*.5,G(mil[i]),.22);if(bas[i]!==null)I72.mbila(b+i*u,G(bas[i])/2,.32);if(i%3===0)I72.njele(b+i*u)}
    I72.ngoma(h(b),.42,150);I72.ngoma(h(b+6*u),.3,210);I72.ngoma(h(b+9*u),.3,150)}};
  PRE72.timbila={d:6.12,f:timbila};
  PRE72.tambMoz={d:3.6,f:()=>{for(let m=0;m<3;m++){const b=m*1.2;[0,.3,.5,.8,1].forEach((x,i)=>I72.ngoma(h(b+x),hv(i===0?.5:.28),i%2?210:150));for(let i=0;i<12;i++)I72.njele(b+i*.1,i%3===0?.1:.05);I72.mbila(b,G(0)/2,.3);I72.mbila(b+.6,G(2)/2,.25)}}};
  PRE72.maloya68={d:4.8,f:()=>{for(let m=0;m<4;m++){const b=m*1.2;for(let i=0;i<6;i++)I72.kayamb(b+i*.2,i%3===0?.12:.07);I72.rouler(b,.55,true);I72.rouler(b+.6,.35,false);I72.rouler(b+.9,.3,true);I72.piker(b+.2);I72.piker(b+.4,.12);I72.piker(b+.8);I72.piker(b+1)}}};
  PRE72.malLent={d:5.4,f:()=>{for(let m=0;m<3;m++){const b=m*1.8;I72.rouler(b,.5,true);I72.rouler(b+.9,.3,false);for(let i=0;i<6;i++)I72.kayamb(b+i*.3,.06,.22)}[[.2,87,380],[.8,87,700],[2,87,380],[2.6,98,700],[3.8,78,380],[4.4,87,700]].forEach(([t,f,c])=>I72.bobre(t,f,c))}};
  PRE72.bobre={d:2.8,f:()=>{[[0,98,380],[.5,110,700],[1,98,380],[1.6,87,700],[2.2,98,380]].forEach(([t,f,c])=>I72.bobre(t,f,c))}};
 }catch(e){console.warn('p378',e)}
 // 2) le comptoir du Mozambique s'ouvre sur la timbila
 try{const co=cpOuvrir;cpOuvrir=function(k){const r=co.apply(this,arguments);try{if(k==='mozamb'&&PRE72.timbila&&C())setTimeout(()=>PRE72.timbila.f(),400)}catch(e){}return r}}catch(e){}
}
