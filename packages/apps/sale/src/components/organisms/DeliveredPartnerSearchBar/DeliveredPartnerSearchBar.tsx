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

import React, {useCallback, useEffect, useState} from 'react';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {
  displayItemFullname,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchDeliveryPartnerLinks} from '../../../features/partnerLinkSlice';

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
  showTitle = false,
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
  const {deliveryPartnerLinkList, loadingLinks} = useSelector(
    state => state.sale_partnerLink,
  );

  const [options, setOptions] = useState<any[]>([]);
  const [currentValue, setCurrentValue] = useState<any>(defaultValue);

  const enabled = baseConfig?.activatePartnerRelations;
  const customerId = customer?.id;

  useEffect(() => {
    if (enabled && customerId != null) {
      dispatch((searchDeliveryPartnerLinks as any)({partnerId: customerId}));
    } else {
      setOptions([]);
      setCurrentValue(null);
      onChange(null);
    }
  }, [customerId, dispatch, enabled, onChange]);

  useEffect(() => {
    if (!enabled || customerId == null) return;

    const partner2List = (deliveryPartnerLinkList || [])
      .map((l: any) => l?.partner2)
      .filter((p: any) => p != null);

    const partner2Unique: any[] = Array.from(
      new Map(
        partner2List.map((p: any) => [
          ((p as any)?.id ?? JSON.stringify(p)) as any,
          p,
        ]),
      ).values(),
    );

    const includeCustomer =
      customer != null &&
      !partner2Unique.some(
        (_p: any) => _p?.id != null && _p.id === customer?.id,
      );

    const allOptions = includeCustomer
      ? [customer, ...partner2Unique]
      : partner2Unique;

    setOptions(allOptions);

    if (allOptions.length === 1) {
      setCurrentValue(allOptions[0]);
      onChange(allOptions[0]);
    } else if (allOptions.length === 0) {
      setCurrentValue(null);
      onChange(null);
    } else {
      setCurrentValue(null);
      onChange(null);
    }
  }, [customer, customerId, deliveryPartnerLinkList, enabled, onChange]);

  const searchDeliveredPartnerAPI = useCallback(
    ({page = 0, searchValue}) => {
      if (enabled && customerId != null) {
        dispatch(
          (searchDeliveryPartnerLinks as any)({
            partnerId: customerId,
            searchValue,
            page,
          }),
        );
      }
    },
    [customerId, dispatch, enabled],
  );

  if (!enabled) return null;

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      objectList={options}
      value={currentValue}
      required={required}
      readonly={readonly}
      onChangeValue={item => {
        setCurrentValue(item);
        onChange(item);
      }}
      fetchData={searchDeliveredPartnerAPI}
      displayValue={displayItemFullname}
      placeholder={I18n.t(title)}
      loadingList={loadingLinks}
      showDetailsPopup={true}
      navigate={false}
      oneFilter={false}
      isScrollViewContainer={isScrollViewContainer}
      translator={I18n.t}
    />
  );
};

export default DeliveredPartnerSearchBar;
