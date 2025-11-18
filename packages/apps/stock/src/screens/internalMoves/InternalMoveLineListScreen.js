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

import React, {useCallback, useMemo, useState} from 'react';
import {ChipSelect, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  DoubleScannerSearchBar,
  SearchListView,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {InternalMoveLineActionCard, StockMoveHeader} from '../../components';
import {fetchInternalMoveLines} from '../../features/internalMoveLineSlice';
import {LineVerification, StockMove, StockMoveLine} from '../../types';
import {displayLine} from '../../utils/displayers';
import {useInternalLinesWithRacks, useLineHandler} from '../../hooks';
import {searchAlternativeBarcode} from '../../features/alternativeBarcodeSlice';

const scanKey = 'search-trackingNumber-or-product_internal-move-line-list';
const altScanKey = 'search-alternative-product_internal-move-line-list';

const InternalMoveLineListScreen = ({route}) => {
  const internalMove = route.params.internalMove;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {showLine} = useLineHandler();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {internalMoveLineList} = useInternalLinesWithRacks(internalMove);
  const {
    loadingIMLinesList,
    moreLoading,
    isListEnd,
    internalMoveLineList: originalList,
  } = useSelector(state => state.internalMoveLine);
  const {alternativeBarcodeList} = useSelector(
    state => state.stock_alternativeBarcode,
  );

  const [navigate, setNavigate] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleShowLine = useCallback(
    (item, skipVerification = undefined) => {
      setNavigate(current => !current);
      showLine({
        move: internalMove,
        line: item,
        skipVerification,
        type: LineVerification.type.internal,
      });
    },
    [internalMove, showLine],
  );

  const handleLineSearch = useCallback(
    item => handleShowLine(item, true),
    [handleShowLine],
  );

  const sliceFunctionData = useMemo(
    () => ({alternativeBarcodeList, internalMoveId: internalMove.id}),
    [alternativeBarcodeList, internalMove.id],
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
        searchPlaceholder={I18n.t('Stock_SearchLine')}
        scanKeySearch={scanKey}
        customSearchBarComponent={
          <DoubleScannerSearchBar
            list={originalList}
            loadingList={loadingIMLinesList}
            moreLoading={moreLoading}
            isListEnd={isListEnd}
            sliceFunction={fetchInternalMoveLines}
            sliceFunctionData={sliceFunctionData}
            placeholderSearchBar={I18n.t('Stock_SearchLine')}
            onChangeValue={handleLineSearch}
            displayValue={displayLine}
            sliceBarCodeFunction={searchAlternativeBarcode}
            displayBarCodeInput={baseConfig?.enableMultiBarcodeOnProducts}
            scanKeySearch={scanKey}
            scanKeyBarCode={altScanKey}
            navigate={navigate}
            showDetailsPopup={false}
            selectLastItem
            oneFilter
          />
        }
        headerTopChildren={
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
