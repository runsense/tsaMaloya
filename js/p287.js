// ===== p287 : les incarnations — on JOUE le chemin qui fait d'un fugitif un roi (ou une reine) marron.
// Comme la Vie en personnage : on mène le héros à pied, ses compagnons le suivent. Le parcours suit le vrai relief et les vraies
// vallées (rivière du Mât, Bras de la Plaine, Rivière des Galets…) : la plantation au départ, puis une forêt de plus en plus
// primaire à mesure qu'on s'éloigne des Bas. La forêt est un labyrinthe : de fausses pistes finissent en cul-de-sac, les chasseurs
// et leurs chiens gardent certains passages. À l'arrivée, on revient dans l'histoire : la partie reprend à son époque, le héros
// à la tête du camp. Dans le récit, on l'appelle par son nom malgache quand il est connu ; le nom retenu par l'histoire est à côté. =====
const INC287={
 simang:{n:'Simangavole',sous:'Des parents à la plantation jusqu’aux Trois Salazes',fin:{f:'sim'},ch:[
  {t:'Anchaing et Héva — la fuite',an:'autrefois',passe:1,heros:{n:'Anchaing',m:'jeune_pagne'},comp:[{n:'Héva',m:'femme_drapee'}],
   obj:'Remonter la Rivière du Mât jusqu’au piton',b0:0,b1:2,chas:3,faux:7,
   route:[[55.655,-20.962],[55.600,-21.000],[55.545,-21.030],[55.515,-21.060],[55.483,-21.075]],
   intro:'Bien avant Simangavole, il y a eu ses parents. Une nuit, Anchaing et Héva quittent une habitation de l’Est, près de l’embouchure de la Rivière du Mât. Il faut remonter la rivière, quitter les cannes, entrer dans la forêt, et ne pas se faire voir.',
   finT:'Ils montent au sommet d’un piton si raide que personne ne les y suivra. C’est là que naîtront leurs filles.',
   v:'Anchaing et Héva viennent de la tradition (Vinson, Leal, Dayot) ; on ne trouve pas ce couple dans les archives. On ne connaît pas leurs noms malgaches. Le tracé suit la vallée réelle de la Rivière du Mât, vers Salazie.'},
  {t:'Simangavole — vers les Trois Salazes',an:'vers 1740',heros:{n:'Simangavole',m:'femme_sagaie'},comp:[{n:'une sœur',m:'femme_travail'},{n:'un jeune du piton',m:'jeune_pagne'}],
   obj:'Rejoindre les cavernes des Trois Salazes',b0:2,b1:4,chas:2,faux:6,
   route:[[55.483,-21.075],[55.492,-21.100],[55.4513,-21.1117]],
   intro:'Des années plus tard. Simangavole, l’une des filles d’Anchaing et d’Héva, quitte le piton. Elle passe sous les remparts du Piton des Neiges, par les hauts de Salazie, vers les Trois Salazes, où Matouté et sa bande vivent dans les cavernes.',
   finT:'Au pied des Trois Salazes, Matouté l’attend. Ici, c’est elle qu’on écoutera : guerrière et conseillère, elle siège avec les chefs.',
   v:'Selon C.-H. Leal, Simangalove (Simangavole) est la compagne du chef Matouté, dans une caverne des Trois Salazes, « guerrière et conseillère » ; le portail de l’esclavage la compte comme onzième chef. Sa filiation avec Anchaing et Héva vient de la tradition.'}]},
 laverdure:{n:'Laverdure',sous:'D’une habitation du Sud au roi de tous les marrons',fin:{f:'epo',k:'laverdure'},ch:[
  {t:'La fuite par la Rivière Saint-Étienne',an:'vers 1735',heros:{n:'l’homme qu’on appellera Laverdure',m:'jeune_pagne'},comp:[],
   obj:'Remonter vers le Bras de la Plaine',b0:0,b1:2,chas:3,faux:7,
   route:[[55.420,-21.275],[55.455,-21.225],[55.5304,-21.1824]],
   intro:'Il vient de Madagascar ; le nom qu’il portait là-bas ne nous est pas parvenu. Les maîtres l’appellent Laverdure. Une nuit, il quitte une habitation des Bas du Sud et remonte la Rivière Saint-Étienne.',
   finT:'À l’îlette du Bras de la Plaine, des fumées : un camp. On l’accueille.',
   v:'Laverdure est connu par les archives de 1752 (rapports de détachement) ; son nom d’origine et sa date de fuite ne sont pas connus. La remontée suit la vraie vallée de la Rivière Saint-Étienne et du Bras de la Plaine.'},
  {t:'Tsaralava, et l’îlette',an:'vers 1740',heros:{n:'Laverdure',m:'jeune_pagne'},comp:[{n:'Tsaralava',m:'femme_sagaie'},{n:'Sarcemate',m:'p1a_chasseur'}],
   obj:'Rallier les camps du haut du Bras de la Plaine',b0:2,b1:3,chas:2,faux:6,
   route:[[55.5304,-21.1824],[55.556,-21.172]],
   intro:'Au camp de l’îlette, il a rencontré Tsaralava. Ensemble, avec Sarcemate, ils remontent le Bras de la Plaine pour rallier les camps du haut : tous se rassembleront à l’îlette.',
   finT:'Les chefs des autres camps viennent saluer. Les détachements l’apprendront aussi : on l’appelle « le roi de tous les marrons ».',
   v:'Les archives de 1752 nomment Laverdure « roi de tous les marrons », marié à Sarlave, avec Sarcemate pour lieutenant. La forme malgache Tsaralava est donnée par certains auteurs ; son sens n’est pas établi.'}]},
 dimitile:{n:'Dimitile',sous:'Dimy devient le guetteur',fin:{f:'epo',k:'dimitile'},ch:[
  {t:'Dimy',an:'vers 1730',heros:{n:'Dimy',m:'jeune_pagne'},comp:[],
   obj:'Monter vers les hauteurs de l’Entre-Deux',b0:0,b1:2,chas:3,faux:7,
   route:[[55.445,-21.268],[55.470,-21.230],[55.4818,-21.1865]],
   intro:'Il a été pris à Madagascar avec sa famille, raconte-t-on. À Bourbon, il est vendu ; il s’enfuit peu après. Dimy monte vers les hauteurs au-dessus de l’Entre-Deux.',
   finT:'Sur le plateau, on voit tout : la mer, les Bas, les sentiers des chasseurs. Dimy devient Dimy-tily — celui qui guette. On dira Dimitile.',
   v:'Dimitile mène une troupe de 24 marrons en 1743 (portail de l’esclavage). Sa capture à Madagascar et son achat par un « abbé Criais » sont rapportés par Wikipédia sans source d’archive précise ; l’étymologie Dimy + tily (« le guet ») est une explication proposée.'}]},
 mafate:{n:'Mafate',sous:'Du rivage au fond du grand cirque',fin:{f:'epo',k:'mafate'},ch:[
  {t:'La Rivière des Galets',an:'vers 1735',heros:{n:'Mafate',m:'mystique'},comp:[{n:'une femme qui le suit',m:'femme_travail'}],
   obj:'Remonter la Rivière des Galets jusqu’au cirque',b0:0,b1:2,chas:3,faux:7,
   route:[[55.300,-20.945],[55.360,-20.985],[55.4092,-21.0552]],
   intro:'Il connaît les plantes qui soignent et celles qui endorment. Il quitte les Bas de Saint-Paul et remonte la Rivière des Galets, dans les gorges, vers le grand cirque.',
   finT:'Au fond du cirque, les gens viennent à lui pour être soignés. On l’écoute : il parle aux ancêtres.',
   v:'Mafate le guérisseur relève surtout de la tradition ; on rattache son nom au malgache (mahafaty, « qui tue » ou « dangereux »), sans certitude. Mussard passe pour l’avoir surpris vers 1751.'}]},
 cimendef:{n:'Cimendef',sous:'Tsy-andevo, celui qui n’est pas esclave',fin:{f:'epo',k:'cimendef'},ch:[
  {t:'Le nom choisi',an:'vers 1735',heros:{n:'Tsy-andevo',m:'p1a_chasseur'},comp:[],
   obj:'Gagner les pics entre Mafate et Salazie',b0:0,b1:3,chas:3,faux:7,
   route:[[55.470,-20.900],[55.468,-20.960],[55.474,-21.038]],
   intro:'Il fuit les Bas du Nord et monte vers l’intérieur. En chemin, il laisse son nom d’esclave : il s’appellera Tsy-andevo, « pas esclave ».',
   finT:'Sur la crête, il refuse de partager ses pics. Plus tard, Marianne, une fille d’Anchaing selon la tradition, viendra s’unir à lui.',
   v:'Le nom de Cimendef figure sur la carte de Selhausen (1812) et reste attaché au piton entre Mafate et Salazie ; on le rattache au malgache tsy andevo, « pas esclave ». Sa fuite et ses dates ne sont pas documentées.'}]},
 baal:{n:'Baal',sous:'Le lieutenant de Pitre devient grand roi (tradition)',fin:{f:'epo',k:'baal'},ch:[
  {t:'Vers Cilaos',an:'vers 1725',heros:{n:'Baal',m:'p1a_chasseur'},comp:[{n:'un guerrier',m:'p1a_chasseur'},{n:'un guerrier',m:'jeune_pagne'}],
   obj:'Remonter le Bras de Cilaos jusqu’au cirque',b0:1,b1:3,chas:3,faux:7,
   route:[[55.440,-21.250],[55.465,-21.200],[55.475,-21.140]],
   intro:'Le grand chef Pitre est mort, raconte la tradition. Son lieutenant, Baal, mène les siens vers un cirque fermé, avec des sources chaudes : Cilaos.',
   finT:'Dans le cirque, Baal se proclame grand roi de l’intérieur et fait de Cilaos sa capitale.',
   v:'Baal (Bâlle), Pitre et le partage des sommets viennent de la tradition rapportée par Eugène Dayot (Bourbon pittoresque, roman publié en 1848). Aucune archive ne les nomme.'}]},
 fatie:{n:'Fatie',sous:'Le roi des Nuages monte au Piton des Neiges (tradition)',fin:{f:'epo',k:'fatie'},ch:[
  {t:'Le Piton des Neiges',an:'vers 1730',heros:{n:'Fatie',m:'jeune_pagne'},comp:[],
   obj:'Monter de Cilaos au sommet',b0:2,b1:4,chas:1,faux:6,
   route:[[55.475,-21.135],[55.486,-21.110],[55.479,-21.099]],
   intro:'Baal partage les sommets entre ses meilleurs hommes. À Fatie, il donne le plus haut : le Piton des Neiges.',
   finT:'Au sommet, dans les nuages, on voit les trois cirques. On l’appellera le roi des Nuages.',
   v:'Fatie (Feti), « roi des Nuages », vient de la tradition rapportée par Eugène Dayot. La montée suit le sentier actuel de Cilaos au sommet.'}]},
 anchaing:{n:'Anchaing et Héva',sous:'La fuite jusqu’au piton',fin:{f:'epo',k:'anchaing'},ch:null}};
