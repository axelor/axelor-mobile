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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {
  EditableInput,
  Picker,
  Screen,
  ScrollView,
  useConfig,
} from '@axelor/aos-mobile-ui';
import {
  useContextRegister,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useIsFocused,
} from '@axelor/aos-mobile-core';
import {
  ProductCardStockIndicatorList,
  ProductSeeStockLocationDistribution,
  ProductStockHeader,
  StockLocationSearchBar,
} from '../../components';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import {fetchStockLocationLine} from '../../features/stockLocationLineSlice';
import {
  fetchProductWithId,
  updateProductLocker,
} from '../../features/productSlice';

const stockLocationScanKey = 'stock-location_product-indicators';

const ProductStockDetailsScreen = ({route, addtionalIndicators}) => {
  const productId = route.params.product?.id;
  useContextRegister({
    models: [{model: 'com.axelor.apps.base.db.Product', id: productId}],
  });
  const I18n = useTranslator();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {readonly, hidden} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockLocationLine',
  });
  const {setActivityIndicator} = useConfig();

  const {loadingProductFromId, productFromId: product} = useSelector(
    state => state.product,
  );
  const {user, canModifyCompany} = useSelector(state => state.user);
  const {companyList} = useSelector(state => state.company);
  const {stockLocationLine} = useSelector(state => state.stockLocationLine);
  const {base: baseConfig} = useSelector(state => state.appConfig);

  const [stockLocation, setStockLocation] = useState(
    user?.workshopStockLocation,
  );
  const [companyId, setCompany] = useState(user.activeCompany?.id);

  const fetchProductFromId = useCallback(() => {
    dispatch(fetchProductWithId(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (isFocused) {
      fetchProductFromId();
    }
  }, [fetchProductFromId, isFocused]);

  useEffect(() => {
    if (product?.id != null) {
      dispatch(
        fetchProductIndicators({
          version: product.version,
          productId: product.id,
          companyId: companyId,
          stockLocationId: stockLocation?.id,
        }),
      );

      if (stockLocation != null) {
        dispatch(
          fetchStockLocationLine({
            stockId: stockLocation.id,
            productId: product.id,
          }),
        );
      }
    }
  }, [companyId, dispatch, product, stockLocation]);

  useEffect(() => {
    const isActivityIndicator = loadingProductFromId && product?.id == null;
    setActivityIndicator(isActivityIndicator);
  }, [loadingProductFromId, product, setActivityIndicator]);

  const handleLockerChange = input => {
    if (stockLocation != null) {
      dispatch(
        updateProductLocker({
          productId: product.id,
          stockLocationId: stockLocation.id,
          newLocker: input.toString(),
          version: product.version,
        }),
      );
    }
  };

  if (product?.id !== productId) {
    return null;
  }

  return (
    <Screen>
      <ScrollView
        style={styles.container}
        refresh={{fetcher: fetchProductFromId, loading: loadingProductFromId}}>
        <ProductStockHeader
          product={product}
          companyId={companyId}
          stockLocation={stockLocation}
        />
        <View style={styles.lineStyle} />
        {baseConfig?.enableMultiCompany && canModifyCompany && (
          <Picker
            title={I18n.t('User_Company')}
            defaultValue={companyId}
            listItems={companyList}
            labelField="name"
            valueField="id"
            onValueChange={item => setCompany(item)}
          />
        )}
        {!hidden && (
          <ProductSeeStockLocationDistribution companyId={companyId} />
        )}
        <StockLocationSearchBar
          scanKey={stockLocationScanKey}
          onChange={setStockLocation}
          defaultValue={stockLocation}
        />
        {readonly || stockLocation == null ? null : (
          <EditableInput
            placeholder={I18n.t('Stock_Locker')}
            onValidate={input => handleLockerChange(input)}
            defaultValue={
              stockLocationLine == null ? null : stockLocationLine[0]?.rack
            }
          />
        )}
        <ProductCardStockIndicatorList
          stockLocationId={stockLocation?.id}
          companyId={companyId}
          addtionalIndicators={addtionalIndicators}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  lineStyle: {
    borderWidth: 0.5,
    width: Dimensions.get('window').width * 0.8,
    borderColor: 'black',
    marginHorizontal: '10%',
    marginBottom: '1%',
  },
});

export default ProductStockDetailsScreen;
