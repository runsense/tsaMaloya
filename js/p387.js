// ===== p387 : vivre dans une grotte se voit. Un camp installé dans une grotte (la grotte des Premiers Français de Payen
// jusqu'à l'arrivée de Regnault en 1665, ou une grotte trouvée par un camp marron) n'a pas de cases : on voit une paroi
// de roche avec son entrée sombre, et devant, les cultures en rangs (maïs, patates douces, tabac) et le foyer. =====
function grotte387(t,o){try{if(!S)return false;if((S.grotteI||[]).includes(t.i))return true;
 if(S.voieC&&S.year<1666&&!S.regn386&&camps().length&&camps()[0].i===t.i)return true}catch(e){}return false}
const G387={g:null,cle:''};
function grotteDessin387(t){if(typeof scene==='undefined')return;
 if(!G387.g){G387.g=new THREE.Group();scene.add(G387.g)}
 // une paroi à l'arrière (vers le haut de la pente), percée d'une entrée sombre
 let ux=0,uz=-1;try{const d=.6,gx=alt(t.x+d,t.z)-alt(t.x-d,t.z),gz=alt(t.x,t.z+d)-alt(t.x,t.z-d),n=Math.hypot(gx,gz);if(n>1){ux=gx/n;uz=gz/n}}catch(e){}
 const px=-uz,pz=ux,cx=t.x+ux*.42,cz=t.z+uz*.42,ry=Math.atan2(-ux,-uz);
 // la paroi : des rochers en arc, plus gros au centre et au-dessus
 for(let k=0;k<15;k++){const f=(k/14)*2-1,hx=cx+px*f*.48+ux*Math.abs(f)*.05,hz=cz+pz*f*.48+uz*Math.abs(f)*.05,ht=(1-f*f)*.16;
  hutC.setRGB(.62,.58,.54);poseM(MOD.rocher,hx,alt(hx,hz)*VX+ht*(k%2?1:.4),hz,rndH(t.i+k)*6.28,0,0,1.25+(1-Math.abs(f))*1.1,hutC)}
 for(let k=0;k<7;k++){const f=(k/6)*2-1,hx=cx+px*f*.22+ux*.04,hz=cz+pz*f*.22+uz*.04;hutC.setRGB(.55,.52,.5);poseM(MOD.rocher,hx,alt(hx,hz)*VX+.2,hz,rndH(t.i*3+k)*6.28,0,0,1.1,hutC)}
 // l'entrée : une bouche sombre, tournée vers le bas de la pente
 const cle=t.i+'_'+cx.toFixed(3);if(!G387.g.getObjectByName(cle)){const m=new THREE.Mesh(new THREE.CircleGeometry(.11,20,0,Math.PI),new THREE.MeshBasicMaterial({color:0x0b0907,side:THREE.DoubleSide}));
  m.name=cle;m.scale.set(1.25,1,1);m.position.set(cx-ux*.12,alt(cx-ux*.12,cz-uz*.12)*VX+.005,cz-uz*.12);m.rotation.y=ry;G387.g.add(m)}
 // devant : les cultures en rangs, du côté de la baie
 const fx=t.x-ux*.35,fz=t.z-uz*.35;
 for(let r=0;r<5;r++)for(let k=0;k<9;k++){const ox=(k-4)*.07,oz=(r-2)*.075,x=fx+px*ox-ux*oz,z=fz+pz*ox-uz*oz;if(alt(x,z)<3)continue;
  const v=r%3;hutC.setRGB(v===0?.55:v===1?.42:.6,v===0?.85:v===1?.7:.75,v===0?.3:v===1?.25:.35);poseM(MOD.herbe,x,alt(x,z)*VX+.02,z,rndH(r*13+k)*6.28,0,0,v===0?1.25:.8,hutC)}
}
// à chaque nouvelle peinture, les bouches d'ombre des grottes qui ne sont plus habitées disparaissent
{const p0=peindre;peindre=function(){if(G387.g){G387.g.children.slice().forEach(m=>{if(!m.isMesh||!/^\d/.test(m.name))return;const i=+m.name.split('_')[0];const o=S&&S.t[i];if(!o||o.b!=='camp'||!grotte387(T[i],o)){G387.g.remove(m);m.geometry.dispose()}})}return p0.apply(this,arguments)}}
