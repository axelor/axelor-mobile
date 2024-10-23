---
title: 8.0.0
tags: Changelog
---

## [8.0.12] (2024-10-23)

### @axelor/aos-mobile-core

#### Fixes

- Barcode scanning: add hooks exports to manage activation manually

### @axelor/aos-mobile-ui

#### Fixes

- Screen: prevent fixedItems from being cut
- HtmlInput: resolve issue with keyboard closing right after opening when clicking on the input on iOS

### @axelor/aos-mobile-hr

#### Fixes

- TimesheetLine form: change product input to not required
- TimesheetLine form: hide activity field when it's not managed

### @axelor/aos-mobile-stock

#### Fixes

- Stock correction: add possibility to fill in tracking number when needed

## [8.0.11] (2024-10-03)

### @axelor/aos-mobile-ui

#### Fixes

- Stopwatch: manage button visibility when formatted duration is too large

## [8.0.10] (2024-09-12)

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

- DropdownCard: adjust border radius on content container
- MultiValuePicker: apply max width on text item

### @axelor/aos-mobile-hr

#### Fixes

- Timer: hide menu entry when timers are disabled on AOS

## [8.0.9] (2024-08-09)

### @axelor/aos-mobile-core

#### Features

- Loader: add new component for background processes and internal notifications
- Action api provider: add onEnd action as argument of synchronize function

### @axelor/aos-mobile-ui

#### Features

- Search bar: add a more results indicator on selection container

### @axelor/aos-mobile-quality

#### Changes

- API : use model and action providers

### @axelor/aos-mobile-hr

#### Changes

- API : use model and action providers

### @axelor/aos-mobile-helpdesk

#### Changes

- API : use model and action providers

### @axelor/aos-mobile-crm

#### Changes

- API : use model and action providers

#### Fixes

- Details screens: manage scroll style for small screens

### @axelor/aos-mobile-manufacturing

#### Changes

- API : use model and action providers

### @axelor/aos-mobile-stock

#### Features

- Supplier arrival: add possibility to register a tracking number when the line is incomplete.
- TrackingNumber: add possibility to search on origin field

#### Changes

- API : use model and action providers

#### Fixes

- Product details: add activity indicator when product is null to avoid errors

## [8.0.8] (2024-07-11)

### @axelor/aos-mobile-core

#### Fixes

- Custom forms: change display behavior of date time inputs

### @axelor/aos-mobile-ui

#### Fixes

- LabelText: align items to avoid flex display issue

### @axelor/aos-mobile-hr

#### Fixes

- Timesheet: show project fields event when imputation mode is empty
- Expense line: empty the list when opening the selection mode from header action
- Details views: add basic header actions
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

## [8.0.7] (2024-06-28)

### @axelor/aos-mobile-core

#### Fixes

- ScannerAutocompleteSearch: clear value after scan to avoid refresh issue
- CustomFieldForm: remove margin under component
- Header: cut long title on small screens

### @axelor/aos-mobile-ui

#### Fixes

- MultiValuePicker: allow boolean as item value
- ProgressBar: only display the percentage when progress is low to avoid visual issues
- LabelText: allow value field to be on multiple lines in all containers

### @axelor/aos-mobile-manufacturing

#### Fixes

- Operation order: add scroll on details screen

## [8.0.6] (2024-06-14)

### @axelor/aos-mobile-core

#### Fixes

- HeaderBandList: prevent component to render in status bar on iOS
- Date utils: avoid error when trying to split null date

### @axelor/aos-mobile-ui

#### Fixes

- HtmlInput: long words break when reach the end of the component
- HtmlInput: refresh component when default input data change
- MultiValuePicker: manage display of picker smaller than screen width
- CheckboxScrollList: avoid crash when selecting all values with empty list

### @axelor/aos-mobile-hr

#### Fixes

- Expense lines list screen: solve infinite loading after updating/deleting an expense line
- Timer form: format start date time to the right format before sending request
- Timer: manage config when only one timer is allowed at a time

### @axelor/aos-mobile-crm

#### Fixes

- Address spelling: added a “d” where one is missing

### @axelor/aos-mobile-stock

#### Fixes

- Address spelling: added a “d” where one is missing

## [8.0.5] (2024-05-23)

### @axelor/aos-mobile-core

#### Fixes

- Custom field form: consider value when field type does not contain attrs
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

