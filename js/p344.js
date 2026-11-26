// ===== p344 : un colon ou un marin incarné n'a pas les talents ni les pouvoirs des marrons.
// Colons (gouverneur, habitants, miliciens) : consulter la carte, se faire porter, prier.
// Marins, corsaires, Misson : pêcher, faire le point, un coup de rhum. Les boutons d'incarnation prennent le style unifié. =====
function camp344(I){if(!I||!I.C||!I.C.heros)return null;const h=I.C.heros,m=h.m||'',n=h.n||'';
 if(/gouverneur|p7_colon|colone|milicien/.test(m))return 'colon344';if(/Misson|corsaire|marin/i.test(n))return 'marin344';return null}
TAL300.colon344=[['carte','Consulter la carte'],['porter','Faire porter ses malles'],['prier','Prier un moment']];
TAL300.marin344=[['peche','Pêcher les camarons'],['point','Faire le point'],['rhum','Un coup de rhum']];
{const o=cle302;cle302=function(I){return camp344(I)||o.apply(this,arguments)}}
{const o=talent300;talent300=function(i){const I=INC,c=camp344(I);if(!c||!I||!I.st||I.pause||I.duel)return o.apply(this,arguments);
 const t=TAL300[c][i];if(!t)return;const now=performance.now();I.cd344=I.cd344||{};const cd=(k,s)=>{if(I.cd344[k]&&now<I.cd344[k]){incMsg287('Pas encore ('+Math.ceil((I.cd344[k]-now)/1000)+' s).');return true}I.cd344[k]=now+s*1000;return false};
 const E=d=>{I.endu=Math.max(0,Math.min(100,(I.endu==null?100:I.endu)+d))};const ob=(I.C.obj||'').replace(/\s*·.*$/,'');
 switch(t[0]){
  case 'carte':I.zoom342=1;try{incCarteMaj287()}catch(e){}incMsg287(ob?'Vous dépliez la carte : '+ob+'.':'Vous dépliez la carte de l’île.');break;
  case 'porter':if(cd('porter',45))return;E(35);incMsg287(/colone/.test(I.C.heros.m)?'Une servante porte votre panier et votre ombrelle : vous marchez plus légère.':'Un esclave porte vos malles derrière vous : vous marchez plus léger. Ainsi voyageaient les maîtres de Bourbon.');break;
  case 'prier':if(cd('prier',60))return;E(15);incMsg287('Vous vous signez et priez un moment. Le souffle revient.');break;
  case 'point':incMsg287('Vous prenez le soleil et la boussole. '+(ob?'Cap : '+ob+'.':'Le cap est bon.'));I.zoom342=1;try{incCarteMaj287()}catch(e){}break;
  case 'rhum':if(cd('rhum',60))return;E(20);I.st.soif=Math.max(0,I.st.soif-6);try{hud290()}catch(e){}incMsg287('Un coup de rhum : du courage, mais le rhum donne soif, il ne désaltère pas.');break;
  default:return o.apply(this,arguments)}try{hud290()}catch(e){}}}
{const o=mystique300;mystique300=function(i){const c=camp344(INC);if(c){incMsg287('Les pouvoirs des razana, les ancêtres malgaches, appartiennent aux marrons des Hauts — pas à vous.');return}return o.apply(this,arguments)}}
{const o=incOuvrir287;incOuvrir287=function(){const r=o.apply(this,arguments);try{const I=INC,d=$('incB300');if(I&&d){if(camp344(I)){d.querySelectorAll('[data-b^="m"]').forEach(b=>b.remove());I.el.querySelectorAll('div,span,small').forEach(e=>{if(e.children.length===0&&/Alt\+1\/2\/3 : mystique/.test(e.textContent))e.textContent=e.textContent.replace(/\s*·\s*Alt\+1\/2\/3 : mystique/,'')})}
 d.querySelectorAll('button').forEach(b=>{const t=b.dataset.b||'';b.style.cssText='font:600 12px Montserrat,system-ui;padding:5px 9px;border-radius:7px;cursor:pointer;color:#efe9da;background:rgba(24,34,30,.9);border:1px solid rgba(232,190,90,.3);border-left:3px solid '+(t[0]==='t'?'#e2bd74':t[0]==='m'?'#9a7ad0':'#6a9a7a')})}}catch(e){}return r}}
