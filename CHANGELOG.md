---
title: 7.0.0
tags: Changelog
---

## [7.0.30] (2025-02-12)

### @axelor/aos-mobile-core

#### Changes

- Scanner: add Datawedge profile creation management

<details>
Based on the application name and bundle id, the Scanner component is now dynamically creating the Datawegde profile with the correct configuration. Caution, if you modified the bundle id compared to the standard application, then your action intent was also modified to match the bundle id. To correctly get this functionnality, please delete your current Datawedge profile and let the application recreate a new one with the right configutation.
</details>


## [7.0.29] (2025-01-30)

### @axelor/aos-mobile-core

#### Changes

- Navigator: unmount Drawer on blur

### @axelor/aos-mobile-ui

#### Fixes

- Increment: remove refresh issue due to undefined props
- Label: ensure that the text takes up all the available space

### @axelor/aos-mobile-stock

#### Fixes

- API: add missing exports of api & slice functions
- UserScreen: modify export
- API: add missing sort key on search functions

## [7.0.28] (2024-12-19)

### @axelor/aos-mobile-stock

#### Fixes

- Inventory line: correct creation process

## [7.0.27] (2024-12-05)

### @axelor/aos-mobile-ui

#### Changes

- Increment: modify format management on blur/focus

#### Fixes

- AutoCompleteSearch: manage margin bottom when the list is empty
- Increment: save when click outside the input

## [7.0.26] (2024-11-26)

### @axelor/aos-mobile-core

#### Fixes

- Modules: improved search to remove the 40-response limit

### @axelor/aos-mobile-ui

#### Features

- Numerical inputs: add auto-select on focus

## [7.0.25] (2024-11-19)

### @axelor/aos-mobile-ui

#### Fixes

- Increment: improve management of spacers on blur

## [7.0.24] (2024-11-07)

### @axelor/aos-mobile-ui

#### Fixes

- Screen: hide native navigation bar when keyboard disappears

## [7.0.23] (2024-10-29)

### @axelor/aos-mobile-core

#### Fixes

- Camera Barcode scanning: add hooks exports to manage activation manually

## [7.0.22] (2024-10-23)

### @axelor/aos-mobile-core

#### Fixes

- Barcode scanning: add hooks exports to manage activation manually

### @axelor/aos-mobile-ui

#### Fixes

- HtmlInput: resolve issue with keyboard closing right after opening when clicking on the input on iOS

### @axelor/aos-mobile-stock

#### Fixes

- Stock correction: add possibility to fill in tracking number when needed

## [7.0.21] (2024-10-03)

### @axelor/aos-mobile-ui

#### Fixes

- Stopwatch: manage button visibility when formatted duration is too large

## [7.0.20] (2024-09-12)

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

## [7.0.19] (2024-08-09)

### @axelor/aos-mobile-ui

#### Features

- Search bar: add a more results indicator on selection container

### @axelor/aos-mobile-stock

#### Features

- Supplier arrival: add possibility to register a tracking number when the line is incomplete.
- TrackingNumber: add possibility to search on origin field

#### Fixes

- Product details: add activity indicator when product is null to avoid errors

## [7.0.18] (2024-07-11)

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

## [7.0.17] (2024-06-28)

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

## [7.0.16] (2024-06-14)

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

## [7.0.15] (2024-05-23)

### @axelor/aos-mobile-ui

#### Fixes

- Increment: reset input correctly when user erase content
- KeyboardAvoidingScrollView: hide keyboard when click outside of inputs

### @axelor/aos-mobile-manufacturing

#### Fixes

- Manufacturing order: prevent display of empty badge when priority doesn't exist
- Consumed products: prevent infinite loading on list screen
- Operation order: disable stop button when timer is paused

## [7.0.14] (2024-05-03)

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

## [7.0.13] (2024-04-24)

### @axelor/aos-mobile-core

#### Fixes

- Drawer: display of the menu list

## [7.0.12] (2024-04-19)

### @axelor/aos-mobile-core

#### Fixes

