---
sidebar_position: 1
description: ''
---

# Gestion des traductions

Les traductions nécessaires à l’application sont sauvegardées dans le storage du téléphone. Chaque module a la responsabilité de générer ses propres traductions.

![architecture_translations](/img/fr/architecture_translations.png)

Chaque module doit comporter dans son architecture un dossier i18n avec des fichiers json, un fichier par langage.

Au sein des fichiers de traductions, les clés doivent suivre une nomenclature afin de structurer l’ensemble des traductions et en connaître l’origine.

La nomenclature est la suivante : _`<Module>_<Signification>.`\_

L’ensemble des clés de traductions doivent être rédigées en **anglais** et permettre à l’utilisateur de pouvoir continuer à utiliser l’application même si la valeur de la traduction n’a pas été trouvée.

Il suffit ensuite de les exporter avec le module dans l’attribut dédié pour que l’application les prenne en compte.

```tsx
import {Module} from '@axelor/aos-mobile-core';
...
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';

const myModule : Module {
  name: "my-module-key";
  title: "MyModule_Name";
  subtitle: "MyModule_SubName";
  icon: ...;
  menus: {...};
  screens: {...};
	translations: {
    en: enTranslations,
    fr: frTranslations,
  },
	reducers: {...},
  models: {...}
}
```

Une fois la traduction définie, il est possible de l’utiliser dans les écrans ou les composants. Un hook est disponible dans le package core afin d’accéder au traducteur : `useTranslator`

```tsx
import {useTranslator} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';
...
const I18n = useTranslator();

...
<Text>{I18n.t('HelloWorld')}</Text>
```

L’application mobile supporte officiellement pour le moment deux langues : français et anglais. Cependant, le composant de traduction est en intéraction avec l’ERP et les administrateurs peuvent envoyer les traductions de l’application présentes dans les fichiers JSON vers la base de données de l’ERP. Les utilisateurs peuvent alors les modifier ou encore ajouter de nouvelles traductions pour ajouter un nouveau langage sur l’application. Les langues disponibles sur l’application mobile sont récupérées dans la base de données sur l’objet _com.axelor.apps.base.db.Language_. Si l’utilisateur choisit une langue dont les traductions ne sont pas définies alors elles s’affireront en anglais qui est la langue par défaut. Les traductions de l’ERP sont récupérées à chaque changement de langage sur la page utilisateur de l’application mobile.

D’un point de vue fonctionnel, lors de l’utilisation du traducteur, si la traduction existe dans les données récupérées du serveur alors c’est celle-ci qui est utilisée, sinon le système va regarder dans la base de l’application et dans le cas où la traduction n’existe pas alors le traducteur renvoit la clé de traduction.
