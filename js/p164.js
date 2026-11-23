// ===== p164 : petits correctifs =====
// 1. 1794 : « ce que vos gens savent déjà » ne bloque plus l'annonce d'ouverture (on ne pouvait plus cliquer « Commencer » pendant une minute) :
//    la liste devient une carte posée en bas à gauche, qu'on lit ou qu'on ferme, sans voile par-dessus le jeu.
{const st=document.createElement('style');st.textContent='#sv129{inset:auto!important;left:12px!important;bottom:96px!important;top:auto!important;right:auto!important;background:none!important;pointer-events:none!important;z-index:70!important;display:block!important}#sv129 .c{pointer-events:auto;max-height:46vh!important;max-width:420px!important;font-size:13px;box-shadow:0 8px 28px rgba(0,0,0,.5)}';document.head.appendChild(st)}
// 2. Les cascades vues de loin : plus de rideau d'eau (une barre bleue vue d'en haut), mais une petite icône translucide ; le rideau revient de près.
function cascIco164(v){v=v||0;cascIco164.t=cascIco164.t||{};if(cascIco164.t[v])return cascIco164.t[v];const h=q=>rndH(v*31.7+q),c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.fillStyle='rgba(20,40,50,.5)';x.beginPath();x.arc(32,32,28,0,7);x.fill();x.strokeStyle='rgba(200,235,245,.85)';x.lineWidth=2.5;x.stroke();
 // chaque cascade son dessin : 2 à 4 filets d'eau, de longueurs inégales, qui s'écartent ou se courbent un peu
 const n=2+Math.floor(h(1)*3),pen=(h(2)-.5)*8;x.strokeStyle='#bfe8f2';x.lineCap='round';for(let k=0;k<n;k++){const x0=32+(k-(n-1)/2)*(20/n)+(h(10+k)-.5)*4,y0=11+h(20+k)*8,y1=38+h(30+k)*9,cb=(h(40+k)-.5)*10;x.lineWidth=2.5+h(50+k)*2.5;x.beginPath();x.moveTo(x0,y0);x.quadraticCurveTo(x0+cb,(y0+y1)/2,x0+pen*(y1-y0)/30,y1);x.stroke()}
 x.fillStyle='#bfe8f2';x.beginPath();x.ellipse(32+pen*.6,48,11+h(3)*8,3.5+h(4)*3,(h(5)-.5)*.3,0,7);x.fill();return cascIco164.t[v]=new THREE.CanvasTexture(c)}
(function cb164(){requestAnimationFrame(cb164);try{if(typeof C147==='undefined'||!C147.L)return;const loin=dist>6.5;C147.L.forEach(G=>{if(!G.userData.ico164){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:cascIco164(G.id%7),transparent:true,opacity:.5,depthTest:false,rotation:((G.id*37)%11-5)*.035}));s.renderOrder=7;G.add(s);G.userData.ico164=s}
  const s=G.userData.ico164;G.children.forEach(o=>{if(o===s)return;if(o.material===eauMat147()){o.visible=!loin;return}if(!o.userData.f164&&o.geometry&&/Circle|Ring/.test(o.geometry.type)){o.userData.f164=1;o.scale.set(1.5,1,.7);o.rotation.y=(G.id%7)*.5}o.visible=!loin});s.visible=loin;{const k=Math.max(.12,dist*.022)/(G.scale.x||1);s.scale.set(k,k*(G.scale.x||1),1);s.position.set(0,k*.42,0)}})}catch(e){}})();
// 3. L'herbe : de fins brins qui s'écartent (plus de petits cônes)
setTimeout(function herbe164(){try{if(typeof MOD==='undefined'||!MOD.herbe){setTimeout(herbe164,1500);return}const P=[],N=[],C=[],q=new THREE.Color();
 for(let k=0;k<11;k++){const a=k*2.4+.3,r=.004+(k%3)*.006,h=.06+((k*37)%5)*.012,l=.018+(k%4)*.008,w=.0035,x0=Math.cos(a)*r,z0=Math.sin(a)*r,dx=Math.cos(a),dz=Math.sin(a),px=-dz*w,pz=dx*w;
  q.setHex([0x7fa04c,0x93ad58,0x6e9442,0xa8b864][k%4]);const tip=[x0+dx*l,h,z0+dz*l];
  [[x0+px,0,z0+pz],[x0-px,0,z0-pz],tip].forEach(v=>{P.push(...v);N.push(dx*.3,1,dz*.3);C.push(q.r*.8,q.g*.8,q.b*.8)})}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));g.setAttribute('color',new THREE.Float32BufferAttribute(C,3));
 MOD.herbe.geometry=g;if(MOD.herbe.material){MOD.herbe.material.side=THREE.DoubleSide;MOD.herbe.material.needsUpdate=true}}catch(e){}},2500);
