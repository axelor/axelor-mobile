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
import {ManufacturingOrder} from '../../../types';

interface ManufacturingOrderCardProps {
  style?: any;
  manufOrderSeq: string;
  statusSelect: number;
  prioritySelect: number;
  product: any;
  qty: number;
  unit?: any;
  saleOrderSet?: any[];
  clientPartner?: any;
  plannedStartDateT?: string;
  plannedEndDateT?: string;
  realStartDateT?: string;
  realEndDateT?: string;
  onPress: () => void;
}

const ManufacturingOrderCard = ({
  style,
  manufOrderSeq,
  statusSelect,
  prioritySelect,
  product,
  qty,
  unit,
  saleOrderSet,
  clientPartner,
  plannedStartDateT,
  plannedEndDateT,
  realStartDateT,
  realEndDateT,
  onPress,
}: ManufacturingOrderCardProps) => {
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();
  const {ManufOrder} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const isPriorityValid = useMemo(
    () =>
      prioritySelect != null &&
      ManufOrder?.prioritySelect.list.find(
        ({value}) => value === prioritySelect,
      ) != null,
    [ManufOrder?.prioritySelect, prioritySelect],
  );

  const [startDate, endDate] = ManufacturingOrder.getDates(
    statusSelect,
    plannedStartDateT,
    plannedEndDateT,
    realStartDateT,
    realEndDateT,
    I18n,
  );

  return (
    <ObjectCard
      style={style}
      onPress={onPress}
      showArrow={false}
      leftContainerFlex={2}
      borderLeftColor={
        getItemColor(ManufOrder?.statusSelect, statusSelect)?.background
      }
      sideBadges={
        !isPriorityValid
          ? undefined
          : {
              style: styles.badgeContainer,
              items: [
                {
                  color: getItemColor(
                    ManufOrder?.prioritySelect,
                    prioritySelect,
                  ),
                  displayText: getItemTitle(
                    ManufOrder?.prioritySelect,
                    prioritySelect,
                  ),
                },
              ],
            }
      }
      upperTexts={{
        items: [
          {
            isTitle: true,
            displayText: manufOrderSeq,
          },
          {
            displayText: product?.fullName,
          },
          {
            iconName: 'hammer',
            indicatorText: `${formatNumber(qty)} ${unit?.name ?? ''}`,
          },
          {
            hideIf: clientPartner == null || (saleOrderSet?.length ?? 0) === 0,
            iconName: 'tag-fill',
            indicatorText: saleOrderSet?.[0]?.fullName,
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
              statusSelect === ManufOrder?.statusSelect.InProgress ||
              statusSelect === ManufOrder?.statusSelect.StandBy ||
              endDate == null,
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: 'flex-end',
  },
});

export default ManufacturingOrderCard;
