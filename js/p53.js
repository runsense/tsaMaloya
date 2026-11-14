// ===== p53 : les commandes à la manière de JC Conception (formes et typographie, pas ses couleurs) =====
// Trois familles, selon leur rôle :
//  · très utiles (ce qui engage la partie : boutons principaux, onglets, familles de construction) : cadre net, forme de pilule, Montserrat capitales espacées ;
//  · ponctuelles (une action qu'on fait et qu'on oublie : secondaires, actions de liste, +/−) : sans cadre, juste le texte, souligné au survol ;
//  · éphémères (messages, compteurs, états passagers) : transparentes, leur opacité suit leur poids dans le jeu.
{const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Open+Sans:wght@400;600&display=swap';document.head.appendChild(l)}
{const st=document.createElement('style');st.id='charteJC';st.textContent=`
:root{--cmd:'Montserrat',system-ui,sans-serif;--cmdTxt:'Open Sans',system-ui,sans-serif}
/* très utiles : cadre et pilule */
.bt:not(.sec):not(#cvBtn),.tab,#kbp .fam button,#cvX,#gjNext,#gjAuto{font-family:var(--cmd)!important;font-weight:700!important;letter-spacing:.09em;text-transform:uppercase;border-radius:999px!important;border:1.5px solid currentColor!important;box-shadow:none}
.bt:not(.sec):not(#cvBtn){font-size:13px!important;padding:9px 18px!important}
#cvBtn{border-radius:14px!important;font-family:var(--cmd)!important}#cvBtnT{font-family:var(--cmd);font-weight:700;letter-spacing:.06em;text-transform:uppercase;font-size:11px}
.tab{font-size:11.5px!important;padding:6px 12px!important;border-color:rgba(232,226,210,.35)!important}
.tab.on{border-color:currentColor!important}
.bt:not(.sec):hover,.tab:hover{filter:brightness(1.08);transform:translateY(-1px)}
/* les choix du conte : cartes à coins arrondis, comme les cartes du site */
.op{border-radius:14px!important;border-left:none!important;border:1.5px solid rgba(232,226,210,.22)!important;font-family:var(--cmdTxt)}
.op b{font-family:var(--cmd);font-weight:700;letter-spacing:.01em}
.op:hover{border-color:rgba(232,190,90,.8)!important}
/* ponctuelles : sans cadre */
.bt.sec,#gjOff,.ac button,[data-cpa],.besR,#kbp .cd small{font-family:var(--cmd)!important}
.bt.sec,#gjOff{background:transparent!important;border:none!important;box-shadow:none!important;font-weight:600!important;font-size:13px!important;letter-spacing:.02em;text-transform:none;padding:6px 10px!important;text-decoration:underline;text-decoration-color:transparent;text-underline-offset:4px;transition:text-decoration-color .2s,opacity .2s}
.bt.sec:hover,#gjOff:hover{text-decoration-color:currentColor}
.act{border-left:none!important;border-radius:10px;background:rgba(255,255,255,.04)!important;font-family:var(--cmdTxt)}
.act:hover{background:rgba(255,255,255,.09)!important}
/* éphémères : transparentes */
#toast{background:rgba(20,26,27,.62)!important;backdrop-filter:blur(6px);border-left:none!important;border-radius:999px;font-family:var(--cmd);font-weight:600;font-size:13.5px!important;letter-spacing:.02em;transition:opacity .4s}
.pill{background:rgba(255,255,255,.06)!important;border-left:none!important;border-radius:999px;font-family:var(--cmd);font-size:12px;font-weight:600;transition:opacity .4s}
.pill:hover{opacity:1!important}
#evMin,#gjT{font-family:var(--cmd);font-weight:600;letter-spacing:.03em}
#kbp .msg span{border-radius:999px!important;background:rgba(20,19,18,.6)!important;backdrop-filter:blur(4px)}
`;document.head.appendChild(st)}
// l'opacité des éphémères suit leur poids : ce qui menace ou coûte reste net, le reste s'efface à moitié
const POIDS=[[/mort|meurt|tué|cyclone|attaque|détachement|famine|manque|perdu|sombré|blessé|incendie/i,1],[/savoir|comptoir|élu|naît|fonde|bâti|découv|nouveau/i,.92],[/./,.72]];
function poidsDe(t){for(const [r,v] of POIDS)if(r.test(t||''))return v;return .72}
setInterval(()=>{try{const t=$('toast');if(t&&!t.hidden){const v=poidsDe(t.textContent);t.style.opacity=v}
 document.querySelectorAll('#top .pill,#fc .pill,.pill').forEach(p=>{if(p.matches(':hover'))return;const tx=p.textContent||'';let v=.62;const m=tx.match(/dans (\d+) saison/);if(m)v=Math.max(.55,Math.min(1,1.15-+m[1]*.1));else if(/pause|attente/i.test(tx))v=.5;else if(poidsDe(tx)>=1)v=1;p.style.opacity=v})}catch(e){}},600);
