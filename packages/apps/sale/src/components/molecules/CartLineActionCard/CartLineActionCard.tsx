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

import React from 'react';
import {
  useDispatch,
  useNavigation,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ActionCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {CartLineCard} from '../../atoms';
import {deleteCartLine, updateCartLine} from '../../../features/cartLineSlice';
import {fetchProductById} from '../../../features/productSlice';

interface CartLineActionCardProps {
  style?: any;
  cartLine: any;
  cartId: number;
  hideIncrement?: boolean;
  hideDelete?: boolean;
  hideBadgeInformation?: boolean;
}

const CartLineActionCard = ({
  style,
  cartLine,
  cartId,
  hideIncrement,
  hideDelete,
  hideBadgeInformation,
}: CartLineActionCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <ActionCard
      style={style}
      actionList={[
        {
          iconName: 'palette2',
          helper: I18n.t('Sale_SeeVariants'),
          onPress: () => {
            dispatch(
              (fetchProductById as any)({
                productId: cartLine?.variantProduct.id,
              }),
            );
            navigation.navigate('VariantProductsScreen');
          },
          hidden: cartLine?.variantProduct == null,
        },
        {
          iconName: 'trash3-fill',
          helper: I18n.t('Sale_RemoveFromCart'),
          onPress: () => {
            dispatch(
              (deleteCartLine as any)({
                cartLineId: cartLine?.id,
                cartId: cartId,
              }),
            );
          },
          iconColor: Colors.errorColor.background,
          large: cartLine?.variantProduct == null,
          hidden: hideDelete,
        },
        {
          iconName: 'plus-lg',
          helper: I18n.t('Sale_AddOne'),
          onPress: () => {
            dispatch(
              (updateCartLine as any)({
                cartLine,
                qty: parseInt(cartLine.qty, 10) + 1,
                cartId: cartId,
              }),
            );
          },
          hidden: hideIncrement,
        },
        {
          iconName: 'dash-lg',
          helper: I18n.t('Sale_RemoveOne'),
          disabled: cartLine.qty <= 1,
          onPress: () => {
            dispatch(
              (updateCartLine as any)({
                cartLine,
                qty: parseInt(cartLine.qty, 10) - 1,
                cartId: cartId,
              }),
            );
          },
          hidden: hideIncrement,
        },
      ]}
      translator={I18n.t}>
      <CartLineCard
        product={cartLine.product}
        qty={cartLine.qty}
        unit={cartLine.unit?.name}
        hideBadgeInformation={hideBadgeInformation}
        onPress={() => {
          navigation.navigate('CartLineDetailsScreen', {
            cartLineId: cartLine.id,
          });
        }}
      />
    </ActionCard>
  );
};

export default CartLineActionCard;
