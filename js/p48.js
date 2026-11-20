// ===== p48 : l'onglet ouvert reste toujours surligné ; les habitants d'un lieu à la taille des maisons ; le camp choisit son chef =====

// 1. quel que soit le chemin (clic, guide, mode automatique), l'onglet affiché est celui qui brille
{const dr=drawer;drawer=function(){const r=dr.apply(this,arguments);try{document.querySelectorAll('.tab[data-t]').forEach(x=>x.classList.toggle('on',!!onglet&&x.dataset.t===onglet&&!$('drawer').hidden))}catch(e){}return r}}
setInterval(()=>{try{const d=$('drawer');document.querySelectorAll('.tab[data-t]').forEach(x=>x.classList.toggle('on',!!onglet&&x.dataset.t===onglet&&d&&!d.hidden))}catch(e){}},500);

// 2. en zoomant sur un bourg ou un camp, les habitants font à peu près la hauteur d'un mur de case, plus la taille « lisible de loin » des groupes
{const b0=bat;bat=function(k){b0(k);try{if(typeof LG==='undefined'||!LG.L)return;LG.L.forEach(g=>{const f=MF.L[g.cle];const e=1;if(f&&f.o&&Math.abs(f.o.scale.x-e)>1e-3)f.o.scale.setScalar(e)})}catch(e){}}}

// 3. le chef du camp
// Camp marron : les adultes élisent leur chef. Côté colon, il n'y a pas d'élection du gouverneur dans l'histoire réelle :
// il est nommé par la Compagnie, puis par le roi. Les habitants d'un quartier proposent un commandant de quartier, que le gouverneur nomme ;
// à partir de 1790, ils élisent leurs députés à l'Assemblée coloniale.
function chefTitre(){return !S.voieC?'chef du camp':S.year>=1790?'député à l’Assemblée coloniale':'commandant de quartier'}
function chefDe(ci){const c=(S.chefs||{})[ci];if(!c)return null;const p=ppId(c.id);return p&&campDe(p)===ci?p:null}
function chefPeut(ci){const c=(S.chefs||{})[ci];return !chefDe(ci)||S.year-(c.an||0)>=5}
function chefCandidats(ci){const A=(S.pp||[]).filter(p=>campDe(p)===ci&&adulte(p)&&!enGrp(p));const sc=p=>(p.xp||0)+Math.min(40,ageP(p))/8+(p.role?2:0)+(p.id===S.garde?1:0);return A.sort((a,b)=>sc(b)-sc(a)).slice(0,3).map(p=>({p,s:sc(p)}))}
function chefElire(ci,soutien){const C=chefCandidats(ci);if(!C.length)return;const A=(S.pp||[]).filter(p=>campDe(p)===ci&&adulte(p)),v=C.map(()=>0);
 A.forEach(e=>{let b=0,bs=-1;C.forEach((c,k)=>{const s=c.s+(e.or&&e.or===c.p.or?2:0)+(e.id===c.p.id?3:0)+Math.random()*3+(soutien===c.p.id?2.5:0);if(s>bs){bs=s;b=k}});v[b]++});
 const k=v.indexOf(Math.max(...v)),w=C[k].p,ti=chefTitre(),nm=w.n.split(' ')[0];(S.chefs=S.chefs||{})[ci]={id:w.id,an:S.year};
 const voix=C.map((c,j)=>c.p.n.split(' ')[0]+' '+v[j]).join(', ');
 if(!S.voieC){fx({coh:4});log('Le camp a élu '+nm+' '+ti+' ('+voix+' voix).')}
 else if(S.year>=1790){fx({coh:2});log('Les habitants ont élu '+nm+' '+ti+' ('+voix+' voix).')}
 else{fx({coh:2});log('Les habitants ont proposé '+nm+' ('+voix+' voix) ; le gouverneur l’a nommé '+ti+'.')}
 sauve();cvListe()}
function chefOuvrir(ci){const C=chefCandidats(ci);if(!C.length){toast('Il faut au moins un adulte au camp.');return}const ti=chefTitre();
 const txt=(!S.voieC?'Les adultes du camp vont voter. Vous pouvez soutenir un candidat, sans décider à leur place.':S.year>=1790?'Les habitants votent pour leur député à l’Assemblée coloniale.':'Les habitants proposent un nom au gouverneur, qui nomme le commandant de quartier. Le gouverneur, lui, n’est jamais élu : il vient de la Compagnie ou du roi.')+'<br><br>'+C.map(c=>'<b>'+c.p.n.split(' ')[0]+'</b> · '+ageP(c.p)+' ans'+(c.p.role&&ROLES[c.p.role]?' · '+ROLES[c.p.role].n:'')).join('<br>');
 alerteSimple((!S.voieC?'Élire le ':'Choisir le ')+ti,txt,[['Laisser voter',()=>chefElire(ci)]].concat(C.map(c=>['Soutenir '+c.p.n.split(' ')[0],()=>chefElire(ci,c.p.id)])))}
// dans le panneau du camp, à côté des besoins : le chef, et le vote quand il le faut
{const cl=cvListe;cvListe=function(){cl.apply(this,arguments);try{if(!CV.on||CV.camp==null)return;const K=$('cvCamp');if(!K)return;K.querySelectorAll('.chefC').forEach(e=>e.remove());
 const ci=CV.camp,ch=chefDe(ci),ti=chefTitre(),box=document.createElement('div');box.className='pc chefC';
 box.innerHTML='<b>'+ti.charAt(0).toUpperCase()+ti.slice(1)+'</b><br><small>'+(ch?'⭐ '+ch.n.split(' ')[0]+' depuis '+S.chefs[ci].an:'Personne pour l’instant.')+'</small>'+(chefPeut(ci)?'<br><button class="bt sec" id="chefV">'+(!S.voieC||S.year>=1790?'Voter':'Proposer un nom')+'</button>':'<br><small>Prochain vote en '+(S.chefs[ci].an+5)+'.</small>');
 const B=K.querySelector('.dortC')||K.querySelector('.besC');if(B)B.after(box);else K.appendChild(box);const b=box.querySelector('#chefV');if(b)b.onclick=()=>chefOuvrir(ci);
 // l'étoile du chef dans la liste des acteurs
 if(ch){const r=document.querySelector('#cvL .ac[data-pid="'+ch.id+'"] b');if(r&&!/⭐/.test(r.textContent))r.textContent='⭐ '+r.textContent}}catch(e){}}}

