# O'Jardin : Front-End

## Présentation

O'Jardin est une plateforme numérique destinée aux amateurs de jardinage. L'application permet de rechercher des fiches techniques détaillées sur divers fruits et légumes de saison. Elle utilise une application météorologique qui non seulement offre des prévisions locales. Les jardiniers peuvent optimiser leurs plantations et leurs récoltes en fonction de ces données. Les utilisateurs peuvent y personnaliser leur potager virtuel.

## Spécificités techniques & dépendances

- Bibliothèque React mise en place avec le bundler Vite et les packages suivants : Tailwind CSS, Redux Toolkit.

- Nécessite l'installation de [Node.js](https://nodejs.org/en)


##  Version de développement 
Cloner le projet en local et le lancer :

```sh
cd dossier # emplacement local
git clone git@github.com:... # adresse SSH

# avec pnpm
pnpm i # pour installer/mettre à jour les dépendances
pnpm run dev # pour l'ouvrir dans http://localhost:3000/
```
Ajouter un fichier `.env` à la racine du projet et y préciser :
```VITE_API_URL=http://localhost:4000```



##  Version de production

Pour construire le projet pour la production (version prête pour hébergement) : 

```sh
# avec pnpm
pnpm build
```
