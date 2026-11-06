---
title: 9.2.0
tags: Changelog
---

## [9.2.1] (2026-11-06)

### @axelor/aos-mobile-ui

#### Fixes

- SelectionContainer: allow scrolling the list on Android when it overflows its parent container

## [9.2.0] (2026-11-04)

This release brings a major update to the project’s dependencies, including React Native, now upgraded to version 0.87.x.

<details>
The application now runs on React Native 0.87.1 with Reanimated 4.4.1, Worklets 0.9.2 and Gesture Handler 3.0.1, and requires Node 22.11 or later. With Reanimated 4.4.1, the side menu could randomly stay open on Android and stop closing when selecting an entry or tapping outside of it. Applications built from these packages must disable the corresponding Reanimated options by adding the following block to the root package.json, then rebuild the native application (and run pod install on iOS): "reanimated": {"staticFeatureFlags": {"USE_COMMIT_HOOK_ONLY_FOR_REACT_COMMITS": false, "FORCE_REACT_RENDER_FOR_SETTLED_ANIMATIONS": false}}
</details>

### @axelor/aos-mobile-core

#### Features

- FormView: display the form content on a rounded card background, with an option to hide it
- Screens: allow each screen to choose the orientation in which it is displayed

<details>
The application is no longer locked in portrait by the system itself: a screen now declares the orientation it wants through the orientation key of its definition, and the navigation applies it when the screen is opened. A screen can stay in portrait, which remains the behaviour when nothing is declared, be forced to landscape, or follow the device, in which case turning the phone turns the screen even when the automatic rotation of the system is disabled. Screens outside of the module navigation, such as the login and the session management, stay in portrait.
</details>

- Settings: allow modules to register their own preferences (pickers, switches and buttons) on the settings screen

<details>
The settings screen now builds its content from registered settings items instead of a fixed layout. Each item can define its type, order and a condition to be displayed, so additional applications can contribute their own preferences without overriding the screen.
</details>

- User profile: allow modules to register their own elements on the user profile screen

<details>
The user profile screen now builds its content from registered items instead of expecting an application to replace the whole screen. Each item can define the zone it belongs to (inside the user card or as a standalone card), its order and a condition to be displayed, so several applications can contribute their own elements at the same time without depending on each other. The default stock location selector of the stock application is now registered this way and no longer overrides the user profile screen.
</details>

#### Changes

- Header: redesign navigation bar with themed action buttons and improved dropdown menu
- Screen: remove shaded header option to match new design
- Drawer: redesign the side navigation menu with a cleaner module rail and menu panel
- Session screen: redesign the connection selection screen with rounded session cards, a labelled add button and a cleaner footer
- Inputs: restyle generic input components with new design
- ShortcutsCard: redesign shortcuts with icon tiles and bold labels
- Toast: redesign with a custom layout featuring a colored accent bar, a tinted icon tile and per-type icons
- Planning: rework the design of the agenda view and improve its performance
- Planning: group the filters, the assignation switch and the date navigation in a single header
- FocusScreen: remove unused component

<details>
The FocusScreen component has been removed as it was not used anywhere. Screens needing to fetch data when they get the focus can combine Screen with the useIsFocused hook.
</details>

- SocialNetworkLinks: redesign the Google and LinkedIn shortcuts as icon tiles
- Field parser: expose the entity version returned as $version by the API under the standard version field, on nested objects too
- HeaderBand: restyle as a filled band with bold colored label
- SettingsScreen: redesign user preferences as grouped cards with a connection footer

#### Fixes

- Translations: stop escaping special characters, such as apostrophes, in the values inserted into a translated message
- Contacts: remove the contacts permissions on Android

<details>
The READ_CONTACTS and WRITE_CONTACTS permissions are no longer declared nor requested on Android to comply with the Google Play contacts permission policy. Adding a contact still opens the native contact form, which saves the contact without requiring any permission from the application.
</details>

- Form view: panels with colspans summing to 12 are displayed on the same row again
- PeriodInput: fix the crash raised when changing a date on a period without a default interval

<details>
The default interval was computed from the defaultIntervalHours property with a check excluding null only, so an absent property produced a NaN interval. That interval was then considered as provided, and changing the start date derived an end date from it, which was an invalid date crashing the date input as soon as it was displayed. No caller provides that property, so every period input was affected.
</details>

### @axelor/aos-mobile-ui

#### Features

- IconTile: add a new component to display an icon inside a colored rounded tile
- ActionSheet: add headerChildren props to display a content recap above the action list
- HtmlViewer: add a new component to display read-only HTML content, scrollable within a bounded height
- CalendarRangePicker: add a new scrollable multi-month calendar to pick a date range visually, with coloured day marks, a collapsible legend and a shortcut back to today

<details>
Days can be marked by half, morning and afternoon carrying their own colour, so a day shared between two records stays readable. Days that cannot be picked are shown as a round badge above the marks and can carry their own colour to tell several kinds apart. Pressing a day that already holds records opens a sheet listing them, from which the free half of the day can still be taken, and a range is shortened so that it never spans a day that is already full.
</details>

