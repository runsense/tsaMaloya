
// ===== p128 : le camp n'est plus une scène à part — entrer dans le camp, c'est zoomer tout près sur la carte =====
// La vue du camp garde ses panneaux (les gens à droite, les besoins et les enfants en bas, la ligne du chef en haut),
// mais au centre on voit la vraie île : les mêmes cases, le même sol, le même relief, les gens qui vivent sur la carte.
window.CAMPMAP128=1;
{const st=document.createElement('style');st.textContent='body.cm128 #campV{background:transparent!important;pointer-events:none}body.cm128 #campV .cvh,body.cm128 #campV #cvRow127,body.cm128 #cvL,body.cm128 #cvBas>*{pointer-events:auto}body.cm128 #campV .cvh,body.cm128 #campV #cvRow127,body.cm128 #cvL{background:#14110d}body.cm128 #top,body.cm128 #bas,body.cm128 #side,body.cm128 #drawer,body.cm128 #labels,body.cm128 #sortie,body.cm128 #cvBtn,body.cm128 #cmdB114,body.cm128 #tab122{display:none!important}body.cm128 #cvC{visibility:hidden}';document.head.appendChild(st)}
const CM128={dist:0};
function cm128Cadre(){try{const t=T[CV.camp];if(!t)return;camGo=null;camT.set(t.x,t.alt*VX,t.z);dist=3.4;pol=1.0;
 if(lieu!==t){const c=camT.clone(),d=dist,p=pol,a=az;ouvrirLieu(t);camT.copy(c);dist=d;pol=p;az=a;LA97=lieu;const so=$('sortie');if(so)so.hidden=true}}catch(e){}}
{const co=cvOuvrir;cvOuvrir=function(ci){const avant=CV.on;const r=co.apply(this,arguments);try{if(!window.CAMPMAP128||!CV.on)return r;document.body.classList.add('cm128');window.BTUON=0;if(!avant)CM128.dist=dist;cm128Cadre()}catch(e){}return r}}
{const cf=cvFermer;cvFermer=function(){const was=CV.on;const r=cf.apply(this,arguments);try{document.body.classList.remove('cm128');if(was&&window.CAMPMAP128){dist=Math.max(9,CM128.dist||10);pol=.85}}catch(e){}return r}}
// la scène à part ne se dessine plus (elle coûtait cher et faisait double emploi)
{const pb=p3Boucle;p3Boucle=function(){if(window.CAMPMAP128&&CV.on){window.BTUON=0;return}return pb.apply(this,arguments)}}
// changer de camp par les onglets : la caméra suit
{let cam=null;setInterval(()=>{try{if(!window.CAMPMAP128||!CV.on){cam=null;CM128.ess=null;return}window.BTUON=0;if(cam!==CV.camp){cam=CV.camp;cm128Cadre()}const tc=T[CV.camp];if(tc&&lieu!==tc&&dist<8&&CM128.ess!==CV.camp){CM128.ess=CV.camp;const c=camT.clone(),d=dist,p=pol,a=az;try{fermerLieu(true)}catch(e){}ouvrirLieu(tc);camT.copy(c);dist=d;pol=p;az=a;LA97=lieu;const so=$('sortie');if(so)so.hidden=true}
 // on reste au camp tant qu'on ne dézoome pas franchement ; au-delà, on sort sur la carte
 if(dist>9){cvFermer()}}catch(e){}},300)}
