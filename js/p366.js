// ===== p366 : les réglages de la Forge des combattants (artifact « Forge des combattants ») appliqués au duel.
// FORGE366 est rempli par Claude à partir de ce que Paris a envoyé depuis la Forge ; vide = valeurs d'origine. =====
window.FORGE366={"F": {"heva": {"pv": 117}, "mussard": {"arme": {"n": "Crosse du fusil", "po": 103, "d": 13}}, "colon": {"pv": 125}, "malgache": {"pv": 117, "vit": 255, "arme": {"n": "Poings nus", "po": 81, "d": 13}}, "capoeira": {"pv": 126}, "chinois": {"pv": 108, "vit": 243}, "tijean": {"vit": 270, "arme": {"n": "Bâton de goyavier", "po": 100, "d": 11}}}}; // forge envoyée le 2026-11-27T06:40:26.509Z
var FORGE366=window.FORGE366||null;
try{if(FORGE366&&typeof DUE!=='undefined'){if(FORGE366.F)for(const k in FORGE366.F)DUE.F[k]=Object.assign(DUE.F[k]||{},FORGE366.F[k]);if(FORGE366.CD&&DUE.CD)Object.assign(DUE.CD,FORGE366.CD)}}catch(e){console.warn('p366',e)}
// les pouvoirs inventés dans la Forge : une suite d'effets simples, appliqués dans l'ordre
// effets : deg (dégâts), soin, lent (s), etourdi (s), aveugle (s), poison (s), recul (px), proj (dégâts d'un projectile), chiens (nombre)
function pouvPerso366(sp,a,b,G,nom,dire,SOL){const P=FORGE366&&FORGE366.POW&&FORGE366.POW[sp];if(!P||!P.fx)return false;let ok=0;
 P.fx.forEach(f=>{const v=+f.v||0;if(f.t==='deg'){b.pv-=v*(1-(b.f.arm||0))*(b.garde?.3:1);b.touche=.15;ok=1}else if(f.t==='soin'){a.pv=Math.min(a.f.pv,a.pv+v)}else if(f.t==='lent')b.lent=v;else if(f.t==='etourdi')b.stun=Math.max(b.stun||0,v);else if(f.t==='aveugle')b.aveugle=v;else if(f.t==='poison')b.poison=v;else if(f.t==='brulure'){b.brule=v;b.bruleD=4}else if(f.t==='recul'){if(!b.garde)b.x+=a.s*v}
  else if(f.t==='proj')G.proj.push({x:a.x+a.s*40,y:SOL()-a.y-60,v:a.s*(+f.vit||450),o:a,d:v,k:f.k||'sagaie'});else if(f.t==='chiens'){for(let i=0;i<v;i++)G.chiens.push({o:a,x:a.x-a.s*30*i,pv:22,cd:0,t:9,dir:a.s})}});
 dire(nom+' !',1000);return true}
try{if(FORGE366&&FORGE366.POW&&typeof DUE!=='undefined'&&DUE.CD)for(const k in FORGE366.POW)DUE.CD[k]=+FORGE366.POW[k].cd||5}catch(e){}