- List views: improve chip display
- Manufacturing order: prevent display of empty badge when priority doesn't exist
- Consumed products: prevent infinite loading on list screen
- Operation order: disable stop button when timer is paused

## [8.0.4] (2024-05-03)

### @axelor/aos-mobile-core

#### Fixes

- Login: improve inputs display on small screens
- PasswordInput: reverse password icon order

### @axelor/aos-mobile-ui

#### Fixes

- Picker: add indicator when no data
- RadioSelect: add readonly parameter with default value to false
- Switch: add readonly parameter with default value to false

### @axelor/aos-mobile-hr

#### Fixes

- Expense line form: add missing readonly & required parameters on components
- Timers: correct order in list view
- Project tasks: modify filters on timesheet lines and timers

### @axelor/aos-mobile-crm

#### Fixes

- Opportunity details screen: modify the width of the informations dropdown

### @axelor/aos-mobile-stock

#### Fixes

- Supplier arrival: adjust style of supplier catalog
- Customer Delivery: restore navigation on search lines view

## [8.0.3] (2024-04-22)

### @axelor/aos-mobile-core

#### Fixes

- Drawer: display of the menu list

## [8.0.2] (2024-04-19)

### @axelor/aos-mobile-core

#### Fixes

- SearchBars: avoid error when no onChange function is provided
- Form inputs: remove space on top when there is no title
- Drawer: add scroll on modules and menus list
- Header: compute height to fill in the ui config value

### @axelor/aos-mobile-ui

#### Features

- Dashboard: add last update date information
- LabelText: add the possibility to define text size

#### Fixes

- NumberChevronInput: enable limit with more than one digit
- NumberChevronInput: format default value when it changes
- SearchBars: avoid error when no onChange function is provided
- DropdownCard: make the width adjustable to the content
- Form inputs: remove space on top when there is no title
- BootstrapIcon: define default color to avoid invisible question mark on dark mode

### @axelor/aos-mobile-hr

#### Fixes

- Form views: avoid error when user does not have an employee

### @axelor/aos-mobile-crm

#### Fixes

- Event: form view take a long time to load

### @axelor/aos-mobile-stock

#### Features

- Internal move creation: add possibility to modify quantity of a line

#### Fixes

- Line views: add default header actions (attached files, tracker and custom fields)

## [8.0.1] (2024-03-13)

This version restore the iOS build which was broken due to some changes in dependencies.

### @axelor/aos-mobile-core

#### Fixes

- Login screen: improve display.
- FormView: refresh issue when no default value is given
- Studio form view: remove display of items preview on search bars

### @axelor/aos-mobile-ui

#### Features

- Dashboard: possibility to hide background card on chart

#### Fixes

- Dashboard: rename file to allow mobile app to work on macOS

### @axelor/aos-mobile-quality

#### Fixes

- Control entry list view: change success to primary color on toggle button

### @axelor/aos-mobile-hr

#### Fixes

- Expense line: use request to recompute totals on update
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

[8.0.12]: https://github.com/axelor/axelor-mobile/compare/8.0.11...8.0.12
[8.0.11]: https://github.com/axelor/axelor-mobile/compare/8.0.10...8.0.11
[8.0.10]: https://github.com/axelor/axelor-mobile/compare/8.0.9...8.0.10
[8.0.9]: https://github.com/axelor/axelor-mobile/compare/8.0.8...8.0.9
[8.0.8]: https://github.com/axelor/axelor-mobile/compare/8.0.7...8.0.8
[8.0.7]: https://github.com/axelor/axelor-mobile/compare/8.0.6...8.0.7
[8.0.6]: https://github.com/axelor/axelor-mobile/compare/8.0.5...8.0.6
[8.0.5]: https://github.com/axelor/axelor-mobile/compare/8.0.4...8.0.5
[8.0.4]: https://github.com/axelor/axelor-mobile/compare/8.0.3...8.0.4
[8.0.3]: https://github.com/axelor/axelor-mobile/compare/8.0.2...8.0.3
[8.0.2]: https://github.com/axelor/axelor-mobile/compare/8.0.1...8.0.2
[8.0.1]: https://github.com/axelor/axelor-mobile/compare/8.0.0...8.0.1
[8.0.0]: https://github.com/axelor/axelor-mobile/compare/7.2.6...8.0.0
