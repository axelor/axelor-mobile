---
id: Création d’un module
sidebar_position: 5
sidebar_class_name: icon 
---

# Création d’un module

L’application fonctionne avec une structure de module. Ainsi, chaque package fonctionnel doit exporter un objet au format *Module* défini dans le package **CORE.**

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
	};
}
```

Un module possède donc :

- un nom (*name*) permettant de donner une clé d’identité au module. Ce nom doit être unique entre les modules utilisés sur l’application pour éviter les confusions.
- un titre (*title*) à afficher à l’utilisateur sur le drawer lorsqu’aucune app n’est sélectionnée.
- un sous-titre (*subtitle*) à afficher à l’utilisateur sous le bouton du module dans le drawer pour aider à la compréhension. L’affichage de ses sous-titres est paramétrable depuis le composant *Application* par l’attribut *showModulesSubtitle.*
- un nom d’icône (*icon*) à afficher sur le bouton du module dans le drawer. Attention, cet icône doit appartenir à la base FontAwesome 5 ([https://oblador.github.io/react-native-vector-icons/](https://oblador.github.io/react-native-vector-icons/)).
- les information de compatibilité avec l’instance web (*compatibilityAOS*). Il est possible de surcharger ses informations depuis un autre module en indiquant pour un même nom de module web des versions différentes. Une version doit être un string composé de trois numéros. La version du module web est récupérée et renseignée automatiquement depuis les informations du serveur.
- un ensemble de menus (*menus*) à afficher dans le drawer.
- un ensemble d’écrans appartenant au module (*screens*).
- un ensemble de traductions pour le module (*translations*). il faut fournir les traductions au format clé-valeur pour chaque langue supportée.
- un ensemble de reducers pour le module (*reducers*). Un reducer est un simple fonction qui permet de mettre à jour l’état d’un objet en fonction de l’action qui lui est transmise. Dans notre contexte, les reducers sont les fonctions redux qui permettent de mettre à jour le store lors des appels API par exemple. Il faut obligatoirement exporter tous les reducers créés dans le module pour accéder à la partie du store correspondante dans les différents écrans.
- une liste de fonctions à exécuter en arrière plan si nécessaire (*backgroundFunctions*). Ces fonctions sont exécutées toutes les 5 minutes.
- une configuration de modèles pour les appels API (*models*), pour plus d’explications voir la section [Création d'un appel API](https://www.notion.so/Documentation-technique-AOM-FR-7-2-607af4650bfa4ae086926122a4435c9a?pvs=21). b