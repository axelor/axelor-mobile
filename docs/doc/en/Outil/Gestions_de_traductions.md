---
sidebar_position: 1
description: ''
---

# Translation management

The translations required by the application are saved in the phone's storage. Each module is responsible for generating its own translations.

![architecture_translations](/img/en/architecture_translations.png)

Each module must include in its architecture an i18n folder with json files, one file per language.

Within the translation files, the keys must follow a nomenclature in order to structure all translations and identify their origin.

The nomenclature is as follows: `<Module>\_<Signification>`.

All translation keys must be written in **English** to enable the user to continue using the application even if the translation value has not been found.

Simply export them with the module in the dedicated attribute, and the application will take them into account.

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

Once the translation has been defined, it can be used in screens or components. A hook is available in the core package to access the translator : `useTranslator`

```tsx
import {useTranslator} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';
...
const I18n = useTranslator();

...
<Text>{I18n.t('HelloWorld')}</Text>
```

For the moment, the mobile application officially supports two languages: French and English. However, the translation component interacts with ERP, and administrators can send the application's translations in JSON files to the ERP database. Users can then modify them or add new translations to add a new language to the application. The languages available on the mobile application are retrieved from the database on the _com.axelor.apps.base.db.Language_ object. If the user chooses a language whose translations are not defined, they will be displayed in English, which is the default language. ERP translations are retrieved each time the language is changed on the mobile application's user page.

From a functional point of view, when using the translator, if the translation exists in the data retrieved from the server, then this is the one used, otherwise the system looks in the application database, and if the translation doesn't exist, then the translator returns the translation key.
