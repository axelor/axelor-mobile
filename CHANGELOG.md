---
title: 7.1.0
tags: Changelog
---

## [7.1.26] (2026-02-04)

### @axelor/aos-mobile-ui

#### Features

- Picker: add possibility to have labels on multiple lines through new prop multiLineLabels

## [7.1.25] (2025-12-04)

### @axelor/aos-mobile-core

#### Features

- Date: add two new helpers (isMidnightDate & decreaseDate)
- Date: improve helpers getNextMonth & getPreviousMonth to define number of months to add/remove

#### Fixes

- Planning: improve display of multidays events to match AOP behavior

### @axelor/aos-mobile-crm

#### Fixes

- Planning: load events 2 months around the current date instead of 1

## [7.1.24] (2025-11-12)

### @axelor/aos-mobile-core

#### Changes

- Network check: use ERP healthcheck once user is connected

## [7.1.23] (2025-01-28)

### @axelor/aos-mobile-ui

#### Fixes

- Increment: remove refresh issue due to undefined props

## [7.1.22] (2025-01-09)

### @axelor/aos-mobile-core

#### Features

- Connection: add possibility to define a custom login screen

#### Changes

- Session card: add possibility to override session removal action
- Login: improve token retrieval with a regex
- Login: split code into small tools to make it resusable in other packages

#### Fixes

- Sessions: add export to use components in other packages
- Login: add exports of functions and tools
- Auth: add call to logout endpoint to unvalidate tokens

### @axelor/aos-mobile-ui

#### Features

- Numerical inputs: add auto-select on focus

#### Changes

- Increment: modify format management on blur/focus

#### Fixes

- Screen: hide native navigation bar when keyboard disappears
- AutoCompleteSearch: manage margin bottom when the list is empty
- Increment: save when click outside the input

## [7.1.21] (2024-10-29)

### @axelor/aos-mobile-core

#### Fixes

- Camera Barcode scanning: add hooks exports to manage activation manually

## [7.1.20] (2024-10-23)

### @axelor/aos-mobile-core

#### Fixes

- Barcode scanning: add hooks exports to manage activation manually

### @axelor/aos-mobile-ui

#### Fixes

- HtmlInput: resolve issue with keyboard closing right after opening when clicking on the input on iOS

### @axelor/aos-mobile-stock

#### Fixes

- Stock correction: add possibility to fill in tracking number when needed

## [7.1.19] (2024-10-03)

### @axelor/aos-mobile-ui

#### Fixes

- Stopwatch: manage button visibility when formatted duration is too large

## [7.1.18] (2024-09-12)

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

## [7.1.17] (2024-08-13)

### @axelor/aos-mobile-core

#### Features

- Navigation: add hook to know if current screen is focused by user

## [7.1.16] (2024-08-09)

### @axelor/aos-mobile-core

#### Features

- Action api provider: add onEnd action as argument of synchronize function

### @axelor/aos-mobile-ui

#### Features

- Search bar: add a more results indicator on selection container

### @axelor/aos-mobile-stock

#### Features

- Supplier arrival: add possibility to register a tracking number when the line is incomplete.
- TrackingNumber: add possibility to search on origin field

#### Fixes

- Product details: add activity indicator when product is null to avoid errors

## [7.1.15] (2024-07-11)

### @axelor/aos-mobile-ui

#### Fixes

- LabelText: align items to avoid flex display issue

### @axelor/aos-mobile-manufacturing

#### Fixes

- Consumed products: change status translations

<details>
'Planned' status has been changed to 'To pick' and 'Finished' status to 'Consumed' to make it more clear and consistent with associated StokMove
</details>

### @axelor/aos-mobile-stock

#### Fixes

- Product stock details: adjust margin of see distribution button for small screens

## [7.1.14] (2024-06-28)

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

## [7.1.13] (2024-06-14)

### @axelor/aos-mobile-core

#### Fixes

- HeaderBandList: prevent component to render in status bar on iOS

### @axelor/aos-mobile-ui

#### Fixes

- HtmlInput: long words break when reach the end of the component
- HtmlInput: refresh component when default input data change
- MultiValuePicker: manage display of picker smaller than screen width

### @axelor/aos-mobile-crm

#### Fixes

- Address spelling: added a “d” where one is missing

### @axelor/aos-mobile-stock

#### Fixes

- Address spelling: added a “d” where one is missing

## [7.1.12] (2024-05-23)

### @axelor/aos-mobile-ui

#### Fixes

- Increment: reset input correctly when user erase content
- KeyboardAvoidingScrollView: hide keyboard when click outside of inputs

