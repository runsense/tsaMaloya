
// ===== p148 : idées tirées des modèles envoyés par l’auteur (vagues, ouragan, bassin à cascades, rivières, plantes) =====
// 1) La houle et les déferlantes : tout autour de l'île, des bandes d'écume naissent au large et viennent mourir sur le rivage ;
//    la mer grossit avant un cyclone (vagues plus hautes, plus rapides, écume partout) et se calme après.
// 2) Les trous d'eau des cascades : un cercle de galets autour du bassin, des fougères et des herbes sur les berges, la cascade en deux chutes quand elle est haute.
const HOU148={M:null,mat:null};
function houleMat148(){if(HOU148.mat)return HOU148.mat;HOU148.mat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,uniforms:{t:{value:0},force:{value:.3}},
 vertexShader:'varying vec2 vU;uniform float t;uniform float force;void main(){vU=uv;vec3 p=position;p.y+=sin(uv.y*18.-t*1.6+uv.x*40.)*.012*force*(1.-uv.y);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}',
 fragmentShader:'varying vec2 vU;uniform float t;uniform float force;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}'+
 'void main(){float d=vU.y;float vit=.35+force*.6;float ph=fract(d*(3.+force*2.)+t*vit*.5);float crete=smoothstep(.0,.06,ph)*smoothstep(.22,.06,ph);float brise=n(vec2(vU.x*260.,d*8.+t))*.5+.5;'+
 'float rivage=smoothstep(.25,0.,d)*(.6+.4*sin(vU.x*500.+t*2.));float a=(crete*brise*(.35+force*.6)*(1.-d)+rivage*.55)*smoothstep(1.,.7,d);gl_FragColor=vec4(vec3(.96,.98,1.),a);}'});return HOU148.mat}
function houleBatir148(){if(typeof alt!=='function'||typeof xz!=='function')return null;const [cx,cz]=xz(55.53,-21.12),N=900,P=[];
 for(let i=0;i<=N;i++){const a=i/N*6.2832,dx=Math.cos(a),dz=Math.sin(a);let r=2,last=null;while(r<60){const x=cx+dx*r,z=cz+dz*r;if(alt(x,z)<=0){last=[x,z];break}r+=.08}if(last)P.push([last[0],last[1],dx,dz])}
 if(P.length<50)return null;
 // lissage du trait de côte (sinon des marches et des pointes dessinent des polygones dans le lagon)
 for(let it=0;it<4;it++){const Q=P.map((p,i)=>{const a=P[(i-1+P.length)%P.length],b=P[(i+1)%P.length];return [(a[0]+2*p[0]+b[0])/4,(a[1]+2*p[1]+b[1])/4,(a[2]+2*p[2]+b[2])/4,(a[3]+2*p[3]+b[3])/4]});P.splice(0,P.length,...Q)}
 const V=[],UV=[],I=[],L=.7,K=4;
 P.forEach((p,i)=>{const dl=Math.hypot(p[2],p[3])||1;for(let k=0;k<=K;k++){const d=k/K*L;V.push(p[0]+p[2]/dl*d,.008,p[1]+p[3]/dl*d);UV.push(i/P.length,k/K)}if(i){const q=P[i-1];if(Math.hypot(p[0]-q[0],p[1]-q[1])>.6)return;const o=(i-1)*(K+1);for(let k=0;k<K;k++){const a=o+k,b=o+k+1,c=o+K+1+k,e=o+K+2+k;I.push(a,c,b,b,c,e)}}});
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(V,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(UV,2));g.setIndex(I);
 const m=new THREE.Mesh(g,houleMat148());m.renderOrder=3;m.frustumCulled=false;return m}
(function boucle148(){requestAnimationFrame(boucle148);try{if(typeof scene==='undefined'||!scene||!S)return;if(!HOU148.M){HOU148.M=houleBatir148();if(HOU148.M)scene.add(HOU148.M);return}
  const U=houleMat148().uniforms;U.t.value=performance.now()/1000;const c=S.cyc;const cible=c?(c.in<=0?1:c.in===1?.75:c.in===2?.5:.3):.3;U.force.value+=(cible-U.force.value)*.01;
  HOU148.M.visible=dist<40&&!(typeof VP!=='undefined'&&VP)&&!(typeof K!=='undefined'&&K)}catch(e){}})();
// 2) les abords des cascades
setTimeout(function abords148(){try{if(typeof C147==='undefined'||!C147.L||!C147.riv){setTimeout(abords148,2000);return}
  const gal=new THREE.MeshLambertMaterial({color:0x8a857a}),gal2=new THREE.MeshLambertMaterial({color:0x6e6a62}),fe=new THREE.MeshLambertMaterial({color:0x3f7a2c,side:THREE.DoubleSide}),fe2=new THREE.MeshLambertMaterial({color:0x5c8f35,side:THREE.DoubleSide});
  const geoG=new THREE.DodecahedronGeometry(.012,0),geoF=new THREE.PlaneGeometry(.025,.07);geoF.translate(0,.035,0);
  C147.L.forEach((G,gi)=>{if(G.userData.ab148)return;G.userData.ab148=1;const pool=G.children.find(c=>c.geometry&&c.geometry.type==='CircleGeometry');if(!pool)return;const R=pool.geometry.parameters.radius,cz=pool.position.z;
   for(let k=0;k<14;k++){const a=k/14*6.283+gi,r=R*(1.05+((k*37)%10)/40);const s=new THREE.Mesh(geoG,k%3?gal:gal2);s.position.set(Math.cos(a)*r,.006,cz+Math.sin(a)*r);s.rotation.set(k,k*2,0);s.scale.setScalar(.8+((k*13)%7)/7);G.add(s)}
   for(let k=0;k<(G.userData.petite?0:10);k++){const a=k/10*6.283+gi*.7,r=R*(1.35+((k*29)%10)/25);for(let j=0;j<3;j++){const f=new THREE.Mesh(geoF,(k+j)%2?fe:fe2);f.position.set(Math.cos(a)*r,0,cz+Math.sin(a)*r);f.rotation.set(-.5-j*.2,j*2.1+k,0);G.add(f)}}
   // une haute chute se brise en deux : un replat de pierre à mi-hauteur
   const eau=G.children.find(c=>c.material&&c.material.uniforms&&c.geometry.parameters&&c.geometry.parameters.height);if(eau&&eau.geometry.parameters.height>.35){const H=eau.geometry.parameters.height,w=eau.geometry.parameters.width;
    const rep=new THREE.Mesh(new THREE.BoxGeometry(w*1.6,.015,.05),gal2);rep.position.set(0,H*.5,-.005);G.add(rep);const br=new THREE.Sprite(new THREE.SpriteMaterial({map:brumeTex147(),transparent:true,opacity:.35,depthWrite:false}));br.scale.set(w*2,w,1);br.position.set(0,H*.5+.01,.01);G.add(br)}})}catch(e){}},3000);
