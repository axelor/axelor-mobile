/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {Dimensions, StyleSheet, View} from 'react-native';
import {IndicatorChart, useDigitFormat} from '@axelor/aos-mobile-ui';
import {useTranslator, useSelector} from '@axelor/aos-mobile-core';

const ProductCardStockIndicatorList = ({}) => {
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();

  const {productIndicators} = useSelector(state => state.productIndicators);
  const {supplychain: supplychainConfig} = useSelector(
    state => state.appConfig,
  );

  const indicators = useMemo(
    () => [
      {titleKey: 'Stock_RealQty', value: productIndicators?.realQty},
      {titleKey: 'Stock_FutureQty', value: productIndicators?.futureQty},
      {
        titleKey: 'Stock_AllocatedQty',
        value: productIndicators?.allocatedQty,
        condition: supplychainConfig?.manageStockReservation,
      },
      {titleKey: 'Stock_SaleOrderQty', value: productIndicators?.saleOrderQty},
      {
        titleKey: 'Stock_PurchaseOrderQty',
        value: productIndicators?.purchaseOrderQty,
      },
      {
        titleKey: 'Stock_AvailableStock',
        value: productIndicators?.availableStock,
      },
      {titleKey: 'Stock_BuildingQty', value: productIndicators?.buildingQty},
      {
        titleKey: 'Stock_ConsumedMOQty',
        value: productIndicators?.consumeManufOrderQty,
      },
      {
        titleKey: 'Stock_MissingMOQty',
        value: productIndicators?.missingManufOrderQty,
      },
    ],
    [productIndicators, supplychainConfig?.manageStockReservation],
  );

  const renderIndicator = useCallback(
    ({titleKey, value, condition = true}, idx) => {
      if (value != null && condition) {
        return (
          <IndicatorChart
            key={idx}
            style={styles.chart}
            datasets={[
              {
                title: I18n.t(titleKey),
                value: formatNumber(value),
              },
            ]}
            widthGraph={Dimensions.get('window').width * 0.4}
            translator={I18n.t}
          />
        );
      }
    },
    [I18n, formatNumber],
  );

  return (
    <View style={styles.container}>{indicators.map(renderIndicator)}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  chart: {
    alignSelf: 'stretch',
  },
});

export default ProductCardStockIndicatorList;
