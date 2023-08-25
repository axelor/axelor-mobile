---
title: 6.4.0
tags: Changelog
---

## [6.4.6] (2023-08-25)

### @axelor/aos-mobile-core

#### Features

- Improve UploadFileInput with new props :
  - `title` : title to display above file picker
  - `defaultValue` : default file
  - `returnBase64String` : return base64 string instead on uploading Metafile (default false)
  - `required` : define if file is required (default false)
  - `readonly` : define if input should be read only (default false)
  - `documentTypesAllowed` : define allowed types of documents (values 'images', 'pdf' or 'allFiles' and default is 'allFiles')
  - `canDeleteFile` : define if file can be deleted after selection (default true)
  - `displayPreview` : define if input should diplay preview of the selected file (default false)
  - `maxSize` : define if max size for file selection (default 5Mo)
- Add possibility to send DELETE request with axiosApiProvider
- Add `required` props on DateInput component
- Add helper to get full translated date

#### Fixes

- Type issues :
  - Translator
  - Image component props

### @axelor/aos-mobile-ui

#### Features

- DropdownCard :
  - add props `showIcon` to define if up/down icon should be displayed
  - improve style to use standards
- Improve Increment with new props :
  - `keyboardType` : define keyboard type (default 'numeric')
  - `scale` : define scale for input value (default is base config on AOS)
- Improve FormIncrementInput with new props :
  - spread new Increment props
  - `required` : define if input is required (default false)
- Improve ScrollList with new props :
  - `horizontal` : define if scroll should be horizontal or not
  - `disabledRefresh` : disabled top refresh to avoid data changes
- Enable to define InfoBubble `size` from props.
- New component Label with basic types : error, danger, info, success
- New component NumberBubble

#### Fixes

- DropdownCard :
  - rename props `DropdownIsOpen` to `dropdownIsOpen`
- IconButton : mark FontAwesome5 as optionnal
- Picker : fix `isValueItem` mode logic
- Checkbow :
  - style issue on value change
  - define `title` and `isDefaultChecked` as optionnal

## [6.4.5] (2023-07-31)

### @axelor/aos-mobile-ui

#### Features

- Improve Increment with new props :
  - `defaultFormatting` : disable default formatting behaviour
  - `stepSize` : define step when using plus and minus buttons
  - `minValue` : minimum value of input value
  - `maxValue` : maximum value of input value
  - `isBigButton` : display bigger plus and minus buttons
- Spread new Increment props on FormIncrementInput

#### Fixes

- AutoCompleteSearch :
  - display issue after clicking outside of input
- Improve refresh with default value on form components

## [6.4.4] (2023-07-10)

### @axelor/aos-mobile-core

#### Fixes

- Drawer toggle race condition issue (upgrade react-navigation packages)
- Upgrade nx package to fix issue with Nodejs version

### @axelor/aos-mobile-ui

#### Features

- Add BlockInteractionMessage component

### @axelor/aos-mobile-stock

#### Fixes

- Add default filter with user active location on product stock view

## [6.4.3] (2023-06-19)

### @axelor/aos-mobile-core

#### Features

- Manage translated values fetched from AOS
- Add upload tool

### @axelor/aos-mobile-ui

#### Features

- Add ProgressBar component

#### Fixes

- Format issue on increment
- Refresh issue on ScrollList when using local filters

### @axelor/aos-mobile-stock

#### Fixes

- Only send conformity if not null on supplier arrival line update
- StockMoveLine addition : missing version in API call
- StockMove : ignore isRealQtyModifiedByUser on realized moves

### @axelor/aos-mobile-manufacturing

#### Fixes

- Consumed products : manage no tracking number configured

## [6.4.2] (2023-05-26)

### @axelor/aos-mobile-ui

#### Features

- New components : _Checkbox_, _CricleButton_, _FloatingButton_, _FormHtmlInput_, _FormIncrementInput_, _FormInput_, _MultiSelectValue_ and _PanelTabs_.
- Add new props on Picker and MultiValuePicker to know if value is required.
- Add HTML keyboard on MessageBox component
- Add border color on input focus
- Show first five items of AutoCompleteSearch when user focus or on search icon press

#### Changes

- Simplify ChipSelect integration
    <Details>
    Transform children chip components into a list of objects with the following props : isActive, color, title and key. Two available behaviours: 'mutli' or 'switch'. 
    </Details>


#### Fixed

- Minor corrections on Increment

#### Removes

- Replace RenderHTML by HtmlInput

### @axelor/aos-mobile-core

#### Features

- Add multiday event management on PlanningView.
- Improve error management on login screen
- Display connected instance url on setting screen
- Save last connected instance url in local storage to pre-fill url input when user returns on the app
- Configurations management to customise the application:
  - `testInstanceConfig`: configure instance to use in debug mode
  - `releaseInstanceConfig`: configure instance to use in release mode
  - `defaultLanguage`: define default language
- New components : CodeHighlighter to display code blocks, AutoCompleteSearchInput, DatePicker and DateInput.

#### Fixed

- Add translations and remove success code in API toast messages
- Remove axios config on log out
- Manage url without http / https prefix
- Remove unwanted regex from url : 'login.jsp', '#' and excess '/'.
- Zebra device format issue when scanning value

### @axelor/aos-mobile-stock

#### Features

- StockMoveLine & InventoryLine : manage no tracking number configured
- Manage isRealQtyModifiedByUser value on StockMoveLine

#### Changes

- Simplification of screen composition: addition of empowered components.
- Implementation of new functionalities of UI package : ChipSelect refactor, replace uses of RenderHtml by HtmlInput.
- Use generic API request to update internal move line (AOS 6.4.10 or 6.5.4 required)

#### Fixed

- StockMoveLine & InventoryLine : remove product check if tracking number is defined
- Rename duplicated partner reducer due to CRM package

### @axelor/aos-mobile-manufacturing

#### Features

- Add manufOrderSeq copy to clipboard on linked MO cards

#### Changes

- Simplification of screen composition: addition of empowered components.
- Implementation of new functionalities of UI package : ChipSelect refactor, replace uses of RenderHtml by HtmlInput.

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

[6.4.6]: https://github.com/axelor/axelor-mobile/compare/6.4.5...6.4.6
[6.4.5]: https://github.com/axelor/axelor-mobile/compare/6.4.4...6.4.5
[6.4.4]: https://github.com/axelor/axelor-mobile/compare/6.4.3...6.4.4
[6.4.3]: https://github.com/axelor/axelor-mobile/compare/6.4.2...6.4.3
[6.4.2]: https://github.com/axelor/axelor-mobile/compare/6.4.1...6.4.2
[6.4.1]: https://github.com/axelor/axelor-mobile/compare/6.4.0...6.4.1
[6.4.0]: https://github.com/axelor/axelor-mobile/
