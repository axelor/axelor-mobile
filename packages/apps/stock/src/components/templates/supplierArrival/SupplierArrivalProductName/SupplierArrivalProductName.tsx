/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {StyleSheet, View} from 'react-native';
import {Text, Card} from '@axelor/aos-mobile-ui';

const SupplierArrivalProductName = ({product}) => {
  return (
    <View style={styles.stockView}>
      <Card style={styles.cardProductInfo}>
        <Text>{product?.name}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardProductInfo: {
    marginVertical: '2%',
    marginHorizontal: 16,
  },
  stockView: {
    marginTop: '2%',
  },
});

export default SupplierArrivalProductName;
