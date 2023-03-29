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

import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {SupplierArrivalLineCard, StockMoveHeader} from '../../components';
import {fetchSupplierArrivalLines} from '../../features/supplierArrivalLineSlice';
import StockMove from '../../types/stock-move';
import {showLine} from '../../utils/line-navigation';

const SupplierArrivalLineListScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const supplierArrival = route.params.supplierArrival;
  const {loadingSALines, moreLoading, isListEnd, supplierArrivalLineList} =
    useSelector(state => state.supplierArrivalLine);
  const [filteredList, setFilteredList] = useState(supplierArrivalLineList);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const dispatch = useDispatch();

  const handleShowLine = item => {
    showLine({
      item: {name: 'supplierArrival', data: supplierArrival},
      itemLine: {name: 'supplierArrivalLine', data: item},
      lineDetailsScreen: 'SupplierArrivalLineDetailScreen',
      selectTrackingScreen: 'SupplierArrivalSelectTrackingScreen',
      selectProductScreen: 'SupplierArrivalSelectProductScreen',
      navigation,
    });
  };

  const fetchSupplierLinesAPI = useCallback(
    page => {
      dispatch(
        fetchSupplierArrivalLines({
          supplierArrivalId: supplierArrival.id,
          page: page,
        }),
      );
    },
    [supplierArrival.id, dispatch],
  );

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else if (selectedStatus !== null && selectedStatus.length > 0) {
        return list.filter(item => {
          if (selectedStatus[0].key === 'doneStatus') {
            return parseFloat(item.realQty) >= parseFloat(item.qty);
          } else if (selectedStatus[0].key === 'unDoneStatus') {
            return (
              parseFloat(item.realQty) == null ||
              parseFloat(item.realQty) < parseFloat(item.qty)
            );
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
    setFilteredList(filterOnStatus(supplierArrivalLineList));
  }, [supplierArrivalLineList, filterOnStatus]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={supplierArrival.stockMoveSeq}
            status={supplierArrival.statusSelect}
            date={
              supplierArrival.statusSelect === StockMove.status.Draft
                ? supplierArrival.createdOn
                : supplierArrival.statusSelect === StockMove.status.Planned
                ? supplierArrival.estimatedDate
                : supplierArrival.realDate
            }
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('Stock_Done'),
                color: Colors.primaryColor,
                key: 'doneStatus',
              },
              {
                title: I18n.t('Stock_NotDone'),
                color: Colors.cautionColor,
                key: 'unDoneStatus',
              },
            ]}
          />
        }
      />
      <ScrollList
        loadingList={loadingSALines}
        data={filteredList}
        renderItem={({item}) => (
          <SupplierArrivalLineCard
            style={styles.item}
            productName={item.product?.fullName}
            deliveredQty={item?.realQty}
            askedQty={item?.qty}
            trackingNumber={item?.trackingNumber}
            onPress={() => {
              handleShowLine(item);
            }}
          />
        )}
        fetchData={fetchSupplierLinesAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
});

export default SupplierArrivalLineListScreen;
