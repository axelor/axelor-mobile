/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';

interface CompleteRequestButtonsProps {
  leaveQty: number;
  hasNewLine: boolean;
  hasPeriod: boolean;
  hasLines: boolean;
  onAddPress: () => void;
  onFinishPress: () => void;
}

const CompleteRequestButtons = ({
  leaveQty,
  hasNewLine,
  hasPeriod,
  hasLines,
  onAddPress,
  onFinishPress,
}: CompleteRequestButtonsProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <View style={styles.container}>
      {hasNewLine && (
        <Button
          title={I18n.t('Base_Add')}
          iconName="plus-lg"
          color={Colors.progressColor}
          width={hasLines ? '45%' : '90%'}
          disabled={leaveQty === 0}
          onPress={onAddPress}
        />
      )}
      {hasLines && (
        <Button
          title={I18n.t('Base_Finish')}
          iconName="check-lg"
          width={hasNewLine ? '45%' : '90%'}
          disabled={!hasPeriod}
          onPress={onFinishPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default CompleteRequestButtons;
