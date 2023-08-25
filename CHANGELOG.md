---
title: 7.1.0
tags: Changelog
---

## [7.1.1] (2023-08-25)

### New package : @axelor/aos-mobile-helpdesk

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

[7.1.1]: https://github.com/axelor/axelor-mobile/compare/7.1.0...7.1.1
[7.1.0]: https://github.com/axelor/axelor-mobile/compare/7.0.4...7.1.0
