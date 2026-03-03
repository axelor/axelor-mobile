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
import {ObjectCard, useDigitFormat} from '@axelor/aos-mobile-ui';
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';
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
  plannedStartDate?: string;
  plannedEndDate?: string;
  realStartDate?: string;
  realEndDate?: string;
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
  plannedStartDate,
  plannedEndDate,
  realStartDate,
  realEndDate,
  onPress,
}: ManufacturingOrderCardProps) => {
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();
  const {ManufOrder} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const borderStyle = useMemo(() => {
    return getStyles(getItemColor(ManufOrder?.statusSelect, status)?.background)
      ?.border;
  }, [ManufOrder?.statusSelect, getItemColor, status]);

  const isPriorityValid = useMemo(
    () =>
      priority != null &&
      ManufOrder?.prioritySelect.list.find(({value}) => value === priority) !=
        null,
    [ManufOrder?.prioritySelect, priority],
  );

  const [startDate, endDate] = ManufacturingOrder.getDates(
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
      sideBadges={{
        items: [
          isPriorityValid && {
            color: getItemColor(ManufOrder?.prioritySelect, priority),
            displayText: getItemTitle(ManufOrder?.prioritySelect, priority),
          },
        ],
      }}
      upperTexts={{
        items: [
          {
            isTitle: true,
            displayText: reference,
          },
          {
            displayText: productName,
          },
          {
            iconName: 'hammer',
            indicatorText: `${formatNumber(qty)} ${
              unit != null ? unit.name : ''
            }`,
          },
          {
            hideIf: link.client == null || link.ordersRef?.length <= 0,
            iconName: 'tag-fill',
            indicatorText: link.ordersRef[0]?.fullName,
          },
          {
            iconName: 'calendar-event',
            indicatorText: startDate.title,
            displayText: startDate.value,
            hideIf: startDate == null,
          },
          {
            iconName: 'calendar-check',
            indicatorText: endDate.title,
            displayText: endDate.value,
            hideIf:
              status === ManufOrder?.statusSelect.InProgress ||
              status === ManufOrder?.statusSelect.StandBy ||
              endDate == null,
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

export default ManufacturingOrderCard;