// 4. Les disparitions anciennes n'arrivent plus en retard : en partie commencée en 1794, celles d'avant sont déjà connues ; ailleurs, plus de 25 ans de retard = classées sans annonce
setInterval(()=>{try{if(!S||S.fin||!S.done)return;if(S.an0164==null)S.an0164=S.year;Object.keys(EV).forEach(k=>{if(!/^disp133_/.test(k)||S.done[k])return;const y=EV[k].y;if((y<S.an0164-1||y<S.year-25)&&(S.evq||[])[0]!==k){S.done[k]=1;S.evq=(S.evq||[]).filter(x=>x!==k)}})}catch(e){}},1500);
// 5. Le conte garde le même choix pour une annonce (il hésitait : une option s'éclairait, puis l'autre)
{const c0=choixConte;const M={};choixConte=function(e,id){if(id&&M[id]!=null&&S&&S.evq&&S.evq[0]===id)return M[id];const k=c0.apply(this,arguments);if(id)M[id]=k;return k}}
setInterval(()=>{try{const L=[...document.querySelectorAll('#modal .op.conte')];if(L.length>1)L.slice(0,-1).forEach(b=>b.classList.remove('conte'))}catch(e){}},200);
// 6. La naissance de l'île : avant que les cirques ne se creusent, le Piton des Neiges est UN volcan bouclier — une grande pente douce,
//    coiffée d'un plateau qui descend légèrement, d'où sort la lave (et non une pointe au milieu de trois bosses).
setInterval(function sh164(){try{if(typeof terr==='undefined'||!terr||!terr.material)return;const m=terr.material,U=m.uniforms;if(U.shH||!U.ero)return;
 const k='p.y=max(p.y,mix(p.y,eroH,w));';if(!m.vertexShader.includes(k))return;const [cx,cz]=xz(55.48,-21.10),[sx,sz]=xz(55.45,-20.88);const R=Math.hypot(sx-cx,sz-cz)*1.12;
 U.shC={value:new THREE.Vector3(cx,cz,R)};U.shH={value:3300*VX};
 m.vertexShader=m.vertexShader.replace('uniform float ech,dec,fz,ero,eroH;','uniform float ech,dec,fz,ero,eroH,shH;uniform vec3 shC;').replace(k,k+'{float r=clamp(distance(p.xz,shC.xy)/shC.z,0.,1.);float hs=min(shH*(1.-pow(r,1.6)),shH*(.9-.1*r));float ws=(1.-ero)*smoothstep(1.,.55,r);p.y=mix(p.y,max(p.y*.5,hs),ws);}');m.needsUpdate=true}catch(e){}},1500);
// pendant les films (naissance de l'île, interludes), on cache les rivières, cascades, écume et icônes du jeu
setInterval(()=>{try{const f=typeof CINE!=='undefined'&&!!CINE;if(typeof RIVG126!=='undefined'&&RIVG126.g&&f)RIVG126.g.visible=false;if(typeof C147!=='undefined'&&C147.L&&f)C147.L.forEach(G=>G.visible=false);if(typeof HOU148!=='undefined'&&HOU148.M&&f)HOU148.M.visible=false}catch(e){}},100);
// 7. Fin de saison : on n'est plus obligé d'utiliser tous ses bras, ni de choisir un savoir ou un pouvoir. On prévient, et on peut finir quand même.
{const s0=suite;suite=function(){try{if(!S||S.evq.length||S.fin||(typeof exps!=='undefined'&&exps.length)||(typeof autoD==='function'&&autoD())||document.querySelector('.alerte164'))return s0.apply(this,arguments);
  const R=[];if(brasUtiles())R.push(S.bras+' bras ne fait'+(S.bras>1?'ont':'')+' rien'+(S.cyc&&S.cyc.in<=2&&!S.abri?' (et le cyclone approche : personne n’est à l’abri)':''));if(pouvBloque())R.push('un pouvoir est prêt');
  if(!R.length)return s0.apply(this,arguments);
  alerteSimple('Finir la saison ?','Il reste : '+R.join(' ; ')+'. Vous pouvez les garder et finir la saison quand même.',[['Finir la saison',()=>{S.bras=0;saison();if(S.fin)return;const nv=S.log.filter(l=>l.y===S.year-2);if(nv.length)toast(nv[0].m);rafraichir()}],['Revenir',()=>{}]]);const al=document.body.lastElementChild;if(al)al.classList.add('alerte164')}catch(e){return s0.apply(this,arguments)}}}
try{$('fin').onclick=()=>suite()}catch(e){}
// 8. Le menu du clic droit dit tout : sous chaque action, ce qu'elle rapporte ; les actions impossibles sont grisées avec la raison. Plus de panneau de droite.
{const st=document.createElement('style');st.textContent='#mCtx button small{display:block;font-size:11.5px;opacity:.75;font-weight:400;line-height:1.25;margin-top:1px;white-space:normal;max-width:330px}#mCtx button.non{opacity:.55;cursor:default}#mCtx button.non small{color:#e8a07a;opacity:1}body.ctx157 #side{visibility:hidden!important;pointer-events:none!important}';document.head.appendChild(st);
 // rendu seul : les ajouts des autres modules (chasser, cueillir, explorer…) passent toujours par la chaîne des menuCtx
 window.RENDU164=function(x,y,titre,L){const o=$('mCtx');if(o)o.remove();const m=document.createElement('div');m.id='mCtx';
  m.innerHTML='<small>'+titre+'</small>'+L.map((l,i)=>'<button data-i="'+i+'"'+(l[3]?' class="non"':'')+'>'+l[0]+(l[2]?'<small>'+String(l[2]).replace(/</g,'&lt;').slice(0,180)+'</small>':'')+'</button>').join('');document.body.appendChild(m);
  m.style.left=Math.max(6,Math.min(x,innerWidth-m.offsetWidth-8))+'px';m.style.top=Math.max(6,Math.min(y,innerHeight-m.offsetHeight-8))+'px';
  m.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const l=L[+b.dataset.i];if(l[3]){toast(l[2]||'Impossible pour l’instant.');return}m.remove();l[1]()});
  setTimeout(()=>addEventListener('pointerdown',function f(e){if(!m.contains(e.target)){m.remove();removeEventListener('pointerdown',f,true)}},true),0)}}
