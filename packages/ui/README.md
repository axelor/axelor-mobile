---
title: UI
tags: Readme
---

<h1 align="center">@axelor/aos-mobile-ui</h1>

<div align="center">
    <img src="https://i.imgur.com/KJAAFlT.png" width="30%"/>
</div>

## Presentation

This package was developed for the [Axelor Open Mobile](https://github.com/axelor/axelor-mobile) application.

It contains:

- Basic components to create screens
- Themes management system with basic light theme and a color blind theme
- Writing themes management system with basic theme
- UseOutsideClick hook to notify components when the user clicked outside of itself
- Basic animation tools

## Usage

Install the library :

```bash
yarn add @axelor/aos-mobile-ui
```

Compatibility with React v18.2.x and React Native v0.70.x.

This package has a few required libraries as peer dependencies, please check package.json for more informations.

### Use of basic components

You can import components from the main bundle:

```typescript
import {Button} from '@axelor/aos-mobile-ui';
```

Then, you can use it as a regular component with the specified props :

```typescript
<Button title="Save" onPress={() => console.log('Pressed')} />
```

### Use themes management system

This package provides a context to manage themes system. To use this context you need to wrap your application with the ThemeProvider component. You can also define additional themes and the default theme value through the component props:

```typescript
import { ThemeProvider } from '@axelor/aos-mobile-ui';

...

<ThemeProvider themes={themes} defaultTheme={defaultTheme}>
    ...
</ThemeProvider>
```

A theme in the application has the following structure:

```typescript
export interface Theme {
  key: string;
  name: string;
  colors: ThemeColors;
}

export interface ThemeColors {
  screenBackgroundColor: string;
  backgroundColor: string;
  primaryColor: Color;
  secondaryColor: Color;
  secondaryColor_dark: Color;
  errorColor: Color;
  cautionColor: Color;
  plannedColor: Color;
  progressColor: Color;
  priorityColor: Color;
  defaultColor: Color;
  importantColor: Color;
  successColor: Color;
  warningColor: Color;
  inverseColor: Color;
  infoColor: Color;
  text: string;
  placeholderTextColor: string;
}

export interface Color {
  background_light: string; // This color is a lighter variation of the main color
  foreground: string; // This color is mainly used for text to maintain a good contrast with the background color
  background: string; // This is the main color for this structure
}
```

Once the context is in place, you can access current theme colors with the hook `useThemeColor`. Then, you can use the colors directly in your components:

```typescript
import { Button, useThemeColor } from '@axelor/aos-mobile-ui';

...

const Colors = useThemeColor();

...
<Button
    title="Save"
    color={Colors.primaryColor}
    onPress={() => console.log("Pressed")}
/>
```

### Use writing themes management system

Writing themes management system is based on the same structure as theme system defined above with a context provider called `WritingThemeProvider`.

A writing theme in the application has the following structure:

```typescript
export interface Writing {
  key: string;
  name: string;
  style: WritingStyles;
}

export interface WritingStyles {
  defaultSize: number;
  title: TextStyle;
  subTitle: TextStyle;
  textImportant: TextStyle;
  textDetails: TextStyle;
}

export interface TextStyle {
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
}
```

Once the context is in place, you can access the current theme with the hook `useWritingStyle`. Then, you can use the writing styles directly in your components:

```typescript
import { Text, useWritingStyle } from '@axelor/aos-mobile-ui';

...

const Writing = useWritingStyle();

...
<Text style={Writing.title}>Hello World</Text>
```

### Use outside click notifier

This package provides a context provider to notify components when the user clicks out, this provider is called `OutsideAlerterProvider` and should wrap the application component.

Once the context is in place, you can ask to be notified in the component by using the hook `useClickOutside`. This hook needs the reference of the global view of your component and a boolean to know if the component is active:

```typescript
import { OUTSIDE_INDICATOR, useClickOutside } from '@axelor/aos-mobile-ui';

...

const ComponentName = (...) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside({wrapperRef, visible: isOpen});

  useEffect(() => {
    if (clickOutside === OUTSIDE_INDICATOR && isOpen) {
      setIsOpen(false);
    }
  }, [clickOutside, isOpen]);

  return (
    <View ref={wrapperRef}>
      ...
    </View>
  );
};
```

### Use animation tools

This package provides basic tools to create animation in your application.

All you have to do is to call the method `animateNext` from the object `animationUtil`. This method can take the animation config as an optional parameter or nothing. If nothing is provided, it will use the default config defined in the package:

```typescript
  {
    easeInEaseOut: LayoutAnimation.Presets.easeInEaseOut,
    linear: LayoutAnimation.Presets.linear,
    spring: LayoutAnimation.Presets.spring,
  };
```

For example, if you want to animate the appearance and disappearance of a component children:

```typescript
import { animationUtil, Icon, useThemeColor } from '@axelor/aos-mobile-ui';

...

const ComponentName = ({children}) => {
  const [isVisible, setVisible] = useState(true);
  const Colors = useThemeColor();

  const handleExpandPress = useCallback(() => {
    animationUtil.animateNext();
    setVisible(!isVisible);
  }, [isVisible]);

  return (
    <View>
        {isVisible && children}
        <TouchableOpacity onPress={handleExpandPress}>
          <Icon
            name={isVisible ? 'angle-up' : 'angle-down'}
            size={22}
            color={Colors.primaryColor.background}
          />
        </TouchableOpacity>
    </View>
  );
};
```

## Developpment

This package is developed as part of the Axelor Open Mobile application. To contribute, please go to the [Github project](https://github.com/axelor/axelor-mobile) and follow the guidelines. You will also find an installation guide to help you configure your environment.
