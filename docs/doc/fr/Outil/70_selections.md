---
slug: /selections
sidebar_position: 70
description: ''
---

# Gestion des sélections

Afin de simplifier la gestion des sélections ainsi que leur modification en fonction des données de l'ERP ou à travers un autre module, la base de l'application permet de venir renseigner les sélections nécessaires pour chaque objet.

Chaque module lors de son export peut alors venir renseigner une liste de configuration dans son attribut _models.typeObjects_ :

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

L'interface _ModuleSelections_ contient alors une liste de noms de modèles avec la définition des champs de sélections associés. Il est possible de venir définir une clé spécifique pour le nom du type pour éviter les conflits entre les modules lorsqu'il s'agit du même objet. Par défaut, si aucune clé n'est renseignée alors c'est le nom de l'objet qui est utilisé.

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

Une sélection est alors définie avec les propriétés suivantes :

- _overrideMethod_: définit la manière de réécriture de la sélection lors de la surcharge par le web ou par un autre module de l'application.
- _useWebContent_: définit si la configuration doit être récupérée du web ou non.
- _content_: définit la liste des options sur la sélection avec la clé associée, la valeur, le titre et optionnellement un ordre et une couleur.

Les sélections des différents modules sont alors rassemblées lors du build de l'application et les configurations du web sont récupérées après la connexion de l'utilisateur.

Il existe deux méthodes pour récupérer une sélection pour permettre leur utilisation dans toutes les situations, que ce soit dans un appel API où les hooks ne sont pas accessibles ou dans un composant où il est important d'éviter les refresh inutiles.

- _getTypes_ : une simple fonction qui renvoit les données du provider.
- _useTypes_ : un hook qui renvoit les données du provider avec un useMemo.

Les deux outils renvoient les types sous le même format, à savoir :

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

Pour chaque sélection d'un modèle, l'objet contient la liste complète des options (dans l'attribut _list_) ainsi que chaque clé définie avec sa valeur associée.

Par exemple, pour la définition des statuts d'un événement dans le module CRM, nous aurions dans l'export du module :

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

Le type d'un événement serait alors récupéré sous la forme suivante :

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

L'application met également des outils à disposition pour faciliter l'utilisation des types :

- _getItemColor_ : permet de récupérer la couleur d'un item en fonction de sa sélection et de sa valeur.
- _getItemTitle_ : permet de récupérer le titre traduit d'un item en fonction de sa sélection et de sa valeur.
- _getSelectionItems_ : permet de récupérer la liste complète de la sélection où chaque valeur est déjà associée à sa couleur et à son titre traduit.
- _getItemColorFromIndex_ : permet de récupérer la couleur d'un item en fonction d'une sélection personnalisée depuis le web grâce à un objet et de sa valeur. La couleur sera calculée en fonction de son index dans la liste.
- _getCustomSelectionItems_ : permet de récupérer la liste complète d'une sélection personnalisée depuis le web grâce à un objet où chaque valeur est déjà associée à sa couleur et à son titre en utilisant le nom du champs donné en arguments. La couleur sera calculée en fonction de son index dans la liste.

Cela permet de simplifier la création des Pickers par exemple :

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
