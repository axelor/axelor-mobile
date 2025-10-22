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

import React, {useMemo, useState} from 'react';
import {ActionType, ChipSelect, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  LogisticalFormHeader,
  LogisticalFormStockMoveLineCard,
} from '../../logisticalForm';
import {StockMoveTagSelect} from '../../../molecules';
import {StockMoveSearchBar} from '../../../organisms';
import {fetchStockMoveLines} from '../../../../features/stockMoveLineSlice';
import {useLogisticalFormState} from '../../../../hooks';
import LogisticalFormSelectStockMovePopup from './LogisticalFormSelectStockMovePopup';

const stockMoveLineScanKey = 'stock-move-line_logistical-form-state-list';

const LogisticalFormStockMoveLinesView = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {options, filterLineState} = useLogisticalFormState();

  const {logisticalForm} = useSelector(state => state.logisticalForm);
  const {user} = useSelector(state => state.user);
  const {stockMoveLineList, loadingList, moreLoading, isListEnd} = useSelector(
    state => state.stock_stockMoveLine,
  );

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedStockMove, setSelectedStockMove] = useState(null);
  const companyId = user?.activeCompany?.id;
  const stockConfig = user?.activeCompany?.stockConfig;

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

  const [popupActions, setPopupActions] = useState<ActionType[]>([]);

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
        actionList={popupActions}
        verticalActions={true}
      />
      <LogisticalFormSelectStockMovePopup
        logisticalForm={logisticalForm}
        stockConfig={stockConfig}
        companyId={companyId}
        translator={I18n.t}
        colors={Colors}
        onActionListChange={setPopupActions}
      />
    </>
  );
};

export default LogisticalFormStockMoveLinesView;