### @axelor/aos-mobile-manufacturing

#### Fixes

- Manufacturing order: prevent display of empty badge when priority doesn't exist
- Consumed products: prevent infinite loading on list screen
- Operation order: disable stop button when timer is paused

## [7.1.11] (2024-05-03)

### @axelor/aos-mobile-core

#### Fixes

- PasswordInput: reverse password icon order

### @axelor/aos-mobile-ui

#### Fixes

- Picker: add indicator when no data

### @axelor/aos-mobile-hr

#### Fixes

- Config: access mobile settings from store

### @axelor/aos-mobile-crm

#### Fixes

- Opportunity details screen: modify the width of the informations dropdown

### @axelor/aos-mobile-stock

#### Fixes

- Supplier arrival: adjust style of supplier catalog
- Customer Delivery: restore navigation on search lines view
- Config: access mobile settings from store

## [7.1.10] (2024-04-24)

### @axelor/aos-mobile-core

#### Fixes

- Drawer: display of the menu list

## [7.1.9] (2024-04-19)

### @axelor/aos-mobile-core

#### Fixes

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

## [7.1.8] (2024-03-13)

### @axelor/aos-mobile-core

#### Fixes

- Login screen: improve display.

### @axelor/aos-mobile-helpdesk

#### Fixes

- List screens: avoid page loading when search is active

### @axelor/aos-mobile-crm

#### Fixes

- List screens: avoid page loading when search is active

### @axelor/aos-mobile-stock

#### Fixes

- Product details: hide units if product is not sellable or purchasable

## [7.1.7] (2024-02-16)

### @axelor/aos-mobile-crm

#### Fixes

- Event card: improve style to avoid display issue

### @axelor/aos-mobile-core

#### Fixes

- Drawer: issue on menu web configs management
- Header action provider: keep list of callbacks for refresh to avoid issue when multiples uses of hook
- Connection header: use refs for intervals to avoid duplication
- MailMessageView: avoid keyboard display issue on Android

### @axelor/aos-mobile-ui

#### Fixes

- HtmlInput: add text color as default icons color to avoid theme issues

## [7.1.6] (2024-01-09)

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

#### Removed

- Remove unused component CarrierCard

### @axelor/aos-mobile-ui

#### Fixes

- AutoCompleteSearch : make input readonly when an item is selected
- ScrollList : avoid page reset when more is loading

### @axelor/aos-mobile-core

#### Fixes

- Permissions : block access to the application if user cannot be fetched

## [7.1.5] (2023-12-15)

### @axelor/aos-mobile-stock

#### Fixes

- Inventory : refresh issue on api error
- Inventory : update list after inventory update
- Inventory : update line list after line update
- StockCorrection : error message when going on menu entry with incorrect status value.

### @axelor/aos-mobile-ui

#### Fixes

- Storybook : improve components stories with icon display
- Outside click : concurrency issue
- ScrollList : reset page number when list is loading
- SelectionContainer : display issue when label is null

### @axelor/aos-mobile-core

#### Fixes

- Session : invalid url error appears when typing
- Session : hide close pop-up icon when user is logining

## [7.1.4] (2023-12-01)

### @axelor/aos-mobile-helpdesk

#### Fixes

- Select by default hight priorities tickets

### @axelor/aos-mobile-manufacturing

#### Fixes

- PlanningView : NPE when clicking on OperationOrderCard

### @axelor/aos-mobile-ui

This version adds new unit test for ui components.

#### Features

- Utils : add string helper to capitalize first letter

#### Fixes

- Storybook : manage FontAwesome icons
- AutoCompleteSearch : SelectionContainer display issue
- ObjectCard : manage hideIf props even with customComponent

### @axelor/aos-mobile-core

#### Fixes

- Session : invalid url error stay on all pop-up even on saved sessions
- Calendar : today date color display

## [7.1.3] (2023-11-17)

### @axelor/aos-mobile-core

#### Fixes

- Set version of react-native-date-picker to 4.2.14 to fix iOS build

### @axelor/aos-mobile-ui

This version adds new unit test for ui components.

#### Fixes

- Increment : fix type error

## [7.1.2] (2023-11-10)

This version adds unit test management. The application's global test has been corrected and the components of the ui package are currently being tested.

This version also correct the yarn dev command. It's now fully working and enable developpers to get immediat refresh when working on packages.

### @axelor/aos-mobile-helpdesk

#### Fixes

- Export all content of package

#### Changes

- Create TicketStopwatch component to remove logic from details screen.

### @axelor/aos-mobile-crm

