---
title: 7.2.0
tags: Changelog
---

## [7.2.39] (2025-11-04)

### @axelor/aos-mobile-manufacturing

#### Fixes

- Consumed products: use the right API function from stock module to add a tracking number
- Consumed products: resolve issue on tracking number computation when creating a new record

## [7.2.38] (2025-10-02)

### @axelor/aos-mobile-core

#### Fixes

- Login: add a more relevant error message when the user attempts to log in without an internet connection.

### @axelor/aos-mobile-stock

#### Fixes

- SupplierArrival: resolve tracking number creation issues

## [7.2.37] (2025-07-31)

### @axelor/aos-mobile-ui

#### Fixes

- AutoCompleteSearch: declench api call when user focus input
- Increment: unformat value before processing end input to resolve outside click issue

## [7.2.36] (2025-07-24)

### @axelor/aos-mobile-core

#### Fixes

- Object fields: manage deep merging to simplify fields addition in override

### @axelor/aos-mobile-ui

#### Fixes

- Increment: apply outside click behavior only when input was focused

### @axelor/aos-mobile-stock

#### Fixes

- StockMoveLine: improve sorting management with sequence field

## [7.2.35] (2025-07-17)

### @axelor/aos-mobile-ui

#### Fixes

- HtmlInput: add blur on click outside management

### @axelor/aos-mobile-stock

#### Fixes

- StockMove: modify note titles to match with AOS
- InternalMoveLine: make stock move notes readonly

## [7.2.34] (2025-07-03)

### @axelor/aos-mobile-ui

#### Fixes

- AutoCompleteSearch: improve process to let objectList refresh before processing last item

### @axelor/aos-mobile-crm

#### Fixes

- Event planning: use the right title to the type picker

### @axelor/aos-mobile-stock

#### Fixes

- SearchLineContainer: add message when no data provided

## [7.2.33] (2025-06-05)

Resolve issue on connection to Axelor test instances on iOS devices

## [7.2.32] (2025-05-21)

### @axelor/aos-mobile-core

#### Fixes

- Map widget: automatically filled address when clicking on widget

### @axelor/aos-mobile-stock

#### Fixes

- Inventory line: resolve navigation issue after validation

## [7.2.31] (2025-04-30)

### @axelor/aos-mobile-core

#### Fixes

- Upload tool: remove illegal characters from filename before processing

### @axelor/aos-mobile-manufacturing

#### Fixes

- prodProductSlice: use the correct product API import

## [7.2.30] (2025-04-16)

### @axelor/aos-mobile-ui

#### Changes

- Increment: facilitate edition by making whole input clickable

## [7.2.29] (2025-04-10)

### @axelor/aos-mobile-core

#### Changes

- Compatibility: improve error messages in drawer with more details

#### Fixes

- Scanner: always add listener on intents to resolve profile creation

### @axelor/aos-mobile-hr

#### Fixes

- Config: add null checks to avoid crash

### @axelor/aos-mobile-stock

#### Fixes

- Config: add null checks to avoid crash

## [7.2.28] (2025-03-25)

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

### @axelor/aos-mobile-stock

#### Fixes

- Line update: improve navigation after update to match user history
- Line card: add more line to fixed issue with too long title

## [7.2.27] (2025-03-13)

### @axelor/aos-mobile-core

#### Features

- Traceback: add current request path

### @axelor/aos-mobile-ui

#### Fixes

- ProgressBar: hide progress when value is 0

## [7.2.26] (2025-02-12)

### @axelor/aos-mobile-core

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

## [7.2.25] (2025-01-30)

### @axelor/aos-mobile-core

#### Changes

- Navigator: unmount Drawer on blur
- Login: improve token retrieval with a regex
- Login: split code into small tools to make it resusable in other packages

#### Fixes

- Login: add exports of functions and tools
- Auth: add call to logout endpoint to unvalidate tokens

### @axelor/aos-mobile-ui

#### Fixes

- Increment: remove refresh issue due to undefined props
- Label: ensure that the text takes up all the available space

### @axelor/aos-mobile-stock

#### Fixes

- API: add missing exports of api & slice functions
- UserScreen: modify export
- API: add missing sort key on search functions

