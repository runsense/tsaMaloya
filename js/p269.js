// ===== p269 : les cavernes de l'île sur la carte. Tunnels de lave, abris sous roche, grottes des remparts :
// coordonnées de l'inventaire des cavités (Spéléo Réunion, Grottocenter, liste Wikipédia) quand on les a ; sinon position approchée, dite comme telle.
// Celles que l'archéologie ou la tradition relient aux marrons le disent. Une petite entrée sombre les marque, côté marron, sur les terres connues. =====
const CAV269=[
 ['Caverne des Lataniers (caverne à Manzac)',55.615,-21.215,'Abri d’altitude vers 2 390 m, à la limite de Saint-Joseph et du Tampon. La tradition le lie au roi marron Manzac (du malgache mpanjaka, « roi »). Position approchée.','m'],
 ['Caverne de Cotte',55.6375,-21.2357,'Plus de 2 200 m, massif de la Fournaise. Les rapports des chasseurs d’esclaves y placent une attaque en juin 1758 ; des sondages archéologiques y ont été faits.','m'],
 ['Grottes du Roi Phaonce',55.392,-21.125,'Quatre cavités vers le Piton Rouge et le Grand Bénare, que la mémoire attache au chef marron Phaonce. Position approchée.','m'],
 ['Caverne Dufour',55.4835,-21.1055,'Sous le Piton des Neiges : abri des montées vers le sommet, refuge aujourd’hui.','r'],
 ['Grotte des Premiers Français',55.2785,-21.0105,'Saint-Paul : l’abri lié aux premiers habitants de l’île en 1663.','h'],
 ['Trou de la Plaine-des-Palmistes',55.6564,-21.1136,'Tunnel de lave de 947 m.','n'],
 ['Caverne des Fées',55.6239,-21.1586,'Tunnel de lave de 820 m, Plaine-des-Palmistes.','n'],
 ['Caverne Bateau',55.5622,-21.1842,'Le plus long tunnel de lave connu de l’île (1 910 m), au Tampon.','n'],
 ['Grotte des Salanganes',55.2567,-21.0464,'Tunnel de lave de Saint-Paul, où nichent les salanganes.','n'],
 ['Caverne de Bernica',55.2769,-21.0269,'Saint-Paul, 369 m.','n'],
 ['Caverne de la Tortue',55.2472,-21.0703,'Saint-Gilles : on y a trouvé des os d’oiseaux disparus de l’île.','n'],
 ['Grotte de la Grande Ravine',55.2994,-21.1119,'Les Trois-Bassins, 500 m.','n'],
 ['Caverne du Brûlé de Citron-Galet',55.8,-21.2983,'Saint-Philippe, 820 m de tunnel sous les coulées.','n'],
 ['Tunnel des Gendarmes',55.7944,-21.3342,'Saint-Philippe, 340 m.','n']];
const C269={G:null,cle:''};
function tex269(){const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d');g.fillStyle='rgba(60,52,44,.95)';g.beginPath();g.moveTo(6,56);g.quadraticCurveTo(10,10,32,8);g.quadraticCurveTo(54,10,58,56);g.closePath();g.fill();g.fillStyle='rgba(8,6,5,1)';g.beginPath();g.moveTo(18,56);g.quadraticCurveTo(20,26,32,24);g.quadraticCurveTo(44,26,46,56);g.closePath();g.fill();g.strokeStyle='rgba(230,210,170,.9)';g.lineWidth=3;g.beginPath();g.moveTo(6,56);g.quadraticCurveTo(10,10,32,8);g.quadraticCurveTo(54,10,58,56);g.stroke();return new THREE.CanvasTexture(c)}
setInterval(()=>{try{if(typeof scene==='undefined')return;const cache=!S||S.voieC||(typeof K!=='undefined'&&K)||(typeof CV!=='undefined'&&CV.on);if(C269.G)C269.G.visible=!cache;if(cache)return;
 if(!C269.v)C269.v=CAV269.map(([n,lo,la,d,k])=>{const [x,z]=xz(lo,la);return {n,x,z,d,k,t:tileAt({x,z})}});
 const L=C269.v.filter(c=>c.t&&seen(c.t));const cle=L.map(c=>c.n).join('|');if(cle===C269.cle)return;C269.cle=cle;
 if(C269.G){scene.remove(C269.G);C269.G=null}C269.tex=C269.tex||tex269();const G=new THREE.Group();
 L.forEach(c=>{const s=new THREE.Sprite(new THREE.SpriteMaterial({map:C269.tex,transparent:true,opacity:.9,depthWrite:false}));s.position.set(c.x,Math.max(0,altTri(c.x,c.z))*VX+.07,c.z);s.scale.set(.09,.09,1);s.renderOrder=6;G.add(s)});
 scene.add(G);C269.G=G}catch(e){}},2600);
{const nv=nouvelle;nouvelle=function(){C269.cle='';return nv.apply(this,arguments)}}
// le panneau 👑 : les cavernes connues
{const f0=figures263;figures263=function(){const r=f0.apply(this,arguments);try{const p=document.getElementById('fig263');if(!p||!S||S.voieC||!C269.v)return r;const L=C269.v.filter(c=>c.t&&seen(c.t));if(!L.length)return r;
 const d=document.createElement('div');d.style.cssText='margin-top:12px;border-top:1px solid #6a5a40;padding-top:8px';
 d.innerHTML='<b>🕳 Les cavernes connues</b>'+L.map(c=>'<div style="margin:4px 0;font-size:13px"><b>'+c.n+'</b>'+(c.k==='m'?' · <i>mémoire marronne</i>':'')+' — '+c.d+'</div>').join('');p.appendChild(d)}catch(e){}return r}}
{const b=document.getElementById('fig263b');if(b)b.onclick=()=>figures263()}
// la carte de la caverne : base historique corrigée
try{EV.cav268.h='Sites étudiés (Archéologie dans l’océan Indien, Portail de l’esclavage) : les abris de la Vallée secrète à Cilaos, seul site où l’occupation marronne est prouvée (1809-1835) ; l’abri HBC13 au Bras Caron ; la caverne de Cotte, citée dans les archives des chasseurs pour une attaque en juin 1758. Les marrons laissaient volontairement très peu de traces.'}catch(e){}
