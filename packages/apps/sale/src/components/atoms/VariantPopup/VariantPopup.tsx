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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Alert, SingleSelectScrollList, Text} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  fetchMatchingProduct,
  fetchProductVariantConfig,
} from '../../../features/productSlice';
import {fetchProductByIdApi} from '../../../api';

interface VariantPopupProps {
  visible?: boolean;
  handleClose: () => void;
  parentProduct: any;
  variantProduct?: any;
  handleConfirm: (productId: number) => void;
}

const VariantPopup = ({
  visible = false,
  handleClose,
  parentProduct,
  variantProduct,
  handleConfirm,
}: VariantPopupProps) => {
  const I18n = useTranslator();
  const dispatch: any = useDispatch();

  const {productVariantConfig} = useSelector(
    (state: any) => state.sale_product,
  );

  const [selectedVariants, setSelectedVariants] = useState({});

  useEffect(() => {
    if (visible && parentProduct?.productVariantConfig != null) {
      dispatch(
        (fetchProductVariantConfig as any)({
          productVariantConfigId: parentProduct.productVariantConfig.id,
        }),
      );
    }
  }, [dispatch, parentProduct, visible]);

  const handleProductSelection = useCallback(() => {
    dispatch(
      (fetchMatchingProduct as any)({
        selectedVariants,
      }),
    ).then(res => {
      const _productId = res?.payload?.id;
      if (_productId != null) {
        handleConfirm(res?.payload?.id);
        handleClose();
      }
    });
  }, [dispatch, selectedVariants, handleConfirm, handleClose]);

  useEffect(() => {
    if (variantProduct != null && productVariantConfig) {
      fetchProductByIdApi({productId: variantProduct?.id})
        .then(res => {
          const variantData = res?.data?.data?.[0]?.productVariant;
          if (variantData) {
            const newSelectedVariants = {};
            for (let i = 1; i <= 5; i++) {
              newSelectedVariants[`productVariantValue${i}`] =
                variantData[`productVariantValue${i}`] ?? undefined;
            }
            setSelectedVariants(newSelectedVariants);
          }
        })
        .catch(() => setSelectedVariants({}));
    }
  }, [variantProduct, productVariantConfig]);

  const variantAttributes = useMemo(() => {
    if (!productVariantConfig) {
      return [];
    }

    return Array.from({length: 5}, (_, index) => {
      const attrIndex = index + 1;

      return {
        attribute: productVariantConfig[`productVariantAttr${attrIndex}`],
        values: productVariantConfig[`productVariantValue${attrIndex}Set`],
        defaultValue: selectedVariants[`productVariantValue${attrIndex}`],
      };
    });
  }, [productVariantConfig, selectedVariants]);

  return (
    <Alert
      visible={visible}
      title={I18n.t('Sale_ChooseVariant')}
      confirmButtonConfig={{
        onPress: handleProductSelection,
        title: I18n.t('Base_OK'),
      }}
      cancelButtonConfig={{
        onPress: handleClose,
        showInHeader: true,
      }}
      style={styles.popup}>
      <FlatList
        style={styles.flalist}
        data={variantAttributes.filter(
          attr => attr.attribute && attr.values.length > 0,
        )}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text>{item.attribute.name}</Text>
            <SingleSelectScrollList
              fetchData={() => {}}
              loadingList={false}
              moreLoading={false}
              rowStyle={styles.select}
              isListEnd={true}
              data={item.values}
              defaultSelected={item.defaultValue}
              onChange={value => {
                setSelectedVariants(prev => {
                  const attributeIndex = variantAttributes.findIndex(
                    attr => attr.attribute.code === item.attribute.code,
                  );

                  return {
                    ...prev,
                    [`productVariantValue${attributeIndex + 1}`]: value,
                  };
                });
              }}
              renderItem={({item: a}) => <Text>{a.name}</Text>}
            />
          </View>
        )}
      />
    </Alert>
  );
};

const styles = StyleSheet.create({
  popup: {
    alignItems: 'flex-start',
  },
  flalist: {
    width: '100%',
  },
  container: {
    marginBottom: 20,
  },
  select: {
    minHeight: 40,
  },
});

export default VariantPopup;
