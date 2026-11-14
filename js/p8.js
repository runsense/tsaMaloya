
// ===== Jeu : ce que disent les gens dépend de leur état, de leur caractère, de leurs amours, du danger =====
const TRAITS=['rieur','grognon','timide','fier','pieux','bavard'];
function trait(p){if(!p.trait)p.trait=TRAITS[(p.id*7+3)%TRAITS.length];return p.trait}
const HUM={
 kr:{lever:['Bonzour tout’ moun.','Mi la bien dormi.','Lo kok la fine shanté.'],plein:['Mi la bien manzé, lé bon !','Vant lé plin, lo kèr lé kontan.'],faim:['Mon vant i gronde.','Na poin narien pou manzé ?','Mi lé fèb, mi la fin.'],las:['Mi lé las.','Mon do i fé mal.','Inn ti somèy, sa i sré bon.'],colere:['Lès amwin trankil !','Mi lé an kolèr.','Tro sa, tro !'],amour:['_, ou lé zoli zordi.','Mi pans a ou tout la zourné, _.','Vien asiz akoté amwin, _.'],drague:['Ou la fine manzé, _ ? Mi rès inn ti morso pou ou.','Ou vé alé shèrsh dolo ek mwin, _ ?','Kosa ou fé tanto, _ ?'],matin:['Bonzour mon kèr…','Ou la bien dormi ? Mwin wi…','Hm… bel nwi.'],danger:['Kashièt aou !','Sov ! Zot i vien !','Pa fé dbrui.'],
  rieur:['Ha ha ! Lavi lé dou kan menm.','Ou la oir sa ? Mi ri ankor.'],grognon:['Toultan lo mèm zafèr…','Pèrsonn i èd amwin isi.'],timide:['…','Mi koné pa…'],fier:['Mwin, mi pèr narien.','Sa, sé mon travay, pa lo tien.'],pieux:['Bondié i protèz anou.','Fo priyé pou lo zansèt.'],bavard:['Ou koné kosa la ariv ièr ? Atann, mi rakont aou…','É, èkout amwin in sègonn !']},
 vf:{lever:['Le jour se lève sur nos caféyers.','Qu’on m’apporte du café.'],plein:['Voilà un repas digne de ce nom.'],faim:['Le magasin est vide, voilà qui est fâcheux.','Point de farine depuis le dernier vaisseau.'],las:['Je suis las de ces chaleurs.'],colere:['Qu’on me laisse en paix !','Je ne souffrirai point ce désordre.'],amour:['_, vous êtes fort belle ce matin.','Votre compagnie m’est précieuse, _.'],drague:['Me ferez-vous l’honneur d’une promenade, _ ?'],matin:['La nuit fut douce, ma mie.'],danger:['Aux armes ! Qu’on lâche les chiens !'],
  rieur:['Plaisante isle, en vérité.'],grognon:['Rien ne se fait comme il faut en ce pays.'],timide:['…'],fier:['Mon père tenoit cette terre avant moi.'],pieux:['Dieu protège cette habitation.'],bavard:['Savez-vous ce que l’on dit au Port ?']},
 mg:{faim:['Noana aho.'],las:['Vizaka aho.'],colere:['Tezitra aho.'],amour:['Tiako ianao, _.'],lever:['Manao ahoana, ry havana.'],danger:['Miafina ! Mangina !']}};
