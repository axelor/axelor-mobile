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
  displayItemFullname,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchSupplierPurchaseOrderLine} from '../../../features/purchaseOrderLineSlice';

interface SupplierOrderLineSearchBarProps {
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

const SupplierOrderLineSearchBarAux = ({
  style,
  title = 'Quality_SupplierOrderLine',
  defaultValue,
  onChange,
  objectState,
  required = false,
  readonly = false,
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

  const purchaseOrder = useMemo(
    () => objectState?.supplierPurchaseOrder,
    [objectState?.supplierPurchaseOrder],
  );

  const fetchSupplierOrderLineAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchSupplierPurchaseOrderLine as any)({
          page,
          searchValue,
          purchaseOrder,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [dispatch, purchaseOrder, user.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      placeholder={I18n.t(title)}
      objectList={supplierpurchaseOrderLineList}
      loadingList={loadingSupplierPurchaseOrderLines}
      moreLoading={moreLoadingSupplierPurchaseOrderLine}
      isListEnd={isListEndSupplierPurchaseOrderLine}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchSupplierOrderLineAPI}
      displayValue={displayItemFullname}
      readonly={readonly}
      required={required}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

const SupplierOrderLineSearchBar = (props: SupplierOrderLineSearchBarProps) => {
  return <SupplierOrderLineSearchBarAux {...props} />;
};

export default SupplierOrderLineSearchBar;