INC287.anchaing.ch=[INC287.simang.ch[0]];
// le tracé réel : on suit la rivière telle que le jeu l'a tracée sur le relief, puis, d'un repère à l'autre, le passage le plus
// praticable (fonds de vallée, cols), comme les sentiers — un calcul de plus court chemin sur l'altitude réelle.
function incRoute287(C){if(C._rp)return C._rp;const W=C.route.map(([lo,la])=>xz(lo,la));let out=[];
 if(C.riv){try{if(!window.RIV126||!RIV126.length)window.RIV126=riv126Calc()}catch(e){}const r=(window.RIV126||[]).find(r=>r.n===C.riv);if(r){const R=r.P.slice().reverse(),cible=xz(...C.rivJ);let bi=0,bd=1e9;R.forEach((q,i)=>{const d=Math.hypot(q[0]-cible[0],q[1]-cible[1]);if(d<bd){bd=d;bi=i}});out=R.slice(0,bi+1).map(q=>[q[0],q[1]]);W.unshift(out[out.length-1])}}
 for(let i=0;i<W.length-1;i++){const seg=incAstar287(W[i],W[i+1]);out=out.concat(out.length?seg.slice(1):seg)}
 if(!out.length)out=W;C._rp=out;return out}
function incAstar287(a,b){const st=.12,x0=Math.min(a[0],b[0])-1.5,z0=Math.min(a[1],b[1])-1.5,x1=Math.max(a[0],b[0])+1.5,z1=Math.max(a[1],b[1])+1.5,nx=Math.ceil((x1-x0)/st)+1,nz=Math.ceil((z1-z0)/st)+1;
 const H=new Float32Array(nx*nz);for(let j=0;j<nz;j++)for(let i=0;i<nx;i++)H[j*nx+i]=alt(x0+i*st,z0+j*st);
 const id=(i,j)=>j*nx+i,si=Math.round((a[0]-x0)/st),sj=Math.round((a[1]-z0)/st),ti=Math.round((b[0]-x0)/st),tj=Math.round((b[1]-z0)/st);
 const g=new Float32Array(nx*nz).fill(1e9),from=new Int32Array(nx*nz).fill(-1),ouv=[];const push=(f,n)=>{ouv.push([f,n]);let k=ouv.length-1;while(k>0){const p=(k-1)>>1;if(ouv[p][0]<=ouv[k][0])break;[ouv[p],ouv[k]]=[ouv[k],ouv[p]];k=p}};
 const pop=()=>{const t=ouv[0],l=ouv.pop();if(ouv.length){ouv[0]=l;let k=0;for(;;){const a2=2*k+1,b2=a2+1;let m=k;if(a2<ouv.length&&ouv[a2][0]<ouv[m][0])m=a2;if(b2<ouv.length&&ouv[b2][0]<ouv[m][0])m=b2;if(m===k)break;[ouv[m],ouv[k]]=[ouv[k],ouv[m]];k=m}}return t};
 const s0=id(si,sj),t0=id(ti,tj);g[s0]=0;push(0,s0);const D=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1],[2,1],[1,2],[-2,1],[-1,2],[2,-1],[1,-2],[-2,-1],[-1,-2]];let it=0;
 while(ouv.length&&it++<400000){const [,n]=pop();if(n===t0)break;const i=n%nx,j=(n-i)/nx,h=H[n];for(const [di,dj] of D){const I=i+di,J=j+dj;if(I<0||J<0||I>=nx||J>=nz)continue;const m=id(I,J),hm=H[m];if(hm<=0)continue;const L=Math.hypot(di,dj)*st,sl=Math.abs(hm-h)/(L*1000),c=g[n]+L*(1+30*sl*sl+4*sl+(hm>h?(hm-h)/1000*1.5:0));if(c<g[m]){g[m]=c;from[m]=n;push(c+Math.hypot(I-ti,J-tj)*st,m)}}}
 const out=[];let n=t0;if(from[n]<0&&n!==s0)return [a,b];while(n>=0){const i=n%nx,j=(n-i)/nx;out.push([x0+i*st,z0+j*st]);if(n===s0)break;n=from[n]}out.reverse();out[0]=a;out[out.length-1]=b;return out}
