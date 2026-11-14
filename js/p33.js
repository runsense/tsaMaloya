// ===== p33 : les pouvoirs mystiques au clavier dans les jeux stratégiques — F1–F4 combattent, F5–F8 protègent, F9–F12 guérissent et déplacent =====
// Ils coûtent de la mystique de la partie ; sans partie en cours (petits jeux), une réserve de souffle par combat.
const PVF=[
 ['Feu des ancêtres',3,'Le feu frappe un groupe d’ennemis.','c'],['Peur des fantômes',3,'Tous les ennemis fuient un moment.','c'],['La vague',2,'Frappe la rangée ennemie la plus serrée.','c'],['La foudre',4,'Frappe durement l’ennemi le plus fort.','c'],
 ['Brume',2,'Les ennemis tirent plus lentement.','p'],['Gris-gris',3,'Les vôtres encaissent mieux.','p'],['Racines',2,'Les ennemis avancent à peine.','p'],['Le Silence',3,'Les ennemis restent figés un instant.','p'],
 ['La main qui guérit',2,'Soigne le plus blessé des vôtres.','s'],['Saint Expédit',4,'Soigne un peu tous les vôtres.','s'],['Pas du vent',2,'Les vôtres vont plus vite.','d'],['Repli',1,'Les vôtres reculent vers l’arrière.','d']];
const PVS={cd:{},eff:[],pool:15};
function pvMyst(){return (typeof S!=='undefined'&&S&&!S.bac)?(S.myst||0):PVS.pool}
function pvPaye(c){if(typeof S!=='undefined'&&S&&!S.bac){if((S.myst||0)<c)return false;S.myst-=c;return true}if(PVS.pool<c)return false;PVS.pool-=c;return true}
function pvLancer(i){const G=window.__btu,el=$('btu');
 // la chasse : les touches renvoient aux pouvoirs qu'elle connaît déjà
 const F0=window.__fps&&__fps.F;if(F0&&!F0.fin&&typeof fpsUser==='function'){const L=F0.pv||[],cat=i<4?'voir':i<8?['brume','silence']:['soin'],k=L.filter(k=>typeof SCPV!=='undefined'&&SCPV[k]&&[].concat(cat).includes(SCPV[k][1]))[i%4];if(k)fpsUser(k);return}
 if(!G||!el||G.phase!=='fight'||G.fini)return;const P=PVF[i],now=performance.now();if((PVS.cd[i]||0)>now){G.msg=P[0]+' : encore '+Math.ceil((PVS.cd[i]-now)/1000)+' s.';return}if(!pvPaye(P[1])){G.msg='Pas assez de mystique pour '+P[0]+'.';return}PVS.cd[i]=now+12000;
 const A=G.u.filter(u=>u.s===0&&u.pv>0),E=G.u.filter(u=>u.s===1&&u.pv>0),fx=(a,b,c)=>G.fx.push({x0:a.x,y0:a.y-1.5,x1:b.x,y1:b.y,t:.35,c}),tmp=(d,f,u)=>{f();PVS.eff.push({t:now+d*1000,u})};
 const centre=()=>{let b=null,bn=-1;E.forEach(e=>{const n=E.filter(o=>Math.hypot(o.x-e.x,o.y-e.y)<1.5).length;if(n>bn){bn=n;b=e}});return b};
 if(i===0){const c=centre();if(c)E.filter(o=>Math.hypot(o.x-c.x,o.y-c.y)<1.5).forEach(o=>{o.pv-=25;fx(c,o,'#ff8a30')})}
 if(i===1)E.forEach(o=>{o.peur=2.5;fx(o,o,'#b080e0')});
 if(i===2){const c=centre();if(c)E.filter(o=>Math.abs(o.y-c.y)<.7).forEach(o=>{o.pv-=15;fx(c,o,'#70b0ff')})}
 if(i===3){const t=E.sort((a,b)=>b.pvm-a.pvm)[0];if(t){t.pv-=40;fx(t,t,'#fff6a0')}}
 if(i===4)tmp(6,()=>E.forEach(o=>o.vi*=1.8),()=>E.forEach(o=>o.vi/=1.8));
 if(i===5)tmp(8,()=>A.forEach(o=>o.arm=Math.min(.85,o.arm+.3)),()=>A.forEach(o=>o.arm=Math.max(0,o.arm-.3)));
 if(i===6)tmp(6,()=>E.forEach(o=>o.sp*=.3),()=>E.forEach(o=>o.sp/=.3));
 if(i===7)E.forEach(o=>o.stun=1.5);
 if(i===8){const t=A.sort((a,b)=>a.pv/a.pvm-b.pv/b.pvm)[0];if(t){t.pv=Math.min(t.pvm,t.pv+t.pvm*.4);fx(t,t,'#70e0a0')}}
 if(i===9)A.forEach(o=>{o.pv=Math.min(o.pvm,o.pv+o.pvm*.15);fx(o,o,'#70e0a0')});
 if(i===10)tmp(6,()=>A.forEach(o=>o.sp*=1.8),()=>A.forEach(o=>o.sp/=1.8));
 if(i===11)A.forEach(o=>{o.y=Math.min(5.7,o.y+1.5);o.peur=0});
 G.msg=P[0]+' !';pvBarre()}
setInterval(()=>{const now=performance.now();PVS.eff=PVS.eff.filter(e=>{if(e.t<=now){try{e.u()}catch(x){}return false}return true});if($('btu'))pvBarre();else{PVS.cd={};PVS.pool=15}},250);
// la barre des pouvoirs, au bas de la bataille : touche, nom, coût, recharge
function pvBarre(){const el=$('btu');if(!el)return;let b=$('pvF');if(!b){b=document.createElement('div');b.id='pvF';b.style.cssText='position:absolute;left:50%;transform:translateX(-50%);bottom:8px;display:flex;gap:3px;z-index:5;flex-wrap:wrap;justify-content:center;max-width:98vw';el.appendChild(b);b.onclick=e=>{const k=e.target.closest('[data-pf]');if(k)pvLancer(+k.dataset.pf)}}
 const G=window.__btu;b.style.display=G&&G.phase==='fight'&&!G.fini?'flex':'none';const now=performance.now(),m=pvMyst(),C={c:'#e87b5a',p:'#70b0ff',s:'#70e0a0',d:'#e8be5a'};
 b.innerHTML='<small style="align-self:center;color:#b080e0;margin-right:4px">✦ '+Math.floor(m)+'</small>'+PVF.map((P,i)=>{const cd=Math.max(0,(PVS.cd[i]||0)-now),ok=!cd&&m>=P[1];return '<button data-pf="'+i+'" title="'+P[2]+'" style="font:11px system-ui;padding:3px 6px;border-radius:5px;border:1px solid '+C[P[3]]+';background:'+(ok?'rgba(30,25,18,.92)':'rgba(30,25,18,.55)')+';color:'+(ok?'#f0e6d0':'#887')+';cursor:pointer"><b style="color:'+C[P[3]]+'">F'+(i+1)+'</b> '+P[0]+' <small>'+(cd?Math.ceil(cd/1000)+' s':P[1]+'✦')+'</small></button>'}).join('')}
// les touches : seulement dans un jeu stratégique, pour ne pas voler F5 ou F12 au navigateur ailleurs
addEventListener('keydown',e=>{const m=/^F([1-9]|1[0-2])$/.exec(e.key);if(!m)return;const dansJeu=$('btu')||(window.__fps&&__fps.F);if(!dansJeu)return;e.preventDefault();e.stopPropagation();pvLancer(+m[1]-1)},true);
