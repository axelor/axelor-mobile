---
title: Core
tags: Readme
---

<h1 align="center">@axelor/aos-mobile-core</h1>

<div align="center">
    <img src="https://i.imgur.com/KJAAFlT.png" width="30%"/>
</div>

## Presentation

This package was developed for the [Axelor Open Mobile](https://github.com/axelor/axelor-mobile) application.

It contains:

- API providers
- Auth module with login and user screens
- Translations management system
- Various helper tools : clipboard, file viewer, external app management
- Management of MailMessages and attaches files on objects
- AOS linked components or using external libraries : Camera, Scanner, PlanningView, Stopwatch, ...
- Menu management
- Storage management

## Usage

Install the library :

```bash
yarn add @axelor/aos-mobile-core
```

Compatibility with React v18.2.x and React Native v0.70.x.

This package has a few required libraries as peer dependencies, please check package.json for more informations.

### Create an application

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
  configuration?: appConfig; // Configuration to customize application
}
```

Each module is based on the same interface and has the following attributes :

```typescript
interface Module {
  name: string; // Module name
  title?: string; // Module title in the drawer
  subtitle?: string; // Module subtitle in the drawer
  icon?: string; // Module icon in the drawer
  disabled?: boolean;
  menus: {
    // List of menus of the module
    [screenKey: string]: {
      title: string;
      icon: string;
      screen: string; // Name of the main screen of this menu
      disabled?: boolean;
      parent?: string; // Option to add menu in another module
      order?: number; // Option to change order of menu (default: index * 10)
    };
  };
  screens: {
    // List of screens of the module
    [screenKey: string]: {
      component: React.FC<any>;
      title: string;
      options?: ScreenOptions; // screen options to activate or not shadedHeader
    };
  };
  translations?: {
    // All translations of the module
    [languageKey: string]: any;
  };
  reducers?: any; // Reducers of the module
  backgroundFunctions?: Function[]; // List of function that should be executed in the background, interval is 5 minutes
  models?: {
    objectFields?: ObjectFields; // Fields of object for API calls structured on YUP schemas
    sortFields?: SortFields; // Sort rules for API calls
    searchFields?: SearchFields; // List of fields of object for searchs
  };
}
```

### Perform request

This package provides a tool for making HTTP requests. This tool is based on axios. To use it, simply import the provider and use the appropriate method:

```typescript
import {axiosApiProvider} from '@axelor/aos-mobile-core';

...

axiosApiProvider.post({url: '...', data: {...}});
```

You can also create standard requests with the functions createStandardSearch and createStandardFetch.

```typescript
createStandardSearch = ({
  model: string; // Full name of the model
  criteria?: Criteria[]; // List of criterias
  domain?: string;
  domainContext?: any;
  fieldKey: string; // Key of the API fields configuration given in models props of module
  sortKey?: string; // Key of the sort rules configuration given in models props of module
  page: number; // Current page in search
  numberElementsByPage?: number; // Number of elements that should be fetched, default is 10 and can be adjusted in app configuration file
}): Promise<any>;

createStandardFetch = ({
  model: string; // Full name of the model
  fieldKey: string; // Key of the API fields configuration given in models props of module
  id: number; // Id of the object that should be fetched
  relatedFields?: any; // Additional fields of the relational objects
}): Promise<any>;
```

### Translations system

This package is also responsible for managing translations. To add translations in the database, you just have to indicate them as an JSON format in the export of the module:

```typescript
const myModule : Module {
  name: "my-module-key";
  title: "MyModule_Name";
  subtitle: "MyModule_SubName";
  icon: ...;
  menus: {...};
  screens: {...};
  translations: {
    en: {
        MyModule_Name: "My module name",
        MyModule_SubName: "My module",
        HelloWorld: "Hello world"
    },
    fr: {
        MyModule_Name: "Le nom de mon module",
        MyModule_SubName: "Mon module",
        HelloWorld: "Bonjour"
    }
  };
}
```

Then, to translate an element and thus retrieve its translation, the translation function must be retrieved from the `useTranslator` hook:

```typescript
import {useTranslator} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';

...

const I18n = useTranslator();

...

<Text>{I18n.t('HelloWorld')}</Text>

```

The auth module, present in this package, allows the user's language to be modified directly from his profile. However, the package also provides the reducer to perform this action in the case of an overload or the addition on another screen. To change the language, simply update the user on the server:

```typescript
import {updateActiveUser, useDispatch, useSelector} from '@axelor/aos-mobile-core';

