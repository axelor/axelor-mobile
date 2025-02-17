---
slug: /quick_actions
sidebar_position: 100
description: ''
---

# Gestion des actions rapides

Il est parfois nécessaire d'ajouter des actions rapides sur un certain nombre d'écrans mais cela est très coûteux de surcharger chaque écran pour ajouter les différents outils. Pour simplifier ces ajouts, la base de l'application contient donc une boîte à outils que chaque module peut venir agrémenter d'actions rapides. Ces actions pourront alors être affichées sur tous les écrans en fonction de la configuration donnée.

Chaque module lors de son export peut venir renseigner une liste d'outils dans son attribut _globalTools_ :

```tsx
interface ToolData {
  dispatch: Dispatch<any>;
  storeState: any;
  screenContext: any;
}

interface ActionToolData extends ToolData {
  navigation: any;
}

export interface Tool {
  key: string;
  order?: number;
  title?: string;
  iconName: string;
  color?: string;
  hideIf?: (data: ToolData) => boolean;
  disabledIf?: (data: ToolData) => boolean;
  onPress: (data: ActionToolData) => void;
}

export interface Module {
  name: string;
  ...
  globalTools?: Tool[];
}
```

Un outil est défini avec les propriétés suivantes :

- _key_ : identifiant de l'action pour permettre la surcharge entre les modules.
- _order_ : ordre de l'action dans la liste. L'action avec l'ordre le plus bas apparaîtra au plus haut dans la boîte à outils.
- _title_ : clé de traduction à utiliser pour le titre affiché dans la boîte à outils à côté de l'action.
- _iconName_ : nom de l'icon [Bootstrap](https://icons.getbootstrap.com/) à afficher sur le bouton.
- _color_ : clé de la couleur à afficher. La couleur par défaut est `'primaryColor'`.
- _hideIf_ : fonction permettant de définir la condition d'affichage de l'outil. Cette fonction prend en arguments l'état du store de l'application et le contexte de l'écran actuel.
- _disabledIf_ : fonction permettant de définir la condition d'activation de l'outil. Cette fonction prend en arguments l'état du store de l'application et le contexte de l'écran actuel.
- _onPress_ : fonction permettant de définir le comportement de l'outil. Cette fonction prend en arguments l'état du store, le contexte de l'écran et les outils dispatch & navigation pour réaliser un appel API ou une navigation vers un écran spécifique.

Voici un exemple de définition d'un outil dans le module Ventes pour ajouter un produit dans le panier de l'utilisateur :

```tsx
export const SaleModule: Module = {
  name: 'app-sale',
  ...
  globalTools: [
    {
      key: 'sale_activeCart_addProduct',
      iconName: 'cart-plus-fill',
      hideIf: ({screenContext, storeState}) => {
        return (
          !storeState.appConfig?.sale?.isCartManagementEnabled ||
          screenContext?.productId == null
        );
      },
      onPress: ({dispatch, screenContext, storeState}) => {
        dispatch(
          addProductToUserCart({
            productId: screenContext.productId,
            userId: storeState.auth?.userId,
          }),
        );
      },
    },
  ],
};
```

Pour définir le contexte d'un écran, il suffit d'utiliser le hook `useContextRegister` et de transmettre les données associées en arguments :

```tsx
import React from 'react';
import {Screen} from '@axelor/aos-mobile-ui';
import {useContextRegister} from '@axelor/aos-mobile-core';

const ProductDetailsScreen = ({route}) => {
  const {productId} = route.params.productId;

  useContextRegister({productId});

  ...

  return (...);
};

export default ProductDetailsScreen;
```
