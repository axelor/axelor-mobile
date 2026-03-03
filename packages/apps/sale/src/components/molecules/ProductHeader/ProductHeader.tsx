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
import {StyleSheet, View} from 'react-native';
import {useMetafileUri, useSelector} from '@axelor/aos-mobile-core';
import {Image, Text, TextUnit, usePriceFormat} from '@axelor/aos-mobile-ui';
import {TaxModeBadge} from '../../atoms';

const ProductHeader = ({}) => {
  const formatMetaFile = useMetafileUri();
  const priceFormat = usePriceFormat();

  const {product} = useSelector((state: any) => state.sale_product);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image
          generalStyle={styles.imageStyle}
          imageSize={styles.imageStyle}
          resizeMode="contain"
          source={formatMetaFile(product.picture?.id)}
          defaultIconSize={50}
        />
        <View style={styles.childrenContainer}>
          <Text writingType="title">{product.name}</Text>
          <Text>{product.code}</Text>
        </View>
      </View>
      <View style={styles.endContainer}>
        <TextUnit
          unit={product?.saleCurrency?.symbol}
          value={priceFormat(product?.salePrice)}
        />
        <TaxModeBadge inAti={product.inAti} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 2,
  },
  childrenContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    flexShrink: 1,
  },
  endContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-end',
  },
  imageStyle: {
    height: 50,
    width: 50,
  },
});

export default ProductHeader;
