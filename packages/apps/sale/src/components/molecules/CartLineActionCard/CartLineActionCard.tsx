/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useState} from 'react';
import {
  useDispatch,
  useNavigation,
  usePermitted,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ActionCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {CartLineCard, VariantPopup} from '../../atoms';
import {deleteCartLine, updateCartLine} from '../../../features/cartLineSlice';

const TIME_INCREMENT = 2000;

interface CartLineActionCardProps {
  style?: any;
  cartLine: any;
  cartId?: number;
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
  const {canDelete, readonly} = usePermitted({
    modelName: 'com.axelor.apps.sale.db.CartLine',
  });

  const [diffQty, setDiffQty] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleUpdateLine = useCallback(
    (data: {qty?: number; variantProduct?: any}) => {
      dispatch(
        (updateCartLine as any)({
          cartLine,
          qty: data.qty != null ? data.qty : cartLine.qty,
          variantProduct:
            data.variantProduct != null
              ? data.variantProduct
              : cartLine.variantProduct,
          cartId: cartId,
        }),
      );
    },
    [cartId, cartLine, dispatch],
  );

  const handleUpdateVariant = useCallback(
    (productId: number) => {
      handleUpdateLine({variantProduct: {id: productId}});
    },
    [handleUpdateLine],
  );

  const handleTimeOut = useCallback(() => {
    if (diffQty !== 0) {
      handleUpdateLine({qty: parseInt(cartLine.qty, 10) + diffQty});
      setDiffQty(0);
    }
  }, [diffQty, handleUpdateLine, cartLine.qty]);

  useEffect(() => {
    if (diffQty !== 0) {
      const timeoutId = setTimeout(handleTimeOut, TIME_INCREMENT);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [handleTimeOut, diffQty]);

  return (
    <>
      <ActionCard
        style={style}
        actionList={[
          {
            iconName: 'palette2',
            helper: I18n.t('Sale_SeeVariants'),
            onPress: () => setAlertVisible(true),
            hidden: readonly || cartLine.product?.productVariantConfig == null,
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
            large: cartLine.product?.productVariantConfig == null,
            hidden: !canDelete || hideDelete,
          },
          {
            iconName: 'plus-lg',
            helper: I18n.t('Sale_AddOne'),
            onPress: () => setDiffQty(current => current + 1),
            hidden: readonly || hideIncrement,
          },
          {
            iconName: 'dash-lg',
            helper: I18n.t('Sale_RemoveOne'),
            disabled: parseInt(cartLine.qty, 10) + diffQty <= 1,
            onPress: () => setDiffQty(current => current - 1),
            hidden: readonly || hideIncrement,
          },
        ]}
        forceActionsDisplay={diffQty !== 0}
        translator={I18n.t}>
        <CartLineCard
          product={cartLine.product}
          qty={parseInt(cartLine.qty, 10) + diffQty}
          unit={cartLine.unit?.name}
          hideBadgeInformation={hideBadgeInformation}
          onPress={() => {
            navigation.navigate('CartLineDetailsScreen', {
              cartLineId: cartLine.id,
            });
          }}
        />
      </ActionCard>
      <VariantPopup
        visible={alertVisible}
        handleClose={() => setAlertVisible(false)}
        parentProduct={cartLine.product}
        variantProduct={cartLine.variantProduct}
        handleConfirm={handleUpdateVariant}
      />
    </>
  );
};

export default CartLineActionCard;
