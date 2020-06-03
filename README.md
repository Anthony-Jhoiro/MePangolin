# Me Pangolin

Ce projet a été réalisé comme test. J'ai choisis d'opter pour une solution 
certes volumineuse mais facilement extensible du côté Back-End comme du côté Front-End.

## Installation
Requis : 
- Node.js
- npm
- mongodb

Un jeu de  données est disponible dans `data.json`, à introduire dans une collection nommée "pangolins".
Vous pouvez par exemple utiliser comme login 'TedLePangolin' avec 'password' comme mot de passe (mot de passe de tout les comptes de 'data.json').


```shell script
# Cloner le repertoire 
git clone https://github.com/Anthony-Jhoiro/MePangolin.git
# Installer les packages côté Back-End
cd back-mepangolin
npm install
# Installer les packages côté Back-End
cd ../front-mepangolin
npm install
```

Ensuite, il f   ut modifier les fichiers de configuration en fonction de votre environement : 
(`back-mepangolin/environment.js` et `front-mepangolin/src/environments/environment.ts`).

> Il ne faut surtout pas oublier de remplir la valeur de la variable `JWT_SECRET` avec 
> n'importe quelle chaine de caractères dans le fichier `back-mepangolin/environment.js`.

Si vous avez la moindre question on remarque par rapport au projet n'hésitez pas à me contacter par mail (anthony.quere@lacatholille.fr).

Si 

## Lancement
Il faut lancer la commande `npm start` dans les 2 repertoires.

## Images :
- Icon : https://dribbble.com/shots/4831092#shot-description
- Background https://pixabay.com/vectors/rainforest-vegetation-trees-forest-294275/

