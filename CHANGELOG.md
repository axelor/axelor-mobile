---
title: 7.1.0
tags: Changelog
---

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

[7.1.0]: https://github.com/axelor/axelor-mobile/compare/7.0.3...7.1.0