## [7.2.24] (2024-12-19)

### @axelor/aos-mobile-crm

#### Fixes

- Opportunity form: make contact and partner fields mutually dependent

### @axelor/aos-mobile-stock

#### Fixes

- Inventory line: correct creation process

## [7.2.23] (2024-12-05)

### @axelor/aos-mobile-core

#### Changes

- Session card: add possibility to override session removal action

### @axelor/aos-mobile-ui

#### Changes

- Increment: modify format management on blur/focus

#### Fixes

- AutoCompleteSearch: manage margin bottom when the list is empty
- Increment: save when click outside the input

### @axelor/aos-mobile-stock

#### Changes

- Indicators: move logic to fetch available stock to card components

<details>
There was a performance problem on the screens requiring the product indicators. To solve this slow performance problem, product indicators are now retrieved from the card component in the background. The old way of working retrieved the indicators for all the products in the list each time they were updated, before displaying them, which is rather cumbersome and shouldn't be used. The functions concerned have been removed. 
</details>

## [7.2.22] (2024-11-26)

### @axelor/aos-mobile-core

#### Fixes

- SessionInputs: manage session refresh in unique mode
- Modules: improved search to remove the 40-response limit

### @axelor/aos-mobile-ui

#### Features

- Numerical inputs: add auto-select on focus

## [7.2.21] (2024-11-19)

### @axelor/aos-mobile-ui

#### Fixes

- Increment: improve management of spacers on blur

### @axelor/aos-mobile-hr

#### Fixes

- Reducers: add missing exports

## [7.2.20] (2024-11-07)

### @axelor/aos-mobile-core

#### Fixes

- Sessions: add export to use components in other packages

### @axelor/aos-mobile-ui

#### Fixes

- Screen: hide native navigation bar when keyboard disappears

### @axelor/aos-mobile-hr

#### Fixes

- Expense line: solve number of hooks issue on form

## [7.2.19] (2024-10-29)

### @axelor/aos-mobile-core

#### Fixes

- Camera Barcode scanning: add hooks exports to manage activation manually

## [7.2.18] (2024-10-23)

### @axelor/aos-mobile-core

#### Fixes

- Barcode scanning: add hooks exports to manage activation manually

### @axelor/aos-mobile-ui

#### Fixes

- Screen: prevent fixedItems from being cut
- HtmlInput: resolve issue with keyboard closing right after opening when clicking on the input on iOS

### @axelor/aos-mobile-stock

#### Fixes

- Stock correction: add possibility to fill in tracking number when needed

## [7.2.17] (2024-10-03)

### @axelor/aos-mobile-ui

#### Fixes

- Stopwatch: manage button visibility when formatted duration is too large

## [7.2.16] (2024-09-12)

### @axelor/aos-mobile-core

#### Features

- PlanningView: add month change information to scrollable view

#### Fixes

- PlanningView: manage data deletion in calendar items helper
- PlanningView: add translations to month and day names
- Mail messages: remove infinite loading

### @axelor/aos-mobile-ui

#### Features

- ChipSelect: enable readonly mode on component

#### Changes

- ProgressBar: when progress is small, display bar with a minimum width

#### Fixes

- MultiValuePicker: apply max width on text item

## [7.2.15] (2024-08-09)

### @axelor/aos-mobile-core

#### Features

- Action api provider: add onEnd action as argument of synchronize function

### @axelor/aos-mobile-ui

#### Features

- Search bar: add a more results indicator on selection container

### @axelor/aos-mobile-crm

#### Fixes

- Details screens: manage scroll style for small screens

### @axelor/aos-mobile-stock

#### Features

- Supplier arrival: add possibility to register a tracking number when the line is incomplete.
- TrackingNumber: add possibility to search on origin field

#### Fixes

- Product details: add activity indicator when product is null to avoid errors

## [7.2.14] (2024-07-11)

### @axelor/aos-mobile-ui

#### Fixes

- LabelText: align items to avoid flex display issue

### @axelor/aos-mobile-hr

#### Fixes

- Expense line: empty the list when opening the selection mode from header action
- Form: add null check on mobileSettings in conditions

### @axelor/aos-mobile-manufacturing

#### Fixes

