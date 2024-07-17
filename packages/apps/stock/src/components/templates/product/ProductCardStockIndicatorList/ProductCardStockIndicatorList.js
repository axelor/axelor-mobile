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
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {IndicatorChart, useDigitFormat} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useSelector,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {StockIndicator} from '../../../../types';

const ProductCardStockIndicatorList = ({stockLocationId, companyId}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const formatNumber = useDigitFormat();

  const {productIndicators} = useSelector(state => state.productIndicators);
  const {supplychain: supplychainConfig} = useSelector(
    state => state.appConfig,
  );

  const indicators = useMemo(
    () => [
      {
        type: StockIndicator.type.RealQty,
        titleKey: 'Stock_RealQty',
        value: productIndicators?.realQty,
      },
      {
        type: StockIndicator.type.FutureQty,
        titleKey: 'Stock_FutureQty',
        value: productIndicators?.futureQty,
      },
      {
        type: StockIndicator.type.AllocatedQty,
        titleKey: 'Stock_AllocatedQty',
        value: productIndicators?.allocatedQty,
        condition: supplychainConfig?.manageStockReservation,
      },
      {
        type: StockIndicator.type.SaleOrderQty,
        titleKey: 'Stock_SaleOrderQty',
        value: productIndicators?.saleOrderQty,
      },
      {
        type: StockIndicator.type.PurchaseOrderQty,
        titleKey: 'Stock_PurchaseOrderQty',
        value: productIndicators?.purchaseOrderQty,
      },
      {
        type: StockIndicator.type.AvailableStock,
        titleKey: 'Stock_AvailableStock',
        value: productIndicators?.availableStock,
      },
      {
        type: StockIndicator.type.BuildingQty,
        titleKey: 'Stock_BuildingQty',
        value: productIndicators?.buildingQty,
      },
      {
        type: StockIndicator.type.ConsumedMOQty,
        titleKey: 'Stock_ConsumedMOQty',
        value: productIndicators?.consumeManufOrderQty,
      },
      {
        type: StockIndicator.type.MissingMOQty,
        titleKey: 'Stock_MissingMOQty',
        value: productIndicators?.missingManufOrderQty,
      },
    ],
    [productIndicators, supplychainConfig?.manageStockReservation],
  );

  const renderIndicator = useCallback(
    ({type, titleKey, value, condition = true}, idx) => {
      if (value != null && condition) {
        return (
          <TouchableOpacity
            style={styles.chartContainer}
            onPress={() =>
              navigation.navigate('ProductStockIndicatorDetails', {
                type,
                stockLocationId,
                companyId,
              })
            }
            activeOpacity={0.9}
            key={idx}>
            <IndicatorChart
              style={styles.chart}
              datasets={[
                {
                  title: I18n.t(titleKey),
                  value: formatNumber(value),
                },
              ]}
              widthGraph={Dimensions.get('window').width * 0.4}
            />
          </TouchableOpacity>
        );
      }
    },
    [I18n, companyId, formatNumber, navigation, stockLocationId],
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
  },
});

export default ProductCardStockIndicatorList;
