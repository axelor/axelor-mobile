---
title: 8.4.0
tags: Changelog
---

## [8.4.13] (2026-01-29)

### @axelor/aos-mobile-core

#### Fixes

- AOS compatibility: propagates compatibility when adding a menu to another module

## [8.4.12] (2025-12-17)

### @axelor/aos-mobile-core

#### Features

- Generic header action: provide web config to generic action handlers

#### Fixes

- Mass scanner: delay launch of fallback action to avoid display issue with camera
- Print reports: resolve close alert issue

### @axelor/aos-mobile-dms

#### Fixes

- Attached files: hide action when app is disabled on web config

## [8.4.11] (2025-12-04)

### @axelor/aos-mobile-core

#### Features

- Date: add two new helpers (isMidnightDate & decreaseDate)
- Date: improve helpers getNextMonth & getPreviousMonth to define number of months to add/remove

#### Fixes

- Websocket: manage unsecure instances
- Planning: improve display of multidays events to match AOP behavior

### @axelor/aos-mobile-hr

#### Changes

- Expense line: simplify logic on distance computation

#### Fixes

- Expense line: save distance value when coming from API computation
- Expense line: make kilometricTypeSelect a number inside form configuration
- Expense line: manage kilometric type in distance computation

### @axelor/aos-mobile-crm

#### Fixes

- Planning: load events 2 months around the current date instead of 1

## [8.4.10] (2025-11-28)

### @axelor/aos-mobile-core

#### Fixes

- FormView: activate popup mode on SignatureInput component by default

<details>
Popup mode has been activate for signature type fields to avoid conflicts with scroll behavior. This value can be overriden by adding options.popup false value on the field configuration.
</details>


## [8.4.9] (2025-11-13)

### @axelor/aos-mobile-ui

#### Fixes

- Input: resolve content size update behavior on iOS

## [8.4.8] (2025-11-12)

### @axelor/aos-mobile-core

#### Changes

- Network check: use ERP healthcheck once user is connected

#### Fixes

- SearchListView: avoid select behavior on search when no onChange is provided

### @axelor/aos-mobile-hr

#### Fixes

- Expense selection popup: avoid style issue on iOS with picker display

## [8.4.7] (2025-11-04)

### @axelor/aos-mobile-core

#### Fixes

- FormView: improve default reset action behavior
- AOP request formatter: resolve issue when body contains an array

### @axelor/aos-mobile-ui

This version contains migration of a few molecules tests to RNTL.

#### Changes

- HalfLabelCard: improve component style

### @axelor/aos-mobile-manufacturing

#### Fixes

- Consumed products: use the right API function from stock module to add a tracking number
- Consumed products: resolve issue on tracking number computation when creating a new record

## [8.4.6] (2025-10-09)

### @axelor/aos-mobile-dms

#### Changes

- AOP request: simplify body content to avoid permission issue

### @axelor/aos-mobile-purchase

#### Changes

- AOP request: simplify body content to avoid permission issue

### @axelor/aos-mobile-sale

#### Changes

- AOP request: simplify body content to avoid permission issue

### @axelor/aos-mobile-project

#### Changes

- AOP request: simplify body content to avoid permission issue

### @axelor/aos-mobile-intervention

#### Changes

- AOP request: simplify body content to avoid permission issue

### @axelor/aos-mobile-quality

#### Changes

- AOP request: simplify body content to avoid permission issue

### @axelor/aos-mobile-hr

#### Changes

- AOP request: simplify body content to avoid permission issue

### @axelor/aos-mobile-helpdesk

#### Changes

- AOP request: simplify body content to avoid permission issue

### @axelor/aos-mobile-crm

#### Fixes

- Updates: improve refresh management to avoid undefined issue after record update

### @axelor/aos-mobile-stock

#### Changes

- AOP request: simplify body content to avoid permission issue

## [8.4.5] (2025-10-02)

### @axelor/aos-mobile-core

#### Features

- UploadFileInput: add possibility to manage state outside of component

#### Fixes

- Login: add a more relevant error message when the user attempts to log in without an internet connection.
- DoubleScannerSearchBar: add refresh on default value

### @axelor/aos-mobile-dms

#### Fixes

- Attached files: improve on root folder creation management

### @axelor/aos-mobile-crm

#### Changes

- AOP request: simplify body content to avoid permission issue

### @axelor/aos-mobile-stock

#### Fixes

