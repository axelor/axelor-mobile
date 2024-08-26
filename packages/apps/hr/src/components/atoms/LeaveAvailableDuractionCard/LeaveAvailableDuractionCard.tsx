/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';
import {
  Card,
  LabelText,
  Text,
  TextUnit,
  useDigitFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

interface LeaveAvailableDuractionCardProps {
  style?: any;
  reason: string;
  availableLeave: number;
  durationLeave: number;
  durationUnitSelect: number;
}

const LeaveAvailableDuractionCard = ({
  style,
  reason,
  availableLeave,
  durationLeave,
  durationUnitSelect,
}: LeaveAvailableDuractionCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const formatNumber = useDigitFormat();
  const {LeaveReason} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  const styles = useMemo(() => {
    return getStyles(Colors.secondaryColor.background);
  }, [Colors]);

  return (
    <Card style={[styles.cardContainer, style]}>
      <LabelText
        iconName="tag-fill"
        size={16}
        title={reason}
        textStyle={styles.labelText}
      />
      <View style={styles.container}>
        <View style={styles.leaveContainer}>
          <Text style={styles.titleText}>{I18n.t('Hr_Available')}</Text>
          <TextUnit
            fontSize={30}
            value={formatNumber(availableLeave)}
            unit={getItemTitle(LeaveReason?.unitSelect, durationUnitSelect)}
          />
        </View>
        <View style={styles.horizontalRule} />
        <View style={styles.leaveContainer}>
          <Text style={styles.titleText}>{I18n.t('Hr_Duration')}</Text>
          <TextUnit
            fontSize={30}
            value={formatNumber(durationLeave)}
            unit={getItemTitle(LeaveReason?.unitSelect, durationUnitSelect)}
          />
        </View>
      </View>
    </Card>
  );
};

const getStyles = (ruleColor: string) =>
  StyleSheet.create({
    cardContainer: {
      width: '90%',
    },
    labelText: {
      fontSize: 16,
    },
    container: {
      flexDirection: 'row',
      marginTop: 15,
    },
    leaveContainer: {
      flex: 1,
      alignItems: 'center',
      marginVertical: 10,
    },
    horizontalRule: {
      borderWidth: 0.5,
      borderColor: ruleColor,
    },
    titleText: {
      paddingHorizontal: 10,
    },
  });

export default LeaveAvailableDuractionCard;
