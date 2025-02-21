---
sidebar_position: 50
description: ''
---

# Store management

The creation of the store and its access from the outside are managed by the core library. The store corresponds to the storage of information retrieved from API calls. The link between the state of the store and the data retrieved from API calls is made using reducers. These reducers are asynchronous functions that can be used to perform queries and dispatch data to the various objects in the store.

The core library provides a _handlerApiCall_ function to simplify the writing of asynchronous reducer functions, encapsulating both error handling and data retrieval success.

```tsx
interface ApiHandlerProps {
  fetchFunction: (data: any) => Promise<any>; // API Function
  data: any; // Data for the request
  action: string; // Action description (translation key)
  getState: () => any; // Function to get store state
  responseOptions?: {
    showToast?: boolean; // Display success toast
    isArrayResponse?: boolean; // Response should be an array
    returnTotal?: boolean; // Returns the total number of elements respecting the query in the database
	  returnResponseMessage?: boolean; // Returns the query response in addition to the data
	};
	errorOptions?: {
    showErrorToast?: boolean; // Displays a toast when a query error occurs
    errorTracing?: boolean; // Creates a traceback on request errors
  };
}

export const handlerApiCall = ({
  fetchFunction,
  data,
  action,
  getState,
  responseOptions= {
    showToast: false,
    isArrayResponse: false,
    returnTotal: false,
		resturnTotalWithData: false;
    returnResponseMessage: false,
  },
  errorOptions = {showErrorToast: true, errorTracing: true},
}: ApiHandlerProps)
```

When creating the asynchronous function, it's important to respect the following nomenclature for creating the type: `<slice name>/<function name>`. There is also a nomenclature for creating the translation keys used to describe the action executed: `<module name>SliceAction<action>`. In addition, to make translation files easier to read, translations for reducer actions are grouped together at the end of the files.

Next, we need to build a slice to indicate the behavior to be adopted in the various query states (pending, rejected or fulfilled). In order to access the store state for this slice, it must be exported, then the reducer created must be exported so that it can be added to the module export.

As an example, the following code corresponds to the creation of a reducer to retrieve a list of units from the ERP web instance.

```jsx
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {searchUnit} from '../api/unit-api';

export const fetchUnit = createAsyncThunk(
  'unit/fetchUnit',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: searchUnit,
      data,
      action: 'Stock_SliceAction_FetchUnits',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingUnit: false,
  unitList: [],
};

const unitSlice = createSlice({
  name: 'unit',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUnit.pending, state => {
      state.loadingUnit = true;
    });
    builder.addCase(fetchUnit.fulfilled, (state, action) => {
      state.loadingUnit = false;
      state.unitList = action.payload;
    });
  },
});

export const unitReducer = unitSlice.reducer;
```

The core package also provides a utility function for setting up the reducers required for an Infinite Scroll request:

```tsx
const generateInifiniteScrollCases = (
  builder: ActionReducerMapBuilder<any>,
  actionCreator: any,
  keys: {
	  loading: string;
	  moreLoading: string;
	  isListEnd: string;
	  list: string;
	  total?: string;
	},
  options?: {
    manageTotal?: boolean;
    parseFunction?: (data: any[]) => any[];
  },
)
```

This function allows you to create the three states of a reducer (pending, fulfilled & rejected) and manage the attribute values required for infinite processing:

- **loading**: indicates whether the data on the first page is loading. At the end of the request, the entire list will be overwritten by the data received.
- **moreLoading**: lets you know when the user is loading the rest of the list (loading a page other than the first). The data obtained will be added to the end of the existing list.
- **isListEnd**: lets you know if all data has been loaded, thus avoiding unnecessary queries.
- **list**: contains data retrieved from the server.
- **total** : contains the total number of elements present on the server and responding to the request. This attribute is updated only if the _manageTotal_ option is enabled and the function passed to the _actionCreator_ attribute has enabled the _resturnTotalWithData_ or _returnResponseMessage_ option.

In the index file of the features folder containing all the module's slices, this reducer must then be exported under a simpler name, allowing subsequent access to its state:

![architecture_slices.png](/img/en/architecture_slices.png)

```tsx
export {catalogReducer as catalog} from './catalogSlice';
export {clientReducer as client} from './clientSlice';
export {contactReducer as contact} from './contactSlice';
export {eventReducer as event} from './eventSlice';
export {functionReducer as function} from './functionSlice';
export {leadReducer as lead} from './leadSlice';
export {opportunityReducer as opportunity} from './opportunitySlice';
export {partnerReducer as partner} from './partnerSlice';
export {prospectReducer as prospect} from './prospectSlice';
```

Once the reducers have been exported under a new name, they must be exported with the module in the dedicated attribute so that the core module can add them to the store.

:::caution
Please note that if reducers from different modules have the same name, they will be overwritten by the last module taken into account. It is therefore preferable to identify the origin of the reducer in its name to avoid errors.
:::

```tsx
import {Module} from '@axelor/aos-mobile-core';
...
import * as myModuleReducers from './features';

const myModule : Module {
  name: "my-module-key";
  title: "MyModule_Name";
  subtitle: "MyModule_SubName";
  icon: ...;
  menus: {...};
  screens: {...};
	translations: {...},
	reducers: {...myModuleReducers},
  models: {...}
}
```

Once the exports are complete, you can access the contents of the store from screens or components using the core package hook, indicating the reducer to be used and the corresponding state attributes to be retrieved: `useSelector`. The component will be updated whenever the state value changes.

```tsx
import {useSelector} from '@axelor/aos-mobile-core';

...

const {stateProps} = useSelector((state: any) => state.reducerName);
```

The _core_ package also provides a second hook `useDispatch` to retrieve a function to perform the actions defined in the reducers.

```tsx
import {useDispatch} from '@axelor/aos-mobile-core';
import {actionName} from '../../../../features/...Slice';

...

const dispatch = useDispatch();

...

const realizeAction = useCallback(
  () => {
     dispatch(actionName(data));
  },
  [dispatch, data],
);
```
