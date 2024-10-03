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
import {FlatList, ScrollView, View} from 'react-native';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  ActionCard,
  Alert,
  SingleSelectScrollList,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {CartLineCard} from '../../atoms';
import {deleteCartLine, updateCartLine} from '../../../features/cartLineSlice';
import {
  fetchProductById,
  fetchVariantProduct,
} from '../../../features/productSlice';
import {fetchProductByIdApi} from '../../../api';

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

  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<{
    productVariantValue1?: any;
    productVariantValue2?: any;
    productVariantValue3?: any;
    productVariantValue4?: any;
    productVariantValue5?: any;
  }>({});

  const currentVariant = cartLine?.variantProduct;

  //console.log('currentVariant', currentVariant);

  // console.log('cartLine', cartLine);

  const handleVariantSelection = () => {
    setAlertVisible(true);
  };

  const handleConfirm = () => {
    // dispatch(
    //   (updateCartLine as any)({
    //     cartLine: {...cartLine},
    //     cartId: cartId,
    //     qty: cartLine.qty,
    //     // variantProduct: selectedVariant,
    //   }),
    // );
    console.log(selectedVariants);
    setAlertVisible(false);
  };

  useEffect(() => {
    if (cartLine?.variantProduct != null) {
      fetchProductByIdApi({productId: cartLine?.variantProduct?.id}).then(
        res => {
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
        },
      );
    }
  }, [cartLine?.variantProduct, currentVariant]);
  const {product} = useSelector((state: any) => state.sale_product);
  const {
    loadingVariantList,
    moreLoadingVariantList,
    isVariantListEnd,
    variantProductList,
  } = useSelector((state: any) => state.sale_product);

  const fetchVariantProductAPI = useCallback(
    (page = 0) => {
      dispatch(
        (fetchVariantProduct as any)({
          parentProductId: product?.parentProduct?.id,
          page,
        }),
      );
    },
    [dispatch, product?.parentProduct?.id],
  );

  const variantConfig = product?.productVariantConfig;

  const variantAttributes = useMemo(() => {
    return [
      {
        attribute: variantConfig?.productVariantAttr1,
        values: variantConfig?.productVariantAttr1?.productVariantValueList,
        defaultValue: selectedVariants?.productVariantValue1,
      },
      {
        attribute: variantConfig?.productVariantAttr2,
        values: variantConfig?.productVariantAttr2?.productVariantValueList,
        defaultValue: selectedVariants?.productVariantValue2,
      },
      {
        attribute: variantConfig?.productVariantAttr3,
        values: variantConfig?.productVariantAttr3?.productVariantValueList,
        defaultValue: selectedVariants?.productVariantValue3,
      },
      {
        attribute: variantConfig?.productVariantAttr4,
        values: variantConfig?.productVariantAttr4?.productVariantValueList,
        defaultValue: selectedVariants?.productVariantValue4,
      },
      {
        attribute: variantConfig?.productVariantAttr5,
        values: variantConfig?.productVariantAttr5?.productVariantValueList,
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
            helper: I18n.t('aaaaaaaaaaaaaa'),
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
      <Alert
        visible={alertVisible}
        title={I18n.t('Sale_SelectVariant')}
        confirmButtonConfig={{
          onPress: handleConfirm,
          title: I18n.t('Base_OK'),
        }}
        cancelButtonConfig={{
          onPress: () => setAlertVisible(false),
          title: I18n.t('Base_Cancel'),
        }}>
        <FlatList
          data={variantAttributes.filter(
            attr => attr.attribute && attr.values.length > 0,
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={{marginBottom: 50}}>
              <Text>{item.attribute.name}</Text>
              <SingleSelectScrollList
                fetchData={fetchVariantProductAPI}
                loadingList={loadingVariantList}
                moreLoading={moreLoadingVariantList}
                isListEnd={isVariantListEnd}
                data={item.values}
                defaultSelected={item.defaultValue}
                onChange={value => {
                  setSelectedVariants(prev => ({
                    ...prev,
                    [item.attribute.code]: value,
                  }));
                }}
                renderItem={({item: a}) => <Text>{a.name}</Text>}
              />
            </View>
          )}
        />
      </Alert>
    </>
  );
};

export default CartLineActionCard;
