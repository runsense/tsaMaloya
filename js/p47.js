// ===== p47 : les bêtes n'ont pas toutes la même robe — chacune garde la sienne, tirée parmi les vraies =====
// Cabris (forme simple, quand le modèle animé n'est pas chargé) : roux, noir, blanc, brun, fauve, gris.
// Papangue : le mâle adulte est gris clair et blanc ; la femelle et le jeune sont bruns.
const ROBES_INST={vCabri:[[[1,1,1],3],[[.25,.24,.24],2],[[1.7,1.7,1.65],2],[[.55,.45,.4],2],[[1.25,1.05,.8],1],[[.85,.88,.9],1]],
 vPapang:[[[1.75,1.8,1.95],1],[[1,1,1],1]]};
{const vi=vie;vie=function(k){vi.apply(this,arguments);for(const key in ROBES_INST){const m=VIE[key];if(!m||!m.count||!m.instanceColor)continue;const L=ROBES_INST[key].map(([c,w])=>[c,0,w]),ids=animIds(m),C=new THREE.Color();
 for(let i=0;i<m.count;i++){const c=robeDe(L,ids[i]+(key==='vPapang'?500:0))[0];C.setRGB(c[0],c[1],c[2]);m.setColorAt(i,C)}m.instanceColor.needsUpdate=true}}}
