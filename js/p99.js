// ===== p99 : Histoire — la mystique ouvre des pouvoirs par paliers ; des plantes et des pierres qu'on ne trouve que dans certaines zones de l'île =====
// Plus la mystique monte, plus les pouvoirs sont forts : des passifs (toujours actifs) et des rites qui demandent des plantes ou des pierres.
// Ces ingrédients ne viennent que de certains microclimats. Dans une uchronie mystique (la voie des anciens, l'éveil), tout est plus puissant,
// et les rois marrons et les camps gagnent en force.
const LL99=t=>({lon:t.x/DEM.kx+DEM.lo0,lat:DEM.la1-t.z/DEM.ky});
const ING99={
 ambaville:{n:'Ambaville (bois de l’ambaville)',ic:'🌼',ou:'les Hauts secs, au-dessus de 1 200 m (Maïdo, Plaine des Cafres)',ok:t=>{const g=LL99(t);return t.alt>1200&&t.alt<2400&&g.lon<55.62&&!t.bare}},
 faham:{n:'Faham (orchidée des Hauts)',ic:'🌸',ou:'les forêts humides de l’Est, entre 500 et 1 500 m',ok:t=>{const g=LL99(t);return t.forest&&t.alt>500&&t.alt<1500&&g.lon>55.55}},
 fandamane:{n:'Goyave marron (fandamane, change-écorce)',ic:'🍃',ou:'les forêts des Hauts sous le Vent, entre 800 et 1 600 m',ok:t=>{const g=LL99(t);return t.forest&&t.alt>800&&t.alt<1600&&g.lon<55.5}},
 olivine:{n:'Olivine (pierre verte)',ic:'💚',ou:'les coulées du volcan, dans le Sud-Est',ok:t=>{const g=LL99(t);return g.lon>55.6&&g.lat<-21.12}},
 zeolithe:{n:'Zéolithe',ic:'🔷',ou:'les basaltes creusés des cirques et de l’Est',ok:t=>{const g=LL99(t);return t.alt>500&&g.lon>55.4&&g.lon<55.6&&g.lat>-21.18&&g.lat<-21.0}},
 galet:{n:'Galet sacré',ic:'🪨',ou:'le lit des rivières',ok:t=>!!t.riv&&!t.bare}};
function ing99(){S.ing99=S.ing99||{};return S.ing99}
function mystique99(){return (S&&S.myst)||0}
function utopieMyst99(){const b=S&&S.br||{};return !!(b.anc||b.eveil||b.ombre||S.leg||S.uchLum&&false)}
const PAL99=[
 {m:4,n:'Les esprits du sentier',d:'Chaque saison, la traque baisse un peu : les esprits brouillent les pistes.',f:k=>{fx({traque:-1*k})}},
 {m:8,n:'La forêt veille',d:'Chaque saison, la cohésion monte : on sent la forêt avec soi.',f:k=>{fx({coh:1*k})}},
 {m:12,n:'Les rois sorciers',d:'Les rois des camps deviennent plus puissants : chaque saison, des vivres en plus et une traque plus faible.',f:k=>{fx({vivres:Math.round(2*k),traque:-1*k})}},
 {m:16,n:'L’île se défend',d:'Les cyclones épargnent davantage les camps ; les détachements se perdent en montant.',f:k=>{fx({sante:1*k,traque:-1*k})}}];
const RITE99=[
 {k:'brume',n:'La brume d’ambaville',m:5,c:{ambaville:2},d:'Un rideau de brume sur les Hauts : traque −8.',f:k=>fx({traque:-8*k})},
 {k:'galet',n:'Le galet qui guérit',m:6,c:{galet:1,fandamane:1},d:'On soigne les blessés et les fiévreux : santé +10.',f:k=>fx({sante:Math.round(10*k)})},
 {k:'faham',n:'Le faham des ancêtres',m:10,c:{faham:2,zeolithe:1},d:'Les anciens parlent par les songes : cohésion +6, savoir +2.',f:k=>fx({coh:Math.round(6*k),savoir:Math.round(2*k)})},
 {k:'olivine',n:'La pierre verte du volcan',m:14,c:{olivine:2,galet:1},d:'Les chasseurs de marrons ont peur de monter : traque −10, colonie −4.',f:k=>fx({traque:-10*k,ami:-4})},
 {k:'montagne',n:'Le réveil de la montagne',m:20,c:{olivine:3,zeolithe:2,ambaville:2},d:'Seulement dans une histoire mystique : la Fournaise gronde pour les camps. Traque −20, cohésion +8.',si:()=>utopieMyst99(),f:k=>fx({traque:-20,coh:8})}];
