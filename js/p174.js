
// ===== p174 : la pluie suit l'île — l'Est et le Sud sauvage sont mouillés presque toujours (hauts de Bras-Panon, Plaine des Palmistes, Bébour sous le Piton des Neiges, Saint-Philippe),
// l'Ouest sous le vent reste sec en saison sèche ; après un cyclone, le beau temps revient d'abord à l'Ouest pendant que l'Est prend encore la pluie. =====
{const cy=cyclone;cyclone=function(){const r=cy.apply(this,arguments);try{if(S)S.cycNs=S.ns||0}catch(e){}return r}}
// La part du temps où il pleut, selon l'endroit (relevé de Paris) : Sud sauvage 4/5 ; la côte au vent et ses hauts vont de 4/5 au sud jusqu'à 2/5 à Saint-Denis ;
// de légères averses dans les hauts du Sud-Ouest jusqu'à Saint-Leu ; l'Ouest sous le vent reste sec en saison sèche.
function pluieLieu174(x,z){try{const g=LL99({x,z}),h=Math.max(0,alt(x,z)),sais=typeof pluie==='function'&&pluie(),post=S.cycNs!=null&&(S.ns||0)-S.cycNs<=1&&!(S.cyc&&S.cyc.in<=0);
 const k=v=>Math.max(0,Math.min(1,v));let duty,inten,z0;
 if(g.lon>55.6&&g.lat<-21.2){z0='sudSauvage';duty=sais?.85:.8;inten=.8}
 else if(g.lon>55.5){z0='vent';const f=k((g.lat+20.88)/(-21.3+20.88));duty=(.4+.4*f)+(h>350?.08:0);if(!sais)duty*=.85;inten=.6}
 else if(g.lon<55.45&&h<350){z0='ouest';duty=sais?.08:0;inten=.4}
 else if(g.lon<55.45&&h<1300){z0='hautsSO';duty=sais?.5:.35;inten=.15}
 else if(g.lat<-21.12&&g.lon>=55.28&&h>600&&h<1300){z0='hautsSO';duty=sais?.45:.3;inten=.15}
 else{z0='centre';duty=sais?.4:.15;inten=.5}
 if(post){if(z0==='ouest'||z0==='hautsSO'||z0==='centre')duty=0;else duty=1}
 return {z:z0,duty:k(duty),inten}}catch(e){return {z:'centre',duty:.2,inten:.5}}}
function humZone174(x,z){return pluieLieu174(x,z).z}
function ampPluie174(){try{return S&&!S.fin?pluieLieu174(camT.x,camT.z).duty:0}catch(e){return 0}}
// une averse par tranche de 50 s : il pleut sur la tranche si son tirage tombe sous la part de temps du lieu ; montée et descente douces
function averse174(){try{if(!S||S.fin)return 0;const P=pluieLieu174(camT.x,camT.z);if(P.duty<=0)return 0;const t=performance.now()/1000,w=Math.floor(t/50),u=(t/50)-w;
 if(rndH(w*7.31+(S.ns||0)*1.7)>=P.duty)return 0;const fort=P.z==='centre'&&rndH(w*3.9+1.3)<.35?1.6:1;return Math.min(1,P.inten*fort)*Math.min(1,u*5,(1-u)*5)}catch(e){return 0}}
averseF146=function(){try{if(!S||S.fin)return 0;if(!modeHist())return typeof pluieF106==='function'?pluieF106():0;if(S.cyc&&S.cyc.in<=0)return 0;return averse174()*.7}catch(e){return 0}};
pluieF106=function(){try{if(!S||S.fin)return 0;const cyc=S.cyc&&S.cyc.in<=0?1:S.cyc&&S.cyc.in===1?.6:0;return Math.min(1,Math.max(cyc,averse174()*.7))}catch(e){return 0}};
// l'en-tête dit le vrai temps : cyclone quand il est là, et les averses de l'Est en saison sèche
{const e0=ep;ep=function(){try{if(S&&S.cyc&&S.cyc.in<=0)return 'Cyclone · '+ep0();const r=e0.apply(this,arguments);if(S&&!pluie()&&ampPluie174()>=.4)return r.replace('Saison sèche · ','Saison sèche, averses au vent · ');return r}catch(e){return e0.apply(this,arguments)}}}
