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
import {useThemeColor, ObjectCard} from '@axelor/aos-mobile-ui';
import {
  formatDuration,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {default as OperationOrderType} from '../../../types/operation-order';

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
  const {OperationOrder} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const borderStyle = useMemo(() => {
    return getStyles(
      getItemColor(OperationOrder?.statusSelect, status)?.background,
    )?.border;
  }, [OperationOrder?.statusSelect, getItemColor, status]);

  const [startDate, endDate] = OperationOrderType.getDates(
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
            iconName: 'calendar-event',
            indicatorText: startDate.title,
            displayText: startDate.value,
            hideIfNull: startDate == null,
          },
          {
            iconName: 'calendar-check',
            indicatorText: endDate.title,
            displayText: endDate.value,
            hideIf:
              status === OperationOrder?.statusSelect.InProgress ||
              status === OperationOrder?.statusSelect.StandBy ||
              endDate == null,
          },
          {
            iconName: 'stopwatch-fill',
            indicatorText: `${
              plannedDuration ? formatDuration(plannedDuration) : ''
            }`,
            hideIf:
              status !== OperationOrder?.statusSelect.InProgress &&
              status !== OperationOrder?.statusSelect.StandBy,
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
