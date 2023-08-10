---
title: HR
tags: Readme
---

<h1 align="center">@axelor/aos-mobile-hr</h1>

<div align="center">
    <img src="https://i.imgur.com/KJAAFlT.png" width="30%"/>
</div>

## Presentation

This package was developed for the [Axelor Open Mobile](https://github.com/axelor/axelor-mobile) application.

The purpose of this package is to link with the HR module of the [Axelor Open Suite (AOS)](https://github.com/axelor/axelor-open-suite) ERP to realize expenses. This package is compatible with AOS from version 7.2.0.

## Usage

Install the library :

```bash
yarn add @axelor/aos-mobile-hr
```

Compatibility with React v18.2.x and React Native v0.68.x.

To add this package in your application, you need to add it the _modules_ props of the component `Application` from @axelor/aos-mobile-core package.

```javascript
import React from 'react';
import {Application} from '@axelor/aos-mobile-core';
import {HrModule} from '@axelor/aos-mobile-hr';

const App = () => {
  return <Application modules={[HrModule]} mainMenu="auth_menu_user" />;
};

export default App;
```

## Developpment

This package is developed as part of the Axelor Open Mobile application. To contribute, please go to the [Github project](https://github.com/axelor/axelor-mobile) and follow the guidelines. You will also find an installation guide to help you configure your environment.
