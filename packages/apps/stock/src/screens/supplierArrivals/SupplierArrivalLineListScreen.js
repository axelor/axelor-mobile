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
import {StockMoveHeader, SupplierArrivalLineActionCard} from '../../components';
import {fetchSupplierArrivalLines} from '../../features/supplierArrivalLineSlice';
import {LineVerification, StockMove, StockMoveLine} from '../../types';
import {useLineHandler, useSupplierLinesWithRacks} from '../../hooks';
import {displayLine} from '../../utils/displayers';
import {searchAlternativeBarcode} from '../../features/alternativeBarcodeSlice';

const scanKey = 'search-trackingNumber-or-product_supplier-arrival-line-list';
const altScanKey = 'search-alternative-product_supplier-arrival-line-list';

const SupplierArrivalLineListScreen = ({route}) => {
  const supplierArrival = route.params.supplierArrival;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {showLine} = useLineHandler();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {supplierArrivalLineList} = useSupplierLinesWithRacks(supplierArrival);
  const {
    loadingSALinesList,
    moreLoading,
    isListEnd,
    supplierArrivalLineList: originalList,
  } = useSelector(state => state.supplierArrivalLine);
  const {alternativeBarcodeList} = useSelector(
    state => state.stock_alternativeBarcode,
  );

  const [navigate, setNavigate] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleShowLine = useCallback(
    (item, skipVerification = undefined) => {
      setNavigate(current => !current);
      showLine({
        move: supplierArrival,
        line: item,
        skipVerification,
        type: LineVerification.type.incoming,
      });
    },
    [showLine, supplierArrival],
  );

  const handleLineSearch = useCallback(
    item => handleShowLine(item, true),
    [handleShowLine],
  );

  const sliceFunctionData = useMemo(
    () => ({alternativeBarcodeList, supplierArrivalId: supplierArrival.id}),
    [alternativeBarcodeList, supplierArrival.id],
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
            StockMoveLine.getStockMoveLineStatus(item, supplierArrival),
        );
      });
    },
    [selectedStatus, supplierArrival],
  );

  const filteredList = useMemo(
    () => filterOnStatus(supplierArrivalLineList),
    [filterOnStatus, supplierArrivalLineList],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={filteredList}
        loading={loadingSALinesList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchSupplierArrivalLines}
        sliceFunctionData={sliceFunctionData}
        searchPlaceholder={I18n.t('Stock_SearchLine')}
        scanKeySearch={scanKey}
        customSearchBarComponent={
          <DoubleScannerSearchBar
            list={originalList}
            loadingList={loadingSALinesList}
            moreLoading={moreLoading}
            isListEnd={isListEnd}
            sliceFunction={fetchSupplierArrivalLines}
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
            reference={supplierArrival.stockMoveSeq}
            status={supplierArrival.statusSelect}
            date={
              supplierArrival
                ? StockMove.getStockMoveDate(
                    supplierArrival.statusSelect,
                    supplierArrival,
                  )
                : null
            }
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
          <SupplierArrivalLineActionCard
            supplierArrivalLine={item}
            handleShowLine={handleShowLine}
          />
        )}
      />
    </Screen>
  );
};

export default SupplierArrivalLineListScreen;