// chercher un ingrédient : là où il pousse ou affleure seulement
{const a0=actions;actions=function(t){const A=a0(t);try{if(!S||!modeHist()||S.voieC||!t||!(S.t[t.i]||{}).s)return A;for(const k in ING99){const I=ING99[k];if(I.ok(t)&&!A.find(a=>a.id==='ing_'+k))A.push({id:'ing_'+k,n:I.ic+' Chercher : '+I.n.toLowerCase(),c:1,d:'On ne la trouve que dans '+I.ou+'. Sert aux rites mystiques.'})}}catch(e){}return A}}
{const g0=agir;agir=function(t,id,l){if(!/^ing_/.test(id||''))return g0.apply(this,arguments);const k=id.slice(4),I=ING99[k];if(!I)return false;if(!l){if(S.bras<1)return false;snap();S.bras-=1}const n=1+(rnd()<.35?1:0);ing99()[k]=(ing99()[k]||0)+n;log(I.ic+' On rapporte '+n+' '+I.n.toLowerCase()+' de '+(lieuDe(t)||lieuProche(t)||'ces hauteurs')+'.');try{sauve();panneau();rafraichir()}catch(e){}return true}}
// les passifs, chaque saison
{const sa=saison;saison=function(){const r=sa.apply(this,arguments);try{if(!S||!modeHist()||S.voieC)return r;const m=mystique99(),k=utopieMyst99()?1.5:1;PAL99.forEach(P=>{if(m>=P.m)P.f(k)})}catch(e){}return r}}
// le panneau « Pouvoirs » : paliers, ingrédients, rites
function pouv99Html(){const m=mystique99(),I=ing99(),k=utopieMyst99();let h='<h3 style="font-size:17px">Pouvoirs de la mystique</h3><p class="note" style="font-size:13px">Mystique : <b>'+m+'</b>'+(k?' · histoire mystique : les pouvoirs sont plus forts':'')+'. Plus elle monte, plus les pouvoirs s’ouvrent.</p>';
 h+=PAL99.map(P=>'<div class="sv'+(m>=P.m?' ok':'')+'" style="display:block"><b>'+(m>=P.m?'✦ ':'🔒 ')+P.n+'</b> <small>· passif · mystique '+P.m+'</small><small>'+P.d+'</small></div>').join('');
 h+='<h3 style="font-size:16px;margin-top:10px">Plantes et pierres</h3><p class="note" style="font-size:12px">Elles ne se trouvent que dans certaines zones de l’île : touchez une case de la bonne zone, puis « Chercher ».</p>'+Object.entries(ING99).map(([q,J])=>'<div style="font-size:13px">'+J.ic+' <b>'+J.n+'</b> : '+(I[q]||0)+' <small style="opacity:.7">— '+J.ou+'</small></div>').join('');
 h+='<h3 style="font-size:16px;margin-top:10px">Rites</h3>'+RITE99.filter(R=>!R.si||R.si()||m>=R.m).map(R=>{const ok=m>=R.m&&Object.entries(R.c).every(([q,n])=>(I[q]||0)>=n)&&(!R.si||R.si());return '<div class="sv'+(ok?' ok':'')+'" style="display:block"><b>'+R.n+'</b> <small>· mystique '+R.m+' · '+Object.entries(R.c).map(([q,n])=>n+' '+ING99[q].ic).join(' ')+'</small><small>'+R.d+'</small>'+(ok?'<button class="bt" data-rite99="'+R.k+'" style="margin-top:4px">Accomplir le rite</button>':'')+'</div>'}).join('');return h}
{const d0=drawer;drawer=function(){d0.apply(this,arguments);try{if(onglet!=='pou'||!S||!modeHist()||S.voieC)return;const d=$('drawer');if(!d||d.querySelector('.p99'))return;const div=document.createElement('div');div.className='p99';div.innerHTML=pouv99Html();d.prepend(div)}catch(e){}}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-rite99]');if(!b||!S)return;const R=RITE99.find(r=>r.k===b.dataset.rite99),I=ing99();if(!R)return;Object.entries(R.c).forEach(([q,n])=>I[q]-=n);R.f(utopieMyst99()?1.5:1);log('Rite accompli : '+R.n+'.');try{journal&&journal('Rite : '+R.n+'. '+R.d)}catch(_){}try{sauve();rafraichir();drawer()}catch(_){}});

