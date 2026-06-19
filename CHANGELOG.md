---
title: 9.0.0
tags: Changelog
---

## [9.0.13] (2026-06-19)

### @axelor/aos-mobile-stock

#### Fixes

- Stock move lines: resolve rack value flickering when displaying lines

## [9.0.12] (2026-06-16)

### @axelor/aos-mobile-core

#### Fixes

- Mass scanner: process the scan only on the focused screen so the action runs once when a scan key is shared
- ScannerAutocompleteSearch: prevent the search bar from automatically stealing the scan key from an active mass scanner

### @axelor/aos-mobile-hr

#### Fixes

- Leave requests: resolve display issue on manager buttons

### @axelor/aos-mobile-stock

#### Features

- Stock move lines: add possibility to enable the mass scanner from the complete list view

## [9.0.11] (2026-06-12)

### @axelor/aos-mobile-core

#### Features

- Authentication: add MFA support (TOTP and email)

#### Fixes

- Drawer: add possibility to close inner menu
- Search requests: exclude nested array fields from field list

<details>
Array fields declared inside a sub-object schema (e.g. task.project.projectTaskCategorySet) were included in the fields list sent to search endpoints. The backend does not support fetching nested collection fields through a search request, which can cause errors or unexpected empty results. Those fields are now automatically excluded from search requests while still being requested on fetch requests. Developers who relied on the previous behaviour can opt back in by passing includeNestedArrayFields: true to createStandardSearch.
</details>


### @axelor/aos-mobile-message

#### Fixes

- MailMessage: translate track field titles, selection values and event texts

### @axelor/aos-mobile-stock

#### Fixes

- Stock move lines: align card border color with list filter status colors

## [9.0.10] (2026-05-05)

### @axelor/aos-mobile-stock

#### Features

- Supplier arrival: add supplier shipment details section on the details screen

<details>
A collapsible 'Shipment details' section is now visible on the supplier arrival details screen, showing the supplier shipment reference and date. An edit button inside this section allows users to fill in or update these fields (with barcode scan support for the reference) at any time before realizing the move.
</details>


#### Fixes

- Supplier arrival: block realization when required shipment details are missing

<details>
When the AppStock configuration 'isRequiredShipmentSupplierDetails' is enabled, attempting to realize a supplier arrival with a missing shipment reference or date no longer results in a server error. A popup is now displayed to let the user fill in the missing information before proceeding with the realization.
</details>


## [9.0.9] (2026-04-22)

### @axelor/aos-mobile-core

#### Fixes

- PlanningView: ingore events when dates are inconsistent (start date after end date)
- Route switcher: compute Traceback route only once user is connected to avoid stale config

### @axelor/aos-mobile-stock

#### Changes

- Rack management: reduce server load when loading stock move line lists

<details>
Stock move line lists (customer deliveries, supplier arrivals, internal moves) now fetch rack information for all lines in a single request instead of one request per line. Only the rack field is retrieved, reducing both the number of requests and the size of each response.
</details>


#### Fixes

- Rack management: display locker information on stock move line detail screens

## [9.0.8] (2026-04-14)

### @axelor/aos-mobile-core

#### Fixes

- Formula helpers: fix null/undefined object state handling in formula evaluation
- Action api provider: improve types
- Mass scanner: resolve refresh issue which was evaluating the scan value twice on Zebra

### @axelor/aos-mobile-hr

#### Fixes

- Leave requests: add default values for startOn and endOn select on creation assistant

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

[9.0.13]: https://github.com/axelor/axelor-mobile/compare/9.0.12...9.0.13
[9.0.12]: https://github.com/axelor/axelor-mobile/compare/9.0.11...9.0.12
[9.0.11]: https://github.com/axelor/axelor-mobile/compare/9.0.10...9.0.11
[9.0.10]: https://github.com/axelor/axelor-mobile/compare/9.0.9...9.0.10
[9.0.9]: https://github.com/axelor/axelor-mobile/compare/9.0.8...9.0.9
[9.0.8]: https://github.com/axelor/axelor-mobile/compare/9.0.7...9.0.8
[9.0.7]: https://github.com/axelor/axelor-mobile/compare/9.0.6...9.0.7
[9.0.6]: https://github.com/axelor/axelor-mobile/compare/9.0.5...9.0.6
[9.0.5]: https://github.com/axelor/axelor-mobile/compare/9.0.4...9.0.5
[9.0.4]: https://github.com/axelor/axelor-mobile/compare/9.0.3...9.0.4
[9.0.3]: https://github.com/axelor/axelor-mobile/compare/9.0.2...9.0.3
[9.0.2]: https://github.com/axelor/axelor-mobile/compare/9.0.1...9.0.2
[9.0.1]: https://github.com/axelor/axelor-mobile/compare/9.0.0...9.0.1
[9.0.0]: https://github.com/axelor/axelor-mobile/compare/8.5.5...9.0.0
