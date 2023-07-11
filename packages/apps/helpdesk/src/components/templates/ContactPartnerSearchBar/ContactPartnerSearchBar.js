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

import React, {useEffect} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch, Text} from '@axelor/aos-mobile-ui';
import {getCustomerbyId} from '../../../features/customerSlice';
import {displayItemFullname} from '../../../utils/displayers';

const ContactPartnerSearchBar = ({
  placeholderKey = 'Helpdesk_ContactPartner',
  titleKey = 'Helpdesk_ContactPartner',
  defaultValue = null,
  onChange = () => {},
  showDetailsPopup = true,
  style,
  styleTxt,
  showTitle = true,
  client,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {customer} = useSelector(state => state.customer);

  useEffect(() => {
    if (client?.id != null) {
      dispatch(getCustomerbyId({customerId: client?.id}));
    }
  }, [dispatch, client?.id]);

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null, style]}>
      {showTitle && (
        <Text style={[styles.title, styleTxt]}>{I18n.t(titleKey)}</Text>
      )}
      <AutoCompleteSearch
        style={styles.search}
        objectList={customer?.contactPartnerSet}
        value={defaultValue}
        onChangeValue={onChange}
        placeholder={placeholderKey}
        displayValue={displayItemFullname}
        showDetailsPopup={showDetailsPopup}
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
