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
import {searchCustomerOrder} from '../../../features/saleOrderSlice';

const displaySeq = item => item.saleOrderSeq;

interface CustomerOrderSearchBarProps {
  placeholderKey?: string;
  defaultValue: any;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  onChange: (value: any) => void;
}

const CustomerOrderSearchBarAux = ({
  placeholderKey = 'Quality_CustomerOrder',
  defaultValue = '',
  onChange = () => {},
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
}: CustomerOrderSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {
    customerOrderList,
    loadingCustomerOrders,
    moreLoadingCustomerOrder,
    isListEndCustomerOrder,
  } = useSelector(state => state.quality_saleOrder);
  const {customerPartnerForm} = useSelector(state => state.quality_partner);

  const fetchSupplierOrderAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchCustomerOrder as any)({
          page,
          searchValue,
          customerPartner: customerPartnerForm,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [dispatch, customerPartnerForm, user.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      title={I18n.t(placeholderKey)}
      objectList={customerOrderList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchSupplierOrderAPI}
      displayValue={displaySeq}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingCustomerOrders}
      moreLoading={moreLoadingCustomerOrder}
      isListEnd={isListEndCustomerOrder}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

const CustomerOrderSearchBar = ({
  placeholderKey,
  defaultValue,
  onChange = () => {},
  showDetailsPopup,
  navigate,
  oneFilter,
}: CustomerOrderSearchBarProps) => {
  return (
    <CustomerOrderSearchBarAux
      placeholderKey={placeholderKey}
      defaultValue={defaultValue}
      onChange={onChange}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

export default CustomerOrderSearchBar;
