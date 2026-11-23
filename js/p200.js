// ===== p200 : le son dans l'île — volume et clarté de chaque source selon la distance (ou l'altitude).
// Les courbes se règlent dans l'Atelier Maloya (« Le son dans l'île ») ; on recopie ici ce que l’auteur y a dessiné. =====
const FR200=[0,.07,.13,.23,.4,.67,1];
const SRC200={kabar:{max:30,v:[100,100,96,85,67,38,20],c:[100,98,91,76,44,27,27]},
 cache:{max:20,v:[100,100,88,70,41,17,17],c:[44,44,40,33,22,6,6]},
 riviere:{max:6,v:[100,100,92,70,30,0,0],c:[100,100,95,85,70,50,40]},
 mer:{max:1500,v:[100,100,77,45,6,6,6],c:[100,100,95,85,70,55,50]},
 vent:{max:2500,v:[44,47,50,57,70,96,100],c:[100,100,100,100,100,100,100]}};
// volume (0 à 1) et coupure du filtre (Hz) d'une source à la distance x
function courbe200(k,x){const S0=SRC200[k];if(!S0)return {v:1,c:1,hz:18000};const f=Math.max(0,Math.min(1,x/S0.max)),at=A=>{for(let i=1;i<FR200.length;i++)if(f<=FR200[i]){const u=(f-FR200[i-1])/(FR200[i]-FR200[i-1]);return (A[i-1]+(A[i]-A[i-1])*u)/100}return A[A.length-1]/100};
 const v=at(S0.v),c=at(S0.c);return {v,c,hz:300*Math.pow(60,c)}}
