// ===== p377 : un coup final à la personnalité de chaque combattant. Le boxeur enchaîne, le capoeiriste balaie puis
// retombe d'en haut, le lutteur soulève et plaque, l'homme d'armes frappe trois fois avec son arme, le gardien bondit,
// les esprits et les boss soulèvent l'autre par leur pouvoir (feu, brume, ombre), Ti Jean le fait trébucher par ruse. =====
const FINT377={
 rafale:{titre:'L’enchaînement final',p:[{a:'p1',t:.16,kb:50},{a:'p2',t:.16,kb:50},{a:'p1',t:.14,kb:50},{a:'p2',t:.14,kb:60},{a:'p3',t:.35,vx:450,vy:1000,spin:12,fx:'255,230,180'}]},
 balayette:{titre:'Balayette et coup retourné',p:[{a:'k1',t:.32,chute:1},{a:'k3',t:.5,saut:650,vx:950,vy:260,spin:5,fx:'255,240,200'}]},
 arme:{titre:'Trois coups d’arme',p:[{a:'j',t:.28,kb:80},{a:'j',t:.28,kb:80},{a:'j',t:.55,vx:1300,vy:620,spin:9,fx:'255,235,190'}]},
 projection:{titre:'Soulevé et plaqué',p:[{a:'p2',t:.25,prise:1},{a:'p3',t:.75,leve:1},{a:'k3',t:.35,plaque:1,fx:'255,220,170'}]},
 bond:{titre:'Le bond qui retombe',p:[{a:'u',t:.55,saut:980},{a:'k3',t:.4,vx:900,vy:450,spin:10,fx:'255,250,210'}]},
 pouvoir:{titre:'La force de l’esprit',loin:1,p:[{a:'s',t:1,levite:1,fx:'200,170,255'},{a:'v',t:.5,vx:950,vy:850,spin:15,fx:'200,170,255'}]},
 feu:{titre:'Brûlé par le feu',loin:1,p:[{a:'s',t:1,levite:1,fx:'255,120,40'},{a:'v',t:.5,vx:1000,vy:900,spin:13,fx:'255,90,20'}]},
 ruse:{titre:'Le croc-en-jambe de Ti Jean',p:[{a:'p1',t:.3,trip:1,fx:'255,250,220'}]}};
const FINK377={tijean:'ruse',grandiab:'feu',desbassyns:'feu',ombre:'feu',kal:'pouvoir',sitarane:'pouvoir',gardien:'bond',malabar:'bond',chinois:'bond',capoeira:'balayette',raharianne:'balayette',simangalove:'balayette',heva:'balayette',malgache:'rafale',cimendef:'projection',dimitile:'arme',milicien:'arme',commandeur:'arme',mussard:'arme',anglais:'arme',gouverneur:'arme',colon:'arme'};
function fin377(f){if(!f)return null;let k=FINK377[f.k];if(!k){const t=((f.n||'')+' '+(f.d||'')+' '+((f.arme&&f.arme.n)||'')).toLowerCase();
  k=/feu|diab|volcan|brûl/.test(t)?'feu':(f.boss||/esprit|sorci|âme|ombre|mystique|mythe/.test(t))?'pouvoir':/boxe|poing|moraingy|muay|mma|karat|uppercut/.test(t)?'rafale':/capoeira|balay|savate|moringue|danse/.test(t)?'balayette':/lutt|colosse|zébu|projection/.test(t)?'projection':/bond|kung|kalari|varma|saut|singe/.test(t)?'bond':/sabre|fusil|baïonnette|barre|épée|canne|gourdin|crosse|sagaie|bâton|dague|lance/.test(t)?'arme':['rafale','balayette','arme','bond'][[...(f.k||'x')].reduce((a,c)=>a+c.charCodeAt(0),0)%4]}
 const T=FINT377[k];return T?{titre:T.titre,loin:T.loin,p:T.p.map(x=>Object.assign({},x))}:null}
function fin377pas(G,Wn,L,dt){const Q=G.seq,S=Q.p[G.si];if(!S){if(!G.fin377)G.fin377=G.pt;return}
 const d=L.x-Wn.x;
 if(!G.go){if(!Q.loin&&Math.abs(d)>72&&!G.prise){Wn.x+=Math.sign(d)*900*dt;return}G.go=1;G.st=0;Wn.act=S.a;Wn.at=S.t;Wn.hit=true;if(S.saut){Wn.vy=S.saut;Wn.bond=1}if(S.fx){G.flashC=S.fx;G.flash=Math.max(G.flash||0,.12)}
  if(S.kb){L.x+=Wn.s*S.kb*.4;G.shake=Math.max(G.shake||0,.2);G.flash=.15}if(S.prise)G.prise=1;if(S.levite)G.lev=1}
 G.st+=dt;
 if(S.leve||G.prise&&S.a==='p3'){L.x+=(Wn.x+Wn.s*25-L.x)*Math.min(1,dt*10);L.yF=Math.min(170,(L.yF||0)+dt*420);L.rot=(L.rot||0)+dt*6*Wn.s}
 if(G.lev&&S.levite){L.yF=Math.min(140,(L.yF||0)+dt*160);L.rot=Math.sin(G.st*9)*.35;G.shake=Math.max(G.shake||0,.12);if(S.fx)G.flash=Math.max(G.flash||0,.05+.05*Math.sin(G.st*20))}
 if(S.saut&&Wn.vy<0&&!S.over){S.over=1;Wn.x+=(L.x-Wn.s*40-Wn.x)*.5}
 if(G.st<S.t)return;
 // fin de l'étape
 if(S.chute){L.rot=Wn.s*1.45;L.yF=0;G.shake=.35}
 if(S.plaque){L.yF=0;L.vyF=320;L.vx=Wn.s*260;G.frap=1;G.spin=3;G.shake=1.1;G.flash=.4;G.prise=0}
 if(S.trip){G.frap=1;L.vx=Wn.s*380;L.vyF=260;G.spin=7;G.flash=.25}
 if(S.vx){G.frap=1;L.vx=Wn.s*S.vx;L.vyF=S.vy;G.spin=S.spin||8;G.flash=.35;G.shake=.6;G.lev=0}
 G.si++;G.go=0;if(G.si>=Q.p.length)G.fin377=G.pt}
