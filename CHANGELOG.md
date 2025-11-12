---
title: 8.2.0
tags: Changelog
---

## [8.2.23] (2025-11-12)

### @axelor/aos-mobile-core

#### Changes

- Network check: use ERP healthcheck once user is connected

#### Fixes

- SearchListView: avoid select behavior on search when no onChange is provided

### @axelor/aos-mobile-hr

#### Fixes

- Expense selection popup: avoid style issue on iOS with picker display

## [8.2.22] (2025-11-04)

### @axelor/aos-mobile-core

#### Fixes

- FormView: improve default reset action behavior
- AOP request formatter: resolve issue when body contains an array

### @axelor/aos-mobile-manufacturing

#### Fixes

- Consumed products: use the right API function from stock module to add a tracking number
- Consumed products: resolve issue on tracking number computation when creating a new record

## [8.2.21] (2025-10-09)

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

### @axelor/aos-mobile-helpdesk

#### Changes

- AOP request: simplify body content to avoid permission issue

### @axelor/aos-mobile-crm

#### Fixes

- Updates: improve refresh management to avoid undefined issue after record update

### @axelor/aos-mobile-stock

#### Changes

- AOP request: simplify body content to avoid permission issue

## [8.2.20] (2025-10-02)

### @axelor/aos-mobile-core

#### Fixes

- Login: add a more relevant error message when the user attempts to log in without an internet connection.

### @axelor/aos-mobile-crm

#### Changes

- AOP request: simplify body content to avoid permission issue

### @axelor/aos-mobile-stock

#### Fixes

- SupplierArrival: resolve tracking number creation issues

## [8.2.19] (2025-08-21)

### @axelor/aos-mobile-core

#### Changes

- PlanningView: optimize management of API calls on focus and assignation

#### Fixes

- PlanningView: load items of visible month when scrolling up or down the agenda months
- PlanningView: sort items to make month separator appear at the end
- PlanningView: reduce size of hours to make it fit on one line
- Modules checker: filter modules on enabled ones only

### @axelor/aos-mobile-sale

#### Fixes

- Products: manage sellable configuration by company for sale order creation

### @axelor/aos-mobile-crm

#### Changes

- Events: optimize management of API calls in planning view

#### Fixes

- Clients: resolve issue on dropdown items duplicated keys

## [8.2.18] (2025-07-31)

### @axelor/aos-mobile-core

#### Fixes

- Camera scanner: apply formatter which remove last character when needed like Zebra scanner

### @axelor/aos-mobile-ui

#### Fixes

- AutoCompleteSearch: declench api call when user focus input
- Increment: unformat value before processing end input to resolve outside click issue

## [8.2.17] (2025-07-24)

### @axelor/aos-mobile-core

#### Fixes

- Object fields: manage deep merging to simplify fields addition in override
- Screen context: filter undefined ids to avoid sending inconsistent results in helpers
- Configs: reset web configurations on app refresh

### @axelor/aos-mobile-ui

#### Features

- PeriodInput: add usePopup prop to define if date input should display as dropdown or alert
- RadioSelect: add prop to modify question style
- ObjectCard: add fontSize attribute on TextElement

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

- StockMoveLine: improve card display with smaller title & move badge to upper
- StockMoveLine: improve sorting management with sequence field

## [8.2.16] (2025-07-17)

### @axelor/aos-mobile-core

#### Fixes

- Configs: fetch only configs required for enabled apps

### @axelor/aos-mobile-ui

#### Fixes

- HtmlInput: add blur on click outside management

### @axelor/aos-mobile-hr

#### Features

- Timesheet: enable deletion of a TimesheetLine linked to a TSTimer

### @axelor/aos-mobile-stock

#### Fixes

- StockMove: modify note titles to match with AOS
- InternalMoveLine: make stock move notes readonly

## [8.2.15] (2025-07-03)

### @axelor/aos-mobile-ui

#### Fixes

- AutoCompleteSearch: improve process to let objectList refresh before processing last item

