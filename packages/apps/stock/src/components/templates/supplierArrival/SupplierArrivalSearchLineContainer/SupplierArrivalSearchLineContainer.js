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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {SearchLineContainer} from '../../../organisms';
import {SupplierArrivalLineCard} from '../../../templates';
import {showLine} from '../../../../utils/line-navigation';
import {fetchSupplierArrivalLines} from '../../../../features/supplierArrivalLineSlice';
import {StockMove, StockMoveLine} from '../../../../types';
import {useSupplierLinesWithRacks} from '../../../../hooks';

const scanKey = 'trackingNumber-or-product_supplier-arrival-details';

const SupplierArrivalSearchLineContainer = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {supplierArrival} = useSelector(state => state.supplierArrival);
  const {supplierArrivalLineList, totalNumberLines} =
    useSupplierLinesWithRacks(supplierArrival);

  const handleNewLine = () => {
    navigation.navigate('SupplierArrivalLineCreationScreen', {
      supplierArrival: supplierArrival,
    });
  };

  const handleViewAll = () => {
    navigation.navigate('SupplierArrivalLineListScreen', {
      supplierArrival: supplierArrival,
    });
  };

  const handleShowLine = (
    item,
    skipVerification = !mobileSettings?.isVerifySupplierArrivalLineEnabled,
  ) => {
    showLine({
      item: {name: 'supplierArrival', data: supplierArrival},
      itemLine: {name: 'supplierArrivalLine', data: item},
      lineDetailsScreen: 'SupplierArrivalLineDetailScreen',
      selectTrackingScreen: 'SupplierArrivalSelectTrackingScreen',
      selectProductScreen: 'SupplierArrivalSelectProductScreen',
      skipVerification,
      skipTrackingNumberVerification: true,
      navigation,
    });
  };

  const handleLineSearch = item => {
    handleShowLine(item, true);
  };

  const fetchSupplierLinesAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        fetchSupplierArrivalLines({
          supplierArrivalId: supplierArrival.id,
          searchValue,
          page: page,
        }),
      );
    },
    [dispatch, supplierArrival],
  );

  const filterLine = useCallback(item => {
    return (
      parseFloat(item.realQty) == null ||
      parseFloat(item.realQty) < parseFloat(item.qty)
    );
  }, []);

  const showLineAdditionIcon = useMemo(() => {
    if (supplierArrival.statusSelect >= StockMove.status.Realized) {
      return false;
    }

    if (mobileSettings?.isSupplierArrivalLineAdditionEnabled == null) {
      return true;
    }

    return mobileSettings.isSupplierArrivalLineAdditionEnabled;
  }, [supplierArrival, mobileSettings]);

  return (
    <SearchLineContainer
      title={I18n.t('Stock_SupplierArrivalLines')}
      numberOfItems={totalNumberLines}
      objectList={supplierArrivalLineList}
      handleSelect={handleLineSearch}
      handleSearch={fetchSupplierLinesAPI}
      scanKey={scanKey}
      onViewPress={handleViewAll}
      filterLine={filterLine}
      showAction={showLineAdditionIcon}
      onAction={handleNewLine}
      renderItem={item => (
        <SupplierArrivalLineCard
          style={styles.item}
          productName={item.product?.fullName}
          stockLocationName={item.toStockLocation?.name}
          deliveredQty={
            StockMoveLine.hideLineQty(item, supplierArrival) ? 0 : item.realQty
          }
          askedQty={item.qty}
          trackingNumber={item.trackingNumber}
          locker={item.locker}
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

export default SupplierArrivalSearchLineContainer;