// ===== Batailles d'uchronie en 2D : un décor qui raconte l'idée de la bataille, et de petits personnages qui frappent, tirent, chancellent =====
function deco97(x,env,ox,oy,cs,C,R,W,H){const t=performance.now()/1000,w=cs*C,h=cs*R;x.save();x.beginPath();x.rect(ox,oy,w,h);x.clip();
 if(env==='cote'){// la mer en haut, ses vagues, un navire qui croise
  const g=x.createLinearGradient(0,oy,0,oy+cs*1.4);g.addColorStop(0,'#1d4a6a');g.addColorStop(1,'rgba(40,110,140,.2)');x.fillStyle=g;x.fillRect(ox,oy,w,cs*1.4);
  x.strokeStyle='rgba(220,240,255,.35)';x.lineWidth=2;for(let k=0;k<4;k++){x.beginPath();for(let i=0;i<=40;i++){const X=ox+i*w/40,Y=oy+cs*(.25+k*.3)+Math.sin(i*.7+t*2+k)*3;i?x.lineTo(X,Y):x.moveTo(X,Y)}x.stroke()}
  const sx=ox+((t*18)%(w+cs*2))-cs,sy=oy+cs*.45+Math.sin(t*1.5)*2;if(typeof sprDessin==='function'&&sprDessin(x,'ship_med',sx,sy+cs*.35,cs*1.6)){}else{x.fillStyle='#3a2a1a';x.beginPath();x.moveTo(sx-cs*.6,sy);x.lineTo(sx+cs*.6,sy);x.lineTo(sx+cs*.45,sy+cs*.22);x.lineTo(sx-cs*.45,sy+cs*.22);x.fill();x.strokeStyle='#2a2018';x.beginPath();x.moveTo(sx,sy);x.lineTo(sx,sy-cs*.7);x.stroke();x.fillStyle='#e8e0cc';x.beginPath();x.moveTo(sx+2,sy-cs*.65);x.quadraticCurveTo(sx+cs*.45+Math.sin(t*2)*3,sy-cs*.4,sx+2,sy-cs*.1);x.fill()}
  x.fillStyle='rgba(230,210,160,.35)';x.fillRect(ox,oy+cs*1.4,w,cs*.25);if(typeof sprDessin==='function')for(let i=0;i<C;i+=2)sprDessin(x,i%4?'p_palm_detailed_bend':'p_crate',ox+i*cs+cs*.5,oy+cs*1.62,i%4?cs*.9:cs*.4,i%3===0)}
 if(env==='foret'&&typeof spr==='function'&&spr('tree_detailed')){for(let i=0;i<14;i++){const X=ox+((i*137)%w),Y=oy+((i*89)%h)+cs*.3,sw=Math.sin(t*1.3+i)*.04;x.save();x.translate(X,Y);x.rotate(sw);sprDessin(x,['tree_detailed','tree_palm','plant_bushLarge'][i%3],0,0,cs*(.8+(i%3)*.15));x.restore()}}else if(env==='foret'){for(let i=0;i<16;i++){const X=ox+((i*137)%w),Y=oy+((i*89)%h),r=cs*(.22+(i%3)*.06),sw=Math.sin(t*1.3+i)*cs*.03;x.fillStyle=i%2?'rgba(25,70,30,.85)':'rgba(35,90,40,.85)';x.beginPath();x.arc(X+sw,Y,r,0,7);x.fill();x.fillStyle='rgba(60,40,20,.8)';x.fillRect(X-2,Y+r*.6,4,r*.6)}
  x.fillStyle='rgba(230,230,200,.06)';for(let i=0;i<5;i++){const X=ox+((t*10+i*w/5)%w);x.fillRect(X,oy,cs*.6,h)}}
 if(env==='riviere'){x.strokeStyle='rgba(200,230,240,.35)';x.lineWidth=2;for(let i=0;i<8;i++){const X=ox+((t*40+i*w/8)%w);x.beginPath();x.moveTo(X,oy+cs*2.7);x.lineTo(X+cs*.4,oy+cs*2.7);x.stroke();x.beginPath();x.moveTo(X+cs*.3,oy+cs*3.2);x.lineTo(X+cs*.7,oy+cs*3.2);x.stroke()}}
 if(env==='falaise'){x.fillStyle='rgba(70,60,50,.7)';x.beginPath();x.moveTo(ox,oy+cs*3);for(let i=0;i<=C*2;i++)x.lineTo(ox+i*cs/2,oy+cs*3-((i*37)%13)/13*cs*.35);x.lineTo(ox+w,oy+cs*3);x.fill();
  x.fillStyle='rgba(120,110,95,.6)';for(let i=0;i<5;i++){const y=((t*30+i*60)%(cs*3));x.beginPath();x.arc(ox+((i*173)%w),oy+y,3,0,7);x.fill()}}
 if(typeof sprDessin==='function'){if(env==='falaise')for(let i=0;i<C;i+=2)sprDessin(x,i%4?'rock_largeB':'rock_tallB',ox+i*cs+cs*.5,oy+cs*3.05,cs*.8);if(env==='riviere')sprDessin(x,'canoe',ox+((t*25)%w),oy+cs*3.05,cs*.9);if(env==='ville'){sprDessin(x,'p_tower_complete_small',ox+cs*.6,oy+cs*1.1,cs*1.2);sprDessin(x,'p_structure',ox+w-cs*.7,oy+cs*1,cs*.9)}}
 if(env==='ville'){for(let i=0;i<C;i+=2){const X=ox+i*cs+cs*.15,Y=oy+cs*.15;x.fillStyle='rgba(200,185,150,.35)';x.fillRect(X,Y+cs*.2,cs*.7,cs*.35);x.fillStyle='rgba(140,60,40,.45)';x.beginPath();x.moveTo(X-4,Y+cs*.2);x.lineTo(X+cs*.35,Y);x.lineTo(X+cs*.74,Y+cs*.2);x.fill()}
  x.fillStyle='rgba(255,200,120,.15)';const f=(Math.sin(t*3)+1)/2;x.beginPath();x.arc(ox+w*.8,oy+cs*.4,cs*.3+f*4,0,7);x.fill()}
 x.restore()}
