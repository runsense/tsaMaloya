// ===== p235 : la brume de l'inconnu se lève en fondu — une case découverte s'éclaire peu à peu (environ une seconde et demie),
// et une case qui retombe dans l'ombre s'assombrit doucement, au lieu de basculer d'un coup. =====
const BR235={aff:null,cib:null,actif:false,t:0};
{const p0=peindre;peindre=function(){const r=p0.apply(this,arguments);try{if(!S||!stData||!T||!T.length)return r;const n=T.length;
  if(!BR235.aff||BR235.aff.length!==n){BR235.aff=new Float32Array(n);BR235.cib=new Uint8Array(n);T.forEach((t,i)=>{const k=(t.row*COLW+t.col)*4;BR235.aff[i]=stData[k];BR235.cib[i]=stData[k]});return r}
  T.forEach((t,i)=>{const k=(t.row*COLW+t.col)*4,c=stData[k];BR235.cib[i]=c;if(Math.abs(BR235.aff[i]-c)>.5){BR235.actif=true;stData[k]=Math.round(BR235.aff[i])}})}catch(e){}return r}}
{const b0=bat;bat=function(){try{if(BR235.actif&&S&&stData){const now=performance.now(),dt=Math.min(.1,(now-(BR235.t||now))/1000);BR235.t=now;let enc=false;
   T.forEach((t,i)=>{const a=BR235.aff[i],c=BR235.cib[i];if(a===c)return;const v=c<a?190:120;// on découvre plus vite qu'on n'oublie
    let n=a+Math.sign(c-a)*v*dt;if((c-a)*(c-n)<=0)n=c;BR235.aff[i]=n;stData[(t.row*COLW+t.col)*4]=Math.round(n);if(n!==c)enc=true});stTex.needsUpdate=true;BR235.actif=enc}else BR235.t=performance.now()}catch(e){}return b0.apply(this,arguments)}}
// une nouvelle partie repart sans fondu
{const nv=nouvelle;nouvelle=function(){BR235.aff=null;return nv.apply(this,arguments)}}
