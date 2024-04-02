---
id: Création d’un écran
sidebar_position: 3
sidebar_class_name: icon
---

# Création d’un écran

## Architecture

Un écran dans l’application est en fait simplement un composant. La librairie UI fournit un composant `Screen` qui permet de faire une base de l’écran. Il suffit ensuite de fournir l’ensemble du contenu de l’écran en tant qu’enfants.

Au niveau de l’architecture, afin de bien distinguer les écrans des composants standards, tous les écrans sont stockés dans un dossier **screens** qui peut ensuite être redivisé en fonction des fonctionnalités pour ajouter un peu d’ordre dans le dossier. Chaque dossier d’écrans doit contenir un fichier index afin de faciliter l’export.

La librairie core fournit un typage pour la structure des écrans avec les informations nécessaires à l’enregistrement dans la navigation des différents écrans. Un écran est définit par une clé puis différents attributs :

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

- un titre (_title_) à afficher dans le header lorsque l’utilisateur se trouve sur la page. Il doit s’agir en réalité d’une clé de traduction afin de faciliter l’internationalisation de l’application.
- le composant correspondant au contenu de l’écran (_component_)
- une clé _actionID_ pour relier l'écran à une configuration d'actions à afficher dans le header.
- des options pour l’affichage de l’écran comme par exemple la possibilité d’avoir ou non un header avec une ombre. Le header a par défaut une ombre, il n’est donc pas nécessaire de fournir cet attribut lorsque l’ombre est voulue.
- un bouléen _isUsableOnShortcut_ pour indiquer si l'écran peut être utilisé dans un raccourci sur l'écran d'accueil.

Il suffit ensuite d’exporter tous les écrans sous cette forme :

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
Tous les écrans définis dans le module doivent être exportés sinon l’application ne sera pas capable d’y accéder.
:::

Lors de la surcharge d’un écran, il suffit de venir créer un nouvel écran en modifiant les éléments à changer sur l’écran de base. Puis, une fois le composant créé, venir l’exporter avec la même clé que dans le module d’origine. Ainsi, lors de l’enregistrement dans la navigation, seul le dernier écran avec la même clé sera pris en compte.

## Création d’une vue formulaire

Afin de faciliter et standardiser la création de vues formulaires, l’application propose un outil générique permettant de générer des vues formulaires par rapport à une configuration donnée.

Définir une configuration correspond à associer une clé à un ensemble de **fields** et **panels**.

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
    [fieldName: string]: (values: DependsOnStates) => any;
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

Un field est défini à travers plusieurs attribut :

- _parentPanel_ : le nom du panel dans lequel le champs doit s’afficher
- _order_ : ordre du champs dans la vue / le panel.
- _titleKey_ : clé de traduction pour le titre du champs.
- _helperKey_ : clé de traduction pour le helper qui sera affiché à côté du champs. Ce helper permet d’expliquer l’utilité du champs à l’utilisateur si cela est nécessaire.
- _type_ : définition du typage du champs pour définir l’affichage par défaut mais aussi permettre la vérification de l’intégrité des données du formulaire. Les typages acceptés dans la vue formulaire sont :

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

- _required_ et _readonly_ permettent de définir un champs comme requis ou en lecture seule.
- _requiredIf_, _readonlyIf_ et _hideIf_ permettent de définir une condition pour laquelle le champs doit être requis, en lecture seule ou caché. Ces trois functions reçoivent en argument les états de l’objet du formulaire et du store global et elles doivent renvoyer un booléen.
- _dependsOn_ : définition d’une condition de mise à jour de la valeur du champs en fonction de la mise à jour d’un autre champs. Il s’agit d’un champs json qui associe le nom du champs duquel dépend le champs actuel en tant que clé et la fonction qui vient définir la nouvelle valeur du champs en fonction des états de l’objet du formulaire, du store global et de la valeur qui vient d’être modifiée.
- _widget_ : définition d’un widget d’affichage pour le champs. Le formulaire assigne par défaut un widget associé au type de champs mais il est possible de demander un autre widget compatible ou bien de définir un widget `‘custom’` qui permet ensuite de définir un composant personnalisé.

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