// un petit personnage : corps, tête, arme ; il respire, frappe quand il attaque, chancelle quand il a peur, s'écroule s'il tombe
function perso97(x,u,b,px,py,s,cs,G){const t=performance.now()/1000,id=(u.id||u.cx*7+u.cy*3||0),bob=Math.sin(t*4+id)*cs*.025,coul=s===0?'#e2bd74':'#c03030';
 let att=0;(G&&G.fx||[]).forEach(f=>{if(Math.abs(f.x0-(u.x||0))<.15&&Math.abs(f.y0-(u.y||0))<.15)att=Math.max(att,f.t||.3)});const peur=u.peur>0;
 x.save();x.translate(px,py+bob);if(peur)x.rotate(Math.sin(t*12)*.12);
 x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(0,cs*.32,cs*.24,cs*.07,0,0,7);x.fill();
 x.strokeStyle=coul;x.lineWidth=3;x.beginPath();x.ellipse(0,cs*.32,cs*.26,cs*.08,0,0,7);x.stroke();
 const pas=Math.sin(t*8+id)*(G&&G.phase==='fight'?cs*.05:0);x.strokeStyle='#2a1e14';x.lineWidth=Math.max(2,cs*.06);x.beginPath();x.moveTo(-cs*.06,cs*.08);x.lineTo(-cs*.08+pas,cs*.3);x.moveTo(cs*.06,cs*.08);x.lineTo(cs*.08-pas,cs*.3);x.stroke();
 x.fillStyle=b.col;x.beginPath();x.ellipse(0,-cs*.02,cs*.15,cs*.2,0,0,7);x.fill();x.strokeStyle='rgba(0,0,0,.4)';x.lineWidth=1;x.stroke();
 x.fillStyle=s===0?'#6a4630':'#e0b896';x.beginPath();x.arc(0,-cs*.28,cs*.1,0,7);x.fill();
 const sw=att>0?-1.2+Math.sin(t*25)*.9:-.4+Math.sin(t*2+id)*.1,nm=(b.n||'').toLowerCase(),tir=/fusil|archer|tireur|canon|mousquet/.test(nm);
 x.save();x.translate(cs*.12,-cs*.08);x.rotate(tir?-.2:sw);x.strokeStyle=tir?'#3a3a3a':'#8a7a5a';x.lineWidth=Math.max(2,cs*.05);x.beginPath();x.moveTo(0,0);x.lineTo(tir?cs*.38:cs*.3,tir?0:-cs*.22);x.stroke();
 if(tir&&att>0){x.fillStyle='rgba(255,220,120,'+Math.min(1,att*3)+')';x.beginPath();x.arc(cs*.42,0,cs*.07,0,7);x.fill()}x.restore();
 if(/mystique|esprit|sorc/.test(nm)){x.strokeStyle='rgba(180,220,255,'+(.4+.3*Math.sin(t*4))+')';x.lineWidth=2;x.beginPath();x.arc(0,-cs*.05,cs*.3+Math.sin(t*3)*3,0,7);x.stroke()}
 x.restore()}

