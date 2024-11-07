<h1 align="center">Axelor Open Mobile</h1>

<div align="center">
    <img src="https://i.imgur.com/KJAAFlT.png" width="30%"/>
    <br />
    <br />
    <b>ERP processes made easy from your phone</b>
</div>

# Presentation

This mobile app is based on [Axelor Open Suite (AOS)](https://github.com/axelor/axelor-open-suite).

The objective is to enable ERP processes to be carried out directly from the phone thanks to simplified screens.

Axelor Open Mobile is a redesign of the [Axelor Mobile](https://github.com/axelor/axelor-mobile-old) application, now obsolete, in React Native. This redesign also contains the addition of new features in addition to better ergonomics.

Based on a modular architecture, the application can be dedicated to a single module or be multidisciplinary.

This new application mobile includes at the moment the following modules with different AOS compatibility:

- Stock management (AOS v6.4+)
- Production (AOS v6.4+)
- CRM (AOS v6.5+)
- Helpdesk (AOS v7.1+)
- Human ressources (Expenses AOS v7.1+ / Timesheets AOS v8.0+)
- Quality (AOS v8.0+)

# Installation

Please see [installation guide](https://github.com/axelor/axelor-mobile/blob/main/INSTALLATION_GUIDE.md) to get more informations about preriquisites.

# Usage

## Add or remove module for APK generation

Modules can be enabled directly in file App.js from src folder or with settings module from AOS.

To manage apps directly with the _Application_ component, you just need to add/remove Module objects from _modules_ props.

```
import React from 'react';
import {Application} from '@axelor/aos-mobile-core';
import {StockModule} from '@axelor/aos-mobile-stock';
import {ManufacturingModule} from '@axelor/aos-mobile-manufacturing';
import application_properties from '../package.json';

const App = () => {
  return (
    <Application
      modules={[StockModule, ManufacturingModule]}
      mainMenu="auth_menu_user"
      version={application_properties.version}
    />
  );
};

export default App;
```

You can also activate/desactivate apps directly for the configuration module which will be available from AOS v7.0+.

## Important commands

- Install dependencies : `yarn clean && yarn`
- Build packages : `yarn build`
- Install debug android APK : `yarn android`
- Start Metro for development : `yarn start`
- Create release AP : `cd android && ./gradlew app:assembleRelease`

## Storybook

The project provides a storybook to visualize the rendering of the different components available in the UI package.

The stories are available in the `packages/ui/stories` folder.

To start the storybook, just run the command `yarn storybook`. The storybook is then available at the following address: [localhost:6006](http://localhost:6006/).

The official documentation of the storybook tool used is [here](https://storybook.js.org/).
