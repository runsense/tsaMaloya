
// ===== p113 : les îles voisines accompagnent l'histoire de l'île — Maurice l'île sœur, les Seychelles, les Comores, Madagascar =====
// Archives (dates vérifiables) et mythes du jeu qui les transforment, toujours autour de La Réunion.
Object.assign(EV,{
 mau1735:{y:1735,si:()=>S,tag:'Archive',an:'1735',t:'Port-Louis, l’île sœur',
  get b(){return 'La Bourdonnais fait de l’île de France le cœur des Mascareignes : un port, des chantiers, des routes, un hôpital, les premières sucreries. Bourbon devient son grenier : le blé, le riz et le café partent vers Port-Louis.'+(S.voieC?'':' Là-bas aussi, des captifs fuient vers le Morne.')},
  v:'Deux îles sœurs, l’une port, l’autre grenier.',h:'Archive : Mahé de La Bourdonnais gouverne les deux îles à partir de 1735 depuis Port-Louis.',
  get o(){return S.voieC?[{n:'Vendre le grain à Port-Louis',d:'Vivres −4, colonie +5.',fx:{vivres:-4,ami:5},hist:1},{n:'Garder le grain pour Bourbon',d:'Cohésion +2, colonie −3.',fx:{coh:2,ami:-3}}]:[{n:'Envoyer des nouvelles aux marrons du Morne',d:'Mystique +2.',fx:{myst:2},f:()=>{BR88().morne=1},hist:1}]}},
 sey1770:{y:1770,si:()=>S,tag:'Archive',an:'1756-1770',t:'Les Seychelles',
  b:'La France prend possession d’un archipel sans habitants, au nord de Madagascar. En 1770, les premiers colons y débarquent, venus de l’île de France et de Bourbon, avec quelques esclaves. On y cherche le bois, les tortues et les épices.',
  v:'Les îles du nord se peuplent depuis les Mascareignes.',h:'Archive : possession française en 1756 ; premiers colons en 1770 ; britanniques en 1814 ; indépendantes en 1976.',
  get o(){return S.voieC?[{n:'Envoyer un fils aux Seychelles',d:'Personnes −1, colonie +3, épices plus tard.',fx:{gens:-1,ami:3},f:()=>{(S.out=S.out||{}).seych=1},hist:1},{n:'Rester',d:'Rien ne change.',fx:{}}]:[{n:'Écouter le récit du trésor',d:'On dit que La Buse a caché son trésor entre ces îles et Saint-Paul.',fx:{},f:()=>{BR88().buse=1},hist:1}]}},
 mau1810:{y:1810,si:()=>S,tag:'Archive',an:'août-décembre 1810',t:'Grand Port, puis la capitulation',
  b:'À Grand Port, la marine française bat la flotte anglaise : la seule victoire navale de Napoléon. Mais en décembre, soixante-dix navires débarquent au nord de l’île de France. Le gouverneur Decaen capitule. Bourbon est déjà tombée en juillet.',
  v:'Les deux îles sœurs passent aux Anglais la même année.',h:'Archive : bataille de Grand Port (20-27 août 1810), capitulation de Decaen (3 décembre 1810).',
  o:[{n:'Attendre la paix',d:'Rien ne change.',fx:{},hist:1}]},
 mau1814:{y:1815,si:()=>S,tag:'Archive',an:'1814-1815',t:'Les sœurs séparées',
  get b(){return 'Au traité de Paris, l’Angleterre garde l’île de France, qui redevient Maurice, et les Seychelles. Bourbon est rendue à la France. Les familles, les marchands et les esclaves qui allaient d’une île à l’autre se retrouvent sous deux drapeaux.'+(S.voieC?'':' Pour les marrons, une île de plus où la loi change.')},
  v:'Maurice et La Réunion prennent deux chemins.',h:'Archive : traité de Paris de 1814 ; rétrocession effective de Bourbon en 1815.',
  get o(){const L=[{n:'Garder les liens de famille',d:'Cohésion +2.',fx:{coh:2},hist:1}];if(BR88().morne||(S.myst||0)>=15)L.push({n:'Le mythe des deux feux',d:'Mythe du jeu : on raconte que le feu de Maurice s’est éteint pour passer sous la mer jusqu’au Piton de la Fournaise. Les deux îles restent sœurs par le feu. Mystique +3.',fx:{myst:3},f:()=>{BR88().deuxFeux=1}});return L}},
 mau1968:{y:1968,si:()=>S,tag:'Archive',an:'12 mars 1968',t:'Maurice indépendante',
  get b(){return 'Seewoosagur Ramgoolam conduit Maurice à l’indépendance. Les descendants des engagés indiens y sont majoritaires. L’île sœur choisit la république en 1992'+(S.voieC?' ; La Réunion, elle, reste un département.':'.')+(BR88().deuxFeux?' Dans les Hauts, les anciens disent que le feu d’en dessous a parlé.':'')},
  v:'Deux îles, deux statuts.',h:'Archive : indépendance le 12 mars 1968 ; République le 12 mars 1992. Une partie de la population vote alors contre l’indépendance.',
  get o(){const L=[{n:'Suivre la nouvelle à la radio',d:'Rien ne change.',fx:{},hist:1}];if(BR88().deuxFeux||BR88().fedNyassa)L.push({n:'Mythe : une seule île en deux',d:'Uchronie du jeu : les deux sœurs se jurent l’entraide ; on parle d’une union des Mascareignes, capitale Saint-Denis. Cohésion +4, mystique +3.',fx:{coh:4,myst:3},f:()=>{BR88().mascU=1}});return L}},
 sey1976:{y:1976,si:()=>S,tag:'Archive',an:'29 juin 1976',t:'Les Seychelles indépendantes',
  get b(){return 'L’archipel peuplé depuis les Mascareignes devient indépendant. On y parle un créole très proche de celui de La Réunion et de Maurice.'+(BR88().buse?' Des chercheurs creusent encore à Mahé, et d’autres à Saint-Paul, avec la même énigme de La Buse.':'')},
  v:'Une langue créole partagée de l’océan.',h:'Archive : indépendance le 29 juin 1976. Le cryptogramme attribué à La Buse, pendu à Saint-Paul en 1730, est une légende populaire.',
  o:[{n:'Écouter la radio de Victoria',d:'Savoir +1.',fx:{},f:()=>{S.sav=(S.sav||0)+1},hist:1}]},
 mythBuse:{y:1980,si:()=>S&&BR88().buse,tag:'Mythe',an:'récit de Saint-Paul',nat:'Mythe du jeu à partir d’une légende populaire.',t:'Le trésor entre deux îles',
  get b(){return 'On raconte que la carte de La Buse n’indique pas un lieu mais un chemin : de Mahé aux Comores, de Madagascar à Saint-Paul, et qu’elle s’arrête au pied du Piton. '+(S.pigR111?'Les marrons disent que le pigeon rose connaît le dernier passage.':'Personne n’a jamais fini la route.')},
  v:'Toutes les îles mènent ici.',o:[{n:'Suivre la carte',d:'Mystique +3, vivres −3.',fx:{myst:3,vivres:-3},f:()=>{BR88().buseCh=1},hist:1}]},
 mythMasc:{y:1995,si:()=>S&&(BR88().mascU||BR88().fedNyassa)&&BR88().deuxFeux,tag:'Mythe',an:'aujourd’hui',nat:'Uchronie créée pour le jeu.',t:'Les îles autour du Piton',
  b:'Uchronie, imaginée pour le jeu : Maurice, les Seychelles, les Comores et la Grande Île envoient leurs délégués à Saint-Denis. Chacun apporte un récit : le Morne, le coco de mer, la reine en exil, le chant du lac. On les raconte ensemble, au pied du volcan qui ne s’éteint pas.',
  v:'La Réunion au centre des mythes de l’océan.',o:[{n:'Ouvrir la maison des îles',d:'Mystique +5, cohésion +5.',fx:{myst:5,coh:5}}]}
});
// ===== Un petit jeu proposé par le conte (tunnel de lave, bataille…) arrête le conte : rien ne s'ouvre par-dessus, l'histoire attend la fin du jeu =====
const PJ113={on:0,a:0,vide:0};
function pjEcran113(){if($('pjIntro')||$('galeries')||$('pjApo'))return true;const W=innerWidth,H=innerHeight;for(const e of document.body.children){if(!e.offsetParent&&getComputedStyle(e).position!=='fixed')continue;if(['modal','lettreD','ecran','pjIntro'].includes(e.id)||e.hidden)continue;const s=getComputedStyle(e);if(s.position!=='fixed'||s.display==='none'||s.visibility==='hidden'||(parseInt(s.zIndex)||0)<900)continue;const r=e.getBoundingClientRect();if(r.width>W*.6&&r.height>H*.6)return true}return false}
{const ij=introJeu;introJeu=function(o,go){try{if(S&&!PJ113.on){PJ113.on=1;PJ113.vide=0;PJ113.a=modeHist()?S.autoD:0;if(modeHist()){S.autoD=0;try{autoBtn()}catch(e){}}const m=$('modal');if(m)m.hidden=true}}catch(e){}
 return ij.call(this,o,(ok,...r)=>{try{if(!ok)pjFin113()}catch(e){}return go(ok,...r)})}}
