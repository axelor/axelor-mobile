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
import {displayPartner} from '../../../utils';

type PartnerType = 'client' | 'supplier' | 'carrier';

type PartnerSearchBarProps = {
  style?: any;
  placeholderKey: string;
  defaultValue?: any;
  onChange: (value: any) => void;
  showDetailsPopup?: boolean;
  partnerType?: PartnerType;
};

const PartnerSearchBar = ({
  style,
  placeholderKey,
  defaultValue,
  onChange,
  showDetailsPopup = true,
  partnerType,
}: PartnerSearchBarProps) => {
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

  const type = useMemo<PartnerType>(
    () => partnerType ?? 'client',
    [partnerType],
  );

  const {objectList, sliceFct} = useMemo(() => {
    switch (type) {
      case 'supplier':
        return {objectList: supplierList, sliceFct: filterSuppliers};
      case 'carrier':
        return {objectList: carrierList, sliceFct: filterCarriers};
      default:
        return {objectList: clientList, sliceFct: filterClients};
    }
  }, [carrierList, clientList, supplierList, type]);

  const fetchPartnersAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (sliceFct as any)({
          page,
          searchValue,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [dispatch, sliceFct, user.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      objectList={objectList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchPartnersAPI}
      displayValue={displayPartner}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingPartners}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      style={style}
    />
  );
};

export default PartnerSearchBar;
