---
title: 9.0.0
tags: Changelog
---

## [9.0.7] (2026-04-03)

### @axelor/aos-mobile-core

#### Features

- Filters: add support for web view context when loading saved filters

#### Changes

- Filter popup: simplify integration with header action system
- Print popup: simplify integration with header action system

#### Fixes

- Header actions: fix multiple popups opening simultaneously when navigating between screens

<details>
When several screens had a filter or print action enabled, navigating between them caused all popups to open at once when pressing the action on any screen. Popup visibility is now managed per screen.
</details>


### @axelor/aos-mobile-maintenance

#### Fixes

- Filters: add the correct web view context on all list screens

### @axelor/aos-mobile-purchase

#### Fixes

- Filters: add the correct web view context on all list screens

### @axelor/aos-mobile-sale

#### Fixes

- Filters: add the correct web view context on all list screens

### @axelor/aos-mobile-project

#### Fixes

- Filters: add the correct web view context on all list screens

### @axelor/aos-mobile-intervention

#### Fixes

- Filters: add the correct web view context on all list screens

### @axelor/aos-mobile-quality

#### Fixes

- Filters: add the correct web view context on all list screens

### @axelor/aos-mobile-hr

#### Fixes

- Filters: add the correct web view context on all list screens

### @axelor/aos-mobile-helpdesk

#### Changes

- Ticket list screens: split header action key into helpdesk_myTicket_list and helpdesk_myTeamTicket_list

#### Fixes

- Filters: add the correct web view context on all list screens

### @axelor/aos-mobile-crm

#### Fixes

- Filters: add the correct web view context on all list screens

### @axelor/aos-mobile-manufacturing

#### Fixes

- Filters: add the correct web view context on all list screens

### @axelor/aos-mobile-stock

#### Fixes

- Filters: add the correct web view context on all list screens

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

[9.0.7]: https://github.com/axelor/axelor-mobile/compare/9.0.6...9.0.7
[9.0.6]: https://github.com/axelor/axelor-mobile/compare/9.0.5...9.0.6
[9.0.5]: https://github.com/axelor/axelor-mobile/compare/9.0.4...9.0.5
[9.0.4]: https://github.com/axelor/axelor-mobile/compare/9.0.3...9.0.4
[9.0.3]: https://github.com/axelor/axelor-mobile/compare/9.0.2...9.0.3
[9.0.2]: https://github.com/axelor/axelor-mobile/compare/9.0.1...9.0.2
[9.0.1]: https://github.com/axelor/axelor-mobile/compare/9.0.0...9.0.1
[9.0.0]: https://github.com/axelor/axelor-mobile/compare/8.5.5...9.0.0