// ===== Les vouves de l'embouchure : on les exploite saison après saison, jusqu'au conflit ou au cyclone ; on les voit sur la carte =====
function vouves99(){return T.filter(t=>(S.t[t.i]||{}).vouve)}
{const sa=saison;saison=function(){const r=sa.apply(this,arguments);try{if(!S||!modeHist())return r;vouves99().forEach(t=>{const o=S.t[t.i];o.vouveN=(o.vouveN||0)+1;S.vivres=(S.vivres||0)+2;
  // tout près de la côte, les galets se voient de loin : on finit par se disputer l'embouchure
  if(rnd()<Math.min(.4,.06+.03*o.vouveN)){const ou=lieuDe(t)||lieuProche(t)||'l’embouchure';if(S.voieC){fx({vivres:-2,ami:-1});log('Des marrons sont descendus de nuit aux vouves de '+ou+' : la pêche de la saison est partie avec eux.');if(rnd()<.35){o.vouve=0;o.vouveN=0;log('Ils ont défait les murets de galets : l’embouchure est à refaire.')}}
   else{fx({traque:3});log('Les pêcheurs des colons ont vu nos vouves à '+ou+' : ils réclament l’embouchure, et la milice est prévenue.');if(rnd()<.45){o.vouve=0;o.vouveN=0;log('Ils ont détruit nos murets de galets : il faudra les refaire, ou pêcher ailleurs.')}}}})}catch(e){}return r}}
{const cy=cyclone;cyclone=function(){const L=S?vouves99():[];const r=cy.apply(this,arguments);try{let n=0;L.forEach(t=>{const o=S.t[t.i];if(o&&o.vouve&&rnd()<.75){o.vouve=0;o.vouveN=0;n++}});if(n)log('La rivière en crue a emporté '+(n>1?n+' installations de vouves':'les vouves de l’embouchure')+' : les galets sont dispersés, tout est à refaire.')}catch(e){}return r}}
// sur la carte : deux murets de galets en V qui ferment l'embouchure et laissent un petit canal au milieu
{const b0=bat;let M=null,cle='';bat=function(kk){b0.apply(this,arguments);try{if(!S||typeof scene==='undefined')return;const L=vouves99(),k=L.map(t=>t.i).join(',');if(!M){M=new THREE.InstancedMesh(new THREE.DodecahedronGeometry(.018,0),new THREE.MeshLambertMaterial({color:0x8a8478}),600);M.frustumCulled=false;M.count=0;scene.add(M)}
  M.visible=dist<20&&(!lieu||lieu===LA97);if(k===cle)return;cle=k;const Mx=new THREE.Matrix4(),Q=new THREE.Quaternion(),V=new THREE.Vector3(),Sc=new THREE.Vector3();let n=0;
  L.forEach(t=>{const mer=t.nb.map(i=>T[i]).filter(u=>u.alt<=1);let dx=0,dz=0;mer.forEach(u=>{dx+=u.x-t.x;dz+=u.z-t.z});const l=Math.hypot(dx,dz)||1;dx/=l;dz/=l;const px=-dz,pz=dx;
   // le V pointe vers la mer ; le canal reste ouvert à la pointe
   for(const sgn of [-1,1])for(let j=0;j<22;j++){const f=j/21,x0=t.x+dx*HS*.45+px*sgn*(.05+f*.42),z0=t.z+dz*HS*.45+pz*sgn*(.05+f*.42),x=x0-dx*f*.35,z=z0-dz*f*.35;if(n>=600)break;const s=.8+((j*37+t.i)%7)/10;V.set(x,Math.max(0,alt(x,z))*VX+.012,z);Q.setFromAxisAngle(V.clone().set(0,1,0),j*1.7);Sc.set(s,s*.7,s);Mx.compose(V,Q,Sc);M.setMatrixAt(n++,Mx)}});
  M.count=n;M.instanceMatrix.needsUpdate=true}catch(e){}}}

