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

import React, {useCallback} from 'react';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchCustomer} from '../../../features/partnerSlice';

const displaySimpleFullName = item => item.simpleFullName;

interface CustomerSearchBarProps {
  placeholderKey?: string;
  defaultValue: any;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  onChange: (value: any) => void;
}

const CustomerSearchBarAux = ({
  placeholderKey = 'Quality_Customer',
  defaultValue = '',
  onChange = () => {},
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
}: CustomerSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {
    customerList,
    loadingCustomer,
    moreLoadingCustomer,
    isListEndCustomer,
  } = useSelector(state => state.quality_partner);

  const fetchCustomerAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchCustomer as any)({
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
      title={I18n.t(placeholderKey)}
      objectList={customerList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchCustomerAPI}
      displayValue={displaySimpleFullName}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingCustomer}
      moreLoading={moreLoadingCustomer}
      isListEnd={isListEndCustomer}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

const CustomerSearchBar = ({
  placeholderKey,
  defaultValue,
  onChange = () => {},
  showDetailsPopup,
  navigate,
  oneFilter,
}: CustomerSearchBarProps) => {
  return (
    <CustomerSearchBarAux
      placeholderKey={placeholderKey}
      defaultValue={defaultValue}
      onChange={onChange}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

export default CustomerSearchBar;
