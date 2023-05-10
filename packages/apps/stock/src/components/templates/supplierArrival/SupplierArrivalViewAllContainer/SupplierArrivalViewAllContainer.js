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
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {SupplierArrivalLineCard} from '../../supplierArrival';
import {showLine} from '../../../../utils/line-navigation';
import {getRacks} from '../../../../features/racksListSlice';
import {fetchSupplierArrivalLines} from '../../../../features/supplierArrivalLineSlice';
import StockMove from '../../../../types/stock-move';

const SupplierArrivalViewAllContainer = ({supplierArrival, navigation}) => {
  const dispatch = useDispatch();

  const {loadingRacks, racksList} = useSelector(state => state.rack);
  const {supplierArrivalLineList} = useSelector(
    state => state.supplierArrivalLine,
  );

  const handleViewAll = () => {
    navigation.navigate('SupplierArrivalLineListScreen', {
      supplierArrival: supplierArrival,
    });
  };

  const handleShowLine = (item, index) => {
    const locker = !loadingRacks && (racksList?.[index]?.[0]?.rack ?? '');

    const updatedItem = {
      ...item,
      locker,
    };

    showLine({
      item: {name: 'supplierArrival', data: supplierArrival},
      itemLine: {name: 'supplierArrivalLine', data: updatedItem},
      lineDetailsScreen: 'SupplierArrivalLineDetailScreen',
      selectTrackingScreen: 'SupplierArrivalSelectTrackingScreen',
      selectProductScreen: 'SupplierArrivalSelectProductScreen',
      skipTrackingNumberVerification: true,
      navigation,
    });
  };

  const handleNewLine = () => {
    navigation.navigate('SupplierArrivalSelectProductScreen', {
      supplierArrival: supplierArrival,
    });
  };

  useEffect(() => {
    if (supplierArrival != null) {
      dispatch(
        fetchSupplierArrivalLines({
          supplierArrivalId: supplierArrival.id,
          page: 0,
        }),
      );
    }
  }, [dispatch, supplierArrival]);

  useEffect(() => {
    dispatch(
      getRacks({
        stockId: supplierArrival?.toStockLocation?.id,
        LineList: supplierArrivalLineList,
      }),
    );
  }, [dispatch, supplierArrival, supplierArrivalLineList]);

  return (
    <ViewAllContainer
      isHeaderExist={supplierArrival.statusSelect !== StockMove.status.Realized}
      onNewIcon={handleNewLine}
      data={supplierArrivalLineList}
      renderFirstTwoItems={(item, index) => (
        <SupplierArrivalLineCard
          style={styles.item}
          productName={item.product?.fullName}
          deliveredQty={
            item.isRealQtyModifiedByUser === false ? 0 : item.realQty
          }
          askedQty={item.qty}
          trackingNumber={item?.trackingNumber}
          locker={
            !loadingRacks && racksList != null && racksList[index] != null
              ? racksList[index][0]?.rack
              : ''
          }
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

export default SupplierArrivalViewAllContainer;
