# 📦 eStock API

> Une API robuste, typée et moderne pour gérer efficacement vos stocks, produits, utilisateurs, fournisseurs et mouvements.

![TypeScript](https://img.shields.io/badge/Code-TypeScript-blue?style=flat-square&logo=typescript)
![Node](https://img.shields.io/badge/Node.js-18.x-green?style=flat-square&logo=node.js)
![GraphQL](https://img.shields.io/badge/API-GraphQL-ff69b4?style=flat-square&logo=graphql)
![License](https://img.shields.io/github/license/Frejuste26/estock-api?style=flat-square)
![Status](https://img.shields.io/badge/Status-En%20développement-yellow?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-ready-blue?style=flat-square&logo=docker)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue?style=flat-square&logo=mysql)

---

## 🧭 Sommaire

1. [🧩 Fonctionnalités](#-fonctionnalités)
2. [🛠️ Technologies](#️-technologies)
3. [📋 Prérequis](#-prérequis)
4. [⚙️ Configuration](#️-configuration)
5. [🏛️ Architecture du projet](#️-architecture-du-projet)
6. [🚀 Installation](#-installation-rapide-avec-docker)
7. [📡 Utilisation](#-utilisation)
8. [📘 Documentation](#-documentation)
9. [🤝 Contribution](#-contribution)
10. [🛡️ Licence](#️-licence)
11. [📫 Contact](#-contact)

---

## 🧩 Fonctionnalités

✅ API GraphQL intuitive et performante  
✅ Typage strict via TypeScript  
✅ Authentification JWT *(à venir)*  
✅ ORM Sequelize + MySQL  
✅ Architecture modulaire et scalable  
✅ Migrations & Docker Ready  
✅ Tests unitaires *(à venir)*  

---

## 🛠️ Technologies

| Technologie | Description |
|------------|-------------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=flat-square) | Environnement serveur |
| ![Express](https://img.shields.io/badge/-Express-black?logo=express&style=flat-square) | Framework HTTP |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square) | Superset JS avec typage |
| ![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?logo=graphql&logoColor=white&style=flat-square) | API moderne |
| ![Apollo Server](https://img.shields.io/badge/-Apollo-311C87?logo=apollo-graphql&logoColor=white&style=flat-square) | Serveur GraphQL |
| ![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?logo=sequelize&logoColor=white&style=flat-square) | ORM SQL pour Node |
| ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white&style=flat-square) | Base de données |
| ![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&style=flat-square) | Authentification par token |
| ![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white&style=flat-square) | Conteneurisation |
| ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white&style=flat-square) | Linting JS |
| ![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?logo=prettier&logoColor=black&style=flat-square) | Formatage du code |
| ![dotenv](https://img.shields.io/badge/-dotenv-8DD6F9?logo=dotenv&logoColor=white&style=flat-square) | Variables d’environnement |

---

## 📋 Prérequis

- [Node.js](https://nodejs.org) `v18+`
- [MySQL Server](https://www.mysql.com/)
- [Docker (optionnel)](https://www.docker.com/)
- Git, npm ou yarn

---

## ⚙️ Configuration

```bash
    git clone https://github.com/Frejuste26/estock-api.git
    cd estock-api
    npm install
    cp .env.example .env
```

Remplissez .env :

```bash
    APP_PORT=5080
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=estock
    JWT_SECRET=supersecretjwt
```

---

## 🏛️ Architecture du projet

```bash
    📦 estock-api/
    ├──📂 src/
    │   ├──📂 Configs/             # Configuration DB, ENV
    │   ├──📂 Graphql/             # Schemas & Resolvers
    │   ├──📂 Models/              # Modèles Sequelize
    │   ├──📂 Middlewares/         # Middlewares Express
    │   ├──📂 Utils/               # Fonctions utilitaires
    │   └──📜 server.ts            # Point d'entrée principal
    ├──📂 Migrations/              # Migrations Sequelize
    ├──📜 .env                     # Variables d’environnement
    ├──📜 .eslintrc.json           # Linting config
    ├──📜 .gitignore               # Fichiers à ignorer
    ├──📜 .prettierrc              # Formatage du code
    ├──📜 .sequelizerc             # Configuration CLI Sequelize
    ├──📜 Dockerfile               # Image Docker
    ├──📜 docker-compose.yml       # Services Docker
    ├──📜 package.json             # Dépendances et scripts
    ├──📜 tsconfig.json            # Configuration TypeScript
    └──📜 README.md
```

---

## 🚀 Installation rapide avec Docker

```bash
    git clone https://github.com/Frejuste26/estock-api.git
    cd estock-api
    cp .env.example .env
    docker-compose up --build
```

---

## 📡 Utilisation

L'API GraphQL est accessible à l’adresse suivante :

```bash
    http://localhost:5080/estock-api/v1/graphql
```

> Utiliser un outil comme [GraphQL Playground](https://www.apollographql.com/docs/graphos/platform/explorer), [Isomenia](https://insomnia.rest/) ou [Altair](https://altair.sirmuel.design/) pour tester les requêtes.

---

## 📘 Documentation

### 🔍 Exemple de requête GraphQL

```graphql
   query {
        products {
            productId
            productName
            currentStock
        }
    }
```

### 🔧 Exemple de mutation GraphQL

```graphql
    mutation {
        createProduct(input: {
            productName: "Nouveau Produit",
            currentStock: 100
        }) {
            productId
            productName
            currentStock
        }
    }
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

```bash
    # Forkez le dépôt
    git checkout -b feature/ma-fonction
    git commit -m "Ajout de ma nouvelle fonction"
    git push origin feature/ma-fonction
    # Créez une Pull Request
```

---

## 🛡️ Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 📫 Contact

Pour toute question ou collaboration :

- 📧 Email : [keifrejuste26@gmail.com](mailto:keifrejuste26@gmail.com)
- 📞 Téléphone : +225 0546930547
- 🌐 Site : [Portfolio](https://portfolio-edumanagers-projects.vercel.app/)

---

> “Le code bien pensé est un outil qui trace l’ordre dans le chaos.”
