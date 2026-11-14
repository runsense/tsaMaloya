// ===== p65 : Survie — le conseil a une salle, des demandeurs, des rangs, et des colères =====
// La salle change avec l'époque (case du commandant, Conseil de la Compagnie, hôtel du gouvernement, Assemblée coloniale…, ou le kabar sous le tamarin).
// Chaque idée vient de quelqu'un : un rang, un nombre. Plus le rang est haut et les demandeurs nombreux, plus elle se fait entendre.
// Le gouverneur (ou le roi) peut trancher seul ; il reste influencé par les familles de propriétaires (ou par les anciens).
// Une idée qu'on ne met pas au vote fait baisser l'appréciation de ceux qui la portaient ; trop basse, ils se soulèvent.
const KCL={c:{proprio:{n:'Familles de propriétaires',w:5,c:'#e8be5a'},inter:{n:'Commandeurs et chasseurs',w:3,c:'#c9a46a'},dom:{n:'Domestiques (« cafres salon »)',w:2,c:'#a0c8e0'},champ:{n:'Esclaves des champs (« cafres »)',w:1,c:'#c38f6a'},gouv:{n:'Le gouverneur nommé',w:6,c:'#e87b5a'}},
 m:{roi:{n:'Famille du roi',w:5,c:'#e8be5a'},ancien:{n:'Anciens',w:4,c:'#c9b48a'},chasseur:{n:'Chasseurs et guerriers',w:2,c:'#b8d070'},cueil:{n:'Cueilleurs et travailleurs',w:1,c:'#7fc36a'}}};
const kSide=()=>K.joueur==='c'?'c':'m';
function kCls(){const C=KCL[kSide()],R={};Object.keys(C).forEach(k=>{if(k==='gouv'&&K.reg!=='nomme')return;R[k]=C[k]});return R}
function kAppr(){K.appr=K.appr||{};Object.keys(kCls()).forEach(k=>{if(K.appr[k]==null)K.appr[k]=60});return K.appr}
function kApprAj(k,d){const A=kAppr();if(A[k]==null)return;A[k]=Math.max(0,Math.min(100,A[k]+d))}
const kPouvoir=()=>K.joueur==='c'?(K.reg==='gouv'||K.reg==='nomme'):K.reg==='roi';
const kInfluents=()=>K.joueur==='c'?'proprio':'ancien';
// qui demande : d'après la faction qui propose, un rang et un nombre (une fois pour toutes)
function kDem(I){if(I.dem)return I.dem;const r=Math.random(),c=kSide()==='c'?
  ({c:'proprio',p:'proprio',s:'proprio',a:'inter',e:r<.7?'champ':r<.9?'dom':'inter'}[I.f]||'proprio'):(I.f==='e'?'cueil':r<.15?'roi':r<.35?'ancien':r<.6?'chasseur':'cueil');
 const n=c==='proprio'||c==='roi'?1+Math.floor(Math.random()*4):c==='ancien'?2+Math.floor(Math.random()*4):3+Math.floor(Math.random()*15);I.dem={c,n};return I.dem}
