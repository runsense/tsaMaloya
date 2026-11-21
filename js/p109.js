// ===== p109 : la vue personnage (chasse) plus riche — herbes, fougères, fanjans, roches au sol ; une barre de vie,
// d'endurance, de mystique et d'armes ; des ratés, surtout chez les vieux =====

// ----- 1. Le sol de la vue personnage se garnit : touffes d'herbe, fougères, fanjans, roches de basalte -----
function vpSol109(){const V=VP;if(!V||!V.sc||V.sol109||typeof V.h!=='function')return;V.sol109=1;const R=55,rd=(a,b)=>a+Math.random()*(b-a);const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),E=new THREE.Euler(),P=new THREE.Vector3(),Sc=new THREE.Vector3();
 const mk=(geo,mat,n,f)=>{const im=new THREE.InstancedMesh(geo,mat,n);for(let i=0;i<n;i++){const a=f(i);P.set(a.x,V.h(a.x,a.z)+(a.y||0),a.z);E.set(a.rx||0,a.ry||0,a.rz||0);Q.setFromEuler(E);Sc.setScalar(a.s||1);M.compose(P,Q,Sc);im.setMatrixAt(i,M)}im.instanceMatrix.needsUpdate=true;V.sc.add(im);return im};
 const L=c=>new THREE.MeshLambertMaterial({color:c,side:THREE.DoubleSide,emissive:new THREE.Color(c).multiplyScalar(.35)});
 const pt=()=>{const a=Math.random()*6.28,r=4+Math.sqrt(Math.random())*R;return {x:Math.cos(a)*r,z:-30+Math.sin(a)*r}};
 mk(touffe109(),L(0x6a8a3a),2200,()=>{const p=pt();return {...p,y:-.02,ry:rd(0,6),s:rd(.6,1.4)}});
 const fg=new THREE.PlaneGeometry(.18,.9);fg.translate(0,.45,0);mk(fg,L(0x4f7d2c),900,i=>{const p=pt();return {...p,ry:rd(0,6),rx:rd(-.8,-.3),s:rd(.7,1.3)}});
 const tr=new THREE.CylinderGeometry(.09,.13,2.6,6);tr.translate(0,1.3,0);const n=70;const pts=[...Array(n)].map(pt);mk(tr,L(0x3a2a1a),n,i=>({...pts[i],s:rd(.7,1.4)}));
 const fr=new THREE.PlaneGeometry(.5,2.2);fr.translate(0,1.1,0);mk(fr,L(0x3f7a2c),n*8,i=>{const b=pts[Math.floor(i/8)],k=i%8;return {x:b.x,z:b.z,y:2.4,ry:k/8*6.28,rx:-1.2,s:rd(.8,1.2)}});
 mk(new THREE.DodecahedronGeometry(.6,0),L(0x2e2b2a),140,()=>{const p=pt();return {...p,y:.1,rx:rd(0,3),ry:rd(0,3),s:rd(.4,1.6)}})}

// ----- 2. Les barres du personnage incarné -----
{const st=document.createElement('style');st.textContent='#hud109{position:fixed;left:50%;transform:translateX(-50%);top:58px;z-index:99990;background:rgba(18,14,10,.8);border:1px solid #6a4a2a;border-radius:10px;padding:8px 10px;color:#f0e6d0;font:12px system-ui;min-width:200px}#hud109 .l{display:flex;align-items:center;gap:6px;margin:3px 0}#hud109 .l span{width:78px}#hud109 .b{flex:1;height:7px;background:#3a3226;border-radius:4px;overflow:hidden}#hud109 .b i{display:block;height:7px;border-radius:4px}';document.head.appendChild(st)}
function hud109(){let d=$('hud109');if(!VP||!VP.G||!VP.G.chef){if(d)d.remove();return}if(!d){d=document.createElement('div');d.id='hud109';document.body.appendChild(d)}const p=VP.G.chef;VP.end109=VP.end109==null?100:VP.end109;
 const vie=Math.round(p.sante!=null?p.sante:(S.sante||80)),myst=Math.round(Math.min(100,(S.myst||0)*5)),arm=VP.sag!=null?VP.sag:0;const ag=ageT(p);
 const l=(n,v,c,t)=>'<div class="l"><span>'+n+'</span><div class="b"><i style="width:'+Math.max(0,Math.min(100,v))+'%;background:'+c+'"></i></div><b style="width:34px;text-align:right">'+t+'</b></div>';
 d.innerHTML='<b>'+p.n.split(' ')[0]+'</b> <small style="opacity:.7">· '+ag+' ans'+(ag>=45?' — vise moins bien':'')+'</small>'+l('Vie',vie,vie>50?'#7fc36a':vie>25?'#e8be5a':'#d9705a',vie)+l('Endurance',VP.end109,'#6ab0d8',Math.round(VP.end109))+l('Mystique',myst,'#b48ae0',Math.round(S.myst||0))+l(S.voieC?'Balles':'Sagaies',arm*20,'#d8b070',arm)}
