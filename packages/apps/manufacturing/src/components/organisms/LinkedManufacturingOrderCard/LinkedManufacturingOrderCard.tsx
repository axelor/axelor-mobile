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
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Badge, Card, LabelText, useThemeColor} from '@axelor/aos-mobile-ui';
import {clipboardProvider, useTranslator} from '@axelor/aos-mobile-core';
import ManufacturingOrder from '../../../types/manufacturing-order';

const LinkedManufacturingOrderCard = ({
  manufOrderSeq,
  statusSelect,
}: {
  manufOrderSeq: string;
  statusSelect: number;
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => clipboardProvider.copyToClipboard(manufOrderSeq)}>
      <Card style={styles.itemContainer}>
        <LabelText title={manufOrderSeq} iconName="tag" />
        <Badge
          title={ManufacturingOrder.getStatus(statusSelect, I18n)}
          color={ManufacturingOrder.getStatusColor(statusSelect, Colors)}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 12,
    marginVertical: 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default LinkedManufacturingOrderCard;
