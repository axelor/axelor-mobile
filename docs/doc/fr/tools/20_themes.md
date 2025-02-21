---
sidebar_position: 20
description: ''
---

# Gestion du thème

## Couleurs

Le package UI propose une gestion du thème avec un thème pricincipal. Il est important d’utiliser ce thème lors de la création de composants afin d’uniformiser le design de l’application et permettre une modification du thème facilement.

Pour utiliser ce thème, il suffit d’utiliser le hook `useThemeColor`. Ce hook permet d’accéder à l’attribut _colors_ du thème actif et d’avoir les modifications immédiatement dès que l’utilisateur change de thème.

```tsx
const HelloWorldButton = () => {
  const Colors = useThemeColor();

  return (
    <Button
      title="Hello World"
      color={Colors.primaryColor}
      onPress={() => console.log('Hello World')}
    />
  );
};
```

Chaque thème doit suivre la structure suivante :

```tsx
export interface Color {
  background_light: string;
  foreground: string;
  background: string;
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
  red: Color;
  pink: Color;
  purple: Color;
  deepPurple: Color;
  indigo: Color;
  blue: Color;
  lightBlue: Color;
  cyan: Color;
  teal: Color;
  green: Color;
  lightGreen: Color;
  lime: Color;
  yellow: Color;
  amber: Color;
  orange: Color;
  deepOrange: Color;
  brown: Color;
  grey: Color;
  blueGrey: Color;
  black: Color;
  text: string;
  placeholderTextColor: string;
}

export interface Theme {
  key: string;
  name: string;
  colors: ThemeColors;
}
```

![theme.png](/img/fr/theme_purple.png)

Les couleurs de l'application sont divisées en trois attributs :

- **background** : cette couleur doit correspondre à la couleur principale de l’objet.
- **background_light** : il s’agit ici de la couleur prinicpale avec une opacité plus faible (70%) permettant d’être plus discrète et plus facile pour la lecture.
- **foreground** : cette couleur doit être utilisée pour tout élément positioné au-dessus des couleurs background ou background_light. Elle a été calculé afin d’optimiser le [contraste](https://coolors.co/contrast-checker/112a46-acc8e5) avec la couleur de fond et ainsi optimiser la lecture.

Il est également possible de venir personnaliser l’application en ajoutant d’autres thèmes et/ou en re-définissant le thème par défaut via les attributs _themes_ (Theme[]) et _defaultTheme_ (Theme) du composant **Application.**

## Écriture

Il existe un système similaire pour les styles d’écriture afin de simplifier le code.

- Il est donc possible de créer des thèmes d’écritures.
- Le thème actif est accessible via le hook `useWritingStyle`. Il existe également un hook useWritingType qui permet de renvoyer la valeur du thème actif par rapport à la clé fournie en argument (`title | subtitle | important | details | undefined`)
- La structure des thèmes est la suivante :

  ```tsx
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

- L’application propose un thème principal mais il est également possible d’ajouter des thèmes et de redéfinir le thème par défaut depuis les attributs _writingThemes_ (Writing[]) et _defaultWritingTheme_ (Writing) du composant **Application.**

  ```tsx
  export const writingDefaultTheme: Writing = {
    key: 'default',
    name: 'Default',
    style: {
      defaultSize: 14,
      title: {fontSize: 16, fontWeight: 'bold', fontStyle: 'normal'},
      subTitle: {fontSize: 16, fontWeight: 'normal', fontStyle: 'normal'},
      textImportant: {fontSize: 14, fontWeight: 'bold', fontStyle: 'normal'},
      textDetails: {fontSize: 14, fontWeight: 'normal', fontStyle: 'italic'},
    },
  };
  ```
