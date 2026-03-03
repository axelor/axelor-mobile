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

import React, {useCallback, useMemo} from 'react';
import {
  useDispatch,
  useSelector,
  useTranslator,
  displayItemFullname,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchCustomerOrderLine} from '../../../features/saleOrderLineSlice';

interface CustomerOrderLineSearchBarProps {
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

const CustomerOrderLineSearchBarAux = ({
  style,
  title = 'Quality_CustomerOrderLine',
  defaultValue,
  onChange,
  objectState,
  required = false,
  readonly = false,
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

  const customerSaleOrder = useMemo(
    () => objectState?.customerSaleOrder,
    [objectState?.customerSaleOrder],
  );

  const fetchCustomerOrderLineAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchCustomerOrderLine as any)({
          page,
          searchValue,
          customerSaleOrder,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [dispatch, customerSaleOrder, user.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      placeholder={I18n.t(title)}
      objectList={customerOrderLineList}
      loadingList={loadingCustomerOrderLines}
      moreLoading={moreLoadingCustomerOrderLine}
      isListEnd={isListEndCustomerOrderLine}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchCustomerOrderLineAPI}
      displayValue={displayItemFullname}
      readonly={readonly}
      required={required}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

const CustomerOrderLineSearchBar = (props: CustomerOrderLineSearchBarProps) => {
  return <CustomerOrderLineSearchBarAux {...props} />;
};

export default CustomerOrderLineSearchBar;
