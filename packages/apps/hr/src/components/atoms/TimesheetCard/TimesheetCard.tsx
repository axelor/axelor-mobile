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

  const styles = useMemo(
    () =>
      getStyles(
        getItemColor(Timesheet?.statusSelect, statusSelect)?.background,
      ),
    [Timesheet?.statusSelect, getItemColor, statusSelect],
  );

  return (
    <ObjectCard
      style={[styles.container, styles.borderColor, style]}
      leftContainerFlex={2}
      onPress={onPress}
      upperTexts={{
        items: [
          {
            customComponent: (
              <PeriodDisplay
                startDate={startDate}
                endDate={endDate}
                style={styles.datesInterval}
              />
            ),
          },
          {
            iconName: 'building-fill',
            displayText: company,
            numberOfLines: 2,
            style: styles.iconText,
          },

          {
            iconName: 'person-fill',
            displayText: employeeName,
            style: styles.iconText,
            hideIfNull: true,
          },
        ],
      }}
      sideBadges={{
        items: [
          {
            customComponent: (
              <TextUnit
                value={totalDuration}
                unit={getDurationUnit(durationUnit, I18n)}
                style={styles.textUnit}
              />
            ),
          },
        ],
      }}
    />
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 1,
      marginVertical: 1,
    },
    borderColor: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
    datesInterval: {
      marginBottom: 15,
    },
    iconText: {
      fontSize: 15,
      fontWeight: null,
    },
    textUnit: {
      alignSelf: 'flex-end',
      lineHeight: 25,
    },
  });

export default TimesheetCard;
