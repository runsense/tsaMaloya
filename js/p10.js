
// ===== Jeu : l'apparence change avec la vie. Teinte propre à chacun, barbe avec l'âge, saleté du travail, locks des longues sorties =====
// les locks se forment quand les cheveux ne sont plus peignés pendant des semaines : effort, sueur, sorties longues ;
// des cheveux très frisés se nouent bien plus vite que des cheveux lisses
// barbes et locks en géométrie ajoutée : trop grossier à l'essai, coupé en attendant des variantes de modèles
const ASP_POILS=false;
const LK_TEX={af:1,mg:.8,cr:.75,in:.3,eu:.15};
// des tresses laissées des semaines finissent aussi par se coller, quels que soient les cheveux ; la sueur et la saleté accélèrent
function lkTex(p){const x=LK_TEX[p.or]||.5;if(p.tresse==null)p.tresse=(p.id*13)%10<(p.g==='f'?5:2);return p.tresse?Math.max(x,.55):x}
function aspInit(p){if(p.teinte==null)p.teinte=((p.id*37)%17-8)/100;if(p.sale==null)p.sale=0;if(p.locks==null)p.locks=0}
function grandProprio(p){return S.voieC&&((typeof noble==='function'&&noble(p))||(p.or==='eu'&&!p.role))}
// chaque jour : on se salit au travail, on se lave à la rivière ; les locks poussent dehors et à l'effort
function aspJour(){if(!S||modeHist()||!grpOn()||S.fin)return;(S.pp||[]).forEach(p=>{aspInit(p);if(grandProprio(p)){p.sale=0;return}const t=tacheDe(p);
 const dur={pierre:.12,bois:.09,chasse:.08,peche:.06,cueil:.06,paille:.05,eau:.03,cuisine:.04}[t]||.02;p.sale=Math.min(1,p.sale+dur);
 if(t==='laver'){p.sale=0;if(rnd()<.3)dire(p,lgNoble(p)?'Voilà qui est mieux.':'Lo dolo lé fré, lé bon !')}
 const x=lkTex(p),sueur=(typeof pluie==='function'&&!pluie()?1:.7),eff=({pierre:1,bois:.8,chasse:.8,peche:.6,paille:.5}[t]||0);if(adulte(p))p.locks=Math.min(1,p.locks+.004*eff*x*sueur)});
 (S.grp||[]).forEach(g=>grpMembres(g).forEach(p=>{aspInit(p);p.sale=Math.min(1,p.sale+.1);const x=lkTex(p);if(adulte(p))p.locks=Math.min(1,p.locks+.02*x)}))}
{const jt=jourTick;jourTick=function(){jt();aspJour()}}
// se laver : une tâche à part, et ceux qui sont très sales y vont d'eux-mêmes
TACHES.laver=['Se laver','se lave'];if(typeof P3GESTE==='object')P3GESTE['se lave']='eau';
{const td=tacheDe;tacheDe=function(p){if(!p.tache&&!p.role&&p.sale>.8&&!grandProprio(p)&&p.id!==S.garde&&adulte(p)&&((p.id+(S.jourN||0))%4===0))return 'laver';return td(p)}}
// le rendu 3D : teinte, saleté, barbe, locks
function aspMat(o,p){if(!o._mats){o._mats=[];o.g.scene.traverse(x=>{if(x.isMesh)[].concat(x.material).forEach(m=>{if(m&&m.color&&!o._mats.includes(m)){m.userData.c0=m.color.clone();o._mats.push(m)}})})}
 const k=1+p.teinte,s=grandProprio(p)?0:p.sale*.35,br=new THREE.Color(.45,.36,.26);o._mats.forEach(m=>{m.color.copy(m.userData.c0).multiplyScalar(k).lerp(br,s)})}
