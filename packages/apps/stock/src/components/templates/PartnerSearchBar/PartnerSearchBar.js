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

import React, {useCallback, useMemo} from 'react';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  filterCarriers,
  filterClients,
  filterSuppliers,
} from '../../../features/partnerSlice';
import {displayPartner} from '../../../utils/displayers';

const PartnerSearchBar = ({
  placeholderKey,
  defaultValue,
  onChange,
  showDetailsPopup = true,
  isClient = true,
  partnerType,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    loadingPartners,
    moreLoading,
    isListEnd,
    clientList,
    supplierList,
    carrierList,
  } = useSelector(state => state.stock_partner);
  const {user} = useSelector(state => state.user);

  const type = useMemo(() => {
    if (partnerType != null) {
      return partnerType;
    }

    return isClient ? 'client' : 'supplier';
  }, [isClient, partnerType]);

  const fetchClientsAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        filterClients({page, searchValue, companyId: user.activeCompany?.id}),
      );
    },
    [dispatch, user.activeCompany?.id],
  );

  const fetchSuppliersAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        filterSuppliers({page, searchValue, companyId: user.activeCompany?.id}),
      );
    },
    [dispatch, user.activeCompany?.id],
  );

  const fetchCarriersAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        filterCarriers({page, searchValue, companyId: user.activeCompany?.id}),
      );
    },
    [dispatch, user.activeCompany?.id],
  );

  const {objectList, fetchData} = useMemo(() => {
    switch (type) {
      case 'supplier':
        return {objectList: supplierList, fetchData: fetchSuppliersAPI};
      case 'carrier':
        return {objectList: carrierList, fetchData: fetchCarriersAPI};
      default:
        return {objectList: clientList, fetchData: fetchClientsAPI};
    }
  }, [
    carrierList,
    clientList,
    fetchCarriersAPI,
    fetchClientsAPI,
    fetchSuppliersAPI,
    supplierList,
    type,
  ]);

  return (
    <AutoCompleteSearch
      objectList={objectList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchData}
      displayValue={displayPartner}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingPartners}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
    />
  );
};

export default PartnerSearchBar;
