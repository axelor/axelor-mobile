---
sidebar_position: 5
description: ''
---

# Création d’un module

L’application fonctionne avec une structure de module. Ainsi, chaque package fonctionnel doit exporter un objet au format _Module_ défini dans le package **CORE**.

Un module est défini avec les éléments suivants :

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
    typeObjects?: ModuleSelections;
  };
  requiredConfig?: string[];
  moduleRegister?: Function;
}
```

Un module possède donc :

- un nom (_name_) permettant de donner une clé d’identité au module. Ce nom doit être unique entre les modules utilisés sur l’application pour éviter les confusions.
- un titre (_title_) à afficher à l’utilisateur sur le drawer lorsqu’aucune app n’est sélectionnée.
- un sous-titre (_subtitle_) à afficher à l’utilisateur sous le bouton du module dans le drawer pour aider à la compréhension. L’affichage de ses sous-titres est paramétrable depuis le composant _Application_ par l’attribut _showModulesSubtitle._
- un nom d’icône (_icon_) à afficher sur le bouton du module dans le drawer. Attention, cet icône doit appartenir à la [base Bootstrap](https://icons.getbootstrap.com/).
- les information de compatibilité avec l’instance web (_compatibilityAOS_). Il est possible de surcharger ses informations depuis un autre module en indiquant pour un même nom de module web des versions différentes. Une version doit être un string composé de trois numéros. La version du module web est récupérée et renseignée automatiquement depuis les informations du serveur.
- un ensemble de menus (_menus_) à afficher dans le drawer.
- un ensemble d’écrans appartenant au module (_screens_).
- un ensemble de traductions pour le module (_translations_). il faut fournir les traductions au format clé-valeur pour chaque langue supportée.
- un ensemble de reducers pour le module (_reducers_). Un reducer est un simple fonction qui permet de mettre à jour l’état d’un objet en fonction de l’action qui lui est transmise. Dans notre contexte, les reducers sont les fonctions redux qui permettent de mettre à jour le store lors des appels API par exemple. Il faut obligatoirement exporter tous les reducers créés dans le module pour accéder à la partie du store correspondante dans les différents écrans.
- une liste de fonctions à exécuter en arrière plan si nécessaire (_backgroundFunctions_). Ces fonctions sont exécutées toutes les 5 minutes.
- une configuration de modèles pour les appels API (_models_).
- une liste de noms d'application web pour récupérer la configuration associée (_requiredConfig_), comme par exemple 'AppBase" ou 'AppMobileSettings'. Chaque configuration sera ensuite récupérée avec le router de l'application. Il faut donc que les routes associées soient renseignées auprès du router. Il est possible de renseigner des nouvelles routes dans le fichier de configuration de l'application à travers l'attribut _additionalRoutes_.
- une fonction pour enregistrer des modules dynamiquement (_moduleRegister_). Cette fonction sera éxécuté une seule fois à la connexion de l'utilisateur pour permettre la création de menus et écrans à partir de données de l'ERP comme les tableaux de bord ou les vues web personnalisées.

# Création dynamique de modules

Il est parfois nécessaire de créer des menus ou écrans en fonction d'une configuration définie sur l'ERP ce qui n'est pas possible avec la gestion normal des menus et écrans dans l'objet _Module_. Il faut alors créer un nouveau module dynamiquement pour enregistrer ces éléments, ce qui est possible grâce au _modulesProvider_ et à l'attribut _moduleRegister_ de l'objet Module :

```tsx
export const functionalModule: Module = {
  name: 'app-functional',
  title: 'Title',
  icon: 'icon-name',
  menus: {...staticMenus},
  screens: {...staticMenus},
  moduleRegister: async (userId: number) => {
    const {screens, menus} = await fetchCustomMenusAndScreens(userId);

    modulesProvider.registerModule({
      name: 'app-custom',
      menus,
      screens,
    });
  },
};
```

À la connexion de l'utilisateur, toutes les fonctions renseignées dans cet attribut seront exécutées avec comme argument l'identifiant de l'utilisateur sur l'instance sur laquelle il s'est connecté. L'utilisation de l'outil _modulesProvider_ à l'extérieur de l'attribut dédié est déconseillée pour éviter des problèmes de mise à jour excessive, la liste des modules étant l'objet central de l'application, beaucoup de fonctionnalités en dépendent.

Les modules enregistrés dynamiquement sont gérés de la même manière que les autres, il est donc possible d'utiliser les principes de surcharge sur les différents objets pour ajouter un menu à un module existant avec l'attribut _parent_ ou encore modifier un écran existant.
