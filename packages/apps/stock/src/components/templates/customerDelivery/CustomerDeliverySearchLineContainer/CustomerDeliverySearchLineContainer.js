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

import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  CustomerDeliveryLineCard,
  SearchLineContainer,
} from '../../../../components';
import {getRacks} from '../../../../features/racksListSlice';
import {showLine} from '../../../../utils/line-navigation';
import StockMove from '../../../../types/stock-move';
import {fetchCustomerDeliveryLines} from '../../../../features/customerDeliveryLineSlice';

const scanKey = 'trackingNumber-or-product_dustomer-delivery-details';

const CustomerDeliverySearchLineContainer = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {customerDelivery} = useSelector(state => state.customerDelivery);
  const {customerDeliveryLineList, totalNumberLines} = useSelector(
    state => state.customerDeliveryLine,
  );
  const {loadingRacks, racksList} = useSelector(state => state.rack);

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

  const handleShowLine = (item, index, skipVerification = false) => {
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
      skipVerification,
      navigation,
    });
  };

  const handleLineSearch = item => {
    const itemIndex = customerDeliveryLineList.findIndex(
      _item => _item.id === item.id,
    );
    handleShowLine(item, itemIndex, true);
  };

  const fetchInternalLinesAPI = useCallback(
    searchValue => {
      dispatch(
        fetchCustomerDeliveryLines({
          customerDeliveryId: customerDelivery.id,
          searchValue,
          page: 0,
        }),
      );
    },
    [dispatch, customerDelivery],
  );

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

  const filterLine = useCallback(item => {
    return (
      parseFloat(item.realQty) == null ||
      parseFloat(item.realQty) < parseFloat(item.qty)
    );
  }, []);

  return (
    <SearchLineContainer
      title={I18n.t('Stock_CustomerDeliveryLines')}
      numberOfItems={totalNumberLines}
      objectList={customerDeliveryLineList}
      handleSelect={handleLineSearch}
      handleSearch={fetchInternalLinesAPI}
      scanKey={scanKey}
      onViewPress={handleViewAll}
      filterLine={filterLine}
      showAction={customerDelivery.statusSelect !== StockMove.status.Realized}
      onAction={handleNewLine}
      renderItem={(item, index) => (
        <CustomerDeliveryLineCard
          style={styles.item}
          productName={item.product?.fullName}
          pickedQty={item?.realQty}
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
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
});

export default CustomerDeliverySearchLineContainer;
