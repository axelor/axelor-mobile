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
import {Card, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {getFullDateItems, useTranslator} from '@axelor/aos-mobile-core';
import {TimesheetLine} from '../../../types';

interface TimesheetLineCardProps {
  statusSelect: number;
  project?: string;
  task?: string;
  manufOrder?: string;
  operation?: string;
  date: string;
  duration: string;
  unitDuration: string;
  isBorderColor?: boolean;
  style?: any;
}

const TimesheetLineCard = ({
  statusSelect,
  project,
  task,
  manufOrder,
  operation,
  date,
  duration,
  unitDuration,
  isBorderColor = true,
  style,
}: TimesheetLineCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const styles = useMemo(
    () => getStyles(TimesheetLine.getStatusColor(statusSelect, Colors)),
    [Colors, statusSelect],
  );

  const _date = useMemo(() => getFullDateItems(date, I18n), [I18n, date]);

  return (
    <Card
      style={[styles.container, isBorderColor && styles.borderCOlor, style]}>
      <View style={styles.leftContainer}>
        <Text writingType="title">{(project || manufOrder) ?? '-'}</Text>
        <Text style={styles.subTitle}>{(task || operation) ?? '-'}</Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.dateContainer}>
          <Icon
            name="calendar-alt"
            color={Colors.secondaryColor.foreground}
            size={18}
            style={styles.icon}
          />
          <Text fontSize={18}>{_date.day}</Text>
          <Text writingType="important" fontSize={18}>
            {` ${_date.date} ${_date.month}`}
          </Text>
        </View>
        <Text
          textColor={Colors.primaryColor.background}
          fontSize={18}
          style={styles.durationText}>
          {duration} {TimesheetLine.getUnitDuration(unitDuration, I18n)}
        </Text>
      </View>
    </Card>
  );
};

const getStyles = color =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 15,
      paddingRight: 15,
    },
    borderCOlor: {
      borderLeftWidth: 7,
      borderLeftColor: color.background,
    },
    leftContainer: {
      maxWidth: '60%',
    },
    rightContainer: {
      maxWidth: '40%',
    },
    subTitle: {
      fontStyle: 'italic',
      marginTop: 5,
    },
    dateContainer: {
      flexDirection: 'row',
    },
    icon: {
      marginRight: 5,
    },
    durationText: {
      fontWeight: '900',
      marginTop: 5,
    },
  });

export default TimesheetLineCard;
