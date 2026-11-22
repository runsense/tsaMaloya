// ===== p207 : le timba, lamellophone venu du Mozambique et de Madagascar, qu'on entendait dans la danse des Noirs et le shéga ;
// il disparaît au début du XXᵉ siècle (le pikèr le remplace). Tant que le kabar joue avant 1900, quelques notes de timba s'y mêlent :
// une petite phrase en boucle, accordée sur cinq notes, sèche comme une lame pincée. Une reconstitution : aucun enregistrement n'existe. =====
{const PH=[[0,62],[.25,65],[.5,67],[.75,65],[1,69],[1.5,67],[1.75,65],[2,62],[2.5,60],[2.75,62]];let suiv=0;
 setInterval(()=>{try{if(!S||S.fin||(S.year||0)>=1900||typeof sTon!=='function'||!window.CUR194||SND.ambK!=='kabar')return;const c=SND.ctx;if(!c)return;const now=c.currentTime;if(now<suiv)return;
  const sp=CUR194.sp?CUR194.sp.gain.value:1,v=.03*Math.min(1,sp),dt=.21;PH.forEach(([t,m])=>{if(Math.random()<.12)return;const f=440*Math.pow(2,(m-69)/12);sTon(f,.18,{t:t*dt*2,v,a:.003,type:'triangle',fl:3000,vers:f*.995});sTon(f*3.01,.05,{t:t*dt*2,v:v*.25,a:.002})});
  suiv=now+PH[PH.length-1][0]*dt*2+dt*2*(1+Math.floor(Math.random()*2))}catch(e){}},300)}