- SearchBars: avoid error when no onChange function is provided
- Drawer: add scroll on modules and menus list
- Header: compute height to fill in the ui config value

### @axelor/aos-mobile-ui

#### Features

- LabelText: add the possibility to define text size

#### Fixes

- SearchBars: avoid error when no onChange function is provided
- DropdownCard: make the width adjustable to the content

### @axelor/aos-mobile-crm

#### Fixes

- Event: form view take a long time to load

### @axelor/aos-mobile-stock

#### Fixes

- Line views: add default header actions (attached files, tracker and custom fields)

## [7.0.11] (2024-03-13)

### @axelor/aos-mobile-core

#### Fixes

- Login screen: improve display.

### @axelor/aos-mobile-crm

#### Fixes

- List screens: avoid page loading when search is active

### @axelor/aos-mobile-stock

#### Fixes

- Product details: hide units if product is not sellable or purchasable

## [7.0.10] (2024-02-16)

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

## [7.0.9] (2024-01-09)

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

## [7.0.8] (2023-12-15)

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

## [7.0.7] (2023-12-01)

### @axelor/aos-mobile-manufacturing

#### Fixes

- PlanningView : NPE when clicking on OperationOrderCard

### @axelor/aos-mobile-ui

#### Fixes

- Storybook : manage FontAwesome icons
- AutoCompleteSearch : SelectionContainer display issue

### @axelor/aos-mobile-core

#### Fixes

- Session : invalid url error stay on all pop-up even on saved sessions
- Calendar : today date color display

## [7.0.6] (2023-11-17)

### @axelor/aos-mobile-core

#### Fixes

- Set version of react-native-date-picker to 4.2.14 to fix iOS build

## [7.0.5] (2023-11-08)

The application's global test has been corrected to make sure that the application is correctly working.

This version also correct the yarn dev command. It's now fully working and enable developpers to get immediat refresh when working on packages.

### @axelor/aos-mobile-crm

#### Fixes

- DropdownContactView : wrong display condition on address
- ProspectDropdownCards : wrong field name used for the category

### @axelor/aos-mobile-stock

#### Fixes

- StockCorrection : prevent update if there is no reason
- SmallPropertyCard : wrong alert disabled condition

### @axelor/aos-mobile-core

#### Features

- Add generic tool to display object's barcode in header actions
- UploadFileInput : add camera option on component and improve design
- Add CameraButton component to take quick picture

#### Fixes

- Error management on requests : consider AOP status -1 as error & show the right toast with error message
- Stopwatch : prevent refresh issue when app is inactive
- Sessions : improve logic with camera display
- LoginButton : modify disabled condition to manage case where sessions are disabled
- Prevent refresh issue with translations on user screen when changing language

### @axelor/aos-mobile-ui

#### Features

- ChipSelect : manage refresh on default value with prop `isRefresh`

#### Fixes

- Image : remove refresh issue
- SearchDetailsPopUp : manage too long titles display

#### Changes

- Icon : remove `disabled` props to only keep `touchable` one
- ChipSelect : simplify logic inside component

## [7.0.4] (2023-08-25)

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

## [7.0.3] (2023-07-31)

### @axelor/aos-mobile-core

#### Fixes

- Improve version management to manage cases where patch version is bigger than 9.

### @axelor/aos-mobile-ui

#### Features

- Improve Increment with new props :
  - `defaultFormatting` : disable default formatting behaviour
  - `stepSize` : define step when using plus and minus buttons
  - `minValue` : minimum value of input value
  - `maxValue` : maximum value of input value
  - `isBigButton` : display bigger plus and minus buttons
- Spread new Increment props on FormIncrementInput
- ObjectCard : enable to define custom components

#### Fixes

- AutoCompleteSearch :
  - display issue after clicking outside of input
  - input issue on details popup with default value
- Improve refresh with default value on form components

### @axelor/aos-mobile-crm

#### Fixes

- Align form components

## [7.0.2] (2023-07-10)

### @axelor/aos-mobile-core

#### Features

- Manage compatibility with AOS modules with new configuration in module export
- Add image helpers to get source with AOS objects

#### Fixes

