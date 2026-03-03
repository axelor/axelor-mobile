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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  formatDuration,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';

interface OperationOrderCardProps {
  style?: any;
  status: number;
  operationName: string;
  workcenter: string;
  plannedDuration?: string;
  priority: number;
  onPress: (any?: any) => void;
}

const OperationOrderCard = ({
  style,
  status,
  operationName,
  workcenter,
  plannedDuration,
  priority,
  onPress,
}: OperationOrderCardProps) => {
  const Colors = useThemeColor();
  const {OperationOrder} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const borderStyle = useMemo(() => {
    return getStyles(
      getItemColor(OperationOrder?.statusSelect, status)?.background,
    )?.border;
  }, [OperationOrder?.statusSelect, getItemColor, status]);

  return (
    <ObjectCard
      onPress={onPress}
      style={[borderStyle, style]}
      sideBadges={{
        items: [
          {
            displayText: priority.toString(),
            color: Colors.priorityColor,
            style: styles.badge,
          },
        ],
      }}
      upperTexts={{
        items: [
          {isTitle: true, displayText: operationName},
          {displayText: workcenter},
          {
            hideIf: plannedDuration == null,
            indicatorText: formatDuration(plannedDuration),
            iconName: 'stopwatch-fill',
          },
        ],
      }}
    />
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {borderLeftWidth: 7, borderLeftColor: color},
  });

const styles = StyleSheet.create({
  badge: {
    borderRadius: 50,
    width: 35,
    height: 35,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
});

export default OperationOrderCard;
