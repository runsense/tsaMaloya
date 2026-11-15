// ===== p80 : en Vie, le rang compte — chaque rang apporte quelque chose, et l'on peut monter de rang =====
const RANGFX={m:['Ses paroles pèsent : sa présence au camp tient les gens ensemble (+cohésion).','Il apaise les disputes et transmet : +1 cohésion par mois pour deux anciens au camp.','À la chasse il rapporte plus, et il vise mieux en vue personnage ; le chasseur aguerri devient un ancien.','Il soigne : un peu de santé chaque jour.','La cueillette rend plus ; à force de connaître les plantes, on devient mystique.'],
 c:['Le maître décide de tout sur l’habitation.','Les colons libres font tourner le commerce.','Les champs rendent plus quand le maître s’absente, mais la colère monte.','L’engagé travaille sous contrat.','Il fait tourner la maison et entend tout : les nouvelles arrivent plus vite (+savoir).','La force de travail ; un esclave remarqué passe à la maison.']};
{const ro=rangOrdonner;rangOrdonner=function(d){const r=ro.apply(this,arguments);try{const L=RANGS[S.voieC?'c':'m'],F=RANGFX[S.voieC?'c':'m'];d.querySelectorAll('.rgH').forEach(h=>{const i=L.indexOf(h.textContent);if(i>=0){h.title=F[i];h.style.cursor='help';if(!h.dataset.fx){h.dataset.fx=1;h.textContent=L[i]+' ⓘ'}}})}catch(e){}return r}}
// les effets, jour après jour (mode Vie)
{const jt=jourTick;jourTick=function(){jt.apply(this,arguments);try{if(!S||modeHist()||S.fin)return;const P=(S.pp||[]).filter(p=>!enGrp(p));const R=p=>{try{return rangDe(p)}catch(e){return 9}};S.rgVu=S.rgVu||{};
 if(!S.voieC){
  const anc=P.filter(p=>R(p)===1).length,fam=P.filter(p=>R(p)===0).length;S.coh=Math.min(100,(S.coh||0)+Math.min(2,anc)*.033+(fam?.01:0));
  P.forEach(p=>{const k=R(p),t=tacheDe(p);if(k===2&&t==='chasse')S.vivres=(S.vivres||0)+.1;if(k===4&&t==='cueil')S.vivres=(S.vivres||0)+.08;if(k===3)S.sante=Math.min(100,(S.sante||0)+.02)});
  // monter de rang : un cueilleur adroit devient chasseur ; l'âge fait les anciens
  // monter de rang : à force de cueillir, on connaît les plantes et l'on devient mystique ; le chasseur aguerri devient un ancien
  P.forEach(p=>{if(!adulte(p))return;const k=R(p),s=p.sk||{};if(k===4&&tacheDe(p)==='cueil')p.cuJ=(p.cuJ||0)+1;if(k===2&&tacheDe(p)==='chasse')p.chJ=(p.chJ||0)+1;
   if(k===4&&!p.role&&((p.cuJ||0)>=150||(s.mys||0)>=6)&&!S.rgVu['m'+p.id]){S.rgVu['m'+p.id]=1;p.role='mys';s.mys=(s.mys||0)+2;p.sk=s;journal(p.n.split(' ')[0]+' connaît maintenant chaque feuille de la forêt : on vient la consulter. Elle devient mystique.');toast(p.n.split(' ')[0]+' devient mystique.')}
   if(k===2&&!p.anc&&(((p.chJ||0)>=200&&ageP(p)>=35)||((s.cha||0)>=10&&ageP(p)>=40))&&!S.rgVu['a'+p.id]){S.rgVu['a'+p.id]=1;p.anc=1;journal(p.n.split(' ')[0]+', vieux chasseur, entre parmi les anciens : on viendra l’écouter.');toast(p.n.split(' ')[0]+' devient un ancien.')}
   if(ageP(p)>=50&&!S.rgVu['a'+p.id]){S.rgVu['a'+p.id]=1;journal(p.n.split(' ')[0]+' entre parmi les anciens : on viendra l’écouter.')}})}
 else{
  const cm=S.commandeur!=null&&ppId(S.commandeur),maitreDehors=(S.pp||[]).some(p=>estColon(p)&&tacheDe(p)==='marche');if(cm){if(maitreDehors)S.vivres=(S.vivres||0)+.15;S.coh=Math.max(0,(S.coh||0)-.02)}
  const dom=P.filter(p=>R(p)===4).length;if(dom)S.savoir=(S.savoir||0)+Math.min(2,dom)*.01;
  P.forEach(p=>{if(R(p)===5&&adulte(p)&&ageP(p)>=20&&ageP(p)<45){const s=p.sk||{},tot=Object.values(s).reduce((a,b)=>a+(+b||0),0);if(tot>=14&&!S.rgVu['d'+p.id]&&dom<3){S.rgVu['d'+p.id]=1;p.tache='cuisine';journal(p.n.split(' ')[0]+' est remarqué : on le fait passer au service de la grande maison.')}}})}}catch(e){}}}

