// ===== p56 : les cinématiques — une sortie (chasse, cueillette, pêche, reconnaissance) commence comme un petit film, puis on voit le groupe
// avancer peu à peu sur la carte ; les choix du conte se voient aussi : ceux qui redescendent, ceux qui restent, les navires qui passent =====
const SORT={L:[],dern:0};
function sortieModeles(ci){const P=(S.pp||[]).filter(p=>adulte(p)&&(ci==null||campDe(p)===ci)&&!enGrp(p)).slice(0,3).map(p=>mfModeleDe(p));
 const def=S.voieC?['homme_chemise','servante','commandeur']:['p1a_chasseur','femme_sagaie','jeune_pagne'];while(P.length<3)P.push(def[P.length]);return P}
function campProche(t){const C=camps();if(!C.length)return null;return C.slice().sort((a,b)=>Math.hypot(a.x-t.x,a.z-t.z)-Math.hypot(b.x-t.x,b.z-t.z))[0]}
function nomLieu(t){return lieuDe(t)||(lieuProche(t)||'').replace(/^près de /,'vers ')||t.biome||'les Hauts'}
// un groupe qui marche : il part de A, arrive en B, puis travaille (ou disparaît s'il ne fait que passer)
function sortieLibere(o){o.n.forEach((m,j)=>{const k=o.cle+'_'+j,f=MF.L[k];if(f&&f.o){scene.remove(f.o);f.o.traverse(x=>{if(x.geometry)x.geometry.dispose();if(x.material)(Array.isArray(x.material)?x.material:[x.material]).forEach(mm=>{if(mm.map)mm.map.dispose();mm.dispose()})})}delete MF.L[k]})}
function sortieAjoute(o){if(SORT.L.length>=6)sortieLibere(SORT.L.shift());o.t0=performance.now();o.cle='so'+(SORT.n=(SORT.n||0)+1);SORT.L.push(o);return o}
{const b0=bat;bat=function(k){b0(k);try{if(!S||typeof mfPoser!=='function')return;const now=performance.now();
 SORT.L=SORT.L.filter(o=>{const u=(now-o.t0)/o.dur;if((o.tile!=null&&o.act&&(!S.t[o.tile]||S.t[o.tile].b!==o.act))||(o.fin&&u>1+o.fin)){sortieLibere(o);return false}
  const e=Math.min(1,u),x=o.a.x+(o.b.x-o.a.x)*e,z=o.a.z+(o.b.z-o.a.z)*e,ry=Math.atan2(o.b.x-o.a.x,o.b.z-o.a.z);
  o.n.forEach((m,j)=>{const ox=Math.cos(j*2.1)*.18*(j?1:0),oz=Math.sin(j*2.1)*.18*(j?1:0),px=x+ox-(u<1?Math.sin(ry)*j*.12:0),pz=z+oz-(u<1?Math.cos(ry)*j*.12:0);
   mfPoser(o.cle+'_'+j,m,px,Math.max(0,alt(px,pz))*VX+.02,pz,u<1?ry:ry+j*1.3,u<1?'marche':(o.clip||'repos_debout'))});return true})}catch(e){}}}
// le film : deux plans — le départ, puis le chemin vers le lieu ; il ne se joue pas plus d'une fois toutes les 25 secondes
function cineSortie(a,b,txt1,txt2){if((typeof CINE!=='undefined'&&CINE)||performance.now()-SORT.dern<25000||!$('ecran').hidden)return;SORT.dern=performance.now();
 const mx=(a.x+b.x)/2,mz=(a.z+b.z)/2,an=Math.atan2(b.x-a.x,b.z-a.z)+Math.PI;
 try{cineJouer([{d:2200,cam:[a.x,a.z,4.5,an,.95],camY:0,txt:txt1},{d:3200,cam:[mx,mz,7,an+.3,.85],camY:0,txt:txt2}])}catch(e){}}
