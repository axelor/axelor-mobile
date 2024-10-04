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

import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {SearchLineContainer} from '../../../organisms';
import {InternalMoveLineCard} from '../../../templates';
import {fetchInternalMoveLines} from '../../../../features/internalMoveLineSlice';
import {showLine} from '../../../../utils/line-navigation';
import {useInternalLinesWithRacks} from '../../../../hooks';
import {StockMoveLine} from '../../../../types';

const scanKey = 'trackingNumber-or-product_internal-move-details';

const InternalMoveSearchLineContainer = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {internalMove} = useSelector(state => state.internalMove);
  const {internalMoveLineList, totalNumberLines} =
    useInternalLinesWithRacks(internalMove);

  const handleViewAll = () => {
    navigation.navigate('InternalMoveLineListScreen', {
      internalMove: internalMove,
    });
  };

  const handleShowLine = (
    item,
    skipVerification = !mobileSettings?.isVerifyInternalMoveLineEnabled,
  ) => {
    showLine({
      item: {name: 'internalMove', data: internalMove},
      itemLine: {name: 'internalMoveLine', data: item},
      lineDetailsScreen: 'InternalMoveLineDetailsScreen',
      selectTrackingScreen: 'InternalMoveSelectTrackingScreen',
      selectProductScreen: 'InternalMoveSelectProductScreen',
      skipVerification,
      navigation,
    });
  };

  const handleLineSearch = item => {
    handleShowLine(item, true);
  };

  const fetchInternalLinesAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        fetchInternalMoveLines({
          internalMoveId: internalMove?.id,
          searchValue: searchValue,
          page: page,
        }),
      );
    },
    [dispatch, internalMove],
  );

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
      renderItem={item => (
        <InternalMoveLineCard
          style={styles.item}
          productName={item.product?.fullName}
          internalMoveStatus={internalMove.statusSelect}
          fromStockLocation={item.fromStockLocation?.name}
          toStockLocation={item.toStockLocation?.name}
          expectedQty={item.qty}
          movedQty={
            StockMoveLine.hideLineQty(item, internalMove) ? 0 : item.realQty
          }
          locker={item.locker}
          trackingNumber={item.trackingNumber?.trackingNumberSeq}
          availability={
            item.availableStatusSelect != null
              ? item.availableStatusSelect
              : null
          }
          stockMoveLineId={item.id}
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