### @axelor/aos-mobile-sale

#### Fixes

- Catalog: add missing redirection to product details screen
- Product details: allow display of variant products from generic one
- Catalog: open variant selection pop up only on generic product

### @axelor/aos-mobile-crm

#### Fixes

- Event planning: use the right title to the type picker

### @axelor/aos-mobile-stock

#### Fixes

- SearchLineContainer: add message when no data provided
- Product by company: avoid undefined issue when fetching product for the first time

## [8.2.14] (2025-06-05)

Resolve issue on connection to Axelor test instances on iOS devices

### @axelor/aos-mobile-stock

#### Features

- Stock move: add possibility to search on order reference
- Stock indicators: add external reference and line number on sale & purchase order card

#### Fixes

- Line verification: add missing product information
- Stock indicators: inverse condition on badges display on sale & purchase orders card
- Stock indicators: use sale or purchase orders estimated date when null on line object

## [8.2.13] (2025-05-21)

### @axelor/aos-mobile-core

#### Fixes

- Map widget: automatically filled address when clicking on widget

### @axelor/aos-mobile-stock

#### Fixes

- Inventory line: resolve navigation issue after validation

## [8.2.12] (2025-04-30)

### @axelor/aos-mobile-core

#### Fixes

- Upload tool: remove illegal characters from filename before processing

### @axelor/aos-mobile-ui

#### Changes

- ViewAllEditList: improve line display
- ViewAllEditList: make line edit management optional

### @axelor/aos-mobile-manufacturing

#### Fixes

- prodProductSlice: use the correct product API import

## [8.2.11] (2025-04-16)

### @axelor/aos-mobile-ui

#### Changes

- Increment: facilitate edition by making whole input clickable

## [8.2.10] (2025-04-10)

### @axelor/aos-mobile-core

#### Changes

- Compatibility: improve error messages in drawer with more details

#### Fixes

- iPad: add configuration to be in full screen in portrait mode
- Scanner: always add listener on intents to resolve profile creation

### @axelor/aos-mobile-ui

#### Fixes

- ActionCard: merge style of children instead of replacing with height

### @axelor/aos-mobile-hr

#### Fixes

- Config: add null checks to avoid crash

### @axelor/aos-mobile-stock

#### Fixes

- Inventory: use keyboard avoiding view on details screen
- Config: add null checks to avoid crash

## [8.2.9] (2025-03-25)

### @axelor/aos-mobile-core

#### Features

- Navigation: add new tool to check if a screen is present in the current stack

#### Fixes

- ScannerAutocompleteSearch: handle scan focus when going back to a screen
- DateInput: reset date when click outside
- Login: remove double slash before callback endpoint

### @axelor/aos-mobile-ui

#### Changes

- LabelText: improve multi lines management of title and value

#### Fixes

- RadioSelect: manage update when default value change

### @axelor/aos-mobile-crm

#### Fixes

- Event form: improve date management
- Event form: resolve issue with period when creating an event

### @axelor/aos-mobile-stock

#### Fixes

- Line update: improve navigation after update to match user history
- Line card: add more line to fixed issue with too long title

## [8.2.8] (2025-03-13)

### @axelor/aos-mobile-core

#### Features

- Traceback: add current request path
- Camera scanner: allow more code types to match server options
- Roles: add tool to get all roles of user

#### Fixes

- API management: add translation on error message
- PeriodInput: resolve issue when onPeriodErrorChange not provided
- Dashboards/Webviews: restore menus access control by correctly fetching user
- Translations: improve logic to upload localization and language at the same time

### @axelor/aos-mobile-ui

#### Fixes

- ProgressBar: hide progress when value is 0

### @axelor/aos-mobile-sale

#### Changes

- Permission: add access control before displaying action buttons

#### Fixes

- Cart: add error message when trying to add a product from catalog without active cart

### @axelor/aos-mobile-project

#### Changes

- Permission: add access control before displaying action buttons

#### Fixes

