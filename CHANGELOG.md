---
title: 7.2.0
tags: Changelog
---

## [7.2.0] (2023-11-10)

This version adds the management of the technical documentation. All the documentation is available in the docs folcer at the project root and will be updated with each technical change. The documentation can be found [here](https://docs.axelor.com/) for more details.

### New package : @axelor/aos-mobile-hr

This package is compatible with AOS Human ressources module from version 7.2.0
It enables user to manage Expenses through the mobile application. You can create general expense with a justification or kilometric expense and then links a number of expenses to a existing or new expense report. You can also send, validate or refuse expense reports.

### @axelor/aos-mobile-helpdesk

#### Features

- Add pull to refresh management on all screens

#### Changes

- Simplify card with ObjectCard component
- Simplify form view with generator
- UserSearchBar has been moved to core package

### @axelor/aos-mobile-crm

#### Features

- Display partner fields on PlanningEventCard
- Add header action to save person on user's phone on all details views
- Add pull to refresh management on all screens
- Contact : Add linked clients/prospects on details view
- Prospect/Client : display last opportunity
- Add links to Google and LinkedIn on details views
- Add management of creation and edition of events

#### Changes

- Simplify card with ObjectCard component
- Simplify form views with generator

### @axelor/aos-mobile-manufacturing

#### Features

- Apply digit management with useDigitFormat
- Add dates on MO cards and details view
- Add pull to refresh management on all screens
- Add planned durations on operation order details

#### Changes

- Simplify card with ObjectCard component

### @axelor/aos-mobile-stock

#### Features

- StockCorrection : add comment field
- Apply digit management with useDigitFormat

#### Changes

- Simplify card with ObjectCard component

### @axelor/aos-mobile-core

#### Features

- Add form generator system
- Add management of custom fields created with AOS Studio with the FormView
- Add pull to refresh on user screen
- Add fields parser middleware to avoid dotted fields
- Improvement object fields management to avoid dotted fields
- Add AnomalyBubble and AnomalyList components for check management
- Add useIsFocused hook
- Add UserSearchBar component

### @axelor/aos-mobile-ui

#### Features

- Button : improve design and add icon management
- Add new component Alert
- CircleButton : improve design and add management of square buttons

#### Changes

- Remove IconButton component which should be replaced by Button component.
- Remove Pop-up components which should be replaced by Alert component.

[7.2.0]: https://github.com/axelor/axelor-mobile/compare/7.1.2...7.2.0
