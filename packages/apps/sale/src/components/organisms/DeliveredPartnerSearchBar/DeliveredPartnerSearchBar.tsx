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
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {
  displayItemFullname,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchDeliveryPartnerLinks} from '../../../features/partnerLinkSlice';
import {useDeliveredPartners} from './hooks';

interface DeliveredPartnerSearchBarProps {
  style?: any;
  title?: string;
  showTitle?: boolean;
  customer: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  readonly?: boolean;
  required?: boolean;
  isScrollViewContainer?: boolean;
}

const DeliveredPartnerSearchBar = ({
  style,
  title = 'Sale_DeliveredPartner',
  showTitle = true,
  customer,
  defaultValue,
  onChange,
  readonly = false,
  required = false,
  isScrollViewContainer = false,
}: DeliveredPartnerSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {
    loadingLinks,
    moreLoadingLinks,
    isLinksListEnd,
    deliveryPartnerLinkList,
  } = useDeliveredPartners();

  const relationsEnabled = useMemo(
    () => baseConfig?.activatePartnerRelations,
    [baseConfig?.activatePartnerRelations],
  );

  const options = useMemo(() => {
    const partnerList = deliveryPartnerLinkList
      ?.map(l => l?.partner2)
      .filter(
        (p, idx, self) =>
          p?.id != null &&
          p.id !== customer?.id &&
          self.findIndex(({id}) => id === p.id) === idx,
      );

    return [customer, ...partnerList];
  }, [customer, deliveryPartnerLinkList]);

  useEffect(() => {
    if (options.length === 1) {
      onChange(options[0]);
    } else {
      onChange(options.length === 2 ? options[1] : null);
    }
  }, [onChange, options]);

  const searchDeliveredPartnerAPI = useCallback(
    ({page = 0, searchValue}) => {
      if (relationsEnabled && customer?.id != null) {
        dispatch(
          (searchDeliveryPartnerLinks as any)({
            partnerId: customer.id,
            searchValue,
            page,
          }),
        );
      }
    },
    [customer?.id, dispatch, relationsEnabled],
  );

  if (!relationsEnabled) return null;

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      loadingList={loadingLinks}
      moreLoading={moreLoadingLinks}
      isListEnd={isLinksListEnd}
      objectList={options}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchDeliveredPartnerAPI}
      displayValue={displayItemFullname}
      placeholder={I18n.t(title)}
      showDetailsPopup={true}
      navigate={false}
      oneFilter={false}
      isScrollViewContainer={isScrollViewContainer}
      translator={I18n.t}
    />
  );
};

export default DeliveredPartnerSearchBar;
