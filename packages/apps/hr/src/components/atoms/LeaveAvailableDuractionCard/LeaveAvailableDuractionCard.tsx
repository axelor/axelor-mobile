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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';
import {
  Card,
  LabelText,
  Text,
  TextUnit,
  useDigitFormat,
  useThemeColor,
  VerticalRule,
} from '@axelor/aos-mobile-ui';
import {fetchLeaveReasonAvailability} from '../../../api/leave-api';

interface LeaveAvailableDuractionCardProps {
  style?: any;
  leaveReason: any;
  durationLeave: number;
  toDate: string;
}

const LeaveAvailableDuractionCard = ({
  style,
  leaveReason,
  durationLeave,
  toDate,
}: LeaveAvailableDuractionCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const formatNumber = useDigitFormat();
  const {LeaveReason} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  const [availableLeave, setAvailableLeave] = useState(0);

  const isExceptionalLeave = useMemo(
    () =>
      leaveReason?.leaveReasonTypeSelect ===
      LeaveReason?.leaveReasonTypeSelect.ExceptionalLeave,
    [
      LeaveReason?.leaveReasonTypeSelect.ExceptionalLeave,
      leaveReason?.leaveReasonTypeSelect,
    ],
  );

  useEffect(() => {
    if (!isExceptionalLeave && toDate && leaveReason?.id) {
      fetchLeaveReasonAvailability({
        toDate,
        leaveReasonId: leaveReason?.id,
      })
        .then(setAvailableLeave)
        .catch(() => setAvailableLeave(0));
    }
  }, [isExceptionalLeave, leaveReason?.id, toDate]);

  return (
    <Card style={[styles.cardContainer, style]}>
      <LabelText iconName="tag-fill" title={leaveReason?.name} />
      <View style={styles.container}>
        <View style={styles.leaveContainer}>
          <Text style={styles.titleText}>{I18n.t('Hr_Available')}</Text>
          <TextUnit
            fontSize={25}
            value={isExceptionalLeave ? '-' : formatNumber(availableLeave)}
            unit={
              isExceptionalLeave
                ? ''
                : getItemTitle(LeaveReason?.unitSelect, leaveReason?.unitSelect)
            }
          />
        </View>
        <VerticalRule color={Colors.secondaryColor.background} />
        <View style={styles.leaveContainer}>
          <Text style={styles.titleText}>{I18n.t('Hr_Duration')}</Text>
          <TextUnit
            fontSize={25}
            value={formatNumber(durationLeave)}
            unit={getItemTitle(
              LeaveReason?.unitSelect,
              leaveReason?.unitSelect,
            )}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    gap: 5,
  },
  container: {
    flexDirection: 'row',
    gap: 5,
  },
  leaveContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
  },
});

export default LeaveAvailableDuractionCard;
