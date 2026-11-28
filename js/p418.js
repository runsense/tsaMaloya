// ===== p418 : quand une archive ou un récit s'ouvre, le jeu ne se cache plus derrière un écran noir.
// - les fiches qui ont une photo d'époque la montrent, la carte continue derrière ;
// - les autres : la caméra descend sur le lieu évoqué, et une scène se joue avec les personnages et leurs gestes
//   (autour du feu on parle et on rit, au champ on cueille et on porte, au culte on prie, à la fête on danse le maloya…).
// La carte de l'événement se range sur le côté pour laisser voir la scène. =====
const LX418=[['Mafate',55.430,-21.050],['Cilaos',55.471,-21.135],['Salazie',55.528,-21.028],['Hell-Bourg',55.523,-21.064],['Plaine des Cafres',55.570,-21.210],['Plaine des Palmistes',55.630,-21.130],
 ['Entre-Deux',55.470,-21.250],['Dimitile',55.510,-21.220],['Le Port',55.290,-20.940],['La Possession',55.330,-20.925],['Grande Chaloupe',55.380,-20.895],['Saint-Philippe',55.770,-21.360],['Sainte-Rose',55.790,-21.130],
 ['Saint-Joseph',55.620,-21.380],['Piton des Neiges',55.480,-21.100],['Fournaise',55.710,-21.240],['Bébour',55.570,-21.110],['Rivière des Galets',55.330,-20.950],['Trois-Bassins',55.300,-21.100],['Saint-Gilles',55.220,-21.050],['Bras de la Plaine',55.500,-21.230]];
const SC418={id:null,t:null,F:[],feu:null,t0:0};
// le thème de la scène, d'après le texte
function theme418(tx){tx=tx.toLowerCase();
 if(/conseil|raconte|parle|assembl|réunion des chefs|palabre|veillée/.test(tx)&&!/maloya|danse/.test(tx))return 'feu';
 if(/maloya|kabar|danse|fête|bal |tambour|chant|séga|sega|musique/.test(tx))return 'fete';
 if(/ancêtre|ody|sikidy|ombiasy|prière|prie|messe|culte|sacré|esprit|servis|offrande|rituel|chapelle|église|temple/.test(tx))return 'culte';
 if(/mort|meurt|deuil|enterr|tombe|cimetière|tué/.test(tx))return 'deuil';
 if(/chasse|chasseur|détachement|milice|battue|fusil|combat|attaque|guerre|soldat|anglais/.test(tx))return 'chasse';
 if(/canne|récolte|cueill|café|girofle|vanille|jardin|champ|plant|fangourin|moulin|sucre|maïs|riz|labour|semence/.test(tx))return 'travail';
 return 'feu'}
const GESTES418={feu:['parler','rire_assis','vieux_repos','parler','rire_assis'],fete:['danse_maloya','tambour','danse_maloya_homme','joue_rouler','danse_maloya'],culte:['prier','ceremonie','genou','prier','vieux_repos'],
 deuil:['genou','prier','vieux_repos','genou','parler'],chasse:['fusil','chasse_traque','guetteur','marche','fusil'],travail:['cueillir_mx','porter','ramasser','cueillir_mx','parler']};
function modeles418(tx){const colon=S.voieC?!/marron|esclave|fugitif|camp marron|kabar|maloya/i.test(tx):/colon|habitant|gouverneur|compagnie|milice|maître/i.test(tx)&&!/marron|camp/i.test(tx);
 return colon?['p7_colon','femme_travail','homme_chemise','colone','commandeur']:['p1a_chasseur','femme_sagaie','mystique','jeune_pagne','femme_drapee']}
// le lieu évoqué : un nom de lieu dans le texte, sinon le camp ou le quartier du joueur
function lieu418(tx){const L=(typeof LIEUX!=='undefined'?LIEUX.map(l=>[l[0],l[1],l[2]]):[]).concat(LX418);let best=null,bi=1e9;
 L.forEach(([n,lo,la])=>{const i=tx.indexOf(n);if(i>=0&&i<bi){bi=i;best=[lo,la]}});
 if(best)return near(best[0],best[1]);const c=typeof camps==='function'&&camps()[0];return c||null}
