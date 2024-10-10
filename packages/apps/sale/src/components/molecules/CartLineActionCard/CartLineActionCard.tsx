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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ActionCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {CartLineCard, VariantPopup} from '../../atoms';
import {deleteCartLine, updateCartLine} from '../../../features/cartLineSlice';
import {fetchProductById} from '../../../features/productSlice';
import {fetchProductByIdApi} from '../../../api';
import {fetchMatchingProduct} from '../../../api/product-api';

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

  const {product: parentProduct} = useSelector(
    (state: any) => state.sale_product,
  );

  const [diffQty, setDiffQty] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<{
    productVariantValue1?: any;
    productVariantValue2?: any;
    productVariantValue3?: any;
    productVariantValue4?: any;
    productVariantValue5?: any;
  }>({});

  const variantConfig = useMemo(() => {
    return parentProduct?.productVariantConfig;
  }, [parentProduct?.productVariantConfig]);

  const currentVariant = useMemo(() => {
    return cartLine?.variantProduct;
  }, [cartLine?.variantProduct]);

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

  const handleVariantSelection = () => {
    setAlertVisible(true);
  };

  const handleConfirm = useCallback(() => {
    fetchMatchingProduct({
      selectedVariants,
    }).then(res => {
      dispatch(
        (updateCartLine as any)({
          cartLine: cartLine,
          qty: cartLine.qty,
          variantProduct: res.data.data[0],
          cartId: cartId,
        }),
      );
    });
    setAlertVisible(false);
  }, [cartId, cartLine, dispatch, selectedVariants]);

  useEffect(() => {
    if (cartLine?.variantProduct != null) {
      fetchProductByIdApi({productId: cartLine?.variantProduct?.id})
        .then(res => {
          const variantData = res.data.data[0]?.productVariant;
          if (variantData) {
            setSelectedVariants({
              productVariantValue1:
                variantData.productVariantValue1 ?? undefined,
              productVariantValue2:
                variantData.productVariantValue2 ?? undefined,
              productVariantValue3:
                variantData.productVariantValue3 ?? undefined,
              productVariantValue4:
                variantData.productVariantValue4 ?? undefined,
              productVariantValue5:
                variantData.productVariantValue5 ?? undefined,
            });
          }
        })
        .catch(() => setSelectedVariants({}));
    }
  }, [cartLine?.variantProduct, currentVariant]);

  const variantAttributes = useMemo(() => {
    const filterAvailableValues = (attribute, valueSet) => {
      if (!attribute || !attribute.productVariantValueList || !valueSet) {
        return [];
      }

      return attribute.productVariantValueList.filter(value =>
        valueSet.some(av => av.id === value.id),
      );
    };

    return [
      {
        attribute: variantConfig?.productVariantAttr1,
        values: filterAvailableValues(
          variantConfig?.productVariantAttr1,
          parentProduct?.productVariantConfig?.productVariantValue1Set,
        ),
        defaultValue: selectedVariants?.productVariantValue1,
      },
      {
        attribute: variantConfig?.productVariantAttr2,
        values: filterAvailableValues(
          variantConfig?.productVariantAttr2,
          parentProduct?.productVariantConfig?.productVariantValue2Set,
        ),
        defaultValue: selectedVariants?.productVariantValue2,
      },
      {
        attribute: variantConfig?.productVariantAttr3,
        values: filterAvailableValues(
          variantConfig?.productVariantAttr3,
          parentProduct?.productVariantConfig?.productVariantValue3Set,
        ),
        defaultValue: selectedVariants?.productVariantValue3,
      },
      {
        attribute: variantConfig?.productVariantAttr4,
        values: filterAvailableValues(
          variantConfig?.productVariantAttr4,
          parentProduct?.productVariantConfig?.productVariantValue4Set,
        ),
        defaultValue: selectedVariants?.productVariantValue4,
      },
      {
        attribute: variantConfig?.productVariantAttr5,
        values: filterAvailableValues(
          variantConfig?.productVariantAttr5,
          parentProduct?.productVariantConfig?.productVariantValue5Set,
        ),
        defaultValue: selectedVariants?.productVariantValue5,
      },
    ];
  }, [
    variantConfig?.productVariantAttr1,
    variantConfig?.productVariantAttr2,
    variantConfig?.productVariantAttr3,
    variantConfig?.productVariantAttr4,
    variantConfig?.productVariantAttr5,
    selectedVariants,
    parentProduct?.productVariantConfig,
  ]);

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
          {
            iconName: 'exposure',
            helper: I18n.t('Sale_ChooseVariant'),
            onPress: () => {
              dispatch(
                (fetchProductById as any)({
                  productId: cartLine.product.id,
                }),
              );
              handleVariantSelection();
            },
            hidden: cartLine.product?.productVariantConfig == null,
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
