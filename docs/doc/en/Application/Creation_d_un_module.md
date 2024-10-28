---
sidebar_position: 5
description: ''
---

# Creating a module

The application uses a module structure. Each functional package must export an object in the _Module_ format defined in the **CORE** package.

A module is defined with the following elements:

```tsx
export interface Module {
  name: string;
  title?: string;
  subtitle?: string;
  icon?: string;
  compatibilityAOS?: {
    /** Name of the web  module */
    moduleName: string;
    /** Version of the web module, this value will be filled in automatically with the information obtained from the web instance. */
    moduleVersion?: version;
    /** Minimum web module version (included) */
    downToVersion?: version;
    /** Maximum web module version (excluded) */
    upToVersion?: version;
  };
  disabled?: boolean;
  menus?: {
    [menuKey: string]: Menu;
  };
  screens?: {
    [screenKey: string]: Screen;
  };
  translations?: {
    [languageKey: string]: any;
  };
  reducers?: {
    [key: string]: Reducer;
  };
  backgroundFunctions?: Function[];
  models?: {
    objectFields?: ObjectFields;
    sortFields?: SortFields;
    searchFields?: SearchFields;
    formsRegister?: FormConfigs;
    headerRegisters?: Function;
  };
  requiredConfig?: string[];
}
```

A module therefore has :

- a name (_name_) to give the module an identity key. This name must be unique among the modules used in the application, to avoid confusion.
- a title (_title_) to be displayed to the user on the drawer when no app is selected.
- a subtitle (_subtitle_) to be displayed to the user under the module button in the drawer to aid comprehension. The display of these subtitles can be configured in the _Application_ component using the _showModulesSubtitle._ attribute.
- an icon name (_icon_) to be displayed on the module button in the drawer. Please note that this icon must belong to the [Bootstrap database](https://icons.getbootstrap.com/).
- web instance compatibility information (_compatibilityAOS_). It's possible to overload this information from another module by indicating different versions of the same web module name. A version must be a string composed of three numbers. The web module version is automatically retrieved from the server information.
- a set of menus (_menus_) to be displayed in the drawer.
- a set of screens belonging to the module (_screens_).
- a set of translations for the module (_translations_). Translations must be supplied in key-value format for each supported language.
- a set of reducers for the module (_reducers_). A reducer is a simple function that updates the state of an object according to the action passed to it. In our context, reducers are the redux functions that update the store during API calls, for example. All reducers created in the module must be exported to access the corresponding part of the store in the various screens.
- a list of functions to be executed in the background if necessary (_backgroundFunctions_). These functions are executed every 5 minutes.
- a configuration of templates for API calls (_models_).
- a list of web application names to retrieve the associated configuration (_requiredConfig_), such as 'AppBase' or 'AppMobileSettings'. Each configuration will then be retrieved using the application's router. The associated routes must therefore be specified to the router. New routes can be set in the application configuration file via the _additionalRoutes_ attribute.
