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
import {searchCustomerOrderLine} from '../../../features/saleOrderLineSlice';

const displayProductName = item => item.productName;

interface CustomerOrderLineSearchBarProps {
  placeholderKey?: string;
  defaultValue: any;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  onChange: (value: any) => void;
}

const CustomerOrderLineSearchBarAux = ({
  placeholderKey = 'Quality_CustomerOrderLine',
  defaultValue = '',
  onChange = () => {},
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
}: CustomerOrderLineSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {
    customerOrderLineList,
    loadingCustomerOrderLines,
    moreLoadingCustomerOrderLine,
    isListEndCustomerOrderLine,
  } = useSelector(state => state.quality_saleOrderLine);
  const {customerSaleOrderForm} = useSelector(state => state.quality_saleOrder);

  const fetchCustomerOrderLineAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchCustomerOrderLine as any)({
          page,
          searchValue,
          customerSaleOrder: customerSaleOrderForm,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [dispatch, customerSaleOrderForm, user.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      title={I18n.t(placeholderKey)}
      objectList={customerOrderLineList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchCustomerOrderLineAPI}
      displayValue={displayProductName}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingCustomerOrderLines}
      moreLoading={moreLoadingCustomerOrderLine}
      isListEnd={isListEndCustomerOrderLine}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

const CustomerOrderLineSearchBar = ({
  placeholderKey,
  defaultValue,
  onChange = () => {},
  showDetailsPopup,
  navigate,
  oneFilter,
}: CustomerOrderLineSearchBarProps) => {
  return (
    <CustomerOrderLineSearchBarAux
      placeholderKey={placeholderKey}
      defaultValue={defaultValue}
      onChange={onChange}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

export default CustomerOrderLineSearchBar;
