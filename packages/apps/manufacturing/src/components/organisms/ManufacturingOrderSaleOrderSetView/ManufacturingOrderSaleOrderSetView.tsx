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
import {
  useThemeColor,
  ViewAllContainer,
  Text,
  Badge,
} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {View, StyleSheet} from 'react-native';

interface Props {
  onPressSaleOrder: () => void;
}

const ManufacturingOrderSaleOrderSetView = ({onPressSaleOrder}: Props) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {manufOrder} = useSelector((state: any) => state.manufacturingOrder);

  if (
    !Array.isArray(manufOrder.saleOrderSet) ||
    manufOrder.saleOrderSet.length === 0
  ) {
    return null;
  }

  return (
    <ViewAllContainer
      onViewPress={onPressSaleOrder}
      disabled={manufOrder.saleOrderSet.length < 3}
      translator={I18n.t}>
      <View style={styles.orderTitle}>
        <Text>{I18n.t('Manufacturing_RefClient')}</Text>
      </View>
      <View style={styles.orderSetContainer}>
        {manufOrder.saleOrderSet.slice(0, 3).map(item => (
          <Badge
            style={styles.orderBadge}
            title={item.fullName}
            key={item.id}
            color={Colors.priorityColor}
            numberOfLines={null}
          />
        ))}
      </View>
    </ViewAllContainer>
  );
};
const styles = StyleSheet.create({
  orderBadge: {
    paddingHorizontal: 10,
    width: null,
  },
  orderTitle: {
    marginHorizontal: 8,
  },
  orderSetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
});

export default ManufacturingOrderSaleOrderSetView;
