// ===== p401 : pendant une incarnation, les bulles de la carte (« Le conte · … », les messages de construction) ne passent plus
// par-dessus la vue ; elles reviennent au retour sur la carte. Et un colon incarné ne prie pas les ancêtres malgaches : il dit
// une prière chrétienne ; un engagé indien fait sa prière à la divinité de la famille. =====
{const st=document.createElement('style');st.textContent='body.inc401 #tuto,body.inc401 #toast,body.inc401 #bulle,body.inc401 #tip97,body.inc401 #kBul,body.inc401 .tipH{display:none!important}';document.head.appendChild(st);
 setInterval(()=>{try{const on=typeof INC!=='undefined'&&!!INC;if(on!==document.body.classList.contains('inc401'))document.body.classList.toggle('inc401',on)}catch(e){}},300)}
try{const P=ACT380.prier;if(P){const ok0=P.ok,f0=P.f;const qui=c=>{try{const I=c.I,m=String((I&&I.C&&I.C.heros&&I.C.heros.m)||'');if(typeof camp344==='function'&&camp344(I)==='colon344')return 'c';if(/indien|indienne/.test(m))return 'i'}catch(e){}return 'm'};
 P.ok=c=>qui(c)==='m'&&ok0(c);
 ACT380.prierC={n:'Dire une prière',ic:'✝️',ok:c=>qui(c)==='c'&&(c.I.nuit||c.feuPres||c.cp||true),cons:P.cons,f:c=>{try{geste382('prier',4000)}catch(e){}c.I.endu=Math.min(100,(c.I.endu||0)+10);return 'Un Notre Père à voix basse, le chapelet entre les doigts.'}};
 ACT380.prierI={n:'Prier la divinité de la famille',ic:'🪔',ok:c=>qui(c)==='i',cons:P.cons,f:c=>{try{geste382('prier',4000)}catch(e){}c.I.endu=Math.min(100,(c.I.endu||0)+10);return 'Les mains jointes, une prière à la divinité de la famille, comme au pays.'}}}}catch(e){}
try{['prierC','prierI'].forEach(k=>{if(!ORD380.includes(k)){const i=ORD380.indexOf('prier');ORD380.splice(i>=0?i+1:ORD380.length-1,0,k)}})}catch(e){}
