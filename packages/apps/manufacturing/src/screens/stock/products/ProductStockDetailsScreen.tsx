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

import React, {useCallback, useMemo} from 'react';
import {useNavigation, useSelector} from '@axelor/aos-mobile-core';
import {
  ProductStockDetailsScreen as StockProductDetailsScreen,
  StockIndicator,
} from '@axelor/aos-mobile-stock';

const ProductStockDetailsScreen = ({route}) => {
  const navigation = useNavigation();

  const {productIndicators} = useSelector(state => state.productIndicators);

  const addtionalIndicatorOnPress = useCallback(
    type =>
      navigation.navigate('ProductManufacturingIndicatorDetails', {
        type,
      }),
    [navigation],
  );

  const addtionalIndicators = useMemo(
    () => [
      {
        titleKey: 'Stock_BuildingQty',
        value: productIndicators?.buildingQty,
        onPress: () =>
          addtionalIndicatorOnPress(StockIndicator.type.BuildingQty),
      },
      {
        titleKey: 'Stock_ConsumedMOQty',
        value: productIndicators?.consumeManufOrderQty,
        onPress: () =>
          addtionalIndicatorOnPress(StockIndicator.type.ConsumedMOQty),
      },
      {
        titleKey: 'Stock_MissingMOQty',
        value: productIndicators?.missingManufOrderQty,
        onPress: () =>
          addtionalIndicatorOnPress(StockIndicator.type.MissingMOQty),
      },
    ],
    [addtionalIndicatorOnPress, productIndicators],
  );

  return (
    <StockProductDetailsScreen
      route={route}
      addtionalIndicators={addtionalIndicators}
    />
  );
};

export default ProductStockDetailsScreen;