- Drawer toggle race condition issue (upgrade react-navigation packages)
- Upgrade nx package to fix issue with Nodejs version
- Use default text color on session creation button

### @axelor/aos-mobile-ui

#### Features

- Add BlockInteractionMessage component
- Add new component ObjectCard to standardize cards creation

### @axelor/aos-mobile-stock

#### Fixes

- Add default filter with user active location on product stock view
- Improve fields visibility on internal move creation
- Scroll issue on internal move creation screen

### @axelor/aos-mobile-crm

#### Fixes

- Check for NPE and null string conditions

## [7.0.1] (2023-06-19)

### @axelor/aos-mobile-core

#### Features

- New helpers to manage states of infinite scroll
- Add minimal required version check, new configurations :
  - versionCheckConfig.activate : activate or not minimal version check
  - versionCheckConfig.android : update link (default value is Google Play Store)
  - versionCheckConfig.ios : update link (default value is App Store)
- Manage translated values fetched from AOS
- Add upload tool

#### Fixes

- Add meaningful message for camera permission on iOS

### @axelor/aos-mobile-ui

#### Features

- Add ProgressBar component

#### Fixes

- Format issue on increment
- Refresh issue on ScrollList when using local filters

### @axelor/aos-mobile-stock

#### Fixes

- Only send conformity if not null on supplier arrival line update
- Clear SearchBar after scan on line search component
- Internal move & customer delivery : filter available products on line creation
- StockMove : ignore isRealQtyModifiedByUser on realized moves

#### Changes

- Implementation of new slice helper from Core package

### @axelor/aos-mobile-manufacturing

#### Fixes

- Consumed products : manage no tracking number configured

#### Changes

- Implementation of new slice helper from Core package

### @axelor/aos-mobile-crm

#### Fixes

- Issues with components on form views
- Add AppCrm API path to RouterProvider to manage AOSv7

#### Changes

- Implementation of new slice helper from Core package

## [7.0.0] (2023-05-17)

### General

