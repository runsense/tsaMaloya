// ===== p317 : le conte ne s'arrête plus sur une pile de cartes. Quand plus de deux cartes attendent, les autres sont gardées
// (sans être perdues) et rendues une par saison dans les saisons calmes : l'histoire avance d'un pas égal. =====
const GARDE317=k=>typeof k==='string'&&EV[k]&&!/^(debut|trace|trChoix|combo|mortRoi|captifs|voile|libTombe|famineC)/.test(k);
setInterval(()=>{try{if(!S||S.fin||!S.evq)return;S.rep317=S.rep317||[];
 if(S.evq.length>2){const keep=[],out=[];S.evq.forEach((k,i)=>{if(i<2||!GARDE317(k))keep.push(k);else out.push(k)});if(out.length){S.evq.length=0;S.evq.push(...keep);S.rep317.push(...out)}}
 if(S.ns!==S.ns317){S.ns317=S.ns;if(S.evq.length===0&&S.rep317.length)S.evq.push(S.rep317.shift())}}catch(e){}},400);
// garde-fou : une carte à un seul choix ne bloque jamais le conte. Après 20 s sans réponse, le choix se fait seul ;
// et le retour d'un camp ou d'une incarnation remet toujours le conte en marche.
{let vu=null,t0=0;setInterval(()=>{try{if(!S||S.fin||!S.evq||!S.evq.length){vu=null;return}const m=$('modal');if(!m||m.hidden){vu=null;return}
 const id=S.evq[0],k=id+'|'+S.year;if(k!==vu){vu=k;t0=performance.now();return}
 const O=optsDe(id,EV[id]);if(O&&O.length===1&&performance.now()-t0>20000){vu=null;choisir(id,0);rafraichir()}}catch(e){}},2000)}
setInterval(()=>{try{if(typeof VIE315!=='undefined'&&VIE315.on&&!CV.on){sortir315()}if(S&&!S.fin&&S.dif==='normal'&&DIFC==='histoire'&&!(typeof VIE315!=='undefined'&&VIE315.on))S.dif='histoire'}catch(e){}},3000);
