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
import {formatDate, useTranslator} from '@axelor/aos-mobile-core';

interface TimesheetCardProps {
  isCompleted: boolean;
  startDate: string;
  endDate: string;
  company: string;
  totalDuration: string;
  style?: any;
  onPress: () => void;
}

const TimesheetCard = ({
  isCompleted,
  startDate,
  endDate,
  company,
  totalDuration,
  style,
  onPress,
}: TimesheetCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const styles = useMemo(
    () => getStyles(isCompleted ? Colors.primaryColor : Colors.secondaryColor),
    [Colors, isCompleted],
  );

  const _formatDate = (date: string) => {
    return formatDate(date, I18n.t('Base_DateFormat'));
  };

  return (
    <View style={style}>
      <ObjectCard
        style={[styles.container, styles.borderColor]}
        onPress={onPress}
        upperTexts={{
          items: [
            {
              displayText: `${_formatDate(startDate)} - ${_formatDate(
                endDate,
              )}`,
              isTitle: true,
            },
            {
              displayText: `${I18n.t('Hr_Company')} : ${company}`,
              numberOfLines: 2,
              style: styles.subTitle,
            },
            {
              displayText: `${I18n.t(
                'Hr_TotalDurationHours',
              )} : ${totalDuration}`,
              style: styles.subTitle,
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
      minHeight: 100,
      justifyContent: 'center',
      marginHorizontal: 1,
      marginVertical: 1,
    },
    borderColor: {
      borderLeftWidth: 7,
      borderLeftColor: color.background,
    },
    subTitle: {
      marginTop: 5,
    },
  });

export default TimesheetCard;
