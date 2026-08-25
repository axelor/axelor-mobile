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
import {formatDate, useTranslator} from '@axelor/aos-mobile-core';
import {
  Button,
  Card,
  fromDateString,
  Icon,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

interface LeaveSelectionCardProps {
  startDate?: string;
  endDate?: string;
  disabled?: boolean;
  onClear: () => void;
  onValidate: () => void;
}

const LeaveSelectionCard = ({
  startDate,
  endDate,
  disabled = false,
  onClear,
  onValidate,
}: LeaveSelectionCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const periodTitle = useMemo(() => {
    if (startDate == null) return I18n.t('Hr_SelectPeriodOnCalendar');

    const format = I18n.t('Base_DateFormat');
    const start = formatDate(fromDateString(startDate), format);

    if (endDate == null || endDate === startDate) return start;

    return `${start} → ${formatDate(fromDateString(endDate), format)}`;
  }, [I18n, endDate, startDate]);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.period}>
          <Text writingType="details" textColor={Colors.placeholderTextColor}>
            {I18n.t('Hr_Selection')}
          </Text>
          <Text writingType="important" fontSize={12} numberOfLines={1}>
            {periodTitle}
          </Text>
        </View>
        <Icon
          name="x-lg"
          size={20}
          color={Colors.primaryColor.background}
          visible={startDate != null}
          touchable
          onPress={onClear}
        />
      </Card>
      <Button
        iconName="send-fill"
        title={I18n.t('Hr_RequestLeave')}
        disabled={disabled || startDate == null}
        onPress={onValidate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingVertical: 10,
  },
  period: {
    flex: 1,
  },
});

export default LeaveSelectionCard;
