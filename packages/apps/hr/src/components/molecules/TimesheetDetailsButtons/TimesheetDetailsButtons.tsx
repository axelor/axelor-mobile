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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {Timesheet} from '../../../types';

interface TimesheetDetailsButtonsProps {
  statusSelect: number;
}

const TimesheetDetailsButtons = ({
  statusSelect,
}: TimesheetDetailsButtonsProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  if (statusSelect === Timesheet.statusSelect.Draft) {
    return (
      <View style={styles.container}>
        <Button
          title={I18n.t('Hr_Delete')}
          onPress={() => console.log('Delete button pressed.')}
          width="45%"
          color={Colors.errorColor}
          iconName="trash3-fill"
        />
        <Button
          title={I18n.t('Hr_Send')}
          onPress={() => console.log('Send button pressed.')}
          width="45%"
          iconName="send-fill"
        />
      </View>
    );
  }

  if (statusSelect === Timesheet.statusSelect.WaitingValidation) {
    return (
      <View style={styles.container}>
        <Button
          title={I18n.t('Hr_Refuse')}
          onPress={() => console.log('Refuse button pressed.')}
          width="45%"
          color={Colors.errorColor}
          iconName="x-lg"
        />
        <Button
          title={I18n.t('Hr_Validate')}
          onPress={() => console.log('Validate button pressed.')}
          width="45%"
          iconName="check-lg"
        />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default TimesheetDetailsButtons;
