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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  filterList,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
  filterChip,
} from '@axelor/aos-mobile-core';
import {StockCorrectionCard} from '../../components';
import {searchStockCorrections} from '../../features/stockCorrectionSlice';
import {searchProducts} from '../../features/productSlice';
import {searchStockLocations} from '../../features/stockLocationSlice';
import StockCorrection from '../../types/stock-corrrection';

const stockLocationScanKey = 'stock-location_stock-correction-list';
const productScanKey = 'product_stock-correction-list';

const StockCorrectionListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingStockCorrection, moreLoading, isListEnd, stockCorrectionList} =
    useSelector(state => state.stockCorrection);
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {productList} = useSelector(state => state.product);
  const {user} = useSelector(state => state.user);

  const [stockLocation, setStockLocation] = useState(null);
  const [product, setProduct] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [filteredList, setFilteredList] = useState(stockCorrectionList);

  const filterOnStatus = useCallback(
    list => {
      return filterChip(list, selectedStatus, 'statusSelect');
    },
    [selectedStatus],
  );

  useEffect(() => {
    setFilteredList(
      filterOnStatus(
        filterList(
          filterList(
            stockCorrectionList,
            'stockLocation',
            'id',
            stockLocation?.id ?? '',
          ),
          'product',
          'id',
          product?.id ?? '',
        ),
      ),
    );
  }, [stockCorrectionList, stockLocation, product, filterOnStatus]);

  const showStockCorrectionDetails = stockCorrection => {
    navigation.navigate('StockCorrectionDetailsScreen', {
      stockCorrectionId: stockCorrection?.id,
    });
  };

  const searchStockCorrectionsAPI = useCallback(
    page => {
      dispatch(searchStockCorrections({page: page}));
    },
    [dispatch],
  );

  const fetchProductsAPI = useCallback(
    filter => {
      dispatch(searchProducts({searchValue: filter}));
    },
    [dispatch],
  );

  const fetchStockLocationsAPI = useCallback(
    filterValue => {
      dispatch(
        searchStockLocations({
          searchValue: filterValue,
          companyId: user.activeCompany?.id,
          defaultStockLocation: user.workshopStockLocation,
        }),
      );
    },
    [dispatch, user],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('Stock_Status_Draft'),
                color: StockCorrection.getStatusColor(
                  StockCorrection.status.Draft,
                  Colors,
                ),
                key: StockCorrection.status.Draft,
              },
              {
                title: I18n.t('Stock_Status_Validated'),
                color: StockCorrection.getStatusColor(
                  StockCorrection.status.Validated,
                  Colors,
                ),
                key: StockCorrection.status.Validated,
              },
            ]}
          />
        }>
        <ScannerAutocompleteSearch
          objectList={stockLocationList}
          value={stockLocation}
          onChangeValue={item => setStockLocation(item)}
          fetchData={fetchStockLocationsAPI}
          displayValue={displayItemName}
          scanKeySearch={stockLocationScanKey}
          placeholder={I18n.t('Stock_StockLocation')}
          searchBarKey={1}
        />
        <ScannerAutocompleteSearch
          objectList={productList}
          value={product}
          onChangeValue={item => setProduct(item)}
          fetchData={fetchProductsAPI}
          displayValue={displayItemName}
          scanKeySearch={productScanKey}
          placeholder={I18n.t('Stock_Product')}
          searchBarKey={2}
        />
      </HeaderContainer>
      <ScrollList
        loadingList={loadingStockCorrection}
        data={filteredList}
        renderItem={({item}) => (
          <StockCorrectionCard
            style={styles.item}
            status={item.statusSelect}
            productFullname={item.product.fullName}
            stockLocation={item.stockLocation.name}
            date={
              item.statusSelect === StockCorrection.status.Draft
                ? item.createdOn
                : item.validationDateT
            }
            onPress={() => showStockCorrectionDetails(item)}
          />
        )}
        fetchData={searchStockCorrectionsAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  action: {
    marginRight: 15,
  },
});

export default StockCorrectionListScreen;
