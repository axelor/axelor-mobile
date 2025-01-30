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
import {StyleSheet} from 'react-native';
import {useThemeColor, ObjectCard} from '@axelor/aos-mobile-ui';
import {formatDuration, useTranslator} from '@axelor/aos-mobile-core';
import OperationOrder from '../../../types/operation-order';

interface OperationOrderCardProps {
  style?: any;
  status: number;
  manufOrder: string;
  operationName: string;
  workcenter?: string;
  machine?: string;
  plannedStartDate?: string;
  plannedEndDate?: string;
  realStartDate?: string;
  realEndDate?: string;
  plannedDuration?: string;
  priority: number;
  onPress: (any?: any) => void;
}

const OperationOrderDetailsCard = ({
  style,
  status,
  manufOrder,
  operationName,
  workcenter,
  machine,
  plannedStartDate,
  plannedEndDate,
  realStartDate,
  realEndDate,
  plannedDuration,
  priority,
  onPress,
}: OperationOrderCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    return getStyles(OperationOrder.getStatusColor(status, Colors).background)
      ?.border;
  }, [Colors, status]);

  const [startDate, endDate] = OperationOrder.getDates(
    status,
    plannedStartDate,
    plannedEndDate,
    realStartDate,
    realEndDate,
    I18n,
  );

  return (
    <ObjectCard
      onPress={onPress}
      style={[borderStyle, style]}
      upperTexts={{
        items: [
          {isTitle: true, displayText: manufOrder},
          {displayText: operationName, numberOfLines: 2},
          {
            iconName: 'pallet',
            indicatorText: workcenter + ' ' + (machine ? `- ${machine}` : ''),
          },
          {
            iconName: 'calendar',
            indicatorText: startDate.title,
            displayText: startDate.value,
            hideIfNull: startDate == null,
          },
          {
            iconName: 'calendar-check',
            indicatorText: endDate.title,
            displayText: endDate.value,
            hideIf:
              status === OperationOrder.status.InProgress ||
              status === OperationOrder.status.StandBy ||
              endDate == null,
          },
          {
            iconName: 'stopwatch',
            indicatorText: `${
              plannedDuration ? formatDuration(plannedDuration) : ''
            }`,
            hideIf:
              status !== OperationOrder.status.InProgress &&
              status !== OperationOrder.status.StandBy,
          },
        ],
      }}
      sideBadges={{
        items: [
          {
            color: Colors.priorityColor,
            displayText: priority.toString(),
            style: styles.badge,
          },
        ],
      }}
    />
  );
};

const getStyles = (color: string) =>
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

export default OperationOrderDetailsCard;