function pjFin113(){if(!PJ113.on)return;PJ113.on=0;window.BTUON=0;try{if(S&&modeHist()&&PJ113.a&&!S.autoD){S.autoD=PJ113.a;autoBtn()}}catch(e){}setTimeout(()=>{try{if(S&&S.evq&&S.evq.length)modal()}catch(e){}},300)}
{const md=modal;modal=function(){if(PJ113.on){const m=$('modal');if(m)m.hidden=true;return}return md.apply(this,arguments)}}
setInterval(()=>{try{if(!PJ113.on)return;if(pjEcran113()){PJ113.vide=0;const m=$('modal');if(m&&!m.hidden)m.hidden=true;if(S&&modeHist()&&S.autoD)S.autoD=0;return}if(++PJ113.vide>=3)pjFin113()}catch(e){}},500);
// sans réponse pendant 45 s, le conte répond « Plus tard » et reprend
setInterval(()=>{try{const d=$('pjIntro');if(!d){PJ113.t0=0;return}if(!S||!modeHist())return;PJ113.t0=PJ113.t0||performance.now();let n=d.querySelector('.pj113t');if(!n){n=document.createElement('small');n.className='pj113t';n.style.cssText='display:block;margin-top:6px;opacity:.7';d.querySelector('.pjb').appendChild(n)}const r=Math.max(0,Math.ceil(45-(performance.now()-PJ113.t0)/1000));n.textContent='Le conte attend votre réponse. Sans réponse, il reprend dans '+r+' s.';if(r<=0){const b=d.querySelector('#pjNon');if(b)b.click()}}catch(e){}},500);
// ===== En utopie, le conte suit l'utopie, pas l'histoire réelle (sauf si l'on a demandé « ramener vers l'histoire ») =====
function enUtopie113(){return !!(S&&typeof S.orK==='string'&&S.orK.startsWith('u:')&&S.conteVers!=='hist')}
{const cc=choixConte;choixConte=function(e,id){try{if(id!=='debutC'&&enUtopie113()){const O=id?optsDe(id,e):e.o;if(O&&O.length>1){const k=S.orK.slice(2),nom=((typeof UCHN!=='undefined'&&UCHN[k])||'').toLowerCase();
 const sc=O.map((o,i)=>{const t=((o.n||'')+' '+(o.d||'')).toLowerCase();let s=0;if(!(o.hist||i===(e.hist||0)))s+=2;if(/uchronie|utopie/.test(t))s+=3;if(nom&&nom.split(/\s+/).some(w=>w.length>4&&t.includes(w)))s+=2;if(o.f)s+=.5;return[i,s]});sc.sort((a,b)=>b[1]-a[1]);return sc[0][0]}}}catch(x){}return cc.apply(this,arguments)}}
setInterval(()=>{try{if(!enUtopie113())return;const d=$('evDec');if(d&&/histoire réelle/.test(d.textContent)){const n=$('evDecS'),s=n?n.textContent:'45';d.innerHTML='Ce choix décide du cours de l’histoire. Sans réponse, le conte suit votre utopie dans <b id="evDecS">'+s+'</b> s.'}}catch(e){}},300);
