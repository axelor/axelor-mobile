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
import {searchSupplier} from '../../../features/partnerSlice';

const displaySimpleFullName = item => item.simpleFullName;

interface SupplierSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange: (value?: any) => void;
  required?: boolean;
  readonly?: boolean;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
}

const SupplierSearchBarAux = ({
  style,
  title = 'Quality_Supplier',
  defaultValue,
  onChange,
  required = false,
  readonly = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
}: SupplierSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {
    supplierList,
    loadingSuppliers,
    moreLoadingSupplier,
    isListEndSupplier,
  } = useSelector(state => state.quality_partner);

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
      style={style}
      title={I18n.t(title)}
      placeholder={I18n.t(title)}
      objectList={supplierList}
      loadingList={loadingSuppliers}
      moreLoading={moreLoadingSupplier}
      isListEnd={isListEndSupplier}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchSupplierAPI}
      displayValue={displaySimpleFullName}
      readonly={readonly}
      required={required}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

const SupplierSearchBar = (props: SupplierSearchBarProps) => {
  return <SupplierSearchBarAux {...props} />;
};

export default SupplierSearchBar;
