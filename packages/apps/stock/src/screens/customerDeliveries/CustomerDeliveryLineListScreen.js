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
import {CustomerDeliveryLineCard, StockMoveHeader} from '../../components';
import {fetchCustomerDeliveryLines} from '../../features/customerDeliveryLineSlice';
import {StockMove, StockMoveLine} from '../../types';
import {showLine} from '../../utils/line-navigation';

const CustomerDeliveryLineListScreen = ({route, navigation}) => {
  const customerDelivery = route.params.customerDelivery;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingCDLines, moreLoading, isListEnd, customerDeliveryLineList} =
    useSelector(state => state.customerDeliveryLine);
  const {racksList} = useSelector(state => state.rack);

  const [filteredList, setFilteredList] = useState(customerDeliveryLineList);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleShowLine = (item, index) => {
    const locker = racksList?.[index]?.[0]?.rack ?? '';

    const updatedItem = {
      ...item,
      locker,
    };

    showLine({
      item: {name: 'customerDelivery', data: customerDelivery},
      itemLine: {name: 'customerDeliveryLine', data: updatedItem},
      lineDetailsScreen: 'CustomerDeliveryLineDetailScreen',
      selectTrackingScreen: 'CustomerDeliverySelectTrackingScreen',
      selectProductScreen: 'CustomerDeliverySelectProductScreen',
      navigation,
    });
  };

  const fetchDeliveryLinesAPI = useCallback(
    page => {
      dispatch(
        fetchCustomerDeliveryLines({
          customerDeliveryId: customerDelivery.id,
          page: page,
        }),
      );
    },
    [customerDelivery.id, dispatch],
  );

  const filterOnStatus = useCallback(
    list => {
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      }

      if (!Array.isArray(selectedStatus) || selectedStatus.length === 0) {
        return list;
      }

      return list.filter(item => {
        return selectedStatus.find(
          _status =>
            _status?.key ===
            StockMoveLine.getStockMoveLineStatus(item, customerDelivery),
        );
      });
    },
    [customerDelivery, selectedStatus],
  );

  useEffect(() => {
    setFilteredList(filterOnStatus(customerDeliveryLineList));
  }, [customerDeliveryLineList, filterOnStatus]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={customerDelivery.stockMoveSeq}
            status={customerDelivery.statusSelect}
            date={
              customerDelivery
                ? StockMove.getStockMoveDate(
                    customerDelivery.statusSelect,
                    customerDelivery,
                  )
                : null
            }
            availability={customerDelivery.availableStatusSelect}
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={StockMoveLine.getStockMoveLineStatusItems(
              I18n,
              Colors,
            )}
          />
        }
      />
      <ScrollList
        loadingList={loadingCDLines}
        data={filteredList}
        renderItem={({item, index}) => (
          <CustomerDeliveryLineCard
            style={styles.item}
            productName={item.product.fullName}
            pickedQty={
              StockMoveLine.hideLineQty(item, customerDelivery)
                ? 0
                : item.realQty
            }
            askedQty={item.qty}
            locker={
              racksList != null && racksList[index] != null
                ? racksList[index][0]?.rack
                : ''
            }
            availability={
              customerDelivery.statusSelect === StockMove.status.Realized
                ? null
                : item.availableStatusSelect
            }
            trackingNumber={item?.trackingNumber}
            onPress={() => handleShowLine(item, index)}
          />
        )}
        fetchData={fetchDeliveryLinesAPI}
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

export default CustomerDeliveryLineListScreen;
