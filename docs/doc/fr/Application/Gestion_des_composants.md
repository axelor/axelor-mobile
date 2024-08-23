---
id: Gestion des composants
sidebar_position: 1
sidebar_class_name: icon
---

# Gestion des composants

## Architecture

La librairie _UI_ contient l’ensemble des composants de base pour le développement d’interfaces sur l’application mobile.

Le package core fournit également plusieurs composants, plus spécialisés ou nécessitant une libraire externe complexe (_Camera_, _Scanner_, _DatePicker_, composants liés aux _MailMessages_, …).

Le développement de ces composants est basé sur le principe d’[Atomic Design](https://blog-ux.com/quest-ce-que-latomic-design/). Les composants sont donc divisés entre **atomes**, **molécules**, **organismes** et **templates** :

![atomic_design.png](/img/fr/atomic_design.png)

Les trois premiers types (_atomes_, _molécules_ et _organismes_) correspondent à des composants généralistes qui peuvent être utilisés dans n’importe quel contexte. Le dernier type (_templates_) est utilisé pour des composants spécialisés et responsabilisés, qui possèdent un contexte particulier et parfois même réalisent eux-mêmes des requêtes API ou des actions de navigation.

D’un point de vue de l’architecture, chaque module doit comporter un dossier _components_ avec les différents types de composants présents dans le module. Chaque type de composants est séparé dans un dossier dédié avec un index pour exporter les composants afin de faciliter leur utilisation plus tard.

Il faut également ajouter un fichier index à la racine du dossier _components_ pour centraliser l’utilisation des composants dans les écrans mais également faciliter l’export. En effet, les composants peuvent également servir dans d’autres modules qui en dépendent, il faut donc exporter l’ensemble des composants dans le fichier index à la racine du dossier _src_.

![architecture_component.png](/img/fr/architecture_component.png)

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

D’un point de vue architecture, afin de ne pas surcharger les sources compilées avec des fichiers inutiles, il existe un dossier _stories_ au même niveau que le dossier _src_ dans le package UI. C’est ce dossier qui va contenir toutes les stories du package.

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

Une storie est un cas d’utilisation du composant. Dans la storybook, il faut donc réussir à re-créer tous les cas d’utilisation du composant pour permettre une meilleure documentation. Pour créer une storie, il faut donc créer un nouveau fichier dans le dossier _stories_ dans la bonne catégorie de composant. La nomenclature pour le nom du fichier est `<nom du composant>.stories.tsx`.

Il peut ensuite y avoir deux types de stories : les stories fixes dans le style d’un catalogue ou alors les stories paramétrables où l’utilisateur peut modifier chaque attribut pour faire les combinaisons de son choix.

```tsx
import React from 'react';
import type {Meta} from '@storybook/react';
import {ComponentName as Component} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/<type>/ComponentName',
  component: Component,
};

export default meta;

export const Story1: Story<typeof Component> = {
  name: 'with pre-defined position',
  args: {
    predefinedPosition: 'bottom',
  },
  argTypes: {
    onPress: disabledControl,
  },
  render: args => <Component {...args} />,
};

export const Story2: Story<typeof Component> = {
  name: 'with custom position',
  args: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  argTypes: {
    onPress: disabledControl,
    predefinedPosition: disabledControl,
  },
  render: args => <Component {...args} />,
};
```

```tsx
import React from 'react';
import type {Meta} from '@storybook/react';
import {ComponentName as Component} from '../../src/components/atoms';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/<type>/ComponentName',
  component: Component,
};

export default meta;

export const ComponentName: Story<typeof Component> = {
  args: {
    size: 50,
    name: 'heart-fill',
    touchable: false,
    visible: true,
    color: 'plannedColor',
  },
  argTypes: {
    color: colorPicker,
    onPress: disabledControl,
  },
  render: args => <Component {...args} color={args.color?.background} />,
};
```

Il est ensuite possible d’ajouter autant de stories fixes que nécessaire mais également de mélanger stories fixes et paramétrables. Pour les stories paramétrables, il est possible d’ajouter autant d’atttribut en argument que nécessaire.

Les [différents types d’argument disponibles](https://storybook.js.org/docs/7/essentials/controls) :

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
// Lorsque le composant est entièrement typé, il n'est pas nécessaire de définir les options de sélection.
// Le storybook obtiendra les valeurs directement auprès du composant.
position: {
  control: {
    type: 'radio',
  },
  options: ['right', 'left'],
  defaultValue: 'right',
},

// Travail avec le thème de l'application. Un assistant a été créé pour simplifier l'intégration,
// n'oubliez pas de faire le mappage si seule une couleur est souhaitée et non l'objet complet :
// color={args.color?.background}
_color: colorPicker,
```

:::caution
La gestion des champs object n’est pas très bien faite sur le storybook. Il n’est pas possible de définir la structure de l’objet attendu et pour l’utilisateur, modifier un champs de type object est assez difficile car il faut reconstruire l’objet json dans un éditeur texte. Dans le cas où le format de l’objet attendu est connu, il est plutôt conseiller de créer un attribut par champs attendu de l’objet puis reconstruire l’objet dans les props du composant par la suite. Un exemple avec l’objet suivant :

```tsx
// Structure de l'objet attendu
icon ?: {
	color: string;
	name: string;
}

// Création des paramètres pour la story et mapping dans le rendu
export const ComponentName: Story<typeof Component> = {
  args: {
    _iconName: 'qrCode',
    _iconColor: 'primaryColor',
  },
  argTypes: {
    _iconColor: colorPicker
  },
  render: args => (
    <Component
      {...args}
      icon={{name: args._iconName, color: args._iconColor}}
    />
  ),
};
```

:::

Quelques commandes importantes à exécuter à la racine du projet pour la storybook :

- ouvrir la storybook : `yarn storybook`
- build la storybook : `yarn storybook:build`

:::info
💡 Ne pas hésiter à regarder les stories existantes lors de la création d’une nouvelle storie, elles représentent déjà un certain nombre de cas d’utilisation qui peuvent être utiles.
:::

## Création d’une card

Il est souvent nécessaire pour la création des différents écrans de créer un composant card. Afin de standardiser ces components et faciliter leur création, l’application propose un component standard auquel il suffit de configurer les informations à afficher : **ObjectCard**.

Il existe deux types d’éléments pour la carte :

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

L’élément **TextElement** permet d’afficher des informations textuelles dans les compartiments _upperTexts_ et _lowerTexts_.

L’information textuelle peut être transmise à travers les attributs _indicatorText_ et/ou _displayText_ qui l’affichera en gras. Il est également possible de définir l’élément comme étant un titre (_isTitle_) afin de l’afficher en gras et en plus gros. Pour les titres, il faut donner l’information à travers l'attribut _displayText_.

L’élément peut être personnalisé avec un icon, la taille d’écriture et/ou la couleur du texte et de l’icône.

Finalement un affichage texte peut être personnalisé avec un composant différent avec l’attribut _customComponent_.

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

L’élément **BadgeElement** permet d’afficher des informations dans les compartiments _upperBadges_ et _lowerBadges_.

Il est possible de personnaliser la texte et la couleur du badge, à travers les attribut _displayText_ et _color_, mais également de définir un composant de remplacement avec l’attribut _customComponent_.

La card est donc divisée est plusieurs compartiments, tous paramétrables et facultatif. La card affichera seulement les compartiments contenant de la données.

![explanation_objectCard.png](/img/fr/explanation_objectCard.png)

Les compartiments **upperBadges**, **upperTexts**, **sideBadges**, **lowerTexts** et **lowerBadges** prennent en structure d’entrée une liste d’éléments du bon type en fonction de l’attribut (_TextElement_ ou _BadgeElement_) ainsi qu’un attribut de style afin de personnaliser le conteneur. Il est également possible d’inverser le sens d’affichage des badges dans les compartiments **upperBadges** et **lowerBadges** avec l’attribut _fixedOnRightSide_.

Le dernier compartiment permet de contenir une **image**, facultative, en définissant les propriétés de base d’une image :

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

## Gestion des icônes SVG

Pour les icônes, l'application supporte deux librairies : [FontAwesome](https://fontawesome.com/icons) et [Bootstrap](https://icons.getbootstrap.com/). Pour les icônes Bootstrap, nous utilisons la base de données svg dans le composant `BootstrapIcon`. Nous avons créé un script pour générer une map entre le nom de l'icône et les données svg qui peut être trouvée dans le dossier `icons/` des sources du package ui. Cette construction nous permet de créer des icônes personnalisées à partir d'un fichier SVG dans le dossier `scripts/` du package ui.

Lors de l'ajout d'une nouvelle icône, il est important de s'assurer que le SVG ajouté est compatible avec la viewBox utilisée dans le composant `BootstrapIcon` :

```tsx
<Svg viewBox="0 0 16 16">...</Svg>
```

Dans le cas de viewBox="0 0 16 16", cela signifie que le dessin est positionné à partir du point (0,0) en haut à gauche et s'étend sur une largeur et une hauteur de 16 unités chacune. Cela crée un cadre carré dans lequel votre SVG doit s'insérer. Tous les éléments du SVG doivent être conçus pour tenir dans cette zone afin de s'afficher correctement.

Pour adapter un SVG à cette viewBox, il existe plusieurs solutions :

- Lors de la création du SVG, il est important de le créer directement dans le format approprié.
- Si vous récupérez un SVG à partir d'une icône existante, redimensionnez le fichier SVG pour qu'il s'adapte au format requis.

## Points sensibles iOS

Afin de permettre un support sur la plateforme iOS, il faut noter plusieurs points sur lesquels porter une attention particulière :

- La propriété de style **elevation** n'est pas supportée sur iOS, il faut donc utiliser les propriétés "_shadow_...” :

  ```css
  elevation: 3,
  shadowOpacity: 0.5,
  shadowColor: Colors.secondaryColor.background,
  shadowOffset: {width: 0, height: 2},
  ```

- La propriété de style **zIndex** ne fonctionne pas pour les vues imbriquées, il faut bien faire attention à ce que toutes les vues au-dessus possèdent également un attribut _zIndex_ avec une valeur inférieure pour que cela fonctionne.
- Un nouveau composant **KeyboardAvoidingScrollView** a été créé afin de ne pas avoir à redéfinir les propriétés iOS/Android etc pour la position du clavier. Il faut donc favoriser l'utilisation de ce composant plutôt que le _KeyboardAvoidingView_ de react-native.
- Les styles de bordure **dotted** ou **dashed** ne sont pas supportés par iOS, il faut donc ajuster le comportement pour la plateforme iOS :

  ```css
  borderStyle: Platform.OS === 'ios' ? 'solid' : 'dotted'
  ```
