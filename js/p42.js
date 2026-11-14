// ===== p42 : la vie de l'habitation coloniale — le samedi libre, le commandeur, l'affranchissement =====
// Trois pratiques attestées à Bourbon. Ni la vente des personnes ni les châtiments ne sont des actions du jeu : le journal les raconte, sans plus.
{const jt=jourTick;jourTick=function(){const v0=S&&S.vivres;jt.apply(this,arguments);if(!S||modeHist()||S.fin||!S.voieC)return;const E=(S.pp||[]).filter(p=>adulte(p)&&!enGrp(p)&&typeof p23Esc==='function'&&p23Esc(p));
 // le samedi : chacun cultive son jardin ; un peu de vivres en plus, et moins d'envie de fuir
 if(S.samedi&&(S.jourN||0)%7===6&&E.length){S.vivres+=E.length*.3;if(rnd()<.4)journal('C’est samedi : chacun travaille son jardin, derrière les cases.')}
 // le commandeur : les champs rendent plus, mais la colère monte
 const cm=S.commandeur!=null&&ppId(S.commandeur);if(cm&&!S.pp.includes(cm))S.commandeur=null;if(cm){const ch=E.filter(p=>tacheDe(p)==='champ').length;S.vivres+=ch*.08;if(rnd()<.03){fx({coh:-1});journal(cm.n.split(' ')[0]+', le commandeur, presse les autres aux champs.')}}}}
// la fuite tient compte du samedi et du commandeur
{const jt=jourTick;jourTick=function(){if(!S||!S.voieC||modeHist())return jt.apply(this,arguments);const r0=rnd;const f=(S.samedi?.6:1)*(S.commandeur!=null?1.25:1);if(f===1)return jt.apply(this,arguments);
 // on corrige la chance de fuite seulement pendant le tirage des fuites (p23), par un léger biais du hasard
 window.__fuiteF=f;try{return jt.apply(this,arguments)}finally{window.__fuiteF=1}}}
function affranchir(p){p.st='libre';if(S.commandeur===p.id)S.commandeur=null;fx({coh:3,ami:-2});log(p.n+' est affranchi'+(p.g==='f'?'e':'')+' : '+(p.g==='f'?'elle':'il')+' reste à l’habitation, libre. Les autres maîtres le reprochent.');sauve();cvListe()}
{const cl=cvListe;cvListe=function(){cl.apply(this,arguments);const d=$('cvL');if(!d||!CV.on||!S.voieC||S.year>=abolY())return;const E=(S.pp||[]).filter(p=>campDe(p)===CV.camp&&adulte(p)&&p.st==='esclave'),cm=S.commandeur!=null&&ppId(S.commandeur);if(!E.length)return;
 const box=document.createElement('div');box.className='pc';box.innerHTML='<b>La vie de l’habitation</b><br>'+
  '<button class="bt'+(S.samedi?'':' sec')+'" id="hSam">'+(S.samedi?'✓ ':'')+'Le samedi libre</button> <small>chacun cultive son jardin : vivres, et moins de fuites</small><br>'+
  '<small>Commandeur : <b>'+(cm?cm.n.split(' ')[0]:'personne')+'</b></small> <select id="hCom"><option value="">— nommer —</option>'+E.map(p=>'<option value="'+p.id+'"'+(cm&&cm.id===p.id?' selected':'')+'>'+p.n.split(' ')[0]+'</option>').join('')+'</select> <small>les champs rendent plus, la colère monte</small><br>'+
  '<select id="hAff"><option value="">— affranchir —</option>'+E.map(p=>'<option value="'+p.id+'">'+p.n.split(' ')[0]+' · '+ageP(p)+' ans</option>').join('')+'</select> <small>libre, il reste ; l’entente monte, les autres maîtres grondent</small>';d.appendChild(box);
 box.querySelector('#hSam').onclick=()=>{S.samedi=S.samedi?0:1;log(S.samedi?'Le maître accorde le samedi : chacun cultive son jardin.':'Le samedi est repris : tout le monde aux champs.');sauve();cvListe()};
 box.querySelector('#hCom').onchange=e=>{S.commandeur=e.target.value?+e.target.value:null;const p=S.commandeur!=null&&ppId(S.commandeur);if(p)log(p.n+' devient commandeur : '+(p.g==='f'?'elle':'il')+' mène les autres aux champs.');sauve();cvListe()};
 box.querySelector('#hAff').onchange=e=>{const p=ppId(+e.target.value);if(!p)return;alerteConf('Affranchir '+p.n.split(' ')[0]+' ?',p.n+' deviendra libre. Les autres maîtres de l’île le reprocheront à l’habitation.',()=>affranchir(p));e.target.value=''}}}
