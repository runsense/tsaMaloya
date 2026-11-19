
// ===== p134 : l'intro passée trop vite ne doit jamais bloquer la partie =====
// 1) une cinématique lancée pendant qu'une autre tourne ne disparaît plus en silence (son « done » était perdu → partie jamais chargée) : l'ancienne est terminée proprement d'abord.
// 2) une seule boucle d'animation de cinématique par image (les clics rapides en lançaient plusieurs, qui sautaient des plans).
// 3) « nouvelle partie » ignorée si elle est relancée deux fois en moins de 2 s (double clic sur Passer).
// 4) filet : si la genèse est passée et que rien ne s'affiche ni ne démarre pendant 5 s, la partie démarre.
{const cj=cineJouer;cineJouer=function(shots,done){try{if(CINE)cineFin()}catch(e){CINE=null}if(CINE){try{if(done)done()}catch(e){}return}return cj.apply(this,arguments)}}
{const ct=cineTick;let der=-1;cineTick=function(ts){if(ts!==undefined){if(ts===der)return;der=ts}return ct.apply(this,arguments)}}
{const nv=nouvelle;let t=0;nouvelle=function(){const n=performance.now();if(n-t<2000&&window.S)return;t=n;return nv.apply(this,arguments)}}
{const g=genese;genese=function(done){let fait=0;const d=()=>{if(fait)return;fait=1;clearInterval(w);if(done)done()};let calme=0;
 const w=setInterval(()=>{const e=document.getElementById('ecran');const vu=e&&!e.hidden&&e.offsetWidth;if(CINE||vu){calme=0;return}if(++calme>=5){try{d()}catch(_){}}},1000);
 return g.call(this,d)}}
