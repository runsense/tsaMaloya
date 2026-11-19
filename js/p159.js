// ===== p159 : la cueillette cherche TOUTES les plantes du lieu — on rapporte des vivres et, selon l'endroit, les plantes rares (goyave marron, faham, ambaville…) sans y mettre d'autres bras =====
{const a0=actions;actions=function(t){const A=a0(t);try{return A.filter(a=>!/^ing_/.test(a.id||''))}catch(e){return A}}}
function cueilPlantes159(t){try{if(!S||!t||typeof ING99==='undefined')return;const pris=[];for(const k in ING99){const I=ING99[k];if(I.ok(t)&&rnd()<.55){const n=1+(rnd()<.25?1:0);ing99()[k]=(ing99()[k]||0)+n;pris.push(n+' '+I.ic+' '+I.n.split(' (')[0].toLowerCase())}}
 if(pris.length)log('🧺 La cueillette rapporte aussi : '+pris.join(', ')+'.')}catch(e){}}
{const g0=agir;agir=function(t,id,l){const r=g0.apply(this,arguments);try{if(r!==false&&id==='cueil'&&modeHist()&&!S.voieC)cueilPlantes159(t)}catch(e){}return r}}
// ----- les colons en fuite qu'on a accueillis se voient au camp : trois colons (deux hommes, une femme) vivent parmi les marrons, en habits d'Europe -----
{const b0=bat;bat=function(){const r=b0.apply(this,arguments);try{if(!S||!S.br||!S.br.colMar||S.voieC||typeof mfPoser!=='function'||dist>9)return r;const c=camps()[0];if(!c)return r;const now=performance.now()/1000;
  ['p7_colon','colone','jeune_colon'].forEach((n,i)=>{const ph=now*.12+i*2.1,marche=Math.sin(now*.2+i*1.7)>-.2,rad=.26+.05*Math.sin(i*3),a=marche?ph:Math.floor(ph),x=c.x+Math.cos(a)*rad,z=c.z+Math.sin(a)*rad;
   if(typeof solOk29==='function'&&!solOk29(x,z))return;mfPoser('cf159_'+i,n,x,Math.max(0,alt(x,z))*VX+.01,z,marche?-a:-a+Math.PI/2,marche?'marche':'repos_debout')})}catch(e){}return r}}
