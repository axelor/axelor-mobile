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
import {searchSupplierOrder} from '../../../features/purchaseOrderSlice';

const displaySeq = item => item.purchaseOrderSeq;

interface SupplierOrderSearchBarProps {
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

const SupplierOrderSearchBarAux = ({
  style,
  title = 'Quality_SupplierOrder',
  defaultValue,
  onChange,
  objectState,
  required = false,
  readonly = false,
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

  const supplierPartner = useMemo(
    () => objectState?.supplierPartner,
    [objectState?.supplierPartner],
  );

  const purchaseOrderIdList = useMemo(
    () => objectState?.purchaseOrderIdList,
    [objectState?.purchaseOrderIdList],
  );

  const fetchSupplierOrderAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchSupplierOrder as any)({
          page,
          searchValue,
          supplierPartner,
          companyId: user.activeCompany?.id,
          purchaseOrderIdList,
        }),
      );
    },
    [dispatch, purchaseOrderIdList, supplierPartner, user.activeCompany?.id],
  );

  useEffect(() => {
    if (
      Array.isArray(purchaseOrderIdList) &&
      purchaseOrderIdList.length > 0 &&
      supplierPurchaseOrderList.length === 1
    ) {
      onChange(supplierPurchaseOrderList[0]);
    }
  }, [onChange, purchaseOrderIdList, supplierPurchaseOrderList]);

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      placeholder={I18n.t(title)}
      objectList={supplierPurchaseOrderList}
      loadingList={loadingSupplierPurchaseOrders}
      moreLoading={moreLoadingSupplierPurchaseOrder}
      isListEnd={isListEndSupplierPurchaseOrder}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchSupplierOrderAPI}
      displayValue={displaySeq}
      readonly={readonly}
      required={required}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

const SupplierOrderSearchBar = (props: SupplierOrderSearchBarProps) => {
  return <SupplierOrderSearchBarAux {...props} />;
};

export default SupplierOrderSearchBar;
