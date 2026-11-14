
// ===== Jeu : la faune des premières forêts, l'élevage, les bêtes dressées, et l'habitation sur plusieurs cases =====
// solitaires (l'ibis de l'île), drontes, et dodos venus de Maurice : ils ne fuient pas l'homme, ce sont les premières proies
const ANI={sol:{n:'solitaire',np:'solitaires',parc:'parcSol'},dro:{n:'dronte',np:'drontes',parc:'parcDro'},dodo:{n:'dodo',np:'dodos',parc:'parcDodo'}};
const ANIcap=8;
function aniJeu(){return S&&!modeHist()&&grpOn()}
function aniDispo(k){if(fa(k)<=0)return false;if(k==='dodo')return !!(S.out&&S.out.maurice);return true}
// dans le mode Jeu, un parc se construit dès qu'on a vu l'oiseau vivant, sans éleveur libéré
['sol','dro','dodo'].forEach(k=>{const b=BAT[ANI[k].parc];if(!b)return;const r=b.req;b.req=t=>aniJeu()?!!((S.aniVu||{})[k]&&aniDispo(k)):r(t);const q=b.rq;Object.defineProperty(b,'rq',{get:()=>aniJeu()?(k==='dodo'?'Demande le lien avec Maurice, et un dodo vu vivant':'Demande d’avoir vu des '+ANI[k].np+' à la chasse'):q,configurable:true})});
// à la chasse en forêt, la proie est souvent un de ces oiseaux tant qu'il en reste
{const ej=expJour;expJour=function(){if(aniJeu())(S.grp||[]).forEach(g=>{const e=g.exp;if(!e||e.etat!=='sur place'||e.but!=='chasse')return;const t=T[g.pos];if(!t||!t.forest)return;
  const L=Object.keys(ANI).filter(aniDispo);if(!L.length)return;const k=L[Math.floor(rnd()*L.length)];if(rnd()>.15+fa(k)/100*.45)return;
  S.aniVu=S.aniVu||{};const neuf=!S.aniVu[k];S.aniVu[k]=1;S.fa[k]=Math.max(0,fa(k)-2);e.charge+=1.5;
  const parc=typeof nBat==='function'&&nBat(ANI[k].parc)>0;if(parc&&rnd()<.45){e.vif=e.vif||{};e.vif[k]=(e.vif[k]||0)+1}
  if(neuf)journal({sol:'Dans la forêt, '+g.n+' trouve de grands oiseaux blancs au bec courbe qui ne s’envolent pas : des solitaires. Ils regardent les chasseurs sans fuir.',dro:'Plus au nord, '+g.n+' tombe sur des drontes lourds et gris, qui se laissent approcher comme des poules.',dodo:'Des dodos courent sous les arbres : ceux qu’un bateau a amenés de Maurice ont fait des petits dans la forêt.'}[k]);
  else if(rnd()<.3)journal(g.n+' prend '+(e.vif&&e.vif[k]&&parc?'vivant ':'')+'un '+ANI[k].n+'.')});
 // ceux qu'on ramène vivants vont au parc
 const av=(S.grp||[]).map(g=>({g,e:g.exp}));ej();av.forEach(({g,e})=>{if(e&&e.vif&&!(S.grp||[]).includes(g)){for(const k in e.vif){S.ani=S.ani||{};S.ani[k]=Math.min(ANIcap*Math.max(1,nBat(ANI[k].parc)),(S.ani[k]||0)+e.vif[k]);journal(g.n+' ramène '+e.vif[k]+' '+(e.vif[k]>1?ANI[k].np:ANI[k].n)+' vivant'+(e.vif[k]>1?'s':'')+' au parc.')}e.vif=null}})}}
// la vie des parcs : œufs, petits, et ce qui les menace
function aniJour(){if(!aniJeu()||S.fin||!camps().length)return;S.ani=S.ani||{};
 for(const k in S.ani){let n=S.ani[k]||0;if(!n)continue;const cap=ANIcap*Math.max(1,nBat(ANI[k].parc));
  if(!nBat(ANI[k].parc)){S.ani[k]=0;S.fa[k]=fa(k)+n;journal('Sans parc, les '+ANI[k].np+' retournent à la forêt.');continue}
  S.vivres+=n*.05;if(n>=2&&rnd()<.03*Math.floor(n/2)&&n<cap){n++;if(rnd()<.4)journal('Un petit '+ANI[k].n+' est né au parc.')}S.ani[k]=n}
 // le parc à dodos est fragile : chiens errants, vents qui le visent
 if(S.ani.dodo>0){S.dodoJ=(S.dodoJ||0)+1;const prot=(nBat('palissade')>0?.4:1)*((S.bt||[]).some(b=>b.k==='chien'&&b.dr>=60)?.5:1);
  if(rnd()<.006*prot){const n=S.ani.dodo;S.ani.dodo=0;journal('Des chiens errants descendus des habitations sont entrés dans le parc la nuit : les '+n+' dodos sont morts. Il n’y en a peut-être plus nulle part.');log('Le parc à dodos est détruit par des chiens errants.')}}}
{const jt=jourTick;jourTick=function(){jt();aniJour();btJour()}}
// le vent : les oiseaux s'échappent si la clôture est abîmée, et le parc à dodos est souvent touché
{const it=intemperie;intemperie=function(){it();const v=S.vent;if(!S.ani||!v||v.vu||v.j!==S.jourN)return;v.vu=1;const fort=v.f;
 for(const k in S.ani){const n=S.ani[k];if(!n)continue;
  if(k==='dodo'&&fort&&rnd()<.4){S.ani.dodo=0;journal('Le vent a arraché le parc à dodos et noyé les bêtes dans la ravine.');continue}
  if((fort||S.clotAb)&&rnd()<.4){const p=Math.ceil(n/2);S.ani[k]=n-p;S.fa[k]=fa(k)+p;journal(p+' '+(p>1?ANI[k].np:ANI[k].n)+' se sont échappés du parc pendant la tempête.')}}}}
