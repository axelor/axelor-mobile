/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useCallback} from 'react';
import {
  displayItemName,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {fetchSupplierArrivalLines} from '../../../../features/supplierArrivalLineSlice';

const SupplierArrivalLineSearchBar = ({
  placeholderKey = 'Stock_SearchLine',
  defaultValue,
  onChange,
  scanKey,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {supplierArrivalLineList, loadingSALines, moreLoading, isListEnd} =
    useSelector(state => state.supplierArrivalLine);

  const fetchLineAPI = useCallback(
    ({page = 0, searchValue}) => {
      console.log(searchValue);
      dispatch(
        fetchSupplierArrivalLines({page: page, searchValue: searchValue}),
      );
    },
    [dispatch],
  );

  return (
    <ScannerAutocompleteSearch
      objectList={supplierArrivalLineList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchLineAPI}
      displayValue={displayItemName}
      scanKeySearch={scanKey}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingSALines}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
    />
  );
};

export default SupplierArrivalLineSearchBar;
