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
import {searchCustomer} from '../../../features/customerSlice';
import {displayItemFullname} from '../../../utils/displayers';

interface CustomerSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (item: any) => void;
  readonly?: boolean;
  required?: boolean;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  showTitle?: boolean;
}

const CustomerSearchBar = ({
  style,
  title = 'Helpdesk_CustomPartner',
  defaultValue,
  onChange,
  required = false,
  readonly = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  showTitle = true,
}: CustomerSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {customerList, loading, moreLoading, isListEnd} = useSelector(
    state => state.helpdesk_customer,
  );
  const {user} = useSelector(state => state.user);

  const searchCustomerAPI = useCallback(
    ({page = 0, searchValue}: any) => {
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
      title={showTitle ? I18n.t(title) : undefined}
      objectList={customerList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchCustomerAPI}
      displayValue={displayItemFullname}
      placeholder={I18n.t(title)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={navigate}
      oneFilter={oneFilter}
      style={style}
    />
  );
};

export default CustomerSearchBar;
