---
title: 8.4.0
tags: Changelog
---

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

[8.4.1]: https://github.com/axelor/axelor-mobile/compare/8.4.0...8.4.1
[8.4.0]: https://github.com/axelor/axelor-mobile/compare/8.3.7...8.4.0
