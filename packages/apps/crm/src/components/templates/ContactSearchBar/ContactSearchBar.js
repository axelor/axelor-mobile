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
import {AutoCompleteSearch, useThemeColor, Text} from '@axelor/aos-mobile-ui';
import {fetchContact} from '../../../features/contactSlice';
import {displayItemFullname} from '../../../utils/displayers';

const ContactSearchBar = ({
  placeholderKey = 'Crm_Contacts',
  defaultValue = null,
  onChange = () => {},
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  showTitle = true,
  style,
  styleTxt,
  titleKey = 'Crm_Contact',
  required,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const Colors = useThemeColor();

  const {contactList, loadingContact, moreLoading, isListEnd} = useSelector(
    state => state.contact,
  );

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const fetchContactSearchBarAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(fetchContact({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <View
      style={[
        styles.searchBar,
        Platform.OS === 'ios' ? styles.container : null,
        style,
      ]}>
      {showTitle && (
        <Text style={[styles.title, styleTxt]}>{I18n.t(titleKey)}</Text>
      )}
      <AutoCompleteSearch
        style={[
          defaultValue == null && required ? styles.requiredBorder : null,
        ]}
        objectList={contactList}
        value={defaultValue}
        onChangeValue={onChange}
        fetchData={fetchContactSearchBarAPI}
        displayValue={displayItemFullname}
        placeholder={I18n.t(placeholderKey)}
        showDetailsPopup={showDetailsPopup}
        loadingList={loadingContact}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        navigate={navigate}
        oneFilter={oneFilter}
        isFocus={isFocus}
      />
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    searchBar: {
      width: '100%',
      marginLeft: 5,
    },
    requiredBorder: {
      borderColor: Colors.errorColor.background,
    },
    container: {
      zIndex: 41,
    },
    title: {
      marginHorizontal: 24,
    },
  });

export default ContactSearchBar;
