---
title: Maintenance
tags: Readme
---

<h1 align="center">@axelor/aos-mobile-maintenance</h1>

<div align="center">
    <img src="https://i.imgur.com/KJAAFlT.png" width="30%"/>
</div>

## Presentation

This package was developed for the [Axelor Open Mobile](https://github.com/axelor/axelor-mobile) application.

The purpose of this package is to link with the maintenance module of the [Axelor Open Suite (AOS)](https://github.com/axelor/axelor-open-suite) ERP. It provides a simplified version of a number of processes available on the webapp. This package is compatible with AOS from version 8.5.0.

## Usage

Install the library :

```bash
yarn add @axelor/aos-mobile-maintenance
```

To add this package in your application, you need to add it in the _modules_ props of the component `Application` from @axelor/aos-mobile-core package.

```typescript
import React from 'react';
import {Application} from '@axelor/aos-mobile-core';
import {MaintenanceModule} from '@axelor/aos-mobile-maintenance';

const App = () => {
  return <Application modules={[MaintenanceModule]} mainMenu="auth_menu_user" />;
};

export default App;
```

## Developpment

This package is developed as part of the Axelor Open Mobile application. To contribute, please go to the [Github project](https://github.com/axelor/axelor-mobile) and follow the guidelines. You will also find an installation guide to help you configure your environment.