// ----- le moteur -----
let INC=null;
function incBiome287(b){return [{sol:[.5,.55,.3],tr:0,fo:0x5a8a3a,d:0},{sol:[.32,.42,.2],tr:.6,fo:0x5f8f45,d:.55},{sol:[.2,.3,.15],tr:1,fo:0x2e5a2c,d:1},{sol:[.36,.38,.24],tr:.75,fo:0x5d6e48,d:.8},{sol:[.45,.42,.32],tr:.25,fo:0x7a7a50,d:.45}][Math.max(0,Math.min(4,Math.round(b)))]}
function incOuvrir287(k,ci){const E=INC287[k];if(!E)return;ci=ci||0;const C=E.ch[ci];if(!C)return;if(INC)incFermer287();window.BTUON=1;
 try{SND.m194=null;SND.kabarJ=0}catch(e){}
 const el=document.createElement('div');el.id='inc287';el.style.cssText='position:fixed;inset:0;z-index:60;background:#000';el.innerHTML='<canvas id="incC" style="width:100%;height:100%;display:block'+(C.passe?';filter:sepia(.55) saturate(.8)':'')+'"></canvas><div id="incH" style="position:absolute;left:12px;top:10px;color:#f4ecd8;font:15px Georgia,serif;text-shadow:0 1px 3px #000;max-width:46%"></div><canvas id="incM" width="200" height="170" style="position:absolute;right:10px;top:10px;background:rgba(20,30,20,.65);border:1px solid #8a7a50;border-radius:6px"></canvas><div id="incT" style="position:absolute;left:50%;bottom:150px;transform:translateX(-50%);color:#fff;font:17px Georgia,serif;text-shadow:0 1px 4px #000;text-align:center;max-width:80%"></div><div style="position:absolute;left:62px;right:110px;bottom:8px;color:#ddd;font:12px sans-serif;opacity:.85;line-height:1.35">ZQSD : marcher (Q/D de côté) · flèches ou souris : regarder · V : vue par ses yeux · Maj : courir · Espace : sauter · G : grimper · C : se baisser · pavé numérique : 1 boire, 2 manger, 3 repos, 4 puiser, 5 feu, 6 bois, 0 jeter · 7-8-9 : ses talents · Alt+1/2/3 : mystique · Échap : quitter</div><button id="incQ" class="bt" style="position:absolute;right:10px;bottom:10px;background:#b02a1e;color:#fff;border:1px solid #ff8a7a;font-weight:700">Quitter</button>';document.body.appendChild(el);
 const W=innerWidth,H=innerHeight,cv=$('incC'),R=new THREE.WebGLRenderer({canvas:cv,antialias:true});R.setPixelRatio(Math.min(devicePixelRatio||1,1.5));R.setSize(W,H);
 // la route réelle, en coordonnées de l'île, puis à l'échelle du parcours
 const RP=incRoute287(C);let rl=0;for(let i=1;i<RP.length;i++)rl+=Math.hypot(RP[i][0]-RP[i-1][0],RP[i][1]-RP[i-1][1]);const Ls=Math.max(300,Math.min(560,rl*60)),sc=Ls/rl,o0=RP[0];
 // ré-échantillonnage du chemin, avec un léger serpentement
 const P=[];for(let i=0;i<RP.length-1;i++){const a=RP[i],b=RP[i+1],n=Math.max(2,Math.round(Math.hypot(b[0]-a[0],b[1]-a[1])*sc/3));for(let j=0;j<n;j++){const u=j/n;P.push([(a[0]+(b[0]-a[0])*u-o0[0])*sc,(a[1]+(b[1]-a[1])*u-o0[1])*sc,a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u])}}const l=RP[RP.length-1];P.push([(l[0]-o0[0])*sc,(l[1]-o0[1])*sc,l[0],l[1]]);
 for(let it=0;it<2;it++)for(let i=1;i<P.length-1;i++){P[i][0]=(P[i-1][0]+P[i][0]*2+P[i+1][0])/4;P[i][1]=(P[i-1][1]+P[i][1]*2+P[i+1][1])/4}
 const P0=P.map(p=>p.slice());for(let i=1;i<P.length-1;i++){const dx=P[i+1][0]-P[i-1][0],dz=P[i+1][1]-P[i-1][1],L=Math.hypot(dx,dz)||1,w=Math.sin(i*.35)*4+Math.sin(i*.13+1)*6;P[i][0]+=-dz/L*w;P[i][1]+=dx/L*w}
 const N=P.length,U=P.map((_,i)=>i/(N-1));
 const alt0=Math.max(0,alt(P[0][2],P[0][3]));const altU=i=>{const p=P[Math.max(0,Math.min(N-1,i))];return Math.max(0,alt(p[2],p[3]))};
 // pistes : la vraie (le long de la rivière) et les fausses, qui finissent en cul-de-sac
 const pistes=[P.map(p=>[p[0],p[1]])];const rnd=(()=>{let s=7+ci*13+k.length*31;return()=>{s=(s*16807)%2147483647;return s/2147483647}})();
 for(let f=0;f<C.faux;f++){const i0=Math.floor((.12+.8*(f+rnd()*.6)/C.faux)*(N-1)),p=P[i0],q=P[Math.min(N-1,i0+1)];let dx=q[0]-p[0],dz=q[1]-p[1];const L=Math.hypot(dx,dz)||1;dx/=L;dz/=L;const sg=rnd()<.5?1:-1;let a=Math.atan2(dz,dx)+sg*(.5+rnd()*.6),x=p[0],z=p[1];const Q=[[x,z]],n=10+Math.floor(rnd()*10);for(let j=0;j<n;j++){a+=(rnd()-.5)*.6+(j<3?sg*.08:0);x+=Math.cos(a)*3.2;z+=Math.sin(a)*3.2;Q.push([x,z])}pistes.push(Q)}
 // distance à une piste (grille spatiale)
 const G={},cs=8,gk=(x,z)=>Math.floor(x/cs)+','+Math.floor(z/cs);const segs=[];pistes.forEach((Q,pi)=>{for(let i=0;i<Q.length-1;i++){const s={a:Q[i],b:Q[i+1],pi,i};segs.push(s);const x0=Math.min(s.a[0],s.b[0])-8,x1=Math.max(s.a[0],s.b[0])+8,z0=Math.min(s.a[1],s.b[1])-8,z1=Math.max(s.a[1],s.b[1])+8;for(let gx=Math.floor(x0/cs);gx<=Math.floor(x1/cs);gx++)for(let gz=Math.floor(z0/cs);gz<=Math.floor(z1/cs);gz++){const kk=gx+','+gz;(G[kk]||(G[kk]=[])).push(s)}}});
 const dSeg=(x,z,s)=>{const ax=s.a[0],az=s.a[1],bx=s.b[0]-ax,bz=s.b[1]-az,L2=bx*bx+bz*bz||1;let t=((x-ax)*bx+(z-az)*bz)/L2;t=Math.max(0,Math.min(1,t));return Math.hypot(x-ax-bx*t,z-az-bz*t)};
 const dPiste=(x,z)=>{let d=99;for(const s of G[gk(x,z)]||[])d=Math.min(d,dSeg(x,z,s));return d};
 // le plus proche point du vrai chemin : indice et distance
 const proche=(x,z)=>{let bi=0,bd=1e9;for(let i=0;i<N;i++){const d=(P[i][0]-x)**2+(P[i][1]-z)**2;if(d<bd){bd=d;bi=i}}return [bi,Math.sqrt(bd)]};
 // le relief : la vraie altitude le long du chemin, une vallée qui se creuse autour de la rivière
 let X0=1e9,X1=-1e9,Z0=1e9,Z1=-1e9;P.forEach(p=>{X0=Math.min(X0,p[0]);X1=Math.max(X1,p[0]);Z0=Math.min(Z0,p[1]);Z1=Math.max(Z1,p[1])});X0-=110;X1+=110;Z0-=110;Z1+=110;
 const nGX=Math.min(220,Math.ceil((X1-X0)/2.6)),nGZ=Math.min(220,Math.ceil((Z1-Z0)/2.6));const HG=new Float32Array((nGX+1)*(nGZ+1)),IG=new Uint16Array((nGX+1)*(nGZ+1));const DG=new Float32Array((nGX+1)*(nGZ+1));
 for(let j=0;j<=nGZ;j++)for(let i=0;i<=nGX;i++){const x=X0+(X1-X0)*i/nGX,z=Z0+(Z1-Z0)*j/nGZ,[bi,d]=proche(x,z);IG[j*(nGX+1)+i]=bi;DG[j*(nGX+1)+i]=d;{const base=(altU(bi)-alt0)*.045+Math.min(1,d/14)*1.2,mur=base+Math.max(0,d-14)*.42,vrai=(()=>{const aa=alt(x/sc+o0[0],z/sc+o0[1]);return aa<=0?(0-alt0)*.045-3:(aa-alt0)*.045+.6})(),kk=Math.min(1,Math.max(0,(d-18)/28));HG[j*(nGX+1)+i]=mur*(1-kk)+vrai*kk+.9*Math.sin(x*.09)*Math.cos(z*.07)+.4*Math.sin(x*.23+z*.17)}}
 {const w=nGX+1,T=new Float32Array(HG.length);for(let it=0;it<3;it++){T.set(HG);for(let j=1;j<nGZ;j++)for(let i=1;i<nGX;i++){const q=j*w+i;if(DG[q]<7)continue;const m=(T[q-1]+T[q+1]+T[q-w]+T[q+w]+T[q-w-1]+T[q-w+1]+T[q+w-1]+T[q+w+1])/8,k=Math.min(1,(DG[q]-7)/10)*.85;HG[q]=T[q]*(1-k)+m*k}}}
 // la surface exacte du maillage (deux triangles par case) : les pieds restent sur le sol, même dans la pente
 const hAt=(x,z)=>{const fi=(x-X0)/(X1-X0)*nGX,fj=(z-Z0)/(Z1-Z0)*nGZ,i=Math.max(0,Math.min(nGX-1,Math.floor(fi))),j=Math.max(0,Math.min(nGZ-1,Math.floor(fj))),u=Math.max(0,Math.min(1,fi-i)),v=Math.max(0,Math.min(1,fj-j)),w=nGX+1,A=HG[j*w+i],D=HG[j*w+i+1],B=HG[(j+1)*w+i],Cc=HG[(j+1)*w+i+1];return u+v<=1?A+(D-A)*u+(B-A)*v:Cc+(B-Cc)*(1-u)+(D-Cc)*(1-v)};
 // le lit de la rivière : creusé dans le relief, l'eau à plat d'une rive à l'autre (plus de « rideau » posé sur la pente)
 const RYC=[];{const w=nGX+1,cx0=[],yc0=[];for(let i=0;i<N;i++){const p=P0[i],q=P0[Math.min(N-1,i+2)],r=P0[Math.max(0,i-2)];let dx=q[0]-r[0],dz=q[1]-r[1];const L=Math.hypot(dx,dz)||1,cx=p[0]-dz/L*13,cz=p[1]+dx/L*13;cx0.push([cx,cz,1.5+1.3*(1-i/N)]);yc0.push(hAt(cx,cz))}
  for(let i=0;i<N;i++){let a=0,n=0;for(let k=-3;k<=3;k++){const q=yc0[Math.max(0,Math.min(N-1,i+k))];a+=q;n++}RYC.push(Math.min(a/n,yc0[i]))}
  const cellX=(X1-X0)/nGX,cellZ=(Z1-Z0)/nGZ;for(let i=0;i<N;i++){const [cx,cz,lw]=cx0[i],R=lw+4,i0=Math.max(0,Math.floor((cx-R-X0)/cellX)),i1=Math.min(nGX,Math.ceil((cx+R-X0)/cellX)),j0=Math.max(0,Math.floor((cz-R-Z0)/cellZ)),j1=Math.min(nGZ,Math.ceil((cz+R-Z0)/cellZ));
   for(let j=j0;j<=j1;j++)for(let ii=i0;ii<=i1;ii++){const x=X0+ii*cellX,z=Z0+j*cellZ,d=Math.hypot(x-cx,z-cz);if(d>R)continue;const t=RYC[i]-.55+Math.max(0,d-(lw-.8))*.6,q=j*w+ii;if(t<HG[q])HG[q]=t}}}
 const bAt=bi=>C.b0+(C.b1-C.b0)*(bi/(N-1));
 const S3=new THREE.Scene(),sky=new THREE.Color(C.b1>=3?0xb8c6cc:0x9fbfc8);R.setClearColor(sky);S3.fog=new THREE.Fog(sky,18,C.b1>=2?70:110);
 const cam=new THREE.PerspectiveCamera(62,W/H,.05,400);S3.add(new THREE.HemisphereLight(0xe6f0e8,0x2a3522,.95));const sun=new THREE.DirectionalLight(0xfff0d0,.8);sun.position.set(-40,80,30);S3.add(sun);
 const gg=new THREE.PlaneGeometry(X1-X0,Z1-Z0,nGX,nGZ).rotateX(-Math.PI/2).translate((X0+X1)/2,0,(Z0+Z1)/2),pa=gg.attributes.position,col=new Float32Array(pa.count*3);
 for(let i=0;i<pa.count;i++){const x=pa.getX(i),z=pa.getZ(i);pa.setY(i,hAt(x,z));const bi=proche(x,z)[0],B=incBiome287(bAt(bi)),dp=dPiste(x,z),c=dp<1.6?[.46,.37,.26]:B.sol,k2=.9+.2*Math.sin(x*.5)*Math.cos(z*.4);col.set([c[0]*k2,c[1]*k2,c[2]*k2],i*3)}
 gg.setAttribute('color',new THREE.BufferAttribute(col,3));gg.computeVertexNormals();S3.add(new THREE.Mesh(gg,new THREE.MeshLambertMaterial({vertexColors:true})));
 // la rivière, à côté du vrai chemin
 const RIVP=[];{const pos=[],idx=[];for(let i=0;i<N;i++){const p=P0[i],q=P0[Math.min(N-1,i+2)],r=P0[Math.max(0,i-2)];let dx=q[0]-r[0],dz=q[1]-r[1];const L=Math.hypot(dx,dz)||1;const nx=-dz/L,nz=dx/L,cx=p[0]+nx*13,cz=p[1]+nz*13,y=RYC[i]-.28,lw=1.5+1.3*(1-i/N);pos.push(cx-nx*lw,y,cz-nz*lw,cx+nx*lw,y,cz+nz*lw);RIVP.push([cx,cz,lw]);if(i<N-1)idx.push(i*2,i*2+1,i*2+2,i*2+1,i*2+3,i*2+2)}
  const rg=new THREE.BufferGeometry();rg.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));rg.setIndex(idx);rg.computeVertexNormals();S3.add(new THREE.Mesh(rg,new THREE.MeshLambertMaterial({color:0x3f6a72,transparent:true,opacity:.8,side:THREE.DoubleSide})))}
 // la forêt : dense hors des pistes — c'est elle qui fait le labyrinthe
 const arb=[],AG={},ag=(x,z)=>Math.floor(x/4)+','+Math.floor(z/4);const TT=[],TF=[],TK=[];
 for(let t=0;t<60000&&TT.length<15000;t++){const x=X0+rnd()*(X1-X0),z=Z0+rnd()*(Z1-Z0),dp=dPiste(x,z);if(dp<2.6)continue;const [bi,d]=proche(x,z);if(d>48&&dp>=99)continue;const B=incBiome287(bAt(bi));if(rnd()>B.d*(dp<5?.9:1))continue;if(Math.hypot(x-P[0][0],z-P[0][1])<16)continue;
  const kind=bAt(bi)<.6?'canne':bAt(bi)>=3.6?'lande':bAt(bi)>=2.6?'tamarin':bAt(bi)>=1.5&&rnd()<.35?'fanjan':'arbre';(kind==='canne'?TK:TT).push({x,z,k:kind,s:.7+rnd()*.7,y:hAt(x,z)});if(kind!=='canne'&&kind!=='lande'){const a={x,z,r:.55};arb.push(a);(AG[ag(x,z)]||(AG[ag(x,z)]=[])).push(a)}}
 // la plantation : des rangs de cannes au départ
 for(let x=-30;x<30;x+=2.2)for(let z=-30;z<30;z+=1.4){const X=P[0][0]+x,Z=P[0][1]+z;if(dPiste(X,Z)<2.2||Math.hypot(x,z)>32)continue;TK.push({x:X,z:Z,s:.9+rnd()*.3,y:hAt(X,Z)})}
 const M4=new THREE.Matrix4(),Qt=new THREE.Quaternion(),V3=new THREE.Vector3(),SC=new THREE.Vector3(),up=new THREE.Vector3(0,1,0);
 const inst=(geo,mat,L,f)=>{if(!L.length)return;const im=new THREE.InstancedMesh(geo,mat,L.length);L.forEach((a,i)=>{f(a,V3,Qt,SC);M4.compose(V3,Qt,SC);im.setMatrixAt(i,M4)});S3.add(im)};
 const AR=TT.filter(a=>a.k==='arbre'),FJ=TT.filter(a=>a.k==='fanjan'),TA=TT.filter(a=>a.k==='tamarin'),LA=TT.filter(a=>a.k==='lande');
 const trunk=new THREE.CylinderGeometry(.16,.28,1,6).translate(0,.5,0),bois=new THREE.MeshLambertMaterial({color:0x4a3626});
 inst(trunk,bois,AR,(a,v,q,s)=>{v.set(a.x,a.y,a.z);q.identity();s.set(a.s,7.5*a.s,a.s)});
 inst(new THREE.IcosahedronGeometry(1.9,0),new THREE.MeshLambertMaterial({color:0x2f5e30}),AR,(a,v,q,s)=>{v.set(a.x,a.y+7.5*a.s+.6,a.z);q.setFromAxisAngle(up,a.x);s.set(a.s*1.2,a.s*1.1,a.s*1.2)});
 inst(new THREE.CylinderGeometry(.13,.18,1,5).translate(0,.5,0),new THREE.MeshLambertMaterial({color:0x3a2c20}),FJ,(a,v,q,s)=>{v.set(a.x,a.y,a.z);q.identity();s.set(a.s,3.4*a.s,a.s)});
 inst(typeof palme302==='function'?palme302(2.4,10):new THREE.ConeGeometry(2.3,1.1,8).rotateX(Math.PI).translate(0,-.1,0),new THREE.MeshLambertMaterial({color:0x2f5f2c,side:THREE.DoubleSide}),FJ,(a,v,q,s)=>{v.set(a.x,a.y+3.4*a.s,a.z);q.setFromAxisAngle(up,a.z);s.set(a.s,a.s,a.s)});
 inst(new THREE.CylinderGeometry(.18,.3,1,5).translate(0,.5,0),new THREE.MeshLambertMaterial({color:0x5a4a3a}),TA,(a,v,q,s)=>{v.set(a.x,a.y,a.z);q.setFromAxisAngle(new THREE.Vector3(1,0,.4).normalize(),.25);s.set(a.s,3.5*a.s,a.s)});
 inst(new THREE.SphereGeometry(1.7,6,4),new THREE.MeshLambertMaterial({color:0x6d7d58}),TA,(a,v,q,s)=>{v.set(a.x+.6,a.y+3.6*a.s,a.z);q.identity();s.set(a.s*1.3,a.s*.7,a.s)});
 inst(new THREE.IcosahedronGeometry(.8,1),new THREE.MeshLambertMaterial({color:0x6f7448}),LA.filter((_,i)=>i%2),(a,v,q,s)=>{v.set(a.x,a.y+.35,a.z);q.setFromAxisAngle(up,a.x);s.set(a.s,a.s*.75,a.s*.9)});
 inst(new THREE.ConeGeometry(.5,2.2,5).translate(0,1.1,0),new THREE.MeshLambertMaterial({color:0x58603a}),LA.filter((_,i)=>!(i%2)),(a,v,q,s)=>{v.set(a.x,a.y,a.z);q.setFromAxisAngle(up,a.z);s.set(a.s,a.s,a.s)});
 inst(new THREE.ConeGeometry(.12,2.6,3).translate(0,1.3,0),new THREE.MeshLambertMaterial({color:0x7aa84a}),TK,(a,v,q,s)=>{v.set(a.x,a.y,a.z);q.setFromAxisAngle(up,a.x*3);s.set(a.s,a.s,a.s)});
 // l'habitation, au départ (sauf pour les départs déjà dans les Hauts)
 if(C.b0<1.5){const m=new THREE.Mesh(new THREE.BoxGeometry(9,3.2,5),new THREE.MeshLambertMaterial({color:0xece4d2}));const hx=P[0][0]-14,hz=P[0][1]+10;m.position.set(hx,hAt(hx,hz)+1.6,hz);const r=new THREE.Mesh(new THREE.ConeGeometry(7.2,2.6,4).rotateY(Math.PI/4),new THREE.MeshLambertMaterial({color:0x8a3a2e}));r.scale.z=.6;r.position.y=2.9;m.add(r);S3.add(m)}
 // les culs-de-sac : un rempart de roche au bout de chaque fausse piste
 pistes.slice(1).forEach(Q=>{const e=Q[Q.length-1],m=new THREE.Mesh(new THREE.DodecahedronGeometry(4,0),new THREE.MeshLambertMaterial({color:0x5a5650}));m.scale.set(1.6,1.4,1.2);m.position.set(e[0],hAt(e[0],e[1])+2,e[1]);S3.add(m);const a={x:e[0],z:e[1],r:4};arb.push(a);(AG[ag(e[0],e[1])]||(AG[ag(e[0],e[1])]=[])).push(a)});
 // l'arrivée : une lueur
 const fin=P[N-1],lu=new THREE.PointLight(0xffb050,1.6,20);lu.position.set(fin[0],hAt(fin[0],fin[1])+2,fin[1]);S3.add(lu);const feu=new THREE.Mesh(new THREE.ConeGeometry(.5,1.2,6),new THREE.MeshBasicMaterial({color:0xffa040}));feu.position.set(fin[0],hAt(fin[0],fin[1])+.6,fin[1]);S3.add(feu);
 // à l'arrivée : quelques cases de feuilles, et celui ou celle qui attend
 for(let j=0;j<4;j++){const a=j/4*6.28+.4,x=fin[0]+Math.cos(a)*7,z=fin[1]+Math.sin(a)*7;const cs=new THREE.Mesh(new THREE.ConeGeometry(1.7,2.2,6),new THREE.MeshLambertMaterial({color:0x9a8048}));cs.position.set(x,hAt(x,z)+1.1,z);S3.add(cs);const aa={x,z,r:1.6};arb.push(aa);(AG[ag(x,z)]||(AG[ag(x,z)]=[])).push(aa)}
 const qui={n:'p1a_chasseur',x:fin[0]+2,z:fin[1]+2,ang:0,root:null,mx:null,clip:''};{const n=qui.n;p3Charge(n);const at=()=>{if(!INC)return;if(!P3.buf[n]){if(P3.ok[n]===0)return;setTimeout(at,300);return}p3Instance(n).then(I=>{if(!INC)return;qui.root=I.g.scene;qui.anim=I.g.animations;qui.mx=I.mx;S3.add(qui.root);incClip287(qui,'repos_debout')}).catch(()=>{})};setTimeout(at,30)}
 // les chasseurs et leurs chiens, sur la vraie piste
 const CH=[];for(let c=0;c<C.chas;c++){const i0=Math.floor((.3+.55*(c+.5)/C.chas)*(N-1));const o={i0,i:i0,dir:1,x:P[i0][0],z:P[i0][1],al:0,root:null,mx:null,clip:'',chien:null};
  o.seul=c%2===1;if(!o.seul)try{const d=chien121();d.scale.setScalar(.9);S3.add(d);o.chien=d}catch(e){}
  const n=c%2?'milicien':'p7_colon';p3Charge(n);const at=()=>{if(!INC)return;if(!P3.buf[n]){if(P3.ok[n]===0)return;setTimeout(at,300);return}p3Instance(n).then(I=>{if(!INC)return;o.root=I.g.scene;o.anim=I.g.animations;o.mx=I.mx;S3.add(o.root);incClip287(o,'marche')}).catch(()=>{})};setTimeout(at,30);CH.push(o)}
 // le héros et ses compagnons
 const poser=(d,x,z)=>{const o={d,x,z,ang:0,root:null,mx:null,clip:''};const n=d.m;p3Charge(n);const at=()=>{if(!INC)return;if(!P3.buf[n]){if(P3.ok[n]===0)return;setTimeout(at,300);return}p3Instance(n).then(I=>{if(!INC)return;o.root=I.g.scene;o.anim=I.g.animations;o.mx=I.mx;S3.add(o.root);incClip287(o,'repos_debout')}).catch(()=>{})};setTimeout(at,30);return o};
 const h0=poser(C.heros,P[1][0],P[1][1]);const cps=(C.comp||[]).map((d,i)=>poser(d,P[0][0]-i,P[0][1]-1-i));
 INC={k,ci,E,C,R,S3,cam,el,P,N,hAt,riv:RIVP,TT,sky,arb,AG,ag,dPiste,proche,CH,qui,h:h0,cps,keys:{},yaw:0,pit:-.2,dist:6,baisse:0,souffle:3,cp:0,trace:[],last:performance.now(),fini:0,vu:0,sc,o0,RP,minimap:null};
 {const p=P[0],q=P[3];INC.yaw=Math.atan2(-(q[0]-p[0]),-(q[1]-p[1]))}
 incEntrees287();incCarte287();incHud287();
 incNarre287(C.t+(C.an?' · '+C.an:''),C.intro,C.v,()=>{incMsg287(C.obj);requestAnimationFrame(incBoucle287)})}