const SORTA={chasse:['chasse_traque','Les chasseurs partent','sagaies en main, les chiens devant.'],cueil:['cueillir','On part cueillir','paniers sur le dos.'],
 peche:['bichique','On descend pêcher','à la rivière, avec les vouves.'],pecheM:['bichique','',''],explorer:['guetteur','Un groupe part reconnaître','sans faire de bruit.'],guet:['guetteur','Un guetteur monte','au-dessus du camp.'],examiner:['guetteur','On va voir de près','ce qu’il y a là-bas.'],recolte:['houe','Au travail des champs','la houe à l’épaule.']};
{const ag=agir;agir=function(t,id,l){const r=ag.apply(this,arguments);try{if(!r||!S||S.bac||!SORTA[id])return r;const c=campProche(t);if(!c||c===t)return r;const A=SORTA[id],n=sortieModeles(c.i),d=Math.hypot(t.x-c.x,t.z-c.z);
  sortieAjoute({n,a:{x:c.x,z:c.z},b:{x:t.x,z:t.z},dur:Math.max(6000,d*2600),tile:t.i,act:S.t[t.i]&&S.t[t.i].b||id,clip:A[0]});
  const lieu=nomLieu(t);let t1=A[1]+' '+(lieu.startsWith('vers')?lieu:'vers '+lieu),t2=A[2];
  if(id==='pecheM'){t1=S.voieC?'La pirogue de l’habitation sort au petit jour':(Math.random()<.5?'Au jour levant, on descend pêcher en mer':'À la nuit, on descend pêcher en mer');t2=S.voieC?'les pêcheurs rament vers le large.':'près des colons, sans se faire voir.'}
  cineSortie(c,t,t1,t2)}catch(e){}return r}}
// les groupes du mode Jeu : quand un groupe part, le petit film de départ aussi
if(typeof grpChoisir==='function'){const gc=grpChoisir;grpChoisir=function(t,a,go){return gc.call(this,t,a,()=>{go();try{const c=campProche(t);if(c&&c!==t){const A=SORTA[a&&a.id]||['marche','Le groupe part','vers '+nomLieu(t)];cineSortie(c,t,A[1]+' '+(A[1]?'vers '+nomLieu(t):''),A[2])}}catch(e){}})}}

// ---------- les choix du conte ----------
const CONTE_RE={descente:/redescend|se rendre|rentrer à l’habitation|retourner (à la plantation|à l’habitation|chez)|descendre (à|chez|se)/i,reste:/^rester|reste(r)? au camp|on reste|refuser de redescendre|garder (tout le monde|les siens)/i,mer:/bateau|navire|pirogue|embarqu|voile|pirate|frégate|corsaire|escadre|boutre|vaisseau/i};
function bateauMesh(){const g=new THREE.Group(),M=c=>new THREE.MeshLambertMaterial({color:c});const h=new THREE.Mesh(new THREE.BoxGeometry(.5,.1,.16),M(0x5a3a22));h.position.y=.05;g.add(h);
 const m=new THREE.Mesh(new THREE.CylinderGeometry(.01,.01,.5,5),M(0x6a4a2a));m.position.y=.32;g.add(m);const v=new THREE.Mesh(new THREE.PlaneGeometry(.3,.34),new THREE.MeshLambertMaterial({color:0xefe6d0,side:THREE.DoubleSide}));v.position.set(.03,.34,0);v.rotation.y=Math.PI/2;g.add(v);return g}
