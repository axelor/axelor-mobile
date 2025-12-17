---
title: 8.5.0
tags: Changelog
---

## [8.5.5] (2025-12-17)

### @axelor/aos-mobile-core

#### Features

- Generic header action: provide web config to generic action handlers

#### Fixes

- Mass scanner: delay launch of fallback action to avoid display issue with camera
- Print reports: resolve close alert issue
- Header: resolve issue of hidden dropdown on additional actions

### @axelor/aos-mobile-dms

#### Fixes

- Attached files: hide action when app is disabled on web config

## [8.5.4] (2025-12-04)

### @axelor/aos-mobile-core

#### Features

- Date: add two new helpers (isMidnightDate & decreaseDate)
- Date: improve helpers getNextMonth & getPreviousMonth to define number of months to add/remove

#### Fixes

- Date formatter: allow the use of half year display
- Websocket: manage unsecure instances
- Planning: improve display of multidays events to match AOP behavior

### @axelor/aos-mobile-project

#### Fixes

- Project: resolve date issue on activities view

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

## [8.5.3] (2025-11-28)

### @axelor/aos-mobile-core

#### Fixes

- DatePicker: define color of picker text to avoid theme issue

<details>
This fix includes the addition of a new patch file inside the patchs/ folder. This patch concerns the react-native-date-picker package and is required to use this new version.
</details>

- Contact provider: resolve undefined issue on react-native-contacts package

<details>
This fix includes the addition of a new patch file inside the patchs/ folder. This patch concerns the react-native-contacts package and is required to use this new version.
</details>

- FormView: activate popup mode on SignatureInput component by default

<details>
Popup mode has been activate for signature type fields to avoid conflicts with scroll behavior. This value can be overriden by adding options.popup false value on the field configuration.
</details>


### @axelor/aos-mobile-ui

#### Changes

- Outside click: add new hook to handle logic to avoid refresh issue on dependencies

#### Fixes

- HeaderContainer: add zIndex value to avoid display issue on list views

### @axelor/aos-mobile-sale

#### Fixes

- Partner links: use the right selection values for the link type

## [8.5.2] (2025-11-13)

### @axelor/aos-mobile-core

#### Fixes

- DateInput: avoid outside click noises on selection container

### @axelor/aos-mobile-ui

#### Features

- Outside click: allow to provide an array of refs instead of only one

#### Fixes

- Input: resolve content size update behavior on iOS
- AutoCompleteSearch: avoid outside click noises on selection container
- DropdownMenu: avoid outside click noises on selection container
- MultiValuePicker: avoid outside click noises on selection container
- Picker: avoid outside click noises on selection container

## [8.5.1] (2025-11-12)

### @axelor/aos-mobile-core

#### Changes

- Network check: use ERP healthcheck once user is connected

#### Fixes

- SearchListView: avoid select behavior on search when no onChange is provided

## [8.5.0] (2025-11-04)

This release brings a major update to the project's dependencies, including React Native, which is now at 0.79.x. This version also removes the old test library Enzyme and remaining test cases have been migrated to RNTL.

### @axelor/aos-mobile-core

#### Features

- Global tools: add translator helper in tool onPress params
- Web applications: add new hook to check if an app is installed on the ERP

### @axelor/aos-mobile-ui

#### Features

- QuantityCard: add more of Increment props
- EditableHtmlInput: add title management

### New package : @axelor/aos-mobile-maintenance

This package is compatible with the AOS maintenance module from version 8.5.0. It allows users to access existing maintenance requests and create new one either from the new menu entry or from a operation order with the quick tool feature.

### @axelor/aos-mobile-sale

#### Features

- Cart: add possibility to create client before cart validation
- Clients: add possibility to create new record from list view using crm feature
- Client: add possibility to access crm event creation feature from details view
- SaleOrderLine: add available status display on card & details
- PriceDetails: add possibility to define custom components inside the card above or under the price list items
- Product: add search by scan
- SaleOrder: add possibility to fill payment mode & condition on quotation creation
- SaleOrder: add possibility to fill delivered partner on quotation creation
- SaleOrder: display payment mode and condition on details
- SaleOrder: display delivered and invoiced partners on details

### @axelor/aos-mobile-project

This version brings a major change inside the project package. Business projects part is now managed through an enterprise package. The standard application now only supports the internal projects to match changes done inside Axelor Open Suite in version 8.5.0. This includes the business project menu entry and the reporting feature.

#### Features

- Project: add check list view on details
- Project task: add check list view on details

### @axelor/aos-mobile-quality

#### Features

- Quality improvement: add attached files management on defects
- Quality improvement: add management of default qiDetection value based on config

### @axelor/aos-mobile-hr

#### Features

- Expense: manage multi-currency display
- Timer: add toolbox to start/pause user active timer

#### Changes

- Projects: remove unused mention of business projects

### @axelor/aos-mobile-crm

#### Features

- Partners: improve form view to take into account individual partners
- Partners: add creation management from the corresponding list view
- Event: add new filter on planning view for statusSelect
- Event: use statusSelect values from web selection

#### Changes

- Event: improve display of details header
- Partners: remove contact information from form view in favor of details view widget
- Partners: merge client, prospect and contact forms into a single one

### @axelor/aos-mobile-manufacturing

#### Features

- MachineSearchBar: improve component with new props
- Operation order: add consumption per phase management

### @axelor/aos-mobile-stock

#### Features

This version add a new part of the Stock package, user can now manage logistical forms from the mobile application. A new menu entries have been added to see the existing forms and complete it through an assistant.

- StockLocation: manage external stock location types
- Internal move creation: add mass scan management to pick product
- Customer delivery: add editable comment on customer delivery
- Customer delivery: add freight carrier panel
- Customer delivery line: add sale order information
- StockMoveLine: add editable description
- StockMoveLine: add total mass information on cards & details
- Mass indicator: add provider to define color & icon to display depending on total mass

<details>
Any package can provide a pattern to use to fetch mass indicator configuration.
The pattern should define a JSON Object which associate a key (for override) to a limit value, a color and/or an icon name.
The configuration should be registered using the useMassIndicatorRegister hook.
</details>

#### Changes

- StockLocationSearchBar: rename readonly prop

[8.5.5]: https://github.com/axelor/axelor-mobile/compare/8.5.4...8.5.5
[8.5.4]: https://github.com/axelor/axelor-mobile/compare/8.5.3...8.5.4
[8.5.3]: https://github.com/axelor/axelor-mobile/compare/8.5.2...8.5.3
[8.5.2]: https://github.com/axelor/axelor-mobile/compare/8.5.1...8.5.2
[8.5.1]: https://github.com/axelor/axelor-mobile/compare/8.5.0...8.5.1
[8.5.0]: https://github.com/axelor/axelor-mobile/compare/8.4.7...8.5.0
