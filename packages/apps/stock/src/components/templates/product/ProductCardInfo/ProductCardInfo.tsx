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
import {ObjectCard} from '@axelor/aos-mobile-ui';
import {useMetafileUri, useNavigation} from '@axelor/aos-mobile-core';

interface ProductCardInfoProps {
  style?: any;
  product?: any;
  trackingNumber?: any;
  locker?: string;
}

const ProductCardInfo = ({
  style,
  product,
  trackingNumber,
  locker,
}: ProductCardInfoProps) => {
  const navigation = useNavigation();
  const formatMetaFile = useMetafileUri();

  const handleShowProduct = useCallback(
    () => navigation.navigate('ProductStockDetailsScreen', {product}),
    [navigation, product],
  );

  return (
    <ObjectCard
      style={style}
      onPress={handleShowProduct}
      image={{
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        defaultIconSize: 60,
        source: formatMetaFile(product.picture?.id),
      }}
      upperTexts={{
        items: [
          {
            displayText: product.name,
            isTitle: true,
          },
          {
            displayText: product.code,
          },
          {
            iconName: 'qr-code',
            hideIfNull: true,
            displayText: trackingNumber?.trackingNumberSeq,
          },
          {iconName: 'geo-alt-fill', hideIfNull: true, displayText: locker},
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  imageSize: {
    height: 60,
    width: 60,
  },
});

export default ProductCardInfo;
