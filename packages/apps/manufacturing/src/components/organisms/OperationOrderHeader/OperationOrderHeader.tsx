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
import {StyleSheet, View} from 'react-native';
import {
  Text,
  Badge,
  useThemeColor,
  checkNullString,
} from '@axelor/aos-mobile-ui';
import {useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';

interface OperationOrderHeaderProps {
  manufOrderRef: string;
  name: string;
  status: number;
  priority: number;
}

function OperationOrderHeader({
  manufOrderRef,
  name,
  status,
  priority,
}: OperationOrderHeaderProps) {
  const Colors = useThemeColor();
  const {OperationOrder} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  return (
    <View style={styles.infoContainer}>
      <View style={styles.refContainer}>
        {!checkNullString(manufOrderRef) && (
          <Text style={styles.textImportant}>{manufOrderRef}</Text>
        )}
        {!checkNullString(name) && (
          <Text style={styles.textSecondary}>{name}</Text>
        )}
      </View>
      <View style={styles.badgeContainer}>
        {status != null && (
          <Badge
            color={getItemColor(OperationOrder?.statusSelect, status)}
            title={getItemTitle(OperationOrder?.statusSelect, status)}
          />
        )}
        {priority != null && (
          <Badge
            color={Colors.priorityColor}
            title={priority.toString()}
            style={styles.badge}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 50,
    width: 35,
    height: 35,
    marginRight: 10,
  },
  badgeContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '2%',
    marginHorizontal: 20,
    flexDirection: 'row-reverse',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '2%',
  },
  refContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 24,
  },
  textImportant: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textSecondary: {
    fontSize: 14,
  },
});

export default OperationOrderHeader;
