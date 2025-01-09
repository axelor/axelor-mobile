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

import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {ProductStockLocationCard} from '../../components';
import {fetchStockLocationLine} from '../../features/stockLocationLineSlice';
import {fetchProductDistribution} from '../../features/productIndicatorsSlice';
import {fetchSupplychainConfigForStockApp} from '../../features/stockAppConfigSlice';

const ProductStockLocationDetailsScreen = ({route}) => {
  const product = route.params.product;
  const companyId = route.params.companyId;
  const {
    loading: loadingLines,
    moreLoading,
    isListEnd,
    stockLocationLine,
  } = useSelector(state => state.stockLocationLine);
  const {listAvailabiltyDistribution} = useSelector(
    state => state.productIndicators,
  );
  const {supplychainConfig} = useSelector(state => state.stockAppConfig);
  const [filteredList, setFilteredList] = useState(stockLocationLine);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSupplychainConfigForStockApp());
  }, [dispatch]);

  const filterOnStatus = useCallback(
    (list, availabilityList) => {
      if (list == null || list === []) {
        return list;
      } else if (selectedStatus !== null && selectedStatus.length > 0) {
        return list.filter((item, index) => {
          if (selectedStatus[0].key === 'available') {
            return parseFloat(availabilityList[index]?.availableStock) > 0;
          } else if (selectedStatus[0].key === 'unavailable') {
            parseFloat(availabilityList[index]?.availableStock) === 0;
          } else {
            return item;
          }
        });
      } else {
        return list;
      }
    },
    [selectedStatus],
  );

  useEffect(() => {
    setFilteredList(
      filterOnStatus(stockLocationLine, listAvailabiltyDistribution),
    );
  }, [stockLocationLine, filterOnStatus, listAvailabiltyDistribution]);

  const fetchStockLines = useCallback(
    page => {
      dispatch(
        fetchStockLocationLine({
          productId: product.id,
          companyId: companyId,
          page: page,
        }),
      );
    },
    [companyId, dispatch, product.id],
  );

  useEffect(() => {
    if (stockLocationLine != null && stockLocationLine !== []) {
      dispatch(
        fetchProductDistribution({
          stockLocationList: stockLocationLine,
          product: product,
          companyId: companyId || 1,
        }),
      );
    }
  }, [dispatch, product, stockLocationLine, companyId]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<Text style={styles.title}>{product.fullName}</Text>}
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('Stock_Available'),
                color: Colors.primaryColor,
                key: 'available',
              },
              {
                title: I18n.t('Stock_Unavailable'),
                color: Colors.cautionColor,
                key: 'unavailable',
              },
            ]}
          />
        }
      />
      <ScrollList
        loadingList={loadingLines}
        data={filteredList}
        renderItem={({item, index}) => (
          <ProductStockLocationCard
            stockLocationName={item.stockLocation?.name}
            realQty={parseFloat(item.currentQty).toFixed(2)}
            futureQty={parseFloat(item.futureQty).toFixed(2)}
            reservedQty={
              supplychainConfig?.manageStockReservation &&
              parseFloat(item.reservedQty).toFixed(2)
            }
            availability={
              listAvailabiltyDistribution
                ? listAvailabiltyDistribution[index]?.availableStock
                : null
            }
            unit={item.unit?.name}
          />
        )}
        fetchData={fetchStockLines}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
  },
});

export default ProductStockLocationDetailsScreen;
