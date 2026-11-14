
// ===== Jeu : les langues. Les gens parlent créole, les maîtres un vieux français, le mystique la langue des ancêtres =====
const KR={'Rien ne mord.':'Narien i mord.','Le papangue a rabattu des cailles.':'Papang la rabat bann kay.','Un cochon marron !':'In koshon maron !','J’ai eu un cabri !':'Mwin la gingn in kabri !','Rien aujourd’hui.':'Narien zordi.','Il ne reste presque rien ici.':'I res prèsk narien isi.','Des brèdes et des goyaves.':'Bann brèd ek bann goyav.','Encore un fagot.':'Ankor in fago.','La paille est sèche.':'Lapay lé sèk.','Ces galets feront un bon mur.':'Bann galé-la va fé in bon mir.','Le cari est servi.':'Kari lé servi.','Le cari est prêt !':'Kari lé paré !','J’y vais.':'Mi sava.','Comme je l’entends, alors.':'Kom mi vé, alor.','Le mystique avait vu le gibier.':'Mistik té fine oir zibié-la.','Je reviendrai avec ce qu’ils savent.':'Mi rovien ek sak zot i koné.','Une anguille sous la roche !':'In zanguy anba laros !','Des chevrettes sous les galets.':'Bann shevrèt anba galé.'};
const VF={'J’y vais.':'J’y vais de ce pas.','Comme je l’entends, alors.':'Fort bien, à ma guise donc.','Le cari est servi.':'Qu’on serve le cary.'};
const DITK={cha:['Mon lam lé bien affilé.','Néna tras koshon vers la ravine.','Mi sort granmatin.'],cue:['Bann brèd la fine poussé.','Mi la fé trwa sagay nèf.','Fo dolo pou lo jardin.'],x:['Ankor bwa pou porté…','Lapli i sa tonbé, santi lo van.','Demoun i rakont zafèr, anba.'],g:['Narien si lo santié.','Mwin la oir in lafimé lwin-lwin.','Pèrsonn i pas san ke mi oir ali.']};
const DITKC={cha:['Fizi lé grésé.','Nou la oir maron o-dsi la ravine.'],cue:['Kafé i don bien st’ané.','Bann ran mayi lé fé.'],mys:['La soup lé servi dann lofis.','Madam néna mal la tèt.'],x:['I di bann vwazin néna dèt…','Ankor linj pou port lavoir.'],g:['Bann shien i aboy vers lé O.','Shemin lé kalm.']};
const DITVF=['Qu’on selle mon cheval, je veux voir les caféyers.','Point de vaisseau de France depuis trois lunes.','Le Roy nous a bien oubliés en ces isles.','Ces marrons me coûtent fort cher en journées perdues.','Le Gouverneur nous accable de corvées.','Il faudra écrire à la Compagnie.'];
// le mystique : malgache le jour, et en songe des mots venus du Zimbabwe ou du Mozambique ; le tamoul viendra avec les gens de l’Inde
const MG=['Iza no marary ?','Masaka ny laoka.','Milamina ny razana anio alina.','Tonga soa, ry havana.','Aza matahotra.','Mitandrema, misy rivotra mahery ho avy.'];
const SN=['Vadzimu vari pano…','Mhondoro inotaura usiku.','Ndinoona moto pagomo.'];
const TA=['Vaṇakkam.','Nanṟi, amma.','Kaḷḷi pūkkaḷ… nalla nāḷ.'];
function lgNoble(p){return S.voieC&&((typeof noble==='function'&&noble(p))||p.or==='eu')}
function lgMys(p){return p.role==='mys'&&!S.voieC}
function lgTamoul(){return (S.year||0)>=1828||(S.pp||[]).some(q=>q.or==='in')}
function lgPick(L){return L[Math.floor(Math.random()*L.length)]}
{const cd=cvDit;cvDit=function(p,a){if(!p)return '';if(modeHist()||!grpOn())return cd(p,a);
 if(lgNoble(p))return lgPick(DITVF);
 if(lgMys(p)){const nuit=typeof jourPh==='function'&&(jourPh()>.72||jourPh()<.04);if(nuit||a&&a.act==='dort')return lgPick(SN);if(lgTamoul()&&Math.random()<.2)return lgPick(TA);return lgPick(MG)}
 const k=p.id===S.garde?'g':(p.role||'x'),D=S.voieC?DITKC:DITK;
 if(Math.random()<.3){const o=cvGens().filter(q=>q!==p&&adulte(q));if(o.length){const n=lgPick(o).n.split(' ')[0];return lgPick(['Ou la oir '+n+' granmatin ?',n+' i koz tro, pou mwin.','I paré '+n+' la rèv bann zansèt.'])}}
 return lgPick(D[k]||D.x)}}
{const di=dire;dire=function(p,m){if(typeof m==='string'&&p&&!modeHist()){if(lgNoble(p))m=VF[m]||m;else if(lgMys(p)&&Math.random()<.5)m=lgPick(MG);else m=KR[m]||m.replace(/^Tiens bon, /,'Tienbo, ')}return di(p,m)}}
// les mantras d’Hanuman : des mots gravés en français sur des pierres levées, que le mystique trouve
const MANTRA=['Fils du vent, garde ceux qui marchent la nuit.','Celui qui porta la montagne porte aussi le faible.','Le pont se bâtit pierre à pierre, et la mer recule.','Ne crains pas le feu : la queue du singe l’a déjà traversé.','Le serviteur fidèle ne connaît pas de chaîne.'];
function steleJour(){if(!S||modeHist()||!grpOn()||S.fin||S.voieC)return;const m=(S.pp||[]).some(p=>p.role==='mys'&&!enGrp(p));if(!m||rnd()>.01)return;S.mantra=(S.mantra||0)+1;if(S.mantra>MANTRA.length)return;
 journal('Le mystique conduit le camp à une pierre levée couverte de mousse. Des mots y sont gravés, en français, dans une écriture que personne ici n’a apprise : « '+MANTRA[S.mantra-1]+' » On dit que c’est la parole d’Hanuman.')}
{const jt=jourTick;jourTick=function(){jt();steleJour()}}
// les enfants mélangent les mots, d’autant plus qu’ils sont petits, jusqu’à 13 ans
function lgEnfant(p,m){if(!p||typeof m!=='string'||typeof ageP!=='function')return m;const a=ageP(p);if(a>=13)return m;if(a<3)return lgPick(['A-a…','Ba !','Mama…','Hi hi !']);const w=m.split(' ');if(w.length<2)return m;let n=Math.max(1,Math.round((13-a)/3.5));for(let i=0;i<n;i++){const x=Math.floor(Math.random()*w.length),y=Math.floor(Math.random()*w.length);[w[x],w[y]]=[w[y],w[x]]}return w.join(' ')}
{const cd=cvDit;cvDit=function(p,a){return lgEnfant(p,cd(p,a))}}
{const di=dire;dire=function(p,m){return di(p,typeof m==='string'?lgEnfant(p,m):m)}}
