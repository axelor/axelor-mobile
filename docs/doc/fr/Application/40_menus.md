---
slug: /menus
sidebar_position: 40
description: ''
---

# Création d’un menu

La définition d’un menu nécessite la définition en amont d’un écran à afficher lorsque l’utilisateur choisit l’entrée de menu dans le drawer.

Seuls les modules possédant des menus apparaissent dans le drawer. La définition des menus d’un module se fait grâce à un objet json lors de l’export du module.

Une entrée de menu basique possède un ensemble d’attributs :

```tsx
interface MinimumMenuFields {
  title: string;
  hideIf?: (storeState: any) => boolean;
  parent?: string;
  order?: number;
}
```

- **tittle** : [required] une clé de traduction pour le titre à afficher sur le drawer
- **hideIf** : permet de définir une condition d'affichage en fonction des configurations web récupérées. Ces configurations doivent être renseignées dans l'export du module (_requiredConfig_) pour apparaître dans l'objet donné en argument de cette fonction.
- **parent** : le nom du module parent dans le cadre d’une surcharge. Attention, le menu est ajouté sur le module parent seulement si le module courant est ajouté après le module parent dans la liste des modules du composant _Application_.
- **order** : l’ordre de l’entrée de menu dans le drawer. Afin de permettre aux menus venant d’autres modules de s’insérer entre deux entrées de menu existantes, la convention exige que les ordres soient séparés de 10 (ex: 0, 10, 20, 30…). Si aucun ordre n’est défini, la valeur par défaut est l’index du menu lors de sa définition dans le module.

Cet objet peut ensuite se transformer en entrée de menu ou en séparateur en fonction des attributs ajoutés :

```tsx
interface MenuSeparator extends MinimumMenuFields {
  separator: true;
}

interface MenuBase extends MinimumMenuFields {
  icon: string;
  disabled?: boolean;
  compatibilityAOS?: {
    /** Nom du module sur le web */
    moduleName?: string;
    /** Version du module web, cette valeur sera remplie automatiquement avec les informations obtenues auprès du serveur web. */
    moduleVersion?: version;
    /** Version web minimum (incluse) */
    downToVersion?: version;
    /** Version web maximum (exclue) */
    upToVersion?: version;
  };
}
```

Pour obtenir un séparateur, il suffit d'ajouter le bouléen **separator**. Pour obtenir la base d'une véritable entrée de menu, il faut ajouter les champs :

- **icon** : [required] le nom de l’icon à afficher dans le drawer
- **disabled** : permet de désactiver l’entrée de menu
- **compatibilityAOS** : les information de compatibilité avec l’instance web. Il est possible d'indiquer seulement les informations de versions pour surcharger les informations données au module globalement. Il est également possible d'indiquer un nom d'application web différent de celui donné au module. Une version doit être un string composé de trois numéros. La version du module web est récupérée et renseignée automatiquement depuis les informations du serveur.

Il existe ensuite deux types d’entrée de menu : les menus avec sous-menus et les menus avec écran.

```tsx
interface MenuWithScreen extends MenuBase {
  screen: string;
}

export interface SubMenu extends MenuWithScreen {}

interface MenuWithSubMenus extends MenuBase {
  subMenus: {
    [subMenuKey: string]: SubMenu;
  };
}

interface RootMenuWithScreen extends MenuWithScreen {
  isDefault?: boolean;
}

export type Menu = MenuWithSubMenus | RootMenuWithScreen | MenuSeparator;
```

Pour définir une entrée de menu avec sous-menus, il suffit en fait de fournir un objet json avec des entrées de menu basique à l’attribut _subMenus_ du menu parent. Les sous-menus peuvent seulement être des entrées de menu avec un écran, c’est-à-dire une entrée de menu basique à laquelle on a fourni la clé de l’écran qu’il faut afficher à l’utilisateur lors du clic.

Pour définir une entrée de menu avec écran, il faut donc fournir en plus des attributs du menu basique, la clé de l’écran à afficher. Il est également possible de venir définir pour ce type de menu, un menu par défaut, c’est-à-dire l’entrée de menu qui s’affichera directement à l’utilisateur lors du clic sur l’icône du module. Il ne peut y avoir qu’une seule entrée de menu par défaut par module. Dans le cas où deux menus ou plus possèdent l’attribut _isDefault_ à true, c’est le premier de la liste qui est utilisé.

La librairie core fournit également une gestion des permissions sur l’accès aux différents menus en lien avec le module de configuration **axelor-mobile-settings**. Afin de pouvoir vérifier les droits d’accès à un item du menu, la clé de ce dernier dans l’index du module doit correspondre au **technicalName** donné pour l’objet _com.axelor.apps.mobilesettings.db.MobileMenu._ Si sa clé n’est pas trouvé, le menu sera accessible à tous.