- Consumed products: change status translations

<details>
'Planned' status has been changed to 'To pick' and 'Finished' status to 'Consumed' to make it more clear and consistent with associated StokMove
</details>

### @axelor/aos-mobile-stock

#### Fixes

- Product stock details: adjust margin of see distribution button for small screens

## [7.2.13] (2024-06-28)

### @axelor/aos-mobile-core

#### Fixes

- ScannerAutocompleteSearch: clear value after scan to avoid refresh issue
- Header: cut long title on small screens

### @axelor/aos-mobile-ui

#### Fixes

- MultiValuePicker: allow boolean as item value
- ProgressBar: only display the percentage when progress is low to avoid visual issues
- LabelText: allow value field to be on multiple lines in all containers

### @axelor/aos-mobile-manufacturing

#### Fixes

- Operation order: add scroll on details screen

## [7.2.12] (2024-06-14)

### @axelor/aos-mobile-core

#### Fixes

- HeaderBandList: prevent component to render in status bar on iOS

### @axelor/aos-mobile-ui

#### Fixes

- HtmlInput: long words break when reach the end of the component
- HtmlInput: refresh component when default input data change
- MultiValuePicker: manage display of picker smaller than screen width

### @axelor/aos-mobile-hr

#### Fixes

- Expense lines list screen: solve infinite loading after updating/deleting an expense line

### @axelor/aos-mobile-crm

#### Fixes

- Address spelling: added a “d” where one is missing

### @axelor/aos-mobile-stock

#### Fixes

- Address spelling: added a “d” where one is missing

## [7.2.11] (2024-05-23)

### @axelor/aos-mobile-core

#### Fixes

- FormView: fix an error occuring when emptying date input

### @axelor/aos-mobile-ui

#### Fixes

- Increment: reset input correctly when user erase content
- KeyboardAvoidingScrollView: hide keyboard when click outside of inputs

### @axelor/aos-mobile-hr

#### Changes

- Expense line: add possibility to manage custom upload action

### @axelor/aos-mobile-manufacturing

#### Fixes

- Manufacturing order: prevent display of empty badge when priority doesn't exist
- Consumed products: prevent infinite loading on list screen
- Operation order: disable stop button when timer is paused

## [7.2.10] (2024-05-03)

### @axelor/aos-mobile-core

#### Fixes

- PasswordInput: reverse password icon order

### @axelor/aos-mobile-ui

#### Fixes

- Picker: add indicator when no data
- RadioSelect: add readonly parameter with default value to false
- Switch: add readonly parameter with default value to false

### @axelor/aos-mobile-hr

#### Fixes

- Expense line form: add missing readonly & required parameters on components
- Config: access mobile settings from store

### @axelor/aos-mobile-crm

#### Fixes

- Opportunity details screen: modify the width of the informations dropdown

### @axelor/aos-mobile-stock

#### Fixes

- Supplier arrival: adjust style of supplier catalog
- Customer Delivery: restore navigation on search lines view
- Config: access mobile settings from store

## [7.2.9] (2024-04-24)

### @axelor/aos-mobile-core

#### Fixes

- Drawer: display of the menu list

## [7.2.8] (2024-04-19)

### @axelor/aos-mobile-core

#### Fixes

- Menu: consider user roles and user group roles to check access
- SearchBars: avoid error when no onChange function is provided
- Form inputs: remove space on top when there is no title
- Drawer: add scroll on modules and menus list
- Header: compute height to fill in the ui config value

### @axelor/aos-mobile-ui

#### Features

- LabelText: add the possibility to define text size

#### Fixes

- SearchBars: avoid error when no onChange function is provided
- DropdownCard: make the width adjustable to the content
- Form inputs: remove space on top when there is no title

### @axelor/aos-mobile-crm

#### Fixes

- Event: form view take a long time to load

### @axelor/aos-mobile-stock

#### Fixes

- Line views: add default header actions (attached files, tracker and custom fields)

## [7.2.7] (2024-03-13)

### @axelor/aos-mobile-core

#### Fixes

- Login screen: improve display.
- FormView: refresh issue when no default value is given
- Studio form view: remove display of items preview on search bars

### @axelor/aos-mobile-hr

#### Fixes

