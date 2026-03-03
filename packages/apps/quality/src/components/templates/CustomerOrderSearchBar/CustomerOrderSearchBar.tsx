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

import React, {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchCustomerOrder} from '../../../features/saleOrderSlice';

const displaySeq = item => item.saleOrderSeq;

interface CustomerOrderSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange: (value?: any) => void;
  objectState?: any;
  required?: boolean;
  readonly?: boolean;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
}

const CustomerOrderSearchBarAux = ({
  style,
  title = 'Quality_CustomerOrder',
  defaultValue,
  onChange,
  objectState,
  required = false,
  readonly = false,
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

  const customerPartner = useMemo(
    () => objectState?.customerPartner,
    [objectState?.customerPartner],
  );

  const saleOrderIdList = useMemo(
    () => objectState?.saleOrderIdList,
    [objectState?.saleOrderIdList],
  );

  const fetchCustomerOrderAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchCustomerOrder as any)({
          page,
          searchValue,
          customerPartner,
          companyId: user.activeCompany?.id,
          saleOrderIdList,
        }),
      );
    },
    [dispatch, customerPartner, user.activeCompany?.id, saleOrderIdList],
  );

  useEffect(() => {
    if (
      Array.isArray(saleOrderIdList) &&
      saleOrderIdList.length > 0 &&
      customerOrderList.length === 1
    ) {
      onChange(customerOrderList[0]);
    }
  }, [customerOrderList, customerOrderList.length, onChange, saleOrderIdList]);

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      placeholder={I18n.t(title)}
      objectList={customerOrderList}
      loadingList={loadingCustomerOrders}
      moreLoading={moreLoadingCustomerOrder}
      isListEnd={isListEndCustomerOrder}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchCustomerOrderAPI}
      displayValue={displaySeq}
      readonly={readonly}
      required={required}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

const CustomerOrderSearchBar = (props: CustomerOrderSearchBarProps) => {
  return <CustomerOrderSearchBarAux {...props} />;
};

export default CustomerOrderSearchBar;
