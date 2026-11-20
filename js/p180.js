
// ===== p180 : la fiche d'événement a une mise en page fixe =====
// Même hauteur pour toutes les fiches ; le titre, le texte, les cadres et les boutons restent toujours à la même place.
// Un texte trop long ne pousse plus rien : il rétrécit (jusqu'à une taille minimale) dans son cadre. Au survol, il revient
// un peu plus gros que la normale, et le cadre défile s'il faut ; à la sortie du survol, il reprend sa taille ajustée.
{const st=document.createElement('style');st.textContent=
 '#modal .carte.fx180{height:min(600px,calc(100vh - 32px));display:flex;flex-direction:column;overflow:hidden}'+
 '#modal .carte.fx180>.in{flex:1;min-height:0;display:flex;flex-direction:column}'+
 '#modal .carte.fx180 .hd180{flex:0 0 auto;min-height:92px}'+
 '#modal .carte.fx180 .hd180 h2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}'+
 '#modal .carte.fx180 .tx180{flex:1;min-height:0;overflow:hidden;position:relative;margin:4px 0 8px;padding-right:4px;transition:font-size .25s}'+
 '#modal .carte.fx180 .tx180 p{max-width:none}'+
 '#modal .carte.fx180 .tx180:hover{overflow-y:auto}'+
 '#modal .carte.fx180 .tx180.trop:not(:hover)::after{content:"";position:absolute;left:0;right:0;bottom:0;height:22px;background:linear-gradient(transparent,rgba(20,30,28,.95));pointer-events:none}'+
 '#modal .carte.fx180 .op180{flex:0 0 auto;height:var(--h180,206px);overflow-y:auto;display:flex;flex-direction:column;gap:6px}'+
 '#modal .carte.fx180 .op180 .op{flex:0 0 auto;margin:0!important}'+
 '#modal .carte.fx180 .pd180{flex:0 0 auto;font-size:12px;opacity:.8;max-height:3.4em;overflow:hidden}'+
 '#modal .carte.fx180.fic119 .tx180>p{color:#f4eee6;text-shadow:0 1px 2px #000}';document.head.appendChild(st)}
const FX180={base:null};
function fixe180(){try{const m=$('modal');if(!m||m.hidden)return;const c=m.querySelector('.carte');if(!c)return;const inn=c.querySelector(':scope>.in');if(!inn||!inn.querySelector('h2')||!inn.querySelector('.op,.annonce106'))return;
 if(inn.querySelector(':scope>.tx180')){ajuste180(c);return}
 c.classList.add('fx180');const kids=[...inn.childNodes],hd=document.createElement('div'),tx=document.createElement('div'),op=document.createElement('div'),pd=document.createElement('div');hd.className='hd180';tx.className='tx180';op.className='op180';pd.className='pd180';
 let zone='hd';kids.forEach(n=>{if(n.nodeType===3&&!n.textContent.trim()){return}const el=n.nodeType===1?n:null;
  if(el&&(el.classList.contains('op')||el.classList.contains('annonce106'))){zone='op';op.appendChild(n);return}
  if(zone==='op'){pd.appendChild(n);return}
  if(el&&(el.tagName==='P'||el.tagName==='UL'||el.tagName==='OL'||el.tagName==='BLOCKQUOTE'||el.tagName==='FIGURE'||el.tagName==='DETAILS'||el.tagName==='IMG'||(el.tagName==='DIV'&&zone==='tx'))){zone='tx';tx.appendChild(n);return}
  if(zone==='tx')tx.appendChild(n);else hd.appendChild(n)});
 inn.append(hd,tx,op);if(pd.childNodes.length)inn.append(pd);
 // la zone des boutons a toujours la place de trois boutons : le premier bouton tombe toujours au même endroit
 const b1=op.querySelector('.op,.annonce106');const hb=b1?b1.getBoundingClientRect().height:62;c.style.setProperty('--h180',Math.round(Math.max(3,Math.min(3,op.children.length))*(Math.max(54,hb)+6))+'px');
 tx.onmouseenter=()=>{tx.style.fontSize=(FX180.base*1.08)+'px'};tx.onmouseleave=()=>{tx.scrollTop=0;tx.style.fontSize=tx.dataset.fit+'px'};
 ajuste180(c)}catch(e){FX180.err=e.message}}
