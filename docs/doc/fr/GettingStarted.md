---
sidebar_position: 2
description: ''
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

### Gestion des instances autorisées

Par défaut, Apple bloque les connexions HTTP non sécurisées (non-HTTPS) via une politique de sécurité appelée App Transport Security (ATS), introduite pour renforcer la confidentialité et la sécurité des utilisateurs.

Cette configuration a été modifiée sur l'application standard pour permettre d'utiliser les instances de test hébergées sur le domaine axelor.io.

Si vous souhaitez activer ou désactiver cette exception sur vos projets, voici la marche à suivre :

- **Étape 1** : Ouvrez le fichier Info.plist de votre projet iOS.

- **Étape 2** : Ajoutez (ou modifiez) la section suivante pour autoriser les connexions HTTP vers un domaine spécifique :

```
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSExceptionDomains</key>
  <dict>
    <key>votre-domaine.com</key>
    <dict>
      <key>NSExceptionAllowsInsecureHTTPLoads</key>
      <true/>
      <key>NSIncludesSubdomains</key>
      <true/>
    </dict>
  </dict>
</dict>
```

- **Étape 3** : Remplacez votre-domaine.com par le domaine souhaité.

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

L'application prend en charge l'utilisation d'une page de connexion personnalisée. Vous pouvez fournir votre propre composant de connexion grâce à l'attribut _customLoginPage_ du composant _Application_. Si une page de connexion personnalisée est fournie, elle remplacera le système de connexion par défaut.

### Ajouter un module depuis Nexus

Certaines fonctionnalités ne sont pas disponibles sur l'application standard et nécessitent l'ajout de _modules pro_. C'est le cas par exemple du mode hors-ligne ou de l'OCR des notes de frais. Ces modules sont publiés sur le Nexus d'Axelor dans le repository **npm-enterprise**. Voici la marche à suivre pour les récupérer :

- **Étape 1** : obtenir le token de connexion à Nexus

Lancez la commande suivante dans votre terminal en utilisant vos identifiants Nexus fournis par Axelor.

```bash
echo -n "username:password" | base64
```

- **Étape 2** : ajouter ce token en variable d'environnement

Ajoutez la ligne suivante à votre fichier .bashrc ou .zshrc en utilisant la valeur de token obtenue à l'étape précédente et redémarrez votre terminal.

```bash
export NEXUS_TOKEN=value
```

- **Étape 3** : configurer le registre Nexus

Pour permettre à l'application d'aller récupérer des packages sur le Nexus, il faut configurer un nouveau registre sur le projet.

Ajoutez un fichier .npmrc sur votre projet avec le contenu suivant:

```bash
@aos-mobile:registry=https://repository.axelor.com/nexus/repository/npm-enterprise/
//repository.axelor.com/nexus/repository/npm-enterprise/:_auth=${NEXUS_TOKEN}
```

- **Étape 4** : ajouter la dépendance

Il faut ensuite ajouter la dépendance du module à l'application de la même manière que pour les modules standards, à savoir ajout de la dépendance dans le package.json puis transmission de l'objet `Module` à l'application :

```jsx
import React from 'react';
import {Application} from '@axelor/aos-mobile-core';
import {HrModule} from '@axelor/aos-mobile-hr';
import {DataCaptureModule} from '@aos-mobile/data-capture';
import application_properties from '../package.json';
import {app_config} from './app.config';

const App = () => {
  return (
    <Application
      modules={[HrModule, DataCaptureModule]}
      mainMenu="auth_menu_user"
      version={application_properties.version}
      configuration={app_config}
    />
  );
};

export default App;
```

Certains modules entreprises de l’application peuvent nécessiter l’installation d’un module complémentaire sur l’instance Axelor Open Suite.

### Commandes importantes

- Installer les dépendances : `yarn clean && yarn`
- Build les packages : `yarn build`
- Installer l'APK de développement : `yarn android`
- Démarrer Metro pour le développement : `yarn start`
- Générer un APK de production : `yarn android:apk`
- [Générer un app bundle](https://reactnative.dev/docs/signed-apk-android#generating-the-release-aab) : `yarn android:bundle`
