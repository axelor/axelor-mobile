---
title: 8.3.0
tags: Changelog
---

## [8.3.16] (2025-11-28)

### @axelor/aos-mobile-core

#### Fixes

- FormView: activate popup mode on SignatureInput component by default

<details>
Popup mode has been activate for signature type fields to avoid conflicts with scroll behavior. This value can be overriden by adding options.popup false value on the field configuration.
</details>


## [8.3.15] (2025-11-12)

### @axelor/aos-mobile-core

#### Changes

- Network check: use ERP healthcheck once user is connected

#### Fixes

- SearchListView: avoid select behavior on search when no onChange is provided

### @axelor/aos-mobile-hr

#### Fixes

- Expense selection popup: avoid style issue on iOS with picker display

## [8.3.14] (2025-11-04)

### @axelor/aos-mobile-core

#### Fixes

- FormView: improve default reset action behavior
- AOP request formatter: resolve issue when body contains an array

### @axelor/aos-mobile-manufacturing

#### Fixes

- Consumed products: use the right API function from stock module to add a tracking number
- Consumed products: resolve issue on tracking number computation when creating a new record

## [8.3.13] (2025-10-09)

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

## [8.3.12] (2025-10-02)

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

## [8.3.11] (2025-08-21)

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

## [8.3.10] (2025-07-31)

### @axelor/aos-mobile-core

#### Fixes

- Camera scanner: apply formatter which remove last character when needed like Zebra scanner

### @axelor/aos-mobile-ui

#### Fixes

- AutoCompleteSearch: declench api call when user focus input
- Increment: unformat value before processing end input to resolve outside click issue

## [8.3.9] (2025-07-24)

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

## [8.3.8] (2025-07-17)

### @axelor/aos-mobile-core

#### Fixes

- Configs: fetch only configs required for enabled apps

### @axelor/aos-mobile-ui

#### Features

- ObjectCard: add fontSize attribute on TextElement

#### Fixes

- HtmlInput: add blur on click outside management

### @axelor/aos-mobile-hr

#### Features

- Timesheet: enable deletion of a TimesheetLine linked to a TSTimer

### @axelor/aos-mobile-stock

#### Fixes

- StockMove: modify note titles to match with AOS
- InternalMoveLine: make stock move notes readonly
- StockMoveLine: improve card display with smaller title & move badge to upper

## [8.3.7] (2025-07-03)

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

## [8.3.6] (2025-06-05)

Resolve issue on connection to Axelor test instances on iOS devices

### @axelor/aos-mobile-stock

#### Features

- Stock move: add possibility to search on order reference
- Stock indicators: add external reference and line number on sale & purchase order card

#### Fixes

- Line verification: add missing product information
- Stock indicators: inverse condition on badges display on sale & purchase orders card
- Stock indicators: use sale or purchase orders estimated date when null on line object

## [8.3.5] (2025-05-21)

### @axelor/aos-mobile-core

#### Fixes

- Map widget: automatically filled address when clicking on widget

### @axelor/aos-mobile-intervention

#### Fixes

- Intervention: resolve issue when no contact provided

### @axelor/aos-mobile-stock

#### Fixes

- Inventory line: resolve navigation issue after validation

## [8.3.4] (2025-04-30)

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

## [8.3.3] (2025-04-16)

### @axelor/aos-mobile-ui

#### Changes

- Increment: facilitate edition by making whole input clickable

### @axelor/aos-mobile-project

#### Fixes

- Project task: remove field section which was deleted in the model

## [8.3.2] (2025-04-10)

### @axelor/aos-mobile-core

#### Changes

- Compatibility: improve error messages in drawer with more details

#### Fixes

- iPad: add configuration to be in full screen in portrait mode
- Download tool: remove illegal characters from filename before processing
- Scanner: always add listener on intents to resolve profile creation

### @axelor/aos-mobile-ui

#### Fixes

- ActionCard: merge style of children instead of replacing with height

### @axelor/aos-mobile-dms

#### Fixes

- Extension: apply filter on MetaFile name instead of DMSFile name

### @axelor/aos-mobile-hr

#### Fixes

- Config: add null checks to avoid crash

### @axelor/aos-mobile-stock

#### Fixes

- Inventory: use keyboard avoiding view on details screen
- Config: add null checks to avoid crash

## [8.3.1] (2025-03-25)

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

## [8.3.0] (2025-03-13)

### @axelor/aos-mobile-core

#### Features

