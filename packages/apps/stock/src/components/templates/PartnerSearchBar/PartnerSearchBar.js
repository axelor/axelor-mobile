/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {filterClients, filterSuppliers} from '../../../features/partnerSlice';
import {displayPartner} from '../../../utils/displayers';

const PartnerSearchBar = ({
  placeholderKey,
  defaultValue,
  onChange,
  showDetailsPopup = true,
  isClient = true,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingPartners, moreLoading, isListEnd, clientList, supplierList} =
    useSelector(state => state.stock_partner);

  const fetchClientsAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(filterClients({page, searchValue}));
    },
    [dispatch],
  );

  const fetchSuppliersAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(filterSuppliers({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      objectList={isClient ? clientList : supplierList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={isClient ? fetchClientsAPI : fetchSuppliersAPI}
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
