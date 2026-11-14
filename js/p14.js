
// ===== Sauvegarde : dans le navigateur (comme avant), sur votre compte quand la page est publiée sur claude.ai, et dans un fichier =====
// le navigateur peut perdre sa mémoire (navigation privée, nettoyage, page publiée) : le compte et le fichier, non
const SVG={db:null,uid:null,t:0,dl:null};
SVG.pret=(async()=>{try{if(!window.claude||!window.claude.use)return;const [db,u,dl]=await Promise.all([claude.use('db'),claude.use('user'),claude.use('downloads')]);SVG.dl=dl;if(!db||!u)return;const id=await u.id();if(id){SVG.db=db;SVG.uid=id}}catch(e){}})();
function svgRef(){return SVG.db?SVG.db.doc('data/users/'+SVG.uid+'/parties/courante'):null}
function svgTexte(){let j=JSON.stringify(S);if(j.length>240000){const c=JSON.parse(j);c.log=(c.log||[]).slice(-120);j=JSON.stringify(c)}return j}
function svgNuage(force){if(!S||BAC||S.bac||!SVG.db)return Promise.resolve(false);const now=Date.now();if(!force&&now-SVG.t<20000)return Promise.resolve(false);SVG.t=now;let j;try{j=svgTexte()}catch(e){return Promise.resolve(false)}
 return svgRef().set({s:j,t:now,an:S.year}).then(()=>true,()=>false)}
{const s0=sauve;sauve=function(){s0();if(BAC||(S&&S.bac))return;try{localStorage.setItem(CLE+'-t',String(Date.now()))}catch(e){}svgNuage(false)}}
addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&S&&!S.fin){sauve();svgNuage(true)}});
// en mode Jeu, le temps passe sans clic : on sauvegarde aussi chaque minute
setInterval(()=>{if(S&&!S.fin&&!S.bac&&!BAC&&$('ecran').hidden)sauve()},60000);
// reprendre une partie lue ailleurs (compte ou fichier) : elle passe par le navigateur, puis le chemin habituel
function svgReprendre(sv){try{localStorage.setItem(CLE,JSON.stringify(sv));localStorage.setItem(CLE+'-t',String(Date.now()))}catch(e){}
 const f=!!sv.grf;if(typeof GRF!=='undefined'&&f!==GRF){grilleChange(f,{cont:1});return}S=sv;jouer()}
function svgFichierLire(){const i=document.createElement('input');i.type='file';i.accept='.json,.tsa,application/json';i.onchange=()=>{const f=i.files&&i.files[0];if(!f)return;f.text().then(t=>{let sv=null;try{sv=JSON.parse(t)}catch(e){}
 if(!sv||!sv.year||!(sv.pp||sv.gens)){toast('Ce fichier n’est pas une partie de TsaMaloya.');return}if(sv.fin){toast('Cette partie est terminée.');return}svgReprendre(sv)})};i.click()}
function svgFichierEcrire(){if(!S)return;sauve();svgNuage(true);let j;try{j=svgTexte()}catch(e){toast('La partie n’a pas pu être écrite.');return}
 const d=new Date(),nom='TsaMaloya_'+S.year+'_'+d.toISOString().slice(0,10)+'.json';
 if(SVG.dl){SVG.dl.save({filename:nom,data:j}).then(()=>toast('Partie enregistrée : '+nom),e=>{if(e&&e.code!=='declined'&&e.code!=='dismissed')toast('Le fichier n’a pas pu être enregistré.')});return}
 try{const u=URL.createObjectURL(new Blob([j],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download=nom;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);toast('Partie enregistrée : '+nom)}catch(e){toast('Le fichier n’a pas pu être enregistré.')}}
// l'accueil : « Reprendre » prend la sauvegarde la plus récente, navigateur ou compte ; et on peut ouvrir un fichier
function svgAccueil(){const e=$('ecran');if(!e||e.hidden||!$('nv'))return;
 if(!$('svF')){const b=document.createElement('button');b.className='bt sec';b.id='svF';b.textContent='Ouvrir une partie enregistrée (fichier)';b.onclick=svgFichierLire;$('nv').insertAdjacentElement('afterend',b)}
 SVG.pret.then(()=>{const r=svgRef();if(!r)return;return r.get().then(d=>{if(!d.exists||!$('nv')||$('ecran').hidden)return;const x=d.data();let lt=0;try{lt=+localStorage.getItem(CLE+'-t')||0}catch(e){}const loc=charge();
  if(loc&&!loc.fin&&lt>=x.t)return;let sv=null;try{sv=JSON.parse(x.s)}catch(e){}if(!sv||sv.fin)return;
  let c=$('cont');if(!c){c=document.createElement('button');c.className='bt';c.id='cont';$('nv').insertAdjacentElement('beforebegin',c);$('nv').className='bt sec'}
  c.textContent='Reprendre en '+sv.year+' (partie gardée sur votre compte)';c.onclick=()=>svgReprendre(sv)})}).catch(()=>{})}
{const ac=accueil;accueil=function(snap){ac(snap);svgAccueil()}}
// l'accueil a déjà pu s'afficher avant ce code : on le complète
setTimeout(svgAccueil,50);
// en partie : un bouton pour sauvegarder tout de suite, et garder un fichier
{const b=document.createElement('button');b.className='tab';b.id='svB';b.textContent='💾 Sauvegarder';b.title='Sauvegarde la partie dans ce navigateur, sur votre compte si la page est publiée, et propose un fichier à garder.';b.onclick=()=>{if(!S||S.bac)return;svgFichierEcrire()};const n=$('nvp');if(n)n.insertAdjacentElement('afterend',b)}
