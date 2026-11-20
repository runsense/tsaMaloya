
// ===== p174 : la pluie suit l'île — l'Est et le Sud sauvage sont mouillés presque toujours (hauts de Bras-Panon, Plaine des Palmistes, Bébour sous le Piton des Neiges, Saint-Philippe),
// l'Ouest sous le vent reste sec en saison sèche ; après un cyclone, le beau temps revient d'abord à l'Ouest pendant que l'Est prend encore la pluie. =====
{const cy=cyclone;cyclone=function(){const r=cy.apply(this,arguments);try{if(S)S.cycNs=S.ns||0}catch(e){}return r}}
function humZone174(x,z){try{const g=LL99({x,z}),h=Math.max(0,alt(x,z));
 if(g.lon>55.6&&g.lat<-21.2)return 'tw';                                   // Sud sauvage : Saint-Philippe, Sainte-Rose, le Grand Brûlé
 if(g.lon>55.5&&g.lon<55.7&&g.lat>-21.2&&g.lat<-20.97&&h>350)return 'tw';     // hauts de Bras-Panon, Plaine des Palmistes, Bébour-Bélouve, Takamaka
 if(g.lon>55.55)return 'w';                                                   // la côte au vent
 if(g.lon<55.45&&h<1300)return 'd';                                           // l'Ouest sous le vent
 return 'm'}catch(e){return 'm'}}
function ampPluie174(){try{if(!S||S.fin)return 0;const z=humZone174(camT.x,camT.z),sais=typeof pluie==='function'&&pluie(),post=S.cycNs!=null&&(S.ns||0)-S.cycNs<=1&&!(S.cyc&&S.cyc.in<=0);
 if(post)return {tw:1,w:1,m:.15,d:0}[z];return (sais?{tw:1,w:.8,m:.5,d:.35}:{tw:.75,w:.4,m:.1,d:0})[z]}catch(e){return 0}}
// l'Histoire : l'averse ne dépend plus seulement de la saison
averseF146=function(){try{if(!S||S.fin)return 0;if(!modeHist())return typeof pluieF106==='function'?pluieF106():0;if(S.cyc&&S.cyc.in<=0)return 0;const a=ampPluie174();if(a<=0)return 0;
 const t=performance.now()/1000,o=Math.max(0,Math.sin(t*.05)+.35*Math.sin(t*.13+2));return Math.max(0,a*(a>=.75?.35+.5*o:.8*o-.25))*.7}catch(e){return 0}};
// la Vie et la Survie : même chose, le cyclone garde sa force partout
pluieF106=function(){try{if(!S||S.fin)return 0;const t=performance.now()/1000;const cyc=S.cyc&&S.cyc.in<=0?1:S.cyc&&S.cyc.in===1?.6:0;const a=ampPluie174();const averse=Math.max(0,Math.sin(t*.07)+Math.sin(t*.031+1.3)*.6);
 return Math.min(1,Math.max(cyc,a*.6*(a>=.75?.4+.6*averse:averse)))}catch(e){return 0}};
// l'en-tête dit le vrai temps : cyclone quand il est là, et les averses de l'Est en saison sèche
{const e0=ep;ep=function(){try{if(S&&S.cyc&&S.cyc.in<=0)return 'Cyclone · '+ep0();const r=e0.apply(this,arguments);if(S&&!pluie()&&ampPluie174()>=.4)return r.replace('Saison sèche · ','Saison sèche, averses au vent · ');return r}catch(e){return e0.apply(this,arguments)}}}
