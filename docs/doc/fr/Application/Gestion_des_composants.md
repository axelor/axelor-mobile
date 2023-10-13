---
id: Gestion des composants
sidebar_position: 1
sidebar_class_name: icon 
---
# Gestion des composants

## Architecture

La librairie *UI* contient l’ensemble des composants de base pour le développement d’interfaces sur l’application mobile.

Le package core fournit également plusieurs composants, plus spécialisés ou nécessitant une libraire externe complexe (*Camera*, *Scanner*, *DatePicker*, composants liés aux *MailMessages*, …).

Le développement de ces composants est basé sur le principe d’[Atomic Design](https://blog-ux.com/quest-ce-que-latomic-design/). Les composants sont donc divisés entre **atomes**, **molécules**, **organismes** et **templates** :

![Untitled](/img/fr/Untitled1.png)

Les trois premiers types (*atomes*, *molécules* et *organismes*) correspondent à des composants généralistes qui peuvent être utilisés dans n’importe quel contexte. Le dernier type (*templates*) est utilisé pour des composants spécialisés et responsabilisés, qui possèdent un contexte particulier et parfois même réalisent eux-mêmes des requêtes API ou des actions de navigation.

![Untitled](/img/fr/Untitled2.png)

D’un point de vue de l’architecture, chaque module doit comporter un dossier *components*  avec les différents types de composants présents dans le module. Chaque type de composants est séparé dans un dossier dédié avec un index pour exporter les composants afin de faciliter leur utilisation plus tard.

Il faut également ajouter un fichier index à la racine du dossier *components* pour centraliser l’utilisation des composants dans les écrans mais également faciliter l’export. En effet, les composants peuvent également servir dans d’autres modules qui en dépendent, il faut donc exporter l’ensemble des composants dans le fichier index à la racine du dossier *src.*

```jsx
// Index dans un dossier type d'un composant
export {default as ComponentName} from './ComponentName/ComponentName';

// Index dans le dossier components 
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';

//Index du module

export * from './components';
```

Pour chaque type de l’atomic design, chaque composant doit être séparé dans un dossier dédié. Les noms du dossier, du fichier, du composant à l’intérieur et de l’export doivent être les mêmes.

## Documentation Storybook

Afin de documenter les composants disponibles dans l’application, le projet possède une Storybook avec la librairie [React Storybook](https://storybook.js.org/docs/react/writing-stories/introduction).

À la création ou la modification d’un composant, il faut donc mettre à jour la storybook pour garder une documentation à jour. Pour le moment, le périmètre d’action du storybook est restreint au package UI.

D’un point de vue architecture, afin de ne pas surcharger les sources compilées avec des fichiers inutiles, il existe un dossier *stories* au même niveau que le dossier *src* dans le package UI. C’est ce dossier qui va contenir toutes les stories du package.

```bash
axelor-mobile/
├── .storybook/ [*Configuration du storybook*]
├── packages/
│   ├── ui/
│   │   ├── src/
│   │   └── stories
│   └── ..
└── ...
```

Une fois dans le dossier stories, les composants sont triés par type (atoms, molecules, organisms & templates) sur le même principe que dans les sources du package.

Une storie est un cas d’utilisation du composant. Dans la storybook, il faut donc réussir à re-créer tous les cas d’utilisation du composant pour permettre une meilleure documentation. Pour créer une storie, il faut donc créer un nouveau fichier dans le dossier *stories* dans la bonne catégorie de composant. La nomenclature pour le nom du fichier est `<nom du composant>.stories.tsx`.

Il peut ensuite y avoir deux types de stories : les stories fixes dans le style d’un catalogue ou alors les stories paramétrables où l’utilisateur peut modifier chaque attribut pour faire les combinaisons de son choix.

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

Il est ensuite possible d’ajouter autant de stories fixes que nécessaire mais également de mélanger stories fixes et paramétrables. Cependant, il faut toujours ajouter une storie “default” pour que la storybook puisse compiler correctement. Pour les stories paramétrables, il est possible d’ajouter autant d’atttribut en argument que nécessaire.

Les [différents types d’argument disponibles](https://storybook.js.org/docs/react/essentials/controls#configuration) :

- sans besoin de configuration supplémentaire : text, boolean, object
- possibilité d'ajouter des options : number / range (définition du min, max, step)
- définition des valeurs possibles : select / radio

```tsx
// Paramétrage d'un number
size: {
  control: {
    type: 'number',
    min: 1,
    max: 10,
    step: 1,
  },
  defaultValue: 1,
},

// Select basique 
position: {
  control: {
    type: 'radio',
  },
  options: ['right', 'left'],
  defaultValue: 'right',
},

// Travail avec le thème de l'application. Bien penser à faire le mapping ensuite 
// dans les props du composant : color={lightTheme.colors[args._color]}
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

<aside>
⚠️ La gestion des champs object n’est pas très bien faite sur le storybook. Il n’est pas possible de définir la structure de l’objet attendu et pour l’utilisateur, modifier un champs de type object est assez difficile car il faut reconstruire l’objet json dans un éditeur texte. Dans le cas où le format de l’objet attendu est connu, il est plutôt conseiller de créer un attribut par champs attendu de l’objet puis reconstruire l’objet dans les props du composant par la suite. Un exemple avec l’objet suivant :

```tsx
// Structure de l'objet attendu
icon ?: {
	color: string;
	name: string;
}

// Création des paramètres pour la storie
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

// Mapping dans les props du composant 
<Component {...args} icon={{name: args._iconName, color: args._iconColor}} />
```

</aside>

Quelques commandes importantes à exécuter à la racine du projet pour la storybook :

- ouvrir la storybook : `yarn storybook`
- build la storybook : `yarn build-storybook`

<aside>
💡 Ne pas hésiter à regarder les stories existantes lors de la création d’une nouvelle storie, elles représentent déjà un certain nombre de cas d’utilisation qui peuvent être utiles.

</aside>

## Création d’une card

Il est souvent nécessaire pour la création des différents écrans de créer un composant card. Afin de standardiser ces components et faciliter leur création, l’application propose un component standard auquel il suffit de configurer les informations à afficher : **ObjectCard**.

Il existe deux types d’éléments pour la carte :

```tsx
interface TextElement {
  style?: any;
  displayText?: string;
  indicatorText?: string;
  fontAwesome5?: boolean;
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

L’élément **TextElement** permet d’afficher des informations textuelles dans les compartiments *upperTexts* et *lowerTexts*.

L’information textuelle peut être transmise à travers les attributs *indicatorText* et/ou *displayText* qui l’affichera en gras. Il est également possible de définir l’élément comme étant un titre (*isTitle*) afin de l’afficher en gras et en plus gros. Pour les titres, il faut donner l’information à travers l'attribut *displayText*.

L’élément peut être personnalisé avec un icon, la taille d’écriture et/ou la couleur du texte et de l’icône.

Finalement un affichage texte peut être personnalisé avec un composant différent avec l’attribut *customComponent*

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

L’élément **BadgeElement** permet d’afficher des informations dans les compartiments *upperBadges* et *lowerBadges*.

Il est possible de personnaliser la texte et la couleur du badge, à travers les attribut *displayText* et *color*, mais également de définir un composant de remplacement avec l’attribut *customComponent*.

La card est donc divisée est plusieurs compartiments, tous paramétrables et facultatif. La card affichera seulement les compartiments contenant de la données.

![Untitled](/img/fr/Untitled3.png)

Les compartiments **upperBadges**, **upperTexts**, **sideBadges**, **lowerTexts** et **lowerBadges** prennent en structure d’entrée une liste d’éléments du bon type en fonction de l’attribut (*TextElement* ou *BadgeElement*) ainsi qu’un attribut de style afin de personnaliser le conteneur. Il est également possible d’inverser le sens d’affichage des badges dans les compartiments **upperBadges** et **lowerBadges** avec l’attribut *fixedOnRightSide*.

Le dernier compartiment permet de contenir une **image**, facultative, en définissant les prorpiétés de base d’une image :

```tsx
interface ImageElement {
  source: ImageSourcePropType;
  defaultIconSize?: number;
  resizeMode: ImageResizeMode;
  imageSize?: StyleProp<ImageStyle>;
  generalStyle?: StyleProp<ImageStyle>;
}
```

Afin de faciliter l’intégration d’image sur les cards, le package core fournit trois fonctions utilitaires qui permettent d’obtenir l’URI d’une image provenant d’AOS en fonction du type :

- **useMetafileUri** : pour le formatteur d’une URI à partir d’un MetaFile
- **useBinaryImageUri** et **useBinaryPictureUri** : pour le formatteur d’une URI à partir d’une image binaire.

## Points sensibles iOS

Afin de permettre un support sur la plateforme iOS, il faut noter plusieurs points sur lesquels porter une attention particulière :

- La propriété de style **elevation** n'est pas supportée sur iOS, il faut donc utiliser les propriétés "*shadow*...” :

    ```css
    elevation: 3,
    shadowOpacity: 0.5,
    shadowColor: Colors.secondaryColor.background,
    shadowOffset: {width: 0, height: 2},
    ```

- La propriété de style **zIndex** ne fonctionne pas pour les vues imbriquées, il faut bien faire attention à ce que toutes les vues au-dessus possèdent également un attribut *zIndex* avec une valeur inférieure pour que cela fonctionne.
- Un nouveau composant **KeyboardAvoidingScrollView** a été créé afin de ne pas avoir à redéfinir les propriétés iOS/Android etc pour la position du clavier. Il faut donc favoriser l'utilisation de ce composant plutôt que le *KeyboardAvoidingView* de react-native.
- Les styles de bordure **dotted** ou **dashed** ne sont pas supportés par iOS, il faut donc ajuster le comportement pour la plateforme iOS :

    ```css
    borderStyle: Platform.OS === 'ios' ? 'solid' : 'dotted'
    ```

