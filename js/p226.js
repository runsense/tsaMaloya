// ===== p226 : les oiseaux remis d'aplomb =====
// Le paille-en-queue (modèle à deux brins de queue) est sculpté dans une pose rare : arrêté en vol, le corps debout. En vol ordinaire
// il volait donc la tête en l'air. On le couche à l'horizontale ; il ne reprend sa pose debout que lorsqu'il s'arrête en vol, et pique tête en bas vers la mer.
// Le zoizo la Vierge est petit : sur la carte il se perdait dans le feuillage ; il vole maintenant au-dessus des cimes, un peu plus grand, et voltige d'un arbre à l'autre.
{const i0=inst144;inst144=function(n,o){const r=i0.apply(this,arguments);if(n!=='oi_phaeton')return r;return r.then(x=>{try{const w=x.w,p=w.children[0],q=new THREE.Group();w.remove(p);q.add(p);w.add(q);q.rotation.x=Math.PI/2;q.name='q226'}catch(e){}return x})}}
// sur la carte (les paille-en-queue des falaises) : de temps en temps, il s'arrête en vol, ailes ouvertes, ou pique
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(!S||typeof scene==='undefined')return r;const now=performance.now()/1000;
  const L=[];try{if(typeof VOL138!=='undefined')VOL138.pq.forEach(g=>g.traverse(o=>{if(o.name==='q226')L.push(o)}))}catch(e){}
  try{if(typeof EAUX218!=='undefined')for(const k in EAUX218.L)EAUX218.L[k].B.forEach(b=>{const q=b.w.getObjectByName('q226');if(q){q.userData.plonge=b.pl>0?Math.min(1,(1.4-b.pl)/.5):0;L.push(q)}})}catch(e){}
  L.forEach(q=>{if(q.userData.t226==null)q.userData.t226=Math.random()*20;const c=(now+q.userData.t226)%14,arret=c>11&&c<13.2?Math.sin((c-11)/2.2*Math.PI):0,pl=q.userData.plonge||0;
   let cible=Math.PI/2;if(pl>0)cible=Math.PI/2+pl*(Math.PI/2);else if(arret>0)cible=Math.PI/2-arret*(Math.PI/2);q.rotation.x+=(cible-q.rotation.x)*.12});
  if(typeof NB144!=='undefined')NB144.zoi.forEach((w,i)=>{if(!w||!w.visible)return;if(!w.userData.z226){w.userData.z226=1;w.scale.multiplyScalar(1.8)}const a=now*1.4+i*2.1;w.position.x+=Math.cos(a)*.18;w.position.z+=Math.sin(a*1.3)*.14;w.position.y+=.26+.05*Math.abs(Math.sin(now*6+i));w.rotation.y=Math.atan2(-Math.sin(a),Math.cos(a*1.3)*1.3)})}catch(e){}return r}}
