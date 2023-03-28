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

import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {EditableInput, Picker, Screen, ScrollView} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  ScannerAutocompleteSearch,
  useSelector,
  useDispatch,
  useTranslator,
  HeaderOptionsMenu,
} from '@axelor/aos-mobile-core';
import {
  ProductCardStockIndicatorList,
  ProductSeeStockLocationDistribution,
  ProductStockHeader,
} from '../../components';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import {fetchStockLocationLine} from '../../features/stockLocationLineSlice';
import {searchStockLocations} from '../../features/stockLocationSlice';
import {updateProductLocker} from '../../features/productSlice';

const stockLocationScanKey = 'stock-location_product-indicators';

const ProductStockDetailsScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const product = route.params.product;
  const {user, canModifyCompany} = useSelector(state => state.user);
  const {companyList} = useSelector(state => state.company);
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {stockLocationLine} = useSelector(state => state.stockLocationLine);
  const [stockLocation, setStockLocation] = useState(null);
  const [companyId, setCompany] = useState(user.activeCompany?.id);
  const {baseConfig, mobileSettings} = useSelector(state => state.config);
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [companyId, dispatch, product, stockLocation]);

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.base.db.Product"
          modelId={product.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnStockApp}
          attachedFileScreenTitle={product.name}
        />
      ),
    });
  }, [I18n, mobileSettings, navigation, product]);

  const fetchStockLocationsAPI = useCallback(
    filterValue => {
      dispatch(
        searchStockLocations({
          searchValue: filterValue,
          companyId: companyId,
          defaultStockLocation: user.workshopStockLocation,
        }),
      );
    },
    [companyId, dispatch, user],
  );

  return (
    <Screen>
      <ScrollView>
        <ProductStockHeader
          product={product}
          navigation={navigation}
          companyId={companyId}
          stockLocation={stockLocation}
        />
        <View style={styles.lineStyle} />
        {baseConfig.enableMultiCompany && canModifyCompany && (
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
          navigation={navigation}
          product={product}
        />
        <ScannerAutocompleteSearch
          objectList={stockLocationList}
          value={stockLocation}
          onChangeValue={item => setStockLocation(item)}
          fetchData={fetchStockLocationsAPI}
          displayValue={displayItemName}
          scanKeySearch={stockLocationScanKey}
          placeholder={I18n.t('Stock_StockLocation')}
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
