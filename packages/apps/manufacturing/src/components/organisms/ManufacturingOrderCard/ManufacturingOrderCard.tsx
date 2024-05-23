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

import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Badge,
  Card,
  Icon,
  LabelText,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import ManufacturingOrder from '../../../types/manufacturing-order';

interface ManufacturingOrderCardProps {
  style?: any;
  reference: string;
  status: number;
  priority: number;
  productName: string;
  qty: number;
  unit?: any;
  link?: {ordersRef: any[]; client: any};
  onPress: () => void;
}

const ManufacturingOrderCard = ({
  style,
  reference,
  status,
  priority,
  productName,
  qty,
  unit,
  link = {ordersRef: [null], client: null},
  onPress,
}: ManufacturingOrderCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    return getStyles(
      ManufacturingOrder.getStatusColor(status, Colors).background,
    )?.border;
  }, [Colors, status]);

  const isPriorityValid = useMemo(
    () =>
      priority != null &&
      Object.values(ManufacturingOrder.priority).includes(priority),
    [priority],
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{reference}</Text>
          <Text style={styles.txtDetails}>{productName}</Text>
          <LabelText
            iconName="hammer"
            title={`${parseFloat(qty.toString()).toFixed(2)} ${
              unit != null ? unit.name : ''
            }`}
          />
          {link.client != null && link.ordersRef?.length > 0 && (
            <View style={styles.origin}>
              <Icon name="tag" size={12} style={styles.icon} />
              <Text style={styles.txtDetails}>
                {link.ordersRef[0].fullName}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.rightContainer}>
          {isPriorityValid ? (
            <Badge
              color={ManufacturingOrder.getPriorityColor(priority, Colors)}
              title={ManufacturingOrder.getPriority(priority, I18n)}
            />
          ) : null}
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor.background_light}
            size={20}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {borderLeftWidth: 7, borderLeftColor: color},
  });

const styles = StyleSheet.create({
  rightContainer: {
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 5,
  },
  txtImportant: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtDetails: {
    fontSize: 14,
  },
  origin: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
});

export default ManufacturingOrderCard;
