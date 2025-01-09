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

import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {
  getCustomerbyId,
  searchCustomerContact,
} from '../../../features/customerSlice';
import {displayItemFullname} from '../../../utils/displayers';

const ContactPartnerSearchBar = ({
  placeholderKey = 'Helpdesk_ContactPartner',
  titleKey = 'Helpdesk_ContactPartner',
  defaultValue = null,
  onChange = () => {},
  showDetailsPopup = true,
  style,
  showTitle = true,
  client,
  navigate = false,
  oneFilter = false,
  isFocus = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    customer,
    loadingCustomerContact,
    moreLoadingCustomerContact,
    isListEndCustomerContact,
    customerContactList,
  } = useSelector(state => state.customer);

  useEffect(() => {
    if (client?.id != null) {
      dispatch(getCustomerbyId({customerId: client?.id}));
    }
  }, [dispatch, client?.id]);

  const searchContactAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchCustomerContact({page, searchValue}));
    },
    [dispatch],
  );

  if (client?.id != null) {
    return (
      <AutoCompleteSearch
        title={showTitle && I18n.t(titleKey)}
        objectList={customer?.contactPartnerSet}
        value={defaultValue}
        onChangeValue={onChange}
        placeholder={I18n.t(placeholderKey)}
        displayValue={displayItemFullname}
        showDetailsPopup={showDetailsPopup}
        style={style}
      />
    );
  }

  return (
    <AutoCompleteSearch
      title={I18n.t(titleKey)}
      objectList={customerContactList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={searchContactAPI}
      placeholder={I18n.t(placeholderKey)}
      displayValue={displayItemFullname}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingCustomerContact}
      moreLoading={moreLoadingCustomerContact}
      isListEnd={isListEndCustomerContact}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
      style={style}
    />
  );
};

export default ContactPartnerSearchBar;
