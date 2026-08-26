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

import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {
  Badge,
  Card,
  formatLongDate,
  Text,
  TextUnit,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {DayMetrics, formatMetric} from '../../../utils';
import {TimesheetWorkSummary} from '../../molecules';

interface TimesheetDayCardProps {
  dateString?: string;
  lineCount: number;
  metrics?: DayMetrics;
  declaredTime: number;
  unit: string;
  leaveReason?: string;
}

const TimesheetDayCard = ({
  dateString,
  lineCount,
  metrics,
  declaredTime,
  unit,
  leaveReason,
}: TimesheetDayCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text writingType="title" numberOfLines={2}>
          {formatLongDate(dateString, I18n.t)}
        </Text>
        {lineCount > 0 && (
          <Badge
            color={Colors.primaryColor}
            title={lineCount}
            numberOfLines={1}
          />
        )}
      </View>
      {metrics == null ? (
        <TextUnit
          title={I18n.t('Hr_WorkTime')}
          value={formatMetric(declaredTime)}
          unit={unit}
          defaultColor
          fontSize={14}
        />
      ) : (
        <TimesheetWorkSummary metrics={metrics} unit={unit} />
      )}
      {leaveReason != null && (
        <Text writingType="details" textColor={Colors.cautionColor.background}>
          {leaveReason}
        </Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '95%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingRight: 10,
    gap: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
});

export default memo(TimesheetDayCard);
