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
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {displayStockMoveSeq} from '../../../utils';
import {searchStockMove} from '../../../features/stockMoveSlice';

type StockMoveSearchFilters = Partial<{
  stockMoveIds: number[];
  excludeStockMoveIds: number[];
  typeSelectList: number[];
  partnerId: number;
  statusList: number[];
  companyId: number;
}>;

interface StockMoveSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange?: (value: any) => void;
  showDetailsPopup?: boolean;
  isScrollViewContainer?: boolean;
  required?: boolean;
  readonly?: boolean;
  showTitle?: boolean;
  stockMoveSet?: any[];
  searchFilters?: StockMoveSearchFilters;
}

const StockMoveSearchBarAux = ({
  style,
  title = 'Stock_StockMove',
  defaultValue,
  onChange,
  showDetailsPopup = true,
  isScrollViewContainer = false,
  required = false,
  readonly = false,
  showTitle = false,
  stockMoveSet,
  searchFilters,
}: StockMoveSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    loadingStockMoves,
    moreLoadingStockMove,
    isListEndStockMove,
    stockMoveList,
  } = useSelector(state => state.stock_stockMove);

  const stockMoveIds = useMemo<number[]>(
    () => stockMoveSet?.map(_m => _m.id) ?? [],
    [stockMoveSet],
  );

  const fetchStockMovesAPI = useCallback(
    ({page = 0, searchValue}) => {
      const payload: any = {
        page,
        searchValue,
        ...(searchFilters ?? {}),
      };

      if (
        Array.isArray(stockMoveIds) &&
        stockMoveIds.length > 0 &&
        (searchFilters == null || searchFilters.stockMoveIds == null)
      ) {
        payload.stockMoveIds = stockMoveIds;
      }

      dispatch(
        (searchStockMove as any)({
          ...payload,
        }),
      );
    },
    [dispatch, searchFilters, stockMoveIds],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      placeholder={I18n.t(title)}
      loadingList={loadingStockMoves}
      moreLoading={moreLoadingStockMove}
      isListEnd={isListEndStockMove}
      objectList={stockMoveList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={fetchStockMovesAPI}
      displayValue={displayStockMoveSeq}
      showDetailsPopup={showDetailsPopup}
      isScrollViewContainer={isScrollViewContainer}
    />
  );
};

const StockMoveSearchBar = (props: StockMoveSearchBarProps) => {
  return <StockMoveSearchBarAux {...props} />;
};

export default StockMoveSearchBar;
