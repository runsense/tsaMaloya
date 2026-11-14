// ===== p26 : la Construction vit en temps continu — les mois passent seuls, la saison des cyclones, et l'après-cyclone =====
// Les cyclones datés viennent des relevés (1904–2025). Avant, l'histoire n'en garde pas de liste sûre : ils sont imaginés, et dits tels.
const KMOIS=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
const KCYCH=[...Object.entries(typeof CYR!=='undefined'?CYR:{}).map(([y,f])=>[+y,1,f,'le cyclone de '+y,'l’année est attestée, le mois est supposé']),[1904,2,2,'le cyclone de mars 1904','il frappe Saint-Denis : 24 morts'],[1932,1,3,'le cyclone de février 1932','petit mais violent : une centaine de morts'],[1945,3,2,'le cyclone d’avril 1945','l’œil passe sur l’île, rafales de plus de 200 km/h'],
 [1948,0,3,'le cyclone du 27 janvier 1948','le plus meurtrier : 165 morts, Saint-Leu détruite à 80 %'],[1962,1,3,'Jenny','rafales de 250 km/h, 36 morts, près de 4 000 maisons détruites'],[1966,0,1,'Denise','des pluies record, des crues'],
 [1980,0,2,'Hyacinthe','des pluies sans fin pendant deux semaines, 25 morts'],[1981,0,2,'Florine','rafales de 234 km/h à la Plaine des Cafres'],[1989,0,3,'Firinga','rafales de 216 km/h à Saint-Pierre, 10 morts'],[1993,0,2,'Colina','l’œil frôle l’île'],
 [1994,1,2,'Hollanda','cultures et lignes arrachées'],[2007,1,2,'Gamède','des pluies record mondial sur trois jours'],[2014,0,2,'Bejisa','des cultures perdues à Cilaos et ailleurs'],[2018,3,1,'Fakir','passe à l’est, rafales de 176 km/h'],[2024,0,2,'Belal','l’œil passe sur l’île'],[2025,1,3,'Garance','touche terre : crues et dégâts lourds']];
const KSAIS=m=>[11,0,1,2,3].includes(m)?(m>=0&&m<=2?'cœur de la saison des cyclones':'saison des cyclones'):[5,6,7].includes(m)?'hiver austral, frais':'saison sèche';
const KV={vit:1,dur:20000};// un mois de Construction = 20 s à vitesse ×1 (un an en 4 min)
function kPrep3(){if(!K)return;if(K.mo==null)K.mo=0;if(K.mt==null)K.mt=0;if(K.apres==null)K.apres=0}
// le cyclone de l'année ne tombe plus au hasard en fin d'année : il vient dans son mois
kCyclone=function(){};
function kCycFrappe(f,nom,note,hist){const xs=T.map(t=>t.x),zs=T.map(t=>t.z),x0=Math.min(...xs),x1=Math.max(...xs),z0=Math.min(...zs),z1=Math.max(...zs),cx=(x0+x1)/2,trav=f>=2?Math.random()<.7:Math.random()<.35;
 const dec=trav?(Math.random()-.5)*10:(Math.random()<.5?-1:1)*(x1-x0)*.62,a={x:cx+30+dec,z:z0-20},b={x:cx-30+dec,z:z1+20};K.cyc={f,a,b,trav};
 const ad=k=>!!K.adopt[k];let det=0;Object.keys(K.b).forEach(i=>{const t=T[i],d=distSeg(t,a,b);if(d>6+f*2)return;const L=K.b[i],prot=L.some(x=>['magasin','grenier','chapelle'].includes(x.k))?.5:1,k=(ad('Kabar avant le cyclone')?.7:1)*prot;
  L.forEach(x=>{if(['habitation','champ','camp','jardin','port','ville'].includes(x.k)&&Math.random()<.2*f*k*(x.k==='jardin'?.4:1)){x.abime=1;det++}})});
 const perte=Math.round(f*3*(ad('Kabar avant le cyclone')?.7:1));K.res.viv=Math.max(0,K.res.viv-perte);
 // les gens dehors au plus fort du vent : des morts, surtout s'il n'y a pas d'abri
 const abris=Object.values(K.b).flat().filter(x=>x.f===K.joueur&&['magasin','grenier','chapelle'].includes(x.k)&&!x.abime).length,morts=f>=3?Math.max(0,Math.round(kBras()*.03/(1+abris))):0;
 if(morts){const fa=K.fac[kMesFacs()[0]];if(fa)fa.pop=Math.max(0,fa.pop-morts)}
 K.apres=f+1;K.cycF=f;kLog((hist?'Cyclone historique — '+nom+' : '+note+'. ':'Cyclone '+['','modéré','fort','très fort'][f]+' (imaginé) : ')+(hist?'Il ':'il ')+(trav?'traverse l’île':'frôle la côte')+'. '+(det?det+' bâtiment'+(det>1?'s':'')+' abîmé'+(det>1?'s':'')+', ':'')+perte+' vivres perdus'+(morts?', '+morts+' morts':'')+'.');
 toast((hist?nom:'Un cyclone')+' sur l’île : '+['','modéré','fort','très fort'][f]+'.');KVUE.cyc=performance.now();kAnimCyc()}
