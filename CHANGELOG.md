---
title: 8.0.0
tags: Changelog
---

## [8.0.0] (2024-02-19)

This version of the application is no more retrocompatible by default due to some new requests. Retrocompatibility can be restored by rewritting routes' path in the configuration file.

### @axelor/aos-mobile-core

#### Features

- Add new component FocusScreen which manage refresh on navigation focus
- Add new component CustomFieldForm and refactor JsonFieldsScreen
- Add new component DateDisplay, PeriodDisplay
- Add new system to fetch required web configurations of a Module object
- Add new system to link a Dashboard menu entry to the associated configuration from the web
- Menu: entries can now be hidden due to web configurations with hideIf attribute
- Menu: add compatibility management
- Menu: add possibility to create a separator
- FormView: add possibility to get objectState from custom field components
- FormView: add possibility to have an edit/readonly mode
- MailMessageView: add filter between comments and notifications
- Toast: open pop-up with the whole message on press
- DateInput: add showPopup prop to allow popup instead of dropdown display for date selection
- PlanningView: add management of assignation filter
- Internationalization: use Localization object of user to change language
- Toast: add new type with neutral border

#### Changes

- Mobile settings configuration: use new request from AOS to get configurations based on user's roles

#### Fixes

- Router: manage new AOP exception when class is not found
- Session: manage new AOP request to test user token

### @axelor/aos-mobile-ui

This version add the management of Bootstrap icons. All components and screens of the application has been migrated to the Bootsrap librairy. Custom svg icons can also be added directly from UI package. Documentation has been updated to describe process.

This version also add a new design to match AOP improvements.

#### Features

- Add new components: GroupByScrollList, CheckboxScrollList, DurationInput
- Add new component Dashboard with three types of Charts : PieChart, BarChart & LineChart
- Add new theme to match new AOP design
- Icon: add management of Bootstrap librairy

#### Changes

- ChipSelect: improve design of component
- Icon: replace FontAwesome5 prop on component by isFontAwesome4 & isFontAwesome5, default icon librairy is now Bootstrap

### New package : @axelor/aos-mobile-quality

This package is compatible with AOS Quality module from version 8.0.0.
It enables user to manage control entries through the mobile application.

### @axelor/aos-mobile-hr

#### Features

This version add a new part of the HR package, user can now manage Timesheet from the mobile application. Three menu entries have been added to see the last active timer, all timers of user and timesheets of user.

- ExpenseLine: add possibility to change expense from the form view
- ExpenseLine: add GroupByScrollList on orphan list view to group by date
- Expense: add possibility to delete a draft expense
- Expense: add possibility to manually create an expense
- Expense: use new web configurations

#### Changes

Changes has been done to get new core and ui improvements: use of ChipSelect, color differentiation between success and primary, definition of required configs, use of icons for Bootstrap

### @axelor/aos-mobile-helpdesk

#### Features

- Ticket: manage custom status

#### Changes

Changes has been done to get new core and ui improvements: use of ChipSelect, color differentiation between success and primary, definition of required configs, use of icons for Bootstrap

- Ticket: use DurationInput instead of DurationFormInput

### @axelor/aos-mobile-crm

#### Changes

Changes has been done to get new core and ui improvements: use of ChipSelect, color differentiation between success and primary, definition of required configs, use of icons for Bootstrap

- Events: use assignation filter of PlanningView instead of custom one

### @axelor/aos-mobile-manufacturing

#### Changes

Changes has been done to get new core and ui improvements: use of ChipSelect, color differentiation between success and primary, definition of required configs, use of icons for Bootstrap

### @axelor/aos-mobile-stock

#### Features

- Default stock location: manage new configuration from web module Mobile Settings for display of SearchBar on user screen
- Internal move: improve ergonomy of creation process

#### Changes

Changes has been done to get new core and ui improvements: use of ChipSelect, color differentiation between success and primary, definition of required configs, use of icons for Bootstrap

[8.0.0]: https://github.com/axelor/axelor-mobile/compare/7.2.6...8.0.0
