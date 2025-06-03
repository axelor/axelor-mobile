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
import {
  displayItemFullname,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchSupplierPurchaseOrderLine} from '../../../features/purchaseOrderLineSlice';

interface SupplierOrderLineSearchBarProps {
  placeholderKey?: string;
  defaultValue: any;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  onChange: (value: any) => void;
}

const SupplierOrderLineSearchBarAux = ({
  placeholderKey = 'Quality_SupplierOrderLine',
  defaultValue = '',
  onChange = () => {},
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
}: SupplierOrderLineSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {
    supplierpurchaseOrderLineList,
    loadingSupplierPurchaseOrderLines,
    moreLoadingSupplierPurchaseOrderLine,
    isListEndSupplierPurchaseOrderLine,
  } = useSelector(state => state.quality_purchaseOrderLine);
  const {supplierOrderForm} = useSelector(state => state.quality_purchaseOrder);

  const fetchSupplierOrderLineAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchSupplierPurchaseOrderLine as any)({
          page,
          searchValue,
          purchaseOrder: supplierOrderForm,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [dispatch, supplierOrderForm, user.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      title={I18n.t(placeholderKey)}
      objectList={supplierpurchaseOrderLineList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchSupplierOrderLineAPI}
      displayValue={displayItemFullname}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingSupplierPurchaseOrderLines}
      moreLoading={moreLoadingSupplierPurchaseOrderLine}
      isListEnd={isListEndSupplierPurchaseOrderLine}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

const SupplierOrderLineSearchBar = ({
  placeholderKey,
  defaultValue,
  onChange = () => {},
  showDetailsPopup,
  navigate,
  oneFilter,
}: SupplierOrderLineSearchBarProps) => {
  return (
    <SupplierOrderLineSearchBarAux
      placeholderKey={placeholderKey}
      defaultValue={defaultValue}
      onChange={onChange}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

export default SupplierOrderLineSearchBar;
