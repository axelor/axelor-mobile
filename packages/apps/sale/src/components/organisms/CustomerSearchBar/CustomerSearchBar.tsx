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
  displayItemFullname,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchCustomer} from '../../../features/customerSlice';

interface CustomerSearchbarProps {
  style?: any;
  title?: string;
  showTitle?: boolean;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
  companyId?: number;
}

const CustomerSearchBar = ({
  style = null,
  title = 'Sale_Customer',
  showTitle = false,
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  companyId: _companyId,
}: CustomerSearchbarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {loading, moreLoading, isListEnd, customerList} = useSelector(
    (state: any) => state.sale_customer,
  );

  const companyId = useMemo(
    () => _companyId ?? user.activeCompany?.id,
    [_companyId, user.activeCompany?.id],
  );

  const searchCustomerAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch((searchCustomer as any)({page, searchValue, companyId}));
    },
    [dispatch, companyId],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      objectList={customerList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchCustomerAPI}
      displayValue={displayItemFullname}
      placeholder={I18n.t(title)}
      showDetailsPopup={true}
      loadingList={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={false}
      oneFilter={false}
      translator={I18n.t}
    />
  );
};

export default CustomerSearchBar;
