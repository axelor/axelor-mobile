---
id: Getting Started
sidebar_position: 2
sidebar_class_name: icon started
---

# Getting started

Guide d’installation pour les systèmes d’exploitation Ubuntu. ([Documentation officielle de React Native](https://reactnative.dev/docs/environment-setup))

## Environnement de développement

### Installer NodeJS

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Pour vérifier la version de Node installée, il suffit d’exécuter `node --version`.

Une fois NodeJS installé, npm est disponible. On peut vérifier sa version avec `npm -version`.

Ce projet est basé sur la version de Node 16.x

### Installer Java 11

Ce projet nécessite java 11. Pour vérifier votre version de java, il faut exécuter la commande `java -version`.

```bash
sudo apt install openjdk-11-jre-headless
```

### Mise en place de l’environnement Android

La première étape est de télécharger [Android Studio](https://developer.android.com/studio/index.html) pour gérer les SDK et les émulateurs.

:::info
💡 Dans le cas de problème de versions, il faut utiliser le SDK Manager d’Android Studio afin de configurer les différents outils installés.

Dans l’onglet **SDK Platforms**, il faut vérifier qu’au moins Android 10 soit installé.

Dans l’onglet **SDK Tools**, cochez la case “Show package details” et vérifiez que les versions 3.18.1 et 3.22.1 de CMake sont installées. La version d’Android SDK doit au moins être 30 et 31. Il faut également installer Android Emulator et Android SDK Platform-Tools.

![android_installation.png](/img/fr/android_installation.png)

:::

Il faut ensuite configurer des variables d’environnement.

```bash
export ANDROID_SDK_ROOT=$HOME/<Path to Android folder>/Android/Sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

Pour appliquer ses changements, il faut ensuite exécuter la commande `source .bashrc`. Cela met à jour les chemins, il est possible de vérifier que le processus a fonctionné avec la commande `echo $ANDROID_SDK_ROOT`.

La prochaine étape est de configurer un émulateur si nécessaire avec l’outil **Virtual Device Manager** d’_Android Studio_.

## Configuration de l’application

Un fichier de configuration rapide `app.config.js` est à votre disposition pour définir facilement certains éléments de l’application.

Les configurations prises en considération sont :

- **testInstanceConfig:** L’instance de test permettant de remplir automatiquement en mode debug les champs url, username et password de la page de connexion**.**
- **releaseInstanceConfig:** La configuration d’instance pour le mode release. Cette configuration permettant de remplir automatiquement l’url sur la page de connexion mais également de cacher l’input d’url dans le cas où le client ne souhaite pas que les utilisateurs puissent la modifier.
- **defaultLanguage:** La langage par défaut pour tous les utilisateurs. Cette configuration permet de définir la langue par défaut de l’application. Cependant, cette valeur est surchargée par la langue par défaut de l’utilisateur paramétrée sur l’ERP. La langue par défaut de l’application en anglais
- **defaultRequestLimit:** Le nombre d’élément récupéré par requête par défaut. Cette valeur peut être surchargée sur les écritures des requêtes si nécessaire. Sa valeur par défaut est 10.
- **enableConnectionSessions**: Permet d’activer ou non la gestion des sessions de connexion. Si la configuration est activée alors l’utilisateur pourra gérer les sessions qui souhaite garder en mémoire sur son téléphone. Si elle est désactivée, alors l’application gardera en mémoire seulement la dernière session de connection.
- **allowInternetConnectionBlock**: Permet d’autoriser aux utilisateurs de passer en mode hors ligne en bloquant la connection internet pour les requêtes.
- **retrocompatibilityAOS6**: Permet d’activer la rétrocompatibilité avec les versions 6.4 & 6.5 d’AOS. Si la configuration est activée alors un router viendra tester les routes de la v6 d’AOS. Si la ressource n’est pas trouvée alors le router retournera la route d’AOS v7 pour la requête sinon c’est la route d’AOS v6 qui sera utilisée.
- **additionalRoutes**: Permet d'ajouter des chemins au récupérateur de configurations. Il est également possible de mettre à jour des chemins existants. Si la configuration _retrocompatibilityAOS6_ est active, il faut définir les chemins à la fois pour Axelor Open Suite version 6 et 7 sinon seule la version 7 est nécessaire.
- **versionCheckConfig**: Permet d’activer la vérification de version entre la version minimun requise définie sur le web et la version de l’application. Si elle est activée alors l’utilisateur sera forcé de faire la mise à jour grâce aux liens renseignés ou bien en contactant l’administrateur si les versions ne correspondent pas.
- **showModulesSubtitle**: Permet d’afficher les sous-titres des modules dans le menu.
- **themeColorsConfig**: Permet de venir modifier le thème classique de l’application en surchargeant les couleurs standards.
- **writingStylesConfig**: Permet de venir modifier les thèmes d’écriture en surchargeant la configuration standard.
- **logoFile**: Permet de personnaliser le logo affiché sur la page de connexion pour les projets clients.

Un exemple de fichier de configuration est [disponible sur Github](https://github.com/axelor/axelor-mobile/blob/7.0/src/app.config.js).

## Démarrer le projet

### Ajouter ou retirer un module métier pour la génération d’APK

Les modules peuvent être activés ou desactivés directement depuis le fichier App.js du dossier _example_ ou alors depuis le module de configuration **Axelor mobile settings** d’[AOS](https://github.com/axelor/axelor-open-suite) disponible à partir de la version 7.0.0.

Pour gérer les modules directement depuis le composant Application, il suffit d’ajouter ou de retirer un objet `Module` de l’attribut **modules**.

```jsx
import React from 'react';
import {Application} from '@axelor/aos-mobile-core';
import {StockModule} from '@axelor/aos-mobile-stock';
import {ManufacturingModule} from '@axelor/aos-mobile-manufacturing';
import application_properties from '../package.json';
import {app_config} from './app.config';

const App = () => {
  return (
    <Application
      modules={[StockModule, ManufacturingModule]}
      mainMenu="auth_menu_user"
      version={application_properties.version}
      configuration={app_config}
    />
  );
};

export default App;
```


## Page de connexion personnalisée

L'application prend en charge l'utilisation d'une page de connexion personnalisée. Vous pouvez fournir votre propre composant de connexion via la propriété customLoginPage dans le composant Application. Si une page de connexion personnalisée est fournie, elle remplacera l'écran de connexion par défaut.

### Commandes importantes

- Installer les dépendances : `yarn clean && yarn`
- Build les packages : `yarn build`
- Installer l'APK de développement : `yarn android`
- Démarrer Metro pour le développement : `yarn start`
- Générer un APK de production : `yarn android:apk`
- [Générer un app bundle](https://reactnative.dev/docs/signed-apk-android#generating-the-release-aab) : `yarn android:bundle`