function incClip287(o,c){if(!o||!o.mx||o.clip===c)return;const a=(o.anim||[]).find(x=>x.name===c)||(o.anim||[]).find(x=>x.name==='marche');if(!a)return;o.mx.stopAllAction();o.mx.clipAction(a).play();o.clip=c;try{p3Range(o.root)}catch(e){}}
function incMsg287(m){const d=$('incT');if(d){d.textContent=m;d.style.opacity=1;clearTimeout(INC&&INC.mt);if(INC)INC.mt=setTimeout(()=>{if($('incT'))$('incT').style.opacity=.0},6000)}}
function incHud287(){if(!INC)return;const d=$('incH');if(!d)return;const C=INC.C;d.innerHTML='<b>'+INC.E.n+'</b> — '+C.t+'<br>Vous êtes <b>'+((INC.h&&INC.h.d&&INC.h.d.n)||C.heros.n)+'</b>'+(INC.cps&&INC.cps.length?' · avec '+INC.cps.map(c=>c.d.n).join(', ')+' <small>(Tab : changer)</small>':'')+'<br>Souffle '+'●'.repeat(INC.souffle)+'○'.repeat(3-INC.souffle)+(INC.baisse?' · baissé':'')+'<br><small>'+C.obj+' · '+Math.round(INC.cp*100)+' %</small>'}
function incNarre287(t,b,v,ok){const d=document.createElement('div');d.style.cssText='position:fixed;inset:0;z-index:70;display:flex;align-items:center;justify-content:center;background:rgba(10,8,4,.72)';d.innerHTML='<div class="bloc" style="max-width:640px;background:#2a2218;color:#f1e6cc;padding:22px;border:1px solid #8a7040;border-radius:10px;font-family:Georgia,serif"><h2 style="margin-top:0">'+t+'</h2><p style="font-size:17px;line-height:1.5">'+b+'</p>'+(v?'<p style="font-size:13px;opacity:.8;border-top:1px solid #6a5838;padding-top:8px">'+v+'</p>':'')+'<button class="bt">Continuer</button></div>';document.body.appendChild(d);d.querySelector('button').onclick=()=>{d.remove();ok&&ok()}}
function incEntrees287(){const I=INC;const kd=e=>{if(!INC||I.duel)return;const k=e.key.length===1?e.key.toLowerCase():e.key;I.keys[k]=1;if(k==='c'||e.key==='Control'){e.preventDefault();I.baisse=!I.baisse;incHud287()}if(e.code==='Space'){e.preventDefault();const h=I.h;if(!(h.yo>.05)&&(I.endu==null||I.endu>8)){h.vy=I.baisse?5.2:6.2;I.endu=(I.endu==null?100:I.endu)-8}}if(k==='v'){I.vueTete=!I.vueTete;incMsg287(I.vueTete?'Vue par ses yeux (V pour revenir).':'Vue de dehors.')}if(typeof inc290Touche==='function')inc290Touche(k,e);if(e.key==='Escape')incQuitter287();if(/^(Arrow|z|q|s|d|w|a)/.test(k))e.preventDefault()},ku=e=>{if(!INC)return;const k=e.key.length===1?e.key.toLowerCase():e.key;I.keys[k]=0};
 addEventListener('keydown',kd,true);addEventListener('keyup',ku,true);let dr=null;const cv=$('incC');cv.addEventListener('mousedown',e=>{dr={x:e.clientX,y:e.clientY}});const mm=e=>{if(!INC||!dr||!e.buttons)return;I.yaw-=(e.clientX-dr.x)*.005;I.pit=Math.max(-.9,Math.min(.4,I.pit-(e.clientY-dr.y)*.004));dr={x:e.clientX,y:e.clientY}};addEventListener('mousemove',mm);const mu=()=>dr=null;addEventListener('mouseup',mu);
 cv.addEventListener('wheel',e=>{e.preventDefault();I.dist=Math.max(2.5,Math.min(14,I.dist*(e.deltaY>0?1.12:.89)))},{passive:false});
 // au doigt : la moitié gauche de l'écran avance vers le point touché
 cv.addEventListener('touchstart',e=>{const t=e.touches[0];I.tch={x:t.clientX,y:t.clientY}},{passive:true});cv.addEventListener('touchmove',e=>{const t=e.touches[0];if(I.tch){I.yaw-=(t.clientX-I.tch.x)*.005;I.tch={x:t.clientX,y:t.clientY};I.keys.z=1}},{passive:true});cv.addEventListener('touchend',()=>{I.tch=null;I.keys.z=0},{passive:true});
 I.off=()=>{removeEventListener('keydown',kd,true);removeEventListener('keyup',ku,true);removeEventListener('mousemove',mm);removeEventListener('mouseup',mu)};$('incQ').onclick=()=>incQuitter287()}
