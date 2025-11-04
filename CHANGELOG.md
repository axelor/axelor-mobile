---
title: 8.5.0
tags: Changelog
---

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

[8.5.0]: https://github.com/axelor/axelor-mobile/compare/8.4.7...8.5.0
