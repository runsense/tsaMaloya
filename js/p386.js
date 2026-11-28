// ===== p386 : côté colonial, 1663-1665 comme l'archive le raconte. Payen et son compagnon débarquent avec dix Malgaches ;
// quelques mois plus tard, les Malgaches s'enfuient dans les Hauts et les deux hommes restent seuls à la grotte. En 1665,
// Regnault arrive avec une vingtaine de colons ; selon l'historien Miranville, les Malgaches de Payen redescendent alors
// rejoindre le groupe — le jeu laisse le choix de les voir revenir ou rester libres dans la montagne. =====
Object.assign(EV,{
 fuite386:{y:1664,si:()=>S&&S.voieC&&S.hist90&&!S.fui386&&S.pp&&S.pp.some(p=>p.hist&&p.or==='mg'),tag:'Archive',an:'1664',t:'Les Malgaches s’en vont',
  get b(){const n=S.pp.filter(p=>p.hist&&p.or==='mg').length;return 'Une dispute, puis une autre. Une nuit, les '+n+' Malgaches arrivés avec vous quittent la grotte et montent dans les Hauts, du côté des ravines. Au matin, il ne reste que Louis Payen et son compagnon, deux hommes seuls devant la baie de Saint-Paul.'},
  v:'C’est l’histoire vraie : la colonie de Payen n’a jamais été une colonie. Deux hommes, une grotte, et l’attente d’un navire.',
  h:'Archive : récit de Souchu de Rennefort (1668) ; les Malgaches de Payen s’enfuient dans la montagne quelques mois après l’arrivée de fin 1663. La cause exacte des disputes n’est pas établie ; la tradition parle des femmes.',
  o:[{n:'Rester à deux à la grotte',d:'Vous attendez le prochain navire. Vos gens : 2.',fx:{coh:-2},f:()=>{const F=S.pp.filter(p=>p.hist&&p.or==='mg');S.fui386=F.map(p=>({n:p.n,g:p.g,na:p.na,sk:p.sk,cu:p.cu}));S.pp=S.pp.filter(p=>!(p.hist&&p.or==='mg'));S.gens=S.pp.length;try{S.bras=Math.min(S.bras,brasMax())}catch(e){}log('Les Malgaches sont partis dans les Hauts. Payen et son compagnon restent seuls.')}},
     {n:'Les suivre de loin pour savoir où ils vont',d:'Vous ne les ramènerez pas, mais vous saurez quelles ravines ils ont prises. Vos gens : 2, traque +3.',fx:{traque:3},f:()=>{const F=S.pp.filter(p=>p.hist&&p.or==='mg');S.fui386=F.map(p=>({n:p.n,g:p.g,na:p.na,sk:p.sk,cu:p.cu}));S.pp=S.pp.filter(p=>!(p.hist&&p.or==='mg'));S.gens=S.pp.length;try{S.bras=Math.min(S.bras,brasMax())}catch(e){}log('Les Malgaches ont pris les ravines au-dessus de Saint-Paul.')}}]},
 regn386:{y:1665,si:()=>S&&S.voieC&&!S.regn386,tag:'Archive',an:'1665',t:'Regnault et vingt colons',
  b:'Un navire de la Compagnie mouille dans la baie. Étienne Regnault, nommé commandant, débarque avec une vingtaine de colons recrutés en France. Payen n’est plus seul : la colonie de Bourbon commence vraiment là.',
  v:'Regnault, plus que Payen, est tenu pour le fondateur de la colonie.',
  h:'Archive : arrivée d’Étienne Regnault en juillet 1665. Selon l’historien Miranville, les Malgaches de Payen rejoignent alors le groupe de Regnault ; d’autres récits les gardent dans la montagne.',
  o:[{n:'Les Malgaches redescendent',d:'Comme le rapporte Miranville : ils rejoignent la colonie. Vingt colons et les fuyards de 1664 avec vous.',fx:{ami:3},f:()=>{S.regn386=1;ajout386(20,true)},hist:1},
     {n:'Les Malgaches restent dans les Hauts',d:'Une autre version : ils restent libres. Vingt colons avec vous, et des marrons au-dessus de vos têtes.',fx:{traque:2},f:()=>{S.regn386=1;ajout386(20,false)}}]}});
function ajout386(n,retour){try{if(!S.pp)return;const fa=(Math.max(0,...S.pp.map(p=>p.fa||0))||0)+1;
 for(let j=0;j<n;j++){const q=nouvellePersonne({or:'eu',g:j<15?'h':'f',age:18+Math.floor(rnd()*22),st:'libre',fa:fa+(j>>2)});S.pp.push(q)}
 if(retour&&S.fui386)S.fui386.forEach(o=>{const q=nouvellePersonne({or:'mg',g:o.g,st:'engagé'});q.n=o.n;q.na=o.na;if(o.sk)q.sk=o.sk;q.hist=1;S.pp.push(q)});
 S.gens=S.pp.length;log('1665 : '+n+' colons'+(retour&&S.fui386?' et '+S.fui386.length+' Malgaches redescendus':'')+' — la colonie compte '+S.gens+' personnes.')}catch(e){console.warn(e)}}
// ces deux étapes arrivent toujours (ce ne sont pas des nouvelles du monde : c'est l'histoire même de la colonie)
{const h0=histOK;histOK=function(k){if(k==='fuite386'||k==='regn386')return true;return h0.apply(this,arguments)}}
