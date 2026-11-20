
// ===== p175 : avant la bagarre — provocations et proverbes créoles (donnés par Paris) =====
const BAG175={prov:['Sa i sava pété !','Rod pa batay !','Larg pa le kor !','Vien voir si ou lé un boug !','Fé pa le malin, mwin va mèt a ou d’akor !','Fé in rond ?','Donn galop !','Totoche a li, fini avek li !'],
 sage:['Kan gro bèf i sarz, sort devan !','Dann oui na pwin batay.']};
const BAGFR175={'Sa i sava pété !':'ça va éclater','Rod pa batay !':'ne cherche pas la bagarre','Larg pa le kor !':'tiens bon','Vien voir si ou lé un boug !':'viens montrer si tu es un homme','Fé pa le malin, mwin va mèt a ou d’akor !':'ne fais pas le malin, je vais te remettre à ta place','Fé in rond ?':'tu veux qu’on se batte ?','Donn galop !':'tabasse-le','Totoche a li, fini avek li !':'cogne-le, finis-en','Kan gro bèf i sarz, sort devan !':'quand le gros bœuf charge, ôte-toi de devant','Dann oui na pwin batay.':'dans le oui, il n’y a pas de bataille'};
try{if(typeof HUM!=='undefined'){HUM.kr.colere=HUM.kr.colere.concat(['Sa i sava pété !','Rod pa batay !','Fé pa le malin, mwin va mèt a ou d’akor !','Fé in rond ?']);HUM.kr.danger=HUM.kr.danger.concat(['Larg pa le kor !']);HUM.kr.pieux=HUM.kr.pieux.concat(['Dann oui na pwin batay.']);HUM.kr.grognon=HUM.kr.grognon.concat(['Kan gro bèf i sarz, sort devan !'])}}catch(e){}

// deuxième envoi de Paris : menaces, défis, mises en garde de l'entourage, proverbes
Object.assign(BAGFR175,{'Touche pa mwin, mwin néna la main lourde !':'ne me touche pas, j’ai la main lourde','Mi sava mèt a ou d’akor !':'je vais te remettre à ta place','Ou i rod out malèr ?':'tu cherches ton malheur ?','Arèt fé le kador !':'arrête de faire le caïd','Arèt fé le faya !':'arrête de faire le dur','Mwin va kas out figir !':'je vais te casser la figure',
 'Vien, si ou lé kapab !':'viens, si tu en es capable','Koz pa tro, fé !':'ne parle pas trop, agis','Kosa ou na pou dir ? Ou vé batay ?':'qu’est-ce que tu as à dire ? tu veux te battre ?',
 'Kraz un kou !':'calme-toi, laisse tomber','Sot pa su li, na pwin l’intérêt !':'ne lui saute pas dessus, ça ne vaut pas le coup','Fé pa le dézord !':'ne fais pas d’histoires','Chien i japp i mord pa.':'chien qui aboie ne mord pas'});
BAG175.menace=['Touche pa mwin, mwin néna la main lourde !','Mi sava mèt a ou d’akor !','Ou i rod out malèr ?','Arèt fé le kador !','Arèt fé le faya !','Mwin va kas out figir !'];
BAG175.defi=['Vien, si ou lé kapab !','Vien voir si ou lé un boug !','Koz pa tro, fé !','Kosa ou na pou dir ? Ou vé batay ?','Fé in rond ?'];
BAG175.garde=['Kraz un kou !','Sot pa su li, na pwin l’intérêt !','Fé pa le dézord !','Sa i sava pété !','Rod pa batay !'];
BAG175.sage=BAG175.sage.concat(['Chien i japp i mord pa.']);
BAG175.prov=BAG175.prov.concat(BAG175.menace,BAG175.defi);
try{if(typeof HUM!=='undefined'){HUM.kr.colere=HUM.kr.colere.concat(['Touche pa mwin, mwin néna la main lourde !','Ou i rod out malèr ?','Arèt fé le kador !','Koz pa tro, fé !']);HUM.kr.fier=HUM.kr.fier.concat(['Vien, si ou lé kapab !']);HUM.kr.timide=HUM.kr.timide.concat(['Kraz un kou…','Fé pa le dézord.']);HUM.kr.rieur=HUM.kr.rieur.concat(['Chien i japp i mord pa !'])}}catch(e){}
const pick175=L=>L[Math.floor(Math.random()*L.length)];
// en vue personnage, quand l'ennemi surgit : un compagnon lance un cri, le plus vieux rappelle le proverbe
{const ve=vpEnnemis;vpEnnemis=function(){const avant=VP&&VP.fight;const r=ve.apply(this,arguments);try{if(VP&&VP.fight&&!avant){const c=(VP.cp||[]).find(o=>o.p)||{p:VP.chef&&VP.chef.p};const nom=c.p?c.p.n.split(' ')[0]:'';const cri=pick175(BAG175.defi.concat(['Larg pa le kor !','Donn galop !']));
  vpMsg((nom?nom+' : ':'')+'« '+(typeof kz172==='function'?kz172(c.p,cri):cri)+' » ('+BAGFR175[cri]+')');
  const vieux=(VP.cp||[]).map(o=>o.p).filter(Boolean).sort((a,b)=>ageP(b)-ageP(a))[0];const autre=(VP.cp||[]).map(o=>o.p).filter(q=>q&&q!==c.p&&q!==vieux)[0];if(autre&&Math.random()<.4)setTimeout(()=>{try{const g=pick175(BAG175.garde);vpMsg(autre.n.split(' ')[0]+' : « '+(typeof kz172==='function'?kz172(autre,g):g)+' » ('+BAGFR175[g]+')')}catch(e){}},1500);if(vieux&&ageP(vieux)>=45&&Math.random()<.5)setTimeout(()=>{try{const s=pick175(BAG175.sage);vpMsg(vieux.n.split(' ')[0]+' : « '+s+' » ('+BAGFR175[s]+')')}catch(e){}},2600)}}catch(e){}return r}}
