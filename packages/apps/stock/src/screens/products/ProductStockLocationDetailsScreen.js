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
import {useStockLocationLinesWithAvailability} from '../../hooks';

const AVAILABILITY = {
  available: 'available',
  unavailable: 'unavailable',
};

const ProductStockLocationDetailsScreen = ({route}) => {
  const product = route.params.product;
  const companyId = route.params.companyId;
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {
    loading: loadingLines,
    moreLoading,
    isListEnd,
  } = useSelector(state => state.stockLocationLine);
  const {stockLocationLinelist} = useStockLocationLinesWithAvailability(
    companyId,
    product,
  );
  const {supplychain: supplychainConfig} = useSelector(
    state => state.appConfig,
  );

  const [filteredList, setFilteredList] = useState(stockLocationLinelist);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const filterOnStatus = useCallback(
    list => {
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      } else if (Array.isArray(selectedStatus) && selectedStatus.length > 0) {
        return list.filter(item => {
          if (selectedStatus[0].key === AVAILABILITY.available) {
            return parseFloat(item?.availableStock) > 0;
          } else if (selectedStatus[0].key === AVAILABILITY.unavailable) {
            parseFloat(item?.availableStock) === 0;
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
    setFilteredList(filterOnStatus(stockLocationLinelist));
  }, [stockLocationLinelist, filterOnStatus]);

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
                color: Colors.successColor,
                key: AVAILABILITY.available,
              },
              {
                title: I18n.t('Stock_Unavailable'),
                color: Colors.cautionColor,
                key: AVAILABILITY.unavailable,
              },
            ]}
          />
        }
      />
      <ScrollList
        loadingList={loadingLines}
        data={filteredList}
        renderItem={({item}) => (
          <ProductStockLocationCard
            stockLocationName={item.stockLocation?.name}
            realQty={item.currentQty}
            futureQty={item.futureQty}
            reservedQty={
              supplychainConfig?.manageStockReservation && item.reservedQty
            }
            availability={item?.availableStock}
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
