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
import {StyleSheet, View} from 'react-native';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Label, Text, useDigitFormat} from '@axelor/aos-mobile-ui';

const DropdownMultipleQuantities = ({}) => {
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();

  const {product} = useSelector((state: any) => state.sale_product);

  const quantities = useMemo(
    () =>
      Array.isArray(product.saleProductMultipleQtyList)
        ? product.saleProductMultipleQtyList
        : [],
    [product.saleProductMultipleQtyList],
  );

  const renderQuantityItem = useCallback(
    (line, idx) => {
      return (
        <View key={idx} style={styles.container}>
          <Text>{line.name} </Text>
          <Text writingType="important">{formatNumber(line.multipleQty)}</Text>
        </View>
      );
    },
    [formatNumber],
  );

  return (
    <View>
      <Label
        type="error"
        message={I18n.t('Sale_QuantitiesAreRestricted')}
        iconName="lock-fill"
        visible={!product.allowToForceSaleQty}
      />
      {quantities?.map(renderQuantityItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DropdownMultipleQuantities;
