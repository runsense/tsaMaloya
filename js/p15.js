
// ===== Le conte et les jeux stratégiques : il ne reste plus figé devant eux =====
// en mode Histoire, conte en marche : un bandeau propose de jouer soi-même ; sans réponse, le conte joue la scène et en donne l'issue
function conteForce(){const g=S||{};let p=.5+Math.min(.15,(g.gens||0)/200)+Math.min(.12,(g.fu||0)*.03)+Math.min(.1,(g.myst||0)*.004)+((g.coh||50)-50)/400;return Math.max(.25,Math.min(.85,p))}
function conteScene(nom,jouer,auto){if(!S||S.bac||!modeHist()||!autoD()){jouer();return}
 const d=document.createElement('div');d.id='conteSc';d.style.cssText='position:fixed;inset:0;z-index:96;display:flex;align-items:center;justify-content:center;background:rgba(10,8,6,.6)';
 d.innerHTML='<div style="background:#1e1912;color:#f0e6d0;border:1px solid #e8be5a;border-radius:10px;padding:18px 22px;max-width:440px;font:15px system-ui"><small style="color:#e8be5a">Le conte</small><h3 style="margin:4px 0 8px">'+nom+'</h3><p>Le conte joue la scène pour vous dans <b id="csN">6</b> s. Vous pouvez la jouer vous-même : le conte se met alors en pause.</p><div style="display:flex;gap:10px;justify-content:flex-end"><button class="bt sec" id="csJ">La jouer moi-même</button><button class="bt" id="csA">Laisser le conte</button></div></div>';
 document.body.appendChild(d);let n=6,fini=0;const go=moi=>{if(fini)return;fini=1;clearInterval(it);d.remove();if(moi){S.autoD=0;S.autoSusp=1;autoBtn();jouer()}else{const w=rnd()<conteForce();log('Le conte a joué « '+nom+' » : '+(w?'victoire.':'défaite.'));toast(nom+' : '+(w?'victoire':'défaite'));auto(w)}};
 const it=setInterval(()=>{n--;const e=$('csN');if(e)e.textContent=n;if(n<=0)go(false)},1000);d.querySelector('#csJ').onclick=()=>go(true);d.querySelector('#csA').onclick=()=>go(false)}
{const W=(k,nom,res)=>{const o=window[k];if(typeof o!=='function')return;const f=function(...a){const fin=a[a.length-1];conteScene(typeof nom==='function'?nom(...a):nom,()=>o.apply(this,a),w=>{if(typeof fin==='function')fin(res(w,...a))})};window[k]=f;try{eval(k+'=f')}catch(e){}};
 W('ouvrirBataille',k=>{const s=typeof BTU!=='undefined'&&BTU.SC.find(x=>x.k===k);return s?s.n:'La bataille'},w=>({gagne:w,manche:w?5:1+Math.floor(rnd()*4)}));
 W('ouvrirCommando',k=>{const m=typeof CMD!=='undefined'&&CMD.M[k];return m?m.n:'Le commando'},(w,k)=>({ok:w,mission:k,alerte:!w&&rnd()<.5}));
 W('ouvrirDuel','Le duel',w=>({ok:w,rounds:w?2:Math.floor(rnd()*2)}));
 W('ouvrirEchecs',k=>{const c=typeof ECH!=='undefined'&&ECH.C[k];return c?c.n:'Les échecs d’invasion'},w=>({ok:w,victoires:w?3:1}))}
// l'embuscade et la défense du camp : le conte place les guerriers et les pièges, lance le combat, puis le referme
setInterval(()=>{if(!B||!S||S.bac||!modeHist()||!autoD()||performance.now()-calme<3000)return;
 if(B.etat==='place'){const ordre={falaise:0,riviere:1,rochers:2,arbre:3,buisson:4};B.slots.slice().sort((a,b)=>ordre[a.k]-ordre[b.k]).forEach(s=>{if(B.slots.filter(u=>u.w).length<B.nG)s.w=1});for(let c=2;c<=6&&B.pieges.length<B.nP;c++)if(!B.pieges.includes(c))B.pieges.push(c);infoBat();drawBat();toast('Le conte place les guerriers et les pièges.');setTimeout(()=>{if(B&&B.etat==='place')lancerBat()},1500)}
 else if(B.etat==='fin'){const b=document.querySelector('#bb button');if(b)b.click()}},1000);

