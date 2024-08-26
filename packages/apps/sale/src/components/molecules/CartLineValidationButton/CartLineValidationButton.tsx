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
import {View, StyleSheet} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';

const CartLineValidationButton = ({}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <View style={styles.buttonContainer}>
      <Button
        title={I18n.t('Sale_Delete')}
        onPress={() => {}}
        width="45%"
        color={Colors.errorColor}
        iconName={'trash3-fill'}
      />

      <Button
        title={I18n.t('Base_Validate')}
        onPress={() => {}}
        width="45%"
        iconName="send-fill"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default CartLineValidationButton;