- ExpenseLine: use request to recompute totals on update
- Reducers: follow naming convention to avoid conflict.

### @axelor/aos-mobile-helpdesk

#### Fixes

- List screens: avoid page loading when search is active
- Reducers: follow naming convention to avoid conflict.

### @axelor/aos-mobile-crm

#### Fixes

- List screens: avoid page loading when search is active

### @axelor/aos-mobile-stock

#### Fixes

- Product details: hide units if product is not sellable or purchasable

## [7.2.6] (2024-02-19)

### @axelor/aos-mobile-hr

#### Fixes

- Expense details: line type logic was inverted on ToggleSwitch

## [7.2.5] (2024-02-16)

### @axelor/aos-mobile-hr

#### Fixes

The module has been completely analyzed to correct loading errors due to duplicated attributes.

### @axelor/aos-mobile-helpdesk

#### Fixes

The module has been completely analyzed to correct loading errors due to duplicated attributes.

- Ticket: add reset button on creation form

### @axelor/aos-mobile-crm

#### Fixes

The module has been completely analyzed to correct loading errors due to duplicated attributes.

- Event card: improve style to avoid display issue

### @axelor/aos-mobile-manufacturing

#### Fixes

The module has been completely analyzed to correct loading errors due to duplicated attributes.

### @axelor/aos-mobile-stock

#### Fixes

The module has been completely analyzed to correct loading errors due to duplicated attributes.

### @axelor/aos-mobile-core

#### Fixes

- Drawer: issue on menu web configs management
- From provider: keep list of callbacks for refresh to avoid issue when multiples uses of hook
- Header action provider: keep list of callbacks for refresh to avoid issue when multiples uses of hook
- Connection header: use refs for intervals to avoid duplication
- FormView: display issue on field error message
- MailMessageView: avoid keyboard display issue on Android

### @axelor/aos-mobile-ui

#### Features

- Alert: add buttonsContainerStyle props

#### Fixes

- Picker: make labelField prop not required
- HtmlInput: add text color as default icons color to avoid theme issues

## [7.2.4] (2024-01-09)

This version features a new apk management system, with build types that differentiate between apks available on Github and applications published on the store.

### @axelor/aos-mobile-hr

#### Features

- Expense : improve expense line types display on details view

### @axelor/aos-mobile-helpdesk

#### Fixes

- DurationFormInput : fix NPE on null value
- Separate store attributes on ticket list screen to avoid refresh issue

### @axelor/aos-mobile-crm

#### Fixes

- Prevent dispatch on undefined values

### @axelor/aos-mobile-manufacturing

#### Fixes

- Consumed products: refresh issue on tracking numebr update
- Manufacturing orders : check manageWorkshop config before filtering on user default stock location

### @axelor/aos-mobile-stock

#### Features

- StockCorrection : improve buttons display

#### Removed

- Remove unused component CarrierCard

### @axelor/aos-mobile-ui

#### Fixes

- AutoCompleteSearch : make input readonly when an item is selected
- ScrollList : avoid page reset when more is loading

#### Features

- ToggleSwitch : improve style to match uses

### @axelor/aos-mobile-core

#### Fixes

- Permissions : block access to the application if user cannot be fetched

## [7.2.3] (2023-12-15)

### @axelor/aos-mobile-hr

#### Features

- ExpenseLine : add new header action to toggle selection mode
- Expense: add possibility to delete a line from a draft expense
- Expense: add possibility to create a new line from a draft expense

#### Fixes

- KilometricAllowParamSearchBar : refresh issue
- Expense : reverse order of list view

### @axelor/aos-mobile-manufacturing

#### Fixes

- improve display of ManufacturingOrderCard and OperationOrderCard

### @axelor/aos-mobile-stock

#### Fixes

- Inventory : refresh issue on api error
- Inventory : update list after inventory update
- Inventory : update line list after line update
- StockCorrection : error message when going on menu entry with incorrect status value.

### @axelor/aos-mobile-ui

#### Features

- add new component ToggleButton

#### Fixes

- Storybook : improve components stories with icon display
- Outside click : concurrency issue
- ScrollList : reset page number when list is loading
- SelectionContainer : display issue when label is null

