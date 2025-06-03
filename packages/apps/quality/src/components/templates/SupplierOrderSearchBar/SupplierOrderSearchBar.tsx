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
import {searchSupplierOrder} from '../../../features/purchaseOrderSlice';

const displaySeq = item => item.purchaseOrderSeq;

interface SupplierOrderSearchBarProps {
  placeholderKey?: string;
  defaultValue: any;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  onChange: (value: any) => void;
}

const SupplierOrderSearchBarAux = ({
  placeholderKey = 'Quality_SupplierOrder',
  defaultValue = '',
  onChange = () => {},
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
}: SupplierOrderSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {
    supplierPurchaseOrderList,
    loadingSupplierPurchaseOrders,
    moreLoadingSupplierPurchaseOrder,
    isListEndSupplierPurchaseOrder,
  } = useSelector(state => state.quality_purchaseOrder);
  const {supplierPartnerForm} = useSelector(state => state.quality_partner);

  const fetchSupplierOrderAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchSupplierOrder as any)({
          page,
          searchValue,
          supplierPartner: supplierPartnerForm,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [dispatch, supplierPartnerForm, user.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      title={I18n.t(placeholderKey)}
      objectList={supplierPurchaseOrderList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchSupplierOrderAPI}
      displayValue={displaySeq}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingSupplierPurchaseOrders}
      moreLoading={moreLoadingSupplierPurchaseOrder}
      isListEnd={isListEndSupplierPurchaseOrder}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

const SupplierOrderSearchBar = ({
  placeholderKey,
  defaultValue,
  onChange = () => {},
  showDetailsPopup,
  navigate,
  oneFilter,
}: SupplierOrderSearchBarProps) => {
  return (
    <SupplierOrderSearchBarAux
      placeholderKey={placeholderKey}
      defaultValue={defaultValue}
      onChange={onChange}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

export default SupplierOrderSearchBar;
