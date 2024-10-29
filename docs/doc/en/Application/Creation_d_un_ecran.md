---
sidebar_position: 3
description: ''
---

# Screen creation

## Architecture

A screen in an application is simply a component. The UI library provides a `Screen` component, which is used to create a screen base. All that's then required is to provide all the screen content as children.

In terms of architecture, in order to distinguish screens from standard components, all screens are stored in a **screens** folder which can then be redivided according to functionality to add a little order to the folder. Each screen folder must contain an index file to facilitate export.

The core library provides a typing scheme for the screen structure, with the information required to register the various screens in the navigation. A screen is defined by a key and various attributes:

```tsx
interface ScreenOptions {
  shadedHeader: boolean;
}

export interface Screen {
  component: React.FC<any>;
  title: string;
  actionID?: string;
  options?: ScreenOptions;
  isUsableOnShortcut?: boolean;
}
```

- a title (_title_) to be displayed in the header when the user is on the page. This must actually be a translation key to facilitate internationalization of the application.
- the component corresponding to the screen content (_component_).
- an _actionID_ key to link the screen to a configuration of actions to be displayed in the header.
- options for displaying the screen, such as whether or not to have a header with a shadow. The header has a shadow by default, so there's no need to supply this attribute when a shadow is required.
- an _isUsableOnShortcut_ tag to indicate whether the screen can be used as a shortcut on the home screen.

Then simply export all the screens in this form:

```tsx
import ContactListScreen from './ContactListScreen';
import ContactDetailsScreen from './ContactDetailsScreen';
import ContactFormScreen from './ContactFormScreen';

export default {
  ContactListScreen: {
    title: 'Crm_Contacts',
    component: ContactListScreen,
    options: {
      shadedHeader: false,
    },
  },
  ContactDetailsScreen: {
    title: 'Crm_Contact',
    component: ContactDetailsScreen,
    actionID: 'crm_contact_details',
    options: {
      shadedHeader: false,
    },
  },
  ContactFormScreen: {
    title: 'Crm_Contact',
    component: ContactFormScreen,
  },
};
```

:::caution
Please note that all screens defined in the module must be exported, otherwise the application will not be able to access them.
:::

When overloading a screen, simply create a new screen by modifying the elements to be changed on the basic screen. Then, once the component has been created, export it with the same key as in the original module. This way, when you save it in the navigation system, only the last screen with the same key will be taken into account.

## Creating a form view

To facilitate and standardize the creation of form views, the application provides a generic tool for generating form views based on a given configuration.

Defining a configuration corresponds to associating a key with a set of **fields** and **panels**.

```tsx
interface Field {
  parentPanel?: string;
  order?: number;
  titleKey?: string;
  helperKey?: string;
  type: InputType;
  required?: boolean;
  requiredIf?: (values?: States) => boolean;
  readonly?: boolean;
  readonlyIf?: (values?: States) => boolean;
  hideIf?: (values?: States) => boolean;
  dependsOn?: {
	  - *dependsOn* : définition d’une condition de mise à jour de la valeur du champs en fonction de la mise à jour d’un autre champs. Il s’agit d’un champs json qui associe le nom du champs duquel dépend le champs actuel en tant que clé et la fonction qui vient définir la nouvelle valeur du champs en fonction des états de l’objet du formulaire, du store global et de la valeur qui vient d’être modifiée.- *dependsOn* : définition d’une condition de mise à jour de la valeur du champs en fonction de la mise à jour d’un autre champs. Il s’agit d’un champs json qui associe le nom du champs duquel dépend le champs actuel en tant que clé et la fonction qui vient définir la nouvelle valeur du champs en fonction des états de l’objet du formulaire, du store global et de la valeur qui vient d’être modifiée.[fieldName: string]: (values: DependsOnStates) => any;
	};
  widget?: Widget;
  customComponent?: (
    options?: customComponentOptions,
  ) => ReactElement | JSX.Element;
  options?: {
    [propsKey: string]: any;
  };
  validationOptions?: {
    [key: string]: {
      value?: any;
      customErrorKey?: string;
    };
  };
}
```

A field is defined by several attributes:

- _parentPanel_: the name of the panel in which the field is to be displayed
- _order_: order of the field in the view/panel.
- _titleKey_: translation key for field title.
- _helperKey_: translation key for the helper that will be displayed next to the field. This helper is used to explain the purpose of the field to the user, if necessary.
- _type_: definition of field typing to define default display but also to enable form data integrity checking. The types accepted in the form view are :
  ```tsx
  type InputType =
    | 'string'
    | 'email'
    | 'url'
    | 'phone'
    | 'date'
    | 'datetime'
    | 'time'
    | 'number'
    | 'boolean'
    | 'array'
    | 'object';
  ```
