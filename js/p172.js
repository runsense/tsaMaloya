
// ===== p172 : les rameurs — la chaloupe de 1663 arrive avec ses rameurs ; sur la côte, les pêcheurs sortent en pirogue =====
const RAM172={mx:[],t:performance.now()};
function rameur172(n,h){return new Promise((ok,ko)=>{if(typeof p3Charge!=='function')return ko();const att=()=>{if(P3.buf&&P3.buf[n])p3Instance(n).then(I=>{const g=new THREE.Group(),s=I.g.scene;s.scale.setScalar(h/1.75);g.add(s);const cl=I.g.animations.find(a=>a.name==='ramer');if(cl){const a=I.mx.clipAction(cl);a.time=Math.random()*cl.duration;a.play()}RAM172.mx.push(I.mx);g.userData.mx=I.mx;ok(g)}).catch(ko);else if(P3.ok&&P3.ok[n]===0)ko();else setTimeout(att,300)};try{p3Charge(n)}catch(e){}att()})}
function ramTick172(){const now=performance.now(),dt=Math.min(.1,(now-RAM172.t)/1000);RAM172.t=now;RAM172.mx=RAM172.mx.filter(m=>{const r=m.getRoot&&m.getRoot();let o=r;while(o&&o.parent)o=o.parent;if(o!==scene)return false;m.update(dt);return true});requestAnimationFrame(ramTick172)}
requestAnimationFrame(ramTick172);
// la chaloupe du film : deux Français et des Malgaches qui rament vers le rivage
{const nv=g168Navire;g168Navire=function(type){const g=nv.apply(this,arguments);try{if(type==='chaloupe'){g.scale.setScalar(2.6);[['homme_chemise',-.06,.025],['jeune_pagne',-.02,-.025],['jeune_pagne',.02,.025],['femme_travail',.06,-.025]].forEach(([n,x,z])=>rameur172(n,.07).then(r=>{r.position.set(x,.062,z);r.rotation.y=Math.PI/2;g.add(r)}).catch(()=>{}))}}catch(e){}return g}}
// les pirogues des pêcheurs : sur une case de pêche au bord de la mer, une pirogue tourne au large le jour
const PIR172={L:{}};
setInterval(()=>{try{if(typeof scene==='undefined'||!S||S.fin)return;const nuit=typeof jourPh==='function'&&(jourPh()>.74||jourPh()<.05),voir=dist<16&&!(typeof VP!=='undefined'&&VP)&&!(typeof CINE!=='undefined'&&CINE);const vus={};
 if(voir&&!nuit)T.forEach(t=>{const o=S.t[t.i];if(!o||o.b!=='peche'||!o.s&&!seen(t))return;const m=typeof mer173==='function'?mer173(t):null;if(!m)return;const dx=Math.hypot(t.x-camT.x,t.z-camT.z);if(dx>dist*1.3+4)return;vus[t.i]=m});
 for(const k in PIR172.L)if(!vus[k]){scene.remove(PIR172.L[k]);delete PIR172.L[k]}
 const now=performance.now()/1000;
 for(const k in vus){const t=T[k],m=vus[k];let p=PIR172.L[k];if(!p){p=new THREE.Group();const c=g168Navire('pirogue');c.scale.setScalar(1.4);p.add(c);const n=S.voieC?'homme_chemise':'jeune_pagne';rameur172(n,.1).then(r=>{r.position.set(0,.04,0);r.rotation.y=Math.PI/2;c.add(r)}).catch(()=>{});scene.add(p);PIR172.L[k]=p}
  const cx=t.x+(m.x-t.x)*.75,cz=t.z+(m.z-t.z)*.75,a=now*.05+(+k),x=cx+Math.cos(a)*.35,z=cz+Math.sin(a)*.25;p.position.set(x,.01+Math.sin(now*1.3+(+k))*.005,z);p.rotation.y=-a}}catch(e){}},120);
// ===== le créole suit le lieu (relecture de Paris) : « lo » et « lu » au Sud, « le » et « li » ailleurs ; quelques mots changent entre les Bas et les Hauts, le Nord et le Sud =====
// « lo van » reste partout tel quel : devant « van », on dit toujours « lo ».
// {N:…|S:…} : Nord / Sud ; {B:…|H:…} : Bas / Hauts
function kz172(p,txt){try{if(typeof txt!=='string')return txt;const t=p&&typeof campDe==='function'?T[campDe(p)]:null,z=typeof zone162==='function'?zone162(t):'bas',sud=z==='sud',haut=t&&(t.alt||0)>600;
 txt=txt.replace(/\{([NB]):([^|}]*)\|([SH]):([^}]*)\}/g,(m,a,x,b,y)=>a==='N'?(sud?y:x):(haut?y:x));
 if(sud)txt=txt.replace(/(^|[\s«(])([Ll])e(?=\s)/g,(m,s,l)=>s+(l==='L'?'Lo':'lo')).replace(/(^|[\s«(])([Ll])i(?=\s)/g,(m,s,l)=>s+(l==='L'?'Lu':'lu'));
 else txt=txt.replace(/(?<!\b[Dd]e)(^|[\s«(])([Ll])o(?=\s)(?!\s+van\b)/g,(m,s,l)=>s+(l==='L'?'Le':'le')).replace(/(^|[\s«(])([Ll])u(?=\s)/g,(m,s,l)=>s+(l==='L'?'Li':'li'));
 return txt}catch(e){return txt}}
const kr172=p=>!(typeof lgNoble==='function'&&lgNoble(p))&&!(typeof lgMys==='function'&&lgMys(p)&&false);
{const di=dire;dire=function(p,m){return di(p,kr172(p)?kz172(p,m):m)}}
if(typeof humPick==='function'){const hp=humPick;humPick=function(p){const r=hp.apply(this,arguments);return kr172(p)?kz172(p,r):r}}
if(typeof phrasesPour==='function'){const pp=phrasesPour;phrasesPour=function(p){const L=pp.apply(this,arguments);try{if(kr172(p))L.forEach(x=>x.t=kz172(p,x.t))}catch(e){}return L}}
if(typeof cvDit==='function'){const cd=cvDit;cvDit=function(p){const r=cd.apply(this,arguments);if(typeof r!=='string'||!kr172(p))return r;return r.replace(/«([^»]*)»/g,(m,x)=>'«'+kz172(p,x)+'»')}}
