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
import {formatDateTime, useTranslator} from '@axelor/aos-mobile-core';
import {Card, Text, useThemeColor} from '@axelor/aos-mobile-ui';

const DURATION_NEARLY_EXPIRED_IN_HOURS = 24 * 7;

interface GtCardProps {
  titleKey: string;
  maxDate: string;
  realGt: number;
  plannedGt: number;
  interventionStatus: number;
  gtStatus: number;
}

const GtCard = ({
  titleKey,
  maxDate,
  realGt,
  plannedGt,
  interventionStatus,
  gtStatus,
}: GtCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const borderStyle = useMemo(() => {
    let color = Colors.successColor;

    if (maxDate == null) {
      color = Colors.secondaryColor;
    } else {
      const _maxDate = new Date(maxDate);
      if (interventionStatus < gtStatus) {
        const todayDate = new Date();
        const nearlyExpiredDate = new Date(
          Date.now() - DURATION_NEARLY_EXPIRED_IN_HOURS * 60 * 60 * 1000,
        );

        if (_maxDate < todayDate) {
          color = Colors.errorColor;
        } else if (_maxDate < nearlyExpiredDate) {
          color = Colors.cautionColor;
        } else {
          color = Colors.progressColor;
        }
      } else if (realGt > plannedGt) {
        color = Colors.errorColor;
      }
    }

    return getStyles(color.background)?.border;
  }, [Colors, gtStatus, interventionStatus, maxDate, plannedGt, realGt]);

  return (
    <Card style={[styles.container, borderStyle]}>
      <Text writingType="title">{I18n.t(titleKey)}</Text>
      <Text style={styles.date}>
        {maxDate ? formatDateTime(maxDate, I18n.t('Base_DateTimeFormat')) : '-'}
      </Text>
    </Card>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    marginBottom: 5,
  },
  date: {
    marginLeft: 20,
  },
});

export default GtCard;
