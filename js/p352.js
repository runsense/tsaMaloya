// ===== p352 : le rendu aquarelle partout. Chaque vue 3D du jeu (la carte, le camp, les marches, la chasse, les petits jeux)
// passe par un même filtre : lavis (les couleurs se fondent un peu), trait d'encre sur les contours, grain du papier,
// couleurs adoucies vers le ton chaud du papier, bords légèrement tremblés comme à la main. Les jeux dessinés en 2D
// (échecs, bataille, espion) reçoivent le grain du papier et le même adoucissement. Désactivable : touche F8. =====
const AQ352={on:(()=>{try{return localStorage.getItem('tsa-aqua')!=='0'}catch(e){return true}})()};
(function(){const V=new THREE.Vector2();
 const mat=new THREE.ShaderMaterial({uniforms:{tD:{value:null},al:{value:0},lite:{value:0},px:{value:new THREE.Vector2(1/800,1/600)}},depthTest:false,depthWrite:false,
  vertexShader:'varying vec2 vU;void main(){vU=uv;gl_Position=vec4(position.xy,0.,1.);}',
  fragmentShader:`uniform sampler2D tD;uniform float al;uniform float lite;uniform vec2 px;varying vec2 vU;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float L(vec3 c){return dot(c,vec3(.299,.587,.114));}
vec3 T(vec2 u){vec4 t=texture2D(tD,u);return al>.5?t.rgb/max(t.a,.004):t.rgb;}
void main(){vec2 q=gl_FragCoord.xy;vec2 w=vec2(n(q*.045),n(q*.045+17.))-.5;vec2 u=vU+w*px*1.6*(1.-lite);
 vec3 c=T(u);vec3 b=(T(u+px*vec2(2.,0.))+T(u-px*vec2(2.,0.))+T(u+px*vec2(0.,2.))+T(u-px*vec2(0.,2.)))*.25;c=mix(c,b,.4*(1.-lite));
 float a=L(T(u+px*vec2(-1.,1.))),bb=L(T(u+px*vec2(0.,1.))),cc=L(T(u+px*vec2(1.,1.))),d=L(T(u+px*vec2(-1.,0.))),f=L(T(u+px*vec2(1.,0.))),g=L(T(u+px*vec2(-1.,-1.))),hh=L(T(u+px*vec2(0.,-1.))),ii=L(T(u+px*vec2(1.,-1.)));
 float gx=-a-2.*d-g+cc+2.*f+ii,gy=-a-2.*bb-cc+g+2.*hh+ii,e=length(vec2(gx,gy));
 
 float l=L(c);c=mix(vec3(l),c,.85);
 float gr=n(q*.42)*.55+n(q*.09)*.45;vec3 paper=vec3(.98,.95,.88);
 c*=mix(.93,1.05,gr);c=pow(max(c,0.),vec3(.9));c=mix(c,c*paper,.35)+(paper-c)*.08;
 float ink=smoothstep(.10,.36,e)*(.75+.25*n(q*.3));c=mix(c,c*vec3(.32,.27,.22),ink*.5);
 float A=al>.5?texture2D(tD,vU).a:1.;gl_FragColor=vec4(c*A,A);}`});
 const quad=new THREE.Mesh(new THREE.PlaneGeometry(2,2),mat);quad.frustumCulled=false;const qs=new THREE.Scene();qs.add(quad);const qc=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
 const patch=inst=>{if(!inst||inst.__p352)return inst;inst.__p352=1;const r0=inst.render;inst.render=function(sc,cam){try{if(!AQ352.on||this.__aq||this.getRenderTarget()!==null||!this.autoClear||(this.getScissorTest&&this.getScissorTest())||sc===qs)return r0.apply(this,arguments);
   if(this.__alpha===undefined){try{const at=this.getContext().getContextAttributes();this.__alpha=!!(at&&at.alpha)}catch(e){this.__alpha=true}}mat.uniforms.al.value=this.__alpha?1:0;
   this.getDrawingBufferSize(V);const ec0=(typeof MOT357!=='undefined'&&MOT357.echelle)||1;this.__ec=this.__ec==null?ec0:this.__ec+(ec0-this.__ec)*.04;const ec=Math.round(this.__ec*40)/40,W=Math.max(1,V.x*ec|0),H=Math.max(1,V.y*ec|0);let rt=this.__rt352;
   if(!rt||rt.width!==W||rt.height!==H){if(rt)rt.dispose();rt=this.__rt352=new THREE.WebGLRenderTarget(W,H,{minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBAFormat});}
   rt.texture.encoding=this.outputEncoding;const vp=new THREE.Vector4();this.getViewport(vp);
   this.setRenderTarget(rt);r0.call(this,sc,cam);this.setRenderTarget(null);this.setViewport(vp);
   {const lc=(typeof MOT357!=='undefined'&&MOT357.liteC)||0,u=mat.uniforms.lite;u.value+=(lc-u.value)*.03}mat.uniforms.tD.value=rt.texture;mat.uniforms.px.value.set(1/W,1/H);this.__aq=1;const ac=this.autoClear;r0.call(this,qs,qc);this.autoClear=ac;this.__aq=0}catch(e){this.__aq=0;window.__e352=String(e&&e.stack||e).slice(0,300);return r0.apply(this,arguments)}};return inst};
 const W0=THREE.WebGLRenderer;try{const Wn=function(p){return patch(new W0(p))};Wn.prototype=W0.prototype;THREE.WebGLRenderer=Wn}catch(e){}
 try{if(typeof R!=='undefined'&&R&&R.render)patch(R)}catch(e){}window.aqPatch352=patch;window.AQMAT352=mat;
})();
// les jeux en 2D : le grain du papier par-dessus, et le même adoucissement des couleurs
(function(){const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');g.fillStyle='#f4ecd8';g.fillRect(0,0,256,256);for(let i=0;i<5000;i++){const v=Math.random();g.fillStyle='rgba('+(v<.5?120:255)+','+(v<.5?100:250)+','+(v<.5?70:235)+','+(.04+Math.random()*.08)+')';g.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2)}
 const url=c.toDataURL();const st=document.createElement('style');st.id='aq352';
 const regle=()=>{st.textContent=AQ352.on?'canvas.aq352-2d{filter:saturate(.85) sepia(.12) contrast(.96)}#ech canvas.aq352-2d,#bat canvas.aq352-2d,#galc{background-image:url('+url+')}':''};regle();document.head.appendChild(st);
 {const gc=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t){const r=gc.apply(this,arguments);try{if(t==='2d'&&r&&!this.dataset.aq352){this.dataset.aq352=1;this.classList.add('aq352-2d')}}catch(e){}return r}}
 window.addEventListener('keydown',e=>{if(e.key==='F8'){AQ352.on=!AQ352.on;try{localStorage.setItem('tsa-aqua',AQ352.on?'1':'0')}catch(x){}regle();try{toast(AQ352.on?'Rendu aquarelle':'Rendu d’origine')}catch(x){}}})})();
