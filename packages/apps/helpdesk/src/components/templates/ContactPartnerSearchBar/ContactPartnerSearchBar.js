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

import React, {useCallback, useMemo} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  AutoCompleteSearch,
  FormInput,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {searchCustomerContact} from '../../../features/customerSlice';
import {displayItemFullname} from '../../../utils/displayers';

const ContactPartnerSearchBar = ({
  title = 'Helpdesk_ContactPartner',
  defaultValue = null,
  onChange = () => {},
  style = null,
  required = false,
  readonly = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const Colors = useThemeColor();

  const {
    formCustomer,
    loadingCustomerContact,
    moreLoadingCustomerContact,
    isListEndCustomerContact,
    customerContactList,
  } = useSelector(state => state.customer);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const searchContactAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchCustomerContact({page, searchValue}));
    },
    [dispatch],
  );

  const ObjectToDisplay = useMemo(() => {
    if (formCustomer?.id) {
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

  if (readonly) {
    return (
      <FormInput
        style={style}
        title={I18n.t(title)}
        readOnly={true}
        defaultValue={displayItemFullname(defaultValue)}
      />
    );
  }

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null]}>
      <Text style={styles.title}>{I18n.t(title)}</Text>
      <AutoCompleteSearch
        style={[
          defaultValue == null && required ? styles.requiredBorder : null,
        ]}
        objectList={ObjectToDisplay.list}
        value={defaultValue}
        onChangeValue={onChange}
        fetchData={ObjectToDisplay.fetchData}
        placeholder={I18n.t(title)}
        displayValue={displayItemFullname}
        showDetailsPopup={true}
        loadingList={ObjectToDisplay.loading}
        moreLoading={ObjectToDisplay.moreLoading}
        isListEnd={ObjectToDisplay.isListEnd}
        navigate={false}
        oneFilter={false}
        isFocus={false}
      />
    </View>
  );
};
const getStyles = Colors =>
  StyleSheet.create({
    container: {
      zIndex: 41,
    },
    title: {
      marginHorizontal: '8%',
    },
    requiredBorder: {
      borderColor: Colors.errorColor.background,
    },
  });

export default ContactPartnerSearchBar;
