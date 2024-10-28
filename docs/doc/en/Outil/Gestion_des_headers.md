---
sidebar_position: 6
description: ''
---

# Header management

## Actions

To facilitate overloading with the addition or modification of actions available in the top right-hand corner of the screen, headers are managed using a key system. For each screen, the actions to be displayed must be registered via a provider available in the core package.

These registrations are carried out by hooks, enabling access to the various tools provided in the packages (translations, themes, store, etc.), as well as the updating of headers when necessary.

Each module must therefore provide its own hook to record header actions for its screens.

```tsx
const useCustomerDeliveryDetailsActions = () => {
  const {mobileSettings} = useSelector(state => state.config);
  const {customerDelivery} = useSelector(state => state.customerDelivery);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_customerDelivery_details', {
      model: 'com.axelor.apps.stock.db.StockMove',
      modelId: customerDelivery?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageOnStockApp,
    });
  }, [mobileSettings, customerDelivery]);
};
```

The `headerActionsProvider` tool must therefore be used to associate a key with an object containing all the information required for the various header actions.

A nomenclature has been set up to help understand the origin of a key: `<Module><Object><Screen type>`.

Actions are defined through a structure named `HeaderOptions` :

```tsx
export interface HeaderActions {
  [key: string]: HeaderOptions;
}

export interface HeaderOptions {
  model?: string;
  modelId?: number;
  disableMailMessages?: boolean;
  disableJsonFields?: boolean;
  attachedFileScreenTitle?: string;
  barcodeFieldname?: string;
  headerTitle?: string;
  actions?: ActionType[];
}
```

By default, the core package provides two actions for the header: follow-up messages on each object and attached files. These can be configured via the following props:

- _model_: full name of the ERP model.
- _modelId_: object identifier.
- _disableMailMessages_: condition for displaying or not displaying follow-up messages on the object.
- _disableJsonFields_: condition for displaying studio fields.
- _attachedFileScreenTitle_: screen name for attached files.
- _barcodeFieldname_: name of attribute containing barcode file on ERP (default `barCode`).
- _headerTitle_: screen name for dynamic titles.

Attached files are displayed only if the current object has them, with an indicator of their number. Follow-up messages are only displayed when `model` and `modelId` are set and not disabled by the `disableMailMessages` attribute.

Additional actions can then be added using the `actions` attribute. Each action then has the following structure:

```tsx
export interface ActionType {
  key: string;
  order: number;
  title: string;
  iconName: string;
  iconColor?: string;
  indicator?: number;
  hideIf?: boolean;
  disableIf?: boolean;
  onPress: () => void;
  showInHeader?: boolean;
  customComponent?: ReactElement<any>;
}
```

The various attributes available are :

- **key** : _[Required]_ is used to give an identifier to the action so that it can be modified via an overload.
- **order** : _[Required]_ is used to order the display of actions.
- **title** : _[Required]_ title of the action when reduced in the `DropdownMenu`.
- **iconName** : _[Required]_ name of the icon associated with this action
- **iconColor** : icon color, set to `secondaryColor_dark.background` by default.
- **indicator**: small number to be displayed at the top of the action icon (e.g. number of attached files or pending messages).
- **hideIf**: condition for displaying the action.
- **disableIf**: action deactivation condition
- **onPress** : _[Required]_ action to be executed when user clicks on icon
- **showInHeader**: condition for whether the action can be displayed directly in the header or whether it must always be present in the drop-down actions. By default, actions are set to be displayed in the drop-down list.
- **customComponent**: possibility to add a custom react element

From a functional point of view, the set of actions is passed to the `HeaderOptionsMenu` component, which then performs the following steps:

- retrieve the two default actions set with the information provided
- remove hidden actions from the list
- sort the list by ascending `order`
- display the first two actions with the `showInHeader` attribute set to true directly in the header
- display the rest of the actions in the `DropdownMenu`.

For small screens, all actions are displayed in the drop-down list.

## Banners

It is possible to add banners to be displayed above the header to inform the user of a global application situation (offline mode, loss of connection or test environment).

To facilitate the addition and/or modification of a banner, this functionality is managed by a key system. A context available in the core package is used to register banners when they are to appear or disappear.

These registrations are carried out by hooks, providing access to the various tools available in the packages (translations, themes, store, etc.), as well as updating headers when necessary.

Headers are managed by a context to enable updating at the slightest change. To retrieve the registration function, use the _useHeaderBand_ hook.

```tsx
const {registerHeaderBand} = useHeaderBand();

...

const checkInternetConnection = useCallback(async () => {
    const {isConnected} = await getNetInfo();

    registerHeaderBand({
      key: 'noInternetConnection',
      text: I18n.t('Base_NoConnection'),
      color: Colors.secondaryColor,
      order: 15,
      showIf: !isConnected,
    });
  }, [Colors, I18n, registerHeaderBand]);

  useEffect(() => {
    const interval = setInterval(checkInternetConnection, 2000);
    return () => clearInterval(interval.current);
  }, [checkInternetConnection]);
```

To register a banner, simply use the _registerHeaderBand_ function, providing all the information required for display:

```tsx
export interface HeaderBandItem {
  key: string; // Banner key
  color: Color; // Banner color
  text: string; // Text to display
  showIf: boolean; // Display condition
  order?: number; // Display order in the list
}
```

To update/modify a banner, simply use the same registration function, using the same key and modifying the necessary information.
