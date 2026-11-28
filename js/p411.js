// ===== p411 : la musique ne tourne plus en rond. Avant, une boucle de maloya (Wayo) jouait sans fin tant qu'on restait au même
// endroit, et les petits morceaux synthétisés (séga, lambi, timbila…) se répétaient toutes les quelques secondes.
// Maintenant : une boucle passe 2 ou 3 fois, s'éteint, laisse 12 à 25 s d'ambiance seule (vent, mer, oiseaux), puis une autre
// variante revient — jamais deux fois de suite la même quand il y en a plusieurs. Les morceaux synthétisés : 2 ou 3 passages,
// puis un silence de 15 à 30 s. =====
// les instruments d'époque seulement : le triangle et l'accordéon n'arrivent qu'au milieu du XIXᵉ siècle, les engagés indiens après 1848
const ANNEE411={kabare:1850,kasse:1850,maloya1:1850,sega2:1860,valse2:1850,malbar2:1850};
const VAR411={kabare:['kabare','maligasse','kasse'],maligasse:['maligasse','kabare','kasse','pleure'],kasse:['kasse','kabare','maligasse'],pleure:['pleure','pleure4'],pleure4:['pleure4','pleure']};
{const b0=boucle194;boucle194=function(ctx,dest,nom,v,une){if(une||!ctx||!dest)return b0.apply(this,arguments);try{const B0=sons193(ctx);if(!B0||!B0['boucle_'+nom])return null}catch(e){return null}
 const bus=ctx.createGain(),F=ctx.createBiquadFilter();F.type='lowpass';F.frequency.value=18000;F.Q.value=.5;bus.connect(F);F.connect(dest);
 const S0={nom,sp:bus,F,ctx,cur:null,h:null,fini:0,der:nom};
 const B=()=>{try{return sons193(ctx)}catch(e){return null}},L=n=>{const b=B()&&B()['boucle_'+n];return b?Math.min(b.duration,(typeof BCL194!=='undefined'&&BCL194[n])||b.duration):12};
 const joue=n=>{if(S0.fini)return;const r=b0.call(this,ctx,bus,n,v,false);if(!r){S0.h=setTimeout(()=>joue(n),1500);return}S0.cur=r;S0.der=n;
  const tours=L(n)>25?1:2+(Math.random()<.5?1:0),duree=Math.min(48,tours*L(n));
  S0.h=setTimeout(()=>{try{r.stop()}catch(e){}S0.cur=null;const pause=12000+Math.random()*13000;
   S0.h=setTimeout(()=>{const an=(typeof S!=='undefined'&&S&&S.year)||1700,G=(VAR411[n]||[n]).filter(x=>B()&&B()['boucle_'+x]&&(ANNEE411[x]||0)<=an);const autres=G.filter(x=>x!==n);const suiv=autres.length?autres[Math.floor(Math.random()*autres.length)]:n;joue(suiv)},pause)},duree*1000)};
 joue(nom);
 S0.stop=function(){S0.fini=1;clearTimeout(S0.h);try{S0.cur&&S0.cur.stop()}catch(e){}};return S0}}
// les morceaux synthétisés
setInterval(()=>{try{if(typeof PRE72==='undefined')return;for(const k in PRE72){const o=PRE72[k];if(!o||typeof o.f!=='function'||o.f.__p411||/^bcl|^tick|^coeur/.test(k))continue;
 const f0=o.f,st={n:0,rep:0,max:2+(Math.random()<.5?1:0)};const w=function(){const now=performance.now(),suite=now-(st.last||0)<(o.d||4)*1000+2500;st.last=now;if(!suite){st.n=0;st.rep=0}if(st.rep>0){st.rep--;return}st.n++;const r=f0.apply(this,arguments);if(st.n>=st.max){st.n=0;st.max=2+(Math.random()<.5?1:0);st.rep=Math.max(1,Math.ceil((15+Math.random()*15)/Math.max(1,o.d||4)))}return r};w.__p411=1;o.f=w}}catch(e){}},2000);