setInterval(()=>{try{if(!VP){const d=$('hud109');if(d)d.remove();return}vpSol109();const k=VP.keys||{};const court=k.ShiftLeft||k.Shift||k.shift;VP.end109=Math.max(0,Math.min(100,(VP.end109==null?100:VP.end109)+(court?-3:1.2)));hud109()}catch(e){}},250);

// ----- 3. Les ratés : plus on est vieux ou épuisé, plus le lancer part de travers -----
{const vl=vpLancer;vpLancer=function(o,cible,force){try{if(VP&&o===VP.chef&&VP.G&&VP.G.chef){const p=VP.G.chef,ag=ageT(p),fat=1-(VP.end109==null?100:VP.end109)/100;const ch=(ag>=55?.3:ag>=45?.15:.04)+fat*.25;VP.end109=Math.max(0,(VP.end109||100)-12);
 if(Math.random()<ch){const e=2.5+Math.random()*3;cible={x:cible.x+(Math.random()-.5)*e*2,y:cible.y+(Math.random()-.3)*e*.4,z:cible.z+(Math.random()-.5)*e*2};vpMsg(ag>=45?'Le bras ne suit plus : le lancer part de travers.':'Trop essoufflé : le lancer part de travers.')}}}catch(e){}return vl.call(this,o,cible,force)}}

// ----- 4. Histoire : le début de l'île se raconte tout seul. Le texte apparaît phrase après phrase, on a le temps de lire,
// puis la page suivante vient d'elle-même. Rien à cliquer, sauf « Passer » pour aller jouer tout de suite. -----
{let tmr=null;const pr=prologue;prologue=function(k){clearTimeout(tmr);const r=pr.apply(this,arguments);try{if(DIFC!=='histoire'||k>=PRO.length)return r;const e=$('ecran');const p=e&&e.querySelector('.bloc p');const pn=$('pn'),pv=$('pr');if(!p||!pn)return r;
 pn.style.display='none';if(pv)pv.style.display='none';const txt=p.innerHTML;const ph=txt.split(/(?<=[.!?…])\s+/);p.innerHTML='';const bar=document.createElement('div');bar.style.cssText='height:2px;background:#e8be5a;margin-top:10px;transform-origin:left;transform:scaleX(0)';p.after(bar);
 let i=0,tot=0;const lire=s=>Math.max(1600,s.replace(/<[^>]+>/g,'').length*55);ph.forEach(s=>tot+=lire(s));tot+=1800;const t0=performance.now();
 const suivante=()=>{if(i>=ph.length){tmr=setTimeout(()=>prologue(k+1),1800);return}const sp=document.createElement('span');sp.innerHTML=ph[i]+' ';sp.style.cssText='opacity:0;transition:opacity .9s';p.appendChild(sp);requestAnimationFrame(()=>sp.style.opacity=1);tmr=setTimeout(suivante,lire(ph[i]));i++};suivante();
 (function an(){if(!bar.isConnected)return;bar.style.transform='scaleX('+Math.min(1,(performance.now()-t0)/tot)+')';requestAnimationFrame(an)})();
 const ps=$('ps');if(ps)ps.addEventListener('click',()=>clearTimeout(tmr),true)}catch(e){}return r}}

// une touffe d'herbe : 7 brins fins, courbés vers l'extérieur (au lieu d'un cône pointu)
function touffe109(h){h=h||.5;const P=[],N=7;for(let i=0;i<N;i++){const a=i/N*6.283+Math.sin(i*7.1)*.4,l=h*(.65+.35*Math.abs(Math.sin(i*3.7))),w=.022,inc=.25+.2*Math.abs(Math.cos(i*2.3));
 const cx=Math.cos(a),cz=Math.sin(a),px=-cz*w,pz=cx*w,o=.03;
 const b0=[cx*o+px,0,cz*o+pz],b1=[cx*o-px,0,cz*o-pz],m0=[cx*(o+l*inc*.45)+px*.6,l*.55,cz*(o+l*inc*.45)+pz*.6],m1=[cx*(o+l*inc*.45)-px*.6,l*.55,cz*(o+l*inc*.45)-pz*.6],tp=[cx*(o+l*inc),l,cz*(o+l*inc)];
 P.push(...b0,...b1,...m0, ...b1,...m1,...m0, ...m0,...m1,...tp)}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.computeVertexNormals();return g}
