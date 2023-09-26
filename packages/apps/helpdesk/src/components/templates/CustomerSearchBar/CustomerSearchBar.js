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
import {searchCustomer} from '../../../features/customerSlice';
import {displayItemFullname} from '../../../utils/displayers';

const CustomerSearchBar = ({
  style = null,
  title = 'Helpdesk_CustomPartner',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {customerList, loading, moreLoading, isListEnd} = useSelector(
    state => state.customer,
  );

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const searchCustomerAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchCustomer({page, searchValue}));
    },
    [dispatch],
  );

  if (readonly) {
    return (
      <FormInput
        style={style}
        title={I18n.t(title)}
        readOnly={true}
        defaultValue={defaultValue?.name}
      />
    );
  }

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null]}>
      <Text style={[styles.title]}>{I18n.t(title)}</Text>
      <AutoCompleteSearch
        style={[
          defaultValue == null && required ? styles.requiredBorder : null,
        ]}
        objectList={customerList}
        value={defaultValue}
        onChangeValue={onChange}
        fetchData={searchCustomerAPI}
        displayValue={displayItemFullname}
        placeholder={I18n.t(title)}
        showDetailsPopup={true}
        loadingList={loading}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
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
      marginHorizontal: 24,
    },
    requiredBorder: {
      borderColor: Colors.errorColor.background,
    },
  });

export default CustomerSearchBar;