- Picker: allow a picker to display more than plain text for the selected value and for each option

<details>
A picker can now be given a way to render its items, so an option can carry a coloured badge or any other indication beside its label. The rendering applies both to the value shown once the picker is closed and to every option in the list, which lets a choice be made on more than the label alone. Pickers that were not given one keep displaying plain text exactly as before.
</details>

- WeekDayPicker: add a new week strip to browse a period day by day, each day showing at a glance how much of it is taken

<details>
The strip shows one week at a time and is swiped from week to week, the selection following along so the details below always describe a visible day. Each day carries a circular gauge whose inner disc grows with the share of the day already taken; a day on which nothing is expected shows a coloured dot instead, so several kinds of day off can be told apart. Days falling outside the period are still shown, greyed out and inert, which keeps a period starting mid-week readable. The strip carries its own navigation: the week being browsed is named above it and can be changed one week at a time without swiping, and a shortcut brings the selection back to today whenever today falls inside the period and is not already shown.
</details>

- NumberChevronInput: add inputStyle prop to customize the inner input style
- GanttView: add a new component to display a planning as a timeline, with collapsible groups, week and month zooms, non-working days and a daily indicator per line

<details>
The timeline is browsed week by week or month by month, the scale naming the weeks and the months it spans, and the display can be brought back to today at any time. Lines are gathered in groups which can be collapsed one by one or all at once, a group being able to appear collapsed from the start, and a filter keeps only the lines which actually carry items. Items are drawn as bars over the days they span, halves of days included, and items which overlap are stacked on separate lines instead of hiding one another, the height of the line following the number of lines needed. Each line, and the line of its group, can carry a daily indicator under the bars, a coloured cell per day with its own label, to follow a value such as a load day by day. Non-working days are shaded both on the lines and on the line of their group, and the legend, the filters and the period navigation are gathered in a single header, the filters given by the screen being able to sit in a collapsible part of it. In landscape, the legend, the filters and the period navigation leave the header for a panel on the right of the screen, which can be folded down to a handle so that the whole width is left to the timeline, and the zoom, when the screen does not impose one, follows the orientation: the month in landscape, the week in portrait.
</details>

- SwitchCard: allow the size, the colour and the number of lines of the title to be customized
- Badge: allow customizing the text size
- GroupedCard: add a new component to group several items into a single card separated by horizontal rules
- NumberChevronInput: allow the keyboard to be turned off so the value can only be changed with the chevrons

<details>
The input can now refuse the keyboard while staying usable, the value being taken from the chevrons above and below it. Each digit also keeps a fixed width and is centered instead of taking a share of the space available, so a duration keeps the same shape whatever the width it is given.
</details>

- RightIconButton: add a showWrapper option to display the button without its card background
- SwitchCard: add a showWrapper option to display the switch without its card background

#### Changes

- Inputs: restyle generic input components with new design
- HeaderContainer: redesign the filter header as a floating inset card with a circular expand button
- Badge: restyle as a filled, content-hugging pill with bold colored label
- ObjectCard: redesign cards with rounder corners and a rounded left accent bar
- AutoCompleteSearch & Picker: restyle the results dropdown with thin dividers, a lighter border and no shadow
- ScrollList: use the theme color for loading indicators and a muted color for the end-of-list message
- SimpleIndicator: redesign as a row layout with a colored accent bar and centered value and title
- DropdownCard: redesign as a single card with a leading icon tile and content separated by a horizontal rule
- Alert: redesign the header with an icon tile close button and a cleaner spacing layout
- Checkbox: redesign with a lighter layout and a smaller default icon
- Theme: use the light theme as the default instead of the purple theme
- HorizontalRuleText: restyle with gap-based spacing and pass the color directly to the rules
- Label: restyle with a solid colored border and a softer background fill
- Theme: redesign the light theme with a new color palette and white background
- NumberBubble: thin the border and auto-fit the number font size
- ProgressBar: flatten the design by removing the shadow and using a thinner border and a slimmer animated stripe
- ProgressCircle: redesign with a smaller default size and a track tinted from the progress color
- QuantityCard: redesign with a horizontal rule separator and an isFormWrapper option to render without a card
- Screen: remove the top spacing option to match new design
- StarScore: reduce the default star size and add spacing between stars
- Stepper: redesign the dropdown layout, highlight the active step and drop the isCardBackground prop
- ViewAllContainer: flatten the design and add an isFormWrapper option to render without a card
- ViewAllEditList: redesign the lines with icon tile actions and add an isFormWrapper option
- ChipSelect: redesign chips with uniform height and width based on the available space
- RadioButton: highlight the selected option with a filled background and a bold colored label
- ToggleSwitch: redesign as a segmented control highlighting the active option with a bold colored label
- Switch: use the full primary color when enabled for a stronger active state
- Theme: reduce the default text sizes to match the new design scale

#### Fixes

- Themes: make the text laid over a light coloured background readable again

