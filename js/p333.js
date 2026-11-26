// ===== p333 : « Nouvelle partie » mène bien à « Quelle histoire ? ». Le bouton avait été relié à l'ancien écran
// « Comment jouer ? Histoire / Vie / Survie » au moment où le menu se construit, avant que p315 ne le remplace :
// il gardait l'ancien. On le relie maintenant à l'écran du moment, à chaque fois que le menu se redessine. =====
setInterval(()=>{try{const b=$('nv');if(b&&!b.dataset.p333){b.dataset.p333=1;b.onclick=()=>choixDif()}const k=$('kOuv');if(k)k.style.display='none'}catch(e){}},300);
