// ===== p89 : Survie marron — pas de champ. On cueille et on chasse là où c'est abondant, en ménageant la place ou en la vidant =====
// Ménager : on prend ce que la place peut donner, elle se renouvelle. Vider : on prend le double tout de suite, et elle s'épuise.
// Le jardin-forêt et la culture ne sont plus proposés aux marrons (ils restent à la colonie).
KBAT.jardin.an=3000;
{const ok=KACT.culture.ok;KACT.culture.ok=t=>K.joueur!=='m'&&ok(t)}
{const ok=KACT.vivres.ok;KACT.vivres.ok=t=>K.joueur!=='m'&&ok(t)}
KACT.cueil={n:'Cueillir',ic:'🧺',r:'viv',k:0,ok:t=>K.joueur==='m'&&(t.forest||(K.foret[t.i]||0)>20)&&!t.bare,d:'Fruits, racines, cœurs de palmiste, miel.'};
KACT.chasse={n:'Chasser',ic:'🏹',r:'viv',k:0,ok:t=>K.joueur==='m'&&(t.forest||/Hauts|Sommets|Mi-pentes/.test(t.pal||''))&&!t.bare,d:'Cabris, cochons marrons, oiseaux.'};
KBRAS.cueil=0;KBRAS.chasse=0;
const AB89=(k,i)=>{K.ab=K.ab||{c:{},g:{}};const M=K.ab[k];if(M[i]==null){const t=T[i];M[i]=Math.round(Math.min(100,(t.forest?70:35)+(K.foret[i]||0)*.3+(k==='g'&&/Hauts|Sommets/.test(t.pal||'')?15:0)))}return M[i]};
const MODE89=i=>(K.mode89||{})[i]||'menager';
// ce que rapportent les gens envoyés sur une place, selon son abondance et la façon de faire
function prod89(i,act,n){const t=T[i],lo=kLoin(t),k=act==='cueil'?'c':'g',ab=AB89(k,i),v=MODE89(i)==='vider'?2:1;return n*(act==='cueil'?.5:.55)*lo*(ab/100)*v}
{const ka=kAnnee;kAnnee=function(){if(!K||K.fin)return ka.apply(this,arguments);let pv=0;const vus=new Set();
 Object.entries(K.trav||{}).forEach(([i,a])=>['cueil','chasse'].forEach(act=>{const n=a[act]||0;if(!n)return;const k=act==='cueil'?'c':'g';vus.add(k+i);pv+=prod89(i,act,n);const ab=AB89(k,i);
  K.ab[k][i]=Math.max(3,Math.min(100,ab-(MODE89(i)==='vider'?n*3:n*.5)+(MODE89(i)==='vider'?0:3)))}));
 // les places qu'on laisse reposer se refont
 ['c','g'].forEach(k=>Object.keys((K.ab||{})[k]||{}).forEach(i=>{if(!vus.has(k+i))K.ab[k][i]=Math.min(100,K.ab[k][i]+8)}));
 const r=ka.apply(this,arguments);K.res.viv=(K.res.viv||0)+Math.round(pv*10)/10;return r}}
{const kb=kBilan;kBilan=function(){const B=kb.apply(this,arguments);try{let pv=0;Object.entries(K.trav||{}).forEach(([i,a])=>['cueil','chasse'].forEach(act=>{if(a[act])pv+=prod89(i,act,a[act])}));B.viv+=pv}catch(e){}return B}}
// dans le panneau de la case : l'abondance, et le choix ménager / vider
{const kt=kTravHtml;kTravHtml=function(t){let h=kt.apply(this,arguments);try{if(K.joueur!=='m'||!(KACT.cueil.ok(t)||KACT.chasse.ok(t)))return h;const c=AB89('c',t.i),g=AB89('g',t.i),m=MODE89(t.i),bar=(v,col)=>'<span style="display:inline-block;width:70px;height:6px;background:#0006;border-radius:3px;vertical-align:middle;overflow:hidden"><i style="display:block;height:100%;width:'+v+'%;background:'+col+'"></i></span>';
 h+='<div style="margin-top:6px;padding-top:6px;border-top:1px dotted #e8be5a66"><b>Abondance de la place</b><br><small>🧺 cueillette '+bar(c,'#7ac06a')+' '+Math.round(c)+' % · 🏹 gibier '+bar(g,'#d07a4a')+' '+Math.round(g)+' %</small><br>'+
  '<button class="bt '+(m==='menager'?'':'sec')+'" data-m89="menager" title="On prend ce que la place peut donner : elle se renouvelle">🌱 Ménager</button> <button class="bt '+(m==='vider'?'':'sec')+'" data-m89="vider" title="On prend le double tout de suite : la place s’épuise vite">🔥 Vider</button></div>'}catch(e){}return h}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-m89]');if(!b||!K)return;const i=KVUE.sel;if(i==null)return;K.mode89=K.mode89||{};K.mode89[i]=b.dataset.m89;try{kPanneau();kRendu()}catch(_){}});
// au départ, le camp envoie déjà quelques personnes cueillir et chasser autour de lui
setInterval(()=>{try{if(!K||K.joueur!=='m'||K.p89)return;K.p89=1;const ci=Object.keys(K.trav||{}).find(i=>(K.trav[i]||{}).bat_camp)||Object.keys(K.b||{}).find(i=>(K.b[i]||[]).some(x=>x.k==='camp'));if(ci==null)return;const t=T[ci],a=K.trav[ci]=K.trav[ci]||{};
 if(KACT.cueil.ok(t)&&!a.cueil)a.cueil=3;if(KACT.chasse.ok(t)&&!a.chasse)a.chasse=2;try{kRendu()}catch(_){}}catch(e){}},1000);
