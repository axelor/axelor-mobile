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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  AutoCompleteSearch,
  ChipSelect,
  Screen,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {fetchStockMoveLines} from '../../../../features/stockMoveLineSlice';
import LogisticalFormStockMoveLineCard from '../LogisticalFormStockMoveLineCard/LogisticalFormStockMoveLineCard';
import {StockMoveTagSelect} from '../../../molecules';
import LogisticalFormHeader from '../LogisticalFormHeader/LogisticalFormHeader';

const PACKAGING_STATUS = {
  NOT_PROCESSED: 'not_processed',
  PARTIALLY: 'partially',
  PROCESSED: 'processed',
};

const getPackagingStatus = (line: any): string => {
  if (line?.qtyRemainingToPackage === 0) {
    return PACKAGING_STATUS.PROCESSED;
  }

  if (line?.qtyRemainingToPackage === line?.qty) {
    return PACKAGING_STATUS.NOT_PROCESSED;
  }

  return PACKAGING_STATUS.PARTIALLY;
};

const LogisticalFormStockMoveLinesView = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {logisticalForm} = useSelector(state => state.logisticalForm);
  const {stockMoveLineList, loadingList, moreLoading, isListEnd} = useSelector(
    state => state.stockMoveLine,
  );

  const stockMoveItems = useMemo(() => {
    return (logisticalForm?.stockMoveList ?? []).map((move, index) => ({
      key: move?.id,
      label: move?.stockMoveSeq ?? `${move?.id}`,
      color: Colors.infoColor,
      order: index,
    }));
  }, [Colors.infoColor, logisticalForm?.stockMoveList]);

  const [selectedStockMoveId, setSelectedStockMoveId] = useState<
    string | number | null
  >(stockMoveItems[0]?.key ?? null);

  useEffect(() => {
    setSelectedStockMoveId(prev => {
      if (stockMoveItems.length === 0) {
        return null;
      }

      if (prev != null && stockMoveItems.some(item => item.key === prev)) {
        return prev;
      }

      return stockMoveItems[0].key;
    });
  }, [stockMoveItems]);

  const statusOptions = useMemo(() => {
    return [
      {
        key: PACKAGING_STATUS.NOT_PROCESSED,
        label: I18n.t('Stock_PackagingStatus_NotProcessed'),
        color: Colors.defaultColor,
      },
      {
        key: PACKAGING_STATUS.PARTIALLY,
        label: I18n.t('Stock_PackagingStatus_Partially'),
        color: Colors.cautionColor,
      },
      {
        key: PACKAGING_STATUS.PROCESSED,
        label: I18n.t('Stock_PackagingStatus_Processed'),
        color: Colors.successColor,
      },
    ];
  }, [Colors.cautionColor, Colors.defaultColor, Colors.successColor, I18n]);

  const allStatusKeys = useMemo(
    () => statusOptions.map(option => option.key),
    [statusOptions],
  );

  const [selectedStatusKeys, setSelectedStatusKeys] =
    useState<string[]>(allStatusKeys);

  useEffect(() => {
    setSelectedStatusKeys(prev => {
      const current = Array.isArray(prev) ? prev : [];
      const next = current.filter(key => allStatusKeys.includes(key));

      if (next.length === 0) {
        const shouldReset =
          current.length !== allStatusKeys.length ||
          current.some(key => !allStatusKeys.includes(key));

        return shouldReset ? allStatusKeys : current;
      }

      if (next.length === current.length) {
        return current;
      }

      return next;
    });
  }, [allStatusKeys]);

  const statusChipItems = useMemo(
    () =>
      statusOptions.map(option => ({
        key: option.key,
        title: option.label,
        color: option.color,
        isActive: selectedStatusKeys.includes(option.key),
      })),
    [selectedStatusKeys, statusOptions],
  );

  const handleStatusChipChange = useCallback(
    (items: any[]) => {
      if (!Array.isArray(items) || items.length === 0) {
        setSelectedStatusKeys(allStatusKeys);
        return;
      }

      setSelectedStatusKeys(items.map(item => String(item.key)));
    },
    [allStatusKeys],
  );

  const renderLineItem = useCallback(
    ({item}) => {
      const status = getPackagingStatus(item);
      const statusColor =
        statusOptions.find(option => option.key === status)?.color
          ?.background ?? Colors.defaultColor.background;
      const remainingQty = item?.qtyRemainingToPackage;

      return (
        <LogisticalFormStockMoveLineCard
          line={item}
          remainingQty={remainingQty}
          statusColor={statusColor}
        />
      );
    },
    [Colors.defaultColor.background, statusOptions],
  );

  const handleSelectStockMove = useCallback((key: string | number | null) => {
    setSelectedStockMoveId(key);
  }, []);

  const filteredLines = useMemo(() => {
    if (!Array.isArray(stockMoveLineList)) {
      return [];
    }

    return stockMoveLineList.filter(item => {
      const isSelectedMove =
        selectedStockMoveId == null ||
        item?.stockMove?.id === selectedStockMoveId;

      return (
        isSelectedMove && selectedStatusKeys.includes(getPackagingStatus(item))
      );
    });
  }, [selectedStatusKeys, selectedStockMoveId, stockMoveLineList]);

  const selectedStockMoveOption = useMemo(
    () => stockMoveItems.find(item => item.key === selectedStockMoveId) ?? null,
    [selectedStockMoveId, stockMoveItems],
  );

  const handleStockMoveAutoCompleteChange = useCallback((item: any) => {
    if (item?.key != null) {
      setSelectedStockMoveId(item.key);
    } else {
      setSelectedStockMoveId(null);
    }
  }, []);

  const sliceFunctionData = useMemo(
    () => ({stockMoveId: selectedStockMoveId}),
    [selectedStockMoveId],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={filteredLines}
        loading={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchStockMoveLines}
        sliceFunctionData={sliceFunctionData}
        searchPlaceholder={I18n.t('Stock_SearchLine')}
        displaySearchValue={item => item?.product?.fullName}
        chipComponent={
          <ChipSelect
            mode="multi"
            selectionItems={statusChipItems}
            onChangeValue={handleStatusChipChange}
          />
        }
        topFixedItems={
          <>
            <LogisticalFormHeader {...logisticalForm} />
            <StockMoveTagSelect
              title={I18n.t('Stock_LinkedStockMoves')}
              items={stockMoveItems}
              selectedKey={selectedStockMoveId}
              onSelect={handleSelectStockMove}
              defaultColor={Colors.infoColor}
              emptyLabel={I18n.t('Stock_NoLinkedStockMove')}
              colors={Colors}
            />
          </>
        }
        fixedItems={
          <AutoCompleteSearch
            objectList={stockMoveItems}
            value={selectedStockMoveOption}
            onChangeValue={handleStockMoveAutoCompleteChange}
            displayValue={item => item?.label ?? ''}
            placeholder={I18n.t('Stock_SearchStockMove')}
            selectLastItem={false}
            showDetailsPopup={true}
            oneFilter={true}
            readonly={stockMoveItems.length === 0}
          />
        }
        renderListItem={renderLineItem}
        isHideableSearch={false}
        expandableFilter={false}
      />
    </Screen>
  );
};

export default LogisticalFormStockMoveLinesView;
