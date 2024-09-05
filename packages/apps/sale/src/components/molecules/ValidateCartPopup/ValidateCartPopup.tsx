/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Alert, useThemeColor, LabelText} from '@axelor/aos-mobile-ui';
import {useTranslator, useNavigation} from '@axelor/aos-mobile-core';
import {CustomerSearchBar} from '../../organisms';

interface ValidateCartPopupProps {
  style?: any;
  onClose?: () => void;
  visible: boolean;
}

const ValidateCartPopup = ({
  style,
  visible,
  onClose,
}: ValidateCartPopupProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();

  const [customerSelected, setCustomerSelected] = useState(null);

  return (
    <Alert
      title={I18n.t('Sale_LinkQuotationToCustomer')}
      style={style}
      visible={visible}
      cancelButtonConfig={{
        title: null,
        onPress: onClose,
      }}
      confirmButtonConfig={{
        title: null,
        onPress: () => {},
        disabled: customerSelected == null,
      }}
      translator={I18n.t}>
      <View style={styles.container}>
        <CustomerSearchBar
          style={styles.searchBar}
          onChange={setCustomerSelected}
          defaultValue={customerSelected}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('ClientFormScreen')}
          style={styles.labelText}>
          <LabelText
            iconName="plus-lg"
            color={Colors.primaryColor.background}
            title={I18n.t('Sale_CreateNewCustomer')}
            size={16}
          />
        </TouchableOpacity>
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  labelText: {
    marginVertical: 5,
  },
  searchBar: {
    width: '100%',
  },
});

export default ValidateCartPopup;
