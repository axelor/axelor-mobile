---
sidebar_position: 1
description: ''
---

# Component management

## Architecture

The _UI_ library contains all the basic components needed to develop interfaces for the mobile application.

The core package also provides several more specialized components, or those requiring a complex external library (_Camera_, _Scanner_, _DatePicker_, components linked to _MailMessages_, ...).

The development of these components is based on the principle of [Atomic Design](https://blog-ux.com/quest-ce-que-latomic-design/). Components are divided into **atoms**, **molecules**, **organisms** and **templates**:

![atomic_design.png](/img/en/atomic_design.png)

The first three types (_atoms_, _molecules_ and _organisms_) correspond to generalist components that can be used in any context. The last type (_templates_) is used for specialized, empowered components, which have a particular context and sometimes even perform API requests or navigation actions themselves.

![architecture_component.png](/img/en/architecture_component.png)

From an architectural point of view, each module must include a _components_ folder with the different types of components present in the module. Each type of component is separated into a dedicated folder, with an index file for exporting components to facilitate their use later.

An index file should also be added to the root of the _components_ folder to centralize the use of components in screens, but also to facilitate exporting. Indeed, components can also be used in other modules that depend on them, so all components must be exported to the index file at the root of the _src._ folder.

```jsx
// Index in component type folder
export {default as ComponentName} from './ComponentName/ComponentName';

// Index in components folder
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';

//Index in package root
export * from './components';
```

For each atomic design type, each component must be separated into a dedicated folder. The names of the folder, the file, the component inside and the export must be the same.

## Storybook documentation

In order to document the components available in the application, the project has a Storybook with the [React Storybook](https://storybook.js.org/docs/react/writing-stories/introduction) librairy.

When a component is created or modified, the storybook must be updated to keep the documentation up to date. For the moment, the storybook's scope of action is restricted to the UI package.

From an architectural point of view, so as not to overload the compiled sources with useless files, there is a _stories_ folder at the same level as the _src_ folder in the UI package. This folder will contain all the stories in the package.

```bash
axelor-mobile/
├── .storybook/ [*Storybook configuration*]
├── packages/
│   ├── ui/
│   │   ├── src/
│   │   └── stories/
│   └── ..
└── ...
```

Once in the stories folder, components are sorted by type (atoms, molecules, organisms & templates) in the same way as in the package sources.

A story is a component use case. In the storybook, you need to successfully re-create all the component's use cases to enable better documentation. To create a story, you need to create a new file in the _stories_ folder, in the right component category. The nomenclature for the file name is `<component name>.stories.tsx`.

There can then be two types of stories: fixed stories in the style of a catalog, or customizable stories where the user can modify each attribute to make the combinations of his choice.

```tsx
import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Component} from '../../src/components';

storiesOf('ui/<type>/<Component>', module)
  .add('default', () => (
    <Component>
      <View />
    </Component>
  ))
  .add('Text', () => (
    <Component>
      <Text>Text</Text>
    </Component>
  ));
```

```tsx
import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Component} from '../../src/components';

storiesOf('ui/<type>/<Component>', module).add(
  'default',
  args => <Component {...args} />,
  {
    argTypes: {
      propsName: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
    },
  },
);
```

It is then possible to add as many fixed stories as required, and also to mix fixed and customizable stories. However, a "default" story must always be added for the storybook to compile correctly. For parametrizable stories, it is possible to add as many atttributes as required.

The [different types of argument available](https://storybook.js.org/docs/react/essentials/controls#configuration):

- no additional configuration required: text, boolean, object
- possibility of adding options: number / range (definition of min, max, step)
- definition of possible values: select / radio

```tsx
// Number configuration
size: {
  control: {
    type: 'number',
    min: 1,
    max: 10,
    step: 1,
  },
  defaultValue: 1,
},

// Basic select
position: {
  control: {
    type: 'radio',
  },
  options: ['right', 'left'],
  defaultValue: 'right',
},

// Work with the application theme. Don't forget to do the mapping
// afterwards in the component props: color={lightTheme.colors[args._color]}
_color: {
  control: {
    type: 'select',
  },
  options: Object.entries(lightTheme.colors)
    .filter(([, value]) => typeof value !== 'string')
    .map(([key]) => key),
  defaultValue: 'primaryColor',
},
```

:::caution
Object fields are not handled very well in the storybook. It's not possible to define the structure of the expected object, and for the user, modifying an object field is rather difficult, as the json object has to be rebuilt in a text editor. In cases where the format of the expected object is known, it is advisable to create an attribute for each expected field of the object and then rebuild the object in the component props. An example with the following object:

```tsx
// Expected object structure
icon ?: {
	color: string;
	name: string;
}

// Parameters creation for the story
_iconColor: {
  control: {
    type: 'text',
  },
  defaultValue: '#000000',
},
_iconName: {
  control: {
    type: 'text',
  },
  defaultValue: 'qrCode',
},

// Component props mapping
<Component {...args} icon={{name: args._iconName, color: args._iconColor}} />
```

:::

Some important commands to run in the project root for the storybook :

- open storybook : `yarn storybook`
- build storybook : `yarn build-storybook`

:::info
Don't hesitate to look at existing stories when creating a new one, as they already represent a number of use cases that may be useful.
:::

## Creating a card

When creating screens, it is often necessary to create a card component. In order to standardize these components and facilitate their creation, the application offers a standard component to which all you need to do is configure the information to be displayed: **ObjectCard**.

There are two types of card components:

```tsx
interface TextElement {
  style?: any;
  displayText?: string;
  indicatorText?: string;
  size?: number;
  iconName?: string;
  color?: string;
  isTitle?: boolean;
  hideIfNull?: boolean;
  hideIf?: boolean;
  order?: number;
  numberOfLines?: number;
  customComponent?: ReactElement<any>;
}
```

The **TextElement** is used to display textual information in the _upperTexts_ and _lowerTexts_ compartments.

Textual information can be transmitted via the _indicatorText_ and/or _displayText_ attributes, which will display it in bold. It is also possible to define the element as a title (_isTitle_) in order to display it bold and larger. For titles, the information must be given through the _displayText_ attribute.

The element can be customized with an icon, font size and/or text and icon color.

Finally, a text display can be customized with a different component using the _customComponent_ attribute.

```tsx
interface BadgeElement {
  style?: any;
  displayText?: string;
  color?: Color;
  showIf?: boolean;
  order?: number;
  customComponent?: ReactElement<any>;
}
```

The **BadgeElement** displays information in the _upperBadges_ and _lowerBadges_ compartments.

The text and color of the badge can be customized, using the _displayText_ and _color_ attributes, and a replacement component can be defined using the _customComponent_ attribute.

The card is therefore divided into several compartments, all of which are configurable and optional. The card will only display compartments containing data.

![explanation_objectCard.png](/img/en/explanation_objectCard.png)

The **upperBadges**, **upperTexts**, **sideBadges**, **lowerTexts** and **lowerBadges** compartments take as input structure a list of elements of the right type according to the attribute (_TextElement_ or _BadgeElement_) as well as a style attribute to customize the container. It's also possible to reverse the display direction of badges in the **upperBadges** and **lowerBadges** compartments with the _fixedOnRightSide_ attribute.

The last compartment can contain an optional **image**, by defining the basic properties of an image:

```tsx
interface ImageElement {
  source: ImageSourcePropType;
  defaultIconSize?: number;
  resizeMode: ImageResizeMode;
  imageSize?: StyleProp<ImageStyle>;
  generalStyle?: StyleProp<ImageStyle>;
}
```

To facilitate image integration on cards, the core package provides three utility functions that obtain the URI of an image from AOS according to type:

- **useMetafileUri**: for formatting a URI from a MetaFile
- **useBinaryImageUri** and **useBinaryPictureUri**: for formatting a URI from a binary image.

## SVG icons management

For icons, the application supports two librairies : [FontAwesome](https://fontawesome.com/icons) and [Bootstrap](https://icons.getbootstrap.com/). For the Bootstrap icons, we use the svg database in `BootstrapIcon` component. We created a script to generate a map between icon name and svg data which can be found in `icons/` folder of ui package sources. This construction allows us to create custom icons from a SVG file in the `scripts/` folder of ui package.

When adding a new icon, it is important to ensure that the added SVG is compatible with the viewBox used in the `BootstrapIcon` component:

```tsx
<Svg viewBox="0 0 16 16">...</Svg>
```

In the case of viewBox="0 0 16 16", this means that the drawing is positioned starting from the point (0,0) at the top left and extends over a width and height of 16 units each. This creates a square frame in which your SVG must fit. All elements of the SVG must be designed to fit within this area to display correctly.

To adapt an SVG to this viewBox, there are several solutions:

- When creating the SVG, it is important to create it directly in the appropriate format.
- If you are retrieving an SVG from an existing icon, resize the SVG file so that it fits the required format.

## iOS hot spots

In order to enable support on the iOS platform, there are several points to note and pay particular attention to:

- The **elevation** style property is not supported on iOS, so the "_shadow_..." properties must be used. :
  ```css
  elevation: 3,
  shadowOpacity: 0.5,
  shadowColor: Colors.secondaryColor.background,
  shadowOffset: {width: 0, height: 2},
  ```
- The **zIndex** style property doesn't work for nested views, so care must be taken to ensure that all views above it also have a _zIndex_ attribute with a lower value for this to work.
- A new **KeyboardAvoidingScrollView** component has been created to avoid having to redefine iOS/Android etc. properties for keyboard position. We therefore recommend using this component rather than react-native's _KeyboardAvoidingView_.
- The **dotted** or **dashed** border styles are not supported by iOS, so the behavior must be adjusted for the iOS platform:
  ```css
  borderStyle: Platform.OS === 'ios' ? 'solid' : 'dotted'
  ```
