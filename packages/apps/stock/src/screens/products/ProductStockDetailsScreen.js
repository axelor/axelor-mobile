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

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {
  EditableInput,
  Picker,
  Screen,
  ScrollView,
  useConfig,
} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
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

const ProductStockDetailsScreen = ({route}) => {
  const routeProduct = route.params.product;
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {setActivityIndicator} = useConfig();

  const {loadingProductFromId, productFromId: product} = useSelector(
    state => state.product,
  );
  const {user, canModifyCompany} = useSelector(state => state.user);
  const {companyList} = useSelector(state => state.company);
  const {stockLocationLine} = useSelector(state => state.stockLocationLine);
  const {baseConfig} = useSelector(state => state.config);

  const [stockLocation, setStockLocation] = useState(
    user?.workshopStockLocation,
  );
  const [companyId, setCompany] = useState(user.activeCompany?.id);

  useEffect(() => {
    dispatch(fetchProductWithId(routeProduct.id));
  }, [dispatch, routeProduct]);

  useEffect(() => {
    dispatch(
      fetchProductIndicators({
        version: routeProduct.version,
        productId: routeProduct.id,
        companyId: companyId,
        stockLocationId: stockLocation?.id,
      }),
    );
    if (stockLocation != null) {
      dispatch(
        fetchStockLocationLine({
          stockId: stockLocation.id,
          productId: routeProduct.id,
        }),
      );
    }
  }, [companyId, dispatch, routeProduct, stockLocation]);

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

  if (product?.id !== routeProduct?.id) {
    return null;
  }

  return (
    <Screen>
      <ScrollView>
        <ProductStockHeader
          product={product}
          companyId={companyId}
          stockLocation={stockLocation}
        />
        <View style={styles.lineStyle} />
        {baseConfig?.enableMultiCompany && canModifyCompany && (
          <Picker
            styles={styles.picker}
            title={I18n.t('User_Company')}
            defaultValue={companyId}
            listItems={companyList}
            labelField="name"
            valueField="id"
            onValueChange={item => setCompany(item)}
          />
        )}
        <ProductSeeStockLocationDistribution
          companyId={companyId}
          product={product}
        />
        <StockLocationSearchBar
          scanKey={stockLocationScanKey}
          onChange={setStockLocation}
          defaultValue={stockLocation}
        />
        {stockLocation == null ? null : (
          <EditableInput
            placeholder={I18n.t('Stock_Locker')}
            onValidate={input => handleLockerChange(input)}
            defaultValue={
              stockLocationLine == null ? null : stockLocationLine[0]?.rack
            }
          />
        )}
        <ProductCardStockIndicatorList />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  picker: {
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
