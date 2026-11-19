
// ===== p154 : les fiches illustrées — quand une fiche parle d'une bête ou d'une plante dont on a le modèle 3D, sa vignette s'affiche à côté =====
// Une seule petite scène hors écran rend chaque modèle une fois (vue de trois quarts, fond transparent), puis l'image est gardée.
// Fiches visées : les annonces (disparitions, arrivées d'espèces, conte), « Le bois d'ici », l'herbier, la lettre, les cartes de lieu.
const VG154={r:null,c:{},cles:[
 [/tortue/i,'sk_tortue'],[/solitaire|ibis/i,'sk_ibis'],[/mascarin|perroquet|perruche/i,'sk_perroquet'],[/roussette|chauve-souris/i,'sk_roussette'],
 [/papangue|busard/i,'oi_papangue'],[/paille-en-queue|phaéton/i,'oi_phaeton'],[/pétrel/i,'oi_petrel'],[/zoizo|oiseau-lunettes|oiseau blanc/i,'oi_zoiso'],
 [/pigeon/i,'sk_pigeon'],[/scinque|gecko|lézard/i,'sk_scinque'],[/\brats?\b/i,'sk_rat'],[/\bcerfs?\b/i,'ani_cabri',{tint:0xc89060}],[/cabri/i,'ani_cabri'],[/cochon/i,'ani_cochon'],[/tangue/i,'ani_tangue'],
 [/bœuf|boeuf/i,'ani_boeufc'],[/mouton|agneau/i,'ani_mouton'],[/\bchiens?\b/i,'ani_chien'],[/cocotier/i,'sk_cocotier'],
 [/tamarin des hauts/i,'plante_tamarin'],[/ambaville/i,'plante_ambaville'],[/benjoin|bois de couleurs/i,'plante_benjoin'],[/bois de chandelle/i,'plante_bois_chandelle'],[/branle/i,'plante_branle'],
 [/fanjan|fougère arborescente/i,'plante_fanjan'],[/latanier/i,'plante_latanier'],[/palmiste/i,'plante_palmiste'],[/vacoa/i,'plante_vacoa']]};
function vgRendu154(){if(VG154.r)return VG154.r;const r=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});r.setSize(192,192);r.setClearColor(0,0);try{r.outputEncoding=THREE.sRGBEncoding}catch(e){}
 const s=new THREE.Scene();s.add(new THREE.HemisphereLight(0xffffff,0x6a6050,1.15));const d=new THREE.DirectionalLight(0xffffff,.8);d.position.set(2,3,2);s.add(d);const c=new THREE.PerspectiveCamera(30,1,.01,100);return VG154.r={r,s,c}}
function vignette154(n,o){const k=n+(o&&o.tint||'');if(VG154.c[k])return VG154.c[k];const src=/^plante_/.test(n)&&typeof arbGeo153==='function'?arbGeo153(n).then(L=>{const w=new THREE.Group();L.forEach(q=>w.add(new THREE.Mesh(q.ge,q.mat)));return {w,mx:null}}):inst144(n,{h:1,tint:o&&o.tint});VG154.c[k]=src.then(({w,mx})=>{const R=vgRendu154();if(mx)mx.update(.6);if(false)w.traverse(o=>{if(!o.isMesh||(o.material&&o.material.map))return;let g=o.geometry.clone();['normal','uv','color'].forEach(a=>{if(g.attributes[a])g.deleteAttribute(a)});g=meshyPeindre(g,n.slice(7));o.geometry=g;o.material=new THREE.MeshLambertMaterial({vertexColors:true,flatShading:true})});R.s.add(w);w.updateMatrixWorld(true);
  const b=new THREE.Box3().setFromObject(w),sz=b.getSize(new THREE.Vector3()),ce=b.getCenter(new THREE.Vector3()),m=Math.max(sz.x,sz.y,sz.z)||1;
  R.c.position.set(ce.x+m*1.35,ce.y+m*.75,ce.z+m*1.75);R.c.lookAt(ce);R.r.render(R.s,R.c);const url=R.r.domElement.toDataURL('image/png');R.s.remove(w);return url});return VG154.c[k]}
function vgMod154(txt){for(const [re,n,o] of VG154.cles)if(re.test(txt))return [n,o];return null}
function vgPose154(el,txt,taille){if(!el)return;const t0=(el.textContent||'').slice(0,90);if(el.dataset.vg154&&el.dataset.vgT===t0)return;if(el.dataset.vg154){el.querySelectorAll(':scope > img.vg154').forEach(i=>i.remove())}el.dataset.vgT=t0;const m=vgMod154(txt||el.textContent||'');el.dataset.vg154=m?m[0]:'-';if(!m)return;
 vignette154(m[0],m[1]).then(url=>{if(!el.isConnected)return;const i=document.createElement('img');i.src=url;i.className='vg154';i.alt='';i.title='Modèle 3D';i.style.cssText='float:right;width:'+(taille||88)+'px;height:'+(taille||88)+'px;margin:0 0 6px 10px;border-radius:8px;background:radial-gradient(#fffdf6,#e8e0cc);border:1px solid rgba(0,0,0,.18);object-fit:contain';el.insertBefore(i,el.firstChild)}).catch(()=>{})}
setInterval(()=>{try{if(typeof THREE==='undefined'||typeof inst144!=='function')return;
 // une annonce : on regarde d'abord le titre, puis le texte
 const md=document.getElementById('modal');if(md&&!md.hidden){const b=md.querySelector('.carte .in')||md.querySelector('.bx,.box,div')||md;const ti=(md.querySelector('h1,h2,h3')||{}).textContent||'';vgPose154(b,ti+' '+(vgMod154(ti)?'':b.textContent),96)}
 ['#tuto','#cine .ctx','#conteSc','#lettreD','#bois116 > div','#hb .pl > div','.bandeau115','#ban115','#casc147'].forEach(q=>document.querySelectorAll(q).forEach(el=>{if(el.offsetParent!==null||getComputedStyle(el).position==='fixed')vgPose154(el,null,q.includes('#hb')||q.includes('bois116')?56:80)}))}catch(e){}},700);