{const rd=rangDe;rangDe=function(p){if(p&&p.anc&&S&&!S.voieC){const r=rd.apply(this,arguments);return r===0?0:1}return rd.apply(this,arguments)}}
setInterval(()=>{try{if(!S)return;const L=RANGS[S.voieC?'c':'m'],F=RANGFX[S.voieC?'c':'m'];document.querySelectorAll('.rgH:not([data-fx])').forEach(h=>{const i=L.indexOf(h.textContent.replace(' ⓘ',''));if(i>=0){h.dataset.fx=1;h.title=F[i];h.style.cursor='help';h.textContent=L[i]+' ⓘ'}})}catch(e){}},700);
// ----- les sorties selon le rang -----
// Cueillir ne mène pas loin (2 cases) ; avec un chasseur dans le groupe, on peut cueillir loin, et il en revient du mystique.
// Explorer : seul un ancien ou un chasseur peut mener l'exploration. Chasser : un cueilleur peut y aller, mais jamais seul ; il y gagne de l'ancienneté.
const estChasseur=p=>!!p&&(p.role==='cha'||((p.sk||{}).cha||0)>=5||(!S.voieC&&rangDe(p)===2));
const estAncienOuChasseur=p=>!!p&&(estChasseur(p)||(!S.voieC?rangDe(p)<=1:(p.st==='libre'||S.commandeur===p.id)));
function porteeExp(q){const pm=expPortee(q.prov,q.ids.length);try{if(q.but==='cueil'&&!q.ids.map(ppId).some(estChasseur))return Math.min(pm,2)}catch(e){}return pm}
{const ct=choisirTuile;choisirTuile=function(t){try{const q=window.choixExp;if(q&&S&&!modeHist()&&q.but==='cueil'&&hd(T[q.c],t)>porteeExp(q)){toast('La cueillette ne va pas plus loin que 2 cases du camp, sauf avec un chasseur dans le groupe.');return}}catch(e){}return ct.apply(this,arguments)}}
{const cc=carteConnu;carteConnu=function(o){try{const q=window.choixExp;if(o&&o.mode==='dest'&&q)o.pm=Math.min(o.pm||99,porteeExp(q))}catch(e){}return cc.apply(this,arguments)}}
document.addEventListener('click',e=>{try{if(!e.target||e.target.id!=='expOk'||!window.EXPS)return;const st=window.EXPS,M=Object.keys(st.coche||{}).filter(k=>st.coche[k]).map(k=>ppId(+k)).filter(Boolean);if(!M.length)return;let msg='';
 if(st.but==='explorer'&&!M.some(estAncienOuChasseur))msg=S.voieC?'Pour explorer, il faut un homme libre ou le commandeur à la tête du groupe.':'Pour explorer, il faut un ancien ou un chasseur à la tête du groupe : lui seul connaît les signes des Hauts.';
 else if(st.but==='chasse'&&!M.some(estChasseur)&&M.length<2)msg='Un cueilleur ne part jamais seul à la chasse : ajoutez au moins une autre personne, au mieux un chasseur.';
 if(msg){e.stopImmediatePropagation();e.preventDefault();toast(msg)}}catch(err){}},true);
// en chemin : le chasseur qui cueille loin ou qui explore rapporte du mystique ; le cueilleur qui chasse gagne de l'ancienneté
{const jt=jourTick;jourTick=function(){jt.apply(this,arguments);try{if(!S||modeHist()||S.fin)return;(S.grp||[]).forEach(g=>{const e=g.exp;if(!e)return;const M=grpMembres(g),ch=M.filter(estChasseur);
 if(e.etat==='sur place'||e.etat==='aller'){const loin=hd(T[e.home],T[g.pos])>2;if(e.but==='cueil'&&loin&&ch.length)S.myst=(S.myst||0)+.05*ch.length;if(e.but==='explorer'&&ch.length)S.myst=(S.myst||0)+.03*ch.length}
 if(e.but==='chasse')M.forEach(p=>{if(estChasseur(p))return;p.anJ=(p.anJ||0)+1;if(p.anJ>=60&&!p.role){p.role='cha';journal(p.n.split(' ')[0]+' revient d’assez de chasses pour être compté parmi les chasseurs.');toast(p.n.split(' ')[0]+' devient chasseur.')}})})}catch(e){}}}
