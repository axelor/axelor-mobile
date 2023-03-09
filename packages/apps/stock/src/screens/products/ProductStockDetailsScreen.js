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
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {
  EditableInput,
  Icon,
  Picker,
  Screen,
  ScrollView,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  ScannerAutocompleteSearch,
  useSelector,
  useDispatch,
  useTranslator,
  HeaderOptionsMenu,
} from '@axelor/aos-mobile-core';
import {CardStockIndicator, ProductStockHeader} from '../../components';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import {fetchStockLocationLine} from '../../features/stockLocationLineSlice';
import {searchStockLocations} from '../../features/stockLocationSlice';
import {updateProductLocker} from '../../features/productSlice';

const stockLocationScanKey = 'stock-location_product-indicators';

const ProductStockDetailsScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const product = route.params.product;
  const {user, canModifyCompany} = useSelector(state => state.user);
  const {companyList} = useSelector(state => state.company);
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {stockLocationLine} = useSelector(state => state.stockLocationLine);
  const {loadingProductIndicators, productIndicators} = useSelector(
    state => state.productIndicators,
  );
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

  const showProductDetails = () => {
    navigation.navigate('ProductDetailsScreen', {
      product: product,
      companyID: companyId,
      stockLocationId: stockLocation?.id,
    });
  };

  const navigateToImageProduct = () => {
    navigation.navigate('ProductImageScreen', {product: product});
  };

  const navigateStockLocationDetails = () => {
    navigation.navigate('ProductStockLocationDetailsScreen', {
      product: product,
      companyId: companyId,
    });
  };

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
          navigateToImageProduct={navigateToImageProduct}
          showProductDetails={showProductDetails}
        />
        <View style={styles.lineStyle} />
        {baseConfig.enableMultiCompany && canModifyCompany && (
          <View style={styles.picker}>
            <Picker
              title={I18n.t('User_Company')}
              defaultValue={companyId}
              listItems={companyList}
              labelField="name"
              valueField="id"
              onValueChange={item => setCompany(item)}
            />
          </View>
        )}
        {productIndicators?.realQty != null &&
          parseInt(productIndicators?.realQty, 10) !== 0 &&
          parseInt(productIndicators?.futureQty, 10) !== 0 && (
            <TouchableOpacity onPress={navigateStockLocationDetails}>
              <View style={styles.arrowContainer}>
                <Text>{I18n.t('Stock_SeeDistributionStockLocation')}</Text>
                <Icon
                  name="angle-right"
                  size={24}
                  color={Colors.primaryColor.background}
                  style={styles.arrowIcon}
                />
              </View>
            </TouchableOpacity>
          )}
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
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 32,
    width: '80%',
  },
  arrowIcon: {
    marginRight: -6,
    marginLeft: 5,
  },
  picker: {
    alignItems: 'center',
  },
  cardStock: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  productContainer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text_important: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text_secondary: {
    fontSize: 16,
  },
  lineStyle: {
    borderWidth: 0.5,
    width: Dimensions.get('window').width * 0.8,
    borderColor: 'black',
    marginHorizontal: '10%',
    marginBottom: '1%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageSize: {
    height: 60,
    width: 60,
  },
});

export default ProductStockDetailsScreen;
