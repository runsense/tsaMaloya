// ===== p316 : tout s'incarne depuis la case choisie — entrer dans son camp (la Vie), ou incarner une action : chasser,
// cueillir, explorer, approcher d'un camp ou d'un village colon. L'incarnation part de la case, sur le vrai relief,
// et ramène ensuite à la carte avec ce qu'on a rapporté. Le bouton flottant laisse la place à ces choix dans le panneau. =====
{const b=document.getElementById('vie315');if(b)b.remove()}
bouton315=function(){const b=$('vie315');if(b)b.remove()};
const ACT316={
 chasse:{t:'La chasse',obj:'Suivre le gibier jusqu’à la ravine voisine et revenir avec de la viande',intro:'On part avant le jour, la sagaie à la main. Les cabris et les cochons marrons passent par les ravines. Il faut rapporter de quoi manger sans laisser de traces.',finT:'La chasse a donné. On revient au camp avant la nuit.',gain:{vivres:3}},
 cueil:{t:'La cueillette',obj:'Ramasser les plantes et les fruits jusqu’à la lisière',intro:'Les brèdes, les cœurs de palmiste, les fruits et les plantes qui soignent : la forêt donne, à qui la connaît.',finT:'Les paniers sont pleins.',gain:{vivres:2,sante:2}},
 peche:{t:'La pêche',obj:'Descendre à la rivière et prendre les camarons sous les galets',intro:'La rivière est fraîche. Sous les galets, les camarons se cachent ; il faut les surprendre à la main.',finT:'Les camarons sont dans la calebasse.',gain:{vivres:2}},
 explore:{t:'L’exploration',obj:'Aller voir ce qu’il y a plus loin, et revenir le dire',intro:'Personne n’est encore allé de ce côté. On part léger, on regarde tout, on retient le chemin.',finT:'On revient avec un chemin dans la tête.',gain:{savoir:1}},
 village:{t:'Approcher du village',obj:'S’approcher des cases sans se faire voir, observer, puis repartir',intro:'Le village des colons est là, en bas. Les chiens aboient la nuit. On vient voir, écouter, peut-être prendre ce qui traîne, et repartir avant le jour.',finT:'On repart avec ce qu’on a vu et entendu.',gain:{savoir:1,vivres:1}},
 quartier:{t:'Le quartier',obj:'Faire le tour du quartier et des champs',intro:'On fait le tour des cases, des champs et des chemins. Ce qu’on voit ici, le conte ne le dit pas toujours.',finT:'Le tour est fait.',gain:{savoir:1}}};
function bio316(t){const a=t.alt||0;return a<250?0:a<700?1:a<1400?2:3}
function voisin316(t,loin){let best=null,bd=-1;(t.nb||[]).map(i=>T[i]).filter(u=>u&&!u.bare).forEach(u=>{const d=loin?Math.hypot(u.x-t.x,u.z-t.z)+(u.alt||0)*.001:Math.random();if(d>bd){bd=d;best=u}});return best||t}
function heros316(t){const P=(S.pp||[]).filter(p=>typeof adulte==='function'?adulte(p)&&!p.mort:!p.mort);const c=camps().find(c=>c.i===t.i)||camps()[0];const L=c&&typeof campDe==='function'?P.filter(p=>campDe(p)===c.i):P;const p=L[Math.floor(Math.random()*L.length)]||P[0];
 return {n:p?p.n:(S.voieC?'un habitant':'un marron'),m:p&&p.g==='f'?'femme_travail':'jeune_pagne'}}
