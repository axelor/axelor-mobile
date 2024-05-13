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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Badge, LabelText, Text} from '@axelor/aos-mobile-ui';
import {useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';

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
  const {ManufOrder} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  return (
    <View style={styles.infoContainer}>
      <View style={styles.refContainer}>
        {reference != null && (
          <Text style={styles.text_important}>{reference}</Text>
        )}
        {parentMO != null && (
          <LabelText iconName="diagram-3-fill" title={parentMO.manufOrderSeq} />
        )}
      </View>
      <View style={styles.badgeContainer}>
        {status == null ? (
          <View style={styles.refContainer} />
        ) : (
          <Badge
            color={getItemColor(ManufOrder?.statusSelect, status)}
            title={getItemTitle(ManufOrder?.statusSelect, status)}
          />
        )}
        {priority == null ? (
          <View style={styles.refContainer} />
        ) : (
          <Badge
            color={getItemColor(ManufOrder?.prioritySelect, priority)}
            title={getItemTitle(ManufOrder?.prioritySelect, priority)}
          />
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
