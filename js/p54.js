// ===== p54 : l'harmonie entre les cultures de l'île — les unions ne se commandent pas, mais on peut rapprocher les gens ; sans cela, la discorde =====
// Dans l'histoire réelle, Malgaches, Africains, Indiens, Européens et créoles se sont mêlés sans que personne ne l'ordonne :
// par les fêtes, le parrainage des enfants, la cuisine et les langues partagées (le créole naît ainsi). Le jeu ne force aucune union :
// il donne des gestes qui rapprochent, et l'harmonie qui en sort rend plus probables les unions entre cultures.
function harmInit(){if(S&&S.harm==null)S.harm=50}
function cultures(ci){const L=(S.pp||[]).filter(p=>adulte(p)&&(ci==null||campDe(p)===ci));const n={};L.forEach(p=>n[p.or]=(n[p.or]||0)+1);return n}
// une union laissée au hasard : plus l'harmonie est haute, plus elle se fait entre deux cultures
{const un=unir;unir=function(a,b,choisi){try{harmInit();if(!choisi&&S.pp){const L=S.pp.filter(p=>p!==a&&p!==b&&p.g===b.g&&libreU(p)&&p.fa!==a.fa);const veutMix=Math.random()<S.harm/100;
  const ok=L.filter(p=>veutMix?p.or!==a.or:p.or===a.or);if((veutMix?b.or===a.or:b.or!==a.or)&&ok.length)b=ok[Math.floor(Math.random()*ok.length)]}}catch(e){}
 const r=un.call(this,a,b,choisi);try{if(a.or!==b.or)S.harm=Math.min(100,S.harm+2)}catch(e){}return r}}
// chaque saison : l'harmonie agit, et s'use un peu si personne n'entretient les liens
{const ps=window.ppSaison;if(typeof ps==='function'){ppSaison=function(){const r=ps.apply(this,arguments);try{harmInit();const C=Object.keys(cultures()).length;if(C<2)return r;S.harm=Math.max(0,S.harm-.8);
 if(S.harm>=65){fx({coh:1});if(Math.random()<.08){S.savoir=(S.savoir||0)+1;log('À force de vivre ensemble, chacun apprend des autres : un remède, un mot, une façon de planter. Savoir +1.')}}
 else if(S.harm<35){fx({coh:-1.5});if(Math.random()<.18)log(['Au partage des vivres, chaque groupe défend les siens : on se dispute près du feu.','On ne mange plus ensemble : chacun reste avec ceux qui parlent sa langue.','Une querelle éclate entre familles venues de pays différents. La nuit est tendue.'][Math.floor(Math.random()*3)])}}catch(e){}return r}}}
// les gestes qui rapprochent
const HARM_G=[
 {k:'fete',n:'Une fête pour tous',d:'Chacun apporte sa musique et son plat. Vivres −4.',c:()=>S.vivres>=4,f:()=>{fx({vivres:-4});S.harm=Math.min(100,S.harm+8)},l:()=>S.voieC?'Fête au quartier : violons des colons, tambours des esclaves, chacun danse à sa façon, et tout le monde mange.':'Fête au camp : le maloya, les chants malgaches et les danses de la côte d’Afrique se mêlent autour du feu.'},
 {k:'parrain',n:'Choisir un parrain d’une autre culture',d:'Un enfant reçoit un parrain ou une marraine d’ailleurs.',c:()=>(S.pp||[]).some(p=>!adulte(p)),f:()=>{S.harm=Math.min(100,S.harm+5)},l:()=>'Un enfant reçoit un parrain venu d’un autre pays. Les deux familles sont liées désormais.'},
 {k:'langue',n:'Parler la langue commune',d:'Le créole qui naît sert à tous ; un peu moins de savoir des anciens.',c:()=>true,f:()=>{S.harm=Math.min(100,S.harm+6);S.myst=Math.max(0,(S.myst||0)-1)},l:()=>'On se parle en créole, la langue que tous comprennent. Les anciens regrettent un peu leurs mots.'}];
function harmGeste(k){const g=HARM_G.find(x=>x.k===k);harmInit();S.harmG=S.harmG||{};if(S.harmG[k]===S.year){toast('Déjà fait cette année.');return}if(!g.c()){toast('Pas possible pour l’instant.');return}g.f();S.harmG[k]=S.year;log(g.l());sauve();cvListe()}
// dans le panneau du camp : la jauge et les gestes, à côté des besoins
{const cl=cvListe;cvListe=function(){cl.apply(this,arguments);try{if(!CV.on||CV.camp==null)return;const K=$('cvCamp');if(!K)return;K.querySelectorAll('.harmC').forEach(e=>e.remove());harmInit();
 const C=cultures(CV.camp),nC=Object.keys(C).length,h=Math.round(S.harm),box=document.createElement('div');box.className='pc harmC';
 box.innerHTML='<b>Entre les cultures</b><br><small>'+Object.entries(C).map(([o,n])=>n+' '+(ORIG[o]||o)).join(' · ')+'</small>'+
  (nC<2?'<br><small>Une seule origine au camp pour l’instant.</small>':'<div style="display:flex;align-items:center;gap:6px;margin:4px 0"><small style="width:62px">Harmonie</small>'+jauge(h)+'<small>'+(h>=65?'on vit ensemble':h<35?'discorde':'chacun chez soi')+'</small></div>'+
  HARM_G.map(g=>'<button class="bt sec" data-hg="'+g.k+'" title="'+g.d+'"'+((S.harmG||{})[g.k]===S.year?' disabled':'')+'>'+g.n+'</button>').join(''));
 const B=K.querySelector('.chefC')||K.querySelector('.dortC')||K.querySelector('.besC');if(B)B.after(box);else K.appendChild(box);box.querySelectorAll('[data-hg]').forEach(b=>b.onclick=()=>harmGeste(b.dataset.hg))}catch(e){}}}
