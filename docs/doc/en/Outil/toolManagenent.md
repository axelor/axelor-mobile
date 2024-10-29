---
sidebar_position: 10
description: ''
---

# Quick actions management

It is sometimes necessary to add quick actions on a number of screens, but it is very costly to overload each screen to add the various tools. To simplify these additions, the application's base contains a toolbox that each module can enhance with quick actions. These actions can then be displayed on all screens according to the given configuration.

When exported, each module can enter a list of tools in its _globalTools_ attribute:

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

A tool is defined with the following properties:

- _key_: action identifier to enable overloading between modules.
- _order_: action order in the list. The action with the lowest order will appear at the top of the toolbox.
- _title_: translation key to be used for the title displayed in the toolbox next to the action.
- _iconName_ : name of the [Bootstrap](https://icons.getbootstrap.com/) icon to be displayed on the button.
- _color_ : color key to be displayed. The default color is `'primaryColor'`.
- _hideIf_ : function used to define the tool's display condition. This function takes as arguments the state of the application's store and the current screen context.
- _disabledIf_ : function for defining the tool's activation condition. This function takes as arguments the state of the application's store and the current screen context.
- _onPress_: function for defining tool behavior. This function takes as arguments the state of the store, the screen context and the dispatch & navigation tools for making an API call or navigating to a specific screen.

Here's an example of how to define a tool in the Sales module to add a product to the user's cart:

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

To define the context of a screen, simply use the `useContextRegister` hook and pass the associated data as arguments:

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
