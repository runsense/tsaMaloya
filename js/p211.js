// ===== p211 : les fanjans femelles et d'Australie reprennent la forme du fanjan sculpté (le modèle 3D), au lieu des frondes plates dessinées par le code =====
// On les distingue par la teinte, comme dans la forêt : excelsa d'un vert plus vif, glauca bleutée (« glauque »), cooperi plus jaune.
{const T211={Ex:[.9,1.06,.9],Gl:[.82,.95,1.02],Co:[1.05,1.05,.78]};let fait=false;
 setInterval(()=>{try{if(fait||typeof MOD==='undefined'||typeof MESHY_OK==='undefined'||MESHY_OK.fanjan!=='ok'||!MOD.fanjan||!MOD.fanjanEx)return;
  Object.keys(T211).forEach(k=>{const m=MOD['fanjan'+k];if(!m)return;const vieux=m.geometry;m.geometry=MOD.fanjan.geometry;const mt=MOD.fanjan.material.clone();mt.color.setRGB(...T211[k]);m.material=mt;m.instanceMatrix.needsUpdate=true;if(vieux!==MOD.fanjan.geometry)vieux.dispose()});fait=true}catch(e){}},1500)}
