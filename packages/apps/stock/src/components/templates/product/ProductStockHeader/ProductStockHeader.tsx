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

import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslator, AOSImage, useNavigation} from '@axelor/aos-mobile-core';
import {Card, Text} from '@axelor/aos-mobile-ui';
import {ProductCardDetails} from '../../../molecules';

const ProductStockHeader = ({
  product,
  companyId,
  stockLocation,
}: {
  product: any;
  companyId?: number;
  stockLocation?: any;
}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const showProductDetails = useCallback(() => {
    navigation.navigate('ProductDetailsScreen', {
      product: product,
      companyID: companyId,
      stockLocationId: stockLocation?.id,
    });
  }, [companyId, navigation, product, stockLocation?.id]);

  return (
    <Card style={styles.infoContainer}>
      <AOSImage
        imageSize={styles.imageSize}
        resizeMode="contain"
        metaFile={product?.picture}
        defaultIconSize={60}
        enableImageViewer
      />
      <ProductCardDetails
        style={styles.productContainer}
        onPress={showProductDetails}>
        <Text writingType="important">{product.name}</Text>
        <Text>{product.code}</Text>
        <Text>{`${I18n.t('Stock_StockUnit')} : ${product.unit?.name}`}</Text>
      </ProductCardDetails>
    </Card>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingRight: 16,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 8,
  },
  imageSize: {
    height: 60,
    width: 60,
  },
  productContainer: {
    flex: 1,
  },
});

export default ProductStockHeader;
