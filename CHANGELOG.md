---
title: 8.3.0
tags: Changelog
---

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

[8.3.1]: https://github.com/axelor/axelor-mobile/compare/8.3.0...8.3.1
[8.3.0]: https://github.com/axelor/axelor-mobile/compare/8.2.8...8.3.0