function pointMer(x,z,R){R=R||1;const a=Math.atan2(z-PNz,x-PNx);let r=Math.hypot(x-PNx,z-PNz);for(let i=0;i<60&&alt(PNx+Math.cos(a)*r,PNz+Math.sin(a)*r)>-2;i++)r+=.25;r+=R||.6;return {a,r}}
function cineMer(depart,arrivee,txt){if((typeof CINE!=='undefined'&&CINE)||!$('ecran').hidden)return;const A=pointMer(depart.x,depart.z),B=pointMer(arrivee.x,arrivee.z);let da=B.a-A.a;da=Math.atan2(Math.sin(da),Math.cos(da));
 const pos=u=>{const a=A.a+da*u,r=A.r+(B.r-A.r)*u;return [PNx+Math.cos(a)*r,PNz+Math.sin(a)*r]};const bt=bateauMesh();bt.scale.setScalar(1.0);scene.add(bt);
 const f=(U,k,u0,u1)=>{const u=u0+(u1-u0)*k,[x,z]=pos(u),[x2,z2]=pos(Math.min(1,u+.01));bt.position.set(x,.02+Math.sin(performance.now()/300)*.015,z);bt.rotation.y=Math.atan2(-(z2-z),x2-x);bt.rotation.z=Math.sin(performance.now()/500)*.06};
 const [x0,z0]=pos(0),[x1,z1]=pos(.5),[x2,z2]=pos(1);
 try{cineJouer([{d:2600,cam:[x0,z0,5,az,.9],camY:0,txt:txt[0],f:(U,k)=>f(U,k,0,.25)},{d:3000,cam:[x1,z1,7,az+.4,.85],camY:0,txt:txt[1],f:(U,k)=>f(U,k,.25,.8)},{d:2200,cam:[x2,z2,5,az+.6,.9],camY:0,txt:txt[2]||'',f:(U,k)=>f(U,k,.8,1)}],()=>{scene.remove(bt)})}catch(e){scene.remove(bt)}}
function lieuNomme(txt){const l=(typeof LIEUX!=='undefined'?LIEUX:[]).filter(l=>l.col!==undefined&&txt.includes(l.n)).sort((a,b)=>b.n.length-a.n.length)[0];return l?l.t:null}
{const ch=choisir;choisir=function(id,k){let e=null,o=null;try{e=EV[id];o=optsDe(id,e)[k]}catch(_){}const r=ch.apply(this,arguments);
 try{if(!o||!S||S.bac||S.fin)return r;let corps='';try{corps=(typeof e.b==='string'?e.b:'')+' '+(e.t||'')}catch(_){}const ot=(o.n||'')+' '+(o.d||''),c=camps()[0];if(!c)return r;
  if(CONTE_RE.descente.test(ot)){// des marrons redescendent vers les habitations : on les voit partir, peu à peu, vers le bas
   const v=(S.towns||[]).map(n=>{const L=(LIEUX||[]).find(l=>l.n===n);return L&&L.t}).filter(Boolean).sort((a,b)=>Math.hypot(a.x-c.x,a.z-c.z)-Math.hypot(b.x-c.x,b.z-c.z))[0]||T.filter(t=>t.alt>3&&t.alt<200).sort((a,b)=>Math.hypot(a.x-c.x,a.z-c.z)-Math.hypot(b.x-c.x,b.z-c.z))[0];
   if(v){sortieAjoute({n:sortieModeles(c.i).slice(0,2),a:{x:c.x,z:c.z},b:{x:v.x,z:v.z},dur:16000,fin:.4,clip:'repos_debout'});SORT.dern=0;cineSortie(c,v,'Ils redescendent','vers '+(lieuDe(v)||'les habitations du bas')+', sans se retourner.')}}
  else if(CONTE_RE.reste.test(ot)){if(!(typeof CINE!=='undefined'&&CINE))try{cineJouer([{d:3200,cam:[c.x,c.z,3.5,az+.8,.95],camY:0,txt:'On reste au camp. Autour du feu, personne ne parle de partir.'}])}catch(_){}}
  else if(CONTE_RE.mer.test(ot)||CONTE_RE.mer.test(corps)){const dest=lieuNomme(ot)||lieuNomme(corps)||c,dep=S.voieC?(lieuNomme('Saint-Paul')||c):(c);
   const txt=/pirate/i.test(ot+corps)?['Un navire pirate longe la côte','À bord, on scrute la montagne : une fumée trahit un camp.','']:/Sainte-Suzanne/.test(ot+corps)?['Un navire quitte Saint-Paul','Il longe la côte vers Sainte-Suzanne.','On débarque avec les outils et les semences.']:['Un navire passe au large','La côte défile, les montagnes au-dessus.',''];
   cineMer(dep,dest===dep?{x:dep.x+3,z:dep.z+2}:dest,txt)}}catch(e){}return r}}
