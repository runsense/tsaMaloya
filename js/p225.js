// ===== p225 : les fanjans et le mystique passif (idée de l’auteur) =====
// Les fanjans mâles (Cyathea borbonica) gardent : le camp se cache mieux. Les femelles (C. excelsa, C. glauca) soignent : un peu de santé.
// Le fanjan de pierre pousse de rien, sur la coulée nue : rare, il porte le plus de mystique.
// Tous sont fragiles : on les coupe, ils ne reviennent que lentement. Et dans Vie, quand on en abat un, la terre tremble.
const FJ225={};
function fjVie225(t){if(!S)return 0;S.fj225=S.fj225||{};const v=S.fj225[t.i];return v==null?1:v}
function fjType225(t){if(!t||t.alt<150)return null;const b=t.biome||'',r=rndH(t.i*13.7+5);
 if(/Coulées de lave/.test(b))return r<.12&&(t.nb||[]).some(i=>T[i]&&T[i].forest)?'pierre':null;
 if(/fanjans/.test(b))return r<.5?'male':'femelle';
 if(t.forest&&t.alt>=300&&t.alt<=1500&&r<.45)return r<.2?'male':'femelle';return null}
function fjAutour225(){const R={male:0,femelle:0,pierre:0};try{const C=camps();if(!C.length)return R;T.forEach(t=>{const ty=fjType225(t);if(!ty)return;if(!C.some(c=>hd(c,t)<=2))return;const o=S.t[t.i]||{};if(o.c)return;R[ty]+=fjVie225(t)})}catch(e){}return R}
// chaque saison : les fanjans autour des camps donnent, sans qu'on le voie ; ils repoussent un peu ; la colonie qui s'installe les fait disparaître
{const ps=ppSaison;ppSaison=function(){const r=ps.apply(this,arguments);try{if(!S||S.fin)return r;S.fj225=S.fj225||{};
  for(const k in S.fj225){const t=T[k],o=t&&S.t[t.i]||{};if(o.c)S.fj225[k]=0;else S.fj225[k]=Math.min(1,S.fj225[k]+.03)}
  const A=fjAutour225(),m=Math.min(2.5,A.male*.12+A.femelle*.12+A.pierre*.6);if(m>0){S.myst=(S.myst||0)+m;if(A.femelle>0)fx({sante:Math.min(1.5,A.femelle*.15)});if(A.male>0&&!S.voieC)fx({traque:-Math.min(1.5,A.male*.12)})}
  if(m>.4&&!S.done.fj225vu){S.done.fj225vu=1;if(S.evq&&!S.evq.includes('fanjans225'))S.evq.push('fanjans225')}}catch(e){}return r}}
// dans Vie : couper du bois là où poussent les fanjans, c'est parfois en abattre un — et la terre tremble
function tremble225(){try{const t0=performance.now(),cx=camT.x,cz=camT.z;FJ225.sh={t0,cx,cz};
  if(typeof sBruit==='function'){sBruit(1.6,{ft:'lowpass',f:90,v:.25});sBruit(1.1,{t:.3,ft:'lowpass',f:60,v:.2})}}catch(e){}}
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{const s=FJ225.sh;if(s){const u=(performance.now()-s.t0)/1400;if(u>=1){FJ225.sh=null}else{const a=.06*(1-u);camT.x+=(Math.random()-.5)*a;camT.z+=(Math.random()-.5)*a}}}catch(e){}return r}}
{const jt=jourTick;jourTick=function(){const av=[];try{if(S&&!modeHist()&&!S.fin)(S.pp||[]).forEach(p=>{if(adulte(p)&&!enGrp(p)&&tacheDe(p)==='bois'&&p.lieu!=null&&T[p.lieu]&&fjType225(T[p.lieu])&&fjType225(T[p.lieu])!=='pierre')av.push(p)})}catch(e){}
  const r=jt.apply(this,arguments);try{if(!av.length)return r;S.fj225=S.fj225||{};for(const p of av){const t=T[p.lieu];if(fjVie225(t)<=.05||Math.random()>.12)continue;
   S.fj225[t.i]=Math.max(0,fjVie225(t)-.25);S.myst=Math.max(0,(S.myst||0)-2);tremble225();
   const ty=fjType225(t);journal(ty==='male'?'Un fanjan mâle est tombé sous la hache de '+p.n.split(' ')[0]+'. La terre a tremblé, un peu.':'Un fanjan femelle est tombé sous la hache de '+p.n.split(' ')[0]+'. Sous les pieds, la terre a bougé.');
   try{dire(p,'Tu as senti ? La terre…')}catch(e){}break}}catch(e){}return r}}
// le fanjan de pierre se voit dans le lieu : un fanjan seul, debout sur la coulée nue
{const rl=remplirLieu;remplirLieu=function(){const r=rl.apply(this,arguments);try{const t=lieu;if(t&&fjType225(t)==='pierre'&&fjVie225(t)>.05&&MOD.fanjan){const n0=MOD.fanjan.userData.n;const x=t.x+.35,z=t.z-.2;hutC.setRGB(.8,.95,.85);poseM(MOD.fanjan,x,alt(x,z)*VX+.02,z,1.3,0,0,1.5,hutC);MOD.fanjan.count=MOD.fanjan.userData.n;MOD.fanjan.instanceMatrix.needsUpdate=true}}catch(e){}return r}}
EV.fanjans225={y:1663,si:()=>!!(S&&S.done&&S.done.fj225vu),tag:'Mystique',an:'',t:'Les fanjans',
 get b(){return 'Autour du camp, les fanjans. Le mâle, au tronc net, se tient droit : '+(S.voieC?'les bois semblent plus calmes là où il pousse.':'derrière lui, les chasseurs ne voient plus le sentier.')+' La femelle, plus large, garde l’humidité : là où elle pousse, les plaies se ferment mieux. Il en est un qui pousse de rien, sur la pierre nue de la coulée. On dit qu’il ne faut pas les abattre.'},
 v:'On dit qu’il ne faut pas les abattre.',h:'Fanjan mâle : Cyathea borbonica ; fanjans femelles : C. excelsa, C. glauca, fougères arborescentes de l’île. Leurs pouvoirs sont un choix du jeu.',o:[{n:'Les laisser pousser',d:'Mystique +2',fx:{myst:2}}]};
