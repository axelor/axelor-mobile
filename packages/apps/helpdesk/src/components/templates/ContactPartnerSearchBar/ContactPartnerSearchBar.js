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
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchCustomerContact} from '../../../features/customerSlice';
import {displayItemFullname} from '../../../utils/displayers';

const ContactPartnerSearchBar = ({
  style = null,
  title = 'Helpdesk_ContactPartner',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
  showDetailsPopup = true,
  showTitle = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    formCustomer,
    loadingCustomerContact,
    moreLoadingCustomerContact,
    isListEndCustomerContact,
    customerContactList,
  } = useSelector(state => state.helpdesk_customer);
  const {user} = useSelector(state => state.user);

  const searchContactAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        searchCustomerContact({
          page,
          searchValue,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [dispatch, user.activeCompany?.id],
  );

  const ObjectToDisplay = useMemo(() => {
    if (formCustomer?.id != null) {
      return {
        loading: false,
        moreLoading: false,
        isListEnd: true,
        list: formCustomer?.contactPartnerSet,
        fetchData: () => {},
      };
    } else {
      return {
        loading: loadingCustomerContact,
        moreLoading: moreLoadingCustomerContact,
        isListEnd: isListEndCustomerContact,
        list: customerContactList,
        fetchData: searchContactAPI,
      };
    }
  }, [
    customerContactList,
    formCustomer,
    isListEndCustomerContact,
    loadingCustomerContact,
    moreLoadingCustomerContact,
    searchContactAPI,
  ]);

  return (
    <AutoCompleteSearch
      title={showTitle && I18n.t(title)}
      objectList={ObjectToDisplay.list}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={ObjectToDisplay.fetchData}
      placeholder={I18n.t(title)}
      displayValue={displayItemFullname}
      showDetailsPopup={showDetailsPopup}
      loadingList={ObjectToDisplay.loading}
      moreLoading={ObjectToDisplay.moreLoading}
      isListEnd={ObjectToDisplay.isListEnd}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
      style={style}
      readonly={readonly}
      required={required}
    />
  );
};

export default ContactPartnerSearchBar;
