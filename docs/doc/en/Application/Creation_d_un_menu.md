---
id: Création d’un menu
sidebar_position: 4
sidebar_class_name: icon
---

## Creating a menu

The definition of a menu requires the definition of a screen to be displayed when the user selects the menu entry in the drawer.

Only modules with menus appear in the drawer. A module's menus are defined using a json object when the module is exported.

A basic menu entry has a set of attributes:

```tsx
export interface MenuBase {
  title: string;
  icon: string;
  disabled?: boolean;
  parent?: string;
  order?: number;
}
```

**tittle** : [required] a translation key for the title to be displayed on the drawer

**icon** : [required] the name of the icon to be displayed in the drawer

**disabled**: to disable the menu entry

**parent**: the name of the parent module in the case of overloading. Note that the menu is added to the parent module only if the current module is added after the parent module in the list of modules in the _Application_ component.

**order**: the order of menu entries in the drawer. To allow menus from other modules to be inserted between two existing menu entries, the convention requires that orders be separated by 10 (e.g. 0, 10, 20, 30...). If no order is defined, the default value is the menu index when defined in the module.

There are then two types of menu entry: menus with submenu and menus with screen.

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

To define a menu entry with submenus, you simply need to supply a json object with basic menu entries to the _subMenus_ attribute of the parent menu. Submenus can only be menu entries with a screen, i.e. a basic menu entry to which the key to the screen to be displayed to the user on click has been supplied.

To define a menu entry with a screen, in addition to the attributes of the basic menu, the key of the screen to be displayed must be supplied. It is also possible to define a default menu for this type of menu, i.e. the menu entry that will be displayed directly to the user when the module icon is clicked. There can be only one default menu entry per module. If two or more menus have the _isDefault_ attribute set to true, the first in the list is used.

The core library also provides permissions management for access to the various menus linked to the **axelor-mobile-settings** configuration module. In order to check the access rights to a menu item, its key in the module index must match the **technicalName** given for the com.axelor.apps.mobilesettings.db.MobileMenu object. If its key is not found, the menu will be accessible to all.
