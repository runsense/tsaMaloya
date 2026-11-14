const autourDe=t=>lieuDe(t)?'autour de '+lieuDe(t):(lieuProche(t)||'ici');
// ===== p30 : le bois d'un lieu s'épuise, repousse, se replante — en bois indigène, lent, ou en arbres venus d'ailleurs, rapides =====
// On trouve toujours un peu de bois (branches mortes, bois flotté) pour le feu et les cases ; une vraie coupe, elle, vide le lieu.
{const ac=actions;actions=function(t){let A=ac(t);try{const o=S.t[t.i]||{},f=foretIci(t);if(o.s&&!t.bare&&f<60&&!o.rep&&!o.plant){A=A.concat([{id:'replanter',n:'Replanter en bois indigène',c:1,d:'Lent : la forêt revient en quelques années, avec son gibier et ses plantes. Il reste ici '+Math.round(f)+' % de forêt.'}]);
  if(S.year>=1770)A=A.concat([{id:'planter',n:'Planter des arbres venus d’ailleurs',c:1,d:'Filao, bois noir : du bois en quelques saisons. Mais la forêt indigène ne revient pas : moins de gibier, moins de cueillette.'}])}
  const r=A.find(a=>a.id==='recolte');if(r){const g=recolteV(t);r.d='Donne ici '+coutTx(g).replace(', 0 pierre','')+'.'+(f<25?' Le bois se fait rare : branches mortes et bois flotté seulement.':f<60?' La forêt s’éclaircit ('+Math.round(f)+' %).':'')}}catch(e){}return A}}
{const ag=agir;agir=function(t,id,l){const r=ag.apply(this,arguments);try{if(r&&S&&t){const o=S.t[t.i]=S.t[t.i]||{};
  if(id==='recolte'){const f0=foretIci(t);o.fo=Math.max(5,f0-12);if(f0>=25&&o.fo<25)log('Il ne reste presque plus d’arbres '+autourDe(t)+' : il faudra replanter, ou aller couper plus loin.')}
  if(id==='replanter'){o.rep=1;log('On replante des bois de couleurs et des tamarins '+autourDe(t)+'. Il faudra des années.')}
  if(id==='planter'){o.plant=1;o.intro=1;log('On plante des filaos et des bois noirs '+autourDe(t)+' : ils pousseront vite, mais la forêt d’avant ne reviendra pas.')}}}catch(e){}return r}}
// chaque saison, la forêt repousse : vite si l'on a planté d'ailleurs, moins vite en indigène, à peine d'elle-même
{const sa=saison;saison=function(){const r=sa.apply(this,arguments);try{if(S&&S.t)T.forEach(t=>{const o=S.t[t.i];if(!o||o.fo==null||o.fo>=100)return;o.fo=Math.min(100,o.fo+(o.plant?9:o.rep?4:1.5));if(o.fo>=70&&o.rep&&!o.plant){o.rep=0;log('La forêt indigène a repris '+autourDe(t)+'.')}})}catch(e){}return r}}
// une forêt d'arbres venus d'ailleurs nourrit moins : la chasse et la cueillette y rendent moins
{const ag=agir;agir=function(t,id,l){const v0=S&&S.vivres;const r=ag.apply(this,arguments);try{if(r&&S&&t&&(S.t[t.i]||{}).intro&&['chasse','cueil'].includes(id)&&S.vivres>v0)S.vivres-=(S.vivres-v0)*.4}catch(e){}return r}}