...

const {user} = useSelector(state => state.user);
const dispatch = useDispatch();

...

const updateLanguage = useCallback(
    language => {
      dispatch(
        updateActiveUser({id: user.id, language, version: user.version}),
      );
    },
    [dispatch, user],
);
```

Default language of the application is 'en' but this can be modified in the application configuration file under defaultLanguage props.

### Helper tools

This package provides several helpers such as:

- Clipboard provider

To copy something to the user's clipboard, just call the clipboardProvider.copyToClipboard with the string value of what you want to copy:

```typescript
import {clipboardProvider} from '@axelor/aos-mobile-core';
import {Icon, useThemeColor} from '@axelor/aos-mobile-ui';

...

const Colors = useThemeColor();

...

{address?.fullName && (
    <Icon
        name="copy"
        color={Colors.secondaryColor.foreground}
        size={20}
        touchable={true}
        onPress={() =>
            clipboardProvider.copyToClipboard(address?.fullName)
        }
    />
)}
```

- Open a file in an external app

This package provides a tool to open files from the server, either MetaFile or DMSFile, in the application dedicated to the latter type on the phone.

To do this, simply use the openFileInExternalApp function of the package with the necessary information:

```typescript
import {openFileInExternalApp, useSelector, useTranslator} from '@axelor/aos-mobile-core';

...

const {baseUrl, token, jsessionId} = useSelector(state => state.auth);
const I18n = useTranslator();

...

const handleShowFile = async item => {
    await openFileInExternalApp(
      {fileName: item.fileName, id: item.id, isMetaFile: isMetaFile},
      {baseUrl: baseUrl, token: token, jsessionId: jsessionId},
      I18n,
    );
};
```

- Pick a file for phone data

This package provides a tool to pick an image from phone storage.

To do this, simply use the handleDocumentSelection function of the package with the necessary information:

```typescript
import {handleDocumentSelection} from '@axelor/aos-mobile-core';

...

const handlePickFile = async () => {
    await handleDocumentSelection(console.log);
};
```

- Open an external app with contact informations

To have the contact applications (call, email, maps, ...), just use the linkingProvider with the dedicated method:

1. URL management: `openURL(url: string, error: {title: string; message: string})`
2. Browser management: `openBrowser(url: string)`
3. Call management: `openCallApp(tel: string)`
4. Message management: `openSMSApp(tel: string)`
5. Email management: `openMailApp(email: string, subject?: string, body?: string, to?: string, cc?: string, bcc?: string)`
6. Maps management: `openMapApp(address?: string, destination?: string, latitude?: number, longitude?: number, transportType: string)`

An example with maps app:

```typescript
import {linkingProvider} from '@axelor/aos-mobile-core';
import {Icon, useThemeColor} from '@axelor/aos-mobile-ui';

...

const Colors = useThemeColor();

...

{address?.fullName && (
    <Icon
        name="map-marked-alt"
        color={Colors.secondaryColor.foreground}
        size={20}
        touchable={true}
        onPress={() =>
            linkingProvider.openMapApp(address?.fullName)
        }
    />
)}
```

### Add MailMessages and attached files

- Management of MailMessages and attaches files on objects

This package provides a component to add MailMessages and file attachments functionality to the header. This component also allows to display its children if there are any as a dropdown menu.

For the first two functionalities of this component, it is necessary to provide in props the name of the object model ("com.axelor.apps.stock.db.StockCorrection" for the stock corrections for example), the id of the current object, and the navigation attribute to go on the dedicated screens:

```typescript
import {HeaderOptionsMenu} from '@axelor/aos-mobile-core';
import {DropdownMenuItem} from '@axelor/aos-mobile-ui';

...

React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model={...}
          modelId={...}
          navigation={navigation}
          disableMailMessages={...}>
          <DropdownMenuItem
            icon="..."
            placeholder={...}
            onPress={...}
          />
        </HeaderOptionsMenu>
      ),
    });
  }, [navigation, ...]);
```

An example of rendering:

![](https://i.imgur.com/pCuV2jM.jpg)

### Components

This package also provides a number of components linked to Axelor Open Suite (AOS) or requiring external libraries such as the camera, the calendar view or the stopwatch.

## Developpment

This package is developed as part of the Axelor Open Mobile application. To contribute, please go to the [Github project](https://github.com/axelor/axelor-mobile) and follow the guidelines. You will also find an installation guide to help you configure your environment.
