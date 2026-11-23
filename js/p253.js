// ===== p253 : dans les Hauts, pas de conque — elle aurait trahi les camps. On se parle par des sifflets d'oiseaux, des feux discrets, des guetteurs.
// La conque marine (le touti, la toutoute, l'antsiva malgache) garde sa place ailleurs : en ouverture d'un kabar ou d'un service kabaré,
// chez les pêcheurs qui annoncent le retour des barques, dans les cérémonies tamoules (le shanku, la marche sur le feu), au 20 décembre,
// et dans les utopies qui relient nos marrons à ceux des Caraïbes. =====
function siffle253(n){try{const c=sndPret();if(!c)return;const t0=c.currentTime;for(let k=0;k<(n||3);k++){const o=c.createOscillator(),g=c.createGain(),t=t0+k*.32;o.type='sine';o.frequency.setValueAtTime(2100,t);o.frequency.exponentialRampToValueAtTime(k===(n||3)-1?1700:2900,t+.18);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.06,t+.03);g.gain.exponentialRampToValueAtTime(.001,t+.24);o.connect(g);g.connect(SND.out);o.start(t);o.stop(t+.26)}}catch(e){}}
// les sifflets : la rencontre d'une bande, le camp de l'Est qui répond, la leçon des guetteurs
{const SF=['antsiva245','campest247','renc252'];const m0=modal;let der='';modal=function(){const id=S&&S.evq&&S.evq[0];const r=m0.apply(this,arguments);
  try{const kk=id+(id==='renc252'?':'+S.renc252:'');if(id&&kk!==der&&SF.includes(id)){der=kk;siffle253(3);setTimeout(()=>siffle253(2),1400)}}catch(x){}return r}}
// quand un détachement monte : si l'on a appris les sifflets, les guetteurs préviennent les camps d'un piton à l'autre
try{const o=EV.antsiva245&&EV.antsiva245.o&&EV.antsiva245.o[0];if(o){const f0=o.f;o.f=function(){S.siff253=1;if(f0)return f0.apply(this,arguments)}}}catch(e){}
{const m0=modal;let der='';modal=function(){const id=S&&S.evq&&S.evq[0];const r=m0.apply(this,arguments);try{const e=id&&EV[id];if(e&&id!==der&&S&&!S.voieC&&S.siff253&&camps().length>=2){const tx=(e.t||'')+' '+(typeof e.b==='string'?e.b:'');if(/détachement|chasseurs? de marrons|colonne/i.test(tx)){der=id;siffle253(4);S.traque=Math.max(0,(S.traque||0)-2);if(typeof journal==='function')journal('🐦 Les guetteurs ont sifflé d’un piton à l’autre : les camps ont eu le temps de se cacher (traque −2).')}}}catch(x){}return r}}
// la conque, là où elle appartient
{const cq=v=>{try{if(typeof bruit238==='function'&&ECH236.buf.conque)bruit238('conque',v||.45)}catch(e){}};
 const m0=modal;let der='';modal=function(){const id=S&&S.evq&&S.evq[0];const r=m0.apply(this,arguments);try{const e=id&&EV[id];if(e&&id!==der){const tx=(e.t||'')+' '+(typeof e.b==='string'?e.b:'');
   if(/marche sur le feu|shanku|Fèt Kaf|20 décembre|service kabaré|kabar/i.test(tx)||/^(peche_|marines224|capucins224)/.test(id)||(/Utopie/.test(e.tag||'')&&/Haïti|Antilles|Caraïbe|Jamaïque|Marrons? des Caraïbes/i.test(tx))){der=id;cq(.45)}}}catch(x){}return r}
 // le kabar du camp s'ouvre à la conque
 const ag=agir;agir=function(t,id){const r=ag.apply(this,arguments);try{if(r!==false&&/kabar/.test(id||''))cq(.5)}catch(e){}return r}}
