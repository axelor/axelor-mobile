---
title: 7.0.0
tags: Changelog
---

## [7.0.3] (2023-07-31)

### @axelor/aos-mobile-core

#### Fixes

- Improve version management to manage cases where patch version is bigger than 9.

### @axelor/aos-mobile-ui

#### Features

- Improve Increment with new props :
  - `defaultFormatting` : disable default formatting behaviour
  - `stepSize` : define step when using plus and minus buttons
  - `minValue` : minimum value of input value
  - `maxValue` : maximum value of input value
  - `isBigButton` : display bigger plus and minus buttons
- Spread new Increment props on FormIncrementInput
- ObjectCard : enable to define custom components

#### Fixes

- AutoCompleteSearch :
  - display issue after clicking outside of input
  - input issue on details popup with default value
- Improve refresh with default value on form components

### @axelor/aos-mobile-crm

#### Fixes

- Align form components

## [7.0.2] (2023-07-10)

### @axelor/aos-mobile-core

#### Features

- Manage compatibility with AOS modules with new configuration in module export
- Add image helpers to get source with AOS objects

#### Fixes

- Drawer toggle race condition issue (upgrade react-navigation packages)
- Upgrade nx package to fix issue with Nodejs version
- Use default text color on session creation button

### @axelor/aos-mobile-ui

#### Features

- Add BlockInteractionMessage component
- Add new component ObjectCard to standardize cards creation

### @axelor/aos-mobile-stock

#### Fixes

- Add default filter with user active location on product stock view
- Improve fields visibility on internal move creation
- Scroll issue on internal move creation screen

### @axelor/aos-mobile-crm

#### Fixes

- Check for NPE and null string conditions

## [7.0.1] (2023-06-19)

### @axelor/aos-mobile-core

#### Features

- New helpers to manage states of infinite scroll
- Add minimal required version check, new configurations :
  - versionCheckConfig.activate : activate or not minimal version check
  - versionCheckConfig.android : update link (default value is Google Play Store)
  - versionCheckConfig.ios : update link (default value is App Store)
- Manage translated values fetched from AOS
- Add upload tool

#### Fixes

- Add meaningful message for camera permission on iOS

### @axelor/aos-mobile-ui

#### Features

- Add ProgressBar component

#### Fixes

- Format issue on increment
- Refresh issue on ScrollList when using local filters

### @axelor/aos-mobile-stock

#### Fixes

- Only send conformity if not null on supplier arrival line update
- Clear SearchBar after scan on line search component
- Internal move & customer delivery : filter available products on line creation
- StockMove : ignore isRealQtyModifiedByUser on realized moves

#### Changes

- Implementation of new slice helper from Core package

### @axelor/aos-mobile-manufacturing

#### Fixes

- Consumed products : manage no tracking number configured

#### Changes

- Implementation of new slice helper from Core package

### @axelor/aos-mobile-crm

#### Fixes

- Issues with components on form views
- Add AppCrm API path to RouterProvider to manage AOSv7

#### Changes

- Implementation of new slice helper from Core package

## [7.0.0] (2023-05-17)

### General

New major version on the mobile application to follow update of [Axelor Open Suite](https://github.com/axelor/axelor-open-suite) to version 7.0.x.

This version can be used with AOS v6.4.x or v6.5.x by enabling the configuration `retrocompatibilityAOS6` in the application configuration file.

A few dependencies updated:

- Node.js v16.x
- Nx v14.8.3

This version also add iOS support ! :confetti_ball:

The project architecture has also been updated, the example folder has been exploded to make project more readable. Now, android, ios and source folders are directly at project root. The application configuration file is now located in the `src` folder.

### @axelor/aos-mobile-core

#### Features

- Connection session management system
    <Details>
    New login screen design with session logic. You can now create a session on your first visit to the application and then simply fill in the password to login. You can also manage a list of sessions. This system can be disabled by the enableConnectionSessions configuration in the app.config.js file which will restore the old login screen and save the last session as the default session.
    </Details>
- News in the application configuration file:
  - `themeColorsConfig`: simplify customization of main color theme by modifying the relevant colors
  - `writingStylesConfig`: simplify customization of main writing theme by modifying the relevant styles
  - `showModulesSubtitle`: define default value for drawer subtitles config
  - `logoFile`: define custom logo for login screen by giving new image
  - `retrocompatibilityAOS6`: define with which version of AOS the mobile application should be compatible with (`false` for AOS v7.X only or `true` for AOS v6.X and v7.0.x)
  - `allowInternetConnectionBlock`: enable or not user to block internet connection
- Add props disableIf on header actions
- Improve API providers with new actions
- New props useObjectStatus on StopWatch to wait for object update to change timer status
- Enable user to activate or not drawer subtitles in settings screen
- Header band:
  - Add list of dynamic header bands system
  - Add header band when user is on test environment
  - Add header band when internet connection is disabled
- Improve PlanningView with return to day and navigate between weeks buttons
- Test if url is valid on end input on login screen

### @axelor/aos-mobile-ui

#### Features

- Creation of the **Storybook** ! :confetti_ball:
- Add detailed list pop up on search icon press on SearchBar
- New props _horizontal_ on ScrollList to know component orientation
- Improve MultiValuePicker with object color information

#### Changes

- Remove HeaderIndicator component: replaced by HeaderBandContext in core package

### @axelor/aos-mobile-stock

#### Features

- Add scan to search line on stock screens
- Manage partially done lines on stock moves
- Use new stock config of Axelor Mobile Settings only available from AOS v7.0.0 : line verification, line addition and object validation

#### Changes

- Improve ergonomy of internal move and stock correction creation screens
- Add search bar details pop up on screens: add empowered searchBar for objects

### @axelor/aos-mobile-manufacturing

#### Changes

- Add search bar details pop up on screens: add empowered searchBar for objects

### @axelor/aos-mobile-crm

#### Changes

- Replace ChipSelect by MultiValuePicker on list screens
- Add search bar details pop up on screens: add empowered searchBar for objects

[7.0.3]: https://github.com/axelor/axelor-mobile/compare/7.0.2...7.0.3
[7.0.2]: https://github.com/axelor/axelor-mobile/compare/7.0.1...7.0.2
[7.0.1]: https://github.com/axelor/axelor-mobile/compare/7.0.0...7.0.1
[7.0.0]: https://github.com/axelor/axelor-mobile/compare/6.5.1...7.0.0