- SupplierArrival: resolve tracking number creation issues

## [8.4.4] (2025-08-21)

### @axelor/aos-mobile-core

#### Changes

- PlanningView: optimize management of API calls on focus and assignation

#### Fixes

- PlanningView: load items of visible month when scrolling up or down the agenda months
- PlanningView: sort items to make month separator appear at the end
- PlanningView: reduce size of hours to make it fit on one line
- Modules checker: filter modules on enabled ones only
- Keyboard visibility: remove typo in translation
- DoubleScannerSearchBar: make props sliceFunctionBarCodeData and onFetchDataAction optional

### @axelor/aos-mobile-ui

#### Fixes

- Theme: catch erros when mapping colors

### @axelor/aos-mobile-sale

#### Fixes

- Products: manage sellable configuration by company for sale order creation

### @axelor/aos-mobile-crm

#### Changes

- Events: optimize management of API calls in planning view

#### Fixes

- Clients: resolve issue on dropdown items duplicated keys

## [8.4.3] (2025-07-31)

### @axelor/aos-mobile-core

#### Fixes

- Camera scanner: apply formatter which remove last character when needed like Zebra scanner
- Camera scanner: do not reset camera key after scanning a value to avoid lost information

### @axelor/aos-mobile-ui

#### Fixes

- AutoCompleteSearch: declench api call when user focus input
- Increment: unformat value before processing end input to resolve outside click issue

## [8.4.2] (2025-07-24)

### @axelor/aos-mobile-core

#### Features

- Navigation: add hook to check if screen is a stack root

#### Fixes

- Object fields: manage deep merging to simplify fields addition in override
- Screen context: filter undefined ids to avoid sending inconsistent results in helpers
- Configs: reset web configurations on app refresh

### @axelor/aos-mobile-ui

#### Features

- PeriodInput: add usePopup prop to define if date input should display as dropdown or alert
- RadioSelect: add prop to modify question style

#### Changes

- Event: use popup date inputs on form view to simplify validation

#### Fixes

- Increment: apply outside click behavior only when input was focused
- FloatingButton: display titles on the left

### @axelor/aos-mobile-sale

#### Fixes

- SaleOrderLine: avoid issue when product is null

### @axelor/aos-mobile-hr

#### Fixes

- Projects: apply the same filters as AOS

### @axelor/aos-mobile-stock

#### Fixes

- StockMoveLine: improve sorting management with sequence field

## [8.4.1] (2025-07-17)

### @axelor/aos-mobile-core

#### Fixes

- Configs: fetch only configs required for enabled apps

### @axelor/aos-mobile-ui

This version contains migration of all atoms tests to RNTL.

#### Features

- ObjectCard: add fontSize attribute on TextElement

#### Fixes

- HtmlInput: add blur on click outside management

### @axelor/aos-mobile-hr

#### Features

- Timesheet: enable deletion of a TimesheetLine linked to a TSTimer

#### Fixes

- Timers: remove crash issue when trying to navigate to form view

### @axelor/aos-mobile-stock

#### Fixes

- StockMove: modify note titles to match with AOS
- InternalMoveLine: make stock move notes readonly
- Mass scan: add missing refresh on stock move lines completion
- Mass scan: add permission check before displaying button
- StockMoveLine: improve card display with smaller title & move badge to upper
- Mass scan: make button more visible when enabled

## [8.4.0] (2025-07-03)

This release brings a major update to the project's dependencies, including React Native, which is now at 0.75.x. This version also add a new test library RNTL and existing test cases will be migrated one by one during the next patch versions. The enzyme dependency should be removed in a next version.

### @axelor/aos-mobile-core

#### Features

- Maintenance: trigger error screen when receive a 503 error in API
- Toast: add possibility to display a message above the camera
- Scanner: add mass scan management
- Price management: add new hook to help formatting price depending on currency configuration
- WebSocket: add a configuration to activate or not connection
- WebSocket: add a hook to listen to websocket messages
- FormView: add access to form state from custom button
- Application version: add hook to check if version is outdated
- Date utils: add new function to get date under from now format
- List views: add management of AOP filters through a new generic header action

#### Changes

- UploadFileInput: simplify component to use document picker tool
- Document picker tool: use new library @react-native-documents/picker
- Header actions: use generic actions to generate basic header actions
- Components: remove unused components HeaderOptionMenu & HeaderOptionMenuItem
- Navigation: upgrade dependencies and improve code with typescript