- _customComponent_ : définition d’un composant d’affichage personnalisé. Cela permet notamment d’afficher une barre de recherche ou bien encore une sélection. Les composants personnalisés doivent avoir uns structure précise pour permettre de transmettre les valeurs au composant.

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
Il faut faire attention lors de l’utilisation des composants custom avec l’attribut hideIf. En effet, l’affichage étant conditionnel, il ne faut pas que le composant utilise des hooks afin d’éviter les erreurs de rendu dus à un nombre de hooks différents entre les différents renders.

L’astuce est donc de créer un composant auxiliaire qui va gérer l’ensemble des hooks puis de créer un composant au-dessus qui transmet seulement les valeurs au composant auxiliaire.

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

- _options_ : permet de transmettrre des options personnalisées aux différents composants afin de personnaliser l’affichage.
- _validationOptions_ : permet de définir des options de validations (valeurs maximale et minimale, entier ou décimal, …). Il s’agit en fait de définir plus précisément le typage du champs avec l’outil [YUP](https://www.npmjs.com/package/yup). Certaines options de typage propose de redéfinir le message d’erreur. Dans le cas où il faut redéfinir un message d’erreur spécifique, il faut penser à utiliser une clé de traduction afin de ne pas nuir à l’internationalisation de l’application.

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

Un panel est défini à travers plusieurs attributs :

- _titleKey_ : clé de traduction pour le titre du panel.
- _isCollapsible_ : permet de définir si un panel doit pouvoir être collapsible.
- _order_ : order du panel dans la vue.
- _colSpan_ : largeur du panel sur la vue. Par défaut, le panel prend toute la largeur de la vue.
- _direction_ : direction d’affichage des éléments (`’row’` affiche les éléments en ligne, `‘column’` affiche les éléments en colonne)
- _parent_ : nom du panel parent.

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

Un formulaire est ensuite donc composé d’un ensemble de _panels_ fourni sous la forme d’un objet JSON, d’un ensemble de _fields_ de la même manière, du nom du modèle pour la construction des actions ainsi que d’une fonction _readonlyIf_ permettant de rendre la vue en lecture seule en fonction de l’état du formulaire et des valeurs du store.

```tsx
interface FormConfigs {
  [formKey: string]: Form;
}
```

Ainsi, chaque module peut venir définir autant de configuration de formulaires que nécessaire sous un format clé-valeur qu’il faut ensuite exporter dans la définition du module dans la catégorie _models_ sous l’attribut **formsRegister**.

Une fois les configurations de formulaire définies, il faut ensuite venir créer l’écran de formulaire de la même manière qu’un écran basique puis utiliser un composant pré-construit pour l’affichage : `FormView`.

Ce composant prend en argument trois éléments :

- defaultValue : la valeur par défaut à afficher sur le formulaire.
- formKey : la clé de la configuration du formulaire définie lors de l’export du module.
- actions : l’ensemble des actions à afficher en bas de la page. Les actions sont construite à travers un template de la même manière que l’ensemble des éléments du formulaire.

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

  Une action est définir à travers plusieurs attributs :

  - _key_ : clé de l’action pour l’unicité des actions
  - _type_ : définition du type d’action pour les configurations par défaut. Cela permet de définir automatiquement le titre et l’action à effectuer lors du clique sur le bouton.
  - _titleKey_ : clé de traduction pour le titre du bouton.
  - _iconName_ : nom de l’icône de la librairie Bootstrap à afficher à côté du titre sur le bouton.
  - _color_ : couleur du bouton.
  - _hideIf_ / _disabledIf_ : fonctions permettant d’ajouter une condition d’affichage / de disponibilité pour le bouton en fonction de l’état du formulaire et des valeurs du store.
  - _customAction_ : action personnalisée à effectuer au clique.
  - _needValidation_ : permet de demander au formulaire de vérifier si les valeurs remplies par l’utilisateur répondent aux contraintes avant d’effectuer l’action. Si le formulaire est correcte alors l’action est effectuée. Dans le cas contraire, l’utilisateur obtient un récapitulatif des éléments à corriger.
  - _needRequiredFields_ : empêche l’utilisateur de cliquer sur le bouton si certains champs requis ne sont pas remplis.
  - _customComponent_ : composant personnalisé pour l'affichage du bouton. L'attribut onPress du composant sera ré-écrit avec l'action qui lui est associée.
