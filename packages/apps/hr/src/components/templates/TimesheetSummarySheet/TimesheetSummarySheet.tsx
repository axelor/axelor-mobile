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

import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {BottomSheet, Card, Text} from '@axelor/aos-mobile-ui';
import {DayMetrics} from '../../../utils';
import {TimesheetWorkSummary} from '../../molecules';

interface TimesheetSummarySheetProps {
  visible: boolean;
  onClose: () => void;
  unit: string;
  weekLabel: string;
  weekMetrics: DayMetrics;
  periodLabel: string;
  timesheetMetrics: DayMetrics;
}

const TimesheetSummarySheet = ({
  visible,
  onClose,
  unit,
  weekLabel,
  weekMetrics,
  periodLabel,
  timesheetMetrics,
}: TimesheetSummarySheetProps) => {
  const I18n = useTranslator();

  const renderScope = useCallback(
    (title: string, subtitle: string, metrics: DayMetrics) => (
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text writingType="important" fontSize={12} numberOfLines={1}>
            {title}
          </Text>
          <Text writingType="details" fontSize={12} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
        <TimesheetWorkSummary
          style={styles.summary}
          metrics={metrics}
          unit={unit}
        />
      </Card>
    ),
    [unit],
  );

  return (
    <BottomSheet
      visible={visible}
      title={I18n.t('Hr_Summary')}
      onClose={onClose}>
      <ScrollView style={styles.container}>
        {renderScope(I18n.t('Hr_Week'), weekLabel, weekMetrics)}
        {renderScope(I18n.t('Hr_Timesheet'), periodLabel, timesheetMetrics)}
      </ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 450,
  },
  card: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingRight: 10,
    marginVertical: 4,
    gap: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  summary: {
    paddingTop: 4,
  },
});

export default TimesheetSummarySheet;
