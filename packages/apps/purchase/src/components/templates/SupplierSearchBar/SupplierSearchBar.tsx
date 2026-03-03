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

import React, {useCallback} from 'react';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchSupplier} from '../../../features/supplierSlice';

const displaySimpleFullName = item => item.simpleFullName;

interface SupplierSearchBarProps {
  placeholderKey?: string;
  defaultValue: any;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  onChange: (value: any) => void;
}

const SupplierSearchBar = ({
  placeholderKey = 'Purchase_Supplier',
  defaultValue = '',
  onChange = () => {},
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
}: SupplierSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    supplierList,
    loadingSuppliers,
    moreLoadingSupplier,
    isListEndSupplier,
  } = useSelector(state => state.purchase_supplier);
  const {user} = useSelector(state => state.user);

  const fetchSupplierAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchSupplier as any)({
          page,
          searchValue,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [dispatch, user.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      objectList={supplierList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchSupplierAPI}
      displayValue={displaySimpleFullName}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingSuppliers}
      moreLoading={moreLoadingSupplier}
      isListEnd={isListEndSupplier}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

export default SupplierSearchBar;
