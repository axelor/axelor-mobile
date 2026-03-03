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

import React from 'react';
import {Text, Icon} from '@axelor/aos-mobile-ui';
import {View, StyleSheet} from 'react-native';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';

const SupplierProductInfo = ({}) => {
  const I18n = useTranslator();

  const {supplierProductInfo} = useSelector(state => state.supplierCatalog);

  if (
    supplierProductInfo == null ||
    Object.keys(supplierProductInfo).length === 0
  ) {
    return null;
  }

  return (
    <View style={styles.supplierInfoContainer}>
      <Icon name="info-circle-fill" size={20} />
      <View style={styles.supplierInfo}>
        <Text style={styles.text_important}>
          {I18n.t('Stock_SupplierCatalog')}
        </Text>
        <Text>{`${I18n.t('Stock_Name')} : ${
          supplierProductInfo?.productSupplierName
        }`}</Text>
        <Text>{`${I18n.t('Stock_Code')} : ${
          supplierProductInfo?.productSupplierCode
        }`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  supplierInfoContainer: {
    width: '90%',
    flexDirection: 'row',
    marginVertical: 10,
  },
  supplierInfo: {
    marginLeft: '3%',
    flexDirection: 'column',
  },
  text_important: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SupplierProductInfo;