function aspPoils(o,p){const sc=o.g.scene;let H=null,F=null,E=null;sc.traverse(x=>{if(x.isBone){if(x.name==='Head')H=x;if(x.name==='headfront')F=x;if(x.name==='head_end')E=x}});if(!H)return;
 if(o._poils)o._poils.forEach(m=>m.parent&&m.parent.remove(m));o._poils=[];sc.updateMatrixWorld(true);
 const h=new THREE.Vector3(),f=new THREE.Vector3(),e=new THREE.Vector3();H.getWorldPosition(h);(F||H).getWorldPosition(f);(E||H).getWorldPosition(e);
 const ht=Math.max(.08,e.y-h.y),fw=new THREE.Vector3(f.x-h.x,0,f.z-h.z);if(fw.length()<1e-4)fw.set(0,0,1);fw.normalize();
 const a=ageP(p),gris=a>=55?0xd8d4cc:a>=45?0x8a8580:0x1e1a16,M=new THREE.MeshLambertMaterial({color:gris}),add=(g,pos,rx)=>{const m=new THREE.Mesh(g,M);m.position.copy(sc.worldToLocal(pos.clone()));if(rx)m.rotation.x=rx;m.frustumCulled=false;sc.add(m);sc.updateMatrixWorld(true);H.attach(m);o._poils.push(m);return m};
 // la barbe : les hommes à partir de 28 ans ; chez les colons, seuls les travailleurs et les vieux
 const barbe=p.g!=='f'&&adulte(p)&&a>=28&&(!S.voieC||!grandProprio(p)||a>=55);
 if(barbe){const t=Math.min(1,(a-28)/30),c=h.clone().addScaledVector(fw,ht*.46);c.y=h.y-ht*(.2+t*.12);const m=add(new THREE.SphereGeometry(ht*(.2+t*.1),8,6),c);m.scale.set(1.25,1.0+t*.9,.65)}
 // les locks : visibles quand elles ont pris
 if(p.locks>.35&&!grandProprio(p)){const n=10+Math.round(p.locks*10),L=ht*(.5+p.locks*1.2);for(let i=0;i<n;i++){const an=Math.PI*.35+i/(n-1)*Math.PI*1.3,dir=new THREE.Vector3().copy(fw).applyAxisAngle(new THREE.Vector3(0,1,0),an);
  const c=new THREE.Vector3(h.x,e.y-ht*.28-L/2,h.z).addScaledVector(dir,ht*.56);const m=add(new THREE.CylinderGeometry(ht*.055,ht*.04,L,5),c);m.rotation.z=(Math.cos(an)*.12);m.material=new THREE.MeshLambertMaterial({color:0x2a2018})}}
 o._poilK=(barbe?1:0)+'|'+(p.locks>.35?Math.round(p.locks*5):0)+'|'+(a>=55?2:a>=45?1:0)}
setInterval(()=>{if(!S||typeof P3==='undefined'||!P3.on||modeHist())return;for(const id in P3.M){const m=P3.M[id];if(!m.o)continue;const p=ppId(+id);if(!p)continue;aspInit(p);
 try{aspMat(m.o,p);const a=ageP(p),k=((p.g!=='f'&&adulte(p)&&a>=28&&(!S.voieC||!grandProprio(p)||a>=55))?1:0)+'|'+(p.locks>.35&&!grandProprio(p)?Math.round(p.locks*5):0)+'|'+(a>=55?2:a>=45?1:0);if(ASP_POILS&&m.o._poilK!==k)aspPoils(m.o,p)}catch(e){console.warn('aspect',e.message)}}},1000);
// la fiche dit où en est la personne
{const cl=cvListe;cvListe=function(){cl();if(!capOn()||!CV.on||CV.selP==null)return;const p=ppId(CV.selP);if(!p)return;aspInit(p);const f=$('cvL')&&$('cvL').querySelector('.pc[data-pid="'+p.id+'"]');if(!f)return;const s=document.createElement('small');
 s.innerHTML='<br>'+(grandProprio(p)?'Toujours propre':p.sale>.7?'Très sale':p.sale>.35?'Sali par le travail':'Propre')+(p.locks>.35?' · porte des locks':p.locks>.15?' · cheveux qui se nouent':'');f.appendChild(s)}}
