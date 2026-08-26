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
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {
  Color,
  HorizontalRule,
  IconTile,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {DayMetrics, formatMetric} from '../../../utils';

interface TimesheetWorkSummaryProps {
  style?: any;
  metrics: DayMetrics;
  unit: string;
}

const TimesheetWorkSummary = ({
  style,
  metrics,
  unit,
}: TimesheetWorkSummaryProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const rows = useMemo(
    () =>
      [
        {key: 'work', title: I18n.t('Hr_Work'), value: metrics.actualTime},
        metrics.leaveTime !== 0 && {
          key: 'leave',
          operator: 'plus-lg',
          operatorColor: Colors.successColor,
          title: I18n.t('Hr_Leaves'),
          value: metrics.leaveTime,
        },
        {
          key: 'planned',
          operator: 'dash-lg',
          operatorColor: Colors.errorColor,
          title: I18n.t('Hr_PlannedTime'),
          value: metrics.plannedTime,
        },
      ].filter(Boolean) as {
        key: string;
        operator?: string;
        operatorColor?: Color;
        title: string;
        value: number;
      }[],
    [Colors, I18n, metrics],
  );

  return (
    <View style={style}>
      {rows.map(row => (
        <View key={row.key} style={styles.row}>
          <Operator glyph={row.operator} color={row.operatorColor} />
          <Text style={styles.label} numberOfLines={1}>
            {row.title}
          </Text>
          <Text>{`${formatMetric(row.value)} ${unit}`}</Text>
        </View>
      ))}
      <HorizontalRule style={styles.rule} />
      <View style={styles.row}>
        <Operator glyph="arrow-right" color={Colors.secondaryColor_dark} />
        <Text style={styles.label} writingType="important" numberOfLines={1}>
          {I18n.t('Hr_Difference')}
        </Text>
        <Text writingType="important">
          {`${formatMetric(metrics.difference, true)} ${unit}`}
        </Text>
      </View>
    </View>
  );
};

const OPERATOR_SIZE = 18;

const Operator = ({glyph, color}: {glyph?: string; color?: Color}) => {
  if (glyph == null) return <View style={styles.operator} />;

  return (
    <IconTile
      icon={glyph}
      color={color}
      size={OPERATOR_SIZE}
      iconSize={OPERATOR_SIZE * 0.6}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    gap: 8,
  },
  operator: {
    width: OPERATOR_SIZE,
    height: OPERATOR_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
  },
  rule: {
    marginVertical: 4,
  },
});

export default TimesheetWorkSummary;
