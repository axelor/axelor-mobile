---
title: 6.5.0
tags: Changelog
---

## [6.5.3] (2023-07-10)

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

### @axelor/aos-mobile-crm

#### Fixes

- Check for NPE and null string conditions

## [6.5.2] (2023-06-19)

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

## [6.5.1] (2023-05-17)

### @axelor/aos-mobile-ui

#### Features

- Add border color on input focus
- Show first five items of AutoCompleteSearch when user focus or on search icon press

#### Fixed

- Minor corrections on HtlmInput and Increment

### @axelor/aos-mobile-core

#### Features

- Header actions overload management
    <Details>
    New system to register header actions to manage overload: link a screen to a action key and then register header actions for this key. 
    </Details>
- Display connected instance url on setting screen
- Improve error management on login screen
- Add translations and remove success code in API toast messages
- Save last connected instance url in local storage to pre-fill url input when user returns on the app

#### Fixed

- Remove axios config on log out
- Hide header icon actions for small screen
- Manage url without http / https prefix
- Remove unwanted regex from url : 'login.jsp', '#' and excess '/'.
- Zebra device format issue when scanning value

### @axelor/aos-mobile-stock

#### Features

- StockMoveLine & InventoryLine : manage no tracking number configured
- Manage isRealQtyModifiedByUser value on StockMoveLine

#### Fixed

- StockMoveLine & InventoryLine : remove product check if tracking number is defined
- Rename duplicated partner reducer due to CRM package

#### Changes

- Simplification of screen composition: addition of empowered components.
- Use generic API request to update internal move line (AOS 6.4.10 or 6.5.4 required)

### @axelor/aos-mobile-crm

#### Features

- Manage CRM web configurations on recurrent amount and catalogs

### @axelor/aos-mobile-manufacturing

#### Features

- Add manufOrderSeq copy to clipboard on linked MO cards

## [6.5.0] (2023-03-14)

### New package : @axelor/aos-mobile-crm

This package is compatible with AOS CRM module from version 6.5.0
It contains the following functionnalities

- _Leads_: search from database, view details with possibility to contact directly through phone apps, modify
- _Clients_: search from database, view details with possibility to contact directly through phone apps, modify
- _Contacts_: search from database, view details with possibility to contact directly through phone apps, modify
- _Opportunities_: view, modify
- _Prospect_: search from database, view details with possibility to contact directly through phone apps, modify
- _Event_: planning view with multiples search possibilities, view event details
- _Catalog_: search from database, open pdf in your phone

### @axelor/aos-mobile-manufacturing

#### Changes

- Simplification of screen composition: addition of empowered components.
- Implementation of new functionalities of CORE package : API fields and planning view improvements.
- Implementation of new functionalities of UI package : ChipSelect refactor, replace uses of RenderHtml by HtmlInput.

### @axelor/aos-mobile-stock

#### Changes

- Implementation of new functionalities of CORE package : API fields.
- Implementation of new functionalities of UI package : ChipSelect refactor.

### @axelor/aos-mobile-core

#### Features

- Create configuration templates to define API fields and sorting rules.
    <Details>
    This new features enables you to define three types of API fields:
    
    * The object fields needed in API calls by associating a key to a [YUP](https://www.npmjs.com/package/yup?activeTab=readme) schema.
    * Search fields with a json structure where each object key is associated with a list of strings.
    * Sorting rules with the same structure as search fields.
    * Few helper functions were added : 
        * request builder functions _createStandardFetch_ and _createStandardSearch_
        * helpers to fetch fields configuration for object _getObjectFields_, _getSortFields_ and _getSearchCriterias_.
    </Details>

- Menu overload management
    <Details>
    Two new features on menus to help overload : 
    
    * Add a menu from one module to another through the 'parent' attribute.
    * Define the order of this menu in the list via the 'order' attribute.
    </Details>

- Define in each module a list of bakground functions.
- Switch between multiple api providers
    <Details>
    Define multiple api providers in a gateway to use the first available provider. There are two types of providers : one to perform actions and one to retrieve data to be displayed to the user.
    </Details>

- New components : _CodeHighlighter_ to display code blocks, _AutoCompleteSearchInput_, _DatePicker_ and _DateInput_.
- Add multiday event management on PlanningView.
- Pick a file from phone storage with FilePicker.
- Configurations management to customise the application.
    <Details>
    There are for the moment four configurations available that can be transmitted to the Application component through 'configuration' props :

  - test instance configuration
  - release instance configuration
  - default language
  - default request limit

  Here is an example of configuration file :

  ```javascript
  export const app_config = {
    /*
     * This configuration is used to fill in the url,
     * username and/or password fields automatically
     * when the application is running in debug mode
     */
    testInstanceConfig: {
      defaultUrl: '',
      defaultUsername: '',
      defaultPassword: '',
    },

    /*
     * This configuration is used to fill in the url field
     * automatically when the application is running in release mode.
     * It is also possible to hide the url input if needed to prevent users from changing it.
     */
    releaseInstanceConfig: {
      url: '',
      showUrlInput: true,
    },

    /*
     * This setting is used to define the default language of the application.
     * This value is automatically overwritten by the user's default language
     * once logged in if the latter is set.
     */
    defaultLanguage: 'en',

    /*
     * This setting is used to define the default request limit used is createStandardSearch
     * function (that is to say the number of elements per page on list screens). This value
     * can be rewritten for any request using props numberElementsByPage
     */
    defaultRequestLimit: 10,
  };
  ```

    </Details>

### @axelor/aos-mobile-ui

#### Features

- New components : _Checkbox_, _CricleButton_, _FloatingButton_, _FormHtmlInput_, _FormIncrementInput_, _FormInput_, _MultiSelectValue_ and _PanelTabs_.
- Add new props on Picker and MultiValuePicker to know if value is required.
- Add HTML keyboard on MessageBox component

#### Changes

- Simplify ChipSelect integration
    <Details>
    Transform children chip components into a list of objects with the following props : isActive, color, title and key. Two available behaviours: 'mutli' or 'switch'. 
    </Details>

#### Removes

- Replace RenderHTML by HtmlInput

[6.5.3]: https://github.com/axelor/axelor-mobile/compare/6.5.2...6.5.3
[6.5.2]: https://github.com/axelor/axelor-mobile/compare/6.5.1...6.5.2
[6.5.1]: https://github.com/axelor/axelor-mobile/compare/6.5.0...6.5.1
[6.5.0]: https://github.com/axelor/axelor-mobile/compare/6.4.3...6.5.0
