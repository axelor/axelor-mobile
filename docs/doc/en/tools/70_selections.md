---
sidebar_position: 7
description: ''
---

# Selections management

To simplify the management of selections and their modification according to ERP data or via another module, the application's base allows you to enter the necessary selections for each object.

When exported, each module can then enter a configuration list in its _models.typeObjects_ attribute:

```tsx
export interface Module {
  name: string;
  title?: string;
  subtitle?: string;
  icon?: string;
  compatibilityAOS?: Compatibility;
  disabled?: boolean;
  menus?: {
    [menuKey: string]: Menu;
  };
  screens?: {
    [screenKey: string]: Screen;
  };
  translations?: {
    [languageKey: string]: any;
  };
  reducers?: {
    [key: string]: Reducer;
  };
  backgroundFunctions?: Function[];
  models?: {
    objectFields?: ObjectFields;
    sortFields?: SortFields;
    searchFields?: SearchFields;
    formsRegister?: FormConfigs;
    headerRegisters?: Function;
    typeObjects?: ModuleSelections; // Specific configuration
  };
  requiredConfig?: string[];
}
```

The _ModuleSelections_ interface then contains a list of model names with associated selection field definitions. It is possible to define a specific key for the type name to avoid conflicts between modules when the same object is involved. By default, if no key is specified, the object name is used.

```tsx
export type ModuleSelections = ModelSelection[];

export interface ModelSelection {
  modelName: string;
  specificKey?: string;
  fields: {
    [fieldName: string]: {
      overrideMethod?: 'add' | 'rewrite';
      useWebContent?: boolean;
      content: SelectionItem[];
    };
  };
}

export interface SelectionItem {
  key: string;
  value: string | number;
  title: string;
  color?: string;
  order?: number;
}
```

A selection is then defined with the following properties:

- _overrideMethod_: defines how the selection is rewritten when overloaded by the web or by another application module.
- _useWebContent_: defines whether the configuration is to be retrieved from the web or not.
- _content_: defines the list of options on the selection, with associated key, value, title and optional order and color.

The selections of the various modules are then collected during the application build, and the web configurations are retrieved after the user logs in.

There are two methods for retrieving a selection to enable their use in all situations, whether in an API call where hooks are not accessible or in a component where it's important to avoid unnecessary refreshes.

- _getTypes_: a simple function that returns data from the provider.
- _useTypes_: a hook that returns data from the provider with a useMemo.

Both tools return types in the same format, i.e. :

```tsx
interface Types {
  [modelKey: string]: {
    [fieldName: string]: {
      list: SelectionItem[];
      [key: string]: any;
    };
  };
}

interface SelectionItem {
  key: string;
  value: string | number;
  title: string;
  color?: string;
  order?: number;
}
```

For each model selection, the object contains the complete list of options (in the _list_ attribute) as well as each defined key with its associated value.

For example, to define the status of an event in the CRM module, we would have in the module export :

```tsx
export const CrmModule: Module = {
  name: 'app-crm',
  [...],
  models: {
    [...],
    typeObjects: [
      {
        modelName: 'com.axelor.apps.crm.db.Event',
        fields: {
          statusSelect: {
            content: [
              {key: 'Planned', value: 1, title: 'Crm_Status_Planned'},
              {key: 'Realized', value: 2, title: 'Crm_Status_Realized'},
              {key: 'Canceled', value: 3, title: 'Crm_Status_Canceled'},
            ],
          },
        },
      },
    ],
  },
};
```

The type of an event would then be retrieved in the following form:

```tsx
const Event = {
  statusSelect: {
    Canceled: 3,
    Planned: 1,
    Realized: 2,
    list: [
      {
        key: 'Planned',
        order: 0,
        title: 'Crm_Status_Planned',
        value: 1,
      },
      {
        key: 'Realized',
        order: 1,
        title: 'Crm_Status_Realized',
        value: 2,
      },
      {
        key: 'Canceled',
        order: 2,
        title: 'Crm_Status_Canceled',
        value: 3,
      },
    ],
  },
};
```

The application also provides tools to facilitate the use of types:

- _getItemColor_: retrieves the color of an item based on its selection and value.
- _getItemTitle_: retrieves the translated title of an item based on its selection and value.
- _getSelectionItems_: retrieves the complete selection list, where each value is already associated with its color and translated title.
- _getItemColorFromIndex_: retrieves the color of an item based on a customized selection from the web using an object and its value. The color will be calculated according to its index in the list.
- _getCustomSelectionItems_ : retrieves the complete list of a custom selection from the web using an object where each value is already associated with its color and right title using the field name given in arguments. The color will be calculated according to its index in the list.

This simplifies the creation of Pickers, for example:

```tsx
import React, {useMemo} from 'react';
import {Picker} from '@axelor/aos-mobile-ui';
import {useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';

const EventStatusPicker = ({
  style,
  title,
  defaultValue,
  onChange,
  required,
  readonly,
}) => {
  const {getSelectionItems} = useTypeHelpers();
  const {Event} = useTypes();

  const statusList = useMemo(
    () => getSelectionItems(Event?.statusSelect),
    [Event?.statusSelect, getSelectionItems],
  );

  return (
    <Picker
      style={style}
      title={title}
      listItems={statusList}
      defaultValue={defaultValue}
      valueField="value"
      labelField="title"
      onValueChange={onChange}
      required={required}
      readonly={readonly}
    />
  );
};

export default EventStatusPicker;
```
