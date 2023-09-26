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
import {Platform, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch, Text} from '@axelor/aos-mobile-ui';
import {searchCustomerContact} from '../../../features/customerSlice';
import {displayItemFullname} from '../../../utils/displayers';

const ContactPartnerSearchBar = ({
  title = 'Helpdesk_ContactPartner',
  defaultValue = null,
  onChange = () => {},
  style = null,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    formCustomer,
    loadingCustomerContact,
    moreLoadingCustomerContact,
    isListEndCustomerContact,
    customerContactList,
  } = useSelector(state => state.customer);

  const searchContactAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchCustomerContact({page, searchValue}));
    },
    [dispatch],
  );

  if (formCustomer?.id != null) {
    return (
      <View style={[Platform.OS === 'ios' ? styles.container : null]}>
        <Text style={styles.title}>{I18n.t(title)}</Text>
        <AutoCompleteSearch
          objectList={formCustomer?.contactPartnerSet}
          value={defaultValue}
          onChangeValue={onChange}
          placeholder={I18n.t(title)}
          displayValue={displayItemFullname}
          showDetailsPopup={true}
        />
      </View>
    );
  }

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null]}>
      <Text style={styles.title}>{I18n.t(title)}</Text>
      <AutoCompleteSearch
        objectList={customerContactList}
        value={defaultValue}
        onChangeValue={onChange}
        fetchData={searchContactAPI}
        placeholder={I18n.t(title)}
        displayValue={displayItemFullname}
        showDetailsPopup={true}
        loadingList={loadingCustomerContact}
        moreLoading={moreLoadingCustomerContact}
        isListEnd={isListEndCustomerContact}
        navigate={false}
        oneFilter={false}
        isFocus={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 41,
  },
  title: {
    marginHorizontal: 24,
  },
});

export default ContactPartnerSearchBar;