// la petite carte : l'île réelle, le vrai tracé, et où l'on est
function incCarte287(){const I=INC,c=$('incM'),g=c.getContext('2d'),[ax,az]=xz(55.21,-20.87),[bx,bz]=xz(55.84,-21.39),w=c.width,h=c.height,k=Math.min(w/(bx-ax),h/(bz-az))*.95,ox=(w-(bx-ax)*k)/2,oz=(h-(bz-az)*k)/2;
 const bg=document.createElement('canvas');bg.width=w;bg.height=h;const b=bg.getContext('2d');for(let y=0;y<h;y+=2)for(let x=0;x<w;x+=2){const X=ax+(x-ox)/k,Z=az+(y-oz)/k,a=alt(X,Z);if(a>0){const t=Math.min(1,a/2400);b.fillStyle='rgb('+Math.round(70+120*t)+','+Math.round(110+60*t)+','+Math.round(60+90*t)+')';b.fillRect(x,y,2,2)}}
 b.strokeStyle='#ffd070';b.lineWidth=2;b.beginPath();I.RP.forEach((p,i)=>{const x=ox+(p[0]-ax)*k,y=oz+(p[1]-az)*k;i?b.lineTo(x,y):b.moveTo(x,y)});b.stroke();I.minimap={g,bg,ax,az,k,ox,oz}}