- User active company: manage update on AOS
- Theme: add support for AOP's configurable themes
- Attached files: remove attached files feature from core package
- Virtual keyboard: replace boolean by selection ('Always', 'Hidden on scannable inputs', 'Never')
- Version control: add APK download management based on web config
- SearchTreeView: add Breadcrumb on view
- SearchTreeView: add possibility to define default value for parent filter
- SearchTreeView: add onParentChange props to get parent update
- SearchTreeView: add possibility to remove management of parent filter
- SearchListView: add possibility to define a custom component for the integrated search bar
- ActionApi: add props on send request to enable provider to ignore it
- MailMessageView: add option to filter messages between a given date and current date
- MailMessageView: add option to hide message box
- Tools: add new helper to download a file in storage
- DoubleScannerSearchBar: add new component to manage new configuration of multi barcodes

### @axelor/aos-mobile-ui

#### Features

- Theme: add support for AOP's configurable themes
- Virtual keyboard: replace boolean by selection ('Always', 'Hidden on scannable inputs', 'Never')
- ActionCard: add the possibility to define a quick action which is displayed above the button to see all the actions
- TreeView: add the possibility to define additional actions on branch
- Breadcrumb: add new component
- HorizontalRuleText: add new component to display horizontal rules with text in the center
- ChipSelect: add showClearButton prop to clear all selected chips
- TreeView: add possibility to hide branch filter quick action
- DropdownCardSwitch: add possibility to give style on each dropdown item for the card container
- EditableHtmlInput: add new component to manage html text edition

#### Changes

- TreeView: use ActionCard for branch display

### New package : @axelor/aos-mobile-dms

This package is compatible with AOS DMS module from version 8.3.0.
It enables user to manage documents through the mobile application.
This package replaced the old attached files feature with a generic header action.

### New package : @axelor/aos-mobile-purchase

This package is compatible with AOS Purchase module from version 8.3.0.
It enables user to manage internal purchase requests through the mobile application.

### @axelor/aos-mobile-sale

#### Changes

- Header actions: remove use of attachedFileScreenTitle

### @axelor/aos-mobile-project

#### Features

- Tasks: add sprint management

#### Changes

- Header actions: remove use of attachedFileScreenTitle

### @axelor/aos-mobile-intervention

#### Features

- Contact and addresses dropdown: add edition management

#### Changes

- Header actions: remove use of attachedFileScreenTitle

### @axelor/aos-mobile-hr

#### Features

This version add a new part of the HR package, user can now manage leave requests from the mobile application. Two menu entries have been added to see the leave requests and complete a new request through an assistant.

- Expense: add cancel and return to draft status actions

### @axelor/aos-mobile-helpdesk

#### Changes

- Header actions: remove use of attachedFileScreenTitle

### @axelor/aos-mobile-crm

#### Features

- Contact and addresses dropdown: add edition management
- Planning view: add possibility to create an event
- Lead: manage address through the address field
- DropdownContactView: renane 'Address' to 'Main address' on clients and prospects
- Addresses: add new dropdown to manage addresses of prospects and clients

#### Changes

- Header actions: remove use of attachedFileScreenTitle

### @axelor/aos-mobile-stock

#### Features

- Customer delivery: add button to split lines
- Inventory line: manage stock location
- Products: use new widget DoubleScannerSearchBar to manage configuration of multi barcodes

#### Changes

- Header actions: remove use of attachedFileScreenTitle

[8.3.16]: https://github.com/axelor/axelor-mobile/compare/8.3.15...8.3.16
[8.3.15]: https://github.com/axelor/axelor-mobile/compare/8.3.14...8.3.15
[8.3.14]: https://github.com/axelor/axelor-mobile/compare/8.3.13...8.3.14
[8.3.13]: https://github.com/axelor/axelor-mobile/compare/8.3.12...8.3.13
[8.3.12]: https://github.com/axelor/axelor-mobile/compare/8.3.11...8.3.12
[8.3.11]: https://github.com/axelor/axelor-mobile/compare/8.3.10...8.3.11
[8.3.10]: https://github.com/axelor/axelor-mobile/compare/8.3.9...8.3.10
[8.3.9]: https://github.com/axelor/axelor-mobile/compare/8.3.8...8.3.9
[8.3.8]: https://github.com/axelor/axelor-mobile/compare/8.3.7...8.3.8
[8.3.7]: https://github.com/axelor/axelor-mobile/compare/8.3.6...8.3.7
[8.3.6]: https://github.com/axelor/axelor-mobile/compare/8.3.5...8.3.6
[8.3.5]: https://github.com/axelor/axelor-mobile/compare/8.3.4...8.3.5
[8.3.4]: https://github.com/axelor/axelor-mobile/compare/8.3.3...8.3.4
[8.3.3]: https://github.com/axelor/axelor-mobile/compare/8.3.2...8.3.3
[8.3.2]: https://github.com/axelor/axelor-mobile/compare/8.3.1...8.3.2
[8.3.1]: https://github.com/axelor/axelor-mobile/compare/8.3.0...8.3.1
[8.3.0]: https://github.com/axelor/axelor-mobile/compare/8.2.8...8.3.0
