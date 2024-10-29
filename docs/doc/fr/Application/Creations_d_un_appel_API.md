---
sidebar_position: 2
description: ''
---

# Création d’un appel API

## Gestion des champs

Afin de permettre de surcharger facilement les différentes caractéristiques des requêtes API, il est possible de créer des configurations pour chaque modèle via trois objets.

Chaque module a la responsabilité de générer ses propres modèles et de surcharger les modèles d’un autre module si nécessaire.

Il faut donc aujouter dans l’architecture un dossier models qui va contenir un fichier par type de configuration ainsi qu’un fichier index afin de faciliter l’export.

![architecture_fields.png](/img/fr/architecture_fields.png)

- Les champs de recherche pour chaque objet au format _SearchFields_. Il s’agit en réalité d’un objet format json associant une clé à une liste de string, chacun correspondant à un champ de l’objet. Pour surcharger ces champs de recherche, il suffit de venir définir une nouvelle liste associée à la même clé avec les champs de recherche à ajouter.

```tsx
import {SearchFields} from '@axelor/aos-mobile-core';

export const stock_searchFields: SearchFields = {
  stock_customerDelivery: ['stockMoveSeq'],
  stock_internalMove: ['stockMoveSeq'],
  stock_inventory: ['inventorySeq'],
  stock_product: ['name', 'code', 'serialNumber'],
  stock_stockLocation: ['name', 'serialNumber'],
  stock_supplierArrival: ['stockMoveSeq'],
};
```

- Les champs de tri pour chaque objet au format _SortFields_. Il s’agit en réalité d’un objet format json associant une clé à une liste de string, chacun correspondant à un champ de l’objet. Pour définir un ordre décroissant sur un champ, il suffit d’ajouter un ‘-’ devant le nom du champ. Ainsi, “name” va classer les éléments récupérés par ordre croissant alors que “-name” va les classer dans l’ordre décroissant. Il est possible d’indiquer plusieurs règles de tri pour un même objet. Les éléments récupérés seront alors classés par chaque règle définie par ordre d’apparition dans la liste. Par exemple, pour la liste de règles [”-name”, “createdOn”], les éléments sont classés par ordre décroissant du nom puis par ordre croissant de date de création. Pour surcharger ces règles de tri, il suffit de venir définir une nouvelle liste associée à la même clé avec les nouvelles règles. Cette nouvelle liste remplace la précédente.

```tsx
import {SortFields} from '@axelor/aos-mobile-core';

export const stock_sortFields: SortFields = {
  stock_product: ['name'],
  stock_stockCorrection: ['statusSelect', '-validationDateT', 'createdOn'],
  stock_trackingNumber: ['trackingNumberSeq'],
};
```

