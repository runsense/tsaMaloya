// ===== p407 : chez les colons, les lettres de décès ne tombent plus en avalanche. Au début, quand l'habitation est petite, chaque mort
// a sa lettre. Ensuite, seuls les plus importants (le chef, le mystique, les notables, le commandeur, ceux que l'histoire a nommés)
// en ont une ; les autres sont comptés, et une fois par an le registre de l'habitation donne le nombre — leurs noms restent dans
// la Mémoire. Les morts des esclaves ne sont pas effacées : elles sont dites comme les registres les notaient, en nombre. =====
const MORT407={imp:new Set(),n:0,y:null,s:null,montres:0};
function imp407(p){return !!p&&(['chef','mys','not'].includes(p.role)||p.chef||p.hero||p.nomme||/commandeur|gouverneur|maître|maîtresse/i.test((p.n||'')+' '+(p.t||'')))}
function actif407(){return typeof S!=='undefined'&&S&&S.voieC}
function debut407(){return MORT407.montres<8||((S.pp||[]).length<=10)}
function cle407(txt){for(const n of MORT407.imp)if(txt.includes(n.split(' ')[0]))return true;return false}
['mourirP','abriMort'].forEach(f=>{try{const o=window[f];if(typeof o!=='function')return;const w=function(p){try{if(actif407()&&imp407(p)&&p.n)MORT407.imp.add(p.n)}catch(e){}return o.apply(this,arguments)};window[f]=w;eval(f+'=w')}catch(e){}});
{const l0=lettreDeces;lettreDeces=function(titre,txt,dem){try{if(actif407()){if(MORT407.s!==S){MORT407.s=S;MORT407.n=0;MORT407.montres=0;MORT407.y=S.year}
  const t=(titre||'')+' '+(txt||'');if(!(dem||debut407()||cle407(t)||/registre|décès ·|un décès/i.test(titre||''))){MORT407.n++;return}MORT407.montres++}}catch(e){}return l0.apply(this,arguments)}}
{const d0=deuilLettre;deuilLettre=function(titre,L,rep){try{if(actif407()&&Array.isArray(L)){const k=L.filter(l=>debut407()||cle407(String(l)));MORT407.n+=L.length-k.length;if(!k.length)return;MORT407.montres+=k.length;return d0.call(this,titre,k,rep)}}catch(e){}return d0.apply(this,arguments)}}
setInterval(()=>{try{if(!actif407()||S.fin)return;if(MORT407.s!==S){MORT407.s=S;MORT407.n=0;MORT407.y=S.year;return}if(S.year!==MORT407.y){const y=MORT407.y,n=MORT407.n;MORT407.y=S.year;MORT407.n=0;
 if(n>0)lettreDeces('Registre de l’habitation · '+y,n+(n>1?' morts':' mort')+' cette année sur l’habitation. Le registre ne garde souvent qu’un prénom et un âge ; leurs noms sont dans la Mémoire.',false)}}catch(e){}},1500);