// ===== Le clavier =====
// Histoire : Espace arrête ou reprend le conte. Jeu : Espace ouvre le camp ou ramène à la carte.
// Tab (Maj+Tab : en arrière) : camp suivant, la vue se centre dessus.
// Flèches : dans le camp, d'un acteur à l'autre ; sur la carte en Histoire, groupes en mission, puis camps, puis comptoirs d'outre-mer.
// Dans un onglet ou un récit : flèches haut et bas pour choisir, Entrée pour valider.
// Sur la carte : la lettre soulignée ouvre l'onglet (S, C, P, O, F, D, J, A) ; Maj gauche + lettre soulignée : l'action de la case choisie.
// Maj droite : nouvelle partie (deux fois pour confirmer). Suppr : annuler l'action.
{const st=document.createElement('style');st.textContent='.kL{text-transform:uppercase;text-decoration:underline;text-underline-offset:2px}.kF{outline:2px solid #ffd36a!important;outline-offset:2px}';document.head.appendChild(st)}
const KB={shL:0,shR:0,shSeul:0,i:-1};
// les lettres : la première libre de chaque libellé, dans l'ordre (deux libellés qui commencent pareil : le second prend sa deuxième lettre, et ainsi de suite)
function kbLettres(btns){const pris=new Set(),R=new Map();btns.forEach(b=>{if(b.dataset.kl&&b.querySelector('.kL')){pris.add(b.dataset.kl);R.set(b.dataset.kl,b);return}
 let w=null;{const tw=document.createTreeWalker(b,NodeFilter.SHOW_TEXT);let n;while((n=tw.nextNode()))if(/[a-zà-ÿ]/i.test(n.textContent)){w=n;break}}const t=w?w.textContent:'';const s=t.normalize('NFD');let pos=-1,l='';
 for(let i=0,j=0;i<t.length;i++){const c=t[i].normalize('NFD')[0].toLowerCase();if(/[a-z]/.test(c)&&!pris.has(c)){pos=i;l=c;break}}
 if(pos<0)return;pris.add(l);b.dataset.kl=l;R.set(l,b);const sp=document.createElement('span');sp.className='kL';sp.textContent=t[pos];const a=document.createTextNode(t.slice(0,pos)),z=document.createTextNode(t.slice(pos+1));w.replaceWith(a,sp,z)});return R}