- Address: remove unused deprecated fields
- Task: initialize options even when the filters are hidden

### @axelor/aos-mobile-intervention

#### Fixes

- Intervention: use assignedTo to check user instead of going through employee

### @axelor/aos-mobile-quality

#### Fixes

- Dimension type control: resolve issue with value which was not reset when switching from one sample to another
- Control entry line: resolve display issue with long sample title
- Control entry line: add null checks to avoid crash

### @axelor/aos-mobile-crm

#### Fixes

- Address: change fields to follow model structure update
- Event: use selection from web for type

### @axelor/aos-mobile-stock

#### Changes

- Multi company: manage product by company for tracking number configuration

## [8.2.7] (2025-02-12)

### @axelor/aos-mobile-core

#### Features

- PeriodInput: add props dateInputMode and nullable on date config
- PeriodInput: add new props to detect error from outside

#### Changes

- Zebra scanner: add Datawedge profile creation management

<details>
Based on the application name and bundle id, the Scanner component is now dynamically creating the Datawegde profile with the correct configuration. Caution, if you modified the bundle id compared to the standard application, then your action intent was also modified to match the bundle id. To correctly get this functionnality, please delete your current Datawedge profile and let the application recreate a new one with the right configutation.
</details>

### @axelor/aos-mobile-ui

#### Fixes

- FormIncrementInput: add callback on blur and focus functions to avoid useless refresh

### @axelor/aos-mobile-hr

#### Fixes

- Distance input: add spacer translations to avoid undefined issue on format

### @axelor/aos-mobile-crm

#### Changes

- Event form: replace start and end dates inputs by PeriodInput component

## [8.2.6] (2025-01-30)

### @axelor/aos-mobile-core

#### Features

- RequestBuilder: add tool to manage search on hierarchical objects

#### Changes

- Navigator: unmount Drawer on blur
- Login: improve token retrieval with a regex
- Login: split code into small tools to make it resusable in other packages

#### Fixes

- PeriodDisplay: add null check on start date to avoid crash
- Menu management: apply override before checking accessibility and order to match configuration
- Login: add exports of functions and tools
- Auth: add call to logout endpoint to unvalidate tokens

### @axelor/aos-mobile-ui

#### Fixes

- Increment: remove refresh issue due to undefined props
- Label: ensure that the text takes up all the available space

### @axelor/aos-mobile-sale

#### Changes

- Data fetching: add active company management

#### Fixes

- Cart: hide empty cart action when no cart found

### @axelor/aos-mobile-project

#### Changes

- Data fetching: add active company management

### @axelor/aos-mobile-intervention

#### Changes

- Data fetching: add active company management

### @axelor/aos-mobile-hr

#### Changes

- Data fetching: add active company management

### @axelor/aos-mobile-helpdesk

#### Changes

- Data fetching: add active company management

### @axelor/aos-mobile-crm

#### Changes

- Data fetching: add active company management

### @axelor/aos-mobile-manufacturing

#### Changes

- Data fetching: add active company management

### @axelor/aos-mobile-stock

#### Changes

- Stock location API: use new tool to manage hierarchical search
- Data fetching: add active company management

#### Fixes

- API: add missing exports of api & slice functions
- UserScreen: modify export
- API: add missing sort key on search functions

## [8.2.5] (2024-12-19)

### @axelor/aos-mobile-core

#### Features

- Company management: add generic tools to create criterias
- SearchTreeView: add possibility to have a fixed parent search bar

#### Fixes

- Agenda: patch package to restore load of items on component layout

### @axelor/aos-mobile-crm

#### Fixes

- Opportunity form: make contact and partner fields mutually dependent

### @axelor/aos-mobile-stock

#### Fixes

- Inventory line: correct creation process

## [8.2.4] (2024-12-05)

### @axelor/aos-mobile-core

#### Features

- Generic action: add possibility to use async functions

#### Changes

- Session card: add possibility to override session removal action

#### Fixes