#### Fixes

- Export all content of package
- DropdownContactView : wrong display condition on address
- ProspectDropdownCards : wrong field name used for the category
- Rename company reducer to avoid issue with stock module (company -> crm_company)

### @axelor/aos-mobile-manufacturing

#### Fixes

- Export all content of package

### @axelor/aos-mobile-stock

#### Fixes

- Export all content of package
- StockCorrection : prevent update if there is no reason
- SmallPropertyCard : wrong alert disabled condition

#### Changes

- Remove save status management on internal move to match behaviour of the other screens

### @axelor/aos-mobile-core

#### Features

- Add generic tool to display object's barcode in header actions
- Add SocialNetworkLinks component to do quick research on Google/LinkedIn
- UploadFileInput : add camera option on component and improve design
- Add CameraButton component to take quick picture
- Add generic tool to create Criteria query depending on selected chips
- Add generic tool to format request body to reduce data

#### Fixes

- Error management on requests : consider AOP status -1 as error & show the right toast with error message
- Stopwatch : prevent refresh issue when app is inactive
- Sessions : improve logic with camera display
- LoginButton : modify disabled condition to manage case where sessions are disabled
- Prevent refresh issue with translations on user screen when changing language
- Delay internet connection check from 2s to 5s to avoid having to many requests

#### Changes

- create TranslationsButton component to contain translations sending logic

### @axelor/aos-mobile-ui

#### Features

- ScrollView : add props to enable pull to refresh
- Add RadioButton & RadioSelect components
- Increase writing theme font sizes
- SwitchCard : improve design to match form inputs
- ObjectCard : display title on two lines and add `leftContainerFlex` prop to manage size of text container and `iconLeftMargin` to manage space between icon and badges
- InfoBubble : add coloredBubble props to cirectly color icon instead of circle container
- Switch : add refresh on component when default value change
- ChipSelect : manage refresh on default value with prop `isRefresh`
- Picker : add displayValue props to give custom function to display value of item
- AutoCompleteSearch : add props `title`, `readonly` et `required`
- FormHtmlInput : add prop `hideIfNull` to hide component when it's readonly with no value

#### Fixes

- Image : remove refresh issue
- ObjectCard : reduce size of image replacement icon
- SearchDetailsPopUp : manage too long titles display

#### Changes

- Icon : remove `disabled` props to only keep `touchable` one
- ChipSelect : simplify logic inside component
- Picker : simplify component design & transform `disabled` props to `readonly`
- AutoCompleteSearch : simplify component design
- MultiValuePicker : simplify component design & transform `disabled` props to `readonly`
- Remove MultiSelectValue component, which should be replaced by MultiValuePicker in readonly mode
- FormHtmlInput : simplify component design

## [7.1.1] (2023-08-25)

### @axelor/aos-mobile-helpdesk

#### Fixes

- Add possibility to reset dates on Ticket form view

### @axelor/aos-mobile-core

#### Features

- Improve UploadFileInput with new props :
  - `title` : title to display above file picker
  - `defaultValue` : default file
  - `returnBase64String` : return base64 string instead on uploading Metafile (default false)
  - `required` : define if file is required (default false)
  - `readonly` : define if input should be read only (default false)
  - `documentTypesAllowed` : define allowed types of documents (values 'images', 'pdf' or 'allFiles' and default is 'allFiles')
  - `canDeleteFile` : define if file can be deleted after selection (default true)
  - `displayPreview` : define if input should diplay preview of the selected file (default false)
  - `maxSize` : define if max size for file selection (default 5Mo)
- Add possibility to send DELETE request with axiosApiProvider
- Add `required` props on DateInput component
- Add helper to get full translated date
- Add management of submenus and default menu entries
- Add contact tool to save a contact on user's phone
- Manage compatibility with AOS modules override

#### Fixes

- Type issues :
  - Translator
  - Image component props
- Refresh logic of header actions

#### Changes

- Change Android target version from 31 to 33
- Use fetch with model fields instead of get to load user informations
- Manage compatibility with AOS modules when there is only one app installed
- Improve system of sessions with new design

### @axelor/aos-mobile-ui

#### Features

- DropdownCard :
  - add props `showIcon` to define if up/down icon should be displayed
  - improve style to use standards
- Improve Increment with new props :
  - `keyboardType` : define keyboard type (default 'numeric')
  - `scale` : define scale for input value (default is base config on AOS)
- Improve FormIncrementInput with new props :
  - spread new Increment props
  - `required` : define if input is required (default false)
