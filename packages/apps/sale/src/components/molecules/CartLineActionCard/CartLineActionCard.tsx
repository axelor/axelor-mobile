/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useCallback, useMemo} from 'react';
import {
  useDispatch,
  useNavigation,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ActionCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {CartLineCard} from '../../atoms';
import {
  addToCart as addToCartAction,
  deleteCartLine,
  updateCartLine,
} from '../../../features/cartLineSlice';
import {fetchProductById} from '../../../features/productSlice';

interface CartLineActionCardProps {
  style?: any;
  cartLine: any;
  cartId?: number;
  product?: any;
  hideIncrement?: boolean;
  hideDelete?: boolean;
  hideVariant?: boolean;
  hideBadgeInformation?: boolean;
  addToCart?: boolean;
}

const CartLineActionCard = ({
  style,
  cartLine,
  product,
  cartId,
  hideIncrement,
  hideDelete,
  hideVariant,
  hideBadgeInformation,
  addToCart = false,
}: CartLineActionCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const _product = useMemo(
    () => product || cartLine?.product,
    [cartLine?.product, product],
  );

  const handleVariantPress = useCallback(() => {
    dispatch(
      (fetchProductById as any)({
        productId: product ? product.id : cartLine?.variantProduct?.id,
      }),
    );
    product
      ? navigation.navigate('CatalogVariantScreen')
      : navigation.navigate('VariantProductsScreen');
  }, [dispatch, navigation, product, cartLine?.variantProduct?.id]);

  const handleDeletePress = useCallback(() => {
    dispatch((deleteCartLine as any)({cartLineId: cartLine?.id, cartId}));
  }, [dispatch, cartLine?.id, cartId]);

  const handleIncrementPress = useCallback(() => {
    if (product) {
      dispatch((addToCartAction as any)({product}));
    } else {
      dispatch(
        (updateCartLine as any)({
          cartLine,
          qty: parseInt(cartLine?.qty, 10) + 1,
          cartId,
        }),
      );
    }
  }, [dispatch, product, cartLine, cartId]);

  const handleDecrementPress = useCallback(() => {
    dispatch(
      (updateCartLine as any)({
        cartLine,
        qty: parseInt(cartLine?.qty, 10) - 1,
        cartId,
      }),
    );
  }, [dispatch, cartLine, cartId]);

  return (
    <ActionCard
      style={style}
      actionList={[
        {
          iconName: 'plus-lg',
          helper: I18n.t('Sale_AddOne'),
          onPress: handleIncrementPress,
          hidden: hideIncrement && !addToCart,
        },
        {
          iconName: 'palette2',
          helper: I18n.t('Sale_SeeVariants'),
          onPress: handleVariantPress,
          hidden:
            (cartLine?.variantProduct == null &&
              product?.productVariant == null) ||
            hideVariant,
        },
        {
          iconName: 'trash3-fill',
          helper: I18n.t('Sale_RemoveFromCart'),
          onPress: handleDeletePress,
          iconColor: Colors.errorColor.background,
          large: cartLine?.variantProduct == null,
          hidden: hideDelete,
        },
        {
          iconName: 'dash-lg',
          helper: I18n.t('Sale_RemoveOne'),
          disabled: cartLine?.qty <= 1,
          onPress: handleDecrementPress,
          hidden: hideIncrement,
        },
      ]}
      translator={I18n.t}>
      <CartLineCard
        product={_product}
        qty={cartLine?.qty}
        unit={cartLine?.unit?.name}
        hideBadgeInformation={hideBadgeInformation}
        onPress={() => {
          product == null &&
            navigation.navigate('CartLineDetailsScreen', {
              cartLineId: cartLine?.id,
            });
        }}
      />
    </ActionCard>
  );
};

export default CartLineActionCard;
