// ===== p267 : le royaume des Hauts. Chaque camp marron vit sa vie : il grandit des fugitifs qui le rejoignent, fait ses récoltes,
// a son chef (une grande figure quand l'histoire ou la tradition l'a gardée), et se lie aux autres. Les camps restent autonomes,
// mais s'entraident : on envoie des vivres à celui que les chasseurs ont frappé, on partage un savoir, on accueille les rescapés.
// Quand assez de camps sont alliés, ils forment le royaume des Hauts ; et quand les détachements de Mussard approchent,
// les grands camps se réunissent au centre de l'île. La vie de chaque camp se voit sur la carte (un feu, plus ou moins grand,
// doré pour un allié) et dans le panneau 👑. L'entraide entre camps est attestée par les archives par endroits ;
// le royaume réuni est la part de légende du jeu. =====
const R267={G:null,cle:''};
const v267=i=>{S.r267=S.r267||{v:{},roy:0,cen:0};const V=S.r267.v;if(!V[i]){const st=(S.cl252&&S.cl252[i])||0;V[i]={g:5+(i*7)%9,viv:50,ami:st===2?70:st===1?40:25,at:0}}return V[i]};
const chef267=i=>{try{const n=MAR251.vus[i].n;const f=FIG263.find(x=>x[1]===n);if(f)return {n:f[0],m:f[4]||0,src:f[2]};}catch(e){}return null};
const nom267=i=>{try{return MAR251.vus[i].n}catch(e){return 'un camp'}};
const vivants267=()=>{try{return libres252().filter(o=>o.c&&o.c.t)}catch(e){return []}};
const allies267=()=>vivants267().filter(o=>o.st===2);
const SAV267=['comment fumer la viande en kitoza, qui tient des semaines dans le sac','les plantes qui coupent la fièvre, et celles qui la donnent','où passer une ravine sans laisser de trace','comment tresser les feuilles de vacoa pour un toit qui ne coule pas','les sifflets qui disent « chasseurs », « fugitifs », « tout va bien »','où sont les grottes qui gardent la chaleur','quand planter les songes et les patates douces dans les hauts'];
// chaque saison, les camps vivent
{const s0=saison;saison=function(){const r=s0.apply(this,arguments);try{if(!S||S.fin||S.voieC||S.year>=1848)return r;
 vivants267().forEach(o=>{const v=v267(o.i);if(rnd()<.3)v.g+=1;v.viv=Math.min(100,v.viv+6);if(v.at>0)v.at--;if(o.st===2)v.ami=Math.min(100,v.ami+1)});
 // les alliés aident quand la traque frappe le camp du joueur
 const A=allies267();if(A.length&&(S.traque||0)>=45&&rnd()<.35){const a=A[Math.floor(rnd()*A.length)],v=v267(a.i);if(v.viv>=30){v.viv-=20;fx({vivres:3});log('🔥 Le camp de '+a.c.n+' envoie des patates douces, des songes et du maïs : les chasseurs rôdent chez vous.')}}
 // le royaume nourrit la cohésion
 if(S.r267&&S.r267.roy)fx({coh:1});
}catch(e){}return r}}
// les événements : attaque d'un autre camp, savoir partagé, demande d'alliance, royaume, réunion au centre
setInterval(()=>{try{if(!S||S.voieC||S.fin||!S.evq||S.evq.length||!MAR251.vus||S.year>=1848)return;const R=S.r267||(S.r267={v:{},roy:0,cen:0});
 const L=vivants267(),con=L.filter(o=>o.st>=1);
 if(R.ty===S.year)return;
 // attaque d'un camp ami (temps des détachements)
 if(S.year>=1725&&S.year<1770&&con.length&&rnd()<.25+(S.traque||0)/300){const c=con[Math.floor(rnd()*con.length)];if(typeof CAV268==='function'&&CAV268(c.i)&&rnd()<.5){R.ty=S.year;return}R.att=c.i;R.ty=S.year;S.evq.push('att267');return}
 // savoir partagé
 const A=L.filter(o=>o.st===2);if(A.length&&rnd()<.3){const c=A[Math.floor(rnd()*A.length)];R.sav=c.i;R.savk=Math.floor(rnd()*SAV267.length);R.ty=S.year;S.evq.push('sav267');return}
 // demande d'alliance
 const P=L.find(o=>o.st===1&&v267(o.i).ami>=60);if(P){R.all=P.i;R.ty=S.year;S.evq.push('all267');return}
 // le royaume
 if(!R.roy&&A.length>=4){R.ty=S.year;S.evq.push('roy267');return}
 // la réunion au centre, avant Mussard
 if(R.roy&&!R.cen&&S.year>=1738&&S.year<1765){R.ty=S.year;S.evq.push('cen267');return}
}catch(e){}},7000);
Object.assign(EV,{
 att267:{sys:1,tag:'Mémoire',an:'',get t(){return 'Les chasseurs au camp de '+nom267(S.r267.att)},
  get b(){const i=S.r267.att,c=chef267(i);return 'Un sifflet descend des crêtes, puis un autre : le détachement est tombé sur le camp de '+nom267(i)+(c&&(!c.m||S.year<c.m)?', celui de '+c.n:'')+'. Les cases brûlent, les jardins sont arrachés. Ceux qui ont pu fuir sont dans la forêt, sans rien.'},
  v:'Les rapports des détachements parlent de camps détruits, de jardins arrachés, de vivres saisis ; ils parlent aussi de marrons qui se replient vers d’autres camps.',
  get o(){const i=S.r267.att,v=v267(i);return [
   {n:'Envoyer une part de nos récoltes',d:'Vivres −4 ; le camp se relève, son amitié grandit',fx:{vivres:-4},f:()=>{v.ami=Math.min(100,v.ami+20);v.viv=Math.min(100,v.viv+30);v.at=0;log('🤝 Nos récoltes montent vers '+nom267(i)+'.')}},
   {n:'Accueillir les rescapés',d:'+2 personnes, traque +3 ; amitié +10',fx:{gens:2,traque:3},f:()=>{v.ami=Math.min(100,v.ami+10);v.g=Math.max(2,v.g-2)}},
   {n:'Rester caché',d:'Le camp se débrouille seul ; amitié −10',fx:{},f:()=>{v.ami=Math.max(0,v.ami-10);v.g=Math.max(2,v.g-3);v.viv=Math.max(0,v.viv-30);v.at=2}}]}},
 sav267:{sys:1,tag:'Mémoire',an:'',get t(){return 'Un savoir du camp de '+nom267(S.r267.sav)},
  get b(){return 'Une femme du camp de '+nom267(S.r267.sav)+' est venue passer quelques jours avec vous. Elle vous a appris '+SAV267[S.r267.savk||0]+'. En partant, elle a dit : « ce qu’on sait, on le sait pour tous ».'},
  o:[{n:'Garder ce savoir',d:'Savoir +2, cohésion +1',fx:{savoir:2,coh:1}}]},
 all267:{sys:1,tag:'Mémoire',an:'',get t(){return 'Le camp de '+nom267(S.r267.all)+' veut l’alliance'},
  get b(){const i=S.r267.all,c=chef267(i);return (c&&(!c.m||S.year<c.m)?c.n:'Le chef du camp de '+nom267(i))+' fait dire par ses guetteurs : vous avez partagé, il partagera. Chacun reste chez soi, maître de son camp, mais on se prévient, on s’aide, on ne se trahit pas.'},
  get o(){const i=S.r267.all;return [{n:'Sceller l’alliance',d:'Le camp devient allié : ses guetteurs partagent ce qu’ils voient. Cohésion +3',fx:{coh:3},f:()=>{S.cl252=S.cl252||{};S.cl252[i]=2;v267(i).ami=Math.max(v267(i).ami,70)}},{n:'Rester chacun chez soi',d:'Rien ne change',fx:{},f:()=>{v267(i).ami=40}}]}},
 roy267:{sys:1,tag:'Mythe',an:'',t:'Le royaume des Hauts',
  b:'Les chefs des camps alliés se retrouvent une nuit, loin de tout, autour d’un seul feu. Personne ne commande aux autres : chaque camp garde ses cases, ses jardins, ses morts. Mais désormais on parle d’un seul pays, celui des Hauts, du Nord au Sud de l’île, que les Bas ne connaissent pas.',
  v:'Les archives parlent de chefs influents sur plusieurs camps (Dimitile, Laverdure « roi de tous les marrons ») ; un royaume réunissant toute l’île appartient à la tradition et à l’imaginaire du jeu.',
  o:[{n:'Faire du feu le cœur du royaume',d:'Cohésion +6, mystique +3 ; ensuite, cohésion +1 chaque saison',fx:{coh:6,myst:3},f:()=>{S.r267.roy=1}}]},
 cen267:{sys:1,tag:'Mémoire',an:'les années 1740',t:'Les grands camps se réunissent au centre',
  b:'Les guetteurs de l’Ouest l’ont vu : les détachements sont plus nombreux, mieux armés, conduits par des chasseurs qui connaissent les ravines, comme Mussard. Les chefs décident de rapprocher les grands camps du cœur de l’île, au pied des pitons et dans les cirques, là où les remparts tombent à pic.',
  v:'Les camps du XVIIIᵉ siècle se trouvent surtout dans les cirques et autour des grands pitons ; François Mussard mène ses détachements surtout dans les années 1740-1750.',
  o:[{n:'Monter tous ensemble vers le centre',d:'Traque −10, +3 personnes, santé −2',fx:{traque:-10,gens:3,sante:-2},f:()=>{S.r267.cen=1}},{n:'Que chaque camp garde sa place',d:'Cohésion +2, traque +4',fx:{coh:2,traque:4},f:()=>{S.r267.cen=2}}]}
});
// la vie des camps se voit sur la carte : un feu au-dessus de chaque camp connu, plus grand s'il est peuplé, doré s'il est allié, pâle s'il a été frappé
function tex267(){const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d');const r=g.createRadialGradient(32,40,2,32,40,26);r.addColorStop(0,'rgba(255,240,180,1)');r.addColorStop(.35,'rgba(255,160,60,.9)');r.addColorStop(1,'rgba(255,90,20,0)');g.fillStyle=r;g.beginPath();g.moveTo(32,4);g.quadraticCurveTo(54,34,44,54);g.quadraticCurveTo(32,64,20,54);g.quadraticCurveTo(10,34,32,4);g.fill();return new THREE.CanvasTexture(c)}
setInterval(()=>{try{if(typeof scene==='undefined')return;const cache=!S||S.voieC||(typeof K!=='undefined'&&K)||(typeof CV!=='undefined'&&CV.on)||!MAR251.vus;if(R267.G)R267.G.visible=!cache;if(cache)return;
 const L=vivants267().filter(o=>seen(o.c.t));const cle=L.map(o=>{const v=v267(o.i);return o.i+':'+o.st+':'+Math.min(30,v.g)+':'+(v.at?1:0)}).join(',');if(cle===R267.cle)return;R267.cle=cle;
 if(R267.G){scene.remove(R267.G);R267.G=null}R267.tex=R267.tex||tex267();const G=new THREE.Group();
 L.forEach(o=>{const v=v267(o.i);const col=v.at?0x9a8f86:o.st===2?0xffd27a:o.st===1?0xffffff:0xb8b0a0;const m=new THREE.SpriteMaterial({map:R267.tex,color:col,transparent:true,opacity:v.at?.45:.9,depthWrite:false});const s=new THREE.Sprite(m);const k=.06+Math.min(30,v.g)*.004;s.position.set(o.c.x,Math.max(0,altTri(o.c.x,o.c.z))*VX+.2,o.c.z);s.scale.set(k,k*1.2,1);s.renderOrder=7;G.add(s)});
 scene.add(G);R267.G=G}catch(e){}},2000);
{const nv=nouvelle;nouvelle=function(){R267.cle='';return nv.apply(this,arguments)}}
// le panneau 👑 montre aussi les camps : leur chef, leur monde, leurs liens
{const f0=figures263;figures263=function(){const r=f0.apply(this,arguments);try{const p=document.getElementById('fig263');if(!p||!S||S.voieC)return r;
 const L=vivants267().filter(o=>o.st>=1||seen(o.c.t));if(!L.length)return r;const d=document.createElement('div');d.style.cssText='margin-top:12px;border-top:1px solid #6a5a40;padding-top:8px';
 d.innerHTML='<b>Le royaume des Hauts</b>'+(S.r267&&S.r267.roy?' — réuni':'')+'<br><small>Les camps que vous connaissez. 🔥 doré : allié ; blanc : rencontré ; pâle : frappé par les chasseurs.</small>'+
  L.map(o=>{const v=v267(o.i),c=chef267(o.i);const ch=c?(c.m&&S.year>=c.m?c.n+' (mort en '+c.m+')':c.n):'un chef dont le nom ne nous est pas parvenu';return '<div style="margin:4px 0;font-size:13px">'+(o.st===2?'🤝 ':o.st===1?'· ':'○ ')+'<b>'+o.c.n+'</b> — '+ch+' · environ '+v.g+' personnes'+(v.at?' · <i>frappé</i>':'')+(v.viv<25?' · <i>a faim</i>':'')+'</div>'}).join('');
 p.appendChild(d)}catch(e){}return r}}
{const b=document.getElementById('fig263b');if(b)b.onclick=()=>figures263()}