function incarner316(k,t){if(!S||S.fin||!t)return;const A=ACT316[k];if(!A)return;const u=voisin316(t,k==='explore'),w=voisin316(u,k==='explore');
 const L=[t,u,w].map(x=>{const q=LL99(x);return [q.lon,q.lat]}).filter((p,i,a)=>!i||Math.hypot(p[0]-a[i-1][0],p[1]-a[i-1][1])>1e-4);if(L.length<2){const q=LL99(t);L.push([q.lon+.012,q.lat+.008])}
 const b=bio316(t),h=heros316(t),colon=!!S.t[t.i]&&S.t[t.i].c&&!S.voieC;
 INC287.libre316={n:A.t,sous:'',fin:{f:'libre'},ch:[{t:h.n,an:String(S.year),heros:h,comp:[],obj:A.obj,b0:b,b1:Math.max(b,bio316(w)),chas:k==='village'||colon?3:(S.voieC?0:1),faux:3,route:L,intro:A.intro,finT:A.finT,v:''}]};
 const e=$('ecran');if(e)e.hidden=true;try{if(CV.on)cvFermer()}catch(_){}let auto=0;try{const c=$('auto');if(c&&c.checked){auto=1;c.click()}}catch(_){}const reprise=()=>{try{const c=$('auto');if(auto&&c&&!c.checked)c.click()}catch(_){}};
 incOuvrir287('libre316',0);if(!INC)return;
 INC.libre316=1;INC.ret=()=>{try{$('ecran').hidden=true;peindre();panneau()}catch(_){}reprise()};
 INC.F=()=>{try{const g=A.gain;if(g.vivres)S.vivres+=g.vivres;if(g.savoir)S.savoir=(S.savoir||0)+g.savoir;if(g.sante)S.sante=Math.min(100,(S.sante||0)+g.sante);log('🚶 '+h.n+' : '+A.finT+' ('+Object.entries(g).map(([a,v])=>'+'+v+' '+a).join(', ')+')');peindre();panneau();sauve()}catch(e){console.warn(e)}reprise()}}
// les choix dans le panneau de la case
{const pn=panneau;panneau=function(){const r=pn.apply(this,arguments);try{if(!S||S.fin||!sel||traceE||VIE315.on)return r;const p=$('side');if(!p||!p.innerHTML)return r;const t=sel,o=S.t[t.i];if(!seen(t)&&!(o&&o.c))return r;
 const mien=camps().some(c=>c.i===t.i),colon=o&&o.c&&!S.voieC,B=[];
 if(mien)B.push(['vie',S.voieC?'🏘 Entrer dans le village':'⛺ Entrer dans le camp','Vivre le camp à son rythme, puis revenir au conte']);
 if(colon)B.push(['village','👁 Approcher du village colon','Incarner celui qui va voir, de nuit']);
 else if(o&&o.c&&S.voieC&&!mien)B.push(['quartier','🏘 Faire le tour du quartier','Incarner un habitant']);
 if(!t.bare&&!colon){B.push(['chasse','🗡 Incarner la chasse',''],['cueil','🌿 Incarner la cueillette','']);if(t.riv||t.water||/riv/i.test(t.biome||''))B.push(['peche','🎣 Incarner la pêche',''])}
 if(!t.bare)B.push(['explore','🧭 Incarner l’exploration','Partir voir plus loin, depuis cette case']);
 if(!B.length)return r;const d=document.createElement('div');d.id='inc316';d.style.cssText='margin:10px 0 4px;padding:8px;border:1px solid rgba(216,180,90,.45);border-radius:10px;background:rgba(216,180,90,.07)';
 d.innerHTML='<div style="font:600 12px system-ui;letter-spacing:.05em;text-transform:uppercase;color:#d8b45a;margin-bottom:6px">Incarner</div>'+B.map(([k,n,ti])=>'<button class="bt" data-i316="'+k+'" title="'+ti+'" style="display:block;width:100%;text-align:left;margin:4px 0">'+n+'</button>').join('');
 p.insertBefore(d,p.children[2]||null);d.querySelectorAll('[data-i316]').forEach(x=>x.onclick=()=>{const k=x.dataset.i316;if(k==='vie')entrer315(t.i);else incarner316(k,t)})}catch(e){console.warn(e)}return r}}
// quitter une incarnation libre ramène à la carte, la partie continue (jamais le menu)
{const q=incQuitter287;incQuitter287=function(){if(INC&&INC.libre316){const r=INC.ret;INC.ret=null;INC.camp315=0;const x=q.apply(this,arguments);try{r&&r()}catch(e){}return x}return q.apply(this,arguments)}}
