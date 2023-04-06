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

import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ViewAllContainer} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import StockMove from '../../../../types/stock-move';
import {CustomerDeliveryLineCard} from '..';
import {showLine} from '../../../../utils/line-navigation';
import {fetchCustomerDeliveryLines} from '../../../../features/customerDeliveryLineSlice';
import {getRacks} from '../../../../features/racksListSlice';

const CustomerDeliveryViewAllContainer = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {customerDelivery} = useSelector(state => state.customerDelivery);
  const {loadingRacks, racksList} = useSelector(state => state.rack);
  const {customerDeliveryLineList} = useSelector(
    state => state.customerDeliveryLine,
  );

  useEffect(() => {
    if (customerDelivery != null) {
      dispatch(
        fetchCustomerDeliveryLines({
          customerDeliveryId: customerDelivery?.id,
          page: 0,
        }),
      );
    }
  }, [customerDelivery, dispatch]);

  useEffect(() => {
    dispatch(
      getRacks({
        stockId: customerDelivery?.fromStockLocation?.id,
        LineList: customerDeliveryLineList,
      }),
    );
  }, [
    dispatch,
    customerDeliveryLineList,
    customerDelivery?.fromStockLocation?.id,
  ]);

  const handleNewLine = () => {
    navigation.navigate('CustomerDeliverySelectProductScreen', {
      customerDelivery: customerDelivery,
    });
  };

  const handleViewAll = () => {
    navigation.navigate('CustomerDeliveryLineListScreen', {
      customerDelivery: customerDelivery,
    });
  };

  const handleShowLine = (item, index) => {
    const locker = !loadingRacks && (racksList?.[index]?.[0]?.rack ?? '');

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

  return (
    <ViewAllContainer
      isHeaderExist={
        customerDelivery.statusSelect !== StockMove.status.Realized
      }
      onNewIcon={handleNewLine}
      data={customerDeliveryLineList}
      translator={I18n.t}
      renderFirstTwoItems={(item, index) => (
        <CustomerDeliveryLineCard
          style={styles.item}
          productName={item.product?.fullName}
          pickedQty={item.isRealQtyModifiedByUser === false ? 0 : item.realQty}
          askedQty={item?.qty}
          locker={
            !loadingRacks && racksList != null && racksList[index] != null
              ? racksList[index][0]?.rack
              : ''
          }
          availability={
            customerDelivery.statusSelect !== StockMove.status.Realized
              ? item?.availableStatusSelect
              : null
          }
          trackingNumber={item?.trackingNumber}
          onPress={() => handleShowLine(item, index)}
        />
      )}
      onViewPress={handleViewAll}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
});

export default CustomerDeliveryViewAllContainer;
