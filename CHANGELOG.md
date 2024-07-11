---
title: 8.1.0
tags: Changelog
---

## [8.1.2] (2024-07-11)

### @axelor/aos-mobile-core

#### Features

- Custom form: manage Drawing widget

#### Changes

- MailMessageNotificationCard: enable display without object link

#### Fixes

- Selections: add refresh in hook function when model selections change
- Custom forms: change display behavior of date time inputs
- Custom forms: remove bottom buttons

### @axelor/aos-mobile-ui

#### Features

- Dashboard: add details on click on chart
- Picker components: add possibility to display a placeholder

#### Fixes

- LabelText: align items to avoid flex display issue
- FloatingButton: adjust action container size when title is too long

### @axelor/aos-mobile-hr

#### Fixes

- Timesheet: show project fields event when imputation mode is empty
- Expense line: empty the list when opening the selection mode from header action
- Details views: add basic header actions
- Timer: use correct status values to fetch active timer
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

## [8.1.1] (2024-06-28)

This version fixes the build for Android 14.

### @axelor/aos-mobile-core

#### Features

- SearchListView: add focus on scanner search bar by default

#### Fixes

- ScannerAutocompleteSearch: clear value after scan to avoid refresh issue
- CustomFieldForm: remove margin under component
- Header: cut long title on small screens
- SearchListView: fix typing issue
- Types: prevent errors when merging configurations between modules

### @axelor/aos-mobile-ui

#### Fixes

- MultiValuePicker: allow boolean as item value
- Timer: adjust font size depending on screen width
- ProgressBar: only display the percentage when progress is low to avoid visual issues
- LabelText: allow value field to be on multiple lines in all containers
- BottomBar: prevent the component from being cut by the bottom of the screen on iOS

### @axelor/aos-mobile-intervention

#### Fixes

- Intervention: add scroll on details view

### @axelor/aos-mobile-manufacturing

#### Fixes

- Operation order: add scroll on details screen

## [8.1.0] (2024-06-14)

This release brings a major update to the project's dependencies, including React Native, which is now at 0.71.x.

### @axelor/aos-mobile-core

#### Features

- Tools: possibility to open a list of point of interest on google maps
- Permissions: add new tools to check user permissions on objects
- FormView: check user permissions on standard and custom form views for fields and buttons
- RefreshChart: add new component to refresh single chart
- PeriodInput: new component to manage date intervals
- WebView: new component to display a web view with a basic link
- UserScreen: improve screen display
- Form: add a floating button to replace bottom actions
- add component SearchListView to simplify list view creation
- SettingsScreen: add app version at the bottom of the screen
- AOPChart: add new component to display AOP chart
- HeaderBand: add automatic scrolling on long text
- Navigation: send menu and screen informations from settings screen to webapp
- SignatureInput: add new component to enable user signature
- FormView : add new signature widget
- Selections: add new system to manage object selections with override and web config

<details>
Documentation has been updated accordingly to explain new system and tools available
</details>

- Webview: add menu entries depending on web config
- Modules: add new tool to check if package is mounted in the application
- SearchTreeView: new component to display a tree view and search through it

#### Changes

- Permissions: use new tool to check if user is admin
- UserScreen: move language and theme pickers to settings screen
- Application version: use value from authentication store
- Infinite scroll: improve management of pages to avoid useless loading

#### Fixes

- Form inputs: remove space on top when there is no title
- Login: use new AOP request to get user informations

### @axelor/aos-mobile-ui

#### Features

- IndicatorChart: add new component to display indicator chart
- Dashboard: add possibility to define chart width
- DistributionBar: add this component which divides a bar according to the number of groups given in proportion to their weight
- FloatingButton: improve display of component
- ChartRender: add new component to make switch between chart type components
- BottomBar: add new component to manage tab navigation
- NumberBubble: manage font size depending on bubble size
- InfoButton: new component to display indication on long press
- ScrollList: add possibility to put actions on top
- GridView: add new component to manage grid display
- DropdownCardSwitch: add multi selection and default visible cards
- Theme: add new colors on theme object to manage Bootstrap colors
- NotesCard: improve component style and make it expandable when content is too long
- TagList: add new component to display a list of tags
- TreeView: add new component to display tree view

#### Changes

- ScrollList: remove display of loading indicator
- TextUnit: move component from hr package to ui package

### New package : @axelor/aos-mobile-intervention

This package is compatible with AOS Intervention module from version 8.1.0.
It enables user to manage interventions and customer parc through the mobile application.

### @axelor/aos-mobile-quality

#### Features

- Control entry: enable selection of a specific sample for navigation
- Shortcut management: mark screens from module usable for user screen shortcuts

#### Changes

- Permissions: check user rights for actions display
- Selections: use new system and tools instead of type files

### @axelor/aos-mobile-hr

#### Features

- Shortcut management: mark screens from module usable for user screen shortcuts
- Expense lines: add project task on card and form view

#### Changes

- Form views: use new form improvements for actions
- TextUnit: move component from hr package to ui package
- Permissions: check user rights for actions display
- Selections: use new system and tools instead of type files

### @axelor/aos-mobile-helpdesk

#### Features

- Shortcut management: mark screens from module usable for user screen shortcuts

#### Changes

- Form views: use new form improvements for actions
- List screens: use SearchListView component and remove local filters
- Permissions: check user rights for actions display
- Selections: use new system and tools instead of type files

### @axelor/aos-mobile-crm

#### Features

- Tour: add tour menu entry
- Shortcut management: mark screens from module usable for user screen shortcuts

#### Changes

- Permissions: use new tool to check if user is admin
- Form views: use new form improvements for actions
- List screens: use SearchListView component and remove local filters
- Permissions: check user rights for actions display
- Selections: use new system and tools instead of type files

#### Fixes

- List views: remove empty onChange functions

### @axelor/aos-mobile-manufacturing

#### Features

- Shortcut management: mark screens from module usable for user screen shortcuts

#### Changes

- List screens: use SearchListView component and remove local filters
- Permissions: check user rights for actions display
- Selections: use new system and tools instead of type files

#### Fixes

- List views: remove empty onChange functions

### @axelor/aos-mobile-stock

#### Features

- Shortcut management: mark screens from module usable for user screen shortcuts

#### Changes

- List screens: use SearchListView component and remove local filters
- Permissions: check user rights for actions display
- Selections: use new system and tools instead of type files
- Product indicators: use new chart component to display quantity indicators
  [8.1.2]: https://github.com/axelor/axelor-mobile/compare/8.1.1...8.1.2
  [8.1.1]: https://github.com/axelor/axelor-mobile/compare/8.1.0...8.1.1
  [8.1.0]: https://github.com/axelor/axelor-mobile/compare/8.0.6...8.1.0
