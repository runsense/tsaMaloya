// ===== p254 : la musique d'une annonce dure le temps de l'annonce. Un air de marins, un air d'antan, une boucle de maloya, un son d'ambiance
// lancés par une annonce reprennent tant qu'elle est ouverte (avec un petit silence entre deux reprises), et s'arrêtent en fondu dès qu'on la ferme. =====
const AN254={H:[],ouv:false,cle:''};
const cle254=()=>{try{return ouv254()?String(S.evq[0])+':'+S.evq.length:''}catch(e){return ''}};
const ouv254=()=>{try{const m=$('modal');return !!(m&&!m.hidden&&S&&S.evq&&S.evq.length)}catch(e){return false}};
// les airs (violon, flûte, fifre) : on rejoue tant que l'annonce reste ouverte
{const j0=joue217;joue217=function(N,nat,lim,vol,fin){if(!ouv254())return j0.apply(this,arguments);const cle=cle254();let h=null,fini=false;
  const relance=()=>{if(fini||!ouv254()||cle254()!==cle)return;h=j0(N,nat,lim,vol,()=>{setTimeout(relance,1800)})};
  h=j0(N,nat,lim,vol,()=>{try{fin&&fin()}catch(e){}setTimeout(relance,1800)});const o={stop(){fini=true;try{h&&h.stop()}catch(e){}}};AN254.H.push(Object.assign(o,{c:cle}));return o}}
// les boucles de maloya jouées « une fois » pendant une annonce : elles tournent jusqu'à la fermeture
{const b0=boucle194;boucle194=function(ctx,dest,nom,v,une){if(!une||!ouv254())return b0.apply(this,arguments);const r=b0.call(this,ctx,dest,nom,v,false);if(!r)return r;const st=r.stop;let fini=false;
  const o=Object.assign({},r,{stop(force){if(force||!ouv254()){if(!fini){fini=true;st.call(r)}}}});AN254.H.push({c:cle254(),stop(){o.stop(true)}});return o}}
// les sons d'ambiance d'une annonce (cloches, frissons, cristal…) : coupés en fondu à la fermeture
{const br=bruit238;bruit238=function(k,vol,boucle,dur){const r=br.apply(this,arguments);try{if(r&&!boucle&&ouv254())AN254.H.push({c:cle254(),stop(){try{r.stop(1.2)}catch(e){}}})}catch(e){}return r}}
// le séga d'une annonce : ses deux phrases reviennent tant qu'elle est ouverte
{const sg=sega217;sega217=function(){const r=sg.apply(this,arguments);try{const cle=cle254();const re=()=>{if(!ouv254()||cle254()!==cle)return;try{PRE72.sega.f();setTimeout(()=>{if(ouv254()&&cle254()===cle)PRE72.sega.f()},3600)}catch(e){}setTimeout(re,9000)};setTimeout(re,9000)}catch(e){}return r}}
setInterval(()=>{const c=cle254();const garde=[];AN254.H.forEach(h=>{if(h.c===c)garde.push(h);else try{h.stop()}catch(e){}});AN254.H=garde},300);