function ajuste180(c){const tx=c.querySelector('.tx180');if(!tx||tx.matches(':hover'))return;if(!FX180.base){FX180.base=parseFloat(getComputedStyle(tx).fontSize)||17}
 const cle=tx.textContent.length+'|'+tx.clientHeight;if(tx.dataset.k===cle)return;tx.dataset.k=cle;
 let f=FX180.base;tx.style.fontSize=f+'px';while(tx.scrollHeight>tx.clientHeight+1&&f>12){f-=.5;tx.style.fontSize=f+'px'}tx.dataset.fit=f;tx.classList.toggle('trop',tx.scrollHeight>tx.clientHeight+1)}
{const mo=new MutationObserver(()=>{clearTimeout(FX180.h);FX180.h=setTimeout(fixe180,0)});const go=()=>{const m=$('modal');if(m)mo.observe(m,{childList:true,subtree:true});else setTimeout(go,500)};go();addEventListener('resize',()=>{const c=document.querySelector('#modal .carte.fx180');if(c){const tx=c.querySelector('.tx180');if(tx)tx.dataset.k='';ajuste180(c)}})}
// les fiches de nature (sources, grosses pluies, glissements) sont des faits réels : elles ne sont plus marquées « imaginaire du jeu »
try{['resurgence177','grossesPluies179','glissement179'].forEach(k=>{if(EV[k])EV[k].nat=k==='grossesPluies179'?'Fait naturel de La Réunion (les bassins à tourbillon : récit transmis, non prouvé). Les choix sont inventés pour le jeu.':'Fait naturel de La Réunion. Les choix sont inventés pour le jeu.'})}catch(e){}
// ===== l'arc-en-ciel n'est plus un anneau géométrique : bandes de couleur aux bords fondus, ciel plus clair dedans,
// second arc très pâle, pieds qui s'effacent avant de toucher le relief, et un voile irrégulier qui le mêle à la pluie =====
(function arc180(){try{if(typeof AV146==='undefined'||!AV146.arc){setTimeout(arc180,1500);return}const a=AV146.arc;if(a.userData.v180)return;a.userData.v180=1;
 const g=new THREE.RingGeometry(7.6,12,128,6,0,Math.PI);
 const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,uniforms:{op:{value:0},t:{value:0}},
  vertexShader:'varying vec2 vp;void main(){vp=position.xy;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
  fragmentShader:'uniform float op;uniform float t;varying vec2 vp;'+
   'vec3 hsv(float h){vec3 k=clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.);return k;}'+
   'vec3 spec(float x){x=clamp(x,0.,1.);return mix(vec3(1.),hsv(clamp((.88-x)/.76,0.,1.)*.76),.72);}'+
   'float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}'+
   'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}'+
   'void main(){float r=length(vp);float a=vp.y/r;'+
   'float x=(r-9.0)/1.3;float b=smoothstep(-.3,.2,x)*(1.-smoothstep(.8,1.3,x));vec3 c=spec(x)*b*.55;'+
   'float dedans=smoothstep(-1.4,-.1,x)*(1.-smoothstep(-.1,.1,x))*.1;c+=vec3(dedans);'+
   'float x2=(r-10.9)/.9;float b2=smoothstep(-.3,.2,x2)*(1.-smoothstep(.8,1.3,x2))*.12;c+=spec(1.-x2)*b2;'+
   'float pied=smoothstep(.2,.78,a);'+
   'float voile=.45+.55*n(vec2(vp.x*.7+3.,vp.y*.2+t*.04))*(.55+.45*n(vec2(vp.x*6.,vp.y*.8-t*.9)));'+
   'gl_FragColor=vec4(c*pied*voile*op,1.0);}'});
 a.geometry.dispose();a.geometry=g;const m0=a.material;a.material=m;m.opacity=m0.opacity;
 a.onBeforeRender=()=>{m.uniforms.op.value=Math.min(1,m.opacity*2.6);m.uniforms.t.value=performance.now()/1000};
 }catch(e){}})();
