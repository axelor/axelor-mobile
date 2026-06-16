/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useCallback, useMemo, useState} from 'react';
import {ChipSelect, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {InternalMoveLineActionCard, StockMoveHeader} from '../../components';
import {fetchInternalMoveLines} from '../../features/internalMoveLineSlice';
import {LineVerification, StockMove, StockMoveLine} from '../../types';
import {displayLine} from '../../utils/displayers';
import {useInternalLinesWithRacks, useLineHandler} from '../../hooks';

const scanKey = 'trackingNumber-or-product_internal-move-line-list';
const massScanKey = 'internal-move-line_mass-scan';

const InternalMoveLineListScreen = ({route}: any) => {
  const {internalMove} = route?.params ?? {};
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {showLine} = useLineHandler();

  const {internalMoveLineList, totalNumberLines} =
    useInternalLinesWithRacks(internalMove);
  const {loadingIMLinesList, moreLoading, isListEnd} = useSelector(
    state => state.internalMoveLine,
  );

  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);

  const handleShowLine = useCallback(
    (item: any, skipVerification: boolean | undefined = undefined) => {
      showLine({
        move: internalMove,
        line: item,
        skipVerification,
        type: LineVerification.type.internal as any,
      });
    },
    [internalMove, showLine],
  );

  const handleLineSearch = (item: any) => {
    handleShowLine(item, true);
  };

  const sliceFunctionData = useMemo(
    () => ({
      internalMoveId: internalMove.id,
      refreshKey,
    }),
    [internalMove.id, refreshKey],
  );

  const filterOnStatus = useCallback(
    (list: any[]) => {
      if (!Array.isArray(list) || list.length === 0) return [];

      if (!Array.isArray(selectedStatus) || selectedStatus.length === 0)
        return list;

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
            showMassScanner
            massScanData={{
              scanKey: massScanKey,
              stockMoveId: internalMove.id,
              totalLines: totalNumberLines,
              handleShowLine: handleShowLine,
              onRefresh: () => setRefreshKey(_current => _current + 1),
            }}
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={
              StockMoveLine.getStockMoveLineStatusItems(I18n, Colors) as any
            }
          />
        }
        renderListItem={({item}) => (
          <InternalMoveLineActionCard
            onPress={() => handleShowLine(item)}
            internalMoveLine={item}
          />
        )}
      />
    </Screen>
  );
};

export default InternalMoveLineListScreen;
