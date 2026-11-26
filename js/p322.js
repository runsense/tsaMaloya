// ===== p322 : le menu de la case se lit d'un coup d'œil — chaque choix a sa couleur selon son importance, en dégradé :
// l'entrée dans le camp (ou le village) en relief, en or ; incarner en ambre ; les actions en vert ; les constructions en brun ;
// ce qui détruit ou attaque en rouge ; voir et ranger en gris-bleu. Ce qui n'est pas encore possible descend à la fin, éteint. =====
function rang322(l){const n=String(l[0]).replace(/<[^>]+>/g,''),s=String(l[2]||'');
 if(/Entrer dans le (camp|village)|Ouvrir le camp/.test(n))return 'entrer';
 if(/Incarner|en personne/.test(n))return 'incarner';
 if(/Lever le camp|Abandonner|descente|embuscade|Attaquer|Combattre|course en mer|Raser/i.test(n))return 'danger';
 if(/Coûte|Garde des|\+\d+ places/.test(s))return 'bati';
 if(/Zoomer|carte|Tous les camps|Sauvegarder|pause|Reprendre le temps|Trier|Contacter/i.test(n))return 'vue';
 return 'action'}
const ORD322={entrer:0,incarner:1,action:2,danger:3,bati:4,vue:5};
{const st=document.createElement('style');st.textContent=
 '#mCtx button.r322{border-radius:9px!important;margin:3px 0!important;border:1px solid transparent!important;transition:filter .15s}#mCtx button.r322:not(.non):hover{filter:brightness(1.18)}'+
 '#mCtx button.k-entrer{background:linear-gradient(100deg,#e8be5a 0%,#c8862a 55%,#8a4a1a 100%)!important;color:#1e1408!important;font-size:16px!important;font-weight:700!important;padding:10px 12px!important;border-color:#ffe09a!important;box-shadow:0 0 0 1px rgba(255,224,154,.35),0 4px 16px rgba(232,190,90,.35),inset 0 1px 0 rgba(255,255,255,.4)!important;text-shadow:0 1px 0 rgba(255,240,200,.5)}'+
 '#mCtx button.k-entrer small{color:#3a2410!important;opacity:.9!important}'+
 '#mCtx button.k-incarner{background:linear-gradient(100deg,rgba(214,140,60,.55),rgba(120,70,30,.35))!important;border-color:rgba(232,170,90,.6)!important}'+
 '#mCtx button.k-action{background:linear-gradient(100deg,rgba(90,160,100,.42),rgba(40,80,50,.22))!important;border-color:rgba(120,190,130,.35)!important}'+
 '#mCtx button.k-danger{background:linear-gradient(100deg,rgba(190,70,50,.5),rgba(90,30,24,.28))!important;border-color:rgba(220,110,90,.45)!important}'+
 '#mCtx button.k-bati{background:linear-gradient(100deg,rgba(150,110,70,.42),rgba(70,50,30,.22))!important;border-color:rgba(190,150,100,.3)!important}'+
 '#mCtx button.k-vue{background:linear-gradient(100deg,rgba(90,120,140,.32),rgba(40,55,65,.18))!important;border-color:rgba(130,170,190,.25)!important}'+
 '#mCtx button.non.r322{background:rgba(255,255,255,.03)!important;border-color:rgba(255,255,255,.06)!important;opacity:.5!important}'+
 '#mCtx .sep322{font:600 10.5px system-ui;letter-spacing:.08em;text-transform:uppercase;color:#a08a6a;margin:10px 2px 2px;border-top:1px solid rgba(160,138,106,.3);padding-top:6px}';
 document.head.appendChild(st)}
{const R=window.RENDU164;if(R)window.RENDU164=function(x,y,titre,L){let M=L;try{M=L.map((l,i)=>({l,i,k:rang322(l)})).sort((a,b)=>(!!a.l[3])-(!!b.l[3])||ORD322[a.k]-ORD322[b.k]||a.i-b.i);const KS=M.map(o=>o.k);M=M.map(o=>o.l);
  const r=R.call(this,x,y,titre,M);const m=$('mCtx');if(m){let sep=0;m.querySelectorAll('button[data-i]').forEach(b=>{const i=+b.dataset.i;b.classList.add('r322','k-'+KS[i]);if(M[i][3]&&!sep){sep=1;const d=document.createElement('div');d.className='sep322';d.textContent='Pas encore possible';b.before(d)}});
   m.style.top=Math.max(6,Math.min(parseFloat(m.style.top)||y,innerHeight-m.offsetHeight-8))+'px'}return r}catch(e){console.warn(e);return R.apply(this,arguments)}}}
