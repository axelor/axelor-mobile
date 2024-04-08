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

import React, {useCallback, useState, useMemo} from 'react';
import {ChipSelect, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {InternalMoveLineCard, StockMoveHeader} from '../../components';
import {fetchInternalMoveLines} from '../../features/internalMoveLineSlice';
import {StockMove, StockMoveLine} from '../../types';
import {showLine} from '../../utils/line-navigation';
import {displayLine} from '../../utils/displayers';
import {useInternalLinesWithRacks} from '../../hooks';

const scanKey = 'trackingNumber-or-product_internal-move-line-list';

const InternalMoveLineListScreen = ({route, navigation}) => {
  const internalMove = route.params.internalMove;
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {internalMoveLineList} = useInternalLinesWithRacks(internalMove);
  const {loadingIMLinesList, moreLoading, isListEnd} = useSelector(
    state => state.internalMoveLine,
  );

  const [selectedStatus, setSelectedStatus] = useState([]);

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

  const sliceFunctionData = useMemo(
    () => ({
      internalMoveId: internalMove.id,
    }),
    [internalMove.id],
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
            StockMoveLine.getStockMoveLineStatus(item, internalMove),
        );
      });
    },
    [internalMove, selectedStatus],
  );

  const filteredList = useMemo(
    () => filterOnStatus(internalMoveLineList),
    [filterOnStatus, internalMoveLineList],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={filteredList}
        loading={loadingIMLinesList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchInternalMoveLines}
        sliceFunctionData={sliceFunctionData}
        onChangeSearchValue={handleLineSearch}
        displaySearchValue={displayLine}
        searchPlaceholder={I18n.t('Stock_SearchLine')}
        scanKeySearch={scanKey}
        isHideableSearch
        fixedItems={
          <StockMoveHeader
            reference={internalMove.stockMoveSeq}
            status={internalMove.statusSelect}
            date={
              internalMove
                ? StockMove.getStockMoveDate(
                    internalMove.statusSelect,
                    internalMove,
                  )
                : null
            }
            availability={internalMove.availableStatusSelect}
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
        renderListItem={({item}) => (
          <InternalMoveLineCard
            productName={item.product?.fullName}
            internalMoveStatus={internalMove.statusSelect}
            fromStockLocation={item.fromStockLocation?.name}
            toStockLocation={item.toStockLocation?.name}
            availability={
              item.availableStatusSelect == null
                ? null
                : item.availableStatusSelect
            }
            trackingNumber={item.trackingNumber?.trackingNumberSeq}
            locker={item.locker}
            expectedQty={item.qty}
            movedQty={
              StockMoveLine.hideLineQty(item, internalMove) ? 0 : item.realQty
            }
            onPress={() => handleShowLine(item)}
          />
        )}
      />
    </Screen>
  );
};

export default InternalMoveLineListScreen;
