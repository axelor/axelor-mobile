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

import React, {useCallback, useMemo} from 'react';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {fetchStockMoveLines} from '../../../features/stockMoveLineSlice';

const DEFAULT_SCAN_KEY = 'stock-move-line_search-bar';

const displayProductFullName = (line: any) => line?.product?.fullName;

interface StockMoveLineSearchBarProps {
  style?: any;
  title?: string;
  scanKeySearch?: string;
  defaultValue?: any;
  onChange?: (value: any) => void;
  showDetailsPopup?: boolean;
  isScrollViewContainer?: boolean;
  showTitle?: boolean;
  readonly?: boolean;
  required?: boolean;
  objectState?: any;
}

const StockMoveLineSearchBarAux = ({
  style,
  title = 'Stock_StockMoveLine',
  scanKeySearch = DEFAULT_SCAN_KEY,
  defaultValue,
  onChange,
  showDetailsPopup = true,
  isScrollViewContainer = false,
  showTitle = true,
  readonly = false,
  required = false,
  objectState,
}: StockMoveLineSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingList, moreLoading, isListEnd, stockMoveLineList} = useSelector(
    state => state.stock_stockMoveLine,
  );

  const stockMoveId = useMemo(
    () => (objectState?.stockMoveSet ?? []).map((_m: any) => _m?.id),
    [objectState?.stockMoveSet],
  );

  const fetchLines = useCallback(
    async ({page = 0, searchValue}: {page?: number; searchValue?: string}) => {
      dispatch((fetchStockMoveLines as any)({stockMoveId, searchValue, page}));
    },
    [dispatch, stockMoveId],
  );

  return (
    <ScannerAutocompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      placeholder={I18n.t(title)}
      scanKeySearch={scanKeySearch}
      loadingList={loadingList}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      objectList={stockMoveLineList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={fetchLines}
      displayValue={displayProductFullName}
      showDetailsPopup={showDetailsPopup}
      isScrollViewContainer={isScrollViewContainer}
    />
  );
};

const StockMoveLineSearchBar = (props: StockMoveLineSearchBarProps) => (
  <StockMoveLineSearchBarAux {...props} />
);

export default StockMoveLineSearchBar;
