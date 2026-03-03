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

import React, {useCallback, useMemo} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {IndicatorChart, useDigitFormat} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useSelector,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {StockIndicator} from '../../../../types';

const ProductCardStockIndicatorList = ({
  stockLocationId,
  companyId,
  addtionalIndicators = [],
}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const formatNumber = useDigitFormat();

  const {productIndicators} = useSelector(state => state.productIndicators);
  const {supplychain: supplychainConfig} = useSelector(
    state => state.appConfig,
  );

  const indicatorOnPress = useCallback(
    type =>
      navigation.navigate('ProductStockIndicatorDetails', {
        type,
        stockLocationId,
        companyId,
      }),
    [companyId, navigation, stockLocationId],
  );

  const indicators = useMemo(() => {
    const _indicators = [
      {
        titleKey: 'Stock_RealQty',
        value: productIndicators?.realQty,
        onPress: () => indicatorOnPress(StockIndicator.type.RealQty),
      },
      {
        titleKey: 'Stock_FutureQty',
        value: productIndicators?.futureQty,
        onPress: () => indicatorOnPress(StockIndicator.type.FutureQty),
      },
      {
        titleKey: 'Stock_AllocatedQty',
        value: productIndicators?.allocatedQty,
        condition: supplychainConfig?.manageStockReservation,
        onPress: () => indicatorOnPress(StockIndicator.type.AllocatedQty),
      },
      {
        titleKey: 'Stock_SaleOrderQty',
        value: productIndicators?.saleOrderQty,
        onPress: () => indicatorOnPress(StockIndicator.type.SaleOrderQty),
      },
      {
        titleKey: 'Stock_PurchaseOrderQty',
        value: productIndicators?.purchaseOrderQty,
        onPress: () => indicatorOnPress(StockIndicator.type.PurchaseOrderQty),
      },
      {
        titleKey: 'Stock_AvailableStock',
        value: productIndicators?.availableStock,
        onPress: () => indicatorOnPress(StockIndicator.type.AvailableStock),
      },
    ];

    return _indicators.concat(addtionalIndicators);
  }, [
    addtionalIndicators,
    indicatorOnPress,
    productIndicators,
    supplychainConfig?.manageStockReservation,
  ]);

  const renderIndicator = useCallback(
    ({titleKey, value, condition = true, onPress}, idx) => {
      if (value != null && condition) {
        return (
          <TouchableOpacity
            style={styles.chartContainer}
            onPress={onPress}
            activeOpacity={0.9}
            disabled={parseFloat(value) === 0}
            key={idx}>
            <View pointerEvents="none">
              <IndicatorChart
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
            </View>
          </TouchableOpacity>
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
    flexWrap: 'wrap',
  },
  chartContainer: {
    width: '50%',
    flexDirection: 'row',
  },
  chart: {
    alignSelf: 'stretch',
    flex: 1,
  },
});

export default ProductCardStockIndicatorList;