- _required_ and _readonly_ define a field as required or read-only.
- _requiredIf_, _readonlyIf_ and _hideIf_ are used to define a condition for which the field must be required, read-only or hidden. These three functions receive the states of the form object and the global store as arguments, and must return a Boolean.
- _dependsOn_: defines a condition for updating the value of the field according to the update of another field. This is a json field that associates the name of the field on which the current field depends as a key and the function that defines the new field value according to the states of the form object, the global store and the value that has just been modified.
- _widget_: definition of a display widget for the field. By default, the form assigns a widget associated with the field type, but it is possible to request another compatible widget, or to define a custom widget which can then be used to define a `‘custom'` component.
  ```tsx
  type Widget =
    | 'default'
    | 'increment'
    | 'star'
    | 'HTML'
    | 'label'
    | 'password'
    | 'file'
    | 'signature'
    | 'date'
    | 'checkbox'
    | 'custom';
  ```
- _customComponent_: definition of a custom display component. This can be used, for example, to display a search bar or a selection. Custom components must have a precise structure to enable values to be passed to the component.

  ```tsx
  interface customComponentOptions {
    style?: any;
    title?: string;
    defaultValue?: any;
    onChange: (value?: any) => void;
    required?: boolean;
    readonly?: boolean;
  }
  ```

:::caution
Care must be taken when using custom components with the hideIf attribute. As the display is conditional, the component must not use hooks to avoid rendering errors due to a different number of hooks between different renders.

The trick is to create an auxiliary component that will manage all the hooks, then create a component above it that transmits only the values to the auxiliary component.

```tsx
const ComponentAux = ({
  style,
  title,
  defaultValue,
  onChange,
  readonly,
  required,
}) => {
  [hooks ...]

  return [render ...];
};

const Component = ({
  style = null,
  title = 'DefaultTitleKey',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}) => {
  return (
    <ComponentAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

export default Component;
```

:::

- _options_: transmit customized options to the various components to personalize the display.
- _validationOptions_: allows you to define validation options (maximum and minimum values, integer or decimal, etc.). In fact, it's a matter of defining field typing more precisely with the [YUP](https://www.npmjs.com/package/yup) tool. Some typing options suggest redefining the error message. If you need to redefine a specific error message, remember to use a translation key so as not to jeopardize the internationalization of the application.

```tsx
interface Panel {
  titleKey?: string;
  isCollapsible?: boolean;
  order?: number;
  colSpan?: number;
  direction?: 'row' | 'column';
  parent?: string;
}
```

A panel is defined by several attributes:

- _titleKey_: translation key for the panel title.
- _isCollapsible_: defines whether a panel should be collapsible.
- _order_: panel order in the view.
- _colSpan_: panel width in the view. By default, the panel takes up the entire width of the view.
- _direction_: element display direction (`'row'` displays elements in rows, `'column'` displays elements in columns).
- _parent_: name of parent panel.

```tsx
interface Form {
  readonlyIf?: (values?: States) => boolean;
  modelName?: string;
  panels?: JSONObject<Panel>;
  /** Fields attribut is a JSON object contening all fields of object.
   * When defining a field you need to define as key in the JSON object
   * the fieldName of the object.
   */
  fields: JSONObject<Field>;
}
```

A form is then composed of a set of _panels_ supplied in the form of a JSON object, a set of _fields_ in the same way, the name of the model for building the actions, and a _readonlyIf_ function for making the view read-only according to the state of the form and the values of the store.

```tsx
interface FormConfigs {
  [formKey: string]: Form;
}
```

In this way, each module can define as many form configurations as required in a key-value format, which is then exported to the module definition in the _models_ category under the **formsRegister** attribute.

Once the form configurations have been defined, the next step is to create the form screen in the same way as a basic screen, then use a pre-built component for display: `FormView`.

This component takes three elements as arguments:

- defaultValue: the default value to be displayed on the form.
- formKey : the form configuration key defined when exporting the module.
- actions: the set of actions to be displayed at the bottom of the page. Actions are built through a template in the same way as all form elements.

  ```tsx
  interface Action {
    key: string;
    type: FormActionType;
    titleKey?: string;
    iconName?: string;
    color?: Color;
    hideIf?: (_states: States) => boolean;
    disabledIf?: (_states: States) => boolean;
    customAction?: (_options: ActionProps) => void;
    needValidation?: boolean;
    needRequiredFields?: boolean;
    customComponent?: ReactElement<any>;
  }

  interface ActionProps {
    handleReset?: () => void;
    objectState?: any;
    storeState?: any;
    handleObjectChange?: (newValue?: any) => void;
    dispatch?: Dispatch<any>;
  }

  type FormActionType = 'update' | 'create' | 'reset' | 'refresh' | 'custom';
  ```

  An action is defined by several attributes:

  - _key_: action key for action uniqueness
  - _type_: action type definition for default configurations. This automatically defines the title and action to be performed when the button is clicked.
  - _titleKey_: translation key for button title.
  - _iconName_: name of the Bootstrap library icon to be displayed next to the button title.
  - _color_: button color.
  - _hideIf_ / _disabledIf_: functions for adding a display/availability condition for the button, depending on the state of the form and store values.
  - _customAction_: custom action to be performed on click.
  - _needValidation_: allows you to ask the form to check whether the values filled in by the user meet the constraints before performing the action. If the form is correct, the action is performed. If not, the user receives a summary of the elements to be corrected.
  - _needRequiredFields_: prevents the user from clicking on the button if certain required fields are not filled in.
  - _customComponent_ : custom component to display the button. The component's onPress attribute will be rewritten with the associated action.
