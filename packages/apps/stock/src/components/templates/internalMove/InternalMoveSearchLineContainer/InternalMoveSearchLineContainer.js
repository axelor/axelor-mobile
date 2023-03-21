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
  InternalMoveLineCard,
  SearchLineContainer,
} from '../../../../components';
import {getRacks} from '../../../../features/racksListSlice';
import {fetchInternalMoveLines} from '../../../../features/internalMoveLineSlice';
import {showLine} from '../../../../utils/line-navigation';

const scanKey = 'trackingNumber-or-product_internal-move-details';

const InternalMoveSearchLineContainer = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {internalMove} = useSelector(state => state.internalMove);
  const {internalMoveLineList, totalNumberLines} = useSelector(
    state => state.internalMoveLine,
  );
  const {loadingRacks, racksList} = useSelector(state => state.rack);

  const handleViewAll = () => {
    navigation.navigate('InternalMoveLineListScreen', {
      internalMove: internalMove,
    });
  };

  const handleShowLine = (item, skipVerification = false) => {
    showLine({
      item: {name: 'internalMove', data: internalMove},
      itemLine: {name: 'internalMoveLine', data: item},
      lineDetailsScreen: 'InternalMoveLineDetailsScreen',
      selectTrackingScreen: 'InternalMoveSelectTrackingScreen',
      selectProductScreen: 'InternalMoveSelectProductScreen',
      productKey: 'stockProduct',
      skipVerification,
      navigation,
    });
  };

  const handleLineSearch = item => {
    handleShowLine(item, true);
  };

  const fetchInternalLinesAPI = useCallback(
    searchValue => {
      dispatch(
        fetchInternalMoveLines({
          internalMoveId: internalMove?.id,
          searchValue: searchValue,
          page: 0,
        }),
      );
    },
    [dispatch, internalMove],
  );

  useEffect(() => {
    dispatch(
      getRacks({
        stockId: internalMove?.fromStockLocation?.id,
        LineList: internalMoveLineList,
      }),
    );
  }, [dispatch, internalMove, internalMoveLineList]);

  const filterLine = useCallback(item => {
    return (
      parseFloat(item.realQty) == null ||
      parseFloat(item.realQty) < parseFloat(item.qty)
    );
  }, []);

  return (
    <SearchLineContainer
      title={I18n.t('Stock_InternalMoveLines')}
      numberOfItems={totalNumberLines}
      objectList={internalMoveLineList}
      handleSelect={handleLineSearch}
      handleSearch={fetchInternalLinesAPI}
      scanKey={scanKey}
      onViewPress={handleViewAll}
      filterLine={filterLine}
      renderItem={(item, index) => (
        <InternalMoveLineCard
          style={styles.item}
          productName={item.product?.fullName}
          internalMoveStatus={internalMove.statusSelect}
          availability={
            item.availableStatusSelect != null
              ? item.availableStatusSelect
              : null
          }
          locker={
            !loadingRacks && racksList != null && racksList[index] != null
              ? racksList[index][0]?.rack
              : ''
          }
          trackingNumber={item.trackingNumber?.trackingNumberSeq}
          expectedQty={item.qty}
          movedQty={item.realQty}
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

export default InternalMoveSearchLineContainer;
