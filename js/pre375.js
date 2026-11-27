// les modèles refaits gardent le même nom de fichier : on ajoute un numéro de version à l'adresse pour que le navigateur
// ne ressorte pas l'ancien de son cache (le fanjan surtout)
const VER375={plante_fanjan:3};
{const f0=window.fetch.bind(window);window.fetch=function(u,o){try{if(typeof u==='string'){const m=u.match(/modeles\/([\w-]+)\.txt$/);if(m&&VER375[m[1]])u+='?v='+VER375[m[1]]}}catch(e){}return f0(u,o)}}
