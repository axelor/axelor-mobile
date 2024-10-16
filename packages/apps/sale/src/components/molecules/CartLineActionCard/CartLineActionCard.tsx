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

import React, {useCallback, useEffect, useState} from 'react';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ActionCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {CartLineCard, VariantPopup} from '../../atoms';
import {deleteCartLine, updateCartLine} from '../../../features/cartLineSlice';
import {
  fetchMatchingProduct,
  fetchProductVariantConfig,
} from '../../../features/productSlice';
import {useVariantSelection} from '../../../hooks/use-variant-selection';

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

  const {productVariantConfig} = useSelector(
    (state: any) => state.sale_product,
  );

  const {
    alertVisible,
    setAlertVisible,
    handleVariantSelection,
    variantAttributes,
    setSelectedVariants,
    selectedVariants,
  } = useVariantSelection(cartLine, productVariantConfig);

  const [diffQty, setDiffQty] = useState(0);

  const handleTimeOut = useCallback(() => {
    if (diffQty !== 0) {
      dispatch(
        (updateCartLine as any)({
          cartLine,
          qty: parseInt(cartLine.qty, 10) + diffQty,
          cartId: cartId,
        }),
      );
      setDiffQty(0);
    }
  }, [diffQty, cartId, cartLine, dispatch]);

  useEffect(() => {
    if (diffQty !== 0) {
      const timeoutId = setTimeout(handleTimeOut, TIME_INCREMENT);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [handleTimeOut, diffQty]);

  const handleConfirm = useCallback(() => {
    dispatch(
      (fetchMatchingProduct as any)({
        selectedVariants: selectedVariants,
        cartLine: cartLine,
        cartId: cartId,
      }),
    );
    setAlertVisible(false);
  }, [cartId, cartLine, dispatch, selectedVariants, setAlertVisible]);

  return (
    <>
      <ActionCard
        style={style}
        actionList={[
          {
            iconName: 'palette2',
            helper: I18n.t('Sale_SeeVariants'),
            onPress: () => {
              dispatch(
                (fetchProductVariantConfig as any)({
                  productVariantConfigId:
                    cartLine.product.productVariantConfig?.id,
                }),
              );
              handleVariantSelection();
            },
            hidden: cartLine.product?.productVariantConfig == null,
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
            onPress: () => setDiffQty(current => current + 1),
            hidden: hideIncrement,
          },
          {
            iconName: 'dash-lg',
            helper: I18n.t('Sale_RemoveOne'),
            disabled: parseInt(cartLine.qty, 10) + diffQty <= 1,
            onPress: () => setDiffQty(current => current - 1),
            hidden: hideIncrement,
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
        alertVisible={alertVisible}
        handleConfirm={handleConfirm}
        setAlertVisible={setAlertVisible}
        setSelectedVariants={setSelectedVariants}
        variantAttributes={variantAttributes}
      />
    </>
  );
};

export default CartLineActionCard;
