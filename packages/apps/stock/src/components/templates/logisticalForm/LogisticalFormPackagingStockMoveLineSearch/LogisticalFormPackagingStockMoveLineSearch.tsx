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

import React, {useCallback, useEffect, useMemo} from 'react';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchPackagingStockMoveLines} from '../../../../features/stockMoveLineSlice';

interface LogisticalFormPackagingStockMoveLineSearchProps {
  defaultValue?: any;
  onChange?: (value: any) => void;
  style?: any;
}

const LogisticalFormPackagingStockMoveLineSearchAux = ({
  defaultValue,
  onChange,
  style,
}: LogisticalFormPackagingStockMoveLineSearchProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {logisticalForm} = useSelector((state: any) => state.logisticalForm);
  const {
    packagingStockMoveLines = [],
    loadingPackagingLines = false,
    moreLoadingPackagingLines = false,
    isListEndPackagingLines = false,
  } = useSelector((state: any) => state.stockMoveLine ?? {});

  const stockMoveIds = useMemo(
    () => (logisticalForm?.stockMoveList ?? []).map((move: any) => move?.id),
    [logisticalForm?.stockMoveList],
  );

  const fetchLines = useCallback(
    async ({page = 0, searchValue}: {page?: number; searchValue?: string}) => {
      dispatch(
        (fetchPackagingStockMoveLines as any)({
          stockMoveIds,
          searchValue,
          page,
        }),
      );
    },
    [dispatch, stockMoveIds],
  );

  useEffect(() => {
    fetchLines({page: 0, searchValue: null});
  }, [fetchLines]);

  const displayValue = useCallback((line: any) => line?.product?.fullName, []);

  return (
    <AutoCompleteSearch
      style={style}
      objectList={packagingStockMoveLines}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchLines}
      displayValue={displayValue}
      placeholder={I18n.t('Stock_StockMoveLine')}
      showDetailsPopup={true}
      loadingList={loadingPackagingLines}
      moreLoading={moreLoadingPackagingLines}
      isListEnd={isListEndPackagingLines}
      oneFilter={false}
      selectLastItem={false}
    />
  );
};

const LogisticalFormPackagingStockMoveLineSearch = (props: any) => (
  <LogisticalFormPackagingStockMoveLineSearchAux {...props} />
);

export default LogisticalFormPackagingStockMoveLineSearch;
