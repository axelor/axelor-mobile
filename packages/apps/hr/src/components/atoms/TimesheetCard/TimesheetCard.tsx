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
import {StyleSheet} from 'react-native';
import {ObjectCard, TextUnit} from '@axelor/aos-mobile-ui';
import {
  PeriodDisplay,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {getDurationUnit} from '../../../utils';

interface TimesheetCardProps {
  statusSelect: number;
  startDate: string;
  endDate: string;
  company: string;
  totalDuration: number;
  durationUnit: string;
  employeeName?: string;
  style?: any;
  onPress: () => void;
}

const TimesheetCard = ({
  statusSelect,
  startDate,
  endDate,
  company,
  totalDuration,
  durationUnit,
  employeeName,
  style,
  onPress,
}: TimesheetCardProps) => {
  const I18n = useTranslator();
  const {Timesheet} = useTypes();
  const {getItemColor} = useTypeHelpers();

  return (
    <ObjectCard
      borderLeftColor={
        getItemColor(Timesheet?.statusSelect, statusSelect)?.background
      }
      style={[styles.container, style]}
      leftContainerFlex={2}
      onPress={onPress}
      showArrow={false}
      upperTexts={{
        items: [
          {
            customComponent: (
              <PeriodDisplay startDate={startDate} endDate={endDate} />
            ),
          },
          {
            iconName: 'building-fill',
            displayText: company,
            numberOfLines: 2,
          },

          {
            iconName: 'person-fill',
            displayText: employeeName,
            hideIfNull: true,
          },
        ],
      }}
      sideBadges={{
        style: styles.badgeContainer,
        items: [
          {
            customComponent: (
              <TextUnit
                value={totalDuration}
                unit={getDurationUnit(durationUnit, I18n)}
              />
            ),
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 1,
    marginVertical: 1,
  },
  badgeContainer: {
    alignItems: 'flex-end',
  },
});

export default TimesheetCard;