function humL(p){return lgNoble(p)?'vf':(lgMys(p)&&Math.random()<.6?'mg':'kr')}
function humPick(p,k,nom){const L=(HUM[humL(p)][k]||HUM.kr[k]);if(!L)return null;return lgPick(L).replace(/_/g,nom||'')}
// les amours : deux adultes libres se tournent autour, puis vivent ensemble
function amourJour(){if(!S||modeHist()||!grpOn()||S.fin)return;const A=(S.pp||[]).filter(p=>adulte(p)&&ageP(p)>=18&&!p.amour);
 A.forEach(p=>{if(p.drague){const q=ppId(p.drague);if(!q||q.amour){p.drague=null;return}if(rnd()<.08){p.amour=q.id;q.amour=p.id;p.drague=q.drague=null;journal(p.n.split(' ')[0]+' et '+q.n.split(' ')[0]+' vivent maintenant ensemble.')}return}
  if(rnd()<.015){const L=A.filter(q=>q!==p&&q.g!==p.g&&!q.drague&&q.fa!==p.fa&&Math.abs(ageP(q)-ageP(p))<15);if(L.length){const q=lgPick(L);p.drague=q.id;q.drague=p.id;journal(p.n.split(' ')[0]+' et '+q.n.split(' ')[0]+' se tournent autour.')}}})}
{const jt=jourTick;jourTick=function(){jt();amourJour()}}
// le danger : le garde siffle (tout le camp l'entend, et peut-être les chasseurs), ou fait signe de la main (seuls les proches le voient)
function dangerProche(){return !!(S&&((S.det&&S.det.length)||(S.traque||0)>75))}
function alerte(g){const a=CV.A[g.id];if(!a)return;const fort=(S.det&&S.det.length)||rnd()<.4,now=performance.now();
 if(fort){a.say='♪ Fiouuu ! (sifflet)';a.sayT=220;for(const id in CV.A)CV.A[id].alerte=now+9000;if(S.det&&S.det.length&&rnd()<.3){fx({traque:1});journal('Le sifflet de '+g.n.split(' ')[0]+' a mis tout le camp à l’abri, mais il a porté loin : les chasseurs ont peut-être entendu.')}}
 else{a.say='✋ (signe de la main)';a.sayT=200;for(const id in CV.A){const b=CV.A[id];if(Math.hypot(b.x-a.x,b.y-a.y)<.16)b.alerte=now+9000}}}
{const cc=cvCible;cvCible=function(p,a,L,nuit){if(capOn()&&a&&a.alerte>performance.now()&&p.id!==S.garde){const c=L.cases[(p.fa||p.id)%Math.max(1,L.cases.length)]||L.feu;return [c[0]+((p.id%5)-2)*.012,c[1]+.02,'repos']}return cc(p,a,L,nuit)}}
// le discours : l'état du moment passe avant les phrases ordinaires
{const cd=cvDit;cvDit=function(p,a){if(!p||modeHist()||!grpOn())return cd(p,a);const ad=adulte(p)&&ageP(p)>=18,ph=typeof jourPh==='function'?jourPh():.5,nom=q=>q?q.n.split(' ')[0]:'';let m=null;
 if(dangerProche()&&p.id===S.garde&&Math.random()<.5){alerte(p);return a&&a.say||''}
 if(a&&a.alerte>performance.now())m=humPick(p,'danger');
 else if((S.faimJ||0)>=1&&Math.random()<.6)m=humPick(p,'faim');
 else if((p.fat||0)>60&&Math.random()<.5)m=humPick(p,'las');
 else if(ph>.04&&ph<.13&&Math.random()<.5)m=ad&&p.amour&&Math.random()<.5?humPick(p,'matin',nom(ppId(p.amour))):humPick(p,'lever');
 else if(ad&&p.amour&&Math.random()<.25)m=humPick(p,'amour',nom(ppId(p.amour)));
 else if(ad&&p.drague&&Math.random()<.4)m=humPick(p,'drague',nom(ppId(p.drague)));
 else if((S.coh||50)<35&&Math.random()<.35)m=humPick(p,'colere');
 else if((S.vivres||0)>((S.pp||[]).length*.6)&&Math.random()<.15)m=humPick(p,'plein');
 else if(Math.random()<.3)m=humPick(p,trait(p));
 return m?lgEnfant(p,m):cd(p,a)}}
// la fiche montre le caractère
{const cl=cvListe;cvListe=function(){cl();if(!capOn()||!CV.on||CV.selP==null)return;const p=ppId(CV.selP);if(!p)return;const f=$('cvL')&&$('cvL').querySelector('.pc[data-pid="'+p.id+'"]');if(!f)return;const s=document.createElement('small');const q=p.amour?ppId(p.amour):p.drague?ppId(p.drague):null;
 s.innerHTML='<br>Caractère : '+trait(p)+(q?' · '+(p.amour?'vit avec ':'tourne autour de ')+q.n.split(' ')[0]:'');f.appendChild(s)}}
