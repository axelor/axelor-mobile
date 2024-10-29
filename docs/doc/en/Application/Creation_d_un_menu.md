---
sidebar_position: 4
description: ''
---

# Creating a menu

The definition of a menu requires the definition of a screen to be displayed when the user selects the menu entry in the drawer.

Only modules with menus appear in the drawer. A module's menus are defined using a json object when the module is exported.

A basic menu entry has a set of attributes:

```tsx
interface MinimumMenuFields {
  title: string;
  hideIf?: (storeState: any) => boolean;
  parent?: string;
  order?: number;
}
```

- **tittle** : [required] a translation key for the title to be displayed on the drawer.
- **hideIf** : is used to define a display condition based on the web configurations retrieved. These configurations must be specified in the module export (_requiredConfig_) to appear in the object given as an argument to this function.
- **parent**: the name of the parent module in the case of overloading. Note that the menu is added to the parent module only if the current module is added after the parent module in the list of modules in the _Application_ component.
- **order**: the order of menu entries in the drawer. To allow menus from other modules to be inserted between two existing menu entries, the convention requires that orders be separated by 10 (e.g. 0, 10, 20, 30...). If no order is defined, the default value is the menu index when defined in the module.

This object can then be transformed into a menu entry or separator depending on the attributes added:

```tsx
interface MenuSeparator extends MinimumMenuFields {
  separator: true;
}

interface MenuBase extends MinimumMenuFields {
  icon: string;
  disabled?: boolean;
  compatibilityAOS?: {
    /** Name of the web  module */
    moduleName?: string;
    /** Version of the web module, this value will be filled in automatically with the information obtained from the web instance. */
    moduleVersion?: version;
    /** Minimum web module version (included) */
    downToVersion?: version;
    /** Maximum web module version (excluded) */
    upToVersion?: version;
  };
}
```

To obtain a separator, simply add the **separator** key. To obtain the basis of a real menu entry, add the fields:

- **icon** : [required] the name of the icon to be displayed in the drawer
- **disabled**: to disable the menu entry
- **compatibilityAOS**: web instance compatibility information. It is possible to indicate only the version information to override the information given to the module globally. It is also possible to specify a web application name different from that given to the module. A version must be a string composed of three numbers. The web module version is automatically retrieved from the server information.

There are then two types of menu entry: menus with submenu and menus with screen.

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

To define a menu entry with submenus, you simply need to supply a json object with basic menu entries to the _subMenus_ attribute of the parent menu. Submenus can only be menu entries with a screen, i.e. a basic menu entry to which the key to the screen to be displayed to the user on click has been supplied.

To define a menu entry with a screen, in addition to the attributes of the basic menu, the key of the screen to be displayed must be supplied. It is also possible to define a default menu for this type of menu, i.e. the menu entry that will be displayed directly to the user when the module icon is clicked. There can be only one default menu entry per module. If two or more menus have the _isDefault_ attribute set to true, the first in the list is used.

The core library also provides permissions management for access to the various menus linked to the **axelor-mobile-settings** configuration module. In order to check the access rights to a menu item, its key in the module index must match the **technicalName** given for the com.axelor.apps.mobilesettings.db.MobileMenu object. If its key is not found, the menu will be accessible to all.