function kCycMois(){const m=K.mo,h=KCYCH.find(c=>c[0]===K.an&&c[1]===m);if(h){kCycFrappe(h[2],h[3],h[4],1);return}
 if(K.apres>0||![11,0,1,2,3].includes(m))return;const p=m>=0&&m<=2?.09:.04;if(K.an>=1904&&KCYCH.some(c=>c[0]===K.an))return;if(Math.random()<p){const r=Math.random(),f=r<.5?1:r<.85?2:3;kCycFrappe(f,'','',0)}}
// chaque mois : la saison pèse, puis l'après-cyclone (vivres gâtés, fièvres, réparations)
function kMois(){kPrep3();K.mo++;if(K.mo>=12){K.mo=0;kAnnee()}if(K.fin){kRendu();return}
 const m=K.mo,ames=kMesFacs().reduce((s,f)=>s+(K.fac[f]?K.fac[f].pop:0),0);
 if([11,0,1,2,3].includes(m))K.res.viv=Math.max(0,K.res.viv-Math.ceil(ames/60));
 if([5,6,7].includes(m)&&K.joueur!=='c')K.res.viv=Math.max(0,K.res.viv-Math.ceil(ames/60));
 kCycMois();
 if(K.apres>0&&!(K.cyc&&KVUE.cyc&&performance.now()-KVUE.cyc<100)){K.apres--;const f=K.cycF||1;K.res.viv=Math.max(0,K.res.viv-f);K.tension+=1;if(Math.random()<.25*f){const fa=K.fac[kMesFacs()[0]];if(fa&&fa.pop>5){fa.pop--;kLog('Après le cyclone, la fièvre emporte quelqu’un.')}}}
 if(K.res.viv<=0){const fa=K.fac[kMesFacs()[0]];if(fa&&fa.pop>3&&Math.random()<.5){fa.pop--;kLog('La faim : une personne meurt.')}}
 kSauve();kHorloge();if(K.vue==='ville'||K.vue==='ile')kPanneau()}
// l'horloge : le mois et la saison dans la barre du haut, et la vitesse
function kHorloge(){const d=$('kons');if(!d||!K)return;kPrep3();const h=d.querySelector('header');if(!h)return;const y=h.querySelector('b');if(y)y.innerHTML=KMOIS[K.mo]+' '+K.an+' <small style="font-weight:400;color:'+([11,0,1,2,3].includes(K.mo)?'#e87b5a':'#9fc4a0')+'">· '+KSAIS(K.mo)+(K.apres>0?' · après le cyclone':'')+'</small>';
 const s=h.querySelectorAll('header > span b');const R=K.res;if(s[0])s[0].textContent=Math.round(R.viv);
 let v=$('kVit');if(!v){v=document.createElement('span');v.id='kVit';v.style.cssText='display:flex;gap:4px;align-items:center';const n=$('kN');if(n)n.insertAdjacentElement('beforebegin',v)}
 v.innerHTML=[[0,'⏸'],[1,'▶'],[2,'▶▶'],[4,'▶▶▶']].map(([k,t])=>'<button class="bt'+(KV.vit===k?'':' sec')+'" data-vit="'+k+'" title="'+(k?'vitesse ×'+k:'pause')+'">'+t+'</button>').join('')+'<span style="width:60px;height:6px;background:#3a3226;border-radius:3px;display:inline-block"><span style="display:block;height:6px;border-radius:3px;background:#e8be5a;width:'+Math.round(K.mt/KV.dur*100)+'%"></span></span>';
 v.querySelectorAll('[data-vit]').forEach(b=>b.onclick=()=>{KV.vit=+b.dataset.vit;kHorloge()})}
{const kr=kRendu;kRendu=function(){kr.apply(this,arguments);if(!K)return;kPrep3();const n=$('kN');if(n){n.textContent='⏭ Mois suivant';n.onclick=()=>{K.mt=0;kMois()}}kHorloge()}}
// le temps passe tout seul pendant qu'on regarde la Construction ; il s'arrête si on la quitte, ou si un menu attend
{let t0=performance.now();setInterval(()=>{const n=performance.now(),dt=Math.min(1000,n-t0);t0=n;const d=$('kons');if(!K||K.fin||!d||d.hidden||document.hidden||!KV.vit||$('mCtx'))return;kPrep3();K.mt+=dt*KV.vit;if(K.mt>=KV.dur){K.mt=0;kMois()}else{const b=$('kVit');if(b){const s=b.querySelector('span>span');if(s)s.style.width=Math.round(K.mt/KV.dur*100)+'%'}}},250)}
