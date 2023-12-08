/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {StyleSheet, View} from 'react-native';
import {ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import DatesInterval from '../DatesInterval/DatesInterval';
import TextUnit from '../TextUnit/TextUnit';
import {Timesheet} from '../../../types';

interface TimesheetCardProps {
  statusSelect: number;
  startDate: string;
  endDate: string;
  company: string;
  totalDuration: number;
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
  employeeName,
  style,
  onPress,
}: TimesheetCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const styles = useMemo(
    () => getStyles(Timesheet.getStatusColor(statusSelect, Colors)),
    [Colors, statusSelect],
  );

  return (
    <View style={style}>
      <ObjectCard
        style={[styles.container, styles.borderColor]}
        leftContainerFlex={2}
        onPress={onPress}
        upperTexts={{
          items: [
            {
              customComponent: (
                <DatesInterval
                  startDate={startDate}
                  endDate={endDate}
                  style={styles.datesInterval}
                />
              ),
            },
            {
              iconName: 'building',
              displayText: company,
              numberOfLines: 2,
              style: styles.iconText,
            },

            {
              iconName: 'user',
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
                  style={styles.textUnit}
                  value={totalDuration}
                  unit={I18n.t('Hr_TimeUnit_Hours')}
                />
              ),
            },
          ],
        }}
      />
    </View>
  );
};

const getStyles = color =>
  StyleSheet.create({
    container: {
      marginHorizontal: 1,
      marginVertical: 1,
    },
    borderColor: {
      borderLeftWidth: 7,
      borderLeftColor: color.background,
    },
    datesInterval: {
      marginBottom: 15,
    },
    iconText: {
      fontSize: 15,
      fontWeight: null,
    },
    textUnit: {alignSelf: 'flex-end', lineHeight: 25},
  });

export default TimesheetCard;
