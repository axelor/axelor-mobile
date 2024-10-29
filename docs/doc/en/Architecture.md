---
sidebar_position: 3
description: ''
---

# Application architecture

The main objective when building the application architecture was to have a high degree of flexibility to facilitate customization of the application and adaptation to customer projects.

A modular architecture was therefore implemented, with two main packages:

- _@axelor/aos-mobile-ui_: a library of generic components for screen construction, plus a number of tools (themes, animations, useClickOutside, etc.).
- _@axelor/aos-mobile-core_: a more technical library with the Application component, more complex components using external libraries, the connection system, store management, etc.

The latter is based on a third package, _@axelor/aos-mobile-error_, which handles errors during rendering, including the display of an emergency screen.

![dependencies_base.png](/img/en/dependencies_base.png)

Each functionnal application is then developed in its own module, allowing functionalities to be separated. It is then possible to choose which modules are required for the overall application.

In order to benefit from the various tools provided by the basic packages, each functionnal module depends on the two main libraries presented above.

![dependencies_functionnal.png](/img/en/dependencies_functionnal.png)

From the point of view of code architecture in the standard project, the three generic packages are located at the root of the packages/ folder, while the functionnal modules are located in the packages/apps/ folder. AOM version 7.0.0 introduced a change in the application architecture. The android and ios folders are now at the root of the project. These folders are used to manage versions of the application on both platforms, as well as configurations and user permissions.

```bash
axelor-mobile
├── *packages*/
│   ├── **apps/**
│   │   └── [*Functionnals modules*]
│   ├── **core** [*Technical package*]
│   │   └── ...
│   ├── **ui** [*Visual package*]
│   │   └── ...
│   └── **error** [*Error management*]
│   │   └── ...
│   └── ...
├── src/
│   ├── App.js [*Global application*]
│   └── app.config.js [*Configurations file*]
├── android/ [*Android configurations*]
└── ios/ [*IOS configurations*]
```
