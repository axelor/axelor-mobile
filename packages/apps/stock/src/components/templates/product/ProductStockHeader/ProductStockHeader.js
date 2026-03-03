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

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslator, AOSImage, useNavigation} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';
import {ProductCardDetails} from '../../../molecules';

const ProductStockHeader = ({product, companyId, stockLocation}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const showProductDetails = () => {
    navigation.navigate('ProductDetailsScreen', {
      product: product,
      companyID: companyId,
      stockLocationId: stockLocation?.id,
    });
  };

  const navigateToImageProduct = () => {
    navigation.navigate('ProductImageScreen', {product: product});
  };

  return (
    <View style={styles.infoContainer}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={navigateToImageProduct}
        activeOpacity={0.9}>
        <AOSImage
          generalStyle={styles.imageStyle}
          imageSize={styles.imageSize}
          resizeMode="contain"
          metaFile={product?.picture}
          defaultIconSize={60}
        />
      </TouchableOpacity>
      <ProductCardDetails
        style={styles.productContainer}
        name={product.name}
        code={product.code}
        onPress={showProductDetails}>
        <Text style={styles.text_important}>{product.name}</Text>
        <Text style={styles.text_secondary}>{product.code}</Text>
        <Text style={styles.text_secondary}>
          {`${I18n.t('Stock_StockUnit')} : ${product.unit?.name}`}
        </Text>
      </ProductCardDetails>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text_important: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text_secondary: {
    fontSize: 16,
  },
  imageSize: {
    height: 60,
    width: 60,
  },
});

export default ProductStockHeader;
