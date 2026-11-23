// ===== p246 : la case sélectionnée n'a plus un contour plein, mais en pointillé — des points pour les marrons, des tirets pour les colons =====
setInterval(()=>{try{if(typeof terr==='undefined'||!terr||!terr.material||!terr.material.uniforms)return;const U=terr.material.uniforms;
  if(!U.vc){U.vc={value:0};terr.material.needsUpdate=true}U.vc.value=S&&S.voieC?1:0}catch(e){}},500);
