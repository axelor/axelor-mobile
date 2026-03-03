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
import {View} from 'react-native';
import {useNavigation} from '@axelor/aos-mobile-core';
import {ProductCardInfo} from '../../../templates';

const StockCorrectionProductCardInfo = ({stockProduct, trackingNumber}) => {
  const navigation = useNavigation();

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: stockProduct,
    });
  };

  return (
    <View>
      <ProductCardInfo
        name={stockProduct?.name}
        code={stockProduct?.code}
        picture={stockProduct?.picture}
        trackingNumber={
          stockProduct?.trackingNumberConfiguration == null ||
          trackingNumber == null
            ? null
            : trackingNumber.trackingNumberSeq
        }
        locker={null}
        onPress={handleShowProduct}
      />
    </View>
  );
};

export default StockCorrectionProductCardInfo;
