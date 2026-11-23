
// ===== p176 : les mots de la chasse et de la cueillette (envoyés par l’auteur) =====
// Les fruits venus plus tard n'arrivent dans la bouche des gens qu'à leur époque : letchis et mangues après 1770, goyaviers des Hauts au XIXᵉ siècle.
try{
 if(typeof DITK!=='undefined'){DITK.cha=DITK.cha.concat(['Nou va bat la forêt.','Mi sort rod tangue a swar.','Mi va mèt un kolé dann santié koshon.','Chien ki shass pa, i manz pa.']);
  DITK.cue=DITK.cue.concat(['Mi va kèy brèd dann la ravine.','Mi kraz un boukan pou le kari.','Mi sava tir le miel dann pié d’bwa.','Kan le fruit lé mur, li tomb tout seul.','Mi rod fanjan pou la kaz.'])}
 if(typeof CHASSE_KR!=='undefined')CHASSE_KR.push(['Le chien i donn de la voi !',['chasse','chien','sur place']],['Fouyé, li lé dann son trou !',['chasse','sur place']],['Lèv le gibier, mi atann isi.',['chasse','sur place']],['Tann un pièz isi, li pass tout lé swar.',['chasse','sur place']],['Bat la kolline, nou artrouv ali.',['chasse','aller']],['Kèy brèd, ranpli le gonis.',['cueil','sur place']],['Kas in fruit pou la rout.',['cueil','aller']]);
}catch(e){}
const DATE176=[[1770,['Gaule bann letchi, lé mur.','Kas in mangue pou marmay.'],'cue'],[1850,['Nou monte ramass goyavier.'],'cue']];
if(typeof phrasesPour==='function'){const pp=phrasesPour;phrasesPour=function(p,g){const L=pp.apply(this,arguments);try{if(!S||(typeof lgNoble==='function'&&lgNoble(p)))return L;const t=g?(g.exp&&g.exp.but):(typeof tacheDe==='function'?tacheDe(p):'');
  DATE176.forEach(([y,P,k])=>{if(S.year>=y&&(t==='cueil'||p.role===k))P.forEach(x=>L.push({t:typeof kz172==='function'?kz172(p,x):x,s:1}))})}catch(e){}return L}}
// rentrer bredouille : la chasse ratée se dit en créole dans le journal
{const jn=journal;journal=function(m){try{if(typeof m==='string'&&S&&!S.voieC&&/rentre[^.]*sans rien|bredouille|n’a rien pris|rentrent les mains vides/i.test(m)&&Math.random()<.5)m+=' « Rantré la main vid. »'}catch(e){}return jn.apply(this,arguments)}}
// ===== le quotidien, le kozman, les proverbes (troisième envoi de l’auteur) — sans « koud’solèy », qui peut parler d’alcool =====
try{if(typeof HUM!=='undefined'){const H=HUM.kr,A=(k,L)=>{H[k]=(H[k]||[]).concat(L)};
 A('lever',['Komankilé ?','Kosa i di ?','Lé la !']);A('matin',['Ousa ou sava ?']);
 A('rieur',['Fé pété !','Lé doux konm siro !','Sa même même !']);A('plein',['Sa i sent bon le kari !']);
 A('grognon',['Zorey koshon dann marmit poi.']);A('pieux',['Ti lamp ti lamp, l’oiseau i fé son nid.','Apré la plui, le bo tan.']);
 A('timide',['Kraz pa le kor.','Lé pa grav, la vi i kontinue.']);A('danger',['Met la poud !']);A('bavard',['Sak i rode i trouv.','Kabri i manz salade, kabri i rès an plas.','Narvu !'])}
 if(typeof DITK!=='undefined'){DITK.g=DITK.g.concat(['Mi kas in l’œil su le santié.']);DITK.x=DITK.x.concat(['Mi sava bat in karé.','Nout tout ansanm !'])}}catch(e){}
