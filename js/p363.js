// ===== p363 : la langue du jeu. Français de base ; anglais au choix, sur l'écran d'accueil (FR | EN), retenu d'une partie à
// l'autre. Le moteur traduit ce qui s'affiche : chaque texte posé dans la page est cherché dans le dictionnaire (TR363,
// fichier à part, qui grandit par lots) — phrase entière d'abord, puis phrase par phrase ; ce qui n'est pas encore traduit
// reste en français. Les noms propres, les mots créoles et malgaches ne sont jamais traduits. =====
const LANG363=(()=>{try{return localStorage.getItem('tsa-lang')||'fr'}catch(e){return 'fr'}})();
if(typeof TR363==='undefined')window.TR363={};
function tr363(s){if(LANG363!=='en'||!s)return s;const t=s.trim();if(!t||t.length<2)return s;const d=TR363;if(d[t]!=null)return s.replace(t,d[t]);
 // phrase par phrase
 const P=t.split(/(?<=[.!?…»])\s+/);if(P.length>1){let n=0;const R=P.map(p=>{if(d[p]!=null){n++;return d[p]}return p});if(n)return s.replace(t,R.join(' '))}
 // préfixes d'icône (« 🔥 Vider »)
 const m=t.match(/^([^A-Za-zÀ-ÿ]+)\s*(.+)$/);if(m&&d[m[2]]!=null)return s.replace(t,m[1].trimEnd()+' '+d[m[2]]);
 {// v496-497 : les effets « Cohésion +3, colonie −2, traque +4. » et les compteurs « Personnes 12 » : mot par mot
 const EW=tr363.EW||(tr363.EW={'cohésion':'cohesion','colonie':'colony','traque':'manhunt','savoir':'knowledge','mystique':'mystic','santé':'health','vivres':'food','personnes':'people','personne':'person','anciens':'elders','gardiens':'guardians','menace':'threat','forêt':'forest','bras':'hands','jardinières':'gardeners','marronnage':'marronnage','esclavage':'slavery','harmonie':'harmony','gibier':'game','bois':'wood','paille':'straw','pierre':'stone','or':'gold','mousquets':'muskets','bétail':'livestock','endurance':'stamina','moral':'morale','pouvoir':'power','renommée':'renown','vitesse':'speed','force':'strength','vie':'life','abris':'shelters','tension':'tension','confiance':'trust','pistage':'tracking','chasseurs':'hunters','cueilleurs':'gatherers','éclaireurs':'scouts','artisans':'craftspeople','guetteurs':'lookouts','archers':'archers','mémoire':'memory','soins':'care','souffle':'breath','agilité':'agility','résistance':'resistance','esprit':'spirit','pression':'pressure','écart':'gap'});
  const re=/^([A-Za-zÀ-ÿ’' ]+?)\s*:?\s*([+−\-–×]?\s?\d+(?:[.,]\d+)?\s?%?)$/;const eff=q=>{q=q.trim();const m=q.match(re);if(m&&EW[m[1].trim().toLowerCase()]!=null){let w=EW[m[1].trim().toLowerCase()];if(/^[A-ZÀ-Ý]/.test(m[1]))w=w[0].toUpperCase()+w.slice(1);return q.replace(m[1].trim(),w)}if(/^\+?\d+ (personnes?|bras)$/i.test(q))return q.replace(/personnes?/i,x=>/s$/i.test(x)?'people':'person').replace(/bras/i,'hands');return null};tr363.eff=eff;
  const P=t.replace(/[.]$/,'').split(/,\s*/);const R=P.map(eff);if(R.every(x=>x!=null))return s.replace(t,R.join(', ')+(/[.]$/.test(t)?'.':''))}
 // v495 : les nombres changent (« Reprendre en 1671 », « Encore 3 case(s) ») : on cherche le modèle avec # à la place des nombres
 const tpl=x=>{const N=[];const k=x.replace(/\d+(?:[.,]\d+)?/g,v=>{N.push(v);return '#'});if(!N.length||d[k]==null)return null;let i=0;return d[k].replace(/#/g,()=>N[i++])};
 {const r=tpl(t);if(r!=null)return s.replace(t,r)}
 // v495 : les bandeaux « a · b · c » : chaque morceau à part
 if(t.includes(' · ')){const L=t.split(' · ');let n=0;const R=L.map(p=>{const q=p.trim();if(d[q]!=null){n++;return d[q]}const r=tpl(q);if(r!=null){n++;return r}const e=tr363.eff(q);if(e!=null){n++;return e}return p});if(n)return s.replace(t,R.join(' · '))}
 // v480 : phrases assemblées dans le code (« un détachement fouille les ravines autour de » + un nom) : on remplace les morceaux connus, du plus long au plus court
 // v497 : les listes « … : Pièges et guet, Mémoire des ancêtres. » : chaque élément connu à part
 {const S=t.split(/([:;,]\s+|\s+:\s+)/);if(S.length>2){let n=0;const R=S.map((p,i)=>{if(i%2)return p;const q=p.replace(/[.]$/,'');const v=d[q]!=null?d[q]:(tpl(q)!=null?tpl(q):null);if(v!=null&&q.length>2){n++;return v+(p.endsWith('.')&&q!==p?'.':'')}return p});if(n){const u=R.join('');if(u!==t){const w=tr363(u);return s.replace(t,w===u?u:w)}}}}
 const F=window.FRAG363;if(F&&t.length>6){const c=tr363.c||(tr363.c=new Map());if(c.has(t)){const v=c.get(t);return v==null?s:s.replace(t,v)}let r=t,n=0;for(const [a,b] of F){if(a.length<=r.length&&r.includes(a)){r=r.split(a).join(b);n++}}if(c.size>4000)c.clear();c.set(t,n?r:null);if(n)return s.replace(t,r)}return s}
if(LANG363==='en'){document.documentElement.lang='en';
 const fait=new WeakMap(),passe=n=>{if(n.nodeType===3){const v=n.nodeValue;if(fait.get(n)===v)return;const r=tr363(v);if(r!==v)n.nodeValue=r;fait.set(n,n.nodeValue);return}
  if(n.nodeType!==1||/^(SCRIPT|STYLE|CANVAS|TEXTAREA)$/.test(n.nodeName))return;for(const a of ['title','placeholder','aria-label']){const v=n.getAttribute&&n.getAttribute(a);if(v){const r=tr363(v);if(r!==v)n.setAttribute(a,r)}}
  for(let c=n.firstChild;c;c=c.nextSibling)passe(c)};
 const go=()=>{passe(document.body);new MutationObserver(L=>{for(const m of L){if(m.type==='characterData')passe(m.target);else m.addedNodes.forEach(passe);if(m.type==='attributes')passe(m.target)}}).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['title','placeholder']})};
 if(document.body)go();else addEventListener('DOMContentLoaded',go);
 // les textes dessinés sur les canevas (tableaux de la genèse, petits jeux 2D)
 try{const F=CanvasRenderingContext2D.prototype,f0=F.fillText,s0=F.strokeText;F.fillText=function(t,...a){return f0.call(this,tr363(String(t)),...a)};F.strokeText=function(t,...a){return s0.call(this,tr363(String(t)),...a)}}catch(e){}
 try{const a0=window.alert;window.alert=t=>a0(tr363(String(t)))}catch(e){}}
// le choix sur l'écran d'accueil
setInterval(()=>{try{const e=document.getElementById('ecran');if(!e||e.hidden||document.getElementById('lang363'))return;const d=document.createElement('div');d.id='lang363';
 d.style.cssText='position:absolute;top:14px;right:16px;z-index:50;display:flex;gap:2px;background:rgba(20,14,8,.6);border:1px solid rgba(232,190,90,.35);border-radius:999px;padding:3px;font:700 12px Montserrat,system-ui';
 [['fr','Français'],['en','English']].forEach(([k,n])=>{const b=document.createElement('button');b.textContent=n;b.dataset.l=k;b.style.cssText='border:0;border-radius:999px;padding:5px 11px;cursor:pointer;font:inherit;'+(LANG363===k?'background:#e2bd74;color:#1a120a':'background:transparent;color:#efe9da');
  b.onclick=()=>{if(k===LANG363)return;try{localStorage.setItem('tsa-lang',k)}catch(x){}location.reload()};d.appendChild(b)});e.appendChild(d)}catch(e){}},500);