### @axelor/aos-mobile-core

#### Features

- Header actions: add customComponent prop
- Form : manage js formula of studio fields

#### Fixes

- Session : invalid url error appears when typing
- Session : hide close pop-up icon when user is logining

## [7.2.2] (2023-12-01)

### @axelor/aos-mobile-hr

#### Features

- ExpenseLine :
  - improve sorting on list view (by descending dates)
  - add cities and distance on kilometric cards
  -
- Expense :
  - hide mode toggle when user is not a manager
  - add label for groundForRefusal on details view
  - add icon on send button on details view

#### Fixes

- KilometricAllowParamSearchBar : refresh issue
- Add missing exports
- Refresh issue on expense line list after update
- DistanceInput : refresh issue

### @axelor/aos-mobile-helpdesk

#### Fixes

- Select by default hight priorities tickets

### @axelor/aos-mobile-manufacturing

#### Fixes

- PlanningView : NPE when clicking on OperationOrderCard

### @axelor/aos-mobile-ui

This version adds new unit test for ui components.

#### Features

- Add new component DoubleIcon
- Utils : add string helper to capitalize first letter

#### Fixes

- Storybook : manage FontAwesome icons
- AutoCompleteSearch : SelectionContainer display issue
- ObjectCard : manage hideIf props even with customComponent

### @axelor/aos-mobile-core

#### Fixes

- Session : invalid url error stay on all pop-up even on saved sessions
- Calendar : today date color display

## [7.2.1] (2023-11-17)

### @axelor/aos-mobile-stock

#### Changes

- Adapt screens to low resolution to match Zebra devices

#### Fixes

- ProductStockLocationCard : remove arrow as card is not clickable

### @axelor/aos-mobile-core

#### Fixes

- Set version of react-native-date-picker to 4.2.14 to fix iOS build
- FormView : manage zIndex issue on iOS and manage flexDirection in collapsible panel

#### Changes

- FormView : rename isCollaspible prop in Panel to isCollapsible

### @axelor/aos-mobile-ui

This version adds new unit test for ui components.

#### Fixes

- Increment : fix type error

## [7.2.0] (2023-11-10)