function incCarteMaj287(){const I=INC,m=I.minimap;if(!m)return;m.g.clearRect(0,0,m.g.canvas.width,m.g.canvas.height);m.g.drawImage(m.bg,0,0);const X=I.o0[0]+I.h.x/I.sc,Z=I.o0[1]+I.h.z/I.sc;m.g.fillStyle='#ff4030';m.g.beginPath();m.g.arc(m.ox+(X-m.ax)*m.k,m.oz+(Z-m.az)*m.k,3.5,0,7);m.g.fill();m.g.fillStyle='#fff';m.g.font='10px sans-serif';m.g.fillText('vous',m.ox+(X-m.ax)*m.k+5,m.oz+(Z-m.az)*m.k-4)}
function incBloque287(x,z){const I=INC;for(let gx=-1;gx<=1;gx++)for(let gz=-1;gz<=1;gz++){const L=I.AG[(Math.floor(x/4)+gx)+','+(Math.floor(z/4)+gz)];if(L)for(const a of L)if(Math.hypot(a.x-x,a.z-z)<a.r+.35)return true}return false}
function incBoucle287(){const I=INC;if(!I)return;const now=performance.now(),dt=Math.min(.05,(now-I.last)/1000);I.last=now;
 if(!I.fini&&!I.pause){const k=I.keys,av=(k.z||k.w?1:0)-(k.s?1:0),la=(k.d?1:0)-(k.q||k.a?1:0);
  // les flèches orientent le regard, comme la souris
  if(k.ArrowLeft)I.yaw+=dt*1.9;if(k.ArrowRight)I.yaw-=dt*1.9;if(k.ArrowUp)I.pit=Math.min(.45,I.pit+dt*1.2);if(k.ArrowDown)I.pit=Math.max(-.95,I.pit-dt*1.2);
  // l'endurance : la course, le saut, l'escalade et la marche baissée fatiguent ; on la reprend en marchant doucement ou à l'arrêt
  if(I.endu==null)I.endu=100;const mv=av||la;
  const run=(k.Shift||I.courir)&&!I.baisse&&I.endu>3,fat=(I.st&&(I.st.soif<=0||I.st.faim<=0)?.7:1)*(I.endu<15?.75:1),h=I.h;
  // ZQSD : avancer, reculer, et de côté, par rapport au regard
  const v=(I.baisse?2.1:run?7.8:4.2)*fat;let mx=0,mz=0;if(mv){const a=I.yaw,fx=-Math.sin(a),fz=-Math.cos(a),rx=Math.cos(a),rz=-Math.sin(a),n=Math.hypot(av,la)||1;mx=(fx*av+rx*la)/n;mz=(fz*av+rz*la)/n}
  I.endu=Math.max(0,Math.min(100,I.endu+dt*(I.grimpe?-9:run&&mv?-11:I.baisse&&mv?-3:mv?1.5:6)));
  // le saut : une vitesse verticale, la pesanteur ; en l'air, on franchit une marche de terrain
  h.vy=(h.vy||0)-18*dt;h.yo=Math.max(0,(h.yo||0)+h.vy*dt);if(h.yo<=0)h.vy=0;const enAir=h.yo>.25;
  if(mv){const dx=mx*v*dt,dz=mz*v*dt;let nx=h.x+dx,nz=h.z+dz;const st=Math.max(.02,Math.hypot(dx,dz)),dh=I.hAt(nx,nz)-I.hAt(h.x,h.z),s=dh/st,surP=I.dPiste(h.x,h.z)<2.2,wet=I.pl301?Math.min(1,I.pl301.int||0):0,lim=surP?1.6:1.3-wet*.3,raide=s>lim,now7=performance.now();
   // la pente : le sentier passe toujours ; hors sentier, au-delà d'une pente raide il faut grimper (G) ; sous la pluie, la terre glisse
   const glisse=()=>{const gx=I.hAt(h.x+.5,h.z)-I.hAt(h.x-.5,h.z),gz=I.hAt(h.x,h.z+.5)-I.hAt(h.x,h.z-.5),gl=Math.hypot(gx,gz)||1;nx=h.x-gx/gl*1.3;nz=h.z-gz/gl*1.3;I.endu=Math.max(0,I.endu-7);I.grimpe=0;if(!I.msgGl||now7-I.msgGl>5000){I.msgGl=now7;incMsg287('Ça glisse ! La terre mouillée ne tient pas sous les pieds nus : cherchez les racines, ou le sentier.')}};
   if(raide&&!enAir&&!k.g&&s<2.4&&!(wet>.3)){const r=.3;nx=h.x+dx*r;nz=h.z+dz*r}else if(raide&&!enAir){if(k.g&&I.endu>2){const r=.35;nx=h.x+dx*r;nz=h.z+dz*r;I.grimpe=1;if(wet>.3&&Math.random()<dt*wet*1.6)glisse()}else{nx=h.x;nz=h.z;I.grimpe=0;if(!I.msgRaide||now7-I.msgRaide>6000){I.msgRaide=now7;incMsg287(I.endu<=2?'À bout de souffle : reposez-vous un moment.':'Trop raide'+(wet>.3?' et glissant':'')+' : maintenez G pour grimper, ou reprenez le sentier.')}}}
   else{I.grimpe=0;const a=Math.abs(s);if(a>.35&&!enAir){const f=Math.max(.4,1-(a-.35)*(surP?.5:.9));nx=h.x+dx*f;nz=h.z+dz*f;if(!surP&&wet>.25&&Math.random()<dt*wet*(a-.35)*3)glisse()}}
   {const ox=h.x,oz=h.z;if(!incBloque287(nx,h.z))h.x=nx;if(!incBloque287(h.x,nz))h.z=nz;if(h.x===ox&&h.z===oz&&(nx!==ox||nz!==oz)){const ddx=nx-ox,ddz=nz-oz;for(const an of[.7,-.7,1.4,-1.4]){const c=Math.cos(an),s2=Math.sin(an),tx=ox+ddx*c-ddz*s2,tz=oz+ddx*s2+ddz*c;if(!incBloque287(tx,tz)){h.x=tx;h.z=tz;break}}}}h.ang=Math.atan2(dx,dz);incClip287(h,I.grimpe?'grimper':run?'course':'marche')}else{I.grimpe=0;incClip287(h,'repos_debout')}
  // les compagnons suivent la trace
  I.trace.unshift([h.x,h.z]);if(I.trace.length>200)I.trace.pop();I.cps.forEach((c,i)=>{const t=I.trace[Math.min(I.trace.length-1,(i+1)*22)];if(!t)return;const d=Math.hypot(t[0]-c.x,t[1]-c.z);if(d>.3){c.ang=Math.atan2(t[0]-c.x,t[1]-c.z);c.x+=(t[0]-c.x)*Math.min(1,dt*3);c.z+=(t[1]-c.z)*Math.min(1,dt*3);incClip287(c,d>2.5?'course':'marche')}else incClip287(c,'repos_debout')});
  // l'avancée sur le vrai chemin
  const [bi,dd]=I.proche(h.x,h.z);if(dd<6)I.cp=Math.max(I.cp,bi/(I.N-1));
  // les chasseurs : ils vont et viennent sur la piste ; ils voient loin, moins quand on est baissé dans la forêt
  I.CH.forEach(o=>{if(o.hs)return;o.i+=o.dir*dt*2.2;if(Math.abs(o.i-o.i0)>14)o.dir*=-1;const i=Math.max(0,Math.min(I.N-1,Math.floor(o.i))),p=I.P[i],q=I.P[Math.min(I.N-1,i+1)];o.x=p[0]+(q[0]-p[0])*(o.i-i);o.z=p[1]+(q[1]-p[1])*(o.i-i);o.ang=Math.atan2((q[0]-p[0])*o.dir,(q[1]-p[1])*o.dir);
   if(o.chien){o.chien.position.set(o.x+Math.sin(o.ang)*1.6,I.hAt(o.x,o.z),o.z+Math.cos(o.ang)*1.6);o.chien.rotation.y=o.ang-Math.PI/2}
   const d=Math.hypot(h.x-o.x,h.z-o.z),portee=(I.baisse?(I.dPiste(h.x,h.z)>2?3.5:6):(I.dPiste(h.x,h.z)>2?9:15))*(I.st&&I.st.fumee?1.6:1),vf=Math.cos(Math.atan2(h.x-o.x,h.z-o.z)-o.ang)>.2||d<3;
   if(!o.hs&&d<portee&&vf){o.al+=dt;if(o.al>1.1){o.al=0;if(o.seul)incDefi287(o);else incPris287(o)}}else o.al=Math.max(0,o.al-dt*.5)});
  const al=Math.max(0,...I.CH.map(o=>o.al));if(al>.2&&!I.alT){I.alT=1;incMsg287('Un chien grogne… baissez-vous (C), quittez la piste.')}if(al<.05)I.alT=0;
  if(bi>=I.N-3&&dd<7){I.fini=1;incFinCh287()}
  incHud287();}
 // poser les personnages
 const pose=o=>{if(!o||!o.root)return;o.root.position.set(o.x,(()=>{const c=I.hAt(o.x,o.z),m=Math.max(I.hAt(o.x+.22,o.z),I.hAt(o.x-.22,o.z),I.hAt(o.x,o.z+.22),I.hAt(o.x,o.z-.22));return Math.max(c,(c+m)/2)})()+(o.yo||0),o.z);o.root.rotation.y=o.ang;if(o.mx)o.mx.update(1/60)};pose(I.h);I.cps.forEach(pose);I.CH.forEach(pose);if(I.qui){I.qui.ang=Math.atan2(I.h.x-I.qui.x,I.h.z-I.qui.z);pose(I.qui)}
 if(I.h.root){const r=I.h.root;r.rotation.order='YXZ';r.scale.y=I.baisse?.86:1;r.rotation.x=I.baisse?.32:0;r.visible=!(I.vueTete&&I.pit>-.35)}
 const hy=I.hAt(I.h.x,I.h.z)+1.4+(I.h.yo||0)*.5;I.cam.position.set(I.h.x+Math.sin(I.yaw)*I.dist*Math.cos(I.pit),hy-Math.sin(I.pit)*I.dist+.6,I.h.z+Math.cos(I.yaw)*I.dist*Math.cos(I.pit));const gy=I.hAt(I.cam.position.x,I.cam.position.z)+.5;if(I.cam.position.y<gy)I.cam.position.y=gy;if(I.cp>.12&&I.cam.position.y>hy+2.2)I.cam.position.y=hy+2.2;{const c=I.cam.position,h0=hy-1.1,vx=c.x-I.h.x,vy=c.y-hy,vz=c.z-I.h.z;for(let t=.12;t<=1.001;t+=.08){const x=I.h.x+vx*t,z=I.h.z+vz*t,y=h0+(c.y-h0)*t;if(I.hAt(x,z)+.35>y){const u=Math.max(.15,t-.1);c.set(I.h.x+vx*u,Math.max(hy+vy*u,I.hAt(I.h.x+vx*u,I.h.z+vz*u)+.6),I.h.z+vz*u);break}}}{const c=I.cam.position;if(I.camP&&!I.saut){c.x=I.camP.x+(c.x-I.camP.x)*.2;c.y=I.camP.y+(c.y-I.camP.y)*.2;c.z=I.camP.z+(c.z-I.camP.z)*.2}I.saut=0;I.camP=c.clone()}I.cam.lookAt(I.h.x,hy,I.h.z);if(I.vueTete){const g=I.hAt(I.h.x,I.h.z)+(I.baisse?1.25:1.62)+(I.h.yo||0),fx=-Math.sin(I.yaw),fz=-Math.cos(I.yaw);I.cam.position.set(I.h.x+fx*.22,g,I.h.z+fz*.22);I.camP=I.cam.position.clone();I.cam.lookAt(I.h.x+fx*5*Math.cos(I.pit),g+Math.sin(I.pit)*5,I.h.z+fz*5*Math.cos(I.pit))}
 I.fc=(I.fc||0)+1;if(I.fc%6===1)incCarteMaj287();
 if(!I.duel)I.R.render(I.S3,I.cam);requestAnimationFrame(incBoucle287)}