// ===== Les bêtes dressées : chiens des camps marrons, papangue =====
const BTN={chien:['Bayo','Kabo','Ti-Noir','Zoli','Ravine','Mouké','Patat'],papangue:['Lévé','Zié','Vent-Haut','Kriké']};
function btNouv(k){S.bt=S.bt||[];S.btId=(S.btId||0)+1;const L0=BTN[k],L=L0.filter(x=>!S.bt.some(q=>q.n===x));const b={id:S.btId,k,n:(L.length?L:L0)[Math.floor(rnd()*(L.length||L0.length))],dr:k==='chien'?10:0,fl:Math.round((k==='chien'?40:60)+rnd()*30),vi:Math.round(30+rnd()*50)};S.bt.push(b);return b}
function btJour(){if(!aniJeu()||S.fin||!camps().length)return;S.bt=S.bt||[];const C=S.voieC,cha=(S.pp||[]).some(p=>p.role==='cha'&&!enGrp(p)),mys=(S.pp||[]).some(p=>p.role==='mys'&&!enGrp(p));
 // un chien échappé d'une habitation suit les chasseurs ; le papangue se prend au nid une fois qu'on sait comment
 if(!C&&S.bt.filter(b=>b.k==='chien').length<3&&rnd()<.012){const b=btNouv('chien');journal('Un chien maigre échappé d’une habitation suit les chasseurs jusqu’au camp et ne repart plus. On l’appelle '+b.n+'. Il ne touche pas aux bêtes : il attend qu’on lui montre quoi chasser.')}
 if(C&&nBat('chenil')>0&&S.bt.filter(b=>b.k==='chien').length<2*nBat('chenil')&&rnd()<.05){const b=btNouv('chien');b.dr=50;journal('Un chien de garde de plus au chenil : '+b.n+'.')}
 if(S.sv.papangue&&!S.bt.some(b=>b.k==='papangue')&&rnd()<.01){const b=btNouv('papangue');journal('Un jeune papangue tombé du nid est rapporté au camp. On le nomme '+b.n+'. Il faudra des mois pour qu’il revienne au poing.')}
 // le dressage avance quand un chasseur (ou un mystique pour l'oiseau) est au camp
 S.bt.forEach(b=>{const m=b.k==='chien'?cha:(cha||mys);if(m&&b.dr<100)b.dr=Math.min(100,b.dr+(b.k==='chien'?2.5:1.5));if(b.dr>=60&&!b.dit){b.dit=1;journal(b.n+(b.k==='chien'?' est dressé : il lève le gibier et le rabat vers les chasseurs.':' revient au poing : il montre d’en haut où se cache le gibier.'))}})}
// à la chasse, les chiens dressés et le papangue augmentent les prises
{const ej=expJour;expJour=function(){if(aniJeu())(S.grp||[]).forEach(g=>{const e=g.exp;if(!e||e.etat!=='sur place'||e.but!=='chasse')return;const B=(S.bt||[]).filter(b=>b.dr>=40);if(!B.length)return;
  let p=0;B.forEach(b=>p+=b.k==='chien'?b.fl/100*b.dr/100*.25:.15*b.dr/100);if(rnd()<p){e.charge+=1.5;if(rnd()<.25)journal(g.n+' prend du gibier de plus : '+B.map(b=>b.n).join(' et ')+' l’ont trouvé.')}});ej()}}