// ===== En Histoire, l'imaginaire (Hanuman, le pilier, les galeries) ne surgit que dans une histoire mystique : sinon, seulement le défi et le roi des camps =====
{const is=imagSaison;imagSaison=function(){if(!S||!modeHist()||utopieMyst99()||mystique99()>=12)return is.apply(this,arguments);const sv=IMAG.slice();try{IMAG.splice(0,IMAG.length,...sv.filter(i=>['duel','roicafre'].includes(i.k)));return is.apply(this,arguments)}finally{IMAG.splice(0,IMAG.length,...sv)}}}

// ===== Les bêtes et les ennemis des souterrains et des missions : chacun a sa forme (chien, requin, soldat…), on les reconnaît d'un coup d'œil =====
function mob97(x,m,X,Y,ts,t,P){const a=Math.atan2((P?P.y:Y)-m.y,(P?P.x:X)-m.x),k=m.t||'',r=ts*(m.ia==='boss'?.7:.38),b=Math.sin(t*10+m.x)*.08;x.save();x.translate(X,Y);
 x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(0,r*.7,r*.9,r*.25,0,0,7);x.fill();
 if(k==='chi'){// chien : corps allongé, tête, oreilles, queue, pattes qui courent
  x.rotate(a);x.fillStyle=m.col;x.beginPath();x.ellipse(0,0,r*.9,r*.42,0,0,7);x.fill();x.beginPath();x.ellipse(r*.85,-r*.1,r*.38,r*.3,0,0,7);x.fill();x.fillStyle='#3a2a18';x.beginPath();x.ellipse(r*1.15,-r*.05,r*.15,r*.12,0,0,7);x.fill();
  x.beginPath();x.moveTo(r*.7,-r*.35);x.lineTo(r*.8,-r*.65);x.lineTo(r*.95,-r*.35);x.fill();x.strokeStyle=m.col;x.lineWidth=r*.16;x.beginPath();x.moveTo(-r*.85,0);x.lineTo(-r*1.25,-r*.35+b*r*2);x.stroke();
  x.strokeStyle='#3a2a18';x.lineWidth=r*.14;for(const s of [-1,1])for(const f of [-.5,.5]){x.beginPath();x.moveTo(f*r,s*r*.3);x.lineTo(f*r+Math.sin(t*14+f*3)*r*.25,s*r*.62);x.stroke()}}
 else if(k==='req'){// requin : silhouette grise, aileron et queue
  x.rotate(a);x.fillStyle=m.col;x.beginPath();x.moveTo(r*1.2,0);x.quadraticCurveTo(0,-r*.55,-r*1,0);x.quadraticCurveTo(0,r*.55,r*1.2,0);x.fill();x.beginPath();x.moveTo(-r*.9,0);x.lineTo(-r*1.4,-r*.45+b*r);x.lineTo(-r*1.3,r*.45+b*r);x.fill();
  x.fillStyle='#4a5a6a';x.beginPath();x.moveTo(0,0);x.lineTo(-r*.35,-r*.75);x.lineTo(-r*.5,0);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(r*.75,-r*.12,r*.07,0,7);x.fill()}
 else if(k==='sol'||k==='bossM'){// soldat : uniforme bleu, chapeau, fusil
  x.fillStyle=m.col;x.fillRect(-r*.35,-r*.3,r*.7,r*.8);x.fillStyle='#e0b896';x.beginPath();x.arc(0,-r*.55,r*.28,0,7);x.fill();x.fillStyle='#111';x.fillRect(-r*.4,-r*.85,r*.8,r*.15);x.strokeStyle='#333';x.lineWidth=r*.12;x.beginPath();x.moveTo(r*.35,-r*.1);x.lineTo(r*.35+Math.cos(a)*r*.9,-r*.1+Math.sin(a)*r*.9);x.stroke()}
 else if(k==='chv'){// chauve-souris : ailes qui battent
  const w=Math.sin(t*18)*.5+.5;x.fillStyle=m.col;x.beginPath();x.ellipse(0,0,r*.3,r*.35,0,0,7);x.fill();for(const s of [-1,1]){x.beginPath();x.moveTo(0,0);x.lineTo(s*r*1.2,-r*.6*w);x.lineTo(s*r*.9,r*.2);x.lineTo(s*r*.5,0);x.fill()}}
 else if(k==='sal'){// salamandre de lave : corps qui ondule, queue
  x.rotate(a);x.strokeStyle=m.col;x.lineWidth=r*.45;x.lineCap='round';x.beginPath();for(let i=0;i<=8;i++){const u=i/8,px=r*(1-u*2.2),py=Math.sin(u*6+t*8)*r*.25;i?x.lineTo(px,py):x.moveTo(px,py)}x.stroke();x.fillStyle='#ffd070';x.beginPath();x.arc(r*.9,0,r*.12,0,7);x.fill()}
 else{x.fillStyle=m.col;x.beginPath();x.arc(0,0,r,0,7);x.fill();x.fillStyle='#fff';x.fillRect(-r*.3,-r*.25,3,3);x.fillRect(r*.2,-r*.25,3,3)}
 x.restore();
 // le nom au-dessus, pour savoir à quoi on a affaire
 x.fillStyle='rgba(255,255,255,.85)';x.font='600 '+Math.max(9,Math.round(ts*.22))+'px system-ui';x.textAlign='center';x.fillText((m.n||'').split(' ')[0],X,Y-r-4)}

