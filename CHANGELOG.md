## [6.4.1] (2023-03-13)

#### Features

- Android configuration : add bundle release configuration

#### Changes

- CameraScanner : simplify integration with a slice
- App management : add pop-up to inform user that the app has not been configured
- Menus: rename menus to match AOS module axelor-mobile-settings configuration

#### Fixed

- AutoCompleteSearch : fixed component to restore possiblity to select an item
- Navigation : increase touchable zone of header buttons
- Keyboard : manage screen position when keyboard is open to avoid hiding input
- Operation orders planning view : fixed fetch request
- Manufacturing order details view : add missing product request
- Increment : fix format logic
- Stock/Manufacturing modules : add null dates management
- Dependencies : set react-native-system-navigation-bar version to fix android build

## [6.4.0] (2023-02-01)

This is the first version of the Axelor Open Mobile application.
This new application is based on a modular architecture.

Several packages provide the basic functionality of an application :

- Package **@axelor/aos-mobile-error** provides an error boundary system.

- Package **@axelor/aos-mobile-ui** provides :

  - basic components to create screens
  - themes management system with basic light theme and a color blind theme
  - writing themes management system with basic theme
  - useOutsideClick hook to notify components when user clicked outside of itself
  - basic animation tools

- Package **@axelor/aos-mobile-core** provides the core of the application, such as :
  - API providers
  - Auth module with login and user screens
  - Translations management system
  - Various helper tools : clipboard, file viewer, external app management
  - Management of MailMessages and attaches files on objects
  - AOS linked components or using external libraries : Camera, Scanner, PlanningView, Stopwatch, ...
  - Menu management
  - Storage management

The component Application enables you to create an application really simply :

```typescript
interface Application {
  modules: Module[]; // Functionnal packages
  mainMenu?: string; // Main menu when openning app
  additionalsReducers?: any;
  version: string; // App version to be display on login screen
  themes?: Theme[]; // Additionnals themes
  defaultTheme?: Theme; // Default theme for all users
  writingThemes?: Writing[]; // Additionnals writing themes
  defaultWritingTheme?: Writing; // Default writing theme for all users
  showModulesSubtitle: boolean; // Option to show subtitles of modules in the drawer menu
}
```

Each module is based on the same interface and has the following attributes :

```typescript
interface Module {
  name: string; // Module name
  title: string; // Module title in the drawer
  subtitle: string; // Module subtitle in the drawer
  icon: string; // Module icon in the drawer
  disabled?: boolean;
  menus: {
    // List of menus of the module
    [screenKey: string]: {
      title: string;
      icon: string;
      screen: string;
      disabled?: boolean;
    };
  };
  screens: {
    // List of screens of the module
    [screenKey: string]:
      | React.FC<any>
      | {
          component: React.FC<any>;
          title: string;
        };
  };
  translations?: {
    // All translations of the module
    [languageKey: string]: any;
  };
  reducers?: any; // Reducers of the module
}
```

There are two functional packages available for Axelor Open Mobile.

- Package **@axelor/aos-mobile-stock** provides functionnalities of AOS stock module :

  - _Product_: view products with stock indicators, characteristics
  - _Stock_ correction: viewing, validation, creation
  - _Internal_ move: view, complete, validate, create
  - _Customer_ delivery: view, complete, validate
  - _Supplier_ arrival: view, complete, validate
  - _Inventory_: view, complete, validate

- Package **@axelor/aos-mobile-manufacturing** provides functionnalities of AOS manufacturing module :
  - _Manufacturing order_: view (with information on links to customer orders or related orders), management of consumed, manufactured and scrap products, status update
  - _Operation order_: view, change of status with management of the stopwatch, view of the production file
  - _Planning vision_ of operation orders

[6.4.1]: https://github.com/axelor/axelor-mobile/compare/v6.4.0...v6.4.1
[6.4.0]: https://github.com/axelor/axelor-mobile/commits/6.4.0
