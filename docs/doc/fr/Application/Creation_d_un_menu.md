---
id: Création d’un menu
sidebar_position: 4
sidebar_class_name: icon
---

# Création d’un menu

La définition d’un menu nécessite la définition en amont d’un écran à afficher lorsque l’utilisateur choisit l’entrée de menu dans le drawer.

Seuls les modules possédant des menus apparaissent dans le drawer. La définition des menus d’un module se fait grâce à un objet json lors de l’export du module.

Une entrée de menu basique possède un ensemble d’attributs :

```tsx
export interface MenuBase {
  title: string;
  icon: string;
  disabled?: boolean;
  parent?: string;
  order?: number;
}
```

**tittle** : [required] une clé de traduction pour le titre à afficher sur le drawer

**icon** : [required] le nom de l’icon à afficher dans le drawer

**disabled** : permet de désactiver l’entrée de menu

**parent** : le nom du module parent dans le cadre d’une surcharge. Attention, le menu est ajouté sur le module parent seulement si le module courant est ajouté après le module parent dans la liste des modules du composant _Application_.

**order** : l’ordre de l’entrée de menu dans le drawer. Afin de permettre aux menus venant d’autres modules de s’insérer entre deux entrées de menu existantes, la convention exige que les ordres soient séparés de 10 (ex: 0, 10, 20, 30…). SI aucun ordre n’est défini, la valeur par défaut est l’index du menu lors de sa définition dans le module.

Il existe ensuite deux types d’entrée de menu : les menus avec sous-menu et les menus avec écran.

```tsx
interface MenuWithSubMenus extends MenuBase {
  subMenus: {
    [subMenuKey: string]: SubMenu;
  };
}

interface SubMenu extends MenuWithScreen {}

interface MenuWithScreen extends MenuBase {
  screen: string;
}

interface RootMenuWithScreen extends MenuWithScreen {
  isDefault?: boolean;
}

type Menu = MenuWithSubMenus | RootMenuWithScreen;
```

Pour définir une entrée de menu avec sous-menus, il suffit en fait de fournir un objet json avec des entrées de menu basique à l’attribut _subMenus_ du menu parent. Les sous-menus peuvent seulement être des entrées de menu avec un écran, c’est-à-dire une entrée de menu basique à laquelle on a fourni la clé de l’écran qu’il faut afficher à l’utilisateur lors du clic.

Pour définir une entrée de menu avec écran, il faut donc fournir en plus des attributs du menu basique, la clé de l’écran à afficher. Il est également possible de venir définir pour ce type de menu, un menu par défaut, c’est-à-dire l’entrée de menu qui s’affichera directement à l’utilisateur lors du clic sur l’icône du module. Il ne peut y avoir qu’une seule entrée de menu par défaut par module. Dans le cas où deux menus ou plus possèdent l’attribut _isDefault_ à true, c’est le premier de la liste qui est utilisé.

La librairie core fournit également une gestion des permissions sur l’accès aux différents menus en lien avec le module de configuration **axelor-mobile-settings**. Afin de pouvoir vérifier les droits d’accès à un item du menu, la clé de ce dernier dans l’index du module doit correspondre au **technicalName** donné pour l’objet _com.axelor.apps.mobilesettings.db.MobileMenu._ Si sa clé n’est pas trouvé, le menu sera accessible à tous.
