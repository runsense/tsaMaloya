// ===== p95 : choisir la destination sur la vraie carte ; les portes qui s'ouvrent ; les chiffres partout en fractions avec l'entrée et la sortie du jour =====

// ----- 1. Choisir où l'on envoie un groupe : sur la carte normale (plus de petite carte du connu), avec un bandeau pour annuler -----
{const cc=carteConnu;carteConnu=function(o){if(o&&o.mode==='dest'&&S&&!modeHist()){try{if(CV.on)cvFermer()}catch(e){}dest95(o);return}return cc.apply(this,arguments)}}
function dest95(o){let d=$('dest95');if(!d){d=document.createElement('div');d.id='dest95';d.style.cssText='position:fixed;left:50%;top:44px;transform:translateX(-50%);z-index:9650;background:#1a140ce6;color:#f4ead6;border:1px solid #e8be5a;border-radius:10px;padding:8px 14px;font:600 13px Montserrat,system-ui,sans-serif;display:flex;gap:10px;align-items:center';document.body.appendChild(d)}
 d.innerHTML='<span>🧭 '+(o.titre||'Choisir la destination')+' : touchez une case sur la carte'+(o.pm?' (les cases qui clignotent sont à portée des vivres : '+o.pm+' cases)':'')+'</span><button style="font:600 12px Montserrat;border-radius:999px;padding:3px 10px;border:0;background:#b5412b;color:#fff;cursor:pointer">Annuler</button>';
 d.querySelector('button').onclick=()=>{window.choixExp=null;d.remove();try{if(o.annule)o.annule();panneau()}catch(e){}};
 const fin=setInterval(()=>{if(!window.choixExp){clearInterval(fin);const x=$('dest95');if(x)x.remove()}},300)}

// ----- 2. Les portes : un battant qui s'ouvre quand on entre au camp, dans un lieu, ou qu'on en sort -----
{const st=document.createElement('style');st.textContent='#porte95{position:fixed;inset:0;z-index:9800;pointer-events:none;perspective:1200px;display:flex}#porte95 i{flex:1;background:repeating-linear-gradient(90deg,#5a3c22 0 38px,#4a3018 38px 42px),#5a3c22;box-shadow:inset 0 0 40px #0009;transition:transform .7s ease-in}#porte95 i:first-child{transform-origin:left center}#porte95 i:last-child{transform-origin:right center}#porte95.ouv i:first-child{transform:rotateY(-100deg)}#porte95.ouv i:last-child{transform:rotateY(100deg)}#porte95 b{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font:700 22px Alegreya,Georgia,serif;color:#f4ead6;text-shadow:0 2px 8px #000;transition:opacity .4s}#porte95.ouv b{opacity:0}';document.head.appendChild(st)}
function porte95(txt){if(!S||modeHist())return;const o=$('porte95');if(o)o.remove();const d=document.createElement('div');d.id='porte95';d.innerHTML='<i></i><i></i><b>'+(txt||'')+'</b>';document.body.appendChild(d);requestAnimationFrame(()=>requestAnimationFrame(()=>d.classList.add('ouv')));setTimeout(()=>d.remove(),900)}
{const co=cvOuvrir;cvOuvrir=function(ci){const was=CV.on;const r=co.apply(this,arguments);try{if(!was&&CV.on&&!VP)porte95(S.voieC?'L’habitation':'Le camp')}catch(e){}return r}}
{const cf=cvFermer;cvFermer=function(){const was=CV.on;const r=cf.apply(this,arguments);try{if(was&&!VP&&!window.choixExp)porte95('La carte')}catch(e){}return r}}
{const ol=ouvrirLieu;ouvrirLieu=function(t){const r=ol.apply(this,arguments);try{if(lieu)porte95(lieuDe(t)||lieuProche(t)||'')}catch(e){}return r}}
// dans la vue personnage : chaque case a une porte, qui s'ouvre quand quelqu'un passe devant pour entrer ou sortir
function vpPortes(){const V=VP;if(!V||V.portes95||VPLIEU&&VPLIEU.g)return;V.portes95=[];V.sc.children.forEach(o=>{const g=o.geometry;if(!(o.isMesh&&g&&g.type==='BoxGeometry'&&g.parameters&&g.parameters.width===2.4))return;
 const cx=o.position.x,cz=o.position.z,a=Math.atan2(0-cx,-30-cz),piv=new THREE.Group();piv.position.set(cx+Math.sin(a)*1.01-Math.cos(a)*.3,o.position.y-.8+.02,cz+Math.cos(a)*1.01+Math.sin(a)*.3);piv.rotation.y=a;
 const d=new THREE.Mesh(new THREE.BoxGeometry(.6,1.15,.05).translate(.3,.575,0),new THREE.MeshLambertMaterial({color:0x5a3c22}));try{if(typeof tx91==='function'){d.material.map=tx91('ecorce',1);d.material.color.setHex(0x9a7a58)}}catch(e){}piv.add(d);V.sc.add(piv);V.portes95.push({piv,d,x:cx+Math.sin(a)*1.4,z:cz+Math.cos(a)*1.4,ouv:0})})}
{const vb=vpBoucle;let last=performance.now();vpBoucle=function(){const now=performance.now(),dt=Math.min(.1,(now-last)/1000);last=now;vb.apply(this,arguments);try{const V=VP;if(!V||!V.p84)return;if(!V.portes95)vpPortes();
 const L=[V.chef].concat(V.cp,V.vil||[]);(V.portes95||[]).forEach(p=>{const pres=L.some(o=>o&&Math.hypot(o.x-p.x,o.z-p.z)<1.8);p.ouv+=((pres?1:0)-p.ouv)*Math.min(1,dt*4);p.d.rotation.y=-p.ouv*1.6})}catch(e){}}}

