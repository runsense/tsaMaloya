# TsaMaloya

Un jeu sur l'histoire de La Réunion : le marronnage, la colonie, et une île à bâtir.

- **Un seul jeu, l'Histoire** : La Réunion de 1663 à aujourd'hui, racontée côté marrons ou côté colonie.
- **La vie du camp** : on y entre depuis la carte, dans la peau de quelqu'un, au rythme du camp.
- **Les forces de l'île** : elles entrent en scène à leur date, pèsent sur les choix, et peuvent ouvrir des utopies.
- **Les épopées** : à pied, dans la peau de ceux qui les ont vécues.

## Jouer

En ligne : la page GitHub Pages du dépôt (Settings → Pages → branche `main`, dossier `/`).

En local, dans VS Code : ouvrir le dossier, installer l'extension **Live Server**, clic droit sur `index.html` → *Open with Live Server*.
(Le jeu charge ses modèles 3D par le réseau : ouvrir `index.html` directement par double clic ne suffit pas, il faut un petit serveur.)

## Organisation

- `index.html` : la page ; elle charge les scripts dans l'ordre.
- `js/lib/three.min.js` : three.js r128 (MIT).
- `js/data/` : le relief (`dem.js`), l'image satellite (`satellite.js`, Copernicus Sentinel-2), les modèles allégés (`meshy.js`).
- `js/*.js` : le jeu. `b.js`, `c.js` le cœur ; `p*.js` les ajouts successifs, chacun commenté en tête.
- `modeles/` : personnages, plantes, bêtes et bâtiments 3D (glTF en base64).

Images satellite : Copernicus Sentinel-2 (ESA), données libres. Modèles 3D : générés avec Meshy, retravaillés pour le jeu.

## Fait avec Claude

Le code du jeu a été écrit avec **Claude**, l'assistant d'Anthropic, à partir des idées, des choix historiques et des relectures de son auteur : la carte en relief, l'Histoire, la vie du camp, les forces de l'île, les cinématiques, les petits jeux, l'intégration et l'animation des modèles 3D. L'auteur décide de ce que raconte le jeu ; Claude construit, teste et corrige.

Vous aussi : [claude.ai](https://claude.ai).

© L'auteur de TsaMaloya — tous droits réservés. Vous pouvez jouer librement ; le code, les modèles et les textes ne peuvent pas être réutilisés sans accord.