This version adds the management of the technical documentation. All the documentation is available in the docs folcer at the project root and will be updated with each technical change. The documentation can be found [here](https://docs.axelor.com/) for more details.

### New package : @axelor/aos-mobile-hr

This package is compatible with AOS Human ressources module from version 7.2.0
It enables user to manage Expenses through the mobile application. You can create general expense with a justification or kilometric expense and then links a number of expenses to a existing or new expense report. You can also send, validate or refuse expense reports.

### @axelor/aos-mobile-helpdesk

#### Features

- Add pull to refresh management on all screens

#### Changes

- Simplify card with ObjectCard component
- Simplify form view with generator
- UserSearchBar has been moved to core package

### @axelor/aos-mobile-crm

#### Features

- Display partner fields on PlanningEventCard
- Add header action to save person on user's phone on all details views
- Add pull to refresh management on all screens
- Contact : Add linked clients/prospects on details view
- Prospect/Client : display last opportunity
- Add links to Google and LinkedIn on details views
- Add management of creation and edition of events

#### Changes

- Simplify card with ObjectCard component
- Simplify form views with generator

### @axelor/aos-mobile-manufacturing

#### Features

- Apply digit management with useDigitFormat
- Add dates on MO cards and details view
- Add pull to refresh management on all screens
- Add planned durations on operation order details

#### Changes

- Simplify card with ObjectCard component

### @axelor/aos-mobile-stock

#### Features

- StockCorrection : add comment field
- Apply digit management with useDigitFormat

#### Changes

- Simplify card with ObjectCard component

### @axelor/aos-mobile-core

#### Features

- Add form generator system
- Add management of custom fields created with AOS Studio with the FormView
- Add pull to refresh on user screen
- Add fields parser middleware to avoid dotted fields
- Improvement object fields management to avoid dotted fields
- Add AnomalyBubble and AnomalyList components for check management
- Add useIsFocused hook
- Add UserSearchBar component

### @axelor/aos-mobile-ui

#### Features

- Button : improve design and add icon management
- Add new component Alert
- CircleButton : improve design and add management of square buttons

#### Changes

- Remove IconButton component which should be replaced by Button component.
- Remove Pop-up components which should be replaced by Alert component.

[7.2.39]: https://github.com/axelor/axelor-mobile/compare/7.2.38...7.2.39
[7.2.38]: https://github.com/axelor/axelor-mobile/compare/7.2.37...7.2.38
[7.2.37]: https://github.com/axelor/axelor-mobile/compare/7.2.36...7.2.37
[7.2.36]: https://github.com/axelor/axelor-mobile/compare/7.2.35...7.2.36
[7.2.35]: https://github.com/axelor/axelor-mobile/compare/7.2.34...7.2.35
[7.2.34]: https://github.com/axelor/axelor-mobile/compare/7.2.33...7.2.34
[7.2.32]: https://github.com/axelor/axelor-mobile/compare/7.2.31...7.2.32
[7.2.31]: https://github.com/axelor/axelor-mobile/compare/7.2.30...7.2.31
[7.2.30]: https://github.com/axelor/axelor-mobile/compare/7.2.29...7.2.30
[7.2.29]: https://github.com/axelor/axelor-mobile/compare/7.2.28...7.2.29
[7.2.28]: https://github.com/axelor/axelor-mobile/compare/7.2.27...7.2.28
[7.2.27]: https://github.com/axelor/axelor-mobile/compare/7.2.26...7.2.27
[7.2.26]: https://github.com/axelor/axelor-mobile/compare/7.2.25...7.2.26
[7.2.25]: https://github.com/axelor/axelor-mobile/compare/7.2.24...7.2.25
[7.2.24]: https://github.com/axelor/axelor-mobile/compare/7.2.23...7.2.24
[7.2.23]: https://github.com/axelor/axelor-mobile/compare/7.2.22...7.2.23
[7.2.22]: https://github.com/axelor/axelor-mobile/compare/7.2.21...7.2.22
[7.2.21]: https://github.com/axelor/axelor-mobile/compare/7.2.20...7.2.21
[7.2.20]: https://github.com/axelor/axelor-mobile/compare/7.2.19...7.2.20
[7.2.19]: https://github.com/axelor/axelor-mobile/compare/7.2.18...7.2.19
[7.2.18]: https://github.com/axelor/axelor-mobile/compare/7.2.17...7.2.18
[7.2.17]: https://github.com/axelor/axelor-mobile/compare/7.2.16...7.2.17
[7.2.16]: https://github.com/axelor/axelor-mobile/compare/7.2.15...7.2.16
[7.2.15]: https://github.com/axelor/axelor-mobile/compare/7.2.14...7.2.15
[7.2.14]: https://github.com/axelor/axelor-mobile/compare/7.2.13...7.2.14
[7.2.13]: https://github.com/axelor/axelor-mobile/compare/7.2.12...7.2.13
[7.2.12]: https://github.com/axelor/axelor-mobile/compare/7.2.11...7.2.12
[7.2.11]: https://github.com/axelor/axelor-mobile/compare/7.2.10...7.2.11
[7.2.10]: https://github.com/axelor/axelor-mobile/compare/7.2.9...7.2.10
[7.2.9]: https://github.com/axelor/axelor-mobile/compare/7.2.8...7.2.9
[7.2.8]: https://github.com/axelor/axelor-mobile/compare/7.2.7...7.2.8
[7.2.7]: https://github.com/axelor/axelor-mobile/compare/7.2.6...7.2.7
[7.2.6]: https://github.com/axelor/axelor-mobile/compare/7.2.5...7.2.6
[7.2.5]: https://github.com/axelor/axelor-mobile/compare/7.2.4...7.2.5
[7.2.4]: https://github.com/axelor/axelor-mobile/compare/7.2.3...7.2.4
[7.2.3]: https://github.com/axelor/axelor-mobile/compare/7.2.2...7.2.3
[7.2.2]: https://github.com/axelor/axelor-mobile/compare/7.2.1...7.2.2
[7.2.1]: https://github.com/axelor/axelor-mobile/compare/7.2.0...7.2.1
[7.2.0]: https://github.com/axelor/axelor-mobile/compare/7.1.2...7.2.0
