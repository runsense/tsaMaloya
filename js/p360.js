// ===== p360 : (1) les petits jeux qui arrivent par une carte d'événement entrent comme le reste : la caméra plonge vers
// le lieu, la brume monte, le jeu s'ouvre dans la brume qui se lève. (2) Le rythme des forces de l'île : mesuré au test,
// aucune utopie ne s'ouvrait en 80 ans de conte ; l'élan des forces monte désormais assez pour qu'une utopie se propose
// à peu près une fois par génération (25 – 35 ans), plus vite si l'on soutient la force. =====
(function(){const lieu=()=>{try{if(typeof B!=='undefined'&&B&&B.t&&B.t.x!=null)return B.t;if(typeof sel!=='undefined'&&sel&&sel.x!=null)return sel;const c=typeof camps==='function'&&camps()[0];if(c)return c}catch(e){}return null};
 ['ouvrirDuel','ouvrirEchecs','ouvrirBataille','ouvrirGaleries','ouvrirCommando','ouvrirAventure'].forEach(n=>{const o=window[n];if(typeof o!=='function'||o.__p360)return;
  const w=function(){const th=this,a=arguments;try{if(typeof plonge332==='function'&&typeof PL332!=='undefined'&&!PL332&&typeof S!=='undefined'&&S){const t=lieu();return plonge332(t&&t.x,t&&t.z,()=>o.apply(th,a))}}catch(e){}return o.apply(th,a)};w.__p360=1;window[n]=w})})();
{const o=saison321;saison321=function(){const r=o.apply(this,arguments);try{const F=fac321(),c=monCote321();FAC321.forEach(f=>{const q=F[f.k];if(!q||!f.u||(S.br||{})[f.u]||q.utop)return;q.elan=Math.min(100,q.elan+.55+Math.max(0,(q.conf-40)/40)+(f.c===c?.35:0));
  if(q.elan>=100&&!S.evq.includes('utop321')&&!S.utQ321){S.utQ321=f.k;S.evq.push('utop321')}})}catch(e){}return r}}
