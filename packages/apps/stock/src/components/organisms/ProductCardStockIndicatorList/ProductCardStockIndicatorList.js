/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import {useTranslator, useSelector} from '@axelor/aos-mobile-core';
import CardStockIndicator from '../CardStockIndicator/CardStockIndicator';

const ProductCardStockIndicatorList = ({}) => {
  const {loadingProductIndicators, productIndicators} = useSelector(
    state => state.productIndicators,
  );
  const I18n = useTranslator();

  return (
    <>
      {loadingProductIndicators ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.row}>
          <View style={styles.cardStock}>
            <CardStockIndicator
              title={I18n.t('Stock_RealQty')}
              number={productIndicators?.realQty}
            />
            <CardStockIndicator
              title={I18n.t('Stock_FutureQty')}
              number={productIndicators?.futureQty}
            />
            <CardStockIndicator
              title={I18n.t('Stock_AllocatedQty')}
              number={productIndicators?.allocatedQty}
            />
          </View>
          <View style={styles.cardStock}>
            <CardStockIndicator
              title={I18n.t('Stock_SaleOrderQty')}
              number={productIndicators?.saleOrderQty}
            />
            <CardStockIndicator
              title={I18n.t('Stock_PurchaseOrderQty')}
              number={productIndicators?.purchaseOrderQty}
            />
            <CardStockIndicator
              title={I18n.t('Stock_AvailableStock')}
              number={productIndicators?.availableStock}
            />
          </View>
          <View style={styles.cardStock}>
            {productIndicators?.buildingQty ? (
              <CardStockIndicator
                title={I18n.t('Stock_BuildingQty')}
                number={productIndicators?.buildingQty}
              />
            ) : null}
            {productIndicators?.consumeManufOrderQty ? (
              <CardStockIndicator
                title={I18n.t('Stock_ConsumedMOQty')}
                number={productIndicators?.consumeManufOrderQty}
              />
            ) : null}
            {productIndicators?.consumeManufOrderQty ? (
              <CardStockIndicator
                title={I18n.t('Stock_MissingMOQty')}
                number={productIndicators?.missingManufOrderQty}
              />
            ) : null}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cardStock: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default ProductCardStockIndicatorList;
