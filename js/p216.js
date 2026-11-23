// ===== p216 : (1) les utopies racontées par la gazette disent qu'elles sont inventées ; (2) quand une uchronie ouvre une bataille, on peut y aller tout de suite =====
{const i0=interlude;interlude=function(I,done){try{if(I&&/^Utopie/.test(I.date||'')){I=Object.assign({},I,{date:'Utopie, récit inventé pour le jeu · '+(S&&S.year||'')})}
  if(I&&/^Uchronie/.test(I.date||'')&&typeof ouvrirBataille==='function'&&typeof BTU!=='undefined'){const m=(I.texte||'').match(/bataille cachée vient de s’ouvrir : « ([^»]+) »/);const sc=m&&BTU.SC.find(s=>s.n===m[1].trim());
   if(sc){const d0=done;done=function(){try{if(d0)d0()}catch(e){}y216(sc)}}}}catch(e){}return i0.call(this,I,done)}}
function y216(sc){try{const o=document.createElement('div');o.style.cssText='position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;background:rgba(10,8,4,.55)';
 o.innerHTML='<div class="bloc" style="max-width:440px;text-align:center"><p class="note" style="margin:0">Uchronie</p><h1 style="font-size:22px">'+sc.n+'</h1><p>'+(sc.t||'')+'</p><button class="bt" id="y216a">Y aller maintenant</button> <button class="bt sec" id="y216b">Plus tard (Petits jeux)</button></div>';
 document.body.appendChild(o);const fin=()=>o.remove();o.querySelector('#y216b').onclick=fin;o.querySelector('#y216a').onclick=()=>{fin();try{ouvrirBataille(sc.k,()=>{})}catch(e){}}}catch(e){}}