const kPoids=d=>d?((KCL[kSide()][d.c]||{w:1}).w*Math.sqrt(d.n)):99;
// ----- la salle, dessinée selon l'époque -----
const SALLE={};
function kSalle(){const y=K.an||1700,s=kSide(),ep=s==='m'?(y<1750?'m0':'m1'):y<1700?'c0':y<1767?'c1':y<1790?'c2':y<1803?'c3':y<1848?'c4':'c5';if(SALLE[ep])return SALLE[ep];
 const W=960,H=540,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d'),g=(a,b)=>{const l=x.createLinearGradient(0,0,0,H);l.addColorStop(0,a);l.addColorStop(1,b);return l};
 if(s==='m'){x.fillStyle=g('#0b1420','#1c1a14');x.fillRect(0,0,W,H);for(let i=0;i<120;i++){x.fillStyle='rgba(255,255,240,'+(Math.random()*.6)+')';x.fillRect(Math.random()*W,Math.random()*H*.45,1.5,1.5)}
  x.fillStyle='#141a14';x.beginPath();x.moveTo(0,300);x.lineTo(180,170);x.lineTo(330,250);x.lineTo(520,120);x.lineTo(720,240);x.lineTo(960,160);x.lineTo(960,540);x.lineTo(0,540);x.fill();
  x.fillStyle='#1f2a18';x.beginPath();x.ellipse(760,200,150,90,0,0,7);x.fill();x.fillRect(745,200,26,240);
  const f=x.createRadialGradient(480,430,5,480,430,220);f.addColorStop(0,'rgba(255,170,60,.9)');f.addColorStop(.25,'rgba(200,90,30,.45)');f.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=f;x.fillRect(0,200,W,340);
  for(let i=0;i<9;i++){const a=Math.PI+i*Math.PI/8,px=480+Math.cos(a)*260,py=440+Math.sin(a)*70;x.fillStyle='#0d0d0b';x.beginPath();x.arc(px,py-48,13,0,7);x.fill();x.fillRect(px-14,py-36,28,40)}
  if(ep==='m1'){x.fillStyle='#2a2016';x.fillRect(80,330,120,80);x.fillStyle='#3a2a18';x.beginPath();x.moveTo(70,330);x.lineTo(140,280);x.lineTo(210,330);x.fill()}}
 else{const mur={c0:['#5a4028','#3a2818'],c1:['#6a5236','#3e2e1e'],c2:['#7a6a52','#4a3e2e'],c3:['#5a5a62','#33333a'],c4:['#6a5a4a','#3a3028'],c5:['#5a6252','#2e3428']}[ep];x.fillStyle=g(mur[0],mur[1]);x.fillRect(0,0,W,H);
  if(ep==='c0'){for(let i=0;i<W;i+=48){x.fillStyle=i%96?'rgba(0,0,0,.12)':'rgba(255,255,255,.04)';x.fillRect(i,0,46,360)}x.fillStyle='#2a1c10';x.fillRect(0,350,W,190)}
  else{x.fillStyle='rgba(0,0,0,.18)';for(let i=60;i<W;i+=150)x.fillRect(i,40,110,240);x.fillStyle='#2a1c10';x.fillRect(0,360,W,180);
   [200,480,760].forEach(px=>{const l=x.createLinearGradient(0,60,0,280);l.addColorStop(0,'#9fc4d8');l.addColorStop(1,'#5a7a8a');x.fillStyle=l;x.fillRect(px-45,60,90,210);x.fillStyle='#3a2a18';x.fillRect(px-2,60,4,210);x.fillRect(px-45,160,90,4)})}
  if(ep==='c1'||ep==='c2'){x.fillStyle='#3a2a18';x.fillRect(430,30,100,120);x.fillStyle='#8a6a4a';x.fillRect(440,40,80,100)}
  if(ep==='c2'||ep==='c4'){x.strokeStyle='#d8c58a';x.lineWidth=3;x.beginPath();x.moveTo(480,0);x.lineTo(480,40);x.stroke();for(let i=0;i<8;i++){x.beginPath();x.arc(480+Math.cos(i*.8)*40,52,4,0,7);x.fillStyle='#f8e6a0';x.fill()}}
  if(ep==='c3'||ep==='c5'){[[60,'#1f3a8a'],[90,'#f4f1ea'],[120,'#c8262e']].forEach(([px,col])=>{x.fillStyle=col;x.fillRect(px,40,30,300);x.fillRect(W-px-30,40,30,300)})}
  x.fillStyle='#4a2a14';x.fillRect(180,380,600,30);x.fillStyle='#2a6a3a';x.fillRect(180,372,600,10);
  for(let i=0;i<8;i++){const px=210+i*78;x.fillStyle='#1a1410';x.beginPath();x.arc(px,350,14,0,7);x.fill();x.fillRect(px-16,362,32,40);x.fillStyle=ep==='c0'||ep==='c1'||ep==='c2'?'rgba(230,230,220,.6)':'rgba(30,30,30,.0)';x.beginPath();x.arc(px,344,12,Math.PI,0);x.fill()}}
 return SALLE[ep]=c.toDataURL('image/jpeg',.8)}
