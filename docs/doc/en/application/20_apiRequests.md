---
sidebar_position: 2
description: ''
---

# Creating an API call

## Field management

To make it easy to override the various characteristics of API requests, it is possible to create configurations for each template via three objects.

Each module is responsible for generating its own templates, and for overriding the templates of another module if necessary.

We therefore need to add a models folder to the architecture, which will contain a file for each configuration type, as well as an index file to facilitate export.

![architecture_fields.png](/img/en/architecture_fields.png)

- Search fields for each object in _SearchFields_ format. This is actually a json format object associating a key with a list of strings, each corresponding to a field in the object. To override these search fields, simply define a new list associated with the same key and the search fields to be added.

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

- Sort fields for each object in _SortFields_ format. This is actually a json format object associating a key with a list of strings, each corresponding to a field in the object. To define a descending order on a field, simply add a '-' in front of the field name. Thus, "name" will sort retrieved elements in ascending order, while "-name" will sort them in descending order. It is possible to specify several sorting rules for a single object. The items retrieved will then be sorted by each defined rule in order of appearance in the list. For example, for the rule list ["-name", "createdOn"], items are sorted in descending order of name, then in ascending order of creation date. To override these sorting rules, simply define a new list associated with the same key and the new rules. This new list replaces the previous one.

```tsx
import {SortFields} from '@axelor/aos-mobile-core';

export const stock_sortFields: SortFields = {
  stock_product: ['name'],
  stock_stockCorrection: ['statusSelect', '-validationDateT', 'createdOn'],
  stock_trackingNumber: ['trackingNumberSeq'],
};
```

- The fields to be retrieved for each object in _ObjectFields_ format. This is an object in json format associating a key with a **schema [YUP](https://www.npmjs.com/package/yup?activeTab=readme)**. To build a schema for an object, simply use the _schemaConstructor_ tool in the CORE package, which provides access to all the definition types offered by the YUP library.

  - _Object_: a json object in which to define all attributes and their type.
    ```tsx
    schemaContructor.object({
        props1: schemaContructor.string(),
        props2: schemaContructor.number(),
        props3: schemaContructor.boolean(),
        ...
    })
    ```
  - _Array_ : an array of elements, it is necessary to define the type of the elements inside.
    ```tsx
    schemaContructor.array().of(schemaContructor.string());
    ```
  - _Date_ : a javascript Date object
    ```tsx
    schemaContructor.date();
    ```
  - _String_ : a string
    ```tsx
    schemaContructor.string();
    ```
  - _Number_ : a number
    ```tsx
    schemaContructor.number();
    ```
  - _Boolean_ : a boolean
    ```tsx
    schemaContructor.boolean();
    ```
  - _SubObject_ : an object with AOP prerequisites, i.e. id and version

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

When the aim is to retrieve the fields of a sub-object, it is possible to enter them as a sub-object structure. When retrieving field names for the API call, the system will automatically transmit relational fields.

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

## Get API fields

Function signature: `getObjectFields(objectKey: string): string[]`

This helper retrieves the schema defined for the key given as argument, then returns the list of attribute names defined inside. If the schema is not found or does not contain any keys, this function returns an empty list.

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

## Fetch sorting rules

Function signature: `getSortFields(objectKey: string): string[]`

This helper retrieves the rules defined for the key given as an argument. If the object is not found, this function returns a list with the id attribute as the only element.

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

## Fetch search criteria

Function signature : `getSearchCriterias(objectKey: string, searchValue: string): CriteriaGroup`

This helper allows you to retrieve a list of criteria in relation to the search fields associated with the key supplied as an argument. The criteria are constructed by relating each field in the list to the search value supplied as an argument with a _like._ operator. The list containing all the criteria is then surrounded by an _or_ operator:

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
}
```

## Creating a standard search query

Function signature :

```tsx
interface SearchProps {
  model: string; // Model name
  criteria?: Criteria[]; // List of criteria
  domain?: string; // Domain if required
  domainContext?: any; // Domain context if required
  fieldKey: string; // Key to access object fields
  sortKey?: string; // Key to sort rules
  page: number; // Current search page
  numberElementsByPage?: number; // Number of elements to retrieve per page
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

This helper allows you to create a standard search query, in conjunction with AOP web services, in a simplified way by indicating only the important elements. The number of items per page is set to 10 by default, but this value can be modified in the application configuration file. Alternatively, if a query needs to remove this element retrieval limit, simply specify `numberElementsByPage: null` explicitly in the query definition. The default value only comes into play if _numberElementsByPage_ is **_undefined_**.

## Creating a standard recovery request

Function signature :

```tsx
interface FetchProps {
  model: string; // Model name
  fieldKey: string; // Key to access object's fields
  id: number; // Object id
  relatedFields?: any; // Additional relational fields if required
}

createStandardFetch = ({
    model,
    fieldKey,
    id,
    relatedFields = {},
  }: FetchProps): Promise<any>
```

This helper allows you to create a standard retrieval request, linked to AOP web services, in a simplified way by indicating only the important elements.
