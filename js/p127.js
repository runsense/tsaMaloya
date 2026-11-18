
// ===== p127 : la vue du camp en Vie — chaque camp a son visage, des bêtes, et les grandes informations sous les onglets =====
// 1. Sous les onglets des camps : la chronologie (le jour, l'heure) et, à côté, le chef, le prochain vote, les cultures et l'harmonie.
{const st=document.createElement('style');st.textContent='#cvRow127{display:flex;gap:10px;align-items:stretch;flex-wrap:wrap;padding:6px 12px;border-bottom:1px solid rgba(232,190,90,.25);background:rgba(20,17,13,.85)}#cvRow127 #chronoB,#cvRow127 #jour90{position:static!important;transform:none!important;margin:0!important;left:auto!important;top:auto!important}#cvRow127 .i127{background:rgba(232,190,90,.08);border:1px solid rgba(232,190,90,.3);border-radius:8px;padding:4px 10px;font:12px/1.35 system-ui;color:#f0e6d0}#cvRow127 .i127 b{color:#e8be5a;font-size:11px;letter-spacing:.04em;text-transform:uppercase;display:block}';document.head.appendChild(st)}
{const parent0={el:null},pj={el:null};setInterval(()=>{try{const d=$('campV'),ch=$('chronoB'),jr=$('jour90');let row=$('cvRow127');
 if(!d||d.hidden||!CV.on){if(jr&&pj.el&&jr.parentElement!==pj.el)pj.el.appendChild(jr);if(ch&&parent0.el&&ch.parentElement!==parent0.el){parent0.el.appendChild(ch)}if(row)row.remove();return}
 if(!row){const h=d.querySelector('.cvh');if(!h)return;row=document.createElement('div');row.id='cvRow127';h.after(row)}
 if(ch&&ch.parentElement!==row){if(!parent0.el)parent0.el=ch.parentElement;row.prepend(ch)}
 if(jr&&jr.parentElement!==row){if(!pj.el)pj.el=jr.parentElement;row.prepend(jr)}
 const ci=CV.camp;let html='';try{const c=chefDe(ci),ti=chefTitre();html+='<div class="i127"><b>'+ti+'</b>'+(c?'⭐ '+c.n.split(' ')[0]+' depuis '+S.chefs[ci].an:'personne pour l’instant')+(chefPeut&&chefPeut(ci)?' · <u>vote ouvert</u>':' · prochain vote en '+((S.chefs[ci]||{}).an+5))+'</div>'}catch(e){}
 try{const C=cultures(ci),h=Math.round(S.harm||0);html+='<div class="i127"><b>Entre les cultures</b>'+Object.entries(C).map(([o,n])=>n+' '+(ORIG[o]||o)).join(' · ')+(Object.keys(C).length>1?' · harmonie : '+(h>=65?'on vit ensemble':h<35?'discorde':'chacun chez soi'):'')+'</div>'}catch(e){}
 let ib=row.querySelector('.inf127');if(!ib){ib=document.createElement('div');ib.className='inf127';ib.style.cssText='display:flex;gap:10px;flex-wrap:wrap';row.appendChild(ib)}if(ib.innerHTML!==html)ib.innerHTML=html}catch(e){}},600)}

// 2. Le décor du camp : plus de sapins (il n'y en a pas dans l'île) ; chaque camp tire ses arbres selon son lieu ; des bêtes autour des cases
{const pd=p3Deco;p3Deco=function(L,C){pd.apply(this,arguments);try{const G=P3.deco,ci=(CV&&CV.camp!=null)?CV.camp:0,t=T[ci]||{};
 G.children.slice().forEach(o=>{const g=o.geometry;if(!o.isMesh||!g)return;const p=g.parameters||{};
  if(g.type==='ConeGeometry'&&p.radius===1.3&&p.height===3)G.remove(o);if(g.type==='CylinderGeometry'&&p.radiusTop===.15&&p.radiusBottom===.2&&p.height===1.6)G.remove(o);
  // les touffes de fougères (plaques vertes) qui faisaient des colonnes pâles
  if(g.type==='PlaneGeometry'&&p.width===.35&&p.height===1.4)o.parent&&o.parent.remove(o)});
 G.children.slice().forEach(o=>{if(o.isGroup&&o.children.length===6&&o.children.every(c=>c.geometry&&c.geometry.type==='PlaneGeometry'&&c.geometry.parameters.width===.35))G.remove(o)});
 // une variation propre au camp : on tourne et décale les plantations autour, selon la case
 const R=s=>{const x=Math.sin((s+ci*7.31)*12.9898)*43758.5453;return x-Math.floor(x)};const hors=(x,z)=>(x*x)/(19*19)+((z-1)*(z-1))/(13*13)>1;
 const mat=new THREE.MeshLambertMaterial({vertexColors:true});const pose=(k,n,s0,s1,seed,r0,r1)=>{const m=typeof MOD!=='undefined'&&MOD[k];if(!m||!m.geometry)return;for(let i=0;i<n;i++){const a=R(seed+i*1.7)*6.283,d=(r0||19)+R(seed+i*3.1)*((r1||50)-(r0||19)),x=Math.cos(a)*d*1.2,z=1+Math.sin(a)*d*.85;if(!hors(x,z)||Math.abs(x)>62||Math.abs(z)>46)continue;const o=new THREE.Mesh(m.geometry,m.material&&m.material.vertexColors?m.material:mat);o.position.set(x,0,z);o.rotation.y=R(seed+i)*6.28;o.scale.setScalar(s0+R(seed+i*5.3)*(s1-s0));G.add(o)}};
 const hum=/humide|fanjans/.test(t.biome||''),sav=/Savane/.test(t.biome||'');
 if(hum)pose('fanjanEx',10,18,28,101);if(sav)pose('latanier',8,14,20,103);if(t.alt>900)pose('fanjanGl',6,18,26,107);pose('fanjanEx',30,5,8,109,18,30);// petites fougères au ras du sol, près du camp
 // des bêtes : poules et coqs autour des cases, un ou deux cabris attachés, un chien près du feu
 if(typeof poule122==='function'){const n=C?6:4;for(let i=0;i<n;i++){const o=poule122(i===0);const a=R(201+i)*6.28,d=6+R(203+i)*8;o.position.set(Math.cos(a)*d,0,1+Math.sin(a)*d*.7);o.rotation.y=R(207+i)*6.28;o.scale.setScalar(16);o.userData.p127=1;G.add(o)}}
 if(typeof P122!=='undefined'&&P122.ani_boeufc&&C)for(let i=0;i<2;i++){const o=clone104(P122.ani_boeufc,2.3,true);o.position.set(-14+i*3,0,10+i*1.5);o.rotation.y=R(211+i)*6;G.add(o)}
}catch(e){}}}

// 3. Préparer une sortie : si personne de formé n'est libre, on coche quand même quelqu'un (le moins fatigué), avec l'avertissement
{let dd=0;const ep=expPlan;expPlan=function(c,pre){const r=ep.apply(this,arguments);try{if(dd)return r;const E=window.EXPS;if(!E||Object.values(E.coche||{}).some(Boolean))return r;if(expLibres(c).length)return r;
 const P=(S.pp||[]).filter(p=>adulte(p)&&campDe(p)===c&&!enGrp(p)&&p.id!==S.garde&&!(S.voieC&&E.but==='chasse'&&p.g==='f')).sort((a,b)=>(a.fat||0)-(b.fat||0));if(!P.length)return r;E.coche[P[0].id]=1;E.force=E.force||{};E.force[P[0].id]=1;dd=1;try{expPlan(c)}finally{dd=0}}catch(e){}return r}}