// la vie du camp : les bêtes et les parcs
{const cl=cvListe;cvListe=function(){cl();if(!aniJeu()||!CV.on)return;const d=$('cvL');if(!d)return;const B=S.bt||[],A=Object.keys(S.ani||{}).filter(k=>S.ani[k]>0);if(!B.length&&!A.length)return;
 const o=document.createElement('div');o.className='pc';o.innerHTML='<b>Les bêtes</b><br>'+A.map(k=>'<small>Parc : '+S.ani[k]+' '+(S.ani[k]>1?ANI[k].np:ANI[k].n)+'</small> <button class="bt sec" data-mg="'+k+'">En manger un (+2 vivres)</button><br>').join('')+
  B.map(b=>'<small><b>'+(b.k==='chien'?'🐕':'🦅')+' '+b.n+'</b> · dressage '+Math.round(b.dr)+' % · flair '+b.fl+' · vitesse '+b.vi+'</small><div class="xp"><i style="width:'+b.dr+'%"></i></div>').join('');
 d.appendChild(o);o.querySelectorAll('[data-mg]').forEach(x=>x.onclick=()=>{const k=x.dataset.mg;if(!(S.ani[k]>0))return;S.ani[k]--;S.vivres+=2;journal('On tue un '+ANI[k].n+' du parc pour manger.');sauve();cvListe()})}}
// ===== L'habitation coloniale : maison du maître, et à côté les champs avec le camp des esclaves, le chenil, le grenier =====
{const cl=cvLieux;cvLieux=function(){const r=cl();if(!S.voieC)return r;const L=r.L;const n=L.cases.length;L.cases=[[.22,.28]];for(let k=1;k<Math.max(3,n);k++)L.cases.push([.6+(k-1)%4*.075,.16+Math.floor((k-1)/4)*.11]);L.reserve=[.36,.24];L.chenil=[.9,.2];L.jardin=[.8,.72];L.feu=[.66,.42];return r}}
{const pd=p3Deco;p3Deco=function(L,C){pd(L,C);if(!C)return;const G=P3.deco,M=c=>new THREE.MeshLambertMaterial({color:new THREE.Color(c).convertSRGBToLinear()}),add=(g,m,x,y,z)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);G.add(o);return o};
 // le champ : des rangs de cannes
 {const [x,z]=p3W(...L.jardin);for(let i=0;i<8;i++)for(let j=0;j<5;j++)add(new THREE.CylinderGeometry(.06,.08,1.4+((i*7+j*3)%5)*.08,5),M(0x6a9a3a),x-7+i*2,.7,z-3+j*1.5)}
 // le chenil : une petite clôture et des niches
 {const [x,z]=p3W(...L.chenil);for(let k=0;k<12;k++){const a=k/12*6.283;add(new THREE.CylinderGeometry(.06,.06,.9,5),M(0x6a5038),x+Math.cos(a)*1.6,.45,z+Math.sin(a)*1.2)}for(let k=0;k<2;k++)add(new THREE.BoxGeometry(.7,.6,.8),M(0x5a4030),x-.5+k*1,.3,z)}}}
// au départ des colons, deux cases voisines deviennent des champs sur la carte
{const fd=faimDepart;faimDepart=function(){const a=S.jeuVivres;fd();if(a||!S.voieC||S.champs)return;S.champs=1;const c=camps()[0];if(!c)return;T.filter(u=>hd(u,c)===1&&!u.bare&&!(S.t[u.i]||{}).b&&!(S.t[u.i]||{}).c&&u.alt>5).slice(0,2).forEach(u=>{const o=tl(u.i);o.b='jardin';o.s=1;o.an=S.year});journal('Autour de la maison du maître, deux pièces de terre sont déjà défrichées : les champs, le camp des esclaves au bord, le chenil et le grenier.')}}
// ===== La vie du camp : on ne liste plus tout le monde. On touche quelqu'un, et l'on voit sa fiche =====
{const cl=cvListe;cvListe=function(){cl();if(!S||!CV.on)return;const d=$('cvL');if(!d)return;
 const fiches=[...d.querySelectorAll('[data-pid]')];const n=fiches.length;
 if(!CV.tous)fiches.forEach(f=>{if(+f.dataset.pid!==CV.selP)f.remove()});
 d.querySelectorAll('p.note,p').forEach(x=>{if(/Formez quelqu|pour lui donner un ordre/.test(x.textContent))x.remove()});
 if(!CV.tous&&!(CV.selP!=null&&ppId(CV.selP)))d.querySelectorAll(':scope > .pc').forEach(c=>{if(/^Les jeunes/.test(c.textContent))c.remove()});
 if(CV.selP!=null&&ppId(CV.selP)){d.querySelectorAll('button').forEach(b=>{if(b.textContent==='← Toute la liste')b.textContent='← Fermer la fiche'});return}
 const h=document.createElement('p');h.className='note';h.style.margin='0 0 6px';
 h.innerHTML=('Touchez quelqu’un dans '+(S.voieC?'l’habitation':'le camp')+' pour voir sa fiche, ce qu’il sait faire et ce qu’il peut apprendre. ')+'<button class="bt sec" id="cvTous">'+(CV.tous?'Cacher la liste':'Tout le monde ('+n+')')+'</button>';
 d.insertBefore(h,d.firstChild);h.querySelector('#cvTous').onclick=()=>{CV.tous=!CV.tous;cvListe()}}}