// ----- 3. Partout les mêmes chiffres : ce qu'on a / le besoin du jour, et ce qui entre (bleu) ou sort (rouge) chaque jour -----
function flux95(){const ci=(camps()[0]||{}).i,P=(S.pp||[]).filter(p=>!enGrp(p)&&(ci==null||campDe(p)===ci));let ent=0;
 P.forEach(p=>{const t=tacheDe(p),ad=adulte(p);if(['cueil','chasse','peche','cuisine','champ'].includes(t))ent+=ad?.45:.15;else if(ad&&!['garde','soin'].includes(t))ent+=.08});
 if(S.dirCamp==='chasse')ent+=P.filter(p=>tacheDe(p)==='chasse').length*.08;if(S.dirCamp==='nature')ent+=P.filter(p=>tacheDe(p)==='cueil').length*.08;
 const sort=(S.pp||[]).filter(p=>!enGrp(p)).reduce((s,p)=>s+(typeof FAIM!=='undefined'?FAIM.conso(p):.3),0);return {ent:Math.round(ent*10)/10,sort:Math.round(sort*10)/10}}
const FR95=(v,b,e,s)=>'<b class="num">'+v+'<small style="opacity:.75">/'+b+'</small></b>'+(e!=null?' <small style="color:#7ab8ff;font-weight:700">+'+String(e).replace('.',',')+'</small>':'')+(s!=null?' <small style="color:#ff8a7a;font-weight:700">−'+String(s).replace('.',',')+'</small>':'');
function stats95(){if(!S||modeHist()||!grpOn())return;const d=$('stats');if(!d)return;const F=flux95();
 d.querySelectorAll('.st').forEach(x=>{const lab=(x.querySelector('small')||{}).textContent||'',b=x.querySelector('b.num');if(!b||x.dataset.f95===String(S.jourN)+lab+b.textContent)return;
  let h=null;if(lab==='Vivres')h=FR95(Math.floor(S.vivres||0),Math.ceil(F.sort),F.ent,F.sort);
  else if(/^(Santé|Cohésion|Traque|Colonie|Menace marronne)$/.test(lab)){const v=parseInt(b.textContent);if(!isNaN(v))h=FR95(v,100)}
  else if(/^(Mystique)$/.test(lab)){const v=parseFloat(b.textContent);if(!isNaN(v))h=FR95(v,20)}
  if(h){b.outerHTML=h;x.dataset.f95=String(S.jourN)+lab+(x.querySelector('b.num')||{}).textContent;x.title=lab+' : ce qu’on a / '+(lab==='Vivres'?'le besoin du jour':'le maximum')+(lab==='Vivres'?' ; en bleu ce qui entre chaque jour, en rouge ce qui sort':'')}})}
setInterval(()=>{try{stats95()}catch(e){}},700);
// la barre du camp : même écriture
setInterval(()=>{try{const r=$('cvRes');if(!r||!S)return;const F=flux95(),v=Math.floor(S.vivres||0),s=r.querySelector('span');if(!s)return;const h='🍲 '+FR95(v,Math.ceil(F.sort),F.ent,F.sort)+' vivres';if(s._h95!==h){s.innerHTML=h;s._h95=h;s.title='Ce qu’on a / le besoin du jour ; en bleu ce qui entre chaque jour, en rouge ce qui sort'}}catch(e){}},700);
{const go=()=>{const d=$('stats');if(!d){setTimeout(go,600);return}new MutationObserver(()=>{try{setTimeout(stats95,0)}catch(e){}}).observe(d,{childList:true,subtree:true})};go()}
