/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it et/ou  modifier
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY ou FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Label, Text, usePriceFormat} from '@axelor/aos-mobile-ui';

const DropdownMultipleQuantities = ({}) => {
  const I18n = useTranslator();
  const priceFormat = usePriceFormat();

  const {product} = useSelector((state: any) => state.sales_product);

  return (
    <View>
      {!product.allowToForceSaleQty && (
        <Label
          type="error"
          message={I18n.t('Sales_QuantitiesAreRestricted')}
          iconName="lock-fill"
        />
      )}
      {product.saleProductMultipleQtyList?.map((prod, index) => {
        return (
          <View key={index} style={styles.container}>
            <Text>{prod.name} </Text>
            <Text writingType="important">{priceFormat(prod.multipleQty)}</Text>
          </View>
        );
      })}
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