- Menu: use popup to display error message
- Print header action: check if a template exists only when model and id are present
- UI Configs: evaluate default values for config only when storage is empty

### @axelor/aos-mobile-ui

#### Features

- CardIndicator: add possibility to display indication in popup
- InfoBubble: add usePopup props to display indication in popup

#### Changes

- Increment: modify format management on blur/focus

#### Fixes

- AutoCompleteSearch: manage margin bottom when the list is empty
- Increment: save when click outside the input

### @axelor/aos-mobile-intervention

#### Fixes

- CustomerParkScreen: resolve filter issue with chips

### @axelor/aos-mobile-stock

#### Changes

- Indicators: move logic to fetch available stock to card components

<details>
There was a performance problem on the screens requiring the product indicators. To solve this slow performance problem, product indicators are now retrieved from the card component in the background. The old way of working retrieved the indicators for all the products in the list each time they were updated, before displaying them, which is rather cumbersome and shouldn't be used. The functions concerned have been removed. 
</details>

## [8.2.3] (2024-11-26)

### @axelor/aos-mobile-core

#### Features

- WebView: authorize geolocation

#### Fixes

- SessionInputs: manage session refresh in unique mode
- Modules: improved search to remove the 40-response limit

### @axelor/aos-mobile-ui

#### Features

- Numerical inputs: add auto-select on focus

#### Fixes

- BranchCard: resolve display issue with chevron

### @axelor/aos-mobile-stock

#### Fixes

- StockMoveLine: use the right API to add a tracking number

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

[8.2.23]: https://github.com/axelor/axelor-mobile/compare/8.2.22...8.2.23
[8.2.22]: https://github.com/axelor/axelor-mobile/compare/8.2.21...8.2.22
[8.2.21]: https://github.com/axelor/axelor-mobile/compare/8.2.20...8.2.21
[8.2.20]: https://github.com/axelor/axelor-mobile/compare/8.2.19...8.2.20
[8.2.19]: https://github.com/axelor/axelor-mobile/compare/8.2.18...8.2.19
[8.2.18]: https://github.com/axelor/axelor-mobile/compare/8.2.17...8.2.18
[8.2.17]: https://github.com/axelor/axelor-mobile/compare/8.2.16...8.2.17
[8.2.16]: https://github.com/axelor/axelor-mobile/compare/8.2.15...8.2.16
[8.2.15]: https://github.com/axelor/axelor-mobile/compare/8.2.14...8.2.15
[8.2.14]: https://github.com/axelor/axelor-mobile/compare/8.2.13...8.2.14
[8.2.13]: https://github.com/axelor/axelor-mobile/compare/8.2.12...8.2.13
[8.2.12]: https://github.com/axelor/axelor-mobile/compare/8.2.11...8.2.12
[8.2.11]: https://github.com/axelor/axelor-mobile/compare/8.2.10...8.2.11
[8.2.10]: https://github.com/axelor/axelor-mobile/compare/8.2.9...8.2.10
[8.2.9]: https://github.com/axelor/axelor-mobile/compare/8.2.8...8.2.9
[8.2.8]: https://github.com/axelor/axelor-mobile/compare/8.2.7...8.2.8
[8.2.7]: https://github.com/axelor/axelor-mobile/compare/8.2.6...8.2.7
[8.2.6]: https://github.com/axelor/axelor-mobile/compare/8.2.5...8.2.6
[8.2.5]: https://github.com/axelor/axelor-mobile/compare/8.2.4...8.2.5
[8.2.4]: https://github.com/axelor/axelor-mobile/compare/8.2.3...8.2.4
[8.2.3]: https://github.com/axelor/axelor-mobile/compare/8.2.2...8.2.3
[8.2.2]: https://github.com/axelor/axelor-mobile/compare/8.2.1...8.2.2
[8.2.1]: https://github.com/axelor/axelor-mobile/compare/8.2.0...8.2.1
[8.2.0]: https://github.com/axelor/axelor-mobile/compare/8.1.8...8.2.0
