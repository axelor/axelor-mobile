---
title: 9.1.0
tags: Changelog
---

## [9.1.4] (2026-08-21)

### @axelor/aos-mobile-core

#### Features

- Forms: place fields and panels on the 12 columns grid with their colSpan

<details>
Custom fields and custom panels configured in the studio now follow the colSpan defined on the ERP, on the same scale of 12 columns as the web: several fields share a line when their colSpan allow it, and the next one moves to a new line when the line is full. Fields and panels without any colSpan keep their current full width display, so existing forms are unchanged. The colSpan can also be set on the fields of the forms written in the applications, where it was previously only available on the panels.
</details>

#### Changes

- Custom fields form: improve display and input performances on forms with a high number of fields

<details>
The metadata of a model (field configuration, selection values, field types) is now fetched once per session and shared by every form of that model, so reopening a form no longer waits for them. Selection values are also resolved before the form is displayed, which avoids the fields being filled in a second time after the form appears.
</details>

#### Fixes

- Forms: fix the widgets which were overflowing when a field does not take the whole width
- Custom fields form: display a selection field as a picker even when it is not flagged as a selection field

### @axelor/aos-mobile-ui

#### Fixes

- Forms: fix the widgets which were overflowing when a field does not take the whole width
- Picker: improve the display and the selection when the field is narrow

<details>
On a narrow picker, the title kept its full width and pushed the icon onto the border of the button. The title now gives its space back to the icon, and displays on several lines instead of being truncated. The selection of such a field also opens in a modal rather than in a dropdown under the field, as the date input already did: the list no longer covers the neighbour fields, the options are readable in full, and the field no longer grows to make room for the list when it opens. A picker taking the whole width keeps its dropdown.
</details>

## [9.1.3] (2026-08-07)

### @axelor/aos-mobile-core

#### Fixes

- Header: hide the saved filters action on screens that do not declare it, so a form used for both creation and edition shows no generic action in creation mode

### @axelor/aos-mobile-quality

#### Fixes

- ControlEntry: sort lines by plan line priority instead of id

## [9.1.2] (2026-07-31)

### @axelor/aos-mobile-core

#### Changes

- Field parser: expose the entity version returned as $version by the API under the standard version field, on nested objects too

#### Fixes

- Custom forms: correctly evaluate display conditions using fields which have no value yet

<details>
A condition referencing a field that was still empty could not be evaluated and was considered as not verified. Empty fields are now taken into account as empty values, so a condition such as 'this field is not filled' behaves as expected on a blank form.
</details>

- Custom forms: apply the visibility conditions configured on panels

<details>
Panels configured as hidden, or with a display or hide condition, were always visible on mobile. They now follow the same visibility rules as the fields they contain.
</details>

### @axelor/aos-mobile-quality

#### Changes

- Control entry: harmonize the display of control entries and samples with the other lists of the application

#### Fixes

- ControlEntry: add missing screen config to get generic header actions on details and control filling views

### @axelor/aos-mobile-stock

#### Fixes

- Stock correction: fix the tracking number selection that prevented creating a correction

## [9.1.1] (2026-07-22)

### @axelor/aos-mobile-stock

#### Fixes

- Stock move: refresh record before realize to avoid version conflict
- Stock move lines: filter completed lines based on their status instead of quantity

## [9.1.0] (2026-06-22)

### @axelor/aos-mobile-core

#### Features

- Global tools: allow use of async function to define hideIf condition
- Scan helpers: improve activation hook to provide clear function
- SearchListView: add possibility to hide search bar
- SearchListView: add possibility to disabled scroll behavior through a simplified mode option
- SearchListView: add possibility to provide style to container
- SearchListView: add possibility to hide header container
- ModelApi: add getFields method to retrieve model field definitions
- Slice helpers: add helper to generate fetch record cases
- Panels: add dynamic hide and readonly management
- Slice helpers: add key-based sub-state support to generateInifiniteScrollCases
- Studio buttons: improve management of action call and manage state refresh
- FormView: add possibility to modify multiple values at once with onChange on custom components
- GridListView: add new redux-connected grid list view template
- Standard requests: add support for array sortKey in search helper
- Grouping middleware: automatically merge duplicated records from flattened API responses
- Files: add a configurable file provider to centralize file opening, download and preview

<details>
File actions can now go through a single file provider obtained with getFileApi()/useFileApi() instead of building meta-file URLs and passing connection data manually. A default online provider (AopFileApi) is registered out of the box, and a GatewayFileApi allows chaining several providers with automatic fallback to the first available one, laying the groundwork for offline file handling (new AppMobileOffline app config).
</details>

- User: expose the active user and active company through a user provider accessible outside React components

<details>
A userProvider singleton now keeps the active user in sync with the user store and exposes getUser() and getActiveCompany(), allowing access to the connected user and active company from non-React code. It is populated when the active user is fetched and cleared on logout.
</details>

- Module: add quick navigation option to skip inner menu and open the first accessible menu directly
- Menus: add ERP access entry to open the web ERP from the mobile application
- Custom components: add a new component CustomMultiPicker to manage multi selection
- Custom components: add more props on custom SearchBar & Picker components
- API helpers: add possiblity to provide string array instead of key to define model fields
- API helpers: add possiblity to provide string array instead of key to define search fields
- Navigation: add navigateAndReset method to remove screens from stack

#### Changes

- Files: open, download and preview files through the file provider in existing components

