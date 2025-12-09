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

import React, {useMemo, useState} from 'react';
import {ChipSelect, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  LogisticalFormHeader,
  LogisticalFormStockMoveLineCard,
  SelectStockMovePopup,
  SelectStockMovePopupType,
} from '../../logisticalForm';
import {StockMoveTagSelect} from '../../../molecules';
import {StockMoveSearchBar} from '../../../organisms';
import {fetchStockMoveLines} from '../../../../features/stockMoveLineSlice';
import {useLogisticalFormState} from '../../../../hooks';

const stockMoveLineScanKey = 'stock-move-line_logistical-form-state-list';
const stockMoveScanKey = 'stock-move_logistical-form-state-list';

const LogisticalFormStockMoveLinesView = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {options, filterLineState} = useLogisticalFormState();
  const {LogisticalForm} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.LogisticalForm',
  });

  const {logisticalForm} = useSelector(state => state.logisticalForm);
  const {stockMoveLineList, loadingList, moreLoading, isListEnd} = useSelector(
    state => state.stock_stockMoveLine,
  );

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedStockMove, setSelectedStockMove] = useState(null);
  const [popupConfig, setPopupConfig] =
    useState<SelectStockMovePopupType | null>(null);

  const sliceFunctionData = useMemo(
    () => ({
      stockMoveId:
        selectedStockMove?.id ??
        logisticalForm?.stockMoveList?.map((_m: any) => _m.id),
    }),
    [logisticalForm?.stockMoveList, selectedStockMove?.id],
  );

  const filteredList = useMemo(
    () => filterLineState(stockMoveLineList, selectedStatus),
    [filterLineState, selectedStatus, stockMoveLineList],
  );

  const actionList = useMemo(() => {
    if (
      readonly ||
      logisticalForm?.statusSelect === LogisticalForm?.statusSelect.Collected
    )
      return undefined;

    return [
      {
        iconName: 'plus-lg',
        title: I18n.t('Stock_AddStockMove'),
        color: Colors.primaryColor,
        onPress: () => setPopupConfig(SelectStockMovePopupType.add),
      },
      {
        iconName: 'dash-lg',
        title: I18n.t('Stock_RemoveStockMove'),
        color: Colors.errorColor,
        onPress: () => setPopupConfig(SelectStockMovePopupType.remove),
      },
    ];
  }, [
    Colors,
    I18n,
    LogisticalForm?.statusSelect.Collected,
    logisticalForm?.statusSelect,
    readonly,
  ]);

  return (
    <>
      <SearchListView
        scanKeySearch={stockMoveLineScanKey}
        headerTopChildren={
          <>
            <LogisticalFormHeader {...logisticalForm} />
            <StockMoveTagSelect
              titleKey="Stock_LinkedStockMoves"
              items={logisticalForm?.stockMoveList ?? []}
            />
          </>
        }
        fixedItems={
          <StockMoveSearchBar
            defaultValue={selectedStockMove}
            onChange={setSelectedStockMove}
            stockMoveSet={logisticalForm?.stockMoveList ?? []}
            scanKey={stockMoveScanKey}
          />
        }
        list={filteredList}
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
            selectionItems={options}
            onChangeValue={setSelectedStatus}
          />
        }
        renderListItem={({item}) => (
          <LogisticalFormStockMoveLineCard {...item} />
        )}
        isHideableSearch={false}
        actionList={actionList}
        verticalActions={true}
      />
      <SelectStockMovePopup
        logisticalForm={logisticalForm}
        type={popupConfig}
        closePopup={() => setPopupConfig(null)}
      />
    </>
  );
};

export default LogisticalFormStockMoveLinesView;
