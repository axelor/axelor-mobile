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

import React, {useCallback, useState, useMemo} from 'react';
import {ChipSelect, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  DoubleScannerSearchBar,
  SearchListView,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  CustomerDeliveryLineActionCard,
  StockMoveHeader,
} from '../../components';
import {fetchCustomerDeliveryLines} from '../../features/customerDeliveryLineSlice';
import {
  StockMove as StockMoveType,
  StockMoveLine,
  LineVerification,
} from '../../types';
import {useCustomerLinesWithRacks, useLineHandler} from '../../hooks';
import {displayLine} from '../../utils/displayers';
import {searchAlternativeBarcode} from '../../features/alternativeBarcodeSlice';

const scanKey = 'search-trackingNumber-or-product_customer-delivery-line-list';
const altScanKey = 'search-alternative-product_customer-delivery-line-list';

const CustomerDeliveryLineListScreen = ({route}) => {
  const customerDelivery = route.params.customerDelivery;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {showLine} = useLineHandler();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {customerDeliveryLineList} =
    useCustomerLinesWithRacks(customerDelivery);
  const {
    loadingCDLinesList,
    moreLoading,
    isListEnd,
    customerDeliveryLineList: originalList,
  } = useSelector(state => state.customerDeliveryLine);
  const {alternativeBarcodeList} = useSelector(
    state => state.stock_alternativeBarcode,
  );

  const [navigate, setNavigate] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleShowLine = useCallback(
    (item, skipVerification = undefined) => {
      setNavigate(current => !current);
      showLine({
        move: customerDelivery,
        line: item,
        skipVerification,
        type: LineVerification.type.outgoing,
      });
    },
    [customerDelivery, showLine],
  );

  const handleLineSearch = useCallback(
    item => handleShowLine(item, true),
    [handleShowLine],
  );

  const sliceFunctionData = useMemo(
    () => ({alternativeBarcodeList, customerDeliveryId: customerDelivery.id}),
    [alternativeBarcodeList, customerDelivery.id],
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
            StockMoveLine.getStockMoveLineStatus(item, customerDelivery),
        );
      });
    },
    [customerDelivery, selectedStatus],
  );

  const filteredList = useMemo(
    () => filterOnStatus(customerDeliveryLineList),
    [filterOnStatus, customerDeliveryLineList],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={filteredList}
        loading={loadingCDLinesList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchCustomerDeliveryLines}
        sliceFunctionData={sliceFunctionData}
        searchPlaceholder={I18n.t('Stock_SearchLine')}
        scanKeySearch={scanKey}
        customSearchBarComponent={
          <DoubleScannerSearchBar
            list={originalList}
            loadingList={loadingCDLinesList}
            moreLoading={moreLoading}
            isListEnd={isListEnd}
            sliceFunction={fetchCustomerDeliveryLines}
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
            reference={customerDelivery.stockMoveSeq}
            status={customerDelivery.statusSelect}
            date={
              customerDelivery
                ? StockMoveType.getStockMoveDate(
                    customerDelivery.statusSelect,
                    customerDelivery,
                  )
                : null
            }
            availability={customerDelivery.availableStatusSelect}
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
          <CustomerDeliveryLineActionCard
            customerDeliveryLine={item}
            handleShowLine={handleShowLine}
          />
        )}
      />
    </Screen>
  );
};

export default CustomerDeliveryLineListScreen;