// ===== Par temps clair, quand on dézoome au plus loin, on devine Maurice à l'horizon, à l'est-nord-est, comme en vrai =====
{const b0=bat;let M=null;bat=function(kk){b0.apply(this,arguments);try{if(typeof scene==='undefined'||!scene||!DEM)return;if(!M){const [x,z]=xz(57.57,-20.28);M=new THREE.Group();const mat=new THREE.MeshBasicMaterial({color:0x5a6a80,transparent:true,opacity:0,fog:false,depthWrite:false});
  const corps=new THREE.Mesh(new THREE.SphereGeometry(1,24,10,0,Math.PI*2,0,Math.PI/2),mat);corps.scale.set(26,1.1,20);M.add(corps);[[-8,-6,2.4],[5,4,2.1],[-2,8,1.7],[9,-3,1.6]].forEach(([dx,dz,h])=>{const p=new THREE.Mesh(new THREE.ConeGeometry(2.6,h,7),mat);p.position.set(dx,h/2,dz);M.add(p)});M.position.set(x,-.2,z);M.userData.mat=mat;scene.add(M)}
  const loin=Math.max(0,Math.min(1,(dist-34)/12)),clair=Math.max(0,1-(typeof stormV!=='undefined'?stormV:0)*2),h=S&&modeHist()?1:.6;M.userData.mat.opacity=.55*loin*clair*h;M.visible=M.userData.mat.opacity>.01}catch(e){}}}