// le chasseur seul : on peut l'affronter en duel. Les coups et la mystique du héros dépendent de là où il en est de son chemin :
// au début, un bâton et un seul pouvoir ; en avançant, le deuxième ; devenu roi (dernière partie, au bout), tout son art.
const INCF287={simang:'simangalove',anchaing:'anchaing284',laverdure:'laverdure284',dimitile:'dimitile',mafate:'mafate282',cimendef:'cimendef',baal:'baal284',fatie:'fatie284'};
function incNiv287(){const I=INC;const der=I.ci===I.E.ch.length-1;return der&&I.cp>.6?2:(I.ci>0||I.cp>.45)?1:0}
function incCombattant287(){const I=INC,b=DUE.F[INCF287[I.k]];if(!b)return null;const n=incNiv287(),k='inc287_'+n,f=JSON.parse(JSON.stringify(b));f.k=k;
 f.n=I.C.heros.n+(n<2?' · évolution '+(n+1)+'/3':' · tout son art');
 if(n===0){f.pv=Math.round((b.pv||110)*.75);f.arme={n:'Bâton',po:100,d:Math.max(6,Math.round(((b.arme||{}).d||10)*.6))};f.sp2=null;f.sp2n='';f.sp3=null;f.sp3n=''}
 else if(n===1){f.pv=Math.round((b.pv||110)*.9);f.arme=Object.assign({},b.arme,{d:Math.round(((b.arme||{}).d||10)*.85)});f.sp3=null;f.sp3n=''}
 f.d=(n===0?'Au début du chemin : un bâton, un seul pouvoir. ':n===1?'En chemin : deux pouvoirs. ':'')+(b.d||'');DUE.F[k]=f;try{if(window.MOD3X&&MOD3X[INCF287[I.k]])MOD3X[k]=MOD3X[INCF287[I.k]]}catch(e){}return k}