- Les champs à récupérer pour chaque objet au format _ObjectFields_. Il s’agit d’un objet au format json associant une clé à un **schéma [YUP](https://www.npmjs.com/package/yup?activeTab=readme).** Pour construire un schéma pour un objet, il suffit d’utiliser l’outil _schemaConstructor_ du package CORE qui permet de donner accès à l’ensemble des types de définition proposés par la librairie YUP.

  - _Object_ : un objet json dans lequel il faut définir l’ensemble des attributs ainsi que leur type.

    ```tsx
    schemaContructor.object({
        props1: schemaContructor.string(),
        props2: schemaContructor.number(),
        props3: schemaContructor.boolean(),
        ...
    })
    ```

  - _Array_ : un tableau d’éléments, il est nécessaire de définir le type des éléments à l’intérieur

    ```tsx
    schemaContructor.array().of(schemaContructor.string());
    ```

  - _Date_ : un objet Date de javascript

    ```tsx
    schemaContructor.date();
    ```

  - _String_ : un string

    ```tsx
    schemaContructor.string();
    ```

  - _Number_ : un nombre

    ```tsx
    schemaContructor.number();
    ```

  - _Boolean_ : un booléen

    ```tsx
    schemaContructor.boolean();
    ```

  - _SubObject_ : un objet avec les pré-requis d’AOP à savoir l’id et la version

    ```tsx
    schemaContructor.subObject();
    // Equivalent to :
    schemaContructor.object({
      id: schemaContructor.number(),
      version: schemaContructor.number(),
    });

    schemaContructor.subObject('name');
    // Equivalent to :
    schemaContructor.object({
      id: schemaContructor.number(),
      version: schemaContructor.number(),
      name: schemaContructor.string(),
    });

    schemaContructor.subObject().concat(
      schemaContructor.object({
        props1: schemaContructor.string(),
        props2: schemaContructor.number(),
        props3: schemaContructor.boolean(),
      }),
    );
    // Equivalent to :
    schemaContructor.object({
      id: schemaContructor.number(),
      version: schemaContructor.number(),
      props1: schemaContructor.string(),
      props2: schemaContructor.number(),
      props3: schemaContructor.boolean(),
    });
    ```

Lorsque l'objectif est de récupérer les champs d'un sous-objet, il est possible de les renseigner en tant que structure du sous-objet. Lors de la récupération des noms de champs pour l'appel API, le système fera une transmission automatique des champs relationnels.

    ```tsx
    schemaContructor.object({
      name: schemaContructor.string(),
      object: schemaContructor.subObject().concat(
        schemaContructor.object({
          props1: schemaContructor.string(),
          props2: schemaContructor.number(),
          props3: schemaContructor.boolean(),
        }),
      ),
    });

    // Equivalent to :
    schemaContructor.object({
      name: schemaContructor.string(),
      object: schemaContructor.subObject(),
      'object.props1': schemaContructor.string(),
      'object.props2': schemaContructor.number(),
      'object.props3': schemaContructor.boolean(),
    });
    ```

## Récupération des champs API

Signature de la fonction : `getObjectFields(objectKey: string): string[]`

Cet helper récupère le schéma défini pour la clé donnée en argument puis renvoie la liste des noms des attributs définis à l’intérieur. Dans le cas où le schéma n’est pas trouvé ou qu’il ne contient aucune clé alors cette fonction renvoie une liste vide.

```tsx
const fetchStockMoveFromId = ({id}): Promise<any> => {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.stock.db.StockMove/fetch/${id}`,
    data: {
      fields: getObjectFields('stock_stockMove'),
    },
  });
};
```

## Récupération des règles de tri

Signature de la fonction : `getSortFields(objectKey: string): string[]`

Cet helper récupère les règles définies pour la clé donnée en argument. Dans le cas où l’objet n’est pas trouvé alors cette fonction renvoie une liste avec pour seul élément l’attribut id.

```tsx
const searchStockMoveFrom = ({page}): Promise<any> => {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.stock.db.StockMove/search`,
    data: {
      fields: getObjectFields('stock_stockMove'),
      sortBy: getSortFields('stock_stockMove'),
      limit: 10,
      offset: 10 * page,
    },
  });
};
```

## Récupération des critères de recherche

Signature de la fonction : `getSearchCriterias(objectKey: string, searchValue: string): CriteriaGroup`

Cet helper permet de récupérer une liste de critères par rapport aux champs de recherche associés à la à la clé fournie en argument. Les critères sont construits en mettant en relation chaque champ présent dans la liste avec la valeur de recherche fournie en argument avec un opérateur _like._ La liste contenant l’ensemble des critères est ensuite entouré d’un opérator _or_ :

```jsx
{
	operator: 'or',
	criteria: [
		{
			fieldName: field,
			operator: 'like',
			value: searchValue
    },
    ...
  ]
}
```

## Création d’une requête de recherche standard

Signature de la fonction :

```tsx
interface SearchProps {
  model: string; // Nom du modèle
  criteria?: Criteria[]; // Liste de critères
  domain?: string; // Domain si nécessaire
  domainContext?: any; // Context du domain si nécessaire
  fieldKey: string; // Clé pour accéder aux champs de l'objet
  sortKey?: string; // Clé pour accéder aux règles de tri
  page: number; // Page courante de la recherche
  numberElementsByPage?: number; // Nombre d'éléments à récupérer par page
}

createStandardSearch = ({
    model,
    criteria = [],
    domain = '',
    domainContext = {},
    fieldKey,
    sortKey,
    page = 0,
    numberElementsByPage,
  }: SearchProps): Promise<any>
```

Cet helper permet de créer une requête de recherche standard, en lien avec les web services AOP, de façon simplifiée en n’indiquant que les éléments importants. Le nombre d’éléments par page est par défaut défini à 10 et mais cette valeur peut être modifiée dans le fichier de configuration de l’application. Par ailleurs, si une requête a besoin de supprimer cette limite de récupération d’éléments, il suffit d’indiquer explicitement `numberElementsByPage: null` dans la définition de la requête. La valeur par défaut n’intervient que si _numberElementsByPage_ est **_undefined_**.

## Création d’une requête de récupération standard

Signature de la fonction :

```tsx
interface FetchProps {
  model: string; // Nom du modèle
  fieldKey: string; // Clé pour accéder aux champs de l'objet
  id: number; // Id de l'objet
  relatedFields?: any; // Champs relationnel supplémentaire si nécessaire
}

createStandardFetch = ({
    model,
    fieldKey,
    id,
    relatedFields = {},
  }: FetchProps): Promise<any>
```

Cet helper permet de créer une requête de récupération standard, en lien avec les web services AOP, de façon simplifiée en n’indiquant que les éléments importants.
