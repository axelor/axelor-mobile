---
title: 9.0.0
tags: Changelog
---

## [9.0.6] (2026-03-31)

### @axelor/aos-mobile-hr

#### Fixes

- ExpenseLine: resolve update issue with justification file

## [9.0.5] (2026-03-30)

### @axelor/aos-mobile-hr

#### Changes

- Managed employees: add hook to fetch values when using total

#### Fixes

- Unit helper: avoid crash when duration unit is null

## [9.0.4] (2026-03-11)

### @axelor/aos-mobile-core

#### Fixes

- Date helpers: add default value for locale on getFromNowDate function to avoid undefined issue

### @axelor/aos-mobile-ui

#### Features

- Button: add numberOfLines prop to control text line wrapping

#### Fixes

- Button: improve style to avoid overlap issue with icon

### @axelor/aos-mobile-message

#### Fixes

- MailMessage: avoid undefined issue if the body doesn't contain any tracks or tags
- MailMessage: check model & modelId before fetching subscribers and unread messages

### @axelor/aos-mobile-stock

#### Fixes

- Details screens: avoid stale data and infinite loading on request failure

## [9.0.3] (2026-03-03)

### @axelor/aos-mobile-core

#### Changes

- Shortcut: improve display to align text

#### Fixes

- AOP filters: avoid conflicts between mounted screens

### @axelor/aos-mobile-quality

#### Fixes

- Screen: avoid params crash when screen is usable on shortcuts

### @axelor/aos-mobile-hr

#### Fixes

- Screen: avoid params crash when screen is usable on shortcuts

### @axelor/aos-mobile-crm

#### Fixes

- Screen: avoid params crash when screen is usable on shortcuts

## [9.0.2] (2026-02-04)

### @axelor/aos-mobile-ui

#### Features

- Picker: add possibility to have labels on multiple lines through new prop multiLineLabels

## [9.0.1] (2026-01-29)

### @axelor/aos-mobile-core

#### Fixes

- AOS compatibility: propagates compatibility when adding a menu to another module
- Android: restore cleartext option for webviews integration

## [9.0.0] (2026-01-20)

This release brings a major update to the project’s dependencies, including React Native, now upgraded to version 0.83.x. It also removes the Reactotron integration in favor of React Native DevTools, which now handles all debugging features (console, network, etc.).

### @axelor/aos-mobile-core

#### Fixes

- Login: allow session cookie with - character to match AOP changes

[9.0.6]: https://github.com/axelor/axelor-mobile/compare/9.0.5...9.0.6
[9.0.5]: https://github.com/axelor/axelor-mobile/compare/9.0.4...9.0.5
[9.0.4]: https://github.com/axelor/axelor-mobile/compare/9.0.3...9.0.4
[9.0.3]: https://github.com/axelor/axelor-mobile/compare/9.0.2...9.0.3
[9.0.2]: https://github.com/axelor/axelor-mobile/compare/9.0.1...9.0.2
[9.0.1]: https://github.com/axelor/axelor-mobile/compare/9.0.0...9.0.1
[9.0.0]: https://github.com/axelor/axelor-mobile/compare/8.5.5...9.0.0
