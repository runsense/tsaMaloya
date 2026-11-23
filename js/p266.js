// ===== p266 : les boutons 📻 et 👑 ne se posent plus sur la barre du bas (onglet Savoirs, bouton Annuler) :
// pendant la partie, ils se rangent juste après le dernier bouton de la rangée du bas ; sur l'écran titre, ils restent en coin. =====
setInterval(()=>{try{const r=document.getElementById('radio222'),f=document.getElementById('fig263b');if(!r)return;
 const u=document.getElementById('undo');const v=u&&u.offsetParent&&u.getBoundingClientRect();
 let x=10,b=10,h=36;
 if(v&&v.width){x=Math.round(v.right+10);b=Math.round(innerHeight-v.bottom);h=Math.max(28,Math.round(v.height))}
 const pose=(el,l)=>{if(!el)return;const s=el.style;if(s.left!==l+'px')s.left=l+'px';if(s.bottom!==b+'px')s.bottom=b+'px';s.width=s.height=h+'px';s.fontSize=Math.round(h*.47)+'px'};
 pose(r,x);pose(f,x+h+6);
 const p=document.getElementById('radio222p');if(p){p.style.left=x+'px';p.style.bottom=(b+h+8)+'px'}
 if(RADIO222&&RADIO222.el){RADIO222.el.style.left=x+'px';RADIO222.el.style.bottom=(b+h+8)+'px'}
}catch(e){}},400);