// ----- le conseil, augmenté -----
function kCoAugmente(b){if(!b)return;const box0=b.querySelector('.pjb');if(!box0||box0.querySelector('.p65H'))return;
 b.style.background='linear-gradient(rgba(8,8,6,.55),rgba(8,8,6,.78)),url('+kSalle()+') center/cover';const box=b.querySelector('.pjb');if(!box)return;box.style.background='rgba(20,18,14,.86)';
 const A=kAppr(),C=kCls(),reg=K.joueur==='c'?{gouv:'un gouverneur (vous)',nomme:'un gouverneur nommé par le roi',conseil:'le conseil des habitants'}[K.reg]||'— à décider —':{roi:'un roi (vous), conseillé par les anciens',kabar:'le kabar, sans roi'}[K.reg]||'— à décider —';
 let h=box.querySelector('.p65H');if(!h){h=document.createElement('div');h.className='p65H';const t=box.querySelector('h2');t&&t.after(h)}
 h.innerHTML='<p class="note" style="margin:2px 0 6px">Gouverné par : <b>'+reg+'</b>'+(kPouvoir()?' · vous pouvez trancher seul, mais '+(K.joueur==='c'?'les familles de propriétaires':'les anciens')+' s’en souviennent':' · tout se décide au vote')+'</p><div style="display:flex;flex-wrap:wrap;gap:6px 14px;margin-bottom:8px">'+
  Object.keys(C).map(k=>'<span style="min-width:150px;font-size:12px"><span style="color:'+C[k].c+'">'+C[k].n+'</span><span style="display:block;height:6px;background:#3a3226;border-radius:3px"><span style="display:block;height:6px;border-radius:3px;width:'+Math.round(A[k])+'%;background:'+(A[k]<25?'#e87b5a':A[k]<45?'#e8be5a':'#7fc36a')+'"></span></span></span>').join('')+'</div>';
 // qui demande chaque idée ; les idées portées par peu de monde, ou de bas rang, restent à peine entendues
 box.querySelectorAll('[data-vo]').forEach(v=>{const n=+v.dataset.vo,I=K.idees[n],card=v.closest('.pc');if(!I||!card||card.querySelector('.p65D'))return;const d=kDem(I);if(!d)return;const cl=KCL[kSide()][d.c],p=kPoids(d),faible=p<4&&!I.porte;
  const s=document.createElement('div');s.className='p65D';s.style.cssText='font-size:12px;margin:2px 0 4px';s.innerHTML='Demandée par <b style="color:'+cl.c+'">'+d.n+' '+cl.n.toLowerCase()+'</b>'+(faible?' · <i>à peine entendue</i> <button class="bt sec" style="font-size:11px;padding:1px 6px" data-po="'+n+'">La porter au conseil (2 '+(K.joueur==='c'?'commerce':'savoir')+')</button>':'');card.insertBefore(s,card.children[1]||null);
  if(faible){card.style.opacity='.6';card.querySelectorAll('[data-vo],[data-im]').forEach(x=>x.disabled=true)}});
 if(!kPouvoir())box.querySelectorAll('[data-im]').forEach(x=>x.remove());
 box.querySelectorAll('[data-po]').forEach(x=>x.onclick=e=>{e.stopPropagation();const mo=K.joueur==='c'?'com':'sav';if((K.res[mo]||0)<2){toast('Il en faut 2.');return}K.res[mo]-=2;const I=K.idees[+x.dataset.po];I.porte=1;const c=x.closest('.pc');c.style.opacity='';c.querySelectorAll('button').forEach(y=>y.disabled=false);x.parentElement.innerHTML=x.parentElement.innerHTML.replace(/ · <i>.*$/,' · portée au conseil')})}
// on suit ce qui se décide : voter apaise, écarter ou ne pas voter blesse, trancher contre les influents coûte cher
addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#kCoB button');if(!t||typeof K==='undefined'||!K)return;const ds=t.dataset;
 const dem=n=>{const I=K.idees[+n];return I?kDem(I):null};
 if(ds.vo!=null){const d=dem(ds.vo);if(d){const I=K.idees[+ds.vo],c=kCompte(I);kApprAj(d.c,c.pour>c.contre?4:-2)}}
 else if(ds.im!=null){const I=K.idees[+ds.im],d=dem(ds.im);if(d)kApprAj(d.c,4);const inf=kInfluents(),fv=K.joueur==='c'?'p':'m';if(I&&K.fac[fv]&&kVoteDe(fv,I)<0)kApprAj(inf,-8);else kApprAj(inf,-2)}
 else if(ds.ve!=null){const d=dem(ds.ve);if(d)kApprAj(d.c,-Math.round(6+d.n/3))}
 else if(t.id==='kCoF'){(K.idees||[]).forEach(I=>{const d=kDem(I);if(d)kApprAj(d.c,-Math.round(3+d.n/5))});if(K.idees.length)kLog('Le conseil se clôt sans voter '+K.idees.length+' demande'+(K.idees.length>1?'s':'')+' : on s’en souviendra.')}},true);
