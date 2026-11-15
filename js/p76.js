// ===== p76 : Survie — « Qui travaille où » montre ce que chaque poste rapporte dans l'année =====
const KRN={viv:'vivres',bois:'bois',pierre:'pierre',com:'commerce',sav:'savoir'};
function kRapport(i,k){const t=T[i];if(!t)return null;const n=((K.trav||{})[i]||{})[k]||0,ad=x=>!!(K.adopt||{})[x];
 if(k.startsWith('bat_')){const b=k.slice(4),nb=KBRAS[b]||0,q=nb?Math.min(1,n/nb):1,ab=((K.b[i]||[]).find(x=>x.k===b)||{}).abime?.4:1,w=q*ab,R={};
  if(b==='habitation'){R.viv=3*w;if(K.an>=1715)R.com=2*w}if(b==='champ'||b==='port')R.com=3*w;if(b==='ville')R.sav=2*w;if(b==='camp')R.viv=(2+(ad('Alliance des camps')?1:0))*w;if(b==='jardin')R.viv=3*w;
  return {R,plein:nb?Math.min(n,nb)+' / '+nb+' pour tourner à plein':''}}
 const A=KACT[k];if(!A)return null;let v=n*A.k*kLoin(t);if(k==='bois')v*=Math.max(.2,(K.foret[i]||0)/100);if(k==='vivres')v*=((K.gibier[i]??100)/100);return {R:{[A.r]:v},plein:k==='vivres'?'gibier '+Math.round(K.gibier[i]??100)+' %':k==='bois'?'forêt '+Math.round(K.foret[i]||0)+' %':''}}
const kFmt=R=>Object.entries(R).filter(([,v])=>v>.04).map(([r,v])=>'+'+(Math.round(v*10)/10)+' '+KRN[r]).join(', ')||'rien encore';
{const kd=kQuiDess;kQuiDess=function(){const r=kd.apply(this,arguments);try{const q=$('kQui');if(!q)return r;
  q.querySelectorAll('.l').forEach(l=>{const m=l.querySelector('[data-qm]');if(!m||l.nextElementSibling&&l.nextElementSibling.classList.contains('kRap'))return;const [i,k]=m.dataset.qm.split('|'),x=kRapport(+i,k);if(!x)return;
   const d=document.createElement('div');d.className='kRap';d.style.cssText='font-size:11px;opacity:.85;margin:-2px 0 4px 4px;color:#cfe3b8';d.textContent='→ '+kFmt(x.R)+' par an'+(x.plein?' · '+x.plein:'');l.after(d)});
  const B=kBilan(),h=document.createElement('div');h.style.cssText='font-size:12px;margin:2px 0 6px;padding:5px 7px;border-radius:5px;background:rgba(232,190,90,.12)';
  h.innerHTML='<b>Sur l’année</b> : '+kFmt({viv:B.viv+B.mange,bois:B.bois,pierre:B.pierre})+' · on mange '+Math.round(B.mange)+' vivres · reste <b style="color:'+(B.viv>=0?'#9fd27a':'#ff8a6a')+'">'+(B.viv>=0?'+':'')+Math.round(B.viv*10)/10+' vivres</b>';
  const note=q.querySelector('p.note');if(note)note.after(h)}catch(e){}return r}}
// ----- le conseil : clore la session sans voter, c'est laisser le conseil voter seul les idées restées sur la table -----
document.addEventListener('click',e=>{try{if(!e.target||e.target.id!=='kCoF'||!K||!K.idees||!K.idees.length)return;let n=0;
 for(let i=K.idees.length-1;i>=0;i--){const I=K.idees[i];if(I.choix)continue;const c=kCompte(I);kLog('Le conseil vote seul « '+I.x[0]+' » : '+c.pour+' pour, '+c.contre+' contre.');kDecide(i,c.pour>c.contre);n++}
 if(n)toast(n>1?'Le conseil a voté seul '+n+' idées restées sur la table.':'Le conseil a voté seul l’idée restée sur la table.')}catch(err){}},true);