<details>
Coloured buttons, labels, chips, number bubbles and info bubbles paint a light shade of their colour as background and write over it. The text was still using the shade meant for a solid background, which on most colours was white and therefore almost invisible - a contrast of 1.1 to 1 on a success or an error colour. Every theme now writes in black over a light background. A theme configured on the server keeps deciding on its own, but the decision is now taken on the light shade as it is actually drawn rather than on the plain colour, which also fixes the reverse case of black text over a light shade in dark mode.
</details>

- Custom colours: ignore values which are not colours, accept colours defined with transparency and keep a solid light shade
- Label: hide the icon when the label has no icon to display
- NumberChevronInput: let the input be emptied while typing instead of falling back to its lowest value

### New package : @axelor/aos-mobile-team

This package is compatible with AOS from version 9.2.0 and requires team management to be enabled in the base app configuration. It allows users to manage their team tasks from the mobile application: browse them with search and filters on status, priority and assignee, create or edit them, and follow their lifecycle (start, finish, reopen, cancel or delete).

### @axelor/aos-mobile-maintenance

#### Changes

- Planning: group the filters, the assignation switch and the date navigation in a single header

#### Fixes

- Maintenance request form: the selected equipment card no longer stretches to fill the screen

### @axelor/aos-mobile-project

#### Changes

- Planning: group the filters, the assignation switch and the date navigation in a single header

#### Fixes

- Project activities: resolve issue in history fetching

### @axelor/aos-mobile-intervention

#### Changes

- Planning: group the filters, the assignation switch and the date navigation in a single header

### @axelor/aos-mobile-quality

#### Features

- Control entry: display the studio fields of the line when its control type has no values to fill

#### Changes

- Control entries: the values to fill on a sample now follow the fields configured on the control type

<details>
The values measured on a sample are no longer free custom fields. Each control type carries its own list of fields, each one a decimal, a text, a yes/no or a choice among a list of allowed values, and the form of a sample line is built from that list, in the configured order and with the required ones marked as such. Two collapsed panels sit above the fields: the conformity criteria of the control type when one is described, and the values expected by the control plan line, so the operator can compare a measure to its target without leaving the entry. Validating a line records the measures and returns its conformity in a single step, and the result of the sample follows immediately. This requires the matching web version, on which the control entry configuration has been restructured and a migration script must be run before starting the application.
</details>

### @axelor/aos-mobile-hr

#### Features

- Leave requests: allow the complete request screen to be opened on a given period and to report the creation to its caller

<details>
The screen now reads a fromDate and a toDate from its route to prefill the period, and an eventName on which it emits the created period before closing itself, so a screen offering its own way to pick a period can refresh itself afterwards. Opened from its own menu, without those parameters, the screen behaves exactly as before.
</details>

- Employees: allow a list of employees to be restricted to the ones a given user manages

<details>
The employee search accepts a manager, so a screen can show only the employees a user is responsible for. The same rule already applied to the leave requests waiting for validation, where a user who is not an HR manager only sees the requests of the employees they manage, and both lists now share it.
</details>

- Timesheet: allow another screen to create a timesheet and to add a line on a given day

<details>
The timesheet creation can now report the timesheet it created to the screen that asked for it instead of always opening the timesheet details, and the line form accepts the day the line has to be created on together with the values it has to open prefilled with, the project among them. A screen browsing a timesheet day by day can therefore create the timesheet it needs and fill it without ever leaving its own flow, the saved line being reported back to it.
</details>

#### Changes

- Leave request: use AOS request to return to draft status
- Filters: display the field name as placeholder text inside status pickers instead of a separate title label
- Leave requests: tell the draft, refused and cancelled statuses apart more clearly

<details>
The three statuses were painted with colours that the new design uses for other meanings. A draft request now carries the information colour, a refused one the error colour and a cancelled one the secondary colour, which also keeps them readable when a request is shown as a mark on a calendar.
</details>

#### Fixes

- Leave requests: send the period of a request as a date instead of a UTC instant, which shifted it to the day before

<details>
The endpoints computing the duration, computing the available days and creating a request all expect a date without time. A Date was sent instead, serialized as a UTC instant: for any timezone east of UTC, the date read by the server was the day before as soon as the time of day was earlier than the offset. The period is now formatted as a plain date before being sent.
</details>

- Leave requests: keep the filled request on screen when its creation fails

<details>
The creation screen emptied itself as soon as the request was sent, without waiting for the answer. A request refused by the server therefore left an empty form and no way to know what had been asked, which forced the whole request to be typed again.
</details>

- Timesheet: wait for a line to be saved before leaving its form

<details>
The form closed as soon as the creation or the update was sent, so the timesheet it returned to was refreshed before the line was actually saved and could show the previous state of the line.
</details>

### @axelor/aos-mobile-crm

#### Changes

- Planning: group the filters, the assignation switch and the date navigation in a single header
- Filters: display the field name as placeholder text inside status pickers instead of a separate title label

### @axelor/aos-mobile-stock

#### Changes

- Planning: group the filters, the assignation switch and the date navigation in a single header

#### Fixes

- Stock correction: fix the tracking number selection that prevented creating a correction

  [9.2.1]: https://github.com/axelor/axelor-mobile/compare/9.2.0...9.2.1
[9.2.0]: https://github.com/axelor/axelor-mobile/compare/9.1.11...9.2.0
