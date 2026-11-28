// ===== p417 : quand une archive existe, la photo d'époque accompagne la fiche (train, autorail…).
// Sources libres (Wikimedia Commons) : domaine public, ou licence CC BY-SA créditée. Pour le car courant d'air,
// aucune photo libre de droits n'a été trouvée : rien n'est inventé à la place. =====
const PH417={
 e1882:[[()=>IMG417_loco,'Une locomotive-tender construite par les établissements Weidknecht, à Paris, pour le réseau de La Réunion, en 1878. Photographie d’époque, auteur inconnu — domaine public (Wikimedia Commons).'],
        [()=>IMG417_train,'« La Réunion – St-Denis – Train arrêté, place du Gouvernement ». Carte postale vers 1900-1910, collection H. M., auteur inconnu — domaine public (Wikimedia Commons).']],
 courant1920:[[()=>IMG417_car,'Le car courant d’air dans le jeu (modèle 3D d’après les cars des années 1920-1960). Ce n’est pas une photo d’époque : aucune photo libre de droits n’a été trouvée.']],
 train1956:[[()=>IMG417_auto,'Le poste de conduite de l’autorail Billard A 150 D8 de 1959, conservé à la Grande Chaloupe. Photographie de 2009, Tonton Bernardo — CC BY-SA 3.0 (Wikimedia Commons).']]};
const fig417=L=>L.map(([f,c])=>'<figure style="margin:8px 0"><img src="data:image/jpeg;base64,'+f()+'" alt="" style="width:100%;border-radius:6px;filter:none"><figcaption style="font-size:12px;opacity:.8;margin-top:3px">📷 '+c+'</figcaption></figure>').join('');
{const m0=modal;modal=function(){const r=m0.apply(this,arguments);try{const id=S&&S.evq&&S.evq[0],L=id&&PH417[id];if(L){const h=document.querySelector('#modal h2');if(h&&!document.querySelector('#modal .ph417')){const d=document.createElement('div');d.className='ph417';d.innerHTML=fig417(L);const pb=h.nextElementSibling;(pb&&pb.tagName==='P'?pb:h).after(d)}}}catch(e){}return r}}
setInterval(()=>{try{const b=document.getElementById('fic208b');if(!b||document.getElementById('fic417'))return;const h=b.parentElement.querySelector('h1'),t=h&&h.textContent.trim();
 const id=Object.keys(PH417).find(k=>{try{return EV[k]&&(EV[k].t===t||(window.TR363&&TR363[EV[k].t]===t))}catch(e){return false}});if(!id)return;
 const d=document.createElement('div');d.id='fic417';d.innerHTML=fig417(PH417[id]);b.before(d)}catch(e){}},500);
try{Object.assign(window.TR363=window.TR363||{},{
 '📷 Le car courant d’air dans le jeu (modèle 3D d’après les cars des années 1920-1960). Ce n’est pas une photo d’époque : aucune photo libre de droits n’a été trouvée.':'📷 The “courant d’air” bus in the game (3D model based on 1920s-1960s buses). Not a period photograph: no free-licence photo was found.',
 '📷 Une locomotive-tender construite par les établissements Weidknecht, à Paris, pour le réseau de La Réunion, en 1878. Photographie d’époque, auteur inconnu — domaine public (Wikimedia Commons).':'📷 A tank locomotive built by Weidknecht in Paris for the Réunion railway, 1878. Period photograph, unknown author — public domain (Wikimedia Commons).',
 '📷 « La Réunion – St-Denis – Train arrêté, place du Gouvernement ». Carte postale vers 1900-1910, collection H. M., auteur inconnu — domaine public (Wikimedia Commons).':'📷 “La Réunion – St-Denis – Train stopped, Place du Gouvernement”. Postcard c. 1900-1910, H. M. collection, unknown author — public domain (Wikimedia Commons).',
 '📷 Le poste de conduite de l’autorail Billard A 150 D8 de 1959, conservé à la Grande Chaloupe. Photographie de 2009, Tonton Bernardo — CC BY-SA 3.0 (Wikimedia Commons).':'📷 The driving cab of the 1959 Billard A 150 D8 railcar, preserved at Grande Chaloupe. Photograph 2009, Tonton Bernardo — CC BY-SA 3.0 (Wikimedia Commons).'})}catch(e){}
