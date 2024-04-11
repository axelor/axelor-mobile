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

import React, {useCallback, useEffect, useState} from 'react';
import {
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useIsFocused,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  ProductSearchBar,
  StockCorrectionCard,
  StockLocationSearchBar,
} from '../../components';
import {searchStockCorrections} from '../../features/stockCorrectionSlice';
import StockCorrection from '../../types/stock-corrrection';

const stockLocationScanKey = 'stock-location_stock-correction-list';
const productScanKey = 'product_stock-correction-list';

const StockCorrectionListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const {loadingList, moreLoading, isListEnd, stockCorrectionList} =
    useSelector(state => state.stockCorrection);

  const [stockLocation, setStockLocation] = useState(null);
  const [product, setProduct] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const showStockCorrectionDetails = stockCorrection => {
    navigation.navigate('StockCorrectionDetailsScreen', {
      stockCorrectionId: stockCorrection?.id,
    });
  };

  const searchStockCorrectionsAPI = useCallback(
    page => {
      dispatch(
        searchStockCorrections({
          stockLocationId: stockLocation?.id,
          productId: product?.id,
          statusList: selectedStatus,
          page,
        }),
      );
    },
    [dispatch, product?.id, selectedStatus, stockLocation?.id],
  );

  useEffect(() => {
    if (isFocused) {
      setStockLocation(null);
      setProduct(null);
      setSelectedStatus([]);
    }
  }, [isFocused]);

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
        <StockLocationSearchBar
          scanKey={stockLocationScanKey}
          onChange={setStockLocation}
          defaultValue={stockLocation}
        />
        <ProductSearchBar
          scanKey={productScanKey}
          onChange={setProduct}
          defaultValue={product}
        />
      </HeaderContainer>
      <ScrollList
        loadingList={loadingList}
        data={stockCorrectionList}
        renderItem={({item}) => (
          <StockCorrectionCard
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

export default StockCorrectionListScreen;
