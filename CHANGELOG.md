---
title: 8.2.0
tags: Changelog
---

## [8.2.2] (2024-11-19)

### @axelor/aos-mobile-core

#### Features

- CustomFieldForm: manage M2M and O2M fields display
- CustomFieldForm: manage image widget

#### Fixes

- CustomLoginPage: add same props to component as other login screen

### @axelor/aos-mobile-ui

#### Fixes

- ActionCard: avoid display issue with two vertial actions
- Increment: improve management of spacers on blur

### @axelor/aos-mobile-hr

#### Fixes

- Expense line form: move the add button to the floating tools
- Reducers: add missing exports

## [8.2.1] (2024-11-07)

### @axelor/aos-mobile-core

#### Features

- Header: add possibility to define generic actions from functional packages

#### Fixes

- Permissions: merge configurations to avoid conflicts
- MailMessages: display chips only on one line
- Sessions: add export to use components in other packages

### @axelor/aos-mobile-ui

#### Features

- ChipSelect: add possibility to define maximun number of line for chip titles

#### Fixes

- Screen: hide native navigation bar when keyboard disappears
- ActionCard: avoid display issue with vertial actions
- TreeView: resolve display issue on branch card

### @axelor/aos-mobile-sale

#### Fixes

- Cart: add refresh on screen focus

### @axelor/aos-mobile-project

#### Fixes

- Task: add sorting in request to group task links

### @axelor/aos-mobile-hr

#### Fixes

- Expense line: solve number of hooks issue on form
- Timesheet: trigger period computation on update
- Expense: solve deletion error on expense and expense line

### @axelor/aos-mobile-stock

#### Fixes

- Product indicators: disable the popup to increase the pressable area to access stock indicator details view
- Creation screens: improve scroll style

## [8.2.0] (2024-10-29)

This release brings a major update to the project's dependencies, including React Native, which is now at 0.73.x.
The Storybook dependencies have been updates too, to version 7.6.x, and tools have been created to simplify stories creation.

### @axelor/aos-mobile-core

#### Features

- Sessions: add possibility to set default session for demo
- Module: add new system to manage dynamic module registration
- Module: add new system to manage quick actions with a global toolbox
- Quick actions: add possibility to hide actions from settings screen
- Menu management: use new logic for authorized menus
- Print: Add option to print from a template in header actions
- SingleSelectSearchListView: add a new component to simplify list view creation with SingleSelectScrollList
- I18n: manage region support on languages
- DateDisplay: add possibility to display the year
- MailMessageNotificationCard: add possibility to display custom component in header
- PeriodInput: add possibility to hide inputs title
- PeriodInput: add interval between start and end dates with possibility to define a default one in hours with props
- AOPChart: manage chart parameters
- Custom fields view: add possibility to manage multiple instances of the component on the same view
- Form view: add possibility to remove background color and buttons container
- UI Configs: save configs into storage to restore them when opening the app

#### Changes

- InputBarCodeCard: improve component design
- Dashboard: use new module registration system to create dashboard menus from web config
- Webview: use new module registration system to create webview menus from web config

### @axelor/aos-mobile-ui

#### Features

- GroupByScrollList: add possibility to display a sticky top indicator for current group
- DraggableWrapper: add new wrapper to make components draggable
- Price formatting: add hook to format the decimal digits according to web configuration
- TextUnit: add title management
- Dashboard: add Indicator chart type
- ActionCard: add new component which wrap a card and display its actions
- CardIconButton / InfoButton : add possibility to disable the button
- Screen: add possibility to remove container around bottom buttons
- ViewAllEditList: add new component to display an editable list with an Alert to show all the items
- QuantityCard: add new component to display a quantity with an increment input on a card
- SingleSelectScrollList: add a new component to manage a scrollable list with radio selection
- Dropdown: add possibility to display icon on title
- FormSlider: add new component to manage slider with form design
- Slider: add new component to display a slider
- BottomBar: make active title management the default behaviour

#### Fixes

- LabelText: align items to avoid flex display issue
- LabelText: allow use of numbers

### New package : @axelor/aos-mobile-sale

This package is compatible with AOS Sale module from version 8.2.0.
It enables user to manage clients, products, sale quotations and sale orders through the mobile application.
This package also provide a cart management with quick actions to add products to user's cart from a sale order or product details.
This package is linked with @axelor/aos-mobile-crm for clients management.

### New package : @axelor/aos-mobile-project

This package is compatible with AOS Project module from version 8.2.0.
It enables user to manage projects and tasks through the mobile application.
This package is linked with the @axelor/aos-mobile-hr to manage time logging.

### @axelor/aos-mobile-intervention

#### Changes

- Card display: replace cards with actions by ActionCard component

### @axelor/aos-mobile-hr

#### Changes

- Card display: replace cards with actions by ActionCard component

### @axelor/aos-mobile-crm

#### Features

- Client details: add possibility to define additional dropdowns

#### Changes

- Card display: replace cards with actions by ActionCard component

### @axelor/aos-mobile-manufacturing

#### Features

- Product indicators: add override from stock screen to add manufacturing indicators
- Consumed products: add a badge to get information about linked StockMove status

#### Changes

- Card display: replace cards with actions by ActionCard component

### @axelor/aos-mobile-stock

#### Features

- Stock move line: add missing quantity tag
- Product indicators: add details view on indicator click
- Supplier arrival: enable line splitting

#### Fixes

- Supplier arrival: add possibility to fill origin when creating or selecting tracking number

  [8.2.2]: https://github.com/axelor/axelor-mobile/compare/8.2.1...8.2.2
  [8.2.1]: https://github.com/axelor/axelor-mobile/compare/8.2.0...8.2.1
  [8.2.0]: https://github.com/axelor/axelor-mobile/compare/8.1.8...8.2.0