New major version on the mobile application to follow update of [Axelor Open Suite](https://github.com/axelor/axelor-open-suite) to version 7.0.x.

This version can be used with AOS v6.4.x or v6.5.x by enabling the configuration `retrocompatibilityAOS6` in the application configuration file.

A few dependencies updated:

- Node.js v16.x
- Nx v14.8.3

This version also add iOS support ! :confetti_ball:

The project architecture has also been updated, the example folder has been exploded to make project more readable. Now, android, ios and source folders are directly at project root. The application configuration file is now located in the `src` folder.

### @axelor/aos-mobile-core

#### Features

- Connection session management system
    <Details>
    New login screen design with session logic. You can now create a session on your first visit to the application and then simply fill in the password to login. You can also manage a list of sessions. This system can be disabled by the enableConnectionSessions configuration in the app.config.js file which will restore the old login screen and save the last session as the default session.
    </Details>
- News in the application configuration file:
  - `themeColorsConfig`: simplify customization of main color theme by modifying the relevant colors
  - `writingStylesConfig`: simplify customization of main writing theme by modifying the relevant styles
  - `showModulesSubtitle`: define default value for drawer subtitles config
  - `logoFile`: define custom logo for login screen by giving new image
  - `retrocompatibilityAOS6`: define with which version of AOS the mobile application should be compatible with (`false` for AOS v7.X only or `true` for AOS v6.X and v7.0.x)
  - `allowInternetConnectionBlock`: enable or not user to block internet connection
- Add props disableIf on header actions
- Improve API providers with new actions
- New props useObjectStatus on StopWatch to wait for object update to change timer status
- Enable user to activate or not drawer subtitles in settings screen
- Header band:
  - Add list of dynamic header bands system
  - Add header band when user is on test environment
  - Add header band when internet connection is disabled
- Improve PlanningView with return to day and navigate between weeks buttons
- Test if url is valid on end input on login screen

### @axelor/aos-mobile-ui

#### Features

- Creation of the **Storybook** ! :confetti_ball:
- Add detailed list pop up on search icon press on SearchBar
- New props _horizontal_ on ScrollList to know component orientation
- Improve MultiValuePicker with object color information

#### Changes

- Remove HeaderIndicator component: replaced by HeaderBandContext in core package

### @axelor/aos-mobile-stock

#### Features

- Add scan to search line on stock screens
- Manage partially done lines on stock moves
- Use new stock config of Axelor Mobile Settings only available from AOS v7.0.0 : line verification, line addition and object validation

#### Changes

- Improve ergonomy of internal move and stock correction creation screens
- Add search bar details pop up on screens: add empowered searchBar for objects

### @axelor/aos-mobile-manufacturing

#### Changes

- Add search bar details pop up on screens: add empowered searchBar for objects

### @axelor/aos-mobile-crm

#### Changes

- Replace ChipSelect by MultiValuePicker on list screens
- Add search bar details pop up on screens: add empowered searchBar for objects

[7.0.30]: https://github.com/axelor/axelor-mobile/compare/7.0.29...7.0.30
[7.0.29]: https://github.com/axelor/axelor-mobile/compare/7.0.28...7.0.29
[7.0.28]: https://github.com/axelor/axelor-mobile/compare/7.0.27...7.0.28
[7.0.27]: https://github.com/axelor/axelor-mobile/compare/7.0.26...7.0.27
[7.0.26]: https://github.com/axelor/axelor-mobile/compare/7.0.25...7.0.26
[7.0.25]: https://github.com/axelor/axelor-mobile/compare/7.0.24...7.0.25
[7.0.24]: https://github.com/axelor/axelor-mobile/compare/7.0.23...7.0.24
[7.0.23]: https://github.com/axelor/axelor-mobile/compare/7.0.22...7.0.23
[7.0.22]: https://github.com/axelor/axelor-mobile/compare/7.0.21...7.0.22
[7.0.21]: https://github.com/axelor/axelor-mobile/compare/7.0.20...7.0.21
[7.0.20]: https://github.com/axelor/axelor-mobile/compare/7.0.19...7.0.20
[7.0.19]: https://github.com/axelor/axelor-mobile/compare/7.0.18...7.0.19
[7.0.18]: https://github.com/axelor/axelor-mobile/compare/7.0.17...7.0.18
[7.0.17]: https://github.com/axelor/axelor-mobile/compare/7.0.16...7.0.17
[7.0.16]: https://github.com/axelor/axelor-mobile/compare/7.0.15...7.0.16
[7.0.15]: https://github.com/axelor/axelor-mobile/compare/7.0.14...7.0.15
[7.0.14]: https://github.com/axelor/axelor-mobile/compare/7.0.13...7.0.14
[7.0.13]: https://github.com/axelor/axelor-mobile/compare/7.0.12...7.0.13
[7.0.12]: https://github.com/axelor/axelor-mobile/compare/7.0.11...7.0.12
[7.0.11]: https://github.com/axelor/axelor-mobile/compare/7.0.10...7.0.11
[7.0.10]: https://github.com/axelor/axelor-mobile/compare/7.0.9...7.0.10
[7.0.9]: https://github.com/axelor/axelor-mobile/compare/7.0.8...7.0.9
[7.0.8]: https://github.com/axelor/axelor-mobile/compare/7.0.7...7.0.8
[7.0.7]: https://github.com/axelor/axelor-mobile/compare/7.0.6...7.0.7
[7.0.6]: https://github.com/axelor/axelor-mobile/compare/7.0.5...7.0.6
[7.0.5]: https://github.com/axelor/axelor-mobile/compare/7.0.4...7.0.5
[7.0.4]: https://github.com/axelor/axelor-mobile/compare/7.0.3...7.0.4
[7.0.3]: https://github.com/axelor/axelor-mobile/compare/7.0.2...7.0.3
[7.0.2]: https://github.com/axelor/axelor-mobile/compare/7.0.1...7.0.2
[7.0.1]: https://github.com/axelor/axelor-mobile/compare/7.0.0...7.0.1
[7.0.0]: https://github.com/axelor/axelor-mobile/compare/6.5.1...7.0.0
