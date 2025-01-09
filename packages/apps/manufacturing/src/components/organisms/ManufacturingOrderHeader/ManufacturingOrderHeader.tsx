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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Badge, LabelText, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import ManufacturingOrder from '../../../types/manufacturing-order';

interface ManufacturingOrderHeaderProps {
  reference: string;
  status: number;
  priority: number;
  parentMO?: any;
}

const ManufacturingOrderHeader = ({
  reference,
  status,
  priority,
  parentMO = null,
}: ManufacturingOrderHeaderProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const isPriorityValid = useMemo(
    () =>
      priority != null &&
      Object.values(ManufacturingOrder.priority).includes(priority),
    [priority],
  );

  return (
    <View style={styles.infoContainer}>
      <View style={styles.refContainer}>
        {reference != null && (
          <Text style={styles.text_important}>{reference}</Text>
        )}
        {parentMO != null && (
          <LabelText iconName="sitemap" title={parentMO.manufOrderSeq} />
        )}
      </View>
      <View style={styles.badgeContainer}>
        {status == null ? (
          <View style={styles.refContainer} />
        ) : (
          <Badge
            color={ManufacturingOrder.getStatusColor(status, Colors)}
            title={ManufacturingOrder.getStatus(status, I18n)}
          />
        )}
        {isPriorityValid ? (
          <Badge
            color={ManufacturingOrder.getPriorityColor(priority, Colors)}
            title={ManufacturingOrder.getPriority(priority, I18n)}
          />
        ) : (
          <View style={styles.refContainer} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '2%',
  },
  refContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
  },
  badgeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    marginHorizontal: 32,
    flexDirection: 'row-reverse',
  },
  text_important: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text_secondary: {
    fontSize: 14,
  },
});

export default ManufacturingOrderHeader;
