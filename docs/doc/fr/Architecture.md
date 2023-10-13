---
id: Architecture de l'application 
sidebar_position: 3
sidebar_class_name: icon architecture
---
# Architecture de l’application

L’objectif principal lors de la construction de l’architecture de l’application était d’avoir une grande flexibilité pour faciliter la personnalisation de l’application et l’adaptation aux projets clients.

Une architecture modulaire a donc été mise en place avec deux packages principaux :

- *@axelor/aos-mobile-ui* : une librairie de composants génériques pour la construction des écrans ainsi qu’un certain nombre d’outils (thèmes, animations, useClickOutside, …)
- *@axelor/aos-mobile-core* : une librairie plus technique avec le composant Application, des composants plus complexes avec l’utilisation de librairies externes, le système de connexion, la gestion du store,…

Ce dernier package est basé sur un troisième package qui permet de gérer les erreurs lors du rendu avec entre autres l’affichage d’un écran de secours, *@axelor/aos-mobile-error*.

![Schéma des dépendances](/img/fr/Schma_des_dpendances.png)

Schéma des dépendances

Chaque application métier est ensuite développée dans son propre module permettant ainsi de séparer les fonctionnalités. Il est ensuite possible de choisir quels modules sont nécessaires à l’application globale.

Enfin de bénéficier des différents outils mis à disposition par les packages de base, chaque module métier dépend des deux librairies principales présentées plus haut.

![Schéma des dépendances avec l’ajout d’un module métier](/img/fr/Schma_des_dpendances_module_mtier.png)

Schéma des dépendances avec l’ajout d’un module métier

D’un point de vue architecture du code dans le projet standard, les trois packages génériques sont présents à la racine du dossier *packages/* alors que les modules métiers sont situés dans le dossier *packages/apps/*. La version 7.0.0 d’AOM a apporté un changement dans l’architecture de l’application. En effet, les dossiers *android* et *ios* sont maintenant à la racine du projet. Ces dossier permettent notamment de gérer les versions de l’application sur les deux plateformes ainsi que les configurations et les permissions à demander à l’utilisateur.

```bash
axelor-mobile
├── *packages*/
│   ├── **apps/**
│   │   └── [*Modules métier*]
│   ├── **core** [*Package technique*]
│   │   └── ...
│   ├── **ui** [*Package visuel*]
│   │   └── ...
│   └── **error** [*Gestion des erreurs*]
│   │   └── ...
│   └── ...
├── src/ 
│   ├── App.js [*Application globale*]
│   └── app.config.js [*Fichier de configuration*]
├── android/ [*Gestion des paramétrages Android*]
└── ios/ [*Gestion des paramétrages iOS*]
```