function fin418(){const avait=!!SC418.t;SC418.id=null;SC418.dec=0;SC418.N=null;SC418.t=null;SC418.F=[];if(SC418.feu){try{scene.remove(SC418.feu)}catch(e){}SC418.feu=null}document.body.classList.remove('sc418','ph418');if(avait)try{peindre()}catch(e){}}
function debut418(id,e){fin418();SC418.id=id;let tx='';try{tx=(e.t||'')+' '+(typeof e.b==='string'?e.b:'')}catch(x){}
 if(typeof PH417!=='undefined'&&PH417[id]){document.body.classList.add('ph418');return}// la photo suffit : la carte reste visible derrière
 if(/^bat/.test(id)||e.sys||e.noScene)return;const t=lieu418(tx);if(!t||typeof mfPoser!=='function')return;
 SC418.N=T.filter(u=>Math.hypot(u.x-t.x,u.z-t.z)<2.2).map(u=>(u.row*COLW+u.col)*4);const th=theme418(tx),G=GESTES418[th],M=modeles418(tx),n=th==='chasse'?3:th==='travail'?4:5;SC418.t=t;SC418.t0=performance.now();
 for(let i=0;i<n;i++){const a=i/n*Math.PI*2+.4,r=th==='fete'?.2:th==='travail'?.28:.15;SC418.F.push({cle:'sc418_'+i,m:M[i%M.length],dx:Math.cos(a)*r,dz:Math.sin(a)*r,ry:th==='chasse'?-.6:Math.atan2(-Math.cos(a),-Math.sin(a)),g:G[i%G.length]})}
 if(th!=='travail'&&th!=='chasse'){const g=new THREE.Group(),y=(t.alt||0)*VX;g.position.set(t.x,y+.01,t.z);
  const bois=new THREE.MeshLambertMaterial({color:0x4a3020});for(let k=0;k<3;k++){const b=new THREE.Mesh(new THREE.CylinderGeometry(.005,.005,.07,5),bois);b.rotation.set(Math.PI/2,k*1.05,0);b.position.y=.005;g.add(b)}
  const fl=new THREE.Mesh(new THREE.ConeGeometry(.02,.055,7),new THREE.MeshBasicMaterial({color:0xff8a2a,transparent:true,opacity:.9}));fl.position.y=.03;g.add(fl);g.userData.fl=fl;SC418.feu=g;scene.add(g)}
 document.body.classList.add('sc418');try{conteVoir(t,1.3);if(camGo)camGo.p=.92}catch(x){}requestAnimationFrame(boucle418)}
{const st=document.createElement('style');st.textContent='body.sc418.enConte::before,body.ph418.enConte::before{display:none}body.sc418 #modal{display:flex!important;justify-content:flex-end;align-items:center;background:none!important}body.sc418 #modal .carte{max-width:min(440px,46vw)!important;margin:0 2vw 0 auto!important;max-height:86vh;overflow:auto}@media (max-width:700px){body.sc418 #modal{align-items:flex-end}body.sc418 #modal .carte{max-width:96vw!important;max-height:52vh;margin:0 auto 2vh!important}}';document.head.appendChild(st)}
{const m0=modal;modal=function(){const r=m0.apply(this,arguments);try{const m=$('modal');if(!S||!S.evq||!S.evq.length||m.hidden){if(SC418.id)fin418();return r}
 const id=S.evq[0];if(id!==SC418.id)debut418(id,EV[id]||{})}catch(e){}return r}}
// à chaque image : les personnages de la scène à leur place, leurs gestes, le feu qui danse (boucle propre : la carte ne se redessine pas à chaque image)
function boucle418(){if(!SC418.t||!SC418.F.length)return;requestAnimationFrame(boucle418);try{const m=$('modal');if(!m||m.hidden){fin418();return}const t=SC418.t,now=performance.now();
 if(!SC418.dec&&now-SC418.t0<20000&&typeof camGo!=='undefined'&&!camGo&&(Math.hypot(camT.x-t.x,camT.z-t.z)>.6||dist>2.2))try{conteVoir(t,1.3);if(camGo)camGo.p=.92}catch(x){}
 if(!SC418.dec&&typeof camGo!=='undefined'&&!camGo&&dist<2&&innerWidth>700){SC418.dec=1;try{const rv=new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld,0);rv.y=0;rv.normalize();const k=dist*.3;camT.x+=rv.x*k;camT.z+=rv.z*k}catch(x){}}
 try{let ch=0;(SC418.N||[]).forEach(k=>{if(stData[k]){stData[k]=0;ch=1}});if(ch)stTex.needsUpdate=true}catch(x){}
 SC418.F.forEach(f=>{const x=t.x+f.dx,z=t.z+f.dz;mfPoser(f.cle,f.m,x,alt(x,z)*VX+.01,z,f.ry,f.g);const F=MF.L[f.cle];if(F&&F.mx){const dt=Math.min(.1,(now-(F.tp418||now))/1000);F.tp418=now;F.mx.update(dt)}});
 if(SC418.feu){const fl=SC418.feu.userData.fl;fl.scale.set(1+Math.sin(now/90)*.15,1+Math.sin(now/70)*.25,1+Math.cos(now/80)*.15)}}catch(e){}}
// la carte cache à chaque dessin les personnages qu'elle n'a pas posés : on repose ceux de la scène juste après, avant l'image
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(SC418.t&&SC418.F.length){const t=SC418.t;SC418.F.forEach(f=>{const x=t.x+f.dx,z=t.z+f.dz;mfPoser(f.cle,f.m,x,alt(x,z)*VX+.01,z,f.ry,f.g)})}}catch(e){}return r}}
// la chasse aux nids de guêpes jaunes (rod lo gèp) : de la survie des Hauts à l'inventaire du patrimoine immatériel
EV.guepes418={y:1700,tag:'Mémoire',an:'XVIIIᵉ siècle',si:()=>S&&S.year>=1690&&!S.voieC&&rnd()<.25,t:'Les nids de guêpes jaunes',
 b:'Sous les feuilles des goyaviers et des fougères, les guêpes jaunes accrochent leurs nids. On enfume, on décroche le nid d’un coup de bâton, on court : dans les alvéoles, les larves grasses se mangent frites ou grillées. Pour un camp des Hauts, c’est une viande qui ne coûte rien.',
 h:'✅ Fait attesté : la récolte et la consommation des larves de guêpes (« rod lo gèp ») figurent à l’inventaire du patrimoine culturel immatériel en France. 🗣 Tradition : on la fait venir des savoirs malgaches et africains, et on la prête aux marrons des Hauts et aux familles pauvres des cirques ; aucune archive du XVIIIᵉ siècle connue ici ne la décrit. Elle s’est ensuite liée au Carême, les larves n’étant pas tenues pour de la viande. Aujourd’hui, c’est un mets rare et cher.',
 o:[{n:'Dénicher les nids',d:'Vivres +3, santé -1 (les piqûres)',fx:{vivres:3,sante:-1}},{n:'Laisser les guêpes tranquilles',d:'Cohésion +1',fx:{coh:1}}]};
try{Object.assign(window.TR363=window.TR363||{},{'Les nids de guêpes jaunes':'The yellow wasp nests','Dénicher les nids':'Take down the nests','Laisser les guêpes tranquilles':'Leave the wasps alone'})}catch(e){}