function kbOnglets(){return kbLettres([...document.querySelectorAll('.tab[data-t]')])}
function kbCase(){return kbLettres([...document.querySelectorAll('#side [data-a]')].filter(b=>!b.disabled))}
setInterval(()=>{if(S&&$('ecran').hidden){kbOnglets();kbCase()}},400);
function kbStrat(){return !!(B||F||N||$('pjIntro')||$('conteSc')||(window.BTUON&&!CV.on))}
function kbCentrer(t,d){if(!t)return;sel=t;if(typeof conteVoir==='function')conteVoir(t,d||9);panneau()}
// la liste parcourue aux flèches sur la carte, en Histoire : groupes, camps, comptoirs
function kbCibles(){const L=[];(exps||[]).forEach(e=>{if(e.t)L.push({k:'g',t:e.t})});(S.grp||[]).forEach(g=>{const t=T[g.pos];if(t)L.push({k:'g',t})});camps().forEach(t=>L.push({k:'c',t}));Object.keys(S.out||{}).filter(k=>S.out[k]).forEach(k=>L.push({k:'o',o:k}));return L}
function kbFocus(L,d){if(!L.length)return;let i=L.findIndex(b=>b.classList.contains('kF'));L.forEach(b=>b.classList.remove('kF'));i=(i+d+L.length)%L.length;if(i<0)i=0;L[i].classList.add('kF');L[i].scrollIntoView({block:'nearest'});L[i].focus&&L[i].focus({preventScroll:true})}
function kbBoutons(el){return el?[...el.querySelectorAll('button,[data-ph]')].filter(b=>!b.disabled&&b.offsetParent!==null):[]}
// le conte ne s'arrête pas sur les touches qui le commandent
{const cs=conteStop;conteStop=function(){const e=window.event;if(e&&e.type==='keydown'&&(e.code==='Space'||e.key===' '))return;cs()}}
addEventListener('keyup',e=>{if(e.code==='ShiftLeft')KB.shL=0;if(e.code==='ShiftRight'){KB.shR=0;if(KB.shSeul&&S&&$('ecran').hidden&&!kbStrat()){const b=$('nvp');if(b)b.click()}KB.shSeul=0}},true);
addEventListener('keydown',e=>{const tg=e.target;if(tg&&(tg.tagName==='INPUT'||tg.tagName==='TEXTAREA'||tg.isContentEditable))return;
 if(e.code==='ShiftLeft'){KB.shL=1;return}if(e.code==='ShiftRight'){KB.shR=1;KB.shSeul=1;return}KB.shSeul=0;
 if(!S||!$('ecran').hidden||kbStrat())return;const H=modeHist(),m=$('modal'),modal=m&&!m.hidden,k=e.key,stop=()=>{e.preventDefault();e.stopPropagation()};
 // un récit ou un onglet ouvert : on choisit aux flèches, on valide à Entrée
 const zone=modal?m:(onglet&&$('drawer')&&!$('drawer').hidden?$('drawer'):null);
 if(zone&&(k==='ArrowDown'||k==='ArrowUp')){stop();kbFocus(kbBoutons(zone),k==='ArrowDown'?1:-1);return}
 if(zone&&k==='Enter'){const f=zone.querySelector('.kF');if(f){stop();f.classList.remove('kF');f.click()}return}
 if(k==='Escape'&&onglet){stop();fermerOnglet();return}
 if(e.code==='Space'){stop();if(H){$('auto').click()}else tempsBascule114();return}
 if(k==='Enter'&&!H){stop();if(CV.on)cvFermer();else cvOuvrir();return}
 if(k==='Escape'&&CV.on){stop();cvFermer();return}
 if(k==='Delete'){stop();const u=$('undo');if(u&&!u.disabled)u.click();return}
 if(k==='Tab'&&H){stop();passerAttente121();return}
 if(k==='Tab'||e.code==='Numpad4'||e.code==='Numpad6'||e.code==='Numpad8'||e.code==='Numpad2'){if(k==='Tab'&&H)return;stop();const cs=camps();if(!cs.length)return;const cur=CV.on?CV.camp:(sel?sel.i:-1);let i=cs.findIndex(t=>t.i===cur);i=(i+((e.shiftKey||e.code==='Numpad4'||e.code==='Numpad8')?-1:1)+cs.length)%cs.length;if(CV.on)cvOuvrir(cs[i].i);else kbCentrer(cs[i]);toast('Camp '+(i+1)+' sur '+cs.length);return}
 if(k.startsWith('Arrow')){
  if(CV.on){stop();const P=(S.pp||[]).filter(p=>campDe(p)===CV.camp&&!enGrp(p)).sort((a,b)=>(adulte(b)?1:0)-(adulte(a)?1:0));if(!P.length)return;let i=P.findIndex(p=>p.id===CV.selP);i=(i+(k==='ArrowRight'||k==='ArrowDown'?1:-1)+P.length)%P.length;const p=P[i];CV.selP=p.id;const a=CV.A[p.id];if(a){a.say=cvDit(p,a);a.sayT=180}cvListe();return}
  if(k==='ArrowUp'||k==='ArrowDown'){stop();const L=kbCibles();if(!L.length)return;KB.i=(KB.i+(k==='ArrowDown'?1:-1)+L.length)%L.length;const c=L[KB.i];if(c.k==='o'){cpOuvrir(c.o);toast('Outre-mer : '+((typeof OUT!=='undefined'&&OUT[c.o]&&OUT[c.o].n)||c.o))}else{if(onglet)fermerOnglet();kbCentrer(c.t,c.k==='g'?7:9);toast(c.k==='g'?'Groupe en mission':'Camp')}return}
  return}
 if(CV.on)return;
 // les lettres
 const l=(k||'').toLowerCase();if(l.length!==1||!/[a-z]/.test(l)||e.ctrlKey||e.altKey||e.metaKey)return;
 // une case choisie : les lettres sont celles de ses actions ; rien de choisi : celles des onglets
 {const C=sel?kbCase():null;if(C&&C.size){const b=C.get(l);if(b){stop();b.click()}else stop();return}}
 if(e.shiftKey&&KB.shL){const b=kbCase().get(l);if(b){stop();b.click()}return}
 if(!e.shiftKey){const b=kbOnglets().get(l);if(b){stop();b.click()}}},true);
// Échap sur la carte : on lâche la case choisie, on retrouve les raccourcis généraux
addEventListener('keydown',e=>{try{if(e.key!=='Escape'||!S||!sel||VP||CV.on||lieu||window.choixExp)return;const m=$('modal');if(m&&!m.hidden)return;if(document.querySelector('#bt,#m2,#kons:not([hidden]),#cons87,#hb,#roi97'))return;sel=null;try{peindre()}catch(_){}panneau()}catch(_){}});
// les onglets montrent leur lettre seulement quand rien n'est choisi
setInterval(()=>{try{document.body.classList.toggle('kbCase',!!(S&&sel))}catch(e){}},300);
{const st=document.createElement('style');st.textContent='body.kbCase .tab .kL{text-decoration:none;text-transform:none}';document.head.appendChild(st)}
