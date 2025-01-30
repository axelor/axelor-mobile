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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {CustomerDeliveryLineCard} from '../../../templates';
import {SearchLineContainer} from '../../../organisms';
import {showLine} from '../../../../utils/line-navigation';
import {StockMove, StockMoveLine} from '../../../../types';
import {fetchCustomerDeliveryLines} from '../../../../features/customerDeliveryLineSlice';
import {useCustomerLinesWithRacks} from '../../../../hooks';

const scanKey = 'trackingNumber-or-product_dustomer-delivery-details';

const CustomerDeliverySearchLineContainer = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.config);
  const {customerDelivery} = useSelector(state => state.customerDelivery);
  const {customerDeliveryLineList, totalNumberLines} =
    useCustomerLinesWithRacks(customerDelivery);

  const handleNewLine = () => {
    navigation.navigate('CustomerDeliveryLineCreationScreen', {
      customerDelivery: customerDelivery,
    });
  };

  const handleViewAll = () => {
    navigation.navigate('CustomerDeliveryLineListScreen', {
      customerDelivery: customerDelivery,
    });
  };

  const handleShowLine = (
    item,
    skipVerification = !mobileSettings?.isVerifyCustomerDeliveryLineEnabled,
  ) => {
    showLine({
      item: {name: 'customerDelivery', data: customerDelivery},
      itemLine: {name: 'customerDeliveryLine', data: item},
      lineDetailsScreen: 'CustomerDeliveryLineDetailScreen',
      selectTrackingScreen: 'CustomerDeliverySelectTrackingScreen',
      selectProductScreen: 'CustomerDeliverySelectProductScreen',
      skipVerification,
      navigation,
    });
  };

  const handleLineSearch = item => {
    handleShowLine(item, true);
  };

  const fetchCustomerLinesAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        fetchCustomerDeliveryLines({
          customerDeliveryId: customerDelivery.id,
          searchValue,
          page: page,
        }),
      );
    },
    [dispatch, customerDelivery],
  );

  const filterLine = useCallback(item => {
    return (
      parseFloat(item.realQty) == null ||
      parseFloat(item.realQty) < parseFloat(item.qty)
    );
  }, []);

  const showLineAdditionIcon = useMemo(() => {
    if (customerDelivery.statusSelect >= StockMove.status.Realized) {
      return false;
    }

    if (mobileSettings?.isCustomerDeliveryLineAdditionEnabled == null) {
      return true;
    }

    return mobileSettings.isCustomerDeliveryLineAdditionEnabled;
  }, [customerDelivery, mobileSettings]);

  return (
    <SearchLineContainer
      title={I18n.t('Stock_CustomerDeliveryLines')}
      numberOfItems={totalNumberLines}
      objectList={customerDeliveryLineList}
      handleSelect={handleLineSearch}
      handleSearch={fetchCustomerLinesAPI}
      scanKey={scanKey}
      onViewPress={handleViewAll}
      filterLine={filterLine}
      showAction={showLineAdditionIcon}
      onAction={handleNewLine}
      renderItem={item => (
        <CustomerDeliveryLineCard
          style={styles.item}
          productName={item.product?.fullName}
          pickedQty={
            StockMoveLine.hideLineQty(item, customerDelivery) ? 0 : item.realQty
          }
          askedQty={item.qty}
          trackingNumber={item.trackingNumber}
          locker={item.locker}
          availability={
            customerDelivery.statusSelect !== StockMove.status.Realized
              ? item.availableStatusSelect
              : null
          }
          onPress={() => handleShowLine(item)}
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