- Improve FormInput with new props :
  - `multiline` : define if input should allow multilines input (default false)
  - `adjustHeightWithLines` : define if input show adjust its height to content (default false)
- Improve ScrollList with new props :
  - `disabledRefresh` : disable top refresh to avoid data changes
- Enable to define InfoBubble `size` from props.
- New component Label with basic types : error, danger, info, success
- New component TabsScreen
- New component NumberBubble

#### Fixes

- DropdownCard :
  - rename props `DropdownIsOpen` to `dropdownIsOpen`
- IconButton : mark FontAwesome5 as optionnal
- Picker : fix `isValueItem` mode logic
- Checkbow :
  - style issue on value change
  - define `title` and `isDefaultChecked` as optionnal

## [7.1.0] (2023-07-31)

### New package : @axelor/aos-mobile-helpdesk

This package is compatible with AOS Helpdesk module from version 7.1.0
It enables user to seach through self-assigned tickets or team tickets and to create new ticket.

### @axelor/aos-mobile-crm

This update breaks the compatability with AOS CRM module under version 7.1 due to major changes.

#### Features

- Add possibility to create Lead and Opportunity directly from the mobile app.
- Add possibility to upload new catalog.
- Add status information on Prospect display when enabled.

#### Fixes

- Make mainPartner required on Contact form view.

### @axelor/aos-mobile-stock

This update breaks the compatability with AOS Stock module under version 7.1 due to major changes.

#### Features

- Manage StockLocation on StockMoveLine on update and creation.
- Create multiline internal StockMove directly from the application.
- Add link to product distribution screen on internal move creation.

### @axelor/aos-mobile-core

#### Features

- Manage expired sessions with deconnection

### @axelor/aos-mobile-ui

#### Features

- Add number decimal digit config management system
- Manage multilines input with auto height resize on FormInput

[7.1.26]: https://github.com/axelor/axelor-mobile/compare/7.1.25...7.1.26
[7.1.25]: https://github.com/axelor/axelor-mobile/compare/7.1.24...7.1.25
[7.1.24]: https://github.com/axelor/axelor-mobile/compare/7.1.23...7.1.24
[7.1.23]: https://github.com/axelor/axelor-mobile/compare/7.1.22...7.1.23
[7.1.22]: https://github.com/axelor/axelor-mobile/compare/7.1.21...7.1.22
[7.1.21]: https://github.com/axelor/axelor-mobile/compare/7.1.20...7.1.21
[7.1.20]: https://github.com/axelor/axelor-mobile/compare/7.1.19...7.1.20
[7.1.19]: https://github.com/axelor/axelor-mobile/compare/7.1.18...7.1.19
[7.1.18]: https://github.com/axelor/axelor-mobile/compare/7.1.17...7.1.18
[7.1.17]: https://github.com/axelor/axelor-mobile/compare/7.1.16...7.1.17
[7.1.16]: https://github.com/axelor/axelor-mobile/compare/7.1.15...7.1.16
[7.1.15]: https://github.com/axelor/axelor-mobile/compare/7.1.14...7.1.15
[7.1.14]: https://github.com/axelor/axelor-mobile/compare/7.1.13...7.1.14
[7.1.13]: https://github.com/axelor/axelor-mobile/compare/7.1.12...7.1.13
[7.1.12]: https://github.com/axelor/axelor-mobile/compare/7.1.11...7.1.12
[7.1.11]: https://github.com/axelor/axelor-mobile/compare/7.1.10...7.1.11
[7.1.10]: https://github.com/axelor/axelor-mobile/compare/7.1.9...7.1.10
[7.1.9]: https://github.com/axelor/axelor-mobile/compare/7.1.8...7.1.9
[7.1.8]: https://github.com/axelor/axelor-mobile/compare/7.1.7...7.1.8
[7.1.7]: https://github.com/axelor/axelor-mobile/compare/7.1.6...7.1.7
[7.1.6]: https://github.com/axelor/axelor-mobile/compare/7.1.5...7.1.6
[7.1.5]: https://github.com/axelor/axelor-mobile/compare/7.1.4...7.1.5
[7.1.4]: https://github.com/axelor/axelor-mobile/compare/7.1.3...7.1.4
[7.1.3]: https://github.com/axelor/axelor-mobile/compare/7.1.2...7.1.3
[7.1.2]: https://github.com/axelor/axelor-mobile/compare/7.1.1...7.1.2
[7.1.1]: https://github.com/axelor/axelor-mobile/compare/7.1.0...7.1.1
[7.1.0]: https://github.com/axelor/axelor-mobile/compare/7.0.2...7.1.0
