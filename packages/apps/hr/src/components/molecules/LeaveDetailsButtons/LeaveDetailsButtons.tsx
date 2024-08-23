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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator, useTypes} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';

interface LeaveDetailsButtonsProps {
  statusSelect: number;
}

const LeaveDetailsButtons = ({statusSelect}: LeaveDetailsButtonsProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {LeaveRequest} = useTypes();

  if (statusSelect === LeaveRequest?.statusSelect.Draft) {
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

  if (statusSelect === LeaveRequest?.statusSelect.WaitingValidation) {
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

export default LeaveDetailsButtons;