### @axelor/aos-mobile-ui

#### Features

- DropdownMenu: add props to manage style
- DropdownMenuItem: add props to manage style
- ProgressCircle: add new component to show progress with svg circles
- Stepper: add new component to manage progress of a process

#### Changes

- MessageBox: move component to message package
- AttachmentCard: delete component
- RadioSelect: manage update when default value change
- ActionCard: merge style of children instead of replacing with height
- Icons: remove possibility to use font awesome

<details>
Those props were deprecated since version 8.0.0. Icons should use bootstrap database.
</details>

### New package : @axelor/aos-mobile-message

This package is compatible with the AOS message module from version 8.4.0. It allows users to access their inbox through the mobile application. This package has replaced the old tracking feature from core package with a generic header action with enhanced functionalities.

### @axelor/aos-mobile-dms

#### Features

- DocumentActionCard: add options on component to disable each action
- Document: add possibility to search document through a list of id

### @axelor/aos-mobile-purchase

#### Changes

- List views: add AOP filter management

### @axelor/aos-mobile-sale

#### Changes

- List views: add AOP filter management
- Price management: use new tool to format totals with currency

### @axelor/aos-mobile-project

#### Changes

- List views: add AOP filter management
- Navigation: use new tool to go back to an existing screen in the stack when navigating

### @axelor/aos-mobile-intervention

#### Changes

- List views: add AOP filter management

### @axelor/aos-mobile-quality

#### Features

This version add a new part of the Quality package, user can now manage quality improvements from the mobile application. A new menu entries have been added to see the existing QI and complete a new request through an assistant.

#### Changes

- List views: add AOP filter management

### @axelor/aos-mobile-hr

#### Features

- Timesheet line: manage duration based on timesheet unit on form
- Expense line: manage invited collaborators on form

#### Changes

- List views: add AOP filter management
- Navigation: use new tool to go back to an existing screen in the stack when navigating

### @axelor/aos-mobile-helpdesk

#### Changes

- List views: add AOP filter management
- Navigation: use new tool to go back to an existing screen in the stack when navigating

### @axelor/aos-mobile-crm

#### Changes

- List views: add AOP filter management
- Navigation: use new tool to go back to an existing screen in the stack when navigating

### @axelor/aos-mobile-manufacturing

#### Features

- Consumed product: add available quantity on card

#### Changes

- List views: add AOP filter management
- Navigation: use new tool to go back to an existing screen in the stack when navigating

### @axelor/aos-mobile-stock

#### Features

- StockMove/Inventory: add availability access on line cards
- StockMove/Inventory: add mass scan management to increment line quantity by one

#### Changes

- List views: add AOP filter management
- Navigation: use new tool to go back to an existing screen in the stack when navigating
- SupplierArrivalProductName: delete unused component

### @axelor/aos-mobile-error

#### Features

- Error types: add new error type MaintenanceError

#### Changes

- ErrorBoundary: modify fallback screen management to manage maintenance error type

[8.4.13]: https://github.com/axelor/axelor-mobile/compare/8.4.12...8.4.13
[8.4.12]: https://github.com/axelor/axelor-mobile/compare/8.4.11...8.4.12
[8.4.11]: https://github.com/axelor/axelor-mobile/compare/8.4.10...8.4.11
[8.4.10]: https://github.com/axelor/axelor-mobile/compare/8.4.9...8.4.10
[8.4.9]: https://github.com/axelor/axelor-mobile/compare/8.4.8...8.4.9
[8.4.8]: https://github.com/axelor/axelor-mobile/compare/8.4.7...8.4.8
[8.4.7]: https://github.com/axelor/axelor-mobile/compare/8.4.6...8.4.7
[8.4.6]: https://github.com/axelor/axelor-mobile/compare/8.4.5...8.4.6
[8.4.5]: https://github.com/axelor/axelor-mobile/compare/8.4.4...8.4.5
[8.4.4]: https://github.com/axelor/axelor-mobile/compare/8.4.3...8.4.4
[8.4.3]: https://github.com/axelor/axelor-mobile/compare/8.4.2...8.4.3
[8.4.2]: https://github.com/axelor/axelor-mobile/compare/8.4.1...8.4.2
[8.4.1]: https://github.com/axelor/axelor-mobile/compare/8.4.0...8.4.1
[8.4.0]: https://github.com/axelor/axelor-mobile/compare/8.3.7...8.4.0
