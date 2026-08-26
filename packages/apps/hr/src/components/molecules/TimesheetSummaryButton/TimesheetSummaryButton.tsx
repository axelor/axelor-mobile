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
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Card, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {formatMetric} from '../../../utils';

interface TimesheetSummaryButtonProps {
  difference: number;
  unit: string;
  onPress: () => void;
}

const TimesheetSummaryButton = ({
  difference,
  unit,
  onPress,
}: TimesheetSummaryButtonProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}>
      <Card style={styles.card}>
        <Text writingType="details">{I18n.t('Hr_Summary')}</Text>
        {difference !== 0 && (
          <Text
            writingType="important"
            fontSize={14}
            textColor={
              difference < 0
                ? Colors.errorColor.background
                : Colors.successColor.background
            }>
            {`${formatMetric(difference, true)} ${unit}`}
          </Text>
        )}
        <Icon name="chevron-right" size={12} />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginRight: '2.5%',
    marginBottom: 6,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    paddingRight: 10,
    gap: 8,
  },
});

export default memo(TimesheetSummaryButton);
