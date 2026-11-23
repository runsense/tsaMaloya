// ===== p266 : les boutons 📻 et 👑 restent en bas à gauche, mais juste au-dessus de la barre du bas (onglets, saison précédente) ;
// sur l'écran titre, ils restent dans le coin. =====
setInterval(()=>{try{const r=document.getElementById('radio222'),f=document.getElementById('fig263b');if(!r)return;
 let x=10,b=10,h=36,top=innerHeight;
 ['bas','svLet'].forEach(id=>{const u=document.getElementById(id);if(!u||getComputedStyle(u).display==='none'||u.hidden)return;const v=u.getBoundingClientRect();if(v.height&&v.width&&v.left<100&&v.top>innerHeight*.45)top=Math.min(top,v.top)});
 if(top<innerHeight)b=Math.round(innerHeight-top+6);
 const pose=(el,l)=>{if(!el)return;const s=el.style;if(s.left!==l+'px')s.left=l+'px';if(s.bottom!==b+'px')s.bottom=b+'px';s.width=s.height=h+'px';s.fontSize=Math.round(h*.47)+'px'};
 pose(r,x);pose(f,x+h+6);
 // pendant un petit jeu en plein écran (songes, courses, missions), les boutons se cachent
 const jeu=!!document.querySelector('#songe272,#rallye,#pjIntro,#gouv273');[r,f].forEach(el=>{if(el)el.style.visibility=jeu?'hidden':''});
 const p=document.getElementById('radio222p');if(p){p.style.left=x+'px';p.style.bottom=(b+h+8)+'px';p.style.maxHeight=Math.max(160,innerHeight-(b+h+8)-10)+'px';p.style.overflowY='auto';p.style.boxSizing='border-box'}
 if(RADIO222&&RADIO222.el){RADIO222.el.style.left=x+'px';RADIO222.el.style.bottom=(b+h+8)+'px'}
}catch(e){}},400);
