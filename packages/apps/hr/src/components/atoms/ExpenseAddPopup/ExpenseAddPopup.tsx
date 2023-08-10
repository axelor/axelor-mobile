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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Text,
  useThemeColor,
  PopUp,
  Button,
  LabelText,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface ExpenseAddPopupProps {
  style?: any;
  visible: boolean;
  setAddPopuîsVisible: (isVisible: boolean) => void;
}
const ExpenseAddPopup = ({
  style,
  visible,
  setAddPopuîsVisible,
}: ExpenseAddPopupProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  return (
    <PopUp style={style} visible={visible}>
      <View>
        <Text>Test</Text>
        <TouchableOpacity onPress={() => console.log('addExpense')}>
          <LabelText
            iconName="plus"
            color={Colors.primaryColor.background}
            title="ddddde"
            size={16}
          />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button
            title={I18n.t('Base_Cancel')}
            color={Colors.secondaryColor}
            style={styles.button}
            onPress={() => setAddPopuîsVisible(false)}
          />
          <Button
            title={I18n.t('Base_Add')}
            style={styles.button}
            //onPress={() => setAddPopuîsVisible(true)}
          />
        </View>
      </View>
    </PopUp>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
  },
});

export default ExpenseAddPopup;