new MutationObserver(()=>{try{const b=$('kCoB');if(b)kCoAugmente(b)}catch(e){}}).observe(document.documentElement,{childList:true,subtree:true});
// ----- les colères -----
const KREV={c:{champ:['Des esclaves des champs fuient dans les Hauts et mettent le feu à un champ.',K=>{if(K.fac.e)K.fac.e.pop=Math.max(0,K.fac.e.pop-4);K.res.viv-=5;K.tension=(K.tension||0)+8}],
  dom:['Les domestiques de la maison refusent le service ; on murmure qu’on a voulu empoisonner le maître.',K=>{K.domGreve=3;K.tension=(K.tension||0)+5}],
  inter:['Commandeurs et chasseurs laissent faire : les champs ralentissent, les détachements ne montent plus.',K=>{K.res.com=Math.max(0,(K.res.com||0)-5);K.res.viv-=3;K.tension=(K.tension||0)+4}],
  proprio:['Les familles de propriétaires se soulèvent contre l’administration.',K=>{if(K.reg==='gouv'){K.reg='conseil';kLog('Le gouverneur est renvoyé : le conseil des habitants gouverne.')}K.res.com=Math.max(0,(K.res.com||0)-5);K.tension=(K.tension||0)+8}],
  gouv:['Le gouverneur nommé passe outre le conseil et gouverne par ordonnances.',K=>{K.tension=(K.tension||0)+5}]},
 m:{cueil:['Des familles quittent le camp pour en fonder un autre plus haut.',K=>{if(K.fac.m)K.fac.m.pop=Math.max(0,K.fac.m.pop-4);K.tension=(K.tension||0)+5}],
  chasseur:['Les guerriers refusent de monter la garde.',K=>{K.tension=(K.tension||0)+7}],
  ancien:['Les anciens retirent leur bénédiction : les savoirs ne se transmettent plus.',K=>{K.res.sav=Math.max(0,(K.res.sav||0)-5)}],
  roi:['La famille du roi se dresse contre lui : le kabar reprend la main.',K=>{if(K.reg==='roi')K.reg='kabar';K.tension=(K.tension||0)+6}]}};
{const km=kMois;kMois=function(){km.apply(this,arguments);try{if(!K||K.fin)return;if(K.domGreve>0)K.domGreve--;const A=kAppr();Object.keys(A).forEach(k=>{if(A[k]<20){const R=KREV[kSide()][k];if(!R)return;R[1](K);kLog('✊ '+R[0]);toast(R[0]);A[k]=45}else if(A[k]<60)A[k]+=.3})}catch(e){}}}
// la grève des domestiques : personne pour la maison pendant quelques mois
{const kp=kPools;kPools=function(){const R=kp.apply(this,arguments);if(K&&K.domGreve>0&&R.dom!=null)R.dom=0;return R}}
// ----- au tout début : se donner un gouverneur (ou un roi), ou non — on vote -----
function kVoteRegime(){if(!K||K.reg)return;const c=K.joueur==='c',b=document.createElement('div');b.id='kReg';b.style.cssText='position:fixed;inset:0;z-index:95;display:flex;align-items:center;justify-content:center;background:linear-gradient(rgba(8,8,6,.5),rgba(8,8,6,.78)),url('+kSalle()+') center/cover';
 const L=c?[['gouv','Un gouverneur','Il tranche quand il le veut. Les commandeurs et les chasseurs sont pour : un chef fort les protège.',{inter:1,proprio:-1}],['conseil','Le conseil des habitants','Tout passe au vote. Les familles de propriétaires sont pour : leur voix y pèse lourd.',{proprio:1,inter:-1}]]
  :[['roi','Un roi','Il décide, conseillé par les anciens. Les chasseurs et la famille du chef sont pour.',{chasseur:1,roi:1,cueil:-1}],['kabar','Le kabar, sans roi','Tout se dit autour du feu et se vote. Les cueilleurs et les anciens sont pour.',{cueil:1,ancien:1,chasseur:-1}]];
 const voix=o=>Object.entries(o[3]).reduce((s,[k,v])=>s+(v>0?(KCL[kSide()][k]||{w:1}).w:0),0);
 b.innerHTML='<div class="pjb" style="max-width:640px;background:rgba(20,18,14,.9)"><small>'+(c?'Le premier conseil de la colonie':'Le premier kabar')+'</small><h2>'+(c?'Être administrés par un gouverneur ?':'Se donner un roi ?')+'</h2>'+
  L.map((o,i)=>'<div class="pc" style="margin:8px 0;padding:8px;border:1px solid #3a3226;border-radius:6px"><b>'+o[1]+'</b><br><small>'+o[2]+'</small><br><small>Voix pour : '+voix(o)+'</small><br><button class="bt" data-rg="'+i+'">Voter pour</button></div>').join('')+'<p class="note">Le côté qui perd s’en souviendra un temps.</p></div>';
 document.body.appendChild(b);b.querySelectorAll('[data-rg]').forEach(x=>x.onclick=()=>{const o=L[+x.dataset.rg];K.reg=o[0];kAppr();Object.entries(o[3]).forEach(([k,v])=>kApprAj(k,v>0?6:-10));kLog('Premier '+(c?'conseil':'kabar')+' : '+o[1].toLowerCase()+'.');b.remove();kSauve();kRendu()})}
{const kr=kRendu;kRendu=function(){const r=kr.apply(this,arguments);try{if(K&&!K.reg&&!K.fin&&!$('kReg')&&$('kons')&&!$('kons').hidden)setTimeout(kVoteRegime,400)}catch(e){}return r}}
