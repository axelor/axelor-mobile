---
sidebar_position: 5
description: ''
---

# Gestion du store

La création du store et son accès depuis l’extérieur est géré par la librairie core. Le store corresponds au stockage des informations récupérées depuis les appels API. Le lien entre l’état du store et les données récupérées depuis les appels API est réalisé grâce à des reducers. Ces reducers sont des fonctions asynchrones qui permettent d’effectuer des requêtes et de dispatcher les données dans les différents objets du store.

La librairie core fournit une fonction _handlerApiCall_ permettant de simplifier l’écriture des fonctions asynchrones des reducers en encapsulant la gestion des erreurs mais également la gestion du succès avec la récupération des données.

```tsx
interface ApiHandlerProps {
  fetchFunction: (data: any) => Promise<any>; // Fonction API
  data: any; // Données pour la requête
  action: string; // Description de l'action en cours d'exécution (clé de traduction)
  getState: () => any; // Fonction permettant d'avoir l'état du state
  responseOptions?: {
    showToast?: boolean; // Affichage d'un toast en cas de succès
    isArrayResponse?: boolean; // La réponse attendue est un tableau ou non
    returnTotal?: boolean; // Renvoie le nombre total d'éléments respectant la requête dans la base
	  returnResponseMessage?: boolean; // Renvoie la réponse de la requête en plus des données
	};
	errorOptions?: {
    showErrorToast?: boolean; // Affiche un toast lors d'une erreur sur la requête
    errorTracing?: boolean; // Crée un traceback lors d'une erreur sur la requête
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

Lors de la création de la fonction asynchrone, il est important de respecter la nomenclature suivante pour la création du type : `<nom du slice>/<nom de la fonction>`. Il existe également une nomenclature pour la création des clés de traduction servant à décrire l’action exécutée : `<nom du module>_SliceAction_<action>`. De plus, pour permettre une meilleure lisibilité des fichiers de traductions, la convention veut que les traductions pour les actions des reducers soient regroupées à la fin des fichiers.

Il faut ensuite construire un slice permettant permettant d’indiquer le comportant à adopter dans les différents états des requêtes (pending, rejected ou fulfilled). Afin de pouvoir accéder à l’état du store pour ce slice, il faut l’exporter puis exporter le reducer ansi créé pour pouvoir l’ajouter à l’export du module.

À titre d’exemple, le code suivant correspond à la création d’un reducer pour récupérer une liste d’unités depuis l’instance web de l’ERP.

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

Le package core fournit également une fonction utilitaire permettant de mettre en place les reducers nécessaires à une requête en Infinite Scroll :

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

Cette fonction permet donc de créer les trois états d’un reducer (pending, fulfilled & rejected) et ainsi gérer les valeurs des attributs nécessaire à un déroulement infini :

- **loading** : permet de savoir si les données de la première page sont en train de charger. À la fin de la requête, la liste entière sera écrasée par les données reçues.
- **moreLoading** : permet de savoir quand l’utilisateur charge la suite de la liste (chargement d’une page autre que la première). Les données obtenues seront ajoutées à la fin de la liste existante.
- **isListEnd** : permet de savoir si toutes les données ont été chargées et ainsi éviter des requêtes inutiles.
- **list** : contient les données récupérées du serveur.
- **total** : contient le nombre total d’élément présent sur le serveur et répondant à la requête. Cet attribut n’est mis à jour que si l’option _manageTotal_ est activée et que la fonction transmise à l’attribut _actionCreator_ a activé l’option _resturnTotalWithData_ ou _returnResponseMessage_ est activée.

Dans le fichier index du dossier features contenant l’ensemble des slices du module, il faut ensuite exporter ce reducer sous un nom plus simple permettant par la suite d’accéder à son state :

![architecture_slices.png](/img/fr/architecture_slices.png)

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

Une fois les reducers exportés sous un nouveau nom, il faut ensuite les exporter avec le module dans l’attribut dédiés pour que le module core puisse les ajouter au store.

:::caution
Si des reducers de modules différents ont le même nom alors ils seront écrasés par le dernier module pris en compte. Il est donc préférable d’identifier la provenance du reducer dans son nom afin d’éviter les erreurs.
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

Une fois les exports finis, il est donc possible d’accéder au contenu du store depuis les écrans ou les composants grâce au hook du package _core_ en indiquant le reducer à utiliser et les attributs du state correspondant à récupérer : `useSelector`. Le composant sera mis à jour à chaque changement de valeur du state.

```tsx
import {useSelector} from '@axelor/aos-mobile-core';

...

const {stateProps} = useSelector((state: any) => state.reducerName);
```

Le package _core_ fournit également un second hook `useDispatch` qui permet de récupérer une fonction pour réaliser les actions définies dans les reducers.

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