<details>
openFileInExternalApp and downloadFileOnPhone now take a simple file reference {id, fileName} and no longer require auth credentials, delegating to the shared file utils. Components displaying or downloading files (documents, images, attachments, upload input...) have been migrated to use fileApi.openInExternalApp / fileApi.saveToDevice, and image URIs are now resolved through the file provider.
</details>

- Connection: centralize the network connection state so the whole application shares a single source of truth

<details>
The internet connection status is now stored once and shared across the application instead of being checked independently in several places. This keeps the "No connection" banner and connection-dependent features in sync and prepares the ground for offline handling.
</details>

#### Fixes

- Custom form views: resolve relational search fields from the model and avoid failures when none are defined

<details>
Custom form view search bars now build their request through the standard search builder and only filter on search fields when they are actually defined, instead of assuming a hardcoded 'name' field. When no search field is returned for the target model, the displayed value falls back to fullName or name, preventing empty or broken search results.
</details>

### @axelor/aos-mobile-ui

#### Features

- CardIconButton: add possibility to use component without the card wrapper
- GridHeader: extract and export grid header as a standalone component
- GridView: scale columns to fill available container width
- GridView: export Column type as GridViewColumn
- GridView: improve dynamic width calculation
- GridView: add containerWidth prop to support rendering in non-fullscreen containers
- GridView: add option to hide the header row
- GridView: add custom cell renderer support on columns
- GridView: add custom header renderer support on columns
- GridView: add row press support
- GridView: add sortable column header support
- GridView: add transparent mode to render without card wrapper
- IconButton: add possibility to use component without the card wrapper
- ScrollGridView: add new paginated grid view component
- ActionSheet: add a new component to present a list of actions inside a bottom sheet
- BottomSheet: add a new bottom sheet component with drag-to-dismiss and animated backdrop
- ObjectCard: export content interfaces

#### Changes

- UnorderedList: enable nested scroll management
- UnorderedList: add scrollEnabled prop to control scroll behavior
- ViewAllContainer: make children prop optional

#### Fixes

- IconInput: improve props management by adding optionnals
- MultiValuePicker: improve style of component
- KeyboardAvoidingScrollView: allow nested scroll
- ScrollList: allow nested scroll

### @axelor/aos-mobile-maintenance

#### Features

- Maintenance requests: add planning view with machine unavailability

### @axelor/aos-mobile-dms

#### Features

- Documents: let other modules contribute their own actions to the document action sheet

<details>
Document actions (favorites, download, rename, delete...) are now exposed through a shared document actions provider, so any module can register its own actions for files and folders instead of passing them as a prop. The document card can disable all its actions at once or hide specific ones by key.
</details>

- Documents: pressing a document now opens an action sheet (open, add to favorites, download, rename, delete)

<details>
The document card no longer relies on swipe actions: pressing a document opens a contextual action sheet listing the available actions, including a new "Open" action to view the file directly. When a single action is available it is triggered immediately.
</details>

### @axelor/aos-mobile-sale

#### Features

- Product: add quick access to stock details when stock application is installed
- Client: add managed by and for display on details view

#### Changes

- Alternatives barcodes: remove double search bars in favor of simpler search param

### @axelor/aos-mobile-project

#### Features

- Project tasks: add planning menu entry

### @axelor/aos-mobile-intervention

#### Features

- Question: add swap management between questions
- Question: handle navigation to next question after validation
- Intervention: add planning menu entry

#### Changes

- Question list: simplify selected range management

### @axelor/aos-mobile-quality

#### Features

- Control entries: add quick access from operation order view

### @axelor/aos-mobile-manufacturing

#### Features

- Operation order: add hazard phrase management
- Manufacturing order: add hazard phrase management

#### Changes

- Manufacturing order: gives certain components more functionnal autonomy

<details>
ManufacturingOrderHalfLabelCardList, ManufacturingOrderSaleOrderSetView and ManufacturingOrderProductionOrderSetView no longer receive navigation callbacks as props. They now handle their own navigation and state internally via useNavigation and useSelector, reducing coupling with ManufacturingOrderDetailsScreen.
</details>

### @axelor/aos-mobile-stock

#### Features

- Customer delivery: add management of alternatives barcodes on line search
- Customer delivery: add management of simplified display mode configuration
- Customer delivery: add possibility to scan carrier tracking number on validation
- Customer delivery line: add possibility to go to next line on validation
- Internal move: add management of alternatives barcodes on line search
- Internal move: add management of simplified display mode configuration
- Inventories: add management of alternatives barcodes on line search
- Inventories: add management of simplified display mode configuration
- Supplier arrival: add management of alternatives barcodes on line search
- Supplier arrival: add management of simplified display mode configuration
- Mass picking: add management of alternatives barcodes on line/product search
- StockMove: add scan management
- StockMove: add planning menu entry
- Line navigation: add replace option to remove screens from stack on navigation

#### Changes

- Alternatives barcodes: remove double search bars in favor of simpler search param
- Customer delivery line: improve refresh management on validation

[9.1.4]: https://github.com/axelor/axelor-mobile/compare/9.1.3...9.1.4
[9.1.3]: https://github.com/axelor/axelor-mobile/compare/9.1.2...9.1.3
[9.1.2]: https://github.com/axelor/axelor-mobile/compare/9.1.1...9.1.2
[9.1.1]: https://github.com/axelor/axelor-mobile/compare/9.1.0...9.1.1
[9.1.0]: https://github.com/axelor/axelor-mobile/compare/9.0.13...9.1.0