function incDefi287(o){const I=INC;I.pause=1;const adv=I.ci===0&&I.cp<.2?'commandeur':(parseInt(I.C.an&&I.C.an.match(/\d{4}/)?I.C.an.match(/\d{4}/)[0]:'0')>=1742?'mussard':'milicien');
 const d=document.createElement('div');d.style.cssText='position:fixed;inset:0;z-index:70;display:flex;align-items:center;justify-content:center;background:rgba(10,8,4,.6)';const niv=incNiv287();
 d.innerHTML='<div class="bloc" style="max-width:560px;background:#2a2218;color:#f1e6cc;padding:20px;border:1px solid #8a7040;border-radius:10px;font-family:Georgia,serif"><h2 style="margin-top:0">Un chasseur, seul</h2><p>Il est sans chien. Il vous a vu et lève son arme.</p><p style="font-size:14px;opacity:.85">Vos forces : '+['un bâton et un seul pouvoir — vous débutez','deux pouvoirs — le chemin vous a appris','tout votre art — vous êtes devenu ce que vous deviez être'][niv]+'.</p><button class="bt" data-c="1">Se battre</button> <button class="bt sec" data-c="0">Fuir dans les fourrés (souffle −1)</button></div>';document.body.appendChild(d);
 d.querySelector('[data-c="0"]').onclick=()=>{d.remove();I.pause=0;incPris287(o)};
 d.querySelector('[data-c="1"]').onclick=()=>{d.remove();const k=incCombattant287();if(!k||typeof ouvrirDuel!=='function'){I.pause=0;incPris287(o);return}I.duel=1;
  ouvrirDuel(k,adv,r=>{setTimeout(()=>{if(!INC)return;I.duel=0;window.BTUON=1;I.last=performance.now();if(r&&r.ok){o.hs=1;if(o.root)o.root.visible=false;I.pause=0;incMsg287('Le chasseur est à terre. Le chemin est libre.')}else{I.pause=0;incPris287(o)}},200)})}}
function incPris287(o){const I=INC;I.souffle--;incHud287();if(I.souffle<=0){I.pause=1;incNarre287('Repris','Les chiens vous ont trouvé. On vous ramène… mais l’histoire se souvient qu’on recommence toujours.','',()=>{const k=I.k,ci=I.ci,F=I.F;incFermer287();incOuvrir287(k,ci);if(INC)INC.F=F});return}
 // ramené au dernier point sûr, un peu en arrière sur le chemin
 const i=Math.max(1,Math.floor(I.cp*(I.N-1))-18),p=I.P[i];I.h.x=p[0];I.h.z=p[1];I.trace=[];I.saut=1;incMsg287('Vu ! Vous rebroussez chemin dans les fourrés. Souffle '+I.souffle+'/3.')}
function incFinCh287(){const I=INC,C=I.C,E=I.E,ci=I.ci;incNarre287(C.t,C.finT,'',()=>{const F=I.F;if(ci+1<E.ch.length){const k=I.k;incFermer287();incOuvrir287(k,ci+1);if(INC)INC.F=F}else{incFermer287();F&&F()}})}
function incFermer287(){const I=INC;if(!I)return;INC=null;try{I.off&&I.off()}catch(e){}try{I.R.dispose()}catch(e){}I.el.remove();window.BTUON=0}
function incQuitter287(){if(!INC)return;const ret=INC.ret;incFermer287();try{ret&&ret()}catch(e){}}
// ----- revenir dans l'histoire : la partie reprend à l'époque du héros, lui ou elle à la tête du camp -----
function incJouer287(k){const E=INC287[k];if(!E)return;incOuvrir287(k,0);if(!INC)return;INC.ret=()=>{try{menu302()}catch(e){}};
 INC.F=()=>{try{if(E.fin.f==='sim')departSim280();else departEpo284(E.fin.k);setTimeout(()=>{try{const nom={simang:'Simangavole',laverdure:'Laverdure',dimitile:'Dimitile',mafate:'Mafate',cimendef:'Cimendef',baal:'Baal',fatie:'Fatie',anchaing:'Anchaing'}[k];const ci=S.epoCamp!=null?S.epoCamp:(camps()[0]||{}).i;const P=(S.pp||[]).filter(p=>adulte(p)&&!p.mort);const P2=P.filter(p=>typeof campDe!=='function'||campDe(p)===ci);const ch=(typeof chefDe==='function'&&chefDe(ci))||P2.find(p=>k==='simang'?p.g==='f':p.g!=='f')||P2[0]||P.find(p=>k==='simang'?p.g==='f':p.g!=='f')||P[0];if(ch&&nom){ch.n=nom;if(k==='simang')ch.g='f';S.chefs=S.chefs||{};if(ch.id!=null)S.chefs[ci]={id:ch.id};S.inc287=k;log('👑 '+nom+' est à la tête du camp.');peindre();sauve()}}catch(e){}},2600)}catch(e){console.warn(e)}}}
// le menu des épopées : chacune se joue d'abord en incarnation
{const cv=choixVoie;choixVoie=function(){const r=cv.apply(this,arguments);try{const b=document.getElementById('v-epo');if(b){b.innerHTML='<b>Les épopées des rois marrons</b><small>Incarner celui ou celle qui va devenir roi : le chemin à pied, sur les vraies vallées, de la plantation à son camp. Puis la partie reprend, à son époque.</small>';
 b.onclick=()=>{const e=$('ecran');e.innerHTML='<div class="bloc"><h1>Les épopées des rois marrons</h1><p class="note">On joue le chemin qui mène chacun à la tête des siens. Dans le récit, on les appelle par leur nom malgache quand il est connu. Archives et tradition sont toujours dites comme telles.</p>'+['simang','anchaing','laverdure','dimitile','mafate','cimendef','baal','fatie'].map(k=>{const E=INC287[k];return '<button class="op dif" data-inc="'+k+'"><b>'+E.n+'</b><small>'+E.sous+' · '+E.ch.length+' partie'+(E.ch.length>1?'s':'')+'</small></button>'}).join('')+'<button class="bt sec" id="incR">Retour</button></div>';
  e.querySelectorAll('[data-inc]').forEach(x=>x.onclick=()=>{e.hidden=true;incJouer287(x.dataset.inc)});$('incR').onclick=()=>choixVoie()}}}catch(x){}return r}}
